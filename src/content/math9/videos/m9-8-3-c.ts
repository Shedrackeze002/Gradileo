import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, dot, ln, ring, sq } from './lib/m9-8-figures.ts';

type P = [number, number];

const R = 4;
const rad = (d: number) => (d * Math.PI) / 180;

/**
 * Two tangents from T, touching the circle at P (above) and Q (below), drawn to scale for
 * ∠PTQ = `ptq` degrees: ∠OTP is half of it, so OT = r ÷ sin(∠OTP), and ∠POT = 90° − ∠OTP. The
 * quadrilateral OPTQ then has ∠POQ = 180° − ∠PTQ.
 */
const twoTangents = (id: string, ptq: number, labels: { t?: string; o?: string }) => {
  const half = ptq / 2;
  const ot = R / Math.sin(rad(half));
  const pot = 90 - half;
  const T: P = [ot, 0];
  return figure(id, [
    ring({ r: R, pts: { P: pot, Q: -pot }, centrePlace: 'left' }),
    dot('T', T, 'right'),
    ln('tp', 'T', 'P', { tone: 'adj', group: 'tangents' }),
    ln('tq', 'T', 'Q', { tone: 'adj', group: 'tangents' }),
    ln('op', 'O', 'P', { tone: 'opp', group: 'radii' }),
    ln('oq', 'O', 'Q', { tone: 'opp', group: 'radii' }),
    sq('rp', 'P', 'O', 'T', 'rights'),
    sq('rq', 'Q', 'O', 'T', 'rights'),
    ang('at', 'T', 'P', 'Q', { r: 50, tone: 'theta', ...(labels.t ? { label: labels.t, dist: 96 } : {}) }),
    ang('ao', 'O', 'P', 'Q', { r: 34, tone: 'good', ...(labels.o ? { label: labels.o, dist: 66 } : {}) }),
  ]);
};
const all = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.nT`, `${id}.tangents`, `${id}.radii`, `${id}.rights`];

const video: Explainer = {
  id: 'm9-8-3-c',
  lessonId: 'm9-8-3',
  title: 'Tangent Properties, Part 3: Two Tangents from One Point',
  thumbnailTitle: 'Two Tangents from One Point',
  thumbnail: 'ac',
  summary:
    'From a point T outside a circle you can draw two tangents, touching the circle at P and Q. Both angles at P and Q are 90° (tangent ⊥ radius), and the angles of quadrilateral OPTQ add to 360°. If ∠PTQ = 50°, then ∠POQ = 360° − 90° − 90° − 50° = 130°. In short, ∠PTQ + ∠POQ = 180°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 3', title: 'Two Tangents from One Point', subtitle: 'Four angles that add to 360°' }],
      lines: [
        { say: 'From a point outside a circle, you can draw two different tangents to the circle, one on each side.', show: 'title' },
        { say: 'In this part, you will use the right angles they make with the radii to find the angle at the centre.' },
      ],
    },
    {
      chapter: 'Two tangents',
      layout: 'split',
      leftWidth: 560,
      left: [twoTangents('tt', 50, {})],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Two tangents from T', md: '$\\angle OPT = \\angle OQT = 90^\\circ$. The four angles of quadrilateral $OPTQ$ add to $360^\\circ$.' },
      ],
      lines: [
        { say: 'Here is a point T outside a circle. Draw two tangents from T. One touches the circle at P, and the other touches it at Q.', show: ['tt.fill', 'tt.outline', 'tt.nP', 'tt.nQ', 'tt.nT', 'tt.tangents'], focus: 'tt.tangents' },
        { say: 'Now draw the radii O P and O Q. Each tangent meets its radius at a right angle. So angle O P T and angle O Q T are both ninety degrees.', show: ['tt.nO', 'tt.radii', 'tt.rights'], focus: ['tt.radii', 'tt.rights'] },
        { say: 'The shape O P T Q has four straight sides, so it is a quadrilateral. The angles of any quadrilateral add to three hundred sixty degrees.', show: 'k', focus: 'tt' },
      ],
    },
    {
      chapter: 'The angle at the centre',
      layout: 'split',
      leftWidth: 560,
      left: [twoTangents('ac', 50, { t: '50^\\circ', o: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$TP$ and $TQ$ are tangents, and $\\angle PTQ = 50^\\circ$. Find $x = \\angle POQ$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle OPT = \\angle OQT = 90^\\circ', 'x = 360^\\circ - 90^\\circ - 90^\\circ - 50^\\circ', 'x = 130^\\circ'] },
      ],
      lines: [
        { say: 'T P and T Q are tangents, and angle P T Q is fifty degrees. Find x, angle P O Q.', show: [...all('ac'), 'ac.at', 'ac.ao', 'q'] },
        { say: 'Step one: angle O P T and angle O Q T are both ninety degrees, because a tangent is perpendicular to the radius.', show: 'm.0', focus: ['m.0', 'ac.rights'] },
        { say: 'Step two: the four angles of the quadrilateral add to three hundred sixty degrees. So x equals three hundred sixty, minus ninety, minus ninety, minus fifty.', show: 'm.1', focus: 'm.1' },
        { say: 'Three hundred sixty minus one hundred eighty is one hundred eighty, and one hundred eighty minus fifty is one hundred thirty. x is one hundred thirty degrees.', show: 'm.2', focus: ['m.2', 'ac.ao'] },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['90^\\circ + 90^\\circ = 180^\\circ', '\\angle PTQ + \\angle POQ = 180^\\circ', '50^\\circ + 130^\\circ = 180^\\circ \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A shortcut', md: 'With two tangents from one point, the angle at $T$ and the angle at the centre add to $180^\\circ$.' },
      ],
      lines: [
        { say: 'Notice that the two right angles always add to one hundred eighty degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves one hundred eighty degrees for the other two angles. So angle P T Q plus angle P O Q is always one hundred eighty degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Here, fifty plus one hundred thirty is one hundred eighty. The shortcut agrees.', show: ['m.2', 'tip'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$TP$ and $TQ$ are tangents to a circle with centre $O$, touching it at $P$ and $Q$. $\\angle POQ = 140^\\circ$. Find $\\angle PTQ$.',
          choices: ['$140^\\circ$', '$40^\\circ$', '$220^\\circ$', '$70^\\circ$'],
          answer: 1,
          working: '$\\angle OPT = \\angle OQT = 90^\\circ$, so $\\angle PTQ = 360^\\circ - 90^\\circ - 90^\\circ - 140^\\circ = 40^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. T P and T Q are tangents to a circle with centre O, touching it at P and Q. Angle P O Q is one hundred forty degrees. Find angle P T Q. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B, forty degrees. The right angles at P and Q add to one hundred eighty degrees, so the other two angles add to one hundred eighty degrees as well. One hundred eighty minus one hundred forty is forty. Choice D cuts one hundred forty in half, but that rule is for inscribed angles, not tangents.', show: 'q.answer' },
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
            'Two tangents from $T$ touch the circle at $P$ and $Q$, and $\\angle OPT = \\angle OQT = 90^\\circ$.',
            'The angles of quadrilateral $OPTQ$ add to $360^\\circ$.',
            'So $\\angle PTQ + \\angle POQ = 180^\\circ$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two tangents from the same point touch the circle at two points, and each one meets its radius at a right angle.', show: 'sum.0' },
        { say: 'The four angles of the quadrilateral add to three hundred sixty degrees.', show: 'sum.1' },
        { say: 'So the angle at T and the angle at the centre add to one hundred eighty degrees. In the next part, you will discover that the two tangent segments are the same length. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
