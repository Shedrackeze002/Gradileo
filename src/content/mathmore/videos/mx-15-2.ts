import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { normalCurve } from './lib/mx-stats.ts';

const video: Explainer = {
  id: 'mx-15-2',
  lessonId: 'mx-15-2',
  title: 'The Inverse Normal Distribution',
  thumbnail: 'n',
  summary: 'The inverse normal finds the value a with a given probability to its left: find z with P(Z < z) = p, then a = μ + zσ. For heights N(170, 8²), the tallest 10% start at 170 + 1.2816 × 8 ≈ 180 cm (enter 0.9, the area to the left). An unknown μ or σ comes from (x − μ)/σ = z: P(X < 56) = 0.8 with μ = 50 gives σ = 6 ÷ 0.8416 ≈ 7.13.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Correlation and the Normal Distribution', title: 'The Inverse Normal Distribution', subtitle: 'From a probability back to a value' }],
      lines: [
        { say: 'The normal distribution usually answers questions like: what fraction of women are shorter than one hundred sixty centimetres?', show: 'title' },
        { say: 'The inverse normal answers the reverse: how tall must someone be to be in the tallest ten percent? In this video, you will find values like this, and unknown means and standard deviations.' },
      ],
    },
    {
      chapter: 'From a probability to a value',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('n', [normalCurve('c', { areas: [{ id: 'left', from: -3.2, to: 1.2816, label: '0.9' }, { id: 'top', from: 1.2816, to: 3.2, tone: 'theta' }], ticks: [{ z: 0, tex: '170' }, { z: 1.2816, tex: 'a', tone: 'theta' }] })], 380),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse normal', md: 'For $X \\sim \\mathrm{N}(\\mu, \\sigma^2)$, find $a$ with $P(X < a) = p$: $a = \\mu + z\\sigma$, where $P(Z < z) = p$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(X > a) = 0.1', 'P(X < a) = 0.9', 'z \\approx 1.2816', 'a = 170 + 1.2816 \\times 8', '\\approx 180\\text{ cm}'] },
      ],
      lines: [
        { say: 'For a normal distribution with mean mu and standard deviation sigma, the inverse normal finds the value "a" that has a given probability to its left.', show: 'def' },
        { say: 'Through the standard normal, Z, find the z with that probability to its left. Then "a" is mu plus z sigma.' },
        { say: 'Heights are modelled by a normal distribution with mean one hundred seventy centimetres and standard deviation eight. Find the height that only ten percent are taller than.', show: ['n.c-axes', 'n.c-t0', 'n.c-top', 'n.c-t1'] },
        { say: 'Calculators and tables work with the area to the left. Ten percent above "a" means ninety percent below it, so enter zero point nine, not zero point one.', show: ['n.c-left', 'm.0', 'm.1'], focus: ['n.c-left', 'm.1'] },
        { say: 'The z with zero point nine to its left is about one point two eight one six. So "a" is one hundred seventy plus one point two eight one six times eight, about one hundred eighty centimetres.', show: ['m.2', 'm.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Finding μ or σ',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$X \\sim \\mathrm{N}(50, \\sigma^2)$ and $P(X < 56) = 0.8$. Find $\\sigma$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(Z < z) = 0.8 \\;\\Rightarrow\\; z \\approx 0.8416', '\\dfrac{56 - 50}{\\sigma} = 0.8416', '\\sigma = \\dfrac{6}{0.8416} \\approx 7.13'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the sign of z', md: 'If $P(X < a) < 0.5$, then $a$ is below the mean and $z$ is negative.' },
      ],
      lines: [
        { say: 'If the mean or the standard deviation is unknown, a known probability gives an equation. X has mean fifty and an unknown standard deviation, and the probability that X is less than fifty six is zero point eight. Find sigma.', show: 'q' },
        { say: 'First turn the probability into z: zero point eight to the left gives z of about zero point eight four one six.', show: 'm.0', focus: 'm.0' },
        { say: 'z is x minus mu, over sigma. So fifty six minus fifty, over sigma, equals zero point eight four one six.', show: 'm.1', focus: 'm.1' },
        { say: 'So sigma is six over zero point eight four one six, about seven point one three. With both mu and sigma unknown, two probabilities give two simultaneous equations.', show: 'm.2', focus: 'm.2' },
        { say: 'Watch the sign of z. A value below the mean has a negative z.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$X \\sim \\mathrm{N}(60, 5^2)$. Find $a$ such that $P(X < a) = 0.95$.',
          choices: ['$51.8$', '$64.9$', '$60.95$', '$68.2$'],
          answer: 3,
          working: '$P(Z < z) = 0.95$ gives $z \\approx 1.6449$, so $a = 60 + 1.6449 \\times 5 \\approx 68.2$.',
        },
      ],
      lines: [
        { say: 'Your turn. X is normal with mean sixty and standard deviation five. Find "a" such that the probability X is less than "a" is zero point nine five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Zero point nine five to the left gives z of about one point six four four nine. So "a" is sixty plus one point six four four nine times five, about sixty eight point two. Choice A uses a negative z.', show: 'q.answer' },
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
          items: ['For $P(X < a) = p$: find $z$, then $a = \\mu + z\\sigma$.', 'For $P(X > a) = p$, use $P(X < a) = 1 - p$.', 'Unknown $\\mu$ or $\\sigma$: use $\\dfrac{x - \\mu}{\\sigma} = z$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find "a" with a probability p to its left, find z, then "a" is mu plus z sigma.', show: 'sum.0' },
        { say: 'For a probability to the right, use one minus p to the left.', show: 'sum.1' },
        { say: 'And an unknown mean or standard deviation comes from x minus mu, over sigma, equals z. In the next lesson, we use a normal distribution to approximate a binomial one. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
