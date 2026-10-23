/**
 * Course placement for students who sign up on their own: a recommendation from the subject they
 * choose, their grade and their plans, following Alberta's course sequences, and a short placement
 * check on the skills of the course before it.
 */
import { getCourse, lessonById } from './curriculum/index.ts';

export type Plan = 'university-stem' | 'university-other' | 'college-trades' | 'work' | 'not-sure';
export type Feeling = 'confident' | 'ok' | 'struggling';

export interface PlacementAnswers {
  /** The subject to study, as a course names it; Mathematics when not given. */
  subject?: string;
  /** School grade, 5 to 12. */
  grade: number;
  /** Plans after high school (asked from Grade 10). */
  plan?: Plan;
  /** Interested in calculus (asked in Grade 12 for university science plans). */
  calculus?: boolean;
  /** Has found mathematics very hard and wants extra support (Knowledge and Employability). */
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
  'chem-20': null,
};

const CHECK = 'Programs set their own entrance requirements, so check the ones you are interested in.';

function rec(courseId: string, reasons: string[], alternatives: CourseChoice[] = []): Recommendation {
  return { courseId, reasons, alternatives, prerequisite: PREREQUISITE[courseId] ?? null };
}

export function recommendCourse(a: PlacementAnswers): Recommendation {
  const g = Math.round(a.grade);
  if (a.subject === 'Chemistry') {
    const reasons = ['Chemistry 20 is the first high-school chemistry course: chemical bonding, gases, solutions, acids and bases, and stoichiometry.'];
    if (g < 11) reasons.push('It is usually taken in Grade 11, after Science 10, so some ideas will be new; the first lessons start from atoms and ions.');
    return rec('chem-20', reasons);
  }
  if (g <= 9) {
    const grade = Math.min(9, Math.max(5, g));
    return rec(`math-${grade}`, [`Grade ${grade} Mathematics follows Alberta's program for your grade, so you learn what your class is learning.`]);
  }
  const plan = a.plan ?? 'not-sure';
  if (g === 10) {
    if (a.support) return rec('math-10-4', ['Math 10-4 (Knowledge and Employability) builds everyday mathematics for work and life with extra support.'], [{ courseId: 'math-10-3', why: 'A step up when you feel ready.' }]);
    if (plan === 'work') return rec('math-10-3', ['Math 10-3 focuses on the mathematics of the workplace and trades: measurement, geometry, money and number sense.'], [{ courseId: 'math-10c', why: 'Keeps university and most college programs open.' }]);
    if (plan === 'college-trades')
      return rec('math-10-3', ['Math 10-3 focuses on practical mathematics used in trades and many technical programs.', CHECK], [{ courseId: 'math-10c', why: 'Choose Math 10C if a program you like asks for Math 20-1 or 20-2 later.' }]);
    return rec('math-10c', ['Math 10C is the common start for both Math 20-1 and Math 20-2, so it keeps university and college options open.', ...(a.feeling === 'struggling' ? ['The placement check shows which Grade 9 skills to review first.'] : [])], [{ courseId: 'math-10-3', why: 'A practical course for the workplace and trades.' }]);
  }
  if (g === 11) {
    if (a.support) return rec('math-20-4', ['Math 20-4 continues Knowledge and Employability mathematics with extra support.'], [{ courseId: 'math-20-3', why: 'A step up when you feel ready.' }]);
    if (plan === 'university-stem') return rec('math-20-1', ['Math 20-1 leads to Math 30-1 and Math 31, the path usually needed for science, engineering, health and mathematics programs.', CHECK], [{ courseId: 'math-20-2', why: 'If your programs do not need calculus.' }]);
    if (plan === 'work') return rec('math-20-3', ['Math 20-3 builds workplace mathematics: measurement, geometry, finance and reasoning.'], [{ courseId: 'math-20-2', why: 'Keeps more post-secondary programs open.' }]);
    if (plan === 'college-trades') return rec('math-20-3', ['Math 20-3 is practical mathematics for trades and many technical programs.', CHECK], [{ courseId: 'math-20-2', why: 'Choose Math 20-2 if a program you like asks for Math 30-2.' }]);
    return rec('math-20-2', ['Math 20-2 leads to Math 30-2, used by many university and college programs that do not need calculus.', CHECK], [{ courseId: 'math-20-1', why: 'Choose Math 20-1 if you might study science, engineering or health.' }]);
  }
  // Grade 12 (and anything above).
  if (a.support) return rec('math-20-4', ['Math 20-4 is the last Knowledge and Employability mathematics course, with extra support.'], [{ courseId: 'math-30-3', why: 'A step up when you feel ready.' }]);
  if (plan === 'university-stem') {
    const reasons = ['Math 30-1 is the pre-calculus course usually needed for science, engineering, health and mathematics programs.', CHECK];
    return a.calculus ? rec('math-30-1', [...reasons, 'Math 31 (calculus) is taken alongside or after Math 30-1.'], [{ courseId: 'math-31', why: 'Calculus, alongside or after Math 30-1.' }]) : rec('math-30-1', reasons, [{ courseId: 'math-30-2', why: 'If your programs do not need calculus.' }]);
  }
  if (plan === 'work') return rec('math-30-3', ['Math 30-3 completes the workplace mathematics sequence.'], [{ courseId: 'math-30-2', why: 'Keeps more post-secondary programs open.' }]);
  if (plan === 'college-trades') return rec('math-30-3', ['Math 30-3 is practical mathematics for trades and many technical programs.', CHECK], [{ courseId: 'math-30-2', why: 'Choose Math 30-2 if a program you like asks for it.' }]);
  return rec('math-30-2', ['Math 30-2 is used by many university and college programs that do not need calculus.', CHECK], [{ courseId: 'math-30-1', why: 'Choose Math 30-1 if you might study science, engineering or health.' }]);
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
