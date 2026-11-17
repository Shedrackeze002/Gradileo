import type { Explainer, MotionEl, MotionForce, RampEl } from '@/video/script.ts';

// Lesson 3.6, part 2: when friction takes a share. Each motion is worked out from gravity and a
// force of friction along the track (src/video/motion.ts, src/video/path.ts and src/video/ramp.ts),
// and the bars are measured from it, so the energies on screen are the lesson's: a 30 kg child
// leaves a 3 m slide at 5 m/s with 508 J changed to thermal energy; a 60 kg skier drops 40 m, loses
// 6000 J and reaches 24.2 m/s; and a 20 kg crate slides 10 m down a ramp, dropping 4 m, and reaches
// 6 m/s after friction of 42.5 N has taken 424.8 J.

const G = 9.81;
const NAMES = { heat: 'Thermal energy', total: 'Total energy' };
const friction = (on: string, n: number): MotionForce => ({ on, name: 'Friction', n: -n, resist: true, tone: 'bad' });

/** A 10 kg car let go 3 m up one side of a rough dip, with 12 N of friction: each swing is lower than the last. */
const dip: MotionEl = {
  kind: 'motion',
  id: 'dip',
  span: [0, 12],
  path: { g: G, points: [[0, 3], [6, 0], [12, 3]] },
  bodies: [{ id: 'car', shape: 'cart', mass: 10, label: '', x: 0, width: 1.2, tone: 'adj' }],
  energy: { max: 330, bars: ['potential', 'kinetic', 'heat', 'total'], names: NAMES },
  velocityScale: 9,
  height: 540,
  clips: {
    go: { phases: [{ dur: 10, forces: [friction('car', 12)] }] },
  },
};

/**
 * The lesson's slide: 3 m high and 5.9728 m long. A friction force of 507.9 ÷ 5.9728 = 85.035 N
 * takes 507.9 J on the way down, so the 30 kg child reaches the bottom at 5 m/s.
 */
const slide: MotionEl = {
  kind: 'motion',
  id: 'slide',
  span: [0, 7.5],
  path: { g: G, points: [[0, 3], [5, 0], [7.5, 0]] },
  bodies: [{ id: 'child', shape: 'block', mass: 30, label: '30 kg', x: 0, width: 0.8, tone: 'adj' }],
  energy: { max: 950, bars: ['potential', 'kinetic', 'heat', 'total'], names: NAMES },
  velocityScale: 14,
  height: 560,
  poster: 'go',
  clips: {
    // The child reaches the foot of the slide after 1.8148 s.
    go: { phases: [{ dur: 1.8148, slow: 1.5, forces: [friction('child', 507.9 / 5.97283)] }] },
  },
};

/**
 * The lesson's skier: 60 kg, down a slope 40 m high and 82.604 m long. Friction and air resistance
 * together act as 6000 ÷ 82.604 = 72.636 N, so 6000 J are lost and the skier reaches 24.2 m/s.
 */
const ski: MotionEl = {
  kind: 'motion',
  id: 'ski',
  span: [0, 95],
  path: { g: G, points: [[0, 40], [70, 0], [95, 0]] },
  bodies: [{ id: 'skier', shape: 'block', mass: 60, label: '', x: 0, width: 7, tone: 'adj' }],
  energy: { max: 25000, bars: ['potential', 'kinetic', 'heat', 'total'], names: NAMES },
  velocityScale: 2.4,
  height: 560,
  clips: {
    // The skier reaches the foot of the slope after 5.6521 s.
    go: { phases: [{ dur: 5.6521, forces: [friction('skier', 6000 / 82.60417)] }] },
  },
};

/**
 * The lesson's crate: 20 kg on a ramp that drops 4 m in 10 m (23.58°). A coefficient of kinetic
 * friction of 0.23624 gives 42.48 N of friction, so the crate gains 1.8 m/s each second and
 * reaches 6 m/s after 10 m, which takes 3.3333 s.
 */
