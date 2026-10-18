import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { spokes } from './lib/m303-3-figures.ts';

const video: Explainer = {
  id: 'm303-3-3-c',
  lessonId: 'm303-3-3',
  title: 'Problems with Polygons, Part 3: Central Angles',
  thumbnailTitle: 'Central Angles',
  thumbnail: 'gz',
  summary: 'Lines from the centre of a regular polygon to its corners split the 360° around the centre into n equal central angles of 360° ÷ n, and the polygon into n identical isosceles triangles. An octagonal gazebo floor of 8 sections has 45° at the centre and 67.5° at each outside corner, and two sections together make the 135° interior angle. Part 4 covers tiling.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 3', title: 'Central Angles', subtitle: 'Triangles from the centre' }],
      lines: [
        { say: 'Gazebo floors, round tables and some window designs are built from identical triangular sections that all meet at the middle.', show: 'title' },
        { say: 'In this video, you will find the angles of those sections, using the central angles of a regular polygon.' },
      ],
    },
    {
      chapter: 'Central angles',
      layout: 'split',
      left: [figure('ca', [spokes({ n: 8, central: '45^\\circ' })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Central angle', md: 'Lines from the centre of a regular polygon to its corners split the full $360^\\circ$ around the centre into $n$ equal **central angles** of $360^\\circ \\div n$.' },
      ],
      lines: [
        { say: 'Here is a regular octagon and its centre. Draw a line from the centre to every corner.', show: ['ca.shape', 'ca.O', 'ca.spokes'], focus: 'ca.spokes' },
        { say: 'The lines split the full turn around the centre, 360 degrees, into eight equal angles. Each one is called a central angle.', show: 'def' },
        { say: 'For the octagon, each central angle is 360 divided by eight, which is 45 degrees. For a regular polygon with n sides, it is 360 divided by n.', show: ['ca.tri', 'ca.c'], focus: 'ca.c' },
      ],
    },
    {
      chapter: 'Isosceles triangles',
      layout: 'split',
      left: [figure('it', [spokes({ n: 8 })])],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Triangles from the centre', md: 'The lines from the centre split a regular polygon into $n$ identical **isosceles** triangles: the two sides from the centre are equal, so the two angles at the outside corners are equal.' },
      ],
      lines: [
        { say: 'The lines from the centre also split the octagon into eight identical triangles.', show: ['it.shape', 'it.O', 'it.spokes', 'it.tri'], focus: 'it.tri' },
        { say: 'The centre is the same distance from every corner, so the two sides of each triangle that come from the centre are equal. Every triangle is isosceles.', show: 'key', focus: ['it.k0', 'it.k1'] },
        { say: 'That means the two angles at the outside corners of each triangle are equal: they are its base angles.', show: ['it.b1', 'it.b2'], focus: ['it.b1', 'it.b2'] },
      ],
    },
    {
      chapter: 'An octagonal gazebo floor',
      layout: 'split',
      left: [figure('gz', [spokes({ n: 8, central: '45^\\circ', base: '67.5^\\circ' })])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{centre: } 360^\\circ \\div 8 = 45^\\circ', '\\text{outside: } \\dfrac{180^\\circ - 45^\\circ}{2} = 67.5^\\circ', '2 \\times 67.5^\\circ = 135^\\circ \\;\\checkmark'],
        },
      ],
      lines: [
        { say: 'An octagonal gazebo floor is built from eight triangular sections that meet at the centre. Find the angle of each section at the centre, and its other two angles.', show: ['gz.shape', 'gz.O', 'gz.spokes', 'gz.tri'] },
        { say: 'The eight central angles share 360 degrees, so each section has 360 divided by eight, which is 45 degrees, at the centre.', show: ['m.0', 'gz.c'], focus: ['m.0', 'gz.c'] },
        { say: 'Each section is an isosceles triangle. Its angles add to 180, so the two equal angles share 180 minus 45, which is 135 degrees. Each one is half of 135: 67.5 degrees.', show: ['m.1', 'gz.b1', 'gz.b2'], focus: ['m.1', 'gz.b1', 'gz.b2'] },
        { say: 'Here is a check. Two sections meet at each corner of the octagon, so the corner angle is two times 67.5, which is 135 degrees. That is exactly the interior angle of a regular octagon.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Central and exterior angles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{central angle} = \\dfrac{360^\\circ}{n} = \\text{exterior angle}'] },
        { kind: 'table', id: 't', head: ['Regular polygon', 'Pentagon', 'Hexagon', 'Octagon'], rows: [['Central angle', '$72^\\circ$', '$60^\\circ$', '$45^\\circ$'], ['Outside angles of each section', '$54^\\circ$', '$60^\\circ$', '$67.5^\\circ$']] },
      ],
      lines: [
        { say: 'Notice that the central angle, 360 divided by n, is the same size as the exterior angle from the last lesson. Both come from sharing a full turn equally among n corners.', show: 'm', focus: 'm' },
        { say: 'For a pentagon, the central angle is seventy-two degrees, and each section has 54 degrees at its outside corners: half of 180 minus 72.', show: ['t.0', 't.1'], focus: 't' },
        { say: 'A hexagon’s sections have sixty degrees at the centre, and sixty at each outside corner, so they are equilateral triangles. And an octagon has 45 and 67.5.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the whole corner angle', md: 'The angle at an outside corner of one section is only **half** of the polygon’s interior angle, because two sections meet at every corner. For an octagon, it is $135^\\circ \\div 2 = 67.5^\\circ$, not $135^\\circ$.' },
      ],
      lines: [
        { say: 'Be careful at the outside corners. Two sections meet at each corner of the polygon, so each section gets only half of the interior angle.', show: 'oops' },
        { say: 'For the octagon, a section’s outside angle is half of 135, which is 67.5 degrees, not 135. A triangle with 135 and 45 degrees would already use all 180 degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table top is a regular pentagon made of 5 identical triangular pieces that meet at the centre. What angle does each piece have at each of its outside corners?',
          choices: ['$54^\\circ$', '$72^\\circ$', '$108^\\circ$', '$36^\\circ$'],
          answer: 0,
          working: 'Central angle: $360^\\circ \\div 5 = 72^\\circ$. Each outside angle: $\\dfrac{180^\\circ - 72^\\circ}{2} = 54^\\circ$. Check: $2 \\times 54^\\circ = 108^\\circ$, a pentagon’s interior angle.',
        },
      ],
      lines: [
        { say: 'Your turn. A table top is a regular pentagon made of five identical triangular pieces that meet at the centre. What angle does each piece have at each of its outside corners? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 54 degrees. The central angle is 360 divided by five, which is 72, and the other two angles share 180 minus 72, which is 108: 54 each. Choice B, 72 degrees, is the angle at the centre, not at the outside corners.', show: 'q.answer' },
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
            'Central angle of a regular polygon: $360^\\circ \\div n$.',
            'The triangles from the centre are isosceles, with equal angles at the outside corners.',
            'Two outside angles make the polygon’s interior angle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Lines from the centre of a regular polygon make n equal central angles of 360 divided by n.', show: 'sum.0' },
        { say: 'They split the polygon into identical isosceles triangles, with equal angles at the outside corners.', show: 'sum.1' },
        { say: 'And two of those outside angles together make the polygon’s interior angle. In the next part, we find out which tiles fit together to cover a floor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
