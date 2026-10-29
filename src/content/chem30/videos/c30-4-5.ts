import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { LADDER_ROWS, ladder } from './lib/c30-4b-figures.ts';

// The table of relative acid strengths, with the arrows down its sides and the cells marked in
// the scene on its two ends.
const table = figure(
  'lad',
  [
    ladder({
      ka: true,
      arrows: true,
      marks: [
        { id: 'm-hcl', row: 'hcl', col: 'acid' },
        { id: 'm-hno3', row: 'hno3', col: 'acid' },
        { id: 'm-h3o', row: 'h3o', col: 'acid', tone: 'good' },
        { id: 'm-cl', row: 'hcl', col: 'base', tone: 'muted' },
        { id: 'm-no3', row: 'hno3', col: 'base', tone: 'muted' },
        { id: 'm-oh', row: 'h2o', col: 'base', tone: 'adj' },
      ],
    }),
  ],
  520,
);

// Part of the table for the worked example: four bases, the Ka of their acids, and the strongest base.
const compare = figure(
  'lad',
  [
    ladder({
      ka: true,
      rows: LADDER_ROWS.filter((r) => !['hno3', 'nh4'].includes(r.id)),
      marks: [
        { id: 'b-f', row: 'hf', col: 'base' },
        { id: 'b-ac', row: 'hac', col: 'base' },
        { id: 'b-hco3', row: 'h2co3', col: 'base' },
        { id: 'b-cn', row: 'hcn', col: 'base' },
        { id: 'k-f', row: 'hf', col: 'ka' },
        { id: 'k-ac', row: 'hac', col: 'ka' },
        { id: 'k-hco3', row: 'h2co3', col: 'ka' },
        { id: 'k-cn', row: 'hcn', col: 'ka' },
        { id: 'best', row: 'hcn', col: 'base', tone: 'good' },
        { id: 'worst', row: 'hf', col: 'base', tone: 'bad' },
      ],
    }),
  ],
  470,
);

