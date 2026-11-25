import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { turnArrow } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { cart, triangle } from '@/content/math6/videos/lib/m6-8-figures.ts';

// Exam question for Math 6 lesson 8.3 (rotations). The free OpenStax books have no question like
// this at this level, so this one is written by Gradileo in the style of a Grade 6 mathematics unit
// test. Triangle P(2, 1), Q(5, 1), R(2, 3), turned about its vertex P. From P, Q is 3 right and R is
// 2 up. (a) A quarter turn counter-clockwise turns right into up and up into left: Q′(2, 4),
// R′(0, 1). (b) A half turn turns right into left and up into down: Q′(−1, 1), R′(2, −1).

const QUESTION =
  'Triangle PQR has vertices P(2, 1), Q(5, 1) and R(2, 3). (a) Rotate the triangle a quarter turn counter-clockwise about P. Give the coordinates of Q′ and R′. (b) Instead, rotate triangle PQR a half turn about P. Give the coordinates of Q′ and R′.';

type P = [number, number];
const PQR: P[] = [
  [2, 1],
  [5, 1],
  [2, 3],
];
const QUARTER: P[] = [
  [2, 1],
  [2, 4],
  [0, 1],
];
const HALF: P[] = [
  [2, 1],
  [-1, 1],
  [2, -1],
];

const g = cart({ x: [-2, 6], y: [-2, 5] });

const tri = () => triangle(g, { id: 't', corners: PQR, names: ['P', 'Q', 'R'], places: ['below', 'below right', 'above right'] });
const start = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];
const image = (id: string) => [`${id}.i`, `${id}.i-fill`, `${id}.i-1`, `${id}.i-2`];

const quarter = (id: string) =>
  figure(id, [
    g,
    tri(),
    turnArrow({ id: 'turn', c: g.map(2, 1), r: 0.9, from: 10, to: 80, tone: 'theta' }),
    move(g, 'pq', [2, 1], [5, 1], { label: '3\\text{ right}', side: 'right', tone: 'adj' }),
    move(g, 'pq2', [2, 1], [2, 4], { tone: 'adj' }),
    move(g, 'pr2', [2, 1], [0, 1], { tone: 'opp' }),
    triangle(g, { id: 'i', corners: QUARTER, names: ['', "Q'", "R'"], places: ['below', 'above left', 'above left'], tone: 'good' }),
  ]);

const half = (id: string) =>
  figure(id, [
    g,
    tri(),
    turnArrow({ id: 'turn', c: g.map(2, 1), r: 0.9, from: 10, to: 170, tone: 'theta' }),
    move(g, 'pq2', [2, 1], [-1, 1], { tone: 'adj' }),
    move(g, 'pr2', [2, 1], [2, -1], { tone: 'opp' }),
    triangle(g, { id: 'i', corners: HALF, names: ['', "Q'", "R'"], places: ['above left', 'below left', 'below right'], tone: 'opp' }),
  ]);

