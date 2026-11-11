import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-1-4',
  lessonId: 'cx-1-4',
  title: 'Electrolysis of Solutions and Half Equations',
  thumbnailTitle: 'Electrolysis and Half Equations',
  thumbnail: false,
  summary:
    'Electrolysis breaks down a molten or dissolved ionic compound with an electric current. In a solution, hydrogen forms at the cathode unless the metal is less reactive than hydrogen, and oxygen forms at the anode unless halide ions are present. Half equations show the electrons gained at the cathode and lost at the anode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals and Their Reactions', title: 'Electrolysis of Solutions', subtitle: 'and half equations' }],
      lines: [
        { say: 'Pass an electric current through molten lead two bromide, and it comes apart into lead and bromine. Do the same with salty water, and you get no sodium at all. The water has joined in.', caption: 'Pass an electric current through molten lead(II) bromide, and it comes apart into lead and bromine. Do the same with salty water, and you get no sodium at all. The water has joined in.', show: 'title' },
        { say: 'In this lesson, you will predict what forms at each electrode, and write the half equations that show the electrons moving.' },
      ],
    },
    {
      chapter: 'Electrolysis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electrolysis', md: 'Breaking down an ionic compound by passing an electric current through it. The compound must be **molten or dissolved**, so that its ions are free to move.' },
        { kind: 'callout', id: 'el', tone: 'definition', title: 'Cathode and anode', md: 'The **cathode** is the negative electrode: positive ions move to it. The **anode** is the positive electrode: negative ions move to it.' },
      ],
      lines: [
        { say: 'Electrolysis is the breaking down of an ionic compound by passing an electric current through it. The compound must be molten or dissolved, so that its ions are free to move.', show: 'def' },
        { say: 'The cathode is the negative electrode, and the anode is the positive electrode. Opposite charges attract, so positive ions move to the cathode, and negative ions move to the anode.', show: 'el', focus: 'el' },
        { say: 'A molten compound has only two kinds of ion. So molten zinc chloride gives zinc metal at the cathode, and chlorine gas at the anode.' },
      ],
    },
    {
      chapter: 'Electrolysis of a solution',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Electrode', 'What forms'],
          rows: [
            ['Cathode (negative)', '**Hydrogen**, unless the metal is less reactive than hydrogen. Then the **metal** forms.'],
            ['Anode (positive)', '**Oxygen**, unless chloride, bromide or iodide ions are present. Then the **halogen** forms.'],
          ],
        },
      ],
      lines: [
        { say: 'Water itself breaks up very slightly into hydrogen ions and hydroxide ions. So in a solution, two kinds of ion compete at each electrode, and two rules settle which one wins.', caption: 'Water itself breaks up very slightly into H⁺ and OH⁻ ions. So in a solution, two kinds of ion compete at each electrode, and two rules settle which one wins.' },
        { say: 'At the cathode, hydrogen forms, unless the metal is less reactive than hydrogen, like copper or silver. Then the metal forms.', show: 't.0', focus: 't.0' },
        { say: 'At the anode, oxygen forms, unless the solution contains chloride, bromide or iodide ions. Then the halogen forms.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Two solutions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solution', 'At the cathode', 'At the anode'],
          rows: [['Sodium chloride', 'Hydrogen', 'Chlorine'], ['Copper(II) sulfate', 'Copper', 'Oxygen']],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Molten or dissolved?', md: '**Molten** sodium chloride gives sodium at the cathode. Sodium chloride **solution** gives hydrogen.' },
      ],
      lines: [
        { say: 'Take sodium chloride solution. Sodium is more reactive than hydrogen, so hydrogen forms at the cathode. Chloride ions are present, so chlorine forms at the anode. Sodium hydroxide solution is left behind.', show: 't.0' },
        { say: 'Now copper two sulfate solution. Copper is less reactive than hydrogen, so copper coats the cathode. There are no halide ions, so oxygen forms at the anode.', caption: 'Now copper(II) sulfate solution. Copper is less reactive than hydrogen, so copper coats the cathode. There are no halide ions, so oxygen forms at the anode.', show: 't.1', focus: 't.1' },
        { say: 'Always check whether the compound is molten or dissolved. Molten sodium chloride gives sodium at the cathode, but the solution gives hydrogen.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Half equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Half equation', md: 'An equation for what happens at **one electrode**, with the electrons, $\\ce{e-}$, written in.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Pb^2+ + 2e- -> Pb}', '\\ce{2Br- -> Br2 + 2e-}'] },
      ],
      lines: [
        { say: 'A half equation shows what happens at one electrode, with the electrons written in.', show: 'def' },
        { say: 'At the cathode, a lead ion gains two electrons and becomes a lead atom. Gaining electrons is reduction, so reduction happens at the cathode.', caption: 'At the cathode: Pb²⁺ + 2e⁻ → Pb. Gaining electrons is reduction, so reduction happens at the cathode.', show: 'm.0', focus: 'm.0' },
        { say: 'At the anode, two bromide ions lose two electrons and become a bromine molecule. Losing electrons is oxidation, so oxidation happens at the anode.', caption: 'At the anode: 2Br⁻ → Br₂ + 2e⁻. Losing electrons is oxidation, so oxidation happens at the anode.', show: 'm.1', focus: 'm.1' },
        { say: 'A half equation must balance twice: the same atoms on both sides, and the same total charge on both sides.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many electrons balance this half equation? $\\ce{Al^3+ + n e- -> Al}$',
          choices: ['1', '2', '4', '3'],
          answer: 3,
          working: 'The right-hand side has no charge. The ion is 3+, so 3 electrons bring the left-hand side to zero.',
        },
      ],
      lines: [
        { say: 'Your turn. An aluminium ion, with a charge of three plus, becomes an aluminium atom at the cathode. How many electrons does it gain? Pause the video and try it.', caption: 'Your turn. How many electrons balance Al³⁺ + n e⁻ → Al? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three. The right-hand side has no charge, and the ion is three plus, so three electrons bring the left-hand side to zero.', show: 'q.answer' },
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
            'Positive ions go to the cathode; negative ions go to the anode.',
            'Solution, cathode: hydrogen, unless the metal is less reactive than hydrogen.',
            'Solution, anode: oxygen, unless halide ions are present.',
            'A half equation shows the electrons; atoms and charge must both balance.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Positive ions go to the cathode and are reduced. Negative ions go to the anode and are oxidised.', show: 'sum.0' },
        { say: 'In a solution, hydrogen forms at the cathode, unless the metal is less reactive than hydrogen.', show: 'sum.1' },
        { say: 'Oxygen forms at the anode, unless halide ions are present.', show: 'sum.2' },
        { say: 'And a half equation shows the electrons, with the atoms and the charge both balanced.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
