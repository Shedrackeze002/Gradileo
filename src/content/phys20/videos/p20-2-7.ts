import type { Explainer, GravityEl } from '@/video/script.ts';

// Lesson 2.7: universal gravitation. Every force on screen is worked out from Newton's law
// (src/video/gravity.ts), so the arrows agree with the lesson's examples: spheres of 50 kg and
// 150 kg with their centres 0.5 m apart (2.00 × 10⁻⁶ N), and an 800 kg satellite 7.0 × 10⁶ m from
// the centre of a planet of 6.0 × 10²⁴ kg (6.53 × 10³ N). The last pair is the lesson's 144 N:
// 36 N at twice the distance, 16 N at three times, and 108 N at twice the distance with one mass
// made three times as large.

/** The lesson's two spheres in a laboratory. */
const lab: GravityEl = {
  kind: 'gravity',
  id: 'lab',
  bodies: [
    { id: 'small', mass: 50, x: 0, size: 18, tone: 'adj' },
    { id: 'large', mass: 150, x: 0.5, size: 26, tone: 'opp' },
  ],
  view: [-0.35, 0.85, -0.14, 0.11],
  notation: 'sci',
  label: 'Two spheres in a laboratory',
  height: 270,
  clips: {},
};

/** The lesson's planet and its satellite, drawn to scale: 600 km above a planet 6400 km in radius. */
const orbit: GravityEl = {
  kind: 'gravity',
  id: 'orbit',
  bodies: [
    { id: 'planet', mass: 6.0e24, x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 'sat', mass: 800, x: 7.0e6, size: 9, tone: 'opp' },
  ],
  view: [-3.0e6, 11.7e6, -2.4e6, 2.4e6],
  notation: 'sci',
  label: 'A planet and a satellite, to scale',
  height: 400,
  clips: {},
};

/** Two bodies that attract each other with 144 N when their centres are 1 m apart. */
const pair: GravityEl = {
  kind: 'gravity',
  id: 'pair',
  bodies: [
    { id: 'a', mass: 1.2e6, label: 'A', x: 0, size: 22, tone: 'adj' },
    { id: 'b', mass: 144 / (6.67e-11 * 1.2e6), label: 'B', x: 1, size: 22, tone: 'opp' },
  ],
  view: [-0.6, 3.9, -0.5, 0.42],
  forceScale: 0.42,
  height: 260,
  poster: 'double',
  clips: {
    double: { phases: [{ dur: 3, to: { b: 2 } }] },
    triple: { phases: [{ dur: 3, to: { b: 3 } }] },
    again: { reset: true, phases: [{ dur: 2.4, to: { b: 2 } }] },
    heavy: { phases: [{ dur: 3, mass: { b: (3 * 144) / (6.67e-11 * 1.2e6) } }] },
  },
};

