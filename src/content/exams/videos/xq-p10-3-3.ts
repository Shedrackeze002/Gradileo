import type { Explainer, MotionEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 3.3 (gravitational potential energy): a child who weighs 300 N
// is at the top of a slide 3 m high; how much potential energy does the child have there? The
// question is OpenStax Physics' own, word for word (Practice Problems, section 9.2, CC BY 4.0).
// The weight is already mg, so PE = mgh = 300 × 3 = 900 J (choice d).
//
// The picture (src/video/motion.ts and src/video/path.ts) slides a 30 kg child (300 N with the
// question's g = 10 m/s²) down a smooth slide 3 m high, and the energy bars are measured from the
// motion: 900 J of potential energy at the top turns into kinetic energy on the way down.

const slide: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 470,
  path: { g: 10, points: [[0, 3], [6, 0], [9, 0]] },
  bodies: [{ id: 'child', shape: 'ball', mass: 30, x: 0, width: 0.7, label: '300 N', tone: 'adj' }],
  energy: { max: 1000, bars: ['potential', 'kinetic', 'total'] },
  velocityScale: 14,
  poster: 'down',
  clips: {
    hold: { reset: true, phases: [{ dur: 1, freeze: true }] },
    down: { reset: true, phases: [{ dur: 1.75, slow: 2, note: 'Slow motion' }] },
  },
};

const QUESTION =
  'A child slides down a playground slide. If the slide is 3 m high and the child weighs 300 N, how much potential energy does the child have at the top of the slide? (Round g to 10 m/s².)';
const CHOICES = ['0 J', '100 J', '300 J', '900 J'];

