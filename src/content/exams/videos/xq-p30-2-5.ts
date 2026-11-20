import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.5 (charges moving in a uniform field): the final speed of a
// free electron accelerated from rest through 100 V. The question is OpenStax College Physics 2e's
// own, word for word (the worked example "Electrical Potential Energy Converted to Kinetic Energy",
// section 19.1, CC BY-NC-SA 4.0; Gradileo is non-commercial). The electron loses qV of potential
// energy and gains ½mv², so v = √(2qV ÷ m) = √(2 × 1.60 × 10⁻¹⁹ × 100 ÷ 9.11 × 10⁻³¹) =
// 5.93 × 10⁶ m/s.
//
// The picture (src/video/charges.ts) is an electron gun with 100 V between its plates: the electron
// is moved step by step by the force on it and leaves through the hole at the speed energy gives.

const ELECTRON = 9.11e-31;

const gun: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-0.03, 0.09, -0.019, 0.019],
  height: 360,
  unit: 'e',
  rate: 3.2e-9,
  speedFigures: 3,
  energyAt: 'left',
  plates: { at: [0.02, 0], span: [-0.008, 0.008], volts: 100, hole: 'first', lines: 5 },
  bodies: [{ id: 'e', charge: -1, x: 0, mass: ELECTRON }],
  poster: 'go',
  thumb: ['lines', 'charge', 'velocity', 'trail'],
  clips: { go: { reset: true, phases: [{ dur: 3.4, fly: true }] } },
};

const QUESTION =
  'Calculate the final speed of a free electron accelerated from rest through a potential difference of 100 V. (Assume that this numerical value is accurate to three significant figures.)';

