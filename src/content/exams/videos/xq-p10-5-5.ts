import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 10 lesson 5.5 (electrical power): a typical older incandescent lightbulb
// was 60 W; with 120 V across it, what is the current through it? The question is OpenStax
// Physics' own, word for word (the worked example "Find the Resistance of a Lightbulb", section
// 19.4, CC BY 4.0), with the four choices of its OpenStax exercise. P = IV, so I = P ÷ V =
// 60 ÷ 120 = 0.50 A (choice a). 2 A is V ÷ P, 7200 A is P × V, and 10⁴ A would melt the wiring.
//
// The picture (src/video/circuit.ts) is the bulb on 120 V: its resistance, 240 Ω, is the one the
// worked example goes on to find, so the ammeter reads 0.50 A and the lamp takes 60 W.

const bulb: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 120,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 240, label: '60 W bulb' }],
  open: true,
  bright: 60,
  height: 430,
  poster: 'on',
  clips: {
    on: { phases: [{ dur: 0.6 }, { dur: 4, set: { closed: true } }] },
  },
};

const QUESTION = 'A typical older incandescent lightbulb was 60 W. Assuming that 120 V is applied across the lightbulb, what is the current through the lightbulb?';
const CHOICES = [
  'The current through the light bulb is 0.50 A.',
  'The current through the light bulb is 2 A.',
  'The current through the light bulb is 7200 A.',
  'The current through the light bulb is 10⁴ A.',
];

