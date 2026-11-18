import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.1, part 1: describing an oscillation. Every mass here is on a spring that obeys Hooke's
// law in the motion itself (src/video/motion.ts), with its spring constant chosen so that the
// period is the lesson's: T = 2π√(m ÷ k). The displacement graph is traced by the moving mass.

/** k for a mass of `m` kilograms that is to oscillate with a period of `T` seconds. */
const stiffness = (m: number, T: number) => m * ((2 * Math.PI) / T) ** 2;

/** A block on a bench, pulled 8 cm to the right of where it rests and let go: one oscillation every 2 s. */
const bob: MotionEl = {
  kind: 'motion',
  id: 'bob',
  span: [0, 0.5],
  bodies: [{ id: 'block', shape: 'block', mass: 1, label: '', x: 0.3, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: stiffness(1, 2), rest: 0.22, hidden: true },
  equilibrium: 0.22,
  cm: true,
  height: 400,
  poster: 'go',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true }] },
    go: { phases: [{ dur: 6 }] },
    again: { phases: [{ dur: 4 }] },
  },
};

/** The lesson's mass that makes 20 oscillations in 8 s: it starts at the top, 4 cm above where it rests. */
const timer: MotionEl = {
  kind: 'motion',
  id: 'timer',
  vertical: true,
  span: [0, 0.2],
  bodies: [{ id: 'mass', shape: 'block', mass: 0.5, label: '', x: 0.06, width: 0.04, tone: 'adj' }],
  spring: { on: 'mass', k: stiffness(0.5, 0.4), rest: 0.1, hidden: true },
  equilibrium: 0.1,
  cm: true,
  height: 540,
  clips: {
    one: { phases: [{ dur: 0.4, slow: 5 }] },
    twenty: { reset: true, phases: [{ dur: 8 }] },
  },
};

/** The lesson's graph: an amplitude of 4 cm and a period of 2 s, starting upwards from the middle. */
const trace: MotionEl = {
  kind: 'motion',
  id: 'trace',
  vertical: true,
  span: [0.03, 0.17],
  bodies: [{ id: 'mass', shape: 'block', mass: 1, label: '', x: 0.1, width: 0.04, tone: 'adj' }],
  spring: { on: 'mass', k: stiffness(1, 2), rest: 0.1, hidden: true },
  equilibrium: 0.1,
  cm: true,
  graph: { of: ['mass'], seconds: 5, min: -5, max: 5, y: 'displacement' },
  height: 470,
  poster: 'go',
  clips: {
    // Upwards is a negative velocity over a drop: 4 cm of amplitude needs A × 2π ÷ T to start with.
    go: { phases: [{ dur: 5, set: { mass: -0.04 * Math.PI } }] },
  },
};

/** The lesson's distance example: an amplitude of 5 cm and a frequency of 2 Hz, for 6 s. */
const four: MotionEl = {
  kind: 'motion',
  id: 'four',
  span: [0, 0.5],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.27, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: stiffness(0.5, 0.5), rest: 0.22, hidden: true },
  equilibrium: 0.22,
  cm: true,
  height: 380,
  clips: {
    one: { phases: [{ dur: 0.5, slow: 8, note: 'Slow motion' }] },
    six: { reset: true, phases: [{ dur: 6 }] },
  },
};

