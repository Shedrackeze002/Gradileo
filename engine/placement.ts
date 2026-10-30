/**
 * Course placement for students who sign up on their own: a recommendation from the subject they
 * choose, their grade and their plans, following the courses' streams from Grade 10, and a short placement
 * check on the skills of the course before it.
 */
import { getCourse, lessonById } from './curriculum/index.ts';

export type Plan = 'university-stem' | 'university-other' | 'college-trades' | 'work' | 'not-sure';
export type Feeling = 'confident' | 'ok' | 'struggling';

export interface PlacementAnswers {
  /** The subject to study, as a course names it; Mathematics when not given. */
  subject?: string;
  /** Gradileo's level for the learner's year, 5 to 12 (`engine/curricula.ts`). */
  grade: number;
  /** Where the learner goes to school: a curriculum id from `engine/curricula.ts`. */
  curriculum?: string;
  /** Their year as that system names it ("Year 11", "SS 1"). */
  year?: string;
  /** Plans after high school (asked from Grade 10). */
  plan?: Plan;
  /** Interested in calculus (asked in Grade 12 for university science plans). */
  calculus?: boolean;
  /** Has found mathematics very hard and wants extra support (the Essentials stream). */
  support?: boolean;
  feeling?: Feeling;
}

export interface CourseChoice {
  courseId: string;
  why: string;
}

export interface Recommendation {
  courseId: string;
  reasons: string[];
  alternatives: CourseChoice[];
  /** The course whose skills the placement check uses (the one before the recommendation). */
  prerequisite: string | null;
}

/** The course usually taken before each course. */
export const PREREQUISITE: Record<string, string | null> = {
  'math-5': null,
  'math-6': 'math-5',
  'math-7': 'math-6',
  'math-8': 'math-7',
  'math-9': 'math-8',
  'math-10c': 'math-9',
  'math-10-3': 'math-9',
  'math-10-4': 'math-9',
  'math-20-1': 'math-10c',
  'math-20-2': 'math-10c',
  'math-20-3': 'math-10-3',
  'math-20-4': 'math-10-4',
  'math-30-1': 'math-20-1',
  'math-30-2': 'math-20-2',
  'math-30-3': 'math-20-3',
  'math-31': 'math-30-1',
  'chem-10': null,
  'chem-20': 'chem-10',
  'chem-30': 'chem-20',
  'eng-10': null,
  'eng-20': 'eng-10',
  'eng-30': 'eng-20',
};

const CHECK = 'Programs set their own entrance requirements, so check the ones you are interested in.';

function rec(courseId: string, reasons: string[], alternatives: CourseChoice[] = []): Recommendation {
  return { courseId, reasons, alternatives, prerequisite: PREREQUISITE[courseId] ?? null };
}

