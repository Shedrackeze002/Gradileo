import type { Explainer, InductionEl, MagnetsEl } from '@/video/script.ts';

// Lesson 2.10, second part: a conductor that moves across a field, and Lenz's law. A rod slides
// along two rails in a field into the page: the emf is BLv, the current is ε ÷ R, and the field
// pushes back on the rod with F = BIL (src/video/induction.ts). A rod that is let go slows down
// under that force, step by step. Between the two, a magnet is pushed at a coil and pulled away,
// and the coil pushes back and pulls back (src/video/magnets.ts).

/** The lesson's rod: rails 0.50 m apart in 0.40 T into the page, joined by 2.0 Ω. The rod is slid to the right at 6.0 m/s. */
const rod: InductionEl = {
  kind: 'induction',
  id: 'rod',
  view: [-1.4, 1.4, -0.41, 0.41],
  height: 330,
  tesla: -0.4,
  rails: { id: 'rails', x: [-1, 1.25], y: [-0.25, 0.25], ohms: 2, rod: -0.75 },
  velocityScale: 110 / 6,
  // One second of video is 0.031 s for the rod.
  rate: 0.031,
  poster: 'go',
  thumb: ['field', 'velocity', 'current', 'charge'],
  // Each time, the rod starts again from the left and crosses in about eight seconds.
  clips: { go: { reset: true, phases: [{ dur: 0.8, speed: 6 }, { dur: 7.2 }] } },
};

/** The same rod, to show the force on it: slid at a steady speed, and then let go. It has a mass of 1.5 g, so it stops in 0.45 m. */
const brake: InductionEl = {
  ...rod,
  id: 'brake',
  view: [-1.4, 1.4, -0.493, 0.493],
  height: 400,
  rails: { id: 'rails', x: [-1, 1.25], y: [-0.25, 0.25], ohms: 2, rod: -0.3, mass: 0.0015 },
  forceScale: 80 / 0.12,
  rate: 0.025,
  poster: undefined,
  thumb: undefined,
  clips: {
    go: { reset: true, phases: [{ dur: 0.6, speed: 6 }, { dur: 6 }] },
    free: { reset: true, phases: [{ dur: 0.6, speed: 6 }, { dur: 1.5 }, { dur: 9, free: true }] },
  },
};

/** A bar magnet pushed towards a coil, and pulled away again: the coil pushes it back, and then pulls it back. */
const lenz: MagnetsEl = {
  kind: 'magnets',
  id: 'lenz',
  view: [-7, 7, -2.6, 2.6],
  height: 422,
  bars: [{ id: 'bar', at: [-4.6, 0.6], long: 4, thick: 1 }],
  pickup: { id: 'coil', at: [2.6, 0.6], long: 3.6, radius: 1.15 },
  clips: {
    in: { phases: [{ dur: 5, to: { bar: [-0.6, 0.6] } }] },
    out: { phases: [{ dur: 5, to: { bar: [-4.6, 0.6] } }] },
  },
};

