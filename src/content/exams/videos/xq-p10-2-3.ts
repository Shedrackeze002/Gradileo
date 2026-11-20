import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 2.3 (Newton's second law): a net force of 51 N acts on a 240 kg
// lawn mower; what is its acceleration? The question is OpenStax Physics' own worked example, word
// for word (section 4.3, CC BY 4.0). a = F ÷ m = 51 ÷ 240 = 0.2125, which the book gives as
// 0.21 m/s².
//
// The picture (src/video/motion.ts) puts the 51 N net force on a 240 kg mower for 4 s, so its
// velocity graph is a straight line that climbs 0.21 m/s every second.

const NET: MotionForce = { on: 'mower', name: 'Net force', n: 51, tone: 'opp' };

const mower: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 4],
  height: 470,
  lanes: [{ surface: 'rough', label: 'A 240 kg lawn mower' }],
  bodies: [{ id: 'mower', shape: 'cart', mass: 240, label: 'mower', x: 0.55, width: 0.7, tone: 'adj' }],
  graph: { of: ['mower'], seconds: 4, max: 1 },
  forceScale: 2.6,
  velocityScale: 160,
  velocityDecimals: 2,
  poster: 'ready',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [NET] }] },
    go: { reset: true, phases: [{ dur: 4, forces: [NET] }] },
  },
};

const QUESTION =
  'Suppose that the net external force (push minus friction) exerted on a lawn mower is 51 N parallel to the ground. The mass of the mower is 240 kg. What is its acceleration?';

