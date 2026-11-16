import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.6: vectors in two dimensions. Every displacement is drawn to scale on a map, with its
// east and north parts measured as the body moves (src/video/flight.ts), so the numbers in the
// panel are the ones the calculation gives: 20 km at 30° is 17.3 km east and 10.0 km north; 6 m
// east and 8 m north make 10 m at 53.1°; 12 km east and then 17 km at 30° make 28.0 km at 17.6°.

const RAD = Math.PI / 180;

/** A ferry that sails 20 km at 30° north of east, at 10 km/h. */
const ferry: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-3, 22, -3, 13],
  height: 430,
  tick: 1,
  units: { length: 'km', time: 'h' },
  readout: {},
  poster: 'go',
  bodies: [{ id: 'ferry', shape: 'boat', at: [0, 0], v: [10 * Math.cos(30 * RAD), 10 * Math.sin(30 * RAD)], tone: 'theta' }],
  clips: { go: { phases: [{ dur: 2, slow: 3.2 }] } },
};

/** The lesson's displacement of 28 km at 25° south of east: its north part is negative. */
const south: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-3, 29, -15, 4],
  height: 430,
  tick: 1,
  units: { length: 'km', time: 'h' },
  readout: {},
  bodies: [{ id: 'ferry', shape: 'boat', at: [0, 0], v: [14 * Math.cos(25 * RAD), -14 * Math.sin(25 * RAD)], tone: 'theta' }],
  clips: { go: { phases: [{ dur: 2, slow: 3 }] } },
};

/** The lesson's drone: 6 m east and then 8 m north. */
const drone: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-4, 10, -1.5, 10],
  height: 430,
  tick: 1,
  readout: {},
  bodies: [{ id: 'drone', shape: 'dot', label: 'Drone', labelAt: 'right', at: [0, 0], tone: 'theta' }],
  clips: {
    east: { phases: [{ dur: 3, set: { drone: [2, 0] } }] },
    north: { phases: [{ dur: 4, set: { drone: [0, 2] } }] },
  },
};

/** The lesson's boat: 12 km east, and then 17 km at 30° north of east. */
const boat: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-3, 31, -4, 13],
  height: 400,
  tick: 1,
  units: { length: 'km', time: 'h' },
  readout: {},
  bodies: [{ id: 'boat', shape: 'boat', at: [0, 0], v: [10, 0], tone: 'theta' }],
  clips: {
    east: { phases: [{ dur: 1.2, slow: 3, set: { boat: [10, 0] } }] },
    turn: { phases: [{ dur: 1.7, slow: 3, set: { boat: [10 * Math.cos(30 * RAD), 10 * Math.sin(30 * RAD)] } }] },
  },
};

