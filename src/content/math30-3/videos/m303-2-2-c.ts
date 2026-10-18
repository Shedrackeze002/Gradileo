import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// p = 6 cm, q = 8 cm, r = 12 cm: ∠P ≈ 26.4°, ∠R ≈ 117.3°, ∠Q ≈ 36.3°.
const pqr = (id: string, show: 'P' | 'R') =>
  figure(id, [
    oblique({
      corners: ['P', 'Q', 'R'],
      angles: [26.38, 36.34],
      sides: { p: '6\\text{ cm}', q: '8\\text{ cm}', r: '12\\text{ cm}' },
      angleLabels: show === 'P' ? { P: '?' } : { P: '26.4^\\circ', R: '?' },
      pairs: show === 'P' ? { P: 'opp' } : { R: 'opp' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-2-c',
  lessonId: 'm303-2-2',
  title: 'The Cosine Law, Part 3: Finding an Angle',
  thumbnailTitle: 'Finding an Angle from Three Sides',
  thumbnail: 'big',
  summary: 'Rearranging the cosine law to cos C = (a² + b² − c²)/2ab, where the side opposite the angle is subtracted, and finding the angles of a triangle with sides 6, 8 and 12 cm: ∠P ≈ 26.4° and the largest angle ∠R ≈ 117.3°, an obtuse angle that the negative cosine reveals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 3', title: 'Finding an Angle', subtitle: 'Three sides, no angles' }],
      lines: [
        { say: 'A framer knows the lengths of all three members of a truss, but none of its angles. With three sides, the cosine law can find every angle.', show: 'title' },
        { say: 'In this video, you will rearrange the cosine law to find an angle, and see why it is the safest way to find the largest angle of a triangle.' },
      ],
    },
    {
      chapter: 'Rearranging the law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C', '2ab\\cos C = a^2 + b^2 - c^2', '\\cos C = \\dfrac{a^2 + b^2 - \\opp{c}^2}{2ab}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtract the opposite side', md: 'The side [[opp:opposite]] the angle you want is the one that is subtracted.' },
      ],
      lines: [
        { say: 'Start with the cosine law, c squared equals "a" squared plus b squared, minus two "a" b cosine C, and get the cosine on its own.', show: 'm.0', focus: 'm.0' },
        { say: 'Add two "a" b cosine C to both sides, and subtract c squared from both sides. Then two "a" b cosine C equals "a" squared plus b squared, minus c squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by two "a" b. The cosine of C equals "a" squared plus b squared minus c squared, all over two "a" b.', show: 'm.2', focus: 'm.2' },
        { say: 'Notice which side is subtracted: c, the side across from angle C, the angle you want. The two sides that meet at the angle are added on top, and multiplied underneath.', show: 'key' },
      ],
    },
    {
      chapter: 'Three sides',
      layout: 'split',
      leftWidth: 480,
      left: [pqr('tri', 'P')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos P = \\dfrac{8^2 + 12^2 - 6^2}{2(8)(12)}', '\\cos P = \\dfrac{172}{192} \\approx 0.8958', '\\angle P = \\cos^{-1}(0.8958) \\approx 26.4^\\circ'] }],
      lines: [
        { say: 'In triangle PQR, side p is six centimetres, side q is eight centimetres, and side r is twelve centimetres. Determine angle P, to the nearest tenth of a degree.', show: ['tri.shape', 'tri.names', 'tri.P'] },
        { say: 'Side p, six, is across from angle P, so it is the side that is subtracted. The cosine of P equals eight squared plus twelve squared minus six squared, over two times eight times twelve.', show: 'm.0', focus: ['m.0', 'tri.p', 'tri.P'] },
        { say: 'On top, 64 plus 144 minus 36 is 172. Underneath, two times eight times twelve is 192. So the cosine of P is 172 over 192, about 0.8958.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse cosine key, cosine to the minus one, turns that back into an angle. Angle P is about 26.38 degrees, or 26.4 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The largest angle',
      layout: 'split',
      leftWidth: 480,
      left: [pqr('big', 'R')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos R = \\dfrac{6^2 + 8^2 - 12^2}{2(6)(8)}', '\\cos R = \\dfrac{-44}{96} \\approx -0.4583', '\\angle R = \\cos^{-1}(-0.4583) \\approx 117.3^\\circ'] }],
      lines: [
        { say: 'Now find the largest angle. The largest angle is across from the longest side, r, twelve centimetres. So find angle R.', show: ['big.shape', 'big.names', 'big.P', 'big.R'], focus: ['big.r', 'big.R'] },
        { say: 'This time twelve is subtracted. The cosine of R equals six squared plus eight squared minus twelve squared, over two times six times eight.', show: 'm.0', focus: 'm.0' },
        { say: 'On top, 36 plus 64 minus 144 is negative 44. Underneath, 96. So the cosine of R is negative 44 over 96, about negative 0.4583.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse cosine gives about 117.28 degrees. So the largest angle, R, is about 117.3 degrees: an obtuse angle.', show: 'm.2', focus: ['m.2', 'big.R'] },
      ],
    },
    {
      chapter: 'A negative cosine means obtuse',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A negative cosine means obtuse', md: 'If the cosine of an angle is negative, the angle is obtuse. The $\\cos^{-1}$ key gives the correct obtuse angle directly, so the cosine law is the safest way to find the largest angle of a triangle.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle Q = 180^\\circ - 26.38^\\circ - 117.28^\\circ \\approx 36.3^\\circ'] },
      ],
      lines: [
        { say: 'If the cosine of an angle is negative, the angle is obtuse. And the inverse cosine key gives the correct obtuse angle directly, anywhere from ninety to 180 degrees.', show: 'tip' },
        { say: 'That is why the cosine law is the safest way to find the largest angle of a triangle. The inverse sine could never give you 117 degrees: it only gives angles up to ninety.' },
        { say: 'To finish the triangle, the angle sum gives the third angle. Angle Q is 180 minus 26.38 minus 117.28, which is about 36.3 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has sides of $5\\text{ m}$, $7\\text{ m}$ and $10\\text{ m}$. What is its largest angle, to the nearest tenth of a degree?',
          choices: ['$68.2^\\circ$', '$27.7^\\circ$', '$40.5^\\circ$', '$111.8^\\circ$'],
          answer: 3,
          working: 'The largest angle is opposite $10\\text{ m}$: $\\cos\\theta = \\dfrac{5^2 + 7^2 - 10^2}{2(5)(7)} = \\dfrac{-26}{70} \\approx -0.3714$, so $\\theta \\approx 111.8^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has sides of five metres, seven metres and ten metres. What is its largest angle, to the nearest tenth of a degree? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The largest angle is across from the longest side, so ten is subtracted. The cosine is 25 plus 49 minus 100, over 70, about negative 0.3714, and the inverse cosine gives 111.8 degrees. Choice A drops the negative sign.', show: 'q.answer' },
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
            '$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$, then use $\\cos^{-1}$.',
            'The side opposite the angle you want is the one subtracted.',
            'A negative cosine means an obtuse angle. The largest angle is opposite the longest side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find an angle from three sides, the cosine of C is "a" squared plus b squared minus c squared, over two "a" b. Then use the inverse cosine.', show: 'sum.0' },
        { say: 'The side across from the angle you want is the one that is subtracted.', show: 'sum.1' },
        { say: 'And a negative cosine means an obtuse angle, and the largest angle is across from the longest side. In the next lesson, we choose between the two laws to solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
