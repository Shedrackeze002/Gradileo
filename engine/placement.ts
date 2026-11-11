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
  'eng-5': null,
  'eng-6': 'eng-5',
  'eng-7': 'eng-6',
  'eng-8': 'eng-7',
  'eng-9': 'eng-8',
  'eng-10': null,
  'eng-20': 'eng-10',
  'eng-30': 'eng-20',
  // The US Common Core map: Algebra II follows Algebra I (Geometry is not needed first).
  'us-grade-6': 'math-5',
  'us-grade-7': 'us-grade-6',
  'us-grade-8': 'us-grade-7',
  'us-algebra-1': 'us-grade-8',
  'us-geometry': 'us-algebra-1',
  'us-algebra-2': 'us-algebra-1',
  'us-precalculus': 'us-algebra-2',
  // The UK GCSE map: both tiers follow Key Stage 3 (Years 7 to 9).
  'uk-gcse-foundation': 'math-8',
  'uk-gcse-higher': 'math-9',
  // A level Mathematics follows GCSE Higher, and its second year follows its first.
  'uk-a-level-year-1': 'uk-gcse-higher',
  'uk-a-level-year-2': 'uk-a-level-year-1',
  // UK chemistry: GCSE is the first chemistry course, and A level follows it.
  'uk-gcse-chemistry': null,
  'uk-a-level-chemistry-1': 'uk-gcse-chemistry',
  'uk-a-level-chemistry-2': 'uk-a-level-chemistry-1',
  // UK English: both GCSEs follow Key Stage 3 (Years 7 to 9).
  'uk-gcse-english-language': 'eng-9',
  'uk-gcse-english-literature': 'eng-9',
  // WASSCE General Mathematics follows junior secondary school, a year at a time.
  'waec-ss-1': 'math-9',
  'waec-ss-2': 'waec-ss-1',
  'waec-ss-3': 'waec-ss-2',
  // Kenya's KCSE Mathematics follows primary school, a form at a time.
  'kcse-form-1': 'math-8',
  'kcse-form-2': 'kcse-form-1',
  'kcse-form-3': 'kcse-form-2',
  'kcse-form-4': 'kcse-form-3',
  // South Africa's CAPS Mathematics follows Grade 9, a grade at a time.
  'caps-grade-10': 'math-9',
  'caps-grade-11': 'caps-grade-10',
  'caps-grade-12': 'caps-grade-11',
  // Cambridge IGCSE: both tiers follow lower secondary (Years 7 to 9).
  'igcse-core': 'math-8',
  'igcse-extended': 'math-9',
  // The IB Diploma's standard level courses follow MYP 5.
  'ib-aa-sl': 'math-10c',
  'ib-ai-sl': 'math-10c',
  // Alberta's new Grades 7 to 9 curriculum: Grade 7 follows Grade 6, which is already on the new K–6 curriculum.
  'ab-grade-7': 'math-6',
  'ab-grade-8': 'ab-grade-7',
  'ab-grade-9': 'ab-grade-8',
};

/** For a UK learner in Year 10 or 11: the GCSE tier, Higher unless they want extra support. */
function ukGcse(a: PlacementAnswers): Recommendation {
  const where = 'GCSE Mathematics is the course of Years 10 and 11, with its units in the order of a GCSE scheme of work.';
  if (a.support || a.feeling === 'struggling') {
    return rec('uk-gcse-foundation', [where, 'The Foundation tier builds number, algebra, geometry and statistics up from the basics.'], [
      { courseId: 'uk-gcse-higher', why: 'If your school has entered you for the Higher tier.' },
    ]);
  }
  return rec('uk-gcse-higher', [where, 'The Higher tier adds surds, functions, circle theorems, the sine and cosine rules and more.'], [
    { courseId: 'uk-gcse-foundation', why: 'If your school has entered you for the Foundation tier, or the basics still feel new.' },
  ]);
}

