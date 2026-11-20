import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 2.4 (mass, weight and g): an object weighs 294 N on Earth; what
// does it weigh on the Moon? The question is OpenStax Physics' own, word for word (Test Prep,
// section 4.3, CC BY 4.0). Its mass is 294 ÷ 9.80 = 30.0 kg, and with the book's g = 1.67 N/kg on
// the Moon its weight there is 30.0 × 1.67 = 50.1 N (choice a).
//
// The picture (src/video/motion.ts) holds the same 30 kg on Earth and on the Moon, draws the two
// weights, and lets both go for 0.8 s: the Moon's smaller pull makes it fall more slowly.

const weight = (on: string, n: number): MotionForce => ({ on, name: 'Weight', n, tone: 'hyp' });
const FORCES = [weight('earth', 294), weight('moon', 30 * 1.67)];

const worlds: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 6],
  height: 470,
  lanes: [{ label: 'On Earth' }, { label: 'On the Moon' }],
  bodies: [
    { id: 'earth', shape: 'block', mass: 30, label: '30 kg', x: 0, width: 1.3, lane: 0, tone: 'adj' },
    { id: 'moon', shape: 'block', mass: 30, label: '30 kg', x: 0, width: 1.3, lane: 1, tone: 'opp' },
  ],
  forceScale: 0.42,
  velocityScale: 9,
  poster: 'weigh',
  clips: {
    weigh: { phases: [{ dur: 1, freeze: true, forces: FORCES }] },
    drop: { reset: true, phases: [{ dur: 0.8, forces: FORCES }] },
  },
};

const QUESTION = 'An object weighs 294 N on Earth. What is its weight on the moon?';
const CHOICES = ['50.1 N', '30.0 N', '249 N', '1461 N'];