const video: Explainer = {
  id: 'p30-2-10-b',
  lessonId: 'p30-2-10',
  title: 'Moving Conductors and Lenz\'s Law',
  thumbnailTitle: 'Lenz\'s Law',
  thumbnail: 'rod',
  summary:
    'A conductor that moves across a magnetic field has an emf induced in it: ε = BLv. See a rod slide along two rails and drive a current through a resistor, use Lenz\'s law to find which way an induced current flows, and see why the field always pushes back on the moving rod.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Moving Conductors and Lenz\'s Law', subtitle: 'Which way an induced current flows' }],
      lines: [
        { say: 'An aircraft in flight has a small voltage between its wingtips. Nothing on board makes it. The wings are a conductor, and they are moving across the magnetic field of the Earth.', show: 'title' },
        { say: 'A conductor that moves across a magnetic field has an emf induced in it. And a law found by Heinrich Lenz says which way the current flows.' },
      ],
    },
    {
      chapter: 'A rod on rails',
      layout: 'center',
      main: [
        rod,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\varepsilon = BLv', '\\varepsilon = 0.40 \\times 0.50 \\times 6.0 = \\thc{1.2\\ \\text{V}}', 'I = \\dfrac{\\varepsilon}{R} = \\dfrac{1.2}{2.0} = \\thc{0.60\\ \\text{A}}'] },
      ],
      lines: [
        { say: 'Here is a metal rod, lying across two rails that are 0.50 metres apart. A resistor joins the rails, and a magnetic field of 0.40 teslas points into the page.', show: ['rod', 'rod.field'] },
        { say: 'Slide the rod to the right. The field pushes on the charges inside the moving rod, as it pushes on any moving charge. Positive charge is driven to one end, and the other end is left negative.', show: ['rod.velocity', 'rod.charge'], play: 'rod.go', playDelay: 0.5 },
        { say: 'So the moving rod acts like a battery. Its emf is the field strength, times the length of the rod, times its speed. Epsilon equals B L v.', caption: 'So the moving rod acts like a battery. Its emf is the field strength, times the length of the rod, times its speed. ε = BLv.', show: ['rod.emf', 'm.0'], play: 'rod.go', playDelay: 1.5 },
        { say: 'This rod moves at 6.0 metres per second, so its emf is 0.40, times 0.50, times 6.0, which is 1.2 volts.', show: 'm.1', play: 'rod.go', playDelay: 0.5 },
        { say: 'The emf drives a current round the circuit. 1.2 volts, divided by 2.0 ohms, is 0.60 amperes.', show: ['rod.current', 'm.2'], play: 'rod.go', playDelay: 0.5 },
        { say: 'Faraday\'s law gives the same answer. As the rod moves, the circuit takes in more area, so the flux through it grows, by B L v each second.', caption: 'Faraday\'s law gives the same answer. As the rod moves, the circuit takes in more area, so the flux through it grows, by BLv each second.', show: 'rod.flux', play: 'rod.go', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Lenz\'s law',
      layout: 'center',
      main: [lenz, { kind: 'text', id: 'law', md: '**Lenz\'s law:** an induced current flows in the direction that **opposes the change** that causes it.' }],
      lines: [
        { say: 'Which way does an induced current flow? Lenz\'s law gives the answer. An induced current flows in the direction that opposes the change that causes it.', show: ['lenz', 'lenz.lines', 'law'] },
        { say: 'Push the north pole of a magnet towards the coil. The induced current makes the near end of the coil a north pole, and it pushes the magnet back.', show: ['lenz.current', 'lenz.poles', 'lenz.force'], play: 'lenz.in', playDelay: 1.5 },
        { say: 'Pull the magnet away, and the current reverses. Now the near end is a south pole, and it pulls the magnet back.', play: 'lenz.out', playDelay: 1 },
        { say: 'Either way, you must do work to move the magnet, and that work becomes the electrical energy. If the current helped the change instead, the magnet would speed up by itself, and energy would come from nothing.' },
      ],
    },
    {
      chapter: 'The force on the rod',
      layout: 'center',
      main: [brake, { kind: 'math', id: 'f', size: 'md', lines: ['F = BIL = 0.40 \\times 0.60 \\times 0.50 = \\opp{0.12\\ \\text{N}}'] }],
      lines: [
        { say: 'The rod on the rails obeys the same law. The induced current flows through the rod, and the rod is in a magnetic field, so the field pushes on it. By Lenz\'s law, that force is backwards, against the motion.', show: ['brake', 'brake.field', 'brake.velocity', 'brake.current', 'brake.force'], play: 'brake.go', playDelay: 5.5 },
        { say: 'Its size is B I L. That is 0.40, times 0.60, times 0.50, which is 0.12 newtons. To keep the rod moving at a steady speed, you must push it forwards with the same force.', caption: 'Its size is BIL. That is 0.40, times 0.60, times 0.50, which is 0.12 newtons. To keep the rod moving at a steady speed, you must push it forwards with the same force.', show: 'f.0', play: 'brake.go', playDelay: 4 },
        { say: 'Let go, and the rod slows down and stops. Its kinetic energy has become electrical energy, and then heat in the resistor.', play: 'brake.free' },
        { say: 'A strong magnet dropped down a copper pipe falls slowly for the same reason. It induces currents in the pipe, and their fields oppose its fall.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An aircraft with a wingspan of 40 m flies level at 250 m/s where the vertical part of the Earth\'s magnetic field is $5.0 \\times 10^{-5}$ T. What emf is induced between its wingtips?',
          choices: ['0.0020 V', '0.013 V', '0.50 V', '$2.0 \\times 10^{8}$ V'],
          answer: 2,
          working: 'The wings cut across the vertical field: $\\varepsilon = BLv = 5.0 \\times 10^{-5} \\times 40 \\times 250 = 0.50$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. An aircraft with a wingspan of 40 metres flies level at 250 metres per second, where the vertical part of the Earth\'s magnetic field is 5.0 times ten to the negative five teslas. What emf is induced between its wingtips? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The wings are a conductor that cuts across the vertical field. So the emf is B L v: 5.0 times ten to the negative five, times 40, times 250, which is 0.50 volts. That is choice C.', caption: 'The wings are a conductor that cuts across the vertical field. So the emf is BLv: 5.0 times ten to the negative five, times 40, times 250, which is 0.50 volts. That is choice C.', show: 'q.answer' },
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
            'A conductor of length $L$ that moves at $v$ across a field $B$ has an emf $\\varepsilon = BLv$',
            'The emf drives a current round the circuit: $I = \\dfrac{\\varepsilon}{R}$',
            '**Lenz\'s law**: an induced current opposes the change that causes it',
            'So the field pushes back on the moving conductor, with $F = BIL$',
            'The work done against that force becomes the electrical energy',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A conductor that moves across a magnetic field has an emf induced in it, equal to B L v.', caption: 'Here is what to remember. A conductor that moves across a magnetic field has an emf induced in it, equal to BLv.', show: 'sum.0' },
        { say: 'The emf drives a current round the circuit.', show: 'sum.1' },
        { say: 'Lenz\'s law says that an induced current opposes the change that causes it.', show: 'sum.2' },
        { say: 'So the field pushes back on the moving conductor, with the force B I L.', caption: 'So the field pushes back on the moving conductor, with the force BIL.', show: 'sum.3' },
        { say: 'And the work done against that force becomes the electrical energy.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
