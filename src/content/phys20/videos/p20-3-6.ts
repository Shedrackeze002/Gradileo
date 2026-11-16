import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.6, part 1: conservation of mechanical energy. Every motion is worked out from gravity
// and springs alone (src/video/motion.ts and src/video/path.ts), and the bars are measured from it,
// so the speeds on screen are the lesson's: a diver falls 10 m and reaches 14.0 m/s; a roller
// coaster passes 30 m at 4 m/s and reaches 20.2 m/s at 10 m; a cyclist at 12 m/s slows to 8.1 m/s
// 4 m higher; and a spring of 500 N/m compressed by 10 cm sends a 0.25 kg cart off at 4.47 m/s,
// which carries it 1.02 m up a hill.

const G = 9.81;

/** The lesson's diver: 60 kg, from rest, 10 m above the water. The fall takes 1.4278 s. */
const WEIGHT: MotionForce = { on: 'diver', name: 'Weight', n: 60 * G, tone: 'hyp' };
const dive: MotionEl = {
  kind: 'motion',
  id: 'dive',
  vertical: true,
  span: [0, 10],
  bodies: [{ id: 'diver', shape: 'ball', mass: 60, label: '', x: 0, width: 1.6, tone: 'adj' }],
  energy: { max: 6500, bars: ['potential', 'kinetic', 'total'], g: G, names: { total: 'Mechanical energy' } },
  forceScale: 0.1,
  velocityScale: 5,
  height: 500,
  clips: {
    hold: { phases: [{ dur: 1, freeze: true, forces: [WEIGHT] }] },
    // Near the water there is no room for the weight's arrow, so it acts without being drawn.
    fall: { phases: [{ dur: Math.sqrt((2 * 10) / G), slow: 2.5, forces: [{ ...WEIGHT, hidden: true }], note: 'Slow motion' }] },
  },
};

/** The lesson's roller coaster: over the top of a hill 30 m high at 4 m/s, through a dip, and on to a stretch 10 m high. */
const coaster: MotionEl = {
  kind: 'motion',
  id: 'coaster',
  span: [0, 64],
  path: { g: G, points: [[0, 30], [8, 30], [32, 0], [50, 10], [64, 10]] },
  bodies: [{ id: 'car', shape: 'cart', mass: 400, label: '', x: 3, v: 4, width: 5, tone: 'adj' }],
  energy: { max: 130000, bars: ['potential', 'kinetic', 'total'], names: { total: 'Mechanical energy' } },
  velocityScale: 2.4,
  height: 560,
  poster: 'go',
  clips: {
    go: { phases: [{ dur: 5.8 }] },
  },
};

/** The lesson's cyclist: 12 m/s at the bottom of a hill, coasting up to a stretch 4 m higher. */
const cyclist: MotionEl = {
  kind: 'motion',
  id: 'climb',
  span: [0, 44],
  path: { g: G, points: [[0, 0], [10, 0], [30, 4], [44, 4]] },
  bodies: [{ id: 'bike', shape: 'cart', mass: 80, label: '', x: 2, v: 12, width: 3, tone: 'adj' }],
  energy: { max: 6300, bars: ['kinetic', 'potential', 'total'], names: { total: 'Mechanical energy' } },
  velocityScale: 5,
  height: 440,
  clips: {
    go: { phases: [{ dur: 3.6, slow: 1.5 }] },
  },
};

/** The lesson's launcher: a spring of 500 N/m, compressed by 10 cm behind a 0.25 kg cart, stores 2.5 J. */
const launch: MotionEl = {
  kind: 'motion',
  id: 'launch',
  span: [0, 1.6],
  bodies: [{ id: 'cart', shape: 'cart', mass: 0.25, label: '', x: 0.4, width: 0.24, tone: 'adj' }],
  spring: { on: 'cart', k: 500, rest: 0.5, loose: true },
  energy: { max: 3, bars: ['elastic', 'kinetic', 'total'], names: { total: 'Mechanical energy' } },
  forceScale: 1.2,
  velocityScale: 18,
  height: 400,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [{ on: 'cart', name: 'Hold', n: -50, tone: 'opp' }] }] },
    go: { phases: [{ dur: 0.25, slow: 10 }] },
  },
};

