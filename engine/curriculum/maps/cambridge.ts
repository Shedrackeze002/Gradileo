/**
 * Cambridge IGCSE Mathematics (syllabus 0580), Core and Extended, the two-year course of Years 10
 * and 11 in Cambridge International schools. Each unit points to the Gradileo lessons that teach
 * its part of the syllabus content (number, algebra and graphs, coordinate geometry, geometry,
 * mensuration, trigonometry, transformations and vectors, probability, statistics), in the order
 * of the syllabus. Cambridge International AS and A level Mathematics are not mapped yet.
 */
import type { CurriculumMap } from './build.ts';

export const CAMBRIDGE_MAP: CurriculumMap = {
  curriculum: 'cambridge',
  name: 'Cambridge IGCSE',
  courses: [
    {
      id: 'igcse-core',
      title: 'IGCSE Mathematics: Core (Cambridge)',
      shortTitle: 'IGCSE Core',
      grade: 10,
      description: 'Number, algebra and graphs, coordinate geometry, geometry, mensuration, trigonometry, transformations, probability and statistics for the Core papers of Cambridge IGCSE Mathematics, in the order of the syllabus.',
      units: [
        { title: 'Types of Number', description: 'Ordering numbers, primes, factors and multiples, and squares, cubes and their roots.', members: ['m7-1-3', 'm6-3-1', 'm6-3-3', 'm8-1-1', 'm10c-3-2'] },
        { title: 'Sets', description: 'Set notation, and Venn diagrams with two sets.', members: ['m302-1-1', 'm302-1-2'] },
        { title: 'Fractions, Decimals and Percentages', description: 'Converting between fractions, decimals and percentages, calculating with fractions, percentages of amounts, and percentage change.', members: ['m7-1-2', 'm7-3-2', 'm8-4-1', 'm8-4-2', 'm7-2-4', 'm8-2-2', 'm8-2-3'] },
        { title: 'The Four Operations, Indices and Standard Form', description: 'Calculating with negative numbers, the order of operations, the rules of indices, and standard form.', members: ['m7-4-1', 'm7-4-2', 'm8-5-1', 'm8-5-3', 'm9-2-2', 'mx-2-1', 'mx-2-2'] },
        { title: 'Estimation and Limits of Accuracy', description: 'Rounding, estimating answers, and the upper and lower bounds of rounded numbers.', members: ['m5-1-2', 'm104-1-3', 'mx-7-1'] },
        { title: 'Ratio, Proportion and Rates', description: 'Ratios, proportion, unit rates, speed, distance and time, and density.', members: ['m8-3-1', 'm6-5-1', 'm8-3-3', 'm8-3-2', 'm204-8-3', 'mx-9-2'] },
        { title: 'Money, Time and Interest', description: 'Currency conversion, profit, discount and tax, simple and compound interest, the 12-hour and 24-hour clocks, and exponential growth.', members: ['m103-1-4', 'm103-1-3', 'm203-7-1', 'm104-6-3', 'mx-2-3'] },
        { title: 'Algebraic Expressions and Formulae', description: 'Simplifying expressions, expanding brackets, common factors, and substituting into formulae.', members: ['m6-6-2', 'm9-5-2', 'm9-5-3', 'm9-5-4', 'm10c-4-3', 'm204-5-1'] },
        { title: 'Equations and Inequalities', description: 'Linear equations, simultaneous linear equations, and linear inequalities on a number line.', members: ['m8-7-2', 'm8-7-3', 'm9-6-1', 'm9-6-2', 'm10c-8-2', 'm10c-8-3', 'm9-6-4', 'm9-6-5'] },
        { title: 'Sequences', description: 'Continuing a sequence, term-to-term rules, and the nth term of a linear sequence.', members: ['m5-11-2', 'm9-4-1', 'm201-1-1'] },
        { title: 'Graphs', description: 'Graphs in practical situations, straight-line graphs, and the graphs of quadratic and reciprocal functions.', members: ['m10c-5-1', 'm9-4-2', 'm202-6-1', 'm201-7-4'] },
        { title: 'Coordinate Geometry', description: 'Coordinates, the gradient of a line, y = mx + c, and parallel lines.', members: ['m7-9-1', 'm10c-6-3', 'm10c-7-1', 'm10c-6-4'] },
        { title: 'Angles, Shapes and Symmetry', description: 'Angle facts, angles with parallel lines, angles in triangles and polygons, the properties of triangles and quadrilaterals, and line and rotational symmetry.', members: ['m103-6-1', 'm103-6-2', 'm202-2-1', 'm202-2-2', 'm202-2-3', 'm303-3-1', 'm9-9-1', 'm9-9-2'] },
        { title: 'Constructions, Scale Drawings and Bearings', description: 'Constructing bisectors, scale drawings and maps, and bearings.', members: ['m7-8-2', 'm9-7-2', 'mx-10-1'] },
        { title: 'Similarity and Circle Theorems', description: 'Similar shapes, the angle in a semicircle, and the angle between a tangent and a radius.', members: ['m9-7-3', 'm9-8-2', 'm9-8-3'] },
        { title: 'Mensuration', description: 'Converting units, the area of composite shapes, the circumference and area of a circle, arcs and sectors, nets, and the surface area and volume of prisms, cylinders, pyramids, cones and spheres.', members: ['m10c-1-3', 'm6-9-3', 'm7-7-1', 'm7-7-4', 'mx-10-3', 'm8-8-2', 'm10c-1-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8'] },
        { title: 'Pythagoras’ Theorem and Trigonometry', description: 'Pythagoras’ theorem, and sine, cosine and tangent in right-angled triangles.', members: ['m8-1-3', 'm8-1-4', 'm10c-2-1', 'm10c-2-2', 'm10c-2-3'] },
        { title: 'Transformations', description: 'Translations, reflections, rotations and enlargements.', members: ['m7-9-2', 'm7-9-3', 'm303-4-2'] },
        { title: 'Probability', description: 'The probability scale, relative frequency and expected frequencies, sample spaces, and combined events.', members: ['m7-11-1', 'm7-11-3', 'm7-11-2', 'm6-12-1', 'm8-10-2'] },
        { title: 'Statistics', description: 'Collecting and displaying data, including stem-and-leaf diagrams, bar charts and pie charts, the mean, median, mode and range, and scatter diagrams with lines of best fit.', members: ['m5-12-2', 'm203-8-1', 'm7-10-3', 'm7-10-1', 'm10c-7-5'] },
      ],
      gaps: ['Changing the subject of a formula'],
    },
    {
      id: 'igcse-extended',
      title: 'IGCSE Mathematics: Extended (Cambridge)',
      shortTitle: 'IGCSE Extended',
      grade: 10,
      description: 'Number and surds, algebra, functions and differentiation, coordinate geometry, geometry and circle theorems, mensuration, trigonometry, transformations and vectors, probability and statistics for the Extended papers of Cambridge IGCSE Mathematics, in the order of the syllabus.',
      units: [
        { title: 'Number, Sets and Indices', description: 'Prime factors, rational and irrational numbers, set notation and Venn diagrams, negative and fractional indices, and standard form.', members: ['m10c-3-1', 'm10c-3-3', 'm302-1-1', 'm302-1-2', 'm10c-3-5', 'm10c-3-6', 'mx-2-1', 'mx-2-2'] },
        { title: 'Fractions, Percentages and Accuracy', description: 'Calculating with fractions, recurring decimals as fractions, percentage change, and upper and lower bounds in calculations.', members: ['m8-4-2', 'mx-7-3', 'm8-2-3', 'mx-7-1', 'mx-7-2'] },
        { title: 'Surds', description: 'Simplifying surds, calculating with surds, and rationalizing the denominator.', members: ['m10c-3-4', 'm202-4-1', 'm202-4-2', 'm202-4-3'] },
        { title: 'Ratio, Proportion and Rates', description: 'Proportion, comparing rates, speed, density and pressure, and direct and inverse proportion.', members: ['m8-3-3', 'm202-8-1', 'm204-8-3', 'mx-9-2', 'mx-9-1'] },
        { title: 'Money, Interest and Exponential Growth', description: 'Currency conversion, simple and compound interest, and exponential growth and decay.', members: ['m103-1-4', 'm203-7-1', 'mx-2-3', 'm302-6-4'] },
        { title: 'Algebraic Manipulation', description: 'Expanding products of brackets, and factorizing, including quadratics and the difference of two squares.', members: ['m10c-4-1', 'm10c-4-2', 'm10c-4-3', 'm10c-4-4', 'm10c-4-5', 'm10c-4-6'] },
        { title: 'Algebraic Fractions', description: 'Simplifying, multiplying, dividing, adding and subtracting algebraic fractions, and equations with them.', members: ['m201-u6'] },
        { title: 'Equations and Inequalities', description: 'Linear equations, simultaneous equations, quadratic equations by factorizing, completing the square and the formula, one linear with one quadratic equation, and inequalities and their regions.', members: ['m9-6-2', 'm10c-8-2', 'm10c-8-3', 'm201-4-2', 'm201-4-3', 'm201-8-2', 'm9-6-5', 'm201-9-1'] },
        { title: 'Sequences', description: 'Linear, quadratic and exponential sequences and their nth terms.', members: ['m201-1-1', 'm201-1-3', 'mx-8-1'] },
        { title: 'Graphs of Functions', description: 'Graphs in practical situations, gradients and areas under graphs, and the graphs of quadratic, cubic, reciprocal and exponential functions.', members: ['m10c-5-1', 'mx-8-3', 'm201-3-2', 'm301-3-1', 'm201-7-4', 'm301-7-1'] },
        { title: 'Differentiation', description: 'Differentiating powers of x, the gradient of a curve, and stationary points.', members: ['m31-4-1', 'm31-6-2'] },
        { title: 'Functions', description: 'Function notation, inverse functions, and composite functions.', members: ['m10c-5-4', 'm301-1-4', 'm301-8-5'] },
        { title: 'Coordinate Geometry', description: 'The length and midpoint of a line segment, the gradient, the equation of a line, and parallel and perpendicular lines.', members: ['m10c-6-5', 'm10c-6-3', 'm10c-7-1', 'm10c-7-2', 'm10c-6-4', 'm10c-7-4'] },
        { title: 'Geometry, Constructions and Similarity', description: 'Angles with parallel lines and in polygons, constructions, scale drawings, similar shapes and the areas and volumes of similar shapes, and symmetry.', members: ['m202-2-1', 'm202-2-3', 'm7-8-2', 'm9-7-2', 'm9-7-3', 'm202-8-4', 'm9-9-1', 'm9-9-2'] },
        { title: 'Circle Theorems', description: 'Chords, angles at the centre and at the circumference, the angle in a semicircle, and tangents.', members: ['m9-u8'] },
        { title: 'Mensuration', description: 'The area of a circle, arcs and sectors, and the surface area and volume of prisms, cylinders, pyramids, cones, spheres and compound solids.', members: ['m7-7-4', 'mx-10-3', 'm10c-1-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8'] },
        { title: 'Trigonometry', description: 'Pythagoras’ theorem, right-angled trigonometry, bearings, exact values, the graphs of sine, cosine and tangent, the sine and cosine rules, the area of a triangle as ½ab sin C, and trigonometry in three dimensions.', members: ['m8-1-4', 'm10c-2-3', 'm10c-2-4', 'mx-10-1', 'm201-2-1', 'm201-2-2', 'mx-8-4', 'm201-2-3', 'm201-2-4', 'm201-2-5', 'mx-16-2', 'mx-10-4'] },
        { title: 'Transformations and Vectors', description: 'Reflections, rotations and enlargements, and vectors: components, magnitude, adding and multiplying by a scalar.', members: ['m7-9-3', 'm303-4-2', 'mx-5-1'] },
        { title: 'Probability', description: 'Relative frequency, sample spaces, mutually exclusive and independent events, tree diagrams, and conditional probability.', members: ['m7-11-3', 'm7-11-2', 'm302-3-3', 'm8-10-2', 'm302-3-4'] },
        { title: 'Statistics', description: 'Stem-and-leaf diagrams, averages, the mean of a frequency table, scatter diagrams, histograms, cumulative frequency, and box-and-whisker plots.', members: ['m5-12-2', 'm7-10-1', 'm303-6-2', 'm10c-7-5', 'mx-11-2', 'mx-11-3', 'mx-1-2'] },
      ],
      gaps: ['Changing the subject of a formula', 'Cyclic quadrilaterals and the alternate segment theorem', 'Vector geometry: the ratio theorem and collinear points'],
    },
  ],
};
