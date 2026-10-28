import type { Explainer } from '@/video/script.ts';
import { atomShells, periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { columnRow, tag } from './lib/c20-1a-figures.ts';

// A sodium atom: 11 electrons arranged 2, 8, 1, with its one valence electron in the third level.
const sodium = figure(
  'na',
  [
    atomShells({ protons: 11, neutrons: 12, shells: [2, 8, 1], r: 1.5, gap: 1.05 }),
    tag('name', [0, -5.2], '\\text{sodium: 2, 8, 1}', { tone: 'muted' }),
  ],
  560,
);

// The first 20 elements, with the number of valence electrons under each main-group column.
const valenceTable = (families: boolean) =>
  figure('pt', [
    periodicTable({
      upTo: 20,
      highlights: families
        ? [
            { id: 'alkali', cells: ['Li', 'Na', 'K'], tone: 'opp' },
            { id: 'earth', cells: ['Be', 'Mg', 'Ca'], tone: 'theta' },
            { id: 'halogens', cells: ['F', 'Cl'], tone: 'good' },
            { id: 'noble', cells: ['He', 'Ne', 'Ar'], tone: 'adj' },
          ]
        : [],
    }),
    columnRow({
      cols: [
        [1, '1', 'brand'],
        [2, '2', 'brand'],
        [13, '3', 'brand'],
        [14, '4', 'brand'],
        [15, '5', 'brand'],
        [16, '6', 'brand'],
        [17, '7', 'brand'],
        [18, '8', 'brand'],
      ],
    }),
    tag('row-name', [4, -1.15], '\\text{valence electrons}', { tone: 'brand' }),
  ]);

const video: Explainer = {
  id: 'c20-1-1-b',
  lessonId: 'c20-1-1',
  title: 'Atoms, Ions and the Periodic Table, Part 2: Valence Electrons',
  thumbnailTitle: 'Valence Electrons',
  thumbnail: 'pt',
  summary:
    'Valence electrons are the electrons in an atom’s outermost energy level, the ones that take part in bonding. For main-group elements, groups 1 and 2 have as many valence electrons as their group number, and groups 13 to 18 have the group number minus 10, so calcium has 2 and bromine 7; helium has 2. Elements in the same group have the same number of valence electrons, so they behave alike.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Valence Electrons', subtitle: 'Reading them from the group' }],
      lines: [
        { say: 'Sodium and potassium both fizz when they touch water. Fluorine and chlorine both attack metals. Elements in the same column of the periodic table behave alike, and the reason is their outer electrons.', show: 'title' },
        { say: 'In this part, you will see which electrons an atom uses when it reacts, and find how many it has from its group.' },
      ],
    },
    {
      chapter: 'Energy levels',
      layout: 'split',
      leftWidth: 620,
      left: [sodium],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Valence electron', md: 'An electron in the **outermost occupied energy level** of an atom. Valence electrons are the electrons that take part in chemical bonding.' }],
      lines: [
        { say: 'Electrons are arranged in energy levels, sometimes called shells, around the nucleus. A sodium atom has eleven electrons.', show: 'na.nucleus' },
        { say: 'Two are in the first level, eight in the second, and one in the third.', show: ['na.shell-1', 'na.shell-2', 'na.shell-3', 'na.name'] },
        { say: 'The electrons in the outermost level are the ones an atom uses when it reacts.', focus: 'na.shell-3' },
        { say: 'These are valence electrons: electrons in the outermost occupied energy level. They take part in chemical bonding, and sodium has one.', show: 'def' },
      ],
    },
    {
      chapter: 'Valence electrons from the group',
      layout: 'split',
      leftWidth: 620,
      left: [valenceTable(false)],
      right: [
        { kind: 'callout', id: 'g12', tone: 'key', title: 'Groups 1 and 2', md: 'Valence electrons $=$ the **group number**.' },
        { kind: 'callout', id: 'g13', tone: 'key', title: 'Groups 13 to 18', md: 'Valence electrons $=$ the **group number** $- 10$.' },
      ],
      lines: [
        { say: 'The columns of the periodic table are called groups, numbered one to eighteen. Groups one, two, and thirteen to eighteen hold the main-group elements.', show: 'pt.table' },
        { say: 'For these, the group number gives the valence electrons. In groups one and two, they equal the group number.', show: ['g12', 'pt.c1', 'pt.c2', 'pt.row-name'], focus: ['pt.c1', 'pt.c2'] },
        { say: 'In groups thirteen to eighteen, take ten away: group thirteen has three, group fourteen four, and so on up to eight in group eighteen.', show: ['g13', 'pt.c13', 'pt.c14', 'pt.c15', 'pt.c16', 'pt.c17', 'pt.c18'], focus: ['pt.c13', 'pt.c14', 'pt.c15', 'pt.c16', 'pt.c17', 'pt.c18'] },
        { say: 'The transition metals in groups three to twelve, left out of this table, do not follow the rule.', focus: 'pt' },
      ],
    },
    {
      chapter: 'Families and helium',
      layout: 'split',
      leftWidth: 620,
      left: [valenceTable(true)],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same group, same behaviour', md: 'The same number of valence electrons, so they behave alike.' },
        { kind: 'callout', id: 'he', tone: 'tip', title: 'Helium is the exception', md: 'Group 18, but only $2$ electrons in all: its one level is full with $2$, so **2** valence electrons.' },
      ],
      lines: [
        { say: 'Elements in the same group have the same number of valence electrons, which is why they behave alike.', show: ['pt.table', 'pt.row', 'pt.row-name', 'key'] },
        { say: 'Some groups have family names: the group one metals are the alkali metals, and group two the alkaline-earth metals.', show: ['pt.alkali', 'pt.earth'], focus: ['pt.alkali', 'pt.earth'] },
        { say: 'Group seventeen is the halogens, and group eighteen the noble gases.', show: ['pt.halogens', 'pt.noble'], focus: ['pt.halogens', 'pt.noble'] },
        { say: 'Helium is the exception. It is in group eighteen, but its single energy level is full with two electrons, so it has two valence electrons, not eight.', show: 'he', focus: 'pt.noble-He' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many valence electrons do calcium (group 2) and bromine (group 17) have?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{calcium, group 2:} \\quad 2 \\text{ valence electrons}', '\\text{bromine, group 17:} \\quad 17 - 10 = 7 \\text{ valence electrons}'] },
      ],
      lines: [
        { say: 'How many valence electrons do calcium and bromine have?', show: 'q' },
        { say: 'Calcium is in group two, so it has two.', show: 'm.0', focus: 'm.0' },
        { say: 'Bromine is in group seventeen, so it has seventeen minus ten, which is seven: the same as fluorine and chlorine above it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Selenium is in group $16$ of the periodic table. How many valence electrons does an atom of selenium have?',
          choices: ['$16$', '$2$', '$8$', '$6$'],
          answer: 3,
          working: 'For groups 13 to 18, valence electrons $=$ group number $- 10 = 16 - 10 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Selenium is in group sixteen of the periodic table. How many valence electrons does an atom of selenium have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six. For groups thirteen to eighteen, the valence electrons are the group number minus ten, and sixteen minus ten is six. Choice A, sixteen, is the group number itself, not the number of valence electrons.', show: 'q.answer' },
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
            '**Valence electrons** are in the outermost energy level; they take part in bonding.',
            'Groups 1 and 2: valence electrons = the group number.',
            'Groups 13 to 18: valence electrons = the group number − 10 (helium has 2).',
            'The same group means the same number of valence electrons, so similar behaviour.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Valence electrons are the electrons in the outermost energy level, and they take part in bonding.', show: 'sum.0' },
        { say: 'In groups one and two, the valence electrons equal the group number.', show: 'sum.1' },
        { say: 'In groups thirteen to eighteen, they are the group number minus ten. Helium has two.', show: 'sum.2' },
        { say: 'The same group means the same valence electrons, so similar behaviour. In part three, you will see how atoms gain or lose electrons to become ions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
