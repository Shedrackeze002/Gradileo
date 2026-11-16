import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.8, part 1: a projectile launched horizontally. Every flight on screen is worked out
// from the launch velocity and g = 9.81 m/s² (src/video/flight.ts): the horizontal velocity never
// changes, and the vertical velocity changes by 9.81 m/s each second, so the arrows and the
// numbers always agree.

const G = 9.81;

/** Two balls leave a ledge 5 m up at the same moment: one dropped, one thrown sideways at 6 m/s. Both land after 1.01 s. */
const pair: FlightEl = {
  kind: 'flight',
  id: 'sim',
  view: [0, 10, 0, 6.2],
  height: 470,
  gravity: G,
  ledge: [1.2, 5],
  tick: 1,
  strobe: 0.2,
  bodies: [
    { id: 'drop', at: [1.5, 5], label: 'Dropped', labelAt: 'right', tone: 'hyp' },
    { id: 'thrown', at: [1.5, 5], label: 'Thrown', tone: 'theta' },
  ],
  poster: 'go',
  clips: { go: { phases: [{ dur: 1.15, slow: 3.5, set: { thrown: [6, 0] }, release: ['drop'], note: 'Slow motion' }] } },
};

/** The thrown ball alone, with the two parts of its velocity. */
const parts: FlightEl = {
  kind: 'flight',
  id: 'sim',
  view: [0, 10, 0, 6.2],
  height: 470,
  gravity: G,
  ledge: [1.2, 5],
  tick: 1,
  strobe: 0.2,
  velocityScale: 10,
  below: 64,
  readout: {},
  bodies: [{ id: 'ball', at: [1.5, 5], v: [6, 0], tone: 'theta' }],
  clips: {
    name: { phases: [{ dur: 4, freeze: true }] },
    // Stopped a moment before the ball lands (at 1.01 s), so that its arrows can still be read.
    go: { phases: [{ dur: 1.005, slow: 4.5, note: 'Slow motion' }] },
    again: { reset: true, phases: [{ dur: 1.005, slow: 4.5, note: 'Slow motion' }] },
  },
};

/** The lesson's package: off a roof 20 m high at 14 m/s. It lands 2.02 s later, 28.3 m from the wall. */
const roof: FlightEl = {
  kind: 'flight',
  id: 'sim',
  view: [-4, 34, 0, 23],
  height: 500,
  gravity: G,
  ledge: [0, 20],
  tick: 5,
  strobe: 0.5,
  bodies: [{ id: 'box', at: [0.4, 20], v: [14, 0], label: 'Package', tone: 'theta' }],
  clips: { go: { phases: [{ dur: 2.2, slow: 2 }] } },
};

/** The lesson's stone: thrown sideways at 6 m/s from a cliff 30 m above the sea. It lands after 2.47 s at 25.0 m/s, 76° below the horizontal. */
const cliff: FlightEl = {
  kind: 'flight',
  id: 'sim',
  view: [-6, 22, 0, 33],
  height: 560,
  below: 60,
  gravity: G,
  ledge: [0, 30],
  tick: 5,
  velocityScale: 5,
  readout: {},
  bodies: [{ id: 'stone', at: [0.4, 30], v: [6, 0], tone: 'theta' }],
  // Stopped a moment before the stone lands (at 2.473 s), with its landing velocity drawn.
  clips: { go: { phases: [{ dur: 2.472, slow: 2 }] } },
};

