import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, poly, polyIds } from './lib/m8-9-figures.ts';

type P = [number, number];

// Angle measures added to a shape later, on top of it: the same corners, with no outline or letters.
const later = (name: string, corners: Record<string, P>, angles: Record<string, string>, angleDist?: Record<string, number>) => poly({ name, corners, names: false, shade: 0, angles, angleDist });

// Triangle JKL drawn to scale with ∠J = 50°, ∠K = 64° and ∠L = 66°; TUV is it flipped and turned.
const JKL: Record<string, P> = { J: [0, 0], K: [6, 0], L: [3.794, 4.522] };
const TUV = moved(JKL, { flip: true, turn: 200, to: [11.3, 1.7], names: ['T', 'U', 'V'] });
const triangles = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: JKL, angles: { J: '50^\\circ' } }),
    later('pk', JKL, { K: '64^\\circ', L: '66^\\circ' }),
    poly({ name: 'q', corners: TUV, tone: 'good', angles: { U: '64^\\circ', V: '?' } }),
    later('qv', TUV, { V: '66^\\circ' }),
  ]);

// Quadrilateral EFGH drawn to scale with ∠E = 80°, ∠F = 110°, ∠G = 95° and ∠H = 75°; WXYZ is it
// turned a quarter turn.
const EFGH: Record<string, P> = { E: [0, 0], F: [6, 0], G: [7.368, 3.759], H: [1.172, 6.648] };
const WXYZ = moved(EFGH, { turn: -90, to: [13.2, 2.8], names: ['W', 'X', 'Y', 'Z'] });
const quads = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: EFGH, angles: { E: '80^\\circ', F: '110^\\circ' }, angleDist: { F: 54 } }),
    later('pg', EFGH, { G: '95^\\circ', H: '75^\\circ' }, { G: 54 }),
    poly({ name: 'q', corners: WXYZ, tone: 'good', angles: { Y: '95^\\circ', Z: '?' } }),
    later('qz', WXYZ, { Z: '75^\\circ' }),
  ]);

