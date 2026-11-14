import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.3: gravitational potential energy = mgh. A crate is lifted steadily and the work of the
// lift is stored as height; it falls and the energy comes back as motion; and a trolley pushed up
// a long ramp gains exactly what a straight lift would give. The bars are measured from the
// motion (src/video/motion.ts and src/video/path.ts).

const G = 9.8;

// A 20 kg crate (196 N) lifted 5 m at a steady 1 m/s: 196 × 5 = 980 J.
const WEIGHT: MotionForce = { on: 'crate', name: 'Weight', n: -20 * G, tone: 'hyp' };
const LIFT: MotionForce = { on: 'crate', name: 'Lift', n: 20 * G, tone: 'opp' };
const lift: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 5],
  height: 440,
  bodies: [{ id: 'crate', shape: 'block', mass: 20, x: 0, width: 0.9, tone: 'adj' }],
  energy: { max: 1100, bars: ['work', 'potential'], g: G },
  forceScale: 0.3,
  velocityScale: 30,
  poster: 'up',
  clips: {
    weigh: { phases: [{ dur: 1, freeze: true, forces: [WEIGHT] }] },
    ready: { phases: [{ dur: 1, freeze: true, forces: [LIFT, WEIGHT] }] },
    up: {
      phases: [
        { dur: 5, set: { crate: 1 }, forces: [LIFT, WEIGHT] },
        { dur: 0.001, set: { crate: 0 }, forces: [LIFT, WEIGHT] },
      ],
    },
  },
};

// The rope is cut: the crate falls 5 m in √(10 ÷ 9.8) seconds, and lands with all 980 J as motion.
const drop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 5],
  height: 440,
  bodies: [{ id: 'crate', shape: 'block', mass: 20, x: 0, width: 0.9, tone: 'adj' }],
  energy: { max: 1100, bars: ['potential', 'kinetic'], g: G },
  velocityScale: 6,
  poster: 'fall',
  clips: {
    fall: { phases: [{ dur: Math.sqrt(10 / G), slow: 3, forces: [{ on: 'crate', name: 'Weight', n: 20 * G, tone: 'hyp', hidden: true }], note: 'Slow motion' }] },
  },
};

// A 10 kg trolley pushed at a steady 2 m/s up a ramp 8 m along and 3 m high. The push along the
// slope balances gravity's pull along it, m × g × 3 ÷ (the ramp's length), so the work is mgh:
// 10 × 9.8 × 3 = 294 J.
const RAMP = Math.hypot(8, 3);
const PUSH: MotionForce = { on: 'trolley', name: 'Push', n: (10 * G * 3) / RAMP, tone: 'opp' };
const ramp: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, RAMP],
  height: 470,
  path: { g: G, points: [[0, 0], [8, 3]] },
  bodies: [{ id: 'trolley', shape: 'cart', mass: 10, x: 0, width: 1.1, label: '10 kg', tone: 'adj' }],
  energy: { max: 340, bars: ['work', 'potential'] },
  velocityScale: 16,
  poster: 'up',
  clips: {
    up: {
      phases: [
        { dur: RAMP / 2, set: { trolley: 2 }, forces: [PUSH] },
        { dur: 0.001, set: { trolley: 0 }, forces: [PUSH] },
      ],
    },
  },
};

