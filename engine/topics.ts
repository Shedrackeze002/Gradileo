/**
 * Topics first (roadmap item 5, step 2): every lesson filed under a plain topic ("Fractions",
 * "Quadratic functions and equations"), whichever course teaches it, so a learner anywhere can go
 * straight to a topic without knowing which course it sits in. A topic lists whole units and
 * single lessons (for units that cover more than one topic); its level comes from the grades of
 * the courses its lessons are in. A test checks that every lesson of every listed course is in a
 * topic.
 */
import { LISTED_COURSES } from './curriculum/index.ts';
import { levelIn } from './curricula.ts';

export interface Topic {
  id: string;
  name: string;
  subject: string;
  /** A group of topics on the page: "Number", "Algebra", "Poetry and drama" … */
  strand: string;
  /** Unit ids (all of their lessons) and lesson ids, in the order they are taught. */
  members: string[];
}

const M = 'Mathematics';
const C = 'Chemistry';
const E = 'English';
const t = (subject: string, strand: string, id: string, name: string, members: string[]): Topic => ({ id, name, subject, strand, members });

export const TOPICS: Topic[] = [
  // Mathematics: number.
  t(M, 'Number', 'whole-numbers', 'Place value and whole numbers', ['m5-u1', 'm104-u1']),
  t(M, 'Number', 'operations', 'Adding, subtracting, multiplying and dividing', ['m5-u2', 'm5-u4', 'm6-u2']),
  t(M, 'Number', 'factors', 'Factors, multiples and divisibility', ['m5-u3', 'm6-3-1', 'm6-3-3', 'm7-1-1', 'm10c-3-1']),
  t(M, 'Number', 'integers', 'Positive and negative numbers', ['m6-u1', 'm7-u4', 'm8-u5', 'm104-u4', 'm204-1-1']),
  t(M, 'Number', 'fractions', 'Fractions', ['m5-u5', 'm6-u4', 'm7-1-2', 'm7-u3', 'm8-u4', 'm104-u2', 'm204-1-2']),
  t(M, 'Number', 'decimals-percents', 'Decimals and percents', ['m7-1-2', 'm7-1-3', 'm7-u2', 'm8-u2', 'm104-u3', 'm204-1-4']),
  t(M, 'Number', 'rational-numbers', 'Rational and real numbers', ['m9-u3', 'm10c-3-3']),
  t(M, 'Number', 'ratios', 'Ratios, rates and proportions', ['m5-u6', 'm6-u5', 'm8-u3', 'm103-1-1', 'm202-u8', 'm204-1-3']),
  t(M, 'Number', 'powers', 'Powers and exponents', ['m6-3-2', 'm9-u2', 'm10c-3-5', 'm10c-3-6']),
  t(M, 'Number', 'roots-radicals', 'Square roots and radicals', ['m8-1-1', 'm8-1-2', 'm9-1-1', 'm9-1-2', 'm10c-3-2', 'm10c-3-4', 'm201-u5', 'm202-u4']),
  // Algebra.
  t(M, 'Algebra', 'expressions-equations', 'Expressions, formulas and equations', ['m5-u7', 'm6-u6', 'm7-u6', 'm104-5-2', 'm104-5-3', 'm204-5-1', 'm204-5-2']),
  t(M, 'Algebra', 'patterns-sequences', 'Patterns and sequences', ['m5-u11', 'm7-5-1', 'm104-5-1', 'm201-u1']),
  t(M, 'Algebra', 'linear-equations', 'Linear equations and inequalities', ['m8-u7', 'm9-u6']),
  t(M, 'Algebra', 'linear-relations', 'Linear relations and their graphs', ['m7-5-2', 'm8-u6', 'm9-u4', 'm104-5-4', 'm10c-u6', 'm10c-u7', 'm203-u1', 'm204-5-3', 'm303-u5']),
  t(M, 'Algebra', 'polynomials', 'Polynomials and factoring', ['m9-u5', 'm10c-u4', 'm201-4-1']),
  t(M, 'Algebra', 'systems', 'Systems of equations', ['m10c-u8', 'm201-u8']),
  t(M, 'Algebra', 'quadratics', 'Quadratic functions and equations', ['m201-u3', 'm201-4-2', 'm201-4-3', 'm201-4-4', 'm202-u6', 'm202-u7']),
  t(M, 'Algebra', 'inequalities', 'Linear and quadratic inequalities', ['m201-u9']),
  t(M, 'Algebra', 'rational-expressions', 'Rational expressions and equations', ['m201-u6', 'm302-u4']),
  // Functions.
  t(M, 'Functions', 'functions', 'Relations and functions', ['m6-u11', 'm10c-u5', 'm31-1-1']),
  t(M, 'Functions', 'function-transformations', 'Transformations of functions', ['m301-u1']),
  t(M, 'Functions', 'absolute-reciprocal', 'Absolute value and reciprocal functions', ['m201-u7']),
  t(M, 'Functions', 'radical-functions', 'Radical functions', ['m301-u2']),
  t(M, 'Functions', 'polynomial-functions', 'Polynomial functions', ['m301-u3', 'm302-u5']),
  t(M, 'Functions', 'exponentials-logarithms', 'Exponential functions and logarithms', ['m301-u7', 'm302-u6']),
  t(M, 'Functions', 'rational-functions', 'Rational functions and combining functions', ['m301-u8']),
  // Geometry and measurement.
  t(M, 'Geometry and measurement', 'measurement', 'Measurement, units and conversions', ['m10c-1-1', 'm10c-1-2', 'm10c-1-3', 'm10c-1-4', 'm103-u3', 'm103-u4', 'm104-u6', 'm204-u6', 'm303-u1']),
  t(M, 'Geometry and measurement', 'perimeter-area', 'Perimeter and area', ['m5-u10', 'm6-u9', 'm7-7-2', 'm7-7-3', 'm103-u5', 'm104-7-1', 'm104-7-2', 'm204-u7']),
  t(M, 'Geometry and measurement', 'circles', 'Circles', ['m7-7-1', 'm7-7-4', 'm9-u8']),
  t(M, 'Geometry and measurement', 'surface-area-volume', 'Surface area and volume', ['m6-u10', 'm8-u8', 'm9-1-3', 'm10c-1-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8', 'm104-7-3', 'm203-u2', 'm203-u3']),
  t(M, 'Geometry and measurement', 'angles-polygons', 'Angles, triangles and polygons', ['m6-7-2', 'm8-u9', 'm103-u6', 'm202-u2', 'm303-u3']),
  t(M, 'Geometry and measurement', 'constructions', 'Geometric constructions', ['m7-u8']),
  t(M, 'Geometry and measurement', 'coordinate-plane', 'The coordinate plane', ['m5-u9', 'm6-u8', 'm7-9-1']),
  t(M, 'Geometry and measurement', 'symmetry-transformations', 'Symmetry and transformations', ['m5-u8', 'm6-7-1', 'm7-9-2', 'm7-9-3', 'm9-u9', 'm104-u8', 'm303-u4']),
  t(M, 'Geometry and measurement', 'similarity-scale', 'Similarity and scale', ['m9-u7', 'm103-7-3', 'm103-7-4', 'm203-u5', 'm204-u8']),
  // Trigonometry.
  t(M, 'Trigonometry', 'pythagoras', 'The Pythagorean theorem', ['m8-1-3', 'm8-1-4', 'm103-7-1', 'm103-7-2']),
  t(M, 'Trigonometry', 'right-triangle-trig', 'Right-triangle trigonometry', ['m10c-u2', 'm103-u8', 'm203-u4']),
  t(M, 'Trigonometry', 'sine-cosine-laws', 'Angles of any size, and the sine and cosine laws', ['m201-u2', 'm202-u3', 'm303-u2']),
  t(M, 'Trigonometry', 'unit-circle', 'The unit circle and trigonometric functions', ['m301-u4', 'm301-u5', 'm302-u7', 'm31-1-2']),
  t(M, 'Trigonometry', 'trig-identities', 'Trigonometric identities', ['m301-u6']),
  // Data and probability.
  t(M, 'Data and probability', 'data', 'Data, graphs and statistics', ['m5-u12', 'm7-u10', 'm8-u10', 'm9-u10', 'm104-u9', 'm202-u5', 'm203-8-1', 'm203-8-2', 'm204-u9', 'm303-u6']),
  t(M, 'Data and probability', 'probability', 'Probability', ['m6-u12', 'm7-u11', 'm8-u10', 'm9-u10', 'm104-u9', 'm204-u9', 'm302-u3', 'm303-u7']),
  t(M, 'Data and probability', 'counting', 'Counting, permutations and combinations', ['m301-u9', 'm302-u2']),
  // Money.
  t(M, 'Money', 'prices', 'Prices, unit rates and currency', ['m103-1-2', 'm103-1-3', 'm103-1-4', 'm204-u2']),
  t(M, 'Money', 'income', 'Earning an income', ['m103-u2', 'm204-u3']),
  t(M, 'Money', 'budgets-credit', 'Budgets, banking, interest and credit', ['m203-u6', 'm203-u7', 'm204-u4', 'm303-u8']),
  // Reasoning.
  t(M, 'Reasoning', 'logic', 'Reasoning, sets and logic', ['m202-u1', 'm302-u1']),
  t(M, 'Reasoning', 'puzzles-projects', 'Puzzles, games and research projects', ['m203-8-3', 'm202-u9', 'm302-u8', 'm303-u9']),
  // Calculus.
  t(M, 'Calculus', 'limits', 'Limits and continuity', ['m31-u2']),
  t(M, 'Calculus', 'derivatives', 'Derivatives and differentiation rules', ['m31-u3', 'm31-u4', 'm31-u5']),
  t(M, 'Calculus', 'derivative-applications', 'Applications of derivatives', ['m31-u6', 'm31-u7']),
  t(M, 'Calculus', 'integrals', 'Antiderivatives and integrals', ['m31-u8', 'm31-u9']),

  // Chemistry.
  t(C, 'Matter and bonding', 'matter', 'Matter and the particle model', ['c10-u1']),
  t(C, 'Matter and bonding', 'atoms', 'Atoms and the periodic table', ['c10-u2']),
  t(C, 'Matter and bonding', 'bonding', 'Bonding, names and formulas', ['c10-u3', 'c20-u1']),
  t(C, 'Matter and bonding', 'gases', 'Gases', ['c20-u2']),
  t(C, 'Reactions and quantities', 'reactions', 'Chemical reactions and equations', ['c10-4-1', 'c10-4-2', 'c10-4-3', 'c20-4-1', 'c20-4-2']),
  t(C, 'Reactions and quantities', 'moles-stoichiometry', 'The mole and stoichiometry', ['c10-5-1', 'c10-5-2', 'c20-4-3', 'c20-4-4', 'c20-4-5', 'c20-4-6', 'c20-4-7', 'c20-4-8']),
  t(C, 'Reactions and quantities', 'solutions', 'Solutions and concentration', ['c20-3-1', 'c20-3-2', 'c20-3-3', 'c20-3-4', 'c20-3-5']),
  t(C, 'Reactions and quantities', 'acids-bases', 'Acids and bases', ['c10-5-3', 'c10-5-4', 'c20-3-6', 'c20-3-7', 'c20-3-8', 'c30-u4']),
  t(C, 'Energy, equilibrium and organic chemistry', 'energy-rates', 'Energy changes and reaction rates', ['c10-4-4', 'c10-4-5', 'c30-u1']),
  t(C, 'Energy, equilibrium and organic chemistry', 'electrochemistry', 'Electrochemistry', ['c30-u2']),
  t(C, 'Energy, equilibrium and organic chemistry', 'organic', 'Organic chemistry', ['c30-u3']),
  t(C, 'Energy, equilibrium and organic chemistry', 'equilibrium', 'Chemical equilibrium', ['c30-u4']),

  // English.
  t(E, 'Reading', 'fiction', 'Fiction and short stories', ['e10-u1', 'e11-u1', 'e12-u1']),
  t(E, 'Reading', 'poetry', 'Poetry', ['e10-u2', 'e11-u2', 'e12-u2']),
  t(E, 'Reading', 'shakespeare', 'Shakespeare', ['e10-u3', 'e11-u3', 'e12-u3']),
  t(E, 'Reading', 'nonfiction-rhetoric', 'Non-fiction, essays and rhetoric', ['e10-u4', 'e11-u4', 'e12-u4']),
  t(E, 'Reading', 'media', 'Media and visual texts', ['e10-u5', 'e11-u5', 'e12-u5']),
  t(E, 'Writing and language', 'writing', 'Writing', ['e10-u6', 'e11-u6', 'e12-u6']),
  t(E, 'Writing and language', 'grammar', 'Grammar and language', ['e10-u7', 'e11-u7', 'e12-u7']),
];

