import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 3.6 (efficiency): a lever is pushed with 11 N through 0.4 m and
// lifts a 40 N weight through 0.1 m; what is its efficiency? The question is OpenStax Physics' own
// worked example, word for word (section 9.3, CC BY 4.0). Work in = 11 × 0.4 = 4.4 J, useful work
// out = 40 × 0.1 = 4.0 J, so the efficiency is 4.0 ÷ 4.4 = 0.91, or 91%.
//
// The picture (src/video/motion.ts) shows the two ends of the lever side by side over the same two
// seconds: the effort end pushed down 0.4 m with 11 N, and the load end lifting 40 N up 0.1 m.
// Each moves steadily (a hidden force balances the one drawn), so its distance comes from the
// motion.

const steady = (on: string, name: string, n: number, tone: 'opp' | 'adj'): MotionForce[] => [
  { on, name, n, tone },
  { on, name: 'Balance', n: -n, hidden: true },
];

/**
 * Both ends of the lever as two columns, measured down from the top: the effort end is pushed
 * down 0.4 m (from 0.05 m to 0.45 m), and in the same two seconds the load end rises 0.1 m (from
 * 0.45 m to 0.35 m). Down the screen is positive, so the lift is a negative force.
 */
const lever: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 0.6],
  height: 400,
  lanes: [{ label: 'Effort end: pushed down' }, { label: 'Load end: lifted up' }],
  bodies: [
    { id: 'hand', shape: 'block', mass: 1, label: 'hand', x: 0.05, width: 0.08, lane: 0, tone: 'opp' },
    { id: 'load', shape: 'block', mass: 40 / 9.8, label: '40 N', x: 0.45, width: 0.08, lane: 1, tone: 'adj' },
  ],
  forceScale: 3.4,
  velocityScale: 300,
  velocityDecimals: 2,
  poster: 'go',
  clips: {
    go: {
      reset: true,
      phases: [
        { dur: 2, set: { hand: 0.2, load: -0.05 }, forces: [...steady('hand', 'Effort', 11, 'opp'), ...steady('load', 'Lift', -40, 'adj')] },
        { dur: 0.001, set: { hand: 0, load: 0 }, forces: [...steady('hand', 'Effort', 11, 'opp'), ...steady('load', 'Lift', -40, 'adj')] },
      ],
    },
  },
};

const QUESTION =
  'The input force of 11 N acting on the effort arm of a lever moves 0.4 m, which lifts a 40 N weight resting on the resistance arm a distance of 0.1 m. What is the efficiency of the machine?';

