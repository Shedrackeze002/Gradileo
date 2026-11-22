import type { Explainer } from '@/video/script.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 10 lesson 5.1 (the mole and molar mass): compare one mole each of
// hydrogen, oxygen and fluorine. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 8, section 3.1, CC BY-NC-SA 4.0). The book prints answers only for odd
// exercises, so the answers here are worked out in the video: (a) all three hold the same number
// of molecules, 6.022 x 10^23, because a mole is a fixed count; (b) fluorine, 38.00 g, against
// 32.00 g of oxygen and 2.016 g of hydrogen, because a fluorine atom is the heaviest of the three.
//
// The pictures (src/video/molecules.ts): pairs of hydrogen, oxygen and fluorine atoms joining
// into molecules, with each atom's molar mass before and each molecule's after, so the masses add.

const QUESTION =
  'Compare 1 mole of H2, 1 mole of O2, and 1 mole of F2. (a) Which has the largest number of molecules? Explain why. (b) Which has the greatest mass? Explain why.';

const atoms = () =>
  reaction('mm', {
    from: [
      { t: 'H', n: 2, label: 'H: 1.008' },
      { t: 'O', n: 2, label: 'O: 16.00' },
      { t: 'F', n: 2, label: 'F: 19.00' },
    ],
    to: [
      { t: 'H2', label: 'H₂: 2.016' },
      { t: 'O2', label: 'O₂: 32.00' },
      { t: 'F2', label: 'F₂: 38.00' },
    ],
    foot: { before: 'molar mass of each atom, g/mol', after: 'molar mass of each molecule, g/mol' },
    height: 380,
  });

