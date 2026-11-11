import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const rad = Math.PI / 180;
const g = plane({ x: [0, 360], y: [-5, 5], xStep: 90, yStep: 1, width: 8, height: 4.6, titles: { x: '\\theta\\ (^\\circ)', y: 'y' }, every: 0 });
const yl = (v: number) => ({ points: { [`yl${v}`]: g.map(0, v) }, items: [{ kind: 'label' as const, id: `yl${v}`, at: `yl${v}`, tex: String(v), tone: 'muted' as const, place: 'left' as const, group: 'nums' }] });
const xl = (v: number) => ({ points: { [`xl${v}`]: g.map(v, 0) }, items: [{ kind: 'label' as const, id: `xl${v}`, at: `xl${v}`, tex: String(v), tone: 'muted' as const, place: 'below right' as const, group: 'nums' }] });

const video: Explainer = {
  id: 'mx-18-3',
  lessonId: 'mx-18-3',
  title: 'R sin(θ ± α)',
  thumbnail: 'gr',
  summary: 'a sin θ + b cos θ ≡ R sin(θ + α), with R = √(a² + b²) and tan α = b/a, found by comparing R cos α = a and R sin α = b. So 3 sin θ + 4 cos θ ≡ 5 sin(θ + 53.1°), whose greatest value is 5. To solve 3 sin θ + 4 cos θ = 2, solve sin(θ + 53.13°) = 0.4 in the shifted interval, giving θ ≈ 103.3° or 330.4°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Trigonometry', title: 'R sin(θ ± α)', subtitle: 'Two waves become one' }],
      lines: [
        { say: 'Add a sine wave to a cos wave with the same period, and the result is another wave with that period, just taller and shifted.', show: 'title' },
        { say: 'Writing "a" sine theta plus b cos theta as a single sine makes its greatest value, and its equations, easy. In this video, you will see how.' },
      ],
    },
    {
      chapter: 'One wave',
      layout: 'split',
      leftWidth: 620,
      left: [figure('gr', [g, yl(5), yl(-5), xl(90), xl(270), xl(360), plot(g, { id: 's', f: (t) => 3 * Math.sin(t * rad), tone: 'adj', dashed: true }), plot(g, { id: 'c', f: (t) => 4 * Math.cos(t * rad), tone: 'opp', dashed: true }), plot(g, { id: 'sum', f: (t) => 5 * Math.sin((t + 53.13) * rad), tone: 'brand' })], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Harmonic form', md: '$a\\sin\\theta + b\\cos\\theta \\equiv R\\sin(\\theta + \\alpha)$, with $R = \\sqrt{a^2 + b^2}$ and $\\tan\\alpha = \\dfrac{b}{a}$.' },
      ],
      lines: [
        { say: 'Here is three sine theta, in blue, and four cos theta, in orange.', show: ['gr.grid', 'gr.axes', 'gr.nums', 'gr.s', 'gr.c'] },
        { say: 'Add them, and we get a single wave, taller than both, and shifted to the left.', show: 'gr.sum', focus: 'gr.sum' },
        { say: 'In general, "a" sine theta plus b cos theta is identical to R sine of theta plus alpha, where R is the square root of "a" squared plus b squared, and tan alpha is b over "a".', show: 'def' },
      ],
    },
    {
      chapter: 'Finding R and α',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['R\\sin(\\theta + \\alpha) = R\\cos\\alpha\\sin\\theta + R\\sin\\alpha\\cos\\theta', 'R\\cos\\alpha = 3, \\quad R\\sin\\alpha = 4', 'R = \\sqrt{3^2 + 4^2} = 5, \\quad \\tan\\alpha = \\tfrac{4}{3}, \\ \\alpha \\approx 53.1^\\circ', '3\\sin\\theta + 4\\cos\\theta \\equiv 5\\sin(\\theta + 53.1^\\circ)'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'tan α is b over a', md: '$\\tan\\alpha = \\dfrac{R\\sin\\alpha}{R\\cos\\alpha} = \\dfrac{b}{a}$, not $\\dfrac{a}{b}$.' },
      ],
      lines: [
        { say: 'Let’s write three sine theta plus four cos theta in this form. Expand R sine of theta plus alpha with the addition formula.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare coefficients. The sine theta terms give R cos alpha equals three, and the cos theta terms give R sine alpha equals four.', show: 'm.1', focus: 'm.1' },
        { say: 'Squaring and adding gives R squared equals nine plus sixteen, so R is five. Dividing gives tan alpha equals four thirds, so alpha is about fifty three point one degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'So three sine theta plus four cos theta is identical to five sine of theta plus fifty three point one degrees.', show: 'm.3', focus: 'm.3' },
        { say: 'Tan alpha is R sine alpha over R cos alpha, which is b over "a". Turning it upside down gives the wrong angle.', show: 'mis' },
      ],
    },
    {
      chapter: 'Solving an equation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Solve $3\\sin\\theta + 4\\cos\\theta = 2$ for $0^\\circ \\le \\theta < 360^\\circ$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5\\sin(\\theta + 53.13^\\circ) = 2 \\;\\Rightarrow\\; \\sin(\\theta + 53.13^\\circ) = 0.4', '53.13^\\circ \\le \\theta + 53.13^\\circ < 413.13^\\circ', '\\theta + 53.13^\\circ = 156.42^\\circ \\text{ or } 383.58^\\circ', '\\theta \\approx 103.3^\\circ \\text{ or } 330.4^\\circ'] },
      ],
      lines: [
        { say: 'Since a sine lies between negative one and one, R sine of theta plus alpha lies between negative R and R. So the greatest value of three sine theta plus four cos theta is five.', show: 'q' },
        { say: 'Now solve three sine theta plus four cos theta equals two. In the new form, five sine of theta plus fifty three point one three equals two, so the sine is zero point four.', show: 'm.0', focus: 'm.0' },
        { say: 'Theta runs from zero to three hundred sixty, so theta plus alpha runs from fifty three point one three to four hundred thirteen point one three. Shift the interval like this before you solve.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse sine of zero point four is twenty three point five eight degrees, which is too small. In the shifted interval, the solutions are one hundred eighty minus that, and three hundred sixty plus that.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract alpha: theta is about one hundred three point three degrees, or three hundred thirty point four degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the greatest value of $5\\sin\\theta + 12\\cos\\theta$.',
          choices: ['$13$', '$17$', '$12$', '$7$'],
          answer: 0,
          working: '$R = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$, and the greatest value of $R\\sin(\\theta + \\alpha)$ is $R$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the greatest value of five sine theta plus twelve cos theta. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. R is the square root of twenty five plus one hundred forty four, which is thirteen, and the greatest value of R sine of theta plus alpha is R. Choice B just adds five and twelve.', show: 'q.answer' },
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
          items: ['$a\\sin\\theta + b\\cos\\theta \\equiv R\\sin(\\theta + \\alpha)$: $R = \\sqrt{a^2 + b^2}$, $\\tan\\alpha = \\dfrac{b}{a}$.', 'The greatest value is $R$ and the least is $-R$.', 'Solve in the shifted interval, then subtract $\\alpha$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a" sine theta plus b cos theta is R sine of theta plus alpha, with R the square root of "a" squared plus b squared, and tan alpha equal to b over "a".', show: 'sum.0' },
        { say: 'The greatest value is R, and the least is negative R.', show: 'sum.1' },
        { say: 'And to solve an equation, solve in the shifted interval, then subtract alpha. In the next lesson, we differentiate parametric equations, and sine and cos from first principles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
