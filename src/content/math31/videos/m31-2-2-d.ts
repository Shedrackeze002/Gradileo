import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { guide, hole, join, numbers, piece, plane, sectorAreas, tag } from './lib/m31-2-graphs.ts';

// The triangle, sector and larger triangle in a circle of radius 1, for an angle of 40°.
const areas = (id: string) => figure(id, [sectorAreas({ deg: 40, r: 5 })]);

// cos θ ≤ sin θ / θ ≤ 1 near 0. The axes are named θ and y by hand.
const g = plane({ x: [-1.5, 1.5], y: [0, 1.5], xStep: 0.5, yStep: 0.25, every: 0, width: 8, height: 6, titles: { x: ' ', y: ' ' } });
const squeeze = figure('sq', [
  g,
  numbers(g, 0.5, 0.25),
  join([tag(g, 'th', 1.5, 0, '\\theta', 'right'), tag(g, 'yn', 0, 1.5, 'y', 'above right')].map((p) => ({ ...p, items: p.items.map((i) => ({ ...i, group: 'axes' })) }))),
  guide(g, 'one', [-1.5, 1], [1.5, 1], 'good', { dashed: false, weight: 3.5 }),
  piece(g, { id: 'cos', f: Math.cos, tone: 'opp' }),
  piece(g, { id: 'a', f: (t) => Math.sin(t) / t, from: -1.5, to: -1e-6 }),
  piece(g, { id: 'b', f: (t) => Math.sin(t) / t, from: 1e-6, to: 1.5 }),
  hole(g, 'H', 0, 1, { tex: '(0, 1)', place: 'above right' }),
]);

