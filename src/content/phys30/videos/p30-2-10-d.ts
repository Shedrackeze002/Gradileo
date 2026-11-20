import type { Explainer, PowerlineEl, TransformerEl } from '@/video/script.ts';

// Lesson 2.10, fourth part: the transformer. Two coils on one iron core: the alternating current in
// the primary makes a flux in the core that changes all the time, and that flux induces an emf in
// the secondary. A screen beside each coil draws its voltage, both to one scale, so the turns rule
// Vs ÷ Vp = Ns ÷ Np can be seen as turns are wound on the secondary (src/video/transformer.ts).
// A battery gives one kick as its switch closes and then nothing. Last, a power line shows why
// electrical energy is sent at a high voltage: the same power needs less current, and the heat
// wasted in the line, I²R, falls with the square of the current.

/** A small transformer: 100 turns and 50 turns on a 12 V alternating supply, with a lamp. One cycle of the supply takes four seconds of video. */
const two: TransformerEl = {
  kind: 'transformer',
  id: 'two',
  turns: [100, 50],
  volts: 12,
  load: 6,
  height: 400,
  // Each clip is a little longer than its line of narration, so the supply never stops between two lines.
  clips: { a: { phases: [{ dur: 12.4 }] }, b: { phases: [{ dur: 15.6 }] } },
};

/** The same transformer with a screen beside each coil; then the secondary is wound up to 200 turns. */
const rule: TransformerEl = {
  ...two,
  id: 'rule',
  height: 390,
  // The thumbnail catches it with 200 turns on the secondary, late in a sweep of the screens.
  poster: 'up',
  thumb: ['flux', 'turns', 'voltage'],
  clips: {
    a: { phases: [{ dur: 14.5 }] },
    b: { phases: [{ dur: 14 }] },
    up: { phases: [{ dur: 6, secondary: 200 }, { dur: 7.2 }] },
  },
};

/** The lesson's transformer: 1000 turns and 50 turns on a 240 V supply. Its 12 V secondary gives a lamp of 4.0 Ω a current of 3.0 A. */
const mains: TransformerEl = {
  kind: 'transformer',
  id: 'mains',
  turns: [1000, 50],
  volts: 240,
  load: 4,
  height: 390,
  clips: { a: { phases: [{ dur: 14.6 }] }, b: { phases: [{ dur: 11.4 }] } },
};

/** The same transformer, to look at the power that goes in and the power that comes out. */
const power: TransformerEl = { ...mains, id: 'power', height: 380, clips: { a: { phases: [{ dur: 13.7 }] }, b: { phases: [{ dur: 15.8 }] }, c: { phases: [{ dur: 14.2 }] } } };

/** A battery and a switch on the primary of a one-to-one transformer: the switch is closed, held, and opened again. */
const battery: TransformerEl = {
  kind: 'transformer',
  id: 'battery',
  turns: [100, 100],
  volts: 12,
  dc: true,
  load: 6,
  height: 420,
  clips: { on: { phases: [{ dur: 6, on: true }] }, hold: { phases: [{ dur: 6 }] }, off: { phases: [{ dur: 6, on: false }] } },
};

/** The lesson's power line: 200 kW sent along 5.0 Ω, first at 4000 V and then at 40 000 V. */
const grid: PowerlineEl = {
  kind: 'powerline',
  id: 'grid',
  watts: 200000,
  ohms: 5,
  volts: 4000,
  height: 360,
  clips: {
    a: { phases: [{ dur: 18 }] },
    b: { phases: [{ dur: 15 }] },
    up: { phases: [{ dur: 6, volts: 40000 }, { dur: 7.2 }] },
    c: { phases: [{ dur: 10.2 }] },
  },
};

