import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { peDiagram } from './lib/c30-1b-figures.ts';

// A sketch, with no scale: the top of the hump 75 kJ above the reactants, and the products 40 kJ
// below them.
const sketch = figure(
  'e',
  [peDiagram({ reactants: 60, products: 20, peak: 135, max: 150, labels: { fwd: '75\\ \\text{kJ}', dh: '-40\\ \\text{kJ}', rev: 'E_a(\\text{rev})' } })],
  540,
);

const video: Explainer = {
  id: 'c30-1-7-d',
  lessonId: 'c30-1-7',
  title: 'Activation Energy and Catalysts, Part 4: Working Without a Diagram',
  thumbnailTitle: 'Working Without a Diagram',
  thumbnail: 'e',
  summary:
    'A quick sketch and one relationship find activation energies from numbers alone: Ea(reverse) = Ea(forward) − ΔH, so Ea(forward) = 75 kJ and ΔH = −40 kJ give Ea(reverse) = 115 kJ. A catalyst does not change ΔH, so when it lowers Ea(forward) from 120 kJ to 70 kJ in a reaction with ΔH = +30 kJ, Ea(reverse) falls from 90 kJ to 40 kJ, by the same 50 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Working Without a Diagram', subtitle: 'A sketch and one relationship' }],
      lines: [
        { say: 'A question will often give you the numbers without a diagram. A quick sketch and one relationship are all you need.', show: 'title' },
        { say: 'In this part, you will find activation energies and enthalpy changes from numbers alone, with and without a catalyst.' },
      ],
    },
    {
      chapter: 'Sketch it',
      layout: 'split',
      leftWidth: 600,
      left: [sketch],
      right: [
        { kind: 'text', id: 'q', size: 'md', align: 'left', md: '$E_a(\\text{forward}) = 75\\ \\text{kJ}$ and $\\Delta H = -40\\ \\text{kJ}$. Find $E_a(\\text{reverse})$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['75 + 40 = 115\\ \\text{kJ}', 'E_a(\\text{rev}) = E_a(\\text{fwd}) - \\Delta H', '= 75 - (-40) = 115\\ \\text{kJ}'] },
      ],
      lines: [
        { say: 'For a reaction, the forward activation energy is seventy-five kilojoules, and delta H is negative forty kilojoules. What is the activation energy of the reverse reaction?', show: 'q' },
        {
          say: 'Sketch it. The top of the hump is seventy-five kilojoules above the reactants, and the products are forty kilojoules below them.',
          show: ['e.axes', 'e.curve', 'e.reactants', 'e.products', 'e.fwd', 'e.dh'],
        },
        { say: 'From the products, the climb to the top is seventy-five plus forty: one hundred fifteen kilojoules.', show: ['e.rev', 'm.0'], focus: ['e.rev', 'm.0'] },
        { say: 'With the formula, the reverse activation energy is the forward one minus delta H. Seventy-five minus negative forty is one hundred fifteen kilojoules, the same.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'With a catalyst',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A reaction has $E_a(\\text{forward}) = 120\\ \\text{kJ}$ and $\\Delta H = +30\\ \\text{kJ}$. A catalyst lowers $E_a(\\text{forward})$ to $70\\ \\text{kJ}$. Find $E_a(\\text{reverse})$ with and without the catalyst.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{Without the catalyst: } E_a(\\text{rev}) = 120 - 30 = 90\\ \\text{kJ}', '\\text{With the catalyst: } E_a(\\text{rev}) = 70 - 30 = 40\\ \\text{kJ}', '\\text{Both lowered by } 50\\ \\text{kJ}'],
        },
      ],
      lines: [
        { say: 'A reaction has a forward activation energy of one hundred twenty kilojoules, and a delta H of positive thirty. A catalyst lowers the forward activation energy to seventy. Find the reverse activation energy with and without the catalyst.', show: 'q' },
        { say: 'Without the catalyst, the reverse activation energy is one hundred twenty minus thirty: ninety kilojoules.', show: 'm.0', focus: 'm.0' },
        { say: 'The catalyst does not change delta H, so with it, the reverse activation energy is seventy minus thirty: forty kilojoules.', show: 'm.1', focus: 'm.1' },
        { say: 'The reverse activation energy fell by fifty kilojoules, the same amount as the forward activation energy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding the products',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The reactants are at $120\\ \\text{kJ}$ and the activated complex at $210\\ \\text{kJ}$, and $E_a(\\text{reverse}) = 150\\ \\text{kJ}$. Find the potential energy of the products and $\\Delta H$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Products: } 210 - 150 = 60\\ \\text{kJ}', '\\Delta H = 60 - 120 = -60\\ \\text{kJ}'] },
      ],
      lines: [
        { say: 'One more. The reactants are at one hundred twenty kilojoules, the activated complex at two hundred ten, and the reverse activation energy is one hundred fifty. Find the products and delta H.', show: 'q' },
        { say: 'The reverse climb ends at the top, so the products are one hundred fifty kilojoules below it: at sixty kilojoules.', show: 'm.0', focus: 'm.0' },
        { say: 'Then delta H is products minus reactants: sixty minus one hundred twenty, or negative sixty kilojoules. The reaction is exothermic.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Without a catalyst, a reaction has $E_a(\\text{forward}) = 90\\ \\text{kJ}$ and $\\Delta H = -50\\ \\text{kJ}$. A catalyst lowers $E_a(\\text{forward})$ to $35\\ \\text{kJ}$. What is $E_a(\\text{reverse})$ with the catalyst?',
          choices: ['$140\\ \\text{kJ}$', '$85\\ \\text{kJ}$', '$-15\\ \\text{kJ}$', '$55\\ \\text{kJ}$'],
          answer: 1,
          working: 'The catalyst does not change $\\Delta H$, so $E_a(\\text{reverse}) = E_a(\\text{forward}) - \\Delta H = 35 - (-50) = 85\\ \\text{kJ}$. Without the catalyst it is $90 - (-50) = 140\\ \\text{kJ}$: both fall by $55\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Without a catalyst, a reaction has a forward activation energy of ninety kilojoules, and a delta H of negative fifty. A catalyst lowers the forward activation energy to thirty-five. What is the reverse activation energy with the catalyst? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is B, eighty-five kilojoules: thirty-five minus negative fifty. Choice A, one hundred forty, is the reverse activation energy without the catalyst.', show: 'q.answer' },
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
            'Sketch the reactants, the hump and the products, and measure each climb from its own level.',
            '$E_a(\\text{reverse}) = E_a(\\text{forward}) - \\Delta H$, and $\\Delta H$ = products − reactants.',
            'A catalyst does not change $\\Delta H$, so it lowers both activation energies by the same amount.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sketch the reactants, the hump and the products, and measure each climb from its own level.', show: 'sum.0' },
        { say: 'The reverse activation energy is the forward one minus delta H, and delta H is products minus reactants.', show: 'sum.1' },
        { say: 'A catalyst does not change delta H, so it lowers both activation energies by the same amount. That completes this unit on thermochemical changes.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
