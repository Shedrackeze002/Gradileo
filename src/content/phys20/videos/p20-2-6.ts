import type { Explainer, ForcesEl, RampEl } from '@/video/script.ts';

// Lesson 2.6: forces in two dimensions. The sled is the lesson's: 20 kg, pulled with 80 N at 30°
// above the horizontal, so the pull has components of 69.3 N and 40 N, the normal force is
// 156.2 N, and the sled speeds up at 3.46 m/s² on ice and at 2.68 m/s² on snow (src/video/ramp.ts
// works these out). The puck (30 N east and 40 N north on 10 kg: 50 N at 53.1°, 5 m/s²) and the
// 12 kg sign on two cables at 40° (91.6 N in each) are worked out in src/video/forces.ts.

/** The lesson's sled, pulled by a rope that slants up at 30 degrees. */
const sled = (label: string, over: Partial<RampEl> = {}): RampEl => ({
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 12,
  bodies: [{ id: 'sled', mass: 20, label: 'sled', x: 2.4, width: 1.5, tone: 'theta' }],
  label,
  height: 380,
  pad: [210, 170],
  forceScale: 0.75,
  velocityScale: 14,
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: [{ on: 'sled', name: 'Pull', n: 80, angle: 30 }] }] },
    go: { phases: [{ dur: 1.8, forces: [{ on: 'sled', name: 'Pull', n: 80, angle: 30 }] }] },
  },
  ...over,
});

/** The lesson's puck, seen from above: 30 N east and 40 N north. */
const puck: ForcesEl = {
  kind: 'forces',
  id: 'top',
  body: { mass: 10, tone: 'adj' },
  view: [-1.5, 5, -1.2, 5.3],
  label: 'Seen from above',
  height: 540,
  poster: 'go',
  clips: {
    name: {
      phases: [
        {
          dur: 2,
          freeze: true,
          forces: [
            { name: 'Push', n: 30, angle: 0 },
            { name: 'Pull', n: 40, angle: 90 },
          ],
        },
      ],
    },
    go: {
      phases: [
        {
          dur: 1,
          slow: 2.5,
          note: 'Slow motion',
          forces: [
            { name: 'Push', n: 30, angle: 0 },
            { name: 'Pull', n: 40, angle: 90 },
          ],
        },
      ],
    },
  },
};

/** The lesson's sign: 12 kg on two cables at 40 degrees, which are then pulled flatter. */
const sign: ForcesEl = {
  kind: 'forces',
  id: 'hang',
  body: { mass: 12, tone: 'adj' },
  cables: [40, 40],
  height: 460,
  forceScale: 1.5,
  clips: { flatten: { phases: [{ dur: 6, cables: [20, 20] }] } },
};

