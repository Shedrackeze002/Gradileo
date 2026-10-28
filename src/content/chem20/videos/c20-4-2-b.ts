import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker, ionEq, tag } from './lib/c20-4a-figures.ts';

const ion = (id: string, at: [number, number], tex: string, plus: boolean) => ({ id, at, tex: `\\ce{${tex}}`, tone: plus ? ('opp' as const) : ('adj' as const), group: 'spect' });

// Barium chloride and sodium sulfate after mixing: barium sulfate on the bottom, and the sodium
// and chloride ions, the spectators, still dissolved.
const mixed = figure(
  'sw',
  [
    beaker({
      w: 3.8,
      h: 4.4,
      level: 3.5,
      label: '\\text{after mixing}',
      solid: { height: 0.45 },
      ions: [ion('na1', [0.95, 2.85], 'Na+', true), ion('cl1', [2.75, 2.85], 'Cl-', false), ion('cl2', [1.15, 1.85], 'Cl-', false), ion('na2', [2.85, 1.85], 'Na+', true)],
    }),
    tag('ppt', [1.9, 0.95], '\\ce{BaSO4(s)}', { group: 'solid' }),
  ],
  440,
);

// The total ionic equation for lead(II) nitrate and potassium iodide, with strokes through the
// spectator ions (the group "x").
const total = figure(
  'te',
  [
    ionEq({
      rows: [
        [{ id: 'pb', tex: '\\ce{Pb^2+(aq)}' }, '+', { id: 'no3', tex: '\\ce{2NO3-(aq)}', strike: 'x' }, '+', { id: 'k', tex: '\\ce{2K+(aq)}', strike: 'x' }, '+', { id: 'i', tex: '\\ce{2I-(aq)}' }],
        ['->', { id: 'pbi2', tex: '\\ce{PbI2(s)}' }, '+', { id: 'k2', tex: '\\ce{2K+(aq)}', strike: 'x' }, '+', { id: 'no32', tex: '\\ce{2NO3-(aq)}', strike: 'x' }],
      ],
    }),
  ],
  190,
);

