import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 3.5 (power): a car's engine gives 100,000 W of power while
// exerting a force of 10,000 N; how long does the car take to travel 100 m? The question is
// OpenStax Physics' own, word for word (Test Prep, section 9.1, CC BY 4.0). The work is
// W = Fd = 10,000 × 100 = 1,000,000 J, and t = W ÷ P = 1,000,000 ÷ 100,000 = 10 s (choice c).
//
// The picture (src/video/motion.ts) drives a car at a steady 10 m/s, with the engine's 10,000 N
// balanced by 10,000 N of resistance, so it covers 100 m in 10 s and the work bar, measured from
// the motion, climbs 100,000 J every second.

const forces: MotionForce[] = [
  { on: 'car', name: 'Engine', n: 10000, tone: 'opp' },
  { on: 'car', name: 'Resistance', n: -10000, resist: true, tone: 'bad' },
];

const road: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 150],
  height: 440,
  lanes: [{ surface: 'rough', label: '100 m of road' }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1000, label: 'car', x: 35, width: 9, tone: 'adj' }],
  energy: { max: 1100000, bars: ['work'], names: { work: 'Work done by the engine' } },
  forceScale: 0.008,
  velocityScale: 9,
  poster: 'go',
  clips: {
    ready: { reset: true, phases: [{ dur: 1, freeze: true, forces }] },
    go: { reset: true, phases: [{ dur: 10, set: { car: 10 }, forces }, { dur: 0.001, set: { car: 0 } }] },
  },
};

const QUESTION = 'A car’s engine generates 100,000 W of power as it exerts a force of 10,000 N. How long does it take the car to travel 100 m?';
const CHOICES = ['0.001 s', '0.01 s', '10 s', '1,000 s'];

const video: Explainer = {
  id: 'xq-p10-3-5',
  lessonId: '',
  exam: {
    lesson: 'p10-3-5',
    source: 'OpenStax, Physics, Test Prep for section 9.1, Work, Power, and the Work–Energy Theorem',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-1-work-power-and-the-work-energy-theorem',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: How Long Does the Car Take? Work and Power',
  thumbnailTitle: 'Power and Time',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a car\'s engine gives 100,000 W of power while pushing with 10,000 N, and we find how long the car takes to travel 100 m. We find the work done over the 100 m, then divide by the power, which is the work done each second. Then we check the answer with the car\'s speed and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Power and Time', subtitle: 'Work and power, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a car\'s engine and its power. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 2,
          working: '$W = Fd = 10\\,000 \\times 100 = 1\\,000\\,000$ J, so $t = \\dfrac{W}{P} = \\dfrac{1\\,000\\,000}{100\\,000} = 10$ s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A car\'s engine generates 100,000 watts of power as it exerts a force of 10,000 newtons. How long does it take the car to travel a hundred metres?' },
        { say: 'The choices are 0.001 seconds, 0.01 seconds, ten seconds, and a thousand seconds. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [road, { kind: 'text', id: 'plain', size: 'lg', md: 'How long for **100 m**?' }],
      lines: [
        { say: 'Let us picture it. The engine pushes the car along with 10,000 newtons, and air and road resistance push back, so it cruises at a steady speed.', show: ['sim', 'sim.clock', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'The question asks: how long does it take to cover a hundred metres?', show: 'plain' },
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
          title: 'Power',
          md: '**Power** is how fast work is done: the work done **each second**. $P = \\dfrac{W}{t}$, so $t = \\dfrac{W}{P}$. Power is in **watts**: $1$ W is $1$ joule each second. And recall **work**: $W = Fd$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$600$ J of work at $200$ W takes $600 \\div 200 = 3$ s.' },
      ],
      lines: [
        { say: 'Here is what we need. Power is how fast work is done: the work done each second. It is the work divided by the time.', show: 'def' },
        { say: 'It is measured in watts, and one watt is one joule every second. So the time is the work divided by the power. And remember: work is force times distance.' },
        { say: 'For example, six hundred joules of work at two hundred watts takes six hundred divided by two hundred: three seconds.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **work** over $100$ m: $W = Fd$', 'Divide by the **power**: $t = W \\div P$', 'Check with the **speed**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the work the engine does over the hundred metres.', show: 'plan.0' },
        { say: 'Second, divide the work by the power, the work done each second, to find the time.', show: 'plan.1' },
        { say: 'Third, check the answer with the car\'s speed.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The work',
      layout: 'center',
      main: [road, { kind: 'math', id: 'm', size: 'md', lines: ['W = F\\,d = 10\\,000\\ \\text{N} \\times 100\\ \\text{m} = \\adj{1\\,000\\,000\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. The engine pushes with 10,000 newtons, and the car moves a hundred metres in the direction of the push.', show: 'sim', play: 'sim.ready', playDelay: 0.3 },
        { say: 'So the work done is 10,000 times a hundred: a million joules.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide by the power',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = \\dfrac{W}{P} = \\dfrac{1\\,000\\,000\\ \\text{J}}{100\\,000\\ \\text{W}}', '= \\good{10\\ \\text{s}}'] }],
      lines: [
        { say: 'Step two. The engine does 100,000 joules of work every second. How many seconds does it take to do a million joules? Divide the work by the power.', show: 'm.0' },
        { say: 'Ten seconds. That is choice C.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [road, { kind: 'math', id: 'm', size: 'md', lines: ['v = \\dfrac{P}{F} = \\dfrac{100\\,000}{10\\,000} = 10\\ \\text{m/s} \\qquad t = \\dfrac{100\\ \\text{m}}{10\\ \\text{m/s}} = 10\\ \\text{s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Power is also force times speed, so the speed is the power divided by the force: ten metres per second.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'At ten metres per second, a hundred metres takes ten seconds. Watch the clock, and watch the work bar fill to a million joules as the car reaches the hundred metre mark.' },
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
            ['$0.001$ s', '$100 \\div 100\\,000$: distance over power, **not a time**'],
            ['$0.01$ s', '$100 \\div 10\\,000$: distance over force, **not a time**'],
            ['$1000$ s', '$100\\,000 \\div 100$: power over distance, **not a time**'],
            ['$10$ s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.001, 0.01 and a thousand each divide two of the numbers from the question without following the units. None of them comes out in seconds.' },
        { say: 'And the sizes give them away. A thousandth of a second to drive a hundred metres would be far faster than a bullet, and a thousand seconds is over a quarter of an hour.' },
        { say: 'The safe route is always the same: find the work, then divide by the power.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A motor does 6000 J of work in 30 s. What is its power?',
          choices: ['180 000 W', '200 W', '0.005 W', '6000 W'],
          answer: 1,
          working: '$P = \\dfrac{W}{t} = \\dfrac{6000}{30} = 200$ W.',
        },
      ],
      lines: [
        { say: 'Your turn. A motor does 6,000 joules of work in thirty seconds. What is its power? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Power is work divided by time: 6,000 divided by thirty is two hundred watts. That is choice B. 180,000 multiplied, and 0.005 is upside down.', show: 'q2.answer' },
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
          items: ['Power: $P = \\dfrac{W}{t}$, in **watts**', '$1$ W $= 1$ joule **each second**', 'For the time: $t = \\dfrac{W}{P}$, with $W = Fd$', 'Check: $P = Fv$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Power is work divided by time, measured in watts.', show: 'sum.0' },
        { say: 'One watt is one joule every second.', show: 'sum.1' },
        { say: 'To find a time, divide the work by the power, with the work as force times distance.', show: 'sum.2' },
        { say: 'And power is also force times speed, which makes a handy check. For more on power, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
