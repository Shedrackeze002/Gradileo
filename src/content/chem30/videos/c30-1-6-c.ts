import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { enthalpyLevels } from './lib/c30-1b-figures.ts';

// Methane and oxygen taken apart into their elements, and carbon dioxide and water vapour built
// from them (not to scale, as in the lesson).
const route = figure(
  'd',
  [
    enthalpyLevels({
      top: 7,
      levels: [
        { id: 'elements', y: 6.0, from: 0.4, to: 12.6, tex: '\\ce{C(s) + 2H2(g) + 2O2(g)}' },
        { id: 'reactants', y: 4.8, from: 0.4, to: 7.6, tex: '\\ce{CH4(g) + 2O2(g)}', place: 'below right' },
        { id: 'products', y: 1.0, from: 5.0, to: 12.6, tex: '\\ce{CO2(g) + 2H2O(g)}', place: 'below right', labelX: 7.8 },
      ],
      arrows: [
        { id: 'apart', from: [2.0, 4.8], to: [2.0, 6.0], tex: '+74.6\\ \\text{kJ}', side: 'east' },
        { id: 'build', from: [12.0, 6.0], to: [12.0, 1.0], tex: '-877.1\\ \\text{kJ}', side: 'east' },
        { id: 'direct', from: [7.0, 4.8], to: [7.0, 1.0], tex: '-802.5\\ \\text{kJ}', side: 'east', tone: 'theta' },
      ],
      notes: [{ id: 'scale', at: [2.4, 1.6], tex: '\\text{not to scale}' }],
      room: [[14.6, 0]],
    }),
  ],
  520,
);

