import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { isoCubes, isoShow, squares } from './lib/m8-8-figures.ts';

// Amira's object: back row (row 0) stacks of 1, none and 3; front row 2, 1 and 1.
const H = [
  [1, 0, 3],
  [2, 1, 1],
];
const obj = isoCubes({ heights: H });
// The rectangular prism 3 cubes wide, 2 deep and 3 high that it could become.
const prism = isoCubes({ name: 'p', heights: [[3, 3, 3], [3, 3, 3]], at: [7.5, 0] });

// A mystery object to rebuild from its views: back left 3, front left 2, front right 1.
const M = [
  [3, 0],
  [2, 1],
];
const mystery = isoCubes({ name: 'm', heights: M, at: [12, 0] });
const mTop = squares({ name: 'tv', at: [0, 0], cells: [[0, 0], [1, 0], [0, 1]], group: (i) => `q${i}`, label: '\\text{Top}' });
const mFront = squares({ name: 'fv', at: [3.5, 0], cells: [[0, 0], [0, 1], [0, 2], [1, 0]], label: '\\text{Front}' });
const mSide = squares({ name: 'sv', at: [7, 0], cells: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], label: '\\text{Right side}' });

// Two objects with the same top view but different heights.
const twinA = isoCubes({ name: 'a', heights: M });
const twinB = isoCubes({ name: 'b', heights: [[1, 0], [1, 2]], at: [6, 0] });

