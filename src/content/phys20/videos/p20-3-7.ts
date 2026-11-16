import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.7, part 1: power. The work on every bar is measured from the motion
// (src/video/motion.ts and src/video/path.ts) and the clock shows the time it took, so the powers
// are the lesson's: 6000 J in 20 s is 300 W; a 60 kg student who climbs 4 m in 5 s develops
// 470.9 W; a car held at 25 m/s against 800 N needs 20 kW; and 1500 W lifts 100 kg at 1.53 m/s.

const G = 9.81;

/** Two cranes lift a load that weighs 1000 N through 6 m: 6000 J each. Crane A takes 20 s, and crane B takes 5 s. */
const hold = (on: string): MotionForce[] => [
  { on, name: 'Lift', n: 1000, tone: 'opp' },
  { on, name: 'Weight', n: -1000, tone: 'hyp' },
];
const BOTH = [...hold('a'), ...hold('b')];
const cranes: MotionEl = {
  kind: 'motion',
  id: 'cranes',
  vertical: 'up',
  // The track runs a little past the 6 m the loads rise, to leave room for the arrows over them.
  span: [0, 7.4],
  lanes: [{ label: 'Crane A' }, { label: 'Crane B' }],
  bodies: [
    { id: 'a', shape: 'block', mass: 1000 / G, label: '', x: 0, lane: 0, width: 1.8, tone: 'adj' },
    { id: 'b', shape: 'block', mass: 1000 / G, label: '', x: 0, lane: 1, width: 1.8, tone: 'brand' },
  ],
  energy: { of: ['a', 'b'], max: 6800, bars: ['work'], g: G, labels: { a: 'Crane A', b: 'Crane B' } },
  forceScale: 0.055,
  velocityScale: 30,
  height: 400,
  poster: 'lift',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: BOTH }] },
    lift: {
      phases: [
        { dur: 5, slow: 0.25, set: { a: 0.3, b: 1.2 }, forces: BOTH, note: 'Four times as fast' },
        { dur: 15, slow: 0.25, set: { b: 0 }, forces: BOTH, note: 'Four times as fast' },
        { dur: 0.001, set: { a: 0 }, forces: BOTH },
      ],
    },
  },
};

/**
 * The lesson's student: 60 kg, up a staircase 4 m high (drawn as a slope 5.6 m along) in 5 s. The
 * force along the slope balances gravity's pull along it, so the climb does mgh = 2354.4 J.
 */
const STAIRS = Math.hypot(5.6, 4);
const CLIMB: MotionForce = { on: 'student', name: 'Climb', n: (60 * G * 4) / STAIRS, tone: 'opp' };
const stairs: MotionEl = {
  kind: 'motion',
  id: 'stairs',
  span: [0, STAIRS],
  path: { g: G, points: [[0, 0], [5.6, 4]] },
  bodies: [{ id: 'student', shape: 'ball', mass: 60, label: '60 kg', x: 0, width: 1.2, tone: 'adj' }],
  energy: { max: 2600, bars: ['work'], names: { work: 'Work against gravity' } },
  velocityScale: 20,
  height: 560,
  clips: {
    climb: { phases: [{ dur: 5, set: { student: STAIRS / 5 }, forces: [CLIMB] }, { dur: 0.001, set: { student: 0 }, forces: [CLIMB] }] },
  },
};

/** The lesson's car: a steady 25 m/s against 800 N of air resistance and friction, so the engine drives it with 800 N. */
const DRIVE: MotionForce[] = [
  { on: 'car', name: 'Drive', n: 800, tone: 'opp' },
  { on: 'car', name: 'Resistance', n: -800, resist: true, tone: 'bad' },
];
const car: MotionEl = {
  kind: 'motion',
  id: 'car',
  span: [0, 160],
  bodies: [{ id: 'car', shape: 'cart', mass: 1200, label: '', x: 35, v: 25, width: 10, tone: 'adj' }],
  energy: { max: 90000, bars: ['work'], names: { work: 'Work by the engine' } },
  forceScale: 0.1,
  velocityScale: 3,
  height: 400,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: DRIVE }] },
    go: { phases: [{ dur: 3.4, forces: DRIVE }] },
  },
};