/** For a UK learner in Year 12 or 13 who plans to study further: the year of A level Mathematics. */
function ukALevel(g: number): Recommendation {
  const where = 'A level Mathematics is the course of Years 12 and 13, with its units in the order of a two-year scheme of work: pure mathematics, statistics and mechanics.';
  if (g === 11) {
    return rec('uk-a-level-year-1', [where, 'The first year (the AS content) covers proof, quadratics, coordinate geometry, trigonometry, exponentials and logarithms, and a first course in differentiation and integration.'], [
      { courseId: 'uk-a-level-year-2', why: 'If you have already finished the first year of A level.' },
      { courseId: 'uk-gcse-higher', why: 'If you want to review GCSE Higher first.' },
    ]);
  }
  return rec('uk-a-level-year-2', [where, 'The second year adds functions, radians and further trigonometry, series, and further differentiation and integration.'], [
    { courseId: 'uk-a-level-year-1', why: 'If you have not finished the first year of A level yet.' },
  ]);
}

/** For a UK learner of chemistry from Year 10: GCSE Chemistry, then the year of A level Chemistry. */
function ukChemistry(g: number): Recommendation {
  if (g <= 10) {
    return rec('uk-gcse-chemistry', ['GCSE Chemistry is the course of Years 10 and 11, with its units in the order of a GCSE scheme of work: atoms and the periodic table, bonding, quantitative chemistry, chemical and energy changes, rates, and organic chemistry.'], [
      { courseId: 'chem-10', why: 'If chemistry is new to you and you want to start with the particle model and the atom.' },
    ]);
  }
  const where = 'A level Chemistry is the course of Years 12 and 13, with its units in the order of a two-year scheme of work. It lists the topics Gradileo does not teach yet.';
  if (g === 11) {
    return rec('uk-a-level-chemistry-1', [where, 'The first year (the AS content) covers atomic structure, amount of substance, bonding, energetics, kinetics, equilibria, redox and a first course in organic chemistry.'], [
      { courseId: 'uk-gcse-chemistry', why: 'If you want to review GCSE Chemistry first.' },
      { courseId: 'chem-20', why: 'Grade 11 Chemistry adds the gas laws and solutions, in Gradileo’s own order.' },
    ]);
  }
  return rec('uk-a-level-chemistry-2', [where, 'The second year covers electrode potentials and cells, acids, bases and buffers, and esters and polymers.'], [
    { courseId: 'uk-a-level-chemistry-1', why: 'If you have not finished the first year of A level yet.' },
    { courseId: 'chem-30', why: 'Grade 12 Chemistry covers thermochemistry, electrochemistry, organic chemistry and equilibrium, in Gradileo’s own order.' },
  ]);
}

/** For a UK learner in Year 10 or 11: GCSE English Language, with GCSE English Literature beside it. */
function ukEnglish(): Recommendation {
  return rec('uk-gcse-english-language', ['GCSE English Language is the course of Years 10 and 11: reading fiction and non-fiction closely, and descriptive, narrative and viewpoint writing.'], [
    { courseId: 'uk-gcse-english-literature', why: 'For your other English GCSE: a Shakespeare play, poetry and writing about literature.' },
    { courseId: 'eng-9', why: 'If you want to build up close reading, rhetoric and the analytical essay first.' },
  ]);
}

/** For a learner in Nigeria or Ghana in senior secondary school: the year of WASSCE General Mathematics. */
function waec(g: number, a: PlacementAnswers): Recommendation {
  const n = g - 9;
  const year = a.year ?? `SS ${n}`;
  const where = `WASSCE General Mathematics (Core Mathematics in Ghana) is the course every senior secondary student takes. This is its ${year} year, with its units in the order of a WASSCE scheme of work.`;
  const alternatives: CourseChoice[] = [];
  if (n < 3) alternatives.push({ courseId: `waec-ss-${n + 1}`, why: `If you have already finished the ${year} topics.` });
  if (n > 1) alternatives.push({ courseId: `waec-ss-${n - 1}`, why: 'If last year’s topics still feel new.' });
  else alternatives.push({ courseId: 'math-9', why: 'If you want to review junior secondary mathematics first.' });
  return rec(`waec-ss-${n}`, [where], alternatives);
}

