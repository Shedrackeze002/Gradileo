/**
 * Mathematics 20-3 (Alberta), the -3 stream (workplace and apprenticeship), Grade 11.
 * Outcomes follow the Alberta Mathematics 10–12 Program of Studies (2008), based on the WNCP
 * Common Curriculum Framework for Apprenticeship and Workplace Mathematics Grade 11. Codes and wording
 * follow the WNCP framework (Alberta course outlines confirm M1 surface area and N2 personal budgets);
 * a word-for-word check against Alberta's Outcomes with Assessment Standards for Mathematics 20-3 (2013)
 * is still needed.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'M1', strand: 'Measurement', text: 'Solve problems that involve SI and imperial units in surface area measurements and verify the solutions.' },
  { code: 'M2', strand: 'Measurement', text: 'Solve problems that involve SI and imperial units in volume and capacity measurements.' },
  { code: 'G1', strand: 'Geometry', text: 'Solve problems that involve two and three right triangles.' },
  { code: 'G2', strand: 'Geometry', text: 'Solve problems that involve scale.' },
  { code: 'G3', strand: 'Geometry', text: 'Model and draw 3-D objects and their views.' },
  { code: 'G4', strand: 'Geometry', text: 'Draw and describe exploded views, component parts and scale diagrams of simple 3-D objects.' },
  { code: 'N1', strand: 'Number', text: 'Analyze puzzles and games that involve numerical reasoning, using problem-solving strategies.' },
  { code: 'N2', strand: 'Number', text: 'Solve problems that involve personal budgets.' },
  { code: 'N3', strand: 'Number', text: 'Demonstrate an understanding of compound interest.' },
  { code: 'N4', strand: 'Number', text: 'Demonstrate an understanding of financial institution services used to access and manage finances.' },
  { code: 'N5', strand: 'Number', text: 'Demonstrate an understanding of credit options, including credit cards and loans.' },
  { code: 'A1', strand: 'Algebra', text: 'Solve problems that require the manipulation and application of formulas related to volume and capacity, surface area, slope and rate of change, simple interest, and finance charges.' },
  { code: 'A2', strand: 'Algebra', text: 'Demonstrate an understanding of slope as rise over run and as rate of change, by solving problems.' },
  { code: 'A3', strand: 'Algebra', text: 'Solve problems by applying proportional reasoning and unit analysis.' },
  { code: 'S1', strand: 'Statistics', text: 'Solve problems that involve creating and interpreting graphs, including bar graphs, histograms, line graphs and circle graphs.' },
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
  // ---------------- Unit 1: Slope and Rate of Change ----------------
  L('m203-1-1', 'm203-u1', '1.1', 'Slope as Rise over Run', ['A2'],
    ['m203-slope-rise-run', 'm203-slope-grade'],
    ['Find the slope of a ramp, roof or road as rise over run', 'Express slope as a fraction, decimal, percent grade or pitch'],
    75, ['slope', 'rise', 'run', 'grade', 'pitch']),
  L('m203-1-2', 'm203-u1', '1.2', 'Slope as Rate of Change', ['A2', 'A1'],
    ['m203-rate-of-change', 'm203-slope-graph'],
    ['Find a rate of change from a table or graph', 'Interpret the slope of a graph in context'],
    75, ['rate of change']),
  L('m203-1-3', 'm203-u1', '1.3', 'Proportional Reasoning and Unit Analysis', ['A3'],
    ['m203-proportion', 'm203-unit-analysis'],
    ['Solve problems with proportions', 'Convert rates with unit analysis (km/h to m/s, $/kg to $/lb)'],
    75, ['proportion', 'unit analysis', 'conversion factor']),

  // ---------------- Unit 2: Surface Area ----------------
  L('m203-2-1', 'm203-u2', '2.1', 'Surface Area of Prisms and Cylinders', ['M1', 'A1'],
    ['m203-sa-prism', 'm203-sa-cylinder'],
    ['Find the surface area of rectangular and triangular prisms', 'Find the surface area of cylinders'],
    80, ['surface area', 'net', 'lateral area']),
  L('m203-2-2', 'm203-u2', '2.2', 'Surface Area of Pyramids, Cones and Spheres', ['M1', 'A1'],
    ['m203-sa-pyramid-cone', 'm203-sa-sphere'],
    ['Find the surface area of pyramids and cones using slant height', 'Find the surface area of spheres'],
    80, ['slant height', 'sphere']),
  L('m203-2-3', 'm203-u2', '2.3', 'Surface Area Problems', ['M1', 'A1'],
    ['m203-sa-apply'],
    ['Solve problems involving surface area in SI and imperial units, including material cost'],
    75, []),

  // ---------------- Unit 3: Volume and Capacity ----------------
  L('m203-3-1', 'm203-u3', '3.1', 'Volume of Prisms and Cylinders', ['M2', 'A1'],
    ['m203-vol-prism', 'm203-vol-cylinder'],
    ['Find the volume of prisms and cylinders', 'Relate volume and capacity'],
    80, ['volume', 'capacity']),
  L('m203-3-2', 'm203-u3', '3.2', 'Volume of Pyramids, Cones and Spheres', ['M2', 'A1'],
    ['m203-vol-pyramid-cone', 'm203-vol-sphere'],
    ['Find the volume of pyramids and cones', 'Find the volume of spheres'],
    80, []),
  L('m203-3-3', 'm203-u3', '3.3', 'Volume and Capacity Problems', ['M2', 'A1'],
    ['m203-vol-apply', 'm203-vol-rearrange'],
    ['Solve problems involving volume and capacity in SI and imperial units', 'Rearrange a volume formula to find a missing dimension'],
    80, []),

  // ---------------- Unit 4: Right Triangles ----------------
  L('m203-4-1', 'm203-u4', '4.1', 'Reviewing Right-Triangle Trigonometry', ['G1'],
    ['m203-trig-review'],
    ['Use the Pythagorean theorem and primary trigonometric ratios to solve one right triangle'],
    70, ['sine', 'cosine', 'tangent']),
  L('m203-4-2', 'm203-u4', '4.2', 'Problems with Two Right Triangles', ['G1'],
    ['m203-two-triangles'],
    ['Solve problems involving two right triangles, such as angles of elevation from two points'],
    80, ['angle of elevation', 'angle of depression']),
  L('m203-4-3', 'm203-u4', '4.3', 'Problems with Three Right Triangles', ['G1'],
    ['m203-three-triangles'],
    ['Solve problems involving three right triangles'],
    80, []),

  // ---------------- Unit 5: Scale and 3-D Objects ----------------
  L('m203-5-1', 'm203-u5', '5.1', 'Scale Drawings and Scale Factors', ['G2'],
    ['m203-scale-length', 'm203-scale-area-volume'],
    ['Use a scale to find lengths on a drawing or in real life', 'Relate area and volume to the scale factor (k² and k³)'],
    75, ['scale', 'scale factor']),
  L('m203-5-2', 'm203-u5', '5.2', 'Views of 3-D Objects', ['G3'],
    ['m203-views'],
    ['Match a 3-D object with its top, front and side views', 'Count cubes from views'],
    75, ['top view', 'front view', 'side view', 'isometric']),
  L('m203-5-3', 'm203-u5', '5.3', 'Exploded Views and Component Parts', ['G4'],
    ['m203-exploded-views'],
    ['Identify the parts of an object from an exploded view and use a parts list'],
    70, ['exploded view', 'component']),

  // ---------------- Unit 6: Personal Budgets and Banking ----------------
  L('m203-6-1', 'm203-u6', '6.1', 'Personal Budgets', ['N2'],
    ['m203-budget', 'm203-budget-adjust'],
    ['Create and balance a personal budget', 'Adjust a budget to reach a savings goal'],
    75, ['budget', 'fixed expense', 'variable expense', 'net income']),
  L('m203-6-2', 'm203-u6', '6.2', 'Banking Services', ['N4'],
    ['m203-bank-fees', 'm203-bank-reconcile'],
    ['Compare bank account plans and fees', 'Reconcile a bank statement'],
    70, ['service charge', 'statement', 'overdraft']),

  // ---------------- Unit 7: Interest and Credit ----------------
  L('m203-7-1', 'm203-u7', '7.1', 'Simple and Compound Interest', ['N3', 'A1'],
    ['m203-simple-interest', 'm203-compound-interest'],
    ['Calculate simple interest', 'Calculate compound interest and compare it with simple interest'],
    80, ['principal', 'compound interest', 'compounding period']),
  L('m203-7-2', 'm203-u7', '7.2', 'The Rule of 72 and Investments', ['N3'],
    ['m203-rule-of-72'],
    ['Estimate doubling time with the Rule of 72', 'Compare investment options'],
    65, ['Rule of 72', 'investment']),
  L('m203-7-3', 'm203-u7', '7.3', 'Credit Cards and Loans', ['N5', 'A1'],
    ['m203-credit-card', 'm203-loan-cost'],
    ['Find the finance charge on a credit card balance', 'Compare the total cost of loans'],
    80, ['credit', 'finance charge', 'loan']),

  // ---------------- Unit 8: Graphs and Puzzles ----------------
  L('m203-8-1', 'm203-u8', '8.1', 'Bar Graphs, Histograms and Circle Graphs', ['S1'],
    ['m203-graph-read', 'm203-histogram'],
    ['Read and make bar graphs and circle graphs', 'Read and make histograms with equal intervals'],
    75, ['histogram', 'interval', 'frequency']),
  L('m203-8-2', 'm203-u8', '8.2', 'Line Graphs and Choosing a Graph', ['S1'],
    ['m203-line-graph', 'm203-choose-graph'],
    ['Read and interpret line graphs', 'Choose the best graph and spot misleading graphs'],
    70, ['line graph', 'trend']),
  L('m203-8-3', 'm203-u8', '8.3', 'Numerical Puzzles and Games', ['N1'],
    ['m203-number-puzzle'],
    ['Solve number puzzles and analyze games using numerical reasoning'],
    65, ['strategy']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm203-u1', number: 1, title: 'Slope and Rate of Change', description: 'Slope as rise over run and as rate of change, proportional reasoning and unit analysis.', outcomes: ['A1', 'A2', 'A3'], lessons: [], color: 'emerald' },
  { id: 'm203-u2', number: 2, title: 'Surface Area', description: 'Surface area of prisms, cylinders, pyramids, cones and spheres in SI and imperial units.', outcomes: ['M1', 'A1'], lessons: [], color: 'amber' },
  { id: 'm203-u3', number: 3, title: 'Volume and Capacity', description: 'Volume and capacity of prisms, cylinders, pyramids, cones and spheres.', outcomes: ['M2', 'A1'], lessons: [], color: 'teal' },
  { id: 'm203-u4', number: 4, title: 'Right Triangles', description: 'Solving problems with one, two and three right triangles.', outcomes: ['G1'], lessons: [], color: 'sky' },
  { id: 'm203-u5', number: 5, title: 'Scale and 3-D Objects', description: 'Scale drawings, views of 3-D objects and exploded views.', outcomes: ['G2', 'G3', 'G4'], lessons: [], color: 'violet' },
  { id: 'm203-u6', number: 6, title: 'Personal Budgets and Banking', description: 'Personal budgets, bank accounts, fees and statements.', outcomes: ['N2', 'N4'], lessons: [], color: 'orange' },
  { id: 'm203-u7', number: 7, title: 'Interest and Credit', description: 'Simple and compound interest, the Rule of 72, credit cards and loans.', outcomes: ['N3', 'N5', 'A1'], lessons: [], color: 'rose' },
  { id: 'm203-u8', number: 8, title: 'Graphs and Puzzles', description: 'Bar graphs, histograms, line graphs and circle graphs, and numerical puzzles.', outcomes: ['S1', 'N1'], lessons: [], color: 'fuchsia' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH20_3: CourseMeta = {
  id: 'math-20-3',
  title: 'Grade 11 Mathematics: Workplace',
  shortTitle: 'Math 11 Workplace',
  grade: 11,
  subject: 'Mathematics',
  description: 'Workplace and apprenticeship mathematics for Grade 11: slope and rates, surface area and volume, right triangles, scale and 3-D objects, budgets, banking, interest and credit, and graphs.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
