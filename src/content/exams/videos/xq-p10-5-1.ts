import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 10 lesson 5.1 (charge and current): 10 nC of charge flows through a
// circuit in 3.0 × 10⁻⁶ s; what is the current? The question is OpenStax Physics' own, word for
// word (Practice Problems, section 19.1, CC BY 4.0). I = Q ÷ t = 10 × 10⁻⁹ ÷ 3.0 × 10⁻⁶ =
// 3.3 × 10⁻³ A (choice a). 30 A and 33 A lose the prefixes, and 0.3 A turns the division over.
//
// The picture (src/video/circuit.ts) cannot show nanocoulombs, so it shows the same division with
// bigger numbers: 10 V across 3 Ω drives 3.33 A, and the ammeter's count of the charge that has
// passed reaches 10 C as the clock reaches 3 s. The question has the same 10 and 3, with the
// prefixes nano and micro.

const loop: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 10,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 3, label: 'Lamp' }],
  open: true,
  height: 430,
  poster: 'run',
  clips: {
    run: { phases: [{ dur: 0.6 }, { dur: 4, set: { closed: true } }] },
    count: { phases: [{ dur: 0.6 }, { dur: 3, set: { closed: true } }] },
  },
};

const QUESTION = '10 nC of charge flows through a circuit in 3.0 × 10⁻⁶ s. What is the current during this time?';
const CHOICES = [
  'The current passes through the circuit is 3.3 × 10⁻³ A.',
  'The current passes through the circuit is 30 A.',
  'The current passes through the circuit is 33 A.',
  'The current passes through the circuit is 0.3 A.',
];