const video: Explainer = {
  id: 'p20-2-6',
  lessonId: 'p20-2-6',
  title: 'Forces in Two Dimensions',
  thumbnail: 'top',
  summary:
    'Forces do not always point along the motion. Split a slanted pull into its two components, see why it reduces the normal force and the friction, add two forces at right angles to find the net force, and balance the forces on a sign that hangs from two cables.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Forces in Two Dimensions', subtitle: 'Split each force, then take one direction at a time' }],
      lines: [
        { say: 'Nobody pulls a sled with a rope that runs along the snow. The rope slants up to your hand. So part of your pull drags the sled forwards, and part of it lifts.', show: 'title' },
        { say: 'To deal with forces that point in different directions, we do what we did for velocities. We split each force into components, and treat each direction on its own.' },
      ],
    },
    {
      chapter: 'A force at an angle',
      layout: 'center',
      main: [
        sled('A pull at an angle', { height: 400, pad: [190, 120], forceScale: 2.6 }),
        { kind: 'math', id: 'comp', size: 'md', lines: ['F_x = 80\\cos 30^\\circ = \\opp{69.3\\ \\text{N}} \\qquad F_y = 80\\sin 30^\\circ = \\opp{40\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'A rope pulls this sled with eighty newtons, at thirty degrees above the horizontal.', show: 'sim', play: 'sim.name', playDelay: 0.6 },
        { say: 'The pull does two jobs at once. Its horizontal component is eighty times cos thirty degrees: 69.3 newtons, forwards. Its vertical component is eighty times sine thirty degrees: forty newtons, upwards.', show: ['sim.components', 'comp'] },
        { say: 'Together, those two components do exactly what the pull does. So from here on, we can work with them instead.', focus: 'sim.sled' },
      ],
    },
    {
      chapter: 'One direction at a time',
      layout: 'center',
      main: [
        sled('On frictionless ice'),
        { kind: 'math', id: 'vert', size: 'md', lines: ['\\adj{F_N = mg - F_y = 196.2 - 40 = 156.2\\ \\text{N}}'] },
        { kind: 'math', id: 'hor', size: 'md', lines: ['a = \\dfrac{F_x}{m} = \\dfrac{69.3}{20} = \\good{3.46\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'Put the sled, of twenty kilograms, on frictionless ice. Take the vertical direction first. The weight is 196.2 newtons, downwards. Upwards, there are two forces: the normal force, and the forty newtons of the pull.', show: ['sim', 'sim.weight', 'sim.normal', 'sim.components'], play: 'sim.name', playDelay: 0.6 },
        { say: 'The sled does not move up or down, so these balance. The ice only has to hold up what the rope does not: 196.2 minus forty, which is 156.2 newtons. The normal force is less than the weight.', show: 'vert', focus: 'sim.sled' },
        { say: 'Now the horizontal direction. Only one force acts along the ice: the 69.3 newtons. Divide by the mass, and the sled speeds up at 3.46 metres per second squared.', hide: ['vert', 'sim.weight', 'sim.normal'], show: ['hor', 'sim.velocity', 'sim.readout'], play: 'sim.go', playDelay: 6.5 },
      ],
    },
    {
      chapter: 'With friction',
      layout: 'center',
      main: [
        sled('On snow', { friction: [0.1, 0.1] }),
        { kind: 'math', id: 'fric', size: 'md', lines: ['\\bad{F_f = \\mu_k F_N = 0.1 \\times 156.2 = 15.6\\ \\text{N}}'] },
        { kind: 'math', id: 'acc', size: 'md', lines: ['a = \\dfrac{F_x - F_f}{m} = \\dfrac{69.3 - 15.6}{20} = \\good{2.68\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'Now pull the same sled, in the same way, across snow, where the coefficient of kinetic friction is 0.1. Friction depends on the normal force. And the normal force is still 156.2 newtons, not the full weight.', show: ['sim', 'sim.weight', 'sim.normal'], play: 'sim.name', playDelay: 0.6 },
        { say: 'So the friction is 0.1 times 156.2: 15.6 newtons, backwards.', show: ['fric', 'sim.friction'] },
        { say: 'That leaves 69.3 minus 15.6 newtons to speed up the sled, at 2.68 metres per second squared. With the full weight as the normal force, the friction would have come out too large.', hide: ['fric', 'sim.weight', 'sim.normal'], show: ['acc', 'sim.components', 'sim.velocity', 'sim.readout'], play: 'sim.go', playDelay: 5.5 },
      ],
    },
    {
      chapter: 'Two forces at right angles',
      layout: 'split',
      leftWidth: 540,
      left: [puck],
      right: [
        {
          kind: 'math',
          id: 'sum',
          size: 'md',
          lines: ['F_{\\text{net}} = \\sqrt{30^2 + 40^2} = \\thc{50\\ \\text{N}}', '\\tan\\theta = \\dfrac{40}{30} \\quad \\thc{\\theta = 53.1^\\circ}', 'a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{50}{10} = \\good{5\\ \\text{m/s}^2}'],
        },
      ],
      lines: [
        { say: 'Here is a puck of ten kilograms on frictionless ice, seen from above. One force pushes it east with thirty newtons, and another pulls it north with forty.', show: 'top', play: 'top.name', playDelay: 4.4 },
        { say: 'Forces at right angles add like displacements at right angles. The net force is the diagonal. Its size comes from the Pythagorean theorem: the square root of thirty squared plus forty squared, which is fifty newtons.', show: ['top.net', 'sum.0'] },
        { say: 'Its direction comes from the tangent. Forty over thirty gives 53.1 degrees, north of east.', show: 'sum.1' },
        { say: 'The puck speeds up along the net force, at fifty over ten: five metres per second squared. It does not go east, and it does not go north. It goes where the net force points.', show: ['sum.2', 'top.trail', 'top.readout'], play: 'top.go', playDelay: 7 },
      ],
    },
    {
      chapter: 'Equilibrium',
      layout: 'center',
      main: [sign, { kind: 'math', id: 'bal', size: 'md', lines: ['2F_T\\sin 40^\\circ = mg \\qquad \\brand{F_T = \\dfrac{117.7}{2 \\times 0.643} = 91.6\\ \\text{N}}'] }],
      lines: [
        { say: 'When the net force on an object is zero, it is in equilibrium, and the forces balance in each direction separately. This sign of twelve kilograms hangs at rest from two cables, each at forty degrees to the horizontal. Its weight is 117.7 newtons.', show: ['hang', 'hang.weight', 'hang.angles'] },
        { say: 'Each cable pulls along its own length. Sideways, the two tensions pull against each other, so they must be equal. Upwards, their vertical components together balance the weight.', show: 'hang.tension' },
        { say: 'So two times the tension times sine forty degrees equals 117.7 newtons, and the tension is 91.6 newtons in each cable. That is more than half the weight, because only the vertical part of each tension holds the sign up.', hide: 'hang.angles', show: ['bal', 'hang.components'] },
        { say: 'Now watch as the cables are pulled flatter. The vertical part of each tension has to stay at half the weight: 58.9 newtons. So the flatter the cables, the larger the tension must be.', play: 'hang.flatten', playDelay: 1.5, focus: 'hang.body' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two forces act on a 5 kg puck on frictionless ice: 6 N east and 8 N north. What is the size of its acceleration?',
          choices: ['$2.8\\ \\text{m/s}^2$', '$1.4\\ \\text{m/s}^2$', '$10\\ \\text{m/s}^2$', '$2\\ \\text{m/s}^2$'],
          answer: 3,
          working: 'Net force: $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\ \\text{N}$. Then $a = \\dfrac{10}{5} = 2\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two forces act on a puck of five kilograms, on frictionless ice: six newtons east, and eight newtons north. What is the size of its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The forces are at right angles, so use the Pythagorean theorem. Six squared plus eight squared is a hundred, and its square root is ten newtons. Ten newtons on five kilograms gives two metres per second squared. That is choice D. Adding six and eight directly gives choice A, which is too large.', show: 'q.answer' },
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
            'Split a slanted force: $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$',
            'A pull that slants upwards **reduces** the normal force: $F_N = mg - F\\sin\\theta$',
            'Forces at right angles: $F_{\\text{net}} = \\sqrt{F_x^2 + F_y^2}$, and the acceleration points along it',
            'In **equilibrium**, the forces balance in each direction',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Split a slanted force into two components: F cos theta along the horizontal, and F sine theta along the vertical, with the angle measured from the horizontal.', show: 'sum.0' },
        { say: 'A pull that slants upwards carries part of the weight, so it reduces the normal force, and the friction with it.', show: 'sum.1' },
        { say: 'Forces at right angles add with the Pythagorean theorem, and the acceleration points along the net force.', show: 'sum.2' },
        { say: 'And in equilibrium, the forces balance in each direction separately.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
