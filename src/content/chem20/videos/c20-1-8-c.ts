import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { link, tag, water } from './lib/c20-1b-figures.ts';

// A water molecule (centre, with its two lone pairs) and four neighbours: two whose hydrogen atoms
// point at its lone pairs, and two whose oxygen atoms take its hydrogen atoms. Each hydrogen bond
// is a dashed green line.
const hbonds = () =>
  figure('m', [
    link({ id: 'hb1', from: 'w1-H2', to: 'w0-O' }),
    link({ id: 'hb2', from: 'w2-H1', to: 'w0-O' }),
    link({ id: 'hb3', from: 'w0-H1', to: 'w3-O' }),
    link({ id: 'hb4', from: 'w0-H2', to: 'w4-O' }),
    water({ name: 'w0', at: [0, 0], lone: true, group: 'mol' }),
    water({ name: 'w1', at: [-2.401, 3.073], turn: -14.25, group: 'mol' }),
    water({ name: 'w2', at: [2.401, 3.073], turn: 14.25, group: 'mol' }),
    water({ name: 'w3', at: [-2.846, -2.204], turn: -14.25, group: 'mol' }),
    water({ name: 'w4', at: [2.846, -2.204], turn: 14.25, group: 'mol' }),
    tag({ id: 'plus', at: [1.4, -1.25], tex: '\\delta^+', tone: 'opp', place: 'below left' }),
    tag({ id: 'minus', at: [3.2, -1.75], tex: '\\delta^-', tone: 'adj', place: 'above right' }),
  ]);

