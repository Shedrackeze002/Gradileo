import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ionEq } from './lib/c20-4a-figures.ts';

// The total ionic equation for silver nitrate and potassium bromide, with strokes through the
// spectator ions (the group "x").
const total = figure(
  'te',
  [
    ionEq({
      rows: [
        [{ id: 'ag', tex: '\\ce{Ag+(aq)}' }, '+', { id: 'no3', tex: '\\ce{NO3-(aq)}', strike: 'x' }, '+', { id: 'k', tex: '\\ce{K+(aq)}', strike: 'x' }, '+', { id: 'br', tex: '\\ce{Br-(aq)}' }],
        ['->', { id: 'agbr', tex: '\\ce{AgBr(s)}' }, '+', { id: 'k2', tex: '\\ce{K+(aq)}', strike: 'x' }, '+', { id: 'no32', tex: '\\ce{NO3-(aq)}', strike: 'x' }],
      ],
    }),
  ],
  190,
);

const video: Explainer = {
  id: 'c20-4-2',
  lessonId: 'c20-4-2',
  title: 'Net Ionic Equations, Part 1: Total and Net Ionic Equations',
  thumbnailTitle: 'Total and Net Ionic Equations',
  thumbnail: 'te',
  summary:
    'A total ionic equation writes every dissolved ionic compound as its separate ions, while solids and water stay whole. Spectator ions appear unchanged on both sides; crossing them out leaves the net ionic equation, such as Ag⁺(aq) + Br⁻(aq) → AgBr(s) for silver nitrate and potassium bromide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Total and Net Ionic Equations', subtitle: 'Which ions really react?' }],
      lines: [
        { say: 'In lesson three point two, mixing silver nitrate and sodium chloride solutions made a white precipitate of silver chloride. Use potassium chloride or calcium chloride instead, and exactly the same white solid appears.', show: 'title' },
        { say: 'The sodium, potassium, calcium and nitrate ions make no difference, because they never take part. Only the silver ions and the chloride ions react.' },
        { say: 'In this lesson, you will write equations that show only the change that really happens. This first part introduces them. Later parts find spectator ions, count ions, and finish with neutralisation.' },
      ],
    },
    {
      chapter: 'Three ways to write a reaction',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Equation', 'What it shows'],
          rows: [
            ['Formula equation', 'Every substance as a whole formula.'],
            ['Total ionic equation', 'Every dissolved ionic compound, (aq), split into its ions. Solids and water stay whole.'],
            ['Net ionic equation', 'Only the particles that react: the spectator ions are left out.'],
          ],
        },
        { kind: 'callout', id: 'sp', tone: 'definition', title: 'Spectator ion', md: 'An ion that is in the solution before and after the reaction, **unchanged**. It appears in exactly the same form on both sides of the total ionic equation.' },
      ],
      lines: [
        { say: 'An equation with whole formulas, like those in lesson four point one, is a formula equation. It is easy to balance, but it hides what the solutions really hold.', show: 't.0' },
        { say: 'An ionic compound dissociates when it dissolves. A solution of potassium bromide holds separate potassium ions and bromide ions, not potassium bromide units.' },
        { say: 'So a total ionic equation writes every dissolved ionic compound as its separate ions. Solids, such as a precipitate, and molecular substances, such as water, stay whole.', show: 't.1', focus: 't.1' },
        { say: 'A spectator ion is in the solution before and after the reaction, unchanged. It appears in exactly the same form on both sides of the total ionic equation.', show: 'sp' },
        { say: 'Cross out the spectators, and what is left is the net ionic equation: only the particles that react, with the smallest whole-number coefficients.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Silver nitrate and potassium bromide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solutions of silver nitrate and potassium bromide are mixed: $\\ce{AgNO3(aq) + KBr(aq) -> AgBr(s) + KNO3(aq)}$. Write the total ionic and the net ionic equations.' },
        total,
        { kind: 'math', id: 'n', size: 'md', lines: ['\\ce{Ag+(aq) + Br-(aq) -> AgBr(s)}', '\\text{Charge: } (1+) + (1-) = 0 \\quad \\text{and the solid has none}'] },
      ],
      lines: [
        { say: 'Solutions of silver nitrate and potassium bromide are mixed. Step one is the balanced formula equation, with state symbols.', show: 'q' },
        { say: 'Step two: split each dissolved ionic compound into its ions. The solid, silver bromide, stays whole. This is the total ionic equation.', show: ['te.row-0', 'te.row-1'] },
        { say: 'Step three: the potassium ions and the nitrate ions appear unchanged on both sides. They are spectators, so cross them out.', show: 'te.x', focus: ['te.k', 'te.no3', 'te.k2', 'te.no32'] },
        { say: 'Step four: write what is left. The silver ion plus the bromide ion gives solid silver bromide. That is the net ionic equation.', caption: 'Step four: write what is left. Ag⁺(aq) + Br⁻(aq) → AgBr(s). That is the net ionic equation.', show: 'n.0', focus: 'n.0' },
        { say: 'Check it: one silver and one bromine atom on each side. Plus one and minus one make zero charge on the left, and the solid has no charge.', show: 'n.1', focus: 'n.1' },
        { say: 'So whenever silver ions meet bromide ions in water, silver bromide precipitates, whichever compounds they came from.' },
      ],
    },
    {
      chapter: 'Keep the solid whole',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the solid whole', md: 'A precipitate is a solid, not dissolved ions, so it is never split. Split only the ionic substances marked (aq).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{-> AgBr(s)} \\quad \\good{\\checkmark}', '\\ce{-> Ag+(aq) + Br-(aq)} \\quad \\bad{\\times}'] },
      ],
      lines: [
        { say: 'One warning. The precipitate is a solid, not dissolved ions, so it is never split. On the product side, write solid silver bromide, never its two ions.', show: ['oops', 'm'] },
        { say: 'Split only the substances that are ionic and marked aqueous.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of silver nitrate and sodium iodide are mixed: $\\ce{AgNO3(aq) + NaI(aq) -> AgI(s) + NaNO3(aq)}$. Which is the net ionic equation?',
          choices: ['$\\ce{Na+(aq) + I-(aq) -> NaI(s)}$', '$\\ce{Ag+(aq) + I-(aq) -> AgI(aq)}$', '$\\ce{Ag+(aq) + I-(aq) -> AgI(s)}$', '$\\ce{AgI(s) -> Ag+(aq) + I-(aq)}$'],
          answer: 2,
          working: 'Total ionic equation: $\\ce{Ag+(aq) + NO3-(aq) + Na+(aq) + I-(aq) -> AgI(s) + Na+(aq) + NO3-(aq)}$. The spectators are $\\ce{Na+}$ and $\\ce{NO3-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of silver nitrate and sodium iodide are mixed, and silver iodide precipitates. Which is the net ionic equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Silver iodide is the solid, so the silver ions and iodide ions react to form it, and the sodium and nitrate ions are spectators. Choice B marks the product aqueous, but it is a precipitate, and choice D splits the solid.', show: 'q.answer' },
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
            'A **total ionic equation** splits every dissolved ionic compound into its ions; solids stay whole.',
            '**Spectator ions** appear unchanged on both sides.',
            'The **net ionic equation** leaves them out: $\\ce{Ag+(aq) + Br-(aq) -> AgBr(s)}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A total ionic equation splits every dissolved ionic compound into its ions, and solids stay whole.', show: 'sum.0' },
        { say: 'Spectator ions appear unchanged on both sides.', show: 'sum.1' },
        { say: 'And the net ionic equation leaves them out. In part two, you will spot spectators quickly, and count the ions a compound releases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
