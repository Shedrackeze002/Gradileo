import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, DX, numberLabels, skeleton, step, tag, zigzag } from './lib/c30-3a-figures.ts';

// 2,2,4-trimethylpentane: two methyl groups fanned out on carbon 2, one on carbon 4.
const z = zigzag('c', 5);
const tri = figure('t', [
  skeleton({
    carbons: { ...z, a: step(z.c2, 60), b: step(z.c2, 120), d: step(z.c4, 90) },
    bonds: [...chainBonds('c', 5, { group: 'chain' }), ...(['a', 'b'] as const).map((to) => ({ from: 'c2', to, tone: 'opp' as const, group: 'branch' })), { from: 'c4', to: 'd', tone: 'opp', group: 'branch' }],
  }),
]);

// One compound drawn two ways: 2-methylbutane with its four-carbon chain straight (left), and as
// "2-ethylpropane" (right), where the longest chain bends up through the branch.
const s = zigzag('s', 4);
const r = zigzag('r', 3, { at: [4.9, 0] });
const r4 = step(r.r2, 90);
const bend = figure('b', [
  skeleton({
    name: 'l',
    carbons: { ...s, m: step(s.s2, 90) },
    bonds: [...chainBonds('s', 4, { group: 'chain' }), { from: 's2', to: 'm', tone: 'opp', group: 'chain' }],
  }),
  tag('l-name', [1.3, -1], '\\text{2-methylbutane}', { tone: 'good' }),
  skeleton({
    name: 'r',
    carbons: { ...r, e1: r4, e2: step(r4, 30) },
    bonds: [
      { from: 'r1', to: 'r2', group: 'long' },
      { from: 'r2', to: 'e1', group: 'long' },
      { from: 'e1', to: 'e2', group: 'long' },
      { from: 'r2', to: 'r3', group: 'end' },
    ],
  }),
  tag('r-name', [4.9 + DX, -1], '\\text{“2-ethylpropane”}', { tone: 'bad' }),
]);

// 2,3-dimethylpentane drawn from its name: the chain, numbered, then a methyl group on carbons 2 and 3.
const d = zigzag('c', 5);
const draw = figure('d', [
  skeleton({
    carbons: { ...d, m2: step(d.c2, 90), m3: step(d.c3, -90) },
    bonds: [...chainBonds('c', 5, { group: 'chain' }), { from: 'c2', to: 'm2', tone: 'opp', group: 'branch' }, { from: 'c3', to: 'm3', tone: 'opp', group: 'branch' }],
    labels: numberLabels(['c1', 'c2', 'c3', 'c4', 'c5'], ['below', 'above left', 'below left', 'above', 'below']),
  }),
]);

