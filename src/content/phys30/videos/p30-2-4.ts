import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.4, first half: electric potential energy and potential difference. The plates, their
// field and the charge between them are worked out step by step (src/video/charges.ts): the pink
// bar is the potential energy the charge can still lose, q times the potential difference still
// ahead of it, and the green bar is its kinetic energy, so the two bars trade places as it falls.

/** Plates 0.30 m apart with 300 V between them, and a charge of +1.5 μC (1.0 g): pushed to the positive plate, then let go. */
const store: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.1, 0.62, -0.133, 0.133],
  height: 420,
  decimals: 1,
  rate: 0.25,
  plates: { at: [0, 0.3], span: [-0.1, 0.1], volts: 300 },
  bodies: [{ id: 'q', charge: 1.5, x: 0.3, mass: 0.001 }],
  poster: 'push',
  thumb: ['lines', 'charge', 'energy'],
  clips: { push: { phases: [{ dur: 3, to: { q: 0 } }] }, go: { phases: [{ dur: 2.4, fly: true }] } },
};

/** The same plates and charge, smaller, with the potential of each plate: 450 μJ for 1.5 μC is 300 V. */
const volt: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.12, 0.64, -0.087, 0.087],
  height: 260,
  decimals: 1,
  plates: { at: [0, 0.3], span: [-0.06, 0.06], volts: 300, lines: 5 },
  bodies: [{ id: 'q', charge: 1.5, x: 0.3, mass: 0.001 }],
  clips: { push: { phases: [{ dur: 3, to: { q: 0 } }] } },
};

/** Plates at 400 V and 100 V, with a positive and a negative charge let go half way between them. */
const downhill: ChargesEl = {
  kind: 'charges',
  id: 'hill',
  view: [-0.2, 0.5, -0.13, 0.13],
  height: 420,
  decimals: 1,
  rate: 0.15,
  plates: { at: [0, 0.3], span: [-0.1, 0.1], volts: 300, base: 100 },
  bodies: [
    { id: 'p', charge: 2, x: 0.15, y: 0.045, mass: 0.001, test: true },
    { id: 'n', charge: -2, x: 0.15, y: -0.045, mass: 0.001, test: true },
  ],
  clips: { free: { phases: [{ dur: 3, fly: true }] } },
};

/** A charge of −2.0 μC carried from the plate at 400 V to the plate at 100 V: it gains 600 μJ. */
const signs: ChargesEl = {
  kind: 'charges',
  id: 'hill',
  view: [-0.12, 0.64, -0.087, 0.087],
  height: 260,
  decimals: 1,
  plates: { at: [0, 0.3], span: [-0.06, 0.06], volts: 300, base: 100, lines: 5 },
  bodies: [{ id: 'n', charge: -2, x: 0, mass: 0.001 }],
  clips: { carry: { phases: [{ dur: 3, to: { n: 0.3 } }] } },
};

/** An electron let go at the negative plate, 5000 V below the positive one, which has a hole in it: it leaves with 5000 eV. */
const gun: ChargesEl = {
  kind: 'charges',
  id: 'gun',
  view: [-0.03, 0.17, -0.023, 0.023],
  height: 260,
  unit: 'e',
  rate: 1e-9,
  plates: { at: [0.04, 0], span: [-0.016, 0.016], volts: 5000, hole: 'first', lines: 5 },
  bodies: [{ id: 'e', charge: -1, x: 0, mass: 9.11e-31 }],
  clips: { go: { phases: [{ dur: 3.2, fly: true }] } },
};

