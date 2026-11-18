import type { Explainer, MagnetsEl } from '@/video/script.ts';

// Lesson 2.9, first half: the force on a wire that carries a current across a magnetic field. The
// wire is seen end-on in the gap between the poles of a magnet, and the force on it is worked out
// as F = BIL (src/video/magnets.ts), so a wire that is free to move is thrown out of the gap, a
// wire with a weight floats when BIL = mg, and a magnet on a balance reads more when the field
// pushes a fixed wire up.

const CM = { metres: 0.01, symbol: 'cm' };

/** The poles of a magnet seen from one end, 6 cm apart, with a field of 0.30 T between them. */
const gap = { uniform: [0.3, 0] as [number, number], uniformLines: 6, yoke: { faces: [-3, 3] as [number, number], span: [-1.5, 1.5] as [number, number], thick: 2.4 } };

/** A wire that is free to move, with 0.50 m of it in the field: switch on 4.0 A, out of the page, and it is thrown up out of the gap. */
const kick: MagnetsEl = {
  kind: 'magnets',
  id: 'kick',
  view: [-7, 7, -2.7, 2.7],
  height: 438,
  length: CM,
  ...gap,
  yoke: { ...gap.yoke, span: [-1.7, 1.7] },
  forceScale: 70 / 0.6,
  rate: 0.04,
  // The wire starts between two field lines, so that its label is clear of them.
  wires: [{ id: 'w', at: [0, -1.13], amps: 0, metres: 0.5, mass: 0.03, labelAt: 'right' }],
  clips: { on: { phases: [{ dur: 1, amps: { w: 4 } }, { dur: 2.2 }] } },
};

/** The same wire, held in place, with 4.0 A out of the page: the force is up; then the current is reversed. */
const hand: MagnetsEl = {
  kind: 'magnets',
  id: 'hand',
  view: [-7, 7, -2.2, 2.2],
  height: 357,
  length: CM,
  ...gap,
  forceScale: 60 / 0.6,
  wires: [{ id: 'w', at: [0, 0], amps: 4, metres: 0.5, labelAt: 'right' }],
  thumb: ['lines', 'force'],
  clips: { reverse: { phases: [{ dur: 2.5, amps: { w: -4 } }] } },
};

/** The held wire again: 0.30 T, 4.0 A and 0.50 m give 0.60 N; the current is doubled for a moment, and the force doubles. */
const size: MagnetsEl = {
  ...hand,
  id: 'size',
  forceScale: 45 / 0.6,
  wires: [{ id: 'w', at: [0, -0.9], amps: 4, metres: 0.5, labelAt: 'right' }],
  clips: { more: { phases: [{ dur: 2, amps: { w: 8 } }, { dur: 2 }, { dur: 2, amps: { w: 4 } }] } },
};

/** A wire of 20 g, 0.50 m long, on a support in a field of 0.40 T: at 0.98 A the magnetic force equals its weight, and with more it rises. */
const float: MagnetsEl = {
  kind: 'magnets',
  id: 'float',
  view: [-7, 7, -2.2, 2.2],
  height: 357,
  length: CM,
  uniform: [0.4, 0],
  uniformLines: 6,
  yoke: { faces: [-3, 3], span: [-1.6, 1.6], thick: 2.4 },
  g: 9.81,
  forceScale: 60 / 0.1962,
  rate: 0.018,
  wires: [{ id: 'w', at: [0, 0.1], amps: 0, metres: 0.5, mass: 0.02, rests: true, labelAt: 'right' }],
  clips: {
    up: { phases: [{ dur: 5, amps: { w: 0.98 } }] },
    more: { phases: [{ dur: 1.5, amps: { w: 1.2 } }, { dur: 3 }] },
  },
};

