import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { titrationCurve, type Band } from './lib/c20-4b-figures.ts';

const eqLabel = '\\begin{gathered}\\text{equivalence}\\\\ \\text{point}\\end{gathered}';

// The lesson's four indicators, each in its own colour.
const INDICATORS: Band[] = [
  { id: 'mo', lo: 3.2, hi: 4.4, tex: '\\text{methyl orange}', tone: 'opp', at: 3.6 },
  { id: 'mr', lo: 4.8, hi: 6.0, tex: '\\text{methyl red}', tone: 'bad', at: 5.4 },
  { id: 'btb', lo: 6.0, hi: 7.6, tex: '\\text{bromothymol blue}', tone: 'adj', at: 7.0 },
  { id: 'pp', lo: 8.2, hi: 10.0, tex: '\\text{phenolphthalein}', tone: 'hyp' },
];

// 25.00 mL of 0.100 mol/L hydrochloric acid titrated with 0.100 mol/L sodium hydroxide.
const strong = figure('g', [titrationCurve({ kind: 'sa-sb', titrant: 'NaOH' })], 560);
const reading = figure('g', [titrationCurve({ kind: 'sa-sb', titrant: 'NaOH', eq: { tex: eqLabel } })], 560);
const bands = figure('g', [titrationCurve({ kind: 'sa-sb', titrant: 'NaOH', eq: { tex: '' }, bands: INDICATORS })], 560);