const video: Explainer = {
  id: 'p30-2-10-d',
  lessonId: 'p30-2-10',
  title: 'Transformers',
  thumbnail: 'rule',
  summary:
    'A transformer changes the voltage of an alternating supply with two coils on one iron core. See the changing flux carry energy from one coil to the other, use the turns rule Vs ÷ Vp = Ns ÷ Np and the power rule VpIp = VsIs, find out why a battery will not do, and see why power is sent across the country at a high voltage.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Transformers', subtitle: 'How a voltage is stepped up or down' }],
      lines: [
        { say: 'A wall socket gives far too large a voltage for a phone. Something in the charger has to bring the voltage down.', show: 'title' },
        { say: 'That something is a transformer. It has no moving parts at all, and it works by electromagnetic induction.' },
      ],
    },
    {
      chapter: 'Two coils on one core',
      layout: 'center',
      main: [two],
      lines: [
        { say: 'A transformer is two coils of wire, wound on the same iron core. The primary coil is joined to an alternating supply. The secondary coil is joined to a lamp. No wire joins the two coils.', show: ['two', 'two.turns'] },
        { say: 'The alternating current in the primary coil makes a magnetic flux in the core. And because the current keeps changing, the flux keeps changing too.', show: 'two.flux', play: 'two.a' },
        { say: 'The iron core carries that changing flux through the secondary coil. By Faraday\'s law, a changing flux induces an emf. So the lamp lights, and the energy has crossed from one coil to the other.', play: 'two.b' },
      ],
    },
    {
      chapter: 'The turns rule',
      layout: 'center',
      main: [rule, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}'] }],
      lines: [
        { say: 'The same flux passes through every turn of both coils, so every turn has the same emf. The voltage of each coil is in proportion to its number of turns.', show: ['rule', 'rule.flux', 'rule.turns', 'rule.voltage', 'm.0'], play: 'rule.a' },
        { say: 'Here the primary has 100 turns, and the secondary has 50. Half the turns give half the voltage: 12 volts in, and 6.0 volts out. This is a step-down transformer.', play: 'rule.b' },
        { say: 'Now wind more turns on the secondary. With 200 turns, it has twice the turns of the primary, and twice the voltage: 24 volts. This is a step-up transformer.', play: 'rule.up' },
      ],
    },
    {
      chapter: 'A worked example',
      layout: 'center',
      main: [mains, { kind: 'math', id: 'e', size: 'md', lines: ['V_s = V_p \\times \\dfrac{N_s}{N_p} = 240 \\times \\dfrac{50}{1000} = \\thc{12\\ \\text{V}}'] }],
      lines: [
        { say: 'This transformer has 1,000 turns on its primary coil, and 50 turns on its secondary. Its primary is joined to a 240 volt alternating supply. What is the secondary voltage?', show: ['mains', 'mains.turns', 'mains.flux'], play: 'mains.a' },
        { say: 'The secondary has one twentieth of the turns, so it has one twentieth of the voltage. 240, times 50, divided by 1,000, is 12 volts.', show: ['mains.voltage', 'e.0'], play: 'mains.b' },
      ],
    },
    {
      chapter: 'Power in, power out',
      layout: 'center',
      main: [power, { kind: 'math', id: 'p', size: 'md', lines: ['V_pI_p = V_sI_s', 'I_p = \\dfrac{V_sI_s}{V_p} = \\dfrac{12 \\times 3.0}{240} = \\thc{0.15\\ \\text{A}}'] }],
      lines: [
        { say: 'A transformer cannot create energy, and an ideal transformer wastes none. So the power that goes into the primary equals the power that comes out of the secondary.', show: ['power', 'power.turns', 'power.flux', 'power.voltage', 'p.0'], play: 'power.a' },
        { say: 'The 12 volt secondary gives the lamp 3.0 amperes. That is 12 times 3.0, which is 36 watts. So the primary takes 36 watts too. And 36, divided by 240, is 0.15 amperes.', show: ['power.current', 'power.power', 'p.1'], play: 'power.b' },
        { say: 'Notice the trade. The voltage went down twenty times, so the current went up twenty times. A step-up transformer does the reverse. It gives more voltage, less current, and never more power.', play: 'power.c' },
      ],
    },
    {
      chapter: 'Why not a battery?',
      layout: 'center',
      main: [battery],
      lines: [
        { say: 'A transformer needs a supply that keeps changing. To see why, join the primary to a battery instead, and close the switch.', show: ['battery', 'battery.turns', 'battery.flux', 'battery.voltage'], play: 'battery.on', playDelay: 6.5 },
        { say: 'For a moment the flux was growing, and the secondary gave one short kick. Now the current is steady, so the flux is steady, and the secondary gives nothing at all. The lamp is dark.', play: 'battery.hold' },
        { say: 'Open the switch, and there is one more kick, the other way. A steady field induces nothing, however strong it is.', play: 'battery.off', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Sending power a long way',
      layout: 'center',
      main: [grid, { kind: 'math', id: 'w', size: 'md', lines: ['\\text{at } 4000\\ \\text{V:}\\quad I^2R = 50^2 \\times 5.0 = \\opp{12\\,500\\ \\text{W}}', '\\text{at } 40\\,000\\ \\text{V:}\\quad I^2R = 5.0^2 \\times 5.0 = \\good{125\\ \\text{W}}'] }],
      lines: [
        { say: 'Transformers are the reason that mains electricity alternates. A power station sends its power a long way, through cables that have resistance. The current heats the cables, and that power is wasted. Its size is I squared R.', caption: 'Transformers are the reason that mains electricity alternates. A power station sends its power a long way, through cables that have resistance. The current heats the cables, and that power is wasted. Its size is I²R.', show: ['grid', 'grid.voltage', 'grid.current'], play: 'grid.a' },
        { say: 'This station sends 200 kilowatts along a line of 5.0 ohms. At 4,000 volts, the current is 50 amperes. So the line wastes 50 squared, times 5.0, which is 12,500 watts.', show: ['grid.loss', 'w.0'], play: 'grid.b' },
        { say: 'Now step the voltage up ten times, to 40,000 volts. The same power needs only 5.0 amperes. And the waste falls a hundred times, to 125 watts.', show: 'w.1', play: 'grid.up' },
        { say: 'So a step-up transformer at the station raises the voltage for the journey, and step-down transformers near your home bring it down again.', play: 'grid.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A transformer has 200 turns on its primary coil and 4000 turns on its secondary coil. Its primary is joined to a 12 V alternating supply. What is the secondary voltage?',
          choices: ['240 V', '24 V', '0.60 V', '2400 V'],
          answer: 0,
          working: '$V_s = V_p \\times \\dfrac{N_s}{N_p} = 12 \\times \\dfrac{4000}{200} = 240$ V. The secondary has 20 times the turns, so it has 20 times the voltage.',
        },
      ],
      lines: [
        { say: 'Your turn. A transformer has 200 turns on its primary coil, and 4,000 turns on its secondary coil. Its primary is joined to a 12 volt alternating supply. What is the secondary voltage? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The secondary has 20 times the turns of the primary, so it has 20 times the voltage. 12 times 20 is 240 volts. That is choice "A".', caption: 'The secondary has 20 times the turns of the primary, so it has 20 times the voltage. 12 times 20 is 240 volts. That is choice A.', show: 'q.answer' },
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
            'A **transformer** is two coils on one iron core, and it needs an **alternating** supply',
            'The turns rule: $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}$',
            'More turns on the secondary step the voltage up; fewer step it down',
            'An ideal transformer passes on all of the power: $V_pI_p = V_sI_s$',
            'Power is sent at a high voltage, so that the current, and the heat $I^2R$, are small',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A transformer is two coils on one iron core, and it needs an alternating supply.', show: 'sum.0' },
        { say: 'The voltages of the two coils are in the same ratio as their turns.', show: 'sum.1' },
        { say: 'More turns on the secondary step the voltage up, and fewer step it down.', show: 'sum.2' },
        { say: 'An ideal transformer passes on all of the power.', show: 'sum.3' },
        { say: 'And power is sent at a high voltage, so that the current, and the heat wasted in the cables, are small.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
