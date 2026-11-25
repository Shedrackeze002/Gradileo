import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 4.4 (radical equations): √(x + 1) − x + 1 = 0. The question is
// an exercise from OpenStax Intermediate Algebra 2e, word for word (section 8.6, Solve Radical
// Equations, CC BY-NC-SA 4.0), with the set's instruction in front of it. Isolating gives
// √(x + 1) = x − 1, and squaring gives x² − 3x = 0, so x = 0 or x = 3. At x = 0 the two sides are
// 1 and −1, so 0 is extraneous and x = 3, as in the book's answer.

const g = plane({ x: [-1.5, 5.5], y: [-2.5, 3.5], every: 1, width: 9, height: 8 });

/** y = √(x + 1) and y = x − 1, which meet only at (3, 2); `fake` marks x = 0 on both. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'root', f: (x) => Math.sqrt(Math.max(0, x + 1)), from: -1, to: 5.5, tone: 'adj', label: 'y = \\sqrt{x + 1}', labelAt: 0.15, side: 'left' }),
      plot(g, { id: 'line', f: (x) => x - 1, tone: 'opp', label: 'y = x - 1', labelAt: 0.92, side: 'left' }),
      dots(g, [{ id: 'P', x: 3, y: 2, tex: '(3, 2)', tone: 'good', place: 'below right' }]),
      dots(g, [
        { id: 'f1', x: 0, y: 1, tone: 'bad', group: 'fake' },
        { id: 'f2', x: 0, y: -1, tone: 'bad', group: 'fake' },
      ]),
    ],
    480,
  );

const QUESTION = 'Solve. √(x + 1) − x + 1 = 0';

const video: Explainer = {
  id: 'xq-m202-4-4',
  lessonId: '',
  exam: {
    lesson: 'm202-4-4',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 8.6, Solve Radical Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/8-6-solve-radical-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve √(x + 1) − x + 1 = 0 (Radical Equations and Extraneous Roots)',
  thumbnailTitle: 'Solve √(x + 1) − x + 1 = 0',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve √(x + 1) − x + 1 = 0. We isolate the root to get √(x + 1) = x − 1, square both sides, and solve x² − 3x = 0 to get x = 0 or x = 3. Checking both in the original equation shows that 0 is extraneous, so the only solution is x = 3. Then we see why on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Radical Equation', subtitle: 'Radical equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about radical equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve. $\\sqrt{x + 1} - x + 1 = 0$',
          answer: '$x = 3$ (the value $x = 0$ is extraneous)',
          working: '$\\sqrt{x + 1} = x - 1$, so $x + 1 = x^2 - 2x + 1$ and $x(x - 3) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve: root x plus 1, minus x, plus 1, equals 0.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes the left side equal $0$. Squaring removes the root, but it can also add a **fake** solution, so we must check.' }],
      lines: [{ say: 'We want every value of x that makes the left side equal 0. Squaring gets rid of the root, but squaring can also create a fake solution, called an extraneous root. So we must check every answer.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'iso', tone: 'key', title: 'Isolate first', md: 'Get the root **alone** on one side before you square. Squaring a whole side with two or more terms keeps the root.' },
        { kind: 'callout', id: 'ext', tone: 'mistake', title: 'Extraneous roots', md: 'Squaring can turn a **false** equation into a true one: $1 \\ne -1$, but $1 = 1$. Check every root in the **original** equation.' },
      ],
      lines: [
        { say: 'Here is what we need. Get the square root alone on one side before you square. If other terms are with it, squaring does not get rid of the root.', show: 'iso' },
        { say: 'And squaring can make a false statement true. 1 does not equal negative 1, but 1 squared equals negative 1 squared. So check every root in the original equation.', show: 'ext' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Isolate** the root', '**Square** both sides and solve', '**Check** each root in the original'] }],
      lines: [
        { say: 'Here is the plan. First, isolate the square root.', show: 'plan.0' },
        { say: 'Second, square both sides and solve the equation that appears.', show: 'plan.1' },
        { say: 'Third, check each root in the original equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Isolate the root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{x + 1} - x + 1 = 0', '\\sqrt{x + 1} = x - 1'] }],
      lines: [
        { say: 'Step one. Here is the equation. The root has two other terms with it: negative x and plus 1.', show: 'm.0' },
        { say: 'Move them to the other side. Add x to both sides, and subtract 1. Now the root is alone: root x plus 1 equals x minus 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Square and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\sqrt{x + 1}\\right)^2 = (x - 1)^2', 'x + 1 = x^2 - 2x + 1', '0 = x^2 - 3x = x(x - 3)', 'x = 0 \\quad \\text{or} \\quad x = 3'] }],
      lines: [
        { say: 'Step two. Square both sides.', show: 'm.0' },
        { say: 'Squaring the root leaves x plus 1. On the right, x minus 1, squared, is x squared minus 2 x plus 1. Do not forget the middle term.', show: 'm.1' },
        { say: 'Subtract x and 1 from both sides: x squared minus 3 x equals 0. Factor out x: x times x minus 3.', show: 'm.2' },
        { say: 'So x is 0 or 3. But we are not done.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Check each root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 3: \\ \\sqrt{4} - 3 + 1 = 2 - 2 = 0 \\ \\checkmark', 'x = 0: \\ \\sqrt{1} - 0 + 1 = 2 \\ne 0 \\ \\times', '\\good{x = 3}'] }],
      lines: [
        { say: 'Step three. Check x equals 3 in the original equation. Root 4 is 2, and 2 minus 3 plus 1 is 0. It works.', show: 'm.0' },
        { say: 'Check x equals 0. Root 1 is 1, and 1 minus 0 plus 1 is 2, not 0. So 0 is extraneous.', show: 'm.1' },
        { say: 'So the only solution is x equals 3. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graphs meet **once**, at $(3, 2)$. At $x = 0$ the two sides are $1$ and $-1$: opposites, which only **squaring** makes equal.' }],
      lines: [
        { say: 'Let us see it on a graph. Here is y equals root x plus 1, and y equals x minus 1.', show: ['gr.grid', 'gr.axes', 'gr.root', 'gr.line'] },
        { say: 'They cross only once, at the point at 3, 2. So x equals 3 is the only solution.', show: 'gr.P', focus: 'gr.P' },
        { say: 'At x equals 0, the curve is at 1 and the line is at negative 1. They are opposites, not equal. Squaring both gives 1, which is how the fake root crept in.', show: ['gr.fake', 't'], focus: 'gr.fake' },
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
            ['squaring before isolating', 'the root is still there after squaring'],
            ['$(x - 1)^2 = x^2 + 1$', 'the square of a binomial has a **middle term**, $-2x$'],
            ['$x = 0$ or $x = 3$', '$0$ fails the **check**: it is extraneous'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Isolate the root first. If you square the whole left side as it is, the root is still there afterwards.' },
        { say: 'x minus 1, squared, is not x squared plus 1. It has a middle term, negative 2 x.' },
        { say: 'And do not give both roots. 0 fails the check, so it is not a solution.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $\\sqrt{x + 2} = x$.',
          choices: ['$x = 2$ or $x = -1$', '$x = -1$', '$x = 2$', 'no solution'],
          answer: 2,
          working: '$x + 2 = x^2$, so $x^2 - x - 2 = (x - 2)(x + 1) = 0$. At $x = -1$: $\\sqrt{1} = 1$ but the right side is $-1$, so $-1$ is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve root x plus 2 equals x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The root is already alone, so square both sides: x plus 2 equals x squared. So x squared minus x minus 2 equals 0, which factors as x minus 2, times x plus 1. So x is 2 or negative 1. Check: at 2, root 4 is 2, which works. At negative 1, root 1 is 1, not negative 1. So only x equals 2 works: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Isolate** the root first', '**Square** both sides, with the middle term', 'Solve the equation that appears', '**Check** every root in the original equation'] }],
      lines: [
        { say: 'Here is what to remember. Isolate the root first.', show: 'sum.0' },
        { say: 'Square both sides, and remember the middle term.', show: 'sum.1' },
        { say: 'Solve the equation that appears.', show: 'sum.2' },
        { say: 'And check every root in the original equation, to throw out any extraneous ones. For more on radical equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
