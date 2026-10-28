import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, balls, pair, tag, water } from './lib/c10-5-figures.ts';

// Hydrogen burning, as particles: two hydrogen molecules and one oxygen molecule make two water molecules.
const burning = figure(
  'r',
  [
    balls({
      scale: 1.4,
      balls: [
        ...pair('h2a', 'H', 'H', [0, 0], { gap: 0.95, group: 'h2' }),
        ...pair('h2b', 'H', 'H', [2.4, 0], { gap: 0.95, group: 'h2' }),
        ...pair('o2', 'O', 'O', [5.7, 0], { gap: 1.15, group: 'o2' }),
        ...water('w1', [10.2, 0.3], 1.4, 'h2o'),
        ...water('w2', [13.2, 0.3], 1.4, 'h2o'),
      ],
    }),
    tag('plus', [4.0, 0], '+', { group: 'o2' }),
    arrow('arrow', [7.5, 0], [8.8, 0], { group: 'h2o' }),
    tag('h2-name', [1.2, -1.0], '2\\,\\ce{H2}', { place: 'below', tone: 'theta', group: 'h2' }),
    tag('o2-name', [5.7, -1.0], '\\ce{O2}', { place: 'below', tone: 'theta', group: 'o2' }),
    tag('h2o-name', [11.7, -1.0], '2\\,\\ce{H2O}', { place: 'below', tone: 'theta', group: 'h2o' }),
  ],
  290,
);

