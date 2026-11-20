import type { Explainer, RampEl, RampForce } from '@/video/script.ts';

// Exam question for lesson 3.4 (work): how can you carry books to school without changing their
// kinetic or potential energy, or doing any work on them? The question is OpenStax Physics' own,
// word for word (Critical Thinking, section 9.1, CC BY 4.0). Carried at a steady speed on the
// level, the books need only an upward force equal to their weight; it is at 90° to the motion, so
// W = Fd cos 90° = 0, and with no acceleration and no change in height neither energy changes
// (choice a).
//
// The picture (src/video/ramp.ts) is seen from the side: 2.0 kg of books glide along a level path
// at a steady 1.5 m/s, held up by a lift equal to their 19.6 N weight, and the bars of work stay at
// zero. A second clip adds a forward push of 3 N for 1 s, so the books speed up to 3.0 m/s and the
// push does 6.75 J of work.

const G = 9.8;
const M = 2.0;
const LIFT: RampForce = { on: 'books', name: 'Lift', n: M * G, angle: 90 };

const carry: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 14,
  g: G,
  label: 'Seen from the side, on a level path',
  bodies: [{ id: 'books', mass: M, label: 'Books', x: 1.5, v: 1.5, width: 1.4, tone: 'adj' }],
  work: { rows: ['Lift', 'Weight', 'Push', 'Net'], range: [-10, 10] },
  height: 440,
  pad: [170, 230],
  forceScale: 3,
  velocityScale: 26,
  poster: 'carry',
  clips: {
    carry: { reset: true, phases: [{ dur: 7, forces: [LIFT] }] },
    speed: { reset: true, phases: [{ dur: 1, forces: [LIFT] }, { dur: 1, forces: [LIFT, { on: 'books', name: 'Push', n: 3 }] }, { dur: 1, forces: [LIFT] }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-4',
  lessonId: '',
  exam: {
    lesson: 'p20-3-4',
    source: 'OpenStax, Physics, Critical Thinking for section 9.1, Work, Power, and the Work–Energy Theorem',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-1-work-power-and-the-work-energy-theorem',
    question: 'Which statement explains how it is possible to carry books to school without changing the kinetic or potential energy of the books or doing any work?',
    choices: [
      'By moving the book without acceleration and keeping the height of the book constant',
      'By moving the book with acceleration and keeping the height of the book constant',
      'By moving the book without acceleration and changing the height of the book',
      'By moving the book with acceleration and changing the height of the book',
    ],
  },
  title: 'Exam Question: Can You Carry Books Without Doing Any Work?',
  thumbnailTitle: 'Carrying Books, No Work?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: how can you carry books to school without changing their kinetic or potential energy, or doing any work on them? We name the forces on the books, use W = Fd cos θ to see that a force at right angles to the motion does no work, and check what happens to the energy. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Carrying Books, No Work?', subtitle: 'Work and energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about carrying books, and whether that is work. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Which statement explains how it is possible to carry books to school without changing the kinetic or potential energy of the books or doing any work?',
          choices: [
            'By moving the book without acceleration and keeping the height of the book constant',
            'By moving the book with acceleration and keeping the height of the book constant',
            'By moving the book without acceleration and changing the height of the book',
            'By moving the book with acceleration and changing the height of the book',
          ],
          answer: 0,
          working: 'The upward force is at $90^\\circ$ to the motion, so $W = Fd\\cos 90^\\circ = 0$; no acceleration keeps the speed, the same height keeps the potential energy.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Which statement explains how it is possible to carry books to school without changing the kinetic or potential energy of the books, or doing any work?' },
        { say: 'A: by moving the book without acceleration, and keeping its height constant. B: with acceleration, keeping the height constant. C: without acceleration, changing the height. D: with acceleration, changing the height. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [carry, { kind: 'text', id: 'plain', size: 'lg', md: 'When does carrying do **no work** and leave the **energy** the same?' }],
      lines: [
        { say: 'Let us picture it from the side. Here are the books, carried along a level path at a steady speed.', show: ['sim', 'sim.velocity'], play: 'sim.carry', playDelay: 0.5 },
        { say: 'Your hands hold them up the whole time. It certainly feels like effort. But in physics, work has an exact meaning.' },
        { say: 'The question asks: how must you carry them so that no work is done on them, and neither of their energies changes?', show: 'plain' },
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
          md: 'A force $F$ does work $W = Fd\\cos\\theta$ on an object that moves a distance $d$, where $\\theta$ is the angle between the force and the motion. A force at **right angles** to the motion does **no work**, because $\\cos 90^\\circ = 0$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Kinetic energy $\\tfrac{1}{2}mv^2$ changes only if the **speed** changes; potential energy $mgh$ only if the **height** does.' },
      ],
      lines: [
        { say: 'Here is what we need. A force does work when it moves something along the direction it pushes. The work is the force, times the distance, times the cosine of the angle between them.', show: 'def' },
        { say: 'If the force is at right angles to the motion, the cosine of ninety degrees is zero, so it does no work at all.' },
        { say: 'And remember the two energies. Kinetic energy changes only if the speed changes. Gravitational potential energy changes only if the height changes.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Name the **forces** on the books', 'Find the **work** each does: $W = Fd\\cos\\theta$', 'Check the **energies**: speed and height'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, name the forces on the books.', show: 'plan.0' },
        { say: 'Second, find the work each force does as the books move along.', show: 'plan.1' },
        { say: 'Third, check what happens to the books\' speed and height, and so to their energies.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The forces',
      layout: 'center',
      main: [carry, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Lift} = \\text{weight} = 2.0 \\times 9.8 = 19.6\\ \\text{N}'] }],
      lines: [
        { say: 'Step one. Say the books have a mass of 2.0 kilograms. Their weight pulls down with 2.0 times 9.8: 19.6 newtons.', show: ['sim', 'sim.weight', 'sim.velocity'], play: 'sim.carry', playDelay: 0.3 },
        { say: 'To keep them from falling, your hands push up with the same 19.6 newtons. We call it the lift. Up and down balance, so the books move along at a steady speed.', show: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The work',
      layout: 'center',
      main: [carry, { kind: 'math', id: 'm', size: 'md', lines: ['W_{\\text{lift}} = Fd\\cos 90^\\circ = \\good{0}'] }],
      lines: [
        { say: 'Step two. The lift points straight up, but the books move sideways. The angle between them is ninety degrees.', show: ['sim', 'sim.weight', 'sim.velocity', 'sim.work'], play: 'sim.carry', playDelay: 0.3 },
        { say: 'So the lift does F d cos ninety degrees of work: zero. The same is true of the weight. Watch the bars of work: however far the books go, they stay at zero.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: The energies',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'e',
          items: ['**No acceleration**: the speed stays the same, so $\\tfrac{1}{2}mv^2$ stays the same', '**Same height**: $mgh$ stays the same', 'No work done, **no energy changed**: choice A'],
        },
      ],
      lines: [
        { say: 'Step three. With no acceleration, the speed never changes, so the kinetic energy never changes.', show: 'e.0' },
        { say: 'Keep the books at the same height, and their potential energy never changes either.', show: 'e.1' },
        { say: 'No work is done, and no energy changes. So the answer is: move the books without acceleration, and keep their height constant. That is choice A.', show: 'e.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [carry, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Push} = 3\\ \\text{N forward: } W > 0,\\ \\text{speed and } \\tfrac{1}{2}mv^2 \\text{ go up}'] }],
      lines: [
        { say: 'Let us check it by breaking the rule. This time, a forward push speeds the books up for a moment.', show: ['sim', 'sim.velocity', 'sim.work'], play: 'sim.speed', playDelay: 0.3 },
        { say: 'Now the push points along the motion, so it does work, and its bar grows. The books go faster, so their kinetic energy goes up. Acceleration means work is done.', show: 'm' },
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
            ['B: with acceleration, same height', 'The speed changes, so the **kinetic** energy changes'],
            ['C: no acceleration, height changes', 'Lifting raises the **potential** energy: $mgh$'],
            ['D: acceleration and height change', 'Both energies change'],
            ['A: no acceleration, same height', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Choice B lets the books accelerate. Then their speed changes, so their kinetic energy changes, and work has been done on them.' },
        { say: 'Choice C changes their height. Lifting books up a staircase raises their potential energy by m g h, and that takes work.' },
        { say: 'And choice D does both. Only choice A keeps both energies the same.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A waiter carries a 3.0 kg tray at a steady speed for 8.0 m across a level floor, holding it up with a force of 29 N. How much work does the waiter\'s upward force do on the tray?',
          choices: ['232 J', '24 J', '29 J', '0 J'],
          answer: 3,
          working: 'The force is up and the motion is sideways: $W = 29 \\times 8.0 \\times \\cos 90^\\circ = 0$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. A waiter carries a 3.0 kilogram tray at a steady speed for 8.0 metres across a level floor, holding it up with a force of 29 newtons. How much work does the waiter\'s upward force do on the tray? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The force is straight up and the tray moves sideways, so the angle is ninety degrees and the work is zero. 232 joules forgets the angle. That is choice D.', show: 'q2.answer' },
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
          items: ['Work: $W = Fd\\cos\\theta$', 'A force at **right angles** to the motion does **no work**', 'Acceleration changes $\\tfrac{1}{2}mv^2$; height changes $mgh$', 'Effort is not the same as **work** in physics'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Work is force times distance times the cosine of the angle between them.', show: 'sum.0' },
        { say: 'A force at right angles to the motion does no work.', show: 'sum.1' },
        { say: 'Speeding up changes the kinetic energy, and changing height changes the potential energy.', show: 'sum.2' },
        { say: 'And feeling tired is not the same as doing work, in physics. For more on work, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
