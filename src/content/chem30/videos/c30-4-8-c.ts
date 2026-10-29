import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ACETIC_CURVE, AMMONIA_CURVE, HCL_CURVE, titrationGraph } from './lib/c30-4b-figures.ts';

const EQ = '\\begin{gathered}\\text{equivalence}\\\\\\text{point}\\end{gathered}';

// 25.00 mL of 0.100 mol/L hydrochloric acid (grey) and acetic acid (coloured), each titrated with
// 0.100 mol/L sodium hydroxide, with the acetic acid's equivalence and half-equivalence points.
const both = figure(
  'g',
  [
    titrationGraph({
      titrant: 'NaOH',
      curves: [
        { id: 'hcl', points: HCL_CURVE, tone: 'muted' },
        { id: 'ac', points: ACETIC_CURVE },
      ],
      points: [
        { id: 'eq', x: 25, y: 8.72, tex: EQ, place: 'right' },
        { id: 'half', x: 12.5, y: 4.75, tex: '\\text{halfway}', place: 'below' },
      ],
    }),
  ],
);

// 25.00 mL of 0.100 mol/L ammonia titrated with 0.100 mol/L hydrochloric acid.
const base = figure('g', [titrationGraph({ titrant: 'HCl', curves: [{ id: 'nh3', points: AMMONIA_CURVE }], points: [{ id: 'eq', x: 25, y: 5.28, tex: EQ, place: 'right' }] })]);

// The acetic acid curve read off: the equivalence point at 25.0 mL and the pH halfway, at 12.5 mL.
const read = figure(
  'g',
  [
    titrationGraph({
      titrant: 'NaOH',
      curves: [{ id: 'ac', points: ACETIC_CURVE }],
      guides: [
        { id: 'eq-guide', x: 25, y: 8.72 },
        { id: 'half-guide', x: 12.5, y: 4.75, tone: 'good' },
      ],
      points: [
        { id: 'eq', x: 25, y: 8.72, tex: '25.0\\ \\text{mL}', place: 'right' },
        { id: 'half', x: 12.5, y: 4.75, tex: '4.75', place: 'above left', tone: 'good' },
      ],
    }),
  ],
);

