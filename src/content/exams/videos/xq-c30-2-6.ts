import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import parts from '@/content/chem30/videos/c30-2-6.ts';
import { cell, TONE } from '@/content/chem30/videos/lib/c30-2b-figures.ts';

// Exam question for Chemistry 30 lesson 2.6 (voltaic cells): a copper electrode in copper(II)
// nitrate and a silver electrode in silver nitrate, joined by a KNO3 salt bridge; the silver
// electrode gains mass. Name the cathode, write the half-reactions and the cell reaction, give the
// direction of the electrons and of the salt bridge's ions, and write the cell notation. Gradileo
// wrote the question in the style of a unit test. The answer: silver gains mass, so Ag+ is reduced
// there and Ag is the cathode, Cu the anode; Cu -> Cu2+ + 2e- and Ag+ + e- -> Ag, so
// Cu + 2Ag+ -> Cu2+ + 2Ag; electrons go from Cu to Ag through the wire, NO3- moves toward the copper
// and K+ toward the silver; Cu(s) | Cu2+(aq) || Ag+(aq) | Ag(s).
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's zinc and copper cell
// running; and the copper and silver cell drawn as a diagram (src/video/solids.ts), with its
// electrons and the salt bridge's ions moving.

const QUESTION = 'A voltaic cell is made from a copper electrode in copper(II) nitrate solution and a silver electrode in silver nitrate solution, joined by a wire and a potassium nitrate salt bridge. As the cell runs, the silver electrode gains mass. (a) Which electrode is the cathode? (b) Write the two half-reactions and the cell reaction. (c) Which way do electrons move in the wire, and which way do the K⁺ and NO₃⁻ ions move in the salt bridge? (d) Write the cell notation.';

const bridge = '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}';
const copper = figure('c', [
  cell({
    left: { electrode: '\\text{Cu}', solution: '\\ce{Cu(NO3)2(aq)}', tone: 'adj', role: '\\text{anode}', roleTone: TONE.anode, ion: '\\ce{Cu^2+}' },
    right: { electrode: '\\text{Ag}', solution: '\\ce{AgNO3(aq)}', role: '\\text{cathode}', roleTone: TONE.cathode, ion: '\\ce{Ag+}' },
    bridge,
    electrons: 'right',
    ions: { anion: '\\ce{NO3^-}', cation: '\\ce{K+}', toward: 'left' },
  }),
], 470);
const base = ['c.l-beaker', 'c.l-electrode', 'c.r-beaker', 'c.r-electrode', 'c.wire', 'c.bridge'];

