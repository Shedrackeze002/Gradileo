import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 3.4 (conservation of energy): a 10 kg rock falls from a 20 m
// cliff; what are its kinetic and potential energy when it has fallen 10 m? The question is
// OpenStax Physics' own worked example, word for word (section 9.2, CC BY 4.0). At the top it has
// mgh = 10 × 9.80 × 20 = 1960 J of potential energy; 10 m down, 980 J is still potential energy,
// so by conservation the other 980 J is kinetic energy.
//
// The picture (src/video/motion.ts) drops the rock from the top of the cliff under its weight
// alone, so the energy bars are measured from the fall: it is half way down after √(20 ÷ 9.8) s.

const G = 9.8;
const HALF = Math.sqrt(20 / G);
const LAND = Math.sqrt(40 / G);
const weight: MotionForce = { on: 'rock', name: 'Weight', n: 10 * G, tone: 'hyp' };
// Near the ground there is no room for the weight's arrow, so it acts there without being drawn.
const fall = (dur: number, hidden = false) => ({ dur, slow: 2, forces: [{ ...weight, hidden }], note: 'Slow motion' });

const cliff: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 20],
  height: 470,
  lanes: [{ label: 'A 10 kg rock, 20 m up' }],
  bodies: [{ id: 'rock', shape: 'ball', mass: 10, x: 0, width: 2.4, tone: 'adj' }],
  energy: { max: 2200, bars: ['potential', 'kinetic', 'total'], g: G },
  forceScale: 0.8,
  velocityScale: 5,
  poster: 'half',
  clips: {
    hold: { reset: true, phases: [{ dur: 1, freeze: true, forces: [weight] }] },
    half: { reset: true, phases: [fall(HALF)] },
    land: { phases: [fall(LAND - HALF, true)] },
    again: { reset: true, phases: [fall(HALF), fall(LAND - HALF, true)] },
  },
};

const QUESTION = 'A 10 kg rock falls from a 20 m cliff. What is the kinetic and potential energy when the rock has fallen 10 m?';

