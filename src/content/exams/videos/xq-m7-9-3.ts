import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, coord, mirror, shapeIds, swing, triangle } from '@/content/math7/videos/lib/m7-9-figures.ts';

type P = [number, number];

// Exam question for Math 7 lesson 9.3 (reflections and rotations). The free textbooks we use have
// no question like it, so Gradileo wrote it in the style of a Grade 7 unit test. Triangle JKL,
// J(1, 2), K(4, 2), L(1, 4). A reflection in the x-axis changes the sign of y: J′(1, −2),
// K′(4, −2), L′(1, −4). A 180° rotation about the origin changes both signs: J″(−1, −2),
// K″(−4, −2), L″(−1, −4).

const QUESTION =
  'Triangle JKL has vertices J(1, 2), K(4, 2) and L(1, 4). (a) Reflect triangle JKL in the x-axis. Give the coordinates of the image J′K′L′. (b) Rotate triangle JKL 180° about the origin. Give the coordinates of the image J″K″L″.';

const JKL: P[] = [
  [1, 2],
  [4, 2],
  [1, 4],
];
const REF: P[] = JKL.map(([x, y]) => [x, -y]);
const ROT: P[] = JKL.map(([x, y]) => [-x, -y]);
const NAMES = ['J', 'K', 'L'];

const original = (g: ReturnType<typeof cart>) => triangle(g, { id: 't', corners: JKL, names: NAMES, places: ['below right', 'below right', 'above left'] });

const flip = (id: string) => {
  const g = cart();
  return figure(
    id,
    [g, mirror(g, 'mx', 'x'), original(g), triangle(g, { id: 'i', corners: REF, names: NAMES.map((n) => `${n}'`), places: ['above right', 'above right', 'below right'], tone: 'good' })],
  );
};

const turn = (id: string) => {
  const g = cart();
  return figure(
    id,
    [g, original(g), swing(g, 'turn', 1.4, 60, 235), triangle(g, { id: 'r', corners: ROT, names: NAMES.map((n) => `${n}''`), places: ['above left', 'above left', 'below left'], tone: 'theta' })],
  );
};

const pair = (from: P, to: P, k: number, mark: string) => `${coord(...from, NAMES[k])} \\to ${coord(...to, NAMES[k] + mark)}`;

