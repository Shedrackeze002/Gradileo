import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 5.4: parallel circuits. A 12 V supply has 4 Ω and 6 Ω on two branches: each has the
// full 12 V across it, the charges split at the junction into 3 A and 2 A, and 5 A flows from the
// supply. One branch beside two shows that adding a branch draws more current, so the total
// resistance falls; the rule 1/R = 1/R₁ + 1/R₂ is worked for 6 Ω with 3 Ω and for two of 10 Ω; and
// one of three lamps fails while the other two stay lit. The readings are worked out by
// src/video/circuit.ts.

// 12 V across 4 Ω and 6 Ω on two branches: 3 A and 2 A, 5 A from the supply.
const branches: CircuitEl = {
  kind: 'circuit',
  id: 'p',
  volts: 12,
  layout: 'parallel',
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 4 },
    { id: 'r2', kind: 'resistor', ohms: 6 },
  ],
  height: 400,
  poster: 'run',
  clips: { run: { phases: [{ dur: 6 }] } },
};

// The 4 Ω resistor alone on the supply, beside the two branches.
const alone: CircuitEl = { kind: 'circuit', id: 'one', volts: 12, layout: 'parallel', parts: [{ id: 'r1', kind: 'resistor', ohms: 4 }], height: 360, clips: { run: { phases: [{ dur: 6 }] } } };
const both: CircuitEl = { ...branches, id: 'two', height: 360, poster: undefined };

// Three lamps on three branches: the middle one fails, and the others stay lit.
const lamp = (id: string) => ({ id, kind: 'lamp' as const, ohms: 6, label: 'Lamp' });
const house: CircuitEl = {
  kind: 'circuit',
  id: 'h',
  volts: 12,
  layout: 'parallel',
  parts: [lamp('a'), lamp('b'), lamp('c')],
  height: 400,
  clips: {
    run: { phases: [{ dur: 5 }] },
    fail: { phases: [{ dur: 2 }, { dur: 4, set: { broken: ['b'] } }] },
  },
};

