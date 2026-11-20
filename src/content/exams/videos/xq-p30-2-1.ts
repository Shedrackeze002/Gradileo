import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.1 (electric charge): an ink droplet in an ink-jet printer
// passes through an electron beam and ends with a net charge of −1 × 10⁻¹⁰ C. How many electrons
// did it capture? The question is OpenStax Physics' own, word for word (the worked example
// "Charging Ink Droplets", section 18.1, CC BY 4.0, without its figure reference). Each electron
// carries −1.602 × 10⁻¹⁹ C, so n = q ÷ e = 6.24 × 10⁸ electrons.
//
// The picture (src/video/charges.ts) is the droplet passing under an electron gun: five electrons
// cross to it, each standing for 0.02 nC (about 125 million real electrons), so the droplet's
// charge goes from 0 to −0.10 nC = −1 × 10⁻¹⁰ C.

const gun: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-4, 4, -1.5, 1.45],
  height: 420,
  unit: 'nC',
  mark: 0.02,
  decimals: 2,
  bodies: [
    { id: 'gun', shape: 'rod', charge: -0.1, x: 0, y: 0.85, radius: 0.6, thick: 0.26, turn: -90, pairs: 3, label: 'Electron gun', labelAt: 'right', tone: 'theta' },
    { id: 'drop', shape: 'sphere', stand: false, charge: 0, x: -3, y: -0.7, radius: 0.42, pairs: 3, label: 'Ink drop', labelAt: 'below' },
  ],
  poster: 'pass',
  clips: {
    pass: {
      reset: true,
      phases: [
        { dur: 1.2, to: { drop: [0, -0.7] } },
        { dur: 2.6, electrons: [{ from: 'gun', to: 'drop', n: 5 }] },
        { dur: 1.2, to: { drop: [2.9, -0.7] } },
      ],
    },
  },
};

const QUESTION =
  'Electrically neutral ink droplets in an ink-jet printer pass through an electron beam created by an electron gun. Some electrons are captured by the ink droplet, so that it becomes charged. After passing through the electron beam, the net charge of the ink droplet is q = −1 × 10⁻¹⁰ C. How many electrons are captured by the ink droplet?';

