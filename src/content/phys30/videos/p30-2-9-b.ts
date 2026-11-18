import type { Explainer, MagnetCoil, MagnetsEl } from '@/video/script.ts';

// Lesson 2.9, second half: the electric motor. The coil is seen from one end of its axle, and it is
// turned by the forces on its two sides, F = NBIL each, step by step (src/video/magnets.ts). With
// fixed wires it swings to the upright position, rocks and stops there. With a split-ring
// commutator its current is reversed every half turn, so it keeps turning.

const CM = { metres: 0.01, symbol: 'cm' };

/** The poles of a magnet, 8 cm apart, with a field of 0.20 T between them. */
const magnet = { uniform: [0.2, 0] as [number, number], uniformLines: 6, yoke: { faces: [-4, 4] as [number, number], span: [-2.5, 2.5] as [number, number], thick: 2.2 } };

/** The lesson's coil: 100 turns, each side 4.0 cm long and 1.8 cm from the axle, carrying 1.5 A. The force on a side is 1.2 N. */
const coil: MagnetCoil = { id: 'c', at: [0, 0], radius: 1.8, amps: 1.5, turns: 100, metres: 0.04, inertia: 2e-4, friction: 1.2e-3 };

/** The coil joined to the supply by two fixed wires: it swings to the upright position, rocks and stops. */
const fixed: MagnetsEl = {
  kind: 'magnets',
  id: 'fixed',
  view: [-7, 7, -2.96, 2.96],
  height: 480,
  length: CM,
  ...magnet,
  coil,
  forceScale: 60 / 1.2,
  // One second of video is 0.11 s for the coil.
  rate: 0.11,
  clips: { run: { phases: [{ dur: 12 }] } },
};

/** The same coil with a split-ring commutator: it keeps turning; then the current is reversed, and it turns the other way. */
const spin: MagnetsEl = {
  ...fixed,
  id: 'spin',
  // A little wider than the first picture, so that the thumbnail draws it under the title.
  view: [-7.3, 7.3, -2.96, 2.96],
  height: 461,
  coil: { ...coil, commutator: true },
  rate: 0.12,
  poster: 'run',
  thumb: ['lines', 'force'],
  clips: {
    // Each clip is a little longer than its line of narration. The next line waits for the clip to end, so the coil never stops between them.
    run: { phases: [{ dur: 16.5 }] },
    on: { phases: [{ dur: 20 }] },
    coast: { phases: [{ dur: 16 }] },
    back: { phases: [{ dur: 2, amps: { c: -1.5 } }, { dur: 8 }] },
  },
};

/** The coil at rest with its plane along the field, to show the force on each side. */
const side: MagnetsEl = {
  ...fixed,
  id: 'side',
  view: [-7, 7, -2.34, 2.34],
  height: 380,
  yoke: { ...magnet.yoke, span: [-1.85, 1.85] },
  coil: { ...coil, commutator: true },
  clips: {},
};