const video: Explainer = {
  id: 'xq-m6-8-3',
  lessonId: '',
  exam: {
    lesson: 'm6-8-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Turn a Triangle About a Vertex (Rotations)',
  thumbnailTitle: 'Turn the Triangle',
  thumbnail: 'qt',
  summary:
    'An exam-style question, solved one small step at a time: triangle PQR has vertices P(2, 1), Q(5, 1) and R(2, 3). (a) Rotate it a quarter turn counter-clockwise about P. (b) Instead, rotate it a half turn about P. From P, Q is 3 units right and R is 2 units up. A quarter turn counter-clockwise turns right into up and up into left, so Q′ is (2, 4) and R′ is (0, 1). A half turn turns every direction the opposite way, so Q′ is (−1, 1) and R′ is (2, −1). Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Turn the Triangle', subtitle: 'Rotations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about rotating a triangle on a coordinate plane. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'Triangle $PQR$ has vertices $P(2, 1)$, $Q(5, 1)$ and $R(2, 3)$. (a) Rotate the triangle a quarter turn counter-clockwise about $P$. Give the coordinates of $Q\'$ and $R\'$. (b) Instead, rotate triangle $PQR$ a half turn about $P$. Give the coordinates of $Q\'$ and $R\'$.',
          answer: '(a) $Q\'(2, 4)$, $R\'(0, 1)$ (b) $Q\'(-1, 1)$, $R\'(2, -1)$',
          working: 'from P: right becomes up, up becomes left; a half turn reverses both',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle P Q R has vertices P at 2, 1, Q at 5, 1, and R at 2, 3. Part a. Rotate the triangle a quarter turn counter clockwise about P, and give the coordinates of Q prime and R prime. Part b. Instead, rotate triangle P Q R a half turn about P, and give the new coordinates.', caption: 'Triangle PQR has vertices P(2, 1), Q(5, 1) and R(2, 3). (a) Rotate it a quarter turn counter-clockwise about P: give Q′ and R′. (b) Instead, rotate it a half turn about P: give Q′ and R′.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Rotation about a vertex', md: 'A **rotation** turns a shape around a fixed point, like a door around its hinge. Here the fixed point is the vertex $P$, so $P$ does **not** move. **Counter-clockwise** is the opposite way to a clock\'s hands. A **quarter turn** is $90^\\circ$ and a **half turn** is $180^\\circ$.' }],
      lines: [
        { say: 'A rotation turns a shape around a fixed point, like a door turning around its hinge. Here the fixed point is the vertex P, so P does not move.', show: 'c' },
        { say: 'Counter clockwise is the opposite way to the hands of a clock. A quarter turn is 90 degrees, and a half turn is 180 degrees.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Direction from P', 'Quarter turn counter-clockwise', 'Half turn'], rows: [['**right**', '**up**', '**left**'], ['**up**', '**left**', '**down**']] }],
      lines: [
        { say: 'Here is what we need. Describe each vertex by how far it is from P, and in which direction. A turn keeps every distance and changes only the direction.', show: 't' },
        { say: 'A quarter turn counter clockwise turns right into up, and up into left.', focus: 't.0' },
        { say: 'A half turn points every direction the opposite way: right becomes left, and up becomes down.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Describe $Q$ and $R$ as moves **from P**', 'Turn each **direction**, keep each **distance**', 'Count from $P$ to find $Q\'$ and $R\'$'] }],
      lines: [
        { say: 'Here is the plan. Describe Q and R as moves from P.', show: 'plan.0' },
        { say: 'Turn each direction, but keep each distance.', show: 'plan.1' },
        { say: 'Then count from P to find Q prime and R prime.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The quarter turn',
      layout: 'split',
      leftWidth: 560,
      left: [quarter('qt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['Q: 3 \\text{ right} \\to 3 \\text{ up}', "Q'(\\good{2, 4})", 'R: 2 \\text{ up} \\to 2 \\text{ left}', "R'(\\good{0, 1})"] }],
      lines: [
        { say: 'Here is triangle P Q R. We turn it a quarter turn counter clockwise about P, so P stays where it is.', show: [...start('qt'), 'qt.turn'] },
        { say: 'Q is at 5, 1, which is 3 units to the right of P.', show: 'qt.pq', focus: 'qt.pq' },
        { say: 'A quarter turn counter clockwise turns right into up. So Q prime is 3 units up from P. From 2, 1, go 3 up: Q prime is 2, 4.', show: ['qt.pq2', 'm.0', 'm.1'], focus: ['qt.pq2', 'm.1'] },
        { say: 'R is at 2, 3, which is 2 units up from P.', focus: 'qt.t-2' },
        { say: 'Up turns into left. So R prime is 2 units left of P. From 2, 1, go 2 left: R prime is 0, 1.', show: ['qt.pr2', 'm.2', 'm.3', ...image('qt')], focus: ['qt.pr2', 'm.3'] },
      ],
    },
    {
      chapter: 'Step 2: The half turn',
      layout: 'split',
      leftWidth: 560,
      left: [half('ht')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['Q: 3 \\text{ right} \\to 3 \\text{ left}', "Q'(\\good{-1, 1})", 'R: 2 \\text{ up} \\to 2 \\text{ down}', "R'(\\good{2, -1})"] }],
      lines: [
        { say: 'Part b starts again from the original triangle. This time, turn it a half turn about P.', show: [...start('ht'), 'ht.turn'] },
        { say: 'Q is 3 units right of P. A half turn points it the opposite way, so Q prime is 3 units left of P. From 2, 1, go 3 left: Q prime is negative 1, 1.', show: ['ht.pq2', 'm.0', 'm.1'], focus: ['ht.pq2', 'm.1'] },
        { say: 'R is 2 units up from P, so R prime is 2 units down from P. From 2, 1, go 2 down: R prime is 2, negative 1. The triangle is now upside down and facing left.', show: ['ht.pr2', 'm.2', 'm.3', ...image('ht')], focus: ['ht.pr2', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ["PQ = 5 - 2 = 3, \\quad PQ' = 4 - 1 = 3 \\ \\checkmark", "PR = 3 - 1 = 2, \\quad PR' = 2 - 0 = 2 \\ \\checkmark"] }],
      lines: [
        { say: 'Let us check part a. A turn does not change any distance from P. P Q is 5 minus 2, which is 3, and P Q prime is 4 minus 1, which is also 3.', show: 'm.0' },
        { say: 'P R is 3 minus 1, which is 2, and P R prime is 2 minus 0, also 2. The sides that were across and up are now up and left, a quarter turn apart. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ["(a) $Q'(2, -2)$", 'turned **clockwise**: counter-clockwise turns right into **up**'],
            ["(a) $Q'(-1, 5)$", 'turned about the **origin**: the turn is about $P$'],
            ["(b) $Q'(-5, -1)$", 'changed both signs: that is a half turn about the **origin**, not $P$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2, negative 2 turns the wrong way. Clockwise turns right into down, but counter clockwise turns right into up.' },
        { say: 'Negative 1, 5 turns Q about the origin, zero, zero. The question says to turn about P, so count from P.' },
        { say: 'And negative 5, negative 1 just changes both signs. That works only for a half turn about the origin. Here we turn about P.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $B$ is $4$ units to the **right** of point $A$. The shape is rotated a quarter turn **clockwise** about $A$. Where is $B\'$?',
          choices: ['$4$ units above $A$', '$4$ units left of $A$', '$4$ units right of $A$', '$4$ units below $A$'],
          answer: 3,
          working: 'A quarter turn clockwise turns right into down, and the distance stays 4.',
        },
      ],
      lines: [
        { say: 'Your turn. Point B is 4 units to the right of point A. The shape is rotated a quarter turn clockwise about A. Where is B prime? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Clockwise, like a clock hand going from 3 to 6, turns right into down. The distance stays 4, so B prime is 4 units below A. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The turning point does **not** move', 'Describe each vertex as a move **from** that point', 'Turn the **direction**, keep the **distance**', 'Half turn: every direction **reverses**'] }],
      lines: [
        { say: 'Here is what to remember. The point you turn about does not move.', show: 'sum.0' },
        { say: 'Describe each vertex as a move from that point.', show: 'sum.1' },
        { say: 'Turn the direction, but keep the distance.', show: 'sum.2' },
        { say: 'And a half turn points every direction the opposite way. For more on rotations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
