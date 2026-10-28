import type { Explainer } from '@/video/script.ts';
import { atomShells, periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { bracket, columnRow, tag } from './lib/c20-1a-figures.ts';

// A sodium atom (2, 8, 1); losing its third level leaves the sodium ion (2, 8) in brackets.
const sodium = figure(
  'na',
  [
    atomShells({ name: 'a', protons: 11, neutrons: 12, shells: [2, 8, 1], r: 1.5, gap: 1.05 }),
    bracket({ c: [0, 0], half: [4.05, 4.05], charge: '+', tone: 'opp' }),
    tag('atom', [0, -5.3], '\\text{sodium atom: 2, 8, 1}', { tone: 'muted' }),
    tag('ion', [0, -5.3], '\\text{sodium ion: 2, 8}', { tone: 'opp' }),
  ],
  560,
);

// A chlorine atom (2, 8, 7); gaining one electron gives the chloride ion (2, 8, 8) in brackets.
const chlorine = figure(
  'cl',
  [
    atomShells({ name: 'a', protons: 17, neutrons: 18, shells: [2, 8, 7], r: 1.6, gap: 1.0 }),
    atomShells({ name: 'b', protons: 17, neutrons: 18, shells: [2, 8, 8], r: 1.6, gap: 1.0 }),
    bracket({ c: [0, 0], half: [5.0, 5.0], charge: '-', tone: 'adj' }),
    tag('atom', [0, -6.1], '\\text{chlorine atom: 2, 8, 7}', { tone: 'muted' }),
    tag('ion', [0, -6.1], '\\text{chloride ion: 2, 8, 8}', { tone: 'adj' }),
  ],
  580,
);

// The first 20 elements, with the charge of each group's ions under its column.
const chargeTable = figure('pt', [
  periodicTable({
    upTo: 20,
    highlights: [
      { id: 'metals', cells: ['Li', 'Na', 'K', 'Be', 'Mg', 'Ca', 'Al'], tone: 'opp' },
      { id: 'nonmetals', cells: ['N', 'O', 'F', 'P', 'S', 'Cl'], tone: 'adj' },
    ],
  }),
  columnRow({
    cols: [
      [1, '1+', 'opp'],
      [2, '2+', 'opp'],
      [13, '3+', 'opp'],
      [15, '3{-}', 'adj'],
      [16, '2{-}', 'adj'],
      [17, '1{-}', 'adj'],
    ],
  }),
]);

const video: Explainer = {
  id: 'c20-1-1-c',
  lessonId: 'c20-1-1',
  title: 'Atoms, Ions and the Periodic Table, Part 3: How Atoms Become Ions',
  thumbnailTitle: 'How Atoms Become Ions',
  thumbnail: 'na',
  summary:
    'Atoms of main-group elements gain or lose electrons until they have the electron arrangement of the nearest noble gas, usually a stable octet. Metals lose electrons and form cations, such as Na+ (2, 8, like neon); non-metals gain electrons and form anions, such as Cl- (2, 8, 8, like argon). The charge follows from the group: 1+, 2+ and 3+ for groups 1, 2 and 13, and 3-, 2- and 1- for groups 15, 16 and 17.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'How Atoms Become Ions', subtitle: 'Losing and gaining electrons' }],
      lines: [
        { say: 'Neon and argon hardly react with anything. Sodium and chlorine react fiercely. The difference is in how full their outer energy levels are.', show: 'title' },
        { say: 'In this part, you will see how a sodium atom and a chlorine atom become ions, and read the charge of any main-group ion from its group.' },
      ],
    },
    {
      chapter: 'A stable octet',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oct', tone: 'key', title: 'Stable octet', md: 'The noble gases hardly react, because their outer level is full: $8$ valence electrons ($2$ for helium). Other main-group atoms gain or lose electrons until they have the same arrangement as the **nearest noble gas**.' },
        { kind: 'callout', id: 'ion', tone: 'definition', title: 'Ion, cation and anion', md: 'An **ion** has a charge, because its electrons do not equal its protons. A **cation** is a positive ion: the atom **lost** electrons. An **anion** is a negative ion: the atom **gained** electrons.' },
      ],
      lines: [
        { say: 'The noble gases hardly react, because their outer energy level is full: eight valence electrons, called a stable octet, or two for helium.', show: 'oct' },
        { say: 'Other main-group atoms gain or lose electrons until they have the same arrangement as the nearest noble gas.' },
        { say: 'An ion is an atom or group of atoms with a charge, because its electrons do not equal its protons.', show: 'ion' },
        { say: 'A cation is a positive ion, formed when an atom loses electrons. An anion is a negative ion, formed when an atom gains electrons.' },
      ],
    },
    {
      chapter: 'Metals lose electrons',
      layout: 'split',
      leftWidth: 500,
      left: [sodium],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{11 protons, 11 electrons}', '\\text{loses 1: 2, 8, like neon}', '\\text{charge: } 11 - 10 = +1', '\\ce{Na+}\\text{, the sodium ion}'] }],
      lines: [
        { say: 'Metals lose electrons. A sodium atom has eleven protons and eleven electrons, arranged two, eight, one.', show: ['na.a-nucleus', 'na.a-shell-1', 'na.a-shell-2', 'na.a-shell-3', 'na.atom', 'm.0'], focus: 'm.0' },
        { say: 'Losing its one valence electron leaves ten electrons, arranged two, eight: the same arrangement as neon.', hide: ['na.a-shell-3', 'na.atom'], show: ['m.1', 'na.ion'], focus: ['m.1', 'na.a-shell-2'] },
        { say: 'With eleven protons and only ten electrons, the ion has one more positive charge than negative: a charge of one plus.', show: ['m.2', 'na.bracket'], focus: ['m.2', 'na.bracket'] },
        { say: 'This is the sodium ion, N A plus. The square brackets show that the charge belongs to the whole ion.', caption: 'This is the sodium ion, written Na⁺. The square brackets show that the charge belongs to the whole ion.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Non-metals gain electrons',
      layout: 'split',
      leftWidth: 500,
      left: [chlorine],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{17 protons, 17 electrons}', '\\text{gains 1: 2, 8, 8, like argon}', '\\text{charge: } 17 - 18 = -1', '\\ce{Cl-}\\text{, the chloride ion}'] }],
      lines: [
        { say: 'Non-metals gain electrons. A chlorine atom has seventeen protons and seventeen electrons, arranged two, eight, seven.', show: ['cl.a-nucleus', 'cl.a-shell-1', 'cl.a-shell-2', 'cl.a-shell-3', 'cl.atom', 'm.0'], focus: 'm.0' },
        { say: 'Gaining one electron gives eighteen electrons, arranged two, eight, eight: the same arrangement as argon.', hide: ['cl.a-shell-3', 'cl.atom'], show: ['cl.b-shell-3', 'cl.ion', 'm.1'], focus: ['m.1', 'cl.b-e-3-7'] },
        { say: 'With seventeen protons and eighteen electrons, there is one more negative charge than positive: a charge of one minus.', show: ['m.2', 'cl.bracket'], focus: ['m.2', 'cl.bracket'] },
        { say: 'This is the chloride ion, C L minus. Its name changes the ending of chlorine to chloride.', caption: 'This is the chloride ion, Cl⁻. Its name changes the ending of chlorine to chloride.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The charge from the group',
      layout: 'split',
      leftWidth: 640,
      left: [chargeTable],
      right: [
        {
          kind: 'table',
          id: 'g',
          head: ['Group', 'Valence', 'Electrons', 'Charge'],
          rows: [
            ['1', '1', 'lose 1', '1+'],
            ['2', '2', 'lose 2', '2+'],
            ['13', '3', 'lose 3', '3+'],
            ['15', '5', 'gain 3', '3−'],
            ['16', '6', 'gain 2', '2−'],
            ['17', '7', 'gain 1', '1−'],
          ],
        },
      ],
      lines: [
        { say: 'So the charge of a main-group ion follows from its group.', show: 'pt.table' },
        { say: 'Metals in groups one, two and thirteen lose one, two or three electrons: charges of one plus, two plus and three plus.', show: ['pt.metals', 'g.0', 'g.1', 'g.2', 'pt.c1', 'pt.c2', 'pt.c13'], focus: ['g.0', 'g.1', 'g.2'] },
        { say: 'Non-metals in groups fifteen, sixteen and seventeen gain three, two or one, to complete an octet: three minus, two minus and one minus.', show: ['pt.nonmetals', 'g.3', 'g.4', 'g.5', 'pt.c15', 'pt.c16', 'pt.c17'], focus: ['g.3', 'g.4', 'g.5'] },
        { say: 'Carbon and silicon, in group fourteen, would have to gain or lose four electrons, so they usually share electrons instead. And the noble gases, already full, do not form ions.', focus: 'g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Barium is a metal in group $2$. Which ion does barium form?',
          choices: ['$\\ce{Ba^2+}$', '$\\ce{Ba^2-}$', '$\\ce{Ba+}$', '$\\ce{Ba^6-}$'],
          answer: 0,
          working: 'Group $2$: $2$ valence electrons. A metal loses them, leaving $2$ more protons than electrons: a charge of 2+.',
        },
      ],
      lines: [
        { say: 'Your turn. Barium is a metal in group two. Which ion does barium form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, barium two plus. Barium has two valence electrons, and as a metal it loses both. Choice B has the wrong sign: losing electrons makes an ion positive.', show: 'q.answer' },
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
            'Atoms gain or lose electrons to reach the arrangement of the nearest noble gas, usually an octet.',
            'Metals lose electrons and form **cations**; non-metals gain electrons and form **anions**.',
            'Groups 1, 2 and 13 form 1+, 2+ and 3+ ions; groups 15, 16 and 17 form 3−, 2− and 1− ions.',
            'Groups 14 and 18 do not usually form ions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Atoms gain or lose electrons to reach the arrangement of the nearest noble gas, usually an octet.', show: 'sum.0' },
        { say: 'Metals lose electrons and form cations. Non-metals gain electrons and form anions.', show: 'sum.1' },
        { say: 'Groups one, two and thirteen form ions of one plus, two plus and three plus. Groups fifteen, sixteen and seventeen form three minus, two minus and one minus.', show: 'sum.2' },
        { say: 'Groups fourteen and eighteen do not usually form ions. In part four, you will name ions and count their electrons. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
