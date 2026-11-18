import type { Explainer, MagnetsEl } from '@/video/script.ts';

// Lesson 2.7, second half: the magnetic field of a current. The field of each wire is μ₀I ÷ 2πr,
// circling the wire as the right-hand rule says (src/video/magnets.ts), so the compasses round a
// wire turn when the current is switched on or reversed, the field at 2.0 cm from 5 A is
// 5.0 × 10⁻⁵ T, and two rows of wires make the field of a solenoid.

const CM = { metres: 0.01, symbol: 'cm' };
/** The circles of a wire's field are drawn at these distances: each twice the last, because the field halves when the distance doubles. */
const RINGS: Array<[number, number]> = [
  [0.5, 0],
  [1, 0],
  [2, 0],
  [4, 0],
];

/** A wire seen end-on, with four compasses round it and its current still off: the needles point north. */
const oersted: MagnetsEl = {
  kind: 'magnets',
  id: 'o',
  view: [-6, 6, -2.6, 2.6],
  height: 480,
  length: CM,
  // A trace of the Earth's field, far too weak to bend the circles, turns the needles north when there is no current.
  uniform: [0, 1e-9],
  wires: [{ id: 'w', at: [0, 0], amps: 0, labelAt: 'right' }],
  compasses: [
    { id: 'c1', at: [1.5, 0] },
    { id: 'c2', at: [0, 1.5] },
    { id: 'c3', at: [-1.5, 0] },
    { id: 'c4', at: [0, -1.5] },
  ],
  seeds: RINGS,
  clips: { on: { phases: [{ dur: 2.5, amps: { w: 5 } }] } },
};

/** The same wire with 5 A coming out of the page; then the current is reversed. */
const rule: MagnetsEl = {
  ...oersted,
  id: 'wire',
  height: 440,
  view: [-6, 6, -2.35, 2.35],
  uniform: undefined,
  wires: [{ id: 'w', at: [0, 0], amps: 5, labelAt: 'right' }],
  poster: 'hold',
  clips: { hold: { phases: [{ dur: 1 }] }, reverse: { phases: [{ dur: 3, amps: { w: -5 } }] } },
};

/** The field 2.0 cm from 5 A; then at 4.0 cm; then with 10 A. */
const strength: MagnetsEl = {
  kind: 'magnets',
  id: 's',
  view: [-6, 6, -1.6, 1.6],
  height: 300,
  length: CM,
  fieldScale: 64 / 5e-5,
  wires: [{ id: 'w', at: [-3, 0], amps: 5, labelAt: 'left' }],
  probes: [{ id: 'p', at: [-1, 0], label: 'P', labelAt: 'right' }],
  seeds: [
    [-2.5, 0],
    [-2, 0],
    [-1, 0],
  ],
  clips: {
    out: { phases: [{ dur: 2.5, to: { p: [1, 0] } }] },
    more: { phases: [{ dur: 2.5, amps: { w: 10 } }] },
  },
};

/** A solenoid cut through the middle: thirteen turns, coming out of the page along the top and going in along the bottom. */
const turns = (amps: number): MagnetsEl['wires'] =>
  Array.from({ length: 13 }, (_, k) => [
    { id: `t${k}`, at: [-3 + k * 0.5, 0.7] as [number, number], amps, label: '' },
    { id: `b${k}`, at: [-3 + k * 0.5, -0.7] as [number, number], amps: -amps, label: '' },
  ]).flat();
const through: Array<[number, number]> = [-0.36, -0.24, -0.12, 0, 0.12, 0.24, 0.36].map((y) => [0, y]);

const solenoid: MagnetsEl = {
  kind: 'magnets',
  id: 'sol',
  view: [-6, 6, -1.6, 1.6],
  height: 300,
  length: CM,
  wires: turns(2),
  compasses: [
    { id: 'c1', at: [4.7, 0] },
    { id: 'c2', at: [-4.7, 0] },
  ],
  seeds: through,
  clips: {},
};