const video: Explainer = {
  id: 'xq-p10-5-5',
  lessonId: '',
  exam: {
    lesson: 'p10-5-5',
    source: 'OpenStax, Physics, Worked Example "Find the Resistance of a Lightbulb", section 19.4, Electric Power',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/19-4-electric-power',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Current Through a 60 W Bulb. P = IV',
  thumbnailTitle: 'The Current in a 60 W Bulb',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: a 60 W lightbulb has 120 V across it, and we find the current through it. We rearrange the power equation, P = IV, to I = P ÷ V, and divide. Then we check the answer with the bulb\'s resistance and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Current in a 60 W Bulb', subtitle: 'Electrical power, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about an ordinary lightbulb. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$0.50$ A', '$2$ A', '$7200$ A', '$10^{4}$ A'],
          answer: 0,
          working: '$P = IV$, so $I = \\dfrac{P}{V} = \\dfrac{60}{120} = 0.50$ A.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A typical older incandescent lightbulb was sixty watts. Assuming that 120 volts is applied across the lightbulb, what is the current through the lightbulb?' },
        { say: 'The choices are 0.50 amps, two amps, 7,200 amps, and ten to the four amps. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bulb, { kind: 'text', id: 'plain', size: 'lg', md: 'How much **current** does a $60$ W bulb need at $120$ V?' }],
      lines: [
        { say: 'Let us picture it. A sixty watt bulb is connected to a 120 volt supply, like the mains in some countries. Close the switch, and the bulb lights.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.5 },
        { say: 'Sixty watts is the bulb\'s power: how fast it turns electrical energy into light and heat. The question asks: what current flows through it?', show: 'plain' },
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
          title: 'Electrical power',
          md: '**Power** is the energy transferred **each second**, in **watts** ($1$ W $= 1$ J/s). In a circuit, power is the **current** times the **voltage**: $P = IV$. Divide both sides by $V$ to find the current: $I = \\dfrac{P}{V}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A $12$ V car lamp of $24$ W: $I = \\dfrac{24}{12} = 2$ A.' },
      ],
      lines: [
        { say: 'Here is what we need. Power is the energy transferred each second, in watts. One watt is one joule every second.', show: 'def' },
        { say: 'In a circuit, the power is the current times the voltage. Each coulomb carries the voltage\'s worth of joules, and the current says how many coulombs pass each second. So to find the current, divide the power by the voltage.' },
        { say: 'For example, a 24 watt lamp in a twelve volt car takes 24 divided by twelve: two amps.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down $P$ and $V$', 'Rearrange $P = IV$ to $I = \\dfrac{P}{V}$', 'Divide, then check with the **resistance**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the power and the voltage.', show: 'plan.0' },
        { say: 'Second, rearrange the power equation for the current.', show: 'plan.1' },
        { say: 'Third, divide, and check the answer using the bulb\'s resistance.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Power and voltage',
      layout: 'center',
      main: [bulb, { kind: 'math', id: 'm', size: 'md', lines: ['P = \\adj{60\\ \\text{W}} \\qquad V = \\opp{120\\ \\text{V}}'] }],
      lines: [
        { say: 'Step one. The power of the bulb is sixty watts, and the voltage across it is 120 volts.', show: ['c', 'c.charges', 'c.voltage', 'c.power', 'm.0'], play: 'c.on', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Rearrange and divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = IV \\quad \\Rightarrow \\quad I = \\dfrac{P}{V}', 'I = \\dfrac{60\\ \\text{W}}{120\\ \\text{V}}', '= \\good{0.50\\ \\text{A}}'] }],
      lines: [
        { say: 'Step two. Start from power equals current times voltage, and divide both sides by the voltage. The current is the power divided by the voltage.', show: 'm.0' },
        { say: 'Sixty watts divided by 120 volts.', show: 'm.1' },
        { say: 'Half an amp: 0.50 amps. That is choice A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bulb, { kind: 'math', id: 'm', size: 'md', lines: ['R = \\dfrac{V}{I} = \\dfrac{120}{0.50} = 240\\ \\Omega \\qquad P = \\dfrac{V^2}{R} = \\dfrac{120^2}{240} = 60\\ \\text{W}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it, the way the textbook goes on to do. By Ohm\'s law, the bulb\'s resistance is 120 volts divided by 0.50 amps: 240 ohms.', show: 'm.0' },
        { say: 'Now put a 240 ohm bulb on 120 volts and watch the meters. The ammeter reads half an amp, and the bulb takes sixty watts. Everything agrees.', show: ['c', 'c.charges', 'c.current', 'c.power'], play: 'c.on', playDelay: 0.3 },
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
            ['$2$ A', '$120 \\div 60$: divided the **wrong way**'],
            ['$7200$ A', '$60 \\times 120$: **multiplied**'],
            ['$10^{4}$ A', 'Far too big: it would **melt** the wiring'],
            ['$0.50$ A', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Two amps divides the voltage by the power, the wrong way round. 7,200 multiplies them.' },
        { say: 'And ten thousand amps is absurd for a lightbulb. That is more than a whole street of houses draws, and ordinary wires would glow and melt long before it.' },
        { say: 'A quick sense check helps: a small bulb on the mains takes a fraction of an amp.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 2000 W kettle runs on a 230 V supply. What current does it draw?',
          choices: ['0.12 A', '460 000 A', '8.7 A', '2230 A'],
          answer: 2,
          working: '$I = \\dfrac{P}{V} = \\dfrac{2000}{230} \\approx 8.7$ A.',
        },
      ],
      lines: [
        { say: 'Your turn. A two thousand watt kettle runs on a 230 volt supply. What current does it draw? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The current is the power divided by the voltage: two thousand divided by 230 is about 8.7 amps. That is choice C. 0.12 divided the wrong way, and 460,000 multiplied.', show: 'q2.answer' },
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
          items: ['Power: energy **each second**, in **watts**', 'In a circuit: $P = IV$', 'For the current: $I = \\dfrac{P}{V}$', 'Check: $R = \\dfrac{V}{I}$, then $P = \\dfrac{V^2}{R}$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Power is the energy transferred each second, measured in watts.', show: 'sum.0' },
        { say: 'In a circuit, the power is the current times the voltage.', show: 'sum.1' },
        { say: 'So the current is the power divided by the voltage.', show: 'sum.2' },
        { say: 'And you can check with the resistance from Ohm\'s law. For more on electrical power, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
