import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, pt } from './lib/m5-9-figures.ts';

const g = grid();

// From A(2, 3) to B(7, 5): 5 right, then 2 up; and back: 5 left, then 2 down.
const fromAtoB = (id: string, back = false) =>
  figure(id, [
    g,
    ...(back
      ? [move(g, 'left', [7, 5], [2, 5], { label: '5\\text{ left}', side: 'right' }), move(g, 'down', [2, 5], [2, 3], { label: '2\\text{ down}' })]
      : [move(g, 'right', [2, 3], [7, 3], { label: '5\\text{ right}', side: 'right' }), move(g, 'up', [7, 3], [7, 5], { label: '2\\text{ up}', side: 'right' })]),
    pt(g, 'A', 2, 3, 'A(2,\\ 3)', back ? 'below' : 'above'),
    pt(g, 'B', 7, 5, 'B(7,\\ 5)', 'above right', 'hyp'),
  ]);

// A campground: the tent at (1, 2), 6 right to the washroom, then 4 up to the dock.
const camp = () =>
  figure('camp', [
    g,
    move(g, 'right', [1, 2], [7, 2], { label: '6\\text{ right}' }),
    move(g, 'up', [7, 2], [7, 6], { label: '4\\text{ up}', side: 'right' }),
    pt(g, 'tent', 1, 2, '\\text{Tent}', 'above', 'good'),
    pt(g, 'wash', 7, 2, '\\text{Washroom}', 'below', 'adj'),
    pt(g, 'dock', 7, 6, '\\text{Dock}', 'above', 'theta'),
  ]);

const video: Explainer = {
  id: 'm5-9-1-c',
  lessonId: 'm5-9-1',
  title: 'Points on a Coordinate Grid, Part 3: Moving Between Points',
  thumbnailTitle: 'Moving Between Points',
  thumbnail: 'ab',
  summary: 'Describing how to move from one point to another with left, right, up and down: from A(2, 3) to B(7, 5) is 5 right and 2 up, and back is 5 left and 2 down. Right and left change the first number; up and down change the second. Then a path on a campground map, one move at a time.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 3', title: 'Moving Between Points', subtitle: 'Left, right, up and down' }],
      lines: [
        { say: 'In a video game, a character walks from one spot to another. A robot rolls across a floor. To give directions on a grid, we say how far to move, and which way.', show: 'title' },
        { say: 'In this video, you will describe how to move from one point to another, and follow a path with more than one move.' },
      ],
    },
    {
      chapter: 'From A to B',
      layout: 'split',
      leftWidth: 560,
      left: [fromAtoB('ab')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{across: } 7 - 2 = \\adj{5}', '\\adj{5\\text{ right}}', '\\text{up: } 5 - 3 = \\opp{2}', '\\opp{2\\text{ up}}'] }],
      lines: [
        { say: 'Point A is at two, three, and Point B is at seven, five. How do you move from A to B? We can use the words left, right, up and down.', show: ['ab.grid', 'ab.axes', 'ab.A', 'ab.B'] },
        { say: 'First, look at the across numbers. They go from two to seven. Seven minus two is five.', show: 'm.0', focus: 'm.0' },
        { say: 'The across number gets bigger, so we move to the right. That is five units right.', show: ['m.1', 'ab.right'], focus: ['m.1', 'ab.right'] },
        { say: 'Next, look at the up numbers. They go from three to five. Five minus three is two, and the number gets bigger, so we move up.', show: ['m.2', 'm.3', 'ab.up'], focus: ['m.2', 'm.3', 'ab.up'] },
        { say: 'So to get from A to B, move five units right and two units up.', focus: ['ab.right', 'ab.up'] },
      ],
    },
    {
      chapter: 'Which number changes?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Move', 'Number that changes', 'How it changes'], rows: [['right', 'first', 'add'], ['left', 'first', 'subtract'], ['up', 'second', 'add'], ['down', 'second', 'subtract']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which number changes?', md: 'Right and left change only the **first** number. Up and down change only the **second** number.' },
      ],
      lines: [
        { say: 'Here is a handy rule. Moving right or left changes only the first number, the across number.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Moving right makes it bigger, so you add. Moving left makes it smaller, so you subtract.' },
        { say: 'Moving up or down changes only the second number, the up number. Moving up, you add. Moving down, you subtract.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'So you never need to change both numbers in one move.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Going back',
      layout: 'split',
      leftWidth: 560,
      left: [fromAtoB('ba', true)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Going the other way', md: 'From $B$ back to $A$ is **not** the same move. It is $5$ units **left** and $2$ units **down**.' }],
      lines: [
        { say: 'What about going from B back to A? Be careful: it is not the same move.', show: ['ba.grid', 'ba.axes', 'ba.A', 'ba.B'] },
        { say: 'The across number goes from seven back to two. It gets smaller by five, so move five units left.', show: 'ba.left', focus: 'ba.left' },
        { say: 'The up number goes from five back to three. It gets smaller by two, so move two units down.', show: 'ba.down', focus: 'ba.down' },
        { say: 'So from B to A is five units left and two units down. It is the opposite of the move from A to B.', show: 'oops' },
      ],
    },
    {
      chapter: 'Planning a path',
      layout: 'split',
      leftWidth: 560,
      left: [camp()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Tent: } (1,\\ 2)', '\\adj{\\text{6 right: }} 1 + 6 = 7', '\\text{Washroom: } (7,\\ 2)', '\\opp{\\text{4 up: }} 2 + 4 = 6', '\\text{Dock: } (7,\\ 6)'] }],
      lines: [
        { say: 'Some problems have more than one move. Do one move at a time, and write down the new point after each move.', show: ['camp.grid', 'camp.axes'] },
        { say: 'On a map of a campground, the tent is at one, two, as shown here. Kiona walks six units right to the washroom, then four units up to the dock. Where is the dock?', show: ['camp.tent', 'm.0'], focus: ['camp.tent', 'm.0'] },
        { say: 'Moving right changes the first number. One plus six is seven. So the washroom is at seven, two, on the same row as the tent.', show: ['camp.right', 'm.1', 'm.2', 'camp.wash'], focus: ['camp.right', 'm.1', 'm.2', 'camp.wash'] },
        { say: 'Next, moving up changes the second number. Two plus four is six. So the dock is at seven, six.', show: ['camp.up', 'm.3', 'm.4', 'camp.dock'], focus: ['camp.up', 'm.3', 'm.4', 'camp.dock'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Point $M$ is at $(3,\\ 8)$. You move $4$ units right, then $5$ units down. Where do you land?',
          choices: ['$(7,\\ 3)$', '$(7,\\ 13)$', '$(8,\\ 4)$', '$(4,\\ 5)$'],
          answer: 0,
          working: 'Right adds to the first number: $3 + 4 = 7$. Down subtracts from the second number: $8 - 5 = 3$. You land at $(7,\\ 3)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point M is at three, eight. You move four units right, then five units down. Where do you land? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seven, three. Moving right adds to the first number, and three plus four is seven. Moving down subtracts from the second number, and eight minus five is three. Choice B adds five instead of subtracting it, but moving down makes the number smaller.', show: 'q.answer' },
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
          items: ['Right and left change the first number: right adds, left subtracts.', 'Up and down change the second number: up adds, down subtracts.', 'Going back is the opposite move. For a path, do one move at a time.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Moving right or left changes the first number. Right adds, and left subtracts.', show: 'sum.0' },
        { say: 'Moving up or down changes the second number. Up adds, and down subtracts.', show: 'sum.1' },
        { say: 'Going back is the opposite move, and for a longer path, do one move at a time. Next, you will use points to draw shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
