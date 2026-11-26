import type { Explainer } from '@/video/script.ts';
import { twoShare } from '../../chem10/videos/lib/c10-atoms.ts';
import { alloyPush } from './lib/cx-particles.ts';

// Two hydrogen atoms that bond; the second one's label sits above it, so the two labels do not overlap once they have joined.
const pair = twoShare('hh', { symbol: 'H', protons: 1, name: 'hydrogen', tone: 'good' }, { symbol: 'H', protons: 1, name: 'hydrogen', tone: 'adj' }, 1.5, 1, 380);
const hh = { ...pair, atoms: pair.atoms.map((a, i) => (i === 1 ? { ...a, labelAbove: true } : a)) };

const video: Explainer = {
  id: 'cx-20-3',
  lessonId: 'cx-20-3',
  title: 'Bond Energy Curves, Ionic Solids and Alloys',
  thumbnail: false,
  summary:
    'As two atoms come together their energy falls, until the nuclei repel. The lowest point of the potential energy curve gives the bond length, and its depth the bond energy. Ionic solids with small, highly charged ions attract most strongly and melt highest, and they are brittle. Metals conduct and bend because of their delocalised electrons; substitutional alloys swap in atoms of a similar size and interstitial alloys fit small atoms into the gaps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Bond Energy Curves, Ionic Solids and Alloys', subtitle: 'Where a bond settles, and why solids behave as they do' }],
      lines: [
        { say: 'Two hydrogen atoms far apart feel almost nothing. Bring them closer and the energy falls. Push them too close and it rises again. The bond sits in between.', show: 'title' },
        { say: 'In this lesson, you will read potential energy curves, and explain the properties of ionic solids, metals and alloys.' },
      ],
    },
    {
      chapter: 'Two atoms meet',
      layout: 'center',
      main: [hh],
      lines: [
        { say: 'Here are two hydrogen atoms, far apart. Watch them come together.', show: ['hh', 'hh.labels'], play: 'hh.share' },
        { say: 'As they approach, each nucleus attracts the other atom’s electron, so the energy falls. They settle where their shells overlap and they share a pair of electrons.' },
        { say: 'If they came any closer, the two positive nuclei would repel strongly, and the energy would shoot up. So the bond has a natural length.' },
      ],
    },
    {
      chapter: 'The potential energy curve',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reading the curve', md: 'Plot potential energy against the distance between the nuclei. The **bond length** is the distance at the lowest point. The **bond energy** is the depth of the well below zero.' },
        { kind: 'bullets', id: 'b', items: ['H–H: 74 pm, 436 kJ/mol', 'A stronger bond: a deeper well', 'Larger atoms: a longer bond'] },
      ],
      lines: [
        { say: 'On a graph of potential energy against the distance between the nuclei, the bond length is the distance at the lowest point, and the bond energy is the depth of the well.', show: 'def' },
        { say: 'For hydrogen, the lowest point is at seventy-four picometres, and the well is four hundred thirty-six kilojoules per mole deep.', caption: 'For hydrogen, the lowest point is at 74 pm, and the well is 436 kJ/mol deep.', show: 'b.0' },
        { say: 'A stronger bond gives a deeper well.', show: 'b.1' },
        { say: 'And larger atoms give a longer bond, so the lowest point sits farther to the right.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Ionic solids',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['F \\propto \\dfrac{q_1 q_2}{r^2}', '\\ce{NaCl}: 1+,\\ 1-\\quad \\text{melts at about } 800\\ ^\\circ\\text{C}', '\\ce{MgO}: 2+,\\ 2-\\quad \\text{melts at about } 2800\\ ^\\circ\\text{C}'] },
        { kind: 'callout', id: 'br', tone: 'key', title: 'Brittle', md: 'A blow shifts one layer, so ions of the same charge line up and repel, and the crystal splits.' },
      ],
      lines: [
        { say: 'In an ionic solid, each ion is held by the ions of opposite charge around it. Coulomb’s law says the attraction is strongest for large charges and small ions.', show: 'm.0', focus: 'm.0' },
        { say: 'Sodium chloride, with charges of one, melts at about eight hundred degrees Celsius.', caption: 'Sodium chloride, with charges of 1+ and 1−, melts at about 800 °C.', show: 'm.1', focus: 'm.1' },
        { say: 'Magnesium oxide, with charges of two, melts at about two thousand eight hundred.', caption: 'Magnesium oxide, with charges of 2+ and 2−, melts at about 2800 °C.', show: 'm.2', focus: 'm.2' },
        { say: 'Ionic solids are hard but brittle. A blow shifts one layer of ions, so ions of the same charge end up side by side, and they repel and split the crystal.', show: 'br' },
      ],
    },
    {
      chapter: 'Metals and alloys, up close',
      layout: 'center',
      main: [alloyPush('al')],
      lines: [
        { say: 'Metals are different. Their atoms sit in a sea of delocalised electrons, so the layers can slide without breaking the bonding. Here is pure copper above, and brass below, with bigger zinc atoms among the copper.', show: ['al', 'al.labels', 'al.key'] },
        { say: 'Both get the same push. In copper the rows slide over one another, but in brass the zinc atoms jam the rows, so it hardly gives.', play: 'al.push' },
        { say: 'Brass is a substitutional alloy: zinc atoms, close in size to copper’s, take the place of some copper atoms. In steel, much smaller carbon atoms fit into the gaps between iron atoms, making an interstitial alloy.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which ionic solid should have the highest melting point? (The ions are of similar sizes.)',
          choices: ['$\\ce{CaO}$', '$\\ce{KCl}$', '$\\ce{NaCl}$', '$\\ce{KBr}$'],
          answer: 0,
          working: '$\\ce{Ca^2+}$ and $\\ce{O^2-}$ carry charges of 2, so the attraction is about four times that between ions of charge 1.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these ionic solids should have the highest melting point? The ions are of similar sizes. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, calcium oxide. Its ions carry charges of two, so they attract each other about four times as strongly as ions with charges of one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Lowest point: bond length. Depth: bond energy.', 'Small, highly charged ions: the highest melting points.', 'Ionic solids are brittle; metals bend and conduct.', 'Substitutional alloys swap atoms; interstitial alloys fill gaps.'] }],
      lines: [
        { say: 'Let’s sum up. The lowest point of a potential energy curve gives the bond length, and its depth the bond energy.', show: 'sum.0' },
        { say: 'Ionic solids with small, highly charged ions have the highest melting points.', show: 'sum.1' },
        { say: 'Ionic solids are brittle, while metals bend and conduct, thanks to their delocalised electrons.', show: 'sum.2' },
        { say: 'And substitutional alloys swap in atoms of a similar size, while interstitial alloys fit small atoms into the gaps.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