const video: Explainer = {
  id: 'xq-c10-5-1',
  lessonId: '',
  exam: {
    lesson: 'c10-5-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 8, section 3.1, Formula Mass and the Mole Concept',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/3-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: One Mole of Hydrogen, Oxygen and Fluorine. The Mole and Molar Mass',
  thumbnailTitle: 'Same Count, Different Mass',
  thumbnail: 'mm',
  summary:
    'A real test question, solved one small step at a time: we compare one mole each of hydrogen, oxygen and fluorine gas. We see why all three hold exactly the same number of molecules, and watch the atoms join into molecules so that their molar masses add up, which shows why the fluorine is the heaviest.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Same Count, Different Mass', subtitle: 'The mole, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that compares one mole each of three gases. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Compare 1 mole of $\\ce{H2}$, 1 mole of $\\ce{O2}$, and 1 mole of $\\ce{F2}$.<br>(a) Which has the largest number of molecules? Explain why.<br>(b) Which has the greatest mass? Explain why.',
          answer: '(a) All the same: $6.022 \\times 10^{23}$ molecules each (b) $\\ce{F2}$, $38.00\\ \\text{g}$',
          working: 'A mole is a fixed number of particles; the mass of a mole depends on the mass of each particle.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Compare 1 mole of H two, 1 mole of O two, and 1 mole of F two. Part a: which has the largest number of molecules? Explain why. Part b: which has the greatest mass? Explain why.', caption: 'Compare 1 mole of H₂, 1 mole of O₂, and 1 mole of F₂. Part (a): which has the largest number of molecules? Explain why. Part (b): which has the greatest mass? Explain why.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Part (a) is about **how many**. Part (b) is about **how heavy**.' }],
      lines: [
        { say: 'The question asks about the same amount, one mole, of three different gases: hydrogen, oxygen and fluorine. Each is made of molecules of two atoms.', show: 'plain' },
        { say: 'Part a asks how many molecules there are, and part b asks how much they weigh. Those are two different questions, and the mole answers them in two different ways.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mole', tone: 'definition', title: 'The mole', md: 'One mole of anything is $6.022 \\times 10^{23}$ particles, **Avogadro\'s number**, like a dozen is always 12.' },
        { kind: 'callout', id: 'molar', tone: 'definition', title: 'Molar mass', md: 'The mass of **one mole**, in grams per mole: the molar masses of the atoms in the formula, **added up**.' },
      ],
      lines: [
        { say: 'Here is what we need. A mole is a number. One mole of anything is six point zero two two times ten to the twenty-third particles, which is called Avogadro\'s number. It works like a dozen, which is always twelve, whether it is twelve eggs or twelve bricks.', caption: 'Here is what we need. A mole is a number. One mole of anything is 6.022 × 10²³ particles, which is called Avogadro\'s number. It works like a dozen, which is always twelve, whether it is twelve eggs or twelve bricks.', show: 'mole' },
        { say: 'The molar mass is the mass of one mole, in grams per mole. For a molecule, we add up the molar masses of its atoms.', show: 'molar' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['For (a): count the **molecules** in one mole', 'For (b): find each **molar mass** from its atoms', 'Compare, and say **why**'] }],
      lines: [
        { say: 'Here is the plan. For part a, count the molecules in one mole of each gas.', show: 'plan.0' },
        { say: 'For part b, find the molar mass of each gas by adding up its atoms.', show: 'plan.1' },
        { say: 'Then compare them, and give the reason, because both parts ask us to explain.', show: 'plan.2' },
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
            '1\\ \\text{mol}\\ \\ce{H2} = \\adj{6.022 \\times 10^{23}}\\ \\text{molecules}',
            '1\\ \\text{mol}\\ \\ce{O2} = \\adj{6.022 \\times 10^{23}}\\ \\text{molecules}',
            '1\\ \\text{mol}\\ \\ce{F2} = \\adj{6.022 \\times 10^{23}}\\ \\text{molecules}',
          ],
        },
        { kind: 'callout', id: 'ka', tone: 'key', title: 'Part (a)', md: 'They all have the **same** number of molecules, because a mole is a **fixed count**.' },
      ],
      lines: [
        { say: 'Step one, part a. One mole of hydrogen is six point zero two two times ten to the twenty-third molecules.', caption: 'Step one, part a. One mole of hydrogen is 6.022 × 10²³ molecules.', show: 'a.0' },
        { say: 'One mole of oxygen is the same number, and so is one mole of fluorine.', show: ['a.1', 'a.2'] },
        { say: 'So none of them has more. They all have the same number of molecules, because a mole is a fixed count, just as a dozen is always twelve.', show: 'ka' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [atoms()],
      lines: [
        { say: 'Step two, part b. Here are two atoms each of hydrogen, oxygen and fluorine, with the molar mass of each atom: 1.008, 16.00 and 19.00 grams per mole.', show: 'mm' },
        { say: 'Watch them join up into molecules. Every atom is still there, so the masses simply add.', play: 'mm.go', playDelay: 0.3 },
        { say: 'H two is two times 1.008, or 2.016 grams per mole. O two is 32.00, and F two is 38.00 grams per mole.', caption: 'H₂ is 2 × 1.008, or 2.016 g/mol. O₂ is 32.00, and F₂ is 38.00 g/mol.' },
      ],
    },
    {
      chapter: 'Why fluorine is heaviest',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'b',
          head: ['1 mole of', 'Mass'],
          rows: [
            ['$\\ce{H2}$', '$2.016\\ \\text{g}$'],
            ['$\\ce{O2}$', '$32.00\\ \\text{g}$'],
            ['$\\ce{F2}$', '**$38.00\\ \\text{g}$**'],
          ],
        },
        { kind: 'callout', id: 'kb', tone: 'key', title: 'Part (b)', md: '**Fluorine** has the greatest mass: the same number of molecules, but each fluorine atom is the **heaviest**.' },
      ],
      lines: [
        { say: 'So one mole of each gas has these masses: 2.016 grams of hydrogen, 32.00 grams of oxygen and 38.00 grams of fluorine.', show: 'b' },
        { say: 'Fluorine has the greatest mass. There are the same number of molecules in each, but a fluorine atom is heavier than an oxygen or a hydrogen atom, so the same number of fluorine molecules weighs more.', show: 'kb' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Answer', 'Why'],
          rows: [
            ['(a)', '**All the same**', 'A mole is always $6.022 \\times 10^{23}$ particles'],
            ['(b)', '**Fluorine**, $38.00\\ \\text{g}$', 'Each fluorine molecule is the heaviest'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check: one fluorine molecule has a mass of 38.00 atomic mass units, and one mole of them, 38.00 grams. The molar mass in grams always matches the mass of one particle in atomic mass units.' },
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
            ['(a) $\\ce{F2}$, because it is heaviest', 'Mixed up **number** with **mass**'],
            ['(a) $\\ce{H2}$, because its molecules are small', 'Thought small particles pack more into a mole'],
            ['(b) $\\ce{F2}$ at $19.00\\ \\text{g}$', 'Forgot there are **two** atoms in each molecule'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Answering fluorine for part a, because it is the heaviest. The number of molecules in a mole never depends on how heavy they are.', focus: 'traps.0' },
        { say: 'Answering hydrogen for part a, because its molecules are small. A mole is a count, so the size of the particles makes no difference.', focus: 'traps.1' },
        { say: 'And using 19.00 grams for fluorine gas. Fluorine gas is F two, with two atoms in each molecule, so its molar mass is twice 19.00.', focus: 'traps.2', caption: 'And using 19.00 g for fluorine gas. Fluorine gas is F₂, with two atoms in each molecule, so its molar mass is twice 19.00.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which contains the most **atoms**?',
          choices: ['1 mol of helium, $\\ce{He}$', '1 mol of $\\ce{H2}$', '1 mol of $\\ce{O2}$', '1 mol of $\\ce{H2O}$'],
          answer: 3,
          working: 'Each holds the same number of particles, and each water molecule has 3 atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. Which contains the most atoms: one mole of helium, of hydrogen, of oxygen, or of water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Each sample holds the same number of particles, one mole. But each water molecule has three atoms, more than any of the others, so the answer is water, choice D.', show: 'q2.answer' },
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
          items: ['One mole is always $6.022 \\times 10^{23}$ particles', 'Molar mass: **add up** the atoms in the formula', 'Same number of moles, same number of particles, **different masses**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. One mole of anything is always six point zero two two times ten to the twenty-third particles.', caption: 'Here is what to remember. One mole of anything is always 6.022 × 10²³ particles.', show: 'sum.0' },
        { say: 'The molar mass is found by adding up the molar masses of the atoms in the formula.', show: 'sum.1' },
        { say: 'So equal numbers of moles hold equal numbers of particles, but their masses differ with the mass of each particle. For more on the mole, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
