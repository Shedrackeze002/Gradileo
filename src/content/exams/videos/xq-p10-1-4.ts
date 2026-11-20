import type { Explainer, MotionEl } from '@/video/script.ts';
import { drive } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 1.4 (acceleration): a subway train speeds up from rest to
// 30.0 km/h in 20.0 s; what is its average acceleration? The question is OpenStax Physics' own
// worked example, word for word (section 3.1, CC BY 4.0). 30.0 km/h = 8.33 m/s, so
// a = Δv ÷ Δt = 8.33 ÷ 20.0 = 0.417 m/s².
//
// The picture (src/video/motion.ts) speeds a train up steadily from rest for 20.0 s, so its
// velocity arrow and the clock come out of the motion: 8.3 m/s after 20 s, 83 m along the track.

const A = 30 / 3.6 / 20;

const train: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-5, 100],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'The subway train, starting from rest' }],
  bodies: [{ id: 'train', shape: 'cart', mass: 1, label: 'Train', x: 0, width: 14, tone: 'adj' }],
  velocityScale: 14,
  poster: 'go',
  clips: {
    go: { reset: true, phases: [{ dur: 20, slow: 0.4, forces: [drive('train', A)], note: '2.5 times as fast' }] },
  },
};

const video: Explainer = {
  id: 'xq-p10-1-4',
  lessonId: '',
  exam: {
    lesson: 'p10-1-4',
    source: 'OpenStax, Physics, worked example in section 3.1, Acceleration',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/3-1-acceleration',
    question: 'A subway train accelerates from rest to 30.0 km/h in 20.0 s. What is the average acceleration during that time interval?',
  },
  title: 'Exam Question: A Subway Train Speeds Up. Average Acceleration',
  thumbnailTitle: 'The Accelerating Train',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a subway train speeds up from rest to 30.0 km/h in 20.0 s, and we find its average acceleration. We change the speed to metres per second, find the change in velocity, and divide by the time. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Accelerating Train', subtitle: 'Average acceleration, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a subway train pulling out of a station. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A subway train accelerates from rest to 30.0 km/h in 20.0 s. What is the average acceleration during that time interval?',
          answer: '$0.417\\ \\text{m/s}^2$',
          working: '$30.0$ km/h $= 8.33$ m/s, so $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{8.33 - 0}{20.0} = 0.417\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A subway train accelerates from rest to 30.0 kilometres per hour in 20.0 seconds. What is the average acceleration during that time interval?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [train, { kind: 'text', id: 'plain', size: 'lg', md: 'How much **faster** does it get **each second**?' }],
      lines: [
        { say: 'Let us picture it. The train starts at rest in the station. Watch its velocity arrow grow as it speeds up.', show: ['sim', 'sim.clock', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'After twenty seconds it is doing thirty kilometres per hour. The question asks: how much faster did it get, on average, each second?', show: 'plain' },
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
          title: 'Average acceleration',
          md: '**Acceleration** is how quickly the velocity changes: $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v_f - v_i}{\\Delta t}$. With $v$ in m/s and $t$ in s, it is in **m/s²**: metres per second, gained each second.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'From $2$ m/s to $10$ m/s in $4$ s: $a = 8 \\div 4 = 2\\ \\text{m/s}^2$.' },
      ],
      lines: [
        { say: 'Here is what we need. Acceleration is how quickly the velocity changes: the change in velocity, divided by the time it took.', show: 'def' },
        { say: 'The change in velocity is the final velocity minus the starting velocity. With metres per second and seconds, the acceleration comes out in metres per second squared: metres per second gained each second.' },
        { say: 'For example, from two to ten metres per second in four seconds is a gain of eight, over four: two metres per second squared.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change $30.0$ km/h to **m/s**', 'Find the **change** in velocity: $v_f - v_i$', 'Divide by the time'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, change the speed to metres per second, to match the seconds.', show: 'plan.0' },
        { say: 'Second, find the change in velocity. "From rest" tells us it started at zero.', show: 'plan.1' },
        { say: 'Third, divide by the time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Metres per second',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['30.0\\ \\dfrac{\\text{km}}{\\text{h}} \\times \\dfrac{1000\\ \\text{m}}{1\\ \\text{km}} \\times \\dfrac{1\\ \\text{h}}{3600\\ \\text{s}}', '= \\adj{8.33\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step one. Multiply by a thousand metres per kilometre, and by one hour over 3,600 seconds. The kilometres and the hours cancel.', show: 'm.0' },
        { say: '8.33 metres per second. Or use the shortcut: thirty divided by 3.6.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The change in velocity',
      layout: 'center',
      main: [train, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta v = v_f - v_i = 8.33 - 0 = \\opp{8.33\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step two. The train starts from rest, so its first velocity is zero. Its last is 8.33 metres per second. Watch the arrow.', show: ['sim', 'sim.clock', 'sim.velocity'], play: 'sim.go', playDelay: 0.3 },
        { say: 'The change in velocity is 8.33 minus zero: 8.33 metres per second.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Divide by the time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{8.33\\ \\text{m/s}}{20.0\\ \\text{s}}', '= \\good{0.417\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Step three. Divide the change in velocity, 8.33, by the time, 20.0 seconds.', show: 'm.0' },
        { say: '0.417 metres per second squared. Each second, the train goes 0.417 metres per second faster.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [train, { kind: 'math', id: 'm', size: 'md', lines: ['0.417 \\times 20.0 = 8.33\\ \\text{m/s} = 30.0\\ \\text{km/h}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working forwards. Gaining 0.417 metres per second every second, for twenty seconds, is 8.33 metres per second. That is thirty kilometres per hour.', show: ['sim', 'sim.clock', 'sim.velocity', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'And the size makes sense. A gentle acceleration, well under one metre per second squared, is what you want on a train full of standing passengers.' },
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
            ['$1.50$', '$30.0 \\div 20.0$: left the speed in **km/h**'],
            ['$5.40\\ \\text{m/s}^2$', '$30.0 \\times 3.6 \\div 20.0$: converted the **wrong way**'],
            ['$167\\ \\text{m/s}^2$', '$8.33 \\times 20.0$: **multiplied** by the time'],
            ['$0.417\\ \\text{m/s}^2$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '1.50 divides without changing the units. It is kilometres per hour gained each second, a mixed unit that is not metres per second squared.' },
        { say: '5.40 multiplies by 3.6 instead of dividing. Remember, metres per second is the smaller number.' },
        { say: 'And 167 multiplies by the time. Acceleration is the change in velocity divided by the time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A car speeds up from rest to 72 km/h in 8.0 s. What is its average acceleration?',
          choices: ['$9.0\\ \\text{m/s}^2$', '$160\\ \\text{m/s}^2$', '$32\\ \\text{m/s}^2$', '$2.5\\ \\text{m/s}^2$'],
          answer: 3,
          working: '$72$ km/h $= 72 \\div 3.6 = 20$ m/s, so $a = \\dfrac{20 - 0}{8.0} = 2.5\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car speeds up from rest to 72 kilometres per hour in 8.0 seconds. What is its average acceleration? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '72 divided by 3.6 is twenty metres per second. Twenty minus zero, over 8.0, is 2.5 metres per second squared. That is choice D. 9.0 forgot to change the kilometres per hour.', show: 'q2.answer' },
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
          items: ['$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v_f - v_i}{\\Delta t}$', '"From rest" means $v_i = 0$', 'Speeds in **m/s** first: km/h $\\div 3.6$', 'Acceleration is in **m/s²**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Average acceleration is the change in velocity divided by the time.', show: 'sum.0' },
        { say: 'From rest means the starting velocity is zero.', show: 'sum.1' },
        { say: 'Change speeds to metres per second first. From kilometres per hour, divide by 3.6.', show: 'sum.2' },
        { say: 'And acceleration is in metres per second squared. For more on acceleration, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
