import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pasture } from './lib/m31-7-figures.ts';
import { commas, dots, numbers, plane, plot, tag, tangent } from './lib/m31-8-graphs.ts';

// 600 m of fence on three sides of a field beside a river: A(x) = 600x − 2x², largest at x = 150.
const field = () => figure('f', [pasture({ w: 6, h: 3, labels: { x: 'x', y: 'y' } })], 300);

const g = plane({ x: [0, 300], y: [0, 50000], xStep: 50, yStep: 10000, every: 0, width: 9, height: 5.4, titles: { y: 'A' } });
const areaGraph = figure('ag', [
  g,
  numbers(g, 50, 10000, { yTex: commas }),
  plot(g, { id: 'A', f: (x) => 600 * x - 2 * x * x, samples: 160 }),
  tangent(g, { id: 'flat', x: 150, y: 45000, m: 0, len: 90 }),
  dots(g, [{ id: 'top', x: 150, y: 45000, tex: '(150,\\ 45{,}000)', tone: 'theta', place: 'above' }]),
  tag(g, 'name', 150, 17000, 'A(x) = 600x - 2x^2', 'center', 'brand'),
]);

const video: Explainer = {
  id: 'm31-7-1',
  lessonId: 'm31-7-1',
  title: 'Optimization, Part 1: The Strategy and a Fence by a River',
  thumbnailTitle: 'Optimization: A Fence by a River',
  thumbnail: 'ag',
  summary: 'Optimization finds the largest or smallest value of a quantity: write the objective function, use the constraint to reduce it to one variable, state the domain, then find and verify the critical number. With 600 m of fence on three sides of a field beside a river, A(x) = 600x − 2x² is largest at x = 150, a field 150 m by 300 m with an area of 45,000 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 1', title: 'Optimization', subtitle: 'The strategy, and a fence by a river' }],
      lines: [
        { say: 'How should a farmer lay out a fence to enclose the most land? How should a can be shaped to use the least metal? What price brings in the most money?', show: 'title' },
        { say: 'Each question asks for the best value of something: the largest area, the least material, the most revenue. Calculus finds these best values exactly. This is called optimization.' },
        { say: 'In this video, you will learn a step-by-step strategy for optimization problems, and use it to design the largest field you can fence beside a river.' },
      ],
    },
    {
      chapter: 'Try a few',
      layout: 'split',
      leftWidth: 520,
      left: [field()],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Rashid has $600$ m of fencing for a rectangular field beside a straight river. No fence is needed along the river.' },
        {
          kind: 'table',
          id: 't',
          head: ['$x\\ (\\text{m})$', '$y\\ (\\text{m})$', 'Area $(\\text{m}^2)$'],
          rows: [
            ['$50$', '$500$', '$25{,}000$'],
            ['$100$', '$400$', '$40{,}000$'],
            ['$150$', '$300$', '$45{,}000$'],
            ['$200$', '$200$', '$40{,}000$'],
            ['$250$', '$100$', '$25{,}000$'],
          ],
        },
      ],
      lines: [
        { say: 'Rashid has 600 metres of fencing to enclose a rectangular field beside a straight river. No fence is needed along the river. What shape gives the largest area?', show: ['f.river', 'f.field', 'p'] },
        { say: 'Call each side that runs away from the river x, and the side along the river y. The fence covers x, plus y, plus x.', show: 'f.fence', focus: 'f.fence' },
        { say: 'Try a few. If each short side is 50 metres, the long side gets the other 500 metres, and the area is 50 times 500: 25,000 square metres.', show: 't.0', focus: 't.0' },
        { say: 'Short sides of 100 give 40,000 square metres, and short sides of 150 give 45,000.', show: ['t.1', 't.2'], focus: 't.2' },
        { say: 'But then the area falls again: 40,000 for 200, and 25,000 for 250. So the best shape is somewhere in the middle. Calculus will find exactly where, without guessing.', show: ['t.3', 't.4'], focus: 't' },
      ],
    },
    {
      chapter: 'Objective and constraint',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Objective function and constraint', md: 'The **objective function** is the quantity to make as large or as small as possible. A **constraint** is a condition the variables must satisfy, such as a fixed length of fence. The constraint lets you write the objective with **one** variable.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{objective: } A = xy', '\\text{constraint: } 2x + y = 600'] },
      ],
      lines: [
        { say: 'Every optimization problem has two ingredients. The objective function is the quantity you want to make as large or as small as possible.', show: 'def' },
        { say: 'Here, the objective is the area of the field: "A" equals x times y.', show: 'm.0', focus: 'm.0' },
        { say: 'A constraint is a condition the variables must satisfy. Here, the fence is 600 metres long, so two x plus y equals 600.', show: 'm.1', focus: 'm.1' },
        { say: 'The objective has two variables, x and y. The constraint links them, so we can write the area with one variable. Then it is a function we know how to differentiate.' },
      ],
    },
    {
      chapter: 'A strategy',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Draw a diagram and label the quantities with variables.',
            'Write the objective function.',
            'Use the constraint to write it with **one** variable.',
            'State the domain: the values that make sense.',
            'Find the critical numbers in the domain.',
            'Verify that you have a maximum or a minimum.',
            'Answer the question that was asked, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a strategy that works for every optimization problem. First, draw a diagram and label the quantities with variables.', show: 'steps.0' },
        { say: 'Second, write the objective function. Third, use the constraint to rewrite it as a function of one variable.', show: ['steps.1', 'steps.2'] },
        { say: 'Fourth, state the domain: the values of the variable that make sense in the problem. Fifth, find the critical numbers in the domain, where the derivative is zero.', show: ['steps.3', 'steps.4'] },
        { say: 'Sixth, verify that you really have a maximum or a minimum. And seventh, answer the question that was asked, with units.', show: ['steps.5', 'steps.6'] },
      ],
    },
    {
      chapter: 'One variable',
      layout: 'split',
      leftWidth: 520,
      left: [field()],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2x + y = 600 \\;\\Rightarrow\\; y = 600 - 2x', 'A(x) = x(600 - 2x)', 'A(x) = 600x - 2x^2', '0 < x < 300'] },
      ],
      lines: [
        { say: 'Back to the field. The diagram is drawn, and the objective is "A" equals x y. Now use the constraint. Two x plus y equals 600, so y equals 600 minus two x.', show: ['f', 'm.0'], focus: ['f.top', 'm.0'] },
        { say: 'Put that into the area. "A" of x equals x times, 600 minus two x.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply out: "A" of x equals 600 x, minus two x squared. Now the area depends on x alone.', show: 'm.2', focus: 'm.2' },
        { say: 'What is the domain? Both sides must be positive. x must be more than zero, and y, which is 600 minus two x, must be more than zero as well, so x is less than 300.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Find the maximum',
      layout: 'split',
      leftWidth: 600,
      left: [areaGraph],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A'(x) = 600 - 4x = 0", 'x = 150', "A''(x) = -4 < 0"] },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'The graph is a parabola opening down, so $x = 150$ gives the **maximum**.' },
      ],
      lines: [
        { say: 'Here is the graph of the area. It rises, reaches a peak, and falls. At the peak, the graph is flat: its slope, the derivative, is zero.', show: ['ag.grid', 'ag.axes', 'ag.A', 'ag.name'], focus: 'ag.A' },
        { say: 'So differentiate. "A" prime of x equals 600 minus four x. Set it equal to zero, and x equals 150. That is the only critical number, and it is in the domain.', show: ['m.0', 'm.1', 'ag.flat', 'ag.top'], focus: ['m.1', 'ag.flat'] },
        { say: 'Now verify that it is a maximum. The second derivative, "A" double prime of x, is negative four, which is negative for every x. The graph is concave down everywhere, so the critical number gives the largest area.', show: ['m.2', 't'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Answer the question',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 600 - 2(150) = 300', 'A = 150 \\times 300 = 45{,}000'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'The field should be $150$ m by $300$ m, with the long side along the river. Its area is $45{,}000$ m².' },
      ],
      lines: [
        { say: 'The question asked for the dimensions, so find y as well. y equals 600 minus two times 150, which is 300.', show: 'm.0', focus: 'm.0' },
        { say: 'The largest area is 150 times 300: 45,000 square metres, the best value from our table.', show: 'm.1', focus: 'm.1' },
        { say: 'Answer in words, with units. The field should be 150 metres by 300 metres, with the long side along the river.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'There is $240$ m of fencing for a rectangular field beside a straight river, with no fence along the river. What is the largest area it can enclose?',
          choices: ['$3{,}600$ m²', '$7{,}200$ m²', '$14{,}400$ m²', '$6{,}400$ m²'],
          answer: 1,
          working: '$2x + y = 240$, so $A(x) = x(240 - 2x) = 240x - 2x^2$. $A\'(x) = 240 - 4x = 0$ gives $x = 60$, so $y = 120$ and $A = 60 \\times 120 = 7{,}200$ m².',
        },
      ],
      lines: [
        { say: 'Your turn. There is 240 metres of fencing for a rectangular field beside a straight river, with no fence along the river. What is the largest area it can enclose? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The constraint is two x plus y equals 240, so the area is x times, 240 minus two x. Its derivative, 240 minus four x, is zero when x is 60. Then y is 120, and the area is 7,200 square metres.', show: 'q.answer' },
        { say: 'Choice A, 3,600, is the best area if the fence ran along all four sides: a square, 60 metres on each side. The river saves a whole side of fence.' },
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
            'The objective function is the quantity to maximize or minimize.',
            'Use the constraint to write it with one variable, and state the domain.',
            'Find the critical numbers, then verify the maximum or minimum.',
            'Answer the question that was asked, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The objective function is the quantity you want to make as large or as small as possible.', show: 'sum.0' },
        { say: 'Use the constraint to write it with one variable, and state its domain.', show: 'sum.1' },
        { say: 'Find the critical numbers in the domain, then verify that you have a maximum or a minimum.', show: 'sum.2' },
        { say: 'And answer the question that was asked, with units. In the next part, we look at three ways to verify a maximum, and fold the largest box from a sheet of cardboard. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
