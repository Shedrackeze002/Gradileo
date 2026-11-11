/**
 * The International Baccalaureate Diploma Programme's two mathematics courses at standard level:
 * Analysis and Approaches, and Applications and Interpretation. Each unit points to the Gradileo
 * lessons that teach its part of the five syllabus topics (1 number and algebra, 2 functions,
 * 3 geometry and trigonometry, 4 statistics and probability, 5 calculus), in the order of the
 * guide. The higher level content and the Middle Years Programme are not mapped yet.
 */
import type { CurriculumMap } from './build.ts';

export const IB_MAP: CurriculumMap = {
  curriculum: 'ib',
  name: 'IB Diploma',
  courses: [
    {
      id: 'ib-aa-sl',
      title: 'Mathematics: Analysis and Approaches SL (IB)',
      shortTitle: 'IB AA SL',
      grade: 11,
      description: 'The standard level course in Analysis and Approaches, taken over the two years of the IB Diploma: sequences and series, exponents and logarithms, functions, trigonometry, statistics and probability, and differential and integral calculus, in the order of the guide.',
      units: [
        { title: 'Sequences, Series and Financial Applications', description: 'Standard form, arithmetic and geometric sequences and series, sigma notation, the sum of an infinite geometric series, and compound interest and depreciation (topic 1).', members: ['mx-2-1', 'mx-2-2', 'm201-u1', 'mx-17-3', 'm203-7-1', 'm302-6-4'] },
        { title: 'Exponents and Logarithms', description: 'Rational exponents, logarithms and their laws, the change of base, and solving exponential equations (topic 1).', members: ['m10c-3-6', 'm301-7-4', 'm301-7-6', 'm301-7-3', 'm301-7-7'] },
        { title: 'Proof and the Binomial Theorem', description: 'Simple deductive proof, combinations, and the binomial theorem for a positive whole number n (topic 1).', members: ['m202-1-3', 'm301-9-3', 'm301-9-4'] },
        { title: 'Functions', description: 'The equations of straight lines, parallel and perpendicular lines, functions with their domain and range, and inverse and composite functions (topic 2).', members: ['m10c-7-1', 'm10c-7-4', 'm10c-5-3', 'm10c-5-4', 'm301-1-4', 'm301-8-5'] },
        { title: 'Quadratic Functions and Equations', description: 'The forms of a quadratic function and its graph, solving quadratic equations and inequalities, and the discriminant (topic 2).', members: ['m201-3-1', 'm201-3-2', 'm201-3-3', 'm201-4-2', 'm201-4-3', 'm201-4-4', 'm201-9-2'] },
        { title: 'Rational, Exponential and Logarithmic Functions', description: 'The reciprocal function, rational functions and their asymptotes, and exponential and logarithmic functions and their graphs (topic 2).', members: ['m201-7-4', 'm301-8-1', 'm301-8-2', 'm301-7-1', 'm301-7-2', 'm301-7-5'] },
        { title: 'Transformations of Graphs', description: 'Translations, reflections and stretches of graphs, and composite transformations (topic 2).', members: ['m301-1-1', 'm301-1-2', 'm301-1-3'] },
        { title: 'Geometry and Trigonometry of Triangles', description: 'Distance in three dimensions, the surface area and volume of solids, right-angled trigonometry, angles of elevation and depression, bearings, the sine and cosine rules, the area of a triangle as ½ab sin C, and problems in three dimensions (topic 3).', members: ['mx-17-5', 'm10c-1-6', 'm10c-1-7', 'm10c-2-3', 'm10c-2-4', 'mx-10-1', 'm201-2-3', 'm201-2-4', 'm201-2-5', 'mx-16-2', 'mx-10-4'] },
        { title: 'Circular Functions', description: 'Radians, arcs and sectors, the unit circle, exact values, and the graphs of sine, cosine and tangent with their transformations (topic 3).', members: ['m301-4-1', 'm301-4-2', 'm301-4-3', 'm301-5-1', 'm301-5-2', 'm301-5-3'] },
        { title: 'Trigonometric Identities and Equations', description: 'The Pythagorean identity, the double angle identities, proving identities, and solving trigonometric equations in a finite interval (topic 3).', members: ['m301-6-1', 'm301-6-2', 'm301-6-3', 'm301-4-4', 'm301-6-4', 'm301-5-4'] },
        { title: 'Statistics', description: 'Sampling, histograms, cumulative frequency and box plots, outliers, the variance and standard deviation, scatter diagrams, and Pearson’s product moment correlation coefficient (topic 4).', members: ['mx-14-1', 'mx-11-2', 'mx-11-3', 'mx-1-2', 'mx-14-3', 'm202-5-1', 'mx-14-2', 'm10c-7-5', 'mx-15-1'] },
        { title: 'Probability', description: 'Venn diagrams, combined and mutually exclusive events, conditional probability, and independent events with tree diagrams (topic 4).', members: ['m302-1-2', 'm302-3-3', 'm302-3-4', 'm8-10-2'] },
        { title: 'Probability Distributions', description: 'Discrete random variables, the binomial distribution, the normal distribution, standardizing with z-values, and inverse normal calculations (topic 4).', members: ['mx-14-4', 'mx-14-5', 'm202-5-2', 'm202-5-3', 'mx-15-2'] },
        { title: 'Differentiation', description: 'Limits, the derivative as a gradient and a rate of change, differentiating powers, sin x, cos x, eˣ and ln x, the chain, product and quotient rules, tangents and normals, maxima, minima and points of inflection, and optimization (topic 5).', members: ['m31-2-1', 'm31-3-1', 'm31-4-1', 'm31-6-1', 'm31-5-1', 'm31-5-2', 'm31-4-2', 'm31-4-3', 'm31-6-2', 'm31-6-3', 'm31-7-1'] },
        { title: 'Integration and Kinematics', description: 'Antiderivatives, definite integrals and the area under a curve, integration by substitution, the area between two curves, and displacement, velocity and acceleration (topic 5).', members: ['m31-8-1', 'm31-8-3', 'm31-8-4', 'm31-9-1', 'm31-6-4'] },
      ],
      gaps: ['The regression line of y on x', 'The expected value of a discrete random variable'],
    },
    {
      id: 'ib-ai-sl',
      title: 'Mathematics: Applications and Interpretation SL (IB)',
      shortTitle: 'IB AI SL',
      grade: 11,
      description: 'The standard level course in Applications and Interpretation, taken over the two years of the IB Diploma: number and financial mathematics, modelling with functions, geometry and trigonometry, statistics and probability, and an introduction to calculus, in the order of the guide.',
      units: [
        { title: 'Number and Algebra', description: 'Standard form, arithmetic and geometric sequences and series, the laws of exponents, and an introduction to logarithms (topic 1).', members: ['mx-2-1', 'mx-2-2', 'm201-1-1', 'm201-1-2', 'm201-1-3', 'm201-1-4', 'm10c-3-5', 'm301-7-4'] },
        { title: 'Approximation and Error', description: 'Rounding, upper and lower bounds, and percentage error (topic 1).', members: ['mx-7-1', 'mx-7-2', 'm303-1-1'] },
        { title: 'Financial Mathematics', description: 'Simple and compound interest, and growth and depreciation (topic 1).', members: ['m203-7-1', 'm302-6-4'] },
        { title: 'Systems of Equations', description: 'Solving systems of linear equations, and how many solutions they have (topic 1).', members: ['m10c-8-1', 'm10c-8-4'] },
        { title: 'Functions and Straight Lines', description: 'The equations of straight lines, parallel and perpendicular lines, functions with their domain and range, and the inverse of a function (topic 2).', members: ['m10c-7-1', 'm10c-7-2', 'm10c-7-4', 'm10c-5-3', 'm10c-5-4', 'm301-1-4'] },
        { title: 'Modelling with Functions', description: 'Linear, quadratic, cubic, exponential and sinusoidal models, and direct and inverse variation (topic 2).', members: ['mx-2-3', 'm202-6-2', 'm202-6-3', 'm302-5-1', 'm302-5-2', 'm302-6-1', 'mx-9-1', 'm302-7-1', 'm302-7-2'] },
        { title: 'Geometry and Trigonometry', description: 'Distance and midpoints in two and three dimensions, the surface area and volume of solids, right-angled trigonometry, angles of elevation and depression, bearings, the sine and cosine rules, the area of a triangle, arcs and sectors, and perpendicular bisectors (topic 3).', members: ['m10c-6-5', 'mx-17-5', 'm10c-1-6', 'm10c-1-7', 'm10c-1-8', 'm10c-2-3', 'm10c-2-4', 'mx-10-1', 'm202-3-1', 'm202-3-2', 'm202-3-3', 'mx-16-2', 'mx-10-4', 'mx-10-3', 'm7-8-2'] },
        { title: 'Statistics', description: 'Sampling, histograms, cumulative frequency and box plots, outliers, the standard deviation, scatter diagrams, and Pearson’s product moment correlation coefficient (topic 4).', members: ['mx-14-1', 'mx-11-2', 'mx-11-3', 'mx-1-2', 'mx-14-3', 'm202-5-1', 'm10c-7-5', 'mx-15-1'] },
        { title: 'Probability', description: 'Venn diagrams, combined and mutually exclusive events, conditional probability, and independent events with tree diagrams (topic 4).', members: ['m302-1-2', 'm302-3-3', 'm302-3-4', 'm8-10-2'] },
        { title: 'Probability Distributions', description: 'Discrete random variables, the binomial distribution, the normal distribution, and inverse normal calculations (topic 4).', members: ['mx-14-4', 'mx-14-5', 'm202-5-2', 'm202-5-3', 'mx-15-2'] },
        { title: 'Differentiation', description: 'The derivative as a gradient and a rate of change, differentiating polynomials, tangents and normals, stationary points, and optimization (topic 5).', members: ['m31-3-1', 'm31-4-1', 'm31-6-1', 'm31-6-2', 'm31-7-1'] },
        { title: 'Integration', description: 'Antiderivatives of polynomials, definite integrals and the area under a curve, and the trapezoidal rule (topic 5).', members: ['m31-8-1', 'm31-8-3', 'mx-19-3'] },
      ],
      gaps: ['Annuities and amortization', 'Voronoi diagrams', 'The regression line of y on x', 'The expected value of a discrete random variable', 'Spearman’s rank correlation coefficient', 'The chi-squared tests for independence and goodness of fit', 'The t-test for two means'],
    },
  ],
};
