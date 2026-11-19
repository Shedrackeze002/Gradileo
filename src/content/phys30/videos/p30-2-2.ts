import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.2, first half: Coulomb's law. Every force on screen is worked out from the charges and
// the distance in the picture (src/video/charges.ts), so the arrows shrink to a quarter when the
// distance doubles and double when a charge doubles, and the two arrows of a pair are always equal.

/** Two charges and the distance between them, not to scale: what the letters of the law stand for. */
const law: ChargesEl = {
  kind: 'charges',
  id: 'two',
  view: [-2.3, 2.3, -0.62, 0.5],
  height: 250,
  plain: true,
  forceScale: 36000,
  bodies: [
    { id: 'a', charge: 1, x: -0.9, label: 'q₁' },
    { id: 'b', charge: 1, x: 0.9, label: 'q₂' },
  ],
  clips: {},
};

/** The lesson's example: +3.0 μC and −5.0 μC with their centres 0.30 m apart pull each other with 1.50 N. */
const example: ChargesEl = {
  kind: 'charges',
  id: 'pair',
  view: [-0.22, 0.52, -0.105, 0.085],
  height: 230,
  decimals: 1,
  bodies: [
    { id: 'a', charge: 3, x: 0 },
    { id: 'b', charge: -5, x: 0.3 },
  ],
  poster: 'hold',
  clips: { hold: { phases: [{ dur: 1 }] } },
};

/** Two charges of +2.0 μC: at twice the distance the force is a quarter, at three times a ninth, and twice the charge doubles it. */
const square: ChargesEl = {
  kind: 'charges',
  id: 'pair',
  view: [-0.3, 0.85, -0.11, 0.09],
  height: 230,
  decimals: 1,
  forceScale: 110,
  bodies: [
    { id: 'a', charge: 2, x: 0 },
    { id: 'b', charge: 2, x: 0.2 },
  ],
  clips: {
    twice: { phases: [{ dur: 2.2, to: { b: 0.4 } }] },
    thrice: { phases: [{ dur: 2.2, to: { b: 0.6 } }] },
    back: { phases: [{ dur: 2.4, to: { b: 0.2 } }, { dur: 1 }, { dur: 2, charge: { b: 4 } }] },
  },
};

/** 2.0 μC and 4.0 μC that repel with 0.90 N: they are 0.283 m apart. */
const find: ChargesEl = {
  kind: 'charges',
  id: 'pair',
  view: [-0.26, 0.54, -0.105, 0.085],
  height: 220,
  decimals: 1,
  figures: 3,
  forceFigures: 2,
  bodies: [
    { id: 'a', charge: 2, x: 0 },
    { id: 'b', charge: 4, x: Math.sqrt((8.99e9 * 2e-6 * 4e-6) / 0.9) },
  ],
  clips: {},
};

/** The proton and the electron of a hydrogen atom, 5.29 × 10⁻¹¹ m apart. */
const hydrogen: ChargesEl = {
  kind: 'charges',
  id: 'atom',
  view: [-4.2e-11, 9.5e-11, -2.3e-11, 1.9e-11],
  height: 250,
  unit: 'e',
  notation: 'sci',
  figures: 3,
  bodies: [
    { id: 'p', charge: 1, x: 0, label: 'Proton' },
    { id: 'e', charge: -1, x: 5.29e-11, label: 'Electron' },
  ],
  clips: {},
};