const video: Explainer = {
  id: 'c30-4-5',
  lessonId: 'c30-4-5',
  title: 'Predicting Acid–Base Reactions, Part 1: Reading the Table',
  thumbnailTitle: 'Reading the Table',
  thumbnail: false,
  summary:
    'A table of relative acid strengths lists acids from strongest to weakest, each beside its conjugate base and its Ka: acids get weaker going down the left column, and bases get stronger going down the right column, because the stronger an acid, the weaker its conjugate base. The hydronium ion is the strongest acid and the hydroxide ion the strongest base that can exist in water, and the strongest base in a list is the conjugate base of the weakest acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'Reading the Table', subtitle: 'Which acids and bases are strongest?' }],
      lines: [
        { say: 'Vinegar poured onto baking soda fizzes. Vinegar poured onto table salt does nothing at all.', show: 'title' },
        { say: 'Both are sodium compounds. The difference is how strongly each anion holds on to a proton.' },
        {
          say: 'In this lesson, you will predict acid–base reactions with a table of relative acid strengths. This part reads the table. Parts two and three find the strongest acid and base in a mixture, and predict their reaction.',
        },
      ],
    },
    {
      chapter: 'A table of acid strengths',
      layout: 'center',
      main: [table],
      lines: [
        {
          say: 'Every acid has a conjugate base. A table of relative acid strengths lists acids in order, strongest first, each beside its conjugate base.',
          show: ['lad.head', 'lad.rows'],
        },
        {
          say: 'The last column is the acid ionisation constant, K A, which you will meet in lesson four point six. For now, a larger K A means a stronger acid.',
          caption: 'The last column is the acid ionisation constant, Ka, which you will meet in lesson 4.6. For now, a larger Ka means a stronger acid.',
          focus: 'lad.h-ka',
        },
        {
          say: 'Acids get weaker going down the left column. Hydrochloric acid gives up its proton most readily; water hardly gives one up at all.',
          show: 'lad.up',
          focus: ['lad.up', 'lad.hcl-acid', 'lad.h2o-acid'],
        },
        {
          say: 'Bases get stronger going down the right column. The chloride ion hardly holds a proton; the hydroxide ion takes one readily.',
          show: 'lad.down',
          focus: ['lad.down', 'lad.hcl-base', 'lad.h2o-base'],
        },
        { say: 'So the stronger an acid, the weaker its conjugate base. An acid that gives its proton away easily leaves a base that does not want it back.', focus: ['lad.up', 'lad.down'] },
      ],
    },
    {
      chapter: 'The two ends',
      layout: 'center',
      main: [table],
      lines: [
        {
          say: 'The strong acids at the top ionise completely in water, so in a solution they are present as hydronium ions, H three O plus.',
          caption: 'The strong acids at the top ionise completely in water, so in a solution they are present as hydronium ions, H₃O⁺.',
          show: ['lad.head', 'lad.rows', 'lad.up', 'lad.down', 'lad.m-hcl', 'lad.m-hno3'],
        },
        { say: 'That makes the hydronium ion the strongest acid that can exist in water.', show: 'lad.m-h3o', focus: 'lad.h3o-acid' },
        {
          say: 'Their conjugate bases, such as the chloride and nitrate ions, are so weak that they take no part in acid–base reactions.',
          show: ['lad.m-cl', 'lad.m-no3'],
          focus: ['lad.hcl-base', 'lad.hno3-base'],
        },
        { say: 'At the bottom, the hydroxide ion is the strongest base that can exist in water.', show: 'lad.m-oh', focus: 'lad.h2o-base' },
      ],
    },
    {
      chapter: 'Comparing strengths',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which is the strongest base: $\\ce{F-}$, $\\ce{CN-}$, $\\ce{CH3COO-}$ or $\\ce{HCO3-}$?' }, compare],
      lines: [
        {
          say: 'Which is the strongest base: the fluoride, cyanide, acetate or hydrogen carbonate ion?',
          caption: 'Which is the strongest base: F⁻, CN⁻, CH₃COO⁻ or HCO₃⁻?',
          show: ['q', 'lad.head', 'lad.rows', 'lad.b-f', 'lad.b-ac', 'lad.b-hco3', 'lad.b-cn'],
        },
        { say: 'The strongest base is the lowest in the right column: the conjugate base of the weakest acid.' },
        {
          say: 'Their acids have K A values from six point six times ten to the minus four down to six point two times ten to the minus ten.',
          caption: 'Their acids have Ka values from 6.6 × 10⁻⁴ (HF) down to 6.2 × 10⁻¹⁰ (HCN).',
          show: ['lad.k-f', 'lad.k-ac', 'lad.k-hco3', 'lad.k-cn'],
        },
        {
          say: 'The smallest belongs to hydrocyanic acid, so the cyanide ion is the strongest base.',
          show: 'lad.best',
          focus: ['lad.hcn-ka', 'lad.hcn-base'],
        },
        {
          say: 'Careful: the base beside the largest K A, the fluoride ion, is the weakest base.',
          caption: 'Careful: the base beside the largest Ka, the fluoride ion, is the weakest base.',
          show: 'lad.worst',
          focus: ['lad.hf-ka', 'lad.hf-base'],
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
            'Use these $K_a$ values at $25^\\circ\\text{C}$: $\\ce{HNO2}$, $5.6 \\times 10^{-4}$; $\\ce{CH3COOH}$, $1.8 \\times 10^{-5}$; $\\ce{HClO}$, $4.0 \\times 10^{-8}$; $\\ce{NH4+}$, $5.6 \\times 10^{-10}$. Which of their conjugate bases is the **weakest** base?',
          choices: ['$\\ce{NH3}$', '$\\ce{ClO-}$', '$\\ce{NO2-}$', '$\\ce{CH3COO-}$'],
          answer: 2,
          working: 'The weakest base is the conjugate base of the strongest acid, the one with the largest $K_a$: $\\ce{HNO2}$, with $K_a = 5.6 \\times 10^{-4}$. Its conjugate base is $\\ce{NO2-}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Using the K A values on the screen, which conjugate base is the weakest base? Pause the video and try it.',
          caption: 'Your turn. Using the Ka values on the screen, which conjugate base is the weakest base? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, the nitrite ion: the conjugate base of the strongest acid, nitrous acid. Choice A, ammonia, is the strongest base of the four.',
          caption: 'The answer is C, the nitrite ion, NO₂⁻: the conjugate base of the strongest acid, nitrous acid. Choice A, ammonia, is the strongest base of the four.',
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
            'Acids get **weaker** going down the left column. A larger $K_a$ means a stronger acid.',
            'Bases get **stronger** going down the right column: the stronger an acid, the weaker its conjugate base.',
            '$\\ce{H3O+}$ is the strongest acid, and $\\ce{OH-}$ the strongest base, that can exist in water.',
            'The strongest base is the conjugate base of the **weakest** acid.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. Acids get weaker going down the table, and a larger K A means a stronger acid.',
          caption: 'Let’s sum up. Acids get weaker going down the table, and a larger Ka means a stronger acid.',
          show: 'sum.0',
        },
        { say: 'Bases get stronger going down: the stronger an acid, the weaker its conjugate base.', show: 'sum.1' },
        { say: 'The hydronium ion and the hydroxide ion are the strongest acid and base that can exist in water.', show: 'sum.2' },
        { say: 'And the strongest base is the conjugate base of the weakest acid. In part two, you will find the strongest acid and base in a mixture. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