const video: Explainer = {
  id: 'xq-p30-2-1',
  lessonId: '',
  exam: {
    lesson: 'p30-2-1',
    source: 'OpenStax, Physics, Worked Example "Charging Ink Droplets", section 18.1',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/18-1-electrical-charges-conservation-of-charge-and-transfer-of-charge',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Electrons Charge an Ink Droplet? Electric Charge',
  thumbnailTitle: 'Electrons on an Ink Drop',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an ink droplet in a printer picks up electrons and ends with a charge of −1 × 10⁻¹⁰ C, and we count how many electrons it captured. We use the charge of one electron, −1.602 × 10⁻¹⁹ C, and divide. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Electrons on an Ink Drop', subtitle: 'Electric charge, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the tiny drops of ink in an ink-jet printer. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '$6.24 \\times 10^{8}$ electrons',
          working: '$n = \\dfrac{q}{e} = \\dfrac{-1 \\times 10^{-10}\\ \\text{C}}{-1.602 \\times 10^{-19}\\ \\text{C}} = 6.24 \\times 10^{8}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Electrically neutral ink droplets in an ink-jet printer pass through an electron beam created by an electron gun. Some electrons are captured by the ink droplet, so that it becomes charged.' },
        { say: 'After passing through the electron beam, the net charge of the ink droplet is minus one times ten to the minus ten coulombs. How many electrons are captured by the ink droplet? If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [gun, { kind: 'text', id: 'plain', size: 'md', md: 'How many electrons make $-1 \\times 10^{-10}$ C?' }],
      lines: [
        { say: 'Let us picture it. The droplet starts neutral: the same number of positive and negative charges. It passes under the electron gun, and electrons jump on to it.', show: ['sim', 'sim.charge'], play: 'sim.pass', playDelay: 0.5, wait: 2.5 },
        { say: 'Each blue electron here stands for about 125 million real ones, because the real number is far too big to draw. The droplet ends with a negative charge. The question asks how many electrons that takes.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Charge comes in electrons',
          md: 'Charge is **quantized**: it comes in whole numbers of the **elementary charge**, $e = 1.602 \\times 10^{-19}$ C. One electron carries $-e$. So an object that gains $n$ electrons has charge $q = n \\times (-e)$, and $n = \\dfrac{q}{-e}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$-3.204 \\times 10^{-19}$ C is $\\dfrac{-3.204 \\times 10^{-19}}{-1.602 \\times 10^{-19}} = 2$ electrons.' },
      ],
      lines: [
        { say: 'Here is what we need. Charge comes in tiny, equal packets. The smallest packet is the elementary charge, 1.602 times ten to the minus nineteen coulombs.', show: 'def' },
        { say: 'Each electron carries one packet, with a minus sign. So if an object gains some electrons, its charge is their number times the charge of one electron. To find the number, divide the charge by the charge of one electron.' },
        { say: 'For example, minus 3.204 times ten to the minus nineteen coulombs, divided by the charge of one electron, is two electrons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down the droplet’s charge and one electron’s charge', 'Divide: $n = \\dfrac{q}{q_{e}}$', 'Check: $n \\times q_e$ gives back the charge'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the droplet\'s charge and the charge of one electron.', show: 'plan.0' },
        { say: 'Second, divide one by the other.', show: 'plan.1' },
        { say: 'Third, check by multiplying back.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two charges',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['q_{\\text{drop}} = \\adj{-1 \\times 10^{-10}\\ \\text{C}}', 'q_{e} = \\opp{-1.602 \\times 10^{-19}\\ \\text{C}}'] }],
      lines: [
        { say: 'Step one. The droplet\'s charge is minus one times ten to the minus ten coulombs.', show: 'm.0' },
        { say: 'One electron carries minus 1.602 times ten to the minus nineteen coulombs. Both are negative, because the droplet\'s charge is all extra electrons.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{q_{\\text{drop}}}{q_e} = \\dfrac{-1 \\times 10^{-10}}{-1.602 \\times 10^{-19}}', '= \\dfrac{1}{1.602} \\times 10^{-10 - (-19)} = 0.624 \\times 10^{9}', '= \\good{6.24 \\times 10^{8}\\ \\text{electrons}}'] }],
      lines: [
        { say: 'Step two. Divide the droplet\'s charge by the charge of one electron. The two minus signs cancel, so the number is positive, as a count must be.', show: 'm.0' },
        { say: 'One divided by 1.602 is 0.624. For the powers of ten, subtract: minus ten minus minus nineteen is plus nine.', show: 'm.1' },
        { say: 'So the droplet captured 6.24 times ten to the eight electrons. That is 624 million electrons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [gun, { kind: 'math', id: 'm', size: 'md', lines: ['6.24 \\times 10^{8} \\times (-1.602 \\times 10^{-19}) = -1.0 \\times 10^{-10}\\ \\text{C}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it. Watch the charge on the droplet as the electrons arrive.', show: ['sim', 'sim.charge'], play: 'sim.pass', playDelay: 0.3, wait: 2.5 },
        { say: 'It ends at minus 0.10 nanocoulombs, which is minus one times ten to the minus ten coulombs. And 6.24 times ten to the eight electrons, times the charge of one, gives back that charge.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['**Multiplied** the charges', '$1.6 \\times 10^{-29}$: far less than one electron'],
            ['Powers of ten **added**: $-10 + (-19)$', '$6.24 \\times 10^{-30}$: not a whole number'],
            ['Kept one **minus** sign', '$-6.24 \\times 10^{8}$: a count cannot be negative'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in a question like this.', show: 'traps' },
        { say: 'Multiplying the two charges gives a tiny number, far less than one electron. Charge comes in whole electrons, so that cannot be right.' },
        { say: 'When dividing powers of ten, subtract the exponents. Adding them gives another impossibly tiny answer.' },
        { say: 'And a negative number of electrons makes no sense. The two minus signs cancel.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A balloon rubbed on hair gains a charge of −3.2 × 10⁻⁹ C. How many extra electrons does it carry?',
          choices: ['2.0 × 10¹⁰', '5.1 × 10⁻²⁸', '2.0 × 10⁻¹⁰', '−2.0 × 10¹⁰'],
          answer: 0,
          working: '$n = \\dfrac{-3.2 \\times 10^{-9}}{-1.602 \\times 10^{-19}} = 2.0 \\times 10^{10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A balloon rubbed on hair gains a charge of minus 3.2 times ten to the minus nine coulombs. How many extra electrons does it carry? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Divide by the charge of one electron: 3.2 over 1.602 is about two, and minus nine minus minus nineteen is ten. Two times ten to the ten electrons. That is choice A. The tiny answers multiplied or added the powers, and the negative one kept a minus sign.', show: 'q2.answer' },
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
          items: ['Charge comes in whole electrons: $e = 1.602 \\times 10^{-19}$ C', 'Number of electrons: $n = \\dfrac{q}{q_e}$', 'Divide powers of ten by **subtracting**', 'A count is a **positive** whole number'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Charge comes in whole numbers of electrons, each carrying 1.602 times ten to the minus nineteen coulombs.', show: 'sum.0' },
        { say: 'To count the electrons, divide the charge by the charge of one electron.', show: 'sum.1' },
        { say: 'When you divide powers of ten, subtract the exponents.', show: 'sum.2' },
        { say: 'And a count of electrons is always a positive number. For more on electric charge, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
