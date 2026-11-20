import type { Explainer, MotionEl } from '@/video/script.ts';
import { run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 3.2 (kinetic energy): the kinetic energy of a 0.01 kg bullet
// travelling at 700 m/s. The question is OpenStax Physics' own, word for word (Problems, section
// 9.2, CC BY 4.0). KE = ½mv² = ½ × 0.01 × 700² = 2450 J = 2.45 × 10³ J (choice c). The wrong
// choices leave out the square (3.5 J), the square and the half (7 J), or the mass (2.45 × 10⁵ J).
//
// The picture (src/video/motion.ts) flies the bullet 20 m at 700 m/s, two hundred times slower
// than life, and its kinetic energy bar is measured from the motion.

const shot: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 26],
  height: 400,
  lanes: [{ surface: 'smooth', label: 'A 0.01 kg bullet at 700 m/s' }],
  bodies: [{ id: 'bullet', shape: 'ball', mass: 0.01, label: '', x: 0.6, width: 0.5, tone: 'bad' }],
  energy: { max: 2700, bars: ['kinetic'] },
  velocityScale: 0.15,
  poster: 'fly',
  clips: {
    fly: { reset: true, phases: [{ ...run(20 / 700, { bullet: 700 }), slow: 200, note: '200 times slower' }] },
  },
};

const QUESTION = 'What is the kinetic energy of a 0.01 kg bullet traveling at a velocity of 700 m/s?';
const CHOICES = ['3.5 J', '7 J', '2.45 × 10³ J', '2.45 × 10⁵ J'];

