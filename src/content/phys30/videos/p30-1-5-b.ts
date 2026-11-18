import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.5, second half: glancing collisions and explosions. The pictures are views from above
// (src/video/flight.ts). Ball A strikes ball B off centre, and the two are turned aside by the
// impulse each gives the other along the line through their centres, so the velocities after the
// collision are worked out, not typed in. A shell at rest is blown into three pieces by impulses
// that add up to zero. The bars show the east and north momentum each staying what it was.

const RAD = Math.PI / 180;

// The lesson's glancing collision: 0.5 kg at 4 m/s strikes 0.5 kg at rest. Ball A is aimed off
// centre so that the line through the centres points 46.94° south of east as they touch, and the
// balls part at 0.5035 of the speed at which they closed. Ball A then leaves at 3 m/s, 30° north of
// east, and ball B at 2.05 m/s, 46.9° south of east.
const LINE = 46.936 * RAD;
const RADIUS = 0.3;
const OFFSET = 2 * RADIUS * Math.sin(LINE);

/** Ball A, which starts `from` metres west of ball B, and ball B from above; with `restitution` 1 the collision is elastic. */
function shot(o: { id: string; restitution: number; from: number; after: number; view: [number, number, number, number]; height: number; bars?: boolean; velocityScale?: number }): FlightEl {
  // The time ball A takes to reach ball B.
  const reach = (o.from - 2 * RADIUS * Math.cos(LINE)) / 4;
  return {
    kind: 'flight',
    id: o.id,
    scene: 'map',
    view: o.view,
    poster: 'hit',
    height: o.height,
    tick: 1,
    velocityScale: o.velocityScale ?? 30,
    angleDecimals: 1,
    speedDecimals: 2,
    collisions: { restitution: o.restitution },
    ...(o.bars ? { momentum: { max: 2, min: -1 } } : {}),
    bodies: [
      { id: 'a', shape: 'puck', label: 'A', mass: 0.5, radius: RADIUS, at: [-o.from, OFFSET], v: [4, 0], tone: 'adj' },
      { id: 'b', shape: 'puck', label: 'B', mass: 0.5, radius: RADIUS, at: [0, 0], tone: 'opp' },
    ],
    clips: { hit: { phases: [{ dur: reach + o.after, slow: 4, note: 'Slow motion' }] } },
  };
}

const glance = shot({ id: 'sim', restitution: 0.50345, from: 3, after: 0.7, view: [-3.9, 5.2, -2.6, 2.8], height: 440, bars: true });

// For the energy check, side by side: the same collision, which loses 0.7 J, and the same shot
// with an elastic collision. Equal masses, one at rest, so the elastic paths are at 90° (43.1° north
// of east and 46.9° south of east).
const SIDE = { from: 2, after: 0.5, view: [-2.8, 4.6, -2.3, 2.5] as [number, number, number, number], height: 360, velocityScale: 24 };
const lossy = shot({ id: 'lossy', restitution: 0.50345, ...SIDE });
const pure = shot({ id: 'pure', restitution: 1, ...SIDE });

// The lesson's shell: at rest, it bursts into 2 kg going east at 6 m/s, 3 kg going north at 3 m/s
// and a third piece of 1.5 kg, which must carry 12 kg·m/s west and 9 kg·m/s south: 10 m/s at 36.9°
// south of west. The three pieces start touching, 120° apart.
const PIECE = 0.7;
const around = (deg: number): [number, number] => [1.2 * PIECE * Math.cos(deg * RAD), 1.2 * PIECE * Math.sin(deg * RAD)];
const shell: FlightEl = {
  kind: 'flight',
  id: 'boom',
  scene: 'map',
  view: [-10.5, 9.5, -7.7, 4.3],
  height: 440,
  velocityScale: 8,
  angleDecimals: 1,
  momentum: { max: 15, min: -15 },
  bodies: [
    { id: 'east', shape: 'puck', label: '2 kg', labelAt: 'above', mass: 2, radius: PIECE, at: around(30), tone: 'adj' },
    { id: 'north', shape: 'puck', label: '3 kg', labelAt: 'left', mass: 3, radius: PIECE, at: around(150), tone: 'opp' },
    { id: 'third', shape: 'puck', label: '1.5 kg', labelAt: 'below', mass: 1.5, radius: PIECE, at: around(270), tone: 'brand' },
  ],
  clips: {
    burst: {
      phases: [
        { dur: 0.2, slow: 5 },
        { dur: 0.45, slow: 5, note: 'Slow motion', kick: { east: [12, 0], north: [0, 9], third: [-12, -9] } },
      ],
    },
  },
};

