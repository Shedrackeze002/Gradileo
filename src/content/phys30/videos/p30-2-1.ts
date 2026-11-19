import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.1, first half: electric charge. Everything that moves here is an electron
// (src/video/charges.ts): the two balls fly apart or together under the Coulomb forces on them,
// the silk takes electrons from the glass rod, and the electrons of a metal sphere lean away from a
// negative rod. The charge written by each body is counted from the electrons on it, so the total
// stays at zero by construction.

/** Two small charged balls, free to move: like charges fly apart, and unlike charges come together. */
const kinds: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-3, 3, -0.8, 0.8],
  height: 300,
  plain: true,
  forceScale: 5000,
  bodies: [
    { id: 'a', charge: 2, x: -0.5, radius: 0.13, mass: 0.02 },
    { id: 'b', charge: 2, x: 0.5, radius: 0.13, mass: 0.02 },
  ],
  poster: 'repel',
  clips: {
    repel: { phases: [{ dur: 1.5, fly: true }] },
    negative: { phases: [{ dur: 1.2, to: { a: -0.5, b: 0.5 }, charge: { a: -2, b: -2 } }, { dur: 0.5 }, { dur: 1.5, fly: true }] },
    unlike: { phases: [{ dur: 1.2, to: { a: -1.1, b: 1.1 }, charge: { a: 2 } }, { dur: 0.5 }, { dur: 2.6, fly: true }] },
  },
};

/** Two atoms with three protons and three electrons each: one electron crosses, and neither is neutral any more. */
const atoms: ChargesEl = {
  kind: 'charges',
  id: 'atoms',
  view: [-4.6, 4.6, -1.75, 1.75],
  height: 400,
  unit: 'e',
  mark: 1,
  bodies: [
    { id: 'left', shape: 'atom', charge: 0, x: -2, radius: 1.2, pairs: 3, labelAt: 'below' },
    { id: 'right', shape: 'atom', charge: 0, x: 2, radius: 1.2, pairs: 3, labelAt: 'below' },
  ],
  clips: { cross: { phases: [{ dur: 2.4, electrons: [{ from: 'left', to: 'right', n: 1 }] }] } },
};

/** A glass rod rubbed with silk: four marks of electrons, 1 nC each, go from the glass to the silk. */
const rub: ChargesEl = {
  kind: 'charges',
  id: 'bench',
  view: [-4.2, 4.2, -2.1, 1.5],
  height: 400,
  unit: 'nC',
  mark: 1,
  bodies: [
    { id: 'rod', shape: 'rod', charge: 0, x: -0.6, y: 0.45, radius: 2.2, thick: 0.34, pairs: 6, label: 'Glass rod' },
    { id: 'silk', shape: 'cloth', charge: 0, x: -1.6, y: -0.62, radius: 1.15, thick: 0.62, pairs: 6, label: 'Silk', labelAt: 'below', tone: 'theta' },
  ],
  poster: 'rub',
  clips: {
    rub: {
      phases: [
        { dur: 0.9, to: { silk: [0.9, -0.62] } },
        { dur: 0.9, to: { silk: [-1.2, -0.62] } },
        { dur: 2.8, to: { silk: [0.5, -0.62] }, electrons: [{ from: 'rod', to: 'silk', n: 4 }] },
        { dur: 1.2, to: { silk: [2.5, -0.75] } },
      ],
    },
  },
};

/** A metal sphere and a negative rod: the electrons of the metal move to the far side, and back. */
const metal: ChargesEl = {
  kind: 'charges',
  id: 'bench',
  view: [-5.3, 3.5, -2.2, 1.7],
  height: 420,
  unit: 'nC',
  mark: 1,
  bodies: [
    { id: 'ball', shape: 'sphere', charge: 0, x: 1.9, y: 0, radius: 1.05, pairs: 7, label: 'Metal sphere' },
    { id: 'rod', shape: 'rod', charge: -4, x: -3.6, y: 0, radius: 1.5, thick: 0.3, pairs: 5, label: 'Plastic rod' },
  ],
  clips: {
    near: { phases: [{ dur: 2.2, to: { rod: -0.95 } }] },
    away: { phases: [{ dur: 2, to: { rod: -3.6 } }] },
  },
};