/** The same cart, moving at √20 = 4.47 m/s, meets a smooth hill: its 2.5 J carry it 1.02 m up. */
const hill: MotionEl = {
  kind: 'motion',
  id: 'hill',
  span: [0, 9],
  path: { g: G, points: [[0, 0], [2, 0], [9, 1.4]] },
  bodies: [{ id: 'cart', shape: 'cart', mass: 0.25, label: '', x: 0.5, v: Math.sqrt(20), width: 0.7, tone: 'adj' }],
  energy: { max: 3, bars: ['kinetic', 'potential', 'total'], names: { total: 'Mechanical energy' } },
  velocityScale: 18,
  height: 460,
  clips: {
    // The cart comes to rest for an instant after 2.5075 s, 1.019 m up.
    up: { phases: [{ dur: 2.5075, slow: 1.5 }] },
  },
};

const video: Explainer = {
  id: 'p20-3-6',
  lessonId: 'p20-3-6',
  title: 'Conservation of Mechanical Energy',
  thumbnailTitle: 'Conservation of Energy',
  thumbnail: 'coaster',
  summary:
    'A roller coaster trades height for speed and speed for height, and the total never changes. Watch the energy bars of a diver, a roller coaster, a cyclist coasting uphill and a spring launcher, and use conservation of mechanical energy to find each speed and height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Conservation of Mechanical Energy', subtitle: 'Trading height for speed' }],
      lines: [
        { say: 'A roller coaster car is hauled to the top of the first hill, and after that nothing drives it.', show: 'title' },
        { say: 'It trades height for speed on the way down, and speed for height on the way up, again and again. This lesson follows the energy through that trade.' },
      ],
    },
    {
      chapter: 'A fall from rest',
      layout: 'center',
      main: [dive, { kind: 'math', id: 'd', size: 'md', lines: ['\\hyp{mgh} = \\good{\\tfrac{1}{2}mv^2} \\qquad v = \\sqrt{2gh} = \\sqrt{2 \\times 9.81 \\times 10} = \\good{14.0\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Start with a fall. A diver stands on a platform, ten metres above the water. At the top, the diver has gravitational potential energy and no kinetic energy.', show: ['dive', 'dive.energy'], play: 'dive.hold' },
        { say: 'The mechanical energy of an object is the sum of its kinetic energy and its potential energies. Watch all three bars as the diver falls.', show: ['dive.total', 'dive.velocity'], play: 'dive.fall', playDelay: 6 },
        { say: 'Potential energy became kinetic energy, but the total never changed. When only gravity and spring forces do work on an object, its mechanical energy stays the same.' },
        { say: 'So m g h at the top equals one half m v squared at the bottom. The mass cancels, and v is the square root of two g h: 14.0 metres per second.', show: 'd' },
        { say: 'Because the mass cancels, a heavy diver and a light one reach the water at the same speed.' },
      ],
    },
    {
      chapter: 'A roller coaster',
      layout: 'split',
      leftWidth: 640,
      left: [coaster],
      right: [{ kind: 'math', id: 'c', size: 'md', lines: ['E_k + E_g = E_k\' + E_g\'', 'v^2 = u^2 + 2g(h_1 - h_2)', 'v^2 = 4^2 + 2 \\times 9.81 \\times 20', 'v = \\sqrt{408.4} = \\good{20.2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Now the roller coaster. The car passes the top of a hill, thirty metres high, at four metres per second. How fast is it moving later, at a point ten metres high?', show: ['coaster', 'coaster.energy', 'coaster.total', 'coaster.velocity', 'coaster.height'] },
        { say: 'Watch the bars. Height turns into speed on the way down, and some of that speed turns back into height on the way up. The mechanical energy stays the same.', play: 'coaster.go', playDelay: 2 },
        { say: 'So the kinetic and potential energy at the top add up to the kinetic and potential energy at the end.', show: 'c.0' },
        { say: 'The mass cancels again. v squared is u squared, plus two g times the drop in height.', show: 'c.1' },
        { say: 'That is four squared, plus two, times 9.81, times twenty, which is 408.4. So the speed is 20.2 metres per second.', show: ['c.2', 'c.3'] },
        { say: 'Notice that the shape of the track did not matter. Only the change in height did. That is the great strength of this law.' },
      ],
    },
    {
      chapter: 'Coasting uphill',
      layout: 'center',
      main: [cyclist, { kind: 'math', id: 'u', size: 'md', lines: ['\\tfrac{1}{2}mu^2 = \\tfrac{1}{2}mv^2 + mgh \\qquad v^2 = 12^2 - 2 \\times 9.81 \\times 4 = 65.52', 'v = \\sqrt{65.52} = \\good{8.1\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Energy can go the other way. A cyclist reaches the bottom of a hill at twelve metres per second, and coasts up it without pedalling.', show: ['climb', 'climb.energy', 'climb.total', 'climb.velocity', 'climb.height'], play: 'climb.go', playDelay: 5 },
        { say: 'Kinetic energy turns into gravitational potential energy, so the cyclist slows down. How fast is the cyclist at a height of four metres?' },
        { say: 'The kinetic energy at the bottom equals the kinetic energy plus the potential energy higher up. So v squared is twelve squared, minus two, times 9.81, times four. That is 65.52.', show: 'u.0' },
        { say: 'The speed is the square root: 8.1 metres per second.', show: 'u.1' },
      ],
    },
    {
      chapter: 'A spring launcher',
      layout: 'center',
      main: [launch, { kind: 'math', id: 'l', size: 'md', lines: ['E_e = \\tfrac{1}{2} \\times 500 \\times 0.1^2 = \\brand{2.5\\ \\text{J}}', '\\tfrac{1}{2}mv^2 = 2.5\\ \\text{J} \\qquad v = \\sqrt{\\dfrac{2 \\times 2.5}{0.25}} = \\good{4.47\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Springs obey the same law. A spring with a spring constant of 500 newtons per metre is compressed by ten centimetres, behind a cart of 0.25 kilograms.', show: ['launch', 'launch.extension', 'launch.energy', 'launch.total'], play: 'launch.ready' },
        { say: 'The spring stores one half, times 500, times 0.1 squared: 2.5 joules. Now let go, in slow motion.', show: ['l.0', 'launch.velocity'], play: 'launch.go', playDelay: 6.5 },
        { say: 'All of the elastic energy has become kinetic energy. So one half m v squared is 2.5 joules, and the speed is the square root of two times 2.5, over 0.25: 4.47 metres per second.', show: 'l.1' },
      ],
    },
    {
      chapter: 'Up a hill',
      layout: 'center',
      main: [hill, { kind: 'math', id: 'g', size: 'md', lines: ['\\hyp{mgh} = 2.5\\ \\text{J} \\qquad h = \\dfrac{2.5}{0.25 \\times 9.81} = \\hyp{1.02\\ \\text{m}}'] }],
      lines: [
        { say: 'The cart now meets a smooth hill, still moving at 4.47 metres per second. How high does it climb?', show: ['hill', 'hill.energy', 'hill.total', 'hill.velocity', 'hill.height'] },
        { say: 'It climbs until all of its kinetic energy has become gravitational potential energy.', play: 'hill.up' },
        { say: 'At the greatest height, m g h equals 2.5 joules. So h is 2.5, over 0.25 times 9.81: 1.02 metres.', show: 'g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball is dropped from rest, 5 m above the ground. Ignore air resistance and use $g = 9.81\\ \\text{m/s}^2$. With what speed does it reach the ground?',
          choices: ['$49.1\\ \\text{m/s}$', '$9.9\\ \\text{m/s}$', '$98.1\\ \\text{m/s}$', '$7.0\\ \\text{m/s}$'],
          answer: 1,
          working: '$mgh = \\tfrac{1}{2}mv^2$, and the mass cancels: $v = \\sqrt{2gh} = \\sqrt{2 \\times 9.81 \\times 5} = \\sqrt{98.1} = 9.9\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball is dropped from rest, five metres above the ground. Ignore air resistance. With what speed does it reach the ground? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The potential energy at the top becomes kinetic energy at the bottom, and the mass cancels. v is the square root of two, times 9.81, times five. That is the square root of 98.1, which is 9.9 metres per second: choice B. 98.1 is the common mistake, from forgetting the square root.', show: 'q.answer' },
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
            'Mechanical energy: $E_m = E_k + E_g + E_e$',
            'When only gravity and spring forces do work, mechanical energy **stays the same**',
            'The path does not matter: only the **change in height**',
            'The mass cancels. From rest, $v = \\sqrt{2gh}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Mechanical energy is the sum of kinetic energy, gravitational potential energy and elastic potential energy.', show: 'sum.0' },
        { say: 'When only gravity and spring forces do work, the mechanical energy stays the same.', show: 'sum.1' },
        { say: 'The path does not matter. Only the change in height does.', show: 'sum.2' },
        { say: 'And the mass cancels. For a fall from rest, v is the square root of two g h.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