const video: Explainer = {
  id: 'c20-4-8-c',
  lessonId: 'c20-4-8',
  title: 'Titration, Part 3: Titration Curves',
  thumbnailTitle: 'Titration Curves',
  thumbnail: 'g',
  summary:
    'A titration curve plots the pH against the volume of titrant added. For 25.00 mL of 0.100 mol/L hydrochloric acid titrated with 0.100 mol/L sodium hydroxide, the pH starts near 1, rises slowly, jumps from about 4 to 10 in two drops near 25.0 mL, and levels off near 12.5. The equivalence point is the middle of the steep part, here at 25.0 mL and pH 7, and the best indicator is the one whose colour-change range includes that pH: bromothymol blue.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Titration Curves', subtitle: 'Following the pH, drop by drop' }],
      lines: [
        { say: 'Instead of an indicator, a p H meter can follow a titration, drop by drop.', caption: 'Instead of an indicator, a pH meter can follow a titration, drop by drop.', show: 'title' },
        { say: 'In this part, you will read a titration curve, find the equivalence point, and choose an indicator.' },
      ],
    },
    {
      chapter: 'A strong acid and a strong base',
      layout: 'split',
      leftWidth: 640,
      left: [strong],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Starts** near pH 1.', '**Rises slowly**: each drop meets plenty of acid.', '**Shoots up** from pH 4 to 10 in two drops.', '**Levels off** near pH 12.5.'],
        },
      ],
      lines: [
        { say: 'A graph of the p H against the volume of titrant is a titration curve. This one is for twenty-five point zero zero millilitres of zero point one zero zero moles per litre hydrochloric acid, titrated with sodium hydroxide of the same concentration.', caption: 'A graph of the pH against the volume of titrant is a titration curve. This one is for 25.00 mL of 0.100 mol/L hydrochloric acid, titrated with 0.100 mol/L sodium hydroxide.', show: ['g.grid', 'g.axes'] },
        { say: 'The curve starts near p H one, the p H of a strong acid at this concentration.', caption: 'The curve starts near pH 1, the pH of a strong acid at this concentration.', show: 'b.0' },
        { say: 'For a long time the p H rises only slowly, because each drop of base meets plenty of acid.', caption: 'For a long time the pH rises only slowly, because each drop of base meets plenty of acid.', show: ['g.curve-a', 'b.1'] },
        { say: 'Close to the equivalence point, almost no acid is left, and the p H shoots up: from about four to about ten, in just two drops.', caption: 'Close to the equivalence point, almost no acid is left, and the pH shoots up: from about 4 to about 10, in just two drops.', show: ['g.curve-b', 'b.2'], focus: 'g.curve-b' },
        { say: 'After that, the base is in excess, and the curve levels off near p H twelve point five.', caption: 'After that, the base is in excess, and the curve levels off near pH 12.5.', show: ['g.curve-c', 'b.3'], focus: 'g' },
      ],
    },
    {
      chapter: 'Reading the equivalence point',
      layout: 'split',
      leftWidth: 520,
      left: [reading],
      right: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Equivalence point', md: 'The **middle of the steep part**. Read down for the volume, across for the pH.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n(\\ce{NaOH}) = 0.100 \\times 0.0250', '= 0.00250\\ \\text{mol} = n(\\ce{HCl})', 'c = \\dfrac{0.00250}{0.02500} = \\good{0.100\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'The equivalence point is in the middle of the steep, nearly vertical part of the curve. Read straight down to find the volume of titrant, and across to find the p H.', caption: 'The equivalence point is in the middle of the steep, nearly vertical part of the curve. Read straight down to find the volume of titrant, and across to find the pH.', show: ['g.grid', 'g.axes', 'g.curve', 'def'] },
        { say: 'Here it is at twenty-five point zero millilitres and p H seven. For a strong acid and a strong base, it is always at p H seven: the solution then holds only water and a neutral salt, sodium chloride.', caption: 'Here it is at 25.0 mL and pH 7. For a strong acid and a strong base, it is always at pH 7: the solution then holds only water and a neutral salt, sodium chloride.', show: 'g.eq', focus: 'g.eq' },
        { say: 'From the volume, find the acid’s concentration. Zero point one zero zero times zero point zero two five zero is zero point zero zero two five zero moles of base, and so of acid.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Over zero point zero two five zero zero litres, that is zero point one zero zero moles per litre, as expected.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Choosing an indicator',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Indicator', 'Colour change', 'pH range'],
          rows: [
            ['[[opp:methyl orange]]', 'red to yellow', '3.2 to 4.4'],
            ['[[bad:methyl red]]', 'red to yellow', '4.8 to 6.0'],
            ['[[adj:bromothymol blue]]', 'yellow to blue', '6.0 to 7.6'],
            ['[[hyp:phenolphthalein]]', 'colourless to pink', '8.2 to 10.0'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Choosing an indicator', md: 'Choose the indicator whose colour-change range **includes the pH at the equivalence point**.' },
      ],
      lines: [
        { say: 'An indicator changes colour over a range of about one or two p H units. Here are four of them.', caption: 'An indicator changes colour over a range of about one or two pH units. Here are four of them.', show: 't' },
        { say: 'For the endpoint to match the equivalence point, choose the indicator whose colour-change range includes the p H at the equivalence point.', caption: 'For the endpoint to match the equivalence point, choose the indicator whose colour-change range includes the pH at the equivalence point.', show: 'key' },
      ],
    },
    {
      chapter: 'Strong with strong',
      layout: 'center',
      main: [bands],
      lines: [
        { say: 'Here are the four ranges on the curve.', show: ['g.grid', 'g.axes', 'g.curve', 'g.mo', 'g.mr', 'g.btb', 'g.pp'] },
        { say: 'For a strong acid and a strong base, the equivalence point is at p H seven. So the best choice is bromothymol blue, which changes from yellow to blue between p H six point zero and seven point six.', caption: 'For a strong acid and a strong base, the equivalence point is at pH 7. So the best choice is bromothymol blue, which changes from yellow to blue between pH 6.0 and 7.6.', show: 'g.eq', focus: ['g.btb', 'g.eq'] },
        { say: 'The jump is so steep that it crosses several ranges within a drop of the equivalence point, but bromothymol blue is still the best choice.', focus: 'g.curve-b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The middle of the steep part of a titration curve is at about pH 5.3. Which indicator should be used? The colour-change ranges are: methyl orange, pH 3.2 to 4.4; methyl red, pH 4.8 to 6.0; bromothymol blue, pH 6.0 to 7.6; phenolphthalein, pH 8.2 to 10.0.',
          choices: ['Methyl orange', 'Bromothymol blue', 'Methyl red', 'Phenolphthalein'],
          answer: 2,
          working: 'The equivalence point is at about pH 5.3, which is inside the range of methyl red, pH 4.8 to 6.0.',
        },
      ],
      lines: [
        { say: 'Your turn. The middle of the steep part of a titration curve is at about p H five point three. Which indicator should be used? Pause the video and try it.', caption: 'Your turn. The middle of the steep part of a titration curve is at about pH 5.3. Which indicator should be used? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, methyl red. Its range, four point eight to six point zero, includes five point three. Choice B, bromothymol blue, changes colour from six point zero to seven point six, which misses it.', show: 'q.answer' },
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
          items: ['A **titration curve** plots pH against the volume of titrant.', 'The **equivalence point** is the middle of the steep part; for a strong acid and a strong base it is at pH 7.', 'Choose the indicator whose range **includes** the pH at the equivalence point.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A titration curve plots the p H against the volume of titrant.', caption: 'Let’s sum up. A titration curve plots the pH against the volume of titrant.', show: 'sum.0' },
        { say: 'The equivalence point is the middle of the steep part, at p H seven for a strong acid and a strong base.', caption: 'The equivalence point is the middle of the steep part, at pH 7 for a strong acid and a strong base.', show: 'sum.1' },
        { say: 'And choose the indicator whose range includes that p H. In part four, you will see how the curves change for weak acids and bases. See you there!', caption: 'And choose the indicator whose range includes that pH. In part four, you will see how the curves change for weak acids and bases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