const video: Explainer = {
  id: 'c20-1-8-c',
  lessonId: 'c20-1-8',
  title: 'Intermolecular Forces, Part 3: Hydrogen Bonds',
  thumbnailTitle: 'Hydrogen Bonds',
  thumbnail: 'm',
  summary:
    'A hydrogen bond is the attraction between a hydrogen atom bonded directly to N, O or F and a lone pair on an N, O or F atom of another molecule; for molecules of similar size it is the strongest of the three intermolecular forces. Water, ammonia, hydrogen fluoride and methanol form hydrogen bonds, and the forces add up: London forces for all molecules, dipole–dipole forces for polar ones, and hydrogen bonds as well for H on N, O or F.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Hydrogen Bonds', subtitle: 'The strongest of the three' }],
      lines: [
        { say: 'Water molecules cling to each other far more tightly than their size suggests. The reason is a special attraction called a hydrogen bond.', show: 'title' },
        { say: 'In this part, you will see when hydrogen bonds form, which molecules have them, and how the three forces add up.' },
      ],
    },
    {
      chapter: 'Hydrogen on N, O or F',
      layout: 'split',
      leftWidth: 600,
      left: [hbonds()],
      right: [
        { kind: 'text', id: 'en', size: 'md', md: 'Electronegativity: N $3.0$, O $3.4$, F $4.0$.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hydrogen bond', md: 'The attraction between H bonded directly to N, O or F in one molecule and a lone pair on an N, O or F atom of another molecule.' },
      ],
      lines: [
        { say: 'Something special happens when hydrogen is bonded directly to nitrogen, oxygen or fluorine. These atoms are so electronegative that they pull the shared electrons well away from the small hydrogen atom, leaving it strongly delta plus.', caption: 'Something special happens when hydrogen is bonded directly to nitrogen, oxygen or fluorine. These atoms are so electronegative that they pull the shared electrons well away from the small hydrogen atom, leaving it strongly δ+.', show: ['m.w0-mol', 'm.w0-lp1', 'm.w0-lp2', 'm.plus', 'en'], focus: 'm.plus' },
        { say: 'That hydrogen is strongly attracted to a lone pair on a nitrogen, oxygen or fluorine atom of a neighbouring molecule. This attraction is called a hydrogen bond.', show: ['m.w4-mol', 'm.minus', 'm.hb4', 'def'], focus: 'm.hb4' },
        { say: 'For molecules of similar size, hydrogen bonds are the strongest of the three intermolecular forces.' },
      ],
    },
    {
      chapter: 'Up to four per water molecule',
      layout: 'split',
      leftWidth: 600,
      left: [hbonds()],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Water, ammonia, hydrogen fluoride and methanol form hydrogen bonds.', 'Each water molecule can form **up to four**.', 'A hydrogen bond is an intermolecular force, much weaker than a covalent bond.'],
        },
      ],
      lines: [
        { say: 'Water, ammonia, hydrogen fluoride and methanol all form hydrogen bonds.', show: ['m.w0-mol', 'm.w0-lp1', 'm.w0-lp2', 'b.0'] },
        { say: 'Each water molecule can form up to four: two through its hydrogen atoms, and two through the lone pairs on its oxygen.', show: ['m.w1-mol', 'm.w2-mol', 'm.w3-mol', 'm.w4-mol', 'm.hb1', 'm.hb2', 'm.hb3', 'm.hb4', 'b.1'], focus: ['m.hb1', 'm.hb2', 'm.hb3', 'm.hb4'] },
        { say: 'Despite its name, a hydrogen bond is an intermolecular force, not a covalent bond. It is much weaker than the covalent oxygen–hydrogen bond inside a water molecule.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Not every hydrogen',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '“It contains hydrogen, so it forms hydrogen bonds”', md: 'The hydrogen must be bonded **directly to N, O or F**. $\\ce{CH4}$, $\\ce{H2S}$ and $\\ce{HCl}$ contain hydrogen but form no hydrogen bonds.' },
        { kind: 'text', id: 'meoh', size: 'md', align: 'center', md: 'In methanol, $\\ce{CH3OH}$, only the H on the O forms hydrogen bonds; the three on the C cannot.' },
      ],
      lines: [
        { say: 'Watch out: the hydrogen must be bonded directly to nitrogen, oxygen or fluorine. Methane, hydrogen sulfide and hydrogen chloride all contain hydrogen, but they form no hydrogen bonds.', show: 'oops' },
        { say: 'In methanol, C H three O H, only the hydrogen on the oxygen can form hydrogen bonds. The three on the carbon cannot.', caption: 'In methanol, CH₃OH, only the hydrogen on the oxygen can form hydrogen bonds. The three on the carbon cannot.', show: 'meoh' },
      ],
    },
    {
      chapter: 'The forces add up',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'Polar?', 'H bonded to N, O or F?', 'Forces between its molecules'],
          rows: [
            ['$\\ce{CH4}$', 'no', 'no', 'London dispersion forces'],
            ['$\\ce{HCl}$', 'yes', 'no', 'London and dipole–dipole forces'],
            ['$\\ce{NH3}$', 'yes', 'yes', 'London, dipole–dipole and hydrogen bonds'],
          ],
        },
      ],
      lines: [
        { say: 'The forces add up. Every molecule has London dispersion forces. Polar molecules also have dipole–dipole forces, and molecules with hydrogen on nitrogen, oxygen or fluorine have hydrogen bonds as well.' },
        { say: 'Methane has London forces only. Hydrogen chloride has London and dipole–dipole forces.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'And ammonia has all three. It is trigonal pyramidal, so it is polar, and each hydrogen is bonded to nitrogen, which has a lone pair.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which intermolecular forces act between molecules of methanol, $\\ce{CH3OH}$? (It is polar.)',
          choices: ['London dispersion forces, dipole–dipole forces and hydrogen bonds', 'London dispersion forces and dipole–dipole forces only', 'Hydrogen bonds only', 'London dispersion forces only'],
          answer: 0,
          working: 'London forces act between all molecules. Methanol is polar, so dipole–dipole forces act too. Its H on the O is bonded directly to oxygen, so it forms hydrogen bonds as well.',
        },
      ],
      lines: [
        { say: 'Your turn. Which intermolecular forces act between molecules of methanol? It is polar. Pause the video and try it.', caption: 'Your turn. Which intermolecular forces act between molecules of methanol, CH₃OH? It is polar. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: all three. London forces act between all molecules, methanol is polar, and its hydrogen on the oxygen forms hydrogen bonds. Choice C forgets that the other forces are still there.', show: 'q.answer' },
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
            'A **hydrogen bond**: H bonded to N, O or F, attracted to a lone pair on an N, O or F of another molecule.',
            'The strongest of the three forces for molecules of similar size, but much weaker than a covalent bond.',
            'The forces add up: London for all, dipole–dipole for polar molecules, hydrogen bonds for H on N, O or F.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A hydrogen bond forms when hydrogen bonded to nitrogen, oxygen or fluorine is attracted to a lone pair on one of those atoms in another molecule.', show: 'sum.0' },
        { say: 'It is the strongest of the three forces for molecules of similar size, but much weaker than a covalent bond.', show: 'sum.1' },
        { say: 'And the forces add up. In part four, you will use them to compare boiling points. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