const video: Explainer = {
  id: 'p20-4-1',
  lessonId: 'p20-4-1',
  title: 'Simple Harmonic Motion',
  thumbnail: 'trace',
  summary:
    'A mass on a spring moves back and forth through a middle position, over and over. Watch an oscillation, name its equilibrium position, displacement and amplitude, time its period and frequency, and see the moving mass trace its own displacement-time graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Simple Harmonic Motion', subtitle: 'Describing an oscillation' }],
      lines: [
        { say: 'A child on a swing, a guitar string, and a mass on a spring all do the same thing. They move back and forth through a middle position, over and over.', show: 'title' },
        { say: 'This lesson gives you the words and the measurements for a motion like that.' },
      ],
    },
    {
      chapter: 'An oscillation',
      layout: 'center',
      main: [bob],
      lines: [
        { say: 'Here is a block on a spring. Pull it eight centimetres to the right of where it rests, and hold it there.', show: 'bob', play: 'bob.ready' },
        { say: 'Now let go. The block moves back through the middle, out to the other side, and back again, over and over. A motion like this is called an oscillation.', play: 'bob.go', playDelay: 1 },
        { say: 'The place where the block rests when it is not oscillating is the equilibrium position. The net force on it there is zero.', show: 'bob.amplitude' },
        { say: 'The displacement, x, is how far the block is from equilibrium at some instant. Watch it change: positive on the right, negative on the left.', show: 'bob.displacement', play: 'bob.again', playDelay: 4 },
        { say: 'The amplitude, capital A, is the greatest displacement: the distance from equilibrium out to one extreme. Here it is eight centimetres.' },
        { say: 'Measure it from the middle, not from one extreme to the other. This block moves between eight centimetres on the right and eight on the left, and its amplitude is eight centimetres, not sixteen.' },
      ],
    },
    {
      chapter: 'Period and frequency',
      layout: 'split',
      leftWidth: 560,
      left: [timer],
      right: [{ kind: 'math', id: 'p', size: 'md', lines: ['T = \\dfrac{8}{20} = \\thc{0.4\\ \\text{s}}', 'f = \\dfrac{20}{8} = \\good{2.5\\ \\text{Hz}}', '\\brand{f = \\dfrac{1}{T} \\qquad T = \\dfrac{1}{f}}'] }],
      lines: [
        { say: 'This mass hangs on a spring, and it starts at the top. One complete oscillation takes it down to the bottom, and back up to the top. Here is one, slowed down.', show: ['timer', 'timer.amplitude'], play: 'timer.one', playDelay: 9 },
        { say: 'The time for one complete oscillation is the period, capital T, in seconds. To measure it well, time many oscillations. Count twenty of them.', show: ['timer.count', 'timer.clock'], play: 'timer.twenty', playDelay: 8 },
        { say: 'Twenty oscillations took eight seconds. So the period is eight over twenty: 0.4 seconds for each one.', show: 'p.0' },
        { say: 'The frequency, f, is the number of complete oscillations each second, in hertz. Twenty over eight is 2.5 hertz.', show: 'p.1' },
        { say: 'Each one is one over the other. The frequency is one over the period, and the period is one over the frequency.', show: 'p.2' },
      ],
    },
    {
      chapter: 'The displacement-time graph',
      layout: 'center',
      main: [trace, { kind: 'math', id: 'g', size: 'md', lines: ['A = \\brand{4\\ \\text{cm}} \\qquad T = 2.5 - 0.5 = \\thc{2\\ \\text{s}}'] }],
      lines: [
        { say: 'A graph of displacement against time shows the whole motion at a glance. Let this mass draw its own. It starts at equilibrium, moving up.', show: ['trace', 'trace.graph'], play: 'trace.go', playDelay: 7 },
        { say: 'The graph is a smooth wave shape. It rises as the mass rises, and it falls as the mass falls.' },
        { say: 'Read the amplitude from the height of the graph. It reaches four centimetres above zero, and four below. So the amplitude is four centimetres.', show: 'trace.amplitude' },
        { say: 'Read the period from one peak to the next. The first peak is at 0.5 seconds, and the next is at 2.5 seconds. One complete cycle takes two seconds.', show: 'g.0' },
      ],
    },
    {
      chapter: 'Four amplitudes',
      layout: 'center',
      main: [four, { kind: 'math', id: 'd', size: 'md', lines: ['4 \\times 5 = 20\\ \\text{cm each} \\qquad 2 \\times 6 = 12\\ \\text{oscillations} \\qquad 12 \\times 20 = \\good{240\\ \\text{cm}}'] }],
      lines: [
        { say: 'How far does an oscillating mass travel? Follow one oscillation of this block. Its amplitude is five centimetres.', show: ['four', 'four.amplitude'] },
        { say: 'From one extreme, in to the middle. Out to the other extreme. Back to the middle. And out to where it started. That is four amplitudes of distance.', play: 'four.one' },
        { say: 'So each oscillation covers four times five: twenty centimetres. This block has a frequency of two hertz. How far does it travel in six seconds?', show: ['four.count', 'four.clock'], play: 'four.six', playDelay: 8 },
        { say: 'Two oscillations each second, for six seconds, is twelve oscillations. And twelve times twenty is 240 centimetres.', show: 'd.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mass on a spring oscillates with an amplitude of 2 cm and a frequency of 5 Hz. How far does it travel in 4 s?',
          choices: ['$160\\ \\text{cm}$', '$40\\ \\text{cm}$', '$80\\ \\text{cm}$', '$20\\ \\text{cm}$'],
          answer: 0,
          working: 'Oscillations: $5 \\times 4 = 20$. Each one covers four amplitudes: $4 \\times 2 = 8\\ \\text{cm}$. Distance: $20 \\times 8 = 160\\ \\text{cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A mass on a spring oscillates with an amplitude of two centimetres and a frequency of five hertz. How far does it travel in four seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Five oscillations each second, for four seconds, is twenty oscillations. Each one covers four amplitudes, which is eight centimetres. Twenty times eight is 160 centimetres. That is choice A.', show: 'q.answer' },
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
            'An **oscillation** is a motion back and forth through an equilibrium position',
            'The **amplitude** is the greatest displacement, measured from equilibrium',
            'Period and frequency: $f = \\dfrac{1}{T}$',
            'One complete oscillation covers **four amplitudes**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An oscillation is a motion back and forth through an equilibrium position.', show: 'sum.0' },
        { say: 'The amplitude is the greatest displacement, measured from equilibrium to one extreme.', show: 'sum.1' },
        { say: 'The period is the time for one oscillation, and the frequency is one over the period.', show: 'sum.2' },
        { say: 'And one complete oscillation covers four amplitudes of distance.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