const video: Explainer = {
  id: 'xq-p10-3-3',
  lessonId: '',
  exam: {
    lesson: 'p10-3-3',
    source: 'OpenStax, Physics, Practice Problem for section 9.2, Mechanical Energy and Conservation of Energy',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-2-mechanical-energy-and-conservation-of-energy',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: At the Top of the Slide. Gravitational Potential Energy',
  thumbnailTitle: 'At the Top of the Slide',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a child who weighs 300 N sits at the top of a slide 3 m high, and we find the child\'s gravitational potential energy. We notice that the weight is already mg, so the energy is simply the weight times the height. Then we check the answer by watching the energy turn into motion on the way down, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'At the Top of the Slide', subtitle: 'Gravitational potential energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a child on a playground slide. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A child slides down a playground slide. If the slide is 3 m high and the child weighs 300 N, how much potential energy does the child have at the top of the slide? (Round $g$ to $10\\ \\text{m/s}^2$.)',
          choices: CHOICES,
          answer: 3,
          working: 'The weight is already $mg = 300$ N, so $E_p = mgh = 300 \\times 3 = 900$ J.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A child slides down a playground slide. If the slide is three metres high, and the child weighs 300 newtons, how much potential energy does the child have at the top of the slide? Round g to ten metres per second squared.' },
        { say: 'The choices are zero, a hundred, three hundred, and nine hundred joules. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [slide],
      lines: [
        { say: 'Let us picture it. Here is the child at the top of the slide, three metres above the ground.', show: 'sim', play: 'sim.hold', playDelay: 0.5 },
        { say: 'Let go, and the child whooshes down. That speed had to come from somewhere: it came from the energy stored by being high up.', show: 'sim.velocity', play: 'sim.down' },
        { say: 'The question asks: how much energy is stored at the top, before the child sets off?' },
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
          title: 'Gravitational potential energy',
          md: '**Gravitational potential energy** is energy stored by being **raised**: $E_p = mgh$. Here $mg$ is the object\'s **weight**, in newtons, and $h$ is its **height** above the ground, in metres. So $E_p$ is the **weight times the height**, in joules.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A $20$ N bag on a shelf $2$ m up: $E_p = 20 \\times 2 = 40$ J.' },
      ],
      lines: [
        { say: 'Here is what we need. Gravitational potential energy is the energy an object stores by being raised. It is m g h: mass, times g, times height.', show: 'def' },
        { say: 'Notice that m times g is the object\'s weight, in newtons. So the potential energy is just the weight times the height.' },
        { say: 'For example, a twenty newton bag on a shelf two metres up stores twenty times two: forty joules.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Spot that the **weight** is already $mg$', 'Find the **height**', 'Multiply: weight $\\times$ height'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, spot that the question gives the weight, which is already m times g.', show: 'plan.0' },
        { say: 'Second, find the height.', show: 'plan.1' },
        { say: 'Third, multiply the weight by the height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The weight is mg',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['mg = \\opp{300\\ \\text{N}}', 'm = \\dfrac{300}{10} = 30\\ \\text{kg}'] }],
      lines: [
        { say: 'Step one. The question tells us the child weighs 300 newtons. Weight is m times g, so m g is already 300 newtons.', show: 'm.0', focus: 'm.0' },
        { say: 'We do not even need the mass. But if you want it, 300 divided by ten is thirty kilograms. That is why the question gave us g.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The height',
      layout: 'center',
      main: [slide, { kind: 'text', id: 't', size: 'md', md: 'At the top, $h = 3$ m above the ground.' }],
      lines: [
        { say: 'Step two. At the top of the slide, the child is three metres above the ground. Watch the potential energy bar: it is full at the top.', show: ['sim', 'sim.energy', 't'], play: 'sim.hold', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 3: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E_p = mgh = 300\\ \\text{N} \\times 3\\ \\text{m}', '= \\good{900\\ \\text{J}}'] }],
      lines: [
        { say: 'Step three. The potential energy is the weight times the height: 300 newtons times three metres.', show: 'm.0' },
        { say: '900 joules. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [slide],
      lines: [
        { say: 'Let us check. The top bar starts at 900 joules. As the child slides down, watch the potential energy turn into kinetic energy.', show: ['sim', 'sim.energy', 'sim.velocity'], play: 'sim.down', playDelay: 0.3 },
        { say: 'At the bottom, the height is zero, so all 900 joules have become energy of motion, and the total never changed. The bars agree with our answer.' },
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
            ['$0$ J', 'That is the **kinetic** energy at the top, or the **potential** energy at the bottom'],
            ['$100$ J', '$300 \\div 3$: **divided** instead of multiplying'],
            ['$300$ J', 'Just the **weight**: forgot the **height**'],
            ['$900$ J', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Zero joules is the kinetic energy at the top, where the child is not moving yet, or the potential energy at the bottom. The question asks for potential energy at the top.' },
        { say: 'A hundred joules divides the weight by the height. Potential energy is weight times height.' },
        { say: 'And three hundred joules is just the weight. It forgets the height.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 50 kg hiker climbs 20 m up a hill. Using g = 9.8 N/kg, how much gravitational potential energy does she gain?',
          choices: ['9800 J', '1000 J', '490 J', '98 J'],
          answer: 0,
          working: '$E_p = mgh = 50 \\times 9.8 \\times 20 = 9800$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. A fifty kilogram hiker climbs twenty metres up a hill. Using g equals 9.8 newtons per kilogram, how much gravitational potential energy does she gain? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'This time we are given the mass, so we need g. Fifty times 9.8 times twenty is 9,800 joules. That is choice A. A thousand forgot g, and 490 forgot the height.', show: 'q2.answer' },
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
          items: ['$E_p = mgh$, in **joules**', '$mg$ is the **weight**: $E_p =$ weight $\\times$ height', 'Given the **mass**? Multiply by $g$ too', 'On the way down, $E_p$ turns into $E_k$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Gravitational potential energy is m g h, in joules.', show: 'sum.0' },
        { say: 'm g is the weight, so the potential energy is the weight times the height.', show: 'sum.1' },
        { say: 'If you are given the mass instead, multiply by g as well.', show: 'sum.2' },
        { say: 'And on the way down, potential energy turns into kinetic energy. For more on potential energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
