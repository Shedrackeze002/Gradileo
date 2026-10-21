import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { isoCubes, isoShow, squares } from './lib/m8-8-figures.ts';

// Amira's object: 8 cubes in two rows. Back row (row 0): stacks of 1, none and 3. Front row: 2, 1, 1.
const H = [
  [1, 0, 3],
  [2, 1, 1],
];
const obj = isoCubes({ heights: H, arrows: { front: '\\text{front}' } });
const objPlain = isoCubes({ heights: H });

// The front view: columns 2, 1 and 3 squares high, drawn beside the object.
const front = squares({ name: 'fv', at: [7, -1.5], cells: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [2, 2]], label: '\\text{Front view}' });
// The mistake: adding the stacks in the right column gives 4 squares, not 3.
const wrong = squares({ name: 'wr', at: [6, -1.5], cells: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3]], tones: { 6: 'bad' }, label: '\\text{Not the front view}' });

const video: Explainer = {
  id: 'm8-8-1',
  lessonId: 'm8-8-1',
  title: 'Views of Three-Dimensional Objects, Part 1: The Front View',
  thumbnailTitle: 'The Front View',
  thumbnail: 'fr',
  summary:
    'A view is a flat drawing of what you see when you look straight at an object from one direction. An object of 8 cubes has a back row of stacks 1, none and 3 and a front row of 2, 1 and 1. Its front view shows the tallest stack in each column, left to right: 2, 1 and 3 squares high. A shorter stack hides behind a taller one, so never add the stacks.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 1', title: 'The Front View', subtitle: 'What you see from straight in front' }],
      lines: [
        { say: 'Architects, game designers and furniture makers often draw an object from different directions. Three flat drawings, one from the front, one from the top and one from the side, can show exactly how it is built.', show: 'title' },
        { say: 'In this video, you will learn what a view is, and how to draw the front view of an object made of cubes.' },
      ],
    },
    {
      chapter: 'What is a view?',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ob', [obj], 460)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'View', md: 'A **view** is a flat drawing of what you see when you look straight at an object from **one direction**: the **front view**, the **top view** or the **side view**.' },
      ],
      lines: [
        { say: 'Here is an object that Amira built from eight linking cubes. This drawing shows it from the front right, so you can see its top, its front and its right side all at once.', show: isoShow('ob', obj) },
        { say: 'A view is different. A view is a flat drawing of what you see when you look straight at an object from just one direction.', show: 'def' },
        { say: 'The front view is what you see from the front. The yellow arrow shows where the front of this object is.', show: 'ob.front', focus: 'ob.front' },
        { say: 'The top view is what you see from directly above, and the side view is what you see from one side. In this video, we draw the front view.' },
      ],
    },
    {
      chapter: 'Rows and stacks',
      layout: 'split',
      leftWidth: 520,
      left: [figure('rs', [obj], 460)],
      right: [{ kind: 'table', id: 't', head: ['', 'Left', 'Middle', 'Right'], rows: [['Back row', '$1$', 'none', '$3$'], ['Front row', '$2$', '$1$', '$1$']] }],
      lines: [
        { say: 'First, look at how the object is built. A stack is a pile of cubes, one on top of another. This object has two rows of stacks, one behind the other.', show: [...isoShow('rs', obj), 'rs.front'] },
        { say: 'The back row has a stack of one cube on the left, nothing in the middle, and a tall stack of three cubes on the right.', show: 't.0', focus: ['t.0', 'rs.s0-0', 'rs.s0-2'] },
        { say: 'Look closely at the back left stack. It is only one cube tall, so it hides behind the stack in front of it. You can only just see a corner of it.', focus: ['rs.s0-0', 't.0'] },
        { say: 'The front row has stacks of two, one and one cubes.', show: 't.1', focus: ['t.1', 'rs.s1-0', 'rs.s1-1', 'rs.s1-2'] },
        { say: 'No cubes are hidden underneath. Every cube sits on the table or on another cube.', focus: 'rs' },
      ],
    },
    {
      chapter: 'Drawing the front view',
      layout: 'center',
      main: [figure('fr', [obj, front], 440)],
      lines: [
        { say: 'Now let’s draw the front view. Stand where the arrow is, and look straight at the object. To draw what you see, picture each cube face you can see as one square on grid paper.', show: [...isoShow('fr', obj), 'fr.front'] },
        { say: 'Go across the columns from left to right. The left column has two stacks: one cube at the back, and two cubes at the front.', focus: ['fr.s0-0', 'fr.s1-0'] },
        { say: 'From the front, the taller stack hides the shorter one behind it. So you see the taller one, and this column is two squares high.', show: 'fr.fv-c0', focus: ['fr.s0-0', 'fr.s1-0', 'fr.fv-c0'] },
        { say: 'The middle column has only one stack, and it is one cube high. So the middle column is one square high.', show: 'fr.fv-c1', focus: ['fr.s1-1', 'fr.fv-c1'] },
        { say: 'The right column has a stack of three cubes at the back, and one cube at the front. This time the back stack is taller, so you see three squares.', show: 'fr.fv-c2', focus: ['fr.s0-2', 'fr.s1-2', 'fr.fv-c2'] },
        { say: 'So the front view has three columns, two, one and three squares high, from left to right.', show: 'fr.fv-label', focus: 'fr' },
      ],
    },
    {
      chapter: 'Tallest, not total',
      layout: 'split',
      leftWidth: 620,
      left: [figure('wr', [objPlain, wrong], 460)],
      right: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Adding the stacks',
          md: 'A shorter stack hides behind a taller one. Use the **tallest** stack in each column, not the total. The right column is $3$ squares high, not $3 + 1 = 4$.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. In the right column, there are three cubes at the back and one at the front. It is tempting to add them, and draw four squares.', show: [...isoShow('wr', objPlain), 'wr.wr-c0', 'wr.wr-c1', 'wr.wr-c2', 'wr.wr-label'] },
        { say: 'But the front cube stands in front of the bottom of the tall stack. It does not sit on top of it. So from the front, the column only looks three cubes tall.', show: 'oops' },
        { say: 'In each column, use the tallest stack, not the total. A view shows how tall something looks, not how many cubes it has.', focus: 'oops' },
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
            'An object is made of cubes in two rows. The **back** row has stacks of $3$, $1$ and $2$ cubes, from left to right. The **front** row has stacks of $1$, $2$ and $2$ cubes. How high is each column of its front view, from left to right?',
          choices: ['$4$, $3$ and $4$ squares', '$3$, $2$ and $2$ squares', '$1$, $2$ and $2$ squares', '$3$, $1$ and $2$ squares'],
          answer: 1,
          working: 'Use the taller stack in each column. Left: $3$ and $1$, so $3$. Middle: $1$ and $2$, so $2$. Right: $2$ and $2$, so $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object is made of cubes in two rows. The back row has stacks of three, one and two cubes, from left to right. The front row has stacks of one, two and two cubes. How high is each column of its front view? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: three, two and two squares. In each column, use the taller stack. The left column has three and one: the taller is three. The middle has one and two: the taller is two. The right has two stacks of two. Choice A adds the stacks instead, but the shorter ones hide behind the taller ones.', show: 'q.answer' },
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
          items: ['A view is a flat drawing of an object seen straight on from one direction.', 'Front view: go across the columns from left to right.', 'Each column is as tall as the **tallest** stack in it, not the total.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A view is a flat drawing of an object, seen straight on from one direction.', show: 'sum.0' },
        { say: 'To draw the front view, go across the columns from left to right.', show: 'sum.1' },
        { say: 'Each column is as tall as the tallest stack in it, because shorter stacks hide behind it. In the next part, you will look down from above and draw the top view. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
