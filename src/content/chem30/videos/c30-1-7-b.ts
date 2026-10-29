import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { peDiagram } from './lib/c30-1b-figures.ts';

// The lesson's exothermic reaction (reactants 150 kJ, activated complex 225 kJ, products 50 kJ)
// and its endothermic example (50 kJ, 200 kJ, 125 kJ).
const exo = figure('e', [peDiagram({ reactants: 150, products: 50, peak: 225, max: 250, step: 50, grid: 25 })], 560);
const endo = figure('e', [peDiagram({ reactants: 50, products: 125, peak: 200, max: 250, step: 50, grid: 25 })], 560);

const video: Explainer = {
  id: 'c30-1-7-b',
  lessonId: 'c30-1-7',
  title: 'Activation Energy and Catalysts, Part 2: Reading Potential Energy Diagrams',
  thumbnailTitle: 'Reading Potential Energy Diagrams',
  thumbnail: 'e',
  summary:
    'From a potential energy diagram, the forward activation energy is the activated complex minus the reactants, the reverse activation energy is the activated complex minus the products, and ΔH is products minus reactants, so ΔH = Ea(forward) − Ea(reverse). For reactants at 150 kJ, the activated complex at 225 kJ and products at 50 kJ: 75 kJ, 175 kJ and −100 kJ. Measure each climb from its own starting level, not from zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Reading Potential Energy Diagrams', subtitle: 'Two activation energies and $\\Delta H$' }],
      lines: [
        { say: 'A potential energy diagram holds more than one number. From the same three levels, you can read two activation energies and the enthalpy change.', show: 'title' },
        { say: 'In this part, you will read all three, and see how they are linked.' },
      ],
    },
    {
      chapter: 'Three quantities',
      layout: 'split',
      leftWidth: 640,
      left: [exo],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'From the diagram (kJ)'],
          rows: [
            ['$E_a(\\text{fwd})$', '$225 - 150 = 75$'],
            ['$E_a(\\text{rev})$', '$225 - 50 = 175$'],
            ['$\\Delta H$', '$50 - 150 = -100$'],
          ],
        },
      ],
      lines: [
        {
          say: 'Here is the same reaction: the reactants at one hundred fifty kilojoules, the activated complex at two hundred twenty-five, and the products at fifty.',
          show: ['e.axes', 'e.grid', 'e.curve', 'e.reactants', 'e.products', 'e.complex'],
        },
        { say: 'The forward activation energy is the climb from the reactants to the top: seventy-five kilojoules.', show: ['e.fwd', 't.0'], focus: ['e.fwd', 't.0'] },
        {
          say: 'The reverse reaction, from the products back to the reactants, climbs the same hump from the other side. Its activation energy is two hundred twenty-five minus fifty: one hundred seventy-five kilojoules.',
          show: ['e.rev', 't.1'],
          focus: ['e.rev', 't.1'],
        },
        { say: 'And delta H is products minus reactants: fifty minus one hundred fifty, or negative one hundred kilojoules. The reaction is exothermic.', show: ['e.dh', 't.2'], focus: ['e.dh', 't.2'] },
      ],
    },
    {
      chapter: 'How they are linked',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta H = E_a(\\text{forward}) - E_a(\\text{reverse})', '-100\\ \\text{kJ} = 75\\ \\text{kJ} - 175\\ \\text{kJ}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Which is larger?', md: 'In an **exothermic** reaction, $E_a(\\text{reverse})$ is the larger one; in an **endothermic** reaction, $E_a(\\text{forward})$ is.' },
      ],
      lines: [
        { say: 'Because the hump is shared, the three quantities are linked. Delta H equals the forward activation energy minus the reverse activation energy.', show: 'm.0', focus: 'm.0' },
        { say: 'Here, seventy-five minus one hundred seventy-five is negative one hundred. That checks.', show: 'm.1', focus: 'm.1' },
        { say: 'In an exothermic reaction, the reverse activation energy is the larger one. In an endothermic reaction, the forward one is.', show: 'key', focus: 'm' },
      ],
    },
    {
      chapter: 'An endothermic reaction',
      layout: 'split',
      leftWidth: 640,
      left: [endo],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'From the diagram (kJ)'],
          rows: [
            ['$E_a(\\text{fwd})$', '$200 - 50 = 150$'],
            ['$E_a(\\text{rev})$', '$200 - 125 = 75$'],
            ['$\\Delta H$', '$125 - 50 = +75$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Check: } 150 - 75 = 75'] },
      ],
      lines: [
        {
          say: 'Now an endothermic reaction: the reactants at fifty kilojoules, the activated complex at two hundred, and the products at one hundred twenty-five.',
          show: ['e.axes', 'e.grid', 'e.curve', 'e.reactants', 'e.products', 'e.complex'],
        },
        { say: 'The forward activation energy is two hundred minus fifty: one hundred fifty kilojoules.', show: ['e.fwd', 't.0'], focus: ['e.fwd', 't.0'] },
        { say: 'The reverse is two hundred minus one hundred twenty-five: seventy-five kilojoules.', show: ['e.rev', 't.1'], focus: ['e.rev', 't.1'] },
        { say: 'Delta H is one hundred twenty-five minus fifty: positive seventy-five kilojoules. And the forward minus the reverse, one hundred fifty minus seventy-five, checks.', show: ['e.dh', 't.2', 'm'], focus: ['e.dh', 't.2', 'm.0'] },
      ],
    },
    {
      chapter: 'Measure from the right level',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measure each climb from its own starting level', md: 'The activation energy is **not** the height of the hump above zero. The forward reaction starts at the reactants and the reverse reaction at the products. In the endothermic example, the hump is at $200\\ \\text{kJ}$, but neither activation energy is $200\\ \\text{kJ}$.' },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Two kinds of diagram', md: 'An **enthalpy diagram** shows only the reactant and product levels and $\\Delta H$. A **potential energy diagram** also shows the path between them, so it shows the activation energies.' },
      ],
      lines: [
        { say: 'A common mistake is to read an activation energy as the height of the hump above zero. In the endothermic example, the hump is at two hundred kilojoules, but neither activation energy is two hundred.', show: 'oops' },
        { say: 'Measure each climb from its own starting level: the reactants for the forward reaction, and the products for the reverse.' },
        { say: 'Notice the difference from the enthalpy diagrams of an earlier lesson, which show only the two levels and delta H. A potential energy diagram also shows the path between them, so it shows the activation energies.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A potential energy diagram shows the reactants at $60\\ \\text{kJ}$, the activated complex at $180\\ \\text{kJ}$ and the products at $140\\ \\text{kJ}$. What are $E_a(\\text{reverse})$ and $\\Delta H$?',
          choices: ['$40\\ \\text{kJ}$ and $+80\\ \\text{kJ}$', '$120\\ \\text{kJ}$ and $+80\\ \\text{kJ}$', '$40\\ \\text{kJ}$ and $-80\\ \\text{kJ}$', '$180\\ \\text{kJ}$ and $+80\\ \\text{kJ}$'],
          answer: 0,
          working: '$E_a(\\text{reverse}) = 180 - 140 = 40\\ \\text{kJ}$, and $\\Delta H = 140 - 60 = +80\\ \\text{kJ}$. Check: $E_a(\\text{forward}) - E_a(\\text{reverse}) = 120 - 40 = 80$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A potential energy diagram shows the reactants at sixty kilojoules, the activated complex at one hundred eighty, and the products at one hundred forty. What are the reverse activation energy and delta H? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is A. The reverse climb starts at the products: one hundred eighty minus one hundred forty is forty kilojoules. Delta H is products minus reactants: positive eighty. Choice B gives the forward activation energy instead.', show: 'q.answer' },
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
            '$E_a(\\text{forward})$ = activated complex − reactants; $E_a(\\text{reverse})$ = activated complex − products.',
            '$\\Delta H$ = products − reactants $= E_a(\\text{forward}) - E_a(\\text{reverse})$.',
            'Measure each climb from its own starting level, never from zero.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The forward activation energy is the activated complex minus the reactants, and the reverse is the activated complex minus the products.', show: 'sum.0' },
        { say: 'Delta H is products minus reactants, which equals the forward activation energy minus the reverse.', show: 'sum.1' },
        { say: 'Measure each climb from its own starting level, never from zero. In part three, you will see what a catalyst does to the diagram. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
