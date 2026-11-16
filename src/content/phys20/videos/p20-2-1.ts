import type { Explainer, MotionEl, RampEl } from '@/video/script.ts';

// Lesson 2.1: the four common forces, free-body diagrams and the net force along a line. The
// free-body diagrams are worked out, not drawn by hand (src/video/ramp.ts): the lesson's 12 kg
// crate weighs 117.7 N, and its 20 kg crate has a normal force of 246.2 N when it is pressed
// down with 50 N and 116.2 N when it is pulled up with 80 N. The net forces move a sled and a
// box as F = ma says (src/video/motion.ts).

/** The lesson's 12 kg crate, dragged along a rough floor by a rope that pulls with 60 N. */
const crate: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 10,
  friction: [0.4, 0.3],
  bodies: [{ id: 'crate', mass: 12, label: 'crate', x: 3, width: 1.3, tone: 'theta' }],
  label: 'A crate dragged by a rope',
  height: 410,
  pad: [150, 150],
  forceScale: 1,
  poster: 'drag',
  clips: {
    name: { phases: [{ dur: 1.5, freeze: true, forces: [{ on: 'crate', name: 'Tension', n: 60, tone: 'brand' }] }] },
    drag: { phases: [{ dur: 1.5, forces: [{ on: 'crate', name: 'Tension', n: 60, tone: 'brand' }] }] },
  },
};

/** The lesson's 20 kg crate at rest: pressed down with 50 N, then pulled up with 80 N. */
const pressed: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 8,
  bodies: [{ id: 'crate', mass: 20, x: 4, width: 1.3, tone: 'theta' }],
  label: 'At rest on a level floor',
  height: 420,
  pad: [150, 150],
  forceScale: 0.6,
  clips: {
    down: { phases: [{ dur: 2, freeze: true, forces: [{ on: 'crate', name: 'Push', n: 50, angle: -90 }] }] },
    up: { phases: [{ dur: 2, freeze: true, forces: [{ on: 'crate', name: 'Pull', n: 80, angle: 90 }] }] },
  },
};

/** The lesson's sled: pulled with 120 N and pushed with 45 N, against 60 N of friction. The net force is 105 N. */
const sled: MotionEl = {
  kind: 'motion',
  id: 'line',
  span: [0, 12],
  height: 330,
  forceScale: 0.9,
  velocityScale: 16,
  lanes: [{ surface: 'rough', label: 'Three forces along a line' }],
  bodies: [{ id: 'sled', shape: 'block', mass: 50, label: 'sled', x: 3.4, width: 1.3, tone: 'adj' }],
  clips: {
    name: {
      phases: [
        {
          dur: 2,
          freeze: true,
          forces: [
            { on: 'sled', name: 'Pull', n: 120 },
            { on: 'sled', name: 'Push', n: 45 },
            { on: 'sled', name: 'Friction', n: -60, tone: 'bad' },
          ],
        },
      ],
    },
    go: {
      phases: [
        {
          dur: 2,
          forces: [
            { on: 'sled', name: 'Pull', n: 120 },
            { on: 'sled', name: 'Push', n: 45 },
            { on: 'sled', name: 'Friction', n: -60, resist: true },
          ],
        },
      ],
    },
  },
};

