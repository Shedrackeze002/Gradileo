import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bondPair, enTable } from './lib/c20-1a-figures.ts';

// A tug-of-war: hydrogen shares its pair evenly; in hydrogen chloride the pair sits nearer chlorine.
const tug = figure(
  'tug',
  [
    bondPair({ name: 'hh', at: [0, 2.6], a: 'H', b: 'H', t: 0.5, label: '\\text{hydrogen: shared evenly}' }),
    bondPair({ name: 'hcl', at: [0, 0], a: 'H', b: 'Cl', t: 0.68, label: '\\text{hydrogen chloride: pulled towards Cl}' }),
  ],
  460,
);

// The course's electronegativity values, with a few cells ringed.
const values = figure('en', [enTable({ highlights: [{ id: 'key', cells: ['H', 'C', 'N', 'O', 'Cl'], tone: 'theta' }] })], 600);

// The same table with the trends: most electronegative at the top right, least at the bottom left.
const trends = figure(
  'en',
  [
    enTable({
      highlights: [
        { id: 'top', cells: ['F', 'O', 'N', 'Cl'], tone: 'good' },
        { id: 'low', cells: ['Cs'], tone: 'opp' },
      ],
    }),
  ],
  580,
);

const video: Explainer = {
  id: 'c20-1-4',
  lessonId: 'c20-1-4',
  title: 'Electronegativity and Bond Types, Part 1: Electronegativity',
  thumbnailTitle: 'Electronegativity',
  thumbnail: 'en',
  summary:
    'Electronegativity is how strongly an atom in a bond attracts the shared electrons; on the Pauling scale fluorine is highest, at 4.0. It increases across a period, because the nucleus gains protons while the valence electrons stay in the same level, and decreases down a group, because the valence electrons are farther away and more shielded. So chlorine (3.2) is more electronegative than sulfur (2.6), and oxygen (3.4) more than sulfur.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Electronegativity', subtitle: 'A tug-of-war over shared electrons' }],
      lines: [
        { say: 'In a molecule of hydrogen, two identical atoms share a pair of electrons perfectly evenly. In hydrogen chloride, the chlorine atom pulls the shared pair closer to itself.', show: 'title' },
        { say: 'This lesson measures that pull. This part shows what electronegativity is and how it changes across the periodic table; the later parts use it to sort bonds into three kinds.' },
      ],
    },
    {
      chapter: 'A tug-of-war',
      layout: 'split',
      leftWidth: 560,
      left: [tug],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Electronegativity', md: 'How strongly an atom in a bond attracts the **shared electrons**. It has no units. On the **Pauling scale**, fluorine is highest, at $4.0$.' }],
      lines: [
        { say: 'Picture a bond as a tug-of-war over the shared electrons. Two hydrogen atoms pull equally, so the pair sits in the middle.', show: ['tug.hh-a', 'tug.hh-b', 'tug.hh-pair', 'tug.hh-label'] },
        { say: 'In hydrogen chloride, chlorine pulls harder, so the shared pair sits closer to the chlorine atom.', show: ['tug.hcl-a', 'tug.hcl-b', 'tug.hcl-pair', 'tug.hcl-label'], focus: 'tug.hcl-pair' },
        { say: 'How hard an atom pulls is its electronegativity: how strongly an atom in a bond attracts the shared electrons. It is a number with no units.', show: 'def' },
        { say: 'Most books use the Pauling scale, on which fluorine has the highest value, four point zero.' },
      ],
    },
    {
      chapter: 'The values',
      layout: 'center',
      main: [values],
      lines: [
        { say: 'This course uses these Pauling values, rounded to one decimal place. The deeper the colour, the higher the value.', show: 'en.table' },
        { say: 'Hydrogen is two point two, carbon two point six, nitrogen three point zero, oxygen three point four, and chlorine three point two.', show: 'en.key', focus: 'en.key' },
        { say: 'Other tables may round a few values differently: carbon is sometimes listed as two point five. So always use the values a question gives you.', hide: 'en.key' },
      ],
    },
    {
      chapter: 'Trends in the table',
      layout: 'center',
      main: [trends],
      lines: [
        { say: 'Across a period, from left to right, electronegativity increases. Each step adds a proton to the nucleus, while the valence electrons stay in the same level, so the pull on shared electrons is stronger.', show: ['en.table', 'en.across'], focus: 'en.across' },
        { say: 'Down a group, it decreases. Each step adds an energy level, so the valence electrons are farther from the nucleus, and shielded by more inner electrons.', show: 'en.down', focus: 'en.down' },
        { say: 'So the most electronegative elements are non-metals at the top right: fluorine, oxygen, nitrogen and chlorine. The least electronegative are metals at the bottom left, such as caesium.', show: ['en.top', 'en.low'], focus: ['en.top', 'en.low'] },
        { say: 'Noble gases are usually not given values. They already have full valence shells and rarely form bonds, so there is little to measure.' },
      ],
    },
    {
      chapter: 'Using the trends',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Without the table: which is more electronegative, sulfur or chlorine? Oxygen or sulfur?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{S, Cl: same period, Cl further right} \\;\\Rightarrow\\; \\text{Cl}', '\\text{O, S: same group, O higher up} \\;\\Rightarrow\\; \\text{O}', '\\text{Cl } 3.2 > \\text{S } 2.6 \\qquad \\text{O } 3.4 > \\text{S } 2.6'] },
      ],
      lines: [
        { say: 'Without the table, which is more electronegative: sulfur or chlorine? And oxygen or sulfur?', show: 'q' },
        { say: 'Sulfur and chlorine are in the same period, and chlorine is further right, so chlorine is more electronegative.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen and sulfur are in the same group, and oxygen is higher up, so oxygen is more electronegative.', show: 'm.1', focus: 'm.1' },
        { say: 'The table agrees: chlorine is three point two and oxygen three point four, against two point six for sulfur.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Using only the trends in the periodic table, which list puts fluorine, chlorine and bromine (all in group 17) in order of **increasing** electronegativity?',
          choices: ['F, Cl, Br', 'Cl, F, Br', 'Cl, Br, F', 'Br, Cl, F'],
          answer: 3,
          working: 'Electronegativity decreases down a group, so it increases going up: Br (3.0), then Cl (3.2), then F (4.0).',
        },
      ],
      lines: [
        { say: 'Your turn. Using only the trends, which list puts fluorine, chlorine and bromine, all in group seventeen, in order of increasing electronegativity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: bromine, chlorine, then fluorine. Electronegativity decreases down a group, so it increases going up. Choice A is the order backwards.', show: 'q.answer' },
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
            '**Electronegativity**: how strongly an atom in a bond attracts the shared electrons; fluorine is highest, at $4.0$.',
            'It **increases** across a period and **decreases** down a group.',
            'Most electronegative: F, O, N, Cl at the top right; least: metals at the bottom left.',
            'Use the values a question gives you.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Electronegativity is how strongly an atom in a bond attracts the shared electrons, and fluorine is the highest.', show: 'sum.0' },
        { say: 'It increases across a period and decreases down a group.', show: 'sum.1' },
        { say: 'So the most electronegative elements are at the top right, and the least at the bottom left.', show: 'sum.2' },
        { say: 'And always use the values a question gives you. In part two, you will use electronegativity to classify bonds. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
