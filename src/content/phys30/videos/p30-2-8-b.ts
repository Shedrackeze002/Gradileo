import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.8, second half: charges moving in circles. Each particle is turned step by step by the
// magnetic force qvB (src/video/charges.ts), so it goes round a circle of radius mv ÷ qB at a
// steady speed, a faster proton follows a larger circle in the same time, and the two kinds of
// neon ion in the mass spectrometer land a little apart.

const CM = { metres: 0.01, symbol: 'cm' };
const PROTON = 1.67e-27;
/** One period of a proton in 0.50 T: 2πm ÷ qB, about 1.31 × 10⁻⁷ s. */
const PERIOD = (2 * Math.PI * PROTON) / (1.6e-19 * 0.5);
/** The radius of a proton's circle at 3.0 × 10⁶ m/s in 0.50 T: 6.26 cm. */
const RADIUS = (PROTON * 3.0e6) / (1.6e-19 * 0.5);

/** A proton that goes round and round in a field of 0.50 T into the page. */
const ring: ChargesEl = {
  kind: 'charges',
  id: 'ring',
  view: [-0.2466, 0.2466, -0.0825, 0.0825],
  height: 380,
  unit: 'e',
  length: CM,
  magnetic: { tesla: -0.5 },
  plain: true,
  forceScale: 60 / 2.4e-13,
  velocityScale: 60 / 3.0e6,
  speedFigures: 2,
  rate: PERIOD / 6,
  bodies: [{ id: 'p', charge: 1, x: 0, y: -RADIUS, mass: PROTON, v: [3.0e6, 0] }],
  poster: 'go',
  thumb: ['magnetic', 'velocity', 'force', 'trail'],
  clips: { go: { phases: [{ dur: 6, fly: true }] }, on: { phases: [{ dur: 6, fly: true }] } },
};

/**
 * Two protons in the same field, one twice as fast as the other: the faster one follows a circle
 * twice as large, and both take the same time to go round. Then the field is doubled, and both
 * circles shrink to half the size.
 */
const two = (height: number): ChargesEl => ({
  kind: 'charges',
  id: 'two',
  view: [-0.2466, 0.2466, -0.0825, 0.0825],
  height,
  unit: 'e',
  length: CM,
  magnetic: { tesla: -0.5 },
  velocityScale: 60 / 3.0e6,
  speedFigures: 2,
  rate: PERIOD / 6,
  bodies: [
    { id: 'fast', charge: 1, x: -0.11, y: -RADIUS, mass: PROTON, v: [3.0e6, 0] },
    { id: 'slow', charge: 1, x: 0.11, y: -RADIUS, mass: PROTON, v: [1.5e6, 0] },
  ],
  clips: {
    go: { phases: [{ dur: 6, fly: true }] },
    again: { phases: [{ dur: 6, fly: true }] },
    strong: { phases: [{ dur: 1.5, tesla: -1 }, { dur: 3, fly: true }] },
  },
});

/**
 * A mass spectrometer: ions of neon-20 and neon-22, each with one elementary charge, enter a field
 * of 0.40 T (out of the page) at 3.0 × 10⁵ m/s and follow semicircles of radius 15.6 cm and
 * 17.1 cm to the detector along the bottom of the field.
 */
const spectrometer: ChargesEl = {
  kind: 'charges',
  id: 'spec',
  view: [-0.37, 0.387, -0.07, 0.21],
  height: 420,
  unit: 'e',
  length: CM,
  figures: 3,
  pulls: ['a'],
  rate: 3.2e-7,
  magnetic: { tesla: 0.4, region: [-0.22, 0.25, 0, 0.205], screen: 'bottom' },
  // The lighter ion is on the inside of the bend all the way round, so its name is on its left and the name of the heavier one on its right.
  bodies: [
    { id: 'a', charge: 1, x: -0.17, y: -0.008, mass: 3.32e-26, radius: 0.006, label: 'Neon-20', labelAt: 'left' },
    { id: 'b', charge: 1, x: -0.17, y: -0.036, mass: 3.65e-26, radius: 0.006, label: 'Neon-22', labelAt: 'right' },
  ],
  clips: { go: { phases: [{ dur: 6.4, fly: true, launch: { a: [0, 3.0e5], b: [0, 3.0e5] } }] } },
};

