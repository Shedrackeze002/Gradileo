import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cell, halfCell, TONE, type HalfCell } from './lib/c30-2b-figures.ts';

// A strip of zinc standing in copper(II) sulfate solution: the electrons pass straight across.
const strip = figure('h', [halfCell({ electrode: '\\text{Zn}', solution: '\\ce{CuSO4(aq)}', tone: 'adj', ion: '\\ce{Cu^2+}' })], 470);

// The zinc–copper cell of the lesson: zinc in zinc nitrate, copper in copper(II) nitrate, a wire
// through a voltmeter and a salt bridge of potassium nitrate.
const zn: HalfCell = { electrode: '\\text{Zn}', solution: '\\ce{Zn(NO3)2(aq)}', role: '\\text{anode}', roleTone: TONE.anode };
const cu: HalfCell = { electrode: '\\text{Cu}', solution: '\\ce{Cu(NO3)2(aq)}', tone: 'adj', role: '\\text{cathode}', roleTone: TONE.cathode };
const bridge = '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}';
const zinc = figure('c', [cell({ left: zn, right: cu, bridge })]);
// The same cell drawn smaller, beside the table, without the salt bridge's name.
const small = figure('c', [cell({ left: zn, right: cu })]);
const whole = ['c.l-beaker', 'c.l-electrode', 'c.r-beaker', 'c.r-electrode', 'c.wire', 'c.bridge'];

