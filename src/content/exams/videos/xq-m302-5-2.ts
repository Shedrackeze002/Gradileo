import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 5.2 (modelling with polynomial functions). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 5.2, Power Functions and
// Polynomial Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. Cutting x-inch
// squares from the corners leaves a base of (8 − 2x) by (8 − 2x) and a height of x, so
// V(x) = x(8 − 2x)² = 4x³ − 32x² + 64x, as in the book's answer. The check builds the x = 1 box, and
// the graph shows the model on 0 < x < 4 with its largest volume, 1024/27 ≈ 37.9, at x = 4/3.

const QUESTION =
  'Use the written statements to construct a polynomial function that represents the required information. An open box is to be constructed by cutting out square corners of x-inch sides from a piece of cardboard 8 inches by 8 inches and then folding up the sides. Express the volume of the box as a function of x.';

const V = (x: number) => 4 * x ** 3 - 32 * x ** 2 + 64 * x;
const g = plane({ x: [-0.4, 4.6], y: [-4, 46], yStep: 10, width: 11, height: 8, titles: { x: 'x \\text{ (in)}', y: 'V \\text{ (in}^3)' } });

const graph = figure(
  'gr',
  [
    g,
    plot(g, { id: 'v', f: V, from: 0, to: 4, tone: 'adj', samples: 200 }),
    dots(g, [
      { id: 'one', x: 1, y: 36, tex: '(1, 36)', tone: 'good', place: 'below right' },
      { id: 'max', x: 4 / 3, y: 1024 / 27, tex: '(1.33, 37.9)', tone: 'opp', place: 'above right' },
    ]),
  ],
  480,
);