const video: Explainer = {
  id: 'xq-c30-2-6',
  lessonId: '',
  exam: {
    lesson: 'c30-2-6',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Copper and Silver Cell. Voltaic Cells',
  thumbnailTitle: 'The Copper and Silver Cell',
  thumbnail: 'vc',
  summary:
    'A test-style question, solved one small step at a time: a copper half-cell and a silver half-cell are joined, and the silver electrode gains mass. From that one clue we find the cathode, write the half-reactions and the cell reaction, follow the electrons through the wire and the ions through the salt bridge, and write the cell notation Cu(s) | Cu²⁺(aq) || Ag⁺(aq) | Ag(s).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Copper and Silver Cell', subtitle: 'Anode, cathode, electrons, ions and notation' }],
      lines: [
        { say: 'In this video, we solve a test-style question about voltaic cells. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A voltaic cell is made from a copper electrode in copper(II) nitrate solution and a silver electrode in silver nitrate solution, joined by a wire and a potassium nitrate salt bridge. As the cell runs, the silver electrode **gains mass**. (a) Which electrode is the cathode? (b) Write the two half-reactions and the cell reaction. (c) Which way do electrons move in the wire, and which way do the $\\ce{K+}$ and $\\ce{NO3^-}$ ions move in the salt bridge? (d) Write the cell notation.',
          answer: 'Ag is the cathode; Cu + 2Ag⁺ → Cu²⁺ + 2Ag; e⁻ Cu → Ag, K⁺ to Ag, NO₃⁻ to Cu; Cu | Cu²⁺ || Ag⁺ | Ag',
        },
      ],
      lines: [
        { say: 'Here is the question. A voltaic cell is made from a copper electrode in copper two nitrate solution and a silver electrode in silver nitrate solution, joined by a wire and a potassium nitrate salt bridge. As the cell runs, the silver electrode gains mass. Part a: which electrode is the cathode? Part b: write the two half-reactions and the cell reaction. Part c: which way do electrons move in the wire, and which way do the potassium and nitrate ions move in the salt bridge? Part d: write the cell notation.', show: 'q', caption: 'Here is the question. Copper in Cu(NO₃)₂(aq) and silver in AgNO₃(aq), joined by a wire and a KNO₃ salt bridge. The silver electrode gains mass. (a) Which electrode is the cathode? (b) Half-reactions and cell reaction? (c) Which way do electrons, K⁺ and NO₃⁻ move? (d) Cell notation?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'One clue, **silver gains mass**, tells us where **reduction** happens. Everything else follows' }],
      lines: [
        { say: 'The key clue is that the silver electrode gains mass. That tells us which electrode is the cathode, and once we know that, every other part follows.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(parts, 'vc'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{oxidation at the } \\textbf{an}\\text{ode} \\qquad \\text{reduction at the } \\textbf{cat}\\text{hode}'] }],
      lines: [
        { say: 'Here is what we need. A zinc and copper cell, its two half-cells side by side and joined by a wire. Watch the zinc electrode, and watch the copper two ions near the copper electrode.', caption: 'Here is what we need. A zinc and copper cell, its two half-cells side by side and joined by a wire. Watch the zinc electrode, and watch the copper(II) ions near the copper electrode.', show: ['vc', 'vc.labels', 'vc.key', 'vc.tally'], play: 'vc.run' },
        { say: 'Zinc atoms leave the electrode as ions, so the zinc wears away. Copper ions take electrons from the wire and plate onto the copper electrode, so it grows.' },
        { say: 'Oxidation happens at the anode, and reduction at the cathode. An electrode that grows is where metal ions are reduced, so it is the cathode.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['The electrode that **gains mass** is the **cathode**', 'Write the **reduction** there, the **oxidation** at the other', 'Electrons go **anode → cathode**; then write the **notation**'] }],
      lines: [
        { say: 'Here is the plan. First, the electrode that gains mass is the cathode.', show: 'plan.0' },
        { say: 'Then write the reduction at the cathode and the oxidation at the anode, and add them.', show: 'plan.1' },
        { say: 'Then follow the electrons from anode to cathode, and the ions in the salt bridge, and write the notation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The cathode',
      layout: 'center',
      main: [copper, { kind: 'math', id: 'a', size: 'md', lines: ['\\text{Ag gains mass} \\Rightarrow \\good{\\text{Ag is the cathode}},\\ \\text{Cu is the anode}'] }],
      lines: [
        { say: 'Step one. Here is the cell: copper on the left, silver on the right, a wire through a voltmeter at the top, and the salt bridge between them.', show: base },
        { say: 'The silver electrode gains mass, so silver ions from the solution are turning into silver metal on it. That is reduction, so silver is the cathode, and copper is the anode.', show: ['c.l-role', 'c.r-role', 'a.0'], focus: 'a.0' },
      ],
    },
    {
      chapter: 'Step 2: The reactions',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\text{cathode: } \\ce{2Ag+ + 2e^- -> 2Ag}', '\\text{anode: } \\ce{Cu -> Cu^2+ + 2e^-}', '\\good{\\ce{Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)}}'] }],
      lines: [
        { say: 'Step two. At the cathode, a silver ion takes one electron and becomes a silver atom. At the anode, a copper atom loses two electrons and becomes a copper two ion.', show: ['r.0', 'r.1'], caption: 'Step two. At the cathode, Ag⁺ + e⁻ → Ag. At the anode, Cu → Cu²⁺ + 2e⁻.' },
        { say: 'Copper gives two electrons, so two silver ions take them. Doubling the silver half-reaction and adding gives copper plus two silver ions, giving copper two ions and two silver.', show: 'r.2', focus: 'r.2', caption: 'Copper gives two electrons, so two silver ions take them. Doubling the silver half-reaction and adding: Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s).' },
      ],
    },
    {
      chapter: 'Step 3: Electrons and ions',
      layout: 'center',
      main: [copper, { kind: 'math', id: 'e', size: 'md', lines: ['e^-: \\text{Cu} \\to \\text{Ag} \\qquad \\ce{NO3^-} \\to \\text{Cu} \\qquad \\ce{K+} \\to \\text{Ag}'] }],
      lines: [
        { say: 'Step three. The electrons leave the copper, where they are made, and travel through the wire to the silver, where they are used.', show: [...base, 'c.l-role', 'c.r-role', 'c.l-ion', 'c.r-ion', 'c.electrons'], focus: 'c.electrons' },
        { say: 'On the copper side, new copper two ions fill the solution with positive charge. Nitrate ions move out of the bridge toward the copper to balance it.', caption: 'On the copper side, new Cu²⁺ ions fill the solution with positive charge. NO₃⁻ ions move out of the bridge toward the copper to balance it.', show: 'c.anions', focus: 'c.anions' },
        { say: 'On the silver side, silver ions are used up, leaving extra nitrate behind. Potassium ions move toward the silver to balance it.', caption: 'On the silver side, Ag⁺ ions are used up, leaving extra nitrate behind. K⁺ ions move toward the silver to balance it.', show: ['c.cations', 'e.0'], focus: 'c.cations' },
      ],
    },
    {
      chapter: 'Step 4: Cell notation',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['\\text{anode} \\mid \\text{anode solution} \\parallel \\text{cathode solution} \\mid \\text{cathode}', '\\good{\\ce{Cu(s)} \\mid \\ce{Cu^2+(aq)} \\parallel \\ce{Ag+(aq)} \\mid \\ce{Ag(s)}}'] }],
      lines: [
        { say: 'Step four. Cell notation reads from the anode on the left to the cathode on the right. A single line is a boundary between phases, and the double line is the salt bridge.', show: 'n.0' },
        { say: 'So the notation is copper solid, copper two plus, double line, silver plus, silver solid.', show: 'n.1', focus: 'n.1', caption: 'So the notation is Cu(s) | Cu²⁺(aq) || Ag⁺(aq) | Ag(s).' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{Cu loses mass, Ag gains mass} \\qquad 2e^- \\text{ lost} = 2e^- \\text{ gained}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Silver** is the cathode. (b) $\\ce{Cu -> Cu^2+ + 2e^-}$, $\\ce{Ag+ + e^- -> Ag}$, $\\ce{Cu + 2Ag+ -> Cu^2+ + 2Ag}$. (c) Electrons **Cu → Ag**; $\\ce{NO3^-}$ toward Cu, $\\ce{K+}$ toward Ag. (d) $\\ce{Cu(s)} \\mid \\ce{Cu^2+(aq)} \\parallel \\ce{Ag+(aq)} \\mid \\ce{Ag(s)}$.' },
      ],
      lines: [
        { say: 'Does it make sense? Copper atoms leave the anode, so copper should lose mass while silver gains it, and the two electrons lost by each copper atom are the two gained by two silver ions.', show: 'x.0' },
        { say: 'So silver is the cathode, copper plus two silver ions gives copper two ions and two silver, electrons flow from copper to silver, nitrate moves toward the copper and potassium toward the silver, and the notation is copper, copper two plus, silver plus, silver.', show: 'ans', caption: 'So silver is the cathode, Cu + 2Ag⁺ → Cu²⁺ + 2Ag, electrons flow from Cu to Ag, NO₃⁻ moves toward the copper and K⁺ toward the silver, and the notation is Cu(s) | Cu²⁺(aq) || Ag⁺(aq) | Ag(s).' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['Copper is the cathode', 'Remembered the **zinc–copper** cell; here copper\'s partner is **silver**'],
            ['Electrons cross the salt bridge', 'Electrons move only in the **wire**; **ions** move in the bridge'],
            ['$\\ce{NO3^-}$ moves toward the silver', 'Anions move toward the **anode**, where positive ions form'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Copper is the cathode in the zinc and copper cell, but whether a metal is the anode or the cathode depends on its partner. Here, the clue says silver is reduced.', focus: 'traps.0' },
        { say: 'Electrons never travel through the solution or the salt bridge. They move through the wire, and ions carry the charge in the bridge.', focus: 'traps.1' },
        { say: 'And nitrate ions move toward the anode, because that is where new positive ions are building up.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For the cell $\\ce{Mg(s)} \\mid \\ce{Mg^2+(aq)} \\parallel \\ce{Pb^2+(aq)} \\mid \\ce{Pb(s)}$, which statement is true?',
          choices: ['Electrons flow from Pb to Mg', 'The Mg electrode loses mass', '$\\ce{Pb^2+}$ ions are oxidised', 'Cations in the salt bridge move toward Mg'],
          answer: 1,
          working: 'Mg is written first, so it is the anode: $\\ce{Mg -> Mg^2+ + 2e^-}$ wears the electrode away.',
        },
      ],
      lines: [
        { say: 'Your turn. For the cell magnesium solid, magnesium two plus, double line, lead two plus, lead solid, which statement is true? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. For the cell Mg(s) | Mg²⁺(aq) || Pb²⁺(aq) | Pb(s), which statement is true? Pause the video and try it.' },
        { say: 'Magnesium is written on the left, so it is the anode. Its atoms are oxidised to ions and leave the electrode, so the magnesium electrode loses mass: choice B.', show: 'q2.answer' },
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
          items: ['**An**ode **ox**idation, **red**uction at the **cat**hode', 'Electrons go **anode → cathode** in the **wire**', 'Notation: **anode** $\\mid$ ions $\\parallel$ ions $\\mid$ **cathode**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Oxidation happens at the anode, and reduction at the cathode, which is the electrode that grows.', show: 'sum.0' },
        { say: 'Electrons travel from the anode to the cathode through the wire, and anions in the salt bridge move toward the anode.', show: 'sum.1' },
        { say: 'Cell notation puts the anode on the left and the cathode on the right, with a double line for the salt bridge. For more on voltaic cells, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
