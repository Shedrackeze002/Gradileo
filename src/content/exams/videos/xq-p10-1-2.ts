import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 1.2 (speed and average speed): a baseball travels 18.4 m from
// the pitcher's mound to home plate in 0.46 s; what is its average speed? The question is OpenStax
// Physics' own, word for word (Practice Problems, section 2.2, CC BY 4.0). 18.4 ÷ 0.46 = 40 m/s
// (choice a). −40 m/s gives a speed a sign it cannot have, 0.03 m/s is the fraction upside down,
// and 8.5 m/s multiplies.
//
// The picture (src/video/motion.ts) throws the ball 18.4 m in 0.46 s, ten times slower than life,
// so the clock and the distance on screen come out of the motion.

const pitch: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-1, 20],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'Pitcher\'s mound to home plate: 18.4 m' }],
  bodies: [{ id: 'ball', shape: 'ball', mass: 0.145, label: '', x: 0, width: 0.6, tone: 'adj' }],
  velocityScale: 6,
  clockDecimals: 2,
  poster: 'go',
  clips: {
    go: { reset: true, phases: [{ ...run(0.46, { ball: 18.4 / 0.46 }), slow: 10, note: 'Ten times slower' }, halt('ball')] },
  },
};

const video: Explainer = {
  id: 'xq-p10-1-2',
  lessonId: '',
  exam: {
    lesson: 'p10-1-2',
    source: 'OpenStax, Physics, Practice Problem for section 2.2, Speed and Velocity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/2-2-speed-and-velocity',
    question: 'A pitcher throws a baseball from the pitcher\'s mound to home plate in 0.46 s. The distance is 18.4 m. What was the average speed of the baseball?',
    choices: ['40 m/s', '- 40 m/s', '0.03 m/s', '8.5 m/s'],
  },
  title: 'Exam Question: How Fast Is a Fastball? Average Speed',
  thumbnailTitle: 'How Fast Is a Fastball?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a baseball travels 18.4 m from the pitcher\'s mound to home plate in 0.46 s, and we find its average speed. We divide the distance by the time, check the answer by working forwards, and then look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Is a Fastball?', subtitle: 'Average speed, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a baseball pitch. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A pitcher throws a baseball from the pitcher\'s mound to home plate in 0.46 s. The distance is 18.4 m. What was the average speed of the baseball?',
          choices: ['40 m/s', '- 40 m/s', '0.03 m/s', '8.5 m/s'],
          answer: 0,
          working: '$v = \\dfrac{d}{t} = \\dfrac{18.4}{0.46} = 40$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A pitcher throws a baseball from the pitcher\'s mound to home plate in 0.46 seconds. The distance is 18.4 metres. What was the average speed of the baseball?' },
        { say: 'The choices are forty metres per second, minus forty, 0.03, and 8.5 metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pitch, { kind: 'text', id: 'plain', size: 'lg', md: '**18.4 m** in **0.46 s**. How many metres **each second**?' }],
      lines: [
        { say: 'Let us picture it, ten times slower than real life. The ball leaves the pitcher and flies 18.4 metres to home plate.', show: ['sim', 'sim.clock', 'sim.distance'], play: 'sim.go', playDelay: 0.5 },
        { say: 'It took less than half a second. The question asks: on average, how many metres did it cover each second?', show: 'plain' },
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
          title: 'Average speed',
          md: '**Average speed** is the distance travelled divided by the time taken: $v = \\dfrac{d}{t}$. It is a **scalar**: it has a size but no direction, so it is **never negative**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$100$ m in $20$ s: $v = 100 \\div 20 = 5$ m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. Average speed is the distance travelled, divided by the time it took.', show: 'def' },
        { say: 'Speed is a scalar. It tells you how fast, but not which way, so it can never be negative.' },
        { say: 'For example, a hundred metres in twenty seconds is five metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **distance** and the **time**', 'Divide: $v = d \\div t$', 'Check that the size makes sense'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, pick out the distance and the time from the question.', show: 'plan.0' },
        { say: 'Second, divide the distance by the time.', show: 'plan.1' },
        { say: 'Third, check that the answer makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Distance and time',
      layout: 'center',
      main: [pitch, { kind: 'math', id: 'm', size: 'md', lines: ['d = \\adj{18.4\\ \\text{m}} \\qquad t = \\opp{0.46\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. The distance is 18.4 metres, and the time is 0.46 seconds. Both are already in metres and seconds, so there is nothing to convert.', show: ['sim', 'sim.clock', 'sim.distance', 'm.0'], play: 'sim.go', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = \\dfrac{d}{t} = \\dfrac{18.4\\ \\text{m}}{0.46\\ \\text{s}}', '= \\good{40\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step two. Speed is distance over time: 18.4 metres over 0.46 seconds.', show: 'm.0' },
        { say: 'Forty metres per second. That is choice A.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [pitch, { kind: 'math', id: 'm', size: 'md', lines: ['40\\ \\text{m/s} \\times 0.46\\ \\text{s} = 18.4\\ \\text{m}\\ \\checkmark \\qquad 40 \\times 3.6 = 144\\ \\text{km/h}'] }],
      lines: [
        { say: 'Let us check by working forwards. Forty metres every second, for 0.46 seconds, is 18.4 metres. That is the distance to the plate.', show: ['sim', 'sim.clock', 'sim.distance', 'sim.velocity', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'And the size makes sense. Forty metres per second is 144 kilometres per hour: a fast pitch, but a real one.' },
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
            ['- 40 m/s', 'A **speed** is never negative'],
            ['0.03 m/s', '$0.46 \\div 18.4$: fraction **upside down**'],
            ['8.5 m/s', '$18.4 \\times 0.46$: **multiplied**'],
            ['40 m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Minus forty gives the speed a sign. A speed has no direction, so it is never negative.' },
        { say: '0.03 turns the fraction upside down. That would be a ball crawling slower than a snail.' },
        { say: 'And 8.5 multiplies instead of dividing. Look at the units: metres times seconds is not a speed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A sprinter runs 100 m in 12.5 s. What is her average speed?',
          choices: ['1250 m/s', '8.0 m/s', '0.125 m/s', '−8.0 m/s'],
          answer: 1,
          working: '$v = \\dfrac{d}{t} = \\dfrac{100}{12.5} = 8.0$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A sprinter runs a hundred metres in 12.5 seconds. What is her average speed? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A hundred divided by 12.5 is 8.0 metres per second. That is choice B. 1,250 multiplies, and 0.125 is upside down.', show: 'q2.answer' },
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
          items: ['Average speed: $v = \\dfrac{d}{t}$', 'Distance on **top**, time **underneath**', 'Speed is a scalar: **never negative**', 'Check: speed $\\times$ time gives the distance'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Average speed is distance over time.', show: 'sum.0' },
        { say: 'The distance goes on top, and the time underneath.', show: 'sum.1' },
        { say: 'Speed is a scalar, so it is never negative.', show: 'sum.2' },
        { say: 'And check your answer: speed times time should give back the distance. For more on speed, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
