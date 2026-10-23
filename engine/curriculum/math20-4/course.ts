/**
 * Knowledge and Employability Mathematics 20-4 (Alberta), course code KAE2782.
 * Builds on Math 10-4 toward the workplace: number skills, personal finance (shopping, income,
 * budgeting and credit), formulas and graphs, measurement, perimeter and area, maps and scale, and
 * data and probability. The outcomes group the four strands of the Alberta K&E Mathematics 10-4, 20-4
 * Program of Studies (2006); the wording is Gradileo's summary, not a quotation.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'N1', strand: 'Number', text: 'Apply whole numbers, integers, fractions, decimals, ratios, rates and percents, with estimation, to solve everyday problems.' },
  { code: 'N2', strand: 'Number', text: 'Solve shopping problems involving unit prices, best buys, discounts, sales tax and the total cost of a purchase.' },
  { code: 'N3', strand: 'Number', text: 'Calculate earnings from wages, overtime, salary, commission, piecework and tips, and find net pay after deductions.' },
  { code: 'N4', strand: 'Number', text: 'Plan a budget and solve problems involving simple interest, credit, and the costs of owning a vehicle and renting a home.' },
  { code: 'PR1', strand: 'Patterns and Relations', text: 'Use formulas, equations, tables and graphs to describe relationships and solve everyday problems.' },
  { code: 'SS1', strand: 'Shape and Space', text: 'Measure and convert length, mass, capacity and temperature within and between the SI and imperial systems.' },
  { code: 'SS2', strand: 'Shape and Space', text: 'Solve problems involving the perimeter and area of 2-D shapes, including composite shapes and the cost of materials.' },
  { code: 'SS3', strand: 'Shape and Space', text: 'Use scales, maps and scale drawings to find distances, give directions and estimate travel time.' },
  { code: 'SP1', strand: 'Statistics and Probability', text: 'Collect, organize, display and analyze data, and recognize misleading graphs.' },
  { code: 'SP2', strand: 'Statistics and Probability', text: 'Find theoretical and experimental probabilities of everyday events and use them to make predictions.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 60,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Number Skills ----------------
  L('m204-1-1', 'm204-u1', '1.1', 'Integers and the Order of Operations', ['N1'],
    ['m204-integer-ops'],
    ['Add, subtract, multiply and divide integers', 'Use the order of operations with integers in real situations'],
    60, ['integer', 'order of operations']),
  L('m204-1-2', 'm204-u1', '1.2', 'Fractions and Mixed Numbers', ['N1'],
    ['m204-fraction-ops'],
    ['Add, subtract and multiply fractions and mixed numbers in recipes and measurements'],
    60, ['mixed number', 'improper fraction', 'common denominator']),
  L('m204-1-3', 'm204-u1', '1.3', 'Ratios, Rates and Proportions', ['N1'],
    ['m204-ratio-rate'],
    ['Write ratios and rates', 'Use a proportion to scale a recipe or a mix'],
    60, ['ratio', 'rate', 'proportion']),
  L('m204-1-4', 'm204-u1', '1.4', 'Percent Problems', ['N1'],
    ['m204-percent-problems'],
    ['Find a percent of a number, what percent one number is of another, and a percent increase or decrease'],
    60, ['percent', 'percent increase', 'percent decrease']),

  // ---------------- Unit 2: Shopping ----------------
  L('m204-2-1', 'm204-u2', '2.1', 'Unit Price and the Best Buy', ['N2'],
    ['m204-unit-price', 'm204-best-buy'],
    ['Calculate a unit price', 'Compare unit prices to find the best buy'],
    60, ['unit price', 'best buy']),
  L('m204-2-2', 'm204-u2', '2.2', 'Sales, Discounts and Taxes', ['N2'],
    ['m204-sale-price', 'm204-total-cost'],
    ['Find a sale price after a percent discount', 'Find the total cost of a purchase with GST'],
    60, ['discount', 'sale price', 'GST', 'subtotal']),
  L('m204-2-3', 'm204-u2', '2.3', 'Paying Over Time', ['N2'],
    ['m204-instalment'],
    ['Find the total cost of an instalment plan', 'Compare paying over time with paying cash'],
    55, ['instalment', 'down payment', 'finance charge']),

  // ---------------- Unit 3: Earning an Income ----------------
  L('m204-3-1', 'm204-u3', '3.1', 'Wages and Overtime', ['N3'],
    ['m204-gross-pay', 'm204-overtime'],
    ['Calculate gross pay from an hourly wage', 'Calculate overtime pay at time-and-a-half'],
    60, ['gross pay', 'hourly wage', 'overtime', 'timecard']),
  L('m204-3-2', 'm204-u3', '3.2', 'Salary, Commission, Piecework and Tips', ['N3'],
    ['m204-other-income'],
    ['Calculate pay from a salary, commission, piecework or tips'],
    60, ['salary', 'commission', 'piecework', 'tips']),
  L('m204-3-3', 'm204-u3', '3.3', 'Deductions and Net Pay', ['N3'],
    ['m204-net-pay'],
    ['Read a pay stub', 'Calculate net pay from gross pay and deductions'],
    60, ['deduction', 'net pay', 'pay stub', 'CPP', 'EI']),

  // ---------------- Unit 4: Budgeting and Credit ----------------
  L('m204-4-1', 'm204-u4', '4.1', 'Making a Budget', ['N4'],
    ['m204-budget'],
    ['Sort expenses into fixed and variable', 'Balance a monthly budget and find what is left to save'],
    60, ['budget', 'income', 'fixed expense', 'variable expense']),
  L('m204-4-2', 'm204-u4', '4.2', 'Simple Interest', ['N4', 'PR1'],
    ['m204-simple-interest'],
    ['Calculate simple interest on savings and loans using I = Prt'],
    60, ['interest', 'principal', 'interest rate']),
  L('m204-4-3', 'm204-u4', '4.3', 'Credit Cards and Loans', ['N4'],
    ['m204-credit-cost'],
    ['Find the cost of carrying a credit card balance or a loan', 'Explain why paying the full balance saves money'],
    60, ['credit', 'minimum payment', 'balance']),
  L('m204-4-4', 'm204-u4', '4.4', 'Owning a Vehicle and Renting a Home', ['N4'],
    ['m204-vehicle-cost', 'm204-housing-cost'],
    ['Find the monthly cost of owning and running a vehicle', 'Find the monthly and move-in costs of renting a home'],
    65, ['insurance', 'fuel economy', 'rent', 'damage deposit', 'utilities']),

  // ---------------- Unit 5: Formulas and Graphs ----------------
  L('m204-5-1', 'm204-u5', '5.1', 'Using Formulas', ['PR1'],
    ['m204-use-formula'],
    ['Substitute values into a workplace formula and evaluate it'],
    60, ['formula', 'variable', 'substitute']),
  L('m204-5-2', 'm204-u5', '5.2', 'Solving Equations', ['PR1'],
    ['m204-solve-equation'],
    ['Solve one- and two-step equations', 'Rearrange a formula to find a missing value'],
    60, ['equation', 'inverse operation']),
  L('m204-5-3', 'm204-u5', '5.3', 'Tables and Graphs', ['PR1'],
    ['m204-table-graph'],
    ['Make a table of values from a rule', 'Read and describe a graph of a relationship'],
    60, ['table of values', 'graph', 'relationship']),

  // ---------------- Unit 6: Measurement ----------------
  L('m204-6-1', 'm204-u6', '6.1', 'SI and Imperial Units', ['SS1'],
    ['m204-convert-within'],
    ['Convert between units within the SI system', 'Convert between units within the imperial system'],
    60, ['SI', 'imperial', 'foot', 'yard', 'pound']),
  L('m204-6-2', 'm204-u6', '6.2', 'Converting Between Systems', ['SS1'],
    ['m204-convert-between'],
    ['Convert between SI and imperial units using a conversion table'],
    60, ['conversion factor']),
  L('m204-6-3', 'm204-u6', '6.3', 'Temperature', ['SS1', 'PR1'],
    ['m204-temperature-convert'],
    ['Convert between degrees Celsius and degrees Fahrenheit', 'Estimate a temperature in the other scale'],
    55, ['Celsius', 'Fahrenheit']),

  // ---------------- Unit 7: Perimeter and Area ----------------
  L('m204-7-1', 'm204-u7', '7.1', 'Perimeter and Circumference', ['SS2'],
    ['m204-perimeter'],
    ['Find the perimeter of polygons and the circumference of circles'],
    60, ['perimeter', 'circumference']),
  L('m204-7-2', 'm204-u7', '7.2', 'Area of Shapes', ['SS2'],
    ['m204-area'],
    ['Find the area of rectangles, triangles, parallelograms and circles'],
    60, ['area', 'parallelogram']),
  L('m204-7-3', 'm204-u7', '7.3', 'Composite Shapes and Material Costs', ['SS2'],
    ['m204-composite-area', 'm204-material-cost'],
    ['Find the area of a shape made from simpler shapes', 'Find how much material to buy and what it costs'],
    65, ['composite shape']),

  // ---------------- Unit 8: Maps and Scale ----------------
  L('m204-8-1', 'm204-u8', '8.1', 'Scale Drawings', ['SS3'],
    ['m204-scale'],
    ['Use a scale to find an actual length or a drawing length'],
    60, ['scale', 'scale drawing', 'floor plan']),
  L('m204-8-2', 'm204-u8', '8.2', 'Reading Maps', ['SS3'],
    ['m204-map-distance', 'm204-directions'],
    ['Find distances on a map using its scale', 'Use grid locations and compass directions to describe a route'],
    60, ['map scale', 'grid', 'compass', 'north']),
  L('m204-8-3', 'm204-u8', '8.3', 'Distance, Speed and Time', ['SS3', 'PR1'],
    ['m204-travel-time'],
    ['Use distance = speed × time to plan a trip'],
    60, ['speed', 'distance', 'travel time']),

  // ---------------- Unit 9: Data and Probability ----------------
  L('m204-9-1', 'm204-u9', '9.1', 'Displaying Data', ['SP1'],
    ['m204-display-data'],
    ['Read and make bar graphs, line graphs and circle graphs', 'Choose the best graph for a set of data'],
    60, ['bar graph', 'line graph', 'circle graph']),
  L('m204-9-2', 'm204-u9', '9.2', 'Analyzing Data', ['SP1'],
    ['m204-analyze-data', 'm204-misleading-graph'],
    ['Use mean, median, mode and range to compare data', 'Explain how a graph can mislead'],
    60, ['mean', 'median', 'mode', 'range', 'misleading']),
  L('m204-9-3', 'm204-u9', '9.3', 'Probability', ['SP2'],
    ['m204-probability'],
    ['Find theoretical and experimental probability', 'Use probability to predict results'],
    60, ['theoretical probability', 'experimental probability', 'prediction']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm204-u1', number: 1, title: 'Number Skills', description: 'Integers, fractions and mixed numbers, ratios and rates, and percent problems.', outcomes: ['N1'], lessons: [], color: 'emerald' },
  { id: 'm204-u2', number: 2, title: 'Shopping', description: 'Unit prices and the best buy, sales, discounts and taxes, and paying over time.', outcomes: ['N2'], lessons: [], color: 'amber' },
  { id: 'm204-u3', number: 3, title: 'Earning an Income', description: 'Wages and overtime, salary, commission, piecework and tips, and deductions and net pay.', outcomes: ['N3'], lessons: [], color: 'teal' },
  { id: 'm204-u4', number: 4, title: 'Budgeting and Credit', description: 'Budgets, simple interest, credit cards and loans, and the costs of a vehicle and a home.', outcomes: ['N4', 'PR1'], lessons: [], color: 'sky' },
  { id: 'm204-u5', number: 5, title: 'Formulas and Graphs', description: 'Using formulas, solving equations, and tables and graphs of relationships.', outcomes: ['PR1'], lessons: [], color: 'violet' },
  { id: 'm204-u6', number: 6, title: 'Measurement', description: 'SI and imperial units, converting between the systems, and temperature.', outcomes: ['SS1', 'PR1'], lessons: [], color: 'orange' },
  { id: 'm204-u7', number: 7, title: 'Perimeter and Area', description: 'Perimeter, circumference, area of common and composite shapes, and the cost of materials.', outcomes: ['SS2'], lessons: [], color: 'rose' },
  { id: 'm204-u8', number: 8, title: 'Maps and Scale', description: 'Scale drawings, reading maps and directions, and distance, speed and time.', outcomes: ['SS3', 'PR1'], lessons: [], color: 'fuchsia' },
  { id: 'm204-u9', number: 9, title: 'Data and Probability', description: 'Displaying and analyzing data, misleading graphs, and probability.', outcomes: ['SP1', 'SP2'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH20_4: CourseMeta = {
  id: 'math-20-4',
  title: 'Grade 11 Mathematics: Essentials',
  shortTitle: 'Math 11 Essentials',
  grade: 11,
  subject: 'Mathematics',
  description: 'Everyday mathematics for work and independent living, with extra support: number skills, shopping, income, budgeting and credit, formulas and graphs, measurement, area, maps and scale, and data and probability.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