const video: Explainer = {
  id: 'p30-2-2',
  lessonId: 'p30-2-2',
  title: "Coulomb's Law",
  thumbnail: 'pair',
  summary:
    "Coulomb's law gives the electric force between two charges: F = kq₁q₂ ÷ r². Work through an example, watch the force fall to a quarter when the distance doubles, find a distance from a force, and see how strong the force is inside a hydrogen atom.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: "Coulomb's Law", subtitle: 'The force between two charges' }],
      lines: [
        {
          say: 'In seventeen eighty-five, Charles Coulomb hung a small charged ball on a fine thread. He brought a second charged ball near it, and measured how far the thread twisted.',
          caption: 'In 1785, Charles Coulomb hung a small charged ball on a fine thread. He brought a second charged ball near it, and measured how far the thread twisted.',
          show: 'title',
        },
        { say: 'From that twist, he found how the force between two charges depends on their sizes, and on the distance between them.' },
      ],
    },
    {
      chapter: "Coulomb's law",
      layout: 'center',
      main: [law, { kind: 'math', id: 'f', size: 'lg', lines: ['F = \\dfrac{kq_1q_2}{r^2}', 'k = 8.99 \\times 10^{9}\\ \\text{N·m}^2/\\text{C}^2'] }],
      lines: [
        { say: 'Here are two point charges, q one and q two. The distance between their centres is r.', show: ['two', 'two.distance'] },
        { say: 'The electric force between them is proportional to the product of the charges, and inversely proportional to the square of the distance.', show: ['f.0', 'two.force'] },
        { say: 'The charges are in coulombs, and the distance is in metres. The letter k is Coulomb\'s constant: 8.99 times ten to the nine.', show: 'f.1' },
        { say: 'The force acts along the line that joins the charges. By Newton\'s third law, each charge feels a force of the same size, in opposite directions.', focus: ['two.a', 'two.b'] },
      ],
    },
    {
      chapter: 'A worked example',
      layout: 'center',
      main: [
        example,
        { kind: 'math', id: 'w', size: 'md', lines: ['F = \\dfrac{kq_1q_2}{r^2} = \\dfrac{8.99 \\times 10^{9} \\times 3.0 \\times 10^{-6} \\times 5.0 \\times 10^{-6}}{0.30^2}', 'F = \\dfrac{0.13485}{0.09} = \\opp{1.50\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'Two small spheres carry charges of positive 3.0 microcoulombs and negative 5.0 microcoulombs. Their centres are 0.30 metres apart. What force does each exert on the other?', show: ['pair', 'pair.charge', 'pair.distance'] },
        { say: 'Use the sizes of the charges, without their signs, and change them to coulombs. A microcoulomb is ten to the negative six coulombs.', show: 'w.0' },
        { say: 'Watch the distance. It must be in metres, and it must be squared. 0.30 squared is 0.09. So the force is 1.50 newtons.', show: 'w.1' },
        { say: 'Now use the signs for the direction. The charges are unlike, so the force is an attraction. Each sphere pulls the other with 1.50 newtons.', show: 'pair.force' },
      ],
    },
    {
      chapter: 'An inverse square law',
      layout: 'center',
      main: [
        square,
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'The force is multiplied by'],
          rows: [
            ['The distance is doubled', '$\\tfrac{1}{4}$'],
            ['The distance is tripled', '$\\tfrac{1}{9}$'],
            ['One charge is doubled', '$2$'],
          ],
        },
      ],
      lines: [
        { say: 'Because the distance is squared, the force changes quickly with distance. These two charges are 0.20 metres apart, and each pushes the other with 0.899 newtons.', show: ['pair', 'pair.charge', 'pair.distance', 'pair.force'] },
        { say: 'Move one to twice the distance. The force falls to a quarter of what it was.', play: 'pair.twice', show: 't.0' },
        { say: 'At three times the distance, it is only one ninth.', play: 'pair.thrice', show: 't.1' },
        { say: 'Bring the charge back, and then double it. The force doubles too, because the force is proportional to each charge.', play: 'pair.back', show: 't.2' },
      ],
    },
    {
      chapter: 'Finding the distance',
      layout: 'center',
      main: [find, { kind: 'math', id: 'r', size: 'md', lines: ['r = \\sqrt{\\dfrac{kq_1q_2}{F}} = \\sqrt{\\dfrac{8.99 \\times 10^{9} \\times 2.0 \\times 10^{-6} \\times 4.0 \\times 10^{-6}}{0.90}}', 'r = \\sqrt{0.0799} = \\thc{0.283\\ \\text{m}}'] }],
      lines: [
        { say: 'The law can be turned round. Two point charges of 2.0 and 4.0 microcoulombs repel each other with a force of 0.90 newtons. How far apart are they?', show: ['pair', 'pair.charge', 'pair.force'] },
        { say: 'Rearrange the law for r. Multiply k by the two charges, divide by the force, and take the square root.', show: 'r.0' },
        { say: 'That gives the square root of 0.0799, which is 0.283 metres.', show: ['r.1', 'pair.distance'] },
      ],
    },
    {
      chapter: 'Inside a hydrogen atom',
      layout: 'center',
      main: [hydrogen, { kind: 'text', id: 'g', md: 'Gravity only attracts. The electric force can attract or repel, and here it is about $10^{39}$ times stronger.' }],
      lines: [
        { say: 'In a hydrogen atom, the electron is about 5.29 times ten to the negative eleven metres from the proton. Each has a charge of size e.', show: ['atom', 'atom.charge', 'atom.distance'] },
        { say: 'Coulomb\'s law gives a force of 8.22 times ten to the negative eight newtons. That is tiny, but the mass of the electron is tinier still, so it gives the electron a huge acceleration.', show: 'atom.force' },
        { say: 'The law has the same form as Newton\'s law of gravitation. But gravity only attracts, and it is far weaker. In this atom, the electric force is about ten to the thirty-nine times the gravitational force.', show: 'g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two point charges of +4.0 μC and +2.0 μC are 0.20 m apart. What force does each exert on the other? ($k = 8.99 \\times 10^{9}\\ \\text{N·m}^2/\\text{C}^2$)',
          choices: ['0.36 N, a repulsion', '1.8 N, a repulsion', '1.8 N, an attraction', '3.6 N, an attraction'],
          answer: 1,
          working: '$F = \\dfrac{8.99 \\times 10^{9} \\times 4.0 \\times 10^{-6} \\times 2.0 \\times 10^{-6}}{0.20^2} = \\dfrac{0.0719}{0.04} = 1.8$ N. Both charges are positive, so they repel.',
        },
      ],
      lines: [
        { say: 'Your turn. Two point charges of positive 4.0 microcoulombs and positive 2.0 microcoulombs are 0.20 metres apart. What force does each exert on the other? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'k times the two charges is 0.0719. Divide by 0.20 squared, which is 0.04, to get 1.8 newtons. Both charges are positive, so they repel. That is choice B.', show: 'q.answer' },
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
            "**Coulomb's law**: $F = \\dfrac{kq_1q_2}{r^2}$, with $k = 8.99 \\times 10^{9}\\ \\text{N·m}^2/\\text{C}^2$",
            'Charges in **coulombs**, distance in **metres**, and the distance is **squared**',
            'Sizes give the size of the force; **signs** give its direction',
            'Twice the distance gives a **quarter** of the force',
            'Each charge feels a force of the **same size**, in opposite directions',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Coulomb\'s law: the force is k times the two charges, divided by the distance squared.', show: 'sum.0' },
        { say: 'Put the charges in coulombs and the distance in metres, and remember to square the distance.', show: 'sum.1' },
        { say: 'Use the sizes of the charges for the size of the force, and their signs for its direction.', show: 'sum.2' },
        { say: 'It is an inverse square law. Twice the distance gives a quarter of the force.', show: 'sum.3' },
        { say: 'And each of the two charges feels a force of the same size, in opposite directions.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
