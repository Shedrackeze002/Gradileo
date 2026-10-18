import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// d = 18.6 m, e = 12.4 m, ∠D = 115°: ∠E ≈ 37.2°, ∠F ≈ 27.8°, f ≈ 9.6 m.
const def = (id: string, found: boolean) =>
  figure(id, [
    oblique({
      corners: ['F', 'D', 'E'],
      angles: [27.83, 115],
      sides: found ? { d: '18.6\\text{ m}', e: '12.4\\text{ m}', f: 'f' } : { d: '18.6\\text{ m}', e: '12.4\\text{ m}' },
      angleLabels: found ? { D: '115^\\circ', E: '37.2^\\circ', F: '27.8^\\circ' } : { D: '115^\\circ', E: '?' },
      pairs: found ? { D: 'opp', E: 'adj', F: 'hyp' } : { D: 'opp', E: 'adj' },
      labelDist: { D: 60 },
      arc: { D: 26 },
      labelAt: { E: 0.45 },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-1-d',
  lessonId: 'm303-2-1',
  title: 'The Sine Law, Part 4: Finding an Angle',
  thumbnailTitle: 'Finding an Angle with the Sine Law',
  thumbnail: 'tri',
  summary: 'Finding an angle with the sine law, sines on top and then the inverse sine: d = 18.6 m, e = 12.4 m and ∠D = 115° give ∠E ≈ 37.2°, then ∠F ≈ 27.8° and f ≈ 9.6 m; keeping full calculator values; and why the angle across from the shorter known side is acute, so the inverse sine gives it directly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 4', title: 'Finding an Angle', subtitle: 'Sines on top, then the inverse sine' }],
      lines: [
        { say: 'The sine law can find angles too. You solve for the sine of the angle first, then turn that sine back into an angle.', show: 'title' },
        { say: 'In this video, you will find an angle in an obtuse triangle, finish solving the triangle, and see why the calculator’s answer is the right one here.' },
      ],
    },
    {
      chapter: 'Sines on top',
      layout: 'split',
      leftWidth: 480,
      left: [def('tri', false)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\sin E}{12.4} = \\dfrac{\\sin 115^\\circ}{18.6}', '\\sin E = \\dfrac{12.4\\sin 115^\\circ}{18.6} \\approx 0.6042', '\\angle E = \\sin^{-1}(0.6042) \\approx 37.17^\\circ', '\\angle E \\approx 37.2^\\circ'] }],
      lines: [
        { say: 'In triangle DEF, side d is 18.6 metres, side e is 12.4 metres, and angle D is 115 degrees. Find angle E, to the nearest tenth of a degree.', show: ['tri.shape', 'tri.names', 'tri.D', 'tri.E'] },
        { say: 'Side d and angle D are a matching pair. The angle we want, E, is across from side e, which we know.', focus: ['tri.d', 'tri.D', 'tri.e', 'tri.E'] },
        { say: 'To find an angle, put the sines on top, so the unknown is in a numerator: sine E over 12.4 equals sine 115 over 18.6.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by 12.4. Sine E equals 12.4 sine 115, over 18.6, which is about 0.6042.', show: 'm.1', focus: 'm.1' },
        { say: 'Now undo the sine. The inverse sine key, often marked sine to the minus one, turns a sine back into an angle. The inverse sine of 0.6042 is about 37.17 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'So angle E is about 37.2 degrees.', show: 'm.3', focus: ['m.3', 'tri.E'] },
      ],
    },
    {
      chapter: 'Finishing the triangle',
      layout: 'split',
      leftWidth: 480,
      left: [def('done', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle F = 180^\\circ - 115^\\circ - 37.17^\\circ', '\\angle F \\approx 27.8^\\circ', '\\dfrac{f}{\\sin F} = \\dfrac{18.6}{\\sin 115^\\circ}', 'f \\approx 9.6\\text{ m}'] }],
      lines: [
        { say: 'Once you know two angles, the angle sum gives the third. Angle F is 180 minus 115 minus 37.17, which is about 27.8 degrees.', show: ['done.shape', 'done.names', 'done.D', 'done.E', 'done.F', 'm.0', 'm.1'], focus: ['done.F', 'm.1'] },
        { say: 'Then the sine law can give the last side. Side f is across from angle F, so f over sine F equals 18.6 over sine 115. That makes f about 9.6 metres.', show: ['m.2', 'm.3'], focus: ['m.3', 'done.f'] },
        { say: 'Keep full calculator values until the very end, and round only the final answer. If you round sine E to 0.6 too early, you get 36.9 degrees for angle E, instead of 37.2.', focus: 'done' },
        { say: 'Check the sizes: the longest side, d, is across from the largest angle, 115 degrees, and the shortest side, f, is across from the smallest angle, 27.8 degrees.', focus: ['done.d', 'done.D', 'done.f', 'done.F'] },
      ],
    },
    {
      chapter: 'Why there is only one answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'note', tone: 'key', title: 'Why there is only one answer', md: 'The angle you find with $\\sin^{-1}$ is opposite the **shorter** of the two known sides. That angle is smaller than the known angle, so it must be acute, and $\\sin^{-1}$ gives it directly.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['e = 12.4 < d = 18.6 \\;\\Rightarrow\\; \\angle E < \\angle D', '\\angle E < 90^\\circ'] },
      ],
      lines: [
        { say: 'Why can we trust the calculator’s answer? The inverse sine always gives an acute angle, less than ninety degrees. So we need to know that the angle we want is acute.', show: 'note' },
        { say: 'In every question in this unit, the angle you find this way is across from the shorter of the two known sides. Here, e, 12.4, is shorter than d, 18.6. So angle E is smaller than angle D.', show: 'm.0', focus: 'm.0' },
        { say: 'A triangle can have only one obtuse angle, and it is always across from the longest side. So an angle across from a shorter side is acute, and the inverse sine gives it directly.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$, $a = 10\\text{ cm}$, $b = 7\\text{ cm}$ and $\\angle A = 80^\\circ$. Find $\\angle B$, to the nearest tenth of a degree.',
          choices: ['$44.4^\\circ$', '$43.6^\\circ$', '$136.4^\\circ$', '$0.7^\\circ$'],
          answer: 1,
          working: '$\\sin B = \\dfrac{7\\sin 80^\\circ}{10} \\approx 0.6894$, so $\\angle B = \\sin^{-1}(0.6894) \\approx 43.6^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle ABC, side "a" is ten centimetres, side b is seven centimetres, and angle A is 80 degrees. Find angle B, to the nearest tenth of a degree. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Sine B equals seven sine 80, over ten, which is about 0.6894, and the inverse sine gives about 43.6 degrees. Choice A rounds the sine to 0.7 before using the inverse sine.', show: 'q.answer' },
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
            'To find an angle, put the sines on top and solve for the sine of the angle.',
            'Then use $\\sin^{-1}$, and the angle sum for the third angle.',
            'Keep full calculator values, and check that the largest angle is opposite the longest side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find an angle with the sine law, put the sines on top, and solve for the sine of the angle.', show: 'sum.0' },
        { say: 'Then use the inverse sine to get the angle, and the angle sum to get the third angle.', show: 'sum.1' },
        { say: 'And keep full calculator values until the end, then check that the largest angle is across from the longest side. In the next lesson, we meet the cosine law. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
