import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 5.2: voltage, resistance and Ohm's law. Charges leave a 6 V battery bright with energy
// and come out of the lamp dim, with a voltmeter across the lamp; one 12 V battery drives less and
// less current as the resistance rises from 4 Ω to 6 Ω to 12 Ω; and a 4 Ω resistor carries 1 A,
// 2 A and 3 A as the supply goes from 4 V to 8 V to 12 V, so voltage ÷ current is always 4 Ω.
// The readings on screen are worked out by src/video/circuit.ts.

// A 6 V battery and a lamp: each coulomb carries 6 J to the lamp.
const energy: CircuitEl = {
  kind: 'circuit',
  id: 'v',
  volts: 6,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 3, label: 'Lamp' }],
  height: 370,
  poster: 'run',
  clips: { run: { phases: [{ dur: 6 }] } },
};

// One battery, and a resistor that is changed for larger ones: 3 A, then 2 A, then 1 A.
const resist: CircuitEl = {
  kind: 'circuit',
  id: 'r',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'res', kind: 'resistor', ohms: 4 }],
  height: 400,
  clips: {
    run: { phases: [{ dur: 4 }] },
    more: { phases: [{ dur: 4, set: { ohms: { res: 6 } } }, { dur: 5, set: { ohms: { res: 12 } } }] },
  },
};

// One 4 Ω resistor, and a supply turned up from 4 V to 8 V to 12 V: 1 A, 2 A, 3 A.
const ohm: CircuitEl = {
  kind: 'circuit',
  id: 'o',
  volts: 4,
  layout: 'series',
  parts: [{ id: 'res', kind: 'resistor', ohms: 4 }],
  height: 370,
  clips: {
    four: { phases: [{ dur: 4 }] },
    eight: { phases: [{ dur: 4, set: { volts: 8 } }] },
    twelve: { phases: [{ dur: 4, set: { volts: 12 } }] },
  },
};

