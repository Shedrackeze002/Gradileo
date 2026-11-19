import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.8, first half: the magnetic force on a moving charge. Each particle is turned step by
// step by the force qvB on it (src/video/charges.ts), which is always at right angles to its
// velocity, so its path curves and its speed never changes. Between the plates of the velocity
// selector the electric force qE is added, and only an ion at the speed E ÷ B goes straight.

const CM = { metres: 0.01, symbol: 'cm' };
const PROTON = 1.67e-27;
/** One period of a proton in 0.50 T: 2πm ÷ qB, about 1.31 × 10⁻⁷ s. */
const PERIOD = (2 * Math.PI * PROTON) / (1.6e-19 * 0.5);

/** A proton at rest in a field of 0.50 T into the page; then sent across it at 3.0 × 10⁶ m/s, an eighth of a circle and then 75° more. */
const push: ChargesEl = {
  kind: 'charges',
  id: 'push',
  view: [-0.27, 0.27, -0.06, 0.12],
  height: 380,
  unit: 'e',
  length: CM,
  magnetic: { tesla: -0.5 },
  forceFigures: 2,
  forceScale: 80 / 2.4e-13,
  velocityScale: 70 / 3.0e6,
  speedFigures: 2,
  bodies: [{ id: 'p', charge: 1, x: -0.05, y: -0.035, mass: PROTON, label: 'Proton', labelAt: 'left' }],
  clips: {
    go: { phases: [{ dur: 2.4, fly: true, launch: { p: [3.0e6, 0] }, rate: PERIOD / 8 / 2.4 }] },
    on: { phases: [{ dur: 4, fly: true, rate: (PERIOD * 75) / 360 / 4 }] },
  },
};

/** A positive and a negative particle of the same mass, sent the same way into the same field: they curve opposite ways. */
const way: ChargesEl = {
  kind: 'charges',
  id: 'way',
  view: [-0.22, 0.22, -0.085, 0.085],
  height: 440,
  unit: 'e',
  magnetic: { tesla: -0.5 },
  plain: true,
  forceScale: 80 / 2.4e-13,
  velocityScale: 70 / 3.0e6,
  bodies: [
    { id: 'pos', charge: 1, x: -0.12, y: 0.014, mass: PROTON, labelAt: 'left' },
    { id: 'neg', charge: -1, x: -0.12, y: -0.014, mass: PROTON, labelAt: 'left' },
  ],
  poster: 'go',
  thumb: ['magnetic', 'charge', 'velocity', 'force', 'trail'],
  // A sixth of a circle each.
  clips: { go: { phases: [{ dur: 3, fly: true, launch: { pos: [3.0e6, 0], neg: [3.0e6, 0] }, rate: PERIOD / 6 / 3 }] } },
};

/**
 * A velocity selector: 6.0 × 10⁴ N/C down the screen between level plates (6000 V across 10 cm),
 * and 0.20 T into the page. An ion at 2.0 × 10⁵ m/s is pulled down into the plate, one at
 * 4.0 × 10⁵ m/s is pushed up, and one at 3.0 × 10⁵ m/s goes straight through.
 */
const selector: ChargesEl = {
  kind: 'charges',
  id: 'sel',
  view: [-0.23, 0.23, -0.079, 0.079],
  height: 390,
  unit: 'e',
  rate: 4.2e-7,
  names: true,
  forceScale: 48 / 9.6e-15,
  velocityScale: 60 / 3.0e5,
  plates: { at: [0.05, -0.05], across: 'y', span: [-0.15, 0.15], volts: 6000, lines: 6 },
  magnetic: { tesla: -0.2, region: [-0.15, 0.15, -0.05, 0.05] },
  bodies: [{ id: 'ion', charge: 1, x: -0.2, y: 0, mass: 3.33e-26 }],
  clips: {
    slow: { reset: true, phases: [{ dur: 3.2, fly: true, launch: { ion: [2.0e5, 0] } }] },
    fast: { reset: true, phases: [{ dur: 2.35, fly: true, launch: { ion: [4.0e5, 0] } }] },
    right: { reset: true, phases: [{ dur: 3.15, fly: true, launch: { ion: [3.0e5, 0] } }] },
  },
};

