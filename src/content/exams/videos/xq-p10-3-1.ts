import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 3.1 (work): a weightlifter lifts a 200 N barbell from the floor
// to a height of 2 m; how much work is done? The question is OpenStax Physics' own, word for word
// (Practice Problems, section 9.1, CC BY 4.0). The lifting force equals the weight, 200 N, and it
// moves the barbell 2 m along the force, so W = Fd = 200 × 2 = 400 J (choice d).
//
// The picture (src/video/motion.ts) lifts the 200 N barbell (20.4 kg) at a steady 0.5 m/s for 4 s,
// so the lift balances the weight, and its energy bars measure the work done and the energy stored
// as height from the motion: both reach 400 J.

const G = 9.8;
const forces: MotionForce[] = [
  { on: 'bar', name: 'Lift', n: 200, tone: 'opp' },
  { on: 'bar', name: 'Weight', n: -200, tone: 'hyp' },
];

const lift: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 2.6],
  height: 470,
  lanes: [{ label: 'A 200 N barbell' }],
  bodies: [{ id: 'bar', shape: 'block', mass: 200 / G, label: '200 N', x: 0, width: 0.5, tone: 'adj' }],
  energy: { max: 450, bars: ['work', 'potential'], g: G, names: { work: 'Work done by the lift', potential: 'Stored as height' } },
  forceScale: 0.36,
  velocityScale: 90,
  poster: 'up',
  clips: {
    // Part way up, with both forces drawn.
    ready: { reset: true, phases: [{ dur: 1.2, set: { bar: 0.5 }, forces }, { dur: 1, freeze: true, forces }] },
    up: { reset: true, phases: [{ dur: 4, set: { bar: 0.5 }, forces }, { dur: 0.001, set: { bar: 0 }, forces }] },
  },
};

const QUESTION = 'A weightlifter lifts a 200 N barbell from the floor to a height of 2 m. How much work is done?';
const CHOICES = ['0 J', '100 J', '200 J', '400 J'];

