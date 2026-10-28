import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, brackets, structure, type GridAtom } from './lib/c30-3b-figures.ts';

/** A chain of six carbons with a bond left open at each end (`end` long), a hydrogen atom above each carbon and `below` under each. */
function chain(name: string, below: string[], unit = 1.3, end = 1) {
  const atoms: Record<string, GridAtom> = { L: ['', -end, 0], R: ['', 5 + end, 0] };
  const bonds = ['L-C0', 'C5-R'];
  for (let i = 0; i < 6; i++) {
    atoms[`C${i}`] = ['C', i, 0];
    atoms[`U${i}`] = ['H', i, 1];
    atoms[`D${i}`] = [below[i], i, -1];
    bonds.push(`C${i}-U${i}`, `C${i}-D${i}`);
    if (i < 5) bonds.push(`C${i}-C${i + 1}`);
  }
  return structure({ name, unit, atoms, bonds: bonds.join(' ') });
}

// Three ethene molecules (top) open their double bonds and link into a chain of poly(ethene)
// (bottom); brackets mark one repeating unit.
const ethene = (name: string, x: number) =>
  structure({ name, unit: 1.3, at: [x, 4.8], atoms: { C1: ['C', 0, 0], C2: ['C', 1, 0], H1: ['H', 0, 1], H2: ['H', 0, -1], H3: ['H', 1, 1], H4: ['H', 1, -1] }, bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4' });
const polythene = figure(
  'f',
  [
    ethene('m1', 0),
    ethene('m2', 3.0),
    ethene('m3', 6.0),
    arrow('arrow', [3.25, 3.0], [3.25, 1.75]),
    chain('ch', ['H', 'H', 'H', 'H', 'H', 'H']),
    brackets('unit', -0.65, 1.95, -1.75, 1.75, { n: 'n' }),
  ],
  560,
);

// A segment of poly(propene): three units of CH2–CH(CH3), the CH3 groups as branches.
const polypropene = figure('p', [chain('ch', ['H', 'CH3', 'H', 'CH3', 'H', 'CH3'], 1.6, 0.6), brackets('unit', -0.8, 2.4, -2.1, 2.1, { n: 'n' })], 460);

const video: Explainer = {
  id: 'c30-3-6-c',
  lessonId: 'c30-3-6',
  title: 'Esterification and Polymerisation, Part 3: Addition Polymers',
  thumbnailTitle: 'Addition Polymers',
  thumbnail: 'f',
  summary:
    'A polymer is a very large molecule made of many small molecules, monomers, joined in a long chain. In an addition polymer, monomers with a carbon–carbon double bond join as each double bond opens, with no other product: ethene gives poly(ethene). The repeating unit has the monomer’s atoms with a single bond between the two carbons, and putting the double bond back gives the monomer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Addition Polymers', subtitle: 'Opening double bonds, end to end' }],
      lines: [
        { say: 'A single plastic bag is made of chains of thousands of ethene molecules, linked end to end.', show: 'title' },
        { say: 'In this part, you will see how molecules with a double bond join into long chains, and how to work back to the molecule a chain was made from.' },
      ],
    },
    {
      chapter: 'Polymers and monomers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polymer and monomer', md: 'A **polymer** is a very large molecule made of many small molecules, called **monomers**, joined in a long chain. The part of the chain that repeats is the **repeating unit**. Making a polymer is **polymerisation**.' },
      ],
      lines: [
        { say: 'A polymer is a very large molecule, made of many small molecules joined in a long chain. The small molecules are called monomers.', show: 'def' },
        { say: 'The part of the chain that repeats is called the repeating unit. Making a polymer is called polymerisation.' },
      ],
    },
    {
      chapter: 'Poly(ethene)',
      layout: 'split',
      leftWidth: 620,
      left: [polythene],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Addition polymer', md: 'Monomers with a $\\ce{C=C}$ double bond join: each double bond opens, and the carbons link to the neighbouring monomers. **No other product forms.**' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{n CH2=CH2}', '\\ce{-> -[CH2-CH2]_{n}-{}}'] },
      ],
      lines: [
        { say: 'An addition polymer forms from monomers with a carbon–carbon double bond. Here are three ethene molecules.', show: ['f.m1', 'f.m2', 'f.m3', 'def'] },
        { say: 'Each double bond opens, and the carbons link to the neighbouring monomers. No other product forms, so the polymer has the same atoms as all the monomers together.', show: ['f.arrow', 'f.ch'] },
        { say: 'The repeating unit has the monomer’s atoms, with a single bond between its two carbons and a bond out at each end. The letter n is the number of units, often thousands.', show: ['f.unit', 'm'], focus: ['f.unit', 'm.1'] },
        { say: 'The polymer is named poly, then the monomer in brackets: poly ethene, also called polyethylene.', caption: 'The polymer is named poly, then the monomer in brackets: poly(ethene), also called polyethylene.' },
      ],
    },
    {
      chapter: 'Common addition polymers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Monomer', 'Polymer', 'Repeating unit', 'Uses'],
          rows: [
            ['$\\ce{CH2=CH2}$', 'poly(ethene)', '$\\ce{-[CH2-CH2]-{}}$', 'bags, bottles'],
            ['$\\ce{CH2=CH-CH3}$', 'poly(propene)', '$\\ce{-[CH2-CH(CH3)]-{}}$', 'ropes, crates'],
            ['$\\ce{CH2=CHCl}$', 'poly(chloroethene), PVC', '$\\ce{-[CH2-CHCl]-{}}$', 'water pipes'],
            ['$\\ce{CF2=CF2}$', 'poly(tetrafluoroethene), PTFE', '$\\ce{-[CF2-CF2]-{}}$', 'non-stick coatings'],
            ['$\\ce{CH2=CH(C6H5)}$', 'poly(phenylethene), polystyrene', '$\\ce{-[CH2-CH(C6H5)]-{}}$', 'foam packaging'],
          ],
        },
      ],
      lines: [
        { say: 'Many plastics are made this way. Poly ethene makes bags and bottles, and poly propene makes ropes, crates and food tubs.', caption: 'Many plastics are made this way. Poly(ethene) makes bags and bottles, and poly(propene) makes ropes, crates and food tubs.', show: ['t.0', 't.1'] },
        { say: 'Poly chloro-ethene, or P V C, makes water pipes and window frames. Poly tetra-fluoro-ethene, or P T F E, makes non-stick coatings.', caption: 'Poly(chloroethene), or PVC, makes water pipes and window frames. Poly(tetrafluoroethene), or PTFE, makes non-stick coatings.', show: ['t.2', 't.3'] },
        { say: 'And poly phenyl-ethene, called polystyrene, makes foam packaging and cups.', caption: 'And poly(phenylethene), called polystyrene, makes foam packaging and cups.', show: 't.4' },
      ],
    },
    {
      chapter: 'Poly(propene)',
      layout: 'split',
      leftWidth: 660,
      left: [polypropene],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH2=CH-CH3}', '\\ce{-[CH2-CH(CH3)]_{n}-{}}'] },
        { kind: 'callout', id: 'back', tone: 'tip', title: 'Finding the monomer', md: 'Find the two-carbon repeating unit, and put the **double bond** back between its carbons.' },
      ],
      lines: [
        { say: 'Now poly propene. When the double bond of propene opens, its C H three group becomes a branch on the chain.', caption: 'Now poly(propene). When the double bond of propene opens, its CH₃ group becomes a branch on the chain.', show: 'm.0' },
        { say: 'So the repeating unit is C H two, then C H with a C H three branch. Here is a segment of three units.', caption: 'So the repeating unit is CH₂, then CH with a CH₃ branch. Here is a segment of three units.', show: ['m.1', 'p.ch', 'p.unit'], focus: ['m.1', 'p.unit'] },
        { say: 'To find the monomer of an addition polymer, work backwards. Find the two-carbon repeating unit, and put the double bond back between its carbons. That gives propene again.', show: 'back', focus: ['p.ch-C0', 'p.ch-C1', 'm.0'] },
      ],
    },
    {
      chapter: 'The double bond does not stay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The double bond does not stay', md: 'With a double bond **and** a bond to each neighbour, each carbon would have five bonds. The double bond is used up in linking the monomers.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\ce{-[CH2=CHCl]-{}}\\ \\ \\text{wrong}}', '\\good{\\ce{-[CH2-CHCl]-{}}\\ \\ \\text{right}}'] },
      ],
      lines: [
        { say: 'A common mistake is to keep the double bond in the repeating unit, as here for poly chloro-ethene.', caption: 'A common mistake is to keep the double bond in the repeating unit, as here for poly(chloroethene).', show: 'm.0', focus: 'm.0' },
        { say: 'With a double bond and a bond to each neighbour, each carbon would have five bonds. Carbon has only four.', show: 'oops' },
        { say: 'The double bond is used up in linking the monomers, so the repeating unit has a single bond.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A segment of a polymer chain is $\\ce{-CH2-CHCl-CH2-CHCl-CH2-CHCl-{}}$. Which monomer was it made from?',
          choices: ['$\\ce{CH3-CH2Cl}$', '$\\ce{CHCl=CHCl}$', '$\\ce{CH2=CH2}$', '$\\ce{CH2=CHCl}$'],
          answer: 3,
          working: 'The repeating unit is $\\ce{-[CH2-CHCl]-{}}$. Putting the double bond back between its two carbons gives chloroethene, $\\ce{CH2=CHCl}$: the polymer is PVC.',
        },
      ],
      lines: [
        { say: 'Your turn. Here is a segment of a polymer chain. Which monomer was it made from? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, chloro-ethene. The repeating unit is C H two, C H Cl, and putting the double bond back gives the monomer. Choice A has no double bond, so it cannot form an addition polymer.', caption: 'The answer is D, chloroethene. The repeating unit is CH₂–CHCl, and putting the double bond back gives the monomer. Choice A has no double bond, so it cannot form an addition polymer.', show: 'q.answer' },
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
            'A **polymer** is a long chain of **monomers**; the part that repeats is the repeating unit.',
            '**Addition polymers** form from monomers with a $\\ce{C=C}$ double bond, with no other product.',
            '$\\ce{n CH2=CH2 -> -[CH2-CH2]_{n}-{}}$: the repeating unit has a single bond and a bond out at each end.',
            'To find the monomer, put the double bond back between the two carbons of the repeating unit.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polymer is a long chain of monomers, and the part that repeats is the repeating unit.', show: 'sum.0' },
        { say: 'Addition polymers form from monomers with a carbon–carbon double bond, and no other product forms.', show: 'sum.1' },
        { say: 'The repeating unit has the monomer’s atoms, with a single bond and a bond out at each end.', show: 'sum.2' },
        { say: 'To find the monomer, put the double bond back. In part four, you will meet polymers that release water as they form. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
