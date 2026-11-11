/**
 * Alberta's new Grades 7 to 9 mathematics curriculum (the draft of June 2026, in optional classroom
 * piloting in 2026–27 and mandatory from September 2027). Gradileo's own Math 7, 8 and 9 follow the
 * program of studies it replaces (2007, updated 2016), which is still the one most classes use, so
 * the new curriculum is offered beside them as three mapped courses.
 *
 * Each unit is one learning outcome of the draft, named by its code in the Alberta Professional
 * Learning Consortium's scope and sequence (7N1: Grade 7, Number, outcome 1; A algebra, G geometry,
 * M measurement, F functions, ST statistics, PR probability), in the draft's order. Grade 7 was
 * mapped from the province's draft itself; Grades 8 and 9 from the province's fact sheet and that
 * scope and sequence, so their wording is still to be checked against new LearnAlberta.
 */
import type { CurriculumMap } from './build.ts';

export const AB_MAP: CurriculumMap = {
  curriculum: 'ab',
  name: 'New Alberta Grades 7 to 9',
  courses: [
    {
      id: 'ab-grade-7',
      title: 'Grade 7 Mathematics (Alberta, new curriculum)',
      shortTitle: 'Alberta Grade 7',
      grade: 7,
      description: 'Positive and negative numbers and absolute value, operations with integers, perfect squares and cubes, multiplying and dividing fractions and decimals, proportional reasoning, equations with terms on both sides, geometric notation and angles, circles, volume, functions with domain and range, samples, and probability, in the order of Alberta’s new curriculum.',
      units: [
        { title: 'Positive and Negative Numbers', description: 'Absolute value and opposites, converting between fractions and decimals, and comparing and ordering positive and negative numbers (7N1).', members: ['mx-20-1', 'm7-1-2', 'm9-3-1'] },
        { title: 'Operations with Integers', description: 'Adding, subtracting, multiplying and dividing integers, and solving problems with them (7N2).', members: ['m7-4-1', 'm7-4-2', 'm7-4-3', 'm8-5-1', 'm8-5-2'] },
        { title: 'Perfect Squares and Perfect Cubes', description: 'Perfect squares within 144 and perfect cubes within 125, with their square roots and cube roots (7N3).', members: ['m8-1-1', 'mx-20-2'] },
        { title: 'Multiplying and Dividing Fractions and Decimals', description: 'Multiplying and dividing fractions and decimal numbers, and the order of operations with integers, fractions and decimals (7N4).', members: ['m8-4-1', 'm8-4-2', 'm8-4-3', 'm7-2-2', 'm7-2-3', 'm8-5-3'] },
        { title: 'Ratios, Proportions and Percents', description: 'Equivalent ratios and the factor that relates them, comparing ratios, unit rates, percents below 1% and above 100%, and proportional reasoning with discounts, taxes and percent change (7N5).', members: ['m6-5-1', 'm8-3-1', 'm8-3-2', 'm8-3-3', 'm7-2-4', 'm8-2-1', 'm7-2-5', 'm8-2-3'] },
        { title: 'Linear Equations', description: 'Simplifying with like terms and the distributive property, preserving equality, and solving equations with algebraic terms on both sides (7A).', members: ['m6-6-2', 'm7-6-2', 'm7-6-4', 'm8-7-3', 'm9-6-1', 'm8-7-4'] },
        { title: 'Geometric Objects, Angles and Congruence', description: 'Lines, rays, segments and angles with their symbols, angle relationships at intersections and with a transversal, and congruent polygons (7G1).', members: ['mx-21-1', 'm103-6-2', 'm103-6-3', 'm8-9-1'] },
        { title: 'Circles', description: 'Radius, diameter and circumference, pi, and the area of a circle (7M1).', members: ['m7-7-1', 'm7-7-4'] },
        { title: 'Volume of Prisms and Cylinders', description: 'Volume as the area of the base times the height, for rectangular prisms, triangular prisms and cylinders (7M2).', members: ['m6-10-2', 'm8-8-5'] },
        { title: 'Functions', description: 'Independent and dependent variables, relations and functions, domain and range, discrete and continuous functions, and graphing a function from a table of values (7F1).', members: ['m6-11-1', 'mx-22-1', 'mx-22-2', 'm7-5-2'] },
        { title: 'Samples and Statistics', description: 'Populations, samples and random sampling, mean, median, mode and range, and comparing samples (7ST1).', members: ['m9-10-2', 'm7-10-1', 'mx-1-4'] },
        { title: 'Probability', description: 'Outcomes and events, likelihood, and theoretical and experimental probability (7PR1).', members: ['m7-11-1', 'm6-12-2', 'm7-11-3'] },
      ],
      gaps: [],
    },
    {
      id: 'ab-grade-8',
      title: 'Grade 8 Mathematics (Alberta, new curriculum)',
      shortTitle: 'Alberta Grade 8',
      grade: 8,
      description: 'Rational and irrational numbers, square roots, the constant of proportionality, polynomials, linear equations with rational numbers, inequalities, similarity and dilations, triangle theorems, surface area, slope and linear functions, the shape of a distribution, and independent and dependent events, in the order of Alberta’s new curriculum.',
      units: [
        { title: 'Rational Numbers', description: 'Comparing rational numbers, and adding, subtracting, multiplying and dividing any two of them (8N1).', members: ['m9-3-1', 'm9-3-2', 'm9-3-3', 'm9-3-4'] },
        { title: 'Irrational Numbers', description: 'Rational and irrational numbers, exact and approximate values, and real numbers on the number line (8N1).', members: ['m10c-3-3'] },
        { title: 'Square Roots', description: 'Square roots of perfect squares and non-perfect squares, and problems with the side and area of a square (8N3).', members: ['m9-1-1', 'm8-1-2', 'm9-1-2'] },
        { title: 'Ratios and the Constant of Proportionality', description: 'A ratio as a multiplicative comparison, and the constant of proportionality as a unit rate, a slope and a scale factor (8N5).', members: ['mx-20-3', 'm9-7-2'] },
        { title: 'Polynomials', description: 'Powers in algebraic terms, the degree and names of polynomials, and adding and subtracting like terms (8A1).', members: ['m9-5-1', 'm9-5-2', 'm9-5-3'] },
        { title: 'Linear Equations with Rational Numbers', description: 'Equations with variables on both sides, brackets and rational coefficients, and problems solved with them (8A2).', members: ['m9-6-1', 'm9-6-2', 'm9-6-3'] },
        { title: 'Inequalities', description: 'Strict and non-strict inequalities, on a number line and checked by substitution (8A3).', members: ['m9-6-4'] },
        { title: 'Similarity and Dilations', description: 'Scale factor, similar polygons, and dilations on the Cartesian plane (8G1).', members: ['m9-7-1', 'm9-7-3', 'mx-21-2'] },
        { title: 'Triangle Theorems', description: 'The angle sum of a triangle and the Pythagorean theorem, used to justify unknown measures (8G2).', members: ['m202-2-2', 'm8-1-3', 'm8-1-4'] },
        { title: 'Surface Area', description: 'Views and nets of three-dimensional shapes, and the surface area of prisms and cylinders from their nets (8M2).', members: ['m8-8-1', 'm8-8-2', 'm8-8-3', 'm8-8-4'] },
        { title: 'Linear Functions and Slope', description: 'Linear relations in tables and graphs, linear and non-linear functions, slope as a rate of change, and horizontal and vertical lines (8F1).', members: ['m8-6-1', 'm8-6-2', 'm10c-6-1', 'm10c-6-3'] },
        { title: 'Distributions and Graphs', description: 'Bar graphs, histograms and circle graphs, and the shape of a distribution: its modes, and whether it is symmetric, skewed or uniform (8ST1).', members: ['m203-8-1', 'mx-1-7', 'm7-10-3', 'm8-10-1'] },
        { title: 'Independent and Dependent Events', description: 'Sample spaces in lists and tables, and the probability of independent and dependent events (8PR1).', members: ['m7-11-2', 'm8-10-2', 'm302-3-4'] },
      ],
      gaps: [],
    },
    {
      id: 'ab-grade-9',
      title: 'Grade 9 Mathematics (Alberta, new curriculum)',
      shortTitle: 'Alberta Grade 9',
      grade: 9,
      description: 'Sets of real numbers, exponent laws and scientific notation, expanding and factoring polynomials, simple quadratic equations, linear inequalities, congruent and similar triangles, surface area and volume of composite shapes, linear functions in function notation, box plots and spread, and mutually exclusive events, in the order of Alberta’s new curriculum.',
      units: [
        { title: 'Sets of Real Numbers', description: 'Sets and subsets of the real numbers, finite and infinite sets, and set-builder notation (9N1).', members: ['mx-20-4', 'm302-1-1'] },
        { title: 'Exponent Laws', description: 'Powers and brackets, the exponent laws, zero and negative exponents, and the order of operations with powers (9N3).', members: ['m9-2-1', 'm9-2-2', 'm10c-3-5', 'm9-2-3'] },
        { title: 'Powers of 10 and Scientific Notation', description: 'Powers of 10 and place value, and converting and calculating with scientific notation (9N3).', members: ['mx-2-1', 'mx-2-2'] },
        { title: 'Polynomial Operations', description: 'Multiplying monomials, expanding and simplifying, identities, and factoring trinomials of the form x² + bx + c (9A1).', members: ['m9-5-4', 'm10c-4-1', 'm10c-4-4', 'm10c-4-6'] },
        { title: 'Quadratic Equations', description: 'Solving x² = a and x² + c = 0, and deciding how many solutions there are (9A2).', members: ['mx-22-3'] },
        { title: 'Linear Inequalities', description: 'Solving single-variable linear inequalities, and showing the solutions on a number line and in set-builder notation (9A3).', members: ['m9-6-5'] },
        { title: 'Congruent and Similar Triangles', description: 'Congruent triangles, similar triangles with their proportional sides, and justifying triangle theorems (9G1).', members: ['m202-2-4', 'm103-7-3', 'mx-3-3'] },
        { title: 'Surface Area and Volume of Composite Shapes', description: 'Surface area and volume of pyramids and of shapes composed of prisms, pyramids and cylinders (9M2).', members: ['m9-1-3', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8'] },
        { title: 'Linear Functions', description: 'Function notation, evaluating functions, equations and graphs of linear functions, intercepts, and interpolating and extrapolating (9F1).', members: ['m10c-5-4', 'm9-4-1', 'm9-4-2', 'm10c-6-2'] },
        { title: 'Spread and Box Plots', description: 'Range, outliers, the five-number summary, the interquartile range and box plots, and choosing a measure of centre (9ST1).', members: ['m7-10-2', 'mx-1-2', 'mx-1-3'] },
        { title: 'Mutually Exclusive Events', description: 'Venn diagrams and set notation, complementary events, and mutually exclusive and non-mutually exclusive events (9PR1).', members: ['m302-1-2', 'm302-3-3'] },
      ],
      gaps: [],
    },
  ],
};
