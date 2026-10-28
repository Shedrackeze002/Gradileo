import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { peDiagram } from './lib/c30-1b-figures.ts';

// The lesson's reaction without a catalyst (grey: top of the hump at 225 kJ) and with one (green:
// 175 kJ); reactants at 150 kJ and products at 50 kJ on both. The short catalysed arrow leaves no
// room for the reactants' name above their line, so it goes below (no ΔH arrow is shown here).
const cat = figure('e', [peDiagram({ reactants: 150, products: 50, peak: 225, catalyst: 175, max: 250, step: 50, grid: 25, places: { reactants: 'below right' }, labels: { catFwd: '25\\ \\text{kJ}', catRev: '125\\ \\text{kJ}' } })], 560);

const video: Explainer = {
  id: 'c30-1-7-c',
  lessonId: 'c30-1-7',
  title: 'Activation Energy and Catalysts, Part 3: Catalysts',
  thumbnailTitle: 'Catalysts',
  thumbnail: 'e',
  summary:
    'A catalyst speeds up a reaction without being used up, by providing a different pathway with a lower activation energy. On a potential energy diagram both activation energies fall by the same amount (here from 75 kJ to 25 kJ and from 175 kJ to 125 kJ), while ΔH stays at −100 kJ. With a lower barrier, a larger fraction of collisions succeed at the same temperature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'Catalysts', subtitle: 'A lower barrier, the same $\\Delta H$' }],
      lines: [
        { say: 'A catalytic converter cleans the exhaust gases from a car, and the enzymes in your cells run reactions at body temperature. Both are catalysts.', show: 'title' },
        { say: 'In this part, you will see how a catalyst speeds up a reaction without changing its enthalpy change.' },
      ],
    },
    {
      chapter: 'A lower barrier',
      layout: 'split',
      leftWidth: 640,
      left: [cat],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Catalyst', md: 'A substance that speeds up a reaction **without being used up**. It provides a different pathway, through a different activated complex, with a **lower activation energy**.' },
        {
          kind: 'table',
          id: 't',
          head: ['(kJ)', 'Without', 'With'],
          rows: [
            ['$E_a(\\text{fwd})$', '$75$', '$25$'],
            ['$E_a(\\text{rev})$', '$175$', '$125$'],
          ],
        },
      ],
      lines: [
        { say: 'A catalyst is a substance that speeds up a reaction without being used up. It provides a different pathway, through a different activated complex, with a lower activation energy.', show: 'def' },
        {
          say: 'Here is the reaction from before, in grey, and the same reaction with a catalyst, in green. The catalysed hump reaches only one hundred seventy-five kilojoules.',
          show: ['e.axes', 'e.grid', 'e.curve', 'e.cat-curve', 'e.reactants', 'e.products', 'e.no-cat', 'e.cat'],
          focus: 'e.cat-curve',
        },
        { say: 'So the forward activation energy falls from seventy-five to twenty-five kilojoules, and the reverse one from one hundred seventy-five to one hundred twenty-five.', show: ['e.cat-fwd', 'e.cat-rev', 't.0', 't.1'], focus: ['e.cat-fwd', 'e.cat-rev'] },
        { say: 'Both fall by fifty kilojoules, the same amount. So a catalyst speeds up the forward and the reverse reactions alike.', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'What does not change',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Both activation energies fall by the same amount**, so the forward and reverse reactions both speed up.',
            '**$\\Delta H$ does not change.** The reactants and products are the same substances, at the same levels: $\\Delta H = -100\\ \\text{kJ}$ by either path.',
            '**The catalyst is not consumed.** It takes part in the pathway, but it is regenerated at the end.',
          ],
        },
      ],
      lines: [
        { say: 'So, first, both activation energies fall by the same amount.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, delta H does not change. The reactants and products are the same substances, at the same levels, so delta H is negative one hundred kilojoules by either path.', show: 'b.1', focus: 'b.1' },
        { say: 'And third, the catalyst is not consumed. It takes part in the pathway, but it is regenerated at the end.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Why it is faster',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'More collisions succeed', md: 'At the same temperature, the particles have the same spread of energies. With a lower barrier, a much **larger fraction** of the collisions have enough energy to react.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A catalyst does not add energy', md: 'It does not heat the reactants or give the particles more kinetic energy, and it does not change how much energy the reaction releases or absorbs. It only lowers the barrier.' },
      ],
      lines: [
        { say: 'Why is the reaction faster? At the same temperature, the particles have the same spread of energies as before.', show: 'key' },
        { say: 'But with a lower barrier, a much larger fraction of the collisions that already happen have enough energy to react.' },
        { say: 'So a catalyst does not heat the reactants, or give the particles more energy, and it does not change how much energy the reaction releases or absorbs. It only lowers the barrier.', show: 'oops' },
      ],
    },
    {
      chapter: 'Catalysts at work',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Where', 'Catalyst', 'What it does'],
          rows: [
            ['laboratory', 'manganese(IV) oxide', 'decomposes hydrogen peroxide rapidly'],
            ['living cells', 'enzymes (proteins)', 'catalyse almost every reaction'],
            ['catalytic converter', 'hot metals, such as platinum', 'make harmful exhaust gases react'],
          ],
        },
      ],
      lines: [
        {
          say: 'Catalysts are everywhere. In the laboratory, a pinch of manganese four oxide makes hydrogen peroxide decompose rapidly into water and oxygen, and the black powder can be filtered off unchanged afterwards.',
          caption: 'Catalysts are everywhere. In the laboratory, a pinch of manganese(IV) oxide makes hydrogen peroxide decompose rapidly into water and oxygen, and the black powder can be filtered off unchanged afterwards.',
          show: 't.0',
          focus: 't.0',
        },
        { say: 'In living cells, proteins called enzymes catalyse almost every reaction. One enzyme in the liver makes hydrogen peroxide break down millions of times faster than it would on its own.', show: 't.1', focus: 't.1' },
        { say: 'And in a catalytic converter, harmful exhaust gases react on the surface of hot metals such as platinum.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A catalyst is added to a reaction mixture at constant temperature. Which statement about the catalyst is true?',
          choices: ['It raises the kinetic energy of the reactant particles.', 'It lowers the activation energy of the forward reaction only.', 'It leaves $\\Delta H$ for the reaction unchanged.', 'It is used up as the reaction takes place.'],
          answer: 2,
          working: 'A catalyst lowers the hump; the reactant and product levels do not move, so $\\Delta H$ is unchanged. Both activation energies fall by the same amount, and the catalyst is regenerated.',
        },
      ],
      lines: [
        { say: 'Your turn. A catalyst is added to a reaction mixture at constant temperature. Which statement about the catalyst is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Delta H stays the same, because the reactants and products do not change. Choice B is tempting, but a catalyst lowers both activation energies, by the same amount.', show: 'q.answer' },
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
            'A **catalyst** provides a pathway with a lower activation energy, and is not used up.',
            'Both activation energies fall by the **same amount**; $\\Delta H$ does **not** change.',
            'With a lower barrier, a larger fraction of collisions succeed at the same temperature.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A catalyst provides a pathway with a lower activation energy, and it is not used up.', show: 'sum.0' },
        { say: 'Both activation energies fall by the same amount, and delta H does not change.', show: 'sum.1' },
        { say: 'With a lower barrier, a larger fraction of collisions succeed at the same temperature. In part four, you will find activation energies from numbers alone, with and without a catalyst. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