/** A U-shaped magnet on a balance that reads 250.00 g, with 10 cm of a fixed wire in its field of 0.050 T: 2.0 A raises the reading by 1.02 g. */
const balance: MagnetsEl = {
  kind: 'magnets',
  id: 'bal',
  view: [-7, 7, -2.75, 2.05],
  height: 390,
  length: CM,
  uniform: [0.05, 0],
  uniformLines: 5,
  yoke: { faces: [-2, 2], span: [-0.7, 1.5], thick: 1.4, base: 0.6 },
  g: 9.81,
  balance: { grams: 250 },
  forceScale: 60 / 0.01,
  wires: [{ id: 'w', at: [0, 0.62], amps: 0, metres: 0.1, labelAt: 'right' }],
  clips: { on: { phases: [{ dur: 3, amps: { w: 2 } }] } },
};

const video: Explainer = {
  id: 'p30-2-9',
  lessonId: 'p30-2-9',
  title: 'The Force on a Wire',
  thumbnail: 'hand',
  summary:
    'A wire that carries a current across a magnetic field is pushed sideways: the motor effect. See a wire thrown out of the gap of a magnet, find the direction of the force with the right hand and its size with F = BIL, float a wire where BIL = mg, and measure a magnetic field with a magnet on a balance.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Force on a Wire', subtitle: 'The motor effect' }],
      lines: [
        { say: 'A magnetic field pushes on a moving charge. A current is a stream of moving charges. So a wire that carries a current across a magnetic field is pushed sideways.', show: 'title' },
        { say: 'This is the motor effect. It turns every electric motor, from the one that buzzes in a phone to the ones that drive a train.' },
      ],
    },
    {
      chapter: 'The motor effect',
      layout: 'center',
      main: [kick],
      lines: [
        { say: 'Here are the two poles of a magnet. The field in the gap between them points from the north pole to the south pole.', show: ['kick', 'kick.lines'] },
        { say: 'A wire lies in the gap. We are looking along the wire, so we see its end. With no current in it, nothing happens.', focus: 'kick.w' },
        { say: 'Now switch on a current of 4 amperes, which comes out of the page towards you. The wire is thrown upward, out of the gap.', show: 'kick.force', play: 'kick.on', playDelay: 4.5 },
        { say: 'The force is at right angles to the current, and at right angles to the field. Once the wire has left the field, the force is gone.' },
      ],
    },
    {
      chapter: 'Which way?',
      layout: 'center',
      main: [hand, { kind: 'text', id: 'rule', md: 'Flat right hand: **thumb** along the current, **fingers** along the field. The **palm** pushes along the force.' }],
      lines: [
        { say: 'Which way is the force? The right-hand rule of the last video still works, because conventional current is the direction in which positive charge moves.', show: ['hand', 'hand.lines'] },
        { say: 'Hold your right hand flat. Point the thumb along the current, and the fingers along the field. The palm pushes in the direction of the force.', show: 'rule' },
        { say: 'Here the wire is held in place. Its current comes out of the page, so the thumb points towards you. The field points right, and so do the fingers. The palm pushes up.', show: 'hand.force' },
        { say: 'Reverse the current, and the force reverses. The same happens if the field is reversed instead. Reverse both, and the force stays as it was.', play: 'hand.reverse' },
      ],
    },
    {
      chapter: 'How large?',
      layout: 'center',
      main: [
        size,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['F = BIL', 'F = 0.30 \\times 4.0 \\times 0.50 = \\opp{0.60\\ \\text{N}}', 'F = BIL\\sin\\theta'],
        },
      ],
      lines: [
        { say: 'How large is the force? It depends on three things: the strength of the field, the current, and the length of wire that is in the field.', show: ['size', 'size.lines', 'size.force'] },
        { say: 'The force is the field strength, times the current, times the length. F equals B I L.', show: 'm.0' },
        { say: 'Double the current, and the force doubles.', play: 'size.more', wait: 4 },
        { say: 'Here the field is 0.30 teslas, the current is 4.0 amperes, and 0.50 metres of the wire is in the field. So the force is 0.60 newtons.', show: 'm.1' },
        { say: 'L is only the length of wire that is inside the field, however long the whole wire is.' },
        { say: 'If the wire is at an angle to the field, the force is B I L sine theta. A wire that lies along the field feels no force at all.', caption: 'If the wire is at an angle to the field, the force is BIL sin θ. A wire that lies along the field feels no force at all.', show: 'm.2' },
      ],
    },
    {
      chapter: 'A wire that floats',
      layout: 'center',
      main: [
        float,
        { kind: 'math', id: 'f', size: 'md', lines: ['BIL = mg', 'I = \\dfrac{mg}{BL} = \\dfrac{0.020 \\times 9.81}{0.40 \\times 0.50} = \\thc{0.98\\ \\text{A}}'] },
      ],
      lines: [
        { say: 'A wire also has a weight. This one has a mass of 20 grams, and it rests on a support between the poles.', show: ['float', 'float.lines', 'float.weight'] },
        { say: 'Switch on a current, and the magnetic force pushes the wire up. Raise the current, and the force grows, until it is as large as the weight.', show: 'float.force', play: 'float.up', playDelay: 1.5 },
        { say: 'Now the wire floats. The magnetic force balances its weight: B I L equals m g.', show: 'f.0' },
        { say: 'So the current is m g, divided by B L. That is 0.020 times 9.81, divided by 0.40 times 0.50, which is 0.98 amperes.', show: 'f.1' },
        { say: 'With a little more current than that, the wire rises off its support.', hide: 'f', play: 'float.more' },
      ],
    },
    {
      chapter: 'Measuring a field',
      layout: 'center',
      main: [
        balance,
        { kind: 'math', id: 'b', size: 'md', lines: ['F = mg = 0.00102 \\times 9.81 = \\opp{0.0100\\ \\text{N}}', 'B = \\dfrac{F}{IL} = \\dfrac{0.0100}{2.0 \\times 0.10} = \\brand{0.050\\ \\text{T}}'] },
      ],
      lines: [
        { say: 'The same force can measure a magnetic field. Stand a magnet on a balance, and hold a wire in the gap between its poles. The wire is fixed, so it cannot move.', show: ['bal', 'bal.lines'] },
        { say: "Switch on a current of 2.0 amperes. The field pushes the wire up. By Newton's third law, the wire pushes the magnet down with an equal force, so the reading rises.", show: 'bal.force', play: 'bal.on', playDelay: 2.5 },
        { say: 'It rises by 1.02 grams. The weight of 1.02 grams is 0.00102 kilograms times 9.81, which is 0.0100 newtons. That is the force.', show: 'b.0' },
        { say: 'Ten centimetres of the wire is in the field. So B is F divided by I L: 0.0100, divided by 2.0 times 0.10. The field is 0.050 teslas.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A straight wire 0.25 m long carries a current of 3.0 A at right angles to a magnetic field of 0.20 T. What is the size of the force on it?',
          choices: ['0.017 N', '2.4 N', '3.75 N', '0.15 N'],
          answer: 3,
          working: '$F = BIL = 0.20 \\times 3.0 \\times 0.25 = 0.15$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A straight wire 0.25 metres long carries a current of 3.0 amperes, at right angles to a magnetic field of 0.20 teslas. What is the size of the force on it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Multiply the field, the current and the length. 0.20, times 3.0, times 0.25, is 0.15 newtons. That is choice D.', show: 'q.answer' },
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
            'A wire that carries a current **across** a magnetic field is pushed: the motor effect',
            '$F = BIL$, where $L$ is the length of wire inside the field',
            'Right hand: **thumb** current, **fingers** field, **palm** force',
            'Reverse the current or the field, and the force reverses',
            'A wire floats when $BIL = mg$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A wire that carries a current across a magnetic field is pushed sideways. That is the motor effect.', show: 'sum.0' },
        { say: 'The force is B I L, where L is the length of wire inside the field.', show: 'sum.1' },
        { say: 'For the direction, use a flat right hand. The thumb is the current, the fingers are the field, and the palm is the force.', show: 'sum.2' },
        { say: 'Reverse the current or the field, and the force reverses.', show: 'sum.3' },
        { say: 'And a wire floats when the magnetic force equals its weight: B I L equals m g.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