const video: Explainer = {
  id: 'c30-3-2-c',
  lessonId: 'c30-3-2',
  title: 'Naming Hydrocarbons, Part 3: Repeated Branches and Drawing From a Name',
  thumbnailTitle: 'Repeated Branches and Drawing From a Name',
  thumbnail: 'b',
  summary:
    'Repeated branches take di-, tri- or tetra- and a number each: 2,2,4-trimethylpentane, numbered from the end that gives the lower number at the first difference. A chain may bend through a branch, so "2-ethylpropane" is really 2-methylbutane. To draw a compound from its name, draw the parent chain, add the branches, then the hydrogens.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Repeated Branches and Drawing From a Name', subtitle: 'Lowest numbers, longest chains' }],
      lines: [
        { say: 'Petrol is tested against a compound with three methyl branches on a five-carbon chain. Its name says exactly where each branch goes.', show: 'title' },
        { say: 'In this part, you will name repeated branches, avoid two common traps, and draw a structure from its name.' },
      ],
    },
    {
      chapter: 'Repeated branches',
      layout: 'split',
      leftWidth: 380,
      left: [tri],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{\\overset{1}{CH3}-\\overset{2}{C}(CH3)2-\\overset{3}{CH2}-\\overset{4}{CH}(CH3)-\\overset{5}{CH3}}',
            '\\text{from the left: } 2, \\good{2}, 4',
            '\\text{from the right: } 2, \\bad{4}, 4',
            '\\text{2,2,4-trimethylpentane}',
          ],
        },
      ],
      lines: [
        { say: 'This compound has three branches. The longest chain has five carbons, so the parent is pentane.', show: ['t.chain', 't.branch', 'm.0'], focus: 't.chain' },
        { say: 'Numbered from the left, the branches are on carbons two, two and four. From the right, they would be on two, four and four.', show: ['m.1', 'm.2'], focus: 't.branch' },
        { say: 'Compare the two lists at the first point of difference. The second number is two from the left, but four from the right. Two is lower, so number from the left.', focus: ['m.1', 'm.2'] },
        { say: 'Three methyl groups make trimethyl, with a number for each. The name is two, two, four-trimethylpentane, the compound used as a standard for testing petrol.', caption: 'Three methyl groups make trimethyl, with a number for each. The name is 2,2,4-trimethylpentane, the compound used as a standard for testing petrol.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two traps',
      layout: 'split',
      leftWidth: 520,
      left: [bend],
      right: [
        { kind: 'callout', id: 'bent', tone: 'mistake', title: 'A chain that bends', md: 'An ethyl group on carbon 2, or a methyl group on carbon 1, means the chain is **longer** than it looks.' },
        { kind: 'callout', id: 'end', tone: 'mistake', title: 'Numbering from the wrong end', md: '"4-methylpentane" is **2-methylpentane**, numbered from the nearer end.' },
      ],
      lines: [
        { say: 'Here is the first trap. This compound looks like propane with an ethyl group on carbon two: two-ethylpropane.', caption: 'Here is the first trap. This compound looks like propane with an ethyl group on carbon 2: “2-ethylpropane”.', show: ['b.r-long', 'b.r-end', 'b.r-name'] },
        { say: 'But the longest chain runs from one end, through the middle carbon, and on into the ethyl group: four carbons.', focus: 'b.r-long' },
        { say: 'The other end carbon is a methyl branch on carbon two. So the compound is two-methylbutane, the same as this drawing.', caption: 'The other end carbon is a methyl branch on carbon 2. So the compound is 2-methylbutane, the same as this drawing.', show: ['b.l-chain', 'b.l-name'], focus: ['b.r-end', 'b.l-s2-m'] },
        { say: 'An ethyl group on carbon two, or a methyl group on carbon one, always means the chain is longer than it looks.', show: 'bent', focus: 'b' },
        { say: 'The second trap: four-methylpentane numbers the chain from the wrong end. From the nearer end, it is two-methylpentane. Always check both directions.', caption: 'The second trap: “4-methylpentane” numbers the chain from the wrong end. From the nearer end, it is 2-methylpentane. Always check both directions.', show: 'end' },
      ],
    },
    {
      chapter: 'Drawing from a name',
      layout: 'split',
      leftWidth: 360,
      left: [draw],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Draw **2,3-dimethylpentane**.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{C-C-C-C-C}', '\\ce{C-C(C)-C(C)-C-C}', '\\ce{CH3-CH(CH3)-CH(CH3)-CH2-CH3}', '\\ce{C7H16}'],
        },
      ],
      lines: [
        { say: 'To draw a structure from its name, work from the end of the name back to the start. Let’s draw two, three-dye-methylpentane.', caption: 'To draw a structure from its name, work from the end of the name back to the start. Let’s draw 2,3-dimethylpentane.', show: 'q' },
        { say: 'Pentane: draw a chain of five carbons, and number them.', show: ['d.chain', 'd.n', 'm.0'], focus: 'm.0' },
        { say: 'Two, three-dye-methyl: a methyl group on carbon two, and another on carbon three.', caption: '2,3-dimethyl: a methyl group on carbon 2, and another on carbon 3.', show: ['d.branch', 'm.1'], focus: ['d.branch', 'm.1'] },
        { say: 'Then add hydrogens, so that every carbon has four bonds. That gives the condensed formula.', show: 'm.2', focus: 'm.2' },
        { say: 'Seven carbons and sixteen hydrogens: the molecular formula is C seven H sixteen.', caption: 'Seven carbons and sixteen hydrogens: the molecular formula is C₇H₁₆.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student named a compound 2-ethylbutane. The name describes a real compound but breaks a naming rule. What is its correct IUPAC name?',
          choices: ['2-methylpentane', '3-methylpentane', '3-ethylbutane', '2-methylbutane'],
          answer: 1,
          working: '2-ethylbutane is $\\ce{CH3-CH(CH2CH3)-CH2-CH3}$. The longest chain runs into the ethyl group: 5 carbons, with a methyl group on carbon 3. The correct name is 3-methylpentane.',
        },
      ],
      lines: [
        { say: 'Your turn. A student named a compound two-ethylbutane. The name describes a real compound, but breaks a naming rule. What is its correct name? Pause the video and try it.', caption: 'Your turn. A student named a compound 2-ethylbutane. The name describes a real compound, but breaks a naming rule. What is its correct name? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three-methylpentane. Draw it: an ethyl group on carbon two means the chain bends. The longest chain runs into the ethyl group and has five carbons, with a methyl group on the middle one, carbon three.', caption: 'The answer is B, 3-methylpentane. Draw it: an ethyl group on carbon 2 means the chain bends. The longest chain runs into the ethyl group and has five carbons, with a methyl group on the middle one, carbon 3.', show: 'q.answer' },
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
            'Repeated branches: di-, tri-, tetra-, with a number for each: 2,2,4-trimethylpentane.',
            'Choose the numbering with the lower number at the first point of difference.',
            'The longest chain may bend through a branch: "2-ethylpropane" is 2-methylbutane.',
            'To draw from a name: the parent chain, then the branches, then the hydrogens.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Repeated branches take dye, tri or tetra, with a number for each.', caption: 'Let’s sum up. Repeated branches take di-, tri- or tetra-, with a number for each.', show: 'sum.0' },
        { say: 'Choose the numbering that gives the lower number at the first point of difference.', show: 'sum.1' },
        { say: 'The longest chain may bend through a branch, so check before you name.', show: 'sum.2' },
        { say: 'And to draw from a name, draw the parent chain, then the branches, then the hydrogens. In part four, you will name alkenes and alkynes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
