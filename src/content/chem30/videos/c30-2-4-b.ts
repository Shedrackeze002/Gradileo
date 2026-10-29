import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-2-4-b',
  lessonId: 'c30-2-4',
  title: 'Balancing Redox Equations, Part 2: Dichromate and an Oxidation',
  thumbnailTitle: 'Dichromate and an Oxidation',
  thumbnail: false,
  summary:
    'With two atoms of the changing element, balance it first: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O, where two chromium atoms each go from +6 to +3. An oxidation balances the same way with the electrons on the right: SO₂ + 2H₂O → SO₄²⁻ + 4H⁺ + 2e⁻. Once water and hydrogen ions have balanced the atoms, only electrons fix the charge.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'Dichromate and an Oxidation', subtitle: 'Two chromium atoms, and electrons on the right' }],
      lines: [
        { say: 'The orange dye-chromate ion in the breath tester holds two chromium atoms. Each one turns into a green chromium three ion.', caption: 'The orange dichromate ion in the breath tester holds two chromium atoms. Each one turns into a green chromium(III) ion.', show: 'title' },
        { say: 'In this part, you will balance that half-reaction, then an oxidation, and see a mistake to avoid.' },
      ],
    },
    {
      chapter: 'Dichromate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Cr2O7^2- -> 2Cr^3+}',
            '\\ce{Cr2O7^2- -> 2Cr^3+ + 7H2O}',
            '\\ce{Cr2O7^2- + 14H+ -> 2Cr^3+ + 7H2O}',
            '\\text{Charge: } {-2} + 14 = {+12} \\qquad 2(+3) = {+6}',
            '\\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}',
            '2 \\times ({+6} \\to {+3}) = 6 \\text{ electrons} \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        {
          say: 'Balance dye-chromate giving chromium three ions, in acidic solution. Chromium first: there are two on the left, so put a two in front of the chromium three ion.',
          caption: 'Balance Cr₂O₇²⁻ → Cr³⁺ in acidic solution. Chromium first: there are two on the left, so put a 2 in front of Cr³⁺.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Oxygen: seven on the left. Add seven water molecules to the right.', show: 'm.1', focus: 'm.1' },
        { say: 'Hydrogen: fourteen on the right. Add fourteen hydrogen ions to the left.', show: 'm.2', focus: 'm.2' },
        { say: 'Charge: minus two plus fourteen is plus twelve on the left. On the right, two times plus three is plus six. Add six electrons to the left.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'Check: each chromium goes from plus six to plus three, and there are two of them. Six electrons.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'An oxidation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{SO2 -> SO4^2-}',
            '\\ce{SO2 + 2H2O -> SO4^2-}',
            '\\ce{SO2 + 2H2O -> SO4^2- + 4H+}',
            '\\text{Charge: } 0 \\qquad {-2} + 4 = {+2}',
            '\\ce{SO2 + 2H2O -> SO4^2- + 4H+ + 2e-}',
          ],
        },
      ],
      lines: [
        {
          say: 'Oxidations balance the same way; the electrons simply end up on the right. Balance sulfur dye-oxide giving sulfate ions. Sulfur is balanced already.',
          caption: 'Oxidations balance the same way; the electrons simply end up on the right. Balance SO₂ → SO₄²⁻. Sulfur is balanced already.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Oxygen: two on the left, four on the right. Add two water molecules to the left.', show: 'm.1', focus: 'm.1' },
        { say: 'Hydrogen: four on the left now. Add four hydrogen ions to the right.', show: 'm.2', focus: 'm.2' },
        { say: 'Charge: zero on the left; minus two plus four is plus two on the right. The right is more positive, so add two electrons to the right.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'The electrons are lost, so this is an oxidation. Check: sulfur goes from plus four to plus six, two electrons.' },
      ],
    },
    {
      chapter: 'Only electrons fix the charge',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Balancing charge with hydrogen ions',
          md: 'Once $\\ce{H2O}$ and $\\ce{H+}$ have balanced the atoms, **only electrons** are left to add. More $\\ce{H+}$ would unbalance the hydrogen again.',
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which side?', md: 'Electrons carry a negative charge, so they go on the **more positive** side, to lower it.' },
      ],
      lines: [
        { say: 'Watch out. Once water and hydrogen ions have balanced the atoms, the only thing left to add is electrons. Adding more hydrogen ions to fix the charge unbalances the hydrogen again.', show: 'oops' },
        { say: 'And electrons go on the more positive side. They carry a negative charge, so they lower it. In dye-chromate, six electrons brought plus twelve down to plus six.', caption: 'And electrons go on the more positive side. They carry a negative charge, so they lower it. In dichromate, six electrons brought +12 down to +6.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Balance $\\ce{ClO3- -> Cl-}$ in acidic solution: $\\ce{ClO3-} + \\square\\,\\ce{H+} + \\square\\,\\ce{e-} \\longrightarrow \\ce{Cl-} + \\square\\,\\ce{H2O}$. Which numbers go in the boxes, in order?',
          choices: ['$6,\\ 4,\\ 3$', '$6,\\ 6,\\ 3$', '$3,\\ 6,\\ 3$', '$6,\\ 6,\\ 6$'],
          answer: 1,
          working: 'Oxygen: add $\\ce{3H2O}$ to the right. Hydrogen: add $\\ce{6H+}$ to the left. Charge: $-1 + 6 = +5$ on the left and $-1$ on the right, so add 6 electrons to the left. Check: chlorine goes from $+5$ to $-1$, a drop of 6.',
        },
      ],
      lines: [
        { say: 'Your turn. Balance chlorate ions giving chloride ions, in acidic solution. Which numbers go in the boxes? Pause the video and try it.', caption: 'Your turn. Balance ClO₃⁻ → Cl⁻ in acidic solution. Which numbers go in the boxes? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Three waters on the right, six hydrogen ions on the left, and six electrons bring plus five down to minus one. Chlorine drops from plus five to minus one: six electrons. Choice A leaves the charge at plus one on the left.',
          caption: 'The answer is B. Three waters on the right, six hydrogen ions on the left, and six electrons bring +5 down to −1. Chlorine drops from +5 to −1: six electrons. Choice A leaves the charge at +1 on the left.',
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
            'With two atoms of the changing element, balance it first: $\\ce{Cr2O7^2- -> 2Cr^3+}$.',
            'In an oxidation the electrons end up on the right: $\\ce{SO2 + 2H2O -> SO4^2- + 4H+ + 2e-}$.',
            'After $\\ce{H2O}$ and $\\ce{H+}$, only electrons fix the charge, on the more positive side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the changing element has two atoms, balance it first.', show: 'sum.0' },
        { say: 'In an oxidation, the electrons end up on the right.', show: 'sum.1' },
        { say: 'After water and hydrogen ions, only electrons fix the charge. In part three, you will combine two half-reactions into one balanced equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
