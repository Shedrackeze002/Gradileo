import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.3, part 2: measuring g with a pendulum. Every bob is moved by gravity along its arc in
// the motion itself (src/video/motion.ts and src/video/path.ts), so the times on the clocks come
// out of the lengths and the values of g given here: a pendulum of 0.559 m has a period of 1.5 s,
// one of 0.8 m swings in 2.94 s where g is 3.65 m/s², and one of 0.9 m makes 20 swings in 38.1 s.

const G = 9.81;
const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * The period of a pendulum let go from `deg` degrees: 2π√(L ÷ g), and a little more for a swing
 * that is not very small (a tenth of a percent at 8°), so that a clip ends on a whole swing.
 */
const period = (L: number, g: number, deg: number) => 2 * Math.PI * Math.sqrt(L / g) * (1 + rad(deg) ** 2 / 16 + (11 * rad(deg) ** 4) / 3072);

/** A pendulum of length `L` metres, let go from `deg` degrees to the right, in a picture with room for one of 1 m. */
const pendulum = (id: string, L: number, deg: number, clips: MotionEl['clips'], more: Partial<MotionEl> & { g?: number; drawn?: number } = {}): MotionEl => {
  const { g = G, drawn = 14, ...rest } = more;
  return {
    kind: 'motion',
    id,
    span: [-1, 1],
    path: { g, swing: { length: L, angle: drawn, room: 1 } },
    bodies: [{ id: 'bob', shape: 'ball', mass: 0.5, label: '', x: L * rad(deg), width: 0.1, tone: 'adj' }],
    height: 560,
    clips,
    ...rest,
  };
};

/** One complete swing, half at a time: across, and back. */
const HALF = period(1, G, 15) / 2;
const whole = pendulum('whole', 1, 15, { across: { phases: [{ dur: HALF, slow: 3, note: 'Slow motion' }] }, back: { phases: [{ dur: HALF, slow: 3, note: 'Slow motion' }] } }, { drawn: 20, height: 500, poster: 'across' });

/** The lesson's length for a period of 1.5 s: 9.81 × 1.5² ÷ 4π² = 0.559 m. Four swings take 6.0 s. */
const CHOSEN = (G * 1.5 ** 2) / (4 * Math.PI ** 2);
const chosen = pendulum('chosen', CHOSEN, 8, { four: { phases: [{ dur: 4 * period(CHOSEN, G, 8) }] } });

/** The lesson's planet: a pendulum of 0.8 m with a period of 2.94 s, so g = 4π² × 0.8 ÷ 2.94². Five swings take 14.7 s. */
const PLANET = (4 * Math.PI ** 2 * 0.8) / 2.94 ** 2;
const planet = pendulum('planet', 0.8, 8, { five: { phases: [{ dur: 5 * period(0.8, PLANET, 8), slow: 0.5, note: 'Twice as fast' }] } }, { g: PLANET });

/** The lesson's experiment: a pendulum of 0.90 m makes 20 swings in 38.1 s. */
const lab = pendulum('lab', 0.9, 8, { twenty: { phases: [{ dur: 20 * period(0.9, G, 8), slow: 0.25, note: 'Four times as fast' }] } });

