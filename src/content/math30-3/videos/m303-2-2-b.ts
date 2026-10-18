import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// The same two sides, 6.5 m and 4.8 m, at 90° (third side ≈ 8.1 m) and at 124° (≈ 10.0 m), to scale.
const k = 0.5;
const compare = () =>
  figure(
    'cmp',
    [
      oblique({ name: 'r', corners: ['A', 'B', 'C'], angles: [53.56, 36.44], base: 8.08 * k, sides: { a: '6.5', b: '4.8', c: '8.1' }, angleLabels: { C: '90^\\circ' }, pairs: { C: 'opp' } }),
      oblique({ name: 'o', corners: ['A', 'B', 'C'], angles: [32.57, 23.43], base: 10.01 * k, at: [5.6, 0], sides: { a: '6.5', b: '4.8', c: '10.0' }, angleLabels: { C: '124^\\circ' }, pairs: { C: 'opp' } }),
    ],
    300,
  );

// a = 6.5 m, b = 4.8 m, ∠C = 124°: c ≈ 10.0 m.
const obtuse = () =>
  figure(
    'obt',
    [
      oblique({
        corners: ['B', 'C', 'A'],
        angles: [23.43, 124],
        sides: { a: '6.5\\text{ m}', b: '4.8\\text{ m}', c: 'c' },
        angleLabels: { C: '124^\\circ' },
        pairs: { C: 'opp' },
        labelDist: { C: 52 },
        arc: { C: 24 },
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm303-2-2-b',
  lessonId: 'm303-2-2',
  title: 'The Cosine Law, Part 2: An Obtuse Contained Angle',
  thumbnailTitle: 'The Cosine Law with an Obtuse Angle',
  thumbnail: 'obt',
  summary: 'Why an obtuse angle has a negative cosine, so the term −2ab cos C adds and the third side is longer: a = 6.5 m, b = 4.8 m and ∠C = 124° give c ≈ 10.0 m (against 8.1 m at a right angle), and how losing the negative sign gives a side too short to be opposite the largest angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 2', title: 'An Obtuse Contained Angle', subtitle: 'When the cosine is negative' }],
      lines: [
        { say: 'When the angle between two sides opens wide, the side across from it gets long. The cosine law shows this all by itself, because of one sign.', show: 'title' },
        { say: 'In this video, you will see that the cosine of an obtuse angle is negative, and use the cosine law when the contained angle is obtuse.' },
      ],
    },
    {
      chapter: 'Negative cosines',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Angle', 'Cosine'], rows: [['$60^\\circ$', '$0.5$'], ['$90^\\circ$', '$0$'], ['$120^\\circ$', '$-0.5$'], ['$124^\\circ$', '$\\approx -0.5592$']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'An obtuse angle has a negative cosine', md: 'So for an obtuse angle, $2ab\\cos C$ is negative, and subtracting it **adds**.' },
      ],
      lines: [
        { say: 'Find the cosines of a few angles on your calculator. The cosine of sixty degrees is 0.5.', show: 't.0', focus: 't.0' },
        { say: 'The cosine of ninety degrees is zero.', show: 't.1', focus: 't.1' },
        { say: 'Past ninety degrees, the cosine is negative. The cosine of 120 degrees is negative 0.5, and the cosine of 124 degrees is about negative 0.5592.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'So when angle C is obtuse, the term two "a" b cosine C is negative. Subtracting a negative number adds, so the third side comes out longer than it would be with a right angle.', show: 'key' },
      ],
    },
    {
      chapter: 'A wider angle, a longer side',
      layout: 'center',
      main: [compare()],
      lines: [
        { say: 'Here are two triangles with the same two sides, 6.5 metres and 4.8 metres. On the left, the angle between them is ninety degrees. The Pythagorean theorem gives a third side of about 8.1 metres.', show: ['cmp.r-shape', 'cmp.r-C'], focus: ['cmp.r-C', 'cmp.r-c'] },
        { say: 'On the right, the angle opens up to 124 degrees, and the third side stretches to about 10.0 metres. A wider angle means a longer side across from it.', show: ['cmp.o-shape', 'cmp.o-C'], focus: ['cmp.o-C', 'cmp.o-c'] },
      ],
    },
    {
      chapter: 'An obtuse contained angle',
      layout: 'center',
      main: [
        obtuse(),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['c^2 = 6.5^2 + 4.8^2 - 2(6.5)(4.8)\\cos 124^\\circ', '2(6.5)(4.8)\\cos 124^\\circ \\approx -34.89', 'c^2 \\approx 42.25 + 23.04 + 34.89 = 100.18', 'c \\approx \\sqrt{100.18} \\approx 10.0\\text{ m}'],
        },
      ],
      lines: [
        { say: 'In triangle ABC, side "a" is 6.5 metres, side b is 4.8 metres, and angle C is 124 degrees. Determine side c, to the nearest tenth of a metre.', show: ['obt.shape', 'obt.names', 'obt.C'] },
        { say: 'Angle C is between sides "a" and b, so use the form that starts with c squared. c squared equals 6.5 squared plus 4.8 squared, minus two times 6.5 times 4.8 times cosine 124.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the last term first. Two times 6.5 times 4.8 is 62.4, and 62.4 times cosine 124 is about negative 34.89.', show: 'm.1', focus: 'm.1' },
        { say: '6.5 squared is 42.25, and 4.8 squared is 23.04. Subtracting negative 34.89 is the same as adding 34.89. So c squared is about 42.25 plus 23.04 plus 34.89, which is 100.18.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the square root: c is about 10.009, or 10.0 metres. That is longer than both given sides, just as you would expect across a wide angle.', show: 'm.3', focus: ['m.3', 'obt.c'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing the negative sign', md: 'Subtracting $34.89$ instead of adding it gives $c \\approx 5.5\\text{ m}$, shorter than the $6.5\\text{ m}$ side. But $c$ is across from the largest angle, so it must be the longest side.' },
        { kind: 'calc', id: 'c', keys: '6.5²+4.8²−2×6.5×4.8×cos(124)', result: '100.1836372' },
      ],
      lines: [
        { say: 'A common slip is to lose the negative sign, and subtract 34.89. That gives c squared of about 30.40, and c of about 5.5 metres.', show: 'oops' },
        { say: 'Use the size check from the sine law. Angle C, 124 degrees, is the largest angle, so c must be the longest side. But 5.5 metres is shorter than 6.5 metres, so it cannot be right.' },
        { say: 'One way to avoid the slip: type the whole expression into your calculator, with cosine 124 inside it. The calculator keeps track of the sign for you.', show: 'c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle DEF$, $d = 5\\text{ cm}$, $e = 8\\text{ cm}$ and $\\angle F = 130^\\circ$. Find side $f$, to the nearest tenth of a centimetre.',
          choices: ['$11.9\\text{ cm}$', '$6.1\\text{ cm}$', '$9.4\\text{ cm}$', '$140.4\\text{ cm}$'],
          answer: 0,
          working: '$f^2 = 5^2 + 8^2 - 2(5)(8)\\cos 130^\\circ \\approx 89 + 51.42 = 140.42$, so $f \\approx 11.9\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle DEF, side d is five centimetres, side e is eight centimetres, and angle F is 130 degrees. Find side f, to the nearest tenth of a centimetre. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cosine of 130 degrees is negative, so the last term adds. f squared is 89 plus about 51.42, which is 140.42, and f is about 11.9 centimetres. Choice B subtracts 51.42, and gives a side shorter than e, across from the largest angle.', show: 'q.answer' },
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
            'An obtuse angle has a negative cosine.',
            'So $-2ab\\cos C$ adds, and the third side is longer than either given side.',
            'Check: the side across from the obtuse angle must be the longest side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An obtuse angle has a negative cosine.', show: 'sum.0' },
        { say: 'So in the cosine law, the last term adds, and the third side comes out longer than either given side.', show: 'sum.1' },
        { say: 'And always check: the side across from the obtuse angle must be the longest side. In part three, we use the cosine law to find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
