import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cell, TONE } from './lib/c30-2b-figures.ts';

const bridge = '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}';
const ions = { anion: '\\ce{NO3^-}', cation: '\\ce{K+}', toward: 'left' as const };

// The zinc–copper cell running: electrons through the wire from zinc to copper, zinc ions forming
// at the anode, copper(II) ions used up at the cathode, and the salt bridge's ions moving.
const zinc = figure('c', [
  cell({
    left: { electrode: '\\text{Zn}', solution: '\\ce{Zn(NO3)2(aq)}', role: '\\text{anode}', roleTone: TONE.anode, ion: '\\ce{Zn^2+}' },
    right: { electrode: '\\text{Cu}', solution: '\\ce{Cu(NO3)2(aq)}', tone: 'adj', role: '\\text{cathode}', roleTone: TONE.cathode, ion: '\\ce{Cu^2+}' },
    bridge,
    electrons: 'right',
    ions,
  }),
]);

// The lesson's nickel–silver cell, worked out the same way.
const nickel = figure('c', [
  cell({
    left: { electrode: '\\text{Ni}', solution: '\\ce{Ni(NO3)2(aq)}', tone: 'good', role: '\\text{anode}', roleTone: TONE.anode },
    right: { electrode: '\\text{Ag}', solution: '\\ce{AgNO3(aq)}', role: '\\text{cathode}', roleTone: TONE.cathode },
    electrons: 'right',
    ions,
  }),
]);
const base = ['c.l-beaker', 'c.l-electrode', 'c.r-beaker', 'c.r-electrode', 'c.wire', 'c.bridge'];

