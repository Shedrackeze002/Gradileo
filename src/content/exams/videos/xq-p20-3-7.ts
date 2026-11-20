import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for lesson 3.7 (power): a 60 kg runner generates 250 W while accelerating to
// 5 m/s; how long does it take? The question is OpenStax Physics' own, word for word (Test Prep,
// section 9.1, CC BY 4.0). The work done is the kinetic energy gained, ½ × 60 × 5² = 750 J, and
// t = W ÷ P = 750 ÷ 250 = 3.0 s (choice d). 0.33 s is P ÷ W (upside down), 0.83 s is 250 ÷ (60 × 5)
// and 1.2 s is (60 × 5) ÷ 250, both with momentum in place of energy.
//
// The picture (src/video/motion.ts) starts the runner from rest with a steady 100 N for 3.0 s, so
// she reaches 5 m/s as the clock reads 3.0 s and the bars show 750 J of work and kinetic energy:
// an average power of 250 W.

const DRIVE: MotionForce = { on: 'runner', name: 'Net force', n: 100, tone: 'theta' };

const sprint: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  lanes: [{ label: 'The start of the race' }],
  bodies: [{ id: 'runner', shape: 'ball', mass: 60, label: 'Runner', x: 1.2, width: 0.9, tone: 'adj' }],
  energy: { max: 900, bars: ['work', 'kinetic'], names: { work: 'Work done' } },
  forceScale: 1,
  velocityScale: 26,
  height: 420,
  poster: 'go',
  clips: {
    ready: { reset: true, phases: [{ dur: 1.2, freeze: true, forces: [DRIVE] }] },
    go: { reset: true, phases: [{ dur: 3, forces: [DRIVE] }, { dur: 0.001 }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-7',
  lessonId: '',
  exam: {
    lesson: 'p20-3-7',
    source: 'OpenStax, Physics, Test Prep for section 9.1, Work, Power, and the Work–Energy Theorem',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-1-work-power-and-the-work-energy-theorem',
    question: 'A runner at the start of a race generates 250 W of power as he accelerates to 5 m/s. If the runner has a mass of 60 kg, how long did it take him to reach that speed?',
    choices: ['0.33 s', '0.83 s', '1.2 s', '3.0 s'],
  },
  title: 'Exam Question: A Runner\'s Power. How Long to Reach Full Speed?',
  thumbnailTitle: 'A Runner\'s Power',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 60 kg runner generates 250 W of power while accelerating to 5 m/s, and we find how long it takes. We find the kinetic energy he gains, which is the work his muscles do, and divide by the power. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Runner\'s Power', subtitle: 'Work, energy and power, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a runner at the start of a race. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A runner at the start of a race generates 250 W of power as he accelerates to 5 m/s. If the runner has a mass of 60 kg, how long did it take him to reach that speed?',
          choices: ['0.33 s', '0.83 s', '1.2 s', '3.0 s'],
          answer: 3,
          working: '$W = \\tfrac{1}{2} \\times 60 \\times 5^2 = 750$ J, so $t = \\dfrac{W}{P} = \\dfrac{750}{250} = 3.0$ s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A runner at the start of a race generates 250 watts of power as he accelerates to five metres per second. If the runner has a mass of sixty kilograms, how long did it take him to reach that speed?' },
        { say: 'The choices are 0.33 seconds, 0.83 seconds, 1.2 seconds, and 3.0 seconds. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [sprint, { kind: 'text', id: 'plain', size: 'lg', md: 'At **250 J each second**, how long to reach **5 m/s**?' }],
      lines: [
        { say: 'Let us watch it. The runner starts from rest, and his muscles push him up to five metres per second.', show: ['sim', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'Power is how fast he gives himself energy: 250 watts means 250 joules every second.' },
        { say: 'The question asks: how many seconds does it take to reach full speed?', show: 'plain' },
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
          md: 'Power is the rate of doing work: $P = \\dfrac{W}{t}$, in watts (1 W $=$ 1 J/s). So the time is $t = \\dfrac{W}{P}$. The work done speeding something up is the **kinetic energy** it gains, $\\tfrac{1}{2}mv^2$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$600$ J of work at $200$ W takes $600 \\div 200 = 3$ s.' },
      ],
      lines: [
        { say: 'Here is what we need. Power is the rate of doing work: the work done, divided by the time. One watt is one joule every second.', show: 'def' },
        { say: 'So the time is the work divided by the power. And the work done in speeding something up from rest is the kinetic energy it gains, one half m v squared.' },
        { say: 'For example, 600 joules of work at 200 watts takes three seconds.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **kinetic energy** he gains: $\\tfrac{1}{2}mv^2$', 'That is the **work** his muscles do', 'Divide by the **power**: $t = W \\div P$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the kinetic energy the runner gains.', show: 'plan.0' },
        { say: 'Second, that is the work his muscles do.', show: 'plan.1' },
        { say: 'Third, divide by the power to get the time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The energy',
      layout: 'split',
      leftWidth: 700,
      left: [sprint],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['E_k = \\tfrac{1}{2} \\times 60 \\times 5^2', '= 30 \\times 25', '= \\adj{750\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. He starts from rest, with no kinetic energy, and ends at five metres per second. His kinetic energy then is a half, times sixty, times five squared.', show: ['sim', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'Half of sixty is thirty, and five squared is 25.', show: 'm.1' },
        { say: 'Thirty times 25 is 750 joules.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The work',
      layout: 'split',
      leftWidth: 700,
      left: [sprint],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['W = \\Delta E_k', '= 750 - 0', '= \\opp{750\\ \\text{J}}'] }],
      lines: [
        { say: 'Step two. All that energy came from the work his muscles did. Watch the two bars grow together.', show: ['sim', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'He gained 750 joules, starting from none.', show: 'm.1' },
        { say: 'So the work done is 750 joules.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The time',
      layout: 'split',
      leftWidth: 700,
      left: [sprint],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['t = \\dfrac{W}{P}', '= \\dfrac{750}{250}', '= \\good{3.0\\ \\text{s}}'] }],
      lines: [
        { say: 'Step three. The time is the work divided by the power.', show: ['sim', 'sim.velocity', 'sim.energy', 'sim.clock', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: '750 joules, at 250 joules every second.', show: 'm.1' },
        { say: 'That takes 3.0 seconds. Look at the clock: he reaches five metres per second at three seconds. That is choice D.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['250\\ \\text{J/s} \\times 3.0\\ \\text{s} = 750\\ \\text{J}\\ \\checkmark', '0 \\to 5\\ \\text{m/s in } 3\\ \\text{s}: \\text{ a quick start, as it should be}'] }],
      lines: [
        { say: 'Let us check it by working forwards. 250 joules every second, for three seconds, is 750 joules. That is exactly the kinetic energy he needs.', show: 'm.0' },
        { say: 'And the size makes sense. A sprinter reaching five metres per second in about three seconds is a quick start, but a real one.', show: 'm.1' },
        { say: 'One more thing: 250 watts is his average power over those three seconds. That is all the question needs.' },
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
            ['0.33 s', '$250 \\div 750$: power divided by work, **upside down**'],
            ['0.83 s', '$250 \\div (60 \\times 5)$: used $mv$, not the **energy** $\\tfrac{1}{2}mv^2$'],
            ['1.2 s', '$(60 \\times 5) \\div 250$: also $mv$ in place of the energy'],
            ['3.0 s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '0.33 seconds divides the power by the work. It is the right numbers, upside down. Time is work over power.' },
        { say: '0.83 seconds and 1.2 seconds both use mass times speed, sixty times five, instead of the kinetic energy. Power is about energy, so you need one half m v squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 900 kg car\'s engine supplies 30,000 W as it speeds up from rest to 20 m/s. Ignoring friction, how long does this take?',
          choices: ['0.30 s', '12 s', '6.0 s', '0.17 s'],
          answer: 2,
          working: '$W = \\tfrac{1}{2} \\times 900 \\times 20^2 = 180\\,000$ J, so $t = 180\\,000 \\div 30\\,000 = 6.0$ s.',
        },
      ],
      lines: [
        { say: 'Your turn. A 900 kilogram car\'s engine supplies 30,000 watts as it speeds up from rest to twenty metres per second. Ignoring friction, how long does this take? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The kinetic energy is a half times 900 times twenty squared: 180,000 joules. Divided by 30,000 watts, that is 6.0 seconds. That is choice C.', show: 'q2.answer' },
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
          items: ['Power: $P = \\dfrac{W}{t}$, in watts (J/s)', 'Speeding up: work done $=$ kinetic energy gained', 'Time: $t = W \\div P$', 'Use $\\tfrac{1}{2}mv^2$, not $mv$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Power is work divided by time, in watts: joules every second.', show: 'sum.0' },
        { say: 'When something speeds up, the work done is the kinetic energy it gains.', show: 'sum.1' },
        { say: 'So the time is the work divided by the power.', show: 'sum.2' },
        { say: 'And use the energy, one half m v squared, not m v. For more on power, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
