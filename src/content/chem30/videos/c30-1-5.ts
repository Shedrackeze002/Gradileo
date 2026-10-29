import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { enthalpyLevels } from './lib/c30-1b-figures.ts';

// Hydrogen and oxygen above water vapour: down one way (released), up the other (absorbed).
const water = figure(
  'h',
  [
    enthalpyLevels({
      top: 7,
      levels: [
        { id: 'top', y: 5.6, from: 0.4, to: 6.6, tex: '\\ce{2H2(g) + O2(g)}' },
        { id: 'bottom', y: 1.4, from: 0.4, to: 6.6, tex: '\\ce{2H2O(g)}', place: 'below right' },
      ],
      arrows: [
        { id: 'fwd', from: [1.8, 5.6], to: [1.8, 1.4], tex: '-483.6\\ \\text{kJ}', side: 'east', labelAt: 0.68 },
        { id: 'rev', from: [5.4, 1.4], to: [5.4, 5.6], tex: '+483.6\\ \\text{kJ}', side: 'west', labelAt: 0.68 },
      ],
    }),
  ],
  540,
);

const video: Explainer = {
  id: 'c30-1-5',
  lessonId: 'c30-1-5',
  title: "Hess's Law, Part 1: Reversing and Multiplying Equations",
  thumbnailTitle: 'Reversing and Multiplying Equations',
  thumbnail: 'h',
  summary:
    'A thermochemical equation can be reversed or multiplied, as long as its enthalpy change is changed to match. Reversing an equation changes the sign of ΔH: hydrogen and oxygen forming water vapour release 483.6 kJ, so the reverse absorbs 483.6 kJ. Multiplying by a number, fractions included, multiplies ΔH by that number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Reversing and Multiplying Equations', subtitle: 'Change the equation, and change $\\Delta H$ to match' }],
      lines: [
        { say: 'How much energy is released when carbon burns to carbon monoxide? It cannot be measured cleanly, because some of the carbon always goes on to form carbon dioxide.', show: 'title' },
        { say: "Chemists find it by combining reactions that can be measured. This part shows how to reverse and multiply a thermochemical equation. The later parts combine equations with Hess's law." },
      ],
    },
    {
      chapter: 'Reversing an equation',
      layout: 'split',
      leftWidth: 500,
      left: [water],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{2H2(g) + O2(g) -> 2H2O(g)}', '\\Delta_r H = -483.6\\ \\text{kJ}', '\\ce{2H2O(g) -> 2H2(g) + O2(g)}', '\\Delta_r H = +483.6\\ \\text{kJ}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reversing', md: 'Reversing an equation **changes the sign** of $\\Delta H$. Its size stays the same.' },
      ],
      lines: [
        {
          say: 'Hydrogen and oxygen react to form water vapour, and delta H is negative four hundred eighty-three point six kilojoules.',
          caption: 'Hydrogen and oxygen react to form water vapour, 2H₂(g) + O₂(g) → 2H₂O(g), and ΔH is −483.6 kJ.',
          show: ['m.0', 'm.1', 'h.axis', 'h.top', 'h.bottom'],
        },
        { say: 'On an enthalpy diagram, going down from the hydrogen and oxygen to the water vapour releases that energy.', show: 'h.fwd', focus: 'h.fwd' },
        {
          say: 'Now run the reaction backwards. It crosses the same gap between the same two levels, but going up, so it absorbs the same amount of energy: delta H is positive four hundred eighty-three point six kilojoules.',
          caption: 'Now run the reaction backwards, 2H₂O(g) → 2H₂(g) + O₂(g). It crosses the same gap between the same two levels, but going up, so it absorbs the same amount of energy: ΔH is +483.6 kJ.',
          show: ['m.2', 'm.3', 'h.rev'],
          focus: ['m.2', 'm.3', 'h.rev'],
        },
        { say: 'So reversing an equation changes the sign of delta H. Its size stays the same.', show: 'key', focus: ['h', 'm'] },
      ],
    },
    {
      chapter: 'Multiplying an equation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['', 'Equation', '$\\Delta_r H$'],
          rows: [
            ['given', '$\\ce{N2(g) + 3H2(g) -> 2NH3(g)}$', '$-91.8\\ \\text{kJ}$'],
            ['$\\times\\, 3$', '$\\ce{3N2(g) + 9H2(g) -> 6NH3(g)}$', '$3 \\times (-91.8) = -275.4\\ \\text{kJ}$'],
            ['reversed, $\\times\\, 3$', '$\\ce{6NH3(g) -> 3N2(g) + 9H2(g)}$', '$+275.4\\ \\text{kJ}$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Multiplying', md: 'Multiplying an equation by a number **multiplies** $\\Delta H$ by that number; fractions such as $\\tfrac{1}{2}$ are allowed. Multiplying never changes the sign: only reversing does.' },
      ],
      lines: [
        {
          say: 'Multiplying works in the same way. Nitrogen and hydrogen form ammonia, with a delta H of negative ninety-one point eight kilojoules.',
          caption: 'Multiplying works in the same way. N₂(g) + 3H₂(g) → 2NH₃(g), with a ΔH of −91.8 kJ.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Multiply every coefficient by three. Three times as much reacts, so three times as much energy is released: negative two hundred seventy-five point four kilojoules.', show: 'm.1', focus: 'm.1' },
        { say: 'So multiplying an equation by a number multiplies delta H by that number. Fractions such as one half are allowed, because the coefficients count moles.', show: 'key', focus: 'm' },
        { say: 'Notice that the sign did not change: only reversing changes it. To reverse and multiply, do both. Six moles of ammonia breaking down has a delta H of positive two hundred seventy-five point four kilojoules.', caption: 'Notice that the sign did not change: only reversing changes it. To reverse and multiply, do both. 6NH₃(g) → 3N₂(g) + 9H₂(g) has a ΔH of +275.4 kJ.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Both at once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Given $\\ce{2H2(g) + O2(g) -> 2H2O(g)}\\quad \\Delta_r H = -483.6\\ \\text{kJ}$, find $\\Delta_r H$ for $\\ce{H2O(g) -> H2(g) + 1/2 O2(g)}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Reversed: } \\Delta_r H = +483.6\\ \\text{kJ}', '\\text{Multiplied by } \\tfrac{1}{2}\\text{: } \\Delta_r H = \\tfrac{1}{2} \\times (+483.6) = +241.8\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'Now use both rules. Given the equation that forms two moles of water vapour, find delta H for one mole of water vapour breaking down.',
          caption: 'Now use both rules. Given 2H₂(g) + O₂(g) → 2H₂O(g), ΔH = −483.6 kJ, find ΔH for H₂O(g) → H₂(g) + ½O₂(g).',
          show: 'q',
        },
        { say: 'Water vapour has moved to the reactant side, so the equation is reversed: positive four hundred eighty-three point six.', show: 'm.0', focus: 'm.0' },
        { say: 'The coefficient of water went from two to one, so the equation is multiplied by one half. Delta H is positive two hundred forty-one point eight kilojoules.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $\\ce{2SO2(g) + O2(g) -> 2SO3(g)}\\quad \\Delta_r H = -197.8\\ \\text{kJ}$, what is $\\Delta_r H$ for $\\ce{SO3(g) -> SO2(g) + 1/2 O2(g)}$?',
          choices: ['$-98.9\\ \\text{kJ}$', '$+197.8\\ \\text{kJ}$', '$+98.9\\ \\text{kJ}$', '$-395.6\\ \\text{kJ}$'],
          answer: 2,
          working: '$\\ce{SO3}$ has moved to the reactant side, so the equation is reversed: $+197.8\\ \\text{kJ}$. Its coefficient went from 2 to 1, so it is multiplied by $\\tfrac{1}{2}$: $\\tfrac{1}{2} \\times (+197.8) = +98.9\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Sulfur dioxide and oxygen form sulfur trioxide, with a delta H of negative one hundred ninety-seven point eight kilojoules. What is delta H when one mole of sulfur trioxide breaks down, as shown? Pause the video and try it.',
          caption: 'Your turn. 2SO₂(g) + O₂(g) → 2SO₃(g), with a ΔH of −197.8 kJ. What is ΔH for SO₃(g) → SO₂(g) + ½O₂(g)? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is C, positive ninety-eight point nine kilojoules: the equation is reversed, and multiplied by one half. Choice A is the right size with the wrong sign, because it was not reversed.', show: 'q.answer' },
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
            'Reversing an equation **changes the sign** of $\\Delta H$; its size stays the same.',
            'Multiplying an equation by a number **multiplies** $\\Delta H$ by that number; fractions such as $\\tfrac{1}{2}$ are allowed.',
            'Multiplying never changes the sign. To reverse **and** multiply, do both.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Reversing an equation changes the sign of delta H, and its size stays the same.', show: 'sum.0' },
        { say: 'Multiplying an equation by a number multiplies delta H by that number, and the number can be a fraction.', show: 'sum.1' },
        { say: "Multiplying never changes the sign; to reverse and multiply, do both. In part two, you will meet Hess's law, which adds equations together. See you there!", show: 'sum.2' },
      ],
    },
  ],
};

export default video;
