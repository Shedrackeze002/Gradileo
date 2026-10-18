import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// A triangle ABC with angle C between sides a and b, for the law itself.
const law = () =>
  figure('law', [
    oblique({
      corners: ['A', 'B', 'C'],
      angles: [50, 62],
      sides: { a: 'a', b: 'b', c: 'c' },
      angleLabels: { C: '' },
      pairs: { C: 'opp' },
    }),
  ]);

// b = 12 m, c = 9 m, ∠A = 58° (between them): a ≈ 10.5 m.
const sas = () =>
  figure('sas', [
    oblique({
      corners: ['C', 'A', 'B'],
      angles: [46.55, 58],
      sides: { b: '12\\text{ m}', c: '9\\text{ m}', a: 'a' },
      angleLabels: { A: '58^\\circ' },
      pairs: { A: 'opp' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-2',
  lessonId: 'm303-2-2',
  title: 'The Cosine Law, Part 1: Finding a Side',
  thumbnailTitle: 'The Cosine Law',
  thumbnail: 'sas',
  summary: 'When to use the cosine law (two sides and the contained angle, or three sides), the law c² = a² + b² − 2ab cos C and its link to the Pythagorean theorem, finding a from b = 12 m, c = 9 m and ∠A = 58° (a ≈ 10.5 m), and why 2bc cos A must be worked out before subtracting.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 1', title: 'The Cosine Law', subtitle: 'Two sides and the angle between them' }],
      lines: [
        { say: 'Sometimes no side comes with its opposite angle. A pipe fitter knows two pipe runs and the angle between them. A framer knows all three members of a truss, but no angles.', show: 'title' },
        { say: 'With no matching pair, the sine law cannot start. In this video, you will meet the cosine law, and use it to find a side.' },
      ],
    },
    {
      chapter: 'When to use it',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Two sides and the angle between them** (the contained angle), to find the third side.', '**All three sides**, to find an angle.', 'In both cases there is no matching pair, so the sine law cannot start.'],
        },
      ],
      lines: [
        { say: 'Use the cosine law when you know two sides and the angle between them, and you want the third side. The angle between two sides is called the contained angle.', show: 'b.0' },
        { say: 'Also use it when you know all three sides, and you want an angle. We will do that in part three.', show: 'b.1' },
        { say: 'In both cases, no side is known together with the angle across from it. There is no matching pair, so the sine law cannot start.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The cosine law',
      layout: 'split',
      leftWidth: 500,
      left: [law()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The cosine law', md: 'In any $\\triangle ABC$, $c^2 = a^2 + b^2 - 2ab\\cos C$. The side on the left is opposite the angle in the cosine.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a^2 = b^2 + c^2 - 2bc\\cos A', 'b^2 = a^2 + c^2 - 2ac\\cos B'] },
      ],
      lines: [
        { say: 'Here is the cosine law. In any triangle ABC, c squared equals "a" squared plus b squared, minus two "a" b cosine C.', show: ['law.shape', 'law.names', 'def'] },
        { say: 'The side on the left is across from the angle in the cosine: side c, and angle C.', show: 'law.C', focus: ['law.c', 'law.C'] },
        { say: 'The other two sides, "a" and b, are the two sides that meet at angle C. They are the ones that are squared, added and multiplied.', focus: ['law.a', 'law.b', 'law.C'] },
        { say: 'The same pattern works for any side. "a" squared equals b squared plus c squared, minus two b c cosine A. And b squared equals "a" squared plus c squared, minus two "a" c cosine B.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'A Pythagorean link',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C', '\\angle C = 90^\\circ: \\quad \\cos 90^\\circ = 0', 'c^2 = a^2 + b^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The Pythagorean theorem with a correction', md: 'The term $-2ab\\cos C$ corrects for the angle not being $90^\\circ$.' },
      ],
      lines: [
        { say: 'Look what happens if angle C is ninety degrees.', show: 'm.0' },
        { say: 'The cosine of ninety degrees is zero, so the last term disappears.', show: 'm.1', focus: 'm.1' },
        { say: 'Then the law is c squared equals "a" squared plus b squared: the Pythagorean theorem.', show: 'm.2', focus: 'm.2' },
        { say: 'So the cosine law is the Pythagorean theorem with a correction. The term, minus two "a" b cosine C, corrects for the angle not being ninety degrees.', show: 'tip' },
      ],
    },
    {
      chapter: 'Finding a side',
      layout: 'split',
      leftWidth: 460,
      left: [sas()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a^2 = b^2 + c^2 - 2bc\\cos A', 'a^2 = 12^2 + 9^2 - 2(12)(9)\\cos 58^\\circ', 'a^2 \\approx 144 + 81 - 114.46 = 110.54', 'a \\approx \\sqrt{110.54} \\approx 10.514', 'a \\approx 10.5\\text{ m}'] }],
      lines: [
        { say: 'In triangle ABC, side b is twelve metres, side c is nine metres, and angle A is 58 degrees. Determine side "a", to the nearest tenth of a metre.', show: ['sas.shape', 'sas.names', 'sas.A'] },
        { say: 'Angle A is between sides b and c: it is the contained angle. So use the form that starts with "a" squared, the side across from angle A.', show: 'm.0', focus: ['m.0', 'sas.A', 'sas.a'] },
        { say: 'Substitute. "a" squared equals twelve squared plus nine squared, minus two times twelve times nine times cosine 58.', show: 'm.1', focus: 'm.1' },
        { say: 'Work out each part. Twelve squared is 144, and nine squared is 81. Two times twelve times nine is 216, and 216 times cosine 58 is about 114.46.', show: 'm.2', focus: 'm.2' },
        { say: 'So "a" squared is about 144 plus 81 minus 114.46, which is 110.54. Take the square root: "a" is about 10.514, or 10.5 metres.', show: ['m.3', 'm.4'], focus: ['m.4', 'sas.a'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting before multiplying by the cosine', md: 'Do not work out $144 + 81 - 216 = 9$ and then multiply by $\\cos 58^\\circ$. The cosine belongs to the term $2bc\\cos A$ only. Find $2(12)(9)\\cos 58^\\circ$ first, then subtract it from $144 + 81$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{(144 + 81 - 216)\\cos 58^\\circ \\approx 4.77}', '\\good{144 + 81 - 114.46 = 110.54}'] },
      ],
      lines: [
        { say: 'Watch the order of operations. Do not work out 144 plus 81 minus 216 first, which is nine, and then multiply by cosine 58.', show: 'oops' },
        { say: 'That gives about 4.77, and a side of about 2.2 metres, which is far too short.', show: 'm.0', focus: 'm.0' },
        { say: 'The cosine belongs only to the last term, two b c cosine A. Find that product first, write it down, and then subtract it from 144 plus 81.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle PQR$, $q = 7\\text{ m}$, $r = 10\\text{ m}$ and $\\angle P = 40^\\circ$. Find side $p$, to the nearest tenth of a metre.',
          choices: ['$12.2\\text{ m}$', '$2.6\\text{ m}$', '$6.5\\text{ m}$', '$41.8\\text{ m}$'],
          answer: 2,
          working: '$p^2 = 7^2 + 10^2 - 2(7)(10)\\cos 40^\\circ \\approx 149 - 107.25 = 41.75$, so $p \\approx \\sqrt{41.75} \\approx 6.5\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle PQR, side q is seven metres, side r is ten metres, and angle P is forty degrees. Find side p, to the nearest tenth of a metre. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. p squared equals 49 plus 100, minus 140 cosine 40, which is about 41.75, so p is about 6.5 metres. Choice D forgets to take the square root at the end.', show: 'q.answer' },
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
            'Use the cosine law for two sides and the contained angle, or for three sides.',
            '$c^2 = a^2 + b^2 - 2ab\\cos C$: the side on the left is opposite the angle in the cosine.',
            'Work out $2ab\\cos C$ before you subtract.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use the cosine law when you know two sides and the contained angle, or all three sides.', show: 'sum.0' },
        { say: 'c squared equals "a" squared plus b squared, minus two "a" b cosine C. The side on the left is across from the angle in the cosine.', show: 'sum.1' },
        { say: 'And work out two "a" b cosine C before you subtract. In part two, we see what happens when the contained angle is obtuse. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