const video: Explainer = {
  id: 'm8-8-1-d',
  lessonId: 'm8-8-1',
  title: 'Views of Three-Dimensional Objects, Part 4: Counting Cubes and Matching Views',
  thumbnailTitle: 'Counting Cubes',
  thumbnail: 'ob',
  summary:
    'Count the cubes in an object one stack at a time: back row 1 + 3 = 4, front row 2 + 1 + 1 = 4, so 8 cubes. A prism 3 cubes wide, 2 deep and 3 high has 3 × 2 × 3 = 18 cubes, so the object needs 18 − 8 = 10 more. To find an object from its views, start with the top view to see where the stacks stand, then use the front and side views for their heights, and check every view.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 4', title: 'Counting Cubes and Matching Views', subtitle: 'One stack at a time' }],
      lines: [
        { say: 'You can now draw the front, top and side views of an object made of cubes.', show: 'title' },
        { say: 'In this video, you will count the cubes in an object, and then work backwards: use its views to find out what the object looks like.' },
      ],
    },
    {
      chapter: 'Counting the cubes',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ob', [obj], 460)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Back row: } 1 + 3 = 4', '\\text{Front row: } 2 + 1 + 1 = 4', '\\text{Total: } 4 + 4 = 8\\text{ cubes}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One stack at a time', md: 'Count stack by stack, so you do not count a cube twice or miss a hidden one.' },
      ],
      lines: [
        { say: 'How many cubes are in Amira’s object? Some of them are hidden from view, so we need a careful way to count.', show: isoShow('ob', obj) },
        { say: 'Count one stack at a time. Every cube sits on the table or on another cube, so a stack goes all the way down to the table, even where you cannot see it.', show: 'tip' },
        { say: 'The back row has a stack of one and a stack of three. One plus three is four cubes.', show: 'm.0', focus: ['m.0', 'ob.s0-0', 'ob.s0-2'] },
        { say: 'The front row has stacks of two, one and one. Two plus one plus one is four cubes.', show: 'm.1', focus: ['m.1', 'ob.s1-0', 'ob.s1-1', 'ob.s1-2'] },
        { say: 'So the object has four plus four, which is eight cubes.', show: 'm.2', focus: ['m.2', 'ob'] },
      ],
    },
    {
      chapter: 'How many more?',
      layout: 'center',
      main: [
        figure('pr', [obj, prism], 360),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Prism: } 3 \\times 2 \\times 3 = 18\\text{ cubes}', '\\text{More cubes needed: } 18 - 8 = 10'] },
      ],
      lines: [
        { say: 'A rectangular prism is a box shape. How many more cubes would turn Amira’s object into a rectangular prism three cubes wide, two cubes deep and three cubes high?', show: [...isoShow('pr', obj), ...isoShow('pr', prism)] },
        { say: 'The prism has three times two, which is six stacks, and each stack is three cubes high. Three times two times three is eighteen cubes.', show: 'm.0', focus: 'm.0' },
        { say: 'The object already has eight cubes. So it needs eighteen minus eight, which is ten more cubes.', show: 'm.1', focus: 'm.1' },
        { say: 'You can check it stack by stack. The back row needs two, three and none more: five. The front row needs one, two and two more: five. Five plus five is ten.', focus: 'm' },
      ],
    },
    {
      chapter: 'From views to an object',
      layout: 'center',
      main: [
        figure('mv', [mTop, mFront, mSide, mystery], 380),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Stacks: back left } 3, \\text{ front left } 2, \\text{ front right } 1'] },
      ],
      lines: [
        { say: 'Now work backwards. Here are the top, front and right side views of a mystery object. What does it look like?', show: ['mv.tv-q0', 'mv.tv-q1', 'mv.tv-q2', 'mv.tv-label', 'mv.fv-c0', 'mv.fv-c1', 'mv.fv-label', 'mv.sv-c0', 'mv.sv-c1', 'mv.sv-label'] },
        { say: 'Start with the top view. It shows where the stacks stand: one at the back left, one at the front left, and one at the front right. So there are three stacks.', focus: ['mv.tv-q0', 'mv.tv-q1', 'mv.tv-q2'] },
        { say: 'Now the side view. Its right column is the back row, and it is three squares high. Only one stack stands in the back row, so the back left stack has three cubes.', focus: ['mv.sv-c1', 'mv.tv-q2'] },
        { say: 'Next, the front view. Its right column is one square high, and only one stack stands there. So the front right stack has one cube.', focus: ['mv.fv-c1', 'mv.tv-q1'] },
        { say: 'Back to the side view. Its left column, the front row, is two squares high. The front right stack has only one cube, so the front left stack must have two.', focus: ['mv.sv-c0', 'mv.tv-q0'] },
        { say: 'So the stacks have three, two and one cubes: six cubes in all. Here is the object. Check it against every view, and it matches.', show: ['m.0', ...isoShow('mv', mystery)], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check every view',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tw', [twinA, twinB], 360)],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Check every view', md: 'Two objects can share one view but differ in another. Use the **top view** first, then check the heights with the **front** and **side** views.' }],
      lines: [
        { say: 'Why check every view? Look at these two objects. From above, both look the same: three squares in the same places.', show: [...isoShow('tw', twinA), ...isoShow('tw', twinB)] },
        { say: 'But their stacks have different heights, so their front views and side views are different. One view alone is not enough to describe an object.', show: 'key' },
        { say: 'So use the top view first, to see where the stacks stand. Then use the front and side views to find the height of each stack, and check that your object matches every view.', focus: 'key' },
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
            'An object has a **back** row of stacks $2$, $3$ and $1$ cubes tall, and a **front** row of stacks $1$, $2$ and $1$ cubes tall. How many more cubes would make it a rectangular prism $3$ cubes wide, $2$ cubes deep and $3$ cubes high?',
          choices: ['$18$', '$10$', '$8$', '$6$'],
          answer: 2,
          working: 'The object has $2 + 3 + 1 = 6$ and $1 + 2 + 1 = 4$, so $10$ cubes. The prism has $3 \\times 2 \\times 3 = 18$. It needs $18 - 10 = 8$ more.',
        },
      ],
      lines: [
        { say: 'Your turn. An object has a back row of stacks two, three and one cubes tall, and a front row of stacks one, two and one cubes tall. How many more cubes would make it a rectangular prism three cubes wide, two cubes deep and three cubes high? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight more cubes. The back row has six cubes and the front row has four, so the object has ten. The prism has three times two times three, which is eighteen. Eighteen minus ten is eight. Choice B is the number of cubes the object already has, not the number it needs.', show: 'q.answer' },
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
          items: ['Count cubes one stack at a time; every stack goes down to the table.', 'Cubes needed for a prism: the prism’s cubes minus the object’s cubes.', 'From views to an object: top view first, then front and side views for the heights.', 'Check the object against every view.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count the cubes in an object one stack at a time. Every stack goes all the way down to the table.', show: 'sum.0' },
        { say: 'To find how many more cubes make a prism, subtract the cubes you have from the cubes in the prism.', show: 'sum.1' },
        { say: 'To find an object from its views, start with the top view, then use the front and side views to find the heights.', show: 'sum.2' },
        { say: 'And always check every view, because two objects can share one view. Well done! Next, you will unfold objects into flat patterns called nets.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