const video: Explainer = {
  id: 'p30-2-1',
  lessonId: 'p30-2-1',
  title: 'Electric Charge',
  thumbnail: 'bench',
  summary:
    'There are two kinds of electric charge: like charges repel and unlike charges attract. See why only electrons move when an object is charged, count a charge in elementary charges with q = Ne, and watch the electrons of a metal move when a charged rod comes near.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Electric Charge', subtitle: 'What moves when a spark jumps' }],
      lines: [
        { say: 'Pull a wool sweater over your head on a dry day, and your hair stands up. Walk across a carpet, touch a door handle, and a spark jumps.', show: 'title' },
        { say: 'Both happen for the same reason. A few electrons have moved from one object to another. This lesson is about electric charge: what it is, and how we count it.' },
      ],
    },
    {
      chapter: 'Two kinds of charge',
      layout: 'center',
      main: [kinds, { kind: 'text', id: 'rule', size: 'lg', md: 'Like charges [[bad:repel]]. Unlike charges [[good:attract]].' }],
      lines: [
        { say: 'There are two kinds of electric charge. We call them positive and negative. Here are two small balls, and each one carries a positive charge.', show: 'sim' },
        { say: 'Watch what happens when we let them go.', show: 'sim.force', play: 'sim.repel', playDelay: 0.6 },
        { say: 'They push each other apart. Two negative charges do exactly the same.', play: 'sim.negative', playDelay: 2 },
        { say: 'But make one positive and the other negative, and they pull together.', play: 'sim.unlike', playDelay: 0.4 },
        { say: 'So like charges repel, and unlike charges attract.', show: 'rule' },
      ],
    },
    {
      chapter: 'Where charge comes from',
      layout: 'center',
      main: [atoms, { kind: 'text', id: 'only', md: 'The protons stay in the nucleus. Only **electrons** can leave.' }],
      lines: [
        { say: 'Charge comes from inside the atom. The nucleus holds protons, which are positive. Around it move electrons, which are negative.', show: 'atoms' },
        { say: 'A proton and an electron have charges of exactly the same size. Each of these atoms has three of each, so it is neutral.', show: 'atoms.charge' },
        { say: 'In a solid, the protons are locked in place. Only electrons can leave. Watch one cross from the atom on the left to the atom on the right.', show: 'only', play: 'atoms.cross', playDelay: 5 },
        { say: 'The atom that lost an electron is now positive. The atom that gained it is negative.', focus: 'atoms.left' },
      ],
    },
    {
      chapter: 'Only electrons move',
      layout: 'center',
      main: [rub, { kind: 'math', id: 'total', size: 'md', lines: ['\\bad{(+4\\ \\text{nC})} + \\adj{(-4\\ \\text{nC})} = 0'] }],
      lines: [
        { say: 'Now rub a glass rod with a piece of silk. Each red plus is positive charge, which stays where it is. Each blue dot stands for billions of electrons.', show: ['bench', 'bench.charge'] },
        { say: 'As they rub, electrons move from the glass to the silk.', play: 'bench.rub' },
        { say: 'The rod has lost electrons, so it is positive. The silk has gained them, so it is negative. No proton went anywhere.', focus: 'bench.rod' },
        { say: 'Now look at the total. Positive four plus negative four is still zero. Charge is never created or destroyed. It only moves from one object to another. This is the conservation of charge.', show: 'total' },
      ],
    },
    {
      chapter: 'Counting charge',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'lg', lines: ['e = 1.60 \\times 10^{-19}\\ \\text{C}', 'q = Ne'] },
        { kind: 'math', id: 'rod', size: 'md', lines: ['q = 2.5 \\times 10^{10} \\times 1.60 \\times 10^{-19} = \\bad{+4.0 \\times 10^{-9}\\ \\text{C}}', 'N = \\dfrac{q}{e} = \\dfrac{4.8 \\times 10^{-8}}{1.60 \\times 10^{-19}} = \\adj{3.0 \\times 10^{11}\\ \\text{electrons}}'] },
      ],
      lines: [
        { say: 'Charge is measured in coulombs. The charge of one proton is called the elementary charge, e. It is 1.60 times ten to the negative nineteen coulombs. An electron has a charge of the same size, but negative.', show: 'e.0' },
        { say: 'Every charge is a whole number of these. So the charge of an object is q equals N e, where N is the number of electrons it has gained or lost.', show: 'e.1' },
        { say: 'Our glass rod lost twenty-five billion electrons. Multiply that by e, and its charge is 4.0 times ten to the negative nine coulombs. That is positive four nanocoulombs.', show: 'rod.0' },
        { say: 'To go the other way, divide by e. A balloon with a charge of negative 4.8 times ten to the negative eight coulombs carries three hundred billion extra electrons.', show: 'rod.1' },
      ],
    },
    {
      chapter: 'Conductors and insulators',
      layout: 'center',
      main: [metal, { kind: 'text', id: 'two', md: '[[good:Conductor]]: electrons move through all of it. [[opp:Insulator]]: they stay where they are.' }],
      lines: [
        { say: 'In a metal, some electrons are free to move through the whole object. A metal is a conductor. Watch the electrons of this metal sphere as a negative rod comes near.', show: ['bench', 'bench.charge'], play: 'bench.near', playDelay: 7 },
        { say: 'They are pushed to the far side. The sphere is still neutral, but its charge is separated. Take the rod away, and they spread out again.', play: 'bench.away', playDelay: 5.5 },
        { say: 'Plastic, glass and rubber are insulators. They hold their electrons in place. That is why the charges on the rod did not move at all.', show: 'two', focus: 'bench.rod' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plastic comb gains $5.0 \\times 10^{10}$ electrons when it is run through dry hair. What is the charge of the comb? ($e = 1.60 \\times 10^{-19}$ C)',
          choices: ['$+8.0\\ \\text{nC}$', '$+3.2\\ \\text{nC}$', '$-3.2\\ \\text{nC}$', '$-8.0\\ \\text{nC}$'],
          answer: 3,
          working: '$q = Ne = 5.0 \\times 10^{10} \\times 1.60 \\times 10^{-19} = 8.0 \\times 10^{-9}$ C. The comb gained electrons, so its charge is $-8.0$ nC.',
        },
      ],
      lines: [
        { say: 'Your turn. A plastic comb gains fifty billion electrons when it is run through dry hair. What is the charge of the comb? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Fifty billion times e is 8.0 times ten to the negative nine coulombs, which is eight nanocoulombs. The comb gained electrons, so its charge is negative. That is choice D.', show: 'q.answer' },
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
            'Like charges **repel**, and unlike charges **attract**',
            'Only **electrons** move: gain them to be negative, lose them to be positive',
            'Charge comes in whole steps: $q = Ne$, with $e = 1.60 \\times 10^{-19}$ C',
            'Charge is **conserved**: it moves, but the total stays the same',
            'Electrons move through a **conductor** and stay put in an **insulator**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. There are two kinds of charge. Like charges repel, and unlike charges attract.', show: 'sum.0' },
        { say: 'Only electrons move. An object that gains electrons is negative, and one that loses electrons is positive.', show: 'sum.1' },
        { say: 'Charge comes in whole steps of the elementary charge, so q equals N e.', show: 'sum.2' },
        { say: 'Charge is conserved. It moves from one object to another, but the total never changes.', show: 'sum.3' },
        { say: 'And electrons move freely through a conductor, but they stay where they are in an insulator.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