const video: Explainer = {
  id: 'p20-1-6',
  lessonId: 'p20-1-6',
  title: 'Vectors in Two Dimensions',
  thumbnail: 'sim',
  summary:
    'A vector that points at an angle can be replaced by two parts at right angles. Watch a displacement grow on a map with its east and north parts measured beside it, then add vectors at right angles with the Pythagorean theorem, and vectors at any angle by adding their components.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Vectors in Two Dimensions', subtitle: 'Components and resultants' }],
      lines: [
        { say: 'A ferry does not have to sail due east or due north. Most real motion points somewhere in between.', show: 'title' },
        { say: 'To work with a vector that points at an angle, physics uses one idea again and again: replace it with two vectors at right angles, which together do the same job.' },
      ],
    },
    {
      chapter: 'The components of a vector',
      layout: 'center',
      main: [
        ferry,
        { kind: 'math', id: 'comp', size: 'md', lines: ['\\adj{R_x = R\\cos\\theta = 20\\cos 30^\\circ = 17.3\\ \\text{km}}', '\\opp{R_y = R\\sin\\theta = 20\\sin 30^\\circ = 10.0\\ \\text{km}}'] },
      ],
      lines: [
        { say: 'This ferry sails twenty kilometres, at thirty degrees north of east. Watch the purple arrow, its displacement, and the two dashed lines under it.', show: ['sim', 'sim.displacement', 'sim.legs', 'sim.readout', 'sim.trail'], play: 'sim.go', playDelay: 4.6 },
        { say: 'The ferry ended up 17.3 kilometres further east, and 10.0 kilometres further north. Those two distances are the components of its displacement. Together they do the same job as the twenty kilometres at an angle.', show: 'sim.angle' },
        { say: 'The vector and its two components form a right triangle, with the vector as the hypotenuse. So the component next to the angle is R cos theta, and the component opposite the angle is R sine theta.', show: 'comp' },
      ],
    },
    {
      chapter: 'A negative component',
      layout: 'center',
      main: [
        south,
        { kind: 'math', id: 'comp', size: 'md', lines: ['\\adj{\\text{East: } 28\\cos 25^\\circ = {+25.4}\\ \\text{km}} \\qquad \\opp{\\text{North: } {-28}\\sin 25^\\circ = {-11.8}\\ \\text{km}}'] },
      ],
      lines: [
        { say: 'Now the ferry sails twenty-eight kilometres, at twenty-five degrees south of east. Take east and north as the positive directions.', show: ['sim', 'sim.displacement', 'sim.legs', 'sim.readout', 'sim.trail'], play: 'sim.go', playDelay: 3 },
        { say: 'It moved 25.4 kilometres east, but it moved south, not north. So its north component is negative: minus 11.8 kilometres. A component that points west or south takes a minus sign.', show: ['comp', 'sim.angle'] },
      ],
    },
    {
      chapter: 'Adding at right angles',
      layout: 'center',
      main: [
        drone,
        { kind: 'math', id: 'res', size: 'md', lines: ['\\brand{R = \\sqrt{\\adj{6}^2 + \\opp{8}^2} = 10\\ \\text{m}} \\qquad \\thc{\\theta = \\tan^{-1}\\!\\left(\\dfrac{\\opp{8}}{\\adj{6}}\\right) = 53.1^\\circ}'] },
      ],
      lines: [
        { say: 'Going the other way, two vectors add up to one. A drone flies six metres east, and then eight metres north.', show: ['sim', 'sim.trail', 'sim.displacement', 'sim.readout'], play: 'sim.east', playDelay: 3.6 },
        { say: 'Watch the purple arrow as it turns north.', play: 'sim.north', playDelay: 0.4 },
        { say: 'The drone flew fourteen metres, but it is only ten metres from where it started. Six metres and eight metres are the two shorter sides of a right triangle, and the resultant is the hypotenuse.', show: 'sim.legs' },
        { say: 'Its direction comes from the tangent: the inverse tangent of eight over six is 53.1 degrees. A resultant is a vector, so always give its direction: ten metres, at 53.1 degrees north of east.', show: ['sim.angle', 'res'] },
      ],
    },
    {
      chapter: 'Adding at any angle',
      layout: 'center',
      main: [
        boat,
        { kind: 'math', id: 'east', size: 'md', lines: ['\\adj{\\text{East: } 12 + 17\\cos 30^\\circ = 26.72\\ \\text{km}} \\qquad \\opp{\\text{North: } 0 + 17\\sin 30^\\circ = 8.5\\ \\text{km}}'] },
        { kind: 'math', id: 'res', size: 'md', lines: ['\\brand{R = \\sqrt{26.72^2 + 8.5^2} = 28.0\\ \\text{km}} \\qquad \\thc{\\theta = \\tan^{-1}\\!\\left(\\dfrac{8.5}{26.72}\\right) = 17.6^\\circ}'] },
      ],
      lines: [
        { say: 'What if the two vectors are not at right angles? A boat sails twelve kilometres east, and then seventeen kilometres at thirty degrees north of east.', show: ['sim', 'sim.trail'], play: 'sim.east', playDelay: 2.4 },
        { say: 'There is no right triangle between these two, so resolve each one into components first.', play: 'sim.turn' },
        { say: 'Then add the east components, and add the north components. Twelve plus seventeen cos thirty is 26.72 kilometres east. Zero plus seventeen sine thirty is 8.5 kilometres north.', show: ['sim.legs', 'sim.readout', 'east'] },
        { say: 'Now the two totals are at right angles. The resultant is 28.0 kilometres, at 17.6 degrees north of east.', show: ['sim.displacement', 'sim.angle', 'res'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hiker walks 5 km east and then 12 km north. What is the size of the resultant displacement?',
          choices: ['$17\\ \\text{km}$', '$7\\ \\text{km}$', '$13\\ \\text{km}$', '$60\\ \\text{km}$'],
          answer: 2,
          working: 'The two displacements are at right angles: $R = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13\\ \\text{km}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A hiker walks five kilometres east, and then twelve kilometres north. What is the size of the resultant displacement? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The two displacements are at right angles, so use the Pythagorean theorem. The square root of five squared plus twelve squared is thirteen kilometres. That is choice C. Adding five and twelve gives the distance walked, not the displacement.', show: 'q.answer' },
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
            'Components: $R_x = R\\cos\\theta$ and $R_y = R\\sin\\theta$',
            'A component that points **west or south** is negative',
            'At right angles: $R = \\sqrt{R_x^2 + R_y^2}$ and $\\tan\\theta = \\dfrac{R_y}{R_x}$',
            'At any other angle: **resolve, add the components**, then find $R$ and $\\theta$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A vector at an angle has two components: R cos theta next to the angle, and R sine theta opposite it.', show: 'sum.0' },
        { say: 'A component that points west or south is negative, when east and north are positive.', show: 'sum.1' },
        { say: 'Two vectors at right angles add with the Pythagorean theorem, and the tangent gives the direction.', show: 'sum.2' },
        { say: 'And for vectors at any other angle, resolve each one, add the components, and then find the size and the direction of the resultant.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
