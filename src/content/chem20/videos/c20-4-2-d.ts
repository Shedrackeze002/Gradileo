import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gives, ionEq, mol, plus, row, stack, star, water } from './lib/c20-4a-figures.ts';

// The total ionic equation for nitric acid and potassium hydroxide, with strokes through the
// spectator ions (the group "x").
const total = figure(
  'te',
  [
    ionEq({
      rows: [
        [{ id: 'h3o', tex: '\\ce{H3O+(aq)}' }, '+', { id: 'no3', tex: '\\ce{NO3-(aq)}', strike: 'x' }, '+', { id: 'k', tex: '\\ce{K+(aq)}', strike: 'x' }, '+', { id: 'oh', tex: '\\ce{OH-(aq)}' }],
        ['->', { id: 'h2o', tex: '\\ce{2H2O(l)}' }, '+', { id: 'k2', tex: '\\ce{K+(aq)}', strike: 'x' }, '+', { id: 'no32', tex: '\\ce{NO3-(aq)}', strike: 'x' }],
      ],
    }),
  ],
  190,
);

// A hydronium ion hands its extra hydrogen ion to a hydroxide ion: two water molecules.
const transfer = figure('f', [row({ terms: [star('h3o', 'O', ['H', 'H', 'H'], { charge: '+' }), plus('p'), mol('oh', ['O', 'H'], { charge: '-' }), gives('arr'), stack(water('w1'), water('w2'))] })], 300);

