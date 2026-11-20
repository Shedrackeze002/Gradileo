import type { Explainer, MotionEl } from '@/video/script.ts';
import { brake, drive } from '@/content/phys10/videos/lib/track.ts';

// Exam question for lesson 1.3 (acceleration): a car speeds up from rest at 3.0 m/s² to 21.0 m/s,
// then slows to a stop at 4.0 m/s². The question is OpenStax Physics' own, word for word (Test
// Prep for section 3.1, CC BY 4.0). Speeding up takes 21 ÷ 3 = 7.0 s and slowing down 21 ÷ 4 =
// 5.25 s, 12.25 s in all, which the choices give as 12 seconds (choice d). 7.0 s and 5.3 s are each
// half of the trip on its own, and 1.7 s is far too short.
//
// The picture (src/video/motion.ts) drives the car with those accelerations and draws its
// velocity-time graph as it goes: a line up for 7 s and down for 5.25 s.

const car: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-5, 135],
  height: 470,
  velocityScale: 4,
  graph: { of: ['car'], seconds: 13, max: 24 },
  lanes: [{ surface: 'smooth', label: 'From one stop sign to the next' }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1, label: 'Car', x: 0, width: 8, tone: 'opp' }],
  poster: 'all',
  clips: {
    up: { phases: [{ dur: 7, forces: [drive('car', 3)] }] },
    all: { phases: [{ dur: 7, forces: [drive('car', 3)] }, { dur: 5.27, forces: [brake('car', 4)] }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-3',
  lessonId: '',
  exam: {
    lesson: 'p20-1-3',
    source: 'OpenStax, Physics, Test Prep for section 3.1, Acceleration',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/3-1-acceleration',
    question:
      'A car accelerates from rest at a stop sign at a rate of 3.0 m/s² to a speed of 21.0 m/s, and then immediately begins to decelerate to a stop at the next stop sign at a rate of 4.0 m/s². How long did it take the car to travel from the first stop sign to the second stop sign?',
    choices: ['1.7 seconds', '5.3 seconds', '7.0 seconds', '12 seconds'],
  },
  title: 'Exam Question: How Long From One Stop Sign to the Next? Acceleration',
  thumbnailTitle: 'Stop Sign to Stop Sign',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a car speeds up from rest at 3.0 m/s² to 21.0 m/s, then slows to a stop at 4.0 m/s², and we find how long the trip takes. We split the trip into speeding up and slowing down, use the meaning of acceleration to find the time for each, and add them, while a velocity-time graph draws itself. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Stop Sign to Stop Sign', subtitle: 'Acceleration and time, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a car driving from one stop sign to the next. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A car accelerates from rest at a stop sign at a rate of $3.0\\ \\text{m/s}^2$ to a speed of $21.0\\ \\text{m/s}$, and then immediately begins to decelerate to a stop at the next stop sign at a rate of $4.0\\ \\text{m/s}^2$. How long did it take the car to travel from the first stop sign to the second stop sign?',
          choices: ['1.7 seconds', '5.3 seconds', '7.0 seconds', '12 seconds'],
          answer: 3,
          working: '$21 \\div 3.0 = 7.0\\ \\text{s}$ speeding up, $21 \\div 4.0 = 5.25\\ \\text{s}$ slowing down: $12.25 \\approx 12\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A car starts from rest at a stop sign and speeds up at 3.0 metres per second squared, to a speed of 21.0 metres per second. Then it immediately slows down at 4.0 metres per second squared, and stops at the next stop sign. How long did it take to get from the first stop sign to the second?' },
        { say: 'The choices are 1.7 seconds, 5.3 seconds, 7.0 seconds, and twelve seconds. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [car],
      lines: [
        { say: 'Let us watch the trip. The car speeds up from the first stop sign, then brakes and stops at the second. The graph on the right shows its velocity as time goes by.', show: ['sim', 'sim.graph', 'sim.clock'], play: 'sim.all', playDelay: 0.5 },
        { say: 'The question asks: how long does the whole trip take, from stop to stop?' },
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
          title: 'Acceleration',
          md: 'Acceleration is how fast the velocity changes: $a = \\dfrac{\\Delta v}{\\Delta t}$. So the time for a change in velocity is $\\Delta t = \\dfrac{\\Delta v}{a}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'From $0$ to $10\\ \\text{m/s}$ at $2\\ \\text{m/s}^2$: $\\Delta t = 10 \\div 2 = 5\\ \\text{s}$.' },
      ],
      lines: [
        { say: 'Here is the idea we need. Acceleration tells you how many metres per second the velocity changes by, each second.', show: 'def' },
        { say: 'So to find how long a change takes, divide the change in velocity by the acceleration.' },
        { say: 'For example, to go from zero to ten metres per second, gaining two metres per second each second, takes ten divided by two: five seconds.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Time to **speed up**: from $0$ to $21\\ \\text{m/s}$ at $3.0\\ \\text{m/s}^2$', 'Time to **slow down**: from $21\\ \\text{m/s}$ to $0$ at $4.0\\ \\text{m/s}^2$', '**Add** the two times'],
        },
      ],
      lines: [
        { say: 'Here is the plan. The trip has two parts, with different accelerations, so we take them one at a time. First, the time to speed up.', show: 'plan.0' },
        { say: 'Second, the time to slow down.', show: 'plan.1' },
        { say: 'Third, add the two times together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Speeding up',
      layout: 'center',
      main: [car, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta t_1 = \\dfrac{21.0 - 0}{3.0} = \\adj{7.0\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. The car goes from zero to twenty one metres per second, gaining three metres per second every second.', show: ['sim', 'sim.graph', 'sim.clock'], play: 'sim.up', playDelay: 0.3 },
        { say: 'Twenty one divided by three is seven. So speeding up takes 7.0 seconds. On the graph, the line climbs for seven seconds.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Slowing down',
      layout: 'center',
      main: [car, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta t_2 = \\dfrac{21.0}{4.0} = \\opp{5.25\\ \\text{s}}'] }],
      lines: [
        { say: 'Step two. Now the car goes from twenty one metres per second down to zero, losing four metres per second every second.', show: ['sim', 'sim.graph', 'sim.clock'], play: 'sim.all', playDelay: 0.3 },
        { say: 'Twenty one divided by four is 5.25. So slowing down takes 5.25 seconds. The braking is harder, so it is quicker. The line on the graph comes down more steeply.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Add the times',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta t = 7.0 + 5.25', '= 12.25\\ \\text{s} \\approx \\good{12\\ \\text{s}}'] }],
      lines: [
        { say: 'Step three. Add the two times: seven plus 5.25.', show: 'm.0' },
        { say: 'That is 12.25 seconds, which the choices round to twelve seconds. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [car],
      lines: [
        { say: 'Let us check it with the picture. Watch the clock as the car drives from stop to stop.', show: ['sim', 'sim.graph', 'sim.clock'], play: 'sim.all', playDelay: 0.3 },
        { say: 'It stops just after twelve seconds. And on the graph, the line goes up for seven seconds and down for a little over five. The whole triangle is just over twelve seconds wide.' },
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
            ['7.0 s', 'Only the **speeding up**'],
            ['5.3 s', 'Only the **slowing down**'],
            ['1.7 s', 'Far too short: at $3\\ \\text{m/s}^2$ it would reach only about $5\\ \\text{m/s}$'],
            ['12 s', 'Correct: both parts'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '7.0 seconds is only the speeding up, and 5.3 seconds is only the slowing down. Each one answers half of the question.' },
        { say: '1.7 seconds is far too short. In 1.7 seconds, gaining three metres per second each second, the car would only reach about five metres per second, nowhere near twenty one.' },
        { say: 'Questions with two stages often hide a stage on its own among the choices. Make sure you have added every part of the trip.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A train starts from rest and speeds up at $0.50\\ \\text{m/s}^2$ to $15\\ \\text{m/s}$. Then it brakes at $0.75\\ \\text{m/s}^2$ until it stops. How long does the whole trip take?',
          choices: ['20 s', '30 s', '50 s', '12 s'],
          answer: 2,
          working: '$15 \\div 0.50 = 30\\ \\text{s}$ and $15 \\div 0.75 = 20\\ \\text{s}$: $50\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A train starts from rest and speeds up at 0.50 metres per second squared, to fifteen metres per second. Then it brakes at 0.75 metres per second squared until it stops. How long does the whole trip take? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Speeding up takes fifteen divided by 0.5: thirty seconds. Slowing down takes fifteen divided by 0.75: twenty seconds. Fifty seconds in all. That is choice C.', show: 'q2.answer' },
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
          items: ['Time for a change in velocity: $\\Delta t = \\dfrac{\\Delta v}{a}$', 'Different accelerations: take **each stage** on its own', '**Add** the times of all the stages', 'Size check: does the time fit the speeds?'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The time for a change in velocity is the change, divided by the acceleration.', show: 'sum.0' },
        { say: 'When the acceleration changes part way, take each stage on its own.', show: 'sum.1' },
        { say: 'Then add the times of all the stages.', show: 'sum.2' },
        { say: 'And check that the time fits the speeds. For more on acceleration, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
