import type { Explainer, MagnetCoil, MagnetsEl } from '@/video/script.ts';

// Lesson 2.10, third part: the generator. The coil of the motor is seen from one end of its axle,
// but now it is turned from outside. Each side is a conductor that cuts across the field, so an emf
// is induced in it, ε = BLv for the part of its velocity that is across the field, and the emf at
// the brushes draws itself on a graph as the coil turns (src/video/magnets.ts). Through slip rings
// the output alternates; through a split ring it keeps one sign; and with a lamp across the brushes
// the induced current flows in the coil, and the forces on its sides oppose the turning.

const CM = { metres: 0.01, symbol: 'cm' };

/** The lesson's coil: 100 turns, each side 4.0 cm long and 2.0 cm from the axle, in a field of 0.20 T. At 50 turns each second its emf rises to 10 V. */
const coil: MagnetCoil = { id: 'c', at: [-3.4, 0], radius: 2, angle: 90, amps: 0, turns: 100, metres: 0.04, drive: 50, slip: true };

/** The coil between the poles of a magnet, with the graph of its emf beside it: one sweep of the graph is 40 ms. It starts at rest, and is then turned. */
const gen: MagnetsEl = {
  kind: 'magnets',
  id: 'gen',
  view: [-7, 7, -2.9, 2.9],
  height: 470,
  length: CM,
  uniform: [0.2, 0],
  uniformLines: 6,
  yoke: { faces: [-5.7, -1.1], span: [-2.3, 2.3], thick: 1.2 },
  // It starts a quarter of a turn on, because it turns a quarter of a turn less while it is brought up to speed: each sweep of the graph then starts as the emf passes zero.
  coil: { ...coil, drive: 0, angle: 180 },
  trace: { at: [2, 6.6], span: [-2, 2], volts: 20, seconds: 0.04 },
  // One second of video is 5 ms for the coil, so at 50 turns each second it turns once in four seconds.
  rate: 0.005,
  // Each clip is a little longer than its line of narration. The next line waits for the clip to end, so the coil never stops between them.
  clips: {
    start: { phases: [{ dur: 2, drive: 50 }, { dur: 15.6 }] },
    a: { phases: [{ dur: 11.4 }] },
    b: { phases: [{ dur: 10.5 }] },
    c: { phases: [{ dur: 12.6 }] },
  },
};

/** The same coil, already turning, to look at its slip rings; then it is turned twice as fast. */
const ac: MagnetsEl = {
  ...gen,
  id: 'ac',
  coil,
  poster: 'a',
  posterAt: 0.55,
  thumb: ['lines', 'trace'],
  clips: {
    // The first three clips last 50 s, and the coil is brought up to 100 turns each second over 4 s, so that each sweep of the graph still starts as the emf passes zero.
    a: { phases: [{ dur: 21.6 }] },
    b: { phases: [{ dur: 13.4 }] },
    c: { phases: [{ dur: 15 }] },
    fast: { phases: [{ dur: 4, drive: 100 }, { dur: 13.2 }] },
  },
};

/** The coil with the split ring of a motor in place of its slip rings: the output keeps one sign. */
const dc: MagnetsEl = {
  ...gen,
  id: 'dc',
  coil: { ...coil, slip: undefined, commutator: true },
  clips: { a: { phases: [{ dur: 14.9 }] }, b: { phases: [{ dur: 15.6 }] } },
};

/** The coil with a lamp of 5.0 Ω across its brushes: the induced current rises to 2.0 A, and the force on each side to 1.6 N, against the turning. */
const lamp: MagnetsEl = {
  ...gen,
  id: 'lamp',
  coil: { ...coil, load: 5 },
  forceScale: 90 / 1.6,
  clips: { a: { phases: [{ dur: 16.6 }] }, b: { phases: [{ dur: 10.4 }] }, c: { phases: [{ dur: 13.5 }] } },
};

