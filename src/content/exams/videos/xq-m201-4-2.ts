import type { DiagramEl, Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 4.2 (solving quadratic equations, roots and graphs): a garden
// 10 feet longer than it is wide, with an area of 119 ft². The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 2.5, Quadratic Equations, CC BY-NC-SA 4.0),
// whose answer key gives x(x + 10) = 119 and 7 ft and 17 ft: x² + 10x − 119 = (x + 17)(x − 7).

/** The garden drawn to scale, 17 by 7; `solved` labels the sides with their lengths. */
const garden = (height = 260, solved = false): DiagramEl => ({
  kind: 'diagram',
  id: 'gd',
  height,
  points: { A: [0, 0], B: [17, 0], C: [17, 7], D: [0, 7], M: [8.5, 3.5] },
  items: [
    { kind: 'region', id: 'grass', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.15 },
    { kind: 'label', id: 'area', at: 'M', tex: '119\\text{ ft}^2', place: 'center', tone: 'good' },
    { kind: 'line', id: 'len', from: 'D', to: 'C', tone: 'adj', weight: 5, label: solved ? '17\\text{ ft}' : 'x + 10', labelSide: 'left' },
    { kind: 'line', id: 'bot', from: 'A', to: 'B', tone: 'adj', weight: 5 },
    { kind: 'line', id: 'wid', from: 'A', to: 'D', tone: 'hyp', weight: 5, label: solved ? '7\\text{ ft}' : 'x', labelSide: 'left' },
    { kind: 'line', id: 'rgt', from: 'B', to: 'C', tone: 'hyp', weight: 5 },
  ],
});

const g = plane({ x: [-20, 10], y: [-150, 50], xStep: 5, yStep: 50, every: 1, width: 9, height: 6 });

/** y = x² + 10x − 119, crossing the x-axis at −17 and 7. */
const roots = () =>
  figure(
    'rt',
    [
      g,
      plot(g, { id: 'curve', f: (x) => x ** 2 + 10 * x - 119, tone: 'brand' }),
      dots(g, [
        { id: 'r1', x: -17, y: 0, tex: '-17', tone: 'bad', place: 'above left' },
        { id: 'r2', x: 7, y: 0, tex: '7', tone: 'good', place: 'above right' },
      ]),
    ],
    400,
  );

const QUESTION =
  'A person has a garden that has a length 10 feet longer than the width. Set up a quadratic equation to find the dimensions of the garden if its area is 119 ft.². Solve the quadratic equation to find the length and width.';

const video: Explainer = {
  id: 'xq-m201-4-2',
  lessonId: '',
  exam: {
    lesson: 'm201-4-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 2.5, Quadratic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: A Garden 10 Feet Longer Than It Is Wide (Solving Quadratic Equations)',
  thumbnailTitle: 'The 119 ft² Garden',
  thumbnail: 'gd',
  summary:
    'A real test question, solved one small step at a time: a garden is 10 feet longer than it is wide, and its area is 119 square feet. We set up x(x + 10) = 119, rearrange it to x² + 10x − 119 = 0, factor it as (x + 17)(x − 7) = 0, and keep the positive root: the garden is 7 feet by 17 feet. Then we check with the graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The 119 ft² Garden', subtitle: 'Solving quadratic equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving quadratic equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A person has a garden that has a length $10$ feet longer than the width. Set up a quadratic equation to find the dimensions of the garden if its area is $119$ ft.². Solve the quadratic equation to find the length and width.',
          answer: '$x(x + 10) = 119$; the width is $7$ ft and the length is $17$ ft',
          working: '$x^2 + 10x - 119 = 0$, so $(x + 17)(x - 7) = 0$ and $x = 7$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A person has a garden that has a length 10 feet longer than the width. Set up a quadratic equation to find the dimensions of the garden if its area is 119 square feet. Solve the quadratic equation to find the length and width.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        garden(280),
        { kind: 'text', id: 't', size: 'md', md: 'Call the width $x$. Then the length is $x + 10$, and **width times length** is the area, $119$.' },
      ],
      lines: [
        { say: 'Let us draw the garden. We do not know the width, so call it x.', show: ['gd', 'gd.wid'], focus: 'gd.wid' },
        { say: 'The length is 10 feet more, so it is x plus 10.', show: 'gd.len', focus: 'gd.len' },
        { say: 'Width times length is the area, 119 square feet. That gives us an equation to solve.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'std', tone: 'definition', title: 'Solving by factoring', md: 'Rearrange to $ax^2 + bx + c = 0$, **factor**, and set each factor to $0$. The solutions are the **roots**.' },
        { kind: 'callout', id: 'gr', tone: 'key', title: 'Roots and graphs', md: 'The roots of $ax^2 + bx + c = 0$ are the $x$-intercepts of the graph of $y = ax^2 + bx + c$.' },
      ],
      lines: [
        { say: 'Here is what we need. To solve a quadratic equation by factoring, first rearrange it so one side is 0. Then factor, and set each factor equal to 0. The solutions are called the roots.', show: 'std' },
        { say: 'The roots are also where the graph of the quadratic function crosses the x axis, its x-intercepts.', show: 'gr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Set up** the equation from the area', 'Rearrange so one side is $0$, and **factor**', 'Keep the root that makes **sense**'] }],
      lines: [
        { say: 'Here is the plan. First, set up the equation from the area.', show: 'plan.0' },
        { say: 'Second, rearrange it so one side is 0, and factor.', show: 'plan.1' },
        { say: 'Third, keep only the root that makes sense for a garden.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Set up the equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x(x + 10) = 119', 'x^2 + 10x = 119', 'x^2 + 10x - 119 = 0'] }],
      lines: [
        { say: 'Step one. Width times length is the area: x times x plus 10 equals 119. That is the quadratic equation the question asks us to set up.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply out the bracket: x squared plus 10 x equals 119.', show: 'm.1' },
        { say: 'Take 119 away from both sides, so one side is 0.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Factor and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17 \\times (-7) = -119, \\quad 17 + (-7) = 10', '(x + 17)(x - 7) = 0', 'x = -17 \\quad \\text{or} \\quad x = 7'] }],
      lines: [
        { say: 'Step two. We need two numbers that multiply to negative 119 and add to 10. 119 is 7 times 17, so try 17 and negative 7: they multiply to negative 119 and add to 10.', show: 'm.0' },
        { say: 'So the equation factors as x plus 17, times x minus 7, equals 0.', show: 'm.1' },
        { say: 'Set each factor to 0: x is negative 17, or x is 7.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Keep the root that makes sense',
      layout: 'split',
      left: [garden(260, true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = -17: \\ \\text{rejected}', 'x = 7: \\ \\text{width } \\good{7 \\text{ ft}}', '\\text{length } 7 + 10 = \\good{17 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. A width cannot be negative, so we reject x equals negative 17.', show: 'm.0' },
        { say: 'So x is 7: the width is 7 feet.', show: 'm.1' },
        { say: 'The length is 7 plus 10, which is 17 feet. The garden is 7 feet wide and 17 feet long. That is the answer.', show: ['gd', 'gd.wid', 'gd.len', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [roots()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['7 \\times 17 = 119 \\ \\checkmark', '17 - 7 = 10 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 7 times 17 is 119, and 17 is 10 more than 7. Both facts fit.', show: ['m.0', 'm.1'] },
        { say: 'And here is the graph of y equals x squared plus 10 x minus 119. It crosses the x axis at exactly the two roots, negative 17 and 7. Only the positive one can be a width.', show: ['rt.grid', 'rt.axes', 'rt.curve', 'rt.r1', 'rt.r2'], focus: 'rt.r2' },
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
            ['$x(x + 10) = 119$, so $x = 119$ or $x + 10 = 119$', 'the zero product property needs a **zero** on one side'],
            ['$x = -17$', 'a garden cannot be $-17$ feet wide'],
            ['only "$7$ ft"', 'the question asks for the length **and** the width'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot set each factor equal to 119. The zero product property only works when the product is 0, so move the 119 across first.' },
        { say: 'Negative 17 solves the equation, but a garden cannot be negative 17 feet wide. Reject it.' },
        { say: 'And give both dimensions: the width, 7 feet, and the length, 17 feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangle is $3$ m longer than it is wide, and its area is $40$ m². What are its dimensions?',
          choices: ['$5$ m by $8$ m', '$8$ m by $11$ m', '$4$ m by $10$ m', '$-8$ m by $-5$ m'],
          answer: 0,
          working: '$w(w + 3) = 40$, so $w^2 + 3w - 40 = (w + 8)(w - 5) = 0$ and $w = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is 3 metres longer than it is wide, and its area is 40 square metres. What are its dimensions? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'w times w plus 3 is 40, so w squared plus 3 w minus 40 equals 0. That factors as w plus 8, times w minus 5, so w is 5. The rectangle is 5 metres by 8 metres, choice A. C has the right area but is 6 metres longer, not 3, and D keeps the negative root.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Name the unknown and **draw** it', 'Rearrange so one side is $0$, then **factor**', 'Roots are the **$x$-intercepts** of the graph', 'Reject roots that do not make sense'] }],
      lines: [
        { say: 'Here is what to remember. Name the unknown, and draw a picture.', show: 'sum.0' },
        { say: 'Rearrange so one side is 0, then factor.', show: 'sum.1' },
        { say: 'The roots are the x-intercepts of the graph.', show: 'sum.2' },
        { say: 'And reject any root that does not make sense, like a negative length. For more on solving quadratic equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
