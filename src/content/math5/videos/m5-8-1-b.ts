import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrowSign, fold, join, mark, pinwheel, shape, turns } from './lib/m5-8-figures.ts';

// A pinwheel with four blades, and its centre.
const wheel = (id: string, withFold = false) =>
  figure(id, [join(shape({ pieces: pinwheel(1.4) }), mark({ id: 'ctr', at: [0, 0] }), ...(withFold ? [fold({ id: 'try1', a: [0, -1.8], b: [0, 1.8], ok: false }), fold({ id: 'try2', a: [-1.27, -1.27], b: [1.27, 1.27], ok: false })] : []))]);

// The pinwheel after each quarter turn: it fits its starting outline every time.
const wheelTurns = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: pinwheel(1),
        marker: [1, 2 / 3],
        angles: [0, 90, 180, 270, 360],
        gap: 3,
        labels: ['\\text{start}', '90^\\circ \\to 1', '180^\\circ \\to 2', '270^\\circ \\to 3', '360^\\circ \\to 4'],
        tones: ['ink', 'good', 'good', 'good', 'good'],
      }),
    ],
    380,
  );

// The arrow sign after each quarter turn: it fits only after the full turn.
const arrowTurns = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [arrowSign()],
        marker: [1, 0],
        angles: [0, 90, 180, 270, 360],
        gap: 2.8,
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ\\ \\text{no}', '270^\\circ\\ \\text{no}', '360^\\circ \\to 1'],
        tones: ['ink', 'bad', 'bad', 'bad', 'good'],
      }),
    ],
    300,
  );

const COPIES = [0, 1, 2, 3, 4];