const video: Explainer = {
  id: 'c20-4-2-b',
  lessonId: 'c20-4-2',
  title: 'Net Ionic Equations, Part 2: Spotting Spectators and Counting Ions',
  thumbnailTitle: 'Spotting Spectators and Counting Ions',
  thumbnail: 'sw',
  summary:
    'In a precipitation, the two ions that form the solid react and the other two are spectators: for barium chloride and sodium sulfate, Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), with Na⁺ and Cl⁻ as spectators. The number of each ion is the coefficient times the number of that ion in one formula unit, and a polyatomic ion stays whole.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'Spotting Spectators and Counting Ions', subtitle: 'Which pair forms the solid?' }],
      lines: [
        { say: 'In a precipitation reaction, the ions swap partners. One new pair forms the solid. The other pair simply stays dissolved.', show: 'title' },
        { say: 'In this part, you will spot the spectators quickly, and count how many of each ion a compound releases.' },
      ],
    },
    {
      chapter: 'Spotting the spectators',
      layout: 'split',
      leftWidth: 440,
      left: [mixed],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\ce{BaCl2(aq) + Na2SO4(aq) ->}$ $\\ce{BaSO4(s) + 2NaCl(aq)}$' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['$\\ce{Ba^2+}$ and $\\ce{SO4^2-}$ end up in the solid: they **react**.', '$\\ce{Na+}$ and $\\ce{Cl-}$ are dissolved before and after: **spectators**.', 'Net: $\\ce{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}$'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The other pair', md: 'The spectators are the ions of the **dissolved product**, here $\\ce{NaCl(aq)}$.' },
      ],
      lines: [
        { say: 'Solutions of barium chloride and sodium sulfate are mixed, and barium sulfate precipitates. Which ions are spectators?', show: ['q', 'sw.glass', 'sw.liquid', 'sw.label'] },
        { say: 'The barium ions and the sulfate ions end up in the solid, barium sulfate, so they react.', show: ['b.0', 'sw.solid'], focus: 'sw.solid' },
        { say: 'The sodium ions and the chloride ions are dissolved before the reaction, and still dissolved after it. They are the spectators.', show: ['b.1', 'sw.spect'], focus: 'sw.spect' },
        { say: 'So the net ionic equation is: the barium ion plus the sulfate ion gives solid barium sulfate.', caption: 'So the net ionic equation is Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).', show: 'b.2', focus: 'b.2' },
        { say: 'A shortcut: of the four ions, the two that make the precipitate react. The other two are the spectators, the ions of the dissolved product, sodium chloride.', show: 'tip' },
      ],
    },
    {
      chapter: 'Counting the ions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'How many of each ion', md: 'Coefficient of the compound **×** the number of that ion in one formula unit. A polyatomic ion stays whole, with its charge.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{2KI(aq)} \\ \\longrightarrow\\ \\ce{2K+(aq) + 2I-(aq)}',
            '\\ce{3CaCl2(aq)} \\ \\longrightarrow\\ \\ce{3Ca^2+(aq) + 6Cl-(aq)}',
            '\\ce{2Na3PO4(aq)} \\ \\longrightarrow\\ \\ce{6Na+(aq) + 2PO4^3-(aq)}',
          ],
        },
      ],
      lines: [
        { say: 'A formula equation counts formula units. So the number of each ion is the coefficient in front of the compound, times the number of that ion in one formula unit.', show: 'k' },
        { say: 'Two units of potassium iodide give two potassium ions and two iodide ions.', caption: '2KI(aq) gives two potassium ions and two iodide ions.', show: 'm.0', focus: 'm.0' },
        { say: 'Three units of calcium chloride give three calcium ions, and three times two, or six chloride ions.', caption: '3CaCl₂(aq) gives three calcium ions, and 3 × 2, or six chloride ions.', show: 'm.1', focus: 'm.1' },
        { say: 'And two units of sodium phosphate give six sodium ions, but only two phosphate ions. A polyatomic ion stays whole: phosphate is never split into phosphorus and oxygen.', caption: 'And 2Na₃PO₄(aq) gives six sodium ions, but only two phosphate ions. A polyatomic ion stays whole: phosphate is never split into phosphorus and oxygen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Lead(II) nitrate and potassium iodide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solutions of lead(II) nitrate and potassium iodide are mixed: $\\ce{Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)}$. Write the net ionic equation.' },
        total,
        { kind: 'math', id: 'n', size: 'md', lines: ['\\ce{Pb^2+(aq) + 2I-(aq) -> PbI2(s)}', '\\text{Charge: } (2+) + 2(1-) = 0'] },
      ],
      lines: [
        { say: 'Solutions of lead two nitrate and potassium iodide are mixed, and lead two iodide precipitates.', caption: 'Solutions of lead(II) nitrate and potassium iodide are mixed, and lead(II) iodide precipitates.', show: 'q' },
        { say: 'Lead two nitrate gives one lead two ion and two nitrate ions. Two units of potassium iodide give two potassium ions and two iodide ions. That is the total ionic equation.', caption: 'Pb(NO₃)₂ gives one Pb²⁺ ion and two NO₃⁻ ions. 2KI gives two K⁺ ions and two I⁻ ions. That is the total ionic equation.', show: ['te.row-0', 'te.row-1'] },
        { say: 'The potassium ions and the nitrate ions are spectators. Cross them out.', show: 'te.x', focus: ['te.k', 'te.no3', 'te.k2', 'te.no32'] },
        { say: 'What is left is the net ionic equation: the lead two ion plus two iodide ions gives solid lead two iodide.', caption: 'What is left is the net ionic equation: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s).', show: 'n.0', focus: 'n.0' },
        { say: 'Check the charge: plus two, and two times minus one, make zero, the same as the solid.', show: 'n.1', focus: 'n.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of calcium chloride and sodium carbonate are mixed, and calcium carbonate precipitates. Which ions are the spectator ions?',
          choices: ['$\\ce{Na+}$ and $\\ce{Cl-}$', '$\\ce{Ca^2+}$ and $\\ce{CO3^2-}$', '$\\ce{Ca^2+}$ and $\\ce{Cl-}$', '$\\ce{Na+}$ and $\\ce{CO3^2-}$'],
          answer: 0,
          working: '$\\ce{Ca^2+}$ and $\\ce{CO3^2-}$ form the solid, so they react. $\\ce{Na+}$ and $\\ce{Cl-}$ stay dissolved, as $\\ce{NaCl(aq)}$. Net: $\\ce{Ca^2+(aq) + CO3^2-(aq) -> CaCO3(s)}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of calcium chloride and sodium carbonate are mixed, and calcium carbonate precipitates. Which ions are the spectator ions? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: the sodium ions and the chloride ions. The calcium and carbonate ions form the solid, so they react, and the other two stay dissolved as sodium chloride. Choice B names the ions that react.', show: 'q.answer' },
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
            'The two ions that form the precipitate react; the **other two** are spectators.',
            'Each ion: the **coefficient** × the number in one formula unit. $\\ce{3CaCl2}$ gives $\\ce{6Cl-}$.',
            'A **polyatomic ion** stays whole, with its charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The two ions that form the precipitate react, and the other two are the spectators.', show: 'sum.0' },
        { say: 'The number of each ion is the coefficient, times the number of that ion in one formula unit. Three units of calcium chloride give six chloride ions.', show: 'sum.1' },
        { say: 'And a polyatomic ion stays whole. In part three, you will write net ionic equations in lowest terms, and from names alone. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