const video: Explainer = {
  id: 'c30-2-6-b',
  lessonId: 'c30-2-6',
  title: 'Voltaic Cells, Part 2: What Moves Where',
  thumbnailTitle: 'What Moves Where',
  thumbnail: 'c',
  summary:
    'As a voltaic cell runs, electrons flow through the wire from the anode to the cathode, never through the solutions or the salt bridge. The anode loses mass as its atoms become ions, and the cathode gains mass as ions are reduced on it. In the salt bridge, anions move toward the anode and cations toward the cathode, keeping both solutions neutral; a nickel–silver cell is worked through as an example.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'What Moves Where', subtitle: 'Electrons in the wire, ions in the bridge' }],
      lines: [
        { say: 'Inside a working cell, three things move at once: electrons in the wire, ions in the solutions, and ions in the salt bridge.', show: 'title' },
        { say: 'In this part, you will follow each of them through the zinc-copper cell, and then describe a new cell from the redox table.' },
      ],
    },
    {
      chapter: 'Electrons in the wire',
      layout: 'split',
      leftWidth: 640,
      left: [zinc],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Electrons flow through the **wire**, from the [[opp:anode]] to the [[adj:cathode]].', 'They **never** travel through the solutions or the salt bridge.'],
        },
      ],
      lines: [
        { say: 'Zinc, the anode, is oxidised. Each zinc atom gives up two electrons, and they enter the wire.', show: [...base, 'c.l-role', 'c.r-role'], focus: ['c.l-electrode', 'c.l-role'] },
        { say: 'The electrons flow through the wire, from the anode to the cathode, where copper two ions take them.', caption: 'The electrons flow through the wire, from the anode to the cathode, where copper(II) ions take them.', show: ['c.electrons', 'b.0'], focus: 'c.electrons' },
        { say: 'They never travel through the solutions or the salt bridge. Only the wire and the electrodes carry electrons.', show: 'b.1', focus: 'c' },
      ],
    },
    {
      chapter: 'The electrodes change',
      layout: 'split',
      leftWidth: 640,
      left: [zinc],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['[[opp:Anode]]: zinc atoms become ions, so it **loses mass**, and $[\\ce{Zn^2+}]$ rises.', '[[adj:Cathode]]: copper(II) ions become copper, so it **gains mass**, and $[\\ce{Cu^2+}]$ falls.'],
        },
      ],
      lines: [
        { say: 'At the anode, zinc atoms become zinc ions and move into the solution. The zinc electrode loses mass, and the concentration of zinc ions rises.', show: [...base, 'c.l-role', 'c.r-role', 'c.electrons', 'c.l-ion', 'b.0'], focus: ['c.l-electrode', 'c.l-ion'] },
        { say: 'At the cathode, copper two ions take electrons and become copper atoms on the electrode. The copper electrode gains mass.', caption: 'At the cathode, copper(II) ions take electrons and become copper atoms on the electrode. The copper electrode gains mass.', show: ['c.r-ion', 'b.1'], focus: ['c.r-electrode', 'c.r-ion'] },
        { say: 'The concentration of copper two ions falls, so the blue colour of the solution fades.', caption: 'The concentration of copper(II) ions falls, so the blue colour of the solution fades.', focus: 'c.r-beaker' },
      ],
    },
    {
      chapter: 'Ions in the salt bridge',
      layout: 'split',
      leftWidth: 640,
      left: [zinc],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['[[good:Anions]] ($\\ce{NO3^-}$) move toward the [[opp:anode]], to balance the new $\\ce{Zn^2+}$.', '[[hyp:Cations]] ($\\ce{K+}$) move toward the [[adj:cathode]], to replace the $\\ce{Cu^2+}$ removed.'],
        },
      ],
      lines: [
        {
          say: 'Now the solutions. Around the anode, new zinc ions add positive charge. Around the cathode, copper two ions are removed, which leaves extra negative charge.',
          caption: 'Now the solutions. Around the anode, new zinc ions add positive charge. Around the cathode, copper(II) ions are removed, which leaves extra negative charge.',
          show: [...base, 'c.l-role', 'c.r-role', 'c.electrons', 'c.l-ion', 'c.r-ion'],
          focus: ['c.l-ion', 'c.r-ion'],
        },
        { say: 'The salt bridge fixes both. Its anions, here nitrate ions, move toward the anode, to balance the new zinc ions.', show: ['c.anions', 'b.0'], focus: 'c.anions' },
        { say: 'Its cations, here potassium ions, move toward the cathode, to replace the copper two ions removed.', caption: 'Its cations, here potassium ions, move toward the cathode, to replace the copper(II) ions removed.', show: ['c.cations', 'b.1'], focus: 'c.cations' },
      ],
    },
    {
      chapter: 'No electrons in the bridge',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Electrons in the salt bridge',
          md: 'Electrons cannot travel through a solution: they flow only through the wire and the electrodes. The salt bridge carries charge by moving **ions**. Without it, positive charge would build up around the anode and negative charge around the cathode, and the current would stop almost at once.',
        },
      ],
      lines: [
        { say: 'A common mistake is to send electrons through the salt bridge. Electrons cannot travel through a solution. The salt bridge carries charge by moving ions.', show: 'oops' },
        { say: 'Without it, positive charge would build up around the anode, negative charge would build up around the cathode, and the current would stop almost at once.' },
      ],
    },
    {
      chapter: 'A nickel–silver cell',
      layout: 'split',
      leftWidth: 560,
      left: [nickel],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Reduction half-reaction', '$E^\\circ$ (V)'],
          rows: [
            ['$\\ce{Ag+(aq) + e- -> Ag(s)}$', '$+0.80$'],
            ['$\\ce{Ni^2+(aq) + 2e- -> Ni(s)}$', '$-0.26$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{\\text{Anode: }} \\ce{Ni -> Ni^2+ + 2e-}', '\\adj{\\text{Cathode: }} \\ce{Ag+ + e- -> Ag}', '\\ce{Ni + 2Ag+ -> Ni^2+ + 2Ag}'] },
      ],
      lines: [
        {
          say: 'Now a new cell: nickel in nickel two nitrate, and silver in silver nitrate, with a potassium nitrate salt bridge. Silver ions are above nickel in the table.',
          caption: 'Now a new cell: nickel in nickel(II) nitrate, and silver in silver nitrate, with a potassium nitrate salt bridge. Silver ions are above nickel in the table.',
          show: [...base, 't'],
        },
        { say: 'Nickel is the stronger reducing agent, so the nickel electrode is the anode.', show: ['m.0', 'c.l-role'], focus: ['c.l-electrode', 'm.0'] },
        { say: 'Silver ions are reduced at the silver electrode, the cathode.', show: ['m.1', 'c.r-role'], focus: ['c.r-electrode', 'm.1'] },
        { say: 'Electrons flow through the wire from nickel to silver. Nitrate ions move toward the nickel half-cell, and potassium ions toward the silver half-cell.', show: ['c.electrons', 'c.anions', 'c.cations'], focus: ['c.electrons', 'c.anions', 'c.cations'] },
        { say: 'Each nickel atom gives two electrons, and each silver ion takes one. So nickel and two silver ions produce nickel ions and two silver atoms. The silver electrode gains mass, and the nickel electrode loses mass.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A voltaic cell has a zinc electrode in $\\ce{Zn(NO3)2(aq)}$ and a silver electrode in $\\ce{AgNO3(aq)}$, with a $\\ce{KNO3(aq)}$ salt bridge. Use $\\ce{Ag+ + e- -> Ag}$, $E^\\circ = +0.80\\ \\text{V}$, and $\\ce{Zn^2+ + 2e- -> Zn}$, $E^\\circ = -0.76\\ \\text{V}$. Which statement is true as the cell runs?',
          choices: ['The silver electrode gains mass.', 'Electrons flow through the salt bridge.', 'Nitrate ions move toward the silver half-cell.', 'The zinc electrode gains mass.'],
          answer: 0,
          working: 'Silver ions are reduced to silver metal on the silver electrode, the cathode, so it gains mass. Zinc is oxidised at the anode, and nitrate ions move toward it.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A voltaic cell has a zinc electrode in zinc nitrate, and a silver electrode in silver nitrate, with a potassium nitrate salt bridge and the reduction potentials shown. Which statement is true as the cell runs? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is A. Silver ions are reduced to silver metal on the silver electrode, the cathode, so it gains mass. Choice C has the nitrate ions going the wrong way: they move toward the anode, the zinc half-cell.', show: 'q.answer' },
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
            'Electrons flow through the wire from the **anode** to the **cathode**, never through a solution.',
            'The anode loses mass; the cathode gains mass, and the ions reduced there fall in concentration.',
            'In the salt bridge, **anions** move toward the anode and **cations** toward the cathode.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Electrons flow through the wire from the anode to the cathode, and never through a solution.', show: 'sum.0' },
        { say: 'The anode loses mass. The cathode gains mass, and the ions reduced there fall in concentration.', show: 'sum.1' },
        { say: 'In the salt bridge, anions move toward the anode and cations toward the cathode. In part three, you will meet inert electrodes, and write a cell in shorthand. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
