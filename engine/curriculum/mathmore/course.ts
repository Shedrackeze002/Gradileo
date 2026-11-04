/**
 * More Mathematics Topics: lessons that other school systems' courses teach and Gradileo's own
 * grade courses do not (roadmap item 5, step 4, "fill the gaps"). The curriculum maps file these
 * lessons into their courses (dot plots in US Grade 6, the equation of a circle in Geometry), and
 * Browse by topic lists them with the other lessons of their topics. It is not a course to take on
 * its own, so it is not offered in the course pickers (`extra`), and each lesson carries its own
 * level (`grade`), since the course spans Grades 6 to 12.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'ST1', strand: 'Statistics', text: 'Recognize statistical questions, and display and summarize numerical data in dot plots.' },
  { code: 'ST2', strand: 'Statistics', text: 'Find the quartiles and interquartile range of a data set, and draw, read and compare box plots.' },
  { code: 'ST3', strand: 'Statistics', text: 'Measure the variability of a data set with the mean absolute deviation.' },
  { code: 'ST4', strand: 'Statistics', text: 'Compare two populations by their centres and their variability.' },
  { code: 'ST5', strand: 'Statistics', text: 'Complete and interpret two-way tables of categorical data, using relative frequencies to look for an association.' },
  { code: 'ST6', strand: 'Statistics', text: 'Tell surveys, observational studies and experiments apart, explain why only a randomized experiment can show cause and effect, and use simulation to judge whether a result is unusual.' },
  { code: 'NA1', strand: 'Number and algebra', text: 'Write very large and very small numbers in scientific notation, and in full.' },
  { code: 'NA2', strand: 'Number and algebra', text: 'Multiply, divide, add and subtract numbers in scientific notation.' },
  { code: 'NA3', strand: 'Number and algebra', text: 'Tell linear from exponential growth, and show that exponential growth eventually exceeds linear growth.' },
  { code: 'GE1', strand: 'Geometry', text: 'Describe the cross-sections of prisms, pyramids, cylinders, cones and spheres, and find their areas.' },
  { code: 'GE2', strand: 'Geometry', text: 'Identify the solids swept out by rotating two-dimensional shapes, and find their volumes.' },
  { code: 'GE3', strand: 'Geometry', text: 'Prove theorems about lines, angles and triangles in two-column form.' },
  { code: 'GE4', strand: 'Geometry', text: 'Write and use the equation of a circle with a given centre and radius, completing the square to find them.' },
  { code: 'CX1', strand: 'Complex numbers and polynomials', text: 'Add, subtract, multiply and divide complex numbers, using conjugates to divide.' },
  { code: 'CX2', strand: 'Complex numbers and polynomials', text: 'Solve quadratic equations with real coefficients that have complex solutions.' },
  { code: 'CX3', strand: 'Complex numbers and polynomials', text: 'Use polynomial identities, and the fundamental theorem of algebra to count and find the roots of a polynomial.' },
  { code: 'VM1', strand: 'Vectors and matrices', text: 'Represent vectors by their components, magnitude and direction, and add, subtract and scale them.' },
  { code: 'VM2', strand: 'Vectors and matrices', text: 'Add and multiply matrices, find 2 × 2 determinants and inverses, and solve systems of equations with an inverse matrix.' },
  { code: 'PC1', strand: 'Polar form, conics and parametric equations', text: 'Convert between polar and rectangular coordinates.' },
  { code: 'PC2', strand: 'Polar form, conics and parametric equations', text: 'Write complex numbers in polar form, and multiply and divide them in that form.' },
  { code: 'PC3', strand: 'Polar form, conics and parametric equations', text: 'Identify conic sections from their equations, and find the focus and directrix of a parabola and the axes and foci of an ellipse.' },
  { code: 'PC4', strand: 'Polar form, conics and parametric equations', text: 'Evaluate parametric equations and eliminate the parameter to find the curve they trace.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  grade: number,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, grade, outcomes, skills, objectives, minutes: 60, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Statistics and Data Displays ----------------
  L('mx-1-1', 'mx-u1', '1.1', 'Statistical Questions and Dot Plots', 6, ['ST1'],
    ['mx-statistical-question', 'mx-dot-plot-read'],
    ['Tell a statistical question from a question with one answer', 'Read the mode, median, range and mean from a dot plot'],
    ['statistical question', 'dot plot', 'distribution']),
  L('mx-1-2', 'mx-u1', '1.2', 'Box Plots and the Interquartile Range', 6, ['ST2'],
    ['mx-five-number-summary', 'mx-box-plot-read'],
    ['Find the quartiles and the five-number summary of a data set', 'Read and compare box plots, and find the interquartile range'],
    ['quartile', 'five-number summary', 'box plot', 'interquartile range']),
  L('mx-1-3', 'mx-u1', '1.3', 'Mean Absolute Deviation', 6, ['ST3'],
    ['mx-mad'],
    ['Find the mean absolute deviation of a data set', 'Describe what the mean absolute deviation says about the spread'],
    ['mean absolute deviation', 'variability']),
  L('mx-1-4', 'mx-u1', '1.4', 'Comparing Two Populations', 7, ['ST4'],
    ['mx-compare-populations'],
    ['Compare two samples by their means', 'Measure the difference between two means in mean absolute deviations'],
    ['population', 'sample', 'overlap']),
  L('mx-1-5', 'mx-u1', '1.5', 'Two-Way Tables', 8, ['ST5'],
    ['mx-two-way-table', 'mx-two-way-relative'],
    ['Complete a two-way table from its totals', 'Use row percents to decide whether two categories are associated'],
    ['two-way table', 'categorical data', 'relative frequency', 'association']),
  L('mx-1-6', 'mx-u1', '1.6', 'Experiments, Observational Studies and Simulation', 11, ['ST6'],
    ['mx-study-design', 'mx-simulation'],
    ['Tell surveys, observational studies and experiments apart', 'Explain why only a randomized experiment can show cause and effect', 'Use a simulation to decide whether a result is unusual'],
    ['survey', 'observational study', 'experiment', 'random assignment', 'simulation']),

  // ---------------- Unit 2: Scientific Notation and Growth ----------------
  L('mx-2-1', 'mx-u2', '2.1', 'Scientific Notation', 8, ['NA1'],
    ['mx-sci-write', 'mx-sci-standard'],
    ['Write very large and very small numbers in scientific notation', 'Write numbers in scientific notation in full'],
    ['scientific notation', 'standard form', 'coefficient']),
  L('mx-2-2', 'mx-u2', '2.2', 'Calculating with Scientific Notation', 8, ['NA2'],
    ['mx-sci-multiply', 'mx-sci-add'],
    ['Multiply and divide numbers in scientific notation', 'Add and subtract numbers in scientific notation']),
  L('mx-2-3', 'mx-u2', '2.3', 'Linear and Exponential Growth', 9, ['NA3'],
    ['mx-linear-vs-exponential'],
    ['Tell linear from exponential growth in a table', 'Find when exponential growth overtakes linear growth'],
    ['linear growth', 'exponential growth', 'common difference', 'common ratio']),

  // ---------------- Unit 3: Geometry ----------------
  L('mx-3-1', 'mx-u3', '3.1', 'Cross-Sections of Solids', 7, ['GE1'],
    ['mx-cross-section'],
    ['Describe the cross-sections of prisms, pyramids, cylinders, cones and spheres', 'Find the area of a cross-section'],
    ['cross-section', 'plane']),
  L('mx-3-2', 'mx-u3', '3.2', 'Solids of Revolution', 10, ['GE2'],
    ['mx-solid-of-revolution'],
    ['Identify the solid swept out by rotating a rectangle, a right triangle or a semicircle', 'Find the volume of a solid of revolution'],
    ['solid of revolution', 'axis of rotation']),
  L('mx-3-3', 'mx-u3', '3.3', 'Two-Column Proofs', 10, ['GE3'],
    ['mx-proof-reason'],
    ['Give a reason for each step of a proof', 'Prove theorems about angles and congruent triangles in two-column form'],
    ['two-column proof', 'postulate', 'theorem', 'reflexive property']),
  L('mx-3-4', 'mx-u3', '3.4', 'The Equation of a Circle', 10, ['GE4'],
    ['mx-circle-equation', 'mx-circle-complete-square'],
    ['Write the equation of a circle from its centre and radius', 'Find the centre and radius by completing the square'],
    ['centre', 'radius', 'general form']),
  // ---------------- Unit 4: Complex Numbers and Polynomials ----------------
  L('mx-4-1', 'mx-u4', '4.1', 'Complex Numbers', 11, ['CX1'],
    ['mx-complex-arith', 'mx-complex-divide'],
    ['Add, subtract and multiply complex numbers, and simplify powers of i', 'Divide complex numbers using the conjugate'],
    ['imaginary unit', 'complex number', 'real part', 'imaginary part', 'conjugate']),
  L('mx-4-2', 'mx-u4', '4.2', 'Complex Solutions of Quadratic Equations', 11, ['CX2'],
    ['mx-complex-roots'],
    ['Find the square root of a negative number', 'Solve quadratic equations with a negative discriminant'],
    ['discriminant', 'complex solution']),
  L('mx-4-3', 'mx-u4', '4.3', 'Polynomial Identities and the Fundamental Theorem of Algebra', 11, ['CX3'],
    ['mx-poly-identity', 'mx-fta'],
    ['Recognize and use polynomial identities', 'Count the roots of a polynomial, and use conjugate pairs to find them'],
    ['identity', 'fundamental theorem of algebra', 'multiplicity', 'conjugate pair']),
  // ---------------- Unit 5: Vectors and Matrices ----------------
  L('mx-5-1', 'mx-u5', '5.1', 'Vectors', 12, ['VM1'],
    ['mx-vector-components', 'mx-vector-ops'],
    ['Write a vector in component form and find its magnitude and direction', 'Add and subtract vectors and multiply them by a scalar'],
    ['vector', 'component form', 'magnitude', 'direction', 'scalar']),
  L('mx-5-2', 'mx-u5', '5.2', 'Matrices', 12, ['VM2'],
    ['mx-matrix-ops'],
    ['Add matrices and multiply them by a scalar', 'Multiply two 2 × 2 matrices'],
    ['matrix', 'dimensions', 'entry', 'scalar']),
  L('mx-5-3', 'mx-u5', '5.3', 'Determinants, Inverses and Systems', 12, ['VM2'],
    ['mx-matrix-systems'],
    ['Find the determinant and inverse of a 2 × 2 matrix', 'Solve a system of two equations with an inverse matrix'],
    ['determinant', 'identity matrix', 'inverse matrix']),
  // ---------------- Unit 6: Polar Form, Conics and Parametric Equations ----------------
  L('mx-6-1', 'mx-u6', '6.1', 'Polar Coordinates', 12, ['PC1'],
    ['mx-polar-convert'],
    ['Convert polar coordinates to rectangular coordinates', 'Convert rectangular coordinates to polar coordinates in the right quadrant'],
    ['polar coordinates', 'pole', 'polar axis']),
  L('mx-6-2', 'mx-u6', '6.2', 'Complex Numbers in Polar Form', 12, ['PC2'],
    ['mx-complex-polar'],
    ['Write a complex number in polar form', 'Multiply and divide complex numbers in polar form'],
    ['complex plane', 'modulus', 'argument', 'polar form']),
  L('mx-6-3', 'mx-u6', '6.3', 'Conic Sections', 12, ['PC3'],
    ['mx-conic-identify', 'mx-conic-features'],
    ['Name a conic section from its equation', 'Find the focus and directrix of a parabola and the axes and foci of an ellipse'],
    ['conic section', 'ellipse', 'hyperbola', 'focus', 'directrix']),
  L('mx-6-4', 'mx-u6', '6.4', 'Parametric Equations', 12, ['PC4'],
    ['mx-parametric'],
    ['Find points from parametric equations', 'Eliminate the parameter to find the curve'],
    ['parametric equations', 'parameter']),
];

export const UNITS: UnitMeta[] = [
  { id: 'mx-u1', number: 1, title: 'Statistics and Data Displays', description: 'Statistical questions, dot plots, box plots and the interquartile range, mean absolute deviation, comparing populations, two-way tables, and experiments and simulation.', outcomes: ['ST1', 'ST2', 'ST3', 'ST4', 'ST5', 'ST6'], lessons: [], color: 'sky' },
  { id: 'mx-u2', number: 2, title: 'Scientific Notation and Growth', description: 'Scientific notation, calculating with it, and linear and exponential growth compared.', outcomes: ['NA1', 'NA2', 'NA3'], lessons: [], color: 'amber' },
  { id: 'mx-u3', number: 3, title: 'Geometry', description: 'Cross-sections, solids of revolution, two-column proofs and the equation of a circle.', outcomes: ['GE1', 'GE2', 'GE3', 'GE4'], lessons: [], color: 'violet' },
  { id: 'mx-u4', number: 4, title: 'Complex Numbers and Polynomials', description: 'Complex numbers and their arithmetic, complex solutions of quadratic equations, polynomial identities and the fundamental theorem of algebra.', outcomes: ['CX1', 'CX2', 'CX3'], lessons: [], color: 'rose' },
  { id: 'mx-u5', number: 5, title: 'Vectors and Matrices', description: 'Vectors, matrices, determinants and inverses, and solving systems with matrices.', outcomes: ['VM1', 'VM2'], lessons: [], color: 'emerald' },
  { id: 'mx-u6', number: 6, title: 'Polar Form, Conics and Parametric Equations', description: 'Polar coordinates, complex numbers in polar form, conic sections and parametric equations.', outcomes: ['PC1', 'PC2', 'PC3', 'PC4'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATHMORE: CourseMeta = {
  id: 'math-more',
  title: 'More Mathematics Topics',
  shortTitle: 'More Topics',
  grade: 10,
  subject: 'Mathematics',
  description: 'Topics that school systems around the world teach and Gradileo’s grade courses do not: dot plots and box plots, mean absolute deviation, two-way tables, scientific notation, linear and exponential growth, cross-sections and solids of revolution, two-column proofs, the equation of a circle, experiments and simulation, complex numbers, polynomial identities, vectors and matrices, polar form, conic sections and parametric equations.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  extra: true,
};