const video: Explainer = {
  id: 'p30-2-10-c',
  lessonId: 'p30-2-10',
  title: 'The Generator',
  thumbnail: 'ac',
  summary:
    'A generator is a motor run backwards: turn a coil in a magnetic field, and an emf is induced in it. Watch the emf draw itself as the coil turns, see why it alternates, how slip rings and a split ring carry it to a circuit, and why a generator is hard to turn when it gives a current.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Generator', subtitle: 'How a turning coil makes an alternating current' }],
      lines: [
        { say: 'Almost all of the electrical energy you use is made in the same way. Something turns a coil of wire in a magnetic field: falling water, steam, or the wind.', show: 'title' },
        { say: 'The machine is called a generator. It is an electric motor, run backwards.' },
      ],
    },
    {
      chapter: 'A coil that is turned',
      layout: 'center',
      main: [gen],
      lines: [
        { say: 'Here is the coil of a motor again, seen from one end of its axle, between the poles of a magnet. This time, no battery is joined to it. Instead, something turns it.', show: ['gen', 'gen.lines'] },
        { say: 'Each side of the coil is a conductor that moves across the field. So an emf is induced in it, as in the rod on the rails. The graph shows the emf between the two ends of the coil.', show: 'gen.trace', play: 'gen.start', playDelay: 1 },
        { say: 'The emf is greatest when the plane of the coil lies along the field. The sides are then cutting straight across the field lines.', play: 'gen.a' },
        { say: 'A quarter of a turn later, the sides are moving along the field lines. They cut none, so the emf is zero.', play: 'gen.b' },
        { say: 'Then each side cuts across the field the other way. So the emf reverses every half turn. This is an alternating emf, and it drives an alternating current.', play: 'gen.c' },
      ],
    },
    {
      chapter: 'Slip rings',
      layout: 'center',
      main: [ac],
      lines: [
        { say: 'How does the current get out of a coil that is turning? Each end of the coil is joined to a metal ring on the axle, called a slip ring. A fixed brush presses on each ring. Here, one ring is drawn inside the other.', show: ['ac', 'ac.lines', 'ac.trace'], play: 'ac.a' },
        { say: 'Each ring always touches the same brush. So the alternating emf reaches the circuit unchanged, and the brushes swap between positive and negative every half turn.', play: 'ac.b' },
        { say: 'This coil has 100 turns, and it makes 50 turns each second. Its emf rises to 10 volts, and one full cycle takes 20 milliseconds. So the frequency is 50 hertz.', play: 'ac.c' },
        { say: 'Now turn the coil twice as fast. The sides cut the field twice as fast, so the greatest emf doubles, to 20 volts. And each cycle takes half the time, so the frequency doubles too, to 100 hertz.', play: 'ac.fast' },
      ],
    },
    {
      chapter: 'Direct current',
      layout: 'center',
      main: [dc],
      lines: [
        { say: 'Replace the slip rings with the split ring of a motor. Each half of the ring is joined to one side of the coil, and the brushes stay where they are.', show: ['dc', 'dc.lines', 'dc.trace'], play: 'dc.a' },
        { say: 'Now the connections swap every half turn, just as the emf reverses. So the output still rises and falls, but it never changes sign. One brush is always positive. This is a direct current generator.', play: 'dc.b' },
      ],
    },
    {
      chapter: 'Where the energy comes from',
      layout: 'center',
      main: [lamp],
      lines: [
        { say: 'Join a lamp across the brushes, and a current flows through the lamp and the coil. Now each side of the coil carries a current in a magnetic field, so the field pushes on it.', show: ['lamp', 'lamp.lines', 'lamp.trace', 'lamp.force'], play: 'lamp.a' },
        { say: 'Watch the arrows. By Lenz\'s law, the forces on the two sides always oppose the turning of the coil.', play: 'lamp.b' },
        { say: 'So a generator is harder to turn when it gives a current. The work done to turn it becomes the electrical energy. A generator changes kinetic energy to electrical energy.', play: 'lamp.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The generator on a bicycle gives a greatest emf of 6.0 V, at a frequency of 30 Hz. The wheel then turns its coil three times as fast. What are the greatest emf and the frequency now?',
          choices: ['2.0 V and 10 Hz', '6.0 V and 90 Hz', '18 V and 30 Hz', '18 V and 90 Hz'],
          answer: 3,
          working: 'The sides of the coil cut the field three times as fast, so the greatest emf is $3 \\times 6.0 = 18$ V. The coil makes three times as many turns each second, so the frequency is $3 \\times 30 = 90$ Hz.',
        },
      ],
      lines: [
        { say: 'Your turn. The generator on a bicycle gives a greatest emf of 6.0 volts, at a frequency of 30 hertz. The wheel then turns its coil three times as fast. What are the greatest emf and the frequency now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The sides of the coil cut the field three times as fast, so the greatest emf is three times 6.0, which is 18 volts. And the coil makes three times as many turns each second, so the frequency is 90 hertz. That is choice D.', show: 'q.answer' },
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
            'A **generator** turns a coil in a magnetic field: kinetic energy becomes electrical energy',
            'The emf is greatest when the sides cut straight across the field, and zero a quarter of a turn later',
            'The emf reverses every half turn, so **slip rings** give an alternating current',
            'A split-ring commutator makes the output direct',
            'Turning the coil faster raises the greatest emf and the frequency together',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A generator turns a coil in a magnetic field, and changes kinetic energy to electrical energy.', show: 'sum.0' },
        { say: 'The emf is greatest when the sides of the coil cut straight across the field, and zero a quarter of a turn later.', show: 'sum.1' },
        { say: 'The emf reverses every half turn, so slip rings give an alternating current.', show: 'sum.2' },
        { say: 'A split-ring commutator makes the output direct.', show: 'sum.3' },
        { say: 'And turning the coil faster raises the greatest emf and the frequency together.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
