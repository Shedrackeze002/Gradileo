import type { Explainer, GravityEl } from '@/video/script.ts';

// Lesson 3.3, part 1: orbits and orbital speed. Everything that moves is followed under Newton's
// law of gravitation (src/video/gravity.ts), so the orbits close and the speeds are the lesson's:
// 7.56 × 10³ m/s for a satellite 7.0 × 10⁶ m from the centre of a planet of 6.0 × 10²⁴ kg, and
// 3.27 × 10³ m/s at a height of 6.0 × 10⁵ m above a planet of 6.4 × 10²³ kg and radius 3.4 × 10⁶ m.

const G = 6.67e-11;
const EARTH = 5.97e24;
const R = 6.37e6;
/** The top of Newton's mountain, far higher than any real one, and the speed of a circular orbit from there. */
const TOP = 1.12 * R;
const ROUND = Math.sqrt((G * EARTH) / TOP);

/** Newton's cannon: a ball fired level from a mountain top, faster each time, until it never lands. */
const cannon: GravityEl = {
  kind: 'gravity',
  id: 'cannon',
  bodies: [
    { id: 'earth', mass: EARTH, label: 'Earth', x: 0, radius: R, tone: 'adj' },
    { id: 'ball', mass: 10, label: '', x: 0, y: TOP, size: 7, tone: 'opp' },
  ],
  view: [-2.05 * R, 2.05 * R, -1.42 * R, 1.5 * R],
  mountain: 0.12 * R,
  rate: 400,
  pulls: ['ball'],
  forceScale: 0.75,
  velocityScale: 0.0105,
  height: 540,
  poster: 'orbit',
  clips: {
    slow: { phases: [{ dur: 1.7, fly: true, launch: { ball: [4000, 0] } }] },
    faster: { phases: [{ dur: 2.3, fly: true, launch: { ball: [6000, 0] } }] },
    far: { phases: [{ dur: 5.3, fly: true, launch: { ball: [7200, 0] } }] },
    orbit: { phases: [{ dur: 15, fly: true, launch: { ball: [ROUND, 0] } }] },
    on: { phases: [{ dur: 11.25, fly: true }] },
  },
};

/** The lesson's satellite: 7.0 × 10⁶ m from the centre of a planet of 6.0 × 10²⁴ kg. */
const sat: GravityEl = {
  kind: 'gravity',
  id: 'sat',
  bodies: [
    { id: 'planet', mass: 6.0e24, label: 'Planet', x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 's', mass: 800, label: '', x: 7.0e6, size: 8, orbit: true, tone: 'opp' },
  ],
  view: [-10.4e6, 10.4e6, -10.4e6, 10.4e6],
  notation: 'sci',
  rate: 700,
  pulls: ['s'],
  forceScale: 0.0105,
  velocityScale: 0.0095,
  height: 540,
  clips: {
    round: { phases: [{ dur: 8.31, fly: true }] },
    more: { phases: [{ dur: 6.2, fly: true }] },
  },
};

/** Two satellites of the same planet: the outer one is twice as far from the centre, and slower. */
const pair: GravityEl = {
  kind: 'gravity',
  id: 'pair',
  bodies: [
    { id: 'planet', mass: 6.0e24, label: 'Planet', x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 'inner', mass: 800, label: 'Inner', x: 7.0e6, size: 7, orbit: true, tone: 'opp' },
    { id: 'outer', mass: 800, label: 'Outer', x: -14.0e6, size: 7, orbit: true, tone: 'hyp' },
  ],
  view: [-34e6, 34e6, -16.4e6, 16.4e6],
  notation: 'sci',
  rate: 900,
  pulls: [],
  velocityScale: 0.0095,
  height: 520,
  clips: { go: { phases: [{ dur: 18.28, fly: true }] } },
};

/** The lesson's second planet, 6.4 × 10²³ kg and 3.4 × 10⁶ m in radius, with a satellite 6.0 × 10⁵ m above its surface. */
const high: GravityEl = {
  kind: 'gravity',
  id: 'high',
  bodies: [
    { id: 'planet', mass: 6.4e23, label: 'Planet', x: 0, radius: 3.4e6, tone: 'hyp' },
    { id: 's', mass: 500, label: '', x: 4.0e6, size: 8, orbit: true, tone: 'opp' },
  ],
  view: [-5.6e6, 5.6e6, -5.6e6, 5.6e6],
  notation: 'sci',
  rate: 800,
  pulls: [],
  velocityScale: 0.02,
  height: 540,
  clips: { round: { phases: [{ dur: 9.6, fly: true }] } },
};

