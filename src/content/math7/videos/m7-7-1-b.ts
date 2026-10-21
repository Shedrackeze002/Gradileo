import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// The lesson's circle: radii pointing up (90°), down to the left (200°) and to the right (350°),
// so the central angles are 110°, 150° and x = 100°.
const three = (id: string, x: string) =>
  figure(
    id,
    [
      disc({
        r: 4,
        rays: [90, 200, 350],
        angles: [
          { id: 'a', from: 0, to: 1, label: '110^\\circ', r: 50, labelDist: 95 },
          { id: 'b', from: 1, to: 2, label: '150^\\circ', r: 50, labelDist: 95 },
          { id: 'x', from: 2, to: 0, label: x, r: 50, labelDist: 95 },
        ],
      }),
    ],
    440,
  );

// A pizza cut into 8 equal slices: radii every 45°, one central angle marked.
const pizza = (id: string) =>
  figure(id, [disc({ r: 4, tone: 'theta', shade: 0.2, rays: [0, 45, 90, 135, 180, 225, 270, 315], angles: [{ id: 'a', from: 0, to: 1, label: '45^\\circ', r: 55, labelDist: 120 }] })], 400);

const video: Explainer = {
  id: 'm7-7-1-b',
  lessonId: 'm7-7-1',
  title: 'Radius, Diameter and Circumference, Part 2: Central Angles',
  thumbnailTitle: 'Central Angles',
  thumbnail: 'ca',
  summary:
    'A central angle has its vertex at the centre of a circle, and its arms are two radii. The central angles around the centre add to 360°, one full turn: with 110° and 150°, the third angle is 360° − 260° = 100°. A pizza cut into 8 equal slices has 8 equal central angles of 360° ÷ 8 = 45°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 2', title: 'Central Angles', subtitle: 'All the way round is 360 degrees' }],
      lines: [
        { say: 'When you cut a pizza into slices, every cut goes through the centre. The slices meet at the centre, and each one has an angle there.', show: 'title' },
        { say: 'In this video, you will learn about these angles, called central angles, and what they add up to.' },
      ],
    },
    {
      chapter: 'Central angles',
      layout: 'split',
      leftWidth: 560,
      left: [three('ca', 'x')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Central angle', md: 'A **central angle** has its vertex at the **centre** of a circle, and its arms are two **radii**.' }],
      lines: [
        { say: 'Here is a circle with three radii drawn from its centre.', show: ['ca.shape', 'ca.centre', 'ca.rays'] },
        { say: 'Two radii make an angle at the centre. An angle like this is called a central angle. Its vertex, the corner, is at the centre of the circle, and its arms are two radii.', show: ['def', 'ca.a'], focus: 'ca.a' },
        { say: 'This central angle is one hundred ten degrees.', focus: 'ca.a' },
        { say: 'There are two more central angles here. One is one hundred fifty degrees, and we do not know the other one yet. We call it x.', show: ['ca.b', 'ca.x'], focus: ['ca.b', 'ca.x'] },
      ],
    },
    {
      chapter: 'A full turn',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Central angles add to 360°', md: 'The central angles around the centre of a circle add to $360^\\circ$, one full turn.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['110^\\circ + 150^\\circ + x = 360^\\circ'] },
      ],
      lines: [
        { say: 'Imagine standing at the centre of the circle, facing along one radius. Turn until you face the next radius, then the next, and keep going until you face the first radius again.', show: 'key' },
        { say: 'You have turned all the way round, one full turn. A full turn is three hundred sixty degrees.' },
        { say: 'So the central angles around the centre of a circle always add to three hundred sixty degrees. Here: one hundred ten degrees, plus one hundred fifty degrees, plus x, equals three hundred sixty degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A missing central angle',
      layout: 'split',
      leftWidth: 560,
      left: [three('ms', 'x = 100^\\circ')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['110^\\circ + 150^\\circ + x = 360^\\circ', '260^\\circ + x = 360^\\circ', 'x = 360^\\circ - 260^\\circ', 'x = 100^\\circ'] }],
      lines: [
        { say: 'Let’s find x. The three central angles add to three hundred sixty degrees.', show: ['ms.shape', 'ms.centre', 'ms.rays', 'ms.a', 'ms.b', 'm.0'] },
        { say: 'First add the two angles we know. One hundred ten plus one hundred fifty is two hundred sixty degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The angle x is whatever is left of the full turn. Three hundred sixty minus two hundred sixty is one hundred degrees.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So x equals one hundred degrees.', show: 'ms.x', focus: 'ms.x' },
      ],
    },
    {
      chapter: 'Equal slices',
      layout: 'split',
      leftWidth: 560,
      left: [pizza('pz')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['360^\\circ \\div 8 = 45^\\circ'] }, { kind: 'text', id: 't', size: 'md', md: 'Each of the $8$ equal slices has a central angle of $45^\\circ$.' }],
      lines: [
        { say: 'A pizza is cut into eight equal slices, all from the centre.', show: ['pz.shape', 'pz.centre', 'pz.rays'] },
        { say: 'The eight central angles are all equal, and together they make a full turn of three hundred sixty degrees.' },
        { say: 'So each one is three hundred sixty divided by eight, which is forty-five degrees.', show: ['pz.a', 'm.0', 't'], focus: ['pz.a', 'm.0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three central angles of a circle are $90^\\circ$, $125^\\circ$ and $x$. Find $x$.',
          choices: ['$35^\\circ$', '$215^\\circ$', '$145^\\circ$', '$235^\\circ$'],
          answer: 2,
          working: 'The central angles add to $360^\\circ$: $90^\\circ + 125^\\circ = 215^\\circ$, so $x = 360^\\circ - 215^\\circ = 145^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Three central angles of a circle are ninety degrees, one hundred twenty-five degrees and x. Find x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one hundred forty-five degrees. Ninety plus one hundred twenty-five is two hundred fifteen, and three hundred sixty minus two hundred fifteen is one hundred forty-five. Choice B adds the two angles, but forgets to take them away from the full turn.', show: 'q.answer' },
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
          items: ['A **central angle** has its vertex at the centre, and two radii as its arms.', 'The central angles of a circle add to $360^\\circ$.', 'To find a missing central angle, subtract the others from $360^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A central angle has its vertex at the centre of a circle, and two radii as its arms.', show: 'sum.0' },
        { say: 'The central angles around the centre add to three hundred sixty degrees, one full turn.', show: 'sum.1' },
        { say: 'To find a missing central angle, subtract the others from three hundred sixty degrees. In the next part, you will measure the distance around a circle, and meet a very special number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