const video: Explainer = {
  id: 'p30-2-4',
  lessonId: 'p30-2-4',
  title: 'Potential Difference',
  thumbnail: 'gap',
  summary:
    'Push a charge against an electric field and the work is stored as electric potential energy. Potential difference is that energy for each coulomb, in volts (ΔV = ΔE ÷ q). See which way positive and negative charges fall, let the signs look after themselves, and meet the electronvolt.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Potential Difference', subtitle: 'Energy for each coulomb' }],
      lines: [
        { say: 'Lift a book on to a shelf, and you do work against gravity. The book stores that work as potential energy.', show: 'title' },
        { say: 'A charge in an electric field stores energy in the same way.' },
      ],
    },
    {
      chapter: 'Stored energy',
      layout: 'center',
      main: [store],
      lines: [
        { say: 'Here are two metal plates. One is positive, and one is negative. The field between them points from the positive plate to the negative plate.', show: ['gap', 'gap.lines', 'gap.charge'] },
        { say: 'Push a positive charge towards the positive plate. The field pushes back, so you do work. That work is stored as electric potential energy.', show: 'gap.energy', play: 'gap.push', playDelay: 1.5 },
        { say: 'Now let the charge go. The field pushes it back across the gap, and it speeds up. Its potential energy is turning into kinetic energy.', show: 'gap.velocity', play: 'gap.go', playDelay: 2 },
        { say: 'It is just like the book falling off the shelf.' },
      ],
    },
    {
      chapter: 'Potential difference',
      layout: 'center',
      main: [volt, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta V = \\dfrac{\\Delta E}{q}', '\\Delta V = \\dfrac{4.5 \\times 10^{-4}}{1.5 \\times 10^{-6}} = \\thc{300\\ \\text{V}}'] }],
      lines: [
        { say: 'Twice the charge would need twice the work. So it is useful to give the energy for each coulomb of charge.', show: ['gap', 'gap.lines', 'gap.charge'] },
        { say: 'That is the potential difference. It is the change in energy divided by the charge, and it is measured in volts. One volt is one joule per coulomb.', show: 'm.0' },
        { say: 'It takes 450 microjoules of work to move this charge of 1.5 microcoulombs from the negative plate to the positive plate. That is 4.5 times ten to the negative four joules.', show: 'gap.energy', play: 'gap.push', playDelay: 1 },
        { say: 'Divide the energy by the charge. The potential difference between the plates is 300 volts.', show: ['m.1', 'gap.potential'] },
        { say: 'The positive plate is at the higher potential, because work was needed to take a positive charge there.' },
      ],
    },
    {
      chapter: 'Which way charges fall',
      layout: 'center',
      main: [downhill],
      lines: [
        { say: 'Potential is like height. This plate is at 400 volts, and this one is at 100 volts. Between them are a positive charge and a negative charge.', show: ['hill', 'hill.lines', 'hill.charge', 'hill.potential'] },
        { say: 'Let them go. The positive charge moves from high potential to low potential, like a ball rolling downhill. The negative charge does the opposite. It moves from low potential to high potential.', show: 'hill.velocity', play: 'hill.free', playDelay: 1.5 },
        { say: 'Both of them speed up, so both are losing potential energy.' },
      ],
    },
    {
      chapter: 'Signs',
      layout: 'center',
      main: [
        signs,
        {
          kind: 'math',
          id: 's',
          size: 'md',
          lines: ['\\Delta E = q\\,\\Delta V', '\\Delta V = 100 - 400 = -300\\ \\text{V}', '\\Delta E = (-2.0\\ \\mu\\text{C}) \\times (-300\\ \\text{V}) = \\hyp{+600\\ \\mu\\text{J}}'],
        },
      ],
      lines: [
        { say: 'The signs look after themselves if you use this equation with the sign of the charge. The potential difference is the potential at the end, minus the potential at the start.', show: ['hill', 'hill.lines', 'hill.charge', 'hill.potential', 's.0'] },
        { say: 'Move a charge of negative 2.0 microcoulombs from the plate at 400 volts to the plate at 100 volts. The potential difference is 100 minus 400, which is negative 300 volts.', show: ['s.1', 'hill.energy'], play: 'hill.carry', playDelay: 1 },
        { say: 'So the change in energy is negative 2.0 microcoulombs times negative 300 volts. That is positive 600 microjoules.', show: 's.2' },
        { say: 'The charge gains potential energy. Something must do work to move a negative charge to a lower potential.' },
      ],
    },
    {
      chapter: 'The electronvolt',
      layout: 'center',
      main: [
        gun,
        { kind: 'math', id: 'ev', size: 'md', lines: ['1\\ \\text{eV} = 1.60 \\times 10^{-19}\\ \\text{J}', '5000\\ \\text{eV} = 5000 \\times 1.60 \\times 10^{-19} = \\good{8.0 \\times 10^{-16}\\ \\text{J}}'] },
        { kind: 'text', id: 'unit', md: 'The electronvolt is a unit of **energy**, not of voltage.' },
      ],
      lines: [
        { say: 'The energy of a single particle is tiny in joules, so physicists use a smaller unit: the electronvolt.', show: ['gun', 'gun.lines', 'gun.charge', 'gun.potential'] },
        { say: 'One electronvolt is the energy that one elementary charge gains when it moves through one volt. It is 1.60 times ten to the negative nineteen joules.', show: 'ev.0' },
        { say: 'This electron is pulled through 5,000 volts, and out through a hole in the positive plate. It gains 5,000 electronvolts. No calculation is needed.', show: ['gun.energy', 'gun.velocity'], play: 'gun.go', playDelay: 1 },
        { say: 'In joules, that is 8.0 times ten to the negative sixteen.', show: 'ev.1' },
        { say: 'Take care with the name. The electronvolt is a unit of energy, like the joule. It is not a unit of voltage.', show: 'unit' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How much energy does a 12 V battery give to 30 C of charge that passes through it?',
          choices: ['0.40 J', '360 J', '2.5 J', '42 J'],
          answer: 1,
          working: '$\\Delta E = q\\,\\Delta V = 30 \\times 12 = 360$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. How much energy does a 12 volt battery give to 30 coulombs of charge that passes through it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The energy is the charge times the potential difference. 30 times 12 is 360 joules. That is choice B.', show: 'q.answer' },
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
            'Work done against a field is stored as **electric potential energy**',
            'Potential difference is the energy for each coulomb: $\\Delta V = \\dfrac{\\Delta E}{q}$, in volts',
            'A free **positive** charge moves to lower potential, and a free **negative** charge to higher potential',
            '$\\Delta E = q\\,\\Delta V$, with the sign of the charge',
            '$1\\ \\text{eV} = 1.60 \\times 10^{-19}$ J: one elementary charge moved through one volt',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Work done against an electric field is stored as electric potential energy.', show: 'sum.0' },
        { say: 'Potential difference is the energy for each coulomb. It is measured in volts.', show: 'sum.1' },
        { say: 'A free positive charge moves to lower potential, and a free negative charge moves to higher potential.', show: 'sum.2' },
        { say: 'The change in energy is the charge times the potential difference, with the sign of the charge.', show: 'sum.3' },
        { say: 'And one electronvolt is the energy that one elementary charge gains from one volt.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
