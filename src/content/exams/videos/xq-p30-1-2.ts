import type { Explainer, MotionEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 1.2 (impulse): the average force of Venus Williams' racquet on
// a 0.057 kg tennis ball that leaves at 58 m/s after 5 ms of contact. The question is OpenStax
// Physics' own, word for word (the worked example "Calculating Force: Venus Williams' Racquet",
// section 8.1, CC BY 4.0), with the four choices of its OpenStax exercise. Δp = 0.057 × 58 =
// 3.306 kg·m/s, and F = Δp ÷ Δt = 3.306 ÷ 0.005 = 661 N ≈ 660 N (choice d). 0.02 N multiplies by
// the time instead of dividing, and the minus signs take the change in momentum the wrong way round.
//
// The picture (src/video/motion.ts) is the serve in slow motion: 661 N for 0.005 s on a 0.057 kg
// ball at rest, which leaves at 58 m/s with a momentum bar of 3.3 kg·m/s.

const serve: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 430,
  bodies: [{ id: 'ball', shape: 'ball', mass: 0.057, x: 1.2, label: '0.057 kg', tone: 'adj' }],
  momentumMax: 4,
  momentumTotal: false,
  forceScale: 0.2,
  velocityScale: 2.2,
  clockDecimals: 3,
  poster: 'hit',
  clips: {
    hit: {
      phases: [
        { dur: 0.005, slow: 300, note: 'Slow motion', forces: [{ on: 'ball', name: 'Racquet', n: 661.2 }] },
        { dur: 0.1, slow: 14, note: 'Slow motion' },
      ],
    },
  },
};

const QUESTION =
  'During the 2007 French Open, Venus Williams hit the fastest recorded serve in a premier women’s match, reaching a speed of 58 m/s (209 km/h). What was the average force exerted on the 0.057 kg tennis ball by Williams’ racquet? Assume that the ball’s speed just after impact was 58 m/s, the horizontal velocity before impact is negligible, and that the ball remained in contact with the racquet for 5 ms (milliseconds).';
const CHOICES = ['−0.02 N', '0.02 N', '−660 N', '660 N'];

