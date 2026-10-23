/**
 * Mathematics 30-2 (Alberta), the -2 stream (foundations), Grade 12.
 * Outcomes follow the Alberta Mathematics 10–12 Program of Studies (2008), based on the WNCP
 * Common Curriculum Framework for Foundations of Mathematics Grade 12 with Alberta's changes
 * (rational expressions and the laws of logarithms). The topic areas are confirmed by Alberta course
 * outlines; the outcome wording still needs a word-for-word check against Alberta's Outcomes with
 * Assessment Standards for Mathematics 30-2.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'LR1', strand: 'Logical Reasoning', text: 'Analyze puzzles and games that involve numerical and logical reasoning, using problem-solving strategies.' },
  { code: 'LR2', strand: 'Logical Reasoning', text: 'Solve problems that involve the application of set theory.' },
  { code: 'LR3', strand: 'Logical Reasoning', text: 'Solve problems that involve conditional statements.' },
  { code: 'P1', strand: 'Probability', text: 'Interpret and assess the validity of odds and probability statements.' },
  { code: 'P2', strand: 'Probability', text: 'Solve problems that involve the probability of mutually exclusive and non-mutually exclusive events.' },
  { code: 'P3', strand: 'Probability', text: 'Solve problems that involve the probability of two events.' },
  { code: 'P4', strand: 'Probability', text: 'Solve problems that involve the fundamental counting principle.' },
  { code: 'P5', strand: 'Probability', text: 'Solve problems that involve permutations.' },
  { code: 'P6', strand: 'Probability', text: 'Solve problems that involve combinations.' },
  { code: 'RF1', strand: 'Relations and Functions', text: 'Determine equivalent forms of rational expressions (limited to numerators and denominators that are monomials and binomials).' },
  { code: 'RF2', strand: 'Relations and Functions', text: 'Perform operations on rational expressions (limited to numerators and denominators that are monomials and binomials).' },
  { code: 'RF3', strand: 'Relations and Functions', text: 'Solve problems that involve rational equations (limited to numerators and denominators that are monomials and binomials).' },
  { code: 'RF4', strand: 'Relations and Functions', text: 'Demonstrate an understanding of logarithms and the laws of logarithms.' },
  { code: 'RF5', strand: 'Relations and Functions', text: 'Solve problems that involve exponential equations.' },
  { code: 'RF6', strand: 'Relations and Functions', text: 'Represent data, using exponential and logarithmic functions, to solve problems.' },
  { code: 'RF7', strand: 'Relations and Functions', text: 'Represent data, using polynomial functions (of degree 3 or less), to solve problems.' },
  { code: 'RF8', strand: 'Relations and Functions', text: 'Represent data, using sinusoidal functions, to solve problems.' },
  { code: 'RP1', strand: 'Mathematics Research Project', text: 'Research and give a presentation on a current event or an area of interest that involves mathematics.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 75,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Set Theory and Logic ----------------
  L('m302-1-1', 'm302-u1', '1.1', 'Sets and Subsets', ['LR2'],
    ['m302-sets-basics'],
    ['Describe sets, elements, subsets and the universal set in words and set notation'],
    65, ['set', 'subset', 'universal set', 'empty set']),
  L('m302-1-2', 'm302-u1', '1.2', 'Venn Diagrams and Set Operations', ['LR2'],
    ['m302-set-operations', 'm302-venn-count'],
    ['Find unions, intersections, complements and differences', 'Solve counting problems with Venn diagrams and n(A ∪ B) = n(A) + n(B) - n(A ∩ B)'],
    80, ['union', 'intersection', 'complement']),
  L('m302-1-3', 'm302-u1', '1.3', 'Conditional Statements', ['LR3'],
    ['m302-conditional'],
    ['Write the converse, inverse and contrapositive', 'Decide whether a statement and its converse are true and write biconditionals'],
    70, ['converse', 'inverse', 'contrapositive', 'biconditional']),

  // ---------------- Unit 2: Counting Methods ----------------
  L('m302-2-1', 'm302-u2', '2.1', 'The Fundamental Counting Principle', ['P4'],
    ['m302-counting-principle'],
    ['Count outcomes with tree diagrams and the fundamental counting principle'],
    65, []),
  L('m302-2-2', 'm302-u2', '2.2', 'Permutations', ['P5'],
    ['m302-permutations'],
    ['Use factorial notation and nPr to count arrangements'],
    70, ['permutation', 'factorial']),
  L('m302-2-3', 'm302-u2', '2.3', 'Permutations with Repetition and Restrictions', ['P5'],
    ['m302-permutations-special'],
    ['Count arrangements with identical items and with restrictions'],
    70, []),
  L('m302-2-4', 'm302-u2', '2.4', 'Combinations', ['P6'],
    ['m302-combinations'],
    ['Use nCr and decide whether order matters'],
    75, ['combination']),

  // ---------------- Unit 3: Probability ----------------
  L('m302-3-1', 'm302-u3', '3.1', 'Odds and Probability', ['P1'],
    ['m302-odds'],
    ['Convert between odds and probability', 'Assess probability statements'],
    65, ['odds in favour', 'odds against']),
  L('m302-3-2', 'm302-u3', '3.2', 'Probability Using Counting Methods', ['P1', 'P5', 'P6'],
    ['m302-prob-counting'],
    ['Find probabilities with permutations and combinations'],
    70, []),
  L('m302-3-3', 'm302-u3', '3.3', 'Mutually Exclusive Events', ['P2'],
    ['m302-mutually-exclusive'],
    ['Use P(A or B) = P(A) + P(B) - P(A and B)'],
    70, ['mutually exclusive']),
  L('m302-3-4', 'm302-u3', '3.4', 'Independent and Dependent Events', ['P3'],
    ['m302-independent', 'm302-dependent'],
    ['Find P(A and B) for independent events', 'Find probabilities of dependent events and conditional probability'],
    80, ['independent events', 'dependent events', 'conditional probability']),

  // ---------------- Unit 4: Rational Expressions and Equations ----------------
  L('m302-4-1', 'm302-u4', '4.1', 'Equivalent Rational Expressions', ['RF1'],
    ['m302-rational-simplify'],
    ['State non-permissible values and simplify rational expressions'],
    70, ['rational expression', 'non-permissible value']),
  L('m302-4-2', 'm302-u4', '4.2', 'Operations on Rational Expressions', ['RF2'],
    ['m302-rational-operations'],
    ['Multiply, divide, add and subtract rational expressions'],
    80, []),
  L('m302-4-3', 'm302-u4', '4.3', 'Rational Equations', ['RF3'],
    ['m302-rational-equation', 'm302-rational-apply'],
    ['Solve rational equations and check for extraneous roots', 'Solve problems modelled by rational equations'],
    80, ['extraneous root']),

  // ---------------- Unit 5: Polynomial Functions ----------------
  L('m302-5-1', 'm302-u5', '5.1', 'Characteristics of Polynomial Functions', ['RF7'],
    ['m302-poly-features'],
    ['Identify degree, end behaviour, intercepts, turning points, domain and range of linear, quadratic and cubic functions'],
    75, ['end behaviour', 'turning point']),
  L('m302-5-2', 'm302-u5', '5.2', 'Modelling Data with Polynomial Functions', ['RF7'],
    ['m302-poly-model'],
    ['Use a given regression equation to interpolate and extrapolate', 'Choose the best polynomial model for a data set'],
    75, ['regression', 'interpolate', 'extrapolate']),

  // ---------------- Unit 6: Exponents and Logarithms ----------------
  L('m302-6-1', 'm302-u6', '6.1', 'Exponential Functions', ['RF6'],
    ['m302-exp-features'],
    ['Identify growth or decay, intercept, asymptote, domain and range'],
    65, ['exponential growth', 'exponential decay']),
  L('m302-6-2', 'm302-u6', '6.2', 'Solving Exponential Equations', ['RF5'],
    ['m302-exp-equation'],
    ['Solve exponential equations with a common base or with logarithms'],
    75, []),
  L('m302-6-3', 'm302-u6', '6.3', 'Logarithms and the Laws of Logarithms', ['RF4'],
    ['m302-log-evaluate', 'm302-log-laws'],
    ['Evaluate logarithms and convert between forms', 'Use the product, quotient and power laws'],
    80, ['logarithm']),
  L('m302-6-4', 'm302-u6', '6.4', 'Modelling with Exponential and Logarithmic Functions', ['RF6'],
    ['m302-exp-model', 'm302-log-model'],
    ['Model growth, decay, interest and half-life', 'Use logarithmic scales such as pH, decibels and earthquake magnitude'],
    80, ['half-life', 'logarithmic scale']),

  // ---------------- Unit 7: Sinusoidal Functions ----------------
  L('m302-7-1', 'm302-u7', '7.1', 'Periodic Behaviour and Sinusoidal Functions', ['RF8'],
    ['m302-sinusoid-features'],
    ['Identify amplitude, period, midline, maximum and minimum of sinusoidal graphs'],
    70, ['period', 'amplitude', 'midline']),
  L('m302-7-2', 'm302-u7', '7.2', 'Modelling Data with Sinusoidal Functions', ['RF8'],
    ['m302-sinusoid-model'],
    ['Use a sinusoidal regression equation to interpolate and extrapolate', 'Interpret features in context'],
    75, []),

  // ---------------- Unit 8: Puzzles, Games and the Research Project ----------------
  L('m302-8-1', 'm302-u8', '8.1', 'Puzzles and Games', ['LR1'],
    ['m302-puzzles'],
    ['Solve numerical and logical puzzles and find winning strategies'],
    65, ['strategy']),
  L('m302-8-2', 'm302-u8', '8.2', 'The Mathematics Research Project', ['RP1'],
    ['m302-research-project'],
    ['Plan a research project: question, data, analysis and presentation', 'Evaluate claims and data sources'],
    65, ['research question', 'bias']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm302-u1', number: 1, title: 'Set Theory and Logic', description: 'Sets, Venn diagrams, set notation and operations, and conditional statements.', outcomes: ['LR2', 'LR3'], lessons: [], color: 'emerald' },
  { id: 'm302-u2', number: 2, title: 'Counting Methods', description: 'The fundamental counting principle, permutations and combinations.', outcomes: ['P4', 'P5', 'P6'], lessons: [], color: 'amber' },
  { id: 'm302-u3', number: 3, title: 'Probability', description: 'Odds, probability with counting, mutually exclusive events, and independent and dependent events.', outcomes: ['P1', 'P2', 'P3'], lessons: [], color: 'teal' },
  { id: 'm302-u4', number: 4, title: 'Rational Expressions and Equations', description: 'Equivalent rational expressions, operations and rational equations.', outcomes: ['RF1', 'RF2', 'RF3'], lessons: [], color: 'sky' },
  { id: 'm302-u5', number: 5, title: 'Polynomial Functions', description: 'Characteristics of polynomial functions and modelling data with them.', outcomes: ['RF7'], lessons: [], color: 'violet' },
  { id: 'm302-u6', number: 6, title: 'Exponents and Logarithms', description: 'Exponential functions and equations, logarithms and their laws, and exponential and logarithmic models.', outcomes: ['RF4', 'RF5', 'RF6'], lessons: [], color: 'orange' },
  { id: 'm302-u7', number: 7, title: 'Sinusoidal Functions', description: 'Periodic behaviour and modelling data with sinusoidal functions.', outcomes: ['RF8'], lessons: [], color: 'rose' },
  { id: 'm302-u8', number: 8, title: 'Puzzles, Games and the Research Project', description: 'Numerical and logical puzzles and games, and planning a mathematics research project.', outcomes: ['LR1', 'RP1'], lessons: [], color: 'fuchsia' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH30_2: CourseMeta = {
  id: 'math-30-2',
  title: 'Grade 12 Mathematics: Foundations',
  shortTitle: 'Math 12 Foundations',
  grade: 12,
  subject: 'Mathematics',
  description: 'Foundations for Grade 12: set theory and logic, counting and probability, rational expressions and equations, polynomial, exponential, logarithmic and sinusoidal models, puzzles and the research project.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
