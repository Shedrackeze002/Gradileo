import type { Explainer, GravityEl, RampEl } from '@/video/script.ts';

// Lesson 2.8: gravitational field strength. The rover is the lesson's: 50 kg, which weighs 490.5 N
// where g is 9.81 N/kg and 185.5 N where g is 3.71 N/kg (src/video/ramp.ts). The field of the Earth
// is worked out from g = GM ÷ r² (src/video/gravity.ts): 9.81 N/kg at the surface, 8.69 N/kg at a
// height of 400 km and 2.45 N/kg at two radii from the centre, where the lesson's 500 kg satellite
// weighs 1226.3 N.

const R = 6.37e6;
/** The mass of the Earth to three figures, 5.97 × 10²⁴ kg: the mass that makes g exactly 9.81 N/kg at its surface. */
const EARTH = (9.81 * R ** 2) / 6.67e-11;

/** The lesson's rover on a world with this field strength. */
const rover = (id: string, label: string, g: number): RampEl => ({
  kind: 'ramp',
  id,
  angle: 0,
  length: 4,
  g,
  bodies: [{ id: 'rover', mass: 50, x: 2, width: 1.2, tone: 'theta' }],
  label,
  height: 262,
  pad: [96, 150],
  forceScale: 0.22,
  clips: {},
});

/** The Earth and its field, with one kilogram at the surface. */
const field: GravityEl = {
  kind: 'gravity',
  id: 'space',
  bodies: [
    { id: 'earth', mass: EARTH, label: 'Earth', x: 0, radius: R, tone: 'adj' },
    { id: 'mass', mass: 1, label: '1 kg', x: R, size: 9, tone: 'opp' },
  ],
  view: [-17e6, 17e6, -17e6, 17e6],
  figures: 3,
  pulls: ['mass'],
  height: 540,
  poster: 'none',
  clips: { none: { phases: [{ dur: 1 }] } },
};

/** The lesson's 500 kg satellite, carried from the ground to 400 km up, then to one Earth radius above the surface. */
const climb: GravityEl = {
  kind: 'gravity',
  id: 'space',
  bodies: [
    { id: 'earth', mass: EARTH, label: 'Earth', x: 0, radius: R, tone: 'adj' },
    { id: 'sat', mass: 500, label: '500 kg', x: R, size: 10, tone: 'opp' },
  ],
  view: [-8.5e6, 21.5e6, -6.6e6, 6.6e6],
  unit: { metres: R, symbol: '× Earth radius' },
  pulls: ['sat'],
  forceScale: 0.02,
  height: 410,
  clips: {
    low: { phases: [{ dur: 2.5, to: { sat: R + 4.0e5 } }] },
    far: { phases: [{ dur: 4, to: { sat: 2 * R } }] },
  },
};

