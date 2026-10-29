import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-4',
  lessonId: 'c30-1-4',
  title: 'Communicating Enthalpy Changes, Part 1: Energy in the Equation',
  thumbnailTitle: 'Energy in the Equation',
  thumbnail: false,
  summary:
    'An energy change can be written as an energy term in a thermochemical equation, as ΔrH beside the equation, as a molar enthalpy, or as an enthalpy diagram. For an exothermic reaction the energy term goes with the products and ΔrH is negative; for an endothermic reaction it goes with the reactants and ΔrH is positive. An energy term never carries a minus sign.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Energy in the Equation', subtitle: 'Four ways to say the same thing' }],
      lines: [
        { say: 'A data table, a handbook and a textbook can each write the energy of burning methane in a different way. All of them say the same thing.', show: 'title' },
        { say: 'In this lesson, you will read and write each way, and move from one to another. This part puts the energy into the equation itself. Later parts cover molar enthalpies and enthalpy diagrams.' },
      ],
    },
    {
      chapter: 'Four ways',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Thermochemical equation', md: 'A balanced chemical equation, with states, that also shows its energy change: as an energy term in the equation, or as an enthalpy change beside it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'The combustion of methane'],
          rows: [
            ['1. Energy term', '$\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)} + 802.5\\ \\text{kJ}$'],
            ['2. $\\Delta_r H$ beside it', '$\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)}\\quad \\Delta_r H = -802.5\\ \\text{kJ}$'],
            ['3. Molar enthalpy', '$\\Delta_c H_m(\\ce{CH4}) = -802.5\\ \\text{kJ/mol}$'],
            ['4. Enthalpy diagram', 'the products drawn $802.5\\ \\text{kJ}$ below the reactants'],
          ],
        },
      ],
      lines: [
        { say: 'A thermochemical equation is a balanced chemical equation, with states, that also shows its energy change.', show: 'def' },
        {
          say: 'Here is the combustion of methane, forming water vapour, written four ways. First, as an energy term in the equation: eight hundred two point five kilojoules, written with the products.',
          caption: 'Here is the combustion of methane, forming water vapour, written four ways. First, as an energy term in the equation: 802.5 kJ, written with the products.',
          show: 't.0',
        },
        {
          say: 'Second, as the enthalpy change beside the equation: delta r H equals negative eight hundred two point five kilojoules.',
          caption: 'Second, as the enthalpy change beside the equation: ΔrH = −802.5 kJ.',
          show: 't.1',
        },
        {
          say: 'Third, as a molar enthalpy, per mole of methane. And fourth, as an enthalpy diagram, with the products drawn eight hundred two point five kilojoules below the reactants.',
          caption: 'Third, as a molar enthalpy, per mole of methane. And fourth, as an enthalpy diagram, with the products drawn 802.5 kJ below the reactants.',
          show: ['t.2', 't.3'],
        },
      ],
    },
    {
      chapter: 'Which side?',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)} + \\opp{802.5\\ \\text{kJ}}', '\\ce{CaCO3(s)} + \\adj{179.2\\ \\text{kJ}} \\mathrel{\\ce{->}} \\ce{CaO(s) + CO2(g)}'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Exothermic**: energy is a product, written on the **right**, and $\\Delta_r H$ is negative.',
            '**Endothermic**: energy is consumed like a reactant, written on the **left**, and $\\Delta_r H$ is positive.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'No sign on a term', md: 'An energy term is always a positive amount. The side it is on carries the meaning.' },
      ],
      lines: [
        {
          say: 'For an exothermic reaction, energy is a product. It is written on the right, with the products, and delta r H is negative.',
          caption: 'For an exothermic reaction, energy is a product. It is written on the right, with the products, and ΔrH is negative.',
          show: ['m.0', 'b.0'],
          focus: 'm.0',
        },
        {
          say: 'For an endothermic reaction, energy is consumed like a reactant. It is written on the left, with the reactants, and delta r H is positive.',
          caption: 'For an endothermic reaction, energy is consumed like a reactant. It is written on the left, with the reactants, and ΔrH is positive.',
          show: ['m.1', 'b.1'],
          focus: 'm.1',
        },
        { say: 'An energy term is always written as a positive amount. The side it is on carries the meaning.', show: 'tip', focus: 'm' },
      ],
    },
    {
      chapter: 'Reading an energy term',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'Limestone decomposes when it is heated strongly: $\\ce{CaCO3(s)} + 179.2\\ \\text{kJ} \\mathrel{\\ce{->}} \\ce{CaO(s) + CO2(g)}$. What is $\\Delta_r H$, and is the reaction exothermic or endothermic?',
        },
        {
          kind: 'bullets',
          id: 's',
          items: ['The energy is written with the reactant, so it is **absorbed**.', 'The system gains enthalpy, so $\\Delta_r H$ is positive.'],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta_r H = +179.2\\ \\text{kJ}: \\text{ endothermic}'] },
      ],
      lines: [
        {
          say: 'Limestone, which is calcium carbonate, decomposes into calcium oxide and carbon dioxide when it is heated strongly. One hundred seventy-nine point two kilojoules is written with the reactant. What is delta r H?',
          caption: 'Limestone, CaCO₃, decomposes into calcium oxide and carbon dioxide when it is heated strongly. 179.2 kJ is written with the reactant. What is ΔrH?',
          show: 'q',
        },
        { say: 'The energy is written with the reactant, so it is absorbed.', show: 's.0' },
        {
          say: 'The system gains enthalpy, so delta r H is positive one hundred seventy-nine point two kilojoules. The reaction is endothermic.',
          caption: 'The system gains enthalpy, so ΔrH = +179.2 kJ. The reaction is endothermic.',
          show: ['s.1', 'm'],
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'No minus signs in energy terms',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'No minus signs in energy terms',
          md: 'Writing $- 802.5\\ \\text{kJ}$ at the end of the equation mixes up two methods. The minus sign belongs to $\\Delta_r H$, beside the equation.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\bad{\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)} - 802.5\\ \\text{kJ}}', '\\good{\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)} + 802.5\\ \\text{kJ}}'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: writing minus eight hundred two point five kilojoules at the end of the methane equation.', show: ['mis', 'm.0'] },
        {
          say: 'That mixes up two methods. The minus sign belongs to delta r H, written beside the equation. As a term, the energy is simply placed on the side where it appears.',
          caption: 'That mixes up two methods. The minus sign belongs to ΔrH, written beside the equation. As a term, the energy is simply placed on the side where it appears.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $\\ce{2H2(g) + O2(g) -> 2H2O(g)}$, $\\Delta_r H = -483.6\\ \\text{kJ}$. How is this energy change written as an **energy term** in the equation?',
          choices: ['$483.6\\ \\text{kJ}$, with the reactants', '$483.6\\ \\text{kJ}$, with the products', '$-483.6\\ \\text{kJ}$, with the products', '$241.8\\ \\text{kJ}$, with the products'],
          answer: 1,
          working: '$\\Delta_r H$ is negative, so the energy is released: it is written with the products, as a positive amount, $483.6\\ \\text{kJ}$ for the equation as written.',
        },
      ],
      lines: [
        {
          say: 'Your turn. For hydrogen and oxygen forming water vapour, delta r H is negative four hundred eighty-three point six kilojoules. How is this energy change written as an energy term? Pause the video and try it.',
          caption: 'Your turn. For 2H₂(g) + O₂(g) → 2H₂O(g), ΔrH = −483.6 kJ. How is this energy change written as an energy term? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B. Delta r H is negative, so the energy is released, and it goes with the products as a positive amount. Choice C puts a minus sign on the term, and choice D halves the energy, which is for the whole equation as written.',
          caption: 'The answer is B. ΔrH is negative, so the energy is released, and it goes with the products as a positive amount. Choice C puts a minus sign on the term, and choice D halves the energy, which is for the whole equation as written.',
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
            'Four ways: an **energy term**, **$\\Delta_r H$** beside the equation, a **molar enthalpy**, an **enthalpy diagram**.',
            'Exothermic: the energy term goes with the products, and $\\Delta_r H$ is negative.',
            'Endothermic: the energy term goes with the reactants, and $\\Delta_r H$ is positive.',
            'An energy term carries no minus sign.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An energy change can be an energy term, delta r H beside the equation, a molar enthalpy, or an enthalpy diagram.', caption: 'Let’s sum up. An energy change can be an energy term, ΔrH beside the equation, a molar enthalpy, or an enthalpy diagram.', show: 'sum.0' },
        { say: 'In an exothermic reaction, the energy term goes with the products, and delta r H is negative.', caption: 'In an exothermic reaction, the energy term goes with the products, and ΔrH is negative.', show: 'sum.1' },
        { say: 'In an endothermic reaction, it goes with the reactants, and delta r H is positive.', caption: 'In an endothermic reaction, it goes with the reactants, and ΔrH is positive.', show: 'sum.2' },
        { say: 'And an energy term carries no minus sign. In part two, you will find the molar enthalpy of each substance in an equation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
