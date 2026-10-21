import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, on, pt, ring, sq } from './lib/m9-8-figures.ts';

type P = [number, number];

/**
 * A circle of radius `r` and a point T at distance `ot` from the centre, to the right of it, with
 * the tangent from T touching the circle at P above: OP ⊥ PT, so ∠POT has cosine r/OT. The right
 * triangle OPT is drawn to scale, with the radius OP orange, the tangent segment PT blue and the
 * hypotenuse OT pink.
 */
const tangentFig = (id: string, r: number, ot: number, labels: { op?: string; pt?: string; ot?: string }) => {
  const a = (Math.acos(r / ot) * 180) / Math.PI;
  const T: P = [ot, 0];
  const P0 = on([0, 0], r, a);
  const ext: P = [P0[0] - 0.3 * (T[0] - P0[0]), P0[1] - 0.3 * (T[1] - P0[1])];
  return figure(id, [
    ring({ r, pts: { P: a }, centrePlace: 'left' }),
    dot('T', T, 'right'),
    pt('x', ext),
    ln('line', 'x', 'T', { tone: 'muted' }),
    ln('op', 'O', 'P', { tone: 'opp', ...(labels.op ? { label: labels.op, side: 'left' as const } : {}) }),
    ln('pt', 'P', 'T', { tone: 'adj', ...(labels.pt ? { label: labels.pt, side: 'left' as const } : {}) }),
    ln('ot', 'O', 'T', { tone: 'hyp', ...(labels.ot ? { label: labels.ot, side: 'right' as const, at: 0.78 } : {}) }),
    sq('rp', 'P', 'O', 'T'),
  ]);
};
const base = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.nT`, `${id}.line`, `${id}.op`, `${id}.pt`, `${id}.ot`, `${id}.rp`];

const video: Explainer = {
  id: 'm9-8-3-b',
  lessonId: 'm9-8-3',
  title: 'Tangent Properties, Part 2: Tangents and the Pythagorean Theorem',
  thumbnailTitle: 'Tangents and the Pythagorean Theorem',
  thumbnail: 'ts',
  summary:
    'Triangle OPT has a right angle at P, where the tangent meets the radius, so OT, the side across from the right angle, is the hypotenuse: OT² = OP² + PT². With a radius of 5 cm and OT = 13 cm, PT = √(169 − 25) = 12 cm. With a radius of 6 m and PT = 8 m, OT = √(36 + 64) = 10 m. The tangent segment is never the hypotenuse: with r = 4 cm and OT = 9 cm, PT = √65 ≈ 8.1 cm, while adding would give √97, longer than OT.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 2', title: 'Tangents and the Pythagorean Theorem', subtitle: 'The hypotenuse is O T' }],
      lines: [
        { say: 'A tangent and a radius meet at a right angle. So once again, there is a right triangle, and the Pythagorean theorem can find a missing length.', show: 'title' },
        { say: 'In this part, you will find the length of a tangent segment, and the distance from a point to the centre of a circle.' },
      ],
    },
    {
      chapter: 'The right triangle',
      layout: 'split',
      leftWidth: 560,
      left: [tangentFig('rt', 5, 13, { op: 'r', pt: '\\text{tangent}', ot: '\\text{hypotenuse}' })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\hyp{OT}^2 = \\opp{OP}^2 + \\adj{PT}^2'] }],
      lines: [
        { say: 'From a point T outside the circle, a tangent touches the circle at P. Triangle O P T has a right angle at P, where the tangent meets the radius.', show: base('rt'), focus: 'rt.rp' },
        { say: 'The side across from the right angle is O T, from the centre to the point T. So O T is the hypotenuse. It is pink.', focus: 'rt.ot' },
        { say: 'The other two sides are O P, a radius, in orange, and P T, the tangent segment, in blue.', focus: ['rt.op', 'rt.pt'] },
        { say: 'The Pythagorean theorem gives: O T squared equals O P squared plus P T squared.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Length of a tangent segment',
      layout: 'split',
      leftWidth: 560,
      left: [tangentFig('ts', 5, 13, { op: '5', pt: 'x', ot: '13' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circle has a radius of $5$ cm. Point $T$ is $13$ cm from the centre. Find the length of the tangent segment $x = PT$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle OPT = 90^\\circ', 'x^2 = 13^2 - 5^2', '= 169 - 25 = 144', 'x = \\sqrt{144} = 12 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A circle has a radius of five centimetres. Point T is thirteen centimetres from the centre. Find x, the length of the tangent segment P T.', show: [...base('ts'), 'q'] },
        { say: 'Step one: angle O P T is ninety degrees, so O T, thirteen, is the hypotenuse.', show: 'm.0', focus: ['m.0', 'ts.ot'] },
        { say: 'Step two: you want a shorter side, so subtract. x squared equals thirteen squared minus five squared. That is one hundred sixty-nine minus twenty-five, which is one hundred forty-four.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'x is the square root of one hundred forty-four, which is twelve. The tangent segment P T is twelve centimetres long.', show: 'm.3', focus: ['m.3', 'ts.pt'] },
      ],
    },
    {
      chapter: 'Distance to the centre',
      layout: 'split',
      leftWidth: 560,
      left: [tangentFig('dc', 6, 10, { op: '6', pt: '8', ot: 'OT' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circle has a radius of $6$ m, and the tangent segment $PT$ is $8$ m long. How far is $T$ from the centre?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['OT^2 = 6^2 + 8^2', '= 36 + 64 = 100', 'OT = \\sqrt{100} = 10 \\text{ m}'] },
      ],
      lines: [
        { say: 'Now go the other way. A circle has a radius of six metres, and the tangent segment P T is eight metres long. How far is T from the centre?', show: [...base('dc'), 'q'] },
        { say: 'This time you want the hypotenuse, so add the squares. O T squared equals six squared plus eight squared: thirty-six plus sixty-four, which is one hundred.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1', 'dc.ot'] },
        { say: 'O T is the square root of one hundred, which is ten. Point T is ten metres from the centre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [tangentFig('wo', 4, 9, { op: '4', pt: 'PT', ot: '9' })],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Picking the wrong hypotenuse', md: 'The hypotenuse is always $OT$, across from the right angle at $P$, never the tangent segment.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PT = \\sqrt{81 - 16} = \\sqrt{65}', 'PT \\approx 8.1 \\text{ cm} \\;\\checkmark', '\\sqrt{81 + 16} = \\sqrt{97} \\approx 9.8', '9.8 > 9 \\quad \\text{(impossible)}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The hypotenuse is always O T, the side across from the right angle at P. The tangent segment is never the hypotenuse.', show: [...base('wo'), 'oops'], focus: 'wo.ot' },
        { say: 'Suppose the radius is four centimetres, and O T is nine centimetres. O T is the hypotenuse, so subtract: P T is the square root of eighty-one minus sixteen. That is the square root of sixty-five, about eight point one centimetres.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1', 'wo.pt'] },
        { say: 'If you added instead, you would get the square root of ninety-seven, which is about nine point eight. That is longer than O T! But the hypotenuse is always the longest side, so that answer is impossible.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle with centre $O$ has a radius of $9$ cm. $PT$ is tangent to the circle at $P$, and $PT = 12$ cm. How far is $T$ from $O$?',
          choices: ['$3$ cm', '$7.9$ cm', '$15$ cm', '$21$ cm'],
          answer: 2,
          working: '$OT$ is the hypotenuse: $OT^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $OT = \\sqrt{225} = 15\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle with centre O has a radius of nine centimetres. P T is tangent to the circle at P, and P T is twelve centimetres long. How far is T from O? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, fifteen centimetres. O T is the hypotenuse, so add the squares: eighty-one plus one hundred forty-four is two hundred twenty-five, and its square root is fifteen. Choice B subtracts the squares, as if the tangent segment were the hypotenuse.', show: 'q.answer' },
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
            'Triangle $OPT$ has a right angle at $P$, so $OT$ is the hypotenuse.',
            '$OT^2 = OP^2 + PT^2$.',
            'Finding $PT$ or the radius: subtract. Finding $OT$: add.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Triangle O P T has a right angle at P, so O T is the hypotenuse.', show: 'sum.0' },
        { say: 'O T squared equals O P squared plus P T squared.', show: 'sum.1' },
        { say: 'To find the tangent segment or the radius, subtract the squares. To find O T, add them. In the next part, you will draw two tangents from the same point. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
