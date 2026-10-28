import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, energyLevels, labels, mol, row, stack } from './lib/c10-4-figures.ts';

// Hydrogen and chlorine: the bonds break (energy in), and new bonds form (energy out).
const bondsRow = row({
  terms: [
    stack(mol('h2', ['H', 'H']), mol('cl2', ['Cl', 'Cl'])),
    arrow('in', '\\text{energy in}', { tone: 'adj', length: 2.4 }),
    stack(mol('ha', ['H']), mol('hb', ['H'])),
    stack(mol('ca', ['Cl']), mol('cb', ['Cl'])),
    arrow('out', '\\text{energy out}', { tone: 'opp', length: 2.4 }),
    stack(mol('hcl1', ['H', 'Cl']), mol('hcl2', ['H', 'Cl'])),
  ],
});
const bonds = figure(
  'b',
  [
    bondsRow,
    labels([
      { id: 'brk', at: [bondsRow.mid.in, -1.35], tex: '\\text{breaking bonds}', tone: 'adj' },
      { id: 'mk', at: [bondsRow.mid.out, -1.35], tex: '\\text{making bonds}', tone: 'opp' },
    ]),
  ],
  300,
);
// The lesson's diagrams: exothermic (250, 350, 100 kJ) and endothermic (100, 350, 250 kJ).
const exo = figure('ex', [energyLevels({ reactants: 250, peak: 350, products: 100, per: 100, step: 100, max: 500 })], 460);
const endo = figure('en', [energyLevels({ reactants: 100, peak: 350, products: 250, per: 100, step: 100, max: 500 })], 460);
const parts = (d: string) => [`${d}.axes`, `${d}.curve`, `${d}.reactants`, `${d}.products`];

