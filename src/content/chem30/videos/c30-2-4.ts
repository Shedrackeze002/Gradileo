import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { breathTube } from './lib/c30-2a-figures.ts';

// A breath tester's tube of orange dichromate crystals, turning green where the breath goes in.
const tube = figure('b', [breathTube()], 300);

const video: Explainer = {
  id: 'c30-2-4',
  lessonId: 'c30-2-4',
  title: 'Balancing Redox Equations, Part 1: Balancing a Half-Reaction',
  thumbnailTitle: 'Balancing a Half-Reaction',
  thumbnail: 'b',
  summary:
    'To balance a half-reaction in acidic solution, balance the atoms other than O and H, then oxygen with H₂O, hydrogen with H⁺, and charge with electrons on the more positive side: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. The number of electrons equals the change in oxidation number, which makes a quick check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Balancing a Half-Reaction', subtitle: 'Water, hydrogen ions and electrons' }],
      lines: [
        {
          say: 'Early breath-alcohol testers held orange crystals of potassium dye-chromate. Ethanol in the breath reduced the orange dye-chromate ions to green chromium three ions.',
          caption: 'Early breath-alcohol testers held orange crystals of potassium dichromate. Ethanol in the breath reduced the orange dichromate ions to green chromium(III) ions.',
          show: 'title',
        },
        { say: 'In this lesson, you will balance equations like that one with the half-reaction method. This part balances one half-reaction in acidic solution. Later parts combine two.' },
      ],
    },
    {
      chapter: 'The breath tester',
      layout: 'center',
      main: [tube, { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2Cr2O7^2- + 3C2H5OH + 16H+}', '\\ce{-> 4Cr^3+ + 3CH3COOH + 11H2O}'] }],
      lines: [
        { say: 'The further the green colour spread along the tube, the more alcohol there was.', show: ['b.tube', 'b.orange', 'b.orange-l', 'b.breath', 'b.green', 'b.green-l'] },
        { say: 'The balanced equation has coefficients like two, three, sixteen and eleven. No one finds those by trial and error.', show: 'm' },
      ],
    },
    {
      chapter: 'Six steps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'acid', size: 'md', align: 'center', md: 'An acidic solution holds plenty of $\\ce{H2O}$ and $\\ce{H+}$.' },
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**1. Skeleton:** the species with the element whose oxidation number changes.',
            '**2. Balance the atoms** other than O and H.',
            '**3. Balance oxygen** by adding $\\ce{H2O}$.',
            '**4. Balance hydrogen** by adding $\\ce{H+}$.',
            '**5. Balance charge** with electrons on the more positive side.',
            '**6. Check** the atoms and the total charge.',
          ],
        },
      ],
      lines: [
        { say: 'In acidic solution there is plenty of water and plenty of hydrogen ions, so either can be added to a half-reaction as needed. Follow six steps in order.', show: 'acid' },
        { say: 'One: write the skeleton, the reactant and product that contain the element changing oxidation number.', show: 's.0' },
        { say: 'Two: balance the atoms other than oxygen and hydrogen, with coefficients.', show: 's.1' },
        { say: 'Three: balance oxygen by adding water to the side that needs oxygen. Four: balance hydrogen by adding hydrogen ions to the side that needs hydrogen.', show: ['s.2', 's.3'] },
        { say: 'Five: balance charge by adding electrons to the side with the more positive total. Six: check the atoms and the charge.', show: ['s.4', 's.5'] },
      ],
    },
    {
      chapter: 'Permanganate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Balance $\\ce{MnO4- -> Mn^2+}$ in acidic solution.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{MnO4- -> Mn^2+ + 4H2O}',
            '\\ce{MnO4- + 8H+ -> Mn^2+ + 4H2O}',
            '\\text{Charge: } {-1} + 8 = {+7} \\qquad {+2}',
            '\\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}',
          ],
        },
      ],
      lines: [
        {
          say: 'Balance permanganate ions giving manganese two ions, in acidic solution. Manganese is already balanced: one on each side.',
          caption: 'Balance permanganate ions giving manganese(II) ions, MnO₄⁻ → Mn²⁺, in acidic solution. Manganese is already balanced: one on each side.',
          show: 'q',
        },
        { say: 'Oxygen: four on the left, none on the right. Add four water molecules to the right.', show: 'm.0', focus: 'm.0' },
        { say: 'Hydrogen: now there are eight on the right. Add eight hydrogen ions to the left.', show: 'm.1', focus: 'm.1' },
        { say: 'Charge: minus one plus eight is plus seven on the left, and plus two on the right.', show: 'm.2', focus: 'm.2' },
        { say: 'Add five electrons to the left, the more positive side. Plus seven minus five is plus two, so the charge balances. The electrons are gained, so this is a reduction.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A quick check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Mn}\\text{: } {+7} \\text{ in } \\ce{MnO4-} \\to {+2} \\text{ in } \\ce{Mn^2+}', '\\text{a drop of } 5 \\;\\Rightarrow\\; \\ce{5e-} \\text{ gained} \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'The number of electrons always matches the change in oxidation number. Manganese is plus seven in permanganate, and plus two in the manganese two ion.', caption: 'The number of electrons always matches the change in oxidation number. Manganese is +7 in permanganate, and +2 in the manganese(II) ion.', show: 'm.0' },
        { say: 'It drops by five, and five electrons are gained. That makes a quick check on your work.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Balance $\\ce{NO3- -> NO}$ in acidic solution: $\\ce{NO3-} + \\square\\,\\ce{H+} + \\square\\,\\ce{e-} \\longrightarrow \\ce{NO} + \\square\\,\\ce{H2O}$. Which numbers go in the boxes, in order?',
          choices: ['$2,\\ 1,\\ 1$', '$4,\\ 5,\\ 2$', '$4,\\ 3,\\ 2$', '$6,\\ 3,\\ 3$'],
          answer: 2,
          working: 'Oxygen: add $\\ce{2H2O}$ to the right. Hydrogen: add $\\ce{4H+}$ to the left. Charge: $-1 + 4 = +3$ on the left and 0 on the right, so add 3 electrons to the left. Check: nitrogen goes from $+5$ to $+2$, a drop of 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Balance nitrate ions giving nitrogen monoxide, in acidic solution. Which numbers go in the boxes? Pause the video and try it.', caption: 'Your turn. Balance NO₃⁻ → NO in acidic solution. Which numbers go in the boxes? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C. Two waters on the right balance oxygen, four hydrogen ions on the left balance hydrogen, and three electrons bring plus three down to zero. Nitrogen drops from plus five to plus two: three electrons. Choice B leaves a charge of minus two on the left.',
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
            'Balance atoms other than O and H, then O with $\\ce{H2O}$, H with $\\ce{H+}$, and charge with electrons.',
            'Electrons go on the **more positive** side: on the left for a reduction, on the right for an oxidation.',
            'The number of electrons equals the change in oxidation number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Balance the atoms other than oxygen and hydrogen, then oxygen with water, hydrogen with hydrogen ions, and charge with electrons.', show: 'sum.0' },
        { say: 'Electrons go on the more positive side: on the left for a reduction, and on the right for an oxidation.', show: 'sum.1' },
        { say: 'Their number equals the change in oxidation number. In part two, you will balance dye-chromate, and an oxidation. See you there!', caption: 'Their number equals the change in oxidation number. In part two, you will balance dichromate, and an oxidation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