const ANGLE = (Math.asin(0.4) * 180) / Math.PI;
const crate: RampEl = {
  kind: 'ramp',
  id: 'crate',
  angle: ANGLE,
  length: 13.5,
  friction: [0.24, 42.48 / (20 * G * Math.cos(Math.asin(0.4)))],
  bodies: [{ id: 'crate', mass: 20, label: '20 kg', x: 12.5, width: 1.1, tone: 'adj' }],
  work: { rows: ['Weight', 'Friction', 'Net'], range: [-500, 850] },
  height: 580,
  pad: [110, 230],
  forceScale: 0.4,
  velocityScale: 12,
  clips: {
    go: { phases: [{ dur: 6 / 1.8, slow: 1.4 }] },
  },
};

const video: Explainer = {
  id: 'p20-3-6-b',
  lessonId: 'p20-3-6',
  title: 'Conservation of Mechanical Energy, Part 2: When Friction Takes a Share',
  thumbnailTitle: 'When Friction Takes a Share',
  thumbnail: 'slide',
  summary:
    'Real slides and slopes have friction, so mechanical energy is not conserved. Watch a thermal energy bar fill as a car loses height on every swing, find the energy lost on a slide, the speed of a skier at the bottom of a slope, and the force of friction on a ramp.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'When Friction Takes a Share', subtitle: 'Where the missing energy goes' }],
      lines: [
        { say: 'Real slides, slopes and tracks have friction. A car on a rough track never climbs back to the height it started from.', show: 'title' },
        { say: 'Its mechanical energy is not conserved. But the energy has not been destroyed, and the books still balance.' },
      ],
    },
    {
      chapter: 'Friction makes thermal energy',
      layout: 'center',
      main: [dip, { kind: 'math', id: 'e', size: 'md', lines: ['\\thc{E_m \\text{ at the start} = E_m \\text{ at the end} + E_{\\text{lost}}}'] }],
      lines: [
        { say: 'Let a car go on a rough track, and watch four bars: its potential energy, its kinetic energy, the thermal energy that friction makes, and the total.', show: ['dip', 'dip.energy', 'dip.total', 'dip.velocity'], play: 'dip.go', playDelay: 4 },
        { say: 'Friction does negative work on the car. It changes some of the mechanical energy into thermal energy: the surfaces get warmer. So each swing is lower than the last.' },
        { say: 'But the total never changes. The mechanical energy at the start equals the mechanical energy at the end, plus the energy lost.', show: 'e' },
        { say: 'The energy that is lost has not been destroyed. It has spread out as thermal energy, where it can no longer move the car.' },
      ],
    },
    {
      chapter: 'Energy lost on a slide',
      layout: 'split',
      leftWidth: 620,
      left: [slide],
      right: [{ kind: 'math', id: 's', size: 'md', lines: ['E_g = mgh = \\hyp{882.9\\ \\text{J}}', 'E_k = \\tfrac{1}{2}mv^2 = \\good{375\\ \\text{J}}', 'E_{\\text{lost}} = 882.9 - 375', 'E_{\\text{lost}} = \\bad{508\\ \\text{J}}'] }],
      lines: [
        { say: 'A child of thirty kilograms starts from rest at the top of a slide, three metres above the bottom. At the top, the potential energy is thirty, times 9.81, times three: 882.9 joules.', show: ['slide', 'slide.energy', 'slide.total', 's.0'] },
        { say: 'Watch the slide. The child reaches the bottom at five metres per second.', show: 'slide.velocity', play: 'slide.go' },
        { say: 'At the bottom, the kinetic energy is one half, times thirty, times five squared: 375 joules. That is much less than 882.9.', show: 's.1' },
        { say: 'The difference is the energy that friction has changed into thermal energy: 882.9 minus 375, which is 508 joules.', show: ['s.2', 's.3'] },
      ],
    },
    {
      chapter: 'The speed at the bottom',
      layout: 'split',
      leftWidth: 620,
      left: [ski],
      right: [{ kind: 'math', id: 'k', size: 'md', lines: ['E_g = mgh = \\hyp{23\\,544\\ \\text{J}}', 'E_k = 23\\,544 - 6000', 'E_k = \\good{17\\,544\\ \\text{J}}', 'v = \\sqrt{\\dfrac{2 \\times 17\\,544}{60}}', 'v = \\good{24.2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'You can work the other way. A skier of sixty kilograms starts from rest and descends through forty metres. Friction and air resistance change 6,000 joules into thermal energy. How fast is the skier at the bottom?', show: ['ski', 'ski.energy', 'ski.total', 'ski.velocity'] },
        { say: 'At the top, the potential energy is sixty, times 9.81, times forty: 23,544 joules.', show: 'k.0', play: 'ski.go' },
        { say: 'Take away the 6,000 joules that are lost. That leaves 17,544 joules of kinetic energy at the bottom.', show: ['k.1', 'k.2'] },
        { say: 'So the speed is the square root of two times 17,544, over sixty: 24.2 metres per second.', show: ['k.3', 'k.4'] },
      ],
    },
    {
      chapter: 'The force of friction',
      layout: 'split',
      leftWidth: 640,
      left: [crate],
      right: [{ kind: 'math', id: 'f', size: 'md', lines: ['E_g = mgh = \\hyp{784.8\\ \\text{J}}', 'E_k = \\tfrac{1}{2}mv^2 = \\good{360\\ \\text{J}}', 'E_{\\text{lost}} = \\bad{424.8\\ \\text{J}}', 'F_f = \\dfrac{424.8}{10} = \\bad{42.5\\ \\text{N}}'] }],
      lines: [
        { say: 'The energy lost is the work done by friction, and work is force times distance. So the energy lost can tell you the force of friction.', show: ['crate', 'crate.weight', 'crate.friction', 'crate.work'] },
        { say: 'A crate of twenty kilograms slides ten metres down a ramp, dropping through four metres, and reaches the bottom at six metres per second. Watch the work done by each force.', show: ['crate.velocity', 'crate.distance'], play: 'crate.go', playDelay: 8 },
        { say: 'Gravity gave the crate twenty, times 9.81, times four: 784.8 joules. But its kinetic energy at the bottom is only one half, times twenty, times six squared: 360 joules.', show: ['f.0', 'f.1'] },
        { say: 'So 424.8 joules were lost to friction. Friction acted along the ten metres of the ramp, so its average force is 424.8 over ten: 42.5 newtons.', show: ['f.2', 'f.3'] },
        { say: 'Notice which distance goes where. The height, four metres, goes into m g h. The distance along the ramp, ten metres, goes with the force of friction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 2 kg block slides from rest down a rough slope, dropping through a height of 5 m, and reaches the bottom at 8 m/s. Use $g = 9.81\\ \\text{m/s}^2$. How much mechanical energy is changed into thermal energy?',
          choices: ['$34.1\\ \\text{J}$', '$64\\ \\text{J}$', '$98.1\\ \\text{J}$', '$162.1\\ \\text{J}$'],
          answer: 0,
          working: 'At the top, $E_g = 2 \\times 9.81 \\times 5 = 98.1\\ \\text{J}$. At the bottom, $E_k = \\tfrac{1}{2} \\times 2 \\times 8^2 = 64\\ \\text{J}$. The energy lost is $98.1 - 64 = 34.1\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two kilogram block slides from rest down a rough slope, dropping through a height of five metres, and reaches the bottom at eight metres per second. How much mechanical energy is changed into thermal energy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'At the top, the potential energy is two, times 9.81, times five: 98.1 joules. At the bottom, the kinetic energy is one half, times two, times eight squared: 64 joules. The difference is 34.1 joules. That is choice A.', show: 'q.answer' },
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
            'Friction changes mechanical energy into **thermal energy**',
            '$E_m$ at the start $=$ $E_m$ at the end $+$ the energy lost',
            'The energy lost is the work done by friction: friction force $\\times$ the distance slid',
            'Mechanical energy can decrease, but total energy is **always conserved**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Friction changes mechanical energy into thermal energy.', show: 'sum.0' },
        { say: 'The mechanical energy at the start equals the mechanical energy at the end, plus the energy lost.', show: 'sum.1' },
        { say: 'The energy lost is the work done by friction: the friction force, times the distance slid.', show: 'sum.2' },
        { say: 'And mechanical energy can decrease, but total energy is always conserved.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
