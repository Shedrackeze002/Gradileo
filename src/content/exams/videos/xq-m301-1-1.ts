import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 1.1 (horizontal and vertical translations). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 3.5, Transformation of
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. Down 3 subtracts 3
// outside the absolute value, and right 1 replaces x with x − 1 inside, so g(x) = |x − 1| − 3, as
// in the book's answer. The vertex moves from (0, 0) to (1, −3).

const g = plane({ x: [-4.5, 5.5], y: [-4.5, 4.5], every: 2, width: 10, height: 9 });

/** y = |x| (`f`, dashed), y = |x − 1| − 3 (`g`) and their vertices (`v0` and `v1`). */
const graph = (height = 440, moved = true) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'f', points: [[-4.5, 4.5], [0, 0], [4.5, 4.5]], tone: 'adj', dashed: true }),
      ...(moved ? [polyline(g, { id: 'g', points: [[-3.5, 1.5], [1, -3], [5.5, 1.5]], tone: 'good' })] : []),
      dots(g, [
        { id: 'v0', x: 0, y: 0, tex: '(0, 0)', tone: 'adj', place: 'above' },
        ...(moved ? [{ id: 'v1', x: 1, y: -3, tex: '(1, -3)', tone: 'good' as const, place: 'right' as const }] : []),
      ]),
    ],
    height,
  );

const QUESTION = 'Write a formula for the function obtained when the graph is shifted as described. f(x) = |x| is shifted down 3 units and to the right 1 unit.';

const video: Explainer = {
  id: 'xq-m301-1-1',
  lessonId: '',
  exam: {
    lesson: 'm301-1-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.5, Transformation of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-5-transformation-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Shift |x| Down 3 and Right 1 (Horizontal and Vertical Translations)',
  thumbnailTitle: 'Shift |x| Down 3, Right 1',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: f(x) = |x| is shifted down 3 units and to the right 1 unit. What is the new formula? A vertical shift goes outside the function, and a horizontal shift goes inside with the opposite sign, so g(x) = |x − 1| − 3. Then we check with the vertex on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Shift |x| Down 3, Right 1', subtitle: 'Horizontal and vertical translations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about translating a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write a formula for the function obtained when the graph is shifted as described. $f(x) = |x|$ is shifted down $3$ units and to the right $1$ unit.',
          answer: '$g(x) = |x - 1| - 3$',
          working: 'Down $3$: subtract $3$ outside. Right $1$: replace $x$ with $x - 1$ inside.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Write a formula for the function obtained when the graph is shifted as described. f of x equals the absolute value of x is shifted down 3 units and to the right 1 unit.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(400, false), { kind: 'text', id: 't', size: 'md', md: 'Slide the **whole** V-shape: $3$ down and $1$ right. Then write the formula of the moved graph.' }],
      lines: [
        { say: 'Here is the graph of y equals the absolute value of x: a V-shape with its point at the origin.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0'] },
        { say: 'We slide the whole V down 3 and right 1, without changing its shape, and write a formula for the new graph.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Translations', md: '$y = f(x - h) + k$ is the graph of $y = f(x)$ moved $h$ units **right** and $k$ units **up**.' },
        { kind: 'callout', id: 'sign', tone: 'tip', title: 'Inside is opposite', md: 'A vertical shift goes **outside** with its own sign. A horizontal shift goes **inside**, with the **opposite** sign: right $1$ is $x - 1$.' },
      ],
      lines: [
        { say: 'Here is what we need. y equals f of x minus h, plus k, is the graph of f moved h units right and k units up.', show: 'rule' },
        { say: 'A vertical shift goes outside the function, with its own sign. A horizontal shift goes inside, next to x, with the opposite sign. So right 1 is x minus 1.', show: 'sign' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Down** $3$: subtract $3$ outside', '**Right** $1$: replace $x$ with $x - 1$ inside', '**Check** where the vertex goes'] }],
      lines: [
        { say: 'Here is the plan. First, down 3: subtract 3 outside the absolute value.', show: 'plan.0' },
        { say: 'Second, right 1: replace x with x minus 1 inside.', show: 'plan.1' },
        { say: 'Third, check where the point of the V goes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Down 3',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = |x|', '\\text{down } 3: \\quad y = |x| \\good{- 3}'] }],
      lines: [
        { say: 'Step one. Start with y equals the absolute value of x.', show: 'm.0' },
        { say: 'Down 3 lowers every y-value by 3, so subtract 3 from the whole function: absolute value of x, minus 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Right 1',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{right } 1: \\quad x \\to x - 1', 'g(x) = |\\good{x - 1}| - 3'] }],
      lines: [
        { say: 'Step two. Right 1 means the old point at x equals 0 now happens at x equals 1. So replace x with x minus 1, which is 0 when x is 1.', show: 'm.0' },
        { say: 'That gives g of x equals the absolute value of x minus 1, minus 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(440), { kind: 'math', id: 'm', size: 'md', lines: ['g(1) = |1 - 1| - 3 = {-3} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. The original V has its point at the origin.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0'] },
        { say: 'The new V has the same shape, with its point at 1, negative 3: 1 right and 3 down.', show: ['gr.g', 'gr.v1'], focus: 'gr.v1' },
        { say: 'And g of 1 is the absolute value of 0, minus 3, which is negative 3. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$|x + 1| - 3$', 'right $1$ is $x - 1$: inside, the sign is **opposite**'],
            ['$|x - 3| - 1$', 'down goes **outside**, right goes **inside**'],
            ['$|x - 1| + 3$', 'down means **subtract** $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x plus 1 moves the graph left, not right. Inside the function, the sign is the opposite of the direction.' },
        { say: 'Do not swap the numbers. The 3 is a vertical shift, so it goes outside. The 1 is horizontal, so it goes inside.' },
        { say: 'And down means subtract. Plus 3 would move the graph up.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The graph of $f(x) = x^2$ is shifted up $2$ units and to the left $5$ units. Which formula gives the new graph?',
          choices: ['$(x - 5)^2 + 2$', '$(x + 5)^2 + 2$', '$(x + 2)^2 + 5$', '$(x + 5)^2 - 2$'],
          answer: 1,
          working: 'Up $2$: $+2$ outside. Left $5$: $x \\to x + 5$ inside. So $(x + 5)^2 + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of f of x equals x squared is shifted up 2 units and to the left 5 units. Which formula gives the new graph? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Up 2 is plus 2 outside. Left 5 is x plus 5 inside, the opposite sign. So it is x plus 5, all squared, plus 2: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = f(x - h) + k$: right $h$, up $k$', 'Vertical shifts go **outside**', 'Horizontal shifts go **inside**, opposite sign', 'Check by following one point, like the vertex'] }],
      lines: [
        { say: 'Here is what to remember. y equals f of x minus h, plus k, moves a graph h right and k up.', show: 'sum.0' },
        { say: 'Vertical shifts go outside the function.', show: 'sum.1' },
        { say: 'Horizontal shifts go inside, with the opposite sign.', show: 'sum.2' },
        { say: 'And check by following one point, like the vertex. For more on translations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
