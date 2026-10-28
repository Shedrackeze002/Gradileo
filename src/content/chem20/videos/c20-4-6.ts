import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, link, mol, star, type Placed } from './lib/c20-4b-figures.ts';

// The ammonia mixture shrunk to molecules in the same ratio, 2.00 : 4.50 = 4 : 9. Nine hydrogen
// molecules are enough for three rounds of N₂ + 3H₂ → 2NH₃, so six ammonia molecules form and one
// nitrogen molecule is left over.
const before: Placed[] = [
  ...[1.3, 3.25, 5.15].map((x, i): Placed => ({ mol: mol(`n${i}`, ['N', 'N']), at: [x, 5.2], group: 'n2' })),
  { mol: mol('n3', ['N', 'N']), at: [7.1, 5.2], group: 'n2x' },
  ...[3.8, 2.45, 1.1].flatMap((y, r) => [1.5, 4.2, 6.9].map((x, c): Placed => ({ mol: mol(`h${r}${c}`, ['H', 'H']), at: [x, y], group: 'h2' }))),
];
const after: Placed[] = [
  ...[4.75, 2.65].flatMap((y, r) => [1.5, 4.2, 6.9].map((x, c): Placed => ({ mol: star(`a${r}${c}`, 'N', ['H', 'H', 'H']), at: [x, y], group: 'nh3' }))),
  { mol: mol('x', ['N', 'N']), at: [4.2, 0.95], group: 'left' },
];
const molecules = figure(
  'd',
  [
    crowd({ name: 'pre', w: 8.4, h: 6.2, title: '\\text{before}', caption: '4\\ \\ce{N2} + 9\\ \\ce{H2}', mols: before }),
    link('arrow', [8.8, 3.1], [10.2, 3.1], { arrow: true }),
    crowd({ name: 'post', at: [10.6, 0], w: 8.4, h: 6.2, title: '\\text{after}', caption: '6\\ \\ce{NH3} + 1\\ \\ce{N2}\\text{ left over}', mols: after }),
  ],
  470,
);

