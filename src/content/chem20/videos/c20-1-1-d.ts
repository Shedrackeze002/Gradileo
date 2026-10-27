import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { bracket, tag } from './lib/c20-1a-figures.ts';

// The aluminium ion: 13 protons and 14 neutrons, and 10 electrons arranged 2, 8, in brackets with 3+.
const aluminium = figure(
  'al',
  [
    atomShells({ protons: 13, neutrons: 14, shells: [2, 8], r: 1.6, gap: 1.2 }),
    bracket({ c: [0, 0], half: [4.4, 4.4], charge: '3+', tone: 'opp' }),
    tag('name', [0, -5.5], '\\ce{^{27}_{13}Al^3+}\\text{: 2, 8}', { tone: 'opp' }),
  ],
  560,
);

const video: Explainer = {
  id: 'c20-1-1-d',
  lessonId: 'c20-1-1',
  title: 'Atoms, Ions and the Periodic Table, Part 4: Naming Ions and Counting Electrons',
  thumbnailTitle: 'Naming Ions and Counting Electrons',
  thumbnail: 'al',
  summary:
    'Calcium, in group 2, loses 2 electrons to form Ca2+, and phosphorus, in group 15, gains 3 to form P3-, the phosphide ion. A cation keeps its element’s name and an anion ends in -ide; a charge is written number first, then the sign. Forming an ion changes only the electrons, so electrons = atomic number − charge: Al3+ has 13 − 3 = 10 electrons, and S2- has 16 − (−2) = 18.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Naming Ions and Counting Electrons', subtitle: 'What an ion’s formula tells you' }],
      lines: [
        { say: 'A short formula, like C A two plus, tells you a lot: which element it is, and how many electrons its atoms lost or gained.', caption: 'A short formula, like Ca²⁺, tells you a lot: which element it is, and how many electrons its atoms lost or gained.', show: 'title' },
        { say: 'In this part, you will predict two ions step by step, name them and write their charges, and count the electrons in an ion.' },
      ],
    },
    {
      chapter: 'Predicting two ions',
      layout: 'split',
      leftWidth: 580,
      left: [{ kind: 'math', id: 'ca', size: 'md', align: 'left', lines: ['\\text{Calcium: group 2}', '2 \\text{ valence electrons}', '\\text{a metal: loses 2, like argon}', '20 \\text{ protons, } 18 \\text{ electrons}', '\\ce{Ca^2+}\\text{, the calcium ion}'] }],
      right: [{ kind: 'math', id: 'p', size: 'md', align: 'left', lines: ['\\text{Phosphorus: group 15}', '15 - 10 = 5 \\text{ valence electrons}', '\\text{a non-metal: gains } 8 - 5 = 3', '\\text{3 extra electrons: } 3{-}', '\\ce{P^3-}\\text{, the phosphide ion}'] }],
      lines: [
        { say: 'Which ion does calcium form? Calcium is in group two, so it has two valence electrons.', show: ['ca.0', 'ca.1'], focus: ['ca.0', 'ca.1'] },
        { say: 'It is a metal, so it loses both, leaving the arrangement of argon: twenty protons and eighteen electrons, a charge of two plus. This is the calcium ion.', show: ['ca.2', 'ca.3', 'ca.4'], focus: ['ca.2', 'ca.3', 'ca.4'] },
        { say: 'Which ion does phosphorus form? Phosphorus is in group fifteen, so it has fifteen minus ten, which is five valence electrons.', show: ['p.0', 'p.1'], focus: ['p.0', 'p.1'] },
        { say: 'It is a non-metal, so it gains eight minus five, which is three electrons, to complete an octet. Three extra electrons give a charge of three minus: the phosphide ion.', show: ['p.2', 'p.3', 'p.4'], focus: ['p.2', 'p.3', 'p.4'] },
      ],
    },
    {
      chapter: 'Names and charges',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Cation', 'Name', 'Anion', 'Name'],
          rows: [
            ['$\\ce{Na+}$', 'sodium', '$\\ce{Cl-}$', 'chloride'],
            ['$\\ce{Mg^2+}$', 'magnesium', '$\\ce{O^2-}$', 'oxide'],
            ['$\\ce{Al^3+}$', 'aluminium', '$\\ce{N^3-}$', 'nitride'],
            ['$\\ce{K+}$', 'potassium', '$\\ce{S^2-}$', 'sulfide'],
            ['$\\ce{Ca^2+}$', 'calcium', '$\\ce{P^3-}$', 'phosphide'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'write', tone: 'key', title: 'Writing a charge', md: 'At the top right, **number first, then the sign**: $\\ce{Mg^2+}$. A charge of 1 is the sign alone: $\\ce{Na+}$, not Na¹⁺.' },
        { kind: 'callout', id: 'type', tone: 'tip', title: 'Typing a charge', md: 'In an answer box, type the charge after ^, number before the sign: `Mg^2+`, `Cl^-`.' },
      ],
      lines: [
        { say: 'A cation keeps the name of its element. N A plus is the sodium ion, and A L three plus is the aluminium ion.', caption: 'A cation keeps the name of its element. Na⁺ is the sodium ion, and Al³⁺ is the aluminium ion.', show: 't', focus: ['t.0', 't.2'] },
        { say: 'An anion changes the ending of its element’s name: chloride, oxide, nitride, sulfide and phosphide.', focus: 't' },
        { say: 'A charge is written at the top right, number first, then the sign: the magnesium ion is two plus. A charge of one is the sign alone: N A plus, never N A one plus.', caption: 'A charge is written at the top right, number first, then the sign: the magnesium ion is 2+. A charge of 1 is the sign alone: Na⁺, never Na¹⁺.', show: 'write', focus: 't.1' },
        { say: 'In an answer box, type the charge after a caret, with the number before the sign.', show: 'type' },
      ],
    },
    {
      chapter: 'Counting electrons in an ion',
      layout: 'split',
      leftWidth: 520,
      left: [aluminium],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Electrons in an ion', md: 'Electrons $=$ atomic number $-$ charge. Only the electrons change; the nucleus stays the same.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{protons} = 13', '\\text{neutrons} = 27 - 13 = 14', '\\text{electrons} = 13 - 3 = 10'] },
      ],
      lines: [
        { say: 'Forming an ion changes only the electrons; the nucleus stays the same. So to count the electrons in an ion, start from the atomic number and take away the charge.', show: 'rule' },
        { say: 'How many protons, neutrons and electrons are in this aluminium ion, with mass number twenty-seven and a charge of three plus? The atomic number is thirteen, so it has thirteen protons.', show: ['al.nucleus', 'al.name', 'm.0'], focus: ['m.0', 'al.nucleus'] },
        { say: 'The neutrons are twenty-seven minus thirteen, which is fourteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The electrons are thirteen minus three, which is ten, the same number as neon.', show: ['al.shell-1', 'al.shell-2', 'al.bracket', 'm.2'], focus: ['m.2', 'al.shell-2'] },
      ],
    },
    {
      chapter: 'A negative charge adds electrons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Gaining electrons makes a negative ion', md: 'Electrons are negative, so an atom that **gains** electrons becomes negative. Taking away a negative charge **adds** electrons.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{S^2-}\\text{: } 16 \\text{ protons}', '\\text{electrons} = 16 - (-2) = 16 + 2 = 18'] },
      ],
      lines: [
        { say: 'A positive charge means fewer electrons than protons. A negative charge means more, because taking away a negative number adds electrons.', show: 'oops' },
        { say: 'The sulfide ion, S two minus, still has sixteen protons.', caption: 'The sulfide ion, S²⁻, still has sixteen protons.', show: 'm.0', focus: 'm.0' },
        { say: 'Its electrons are sixteen minus negative two, which is sixteen plus two: eighteen electrons, not fourteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many electrons does the ion $\\ce{N^3-}$ have? (Nitrogen, atomic number $7$.)',
          choices: ['$4$', '$7$', '$10$', '$3$'],
          answer: 2,
          working: 'Electrons $=$ atomic number $-$ charge $= 7 - (-3) = 7 + 3 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many electrons does the nitride ion, N three minus, have? Nitrogen has atomic number seven. Pause the video and try it.', caption: 'Your turn. How many electrons does the nitride ion, N³⁻, have? Nitrogen has atomic number 7. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ten. The electrons are the atomic number minus the charge: seven minus negative three is seven plus three, which is ten. Choice A, four, takes three away, but a negative ion has gained electrons.', show: 'q.answer' },
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
            'Predict an ion from the group: calcium forms $\\ce{Ca^2+}$, phosphorus forms $\\ce{P^3-}$.',
            'A cation keeps its element’s name; an anion ends in **-ide**: chloride, oxide, phosphide.',
            'Write the charge number first, then the sign: $\\ce{Mg^2+}$, $\\ce{Na+}$.',
            'Electrons in an ion = atomic number − charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The group predicts the ion: calcium forms a two plus ion, and phosphorus a three minus ion.', show: 'sum.0' },
        { say: 'A cation keeps its element’s name, and an anion changes its ending, as in chloride, oxide and phosphide.', show: 'sum.1' },
        { say: 'A charge is written number first, then the sign, and a charge of one is the sign alone.', show: 'sum.2' },
        { say: 'And the electrons in an ion are the atomic number minus the charge. That completes this lesson. Next, you will see how ions combine into ionic compounds.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
