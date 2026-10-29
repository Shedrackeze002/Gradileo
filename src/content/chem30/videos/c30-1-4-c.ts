import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { twoLevels } from './lib/c30-1a-figures.ts';

// The combustion of methane: the products 802.5 kJ below the reactants.
const methane = figure('exo', [twoLevels({ reactants: '\\ce{CH4(g) + 2O2(g)}', products: '\\ce{CO2(g) + 2H2O(g)}', exo: true, label: '\\Delta H = -802.5\\ \\text{kJ}' })]);

// The decomposition of calcium carbonate: the products 179.2 kJ above the reactant.
const limestone = figure('endo', [twoLevels({ reactants: '\\ce{CaCO3(s)}', products: '\\ce{CaO(s) + CO2(g)}', exo: false, label: '\\Delta H = +179.2\\ \\text{kJ}' })]);

// A diagram to read: 2H2O(l) on the lower line, 2H2(g) + O2(g) on the upper, the arrow up.
const water = figure('wat', [twoLevels({ reactants: '\\ce{2H2O(l)}', products: '\\ce{2H2(g) + O2(g)}', exo: false, label: '571.6\\ \\text{kJ}' })]);

const video: Explainer = {
  id: 'c30-1-4-c',
  lessonId: 'c30-1-4',
  title: 'Communicating Enthalpy Changes, Part 3: Enthalpy Diagrams',
  thumbnailTitle: 'Enthalpy Diagrams',
  thumbnail: 'exo',
  summary:
    'An enthalpy diagram shows the enthalpy of the reactants and of the products as two lines on a vertical enthalpy axis, with an arrow from the reactants to the products labelled ΔH. In an exothermic reaction the products are lower and the arrow points down, as for methane burning (ΔH = −802.5 kJ); in an endothermic reaction they are higher and the arrow points up, as for limestone decomposing (ΔH = +179.2 kJ). Only the difference between the lines matters.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'Enthalpy Diagrams', subtitle: 'Down for exothermic, up for endothermic' }],
      lines: [
        { say: 'A picture can say what an equation says. An enthalpy diagram shows at a glance whether a reaction releases energy or absorbs it, and how much.', show: 'title' },
        { say: 'In this part, you will draw enthalpy diagrams for exothermic and endothermic reactions, and read one back into an equation.' },
      ],
    },
    {
      chapter: 'Exothermic: the arrow points down',
      layout: 'split',
      leftWidth: 600,
      left: [methane],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Enthalpy diagram', md: 'The enthalpy of the reactants and of the products as two horizontal lines on a vertical enthalpy axis, with an arrow from the reactants to the products labelled with $\\Delta H$.' },
        { kind: 'text', id: 't', size: 'md', md: 'Enthalpy itself cannot be measured, so only the **difference** between the lines matters.' },
      ],
      lines: [
        { say: 'An enthalpy diagram shows the enthalpy of the reactants and of the products as two horizontal lines, on a vertical enthalpy axis.', show: ['def', 'exo.axis', 'exo.r', 'exo.p'] },
        { say: 'An arrow goes from the reactants to the products, labelled with delta H.', caption: 'An arrow goes from the reactants to the products, labelled with ΔH.', show: 'exo.dh', focus: 'exo.dh' },
        {
          say: 'In an exothermic reaction, the products are lower than the reactants, and the arrow points down. When methane burns, the products sit eight hundred two point five kilojoules below the reactants.',
          caption: 'In an exothermic reaction, the products are lower than the reactants, and the arrow points down. When methane burns, the products sit 802.5 kJ below the reactants.',
          focus: ['exo.p', 'exo.dh'],
        },
        { say: 'The heights themselves are not known, since enthalpy cannot be measured. Only the difference between the two lines matters.', show: 't', focus: 'exo' },
      ],
    },
    {
      chapter: 'Endothermic: the arrow points up',
      layout: 'split',
      leftWidth: 600,
      left: [limestone],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Write the reactants on one line and the products on the other.', 'Put the side with less enthalpy lower.', 'Draw the arrow from the reactants to the products.', 'Label it with $\\Delta H$ and its sign.'],
        },
      ],
      lines: [
        {
          say: 'In an endothermic reaction, the products are higher than the reactants, and the arrow points up. When calcium carbonate decomposes, calcium oxide and carbon dioxide sit one hundred seventy-nine point two kilojoules above it.',
          caption: 'In an endothermic reaction, the products are higher than the reactants, and the arrow points up. When calcium carbonate decomposes, calcium oxide and carbon dioxide sit 179.2 kJ above it.',
          show: ['endo.axis', 'endo.r', 'endo.p', 'endo.dh'],
          focus: 'endo.dh',
        },
        { say: 'To draw one, write the reactants on one line and the products on the other, and put the side with less enthalpy lower.', show: ['b.0', 'b.1'], focus: 'endo' },
        { say: 'Then draw the arrow from the reactants to the products, and label it with delta H and its sign.', caption: 'Then draw the arrow from the reactants to the products, and label it with ΔH and its sign.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Reading a diagram',
      layout: 'split',
      left: [water],
      right: [
        { kind: 'bullets', id: 's', items: ['The arrow starts at the **reactants**: $\\ce{2H2O(l)}$.', 'The products are **higher**: the system gains $571.6\\ \\text{kJ}$.', 'The reaction is **endothermic**.'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{2H2O(l) -> 2H2(g) + O2(g)}', '\\Delta_r H = +571.6\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'Now read one. Liquid water is on the lower line, hydrogen and oxygen gas are on the upper line, and the arrow goes up, labelled five hundred seventy-one point six kilojoules.',
          caption: 'Now read one. Liquid water is on the lower line, hydrogen and oxygen gas are on the upper line, and the arrow goes up, labelled 571.6 kJ.',
          show: ['wat.axis', 'wat.r', 'wat.p', 'wat.dh'],
        },
        { say: 'The arrow starts at the reactants: two moles of liquid water. It ends at the products: two moles of hydrogen, and one of oxygen.', show: 's.0', focus: ['wat.r', 'wat.p'] },
        {
          say: 'The products are higher, so the system gains five hundred seventy-one point six kilojoules, and delta r H is positive.',
          caption: 'The products are higher, so the system gains 571.6 kJ, and ΔrH is positive.',
          show: 's.1',
          focus: 'wat.dh',
        },
        {
          say: 'So two H two O liquid gives two H two gas plus O two gas, with delta r H equals positive five hundred seventy-one point six kilojoules. Endothermic.',
          caption: 'So 2H₂O(l) → 2H₂(g) + O₂(g), with ΔrH = +571.6 kJ. Endothermic.',
          show: ['m', 's.2'],
          focus: 'm',
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
          prompt: 'An enthalpy diagram has $\\ce{2Mg(s) + O2(g)}$ on the upper line and $\\ce{2MgO(s)}$ on the lower line, with an arrow from the upper line down to the lower line labelled $1203.2\\ \\text{kJ}$. What is $\\Delta_r H$ for $\\ce{2Mg(s) + O2(g) -> 2MgO(s)}$?',
          choices: ['$+1203.2\\ \\text{kJ}$, endothermic', '$-1203.2\\ \\text{kJ}$, endothermic', '$+1203.2\\ \\text{kJ}$, exothermic', '$-1203.2\\ \\text{kJ}$, exothermic'],
          answer: 3,
          working: 'The arrow starts at the reactants, $\\ce{2Mg(s) + O2(g)}$, and points down to the products: the system loses $1203.2\\ \\text{kJ}$, so $\\Delta_r H = -1203.2\\ \\text{kJ}$ and the reaction is exothermic.',
        },
      ],
      lines: [
        {
          say: 'Your turn. An enthalpy diagram has magnesium and oxygen on the upper line, and magnesium oxide on the lower line, with the arrow pointing down, labelled one thousand two hundred three point two kilojoules. What is delta r H? Pause the video and try it.',
          caption: 'Your turn. An enthalpy diagram has 2Mg(s) + O₂(g) on the upper line and 2MgO(s) on the lower line, with the arrow pointing down, labelled 1203.2 kJ. What is ΔrH? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D. The products are lower, so the system loses energy: delta r H is negative one thousand two hundred three point two kilojoules, and the reaction is exothermic. Choice B pairs the right sign with the wrong word.',
          caption: 'The answer is D. The products are lower, so the system loses energy: ΔrH = −1203.2 kJ, and the reaction is exothermic. Choice B pairs the right sign with the wrong word.',
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
            'An enthalpy diagram: two lines on an enthalpy axis, and an arrow from the reactants to the products labelled $\\Delta H$.',
            'Exothermic: the products are lower, the arrow points down, and $\\Delta H$ is negative.',
            'Endothermic: the products are higher, the arrow points up, and $\\Delta H$ is positive.',
            'Only the difference between the lines matters.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An enthalpy diagram has two lines on an enthalpy axis, and an arrow from the reactants to the products.', show: 'sum.0' },
        { say: 'In an exothermic reaction the products are lower, the arrow points down, and delta H is negative.', caption: 'In an exothermic reaction the products are lower, the arrow points down, and ΔH is negative.', show: 'sum.1' },
        { say: 'In an endothermic reaction the products are higher, the arrow points up, and delta H is positive.', caption: 'In an endothermic reaction the products are higher, the arrow points up, and ΔH is positive.', show: 'sum.2' },
        { say: 'And only the difference between the lines matters. In part four, you will use a diagram with a mass, and write one reaction all four ways. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