/** For a learner in Kenya in Form 1 to Form 4: the form's KCSE Mathematics. */
function kcse(g: number): Recommendation {
  const n = g - 8;
  const where = `KCSE Mathematics is the course of Forms 1 to 4. This is Form ${n}, with the topics of the syllabus in its order and under its names.`;
  const alternatives: CourseChoice[] = [];
  if (n < 4) alternatives.push({ courseId: `kcse-form-${n + 1}`, why: `If you have already finished the Form ${n} topics.` });
  if (n > 1) alternatives.push({ courseId: `kcse-form-${n - 1}`, why: `If the Form ${n - 1} topics still feel new.` });
  return rec(`kcse-form-${n}`, [where], alternatives);
}

/** For a South African learner in Grades 10 to 12 who takes Mathematics (not Mathematical Literacy). */
function caps(g: number): Recommendation {
  const where = `Mathematics in Grades 10 to 12 follows CAPS. This is Grade ${g}, with its topics in the order of the CAPS teaching plan.`;
  const alternatives: CourseChoice[] = [];
  if (g < 12) alternatives.push({ courseId: `caps-grade-${g + 1}`, why: `If you have already finished the Grade ${g} topics.` });
  if (g > 10) alternatives.push({ courseId: `caps-grade-${g - 1}`, why: `If the Grade ${g - 1} topics still feel new.` });
  alternatives.push({ courseId: g === 10 ? 'math-10-3' : g === 11 ? 'math-20-3' : 'math-30-3', why: 'If you take Mathematical Literacy: a practical course on measurement, finance and data.' });
  return rec(`caps-grade-${g}`, [where], alternatives);
}

/** For a Cambridge learner in Year 10 or 11: IGCSE Mathematics, Extended unless they want extra support. */
function igcse(a: PlacementAnswers): Recommendation {
  const where = 'Cambridge IGCSE Mathematics is the course of Years 10 and 11, with its units in the order of the syllabus.';
  if (a.support || a.feeling === 'struggling') {
    return rec('igcse-core', [where, 'The Core papers cover number, algebra, geometry, trigonometry, probability and statistics from the basics.'], [
      { courseId: 'igcse-extended', why: 'If your school has entered you for the Extended papers.' },
    ]);
  }
  return rec('igcse-extended', [where, 'The Extended papers add surds, functions, differentiation, the sine and cosine rules, vectors and more.'], [
    { courseId: 'igcse-core', why: 'If your school has entered you for the Core papers, or the basics still feel new.' },
  ]);
}

/** For an IB Diploma learner: one of the two standard level courses, by their plans. */
function ibDiploma(a: PlacementAnswers): Recommendation {
  const where = 'The IB Diploma has two mathematics courses, each taken over DP 1 and DP 2. This is the standard level course, with its units in the order of the guide.';
  if (a.plan === 'university-stem' || a.calculus) {
    return rec('ib-aa-sl', [where, 'Analysis and Approaches builds algebra, functions, trigonometry and calculus, for learners heading for mathematics, science or engineering.', CHECK], [
      { courseId: 'ib-ai-sl', why: 'If you take Applications and Interpretation.' },
    ]);
  }
  return rec('ib-ai-sl', [where, 'Applications and Interpretation builds modelling, statistics and the use of technology, for learners who want mathematics in practical settings.', CHECK], [
    { courseId: 'ib-aa-sl', why: 'If you take Analysis and Approaches.' },
  ]);
}

