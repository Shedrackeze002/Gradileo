import type { Explainer, GravityEl } from '@/video/script.ts';

// Exam question for lesson 2.8 (gravitational field strength): the acceleration due to gravity on
// the surface of Saturn's moon Rhea. The question is OpenStax Physics' own, word for word (Critical
// Thinking, section 7.2, CC BY 4.0). g = GM / r² = (6.67 × 10⁻¹¹ × 2.31 × 10²¹) / (7.63 × 10⁵)² =
// 1.54 × 10¹¹ / 5.82 × 10¹¹ = 0.265 m/s² (choice c). The wrong choices are the same number in the
// wrong unit (m/s), and GM / r without the square (2.02 × 10⁵) in either unit.
//
// The picture (src/video/gravity.ts) draws Rhea to scale with a 1 kg ball on its surface; the field
// strength there is worked out from Newton's law, and a clip carries the ball out to twice the
// radius, where the field is a quarter as strong.

const R = 7.63e5;

const rhea: GravityEl = {
  kind: 'gravity',
  id: 'rhea',
  bodies: [
    { id: 'rhea', mass: 2.31e21, label: 'Rhea', x: 0, radius: R, tone: 'adj' },
    { id: 'ball', mass: 1, label: '1 kg', x: R, size: 10, tone: 'opp' },
  ],
  view: [-1.25 * R, 2.6 * R, -1.15 * R, 1.15 * R],
  figures: 3,
  notation: 'sci',
  pulls: ['ball'],
  label: 'Rhea, a moon of Saturn, to scale',
  height: 440,
  poster: 'out',
  clips: {
    out: { phases: [{ dur: 3, to: { ball: 2 * R } }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-2-8',
  lessonId: '',
  exam: {
    lesson: 'p20-2-8',
    source: 'OpenStax, Physics, Critical Thinking for section 7.2, Newton\'s Law of Universal Gravitation and Einstein\'s Theory of General Relativity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/7-2-newtons-law-of-universal-gravitation-and-einsteins-theory-of-general-relativity',
    question:
      'Rhea, with a radius of 7.63×10⁵ m, is the second-largest moon of the planet Saturn. If the mass of Rhea is 2.31×10²¹ kg, what is the acceleration due to gravity on the surface of this moon?',
    choices: ['2.65×10⁻¹ m/s', '2.02×10⁵ m/s', '2.65×10⁻¹ m/s²', '2.02×10⁵ m/s²'],
  },
  title: 'Exam Question: What Is the Acceleration Due to Gravity on Rhea, a Moon of Saturn?',
  thumbnailTitle: 'Gravity on Rhea',
  thumbnail: 'rhea',
  summary:
    'A real test question, solved one small step at a time: Rhea, a moon of Saturn, has a radius of 7.63 × 10⁵ m and a mass of 2.31 × 10²¹ kg, and we find the acceleration due to gravity on its surface. We use g = GM/r², square the radius, work out GM, and divide, keeping track of the powers of ten. Then we check the answer and look at the traps hidden in the wrong choices, which are all about units and squares.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Gravity on Rhea', subtitle: 'Gravitational field strength, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about gravity on Rhea, one of the moons of Saturn. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Rhea, with a radius of $7.63\\times10^{5}\\ \\text{m}$, is the second-largest moon of the planet Saturn. If the mass of Rhea is $2.31\\times10^{21}\\ \\text{kg}$, what is the acceleration due to gravity on the surface of this moon?',
          choices: ['$2.65\\times10^{-1}\\ \\text{m/s}$', '$2.02\\times10^{5}\\ \\text{m/s}$', '$2.65\\times10^{-1}\\ \\text{m/s}^2$', '$2.02\\times10^{5}\\ \\text{m/s}^2$'],
          answer: 2,
          working: '$g = \\dfrac{GM}{r^2} = \\dfrac{1.54\\times10^{11}}{5.82\\times10^{11}} = 2.65\\times10^{-1}\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Rhea, with a radius of 7.63 times ten to the five metres, is the second largest moon of the planet Saturn. If the mass of Rhea is 2.31 times ten to the twenty one kilograms, what is the acceleration due to gravity on its surface?' },
        { say: 'The choices are 2.65 times ten to the minus one metres per second, 2.02 times ten to the five metres per second, 2.65 times ten to the minus one metres per second squared, and 2.02 times ten to the five metres per second squared. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [rhea, { kind: 'text', id: 'plain', size: 'lg', md: 'Drop something on Rhea: how fast does it **speed up**?' }],
      lines: [
        { say: 'Here is Rhea, drawn to scale, with a one kilogram ball resting on its surface.', show: ['rhea', 'rhea.radius'] },
        { say: 'If you dropped something on Rhea, it would fall and speed up, just as it does on Earth, but much more gently. The question asks: how quickly does it speed up? That is the acceleration due to gravity, g, on Rhea.', show: 'plain' },
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
          title: 'Gravitational field strength',
          md: 'At a distance $r$ from the centre of a body of mass $M$, the acceleration due to gravity is $g = \\dfrac{GM}{r^2}$, with $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$. On the surface, $r$ is the body\'s **radius**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'The unit: $\\text{N/kg}$, which is the same as $\\text{m/s}^2$.' },
      ],
      lines: [
        { say: 'Here is the one formula we need. The acceleration due to gravity is G, times the mass of the moon, divided by the distance from its centre, squared.', show: 'def' },
        { say: 'G is the gravitational constant, 6.67 times ten to the minus eleven. On the surface, the distance from the centre is just the radius.' },
        { say: 'Its unit is newtons per kilogram, which is the same as metres per second squared: an acceleration.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['**Square** the radius: $r^2$', 'Work out $GM$', '**Divide**: $g = GM \\div r^2$, and give the unit'],
        },
      ],
      lines: [
        { say: 'Here is the plan, in three steps. First, square the radius.', show: 'plan.0' },
        { say: 'Second, multiply G by the mass of Rhea.', show: 'plan.1' },
        { say: 'Third, divide the second answer by the first, and write the unit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Square the radius',
      layout: 'split',
      leftWidth: 760,
      left: [rhea],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r^2 = (7.63\\times10^{5})^2', '= 7.63^2 \\times 10^{10}', '= \\adj{5.82\\times10^{11}\\ \\text{m}^2}'] }],
      lines: [
        { say: 'Step one: square the radius, 7.63 times ten to the five metres.', show: ['rhea', 'rhea.radius', 'm.0'] },
        { say: 'Square each part. 7.63 squared, and ten to the five squared, which is ten to the ten.', show: 'm.1' },
        { say: '7.63 squared is 58.2. So r squared is 58.2 times ten to the ten: 5.82 times ten to the eleven square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Work out GM',
      layout: 'split',
      leftWidth: 760,
      left: [rhea],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['GM = 6.67\\times10^{-11}', '\\quad \\times 2.31\\times10^{21}', '= 15.4 \\times 10^{10}', '= \\hyp{1.54\\times10^{11}}'] }],
      lines: [
        { say: 'Step two. Multiply G, 6.67 times ten to the minus eleven, by the mass of Rhea, 2.31 times ten to the twenty one kilograms.', show: ['rhea', 'm.0', 'm.1'] },
        { say: 'Multiply the numbers: 6.67 times 2.31 is 15.4. Add the powers: minus eleven plus twenty one is ten.', show: 'm.2' },
        { say: 'So G M is 1.54 times ten to the eleven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'split',
      leftWidth: 760,
      left: [rhea],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['g = \\dfrac{1.54\\times10^{11}}{5.82\\times10^{11}}', '= 0.265', '= \\good{2.65\\times10^{-1}\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Step three. Divide G M by r squared.', show: ['rhea', 'm.0'] },
        { say: 'The powers of ten are the same, so they cancel. 1.54 divided by 5.82 is 0.265.', show: 'm.1' },
        { say: 'In scientific notation, that is 2.65 times ten to the minus one. And it is an acceleration, so the unit is metres per second squared. That is choice C.', show: ['m.2', 'rhea.g'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 760,
      left: [rhea],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['9.81 \\div 0.265 \\approx 37', '\\text{at } 2r\\text{: } g \\div 4 = 0.066'] }],
      lines: [
        { say: 'Let us check that the size makes sense. On Earth, g is 9.81 metres per second squared. Rhea\'s g is about thirty seven times weaker. Rhea is a small, light moon, so that is what we would expect.', show: ['rhea', 'rhea.g', 'm.0'] },
        { say: 'And the field follows the inverse square law. Carry the ball out to twice the radius, and g falls to a quarter: 0.066 metres per second squared.', show: ['m.1', 'rhea.field'], play: 'rhea.out', playDelay: 0.5 },
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
            ['$2.65\\times10^{-1}\\ \\text{m/s}$', 'Right number, **wrong unit**: that is a speed'],
            ['$2.02\\times10^{5}\\ \\text{m/s}^2$', '$GM \\div r$: forgot to **square** $r$'],
            ['$2.02\\times10^{5}\\ \\text{m/s}$', 'Forgot the square **and** the wrong unit'],
            ['$2.65\\times10^{-1}\\ \\text{m/s}^2$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'The wrong choices test two things: the square, and the unit.', show: 'traps' },
        { say: 'Choice A has the right number, but metres per second is a speed, not an acceleration.' },
        { say: 'Choice D divides G M by r, instead of r squared. 1.54 times ten to the eleven, divided by 7.63 times ten to the five, is 2.02 times ten to the five. That would be twenty thousand times stronger than Earth\'s gravity, on a small moon. A size check rules it out.' },
        { say: 'And choice B makes both mistakes at once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A made-up moon has a radius of $2.0\\times10^{6}\\ \\text{m}$ and a mass of $1.2\\times10^{23}\\ \\text{kg}$. What is the acceleration due to gravity on its surface?',
          choices: ['$4.0\\times10^{6}\\ \\text{m/s}^2$', '$2.0\\ \\text{m/s}$', '$1.0\\ \\text{m/s}^2$', '$2.0\\ \\text{m/s}^2$'],
          answer: 3,
          working: '$g = \\dfrac{6.67\\times10^{-11} \\times 1.2\\times10^{23}}{(2.0\\times10^{6})^2} = \\dfrac{8.0\\times10^{12}}{4.0\\times10^{12}} = 2.0\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A made-up moon has a radius of 2.0 times ten to the six metres, and a mass of 1.2 times ten to the twenty three kilograms. What is the acceleration due to gravity on its surface? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'r squared is 4.0 times ten to the twelve. G M is 8.0 times ten to the twelve. Divide, and g is 2.0 metres per second squared. That is choice D.', show: 'q2.answer' },
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
          items: ['$g = \\dfrac{GM}{r^2}$, with $r$ the radius on the surface', '**Square** the radius: powers of ten double', 'The unit of $g$ is $\\text{m/s}^2$ (or $\\text{N/kg}$)', 'Size check against Earth\'s $9.81\\ \\text{m/s}^2$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The acceleration due to gravity is G M over r squared, and on the surface r is the radius.', show: 'sum.0' },
        { say: 'Square the radius: the number squares, and the power of ten doubles.', show: 'sum.1' },
        { say: 'g is an acceleration, so its unit is metres per second squared, or newtons per kilogram.', show: 'sum.2' },
        { say: 'And check the size against Earth\'s 9.81. For more on gravitational field strength, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