const video: Explainer = {
  id: 'c10-4-4-b',
  lessonId: 'c10-4-4',
  title: 'Energy in Reactions, Part 2: Bonds and Energy Level Diagrams',
  thumbnailTitle: 'Bonds and Energy Diagrams',
  thumbnail: 'ex',
  summary:
    'Breaking bonds takes in energy and making bonds gives it out, so the energy change is the energy taken in minus the energy given out. An energy level diagram shows the reactants, a hump whose height above the reactants is the activation energy, and the products: lower than the reactants for an exothermic reaction, higher for an endothermic one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 2', title: 'Bonds and Energy Diagrams', subtitle: 'Why energy goes out or in' }],
      lines: [
        { say: 'Burning gas gives out heat, but splitting water needs a steady supply of electricity. Why do some reactions give out energy, while others take it in?', show: 'title' },
        { say: 'In this part, you will explain energy changes with bonds, and draw them on energy level diagrams.' },
      ],
    },
    {
      chapter: 'Breaking and making bonds',
      layout: 'center',
      main: [bonds, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{energy change} = \\text{energy taken in breaking bonds}', '{} - \\text{energy given out making bonds}'] }],
      lines: [
        { say: 'A reaction breaks the bonds holding the reactant particles together, and makes the new bonds of the products. Here, hydrogen and chlorine react to form hydrogen chloride.', show: ['b.h2', 'b.cl2'] },
        { say: 'Breaking bonds takes in energy. You have to pull the atoms apart.', show: ['b.in', 'b.ha', 'b.hb', 'b.ca', 'b.cb', 'b.brk'], focus: 'b.in' },
        { say: 'Making bonds gives out energy, as the atoms pull together.', show: ['b.out', 'b.hcl1', 'b.hcl2', 'b.mk'], focus: 'b.out' },
        { say: 'If making the new bonds gives out more energy than breaking the old ones takes in, the reaction is exothermic. If breaking takes in more, it is endothermic.', focus: 'b' },
        { say: 'So the energy change is the energy taken in breaking bonds, minus the energy given out making bonds.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Bonds broken and made',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Breaking the bonds of the reactants takes in $1370\\ \\text{kJ}$, and making the bonds of the products gives out $1850\\ \\text{kJ}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{energy change} = 1370 - 1850 = -480\\ \\text{kJ}', '\\text{negative: exothermic}'] },
      ],
      lines: [
        { say: 'In a reaction, breaking the bonds of the reactants takes in 1,370 kilojoules, and making the bonds of the products gives out 1,850 kilojoules.', show: 'q' },
        { say: 'The energy change is 1,370 minus 1,850, which is negative 480 kilojoules.', show: 'm.0', focus: 'm.0' },
        { say: 'More energy is given out making bonds than is taken in breaking them, so the reaction is exothermic.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Energy level diagrams',
      layout: 'split',
      leftWidth: 640,
      left: [exo],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Activation energy', md: 'The smallest energy colliding particles need to react: the hump’s height **above the reactants**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{350 - 250 = 100\\ \\text{kJ}}', '\\good{100 - 250 = -150\\ \\text{kJ}}'] },
      ],
      lines: [
        { say: 'An energy level diagram shows the energy of the reactants and the products as the reaction goes from left to right.', show: parts('ex') },
        { say: 'Even an exothermic reaction does not start by itself: a match must be struck before it burns. The reactants first have to climb an energy hill, the hump.' },
        { say: 'The activation energy is the smallest energy that particles must have when they collide for the reaction to happen: the height of the hump above the reactants, the orange arrow. Here, 350 minus 250, or 100 kilojoules.', show: ['def', 'ex.ea', 'm.0'], focus: ['ex.ea', 'm.0'] },
        { say: 'The products are lower than the reactants, so the reaction is exothermic. The energy change, the green arrow, is products minus reactants: 100 minus 250, or negative 150 kilojoules.', show: ['ex.dh', 'm.1'], focus: ['ex.dh', 'm.1'] },
      ],
    },
    {
      chapter: 'Endothermic diagrams',
      layout: 'split',
      leftWidth: 640,
      left: [endo],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{\\text{activation energy}}', '\\opp{350 - 100 = 250\\ \\text{kJ}}', '\\bad{\\text{energy change}}', '\\bad{250 - 100 = +150\\ \\text{kJ}}'] }],
      lines: [
        { say: 'In an endothermic reaction, the products are higher than the reactants. Energy has been taken in from the surroundings.', show: parts('en') },
        { say: 'Here the reactants are at 100 kilojoules and the top of the hump at 350, so the activation energy is 250 kilojoules.', show: ['en.ea', 'm.0', 'm.1'], focus: ['en.ea', 'm.1'] },
        { say: 'The products are at 250 kilojoules, so the energy change is 250 minus 100: positive 150 kilojoules.', show: ['en.dh', 'm.2', 'm.3'], focus: ['en.dh', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a reaction, breaking the bonds of the reactants takes in $945\\ \\text{kJ}$, and making the bonds of the products gives out $780\\ \\text{kJ}$. Find the energy change and classify the reaction.',
          choices: ['$-165\\ \\text{kJ}$, exothermic', '$+165\\ \\text{kJ}$, endothermic', '$+1725\\ \\text{kJ}$, endothermic', '$-165\\ \\text{kJ}$, endothermic'],
          answer: 1,
          working: 'Energy change $= 945 - 780 = +165\\ \\text{kJ}$. More energy is taken in breaking bonds than is given out making them: endothermic.',
        },
      ],
      lines: [
        { say: 'Your turn. Breaking the bonds of the reactants takes in 945 kilojoules, and making the bonds of the products gives out 780 kilojoules. Find the energy change, and classify the reaction. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. 945 minus 780 is positive 165 kilojoules: more energy is taken in than given out, so the reaction is endothermic. Choice A has the subtraction the wrong way round.', show: 'q.answer' },
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
            'Breaking bonds **takes in** energy; making bonds **gives it out**.',
            'Energy change $=$ energy taken in $-$ energy given out $=$ products $-$ reactants.',
            'The **activation energy** is the height of the hump above the reactants.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Breaking bonds takes in energy, and making bonds gives it out.', show: 'sum.0' },
        { say: 'The energy change is the energy taken in minus the energy given out. On a diagram, it is products minus reactants.', show: 'sum.1' },
        { say: 'And the activation energy is the height of the hump above the reactants. In part three, you will read diagrams and see what a catalyst does. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
