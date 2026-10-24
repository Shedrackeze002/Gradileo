import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c10-2-figures.ts';

// Fluorine and chlorine: seven outer electrons each, the outer shell further out in chlorine.
const twoAtoms = figure(
  'at',
  [
    atomShells({ name: 'f', at: [0, 0], nucleus: '\\text{F}', shells: [2, 7], r: 0.9, gap: 0.9 }),
    tag({ id: 'f-name', at: [0, -4.2], tex: '\\text{fluorine, 2,7}' }),
    atomShells({ name: 'cl', at: [7.6, 0], nucleus: '\\text{Cl}', shells: [2, 8, 7], r: 0.9, gap: 0.9 }),
    tag({ id: 'cl-name', at: [7.6, -4.2], tex: '\\text{chlorine, 2,8,7}' }),
  ],
  460,
);

const video: Explainer = {
  id: 'c10-2-5-c',
  lessonId: 'c10-2-5',
  title: 'Families of Elements, Part 3: The Halogens',
  thumbnailTitle: 'The Halogens',
  thumbnail: 'at',
  summary:
    'The halogens of group 17 are reactive, toxic non-metals with 7 outer electrons that exist as molecules of two atoms (F₂, Cl₂, Br₂, I₂) and react with metals to make salts. Down the group their colours darken and their boiling points rise, while their reactivity decreases: larger atoms attract an extra electron less strongly, the opposite of the trend in group 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 3', title: 'The Halogens', subtitle: 'Group 17, and why it gets less reactive' }],
      lines: [
        { say: 'Chlorine is reactive enough to kill the germs in drinking water. It belongs to a family of reactive non-metals called the halogens.', show: 'title' },
        { say: 'In this part, you will meet the halogens, and see why their reactivity runs the opposite way to the alkali metals.' },
      ],
    },
    {
      chapter: 'Salt-formers',
      layout: 'split',
      leftWidth: 560,
      left: [twoAtoms],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$7$ outer electrons: one short of a full shell', 'The name means **salt-former**: they react with metals to make salts', 'Molecules of two atoms: $\\ce{F2}$, $\\ce{Cl2}$, $\\ce{Br2}$, $\\ce{I2}$', 'Toxic'],
        },
      ],
      lines: [
        {
          say: 'The halogens in group seventeen have seven outer electrons, one short of a full shell.',
          show: ['b.0', 'at.f-nucleus', 'at.f-shell-1', 'at.f-shell-2', 'at.f-name', 'at.cl-nucleus', 'at.cl-shell-1', 'at.cl-shell-2', 'at.cl-shell-3', 'at.cl-name'],
          focus: ['b.0', 'at.f-shell-2', 'at.cl-shell-3'],
        },
        { say: 'Their name means salt-former, because they react with metals to make salts, such as sodium chloride.', show: 'b.1', focus: 'b.1' },
        { say: 'Fluorine, chlorine, bromine and iodine all exist as molecules of two atoms, and they are toxic.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Down the group',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Halogen', 'Colour and state at room temperature', 'Boiling point'],
          rows: [
            ['fluorine, $\\ce{F2}$', 'pale yellow gas', '−188 °C'],
            ['chlorine, $\\ce{Cl2}$', 'yellow-green gas', '−34 °C'],
            ['bromine, $\\ce{Br2}$', 'red-brown liquid', '59 °C'],
            ['iodine, $\\ce{I2}$', 'grey-black solid (purple vapour)', '184 °C'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reactivity decreases down group 17', md: 'Fluorine is the most reactive of all the non-metals.' },
      ],
      lines: [
        { say: 'Fluorine is a pale yellow gas, and chlorine a yellow-green gas.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Bromine is a red-brown liquid, and iodine a grey-black solid that gives a purple vapour.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        {
          say: 'Going down the group, the colours get darker, and the melting and boiling points rise: from minus one hundred eighty-eight degrees Celsius for fluorine to one hundred eighty-four for iodine.',
          focus: 't',
        },
        { say: 'Reactivity goes the other way. Reactivity decreases down group seventeen, and fluorine is the most reactive of all the non-metals.', show: 'key' },
      ],
    },
    {
      chapter: 'Why reactivity decreases',
      layout: 'split',
      leftWidth: 560,
      left: [twoAtoms],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A halogen reacts by **gaining** one electron to fill its outer shell.', 'Larger atoms: the outer shell is further from the nucleus, so an extra electron is attracted **less strongly**.'],
        },
      ],
      lines: [
        {
          say: 'A halogen reacts by gaining one electron to fill its outer shell.',
          show: ['b.0', 'at.f-nucleus', 'at.f-shell-1', 'at.f-shell-2', 'at.f-name', 'at.cl-nucleus', 'at.cl-shell-1', 'at.cl-shell-2', 'at.cl-shell-3', 'at.cl-name'],
          focus: 'b.0',
        },
        { say: 'Going down the group, the atoms get larger, so the outer shell is further from the nucleus, and an extra electron is attracted less strongly.', show: 'b.1', focus: ['b.1', 'at.f-shell-2', 'at.cl-shell-3'] },
        { say: 'The larger halogens gain an electron less readily, so they are less reactive.' },
      ],
    },
    {
      chapter: 'Opposite trends',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Reacts by', 'Down the group'],
          rows: [
            ['Group 1', '**losing** an electron', '[[good:more reactive]]'],
            ['Group 17', '**gaining** an electron', '[[bad:less reactive]]'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The trends run in opposite directions', md: 'Both have the same cause: larger atoms hold their outer electrons less strongly. That makes it easier to **lose** an electron, but harder to **gain** one.' },
      ],
      lines: [
        { say: 'Watch out: reactivity increases down group one, but decreases down group seventeen.', show: 't' },
        { say: 'Both trends have the same cause: larger atoms hold their outer electrons less strongly. That makes it easier for a metal to lose an electron, but harder for a halogen to gain one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At room temperature, fluorine and chlorine are gases, bromine is a liquid and iodine is a solid. Astatine is below iodine in group $17$. Predict its state at room temperature.',
          choices: ['A solid', 'A liquid', 'A gas', 'It cannot be predicted'],
          answer: 0,
          working: 'Down group 17 the melting and boiling points rise: gas, gas, liquid, solid. Astatine, below iodine, should also be a solid.',
        },
      ],
      lines: [
        { say: 'Your turn. Fluorine and chlorine are gases, bromine is a liquid, and iodine is a solid. Astatine is below iodine in group seventeen. Predict its state at room temperature. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, a solid. Down group seventeen, the melting and boiling points rise: gas, gas, liquid, solid. So astatine, below iodine, should also be a solid.', show: 'q.answer' },
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
            '**Halogens** (group 17): $7$ outer electrons, molecules of two atoms, toxic, salt-formers.',
            'Down the group: darker colours, higher boiling points, **less reactive**.',
            'Larger atoms attract an extra electron less strongly: the opposite trend to group 1.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The halogens have seven outer electrons, form molecules of two atoms, and react with metals to make salts.', show: 'sum.0' },
        { say: 'Down the group, their colours darken, their boiling points rise, and they become less reactive.', show: 'sum.1' },
        { say: 'Larger atoms attract an extra electron less strongly, so the trend runs opposite to group one. In part four, you will use this order to predict displacement reactions, and meet the noble gases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
