import type { Explainer, ForcesEl, PlaneForce } from '@/video/script.ts';

// Exam question for lesson 2.1 (free-body diagrams): three forces act on one object, A to the right,
// B to the left and C downwards. The question is OpenStax Physics' own, word for word (Critical
// Thinking, section 4.1, CC BY 4.0). An object that starts at rest moves off along the net force, so
// it moves straight down only when the left and right forces cancel: a = b (choice b). The size of
// C does not matter, as long as there is one, so choice d (C larger than A and B) is not necessary,
// and choice c compares forces that point in different directions.
//
// The picture is the object seen from above on frictionless ice (src/video/forces.ts), so that
// these three forces are the only ones that act along the surface; "down" is down the screen.

const f = (a: number, b: number, c: number): PlaneForce[] => [
  { name: 'A', n: a, angle: 0 },
  { name: 'B', n: b, angle: 180 },
  { name: 'C', n: c, angle: 270 },
];

const obj: ForcesEl = {
  kind: 'forces',
  id: 'top',
  body: { mass: 10, label: 'object', tone: 'adj' },
  view: [-3.4, 3.4, -4.4, 0.9],
  label: 'Seen from above, on ice',
  height: 470,
  poster: 'equal',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: f(30, 30, 40) }] },
    equal: { reset: true, phases: [{ dur: 0.75, slow: 2, note: 'Slow motion', forces: f(30, 30, 40) }] },
    more: { reset: true, phases: [{ dur: 0.75, slow: 2, note: 'Slow motion', forces: f(45, 15, 40) }] },
    less: { reset: true, phases: [{ dur: 0.75, slow: 2, note: 'Slow motion', forces: f(15, 45, 40) }] },
    smallC: { reset: true, phases: [{ dur: 1.6, slow: 1.5, note: 'Slow motion', forces: f(40, 40, 12) }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-2-1',
  lessonId: '',
  exam: {
    lesson: 'p20-2-1',
    source: 'OpenStax, Physics, Critical Thinking for section 4.1, Force',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-1-force',
    question:
      'Three forces, A, B, and C, are acting on the same object with magnitudes a, b, and c, respectively. Force A acts to the right, force B acts to the left, and force C acts downward. What is a necessary condition for the object to move straight down?',
    choices: [
      'The magnitude of force A must be greater than the magnitude of force B, so a > b.',
      'The magnitude of force A must be equal to the magnitude of force B, so a = b.',
      'The magnitude of force A must be greater than the magnitude of force C, so A > C.',
      'The magnitude of force C must be greater than the magnitude of forces A or B, so A < C > B.',
    ],
  },
  title: 'Exam Question: Three Forces, and an Object That Moves Straight Down',
  thumbnailTitle: 'Straight Down?',
  thumbnail: 'top',
  summary:
    'A real test question, solved one small step at a time: three forces act on one object, one to the right, one to the left and one downwards, and we find what must be true for the object to move straight down. We add the forces one direction at a time, see that the left and right forces must cancel, and watch what happens when they do not. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Three Forces on One Object', subtitle: 'Which way does it move? Step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about three forces that push one object in different directions. We will take it one small step at a time.', show: 'title' },
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
            'Three forces, A, B, and C, are acting on the same object with magnitudes $a$, $b$, and $c$, respectively. Force A acts to the right, force B acts to the left, and force C acts downward. What is a necessary condition for the object to move straight down?',
          choices: [
            'The magnitude of force A must be greater than the magnitude of force B, so $a > b$.',
            'The magnitude of force A must be equal to the magnitude of force B, so $a = b$.',
            'The magnitude of force A must be greater than the magnitude of force C, so $A > C$.',
            'The magnitude of force C must be greater than the magnitude of forces A or B, so $A < C > B$.',
          ],
          answer: 1,
          working: 'Straight down means no sideways net force: $a - b = 0$, so $a = b$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Three forces, A, B and C, act on the same object. Force A acts to the right, force B acts to the left, and force C acts downwards. What must be true for the object to move straight down?' },
        { say: 'Choice A says A must be bigger than B. Choice B says A and B must be equal. Choice C says A must be bigger than C. And choice D says C must be bigger than both A and B. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [obj, { kind: 'text', id: 'plain', size: 'lg', md: 'When does the object move **straight down**, and not slanted?' }],
      lines: [
        { say: 'Let us draw it. Here is the object, seen from above on smooth ice, so that these three forces are the only ones that matter. A pulls to the right, B pulls to the left, and C pulls down the screen.', show: 'top', play: 'top.name', playDelay: 0.6 },
        { say: 'The question asks: what has to be true, so that the object moves straight down, and not off at a slant?', show: 'plain' },
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
          title: 'The net force sets the direction',
          md: 'An object that starts at rest moves off in the direction of the **net force**. Add the forces **one direction at a time**: left and right on their own, up and down on their own.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$5\\ \\text{N}$ right and $5\\ \\text{N}$ left: left–right net force $= 5 - 5 = 0$. They cancel.' },
      ],
      lines: [
        { say: 'Here is the idea we need. An object that starts at rest moves off in the direction of the net force: all the forces added up.', show: 'def' },
        { say: 'With forces that point different ways, we add them one direction at a time. The left and right forces on their own, and the up and down forces on their own.' },
        { say: 'For example, five newtons to the right and five newtons to the left cancel. Together, they give no push sideways at all.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Add the **left and right** forces', 'Add the **up and down** forces', 'For straight down, the **sideways** net force must be zero'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, add up the forces that act left and right.', show: 'plan.0' },
        { say: 'Second, add up the forces that act up and down.', show: 'plan.1' },
        { say: 'Third, think about what straight down means: nothing at all may push the object sideways.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Left and right',
      layout: 'split',
      leftWidth: 760,
      left: [obj],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{right: } a', '\\text{left: } b', 'F_{\\text{sideways}} = \\hyp{a - b}'] }],
      lines: [
        { say: 'Step one: left and right. Force A pulls to the right, with size a.', show: ['top', 'm.0'], play: 'top.name' },
        { say: 'Force B pulls to the left, with size b.', show: 'm.1' },
        { say: 'They point opposite ways, so we take one away from the other. The sideways net force is a, take away b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Up and down',
      layout: 'split',
      leftWidth: 760,
      left: [obj],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{down: } c', 'F_{\\text{down}} = \\adj{c}'] }],
      lines: [
        { say: 'Step two: up and down. Only one force acts in this direction: force C, pulling down with size c.', show: ['top', 'm.0'], play: 'top.name' },
        { say: 'So the downward net force is just c. As long as there is a force C at all, the object is pulled down.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Straight down',
      layout: 'split',
      leftWidth: 760,
      left: [obj],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a - b = 0', '\\good{a = b}'] }],
      lines: [
        { say: 'Step three. To move straight down, nothing may push the object sideways. So the sideways net force must be zero: a take away b equals zero.', show: ['top', 'm.0'], play: 'top.name' },
        { say: 'That means a equals b. The pull to the right and the pull to the left must be the same size, so that they cancel.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch. A and B are both thirty newtons, so they cancel. The net force is just C, straight down, and the object moves straight down.', play: 'top.equal', playDelay: 0.5 },
        { say: 'So the answer is: the magnitude of force A must equal the magnitude of force B. That is choice B.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 760,
      left: [obj],
      right: [{ kind: 'bullets', id: 't', items: ['$a > b$: it drifts **right**', '$a < b$: it drifts **left**', 'Small $c$: still **straight down**'] }],
      lines: [
        { say: 'Let us check it, by breaking the rule. Make A bigger than B: forty five newtons to the right, and only fifteen to the left.', show: ['top', 'top.net'], play: 'top.more', playDelay: 0.5 },
        { say: 'Now the net force slants to the right, and the object drifts right as it moves down. Not straight down.', show: 't.0' },
        { say: 'Make B the bigger one instead, and it drifts to the left. Only when A and B are equal does it go straight down.', show: 't.1', play: 'top.less', playDelay: 0.5 },
        { say: 'And what about the size of C? Here, A and B are forty newtons each, and C is only twelve newtons. The object still moves straight down, just more slowly.', show: 't.2', hide: 'top.net', play: 'top.smallC', playDelay: 0.5 },
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
            ['$a > b$', 'The object drifts **right** as it moves down'],
            ['$A > C$', 'Compares a sideways force with a downward one'],
            ['$A < C > B$', 'C can be **any** size: a small C still pulls straight down'],
            ['$a = b$', 'Correct: the sideways forces cancel'],
          ],
        },
      ],
      lines: [
        { say: 'The wrong choices hide some common mistakes.', show: 'traps' },
        { say: 'A bigger than B is what we just tested. The object drifts to the right.' },
        { say: 'Choice C compares A with C. But A is sideways and C is downwards. Comparing them tells us nothing about whether the sideways forces cancel.' },
        { say: 'And choice D says C must be the biggest. It does not have to be: we saw a small C still pull the object straight down.' },
        { say: 'The word necessary means: it must always be true. Only a equals b is needed every time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A box rests on smooth ice. Four forces act on it: 25 N east, 40 N west, 30 N north, and a force $F$ east. How big must $F$ be for the box to move straight north?',
          choices: ['$65\\ \\text{N}$', '$40\\ \\text{N}$', '$25\\ \\text{N}$', '$15\\ \\text{N}$'],
          answer: 3,
          working: 'East and west must cancel: $25 + F = 40$, so $F = 15\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box rests on smooth ice. Four forces act on it: twenty five newtons east, forty newtons west, thirty newtons north, and a force F east. How big must F be for the box to move straight north? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'For straight north, east and west must cancel. East has twenty five plus F, and west has forty. So F is fifteen newtons. That is choice D.', show: 'q2.answer' },
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
          items: ['An object at rest moves off along the **net force**', 'Add forces **one direction at a time**', 'Straight down: the **sideways** forces cancel, $a = b$', '**Necessary** means it must always be true'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An object that starts at rest moves off in the direction of the net force.', show: 'sum.0' },
        { say: 'Add the forces one direction at a time: sideways on their own, and up and down on their own.', show: 'sum.1' },
        { say: 'To move straight down, the sideways forces must cancel, so a equals b.', show: 'sum.2' },
        { say: 'And necessary means it must be true every time. For more on forces and free-body diagrams, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
