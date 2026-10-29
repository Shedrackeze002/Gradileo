import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cell, potentials, TONE } from './lib/c30-2b-figures.ts';

// A standard zinc half-cell joined to a standard hydrogen electrode: hydrogen gas bubbles over a
// platinum electrode in 1.0 mol/L hydrogen ions, and the voltmeter reads 0.76 V.
const she = figure('c', [
  cell({
    left: { electrode: '\\text{Zn}', solution: '\\ce{Zn(NO3)2(aq)}', role: '\\text{anode}', roleTone: TONE.anode },
    right: { electrode: '\\text{Pt}', solution: '1.0\\ \\text{mol/L}\\ \\ce{H+(aq)}', tone: 'adj', role: '\\text{cathode}', roleTone: TONE.cathode },
    bridge: '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}',
    electrons: 'right',
    reading: '0.76\\ \\text{V}',
    gas: '\\begin{gathered}\\ce{H2(g)}\\\\ 100\\ \\text{kPa}\\end{gathered}',
  }),
]);

// The measured half-cells on a scale: hydrogen at zero, copper above it and zinc below.
const scale = figure(
  's',
  [
    potentials({
      min: -1,
      max: 1,
      points: [
        { id: 'cu', value: 0.34, tex: '\\ce{Cu^2+/Cu}\\quad {+0.34}\\ \\text{V}', tone: 'adj' },
        { id: 'h', value: 0, tex: '\\ce{H+/H2}\\quad {0.00}\\ \\text{V}', tone: 'theta' },
        { id: 'zn', value: -0.76, tex: '\\ce{Zn^2+/Zn}\\quad {-0.76}\\ \\text{V}', tone: 'opp' },
      ],
    }),
  ],
  540,
);