const video: Explainer = {
  id: 'xq-m7-9-3',
  lessonId: '',
  exam: {
    lesson: 'm7-9-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Flip and Turn Triangle JKL (Reflections and Rotations)',
  thumbnailTitle: 'Flip It, Then Turn It',
  thumbnail: 'rt',
  summary:
    'An exam-style question, solved one small step at a time: triangle JKL has vertices J(1, 2), K(4, 2) and L(1, 4). (a) Reflect it in the x-axis. (b) Rotate it 180° about the origin. A reflection in the x-axis keeps x and changes the sign of y, so J′(1, −2), K′(4, −2) and L′(1, −4). A 180° rotation changes the signs of both coordinates, so J″(−1, −2), K″(−4, −2) and L″(−1, −4). Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Flip It, Then Turn It', subtitle: 'Reflections and rotations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about reflections and rotations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: "Triangle $JKL$ has vertices $J(1, 2)$, $K(4, 2)$ and $L(1, 4)$. (a) Reflect triangle $JKL$ in the $x$-axis. Give the coordinates of the image $J'K'L'$. (b) Rotate triangle $JKL$ $180^\\circ$ about the origin. Give the coordinates of the image $J''K''L''$.",
          answer: "(a) $J'(1, -2)$, $K'(4, -2)$, $L'(1, -4)$ (b) $J''(-1, -2)$, $K''(-4, -2)$, $L''(-1, -4)$",
          working: 'x-axis reflection: y changes sign. 180° rotation: both change sign.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle J K L has vertices J, 1, 2. K, 4, 2. And L, 1, 4.' },
        { say: 'Part a: reflect triangle J K L in the x axis, and give the coordinates of the image, J prime, K prime, L prime. Part b: rotate triangle J K L 180 degrees about the origin, and give the coordinates of the image, J double prime, K double prime, L double prime.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Flip and turn', md: 'A **reflection** flips the shape over a **mirror line**, here the $x$-axis. A **rotation** turns it around a point, here the **origin**. $180^\\circ$ is a **half turn**. We start from the **original** triangle both times.' }],
      lines: [
        { say: 'A reflection flips the shape over a mirror line. Here the mirror line is the x axis.', show: 'c' },
        { say: 'A rotation turns the shape around a point, here the origin. 180 degrees is a half turn. Both parts start from the original triangle.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Move', 'What happens', 'Example'],
          rows: [
            ['Reflect in the $x$-axis', '$y$ changes sign', '$(3, 2) \\to (3, -2)$'],
            ['Reflect in the $y$-axis', '$x$ changes sign', '$(3, 2) \\to (-3, 2)$'],
            ['Rotate $180^\\circ$', '**both** change sign', '$(3, 2) \\to (-3, -2)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A reflection in the x axis keeps x the same, and changes the sign of y: the point flips from above the axis to below it.', show: 't' },
        { say: 'A reflection in the y axis changes the sign of x instead.' },
        { say: 'And a 180 degree rotation about the origin changes both signs: right becomes left, and up becomes down.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Keep each $x$, change the sign of each $y$', '(b) Change the sign of **both**', 'Start from $JKL$ each time'] }],
      lines: [
        { say: 'Here is the plan. For part a, keep each x, and change the sign of each y.', show: 'plan.0' },
        { say: 'For part b, change the sign of both coordinates.', show: 'plan.1' },
        { say: 'And start from the original triangle each time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Reflect in the x-axis',
      layout: 'split',
      leftWidth: 600,
      left: [flip('rf')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: [0, 1, 2].map((k) => pair(JKL[k], REF[k], k, "'")) }],
      lines: [
        { say: 'Here is triangle J K L, with the x axis as the mirror line.', show: [...base('rf'), ...shapeIds('rf', 't'), 'rf.mx'] },
        { say: 'J is 2 units above the x axis, so J prime is 2 units below it: 1, negative 2.', show: ['rf.i-0', 'm.0'], focus: ['rf.i-0', 'm.0'] },
        { say: 'In the same way, K, 4, 2, goes to K prime, 4, negative 2. And L, 1, 4, goes to L prime, 1, negative 4.', show: ['rf.i-1', 'rf.i-2', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Join them up. The image is the triangle flipped upside down.', show: ['rf.i', 'rf.i-fill'], focus: 'rf.i' },
      ],
    },
    {
      chapter: 'Step 2: Rotate 180°',
      layout: 'split',
      leftWidth: 600,
      left: [turn('rt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: [0, 1, 2].map((k) => pair(JKL[k], ROT[k], k, "''")) }],
      lines: [
        { say: 'Step two, part b. Start again from triangle J K L, and turn it a half turn about the origin.', show: [...base('rt'), ...shapeIds('rt', 't'), 'rt.turn'] },
        { say: 'J is 1 right and 2 up. A half turn makes that 1 left and 2 down, so J double prime is negative 1, negative 2.', show: ['rt.r-0', 'm.0'], focus: ['rt.r-0', 'm.0'] },
        { say: 'In the same way, K double prime is negative 4, negative 2, and L double prime is negative 1, negative 4.', show: ['rt.r-1', 'rt.r-2', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Join them up. The image is the triangle turned around, in the opposite corner of the plane.', show: ['rt.r', 'rt.r-fill'], focus: 'rt.r' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ["J \\text{ is } 2 \\text{ above}, \\ J' \\text{ is } 2 \\text{ below} \\ \\checkmark", "\\text{halfway from } J \\text{ to } J'': \\ \\left(\\tfrac{1 + ({-1})}{2},\\ \\tfrac{2 + ({-2})}{2}\\right) = (0, 0) \\ \\checkmark"] }],
      lines: [
        { say: 'Let us check. A mirror image is the same distance from the mirror line. J is 2 above the x axis, and J prime is 2 below it.', show: 'm.0', focus: 'm.0' },
        { say: 'A half turn sends each point straight through the origin to the other side. Halfway between J and J double prime is 0, 0, the origin. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ["(a) $J'(-1, 2)$", 'reflected in the **$y$-axis**: the $x$-axis changes $y$'],
            ["(b) $J''(1, -2)$", 'changed **one** sign: a half turn changes **both**'],
            ["(a) $J'(1, 0)$", 'stopped **on** the mirror: go the **same distance** past it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 1, 2 reflects in the y axis instead. A reflection in the x axis changes the sign of y.' },
        { say: '1, negative 2 for part b changes only one sign. That is the reflection from part a, not a half turn. A half turn changes both signs.' },
        { say: 'And 1, 0 moves J 2 units down, onto the mirror line. The image is the same distance on the other side: 2 below the axis.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $Q(-3, 5)$ is reflected in the $y$-axis. Where is $Q\'$?',
          choices: ['$(3, 5)$', '$(-3, -5)$', '$(3, -5)$', '$(5, -3)$'],
          answer: 0,
          working: 'A reflection in the y-axis changes the sign of x only: Q′(3, 5).',
        },
      ],
      lines: [
        { say: 'Your turn. Point Q, negative 3, 5, is reflected in the y axis. Where is Q prime? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A reflection in the y axis changes the sign of x only. Q prime is 3, 5. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Reflect in the $x$-axis: $y$ changes sign', 'Reflect in the $y$-axis: $x$ changes sign', 'Rotate $180^\\circ$: **both** change sign', 'Start from the **original** each time'] }],
      lines: [
        { say: 'Here is what to remember. A reflection in the x axis changes the sign of y.', show: 'sum.0' },
        { say: 'A reflection in the y axis changes the sign of x.', show: 'sum.1' },
        { say: 'A half turn about the origin changes both signs.', show: 'sum.2' },
        { say: 'And start from the original shape each time. For more on reflections and rotations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
