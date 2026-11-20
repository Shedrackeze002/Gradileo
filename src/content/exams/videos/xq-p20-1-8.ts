import type { Explainer, FlightEl } from '@/video/script.ts';

// Exam question for lesson 1.8 (projectile motion): a ball thrown at 40° rises to 10 m; how fast was
// it thrown? The question is OpenStax Physics' own, word for word (Test Prep for section 5.3,
// CC BY 4.0). At the top the vertical velocity is zero, so v₀y² = 2gh: v₀y = √(2 × 9.8 × 10) =
// 14.0 m/s, and v₀ = 14.0 ÷ sin 40° = 21.78 m/s (choice b). The wrong choices are 2gh ÷ sin 40°
// = 304.92 (no square root, sine not squared), its square root 17.46, and 2gh ÷ sin² 40° = 474.37
// (no square root): each leaves out part of the working.
//
// The picture (src/video/flight.ts) throws the ball at 21.78 m/s and 40° with g = 9.8 m/s²: it
// rises to 10.0 m after 1.43 s, and its velocity components are drawn as it flies.

const G = 9.8;
const RAD = Math.PI / 180;
const V0 = 14 / Math.sin(40 * RAD);
const VX = V0 * Math.cos(40 * RAD);
const VY = V0 * Math.sin(40 * RAD);