const video: Explainer = {
  id: 'c30-2-7',
  lessonId: 'c30-2-7',
  title: 'Standard Cell Potentials, Part 1: The Standard Hydrogen Electrode',
  thumbnailTitle: 'The Standard Hydrogen Electrode',
  thumbnail: 'c',
  summary:
    'A voltmeter measures only the difference between two half-cells, so every half-cell is measured against the standard hydrogen electrode, defined as 0.00 V, under standard conditions of 1.0 mol/L, 100 kPa and 25 °C. A zinc half-cell gives 0.76 V and gives its electrons to hydrogen ions, so its standard reduction potential is −0.76 V; a potential is positive when the oxidising agent is stronger than hydrogen ions and negative when it is weaker.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'The Standard Hydrogen Electrode', subtitle: 'Where reduction potentials come from' }],
      lines: [
        { say: 'A zinc-copper cell makes about one point one volts, a cell in a car battery about two volts, and a lithium cell more than three volts.', show: 'title' },
        { say: 'The voltage of a cell measures how strongly the cathode pulls electrons compared with the anode, and it can be predicted from a table before the cell is ever built.' },
        { say: 'In this lesson, you will calculate standard cell potentials, and use them to decide whether a reaction is spontaneous. This part shows where the numbers in the table come from.' },
      ],
    },
    {
      chapter: 'A reference half-cell',
      layout: 'split',
      leftWidth: 640,
      left: [she],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Standard hydrogen electrode',
          md: 'A platinum electrode in $1.0\\ \\text{mol/L}$ $\\ce{H+(aq)}$, with hydrogen gas at $100\\ \\text{kPa}$ bubbling over it, at $25^\\circ\\text{C}$.',
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{2H+(aq) + 2e- -> H2(g)}', 'E^\\circ = 0.00\\ \\text{V}'] },
      ],
      lines: [
        { say: 'A voltmeter can only measure the difference between two half-cells, never one half-cell on its own. So chemists choose one half-cell as a reference, and give it a potential of exactly zero.' },
        {
          say: 'That reference is the standard hydrogen electrode: a platinum electrode in one point zero moles per litre hydrogen ions, with hydrogen gas at one hundred kilopascals bubbling over it, at twenty-five degrees Celsius.',
          show: ['c.r-beaker', 'c.r-electrode', 'c.gas', 'def'],
        },
        { say: 'Its half-reaction, two hydrogen ions and two electrons giving hydrogen gas, is given a potential of exactly zero point zero zero volts.', show: 'm' },
      ],
    },
    {
      chapter: 'Standard reduction potentials',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Standard reduction potential',
          md: 'The **standard reduction potential**, $E^\\circ$, of a half-cell is the voltage it produces with a standard hydrogen electrode, under standard conditions: $1.0\\ \\text{mol/L}$ solutions, gases at $100\\ \\text{kPa}$, and $25^\\circ\\text{C}$.',
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Positive** $E^\\circ$: the oxidising agent is **stronger** than $\\ce{H+}$.', '**Negative** $E^\\circ$: the oxidising agent is **weaker** than $\\ce{H+}$.'],
        },
      ],
      lines: [
        { say: 'The standard reduction potential of a half-cell, E naught, is the voltage it produces with a standard hydrogen electrode, under standard conditions.', show: 'def' },
        { say: 'Standard conditions mean one point zero moles per litre solutions, gases at one hundred kilopascals, and twenty-five degrees Celsius.' },
        { say: 'The potential is positive when the half-cell’s oxidising agent is stronger than hydrogen ions, and negative when it is weaker.', show: 'b' },
      ],
    },
    {
      chapter: 'Measuring zinc',
      layout: 'split',
      leftWidth: 640,
      left: [she],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Zinc is oxidised; $\\ce{H+}$ is reduced.', 'The voltmeter reads $0.76\\ \\text{V}$.', '$\\ce{Zn^2+}$ is a weaker oxidising agent than $\\ce{H+}$, so $E^\\circ = -0.76\\ \\text{V}$.'],
        },
      ],
      lines: [
        { say: 'Now join a standard zinc half-cell to the hydrogen electrode.', show: ['c.r-beaker', 'c.r-electrode', 'c.gas', 'c.l-beaker', 'c.l-electrode', 'c.wire', 'c.bridge'] },
        { say: 'Zinc is oxidised, and hydrogen ions are reduced, so electrons flow through the wire from the zinc to the platinum.', show: ['c.electrons', 'c.l-role', 'c.r-role', 'b.0'], focus: 'c.electrons' },
        { say: 'The voltmeter reads zero point seven six volts.', show: ['c.reading', 'b.1'], focus: 'c.reading' },
        {
          say: 'Zinc gives its electrons away to hydrogen ions, so zinc ions are weaker oxidising agents than hydrogen ions. The zinc half-cell has a standard reduction potential of negative zero point seven six volts.',
          show: 'b.2',
          focus: 'c',
        },
      ],
    },
    {
      chapter: 'Building the table',
      layout: 'split',
      leftWidth: 500,
      left: [scale],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Copper against hydrogen: $\\ce{Cu^2+}$ is reduced, so $E^\\circ = +0.34\\ \\text{V}$.',
            'Higher on the scale: a **stronger** oxidising agent.',
            'Measuring every half-cell this way builds the **redox table**.',
          ],
        },
      ],
      lines: [
        { say: 'Place the results on a scale. The hydrogen electrode sits at zero, and zinc sits zero point seven six volts below it.', show: ['s.axis', 's.h', 's.zn'] },
        {
          say: 'A copper half-cell measured the same way gives zero point three four volts, but this time copper two ions are reduced, and hydrogen is oxidised. Copper two ions are stronger oxidising agents than hydrogen ions, so their potential is plus zero point three four volts.',
          caption: 'A copper half-cell measured the same way gives 0.34 volts, but this time copper(II) ions are reduced, and hydrogen is oxidised. Copper(II) ions are stronger oxidising agents than hydrogen ions, so their potential is +0.34 volts.',
          show: ['s.cu', 'b.0'],
          focus: 's.cu',
        },
        { say: 'The higher a half-reaction sits, the stronger its oxidising agent. Measuring every half-cell this way builds the redox table.', show: ['b.1', 'b.2'], focus: 's' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A standard nickel half-cell is joined to a standard hydrogen electrode. Nickel is oxidised, and the voltmeter reads $0.26\\ \\text{V}$. What is the standard reduction potential of $\\ce{Ni^2+(aq) + 2e- -> Ni(s)}$?',
          choices: ['$+0.26\\ \\text{V}$', '$-0.26\\ \\text{V}$', '$0.00\\ \\text{V}$', '$-0.52\\ \\text{V}$'],
          answer: 1,
          working: 'Nickel gives its electrons to hydrogen ions, so nickel(II) ions are weaker oxidising agents than $\\ce{H+}$, and the potential is negative: $-0.26\\ \\text{V}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A standard nickel half-cell is joined to a standard hydrogen electrode. Nickel is oxidised, and the voltmeter reads zero point two six volts. What is the standard reduction potential of the nickel half-cell? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, negative zero point two six volts. Nickel gives its electrons to hydrogen ions, so nickel two ions are weaker oxidising agents than hydrogen ions, and the potential is negative. Choice A forgets the sign.',
          caption: 'The answer is B, −0.26 volts. Nickel gives its electrons to hydrogen ions, so nickel(II) ions are weaker oxidising agents than hydrogen ions, and the potential is negative. Choice A forgets the sign.',
          show: 'q.answer',
        },
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
            'The **standard hydrogen electrode** is the reference: $E^\\circ = 0.00\\ \\text{V}$.',
            'Standard conditions: $1.0\\ \\text{mol/L}$, $100\\ \\text{kPa}$ and $25^\\circ\\text{C}$.',
            '$E^\\circ$ is positive for an oxidising agent stronger than $\\ce{H+}$, and negative for a weaker one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Reduction potentials are measured against the standard hydrogen electrode, defined as zero point zero zero volts.', show: 'sum.0' },
        { say: 'Standard conditions are one point zero moles per litre, one hundred kilopascals, and twenty-five degrees Celsius.', show: 'sum.1' },
        { say: 'A potential is positive for an oxidising agent stronger than hydrogen ions, and negative for a weaker one. In part two, you will use these potentials to work out the voltage of any cell. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