const video: Explainer = {
  id: 'xq-p10-3-1',
  lessonId: '',
  exam: {
    lesson: 'p10-3-1',
    source: 'OpenStax, Physics, Practice Problem for section 9.1, Work, Power, and the Work–Energy Theorem',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-1-work-power-and-the-work-energy-theorem',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Lifting a Barbell. How Much Work Is Done?',
  thumbnailTitle: 'Lifting a Barbell',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a weightlifter lifts a 200 N barbell from the floor to a height of 2 m, and we find the work done. We find the force needed to lift it, the distance it moves along that force, and multiply them: W = Fd. Then we check the answer against the energy stored in the raised barbell and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Lifting a Barbell', subtitle: 'Work done by a force, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about lifting a barbell. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 3,
          working: 'The lift equals the weight, $200$ N, and moves $2$ m along the force: $W = Fd = 200 \\times 2 = 400$ J.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A weightlifter lifts a 200 newton barbell from the floor to a height of two metres. How much work is done?' },
        { say: 'The choices are zero joules, a hundred joules, two hundred joules, and four hundred joules. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [lift],
      lines: [
        { say: 'Let us picture it. The barbell sits on the floor. The weightlifter lifts it, steadily, two metres up.', show: ['sim', 'sim.velocity'], play: 'sim.up', playDelay: 0.5 },
        { say: 'The question asks: how much work did the lifting force do? The bars will show us, but first let us work it out.' },
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
          title: 'Work',
          md: '**Work** is done when a force moves an object **in the direction of the force**: $W = Fd$, the force times the distance moved along it. With $F$ in newtons and $d$ in metres, $W$ is in **joules (J)**. The work done is the **energy** transferred.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Push a box with $50$ N for $3$ m: $W = 50 \\times 3 = 150$ J.' },
      ],
      lines: [
        { say: 'Here is what we need. Work is done when a force moves an object in the direction of the force.', show: 'def' },
        { say: 'Work equals the force times the distance moved along the force. With newtons and metres, the work comes out in joules. And the work done is the energy transferred to the object.' },
        { say: 'For example, push a box with fifty newtons for three metres, and you do fifty times three: 150 joules of work.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **force** that lifts the barbell', 'Find the **distance** it moves along that force', 'Multiply: $W = Fd$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the force that lifts the barbell.', show: 'plan.0' },
        { say: 'Second, find the distance it moves along that force.', show: 'plan.1' },
        { say: 'Third, multiply them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The force',
      layout: 'center',
      main: [lift, { kind: 'text', id: 't', size: 'md', md: 'A steady lift: the lift **equals** the weight, $200$ N.' }],
      lines: [
        { say: 'Step one. The barbell weighs 200 newtons: gravity pulls it down with 200 newtons.', show: 'sim', play: 'sim.ready', playDelay: 0.3 },
        { say: 'To lift it steadily, the weightlifter pushes up with a force equal to the weight. So the lifting force is 200 newtons, upwards.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: The distance',
      layout: 'center',
      main: [lift, { kind: 'text', id: 't', size: 'md', md: 'Up $2$ m: the **same direction** as the lift.' }],
      lines: [
        { say: 'Step two. The barbell rises two metres, from the floor to its highest point.', show: ['sim', 'sim.velocity'], play: 'sim.up', playDelay: 0.3 },
        { say: 'The lift points up, and the barbell moves up, so the whole two metres counts.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['W = F\\,d = 200\\ \\text{N} \\times 2\\ \\text{m}', '= \\good{400\\ \\text{J}}'] }],
      lines: [
        { say: 'Step three. Work is force times distance: 200 newtons times two metres.', show: 'm.0' },
        { say: '400 joules. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [lift, { kind: 'math', id: 'm', size: 'md', lines: ['E_p = mgh = 200\\ \\text{N} \\times 2\\ \\text{m} = 400\\ \\text{J}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with energy. The work done is the energy transferred, and here it is stored in the raised barbell. Watch the two bars.', show: ['sim', 'sim.energy', 'm.0'], play: 'sim.up', playDelay: 0.3 },
        { say: 'The energy stored by height is the weight times the height: 200 times two, 400 joules. The bar for the work done and the bar for the energy stored end at the same place.' },
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
            ['$0$ J', 'The barbell **moved**, along the force: work **was** done'],
            ['$100$ J', '$200 \\div 2$: **divided** instead of multiplying'],
            ['$200$ J', 'Gave the **force**, and forgot the **distance**'],
            ['$400$ J', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Zero joules is what you would get if the barbell had not moved, or had moved sideways to the force. But it moved two metres up, the way the force points.' },
        { say: 'A hundred joules divides the force by the distance. Work is force times distance.' },
        { say: 'And two hundred joules is just the force, in the wrong unit. It forgets the distance altogether.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A crane lifts a 500 N crate steadily through 3.0 m. How much work does the crane do on the crate?',
          choices: ['167 J', '1500 J', '500 J', '0 J'],
          answer: 1,
          working: 'The lift equals the weight, $500$ N, so $W = Fd = 500 \\times 3.0 = 1500$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. A crane lifts a 500 newton crate steadily through 3.0 metres. How much work does the crane do on the crate? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The lift equals the weight, 500 newtons. Times three metres is 1,500 joules. That is choice B. 167 divided instead of multiplying.', show: 'q2.answer' },
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
          items: ['Work: $W = Fd$, in **joules**', 'Only the distance **along the force** counts', 'A steady lift: force $=$ weight', 'Work done $=$ energy transferred'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Work is force times distance, measured in joules.', show: 'sum.0' },
        { say: 'Only the distance moved along the force counts.', show: 'sum.1' },
        { say: 'To lift something steadily, the force equals its weight.', show: 'sum.2' },
        { say: 'And the work done is the energy transferred. For more on work, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