const video: Explainer = {
  id: 'xq-p10-3-4',
  lessonId: '',
  exam: {
    lesson: 'p10-3-4',
    source: 'OpenStax, Physics, worked example in section 9.2, Mechanical Energy and Conservation of Energy',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-2-mechanical-energy-and-conservation-of-energy',
    question: QUESTION,
  },
  title: 'Exam Question: A Rock Falls From a Cliff. Conservation of Energy',
  thumbnailTitle: 'The Falling Rock',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 10 kg rock falls from a 20 m cliff, and we find its kinetic and potential energy half way down. We work out the total energy at the top, the potential energy left 10 m above the ground, and use conservation of energy to find the kinetic energy. Then we check the answer from the rock\'s speed and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Falling Rock', subtitle: 'Conservation of energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a rock falling from a cliff. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$E_k = 980$ J and $E_p = 980$ J',
          working: 'At the top, $E_p = mgh = 10 \\times 9.80 \\times 20 = 1960$ J. After $10$ m, $E_p = 10 \\times 9.80 \\times 10 = 980$ J, so $E_k = 1960 - 980 = 980$ J.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A ten kilogram rock falls from a twenty metre cliff. What is the kinetic and potential energy when the rock has fallen ten metres?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [cliff],
      lines: [
        { say: 'Let us picture it, in slow motion. Here is the rock at the top of the cliff, twenty metres up.', show: 'sim', play: 'sim.hold', playDelay: 0.5 },
        { say: 'It falls. Here it is, half way down: it has fallen ten metres, and it is ten metres above the ground.', show: ['sim.velocity', 'sim.clock'], play: 'sim.half' },
        { say: 'The question asks for two energies at this moment: the energy of its motion, and the energy it still has from its height.' },
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
          title: 'Conservation of energy',
          md: 'Energy is never made or destroyed: it only changes form. For a falling object with no air resistance, the **total** $E_p + E_k$ stays the **same**. Potential energy is $E_p = mgh$, with $h$ the height **above the ground**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Start with $100$ J, all $E_p$. Later $E_p = 40$ J, so $E_k = 100 - 40 = 60$ J.' },
      ],
      lines: [
        { say: 'Here is what we need: conservation of energy. Energy is never made or destroyed. It only changes from one form to another.', show: 'def' },
        { say: 'For a falling object with no air resistance, the potential energy plus the kinetic energy always adds up to the same total. And the potential energy is m g h, where h is the height above the ground.' },
        { say: 'For example, if an object starts with a hundred joules, all potential, and later has forty joules of potential energy left, the other sixty joules must be kinetic.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **total** energy at the top', 'Find the $E_p$ **10 m above the ground**', 'The rest is $E_k$: total $-\\ E_p$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the total energy at the top of the cliff.', show: 'plan.0' },
        { say: 'Second, find the potential energy when the rock is ten metres above the ground.', show: 'plan.1' },
        { say: 'Third, whatever is left of the total must be kinetic energy.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The total at the top',
      layout: 'center',
      main: [cliff, { kind: 'math', id: 'm', size: 'md', lines: ['E_p = mgh = 10 \\times 9.80 \\times 20 = \\adj{1960\\ \\text{J}} \\qquad E_k = 0'] }],
      lines: [
        { say: 'Step one. At the top, the rock is twenty metres up and not moving yet. Its potential energy is ten times 9.80 times twenty: 1,960 joules.', show: ['sim', 'sim.energy', 'm.0'], play: 'sim.hold', playDelay: 0.3 },
        { say: 'Its kinetic energy is zero, so the total is 1,960 joules. That total will not change.' },
      ],
    },
    {
      chapter: 'Step 2: Potential energy half way',
      layout: 'center',
      main: [cliff, { kind: 'math', id: 'm', size: 'md', lines: ['h = 20 - 10 = 10\\ \\text{m} \\qquad E_p = 10 \\times 9.80 \\times 10 = \\opp{980\\ \\text{J}}'] }],
      lines: [
        { say: 'Step two. After falling ten metres, the rock is twenty minus ten: ten metres above the ground.', show: ['sim', 'sim.energy', 'sim.velocity', 'm.0'], play: 'sim.half', playDelay: 0.3 },
        { say: 'Its potential energy now is ten times 9.80 times ten: 980 joules. Half of the potential energy is left.' },
      ],
    },
    {
      chapter: 'Step 3: Kinetic energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E_k = 1960\\ \\text{J} - 980\\ \\text{J} = 980\\ \\text{J}', '\\good{E_k = 980\\ \\text{J}, \\quad E_p = 980\\ \\text{J}}'] }],
      lines: [
        { say: 'Step three. The total is still 1,960 joules. Take away the 980 joules of potential energy, and 980 joules is left for kinetic energy.', show: 'm.0' },
        { say: 'So half way down, the kinetic energy is 980 joules, and the potential energy is 980 joules. Half of the energy has changed form.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [cliff, { kind: 'math', id: 'm', size: 'md', lines: ['v^2 = 2gd = 2 \\times 9.80 \\times 10 = 196 \\qquad E_k = \\tfrac{1}{2} \\times 10 \\times 196 = 980\\ \\text{J}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check a different way: from the rock\'s speed. Watch it fall again.', show: ['sim', 'sim.energy', 'sim.velocity', 'm.0'], play: 'sim.half', playDelay: 0.3 },
        { say: 'After falling ten metres, its speed squared is two times 9.80 times ten, which is 196, so it is moving at fourteen metres per second. A half, times ten, times 196, is 980 joules. The same answer.' },
        { say: 'And at the bottom, all 1,960 joules will be kinetic energy. Watch the bars.', play: 'sim.land' },
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
            ['$E_p = 1960$ J', 'Used the height of the **cliff**, not the height **now**'],
            ['$E_k = 1960$ J', 'Gave $E_k$ the **whole** total: only at the **bottom**'],
            ['$E_p = 0$', 'Measured height from the **top**: $h$ is above the **ground**'],
            ['$980$ J and $980$ J', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A potential energy of 1,960 joules uses the full twenty metres. But the rock is now only ten metres up.' },
        { say: 'A kinetic energy of 1,960 joules gives it the whole total. That only happens at the very bottom.' },
        { say: 'And a potential energy of zero measures the height from the top of the cliff. Height is measured up from the ground.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 2.0 kg ball is dropped from a height of 5.0 m. Ignoring air resistance, what is its kinetic energy just before it hits the ground? (Use g = 9.8 N/kg.)',
          choices: ['0 J', '10 J', '49 J', '98 J'],
          answer: 3,
          working: 'All its potential energy becomes kinetic energy: $E_k = mgh = 2.0 \\times 9.8 \\times 5.0 = 98$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. A 2.0 kilogram ball is dropped from a height of 5.0 metres. Ignoring air resistance, what is its kinetic energy just before it hits the ground? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Just before it lands, all its potential energy has become kinetic energy: 2.0 times 9.8 times 5.0 is 98 joules. That is choice D. 49 is the energy half way down.', show: 'q2.answer' },
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
          items: ['Energy only **changes form**: the total stays the same', '$E_p = mgh$, with $h$ above the **ground**', '$E_k =$ total $-\\ E_p$', 'At the bottom, all $E_p$ has become $E_k$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Energy only changes form, so the total stays the same.', show: 'sum.0' },
        { say: 'Potential energy is m g h, with the height measured from the ground.', show: 'sum.1' },
        { say: 'The kinetic energy is whatever is left of the total.', show: 'sum.2' },
        { say: 'And at the bottom, all the potential energy has become kinetic energy. For more on conservation of energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
