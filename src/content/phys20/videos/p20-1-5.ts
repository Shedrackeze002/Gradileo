import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 1.5: free fall. Every drop and throw is worked out from the weight drawn, with
// g = 9.81 m/s² (src/video/motion.ts): a ball dropped for 3 s reaches 29.4 m/s after 44.1 m, and
// the lesson's ball, thrown up at 15 m/s, stops 11.5 m up after 1.53 s and is back after 3.06 s at
// 15 m/s downwards, on a velocity-time graph that is one straight line.

const G = 9.81;
const weight = (on: string, n: number, hidden = false): MotionForce => ({ on, name: 'Weight', n, tone: 'hyp', hidden });

/** 1 kg and 5 kg let go together: five times the weight, and the same acceleration. */
const together: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 12],
  height: 480,
  lanes: [{ label: '1 kg' }, { label: '5 kg' }],
  bodies: [
    { id: 'light', shape: 'ball', mass: 1, x: 0, width: 1.6, lane: 0, tone: 'adj' },
    { id: 'heavy', shape: 'ball', mass: 5, x: 0, width: 1.6, lane: 1, tone: 'opp' },
  ],
  forceScale: 1.6,
  velocityScale: 7,
  poster: 'drop',
  clips: {
    weigh: { phases: [{ dur: 1, freeze: true, forces: [weight('light', G), weight('heavy', 5 * G)] }] },
    drop: { phases: [{ dur: 1.5, slow: 2, forces: [weight('light', G), weight('heavy', 5 * G)], note: 'Slow motion' }] },
  },
};

/** Dropped from rest for 3 s: 29.4 m/s, after 44.1 m. */
const drop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 46],
  height: 500,
  strobe: 0.5,
  graph: { of: ['ball'], seconds: 3, max: 30 },
  bodies: [{ id: 'ball', shape: 'ball', mass: 1, x: 0, width: 3, tone: 'theta' }],
  velocityScale: 3,
  clips: { go: { phases: [{ dur: 3, slow: 1.6, forces: [weight('ball', G, true)], note: 'Slow motion' }] } },
};