const video: Explainer = {
  id: 'p20-2-8',
  lessonId: 'p20-2-8',
  title: 'Gravitational Field Strength',
  thumbnailTitle: 'Field Strength',
  thumbnail: 'space',
  summary:
    'Your mass is the same everywhere, but your weight is not. See what the gravitational field strength g measures, find where 9.81 comes from, and watch g fall with the square of the distance from the centre of the Earth.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Gravitational Field Strength', subtitle: 'Where the 9.81 comes from' }],
      lines: [
        { say: 'An astronaut on the Moon can leap in a suit that could hardly be lifted on Earth. The mass of the astronaut has not changed, and neither has the mass of the suit.', show: 'title' },
        { say: 'What has changed is the pull of the world underfoot. This lesson gives that pull a number, and shows where the familiar 9.81 comes from.' },
      ],
    },
    {
      chapter: 'The force on each kilogram',
      layout: 'split',
      leftWidth: 500,
      left: [rover('earth', 'On Earth', 9.81), rover('mars', 'On Mars', 3.71)],
      right: [
        { kind: 'math', id: 'def', size: 'md', lines: ['\\thc{g = \\dfrac{F_g}{m}}', '\\dfrac{490.5}{50} = \\hyp{9.81\\ \\text{N/kg}}', '\\dfrac{185.5}{50} = \\hyp{3.71\\ \\text{N/kg}}'] },
      ],
      lines: [
        { say: 'Here is a rover of fifty kilograms on Earth. Its weight is 490.5 newtons.', show: ['earth', 'earth.weight'] },
        { say: 'Send the same rover to Mars. Nothing has been taken away from it, so its mass is still fifty kilograms. But its weight is only 185.5 newtons.', show: ['mars', 'mars.weight'] },
        { say: 'The gravitational field strength, g, is the force of gravity on each kilogram: the weight divided by the mass. On Earth, that is 490.5 over fifty, which is 9.81 newtons per kilogram.', show: ['def.0', 'def.1'], focus: 'earth.rover' },
        { say: 'On Mars, it is 185.5 over fifty: only 3.71 newtons per kilogram. Mass is the same everywhere. Weight changes whenever g changes.', show: 'def.2', focus: 'mars.rover' },
        { say: 'Rearranged, this is the rule you already know: weight equals m g. And one newton per kilogram is the same as one metre per second squared, so g is also the acceleration of an object in free fall.' },
      ],
    },
    {
      chapter: 'Where g comes from',
      layout: 'split',
      leftWidth: 520,
      left: [field],
      right: [
        {
          kind: 'math',
          id: 'why',
          size: 'md',
          lines: ['g = \\dfrac{F_g}{m} = \\dfrac{GMm}{r^2} \\div m', '\\thc{g = \\dfrac{GM}{r^2}}', 'g = \\dfrac{6.67 \\times 10^{-11} \\times 5.97 \\times 10^{24}}{(6.37 \\times 10^{6})^2}', '\\good{g = 9.81\\ \\text{N/kg}}'],
        },
      ],
      lines: [
        { say: 'A mass changes the space around it. Any other mass placed there feels a force, towards it. We say that the Earth is surrounded by a gravitational field. The arrows show which way it points, and how strong it is.', show: ['space', 'space.field'] },
        { say: 'To find g, put the law of universal gravitation into the definition. The force on a mass m is G, big M, m, over r squared. Divide by m, and the m cancels.', show: 'why.0' },
        { say: 'So g is G times the mass of the planet, over r squared. It does not depend on the object at all. It depends only on the planet, and on how far you are from its centre.', show: 'why.1', focus: 'space.earth' },
        { say: 'At the surface of the Earth, r is the radius of the Earth: 6.37 times ten to the six metres. The mass of the Earth is 5.97 times ten to the twenty-four kilograms.', show: ['why.2', 'space.distance'] },
        { say: 'Work it out, and there it is: 9.81 newtons per kilogram. The number you have used all year comes from the mass and the size of the Earth.', show: ['why.3', 'space.g'], focus: 'space.mass' },
      ],
    },
    {
      chapter: 'Field strength and distance',
      layout: 'center',
      main: [climb, { kind: 'math', id: 'quarter', size: 'md', lines: ['g = \\dfrac{9.81}{2^2} = \\good{2.45\\ \\text{N/kg}} \\qquad F_g = 500 \\times 2.4525 = \\hyp{1226.3\\ \\text{N}}'] }],
      lines: [
        { say: 'Because g is G M over r squared, it follows the inverse square law. It is strongest at the surface, and it falls away as you move out. Here is a satellite of five hundred kilograms, still on the ground, where it weighs 4,905 newtons.', show: ['space', 'space.field', 'space.g', 'space.force', 'space.distance'] },
        { say: 'Lift it four hundred kilometres, to where many crewed spacecraft orbit. That is a small step away from the centre of the Earth, and g is still 8.69 newtons per kilogram: almost ninety percent of its value on the ground.', play: 'space.low', playDelay: 1 },
        { say: 'So astronauts in orbit do not float because gravity has vanished. They float because they and their spacecraft are falling together, around the Earth.', focus: 'space.sat' },
        { say: 'Now carry the satellite out to one Earth radius above the surface. Careful: that is two radii from the centre. The distance from the centre has doubled, so g is divided by four.', play: 'space.far', playDelay: 1 },
        { say: 'g is 9.81 over four: 2.45 newtons per kilogram. The satellite still has a mass of five hundred kilograms, but out here it weighs only about 1,226 newtons, a quarter of its weight on the ground.', show: 'quarter', focus: 'space.sat' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At the surface of a planet, the gravitational field strength is 12 N/kg. What is the field strength at a height of one planet radius above the surface?',
          choices: ['$6\\ \\text{N/kg}$', '$12\\ \\text{N/kg}$', '$3\\ \\text{N/kg}$', '$4\\ \\text{N/kg}$'],
          answer: 2,
          working: 'One radius above the surface is $1 + 1 = 2$ radii from the centre. The distance has doubled, so $g$ is divided by $2^2 = 4$: $\\dfrac{12}{4} = 3\\ \\text{N/kg}$.',
        },
      ],
      lines: [
        { say: 'Your turn. At the surface of a planet, the gravitational field strength is twelve newtons per kilogram. What is the field strength at a height of one planet radius above the surface? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The surface is already one radius from the centre. So one radius above the surface is two radii from the centre. The distance has doubled, and g is divided by two squared. Twelve over four is three newtons per kilogram. That is choice C.', show: 'q.answer' },
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
            'Field strength is the force on each kilogram: $g = \\dfrac{F_g}{m}$, in N/kg',
            '**Mass** is the same everywhere; **weight** $F_g = mg$ changes with $g$',
            'Around a planet: $g = \\dfrac{GM}{r^2}$, with $r$ measured from its **centre**',
            'At twice the distance from the centre, $g$ is **one quarter** as large',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The gravitational field strength is the force of gravity on each kilogram, in newtons per kilogram.', show: 'sum.0' },
        { say: 'Mass is the same everywhere. Weight is m g, and it changes whenever g changes.', show: 'sum.1' },
        { say: 'Around a planet, g is G M over r squared, with r measured from the centre of the planet.', show: 'sum.2' },
        { say: 'And g follows the inverse square law. At twice the distance from the centre, it is one quarter as large.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
