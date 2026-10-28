import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-4-3-b',
  lessonId: 'c10-4-3',
  title: 'Types of Reactions, Part 2: Predicting the Type, and Burning',
  thumbnailTitle: 'Predicting the Type',
  thumbnail: false,
  summary:
    'The reactants alone decide the type: one compound decomposes, two elements make a synthesis, a fuel and oxygen is a combustion, an element and a compound is a single displacement, and two compounds in water a double displacement. A hydrocarbon burns completely to carbon dioxide and water, and a metal heated in oxygen forms a metal oxide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 2', title: 'Predicting the Type', subtitle: 'And the products of burning' }],
      lines: [
        { say: 'You can often name a reaction before it happens, just from what goes in.', show: 'title' },
        { say: 'In this part, you will predict the type of a reaction from its reactants alone, and then predict the products when a fuel or a metal burns.' },
      ],
    },
    {
      chapter: 'The reactants decide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reactants', 'Type'],
          rows: [
            ['one compound on its own', 'decomposition'],
            ['two elements', 'synthesis'],
            ['a fuel and oxygen', 'combustion'],
            ['an element and a compound (not a fuel with oxygen)', 'single displacement'],
            ['two compounds dissolved in water', 'double displacement'],
          ],
        },
      ],
      lines: [
        { say: 'Look only at the reactants. One compound on its own can only break down, so it is a decomposition.', show: 't.0' },
        { say: 'Two elements can only combine, so it is a synthesis.', show: 't.1' },
        { say: 'A fuel and oxygen is a combustion.', show: 't.2' },
        { say: 'An element and a compound, when it is not a fuel with oxygen, is a single displacement.', show: 't.3' },
        { say: 'And two compounds dissolved in water make a double displacement.', show: 't.4' },
      ],
    },
    {
      chapter: 'Element and compound',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Cl2 + 2KBr -> 2KCl + Br2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A fuel with oxygen is not a single displacement', md: 'Nothing is displaced: the fuel burns, and all its carbon and hydrogen end up in carbon dioxide and water. $\\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$' },
      ],
      lines: [
        { say: 'A reaction has the reactants chlorine and potassium bromide. Chlorine is an element, and potassium bromide is a compound that is not a fuel.' },
        { say: 'Element plus compound: chlorine takes the place of the bromine, so it is a single displacement.', show: 'm', focus: 'm' },
        { say: 'But careful. Oxygen is an element and butane is a compound, so butane and oxygen look like element plus compound.', show: 'oops' },
        { say: 'Yet nothing is displaced. The fuel burns, and all its carbon and hydrogen end up in carbon dioxide and water. Look for a fuel with oxygen before you call a reaction a single displacement.' },
      ],
    },
    {
      chapter: 'Products of burning',
      layout: 'split',
      leftWidth: 440,
      left: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A **hydrocarbon** burns completely to **carbon dioxide and water**.', 'A **metal** heated in oxygen forms a **metal oxide**: magnesium oxide, copper(II) oxide.'],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{C5H12 + O2 -> CO2 + H2O}', '\\text{C: } \\ce{5CO2} \\quad \\text{H: } \\ce{6H2O}', '\\text{O: } 5 \\times 2 + 6 = 16 \\ \\Rightarrow\\ \\ce{8O2}', '\\ce{C5H12 + 8O2 -> 5CO2 + 6H2O}'] },
      ],
      lines: [
        { say: 'Two patterns predict the products of burning. A hydrocarbon burns completely to carbon dioxide and water: each carbon atom ends up in carbon dioxide, and each hydrogen atom in water.', show: 'b.0' },
        { say: 'A metal heated in oxygen forms a metal oxide. Only the metal and oxygen react, so magnesium makes magnesium oxide, and copper makes copper two oxide.', caption: 'A metal heated in oxygen forms a metal oxide. Only the metal and oxygen react, so magnesium makes magnesium oxide, and copper makes copper(II) oxide.', show: 'b.1' },
        { say: 'Pentane, C five H twelve, is a hydrocarbon, so it burns to carbon dioxide and water.', caption: 'Pentane, C₅H₁₂, is a hydrocarbon, so it burns to carbon dioxide and water.', show: 'm.0', focus: 'm.0' },
        { say: 'Carbon: five C O two. Hydrogen: twelve atoms, so six H two O. Oxygen: five times two, plus six, is sixteen atoms, which is eight O two.', caption: 'Carbon: 5CO₂. Hydrogen: twelve atoms, so 6H₂O. Oxygen: five times two, plus six, is sixteen atoms, which is 8O₂.', show: ['m.1', 'm.2', 'm.3'], focus: 'm.3' },
        { say: 'With too little oxygen, burning is incomplete, and carbon monoxide, a toxic gas, or soot forms as well. Here, the burning is complete.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A reaction has the reactants propane, $\\ce{C3H8}$, and oxygen, $\\ce{O2}$. Before you see the products, what type of reaction is it?',
          choices: ['Single displacement', 'Synthesis', 'Combustion', 'Double displacement'],
          answer: 2,
          working: 'Propane is a fuel, and a fuel with oxygen is a combustion: $\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction has the reactants propane, C three H eight, and oxygen. Before you see the products, what type of reaction is it? Pause the video and try it.', caption: 'Your turn. A reaction has the reactants propane, C₃H₈, and oxygen. Before you see the products, what type of reaction is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, combustion. Propane is a fuel, and a fuel with oxygen is a combustion, even though oxygen is an element. Choice A is the trap: nothing is displaced.', show: 'q.answer' },
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
            'One compound, two elements, a fuel with oxygen, an element and a compound, or two compounds: the reactants decide the type.',
            'A fuel with oxygen is a combustion, not a single displacement.',
            'A hydrocarbon burns completely to carbon dioxide and water; a metal forms a metal oxide.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The reactants alone decide the type of reaction.', show: 'sum.0' },
        { say: 'A fuel with oxygen is a combustion, not a single displacement.', show: 'sum.1' },
        { say: 'A hydrocarbon burns completely to carbon dioxide and water, and a metal heated in oxygen forms a metal oxide. In part three, you will predict whether a displacement happens at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