const video: Explainer = {
  id: 'xq-p30-2-5',
  lessonId: '',
  exam: {
    lesson: 'p30-2-5',
    source: 'OpenStax, College Physics 2e, Worked Example "Electrical Potential Energy Converted to Kinetic Energy", section 19.1',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/19-1-electric-potential-energy-potential-difference',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Is an Electron After 100 V? Energy in an Electric Field',
  thumbnailTitle: 'An Electron Through 100 V',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an electron starts from rest and is accelerated through a potential difference of 100 V, and we find its final speed. The electric potential energy it loses, qV, becomes kinetic energy, ½mv², so we set them equal and solve for v. Then we watch the electron leave an electron gun and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'An Electron Through 100 V', subtitle: 'Charges in a field, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about an electron pulled through a voltage, the way an electron gun works. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          answer: '$5.93 \\times 10^{6}$ m/s',
          working: '$qV = \\tfrac{1}{2}mv^2$, so $v = \\sqrt{\\dfrac{2qV}{m}} = \\sqrt{\\dfrac{2(1.60 \\times 10^{-19})(100)}{9.11 \\times 10^{-31}}} = 5.93 \\times 10^{6}$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Calculate the final speed of a free electron accelerated from rest through a potential difference of one hundred volts. Assume that this value is accurate to three significant figures. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [gun, { kind: 'text', id: 'plain', size: 'md', md: 'How fast is the electron when it leaves?' }],
      lines: [
        { say: 'Let us picture it. An electron sits at rest by the negative plate. The positive plate, with a hole in it, is one hundred volts higher.', show: ['sim', 'sim.lines', 'sim.charge'] },
        { say: 'Let it go. The field pulls it across, faster and faster, and it shoots out through the hole. The question asks for its speed at the end.', show: ['sim.velocity', 'sim.trail', 'plain'], play: 'sim.go', playDelay: 0.4 },
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
          title: 'Energy in an electric field',
          md: 'A charge $q$ that moves through a potential difference $V$ loses electric potential energy $qV$. With no other forces, all of it becomes **kinetic energy**: $qV = \\tfrac{1}{2}mv^2$. For an electron, $q = 1.60 \\times 10^{-19}$ C (its size) and $m = 9.11 \\times 10^{-31}$ kg.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A charge of $2.0$ C through $6.0$ V gains $2.0 \\times 6.0 = 12$ J.' },
      ],
      lines: [
        { say: 'Here is what we need. When a charge moves through a potential difference, it loses electric potential energy equal to the charge times the voltage.', show: 'def' },
        { say: 'If nothing else acts on it, all of that energy turns into kinetic energy: one half m v squared. For an electron, we use the size of its charge, 1.60 times ten to the minus nineteen coulombs, and its mass, 9.11 times ten to the minus 31 kilograms.' },
        { say: 'For example, a charge of two coulombs moving through six volts gains twelve joules.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the energy gained: $qV$', 'Set it equal to $\\tfrac{1}{2}mv^2$', 'Solve for $v$: remember the **square root**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the energy the electron gains.', show: 'plan.0' },
        { say: 'Second, set it equal to the kinetic energy.', show: 'plan.1' },
        { say: 'Third, solve for the speed, and do not forget the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['qV = (1.60 \\times 10^{-19}\\ \\text{C})(100\\ \\text{V})', '= \\adj{1.60 \\times 10^{-17}\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. The energy is the charge times the voltage: 1.60 times ten to the minus nineteen coulombs, times one hundred volts.', show: 'm.0' },
        { say: 'That is 1.60 times ten to the minus seventeen joules. A tiny amount of energy, but the electron is very light.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Kinetic energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{2}mv^2 = qV', 'v^2 = \\dfrac{2qV}{m} = \\dfrac{2(1.60 \\times 10^{-17})}{9.11 \\times 10^{-31}} = 3.51 \\times 10^{13}'] }],
      lines: [
        { say: 'Step two. All of that energy becomes kinetic energy, so one half m v squared equals q V.', show: 'm.0' },
        { say: 'Multiply both sides by two and divide by the mass. v squared is two times 1.60 times ten to the minus seventeen, over 9.11 times ten to the minus 31: 3.51 times ten to the thirteen.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The square root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = \\sqrt{3.51 \\times 10^{13}} = \\sqrt{35.1 \\times 10^{12}}', '= \\good{5.93 \\times 10^{6}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Take the square root. It helps to write it as 35.1 times ten to the twelve, so the power of ten has an even exponent.', show: 'm.0' },
        { say: 'The square root of 35.1 is 5.93, and the square root of ten to the twelve is ten to the six. The electron leaves at 5.93 times ten to the six metres per second: about two percent of the speed of light.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [gun, { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{2}(9.11 \\times 10^{-31})(5.93 \\times 10^{6})^2 = 1.60 \\times 10^{-17}\\ \\text{J} = 100\\ \\text{eV}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the gun. The electron is moved step by step by the force of the field. Watch its speed and its energy bars.', show: ['sim', 'sim.lines', 'sim.charge', 'sim.velocity', 'sim.trail', 'sim.energy'], play: 'sim.go', playDelay: 0.3, wait: 3 },
        { say: 'It leaves at 5.93 times ten to the six metres per second, with all of its potential energy turned into kinetic energy. And one half m v squared at that speed gives back 1.60 times ten to the minus seventeen joules: one hundred electron volts.', show: 'm.0' },
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
            ['Forgot the **square root**', '$3.51 \\times 10^{13}$: that is $v^2$, not $v$'],
            ['Forgot the **2** in $\\dfrac{2qV}{m}$', '$4.19 \\times 10^{6}$ m/s'],
            ['Used the **proton** mass', '$1.38 \\times 10^{5}$ m/s'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'The most common is to stop at v squared. 3.51 times ten to the thirteen metres per second would be a hundred thousand times faster than light. Always take the square root.' },
        { say: 'Dropping the two from one half m v squared gives 4.19 times ten to the six, which is too slow. And using the mass of a proton, nearly two thousand times heavier, gives a speed far too small for an electron.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An electron is accelerated from rest through a potential difference of 400 V. What is its final speed?',
          choices: ['1.19 × 10⁷ m/s', '2.37 × 10⁷ m/s', '5.93 × 10⁶ m/s', '1.40 × 10¹⁴ m/s'],
          answer: 0,
          working: '$v = \\sqrt{\\dfrac{2(1.60 \\times 10^{-19})(400)}{9.11 \\times 10^{-31}}} = \\sqrt{1.40 \\times 10^{14}} = 1.19 \\times 10^{7}$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. An electron is accelerated from rest through a potential difference of four hundred volts. What is its final speed? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'v squared is two times 1.60 times ten to the minus nineteen, times four hundred, over the mass: 1.40 times ten to the fourteen. The square root is 1.19 times ten to the seven metres per second. That is choice A. Four times the voltage only doubles the speed, because speed goes with the square root. 2.37 forgot that, and 1.40 forgot the root.', show: 'q2.answer' },
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
          items: ['Energy gained through a voltage: $qV$', 'All of it becomes kinetic energy: $qV = \\tfrac{1}{2}mv^2$', '$v = \\sqrt{\\dfrac{2qV}{m}}$: take the **square root**', 'Four times the voltage, **twice** the speed'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A charge moving through a voltage gains the charge times the voltage in energy.', show: 'sum.0' },
        { say: 'Starting from rest, all of it becomes kinetic energy.', show: 'sum.1' },
        { say: 'So the speed is the square root of two q V over m.', show: 'sum.2' },
        { say: 'And because of that square root, four times the voltage gives twice the speed. For more on charges moving in electric fields, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
