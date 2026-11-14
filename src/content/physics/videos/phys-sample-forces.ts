import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// A sample of the animated physics videos (not yet a lesson of a course): what a force does to a
// block, shown by moving the block with the forces drawn on it. Every number on the screen comes
// from the motion itself (src/video/motion.ts), so the picture cannot disagree with the physics.

const push = (on: string, n: number): MotionForce => ({ on, name: 'Push', n, tone: 'opp' });

/** One block on ice: pushed with 4 N for two seconds (a = 2 m/s²), then left to coast. */
const ice: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 400,
  lanes: [{ surface: 'smooth', label: 'Smooth ice: no friction' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 0.8 }],
  forceScale: 22,
  velocityScale: 26,
  poster: 'push',
  clips: {
    push: { phases: [{ dur: 2, forces: [push('block', 4)] }] },
    coast: { phases: [{ dur: 1 }] },
  },
};

/** Two blocks side by side for a fair test: the same second and a half, forces `f` on masses `m`. */
const race = (f: [number, number], m: [number, number], labels: [string, string]): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  span: [0, 8.4],
  height: 490,
  lanes: [
    { surface: 'smooth', label: labels[0], labelSide: 'right' },
    { surface: 'smooth', label: labels[1], labelSide: 'right' },
  ],
  bodies: [
    { id: 'top', shape: 'block', mass: m[0], x: 0.9, lane: 0, width: 0.9 * Math.sqrt(m[0] / 2), tone: 'adj' },
    { id: 'bottom', shape: 'block', mass: m[1], x: 0.9, lane: 1, width: 0.9 * Math.sqrt(m[1] / 2), tone: 'hyp' },
  ],
  forceScale: 12,
  velocityScale: 18,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [push('top', f[0]), push('bottom', f[1])] }] },
    go: { phases: [{ dur: 1.5, forces: [push('top', f[0]), push('bottom', f[1])] }] },
  },
});

/** On a rough floor: weight and the normal force cancel, and friction takes 4 N off a 10 N push. */
const WEIGHT: MotionForce[] = [
  { on: 'block', name: 'Weight', n: -19.6, axis: 'y', tone: 'hyp' },
  { on: 'block', name: 'Normal force', n: 19.6, axis: 'y', tone: 'adj' },
];
const FRICTION: MotionForce = { on: 'block', name: 'Friction', n: -4, resist: true, tone: 'bad' };
const floor: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11.6],
  height: 540,
  lanes: [{ surface: 'rough', label: 'Rough floor' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 2.1 }],
  graph: { of: ['block'], seconds: 4.5, max: 5 },
  forceScale: 7,
  velocityScale: 26,
  clips: {
    updown: { phases: [{ dur: 1, freeze: true, forces: WEIGHT }] },
    all: { phases: [{ dur: 1, freeze: true, forces: [...WEIGHT, push('block', 10), FRICTION] }] },
    along: { phases: [{ dur: 0.6, freeze: true, forces: [push('block', 10), FRICTION] }] },
    // Net force 6 N on 2 kg: 3 m/s² for a second and a half.
    push: { phases: [{ dur: 1.5, forces: [push('block', 10), FRICTION] }] },
    // Friction alone: −2 m/s², so the block stops after 2.25 s; the clip runs a little longer.
    release: { phases: [{ dur: 2.75, forces: [FRICTION] }] },
  },
};

