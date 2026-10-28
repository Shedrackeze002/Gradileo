import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bondPair, enScale } from './lib/c20-1a-figures.ts';

// Hydrogen chloride: the shared pair sits nearer chlorine, which is δ−; hydrogen is δ+.
const hcl = figure('hcl', [bondPair({ a: 'H', b: 'Cl', t: 0.68, gap: 2.6, deltas: ['\\delta+', '\\delta-'] })], 380);

// An O–H bond in water: the pair sits nearer oxygen, which is δ−; hydrogen is δ+.
const oh = figure('oh', [bondPair({ a: 'O', b: 'H', t: 0.32, gap: 2.6, deltas: ['\\delta-', '\\delta+'] })], 380);

// Bonds on either side of the 1.7 line differ only a little; Al–I falls in the polar band.
const scale = figure(
  'sc',
  [
    enScale({
      marks: [
        { id: 'a', value: 1.6, tex: '1.6', tone: 'theta' },
        { id: 'b', value: 1.8, tex: '1.8', tone: 'opp' },
        { id: 'ali', value: 1.1, tex: '\\text{Al–I: } 1.1', tone: 'brand' },
      ],
    }),
  ],
  340,
);

const video: Explainer = {
  id: 'c20-1-4-c',
  lessonId: 'c20-1-4',
  title: 'Electronegativity and Bond Types, Part 3: Partial Charges and the Continuum',
  thumbnailTitle: 'Partial Charges',
  thumbnail: 'hcl',
  summary:
    'In a polar covalent bond, the more electronegative atom carries a small negative partial charge, δ−, and the other a small positive partial charge, δ+: in H–Cl, hydrogen is δ+ and chlorine δ−, and in an O–H bond (ΔEN = 3.4 − 2.2 = 1.2) oxygen is δ−. Bonding is a continuum, and books draw the lines at different places, so always use the rule a question gives; Al–I, with ΔEN = 1.1, is polar covalent even though aluminium is a metal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Partial Charges and the Continuum', subtitle: 'Slightly positive, slightly negative' }],
      lines: [
        { say: 'A polar bond is not charged like a pair of ions, but it is not even either: one end is slightly negative, the other slightly positive.', show: 'title' },
        { say: 'In this part, you will mark these partial charges, and see why the lines between the bond types are only a convenient rule.' },
      ],
    },
    {
      chapter: 'Partial charges',
      layout: 'split',
      leftWidth: 520,
      left: [hcl],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Partial charge', md: 'In a polar covalent bond, the more electronegative atom carries a small negative partial charge, $\\delta-$ ("delta minus"), and the other a small positive one, $\\delta+$. They are smaller than the charges of ions, because the electrons are still shared.' }],
      lines: [
        { say: 'In a polar covalent bond, the more electronegative atom carries a small negative partial charge, written delta minus. The other atom carries a small positive partial charge, delta plus.', caption: 'In a polar covalent bond, the more electronegative atom carries a small negative partial charge, written δ−. The other atom carries a small positive partial charge, δ+.', show: 'def' },
        { say: 'These are smaller than the full charges of ions, because the electrons are still shared, not handed over.' },
        { say: 'In hydrogen chloride, chlorine wins the tug-of-war, so the shared pair sits nearer to chlorine.', show: ['hcl.a', 'hcl.b', 'hcl.pair'], focus: 'hcl.pair' },
        { say: 'So chlorine is the slightly negative end, delta minus, and hydrogen is the slightly positive end, delta plus.', caption: 'So chlorine is the slightly negative end, δ−, and hydrogen is the slightly positive end, δ+.', show: 'hcl.deltas', focus: 'hcl.deltas' },
      ],
    },
    {
      chapter: 'The O–H bond',
      layout: 'split',
      leftWidth: 520,
      left: [oh],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{O } 3.4,\\ \\text{H } 2.2', '\\Delta\\text{EN} = 3.4 - 2.2 = 1.2', '0.5 \\le 1.2 < 1.7\\text{: polar covalent}', '\\overset{\\delta-}{\\text{O}}\\text{–}\\overset{\\delta+}{\\text{H}}'] }],
      lines: [
        { say: 'Each water molecule has two bonds between oxygen and hydrogen. Classify one, and mark its partial charges. Oxygen is three point four, and hydrogen two point two.', show: ['m.0', 'oh.a', 'oh.b'], focus: 'm.0' },
        { say: 'The difference is three point four minus two point two, which is one point two.', show: 'm.1', focus: 'm.1' },
        { say: 'One point two is from zero point five up to one point seven, so the bond is polar covalent.', show: ['m.2', 'oh.pair'], focus: 'm.2' },
        { say: 'Oxygen is more electronegative, so oxygen gets delta minus, and hydrogen gets delta plus.', caption: 'Oxygen is more electronegative, so oxygen gets δ−, and hydrogen gets δ+.', show: ['m.3', 'oh.deltas'], focus: ['m.3', 'oh.deltas'] },
      ],
    },
    {
      chapter: 'Where the delta minus goes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Where the δ− goes', md: 'The $\\delta-$ always goes on the atom with the **larger** electronegativity, wherever it is written in the formula. And a polar bond has no full charges: hydrogen chloride gas is made of polar molecules, not of $\\ce{H+}$ and $\\ce{Cl-}$ ions.' }],
      lines: [
        { say: 'The delta minus always goes on the atom with the larger electronegativity, wherever it is written in the formula.', caption: 'The δ− always goes on the atom with the larger electronegativity, wherever it is written in the formula.', show: 'oops' },
        { say: 'And a polar bond has no full charges. Hydrogen chloride gas is made of polar molecules, not of hydrogen ions and chloride ions.' },
      ],
    },
    {
      chapter: 'A continuum, not three boxes',
      layout: 'center',
      main: [
        scale,
        { kind: 'callout', id: 'note', tone: 'key', title: 'Why every question states its rule', md: 'The cut-offs $0.5$ and $1.7$ are convenient lines across a smooth scale, and books draw them in different places (some use $0.4$, some put the ionic line at $2.0$). Always apply the rule a question gives.' },
      ],
      lines: [
        { say: 'Bonds change gradually as the difference grows. A difference of one point six is not very different from one point eight, though they fall on opposite sides of the line.', show: ['sc.axis', 'sc.nonpolar', 'sc.polar', 'sc.ionic', 'sc.a', 'sc.b'], focus: ['sc.a', 'sc.b'] },
        { say: 'The cut-offs are convenient lines across a smooth scale, and books draw them in different places: some use zero point four, and some put the ionic line at two point zero.', show: 'note' },
        { say: 'That is why every Gradileo question tells you the rule it uses. Always apply the rule given.' },
        { say: 'The rule can surprise you. Aluminium is a metal, yet its bond with iodine has a difference of two point seven minus one point six, which is one point one: polar covalent.', show: 'sc.ali', focus: 'sc.ali' },
        { say: 'And aluminium iodide does behave more like a molecular substance than an ionic one. The difference is a better guide than metal plus non-metal.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which shows the C–Cl bond correctly? (C $2.6$, Cl $3.2$; a difference from $0.5$ up to $1.7$ is polar covalent.)',
          choices: ['$\\overset{\\delta+}{\\text{C}}\\text{–}\\overset{\\delta-}{\\text{Cl}}$', '$\\overset{\\delta-}{\\text{C}}\\text{–}\\overset{\\delta+}{\\text{Cl}}$', '$\\ce{C+}\\text{–}\\ce{Cl-}$', 'No partial charges: the bond is non-polar.'],
          answer: 0,
          working: '$\\Delta\\text{EN} = 3.2 - 2.6 = 0.6$: polar covalent. Chlorine is more electronegative, so it is $\\delta-$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which shows the bond between carbon and chlorine correctly? Carbon is two point six, and chlorine three point two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The difference is zero point six, so the bond is polar, and chlorine, the more electronegative atom, is delta minus. Choice C shows full charges, but the electrons are still shared.', caption: 'The answer is A. The difference is 0.6, so the bond is polar, and chlorine, the more electronegative atom, is δ−. Choice C shows full charges, but the electrons are still shared.', show: 'q.answer' },
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
            'In a polar bond, the more electronegative atom is $\\delta-$ and the other is $\\delta+$.',
            'Partial charges are smaller than ionic charges: the electrons are still shared.',
            'Bonding is a **continuum**: books draw the lines differently, so use the rule each question gives.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a polar bond, the more electronegative atom is delta minus, and the other is delta plus.', caption: 'Let’s sum up. In a polar bond, the more electronegative atom is δ−, and the other is δ+.', show: 'sum.0' },
        { say: 'Partial charges are smaller than the charges of ions, because the electrons are still shared.', show: 'sum.1' },
        { say: 'And bonding is a continuum, so always use the rule a question gives. That completes this lesson. Next, you will draw the Lewis structures of molecules.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
