import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, pt, ring, sq, waterBelow } from './lib/m9-8-figures.ts';

type P = [number, number];

// The end of the pipe: a circle of radius 13 cm. The water surface is a chord 24 cm wide, 5 cm
// below the centre (√(13² − 12²) = 5), so the water is 13 − 5 = 8 cm deep. With the surface 5 cm
// above the centre instead, the water would be 13 + 5 = 18 cm deep.
const pipe = (id: string, y: number, o: { d?: boolean; tri?: boolean; depth?: string } = {}) => {
  const A: P = [-12, y];
  const B: P = [12, y];
  return figure(id, [
    waterBelow('water', [0, 0], 13, y),
    ring({ r: 13, centrePlace: y < 0 ? 'above' : 'right', fill: false, weight: 5 }),
    pt('A', A),
    pt('B', B),
    dot('M', [0, y], y < 0 ? 'below right' : 'above right', { tex: 'M' }),
    pt('W', [0, -13]),
    ln('surface', 'A', 'B', { tone: 'adj', label: '24\\text{ cm}', side: y < 0 ? 'left' : 'right', at: 0.25 }),
    ln('depth', 'M', 'W', { tone: 'theta', label: o.depth ?? 'h', side: 'right' }),
    ...(o.d ? [ln('om', 'O', 'M', { tone: 'opp', label: 'd', side: y < 0 ? 'right' : 'left' })] : []),
    ...(o.tri
      ? [
          ln('ob', 'O', 'B', { tone: 'hyp', label: '13', side: y < 0 ? 'left' : 'right' }),
          ln('mb', 'M', 'B', { tone: 'adj', label: '12', side: y < 0 ? 'right' : 'left', weight: 6 }),
          sq('rm', 'M', 'O', 'B'),
        ]
      : []),
  ]);
};

