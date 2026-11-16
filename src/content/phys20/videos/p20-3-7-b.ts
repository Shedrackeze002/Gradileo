import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.7, part 2: efficiency. A motor pulls each load up a shaft whose rails rub on it, so the
// energy supplied, the energy stored as height and the thermal energy from friction are all
// measured from the motion (src/video/motion.ts). The numbers are the lesson's: 1000 J in and
// 800 J out is 80%; a hoist that uses 650 J to lift 10 kg through 5 m is 75.5% efficient; an 800 W
// motor at 75% lifts 150 kg through 8 m in 19.6 s; and a 1200 kg car with a 25% efficient engine
// needs 2354 kJ of fuel energy to climb 50 m.

const G = 9.81;
const NAMES = { work: 'Energy supplied', potential: 'Useful: stored as height', heat: 'Wasted: thermal energy' };

/** A load on a cable in a shaft: the pull balances its weight and the friction of the rails, so it rises at a steady speed. */
const forces = (weight: number, friction: number): MotionForce[] => [
  { on: 'load', name: 'Pull', n: weight + friction, tone: 'opp' },
  { on: 'load', name: 'Friction', n: -friction, resist: true, tone: 'bad' },
  { on: 'load', name: 'Weight', n: -weight, tone: 'hyp' },
];

/** The lesson's motor: a load that weighs 160 N rises 5 m against 40 N of friction, so 1000 J go in and 800 J are stored. */
const motor: MotionEl = {
  kind: 'motion',
  id: 'motor',
  vertical: 'up',
  // The shaft runs a little past the 5 m the load rises, to leave room for the arrow over it.
  span: [0, 6.2],
  bodies: [{ id: 'load', shape: 'block', mass: 160 / G, label: '', x: 0, width: 1.4, tone: 'adj' }],
  energy: { max: 1100, bars: ['work', 'potential', 'heat'], g: G, names: NAMES },
  forceScale: 0.3,
  velocityScale: 30,
  height: 400,
  poster: 'up',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: forces(160, 40) }] },
    up: { phases: [{ dur: 5, set: { load: 1 }, forces: forces(160, 40) }, { dur: 0.001, set: { load: 0 }, forces: forces(160, 40) }] },
  },
};

/** The lesson's hoist: 10 kg (98.1 N) through 5 m stores 490.5 J, and 31.9 N of friction brings the energy supplied to 650 J. */
const hoist: MotionEl = {
  kind: 'motion',
  id: 'hoist',
  vertical: 'up',
  span: [0, 6.2],
  bodies: [{ id: 'load', shape: 'block', mass: 10, label: '10 kg', x: 0, width: 1.4, tone: 'adj' }],
  energy: { max: 720, bars: ['work', 'potential', 'heat'], g: G, names: NAMES },
  forceScale: 0.45,
  velocityScale: 30,
  height: 540,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: forces(10 * G, 31.9) }] },
    up: { phases: [{ dur: 5, set: { load: 1 }, forces: forces(10 * G, 31.9) }, { dur: 0.001, set: { load: 0 }, forces: forces(10 * G, 31.9) }] },
  },
};

/**
 * The lesson's motor of 800 W and 75%: its useful 600 W lifts 150 kg (1471.5 N) at 0.4077 m/s, so
 * 8 m takes 19.62 s. The other 200 W go to 490.5 N of friction.
 */
const HEAVY = forces(150 * G, 490.5);
const RISE = 600 / (150 * G);
const lifter: MotionEl = {
  kind: 'motion',
  id: 'lifter',
  vertical: 'up',
  span: [0, 9.6],
  bodies: [{ id: 'load', shape: 'block', mass: 150, label: '', x: 0, width: 2, tone: 'adj' }],
  energy: { max: 17500, bars: ['work', 'potential', 'heat'], g: G, names: NAMES },
  forceScale: 0.03,
  velocityScale: 60,
  height: 540,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: HEAVY }] },
    up: { phases: [{ dur: 8 / RISE, slow: 0.25, set: { load: RISE }, forces: HEAVY, note: 'Four times as fast' }, { dur: 0.001, set: { load: 0 }, forces: HEAVY }] },
  },
};

/**
 * The lesson's car: 1200 kg up a hill at a steady 20 m/s. The slope rises 5 m in every 13 m along
 * it, so 130 m along the slope is 50 m of height, and the work against gravity is 588 600 J. The
 * slope starts a little below the ground, so the middle of the car starts level with it.
 */
