import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { titrationCurve } from './lib/c20-4b-figures.ts';

const eqLabel = '\\begin{gathered}\\text{equivalence}\\\\ \\text{point}\\end{gathered}';

// 25.00 mL of 0.100 mol/L acetic acid titrated with 0.100 mol/L sodium hydroxide, beside the
// hydrochloric acid curve in grey.
const weakAcid = figure('g', [titrationCurve({ kind: 'wa-sb', ref: 'sa-sb', titrant: 'NaOH', eq: { tex: eqLabel }, buffer: true })], 560);

// 25.00 mL of 0.100 mol/L ammonia titrated with 0.100 mol/L hydrochloric acid, beside the sodium
// hydroxide curve in grey.
const weakBase = figure('g', [titrationCurve({ kind: 'wb-sa', ref: 'sb-sa', titrant: 'HCl', eq: { tex: eqLabel } })], 560);

// The acetic acid curve with the ranges of bromothymol blue and phenolphthalein.
const choose = figure(
  'g',
  [
    titrationCurve({
      kind: 'wa-sb',
      titrant: 'NaOH',
      eq: { tex: '' },
      bands: [
        { id: 'btb', lo: 6.0, hi: 7.6, tex: '\\text{bromothymol blue}', tone: 'adj' },
        { id: 'pp', lo: 8.2, hi: 10.0, tex: '\\text{phenolphthalein}', tone: 'hyp' },
      ],
    }),
  ],
  560,
);