const video: Explainer = {
  id: 'm8-9-1-d',
  lessonId: 'm8-9-1',
  title: 'Congruent Polygons, Part 4: Using Angle Sums',
  thumbnailTitle: 'Using Angle Sums',
  thumbnail: 'tw',
  summary:
    'Sometimes a missing angle needs one more step: the angles of a triangle add to 180° and the angles of a quadrilateral add to 360°. If △JKL ≅ △TUV with ∠J = 50° and ∠U = 64°, then ∠K = 64°, ∠L = 180° − 50° − 64° = 66°, and ∠V = ∠L = 66°. If quadrilateral EFGH ≅ WXYZ with ∠E = 80°, ∠F = 110° and ∠Y = 95°, then ∠G = 95°, ∠H = 75° and ∠Z = 75°. Move the known measures onto one polygon first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 4', title: 'Using Angle Sums', subtitle: 'One more step' }],
      lines: [
        { say: 'Sometimes the measure you need is not given on either shape. Then you need one more step.', show: 'title' },
        { say: 'In this video, you will put congruence together with the angle sums of triangles and quadrilaterals.' },
      ],
    },
    {
      chapter: 'Angle sums',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Angle sums', md: 'The three angles of a **triangle** add to $180^\\circ$. The four angles of a **quadrilateral** add to $360^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{missing angle} = \\text{total} - \\text{the angles you know}'] },
      ],
      lines: [
        { say: 'The angle sum of a polygon is what all of its angles add up to.', show: 'key' },
        { say: 'The three angles of any triangle add up to one hundred eighty degrees. The four angles of any quadrilateral add up to three hundred sixty degrees.' },
        { say: 'That is because a line from one corner to the opposite corner cuts a quadrilateral into two triangles. Two triangles give two times one hundred eighty, which is three hundred sixty degrees.' },
        { say: 'So when you know every angle but one, subtract the angles you know from the total.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Two triangles',
      layout: 'split',
      leftWidth: 640,
      left: [triangles('tw')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\triangle JKL \\cong \\triangle TUV$, $\\angle J = 50^\\circ$ and $\\angle U = 64^\\circ$. Find $\\angle V$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle K = \\angle U = 64^\\circ', '\\angle L = 180^\\circ - 50^\\circ - 64^\\circ', '\\angle L = 66^\\circ', '\\angle V = \\angle L = 66^\\circ'] },
      ],
      lines: [
        { say: 'Triangle J K L is congruent to triangle T U V. Angle J is fifty degrees, and angle U is sixty-four degrees. Find angle V.', show: [...polyIds('tw', 'p'), ...polyIds('tw', 'q'), 'tw.p-deg-J', 'tw.q-deg-U', 'tw.q-deg-V', 'q'] },
        { say: 'The two angles we know are on different triangles. So first, bring them onto one triangle. U is the second letter of T U V, so angle U matches angle K, the second letter of J K L.', focus: ['tw.q-deg-U', 'tw.p-nK', 'tw.q-nU'] },
        { say: 'That means angle K is sixty-four degrees as well.', show: ['m.0', 'tw.pk-deg-K'], focus: ['m.0', 'tw.pk-deg-K'] },
        { say: 'Now triangle J K L has two known angles: fifty degrees and sixty-four degrees. Its three angles add to one hundred eighty, so angle L is one hundred eighty, minus fifty, minus sixty-four.', show: 'm.1', focus: ['m.1', 'tw.p-deg-J', 'tw.pk-deg-K'] },
        { say: 'That is sixty-six degrees.', show: ['m.2', 'tw.pk-deg-L'], focus: ['m.2', 'tw.pk-deg-L'] },
        { say: 'Last step. V is the third letter of T U V, so angle V matches angle L. Angle V is sixty-six degrees.', show: ['m.3', 'tw.qv-deg-V'], hide: 'tw.q-deg-V', focus: ['m.3', 'tw.qv-deg-V', 'tw.pk-deg-L'] },
      ],
    },
    {
      chapter: 'Two quadrilaterals',
      layout: 'split',
      leftWidth: 700,
      left: [quads('qd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$EFGH \\cong WXYZ$, $\\angle E = 80^\\circ$, $\\angle F = 110^\\circ$ and $\\angle Y = 95^\\circ$. Find $\\angle Z$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle G = \\angle Y = 95^\\circ', '\\angle H = 360^\\circ - 80^\\circ', '\\qquad - 110^\\circ - 95^\\circ', '\\angle H = 75^\\circ', '\\angle Z = \\angle H = 75^\\circ'] },
      ],
      lines: [
        { say: 'Now two quadrilaterals. Quadrilateral E F G H is congruent to quadrilateral W X Y Z. Angle E is eighty degrees, angle F is one hundred ten degrees, and angle Y is ninety-five degrees. Find angle Z.', show: [...polyIds('qd', 'p'), ...polyIds('qd', 'q'), 'qd.p-degs', 'qd.q-deg-Y', 'qd.q-deg-Z', 'q'] },
        { say: 'Bring the angles onto one shape first. Y is the third letter of W X Y Z, so angle Y matches angle G. Angle G is ninety-five degrees.', show: ['m.0', 'qd.pg-deg-G'], focus: ['m.0', 'qd.q-deg-Y', 'qd.pg-deg-G'] },
        { say: 'Now E F G H has three known angles. The four angles add to three hundred sixty, so angle H is three hundred sixty, minus eighty, minus one hundred ten, minus ninety-five.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'That is seventy-five degrees.', show: ['m.3', 'qd.pg-deg-H'], focus: ['m.3', 'qd.pg-deg-H'] },
        { say: 'Z is the fourth letter of W X Y Z, so angle Z matches angle H, the fourth letter of E F G H. Angle Z is seventy-five degrees.', show: ['m.4', 'qd.qz-deg-Z'], hide: 'qd.q-deg-Z', focus: ['m.4', 'qd.qz-deg-Z', 'qd.pg-deg-H'] },
      ],
    },
    {
      chapter: 'One shape first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Gather the angles on one shape', md: 'Copy every measure you know onto **one** polygon first. Then use the angle sum of **that** polygon. Last, copy the answer back to its partner.' }],
      lines: [
        { say: 'Here is a tip for problems like these. Copy every measure you know onto one polygon first.', show: 'tip' },
        { say: 'Then use the angle sum of that polygon to find the missing angle.' },
        { say: 'Last, copy the answer across to its partner on the other polygon. Always use the order of the letters to decide which angles are partners.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\triangle ABC \\cong \\triangle DEF$, $\\angle A = 40^\\circ$ and $\\angle E = 75^\\circ$. What is $\\angle F$?',
          choices: ['$75^\\circ$', '$40^\\circ$', '$65^\\circ$', '$115^\\circ$'],
          answer: 2,
          working: '$\\angle E$ matches $\\angle B$, so $\\angle B = 75^\\circ$. Then $\\angle C = 180^\\circ - 40^\\circ - 75^\\circ = 65^\\circ$, and $\\angle F$ matches $\\angle C$, so $\\angle F = 65^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle A B C is congruent to triangle D E F. Angle A is forty degrees, and angle E is seventy-five degrees. What is angle F? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C: sixty-five degrees. Angle E matches angle B, so angle B is seventy-five degrees. Then angle C is one hundred eighty, minus forty, minus seventy-five, which is sixty-five, and angle F matches angle C. Choice D, one hundred fifteen degrees, adds the two known angles, instead of taking them away from one hundred eighty.', show: 'q.answer' },
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
          items: ['The angles of a triangle add to $180^\\circ$. The angles of a quadrilateral add to $360^\\circ$.', 'Copy the known measures onto one polygon, then subtract them from the angle sum.', 'Copy the answer to its partner, using the order of the letters.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The angles of a triangle add to one hundred eighty degrees, and the angles of a quadrilateral add to three hundred sixty degrees.', show: 'sum.0' },
        { say: 'Copy the measures you know onto one polygon, then subtract them from its angle sum.', show: 'sum.1' },
        { say: 'Then copy the answer to its partner, using the order of the letters. In the next part, you will decide whether two polygons are congruent at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