const video: Explainer = {
  id: 'p20-4-3-b',
  lessonId: 'p20-4-3',
  title: 'The Pendulum, Part 2: Measuring g',
  thumbnailTitle: 'Measuring g with a Pendulum',
  thumbnail: 'whole',
  summary:
    'A pendulum is a simple instrument for measuring gravity. See what counts as one complete swing, find the length for a chosen period, and use g = 4π²L ÷ T² to measure the acceleration due to gravity on another planet and in a school experiment that times twenty swings.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Measuring g with a Pendulum', subtitle: 'A string, a bob and a stopwatch' }],
      lines: [
        { say: 'The period of a pendulum depends on only two things: its length, and the strength of gravity.', show: 'title' },
        { say: 'So if you measure the length and the period, a pendulum tells you the acceleration due to gravity, wherever you are.' },
      ],
    },
    {
      chapter: 'A complete swing',
      layout: 'center',
      main: [whole],
      lines: [
        { say: 'Start with what counts as one swing. This bob is let go on the right. It crosses to the left, and stops for an instant.', show: ['whole', 'whole.length', 'whole.count', 'whole.clock', 'whole.velocity'], play: 'whole.across', playDelay: 4 },
        { say: 'That is only half a swing. A complete swing brings the bob back to where it started.', play: 'whole.back', playDelay: 2.5 },
        { say: 'The period is the time for a complete swing: there, and back. Counting each pass through the middle as a swing gives half the true period, and a value of g that is four times too large.' },
      ],
    },
    {
      chapter: 'The length for a chosen period',
      layout: 'split',
      leftWidth: 544,
      left: [chosen],
      right: [{ kind: 'math', id: 'l', size: 'md', lines: ['T^2 = \\dfrac{4\\pi^2 L}{g}', '\\brand{L = \\dfrac{gT^2}{4\\pi^2}}', 'L = \\dfrac{9.81 \\times 1.5^2}{4\\pi^2} = \\dfrac{22.07}{39.48}', 'L = \\thc{0.56\\ \\text{m}}'] }],
      lines: [
        { say: 'First, turn the formula round. Square both sides: T squared is four pi squared L, over g. So the length is g T squared, over four pi squared.', show: ['chosen', 'l.0', 'l.1'] },
        { say: 'How long must a pendulum be, for a period of 1.5 seconds? 9.81 times 1.5 squared is 22.07, and four pi squared is 39.48.', show: 'l.2' },
        { say: 'The length is 0.56 metres. This pendulum is that long.', show: ['l.3', 'chosen.length'] },
        { say: 'Four swings should take four times 1.5: six seconds.', show: ['chosen.count', 'chosen.clock'], play: 'chosen.four', playDelay: 2 },
        { say: 'And they do.' },
      ],
    },
    {
      chapter: 'Gravity on another world',
      layout: 'split',
      leftWidth: 544,
      left: [planet],
      right: [{ kind: 'math', id: 'g', size: 'md', lines: ['T = \\dfrac{14.7}{5} = \\thc{2.94\\ \\text{s}}', '\\brand{g = \\dfrac{4\\pi^2 L}{T^2}}', 'g = \\dfrac{4\\pi^2 \\times 0.8}{2.94^2} = \\dfrac{31.58}{8.644}', 'g = \\good{3.65\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Now use a pendulum as an instrument. On the surface of another planet, a pendulum 0.8 metres long is set swinging. Time five swings.', show: ['planet', 'planet.length', 'planet.count', 'planet.clock'], play: 'planet.five', playDelay: 8 },
        { say: 'Five swings took 14.7 seconds, so the period is 2.94 seconds.', show: 'g.0' },
        { say: 'Turn the formula round again, this time for g. It is four pi squared L, over T squared.', show: 'g.1' },
        { say: 'Four pi squared times 0.8 is 31.58. And 2.94 squared is 8.644.', show: 'g.2' },
        { say: 'So the acceleration due to gravity on that planet is 3.65 metres per second squared. That is a little more than a third of its value on Earth.', show: 'g.3' },
      ],
    },
    {
      chapter: 'An experiment',
      layout: 'split',
      leftWidth: 544,
      left: [lab],
      right: [{ kind: 'math', id: 'x', size: 'md', lines: ['T = \\dfrac{38.1}{20} = \\thc{1.905\\ \\text{s}}', 'g = \\dfrac{4\\pi^2 \\times 0.90}{1.905^2} = \\dfrac{35.53}{3.629}', 'g = \\good{9.79\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Here is the experiment as you would do it in school. A pendulum 90 centimetres long is timed for twenty complete swings.', show: ['lab', 'lab.length', 'lab.count', 'lab.clock'], play: 'lab.twenty', playDelay: 6 },
        { say: 'Why twenty? One swing lasts about two seconds, and your reaction time with a stopwatch is a few tenths of a second. Over twenty swings, the same error is spread twenty times more thinly.' },
        { say: 'Twenty swings took 38.1 seconds, so the period is 1.905 seconds. The length goes in as 0.90 metres, not 90.', show: 'x.0' },
        { say: 'Four pi squared times 0.90 is 35.53. And 1.905 squared is 3.629. Do not forget to square the period.', show: 'x.1' },
        { say: 'The experiment gives 9.79 metres per second squared. Any answer on Earth should be close to ten. If yours is far away, look for a missing square, or a length left in centimetres.', show: 'x.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a planet, a simple pendulum 0.5 m long makes 10 complete swings in 22.2 s. What is the acceleration due to gravity there?',
          choices: ['$8.9\\ \\text{m/s}^2$', '$4.0\\ \\text{m/s}^2$', '$0.040\\ \\text{m/s}^2$', '$400\\ \\text{m/s}^2$'],
          answer: 1,
          working: 'Period: $T = \\dfrac{22.2}{10} = 2.22\\ \\text{s}$. Then $g = \\dfrac{4\\pi^2 L}{T^2} = \\dfrac{4\\pi^2 \\times 0.5}{2.22^2} = \\dfrac{19.74}{4.928} = 4.0\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a planet, a simple pendulum 0.5 metres long makes ten complete swings in 22.2 seconds. What is the acceleration due to gravity there? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The period is 22.2 over ten, which is 2.22 seconds. Four pi squared times 0.5 is 19.74, and 2.22 squared is 4.928. Dividing gives 4.0 metres per second squared. That is choice B. Choice A forgets to square the period.', show: 'q.answer' },
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
            'A **complete swing** is there and back',
            'Length for a chosen period: $L = \\dfrac{gT^2}{4\\pi^2}$',
            'Gravity from a pendulum: $g = \\dfrac{4\\pi^2 L}{T^2}$',
            'Time **many** complete swings and divide; square the period',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A complete swing is there and back.', show: 'sum.0' },
        { say: 'The length for a chosen period is g T squared, over four pi squared.', show: 'sum.1' },
        { say: 'The acceleration due to gravity is four pi squared L, over T squared.', show: 'sum.2' },
        { say: 'And in an experiment, time many complete swings and divide, and remember to square the period.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
