import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-2-4-c',
  lessonId: 'c30-2-4',
  title: 'Balancing Redox Equations, Part 3: Combining Half-Reactions',
  thumbnailTitle: 'Combining Half-Reactions',
  thumbnail: false,
  summary:
    'To combine two balanced half-reactions, multiply each so the electrons lost equal the electrons gained, add them, cancel what appears on both sides, and check the atoms and the charge. Permanganate and iron(II) give MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O, with +17 on each side. Multiply every coefficient of a half-reaction, not just its electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Combining Half-Reactions', subtitle: 'Match the electrons, add, and cancel' }],
      lines: [
        { say: 'Deep purple permanganate solution loses its colour as it reacts with iron two ions. Chemists use this reaction to measure how much iron a sample holds.', caption: 'Deep purple permanganate solution loses its colour as it reacts with iron(II) ions. Chemists use this reaction to measure how much iron a sample holds.', show: 'title' },
        { say: 'In this part, you will combine two balanced half-reactions into one balanced redox equation.' },
      ],
    },
    {
      chapter: 'Four more steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**7. Multiply** each half-reaction so the electrons lost equal the electrons gained.',
            '**8. Add** the two half-reactions.',
            '**9. Cancel** what appears on both sides: all the electrons, and any $\\ce{H+}$ and $\\ce{H2O}$.',
            '**10. Check** the atoms and the charge.',
          ],
        },
      ],
      lines: [
        { say: 'Once both half-reactions are balanced, four more steps finish the job. Seven: multiply each half-reaction so the electrons lost equal the electrons gained.', show: 's.0' },
        { say: 'Eight: add the two half-reactions.', show: 's.1' },
        { say: 'Nine: cancel what appears on both sides: all the electrons, and any hydrogen ions and water.', show: 's.2' },
        { say: 'Ten: check the atoms and the charge.', show: 's.3' },
      ],
    },
    {
      chapter: 'Permanganate and iron(II)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\opp{\\text{Oxidation: }} \\ce{Fe^2+ -> Fe^3+ + e-} \\quad \\times 5',
            '\\adj{\\text{Reduction: }} \\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}',
            '\\ce{5Fe^2+ -> 5Fe^3+ + 5e-}',
            '\\ce{MnO4- + 5Fe^2+ + 8H+ + $\\bad{\\cancel{5e^-}}$}',
            '\\ce{-> Mn^2+ + 5Fe^3+ + 4H2O + $\\bad{\\cancel{5e^-}}$}',
            '\\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}',
            '\\text{Charge: } {-1} + 10 + 8 = {+17} \\qquad 2 + 15 = {+17} \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        {
          say: 'Combine iron two giving iron three plus one electron, with the permanganate half-reaction from part one.',
          caption: 'Combine Fe²⁺ → Fe³⁺ + e⁻ with the permanganate half-reaction from part one.',
          show: ['m.0', 'm.1'],
        },
        { say: 'The oxidation gives one electron, and the reduction takes five. So multiply the oxidation by five: five iron two ions give five iron three ions plus five electrons.', caption: 'The oxidation gives one electron, and the reduction takes five. So multiply the oxidation by five: 5Fe²⁺ → 5Fe³⁺ + 5e⁻.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the two half-reactions. Five electrons appear on each side, so cancel them.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        {
          say: 'Permanganate, plus five iron two ions, plus eight hydrogen ions, gives manganese two ions, plus five iron three ions, plus four water.',
          caption: 'MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O',
          show: 'm.5',
          focus: 'm.5',
        },
        { say: 'Check the charge: minus one, plus ten, plus eight is plus seventeen on the left. Two plus fifteen is plus seventeen on the right.', show: 'm.6', focus: 'm.6' },
      ],
    },
    {
      chapter: 'Multiply the whole half-reaction',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Forgetting to multiply the whole half-reaction',
          md: 'Every coefficient is multiplied: the water and hydrogen ions too, not just the electrons. Otherwise the atoms do not balance.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\times 2\\text{: } \\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}',
            '\\bad{\\ce{2Cr2O7^2- + 14H+ + 12e- -> 4Cr^3+ + 7H2O}} \\quad \\text{O: } 14 \\ne 7',
            '\\good{\\ce{2Cr2O7^2- + 28H+ + 12e- -> 4Cr^3+ + 14H2O}} \\quad \\text{O: } 14 = 14',
          ],
        },
      ],
      lines: [
        { say: 'Watch out. When a half-reaction is multiplied, every coefficient in it is multiplied: the water and hydrogen ions too, not just the electrons.', show: 'oops' },
        {
          say: 'Say the dye-chromate half-reaction is doubled. Doubling only the dye-chromate, the chromium and the electrons leaves fourteen oxygen atoms on the left, and seven on the right.',
          caption: 'Say the dichromate half-reaction is doubled. Doubling only the dichromate, the chromium and the electrons leaves fourteen oxygen atoms on the left, and seven on the right.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        { say: 'Double everything: twenty-eight hydrogen ions and fourteen water molecules as well. Now the atoms balance.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Combine $\\ce{Sn^2+ -> Sn^4+ + 2e-}$ and $\\ce{Fe^3+ + e- -> Fe^2+}$: $\\square\\,\\ce{Sn^2+} + \\square\\,\\ce{Fe^3+} \\longrightarrow \\square\\,\\ce{Sn^4+} + \\square\\,\\ce{Fe^2+}$. Which coefficients balance it, in order?',
          choices: ['$1,\\ 1,\\ 1,\\ 1$', '$2,\\ 1,\\ 2,\\ 1$', '$2,\\ 2,\\ 2,\\ 2$', '$1,\\ 2,\\ 1,\\ 2$'],
          answer: 3,
          working: 'The oxidation gives 2 electrons and the reduction takes 1, so multiply the reduction by 2: $\\ce{2Fe^3+ + 2e- -> 2Fe^2+}$. Add and cancel the electrons: $\\ce{Sn^2+ + 2Fe^3+ -> Sn^4+ + 2Fe^2+}$. Charge: $2 + 6 = +8$ on the left and $4 + 4 = +8$ on the right.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Combine tin two giving tin four plus two electrons, with iron three plus one electron giving iron two. Which coefficients balance the equation? Pause the video and try it.',
          caption: 'Your turn. Combine Sn²⁺ → Sn⁴⁺ + 2e⁻ with Fe³⁺ + e⁻ → Fe²⁺. Which coefficients balance the equation? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D: one, two, one, two. The oxidation gives two electrons and the reduction takes one, so the reduction is used twice. Charge: plus eight on each side. Choice A forgets to match the electrons, so its charge does not balance.',
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
            'Multiply the half-reactions so the electrons lost equal the electrons gained.',
            'Add them, and cancel the electrons and anything else on both sides.',
            'Multiply **every** coefficient of a half-reaction, then check the atoms and the charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Multiply the half-reactions so the electrons lost equal the electrons gained.', show: 'sum.0' },
        { say: 'Add them, and cancel the electrons and anything else that appears on both sides.', show: 'sum.1' },
        { say: 'Multiply every coefficient, and check at the end. In part four, you will balance the breath tester reaction, where water and hydrogen ions cancel too. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