const video: Explainer = {
  id: 'xq-p10-2-4',
  lessonId: '',
  exam: {
    lesson: 'p10-2-4',
    source: 'OpenStax, Physics, Test Prep for section 4.3, Newton\'s Second Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Your Weight on the Moon. Mass, Weight and g',
  thumbnailTitle: 'Weight on the Moon',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an object weighs 294 N on Earth, and we find its weight on the Moon. We use W = mg twice: first to find the object\'s mass, which is the same everywhere, and then to find its weight in the Moon\'s weaker gravity. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Weight on the Moon', subtitle: 'Mass, weight and g, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about how much something weighs on the Moon. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 0,
          working: '$m = \\dfrac{W}{g} = \\dfrac{294}{9.80} = 30.0$ kg, so on the Moon $W = mg = 30.0 \\times 1.67 = 50.1$ N.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'An object weighs 294 newtons on Earth. What is its weight on the Moon?' },
        { say: 'The choices are 50.1 newtons, 30.0 newtons, 249 newtons, and 1,461 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [worlds, { kind: 'text', id: 'plain', size: 'lg', md: 'The **same object**, a **weaker pull**: how much does it weigh?' }],
      lines: [
        { say: 'Let us picture it. Here is the same object on Earth, and on the Moon. The arrows show its weight: how hard each world pulls it down.', show: 'sim', play: 'sim.weigh', playDelay: 0.5 },
        { say: 'Let both go, and the one on the Moon falls much more slowly. The Moon pulls more weakly.', show: ['sim.velocity', 'sim.clock'], play: 'sim.drop' },
        { say: 'The question asks: how big is the weight arrow on the Moon?', show: 'plain' },
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
          title: 'Mass and weight',
          md: '**Mass** is the amount of matter, in **kg**: it is the **same everywhere**. **Weight** is the pull of gravity, in **N**: $W = mg$. The field strength $g$ is $9.80$ N/kg on **Earth** and $1.67$ N/kg on the **Moon**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$2$ kg on Earth: $W = 2 \\times 9.80 = 19.6$ N.' },
      ],
      lines: [
        { say: 'Here is what we need. Mass is the amount of matter in an object, measured in kilograms. It is the same wherever the object goes.', show: 'def' },
        { say: 'Weight is the pull of gravity on it, measured in newtons. Weight equals mass times g, the gravitational field strength. On Earth, g is 9.80 newtons per kilogram. On the Moon, it is only 1.67, the value this textbook uses.' },
        { say: 'For example, two kilograms on Earth weighs two times 9.80: 19.6 newtons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **mass** from the Earth weight: $m = W \\div g$', 'The mass is the **same** on the Moon', 'Find the **Moon weight**: $W = m \\times g_{\\text{Moon}}$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, use the weight on Earth to find the object\'s mass.', show: 'plan.0' },
        { say: 'Second, remember that the mass does not change when the object goes to the Moon.', show: 'plan.1' },
        { say: 'Third, multiply that mass by the Moon\'s g to get the weight there.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mass',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['W = mg \\;\\Rightarrow\\; m = \\dfrac{W}{g}', 'm = \\dfrac{294\\ \\text{N}}{9.80\\ \\text{N/kg}} = \\adj{30.0\\ \\text{kg}}'] }],
      lines: [
        { say: 'Step one. Weight equals mass times g, so the mass is the weight divided by g.', show: 'm.0' },
        { say: '294 newtons divided by 9.80 newtons per kilogram is 30.0 kilograms.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The same mass',
      layout: 'center',
      main: [worlds, { kind: 'text', id: 't', size: 'md', md: 'Still **30.0 kg** on the Moon: the same amount of matter.' }],
      lines: [
        { say: 'Step two. Take the object to the Moon. Nothing has been added to it or taken away, so its mass is still 30.0 kilograms.', show: ['sim', 't'], play: 'sim.weigh', playDelay: 0.3 },
        { say: 'What changes is the pull on it. That is why the two weight arrows are different lengths.' },
      ],
    },
    {
      chapter: 'Step 3: The weight on the Moon',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['W_{\\text{Moon}} = m \\times g_{\\text{Moon}} = 30.0\\ \\text{kg} \\times 1.67\\ \\text{N/kg}', '= \\good{50.1\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. On the Moon, the weight is the mass times the Moon\'s g: 30.0 kilograms times 1.67 newtons per kilogram.', show: 'm.0' },
        { say: '50.1 newtons. That is choice A.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [worlds, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{294}{50.1} \\approx 5.9 \\qquad \\dfrac{9.80}{1.67} \\approx 5.9\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The Moon\'s g is about a sixth of Earth\'s, so everything should weigh about a sixth as much there.', show: ['sim', 'm.0'], play: 'sim.weigh', playDelay: 0.3 },
        { say: '294 newtons is 5.9 times 50.1 newtons, and 9.80 is 5.9 times 1.67. The weight went down by exactly the same factor as g, just as it should.' },
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
            ['$30.0$ N', 'That is the **mass**, $30.0$ **kg**, not a weight'],
            ['$249$ N', 'Barely lighter: the Moon pulls about **a sixth** as hard'],
            ['$1461$ N', '**Heavier** than on Earth: the pull is **weaker**'],
            ['$50.1$ N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '30.0 stops half way. Thirty is the mass, in kilograms. It is not a weight, and it is not in newtons.' },
        { say: '249 newtons is only a little lighter than on Earth. But the Moon pulls about a sixth as hard, so the weight must drop to about a sixth.' },
        { say: 'And 1,461 newtons is heavier than on Earth, which cannot be right when the pull is weaker.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rover has a mass of 12 kg. On Mars, g = 3.7 N/kg. What is the rover\'s weight on Mars?',
          choices: ['118 N', '44 N', '3.2 N', '12 N'],
          answer: 1,
          working: '$W = mg = 12 \\times 3.7 = 44$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A rover has a mass of twelve kilograms. On Mars, g is 3.7 newtons per kilogram. What is the rover\'s weight on Mars? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Weight is mass times g: twelve times 3.7 is 44 newtons. That is choice B. 118 used Earth\'s g, and twelve newtons mixes up the mass with the weight.', show: 'q2.answer' },
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
          items: ['Weight: $W = mg$, in **newtons**', 'Mass, in kg, is the **same everywhere**', 'Find the mass first: $m = W \\div g$', '$g$: $9.80$ N/kg on Earth, $1.67$ N/kg on the Moon'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Weight is mass times g, measured in newtons.', show: 'sum.0' },
        { say: 'Mass, in kilograms, is the same everywhere.', show: 'sum.1' },
        { say: 'So to move a weight to another world, find the mass first.', show: 'sum.2' },
        { say: 'And g is 9.80 newtons per kilogram on Earth, and 1.67 on the Moon. For more on mass and weight, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