const video: Explainer = {
  id: 'c30-4-8-c',
  lessonId: 'c30-4-8',
  title: 'Buffers and Titration Curves, Part 3: Reading Titration Curves',
  thumbnailTitle: 'Reading Titration Curves',
  thumbnail: 'g',
  summary:
    'A titration curve plots pH against the volume of titrant added, and the equivalence point is the middle of its steep part. Hydrochloric acid titrated with sodium hydroxide starts at pH 1.00 and has its equivalence point at pH 7.00; acetic acid starts at 2.88, rises through a buffer region with pH = pKa halfway, and has its equivalence point at 8.72. A weak base titrated with a strong acid has its equivalence point below 7. From the curve, 25.0 mL of 0.100 mol/L NaOH gives the acid’s concentration, 0.100 mol/L, and the pH halfway gives Ka = 1.8 × 10⁻⁵.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Reading Titration Curves', subtitle: 'Strong and weak acids, and a weak base' }],
      lines: [
        { say: 'In a titration, a p H meter can record the p H as the titrant is added.', caption: 'In a titration, a pH meter can record the pH as the titrant is added.', show: 'title' },
        { say: 'This part reads the titration curves of strong and weak acids, and of a weak base.' },
      ],
    },
    {
      chapter: 'A titration curve',
      layout: 'split',
      leftWidth: 600,
      left: [both],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Equivalence point',
          md: 'The point where the titrant added has reacted exactly with the sample, in the mole ratio of the balanced equation: the **middle of the steep part** of the curve.',
        },
      ],
      lines: [
        {
          say: 'A titration curve plots p H against the volume of titrant added. Here, twenty-five millilitres of zero point one zero zero moles per litre hydrochloric acid meets sodium hydroxide of the same concentration.',
          caption: 'A titration curve plots pH against the volume of titrant added. Here, 25.00 mL of 0.100 mol/L hydrochloric acid meets sodium hydroxide of the same concentration.',
          show: ['g.grid', 'g.axes', 'g.hcl'],
        },
        { say: 'The p H starts at one point zero zero and rises slowly. Near twenty-five millilitres, it shoots up.', caption: 'The pH starts at 1.00 and rises slowly. Near 25 mL, it shoots up.' },
        {
          say: 'The equivalence point, where the titrant has exactly reacted with the sample, is the middle of the steep part: here, p H seven, with only water and sodium chloride.',
          caption: 'The equivalence point, where the titrant has exactly reacted with the sample, is the middle of the steep part: here, pH 7, with only water and sodium chloride.',
          show: 'def',
        },
      ],
    },
    {
      chapter: 'A weak acid',
      layout: 'split',
      leftWidth: 600,
      left: [both],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'HCl', 'Acetic acid'],
          rows: [
            ['Starting pH', '1.00', '2.88'],
            ['Halfway', '', '$\\text{p}K_a = 4.74$'],
            ['Equivalence pH', '7.00', '8.72'],
          ],
        },
      ],
      lines: [
        {
          say: 'Now acetic acid, at the same concentration. It starts higher, at p H two point eight eight, because a weak acid ionises only partly.',
          caption: 'Now acetic acid, at the same concentration. It starts higher, at pH 2.88, because a weak acid ionises only partly.',
          show: ['g.grid', 'g.axes', 'g.hcl', 'g.ac', 't.0'],
          focus: 't.0',
        },
        { say: 'Then comes a gentle buffer region: the mixture of acetic acid and acetate ions is a buffer.' },
        {
          say: 'Halfway to the equivalence point, at twelve point five millilitres, the acid and its conjugate base are equal, so the p H equals the p K A, four point seven four.',
          caption: 'Halfway to the equivalence point, at 12.5 mL, the acid and its conjugate base are equal, so the pH equals the pKa, 4.74.',
          show: ['g.half', 't.1'],
          focus: ['g.half', 't.1'],
        },
        {
          say: 'At the equivalence point, the p H is eight point seven two, above seven, because the acetate ions formed are a weak base.',
          caption: 'At the equivalence point, the pH is 8.72, above 7, because the acetate ions formed are a weak base.',
          show: ['g.eq', 't.2'],
          focus: ['g.eq', 't.2'],
        },
      ],
    },
    {
      chapter: 'A weak base',
      layout: 'split',
      leftWidth: 600,
      left: [base],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$0.100\\ \\text{mol/L}$ ammonia, titrated with $0.100\\ \\text{mol/L}$ hydrochloric acid', 'Starts near pH 11.1, then a buffer region', 'Equivalence point near pH 5.3, **below 7**: $\\ce{NH4+}$ is a weak acid'],
        },
      ],
      lines: [
        {
          say: 'A weak base titrated with a strong acid gives the mirror image. Zero point one zero zero moles per litre ammonia starts near p H eleven point one, and falls through a buffer region.',
          caption: 'A weak base titrated with a strong acid gives the mirror image. 0.100 mol/L ammonia starts near pH 11.1, and falls through a buffer region.',
          show: ['g.grid', 'g.axes', 'g.nh3', 'b.0', 'b.1'],
        },
        {
          say: 'Its equivalence point is near p H five point three, below seven, because the ammonium ions formed are a weak acid.',
          caption: 'Its equivalence point is near pH 5.3, below 7, because the ammonium ions formed are a weak acid.',
          show: ['g.eq', 'b.2'],
          focus: 'g.eq',
        },
      ],
    },
    {
      chapter: 'Reading the curve',
      layout: 'split',
      leftWidth: 520,
      left: [read],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            'n(\\ce{NaOH}) = 0.100 \\times 0.0250',
            '= 0.00250\\ \\text{mol}',
            'c = \\dfrac{0.00250\\ \\text{mol}}{0.02500\\ \\text{L}} = \\good{0.100\\ \\text{mol/L}}',
            'K_a = 10^{-4.75} = \\good{1.8 \\times 10^{-5}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now read the acetic acid curve. The steep part is centred on twenty-five point zero millilitres, at about p H eight point seven.',
          caption: 'Now read the acetic acid curve. The steep part is centred on 25.0 mL, at about pH 8.7.',
          show: ['g.grid', 'g.axes', 'g.ac', 'g.eq-guide', 'g.eq'],
        },
        {
          say: 'There, zero point zero zero two five zero moles of sodium hydroxide has reacted, the same as the moles of acetic acid.',
          caption: 'There, 0.00250 mol of sodium hydroxide has reacted, the same as the moles of acetic acid.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        {
          say: 'Over twenty-five millilitres of acid, that is zero point one zero zero moles per litre.',
          caption: 'Over 25.00 mL of acid, that is 0.100 mol/L.',
          show: 'm.2',
          focus: 'm.2',
        },
        {
          say: 'Halfway, at twelve point five millilitres, the graph reads four point seven five. So K A is ten to the minus four point seven five: one point eight times ten to the minus five.',
          caption: 'Halfway, at 12.5 mL, the graph reads 4.75. So Ka is 10 to the −4.75: 1.8 × 10⁻⁵.',
          show: ['g.half-guide', 'g.half', 'm.3'],
          focus: ['g.half', 'm.3'],
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
            '$25.00\\ \\text{mL}$ of acetic acid is titrated with $0.150\\ \\text{mol/L}$ sodium hydroxide. The steep part of the curve is centred on $20.0\\ \\text{mL}$. One mole of $\\ce{NaOH}$ reacts with one mole of $\\ce{CH3COOH}$. What is the concentration of the acetic acid?',
          choices: ['$0.188\\ \\text{mol/L}$', '$0.00300\\ \\text{mol/L}$', '$0.150\\ \\text{mol/L}$', '$0.120\\ \\text{mol/L}$'],
          answer: 3,
          working: '$n(\\ce{NaOH}) = 0.150 \\times 0.0200 = 0.00300\\ \\text{mol} = n(\\ce{CH3COOH})$, so $c = \\dfrac{0.00300}{0.02500} = 0.120\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Acetic acid is titrated with sodium hydroxide, and the equivalence point is at twenty point zero millilitres. What is the acid’s concentration? Pause the video and try it.',
          caption: 'Your turn. Acetic acid is titrated with sodium hydroxide, and the equivalence point is at 20.0 mL. What is the acid’s concentration? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, zero point one two zero moles per litre: zero point zero zero three zero zero moles, over zero point zero two five zero zero litres. Choice A divides the volumes the wrong way round.',
          caption: 'The answer is D, 0.120 mol/L: 0.00300 mol, over 0.02500 L. Choice A divides the volumes the wrong way round.',
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
            'A titration curve plots pH against the volume of titrant; the **equivalence point** is the middle of the steep part.',
            'Strong acid and strong base: equivalence at pH 7.',
            'Weak acid: a higher start, a buffer region, $\\text{pH} = \\text{p}K_a$ halfway, and equivalence above 7. Weak base: equivalence below 7.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a titration curve, the equivalence point is the middle of the steep part.', show: 'sum.0' },
        { say: 'A strong acid and a strong base have their equivalence point at p H seven.', caption: 'A strong acid and a strong base have their equivalence point at pH 7.', show: 'sum.1' },
        {
          say: 'A weak acid starts higher, has a buffer region, and has its equivalence point above seven; a weak base, below seven. In part four, you will choose indicators. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
