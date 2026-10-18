import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, note, plane, plot, steps, tangent } from './lib/m31-5-graphs.ts';

const PI = Math.PI;
const KEYS = [0, PI / 2, PI, (3 * PI) / 2, 2 * PI];

// y = sin x with its tangent lines at the five key angles; their slopes trace y = cos x.
const s = plane({ x: [-0.75, 2 * PI + 0.75], y: [-1.7, 1.7], xStep: PI / 2, yStep: 1, every: 0, width: 10, height: 4.1 });
// y = cos x with its tangent lines; their slopes trace y = −sin x.
const c = plane({ x: [-0.75, 2 * PI + 0.75], y: [-1.7, 1.7], xStep: PI / 2, yStep: 1, every: 0, width: 7.2, height: 5.4 });

const video: Explainer = {
  id: 'm31-5-1',
  lessonId: 'm31-5-1',
  title: 'Derivatives of Trigonometric Functions, Part 1: Sine and Cosine',
  thumbnailTitle: 'Derivatives of $\\sin x$ and $\\cos x$',
  thumbnail: 'cs',
  summary: 'Why the derivative of sin x is cos x: the slopes of the sine curve trace the cosine curve, and the limits of sin h / h and (cos h − 1) / h as h approaches 0, in radians, prove it. The derivative of cos x is −sin x, every derivative needs radian mode, and f′(π/3) = 2 − √3 for f(x) = 4 sin x + 2 cos x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 1', title: 'Derivatives of Sine and Cosine', subtitle: 'The slope of a wave' }],
      lines: [
        { say: 'Tides, springs, sound waves and alternating current all rise and fall in a repeating pattern, and they are modelled with sine and cosine.', show: 'title' },
        { say: 'To find how fast they change, we need the derivatives of the trigonometric functions. In this video, you will see why the derivative of sine x is cosine x, and find the derivative of cosine x too.' },
      ],
    },
    {
      chapter: 'The slope of the sine curve',
      layout: 'center',
      main: [
        figure('sl', [
          s,
          edgeNumbers(s, { xs: steps(0, 2 * PI, PI / 2), ys: [-1, 0, 1] }),
          plot(s, { id: 'sin', f: Math.sin, from: 0, to: 2 * PI, samples: 200 }),
          note(s, { id: 'sin-t', x: 2.95, y: 1.3, tex: 'y = \\sin x', tone: 'brand' }),
          tangent(s, { id: 't0', a: 0, y: 0, m: 1, left: 0.55, right: 0.55, tone: 'theta', dot: '' }),
          tangent(s, { id: 't1', a: PI / 2, y: 1, m: 0, left: 0.55, right: 0.55, tone: 'theta', dot: '' }),
          tangent(s, { id: 't2', a: PI, y: 0, m: -1, left: 0.55, right: 0.55, tone: 'theta', dot: '' }),
          tangent(s, { id: 't3', a: (3 * PI) / 2, y: -1, m: 0, left: 0.55, right: 0.55, tone: 'theta', dot: '' }),
          tangent(s, { id: 't4', a: 2 * PI, y: 0, m: 1, left: 0.55, right: 0.55, tone: 'theta', dot: '' }),
          note(s, { id: 'm0', x: 0.75, y: -0.5, tex: '\\text{slope } 1', tone: 'theta' }),
          note(s, { id: 'm1', x: PI / 2, y: 1.36, tex: '\\text{slope } 0', tone: 'theta' }),
          note(s, { id: 'm2', x: 4.05, y: 0.45, tex: '\\text{slope } {-1}', tone: 'theta' }),
          note(s, { id: 'm3', x: (3 * PI) / 2, y: -1.36, tex: '\\text{slope } 0', tone: 'theta' }),
          note(s, { id: 'm4', x: 6.62, y: -0.55, tex: '\\text{slope } 1', tone: 'theta' }),
          dots(s, KEYS.map((x, i) => ({ id: `d${i}`, x, y: Math.round(Math.cos(x)), tone: 'opp' as const, group: 'slopes' }))),
          plot(s, { id: 'cos', f: Math.cos, from: 0, to: 2 * PI, samples: 200, tone: 'opp', dashed: true }),
          note(s, { id: 'cos-t', x: 1.2, y: -1.2, tex: 'y = \\cos x', tone: 'opp' }),
        ]),
      ],
      lines: [
        { say: 'Here is the graph of y equals sine x, with x in radians. Let’s look at the slope of its tangent line at a few key points.', show: ['sl.grid', 'sl.axes', 'sl.sin', 'sl.sin-t'] },
        { say: 'At x equals zero, the curve climbs through the origin, and its tangent line has slope one.', show: ['sl.t0-all', 'sl.m0'], focus: ['sl.t0', 'sl.m0'] },
        { say: 'At pi over two, the curve is at its peak. The tangent line is horizontal, so the slope is zero.', show: ['sl.t1-all', 'sl.m1'], focus: ['sl.t1', 'sl.m1'] },
        { say: 'At pi, the curve falls through the axis as steeply as it ever does, with slope negative one.', show: ['sl.t2-all', 'sl.m2'], focus: ['sl.t2', 'sl.m2'] },
        { say: 'At three pi over two, it is at the bottom of a valley: slope zero again. And at two pi, it climbs with slope one, just as it did at the start.', show: ['sl.t3-all', 'sl.m3', 'sl.t4-all', 'sl.m4'], focus: ['sl.t3', 'sl.t4'] },
        { say: 'Now plot those slopes as points: one, zero, negative one, zero, one. They sit exactly on another familiar curve.', show: 'sl.slopes', focus: 'sl.slopes' },
        { say: 'The cosine curve. At every x, the slope of the sine curve equals cosine x. So the derivative of sine x is cosine x.', show: ['sl.cos', 'sl.cos-t'], focus: 'sl.cos' },
      ],
    },
    {
      chapter: 'Two special limits',
      layout: 'center',
      main: [
        { kind: 'math', id: 'lim', size: 'lg', lines: ['\\lim_{h \\to 0}\\frac{\\sin h}{h} = 1, \\qquad \\lim_{h \\to 0}\\frac{\\cos h - 1}{h} = 0'] },
        {
          kind: 'table',
          id: 't',
          head: ['$h$ (radians)', '$\\dfrac{\\sin h}{h}$', '$\\dfrac{\\cos h - 1}{h}$'],
          rows: [
            ['$0.1$', '$0.998334$', '$-0.049958$'],
            ['$0.01$', '$0.999983$', '$-0.005000$'],
            ['$0.001$', '$0.9999998$', '$-0.000500$'],
          ],
        },
      ],
      lines: [
        { say: 'To prove it, we need two special limits, both with h in radians. As h approaches zero, sine h over h approaches one, and cosine h minus one, all over h, approaches zero.', show: 'lim' },
        { say: 'A table makes them believable. When h is 0.1, sine h over h is 0.998334, and cosine h minus one, over h, is about negative 0.05.', show: 't.0', focus: 't.0' },
        { say: 'When h is 0.01, the first is 0.999983, and the second is negative 0.005.', show: 't.1', focus: 't.1' },
        { say: 'And when h is 0.001, the first is 0.9999998, and the second is negative 0.0005. The first column closes in on one, and the second on zero.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Why the slope is cosine',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\frac{\\sin(x + h) - \\sin x}{h}',
            '= \\frac{\\sin x\\cos h + \\cos x\\sin h - \\sin x}{h}',
            '= \\sin x\\cdot\\opp{\\frac{\\cos h - 1}{h}} + \\cos x\\cdot\\adj{\\frac{\\sin h}{h}}',
            '\\to \\sin x\\cdot\\opp{0} + \\cos x\\cdot\\adj{1} = \\cos x',
          ],
        },
      ],
      lines: [
        { say: 'Start from the definition of the derivative: sine of x plus h, minus sine x, all over h.', show: 'm.0', focus: 'm.0' },
        { say: 'The sum identity says that sine of x plus h is sine x cosine h, plus cosine x sine h. Substitute it into the top.', show: 'm.1', focus: 'm.1' },
        { say: 'Now group the two terms with sine x. The quotient becomes sine x times cosine h minus one over h, plus cosine x times sine h over h.', show: 'm.2', focus: 'm.2' },
        { say: 'As h approaches zero, the orange part approaches zero, and the blue part approaches one. So the whole quotient approaches sine x times zero, plus cosine x times one, which is cosine x.', show: 'm.3', focus: 'm.3' },
        { say: 'The same method, with the identity for cosine of x plus h, gives the derivative of cosine.' },
      ],
    },
    {
      chapter: 'The derivative of cosine',
      layout: 'split',
      leftWidth: 700,
      left: [
        figure('cs', [
          c,
          edgeNumbers(c, { xs: steps(0, 2 * PI, PI / 2), ys: [-1, 0, 1] }),
          plot(c, { id: 'cos', f: Math.cos, from: 0, to: 2 * PI, samples: 200, tone: 'opp' }),
          tangent(c, { id: 't0', a: 0, y: 1, m: 0, left: 0.6, right: 0.6, tone: 'theta', dot: '' }),
          tangent(c, { id: 't1', a: PI / 2, y: 0, m: -1, left: 0.6, right: 0.6, tone: 'theta', dot: '' }),
          tangent(c, { id: 't2', a: PI, y: -1, m: 0, left: 0.6, right: 0.6, tone: 'theta', dot: '' }),
          tangent(c, { id: 't3', a: (3 * PI) / 2, y: 0, m: 1, left: 0.6, right: 0.6, tone: 'theta', dot: '' }),
          plot(c, { id: 'msin', f: (x) => -Math.sin(x), from: 0, to: 2 * PI, samples: 200, tone: 'adj', dashed: true }),
          note(c, { id: 'msin-t', x: 2.05, y: 1.35, tex: 'y = -\\sin x', tone: 'adj' }),
          note(c, { id: 'cos-t', x: 5.0, y: -1.35, tex: 'y = \\cos x', tone: 'opp' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\frac{d}{dx}\\sin x = \\cos x', '\\frac{d}{dx}\\cos x = -\\sin x'] },
      ],
      lines: [
        { say: 'Here is the cosine curve. At x equals zero it is at its peak, so its slope is zero.', show: ['cs.grid', 'cs.axes', 'cs.cos', 'cs.cos-t', 'cs.t0-all'], focus: 'cs.t0' },
        { say: 'At pi over two, it falls as steeply as it can, with slope negative one. At pi, its slope is zero, and at three pi over two, it climbs with slope one.', show: ['cs.t1-all', 'cs.t2-all', 'cs.t3-all'], focus: ['cs.t1', 'cs.t2', 'cs.t3'] },
        { say: 'Those slopes, zero, negative one, zero, one, trace the sine curve turned upside down: the graph of negative sine x.', show: ['cs.msin', 'cs.msin-t'], focus: 'cs.msin' },
        { say: 'So here are the two derivatives. The derivative of sine x is cosine x. The derivative of cosine x is negative sine x. Watch that minus sign: it belongs to cosine.', show: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree mode', md: 'These limits, and every derivative in this lesson, are true only in **radians**. In degrees, $\\dfrac{\\sin h^\\circ}{h} \\to \\dfrac{\\pi}{180}$, and every derivative picks up an extra factor of $\\dfrac{\\pi}{180}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{\\sin 1^\\circ}{1} \\approx 0.017\\,45 \\approx \\frac{\\pi}{180}'] },
      ],
      lines: [
        { say: 'Watch out for degree mode. The special limits, and every derivative in this lesson, are true only when the angle is in radians.', show: 'oops' },
        { say: 'In degrees, sine h over h does not approach one. Even at one degree it is only about 0.01745, which is pi over 180. So in degrees, every derivative would pick up an extra factor of pi over 180.', show: 'm.0', focus: 'm.0' },
        { say: 'In calculus, angles are always in radians. Set your calculator to radian mode before you work out a decimal value.' },
      ],
    },
    {
      chapter: 'An exact value',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = 4\\sin x + 2\\cos x',
            "f'(x) = 4\\cos x - 2\\sin x",
            "f'\\left(\\tfrac{\\pi}{3}\\right) = 4\\left(\\tfrac{1}{2}\\right) - 2\\left(\\tfrac{\\sqrt{3}}{2}\\right)",
            "f'\\left(\\tfrac{\\pi}{3}\\right) = 2 - \\sqrt{3}",
          ],
        },
      ],
      lines: [
        { say: 'Find f prime of pi over three, for f of x equals four sine x plus two cosine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate term by term. The derivative of four sine x is four cosine x. The derivative of two cosine x is two times negative sine x. So f prime of x is four cosine x minus two sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute pi over three, using the exact values from the unit circle. Cosine of pi over three is one half, and sine of pi over three is the square root of three over two.', show: 'm.2', focus: 'm.2' },
        { say: 'Four times one half is two, and two times the square root of three over two is the square root of three. So f prime of pi over three is two minus the square root of three, about 0.27.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "For $f(x) = 6\\cos x + 2\\sin x$, find $f'\\left(\\tfrac{\\pi}{6}\\right)$.",
          choices: ['$3 + \\sqrt{3}$', '$-3 + \\sqrt{3}$', '$3\\sqrt{3} + 1$', '$-3\\sqrt{3} + 1$'],
          answer: 1,
          working: "$f'(x) = -6\\sin x + 2\\cos x$, so $f'\\left(\\tfrac{\\pi}{6}\\right) = -6\\left(\\tfrac{1}{2}\\right) + 2\\left(\\tfrac{\\sqrt{3}}{2}\\right) = -3 + \\sqrt{3}$.",
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals six cosine x plus two sine x, find f prime of pi over six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. f prime of x is negative six sine x plus two cosine x. At pi over six, that is negative six times one half, plus two times the square root of three over two: negative three plus the square root of three. Choice A forgets that the derivative of cosine is negative sine.', show: 'q.answer' },
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
            'The slopes of $y = \\sin x$ trace $y = \\cos x$.',
            'In radians, $\\dfrac{\\sin h}{h} \\to 1$ and $\\dfrac{\\cos h - 1}{h} \\to 0$ as $h \\to 0$.',
            '$\\dfrac{d}{dx}\\sin x = \\cos x$ and $\\dfrac{d}{dx}\\cos x = -\\sin x$.',
            'Use exact unit-circle values, and radian mode for decimals.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The slopes of the sine curve trace the cosine curve.', show: 'sum.0' },
        { say: 'In radians, sine h over h approaches one, and cosine h minus one, over h, approaches zero. Those two limits prove the rule.', show: 'sum.1' },
        { say: 'The derivative of sine x is cosine x, and the derivative of cosine x is negative sine x.', show: 'sum.2' },
        { say: 'And use exact unit-circle values at special angles, with radian mode for decimals. In the next part, we find the derivatives of the other four trigonometric functions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