const video: Explainer = {
  id: 'm9-8-1-d',
  lessonId: 'm9-8-1',
  title: 'Chord Properties, Part 4: Water in a Pipe',
  thumbnailTitle: 'Water in a Pipe',
  thumbnail: 'fd',
  summary:
    'The surface of water in a round pipe is a chord of the circle at the end of the pipe. For a pipe with a radius of 13 cm and a water surface 24 cm wide, half the chord is 12 cm, so the surface is √(13² − 12²) = 5 cm from the centre. The pipe is less than half full, so the surface is below the centre and the water is 13 − 5 = 8 cm deep. If the pipe were more than half full, the depth would be 13 + 5 = 18 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 4', title: 'Water in a Pipe', subtitle: 'Solving problems with chords' }],
      lines: [
        { say: 'Chords show up in real problems. Look at the end of a round pipe with some water in it. The surface of the water is a chord of the circle.', show: 'title' },
        { say: 'In this part, you will use the chord property and the Pythagorean theorem to find how deep the water is.' },
      ],
    },
    {
      chapter: 'The problem',
      layout: 'split',
      leftWidth: 560,
      left: [pipe('pp', -5)],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'The end of a drainage pipe is a circle with a radius of $13$ cm. The top of the water is a chord $24$ cm wide, and the pipe is less than half full. How deep is the water?' }],
      lines: [
        { say: 'The end of a drainage pipe is a circle with a radius of thirteen centimetres. The top of the water is a chord twenty-four centimetres wide. The pipe is less than half full. How deep is the water?', show: ['q', 'pp.outline', 'pp.water'] },
        { say: 'Start with a sketch. Draw the circle and its centre, O. Draw the water surface as a chord. The pipe is less than half full, so the chord is below the centre.', show: ['pp.names', 'pp.surface'], focus: 'pp.surface' },
        { say: 'The depth is measured straight down, from the middle of the surface to the bottom of the pipe. Call it h.', show: ['pp.depth', 'pp.nM'], focus: 'pp.depth' },
      ],
    },
    {
      chapter: 'Finding the depth',
      layout: 'split',
      leftWidth: 560,
      left: [pipe('fd', -5, { d: true, tri: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{half chord} = 24 \\div 2 = 12', 'd = \\sqrt{13^2 - 12^2}', '= \\sqrt{169 - 144} = \\sqrt{25} = 5', 'h = 13 - 5 = 8 \\text{ cm}'] }],
      lines: [
        { say: 'Draw the perpendicular from the centre to the surface, O M. It cuts the chord into two equal parts, so half the chord is twelve centimetres.', show: ['fd.outline', 'fd.water', 'fd.names', 'fd.nM', 'fd.surface', 'fd.depth', 'fd.om', 'fd.rm', 'fd.mb', 'm.0'], focus: ['m.0', 'fd.mb'] },
        { say: 'Now draw the radius to one end of the chord. There is a right triangle, with the radius, thirteen, as its hypotenuse, and half the chord, twelve, as one of its other sides.', show: 'fd.ob', focus: ['fd.ob', 'fd.mb', 'fd.om'] },
        { say: 'The third side, d, is the distance from the centre to the surface. d is the square root of thirteen squared minus twelve squared.', show: 'm.1', focus: ['m.1', 'fd.om'] },
        { say: 'That is the square root of one hundred sixty-nine minus one hundred forty-four, which is the square root of twenty-five, or five. The surface is five centimetres below the centre.', show: 'm.2', focus: 'm.2' },
        { say: 'From the centre straight down to the bottom of the pipe is one radius: thirteen centimetres. The depth is the part of that below the surface. So h is thirteen minus five, which is eight.', show: 'm.3', focus: ['m.3', 'fd.depth'] },
        { say: 'The water is eight centimetres deep.' },
      ],
    },
    {
      chapter: 'More than half full?',
      layout: 'split',
      leftWidth: 560,
      left: [pipe('mh', 5, { d: true, depth: '18' })],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the problem carefully', md: 'A surface **below** the centre: depth $= r - d$. A surface **above** the centre: depth $= r + d$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['13 + 5 = 18 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Why did the problem say the pipe is less than half full? A chord twenty-four centimetres wide could also be five centimetres above the centre.', show: ['mh.outline', 'mh.water', 'mh.names', 'mh.nM', 'mh.surface', 'mh.om'] },
        { say: 'Then the pipe would be more than half full, and the depth would be the radius plus d: thirteen plus five, which is eighteen centimetres.', show: ['mh.depth', 'm'], focus: ['mh.depth', 'm'] },
        { say: 'So always read the problem carefully, and draw a sketch, to see whether the surface is below the centre or above it.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round pipe has a radius of $10$ cm. The water surface is a chord $16$ cm wide, and the pipe is less than half full. How deep is the water?',
          choices: ['$4$ cm', '$6$ cm', '$16$ cm', '$2$ cm'],
          answer: 0,
          working: 'Half the chord is $8$, so $d = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6$. The surface is below the centre, so the depth is $10 - 6 = 4$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A round pipe has a radius of ten centimetres. The water surface is a chord sixteen centimetres wide, and the pipe is less than half full. How deep is the water? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, four centimetres. Half the chord is eight, so the surface is the square root of one hundred minus sixty-four, or six centimetres, from the centre. The depth is ten minus six, which is four. Choice C adds six to the radius, which fits a pipe more than half full.', show: 'q.answer' },
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
            'Sketch the problem: the water surface is a chord.',
            'Half the chord, the radius and the distance $d$ make a right triangle: $d = \\sqrt{r^2 - (\\text{half chord})^2}$.',
            'Less than half full: depth $= r - d$.',
            'More than half full: depth $= r + d$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Start with a sketch. The water surface is a chord of the circle.', show: 'sum.0' },
        { say: 'Half the chord, the radius, and the distance from the centre make a right triangle, so you can find the distance with the Pythagorean theorem.', show: 'sum.1' },
        { say: 'If the pipe is less than half full, the depth is the radius minus that distance.', show: 'sum.2' },
        { say: 'If it is more than half full, add the distance instead. In the next lesson, you will meet the angles inside a circle. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