const video: Explainer = {
  id: 'p30-2-9-b',
  lessonId: 'p30-2-9',
  title: 'The Electric Motor',
  thumbnail: 'spin',
  summary:
    'Bend a wire into a coil between the poles of a magnet, and the forces on its two sides turn it. See why a coil with fixed wires stops at the upright position, how a split-ring commutator reverses the current every half turn to keep the coil turning, and find the force on one side of a coil with F = NBIL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Electric Motor', subtitle: 'How a current makes a coil turn' }],
      lines: [
        { say: 'A straight wire in a magnetic field is pushed once, and then it leaves the field. To get motion that goes on, bend the wire into a coil that can turn.', show: 'title' },
        { say: 'That is an electric motor. It changes electrical energy into kinetic energy.' },
      ],
    },
    {
      chapter: 'A coil in a field',
      layout: 'center',
      main: [fixed],
      lines: [
        { say: 'Here is a rectangular coil on an axle, between the poles of a magnet. We look along the axle, so we see the two long sides of the coil end-on.', show: ['fixed', 'fixed.lines'] },
        { say: 'The current goes along one side, and comes back along the other. So it comes out of the page in the side on the right, and goes into the page in the side on the left.', focus: 'fixed.c' },
        { say: 'The two sides carry opposite currents through the same field, so the forces on them are opposite. The right side is pushed up, and the left side is pushed down.', show: 'fixed.force' },
        { say: 'Together, the two forces turn the coil. But watch what happens. The coil swings to the upright position, rocks to and fro, and stops.', play: 'fixed.run', playDelay: 2.5, wait: 4 },
        { say: 'Here the two forces still point up and down. But now they act along the same line, through the axle. They pull the coil apart, and they do not turn it.' },
        { say: 'And if the coil swings past this position, the forces turn it back. With two fixed wires, a coil can never make more than half a turn.' },
      ],
    },
    {
      chapter: 'The commutator',
      layout: 'center',
      main: [spin],
      lines: [
        { say: 'The answer is a split-ring commutator. It is a metal ring, cut into two halves. Each half is joined to one end of the coil, and turns with it.', show: ['spin', 'spin.lines'], focus: 'spin.c' },
        { say: 'Two brushes press on the ring. They stay where they are, and carry the current in and out.' },
        { say: 'Now the coil turns as before. But each time it passes the upright position, each half of the ring moves on to the other brush. That reverses the current in the coil.', show: 'spin.force', play: 'spin.run' },
        { say: 'Watch the side on the right. Whichever side of the coil is there, its current comes out of the page, and the force on it is up. So the forces always turn the coil the same way, and it keeps turning.', play: 'spin.on' },
        { say: 'The turning effect is greatest when the coil lies along the field, because the two forces are then furthest apart. At the upright position there is none, and the coil coasts through.', play: 'spin.coast' },
        { say: 'To make a motor turn the other way, reverse the current, or reverse the field, but not both.', play: 'spin.back' },
      ],
    },
    {
      chapter: 'The force on one side',
      layout: 'center',
      main: [
        side,
        { kind: 'math', id: 'n', size: 'md', lines: ['F = NBIL', 'F = 100 \\times 0.20 \\times 1.5 \\times 0.040 = \\opp{1.2\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'How large are these forces? A coil has many turns, and each turn of a side is a wire that feels B I L. So for a coil of N turns, the force on one side is N B I L.', show: ['side', 'side.lines', 'side.force', 'n.0'] },
        { say: 'This coil has 100 turns. Each side is 4.0 centimetres long, in a field of 0.20 teslas, and the current is 1.5 amperes. So the force is 100, times 0.20, times 1.5, times 0.040, which is 1.2 newtons.', show: 'n.1' },
        { say: 'A larger current, more turns, or a stronger magnet all make the force larger, and the motor more powerful.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The coil of a motor has 50 turns. One side of it, 0.060 m long, lies at right angles to a magnetic field of 0.30 T. What is the force on that side when the current in the coil is 2.0 A?',
          choices: ['1.8 N', '0.036 N', '30 N', '500 N'],
          answer: 0,
          working: '$F = NBIL = 50 \\times 0.30 \\times 2.0 \\times 0.060 = 1.8$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. The coil of a motor has 50 turns. One side of it, 0.060 metres long, lies at right angles to a magnetic field of 0.30 teslas. What is the force on that side, when the current in the coil is 2.0 amperes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Multiply the number of turns, the field, the current and the length. 50, times 0.30, times 2.0, times 0.060, is 1.8 newtons. That is choice "A".', caption: 'Multiply the number of turns, the field, the current and the length. 50, times 0.30, times 2.0, times 0.060, is 1.8 newtons. That is choice A.', show: 'q.answer' },
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
            'In a motor, the forces on the two sides of the coil are **opposite**, so they turn it',
            'With fixed wires, the coil would stop at the upright position',
            'The **split-ring commutator** reverses the current in the coil every half turn',
            'So the coil keeps turning the same way',
            'The force on one side of a coil of $N$ turns: $F = NBIL$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a motor, the forces on the two sides of the coil are opposite, so they turn it.', show: 'sum.0' },
        { say: 'With fixed wires, the coil would stop at the upright position.', show: 'sum.1' },
        { say: 'The split-ring commutator reverses the current in the coil every half turn.', show: 'sum.2' },
        { say: 'So the coil keeps turning the same way.', show: 'sum.3' },
        { say: 'And the force on one side of a coil of N turns is N B I L.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
