import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { isoCubes, isoShow, squares } from './lib/m8-8-figures.ts';

// Amira's object: back row (row 0) stacks of 1, none and 3; front row 2, 1 and 1.
const H = [
  [1, 0, 3],
  [2, 1, 1],
];
const obj = isoCubes({ heights: H, arrows: { front: '\\text{front}', top: '\\text{top}' } });
const byRow = (_: number, [, r]: [number, number]) => `r${r}`;

// The top view: the back row (left and right) on top, the front row (all three) along the bottom.
const top = squares({ name: 'tv', at: [7, -1.5], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]], group: byRow, label: '\\text{Top view}' });
// Upside down: the front row drawn at the top.
const flipped = squares({ name: 'up', at: [5, 0], cells: [[0, 1], [1, 1], [2, 1], [0, 0], [2, 0]], tone: 'bad', label: '\\text{Upside down}' });
const right = squares({ name: 'ok', at: [0, 0], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]], tone: 'good', label: '\\text{Top view}' });
// The front view from part 1, beside the top view, to compare them.
const frontView = squares({ name: 'fv', at: [0, 0], cells: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [2, 2]], label: '\\text{Front view}' });
const topView = squares({ name: 'tv', at: [5, 0], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]], label: '\\text{Top view}' });

const video: Explainer = {
  id: 'm8-8-1-b',
  lessonId: 'm8-8-1',
  title: 'Views of Three-Dimensional Objects, Part 2: The Top View',
  thumbnailTitle: 'The Top View',
  thumbnail: 'tp',
  summary:
    'The top view is what you see from directly above. Every stack shows as one square, however tall it is, so the top view shows where the stacks stand. Put the back row at the top of the drawing and the front row at the bottom, nearest to you, like a map with south at the bottom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 2', title: 'The Top View', subtitle: 'Looking straight down from above' }],
      lines: [
        { say: 'In the last part, you drew the front view of an object made of cubes. Now imagine you are a bird, flying over the object and looking straight down.', show: 'title' },
        { say: 'In this video, you will draw the top view, and learn which way round to draw it.' },
      ],
    },
    {
      chapter: 'Looking down',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ob', [obj], 480)],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'One square for each stack', md: 'From directly above, every stack shows as **one square**, however tall it is. The top view shows **where** the stacks stand.' }],
      lines: [
        { say: 'Here is Amira’s object again. It is made of eight cubes, and the yellow arrow at the bottom shows its front.', show: [...isoShow('ob', obj), 'ob.front'] },
        { say: 'The top view is what you see when you look straight down from directly above, like the bird.', show: 'ob.top', focus: 'ob.top' },
        { say: 'From above, you see only the top of each stack. The tall stack of three cubes and a short stack of one cube both look like a single square.', focus: ['ob.s0-2', 'ob.s1-1'] },
        { say: 'So the top view does not show how tall the stacks are. It shows where the stacks stand, like a map of the object.', show: 'key', focus: 'ob' },
      ],
    },
    {
      chapter: 'Drawing the top view',
      layout: 'center',
      main: [figure('tp', [obj, top], 440)],
      lines: [
        { say: 'Let’s draw the top view. Picture yourself above the object, with its front nearest to you. The front of the object goes at the bottom of your drawing.', show: [...isoShow('tp', obj), 'tp.front', 'tp.top'] },
        { say: 'So the back row goes at the top of the drawing. The back row has stacks in the left and right columns, with a gap in the middle. Draw two squares, with a gap between them.', show: 'tp.tv-r1', focus: ['tp.s0-0', 'tp.s0-2', 'tp.tv-r1'] },
        { say: 'The front row goes along the bottom. It has stacks in all three columns, so draw three squares in a row.', show: 'tp.tv-r0', focus: ['tp.s1-0', 'tp.s1-1', 'tp.s1-2', 'tp.tv-r0'] },
        { say: 'So the top view is two squares on top, at the left and the right, and three squares along the bottom. Five stacks, so five squares.', show: 'tp.tv-label', focus: 'tp' },
      ],
    },
    {
      chapter: 'Which way round?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('wr', [right, flipped], 340)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flipping the top view', md: 'The **front** row belongs at the **bottom** of the top view, nearest to you, just like a map with south at the bottom.' }],
      lines: [
        { say: 'Be careful which way round you draw it. The front row belongs at the bottom of the top view, because that is the side nearest to you.', show: ['wr.ok-c0', 'wr.ok-c1', 'wr.ok-c2', 'wr.ok-label'] },
        { say: 'If you put the front row at the top, the drawing is upside down. It would show a different object, with its gap at the front instead of the back.', show: ['wr.up-c0', 'wr.up-c1', 'wr.up-c2', 'wr.up-label'] },
        { say: 'Think of a map. On most maps, north is at the top and south is at the bottom. In a top view, the back is at the top, and the front is at the bottom.', show: 'oops' },
      ],
    },
    {
      chapter: 'Two views, two jobs',
      layout: 'center',
      main: [
        figure('two', [frontView, topView], 300),
        { kind: 'bullets', id: 'b', items: ['The front view shows how **tall** each column looks.', 'The top view shows **where** each stack stands.'] },
      ],
      lines: [
        { say: 'Now put the two views side by side. They tell you different things.', show: ['two.fv-c0', 'two.fv-c1', 'two.fv-c2', 'two.fv-label', 'two.tv-c0', 'two.tv-c1', 'two.tv-c2', 'two.tv-label'] },
        { say: 'The front view shows how tall each column looks, from left to right.', show: 'b.0', focus: ['two.fv-c0', 'two.fv-c1', 'two.fv-c2'] },
        { say: 'The top view shows where each stack stands, but not how tall it is.', show: 'b.1', focus: ['two.tv-c0', 'two.tv-c1', 'two.tv-c2'] },
        { say: 'Neither view shows everything on its own. That is why we draw an object from more than one direction.', focus: 'two' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An object has a **front** row of three stacks, each $1$ cube tall. Behind the right end, its **back** row has one stack $3$ cubes tall. What is its top view?',
          choices: ['A row of three, with one square **below** its right end', 'A row of three, with three squares **above** its right end', 'Four squares in a row', 'A row of three, with one square **above** its right end'],
          answer: 3,
          working: 'From above, every stack is one square, however tall. The front row is the bottom row of the drawing: three squares. The back stack is one square above the right end.',
        },
      ],
      lines: [
        { say: 'Your turn. An object has a front row of three stacks, each one cube tall. Behind the right end, its back row has one stack, three cubes tall. What is its top view? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. From above, every stack is one square, however tall it is. The front row is the bottom row of the drawing, three squares, and the back stack is one square above the right end. Choice B draws the tall stack as three squares, but from above you see only its top.', show: 'q.answer' },
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
          items: ['Top view: what you see from directly above.', 'Every stack is **one square**, however tall it is.', 'The back row goes at the top, and the front row at the bottom.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The top view is what you see when you look straight down from directly above.', show: 'sum.0' },
        { say: 'Every stack shows as one square, however tall it is, so the top view shows where the stacks stand.', show: 'sum.1' },
        { say: 'Draw the back row at the top, and the front row at the bottom, nearest to you. In the next part, you will walk around to the right and draw the side view. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
