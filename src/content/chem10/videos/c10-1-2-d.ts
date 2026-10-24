import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { room, tag } from './lib/c10-1-figures.ts';

// Sugar particles spread out between the water particles of a solution.
const solution = figure(
  'sol',
  [
    particles({ state: 'liquid', size: 4.5, open: true, seed: 6, kinds: [{ id: 'water', tone: 'adj', count: 22 }, { id: 'sugar', tone: 'theta', count: 5 }] }),
    tag('water-l', [4.8, 1.0], '\\text{water: the solvent}', { place: 'right', tone: 'adj', group: 'water' }),
    tag('sugar-l', [4.8, 2.4], '\\text{sugar: the solute}', { place: 'right', tone: 'theta', group: 'sugar' }),
    room('room', [0, 0], [10.4, 0]),
  ],
  400,
);

const video: Explainer = {
  id: 'c10-1-2-d',
  lessonId: 'c10-1-2',
  title: 'Pure Substances and Mixtures, Part 4: Solutions',
  thumbnailTitle: 'Solutions',
  thumbnail: 'sol',
  summary:
    'A solution is a homogeneous mixture of a solute dissolved in a solvent; when both are liquids or both gases, the solvent is the one present in the larger amount. No mass is lost or gained when a solute dissolves: mass of solution = mass of solute + mass of solvent, so 12.5 g of sugar in 150.0 g of water makes 162.5 g of solution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 4', title: 'Solutions', subtitle: 'Solute, solvent and mass' }],
      lines: [
        { say: 'Stir a spoonful of sugar into water, and it seems to vanish. But the sugar is still there, and a balance can prove it.', show: 'title' },
        { say: 'In this part, you will name the solute, the solvent and the solution, and find the mass of a solution.' },
      ],
    },
    {
      chapter: 'Solute and solvent',
      layout: 'split',
      leftWidth: 600,
      left: [solution],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Solution', md: 'A homogeneous mixture of a **solute**, the substance that dissolves, in a **solvent**, the substance it dissolves in. With water as the solvent, it is an **aqueous** solution.' }],
      lines: [
        { say: 'Many homogeneous mixtures are solutions: one substance dissolved in another.', show: 'def' },
        { say: 'The solute is the substance that dissolves, and the solvent is the substance it dissolves in. A solution with water as its solvent is an aqueous solution.' },
        { say: 'When sugar dissolves in water, the sugar particles spread out between the water particles. Sugar is the solute, and water is the solvent.', show: 'sol' },
      ],
    },
    {
      chapter: 'Gases, liquids and solids',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solution', 'Solute', 'Solvent'],
          rows: [
            ['sparkling water', 'carbon dioxide (a gas)', 'water (a liquid)'],
            ['vinegar', 'acetic acid (a liquid)', 'water (a liquid)'],
            ['brass', 'zinc (a solid)', 'copper (a solid)'],
            ['air', 'oxygen, argon and others', 'nitrogen (a gas)'],
          ],
        },
        { kind: 'text', id: 'rule', size: 'md', md: 'Both liquids, or both gases? The **solvent** is the one present in the **larger amount**.' },
      ],
      lines: [
        { say: 'A solute and its solvent need not be a solid and a liquid. Sparkling water is carbon dioxide gas dissolved in water, and vinegar is a liquid, acetic acid, dissolved in water.', show: ['t.0', 't.1'] },
        { say: 'Brass is zinc dissolved in copper: solid solutions of metals are called alloys. And air is oxygen, argon and other gases dissolved in nitrogen.', show: ['t.2', 't.3'] },
        { say: 'When both are liquids, or both are gases, the solvent is the one present in the larger amount. In thirty millilitres of ethanol mixed with seventy of water, water is the solvent.', show: 'rule' },
      ],
    },
    {
      chapter: 'Mass of a solution',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rule', size: 'md', lines: ['\\text{mass of solution} = \\text{mass of solute} + \\text{mass of solvent}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12.5\\ \\text{g} + 150.0\\ \\text{g} = 162.5\\ \\text{g}'] },
      ],
      lines: [
        { say: 'When a solute dissolves, no particles are made or destroyed, so no mass is lost or gained. The mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'rule' },
        { say: 'Kwame dissolves twelve point five grams of sugar in one hundred fifty point zero grams of water. The solution has a mass of one hundred sixty-two point five grams.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Finding the mass of a solute',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Empty beaker: $95.0\\ \\text{g}$. With water: $245.0\\ \\text{g}$. After some salt dissolves: $263.4\\ \\text{g}$. What mass of salt dissolved?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{water: } 245.0 - 95.0 = 150.0\\ \\text{g}', '\\text{solution: } 263.4 - 95.0 = 168.4\\ \\text{g}', '\\text{salt: } 168.4 - 150.0 = 18.4\\ \\text{g}'] },
      ],
      lines: [
        { say: 'An empty beaker has a mass of ninety-five point zero grams, and with water in it, two hundred forty-five point zero. After some salt dissolves, the total is two hundred sixty-three point four grams. What mass of salt dissolved?', show: 'q' },
        { say: 'The water is two hundred forty-five point zero minus ninety-five point zero: one hundred fifty point zero grams.', show: 'm.0', focus: 'm.0' },
        { say: 'The solution is two hundred sixty-three point four minus ninety-five point zero: one hundred sixty-eight point four grams.', show: 'm.1', focus: 'm.1' },
        { say: 'So the salt is the solution minus the water: one hundred sixty-eight point four minus one hundred fifty point zero, which is eighteen point four grams.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Masses add up',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A dissolved solid still has mass', md: 'A solution weighs exactly as much as the solute and solvent did before. Volumes do not always add up: $50\\ \\text{mL}$ of ethanol and $50\\ \\text{mL}$ of water make a little **less** than $100\\ \\text{mL}$. Masses always add up.' }],
      lines: [
        { say: 'Dissolved sugar seems to disappear, but its particles are all still there. Masses always add up.', show: 'oops' },
        { say: 'Volumes do not always add up: fifty millilitres of ethanol and fifty of water make a little less than one hundred millilitres, because the two kinds of particle pack together more closely.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Amara dissolves $8.5\\ \\text{g}$ of salt in $120.0\\ \\text{g}$ of water. What is the mass of the solution?',
          choices: ['$111.5\\ \\text{g}$', '$120.0\\ \\text{g}$', '$8.5\\ \\text{g}$', '$128.5\\ \\text{g}$'],
          answer: 3,
          working: 'Mass of solution = mass of solute + mass of solvent $= 8.5 + 120.0 = 128.5\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Amara dissolves eight point five grams of salt in one hundred twenty point zero grams of water. What is the mass of the solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred twenty-eight point five grams: the salt plus the water. Choice B treats the salt as if it had vanished.', show: 'q.answer' },
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
            'A **solution** is a homogeneous mixture of a **solute** dissolved in a **solvent**.',
            'The solvent is the substance present in the larger amount.',
            'Mass of solution = mass of solute + mass of solvent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A solution is a homogeneous mixture of a solute dissolved in a solvent.', show: 'sum.0' },
        { say: 'When both are liquids, or both gases, the solvent is the one present in the larger amount.', show: 'sum.1' },
        { say: 'And the mass of a solution is the mass of the solute plus the mass of the solvent. That completes this lesson on pure substances and mixtures.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
