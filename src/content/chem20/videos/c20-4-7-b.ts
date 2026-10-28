import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { filtration, room, yieldBars } from './lib/c20-4b-figures.ts';

// A precipitate on filter paper: some of it sticks to the paper and some slips through.
const filter = figure('fl', [filtration({ solid: '\\text{precipitate}', filtrate: '\\text{filtrate}' }), room('pad', [-2, 0], [5.6, 0])], 460);

// Barium sulfate weighed while still wet: 5.12 g against a theoretical 4.85 g.
const wet = figure('y', [yieldBars({ theoretical: 4.85, actual: 5.12, values: ['4.85\\ \\text{g}', '5.12\\ \\text{g}'], names: ['\\text{theoretical}', '\\text{weighed}'], extra: '\\text{water?}' })], 270);

const video: Explainer = {
  id: 'c20-4-7-b',
  lessonId: 'c20-4-7',
  title: 'Percent Yield, Part 2: Why Yields Fall Short',
  thumbnailTitle: 'Why Yields Fall Short',
  thumbnail: 'y',
  summary:
    'The actual yield is usually below the theoretical yield: the reaction may not go to completion, side reactions make other products, product is lost while it is collected, and the reactants may be impure. A yield above 100%, such as 5.12 g of barium sulfate from a theoretical 4.85 g (105.6%), means something else was weighed with the product, most often water, so a precipitate is dried to constant mass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'Why Yields Fall Short', subtitle: 'And what a yield over 100% means' }],
      lines: [
        { say: 'A percent yield of one hundred percent is very rare, even for a careful chemist.', show: 'title' },
        { say: 'In this part, you will see why the actual yield falls short, and what it means when a yield comes out too high.' },
      ],
    },
    {
      chapter: 'Four reasons',
      layout: 'split',
      leftWidth: 460,
      left: [filter],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The reaction does not go to **completion**.',
            '**Side reactions** make other, unwanted products.',
            'Product is **lost** while it is collected.',
            'The reactants are **impure**.',
          ],
        },
      ],
      lines: [
        { say: 'First, the reaction may not go to completion. Some reactant is still unreacted when it stops, or the reaction reaches a balance, with products changing back into reactants.', show: 'b.0' },
        { say: 'Second, side reactions use up some of the reactants to make other, unwanted products. Magnesium burned in air forms some magnesium nitride, as well as magnesium oxide.', show: 'b.1' },
        { say: 'Third, product is lost while it is collected. A precipitate sticks to the beaker and the filter paper, a few crystals pass through the filter, and a little is left behind with each transfer.', show: ['b.2', 'fl.funnel', 'fl.paper', 'fl.solid', 'fl.beaker', 'fl.filtrate'], focus: 'fl.solid' },
        { say: 'Fourth, the reactants may be impure. If a reactant is only ninety-five percent pure, the other five percent cannot form the product.', show: 'b.3', focus: 'fl' },
      ],
    },
    {
      chapter: 'A yield that is too high',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$. The theoretical yield is $4.85\\ \\text{g}$ of $\\ce{BaSO4}$, but $5.12\\ \\text{g}$ of precipitate is weighed straight off the filter paper.' },
        wet,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5.12}{4.85} \\times 100\\% = \\bad{105.6\\%}'] },
      ],
      lines: [
        { say: 'A percent yield can also come out above one hundred percent. That never means the reaction made extra product, because mass is conserved.' },
        { say: 'Barium chloride reacts with excess sodium sulfate. The theoretical yield is four point eight five grams of barium sulfate, but a student weighs five point one two grams of precipitate, straight off the filter paper.', show: ['q', 'y.theo', 'y.full'] },
        { say: 'Five point one two over four point eight five, times one hundred percent, is one hundred five point six percent.', show: ['m', 'y.actual', 'y.extra'], focus: 'm' },
        { say: 'No reaction can make more than its theoretical yield, so something else was weighed. Most likely, the precipitate was still wet, and water was weighed with it. Impurities in the solid would also add mass.', focus: 'y.extra' },
      ],
    },
    {
      chapter: 'Dry to a constant mass',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Dry to a constant mass', md: 'Dry a precipitate, weigh it, dry it again and weigh it again. When two weighings agree, the water is gone, and the mass is the actual yield.' }],
      lines: [
        { say: 'To avoid this, dry the precipitate, weigh it, dry it again, and weigh it again.', show: 'tip' },
        { say: 'When two weighings agree, the water is gone, and the mass is the actual yield.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student filters, dries and weighs a precipitate, and calculates a percent yield of $108\\%$. Which is the most likely explanation?',
          choices: ['Some precipitate stuck to the filter paper.', 'The reaction did not go to completion.', 'The precipitate was still wet when it was weighed.', 'The reaction made more product than the theoretical yield.'],
          answer: 2,
          working: 'A yield above $100\\%$ means something else was weighed with the product, most often water. Choices A and B would make the yield lower, and no reaction makes more than its theoretical yield, because mass is conserved.',
        },
      ],
      lines: [
        { say: 'Your turn. A student filters, dries and weighs a precipitate, and calculates a percent yield of one hundred eight percent. Which is the most likely explanation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. A yield above one hundred percent means something else was weighed with the product, most often water. Choices A and B are real losses, which make the yield lower, not higher. And choice D is impossible, because mass is conserved.', show: 'q.answer' },
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
          items: ['The actual yield is usually lower: an incomplete reaction, side reactions, losses while collecting, and impure reactants.', 'A yield **above 100%** means an error: most often a product that is still wet or impure.', 'Dry the product to a **constant mass** before you weigh it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The actual yield is usually lower, because of an incomplete reaction, side reactions, losses while collecting, and impure reactants.', show: 'sum.0' },
        { say: 'A yield above one hundred percent means an error, most often a product that is still wet or impure.', show: 'sum.1' },
        { say: 'So dry the product to a constant mass before you weigh it. In part three, you will find the theoretical yield yourself, from the mass of reactant used. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
