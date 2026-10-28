import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { acidBox, frame, legend } from './lib/c20-3b-figures.ts';

// A strong acid fully ionised (hydronium ions and anions only) beside a weak acid that is mostly whole molecules.
const boxes = figure(
  'f',
  [
    acidBox({ name: 's', at: [0, 0], size: 5.4, ions: 6, molecules: 0, seed: 5, label: '\\ce{HCl(aq)}' }),
    acidBox({ name: 'w', at: [6.2, 0], size: 5.4, ions: 1, molecules: 8, seed: 8, label: '\\ce{CH3COOH(aq)}' }),
    legend({
      name: 'key',
      at: [12.3, 4.0],
      gap: 1.2,
      entries: [
        { id: 'h3o', tones: ['bad'], tex: '\\ce{H3O+}' },
        { id: 'anion', tones: ['good'], tex: '\\text{anion}' },
        { id: 'acid', tones: ['muted', 'good'], tex: '\\text{whole molecule}' },
      ],
    }),
    frame('room', [-0.2, -1.2], [16.6, 5.6]),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-3-8',
  lessonId: 'c20-3-8',
  title: 'Strong and Weak Acids and Bases, Part 1: Strong and Weak Acids',
  thumbnailTitle: 'Strong and Weak Acids',
  thumbnail: 'f',
  summary:
    'A strong acid ionises completely in water, so no acid molecules are left; a weak acid ionises only partly, and most of its molecules stay whole. The six common strong acids are HCl, HBr, HI, HNO₃, H₂SO₄ and HClO₄; most other acids, including HF, HNO₂ and CH₃COOH, are weak.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Strong and Weak Acids', subtitle: 'How far an acid ionises' }],
      lines: [
        { say: 'Drop magnesium ribbon into zero point one zero moles per litre hydrochloric acid, and it fizzes hard. In acetic acid of the same concentration, only a few bubbles rise.', caption: 'Drop magnesium ribbon into 0.10 mol/L hydrochloric acid, and it fizzes hard. In acetic acid of the same concentration, only a few bubbles rise.', show: 'title' },
        { say: 'In this part, you will see why some acids are strong and others weak, and learn the six common strong acids. Later parts separate strength from concentration, and find the p H of strong acids and bases.', caption: 'In this part, you will see why some acids are strong and others weak, and learn the six common strong acids. Later parts separate strength from concentration, and find the pH of strong acids and bases.' },
      ],
    },
    {
      chapter: 'How far an acid ionises',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'strong', tone: 'definition', title: 'Strong acid', md: 'An acid that **ionises completely** in water: every molecule gives its hydrogen ion to water, so no acid molecules are left.' },
        { kind: 'callout', id: 'weak', tone: 'definition', title: 'Weak acid', md: 'An acid that **ionises only partly**: only a small fraction of its molecules ionise, and most stay whole.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HCl(aq) + H2O(l) -> H3O+(aq) + Cl-(aq)}', '\\ce{CH3COOH(aq) + H2O(l) <=> H3O+(aq) + CH3COO-(aq)}'] },
      ],
      lines: [
        { say: 'In lesson three point six, an acid gave a hydrogen ion to water, forming the hydronium ion. This reaction is ionisation: molecules of the acid become ions. Acids differ in how far it goes.', caption: 'In lesson 3.6, an acid gave a hydrogen ion to water, forming the hydronium ion. This reaction is ionisation: molecules of the acid become ions. Acids differ in how far it goes.' },
        { say: 'A strong acid ionises completely. Every molecule gives its hydrogen ion to water, so no acid molecules are left. Hydrochloric acid is strong.', show: ['strong', 'm.0'], focus: 'm.0' },
        { say: 'A weak acid ionises only partly: only a small fraction of its molecules ionise, and most stay whole. Acetic acid is weak. The double arrow shows that its reaction goes both ways.', show: ['weak', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Inside the two solutions',
      layout: 'center',
      main: [boxes],
      lines: [
        { say: 'Picture one hundred molecules of each acid, dropped into water at zero point one zero moles per litre.', caption: 'Picture 100 molecules of each acid, dropped into water at 0.10 mol/L.', show: ['f.s-box', 'f.s-label', 'f.w-box', 'f.w-label'] },
        { say: 'The hydrochloric acid ionises completely. Every molecule becomes a hydronium ion, in red, and a chloride ion, in green. No whole molecules are left.', show: ['f.s-h3o', 'f.s-anion', 'f.key-h3o', 'f.key-anion'], focus: ['f.s-h3o', 'f.s-anion'] },
        { say: 'Only about one molecule in one hundred of acetic acid ionises. So nearly all the particles are whole molecules, and there are very few ions.', show: ['f.w-acid', 'f.w-h3o', 'f.w-anion', 'f.key-acid'], focus: 'f.w-acid' },
      ],
    },
    {
      chapter: 'Counting the particles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['From 100 molecules', 'Hydrochloric acid, $\\ce{HCl}$', 'Acetic acid, $\\ce{CH3COOH}$'],
          rows: [
            ['acid molecules still whole', '0', 'about 99'],
            ['hydronium ions, $\\ce{H3O+}$', '100', 'about 1'],
            ['anions', '100 $\\ce{Cl-}$', 'about 1 $\\ce{CH3COO-}$'],
          ],
        },
      ],
      lines: [
        { say: 'Count the particles from one hundred molecules. Hydrochloric acid leaves no whole molecules, but one hundred hydronium ions and one hundred chloride ions.', show: 't', focus: 't' },
        { say: 'Acetic acid leaves about ninety-nine whole molecules, with only about one hydronium ion and one acetate ion.' },
      ],
    },
    {
      chapter: 'The six strong acids',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Strong acid', 'Formula', 'Weak acid', 'Formula'],
          rows: [
            ['hydrochloric acid', '$\\ce{HCl}$', 'hydrofluoric acid', '$\\ce{HF}$'],
            ['hydrobromic acid', '$\\ce{HBr}$', 'nitrous acid', '$\\ce{HNO2}$'],
            ['hydroiodic acid', '$\\ce{HI}$', 'sulfurous acid', '$\\ce{H2SO3}$'],
            ['nitric acid', '$\\ce{HNO3}$', 'phosphoric acid', '$\\ce{H3PO4}$'],
            ['sulfuric acid', '$\\ce{H2SO4}$', 'carbonic acid', '$\\ce{H2CO3}$'],
            ['perchloric acid', '$\\ce{HClO4}$', 'acetic acid', '$\\ce{CH3COOH}$'],
          ],
        },
      ],
      lines: [
        { say: 'Only a handful of common acids are strong, so it pays to learn them: hydrochloric, hydrobromic, hydroiodic, nitric, sulfuric and perchloric acid.', show: 't' },
        { say: 'Most other acids are weak, including hydrofluoric, nitrous, sulfurous, phosphoric, carbonic and acetic acid.' },
        { say: 'Watch the look-alikes. Hydrofluoric acid looks like hydrochloric, hydrobromic and hydroiodic acid, but it is weak.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'And nitrous and sulfurous acid are weak, even though nitric and sulfuric acid are strong. Check the list, rather than the look of the formula.', focus: ['t.1', 't.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a strong acid?',
          choices: ['hydrobromic acid, $\\ce{HBr(aq)}$', 'hydrofluoric acid, $\\ce{HF(aq)}$', 'nitrous acid, $\\ce{HNO2(aq)}$', 'acetic acid, $\\ce{CH3COOH(aq)}$'],
          answer: 0,
          working: 'Hydrobromic acid is one of the six common strong acids: it ionises completely in water. The other three are weak.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a strong acid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, hydrobromic acid, one of the six strong acids. Choice B, hydrofluoric acid, looks like it, but it is weak. Nitrous and acetic acid are weak too.', show: 'q.answer' },
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
            'A **strong acid** ionises completely in water; a **weak acid** ionises only partly, and most of its molecules stay whole.',
            'The six common strong acids: $\\ce{HCl}$, $\\ce{HBr}$, $\\ce{HI}$, $\\ce{HNO3}$, $\\ce{H2SO4}$ and $\\ce{HClO4}$.',
            'Most other acids, including $\\ce{HF}$, $\\ce{HNO2}$ and $\\ce{CH3COOH}$, are weak.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strong acid ionises completely in water. A weak acid ionises only partly, and most of its molecules stay whole.', show: 'sum.0' },
        { say: 'The six common strong acids are hydrochloric, hydrobromic, hydroiodic, nitric, sulfuric and perchloric acid.', show: 'sum.1' },
        { say: 'Most other acids, including hydrofluoric, nitrous and acetic acid, are weak. In part two, you will see why strong is not the same as concentrated. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