const video: Explainer = {
  id: 'p20-2-7',
  lessonId: 'p20-2-7',
  title: 'Universal Gravitation',
  thumbnail: 'orbit',
  summary:
    'One rule describes the pull between any two objects in the universe. See the force between two spheres in a laboratory and between a planet and its satellite, find out why the distance is measured between the centres, and watch the force fall as the square of the distance grows.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Universal Gravitation', subtitle: 'One rule for an apple and for the Moon' }],
      lines: [
        { say: 'An apple falls to the ground. The Moon circles the Earth. They look like very different things. Newton’s boldest idea was that one force is behind both of them.', show: 'title' },
        { say: 'And not only there. He claimed that the same rule holds between any two objects, anywhere in the universe.' },
      ],
    },
    {
      chapter: 'The law of gravitation',
      layout: 'center',
      main: [
        lab,
        { kind: 'math', id: 'law', size: 'md', lines: ['F_g = \\dfrac{G m_1 m_2}{r^2} \\qquad G = 6.67 \\times 10^{-11}\\ \\text{N·m}^2/\\text{kg}^2'] },
        { kind: 'math', id: 'calc', size: 'md', lines: ['F_g = \\dfrac{6.67 \\times 10^{-11} \\times 50 \\times 150}{0.5^2} = \\hyp{2.00 \\times 10^{-6}\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'Every object attracts every other object. Here are two spheres in a laboratory, of fifty kilograms and a hundred and fifty kilograms, with their centres half a metre apart.', show: ['lab', 'lab.distance'] },
        { say: 'The force between them is G, times the two masses, divided by the square of the distance between their centres. G is the universal gravitational constant: 6.67 times ten to the minus eleven. It is a very small number.', show: 'law' },
        { say: 'Put in the numbers, and the force is two times ten to the minus six newtons. That is about the weight of a grain of sand, which is why you never feel the pull of the things around you.', show: ['calc', 'lab.force'] },
        { say: 'Look at the two arrows. They are the same length. The small sphere pulls on the large one exactly as hard as the large one pulls on it, just as Newton’s third law requires.', focus: ['lab.small', 'lab.large'] },
      ],
    },
    {
      chapter: 'A planet and a satellite',
      layout: 'center',
      main: [orbit, { kind: 'math', id: 'calc', size: 'md', lines: ['F_g = \\dfrac{6.67 \\times 10^{-11} \\times 6.0 \\times 10^{24} \\times 800}{(7.0 \\times 10^{6})^2} = \\hyp{6.53 \\times 10^{3}\\ \\text{N}}'] }],
      lines: [
        { say: 'Gravity becomes noticeable when at least one of the masses is enormous. This planet has a mass of six times ten to the twenty-four kilograms, and a satellite of eight hundred kilograms orbits it.', show: 'orbit' },
        { say: 'The satellite is six hundred kilometres above the ground. But that height is not the distance r. Gravity acts as if all the mass of the planet were at its centre, so r is measured from there.', show: ['orbit.radius', 'orbit.height'], focus: 'orbit.planet' },
        { say: 'Add the height to the radius of the planet. 6.4 times ten to the six, plus 0.6 times ten to the six, gives seven times ten to the six metres.', show: 'orbit.distance' },
        { say: 'Now use the law. Remember to square the whole of the distance. The force on the satellite is 6.53 times ten to the three newtons: about six and a half thousand newtons.', show: ['calc', 'orbit.force'] },
        { say: 'And the satellite pulls the planet towards itself with exactly the same force.', focus: 'orbit.sat' },
      ],
    },
    {
      chapter: 'The inverse square law',
      layout: 'center',
      main: [
        pair,
        {
          kind: 'math',
          id: 'inv',
          size: 'md',
          lines: ['F_g \\propto \\dfrac{1}{r^2}', '\\text{distance} \\times 2: \\quad 144 \\div 2^2 = \\hyp{36\\ \\text{N}}', '\\text{distance} \\times 3: \\quad 144 \\div 3^2 = \\hyp{16\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Often you do not need the constant at all. The law also tells you how the force changes. These two objects attract each other with a hundred and forty-four newtons.', show: ['pair', 'pair.force', 'pair.distance'] },
        { say: 'Watch the force as B moves away, to twice the distance. It does not fall to a half. The distance is squared, so the force falls to a quarter: thirty-six newtons.', show: ['inv.0', 'inv.1'], play: 'pair.double', playDelay: 2.4 },
        { say: 'At three times the distance, the force is divided by three squared, which is nine. Only sixteen newtons are left. This is called an inverse square law.', show: 'inv.2', play: 'pair.triple', playDelay: 0.6 },
      ],
    },
    {
      chapter: 'Changing a mass as well',
      layout: 'center',
      main: [{ ...pair, poster: undefined }, { kind: 'math', id: 'both', size: 'md', lines: ['F_g = 144 \\times \\dfrac{3}{2^2} = \\hyp{108\\ \\text{N}}'] }],
      lines: [
        { say: 'The force is proportional to each mass, too. Start again from a hundred and forty-four newtons. First double the distance: the force is divided by four, to thirty-six newtons.', show: ['pair', 'pair.force', 'pair.distance'], play: 'pair.again', playDelay: 5 },
        { say: 'Now make B three times as massive. The force becomes three times as large: a hundred and eight newtons.', play: 'pair.heavy', playDelay: 0.6 },
        { say: 'So multiply by the factor for each mass, and divide by the square of the factor for the distance. A hundred and forty-four, times three, over two squared, is a hundred and eight newtons.', show: 'both' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The gravitational force between two objects is 80 N. The distance between their centres is doubled, and the masses stay the same. What is the force now?',
          choices: ['$20\\ \\text{N}$', '$40\\ \\text{N}$', '$160\\ \\text{N}$', '$320\\ \\text{N}$'],
          answer: 0,
          working: 'The force is proportional to $\\dfrac{1}{r^2}$, so doubling $r$ divides the force by $2^2 = 4$: $\\dfrac{80}{4} = 20\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The gravitational force between two objects is eighty newtons. The distance between their centres is doubled, and the masses stay the same. What is the force now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The distance is squared in the law. So doubling it divides the force by two squared, which is four. Eighty over four is twenty newtons. That is choice A. Forty newtons is the common mistake, from halving the force.', show: 'q.answer' },
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
            'Every two masses attract each other: $F_g = \\dfrac{G m_1 m_2}{r^2}$',
            'The two objects pull on each other with forces of **equal size**',
            '$r$ is measured between the **centres**: for a satellite, the radius plus the height',
            'Twice the distance gives **one quarter** of the force',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Every two masses attract each other, with a force of G, times the two masses, over the square of the distance.', show: 'sum.0' },
        { say: 'The two objects pull on each other with forces of equal size.', show: 'sum.1' },
        { say: 'The distance is measured between the centres. For a satellite, add its height to the radius of the planet.', show: 'sum.2' },
        { say: 'And gravity follows an inverse square law. At twice the distance, the force is one quarter as large.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