/** For a US learner: the course of their grade on the Common Core map, and the ones either side. */
function usCourse(g: number, a: PlacementAnswers): Recommendation {
  const why = (title: string, grade: string) => [`${title} is the course US students usually take in ${grade}, with its units in the Common Core order.`];
  if (g === 6) return rec('us-grade-6', why('Grade 6 Mathematics', 'Grade 6'), [{ courseId: 'us-grade-7', why: 'If you have already learned ratios, dividing fractions and one-step equations.' }]);
  if (g === 7)
    return rec('us-grade-7', why('Grade 7 Mathematics', 'Grade 7'), [
      { courseId: 'us-grade-6', why: 'If ratios, fractions and negative numbers still feel new.' },
      { courseId: 'us-grade-8', why: 'If you are ready for linear equations and functions.' },
    ]);
  if (g === 8)
    return rec('us-grade-8', why('Grade 8 Mathematics', 'Grade 8'), [
      { courseId: 'us-algebra-1', why: 'If your school has you take Algebra I in Grade 8.' },
      { courseId: 'us-grade-7', why: 'If proportions and equations still feel new.' },
    ]);
  if (g === 9)
    return rec('us-algebra-1', why('Algebra I', 'Grade 9'), [
      { courseId: 'us-geometry', why: 'If you took Algebra I in Grade 8.' },
      { courseId: 'us-grade-8', why: 'If linear equations and functions still feel new.' },
    ]);
  if (g === 10)
    return rec('us-geometry', why('Geometry', 'Grade 10'), [
      { courseId: 'us-algebra-2', why: 'If you have already taken Geometry.' },
      { courseId: 'us-algebra-1', why: 'If you have not taken Algebra I yet.' },
    ]);
  if (g === 11)
    return rec('us-algebra-2', why('Algebra II', 'Grade 11'), [
      { courseId: 'us-precalculus', why: 'If you have already taken Algebra II.' },
      { courseId: 'us-geometry', why: 'If you have not taken Geometry yet.' },
    ]);
  if (a.calculus) return rec('math-31', ['Calculus follows Precalculus: limits, derivatives and integrals, and their applications.'], [{ courseId: 'us-precalculus', why: 'If you have not finished Precalculus.' }]);
  return rec('us-precalculus', why('Precalculus', 'Grade 12'), [
    { courseId: 'math-31', why: 'If you have finished Precalculus and want to start calculus.' },
    { courseId: 'us-algebra-2', why: 'If you have not finished Algebra II.' },
  ]);
}

const CHECK = 'Programs set their own entrance requirements, so check the ones you are interested in.';

function rec(courseId: string, reasons: string[], alternatives: CourseChoice[] = []): Recommendation {
  return { courseId, reasons, alternatives, prerequisite: PREREQUISITE[courseId] ?? null };
}

