import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.2, part 1: the period of a mass on a spring. Every mass hangs on a spring that obeys
// Hooke's law in the motion itself (src/video/motion.ts), so the periods on screen come out of
// the masses and spring constants given here, and are not typed in: T = 2π√(m ÷ k).

const period = (m: number, k: number) => 2 * Math.PI * Math.sqrt(m / k);

/** A mass hung on a spring, let go from `A` metres above where it rests. */
const hung = (id: string, m: number, k: number, A: number, label: string, clips: MotionEl['clips'], height = 520): MotionEl => ({
  kind: 'motion',
  id,
  vertical: true,
  span: [0, 0.2],
  lanes: [{ label }],
  bodies: [{ id: 'mass', shape: 'block', mass: m, label: `${m} kg`, x: 0.1 - A, width: m > 1 ? 0.045 : 0.036, tone: 'adj' }],
  spring: { on: 'mass', k, rest: 0.1, hidden: true },
  equilibrium: 0.1,
  cm: true,
  height,
  clips,
});

const FOUR = { go: { phases: [{ dur: 4 }] } };

/** The same mass on a soft spring and on one four times as stiff: the stiff one is twice as quick. */
const soft = hung('soft', 0.5, 20, 0.04, 'k = 20 N/m', FOUR);
const stiff = hung('stiff', 0.5, 80, 0.04, 'k = 80 N/m', FOUR);
stiff.poster = 'go';

/** The same spring with a small mass and with one four times as large: the large one is half as quick. */
const light = hung('light', 0.5, 20, 0.04, 'k = 20 N/m', FOUR);
const heavy = hung('heavy', 2, 20, 0.04, 'k = 20 N/m', FOUR);

/** The lesson's example: 0.5 kg on 50 N/m. Ten oscillations take ten periods of 0.63 s. */
const fifty = hung('fifty', 0.5, 50, 0.04, 'k = 50 N/m', { ten: { phases: [{ dur: 10 * period(0.5, 50) }] } }, 450);

/** The same mass and spring let go from 2 cm and from 6 cm: they stay in step. */
const small = hung('small', 0.5, 20, 0.02, 'Amplitude 2 cm', FOUR);
const large = hung('large', 0.5, 20, 0.06, 'Amplitude 6 cm', FOUR);

/** The lesson's timing: 0.4 kg makes 20 oscillations in 16 s, so k = 4π² × 0.4 ÷ 0.8². */
const timed = hung('timed', 0.4, (4 * Math.PI ** 2 * 0.4) / 0.8 ** 2, 0.04, '', { twenty: { phases: [{ dur: 16, slow: 0.5, note: 'Twice as fast' }] } }, 540);

