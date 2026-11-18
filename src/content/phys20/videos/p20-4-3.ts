import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.3, part 1: the period of a pendulum. Every bob is moved by gravity along its arc in the
// motion itself (src/video/motion.ts and src/video/path.ts), so the swings counted on screen come
// out of the lengths and the values of g given here, and are not typed in: T = 2π√(L ÷ g).

const G = 9.81;
const MOON = 1.62;
const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * The period of a pendulum let go from `deg` degrees: 2π√(L ÷ g), and a little more for a swing
 * that is not very small (a tenth of a percent at 8°), so that a clip ends on a whole swing.
 */
const period = (L: number, g: number, deg: number) => 2 * Math.PI * Math.sqrt(L / g) * (1 + rad(deg) ** 2 / 16 + (11 * rad(deg) ** 4) / 3072);

/** A pendulum of length `L` metres, let go from `deg` degrees to the right, in a picture with room for one of 1 m. */
const pendulum = (id: string, L: number, deg: number, clips: MotionEl['clips'], more: Partial<MotionEl> & { mass?: number; width?: number; name?: string; g?: number; drawn?: number } = {}): MotionEl => {
  const { mass = 0.5, width = 0.1, name = '', g = G, drawn = 14, ...rest } = more;
  return {
    kind: 'motion',
    id,
    span: [-1, 1],
    path: { g, swing: { length: L, angle: drawn, room: 1 } },
    bodies: [{ id: 'bob', shape: 'ball', mass, label: name, x: L * rad(deg), width, tone: 'adj' }],
    height: 560,
    clips,
    ...rest,
  };
};

/** A bob of 1 kg on a string of 1 m, held 30° out: its weight is 9.8 N, and 4.9 N of it is along the swing. */
const pull = pendulum(
  'pull',
  1,
  30,
  { ready: { phases: [{ dur: 1, freeze: true }] }, go: { phases: [{ dur: 2 * period(1, G, 30), slow: 2, note: 'Slow motion' }] } },
  { mass: 1, drawn: 38, forceScale: 12, height: 470, poster: 'go' },
);

/** Two swings of a pendulum of 1 m from 10°: 4.0 s. A pendulum a quarter as long makes four in that time. */
const RACE = { go: { phases: [{ dur: 2 * period(1, G, 10) }] } };
const short = pendulum('short', 0.25, 10, RACE);
const long = pendulum('long', 1, 10, RACE);

/** The same length with a light bob and with one ten times as heavy. */
const wood = pendulum('wood', 1, 10, RACE, { mass: 0.1, width: 0.125, name: '0.1 kg' });
const steel = pendulum('steel', 1, 10, RACE, { mass: 1, width: 0.176, name: '1 kg' });

/** The same pendulum let go from 5° and from 10°. */
const narrow = pendulum('narrow', 1, 5, RACE, { lanes: [{ label: 'From 5°' }] });
const wide = pendulum('wide', 1, 10, RACE, { lanes: [{ label: 'From 10°' }] });

/** The lesson's pendulum of 1 m: ten swings take ten periods of 2.01 s. */
const metre = pendulum('metre', 1, 8, { ten: { phases: [{ dur: 10 * period(1, G, 8), slow: 0.5, note: 'Twice as fast' }] } });

/** The same pendulum on the Moon: two swings take two periods of 4.94 s. */
const moon = pendulum('moon', 1, 8, { two: { phases: [{ dur: 2 * period(1, MOON, 8) }] } }, { g: MOON, lanes: [{ label: 'On the Moon' }] });