const video: Explainer = {
  id: 'xq-m302-5-2',
  lessonId: '',
  exam: {
    lesson: 'm302-5-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.2, Power Functions and Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-2-power-functions-and-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Volume of a Box Folded From Cardboard (Modelling with Polynomial Functions)',
  thumbnailTitle: 'The Volume of a Cardboard Box',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: x-inch squares are cut from the corners of an 8-inch by 8-inch sheet of cardboard, and the sides are folded up into an open box. Express its volume as a function of x. The base is (8 − 2x) by (8 − 2x) and the height is x, so V(x) = x(8 − 2x)² = 4x³ − 32x² + 64x. Then we check with a 1-inch cut, use the graph to find the biggest box, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Volume of a Cardboard Box', subtitle: 'Modelling with polynomial functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about modelling with a polynomial function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: '$V(x) = x(8 - 2x)^2 = 4x^3 - 32x^2 + 64x$',
          working: 'Base $(8 - 2x)$ by $(8 - 2x)$, height $x$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the written statements to construct a polynomial function that represents the required information. An open box is to be constructed by cutting out square corners of x-inch sides from a piece of cardboard 8 inches by 8 inches and then folding up the sides. Express the volume of the box as a function of x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Cut a square of side $x$ from **each** of the $4$ corners, then fold up the flaps to make the sides. Write the box\'s **volume** as a formula in $x$.' }],
      lines: [
        { say: 'We cut a square of side x from each of the 4 corners, then fold up the flaps to make the sides of the box.', show: 't' },
        { say: 'We need the volume of the box as a formula in x.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'vol', tone: 'definition', title: 'Volume of a box', md: '$V = \\text{length} \\times \\text{width} \\times \\text{height}$' },
        { kind: 'math', id: 'sq', size: 'lg', lines: ['(a - b)^2 = a^2 - 2ab + b^2'] },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a box is its length, times its width, times its height.', show: 'vol' },
        { say: 'And to expand, "a" minus b, all squared, is "a" squared, minus 2 "a" b, plus b squared.', show: 'sq' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the box\'s **length**, **width** and **height**', 'Multiply them', '**Expand** into a polynomial'] }],
      lines: [
        { say: 'Here is the plan. First, find the box\'s length, width and height in terms of x.', show: 'plan.0' },
        { say: 'Second, multiply them.', show: 'plan.1' },
        { say: 'Third, expand into a polynomial.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The dimensions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{length} = \\text{width} = 8 - x - x = \\good{8 - 2x}', '\\text{height} = \\good{x}'] }],
      lines: [
        { say: 'Step one. Along each 8-inch edge, a square of side x is cut from both ends. So the base is 8 minus x minus x, which is 8 minus 2 x, in both directions.', show: 'm.0' },
        { say: 'The flaps that fold up are x inches tall, so the height is x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V(x) = (8 - 2x)(8 - 2x)(x)', '= x(8 - 2x)^2'] }],
      lines: [
        { say: 'Step two. Length times width times height: 8 minus 2 x, times 8 minus 2 x, times x.', show: 'm.0' },
        { say: 'In short, x times 8 minus 2 x, all squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Expand',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(8 - 2x)^2 = 64 - 32x + 4x^2', 'V(x) = x(64 - 32x + 4x^2)', '= \\good{4x^3 - 32x^2 + 64x}'] }],
      lines: [
        { say: 'Step three. 8 minus 2 x, squared, is 64, minus 2 times 8 times 2 x, which is 32 x, plus 4 x squared.', show: 'm.0' },
        { say: 'Multiply every term by x.', show: 'm.1' },
        { say: 'So V of x equals 4 x cubed, minus 32 x squared, plus 64 x. A cubic polynomial.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph],
      lines: [
        { say: 'Let us check with a 1-inch cut. The box would be 6 inches by 6 inches by 1 inch: 36 cubic inches. The formula gives 4 minus 32 plus 64, which is also 36.', show: ['gr.grid', 'gr.axes', 'gr.v', 'gr.one'], focus: 'gr.one' },
        { say: 'The graph shows the model only from 0 to 4, since a cut of 4 inches or more leaves no base. Its highest point, near x equals 1.33, is the biggest box: about 37.9 cubic inches.', show: 'gr.max', focus: 'gr.max' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['base $8 - x$', 'a square is cut from **both** ends of each edge'],
            ['$V = (8 - 2x)^2$', 'that is the **base** area: multiply by the height $x$'],
            ['$(8 - 2x)^2 = 64 - 4x^2$', 'the middle term $-32x$ is missing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A square is cut from both ends of each edge, so the base side is 8 minus 2 x, not 8 minus x.' },
        { say: '8 minus 2 x, squared, is only the area of the base. Multiply by the height x to get the volume.' },
        { say: 'And squaring a difference has a middle term. Do not forget the negative 32 x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Squares of side $x$ cm are cut from the corners of a $10$ cm by $10$ cm sheet, which is folded into an open box. Which expression gives its volume?',
          choices: ['$x(10 - 2x)^2$', '$x(10 - x)^2$', '$(10 - 2x)^2$', '$10x^2 - 2x$'],
          answer: 0,
          working: 'Base $(10 - 2x)$ by $(10 - 2x)$, height $x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Squares of side x centimetres are cut from the corners of a 10 by 10 centimetre sheet, which is folded into an open box. Which expression gives its volume? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The base is 10 minus 2 x on each side, and the height is x. So the volume is x times 10 minus 2 x, all squared: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write each **dimension** in terms of $x$', 'Volume: length $\\times$ width $\\times$ height', 'Expand carefully: $(a - b)^2$ has a **middle term**', 'Check with one value, and use the **graph** within the sensible domain'] }],
      lines: [
        { say: 'Here is what to remember. Write each dimension in terms of x.', show: 'sum.0' },
        { say: 'The volume is length, times width, times height.', show: 'sum.1' },
        { say: 'Expand carefully: when you square the difference, keep the middle term.', show: 'sum.2' },
        { say: 'And check with one value, then use the graph within the sensible domain. For more on modelling with polynomial functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