export function recommendCourse(a: PlacementAnswers): Recommendation {
  const g = Math.round(a.grade);
  if (a.subject === 'English') {
    if (g <= 10) {
      const reasons = ['Grade 10 English covers short stories, poetry, Shakespeare’s Romeo and Juliet, non-fiction and persuasion, visual and media texts, essay and narrative writing, and grammar.'];
      if (g < 10) reasons.push('It is usually taken in Grade 10, so some texts will be a stretch; the grammar and writing lessons build up from the basics.');
      return rec('eng-10', reasons, [{ courseId: 'eng-20', why: 'If you have already studied short stories, poetry, a Shakespeare play and the essay.' }]);
    }
    if (g >= 12) {
      return rec('eng-30', ['Grade 12 English covers fiction through critical lenses, poetry, Shakespeare’s Hamlet, rhetoric and argument, media and culture, critical, research and reflective writing, and language for effect.'], [
        { courseId: 'eng-20', why: 'If you have not yet studied literary analysis, the comparative essay and Macbeth.' },
      ]);
    }
    const reasons = ['Grade 11 English covers fiction, poetry, Shakespeare’s Macbeth, the essay and rhetoric, news and media, literary, comparative and argumentative writing, and language.'];
    return rec('eng-20', reasons, [{ courseId: 'eng-10', why: 'Start here if you have not yet studied short stories, poetry and a Shakespeare play in English.' }]);
  }
  if (a.subject === 'Chemistry') {
    if (g <= 10) {
      const reasons = ['Grade 10 Chemistry is the first chemistry course: the particle model, atoms and the periodic table, bonding, chemical reactions, and moles, acids and bases.'];
      if (g < 10) reasons.push('It is usually taken in Grade 10, so a few ideas will be new; it starts from what matter is made of.');
      return rec('chem-10', reasons, [{ courseId: 'chem-20', why: 'If you have already studied atoms, bonding and balancing equations.' }]);
    }
    if (g >= 12) {
      return rec('chem-30', ['Grade 12 Chemistry covers thermochemistry, electrochemistry, organic compounds and their reactions, and equilibrium with acids and bases.'], [
        { courseId: 'chem-20', why: 'If you have not yet studied bonding, gases, solutions and stoichiometry.' },
      ]);
    }
    return rec('chem-20', ['Grade 11 Chemistry covers chemical bonding and the shapes of molecules, gases, solutions, acids and bases, and stoichiometry.'], [
      { courseId: 'chem-10', why: 'Start here if chemistry is new to you.' },
    ]);
  }
  if (g <= 9) {
    const grade = Math.min(9, Math.max(5, g));
    return rec(`math-${grade}`, [`Grade ${grade} Mathematics covers the mathematics of your grade, so you learn what your class is learning.`]);
  }
  const plan = a.plan ?? 'not-sure';
  if (g === 10) {
    if (a.support) return rec('math-10-4', ['Math 10 Essentials builds everyday mathematics for work and life with extra support.'], [{ courseId: 'math-10-3', why: 'A step up when you feel ready.' }]);
    if (plan === 'work') return rec('math-10-3', ['Math 10 Workplace focuses on the mathematics of the workplace and trades: measurement, geometry, money and number sense.'], [{ courseId: 'math-10c', why: 'Keeps university and most college programs open.' }]);
    if (plan === 'college-trades')
      return rec('math-10-3', ['Math 10 Workplace focuses on practical mathematics used in trades and many technical programs.', CHECK], [{ courseId: 'math-10c', why: 'Choose Math 10 if a program you like asks for Grade 11 Pre-calculus or Foundations later.' }]);
    return rec('math-10c', ['Math 10 is the common start for both Grade 11 Pre-calculus and Foundations, so it keeps university and college options open.', ...(a.feeling === 'struggling' ? ['The placement check shows which Grade 9 skills to review first.'] : [])], [{ courseId: 'math-10-3', why: 'A practical course for the workplace and trades.' }]);
  }
  if (g === 11) {
    if (a.support) return rec('math-20-4', ['Math 11 Essentials continues everyday mathematics with extra support.'], [{ courseId: 'math-20-3', why: 'A step up when you feel ready.' }]);
    if (plan === 'university-stem') return rec('math-20-1', ['Math 11 Pre-calculus leads to Grade 12 Pre-calculus and Calculus, the path usually needed for science, engineering, health and mathematics programs.', CHECK], [{ courseId: 'math-20-2', why: 'If your programs do not need calculus.' }]);
    if (plan === 'work') return rec('math-20-3', ['Math 11 Workplace builds workplace mathematics: measurement, geometry, finance and reasoning.'], [{ courseId: 'math-20-2', why: 'Keeps more post-secondary programs open.' }]);
    if (plan === 'college-trades') return rec('math-20-3', ['Math 11 Workplace is practical mathematics for trades and many technical programs.', CHECK], [{ courseId: 'math-20-2', why: 'Choose Math 11 Foundations if a program you like asks for Grade 12 Foundations.' }]);
    return rec('math-20-2', ['Math 11 Foundations leads to Grade 12 Foundations, used by many university and college programs that do not need calculus.', CHECK], [{ courseId: 'math-20-1', why: 'Choose Math 11 Pre-calculus if you might study science, engineering or health.' }]);
  }
  // Grade 12 (and anything above).
  if (a.support) return rec('math-20-4', ['Math 11 Essentials is the last Essentials course, with extra support.'], [{ courseId: 'math-30-3', why: 'A step up when you feel ready.' }]);
  if (plan === 'university-stem') {
    const reasons = ['Math 12 Pre-calculus is the course usually needed for science, engineering, health and mathematics programs.', CHECK];
    return a.calculus ? rec('math-30-1', [...reasons, 'Math 12 Calculus is taken alongside or after Math 12 Pre-calculus.'], [{ courseId: 'math-31', why: 'Calculus, alongside or after Math 12 Pre-calculus.' }]) : rec('math-30-1', reasons, [{ courseId: 'math-30-2', why: 'If your programs do not need calculus.' }]);
  }
  if (plan === 'work') return rec('math-30-3', ['Math 12 Workplace completes the workplace mathematics sequence.'], [{ courseId: 'math-30-2', why: 'Keeps more post-secondary programs open.' }]);
  if (plan === 'college-trades') return rec('math-30-3', ['Math 12 Workplace is practical mathematics for trades and many technical programs.', CHECK], [{ courseId: 'math-30-2', why: 'Choose Math 12 Foundations if a program you like asks for it.' }]);
  return rec('math-30-2', ['Math 12 Foundations is used by many university and college programs that do not need calculus.', CHECK], [{ courseId: 'math-30-1', why: 'Choose Math 12 Pre-calculus if you might study science, engineering or health.' }]);
}

/**
 * Skills for the placement check: one from the end of each unit of a course (the skill a unit
 * builds towards), up to `count`, spread across the course.
 */
export function placementSkills(courseId: string, count = 6): string[] {
  const course = getCourse(courseId);
  if (!course) return [];
  const perUnit = course.units
    .map((u) => {
      const lessons = u.lessons.map((id) => lessonById(id)).filter((l): l is NonNullable<typeof l> => !!l && l.skills.length > 0);
      const last = lessons[lessons.length - 1];
      return last ? last.skills[0] : null;
    })
    .filter((s): s is string => !!s);
  if (perUnit.length <= count) return perUnit;
  // Spread evenly across the course.
  return Array.from({ length: count }, (_, i) => perUnit[Math.round((i * (perUnit.length - 1)) / (count - 1))]);
}

export type PlacementResult = 'ready' | 'review' | 'start-earlier';

/** What the placement check suggests from the number of skills answered correctly. */
export function placementResult(correct: number, total: number): PlacementResult {
  if (total === 0) return 'ready';
  const f = correct / total;
  if (f >= 2 / 3 - 1e-9) return 'ready';
  if (f >= 1 / 3 - 1e-9) return 'review';
  return 'start-earlier';
}
