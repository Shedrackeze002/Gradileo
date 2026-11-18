import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.5, second half: Millikan's oil drops. A drop between level plates is moved step by
// step by its weight and by the electric force qΔV ÷ d on it (src/video/charges.ts), so it falls
// when the voltage is too low, rises when it is too high, and hangs at rest at 1600 V, the
// lesson's value for a drop of 6.53 × 10⁻¹⁵ kg that carries five extra electrons.

const CM = { metres: 0.01, symbol: 'cm' };
const DROP = 6.53e-15;
// The weight of the drop is 55 pixels long.
const FORCES = 55 / (DROP * 9.81);

/** One oil drop with five extra electrons between level plates 2.0 cm apart: 1200 V lets it fall, and 2000 V lifts it. */
const chamber: ChargesEl = {
  kind: 'charges',
  id: 'oil',
  view: [-0.035, 0.035, -0.0129, 0.0129],
  height: 420,
  unit: 'e',
  g: 9.81,
  rate: 0.028,
  names: true,
  forceScale: FORCES,
  plates: { at: [0.01, -0.01], across: 'y', span: [-0.02, 0.02], volts: 1200, lines: 7 },
  bodies: [{ id: 'drop', charge: -5, x: 0, y: 0.005, mass: DROP }],
  thumb: ['lines', 'force', 'potential'],
  clips: {
    fall: { phases: [{ dur: 1.5, fly: true }] },
    // The voltage is turned up while the drop is still falling: it slows, stops and then rises.
    rise: { phases: [{ dur: 1, volts: 2000, fly: true }, { dur: 4, fly: true }] },
  },
};

/**
 * The same drop, smaller. It falls at 1200 V; the voltage is turned up to 2000 V until the drop
 * has stopped, and eased back to 1600 V, where the two forces balance and it hangs at rest. (The
 * time at 2000 V is the time at 1200 V less half the time of the last turn of the knob, so that
 * the drop ends with no velocity at all.)
 */
const tuned: ChargesEl = {
  kind: 'charges',
  id: 'oil',
  view: [-0.0565, 0.0565, -0.0129, 0.0129],
  height: 260,
  unit: 'e',
  g: 9.81,
  rate: 0.028,
  names: true,
  forceScale: FORCES,
  plates: { at: [0.01, -0.01], across: 'y', span: [-0.02, 0.02], volts: 1200, lines: 7 },
  bodies: [{ id: 'drop', charge: -5, x: 0, y: 0.004, mass: DROP }],
  clips: {
    tune: {
      phases: [
        { dur: 1, fly: true },
        { dur: 0.8, volts: 2000, fly: true },
        { dur: 0.6, fly: true },
        { dur: 0.8, volts: 1600, fly: true },
        { dur: 2, fly: true },
      ],
    },
  },
};

/** The drop at rest at 1600 V, with the distance between the plates. */
const balanced: ChargesEl = {
  kind: 'charges',
  id: 'oil',
  view: [-0.0565, 0.0565, -0.0129, 0.0129],
  height: 260,
  unit: 'e',
  g: 9.81,
  length: CM,
  names: true,
  forceScale: FORCES,
  plates: { at: [0.01, -0.01], across: 'y', span: [-0.02, 0.02], volts: 1600, lines: 7 },
  bodies: [{ id: 'drop', charge: -5, x: 0, y: 0, mass: DROP, labelAt: 'right' }],
  clips: {},
};

/** Four drops of the same mass with 3, 5, 7 and 10 extra electrons, at 1600 V: one falls, one hangs, and two rise. */
const four: ChargesEl = {
  kind: 'charges',
  id: 'oil',
  view: [-0.06, 0.06, -0.0158, 0.0158],
  height: 300,
  unit: 'e',
  g: 9.81,
  rate: 0.02,
  velocityScale: 100,
  plates: { at: [0.01, -0.01], across: 'y', span: [-0.045, 0.045], volts: 1600, lines: 13 },
  bodies: [
    { id: 'a', charge: -3, x: -0.03, y: 0, mass: DROP, labelAt: 'right' },
    { id: 'b', charge: -5, x: -0.01, y: 0, mass: DROP, labelAt: 'right' },
    { id: 'c', charge: -7, x: 0.01, y: 0, mass: DROP, labelAt: 'right' },
    { id: 'd', charge: -10, x: 0.03, y: 0, mass: DROP, labelAt: 'right' },
  ],
  clips: { sort: { phases: [{ dur: 1.7, fly: true }] } },
};