/** The lesson's throw: straight up at 15 m/s. The top is 11.5 m up, after 1.53 s. */
const toss: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 13],
  height: 500,
  strobe: 0.25,
  graph: { of: ['ball'], seconds: 3.2, max: 16, min: -16 },
  bodies: [{ id: 'ball', shape: 'ball', mass: 1, x: 0, v: 15, width: 1.2, tone: 'theta' }],
  velocityScale: 5,
  poster: 'up',
  clips: {
    up: { phases: [{ dur: 15 / G, slow: 2, forces: [weight('ball', -G, true)], note: 'Slow motion' }] },
    // Stopped a moment before the ball is back at the hand, so that its velocity can still be read.
    down: { phases: [{ dur: 15 / G - 0.004, slow: 2, forces: [weight('ball', -G, true)], note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'p20-1-5',
  lessonId: 'p20-1-5',
  title: 'Free Fall',
  thumbnail: 'sim',
  summary:
    'With gravity as the only force, every object speeds up at the same rate, 9.81 m/s². Watch a light ball and a heavy ball fall together, follow a dropped ball second by second, and see why a ball thrown straight up is still accelerating at the instant it stops at the top.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Free Fall', subtitle: 'Motion with gravity as the only force' }],
      lines: [
        { say: 'Drop a hammer and a feather on Earth, and the hammer lands first. An astronaut tried the same thing on the Moon, where there is no air, and the two landed together.', show: 'title' },
        { say: 'Take away air resistance, and every falling object, heavy or light, speeds up at exactly the same rate.' },
      ],
    },
    {
      chapter: 'The acceleration due to gravity',
      layout: 'center',
      main: [together, { kind: 'math', id: 'g', size: 'md', lines: ['g = 9.81\\ \\text{m/s}^2 \\text{, downwards, for every object in free fall}'] }],
      lines: [
        { say: 'An object is in free fall when gravity is the only force acting on it. Here are two balls, of one kilogram and five kilograms. The pink arrows are their weights.', show: 'sim', play: 'sim.weigh', playDelay: 5 },
        { say: 'The heavy ball is pulled five times as hard. But it also has five times the mass to get moving. Watch them fall, in slow motion.', show: ['sim.velocity', 'sim.readout', 'sim.clock', 'sim.strobe'], play: 'sim.drop', playDelay: 5.2 },
        { say: 'They fall side by side, with the same velocity at every moment. Near the surface of the Earth, every object in free fall has the same acceleration: 9.81 metres per second squared, downwards.', show: 'g', focus: 'sim' },
      ],
    },
    {
      chapter: 'Dropped from rest',
      layout: 'center',
      main: [
        drop,
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\good{v = gt = 9.81 \\times 3 = 29.4\\ \\text{m/s}} \\qquad \\thc{d = \\tfrac{1}{2}gt^2 = \\tfrac{1}{2} \\times 9.81 \\times 3^2 = 44.1\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Free fall is motion with a constant acceleration, so the equations of motion all apply. For a drop, take down as positive. Then u is zero, and "a" is g. Watch a ball fall for three seconds, with a mark every half second.', show: ['sim', 'sim.velocity', 'sim.readout', 'sim.clock', 'sim.strobe', 'sim.graph'], play: 'sim.go', playDelay: 11 },
        { say: 'The marks spread out, because the ball covers more distance in each half second than in the one before. And the velocity graph is a straight line. The ball gains 9.81 metres per second, every second.', focus: 'sim' },
        { say: 'So after three seconds, its velocity is g t: 29.4 metres per second. And it has fallen half g t squared: 44.1 metres.', show: 'eq', focus: 'sim.ball' },
      ],
    },
    {
      chapter: 'Thrown straight up',
      layout: 'center',
      main: [
        toss,
        { kind: 'math', id: 'top', size: 'md', lines: ['\\good{0 = 15 - 9.81t \\;\\Rightarrow\\; t = 1.53\\ \\text{s}} \\qquad \\thc{0 = 15^2 - 2(9.81)d \\;\\Rightarrow\\; d = 11.5\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Now a ball is thrown straight up, at fifteen metres per second. For a throw, take up as positive. Then u is plus fifteen, and the acceleration is minus 9.81. Watch it rise.', show: ['sim', 'sim.velocity', 'sim.readout', 'sim.clock', 'sim.graph'], play: 'sim.up', playDelay: 10.4 },
        { say: 'The ball lost 9.81 metres per second, every second, until its velocity was zero. From v equals u plus "a" t, that took 1.53 seconds. From v squared equals u squared plus two "a" d, the ball rose 11.5 metres.', show: 'top', focus: 'sim.ball' },
        { say: 'At the top, the velocity is zero. Is the acceleration zero as well? Watch the graph as the ball comes down.', play: 'sim.down', playDelay: 5.6 },
        { say: 'The line never bent. It passed straight through zero with the same slope, minus 9.81. Gravity did not switch off at the top. And the motion is symmetrical: the ball took as long to come down as to go up, and it returned at fifteen metres per second, downwards.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stone is dropped from rest. Use $g = 9.81\\ \\text{m/s}^2$. How far has it fallen after 2 s?',
          choices: ['$19.6\\ \\text{m}$', '$9.81\\ \\text{m}$', '$39.2\\ \\text{m}$', '$4.9\\ \\text{m}$'],
          answer: 0,
          working: '$d = \\tfrac{1}{2}gt^2 = \\tfrac{1}{2} \\times 9.81 \\times 2^2 = 19.6\\ \\text{m}$. (19.6 m/s is also its speed: $v = gt = 9.81 \\times 2$.)',
        },
      ],
      lines: [
        { say: 'Your turn. A stone is dropped from rest. Use 9.81 metres per second squared for g. How far has it fallen after two seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The distance is half g t squared. Half of 9.81, times two squared, is 19.6 metres. That is choice A. By chance, 19.6 is also its speed in metres per second, because g t is 9.81 times two.', show: 'q.answer' },
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
            'Free fall: gravity is the **only force**, and $g = 9.81\\ \\text{m/s}^2$ downwards',
            'Heavy and light objects fall **with the same acceleration**',
            'Dropped from rest: $v = gt$ and $d = \\tfrac{1}{2}gt^2$',
            'Thrown up: at the top $v = 0$, but the acceleration is **still** $g$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In free fall, gravity is the only force, and the acceleration is 9.81 metres per second squared, downwards.', show: 'sum.0' },
        { say: 'Heavy and light objects fall with the same acceleration.', show: 'sum.1' },
        { say: 'For an object dropped from rest, v equals g t, and d equals half g t squared.', show: 'sum.2' },
        { say: 'And for an object thrown upwards, the velocity is zero at the top, but the acceleration is still g.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