const video: Explainer = {
  id: 'm5-8-1-b',
  lessonId: 'm5-8-1',
  title: 'Line and Rotation Symmetry, Part 2: Rotation Symmetry',
  thumbnailTitle: 'Rotation Symmetry',
  thumbnail: 'pw',
  summary: 'Rotation symmetry: a shape that fits exactly on itself after less than a full turn about its centre. The order of rotation symmetry counts the fits in one full turn, the full turn included: a pinwheel fits after 90°, 180°, 270° and 360°, so its order is 4, though it has no lines of symmetry; an arrow sign fits only after the full turn, so its order is 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 2', title: 'Rotation Symmetry', subtitle: 'Turn it, and it fits again' }],
      lines: [
        { say: 'Some shapes fit on themselves when you turn them around their centre, like the blades of a pinwheel.', show: 'title' },
        { say: 'In this video, you will learn about rotation symmetry, and count how many times a shape fits as it turns.' },
      ],
    },
    {
      chapter: 'Rotation symmetry',
      layout: 'split',
      leftWidth: 480,
      left: [wheel('pw')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Rotation symmetry', md: 'A 2-D shape has **rotation symmetry** if it fits exactly on itself after a turn of less than a full turn ($360^\\circ$) around its centre point.' }],
      lines: [
        { say: 'Here is a pinwheel with four blades. The dot in the middle is its centre point.', show: ['pw.shape', 'pw.ctr'] },
        { say: 'A shape has rotation symmetry if it fits exactly on itself after a turn of less than a full turn around its centre point.', show: 'def' },
        { say: 'A full turn is 360 degrees, all the way around. So the turn must be smaller than that. A half turn is 180 degrees, and a quarter turn is 90 degrees.' },
      ],
    },
    {
      chapter: 'Turning a pinwheel',
      layout: 'center',
      main: [wheelTurns('tn')],
      lines: [
        { say: 'Let’s turn the pinwheel. The dashed outline shows where it started. The yellow dot shows how far it has turned.', show: 'tn.c0' },
        { say: 'After a quarter turn, 90 degrees, the pinwheel fits exactly on its outline. That is one.', show: 'tn.c1', focus: 'tn.c1' },
        { say: 'After a half turn, 180 degrees, it fits again. That is two.', show: 'tn.c2', focus: 'tn.c2' },
        { say: 'After 270 degrees, three quarters of a turn, it fits again. That is three.', show: 'tn.c3', focus: 'tn.c3' },
        { say: 'And after the full turn, 360 degrees, it is back where it started. That is four.', show: 'tn.c4', focus: 'tn.c4' },
      ],
    },
    {
      chapter: 'The order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Order of rotation symmetry', md: 'The **order of rotation symmetry** is the number of times a shape fits exactly on itself during one full turn. The full turn counts.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pinwheel: fits } 4 \\text{ times} \\;\\Rightarrow\\; \\text{order } 4'] },
      ],
      lines: [
        { say: 'The order of rotation symmetry is the number of times a shape fits exactly on itself during one full turn. The full turn counts as one of them.', show: 'def' },
        { say: 'The pinwheel fits four times in a full turn. So its order of rotation symmetry is four.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two kinds of symmetry',
      layout: 'split',
      leftWidth: 480,
      left: [wheel('pf', true)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The pinwheel has **no** lines of symmetry, but it **does** have rotation symmetry. The two kinds of symmetry are different.' }],
      lines: [
        { say: 'Does the pinwheel have a line of symmetry? Try folding it along the red lines.', show: ['pf.shape', 'pf.ctr', 'pf.try1', 'pf.try2'] },
        { say: 'The blades all lean the same way around, so the two halves never match. Any fold you try puts a blade on a gap, or on a blade that leans the other way.' },
        { say: 'So the pinwheel has no lines of symmetry, but it does have rotation symmetry. The two kinds of symmetry are different, and a shape can have one without the other.', show: 't' },
      ],
    },
    {
      chapter: 'Use tracing paper',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Use tracing paper', md: 'Trace the shape and put a pencil point on its centre. Turn the tracing slowly and count each time it fits on the shape. Stop when you get back to the start.' }],
      lines: [
        { say: 'Here is a way to check rotation symmetry yourself. Trace the shape on thin paper, and put a pencil point on its centre, to hold it in place.', show: 'tip' },
        { say: 'Turn the tracing slowly, and count each time it fits exactly on the shape. Stop when you get back to the start. The number you counted is the order.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        arrowTurns('at'),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the full turn', md: 'Every shape fits on itself after a full turn, so the order is never $0$. A shape that only fits after a full turn has order $1$: it has **no** rotation symmetry.' },
      ],
      lines: [
        { say: 'Watch out. Every shape fits on itself after a full turn. So the order of rotation symmetry is never zero.', show: 'oops' },
        { say: 'Look at the arrow sign. After a quarter turn, a half turn, or three quarters of a turn, it does not fit its outline.', show: COPIES.slice(0, 4).map((k) => `at.c${k}`) },
        { say: 'It only fits after the full turn. So its order is one. A shape with order one has no rotation symmetry.', show: 'at.c4', focus: 'at.c4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shape fits exactly on itself after turns of $120^\\circ$, $240^\\circ$ and $360^\\circ$, and at no other turns. What is its order of rotation symmetry?',
          choices: ['$1$', '$3$', '$2$', '$0$'],
          answer: 1,
          working: 'It fits $3$ times in one full turn, counting the full turn, so its order is $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape fits exactly on itself after turns of 120 degrees, 240 degrees and 360 degrees, and at no other turns. What is its order of rotation symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three. It fits three times in one full turn, and the full turn counts. Choice C forgets to count the full turn.', show: 'q.answer' },
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
          items: ['A shape has rotation symmetry if it fits on itself after a turn of less than $360^\\circ$.', 'The order counts the fits in one full turn. The full turn counts.', 'Order $1$ means no rotation symmetry. The order is never $0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A shape has rotation symmetry if it fits on itself after a turn of less than a full turn.', show: 'sum.0' },
        { say: 'The order of rotation symmetry counts how many times it fits in one full turn, and the full turn counts.', show: 'sum.1' },
        { say: 'And order one means no rotation symmetry. The order is never zero. In the next part, you will look closely at the half turn. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
