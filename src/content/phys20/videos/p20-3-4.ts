import type { Explainer, GravityEl, RampEl } from '@/video/script.ts';

// Lesson 3.4, part 1: work. Every bar of work is measured from the motion itself (src/video/ramp.ts
// adds up the part of each force along the motion, times the distance moved), and the numbers are
// the lesson's: 150 N through 12 m is 1800 J, a pull of 80 N at 30° through 10 m is 693 J, and a
// push of 140 N on a 25 kg crate through 4 m, against a kinetic friction of 98.1 N, does 560 J
// while friction does −392.4 J, which leaves a net work of 167.6 J.

/** The lesson's trolley: a steady push of 150 N in the direction of motion, through 12 m. */
const trolley: RampEl = {
  kind: 'ramp',
  id: 'push',
  angle: 0,
  length: 18,
  bodies: [{ id: 'trolley', mass: 60, label: 'Trolley', x: 1.5, width: 1.7, tone: 'adj' }],
  balanced: ['trolley'],
  work: { rows: ['Push'], range: [0, 2000] },
  height: 300,
  pad: [130, 150],
  forceScale: 0.8,
  velocityScale: 10,
  poster: 'go',
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [{ on: 'trolley', name: 'Push', n: 150 }] }] },
    // 150 N on 60 kg is 2.5 m/s², so 12 m takes √(2 × 12 ÷ 2.5) seconds. The clip ends there.
    go: { phases: [{ dur: Math.sqrt((2 * 12) / 2.5), slow: 1.5, forces: [{ on: 'trolley', name: 'Push', n: 150 }] }] },
  },
};

/** The lesson's sled: a rope pulls with 80 N at 30° above the ground, through 10 m. */
const PULL = { on: 'sled', name: 'Pull', n: 80, angle: 30 };
const sled: RampEl = {
  kind: 'ramp',
  id: 'sled',
  angle: 0,
  length: 14,
  bodies: [{ id: 'sled', mass: 20, label: 'Sled', x: 1.5, width: 1.5, tone: 'adj' }],
  balanced: ['sled'],
  work: { rows: ['Pull'], range: [0, 800] },
  height: 320,
  pad: [150, 150],
  forceScale: 1.6,
  velocityScale: 10,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [PULL] }] },
    // The part of the pull along the ground is 80 cos 30° = 69.3 N, so the sled gains 3.46 m/s each second.
    go: { phases: [{ dur: Math.sqrt((2 * 10) / ((80 * Math.cos(Math.PI / 6)) / 20)), slow: 1.8, forces: [PULL] }] },
  },
};

/** The lesson's crate: 25 kg on a floor with a coefficient of kinetic friction of 0.4. */
const crate: RampEl = {
  kind: 'ramp',
  id: 'crate',
  angle: 0,
  length: 10,
  friction: [0.45, 0.4],
  bodies: [{ id: 'crate', mass: 25, label: '25 kg', x: 3, width: 1.2, tone: 'theta' }],
  work: { rows: ['Push', 'Friction', 'Normal force', 'Net'], range: [-400, 600] },
  height: 420,
  pad: [190, 230],
  forceScale: 0.4,
  velocityScale: 14,
  clips: {
    // 80 N is less than the greatest static friction (0.45 × 245 = 110 N): nothing moves.
    stuck: { phases: [{ dur: 3, forces: [{ on: 'crate', name: 'Push', n: 80 }] }] },
    // 140 N against 98.1 N of friction is 1.676 m/s², so 4 m takes √(2 × 4 ÷ 1.676) seconds.
    go: { phases: [{ dur: Math.sqrt((2 * 4) / ((140 - 0.4 * 25 * 9.81) / 25)), slow: 2, forces: [{ on: 'crate', name: 'Push', n: 140 }] }] },
  },
};

/** A satellite in a circular orbit: the pull of gravity is always at right angles to its motion. */
const orbit: GravityEl = {
  kind: 'gravity',
  id: 'orbit',
  bodies: [
    { id: 'planet', mass: 6.0e24, label: 'Planet', x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 's', mass: 800, label: '', x: 9.0e6, size: 8, orbit: true, tone: 'opp' },
  ],
  view: [-12.6e6, 12.6e6, -12.6e6, 12.6e6],
  notation: 'sci',
  rate: 900,
  pulls: ['s'],
  forceScale: 0.016,
  velocityScale: 0.011,
  height: 500,
  clips: { round: { phases: [{ dur: 9, fly: true }] } },
};

