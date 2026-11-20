import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 10 lesson 5.3 (series circuits): what is the voltage drop across two
// 80 Ω resistors connected in series with 0.15 A flowing through them? The question is OpenStax
// Physics' own, word for word (Problems, section 19.2, CC BY 4.0). In series the resistances add,
// 80 + 80 = 160 Ω, so V = IR = 0.15 × 160 = 24 V (choice b). 12 V is the drop across one resistor
// only, and 36 V and 48 V would need three and four of them.
//
// The picture (src/video/circuit.ts) puts the two 80 Ω resistors in a loop on 24 V: the ammeters
// read the same 0.15 A all the way round, and the voltmeters read 12 V across each resistor.

const pair: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 24,
  layout: 'series',
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 80 },
    { id: 'r2', kind: 'resistor', ohms: 80 },
  ],
  open: true,
  height: 440,
  poster: 'on',
  clips: {
    on: { phases: [{ dur: 0.6 }, { dur: 4, set: { closed: true } }] },
  },
};

const QUESTION = 'What is the voltage drop across two 80-Ω resistors connected in series with 0.15 A flowing through them?';
const CHOICES = ['12 V', '24 V', '36 V', '48 V'];

const video: Explainer = {
  id: 'xq-p10-5-3',
  lessonId: '',
  exam: {
    lesson: 'p10-5-3',
    source: 'OpenStax, Physics, Problem for section 19.2, Series Circuits',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/19-2-series-circuits',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Two Resistors in Series. What Is the Voltage Drop?',
  thumbnailTitle: 'Two Resistors in Series',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: 0.15 A flows through two 80 Ω resistors in series, and we find the voltage drop across the pair. We add the resistances in series and use Ohm\'s law, V = IR. Then we check the answer by adding the drop across each resistor and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Resistors in Series', subtitle: 'Series circuits, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two resistors in series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: CHOICES,
          answer: 1,
          working: 'In series, $R = 80 + 80 = 160\\ \\Omega$, so $V = IR = 0.15 \\times 160 = 24$ V.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the voltage drop across two eighty ohm resistors connected in series, with 0.15 amps flowing through them?' },
        { say: 'The choices are twelve volts, 24 volts, 36 volts, and 48 volts. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pair, { kind: 'text', id: 'plain', size: 'lg', md: 'What voltage drives $0.15$ A through **both** resistors?' }],
      lines: [
        { say: 'Let us picture it. Two eighty ohm resistors sit one after the other in a single loop. That is what in series means: the charges must pass through one and then the other.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.5 },
        { say: 'A current of 0.15 amps flows through them. The question asks: what is the voltage drop across the two together?', show: 'plain' },
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
          title: 'Resistors in series',
          md: 'In **series**, the same current flows through every resistor, and the resistances **add up**: $R = R_1 + R_2$. Then **Ohm’s law** gives the voltage drop: $V = IR$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$2\\ \\Omega$ and $4\\ \\Omega$ in series with $3$ A: $V = 3 \\times (2 + 4) = 18$ V.' },
      ],
      lines: [
        { say: 'Here is what we need. In a series circuit, the same current flows through every resistor, because there is only one path.', show: 'def' },
        { say: 'The charges have to get through both resistors, so the resistances add up. Then Ohm\'s law gives the voltage drop: the current times the resistance.' },
        { say: 'For example, two ohms and four ohms in series make six ohms. With three amps flowing, the voltage drop is three times six: eighteen volts.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Add the resistances: $R = R_1 + R_2$', 'Use Ohm’s law: $V = IR$', 'Check: add the drop across **each** resistor'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, add the two resistances.', show: 'plan.0' },
        { say: 'Second, multiply by the current, using Ohm\'s law.', show: 'plan.1' },
        { say: 'Third, check by adding up the drop across each resistor.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add the resistances',
      layout: 'center',
      main: [pair, { kind: 'math', id: 'm', size: 'md', lines: ['R = 80\\ \\Omega + 80\\ \\Omega = \\adj{160\\ \\Omega}'] }],
      lines: [
        { say: 'Step one. The charges must get through both resistors, one after the other, so together they resist like one resistor of eighty plus eighty.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.3 },
        { say: '160 ohms.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Ohm’s law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = IR = 0.15\\ \\text{A} \\times 160\\ \\Omega', '= \\good{24\\ \\text{V}}'] }],
      lines: [
        { say: 'Step two. The voltage drop is the current times the resistance: 0.15 amps times 160 ohms.', show: 'm.0' },
        { say: 'Twenty-four volts. That is choice B.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [pair, { kind: 'math', id: 'm', size: 'md', lines: ['V_1 = V_2 = 0.15 \\times 80 = 12\\ \\text{V} \\qquad 12 + 12 = 24\\ \\text{V}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the circuit. Here are the two resistors on a 24 volt battery. The ammeters read the same 0.15 amps all the way round the loop.', show: ['c', 'c.charges', 'c.current'], play: 'c.on', playDelay: 0.3 },
        { say: 'Now the voltmeters. Each resistor takes 0.15 times eighty: twelve volts. And twelve plus twelve is 24 volts, all of the battery\'s voltage.', show: ['c.voltage', 'm.0'] },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$12$ V', '$0.15 \\times 80$: the drop across **one** resistor only'],
            ['$36$ V', '$0.15 \\times 240$: as if there were **three** resistors'],
            ['$48$ V', '$0.15 \\times 320$: as if there were **four** resistors'],
            ['$24$ V', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Twelve volts is the most tempting. It is the drop across one resistor, but the question asks about both.' },
        { say: '36 and 48 volts would be right for three and four eighty ohm resistors. There are only two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Resistors of 20 Ω and 40 Ω are connected in series to a 12 V battery. What current flows?',
          choices: ['0.6 A', '0.3 A', '720 A', '0.2 A'],
          answer: 3,
          working: '$R = 20 + 40 = 60\\ \\Omega$, so $I = \\dfrac{V}{R} = \\dfrac{12}{60} = 0.2$ A.',
        },
      ],
      lines: [
        { say: 'Your turn. Resistors of twenty ohms and forty ohms are connected in series to a twelve volt battery. What current flows? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In series the resistances add: sixty ohms. The current is twelve divided by sixty: 0.2 amps. That is choice D. 0.6 used only the twenty ohm resistor, and 0.3 only the forty.', show: 'q2.answer' },
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
          items: ['Series: **one** path, the **same** current everywhere', 'Resistances **add**: $R = R_1 + R_2$', 'Then $V = IR$', 'Check: the drops across the resistors **add up** to the total'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In series there is only one path, so the same current flows everywhere.', show: 'sum.0' },
        { say: 'The resistances add up.', show: 'sum.1' },
        { say: 'Then Ohm\'s law gives the voltage drop.', show: 'sum.2' },
        { say: 'And the drops across the separate resistors add up to the total. For more on series circuits, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
