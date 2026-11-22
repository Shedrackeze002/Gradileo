import type { Explainer } from '@/video/script.ts';
import { oneIon } from '@/content/chem10/videos/lib/c10-atoms.ts';

// Exam question for Chemistry 20 lesson 1.1 (atoms, ions and the periodic table): count the
// protons, neutrons and electrons of two ions in our diet and name them. The question is OpenStax
// Chemistry 2e's own, word for word (end-of-chapter exercise 17, section 2.3, CC BY-NC-SA 4.0).
// The book's answers: (a) iron, 26 protons, 24 electrons, 32 neutrons; (b) iodine, 53 protons,
// 54 electrons, 74 neutrons.
//
// The pictures (src/video/atoms.ts): iron and iodine have too many shells to draw well, so a
// magnesium atom losing two electrons (a 2+ ion, like part (a)) and a chlorine atom gaining one
// (a 1- ion, iodine's family, like part (b)) show the rule the counts follow.

const QUESTION =
  'The following are properties of isotopes of two elements that are essential in our diet. Determine the number of protons, neutrons and electrons in each and name them. (a) atomic number 26, mass number 58, charge of 2+ (b) atomic number 53, mass number 127, charge of 1−';

const video: Explainer = {
  id: 'xq-c20-1-1',
  lessonId: '',
  exam: {
    lesson: 'c20-1-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 17, section 2.3, Atomic Structure and Symbolism',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Protons, Neutrons and Electrons in Two Ions. Atoms and Ions',
  thumbnailTitle: 'Count the Particles',
  thumbnail: 'mg',
  summary:
    'A real test question, solved one small step at a time: two ions that are essential in our diet, given by their atomic number, mass number and charge. We count the protons, neutrons and electrons of each and name the element, and watch atoms lose and gain electrons to see why the charge changes only the electron count.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Count the Particles', subtitle: 'Protons, neutrons and electrons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two ions that our bodies need. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The following are properties of isotopes of two elements that are essential in our diet. Determine the number of protons, neutrons and electrons in each and name them.<br>(a) atomic number 26, mass number 58, charge of 2+<br>(b) atomic number 53, mass number 127, charge of 1−',
          answer: '(a) iron: 26 p, 32 n, 24 e (b) iodine: 53 p, 74 n, 54 e',
          working: 'protons = atomic number; neutrons = mass number − protons; electrons = protons − charge.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The following are properties of isotopes of two elements that are essential in our diet. Determine the number of protons, neutrons and electrons in each and name them. Part a: atomic number 26, mass number 58, charge of two plus. Part b: atomic number 53, mass number 127, charge of one minus.', caption: 'The following are properties of isotopes of two elements that are essential in our diet. Determine the number of protons, neutrons and electrons in each and name them. Part (a): atomic number 26, mass number 58, charge of 2+. Part (b): atomic number 53, mass number 127, charge of 1−.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Three numbers in, **four answers** out: protons, neutrons, electrons and the **name**' }],
      lines: [
        { say: 'Each part gives us three numbers: the atomic number, the mass number and the charge.', show: 'plain' },
        { say: 'From those, we must find four things: the protons, the neutrons, the electrons, and the name of the element.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 760,
      left: [oneIon('mg', { symbol: 'Mg', protons: 12, name: 'magnesium' }, 2, 440)],
      right: [{ kind: 'bullets', id: 'b', items: ['**Protons** = atomic number', '**Neutrons** = mass number − protons', '**Electrons** = protons − charge'] }],
      lines: [
        { say: 'Here is what we need. The atomic number is the number of protons, and it names the element. This magnesium atom has 12.', show: ['mg', 'mg.labels', 'mg.arrangement', 'b.0'] },
        { say: 'The mass number counts protons and neutrons together, so the neutrons are the mass number minus the protons.', show: 'b.1' },
        { say: 'An ion is an atom that has lost or gained electrons. Watch magnesium lose its two outer electrons. The nucleus does not change, but now there are two more protons than electrons, a charge of two plus.', play: 'mg.ion', playDelay: 0.3, show: 'mg.charges' },
        { say: 'So the electrons are the protons minus the charge.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Protons from the **atomic number**, and the **name**', 'Neutrons: **mass number − protons**', 'Electrons: **protons − charge**'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, the protons come from the atomic number, and the periodic table gives the name.', show: 'plan.0' },
        { say: 'Second, the neutrons are the mass number minus the protons.', show: 'plan.1' },
        { say: 'Third, the electrons are the protons minus the charge.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'lg',
          lines: [
            '\\text{protons} = \\adj{26} \\;\\to\\; \\text{iron, Fe}',
            '\\text{neutrons} = 58 - 26 = \\hyp{32}',
            '\\text{electrons} = 26 - 2 = \\opp{24}',
          ],
        },
      ],
      lines: [
        { say: 'Step one, part a. Atomic number 26 means 26 protons. Element number 26 on the periodic table is iron, F e.', show: 'a.0', caption: 'Step one, part (a). Atomic number 26 means 26 protons. Element number 26 on the periodic table is iron, Fe.' },
        { say: 'The neutrons are 58 minus 26, which is 32.', show: 'a.1' },
        { say: 'The charge is two plus, so iron has lost two electrons, just as magnesium did. 26 minus 2 is 24 electrons.', show: 'a.2' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'split',
      leftWidth: 760,
      left: [oneIon('cl', { symbol: 'Cl', protons: 17, name: 'chlorine' }, -1, 440)],
      right: [
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          align: 'left',
          lines: ['p = \\adj{53} \\to \\text{iodine}', 'n = 127 - 53 = \\hyp{74}', 'e = 53 + 1 = \\opp{54}'],
        },
      ],
      lines: [
        { say: 'Step two, part b. Atomic number 53 is iodine, I, with 53 protons. The neutrons are 127 minus 53, which is 74.', show: ['b.0', 'b.1'] },
        { say: 'A one minus charge means the atom has gained an electron. Iodine is in the same family as chlorine, so here is chlorine doing the same thing: watch it gain one electron to fill its outer shell.', show: ['cl', 'cl.labels', 'cl.arrangement', 'cl.charges'], play: 'cl.ion', playDelay: 0.3 },
        { say: 'So iodine has one more electron than protons: 53 plus 1, which is 54 electrons.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Element', 'Protons', 'Neutrons', 'Electrons'],
          rows: [
            ['(a)', '**iron**', '26', '32', '24'],
            ['(b)', '**iodine**', '53', '74', '54'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer: iron, with 26 protons, 32 neutrons and 24 electrons, and iodine, with 53 protons, 74 neutrons and 54 electrons. That matches the book.', show: 'ans' },
        { say: 'A quick check: protons plus neutrons give back the mass numbers, 58 and 127, and protons minus electrons give back the charges, two plus and one minus.' },
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
            ['(a) 28 electrons', 'Added the charge: a **positive** ion has **fewer** electrons'],
            ['(b) 52 electrons', 'Took one away: a **negative** ion has **more** electrons'],
            ['(a) 24 protons', 'Thought the charge changes the **nucleus**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Adding the charge for iron, to get 28 electrons. A positive charge means electrons were lost, so there are fewer.', focus: 'traps.0' },
        { say: 'Taking one away for iodine, to get 52. A negative charge means an electron was gained, so there are more.', focus: 'traps.1' },
        { say: 'And changing the protons. Only electrons move when an ion forms. If the protons changed, it would be a different element.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many electrons does the sulfide ion $\\ce{^{32}S^{2-}}$ (atomic number 16) have?',
          choices: ['18', '16', '14', '32'],
          answer: 0,
          working: 'A 2− charge means two electrons gained: 16 + 2 = 18.',
        },
      ],
      lines: [
        { say: 'Your turn. How many electrons does the sulfide ion, sulfur-32 with a two minus charge, have? Sulfur\'s atomic number is 16. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Sulfur has 16 protons, and a two minus charge means it gained two electrons. 16 plus 2 is 18, choice A.', show: 'q2.answer' },
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
          items: ['Protons = **atomic number**, which names the element', 'Neutrons = **mass number − protons**', 'Electrons = **protons − charge**: fewer for +, more for −'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The atomic number is the number of protons, and it names the element.', show: 'sum.0' },
        { say: 'The neutrons are the mass number minus the protons.', show: 'sum.1' },
        { say: 'And the electrons are the protons minus the charge: fewer for a positive ion, more for a negative one. For more on atoms and ions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