const video: Explainer = {
  id: 'xq-p10-3-6',
  lessonId: '',
  exam: {
    lesson: 'p10-3-6',
    source: 'OpenStax, Physics, worked example in section 9.3, Simple Machines',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-3-simple-machines',
    question: QUESTION,
  },
  title: 'Exam Question: How Efficient Is the Lever? Work In and Work Out',
  thumbnailTitle: 'How Efficient Is the Lever?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a lever is pushed with 11 N through 0.4 m and lifts a 40 N weight through 0.1 m, and we find its efficiency. We work out the work put in and the useful work got out, each as force times distance, and divide the useful work by the work put in. Then we check that the answer is less than 100% and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Efficient Is the Lever?', subtitle: 'Efficiency, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about how efficient a lever is. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$0.91$, or $91\\%$',
          working: 'Work in $= 11 \\times 0.4 = 4.4$ J. Useful work out $= 40 \\times 0.1 = 4.0$ J. Efficiency $= \\dfrac{4.0}{4.4} = 0.91 = 91\\%$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The input force of eleven newtons, acting on the effort arm of a lever, moves 0.4 metres, which lifts a forty newton weight resting on the resistance arm a distance of 0.1 metres. What is the efficiency of the machine?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [lever],
      lines: [
        { say: 'Let us picture the two ends of the lever, side by side. On the left, your hand pushes down on the long arm with eleven newtons. On the right, the short arm lifts a forty newton weight.', show: ['sim', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'In the same time, your hand moves 0.4 metres, but the weight rises only 0.1 metres. A small force over a long distance lifts a big force a short distance.' },
        { say: 'The question asks: how much of the work you put in comes out as useful work on the weight?' },
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
          title: 'Efficiency',
          md: 'A machine is given work, the **work in**, and does **useful work out**. Some is always lost, mostly as **heat** from friction. **Efficiency** $= \\dfrac{\\text{useful work out}}{\\text{work in}}$, as a decimal, or $\\times 100$ for a **percentage**. It is always **less than 1**, or $100\\%$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$50$ J in, $40$ J useful out: $40 \\div 50 = 0.80 = 80\\%$.' },
      ],
      lines: [
        { say: 'Here is what we need. A machine is given work, the work in, and it does useful work out. Some of the energy is always lost, mostly as heat from friction.', show: 'def' },
        { say: 'Efficiency is the useful work out divided by the work in. As a decimal it is always less than one, or as a percentage, less than a hundred.' },
        { say: 'For example, fifty joules in and forty joules of useful work out is forty over fifty: 0.80, or eighty percent.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['**Work in**: effort force $\\times$ its distance', '**Work out**: load force $\\times$ its distance', 'Divide: out $\\div$ in'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, the work in: the effort force times the distance it moves.', show: 'plan.0' },
        { say: 'Second, the useful work out: the weight lifted times the distance it rises.', show: 'plan.1' },
        { say: 'Third, divide the work out by the work in.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Work in',
      layout: 'center',
      main: [lever, { kind: 'math', id: 'm', size: 'md', lines: ['W_{\\text{in}} = 11\\ \\text{N} \\times 0.4\\ \\text{m} = \\opp{4.4\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. Your hand pushes with eleven newtons, and moves 0.4 metres along the push. The work in is eleven times 0.4: 4.4 joules.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.go', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Work out',
      layout: 'center',
      main: [lever, { kind: 'math', id: 'm', size: 'md', lines: ['W_{\\text{out}} = 40\\ \\text{N} \\times 0.1\\ \\text{m} = \\adj{4.0\\ \\text{J}}'] }],
      lines: [
        { say: 'Step two. The lever lifts forty newtons through 0.1 metres. The useful work out is forty times 0.1: 4.0 joules.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'Less comes out than went in. The missing 0.4 joules went into heat, from friction at the pivot.' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{efficiency} = \\dfrac{W_{\\text{out}}}{W_{\\text{in}}} = \\dfrac{4.0\\ \\text{J}}{4.4\\ \\text{J}} = 0.909', '= \\good{0.91, \\text{ or } 91\\%}'] }],
      lines: [
        { say: 'Step three. Divide the useful work out by the work in: 4.0 over 4.4, which is 0.909.', show: 'm.0' },
        { say: 'About 0.91. As a percentage, multiply by a hundred: 91 percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0.91 < 1\\ \\checkmark \\qquad 0.91 \\times 4.4\\ \\text{J} = 4.0\\ \\text{J}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The efficiency is less than one, as it must be: no machine gives out more work than it is given.', show: 'm.0' },
        { say: 'And working forwards, 91 percent of 4.4 joules is 4.0 joules, the useful work. A lever has very little friction, so 91 percent is believable.' },
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
            ['$110\\%$', '$4.4 \\div 4.0$: in over out, **upside down**'],
            ['$28\\%$', '$11 \\div 40$: compared the **forces** only'],
            ['$25\\%$', '$0.1 \\div 0.4$: compared the **distances** only'],
            ['$91\\%$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '110 percent divides the work in by the work out, upside down. An efficiency over a hundred percent is impossible, so that is an easy one to catch.' },
        { say: '28 percent compares the forces only, and 25 percent compares the distances only. Efficiency compares work, and work needs both: force times distance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A motor is given 500 J of energy, and lifts a load that gains 350 J of potential energy. What is the motor\'s efficiency?',
          choices: ['143%', '30%', '70%', '35%'],
          answer: 2,
          working: 'Efficiency $= \\dfrac{350}{500} = 0.70 = 70\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A motor is given 500 joules of energy, and lifts a load that gains 350 joules of potential energy. What is the motor\'s efficiency? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Useful energy out over energy in: 350 over 500 is 0.70, or seventy percent. That is choice C. 143 percent is upside down, and thirty percent is the share that was wasted.', show: 'q2.answer' },
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
          items: ['Efficiency $= \\dfrac{\\text{useful work out}}{\\text{work in}}$', 'Work $=$ force $\\times$ distance, for **each** end', 'Always **less than** $1$, or $100\\%$', 'The rest is wasted, mostly as **heat**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Efficiency is the useful work out divided by the work in.', show: 'sum.0' },
        { say: 'Work is force times distance, worked out for each end of the machine.', show: 'sum.1' },
        { say: 'The efficiency is always less than one, or a hundred percent.', show: 'sum.2' },
        { say: 'And the rest is wasted, mostly as heat. For more on efficiency, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
