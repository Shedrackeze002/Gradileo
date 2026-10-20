import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from './lib/m6-10-figures.ts';
import { note } from './lib/m6-9-figures.ts';

// Kai's 12 cubes: first 3 long, 2 wide and 2 high; then 6 long, 1 wide and 2 high. A third way,
// 4 long, 3 wide and 1 high, shows the same 12 cubes again.
const first = (labels = true) => cubes({ name: 'a', heights: [[2, 2, 2], [2, 2, 2]], tone: 'adj', labels: labels ? { l: '3', w: '2', h: '2' } : undefined });
const second = (h?: string, at?: [number, number]) => cubes({ name: 'b', heights: [[2, 2, 2, 2, 2, 2]], tone: 'good', at, labels: h ? { l: '6', w: '1', h } : undefined });

const video: Explainer = {
  id: 'm6-10-1-d',
  lessonId: 'm6-10-1',
  title: 'Volume and Cubic Units, Part 4: Volume Stays the Same',
  thumbnailTitle: 'Volume Stays the Same',
  thumbnail: 'all',
  summary: 'Rearranging all the same cubes into a new shape does not change the volume. A prism 3 cubes long, 2 wide and 2 high has 12 cubes; rebuilt 6 cubes long and 1 cube wide, each layer has 6 cubes, so it is 12 ÷ 6 = 2 cubes high, and its volume is still 12 cubes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 4', title: 'Volume Stays the Same', subtitle: 'The same cubes, a new shape' }],
      lines: [
        { say: 'Build something with twelve cubes. Now take it apart, and build something new with all twelve cubes. Has the volume changed?', show: 'title' },
        { say: 'In this video, you will rebuild a prism into a new shape, and use the volume to work out its height.' },
      ],
    },
    {
      chapter: 'The first prism',
      layout: 'split',
      leftWidth: 500,
      left: [figure('p1', [first()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{one layer: } 3 \\times 2 = 6', '\\text{two layers: } 6 \\times 2 = 12', '\\text{Volume} = 12 \\text{ cubes}'] }],
      lines: [
        { say: 'Kai built a prism three cubes long, two cubes wide and two cubes high.', show: ['p1.a-cubes', 'p1.a-l', 'p1.a-w', 'p1.a-h'] },
        { say: 'One layer is three cubes by two cubes. Three times two is six cubes.', show: 'm.0', focus: ['m.0', 'p1.a-l', 'p1.a-w'] },
        { say: 'There are two layers, so six times two is twelve. Kai’s prism has a volume of twelve cubes.', show: ['m.1', 'm.2'], focus: ['m.2', 'p1.a-h'] },
      ],
    },
    {
      chapter: 'A new prism',
      layout: 'split',
      leftWidth: 560,
      left: [figure('p2', [second('?')])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{one layer: } 6 \\times 1 = 6', '\\text{layers: } 12 \\div 6 = 2', '\\text{height} = 2 \\text{ cubes}', '\\text{Volume} = 12 \\text{ cubes}'] }],
      lines: [
        { say: 'Then Kai used all twelve cubes to build a new prism, six cubes long and one cube wide. How high is the new prism?', show: ['p2.b-cubes', 'p2.b-l', 'p2.b-w', 'p2.b-h'] },
        { say: 'One layer of the new prism has six times one, which is six cubes.', show: 'm.0', focus: ['m.0', 'p2.b-l'] },
        { say: 'Kai still has twelve cubes. How many layers of six make twelve? Twelve divided by six is two. So there are two layers.', show: 'm.1', focus: 'm.1' },
        { say: 'The new prism is two cubes high.', show: 'm.2', focus: ['m.2', 'p2.b-h'] },
        { say: 'Its volume is still twelve cubes. It looks different, but no cube was added or taken away.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Same cubes, same volume',
      layout: 'center',
      main: [
        figure(
          'all',
          [
            first(false),
            note('a-n', [1.9, -0.2], '12 \\text{ cubes}', 'below', 'theta'),
            second(undefined, [5.4, 0]),
            note('b-n', [8.6, -0.2], '12 \\text{ cubes}', 'below', 'theta'),
            cubes({ name: 'c', heights: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], tone: 'hyp', at: [13.6, 0] }),
            note('c-n', [16.3, -0.2], '12 \\text{ cubes}', 'below', 'theta'),
          ],
          340,
        ),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Volume stays the same', md: 'If you build a new shape with **all** the same cubes, the volume does **not** change.' },
      ],
      lines: [
        { say: 'Here are Kai’s two prisms, side by side. They look different, but they are made of the same twelve cubes.', show: ['all.a-cubes', 'all.a-n', 'all.b-cubes', 'all.b-n'] },
        { say: 'You could even build a third prism: four cubes long, three cubes wide and just one cube high. That is twelve cubes as well.', show: ['all.c-cubes', 'all.c-n'], focus: 'all.c-cubes' },
        { say: 'If you build a new shape with all the same cubes, the volume does not change. Volume counts the cubes, not the shape they make.', show: 'key', focus: 'all' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Mia builds a prism $4$ cubes long, $3$ cubes wide and $2$ cubes high. Then Mia uses all the cubes to build a new prism $4$ cubes long and $2$ cubes wide. How high is the new prism?',
          choices: ['$2$ cubes', '$3$ cubes', '$8$ cubes', '$24$ cubes'],
          answer: 1,
          working: 'First prism: $4 \\times 3 \\times 2 = 24$ cubes. One layer of the new prism: $4 \\times 2 = 8$ cubes. $24 \\div 8 = 3$, so it is $3$ cubes high.',
        },
      ],
      lines: [
        { say: 'Your turn. Mia builds a prism four cubes long, three cubes wide and two cubes high. Then Mia uses all the cubes to build a new prism four cubes long and two cubes wide. How high is the new prism? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, three cubes. The first prism has four times three times two, which is twenty-four cubes. One layer of the new prism has eight cubes, and twenty-four divided by eight is three. Choice A keeps the old height, but the layers are smaller now.', show: 'q.answer' },
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
          items: ['Rebuilding with all the same cubes does not change the volume.', 'To find a new height, divide the volume by the cubes in one layer.', 'Volume counts cubes, not the shape they make.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When you build a new shape with all the same cubes, the volume does not change.', show: 'sum.0' },
        { say: 'To find the height of the new prism, divide the volume by the number of cubes in one layer.', show: 'sum.1' },
        { say: 'Volume counts the cubes, not the shape they make. Great work! Next, you will find the volume of a prism by multiplying its length, width and height.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