const video: Explainer = {
  id: 'p30-2-8',
  lessonId: 'p30-2-8',
  title: 'The Force on a Moving Charge',
  thumbnailTitle: 'Magnetic Force',
  thumbnail: 'way',
  summary:
    'A magnetic field pushes on a charge only when the charge moves across it: F = qvB, at right angles to the velocity and to the field. Use the right-hand rule for the direction, see why a magnetic force changes the direction of a charge but never its speed, and balance it against an electric force in a velocity selector, where v = E ÷ B.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Force on a Moving Charge', subtitle: 'A push that is always sideways' }],
      lines: [
        { say: 'Hold a magnet near the screen of an old television, and the picture is pulled out of shape. The picture was painted by a beam of electrons, and the magnet pushed the beam sideways.', show: 'title' },
        { say: 'A magnetic field pushes on a moving charge in a way that no other force does. The push is always at right angles to the motion.' },
      ],
    },
    {
      chapter: 'Only a moving charge',
      layout: 'center',
      main: [
        push,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['F = qvB', 'F = 1.60 \\times 10^{-19} \\times 3.0 \\times 10^{6} \\times 0.50 = \\opp{2.4 \\times 10^{-13}\\ \\text{N}}', 'F = qvB\\sin\\theta'],
        },
      ],
      lines: [
        { say: 'Here is a magnetic field of 0.50 teslas. The crosses mean that it points into the page, away from you. A field that comes out of the page is drawn with dots.', show: ['push', 'push.magnetic'] },
        { say: 'A proton sits in the field, at rest. It feels no magnetic force at all.', show: 'push.charge', focus: 'push.p' },
        { say: 'Now send it across the field. A force appears, at right angles to its velocity, and pushes the proton off its straight path.', show: ['push.velocity', 'push.force', 'push.trail'], play: 'push.go', playDelay: 2 },
        { say: 'The size of the force is the charge, times the speed, times the field strength. F equals q v B.', show: 'm.0' },
        { say: 'For this proton, that is 1.60 times ten to the negative nineteen coulombs, times 3.0 times ten to the six metres per second, times 0.50 teslas. The force is 2.4 times ten to the negative thirteen newtons.', show: 'm.1' },
        { say: 'Watch the speed as the proton turns. It does not change. The force is always at right angles to the motion, so it does no work. It changes the direction of a charge, and never its speed.', play: 'push.on', playDelay: 1.5 },
        { say: 'If the charge moves at an angle to the field, only the part of its velocity across the field counts, and the force is q v B sine theta. A charge that moves along the field feels no force.', caption: 'If the charge moves at an angle to the field, only the part of its velocity across the field counts, and the force is qvB sin θ. A charge that moves along the field feels no force.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Which way?',
      layout: 'center',
      main: [way, { kind: 'text', id: 'rule', md: 'Flat right hand: **thumb** along the velocity, **fingers** along the field. The **palm** pushes a positive charge. Reverse it for a negative charge.' }],
      lines: [
        { say: 'Which way is the force? It is at right angles to the velocity, and to the field. A second rule for the right hand gives the direction.', show: ['way', 'way.magnetic', 'way.charge'] },
        { say: 'Hold your right hand flat. Point the thumb along the velocity, and the fingers along the magnetic field. The palm pushes in the direction of the force on a positive charge.', show: 'rule' },
        { say: 'Send a positive particle and a negative particle into the same field. For the positive one, the thumb points right, and the fingers point into the page. The palm faces up the screen, so it curves upward.', show: ['way.velocity', 'way.force', 'way.trail'], play: 'way.go', playDelay: 5 },
        { say: 'The negative particle curves the other way. For an electron, or any negative charge, find the direction with the right hand, and then reverse it.', focus: 'way.neg' },
      ],
    },
    {
      chapter: 'The velocity selector',
      layout: 'center',
      main: [
        selector,
        { kind: 'math', id: 'v', size: 'md', lines: ['qE = qvB', 'v = \\dfrac{E}{B} = \\dfrac{6.0 \\times 10^{4}}{0.20} = \\thc{3.0 \\times 10^{5}\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'Now put an electric field and a magnetic field in the same space, at right angles to each other. Between these plates the electric field points down the screen, and the magnetic field points into the page.', show: ['sel', 'sel.lines', 'sel.magnetic'] },
        { say: 'Send in a positive ion. The electric force pulls it down. The magnetic force pushes it up, and that force grows with the speed. A slow ion is pulled down, into the plate.', show: ['sel.force', 'sel.velocity', 'sel.trail'], play: 'sel.slow', playDelay: 6.5 },
        { say: 'A fast ion is pushed up instead, and leaves off the centre line.', play: 'sel.fast', playDelay: 0.5 },
        { say: 'At one speed the two forces balance, and the ion goes straight through. q E equals q v B.', show: 'v.0', play: 'sel.right', playDelay: 0.5 },
        { say: 'The charge cancels, so the speed is E divided by B. Here that is 6.0 times ten to the four, divided by 0.20: 3.0 times ten to the five metres per second. The device lets one speed through, so it is called a velocity selector.', show: 'v.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An electron (charge $1.60 \\times 10^{-19}$ C) moves at $5.0 \\times 10^{6}$ m/s at right angles to a magnetic field of 0.20 T. What is the size of the magnetic force on it?',
          choices: ['$6.4 \\times 10^{-27}$ N', '$1.6 \\times 10^{-13}$ N', '$4.0 \\times 10^{-12}$ N', '$1.0 \\times 10^{6}$ N'],
          answer: 1,
          working: '$F = qvB = 1.60 \\times 10^{-19} \\times 5.0 \\times 10^{6} \\times 0.20 = 1.6 \\times 10^{-13}$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. An electron moves at 5.0 times ten to the six metres per second, at right angles to a magnetic field of 0.20 teslas. What is the size of the magnetic force on it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Multiply the charge, the speed and the field. 1.60 times ten to the negative nineteen, times 5.0 times ten to the six, times 0.20, is 1.6 times ten to the negative thirteen newtons. That is choice B.', show: 'q.answer' },
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
            'A magnetic field pushes only a charge that **moves across** it: $F = qvB$',
            'The force is at right angles to the velocity and to the field',
            'Right hand: **thumb** velocity, **fingers** field, **palm** force on a positive charge',
            'A magnetic force changes the **direction** of a charge, never its speed',
            'Velocity selector: $qE = qvB$, so $v = \\dfrac{E}{B}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A magnetic field pushes only on a charge that moves across it, with the force q v B.', show: 'sum.0' },
        { say: 'The force is at right angles to the velocity, and to the field.', show: 'sum.1' },
        { say: 'For the direction, use a flat right hand. The thumb is the velocity, the fingers are the field, and the palm pushes a positive charge.', show: 'sum.2' },
        { say: 'A magnetic force changes the direction of a charge, and never its speed.', show: 'sum.3' },
        { say: 'And in a velocity selector the electric and magnetic forces balance, so the speed is E divided by B.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
