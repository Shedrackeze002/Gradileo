import type { AtomsEl, Explainer } from '@/video/script.ts';
import { nuclei } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 10 lesson 2.1 (inside the atom): count the protons, electrons and
// neutrons in five neutral atoms written in isotope notation. The question is OpenStax Chemistry
// 2e's own (end-of-chapter exercise 19, section 2.3, CC BY-NC-SA 4.0); its symbols are written here
// with superscript and subscript numbers. Answers: Li-7 3, 3, 4; Te-125 52, 52, 73; Ag-109 47, 47,
// 62; N-15 7, 7, 8; P-31 15, 15, 16.
//
// The pictures: nuclei of lithium-7 and nitrogen-15 built from their protons and
// neutrons (src/content/chem10/videos/lib/c10-equations.ts), then those two and phosphorus-31 gathering
// their electrons into shells (src/video/atoms.ts), as many electrons as protons.

const QUESTION =
  'Give the number of protons, electrons, and neutrons in neutral atoms of each of the following isotopes: (a) ⁷₃Li (b) ¹²⁵₅₂Te (c) ¹⁰⁹₄₇Ag (d) ¹⁵₇N (e) ³¹₁₅P';

const atoms: AtomsEl = {
  kind: 'atoms',
  id: 'at',
  span: [15, 7],
  atoms: [
    { id: 'li', symbol: 'Li', protons: 3, electrons: 0, at: [2.5, 3.5], tone: 'opp', name: 'lithium-7' },
    { id: 'n', symbol: 'N', protons: 7, electrons: 0, at: [7.5, 3.5], tone: 'adj', name: 'nitrogen-15' },
    { id: 'p', symbol: 'P', protons: 15, electrons: 0, at: [12.5, 3.5], tone: 'good', name: 'phosphorus-31' },
  ],
  clips: { fill: { phases: [{ dur: 0.5 }, { dur: 1.5, fill: { li: 3 } }, { dur: 2, fill: { n: 7 } }, { dur: 3, fill: { p: 15 } }, { dur: 1 }] } },
  poster: 'fill',
  height: 440,
};

