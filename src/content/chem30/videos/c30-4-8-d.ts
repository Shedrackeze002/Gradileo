import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { indicatorBands, PHOSPHORIC_CURVE, titrationGraph } from './lib/c30-4b-figures.ts';

// The colour-change ranges of the lesson's indicators, with the pH at the equivalence point of
// acetic acid with sodium hydroxide (8.7), hydrochloric acid with sodium hydroxide (7.0) and
// ammonia with hydrochloric acid (5.3).
const bands = figure(
  'ind',
  [
    indicatorBands({
      lines: [
        { id: 'wa', ph: 8.7, tex: '8.7' },
        { id: 'sa', ph: 7.0, tex: '7.0', tone: 'good' },
        { id: 'wb', ph: 5.3, tex: '5.3', tone: 'hyp' },
      ],
    }),
  ],
  420,
);

// 25.00 mL of phosphoric acid titrated with 0.100 mol/L sodium hydroxide: two steep rises.
const poly = figure(
  'g',
  [
    titrationGraph({
      titrant: 'NaOH',
      curves: [{ id: 'h3po4', points: PHOSPHORIC_CURVE }],
      points: [
        { id: 'first', x: 20, y: 4.72, tex: '\\text{first}', place: 'right' },
        { id: 'second', x: 40, y: 9.65, tex: '\\text{second}', place: 'left' },
      ],
    }),
  ],
);

