import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { exteriors, fan, polygon, regularCorners } from './lib/m303-3-figures.ts';

const named = (v: [number, number][]) => Object.fromEntries(v.map((p, i) => [`v${i}`, p]));
const p15 = regularCorners(15, { r: 3 });
const p18 = regularCorners(18, { r: 3 });
const p12 = regularCorners(12, { r: 3 });

const video: Explainer = {
  id: 'm303-3-2-d',
  lessonId: 'm303-3-2',
  title: 'Angles in Regular Polygons, Part 4: Finding the Number of Sides',
  thumbnailTitle: 'Finding the Number of Sides',
  thumbnail: 'f15',
  summary: 'Working backwards from an angle to the number of sides of a regular polygon: n = 360° ÷ exterior angle (24° gives 15 sides), an interior angle of 160° gives an exterior angle of 20° and 18 sides, and an angle sum of 1800° solves 180(n − 2) = 1800 for 12 sides. A number of sides that is not a whole number means no such regular polygon exists.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 4', title: 'Finding the Number of Sides', subtitle: 'Working backwards from an angle' }],
      lines: [
        { say: 'Sometimes you know an angle of a regular polygon, and you need to know how many sides it has: to order the right number of pieces, or to check a design.', show: 'title' },
        { say: 'In this video, you will work backwards to the number of sides from an exterior angle, from an interior angle, and from the angle sum.' },
      ],
    },
    {
      chapter: 'From an exterior angle',
      layout: 'split',
      left: [figure('f15', [polygon({ corners: named(p15), names: false }), exteriors({ corners: p15, at: [2], label: '24^\\circ', ext: 0.45, r: 90, labelDist: 140 })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each exterior angle of a regular polygon is $24^\\circ$. How many sides does it have?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['n \\times 24^\\circ = 360^\\circ', 'n = 360^\\circ \\div 24^\\circ = 15'] },
      ],
      lines: [
        { say: 'Each exterior angle of a regular polygon is 24 degrees. How many sides does it have?', show: ['q', 'f15.shape', 'f15.x2'], focus: 'f15.e2' },
        { say: 'There is one exterior angle at each corner, and together they add to 360 degrees. So n angles of 24 degrees make 360.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide: 360 divided by 24 is fifteen. The polygon has fifteen sides.', show: 'm.1', focus: 'm.1' },
        { say: 'So from an exterior angle, the number of sides is 360 divided by the exterior angle.' },
      ],
    },
    {
      chapter: 'From an interior angle',
      layout: 'split',
      left: [figure('f18', [polygon({ corners: named(p18), names: false }), exteriors({ corners: p18, at: [2], label: '20^\\circ', interior: '160^\\circ', ext: 0.45, r: 90, labelDist: 140 })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each interior angle of a regular polygon is $160^\\circ$. How many sides does it have?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{exterior} = 180^\\circ - 160^\\circ = 20^\\circ', 'n = 360^\\circ \\div 20^\\circ = 18', '\\text{check: } \\dfrac{180^\\circ(16)}{18} = 160^\\circ \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Each interior angle of a regular polygon is 160 degrees. How many sides does it have?', show: ['q', 'f18.shape', 'f18.in2'], focus: 'f18.in2' },
        { say: 'Find the exterior angle first. The interior and exterior angles add to 180, so the exterior angle is 180 minus 160, which is twenty degrees.', show: ['m.0', 'f18.x2'], focus: ['m.0', 'f18.e2'] },
        { say: 'Now divide 360 by twenty: eighteen. The polygon has eighteen sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the interior angle formula: 180 times eighteen minus two, which is sixteen, divided by eighteen, is 160 degrees. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From the angle sum',
      layout: 'split',
      left: [figure('f12', [fan({ corners: p12, numbers: false }), polygon({ corners: named(p12), names: false, shade: 0 })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The interior angles of a polygon add to $1800^\\circ$. How many sides does it have?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['180(n - 2) = 1800', 'n - 2 = 1800 \\div 180 = 10', 'n = 12'] },
      ],
      lines: [
        { say: 'The interior angles of a polygon add to 1,800 degrees. How many sides does it have?', show: ['q', 'f12.shape'] },
        { say: 'The angle sum is 180 times n minus two, so write an equation: 180 times n minus two equals 1,800.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by 180: n minus two equals ten. So the polygon splits into ten triangles.', show: ['m.1', 'f12.diags', 'f12.t1', 'f12.t2', 'f12.t3', 'f12.t4', 'f12.t5', 'f12.t6', 'f12.t7', 'f12.t8', 'f12.t9', 'f12.t10'], focus: 'm.1' },
        { say: 'Add two to both sides: n equals twelve. The polygon has twelve sides.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is n a whole number?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that n is a whole number', md: 'A polygon must have a whole number of sides. If $360^\\circ$ divided by your exterior angle is not a whole number, recheck your work: no regular polygon has that angle.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['360^\\circ \\div 25^\\circ = 14.4 \\quad \\bad{\\text{not a polygon}}', '360^\\circ \\div 30^\\circ = 12 \\quad \\good{\\text{a 12-sided polygon}}'] },
      ],
      lines: [
        { say: 'Always check your answer. A polygon must have a whole number of sides: you cannot have 14.4 sides.', show: 'tip' },
        { say: 'So if someone claims a regular polygon has exterior angles of 25 degrees, divide: 360 divided by 25 is 14.4. That is not a whole number, so no regular polygon has that angle.', show: 'm.0', focus: 'm.0' },
        { say: 'An exterior angle of 30 degrees is fine: 360 divided by 30 is twelve, a regular polygon with twelve sides.', show: 'm.1', focus: 'm.1' },
        { say: 'If you get a number that is not whole, recheck your work. Often the mistake is dividing 360 by the interior angle instead of the exterior angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each interior angle of a regular polygon is $165^\\circ$. How many sides does it have?',
          choices: ['$12$', '$15$', '$22$', '$24$'],
          answer: 3,
          working: 'Exterior angle: $180^\\circ - 165^\\circ = 15^\\circ$. Number of sides: $360^\\circ \\div 15^\\circ = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each interior angle of a regular polygon is 165 degrees. How many sides does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 24 sides. The exterior angle is 180 minus 165, which is fifteen degrees, and 360 divided by fifteen is 24. Choice B, fifteen, is the exterior angle in degrees, not the number of sides.', show: 'q.answer' },
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
            'From an exterior angle: $n = 360^\\circ \\div$ exterior angle.',
            'From an interior angle: find the exterior angle, $180^\\circ -$ interior, first.',
            'From the angle sum: solve $180(n - 2) =$ sum.',
            'A regular polygon must have a whole number of sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. From an exterior angle, the number of sides is 360 divided by the exterior angle.', show: 'sum.0' },
        { say: 'From an interior angle, find the exterior angle first: 180 minus the interior angle. Then divide 360 by it.', show: 'sum.1' },
        { say: 'From the angle sum, solve 180 times n minus two, equals the sum.', show: 'sum.2' },
        { say: 'And check that the number of sides is a whole number. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
