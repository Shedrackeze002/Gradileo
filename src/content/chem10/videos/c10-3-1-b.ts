import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { chargeRow } from './lib/c10-3-figures.ts';

// The first 20 elements, metals (orange) and non-metals (blue) that form ions, with the charge of
// each group's ions under its column.
const table = () =>
  figure('pt', [
    periodicTable({
      upTo: 20,
      highlights: [
        { id: 'metals', cells: ['Li', 'Na', 'K', 'Be', 'Mg', 'Ca', 'Al'], tone: 'opp' },
        { id: 'nonmetals', cells: ['N', 'O', 'F', 'P', 'S', 'Cl'], tone: 'adj' },
      ],
    }),
    chargeRow(),
  ]);

const video: Explainer = {
  id: 'c10-3-1-b',
  lessonId: 'c10-3-1',
  title: 'Ions, Part 2: Charges from the Group',
  thumbnailTitle: 'Charges from the Group',
  thumbnail: 'pt',
  summary:
    'Metals lose electrons and form positive ions (cations); non-metals gain electrons and form negative ions (anions). Elements in the same group form ions with the same charge: 1+, 2+ and 3+ for groups 1, 2 and 13, and 3-, 2- and 1- for groups 15, 16 and 17. Magnesium forms Mg2+ and oxygen forms O2-.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 2', title: 'Charges from the Group', subtitle: 'Cations, anions and the periodic table' }],
      lines: [
        { say: 'The elements in a column of the periodic table have the same number of outer electrons. So once you know the column, you know the charge of the ion.', show: 'title' },
        { say: 'In this part, you will see which atoms lose electrons and which gain them, and read the charge of an ion from its group.' },
      ],
    },
    {
      chapter: 'Metals lose, non-metals gain',
      layout: 'split',
      leftWidth: 620,
      left: [table()],
      right: [
        { kind: 'callout', id: 'cat', tone: 'definition', title: 'Cation', md: 'A **cation** is a positive ion. It forms when an atom **loses** electrons; metals form cations.' },
        { kind: 'callout', id: 'an', tone: 'definition', title: 'Anion', md: 'An **anion** is a negative ion. It forms when an atom **gains** electrons; non-metals form anions.' },
      ],
      lines: [
        { say: 'Metals are on the left of the periodic table. Their atoms have only one, two or three outer electrons, and they lose them all.', show: ['pt.table', 'pt.metals'] },
        { say: 'Losing electrons leaves more protons than electrons, so a metal forms a positive ion. A positive ion is called a cation.', show: 'cat' },
        { say: 'Non-metals are on the right. Their atoms have five, six or seven outer electrons, and they gain enough to make eight.', show: 'pt.nonmetals' },
        { say: 'Gaining electrons gives more electrons than protons, so a non-metal forms a negative ion, called an anion.', show: 'an' },
      ],
    },
    {
      chapter: 'The group gives the charge',
      layout: 'split',
      left: [table()],
      right: [
        {
          kind: 'table',
          id: 'g',
          head: ['Group', 'Outer electrons', 'The atom', 'Charge'],
          rows: [
            ['1', '1', 'loses 1', '1+'],
            ['2', '2', 'loses 2', '2+'],
            ['13', '3', 'loses 3', '3+'],
            ['15', '5', 'gains 3', '3−'],
            ['16', '6', 'gains 2', '2−'],
            ['17', '7', 'gains 1', '1−'],
          ],
        },
      ],
      lines: [
        { say: 'The elements in a group have the same number of outer electrons, so they all form ions with the same charge.', show: ['pt.table', 'pt.metals', 'pt.nonmetals'] },
        { say: 'Group one atoms lose one electron, a charge of one plus. Group two atoms lose two, two plus. Group thirteen atoms lose three, three plus.', show: ['g.0', 'g.1', 'g.2', 'pt.q1', 'pt.q2', 'pt.q13'] },
        { say: 'Group fifteen atoms gain three electrons, three minus. Group sixteen atoms gain two, two minus. And group seventeen atoms gain one, one minus.', show: ['g.3', 'g.4', 'g.5', 'pt.q15', 'pt.q16', 'pt.q17'] },
        { say: 'Two groups are missing. Carbon and silicon, in group fourteen, would have to gain or lose four electrons, which is too many, so they share electrons instead. And the noble gases already have full outer shells, so they do not form ions.' },
        { say: 'Some books number only the main groups, one to eight, so group seventeen is called group seven. The charges are the same either way.' },
      ],
    },
    {
      chapter: 'Predicting an ion',
      layout: 'split',
      left: [{ kind: 'math', id: 'mg', size: 'md', align: 'left', lines: ['\\text{Magnesium: group 2}', '\\text{2 outer electrons}', '\\text{a metal: loses both}', '\\text{charge } 2{+} \\;\\Rightarrow\\; \\ce{Mg^2+}'] }],
      right: [{ kind: 'math', id: 'o', size: 'md', align: 'left', lines: ['\\text{Oxygen: group 16}', '\\text{6 outer electrons}', '\\text{a non-metal: gains } 8 - 6 = 2', '\\text{charge } 2{-} \\;\\Rightarrow\\; \\ce{O^2-}'] }],
      lines: [
        { say: 'Let’s predict two ions. Magnesium is in group two, so its atoms have two outer electrons.', show: ['mg.0', 'mg.1'], focus: ['mg.0', 'mg.1'] },
        { say: 'Magnesium is a metal, so its atoms lose both. Each electron lost leaves one extra positive charge, so the charge is two plus: the magnesium ion.', show: ['mg.2', 'mg.3'], focus: ['mg.2', 'mg.3'] },
        { say: 'Oxygen is in group sixteen, so its atoms have six outer electrons.', show: ['o.0', 'o.1'], focus: ['o.0', 'o.1'] },
        { say: 'Oxygen is a non-metal, so its atoms gain eight minus six, which is two electrons, to fill the outer shell. Each electron gained adds one negative charge, so the charge is two minus: the oxide ion.', show: ['o.2', 'o.3'], focus: ['o.2', 'o.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Phosphorus is a non-metal in group $15$. Which ion does it form?',
          choices: ['$\\ce{P^5+}$', '$\\ce{P^5-}$', '$\\ce{P^3-}$', '$\\ce{P^3+}$'],
          answer: 2,
          working: 'Group $15$: $5$ outer electrons. A non-metal gains $8 - 5 = 3$ electrons, so the charge is 3−.',
        },
      ],
      lines: [
        { say: 'Your turn. Phosphorus is a non-metal in group fifteen. Which ion does it form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a charge of three minus. Group fifteen atoms have five outer electrons, and a non-metal gains eight minus five, which is three electrons. Choice A would mean losing five electrons, but non-metals gain electrons.', show: 'q.answer' },
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
            'Metals lose electrons and form positive ions, **cations**.',
            'Non-metals gain electrons and form negative ions, **anions**.',
            'Groups 1, 2 and 13 form 1+, 2+ and 3+ ions; groups 15, 16 and 17 form 3−, 2− and 1− ions.',
            'Groups 14 and 18 do not form ions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Metals lose electrons and form positive ions, called cations.', show: 'sum.0' },
        { say: 'Non-metals gain electrons and form negative ions, called anions.', show: 'sum.1' },
        { say: 'Groups one, two and thirteen form ions with charges of one plus, two plus and three plus. Groups fifteen, sixteen and seventeen form three minus, two minus and one minus.', show: 'sum.2' },
        { say: 'Groups fourteen and eighteen do not form ions. In part three, you will write and name ions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
