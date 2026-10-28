import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { arrow, chargeBars, curvedArrow, lattice, tag } from './lib/c20-1a-figures.ts';

// A sodium atom (one valence electron) gives it to a chlorine atom (seven): Na⁺ and Cl⁻ with eight.
const transfer = figure(
  'dc',
  [
    lewis({ name: 'na', atoms: [{ id: 'a', symbol: 'Na', at: [0, 0], dots: [0, 1, 0, 0] }] }),
    lewis({ name: 'cl', atoms: [{ id: 'a', symbol: 'Cl', at: [3.1, 0], dots: [2, 2, 2, 1] }] }),
    curvedArrow('move', [0.5, 0.2], [2.55, 0.2], 0.45),
    arrow('react', [4.4, 0], [5.9, 0]),
    lewis({ name: 'nai', atoms: [{ id: 'a', symbol: 'Na', at: [7.6, 0] }], charge: '+' }),
    lewis({ name: 'cli', atoms: [{ id: 'a', symbol: 'Cl', at: [10.6, 0], dots: [2, 2, 2, 2] }], charge: '-' }),
    tag('na-name', [0, -1.2], '\\text{sodium atom}', { tone: 'muted' }),
    tag('cl-name', [3.1, -1.2], '\\text{chlorine atom}', { tone: 'muted' }),
    tag('nai-name', [7.6, -1.2], '\\text{sodium ion}', { tone: 'opp' }),
    tag('cli-name', [10.6, -1.2], '\\text{chloride ion}', { tone: 'adj' }),
  ],
  320,
);

// A slice of the sodium chloride lattice, with one sodium ion and its four neighbours ringed.
const crystal = figure('lat', [
  lattice({ cols: 5, rows: 5, ring: [2, 2] }),
  tag('key-na', [0.6, -1.25], '\\ce{Na+}', { tone: 'opp' }),
  tag('key-cl', [4.2, -1.25], '\\ce{Cl-}', { tone: 'adj' }),
]);

// Two Al³⁺ (3 + 3) cancel three O²⁻ (2 + 2 + 2).
const bars = figure('bars', [chargeBars({ plus: { count: 2, size: 3, tex: '\\ce{Al^3+}' }, minus: { count: 3, size: 2, tex: '\\ce{O^2-}' } })], 300);