const video: Explainer = {
  id: 'm31-2-2-d',
  lessonId: 'm31-2-2',
  title: 'Evaluating Limits Algebraically, Part 4: Why sin θ / θ Approaches 1',
  thumbnailTitle: 'The Limit of sin θ / θ',
  thumbnail: 'ar',
  summary: 'Why the limit of sin θ/θ as θ → 0 is 1, with θ in radians: in a circle of radius 1, a triangle inside the sector, the sector and a triangle containing it have areas ½ sin θ ≤ ½ θ ≤ ½ tan θ, which gives cos θ ≤ sin θ/θ ≤ 1. As θ → 0, cos θ → 1, so sin θ/θ is squeezed to 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 4', title: 'Why sin θ / θ Approaches 1', subtitle: 'A special limit, squeezed' }],
      lines: [
        { say: 'Substituting zero into sine theta over theta gives zero over zero. But this time, no factoring or conjugate can cancel anything, because the theta is inside the sine.', show: 'title' },
        { say: 'A table suggested the limit is one. In this video, you will see why it is exactly one, using three areas in a circle.' },
      ],
    },
    {
      chapter: 'Three areas',
      layout: 'split',
      leftWidth: 520,
      left: [areas('ar')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{triangle}} = \\dfrac{1}{2}\\sin\\theta', '\\brand{\\text{sector}} = \\dfrac{\\theta}{2\\pi} \\cdot \\pi = \\dfrac{1}{2}\\theta', '\\opp{\\text{big triangle}} = \\dfrac{1}{2}\\tan\\theta'] },
      ],
      lines: [
        { say: 'Draw a circle of radius one, and an angle theta at its centre, between zero and a right angle. Theta is in radians.', show: ['ar.axes', 'ar.arc', 'ar.one', 'ar.rad', 'ar.theta'], focus: 'ar.theta' },
        { say: 'First, the triangle inside the slice, in blue. Its base is the radius, one, and its height is sine theta. So its area is one half sine theta.', show: ['ar.inner', 'ar.sin', 'm.0'], focus: ['ar.inner', 'm.0'] },
        { say: 'Next, the slice of the circle itself, called a sector, in purple. The whole circle is two pi radians and has area pi. The sector is theta out of two pi of the circle, so its area is one half theta.', show: ['ar.sector', 'm.1'], focus: ['ar.sector', 'm.1'] },
        { say: 'Finally, the bigger triangle, in orange, which reaches up the vertical line at the edge of the circle. Its base is one and its height is tangent theta. So its area is one half tangent theta.', show: ['ar.outer', 'ar.tan', 'm.2'], focus: ['ar.outer', 'm.2'] },
      ],
    },
    {
      chapter: 'Nested areas',
      layout: 'split',
      leftWidth: 520,
      left: [areas('ar2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{1}{2}\\sin\\theta \\le \\dfrac{1}{2}\\theta \\le \\dfrac{1}{2}\\tan\\theta', '\\sin\\theta \\le \\theta \\le \\tan\\theta'] }],
      lines: [
        { say: 'Look at how the three shapes fit together. The small triangle fits inside the sector, and the sector fits inside the big triangle.', show: ['ar2.axes', 'ar2.arc', 'ar2.one', 'ar2.rad', 'ar2.theta', 'ar2.outer', 'ar2.sector', 'ar2.inner', 'ar2.sin', 'ar2.tan'] },
        { say: 'So their areas are in order: one half sine theta is at most one half theta, which is at most one half tangent theta.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply everything by two: sine theta is at most theta, which is at most tangent theta.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The squeeze',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\sin\\theta \\le \\theta \\le \\dfrac{\\sin\\theta}{\\cos\\theta}', '1 \\le \\dfrac{\\theta}{\\sin\\theta} \\le \\dfrac{1}{\\cos\\theta}', '\\cos\\theta \\le \\dfrac{\\sin\\theta}{\\theta} \\le 1'],
        },
      ],
      lines: [
        { say: 'Write tangent theta as sine theta over cosine theta.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide every part by sine theta, which is positive here. That gives one, at most theta over sine theta, at most one over cosine theta.', show: 'm.1', focus: 'm.1' },
        { say: 'Finally, flip every part upside down. Taking reciprocals of positive numbers reverses the inequalities. So cosine theta is at most sine theta over theta, which is at most one.', show: 'm.2', focus: 'm.2' },
        { say: 'Sine theta over theta is trapped between cosine theta and one.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squeezed to one',
      layout: 'split',
      leftWidth: 620,
      left: [squeeze],
      right: [
        { kind: 'bullets', id: 'k', items: ['$\\good{y = 1}$, on top', '$\\brand{y = \\dfrac{\\sin\\theta}{\\theta}}$, in the middle', '$\\opp{y = \\cos\\theta}$, below'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\lim_{\\theta \\to 0} \\dfrac{\\sin\\theta}{\\theta} = 1', '(\\theta \\text{ in radians})'] },
      ],
      lines: [
        { say: 'Here is the picture. The green line is y equals one, and the orange curve is y equals cosine theta.', show: ['sq.grid', 'sq.axes', 'sq.one', 'sq.cos', 'k.0', 'k.2'] },
        { say: 'Sine theta over theta, in purple, is trapped between them.', show: ['sq.a', 'sq.b', 'sq.H', 'k.1'], focus: ['sq.a', 'sq.b', 'k.1'] },
        { say: 'As theta approaches zero, cosine theta approaches one. The two walls close in on the same height, one, so the curve trapped between them has nowhere else to go. Its limit is one too.', focus: ['sq.H', 'sq.cos'] },
        { say: 'For negative theta, every part has the same value as for positive theta, so the same is true from the left. The limit as theta approaches zero of sine theta over theta is one.', show: 'm', focus: 'm' },
        { say: 'Notice where radians were needed: the area of the sector is one half theta only when theta is in radians. In degrees, the limit is not one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $0 < \\theta < \\dfrac{\\pi}{2}$, which inequality is true?',
          choices: ['$\\sin\\theta \\le \\tan\\theta \\le \\theta$', '$\\sin\\theta \\le \\theta \\le \\tan\\theta$', '$\\theta \\le \\sin\\theta \\le \\tan\\theta$', '$\\tan\\theta \\le \\theta \\le \\sin\\theta$'],
          answer: 1,
          working: 'The small triangle (area $\\dfrac{1}{2}\\sin\\theta$) fits inside the sector (area $\\dfrac{1}{2}\\theta$), which fits inside the big triangle (area $\\dfrac{1}{2}\\tan\\theta$).',
        },
      ],
      lines: [
        { say: 'Your turn. For theta between zero and pi over two, which inequality is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The small triangle fits inside the sector, which fits inside the big triangle, so sine theta is at most theta, which is at most tangent theta. Choice A puts tangent in the middle, but the big triangle contains the whole sector, so its area is the largest.', show: 'q.answer' },
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
          items: ['Areas in a circle of radius $1$: $\\frac{1}{2}\\sin\\theta \\le \\frac{1}{2}\\theta \\le \\frac{1}{2}\\tan\\theta$.', 'So $\\cos\\theta \\le \\dfrac{\\sin\\theta}{\\theta} \\le 1$, and $\\cos\\theta \\to 1$.', '$\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1$, with $\\theta$ in radians.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a circle of radius one, the triangle, the sector and the bigger triangle have areas one half sine theta, one half theta, and one half tangent theta, in that order.', show: 'sum.0' },
        { say: 'That traps sine theta over theta between cosine theta and one, and cosine theta approaches one.', show: 'sum.1' },
        { say: 'So the limit of sine theta over theta, as theta approaches zero, is one, with theta in radians. In the next part, we use this limit to find others. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
