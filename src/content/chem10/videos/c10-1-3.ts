import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { evaporation, filtration } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-3',
  lessonId: 'c10-1-3',
  title: 'Separating Mixtures, Part 1: Filtration, Evaporation and Crystallization',
  thumbnailTitle: 'Filtration and Evaporation',
  thumbnail: 'f',
  summary:
    'Every separation method relies on a difference between the parts of a mixture. Filtration separates an insoluble solid (the residue) from a liquid (the filtrate); evaporation recovers a dissolved solid; crystallization gives crystals of a solid that heating to dryness would damage. Sand and salt are separated by dissolving, filtering and evaporating.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 1', title: 'Filtration, Evaporation and Crystallization', subtitle: 'Getting a solid out of a liquid' }],
      lines: [
        { say: 'Sea water covers most of the planet, yet you cannot drink it: it is a mixture of water and dissolved salts.', show: 'title' },
        { say: 'Because the parts of a mixture are not chemically joined, physical methods can separate them. This part covers filtration, evaporation and crystallization.' },
      ],
    },
    {
      chapter: 'How the parts differ',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Choosing a method', md: 'Every separation method relies on a **difference** between the parts of the mixture: whether they dissolve, their boiling points, whether they are magnetic, their densities. First ask: **how do the parts differ?**' }],
      lines: [
        { say: 'Every separation method works because the parts of the mixture differ in some property: whether they dissolve, their boiling points, whether they are magnetic, or their densities.', show: 'key' },
        { say: 'So the first step is always to ask: how do the parts differ?' },
      ],
    },
    {
      chapter: 'Filtration',
      layout: 'split',
      leftWidth: 620,
      left: [figure('f', [filtration()])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Filtrate and residue', md: 'The **filtrate** is the liquid that passes through the filter paper. The **residue** is the solid left on the paper.' }],
      lines: [
        { say: 'Filtration separates a solid that does not dissolve from a liquid. The mixture is poured through filter paper in a funnel.', show: ['f.funnel', 'f.paper', 'f.paper-l', 'f.mixture'] },
        { say: 'The paper has tiny holes. Water particles and dissolved particles pass through, but the grains of the insoluble solid are too big.', show: ['f.drip', 'f.residue'] },
        { say: 'The liquid that passes through is called the filtrate. The solid left on the paper is called the residue.', show: ['f.filtrate', 'f.filtrate-l', 'f.residue-p', 'def'], focus: ['f.filtrate', 'f.residue'] },
      ],
    },
    {
      chapter: 'Evaporation',
      layout: 'split',
      leftWidth: 680,
      left: [figure('e', [evaporation()])],
      right: [{ kind: 'callout', id: 'ev', tone: 'key', title: 'Evaporation', md: 'Heat the solution in an **evaporating dish** until **all** the solvent has evaporated; the dissolved solid is left behind.' }],
      lines: [
        { say: 'Evaporation recovers a dissolved solid from a solution. The solution is heated in an evaporating dish, and the water escapes as a vapour.', show: ['e.stand', 'e.flame', 'e.heat-l', 'e.dish', 'e.solution', 'e.solution-l', 'e.vapour', 'e.vapour-l', 'ev'] },
        { say: 'When all the solvent has evaporated, the solid is left behind in the dish.', hide: ['e.solution', 'e.solution-l'], show: ['e.solid', 'e.solid-l'], focus: 'e.solid' },
      ],
    },
    {
      chapter: 'Crystallization',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cr', tone: 'key', title: 'Crystallization', md: 'Heat the solution only until it is **concentrated**, then leave it to cool. Crystals form; filter them off and leave them to dry.' },
        { kind: 'bullets', id: 'why', items: ['Heating copper(II) sulfate crystals dry drives off the water they hold: blue crystals become a white powder.', 'Strong heating chars sugar.'] },
      ],
      lines: [
        { say: 'Crystallization is used when heating to dryness would damage the solid. Copper two sulfate crystals hold water within them. Heating them dry drives off that water, and turns the blue crystals into a white powder.', caption: 'Crystallization is used when heating to dryness would damage the solid. Copper(II) sulfate crystals hold water within them. Heating them dry drives off that water, and turns the blue crystals into a white powder.', show: 'why.0' },
        { say: 'Instead, the solution is heated only until it is concentrated, then left to cool. As it cools, crystals form. They are filtered off, and left to dry.', show: 'cr' },
        { say: 'Sugar is crystallized for the same kind of reason: strong heating chars it.', show: 'why.1' },
      ],
    },
    {
      chapter: 'Sand and salt',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Plan how to separate a mixture of sand and salt into dry salt and dry sand.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Add water and stir: the salt dissolves, but the sand does not.',
            '**Filter**: the sand is the residue, the salt solution the filtrate. Rinse the sand and leave it to dry.',
            '**Evaporate** the water from the filtrate to obtain the salt.',
          ],
        },
      ],
      lines: [
        { say: 'How can a mixture of sand and salt be separated into dry salt and dry sand? First, how do the parts differ? Salt dissolves in water, and sand does not.', show: 'q' },
        { say: 'So add water, and stir until all the salt has dissolved.', show: 'steps.0' },
        { say: 'Then filter. The sand stays on the paper as the residue, and the salt solution passes through as the filtrate. Rinse the sand with a little water, and leave it to dry.', show: 'steps.1' },
        { say: 'Finally, heat the filtrate in an evaporating dish to evaporate the water, leaving the salt.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'What filter paper cannot do',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Filter paper cannot catch dissolved particles', md: 'A dissolved solid passes straight through with the water: filtering salt water gives salt water. To get the salt back, **evaporate** the water; to get the water back, **distil** it.' }],
      lines: [
        { say: 'Watch out: a dissolved solid passes straight through filter paper with the water. Filtering salt water just gives salt water.', show: 'oops' },
        { say: 'To get the salt back, evaporate the water. To get the water back, distil it, as the next part shows.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture of sand and copper(II) sulfate solution is poured through filter paper in a funnel. What is the residue, and what is the filtrate?',
          choices: [
            'Residue: copper(II) sulfate solution. Filtrate: sand.',
            'Residue: sand. Filtrate: copper(II) sulfate solution.',
            'Residue: sand and copper(II) sulfate. Filtrate: pure water.',
            'Residue: copper(II) sulfate crystals. Filtrate: water and sand.',
          ],
          answer: 1,
          working: 'Sand does not dissolve, so it stays on the paper as the residue. The dissolved copper(II) sulfate passes through with the water, so the filtrate is copper(II) sulfate solution.',
        },
      ],
      lines: [
        { say: 'Your turn. A mixture of sand and copper two sulfate solution is poured through filter paper in a funnel. What is the residue, and what is the filtrate? Pause the video and try it.', caption: 'Your turn. A mixture of sand and copper(II) sulfate solution is poured through filter paper in a funnel. What is the residue, and what is the filtrate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The sand stays on the paper as the residue, and the solution passes through as the filtrate. Choice C is the common mistake: dissolved particles pass through the paper.', show: 'q.answer' },
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
            'Every separation relies on a difference between the parts of the mixture.',
            '**Filtration**: an insoluble solid (the **residue**) from a liquid (the **filtrate**).',
            '**Evaporation** recovers a dissolved solid; **crystallization** gives crystals of a solid that heating to dryness would damage.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every separation method relies on a difference between the parts of a mixture.', show: 'sum.0' },
        { say: 'Filtration separates an insoluble solid, the residue, from a liquid, the filtrate.', show: 'sum.1' },
        { say: 'Evaporation recovers a dissolved solid, and crystallization gives crystals of a solid that heating to dryness would damage. In part two, you will separate liquids by distillation, and meet a few simpler methods. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
