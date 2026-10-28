import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker } from './lib/c20-3a-figures.ts';

// A well-stirred jug of sugar water and a cup poured from it: the cup holds less sugar, in less
// solution, at the same concentration.
const jugAndCup = figure(
  'j',
  [
    beaker({ name: 'jug', w: 4.4, h: 4.6, level: 3.8, label: '\\text{jug}', seed: 8, scatter: [{ id: 'p', count: 14, tone: 'theta', r: 0.22 }] }),
    arrow('pour', [5.0, 3.6], [6.0, 2.9], { tone: 'muted' }),
    beaker({ name: 'cup', at: [6.4, 0], w: 2.2, h: 2.8, level: 2.2, label: '\\text{cup}', seed: 3, scatter: [{ id: 'p', count: 4, tone: 'theta', r: 0.22 }] }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-3-3',
  lessonId: 'c20-3-3',
  title: 'Percent Concentration and Parts per Million, Part 1: Concentration and Percent by Mass per Volume',
  thumbnailTitle: 'Concentration and Percent (w/V)',
  thumbnail: 'j',
  summary:
    'The concentration of a solution is the amount of solute in a given quantity of solution. Percent by mass per volume, % (w/V), is grams of solute per 100 mL of solution: 18.4 g of sugar in 350 mL of solution is 5.26% (w/V), and 350 mL of a 6.2% (w/V) solution needs 21.7 g of solute.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Concentration and Percent (w/V)', subtitle: 'How much solute, in how much solution?' }],
      lines: [
        { say: 'Read the label on a bottle of vinegar or a bag of plant food, and you will usually find a percentage. A water-testing report gives parts per million instead.', show: 'title' },
        { say: 'Both answer the same question: how much of one substance is mixed into another? This first part explains concentration, and the percentage used most for solids in water.' },
      ],
    },
    {
      chapter: 'Concentration',
      layout: 'split',
      leftWidth: 560,
      left: [jugAndCup],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Concentration', md: 'The amount of solute in a given quantity of solution. A **concentrated** solution has a large amount; a **dilute** solution has a small amount.' },
        { kind: 'text', id: 'ratio', size: 'md', md: 'Every concentration is a **ratio**: an amount of solute divided by a quantity of solution.' },
      ],
      lines: [
        { say: 'Stir a spoonful of sugar into a cup of tea, and the tea tastes sweet. Stir it into a large jug of water, and you can hardly taste it.' },
        { say: 'The concentration of a solution is the amount of solute in a given quantity of solution: a lot in a concentrated solution, and a little in a dilute one.', show: 'def' },
        { say: 'A cup poured from a well-stirred jug has the same concentration as the jug: less solute, but in less solution. So every concentration is a ratio of solute to solution.', show: ['j', 'ratio'], focus: 'j' },
      ],
    },
    {
      chapter: 'Three percentages',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Concentration', 'Solute', 'Solution', 'Meaning'],
          rows: [
            ['percent by mass per volume, %\u00a0(w/V)', 'mass', 'volume', 'grams of solute per $100\\ \\text{mL}$ of solution'],
            ['percent by volume, %\u00a0(V/V)', 'volume', 'volume', 'millilitres of solute per $100\\ \\text{mL}$ of solution'],
            ['percent by mass, %\u00a0(w/w)', 'mass', 'mass', 'grams of solute per $100\\ \\text{g}$ of solution'],
          ],
        },
        { kind: 'text', id: 'names', size: 'md', align: 'center', md: 'Some books write % (m/V) for % (w/V), and % (m/m) for % (w/w). They mean the same thing.' },
      ],
      lines: [
        { say: 'Solutes and solutions can be measured by mass or by volume, so there are three percentages. The letter w stands for weight, meaning mass, and V for volume.' },
        { say: 'Percent by mass per volume, w over V, is grams of solute per one hundred millilitres of solution.', caption: 'Percent by mass per volume, % (w/V), is grams of solute per 100 mL of solution.', show: 't.0', focus: 't.0' },
        { say: 'Percent by volume, V over V, is millilitres of solute per one hundred millilitres of solution.', caption: 'Percent by volume, % (V/V), is millilitres of solute per 100 mL of solution.', show: 't.1', focus: 't.1' },
        { say: 'And percent by mass, w over w, is grams of solute per one hundred grams of solution. Some books write m instead of w.', caption: 'And percent by mass, % (w/w), is grams of solute per 100 g of solution. Some books write m instead of w.', show: ['t.2', 'names'], focus: 't.2' },
      ],
    },
    {
      chapter: 'A sugar solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent by mass per volume', md: '% (w/V) $= \\dfrac{\\text{mass of solute (g)}}{\\text{volume of solution (mL)}} \\times 100\\%$' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$18.4\\ \\text{g}$ of sugar is dissolved in water to make $350\\ \\text{mL}$ of solution. What is the concentration in % (w/V), to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{18.4\\ \\text{g}}{350\\ \\text{mL}} \\times 100\\% = 5.257\\%', '\\approx 5.26\\%\\ (\\text{w/V})'] },
      ],
      lines: [
        { say: 'For a solid dissolved in water, use percent by mass per volume: grams of solute, over millilitres of solution, times one hundred percent.', show: 'def' },
        { say: 'Eighteen point four grams of sugar is dissolved to make three hundred fifty millilitres of solution. What is the concentration, to the nearest hundredth?', show: 'q' },
        { say: 'Eighteen point four over three hundred fifty, times one hundred percent, is five point two five seven percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Rounded, five point two six percent, w over V: every one hundred millilitres holds five point two six grams of sugar.', caption: 'Rounded, 5.26% (w/V): every 100 mL holds 5.26 g of sugar.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Making a solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What mass of solute is needed to make $350\\ \\text{mL}$ of a 6.2% (w/V) solution, to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = \\dfrac{6.2\\ \\text{g}}{100\\ \\text{mL}} \\times 350\\ \\text{mL} = 21.7\\ \\text{g}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: '$350\\ \\text{mL}$ is $3.5$ lots of $100\\ \\text{mL}$, so the mass is $3.5 \\times 6.2\\ \\text{g}$: a little over $20\\ \\text{g}$.' },
      ],
      lines: [
        { say: 'You can also turn a percentage around. A six point two percent solution, w over V, has six point two grams of solute in every one hundred millilitres.', caption: 'You can also turn a percentage around. A 6.2% (w/V) solution has 6.2 g of solute in every 100 mL.' },
        { say: 'What mass of solute is needed to make three hundred fifty millilitres of it?', show: 'q' },
        { say: 'Scale up: six point two grams per one hundred millilitres, times three hundred fifty millilitres, is twenty-one point seven grams.', show: 'm', focus: 'm' },
        { say: 'Check: three and a half lots of one hundred millilitres must need a little over twenty grams. Estimates like this catch a misplaced decimal point.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$12.5\\ \\text{g}$ of glucose is dissolved in water to make $250\\ \\text{mL}$ of solution. What is the concentration in % (w/V)? Percent by mass per volume, % (w/V), is grams of solute per $100\\ \\text{mL}$ of solution.',
          choices: ['$0.050\\%$', '$20\\%$', '$31\\%$', '$5.0\\%$'],
          answer: 3,
          working: '$\\dfrac{12.5\\ \\text{g}}{250\\ \\text{mL}} \\times 100\\% = 5.0\\%$ (w/V).',
        },
      ],
      lines: [
        { say: 'Your turn. Twelve point five grams of glucose is dissolved to make two hundred fifty millilitres of solution. What is the concentration, as percent by mass per volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: twelve point five over two hundred fifty, times one hundred percent, is five point zero percent. Choice A forgets the hundred percent.', show: 'q.answer' },
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
            '**Concentration** is the amount of solute in a given quantity of solution: a ratio.',
            'Three percentages: % (w/V), % (V/V) and % (w/w).',
            '% (w/V) $= \\dfrac{\\text{mass of solute (g)}}{\\text{volume of solution (mL)}} \\times 100\\%$',
            'To make a solution, scale the grams per $100\\ \\text{mL}$ up to the volume you need.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Concentration is the amount of solute in a given quantity of solution.', show: 'sum.0' },
        { say: 'There are three percentages: by mass per volume, by volume, and by mass.', show: 'sum.1' },
        { say: 'Percent by mass per volume is grams of solute over millilitres of solution, times one hundred percent.', show: 'sum.2' },
        { say: 'And to make a solution, scale up to the volume you need. In part two, you will find the other two percentages. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