const video: Explainer = {
  id: 'p20-4-3',
  lessonId: 'p20-4-3',
  title: 'The Pendulum',
  thumbnail: 'pull',
  summary:
    'What sets how quickly a pendulum swings? See the part of the weight that pulls the bob back, race a short pendulum against a long one, a light bob against a heavy one and a narrow swing against a wide one, and use T = 2π√(L ÷ g) to find the period on Earth and on the Moon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'The Pendulum', subtitle: 'What sets the period' }],
      lines: [
        { say: 'For nearly three hundred years, the most accurate clocks in the world were kept in time by a weight swinging on a rod.', show: 'title' },
        { say: 'A pendulum keeps time so well because its period depends on almost nothing. This lesson finds the two things that do matter.' },
      ],
    },
    {
      chapter: 'What pulls the bob back',
      layout: 'center',
      main: [pull],
      lines: [
        { say: 'A simple pendulum is a small, heavy bob on a light string. Pull the bob to one side, and hold it there.', show: ['pull', 'pull.length'], play: 'pull.ready' },
        { say: 'The weight of the bob points straight down. But the bob can only move along its arc, so what matters is the part of the weight along the arc. That part points back towards the lowest point.', show: 'pull.restoring' },
        { say: 'Let go, and watch that force. It is largest at the ends of the swing, and zero at the lowest point. And it always points back towards the middle. It is a restoring force.', play: 'pull.go', playDelay: 1 },
        { say: 'For small swings, this force is proportional to the displacement. So a pendulum is in simple harmonic motion, just as a mass on a spring is.' },
      ],
    },
    {
      chapter: 'The length',
      layout: 'split',
      leftWidth: 544,
      left: [short],
      right: [long],
      lines: [
        { say: 'What sets the period of a pendulum? Try the length first. The pendulum on the left is a quarter of a metre long. The one on the right is one metre long: four times as long.', show: ['short', 'long', 'short.length', 'long.length'] },
        { say: 'Let them go together, and count the swings for four seconds.', show: ['short.count', 'long.count', 'short.clock', 'long.clock'], play: ['short.go', 'long.go'], playDelay: 2 },
        { say: 'The short pendulum made four swings, and the long one made two. A longer pendulum swings more slowly: four times the length gives twice the period.' },
      ],
    },
    {
      chapter: 'The mass of the bob',
      layout: 'split',
      leftWidth: 544,
      left: [wood],
      right: [steel],
      lines: [
        { say: 'Now try the mass of the bob. These two pendulums are the same length. One bob is 0.1 kilograms, and the other is ten times as heavy.', show: ['wood', 'steel', 'wood.length', 'steel.length'] },
        { say: 'Let them go together.', show: ['wood.count', 'steel.count', 'wood.clock', 'steel.clock'], play: ['wood.go', 'steel.go'], playDelay: 1 },
        { say: 'They stay in step. A heavier bob has more weight to pull it back, but it also has more inertia, and the two cancel. The mass of the bob does not change the period.' },
      ],
    },
    {
      chapter: 'The width of the swing',
      layout: 'split',
      leftWidth: 544,
      left: [narrow],
      right: [wide],
      lines: [
        { say: 'And the width of the swing? Here are two equal pendulums. One is let go from five degrees, and the other from ten.', show: ['narrow', 'wide'] },
        { say: 'Watch them together.', show: ['narrow.count', 'wide.count', 'narrow.clock', 'wide.clock'], play: ['narrow.go', 'wide.go'], playDelay: 1 },
        { say: 'They stay in step too. As long as the swing is small, less than about fifteen degrees, the amplitude does not change the period.' },
      ],
    },
    {
      chapter: 'The period',
      layout: 'split',
      leftWidth: 544,
      left: [metre],
      right: [{ kind: 'math', id: 't', size: 'md', lines: ['\\brand{T = 2\\pi\\sqrt{\\dfrac{L}{g}}}', 'T = 2\\pi\\sqrt{\\dfrac{1}{9.81}}', 'T = 2\\pi \\times 0.3193', 'T = \\thc{2.01\\ \\text{s}}'] }],
      lines: [
        { say: 'So the period depends on the length, and on one more thing: the strength of gravity, which pulls the bob back. The period is two pi, times the square root of the length over g.', show: ['metre', 'metre.length', 't.0'] },
        { say: 'Try it for a pendulum one metre long, with g equal to 9.81 metres per second squared. One over 9.81 is 0.1019, and its square root is 0.3193.', show: ['t.1', 't.2'] },
        { say: 'Two pi times 0.3193 is 2.01 seconds.', show: 't.3' },
        { say: 'Check that against the pendulum itself. Ten swings should take ten times as long: 20.1 seconds.', show: ['metre.count', 'metre.clock'], play: 'metre.ten', playDelay: 4 },
        { say: 'The length must be in metres, measured from the pivot to the centre of the bob.' },
      ],
    },
    {
      chapter: 'On the Moon',
      layout: 'split',
      leftWidth: 544,
      left: [moon],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['T = 2\\pi\\sqrt{\\dfrac{1}{1.62}}', 'T = 2\\pi \\times 0.7857', 'T = \\thc{4.94\\ \\text{s}}'] }],
      lines: [
        { say: 'Now take the same pendulum to the Moon, where g is only 1.62 metres per second squared.', show: ['moon', 'moon.length'] },
        { say: 'The square root of one over 1.62 is 0.7857. Two pi times that is 4.94 seconds, compared with 2.01 seconds on Earth.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'Watch two swings. Weaker gravity pulls the bob back more gently, so each swing takes longer. A pendulum clock would run slow on the Moon.', show: ['moon.count', 'moon.clock'], play: 'moon.two', playDelay: 1 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A simple pendulum is 0.5 m long. Use $g = 9.81\\ \\text{m/s}^2$. What is its period?',
          choices: ['$1.42\\ \\text{s}$', '$0.23\\ \\text{s}$', '$27.8\\ \\text{s}$', '$0.32\\ \\text{s}$'],
          answer: 0,
          working: '$T = 2\\pi\\sqrt{\\dfrac{L}{g}} = 2\\pi\\sqrt{\\dfrac{0.5}{9.81}} = 2\\pi\\sqrt{0.05097} = 2\\pi \\times 0.2258 = 1.42\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A simple pendulum is 0.5 metres long. Use g equal to 9.81 metres per second squared. What is its period? Pause the video and try it.', show: 'q', wait: 6 },
        { say: '0.5 over 9.81 is 0.05097, and its square root is 0.2258. Two pi times 0.2258 is 1.42 seconds. That is choice A. If you got 27.8 seconds, the fraction is upside down: the length goes on top.', show: 'q.answer' },
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
            'Period of a simple pendulum, for small swings: $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$',
            'The **mass** of the bob and the **amplitude** do not change the period',
            '**Four times** the length gives twice the period',
            'Weaker gravity gives a **longer** period',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period of a simple pendulum, for small swings, is two pi, times the square root of the length over g.', show: 'sum.0' },
        { say: 'The mass of the bob and the amplitude do not change the period.', show: 'sum.1' },
        { say: 'Four times the length gives twice the period.', show: 'sum.2' },
        { say: 'And weaker gravity gives a longer period.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
