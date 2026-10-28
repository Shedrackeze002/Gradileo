import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { breathTube } from './lib/c30-2a-figures.ts';

// The breath tester's tube again: orange dichromate turning green.
const tube = figure('b', [breathTube()], 260);

const video: Explainer = {
  id: 'c30-2-4-d',
  lessonId: 'c30-2-4',
  title: 'Balancing Redox Equations, Part 4: Balancing the Breath Tester',
  thumbnailTitle: 'Balancing the Breath Tester',
  thumbnail: 'b',
  summary:
    'The breath tester reaction combines the dichromate reduction (6 electrons) with the oxidation of ethanol, C₂H₅OH + H₂O → CH₃COOH + 4H⁺ + 4e⁻. Multiply by 2 and 3 to transfer 12 electrons, add, and keep only the difference of the hydrogen ions and water on both sides: 2Cr₂O₇²⁻ + 3C₂H₅OH + 16H⁺ → 4Cr³⁺ + 3CH₃COOH + 11H₂O. In basic solution, OH⁻ is added to both sides at the end.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: 'Balancing the Breath Tester', subtitle: 'When water and hydrogen ions cancel' }],
      lines: [
        {
          say: 'Back to the breath tester. Dye-chromate ions react with ethanol to form chromium three ions and ethanoic acid.',
          caption: 'Back to the breath tester. Dichromate ions react with ethanol to form chromium(III) ions and ethanoic acid.',
          show: 'title',
        },
        { say: 'This time both half-reactions contain water and hydrogen ions, and some of them cancel. In this part, you will balance the whole equation.' },
      ],
    },
    {
      chapter: 'Two half-reactions',
      layout: 'center',
      main: [
        tube,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{Cr2O7^2- + C2H5OH -> Cr^3+ + CH3COOH}',
            '\\adj{\\text{Reduction: }} \\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}',
            '\\opp{\\text{Oxidation: }} \\ce{C2H5OH + H2O -> CH3COOH + 4H+ + 4e-}',
          ],
        },
      ],
      lines: [
        {
          say: 'Balance dye-chromate plus ethanol, giving chromium three ions plus ethanoic acid, in acidic solution.',
          caption: 'Balance Cr₂O₇²⁻ + C₂H₅OH → Cr³⁺ + CH₃COOH in acidic solution.',
          show: ['b.tube', 'b.orange', 'b.green', 'b.breath', 'b.orange-l', 'b.green-l', 'm.0'],
        },
        { say: 'The reduction is the dye-chromate half-reaction from part two. Six electrons are gained.', caption: 'The reduction is the dichromate half-reaction from part two. Six electrons are gained.', show: 'm.1', focus: 'm.1' },
        {
          say: 'For the oxidation, carbon is balanced, two on each side. Ethanoic acid has one more oxygen, so add one water to the left. That makes eight hydrogen atoms on the left and four on the right, so add four hydrogen ions to the right.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'Charge: zero on the left, plus four on the right. Add four electrons to the right. Four electrons are lost.' },
      ],
    },
    {
      chapter: 'Match the electrons',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '6 \\text{ and } 4\\text{: least common multiple } 12',
            '\\times 2\\text{: } \\ce{2Cr2O7^2- + 28H+ + 12e- -> 4Cr^3+ + 14H2O}',
            '\\times 3\\text{: } \\ce{3C2H5OH + 3H2O -> 3CH3COOH + 12H+ + 12e-}',
          ],
        },
      ],
      lines: [
        { say: 'Six electrons and four electrons: the least common multiple is twelve. So multiply the reduction by two, and the oxidation by three.', show: 'm.0', focus: 'm.0' },
        {
          say: 'The reduction becomes two dye-chromate, plus twenty-eight hydrogen ions, plus twelve electrons, giving four chromium three ions, plus fourteen water.',
          caption: 'The reduction becomes 2Cr₂O₇²⁻ + 28H⁺ + 12e⁻ → 4Cr³⁺ + 14H₂O.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The oxidation becomes three ethanol plus three water, giving three ethanoic acid, plus twelve hydrogen ions, plus twelve electrons.',
          caption: 'The oxidation becomes 3C₂H₅OH + 3H₂O → 3CH₃COOH + 12H⁺ + 12e⁻.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Cancel what appears twice',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{2Cr2O7^2- + 3C2H5OH + 28H+ + 3H2O}',
            '\\ce{-> 4Cr^3+ + 3CH3COOH + 14H2O + 12H+}',
            '\\ce{H+}\\text{: } 28 - 12 = 16 \\text{ on the left} \\qquad \\ce{H2O}\\text{: } 14 - 3 = 11 \\text{ on the right}',
            '\\ce{2Cr2O7^2- + 3C2H5OH + 16H+}',
            '\\ce{-> 4Cr^3+ + 3CH3COOH + 11H2O}',
            '\\text{Charge: } {-4} + 16 = {+12} \\qquad 4(+3) = {+12} \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        { say: 'Add them. The twelve electrons cancel, but hydrogen ions and water now appear on both sides.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Keep only the difference. Twenty-eight hydrogen ions on the left minus twelve on the right leaves sixteen on the left. Fourteen water on the right minus three on the left leaves eleven on the right.', show: 'm.2', focus: 'm.2' },
        {
          say: 'The balanced equation: two dye-chromate, plus three ethanol, plus sixteen hydrogen ions, gives four chromium three ions, plus three ethanoic acid, plus eleven water.',
          caption: 'The balanced equation: 2Cr₂O₇²⁻ + 3C₂H₅OH + 16H⁺ → 4Cr³⁺ + 3CH₃COOH + 11H₂O.',
          show: ['m.3', 'm.4'],
          focus: ['m.3', 'm.4'],
        },
        { say: 'Check the charge: minus four plus sixteen is plus twelve on the left, and four times plus three is plus twelve on the right.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Basic solutions',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'note',
          tone: 'tip',
          title: 'Basic solutions',
          md: 'Balance as if the solution were acidic, then add as many $\\ce{OH-}$ ions to **both** sides as there are $\\ce{H+}$ ions. Each $\\ce{H+}$ and $\\ce{OH-}$ together make $\\ce{H2O}$.',
        },
      ],
      lines: [
        { say: 'In a basic solution, there are almost no hydrogen ions. Balance the equation as if it were acidic, then add as many hydroxide ions to both sides as there are hydrogen ions.', show: 'note' },
        { say: 'Each hydrogen ion and hydroxide ion together make water. The questions in this unit use acidic solutions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'Combine $\\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ and $\\ce{SO3^2- + H2O -> SO4^2- + 2H+ + 2e-}$. In the balanced equation, how many $\\ce{H+}$ and $\\ce{H2O}$ are left, and on which side?',
          choices: [
            '$6\\ \\ce{H+}$ on the left, $3\\ \\ce{H2O}$ on the right',
            '$16\\ \\ce{H+}$ on the left, $8\\ \\ce{H2O}$ on the right',
            '$6\\ \\ce{H+}$ on the right, $3\\ \\ce{H2O}$ on the left',
            '$2\\ \\ce{H+}$ on the right, $1\\ \\ce{H2O}$ on the left',
          ],
          answer: 0,
          working:
            'The least common multiple of 5 and 2 is 10: reduction $\\times 2$, oxidation $\\times 5$. Then $16 - 10 = 6$ $\\ce{H+}$ on the left and $8 - 5 = 3$ $\\ce{H2O}$ on the right: $\\ce{2MnO4- + 5SO3^2- + 6H+ -> 2Mn^2+ + 5SO4^2- + 3H2O}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Combine the permanganate reduction with the oxidation of sulfite ions to sulfate ions. In the balanced equation, how many hydrogen ions and water molecules are left, and on which side? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A. Multiply the reduction by two and the oxidation by five, for ten electrons. Sixteen hydrogen ions minus ten leaves six on the left, and eight water minus five leaves three on the right. Choice B forgets to cancel.',
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
            'Match the electrons with the least common multiple, multiplying **whole** half-reactions.',
            'Add, cancel the electrons, and keep only the **difference** of $\\ce{H+}$ and $\\ce{H2O}$ on both sides.',
            'Check: $\\ce{2Cr2O7^2- + 3C2H5OH + 16H+ -> 4Cr^3+ + 3CH3COOH + 11H2O}$ has $+12$ on each side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Match the electrons with the least common multiple, multiplying whole half-reactions.', show: 'sum.0' },
        { say: 'Add them, cancel the electrons, and keep only the difference of the hydrogen ions and water on the two sides.', show: 'sum.1' },
        { say: 'Then check the atoms and the charge. That completes balancing redox equations. See you in the next lesson!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