const video: Explainer = {
  id: 'c20-4-6',
  lessonId: 'c20-4-6',
  title: 'Limiting and Excess Reagents, Part 1: Which Reactant Runs Out?',
  thumbnailTitle: 'Which Reactant Runs Out?',
  thumbnail: 'd',
  summary:
    'The limiting reagent is the reactant used up first, so it decides how much product forms; an excess reagent is left over when the reaction stops. To find the limiting reagent, use the mole ratio to find how much of the second reactant the first one needs, and compare it with what is there: in N₂ + 3H₂ → 2NH₃, 2.00 mol of nitrogen needs 6.00 mol of hydrogen, so 4.50 mol of hydrogen runs out first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Which Reactant Runs Out?', subtitle: 'Limiting and excess reagents' }],
      lines: [
        { say: 'A bicycle factory has fifty frames and eighty wheels. Each bicycle needs one frame and two wheels, so the factory can build only forty bicycles before the wheels run out, and ten frames are left over.', show: 'title' },
        { say: 'In this lesson, you will find which reactant runs out first. This part names the two kinds of reactant. Later parts use masses, find the product, and find what is left over.' },
      ],
    },
    {
      chapter: 'Limiting and excess',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'lim', tone: 'definition', title: 'Limiting reagent', md: 'The reactant that is **used up first**. When it is gone the reaction stops, so it decides how much product forms.' },
        { kind: 'callout', id: 'ex', tone: 'definition', title: 'Excess reagent', md: 'A reactant that is **not used up** completely. Some of it is left over when the reaction stops.' },
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'In the factory, the **wheels** are limiting and the **frames** are in excess.' },
      ],
      lines: [
        { say: 'The limiting reagent is the reactant that is used up first. When it is gone the reaction stops, so it decides how much product forms.', show: 'lim' },
        { say: 'An excess reagent is not used up completely. Some of it is left over when the reaction stops.', show: 'ex' },
        { say: 'In the factory, the wheels are the limiting reagent and the frames are in excess, even though there are fewer frames than wheels. What matters is how many of each one bicycle needs, and in a reaction, the coefficients say that.', show: 't' },
        { say: 'The word reagent simply means a substance used in a reaction. You will also see the term limiting reactant.' },
      ],
    },
    {
      chapter: 'Making ammonia',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A mixture for $\\ce{N2 + 3H2 -> 2NH3}$ holds $2.00\\ \\text{mol}$ of $\\ce{N2}$ and $4.50\\ \\text{mol}$ of $\\ce{H2}$. Which reactant is the limiting reagent?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Find the amount in moles of each reactant.', 'Use the mole ratio: how much of the second reactant does the first one **need**?', 'Short of that? The second reactant runs out first. More than enough? The first one does.'],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['n(\\ce{H2})\\text{ needed} = 2.00 \\times \\dfrac{3}{1} = 6.00\\ \\text{mol}', '4.50\\ \\text{mol} < 6.00\\ \\text{mol, so } \\good{\\ce{H2}\\text{ is limiting}}'] },
      ],
      lines: [
        { say: 'A mixture for making ammonia holds two point zero zero moles of nitrogen and four point five zero moles of hydrogen. Which reactant is the limiting reagent?', show: 'q' },
        { say: 'Compare what one reactant needs with what is there. First, find the amount in moles of each reactant. Here, they are given.', show: 'b.0' },
        { say: 'Next, use the mole ratio. Each nitrogen molecule needs three hydrogen molecules, so two point zero zero moles of nitrogen needs six point zero zero moles of hydrogen.', show: ['b.1', 'm.0'], focus: 'm.0' },
        { say: 'There are only four point five zero moles of hydrogen. That is not enough, so the hydrogen runs out first. Hydrogen is the limiting reagent, and nitrogen is in excess.', show: ['b.2', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Counting molecules',
      layout: 'center',
      main: [
        molecules,
        { kind: 'text', id: 'oops', size: 'md', align: 'center', md: '[[bad:The smaller amount is not always limiting.]] Use the mole ratio.' },
      ],
      lines: [
        { say: 'Shrink the mixture to molecules in the same ratio: four nitrogen molecules and nine hydrogen molecules.', show: ['d.pre-frame', 'd.pre-n2', 'd.pre-n2x', 'd.pre-h2', 'd.pre-caption'] },
        { say: 'Each round of the reaction takes one nitrogen and three hydrogens. Nine hydrogens are enough for three rounds, which make six ammonia molecules.', show: ['d.arrow', 'd.post-frame', 'd.post-nh3'], focus: 'd.post-nh3' },
        { say: 'Then the hydrogen is gone, and one nitrogen molecule is left over.', show: ['d.post-left', 'd.post-caption'], focus: ['d.post-left', 'd.pre-n2x'] },
        { say: 'So the smaller amount is not always limiting. Never compare the amounts, or the masses, directly. Use the mole ratio.', show: 'oops', focus: 'd' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture for the reaction $\\ce{2H2 + O2 -> 2H2O}$ holds $3.00\\ \\text{mol}$ of $\\ce{H2}$ and $2.00\\ \\text{mol}$ of $\\ce{O2}$. Which reactant is the limiting reagent?',
          choices: ['$\\ce{O2}$, because there is less of it', '$\\ce{H2}$, because it runs out first', 'Neither: both are used up exactly', '$\\ce{O2}$, because its coefficient is smaller'],
          answer: 1,
          working: 'The $\\ce{H2}$ needs $3.00 \\times \\dfrac{1}{2} = 1.50\\ \\text{mol}$ of $\\ce{O2}$, and there is $2.00\\ \\text{mol}$, more than enough. So $\\ce{H2}$ runs out first and is limiting; $\\ce{O2}$ is in excess.',
        },
      ],
      lines: [
        { say: 'Your turn. A mixture of hydrogen and oxygen holds three point zero zero moles of hydrogen and two point zero zero moles of oxygen. Which reactant is the limiting reagent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, hydrogen. Three point zero zero moles of hydrogen needs only one point five zero moles of oxygen, and there are two point zero zero moles, more than enough. Choice A compares the amounts directly, which never works.', show: 'q.answer' },
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
          items: ['The **limiting reagent** is used up first and decides how much product forms.', 'An **excess reagent** is left over when the reaction stops.', 'Use the mole ratio to find what one reactant **needs**; never compare the amounts directly.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The limiting reagent is used up first, and decides how much product forms.', show: 'sum.0' },
        { say: 'An excess reagent is left over when the reaction stops.', show: 'sum.1' },
        { say: 'And to tell them apart, use the mole ratio, never the amounts alone. In part two, you will learn a quick shortcut, and start from masses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
