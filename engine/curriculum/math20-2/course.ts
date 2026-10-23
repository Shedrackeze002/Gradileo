/**
 * Mathematics 20-2 (Alberta), the -2 stream (foundations), Grade 11.
 * Outcomes follow the Alberta Mathematics 10–12 Program of Studies (2008), based on the WNCP
 * Common Curriculum Framework for Foundations of Mathematics Grade 11. Codes differ slightly between
 * sources; these follow the WNCP-coded list used by Alberta resources. The wording still needs a
 * word-for-word check against Alberta's Outcomes with Assessment Standards for Mathematics 20-2 (2013).
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'M1', strand: 'Measurement', text: 'Solve problems that involve the application of rates.' },
  { code: 'M2', strand: 'Measurement', text: 'Solve problems that involve scale diagrams, using proportional reasoning.' },
  { code: 'M3', strand: 'Measurement', text: 'Demonstrate an understanding of the relationships among scale factors, areas, surface areas and volumes of similar 2-D shapes and 3-D objects.' },
  { code: 'G1', strand: 'Geometry', text: 'Derive proofs that involve the properties of angles and triangles.' },
  { code: 'G2', strand: 'Geometry', text: 'Solve problems that involve properties of angles and triangles.' },
  { code: 'G3', strand: 'Geometry', text: 'Solve problems that involve the cosine law and the sine law, excluding the ambiguous case.' },
  { code: 'NL1', strand: 'Number and Logic', text: 'Analyze and prove conjectures, using inductive and deductive reasoning, to solve problems.' },
  { code: 'NL2', strand: 'Number and Logic', text: 'Analyze puzzles and games that involve spatial reasoning, using problem-solving strategies.' },
  { code: 'NL3', strand: 'Number and Logic', text: 'Solve problems that involve operations on radicals and radical expressions with numerical and variable radicands (limited to square roots).' },
  { code: 'NL4', strand: 'Number and Logic', text: 'Solve problems that involve radical equations (limited to square roots or cube roots).' },
  { code: 'S1', strand: 'Statistics', text: 'Demonstrate an understanding of normal distribution, including standard deviation and z-scores.' },
  { code: 'S2', strand: 'Statistics', text: 'Interpret statistical data, using confidence intervals, confidence levels and margin of error.' },
  { code: 'RF1', strand: 'Relations and Functions', text: 'Demonstrate an understanding of the characteristics of quadratic functions, including vertex, intercepts, domain and range, and axis of symmetry.' },
  { code: 'RF2', strand: 'Relations and Functions', text: 'Solve problems that involve quadratic equations.' },
  { code: 'RP1', strand: 'Mathematics Research Project', text: 'Research and give a presentation on a historical event or an area of interest that involves mathematics.' },
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
  // ---------------- Unit 1: Inductive and Deductive Reasoning ----------------
  L('m202-1-1', 'm202-u1', '1.1', 'Making Conjectures: Inductive Reasoning', ['NL1'],
    ['m202-conjecture', 'm202-pattern-conjecture'],
    ['Make a conjecture from a pattern or examples', 'Decide which conjecture fits the evidence'],
    70, ['conjecture', 'inductive reasoning']),
  L('m202-1-2', 'm202-u1', '1.2', 'Counterexamples', ['NL1'],
    ['m202-counterexample'],
    ['Find a counterexample that disproves a conjecture'],
    65, ['counterexample']),
  L('m202-1-3', 'm202-u1', '1.3', 'Proving Conjectures: Deductive Reasoning', ['NL1'],
    ['m202-deductive-proof', 'm202-proof-error'],
    ['Use deductive reasoning to prove a statement about numbers', 'Find the error in an invalid proof'],
    75, ['deductive reasoning', 'proof', 'valid', 'invalid']),
  L('m202-1-4', 'm202-u1', '1.4', 'Reasoning to Solve Problems and Puzzles', ['NL1', 'NL2'],
    ['m202-logic-puzzle', 'm202-spatial-puzzle'],
    ['Solve problems with inductive and deductive reasoning', 'Analyze puzzles and games that involve spatial reasoning and find winning strategies'],
    75, ['strategy']),

  // ---------------- Unit 2: Properties of Angles and Triangles ----------------
  L('m202-2-1', 'm202-u2', '2.1', 'Angles Formed by Parallel Lines', ['G1', 'G2'],
    ['m202-parallel-angles', 'm202-parallel-proof'],
    ['Find angles formed by parallel lines and a transversal', 'Prove that lines are parallel using angle relationships'],
    80, ['transversal', 'corresponding angles', 'alternate interior angles', 'same-side interior angles']),
  L('m202-2-2', 'm202-u2', '2.2', 'Angles in Triangles', ['G1', 'G2'],
    ['m202-triangle-angles', 'm202-exterior-angle'],
    ['Use the angle sum of a triangle to find unknown angles', 'Use the exterior angle property'],
    75, ['interior angle', 'exterior angle']),
  L('m202-2-3', 'm202-u2', '2.3', 'Angle Properties of Polygons', ['G2'],
    ['m202-polygon-angles'],
    ['Find the sum of the interior angles of a polygon and the measure of each angle of a regular polygon'],
    70, ['polygon', 'regular polygon', 'convex']),
  L('m202-2-4', 'm202-u2', '2.4', 'Congruent Triangles', ['G1'],
    ['m202-congruence'],
    ['Decide whether triangles are congruent using SSS, SAS or ASA', 'Complete a two-column proof'],
    75, ['congruent', 'SSS', 'SAS', 'ASA']),

  // ---------------- Unit 3: Acute Triangle Trigonometry ----------------
  L('m202-3-1', 'm202-u3', '3.1', 'The Sine Law', ['G3'],
    ['m202-sine-law'],
    ['Use the sine law to find a side or an angle of an acute triangle'],
    75, ['sine law', 'oblique triangle']),
  L('m202-3-2', 'm202-u3', '3.2', 'The Cosine Law', ['G3'],
    ['m202-cosine-law'],
    ['Use the cosine law to find a side or an angle of an acute triangle'],
    75, ['cosine law']),
  L('m202-3-3', 'm202-u3', '3.3', 'Solving Triangle Problems', ['G3'],
    ['m202-choose-law', 'm202-trig-apply'],
    ['Choose the sine law or the cosine law', 'Solve problems in surveying, navigation and construction'],
    80, []),

  // ---------------- Unit 4: Radicals ----------------
  L('m202-4-1', 'm202-u4', '4.1', 'Mixed and Entire Radicals', ['NL3'],
    ['m202-radical-simplify', 'm202-radical-order'],
    ['Change between mixed and entire radicals', 'Order radicals'],
    70, ['radical', 'mixed radical', 'entire radical']),
  L('m202-4-2', 'm202-u4', '4.2', 'Adding, Subtracting and Multiplying Radicals', ['NL3'],
    ['m202-radical-add', 'm202-radical-multiply'],
    ['Add and subtract like radicals', 'Multiply radical expressions'],
    75, ['like radicals']),
  L('m202-4-3', 'm202-u4', '4.3', 'Dividing Radicals', ['NL3'],
    ['m202-radical-divide'],
    ['Divide radicals and rationalize a monomial denominator'],
    70, ['rationalize']),
  L('m202-4-4', 'm202-u4', '4.4', 'Radical Equations', ['NL4'],
    ['m202-radical-equation'],
    ['Solve radical equations with square roots or cube roots and check for extraneous roots'],
    75, ['extraneous root']),

  // ---------------- Unit 5: Statistical Reasoning ----------------
  L('m202-5-1', 'm202-u5', '5.1', 'Standard Deviation', ['S1'],
    ['m202-standard-deviation', 'm202-compare-spread'],
    ['Find the mean and standard deviation of a data set', 'Compare the spread of two data sets'],
    80, ['standard deviation', 'dispersion', 'mean']),
  L('m202-5-2', 'm202-u5', '5.2', 'The Normal Distribution', ['S1'],
    ['m202-normal-percent'],
    ['Use the 68–95–99.7 rule to find percents of data', 'Decide whether data is approximately normal'],
    75, ['normal distribution', 'normal curve']),
  L('m202-5-3', 'm202-u5', '5.3', 'Z-Scores', ['S1'],
    ['m202-z-score', 'm202-z-area'],
    ['Find and interpret a z-score', 'Use z-scores and a z-score table to find percents'],
    80, ['z-score']),
  L('m202-5-4', 'm202-u5', '5.4', 'Confidence Intervals', ['S2'],
    ['m202-confidence-interval'],
    ['Interpret a confidence interval, confidence level and margin of error'],
    75, ['confidence interval', 'confidence level', 'margin of error']),

  // ---------------- Unit 6: Quadratic Functions ----------------
  L('m202-6-1', 'm202-u6', '6.1', 'Exploring Quadratic Functions', ['RF1'],
    ['m202-quad-features', 'm202-quad-graph-read'],
    ['Identify the vertex, axis of symmetry, intercepts, domain and range from a graph', 'Decide whether a parabola opens up or down'],
    75, ['parabola', 'vertex', 'axis of symmetry']),
  L('m202-6-2', 'm202-u6', '6.2', 'Properties of Quadratic Functions', ['RF1'],
    ['m202-quad-axis', 'm202-quad-max-min'],
    ['Find the axis of symmetry and vertex from the zeros or the equation', 'Solve maximum and minimum problems'],
    80, ['zeros', 'maximum', 'minimum']),
  L('m202-6-3', 'm202-u6', '6.3', 'Factored Form', ['RF1'],
    ['m202-factored-form'],
    ['Use factored form to find zeros, the vertex and the y-intercept'],
    75, ['factored form']),

  // ---------------- Unit 7: Quadratic Equations ----------------
  L('m202-7-1', 'm202-u7', '7.1', 'Solving by Graphing and Factoring', ['RF2'],
    ['m202-quad-solve-factor'],
    ['Solve quadratic equations by graphing and by factoring'],
    75, ['root']),
  L('m202-7-2', 'm202-u7', '7.2', 'The Quadratic Formula', ['RF2'],
    ['m202-quad-formula'],
    ['Solve quadratic equations with the quadratic formula'],
    75, ['quadratic formula']),
  L('m202-7-3', 'm202-u7', '7.3', 'Solving Problems with Quadratic Equations', ['RF2'],
    ['m202-quad-apply'],
    ['Model and solve problems with quadratic equations'],
    80, []),

  // ---------------- Unit 8: Proportional Reasoning ----------------
  L('m202-8-1', 'm202-u8', '8.1', 'Comparing and Interpreting Rates', ['M1'],
    ['m202-rate-compare', 'm202-rate-graph'],
    ['Compare rates and unit rates', 'Interpret a rate as the slope of a graph'],
    75, ['rate', 'unit rate']),
  L('m202-8-2', 'm202-u8', '8.2', 'Solving Rate Problems', ['M1'],
    ['m202-rate-apply'],
    ['Solve multi-step problems involving rates'],
    70, []),
  L('m202-8-3', 'm202-u8', '8.3', 'Scale Diagrams', ['M2'],
    ['m202-scale-factor', 'm202-scale-diagram'],
    ['Find a scale factor', 'Use a scale factor to find lengths in a scale diagram'],
    75, ['scale factor', 'scale diagram']),
  L('m202-8-4', 'm202-u8', '8.4', 'Area, Surface Area and Volume of Similar Objects', ['M3'],
    ['m202-similar-area', 'm202-similar-volume'],
    ['Use k² to relate the areas and surface areas of similar shapes and objects', 'Use k³ to relate the volumes of similar objects'],
    80, ['similar objects']),

  // ---------------- Unit 9: Mathematics Research Project ----------------
  L('m202-9-1', 'm202-u9', '9.1', 'Planning a Research Project', ['RP1'],
    ['m202-research-question', 'm202-research-data'],
    ['Write a good research question', 'Choose data sources and evaluate their reliability'],
    70, ['research question', 'primary data', 'secondary data', 'bias']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm202-u1', number: 1, title: 'Inductive and Deductive Reasoning', description: 'Conjectures, counterexamples, proofs and reasoning in puzzles and games.', outcomes: ['NL1', 'NL2'], lessons: [], color: 'emerald' },
  { id: 'm202-u2', number: 2, title: 'Properties of Angles and Triangles', description: 'Parallel lines, angles in triangles and polygons, and proofs.', outcomes: ['G1', 'G2'], lessons: [], color: 'amber' },
  { id: 'm202-u3', number: 3, title: 'Acute Triangle Trigonometry', description: 'The sine law and the cosine law for acute triangles.', outcomes: ['G3'], lessons: [], color: 'teal' },
  { id: 'm202-u4', number: 4, title: 'Radicals', description: 'Simplifying and operating on radicals and solving radical equations.', outcomes: ['NL3', 'NL4'], lessons: [], color: 'sky' },
  { id: 'm202-u5', number: 5, title: 'Statistical Reasoning', description: 'Standard deviation, the normal distribution, z-scores and confidence intervals.', outcomes: ['S1', 'S2'], lessons: [], color: 'violet' },
  { id: 'm202-u6', number: 6, title: 'Quadratic Functions', description: 'Vertex, axis of symmetry, intercepts, domain and range, and factored form.', outcomes: ['RF1'], lessons: [], color: 'orange' },
  { id: 'm202-u7', number: 7, title: 'Quadratic Equations', description: 'Solving quadratic equations by graphing, factoring and the quadratic formula.', outcomes: ['RF2'], lessons: [], color: 'rose' },
  { id: 'm202-u8', number: 8, title: 'Proportional Reasoning', description: 'Rates, scale diagrams, and area and volume of similar objects.', outcomes: ['M1', 'M2', 'M3'], lessons: [], color: 'fuchsia' },
  { id: 'm202-u9', number: 9, title: 'Mathematics Research Project', description: 'Planning a research project: questions, data sources and presenting findings.', outcomes: ['RP1'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH20_2: CourseMeta = {
  id: 'math-20-2',
  title: 'Grade 11 Mathematics: Foundations',
  shortTitle: 'Math 11 Foundations',
  grade: 11,
  subject: 'Mathematics',
  description: 'Foundations for Grade 11: reasoning and proof, angles and triangles, the sine and cosine laws, radicals, statistics, quadratic functions and equations, proportional reasoning and a research project.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