const video: Explainer = {
  id: 'c20-1-2',
  lessonId: 'c20-1-2',
  title: 'Ionic Compounds, Part 1: Ionic Bonds and Formulas',
  thumbnailTitle: 'Ionic Bonds and Formulas',
  thumbnail: 'dc',
  summary:
    'When a metal reacts with a non-metal, electrons transfer from the metal atoms to the non-metal atoms, and the oppositely charged ions attract: an ionic bond. The ions form a crystal lattice, so a formula such as NaCl gives the ratio of the ions. To write a formula, use the fewest ions whose charges add up to zero, from the lowest common multiple of the charges: aluminium oxide is Al2O3, magnesium nitride Mg3N2 and calcium oxide CaO.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Ionic Bonds and Formulas', subtitle: 'Charges that cancel' }],
      lines: [
        { say: 'Sodium is a soft metal that reacts violently with water, and chlorine is a poisonous gas. Yet together they make table salt.', show: 'title' },
        { say: 'This part shows how the ions hold together, and how to write the formulas of ionic compounds. The later parts cover polyatomic ions, names and properties.' },
      ],
    },
    {
      chapter: 'Electron transfer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{2Na + Cl2 -> 2NaCl}'] },
        transfer,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ionic bond', md: 'The attraction between oppositely charged ions, cations and anions, that forms after electrons transfer from a metal to a non-metal.' },
      ],
      lines: [
        { say: 'When a metal reacts with a non-metal, electrons move from the metal atoms to the non-metal atoms.', show: 'eq' },
        { say: 'Here, valence electrons are drawn as dots: sodium has one, and chlorine has seven.', show: ['dc.na-a', 'dc.na-a-dots', 'dc.cl-a', 'dc.cl-a-dots', 'dc.na-name', 'dc.cl-name'] },
        { say: 'Each sodium atom gives its one valence electron to a chlorine atom.', show: 'dc.move', focus: ['dc.move', 'dc.na-a-dots'] },
        { say: 'Sodium becomes a sodium ion, one plus. Chlorine, now with eight valence electrons, becomes a chloride ion, one minus.', show: ['dc.react', 'dc.nai-a', 'dc.nai-bracket', 'dc.cli-a', 'dc.cli-a-dots', 'dc.cli-bracket', 'dc.nai-name', 'dc.cli-name'], focus: ['dc.nai-bracket', 'dc.cli-bracket'] },
        { say: 'Opposite charges attract. The attraction between the ions is called an ionic bond.', show: 'def' },
      ],
    },
    {
      chapter: 'A crystal lattice',
      layout: 'split',
      leftWidth: 460,
      left: [crystal],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Crystal lattice', md: 'A regular, repeating, three-dimensional arrangement of ions. In sodium chloride, each $\\ce{Na+}$ is surrounded by six $\\ce{Cl-}$, and each $\\ce{Cl-}$ by six $\\ce{Na+}$.' },
        { kind: 'callout', id: 'ratio', tone: 'key', title: 'A formula is a ratio', md: 'An ionic compound is not made of molecules. $\\ce{NaCl}$ means one sodium ion for every chloride ion.' },
      ],
      lines: [
        { say: 'The ions do not pair off. In solid sodium chloride, ions of opposite charge pack together in a regular pattern.', show: ['lat.cations', 'lat.anions', 'lat.key-na', 'lat.key-cl'] },
        { say: 'Each sodium ion is surrounded by six chloride ions, four in this flat slice and two more above and below it. And each chloride ion is surrounded by six sodium ions.', show: 'lat.ring' },
        { say: 'This regular, repeating, three-dimensional arrangement of ions is called a crystal lattice.', show: 'def' },
        { say: 'So there are no molecules. A grain of salt is one huge lattice, and the formula N A C L gives the ratio: one sodium ion for every chloride ion.', caption: 'So there are no molecules. A grain of salt is one huge lattice, and the formula NaCl gives the ratio: one sodium ion for every chloride ion.', show: 'ratio' },
      ],
    },
    {
      chapter: 'Writing formulas',
      layout: 'split',
      leftWidth: 520,
      left: [bars],
      right: [
        { kind: 'text', id: 'rule', size: 'md', md: 'Use the **fewest ions whose charges add up to zero**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Al^3+} \\text{ and } \\ce{O^2-}', '\\text{LCM of 3 and 2} = 6', '\\text{Al: } 6 \\div 3 = 2 \\text{ ions, } 6{+}', '\\text{O: } 6 \\div 2 = 3 \\text{ ions, } 6{-}', '\\ce{Al2O3}'] },
      ],
      lines: [
        { say: 'A compound has no overall charge, so its positive and negative charges must cancel. Use the fewest ions whose charges add up to zero.', show: 'rule' },
        { say: 'Take aluminium oxide. First, write its ions with their charges: aluminium three plus, and oxide two minus.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, find the lowest common multiple of the sizes of the charges. For three and two, it is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide it by each charge: two aluminium ions give six plus, and three oxide ions give six minus.', show: ['m.2', 'm.3', 'bars.p0', 'bars.p1', 'bars.p-total', 'bars.m0', 'bars.m1', 'bars.m2', 'bars.m-total'], focus: ['m.2', 'm.3'] },
        { say: 'Write the cation first, with the numbers as subscripts: A L two O three. A subscript of one is never written.', caption: 'Write the cation first, with the numbers as subscripts: Al₂O₃. A subscript of 1 is never written.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Use the fewest ions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Mg^2+},\\ \\ce{N^3-}\\text{: LCM } 6 \\;\\Rightarrow\\; \\ce{Mg3N2}', '\\ce{K+},\\ \\ce{S^2-}\\text{: LCM } 2 \\;\\Rightarrow\\; \\ce{K2S}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the fewest ions', md: 'Calcium oxide is $\\ce{CaO}$, not $\\ce{Ca2O2}$: one $\\ce{Ca^2+}$ already cancels one $\\ce{O^2-}$. If you swap the sizes of the charges into subscripts as a shortcut, always reduce to the lowest ratio.' },
      ],
      lines: [
        { say: 'In the same way, magnesium nitride needs three magnesium ions and two nitride ions.', show: 'm.0', focus: 'm.0' },
        { say: 'Potassium sulfide needs two potassium ions and one sulfide ion.', show: 'm.1', focus: 'm.1' },
        { say: 'Always use the fewest ions. Calcium oxide is C A O, not C A two O two: one calcium ion already cancels one oxide ion.', caption: 'Always use the fewest ions. Calcium oxide is CaO, not Ca₂O₂: one calcium ion already cancels one oxide ion.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calcium forms $\\ce{Ca^2+}$ and nitrogen forms the nitride ion, $\\ce{N^3-}$. What is the formula of calcium nitride?',
          choices: ['$\\ce{CaN}$', '$\\ce{Ca2N3}$', '$\\ce{Ca3N2}$', '$\\ce{Ca3N}$'],
          answer: 2,
          working: 'The LCM of $2$ and $3$ is $6$: three $\\ce{Ca^2+}$ give 6+ and two $\\ce{N^3-}$ give 6−.',
        },
      ],
      lines: [
        { say: 'Your turn. Calcium forms a two plus ion, and the nitride ion is three minus. What is the formula of calcium nitride? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, C A three N two: three calcium ions give six plus, and two nitride ions six minus. In Choice B, four plus and nine minus do not cancel.', caption: 'The answer is C, Ca₃N₂: three calcium ions give 6+, and two nitride ions 6−. In Choice B, 4+ and 9− do not cancel.', show: 'q.answer' },
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
            'An **ionic bond** is the attraction between oppositely charged ions, after electrons transfer from a metal to a non-metal.',
            'Ionic compounds are **crystal lattices** of ions; the formula gives the ratio of the ions.',
            'Use the fewest ions whose charges add up to zero: the LCM of the charges.',
            'Cation first; reduce to the lowest ratio: $\\ce{CaO}$, not $\\ce{Ca2O2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ionic bond is the attraction between oppositely charged ions, after electrons move from a metal to a non-metal.', show: 'sum.0' },
        { say: 'Ionic compounds are crystal lattices of ions, and the formula gives the ratio of the ions.', show: 'sum.1' },
        { say: 'For a formula, use the fewest ions whose charges add up to zero.', show: 'sum.2' },
        { say: 'Write the cation first, and keep the lowest ratio. In part two, you will write formulas with polyatomic ions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
