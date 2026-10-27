import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { filtration, room } from './lib/c20-4a-figures.ts';

// Barium sulfate caught on filter paper, with the sodium chloride solution running through.
const filter = figure('fl', [filtration({ solid: '\\ce{BaSO4(s)}', filtrate: '\\ce{NaCl(aq)}' }), room('pad', [-2, 0], [5.2, 0])], 500);

const video: Explainer = {
  id: 'c20-4-4-d',
  lessonId: 'c20-4-4',
  title: 'Mole Ratios and Gravimetric Stoichiometry, Part 4: Gravimetric Analysis',
  thumbnailTitle: 'Gravimetric Analysis',
  thumbnail: 'fl',
  summary:
    'Change a given mass to moles before using the mole ratio, and round only at the end: 25.0 g of propane needs 90.7 g of oxygen, not 125 g. In gravimetric analysis, an excess of one reactant turns all of a dissolved substance into a precipitate, which is filtered, dried to constant mass and weighed: 2.33 g of barium sulfate shows that a solution held 2.08 g of barium chloride.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Gravimetric Analysis', subtitle: 'Weighing a precipitate' }],
      lines: [
        { say: 'How much barium chloride is dissolved in a solution? It cannot be weighed while it is dissolved, but it can be turned into a solid that can.', show: 'title' },
        { say: 'In this last part, you will avoid a common slip, and analyse a solution by weighing a precipitate.' },
      ],
    },
    {
      chapter: 'Oxygen for a barbecue',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Propane burns: $\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. What mass of $\\ce{O2}$ is needed to burn $25.0\\ \\text{g}$ of $\\ce{C3H8}$, to the nearest tenth? Use C $12.01$, H $1.01$ and O $16.00\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'M(\\ce{C3H8}) = 3(12.01) + 8(1.01) = 44.11\\ \\text{g/mol}',
            'n(\\ce{C3H8}) = \\dfrac{25.0}{44.11} = 0.5668\\ \\text{mol}',
            'n(\\ce{O2}) = 0.5668 \\times \\dfrac{5}{1} = 2.834\\ \\text{mol}',
            'm = 2.834 \\times 32.00 = 90.69\\ \\text{g} \\approx \\good{90.7\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'What mass of oxygen is needed to burn twenty-five point zero grams of propane in a barbecue?', show: 'q' },
        { say: 'Propane is three times twelve point zero one, plus eight times one point zero one: forty-four point one one grams per mole. So twenty-five point zero grams is zero point five six six eight moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Oxygen to propane is five to one, so two point eight three four moles of oxygen.', show: 'm.2', focus: 'm.2' },
        { say: 'Oxygen gas, O two, is thirty-two point zero zero grams per mole. Two point eight three four times thirty-two is ninety point six nine, or ninety point seven grams.', caption: 'Oxygen gas, O₂, is 32.00 g/mol. 2.834 × 32.00 = 90.69, or 90.7 g.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two habits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Grams do not go through the ratio', md: '$25.0 \\times \\dfrac{5}{1} = 125\\ \\text{g}$ is wrong: the coefficients compare moles, not grams. Always change the given mass to moles first.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round only at the end', md: 'Keep at least four significant figures in each step, or better, the unrounded value in your calculator. Round only the final mass.' },
      ],
      lines: [
        { say: 'A tempting shortcut is to multiply the mass by the ratio: twenty-five point zero times five gives one hundred twenty-five grams. That is wrong, because the coefficients compare moles, not grams.', show: 'oops' },
        { say: 'And round only at the end. Keep at least four significant figures in each step, or better, the unrounded value in your calculator.', show: 'tip' },
      ],
    },
    {
      chapter: 'Gravimetric analysis',
      layout: 'split',
      leftWidth: 520,
      left: [filter],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Add sodium sulfate solution **in excess**: every barium ion ends up in solid $\\ce{BaSO4}$.',
            '**Filter** off the precipitate and rinse it.',
            '**Dry** it to constant mass, and **weigh** it.',
            'Work back to the barium chloride.',
          ],
        },
      ],
      lines: [
        { say: 'To measure the barium chloride in a solution, chemists add sodium sulfate solution in excess: more than enough to react with all of it. So every barium ion ends up in a precipitate of barium sulfate.', show: 'b.0' },
        { say: 'They filter off the precipitate and rinse it. The sodium chloride solution runs through.', show: ['fl.funnel', 'fl.paper', 'fl.solid', 'fl.beaker', 'fl.filtrate', 'b.1'], focus: 'fl.solid' },
        { say: 'A wet precipitate weighs more than the solid alone, so they dry it, weigh it, dry it again and weigh it again, until the mass stops changing.', show: 'b.2' },
        { say: 'Then they work back from the mass of barium sulfate to the barium chloride.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Barium chloride in a solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq)}$. The dried $\\ce{BaSO4}$ has a mass of $2.33\\ \\text{g}$. What mass of $\\ce{BaCl2}$ was in the solution, to the nearest hundredth? Use Ba $137.33$, S $32.06$, O $16.00$ and Cl $35.45\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'M(\\ce{BaSO4}) = 137.33 + 32.06 + 4(16.00) = 233.39\\ \\text{g/mol}',
            'n(\\ce{BaSO4}) = \\dfrac{2.33}{233.39} = 0.009983\\ \\text{mol}',
            'n(\\ce{BaCl2}) = 0.009983 \\times \\dfrac{1}{1} = 0.009983\\ \\text{mol}',
            'M(\\ce{BaCl2}) = 137.33 + 2(35.45) = 208.23\\ \\text{g/mol}',
            'm = 0.009983 \\times 208.23 = 2.079\\ \\text{g} \\approx \\good{2.08\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Here the dried barium sulfate has a mass of two point three three grams. What mass of barium chloride was in the solution?', show: 'q' },
        { say: 'Barium sulfate is two hundred thirty-three point three nine grams per mole, so two point three three grams is zero point zero zero nine nine eight three moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The ratio is one to one, so the solution held the same amount of barium chloride.', show: 'm.2', focus: 'm.2' },
        { say: 'Barium chloride is two hundred eight point two three grams per mole, so the solution held two point zero eight grams of barium chloride.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Silver nitrate solution is mixed with excess sodium chloride solution: $\\ce{AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)}$. The dried $\\ce{AgCl}$ has a mass of $1.43\\ \\text{g}$. What mass of $\\ce{AgNO3}$ was in the solution, to the nearest hundredth? Use Ag $107.87$, N $14.01$, O $16.00$, Cl $35.45\\ \\text{g/mol}$.',
          choices: ['$1.43\\ \\text{g}$', '$1.21\\ \\text{g}$', '$3.39\\ \\text{g}$', '$1.70\\ \\text{g}$'],
          answer: 3,
          working: '$M(\\ce{AgCl}) = 143.32$, so $n = \\dfrac{1.43}{143.32} = 0.009978\\ \\text{mol}$. The ratio is $1 : 1$ and $M(\\ce{AgNO3}) = 169.88$, so $m = 0.009978 \\times 169.88 = 1.70\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Silver nitrate solution is mixed with excess sodium chloride solution, and the dried silver chloride has a mass of one point four three grams. What mass of silver nitrate was in the solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one point seven zero grams. One point four three grams of silver chloride is zero point zero zero nine nine seven eight moles, and that much silver nitrate is one point seven zero grams. Choice A puts grams straight through the ratio, and choice B uses the two molar masses the wrong way round.', show: 'q.answer' },
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
            'Change the given mass to moles **before** the mole ratio; never put grams through it.',
            'Keep four significant figures in the working, and round only at the end.',
            '**Gravimetric analysis**: an excess reagent turns all of a substance into a precipitate, which is filtered, dried and weighed.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Change the given mass to moles before you use the mole ratio.', show: 'sum.0' },
        { say: 'Keep four significant figures in the working, and round only at the end.', show: 'sum.1' },
        { say: 'And in gravimetric analysis, an excess reagent turns a substance into a precipitate, which is dried and weighed. That completes this lesson. Next, you will work with gases and solutions in reactions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
