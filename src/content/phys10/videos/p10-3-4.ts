import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.4: conservation of energy. Every motion here is worked out from gravity alone
// (src/video/motion.ts and src/video/path.ts), and the energy bars are measured from it: a falling
// ball, a pendulum, a model roller coaster, and the same car on a rough track, where the missing
// energy turns up as heat.

const G = 9.8;

// A 2 kg ball let go 2.5 m up: it lands after 5/7 of a second at 7 m/s, and is half way down
// (1.25 m) after √(2.5 ÷ 9.8) seconds.
const FALL = 5 / 7;
const HALF = Math.sqrt(2.5 / G);
const weight: MotionForce = { on: 'ball', name: 'Weight', n: 2 * G, tone: 'hyp' };
// Near the ground there is no room for the weight's arrow, so it acts there without being drawn.
const fall = (dur: number, hidden = false) => ({ dur, slow: 4, forces: [{ ...weight, hidden }], note: 'Slow motion' });

const ball: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 2.5],
  height: 420,
  bodies: [{ id: 'ball', shape: 'ball', mass: 2, x: 0, width: 0.45, tone: 'adj' }],
  energy: { max: 60, bars: ['potential', 'kinetic', 'total'], g: G },
  forceScale: 2.5,
  velocityScale: 9,
  poster: 'half',
  clips: {
    hold: { phases: [{ dur: 1, freeze: true, forces: [weight] }] },
    half: { phases: [fall(HALF)] },
    land: { phases: [fall(FALL - HALF, true)] },
    again: { reset: true, phases: [fall(FALL, true)] },
  },
};

// A 1 kg bob on a 2 m string, let go 60 degrees from the vertical: 1 m above the bottom of its
// swing, so 9.8 J. It reaches the bottom after 0.7615 s, and each end of its swing 1.5231 s apart.
const QUARTER = 0.76154;
const pendulum: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-3, 3],
  height: 470,
  path: { g: G, swing: { length: 2, angle: 60 } },
  bodies: [{ id: 'bob', shape: 'ball', mass: 1, x: (-2 * Math.PI) / 3, width: 0.5, tone: 'adj' }],
  energy: { max: 12, bars: ['potential', 'kinetic', 'total'] },
  velocityScale: 14,
  poster: 'down',
  clips: {
    down: { phases: [{ dur: QUARTER, slow: 2, note: 'Slow motion' }] },
    swing: { phases: [{ dur: QUARTER * 9 }] },
  },
};

// A 10 kg car on a model roller coaster: 5 m up at the start (490 J), over a second hill 2 m high
// (196 J of potential energy, so 294 J of kinetic energy), and up a last hill as high as the first.
// It passes the second hilltop after 1.8553 s, and comes to rest for an instant at the far end
// after 3.7105 s.
const coaster: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 18],
  height: 520,
  path: { g: G, points: [[0, 5], [5, 0], [9, 2], [13, 0], [18, 5]] },
  bodies: [{ id: 'car', shape: 'cart', mass: 10, x: 0, width: 1.6, label: '10 kg', tone: 'adj' }],
  energy: { max: 560, bars: ['potential', 'kinetic', 'total'] },
  velocityScale: 7,
  poster: 'hill',
  clips: {
    hill: { phases: [{ dur: 1.8553, slow: 2.5, note: 'Slow motion' }] },
    climb: { phases: [{ dur: 3.7105 - 1.8553, slow: 2.5, note: 'Slow motion' }] },
  },
};

// The same car let go 3 m up one side of a rough dip (294 J), with 12 N of friction along the
// track: each swing is lower than the last, and it stops at the bottom after about 11 seconds.
const rough: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 520,
  path: { g: G, points: [[0, 3], [6, 0], [12, 3]] },
  bodies: [{ id: 'car', shape: 'cart', mass: 10, x: 0, width: 1.2, label: '10 kg', tone: 'adj' }],
  energy: { max: 340, bars: ['potential', 'kinetic', 'heat', 'total'] },
  velocityScale: 9,
  poster: 'go',
  clips: {
    go: { phases: [{ dur: 11.5, forces: [{ on: 'car', name: 'Friction', n: -12, resist: true, tone: 'bad' }] }] },
  },
};

