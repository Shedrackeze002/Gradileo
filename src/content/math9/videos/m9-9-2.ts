import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrowSign } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { arcArrow, join, mark, pinwheel, shape, tag, turns } from './lib/m9-9-figures.ts';

// A pinwheel with four blades, its centre, and an arrow for a quarter turn about the centre.
const wheel = (id: string) => figure(id, [join(shape({ pieces: pinwheel(1.6), tone: 'adj' }), mark({ id: 'ctr', at: [0, 0] }), arcArrow({ id: 'spin', c: [0, 0], r: 2.35, from: 30, to: 120 }))], 460);

// The pinwheel after each quarter turn (anticlockwise): it fits its starting outline every time.
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
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ\\ \\text{no}', '270^\\circ\\ \\text{no}', '360^\\circ'],
        tones: ['ink', 'bad', 'bad', 'bad', 'ink'],
      }),
    ],
    300,
  );

// The start and the full turn are the same position.
const same = (id: string) =>
  figure(
    id,
    [
      join(
        turns({ pieces: pinwheel(1), marker: [1, 2 / 3], angles: [0, 360], gap: 4.4, labels: ['\\text{start}', '\\text{after } 360^\\circ'], tones: ['ink', 'ink'] }),
        tag({ id: 'eq', at: [2.2, 0], tex: '=', tone: 'theta' }),
      ),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-9-2',
  lessonId: 'm9-9-2',
  title: 'Rotation Symmetry, Part 1: Rotation Symmetry and Its Order',
  thumbnailTitle: 'Rotation Symmetry',
  thumbnail: 'pw',
  summary:
    'A shape has rotation symmetry when it fits onto itself after a turn of less than 360° about a point, the centre of rotation. The order of rotation is the number of times it fits onto itself during one full turn: a pinwheel fits after 90°, 180°, 270° and 360°, so its order is 4. An arrow sign fits only after the full turn, so it has no rotation symmetry. The start and the full turn are the same position, so count the full turn once and not the start as well.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 1', title: 'Rotation Symmetry and Its Order', subtitle: 'Turn it, and count the fits' }],
      lines: [
        { say: 'A ceiling fan, a wheel cover and a snowflake all look exactly the same after part of a turn. That is a different kind of balance from a fold line.', show: 'title' },
        { say: 'In this video, you will learn what rotation symmetry is, and how to find its order by counting, one turn at a time.' },
      ],
    },
    {
      chapter: 'Rotation symmetry',
      layout: 'split',
      leftWidth: 520,
      left: [wheel('pw')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Rotation symmetry',
          md: 'A shape has **rotation symmetry** when it fits exactly onto itself after a turn of **less than** $360^\\circ$ about a point. That point is the **centre of rotation**.',
        },
      ],
      lines: [
        { say: 'Here is a pinwheel. The dot in the middle is the point it turns about. It is called the centre of rotation.', show: ['pw.shape', 'pw.ctr'], focus: 'pw.ctr' },
        { say: 'A shape has rotation symmetry when it fits exactly onto itself after a turn of less than a full turn about its centre.', show: ['def', 'pw.spin'], focus: 'pw.spin' },
        { say: 'Remember, a full turn is three hundred sixty degrees, all the way around. A half turn is one hundred eighty degrees, and a quarter turn is ninety degrees.' },
      ],
    },
    {
      chapter: 'Turn by turn',
      layout: 'center',
      main: [wheelTurns('tn')],
      lines: [
        { say: 'Here is a way to test it. Trace the pinwheel on thin paper, hold your pencil on the centre, and turn the tracing slowly.', show: 'tn.c0' },
        { say: 'In each picture, the dashed outline shows where the pinwheel started, and the yellow dot shows how far it has turned.', focus: 'tn.c0' },
        { say: 'After a quarter turn, ninety degrees, the tracing fits exactly onto the pinwheel. That is one.', show: 'tn.c1', focus: 'tn.c1' },
        { say: 'After a half turn, one hundred eighty degrees, it fits again. That is two.', show: 'tn.c2', focus: 'tn.c2' },
        { say: 'After three quarters of a turn, two hundred seventy degrees, it fits again. That is three.', show: 'tn.c3', focus: 'tn.c3' },
        { say: 'And after a full turn, three hundred sixty degrees, it is back where it started. That is four.', show: 'tn.c4', focus: 'tn.c4' },
      ],
    },
    {
      chapter: 'The order of rotation',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Order of rotation',
          md: 'The **order of rotation** is the number of times a shape fits onto itself during **one full turn**.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pinwheel: fits } 4 \\text{ times} \\;\\to\\; \\text{order } 4'] },
      ],
      lines: [
        { say: 'Now a new word. The order of rotation is the number of times a shape fits onto itself during one full turn.', show: 'def' },
        { say: 'The pinwheel fits four times in one full turn, so its order of rotation is four. We say it has rotation symmetry of order four.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'No rotation symmetry',
      layout: 'center',
      main: [
        arrowTurns('at'),
        { kind: 'text', id: 't', size: 'md', md: 'A shape that fits onto itself **only** after a full $360^\\circ$ turn has **no** rotation symmetry.' },
      ],
      lines: [
        { say: 'Not every shape has rotation symmetry. Here is an arrow sign.', show: 'at.c0' },
        { say: 'After a quarter turn, a half turn, or three quarters of a turn, it points the wrong way, and it does not fit its outline.', show: ['at.c1', 'at.c2', 'at.c3'], focus: ['at.c1', 'at.c2', 'at.c3'] },
        { say: 'It only fits after the full turn. But every shape fits after a full turn, so that does not count on its own.', show: 'at.c4', focus: 'at.c4' },
        { say: 'A shape that fits onto itself only after a full turn has no rotation symmetry. So the arrow sign has no rotation symmetry.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        same('sm'),
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Counting the start twice',
          md: 'The starting position and the position after a full turn are the **same**. Count the full turn once, and do **not** count the start as well.',
        },
      ],
      lines: [
        { say: 'Watch out for a common mistake. The starting position and the position after a full turn are exactly the same position.', show: ['sm.c0', 'sm.c1', 'sm.eq'], focus: 'sm.eq' },
        { say: 'So count the full turn once, and do not count the start as well. If you count both, you get five fits for the pinwheel, and that is one too many.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shape fits onto itself after turns of $72^\\circ$, $144^\\circ$, $216^\\circ$, $288^\\circ$ and $360^\\circ$, and at no other turns. What is its order of rotation?',
          choices: ['$4$', '$6$', '$1$', '$5$'],
          answer: 3,
          working: 'It fits $5$ times in one full turn, counting the full turn once, so its order of rotation is $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape fits onto itself after turns of seventy-two, one hundred forty-four, two hundred sixteen, two hundred eighty-eight and three hundred sixty degrees, and at no other turns. What is its order of rotation? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, five. It fits five times in one full turn, and the full turn counts once. Choice B counts the starting position as well, but the start and the full turn are the same position.', show: 'q.answer' },
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
            'A shape has **rotation symmetry** when it fits onto itself after a turn of less than $360^\\circ$ about its **centre of rotation**.',
            'The **order of rotation** is how many times it fits onto itself in one full turn. A pinwheel has order $4$.',
            'A shape that fits only after a full turn has **no** rotation symmetry.',
            'Count the full turn once. Do not count the start as well.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A shape has rotation symmetry when it fits onto itself after a turn of less than a full turn about its centre of rotation.', show: 'sum.0' },
        { say: 'The order of rotation is how many times it fits onto itself in one full turn. The pinwheel has order four.', show: 'sum.1' },
        { say: 'A shape that fits only after a full turn has no rotation symmetry.', show: 'sum.2' },
        { say: 'And count the full turn once, without counting the start as well. In the next part, you will find the size of the smallest turn that works. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
