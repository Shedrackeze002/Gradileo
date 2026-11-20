import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 1.1 (quantities, SI units and converting units): a drive of
// 10.0 km home in 20.0 min; the average speed in km/h and in m/s. The question is OpenStax Physics'
// own worked example, word for word (section 1.3, CC BY 4.0). 20.0 min = 0.333 h, so the speed is
// 10.0 ÷ 0.333 = 30.0 km/h, and 30.0 × 1000 ÷ 3600 = 8.33 m/s.
//
// The picture (src/video/motion.ts) drives a car 10,000 m in 1,200 s, two hundred times as fast
// as real life, so the clock and the distance on screen come out of the motion.

const V = 10000 / 1200;

const drive: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-300, 10600],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'University to home: 10.0 km' }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1, label: 'Car', x: 0, width: 500, tone: 'adj' }],
  velocityScale: 12,
  poster: 'go',
  clips: {
    go: { reset: true, phases: [{ ...run(1200, { car: V }), slow: 1 / 200, note: '200 times as fast' }, halt('car')] },
  },
};

const video: Explainer = {
  id: 'xq-p10-1-1',
  lessonId: '',
  exam: {
    lesson: 'p10-1-1',
    source: 'OpenStax, Physics, worked example in section 1.3, The Language of Physics: Physical Quantities and Units',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/1-3-the-language-of-physics-physical-quantities-and-units',
    question:
      'Suppose that you drive the 10.0 km from your university to home in 20.0 min. Calculate your average speed (a) in kilometers per hour (km/h) and (b) in meters per second (m/s). (Note—Average speed is distance traveled divided by time of travel.)',
  },
  title: 'Exam Question: A Drive Home. Average Speed in km/h and m/s',
  thumbnailTitle: 'km/h and m/s',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: you drive 10.0 km home in 20.0 min, and we find your average speed in km/h and in m/s. We change the minutes to hours, divide the distance by the time, and then change km/h to m/s with two conversion factors. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'km/h and m/s', subtitle: 'Converting units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a drive home, and the units we use for speed. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Suppose that you drive the 10.0 km from your university to home in 20.0 min. Calculate your average speed (a) in kilometers per hour (km/h) and (b) in meters per second (m/s). (Note—Average speed is distance traveled divided by time of travel.)',
          answer: '(a) $30.0$ km/h (b) $8.33$ m/s',
          working: '$20.0$ min $= 0.333$ h, so $10.0 \\div 0.333 = 30.0$ km/h. Then $30.0 \\times 1000 \\div 3600 = 8.33$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose that you drive the 10.0 kilometres from your university to home in 20.0 minutes. Calculate your average speed, a, in kilometres per hour, and b, in metres per second. Average speed is distance travelled divided by time of travel.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [drive, { kind: 'text', id: 'plain', size: 'lg', md: 'One speed, in **two** different units.' }],
      lines: [
        { say: 'Let us picture it. Here is the drive home, ten kilometres along the road, sped up two hundred times so we do not have to wait twenty minutes.', show: ['sim', 'sim.clock', 'sim.distance'], play: 'sim.go', playDelay: 0.5 },
        { say: 'The clock counts in seconds. Twenty minutes is twelve hundred of them.' },
        { say: 'The question asks for one speed, written in two different units: kilometres per hour, and metres per second.', show: 'plain' },
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
          title: 'Average speed and converting units',
          md: '**Average speed** $= \\dfrac{\\text{distance}}{\\text{time}}$. To change a unit, multiply by a **conversion factor** that equals one: $\\dfrac{1\\ \\text{h}}{60\\ \\text{min}}$, $\\dfrac{1000\\ \\text{m}}{1\\ \\text{km}}$, $\\dfrac{1\\ \\text{h}}{3600\\ \\text{s}}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$90$ min $\\times \\dfrac{1\\ \\text{h}}{60\\ \\text{min}} = 1.5$ h: the minutes cancel, leaving hours.' },
      ],
      lines: [
        { say: 'Here is what we need. Average speed is the distance divided by the time.', show: 'def' },
        { say: 'To change a unit, multiply by a conversion factor: a fraction whose top and bottom are the same amount, like one hour over sixty minutes. It equals one, so it changes the units without changing the amount.' },
        { say: 'For example, ninety minutes times one hour over sixty minutes. The minutes cancel, and we are left with 1.5 hours.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the time to **hours**', '(a) Divide: distance ÷ time, in km/h', '(b) Change km/h to **m/s**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, kilometres per hour needs the time in hours, so change the minutes to hours.', show: 'plan.0' },
        { say: 'Second, divide the distance by the time. That answers part a.', show: 'plan.1' },
        { say: 'Third, change kilometres to metres, and hours to seconds. That answers part b.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Hours',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['20.0\\ \\text{min} \\times \\dfrac{1\\ \\text{h}}{60\\ \\text{min}}', '= \\adj{0.333\\ \\text{h}}'] }],
      lines: [
        { say: 'Step one. Multiply twenty minutes by one hour over sixty minutes. The minutes cancel.', show: 'm.0' },
        { say: 'Twenty divided by sixty is 0.333 hours: a third of an hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Kilometres per hour',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['v = \\dfrac{10.0\\ \\text{km}}{0.333\\ \\text{h}}', '= \\good{30.0\\ \\text{km/h}}'] }],
      lines: [
        { say: 'Step two. Divide the distance, 10.0 kilometres, by the time, 0.333 hours.', show: 'm.0' },
        { say: 'Thirty kilometres per hour. That is part a. It makes sense: ten kilometres in a third of an hour means thirty kilometres in a whole hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Metres per second',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['30.0\\ \\dfrac{\\text{km}}{\\text{h}} \\times \\dfrac{1000\\ \\text{m}}{1\\ \\text{km}} \\times \\dfrac{1\\ \\text{h}}{3600\\ \\text{s}}', '= \\dfrac{30\\,000}{3600}\\ \\text{m/s} = \\good{8.33\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Two conversion factors this time. A thousand metres over one kilometre cancels the kilometres. One hour over 3,600 seconds cancels the hours.', show: 'm.0' },
        { say: '30.0 times a thousand is 30,000. Divided by 3,600 is 8.33 metres per second. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [drive, { kind: 'math', id: 'm', size: 'md', lines: ['8.33\\ \\text{m/s} \\times 1200\\ \\text{s} = 10\\,000\\ \\text{m} = 10.0\\ \\text{km}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b by working forwards. Watch the drive again, with the car\'s speed shown.', show: ['sim', 'sim.clock', 'sim.distance', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: '8.33 metres every second, for 1,200 seconds, is 10,000 metres. That is the 10.0 kilometres home.', show: 'm.0' },
        { say: 'A quick rule for next time: to change kilometres per hour to metres per second, divide by 3.6. Thirty divided by 3.6 is 8.33.' },
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
            ['0.500 km/h', '$10.0 \\div 20.0$: left the time in **minutes**'],
            ['108 m/s', '$30.0 \\times 3.6$: converted the **wrong way**'],
            ['8333 m/s', 'Changed km to m but **not** hours to seconds'],
            ['30.0 km/h, 8.33 m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '0.500 divides by twenty without changing the minutes to hours. That is half a kilometre per minute, not per hour.' },
        { say: '108 multiplies by 3.6 instead of dividing. A metre is smaller than a kilometre, but a second is much smaller than an hour, so the number in metres per second is smaller.' },
        { say: 'And 8,333 changes the kilometres but forgets the hours. Cancel every unit you do not want.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A runner covers 1.5 km in 5.0 min. What is her average speed in m/s?',
          choices: ['5.0 m/s', '0.30 m/s', '18 m/s', '300 m/s'],
          answer: 0,
          working: '$1.5$ km $= 1500$ m and $5.0$ min $= 300$ s, so $1500 \\div 300 = 5.0$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A runner covers 1.5 kilometres in 5.0 minutes. What is her average speed in metres per second? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '1.5 kilometres is 1,500 metres, and 5.0 minutes is 300 seconds. 1,500 over 300 is 5.0 metres per second. That is choice A. 0.30 left both units as they were.', show: 'q2.answer' },
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
          items: ['Average speed $=$ distance $\\div$ time', 'A **conversion factor** equals one: units cancel', 'km/h needs the time in **hours**', 'km/h to m/s: $\\times 1000 \\div 3600$, or $\\div 3.6$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Average speed is distance divided by time.', show: 'sum.0' },
        { say: 'Change units with conversion factors, and cancel the units you do not want.', show: 'sum.1' },
        { say: 'Kilometres per hour needs the time in hours.', show: 'sum.2' },
        { say: 'And to go from kilometres per hour to metres per second, divide by 3.6. For more on units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