const video: Explainer = {
  id: 'p10-3-3',
  lessonId: 'p10-3-3',
  title: 'Gravitational Potential Energy',
  thumbnail: 'sim',
  summary:
    'Lifting something stores energy in its height: gravitational potential energy = mass × g × height. Watch the work of a lift turn into stored energy, see it come back as motion when the crate falls, and find out why a long ramp and a straight lift store exactly the same amount.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Gravitational Potential Energy', subtitle: 'The energy stored by lifting' }],
      lines: [
        { say: 'Lifting a bucket of water takes work. That energy is not lost. It is stored in the raised bucket, and you get it back, as motion, if the bucket falls.', show: 'title' },
        { say: 'Energy stored by lifting something against gravity is called gravitational potential energy. In this lesson, you will see how to work it out.' },
      ],
    },
    {
      chapter: 'Lifting stores energy',
      layout: 'center',
      main: [lift, { kind: 'math', id: 'ep', size: 'md', lines: ['\\hyp{E_p} = mgh = 20 \\times 9.8 \\times 5 = \\hyp{980\\ \\text{J}}'] }],
      lines: [
        { say: 'A twenty kilogram crate sits on the ground. On Earth, g is nine point eight newtons per kilogram, so its weight is twenty times nine point eight: one hundred and ninety-six newtons.', show: 'sim', play: 'sim.weigh', playDelay: 7 },
        { say: 'To lift it steadily, a rope must pull upwards with a force equal to the weight.', play: 'sim.ready', playDelay: 1.5 },
        { say: 'Now lift the crate through five metres, and watch the work that the rope does.', show: 'sim.energy', play: 'sim.up', playDelay: 1.2 },
        { say: 'The rope did one hundred and ninety-six, times five, which is nine hundred and eighty joules of work. The crate is not moving, so where is that energy? It is stored in the height of the crate, as gravitational potential energy.', focus: 'sim.crate' },
        { say: 'The force was the weight, m times g, and the distance was the height, h. So gravitational potential energy equals m g h. Twenty, times nine point eight, times five, is nine hundred and eighty joules.', show: 'ep' },
      ],
    },
    {
      chapter: 'Getting the energy back',
      layout: 'center',
      main: [drop, { kind: 'text', id: 'change', size: 'md', md: 'Going **up**, an object **gains** potential energy. Coming **down**, it **loses** the same amount.' }],
      lines: [
        { say: 'Here is the crate, five metres up, with its nine hundred and eighty joules. Now cut the rope.', show: ['sim', 'sim.energy', 'sim.velocity'], play: 'sim.fall', playDelay: 5 },
        { say: 'As it falls, its potential energy drains away, and it gains speed. Just before it lands, all nine hundred and eighty joules have come back as energy of motion.' },
        { say: 'So what matters is the change in height. Going up, an object gains potential energy. Coming down, it loses the same amount.', show: 'change' },
      ],
    },
    {
      chapter: 'Only the height counts',
      layout: 'center',
      main: [ramp, { kind: 'math', id: 'same', size: 'md', lines: ['\\hyp{E_p} = mgh = 10 \\times 9.8 \\times 3 = \\hyp{294\\ \\text{J}}'] }],
      lines: [
        { say: 'A platform is three metres high. One way up is a ladder. Another is this long, gentle ramp, more than eight metres from end to end.', show: ['sim', 'sim.height'] },
        { say: 'Push a ten kilogram trolley all the way up the ramp, and watch the energy it gains.', show: 'sim.energy', play: 'sim.up', playDelay: 1.5 },
        { say: 'It has gained two hundred and ninety-four joules. Now work out m g h for a straight lift of three metres. Ten, times nine point eight, times three, is two hundred and ninety-four joules. Exactly the same.', show: 'same' },
        { say: 'The length of the path does not matter. Only the vertical height counts. A ramp and a ladder to the same platform store the same energy.', focus: 'sim.trolley' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On Earth, g = 9.8 N/kg. A bucket of water of mass 5 kg is lifted through 10 m. How much gravitational potential energy does it gain?',
          choices: ['50 J', '490 J', '980 J', '4900 J'],
          answer: 1,
          working: '$E_p = mgh = 5 \\times 9.8 \\times 10 = 490\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On Earth, g is nine point eight newtons per kilogram. A bucket of water with a mass of five kilograms is lifted through ten metres. How much gravitational potential energy does it gain? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Use m g h, and do not leave out g. Five, times nine point eight, times ten, is four hundred and ninety joules. That is choice B.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            'Gravitational potential energy is the energy of height: $E_p = mgh$, in joules',
            'On Earth, g = 9.8 N/kg',
            'Going up is a gain, and coming down is a loss',
            'Only the change in vertical height counts, not the length of the path',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Gravitational potential energy is the energy of height. It equals mass, times g, times height.', show: 'end.0' },
        { say: 'On Earth, g is nine point eight newtons per kilogram.', show: 'end.1' },
        { say: 'Going up, an object gains potential energy. Coming down, it loses it.', show: 'end.2' },
        { say: 'And only the change in vertical height counts, not the length of the path.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
