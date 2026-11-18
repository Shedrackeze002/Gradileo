import type { Explainer, MagnetsEl } from '@/video/script.ts';

// Lesson 2.7, first half: magnets and their fields. The field of each bar magnet is worked out
// from its two poles (src/video/magnets.ts), so the field lines leave the north pole and curve
// round to the south pole, and every compass needle points along the field where it is.

/** Two bar magnets with their north poles facing: brought together they spring apart; with one turned round they pull together. */
const poles: MagnetsEl = {
  kind: 'magnets',
  id: 'poles',
  view: [-6, 6, -1.45, 1.45],
  height: 270,
  bars: [
    { id: 'a', at: [-3.4, 0], long: 2.2, thick: 0.7, angle: 0 },
    { id: 'b', at: [3.4, 0], long: 2.2, thick: 0.7, angle: 180 },
  ],
  clips: {
    like: {
      phases: [
        { dur: 1.6, to: { a: [-1.6, 0], b: [1.6, 0] } },
        { dur: 1.4, to: { a: [-3.6, 0], b: [3.6, 0] } },
      ],
    },
    unlike: {
      phases: [
        { dur: 1.6, turn: { b: 0 } },
        { dur: 1.8, to: { a: [-1.15, 0], b: [1.15, 0] } },
      ],
    },
  },
};

/** One magnet, and the two that are left when it is cut in half. */
const whole: MagnetsEl = {
  kind: 'magnets',
  id: 'whole',
  view: [-6, 6, -1.1, 1.1],
  height: 200,
  bars: [{ id: 'm', at: [0, 0], long: 4.4, thick: 0.8 }],
  clips: {},
};
const halves: MagnetsEl = {
  kind: 'magnets',
  id: 'halves',
  view: [-6, 6, -1.1, 1.1],
  height: 200,
  bars: [
    { id: 'l', at: [-1.1, 0], long: 2.2, thick: 0.8 },
    { id: 'r', at: [1.1, 0], long: 2.2, thick: 0.8 },
  ],
  clips: { part: { phases: [{ dur: 2, to: { l: [-2.2, 0], r: [2.2, 0] } }] } },
};

/** A bar magnet with its field lines, four compasses round it, and one more that is carried over the top from the north pole to the south pole. */
const field: MagnetsEl = {
  kind: 'magnets',
  id: 'field',
  view: [-6, 6, -2.8, 2.8],
  height: 520,
  bars: [{ id: 'm', at: [0, 0], long: 3.2, thick: 0.9, lines: 16 }],
  compasses: [
    { id: 'c', at: [3.4, 0.6] },
    { id: 'c1', at: [-4.6, -1.7] },
    { id: 'c2', at: [0, -1.9] },
    { id: 'c3', at: [4.6, -1.7] },
  ],
  poster: 'tour',
  clips: {
    tour: {
      phases: [
        { dur: 1.6, to: { c: [2.6, 1.6] } },
        { dur: 1.8, to: { c: [0, 2.0] } },
        { dur: 1.8, to: { c: [-2.6, 1.6] } },
        { dur: 1.6, to: { c: [-3.4, 0.6] } },
      ],
    },
  },
};

/** A piece of iron with its domains pointing every way; a magnet is brought near and they line up. */
const domains: MagnetsEl = {
  kind: 'magnets',
  id: 'dom',
  view: [-6, 6, -1.45, 1.45],
  height: 270,
  bars: [{ id: 'm', at: [-4.7, 0], long: 2.2, thick: 0.7 }],
  iron: [{ id: 'iron', at: [1.6, 0], long: 4.6, thick: 1.5, cells: [9, 3], label: 'Iron' }],
  clips: { near: { phases: [{ dur: 2.5, to: { m: [-2.1, 0] }, order: { iron: 1 } }] } },
};

/** The Earth with the bar magnet that would make its field: the south pole of that magnet is at the top, near the geographic north. */
const earth: MagnetsEl = {
  kind: 'magnets',
  id: 'earth',
  view: [-6, 6, -2.8, 2.8],
  height: 500,
  earth: 1.7,
  bars: [{ id: 'm', at: [0, 0], long: 1.7, thick: 0.5, angle: -90, lines: 16 }],
  compasses: [
    { id: 'c1', at: [-2.7, 0] },
    { id: 'c2', at: [2.7, 0] },
    { id: 'c3', at: [-4.4, 1.2] },
    { id: 'c4', at: [4.4, 1.2] },
    { id: 'c5', at: [-4.4, -1.2] },
    { id: 'c6', at: [4.4, -1.2] },
  ],
  clips: {},
};

