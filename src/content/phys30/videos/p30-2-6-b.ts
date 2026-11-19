import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 2.6, second half: emf and internal resistance. A battery with an emf of 12 V and 0.5 Ω
// inside it drives a 5.5 Ω resistor: 2 A, so 1 V is lost inside the battery and its terminals are
// at 11 V. A second branch that draws a large current drops the terminals to 6.6 V and dims a
// lamp, and two voltmeter readings (9.0 V and 8.4 V with 7 Ω) give an internal resistance of
// 0.5 Ω. Every reading is worked out by src/video/circuit.ts.

/** An emf of 12 V with 0.5 Ω inside, and a 5.5 Ω resistor: 2 A once the switch is closed. */
const cell = (open: boolean): CircuitEl => ({
  kind: 'circuit',
  id: 'cell',
  volts: 12,
  internal: 0.5,
  layout: 'series',
  open,
  parts: [{ id: 'r', kind: 'resistor', ohms: 5.5 }],
  height: 420,
  poster: 'run',
  // The charges move only while a clip plays: `run` for a long line, and `brief` for a short one.
  clips: {
    on: { phases: [{ dur: 8, set: { closed: true } }] },
    run: { phases: [{ dur: 11 }] },
    brief: { phases: [{ dur: 7 }] },
  },
});

/** The same battery lighting headlights of 5.5 Ω; then a starter motor on a second branch draws 9.6 A. */
const car: CircuitEl = {
  kind: 'circuit',
  id: 'car',
  volts: 12,
  internal: 0.5,
  layout: 'parallel',
  pace: 14,
  parts: [
    { id: 'lamp', kind: 'lamp', ohms: 5.5, label: 'Headlights' },
    // Switched off, the motor lets almost no charge through.
    { id: 'motor', kind: 'resistor', ohms: 1e9, label: 'Starter motor' },
  ],
  height: 420,
  clips: {
    run: { phases: [{ dur: 10 }] },
    start: { phases: [{ dur: 3.5 }, { dur: 8, set: { ohms: { motor: 0.6875 } }, note: 'Starter motor on' }] },
    on: { phases: [{ dur: 9 }] },
    brief: { phases: [{ dur: 6 }] },
  },
};

/** A battery of 9.0 V with an internal resistance still to be found, and a 7 Ω resistor: 8.4 V at the terminals. */
const find: CircuitEl = {
  kind: 'circuit',
  id: 'find',
  volts: 9,
  internal: 0.5,
  internalLabel: 'r = ?',
  layout: 'series',
  open: true,
  parts: [{ id: 'r', kind: 'resistor', ohms: 7 }],
  height: 420,
  clips: { on: { phases: [{ dur: 5, set: { closed: true } }] }, run: { phases: [{ dur: 7 }] } },
};