const video: Explainer = {
  id: 'p20-1-8',
  lessonId: 'p20-1-8',
  title: 'Projectile Motion, Part 1: Launched Horizontally',
  thumbnailTitle: 'Projectile Motion',
  thumbnail: 'sim',
  summary:
    'A ball thrown sideways and a ball dropped from the same height land together. Watch a projectile with its horizontal and vertical velocity arrows drawn separately, see why one never changes while the other grows by 9.81 m/s every second, and use the two motions to find the time of flight, the range and the landing velocity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Projectile Motion', subtitle: 'Part 1: launched horizontally' }],
      lines: [
        { say: 'Drop a coin from the edge of a table, and flick another coin sideways off the edge at the same moment. Which one hits the floor first?', show: 'title' },
        { say: 'The answer is the key to the motion of every thrown, kicked or launched object.' },
      ],
    },
    {
      chapter: 'Dropped and thrown',
      layout: 'center',
      main: [pair, { kind: 'text', id: 'together', size: 'md', md: 'Thrown sideways or dropped, a ball **falls in the same way**. They land **together**.' }],
      lines: [
        { say: 'Here are two balls at the edge of a ledge, five metres above the ground. One will be dropped from rest. The other will be thrown sideways at six metres per second, at the same moment.', show: 'sim' },
        { say: 'Watch them in slow motion, with a mark every fifth of a second.', show: ['sim.strobe', 'sim.trail', 'sim.clock'], play: 'sim.go', playDelay: 3.2 },
        { say: 'They land together. Now look at the marks. At every moment, the two balls are at the same height.', focus: ['sim.drop', 'sim.thrown'] },
        { say: 'Throwing a ball sideways does not change how it falls.', show: 'together', focus: 'sim' },
      ],
    },
    {
      chapter: 'Horizontal and vertical',
      layout: 'center',
      main: [parts, { kind: 'text', id: 'rule', size: 'md', md: '**Horizontal:** constant velocity. **Vertical:** free fall. The two share only the **time**.' }],
      lines: [
        { say: 'Here is the thrown ball again, with its velocity split into two arrows. The blue arrow is its horizontal velocity. An orange arrow will show its vertical velocity.', show: ['sim', 'sim.components', 'sim.readout', 'sim.clock'], play: 'sim.name' },
        { say: 'Watch the two arrows, and the numbers beside the picture.', play: 'sim.go', playDelay: 1.6 },
        { say: 'The blue arrow never changed. No force acts sideways on the ball, so its horizontal velocity stayed at six metres per second.' },
        { say: 'The orange arrow grew steadily. Gravity adds 9.81 metres per second of downward velocity every second, exactly as it does for a ball that is dropped.' },
        { say: 'Watch once more, with one mark that follows the ball along the ground, and another that follows it down the wall.', show: ['sim.shadows', 'sim.strobe', 'sim.trail'], play: 'sim.again', playDelay: 5.4 },
        { say: 'Along the ground, the steps are equal: that is uniform motion. Down the wall, the steps grow: that is free fall. A projectile does both at once, and the only thing the two motions share is the time.', show: 'rule' },
      ],
    },
    {
      chapter: 'Time of flight and range',
      layout: 'split',
      leftWidth: 660,
      left: [roof],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A package slides off a roof **20 m** high at **14 m/s**.' },
        { kind: 'math', id: 'vert', size: 'md', lines: ['\\opp{\\text{Vertical: } d = \\tfrac{1}{2}gt^2}', '\\opp{t = \\sqrt{\\dfrac{2 \\times 20}{9.81}} = 2.02\\ \\text{s}}'] },
        { kind: 'math', id: 'horiz', size: 'md', lines: ['\\adj{\\text{Horizontal: } d_x = v_x t}', '\\adj{d_x = 14 \\times 2.02 = 28.3\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Now a full problem. A package slides off a flat roof, twenty metres high, at fourteen metres per second. How long is it in the air, and how far from the wall does it land?', show: ['sim', 'q'] },
        { say: 'Always split the problem in two. Vertically, the package starts from rest and falls twenty metres. Distance equals half g t squared, so the time is the square root of two times twenty, divided by 9.81. That is 2.02 seconds, the time of flight.', show: 'vert' },
        { say: 'Horizontally, the velocity stays at fourteen metres per second for all of that time. Fourteen times 2.02 is 28.3 metres. That distance is called the range.', show: 'horiz' },
        { say: 'Watch the package, and see where it lands on the ruler.', show: ['sim.trail', 'sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 2.4 },
        { say: 'It lands just short of the thirty metre mark, after about two seconds. The fourteen metres per second was never used in the vertical part. It is a horizontal velocity only.', focus: 'sim.box' },
      ],
    },
    {
      chapter: 'The landing velocity',
      layout: 'split',
      leftWidth: 700,
      left: [cliff],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A stone is thrown sideways at **6 m/s** from a cliff **30 m** above the sea.' },
        { kind: 'math', id: 'land', size: 'md', lines: ['v = \\sqrt{\\adj{6}^2 + \\opp{24.26}^2}', '\\phantom{v} = \\good{25.0\\ \\text{m/s}}'] },
        { kind: 'math', id: 'tilt', size: 'md', lines: ['\\theta = \\tan^{-1}\\!\\left(\\dfrac{\\opp{24.26}}{\\adj{6}}\\right)', '\\phantom{\\theta} = \\good{76.1^\\circ}'] },
      ],
      lines: [
        { say: 'How fast is a projectile moving when it lands? A stone is thrown sideways at six metres per second, from a cliff thirty metres above the sea. Watch its two arrows on the way down.', show: ['sim', 'q', 'sim.components', 'sim.readout', 'sim.trail', 'sim.clock'], play: 'sim.go', playDelay: 8.4 },
        { say: 'Just before it lands, the horizontal part is still six metres per second. The vertical part has grown to 24.3 metres per second.' },
        { say: 'The landing velocity is the two parts added as vectors, the green arrow. Its size comes from Pythagoras: 25.0 metres per second. Its angle comes from the tangent ratio: about seventy-six degrees below the horizontal.', show: ['sim.velocity', 'sim.angle', 'land', 'tilt'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball rolls off a table at 3 m/s and lands 0.40 s later. How far from the foot of the table does it land?',
          choices: ['$0.78\\ \\text{m}$', '$3.9\\ \\text{m}$', '$1.2\\ \\text{m}$', '$7.5\\ \\text{m}$'],
          answer: 2,
          working: 'Horizontally the velocity is constant: $d_x = v_x t = 3 \\times 0.40 = 1.2\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball rolls off a table at three metres per second, and lands 0.40 seconds later. How far from the foot of the table does it land? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Horizontally, the velocity is constant. So the distance is three times 0.40, which is 1.2 metres. That is choice C. Gravity set the time, but it did not change the horizontal velocity.', show: 'q.answer' },
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
            'A projectile moves with **gravity as the only force**',
            'Horizontally the velocity is **constant**: $d_x = v_x t$',
            'Vertically the motion is **free fall**, at $9.81\\ \\text{m/s}^2$',
            'The two motions share only the **time**',
            'Launched horizontally, it starts with **no vertical velocity**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A projectile moves with gravity as the only force.', show: 'sum.0' },
        { say: 'Horizontally, its velocity is constant. Vertically, it is in free fall.', show: ['sum.1', 'sum.2'] },
        { say: 'The two motions share only the time. So use the vertical motion to find the time, and then use that time in the horizontal motion.', show: 'sum.3' },
        { say: 'And a projectile launched horizontally starts with no vertical velocity, like an object dropped from rest. In part two, we launch one at an angle.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
