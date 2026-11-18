import type { CircuitEl, Explainer } from '@/video/script.ts';

// Lesson 2.6, first half: a circuit that mixes series and parallel. A 12 V battery drives a 4 Ω
// resistor in series with a parallel pair of 6 Ω and 3 Ω. The pair is 2 Ω, so the circuit is 6 Ω
// and the battery supplies 2 A; the pair has 4 V across it, so its branches carry 0.67 A and
// 1.33 A. Every reading is worked out by src/video/circuit.ts.

/** 6 V across 6 Ω and 3 Ω on two branches: 1 A and 2 A, so 3 A from the battery and 2 Ω in all. */
const pair: CircuitEl = {
  kind: 'circuit',
  id: 'pair',
  volts: 6,
  layout: 'parallel',
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 6 },
    { id: 'r2', kind: 'resistor', ohms: 3 },
  ],
  height: 400,
  // The charges move only while a clip plays: `run` for a long line, and `brief` for a short one.
  clips: { run: { phases: [{ dur: 11 }] }, brief: { phases: [{ dur: 7 }] } },
};

/** 12 V, a 4 Ω resistor, and then the same pair: 2 A, with 8 V across the 4 Ω and 4 V across the pair. */
const mixed: CircuitEl = {
  kind: 'circuit',
  id: 'mix',
  volts: 12,
  layout: 'parallel',
  lead: { id: 'r0', kind: 'resistor', ohms: 4 },
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 6 },
    { id: 'r2', kind: 'resistor', ohms: 3 },
  ],
  height: 400,
  poster: 'run',
  // The charges move only while a clip plays: `run` for a long line, and `brief` for a short one.
  clips: { run: { phases: [{ dur: 11 }] }, brief: { phases: [{ dur: 7 }] } },
};

