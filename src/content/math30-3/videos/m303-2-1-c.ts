import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// ∠A = 42°, ∠B = 74°, a = 15 m: b ≈ 21.5 m.
const aas = () =>
  figure('aas', [
    oblique({
      corners: ['A', 'B', 'C'],
      angles: [42, 74],
      sides: { a: '15\\text{ m}', b: 'b' },
      angleLabels: { A: '42^\\circ', B: '74^\\circ' },
      pairs: { A: 'opp', B: 'adj' },
    }),
  ]);

// ∠P = 108°, ∠Q = 31°, r = 24.5 cm: ∠R = 41°, then p ≈ 35.5 cm.
const asa = () =>
  figure('asa', [
    oblique({
      corners: ['Q', 'R', 'P'],
      angles: [31, 41],
      sides: { r: '24.5\\text{ cm}', p: 'p' },
      angleLabels: { P: '108^\\circ', Q: '31^\\circ', R: '41^\\circ' },
      pairs: { R: 'opp', P: 'adj' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-1-c',
  lessonId: 'm303-2-1',
  title: 'The Sine Law, Part 3: Finding a Side',
  thumbnailTitle: 'Finding a Side with the Sine Law',
  thumbnail: 'aas',
  summary: 'Finding a side with the sine law: ∠A = 42°, ∠B = 74° and a = 15 m give b ≈ 21.5 m; when the known side has no known opposite angle, the angle sum comes first (∠P = 108°, ∠Q = 31°, r = 24.5 cm give ∠R = 41° and p ≈ 35.5 cm); and the mistake of pairing a side with the wrong angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 3', title: 'Finding a Side', subtitle: 'A matching pair, and the angle across from the side you want' }],
      lines: [
        { say: 'With one complete matching pair, the sine law can find any other side, as long as you know the angle across from it.', show: 'title' },
        { say: 'In this video, you will find sides in two triangles, one acute and one obtuse, and see what to do when the known side has no known angle across from it.' },
      ],
    },
    {
      chapter: 'Two angles and a side',
      layout: 'split',
      leftWidth: 500,
      left: [aas()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{b}{\\sin 74^\\circ} = \\dfrac{15}{\\sin 42^\\circ}', 'b = \\dfrac{15\\sin 74^\\circ}{\\sin 42^\\circ}', 'b \\approx \\dfrac{15(0.9613)}{0.6691} \\approx 21.549', 'b \\approx 21.5\\text{ m}'] }],
      lines: [
        { say: 'In triangle ABC, angle A is 42 degrees, angle B is 74 degrees, and side "a" is fifteen metres. Find side b, to the nearest tenth of a metre.', show: ['aas.shape', 'aas.names', 'aas.A', 'aas.B'] },
        { say: 'Side "a" and angle A are a complete matching pair. The side we want, b, is across from angle B, which we know.', focus: ['aas.a', 'aas.A', 'aas.b', 'aas.B'] },
        { say: 'To find a side, put the sides on top: b over sine 74 equals fifteen over sine 42.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by sine 74 to get b on its own: b equals fifteen sine 74, over sine 42.', show: 'm.1', focus: 'm.1' },
        { say: 'Sine 74 is about 0.9613, and sine 42 is about 0.6691. So b is about 21.549, which rounds to 21.5 metres.', show: ['m.2', 'm.3'], focus: ['m.3', 'aas.b'] },
        { say: 'Check: side b is across from the larger angle, 74 degrees, so it should be longer than side "a". It is: 21.5 metres is longer than fifteen.', focus: ['aas.b', 'aas.a'] },
      ],
    },
    {
      chapter: 'Use the angle sum first',
      layout: 'split',
      leftWidth: 540,
      left: [asa()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle R = 180^\\circ - 108^\\circ - 31^\\circ = 41^\\circ', '\\dfrac{p}{\\sin 108^\\circ} = \\dfrac{24.5}{\\sin 41^\\circ}', 'p = \\dfrac{24.5\\sin 108^\\circ}{\\sin 41^\\circ} \\approx 35.516', 'p \\approx 35.5\\text{ cm}'] }],
      lines: [
        { say: 'Now triangle PQR. Angle P is 108 degrees, angle Q is 31 degrees, and side r is 24.5 centimetres. Find side p, to the nearest tenth of a centimetre.', show: ['asa.shape', 'asa.names', 'asa.P', 'asa.Q'] },
        { say: 'Side r is across from angle R, and we do not know angle R yet. So there is no complete pair.', focus: ['asa.r'] },
        { say: 'Use the angle sum first. The angles of a triangle add to 180 degrees, so angle R is 180 minus 108 minus 31, which is 41 degrees.', show: ['asa.R', 'm.0'], focus: ['asa.R', 'm.0'] },
        { say: 'Now side r and angle R are a matching pair. Side p is across from angle P, so p over sine 108 equals 24.5 over sine 41.', show: 'm.1', focus: ['m.1', 'asa.r', 'asa.R', 'asa.p', 'asa.P'] },
        { say: 'So p equals 24.5 sine 108, over sine 41, which is about 35.516. Side p is about 35.5 centimetres.', show: ['m.2', 'm.3'], focus: ['m.3', 'asa.p'] },
        { say: 'That makes sense. The obtuse angle is the largest angle, so the side across from it, p, is the longest side. The sine law works the same way when one angle is obtuse.', focus: ['asa.P', 'asa.p'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the pairs', md: 'Each ratio must use a side and the angle **opposite** it. Side $r$ is across from $\\angle R$, not $\\angle Q$. Name each side by its opposite angle before you substitute.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{p}{\\sin 108^\\circ} = \\dfrac{24.5}{\\sin 31^\\circ}} \\qquad \\good{\\dfrac{p}{\\sin 108^\\circ} = \\dfrac{24.5}{\\sin 41^\\circ}}'] },
      ],
      lines: [
        { say: 'The most common mistake is to mix up the pairs. Writing p over sine 108 equals 24.5 over sine 31 pairs side r with angle Q. But angle Q is not across from side r.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Each ratio must use a side and the angle opposite it. Name each side by its opposite angle before you substitute, and the pairs will never get mixed up.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle XYZ$, $\\angle X = 35^\\circ$, $\\angle Y = 80^\\circ$ and $x = 9.0\\text{ m}$. Find side $y$, to the nearest tenth of a metre.',
          choices: ['$5.2\\text{ m}$', '$8.9\\text{ m}$', '$14.2\\text{ m}$', '$15.5\\text{ m}$'],
          answer: 3,
          working: '$\\dfrac{y}{\\sin 80^\\circ} = \\dfrac{9.0}{\\sin 35^\\circ}$, so $y = \\dfrac{9.0\\sin 80^\\circ}{\\sin 35^\\circ} \\approx 15.5\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle XYZ, angle X is 35 degrees, angle Y is 80 degrees, and side x is 9.0 metres. Find side y, to the nearest tenth of a metre. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Side x and angle X are the pair, so y over sine 80 equals 9.0 over sine 35, and y is about 15.5 metres. Choice A puts the two sines the wrong way round, so it divides by sine 80 instead of multiplying by it.', show: 'q.answer' },
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
            'To find a side, you need a complete matching pair and the angle across from the side you want.',
            'Put the sides on top, then multiply both sides by the sine under the unknown.',
            'If the known side has no known opposite angle, use the angle sum first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a side, you need one complete matching pair, and the angle across from the side you want.', show: 'sum.0' },
        { say: 'Put the sides on top, then multiply both sides by the sine under the unknown.', show: 'sum.1' },
        { say: 'And if the known side has no known angle across from it, use the angle sum first. In part four, we use the sine law to find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
