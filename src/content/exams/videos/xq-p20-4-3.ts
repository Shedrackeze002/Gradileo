import type { Explainer, MotionEl } from '@/video/script.ts';

// Exam question for lesson 4.3 (the pendulum): what is g where a pendulum 75.000 cm long has a
// period of 1.7357 s? The question is OpenStax Physics' own worked example, word for word (section
// 5.5, CC BY 4.0). Squaring T = 2π√(L ÷ g) and solving for g gives g = 4π²L ÷ T²
// = 4π² × 0.75000 ÷ 1.7357² = 9.8281 m/s².
//
// The picture (src/video/motion.ts and src/video/path.ts) swings a bob on a string of 0.75 m under
// that value of g, so the swings counted against the clock come out of the length and g, and are
// not typed in: five swings take 8.7 s.

const G = 9.8281;
const L = 0.75;
const DEG = 5;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** The period from `deg` degrees: 2π√(L ÷ g), and the tiny extra for a swing that is not very small. */
const period = (deg: number) => 2 * Math.PI * Math.sqrt(L / G) * (1 + rad(deg) ** 2 / 16);

const swing: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-1, 1],
  path: { g: G, swing: { length: L, angle: 14, room: 1 } },
  bodies: [{ id: 'bob', shape: 'ball', mass: 0.5, label: '', x: L * rad(DEG), width: 0.1, tone: 'adj' }],
  height: 560,
  poster: 'five',
  clips: {
    one: { reset: true, phases: [{ dur: period(DEG) }] },
    five: { reset: true, phases: [{ dur: 5 * period(DEG) }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-4-3',
  lessonId: '',
  exam: {
    lesson: 'p20-4-3',
    source: 'OpenStax, Physics, worked example in section 5.5, Simple Harmonic Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-5-simple-harmonic-motion',
    question: 'What is the acceleration due to gravity in a region where a simple pendulum having a length 75.000 cm has a period of 1.7357 s?',
  },
  title: 'Exam Question: Measure Gravity With a Pendulum',
  thumbnailTitle: 'Measure g With a Pendulum',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a simple pendulum 75.000 cm long has a period of 1.7357 s, and we find the acceleration due to gravity there. We put the length in metres, rearrange T = 2π√(L ÷ g) to make g the subject, and put the numbers in. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Measure g With a Pendulum', subtitle: 'The pendulum, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using a pendulum to measure gravity. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What is the acceleration due to gravity in a region where a simple pendulum having a length 75.000 cm has a period of 1.7357 s?',
          answer: '$9.8281\\ \\text{m/s}^2$',
          working: '$g = \\dfrac{4\\pi^2 L}{T^2} = \\dfrac{4\\pi^2 \\times 0.75000}{1.7357^2} = 9.8281\\ \\text{m/s}^2$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the acceleration due to gravity in a region where a simple pendulum having a length 75.000 centimetres has a period of 1.7357 seconds?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 700,
      left: [swing],
      right: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know its **length** and how long a **swing** takes. How strong is **gravity** here?' }],
      lines: [
        { say: 'Let us picture it. A small bob hangs on a string 75 centimetres long. Pull it to one side and let go. Gravity pulls it back, and it swings to and fro.', show: ['sim', 'sim.length'] },
        { say: 'Someone timed it carefully. Each whole swing, there and back, takes 1.7357 seconds. Watch five of them.', show: ['sim.count', 'sim.clock'], play: 'sim.five', playDelay: 1 },
        { say: 'Stronger gravity would pull the bob back harder, and it would swing faster. So the timing tells us how strong gravity is here. The question asks: what is g?', show: 'plain' },
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
          title: 'The period of a pendulum',
          md: 'For a small swing, a simple pendulum of length $L$ takes a time $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$ for one whole swing. The mass of the bob does not matter. $L$ must be in **metres**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A pendulum $1$ m long, where $g = 9.81$: $T = 2\\pi\\sqrt{1 \\div 9.81} = 2.01$ s.' },
      ],
      lines: [
        { say: 'Here is what we need. For a small swing, the period of a simple pendulum is two pi, times the square root of the length over g.', show: 'def' },
        { say: 'The mass of the bob does not appear, so we do not need it. And the length must be in metres.' },
        { say: 'For example, a pendulum one metre long, where g is 9.81, has a period of 2.01 seconds.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Put the length in **metres**', 'Rearrange the formula to make $g$ the subject', 'Put the numbers in'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, put the length in metres.', show: 'plan.0' },
        { say: 'Second, rearrange the formula, so that g is on its own.', show: 'plan.1' },
        { say: 'Third, put the numbers in.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Metres',
      layout: 'split',
      leftWidth: 700,
      left: [swing],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['L = 75.000\\ \\text{cm}', '= 75.000 \\div 100', '= \\adj{0.75000\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. The string is 75.000 centimetres long.', show: ['sim', 'sim.length', 'm.0'] },
        { say: 'There are a hundred centimetres in a metre, so divide by a hundred.', show: 'm.1' },
        { say: '0.75000 metres. We keep all five figures, because the question measured it that carefully.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['T = 2\\pi\\sqrt{\\dfrac{L}{g}}', 'T^2 = \\dfrac{4\\pi^2 L}{g}', 'g\\,T^2 = 4\\pi^2 L', '\\brand{g = \\dfrac{4\\pi^2 L}{T^2}}'] }],
      lines: [
        { say: 'Step two. We want g on its own. It is stuck inside a square root, so start by squaring both sides.', show: 'm.0' },
        { say: 'T squared is two pi squared, which is four pi squared, times L over g. The square root has gone.', show: 'm.1' },
        { say: 'Multiply both sides by g, to bring it up from the bottom.', show: 'm.2' },
        { say: 'Then divide both sides by T squared. g is four pi squared L, over T squared.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: The numbers',
      layout: 'split',
      leftWidth: 700,
      left: [swing],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4\\pi^2 \\times 0.75000 = 29.609', '1.7357^2 = 3.0127', 'g = 29.609 \\div 3.0127', '= \\good{9.8281\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Step three. On top: four pi squared is 39.478. Times 0.75000 is 29.609.', show: ['sim', 'sim.length', 'm.0'] },
        { say: 'Underneath: 1.7357 squared is 3.0127.', show: 'm.1' },
        { say: 'Divide the top by the bottom.', show: 'm.2' },
        { say: 'g is 9.8281 metres per second squared, to five significant figures, like the measurements.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 700,
      left: [swing],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2\\pi\\sqrt{\\dfrac{0.75000}{9.8281}}', '= 2\\pi \\times 0.27625', '= 1.7357\\ \\text{s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it by working forwards. Put our g back into the formula: two pi times the square root of 0.75000 over 9.8281.', show: ['sim', 'sim.length', 'm.0'] },
        { say: 'The square root is 0.27625. Two pi times that is 1.7357 seconds. That is the period we were given.', show: ['m.1', 'm.2'] },
        { say: 'And watch the pendulum swing under this g. Five swings take five times 1.7357: about 8.7 seconds.', show: ['sim.count', 'sim.clock'], play: 'sim.five', playDelay: 1 },
        { say: 'The answer makes sense too. It is very close to 9.8, the value near Earth\'s surface. Careful timing like this is how g was measured for centuries.' },
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
            ['$982.81\\ \\text{m/s}^2$', 'Left the length in **centimetres**'],
            ['$17.059\\ \\text{m/s}^2$', 'Divided by $T$, not by $T^2$'],
            ['$0.10175\\ \\text{m/s}^2$', 'Fraction **upside down**: $T^2 \\div 4\\pi^2 L$'],
            ['$9.8281\\ \\text{m/s}^2$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '982 comes from leaving the length in centimetres. That would be a hundred times Earth\'s gravity. Always change to metres first.' },
        { say: '17.059 forgets to square the period. Squaring both sides squares T too.' },
        { say: 'And 0.10175 has the fraction upside down. A quick check saves you: gravity on Earth should come out near 9.8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A simple pendulum 1.00 m long has a period of 2.00 s. What is the acceleration due to gravity where it swings?',
          choices: ['$3.14\\ \\text{m/s}^2$', '$9.87\\ \\text{m/s}^2$', '$19.7\\ \\text{m/s}^2$', '$0.101\\ \\text{m/s}^2$'],
          answer: 1,
          working: '$g = \\dfrac{4\\pi^2 L}{T^2} = \\dfrac{4\\pi^2 \\times 1.00}{2.00^2} = \\pi^2 = 9.87\\ \\text{m/s}^2$',
        },
      ],
      lines: [
        { say: 'Your turn. A simple pendulum 1.00 metre long has a period of 2.00 seconds. What is the acceleration due to gravity where it swings? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'g is four pi squared L, over T squared. Four pi squared times one, over two squared, which is four. The fours cancel, leaving pi squared: 9.87 metres per second squared. That is choice B. 19.7 forgets to square the period.', show: 'q2.answer' },
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
          items: ['Pendulum: $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$', 'Square both sides to free $g$: $g = \\dfrac{4\\pi^2 L}{T^2}$', 'Length in **metres**', 'On Earth, $g$ should come out near $9.8\\ \\text{m/s}^2$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period of a simple pendulum is two pi, times the square root of L over g.', show: 'sum.0' },
        { say: 'To find g, square both sides first, then rearrange: g is four pi squared L, over T squared.', show: 'sum.1' },
        { say: 'Put the length in metres.', show: 'sum.2' },
        { say: 'And on Earth, your answer should come out near 9.8. For more on the pendulum, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
