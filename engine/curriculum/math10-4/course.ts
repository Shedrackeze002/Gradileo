/**
 * Knowledge and Employability Mathematics 10-4 (Alberta), course code KAE1782.
 * K&E courses are for students working two to three grade levels below their age-appropriate grade
 * who are headed for the workplace. The outcomes group the program's four strands (Number, Patterns
 * and Relations, Shape and Space, Statistics and Probability) as described in the Alberta K&E
 * Mathematics 10-4, 20-4 Program of Studies (2006); the wording is Gradileo's summary, not a quotation.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'N1', strand: 'Number', text: 'Develop number sense for whole numbers, fractions, decimals, percents and integers, and use estimation to check answers in everyday, community and workplace situations.' },
  { code: 'N2', strand: 'Number', text: 'Choose and carry out operations on whole numbers, fractions, decimals, percents and integers to solve everyday problems, including problems with money.' },
  { code: 'PR1', strand: 'Patterns and Relations', text: 'Identify, describe and extend patterns, and show relationships with tables and graphs.' },
  { code: 'PR2', strand: 'Patterns and Relations', text: 'Use variables, expressions, formulas and equations to describe and solve everyday problems.' },
  { code: 'SS1', strand: 'Shape and Space', text: 'Estimate, measure and convert length, mass, capacity, time and temperature, using SI and common imperial units.' },
  { code: 'SS2', strand: 'Shape and Space', text: 'Calculate perimeter, area and volume to solve problems at home, in the community and at work.' },
  { code: 'SS3', strand: 'Shape and Space', text: 'Describe, classify and draw angles, 2-D shapes and 3-D objects, including nets and views.' },
  { code: 'SS4', strand: 'Shape and Space', text: 'Use symmetry, translations, reflections and rotations to explore shapes, patterns and designs.' },
  { code: 'SP1', strand: 'Statistics and Probability', text: 'Develop and apply a plan to collect, display and analyze data.' },
  { code: 'SP2', strand: 'Statistics and Probability', text: 'Describe and calculate the probability of everyday events.' },
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
  // ---------------- Unit 1: Whole Numbers ----------------
  L('m104-1-1', 'm104-u1', '1.1', 'Place Value and Rounding', ['N1'],
    ['m104-place-value', 'm104-round-whole'],
    ['Read and write whole numbers using place value', 'Round whole numbers to the nearest ten, hundred or thousand'],
    60, ['place value', 'digit', 'round']),
  L('m104-1-2', 'm104-u1', '1.2', 'Operations and the Order of Operations', ['N2'],
    ['m104-whole-ops', 'm104-order-ops'],
    ['Add, subtract, multiply and divide whole numbers', 'Use the order of operations to find the value of an expression'],
    60, ['sum', 'difference', 'product', 'quotient', 'order of operations']),
  L('m104-1-3', 'm104-u1', '1.3', 'Estimating and Solving Problems', ['N1', 'N2'],
    ['m104-estimate', 'm104-whole-problem'],
    ['Estimate an answer before calculating', 'Choose the operations that solve a word problem and check the answer'],
    60, ['estimate', 'reasonable']),

  // ---------------- Unit 2: Fractions ----------------
  L('m104-2-1', 'm104-u2', '2.1', 'Understanding Fractions', ['N1'],
    ['m104-equivalent-fraction', 'm104-compare-fraction'],
    ['Write equivalent fractions and simplify a fraction', 'Compare and order fractions and mixed numbers'],
    60, ['numerator', 'denominator', 'equivalent fractions', 'mixed number']),
  L('m104-2-2', 'm104-u2', '2.2', 'Fractions of a Quantity', ['N2'],
    ['m104-fraction-of'],
    ['Find a fraction of an amount, such as 3/4 of 20 L'],
    60, ['fraction of']),
  L('m104-2-3', 'm104-u2', '2.3', 'Adding and Subtracting Fractions', ['N2'],
    ['m104-add-sub-fraction', 'm104-mixed-measure'],
    ['Add and subtract fractions with like and unlike denominators', 'Add and subtract mixed numbers in measurement problems'],
    60, ['common denominator', 'improper fraction']),

  // ---------------- Unit 3: Decimals, Percents and Money ----------------
  L('m104-3-1', 'm104-u3', '3.1', 'Decimals and Money', ['N1', 'N2'],
    ['m104-decimal-ops', 'm104-making-change'],
    ['Add, subtract, multiply and divide decimals', 'Find the total of a bill and the change from a payment'],
    60, ['decimal', 'tenths', 'hundredths', 'change']),
  L('m104-3-2', 'm104-u3', '3.2', 'Fractions, Decimals and Percents', ['N1'],
    ['m104-convert-fdp'],
    ['Change between fractions, decimals and percents'],
    60, ['percent']),
  L('m104-3-3', 'm104-u3', '3.3', 'Percent in Everyday Life', ['N2'],
    ['m104-percent-of', 'm104-discount-tax'],
    ['Find a percent of an amount', 'Find a sale price after a discount and a total after GST'],
    60, ['discount', 'sale price', 'GST', 'tip']),

  // ---------------- Unit 4: Integers ----------------
  L('m104-4-1', 'm104-u4', '4.1', 'Integers Around Us', ['N1'],
    ['m104-integer-compare'],
    ['Use integers for temperatures, bank balances and elevations', 'Compare and order integers on a number line'],
    55, ['integer', 'positive', 'negative', 'opposite']),
  L('m104-4-2', 'm104-u4', '4.2', 'Adding and Subtracting Integers', ['N2'],
    ['m104-integer-add-sub', 'm104-integer-change'],
    ['Add and subtract integers', 'Find a change in temperature or balance'],
    60, ['change', 'difference']),

  // ---------------- Unit 5: Patterns, Formulas and Equations ----------------
  L('m104-5-1', 'm104-u5', '5.1', 'Patterns and Tables', ['PR1'],
    ['m104-pattern-extend', 'm104-pattern-rule'],
    ['Extend a number pattern and describe how it changes', 'Write a rule for a pattern from a table of values'],
    60, ['pattern', 'term', 'rule', 'table of values']),
  L('m104-5-2', 'm104-u5', '5.2', 'Expressions and Formulas', ['PR2'],
    ['m104-write-expression', 'm104-use-formula'],
    ['Write an expression with a variable for a situation', 'Substitute values into a formula and evaluate it'],
    60, ['variable', 'expression', 'formula', 'substitute']),
  L('m104-5-3', 'm104-u5', '5.3', 'Solving Equations', ['PR2'],
    ['m104-solve-one-step', 'm104-solve-two-step'],
    ['Solve one-step equations using inverse operations', 'Solve two-step equations and check the solution'],
    60, ['equation', 'solve', 'inverse operation']),
  L('m104-5-4', 'm104-u5', '5.4', 'Graphs of Relationships', ['PR1'],
    ['m104-read-relation-graph'],
    ['Read values from a graph of a relationship', 'Describe what a graph shows in words'],
    60, ['graph', 'axis', 'relationship']),

  // ---------------- Unit 6: Measurement ----------------
  L('m104-6-1', 'm104-u6', '6.1', 'SI Units of Measure', ['SS1'],
    ['m104-choose-unit', 'm104-si-convert'],
    ['Choose a sensible unit and estimate a measurement', 'Convert between SI units of length, mass and capacity'],
    60, ['metre', 'gram', 'litre', 'kilo-', 'centi-', 'milli-']),
  L('m104-6-2', 'm104-u6', '6.2', 'Reading Rulers and Tape Measures', ['SS1'],
    ['m104-read-ruler'],
    ['Read a length to the nearest millimetre on a metric ruler', 'Read a length to the nearest eighth or sixteenth of an inch on an imperial ruler'],
    60, ['millimetre', 'inch', 'tape measure']),
  L('m104-6-3', 'm104-u6', '6.3', 'Time and Temperature', ['SS1', 'N2'],
    ['m104-elapsed-time', 'm104-temperature'],
    ['Find elapsed time and read a work schedule', 'Read temperatures and find a change in temperature'],
    60, ['elapsed time', '24-hour clock', 'degrees Celsius']),

  // ---------------- Unit 7: Perimeter, Area and Volume ----------------
  L('m104-7-1', 'm104-u7', '7.1', 'Perimeter and Circumference', ['SS2', 'PR2'],
    ['m104-perimeter', 'm104-circumference'],
    ['Find the perimeter of rectangles, triangles and other polygons', 'Find the circumference of a circle'],
    60, ['perimeter', 'circumference', 'radius', 'diameter', 'pi']),
  L('m104-7-2', 'm104-u7', '7.2', 'Area', ['SS2', 'PR2'],
    ['m104-area'],
    ['Find the area of rectangles, triangles and circles', 'Use area to find how much material a job needs'],
    60, ['area', 'square unit', 'base', 'height']),
  L('m104-7-3', 'm104-u7', '7.3', 'Volume and Capacity', ['SS2', 'PR2'],
    ['m104-volume'],
    ['Find the volume of a rectangular prism', 'Relate volume and capacity (1000 cm³ holds 1 L)'],
    60, ['volume', 'capacity', 'cubic unit', 'rectangular prism']),

  // ---------------- Unit 8: Shapes, Symmetry and Transformations ----------------
  L('m104-8-1', 'm104-u8', '8.1', 'Angles and 2-D Shapes', ['SS3'],
    ['m104-classify-angle', 'm104-classify-shape'],
    ['Classify angles as acute, right, obtuse or straight', 'Name triangles and quadrilaterals by their sides and angles'],
    60, ['acute', 'right', 'obtuse', 'polygon', 'quadrilateral', 'parallel']),
  L('m104-8-2', 'm104-u8', '8.2', '3-D Objects, Nets and Views', ['SS3'],
    ['m104-nets-views'],
    ['Count the faces, edges and vertices of a 3-D object', 'Match a 3-D object with its net and its views'],
    60, ['face', 'edge', 'vertex', 'net', 'prism', 'pyramid']),
  L('m104-8-3', 'm104-u8', '8.3', 'Symmetry and Transformations', ['SS4'],
    ['m104-symmetry', 'm104-transformation'],
    ['Find lines of symmetry in shapes and designs', 'Describe and draw translations, reflections and rotations on a grid'],
    60, ['line of symmetry', 'translation', 'reflection', 'rotation', 'image']),

  // ---------------- Unit 9: Data and Probability ----------------
  L('m104-9-1', 'm104-u9', '9.1', 'Collecting and Displaying Data', ['SP1'],
    ['m104-read-graph', 'm104-choose-display'],
    ['Read bar graphs, circle graphs and tally charts', 'Choose a good way to collect and display data'],
    60, ['survey', 'tally', 'bar graph', 'circle graph']),
  L('m104-9-2', 'm104-u9', '9.2', 'Mean, Median, Mode and Range', ['SP1'],
    ['m104-central-tendency'],
    ['Find the mean, median, mode and range of a set of data', 'Decide which measure best describes the data'],
    60, ['mean', 'median', 'mode', 'range']),
  L('m104-9-3', 'm104-u9', '9.3', 'Probability', ['SP2'],
    ['m104-probability'],
    ['Describe how likely an event is', 'Find a probability as a fraction, decimal and percent'],
    60, ['probability', 'outcome', 'event', 'likely']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm104-u1', number: 1, title: 'Whole Numbers', description: 'Place value, rounding, the four operations, the order of operations and estimating answers.', outcomes: ['N1', 'N2'], lessons: [], color: 'emerald' },
  { id: 'm104-u2', number: 2, title: 'Fractions', description: 'Equivalent fractions, comparing, fractions of an amount and adding and subtracting fractions in measurement.', outcomes: ['N1', 'N2'], lessons: [], color: 'amber' },
  { id: 'm104-u3', number: 3, title: 'Decimals, Percents and Money', description: 'Decimals and money, making change, and percents for discounts, tips and GST.', outcomes: ['N1', 'N2'], lessons: [], color: 'teal' },
  { id: 'm104-u4', number: 4, title: 'Integers', description: 'Positive and negative numbers for temperature, money and elevation, and adding and subtracting them.', outcomes: ['N1', 'N2'], lessons: [], color: 'sky' },
  { id: 'm104-u5', number: 5, title: 'Patterns, Formulas and Equations', description: 'Patterns and tables, expressions and formulas, solving equations and reading graphs.', outcomes: ['PR1', 'PR2'], lessons: [], color: 'violet' },
  { id: 'm104-u6', number: 6, title: 'Measurement', description: 'SI units, rulers and tape measures, time and temperature.', outcomes: ['SS1', 'N2'], lessons: [], color: 'orange' },
  { id: 'm104-u7', number: 7, title: 'Perimeter, Area and Volume', description: 'Perimeter and circumference, area of common shapes, and volume and capacity of boxes.', outcomes: ['SS2', 'PR2'], lessons: [], color: 'rose' },
  { id: 'm104-u8', number: 8, title: 'Shapes, Symmetry and Transformations', description: 'Angles and 2-D shapes, 3-D objects with their nets and views, symmetry, and slides, flips and turns.', outcomes: ['SS3', 'SS4'], lessons: [], color: 'fuchsia' },
  { id: 'm104-u9', number: 9, title: 'Data and Probability', description: 'Collecting and displaying data, mean, median, mode and range, and probability.', outcomes: ['SP1', 'SP2'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH10_4: CourseMeta = {
  id: 'math-10-4',
  title: 'Grade 10 Mathematics: Essentials',
  shortTitle: 'Math 10 Essentials',
  grade: 10,
  subject: 'Mathematics',
  description: 'Everyday mathematics for life and work, with extra support: whole numbers, fractions, decimals, percents and money, integers, patterns and equations, measurement, shapes, and data and probability.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
