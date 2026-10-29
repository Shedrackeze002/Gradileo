import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { LADDER_ROWS, ladder } from './lib/c30-4b-figures.ts';

// Part of the table of relative acid strengths, with the three proton transfers of this part:
// acetic acid to the hydrogen carbonate ion (downhill), acetic acid to the fluoride ion (uphill),
// and the hydronium ion to the acetate ion (downhill).
const table = figure(
  'lad',
  [
    ladder({
      rows: LADDER_ROWS.filter((r) => ['hcl', 'h3o', 'hf', 'hac', 'h2co3', 'hcn', 'h2o'].includes(r.id)),
      marks: [
        { id: 'a-hac', row: 'hac', col: 'acid', tone: 'good' },
        { id: 'a-h2co3', row: 'h2co3', col: 'acid' },
        { id: 'b-hco3', row: 'h2co3', col: 'base', tone: 'adj' },
        { id: 'b-f', row: 'hf', col: 'base', tone: 'adj' },
        { id: 'a-hf', row: 'hf', col: 'acid' },
        { id: 'a-h3o', row: 'h3o', col: 'acid', tone: 'good' },
        { id: 'b-ac', row: 'hac', col: 'base', tone: 'adj' },
        { id: 'b-h2o', row: 'h3o', col: 'base', tone: 'muted' },
      ],
      moves: [
        { id: 'down', from: 'hac', to: 'h2co3' },
        { id: 'up', from: 'hac', to: 'hf', tone: 'bad' },
        { id: 'strong', from: 'h3o', to: 'hac' },
      ],
    }),
  ],
);

const head = ['lad.head', 'lad.rows'];

