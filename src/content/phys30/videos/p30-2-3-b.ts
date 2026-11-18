import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.3, second half: field lines, and the field of more than one charge. Every line is
// followed step by step along the field of the charges in the picture (src/video/charges.ts), so
// the lines turn round when a charge changes sign, and bend away from each other when two charges
// are alike. The violet arrows at the point P are the fields of the two charges there, worked out
// from E = kQ ÷ r², and the yellow arrow is their vector sum.

/** One charge and its field lines: positive at first, and then negative. */
const one: ChargesEl = {
  kind: 'charges',
  id: 'one',
  view: [-0.9, 0.9, -0.34, 0.34],
  height: 420,
  bodies: [{ id: 'q', charge: 3, x: 0 }],
  clips: { flip: { phases: [{ dur: 3, charge: { q: -3 } }] } },
};

/** Two charges and the lines of their field: unlike at first, and then both positive. */
const two: ChargesEl = {
  kind: 'charges',
  id: 'two',
  view: [-0.9, 0.9, -0.34, 0.34],
  height: 420,
  lines: 16,
  bodies: [
    { id: 'a', charge: 3, x: -0.3 },
    { id: 'b', charge: -3, x: 0.3 },
  ],
  poster: 'hold',
  thumb: ['lines', 'charge'],
  clips: { hold: { phases: [{ dur: 1 }] }, like: { phases: [{ dur: 3.4, charge: { b: 3 } }] } },
};

/** Two parallel plates with opposite charges, and a test charge carried about between them: the field is the same everywhere. */
const plates: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.9, 0.9, -0.34, 0.34],
  height: 420,
  plain: true,
  pulls: ['t'],
  forceScale: 12000,
  plates: { at: [0.22, -0.22], across: 'y', span: [-0.6, 0.6], volts: 2200, lines: 9 },
  bodies: [{ id: 't', charge: 1, x: -0.4, y: 0.08, test: true }],
  clips: {
    tour: {
      phases: [
        { dur: 1.8, to: { t: [0.3, 0.12] } },
        { dur: 1.6, to: { t: [0.42, -0.1] } },
        { dur: 1.8, to: { t: [-0.2, -0.12] } },
      ],
    },
  },
};

/** A (+8.0 μC) and B (+2.0 μC) 0.60 m apart, and the point P half way between them; then B is made negative. */
const sum: ChargesEl = {
  kind: 'charges',
  id: 'pair',
  view: [-0.14, 0.74, -0.095, 0.085],
  height: 250,
  decimals: 1,
  notation: 'sci',
  spans: [
    ['a', 'p'],
    ['p', 'b'],
  ],
  bodies: [
    { id: 'a', charge: 8, x: 0, label: 'A' },
    { id: 'b', charge: 2, x: 0.6, label: 'B' },
    { id: 'p', charge: 0, x: 0.3, test: true, label: 'P' },
  ],
  clips: { flip: { phases: [{ dur: 2.6, charge: { b: -2 } }] } },
};

/** A (+2.0 μC) and B (+8.0 μC) 0.90 m apart: P slides from the middle to the point 0.30 m from A, where the two fields cancel. */
const zero: ChargesEl = {
  kind: 'charges',
  id: 'pair',
  view: [-0.12, 1.02, -0.125, 0.105],
  height: 250,
  decimals: 1,
  notation: 'sci',
  spans: [
    ['a', 'p'],
    ['p', 'b'],
  ],
  bodies: [
    { id: 'a', charge: 2, x: 0, label: 'A' },
    { id: 'b', charge: 8, x: 0.9, label: 'B' },
    { id: 'p', charge: 0, x: 0.45, test: true, label: 'P' },
  ],
  clips: { slide: { phases: [{ dur: 4, to: { p: 0.3 } }] } },
};

