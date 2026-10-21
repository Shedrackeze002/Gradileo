import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, arcOn, ln, on, ring, sq, ticks } from './lib/m9-8-figures.ts';

const R = 4;

// AB is a diameter (A at 180°, B at 0°). C at 64° makes ∠CAB = 32° and ∠ABC = 58°, and ∠ACB = 90°.
// D at 140° is a second point, with its own right angle.
const semi = (id: string, o: { a?: string; b?: string; d?: boolean } = {}) =>
  figure(id, [
    ring({ r: R, pts: { A: 180, B: 0, C: 64, ...(o.d ? { D: 140 } : {}) }, centrePlace: 'above', places: { A: 'left', B: 'right' } }),
    ln('ab', 'A', 'B', { tone: 'adj' }),
    arcOn('st', [0, 0], 0.75, 180, 360, { tone: 'adj', weight: 3, label: '180^\\circ', side: 'right', group: 'straight' }),
    ln('ca', 'C', 'A', { tone: 'opp', group: 'c' }),
    ln('cb', 'C', 'B', { tone: 'opp', group: 'c' }),
    sq('rc', 'C', 'A', 'B', 'c'),
    ...(o.a ? [ang('aa', 'A', 'C', 'B', { label: o.a, r: 50 })] : []),
    ...(o.b ? [ang('ab-b', 'B', 'A', 'C', { label: o.b, r: 40, tone: 'good' })] : []),
    ...(o.d ? [ln('da', 'D', 'A', { tone: 'good', group: 'd' }), ln('db', 'D', 'B', { tone: 'good', group: 'd' }), sq('rd', 'D', 'A', 'B', 'd')] : []),
  ]);

// Two radii OA and OB make an isosceles triangle: ∠AOB = 100°, so ∠OAB = ∠OBA = 40°.
const iso = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { A: 220, B: 320 }, centrePlace: 'above' }),
    ln('oa', 'O', 'A', { tone: 'adj' }),
    ln('ob', 'O', 'B', { tone: 'adj' }),
    ln('ab', 'A', 'B', { tone: 'opp' }),
    ticks('ta', [0, 0], on([0, 0], R, 220), 1, 0.45),
    ticks('tb', [0, 0], on([0, 0], R, 320), 1, 0.45),
    ang('o', 'O', 'A', 'B', { label: '100^\\circ', r: 32, dist: 64, tone: 'adj' }),
    ang('a', 'A', 'O', 'B', { label: '40^\\circ', r: 44, group: 'base' }),
    ang('b', 'B', 'A', 'O', { label: '40^\\circ', r: 44, group: 'base' }),
  ]);

