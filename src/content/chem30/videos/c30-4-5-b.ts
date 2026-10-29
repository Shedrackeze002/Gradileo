import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { LADDER_ROWS, ladder } from './lib/c30-4b-figures.ts';

// Part of the table of relative acid strengths, with the particles in a mixture of acetic acid
// and sodium hydrogen carbonate marked: the acids and bases among them, then the strongest of each.
const table = figure(
  'lad',
  [
    ladder({
      rows: LADDER_ROWS.filter((r) => ['hcl', 'h3o', 'hf', 'hac', 'h2co3', 'hcn', 'hco3', 'h2o'].includes(r.id)),
      marks: [
        { id: 'a-hac', row: 'hac', col: 'acid' },
        { id: 'a-hco3', row: 'hco3', col: 'acid' },
        { id: 'a-h2o', row: 'h2o', col: 'acid' },
        { id: 'acid', row: 'hac', col: 'acid', tone: 'good' },
        { id: 'b-hco3', row: 'h2co3', col: 'base' },
        { id: 'b-h2o', row: 'h3o', col: 'base' },
        { id: 'base', row: 'h2co3', col: 'base', tone: 'adj' },
      ],
    }),
  ],
);

const video: Explainer = {
  id: 'c30-4-5-b',
  lessonId: 'c30-4-5',
  title: 'Predicting Acid–Base Reactions, Part 2: The Strongest Acid and Base',
  thumbnailTitle: 'The Strongest Acid and Base',
  thumbnail: 'lad',
  summary:
    'Before predicting an acid–base reaction, list every particle present: ionic compounds as separate ions, strong acids as hydronium ions and their anion, weak acids and molecular bases as molecules, and always water; sodium and potassium ions are spectators. The strongest acid is the particle highest in the left column of the table of relative acid strengths, and the strongest base is the one lowest in the right column: in acetic acid and sodium hydrogen carbonate, they are acetic acid and the hydrogen carbonate ion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'The Strongest Acid and Base', subtitle: 'List every particle first' }],
      lines: [
        { say: 'When two solutions are mixed, the beaker holds many particles: ions, molecules and a lot of water.', show: 'title' },
        { say: 'The main reaction is between just two of them: the strongest acid and the strongest base. This part shows how to find them.' },
      ],
    },
    {
      chapter: 'Listing the particles',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Ionic compounds** are present as separate ions: sodium acetate is $\\ce{Na+}$ and $\\ce{CH3COO-}$.',
            '**Strong acids** are present as $\\ce{H3O+}$ and their anion: hydrochloric acid is $\\ce{H3O+}$ and $\\ce{Cl-}$.',
            '**Weak acids** and molecular bases are present mostly as molecules: $\\ce{CH3COOH}$, $\\ce{NH3}$.',
            '**Water** is always there, and it can act as an acid or a base.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Spectators', md: 'Sodium and potassium ions are **spectators**: they are neither acids nor bases.' },
      ],
      lines: [
        { say: 'First, list every particle actually present. Ionic compounds are present as separate ions: sodium acetate is sodium ions and acetate ions.', show: 'b.0' },
        { say: 'Strong acids ionise completely, so hydrochloric acid is hydronium ions and chloride ions.', show: 'b.1' },
        { say: 'Weak acids, and molecular bases such as ammonia, are present mostly as whole molecules.', show: 'b.2' },
        { say: 'Water is always there, and it can act as an acid or a base.', show: 'b.3' },
        { say: 'Sodium and potassium ions are spectators: they are neither acids nor bases.', show: 'tip' },
      ],
    },
    {
      chapter: 'Vinegar and baking soda',
      layout: 'split',
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Acetic acid and sodium hydrogen carbonate are mixed.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Particles: $\\ce{CH3COOH}$, $\\ce{Na+}$, $\\ce{HCO3-}$, $\\ce{H2O}$',
            'Acids: $\\ce{CH3COOH}$ $(1.8 \\times 10^{-5})$, $\\ce{HCO3-}$ $(4.7 \\times 10^{-11})$, $\\ce{H2O}$ $(1.0 \\times 10^{-14})$. Strongest: $\\ce{CH3COOH}$.',
            'Bases: $\\ce{HCO3-}$ and $\\ce{H2O}$. Strongest: $\\ce{HCO3-}$, lower in the right column.',
          ],
        },
      ],
      lines: [
        {
          say: 'Acetic acid and sodium hydrogen carbonate, which is baking soda, are mixed. The particles are acetic acid molecules, sodium ions, hydrogen carbonate ions and water.',
          show: ['q', 'lad.head', 'lad.rows', 'b.0'],
        },
        {
          say: 'Three of them can act as acids: acetic acid, with a K A of one point eight times ten to the minus five, the hydrogen carbonate ion and water.',
          caption: 'Three of them can act as acids: acetic acid, with a Ka of 1.8 × 10⁻⁵, the hydrogen carbonate ion and water.',
          show: ['b.1', 'lad.a-hac', 'lad.a-hco3', 'lad.a-h2o'],
        },
        { say: 'Acetic acid is highest in the left column, so it is the strongest acid.', show: 'lad.acid', focus: 'lad.hac-acid' },
        {
          say: 'Two can act as bases: the hydrogen carbonate ion, the conjugate base of carbonic acid, and water, the conjugate base of the hydronium ion.',
          show: ['b.2', 'lad.b-hco3', 'lad.b-h2o'],
        },
        { say: 'The hydrogen carbonate ion is lower in the right column, so it is the strongest base.', show: 'lad.base', focus: 'lad.h2co3-base' },
        { say: 'The ion appears in both columns: it is amphiprotic, so check it both ways.', focus: ['lad.hco3-acid', 'lad.h2co3-base'] },
      ],
    },
    {
      chapter: 'Two common slips',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Forgetting water, or counting spectators',
          md: 'Water must always be on the list: in a solution of a weak acid alone, water is the strongest base present. And $\\ce{Na+}$ is not an acid, even though it is positive: it has no proton to give.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COOH(aq) + H2O(l) <=> CH3COO-(aq) + H3O+(aq)}'] },
      ],
      lines: [
        { say: 'Two slips are common. The first is forgetting water.', show: 'oops' },
        { say: 'In acetic acid alone, the only particles are acetic acid and water, so water is the strongest base. The reaction is the acid’s ionisation.', show: 'm', focus: 'm' },
        { say: 'The second is counting the sodium ion as an acid because it is positive. It has no proton to give.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of hydrochloric acid and ammonia, $\\ce{NH3}$, are mixed. List the particles in the two solutions. Which of them is the strongest acid?',
          choices: ['$\\ce{HCl}$', '$\\ce{NH4+}$', '$\\ce{H2O}$', '$\\ce{H3O+}$'],
          answer: 3,
          working: 'Hydrochloric acid ionises completely, so the particles are $\\ce{H3O+}$, $\\ce{Cl-}$, $\\ce{NH3}$ and $\\ce{H2O}$. The strongest acid among them is $\\ce{H3O+}$; no $\\ce{HCl}$ molecules are left.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Hydrochloric acid and ammonia are mixed. Which particle in the two solutions is the strongest acid? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, the hydronium ion. Hydrochloric acid ionises completely, so no hydrogen chloride molecules are left, and the hydronium ion is the strongest acid in water. That rules out choice A.',
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
            'List every particle: the ions of ionic compounds, $\\ce{H3O+}$ and an anion for a strong acid, molecules of weak acids and bases, and water.',
            '$\\ce{Na+}$ and $\\ce{K+}$ are spectators.',
            'Strongest acid: highest in the left column. Strongest base: lowest in the right column.',
            'Check an amphiprotic particle, such as $\\ce{HCO3-}$, both ways.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. List every particle, including water. Strong acids are present as hydronium ions.', show: 'sum.0' },
        { say: 'Sodium and potassium ions are spectators.', show: 'sum.1' },
        { say: 'The strongest acid is highest in the left column, and the strongest base lowest in the right column.', show: 'sum.2' },
        { say: 'Check an amphiprotic particle both ways. In part three, you will write their reaction and decide which side is favoured. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