const video: Explainer = {
  id: 'p20-4-2',
  lessonId: 'p20-4-2',
  title: 'The Mass on a Spring',
  thumbnail: 'stiff',
  summary:
    'What sets how quickly a mass bobs on a spring? Race a soft spring against a stiff one and a small mass against a large one, see that the amplitude makes no difference, and use T = 2π√(m ÷ k) to find a period and to measure a spring constant from a timing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'The Mass on a Spring', subtitle: 'What sets the period' }],
      lines: [
        { say: 'Hang a mass on a spring, pull it down, and let go. It bobs up and down at a steady rate.', show: 'title' },
        { say: 'This lesson finds what sets that rate. Two things do, and one thing that you might expect does not.' },
      ],
    },
    {
      chapter: 'A stiffer spring',
      layout: 'split',
      leftWidth: 568,
      left: [soft],
      right: [stiff],
      lines: [
        { say: 'Here are two equal masses, each of 0.5 kilograms. The spring on the right is four times as stiff as the one on the left.', show: ['soft', 'stiff'] },
        { say: 'Let them go together, and count their oscillations for four seconds.', show: ['soft.count', 'stiff.count', 'soft.clock', 'stiff.clock'], play: ['soft.go', 'stiff.go'], playDelay: 2 },
        { say: 'The soft spring gave four oscillations, and the stiff one gave eight. A stiffer spring pulls back harder, so the oscillation is faster.' },
      ],
    },
    {
      chapter: 'A larger mass',
      layout: 'split',
      leftWidth: 568,
      left: [light],
      right: [heavy],
      lines: [
        { say: 'Now keep the spring the same, and change the mass. The mass on the right is four times as large: two kilograms.', show: ['light', 'heavy'] },
        { say: 'Let them go together again.', show: ['light.count', 'heavy.count', 'light.clock', 'heavy.clock'], play: ['light.go', 'heavy.go'], playDelay: 1 },
        { say: 'This time the small mass gave four oscillations, and the large one only two. A larger mass is harder to speed up and to slow down, so the oscillation is slower.' },
      ],
    },
    {
      chapter: 'The period',
      layout: 'center',
      main: [fifty, { kind: 'math', id: 't', size: 'md', lines: ['\\brand{T = 2\\pi\\sqrt{\\dfrac{m}{k}}} \\qquad T = 2\\pi\\sqrt{\\dfrac{0.5}{50}} = 2\\pi \\times 0.1 = \\thc{0.63\\ \\text{s}}'] }],
      lines: [
        { say: 'Both effects are in one formula. The period is two pi, times the square root of the mass over the spring constant. The mass is in kilograms, and the spring constant is in newtons per metre.', show: ['fifty', 't.0'] },
        { say: 'Try it for a mass of 0.5 kilograms, on a spring of fifty newtons per metre. 0.5 over fifty is 0.01. Its square root is 0.1. And two pi times 0.1 is 0.63 seconds.' },
        { say: 'Check that against the mass itself. Ten oscillations should take ten times as long: 6.3 seconds.', show: ['fifty.count', 'fifty.clock'], play: 'fifty.ten', playDelay: 4 },
        { say: 'Notice that four times the mass over the same spring doubles the period, because of the square root. That is what the two races showed.' },
      ],
    },
    {
      chapter: 'The amplitude does not matter',
      layout: 'split',
      leftWidth: 568,
      left: [small],
      right: [large],
      lines: [
        { say: 'The amplitude is not in the formula. Here are two equal masses on equal springs. One is let go from two centimetres, and the other from six.', show: ['small', 'large', 'small.amplitude', 'large.amplitude'] },
        { say: 'Watch them together.', show: ['small.count', 'large.count', 'small.clock', 'large.clock'], play: ['small.go', 'large.go'], playDelay: 1 },
        { say: 'They stay in step. A larger amplitude means farther to go, but the restoring force is larger too, and the two effects cancel exactly. This is a special property of simple harmonic motion.' },
      ],
    },
    {
      chapter: 'A spring constant from a timing',
      layout: 'split',
      leftWidth: 560,
      left: [timed],
      right: [{ kind: 'math', id: 'k', size: 'md', lines: ['T = \\dfrac{16}{20} = \\thc{0.8\\ \\text{s}}', 'T^2 = \\dfrac{4\\pi^2 m}{k}', 'k = \\dfrac{4\\pi^2 m}{T^2} = \\dfrac{4\\pi^2 \\times 0.4}{0.8^2}', 'k = \\brand{24.7\\ \\text{N/m}}'] }],
      lines: [
        { say: 'Timing an oscillation is an accurate way to measure a spring constant. This mass of 0.4 kilograms makes twenty oscillations. Time them.', show: ['timed', 'timed.count', 'timed.clock'], play: 'timed.twenty', playDelay: 7 },
        { say: 'Twenty oscillations took sixteen seconds, so the period is 0.8 seconds.', show: 'k.0' },
        { say: 'Square both sides of the formula: T squared is four pi squared m, over k. Then swap k and T squared.', show: ['k.1', 'k.2'] },
        { say: 'Four pi squared times 0.4 is 15.79. Divide by 0.8 squared, which is 0.64. The spring constant is 24.7 newtons per metre.', show: 'k.3' },
        { say: 'One warning. The formula needs the mass in kilograms. A mass of 250 grams goes in as 0.25, never as 250.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 100 g mass oscillates on a spring with a spring constant of 40 N/m. What is its period?',
          choices: ['$3.14\\ \\text{s}$', '$0.05\\ \\text{s}$', '$0.31\\ \\text{s}$', '$9.93\\ \\text{s}$'],
          answer: 2,
          working: 'Change the units: $m = 100\\ \\text{g} = 0.1\\ \\text{kg}$. Then $T = 2\\pi\\sqrt{\\dfrac{0.1}{40}} = 2\\pi\\sqrt{0.0025} = 2\\pi \\times 0.05 = 0.31\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A mass of 100 grams oscillates on a spring with a spring constant of forty newtons per metre. What is its period? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Change the units first: 100 grams is 0.1 kilograms. 0.1 over forty is 0.0025, and its square root is 0.05. Two pi times 0.05 is 0.31 seconds. That is choice C. Leaving the mass in grams gives 9.93 seconds, which is far too long.', show: 'q.answer' },
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
            'Period of a mass on a spring: $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$, with $m$ in kilograms',
            'A **stiffer spring** oscillates faster; a **larger mass** oscillates slower',
            'The **amplitude** does not change the period',
            'From a timing: $k = \\dfrac{4\\pi^2 m}{T^2}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period of a mass on a spring is two pi, times the square root of m over k, with the mass in kilograms.', show: 'sum.0' },
        { say: 'A stiffer spring oscillates faster, and a larger mass oscillates slower.', show: 'sum.1' },
        { say: 'The amplitude does not change the period.', show: 'sum.2' },
        { say: 'And a timing gives the spring constant: four pi squared m, over T squared.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
