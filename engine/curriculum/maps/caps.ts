/**
 * South Africa's Mathematics for the Further Education and Training phase, Grades 10 to 12, as the
 * Curriculum and Assessment Policy Statement (CAPS) sets it out. Each course lists the grade's
 * topics under the CAPS names, in the order of its annual teaching plan, and each unit points to
 * the Gradileo lessons that teach it. Mathematical Literacy and Technical Mathematics are not
 * mapped yet.
 */
import type { CurriculumMap } from './build.ts';

export const CAPS_MAP: CurriculumMap = {
  curriculum: 'za',
  name: 'South Africa CAPS',
  courses: [
    {
      id: 'caps-grade-10',
      title: 'Mathematics: Grade 10 (CAPS)',
      shortTitle: 'CAPS Grade 10',
      grade: 10,
      description: 'Grade 10 Mathematics: algebraic expressions, exponents, number patterns, equations and inequalities, trigonometry, functions, Euclidean and analytical geometry, finance and growth, statistics, measurement and probability, in the order of the CAPS teaching plan.',
      units: [
        { title: 'Algebraic Expressions', description: 'Rational and irrational numbers, products of binomials and trinomials, factorization, and algebraic fractions.', members: ['m10c-3-3', 'm10c-4-1', 'm10c-4-2', 'm10c-4-3', 'm10c-4-4', 'm10c-4-5', 'm10c-4-6', 'm201-6-1', 'm201-6-2', 'm201-6-3'] },
        { title: 'Exponents', description: 'The laws of exponents for integer exponents, and simple exponential equations.', members: ['m9-2-2', 'm10c-3-5', 'm302-6-2'] },
        { title: 'Number Patterns', description: 'Patterns with a constant difference, and the general term of a linear pattern.', members: ['m9-4-1', 'm201-1-1'] },
        { title: 'Equations and Inequalities', description: 'Linear equations, quadratic equations by factorization, simultaneous linear equations, word problems, and linear inequalities. Changing the subject of a formula.', members: ['m9-6-2', 'm9-6-3', 'm202-7-1', 'm10c-8-2', 'm10c-8-3', 'm10c-8-4', 'm9-6-5', 'mx-24-1'] },
        { title: 'Trigonometry', description: 'Sine, cosine and tangent, solving right-angled triangles, problems in two dimensions, and the special angles 30°, 45° and 60°.', members: ['m10c-2-1', 'm10c-2-2', 'm10c-2-3', 'm10c-2-4', 'm201-2-1'] },
        { title: 'Functions', description: 'Functions, their domain and range, and the graphs of the straight line, the parabola, the hyperbola, the exponential function, and sine, cosine and tangent.', members: ['m10c-5-3', 'm10c-5-4', 'm10c-6-2', 'm202-6-1', 'm202-6-2', 'm201-7-4', 'm301-7-1', 'mx-8-4'] },
        { title: 'Euclidean Geometry', description: 'Angles with parallel lines, angles in triangles, congruent triangles, and the properties of quadrilaterals.', members: ['m202-2-1', 'm202-2-2', 'm202-2-4', 'm303-3-1'] },
        { title: 'Analytical Geometry', description: 'The distance between two points, the midpoint of a line segment, the gradient, and parallel and perpendicular lines.', members: ['m10c-6-5', 'm10c-6-3', 'm10c-6-4'] },
        { title: 'Finance and Growth', description: 'Simple and compound interest, hire purchase, and exchange rates.', members: ['m203-7-1', 'm204-2-3', 'm103-1-4'] },
        { title: 'Statistics', description: 'The mean, median, mode and range, the mean of a frequency table, percentiles and quartiles, the five-number summary, and box-and-whisker diagrams.', members: ['m7-10-1', 'm303-6-2', 'm303-6-3', 'mx-1-2'] },
        { title: 'Measurement', description: 'The surface area and volume of prisms, cylinders, pyramids, cones and spheres, and the effect of multiplying the dimensions by a factor k.', members: ['m10c-1-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8', 'm202-8-4'] },
        { title: 'Probability', description: 'Theoretical probability and relative frequency, Venn diagrams, and mutually exclusive and complementary events.', members: ['m7-11-3', 'm302-1-2', 'm302-3-3'] },
      ],
      gaps: ['The midpoint theorem'],
    },
    {
      id: 'caps-grade-11',
      title: 'Mathematics: Grade 11 (CAPS)',
      shortTitle: 'CAPS Grade 11',
      grade: 11,
      description: 'Grade 11 Mathematics: exponents and surds, equations and inequalities, number patterns, analytical geometry, functions, trigonometry, circle geometry, finance, growth and decay, probability and statistics, in the order of the CAPS teaching plan.',
      units: [
        { title: 'Exponents and Surds', description: 'Rational exponents, simplifying and calculating with surds, and equations with surds.', members: ['m10c-3-6', 'm10c-3-4', 'm201-5-1', 'm201-5-2', 'm201-5-3'] },
        { title: 'Equations and Inequalities', description: 'Completing the square, the quadratic formula, the nature of the roots, quadratic inequalities, and simultaneous equations with one linear and one quadratic.', members: ['m201-4-2', 'm201-4-3', 'm201-4-4', 'm201-9-2', 'm201-8-1', 'm201-8-2'] },
        { title: 'Number Patterns', description: 'Quadratic patterns, with a constant second difference, and their general term.', members: ['mx-8-1'] },
        { title: 'Analytical Geometry', description: 'The equation of a straight line through two points, and of lines parallel or perpendicular to a given line.', members: ['m10c-7-1', 'm10c-7-2', 'm10c-7-3', 'm10c-7-4'] },
        { title: 'Functions', description: 'The parabola y = a(x + p)² + q, the hyperbola and the exponential graph with their shifts and asymptotes, and the average gradient between two points.', members: ['m201-3-1', 'm201-3-2', 'm201-3-3', 'm301-8-1', 'm301-7-2', 'mx-8-3'] },
        { title: 'Trigonometry', description: 'The ratios of any angle, the identities tan θ = sin θ / cos θ and sin² θ + cos² θ = 1, proving identities, trigonometric equations and their general solutions, and the sine, cosine and area rules.', members: ['m201-2-2', 'm301-6-1', 'm301-6-3', 'm301-4-4', 'm201-2-3', 'm201-2-4', 'm201-2-5', 'mx-16-2'] },
        { title: 'Euclidean Geometry: Circles', description: 'Chords, angles at the centre and at the circumference, and tangents. Cyclic quadrilaterals and the tangent–chord theorem.', members: ['m9-u8', 'mx-25-4'] },
        { title: 'Finance, Growth and Decay', description: 'Compound growth, depreciation on a reducing balance, and investments over different periods. Nominal and effective interest rates.', members: ['m302-6-4', 'm203-7-2', 'mx-26-1'] },
        { title: 'Probability', description: 'Independent and dependent events, tree diagrams, and two-way contingency tables.', members: ['m8-10-2', 'm302-3-4', 'mx-1-5'] },
        { title: 'Statistics', description: 'Histograms, ogives, the variance and standard deviation, and outliers.', members: ['mx-11-2', 'mx-11-3', 'm202-5-1', 'mx-14-2', 'mx-14-3'] },
      ],
      gaps: ['The angle of inclination of a line'],
    },
    {
      id: 'caps-grade-12',
      title: 'Mathematics: Grade 12 (CAPS)',
      shortTitle: 'CAPS Grade 12',
      grade: 12,
      description: 'Grade 12 Mathematics: sequences and series, functions, inverses and logarithms, trigonometry, polynomials, differential calculus, analytical and Euclidean geometry, regression and correlation, and counting and probability, in the order of the CAPS teaching plan.',
      units: [
        { title: 'Patterns, Sequences and Series', description: 'Arithmetic and geometric sequences and series, sigma notation, and the sum to infinity of a convergent geometric series.', members: ['m201-u1', 'mx-17-3'] },
        { title: 'Functions, Inverses and Logarithms', description: 'The inverse of a function, the logarithmic function as the inverse of the exponential function, and the laws of logarithms.', members: ['m301-1-4', 'm301-7-4', 'm301-7-5', 'm301-7-6', 'm301-7-7'] },
        { title: 'Finance', description: 'Future value and present value annuities, sinking funds, and loan repayments.', members: ['mx-26-2', 'mx-26-3'] },
        { title: 'Trigonometry', description: 'The compound angle and double angle identities, proving identities, solving equations with them, and problems in two and three dimensions.', members: ['m301-6-2', 'm301-6-3', 'm301-6-4', 'm202-3-3', 'mx-10-4'] },
        { title: 'Polynomials', description: 'The remainder and factor theorems, and factorizing and solving cubic polynomials.', members: ['m301-3-2', 'm301-3-3', 'm301-3-4'] },
        { title: 'Differential Calculus', description: 'Limits, the derivative from first principles, the rules of differentiation, tangents, cubic graphs with their stationary points and points of inflection, optimization, and rates of change.', members: ['m31-2-1', 'm31-3-1', 'm31-3-2', 'm31-4-1', 'm31-6-1', 'm31-6-2', 'm31-6-3', 'm31-7-1', 'm31-6-4'] },
        { title: 'Analytical Geometry: Circles', description: 'The equation of a circle with any centre, completing the square to find its centre and radius, and tangents to a circle.', members: ['mx-3-4', 'm9-8-3'] },
        { title: 'Euclidean Geometry: Proportion and Similarity', description: 'Similar polygons, similar triangles, and finding missing sides.', members: ['m9-7-3', 'm103-7-4'] },
        { title: 'Statistics: Regression and Correlation', description: 'Scatter plots and lines of best fit, and the correlation coefficient.', members: ['m10c-7-5', 'mx-15-1'] },
        { title: 'Counting and Probability', description: 'The fundamental counting principle, factorials and arrangements, and probability problems with counting.', members: ['m301-9-1', 'm301-9-2', 'm302-3-2'] },
      ],
      gaps: ['The proportionality theorem', 'The equation of a tangent to a circle', 'The least squares regression line'],
    },
  ],
};
