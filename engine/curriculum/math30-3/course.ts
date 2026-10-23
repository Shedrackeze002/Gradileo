/**
 * Mathematics 30-3 (Alberta), the -3 stream (workplace and apprenticeship), Grade 12.
 * Outcomes follow the Alberta Mathematics 10–12 Program of Studies (2008), based on the WNCP
 * Common Curriculum Framework for Apprenticeship and Workplace Mathematics Grade 12. The topics
 * are confirmed by Alberta-equivalent college course outlines; the outcome wording still needs a
 * word-for-word check against Alberta's Outcomes with Assessment Standards for Mathematics 30-3 (2014).
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'M1', strand: 'Measurement', text: 'Demonstrate an understanding of the limitations of measuring instruments, including precision, accuracy, uncertainty and tolerance.' },
  { code: 'G1', strand: 'Geometry', text: 'Solve problems by using the sine law and cosine law, excluding the ambiguous case.' },
  { code: 'G2', strand: 'Geometry', text: 'Solve problems that involve triangles, quadrilaterals and regular polygons.' },
  { code: 'G3', strand: 'Geometry', text: 'Demonstrate an understanding of transformations on a 2-D shape or a 3-D object, including translations, rotations, reflections and dilations.' },
  { code: 'N1', strand: 'Number', text: 'Analyze puzzles and games that involve logical reasoning, using problem-solving strategies.' },
  { code: 'N2', strand: 'Number', text: 'Solve problems that involve the acquisition of a vehicle by buying, leasing and leasing to buy.' },
  { code: 'N3', strand: 'Number', text: 'Critique the viability of small business options by considering expenses, sales, and profit or loss.' },
  { code: 'A1', strand: 'Algebra', text: 'Demonstrate an understanding of linear relations by recognizing patterns and trends, graphing, creating tables of values, writing equations, interpolating and extrapolating, and solving problems.' },
  { code: 'S1', strand: 'Statistics', text: 'Solve problems that involve measures of central tendency, including mean, median, mode, weighted mean and trimmed mean.' },
  { code: 'S2', strand: 'Statistics', text: 'Analyze and describe percentiles.' },
  { code: 'P1', strand: 'Probability', text: 'Analyze and interpret problems that involve probability.' },
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
  // ---------------- Unit 1: Limits of Measurement ----------------
  L('m303-1-1', 'm303-u1', '1.1', 'Precision and Accuracy', ['M1'],
    ['m303-precision-accuracy'],
    ['Tell precision from accuracy', 'State the precision of an instrument and of a measurement'],
    70, ['precision', 'accuracy']),
  L('m303-1-2', 'm303-u1', '1.2', 'Uncertainty and Tolerance', ['M1'],
    ['m303-tolerance'],
    ['Find the acceptable range from a tolerance', 'Decide whether a part is within tolerance'],
    70, ['uncertainty', 'tolerance']),

  // ---------------- Unit 2: Oblique Triangles ----------------
  L('m303-2-1', 'm303-u2', '2.1', 'The Sine Law', ['G1'],
    ['m303-sine-law'],
    ['Use the sine law to find a side or an angle'],
    75, ['oblique triangle', 'sine law']),
  L('m303-2-2', 'm303-u2', '2.2', 'The Cosine Law', ['G1'],
    ['m303-cosine-law'],
    ['Use the cosine law to find a side or an angle'],
    75, ['cosine law']),
  L('m303-2-3', 'm303-u2', '2.3', 'Solving Problems with Oblique Triangles', ['G1'],
    ['m303-oblique-apply'],
    ['Choose the sine law or the cosine law and solve workplace problems'],
    75, []),

  // ---------------- Unit 3: Triangles, Quadrilaterals and Polygons ----------------
  L('m303-3-1', 'm303-u3', '3.1', 'Properties of Triangles and Quadrilaterals', ['G2'],
    ['m303-quad-properties'],
    ['Use properties of triangles and quadrilaterals to find angles and sides'],
    70, ['parallelogram', 'rhombus', 'trapezoid']),
  L('m303-3-2', 'm303-u3', '3.2', 'Angles in Regular Polygons', ['G2'],
    ['m303-polygon-angles'],
    ['Find interior and exterior angles of regular polygons'],
    70, ['regular polygon', 'interior angle', 'exterior angle']),
  L('m303-3-3', 'm303-u3', '3.3', 'Problems with Polygons', ['G2'],
    ['m303-polygon-apply'],
    ['Solve design and construction problems with polygons'],
    70, []),

  // ---------------- Unit 4: Transformations ----------------
  L('m303-4-1', 'm303-u4', '4.1', 'Translations, Reflections and Rotations', ['G3'],
    ['m303-transform-2d'],
    ['Find image coordinates after a translation, reflection or rotation', 'Describe a transformation from a diagram'],
    75, ['translation', 'reflection', 'rotation']),
  L('m303-4-2', 'm303-u4', '4.2', 'Dilations', ['G3'],
    ['m303-dilation'],
    ['Find image points and dimensions after a dilation', 'Relate dilations to scale'],
    70, ['dilation', 'scale factor']),

  // ---------------- Unit 5: Linear Relations ----------------
  L('m303-5-1', 'm303-u5', '5.1', 'Patterns, Tables and Graphs', ['A1'],
    ['m303-linear-table'],
    ['Recognize linear patterns in tables and graphs', 'Find the rate of change and initial value'],
    70, ['rate of change', 'initial value']),
  L('m303-5-2', 'm303-u5', '5.2', 'Writing Linear Equations', ['A1'],
    ['m303-linear-equation'],
    ['Write an equation from a table, graph or description', 'Solve problems with the equation'],
    75, []),
  L('m303-5-3', 'm303-u5', '5.3', 'Interpolating and Extrapolating', ['A1'],
    ['m303-interpolate'],
    ['Interpolate and extrapolate from graphs and equations', 'Judge when an extrapolation is reasonable'],
    70, ['interpolation', 'extrapolation']),

  // ---------------- Unit 6: Statistics ----------------
  L('m303-6-1', 'm303-u6', '6.1', 'Mean, Median and Mode', ['S1'],
    ['m303-central-tendency'],
    ['Find the mean, median and mode', 'Choose the measure that best describes a data set'],
    70, ['mean', 'median', 'mode', 'outlier']),
  L('m303-6-2', 'm303-u6', '6.2', 'Weighted and Trimmed Means', ['S1'],
    ['m303-weighted-mean'],
    ['Calculate weighted means such as course marks', 'Calculate trimmed means'],
    70, ['weighted mean', 'trimmed mean']),
  L('m303-6-3', 'm303-u6', '6.3', 'Percentiles', ['S2'],
    ['m303-percentile'],
    ['Interpret percentile ranks', 'Find a percentile rank from data'],
    65, ['percentile', 'percentile rank']),

  // ---------------- Unit 7: Probability ----------------
  L('m303-7-1', 'm303-u7', '7.1', 'Probability and Odds', ['P1'],
    ['m303-probability-odds'],
    ['Express probability as a fraction, decimal and percent', 'Convert between probability and odds'],
    70, ['probability', 'odds']),
  L('m303-7-2', 'm303-u7', '7.2', 'Probability of Combined Events', ['P1'],
    ['m303-probability-combined'],
    ['Find probabilities of independent, dependent and mutually exclusive events'],
    70, ['independent events', 'dependent events', 'mutually exclusive']),

  // ---------------- Unit 8: Vehicles and Small Business ----------------
  L('m303-8-1', 'm303-u8', '8.1', 'Buying a Vehicle', ['N2'],
    ['m303-vehicle-buy'],
    ['Find the total cost of buying a vehicle with a loan', 'Include taxes, fees, insurance and operating costs'],
    75, ['down payment', 'depreciation']),
  L('m303-8-2', 'm303-u8', '8.2', 'Leasing and Leasing to Buy', ['N2'],
    ['m303-vehicle-lease'],
    ['Find the total cost of a lease and a lease-to-buy', 'Compare buying with leasing'],
    75, ['lease', 'residual value']),
  L('m303-8-3', 'm303-u8', '8.3', 'Small Business: Expenses, Sales and Profit', ['N3'],
    ['m303-business-profit', 'm303-business-breakeven'],
    ['Find profit or loss from expenses and sales', 'Find the break-even point and judge whether a business is viable'],
    80, ['fixed cost', 'variable cost', 'break-even point']),

  // ---------------- Unit 9: Logic Puzzles and Games ----------------
  L('m303-9-1', 'm303-u9', '9.1', 'Logic Puzzles and Games', ['N1'],
    ['m303-logic-puzzle'],
    ['Solve logic puzzles and find winning strategies in games'],
    65, ['strategy']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm303-u1', number: 1, title: 'Limits of Measurement', description: 'Precision, accuracy, uncertainty and tolerance.', outcomes: ['M1'], lessons: [], color: 'emerald' },
  { id: 'm303-u2', number: 2, title: 'Oblique Triangles', description: 'The sine law and the cosine law in workplace problems.', outcomes: ['G1'], lessons: [], color: 'amber' },
  { id: 'm303-u3', number: 3, title: 'Triangles, Quadrilaterals and Polygons', description: 'Properties of triangles and quadrilaterals and angles of regular polygons.', outcomes: ['G2'], lessons: [], color: 'teal' },
  { id: 'm303-u4', number: 4, title: 'Transformations', description: 'Translations, reflections, rotations and dilations of 2-D shapes and 3-D objects.', outcomes: ['G3'], lessons: [], color: 'sky' },
  { id: 'm303-u5', number: 5, title: 'Linear Relations', description: 'Patterns, tables, graphs and equations of linear relations, with interpolation and extrapolation.', outcomes: ['A1'], lessons: [], color: 'violet' },
  { id: 'm303-u6', number: 6, title: 'Statistics', description: 'Mean, median, mode, weighted and trimmed means, and percentiles.', outcomes: ['S1', 'S2'], lessons: [], color: 'orange' },
  { id: 'm303-u7', number: 7, title: 'Probability', description: 'Probability and odds, and probability of combined events.', outcomes: ['P1'], lessons: [], color: 'rose' },
  { id: 'm303-u8', number: 8, title: 'Vehicles and Small Business', description: 'Buying, leasing and leasing to buy a vehicle, and the expenses, sales and profit of a small business.', outcomes: ['N2', 'N3'], lessons: [], color: 'fuchsia' },
  { id: 'm303-u9', number: 9, title: 'Logic Puzzles and Games', description: 'Puzzles and games that involve logical reasoning.', outcomes: ['N1'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH30_3: CourseMeta = {
  id: 'math-30-3',
  title: 'Grade 12 Mathematics: Workplace',
  shortTitle: 'Math 12 Workplace',
  grade: 12,
  subject: 'Mathematics',
  description: 'Workplace and apprenticeship mathematics for Grade 12: limits of measurement, the sine and cosine laws, polygons, transformations, linear relations, statistics, probability, buying or leasing a vehicle, small business, and puzzles.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
