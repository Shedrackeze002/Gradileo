import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.3, first half: electric field strength. The field lines are followed along the field of
// the charge in the picture, and every force and field strength on screen is worked out from the
// charges, the field and the distance (src/video/charges.ts), so the arrows change as the law says
// when a test charge is carried to another place.

/** A charge and its field, with a small test charge carried round it: the force follows the field lines. */
const around: ChargesEl = {
  kind: 'charges',
  id: 'space',
  view: [-0.75, 0.75, -0.343, 0.343],
  height: 520,
  plain: true,
  pulls: ['t'],
  forceScale: 100,
  bodies: [
    { id: 'q', charge: 4, x: 0, label: 'Q' },
    { id: 't', charge: 1, x: 0.22, y: 0, test: true },
  ],
  poster: 'tour',
  thumb: ['lines', 'force'],
  clips: {
    // It passes above and below the charge no nearer than 0.17 m, where its arrow just fits under the edge of the picture.
    tour: {
      phases: [
        { dur: 1.4, to: { t: [0.62, 0] } },
        { dur: 1.4, to: { t: [0.36, 0.17] } },
        { dur: 1.8, to: { t: [-0.3, 0.17] } },
        { dur: 1.4, to: { t: [-0.62, 0] } },
        { dur: 1.4, to: { t: [-0.3, -0.17] } },
        { dur: 1.6, to: { t: [0.2, -0.1] } },
      ],
    },
  },
};

/** A test charge of +2.0 μC in a uniform field: the force on it is 0.030 N to the east, so the field is 15 000 N/C. */
const measure: ChargesEl = {
  kind: 'charges',
  id: 'probe',
  view: [-0.5, 0.5, -0.1, 0.1],
  height: 230,
  decimals: 1,
  forceFigures: 2,
  uniform: { field: 15000, lines: 5 },
  bodies: [{ id: 't', charge: 2, x: -0.12, test: true }],
  clips: {},
};

/** A particle of charge −e in a field of 2500 N/C that points north; then one of charge +e in its place. */
const electron: ChargesEl = {
  kind: 'charges',
  id: 'probe',
  view: [-0.8, 0.8, -0.28, 0.28],
  height: 400,
  unit: 'e',
  forceFigures: 2,
  forceScale: 110 / 4e-16,
  uniform: { field: 2500, angle: 90, lines: 9 },
  bodies: [{ id: 't', charge: -1, x: 0, test: true, labelAt: 'right' }],
  clips: { swap: { phases: [{ dur: 1.6, charge: { t: 1 } }] } },
};

/** The lesson's sphere of +4.0 μC, and a point P that starts 0.50 m from it and moves to 1.0 m. */
const sphere: ChargesEl = {
  kind: 'charges',
  id: 'point',
  view: [-0.36, 1.44, -0.16, 0.13],
  height: 250,
  decimals: 1,
  notation: 'sci',
  spans: [['q', 'p']],
  bodies: [
    { id: 'q', charge: 4, x: 0, label: 'Q' },
    { id: 'p', charge: 0, x: 0.5, test: true, label: 'P' },
  ],
  clips: { twice: { phases: [{ dur: 2.6, to: { p: 1 } }] } },
};