const video: Explainer = {
  id: 'xq-c10-2-1',
  lessonId: '',
  exam: {
    lesson: 'c10-2-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 19, section 2.3, Atomic Structure and Symbolism',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Protons, Electrons and Neutrons from Isotope Symbols',
  thumbnailTitle: 'Count the Particles',
  thumbnail: 'nu',
  summary:
    'A real test question, solved one small step at a time: how many protons, electrons and neutrons are in neutral atoms of lithium-7, tellurium-125, silver-109, nitrogen-15 and phosphorus-31? We read the atomic number and mass number from each symbol, watch three nuclei build and their electrons fill the shells, and subtract to find the neutrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Count the Particles', subtitle: 'Protons, electrons and neutrons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to count the particles inside five atoms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Give the number of protons, electrons, and neutrons in neutral atoms of each of the following isotopes:<br>(a) $\\ce{^{7}_{3}Li}$ &nbsp; (b) $\\ce{^{125}_{52}Te}$ &nbsp; (c) $\\ce{^{109}_{47}Ag}$ &nbsp; (d) $\\ce{^{15}_{7}N}$ &nbsp; (e) $\\ce{^{31}_{15}P}$',
          answer: '(a) 3, 3, 4 (b) 52, 52, 73 (c) 47, 47, 62 (d) 7, 7, 8 (e) 15, 15, 16',
          working: 'Protons = atomic number (bottom). Electrons = protons (neutral). Neutrons = mass number (top) − atomic number.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Give the number of protons, electrons, and neutrons in neutral atoms of each of the following isotopes. Lithium-7, with atomic number 3. Tellurium-125, atomic number 52. Silver-109, atomic number 47. Nitrogen-15, atomic number 7. And phosphorus-31, atomic number 15.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['{}^{\\opp{7}}_{\\adj{3}}\\mathrm{Li}'] },
        { kind: 'bullets', id: 'b', items: ['Top: the **mass number**', 'Bottom: the **atomic number**', 'Find **three** counts for each of **five** atoms'] },
      ],
      lines: [
        { say: 'Each isotope is written as a symbol with two numbers in front of it. Here is lithium.', show: 'm.0' },
        { say: 'The number on top is the mass number.', show: 'b.0' },
        { say: 'The number at the bottom is the atomic number.', show: 'b.1' },
        { say: 'For each of the five atoms, we need three counts: protons, electrons and neutrons. That is fifteen numbers, but one simple method gives them all.', show: 'b.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Number', 'What it counts'],
          rows: [
            ['**Atomic number**, Z', 'Protons in the nucleus'],
            ['**Mass number**, A', 'Protons **plus** neutrons'],
            ['In a **neutral** atom', 'Electrons = protons'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The atomic number counts the protons in the nucleus. It is what makes an element that element: every lithium atom has three protons.', show: ['tab', 'tab.0'] },
        { say: 'The mass number counts the protons and the neutrons together, since those are the two particles in the nucleus.', show: 'tab.1' },
        { say: 'And a neutral atom has no overall charge, so its negative electrons exactly balance its positive protons. There are as many electrons as protons.', show: 'tab.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Protons** = atomic number, the bottom number', '**Electrons** = protons, since the atom is neutral', '**Neutrons** = mass number − atomic number'] }],
      lines: [
        { say: 'Here is the plan. First, the protons: read the bottom number.', show: 'plan.0' },
        { say: 'Second, the electrons: the same number, because each atom is neutral.', show: 'plan.1' },
        { say: 'Third, the neutrons: take the bottom number away from the top number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The protons',
      layout: 'center',
      main: [nuclei('nu', [{ label: 'lithium-7', p: 3, n: 4 }, { label: 'nitrogen-15', p: 7, n: 8 }], 400)],
      lines: [
        { say: 'Step one. Here are the nuclei of two of our atoms, built from their particles. The red ones are protons and the yellow ones are neutrons.', show: 'nu' },
        { say: 'Lithium has 3 protons and nitrogen has 7: exactly their atomic numbers. In the same way, phosphorus has 15 protons, tellurium 52 and silver 47.', play: 'nu.build', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: The electrons',
      layout: 'center',
      main: [atoms],
      lines: [
        { say: 'Step two. Now the same three atoms gather their electrons. Each neutral atom takes exactly as many electrons as it has protons.', show: ['at', 'at.labels'] },
        { say: 'Lithium takes 3, nitrogen 7, and phosphorus 15, filling the shells from the inside out. So tellurium has 52 electrons and silver has 47.', show: 'at.arrangement', play: 'at.fill', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 3: The neutrons',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{(a) Li: } 7 - 3 = \\good{4}', '\\text{(b) Te: } 125 - 52 = \\good{73}', '\\text{(c) Ag: } 109 - 47 = \\good{62}', '\\text{(d) N: } 15 - 7 = \\good{8}', '\\text{(e) P: } 31 - 15 = \\good{16}'],
        },
      ],
      lines: [
        { say: 'Step three. The mass number counts protons and neutrons together, so we take away the protons. Lithium: 7 take away 3 is 4 neutrons.', show: 'm.0' },
        { say: 'Tellurium: 125 take away 52 is 73.', show: 'm.1' },
        { say: 'Silver: 109 take away 47 is 62.', show: 'm.2' },
        { say: 'Nitrogen: 15 take away 7 is 8. Phosphorus: 31 take away 15 is 16.', show: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Isotope', 'Protons', 'Electrons', 'Neutrons', 'p + n'],
          rows: [
            ['(a) lithium-7', '3', '3', '4', '7 ✓'],
            ['(b) tellurium-125', '52', '52', '73', '125 ✓'],
            ['(c) silver-109', '47', '47', '62', '109 ✓'],
            ['(d) nitrogen-15', '7', '7', '8', '15 ✓'],
            ['(e) phosphorus-31', '15', '15', '16', '31 ✓'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all fifteen numbers. To check, add the protons and neutrons of each atom: you should get its mass number back.', show: 'ans' },
        { say: '3 and 4 make 7. 52 and 73 make 125. 47 and 62 make 109. 7 and 8 make 15, and 15 and 16 make 31. Every one checks.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'Example', 'Fix'],
          rows: [
            ['Neutrons = mass number', 'Li: 7 neutrons', 'Take away the protons: 4'],
            ['Mixing up the two numbers', 'Li: 7 protons', 'Protons are the **smaller**, bottom number'],
            ['Electrons = neutrons', 'Li: 4 electrons', 'Electrons match the **protons**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Taking the mass number as the number of neutrons. The mass number counts protons too, so we must take them away.' },
        { say: 'Mixing up the two numbers. The atomic number is always the smaller one, because the mass number includes it.' },
        { say: 'And matching the electrons to the neutrons. Electrons balance the charge of the protons, so they match the protons.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A neutral atom of chlorine-37 has atomic number 17. How many neutrons does it have?',
          choices: ['$17$', '$37$', '$54$', '$20$'],
          answer: 3,
          working: 'Neutrons = mass number − atomic number = $37 - 17 = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. A neutral atom of chlorine-37 has atomic number 17. How many neutrons does it have? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Neutrons are the mass number take away the atomic number: 37 take away 17 is 20. That is choice D. 17 is the number of protons, and 37 is the mass number.', show: 'q2.answer' },
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
          items: ['**Protons** = atomic number, the bottom number', '**Electrons** = protons in a neutral atom', '**Neutrons** = mass number − atomic number', 'Check: protons + neutrons = mass number'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The protons are the atomic number, the bottom number.', show: 'sum.0' },
        { say: 'In a neutral atom, the electrons equal the protons.', show: 'sum.1' },
        { say: 'The neutrons are the mass number take away the atomic number.', show: 'sum.2' },
        { say: 'And check: protons and neutrons add up to the mass number. For more on what is inside the atom, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