const video: Explainer = {
  id: 'c20-4-2-d',
  lessonId: 'c20-4-2',
  title: 'Net Ionic Equations, Part 4: Neutralisation of a Strong Acid and a Strong Base',
  thumbnailTitle: 'Strong Acid and Strong Base',
  thumbnail: 'f',
  summary:
    'In a total ionic equation, a strong acid is written as hydronium ions and its anion, and a strong base as its metal ion and hydroxide ions. The acid’s anion and the base’s metal ion are spectators, so every neutralisation of a strong acid by a strong base has the same net ionic equation: H₃O⁺(aq) + OH⁻(aq) → 2H₂O(l).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Neutralisation of a Strong Acid and a Strong Base', subtitle: 'One net ionic equation for them all' }],
      lines: [
        { say: 'Hydrochloric acid with sodium hydroxide, nitric acid with potassium hydroxide: the acids and bases change, but the reaction underneath is always the same.', show: 'title' },
        { say: 'In this last part, you will write ionic equations for neutralisations, and see why every strong acid and strong base share one net ionic equation.' },
      ],
    },
    {
      chapter: 'Writing strong acids and bases',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Strong acids and strong bases', md: 'A **strong acid** ionises completely: write it as $\\ce{H3O+}$ and its anion. A **strong base** such as $\\ce{NaOH}$ or $\\ce{KOH}$ dissociates into its metal ion and $\\ce{OH-}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HNO3(aq)} \\ \\longrightarrow\\ \\ce{H3O+(aq) + NO3-(aq)}', '\\ce{KOH(aq)} \\ \\longrightarrow\\ \\ce{K+(aq) + OH-(aq)}'] },
      ],
      lines: [
        { say: 'Lesson three point eight showed that a strong acid ionises completely. Its solution holds no acid molecules at all, only hydronium ions and the acid’s anion.', show: 'k' },
        { say: 'So in a total ionic equation, write nitric acid as the hydronium ion and the nitrate ion.', caption: 'So in a total ionic equation, write HNO₃(aq) as H₃O⁺(aq) and NO₃⁻(aq).', show: 'm.0', focus: 'm.0' },
        { say: 'A strong base, such as potassium hydroxide, dissociates into its metal ion and the hydroxide ion.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Nitric acid and potassium hydroxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Nitric acid is neutralised by potassium hydroxide: $\\ce{HNO3(aq) + KOH(aq) -> KNO3(aq) + H2O(l)}$.' },
        total,
        { kind: 'math', id: 'n', size: 'lg', lines: ['\\ce{H3O+(aq) + OH-(aq) -> 2H2O(l)}'] },
      ],
      lines: [
        { say: 'Nitric acid is neutralised by potassium hydroxide, forming potassium nitrate and water.', show: 'q' },
        { say: 'In the total ionic equation, the hydronium, nitrate, potassium and hydroxide ions give two water molecules, with the potassium and nitrate ions still dissolved.', show: ['te.row-0', 'te.row-1'] },
        { say: 'The potassium ions and the nitrate ions are spectators. Cross them out.', show: 'te.x', focus: ['te.k', 'te.no3', 'te.k2', 'te.no32'] },
        { say: 'The net ionic equation: the hydronium ion plus the hydroxide ion gives two molecules of liquid water.', caption: 'The net ionic equation: H₃O⁺(aq) + OH⁻(aq) → 2H₂O(l).', show: 'n', focus: 'n' },
      ],
    },
    {
      chapter: 'Why two water molecules?',
      layout: 'center',
      main: [
        transfer,
        {
          kind: 'bullets',
          id: 'b',
          items: ['A hydronium ion is a water molecule carrying an **extra** $\\ce{H+}$.', 'It hands that $\\ce{H+}$ to the hydroxide ion, which becomes water, and is **left as water** itself.', 'Atoms: 4 H and 2 O on each side.'],
        },
      ],
      lines: [
        { say: 'Why two water molecules, when the formula equation shows one? A hydronium ion is a water molecule carrying an extra hydrogen ion.', show: ['f.h3o', 'b.0'], focus: 'f.h3o' },
        { say: 'It hands that hydrogen ion to the hydroxide ion, which becomes a water molecule. And the hydronium ion is left as a water molecule itself.', show: ['f.p', 'f.oh', 'f.arr', 'f.w1', 'f.w2', 'b.1'], focus: ['f.w1', 'f.w2'] },
        { say: 'The atoms balance: four hydrogen and two oxygen atoms on each side.', show: 'b.2', focus: 'f' },
      ],
    },
    {
      chapter: 'Every strong acid and strong base',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hydrochloric acid neutralises barium hydroxide: $\\ce{2HCl(aq) + Ba(OH)2(aq) -> BaCl2(aq) + 2H2O(l)}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H3O+(aq) + 2OH-(aq) -> 4H2O(l)}', '\\div 2\\text{:} \\quad \\ce{H3O+(aq) + OH-(aq) -> 2H2O(l)}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Hydronium and hydroxide are not spectators', md: 'They are on the left of the total ionic equation but not on the right: they have become water. The spectators are the acid’s anion and the base’s metal ion.' },
      ],
      lines: [
        { say: 'Hydrochloric acid neutralises barium hydroxide. Each acid molecule gives a hydronium ion and a chloride ion, and barium hydroxide gives one barium ion and two hydroxide ions.', show: 'q' },
        { say: 'Cross out the barium and chloride ions. Two hydronium ions and two hydroxide ions give four water molecules, and every coefficient divides by two.', caption: 'Cross out the barium and chloride ions. 2H₃O⁺(aq) + 2OH⁻(aq) → 4H₂O(l), and every coefficient divides by two.', show: 'm.0', focus: 'm.0' },
        { say: 'It is the same net ionic equation. Every strong acid with a strong base has it: the spectators change, but the reaction itself never does.', show: 'm.1', focus: 'm.1' },
        { say: 'So hydronium and hydroxide are never the spectators. They are the ions that react, and become water.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hydrobromic acid, $\\ce{HBr(aq)}$, is neutralised by lithium hydroxide, $\\ce{LiOH(aq)}$. The acid is strong, so in water it is entirely $\\ce{H3O+}$ and $\\ce{Br-}$ ions. Which ions are the spectator ions?',
          choices: ['$\\ce{H3O+}$ and $\\ce{OH-}$', '$\\ce{Br-}$ and $\\ce{Li+}$', '$\\ce{H3O+}$ and $\\ce{Br-}$', '$\\ce{Li+}$ and $\\ce{OH-}$'],
          answer: 1,
          working: 'Total ionic equation: $\\ce{H3O+(aq) + Br-(aq) + Li+(aq) + OH-(aq) -> 2H2O(l) + Li+(aq) + Br-(aq)}$. The spectators are $\\ce{Li+}$ and $\\ce{Br-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrobromic acid is neutralised by lithium hydroxide. The acid is strong, so in water it is entirely hydronium and bromide ions. Which ions are the spectator ions? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: the bromide ions and the lithium ions. The hydronium and hydroxide ions react to form water, so choice A names exactly the ions that are not spectators.', show: 'q.answer' },
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
            'A **strong acid** is written as $\\ce{H3O+}$ and its anion; a strong base as its metal ion and $\\ce{OH-}$.',
            'The spectators are the acid’s anion and the base’s metal ion.',
            'Any strong acid with a strong base: $\\ce{H3O+(aq) + OH-(aq) -> 2H2O(l)}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strong acid is written as hydronium ions and its anion, and a strong base as its metal ion and hydroxide ions.', show: 'sum.0' },
        { say: 'The spectators are the acid’s anion and the base’s metal ion.', show: 'sum.1' },
        { say: 'And any strong acid with a strong base has the same net ionic equation: hydronium plus hydroxide gives two water molecules. That completes this lesson. Next, you will find the molar mass of any compound.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