/** The same coil with a soft iron core: the current is switched on, and later off again. */
const electromagnet: MagnetsEl = {
  kind: 'magnets',
  id: 'em',
  view: [-6, 6, -1.6, 1.6],
  height: 300,
  length: CM,
  wires: turns(0),
  iron: [{ id: 'core', at: [0, 0], long: 5.6, thick: 0.9, cells: [11, 2] }],
  seeds: through,
  clips: {
    on: { phases: [{ dur: 2.5, amps: Object.fromEntries(turns(2)!.map((w) => [w.id, w.amps])), order: { core: 1 } }] },
    off: { phases: [{ dur: 2.5, amps: Object.fromEntries(turns(0)!.map((w) => [w.id, 0])), order: { core: 0 } }] },
  },
};

const video: Explainer = {
  id: 'p30-2-7-b',
  lessonId: 'p30-2-7',
  title: 'The Magnetic Field of a Current',
  thumbnailTitle: 'Field of a Current',
  thumbnail: 'wire',
  summary:
    'An electric current produces a magnetic field. Round a long straight wire the field lines are circles, in the direction given by the right-hand rule, and the field strength is B = μ₀I ÷ 2πr. Wind the wire into a solenoid and the field inside is strong and uniform (B = μ₀NI ÷ L); add an iron core and you have an electromagnet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Magnetic Field of a Current', subtitle: 'Electricity makes magnetism' }],
      lines: [
        { say: 'In eighteen twenty, Hans Christian Oersted switched on a current in a wire, and noticed that a compass needle beside it turned.', caption: 'In 1820, Hans Christian Oersted switched on a current in a wire, and noticed that a compass needle beside it turned.', show: 'title' },
        { say: 'A current produces a magnetic field. It was the first sign that electricity and magnetism are two sides of one thing.' },
      ],
    },
    {
      chapter: 'A wire and a compass',
      layout: 'center',
      main: [oersted],
      lines: [
        { say: 'Here is a long straight wire, seen end-on, with four compasses round it. With no current in the wire, the needles all point north.', show: ['o', 'o.compass'] },
        { say: 'Now switch on a current that comes straight towards you, out of the page. The needles swing round, and point in a circle round the wire.', play: 'o.on', playDelay: 2.5 },
        { say: 'The field lines of a long straight wire are circles, centred on the wire.', show: 'o.lines' },
        { say: 'Each circle here is twice as far out as the last. The circles are closest together near the wire, where the field is strongest.' },
      ],
    },
    {
      chapter: 'The right-hand rule',
      layout: 'center',
      main: [rule, { kind: 'text', id: 'hand', md: 'Right hand: the **thumb** points along the conventional current, and the **fingers** curl with the field.' }],
      lines: [
        { say: 'Which way does the field go round? Use your right hand. Grip the wire with your thumb pointing along the conventional current. Your fingers curl round the wire the way the field points.', show: ['wire', 'wire.compass', 'wire.lines', 'hand'] },
        { say: 'The dot means that this current comes out of the page, towards you. So your thumb points towards you, and your fingers curl anticlockwise.' },
        { say: 'Reverse the current, and the field circles the other way. The cross means that the current now goes into the page.', play: 'wire.reverse', playDelay: 0.5 },
        { say: 'Take care. The thumb follows the conventional current, from positive to negative. Electrons drift the opposite way.' },
      ],
    },
    {
      chapter: 'How strong is the field?',
      layout: 'center',
      main: [
        strength,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['B = \\dfrac{\\mu_0 I}{2\\pi r} \\qquad \\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T·m/A}', 'B = \\dfrac{4\\pi \\times 10^{-7} \\times 5}{2\\pi \\times 0.020} = \\brand{5.0 \\times 10^{-5}\\ \\text{T}}'],
        },
      ],
      lines: [
        { say: 'The field is stronger for a larger current, and weaker further from the wire. B equals mu nought times I, divided by two pi r. Mu nought is a constant, called the permeability of free space.', caption: 'The field is stronger for a larger current, and weaker further from the wire. B = μ₀I ÷ 2πr. μ₀ is a constant, called the permeability of free space.', show: ['s', 's.lines', 'm.0'] },
        { say: 'This wire carries 5 amperes. At the point P, 2.0 centimetres from the wire, the field is 5.0 times ten to the negative five teslas. That is about the same as the field of the Earth.', show: ['s.field', 's.distance', 'm.1'] },
        { say: 'Move twice as far from the wire, and the field is half as strong.', play: 's.out', hide: 'm.1' },
        { say: 'Double the current, and the field doubles.', play: 's.more' },
      ],
    },
    {
      chapter: 'The solenoid',
      layout: 'center',
      main: [
        solenoid,
        {
          kind: 'math',
          id: 'n',
          size: 'md',
          lines: ['B = \\dfrac{\\mu_0 N I}{L}', 'B = \\dfrac{4\\pi \\times 10^{-7} \\times 800 \\times 2}{0.40} = \\brand{5.03 \\times 10^{-3}\\ \\text{T}}'],
        },
      ],
      lines: [
        { say: 'One wire gives a weak field. So wind the wire into a long coil, called a solenoid. Here it is cut through the middle. The current comes out of the page along the top, and goes back in along the bottom.', show: 'sol' },
        { say: 'The fields of all the turns add. Inside the coil, the field is strong and nearly uniform.', show: 'sol.lines' },
        { say: 'Outside, it looks like the field of a bar magnet, with a north pole at one end and a south pole at the other.', show: 'sol.compass' },
        { say: 'Inside a solenoid, B equals mu nought times N I, divided by L. N is the number of turns, and L is the length of the coil in metres.', caption: 'Inside a solenoid, B = μ₀NI ÷ L. N is the number of turns, and L is the length of the coil in metres.', show: 'n.0' },
        { say: 'A solenoid with 800 turns along 40 centimetres carries 2 amperes. The field inside it is 5.03 times ten to the negative three teslas. That is a hundred times the field of the Earth.', show: 'n.1' },
      ],
    },
    {
      chapter: 'The electromagnet',
      layout: 'center',
      main: [electromagnet, { kind: 'text', id: 'more', md: 'Stronger with a larger **current**, more **turns** for each metre, or an **iron core**.' }],
      lines: [
        { say: 'Put a core of soft iron inside the solenoid, and you have an electromagnet.', show: 'em' },
        { say: 'Switch on the current. The field of the coil lines up the domains of the iron, and the field becomes hundreds of times stronger.', show: 'em.lines', play: 'em.on', playDelay: 1 },
        { say: 'An electromagnet is made stronger by a larger current, by more turns for each metre, or by the iron core.', show: 'more' },
        { say: 'And unlike a bar magnet, it can be switched off.', play: 'em.off' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A long straight wire carries a current of 6.0 A. What is the magnetic field strength 3.0 cm from the wire? ($\\mu_0 = 4\\pi \\times 10^{-7}$ T·m/A)',
          choices: ['$4.0 \\times 10^{-5}$ T', '$8.0 \\times 10^{-5}$ T', '$2.5 \\times 10^{-4}$ T', '$1.3 \\times 10^{-3}$ T'],
          answer: 0,
          working: 'Change to metres: $r = 0.030$ m. $B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{4\\pi \\times 10^{-7} \\times 6.0}{2\\pi \\times 0.030} = 4.0 \\times 10^{-5}$ T.',
        },
      ],
      lines: [
        { say: 'Your turn. A long straight wire carries a current of 6.0 amperes. What is the magnetic field strength 3.0 centimetres from the wire? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Change the distance to metres: 0.030. Then mu nought times 6.0, divided by two pi times 0.030, is 4.0 times ten to the negative five teslas. That is choice "A".', caption: 'Change the distance to metres: 0.030. Then μ₀ times 6.0, divided by 2π times 0.030, is 4.0 × 10⁻⁵ teslas. That is choice A.', show: 'q.answer' },
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
            'A **current** produces a magnetic field',
            'Round a straight wire the field lines are **circles**: right-hand rule, thumb along the conventional current',
            'Straight wire: $B = \\dfrac{\\mu_0 I}{2\\pi r}$',
            'Inside a solenoid: $B = \\dfrac{\\mu_0 N I}{L}$',
            'A solenoid with an **iron core** is an electromagnet',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A current produces a magnetic field.', show: 'sum.0' },
        { say: 'Round a straight wire, the field lines are circles. The right-hand rule gives their direction, with the thumb along the conventional current.', show: 'sum.1' },
        { say: 'The field of a long straight wire grows with the current, and falls with the distance.', show: 'sum.2' },
        { say: 'Inside a solenoid, the field is strong and uniform.', show: 'sum.3' },
        { say: 'And a solenoid with an iron core is an electromagnet.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