const video: Explainer = {
  id: 'p20-3-4',
  lessonId: 'p20-3-4',
  title: 'Work',
  thumbnail: 'crate',
  summary:
    'In physics, a force does work only when the object moves, and only the part of the force along the motion counts. See work build up as a trolley is pushed, find the work done by a pull at an angle, and watch friction do negative work while the normal force does none.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Work', subtitle: 'When does a force do work?' }],
      lines: [
        { say: 'In everyday speech, work is anything that tires you out. In physics, the word has a much narrower meaning.', show: 'title' },
        { say: 'A force does work only when the object it acts on moves. And only the part of the force along the motion counts.' },
      ],
    },
    {
      chapter: 'Force times displacement',
      layout: 'center',
      main: [trolley, { kind: 'math', id: 'w', size: 'md', lines: ['\\thc{W = Fd}', 'W = 150 \\times 12 = \\opp{1800\\ \\text{J}}'] }],
      lines: [
        { say: 'A worker pushes a trolley with a steady force of 150 newtons, in the direction that the trolley moves.', show: ['push', 'push.work'], play: 'push.ready' },
        { say: 'Watch the work build up as the trolley moves. Every metre adds another 150 joules.', show: 'push.distance', play: 'push.go' },
        { say: 'When the force points along the motion, the work is the force times the displacement: W equals F d. Work is measured in joules, and one joule is one newton metre.', show: 'w.0' },
        { say: 'Here, 150 newtons times twelve metres is 1,800 joules.', show: 'w.1' },
      ],
    },
    {
      chapter: 'A force at an angle',
      layout: 'center',
      main: [sled, { kind: 'math', id: 'a', size: 'md', lines: ['\\thc{W = Fd\\cos\\theta}', 'W = 80 \\times 10 \\times \\cos 30^\\circ = \\opp{693\\ \\text{J}}'] }],
      lines: [
        { say: 'Now a rope pulls a sled with 80 newtons, at thirty degrees above the ground. The sled can only move along the ground. So which part of the pull does the work?', show: 'sled', play: 'sled.ready' },
        { say: 'Split the pull into two parts. The part along the ground is 80 cos thirty degrees, which is 69.3 newtons. The part that points up is forty newtons.', show: 'sled.components' },
        { say: 'Only the part along the ground does work. The upward part does none, because the sled does not move upwards.', show: ['sled.work', 'sled.distance'], play: 'sled.go' },
        { say: 'So the full formula is W equals F d cos theta, where theta is the angle between the force and the displacement.', show: 'a.0' },
        { say: 'For the sled: 80, times ten, times cos thirty degrees, is 693 joules. Do not multiply the whole 80 newtons by the distance.', show: 'a.1' },
      ],
    },
    {
      chapter: 'Positive, negative and zero',
      layout: 'center',
      main: [crate, { kind: 'math', id: 'n', size: 'md', lines: ['W_{\\text{push}} = 140 \\times 4 = \\opp{560\\ \\text{J}} \\qquad W_f = -98.1 \\times 4 = \\bad{-392.4\\ \\text{J}}', 'W_{\\text{net}} = 560 - 392.4 = \\thc{167.6\\ \\text{J}}'] }],
      lines: [
        { say: 'Here is a crate of 25 kilograms on a rough floor. Push it with 80 newtons, and static friction holds it still. Nothing moves, so no work is done, however tired you become.', show: ['crate', 'crate.friction', 'crate.normal', 'crate.work'], play: 'crate.stuck' },
        { say: 'Now push with 140 newtons, through four metres. Watch the bars. The push points along the motion, so its work is positive.', show: 'crate.distance', play: 'crate.go' },
        { say: 'Friction points against the motion. The angle between them is 180 degrees, and cos 180 is minus one. So the work done by friction is negative: it takes energy away from the crate.' },
        { say: 'The normal force is at right angles to the motion. Cos ninety degrees is zero, so it does no work at all. The same is true of the weight.' },
        { say: 'The push does 140 times four: 560 joules. Friction is 98.1 newtons, so it does minus 392.4 joules.', show: 'n.0' },
        { say: 'The net work is the sum of the work done by every force: 560, minus 392.4, is 167.6 joules.', show: 'n.1' },
      ],
    },
    {
      chapter: 'A force that does no work',
      layout: 'split',
      leftWidth: 500,
      left: [orbit],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Angle', 'Work'],
          rows: [
            ['less than $90^\\circ$', 'positive'],
            ['exactly $90^\\circ$', 'zero'],
            ['more than $90^\\circ$', 'negative'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a force that never does any work. A satellite moves in a circular orbit, and gravity pulls it towards the planet all the time.', show: ['orbit', 'orbit.orbit', 'orbit.force', 'orbit.velocity'], play: 'orbit.round' },
        { say: 'But the pull is always at right angles to the motion. So gravity does no work on the satellite, and its speed never changes.' },
        { say: 'So the sign of the work depends on the angle. Less than ninety degrees, and the work is positive. Exactly ninety degrees, and it is zero. More than ninety degrees, and it is negative.', show: ['t', 't.0', 't.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rope pulls a box along level ground with a force of 50 N, at $60^\\circ$ above the horizontal. How much work does the rope do as the box moves 8 m?',
          choices: ['$400\\ \\text{J}$', '$200\\ \\text{J}$', '$346\\ \\text{J}$', '$0\\ \\text{J}$'],
          answer: 1,
          working: '$W = Fd\\cos\\theta = 50 \\times 8 \\times \\cos 60^\\circ = 400 \\times 0.5 = 200\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rope pulls a box along level ground with a force of fifty newtons, at sixty degrees above the horizontal. How much work does the rope do as the box moves eight metres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'W equals F d cos theta. Fifty times eight is 400, and cos sixty degrees is one half. So the work is 200 joules. That is choice B. 400 joules is the common mistake, from counting the whole of the force.', show: 'q.answer' },
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
            'Work: $W = Fd\\cos\\theta$, in joules, where $\\theta$ is the angle between the force and the displacement',
            'A force along the motion does **positive** work, and a force against it does **negative** work',
            'A force at right angles to the motion does **no work**, and neither does a force on something that does not move',
            'Net work is the **sum** of the work done by all the forces',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Work is F d cos theta, in joules, where theta is the angle between the force and the displacement.', show: 'sum.0' },
        { say: 'A force along the motion does positive work, and a force against it, like friction, does negative work.', show: 'sum.1' },
        { say: 'A force at right angles to the motion does no work. Neither does a force on something that does not move.', show: 'sum.2' },
        { say: 'And the net work is the sum of the work done by all the forces.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
