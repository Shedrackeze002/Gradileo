import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cell, TONE } from './lib/c30-2b-figures.ts';

// The lesson's cell with an inert electrode: nickel in nickel(II) nitrate, and platinum in a
// solution of iron(III) and iron(II) ions.
const inert = figure('c', [
  cell({
    left: { electrode: '\\text{Ni}', solution: '\\ce{Ni(NO3)2(aq)}', tone: 'good', role: '\\text{anode}', roleTone: TONE.anode },
    right: { electrode: '\\text{Pt}', solution: '\\ce{Fe^3+(aq), Fe^2+(aq)}', tone: 'theta', role: '\\text{cathode}', roleTone: TONE.cathode, ion: '\\ce{Fe^3+}' },
    bridge: '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}',
    electrons: 'right',
  }),
]);

const video: Explainer = {
  id: 'c30-2-6-c',
  lessonId: 'c30-2-6',
  title: 'Voltaic Cells, Part 3: Inert Electrodes and Cell Notation',
  thumbnailTitle: 'Inert Electrodes and Cell Notation',
  thumbnail: 'c',
  summary:
    'When no metal takes part in a half-reaction, an inert electrode such as platinum or graphite carries the electrons without reacting. Cell notation writes a cell on one line, the anode on the left and the cathode on the right, with a single line between phases and a double line for the salt bridge: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). Reading a cell gives its half-reactions and its balanced cell reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Inert Electrodes and Cell Notation', subtitle: 'A whole cell on one line' }],
      lines: [
        { say: 'Drawing a whole cell, with its beakers, wire and salt bridge, takes time. So chemists write a cell on one line instead.', show: 'title' },
        { say: 'In this part, you will meet inert electrodes, and then write and read cell notation.' },
      ],
    },
    {
      chapter: 'Inert electrodes',
      layout: 'split',
      leftWidth: 640,
      left: [inert],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['No metal in a half-reaction? Use an **inert electrode**: platinum or graphite.', 'It carries electrons to or from the reacting species, but **does not react** itself.'],
        },
      ],
      lines: [
        {
          say: 'Sometimes neither the oxidising agent nor the reducing agent of a half-cell is a metal that can be an electrode. Iron three ions can be reduced to iron two ions, or chlorine to chloride ions, with no metal in sight.',
          caption: 'Sometimes neither the oxidising agent nor the reducing agent of a half-cell is a metal that can be an electrode. Iron(III) ions can be reduced to iron(II) ions, or chlorine to chloride ions, with no metal in sight.',
          show: ['c.r-beaker', 'c.r-ion'],
        },
        { say: 'Then an inert electrode, usually platinum or graphite, stands in the solution.', show: ['c.r-electrode', 'b.0'], focus: 'c.r-electrode' },
        {
          say: 'It carries electrons to or from the reacting species, but it does not react itself. Here, electrons arrive from a nickel anode, and the platinum hands them to the iron three ions beside it.',
          caption: 'It carries electrons to or from the reacting species, but it does not react itself. Here, electrons arrive from a nickel anode, and the platinum hands them to the iron(III) ions beside it.',
          show: ['c.l-beaker', 'c.l-electrode', 'c.wire', 'c.bridge', 'c.electrons', 'c.l-role', 'c.r-role', 'b.1'],
          focus: ['c.electrons', 'c.r-electrode'],
        },
      ],
    },
    {
      chapter: 'Cell notation',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Cell notation',
          md: 'Write the **anode** on the left and the **cathode** on the right. A single line, $\\mid$, separates two phases, such as a solid electrode and a solution; a double line, $\\parallel$, stands for the salt bridge. Species in the same solution are separated by commas.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Zn(s)} \\mid \\ce{Zn^2+(aq)} \\parallel \\ce{Cu^2+(aq)} \\mid \\ce{Cu(s)}'] },
        { kind: 'text', id: 'key', size: 'md', align: 'center', md: '[[opp:anode]] $\\mid$ anode solution $\\parallel$ cathode solution $\\mid$ [[adj:cathode]]' },
      ],
      lines: [
        { say: 'Cell notation writes the anode on the left, and the cathode on the right.', show: 'def' },
        { say: 'A single line separates two phases, such as a solid electrode and a solution. A double line stands for the salt bridge. And species in the same solution are separated by commas.' },
        {
          say: 'The zinc-copper cell is written: zinc solid, line, zinc ions, double line, copper two ions, line, copper solid.',
          caption: 'The zinc–copper cell is written Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s).',
          show: 'm',
          focus: 'm',
        },
        {
          say: 'Read from left to right, it tells the electrons’ story. Zinc is oxidised to zinc ions at the anode, and copper two ions are reduced to copper at the cathode.',
          caption: 'Read from left to right, it tells the electrons’ story. Zinc is oxidised to zinc ions at the anode, and copper(II) ions are reduced to copper at the cathode.',
          show: 'key',
        },
      ],
    },
    {
      chapter: 'Reading a cell',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A cell is written $\\ce{Pb(s)} \\mid \\ce{Pb^2+(aq)} \\parallel \\ce{Ag+(aq)} \\mid \\ce{Ag(s)}$. Name the anode and the cathode, and write the cell reaction.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\opp{\\text{Anode: }} \\ce{Pb(s) -> Pb^2+(aq) + 2e-}', '\\adj{\\text{Cathode: }} \\ce{Ag+(aq) + e- -> Ag(s)}', '\\ce{Pb(s) + 2Ag+(aq) -> Pb^2+(aq) + 2Ag(s)}'],
        },
      ],
      lines: [
        {
          say: 'Try reading one. On the left are lead atoms, then lead two ions. After the double line come silver ions, then silver.',
          caption: 'Try reading one. On the left are lead atoms, then lead(II) ions. After the double line come silver ions, then silver.',
          show: 'q',
        },
        {
          say: 'The left side is the anode. Lead atoms are oxidised: each loses two electrons and becomes a lead two ion.',
          caption: 'The left side is the anode. Lead atoms are oxidised: each loses two electrons and becomes a lead(II) ion.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'The right side is the cathode. Silver ions are reduced: each gains one electron.', show: 'm.1', focus: 'm.1' },
        {
          say: 'So the anode is the electrode of lead, and the cathode is the silver electrode. Each atom of lead reacts with two silver ions, giving one lead two ion and two silver atoms.',
          caption: 'So the anode is the electrode of lead, and the cathode is the silver electrode. Each atom of lead reacts with two silver ions, giving one lead(II) ion and two silver atoms.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'With an inert electrode',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A cell is written $\\ce{Ni(s)} \\mid \\ce{Ni^2+(aq)} \\parallel \\ce{Fe^3+(aq), Fe^2+(aq)} \\mid \\ce{Pt(s)}$. Write the balanced cell reaction.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\opp{\\text{Anode: }} \\ce{Ni(s) -> Ni^2+(aq) + 2e-}', '\\adj{\\text{Cathode: }} \\ce{Fe^3+(aq) + e- -> Fe^2+(aq)} \\quad \\thc{\\times 2}', '\\ce{Ni(s) + 2Fe^3+(aq) -> Ni^2+(aq) + 2Fe^2+(aq)}'],
        },
      ],
      lines: [
        {
          say: 'Now a cell with an inert electrode: nickel, line, nickel two ions, double line, iron three ions and iron two ions, line, platinum.',
          caption: 'Now a cell with an inert electrode: Ni(s) | Ni²⁺(aq) || Fe³⁺(aq), Fe²⁺(aq) | Pt(s).',
          show: 'q',
        },
        { say: 'The anode is on the left. Nickel is oxidised to nickel two ions, giving up two electrons.', caption: 'The anode is on the left. Nickel is oxidised to nickel(II) ions, giving up two electrons.', show: 'm.0', focus: 'm.0' },
        {
          say: 'On the right, the platinum does not react. The iron three ions beside it are reduced to iron two ions, each taking one electron, so multiply by two to take both electrons.',
          caption: 'On the right, the platinum does not react. The iron(III) ions beside it are reduced to iron(II) ions, each taking one electron, so multiply by two to take both electrons.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'Add the half-reactions. Nickel and two iron three ions produce nickel two ions and two iron two ions.',
          caption: 'Add the half-reactions. Nickel and two iron(III) ions produce nickel(II) ions and two iron(II) ions.',
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
          prompt: 'A voltaic cell is written $\\ce{Al(s)} \\mid \\ce{Al^3+(aq)} \\parallel \\ce{Ni^2+(aq)} \\mid \\ce{Ni(s)}$. Which is the balanced cell reaction?',
          choices: ['$\\ce{Al + Ni^2+ -> Al^3+ + Ni}$', '$\\ce{3Ni + 2Al^3+ -> 3Ni^2+ + 2Al}$', '$\\ce{2Al + 3Ni^2+ -> 2Al^3+ + 3Ni}$', '$\\ce{3Al + 2Ni^2+ -> 3Al^3+ + 2Ni}$'],
          answer: 2,
          working: 'Anode (left): $\\ce{Al -> Al^3+ + 3e-}$, times 2. Cathode (right): $\\ce{Ni^2+ + 2e- -> Ni}$, times 3. Six electrons are transferred.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A voltaic cell is written: aluminium, line, aluminium ions, double line, nickel two ions, line, nickel. Which is the balanced cell reaction? Pause the video and try it.',
          caption: 'Your turn. A voltaic cell is written Al(s) | Al³⁺(aq) || Ni²⁺(aq) | Ni(s). Which is the balanced cell reaction? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C. Each aluminium atom gives three electrons, and each nickel two ion takes two, so six electrons match: two aluminium atoms and three nickel two ions. Choice A is not balanced for charge, and choice B runs the cell backwards.',
          caption: 'The answer is C. Each aluminium atom gives three electrons, and each nickel(II) ion takes two, so six electrons match: two aluminium atoms and three nickel(II) ions. Choice A is not balanced for charge, and choice B runs the cell backwards.',
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
            'An **inert electrode**, such as platinum, carries electrons when no metal takes part in a half-reaction.',
            '**Cell notation**: anode $\\mid$ anode solution $\\parallel$ cathode solution $\\mid$ cathode.',
            'A single line separates two phases; the double line is the salt bridge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An inert electrode, such as platinum, carries electrons when no metal takes part in a half-reaction.', show: 'sum.0' },
        { say: 'Cell notation writes the anode on the left and the cathode on the right.', show: 'sum.1' },
        { say: 'A single line separates two phases, and the double line is the salt bridge. That completes this lesson on voltaic cells. Next, you will find out how hard a cell pushes its electrons. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
