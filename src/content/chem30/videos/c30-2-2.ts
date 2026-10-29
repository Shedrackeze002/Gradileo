import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { oval, tag } from './lib/c30-2a-figures.ts';

// Water's Lewis structure, with oxygen counted as taking both bonding pairs: oxygen −2, each hydrogen +1.
const water = figure(
  'w',
  [
    lewis({
      atoms: [
        { id: 'h1', symbol: 'H', at: [-1.7, 0] },
        { id: 'o', symbol: 'O', at: [0, 0], dots: [2, 0, 2, 0] },
        { id: 'h2', symbol: 'H', at: [1.7, 0] },
      ],
      bonds: [
        { from: 'h1', to: 'o', dots: true },
        { from: 'o', to: 'h2', dots: true },
      ],
    }),
    oval('ring', [0, 0], 1.3, 0.85, { tone: 'adj', dashed: true }),
    tag('on-o', [0, -1.25], '\\adj{-2}', { place: 'below', group: 'on' }),
    tag('on-h1', [-1.7, -1.25], '+1', { place: 'below', group: 'on' }),
    tag('on-h2', [1.7, -1.25], '+1', { place: 'below', group: 'on' }),
  ],
  420,
);

const video: Explainer = {
  id: 'c30-2-2',
  lessonId: 'c30-2-2',
  title: 'Oxidation Numbers, Part 1: Electron Bookkeeping',
  thumbnailTitle: 'Electron Bookkeeping',
  thumbnail: 'w',
  summary:
    'An oxidation number is the charge an atom would have if every bond were ionic, with the shared electrons given to the more electronegative atom: in water, oxygen is −2 and each hydrogen +1. Seven rules, applied in order, assign them, and the last rule (the sum is 0 for a compound and the charge for an ion) finds the one atom left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Electron Bookkeeping', subtitle: 'What an oxidation number is' }],
      lines: [
        {
          say: 'When natural gas burns, methane plus two oxygen gives carbon dye-oxide plus two water. Every substance is a molecule with no charge, yet carbon has clearly been oxidised: it has combined with oxygen.',
          caption: 'When natural gas burns, CH₄ + 2O₂ → CO₂ + 2H₂O. Every substance is a molecule with no charge, yet carbon has clearly been oxidised: it has combined with oxygen.',
          show: 'title',
        },
        { say: 'To follow electrons through molecules, chemists keep count with oxidation numbers. This part explains them and gives the rules; later parts put them to work.' },
      ],
    },
    {
      chapter: 'Shared, but not equally',
      layout: 'split',
      leftWidth: 460,
      left: [water],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Oxidation number',
          md: 'The charge an atom would have if every bond were **ionic**, with the shared electrons given to the **more electronegative** atom.',
        },
        { kind: 'text', id: 'sign', size: 'md', md: 'Sign first: oxidation number $+2$.  \nSign last: ion charge $2{+}$.' },
      ],
      lines: [
        { say: 'In a covalent bond, the electrons are shared, but not always equally: the more electronegative atom pulls them closer.', show: ['w.h1', 'w.o', 'w.h2', 'w.o-dots', 'w.bond-h1-o', 'w.bond-o-h2'] },
        { say: 'An oxidation number pretends that atom takes them completely. It is the charge an atom would have if every bond were ionic, with the shared electrons given to the more electronegative atom.', show: 'def' },
        { say: 'In water, oxygen is more electronegative than hydrogen, so it is counted with both bonding pairs.', show: 'w.ring', focus: 'w.ring' },
        { say: 'Oxygen has six valence electrons of its own, but is counted with eight: two extra, so it is minus two. Each hydrogen is counted with none of its electron, so it is plus one.', show: 'w.on', focus: 'w.on' },
        { say: 'These are not real charges, just a way of keeping count. They are written sign first, plus two, while an ion’s charge is written sign last, two plus.', show: 'sign' },
      ],
    },
    {
      chapter: 'The rules',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Rule', 'Oxidation number', 'Examples'],
          rows: [
            ['1. Atom in an element', '$0$', '$\\ce{Na}$, $\\ce{O2}$, $\\ce{Cl2}$, $\\ce{P4}$, $\\ce{S8}$'],
            ['2. Monatomic ion', 'its charge', '$\\ce{Fe^3+}$: $+3$; $\\ce{S^2-}$: $-2$'],
            ['3. Group 1, group 2, Al', '$+1$, $+2$, $+3$', '$\\ce{K}$ in $\\ce{KMnO4}$: $+1$'],
            ['4. Fluorine', '$-1$', '$\\ce{F}$ in $\\ce{OF2}$'],
            ['5. Hydrogen', '$+1$ (metal hydrides $-1$)', '$\\ce{H2O}$: $+1$; $\\ce{NaH}$: $-1$'],
            ['6. Oxygen', '$-2$ (peroxides $-1$)', '$\\ce{CO2}$: $-2$; $\\ce{H2O2}$: $-1$'],
            ['7. Sum', '$0$, or the ion’s charge', '$\\ce{SO4^2-}$: sum $-2$'],
          ],
        },
      ],
      lines: [
        { say: 'Apply these rules in order. The first rule that fits an atom decides its oxidation number.' },
        { say: 'One: an atom in an element is zero, as in sodium metal, oxygen gas, P four or S eight.', caption: 'One: an atom in an element is 0, as in sodium metal, oxygen gas, P₄ or S₈.', show: 't.0', focus: 't.0' },
        { say: 'Two: a monatomic ion has the oxidation number of its charge. The iron three ion is plus three, and the sulfide ion is minus two.', caption: 'Two: a monatomic ion has the oxidation number of its charge. The iron(III) ion is +3, and the sulfide ion is −2.', show: 't.1', focus: 't.1' },
        { say: 'Three: in compounds, group one metals are plus one, group two metals plus two, and aluminium plus three.', show: 't.2', focus: 't.2' },
        { say: 'Four: fluorine in a compound is minus one.', show: 't.3', focus: 't.3' },
        { say: 'Five: hydrogen is plus one, except in metal hydrides, where it is minus one.', show: 't.4', focus: 't.4' },
        { say: 'Six: oxygen is minus two, except in peroxides, where it is minus one, and with fluorine.', show: 't.5', focus: 't.5' },
        { say: 'Seven: the oxidation numbers add up to zero in a compound, and to the charge in a polyatomic ion. This last rule finds the one atom left.', show: 't.6', focus: 't.6' },
      ],
    },
    {
      chapter: 'Back to methane',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{CH4}\\text{: } x + 4(+1) = 0 \\;\\Rightarrow\\; x = {-4}', '\\ce{CO2}\\text{: } x + 2(-2) = 0 \\;\\Rightarrow\\; x = {+4}'],
        },
      ],
      lines: [
        { say: 'Back to methane. Hydrogen is plus one, and the four hydrogens make plus four. The total must be zero, so carbon is minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'In carbon dye-oxide, oxygen is minus two, and the two oxygens make minus four, so carbon is plus four. Part four shows why that rise means carbon is oxidised.', caption: 'In carbon dioxide, oxygen is −2, and the two oxygens make −4, so carbon is +4. Part four shows why that rise means carbon is oxidised.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the oxidation number of nitrogen in ammonia, $\\ce{NH3}$?',
          choices: ['$+3$', '$-1$', '$0$', '$-3$'],
          answer: 3,
          working: 'Hydrogen is $+1$, so the three hydrogens make $+3$. The total is 0: $x + 3(+1) = 0$, so nitrogen is $-3$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the oxidation number of nitrogen in ammonia, N H three? Pause the video and try it.', caption: 'Your turn. What is the oxidation number of nitrogen in ammonia, NH₃? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, minus three. Hydrogen is plus one, so three hydrogens make plus three, and the total must be zero. Choice A, plus three, is the hydrogens’ total, not nitrogen’s.', show: 'q.answer' },
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
            'An **oxidation number** is the charge an atom would have if all its bonds were ionic.',
            'It is written sign first: $+2$, $-1$.',
            'Apply the rules in order; the oxidation numbers add up to $0$ in a compound and to the charge in an ion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An oxidation number is the charge an atom would have if all its bonds were ionic.', show: 'sum.0' },
        { say: 'It is written with the sign first.', show: 'sum.1' },
        { say: 'Apply the rules in order, and let the sum find the last atom. In part two, you will use the rules on compounds and polyatomic ions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
