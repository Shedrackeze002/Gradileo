import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { isoCubes, isoShow, squares } from './lib/m8-8-figures.ts';

// Amira's object: back row (row 0) stacks of 1, none and 3; front row 2, 1 and 1.
const H = [
  [1, 0, 3],
  [2, 1, 1],
];
const obj = isoCubes({ heights: H, arrows: { front: '\\text{front}', side: '\\text{right side}' } });
const plain = isoCubes({ heights: H });

// The right side view: the front row (tallest 2) on the left, the back row (tallest 3) on the right.
const side = squares({ name: 'sv', at: [9, 0], cells: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], label: '\\text{Right side view}' });
// The three views together, beside the object.
const fv = squares({ name: 'fv', at: [6.5, -1.5], cells: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [2, 2]], label: '\\text{Front}' });
const tv = squares({ name: 'tv', at: [10.5, -1.5], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]], label: '\\text{Top}' });
const sv = squares({ name: 'sv', at: [14.5, -1.5], cells: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], label: '\\text{Right side}' });
// The mistake: the side view drawn the wrong way round, back row on the left.
const ok = squares({ name: 'ok', at: [0, 0], cells: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], tone: 'good', label: '\\text{Right side view}' });
const mirror = squares({ name: 'mr', at: [4.5, 0], cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1]], tone: 'bad', label: '\\text{Back to front}' });

const video: Explainer = {
  id: 'm8-8-1-c',
  lessonId: 'm8-8-1',
  title: 'Views of Three-Dimensional Objects, Part 3: The Side View',
  thumbnailTitle: 'The Side View',
  thumbnail: 'sd',
  summary:
    'The right side view is what you see when you stand on the right of an object and look at it. The front of the object is then on your left. Each column of the side view is one row of the object, as tall as the tallest stack in that row: for an object with a front row of 2, 1 and 1 and a back row of 1 and 3, the columns are 2 and 3 squares high.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 3', title: 'The Side View', subtitle: 'Walk around to the right' }],
      lines: [
        { say: 'You have drawn the front view and the top view of an object made of cubes. One view is left: the side view.', show: 'title' },
        { say: 'In this video, you will walk around to the right of the object, and draw what you see from there.' },
      ],
    },
    {
      chapter: 'Standing on the right',
      layout: 'split',
      leftWidth: 540,
      left: [figure('ob', [obj], 480)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Right side view', md: 'What you see when you stand on the **right** side of the object and look straight at it. The front of the object is now on your **left**.' }],
      lines: [
        { say: 'Here is Amira’s object again, with its front marked by the arrow at the bottom left.', show: [...isoShow('ob', obj), 'ob.front'] },
        { say: 'The right side view is what you see when you stand on the right side of the object, and look straight at it. This new arrow shows where you stand.', show: ['ob.side', 'def'], focus: 'ob.side' },
        { say: 'Here is the tricky part. When you stand on the right, the front of the object is on your left, and the back of the object is on your right.', focus: 'def' },
        { say: 'Try it with a box on your desk. Walk around to its right side. The side that faced you before is now on your left.' },
      ],
    },
    {
      chapter: 'Rows become columns',
      layout: 'center',
      main: [figure('sd', [obj, side], 440)],
      lines: [
        { say: 'From the right side, each row of the object becomes one column of the view. The front row is on the left of your drawing, and the back row is on the right.', show: [...isoShow('sd', obj), 'sd.front', 'sd.side'] },
        { say: 'The front row has stacks of two, one and one. From the side, they line up one behind another, so you see only the tallest one. This column is two squares high.', show: 'sd.sv-c0', focus: ['sd.s1-0', 'sd.s1-1', 'sd.s1-2', 'sd.sv-c0'] },
        { say: 'The back row has stacks of one and three. The tallest is three, so this column is three squares high.', show: 'sd.sv-c1', focus: ['sd.s0-0', 'sd.s0-2', 'sd.sv-c1'] },
        { say: 'So the right side view has two columns, two and three squares high, with the shorter column on the left.', show: 'sd.sv-label', focus: 'sd' },
      ],
    },
    {
      chapter: 'Which side is which?',
      layout: 'split',
      leftWidth: 520,
      left: [figure('wr', [ok, mirror], 340)],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Turn yourself, not the object', md: 'Before drawing a side view, imagine walking around to that side. Ask: what is on my left now, and what is on my right?' }],
      lines: [
        { say: 'A common slip is to draw the side view back to front, with the back row on the left. Then the tall column ends up on the wrong side.', show: ['wr.ok-c0', 'wr.ok-c1', 'wr.ok-label', 'wr.mr-c0', 'wr.mr-c1', 'wr.mr-label'] },
        { say: 'Here is a tip. Do not turn the object in your head. Turn yourself. Imagine walking around to that side, and ask: what is on my left now, and what is on my right?', show: 'tip' },
        { say: 'On the right side, the front is on your left. So the front row is the left column of the right side view.', focus: 'wr.ok-c0' },
      ],
    },
    {
      chapter: 'Three views',
      layout: 'center',
      main: [figure('all', [plain, fv, tv, sv], 360)],
      lines: [
        { say: 'Here are all three views of Amira’s object together.', show: isoShow('all', plain) },
        { say: 'The front view has columns of two, one and three squares.', show: ['all.fv-c0', 'all.fv-c1', 'all.fv-c2', 'all.fv-label'] },
        { say: 'The top view shows where the five stacks stand.', show: ['all.tv-c0', 'all.tv-c1', 'all.tv-c2', 'all.tv-label'] },
        { say: 'And the right side view has columns of two and three squares. Each view shows something the others do not. Together, they describe the object.', show: ['all.sv-c0', 'all.sv-c1', 'all.sv-label'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'An object has a **front** row of stacks $1$, $1$ and $3$ cubes tall, from left to right, and a **back** row of stacks $2$, $2$ and $2$ cubes tall. How high is each column of its **right side view**, from left to right?',
          choices: ['$3$ squares, then $2$ squares', '$2$ squares, then $3$ squares', '$5$ squares, then $6$ squares', '$2$, $2$ and $3$ squares'],
          answer: 0,
          working: 'From the right, the front row is on the left: its tallest stack is $3$. The back row is on the right: its tallest stack is $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object has a front row of stacks one, one and three cubes tall, from left to right, and a back row of stacks two, two and two cubes tall. How high is each column of its right side view? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: three squares on the left, and two squares on the right. From the right, the front row is on your left, and its tallest stack is three. The back row is on your right, and its tallest stack is two. Choice B has the columns the wrong way round.', show: 'q.answer' },
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
          items: ['Right side view: stand on the right and look straight at the object.', 'The front of the object is now on your **left**.', 'Each column is one row of the object, as tall as its tallest stack.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The right side view is what you see when you stand on the right of the object, and look straight at it.', show: 'sum.0' },
        { say: 'From there, the front of the object is on your left. Turn yourself, not the object.', show: 'sum.1' },
        { say: 'Each column of the side view is one row of the object, as tall as its tallest stack. In the next part, you will count cubes and match objects to their views. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
