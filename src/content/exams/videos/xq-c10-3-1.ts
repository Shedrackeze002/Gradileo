import type { Explainer } from '@/video/script.ts';
import { oneIon } from '@/content/chem10/videos/lib/c10-atoms.ts';

// Exam question for Chemistry 10 lesson 3.1 (ions): write the symbols of four ions from their
// particles and charges. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter
// exercise 11, section 2.3, CC BY-NC-SA 4.0). The book's answers: (a) ¹³³Cs⁺, (b) ¹²⁷I⁻,
// (c) ³¹P³⁻, (d) ⁵⁷Co³⁺.
//
// The pictures (src/video/atoms.ts): a sodium atom losing its outer electron to become a positive
// ion, and a phosphorus atom gaining three electrons to become P³⁻, the ion of part (c).

const QUESTION =
  'Write the symbol for each of the following ions: (a) the ion with a 1+ charge, atomic number 55, and mass number 133 (b) the ion with 54 electrons, 53 protons, and 74 neutrons (c) the ion with atomic number 15, mass number 31, and a 3− charge (d) the ion with 24 electrons, 30 neutrons, and a 3+ charge';

const video: Explainer = {
  id: 'xq-c10-3-1',
  lessonId: '',
  exam: {
    lesson: 'c10-3-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 11, section 2.3, Atomic Structure and Symbolism',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Writing the Symbols of Ions from Protons, Neutrons and Electrons',
  thumbnailTitle: 'Name That Ion',
  thumbnail: 'p3',
  summary:
    'A real test question, solved one small step at a time: we write the symbols of four ions from their charges, protons, neutrons and electrons. We watch atoms lose and gain electrons to become ions, then use three rules: protons name the element, protons plus neutrons give the mass number, and the charge is protons minus electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Name That Ion', subtitle: 'Ion symbols, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to write the symbols of four ions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Write the symbol for each of the following ions:<br>(a) the ion with a 1+ charge, atomic number 55, and mass number 133<br>(b) the ion with 54 electrons, 53 protons, and 74 neutrons<br>(c) the ion with atomic number 15, mass number 31, and a 3− charge<br>(d) the ion with 24 electrons, 30 neutrons, and a 3+ charge',
          answer: '(a) $\\ce{^{133}Cs+}$ (b) $\\ce{^{127}I-}$ (c) $\\ce{^{31}P^{3-}}$ (d) $\\ce{^{57}Co^{3+}}$',
          working: 'Protons name the element; mass number = protons + neutrons; charge = protons − electrons.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Write the symbol for each of the following ions. Part a: the ion with a one plus charge, atomic number 55, and mass number 133. Part b: the ion with 54 electrons, 53 protons, and 74 neutrons.' },
        { say: 'Part c: the ion with atomic number 15, mass number 31, and a three minus charge. Part d: the ion with 24 electrons, 30 neutrons, and a three plus charge.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['{}^{\\adj{\\text{mass number}}}\\,\\text{Symbol}^{\\opp{\\text{charge}}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Each part gives **some** of the numbers. We work out the **rest**.' },
      ],
      lines: [
        { say: 'An ion symbol has three pieces: the element\'s symbol, its mass number at the top left, and its charge at the top right.', show: 'm.0' },
        { say: 'Each part gives us a different mix of clues, so for each one, we work out the missing pieces.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 760,
      left: [oneIon('na', { symbol: 'Na', protons: 11, name: 'sodium' }, 1, 440)],
      right: [{ kind: 'bullets', id: 'b', items: ['**Protons** name the element', 'Mass number = **protons + neutrons**', 'Charge = **protons − electrons**'] }],
      lines: [
        { say: 'Here is what we need. An ion is an atom that has lost or gained electrons. Watch this sodium atom lose its outer electron.', show: ['na', 'na.labels', 'na.arrangement'], play: 'na.ion', playDelay: 0.3 },
        { say: 'It still has 11 protons, so it is still sodium. The number of protons always names the element.', show: ['b.0', 'na.charges'] },
        { say: 'Losing an electron does not change the nucleus, so the mass number is still protons plus neutrons.', show: 'b.1' },
        { say: 'Now there are 11 protons and only 10 electrons, one more positive than negative. So the charge is protons minus electrons: plus one.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **protons**, then the element', 'Find the **mass number**', 'Find the **charge**, and write the symbol'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, find the number of protons, and from it the element.', show: 'plan.0' },
        { say: 'Second, find the mass number.', show: 'plan.1' },
        { say: 'Third, find the charge, and put the pieces together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Parts (a) and (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } Z = 55 \\to \\text{Cs};\\ A = 133;\\ 1{+} \\to \\good{\\ce{^{133}Cs+}}', '\\text{(b) } 53\\ \\text{protons} \\to \\text{I};\\ A = 53 + 74 = 127', '\\text{charge} = 53 - 54 = {-1} \\to \\good{\\ce{^{127}I-}}'] }],
      lines: [
        { say: 'Step one. Part a: atomic number 55 means 55 protons, which is caesium, C s. We are given the mass number, 133, and the charge, one plus. So the symbol is caesium-133 with a plus.', show: 'm.0', caption: 'Step one. Part (a): atomic number 55 means 55 protons, which is caesium, Cs. We are given the mass number, 133, and the charge, 1+. So the symbol is ¹³³Cs⁺.' },
        { say: 'Part b: 53 protons is iodine. The mass number is 53 plus 74, which is 127.', show: 'm.1' },
        { say: 'The charge is 53 protons minus 54 electrons: minus one. So the symbol is iodine-127 with a minus.', show: 'm.2', caption: 'The charge is 53 protons minus 54 electrons: −1. So the symbol is ¹²⁷I⁻.' },
      ],
    },
    {
      chapter: 'Step 2: Part (c)',
      layout: 'split',
      leftWidth: 760,
      left: [oneIon('p3', { symbol: 'P', protons: 15, name: 'phosphorus' }, -3, 440)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['Z = 15 \\to \\text{P}', 'A = 31', '3{-} \\to \\good{\\ce{^{31}P^{3-}}}'] }],
      lines: [
        { say: 'Step two. Part c: atomic number 15 is phosphorus. Here is a phosphorus atom, two, eight, five.', show: ['p3', 'p3.labels', 'p3.arrangement', 'm.0'] },
        { say: 'A three minus charge means it has gained three electrons. Watch them arrive and fill its outer shell, to two, eight, eight.', show: 'p3.charges', play: 'p3.ion', playDelay: 0.3 },
        { say: 'Gaining electrons does not touch the nucleus, so the mass number stays 31. The symbol is phosphorus-31 with a three minus charge.', show: ['m.1', 'm.2'], caption: 'Gaining electrons does not touch the nucleus, so the mass number stays 31. The symbol is ³¹P³⁻.' },
      ],
    },
    {
      chapter: 'Step 3: Part (d)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{charge } {+3}:\\ \\text{protons} = 24 + 3 = 27 \\to \\text{Co}', 'A = 27 + 30 = 57', '\\good{\\ce{^{57}Co^{3+}}}'] }],
      lines: [
        { say: 'Step three. Part d is the trickiest, because it does not tell us the protons. But a three plus charge means three more protons than electrons. So the protons are 24 plus 3, which is 27: cobalt, C o.', show: 'm.0', caption: 'Step three. Part (d) is the trickiest, because it does not tell us the protons. But a 3+ charge means three more protons than electrons. So the protons are 24 + 3 = 27: cobalt, Co.' },
        { say: 'The mass number is 27 plus 30 neutrons, which is 57.', show: 'm.1' },
        { say: 'So the symbol is cobalt-57 with a three plus charge.', show: 'm.2', caption: 'So the symbol is ⁵⁷Co³⁺.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Ion', 'Protons', 'Neutrons', 'Electrons', 'p − e'],
          rows: [
            ['(a) $\\ce{^{133}Cs+}$', '55', '78', '54', '+1 ✓'],
            ['(b) $\\ce{^{127}I-}$', '53', '74', '54', '−1 ✓'],
            ['(c) $\\ce{^{31}P^{3-}}$', '15', '16', '18', '−3 ✓'],
            ['(d) $\\ce{^{57}Co^{3+}}$', '27', '30', '24', '+3 ✓'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four ions, with every particle counted. For each one, protons minus electrons should give back the charge, and it does.', show: 'ans' },
        { say: 'Notice the pattern as well: the metals, caesium and cobalt, lost electrons and became positive. The non-metals, iodine and phosphorus, gained electrons and became negative. That matches the book\'s answers.' },
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
            ['Naming the element from the **electrons**', '(d): 24 is chromium', 'Use the **protons**: 27, cobalt'],
            ['Charge the wrong way round', '(b): I⁺', 'Extra electrons make it **negative**'],
            ['Changing the mass number', '(c): ³⁴P³⁻', 'Electrons barely add mass'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Naming the element from its electrons. In part d, 24 is chromium, but the ion has lost electrons. The protons, 27, are what name it.' },
        { say: 'Getting the charge the wrong way round. More electrons than protons means a negative charge.' },
        { say: 'And adding the gained electrons to the mass number. Electrons are so light that the mass number only counts protons and neutrons.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many electrons does the ion $\\ce{^{24}Mg^{2+}}$ have? (Magnesium has atomic number 12.)',
          choices: ['$14$', '$10$', '$12$', '$22$'],
          answer: 1,
          working: 'A 2+ charge means two fewer electrons than protons: $12 - 2 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many electrons does a magnesium-24 ion with a two plus charge have? Magnesium has atomic number 12. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two plus means two fewer electrons than protons: 12 take away 2 is 10, choice B. 14 adds them the wrong way.', show: 'q2.answer' },
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
          items: ['**Protons** name the element, never the electrons', 'Mass number = protons + neutrons, the same for the ion', 'Charge = protons − electrons', 'Lost electrons: positive. Gained: negative'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The protons name the element, never the electrons.', show: 'sum.0' },
        { say: 'The mass number is protons plus neutrons, and it does not change when an atom becomes an ion.', show: 'sum.1' },
        { say: 'The charge is protons minus electrons.', show: 'sum.2' },
        { say: 'So lost electrons give a positive ion, and gained electrons a negative one. For more on ions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
