import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bondPair, enScale } from './lib/c20-1a-figures.ts';

// Three bonds: H–H shares evenly, H–Cl unevenly, and in Na–Cl chlorine takes the electrons.
const kinds = figure(
  'k',
  [
    bondPair({ name: 'np', at: [0, 0], a: 'H', b: 'H', t: 0.5, label: '\\text{non-polar covalent}' }),
    bondPair({ name: 'p', at: [5.6, 0], a: 'H', b: 'Cl', t: 0.68, label: '\\text{polar covalent}' }),
    bondPair({ name: 'i', at: [11.4, 0], a: 'Na', b: 'Cl', ions: ['+', '-'], label: '\\text{ionic}' }),
  ],
  320,
);

// The rule on a scale of ΔEN, with the two bonds of the worked example marked.
const scale = figure(
  'sc',
  [
    enScale({
      marks: [
        { id: 'hcl', value: 1.0, tex: '\\text{H–Cl: } 1.0', tone: 'theta' },
        { id: 'nacl', value: 2.3, tex: '\\text{Na–Cl: } 2.3', tone: 'opp' },
      ],
    }),
  ],
  340,
);

const video: Explainer = {
  id: 'c20-1-4-b',
  lessonId: 'c20-1-4',
  title: 'Electronegativity and Bond Types, Part 2: The Difference and Bond Types',
  thumbnailTitle: 'Three Kinds of Bond',
  thumbnail: 'k',
  summary:
    'The electronegativity difference of a bond is the larger value minus the smaller, so it is never negative: H–Cl has 3.2 − 2.2 = 1.0 and Na–Cl 3.2 − 0.9 = 2.3. Below 0.5 a bond is non-polar covalent (electrons shared equally), from 0.5 up to 1.7 polar covalent (shared unequally), and 1.7 or more ionic (electrons transferred). So H–Cl is polar covalent, Na–Cl ionic, and C–H (0.4) and Cl–Cl (0) non-polar.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'The Difference and Bond Types', subtitle: 'Equal, unequal or transferred' }],
      lines: [
        { say: 'Hydrogen chloride is a gas made of molecules, but sodium chloride is a crystal of ions. Both contain chlorine. The difference is how hard chlorine’s partner pulls.', show: 'title' },
        { say: 'In this part, you will find the electronegativity difference of a bond, and use it to classify the bond.' },
      ],
    },
    {
      chapter: 'The electronegativity difference',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta\\text{EN} = \\text{larger value} - \\text{smaller value}', '\\text{H–Cl: } 3.2 - 2.2 = 1.0', '\\text{Na–Cl: } 3.2 - 0.9 = 2.3'] },
        { kind: 'text', id: 'given', size: 'md', align: 'center', md: 'H $2.2$, Na $0.9$, Cl $3.2$' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtract, don’t add', md: 'For H–Cl, $\\Delta\\text{EN} = 3.2 - 2.2 = 1.0$, not $3.2 + 2.2 = 5.4$, and not $2.2 - 3.2 = -1.0$.' },
      ],
      lines: [
        { say: 'How unevenly two atoms share their electrons depends on the gap between their electronegativities, called the electronegativity difference, delta E N.', caption: 'How unevenly two atoms share their electrons depends on the gap between their electronegativities, called the electronegativity difference, ΔEN.', show: 'm.0', focus: 'm.0' },
        { say: 'Always subtract the smaller value from the larger, so delta E N is never negative. Two identical atoms give zero.', caption: 'Always subtract the smaller value from the larger, so ΔEN is never negative. Two identical atoms give zero.' },
        { say: 'For the bond between hydrogen and chlorine, chlorine is three point two and hydrogen two point two. The difference is one point zero.', show: ['given', 'm.1'], focus: 'm.1' },
        { say: 'For sodium and chlorine, three point two minus zero point nine is two point three. Chlorine pulls much harder against sodium.', show: 'm.2', focus: 'm.2' },
        { say: 'It is a difference, so subtract; never add.', show: 'oops' },
      ],
    },
    {
      chapter: 'Three kinds of bond',
      layout: 'center',
      main: [
        kinds,
        { kind: 'bullets', id: 'b', items: ['**Non-polar covalent**: shared equally, or almost equally.', '**Polar covalent**: shared unequally, nearer the more electronegative atom.', '**Ionic**: the more electronegative atom takes the electrons; ions form.'] },
      ],
      lines: [
        { say: 'The size of the difference decides what happens to the shared electrons.' },
        { say: 'In a non-polar covalent bond, the electrons are shared equally, or almost equally, because the atoms have the same, or nearly the same, electronegativity.', show: ['k.np-a', 'k.np-b', 'k.np-pair', 'k.np-label', 'b.0'], focus: 'b.0' },
        { say: 'In a polar covalent bond, they are shared unequally: they spend more of their time near the more electronegative atom.', show: ['k.p-a', 'k.p-b', 'k.p-pair', 'k.p-label', 'b.1'], focus: 'b.1' },
        { say: 'When the difference is large enough, the sharing stops. The more electronegative atom takes the electrons, and the bond is ionic, the attraction between oppositely charged ions.', show: ['k.i-a', 'k.i-b', 'k.i-pair', 'k.i-charges', 'k.i-label', 'b.2'], focus: 'b.2' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        scale,
        {
          kind: 'table',
          id: 't',
          head: ['$\\Delta\\text{EN}$', 'Bond type', 'The electrons are…'],
          rows: [
            ['below $0.5$', 'non-polar covalent', 'shared equally, or almost'],
            ['$0.5$ up to (not including) $1.7$', 'polar covalent', 'shared unequally'],
            ['$1.7$ or more', 'ionic', 'transferred, so ions form'],
          ],
        },
      ],
      lines: [
        { say: 'Gradileo’s questions use this rule. A difference below zero point five is non-polar covalent.', show: ['sc.axis', 'sc.nonpolar', 't.0'], focus: 't.0' },
        { say: 'From zero point five up to, but not including, one point seven, it is polar covalent.', show: ['sc.polar', 't.1'], focus: 't.1' },
        { say: 'And one point seven or more is ionic.', show: ['sc.ionic', 't.2'], focus: 't.2' },
        { say: 'So hydrogen chloride, at one point zero, is polar covalent.', show: 'sc.hcl', focus: 'sc.hcl' },
        { say: 'Sodium chloride, at two point three, is ionic: sodium gives its electron to chlorine, making a sodium ion and a chloride ion.', show: 'sc.nacl', focus: 'sc.nacl' },
      ],
    },
    {
      chapter: 'Two non-polar bonds',
      layout: 'center',
      main: [
        { kind: 'text', id: 'given', size: 'md', align: 'center', md: 'C $2.6$, H $2.2$, Cl $3.2$' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{C–H: } 2.6 - 2.2 = 0.4 < 0.5', '\\text{Cl–Cl: } 3.2 - 3.2 = 0 < 0.5'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two identical atoms', md: 'always share equally: $\\ce{H2}$, $\\ce{N2}$, $\\ce{O2}$ and $\\ce{Cl2}$ have non-polar bonds.' },
      ],
      lines: [
        { say: 'Now carbon and hydrogen, at two point six and two point two. The difference is zero point four, below zero point five, so the bond is non-polar covalent.', show: ['given', 'm.0'], focus: 'm.0' },
        { say: 'In a chlorine molecule, both atoms are three point two, so the difference is zero. Non-polar again.', show: 'm.1', focus: 'm.1' },
        { say: 'Two identical atoms always share equally, as in hydrogen, nitrogen and oxygen molecules.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\Delta\\text{EN}$ for the N–H bond and classify it (N $3.0$, H $2.2$). Rule: below $0.5$ non-polar covalent, $0.5$ up to $1.7$ polar covalent, $1.7$ or more ionic.',
          choices: ['$5.2$; ionic', '$0.8$; polar covalent', '$0.8$; non-polar covalent', '$-0.8$; polar covalent'],
          answer: 1,
          working: '$\\Delta\\text{EN} = 3.0 - 2.2 = 0.8$, which is from $0.5$ up to $1.7$: polar covalent.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the electronegativity difference for the bond between nitrogen and hydrogen, and classify it, using the rule on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Three point zero minus two point two is zero point eight, so the bond is polar covalent. Choice A adds the values instead of subtracting.', show: 'q.answer' },
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
            '$\\Delta\\text{EN}$ = larger value − smaller value; it is never negative.',
            'Below $0.5$: **non-polar covalent**, shared equally.',
            '$0.5$ up to $1.7$: **polar covalent**, shared unequally.',
            '$1.7$ or more: **ionic**, electrons transferred.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The electronegativity difference is the larger value minus the smaller, so it is never negative.', show: 'sum.0' },
        { say: 'Below zero point five, the bond is non-polar covalent, with the electrons shared equally.', show: 'sum.1' },
        { say: 'From zero point five up to one point seven, it is polar covalent, with the electrons shared unequally.', show: 'sum.2' },
        { say: 'And one point seven or more is ionic. In part three, you will mark the partial charges on a polar bond. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
