import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { bracket, tag } from './lib/c10-3-figures.ts';

const nucleus = (protons: number) => `${protons}\\text{p}^{+}`;

// An aluminium atom, 2,8,3, whose outer shell is taken away to leave the aluminium ion, 2,8.
const aluminium = figure(
  'al',
  [
    atomShells({ at: [0, 0], nucleus: nucleus(13), shells: [2, 8, 3], r: 1.7, gap: 1 }),
    bracket({ c: [0, 0], half: [4.0, 4.0], charge: '3{+}' }),
    tag('name', [0, -5.4], '\\text{aluminium atom: 2,8,3}'),
    tag('ion-name', [0, -5.4], '\\text{aluminium ion: 2,8}'),
  ],
  500,
);

// A sulfur atom, 2,8,6, and the sulfide ion, 2,8,8, drawn in the same place: the ion's outer
// shell replaces the atom's.
const sulfur = figure(
  's',
  [
    atomShells({ name: 'atom', at: [0, 0], nucleus: nucleus(16), shells: [2, 8, 6], r: 1.7, gap: 1 }),
    atomShells({ name: 'ion', at: [0, 0], nucleus: nucleus(16), shells: [2, 8, 8], r: 1.7, gap: 1 }),
    bracket({ c: [0, 0], half: [5.0, 5.0], charge: '2{-}' }),
    tag('name', [0, -6.3], '\\text{sulfur atom: 2,8,6}'),
    tag('ion-name', [0, -6.3], '\\text{sulfide ion: 2,8,8}'),
  ],
  500,
);

