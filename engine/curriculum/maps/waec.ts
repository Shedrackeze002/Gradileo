/**
 * WASSCE General Mathematics (Core Mathematics in Ghana), the West African Examinations Council's
 * syllabus for senior secondary school in Nigeria (SS 1 to SS 3), Ghana (SHS 1 to SHS 3), Sierra
 * Leone, The Gambia and Liberia. The syllabus is one list of topics; the three courses follow the
 * order in which a senior secondary scheme of work meets them, year by year. Each unit points to
 * the Gradileo lessons that teach it. Further Mathematics (Elective Mathematics) is not mapped yet.
 */
import type { CurriculumMap } from './build.ts';

export const WAEC_MAP: CurriculumMap = {
  curriculum: 'ng',
  alsoFor: ['gh'],
  name: 'WAEC (WASSCE)',
  courses: [
    {
      id: 'waec-ss-1',
      title: 'WASSCE Mathematics: SS 1 (WAEC)',
      shortTitle: 'WASSCE SS 1',
      grade: 10,
      description: 'The first year of senior secondary General Mathematics (SS 1, or SHS 1 in Ghana): indices and logarithms, sets, equations and variation, quadratics, logical reasoning, plane geometry, mensuration, trigonometry and statistics, in the order of a WASSCE scheme of work.',
      units: [
        { title: 'Number Bases', description: 'Converting between base ten and other bases, and adding, subtracting and multiplying in other bases.', members: ['mx-23-1'] },
        { title: 'Modular Arithmetic', description: 'The value of a number modulo m, addition and multiplication in modular arithmetic, and its use with days and clocks.', members: ['mx-23-2'] },
        { title: 'Indices, Logarithms and Standard Form', description: 'The laws of indices, negative and fractional indices, standard form, and logarithms and their laws.', members: ['m9-2-2', 'm10c-3-5', 'm10c-3-6', 'mx-2-1', 'mx-2-2', 'm301-7-4', 'm301-7-6'] },
        { title: 'Sets', description: 'Sets and subsets, union, intersection and complement, and Venn diagrams with two and three sets.', members: ['m302-1-1', 'm302-1-2'] },
        { title: 'Fractions, Ratios, Rates and Percentages', description: 'Calculating with fractions, ratios and proportion, comparing rates, percentage change, and rates of exchange.', members: ['m8-4-2', 'm8-3-1', 'm8-3-3', 'm202-8-1', 'm8-2-3', 'm103-1-4'] },
        { title: 'Simple Equations and Variation', description: 'Linear equations with brackets and fractions, word problems, and direct and inverse variation. Changing the subject of a formula, and joint and partial variation.', members: ['m9-6-1', 'm9-6-2', 'm9-6-3', 'mx-9-1', 'mx-24-1', 'mx-24-2'] },
        { title: 'Algebraic Expressions and Factorization', description: 'Expanding brackets, common factors, factorizing quadratic expressions, and the difference of two squares.', members: ['m10c-4-1', 'm10c-4-3', 'm10c-4-4', 'm10c-4-5', 'm10c-4-6'] },
        { title: 'Quadratic Equations and Graphs', description: 'Quadratic graphs, their roots and turning points, and solving quadratic equations by factorization.', members: ['m202-6-1', 'm202-6-2', 'm202-7-1'] },
        { title: 'Logical Reasoning', description: 'Statements, implication, the converse, inverse and contrapositive, equivalence, and valid arguments. Truth tables for compound statements.', members: ['m302-1-3', 'm202-1-3', 'mx-23-3'] },
        { title: 'Angles, Triangles and Polygons', description: 'Angles with parallel lines, angles in triangles and polygons, the properties of triangles and quadrilaterals, and congruent triangles.', members: ['m202-2-1', 'm202-2-2', 'm202-2-3', 'm303-3-1', 'm202-2-4'] },
        { title: 'Constructions and Loci', description: 'Bisecting lines and angles, and the loci of points that move under given conditions.', members: ['m7-8-2', 'mx-10-2'] },
        { title: 'Mensuration', description: 'The area of a circle, arcs and sectors, and the surface area and volume of prisms, cylinders, pyramids, cones and spheres. Segments of a circle, and frustums.', members: ['m7-7-4', 'mx-10-3', 'm10c-1-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8', 'mx-25-1', 'mx-25-2'] },
        { title: 'Trigonometry', description: 'Sine, cosine and tangent in right-angled triangles, angles of elevation and depression, and the ratios of 30°, 45° and 60°.', members: ['m10c-2-1', 'm10c-2-2', 'm10c-2-3', 'm10c-2-4', 'm201-2-1'] },
        { title: 'Statistics', description: 'Frequency tables, bar charts, histograms and pie charts, and the mean, median and mode.', members: ['m5-12-1', 'm203-8-1', 'm7-10-3', 'm7-10-1'] },
      ],
      gaps: [],
    },
    {
      id: 'waec-ss-2',
      title: 'WASSCE Mathematics: SS 2 (WAEC)',
      shortTitle: 'WASSCE SS 2',
      grade: 11,
      description: 'The second year of senior secondary General Mathematics (SS 2, or SHS 2 in Ghana): approximation, sequences and series, quadratic and simultaneous equations, inequalities, algebraic fractions, circle theorems, the sine and cosine rules, bearings, probability and statistics, in the order of a WASSCE scheme of work.',
      units: [
        { title: 'Approximation and Errors', description: 'Rounding and error intervals, the accuracy of measurements, and percentage error.', members: ['mx-7-1', 'm303-1-1', 'm303-1-2'] },
        { title: 'Sequences and Series', description: 'Arithmetic and geometric progressions: the nth term and the sum of the first n terms.', members: ['m201-1-1', 'm201-1-2', 'm201-1-3', 'm201-1-4'] },
        { title: 'Quadratic Equations', description: 'Solving by factorization, completing the square and the quadratic formula, and word problems that lead to quadratic equations.', members: ['m201-4-2', 'm201-4-3', 'm201-4-4', 'm202-7-3'] },
        { title: 'Simultaneous Equations', description: 'Two linear equations, by graph, substitution and elimination, and one linear with one quadratic equation.', members: ['m10c-8-1', 'm10c-8-2', 'm10c-8-3', 'm201-8-1', 'm201-8-2'] },
        { title: 'Gradient of a Curve', description: 'Drawing a tangent to find the gradient of a curve at a point, and the area under a graph.', members: ['mx-8-3'] },
        { title: 'Linear Inequalities', description: 'Inequalities in one variable on the number line, and the graphs of inequalities in two variables. Linear programming.', members: ['m9-6-4', 'm9-6-5', 'm201-9-1', 'mx-24-3'] },
        { title: 'Algebraic Fractions', description: 'Simplifying, multiplying, dividing, adding and subtracting algebraic fractions, and equations with them.', members: ['m201-u6'] },
        { title: 'Circle Theorems', description: 'Chords, angles at the centre and at the circumference, the angle in a semicircle, and tangents. Cyclic quadrilaterals and the alternate segment theorem.', members: ['m9-u8', 'mx-25-4'] },
        { title: 'The Sine and Cosine Rules, and Bearings', description: 'The trigonometric ratios of any angle, the sine rule, the cosine rule, solving triangles, and bearings.', members: ['m201-2-2', 'm201-2-3', 'm201-2-5', 'm202-3-3', 'mx-10-1'] },
        { title: 'Probability', description: 'Expressing probabilities, experimental and theoretical probability, sample spaces, and mutually exclusive, independent and dependent events.', members: ['m7-11-1', 'm7-11-3', 'm7-11-2', 'm302-3-3', 'm8-10-2', 'm302-3-4'] },
        { title: 'Statistics', description: 'Histograms and cumulative frequency curves for grouped data, the mean of a frequency table, quartiles and percentiles, the mean deviation, and the variance and standard deviation.', members: ['mx-11-2', 'mx-11-3', 'm303-6-2', 'mx-1-3', 'm202-5-1'] },
      ],
      gaps: [],
    },
    {
      id: 'waec-ss-3',
      title: 'WASSCE Mathematics: SS 3 (WAEC)',
      shortTitle: 'WASSCE SS 3',
      grade: 12,
      description: 'The third year of senior secondary General Mathematics (SS 3, or SHS 3 in Ghana): surds, matrices, the arithmetic of finance, the coordinate geometry of straight lines, trigonometric graphs, differentiation and integration, and vectors and transformations, in the order of a WASSCE scheme of work.',
      units: [
        { title: 'Surds', description: 'Rational and irrational numbers, simplifying surds, calculating with surds, and rationalizing the denominator.', members: ['m10c-3-3', 'm10c-3-4', 'm202-4-1', 'm202-4-2', 'm202-4-3'] },
        { title: 'Matrices and Determinants', description: 'Adding and multiplying matrices, the determinant and inverse of a 2 × 2 matrix, and solving simultaneous equations with matrices.', members: ['mx-5-2', 'mx-5-3'] },
        { title: 'Arithmetic of Finance', description: 'Simple and compound interest, profit, discount and tax, commission, hire purchase, income tax, and depreciation. Annuities, and shares and stocks.', members: ['m203-7-1', 'm103-1-3', 'm103-2-2', 'm204-2-3', 'm103-2-4', 'm302-6-4', 'mx-26-2', 'mx-26-4'] },
        { title: 'Longitude and Latitude', description: 'The Earth as a sphere: great circles and small circles, and distances along meridians and parallels of latitude.', members: ['mx-25-6'] },
        { title: 'Coordinate Geometry of Straight Lines', description: 'The distance between two points and the midpoint, the gradient, the equation of a line, and parallel and perpendicular lines.', members: ['m10c-6-5', 'm10c-6-3', 'm10c-7-1', 'm10c-7-2', 'm10c-7-3', 'm10c-6-4', 'm10c-7-4'] },
        { title: 'Trigonometric Graphs', description: 'The graphs of sine, cosine and tangent from 0° to 360°, and solving equations with them.', members: ['mx-8-4'] },
        { title: 'Differentiation', description: 'The gradient of a curve, differentiation from first principles, the rules of differentiation, and maximum and minimum points.', members: ['m31-3-1', 'm31-3-2', 'm31-4-1', 'm31-4-2', 'm31-4-3', 'm31-6-2'] },
        { title: 'Integration', description: 'Integrating powers of x, definite integrals, and the area under a curve.', members: ['m31-8-1', 'm31-8-3'] },
        { title: 'Vectors and Transformations', description: 'Vectors in a plane, and translations, reflections, rotations and enlargements.', members: ['mx-5-1', 'm7-9-2', 'm7-9-3', 'm303-4-2'] },
      ],
      gaps: [],
    },
  ],
};