const DRIVE: MotionForce = { on: 'car', name: 'Drive', n: (1200 * G * 5) / 13, tone: 'opp' };
const hill: MotionEl = {
  kind: 'motion',
  id: 'hill',
  span: [0, 143],
  path: { g: G, points: [[0, -2.5], [132, 52.5]] },
  bodies: [{ id: 'car', shape: 'cart', mass: 1200, label: '', x: 6.5, width: 12, tone: 'adj' }],
  energy: { max: 650000, bars: ['work'], names: { work: 'Useful: work against gravity' } },
  velocityScale: 2,
  height: 540,
  clips: {
    climb: { phases: [{ dur: 6.5, set: { car: 20 }, forces: [DRIVE] }, { dur: 0.001, set: { car: 0 }, forces: [DRIVE] }] },
  },
};

const video: Explainer = {
  id: 'p20-3-7-b',
  lessonId: 'p20-3-7',
  title: 'Power, Part 2: Efficiency',
  thumbnailTitle: 'Efficiency',
  thumbnail: 'motor',
  summary:
    'No machine turns all the energy it takes in into useful work. Watch where a motor’s energy goes as it lifts a load, work out an efficiency as a percent, and use an efficiency as a decimal to find how long a lift takes and how much energy a fuel must supply.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Efficiency', subtitle: 'How much of the energy does the job' }],
      lines: [
        { say: 'No machine turns all the energy it takes in into useful work.', show: 'title' },
        { say: 'Friction, air resistance and electrical resistance change part of it into thermal energy, and some becomes sound. Efficiency tells you how much is left to do the job.' },
      ],
    },
    {
      chapter: 'Useful and wasted energy',
      layout: 'center',
      main: [
        motor,
        { kind: 'math', id: 'e', size: 'md', lines: ['\\thc{\\text{efficiency} = \\dfrac{\\text{useful energy out}}{\\text{total energy in}} \\times 100\\%} \\qquad \\dfrac{800}{1000} \\times 100\\% = \\good{80\\%}'] },
      ],
      lines: [
        { say: 'A motor pulls a load up a shaft. The load weighs 160 newtons, and the rails of the shaft rub on it with forty newtons of friction. So the motor must pull with 200 newtons.', show: 'motor', play: 'motor.ready', playDelay: 6 },
        { say: 'Watch where the energy goes as the load rises through five metres.', show: 'motor.energy', play: 'motor.up', playDelay: 2 },
        { say: 'The motor supplied 1,000 joules. But only 800 joules are stored in the height of the load. That is the useful energy, because lifting the load is the job of the machine.' },
        { say: 'The other 200 joules were wasted: friction changed them into thermal energy. The useful energy and the wasted energy always add up to the energy supplied.' },
        { say: 'The efficiency of a machine is the fraction of the energy it takes in that comes out in the useful form. Here, 800 over 1,000 is 0.8, so the motor is eighty percent efficient.', show: 'e' },
      ],
    },
    {
      chapter: 'A hoist',
      layout: 'split',
      leftWidth: 620,
      left: [hoist],
      right: [{ kind: 'math', id: 'h', size: 'md', lines: ['E_{\\text{out}} = mgh = \\hyp{490.5\\ \\text{J}}', 'E_{\\text{in}} = \\opp{650\\ \\text{J}}', '\\dfrac{490.5}{650} \\times 100\\% = \\good{75.5\\%}'] }],
      lines: [
        { say: 'An electric hoist uses 650 joules of electrical energy to lift a load of ten kilograms through five metres. What is its efficiency?', show: ['hoist', 'hoist.energy'], play: 'hoist.ready', playDelay: 5 },
        { say: 'The useful energy out is the potential energy that the load gains: ten, times 9.81, times five, which is 490.5 joules.', show: 'h.0', play: 'hoist.up' },
        { say: 'The total energy in is 650 joules. So the efficiency is 490.5 over 650, times 100 percent: 75.5 percent.', show: ['h.1', 'h.2'] },
        { say: 'The same ratio works with powers: the useful power out, over the total power in.' },
      ],
    },
    {
      chapter: 'Efficiency as a decimal',
      layout: 'split',
      leftWidth: 620,
      left: [lifter],
      right: [{ kind: 'math', id: 't', size: 'md', lines: ['P_{\\text{out}} = 0.75 \\times 800 = \\good{600\\ \\text{W}}', 'W = mgh = \\hyp{11\\,772\\ \\text{J}}', 't = \\dfrac{11\\,772}{600} = \\thc{19.6\\ \\text{s}}'] }],
      lines: [
        { say: 'When you know the efficiency, use it as a decimal. A motor takes in electrical energy at 800 watts, and it is 75 percent efficient. How long does it take to lift a load of 150 kilograms through eight metres?', show: ['lifter', 'lifter.energy', 'lifter.clock'], play: 'lifter.ready', playDelay: 9 },
        { say: 'Multiply the input by the efficiency to find the useful output. 0.75 times 800 is 600 watts of useful power.', show: 't.0' },
        { say: 'The useful work is m g h: 150, times 9.81, times eight, which is 11,772 joules.', show: 't.1' },
        { say: 'The time is the work over the power: 11,772 over 600, which is 19.6 seconds. Watch the lift, and the clock.', show: 't.2', play: 'lifter.up', playDelay: 7 },
      ],
    },
    {
      chapter: 'The energy a fuel must supply',
      layout: 'split',
      leftWidth: 620,
      left: [hill],
      right: [{ kind: 'math', id: 'f', size: 'md', lines: ['E_{\\text{out}} = mgh = \\opp{588\\,600\\ \\text{J}}', 'E_{\\text{in}} = \\dfrac{588\\,600}{0.25}', 'E_{\\text{in}} = \\thc{2\\,354\\,400\\ \\text{J}}'] }],
      lines: [
        { say: 'To find an input, go the other way. The engine of a car of twelve hundred kilograms is 25 percent efficient. The car climbs a hill fifty metres high, at a steady speed.', show: ['hill', 'hill.energy', 'hill.velocity', 'hill.height'], play: 'hill.climb', playDelay: 4 },
        { say: 'Counting only the work done against gravity, the useful energy out is m g h: 1,200, times 9.81, times fifty, which is 588,600 joules.', show: 'f.0' },
        { say: 'That is only a quarter of the energy that the fuel supplies. To find the input, divide the useful output by the efficiency: 588,600 over 0.25.', show: 'f.1' },
        { say: 'The fuel must supply 2,354,400 joules, which is about 2,354 kilojoules. Three quarters of it leaves the engine as thermal energy.', show: 'f.2' },
        { say: 'Check the size of your answer. An input must come out larger than the output, and an efficiency is always less than 100 percent. If yours is more, you have divided the wrong way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A motor takes in 500 J of electrical energy and lifts a 4 kg load through 10 m. Use $g = 9.81\\ \\text{m/s}^2$. What is the efficiency of the motor?',
          choices: ['$127.4\\%$', '$8\\%$', '$21.5\\%$', '$78.5\\%$'],
          answer: 3,
          working: 'Useful energy out: $mgh = 4 \\times 9.81 \\times 10 = 392.4\\ \\text{J}$. Efficiency: $\\dfrac{392.4}{500} \\times 100\\% = 78.5\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A motor takes in 500 joules of electrical energy, and lifts a four kilogram load through ten metres. What is the efficiency of the motor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The useful energy out is m g h: four, times 9.81, times ten, which is 392.4 joules. Divide by the 500 joules that went in, and the efficiency is 78.5 percent. That is choice D. An answer of more than 100 percent means the fraction is upside down.', show: 'q.answer' },
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
            'Efficiency $= \\dfrac{\\text{useful energy out}}{\\text{total energy in}} \\times 100\\%$, and the same with powers',
            'Useful output $=$ efficiency $\\times$ input, with the efficiency as a decimal',
            'Input $=$ useful output $\\div$ efficiency',
            'An efficiency is always **less than 100%**: the rest becomes thermal energy',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Efficiency is the useful energy out, over the total energy in, times 100 percent. The same ratio works with powers.', show: 'sum.0' },
        { say: 'To find the useful output, multiply the input by the efficiency, as a decimal.', show: 'sum.1' },
        { say: 'To find the input, divide the useful output by the efficiency.', show: 'sum.2' },
        { say: 'And an efficiency is always less than 100 percent. The rest becomes thermal energy.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