const video: Explainer = {
  id: 'p10-5-4',
  lessonId: 'p10-5-4',
  title: 'Parallel Circuits',
  thumbnail: 'p',
  summary:
    'In a parallel circuit every component has its own branch. Watch the charges split at a junction and join up again, see why every branch has the full supply voltage, and add the branch currents to find the current from the supply. Then find the total resistance of two resistors in parallel, and see why one failed lamp leaves the others lit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electricity', title: 'Parallel Circuits', subtitle: 'A branch for every component' }],
      lines: [
        { say: 'When one lamp in a house fails, the others stay on. And each lamp can be switched on and off without touching the rest.', show: 'title' },
        { say: 'That is because the lamps are wired in parallel. Every lamp sits on its own branch, connected straight across the supply.' },
      ],
    },
    {
      chapter: 'Branches',
      layout: 'center',
      main: [
        branches,
        { kind: 'math', id: 'eq', size: 'md', lines: ['I_1 = \\dfrac{12}{4} = \\thc{3\\ \\text{A}} \\qquad I_2 = \\dfrac{12}{6} = \\thc{2\\ \\text{A}} \\qquad I = 3 + 2 = \\thc{5\\ \\text{A}}'] },
      ],
      lines: [
        { say: 'Here a twelve volt battery is connected to two resistors in parallel, of four ohms and six ohms. Each resistor is on its own branch. Watch the charges at the first junction. Some turn down the first branch, and the rest carry on to the second.', show: ['p', 'p.charges'], play: 'p.run' },
        { say: 'Both ends of each branch are joined straight to the battery. So every branch has the full supply voltage across it. Here that is twelve volts across each resistor.', show: 'p.voltage', play: 'p.run' },
        { say: 'So Ohm’s law gives the current in each branch. In the four ohm resistor, it is twelve divided by four, which is three amperes. In the six ohm resistor, it is twelve divided by six, which is two amperes.', show: ['p.current', 'eq'], play: 'p.run' },
        { say: 'The smaller resistance carries the larger current. And no charge is lost at a junction, so the current from the supply is the sum of the branch currents. Three plus two is five amperes.', play: 'p.run' },
        { say: 'Do not share the voltage between the branches. Voltage is shared in series. In parallel, it is the current that is shared.' },
      ],
    },
    {
      chapter: 'Adding a branch',
      layout: 'split',
      leftWidth: 544,
      left: [alone, { kind: 'text', id: 'l1', size: 'md', md: 'One branch: **3 A** from the supply' }],
      right: [both, { kind: 'text', id: 'l2', size: 'md', md: 'Two branches: **5 A** from the supply' }],
      lines: [
        { say: 'On the left, the four ohm resistor is alone on the battery, and three amperes flows from the supply.', show: ['one', 'one.charges', 'one.current', 'l1'], play: 'one.run' },
        { say: 'On the right, the six ohm branch has been added. The first branch still carries its three amperes, and the new branch carries two more. So five amperes flows from the same supply.', show: ['two', 'two.charges', 'two.current', 'l2'], play: ['one.run', 'two.run'] },
        { say: 'More current from the same voltage means less resistance. Adding a branch gives the charge an extra path, so the total resistance goes down. It is always less than the smallest resistance.', play: ['one.run', 'two.run'] },
      ],
    },
    {
      chapter: 'Total resistance in parallel',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rule', size: 'lg', lines: ['\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}'] },
        {
          kind: 'math',
          id: 'ex',
          size: 'md',
          lines: [
            '\\dfrac{1}{R} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{6} + \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2} \\qquad R = \\thc{2\\ \\Omega}',
            '\\dfrac{1}{R} = \\dfrac{1}{10} + \\dfrac{1}{10} = \\dfrac{2}{10} \\qquad R = \\dfrac{10}{2} = \\thc{5\\ \\Omega}',
          ],
        },
        { kind: 'callout', id: 'flip', tone: 'mistake', title: 'Forgetting to turn the fraction over', md: 'One half is **1 ÷ R**, not R. Turn it over: the total is **2 Ω**, not 0.5 Ω.' },
      ],
      lines: [
        { say: 'For two resistors in parallel, there is a rule for the total resistance. One over R equals one over R one, plus one over R two.', caption: 'For two resistors in parallel, there is a rule for the total resistance: 1/R = 1/R₁ + 1/R₂.', show: 'rule' },
        { say: 'Take resistors of six ohms and three ohms. One sixth plus one third is one sixth plus two sixths, which is three sixths, or one half.', show: 'ex.0' },
        { say: 'That half is one over R, so turn it upside down. The total resistance is two ohms, which is less than either resistor.', show: 'flip' },
        { say: 'Now take two resistors of ten ohms each. One tenth plus one tenth is two tenths. Turn it over, and the total is ten divided by two, which is five ohms. Two equal resistors in parallel give half of one.', show: 'ex.1' },
      ],
    },
    {
      chapter: 'If one branch fails',
      layout: 'center',
      main: [house, { kind: 'text', id: 'home', size: 'md', md: 'In parallel, each branch works **on its own**. If one fails, the others carry on.' }],
      lines: [
        { say: 'Here are three lamps in parallel, like the lamps in a house. Each has the full twelve volts across it, and carries two amperes. Six amperes flows from the supply.', show: ['h', 'h.charges', 'h.current'], play: 'h.run' },
        { say: 'Now the middle lamp fails. Its branch is broken, so no charge flows through it. But the other two lamps still have the full voltage, and they stay just as bright.', play: 'h.fail', playDelay: 1 },
        { say: 'The supply now gives only four amperes, two for each working lamp. In parallel, each branch works on its own.', show: 'home', play: 'h.fail' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'try',
          prompt: 'Resistors of 12 Ω and 4 Ω are connected in parallel. What is their total resistance?',
          choices: ['16 Ω', '3 Ω', '8 Ω', '0.33 Ω'],
          answer: 1,
          working: '$\\dfrac{1}{R} = \\dfrac{1}{12} + \\dfrac{1}{4} = \\dfrac{1}{12} + \\dfrac{3}{12} = \\dfrac{4}{12} = \\dfrac{1}{3}$, so $R = 3\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Your turn. Resistors of twelve ohms and four ohms are connected in parallel. What is their total resistance? Pause the video and try it.', show: 'try', wait: 6 },
        { say: 'One twelfth plus one quarter is one twelfth plus three twelfths, which is four twelfths, or one third. Turn it over, and the total resistance is three ohms. That is choice B.', show: 'try.answer' },
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
            'In parallel, every branch has the full supply voltage across it',
            'The current from the supply is the sum of the branch currents',
            'The smaller resistance carries the larger current',
            'Two resistors in parallel: 1/R = 1/R₁ + 1/R₂',
            'Adding a branch lowers the total resistance. If one branch breaks, the others still work',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In parallel, every branch has the full supply voltage across it.', show: 'end.0' },
        { say: 'The current from the supply is the sum of the branch currents.', show: 'end.1' },
        { say: 'The smaller resistance carries the larger current.', show: 'end.2' },
        { say: 'For two resistors in parallel, one over the total resistance is one over the first, plus one over the second.', show: 'end.3' },
        { say: 'And adding a branch lowers the total resistance. If one branch breaks, the others still work.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
