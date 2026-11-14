import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 5.5: electrical power and energy. A 12 V headlamp carries 5 A, so it transfers 60 J each
// second (P = IV); turning the supply down to 6 V halves the current as well, and the lamp drops
// to a quarter of the power; a 10 Ω resistor carrying 3 A has 30 V across it and transfers 90 W
// (P = I²R); a counter adds up the energy of the headlamp, 60 J each second, for E = Pt; and the
// kilowatt-hour gives the cost of running a heater, at a price stated in the example. The
// readings are worked out by src/video/circuit.ts.

// A car headlamp: 12 V across 2.4 Ω, so 5 A and 60 W.
const headlamp: CircuitEl = {
  kind: 'circuit',
  id: 'w',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 2.4, label: 'Headlamp' }],
  height: 400,
  poster: 'run',
  clips: {
    run: { phases: [{ dur: 6 }] },
    dim: { phases: [{ dur: 5, set: { volts: 6 } }] },
    back: { phases: [{ dur: 4, set: { volts: 12 } }] },
  },
};

// 30 V across a 10 Ω resistor: 3 A and 90 W.
const heater: CircuitEl = {
  kind: 'circuit',
  id: 'r',
  volts: 30,
  layout: 'series',
  parts: [{ id: 'res', kind: 'resistor', ohms: 10 }],
  pace: 30,
  height: 400,
  clips: { run: { phases: [{ dur: 6 }] } },
};

// The headlamp again, switched on with a clock and a counter of the energy transferred.
const counting: CircuitEl = {
  kind: 'circuit',
  id: 'e',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 2.4, label: 'Headlamp' }],
  open: true,
  height: 400,
  clips: { count: { phases: [{ dur: 5, set: { closed: true } }] } },
};

