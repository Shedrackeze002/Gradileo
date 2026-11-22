import type { Explainer } from '@/video/script.ts';
import { boilingRace, boilingWater } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 1.8 (intermolecular forces): put four sets of compounds in
// order of increasing boiling point. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 11, section 10.1, CC BY-NC-SA 4.0). The book's answers:
// (a) SiH4 < HCl < H2O; (b) F2 < Cl2 < Br2; (c) CH4 < C2H6 < C3H8; (d) N2 < O2 < NO.
// Measured boiling points: SiH4 −112, HCl −85, H2O 100; F2 −188, Cl2 −34, Br2 59; CH4 −162,
// C2H6 −89, C3H8 −42; N2 −196, O2 −183, NO −152 (°C).
//
// The pictures are simulated particles (src/video/particles.ts): boiling water, whose molecules
// leave whole, then two heating races, each ball one molecule, where the liquid held by the weakest
// forces boils first.

const QUESTION =
  'Arrange each of the following sets of compounds in order of increasing boiling point temperature: (a) HCl, H2O, SiH4 (b) F2, Cl2, Br2 (c) CH4, C2H6, C3H8 (d) O2, NO, N2';

const video: Explainer = {
  id: 'xq-c20-1-8',
  lessonId: '',
  exam: {
    lesson: 'c20-1-8',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 11, section 10.1, Intermolecular Forces',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/10-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Ordering Boiling Points. Intermolecular Forces',
  thumbnailTitle: 'Which Boils First?',
  thumbnail: 'ra',
  summary:
    'A real test question, solved one small step at a time: we put four sets of compounds in order of boiling point, from HCl, H2O and SiH4 to O2, NO and N2. For each set we ask which molecules form hydrogen bonds, which are polar, and which have the most electrons, and we watch simulated liquids heated side by side boil in that order.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Boils First?', subtitle: 'Intermolecular forces, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to put twelve compounds, in four sets, in order of boiling point. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Arrange each of the following sets of compounds in order of increasing boiling point temperature:<br>(a) $\\ce{HCl}$, $\\ce{H2O}$, $\\ce{SiH4}$ (b) $\\ce{F2}$, $\\ce{Cl2}$, $\\ce{Br2}$<br>(c) $\\ce{CH4}$, $\\ce{C2H6}$, $\\ce{C3H8}$ (d) $\\ce{O2}$, $\\ce{NO}$, $\\ce{N2}$',
          answer: 'Worked out in the steps below',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        {
          say: 'Arrange each of the following sets of compounds in order of increasing boiling point temperature. Part a: H C l, H two O, S i H four. Part b: F two, C l two, B r two. Part c: C H four, C two H six, C three H eight. Part d: O two, N O, N two.',
          caption: 'Arrange each of the following sets of compounds in order of increasing boiling point temperature: (a) HCl, H₂O, SiH₄ (b) F₂, Cl₂, Br₂ (c) CH₄, C₂H₆, C₃H₈ (d) O₂, NO, N₂',
        },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'In each set: **lowest** boiling point first, **highest** last' }],
      lines: [
        { say: 'For each set of three, we list the compounds from the lowest boiling point to the highest.', show: 'plain' },
        { say: 'We do not need any data. We work it out from the forces between the molecules.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 520,
      left: [boilingWater('bw', 400)],
      right: [
        {
          kind: 'table',
          id: 'f',
          head: ['Force', 'Acts between'],
          rows: [
            ['**London**', 'all molecules; stronger with more electrons'],
            ['**Dipole–dipole**', 'polar molecules'],
            ['**Hydrogen bonds**', 'H on N, O or F, and N, O or F'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. When a liquid boils, its molecules pull away from one another, but each molecule stays whole.', show: ['bw', 'bw.labels', 'bw.thermo'], play: 'bw.boil' },
        { say: 'So boiling only has to beat the forces between the molecules. The stronger those forces, the higher the boiling point.' },
        { say: 'There are three kinds. London forces act between all molecules, and they are stronger when a molecule has more electrons.', show: ['f', 'f.0'], focus: 'f.0' },
        { say: 'Dipole–dipole forces act between polar molecules, on top of London forces.', show: 'f.1', focus: 'f.1' },
        { say: 'And hydrogen bonds, the strongest for molecules of similar size, form when hydrogen is bonded to nitrogen, oxygen or fluorine.', show: 'f.2', focus: 'f.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Which ones form **hydrogen bonds**? Highest', 'Which ones are **polar**? Higher', 'Otherwise: more **electrons**, higher'] }],
      lines: [
        { say: 'Here is the plan, for each set. First, a compound that forms hydrogen bonds boils highest.', show: 'plan.0' },
        { say: 'Second, a polar compound boils higher than a non-polar one of similar size.', show: 'plan.1' },
        { say: 'Third, among similar molecules, the one with more electrons has stronger London forces and boils higher.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: [
            '\\ce{SiH4}: \\text{ 18 electrons, non-polar} \\to \\text{London only}',
            '\\ce{HCl}: \\text{ 18 electrons, polar} \\to \\text{+ dipole–dipole}',
            '\\ce{H2O}: \\text{ H on O} \\to \\text{+ hydrogen bonds}',
            '\\adj{\\ce{SiH4}} < \\thc{\\ce{HCl}} < \\opp{\\ce{H2O}}',
          ],
        },
      ],
      lines: [
        { say: 'Step one, part a. Water has hydrogen bonded to oxygen, so it forms hydrogen bonds and boils highest.', show: 'a.2' },
        { say: 'Hydrogen chloride and silane both have 18 electrons, so their London forces are similar. But H C l is polar, so it has dipole–dipole forces as well.', show: ['a.0', 'a.1'], caption: 'Hydrogen chloride and silane both have 18 electrons, so their London forces are similar. But HCl is polar, so it has dipole–dipole forces as well.' },
        { say: 'Silane is a symmetrical tetrahedron, non-polar, with London forces only, so it boils lowest. The order is silane, then hydrogen chloride, then water.', show: 'a.3', focus: 'a.3', caption: 'Silane is a symmetrical tetrahedron, non-polar, with London forces only, so it boils lowest. The order is SiH₄ < HCl < H₂O.' },
      ],
    },
    {
      chapter: 'Watch part (a) boil',
      layout: 'center',
      main: [
        boilingRace('ra', [
          { id: 's', label: 'SiH₄: London only', bond: 0.45, tone: 'good' },
          { id: 'h', label: 'HCl: + dipole–dipole', bond: 0.7, tone: 'theta' },
          { id: 'w', label: 'H₂O: + hydrogen bonds', bond: 1.2, tone: 'opp' },
        ], 400),
      ],
      lines: [
        { say: 'Here are the three as liquids, cold, warmed side by side by the same heater. Each ball stands for one molecule.', show: ['ra', 'ra.labels', 'ra.thermo'] },
        { say: 'Watch. Silane boils away first, then hydrogen chloride, while the water, held by hydrogen bonds, stays liquid the longest.', play: 'ra.heat', caption: 'Watch. SiH₄ boils away first, then HCl, while the water, held by hydrogen bonds, stays liquid the longest.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [
        boilingRace('rb', [
          { id: 'f', label: 'F₂: 18 electrons', bond: 0.35, tone: 'good' },
          { id: 'c', label: 'Cl₂: 34 electrons', bond: 0.65, tone: 'theta' },
          { id: 'b', label: 'Br₂: 70 electrons', bond: 1.1, tone: 'opp' },
        ], 330),
        { kind: 'math', id: 'b', size: 'md', lines: ['18 < 34 < 70 \\text{ electrons}', '\\adj{\\ce{F2}} < \\thc{\\ce{Cl2}} < \\opp{\\ce{Br2}}'] },
      ],
      lines: [
        { say: 'Step two, part b. The halogens are non-polar, with London forces only. So the molecule with the most electrons boils highest.', show: ['rb', 'rb.labels', 'rb.thermo'] },
        { say: 'Fluorine has 18 electrons, chlorine 34 and bromine 70. Watch them heated together: fluorine goes first, then chlorine, and bromine last.', show: 'b.0', play: 'rb.heat' },
        { say: 'So the order is fluorine, then chlorine, then bromine.', show: 'b.1', focus: 'b.1', caption: 'So the order is F₂ < Cl₂ < Br₂.' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'c',
          size: 'lg',
          lines: ['\\ce{CH4}: 6 + 4 = 10 \\text{ electrons}', '\\ce{C2H6}: 12 + 6 = 18 \\text{ electrons}', '\\ce{C3H8}: 18 + 8 = 26 \\text{ electrons}', '\\adj{\\ce{CH4}} < \\thc{\\ce{C2H6}} < \\opp{\\ce{C3H8}}'],
        },
      ],
      lines: [
        { say: 'Step three, part c. These are hydrocarbons, carbon and hydrogen only, so they are non-polar with London forces only. Again we count electrons.', show: 'c.0' },
        { say: 'Methane has 10, ethane 18 and propane 26. Each extra carbon adds more electrons, and stronger London forces.', show: ['c.1', 'c.2'] },
        { say: 'So the order is methane, then ethane, then propane.', show: 'c.3', focus: 'c.3', caption: 'So the order is CH₄ < C₂H₆ < C₃H₈.' },
      ],
    },
    {
      chapter: 'Step 4: Part (d)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'd',
          size: 'lg',
          lines: ['\\ce{N2}: 14 \\text{ electrons, non-polar}', '\\ce{O2}: 16 \\text{ electrons, non-polar}', '\\ce{NO}: 15 \\text{ electrons, polar}', '\\adj{\\ce{N2}} < \\thc{\\ce{O2}} < \\opp{\\ce{NO}}'],
        },
      ],
      lines: [
        { say: 'Step four, part d. Nitrogen and oxygen are each two identical atoms, so they are non-polar. Oxygen has 16 electrons and nitrogen 14, so oxygen boils higher.', show: ['d.0', 'd.1'] },
        { say: 'Nitrogen monoxide joins two different atoms, so it is polar and has dipole–dipole forces as well. With almost the same number of electrons, the extra force puts it highest.', show: 'd.2' },
        { say: 'So the order is nitrogen, then oxygen, then nitrogen monoxide.', show: 'd.3', focus: 'd.3', caption: 'So the order is N₂ < O₂ < NO.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Increasing boiling point', 'Measured (°C)'],
          rows: [
            ['(a)', '$\\ce{SiH4} < \\ce{HCl} < \\ce{H2O}$', '−112, −85, 100'],
            ['(b)', '$\\ce{F2} < \\ce{Cl2} < \\ce{Br2}$', '−188, −34, 59'],
            ['(c)', '$\\ce{CH4} < \\ce{C2H6} < \\ce{C3H8}$', '−162, −89, −42'],
            ['(d)', '$\\ce{N2} < \\ce{O2} < \\ce{NO}$', '−196, −183, −152'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. It matches the book.', show: 'ans' },
        { say: 'A quick check with measured boiling points: in every set, the numbers rise in the order we predicted, and water, with its hydrogen bonds, is far above the rest.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['(a) $\\ce{H2O}$ lowest', 'Fewest electrons, but it has **hydrogen bonds**'],
            ['(a) $\\ce{HCl} < \\ce{SiH4}$', 'Same 18 electrons, but $\\ce{HCl}$ is **polar**'],
            ['(d) $\\ce{N2} < \\ce{NO} < \\ce{O2}$', 'Counted electrons only; $\\ce{NO}$ is **polar**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Putting water lowest because it is the smallest molecule, with only 10 electrons. Its hydrogen bonds outweigh that by far.', focus: 'traps.0' },
        { say: 'Putting silane above hydrogen chloride. With the same 18 electrons, the polar one wins.', focus: 'traps.1' },
        { say: 'And putting nitrogen monoxide in the middle because 15 falls between 14 and 16. Its dipole–dipole forces lift it above oxygen.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these has the **highest** boiling point?',
          choices: ['$\\ce{CH4}$', '$\\ce{F2}$', '$\\ce{HCl}$', '$\\ce{NH3}$'],
          answer: 3,
          working: 'Only NH₃ has H bonded to N, O or F, so only ammonia forms hydrogen bonds.',
        },
      ],
      lines: [
        { say: 'Your turn. Which has the highest boiling point: methane, fluorine, hydrogen chloride or ammonia? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Ammonia has hydrogen bonded to nitrogen, so it is the only one that forms hydrogen bonds. It boils highest: choice D.', show: 'q2.answer' },
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
          items: ['**Hydrogen bonds** first: H on N, O or F', 'Then **polar** beats non-polar', 'Then more **electrons**, stronger London forces'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. To order boiling points, look first for hydrogen bonds, where hydrogen is bonded to nitrogen, oxygen or fluorine.', show: 'sum.0' },
        { say: 'Then a polar molecule boils higher than a non-polar one of similar size.', show: 'sum.1' },
        { say: 'And among similar molecules, more electrons means stronger London forces and a higher boiling point. For more on intermolecular forces, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
