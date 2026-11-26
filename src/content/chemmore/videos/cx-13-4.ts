import type { Explainer } from '@/video/script.ts';
import { spreading } from '../../chem20/videos/lib/c20-molecules.ts';
import { restrictedRotation } from './lib/cx-molecules.ts';

const video: Explainer = {
  id: 'cx-13-4',
  lessonId: 'cx-13-4',
  title: 'Hybridisation, Sigma and Pi Bonds',
  thumbnail: 'sp',
  summary:
    'Count the regions of electron density round a central atom: 2 is sp (linear, 180°), 3 is sp² (trigonal planar, 120°), 4 is sp³ (tetrahedral, 109.5°) and 6 is sp³d² (octahedral). A single bond is one sigma bond, a double bond is one sigma and one pi, and a triple bond is one sigma and two pi. Sigma bonds are stronger, and a pi bond stops rotation about a double bond.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Measurement, Chemical Laws and Orbitals', title: 'Hybridisation, Sigma and Pi Bonds', subtitle: 'Why methane is a tetrahedron' }],
      lines: [
        { say: 'On paper, carbon should form only two bonds, at right angles. Yet methane has four identical bonds, pointing to the corners of a tetrahedron.', show: 'title' },
        { say: 'In this lesson, you will work out the hybridisation of a central atom, link it to the shape, and count sigma and pi bonds.' },
      ],
    },
    {
      chapter: 'Regions spread out',
      layout: 'center',
      main: [spreading('sp')],
      lines: [
        { say: 'Here are carbon dioxide, boron trifluoride and methane, with their outer atoms bunched together.', show: 'sp' },
        { say: 'Watch them spread out. Each region of electron density pushes the others as far away as it can.', play: 'sp.go' },
        { say: 'Two regions end up in a straight line, three in a flat triangle, and four at the corners of a tetrahedron. To point that way, the central atom mixes its orbitals into new, identical hybrid orbitals.' },
      ],
    },
    {
      chapter: 'Counting regions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Regions', 'Hybridisation', 'Arrangement', 'Angle'],
          rows: [['2', 'sp', 'linear', '180°'], ['3', 'sp²', 'trigonal planar', '120°'], ['4', 'sp³', 'tetrahedral', '109.5°'], ['6', 'sp³d²', 'octahedral', '90°']],
        },
        { kind: 'text', id: 'lp', size: 'md', md: 'Each bonded atom counts once (a double bond too), and so does each lone pair.' },
      ],
      lines: [
        { say: 'To find the hybridisation, count the regions round the central atom. Each bonded atom counts once, even through a double or triple bond, and each lone pair counts once.', show: 'lp' },
        { say: 'Two regions is s p, linear, at one hundred eighty degrees. Three is s p two, trigonal planar, at one hundred twenty. Four is s p three, tetrahedral, at one hundred nine point five. And six is s p three d two, octahedral.', caption: 'Two regions is sp, linear, at 180°. Three is sp², trigonal planar, at 120°. Four is sp³, tetrahedral, at 109.5°. And six is sp³d², octahedral.', show: 't', focus: 't' },
        { say: 'Ammonia and water are s p three as well. Their lone pairs fill some of the hybrid orbitals, so ammonia is pyramidal and water is bent.', caption: 'Ammonia and water are sp³ as well. Their lone pairs fill some of the hybrid orbitals, so ammonia is pyramidal and water is bent.' },
      ],
    },
    {
      chapter: 'Sigma and pi bonds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 's', tone: 'definition', title: 'Sigma (σ) bond', md: 'End-on overlap of orbitals, along the line between the two nuclei.' },
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Pi (π) bond', md: 'Sideways overlap of two p orbitals, above and below that line.' },
        { kind: 'bullets', id: 'b', items: ['Single bond: **1 σ**', 'Double bond: **1 σ + 1 π**', 'Triple bond: **1 σ + 2 π**'] },
      ],
      lines: [
        { say: 'A sigma bond forms when orbitals overlap end-on, along the line between the two nuclei.', show: 's' },
        { say: 'A pi bond forms when two p orbitals overlap sideways, above and below that line. End-on overlap is greater, so a sigma bond is stronger than a pi bond.', show: 'p' },
        { say: 'A single bond is one sigma bond. A double bond is one sigma and one pi. And a triple bond is one sigma and two pi.', show: 'b' },
      ],
    },
    {
      chapter: 'A pi bond stops rotation',
      layout: 'center',
      main: [restrictedRotation('rr')],
      lines: [
        { say: 'Here is why that matters. On the left, a single bond: its two ends turn freely.', show: 'rr', play: 'rr.single' },
        { say: 'On the right, a double bond. Twisting one end pulls the two p orbitals apart, so the pi bond has to break before the groups can swap sides, and the result is a different compound.', play: 'rr.double' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Count every bond', md: 'Ethene, $\\ce{H2C=CH2}$, has **5 σ bonds** (four C–H and one C–C) and **1 π bond**.' }],
      lines: [
        { say: 'Here is a common mistake: forgetting the C H bonds. Ethene has four C H bonds and one carbon to carbon sigma bond, so five sigma bonds, and one pi bond.', caption: 'Here is a common mistake: forgetting the C–H bonds. Ethene has four C–H bonds and one C–C sigma bond, so five sigma bonds, and one pi bond.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the hybridisation of carbon in methanal, $\\ce{H2C=O}$?',
          choices: ['sp', 'sp²', 'sp³', 'sp³d²'],
          answer: 1,
          working: 'Carbon bonds to two H atoms and one O atom and has no lone pair: 3 regions, so sp², trigonal planar.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the hybridisation of carbon in methanal, H two C double bonded to O? Pause the video and try it.', caption: 'Your turn. What is the hybridisation of carbon in methanal, H₂C=O? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, s p two. Carbon is bonded to two hydrogens and one oxygen, with no lone pair. The double bond counts once, so there are three regions, trigonal planar.', caption: 'The answer is B, sp². Carbon is bonded to two hydrogens and one oxygen, with no lone pair. The double bond counts once, so there are three regions, trigonal planar.', show: 'q.answer' },
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
            'Regions round the central atom: 2 is sp, 3 is sp², 4 is sp³, 6 is sp³d².',
            'Linear, trigonal planar, tetrahedral, octahedral; lone pairs change the shape.',
            'Single: 1 σ. Double: 1 σ + 1 π. Triple: 1 σ + 2 π.',
            'σ is stronger than π, and a π bond stops rotation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count the regions round the central atom: two is s p, three is s p two, four is s p three, and six is s p three d two.', caption: 'Let’s sum up. Count the regions round the central atom: two is sp, three is sp², four is sp³, and six is sp³d².', show: 'sum.0' },
        { say: 'They give linear, trigonal planar, tetrahedral and octahedral arrangements, and lone pairs change the shape of the atoms.', show: 'sum.1' },
        { say: 'A single bond is one sigma, a double bond adds one pi, and a triple bond adds two.', show: 'sum.2' },
        { say: 'And sigma bonds are stronger than pi bonds, which stop rotation about a double bond.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
