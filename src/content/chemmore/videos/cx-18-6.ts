import type { Explainer } from '@/video/script.ts';
import { aquaIon, lewisAdduct } from './lib/cx-molecules.ts';

const video: Explainer = {
  id: 'cx-18-6',
  lessonId: 'cx-18-6',
  title: 'Lewis Acids and Coordination Compounds',
  thumbnail: 'aq',
  summary:
    'A Lewis acid accepts an electron pair and a Lewis base donates one, forming a dative bond, as when ammonia gives its lone pair to boron trifluoride. In a complex ion, ligands with lone pairs bond to a central metal ion, and the coordination number of 2, 4 or 6 sets a linear, tetrahedral or square planar, or octahedral shape. A complex is named by its ligands with di, tetra or hexa, then the metal with its oxidation state, ending in -ate when the complex is negative.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'Lewis Acids and Coordination Compounds', subtitle: 'Following the electron pairs' }],
      lines: [
        { say: 'Some reactions look like acids meeting bases, with no proton in sight. Boron trifluoride grabs ammonia, and a copper ion collects water molecules around it.', show: 'title' },
        { say: 'In this lesson, you will identify Lewis acids and bases, and name complex ions with their coordination numbers, shapes and oxidation states.' },
      ],
    },
    {
      chapter: 'A dative bond',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lewis acid and base', md: 'A **Lewis acid** accepts an electron pair; a **Lewis base** donates one. Together they form a dative (coordinate) bond.' },
        lewisAdduct('ba', 300),
      ],
      lines: [
        { say: 'A Lewis acid is an electron-pair acceptor, and a Lewis base is an electron-pair donor. Here is boron trifluoride, with only six outer electrons on boron, and ammonia, with a lone pair on nitrogen.', show: ['def', 'ba'] },
        { say: 'The lone pair moves in to form a dative bond, with both electrons from nitrogen. Ammonia is the Lewis base, and boron trifluoride the Lewis acid, with no proton involved.', play: 'ba.bind' },
      ],
    },
    {
      chapter: 'Lewis acids and bases',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Lewis acids (accept a pair)', 'Lewis bases (have a lone pair)'], rows: [['H⁺, BF₃, AlCl₃', 'NH₃, H₂O'], ['metal ions such as Cu²⁺', 'OH⁻, Cl⁻, CN⁻']] },
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'No lone pair, no base', md: 'Methane has no lone pair, so it cannot be a Lewis base.' },
      ],
      lines: [
        { say: 'A Lewis acid need not contain hydrogen. Hydrogen ions, boron trifluoride, aluminium chloride and metal ions all accept pairs.', show: 't' },
        { say: 'A Lewis base must have a lone pair, so ammonia, water and hydroxide ions can be bases, but methane cannot. Every Brønsted base is also a Lewis base, because it uses a lone pair to take a proton.', show: 'w' },
      ],
    },
    {
      chapter: 'A complex ion forms',
      layout: 'center',
      main: [aquaIon('aq', 420)],
      lines: [
        { say: 'Here is a copper two ion, and six water molecules, each with lone pairs on its oxygen.', caption: 'Here is a copper(II) ion, and six water molecules, each with lone pairs on its oxygen.', show: 'aq' },
        { say: 'Each water molecule turns its oxygen towards the ion and donates a pair, forming six dative bonds. The water molecules are the ligands, and the copper ion is the Lewis acid. Six bonds means a coordination number of six.', play: 'aq.bind' },
      ],
    },
    {
      chapter: 'Coordination number and shape',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Coordination number', 'Shape', 'Example'], rows: [['2', 'linear', '[Ag(NH₃)₂]⁺'], ['4', 'tetrahedral', '[CoCl₄]²⁻, [Zn(NH₃)₄]²⁺'], ['4', 'square planar', '[Cu(NH₃)₄]²⁺, [Ni(CN)₄]²⁻'], ['6', 'octahedral', '[Cu(H₂O)₆]²⁺, [Fe(CN)₆]³⁻']] },
      ],
      lines: [
        { say: 'The coordination number is the number of dative bonds to the central ion. Two bonds give a linear complex, like the silver ammine ion.', show: 't.0' },
        { say: 'Four bonds give either a tetrahedral or a square planar complex, and six give an octahedral complex, like the copper aqua ion you just saw.', show: ['t.1', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'Naming complex ions',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Ligands with di, tetra, hexa: **ammine** (NH₃), **aqua** (H₂O), **chloro**, **cyano**, **hydroxo**.', 'Then the metal and its oxidation state; a **negative** complex ends in **‑ate** (ferrate, cuprate).'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{[Fe(CN)6]^3-}: \\ x + 6(-1) = -3 \\;\\Rightarrow\\; x = +3', '\\text{hexacyanoferrate(III) ion}'] },
      ],
      lines: [
        { say: 'To name a complex ion, name the ligands first, with di, tetra or hexa for their number: ammine for ammonia, aqua for water, and chloro, cyano or hydroxo for the negative ones.', show: 'b.0' },
        { say: 'Then name the metal, with its oxidation state in Roman numerals. If the complex is negative, the metal’s name ends in a-t-e, often from its Latin name, like ferrate for iron.', caption: 'Then name the metal, with its oxidation state in Roman numerals. If the complex is negative, the metal’s name ends in -ate, often from its Latin name, like ferrate for iron.', show: 'b.1' },
        { say: 'In this iron complex, six cyano ligands carry six negative charges, and the ion is three negative, so iron is plus three. It is the hexacyanoferrate three ion.', caption: 'In this iron complex, six cyano ligands carry six negative charges, and the ion is 3−, so iron is +3. It is the hexacyanoferrate(III) ion.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the oxidation state of cobalt in $\\ce{[CoCl4]^2-}$, and the coordination number?',
          choices: ['+2, 4', '+4, 4', '+2, 6', '−2, 4'],
          answer: 0,
          working: 'Four chloro ligands give −4: $x - 4 = -2$, so $x = +2$. Four dative bonds give a coordination number of 4.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the oxidation state of cobalt in the tetrachlorocobaltate ion, with a two minus charge, and what is its coordination number? Pause the video and try it.', caption: 'Your turn. What is the oxidation state of cobalt in [CoCl₄]²⁻, and what is its coordination number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four chloro ligands give four negative charges, and the ion is two negative, so cobalt is plus two. Four dative bonds give a coordination number of four.', caption: 'The answer is A. Four chloro ligands give four negative charges, and the ion is 2−, so cobalt is +2. Four dative bonds give a coordination number of 4.', show: 'q.answer' },
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
            'Lewis acids accept electron pairs; Lewis bases donate them, forming dative bonds.',
            'In a complex ion, ligands are Lewis bases and the metal ion is the Lewis acid.',
            'Coordination number 2 is linear, 4 tetrahedral or square planar, 6 octahedral.',
            'Name the ligands, then the metal and its oxidation state; a negative complex ends in -ate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Lewis acids accept electron pairs, and Lewis bases donate them, forming dative bonds.', show: 'sum.0' },
        { say: 'In a complex ion, the ligands are Lewis bases and the metal ion is the Lewis acid.', show: 'sum.1' },
        { say: 'A coordination number of two is linear, four is tetrahedral or square planar, and six is octahedral.', show: 'sum.2' },
        { say: 'And to name a complex, give the ligands, then the metal with its oxidation state, ending in a-t-e when the complex is negative.', caption: 'And to name a complex, give the ligands, then the metal with its oxidation state, ending in -ate when the complex is negative.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