const video: Explainer = {
  id: 'p30-2-7',
  lessonId: 'p30-2-7',
  title: 'Magnets and Magnetic Fields',
  thumbnailTitle: 'Magnetic Fields',
  thumbnail: 'field',
  summary:
    'Every magnet has a north pole and a south pole: like poles repel and unlike poles attract. See the magnetic field of a bar magnet with compasses and field lines, why iron is magnetic (its domains line up), and why the magnetic pole near the Earth\'s geographic north is really a south pole.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Magnets and Magnetic Fields', subtitle: 'A third kind of field' }],
      lines: [
        { say: 'A compass needle swings round to point north, wherever on the Earth you stand. Sailors used this for hundreds of years before anyone could explain it.', show: 'title' },
        { say: 'The explanation is a third kind of field. A mass sets up a gravitational field, a charge sets up an electric field, and a magnet sets up a magnetic field.' },
      ],
    },
    {
      chapter: 'Two poles',
      layout: 'center',
      main: [poles, { kind: 'text', id: 'rule', md: '**Like** poles repel. **Unlike** poles attract.' }],
      lines: [
        { say: 'Every magnet has two poles, called north and south. The north pole is the end that points north when the magnet is free to turn.', show: 'poles' },
        { say: 'Bring two north poles together, and they push each other apart. Like poles repel.', show: 'poles.force', play: 'poles.like', playDelay: 0.5 },
        { say: 'Now turn one magnet round, so that a south pole faces a north pole. They pull together. Unlike poles attract.', show: 'rule', play: 'poles.unlike', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Poles come in pairs',
      layout: 'center',
      main: [whole, halves, { kind: 'text', id: 'pairs', md: 'A north pole never exists without a south pole.' }],
      lines: [
        { say: 'What if you cut a magnet in half? You might expect a north pole on its own, and a south pole on its own.', show: 'whole' },
        { say: 'You do not get them. You get two complete magnets, each with both poles.', show: 'halves', play: 'halves.part', playDelay: 1.5 },
        { say: 'Poles always come in pairs. This is one way magnetism differs from electricity, where a positive charge can exist without a negative one.', show: 'pairs' },
      ],
    },
    {
      chapter: 'The magnetic field',
      layout: 'center',
      main: [field],
      lines: [
        { say: 'The space round a magnet holds a magnetic field. Its strength has the symbol B, and it is measured in teslas.', show: 'field' },
        { say: 'The direction of the field at a point is the way the north end of a small compass points there. Carry a compass round the magnet, and its needle turns as it goes.', show: 'field.compass', play: 'field.tour', playDelay: 3.5 },
        { say: 'Field lines show the whole pattern. Outside the magnet, they leave the north pole and curve round to the south pole.', show: 'field.lines' },
        { say: 'The lines are closest together near the poles, where the field is strongest. And they never cross.' },
        { say: 'Inside the magnet the lines carry on, from the south pole back to the north pole. So every magnetic field line is a closed loop. Electric field lines are different: they begin and end on charges.' },
      ],
    },
    {
      chapter: 'Why iron is magnetic',
      layout: 'center',
      main: [domains, { kind: 'text', id: 'ferro', md: 'Iron, nickel and cobalt are **ferromagnetic**: their domains can be lined up.' }],
      lines: [
        { say: 'A magnet attracts iron strongly, but not copper or aluminium. Why? A piece of iron is made of tiny regions called domains, and each domain is a small magnet.', show: 'dom' },
        { say: 'In an ordinary piece of iron, the domains point in all directions, and their fields cancel.' },
        { say: 'Bring a magnet near. Its field turns the domains to point the same way, and the iron becomes a magnet itself.', play: 'dom.near', playDelay: 1 },
        { say: 'This is why a magnet picks up a steel paper clip. And heating a magnet, or hammering it, shakes the domains out of line and weakens it.', show: 'ferro' },
      ],
    },
    {
      chapter: 'The Earth',
      layout: 'center',
      main: [earth, { kind: 'text', id: 'south', md: 'The magnetic pole near the geographic north is a **south** pole.' }],
      lines: [
        { say: 'The Earth behaves as if a huge bar magnet lay inside it. Its field reaches far out into space.', show: ['earth', 'earth.lines'] },
        { say: 'Everywhere on the surface, the north end of a compass needle points along that field, towards the geographic north.', show: 'earth.compass' },
        { say: 'But unlike poles attract. So the pole of the Earth\'s magnet that lies near the geographic north must be a south pole.', show: 'south', focus: 'earth.m' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A small compass is placed just beyond the north pole of a bar magnet, on the line through both poles. Which way does the north end of its needle point?',
          choices: ['Towards the north pole of the magnet', 'At right angles to the magnet', 'It keeps turning and never settles', 'Away from the north pole of the magnet'],
          answer: 3,
          working: 'The field leaves a north pole, and a compass needle points along the field. So the north end of the needle points away from the north pole of the magnet: like poles repel.',
        },
      ],
      lines: [
        { say: 'Your turn. A small compass is placed just beyond the north pole of a bar magnet, on the line through both poles. Which way does the north end of its needle point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The field leaves a north pole, and a compass needle points along the field. So the north end of the needle points away from the north pole of the magnet. That is choice D.', show: 'q.answer' },
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
            '**Like** poles repel and **unlike** poles attract; poles always come in pairs',
            'Magnetic field strength, $B$, is measured in **teslas**',
            'Field lines leave the **north** pole and curve round to the **south** pole, in closed loops',
            'Iron is magnetic because its **domains** can be lined up',
            'The Earth\'s magnetic pole near the geographic north is a **south** pole',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Like poles repel, and unlike poles attract. Poles always come in pairs.', show: 'sum.0' },
        { say: 'Magnetic field strength is measured in teslas.', show: 'sum.1' },
        { say: 'Field lines leave the north pole and curve round to the south pole, and every line is a closed loop.', show: 'sum.2' },
        { say: 'Iron is magnetic because its domains can be lined up.', show: 'sum.3' },
        { say: 'And the Earth\'s magnetic pole near the geographic north is really a south pole.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