const video: Explainer = {
  id: 'c30-1-6-c',
  lessonId: 'c30-1-6',
  title: 'Enthalpies of Formation, Part 3: The Route Through the Elements',
  thumbnailTitle: 'The Route Through the Elements',
  thumbnail: 'd',
  summary:
    'Any reaction can be imagined in two steps: take the reactants apart into their elements, then build the products from them. By Hess’s law, ΔrH° = Σ nΔfH°(products) − Σ nΔfH°(reactants). For methane burning to carbon dioxide and water vapour, ΔrH° = −877.1 − (−74.6) = −802.5 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'The Route Through the Elements', subtitle: 'Products minus reactants' }],
      lines: [
        { say: 'With Hess’s law, a short table of enthalpies of formation is enough to find delta H for any reaction between the compounds in it. The trick is a detour through the elements.', show: 'title' },
        { say: 'In this part, you will follow the detour, turn it into a formula, and use it for burning methane.' },
      ],
    },
    {
      chapter: 'A detour through the elements',
      layout: 'center',
      main: [route],
      lines: [
        { say: 'Any reaction can be imagined in two steps through the elements. Take methane burning to carbon dioxide and water vapour.', show: ['d.axis', 'd.reactants', 'd.products', 'd.elements', 'd.scale'] },
        { say: 'First, take the reactants apart into their elements. That is the reverse of the formation of methane, so it absorbs seventy-four point six kilojoules. Oxygen is already an element.', show: 'd.apart', focus: 'd.apart' },
        {
          say: 'Then build the products from the elements. Forming carbon dioxide and two moles of water vapour releases three hundred ninety-three point five, plus two times two hundred forty-one point eight: eight hundred seventy-seven point one kilojoules in all.',
          show: 'd.build',
          focus: 'd.build',
        },
        { say: 'By Hess’s law, the direct change is the sum of the two steps: positive seventy-four point six, minus eight hundred seventy-seven point one, is negative eight hundred two point five kilojoules.', show: 'd.direct', focus: 'd.direct' },
      ],
    },
    {
      chapter: 'Products minus reactants',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_r H^\\circ = \\sum n\\,\\Delta_f H^\\circ(\\text{products}) - \\sum n\\,\\Delta_f H^\\circ(\\text{reactants})'] },
        { kind: 'text', id: 'n', size: 'md', md: '$n$ is the coefficient of each substance in the balanced equation.' },
      ],
      lines: [
        { say: 'Taking the reactants apart is the reverse of their formation equations, so it subtracts their enthalpies of formation. Building the products adds theirs.' },
        { say: 'So delta H of the reaction is the sum of the enthalpies of formation of the products, minus the sum for the reactants.', show: 'm', focus: 'm' },
        { say: 'Each value is multiplied by its coefficient in the balanced equation.', show: 'n' },
      ],
    },
    {
      chapter: 'Burning methane',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', '$\\Delta_f H^\\circ$ (kJ/mol)', 'Substance', '$\\Delta_f H^\\circ$ (kJ/mol)'],
          rows: [
            ['$\\ce{CO2(g)}$', '$-393.5$', '$\\ce{H2O(g)}$', '$-241.8$'],
            ['$\\ce{CH4(g)}$', '$-74.6$', '$\\ce{O2(g)}$', '$0$'],
          ],
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)}',
            '\\text{Products: } (-393.5) + 2(-241.8) = -877.1\\ \\text{kJ}',
            '\\text{Reactants: } (-74.6) + 2(0) = -74.6\\ \\text{kJ}',
            '\\Delta_r H^\\circ = -877.1 - (-74.6) = -802.5\\ \\text{kJ}',
          ],
        },
      ],
      lines: [
        { say: 'Now use the formula for burning methane. Here are the standard enthalpies of formation you need.', show: ['t', 'm.0'] },
        { say: 'Products: carbon dioxide, plus two moles of water vapour, at negative two hundred forty-one point eight each. That is negative eight hundred seventy-seven point one kilojoules.', show: 'm.1', focus: ['m.1', 't.0'] },
        { say: 'Reactants: methane, plus two moles of oxygen. Oxygen is an element in its standard state, so it counts as zero.', show: 'm.2', focus: ['m.2', 't.1'] },
        { say: 'Products minus reactants: delta H is negative eight hundred two point five kilojoules, the same as the detour through the elements.', show: 'm.3', focus: ['m.3', 't'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'Find $\\Delta_r H^\\circ$ for $\\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, using $\\Delta_f H^\\circ$ values of $-1207.6\\ \\text{kJ/mol}$ for $\\ce{CaCO3(s)}$, $-634.9\\ \\text{kJ/mol}$ for $\\ce{CaO(s)}$ and $-393.5\\ \\text{kJ/mol}$ for $\\ce{CO2(g)}$.',
          choices: ['$+179.2\\ \\text{kJ}$', '$-179.2\\ \\text{kJ}$', '$-2236.0\\ \\text{kJ}$', '$+2236.0\\ \\text{kJ}$'],
          answer: 0,
          working: 'Products: $(-634.9) + (-393.5) = -1028.4\\ \\text{kJ}$. Reactants: $-1207.6\\ \\text{kJ}$. $\\Delta_r H^\\circ = -1028.4 - (-1207.6) = +179.2\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find delta H for calcium carbonate breaking down into calcium oxide and carbon dioxide, using the values on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, positive one hundred seventy-nine point two kilojoules. The products add to negative one thousand twenty-eight point four, and products minus reactants is positive: the reaction is endothermic. Choice B subtracts the wrong way round.', show: 'q.answer' },
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
            'Any reaction can go by way of the elements: take the reactants apart, then build the products.',
            '$\\Delta_r H^\\circ = \\sum n\\Delta_f H^\\circ(\\text{products}) - \\sum n\\Delta_f H^\\circ(\\text{reactants})$',
            'Elements in their standard states count as zero.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Any reaction can go by way of the elements: take the reactants apart, then build the products.', show: 'sum.0' },
        { say: 'So delta H is the sum of the enthalpies of formation of the products, minus the sum for the reactants, each times its coefficient.', show: 'sum.1' },
        { say: 'Elements in their standard states count as zero. In part four, you will watch the signs and states, and work backwards. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
