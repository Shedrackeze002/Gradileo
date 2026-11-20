import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for lesson 3.6 (conservation of mechanical energy): a 0.2 kg apple with 10 J of
// potential energy falls, turning all of it into kinetic energy; how fast is it going just before
// it lands? The question is OpenStax Physics' own, word for word (Practice Problems, section 9.2,
// CC BY 4.0). ½mv² = 10 J, so v² = 2 × 10 ÷ 0.2 = 100 and v = 10 m/s (choice c). 50 m/s is
// 10 ÷ 0.2 (no half, no root), 2 m/s is 10 × 0.2, and 0 m/s confuses "on the ground" with "just
// before".
//
// The picture (src/video/motion.ts) drops the apple from 5.10 m (10 J ÷ (0.2 × 9.8)), which takes
// 1.02 s, with bars of potential, kinetic and total energy.

const G = 9.8;
const M = 0.2;
const H = 10 / (M * G);
const WEIGHT: MotionForce = { on: 'apple', name: 'Weight', n: M * G, tone: 'hyp' };

const drop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, H],
  bodies: [{ id: 'apple', shape: 'ball', mass: M, label: '', x: 0, width: 0.45, tone: 'bad' }],
  energy: { max: 11, bars: ['potential', 'kinetic', 'total'], g: G, names: { total: 'Mechanical energy' } },
  forceScale: 30,
  velocityScale: 9,
  height: 500,
  poster: 'fall',
  clips: {
    hold: { reset: true, phases: [{ dur: 1.2, freeze: true, forces: [WEIGHT] }] },
    fall: { reset: true, phases: [{ dur: Math.sqrt((2 * H) / G) - 0.002, slow: 3, forces: [{ ...WEIGHT, hidden: true }], note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-6',
  lessonId: '',
  exam: {
    lesson: 'p20-3-6',
    source: 'OpenStax, Physics, Practice Problem for section 9.2, Mechanical Energy and Conservation of Energy',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-2-mechanical-energy-and-conservation-of-energy',
    question:
      'A 0.2 kg apple on an apple tree has a potential energy of 10 J. It falls to the ground, converting all of its PE to kinetic energy. What is the velocity of the apple just before it hits the ground?',
    choices: ['0 m/s', '2 m/s', '10 m/s', '50 m/s'],
  },
  title: 'Exam Question: An Apple Falls. How Fast Is It Going When It Lands?',
  thumbnailTitle: 'The Falling Apple',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 0.2 kg apple with 10 J of potential energy falls from a tree, and we find its speed just before it hits the ground. We use conservation of energy to say that all 10 J becomes kinetic energy, then solve ½mv² = 10 J for the speed. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Falling Apple', subtitle: 'Conservation of energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about an apple falling from a tree. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'A 0.2 kg apple on an apple tree has a potential energy of 10 J. It falls to the ground, converting all of its PE to kinetic energy. What is the velocity of the apple just before it hits the ground?',
          choices: ['0 m/s', '2 m/s', '10 m/s', '50 m/s'],
          answer: 2,
          working: '$\\tfrac{1}{2} \\times 0.2 \\times v^2 = 10$, so $v^2 = 100$ and $v = 10$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A 0.2 kilogram apple on an apple tree has a potential energy of ten joules. It falls to the ground, converting all of its potential energy to kinetic energy. What is the velocity of the apple just before it hits the ground?' },
        { say: 'The choices are zero, two, ten, and fifty metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [drop, { kind: 'text', id: 'plain', size: 'lg', md: 'All **10 J** becomes motion. How **fast**?' }],
      lines: [
        { say: 'Let us watch it, in slow motion. The apple hangs on the tree, then drops.', show: ['sim', 'sim.velocity'], play: 'sim.fall', playDelay: 0.5 },
        { say: 'At the top, all its energy is stored, as potential energy. On the way down it speeds up, and the stored energy turns into energy of motion.' },
        { say: 'The question asks: just before it lands, when all ten joules have turned into kinetic energy, how fast is it going?', show: 'plain' },
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
          title: 'Conservation of mechanical energy',
          md: 'With no friction or air resistance, the **mechanical energy** $E_p + E_k$ stays the same. Whatever potential energy is lost becomes kinetic energy, $E_k = \\tfrac{1}{2}mv^2$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'To find a speed: $v = \\sqrt{\\dfrac{2E_k}{m}}$.' },
      ],
      lines: [
        { say: 'Here is what we need. When nothing like friction or air resistance takes energy away, the total of potential and kinetic energy stays the same. We call it the mechanical energy.', show: 'def' },
        { say: 'So the potential energy the apple loses becomes kinetic energy, one half m v squared.' },
        { say: 'Rearranged for the speed: v is the square root of two times the kinetic energy, divided by the mass.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['All the potential energy becomes **kinetic**: $E_k = 10$ J', 'Write $\\tfrac{1}{2}mv^2 = 10$', 'Solve for $v$: **double**, **divide**, **square root**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, all ten joules of potential energy become kinetic energy.', show: 'plan.0' },
        { say: 'Second, write one half m v squared equals ten joules.', show: 'plan.1' },
        { say: 'Third, solve for v.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: All of it',
      layout: 'split',
      leftWidth: 700,
      left: [drop],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{top: } E_p = 10\\ \\text{J}', '\\text{bottom: } E_k = \\adj{10\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. At the top, the apple has ten joules of potential energy and no kinetic energy.', show: ['sim', 'sim.energy', 'm.0'], play: 'sim.hold', playDelay: 0.3 },
        { say: 'Watch the bars as it falls. The blue bar of potential energy shrinks, and the green bar of kinetic energy grows by the same amount. The total stays at ten joules the whole way.', show: ['sim.velocity', 'sim.total'], play: 'sim.fall' },
        { say: 'Just before it lands, all ten joules are kinetic energy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The equation',
      layout: 'split',
      leftWidth: 700,
      left: [drop],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{1}{2}mv^2 = 10', '\\tfrac{1}{2} \\times 0.2 \\times v^2 = 10', '\\opp{0.1\\,v^2 = 10}'] }],
      lines: [
        { say: 'Step two. Set the kinetic energy, one half m v squared, equal to ten joules.', show: ['sim', 'sim.energy', 'sim.velocity', 'm.0'], play: 'sim.fall', playDelay: 0.3 },
        { say: 'The mass is 0.2 kilograms.', show: 'm.1' },
        { say: 'Half of 0.2 is 0.1. So 0.1 times v squared equals ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The speed',
      layout: 'split',
      leftWidth: 700,
      left: [drop],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['v^2 = 10 \\div 0.1 = 100', 'v = \\sqrt{100}', '= \\good{10\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Divide both sides by 0.1: v squared is a hundred.', show: ['sim', 'sim.energy', 'sim.velocity', 'm.0'], play: 'sim.fall', playDelay: 0.3 },
        { say: 'Do not stop there. Take the square root.', show: 'm.1' },
        { say: 'The apple is moving at ten metres per second just before it hits the ground. That is choice C.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{2} \\times 0.2 \\times 10^2 = 0.1 \\times 100 = 10\\ \\text{J}\\ \\checkmark', 'h = \\dfrac{10}{0.2 \\times 9.8} = 5.1\\ \\text{m}: \\text{ a tall apple tree}'] }],
      lines: [
        { say: 'Let us check it by working forwards. One half, times 0.2, times ten squared, is ten joules. That is the energy we started with.', show: 'm.0' },
        { say: 'And the size makes sense. Ten joules on a 0.2 kilogram apple means it hung about 5.1 metres up: a tall apple tree. A fall of five metres gives about ten metres per second.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is wrong'],
          rows: [
            ['50 m/s', '$10 \\div 0.2$: forgot the **half** and the **square root**'],
            ['2 m/s', '$10 \\times 0.2$: multiplied energy by mass'],
            ['0 m/s', 'That is **after** it lands; just **before**, it is moving fastest'],
            ['10 m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: 'Fifty metres per second is ten divided by 0.2. It forgets both the half and the square root.' },
        { say: 'Two metres per second multiplies the energy by the mass, which is not part of any formula here.' },
        { say: 'And zero is the speed after it has landed and stopped. Just before it lands, it is moving at its fastest.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 0.50 kg ball at the top of a cliff has 36 J of gravitational potential energy. It falls, converting all of it to kinetic energy. How fast is it moving just before it lands?',
          choices: ['72 m/s', '12 m/s', '8.5 m/s', '18 m/s'],
          answer: 1,
          working: '$\\tfrac{1}{2} \\times 0.50 \\times v^2 = 36$, so $v^2 = 144$ and $v = 12$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A 0.50 kilogram ball at the top of a cliff has 36 joules of gravitational potential energy. It falls, converting all of it to kinetic energy. How fast is it moving just before it lands? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Half of 0.50 is 0.25, so 0.25 v squared is 36, and v squared is 144. The square root is twelve metres per second. That is choice B.', show: 'q2.answer' },
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
          items: ['No friction: $E_p + E_k$ stays the **same**', 'Potential energy lost $=$ kinetic energy gained', '$\\tfrac{1}{2}mv^2 = E_k$, so $v = \\sqrt{2E_k \\div m}$', 'Remember the **half** and the **square root**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. With no friction, the total of potential and kinetic energy stays the same.', show: 'sum.0' },
        { say: 'So the potential energy lost is the kinetic energy gained.', show: 'sum.1' },
        { say: 'To find the speed, v is the square root of two times the kinetic energy over the mass.', show: 'sum.2' },
        { say: 'And never forget the half, or the square root. For more on conservation of energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
