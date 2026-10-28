import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker, tag, waterMolecule } from './lib/c20-3a-figures.ts';

// Salt water: sodium ions and chloride ions spread evenly through the water.
const saltWater = figure(
  'sw',
  [
    beaker({
      w: 4.4,
      h: 4.6,
      level: 3.7,
      label: '\\text{salt water}',
      seed: 11,
      scatter: [
        { id: 'na', count: 5, tone: 'opp', sign: '+', r: 0.28 },
        { id: 'cl', count: 5, tone: 'adj', sign: '-', r: 0.38 },
      ],
    }),
  ],
  470,
);

// A water molecule, with the slightly negative oxygen end and the slightly positive hydrogen ends.
const waterFig = figure('w', [waterMolecule({ charges: true }), tag('name', [0, -2.5], '\\text{water, } \\ce{H2O}')], 400);

const video: Explainer = {
  id: 'c20-3-1',
  lessonId: 'c20-3-1',
  title: 'Solutions, Electrolytes and Dissociation, Part 1: Solutions, Solutes and Solvents',
  thumbnailTitle: 'Solutions, Solutes and Solvents',
  thumbnail: 'sw',
  summary:
    'A solution is a homogeneous mixture of a solute dissolved in a solvent; in an aqueous solution, marked (aq), the solvent is water. Water dissolves many ionic and polar substances because its molecules are polar, and when two liquids mix, the solvent is the one present in the larger amount.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Solutions, Solutes and Solvents', subtitle: 'What dissolving makes' }],
      lines: [
        { say: 'Stir a spoonful of table salt into a glass of water, and it disappears. Stir a spoonful of sugar into another glass, and that disappears as well.', show: 'title' },
        { say: 'The two glasses look the same, yet only the salt water conducts electricity. In this lesson, you will find out why, and write equations for what happens as a compound dissolves.' },
        { say: 'This first part names the parts of a solution. Later parts sort solutes into electrolytes and non-electrolytes, and show ionic compounds coming apart.' },
      ],
    },
    {
      chapter: 'Solute and solvent',
      layout: 'split',
      leftWidth: 520,
      left: [saltWater],
      right: [
        { kind: 'callout', id: 'sol', tone: 'definition', title: 'Solution', md: 'A **homogeneous mixture**: the same all the way through, with particles too small to see or to settle out.' },
        { kind: 'callout', id: 'parts', tone: 'definition', title: 'Solute and solvent', md: 'The **solute** is the substance that dissolves. The **solvent** is the substance it dissolves in.' },
        { kind: 'text', id: 'ex', size: 'md', md: 'Salt water: the solute is sodium chloride, $\\ce{NaCl}$, and the solvent is water.' },
      ],
      lines: [
        { say: 'A solution is a homogeneous mixture. It is the same all the way through, and its particles are too small to see, or to settle out.', show: ['sw.glass', 'sw.liquid', 'sol'] },
        { say: 'The solute is the substance that dissolves. The solvent is the substance it dissolves in.', show: 'parts' },
        { say: 'In salt water, sodium chloride is the solute, and water is the solvent. Its ions spread evenly through the water, and never settle out.', show: ['sw.na', 'sw.cl', 'sw.label', 'ex'], focus: ['sw.na', 'sw.cl'] },
        { say: 'A solution can hold more than one solute. Sea water holds many different salts, and a fizzy drink holds both sugar and carbon dioxide in the same water.', focus: 'sw' },
      ],
    },
    {
      chapter: 'Aqueous solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Aqueous solution', md: 'A solution in which **water** is the solvent. The state symbol **(aq)** marks a substance dissolved in water.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NaCl(aq)}\\text{: a solution of sodium chloride}', '\\ce{NaCl(s)}\\text{: the solid}'] },
        { kind: 'text', id: 'sym', size: 'md', align: 'center', md: '(s) solid  ·  (l) liquid  ·  (g) gas  ·  (aq) aqueous' },
      ],
      lines: [
        { say: 'A solution in which water is the solvent is called an aqueous solution. In a formula, the state symbol A Q, in brackets, marks a substance dissolved in water.', caption: 'A solution in which water is the solvent is called an aqueous solution. In a formula, the state symbol (aq) marks a substance dissolved in water.', show: 'def' },
        { say: 'So sodium chloride, A Q, is a solution of sodium chloride, while sodium chloride, S, is the solid itself.', caption: 'So NaCl(aq) is a solution of sodium chloride, while NaCl(s) is the solid itself.', show: 'm', focus: 'm' },
        { say: 'The other state symbols are S for solid, L for liquid, and G for gas.', caption: 'The other state symbols are (s) for solid, (l) for liquid and (g) for gas.', show: 'sym', focus: 'sym' },
      ],
    },
    {
      chapter: 'The universal solvent',
      layout: 'split',
      leftWidth: 480,
      left: [waterFig],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Water dissolves more substances, and a wider range of them, than any other common liquid.',
            'Its molecules are **polar** and form **hydrogen bonds**, so water attracts ions and polar molecules strongly.',
            '**Like dissolves like:** non-polar oil and wax hardly dissolve in water at all.',
          ],
        },
      ],
      lines: [
        { say: 'Water is often called the universal solvent, because it dissolves more substances, and a wider range of them, than any other common liquid.', show: ['w.mol', 'w.name', 'b.0'] },
        { say: 'Its molecules are polar. The oxygen end is slightly negative, and the hydrogen ends are slightly positive.', show: 'w.charges', focus: 'w.charges' },
        { say: 'Water molecules also form hydrogen bonds. So water attracts ions and other polar molecules strongly, and pulls them into solution.', show: 'b.1', focus: 'w' },
        { say: 'The name is an exaggeration, though. As like dissolves like predicts, non-polar substances such as oil and wax hardly dissolve in water at all.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Which is the solvent?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A cleaning solution is made by mixing $50\\ \\text{mL}$ of ethanol, $\\ce{C2H5OH}$, with $200\\ \\text{mL}$ of water. Name the solute and the solvent.' },
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Both are liquids, so the solvent is the one present in the **larger amount**: water.',
            'Ethanol is the solute. It is dissolved in water: $\\ce{C2H5OH(aq)}$.',
            'The solution is **aqueous**.',
          ],
        },
      ],
      lines: [
        { say: 'A cleaning solution is made by mixing fifty millilitres of ethanol with two hundred millilitres of water. Name the solute and the solvent.', show: 'q' },
        { say: 'Both are liquids, so the solvent is the one present in the larger amount: water.', show: 's.0', focus: 's.0' },
        { say: 'Ethanol is the solute. It is dissolved in water, so its state symbol is A Q, and the solution is aqueous.', caption: 'Ethanol is the solute. It is dissolved in water, so it is written C₂H₅OH(aq), and the solution is aqueous.', show: ['s.1', 's.2'], focus: ['s.1', 's.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution is made by mixing $30\\ \\text{mL}$ of water with $120\\ \\text{mL}$ of ethanol. Which statement is correct?',
          choices: [
            'Water is the solvent, because water is always the solvent.',
            'Ethanol is the solvent, because there is more of it.',
            'Ethanol is the solute, because it is a liquid.',
            'Two liquids cannot form a solution.',
          ],
          answer: 1,
          working: 'Both substances are liquids, so the solvent is the one present in the larger amount: $120\\ \\text{mL}$ of ethanol. Water is the solute here.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution is made by mixing thirty millilitres of water with one hundred twenty millilitres of ethanol. Which statement is correct? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. With two liquids, the solvent is the one present in the larger amount, and here that is ethanol. Choice A is the trap: water is often the solvent, but not always.', show: 'q.answer' },
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
            'A **solution** is a homogeneous mixture: a **solute** dissolved in a **solvent**.',
            'In an **aqueous** solution, marked (aq), the solvent is water.',
            'Water dissolves many ionic and polar substances, but not non-polar ones such as oil.',
            'With two liquids, the solvent is the one present in the larger amount.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A solution is a homogeneous mixture: a solute dissolved in a solvent.', show: 'sum.0' },
        { say: 'In an aqueous solution, marked A Q, the solvent is water.', caption: 'In an aqueous solution, marked (aq), the solvent is water.', show: 'sum.1' },
        { say: 'Water dissolves many ionic and polar substances, but not non-polar ones such as oil.', show: 'sum.2' },
        { say: 'And with two liquids, the solvent is the one present in the larger amount. In part two, you will see why salt water conducts electricity, and sugar water does not. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