const video: Explainer = {
  id: 'xq-p10-5-1',
  lessonId: '',
  exam: {
    lesson: 'p10-5-1',
    source: 'OpenStax, Physics, Practice Problem for section 19.1, Ohm’s Law',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/19-1-ohms-law',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: 10 nC in 3 Microseconds. What Is the Current?',
  thumbnailTitle: 'Charge and Current',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: 10 nC of charge flows through a circuit in 3.0 × 10⁻⁶ s, and we find the current. We turn the prefix nano into a power of ten, divide the charge by the time, I = Q ÷ t, and handle the powers of ten one careful step at a time. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Charge and Current', subtitle: 'Current from charge and time, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about electric current. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '$10$ nC of charge flows through a circuit in $3.0 \\times 10^{-6}$ s. What is the current during this time?',
          choices: ['$3.3 \\times 10^{-3}$ A', '$30$ A', '$33$ A', '$0.3$ A'],
          answer: 0,
          working: '$I = \\dfrac{Q}{t} = \\dfrac{10 \\times 10^{-9}}{3.0 \\times 10^{-6}} = 3.3 \\times 10^{-3}$ A.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Ten nanocoulombs of charge flows through a circuit in 3.0 times ten to the minus six seconds. What is the current during this time?' },
        { say: 'The choices are 3.3 times ten to the minus three amps, thirty amps, 33 amps, and 0.3 amps. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [loop, { kind: 'text', id: 'plain', size: 'lg', md: 'How much charge passes **each second**?' }],
      lines: [
        { say: 'Let us picture it. Here is a simple circuit. When the switch closes, charges flow round the wire, through the lamp and back to the battery.', show: ['c', 'c.charges'], play: 'c.run', playDelay: 0.5 },
        { say: 'The current tells us how much charge flows past a point each second. The question gives a charge and a time, and asks for the current.', show: 'plain' },
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
          title: 'Current',
          md: '**Current** is the charge that flows past a point **each second**: $I = \\dfrac{Q}{t}$. Charge $Q$ is in **coulombs (C)**, time $t$ in **seconds**, and current $I$ in **amperes (A)**. One amp is one coulomb each second.',
        },
        { kind: 'text', id: 'pre', size: 'md', md: 'Prefixes: **nano** (n) $= 10^{-9}$, **micro** ($\\mu$) $= 10^{-6}$, **milli** (m) $= 10^{-3}$' },
      ],
      lines: [
        { say: 'Here is what we need. Current is the charge that flows past a point each second: the charge divided by the time.', show: 'def' },
        { say: 'Charge is in coulombs, time in seconds, and current in amps. One amp is one coulomb every second.' },
        { say: 'And three prefixes. Nano means ten to the minus nine, micro means ten to the minus six, and milli means ten to the minus three.', show: 'pre' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write the charge in **coulombs**', 'Divide: $I = \\dfrac{Q}{t}$', 'Divide the front numbers, **subtract** the powers'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write the charge in coulombs, using the prefix.', show: 'plan.0' },
        { say: 'Second, divide the charge by the time.', show: 'plan.1' },
        { say: 'Third, divide the front numbers and subtract the powers of ten.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The charge in coulombs',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['Q = 10\\ \\text{nC} = \\adj{10 \\times 10^{-9}\\ \\text{C}}', 't = \\opp{3.0 \\times 10^{-6}\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. Nano means ten to the minus nine, so ten nanocoulombs is ten times ten to the minus nine coulombs.', show: 'm.0' },
        { say: 'The time is already in seconds: 3.0 times ten to the minus six seconds. That is three microseconds.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The same idea, bigger',
      layout: 'center',
      main: [loop, { kind: 'math', id: 'm', size: 'md', lines: ['I = \\dfrac{Q}{t} = \\dfrac{10\\ \\text{C}}{3\\ \\text{s}} = 3.33\\ \\text{A}'] }],
      lines: [
        { say: 'Step two. Before the tiny numbers, here is the same division with numbers we can watch. The ammeter counts the charge that passes it, and the clock counts the time.', show: ['c', 'c.charges', 'c.charge', 'c.clock'], play: 'c.count', playDelay: 0.3 },
        { say: 'Ten coulombs pass in three seconds. So each second, ten over three coulombs pass: 3.33 amps. And the ammeter agrees.', show: ['c.current', 'm.0'] },
        { say: 'Our question has the same ten and the same three, only with the prefixes nano and micro on them.' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['I = \\dfrac{\\adj{10} \\times \\opp{10^{-9}}}{\\adj{3.0} \\times \\opp{10^{-6}}}', '= \\adj{3.3} \\times \\opp{10^{-9-(-6)}} = 3.3 \\times 10^{-3}', '= \\good{3.3 \\times 10^{-3}\\ \\text{A}}'] }],
      lines: [
        { say: 'Step three. Divide the front numbers: ten divided by three is 3.3.', show: 'm.0' },
        { say: 'Subtract the powers of ten: minus nine, minus minus six. That is minus nine plus six: minus three.', show: 'm.1' },
        { say: '3.3 times ten to the minus three amps, which is 3.3 milliamps. That is choice A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['Q = It = 3.3 \\times 10^{-3} \\times 3.0 \\times 10^{-6} \\approx 10 \\times 10^{-9}\\ \\text{C} = 10\\ \\text{nC}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. The charge is the current times the time.', show: 'm.0' },
        { say: '3.3 times three is about ten, and ten to the minus three times ten to the minus six is ten to the minus nine. Ten nanocoulombs, the charge we started with.' },
        { say: 'And the size makes sense. A few nanocoulombs is a tiny charge, but it passes in a tiny time, so the current is a few thousandths of an amp: about what a small LED uses.' },
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
            ['$33$ A', 'Dropped the **prefixes**, and slipped a decimal place'],
            ['$30$ A', '$10 \\times 3$: **multiplied**, and dropped the prefixes'],
            ['$0.3$ A', '$3 \\div 10$: divided **time by charge**'],
            ['$3.3 \\times 10^{-3}$ A', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Thirty and 33 amps are thousands of times too big. They drop the prefixes. Nano is ten to the minus nine, but micro is only ten to the minus six, so the division leaves ten to the minus three: a thousand times smaller than ten over three.' },
        { say: '0.3 amps turns the division upside down: time divided by charge. Current is always charge divided by time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A current of 2.0 A flows through a lamp for 30 s. How much charge passes through the lamp?',
          choices: ['15 C', '0.067 C', '60 C', '32 C'],
          answer: 2,
          working: '$Q = It = 2.0 \\times 30 = 60$ C.',
        },
      ],
      lines: [
        { say: 'Your turn. A current of two amps flows through a lamp for thirty seconds. How much charge passes through the lamp? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two coulombs pass every second, for thirty seconds: sixty coulombs. That is choice C. Fifteen divided instead of multiplying.', show: 'q2.answer' },
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
          items: ['Current: $I = \\dfrac{Q}{t}$, in **amps**', '$1$ A $= 1$ coulomb **each second**', 'nano $= 10^{-9}$, micro $= 10^{-6}$, milli $= 10^{-3}$', 'Check: $Q = It$ gives back the charge'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Current is charge divided by time, measured in amps.', show: 'sum.0' },
        { say: 'One amp is one coulomb every second.', show: 'sum.1' },
        { say: 'Turn prefixes into powers of ten before you divide.', show: 'sum.2' },
        { say: 'And check by multiplying the current by the time. For more on charge and current, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
