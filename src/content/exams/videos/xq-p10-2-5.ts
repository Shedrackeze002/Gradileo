import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 2.5 (friction and air resistance): a skydiver reaches terminal
// velocity; does that mean he becomes weightless? The question is OpenStax Physics' own (Test Prep,
// section 4.3, CC BY 4.0), word for word except that the heading "True or False", printed before
// it, is left out, since the choices are yes and no. The answer is no (choice b): at terminal
// velocity the air resistance balances the weight, so the net force is zero, but the weight is
// still there.
//
// The picture (src/video/motion.ts) is the 70 kg skydiver of the lesson's explainer: 686 N of
// weight and 13.72 N of air resistance for each metre per second, so the terminal velocity is
// 50 m/s. The fall is worked out from those forces, so the air resistance arrow grows with speed.

const G = 9.8;
const W = 70 * G;
const DRAG = W / 50;
const weight: MotionForce = { on: 'diver', name: 'Weight', n: W, tone: 'hyp' };
const air: MotionForce = { on: 'diver', name: 'Air resistance', n: 0, drag: DRAG, tone: 'bad' };

/** From the jump: the first three seconds as they happen, then 33 more, four times as fast. */
const fall: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 2100],
  height: 470,
  lanes: [{ label: 'A skydiver of mass 70 kg' }],
  bodies: [{ id: 'diver', shape: 'block', mass: 70, x: 0, width: 600, tone: 'adj' }],
  graph: { of: ['diver'], seconds: 36, max: 60 },
  forceScale: 0.1,
  velocityScale: 1.3,
  poster: 'jump',
  clips: {
    ready: { reset: true, phases: [{ dur: 1, freeze: true, forces: [weight] }] },
    jump: { reset: true, phases: [{ dur: 3, forces: [weight, air] }, { dur: 33, slow: 0.25, note: 'Four times as fast', forces: [weight, air] }] },
  },
};

