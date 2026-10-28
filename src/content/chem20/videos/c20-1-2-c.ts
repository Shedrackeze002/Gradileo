import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chargeBars } from './lib/c20-1a-figures.ts';

// Iron(III) oxide: three O²⁻ make 6−, so the two iron ions share 6+, 3+ each.
const bars = figure('bars', [chargeBars({ plus: { count: 2, size: 3, tex: '\\ce{Fe^3+}' }, minus: { count: 3, size: 2, tex: '\\ce{O^2-}' } })], 300);

const video: Explainer = {
  id: 'c20-1-2-c',
  lessonId: 'c20-1-2',
  title: 'Ionic Compounds, Part 3: Naming and Roman Numerals',
  thumbnailTitle: 'Naming and Roman Numerals',
  thumbnail: 'bars',
  summary:
    'Name an ionic compound cation first, then anion: a metal keeps its name, a monatomic anion ends in -ide, a polyatomic ion keeps its name, and there are no prefixes (MgCl2 is magnesium chloride). For a metal with more than one charge, a Roman numeral gives the charge, found from the anions: Fe2O3 is iron(III) oxide and Cu2O is copper(I) oxide. Going the other way, iron(III) sulfate is Fe2(SO4)3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Naming and Roman Numerals', subtitle: 'Cation first, then anion' }],
      lines: [
        { say: 'Iron and oxygen make two different compounds, a black powder and the reddish-brown oxide in rust, so their names must tell them apart.', show: 'title' },
        { say: 'In this part, you will name ionic compounds, using Roman numerals where a metal has more than one charge.' },
      ],
    },
    {
      chapter: 'Cation first, then anion',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A metal cation keeps the name of its element: sodium, calcium, aluminium.',
            'A monatomic anion ends in **-ide**: chloride, oxide, nitride, sulfide.',
            'A polyatomic ion keeps its own name: ammonium, nitrate, sulfate.',
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{K2S}\\text{: potassium sulfide} \\qquad \\ce{CaCO3}\\text{: calcium carbonate}', '\\ce{NH4NO3}\\text{: ammonium nitrate}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'No prefixes in ionic names', md: 'The charges already fix how many of each ion there are. $\\ce{MgCl2}$ is magnesium chloride, not magnesium dichloride.' },
      ],
      lines: [
        { say: 'Name the cation first, then the anion. A metal cation keeps the name of its element.', show: 'b.0', focus: 'b.0' },
        { say: 'An anion of one atom changes its ending, as in chloride and oxide. A polyatomic ion keeps its own name.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'So K two S is potassium sulfide, C A C O three is calcium carbonate, and N H four N O three is ammonium nitrate.', caption: 'So K₂S is potassium sulfide, CaCO₃ is calcium carbonate, and NH₄NO₃ is ammonium nitrate.', show: 'm', focus: 'm' },
        { say: 'The name never counts the ions, because the charges already fix that. M G C L two is magnesium chloride, not magnesium dye-chloride.', caption: 'The name never counts the ions, because the charges already fix that. MgCl₂ is magnesium chloride, not magnesium dichloride.', show: 'oops' },
      ],
    },
    {
      chapter: 'Metals with more than one charge',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal', 'Its ions', ''],
          rows: [
            ['iron', 'iron(II) $\\ce{Fe^2+}$', 'iron(III) $\\ce{Fe^3+}$'],
            ['copper', 'copper(I) $\\ce{Cu+}$', 'copper(II) $\\ce{Cu^2+}$'],
            ['tin', 'tin(II) $\\ce{Sn^2+}$', 'tin(IV) $\\ce{Sn^4+}$'],
            ['lead', 'lead(II) $\\ce{Pb^2+}$', 'lead(IV) $\\ce{Pb^4+}$'],
            ['mercury', 'mercury(I) $\\ce{Hg2^2+}$', 'mercury(II) $\\ce{Hg^2+}$'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Roman numeral', md: 'In brackets straight after the metal, it gives the **charge** of the metal ion: iron(III) is $\\ce{Fe^3+}$. I = 1, II = 2, III = 3, IV = 4.' },
        { kind: 'callout', id: 'one', tone: 'tip', title: 'Only one charge? No numeral', md: 'Groups 1 and 2, aluminium, zinc and silver: zinc chloride, silver nitrate.' },
      ],
      lines: [
        { say: 'Many transition metals, and a few others such as tin and lead, form ions with different charges. Iron forms iron two plus and iron three plus, so the name must say which.', show: 't', focus: 't.0' },
        { say: 'A Roman numeral in brackets, straight after the metal, gives the charge of its ion: iron two is iron two plus.', caption: 'A Roman numeral in brackets, straight after the metal, gives the charge of its ion: iron(II) is Fe²⁺.', show: 'def' },
        { say: 'Mercury one is the odd one out: two mercury atoms sharing a charge of two plus, treated as one ion.', caption: 'Mercury(I) is the odd one out: two mercury atoms sharing a charge of 2+, treated as one ion.', focus: 't.4' },
        { say: 'Metals with only one common charge, such as those in groups one and two, aluminium, zinc and silver, never take a Roman numeral.', show: 'one', focus: 't' },
      ],
    },
    {
      chapter: 'Finding the charge',
      layout: 'split',
      leftWidth: 480,
      left: [bars],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{FeCl3}\\text{: } 3 \\times 1{-} = 3{-}', '\\Rightarrow \\ce{Fe^3+}\\text{, iron(III) chloride}', '\\ce{Fe2O3}\\text{: } 3 \\times 2{-} = 6{-}', '6{+} \\div 2 = 3{+} \\Rightarrow \\text{iron(III) oxide}'] }],
      lines: [
        { say: 'To name a compound from its formula, find the metal’s charge from the anions: add up their negative charge, and share it among the metal ions.' },
        { say: 'In F E C L three, three chloride ions give three minus, so the iron ion is three plus: iron three chloride.', caption: 'In FeCl₃, three chloride ions give 3−, so the iron ion is 3+: iron(III) chloride.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Now F E two O three. Each oxide ion is two minus, so three of them give six minus.', caption: 'Now Fe₂O₃. Each oxide ion is 2−, so three of them give 6−.', show: ['m.2', 'bars.m0', 'bars.m1', 'bars.m2', 'bars.m-total'], focus: 'm.2' },
        { say: 'The two iron ions must give six plus between them, so each is three plus: iron three oxide.', caption: 'The two iron ions must give 6+ between them, so each is 3+: iron(III) oxide.', show: ['m.3', 'bars.p0', 'bars.p1', 'bars.p-total'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A charge, not a count',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The numeral is a charge, not a count', md: 'In $\\ce{Cu2O}$, the 2 counts the copper ions. Two copper ions cancel one $\\ce{O^2-}$, so each is 1+: **copper(I) oxide**, not copper(II) oxide.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{iron(III) sulfate: } \\ce{Fe^3+},\\ \\ce{SO4^2-}\\text{, LCM } 6', '2 \\times 3{+} = 6{+} \\qquad 3 \\times 2{-} = 6{-} \\;\\Rightarrow\\; \\ce{Fe2(SO4)3}'] },
      ],
      lines: [
        { say: 'Careful: the numeral is a charge, not a count. In C U two O, two copper ions cancel one oxide ion, so each is one plus: copper one oxide.', caption: 'Careful: the numeral is a charge, not a count. In Cu₂O, two copper ions cancel one oxide ion, so each is 1+: copper(I) oxide.', show: 'oops' },
        { say: 'Going the other way, the numeral gives the charge for the formula. Iron three sulfate has iron three plus and sulfate two minus: a lowest common multiple of six.', caption: 'Going the other way, the numeral gives the charge for the formula. Iron(III) sulfate has Fe³⁺ and SO₄²⁻: a lowest common multiple of 6.', show: 'm.0', focus: 'm.0' },
        { say: 'Two iron ions and three sulfate ions, with the sulfate in brackets.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Name the compound $\\ce{SnO2}$. Include the charge of the metal ion as a Roman numeral.',
          choices: ['tin oxide', 'tin(II) oxide', 'tin dioxide', 'tin(IV) oxide'],
          answer: 3,
          working: 'Two $\\ce{O^2-}$ ions give 4−, so the one tin ion is $\\ce{Sn^4+}$: tin(IV) oxide.',
        },
      ],
      lines: [
        { say: 'Your turn. Name the compound S N O two, with the charge of the metal ion as a Roman numeral. Pause the video and try it.', caption: 'Your turn. Name the compound SnO₂, with the charge of the metal ion as a Roman numeral. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, tin four oxide. Two oxide ions give four minus, so the tin ion is four plus. Choice B uses the number of oxide ions instead.', caption: 'The answer is D, tin(IV) oxide. Two oxide ions give 4−, so the tin ion is 4+. Choice B uses the number of oxide ions instead.', show: 'q.answer' },
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
            'Cation first, then anion; monatomic anions end in -ide; no prefixes.',
            'A **Roman numeral** gives the charge of a metal with more than one charge.',
            'Find it from the anions: $\\ce{Fe2O3}$ is 6− shared by two iron ions, so iron(III) oxide.',
            'The numeral is a charge, not a count: $\\ce{Cu2O}$ is copper(I) oxide.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Name the cation first, then the anion, with no prefixes.', show: 'sum.0' },
        { say: 'A Roman numeral gives the charge of a metal that can have more than one charge.', show: 'sum.1' },
        { say: 'Find it from the anions’ total charge, shared among the metal ions.', show: 'sum.2' },
        { say: 'And the numeral is a charge, not a count. In part four, you will see what the lattice of ions explains. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
