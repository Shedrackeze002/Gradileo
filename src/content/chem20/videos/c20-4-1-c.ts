import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { propane, row, tag } from './lib/c20-4a-figures.ts';

// A propane molecule as balls, and where its atoms go: 3 C to 3CO₂, 8 H to 4H₂O.
const fuel = (() => {
  const r = row({ terms: [propane('mol')] });
  const mid = r.end / 2;
  return figure(
    'f',
    [
      r,
      tag('name', [mid, 1.25], '\\text{propane, } \\ce{C3H8}', { place: 'above', tone: 'theta' }),
      tag('c-to', [mid, -1.45], '3\\ \\text{C} \\ \\longrightarrow\\ \\ce{3CO2}', { place: 'below' }),
      tag('h-to', [mid, -2.45], '8\\ \\text{H} \\ \\longrightarrow\\ \\ce{4H2O}', { place: 'below' }),
    ],
    500,
  );
})();

const video: Explainer = {
  id: 'c20-4-1-c',
  lessonId: 'c20-4-1',
  title: 'Balancing Equations and Types of Reactions, Part 3: Balancing Combustion Reactions',
  thumbnailTitle: 'Balancing Combustion Reactions',
  thumbnail: 'f',
  summary:
    'When a fuel burns, balance carbon first, then hydrogen, and oxygen last: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. If oxygen needs half a molecule, double every coefficient, as in 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. An alcohol already contains oxygen, so count it before choosing the coefficient of O₂: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Balancing Combustion Reactions', subtitle: 'Carbon, then hydrogen, then oxygen' }],
      lines: [
        { say: 'Propane in a barbecue, octane in a car engine, ethanol in a camping stove: when a fuel burns in plenty of oxygen, it forms carbon dye-oxide and water.', caption: 'Propane in a barbecue, octane in a car engine, ethanol in a camping stove: when a fuel burns in plenty of oxygen, it forms carbon dioxide and water.', show: 'title' },
        { say: 'Oxygen turns up in both products, so these equations need a plan. In this part, you will balance burning fuels, including two that need extra care.' },
      ],
    },
    {
      chapter: 'Carbon, hydrogen, then oxygen',
      layout: 'split',
      leftWidth: 480,
      left: [fuel],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{C3H8 + O2 -> CO2 + H2O}',
            '\\text{C: } 3 \\ \\Rightarrow\\ \\ce{3CO2}',
            '\\text{H: } 8 \\ \\Rightarrow\\ \\ce{4H2O}',
            '\\text{O: } 3(2) + 4(1) = 10 \\ \\Rightarrow\\ \\ce{5O2}',
            '\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}',
          ],
        },
      ],
      lines: [
        { say: 'Balance propane burning: C three H eight, plus O two, gives C O two, plus H two O.', caption: 'Balance propane burning: C₃H₈ + O₂ → CO₂ + H₂O.', show: ['m.0', 'f.mol', 'f.name'] },
        { say: 'Oxygen turns up in both products, so it goes last. Balance carbon first, then hydrogen, then oxygen.' },
        { say: 'Carbon: propane holds three carbon atoms, and each ends up in a molecule of carbon dye-oxide. So write three C O two.', caption: 'Carbon: propane holds three carbon atoms, and each ends up in a molecule of carbon dioxide. So write 3CO₂.', show: ['m.1', 'f.c-to'], focus: ['m.1', 'f.c-to'] },
        { say: 'Hydrogen: eight atoms, and each water molecule holds two. So write four H two O.', caption: 'Hydrogen: eight atoms, and each water molecule holds two. So write 4H₂O.', show: ['m.2', 'f.h-to'], focus: ['m.2', 'f.h-to'] },
        { say: 'Oxygen last. The right side has three times two, plus four times one: ten oxygen atoms. That is five O two molecules.', caption: 'Oxygen last. The right side has 3 × 2 + 4 × 1: ten oxygen atoms. That is five O₂ molecules.', show: 'm.3', focus: 'm.3' },
        { say: 'The balanced equation: C three H eight, plus five O two, gives three C O two, plus four H two O. Carbon three, hydrogen eight and oxygen ten on each side.', caption: 'The balanced equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Carbon three, hydrogen eight and oxygen ten on each side.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'When oxygen needs a half',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{C2H6 + O2 -> CO2 + H2O}',
            '\\text{C: } \\ce{2CO2} \\qquad \\text{H: } 6 \\ \\Rightarrow\\ \\ce{3H2O}',
            '\\text{O: } 2(2) + 3 = 7 \\ \\Rightarrow\\ 3\\tfrac{1}{2}\\ \\ce{O2} \\ \\bad{\\times}',
            '\\times 2\\text{:} \\quad \\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}',
            '\\text{C } 4 = 4, \\quad \\text{H } 12 = 12, \\quad \\text{O } 14 = 14',
          ],
        },
      ],
      lines: [
        { say: 'Now ethane: C two H six, plus O two, gives C O two, plus H two O.', caption: 'Now ethane: C₂H₆ + O₂ → CO₂ + H₂O.', show: 'm.0' },
        { say: 'Carbon: two C O two. Hydrogen: six atoms, so three H two O.', caption: 'Carbon: 2CO₂. Hydrogen: six atoms, so 3H₂O.', show: 'm.1', focus: 'm.1' },
        { say: 'Oxygen: the right side has two times two, plus three: seven oxygen atoms. That would be three and a half molecules of O two.', caption: 'Oxygen: the right side has 2 × 2 + 3: seven oxygen atoms. That would be three and a half molecules of O₂.', show: 'm.2', focus: 'm.2' },
        { say: 'Coefficients must be whole numbers, so double every one: two ethane, seven O two, four C O two and six H two O.', caption: 'Coefficients must be whole numbers, so double every one: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: carbon four, hydrogen twelve, and oxygen fourteen on each side.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Oxygen in the fuel',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Oxygen in the fuel', md: 'An alcohol or a sugar already contains oxygen. Count it before you choose the coefficient of $\\ce{O2}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{C2H5OH + O2 -> 2CO2 + 3H2O}',
            '\\text{O on the right: } 2(2) + 3 = 7 = \\underbrace{1}_{\\text{ethanol}} + \\underbrace{6}_{\\ce{3O2}}',
            '\\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}',
          ],
        },
      ],
      lines: [
        { say: 'An alcohol or a sugar already contains oxygen, and that oxygen is easy to forget. Take ethanol, C two H five O H.', caption: 'An alcohol or a sugar already contains oxygen, and that oxygen is easy to forget. Take ethanol, C₂H₅OH.', show: 'oops' },
        { say: 'Carbon gives two C O two, and the six hydrogen atoms give three H two O.', caption: 'Carbon gives 2CO₂, and the six hydrogen atoms give 3H₂O.', show: 'm.0', focus: 'm.0' },
        { say: 'So the right side has four plus three, or seven oxygen atoms. One of them comes from the ethanol itself, so O two supplies only six: three O two molecules.', caption: 'So the right side has 4 + 3, or seven oxygen atoms. One of them comes from the ethanol itself, so O₂ supplies only six: three O₂ molecules.', show: 'm.1', focus: 'm.1' },
        { say: 'The balanced equation: C two H five O H, plus three O two, gives two C O two, plus three H two O. Oxygen: seven on each side.', caption: 'The balanced equation: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. Oxygen: seven on each side.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Methanol burns completely: $\\ce{CH3OH + O2 -> CO2 + H2O}$. Which coefficients, in order, balance it with the smallest whole numbers?',
          choices: ['$2,\\ 3,\\ 2,\\ 4$', '$1,\\ 2,\\ 1,\\ 2$', '$2,\\ 2,\\ 2,\\ 4$', '$4,\\ 6,\\ 4,\\ 8$'],
          answer: 0,
          working: 'C: $\\ce{CO2}$. H: 4 atoms, so $\\ce{2H2O}$. O on the right: $2 + 2 = 4$; methanol supplies 1, so $\\ce{O2}$ supplies 3, which is $1\\tfrac{1}{2}$ molecules. Double everything: $\\ce{2CH3OH + 3O2 -> 2CO2 + 4H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Methanol, C H three O H, burns completely. Which coefficients, in order, balance the equation with the smallest whole numbers? Pause the video and try it.', caption: 'Your turn. Methanol, CH₃OH, burns completely. Which coefficients, in order, balance the equation with the smallest whole numbers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two, three, two, four. Carbon gives one C O two, and hydrogen gives two H two O, so the right side has four oxygen atoms. Methanol supplies one, so O two supplies three: one and a half molecules. Double everything. Choice B forgets the oxygen in the fuel, and every number in choice D divides by two.', caption: 'The answer is A: 2, 3, 2, 4. Carbon gives one CO₂, and hydrogen gives 2H₂O, so the right side has four oxygen atoms. Methanol supplies one, so O₂ supplies three: one and a half molecules. Double everything. Choice B forgets the oxygen in the fuel, and every number in choice D divides by two.', show: 'q.answer' },
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
            'A burning fuel: balance **carbon**, then **hydrogen**, and **oxygen** last.',
            'If oxygen needs half a molecule, **double every coefficient**.',
            'An alcohol or a sugar **contains oxygen**: count it before choosing the coefficient of $\\ce{O2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When a fuel burns, balance carbon, then hydrogen, and oxygen last.', show: 'sum.0' },
        { say: 'If oxygen needs half a molecule, double every coefficient.', show: 'sum.1' },
        { say: 'And an alcohol or a sugar contains oxygen, so count it before you choose the coefficient of O two. In part four, you will sort reactions into five types. See you there!', caption: 'And an alcohol or a sugar contains oxygen, so count it before you choose the coefficient of O₂. In part four, you will sort reactions into five types. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