const video: Explainer = {
  id: 'c30-2-6',
  lessonId: 'c30-2-6',
  title: 'Voltaic Cells, Part 1: The Parts of a Voltaic Cell',
  thumbnailTitle: 'The Parts of a Voltaic Cell',
  thumbnail: 'c',
  summary:
    'A voltaic cell turns the energy of a spontaneous redox reaction into electrical energy by making the electrons travel through a wire. Two half-cells, each an electrode in an electrolyte, are joined by a wire and by a salt bridge or a porous cup. Oxidation happens at the anode and reduction at the cathode ("An Ox, Red Cat"), and the anode is the reducing agent lower in the redox table: in the zinc–copper cell, zinc is the anode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'The Parts of a Voltaic Cell', subtitle: 'Sending the electrons through a wire' }],
      lines: [
        { say: 'Batteries power phones, torches, hearing aids and cars, and every one of them runs on a spontaneous redox reaction.', show: 'title' },
        { say: 'In this lesson, you will see how a voltaic cell turns that reaction into an electric current. This part names its parts; later parts follow what moves, and write a whole cell on one line.' },
      ],
    },
    {
      chapter: 'Through a wire',
      layout: 'split',
      leftWidth: 440,
      left: [strip],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Voltaic cell', md: 'A **voltaic cell** (or galvanic cell) changes the chemical energy of a spontaneous redox reaction into electrical energy, by making the electrons travel through an external circuit.' },
      ],
      lines: [
        {
          say: 'When a strip of zinc stands in copper two sulfate solution, electrons pass straight from zinc atoms to copper two ions, and the energy of the reaction only warms the solution.',
          caption: 'When a strip of zinc stands in copper(II) sulfate solution, electrons pass straight from zinc atoms to copper(II) ions, and the energy of the reaction only warms the solution.',
          show: ['h.beaker', 'h.electrode', 'h.ion', 'm'],
        },
        { say: 'Keep the two half-reactions in separate containers, and the electrons must travel through a wire to get from one to the other. A flow of electrons through a wire is an electric current.' },
        { say: 'That is a voltaic cell, or galvanic cell: it changes the chemical energy of a spontaneous redox reaction into electrical energy.', show: 'def' },
      ],
    },
    {
      chapter: 'Two half-cells',
      layout: 'split',
      leftWidth: 640,
      left: [zinc],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Electrode**: a solid conductor, often a metal strip.',
            '**Electrolyte**: a solution of ions that conducts.',
            '**Salt bridge**: a tube of an electrolyte whose ions do not react.',
            '**Porous cup**: a pot whose pores let ions through.',
          ],
        },
      ],
      lines: [
        {
          say: 'A voltaic cell has two half-cells, each an electrode standing in an electrolyte. Here, zinc stands in zinc nitrate solution, and copper in copper two nitrate solution.',
          caption: 'A voltaic cell has two half-cells, each an electrode standing in an electrolyte. Here, zinc stands in zinc nitrate solution, and copper in copper(II) nitrate solution.',
          show: ['c.l-beaker', 'c.l-electrode', 'c.r-beaker', 'c.r-electrode'],
        },
        { say: 'An electrode is a solid conductor, often a strip of metal, where electrons enter or leave the cell.', show: 'b.0', focus: ['c.l-electrode', 'c.r-electrode'] },
        { say: 'An electrolyte is a solution of ions that conducts electricity.', show: 'b.1', focus: ['c.l-beaker', 'c.r-beaker'] },
        { say: 'A wire joins the electrodes, here through a voltmeter.', show: 'c.wire', focus: 'c.wire' },
        { say: 'A salt bridge joins the solutions. It is a tube of an electrolyte whose ions do not react, such as potassium nitrate, and its ions keep each solution neutral, which completes the circuit.', show: ['b.2', 'c.bridge'], focus: 'c.bridge' },
        { say: 'A porous cup does the same job: one half-cell stands in an unglazed porous pot, placed in the other, and ions pass through its pores.', show: 'b.3', focus: 'c' },
      ],
    },
    {
      chapter: 'Anode and cathode',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Anode and cathode', md: 'The **anode** is the electrode where **oxidation** happens. The **cathode** is the electrode where **reduction** happens.' },
        { kind: 'text', id: 'mn', size: 'xl', align: 'center', md: '[[opp:**An Ox**]], [[adj:**Red Cat**]]' },
        { kind: 'text', id: 'key', size: 'md', align: 'center', md: '[[opp:anode]]: oxidation $\\qquad$ reduction: [[adj:cathode]]' },
      ],
      lines: [
        { say: 'Each electrode has a name. The anode is the electrode where oxidation happens. The cathode is the electrode where reduction happens.', show: 'def' },
        { say: 'To remember them, say: An Ox, Red Cat.', show: 'mn' },
        { say: 'Anode goes with oxidation, and reduction goes with cathode.', show: 'key' },
      ],
    },
    {
      chapter: 'Which electrode is which?',
      layout: 'split',
      leftWidth: 560,
      left: [small],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Reduction half-reaction', '$E^\\circ$ (V)'],
          rows: [
            ['$\\ce{Cu^2+(aq) + 2e- -> Cu(s)}$', '$+0.34$'],
            ['$\\ce{Zn^2+(aq) + 2e- -> Zn(s)}$', '$-0.76$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{\\text{Anode: }} \\ce{Zn -> Zn^2+ + 2e-}', '\\adj{\\text{Cathode: }} \\ce{Cu^2+ + 2e- -> Cu}', '\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}'] },
      ],
      lines: [
        {
          say: 'Which electrode is the anode? In the redox table, copper two ions are above zinc, so the reaction between them is spontaneous.',
          caption: 'Which electrode is the anode? In the redox table, copper(II) ions are above zinc, so the reaction between them is spontaneous.',
          show: [...whole, 't'],
        },
        { say: 'Zinc is the stronger reducing agent, so it is oxidised. The zinc electrode is the anode.', show: ['m.0', 'c.l-role'], focus: ['c.l-electrode', 'c.l-role', 'm.0'] },
        {
          say: 'Copper two ions are the stronger oxidising agent, so they are reduced, on the copper electrode. The copper electrode is the cathode.',
          caption: 'Copper(II) ions are the stronger oxidising agent, so they are reduced, on the copper electrode. The copper electrode is the cathode.',
          show: ['m.1', 'c.r-role'],
          focus: ['c.r-electrode', 'c.r-role', 'm.1'],
        },
        {
          say: 'Together, zinc and copper two ions produce zinc ions and copper. So the anode is always the reducing agent lower in the redox table.',
          caption: 'Together, zinc and copper(II) ions produce zinc ions and copper. So the anode is always the reducing agent lower in the redox table.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A voltaic cell has a nickel electrode in $\\ce{Ni(NO3)2(aq)}$ and a copper electrode in $\\ce{Cu(NO3)2(aq)}$. Use $\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34\\ \\text{V}$, and $\\ce{Ni^2+ + 2e- -> Ni}$, $E^\\circ = -0.26\\ \\text{V}$. Which electrode is the anode?',
          choices: ['Copper, where $\\ce{Cu^2+}$ is reduced', 'Nickel, where $\\ce{Ni}$ is oxidised', 'Copper, where $\\ce{Cu}$ is oxidised', 'Nickel, where $\\ce{Ni^2+}$ is reduced'],
          answer: 1,
          working: 'Nickel is lower in the table, so it is the stronger reducing agent and is oxidised at the anode: $\\ce{Ni -> Ni^2+ + 2e-}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A voltaic cell has a nickel electrode in nickel two nitrate, and a copper electrode in copper two nitrate. The reduction potentials are plus zero point three four volts for copper, and negative zero point two six volts for nickel. Which electrode is the anode? Pause the video and try it.',
          caption: 'Your turn. A voltaic cell has a nickel electrode in nickel(II) nitrate, and a copper electrode in copper(II) nitrate. The reduction potentials are +0.34 V for copper, and −0.26 V for nickel. Which electrode is the anode? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, the nickel electrode, where nickel is oxidised. Nickel is lower in the table, so it is the stronger reducing agent. Choice A describes the cathode.',
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
            'A **voltaic cell** turns the energy of a spontaneous redox reaction into electrical energy.',
            'Two half-cells are joined by a wire and by a **salt bridge** or a **porous cup**.',
            'Oxidation at the **anode**, reduction at the **cathode**: "An Ox, Red Cat".',
            'The anode is the reducing agent lower in the redox table.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A voltaic cell turns the energy of a spontaneous redox reaction into electrical energy.', show: 'sum.0' },
        { say: 'Its two half-cells are joined by a wire, and by a salt bridge or a porous cup.', show: 'sum.1' },
        { say: 'Oxidation happens at the anode, and reduction at the cathode.', show: 'sum.2' },
        { say: 'And the anode is the reducing agent lower in the table. In part two, you will follow the electrons and the ions as the cell runs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
