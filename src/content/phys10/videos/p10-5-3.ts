import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 5.3: series circuits. A 12 V supply drives 2 A round one loop through 2 Ω and 4 Ω, and
// the ammeters on both sides read the same; the charges give up their energy in two steps, and
// voltmeters read 4 V and 8 V; one lamp beside two lamps in series shows why more lamps are
// dimmer; and one broken lamp of three puts all of them out. The readings are worked out by
// src/video/circuit.ts.

// 12 V across 2 Ω and 4 Ω in one loop: 6 Ω in all, 2 A, 4 V and 8 V.
const loop: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 12,
  layout: 'series',
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 2 },
    { id: 'r2', kind: 'resistor', ohms: 4 },
  ],
  height: 370,
  clips: { run: { phases: [{ dur: 6 }] } },
};

// One 4 Ω lamp on 12 V, beside two of them in series on the same supply.
const lamp = (id: string) => ({ id, kind: 'lamp' as const, ohms: 4, label: 'Lamp' });
const one: CircuitEl = { kind: 'circuit', id: 'one', volts: 12, layout: 'series', parts: [lamp('a')], bright: 36, height: 360, clips: { run: { phases: [{ dur: 6 }] } } };
const two: CircuitEl = { kind: 'circuit', id: 'two', volts: 12, layout: 'series', parts: [lamp('a'), lamp('b')], bright: 36, height: 360, clips: { run: { phases: [{ dur: 6 }] } } };

// Three lamps in one loop: the middle one fails, and the current stops everywhere.
const string: CircuitEl = {
  kind: 'circuit',
  id: 's',
  volts: 12,
  layout: 'series',
  parts: [lamp('a'), lamp('b'), lamp('c')],
  height: 400,
  poster: 'run',
  clips: {
    run: { phases: [{ dur: 5 }] },
    fail: { phases: [{ dur: 2 }, { dur: 3, set: { broken: ['b'] } }] },
  },
};

