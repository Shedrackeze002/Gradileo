import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// Cookies and flour: 24 and 2 1/4 cups, 8 and 3/4 cup, 40 and 3 3/4 cups.
const table = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Cookies}', '\\text{Flour (cups)}'],
        cols: [
          ['24', '2\\tfrac14'],
          ['8', '\\tfrac34'],
          ['40', '3\\tfrac34'],
        ],
        titleWidth: 4.6,
        colWidth: 2.2,
        arrows: [
          { id: 'd3', from: 0, to: 1, label: '\\div 3', tone: 'adj' },
          { id: 'x5', from: 1, to: 2, label: '\\times 5' },
        ],
      }),
    ],
    320,
  );

const video: Explainer = {
  id: 'm8-4-3-d',
  lessonId: 'm8-4-3',
  title: 'Solving Fraction Problems, Part 4: Scaling a Recipe',
  thumbnailTitle: 'Scaling a Recipe',
  thumbnail: 'rt',
  summary:
    'To scale a recipe, find how many times the recipe you need, then multiply each amount by it. A recipe for 24 cookies uses 2 1/4 cups of flour; 40 cookies is 40/24 = 5/3 of the recipe, so the flour is 2 1/4 × 5/3 = 9/4 × 5/3 = 45/12 = 15/4 = 3 3/4 cups. A ratio table checks it: 24 cookies to 8 (÷3) needs 3/4 cup, and 8 to 40 (×5) needs 3 3/4 cups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 4', title: 'Scaling a Recipe', subtitle: 'More cookies, more flour' }],
      lines: [
        { say: 'A recipe for twenty-four cookies uses two and one quarter cups of flour. How much flour is needed for forty cookies?', show: 'title' },
        { say: 'In this part, you will scale a recipe up or down by multiplying by a fraction.' },
      ],
    },
    {
      chapter: 'How many times the recipe?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A recipe for $24$ cookies uses $2\\dfrac{1}{4}$ cups of flour. How much flour is needed for $40$ cookies?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{40}{24} = \\dfrac{40 \\div 8}{24 \\div 8} = \\dfrac{5}{3}', '\\dfrac{5}{3} = 1\\dfrac{2}{3} \\text{ recipes}'] },
      ],
      lines: [
        { say: 'A recipe for twenty-four cookies uses two and one quarter cups of flour. How much flour is needed for forty cookies?', show: 'q' },
        { say: 'First, find how many times the recipe you need. Compare the new number of cookies with the old: forty over twenty-four.' },
        { say: 'Eight divides both forty and twenty-four. Forty divided by eight is five, and twenty-four divided by eight is three. So forty cookies is five thirds of the recipe.', show: 'm.0', focus: 'm.0' },
        { say: 'Five thirds is one and two thirds. So you make the recipe one and two thirds times.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Scale the flour',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{1}{4} \\times \\dfrac{5}{3} = \\dfrac{9}{4} \\times \\dfrac{5}{3}', '= \\dfrac{45}{12} = \\dfrac{15}{4}', '\\dfrac{15}{4} = 3\\dfrac{3}{4} \\text{ cups}'] },
      ],
      lines: [
        { say: 'Now multiply the flour by five thirds. Two and one quarter is nine quarters, so it is nine quarters times five thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine times five is forty-five, and four times three is twelve. That is forty-five twelfths. Three divides both, so it is fifteen quarters. You could also simplify first: nine and three share the factor three.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifteen divided by four is three, remainder three. So fifteen quarters is three and three quarters. Forty cookies need three and three quarter cups of flour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with a ratio table',
      layout: 'center',
      main: [table('rt')],
      lines: [
        { say: 'A ratio table checks the answer. The recipe makes twenty-four cookies with two and one quarter cups of flour.', show: ['rt.frame', 'rt.c0'] },
        { say: 'Divide both by three. Twenty-four divided by three is eight cookies. Two and one quarter divided by three: nine quarters divided by three is three quarters of a cup.', show: ['rt.d3', 'rt.c1'], focus: ['rt.d3', 'rt.c1'] },
        { say: 'Now multiply both by five. Eight times five is forty cookies. Three quarters times five is fifteen quarters, which is three and three quarter cups. It matches!', show: ['rt.x5', 'rt.c2'], focus: ['rt.x5', 'rt.c2'] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does it make sense?', md: 'More cookies need more flour: $3\\dfrac{3}{4}$ is more than $2\\dfrac{1}{4}$. And $\\dfrac{5}{3}$ is between $1$ and $2$, so the flour should be between $2\\dfrac{1}{4}$ and $4\\dfrac{1}{2}$ cups.' },
      ],
      lines: [
        { say: 'Does the answer make sense? Forty cookies is more than twenty-four, so you need more flour. Three and three quarters is more than two and one quarter. Good.', show: 'tip' },
        { say: 'And five thirds is between one and two recipes. One recipe needs two and one quarter cups, and two recipes need four and one half cups. Three and three quarters is in between. It makes sense.' },
        { say: 'If you scale down, to make fewer cookies, the fraction is less than one, and you need less flour.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe for $12$ muffins uses $1\\dfrac{1}{2}$ cups of milk. How much milk is needed for $18$ muffins?',
          choices: ['$1$ cup', '$2\\dfrac{1}{4}$ cups', '$7\\dfrac{1}{2}$ cups', '$27$ cups'],
          answer: 1,
          working: '$18$ muffins is $\\tfrac{18}{12} = \\tfrac32$ of the recipe. Milk: $1\\tfrac12 \\times \\tfrac32 = \\tfrac32 \\times \\tfrac32 = \\tfrac94 = 2\\tfrac14$ cups.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe for twelve muffins uses one and one half cups of milk. How much milk is needed for eighteen muffins? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two and one quarter cups. Eighteen muffins is eighteen twelfths, or three halves, of the recipe. Three halves times three halves is nine quarters, which is two and one quarter. Choice A uses the fraction upside down, twelve eighteenths, and gives less milk for more muffins.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Find how many times the recipe: $\\dfrac{40}{24} = \\dfrac{5}{3}$.',
            'Multiply each amount by it: $2\\dfrac{1}{4} \\times \\dfrac{5}{3} = 3\\dfrac{3}{4}$ cups.',
            'Check with a ratio table, and check that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To scale a recipe, find how many times the recipe you need, as a fraction: the new amount over the old amount.', show: 'sum.0' },
        { say: 'Then multiply each amount in the recipe by that fraction.', show: 'sum.1' },
        { say: 'And check, with a ratio table or an estimate, that the answer makes sense. Great work with fractions! Next, you will multiply and divide integers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
