import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, dot, ln, on, pt, ring, sq } from './lib/m9-8-figures.ts';

type P = [number, number];

const R = 4;
const rad = (d: number) => (d * Math.PI) / 180;

// A wheel on a road: the road touches the circle only at P, straight below the centre. A second
// line crosses the circle at two points, and a third misses it.
const lines = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { P: 270 }, centrePlace: 'above' }),
    pt('t1', [-6.5, -R]),
    pt('t2', [6.5, -R]),
    pt('s1', [-6.5, 2.6]),
    pt('s2', [6.5, -0.4]),
    pt('m1', [-6.5, 5.6]),
    pt('m2', [6.5, 4.4]),
    ln('miss', 'm1', 'm2', { tone: 'muted', dashed: true }),
    ln('cross', 's1', 's2', { tone: 'muted', dashed: true }),
    ln('tan', 't1', 't2', { tone: 'adj', label: '\\text{tangent}', side: 'right', at: 0.8 }),
    ln('op', 'O', 'P', { tone: 'opp' }),
    sq('rp', 'P', 'O', 't2'),
  ]);

/**
 * A tangent at P (at `p` degrees on the circle), with T on it so that ∠POT is `pot` degrees: the
 * right triangle OPT, drawn to scale, with ∠OTP = 90° − ∠POT.
 */
const triangle = (id: string, p: number, pot: number, labels: { o?: string; t?: string }) => {
  const P0 = on([0, 0], R, p);
  const len = R * Math.tan(rad(pot));
  const dir: P = [Math.cos(rad(p + 90)), Math.sin(rad(p + 90))];
  const T: P = [P0[0] + len * dir[0], P0[1] + len * dir[1]];
  const back: P = [P0[0] - 0.35 * len * dir[0], P0[1] - 0.35 * len * dir[1]];
  const far: P = [P0[0] + 1.25 * len * dir[0], P0[1] + 1.25 * len * dir[1]];
  return figure(id, [
    ring({ r: R, pts: { P: p }, centrePlace: 'left' }),
    dot('T', T, 'below right'),
    pt('b', back),
    pt('f', far),
    ln('line', 'b', 'f', { tone: 'muted' }),
    ln('pt', 'P', 'T', { tone: 'adj' }),
    ln('op', 'O', 'P', { tone: 'opp' }),
    ln('ot', 'O', 'T', { tone: 'hyp' }),
    sq('rp', 'P', 'O', 'T'),
    ...(labels.o ? [ang('ao', 'O', 'P', 'T', { label: labels.o, r: 36 })] : []),
    ...(labels.t ? [ang('at', 'T', 'O', 'P', { label: labels.t, r: 44, tone: 'good', dist: 64 })] : []),
  ]);
};