const video: Explainer = {
  id: 'p10-3-4',
  lessonId: 'p10-3-4',
  title: 'Conservation of Energy',
  thumbnail: 'sim',
  summary:
    'Energy is never created or destroyed: it only moves from one store to another. Watch the energy bars of a falling ball, a pendulum and a roller coaster as height turns into speed and back, and see where the energy goes when friction brings a car to rest.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Conservation of Energy', subtitle: 'Where energy goes, and why it never runs out' }],
      lines: [
        { say: 'A roller coaster is pulled to the top of its first hill, and then let go. From there, no engine drives it. Yet it races down, and climbs the next hill.', show: 'title' },
        { say: 'It runs on energy that is passed back and forth between height and motion. The rule behind it is one of the most important in all of science.' },
      ],
    },
    {
      chapter: 'A falling ball',
      layout: 'center',
      main: [
        ball,
        {
          kind: 'math',
          id: 'e',
          size: 'md',
          lines: ['\\hyp{mgh} = 2 \\times 9.8 \\times 2.5 = \\hyp{49\\ \\text{J}} \\qquad \\good{\\tfrac12 mv^2} = 49 \\;\\Rightarrow\\; v = \\good{7\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'Start with something simple. A two kilogram ball is held two and a half metres above the ground.', show: 'sim', play: 'sim.hold', playDelay: 2.5 },
        {
          say: 'On Earth, g is nine point eight newtons per kilogram. So its gravitational potential energy, m g h, is two, times nine point eight, times two point five. That is forty-nine joules. The ball is not moving, so it has no kinetic energy yet.',
          show: 'sim.energy',
        },
        { say: 'Now let it go, in slow motion, and stop it half way down.', show: 'sim.velocity', play: 'sim.half', playDelay: 1.8 },
        { say: 'The ball has lost half of its height, so its potential energy has fallen to twenty-four and a half joules. The other half has not vanished. It is now kinetic energy, the energy of motion.', focus: 'sim.ball' },
        { say: 'Let it fall the rest of the way.', play: 'sim.land', playDelay: 0.6 },
        { say: 'Just before it lands, the height is zero, so all forty-nine joules are kinetic energy. Half m v squared equals forty-nine, so v squared is forty-nine, and the speed is seven metres per second.', show: 'e' },
        { say: 'Watch the fall once more, with the total drawn. The two bars change all the way down, but together they always make forty-nine joules.', show: 'sim.total', play: 'sim.again', playDelay: 3.5 },
      ],
    },
    {
      chapter: 'A pendulum',
      layout: 'center',
      main: [pendulum, { kind: 'text', id: 'law', size: 'md', md: '**Conservation of energy**: energy is never created or destroyed. It only moves between stores.' }],
      lines: [
        { say: 'A pendulum passes energy back and forth again and again. This one kilogram bob is held one metre above the lowest point of its swing, so it starts with nine point eight joules of potential energy.', show: ['sim', 'sim.height', 'sim.energy', 'sim.total'] },
        { say: 'Let it go, and stop it at the bottom.', show: 'sim.velocity', play: 'sim.down', playDelay: 1.2 },
        { say: 'At the bottom it is at its lowest and its fastest. All nine point eight joules are kinetic energy now.', focus: 'sim.bob' },
        { say: 'Now let it swing. At each end it stops for an instant, and all of its energy is potential. At the bottom, all of it is kinetic. And the total never changes.', play: 'sim.swing', playDelay: 0.5 },
        { say: 'This is the law of conservation of energy. Energy is never created, and never destroyed. It only moves from one store to another.', show: 'law' },
      ],
    },
    {
      chapter: 'A roller coaster',
      layout: 'center',
      main: [coaster, { kind: 'math', id: 'share', size: 'md', lines: ['\\good{\\text{kinetic}} = \\thc{\\text{total}} - \\hyp{\\text{potential}} = 490 - 196 = \\good{294\\ \\text{J}}'] }],
      lines: [
        { say: 'Back to the roller coaster. This model car has a mass of ten kilograms, and it starts at rest, five metres up. Ten, times nine point eight, times five, gives it four hundred and ninety joules of potential energy.', show: ['sim', 'sim.height', 'sim.energy', 'sim.total'] },
        { say: 'There is no engine, and we will ignore friction. Let it go, and stop it at the top of the second hill.', show: 'sim.velocity', play: 'sim.hill', playDelay: 3 },
        { say: 'This hill is two metres high, so the car has one hundred and ninety-six joules of potential energy here. The total is still four hundred and ninety, so the rest must be kinetic energy. Four hundred and ninety, take away one hundred and ninety-six, is two hundred and ninety-four joules.', show: 'share' },
        { say: 'Now let it run on. In the next dip, every joule is kinetic again. So how high can the car climb on the last hill?', play: 'sim.climb', playDelay: 1 },
        { say: 'It stops exactly five metres up, as high as it started and no higher. It has no energy left to climb any further.', focus: 'sim.car' },
      ],
    },
    {
      chapter: 'Where does the energy go?',
      layout: 'center',
      main: [rough, { kind: 'text', id: 'used', size: 'md', md: 'Energy is **never used up**. Friction moves it to **heat** in the surroundings.' }],
      lines: [
        { say: 'Real tracks are not perfectly smooth. Here is the same car, three metres up one side of a dip, with two hundred and ninety-four joules. This time, friction acts along the track.', show: ['sim', 'sim.height', 'sim.energy', 'sim.total', 'sim.velocity'] },
        { say: 'Let it go. Each time, it climbs a little less high than before. Its kinetic and potential energy are draining away, and a new bar is growing: heat.', play: 'sim.go', playDelay: 0.8 },
        { say: 'Friction warms the wheels, the track and the air around them. And look at the total. It has not changed at all.' },
        { say: 'The car has stopped, but its energy has not been destroyed. All two hundred and ninety-four joules are now heat, spread into the surroundings.', focus: 'sim.car' },
        { say: 'So energy is never used up. It ends up as heat, where it is hard to use again.', show: 'used' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On Earth, g = 9.8 N/kg. A 4 kg ball is dropped from rest, 10 m above the ground. Ignore air resistance. How much kinetic energy does it have just before it lands?',
          choices: ['40 J', '98 J', '392 J', '3920 J'],
          answer: 2,
          working: 'All of its potential energy becomes kinetic energy: $mgh = 4 \\times 9.8 \\times 10 = 392\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On Earth, g is nine point eight newtons per kilogram. A four kilogram ball is dropped from rest, ten metres above the ground. Ignore air resistance. How much kinetic energy does it have just before it lands? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'All of its potential energy becomes kinetic energy. So find m g h. Four, times nine point eight, times ten, is three hundred and ninety-two joules. That is choice C.', show: 'q.answer' },
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
            'Energy is never created or destroyed: it only moves between stores',
            'Falling: potential energy becomes kinetic energy. Rising: the reverse',
            'With no friction, kinetic + potential energy stays the same',
            'Friction and air resistance move energy to heat',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Energy is never created or destroyed. It only moves from one store to another.', show: 'end.0' },
        { say: 'As something falls, potential energy becomes kinetic energy. As it rises, the reverse happens.', show: 'end.1' },
        { say: 'With no friction, the kinetic and potential energy always add up to the same total.', show: 'end.2' },
        { say: 'And friction and air resistance do not destroy energy. They move it to heat.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