const video: Explainer = {
  id: 'p10-5-5',
  lessonId: 'p10-5-5',
  title: 'Electrical Power and Energy',
  thumbnailTitle: 'Electrical Power',
  thumbnail: 'w',
  summary:
    'Every appliance has a power rating. See why power is current times voltage, watch a lamp drop to a quarter of its power when the voltage is halved, and count the joules a lamp transfers each second. Then meet the kilowatt-hour, and work out what an appliance costs to run.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electricity', title: 'Electrical Power and Energy', subtitle: 'How fast energy is transferred, and what it costs' }],
      lines: [
        { say: 'Every appliance has a power rating printed on it. A lamp might say nine watts, and a kettle two thousand watts.', show: 'title' },
        { say: 'The rating tells you how quickly the appliance transfers energy. With it, you can work out what the appliance costs to run.' },
      ],
    },
    {
      chapter: 'Electrical power',
      layout: 'center',
      main: [headlamp, { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{power} = \\text{current} \\times \\text{voltage} \\qquad P = IV = 5 \\times 12 = \\thc{60\\ \\text{W}}'] }],
      lines: [
        { say: 'Here is a car headlamp on a twelve volt battery. The voltage is the energy given up by each coulomb, so every coulomb gives the lamp twelve joules.', show: ['w', 'w.charges', 'w.energy', 'w.voltage'], play: 'w.run' },
        { say: 'The current is the number of coulombs that pass each second. The ammeters read five amperes, so five coulombs pass through the lamp every second.', show: 'w.current', play: 'w.run' },
        { say: 'Five coulombs each second, with twelve joules from each one, is sixty joules each second. That is the power of the lamp: sixty watts.', show: 'w.power', play: 'w.run' },
        { say: 'So power is current times voltage. With the current in amperes and the voltage in volts, the power is in watts.', caption: 'So power is current times voltage: P = IV. With the current in amperes and the voltage in volts, the power is in watts.', show: 'eq', play: 'w.run' },
      ],
    },
    {
      chapter: 'Half the voltage',
      layout: 'center',
      main: [headlamp, { kind: 'math', id: 'half', size: 'md', lines: ['P = IV = 2.5 \\times 6 = \\thc{15\\ \\text{W}} \\qquad \\text{a quarter of } 60\\ \\text{W}'] }],
      lines: [
        { say: 'Now watch the same lamp as the supply is turned down from twelve volts to six volts.', show: ['w', 'w.charges', 'w.current', 'w.voltage', 'w.power'], play: 'w.dim', playDelay: 3 },
        { say: 'Each coulomb now gives the lamp only half as much energy. And with half the voltage, the current has halved as well, to two point five amperes.', play: 'w.dim' },
        { say: 'So the power is two point five times six, which is fifteen watts. Half the voltage gives only a quarter of the power, and the lamp is much dimmer.', show: 'half', play: 'w.dim' },
      ],
    },
    {
      chapter: 'Power in a resistor',
      layout: 'center',
      main: [
        heater,
        { kind: 'math', id: 'sq', size: 'md', lines: ['V = IR = 3 \\times 10 = 30\\ \\text{V} \\qquad P = IV = 3 \\times 30 = \\thc{90\\ \\text{W}}', 'P = I^2R = 3^2 \\times 10 = \\thc{90\\ \\text{W}}'] },
      ],
      lines: [
        { say: 'A current of three amperes flows through a resistor of ten ohms. What power does the resistor transfer as heat?', show: ['r', 'r.charges', 'r.current'], play: 'r.run' },
        { say: 'First find the voltage across it. V equals I R gives three times ten, which is thirty volts. Then the power is three times thirty, which is ninety watts.', caption: 'First find the voltage across it. V = IR gives 3 times 10, which is 30 volts. Then the power is 3 times 30, which is 90 watts.', show: ['r.voltage', 'r.power', 'sq.0'], play: 'r.run' },
        { say: 'There is a shortcut. Putting the two steps together gives power equals current squared times resistance. Three squared is nine, and nine times ten is ninety watts.', caption: 'There is a shortcut. Putting the two steps together gives P = I²R. Three squared is 9, and 9 times 10 is 90 watts.', show: 'sq.1', play: 'r.run' },
        { say: 'One warning. In P equals I V, the voltage is the voltage across that component. For a lamp in series with other components, that is only its share of the supply voltage.', caption: 'One warning. In P = IV, the voltage is the voltage across that component. For a lamp in series with other components, that is only its share of the supply voltage.' },
      ],
    },
    {
      chapter: 'Electrical energy',
      layout: 'center',
      main: [counting, { kind: 'math', id: 'en', size: 'md', lines: ['\\text{energy} = \\text{power} \\times \\text{time} \\qquad E = Pt = 60 \\times 120 = \\thc{7200\\ \\text{J}}'] }],
      lines: [
        { say: 'Power is energy each second, so the energy an appliance transfers is its power times the time it runs. Switch on the sixty watt headlamp, and watch the energy add up.', show: ['e', 'e.charges', 'e.power', 'e.clock', 'e.transferred'], play: 'e.count', playDelay: 7 },
        { say: 'Sixty joules every second. After five seconds, the lamp has transferred three hundred joules.' },
        { say: 'So in one hundred and twenty seconds, it transfers sixty times one hundred and twenty, which is seven thousand two hundred joules. Watts times seconds gives joules.', caption: 'So in 120 seconds, it transfers E = Pt = 60 × 120, which is 7200 joules. Watts times seconds gives joules.', show: 'en' },
      ],
    },
    {
      chapter: 'Kilowatt-hours and cost',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'kwh', tone: 'definition', title: 'Kilowatt-hour (kWh)', md: 'The energy transferred by a **1 kW** appliance running for **1 hour**. Energy in kWh = power in kW × time in hours.' },
        {
          kind: 'math',
          id: 'cost',
          size: 'md',
          lines: ['\\text{lamp: } 100\\ \\text{W} = 0.1\\ \\text{kW} \\qquad 0.1 \\times 20 = \\thc{2\\ \\text{kWh}}', '\\text{heater: } 2 \\times 5 = 10\\ \\text{kWh} \\qquad \\text{cost} = 10 \\times \\$0.20 = \\thc{\\$2.00}'],
        },
      ],
      lines: [
        { say: 'A joule is very small for household use. So electricity is sold by the kilowatt-hour. That is the energy transferred by a one kilowatt appliance running for one hour.', show: 'kwh' },
        { say: 'A one hundred watt lamp is on for twenty hours. First change watts to kilowatts. One hundred watts is zero point one kilowatts. Then zero point one times twenty is two kilowatt-hours.', show: 'cost.0' },
        { say: 'Now a cost. Suppose electricity costs twenty cents for each kilowatt-hour, and a two kilowatt heater runs for five hours. The energy is two times five, which is ten kilowatt-hours.', show: 'cost.1' },
        { say: 'The cost is the energy times the price of one kilowatt-hour. Ten times twenty cents is two dollars.' },
        { say: 'Keep the two sets of units apart. Watts with seconds give joules. Kilowatts with hours give kilowatt-hours. Watts times hours gives neither.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'try',
          prompt: 'A heater carries a current of 4 A when the voltage across it is 230 V. What is its power?',
          choices: ['57.5 W', '234 W', '920 W', '3680 W'],
          answer: 2,
          working: 'Power = current × voltage: $P = IV = 4 \\times 230 = 920\\ \\text{W}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A heater carries a current of four amperes when the voltage across it is two hundred and thirty volts. What is its power? Pause the video and try it.', show: 'try', wait: 6 },
        { say: 'Power is current times voltage. Four times two hundred and thirty is nine hundred and twenty watts. That is choice C.', show: 'try.answer' },
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
            'Electrical power: P = IV, in watts',
            'For a resistor, P = I²R',
            'Energy = power × time: watts × seconds gives joules',
            'Kilowatts × hours gives kilowatt-hours, the unit electricity is sold in',
            'Cost = energy in kWh × the price of one kWh',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Electrical power is current times voltage, in watts.', show: 'end.0' },
        { say: 'For a resistor, power is also current squared times resistance.', show: 'end.1' },
        { say: 'Energy is power times time. Watts times seconds gives joules.', show: 'end.2' },
        { say: 'Kilowatts times hours gives kilowatt-hours, the unit electricity is sold in.', show: 'end.3' },
        { say: 'And the cost is the energy in kilowatt-hours, times the price of one kilowatt-hour.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