const video: Explainer = {
  id: 'xq-p30-1-2',
  lessonId: '',
  exam: {
    lesson: 'p30-1-2',
    source: 'OpenStax, Physics, Worked Example "Calculating Force: Venus Williams’ Racquet", section 8.1',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/8-1-linear-momentum-force-and-impulse',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Force of a Record Tennis Serve. Impulse and F = Δp/Δt',
  thumbnailTitle: 'The Force of a Serve',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 0.057 kg tennis ball leaves the racquet at 58 m/s after 5 ms of contact, and we find the average force on it. We work out the change in momentum, turn milliseconds into seconds, and divide, using Newton’s second law in the form F = Δp/Δt. Then we watch the serve in slow motion and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Force of a Serve', subtitle: 'Impulse, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about one of the fastest tennis serves ever hit. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$-0.02$ N', '$0.02$ N', '$-660$ N', '$660$ N'],
          answer: 3,
          working: '$\\Delta p = 0.057 \\times (58 - 0) = 3.306$ kg·m/s, so $F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{3.306}{0.005} \\approx 660$ N.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'During the two thousand and seven French Open, Venus Williams hit the fastest recorded serve in a premier women\'s match, reaching a speed of 58 metres per second, or 209 kilometres per hour.' },
        { say: 'What was the average force exerted on the 0.057 kilogram tennis ball by Williams\' racquet? Assume that the ball\'s speed just after impact was 58 metres per second, the horizontal velocity before impact is negligible, and that the ball remained in contact with the racquet for five milliseconds.' },
        { say: 'The choices are minus 0.02 newtons, 0.02 newtons, minus 660 newtons, and 660 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [serve, { kind: 'text', id: 'plain', size: 'md', md: 'How hard, on average, does the racquet **push** the ball?' }],
      lines: [
        { say: 'Let us picture it. Before the hit, the ball is almost still, going sideways. Then the racquet pushes it for a tiny moment, and the ball flies off at 58 metres per second. Here it is, slowed down hundreds of times.', show: ['sim', 'sim.velocity'], play: 'sim.hit', playDelay: 0.5, wait: 2.6 },
        { say: 'The push is not steady: it grows and fades. The question asks for the average force, the steady push that would do the same job in the same five milliseconds.', show: 'plain' },
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
          title: 'Force and momentum',
          md: 'Newton’s second law, in terms of momentum: the net force is the **change in momentum** divided by the **time** it takes, $F = \\dfrac{\\Delta p}{\\Delta t}$, where $\\Delta p = m(v - u)$. The product $F\\Delta t$ is the **impulse**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A $2$ kg cart from rest to $3$ m/s in $0.5$ s: $F = \\dfrac{2 \\times 3}{0.5} = 12$ N.' },
      ],
      lines: [
        { say: 'Here is what we need. Newton\'s second law can be written with momentum: the force is the change in momentum divided by the time it takes.', show: 'def' },
        { say: 'The change in momentum is the mass times the final velocity minus the starting velocity. And the force times the time is called the impulse.' },
        { say: 'For example, a two kilogram cart goes from rest to three metres per second in half a second. Its momentum changes by six, and six divided by 0.5 is a force of twelve newtons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the change in momentum, $\\Delta p = m(v - u)$', 'Turn **milliseconds** into seconds', 'Divide: $F = \\dfrac{\\Delta p}{\\Delta t}$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the ball\'s change in momentum.', show: 'plan.0' },
        { say: 'Second, turn the five milliseconds into seconds.', show: 'plan.1' },
        { say: 'Third, divide the change in momentum by the time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Change in momentum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta p = m(v - u)', '= 0.057\\ \\text{kg} \\times (58 - 0)\\ \\text{m/s}', '= \\adj{3.306\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'Step one. The change in momentum is the mass times the final velocity minus the starting velocity.', show: 'm.0' },
        { say: 'The question says the velocity before impact is negligible, so the ball starts from zero, in the direction of the serve. That is 0.057 times 58 minus zero.', show: 'm.1' },
        { say: '3.306 kilogram metres per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Milliseconds',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{ms} = \\dfrac{1}{1000}\\ \\text{s}', '\\Delta t = 5\\ \\text{ms} = 5 \\times 10^{-3}\\ \\text{s} = \\opp{0.005\\ \\text{s}}'] }],
      lines: [
        { say: 'Step two. A millisecond is a thousandth of a second.', show: 'm.0' },
        { say: 'So five milliseconds is five thousandths of a second: 0.005 seconds. Force in newtons needs the time in seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{3.306\\ \\text{kg·m/s}}{0.005\\ \\text{s}}', '= 661\\ \\text{N} \\approx \\good{660\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. The force is the change in momentum divided by the time: 3.306 divided by 0.005.', show: 'm.0' },
        { say: '661 newtons, about 660 newtons, in the direction the ball flies. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [serve, { kind: 'math', id: 'm', size: 'md', lines: ['F\\Delta t = 661 \\times 0.005 = 3.3\\ \\text{kg·m/s} \\qquad v = \\dfrac{3.3}{0.057} = 58\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it the other way round. Push a 0.057 kilogram ball with 661 newtons for five thousandths of a second, and watch the clock, the momentum bar and the speed.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.clock'], play: 'sim.hit', playDelay: 0.4, wait: 3 },
        { say: 'The impulse is 661 times 0.005: 3.3 kilogram metres per second, and that is where the bar stops. Divided by the mass, it gives a speed of 58 metres per second, just the speed of the serve.', show: 'm.0' },
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
            ['$0.02$ N', '$3.306 \\times 0.005$: **multiplied** by the time'],
            ['$-0.02$ N', 'Multiplied, **and** the wrong sign'],
            ['$-660$ N', '$m(u - v)$: the change taken the **wrong way round**'],
            ['$660$ N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.02 newtons multiplies the change in momentum by the time. But force is the change in momentum divided by the time.' },
        { say: 'Minus 660 newtons subtracts the wrong way round: starting velocity minus final. The ball speeds up in the direction of the serve, so the force points that way and is positive.' },
        { say: 'And one more trap that is not on the list: forget to change milliseconds into seconds, and you get 0.66 newtons. A tiny, short push could never throw a ball at 209 kilometres per hour.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 0.20 kg ball at rest is kicked and leaves the foot at 15 m/s. The foot touches it for 10 ms. What is the average force on the ball?',
          choices: ['0.03 N', '3.0 N', '300 N', '−300 N'],
          answer: 2,
          working: '$\\Delta p = 0.20 \\times 15 = 3.0$ kg·m/s and $10$ ms $= 0.010$ s, so $F = \\dfrac{3.0}{0.010} = 300$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A 0.20 kilogram ball at rest is kicked and leaves the foot at fifteen metres per second. The foot touches it for ten milliseconds. What is the average force on the ball? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The change in momentum is 0.20 times fifteen: three kilogram metres per second. Ten milliseconds is 0.010 seconds, and three divided by 0.010 is three hundred newtons. That is choice C. Three newtons forgot to divide by the time, and 0.03 multiplied by it.', show: 'q2.answer' },
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
          items: ['Force from momentum: $F = \\dfrac{\\Delta p}{\\Delta t}$', '$\\Delta p = m(v - u)$: final **minus** starting', 'Time in **seconds**: $5$ ms $= 0.005$ s', 'A short contact time means a **large** force'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The average force is the change in momentum divided by the time.', show: 'sum.0' },
        { say: 'The change in momentum is the mass times the final velocity minus the starting velocity.', show: 'sum.1' },
        { say: 'Always put the time in seconds before you divide.', show: 'sum.2' },
        { say: 'And a short contact time means a large force: 660 newtons from a racquet that touches the ball for five thousandths of a second. For more on impulse, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