const video: Explainer = {
  id: 'm9-8-2-d',
  lessonId: 'm9-8-2',
  title: 'Inscribed and Central Angles, Part 4: Angles in a Semicircle',
  thumbnailTitle: 'Angles in a Semicircle',
  thumbnail: 'rt',
  summary:
    'When AB is a diameter, the central angle AOB is a straight angle, 180°, so any inscribed angle standing on it is 180° ÷ 2 = 90°. The semicircle property: an angle inscribed in a semicircle is a right angle. If AB is a diameter and ∠CAB = 32°, then ∠ACB = 90° and ∠ABC = 180° − 90° − 32° = 58°. Two radii make an isosceles triangle: if ∠AOB = 100°, then ∠OAB = ∠OBA = 40°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 4', title: 'Angles in a Semicircle', subtitle: 'Always a right angle' }],
      lines: [
        { say: 'What happens when the arc is exactly half of the circle? Then the inscribed angle is always the same size: a right angle.', show: 'title' },
        { say: 'In this part, you will learn the semicircle property, and use it with the angles of a triangle.' },
      ],
    },
    {
      chapter: 'The semicircle property',
      layout: 'split',
      leftWidth: 560,
      left: [semi('sp', { d: true })],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Semicircle property', md: 'An angle inscribed in a **semicircle** is a **right angle**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle AOB = 180^\\circ', '\\angle ACB = 180^\\circ \\div 2 = 90^\\circ'] },
      ],
      lines: [
        { say: 'A semicircle is half of a circle. Here, A B is a diameter, so it cuts the circle into two semicircles.', show: ['sp.fill', 'sp.outline', 'sp.nA', 'sp.nB', 'sp.nO', 'sp.ab'], focus: 'sp.ab' },
        { say: 'Think of A O B as a central angle. Its arms point in opposite directions, so it is a straight angle: one hundred eighty degrees.', show: ['sp.straight', 'm.0'], focus: ['sp.straight', 'm.0'] },
        { say: 'Now put a point C on the circle, and draw the inscribed angle A C B. It stands on the semicircle below the diameter, so it is half of the straight angle. One hundred eighty divided by two is ninety.', show: ['sp.nC', 'sp.c', 'm.1'], focus: ['sp.c', 'm.1'] },
        { say: 'The semicircle property says: an angle inscribed in a semicircle is a right angle.', show: 'k' },
        { say: 'It does not matter where the vertex is. Put it at D instead, and angle A D B is a right angle as well.', show: ['sp.nD', 'sp.d'], focus: 'sp.d' },
      ],
    },
    {
      chapter: 'A right triangle in a circle',
      layout: 'split',
      leftWidth: 560,
      left: [semi('rt', { a: '32^\\circ', b: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$AB$ is a diameter and $\\angle CAB = 32^\\circ$. Find $x = \\angle ABC$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ACB = 90^\\circ', 'x = 180^\\circ - 90^\\circ - 32^\\circ', 'x = 58^\\circ'] },
      ],
      lines: [
        { say: 'A B is a diameter, and angle C A B is thirty-two degrees. Find x, angle A B C.', show: ['rt.fill', 'rt.outline', 'rt.names', 'rt.ab', 'rt.ca', 'rt.cb', 'rt.aa', 'rt.ab-b', 'q'] },
        { say: 'Step one: angle A C B is inscribed in a semicircle, so it is ninety degrees.', show: ['rt.rc', 'm.0'], focus: ['rt.rc', 'm.0'] },
        { say: 'Step two: the angles of a triangle add to one hundred eighty degrees. So x equals one hundred eighty, minus ninety, minus thirty-two.', show: 'm.1', focus: 'm.1' },
        { say: 'One hundred eighty minus ninety is ninety, and ninety minus thirty-two is fifty-eight. x is fifty-eight degrees.', show: 'm.2', focus: ['m.2', 'rt.ab-b'] },
      ],
    },
    {
      chapter: 'Look for radii',
      layout: 'split',
      leftWidth: 560,
      left: [iso('is')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for radii', md: 'Two radii make an **isosceles** triangle with the centre, so its two base angles are **equal**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['180^\\circ - 100^\\circ = 80^\\circ', '80^\\circ \\div 2 = 40^\\circ'] },
      ],
      lines: [
        { say: 'Here is one more useful idea. Any two radii of a circle are equal. So a triangle with two radii as its sides has two equal sides. It is an isosceles triangle.', show: ['is.fill', 'is.outline', 'is.names', 'is.oa', 'is.ob', 'is.ab', 'is.ta', 'is.tb', 'tip'], focus: ['is.ta', 'is.tb'] },
        { say: 'In an isosceles triangle, the two base angles, across from the equal sides, are equal as well.' },
        { say: 'Here, angle A O B is one hundred degrees. The other two angles share what is left. One hundred eighty minus one hundred is eighty.', show: ['is.o', 'm.0'], focus: ['is.o', 'm.0'] },
        { say: 'And eighty divided by two is forty. So angle O A B and angle O B A are each forty degrees.', show: ['is.base', 'm.1'], focus: ['is.base', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$AB$ is a diameter of a circle, and $C$ is another point on the circle. $\\angle ABC = 55^\\circ$. Find $\\angle CAB$.',
          choices: ['$55^\\circ$', '$125^\\circ$', '$45^\\circ$', '$35^\\circ$'],
          answer: 3,
          working: '$\\angle ACB = 90^\\circ$ (inscribed in a semicircle), so $\\angle CAB = 180^\\circ - 90^\\circ - 55^\\circ = 35^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A B is a diameter of a circle, and C is another point on the circle. Angle A B C is fifty-five degrees. Find angle C A B. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D, thirty-five degrees. Angle A C B is inscribed in a semicircle, so it is ninety degrees. Then one hundred eighty, minus ninety, minus fifty-five, is thirty-five. Choice B, one hundred twenty-five degrees, forgets the right angle, and only takes fifty-five away from one hundred eighty.', show: 'q.answer' },
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
            'An angle inscribed in a semicircle is a **right angle**.',
            'Then use the angle sum of a triangle, $180^\\circ$.',
            'Two radii make an isosceles triangle, with equal base angles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An angle inscribed in a semicircle is always a right angle.', show: 'sum.0' },
        { say: 'Once you know the right angle, the angles of the triangle add to one hundred eighty degrees.', show: 'sum.1' },
        { say: 'And two radii make an isosceles triangle with the centre, so its base angles are equal. In the next lesson, you will meet lines that just touch a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
