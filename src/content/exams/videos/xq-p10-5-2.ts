import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 10 lesson 5.2 (voltage, resistance and Ohm's law): what is the resistance
// of a car headlight through which 2.50 A flows when 12.0 V is applied to it? The question is
// OpenStax Physics' own, word for word (the worked example "Resistance of a Headlight", section
// 19.1, CC BY 4.0), with the four choices of its OpenStax exercise. R = V ÷ I = 12.0 ÷ 2.50 =
// 4.8 Ω (choice d). 0.21 Ω is I ÷ V, 30 Ω is V × I, and 6.8 Ω would let only 1.76 A through.
//
// The picture (src/video/circuit.ts) is the headlight on a 12.0 V battery: with a 4.8 Ω lamp the
// ammeter reads the 2.50 A of the question, and a 6.8 Ω lamp beside it reads 1.76 A.

const light: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 4.8, label: 'Headlight' }],
  open: true,
  height: 430,
  poster: 'on',
  clips: {
    on: { phases: [{ dur: 0.6 }, { dur: 4, set: { closed: true } }] },
    trap: { phases: [{ dur: 1.5, set: { closed: true } }, { dur: 3, set: { ohms: { lamp: 6.8 } }, note: 'A 6.8 Ω lamp' }] },
  },
};

const QUESTION = 'What is the resistance of an automobile headlight through which 2.50 A flows when 12.0 V is applied to it?';
const CHOICES = ['6.8 Ω', '0.21 Ω', '30 Ω', '4.8 Ω'];

const video: Explainer = {
  id: 'xq-p10-5-2',
  lessonId: '',
  exam: {
    lesson: 'p10-5-2',
    source: 'OpenStax, Physics, Worked Example "Resistance of a Headlight", section 19.1, Ohm’s Law',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/19-1-ohms-law',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Resistance of a Car Headlight. Ohm’s Law',
  thumbnailTitle: 'A Headlight’s Resistance',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: 2.50 A flows through a car headlight when 12.0 V is applied to it, and we find its resistance. We rearrange Ohm\'s law, V = IR, to R = V ÷ I, and divide. Then we check the answer on a working circuit and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Headlight’s Resistance', subtitle: 'Ohm’s law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a car headlight. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 3,
          working: '$R = \\dfrac{V}{I} = \\dfrac{12.0}{2.50} = 4.8\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the resistance of an automobile headlight through which 2.50 amps flows when 12.0 volts is applied to it?' },
        { say: 'The choices are 6.8 ohms, 0.21 ohms, thirty ohms, and 4.8 ohms. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [light, { kind: 'text', id: 'plain', size: 'lg', md: 'How much does the headlight **resist** the current?' }],
      lines: [
        { say: 'Let us picture it. A car battery gives twelve volts, and the headlight is connected across it. Close the switch, and a current flows through the headlight.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.5 },
        { say: 'The question tells us the voltage and the current, and asks for the resistance: how hard the headlight makes it for the current to flow.', show: 'plain' },
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
          title: 'Ohm’s law',
          md: 'The **voltage** across a component equals the **current** through it times its **resistance**: $V = IR$. Divide both sides by $I$ to find the resistance: $R = \\dfrac{V}{I}$, in **ohms** ($\\Omega$).',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$6$ V drives $2$ A through a lamp: $R = \\dfrac{6}{2} = 3\\ \\Omega$.' },
      ],
      lines: [
        { say: 'Here is what we need. Ohm\'s law says that the voltage across a component is the current through it times its resistance.', show: 'def' },
        { say: 'To find the resistance, divide the voltage by the current. Resistance is measured in ohms.' },
        { say: 'For example, if six volts drives two amps through a lamp, its resistance is six divided by two: three ohms.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down $V$ and $I$', 'Rearrange $V = IR$ to $R = \\dfrac{V}{I}$', 'Divide'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the voltage and the current.', show: 'plan.0' },
        { say: 'Second, rearrange Ohm\'s law for the resistance.', show: 'plan.1' },
        { say: 'Third, divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Voltage and current',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['V = \\adj{12.0\\ \\text{V}} \\qquad I = \\opp{2.50\\ \\text{A}}'] }],
      lines: [
        { say: 'Step one. The voltage across the headlight is 12.0 volts. Here it is on the voltmeter.', show: ['c', 'c.charges', 'c.voltage'], play: 'c.on', playDelay: 0.3 },
        { say: 'And the current through it is 2.50 amps, on the ammeter.', show: ['c.current', 'm.0'] },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = IR', '\\dfrac{V}{I} = \\dfrac{IR}{I}', 'R = \\dfrac{V}{I}'] }],
      lines: [
        { say: 'Step two. Start from Ohm\'s law: the voltage is the current times the resistance.', show: 'm.0' },
        { say: 'We want the resistance on its own, so divide both sides by the current. The current cancels on the right.', show: 'm.1' },
        { say: 'So the resistance is the voltage divided by the current.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['R = \\dfrac{12.0\\ \\text{V}}{2.50\\ \\text{A}}', '= \\good{4.8\\ \\Omega}'] }],
      lines: [
        { say: 'Step three. Twelve volts divided by 2.50 amps.', show: 'm.0' },
        { say: '4.8 ohms. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['I = \\dfrac{V}{R} = \\dfrac{12.0}{4.8} = 2.50\\ \\text{A}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the circuit. Here is a 4.8 ohm headlight on the twelve volt battery.', show: ['c', 'c.charges', 'c.voltage', 'c.current'], play: 'c.on', playDelay: 0.3 },
        { say: 'Twelve divided by 4.8 is 2.50 amps, and that is just what the ammeter reads. The current we were given.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        { ...light, height: 300 },
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$0.21\\ \\Omega$', '$2.50 \\div 12.0$: divided the **wrong way**'],
            ['$30\\ \\Omega$', '$12.0 \\times 2.50$: **multiplied**'],
            ['$6.8\\ \\Omega$', 'Would let only $1.76$ A through, **not** $2.50$ A'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.21 ohms divides the current by the voltage, the wrong way round. Thirty ohms multiplies them. Neither is Ohm\'s law.' },
        { say: 'And 6.8 ohms is just wrong. Watch what happens if we swap in a 6.8 ohm lamp. The current drops to 1.76 amps, not the 2.50 amps the question gives.', show: ['c', 'c.charges', 'c.current'], play: 'c.trap', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 9.0 V battery drives a current of 0.30 A through a resistor. What is the resistance of the resistor?',
          choices: ['30 Ω', '2.7 Ω', '0.033 Ω', '9.3 Ω'],
          answer: 0,
          working: '$R = \\dfrac{V}{I} = \\dfrac{9.0}{0.30} = 30\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Your turn. A 9.0 volt battery drives a current of 0.30 amps through a resistor. What is the resistance of the resistor? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Resistance is voltage divided by current: nine divided by 0.30 is thirty ohms. That is choice A. 2.7 multiplied, and 0.033 divided the wrong way.', show: 'q2.answer' },
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
          items: ['Ohm’s law: $V = IR$', 'For the resistance: $R = \\dfrac{V}{I}$, in **ohms**', 'Volts **over** amps, never amps over volts', 'Check: $I = \\dfrac{V}{R}$ gives back the current'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Ohm\'s law: the voltage is the current times the resistance.', show: 'sum.0' },
        { say: 'So the resistance is the voltage divided by the current, measured in ohms.', show: 'sum.1' },
        { say: 'Always volts over amps, never amps over volts.', show: 'sum.2' },
        { say: 'And check by dividing the voltage by your resistance. For more on Ohm\'s law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