const video: Explainer = {
  id: 'm9-8-3',
  lessonId: 'm9-8-3',
  title: 'Tangent Properties, Part 1: A Tangent Meets the Radius',
  thumbnailTitle: 'A Tangent Meets the Radius',
  thumbnail: 'ex',
  summary:
    'A tangent is a line that touches a circle at exactly one point, the point of tangency. The tangent property: a tangent is perpendicular to the radius at the point of tangency, so if PT is tangent to the circle at P, then ∠OPT = 90°. If ∠POT = 40°, the angles of triangle OPT give ∠OTP = 180° − 90° − 40° = 50°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 1', title: 'A Tangent Meets the Radius', subtitle: 'Touching at just one point' }],
      lines: [
        { say: 'When a bike wheel rolls along a flat road, the road touches the wheel at just one point.', show: 'title' },
        { say: 'A line that touches a circle like that is called a tangent. In this part, you will see how a tangent meets the radius, and use it to find angles.' },
      ],
    },
    {
      chapter: 'Tangent lines',
      layout: 'split',
      leftWidth: 600,
      left: [lines('ln')],
      right: [{ kind: 'callout', id: 'd', tone: 'definition', title: 'Tangent', md: 'A **tangent** is a line that touches a circle at **exactly one point**. That point is the **point of tangency**.' }],
      lines: [
        { say: 'A line and a circle can meet in different ways. This line crosses the circle, so it meets it at two points. And this line misses the circle completely.', show: ['ln.fill', 'ln.outline', 'ln.cross', 'ln.miss'], focus: ['ln.cross', 'ln.miss'] },
        { say: 'This line, like the road under a wheel, touches the circle at just one point, P. A line like this is called a tangent.', show: ['ln.tan', 'ln.nP', 'd'], focus: 'ln.tan' },
        { say: 'The point where a tangent touches the circle is called the point of tangency. Here, the point of tangency is P.', focus: 'ln.nP' },
      ],
    },
    {
      chapter: 'The tangent property',
      layout: 'split',
      leftWidth: 600,
      left: [lines('tp')],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Tangent property', md: 'A tangent is **perpendicular** to the radius at the point of tangency.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['PT \\text{ tangent at } P', '\\Rightarrow\\; \\angle OPT = 90^\\circ'] },
      ],
      lines: [
        { say: 'Now draw the radius from the centre, O, to the point of tangency, P.', show: ['tp.fill', 'tp.outline', 'tp.names', 'tp.tan', 'tp.op'], focus: 'tp.op' },
        { say: 'The tangent property says: a tangent is perpendicular to the radius at the point of tangency. They meet at a right angle.', show: ['tp.rp', 'k'], focus: 'tp.rp' },
        { say: 'Think of the wheel again. A spoke going straight down from the middle of the wheel meets the road at a right angle.' },
        { say: 'So if a line P T is tangent to a circle at P, then angle O P T is ninety degrees.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'An angle in the triangle',
      layout: 'split',
      leftWidth: 600,
      left: [triangle('ex', 240, 40, { o: '40^\\circ', t: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$PT$ is tangent to the circle at $P$, and $\\angle POT = 40^\\circ$. Find $x = \\angle OTP$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle OPT = 90^\\circ', 'x = 180^\\circ - 90^\\circ - 40^\\circ', 'x = 50^\\circ'] },
      ],
      lines: [
        { say: 'Let’s use it. P T is tangent to the circle at P, and angle P O T is forty degrees. Find x, angle O T P.', show: ['ex.fill', 'ex.outline', 'ex.names', 'ex.nT', 'ex.line', 'ex.pt', 'ex.op', 'ex.ot', 'ex.ao', 'ex.at', 'q'] },
        { say: 'Step one: the tangent is perpendicular to the radius, so angle O P T is ninety degrees.', show: ['ex.rp', 'm.0'], focus: ['ex.rp', 'm.0'] },
        { say: 'Step two: the angles of triangle O P T add to one hundred eighty degrees. So x equals one hundred eighty, minus ninety, minus forty.', show: 'm.1', focus: 'm.1' },
        { say: 'x is fifty degrees.', show: 'm.2', focus: ['m.2', 'ex.at'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$PT$ is tangent at $P$ to a circle with centre $O$. $\\angle OTP = 28^\\circ$. Find $\\angle POT$.',
          choices: ['$62^\\circ$', '$152^\\circ$', '$28^\\circ$', '$90^\\circ$'],
          answer: 0,
          working: '$\\angle OPT = 90^\\circ$ (tangent $\\perp$ radius), so $\\angle POT = 180^\\circ - 90^\\circ - 28^\\circ = 62^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. P T is tangent at P to a circle with centre O. Angle O T P is twenty-eight degrees. Find angle P O T. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A, sixty-two degrees. The tangent meets the radius at a right angle, so angle O P T is ninety degrees. One hundred eighty, minus ninety, minus twenty-eight, is sixty-two. Choice B forgets the right angle, and only takes twenty-eight away from one hundred eighty.', show: 'q.answer' },
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
            'A **tangent** touches a circle at exactly one point, the **point of tangency**.',
            'A tangent is perpendicular to the radius there: $\\angle OPT = 90^\\circ$.',
            'Then the angles of triangle $OPT$ add to $180^\\circ$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tangent touches a circle at exactly one point, called the point of tangency.', show: 'sum.0' },
        { say: 'A tangent is perpendicular to the radius at the point of tangency.', show: 'sum.1' },
        { say: 'So triangle O P T has a right angle at P, and its angles add to one hundred eighty degrees. In the next part, you will use the Pythagorean theorem with tangents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