const video: Explainer = {
  id: 'p30-2-8-b',
  lessonId: 'p30-2-8',
  title: 'Charges Moving in Circles',
  thumbnailTitle: 'Charges in Circles',
  thumbnail: 'ring',
  summary:
    'A magnetic force is always at right angles to the velocity, so a charge that crosses a uniform magnetic field goes round a circle. Set qvB equal to mv² ÷ r to get the radius, r = mv ÷ qB, see why the time for one circle does not depend on the speed, and use the circles to weigh atoms in a mass spectrometer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Charges Moving in Circles', subtitle: 'The magnetic force as a centripetal force' }],
      lines: [
        { say: 'A magnetic force never speeds a charge up, and never slows it down. It only turns it.', show: 'title' },
        { say: 'So what path does a charge follow, when the force on it keeps turning it, at the same rate, for ever?' },
      ],
    },
    {
      chapter: 'A circle',
      layout: 'center',
      main: [ring, { kind: 'math', id: 'm', size: 'md', lines: ['qvB = \\dfrac{mv^2}{r} \\qquad \\text{so} \\qquad r = \\thc{\\dfrac{mv}{qB}}'] }],
      lines: [
        { say: 'Send a proton across a uniform magnetic field. The force on it has a constant size, and is always at right angles to its velocity. That is exactly what circular motion needs.', show: ['ring', 'ring.magnetic', 'ring.velocity', 'ring.force', 'ring.trail'], play: 'ring.go', playDelay: 1.5 },
        { say: 'So the proton goes round a circle, at a steady speed. The magnetic force points to the centre all the way round. It is the centripetal force.', show: 'ring.radius', play: 'ring.on' },
        { say: 'Set the magnetic force equal to the centripetal force. q v B equals m v squared over r. One v cancels, and the radius is m v over q B.', show: 'm' },
        { say: 'This proton moves at 3.0 times ten to the six metres per second, in a field of 0.50 teslas. Its circle has a radius of 6.3 centimetres.', focus: 'ring.p' },
      ],
    },
    {
      chapter: 'What sets the radius?',
      layout: 'center',
      main: [
        two(380),
        { kind: 'math', id: 'r', size: 'md', lines: ['r = \\dfrac{mv}{qB} = \\dfrac{1.67 \\times 10^{-27} \\times 3.0 \\times 10^{6}}{1.60 \\times 10^{-19} \\times 0.50} = \\thc{0.063\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Here are two protons in the same field. The one on the left moves twice as fast as the one on the right.', show: ['two', 'two.magnetic', 'two.velocity'] },
        { say: 'The radius is m v over q B, so twice the speed gives a circle twice as large. A heavier particle would follow a larger circle too.', show: ['two.trail', 'two.radius'], play: 'two.go' },
        { say: 'For the faster proton, the mass times the speed, divided by the charge times the field, is 0.063 metres.', show: 'r' },
        { say: 'Now make the field twice as strong. Both circles shrink to half the size. A stronger field, or a larger charge, gives a tighter circle.', hide: 'r', play: 'two.strong', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'The time for one circle',
      layout: 'center',
      main: [
        two(330),
        {
          kind: 'math',
          id: 't',
          size: 'md',
          lines: ['T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi m}{qB}', 'T = \\dfrac{2\\pi \\times 1.67 \\times 10^{-27}}{1.60 \\times 10^{-19} \\times 0.50} = \\thc{1.31 \\times 10^{-7}\\ \\text{s}}'],
        },
      ],
      lines: [
        { say: 'Watch the two protons again, and see when each one gets back to its start.', show: ['two', 'two.magnetic', 'two.velocity', 'two.trail'], play: 'two.go', playDelay: 1.5 },
        { say: 'They finish together. The time for one circle is the distance round, two pi r, divided by the speed. Put in r equals m v over q B, and the speed cancels. The period is two pi m over q B.', caption: 'They finish together. The time for one circle is the distance round, 2πr, divided by the speed. Put in r = mv ÷ qB, and the speed cancels. The period is 2πm ÷ qB.', show: 't.0' },
        { say: 'A faster particle has further to go, but it takes the same time. For a proton in this field, one circle takes 1.31 times ten to the negative seven seconds. That is nearly eight million circles each second.', show: 't.1', play: 'two.again' },
      ],
    },
    {
      chapter: 'The mass spectrometer',
      layout: 'center',
      main: [
        spectrometer,
        { kind: 'math', id: 'k', size: 'md', lines: ['m = \\dfrac{qBr}{v} = \\dfrac{1.60 \\times 10^{-19} \\times 0.40 \\times 0.156}{3.0 \\times 10^{5}} = \\thc{3.33 \\times 10^{-26}\\ \\text{kg}}'] },
      ],
      lines: [
        { say: 'A mass spectrometer uses these circles to measure the masses of atoms. The atoms are ionized, so that each has a charge, and a velocity selector lets through only one speed.', show: ['spec', 'spec.magnetic'] },
        { say: 'The ions enter a magnetic field, and each follows a semicircle to a detector. Here are two kinds of neon ion, with the same charge and the same speed.', show: ['spec.trail', 'spec.radius'], play: 'spec.go', playDelay: 3 },
        { say: 'The heavier ion follows the larger circle, and lands further along. The two kinds of neon have been sorted by mass.', focus: 'spec.b' },
        { say: 'Measure the radius, and the mass follows. m equals q B r over v. The first ion had a radius of 0.156 metres, which gives 3.33 times ten to the negative twenty-six kilograms. That is 20 atomic mass units: neon-20.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A proton ($m = 1.67 \\times 10^{-27}$ kg, $q = 1.60 \\times 10^{-19}$ C) moves at $2.0 \\times 10^{6}$ m/s at right angles to a magnetic field of 0.25 T. What is the radius of its path?',
          choices: ['1.2 cm', '2.1 cm', '8.4 cm', '33 cm'],
          answer: 2,
          working: '$r = \\dfrac{mv}{qB} = \\dfrac{1.67 \\times 10^{-27} \\times 2.0 \\times 10^{6}}{1.60 \\times 10^{-19} \\times 0.25} = 0.084$ m, which is 8.4 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A proton moves at 2.0 times ten to the six metres per second, at right angles to a magnetic field of 0.25 teslas. What is the radius of its path? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The radius is m v over q B. The mass times the speed is 3.34 times ten to the negative twenty-one. The charge times the field is 4.0 times ten to the negative twenty. Divide, and the radius is 0.084 metres, or 8.4 centimetres. That is choice C.', show: 'q.answer' },
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
            'A charge that crosses a uniform magnetic field goes round a **circle**, at a steady speed',
            'The magnetic force is the centripetal force: $qvB = \\dfrac{mv^2}{r}$',
            'The radius is $r = \\dfrac{mv}{qB}$',
            'The period, $T = \\dfrac{2\\pi m}{qB}$, does **not** depend on the speed',
            'A mass spectrometer sorts ions by mass: $m = \\dfrac{qBr}{v}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A charge that crosses a uniform magnetic field goes round a circle, at a steady speed.', show: 'sum.0' },
        { say: 'The magnetic force is the centripetal force.', show: 'sum.1' },
        { say: 'The radius is m v over q B: larger for a faster or heavier particle, and smaller in a stronger field.', show: 'sum.2' },
        { say: 'The period is two pi m over q B. It does not depend on the speed.', caption: 'The period is 2πm ÷ qB. It does not depend on the speed.', show: 'sum.3' },
        { say: 'And a mass spectrometer uses the radius to sort ions by their mass.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