const video: Explainer = {
  id: 'p20-3-3',
  lessonId: 'p20-3-3',
  title: 'Orbits and Satellites',
  thumbnailTitle: 'Orbits',
  thumbnail: 'cannon',
  summary:
    'A satellite in orbit is falling all the way round its planet. Fire Newton’s cannon faster and faster until the ball never lands, see why gravity is the centripetal force of an orbit, and find the one speed that each orbit needs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circular Motion', title: 'Orbits and Satellites', subtitle: 'Falling all the way round' }],
      lines: [
        { say: 'What holds a satellite up? Nothing does. A satellite in orbit is falling, the whole time.', show: 'title' },
        { say: 'To see how something can fall for ever and never land, start with an idea of Newton’s.' },
      ],
    },
    {
      chapter: 'Newton’s cannon',
      layout: 'center',
      main: [cannon],
      lines: [
        { say: 'Newton imagined a cannon on a very high mountain, firing a ball horizontally. Fire it slowly, and the ball curves down and lands near the foot of the mountain.', show: ['cannon', 'cannon.trail'], play: 'cannon.slow', playDelay: 7 },
        { say: 'Fire it faster, and it lands farther away.', play: 'cannon.faster', playDelay: 1 },
        { say: 'Faster still, and something new happens. The ground curves away beneath the ball as it falls, so it travels a long way round the Earth before it comes down.', play: 'cannon.far', playDelay: 3 },
        { say: 'Now fire it at just the right speed. The ground curves away beneath the ball exactly as fast as the ball falls. It never gets any closer to the ground, and it never lands.', show: 'cannon.velocity', play: 'cannon.orbit', playDelay: 2 },
        { say: 'The ball is in orbit. Look at the force on it. Gravity still pulls it straight towards the centre of the Earth, and it is still falling. It is falling all the way round.', show: 'cannon.force', play: 'cannon.on' },
      ],
    },
    {
      chapter: 'Gravity is the centripetal force',
      layout: 'split',
      leftWidth: 500,
      left: [sat],
      right: [
        {
          kind: 'math',
          id: 'os',
          size: 'md',
          lines: ['\\hyp{\\dfrac{GMm}{r^2}} = \\dfrac{mv^2}{r}', '\\thc{v = \\sqrt{\\dfrac{GM}{r}}}', 'v = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times 6.0 \\times 10^{24}}{7.0 \\times 10^{6}}}', '\\good{v = 7.56 \\times 10^{3}\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'A satellite in a circular orbit is in uniform circular motion, and only one force acts on it: gravity. So gravity is the centripetal force.', show: ['sat', 'sat.orbit', 'sat.force', 'sat.velocity'], play: 'sat.round', playDelay: 2 },
        { say: 'Set the force of gravity equal to m v squared over r. Big M is the mass of the planet, and little m is the mass of the satellite.', show: 'os.0' },
        { say: 'The mass of the satellite cancels. Solve for the speed, and v is the square root of G M over r. As always with gravity, r is measured from the centre of the planet.', show: ['os.1', 'sat.distance'] },
        { say: 'This satellite is seven times ten to the six metres from the centre of a planet of six times ten to the twenty-four kilograms.', show: 'os.2' },
        { say: 'Its speed is 7.56 times ten to the three metres per second: about seven and a half kilometres, every second.', hide: 'sat.distance', show: 'os.3', play: 'sat.more' },
        { say: 'Because the mass cancelled, the speed does not depend on the satellite at all. A spacecraft and a loose bolt beside it orbit together.' },
      ],
    },
    {
      chapter: 'One speed for each orbit',
      layout: 'center',
      main: [pair],
      lines: [
        { say: 'Each orbit has exactly one speed. Here are two satellites of the same planet. The outer one is twice as far from the centre.', show: ['pair', 'pair.orbit', 'pair.velocity'] },
        { say: 'Watch them go. G M over r is smaller for the larger orbit, so the outer satellite is slower. It also has farther to travel, so it takes much longer to go round.', show: 'pair.turns', play: 'pair.go' },
        { say: 'Astronauts inside an orbiting spacecraft float for the same reason that a bolt beside it does. They and the spacecraft are falling round the planet together, so nothing presses them against the floor.' },
      ],
    },
    {
      chapter: 'A height above the surface',
      layout: 'split',
      leftWidth: 500,
      left: [high],
      right: [
        {
          kind: 'math',
          id: 'h',
          size: 'md',
          lines: ['r = (3.4 + 0.6) \\times 10^{6}\\ \\text{m}', 'v = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times 6.4 \\times 10^{23}}{4.0 \\times 10^{6}}}', '\\good{v = 3.27 \\times 10^{3}\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'Often you are given the height of a satellite above the surface, and not the radius of its orbit. This satellite is six times ten to the five metres above a planet whose radius is 3.4 times ten to the six metres.', show: ['high', 'high.radius', 'high.height'] },
        { say: 'The height is not r. Add the radius of the planet first. Six times ten to the five is 0.6 times ten to the six, so r is four times ten to the six metres.', show: ['high.distance', 'h.0'] },
        { say: 'Now use the formula, with the mass of this planet: 6.4 times ten to the twenty-three kilograms.', show: 'h.1' },
        { say: 'The speed is 3.27 times ten to the three metres per second.', hide: ['high.radius', 'high.height', 'high.distance'], show: ['h.2', 'high.velocity', 'high.orbit'], play: 'high.round' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two satellites are in the same circular orbit round a planet. Satellite A has twice the mass of satellite B. How do their speeds compare?',
          choices: ['A is twice as fast as B', 'A is half as fast as B', 'They have the same speed', 'A is four times as fast as B'],
          answer: 2,
          working: 'The orbital speed is $v = \\sqrt{\\dfrac{GM}{r}}$, where $M$ is the mass of the planet. The mass of the satellite cancels, so two satellites in the same orbit have the same speed.',
        },
      ],
      lines: [
        { say: 'Your turn. Two satellites are in the same circular orbit round a planet. Satellite A has twice the mass of satellite B. How do their speeds compare? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The orbital speed is the square root of G M over r, and that M is the mass of the planet. The mass of the satellite cancelled out. So in the same orbit, they have the same speed. That is choice C.', show: 'q.answer' },
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
            'A satellite in orbit is **falling** all the way round its planet',
            'Gravity is the centripetal force: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$',
            'Orbital speed: $v = \\sqrt{\\dfrac{GM}{r}}$, whatever the mass of the satellite',
            '$r$ is measured from the **centre**: add the radius of the planet to the height',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A satellite in orbit is falling all the way round its planet.', show: 'sum.0' },
        { say: 'Gravity is the centripetal force of the orbit.', show: 'sum.1' },
        { say: 'So the orbital speed is the square root of G M over r, whatever the mass of the satellite. A larger orbit needs a smaller speed.', show: 'sum.2' },
        { say: 'And r is measured from the centre of the planet. For a height above the surface, add the radius of the planet first.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