const video: Explainer = {
  id: 'p30-2-6',
  lessonId: 'p30-2-6',
  title: 'Combined Circuits',
  thumbnail: 'mix',
  summary:
    'Most real circuits mix series and parallel connections. Replace a parallel pair by the single resistor that is equal to it, find the current from the battery with Ohm\'s law, then work back to the potential difference across the pair, the current in each branch and the power of each resistor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Combined Circuits', subtitle: 'Series and parallel in one circuit' }],
      lines: [
        { say: 'In Grade 10 you met resistors in series, and resistors in parallel. Most real circuits use both at once.', show: 'title' },
        { say: 'The method is to make the circuit simpler, one step at a time.' },
      ],
    },
    {
      chapter: 'A parallel pair',
      layout: 'center',
      main: [pair, { kind: 'math', id: 'eq', size: 'md', lines: ['\\dfrac{1}{R} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{2} \\qquad R = \\thc{2\\ \\Omega}'] }],
      lines: [
        { say: 'Start with a 6 ohm resistor and a 3 ohm resistor in parallel, on a 6 volt battery. Each branch has the full 6 volts across it, so the currents are 1 ampere and 2 amperes.', show: ['pair', 'pair.charges', 'pair.current'], play: 'pair.run' },
        { say: 'The battery supplies 3 amperes. So the pair behaves like a single resistor of 6 volts divided by 3 amperes. That is 2 ohms.', play: 'pair.brief' },
        { say: 'The rule for parallel resistors gives the same answer. One over R is one sixth plus one third, which is one half. Turn it over, and R is 2 ohms.', show: 'eq' },
        { say: 'That is less than either resistor, because the second branch gives the charge another path.' },
      ],
    },
    {
      chapter: 'A circuit with both',
      layout: 'center',
      main: [
        mixed,
        { kind: 'math', id: 'm', size: 'md', lines: ['R_{\\text{pair}} = 2\\ \\Omega \\qquad R = 4 + 2 = \\thc{6\\ \\Omega}', 'I = \\dfrac{V}{R} = \\dfrac{12}{6} = \\thc{2\\ \\text{A}}'] },
      ],
      lines: [
        { say: 'Now put a 4 ohm resistor in series with that pair, and connect a 12 volt battery. All of the charge passes through the 4 ohm resistor. Then it divides at the junction, and joins again on the other side.', show: ['mix', 'mix.charges'], play: 'mix.run' },
        { say: 'To find the current, replace the parallel pair by the single resistor that is equal to it: 2 ohms. Now the circuit is a simple series loop, and 4 plus 2 is 6 ohms.', show: 'm.0', play: 'mix.run' },
        { say: 'So the current from the battery is 12 volts divided by 6 ohms. That is 2 amperes.', show: 'm.1', play: 'mix.brief' },
      ],
    },
    {
      chapter: 'Inside the pair',
      layout: 'center',
      main: [
        mixed,
        {
          kind: 'math',
          id: 'p',
          size: 'md',
          lines: ['V_{\\text{pair}} = IR = 2 \\times 2 = \\hyp{4\\ \\text{V}}', 'I_1 = \\dfrac{4}{6} = \\thc{0.67\\ \\text{A}} \\qquad I_2 = \\dfrac{4}{3} = \\thc{1.33\\ \\text{A}}'],
        },
      ],
      lines: [
        { say: 'How does the current divide? The pair behaves as 2 ohms, and it carries the whole 2 amperes. So the potential difference across it is 2 times 2, which is 4 volts.', show: ['mix', 'mix.charges', 'mix.voltage', 'p.0'], play: 'mix.run' },
        { say: 'Both branches have those 4 volts across them. In the 6 ohm resistor, the current is 4 divided by 6: 0.67 amperes. In the 3 ohm resistor, it is 4 divided by 3: 1.33 amperes.', show: ['p.1', 'mix.current'], play: 'mix.run' },
        { say: 'Check the answer. The two branch currents add up to 2 amperes, the battery current. And the 4 ohm resistor has 8 volts across it. 8 plus 4 is 12, the battery voltage.', play: 'mix.run' },
        { say: 'Notice that the smaller resistance takes the larger current.' },
      ],
    },
    {
      chapter: 'Power',
      layout: 'center',
      main: [
        mixed,
        { kind: 'math', id: 'w', size: 'md', lines: ['P = I^2R = 2^2 \\times 4 = \\opp{16\\ \\text{W}}', 'P_{\\text{battery}} = VI = 12 \\times 2 = \\opp{24\\ \\text{W}}'] },
      ],
      lines: [
        { say: 'Each resistor turns electrical energy into heat. The 4 ohm resistor carries the whole battery current, so its power is 2 squared times 4, which is 16 watts.', show: ['mix', 'mix.charges', 'mix.power', 'w.0'], play: 'mix.run' },
        { say: 'The battery supplies 12 volts times 2 amperes: 24 watts. So the other 8 watts are transferred in the parallel pair.', show: 'w.1', play: 'mix.brief' },
        { say: 'Watch the charges. They are bright where they still carry energy. They give up two thirds of it in the 4 ohm resistor, and the rest in the pair.', show: 'mix.energy', play: 'mix.run' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 9 V battery is connected to a 1 Ω resistor in series with a parallel pair of 6 Ω and 3 Ω. What is the current from the battery?',
          choices: ['0.90 A', '3.0 A', '4.5 A', '9.0 A'],
          answer: 1,
          working: 'The pair of 6 Ω and 3 Ω is 2 Ω. In series with 1 Ω: $1 + 2 = 3\\ \\Omega$. So $I = \\dfrac{9}{3} = 3.0$ A.',
        },
      ],
      lines: [
        { say: 'Your turn. A 9 volt battery is connected to a 1 ohm resistor, in series with a parallel pair of 6 ohms and 3 ohms. What is the current from the battery? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The pair of 6 ohms and 3 ohms is 2 ohms. Add the 1 ohm resistor in series, and the total is 3 ohms. 9 volts divided by 3 ohms is 3 amperes. That is choice B.', show: 'q.answer' },
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
            'In parallel, $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$: **less** than the smallest branch',
            'Replace each parallel group by **one resistor**, then add in series',
            'The battery current is $I = \\dfrac{V}{R}$ for the whole circuit',
            'The potential difference across a group is the battery current times the resistance of the group',
            'Power: $P = VI = I^2R$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Resistors in parallel have a total resistance that is less than the smallest branch.', show: 'sum.0' },
        { say: 'In a combined circuit, replace each parallel group by one resistor, then add the resistances in series.', show: 'sum.1' },
        { say: 'Ohm\'s law for the whole circuit gives the current from the battery.', show: 'sum.2' },
        { say: 'The potential difference across a group is the battery current times the resistance of the group. That gives the current in each branch.', show: 'sum.3' },
        { say: 'And the power of a resistor is the potential difference times the current, or the current squared times the resistance.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