const video: Explainer = {
  id: 'p10-5-3',
  lessonId: 'p10-5-3',
  title: 'Series Circuits',
  thumbnail: 's',
  summary:
    'In a series circuit there is one loop and one current. Watch the same charge pass through every component, add the resistances to find the current, and see the supply voltage shared between two resistors. Then see why adding lamps in series makes them dimmer, and why one broken lamp puts them all out.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electricity', title: 'Series Circuits', subtitle: 'One loop, one current' }],
      lines: [
        { say: 'In some strings of decorative lights, one failed bulb puts the whole string out.', show: 'title' },
        { say: 'That is the mark of a series circuit. The components are connected one after another, in a single loop.' },
      ],
    },
    {
      chapter: 'One loop, one current',
      layout: 'center',
      main: [
        loop,
        { kind: 'math', id: 'eq', size: 'md', lines: ['R = R_1 + R_2 = 2 + 4 = \\thc{6\\ \\Omega} \\qquad I = \\dfrac{V}{R} = \\dfrac{12}{6} = \\thc{2\\ \\text{A}}'] },
      ],
      lines: [
        { say: 'Here a twelve volt battery is connected to two resistors in series, of two ohms and four ohms. There is only one path, so every charge that leaves the battery passes through both resistors.', show: ['c', 'c.charges'], play: 'c.run' },
        { say: 'That means the current is the same at every point in the loop. The ammeter before the resistors and the ammeter after them both read two amperes.', show: 'c.current', play: 'c.run' },
        { say: 'To find that current, add the resistances first. In series, the total resistance is the sum. Two plus four is six ohms.', show: 'eq', play: 'c.run' },
        { say: 'Then the current is the supply voltage divided by the total resistance. Twelve divided by six is two amperes.', play: 'c.run' },
        { say: 'A common mistake is to use only one resistor. Twelve divided by two would give six amperes, but that ignores the four ohm resistor. The battery has to push the charge through both.' },
      ],
    },
    {
      chapter: 'Sharing the voltage',
      layout: 'center',
      main: [
        loop,
        { kind: 'math', id: 'share', size: 'md', lines: ['V_1 = IR_1 = 2 \\times 2 = \\thc{4\\ \\text{V}} \\qquad V_2 = IR_2 = 2 \\times 4 = \\thc{8\\ \\text{V}}', '4\\ \\text{V} + 8\\ \\text{V} = 12\\ \\text{V}'] },
      ],
      lines: [
        { say: 'Each coulomb leaves the battery with a fixed amount of energy, and gives it up part by part. Watch the charges. They dim a little in the first resistor, and the rest of the way in the second.', show: ['c', 'c.charges', 'c.energy'], play: 'c.run' },
        { say: 'So the supply voltage is shared between the components. The voltmeters read four volts across the first resistor, and eight volts across the second.', show: 'c.voltage', play: 'c.run' },
        { say: 'Ohm’s law gives each share. The current is two amperes, so across the two ohm resistor the voltage is two times two, which is four volts. Across the four ohm resistor it is two times four, which is eight volts.', show: 'share.0', play: 'c.run' },
        { say: 'Four plus eight is twelve. The voltages across the components always add up to the supply voltage, and the larger resistance takes the larger share.', show: 'share.1' },
      ],
    },
    {
      chapter: 'More lamps in series',
      layout: 'split',
      leftWidth: 544,
      left: [one, { kind: 'text', id: 'l1', size: 'md', md: 'One lamp: **12 V** across it, **3 A**' }],
      right: [two, { kind: 'text', id: 'l2', size: 'md', md: 'Two lamps: **6 V** each, **1.5 A**' }],
      lines: [
        { say: 'On the left, one lamp is connected to a twelve volt battery. It has the whole twelve volts across it, and it is bright.', show: ['one', 'one.charges', 'l1'], play: 'one.run' },
        { say: 'On the right, a second lamp of the same kind is added in series. The resistance doubles, so the current halves, and each lamp gets only six volts.', show: ['two', 'two.charges', 'l2'], play: ['one.run', 'two.run'] },
        { say: 'So every lamp is dimmer. Adding more components in series shares the same supply voltage between more of them, and makes the current smaller.', play: ['one.run', 'two.run'] },
      ],
    },
    {
      chapter: 'A break anywhere',
      layout: 'center',
      main: [string, { kind: 'callout', id: 'full', tone: 'mistake', title: 'Giving each component the full voltage', md: 'In series, no component has the whole supply voltage across it, unless it is the only one. The voltages **add up** to the supply voltage.' }],
      lines: [
        { say: 'Here are three lamps in series, with a current of one ampere through all of them.', show: ['s', 's.charges', 's.current'], play: 's.run' },
        { say: 'Now the middle lamp fails. The loop is broken, so the current stops everywhere, and all three lamps go out. This is what happens in that string of lights.', play: 's.fail', playDelay: 1 },
        { say: 'Remember that in series, the supply voltage is shared. No single component has the full voltage across it, unless it is the only one.', show: 'full' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'try',
          prompt: 'Resistors of 3 Ω and 5 Ω are connected in series to a 24 V supply. What current flows in the circuit?',
          choices: ['8 A', '4.8 A', '12.8 A', '3 A'],
          answer: 3,
          working: 'Total resistance: $3 + 5 = 8\\ \\Omega$. Current: $I = \\dfrac{V}{R} = \\dfrac{24}{8} = 3\\ \\text{A}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Resistors of three ohms and five ohms are connected in series to a twenty-four volt supply. What current flows in the circuit? Pause the video and try it.', show: 'try', wait: 6 },
        { say: 'Add the resistances first. Three plus five is eight ohms. Then twenty-four divided by eight is three amperes. That is choice D.', show: 'try.answer' },
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
            'A series circuit is a single loop: the current is the same everywhere',
            'Total resistance in series: R = R₁ + R₂',
            'Current = supply voltage ÷ total resistance',
            'The voltages across the components add up to the supply voltage',
            'A break anywhere stops the current everywhere',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A series circuit is a single loop, so the current is the same everywhere.', show: 'end.0' },
        { say: 'The total resistance is the sum of the resistances.', show: 'end.1' },
        { say: 'The current is the supply voltage divided by the total resistance.', show: 'end.2' },
        { say: 'The voltages across the components add up to the supply voltage.', show: 'end.3' },
        { say: 'And a break anywhere stops the current everywhere.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