/** Already at terminal velocity: two forces, the same size, and a speed that does not change. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 320],
  height: 400,
  lanes: [{ label: 'At terminal velocity: 50 m/s' }],
  bodies: [{ id: 'diver', shape: 'block', mass: 70, x: 60, v: 50, width: 90, tone: 'adj' }],
  graph: { of: ['diver'], seconds: 3, max: 60 },
  forceScale: 0.1,
  velocityScale: 1.3,
  poster: 'forces',
  clips: {
    forces: { phases: [{ dur: 1, freeze: true, forces: [weight, air] }] },
    go: { reset: true, phases: [{ dur: 3, forces: [weight, air] }] },
  },
};

const QUESTION =
  'A skydiver initially accelerates in his jump. Later, he achieves a state of constant velocity called terminal velocity. Does this mean the skydiver becomes weightless?';
const CHOICES = ['Yes', 'No'];

const video: Explainer = {
  id: 'xq-p10-2-5',
  lessonId: '',
  exam: {
    lesson: 'p10-2-5',
    source: 'OpenStax, Physics, Test Prep for section 4.3, Newton\'s Second Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Is a Skydiver Weightless at Terminal Velocity?',
  thumbnailTitle: 'Is the Skydiver Weightless?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a skydiver speeds up, then falls at a constant terminal velocity. Does that mean he has become weightless? We watch the two forces on him, his weight and the air resistance, and see the air resistance grow with his speed until it balances his weight. The net force is zero, but his weight is still there. Then we look at the wrong ideas that lead people astray.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is the Skydiver Weightless?', subtitle: 'Air resistance and terminal velocity, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a skydiver. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 1,
          working: 'At terminal velocity the air resistance is as big as the weight, so the **net** force is zero. The weight itself is still there.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A skydiver initially accelerates in his jump. Later, he achieves a state of constant velocity, called terminal velocity. Does this mean the skydiver becomes weightless?' },
        { say: 'The choices are yes, or no. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [fall],
      lines: [
        { say: 'Let us picture it. Here is a skydiver, and let us say his mass is seventy kilograms. He jumps. Watch his speed on the graph.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.graph'], play: 'sim.jump', playDelay: 0.5 },
        { say: 'At first he speeds up quickly. Then he speeds up less and less, until his speed levels off at fifty metres per second. That steady speed is his terminal velocity.' },
        { say: 'The question asks: once his speed stops changing, has his weight gone?' },
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
          title: 'Air resistance and terminal velocity',
          md: '**Air resistance** pushes **against** a moving object, and it **grows** with speed. A falling object speeds up until the air resistance is as big as its **weight**. Then the net force is **zero**, and it falls at a steady speed: its **terminal velocity**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Net force $= 0$ does **not** mean no forces: it means the forces **balance**.' },
      ],
      lines: [
        { say: 'Here is what we need. Air resistance pushes against a moving object, and the faster it goes, the bigger the air resistance.', show: 'def' },
        { say: 'A falling object speeds up until the air resistance is as big as its weight. Then the net force is zero, and it falls at a steady speed, its terminal velocity.' },
        { say: 'And remember: a net force of zero does not mean there are no forces. It means the forces balance.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Name the **forces** on the skydiver', 'Watch how they **change** as he speeds up', 'Compare them at **terminal velocity**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, name the forces on the skydiver.', show: 'plan.0' },
        { say: 'Second, watch how they change as he speeds up.', show: 'plan.1' },
        { say: 'Third, compare them once he reaches terminal velocity.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The forces',
      layout: 'center',
      main: [fall, { kind: 'math', id: 'm', size: 'md', lines: ['W = mg = 70\\ \\text{kg} \\times 9.8\\ \\text{N/kg} = \\opp{686\\ \\text{N}}'] }],
      lines: [
        { say: 'Step one. Two forces act on him. His weight pulls him down. For seventy kilograms, that is seventy times 9.8: 686 newtons.', show: ['sim', 'm.0'], play: 'sim.ready', playDelay: 0.3 },
        { say: 'The other force is air resistance, pushing up. At the very start, he is not moving yet, so there is none.' },
      ],
    },
    {
      chapter: 'Step 2: As he speeds up',
      layout: 'center',
      main: [fall],
      lines: [
        { say: 'Step two. Watch the two arrows as he falls. His weight stays exactly the same the whole way down.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.graph'], play: 'sim.jump', playDelay: 0.3 },
        { say: 'But as he goes faster, the air resistance arrow grows. The net force, weight minus air resistance, gets smaller and smaller, so he speeds up less and less.' },
        { say: 'In the end, the air resistance arrow is as long as the weight arrow.' },
      ],
    },
    {
      chapter: 'Step 3: At terminal velocity',
      layout: 'center',
      main: [steady, { kind: 'math', id: 'm', size: 'md', lines: ['F_{\\text{net}} = 686\\ \\text{N} - 686\\ \\text{N} = 0 \\qquad W = \\good{686\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. Here he is at terminal velocity. The air resistance is 686 newtons up, and the weight is 686 newtons down.', show: 'sim', play: 'sim.forces', playDelay: 0.3 },
        { say: 'They cancel, so the net force is zero, and his speed stays at fifty metres per second.', show: ['sim.clock', 'sim.velocity', 'sim.graph', 'm.0'], play: 'sim.go' },
        { say: 'But look: his weight is still 686 newtons. It has not gone anywhere. It is balanced, not missing. So the answer is no, choice B.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [steady, { kind: 'text', id: 't', size: 'md', md: 'No weight $\\Rightarrow$ air resistance alone $\\Rightarrow$ he would **slow down** ✗' }],
      lines: [
        { say: 'Let us check by imagining the opposite. Suppose his weight really did vanish.', show: 'sim', play: 'sim.forces', playDelay: 0.3 },
        { say: 'Then only the air resistance would act, pushing up. He would slow down, and his speed would not stay steady. So his weight must still be there, balancing the air resistance.', show: 't' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong idea', 'Why it is wrong'],
          rows: [
            ['Steady speed means **no weight**', 'The weight is **balanced**, not gone'],
            ['Steady speed means **no forces**', '**Two** forces act, and they **cancel**'],
            ['Air resistance is **bigger** than the weight', 'Then he would **slow down**'],
            ['No: the weight is still $686$ N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the wrong ideas that lead people to answer yes.', show: 'traps' },
        { say: 'The first mixes up a net force of zero with a weight of zero. The weight is balanced, not gone.' },
        { say: 'The second thinks a steady speed means no forces at all. In fact two forces act, and they cancel.' },
        { say: 'And if the air resistance were bigger than his weight, he would be slowing down, not falling at a steady speed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A skydiver of mass 80 kg falls at terminal velocity. Using g = 9.8 N/kg, what is the air resistance on her?',
          choices: ['784 N', '0 N', '80 N', 'More than 784 N'],
          answer: 0,
          working: 'At terminal velocity the air resistance equals the weight: $W = mg = 80 \\times 9.8 = 784$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A skydiver of mass eighty kilograms falls at terminal velocity. Using g equals 9.8 newtons per kilogram, what is the air resistance on her? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'At terminal velocity, the air resistance equals her weight: eighty times 9.8 is 784 newtons. That is choice A. Eighty newtons mixes up the mass with the weight.', show: 'q2.answer' },
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
          items: ['Air resistance **grows** with speed', 'Terminal velocity: air resistance $=$ weight', 'Net force **zero**: a steady speed', 'The weight is **balanced**, never gone'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Air resistance grows as an object speeds up.', show: 'sum.0' },
        { say: 'At terminal velocity, the air resistance equals the weight.', show: 'sum.1' },
        { say: 'The net force is then zero, so the speed stays steady.', show: 'sum.2' },
        { say: 'And the weight is balanced, never gone. For more on friction and air resistance, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