const video: Explainer = {
  id: 'c30-4-8-d',
  lessonId: 'c30-4-8',
  title: 'Buffers and Titration Curves, Part 4: Indicators and Polyprotic Acids',
  thumbnailTitle: 'Indicators and Polyprotic Acids',
  thumbnail: false,
  summary:
    'An indicator changes colour over one and a half to two pH units around its own pKa, so choose the one whose range includes the pH at the equivalence point: phenolphthalein for acetic acid with sodium hydroxide (about 8.7), bromothymol blue for hydrochloric acid with sodium hydroxide (7.0) and methyl red for ammonia with hydrochloric acid (about 5.3). A polyprotic acid such as phosphoric acid gives its protons one at a time, with a steep rise for each; the first equivalence point, at 20.0 mL of 0.100 mol/L NaOH, shows that 25.00 mL of the acid is 0.0800 mol/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Indicators and Polyprotic Acids', subtitle: 'Matching the colour change to the curve' }],
      lines: [
        { say: 'In a classroom titration, there is often no p H meter. A few drops of indicator change colour instead.', caption: 'In a classroom titration, there is often no pH meter. A few drops of indicator change colour instead.', show: 'title' },
        { say: 'This part chooses indicators, and reads the curve of an acid with more than one proton.' },
      ],
    },
    {
      chapter: 'Choosing an indicator',
      layout: 'center',
      main: [{ kind: 'text', id: 'rule', size: 'md', align: 'center', md: 'Choose the indicator whose **range includes the pH at the equivalence point**.' }, bands],
      lines: [
        {
          say: 'An indicator is a weak acid whose conjugate base has a different colour. It changes colour over one and a half to two p H units, around its own p K A.',
          caption: 'An indicator is a weak acid whose conjugate base has a different colour. It changes colour over 1.5 to 2 pH units, around its own pKa.',
          show: ['ind.axis', 'ind.mo', 'ind.bcg', 'ind.mr', 'ind.btb', 'ind.pp', 'ind.ay'],
        },
        {
          say: 'For the colour change, the endpoint, to mark the equivalence point, choose the indicator whose range includes the p H at the equivalence point.',
          caption: 'For the colour change, the endpoint, to mark the equivalence point, choose the indicator whose range includes the pH at the equivalence point.',
          show: 'rule',
        },
      ],
    },
    {
      chapter: 'One for each titration',
      layout: 'center',
      main: [bands],
      lines: [
        {
          say: 'Acetic acid titrated with sodium hydroxide has its equivalence point near p H eight point seven. Phenolphthalein, eight point two to ten point zero, includes it.',
          caption: 'Acetic acid titrated with sodium hydroxide has its equivalence point near pH 8.7. Phenolphthalein, 8.2 to 10.0, includes it.',
          show: ['ind.axis', 'ind.mo', 'ind.bcg', 'ind.mr', 'ind.btb', 'ind.pp', 'ind.ay', 'ind.wa'],
          focus: ['ind.wa', 'ind.pp'],
        },
        {
          say: 'Hydrochloric acid with sodium hydroxide: p H seven point zero. Bromothymol blue, six point zero to seven point six.',
          caption: 'Hydrochloric acid with sodium hydroxide: pH 7.0. Bromothymol blue, 6.0 to 7.6.',
          show: 'ind.sa',
          focus: ['ind.sa', 'ind.btb'],
        },
        {
          say: 'Ammonia with hydrochloric acid: near p H five point three. Methyl red, four point eight to six point zero.',
          caption: 'Ammonia with hydrochloric acid: near pH 5.3. Methyl red, 4.8 to 6.0.',
          show: 'ind.wb',
          focus: ['ind.wb', 'ind.mr'],
        },
        {
          say: 'Phenolphthalein is not always right: for a weak base titrated with a strong acid, it changes colour long before the equivalence point.',
          focus: ['ind.wb', 'ind.pp'],
        },
      ],
    },
    {
      chapter: 'Polyprotic acids',
      layout: 'split',
      leftWidth: 500,
      left: [poly],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{H3PO4 + OH-}', '\\ce{-> H2PO4- + H2O}', '\\ce{H2PO4- + OH-}', '\\ce{-> HPO4^2- + H2O}'],
        },
        { kind: 'text', id: 'ka', size: 'md', md: '$K_a$: $6.9 \\times 10^{-3}$ for $\\ce{H3PO4}$, then $6.2 \\times 10^{-8}$ for $\\ce{H2PO4-}$.' },
      ],
      lines: [
        {
          say: 'A polyprotic acid gives its protons one at a time, each with its own K A. Phosphoric acid loses its first proton easily, and its second much less easily.',
          caption: 'A polyprotic acid gives its protons one at a time, each with its own Ka. Phosphoric acid loses its first proton easily, and its second much less easily.',
          show: ['m', 'ka'],
        },
        {
          say: 'So its curve has one steep rise for each proton removed. Here, phosphoric acid is titrated with zero point one zero zero moles per litre sodium hydroxide.',
          caption: 'So its curve has one steep rise for each proton removed. Here, 25.00 mL of phosphoric acid is titrated with 0.100 mol/L sodium hydroxide.',
          show: ['g.grid', 'g.axes', 'g.h3po4'],
        },
        {
          say: 'The first equivalence point is at twenty point zero millilitres, near p H four point seven. The second, near p H nine point seven, needs exactly as much base again: forty point zero millilitres.',
          caption: 'The first equivalence point is at 20.0 mL, near pH 4.7. The second, near pH 9.7, needs exactly as much base again: 40.0 mL.',
          show: ['g.first', 'g.second'],
          focus: ['g.first', 'g.second'],
        },
        { say: 'The third proton is so weakly acidic that it gives no clear rise.' },
      ],
    },
    {
      chapter: 'A polyprotic titration',
      layout: 'split',
      leftWidth: 500,
      left: [poly],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['n(\\ce{NaOH}) = 0.100 \\times 0.0200', '= 0.00200\\ \\text{mol} = n(\\ce{H3PO4})', 'c = \\dfrac{0.00200}{0.02500} = \\good{0.0800\\ \\text{mol/L}}'],
        },
        { kind: 'text', id: 'ind', size: 'md', md: 'First: bromocresol green (3.8 to 5.4). Second: phenolphthalein (8.2 to 10.0).' },
      ],
      lines: [
        {
          say: 'At the first equivalence point, one hydroxide ion has reacted with each acid molecule: zero point zero zero two zero zero moles of each.',
          caption: 'At the first equivalence point, one hydroxide ion has reacted with each acid molecule: 0.00200 mol of each.',
          show: ['g.grid', 'g.axes', 'g.h3po4', 'g.first', 'm.0', 'm.1'],
          focus: ['g.first', 'm.1'],
        },
        {
          say: 'Over twenty-five millilitres, the acid is zero point zero eight zero zero moles per litre.',
          caption: 'Over 25.00 mL, the acid is 0.0800 mol/L.',
          show: 'm.2',
          focus: 'm.2',
        },
        {
          say: 'For indicators: bromocresol green, three point eight to five point four, for the first equivalence point, and phenolphthalein for the second.',
          caption: 'For indicators: bromocresol green, 3.8 to 5.4, for the first equivalence point, and phenolphthalein for the second.',
          show: ['ind', 'g.second'],
          focus: ['g.first', 'g.second'],
        },
        {
          say: 'Sodium carbonate takes two protons in the same way: titrated with hydrochloric acid, it gives two steep drops, near p H eight point three and near four.',
          caption: 'Sodium carbonate takes two protons in the same way: titrated with hydrochloric acid, it gives two steep drops, near pH 8.3 and near 4.',
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
          prompt:
            'Hydrazine, a weak base, is titrated with hydrochloric acid. The middle of the steep drop is at pH 4.7. Which indicator should be used? Choose the one whose colour-change range includes the pH at the equivalence point.',
          choices: ['Methyl orange, 3.2 to 4.4', 'Phenolphthalein, 8.2 to 10.0', 'Bromocresol green, 3.8 to 5.4', 'Bromothymol blue, 6.0 to 7.6'],
          answer: 2,
          working: 'Bromocresol green changes colour from pH 3.8 to 5.4, which includes 4.7. Methyl orange stops at 4.4, and phenolphthalein would change colour long before the equivalence point.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Hydrazine, a weak base, is titrated with hydrochloric acid, and the equivalence point is at p H four point seven. Which indicator should be used? Pause the video and try it.',
          caption: 'Your turn. Hydrazine, a weak base, is titrated with hydrochloric acid, and the equivalence point is at pH 4.7. Which indicator should be used? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, bromocresol green: its range, three point eight to five point four, includes four point seven. Choice B, phenolphthalein, would change colour long before the equivalence point.',
          caption: 'The answer is C, bromocresol green: its range, 3.8 to 5.4, includes 4.7. Choice B, phenolphthalein, would change colour long before the equivalence point.',
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
            'Choose the indicator whose colour-change range includes the pH at the equivalence point.',
            'A **polyprotic acid** gives its protons one at a time, with one steep rise for each.',
            'The first equivalence point gives the moles of acid.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. Choose the indicator whose colour-change range includes the p H at the equivalence point.',
          caption: 'Let’s sum up. Choose the indicator whose colour-change range includes the pH at the equivalence point.',
          show: 'sum.0',
        },
        { say: 'A polyprotic acid gives its protons one at a time, with one steep rise for each, and the first equivalence point gives the moles of acid.', show: ['sum.1', 'sum.2'] },
        { say: 'That completes this lesson, and this unit on acid–base equilibrium.' },
      ],
    },
  ],
};

export default video;