const video: Explainer = {
  id: 'xq-p10-2-3',
  lessonId: '',
  exam: {
    lesson: 'p10-2-3',
    source: 'OpenStax, Physics, worked example in section 4.3, Newton\'s Second Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion',
    question: QUESTION,
  },
  title: 'Exam Question: Pushing a Lawn Mower. Newton\'s Second Law, F = ma',
  thumbnailTitle: 'Pushing a Lawn Mower',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a net force of 51 N acts on a 240 kg lawn mower, and we find its acceleration. We rearrange Newton\'s second law, F = ma, to get the acceleration on its own, and divide the force by the mass. Then we check the answer by working forwards and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Pushing a Lawn Mower', subtitle: 'Newton\'s second law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about pushing a heavy lawn mower. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$0.21\\ \\text{m/s}^2$',
          working: '$a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{51}{240} = 0.21\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose that the net external force, push minus friction, exerted on a lawn mower is 51 newtons, parallel to the ground. The mass of the mower is 240 kilograms. What is its acceleration?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [mower, { kind: 'text', id: 'plain', size: 'lg', md: 'How much **faster** does it go **each second**?' }],
      lines: [
        { say: 'Let us picture it. Here is the mower, with the net force of 51 newtons pushing it forwards. Watch it speed up, and watch the graph of its velocity.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.graph'], play: 'sim.go', playDelay: 0.5 },
        { say: 'It speeds up steadily. The question asks: by how much does its velocity grow each second?', show: 'plain' },
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
          title: 'Newton\'s second law',
          md: 'A **net force** makes an object **accelerate**: $F_{\\text{net}} = ma$. A **bigger force** gives a bigger acceleration, and a **bigger mass** gives a smaller one. With $F$ in newtons and $m$ in kilograms, $a$ is in **m/s²**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$10$ N on $2$ kg: $a = 10 \\div 2 = 5\\ \\text{m/s}^2$.' },
      ],
      lines: [
        { say: 'Here is what we need: Newton\'s second law. A net force makes an object accelerate. Net force equals mass times acceleration.', show: 'def' },
        { say: 'A bigger force gives a bigger acceleration, and a bigger mass gives a smaller one. With newtons and kilograms, the acceleration comes out in metres per second squared.' },
        { say: 'For example, ten newtons on two kilograms gives ten divided by two: five metres per second squared.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Pick out the **net force** and the **mass**', 'Rearrange $F = ma$ to get $a$ on its own', 'Divide'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, pick out the net force and the mass from the question.', show: 'plan.0' },
        { say: 'Second, rearrange F equals m a, so that the acceleration is on its own.', show: 'plan.1' },
        { say: 'Third, divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Force and mass',
      layout: 'center',
      main: [mower, { kind: 'math', id: 'm', size: 'md', lines: ['F_{\\text{net}} = \\opp{51\\ \\text{N}} \\qquad m = \\adj{240\\ \\text{kg}}'] }],
      lines: [
        { say: 'Step one. The net force is 51 newtons. The question has already taken the friction away from the push for us, so we can use it as it is.', show: ['sim', 'm.0'], play: 'sim.ready', playDelay: 0.3 },
        { say: 'The mass is 240 kilograms. That is a heavy mower, the kind you might ride on.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F_{\\text{net}} = m\\,a', '\\dfrac{F_{\\text{net}}}{m} = \\dfrac{m\\,a}{m}', 'a = \\dfrac{F_{\\text{net}}}{m}'] }],
      lines: [
        { say: 'Step two. Start from net force equals mass times acceleration.', show: 'm.0' },
        { say: 'Divide both sides by the mass. On the right, the masses cancel.', show: 'm.1' },
        { say: 'So the acceleration is the net force divided by the mass.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a = \\dfrac{51\\ \\text{N}}{240\\ \\text{kg}} = 0.2125', '\\approx \\good{0.21\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Step three. 51 newtons divided by 240 kilograms is 0.2125.', show: 'm.0' },
        { say: 'To two significant figures, like the 51 newtons, that is 0.21 metres per second squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [mower, { kind: 'math', id: 'm', size: 'md', lines: ['240 \\times 0.2125 = 51\\ \\text{N}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working forwards. Mass times acceleration: 240 times 0.2125 is 51 newtons, the net force we started with.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.graph', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'And look at the graph. Each second, the velocity climbs by about 0.21 metres per second. After four seconds, the mower is moving at only 0.85 metres per second, a slow walk. That is what you would expect from a fairly small force on a very heavy mower.' },
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
            ['$12{,}240$', '$51 \\times 240$: **multiplied** the force by the mass'],
            ['$4.7$', '$240 \\div 51$: mass over force, **upside down**'],
            ['$51\\ \\text{m/s}^2$', 'Took the **force** as the acceleration'],
            ['$0.21\\ \\text{m/s}^2$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '12,240 multiplies the force by the mass. The units would be newton kilograms, which is not an acceleration.' },
        { say: '4.7 divides the mass by the force, upside down. A bigger mass should give a smaller acceleration, so the mass goes underneath.' },
        { say: 'And 51 forgets the mass altogether. A force is not an acceleration: the same force moves a toy car far faster than a mower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A net force of 12 N acts on a 4.0 kg trolley. What is its acceleration?',
          choices: ['$48\\ \\text{m/s}^2$', '$0.33\\ \\text{m/s}^2$', '$3.0\\ \\text{m/s}^2$', '$16\\ \\text{m/s}^2$'],
          answer: 2,
          working: '$a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{12}{4.0} = 3.0\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A net force of twelve newtons acts on a 4.0 kilogram trolley. What is its acceleration? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Acceleration is force over mass: twelve divided by 4.0 is 3.0 metres per second squared. That is choice C. 48 multiplied, and 0.33 is upside down.', show: 'q2.answer' },
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
          items: ['Newton\'s second law: $F_{\\text{net}} = ma$', 'For the acceleration: $a = \\dfrac{F_{\\text{net}}}{m}$', 'Use the **net** force: push minus friction', 'Check: mass $\\times$ acceleration gives the force'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Net force equals mass times acceleration.', show: 'sum.0' },
        { say: 'To find the acceleration, divide the net force by the mass.', show: 'sum.1' },
        { say: 'Use the net force: what is left of the push after friction.', show: 'sum.2' },
        { say: 'And check: mass times acceleration should give back the force. For more on Newton\'s second law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