const video: Explainer = {
  id: 'c20-4-8-d',
  lessonId: 'c20-4-8',
  title: 'Titration, Part 4: Weak Acids and Weak Bases',
  thumbnailTitle: 'Weak Acids and Weak Bases',
  thumbnail: 'g',
  summary:
    'A weak acid titrated with a strong base starts near pH 2.9, rises gently through a buffer region, and has its equivalence point near pH 8.7, so phenolphthalein is the indicator to use. A base titrated with an acid gives the mirror image: equivalence at pH 7 for a strong base, and near pH 5.3 for a weak base such as ammonia, where methyl red is the indicator. To recognise a curve, read where it starts and where its equivalence point is.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Weak Acids and Weak Bases', subtitle: 'Reading the shape of a curve' }],
      lines: [
        { say: 'The acid in vinegar, acetic acid, is a weak acid. Titrate it, and its curve has a different shape from hydrochloric acid’s.', show: 'title' },
        { say: 'In this last part, you will compare the curves of strong and weak acids and bases, and choose an indicator for each.' },
      ],
    },
    {
      chapter: 'A weak acid',
      layout: 'split',
      leftWidth: 640,
      left: [weakAcid],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Starts higher**, near pH 2.9.', 'A gentle **buffer region**.', 'A **shorter** steep part, with the equivalence point near **pH 8.7**.', 'Afterwards, the **same** as the strong acid.'],
        },
      ],
      lines: [
        { say: 'Here is twenty-five point zero zero millilitres of zero point one zero zero moles per litre acetic acid, titrated with the same base. The hydrochloric acid curve is in grey.', show: ['g.grid', 'g.axes', 'g.ref'] },
        { say: 'It starts higher, near p H two point nine instead of one, because a weak acid ionises only partly, and makes fewer hydronium ions.', caption: 'It starts higher, near pH 2.9 instead of 1, because a weak acid ionises only partly, and makes fewer hydronium ions.', show: ['b.0', 'g.curve-a'] },
        { say: 'Then comes a gentle buffer region. Between about five and twenty millilitres, the mixture of acetic acid and acetate ions resists changes in p H.', caption: 'Then comes a gentle buffer region. Between about 5 and 20 mL, the mixture of acetic acid and acetate ions resists changes in pH.', show: ['b.1', 'g.buffer'], focus: 'g.buffer' },
        { say: 'The steep part is shorter, and the equivalence point is at about p H eight point seven, above seven. The solution then holds sodium acetate, and the acetate ions make it slightly basic.', caption: 'The steep part is shorter, and the equivalence point is at about pH 8.7, above 7. The solution then holds sodium acetate, and the acetate ions make it slightly basic.', show: ['b.2', 'g.curve-b', 'g.eq'], focus: 'g.eq' },
        { say: 'After that, the two curves are the same, because the excess sodium hydroxide decides the p H.', caption: 'After that, the two curves are the same, because the excess sodium hydroxide decides the pH.', show: ['b.3', 'g.curve-c'], focus: 'g' },
      ],
    },
    {
      chapter: 'Bases in the flask',
      layout: 'split',
      leftWidth: 640,
      left: [weakBase],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['The **mirror image**: it starts high and falls.', 'Strong base: starts near pH 13, equivalence at **pH 7**.', 'Weak base: starts near pH 11.1, equivalence near **pH 5.3**.'],
        },
      ],
      lines: [
        { say: 'A base in the flask, titrated with an acid, gives the mirror image: the curve starts high and falls.', show: ['g.grid', 'g.axes', 'b.0'] },
        { say: 'Here is ammonia, a weak base, titrated with hydrochloric acid, both at zero point one zero zero moles per litre. The strong base, sodium hydroxide, is in grey. It starts near p H thirteen, with its equivalence point at seven.', caption: 'Here is ammonia, a weak base, titrated with hydrochloric acid, both at 0.100 mol/L. The strong base, sodium hydroxide, is in grey. It starts near pH 13, with its equivalence point at 7.', show: ['g.ref', 'b.1'] },
        { say: 'The weak base starts lower, near eleven point one. Its equivalence point is at about p H five point three, below seven, because the ammonium chloride formed makes the solution slightly acidic.', caption: 'The weak base starts lower, near 11.1. Its equivalence point is at about pH 5.3, below 7, because the ammonium chloride formed makes the solution slightly acidic.', show: ['g.curve', 'g.eq', 'b.2'], focus: 'g.eq' },
      ],
    },
    {
      chapter: 'Four titrations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Titration', 'Starting pH', 'pH at the equivalence point'],
          rows: [
            ['A strong acid titrated with a strong base', 'about 1', '7'],
            ['A weak acid titrated with a strong base', 'about 2.9', 'about 8.7'],
            ['A strong base titrated with a strong acid', 'about 13', '7'],
            ['A weak base titrated with a strong acid', 'about 11.1', 'about 5.3'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Recognising a curve', md: 'Read **where it starts** (low for an acid, high for a base, closer to 7 when it is weak) and **where its equivalence point is**.' },
      ],
      lines: [
        { say: 'This table collects the four kinds of titration, with where each starts and where its equivalence point is.', show: 't' },
        { say: 'To recognise a curve, read those two things. A curve that starts near eleven, falls, and has its equivalence point near five point three is a weak base titrated with a strong acid.', caption: 'To recognise a curve, read those two things. A curve that starts near 11, falls, and has its equivalence point near 5.3 is a weak base titrated with a strong acid.', show: 'tip', focus: 't.3' },
      ],
    },
    {
      chapter: 'An indicator for vinegar',
      layout: 'center',
      main: [choose],
      lines: [
        { say: 'Which indicator suits acetic acid and sodium hydroxide? The equivalence point is at about p H eight point seven.', caption: 'Which indicator suits acetic acid and sodium hydroxide? The equivalence point is at about pH 8.7.', show: ['g.grid', 'g.axes', 'g.curve', 'g.eq'] },
        { say: 'Phenolphthalein changes colour from p H eight point two to ten point zero, which includes eight point seven. It is the one to use.', caption: 'Phenolphthalein changes colour from pH 8.2 to 10.0, which includes 8.7. It is the one to use.', show: 'g.pp', focus: 'g.pp' },
        { say: 'Bromothymol blue would change colour before the equivalence point, while some acid was still left.', show: 'g.btb', focus: 'g.btb' },
        { say: 'For a weak base, with its equivalence point near p H five point three, choose methyl red.', caption: 'For a weak base, with its equivalence point near pH 5.3, choose methyl red.', focus: 'g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A titration curve starts near pH 13 and falls as the titrant is added. The middle of its steep part is at pH 7. Which titration does it show?',
          choices: ['A strong acid titrated with a strong base', 'A strong base titrated with a strong acid', 'A weak acid titrated with a strong base', 'A weak base titrated with a strong acid'],
          answer: 1,
          working: 'It starts above 7 and falls, so a base is in the flask and an acid is added. It starts near pH 13 and its equivalence point is at pH 7, so the base is strong.',
        },
      ],
      lines: [
        { say: 'Your turn. A titration curve starts near p H thirteen and falls as the titrant is added. The middle of its steep part is at p H seven. Which titration does it show? Pause the video and try it.', caption: 'Your turn. A titration curve starts near pH 13 and falls as the titrant is added. The middle of its steep part is at pH 7. Which titration does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The curve starts high and falls, so a base is in the flask. It starts near thirteen, with its equivalence point at seven, so the base is strong. Choice D, a weak base, would start lower and end below seven.', show: 'q.answer' },
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
            'Weak acid with strong base: starts near pH 2.9, a **buffer region**, equivalence near **pH 8.7**: use phenolphthalein.',
            'Base in the flask: the **mirror image**. A weak base has its equivalence near **pH 5.3**: use methyl red.',
            'To recognise a curve, read **where it starts** and **where its equivalence point is**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A weak acid titrated with a strong base has a buffer region, and its equivalence point near p H eight point seven. Use phenolphthalein.', caption: 'Let’s sum up. A weak acid titrated with a strong base has a buffer region, and its equivalence point near pH 8.7. Use phenolphthalein.', show: 'sum.0' },
        { say: 'A base in the flask gives the mirror image, and a weak base needs methyl red.', show: 'sum.1' },
        { say: 'And to recognise a curve, read where it starts and where its equivalence point is. That completes this lesson on titration. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