const video: Explainer = {
  id: 'p30-2-3-b',
  lessonId: 'p30-2-3',
  title: 'Field Lines and Adding Fields',
  thumbnailTitle: 'Electric Field Lines',
  thumbnail: 'two',
  summary:
    'Field lines are a map of an electric field: they leave positive charges, end on negative ones, never cross, and crowd together where the field is strong. Then add the fields of two charges as vectors, and find the point between two like charges where the field is zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Field Lines and Adding Fields', subtitle: 'A map of the electric field' }],
      lines: [
        { say: 'An electric field fills the space around a charge. To draw it, we use field lines.', show: 'title' },
        { say: 'Each line shows the way that a small positive test charge would be pushed.' },
      ],
    },
    {
      chapter: 'Field lines',
      layout: 'center',
      main: [one],
      lines: [
        { say: 'Here is a positive charge. It pushes a positive test charge away, so its field lines point away from it, in every direction.', show: ['one', 'one.charge', 'one.lines'] },
        { say: 'Now make the charge negative. A negative charge pulls a positive test charge in, so the lines turn round. They point towards it.', play: 'one.flip', playDelay: 1 },
        { say: 'Look at how the lines spread out. Near the charge they are close together, and the field is strong. Far away they are far apart, and the field is weak.', focus: 'one.q' },
      ],
    },
    {
      chapter: 'Two charges',
      layout: 'center',
      main: [two],
      lines: [
        { say: 'Put a positive charge and a negative charge side by side. The lines leave the positive charge, and they end on the negative one.', show: ['two', 'two.charge', 'two.lines'] },
        { say: 'Field lines never cross. The field at a point has only one direction, so only one line can pass through it.' },
        { say: 'Now make both charges positive. The lines of one push away from the lines of the other. And half way between the charges, there is a point with no field at all.', play: 'two.like', playDelay: 1 },
      ],
    },
    {
      chapter: 'A uniform field',
      layout: 'center',
      main: [plates],
      lines: [
        { say: 'Between two large parallel plates with opposite charges, the field lines are straight, parallel and evenly spaced.', show: ['gap', 'gap.lines'] },
        { say: 'This is a uniform field. Carry a test charge around between the plates, and the force on it never changes. The field has the same strength and the same direction everywhere.', show: 'gap.force', play: 'gap.tour', playDelay: 3.5 },
      ],
    },
    {
      chapter: 'Adding fields',
      layout: 'center',
      main: [
        sum,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['E_A = \\dfrac{8.99 \\times 10^{9} \\times 8.0 \\times 10^{-6}}{0.30^2} = \\brand{7.99 \\times 10^{5}\\ \\text{N/C}}', 'E = 7.99 \\times 10^{5} - 2.00 \\times 10^{5} = \\thc{5.99 \\times 10^{5}\\ \\text{N/C}}'],
        },
      ],
      lines: [
        { say: 'Each charge makes its own field, as if the others were not there. The field at a point is the vector sum of them all.', show: ['pair', 'pair.charge', 'pair.distance'] },
        { say: 'Charge "A" is positive 8.0 microcoulombs, and charge B is positive 2.0. The point P is half way between them, 0.30 metres from each. The field of A at P is k Q over r squared: 7.99 times ten to the five newtons per coulomb.', show: 'm.0' },
        { say: 'It points away from A. The field of B is a quarter as large, and it points away from B, the opposite way.', show: 'pair.field' },
        { say: 'So subtract. The net field at P is 5.99 times ten to the five newtons per coulomb, towards B.', show: ['m.1', 'pair.netfield'] },
        { say: 'If B were negative, its field at P would point towards B as well. Then the two fields add.', play: 'pair.flip', hide: 'm.1' },
      ],
    },
    {
      chapter: 'Where the field is zero',
      layout: 'center',
      main: [zero, { kind: 'math', id: 'z', size: 'md', lines: ['\\dfrac{k \\times 2.0}{0.30^2} = \\dfrac{k \\times 8.0}{0.60^2}'] }, { kind: 'text', id: 'near', md: 'The point of zero field is **nearer the smaller charge**.' }],
      lines: [
        { say: 'Between two like charges, there is always one point where the fields cancel. Here "A" is positive 2.0 microcoulombs, B is positive 8.0, and they are 0.90 metres apart.', show: ['pair', 'pair.charge', 'pair.distance', 'pair.field', 'pair.netfield'] },
        { say: 'Slide P towards the smaller charge, and watch the two arrows. At 0.30 metres from A, they are equal and opposite. The field there is zero.', play: 'pair.slide', playDelay: 2.5 },
        { say: 'That point is twice as far from B as it is from A. B has four times the charge, and twice the distance divides its field by four.', show: 'z.0' },
        { say: 'So the point of zero field is always nearer the smaller charge.', show: 'near' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At a point P, the field of charge A is $3.0 \\times 10^{5}$ N/C towards the east, and the field of charge B is $5.0 \\times 10^{5}$ N/C towards the west. What is the net electric field at P?',
          choices: ['$2.0 \\times 10^{5}$ N/C, west', '$2.0 \\times 10^{5}$ N/C, east', '$8.0 \\times 10^{5}$ N/C, west', '$8.0 \\times 10^{5}$ N/C, east'],
          answer: 0,
          working: 'The fields point opposite ways, so subtract: $5.0 \\times 10^{5} - 3.0 \\times 10^{5} = 2.0 \\times 10^{5}$ N/C, in the direction of the larger one, west.',
        },
      ],
      lines: [
        { say: 'Your turn. At a point P, the field of charge A is 3.0 times ten to the five newtons per coulomb, towards the east. The field of charge B is 5.0 times ten to the five, towards the west. What is the net field at P? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The two fields point opposite ways, so subtract them. 5.0 minus 3.0 is 2.0, so the net field is 2.0 times ten to the five newtons per coulomb. It points the way of the larger field, west. That is choice "A".', show: 'q.answer' },
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
            'Field lines point **away from positive** charges and **towards negative** ones',
            'Close lines mean a **strong** field, and lines never **cross**',
            'Between parallel plates the field is **uniform**: the same everywhere',
            'The fields of several charges **add as vectors**',
            'Between two like charges the field is **zero** at one point, nearer the smaller charge',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Field lines point away from positive charges, and towards negative ones.', show: 'sum.0' },
        { say: 'Where the lines are close together the field is strong, and field lines never cross.', show: 'sum.1' },
        { say: 'Between parallel plates the field is uniform. It is the same everywhere.', show: 'sum.2' },
        { say: 'The fields of several charges add as vectors.', show: 'sum.3' },
        { say: 'And between two like charges, the field is zero at one point, which is nearer the smaller charge.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