const video: Explainer = {
  id: 'xq-p10-3-2',
  lessonId: '',
  exam: {
    lesson: 'p10-3-2',
    source: 'OpenStax, Physics, Problem for section 9.2, Mechanical Energy and Conservation of Energy',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-2-mechanical-energy-and-conservation-of-energy',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Kinetic Energy of a Bullet. KE = ½mv²',
  thumbnailTitle: 'The Energy of a Bullet',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 0.01 kg bullet travels at 700 m/s, and we find its kinetic energy. We square the speed first, then multiply by the mass and by a half, KE = ½mv². Then we check the answer by working backwards to the speed, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Energy of a Bullet', subtitle: 'Kinetic energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the energy of a fast bullet. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$3.5$ J', '$7$ J', '$2.45 \\times 10^{3}$ J', '$2.45 \\times 10^{5}$ J'],
          answer: 2,
          working: '$E_k = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2} \\times 0.01 \\times 700^2 = 2450$ J $= 2.45 \\times 10^3$ J.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the kinetic energy of a 0.01 kilogram bullet, travelling at a velocity of 700 metres per second?' },
        { say: 'The choices are 3.5 joules, seven joules, 2.45 times ten to the three joules, and 2.45 times ten to the five joules. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [shot, { kind: 'text', id: 'plain', size: 'lg', md: 'A **tiny** mass, a **huge** speed: how much energy?' }],
      lines: [
        { say: 'Let us picture it, two hundred times slower than real life. Here is the bullet, flying at 700 metres per second.', show: ['sim', 'sim.velocity'], play: 'sim.fly', playDelay: 0.5 },
        { say: 'It has a tiny mass, only ten grams, but a huge speed. The question asks: how much energy does its motion carry?', show: 'plain' },
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
          title: 'Kinetic energy',
          md: '**Kinetic energy** is the energy an object has because it is **moving**: $E_k = \\tfrac{1}{2}mv^2$. Only the **speed** is squared. With $m$ in kg and $v$ in m/s, $E_k$ is in **joules**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$4$ kg at $3$ m/s: $E_k = \\tfrac{1}{2} \\times 4 \\times 3^2 = \\tfrac{1}{2} \\times 4 \\times 9 = 18$ J.' },
      ],
      lines: [
        { say: 'Here is what we need. Kinetic energy is the energy an object has because it is moving. It is one half, times the mass, times the speed squared.', show: 'def' },
        { say: 'Only the speed is squared, not the mass. With kilograms and metres per second, the energy comes out in joules.' },
        { say: 'For example, four kilograms at three metres per second: three squared is nine, and a half of four times nine is eighteen joules.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down $m$ and $v$', '**Square** the speed first', 'Multiply by $m$, then **halve**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the mass and the speed.', show: 'plan.0' },
        { say: 'Second, square the speed, before anything else.', show: 'plan.1' },
        { say: 'Third, multiply by the mass, and take half.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Mass and speed',
      layout: 'center',
      main: [shot, { kind: 'math', id: 'm', size: 'md', lines: ['m = \\adj{0.01\\ \\text{kg}} \\qquad v = \\opp{700\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step one. The mass is 0.01 kilograms, and the speed is 700 metres per second. Both are already in kilograms and metres per second.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.fly', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Square the speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v^2 = 700^2 = 700 \\times 700', '= \\opp{490\\,000\\ \\text{m}^2/\\text{s}^2}'] }],
      lines: [
        { say: 'Step two. Square the speed: 700 times 700.', show: 'm.0' },
        { say: '490,000. Squaring a big number makes it much bigger, and that is why speed matters so much for kinetic energy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Multiply and halve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E_k = \\tfrac{1}{2} \\times 0.01 \\times 490\\,000', '= \\tfrac{1}{2} \\times 4900 = 2450\\ \\text{J}', '= \\good{2.45 \\times 10^{3}\\ \\text{J}}'] }],
      lines: [
        { say: 'Step three. Multiply by the mass, 0.01, and take half.', show: 'm.0' },
        { say: '0.01 times 490,000 is 4,900, and half of that is 2,450 joules.', show: 'm.1' },
        { say: 'In scientific notation, 2.45 times ten to the three joules. That is choice C.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [shot, { kind: 'math', id: 'm', size: 'md', lines: ['v = \\sqrt{\\dfrac{2E_k}{m}} = \\sqrt{\\dfrac{2 \\times 2450}{0.01}} = \\sqrt{490\\,000} = 700\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. Watch the bar: that is the bullet\'s kinetic energy, measured from its motion.', show: ['sim', 'sim.velocity', 'sim.energy'], play: 'sim.fly', playDelay: 0.3 },
        { say: 'Double 2,450, divide by the mass, and take the square root. We get back 700 metres per second, the speed we started with.', show: 'm.0' },
        { say: 'And the size makes sense. 2,450 joules is about the energy it takes to lift a 250 kilogram weight one metre, packed into a ten gram bullet. That is why bullets are so dangerous.' },
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
            ['$3.5$ J', '$\\tfrac{1}{2} \\times 0.01 \\times 700$: forgot to **square**'],
            ['$7$ J', '$0.01 \\times 700$: no **square**, no **half**'],
            ['$2.45 \\times 10^{5}$ J', '$\\tfrac{1}{2} \\times 700^2$: left out the **mass**'],
            ['$2.45 \\times 10^{3}$ J', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '3.5 joules forgets to square the speed. That is the most common mistake.' },
        { say: 'Seven joules forgets the square and the half: it is just mass times speed, which is not an energy at all.' },
        { say: 'And 2.45 times ten to the five squares the speed and halves it, but leaves out the mass.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the kinetic energy of a 1200 kg car moving at 20 m/s?',
          choices: ['12 000 J', '24 000 J', '240 000 J', '480 000 J'],
          answer: 2,
          working: '$E_k = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2} \\times 1200 \\times 20^2 = \\tfrac{1}{2} \\times 1200 \\times 400 = 240\\,000$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the kinetic energy of a 1,200 kilogram car moving at twenty metres per second? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Twenty squared is 400. Half of 1,200 times 400 is 240,000 joules. That is choice C. 12,000 forgot to square, and 480,000 forgot the half.', show: 'q2.answer' },
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
          items: ['Kinetic energy: $E_k = \\tfrac{1}{2}mv^2$', 'Square the **speed** first, not the mass', 'Then multiply by $m$ and **halve**', 'Check: work back to the speed'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Kinetic energy is one half, times the mass, times the speed squared.', show: 'sum.0' },
        { say: 'Square the speed first, and only the speed.', show: 'sum.1' },
        { say: 'Then multiply by the mass and take half.', show: 'sum.2' },
        { say: 'And check by working back to the speed. For more on kinetic energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