const video: Explainer = {
  id: 'p30-1-5-b',
  lessonId: 'p30-1-5',
  title: 'Glancing Collisions and Explosions',
  thumbnailTitle: 'Glancing Collisions',
  thumbnail: 'sim',
  summary:
    'A ball clips the edge of another, and the two go off on opposite sides of the original path. Balance the east momentum and the north momentum to find the speed and direction of the second ball, check whether the collision was elastic, and find the third piece of a shell that bursts from rest.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Glancing Collisions and Explosions', subtitle: 'Balance the momentum in two directions' }],
      lines: [
        { say: 'A billiard ball clips the edge of another. It is turned to one side, and the ball it hit goes off to the other side.', show: 'title' },
        { say: 'Most collisions are like this one: not head-on, but glancing. We balance the momentum in two directions, first for a glancing collision and then for an explosion.' },
      ],
    },
    {
      chapter: 'A glancing collision',
      layout: 'center',
      main: [
        glance,
        {
          kind: 'math',
          id: 'parts',
          size: 'md',
          lines: [
            '\\adj{p_{A,E}} = 0.5 \\times 3\\cos 30° = \\adj{1.299} \\qquad \\opp{p_{A,N}} = 0.5 \\times 3\\sin 30° = \\opp{0.750}',
            '\\adj{p_{B,E}} = 2.000 - 1.299 = \\adj{0.701} \\qquad \\opp{p_{B,N}} = 0 - 0.750 = \\opp{-0.750\\ \\text{kg·m/s}}',
          ],
        },
      ],
      lines: [
        { say: 'Here are two balls seen from above, each with a mass of half a kilogram. Ball A moves east at four metres per second, so it carries two kilogram metres per second of east momentum. Ball B is at rest, and ball A is aimed a little off centre.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'Watch what happens when they touch.', show: 'sim.trail', play: 'sim.hit', playDelay: 0.3, wait: 3.6 },
        { say: 'Ball A is turned to the north, and ball B goes off to the south. Look at the north bars. There was no north momentum before the collision, so there is none after it: what ball A has to the north, ball B has to the south.' },
        { say: 'In a problem we are told how ball A leaves: at three metres per second, thirty degrees north of east. So its east momentum is 0.5 times three times the cosine of thirty degrees, which is 1.299. Its north momentum uses the sine, and is 0.75.', show: 'parts.0' },
        { say: 'Ball B has whatever is left. East: two minus 1.299, which is 0.701. North: zero minus 0.75. The minus sign means 0.75 to the south.', show: 'parts.1' },
      ],
    },
    {
      chapter: 'The speed of ball B',
      layout: 'center',
      main: [
        glance,
        {
          kind: 'math',
          id: 'solve',
          size: 'md',
          lines: ['p_B = \\sqrt{\\adj{0.701}^2 + \\opp{0.750}^2} = 1.027 \\qquad v_B = 1.027 \\div 0.5 = \\good{2.05\\ \\text{m/s}}', '\\theta = \\tan^{-1}(0.750 \\div 0.701) = \\good{46.9°\\ \\text{south of east}}'],
        },
      ],
      lines: [
        { say: 'Watch the collision again. Ball B leaves with two components of momentum: 0.701 east, and 0.75 south.', show: ['sim', 'sim.velocity', 'sim.trail', 'sim.bars', 'sim.total'], play: 'sim.hit', playDelay: 0.3, wait: 0.5 },
        { say: 'They are at right angles, so the Pythagorean theorem gives the size: the square root of 0.701 squared plus 0.75 squared, which is 1.027. Divide by the mass, half a kilogram, and ball B moves at 2.05 metres per second.', show: ['solve.0', 'sim.speed'] },
        { say: 'And the tangent gives its direction: 46.9 degrees south of east.', show: ['solve.1', 'sim.angle'] },
      ],
    },
    {
      chapter: 'Was it elastic?',
      layout: 'split',
      leftWidth: 556,
      centreRight: true,
      left: [
        { kind: 'text', id: 'ours', size: 'md', md: 'The collision we solved' },
        lossy,
        { kind: 'math', id: 'energy', size: 'md', lines: ['E_k:\\ 4.0\\ \\text{J} \\to \\bad{3.30\\ \\text{J}}'] },
      ],
      right: [
        { kind: 'text', id: 'ideal', size: 'md', md: 'A perfectly elastic collision' },
        pure,
        { kind: 'math', id: 'right', size: 'md', lines: ['43.1° + 46.9° = \\good{90°}'] },
      ],
      lines: [
        { say: 'Was that collision elastic? Kinetic energy has no direction, so we just add it up. Here is the collision once more.', show: ['ours', 'lossy', 'lossy.velocity', 'lossy.trail'], play: 'lossy.hit', playDelay: 4.5, wait: 0.4 },
        { say: 'Before it, ball A had half times 0.5 times four squared: 4.0 joules. After it, ball A has 2.25 joules and ball B has 1.05, which makes 3.30. So 0.7 joules were lost, and the collision was inelastic.', show: ['lossy.speed', 'energy'] },
        { say: 'On the right is the same shot when the collision is perfectly elastic.', show: ['ideal', 'pure', 'pure.velocity', 'pure.trail'], play: 'pure.hit', playDelay: 1, wait: 1.2 },
        { say: 'Now the two paths make a right angle: 43.1 degrees on one side of the original path and 46.9 on the other. This is always true when two equal masses collide elastically, with one of them at rest, and not head-on.', show: ['pure.angle', 'right'] },
      ],
    },
    {
      chapter: 'An explosion into three pieces',
      layout: 'center',
      main: [
        shell,
        {
          kind: 'math',
          id: 'third',
          size: 'md',
          lines: ['p = \\sqrt{\\adj{12}^2 + \\opp{9}^2} = 15\\ \\text{kg·m/s} \\qquad v = 15 \\div 1.5 = \\good{10\\ \\text{m/s}}', '\\theta = \\tan^{-1}(\\opp{9} \\div \\adj{12}) = \\good{36.9°\\ \\text{south of west}}'],
        },
      ],
      lines: [
        { say: 'Explosions follow the same rule. This shell is at rest, so its total momentum is zero, in each direction.', show: ['boom', 'boom.bars', 'boom.total'] },
        { say: 'It bursts into three pieces.', show: ['boom.velocity', 'boom.trail'], play: 'boom.burst', playDelay: 0.2, wait: 2.6 },
        { say: 'A two kilogram piece flies east at six metres per second, with twelve kilogram metres per second of momentum. A three kilogram piece flies north at three, with nine. Look at the bars: both totals must stay zero, so the third piece carries twelve to the west and nine to the south.' },
        { say: 'Its momentum is the square root of twelve squared plus nine squared, which is fifteen. Its mass is 1.5 kilograms, so its speed is ten metres per second.', show: ['third.0', 'boom.speed'] },
        { say: 'And the tangent gives its direction: 36.9 degrees south of west.', show: ['third.1', 'boom.angle'] },
      ],
    },
    {
      chapter: 'Balance both directions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'wrong', size: 'md', lines: ['\\bad{v_B = 0.701 \\div 0.5 = 1.40\\ \\text{m/s}}', '\\good{v_B = \\sqrt{0.701^2 + 0.750^2} \\div 0.5 = 2.05\\ \\text{m/s}}'] },
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'Conserving only the momentum along the first direction', md: 'Both directions must balance. With **no north momentum before** the collision, the two objects leave on **opposite sides** of the original path.' },
      ],
      lines: [
        { say: 'Here is the mistake to avoid. In the glancing collision, it is easy to balance the east momentum, find 0.701 for ball B, and stop there. That gives a speed of 1.4 metres per second, but it is only one component of the velocity.', show: 'wrong.0' },
        { say: 'Both directions must balance. There was no north momentum before the collision, so the two objects must leave on opposite sides of the original path, and the north component is part of the answer.', show: ['wrong.1', 'trap'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An object at rest explodes into three pieces. One piece has a momentum of 3 kg·m/s east, and another has 4 kg·m/s north. The third piece has a mass of 0.5 kg. What is its speed?',
          choices: ['$14\\ \\text{m/s}$', '$2.5\\ \\text{m/s}$', '$10\\ \\text{m/s}$', '$5\\ \\text{m/s}$'],
          answer: 2,
          working: 'The third piece has 3 kg·m/s west and 4 kg·m/s south: $\\sqrt{3^2 + 4^2} = 5\\ \\text{kg·m/s}$. Speed: $5 \\div 0.5 = 10\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object at rest explodes into three pieces. One piece has a momentum of three kilogram metres per second east, and another has four kilogram metres per second north. The third piece has a mass of half a kilogram. What is its speed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The totals must stay zero, so the third piece has three to the west and four to the south. Its momentum is the square root of three squared plus four squared, which is five. Divide by half a kilogram, and its speed is ten metres per second. That is choice C.', show: 'q.answer' },
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
            'Balance the **east** momentum and the **north** momentum, one at a time',
            'A target at rest: the two objects leave on **opposite sides** of the original path',
            'The pieces of an explosion from rest have momenta that **add to zero**',
            'Kinetic energy has no direction: add it up to see if a collision was elastic',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a glancing collision, balance the east momentum and the north momentum, one at a time.', show: 'sum.0' },
        { say: 'When the target is at rest, the two objects leave on opposite sides of the original path.', show: 'sum.1' },
        { say: 'The pieces of an explosion from rest have momenta that add to zero, in each direction.', show: 'sum.2' },
        { say: 'And kinetic energy has no direction. Add it up before and after to see whether a collision was elastic.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