const video: Explainer = {
  id: 'phys-sample-forces',
  lessonId: '',
  label: 'Forces and Motion',
  tags: ['physics', 'forces', 'Newton’s second law', 'net force', 'friction', 'acceleration', 'F = ma', 'high school physics'],
  title: 'What a Force Does: Newton’s Second Law',
  thumbnailTitle: 'What a Force Does',
  thumbnail: 'sim',
  summary:
    'A force changes an object’s velocity. Watch a block speed up under a steady push, compare a bigger force and a bigger mass in two fair tests, and see how friction and the net force decide the acceleration: net force = mass × acceleration.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Motion', title: 'What a Force Does', subtitle: 'Newton’s second law, shown in motion' }],
      lines: [
        { say: 'Push a box across the floor, and it starts to move. Push harder, and it picks up speed more quickly.', show: 'title' },
        { say: 'In this video, you will watch what a force really does to an object, and see where one of the most famous rules in physics comes from.' },
      ],
    },
    {
      chapter: 'A force changes motion',
      layout: 'center',
      main: [{ kind: 'text', id: 'def', size: 'lg', md: 'A [[opp:force]] is a **push or a pull**, measured in **newtons (N)**.' }, ice],
      lines: [
        { say: 'A force is a push or a pull on an object. We measure it in newtons.', show: 'def' },
        { say: 'Here is a two kilogram block, sitting still on smooth ice. Nothing pushes it, so it stays at rest.', show: ['sim', 'sim.velocity', 'sim.clock'] },
        { say: 'Now we push it to the right with a steady force of four newtons. Keep your eye on the green arrow, which shows its velocity.', show: 'sim.strobe', play: 'sim.push', playDelay: 4.2 },
        { say: 'The block did not just move. It moved faster and faster. Look at the marks it left behind, one every half second. They get further and further apart.', focus: 'sim.block' },
        { say: 'So a force changes the velocity of an object. That change in velocity is called acceleration.', focus: 'sim' },
        { say: 'Now the push stops. With no force, and no friction on the ice, the block does not slow down. It carries on at a steady four metres per second, and its marks are evenly spaced.', play: 'sim.coast', playDelay: 4.5 },
      ],
    },
    {
      chapter: 'A bigger force',
      layout: 'center',
      main: [race([4, 8], [2, 2], ['Push: 4 newtons', 'Push: 8 newtons']), { kind: 'text', id: 'rule', size: 'md', md: 'Same mass: **double the force** gives **double the acceleration**.' }],
      lines: [
        { say: 'Let us run a fair test. Here are two identical blocks, two kilograms each.', show: ['sim', 'sim.velocity', 'sim.readout'] },
        { say: 'The top block gets a push of four newtons. The bottom block gets eight newtons, twice as much. The longer arrow is the bigger force.', play: 'sim.ready', playDelay: 1 },
        { say: 'Watch them go.', show: 'sim.strobe', play: 'sim.go', playDelay: 0.8 },
        { say: 'The bottom block pulled far ahead. Its acceleration was four metres per second squared, and the top block managed only two. In the same time, it reached twice the velocity.', focus: 'sim.bottom' },
        { say: 'With the same mass, twice the force gives twice the acceleration.', show: 'rule', focus: 'sim' },
      ],
    },
    {
      chapter: 'A bigger mass',
      layout: 'center',
      main: [race([8, 8], [2, 4], ['Mass: 2 kilograms', 'Mass: 4 kilograms']), { kind: 'text', id: 'rule', size: 'md', md: 'Same force: **double the mass** gives **half the acceleration**.' }],
      lines: [
        { say: 'Now a different test. This time the bottom block has twice the mass, four kilograms.', show: ['sim', 'sim.velocity', 'sim.readout'] },
        { say: 'Both blocks get exactly the same push, eight newtons.', play: 'sim.ready', playDelay: 0.6 },
        { say: 'Watch what the extra mass does.', show: 'sim.strobe', play: 'sim.go', playDelay: 1 },
        { say: 'The heavier block is harder to get moving. The same push gave it only two metres per second squared, half as much as the lighter block.', focus: 'sim.bottom' },
        { say: 'With the same force, twice the mass gives half the acceleration.', show: 'rule', focus: 'sim' },
      ],
    },
    {
      chapter: 'Newton’s second law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'law', size: 'xl', lines: ['\\text{acceleration} = \\dfrac{\\opp{\\text{net force}}}{\\text{mass}}', '\\opp{F_{\\text{net}}} = m \\times a'] },
        { kind: 'math', id: 'check', size: 'md', lines: ['a = \\dfrac{\\opp{4\\ \\text{N}}}{2\\ \\text{kg}} = 2\\ \\text{m/s}^2'] },
      ],
      lines: [
        { say: 'Put those two tests together, and you have Newton’s second law. Acceleration equals net force divided by mass.', show: 'law.0' },
        { say: 'It is usually written the other way round. Net force equals mass times acceleration.', show: 'law.1', focus: 'law.1' },
        { say: 'Force is in newtons, mass is in kilograms, and acceleration is in metres per second squared.' },
        { say: 'Check it against the very first block. Four newtons, divided by two kilograms, is two metres per second squared. After two seconds, that makes four metres per second, which is exactly what the block did.', show: 'check', focus: 'law' },
      ],
    },
    {
      chapter: 'Friction and net force',
      layout: 'center',
      main: [floor],
      lines: [
        { say: 'Real floors are not like ice. Here, a two kilogram block sits on a rough floor.', show: ['sim', 'sim.clock'] },
        { say: 'Its weight pulls it down, and the floor pushes up on it with an equal force, called the normal force. Those two cancel, so the block does not move up or down.', play: 'sim.updown', playDelay: 0.4 },
        { say: 'Now we push to the right with ten newtons. Friction pushes back along the floor with four newtons.', play: 'sim.all', playDelay: 1 },
        { say: 'From here on, we watch only the forces along the floor. Friction always acts against the motion, so these two forces do not add up. They subtract. Ten take away four leaves a net force of six newtons to the right.', show: ['sim.net', 'sim.velocity'], play: 'sim.along' },
        { say: 'It is the net force that sets the acceleration. Six newtons on two kilograms gives three metres per second squared. Watch the block, and watch the graph of its velocity.', show: ['sim.readout', 'sim.strobe', 'sim.graph'], play: 'sim.push', playDelay: 9.5 },
        { say: 'Now we let go. The push has gone, but friction is still there. It is the only force along the floor now, so the net force points backwards, and the block slows down.', play: 'sim.release', playDelay: 1.3 },
        { say: 'The marks crowd together until friction brings the block to rest. On the graph, the velocity climbed while we pushed, then fell in a straight line back to zero. Slowing down is an acceleration as well. It is just a negative one.', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 4 kg box is pushed across a floor with a force of 30 N. Friction on the box is 6 N. What is its acceleration?',
          choices: ['$9\\ \\text{m/s}^2$', '$7.5\\ \\text{m/s}^2$', '$6\\ \\text{m/s}^2$', '$24\\ \\text{m/s}^2$'],
          answer: 2,
          working: 'Net force $= 30 - 6 = 24\\ \\text{N}$, and $a = 24 \\div 4 = 6\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A four kilogram box is pushed across a floor with a force of thirty newtons. Friction on the box is six newtons. What is its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The net force is thirty take away six, which is twenty-four newtons. Twenty-four divided by four kilograms is six metres per second squared. That is choice C.', show: 'q.answer' },
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
            'A **force** is a push or a pull, measured in newtons',
            'A net force makes an object **accelerate**',
            'More force, more acceleration; more mass, less acceleration',
            '$F_{\\text{net}} = m \\times a$',
            'Friction acts **against** the motion',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A force is a push or a pull, measured in newtons.', show: 'sum.0' },
        { say: 'A net force makes an object accelerate. More force means more acceleration, and more mass means less.', show: ['sum.1', 'sum.2'] },
        { say: 'Net force equals mass times acceleration.', show: 'sum.3' },
        { say: 'And friction acts against the motion, so always find the net force first.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
