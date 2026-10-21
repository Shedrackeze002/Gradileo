import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, on, ring, sq, ticks } from './lib/m9-8-figures.ts';

type P = [number, number];

/**
 * The kite OPTQ: a circle of radius `r` and two tangents from T, `ot` from the centre, drawn to
 * scale (∠POT has cosine r/OT), with OT dashed. Labels for the radii, the tangent segments and OT.
 */
const kite = (id: string, r: number, ot: number, labels: { r?: string; tp?: string; tq?: string; ot?: string; marks?: boolean }) => {
  const a = (Math.acos(r / ot) * 180) / Math.PI;
  const T: P = [ot, 0];
  const P0 = on([0, 0], r, a);
  const Q0 = on([0, 0], r, -a);
  const s = ot * 0.035;
  return figure(id, [
    ring({ r, pts: { P: a, Q: -a }, centrePlace: 'left' }),
    dot('T', T, 'right'),
    ln('ot', 'O', 'T', { tone: 'hyp', dashed: true, ...(labels.ot ? { label: labels.ot, side: 'left' as const, at: 0.62 } : {}) }),
    ln('op', 'O', 'P', { tone: 'opp', ...(labels.r ? { label: labels.r, side: 'left' as const } : {}), group: 'radii' }),
    ln('oq', 'O', 'Q', { tone: 'opp', ...(labels.r ? { label: labels.r, side: 'right' as const } : {}), group: 'radii' }),
    ln('tp', 'P', 'T', { tone: 'adj', ...(labels.tp ? { label: labels.tp, side: 'left' as const } : {}) }),
    ln('tq', 'Q', 'T', { tone: 'adj', ...(labels.tq ? { label: labels.tq, side: 'right' as const } : {}) }),
    sq('rp', 'P', 'O', 'T', 'rights'),
    sq('rq', 'Q', 'O', 'T', 'rights'),
    ...(labels.marks
      ? [ticks('mp', [0, 0], P0, 1, s * 2), ticks('mq', [0, 0], Q0, 1, s * 2), ticks('np', P0, T, 2, s * 2, 'adj'), ticks('nq', Q0, T, 2, s * 2, 'adj')]
      : []),
  ]);
};
const all = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.nT`, `${id}.radii`, `${id}.tp`, `${id}.tq`, `${id}.rights`];

const video: Explainer = {
  id: 'm9-8-3-d',
  lessonId: 'm9-8-3',
  title: 'Tangent Properties, Part 4: Equal Tangent Segments',
  thumbnailTitle: 'Equal Tangent Segments',
  thumbnail: 'pk',
  summary:
    'The two tangent segments from the same point are equal: OT splits the kite OPTQ into two right triangles with the same hypotenuse OT and equal radii, so TP = TQ = √(OT² − r²). With a radius of 8 cm and OT = 17 cm, TP = √(289 − 64) = √225 = 15 cm, so the perimeter of OPTQ is 8 + 15 + 15 + 8 = 46 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 4', title: 'Equal Tangent Segments', subtitle: 'From one point, the same length' }],
      lines: [
        { say: 'The two tangents from one point have something else in common: their tangent segments are exactly the same length.', show: 'title' },
        { say: 'In this part, you will see why, and use it to find the perimeter of a kite.' },
      ],
    },
    {
      chapter: 'Why they are equal',
      layout: 'split',
      leftWidth: 620,
      left: [kite('wy', 8, 17, { marks: true })],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['TP = \\sqrt{OT^2 - r^2}', 'TQ = \\sqrt{OT^2 - r^2}', 'TP = TQ'] },
      ],
      lines: [
        { say: 'Here are two tangents from the point T, touching the circle at P and Q, with the radii O P and O Q.', show: all('wy') },
        { say: 'Draw the line O T. It splits the shape into two right triangles, O P T and O Q T.', show: 'wy.ot', focus: 'wy.ot' },
        { say: 'Both triangles have the same hypotenuse, O T. And O P and O Q are both radii, so they are equal. One tick mark shows that.', show: ['wy.mp', 'wy.mq'], focus: ['wy.ot', 'wy.radii'] },
        { say: 'So in each triangle, the tangent segment is the square root of O T squared minus the radius squared. Both come out the same.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The two tangent segments are equal: T P equals T Q. Two tick marks show that.', show: ['m.2', 'wy.np', 'wy.nq'], focus: ['m.2', 'wy.tp', 'wy.tq'] },
      ],
    },
    {
      chapter: 'Perimeter of the kite',
      layout: 'split',
      leftWidth: 620,
      left: [kite('pk', 8, 17, { r: '8', tp: '15', tq: '15', ot: '17' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The circle has a radius of $8$ cm and $OT = 17$ cm. Find the perimeter of $OPTQ$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['TP = \\sqrt{17^2 - 8^2}', '= \\sqrt{289 - 64}', '= \\sqrt{225} = 15', 'TQ = TP = 15', '8 + 15 + 15 + 8 = 46 \\text{ cm}'] },
      ],
      lines: [
        { say: 'The circle has a radius of eight centimetres, and O T is seventeen centimetres. Find the perimeter of the shape O P T Q.', show: ['pk.fill', 'pk.outline', 'pk.names', 'pk.nT', 'pk.radii', 'pk.rights', 'pk.ot', 'q'] },
        { say: 'Step one: T P is the square root of seventeen squared minus eight squared.', show: ['m.0', 'pk.tp'], focus: ['m.0', 'pk.tp'] },
        { say: 'That is the square root of two hundred eighty-nine minus sixty-four, which is the square root of two hundred twenty-five, or fifteen.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Step two: the tangent segments from T are equal, so T Q is fifteen centimetres as well.', show: ['m.3', 'pk.tq'], focus: ['m.3', 'pk.tq'] },
        { say: 'Step three: the perimeter is the distance all the way around: eight plus fifteen plus fifteen plus eight, which is forty-six. The perimeter of O P T Q is forty-six centimetres.', show: 'm.4', focus: ['m.4', 'pk.radii', 'pk.tp', 'pk.tq'] },
        { say: 'The shape is a kite: it has two pairs of equal sides, next to each other. The radii are one pair, and the tangent segments are the other.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$TP$ and $TQ$ are tangents from the point $T$ to a circle with centre $O$ and radius $5$ cm. $OT = 13$ cm. Find the perimeter of $OPTQ$.',
          choices: ['$34$ cm', '$36$ cm', '$24$ cm', '$17$ cm'],
          answer: 0,
          working: '$TP = TQ = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$, so the perimeter is $5 + 12 + 12 + 5 = 34\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. T P and T Q are tangents from the point T to a circle with centre O and a radius of five centimetres. O T is thirteen centimetres. Find the perimeter of O P T Q. Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, thirty-four centimetres. Each tangent segment is the square root of one hundred sixty-nine minus twenty-five, which is twelve. The perimeter is five plus twelve plus twelve plus five, which is thirty-four. Choice B uses thirteen for the tangent segments, but thirteen is O T, the distance to the centre.', show: 'q.answer' },
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
            'Two tangent segments from the same point are **equal**: $TP = TQ$.',
            'Each one is $\\sqrt{OT^2 - r^2}$.',
            'With the two radii, they make a kite $OPTQ$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The two tangent segments from the same point are equal in length.', show: 'sum.0' },
        { say: 'Each one is the square root of O T squared minus the radius squared.', show: 'sum.1' },
        { say: 'And together with the two radii, they make a kite. Well done on finishing this lesson on circle geometry!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