const throwBall: FlightEl = {
  kind: 'flight',
  id: 'sim',
  view: [-3, 52, 0, 13],
  height: 400,
  gravity: G,
  tick: 10,
  strobe: 0.25,
  velocityScale: 4,
  readout: {},
  bodies: [{ id: 'ball', at: [0, 0], v: [VX, VY], tone: 'theta' }],
  poster: 'rise',
  clips: {
    name: { phases: [{ dur: 4, freeze: true }] },
    rise: { reset: true, phases: [{ dur: VY / G, slow: 2, note: 'Slow motion' }] },
    all: { reset: true, phases: [{ dur: (2 * VY) / G - 0.012, slow: 1.6, note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-8',
  lessonId: '',
  exam: {
    lesson: 'p20-1-8',
    source: 'OpenStax, Physics, Test Prep for section 5.3, Projectile Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-3-projectile-motion',
    question: 'A ball is thrown in the air at an angle of 40°. If the maximum height it reaches is 10 m, what must be its initial speed?',
    choices: ['17.46 m/s', '21.78 m/s', '304.92 m/s', '474.37 m/s'],
  },
  title: 'Exam Question: A Ball Thrown at 40° Rises 10 m. How Fast Was It Thrown?',
  thumbnailTitle: 'Thrown at 40°',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a ball is thrown at 40° and rises to a highest point of 10 m, and we find how fast it was thrown. We use the fact that the vertical velocity is zero at the top to find the vertical part of the launch velocity, then use the sine of 40° to find the whole launch speed. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Thrown at 40°, Up to 10 m', subtitle: 'Projectile motion, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a ball thrown up at an angle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A ball is thrown in the air at an angle of $40^\\circ$. If the maximum height it reaches is 10 m, what must be its initial speed?',
          choices: ['$17.46\\ \\text{m/s}$', '$21.78\\ \\text{m/s}$', '$304.92\\ \\text{m/s}$', '$474.37\\ \\text{m/s}$'],
          answer: 1,
          working: '$v_{0y} = \\sqrt{2 \\times 9.8 \\times 10} = 14.0\\ \\text{m/s}$, and $v_0 = 14.0 \\div \\sin 40^\\circ = 21.78\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A ball is thrown into the air at an angle of forty degrees. If the highest point it reaches is ten metres, what must its initial speed be?' },
        { say: 'The choices are 17.46, 21.78, 304.92, and 474.37 metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [throwBall],
      lines: [
        { say: 'Let us watch it. The ball leaves the ground at forty degrees, climbs to its highest point, ten metres up, and comes back down.', show: ['sim', 'sim.velocity', 'sim.trail'], play: 'sim.all', playDelay: 0.5 },
        { say: 'We know the angle and how high it goes. The question asks: how fast was it thrown?' },
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
          title: 'Projectile motion',
          md: 'Split the launch velocity: $v_{0x} = v_0\\cos\\theta$ and $v_{0y} = v_0\\sin\\theta$. Only the **vertical** part fights gravity, and at the **highest point** the vertical velocity is **zero**: $0 = v_{0y}^2 - 2gh$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'So the height depends only on $v_{0y}$: $\\; v_{0y} = \\sqrt{2gh}$.' },
      ],
      lines: [
        { say: 'Here is what we need. Split the launch velocity into a horizontal part, v nought cos theta, and a vertical part, v nought sine theta.', show: 'def' },
        { say: 'Only the vertical part is slowed by gravity. At the highest point, the ball stops going up for an instant, so its vertical velocity is zero. Then v squared equals u squared plus two a d gives zero equals v nought y squared, minus two g h.' },
        { say: 'So the height tells us the vertical part of the launch velocity: the square root of two g h.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Use the **height** to find the vertical part: $v_{0y} = \\sqrt{2gh}$', 'Use the **angle** to find the whole speed: $v_0 = v_{0y} \\div \\sin\\theta$', 'Check it'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, use the height to find the vertical part of the launch velocity.', show: 'plan.0' },
        { say: 'Second, use the forty degree angle to go from the vertical part to the whole launch speed.', show: 'plan.1' },
        { say: 'Third, check the answer by working forwards.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The vertical part',
      layout: 'center',
      main: [throwBall, { kind: 'math', id: 'm', size: 'md', lines: ['v_{0y} = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 10} = \\sqrt{196} = \\adj{14.0\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step one. Watch the two parts of the velocity as the ball rises. The horizontal part, in blue, stays the same. The vertical part, in orange, shrinks to nothing at the top.', show: ['sim', 'sim.components', 'sim.trail'], play: 'sim.rise', playDelay: 0.3 },
        { say: 'To rise ten metres, the vertical part must start at the square root of two times 9.8 times ten. That is the square root of 196: 14.0 metres per second.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The whole speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['v_{0y} = v_0 \\sin 40^\\circ', 'v_0 = \\dfrac{14.0}{\\sin 40^\\circ} = \\dfrac{14.0}{0.643}', '= \\good{21.78\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step two. The vertical part is the launch speed times sine forty degrees.', show: 'm.0' },
        { say: 'So the launch speed is 14.0 divided by sine forty. Sine forty degrees is 0.643.', show: 'm.1' },
        { say: '14.0 divided by 0.643 is 21.78 metres per second. That is choice B.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [throwBall, { kind: 'math', id: 'm', size: 'md', lines: ['21.78 \\sin 40^\\circ = 14.0, \\quad h = \\dfrac{14.0^2}{2 \\times 9.8} = 10.0\\ \\text{m}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it by working forwards. Throw at 21.78 metres per second: the vertical part is 14.0, and that rises 14.0 squared over two times 9.8, which is ten metres.', show: 'm' },
        { say: 'Watch the picture, thrown at exactly that speed. At the top, the vertical velocity has fallen to zero, and the ball is level with the ten metre mark.', show: ['sim', 'sim.components', 'sim.trail', 'sim.readout'], play: 'sim.rise', playDelay: 0.3 },
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
            ['$474.37$', '$2gh \\div \\sin^2 40^\\circ$: that is $v_0^2$. Forgot the **square root**'],
            ['$304.92$', '$2gh \\div \\sin 40^\\circ$: no square root, and the sine not squared'],
            ['$17.46$', '$\\sqrt{304.92}$: the sine was not squared'],
            ['$21.78$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices. Each one leaves out part of the working.', show: 'traps' },
        { say: '474.37 is the launch speed squared. Someone forgot the square root at the end. Hundreds of metres per second is faster than a bullet, so a size check rules it out.' },
        { say: '304.92 and 17.46 come from dividing by sine forty before taking the square root, without squaring the sine. Find v nought y first, then divide by sine forty. Doing it in that order avoids the trap.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A football is kicked at an angle of $30^\\circ$. It rises to a highest point of 5.0 m. What was its initial speed? Use $g = 9.8\\ \\text{m/s}^2$.',
          choices: ['$9.9\\ \\text{m/s}$', '$14.0\\ \\text{m/s}$', '$196\\ \\text{m/s}$', '$19.8\\ \\text{m/s}$'],
          answer: 3,
          working: '$v_{0y} = \\sqrt{2 \\times 9.8 \\times 5.0} = 9.9\\ \\text{m/s}$; $v_0 = 9.9 \\div \\sin 30^\\circ = 19.8\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A football is kicked at an angle of thirty degrees. It rises to a highest point of 5.0 metres. What was its initial speed? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The vertical part is the square root of two times 9.8 times five: 9.9 metres per second. Divide by sine thirty, which is 0.5, and the launch speed is 19.8 metres per second. That is choice D.', show: 'q2.answer' },
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
          items: ['At the highest point the **vertical** velocity is zero', 'The height gives the vertical part: $v_{0y} = \\sqrt{2gh}$', 'Then $v_0 = v_{0y} \\div \\sin\\theta$', 'Size check: a thrown ball is not faster than a bullet'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. At the highest point, the vertical velocity is zero.', show: 'sum.0' },
        { say: 'So the height gives the vertical part of the launch velocity: the square root of two g h.', show: 'sum.1' },
        { say: 'Then divide by the sine of the angle to get the whole launch speed.', show: 'sum.2' },
        { say: 'And check the size of your answer. For more on projectile motion, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
