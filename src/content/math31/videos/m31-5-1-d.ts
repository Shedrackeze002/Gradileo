import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, guide, note, plane, plot, rename, tangent } from './lib/m31-5-graphs.ts';

const PI = Math.PI;

// f(x) = x + 2 cos x on [0, 2π], with horizontal tangents at x = π/6 and x = 5π/6.
const f = (x: number) => x + 2 * Math.cos(x);
const g = plane({ x: [0, 2 * PI + 0.2], y: [0, 9], xStep: PI / 2, yStep: 1, every: 0, width: 6.2, height: 5.6 });

// A mass on a spring: s(t) = 5 cos 2t centimetres after t seconds.
const s = (t: number) => 5 * Math.cos(2 * t);
const sp = rename(plane({ x: [0, PI + 0.15], y: [-6, 6], xStep: PI / 4, yStep: 1, every: 0, width: 6.2, height: 5.6 }), 't', 's');

const video: Explainer = {
  id: 'm31-5-1-d',
  lessonId: 'm31-5-1',
  title: 'Derivatives of Trigonometric Functions, Part 4: Applications',
  thumbnailTitle: 'Horizontal Tangents and Springs',
  thumbnail: 'ht',
  summary: 'Using trigonometric derivatives: f(x) = x + 2 cos x has horizontal tangents where sin x = ½, at x = π/6 and 5π/6, and a mass on a spring at s(t) = 5 cos 2t cm has velocity v(t) = −10 sin 2t, so −10 cm/s at t = π/4 s and about −9.09 cm/s at t = 1 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 4', title: 'Using Trig Derivatives', subtitle: 'Horizontal tangents and a mass on a spring' }],
      lines: [
        { say: 'Now that we can differentiate trigonometric functions, we can put the derivatives to work.', show: 'title' },
        { say: 'In this video, you will find where a graph has horizontal tangent lines, and find the velocity of a mass bouncing on a spring.' },
      ],
    },
    {
      chapter: 'Horizontal tangents',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = x + 2\\cos x, \\qquad 0 \\le x < 2\\pi',
            "f'(x) = 1 - 2\\sin x = 0",
            '\\sin x = \\tfrac{1}{2}',
            'x = \\tfrac{\\pi}{6} \\text{ (quadrant I)} \\quad \\text{or} \\quad x = \\tfrac{5\\pi}{6} \\text{ (quadrant II)}',
          ],
        },
      ],
      lines: [
        { say: 'Find all x between zero and two pi, including zero, where f of x equals x plus two cosine x has a horizontal tangent.', show: 'm.0', focus: 'm.0' },
        { say: 'A horizontal tangent line has slope zero, so set the derivative equal to zero. The derivative of x is one, and the derivative of two cosine x is negative two sine x. So one minus two sine x equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Solve for sine x: two sine x equals one, so sine x equals one half.', show: 'm.2', focus: 'm.2' },
        { say: 'On the unit circle, sine is one half at pi over six, in quadrant one. Sine is also positive in quadrant two, at pi minus pi over six, which is five pi over six. So there are two answers: pi over six and five pi over six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('ht', [
          g,
          edgeNumbers(g, { xs: [PI / 6, (5 * PI) / 6, (3 * PI) / 2, 2 * PI], ys: [0, 2, 4, 6, 8] }),
          plot(g, { id: 'f', f, from: 0, to: 2 * PI, samples: 200 }),
          note(g, { id: 'f-t', x: 2.4, y: 7.4, tex: 'y = x + 2\\cos x', tone: 'brand' }),
          guide(g, 'g0', [PI / 6, f(PI / 6)], [PI / 6, 0], 'muted', { group: 'pts' }),
          guide(g, 'g1', [(5 * PI) / 6, f((5 * PI) / 6)], [(5 * PI) / 6, 0], 'muted', { group: 'pts' }),
          tangent(g, { id: 't0', a: PI / 6, y: f(PI / 6), m: 0, left: 0.7, right: 0.7, tone: 'theta', dot: '' }),
          tangent(g, { id: 't1', a: (5 * PI) / 6, y: f((5 * PI) / 6), m: 0, left: 0.7, right: 0.7, tone: 'theta', dot: '' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f\\left(\\tfrac{\\pi}{6}\\right) = \\tfrac{\\pi}{6} + \\sqrt{3} \\approx 2.26', 'f\\left(\\tfrac{5\\pi}{6}\\right) = \\tfrac{5\\pi}{6} - \\sqrt{3} \\approx 0.89'],
        },
      ],
      lines: [
        { say: 'Here is the graph of y equals x plus two cosine x.', show: ['ht.grid', 'ht.axes', 'ht.f', 'ht.f-t'] },
        { say: 'At pi over six, the height is pi over six plus the square root of three, about 2.26. The tangent line is horizontal at the top of a small hill.', show: ['ht.t0-all', 'ht.g0', 'm.0'], focus: ['ht.t0', 'm.0'] },
        { say: 'At five pi over six, the height is five pi over six minus the square root of three, about 0.89. The tangent line is horizontal at the bottom of a valley.', show: ['ht.t1-all', 'ht.g1', 'm.1'], focus: ['ht.t1', 'm.1'] },
        { say: 'Everywhere else, the derivative is not zero, and the graph is climbing or falling.', focus: 'ht.f' },
      ],
    },
    {
      chapter: 'A mass on a spring',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A mass on a spring has position $s(t) = 5\\cos 2t$ cm after $t$ seconds. Find its velocity at $t = \\frac{\\pi}{4}$ s and at $t = 1$ s.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            "v(t) = s'(t) = -5\\sin 2t \\cdot 2 = -10\\sin 2t",
            'v\\left(\\tfrac{\\pi}{4}\\right) = -10\\sin\\tfrac{\\pi}{2} = -10\\text{ cm/s}',
            'v(1) = -10\\sin 2 \\approx -9.09\\text{ cm/s} \\quad (\\text{radians})',
          ],
        },
      ],
      lines: [
        { say: 'A mass on a spring bobs up and down. Its position is s of t equals five cosine two t centimetres, after t seconds. Find its velocity at pi over four seconds, and at one second.', show: 'q' },
        { say: 'Velocity is the derivative of position. Use the chain rule: the derivative of cosine is negative sine, and the inside, two t, has derivative two. So v of t is negative five sine two t, times two, which is negative ten sine two t.', show: 'm.0', focus: 'm.0' },
        { say: 'At pi over four, two t is pi over two, and sine of pi over two is one. So the velocity is negative ten centimetres per second.', show: 'm.1', focus: 'm.1' },
        { say: 'At one second, two t is two, so the velocity is negative ten sine two. Two here means two radians, so check that your calculator is in radian mode. That gives about negative 9.09 centimetres per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Reading the velocity',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('sp', [
          sp,
          edgeNumbers(sp, { xs: [PI / 4, PI / 2, (3 * PI) / 4, PI], ys: [-5, 0, 5] }),
          plot(sp, { id: 's', f: s, from: 0, to: PI, samples: 200 }),
          tangent(sp, { id: 't0', a: PI / 4, y: 0, m: -10, left: 0.45, right: 0.45, tone: 'opp', dot: '' }),
          note(sp, { id: 'v0', x: 1.75, y: 3.3, tex: 'v = -10', tone: 'opp' }),
          dots(sp, [
            { id: 'top', x: 0, y: 5, tone: 'theta', place: 'right', tex: '' },
            { id: 'bot', x: PI / 2, y: -5, tone: 'theta', place: 'below', tex: '' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$v < 0$: the mass moves in the negative direction.', 'At $t = \\frac{\\pi}{4}$ it passes its rest position, $s = 0$, at its fastest.', 'At the top and bottom, $v = 0$.'],
        },
      ],
      lines: [
        { say: 'Here is the graph of the position. The mass starts five centimetres above its rest position, falls to five below at pi over two, and rises again.', show: ['sp.grid', 'sp.axes', 'sp.s', 'sp.top', 'sp.bot'] },
        { say: 'The velocity is the slope of this graph. At pi over four, the slope is negative ten: the steepest the graph ever gets. A negative velocity means the mass is moving in the negative direction, down.', show: ['sp.t0-all', 'sp.v0', 'b.0'], focus: ['sp.t0', 'b.0'] },
        { say: 'At that moment the mass passes through its rest position, s equals zero, at its greatest speed.', show: 'b.1', focus: 'b.1' },
        { say: 'At the top and the bottom, the tangent line is horizontal, so the velocity is zero: the mass stops for an instant and turns around.', show: 'b.2', focus: ['b.2', 'sp.top', 'sp.bot'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find all $x$ in $0 \\le x < 2\\pi$ where $f(x) = x - 2\\sin x$ has a horizontal tangent.',
          choices: ['$x = \\dfrac{\\pi}{6}$ and $x = \\dfrac{5\\pi}{6}$', '$x = \\dfrac{\\pi}{3}$ and $x = \\dfrac{2\\pi}{3}$', '$x = \\dfrac{\\pi}{3}$ and $x = \\dfrac{5\\pi}{3}$', '$x = \\dfrac{2\\pi}{3}$ and $x = \\dfrac{4\\pi}{3}$'],
          answer: 2,
          working: "$f'(x) = 1 - 2\\cos x = 0$, so $\\cos x = \\frac{1}{2}$. Cosine is positive in quadrants I and IV: $x = \\frac{\\pi}{3}$ or $x = \\frac{5\\pi}{3}$.",
        },
      ],
      lines: [
        { say: 'Your turn. Find all x between zero and two pi, including zero, where f of x equals x minus two sine x has a horizontal tangent. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f prime of x is one minus two cosine x, which is zero when cosine x is one half. Cosine is positive in quadrants one and four, so x is pi over three or five pi over three. Choice A solves sine x equals one half instead.', show: 'q.answer' },
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
            "Horizontal tangents: solve $f'(x) = 0$, and find every angle in the interval.",
            "Velocity is the derivative of position: $v(t) = s'(t)$.",
            'Use exact values at special angles, and radian mode for decimals.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find horizontal tangents, solve f prime of x equals zero, and use the unit circle to find every angle in the interval.', show: 'sum.0' },
        { say: 'Velocity is the derivative of position, and its sign tells you which way an object is moving.', show: 'sum.1' },
        { say: 'And use exact values at special angles, with radian mode for decimals. Next, we find the derivatives of exponential and logarithmic functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