/** The lesson's motor: 1500 W lifts 100 kg (981 N) at a steady 1500 ÷ 981 = 1.529 m/s. */
const TAUT: MotionForce[] = [
  { on: 'load', name: 'Tension', n: 100 * G, tone: 'brand' },
  { on: 'load', name: 'Weight', n: -100 * G, tone: 'hyp' },
];
const lift: MotionEl = {
  kind: 'motion',
  id: 'lift',
  vertical: 'up',
  span: [0, 7.4],
  bodies: [{ id: 'load', shape: 'block', mass: 100, label: 'Load', x: 0, width: 1.8, tone: 'adj' }],
  energy: { max: 6600, bars: ['work'], g: G, names: { work: 'Work by the motor' } },
  forceScale: 0.06,
  velocityScale: 26,
  height: 560,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: TAUT }] },
    up: { phases: [{ dur: 4, set: { load: 1500 / (100 * G) }, forces: TAUT }, { dur: 0.001, set: { load: 0 }, forces: TAUT }] },
  },
};

const video: Explainer = {
  id: 'p20-3-7',
  lessonId: 'p20-3-7',
  title: 'Power',
  thumbnail: 'cranes',
  summary:
    'Two cranes can do the same work, but one does it faster. Power is the rate of doing work. See two cranes race, find the power of a student climbing stairs, use power equals force times speed for a car at a steady speed, and find how fast a motor can lift a load.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Power', subtitle: 'How fast work is done' }],
      lines: [
        { say: 'Two cranes lift the same load to the same height. One takes five seconds, and the other takes twenty.', show: 'title' },
        { say: 'They do the same work, but nobody would call them equally good. What separates them is how fast they do the work.' },
      ],
    },
    {
      chapter: 'The rate of doing work',
      layout: 'center',
      main: [cranes, { kind: 'math', id: 'p', size: 'md', lines: ['\\thc{P = \\dfrac{W}{t}} \\qquad P_A = \\dfrac{6000}{20} = \\adj{300\\ \\text{W}} \\qquad P_B = \\dfrac{6000}{5} = \\brand{1200\\ \\text{W}}'] }],
      lines: [
        { say: 'Here are the two cranes. Each lifts a load that weighs 1,000 newtons through six metres.', show: ['cranes', 'cranes.energy', 'cranes.clock'], play: 'cranes.ready' },
        { say: 'Watch the clock, and the work that each crane has done.', play: 'cranes.lift', playDelay: 1.5 },
        { say: 'Crane B finished after five seconds. Crane A needed twenty. But both have done the same work: 1,000 newtons times six metres, which is 6,000 joules.' },
        { say: 'Power is the rate at which work is done: the work, divided by the time. It is measured in watts. One watt is one joule per second, and a kilowatt is 1,000 watts.', show: 'p' },
        { say: 'Crane A does 6,000 joules in twenty seconds, so its power is 300 watts. Crane B does the same work in five seconds: 1,200 watts.' },
        { say: 'So a powerful machine does not do more work. It does its work faster.' },
      ],
    },
    {
      chapter: 'Climbing stairs',
      layout: 'split',
      leftWidth: 560,
      left: [stairs],
      right: [{ kind: 'math', id: 's', size: 'md', lines: ['W = mgh', 'W = 60 \\times 9.81 \\times 4', 'W = \\opp{2354.4\\ \\text{J}}', 'P = \\dfrac{2354.4}{5} = \\thc{470.9\\ \\text{W}}'] }],
      lines: [
        { say: 'To lift something at a steady speed, you do work against gravity. That work is the gain in gravitational potential energy, m g h.', show: ['stairs', 'stairs.energy', 'stairs.clock', 's.0'] },
        { say: 'A student of sixty kilograms climbs a staircase four metres high, at a steady speed, in five seconds.', play: 'stairs.climb' },
        { say: 'The work is sixty, times 9.81, times four: 2,354.4 joules.', show: ['s.1', 's.2'] },
        { say: 'The power is that work, divided by five seconds: 470.9 watts. That is nearly half a kilowatt.', show: 's.3' },
      ],
    },
    {
      chapter: 'Force times speed',
      layout: 'center',
      main: [car, { kind: 'math', id: 'f', size: 'md', lines: ['P = \\dfrac{W}{t} = \\dfrac{Fd}{t} \\qquad \\thc{P = Fv} \\qquad P = 800 \\times 25 = \\opp{20\\,000\\ \\text{W}} = 20\\ \\text{kW}'] }],
      lines: [
        { say: 'For something that moves at a steady speed, there is a shortcut. This car travels at a steady 25 metres per second. Air resistance and friction push back on it with 800 newtons.', show: ['car', 'car.velocity', 'car.energy', 'car.clock'], play: 'car.ready' },
        { say: 'The speed is steady, so the forces balance. The engine must drive the car forward with 800 newtons. Watch the work it does each second.', play: 'car.go', playDelay: 6.5 },
        { say: 'The work is F d, so the power is F d over t. And d over t is the speed. So power is force times speed.', show: 'f' },
        { say: 'For the car, that is 800 times 25: 20,000 watts, or twenty kilowatts. Every second, the engine does 20,000 joules of work.' },
      ],
    },
    {
      chapter: 'How fast can a motor lift?',
      layout: 'split',
      leftWidth: 560,
      left: [lift],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['F = mg = \\brand{981\\ \\text{N}}', 'v = \\dfrac{P}{F}', 'v = \\dfrac{1500}{981} = \\good{1.53\\ \\text{m/s}}'] }],
      lines: [
        { say: 'The same formula can give a speed. A motor delivers 1,500 watts to a cable that lifts a load of 100 kilograms, at a steady speed. How fast does the load rise?', show: ['lift', 'lift.energy', 'lift.clock'], play: 'lift.ready' },
        { say: 'At a steady speed, the tension in the cable equals the weight: 100 times 9.81, which is 981 newtons.', show: 'm.0' },
        { say: 'Rearrange P equals F v. The speed is the power over the force: 1,500 over 981, which is 1.53 metres per second.', show: ['m.1', 'm.2'] },
        { say: 'Watch the lift. Every second, the motor does 1,500 joules of work.', show: 'lift.velocity', play: 'lift.up' },
      ],
    },
    {
      chapter: 'The kilowatt-hour',
      layout: 'center',
      main: [{ kind: 'math', id: 'k', size: 'lg', lines: ['1\\ \\text{kW}{\\cdot}\\text{h} = 1000\\ \\text{W} \\times 3600\\ \\text{s}', '1\\ \\text{kW}{\\cdot}\\text{h} = \\thc{3.6 \\times 10^{6}\\ \\text{J}}'] }],
      lines: [
        { say: 'One more unit. Electricity bills use the kilowatt-hour. In spite of its name, it is a unit of energy, not of power.', show: 'k.0' },
        { say: 'It is the energy transferred by one kilowatt in one hour: 1,000 watts, times 3,600 seconds, which is 3.6 times ten to the six joules.', show: 'k.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A motor lifts a 50 kg crate through 6 m in 4 s, at a steady speed. Use $g = 9.81\\ \\text{m/s}^2$. What power does the motor develop against gravity?',
          choices: ['$2943\\ \\text{W}$', '$75\\ \\text{W}$', '$735.8\\ \\text{W}$', '$11\\,772\\ \\text{W}$'],
          answer: 2,
          working: 'Work: $W = mgh = 50 \\times 9.81 \\times 6 = 2943\\ \\text{J}$. Power: $P = \\dfrac{W}{t} = \\dfrac{2943}{4} = 735.8\\ \\text{W}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A motor lifts a fifty kilogram crate through six metres in four seconds, at a steady speed. What power does the motor develop against gravity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The work is m g h: fifty, times 9.81, times six, which is 2,943 joules. Divide by four seconds, and the power is 735.8 watts. That is choice C. 2,943 is the common mistake: it is the work, not the power.', show: 'q.answer' },
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
            'Power is the rate of doing work: $P = \\dfrac{W}{t}$, in watts ($1\\ \\text{W} = 1\\ \\text{J/s}$)',
            'To lift at a steady speed, the work is $mgh$',
            'At a steady speed, power is force times speed: $P = Fv$',
            'More power means the same work done **faster**, not more work',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Power is the rate of doing work: the work divided by the time, in watts.', show: 'sum.0' },
        { say: 'To lift something at a steady speed, the work is m g h.', show: 'sum.1' },
        { say: 'At a steady speed, power is force times speed.', show: 'sum.2' },
        { say: 'And more power means the same work done faster, not more work.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