export interface TopicLesson {
  lessonId: string;
  title: string;
  courseId: string;
  grade: number;
}

const UNITS = new Map(LISTED_COURSES.flatMap((c) => c.units.map((u) => [u.id, { course: c, unit: u }] as const)));
const LESSONS = new Map(LISTED_COURSES.flatMap((c) => c.lessons.map((l) => [l.id, { course: c, lesson: l }] as const)));

/** A topic's lessons, youngest course first and in teaching order within a course. */
export function topicLessons(topic: Topic): TopicLesson[] {
  const ids: string[] = [];
  for (const m of topic.members) {
    const u = UNITS.get(m);
    for (const id of u ? u.unit.lessons : [m]) if (!ids.includes(id)) ids.push(id);
  }
  const out = ids.flatMap((id) => {
    const l = LESSONS.get(id);
    return l ? [{ lessonId: id, title: l.lesson.title, courseId: l.course.id, grade: l.course.grade }] : [];
  });
  return out.sort((a, b) => a.grade - b.grade || LISTED_COURSES.findIndex((c) => c.id === a.courseId) - LISTED_COURSES.findIndex((c) => c.id === b.courseId) || order(a.lessonId) - order(b.lessonId));
}

function order(lessonId: string): number {
  const l = LESSONS.get(lessonId);
  return l ? l.course.lessons.indexOf(l.lesson) : 0;
}