const video: Explainer = {
  id: 'p30-2-6-b',
  lessonId: 'p30-2-6',
  title: 'Emf and Internal Resistance',
  thumbnailTitle: 'Internal Resistance',
  thumbnail: 'cell',
  summary:
    'A battery has a resistance of its own. Its emf drives the current through the circuit and through the battery itself (ε = I(R + r)), so some volts are lost inside it and the terminals are at V = ε − Ir. See why a larger current dims the headlights, find the internal resistance from two voltmeter readings, and find the power wasted inside the battery.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Emf and Internal Resistance', subtitle: 'The volts a battery loses' }],
      lines: [
        { say: 'Connect a voltmeter across a new 1.5 volt cell, and it reads 1.5 volts. Now make the cell light a lamp, and the reading drops a little.', show: 'title' },
        { say: 'Nothing is wrong with the cell. The cell has a resistance of its own.' },
      ],
    },
    {
      chapter: 'Lost volts',
      layout: 'center',
      main: [cell(true), { kind: 'text', id: 'emf', md: 'The **emf**, $\\varepsilon$, is the energy the battery gives to each coulomb of charge.' }],
      lines: [
        { say: 'Here is a battery, drawn with what is inside it. Its emf is 12 volts. That is the energy it gives to each coulomb of charge.', show: ['cell', 'emf'] },
        { say: 'The materials inside the battery resist the current too. This is the internal resistance, and here it is 0.5 ohms.' },
        { say: 'With the switch open, there is no current. A voltmeter across the terminals reads the full emf: 12 volts.', show: 'cell.terminal' },
        { say: 'Now close the switch. The charge has to pass through the battery as well as the resistor, and the voltmeter reading drops to 11 volts.', show: ['cell.charges', 'cell.current'], play: 'cell.on', playDelay: 1 },
        { say: 'One volt is used up inside the battery itself. These are the lost volts.', show: 'cell.lost', play: 'cell.brief' },
      ],
    },
    {
      chapter: 'Terminal potential difference',
      layout: 'center',
      main: [
        cell(false),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\varepsilon = I(R + r) \\qquad V = \\varepsilon - Ir', 'I = \\dfrac{12}{5.5 + 0.5} = \\thc{2\\ \\text{A}} \\qquad V = 12 - 2 \\times 0.5 = \\hyp{11\\ \\text{V}}'],
        },
      ],
      lines: [
        { say: 'The internal resistance acts like a small resistor in series with the rest of the circuit. So the emf drives the current through both resistances. And the potential difference across the terminals is the emf, minus the lost volts.', show: ['cell', 'cell.charges', 'cell.current', 'cell.terminal', 'cell.lost', 'm.0'], play: 'cell.run' },
        { say: 'Here the emf is 12 volts, and the total resistance is 5.5 plus 0.5, which is 6 ohms. So the current is 2 amperes.', show: 'm.1', play: 'cell.brief' },
        { say: 'The lost volts are 2 amperes times 0.5 ohms: 1 volt. That leaves 11 volts at the terminals, which is also the potential difference across the resistor.', play: 'cell.run' },
      ],
    },
    {
      chapter: 'A larger current',
      layout: 'center',
      main: [car, { kind: 'text', id: 'same', md: 'The emf stays at 12 V. The **terminal** potential difference falls.' }],
      lines: [
        { say: 'A larger current means more lost volts. Here the same battery lights the headlights of a car. The current is 2 amperes, and the terminals are at 11 volts.', show: ['car', 'car.charges', 'car.current', 'car.terminal', 'car.lost'], play: 'car.run' },
        { say: 'Now switch on the starter motor, on a second branch. It draws a very large current from the same battery. Watch the voltmeter, and the headlights.', play: 'car.start' },
        { say: 'The battery now supplies 10.8 amperes, so 5.4 volts are lost inside it. Only 6.6 volts are left at the terminals, and the headlights dim.', play: 'car.on' },
        { say: 'The emf has not changed. It is still 12 volts. What falls is the terminal potential difference.', show: 'same', play: 'car.brief' },
      ],
    },
    {
      chapter: 'Finding the internal resistance',
      layout: 'center',
      main: [find, { kind: 'math', id: 'f', size: 'md', lines: ['I = 8.4 \\div 7 = \\thc{1.2\\ \\text{A}}', 'r = \\dfrac{9.0 - 8.4}{1.2} = \\thc{0.5\\ \\Omega}'] }],
      lines: [
        { say: 'Two voltmeter readings are enough to find the internal resistance of a battery. With no current, the voltmeter reads the emf: 9.0 volts.', show: ['find', 'find.terminal'] },
        { say: 'Now connect a 7 ohm resistor. The reading falls to 8.4 volts.', show: 'find.charges', play: 'find.on', playDelay: 1 },
        { say: 'Those 8.4 volts are across the resistor. So the current is 8.4 divided by 7, which is 1.2 amperes.', show: ['f.0', 'find.current'], play: 'find.run' },
        { say: 'The lost volts are 9.0 minus 8.4: 0.6 volts. Divide them by the current, and the internal resistance is 0.5 ohms.', show: 'f.1', play: 'find.run' },
      ],
    },
    {
      chapter: 'Wasted power',
      layout: 'center',
      main: [
        cell(false),
        { kind: 'math', id: 'w', size: 'md', lines: ['P_R = I^2R = 2^2 \\times 5.5 = \\opp{22\\ \\text{W}}', 'P_r = I^2r = 2^2 \\times 0.5 = \\opp{2\\ \\text{W}}'] },
      ],
      lines: [
        { say: 'The internal resistance also wastes energy, and it heats the battery. In the first circuit, the power of the resistor is the current squared times its resistance: 2 squared times 5.5, which is 22 watts.', show: ['cell', 'cell.charges', 'cell.energy', 'cell.current', 'cell.power', 'w.0'], play: 'cell.run' },
        { say: 'Inside the battery, 2 squared times 0.5 is 2 watts, and it is wasted as heat. Together they make 24 watts, which is the emf times the current.', show: 'w.1', play: 'cell.run' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A battery has an emf of 6.0 V and an internal resistance of 1.0 Ω. It is connected to a 2.0 Ω resistor. What is the potential difference across its terminals?',
          choices: ['2.0 V', '3.0 V', '4.0 V', '6.0 V'],
          answer: 2,
          working: '$I = \\dfrac{\\varepsilon}{R + r} = \\dfrac{6.0}{2.0 + 1.0} = 2.0$ A. Lost volts: $Ir = 2.0 \\times 1.0 = 2.0$ V. $V = 6.0 - 2.0 = 4.0$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. A battery has an emf of 6.0 volts, and an internal resistance of 1.0 ohm. It is connected to a 2.0 ohm resistor. What is the potential difference across its terminals? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The total resistance is 3.0 ohms, so the current is 2.0 amperes. The lost volts are 2.0 times 1.0: 2.0 volts. That leaves 4.0 volts at the terminals. That is choice C.', show: 'q.answer' },
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
            'The **emf**, $\\varepsilon$, is the energy a battery gives to each coulomb',
            'A battery has an **internal resistance**, $r$, in series with the circuit: $\\varepsilon = I(R + r)$',
            'The terminal potential difference is $V = \\varepsilon - Ir$',
            'It equals the emf only when there is **no current**',
            'The power wasted inside the battery is $I^2r$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The emf is the energy a battery gives to each coulomb of charge.', show: 'sum.0' },
        { say: 'A battery has an internal resistance, in series with the rest of the circuit.', show: 'sum.1' },
        { say: 'The terminal potential difference is the emf, minus the lost volts.', show: 'sum.2' },
        { say: 'It equals the emf only when there is no current.', show: 'sum.3' },
        { say: 'And the power wasted inside the battery is the current squared, times the internal resistance.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
