import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { polygon, regularCorners } from './lib/m303-3-figures.ts';

/** A regular hexagon, corners A to F anticlockwise from the bottom left. */
const hex = Object.fromEntries(regularCorners(6, { r: 2 }).map((p, i) => ['ABCDEF'[i], p]));
const allSides = { AB: 1, BC: 1, CD: 1, DE: 1, EF: 1, FA: 1 };

const video: Explainer = {
  id: 'm303-3-2-b',
  lessonId: 'm303-3-2',
  title: 'Angles in Regular Polygons, Part 2: Interior Angles of Regular Polygons',
  thumbnailTitle: 'Interior Angles of Regular Polygons',
  thumbnail: 'rg',
  summary: 'A regular polygon has equal sides and equal angles, so each interior angle is the angle sum shared equally: 180°(n − 2) ÷ n. A hex nut has angles of 720° ÷ 6 = 120°, a regular pentagon 108° and a regular octagon 135°, and 360° ÷ 6 = 60° is the exterior angle, not the interior one. Part 3 covers exterior angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 2', title: 'Interior Angles of Regular Polygons', subtitle: 'Sharing the angle sum equally' }],
      lines: [
        { say: 'A hex nut, a floor tile or a gazebo floor is often a regular polygon, with every corner the same. To make one, you need the angle at each corner.', show: 'title' },
        { say: 'In this video, you will find each interior angle of a regular polygon from its number of sides.' },
      ],
    },
    {
      chapter: 'Regular polygons',
      layout: 'split',
      left: [figure('rg', [polygon({ corners: hex, ticks: allSides, names: false, angles: ['A', 'B', 'C', 'D', 'E', 'F'].map((at) => ({ at, tone: 'theta' as const })) })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regular polygon', md: 'A **regular polygon** has all its sides equal **and** all its angles equal.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{each angle} = \\dfrac{180^\\circ(n - 2)}{n}'] },
      ],
      lines: [
        { say: 'A regular polygon has all its sides equal, and all its angles equal. This regular hexagon has six equal sides, shown by the tick marks.', show: ['rg.shape', 'rg.ticks', 'def'], focus: 'rg.ticks' },
        { say: 'And its six interior angles are all equal too.', show: ['rg.aA', 'rg.aB', 'rg.aC', 'rg.aD', 'rg.aE', 'rg.aF'], focus: ['rg.aA', 'rg.aB', 'rg.aC', 'rg.aD', 'rg.aE', 'rg.aF'] },
        { say: 'You already know that the angles of a polygon with n sides add to 180 times n minus two. In a regular polygon, that total is shared equally among n angles.', focus: 'rg' },
        { say: 'So each interior angle is 180 times n minus two, divided by n.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A hex nut',
      layout: 'split',
      left: [figure('nut', [polygon({ corners: hex, ticks: allSides, names: false, angles: [{ at: 'B', label: '?', id: 'q' }, { at: 'B', label: '120^\\circ', id: 'v' }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{sum} = 180^\\circ(6 - 2) = 720^\\circ', '\\text{each} = 720^\\circ \\div 6 = 120^\\circ'] }],
      lines: [
        { say: 'A hex nut is a regular hexagon. What is each interior angle?', show: ['nut.shape', 'nut.ticks', 'nut.q'], focus: 'nut.q' },
        { say: 'First, the angle sum. A hexagon has six sides, so its angles add to 180 times six minus two: 180 times four, which is 720 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'The six angles are equal, so each one is 720 divided by six, which is 120 degrees.', show: ['m.1', 'nut.v'], hide: 'nut.q', focus: ['m.1', 'nut.v'] },
        { say: 'Does that look right? Each corner of a hex nut is clearly wider than a right angle, and 120 degrees is wider than 90. It makes sense.' },
      ],
    },
    {
      chapter: 'More regular polygons',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{pentagon: } \\dfrac{180^\\circ(5 - 2)}{5} = \\dfrac{540^\\circ}{5} = 108^\\circ', '\\text{octagon: } \\dfrac{180^\\circ(8 - 2)}{8} = \\dfrac{1080^\\circ}{8} = 135^\\circ'] },
        {
          kind: 'table',
          id: 't',
          head: ['Regular polygon', 'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Octagon'],
          rows: [['Each interior angle', '$60^\\circ$', '$90^\\circ$', '$108^\\circ$', '$120^\\circ$', '$135^\\circ$']],
        },
      ],
      lines: [
        { say: 'Try a regular pentagon. Its angles add to 540 degrees, and 540 divided by five is 108 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'A regular octagon’s angles add to 1,080 degrees, and 1,080 divided by eight is 135 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Put them in order. An equilateral triangle has sixty-degree angles, and a square has ninety. Then the pentagon has 108, the hexagon 120, and the octagon 135.', show: 't', focus: 't' },
        { say: 'The more sides a regular polygon has, the wider each angle is. But each angle always stays below 180 degrees.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing 360° for the interior angle', md: '$360^\\circ \\div 6 = 60^\\circ$ is the **exterior** angle of a regular hexagon (and the angle at its centre), not the interior angle. A hexagon’s corners are clearly wider than $90^\\circ$, so $60^\\circ$ cannot be right.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['360^\\circ \\div 6 = \\bad{60^\\circ} \\qquad \\dfrac{720^\\circ}{6} = \\good{120^\\circ}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide 360 degrees by the number of sides. For a hexagon, that gives sixty degrees.', show: 'oops' },
        { say: 'But sixty degrees is a different angle: the exterior angle, which comes in the next part. The interior angle of a regular hexagon is 720 divided by six, which is 120 degrees.', show: 'm', focus: 'm' },
        { say: 'A quick look catches the mistake. The corners of a hexagon are clearly wider than a right angle, so sixty degrees cannot be right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is each interior angle of a regular decagon (10 sides)?',
          choices: ['$36^\\circ$', '$160^\\circ$', '$144^\\circ$', '$1440^\\circ$'],
          answer: 2,
          working: 'Angle sum: $180^\\circ(10 - 2) = 1440^\\circ$. Each angle: $1440^\\circ \\div 10 = 144^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is each interior angle of a regular decagon, with ten sides? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 144 degrees. The angles add to 180 times eight, which is 1,440 degrees, and 1,440 divided by ten is 144. Choice A, 36 degrees, is 360 divided by ten: an exterior angle, not an interior one.', show: 'q.answer' },
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
            'A regular polygon has equal sides and equal angles.',
            'Each interior angle is $\\dfrac{180^\\circ(n - 2)}{n}$: the angle sum shared equally.',
            '$360^\\circ \\div n$ is not the interior angle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A regular polygon has all its sides equal, and all its angles equal.', show: 'sum.0' },
        { say: 'So each interior angle is the angle sum shared equally: 180 times n minus two, divided by n.', show: 'sum.1' },
        { say: 'And 360 divided by n is not the interior angle. In the next part, we find out what it is: the exterior angle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