/** The lesson's box: pushed with 45 N at a steady 2 m/s, so friction is 45 N as well. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'line',
  span: [0, 12],
  height: 330,
  forceScale: 1.6,
  velocityScale: 30,
  lanes: [{ surface: 'rough', label: 'A steady velocity' }],
  bodies: [{ id: 'box', shape: 'block', mass: 10, label: 'box', x: 2, v: 2, width: 1.2, tone: 'adj' }],
  clips: {
    go: {
      phases: [
        {
          dur: 4,
          forces: [
            { on: 'box', name: 'Push', n: 45 },
            { on: 'box', name: 'Friction', n: -45, resist: true },
          ],
        },
      ],
    },
  },
};

const video: Explainer = {
  id: 'p20-2-1',
  lessonId: 'p20-2-1',
  title: 'Forces and Free-Body Diagrams',
  thumbnailTitle: 'Free-Body Diagrams',
  thumbnail: 'sim',
  summary:
    'Dynamics starts with a drawing: one object, with an arrow for every force on it. Meet weight, the normal force, tension and friction on a crate that is dragged across a floor, see how the normal force changes when the crate is pressed down or pulled up, and add forces along a line to find the net force.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Forces and Free-Body Diagrams', subtitle: 'One object, and every force on it' }],
      lines: [
        { say: 'Kinematics describes how things move. Dynamics asks why. And the answer is always the same: forces.', show: 'title' },
        { say: 'Before any calculation, a physicist draws the object alone, and marks every force that acts on it. Get that drawing right, and the rest of the problem follows.' },
      ],
    },
    {
      chapter: 'Four forces',
      layout: 'center',
      main: [crate, { kind: 'math', id: 'fg', size: 'md', lines: ['\\hyp{F_g = mg = 12 \\times 9.81 = 117.7\\ \\text{N}}'] }],
      lines: [
        { say: 'Here is a crate of twelve kilograms on a rough floor. To find the forces on it, ask two questions. First: is it near a planet? Then it has a weight. The weight is the mass times g: 117.7 newtons, straight down.', show: ['sim', 'sim.weight', 'fg'] },
        { say: 'Second: what is touching it? The floor is. A surface pushes at right angles to itself, and that push is called the normal force. The crate does not move up or down, so here the normal force balances the weight.', show: 'sim.normal' },
        { say: 'A rope touches the crate as well. A rope pulls along its own length, and that pull is called tension.', play: 'sim.name', playDelay: 2.2 },
        { say: 'And as the crate slides, the rough floor rubs against it. That is friction. It points along the surface, against the sliding.', show: 'sim.friction', play: 'sim.drag', playDelay: 2.4 },
        { say: 'Nothing else touches the crate, so nothing else can push it. This picture, of one object with an arrow for every force on it, is a free-body diagram.', focus: 'sim.crate' },
      ],
    },
    {
      chapter: 'Finding the normal force',
      layout: 'center',
      main: [
        pressed,
        { kind: 'math', id: 'down', size: 'md', lines: ['\\adj{F_N = F_g + 50 = 196.2 + 50 = 246.2\\ \\text{N}}'] },
        { kind: 'math', id: 'up', size: 'md', lines: ['\\adj{F_N = F_g - 80 = 196.2 - 80 = 116.2\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'The normal force is not always equal to the weight. This crate of twenty kilograms weighs 196.2 newtons, and at rest on a level floor, the normal force is 196.2 newtons as well.', show: ['sim', 'sim.weight', 'sim.normal'] },
        { say: 'Now a worker pushes straight down on it, with fifty newtons. The crate still does not move, so the forces up must equal the forces down. The floor has to hold up the crate, and resist the push as well: 246.2 newtons.', play: 'sim.down', show: 'down', playDelay: 2 },
        { say: 'Pull up on it with eighty newtons instead, which is not enough to lift it. Now the rope carries part of the weight, and the floor has less to hold up: 116.2 newtons.', play: 'sim.up', hide: 'down', show: 'up', playDelay: 0.8 },
        { say: 'So never assume the normal force. Always find it from the balance of the forces.', focus: 'sim.crate' },
      ],
    },
    {
      chapter: 'Net force',
      layout: 'center',
      main: [sled, { kind: 'math', id: 'net', size: 'md', lines: ['F_{\\text{net}} = 120 + 45 - 60 = \\thc{105\\ \\text{N [E]}}'] }],
      lines: [
        { say: 'The net force is the sum of all the forces on an object. This sled is pulled east with a hundred and twenty newtons, and pushed east with forty-five. Friction of sixty newtons acts west.', show: 'line', play: 'line.name', playDelay: 4.4 },
        { say: 'For forces along one line, choose a positive direction, give each force a sign, and add. With east as positive, the net force is a hundred and twenty, plus forty-five, minus sixty: a hundred and five newtons, east.', show: ['net', 'line.net'] },
        { say: 'The net force is the single force that would have the same effect as all of them together. And it is the net force that changes the motion.', show: ['line.velocity', 'line.readout'], play: 'line.go', playDelay: 4.6 },
      ],
    },
    {
      chapter: 'A steady velocity',
      layout: 'center',
      main: [steady, { kind: 'text', id: 'zero', size: 'md', md: 'At rest, or at a **steady velocity**, the net force is **zero**.' }],
      lines: [
        { say: 'This box is pushed with forty-five newtons, and it moves at a steady two metres per second. How large is the friction on it?', show: ['line', 'line.velocity'], play: 'line.go', playDelay: 0.4 },
        { say: 'Its velocity is not changing, so the net force is zero. The friction must balance the push exactly: forty-five newtons.', show: ['zero', 'line.net'], focus: 'line.box' },
        { say: 'This surprises many people. The box is moving, and yet there is no net force on it. A net force is needed to change a velocity, not to keep one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 15 kg box rests on a level floor. A rope pulls straight up on it with 40 N, which is not enough to lift it. Use $g = 9.81\\ \\text{m/s}^2$. What is the normal force on the box?',
          choices: ['$187.2\\ \\text{N}$', '$107.2\\ \\text{N}$', '$147.2\\ \\text{N}$', '$40\\ \\text{N}$'],
          answer: 1,
          working: 'Weight: $15 \\times 9.81 = 147.15\\ \\text{N}$. The forces up balance the forces down: $F_N + 40 = 147.15$, so $F_N = 107.2\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box of fifteen kilograms rests on a level floor. A rope pulls straight up on it with forty newtons, which is not enough to lift it. Use 9.81 metres per second squared for g. What is the normal force on the box? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The weight is fifteen times 9.81: about 147.2 newtons, downwards. The normal force and the pull act upwards, and together they balance the weight. So the normal force is 147.2 minus forty: 107.2 newtons. That is choice B.', show: 'q.answer' },
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
          items: [
            '**Weight** $F_g = mg$ acts straight down; the **normal force** is at right angles to the surface',
            '**Tension** pulls along a rope; **friction** acts against the sliding',
            'A **free-body diagram** shows one object, with every force **on** it',
            'With no acceleration along a direction, the forces along it **balance**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Weight is m g, straight down, and the normal force is at right angles to the surface.', show: 'sum.0' },
        { say: 'Tension pulls along a rope, and friction acts along the surface, against the sliding.', show: 'sum.1' },
        { say: 'A free-body diagram shows one object, with an arrow for every force that acts on it.', show: 'sum.2' },
        { say: 'And when an object does not accelerate along a direction, the forces along that direction balance. At rest, or at a steady velocity, the net force is zero.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
