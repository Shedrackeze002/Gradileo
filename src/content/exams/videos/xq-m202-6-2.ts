import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 6.2 (properties of quadratic functions). The question is an
// exercise from OpenStax Intermediate Algebra 2e, word for word (section 9.6, Graph Quadratic
// Functions Using Properties, CC BY-NC-SA 4.0), with its set's instruction to round to the nearest
// tenth. For h(t) = −16t² + 109t, the axis of symmetry is t = −109 ÷ (2 × −16) = 3.40625 (also
// halfway between the zeros 0 and 6.8125), and h(3.40625) = 185.640625, so the ball reaches its
// maximum height of about 185.6 ft after about 3.4 s, as in the book's answer.

const T = 109 / 32;
const H = (t: number) => -16 * t * t + 109 * t;

const g = plane({ x: [0, 7.5], y: [0, 240], xStep: 1, yStep: 40, width: 9, height: 6, titles: { x: 't \\text{ (s)}', y: 'h \\text{ (ft)}' } });

/** The height graph, its zeros (group `zeros`), the axis of symmetry and the highest point. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'curve', f: H, from: 0, to: 109 / 16, tone: 'adj' }),
      polyline(g, { id: 'ax', points: [[T, 0], [T, 240]], tone: 'opp', dashed: true, labels: ['t \\approx 3.4'], sides: ['right'] }),
      dots(g, [
        { id: 'z0', x: 0, y: 0, tone: 'theta', group: 'zeros' },
        { id: 'z1', x: 109 / 16, y: 0, tex: '6.8125', tone: 'theta', place: 'above right', group: 'zeros' },
      ]),
      dots(g, [{ id: 'top', x: T, y: H(T), tex: '(3.4, \\ 185.6)', tone: 'good', place: 'above right' }]),
    ],
    460,
  );

const QUESTION =
  'Round answers to the nearest tenth. A ball is thrown vertically upward from the ground with an initial velocity of 109 ft/sec. Use the quadratic function h(t) = −16t² + 109t + 0 to find how long it will take for the ball to reach its maximum height, and then find the maximum height.';

const video: Explainer = {
  id: 'xq-m202-6-2',
  lessonId: '',
  exam: {
    lesson: 'm202-6-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 9.6, Graph Quadratic Functions Using Properties',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/9-6-graph-quadratic-functions-using-properties',
    question: QUESTION,
  },
  title: 'Exam Question: The Maximum Height of a Ball, h(t) = −16t² + 109t (Properties of Quadratic Functions)',
  thumbnailTitle: 'The Maximum Height of a Ball',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: a ball is thrown upward, and its height is h(t) = −16t² + 109t. When does it reach its maximum height, and what is that height? The maximum is at the vertex, on the axis of symmetry t = −b ÷ 2a = 3.40625, so the ball reaches about 185.6 feet after about 3.4 seconds. Then we check with the zeros and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Maximum Height of a Ball', subtitle: 'Properties of quadratic functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the properties of quadratic functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Round answers to the nearest tenth. A ball is thrown vertically upward from the ground with an initial velocity of $109$ ft/sec. Use the quadratic function $h(t) = -16t^2 + 109t + 0$ to find how long it will take for the ball to reach its maximum height, and then find the maximum height.',
          answer: 'about $3.4$ seconds; about $185.6$ feet',
          working: '$t = -\\dfrac{109}{2(-16)} = 3.40625$, and $h(3.40625) = 185.640625$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises. Round answers to the nearest tenth.', show: 'q' },
        { say: 'A ball is thrown vertically upward from the ground with an initial velocity of 109 feet per second. Use the quadratic function h of t equals negative 16 t squared, plus 109 t, plus 0, to find how long it will take for the ball to reach its maximum height, and then find the maximum height.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$h(t)$ is the ball\'s height in feet, $t$ seconds after it is thrown. We need **two** answers: **when** the ball is highest, and **how high** it gets.' }],
      lines: [
        { say: 'h of t is the height of the ball in feet, t seconds after it is thrown. We need two answers: when the ball is at its highest, and how high that is.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'max', tone: 'key', title: 'Maximum at the vertex', md: 'When $a < 0$ the parabola opens **down**, so its vertex is the **highest** point.' },
        { kind: 'callout', id: 'axis', tone: 'definition', title: 'The axis of symmetry', md: 'For $y = ax^2 + bx + c$, the axis is $x = -\\dfrac{b}{2a}$. It is also halfway between the zeros.' },
      ],
      lines: [
        { say: 'Here is what we need. When the number in front of the squared term is negative, the parabola opens down, so its vertex is the highest point. That is the maximum.', show: 'max' },
        { say: 'The vertex is on the axis of symmetry. For "a" x squared plus b x plus c, the axis is x equals negative b over 2 "a". It is also halfway between the zeros.', show: 'axis' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $a$ and $b$', 'Find the **time** on the axis of symmetry', 'Substitute it to find the **height**'] }],
      lines: [
        { say: 'Here is the plan. First, read "a" and b from the function.', show: 'plan.0' },
        { say: 'Second, find the time of the maximum, on the axis of symmetry.', show: 'plan.1' },
        { say: 'Third, put that time into the function to find the maximum height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read a and b',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['h(t) = -16t^2 + 109t + 0', 'a = -16, \\quad b = 109, \\quad c = 0'] }],
      lines: [
        { say: 'Step one. Here is the function.', show: 'm.0' },
        { say: '"a" is negative 16, b is 109, and c is 0. "a" is negative, so the parabola opens down and has a maximum.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = -\\dfrac{b}{2a} = -\\dfrac{109}{2(-16)}', 't = \\dfrac{109}{32} = 3.40625', 't \\approx \\good{3.4 \\text{ s}}'] }],
      lines: [
        { say: 'Step two. The time of the maximum is negative b over 2 "a": negative 109 over 2 times negative 16.', show: 'm.0' },
        { say: 'The two negatives cancel, so t is 109 over 32, which is 3.40625.', show: 'm.1' },
        { say: 'To the nearest tenth, the ball reaches its maximum height after about 3.4 seconds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The height',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['h(3.40625) = -16(3.40625)^2 + 109(3.40625)', '= -185.640625 + 371.28125', '= 185.640625 \\approx \\good{185.6 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Put t equals 3.40625 into the function. Use the exact time, not the rounded one.', show: 'm.0' },
        { say: 'Negative 16 times 3.40625 squared is negative 185.640625, and 109 times 3.40625 is 371.28125.', show: 'm.1' },
        { say: 'Together that is 185.640625, so the maximum height is about 185.6 feet. The ball takes about 3.4 seconds to reach a maximum height of about 185.6 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 760,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['t(-16t + 109) = 0', 't = 0, \\ 6.8125', '\\text{halfway: } 3.40625 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the zeros. The ball is on the ground when h is 0. Factor out t: t times negative 16 t plus 109.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'm.0'] },
        { say: 'So h is 0 at t equals 0, when the ball is thrown, and at t equals 6.8125, when it lands.', show: ['gr.zeros', 'm.1'], focus: 'gr.zeros' },
        { say: 'The axis of symmetry is halfway between them, at 3.40625. That matches, and the top of the graph is at about 185.6 feet.', show: ['gr.ax', 'gr.top', 'm.2'], focus: 'gr.top' },
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
            ['$t = -3.4$', '$-\\dfrac{109}{2(-16)}$: the two negatives make it **positive**'],
            ['only $3.4$ s', 'the question asks for the **maximum height** too'],
            ['$h = 109$ ft', '$109$ is the starting **speed**, not a height'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Watch the signs. "a" is negative, so negative b over 2 "a" is positive: 3.4 seconds, not negative 3.4.' },
        { say: 'Give both answers. The question asks for the time and the maximum height.' },
        { say: 'And 109 is the speed the ball starts with, in feet per second. It is not the height.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ball\'s height is $h(t) = -5t^2 + 20t$, in metres after $t$ seconds. What is its maximum height?',
          choices: ['$2$ m', '$40$ m', '$4$ m', '$20$ m'],
          answer: 3,
          working: '$t = -\\dfrac{20}{2(-5)} = 2$, and $h(2) = -20 + 40 = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball\'s height is h of t equals negative 5 t squared plus 20 t, in metres after t seconds. What is its maximum height? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The time is negative 20 over 2 times negative 5, which is 2 seconds. h of 2 is negative 20 plus 40, which is 20 metres: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a < 0$: the vertex is a **maximum**', 'Axis of symmetry: $x = -\\dfrac{b}{2a}$', 'Or halfway between the **zeros**', 'Substitute to find the maximum **value**'] }],
      lines: [
        { say: 'Here is what to remember. When "a" is negative, the vertex is a maximum.', show: 'sum.0' },
        { say: 'The axis of symmetry is x equals negative b over 2 "a".', show: 'sum.1' },
        { say: 'It is also halfway between the zeros.', show: 'sum.2' },
        { say: 'And substitute the vertex\'s x-value to find the maximum value. For more on the properties of quadratic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