/**
 * The Workplace and Essentials courses revisit earlier topics in everyday settings (fractions in
 * Grade 10 Essentials), so they set a topic's level only when no other course teaches it.
 */
const REVISITS = new Set(['math-10-3', 'math-10-4', 'math-20-3', 'math-20-4', 'math-30-3']);

/** The grades a topic is taught in, lowest and highest. */
export function topicGrades(topic: Topic): [number, number] {
  const lessons = topicLessons(topic);
  const first = lessons.filter((l) => !REVISITS.has(l.courseId));
  const grades = (first.length ? first : lessons).map((l) => l.grade);
  return [Math.min(...grades), Math.max(...grades)];
}

/** Year words said in the plural for a range ("Years 11–13"); others stay as they are ("Primary 5–6", "SS 1–3"). */
const PLURAL: Record<string, string> = { Year: 'Years', Grade: 'Grades', Class: 'Classes', Form: 'Forms' };

/**
 * A topic's level for a learner: in their own system's years where it has its own names ("Years
 * 11–13", "JSS 1 – SS 2", "About ages 15–17"), otherwise as grades ("Grades 10–12", "Grade 12").
 */
export function topicLevel(topic: Topic, curriculumId?: string | null): string {
  const [lo, hi] = topicGrades(topic);
  const a = levelIn(curriculumId, lo);
  const b = levelIn(curriculumId, hi);
  if (!a || !b) return lo === hi ? `Grade ${lo}` : `Grades ${lo}–${hi}`;
  if (curriculumId === 'other') return lo === hi ? `About ${a}` : `About ages ${a.replace('age ', '')}–${b.replace('age ', '')}`;
  if (a === b) return a;
  // "Year 11" to "Year 13" share their word, so "Years 11–13"; "JSS 1" to "SS 2" do not.
  const ma = /^(.*\D)\s+(\d+)$/.exec(a);
  const mb = /^(.*\D)\s+(\d+)$/.exec(b);
  if (ma && mb && ma[1] === mb[1]) return `${PLURAL[ma[1]] ?? ma[1]} ${ma[2]}–${mb[2]}`;
  return `${a} – ${b}`;
}

/** The subjects that have topics, in the order the courses list them. */
export const TOPIC_SUBJECTS = [...new Set(TOPICS.map((t) => t.subject))];