const video: Explainer = {
  id: 'p30-2-3',
  lessonId: 'p30-2-3',
  title: 'Electric Field Strength',
  thumbnailTitle: 'Electric Fields',
  thumbnail: 'space',
  summary:
    'A charge sets up an electric field in the space around it, and any other charge in the field feels a force. Measure a field with a test charge (E = F ÷ q), find the force on a charge in a field (F = qE), and work out the field of a point charge (E = kQ ÷ r²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Electric Field Strength', subtitle: 'How one charge reaches another' }],
      lines: [
        { say: 'Two charges push or pull on each other without touching. So how does one charge know that the other is there?', show: 'title' },
        { say: 'Michael Faraday had an answer. A charge changes the space around it. It sets up an electric field.' },
      ],
    },
    {
      chapter: 'A field around a charge',
      layout: 'center',
      main: [around],
      lines: [
        { say: 'Here is a positive charge, Q. Its electric field reaches out in every direction. These lines show which way the field points.', show: ['space', 'space.lines'] },
        { say: 'Now put a small positive test charge anywhere in the field. It feels a force. Watch the force as the test charge moves around.', show: 'space.force', play: 'space.tour', playDelay: 4.5 },
        { say: 'Near the charge the force is strong, and far away it is weak. And everywhere, it points along the field lines.' },
      ],
    },
    {
      chapter: 'Measuring a field',
      layout: 'center',
      main: [measure, { kind: 'math', id: 'm', size: 'md', lines: ['E = \\dfrac{F}{q}', 'E = \\dfrac{0.030}{2.0 \\times 10^{-6}} = \\brand{15\\,000\\ \\text{N/C}}'] }],
      lines: [
        { say: 'To measure a field, put a small positive test charge in it, and measure the force on the charge.', show: ['probe', 'probe.lines', 'probe.charge', 'probe.force'] },
        { say: 'The electric field strength, E, is the force on each coulomb of charge: E equals F over q. It is measured in newtons per coulomb.', show: 'm.0' },
        { say: 'This test charge of 2.0 microcoulombs feels a force of 0.030 newtons, to the east. Divide the force by the charge, and the field is 15,000 newtons per coulomb.', show: ['m.1', 'probe.field'] },
        { say: 'The field is a vector. Its direction is the direction of the force on a positive charge, so this field points east.', focus: 'probe.t' },
      ],
    },
    {
      chapter: 'The force on a charge',
      layout: 'center',
      main: [electron, { kind: 'math', id: 'f', size: 'md', lines: ['F = qE = 1.60 \\times 10^{-19} \\times 2500 = \\opp{4.0 \\times 10^{-16}\\ \\text{N}}'] }],
      lines: [
        { say: 'Once the field is known, the force on any charge in it is F equals q E. This field is 2,500 newtons per coulomb, to the north. Put an electron in it.', show: ['probe', 'probe.lines', 'probe.charge', 'probe.field'] },
        { say: 'The size of the force is the elementary charge times 2,500, which is 4.0 times ten to the negative sixteen newtons.', show: 'f.0' },
        { say: 'But an electron is negative, so the force on it is opposite to the field. It is pushed to the south.', show: 'probe.force' },
        { say: 'Swap it for a proton, and the force turns round. A positive charge is pushed along the field, and a negative charge against it.', play: 'probe.swap', playDelay: 1 },
      ],
    },
    {
      chapter: 'The field of a point charge',
      layout: 'center',
      main: [
        sphere,
        {
          kind: 'math',
          id: 'e',
          size: 'md',
          lines: ['E = \\dfrac{F}{q} = \\dfrac{kQq}{r^2\\,q} = \\dfrac{kQ}{r^2}', 'E = \\dfrac{8.99 \\times 10^{9} \\times 4.0 \\times 10^{-6}}{0.50^2} = \\brand{1.44 \\times 10^{5}\\ \\text{N/C}}'],
        },
      ],
      lines: [
        { say: 'What is the field of one point charge, Q? Put a test charge, q, at a distance r. Coulomb\'s law gives the force. Divide by q, and the test charge cancels.', show: ['point', 'point.charge', 'point.distance', 'e.0'] },
        { say: 'So the field of a point charge is k Q over r squared. It belongs to the charge that makes it, whether or not anything is there to feel it.' },
        { say: 'This sphere carries positive 4.0 microcoulombs. At the point P, 0.50 metres away, its field is 1.44 times ten to the five newtons per coulomb. It points away from the positive charge.', show: ['e.1', 'point.field'] },
        { say: 'Move P twice as far away, and the field falls to a quarter. Like the force, the field follows an inverse square law.', play: 'point.twice', playDelay: 1 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A test charge of +3.0 μC feels a force of 0.060 N towards the north at a point in an electric field. What is the electric field at that point?',
          choices: ['$1.8 \\times 10^{-7}$ N/C, north', '$5.0 \\times 10^{-5}$ N/C, north', '$2.0 \\times 10^{4}$ N/C, south', '$2.0 \\times 10^{4}$ N/C, north'],
          answer: 3,
          working: '$E = \\dfrac{F}{q} = \\dfrac{0.060}{3.0 \\times 10^{-6}} = 2.0 \\times 10^{4}$ N/C. The test charge is positive, so the field points the way the force does: north.',
        },
      ],
      lines: [
        { say: 'Your turn. A test charge of positive 3.0 microcoulombs feels a force of 0.060 newtons towards the north. What is the electric field at that point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Divide the force by the charge. 0.060 divided by 3.0 times ten to the negative six is 2.0 times ten to the four newtons per coulomb. The test charge is positive, so the field points north too. That is choice D.', show: 'q.answer' },
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
            'A charge sets up an **electric field** in the space around it',
            'Field strength is the force on each coulomb: $E = \\dfrac{F}{q}$, in N/C',
            '$F = qE$: **along** the field for a positive charge, **against** it for a negative one',
            'A point charge: $E = \\dfrac{kQ}{r^2}$, away from positive and towards negative',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A charge sets up an electric field in the space around it, and other charges feel that field.', show: 'sum.0' },
        { say: 'The field strength is the force on each coulomb: E equals F over q, in newtons per coulomb.', show: 'sum.1' },
        { say: 'The force on a charge is q E. It is along the field for a positive charge, and against it for a negative one.', show: 'sum.2' },
        { say: 'And the field of a point charge is k Q over r squared. It points away from a positive charge, and towards a negative one.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