const video: Explainer = {
  id: 'c30-4-5-c',
  lessonId: 'c30-4-5',
  title: 'Predicting Acid–Base Reactions, Part 3: Which Side Is Favoured?',
  thumbnailTitle: 'Which Side Is Favoured?',
  thumbnail: 'lad',
  summary:
    'The main reaction in a mixture moves one proton from the strongest acid to the strongest base, and it runs mostly in the direction in which the stronger acid gives its proton away. Acetic acid and the hydrogen carbonate ion favour products (the fizz of vinegar on baking soda), acetic acid and the fluoride ion favour reactants, and a strong acid, as the hydronium ion, turns the acetate ion back into acetic acid. On the table, products are favoured when the acid is above the base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Which Side Is Favoured?', subtitle: 'The proton goes downhill' }],
      lines: [
        { say: 'So why does vinegar fizz on baking soda, but not on table salt?', show: 'title' },
        { say: 'This part writes the reaction between the strongest acid and base, and decides whether products or reactants are favoured.' },
      ],
    },
    {
      chapter: 'Writing the reaction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The main reaction', md: 'The transfer of **one proton** from the strongest acid to the strongest base. The acid becomes its conjugate base, and the base becomes its conjugate acid.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COOH(aq) + HCO3-(aq) <=> CH3COO-(aq) + H2CO3(aq)}', '\\ce{H2CO3(aq) -> H2O(l) + CO2(g)}'] },
      ],
      lines: [
        { say: 'The main reaction in a mixture is the transfer of one proton, from the strongest acid to the strongest base.', show: 'key' },
        { say: 'In vinegar and baking soda, acetic acid gives a proton to the hydrogen carbonate ion, forming the acetate ion and carbonic acid.', show: 'm.0', focus: 'm.0' },
        { say: 'Carbonic acid breaks down into water and carbon dioxide gas. That is the fizz.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Downhill',
      layout: 'split',
      leftWidth: 500,
      left: [table],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Products or reactants?', md: 'The reaction runs mostly in the direction in which the **stronger acid** gives its proton away.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH3COOH}\\!: K_a = 1.8 \\times 10^{-5}', '\\ce{H2CO3}\\!: K_a = 4.5 \\times 10^{-7}', '\\good{\\text{products favoured}}'] },
      ],
      lines: [
        {
          say: 'Every proton transfer is an equilibrium, with an acid on each side: acetic acid on the left, carbonic acid on the right.',
          show: [...head, 'lad.a-hac', 'lad.a-h2co3'],
        },
        { say: 'The reaction runs mostly in the direction in which the stronger acid gives its proton away.', show: 'rule' },
        {
          say: 'Acetic acid, at one point eight times ten to the minus five, is stronger than carbonic acid, at four point five times ten to the minus seven. So products are favoured.',
          caption: 'Acetic acid, at Ka = 1.8 × 10⁻⁵, is stronger than carbonic acid, at 4.5 × 10⁻⁷. So products are favoured.',
          show: 'm',
          focus: 'm.2',
        },
        { say: 'On the table, the acid is above the base. The proton moves downhill, from upper left to lower right.', show: ['lad.b-hco3', 'lad.down'], focus: 'lad.down' },
      ],
    },
    {
      chapter: 'A reaction that hardly goes',
      layout: 'split',
      leftWidth: 500,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Acetic acid and sodium fluoride are mixed.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{CH3COOH(aq) + F-(aq)}', '\\ce{<=> CH3COO-(aq) + HF(aq)}', '\\ce{HF}\\!: K_a = 6.6 \\times 10^{-4}', '\\bad{\\text{reactants favoured}}'],
        },
      ],
      lines: [
        {
          say: 'Now acetic acid and sodium fluoride. The strongest acid is acetic acid, and the strongest base is the fluoride ion, below water in the right column.',
          show: [...head, 'q', 'lad.a-hac', 'lad.b-f', 'lad.b-h2o'],
          focus: ['lad.hf-base', 'lad.h3o-base'],
        },
        { say: 'Acetic acid gives a proton to the fluoride ion, forming the acetate ion and hydrofluoric acid.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        {
          say: 'But hydrofluoric acid, at six point six times ten to the minus four, is the stronger acid. Reactants are favoured: only a little of it forms.',
          caption: 'But hydrofluoric acid, at Ka = 6.6 × 10⁻⁴, is the stronger acid. Reactants are favoured: only a little of it forms.',
          show: ['m.2', 'm.3', 'lad.a-hf'],
          focus: 'm.3',
        },
        { say: 'On the table, this acid is below the base. The proton would have to go uphill.', show: 'lad.up', focus: 'lad.up' },
      ],
    },
    {
      chapter: 'A strong acid',
      layout: 'split',
      leftWidth: 500,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Hydrochloric acid is added to sodium acetate.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{H3O+(aq) + CH3COO-(aq)}', '\\ce{<=> H2O(l) + CH3COOH(aq)}', '\\good{\\text{products favoured}}'] },
      ],
      lines: [
        {
          say: 'Hydrochloric acid is added to sodium acetate. The strongest acid is the hydronium ion, and the strongest base the acetate ion.',
          show: [...head, 'q', 'lad.a-h3o', 'lad.b-ac'],
        },
        {
          say: 'With a K A of one, the hydronium ion is far stronger than acetic acid, so products are favoured. A strong acid turns the anion of a weak acid back into the weak acid.',
          caption: 'With a Ka of 1, the hydronium ion is far stronger than acetic acid, so products are favoured. A strong acid turns the anion of a weak acid back into the weak acid.',
          show: ['m', 'lad.strong'],
          focus: ['m.2', 'lad.strong'],
        },
        {
          say: 'And table salt? The chloride ion is a weaker base than water, so acetic acid only ionises slightly. Nothing new forms, and nothing fizzes.',
          focus: ['lad.hcl-base', 'lad.h3o-base'],
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
            'Hydrocyanic acid and sodium acetate react: $\\ce{HCN + CH3COO- <=> CN- + CH3COOH}$. At $25^\\circ\\text{C}$, $K_a$ is $6.2 \\times 10^{-10}$ for $\\ce{HCN}$ and $1.8 \\times 10^{-5}$ for $\\ce{CH3COOH}$. Which side is favoured?',
          choices: [
            'Products: $\\ce{HCN}$ is the stronger acid.',
            'Reactants: $\\ce{CH3COOH}$ is the stronger acid.',
            'Products: $\\ce{CH3COOH}$ is the stronger acid.',
            'Reactants: $\\ce{HCN}$ is the stronger acid.',
          ],
          answer: 1,
          working: '$\\ce{CH3COOH}$, formed on the right, is a stronger acid than $\\ce{HCN}$ on the left, so it gives its proton back: reactants are favoured.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrocyanic acid and sodium acetate react as shown. Which side is favoured? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Acetic acid, formed on the right, is the stronger acid, so reactants are favoured. Choice C compares the acids correctly, but picks the wrong side.',
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
            'The main reaction moves **one proton** from the strongest acid to the strongest base.',
            '**Products are favoured** when the acid on the left is stronger than the acid formed on the right.',
            'On the table: acid above base, products favoured (downhill); acid below base, reactants favoured.',
            'A strong acid, as $\\ce{H3O+}$, turns the anion of a weak acid back into the weak acid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The main reaction moves one proton from the strongest acid to the strongest base.', show: 'sum.0' },
        { say: 'Products are favoured when the acid on the left is stronger than the acid formed on the right.', show: 'sum.1' },
        { say: 'On the table, the proton goes downhill: acid above base, products favoured.', show: 'sum.2' },
        {
          say: 'And a strong acid turns the anion of a weak acid into the weak acid. That completes this lesson. Next, you will meet K A properly, with its partner for bases, K B.',
          caption: 'And a strong acid turns the anion of a weak acid into the weak acid. That completes this lesson. Next, you will meet Ka properly, with its partner for bases, Kb.',
          show: 'sum.3',
        },
      ],
    },
  ],
};

export default video;