const video: Explainer = {
  id: 'c10-3-1-d',
  lessonId: 'c10-3-1',
  title: 'Ions, Part 4: Counting Electrons in Ions',
  thumbnailTitle: 'Counting Electrons in Ions',
  thumbnail: 's',
  summary:
    'An ion has the same protons as its atom, so only the electrons change: a positive ion has the atomic number minus the charge, and a negative ion the atomic number plus the charge. Al3+ has 13 - 3 = 10 electrons, arranged 2,8, and S2- has 16 + 2 = 18, arranged 2,8,8. Many ions share the arrangement 2,8 or 2,8,8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 4', title: 'Counting Electrons in Ions', subtitle: 'Atomic number, charge and arrangement' }],
      lines: [
        { say: 'How many electrons does an aluminium ion have? You can work it out from just two numbers: the atomic number, and the charge.', show: 'title' },
        { say: 'In this last part on ions, you will count the electrons in an ion, and write how they are arranged.' },
      ],
    },
    {
      chapter: 'Two rules',
      layout: 'center',
      main: [
        { kind: 'text', id: 'same', size: 'md', align: 'center', md: 'An ion has the **same protons** as its atom: the atomic number. Only the electrons change.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{positive ion: electrons} = \\text{atomic number} - \\text{charge}', '\\text{negative ion: electrons} = \\text{atomic number} + \\text{charge}'] },
      ],
      lines: [
        { say: 'An ion has the same number of protons as its atom: the atomic number. Only the electrons change.', show: 'same' },
        { say: 'A positive ion has lost electrons. So its electrons are the atomic number, minus the size of the charge.', show: 'm.0', focus: 'm.0' },
        { say: 'A negative ion has gained electrons. So its electrons are the atomic number, plus the size of the charge.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A positive ion',
      layout: 'split',
      leftWidth: 520,
      left: [aluminium],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Al^3+}\\text{: atomic number 13}', '\\text{atom: 2,8,3}', '\\text{lost 3: } 13 - 3 = 10', '\\text{ion: 2,8 (like neon)}'] }],
      lines: [
        { say: 'How many electrons are in A L three plus, and how are they arranged? Aluminium has atomic number thirteen.', caption: 'How many electrons are in Al³⁺, and how are they arranged? Aluminium has atomic number thirteen.', show: ['al.nucleus', 'al.name', 'm.0'], focus: 'm.0' },
        { say: 'The atom has thirteen protons, and thirteen electrons arranged two, eight, three.', show: ['al.shell-1', 'al.shell-2', 'al.shell-3', 'm.1'], focus: 'm.1' },
        { say: 'A charge of three plus means it has lost three electrons. Thirteen minus three is ten.', show: 'm.2', focus: ['m.2', 'al.shell-3'] },
        { say: 'The three outer electrons have gone, leaving the shells two, eight, like neon. So the aluminium ion has ten electrons.', hide: ['al.shell-3', 'al.name'], show: ['al.bracket', 'al.ion-name', 'm.3'], focus: ['m.3', 'al.shell-2'] },
      ],
    },
    {
      chapter: 'A negative ion',
      layout: 'split',
      leftWidth: 520,
      left: [sulfur],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{S^2-}\\text{: atomic number 16}', '\\text{atom: 2,8,6}', '\\text{gained 2: } 16 + 2 = 18', '\\text{ion: 2,8,8 (like argon)}'] }],
      lines: [
        { say: 'Now the sulfide ion, S two minus. Sulfur has atomic number sixteen.', caption: 'Now the sulfide ion, S²⁻. Sulfur has atomic number sixteen.', show: ['s.atom-nucleus', 's.name', 'm.0'], focus: 'm.0' },
        { say: 'The atom has sixteen electrons, arranged two, eight, six.', show: ['s.atom-shell-1', 's.atom-shell-2', 's.atom-shell-3', 'm.1'], focus: 'm.1' },
        { say: 'A charge of two minus means it has gained two electrons. Sixteen plus two is eighteen.', show: 'm.2', focus: 'm.2' },
        { say: 'The two new electrons go into the outer shell, which now holds eight: two, eight, eight, like argon.', hide: ['s.atom-shell-3', 's.name'], show: ['s.ion-shell-3', 's.bracket', 's.ion-name', 'm.3'], focus: ['m.3', 's.ion-shell-3'] },
      ],
    },
    {
      chapter: 'Same arrangement, different ions',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Ion', 'Protons', 'Electrons', 'Shells'],
          rows: [
            ['$\\ce{Na+}$', '11', '10', '2,8'],
            ['$\\ce{Mg^2+}$', '12', '10', '2,8'],
            ['$\\ce{Al^3+}$', '13', '10', '2,8'],
            ['$\\ce{O^2-}$', '8', '10', '2,8'],
            ['$\\ce{F-}$', '9', '10', '2,8'],
          ],
        },
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Gaining electrons makes a negative ion', md: '$\\ce{O^2-}$ has $8 + 2 = 10$ electrons, not $8 - 2 = 6$. Check: $8$ protons and $10$ electrons give $8 - 10 = -2$.' }],
      lines: [
        { say: 'Notice something. The sodium, magnesium and aluminium ions, the oxide ion and the fluoride ion all have ten electrons, arranged two, eight.', show: 't' },
        { say: 'Ions of different elements can share an electron arrangement. What tells them apart is the number of protons, and so the charge.', focus: 't' },
        { say: 'One mistake to avoid: gaining electrons makes an ion more negative. The oxide ion has eight plus two, which is ten electrons, not eight minus two.', show: 'oops' },
        { say: 'If you are unsure, check. Eight protons and ten electrons give eight minus ten, which is negative two, the charge in the symbol.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many electrons are in the ion $\\ce{Ca^2+}$? (The atomic number of calcium is $20$.)',
          choices: ['$22$', '$20$', '$2$', '$18$'],
          answer: 3,
          working: 'A charge of 2+ means the atom lost $2$ electrons: $20 - 2 = 18$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many electrons are in the calcium ion, C A two plus? The atomic number of calcium is twenty. Pause the video and try it.', caption: 'Your turn. How many electrons are in the calcium ion, Ca²⁺? The atomic number of calcium is twenty. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eighteen. A charge of two plus means the atom lost two electrons, and twenty minus two is eighteen. Choice A adds the charge, but a positive ion has fewer electrons than protons.', show: 'q.answer' },
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
            'Positive ion: electrons = atomic number − charge. $\\ce{Al^3+}$ has $13 - 3 = 10$.',
            'Negative ion: electrons = atomic number + charge. $\\ce{S^2-}$ has $16 + 2 = 18$.',
            'Many ions are arranged 2,8 (like neon) or 2,8,8 (like argon).',
            'Check: protons − electrons gives the charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A positive ion has the atomic number minus the charge in electrons. The aluminium ion has ten.', show: 'sum.0' },
        { say: 'A negative ion has the atomic number plus the charge. The sulfide ion has eighteen.', show: 'sum.1' },
        { say: 'Many ions are arranged two, eight, like neon, or two, eight, eight, like argon.', show: 'sum.2' },
        { say: 'And protons minus electrons always gives the charge. That completes this lesson on ions. Next, you will see how positive and negative ions join to make compounds.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