const video: Explainer = {
  id: 'p30-2-5-b',
  lessonId: 'p30-2-5',
  title: 'Millikan\'s Oil Drops',
  thumbnail: 'oil',
  summary:
    'Robert Millikan measured the charge of the electron with drops of oil hanging between two charged plates. A drop hangs at rest when the electric force balances its weight (qE = mg), which gives its charge, q = mgd ÷ ΔV. Every drop carried a whole number of the same smallest charge: charge is quantized.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Millikan\'s Oil Drops', subtitle: 'Measuring the charge of one electron' }],
      lines: [
        { say: 'In nineteen oh nine, Robert Millikan measured the charge of a single electron.', caption: 'In 1909, Robert Millikan measured the charge of a single electron.', show: 'title' },
        { say: 'He did it with a mist of tiny oil drops, two metal plates, and a microscope.' },
      ],
    },
    {
      chapter: 'A drop between two plates',
      layout: 'center',
      main: [chamber],
      lines: [
        { say: 'Millikan sprayed a fine mist of oil between two level metal plates. Some of the drops picked up a few extra electrons, so they were negative.', show: ['oil', 'oil.potential'] },
        { say: 'Two forces act on a drop. Its weight pulls it down. The electric force pulls it up, towards the positive plate.', show: ['oil.lines', 'oil.force'] },
        { say: 'With too little voltage, the weight is the larger force, and the drop falls.', play: 'oil.fall', playDelay: 2.5 },
        { say: 'Turn the voltage up. The electric force grows, and the drop slows down and stops. With too much voltage, it rises.', play: 'oil.rise', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Balance',
      layout: 'center',
      main: [tuned, { kind: 'math', id: 'm', size: 'md', lines: ['qE = mg \\qquad E = \\dfrac{\\Delta V}{d}', 'q = \\dfrac{mgd}{\\Delta V}'] }],
      lines: [
        { say: 'Millikan watched one drop through a microscope. He turned the voltage up and down, until the drop hung at rest.', show: ['oil', 'oil.lines', 'oil.potential', 'oil.force'], play: 'oil.tune', playDelay: 1.5 },
        { say: 'A drop at rest has no net force on it. The electric force balances its weight: q E equals m g. And between the plates, the field is the potential difference divided by the distance.', show: 'm.0' },
        { say: 'Put the two together. The charge on the drop is m g d, divided by the potential difference.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The charge of a drop',
      layout: 'center',
      main: [
        balanced,
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: ['q = \\dfrac{6.53 \\times 10^{-15} \\times 9.81 \\times 0.020}{1600} = \\thc{8.01 \\times 10^{-19}\\ \\text{C}}', '\\dfrac{8.01 \\times 10^{-19}}{1.60 \\times 10^{-19}} = \\thc{5.0}'],
        },
      ],
      lines: [
        { say: 'This drop has a mass of 6.53 times ten to the negative fifteen kilograms. It hangs at rest between plates 2.0 centimetres apart, with 1,600 volts between them.', show: ['oil', 'oil.lines', 'oil.potential', 'oil.gap', 'oil.force'] },
        { say: 'Put in the numbers, with the distance in metres. The charge is 8.01 times ten to the negative nineteen coulombs.', show: 'c.0' },
        { say: 'Divide by the elementary charge, and the answer is 5.0. This drop carries five extra electrons.', show: ['c.1', 'oil.charge'] },
      ],
    },
    {
      chapter: 'Charge comes in steps',
      layout: 'center',
      main: [
        four,
        { kind: 'math', id: 'n', size: 'md', lines: ['q = n \\times 1.60 \\times 10^{-19}\\ \\text{C}'] },
        { kind: 'text', id: 'never', md: 'Charge is **quantized**. A charge of $2.4 \\times 10^{-19}$ C is impossible: it is one and a half elementary charges.' },
      ],
      lines: [
        { say: 'Millikan measured thousands of drops. Here are four of the same mass, in the same field, with three, five, seven and ten extra electrons.', show: ['oil', 'oil.lines', 'oil.potential', 'oil.charge'] },
        { say: 'Let them go. The drop with five electrons hangs at rest. The one with fewer falls, and the ones with more rise, because the field pulls harder on a drop with more charge.', show: 'oil.velocity', play: 'oil.sort', playDelay: 1.5 },
        { say: 'Every charge that Millikan measured was a whole number of the same smallest charge: 1.60 times ten to the negative nineteen coulombs.', show: 'n.0' },
        { say: 'There was never a value in between. Charge is quantized, and that smallest amount is the elementary charge.', show: 'never' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An oil drop has a charge of $6.4 \\times 10^{-19}$ C. How many excess electrons does it carry?',
          choices: ['4', '6', '10', '64'],
          answer: 0,
          working: 'Divide by the elementary charge: $\\dfrac{6.4 \\times 10^{-19}}{1.60 \\times 10^{-19}} = 4.0$, so the drop carries 4 excess electrons.',
        },
      ],
      lines: [
        { say: 'Your turn. An oil drop has a charge of 6.4 times ten to the negative nineteen coulombs. How many excess electrons does it carry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Divide the charge by the elementary charge. 6.4 divided by 1.60 is 4. The drop carries four excess electrons. That is choice "A".', show: 'q.answer' },
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
            'An oil drop hangs at rest when the electric force **balances** its weight: $qE = mg$',
            'Between plates, $E = \\dfrac{\\Delta V}{d}$, so $q = \\dfrac{mgd}{\\Delta V}$',
            'Every charge is a **whole number** of the elementary charge, $1.60 \\times 10^{-19}$ C',
            'Charge is **quantized**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An oil drop hangs at rest when the electric force balances its weight.', show: 'sum.0' },
        { say: 'Between the plates, that gives the charge on the drop: m g d, divided by the potential difference.', show: 'sum.1' },
        { say: 'Every charge is a whole number of the elementary charge.', show: 'sum.2' },
        { say: 'So charge is quantized.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