export function recommendCourse(a: PlacementAnswers): Recommendation {
  const g = Math.round(a.grade);
  // A UK learner in Year 10 or 11 gets the GCSE courses of English and chemistry, and A level Chemistry after them.
  if (a.curriculum === 'uk' && a.subject === 'English' && (g === 9 || g === 10)) return ukEnglish();
  if (a.curriculum === 'uk' && a.subject === 'Chemistry' && g >= 9) return ukChemistry(Math.min(12, g));
  if (a.subject === 'English') {
    if (g <= 5) {
      const reasons = ['Grade 5 English covers stories and fables, poetry, reading for information, word study, grammar and punctuation, and writing paragraphs, stories and opinions.'];
      if (g < 5) reasons.push('It is usually taken in Grade 5, so some lessons will be a stretch; each one starts from the basics.');
      return rec('eng-5', reasons, [{ courseId: 'eng-10', why: 'If you are already confident with reading, grammar and writing well beyond Grade 5.' }]);
    }
    if (g === 6) {
      const reasons = ['Grade 6 English covers plot, character, point of view and theme, poetry, non-fiction and media, Greek and Latin roots, grammar and punctuation, and narrative, informational and persuasive writing.'];
      return rec('eng-6', reasons, [{ courseId: 'eng-5', why: 'If you want to start with stories, paragraphs and the basics of grammar.' }]);
    }
    if (g === 7) {
      const reasons = ['Grade 7 English covers conflict, characterization, setting, foreshadowing and symbol in short stories, imagery, ballads and sonnets, reading a script, persuasion and bias, news and online sources, clauses and agreement, and paragraphs, essays and research.'];
      return rec('eng-7', reasons, [{ courseId: 'eng-6', why: 'If you want to build up plot, theme, poetry and grammar first.' }]);
    }
    if (g === 8) {
      const reasons = ['Grade 8 English covers subplot, irony and narrators, figurative language, form and metre, Shakespeare’s A Midsummer Night’s Dream, building and judging arguments, film and news framing, voice, modifiers and parallel structure, semicolons and colons, and argument, literary and research writing.'];
      return rec('eng-8', reasons, [{ courseId: 'eng-7', why: 'If you want to build up short stories, poetry, scripts and essays first.' }]);
    }
    if (g === 9) {
      const reasons = ['Grade 9 English covers novel structure, character arcs, symbol and allegory, style, close reading, the sonnet and metre, Shakespeare’s The Tempest, rhetorical devices and speeches, reasoning and fallacies, advertising and misinformation, verbals, sentence variety, agreement and punctuation for effect, and analytical, personal and timed writing.'];
      return rec('eng-9', reasons, [{ courseId: 'eng-8', why: 'If you want to build up arguments, poetry, a Shakespeare comedy and essays first.' }]);
    }
    if (g === 10) {
      const reasons = ['Grade 10 English covers short stories, poetry, Shakespeare’s Romeo and Juliet, non-fiction and persuasion, visual and media texts, essay and narrative writing, and grammar.'];
      return rec('eng-10', reasons, [
        { courseId: 'eng-9', why: 'If you want to build up close reading, rhetoric and the analytical essay first.' },
        { courseId: 'eng-20', why: 'If you have already studied short stories, poetry, a Shakespeare play and the essay.' },
      ]);
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
  // A US learner gets the Common Core course of their grade (Grade 6 to Precalculus).
  if (a.curriculum === 'us' && g >= 6) return usCourse(Math.min(12, g), a);
  // A UK learner in Year 10 or 11 gets GCSE Mathematics: Higher, or Foundation with extra support.
  if (a.curriculum === 'uk' && (g === 9 || g === 10)) return ukGcse(a);
  // A UK learner in Year 12 or 13 heading for university, or not sure yet, gets A level Mathematics.
  const studying = !a.plan || a.plan === 'university-stem' || a.plan === 'university-other' || a.plan === 'not-sure';
  if (a.curriculum === 'uk' && g >= 11 && !a.support && studying) return ukALevel(Math.min(12, g));
  // Senior secondary learners in Nigeria and Ghana get WASSCE General Mathematics, which every student takes.
  if ((a.curriculum === 'ng' || a.curriculum === 'gh') && g >= 10) return waec(Math.min(12, g), a);
  // A learner in Kenya who gives a form (not a grade of the new curriculum) gets that form's KCSE Mathematics.
  if (a.curriculum === 'ke' && a.year?.startsWith('Form') && g >= 9) return kcse(Math.min(12, g));
  // A South African learner in Grades 10 to 12 heading for further study gets CAPS Mathematics.
  if (a.curriculum === 'za' && g >= 10 && !a.support && studying) return caps(Math.min(12, g));
  // A Cambridge learner in Year 10 or 11 gets IGCSE Mathematics: Extended, or Core with extra support.
  if (a.curriculum === 'cambridge' && (g === 9 || g === 10)) return igcse(a);
  // An IB Diploma learner gets Analysis and Approaches or Applications and Interpretation at standard level.
  if (a.curriculum === 'ib' && g >= 11 && !a.support) return ibDiploma(a);
  if (g <= 9) {
    const grade = Math.min(9, Math.max(5, g));
    // Alberta's new Grades 7 to 9 curriculum is optional until September 2027, so it is offered beside the course most classes still follow.
    const pilot = a.curriculum === 'ab' && grade >= 7 ? [{ courseId: `ab-grade-${grade}`, why: 'If your school is piloting Alberta’s new Grades 7 to 9 mathematics curriculum.' }] : [];
    return rec(`math-${grade}`, [`Grade ${grade} Mathematics covers the mathematics of your grade, so you learn what your class is learning.`], pilot);
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
