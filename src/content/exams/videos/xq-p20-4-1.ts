import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for lesson 4.1 (oscillations and the restoring force): the force constant of a
// car's suspension, which settles 1.20 cm when an 80.0 kg person gets in. The question is OpenStax
// Physics' own worked example (section 5.5, CC BY 4.0), word for word except for "like that shown
// in" a photograph we do not show. The springs must hold up the person's weight, 784 N, so by
// Hooke's law k = F ÷ x = 784 ÷ 0.0120 = 6.53 × 10⁴ N/m.
//
// The picture (src/video/motion.ts) hangs the person's 80 kg on a spring of that stiffness (the
// car's springs, which already hold the car up): let down, it bounces and settles 1.2 cm lower,
// with a little hidden damping, as a car does on its shock absorbers.

const G = 9.8;
const M = 80;
const X = 0.012;
const K = (M * G) / X;
const REST = 0.03;
const WEIGHT: MotionForce = { on: 'p', name: 'Weight', n: M * G, tone: 'hyp' };
const DAMP: MotionForce = { on: 'p', name: 'Damping', n: 0, drag: 2400, hidden: true };

const springs: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 0.06],
  lanes: [{ label: 'The car\'s springs' }],
  bodies: [{ id: 'p', shape: 'block', mass: M, label: '80 kg', x: REST, width: 0.012, tone: 'adj' }],
  spring: { on: 'p', k: K, rest: REST, decimals: 3 },
  forceScale: 0.15,
  height: 520,
  poster: 'down',
  clips: {
    down: { reset: true, phases: [{ dur: 1, slow: 3, forces: [WEIGHT, DAMP], note: 'Slow motion' }, { dur: 0.001, set: { p: 0 }, forces: [WEIGHT] }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-4-1',
  lessonId: '',
  exam: {
    lesson: 'p20-4-1',
    source: 'OpenStax, Physics, worked example in section 5.5, Simple Harmonic Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-5-simple-harmonic-motion',
    question: 'What is the force constant for the suspension system of a car that settles 1.20 cm when an 80.0-kg person gets in?',
  },
  title: 'Exam Question: How Stiff Are a Car\'s Springs? Hooke\'s Law',
  thumbnailTitle: 'How Stiff Are Car Springs?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a car settles 1.20 cm when an 80.0 kg person gets in, and we find the force constant of its suspension. We find the extra force the springs must give, the person\'s weight, convert the distance to metres, and use Hooke\'s law, F = kx. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Stiff Are Car Springs?', subtitle: 'Hooke\'s law and the restoring force, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the springs in a car. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What is the force constant for the suspension system of a car that settles 1.20 cm when an 80.0-kg person gets in?',
          answer: '$6.53 \\times 10^{4}$ N/m',
          working: '$F = mg = 80.0 \\times 9.80 = 784$ N and $x = 0.0120$ m, so $k = \\dfrac{F}{x} = 6.53 \\times 10^4$ N/m.',
        },
      ],
      lines: [
        { say: 'Here is the question, as it was printed.', show: 'q' },
        { say: 'What is the force constant for the suspension system of a car that settles 1.20 centimetres when an 80.0 kilogram person gets in?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [springs, { kind: 'text', id: 'plain', size: 'lg', md: 'An extra **80 kg** sinks the car **1.20 cm**. How **stiff**?' }],
      lines: [
        { say: 'Let us picture it, in slow motion. The car\'s springs already hold the car up. A person gets in, and the springs squash a little more. The car bounces, then settles 1.20 centimetres lower.', show: ['sim', 'sim.extension'], play: 'sim.down', playDelay: 0.5 },
        { say: 'A stiff spring would hardly move. A soft one would sink a long way. The force constant k tells us how stiff the springs are.' },
        { say: 'The question asks: what is k?', show: 'plain' },
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
          title: 'Hooke\'s law',
          md: 'A spring pushed or pulled a distance $x$ from where it rests gives a **restoring force** back towards that place: $F = -kx$. The **force constant** $k$, in N/m, is the force for each metre: $k = \\dfrac{F}{x}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$20$ N stretches a spring $0.10$ m: $k = 20 \\div 0.10 = 200$ N/m.' },
      ],
      lines: [
        { say: 'Here is what we need. When a spring is pushed or pulled away from where it rests, it pushes back. That is the restoring force: F equals minus k x.', show: 'def' },
        { say: 'The minus sign only says the force points back, the opposite way to x. The force constant k is the size of the force for each metre: k is F over x.' },
        { say: 'For example, if twenty newtons stretches a spring by 0.10 metres, k is 200 newtons per metre.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the extra **force**: the person\'s weight, $mg$', 'Put the distance in **metres**', 'Use Hooke\'s law: $k = F \\div x$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the extra force the springs must give: the person\'s weight.', show: 'plan.0' },
        { say: 'Second, put the distance in metres.', show: 'plan.1' },
        { say: 'Third, divide the force by the distance.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The force',
      layout: 'split',
      leftWidth: 700,
      left: [springs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F = mg', '= 80.0 \\times 9.80', '= \\adj{784\\ \\text{N}}'] }],
      lines: [
        { say: 'Step one. Once the car settles, the springs hold up the person\'s weight as well. That extra force is m g.', show: ['sim', 'sim.extension', 'm.0'], play: 'sim.down', playDelay: 0.3 },
        { say: '80.0 kilograms, times 9.80.', show: 'm.1' },
        { say: '784 newtons. Look at the arrows when it settles: the spring\'s push up matches the weight down.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Metres',
      layout: 'split',
      leftWidth: 700,
      left: [springs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 1.20\\ \\text{cm}', '= 1.20 \\div 100', '= \\opp{0.0120\\ \\text{m}}'] }],
      lines: [
        { say: 'Step two. The springs squash by 1.20 centimetres. N per metre needs metres.', show: ['sim', 'sim.extension', 'm.0'], play: 'sim.down', playDelay: 0.3 },
        { say: 'There are a hundred centimetres in a metre, so divide by a hundred.', show: 'm.1' },
        { say: '0.0120 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Hooke\'s law',
      layout: 'split',
      leftWidth: 700,
      left: [springs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\dfrac{F}{x} = \\dfrac{784}{0.0120}', '= 65\\,333', '= \\good{6.53 \\times 10^{4}\\ \\text{N/m}}'] }],
      lines: [
        { say: 'Step three. k is the force divided by the distance: 784 newtons over 0.0120 metres.', show: ['sim', 'sim.extension', 'm.0'], play: 'sim.down', playDelay: 0.3 },
        { say: 'That is about 65,333.', show: 'm.1' },
        { say: 'To three significant figures, the force constant is 6.53 times ten to the four newtons per metre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6.53 \\times 10^{4} \\times 0.0120 = 784\\ \\text{N}\\ \\checkmark', '\\text{65 000 N to squash it 1 m: very stiff, as a car\'s should be}'] }],
      lines: [
        { say: 'Let us check it by working forwards. k times x: 6.53 times ten to the four, times 0.0120, is 784 newtons. That is the person\'s weight.', show: 'm.0' },
        { say: 'And the size makes sense. It would take 65,000 newtons to squash these springs by a whole metre. Car springs have to be stiff, to carry a heavy car without sinking to the road.', show: 'm.1' },
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
            ['653 N/m', '$784 \\div 1.20$: left the distance in **centimetres**'],
            ['6670 N/m', '$80.0 \\div 0.0120$: used the **mass**, not the **weight**'],
            ['$-6.53 \\times 10^4$ N/m', 'The minus in $F = -kx$ is direction; $k$ is **positive**'],
            ['$6.53 \\times 10^4$ N/m', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '653 newtons per metre leaves the distance in centimetres. Always change to metres first.' },
        { say: '6,670 divides the mass by the distance. The springs push against a force, the weight, so multiply by g first.' },
        { say: 'And the minus sign in Hooke\'s law only gives the direction of the force. The force constant itself is always positive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 0.50 kg mass hung from a spring stretches it by 4.0 cm. What is the force constant of the spring? Use $g = 9.8\\ \\text{m/s}^2$.',
          choices: ['12.5 N/m', '0.20 N/m', '1.2 N/m', '120 N/m'],
          answer: 3,
          working: '$F = 0.50 \\times 9.8 = 4.9$ N and $x = 0.040$ m, so $k = 4.9 \\div 0.040 = 122.5 \\approx 120$ N/m.',
        },
      ],
      lines: [
        { say: 'Your turn. A 0.50 kilogram mass hung from a spring stretches it by 4.0 centimetres. What is the force constant of the spring? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The weight is 0.50 times 9.8: 4.9 newtons. The stretch is 0.040 metres. 4.9 divided by 0.040 is about 120 newtons per metre. That is choice D.', show: 'q2.answer' },
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
          items: ['Hooke\'s law: $F = -kx$, a **restoring** force', 'Force constant: $k = F \\div x$, in N/m', 'A hanging load: $F$ is its **weight**, $mg$', 'Distance in **metres**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Hooke\'s law: F equals minus k x, a force that pulls back towards where the spring rests.', show: 'sum.0' },
        { say: 'The force constant is the force divided by the distance, in newtons per metre.', show: 'sum.1' },
        { say: 'For a load that hangs or sits on a spring, the force is its weight, m g.', show: 'sum.2' },
        { say: 'And always put the distance in metres. For more on oscillations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