const video: Explainer = {
  id: 'c10-5-2-c',
  lessonId: 'c10-5-2',
  title: 'Moles, Mass and Particles, Part 3: Mole Ratios',
  thumbnailTitle: 'Mole Ratios',
  thumbnail: 'r',
  summary:
    'The coefficients of a balanced equation count particles, so they also count moles: in 2H₂ + O₂ → 2H₂O, 2 mol of hydrogen react with 1 mol of oxygen to make 2 mol of water. To find the moles of one substance from another, multiply by the ratio of their coefficients, with the substance you want on top. The ratio compares moles, not grams.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 3', title: 'Mole Ratios', subtitle: 'Reading a balanced equation in moles' }],
      lines: [
        { say: 'A balanced equation works like a recipe. It says how many particles of each substance react, and how many form.', show: 'title' },
        { say: 'In this part, you will read an equation in moles, and use its mole ratio to find the moles of another substance.' },
      ],
    },
    {
      chapter: 'Coefficients count moles',
      layout: 'center',
      main: [
        burning,
        {
          kind: 'table',
          id: 't',
          head: ['', '$\\ce{H2}$', '$\\ce{O2}$', '$\\ce{H2O}$'],
          rows: [
            ['molecules', '$2$', '$1$', '$2$'],
            ['moles', '$2\\ \\text{mol}$', '$1\\ \\text{mol}$', '$2\\ \\text{mol}$'],
          ],
        },
      ],
      lines: [
        { say: 'In lesson four point two, you balanced equations with coefficients: the big numbers in front of the formulas.' },
        { say: 'Here is hydrogen burning. Two H two, plus O two, gives two H two O.', caption: 'Here is hydrogen burning. 2H₂ + O₂ gives 2H₂O.', show: ['r.h2', 'r.o2', 'r.h2o'] },
        { say: 'It says that two molecules of hydrogen react with one molecule of oxygen, to make two molecules of water.', show: 't.0', focus: 't.0' },
        { say: 'Multiply every number by Avogadro’s number, and it says the same thing in moles. Two moles of hydrogen react with one mole of oxygen, to make two moles of water.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'The mole ratio',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mole ratio', md: 'The **mole ratio** of two substances in a reaction is the ratio of their coefficients in the balanced equation. In $\\ce{2H2 + O2 -> 2H2O}$, the mole ratio of $\\ce{H2}$ to $\\ce{O2}$ is $2 : 1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\text{wanted}) = n(\\text{given}) \\times \\dfrac{\\text{coefficient of wanted}}{\\text{coefficient of given}}'] },
      ],
      lines: [
        { say: 'The mole ratio of two substances is the ratio of their coefficients in the balanced equation. Here, the mole ratio of hydrogen to oxygen is two to one.', show: 'def' },
        { say: 'To find the moles of one substance from the moles of another, multiply by the ratio of their coefficients, with the substance you want on top.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Making ammonia',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Nitrogen and hydrogen react to make ammonia: $\\ce{N2 + 3H2 -> 2NH3}$. How many moles of $\\ce{NH3}$ form from $6\\ \\text{mol}$ of $\\ce{H2}$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2} : \\ce{NH3} = 3 : 2', 'n(\\ce{NH3}) = 6 \\times \\dfrac{2}{3} = \\good{4\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'Nitrogen and hydrogen react to make ammonia. N two, plus three H two, gives two N H three. How many moles of ammonia form from six moles of hydrogen?', caption: 'Nitrogen and hydrogen react to make ammonia. N₂ + 3H₂ gives 2NH₃. How many moles of ammonia form from six moles of hydrogen?', show: 'q' },
        { say: 'The coefficients give the mole ratio of hydrogen to ammonia: three to two.', show: 'm.0', focus: 'm.0' },
        { say: 'We want ammonia, so its coefficient, two, goes on top. Six times two thirds is four moles of ammonia.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Burning magnesium',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Magnesium burns in oxygen: $\\ce{2Mg + O2 -> 2MgO}$. How many moles of $\\ce{O2}$ react with $0.36\\ \\text{mol}$ of $\\ce{Mg}$? Give the answer to the nearest hundredth.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Mg} : \\ce{O2} = 2 : 1', 'n(\\ce{O2}) = 0.36 \\times \\dfrac{1}{2} = \\good{0.18\\ \\text{mol}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Ratios are in moles, not grams', md: 'The coefficients compare **moles**: 2 g of magnesium do not react with 1 g of oxygen. And balance the equation first.' },
      ],
      lines: [
        { say: 'Magnesium burns in oxygen. Two M G, plus O two, gives two M G O. How many moles of oxygen react with zero point three six moles of magnesium?', caption: 'Magnesium burns in oxygen. 2Mg + O₂ gives 2MgO. How many moles of oxygen react with 0.36 mol of magnesium?', show: 'q' },
        { say: 'No number in front of O two means one. So the mole ratio of magnesium to oxygen is two to one.', caption: 'No number in front of O₂ means one. So the mole ratio of magnesium to oxygen is two to one.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen is wanted, so its coefficient goes on top. Zero point three six times one half is zero point one eight moles.', show: 'm.1', focus: 'm.1' },
        { say: 'Remember that the coefficients compare moles, not grams. And they are a mole ratio only once the equation is balanced.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Methane burns in oxygen: $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$. How many moles of $\\ce{O2}$ react with $3\\ \\text{mol}$ of $\\ce{CH4}$?',
          choices: ['$1.5\\ \\text{mol}$', '$3\\ \\text{mol}$', '$5\\ \\text{mol}$', '$6\\ \\text{mol}$'],
          answer: 3,
          working: 'The mole ratio $\\ce{CH4} : \\ce{O2}$ is $1 : 2$, so $n(\\ce{O2}) = 3 \\times \\dfrac{2}{1} = 6\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Methane burns in oxygen: C H four, plus two O two, gives C O two plus two H two O. How many moles of oxygen react with three moles of methane? Pause the video and try it.', caption: 'Your turn. Methane burns in oxygen: CH₄ + 2O₂ gives CO₂ + 2H₂O. How many moles of oxygen react with three moles of methane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six moles. The mole ratio of methane to oxygen is one to two, so three times two over one is six. Choice A puts the ratio upside down.', show: 'q.answer' },
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
            'The coefficients of a balanced equation count moles as well as particles.',
            'The **mole ratio** is the ratio of the coefficients: in $\\ce{2H2 + O2 -> 2H2O}$, $\\ce{H2} : \\ce{O2} = 2 : 1$.',
            '$n(\\text{wanted}) = n(\\text{given}) \\times \\dfrac{\\text{coefficient of wanted}}{\\text{coefficient of given}}$',
            'The ratio compares moles, not grams, and only in a balanced equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The coefficients of a balanced equation count moles, as well as particles.', show: 'sum.0' },
        { say: 'The mole ratio of two substances is the ratio of their coefficients.', show: 'sum.1' },
        { say: 'To find the moles you want, multiply the moles you are given by the ratio, with the substance you want on top.', show: 'sum.2' },
        { say: 'The ratio compares moles, not grams. In part four, you will go from the mass of one substance to the mass of another. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