const video: Explainer = {
  id: 'p10-5-2',
  lessonId: 'p10-5-2',
  title: 'Voltage, Resistance and Ohm’s Law',
  thumbnailTitle: 'Ohm’s Law',
  thumbnail: 'v',
  summary:
    'What sets the size of a current? See what voltage means by watching charges carry energy from a battery to a lamp, watch the current fall as the resistance rises, and turn up the supply across a resistor to find Ohm’s law, V = IR. Then use it to find a voltage, a current and a resistance.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electricity', title: 'Voltage, Resistance and Ohm’s Law', subtitle: 'What sets the size of a current' }],
      lines: [
        { say: 'A battery does not make charge. The charge is already there, in the wires.', show: 'title' },
        { say: 'What the battery does is push the charge round the circuit, and give it energy to deliver. How hard it pushes is the voltage. How much the circuit holds the charge back is the resistance.' },
      ],
    },
    {
      chapter: 'Voltage',
      layout: 'center',
      main: [
        energy,
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{voltage} = \\dfrac{\\text{energy transferred}}{\\text{charge}} \\qquad V = \\dfrac{E}{Q} = \\dfrac{24}{4} = \\thc{6\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'Each coulomb of charge leaves the battery carrying energy, shown in bright yellow. It gives that energy to the lamp, and goes back to the battery for more.', show: ['v', 'v.charges', 'v.energy'], play: 'v.run' },
        { say: 'The voltage across a component is the energy transferred by each coulomb of charge that passes through it. It is measured in volts. One volt is one joule for each coulomb.', play: 'v.run' },
        { say: 'This battery transfers twenty-four joules of energy to four coulombs of charge. Twenty-four divided by four is six, so its voltage is six volts.', caption: 'This battery transfers 24 joules of energy to 4 coulombs of charge. V = E ÷ Q: 24 divided by 4 is 6, so its voltage is 6 volts.', show: 'eq', play: 'v.run' },
        { say: 'Voltage is measured with a voltmeter. It is connected across the component, in parallel with it, because it compares the charge on one side with the charge on the other.', show: 'v.voltage', play: 'v.run' },
      ],
    },
    {
      chapter: 'Resistance',
      layout: 'center',
      main: [resist, { kind: 'text', id: 'rule', size: 'md', md: 'For the same battery, **more resistance** means **less current**. Resistance is measured in **ohms (Ω)**.' }],
      lines: [
        { say: 'Resistance is a measure of how much a component opposes the flow of charge. It is measured in ohms. Here a twelve volt battery drives a current of three amperes through a resistor of four ohms.', show: ['r', 'r.charges', 'r.current'], play: 'r.run', playDelay: 6 },
        { say: 'Now watch the ammeters as the resistance goes up, first to six ohms, and then to twelve ohms. The battery has not changed, but the charge flows more and more slowly.', play: 'r.more', playDelay: 2 },
        { say: 'So for the same battery, more resistance means less current. A long wire has more resistance than a short one of the same kind, and a thin wire has more than a thick one.', show: 'rule' },
      ],
    },
    {
      chapter: 'Current and voltage',
      layout: 'center',
      main: [
        ohm,
        {
          kind: 'table',
          id: 't',
          head: ['Voltage', 'Current', 'Voltage ÷ current'],
          rows: [
            ['4 V', '1 A', '4 Ω'],
            ['8 V', '2 A', '4 Ω'],
            ['12 V', '3 A', '4 Ω'],
          ],
        },
      ],
      lines: [
        { say: 'Now keep one resistor, and change the voltage. Two meters are needed. The ammeter is in series, in line with the resistor. The voltmeter is in parallel, across it.', show: ['o', 'o.charges', 'o.current', 'o.voltage'], play: 'o.four' },
        { say: 'With four volts across the resistor, the current is one ampere.', show: ['t', 't.0'], play: 'o.four' },
        { say: 'Double the voltage to eight volts, and the current doubles to two amperes.', show: 't.1', play: 'o.eight' },
        { say: 'At twelve volts, the current is three amperes. The current is proportional to the voltage.', show: 't.2', play: 'o.twelve' },
        { say: 'Now look at the last column. The voltage divided by the current is four ohms every time. That number is the resistance of the resistor.' },
      ],
    },
    {
      chapter: 'Ohm’s law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'law', size: 'lg', lines: ['\\thc{V = IR} \\qquad I = \\dfrac{V}{R} \\qquad R = \\dfrac{V}{I}'] },
        {
          kind: 'math',
          id: 'ex',
          size: 'md',
          lines: ['V = IR = 2 \\times 6 = \\thc{12\\ \\text{V}}', 'I = \\dfrac{V}{R} = \\dfrac{9}{20} = \\thc{0.45\\ \\text{A}}', 'R = \\dfrac{V}{I} = \\dfrac{12}{1.5} = \\thc{8\\ \\Omega}'],
        },
      ],
      lines: [
        { say: 'This is Ohm’s law. Voltage equals current times resistance. It holds for a resistor at a steady temperature.', caption: 'This is Ohm’s law. Voltage equals current times resistance: V = IR. It holds for a resistor at a steady temperature.', show: 'law' },
        { say: 'It can be turned round. Current is voltage divided by resistance. And resistance is voltage divided by current.' },
        { say: 'A current of two amperes flows through a resistor of six ohms. The voltage across it is two times six, which is twelve volts.', show: 'ex.0' },
        { say: 'Nine volts is connected across a resistor of twenty ohms. The current is nine divided by twenty, which is zero point four five amperes.', show: 'ex.1' },
        { say: 'Twelve volts across a lamp drives a current of one point five amperes through it. Its resistance is twelve divided by one point five, which is eight ohms.', show: 'ex.2' },
        { say: 'Take care to divide the right way round. Resistance is voltage divided by current, not current divided by voltage. And change milliamperes to amperes, and kilohms to ohms, before you start.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'try',
          prompt: 'A voltage of 6 V across a resistor drives a current of 0.5 A through it. What is the resistance of the resistor?',
          choices: ['12 Ω', '3 Ω', '0.083 Ω', '6.5 Ω'],
          answer: 0,
          working: 'Resistance = voltage ÷ current: $R = \\dfrac{V}{I} = \\dfrac{6}{0.5} = 12\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Your turn. A voltage of six volts across a resistor drives a current of zero point five amperes through it. What is the resistance of the resistor? Pause the video and try it.', show: 'try', wait: 6 },
        { say: 'Resistance is voltage divided by current. Six divided by zero point five is twelve ohms. That is choice A.', show: 'try.answer' },
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
            'Voltage is the energy transferred by each coulomb: V = E ÷ Q, in volts',
            'Resistance opposes the flow of charge. It is measured in ohms',
            'An ammeter goes in series. A voltmeter goes in parallel',
            'Ohm’s law: V = IR',
            'More voltage gives more current. More resistance gives less',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Voltage is the energy transferred by each coulomb of charge, measured in volts.', show: 'end.0' },
        { say: 'Resistance opposes the flow of charge, and is measured in ohms.', show: 'end.1' },
        { say: 'An ammeter goes in series. A voltmeter goes in parallel.', show: 'end.2' },
        { say: 'Ohm’s law says that voltage equals current times resistance.', show: 'end.3' },
        { say: 'And more voltage gives more current, while more resistance gives less.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
