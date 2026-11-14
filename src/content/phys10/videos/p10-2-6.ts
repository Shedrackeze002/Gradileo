import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Lesson 2.6: Newton's third law. Every push in this video is drawn as its pair: equal forces,
// opposite ways, on two different bodies. The bodies move as those forces say
// (src/video/motion.ts), so the lighter one really does accelerate more.

/** Two bodies that push each other apart with `n` newtons for `dur` seconds, then roll on. */
function pair(o: { label: string; left: MotionBody; right: MotionBody; n: number; dur: number; slow?: number; coast: number; names: [onLeft: string, onRight: string]; forceScale: number; velocityScale?: number }): MotionEl {
  const forces = [
    { on: o.left.id, name: o.names[0], n: -o.n, tone: 'opp' as const },
    { on: o.right.id, name: o.names[1], n: o.n, tone: 'opp' as const },
  ];
  return {
    kind: 'motion',
    id: 'sim',
    span: [0, 10],
    height: 380,
    lanes: [{ surface: 'smooth', label: o.label }],
    bodies: [o.left, o.right],
    forceScale: o.forceScale,
    velocityScale: o.velocityScale ?? 30,
    poster: 'ready',
    clips: {
      ready: { phases: [{ dur: 1, freeze: true, forces }] },
      go: { phases: [{ dur: o.dur, slow: o.slow, note: o.slow ? 'Slow motion' : undefined, forces }] },
      coast: { phases: [{ dur: o.coast }] },
    },
  };
}

// A 50 kg skater pushes a wall with 100 N for a second: the wall pushes back, and the skater leaves at 2 m/s.
const wall = () =>
  pair({
    label: 'A skater pushes on a wall',
    left: { id: 'skater', shape: 'cart', mass: 50, label: 'skater', x: 4.72, width: 1.3, tone: 'adj' },
    right: { id: 'wall', shape: 'block', mass: 1e7, label: 'wall', x: 6, width: 1.2, tone: 'hyp' },
    n: 100,
    dur: 1,
    coast: 1.2,
    names: ['Wall on skater', 'Skater on wall'],
    forceScale: 0.9,
  });

// Skater A (40 kg) and skater B (80 kg) push apart with 200 N for 0.4 s: 5 m/s² and 2.5 m/s².
const skaters = () =>
  pair({
    label: 'Skater A: 40 kg. Skater B: 80 kg',
    left: { id: 'a', shape: 'cart', mass: 40, label: 'A', x: 4.3, width: 0.9, tone: 'adj' },
    right: { id: 'b', shape: 'cart', mass: 80, label: 'B', x: 5.45, width: 1.3, tone: 'hyp' },
    n: 200,
    dur: 0.4,
    slow: 8,
    coast: 1.4,
    names: ['B on A', 'A on B'],
    forceScale: 0.5,
  });

// A 4 kg rocket pushes 1 kg of gas backwards with 8 N for half a second.
const rocket = () =>
  pair({
    label: 'A rocket in space',
    left: { id: 'gas', shape: 'ball', mass: 1, label: 'gas', x: 5.2, width: 0.6, tone: 'hyp' },
    right: { id: 'rocket', shape: 'cart', mass: 4, label: 'rocket', x: 6.5, width: 2, tone: 'adj' },
    n: 8,
    dur: 0.5,
    slow: 5,
    coast: 0.6,
    names: ['Rocket on gas', 'Gas on rocket'],
    forceScale: 12,
    velocityScale: 26,
  });

/** A book on a table: its weight and the normal force balance, but they are not a third-law pair. */
const book: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 430,
  lanes: [{ surface: 'rough', label: 'A book resting on a table' }],
  bodies: [{ id: 'book', shape: 'block', mass: 1, label: 'book', x: 4, width: 1.3 }],
  forceScale: 9,
  clips: {
    forces: {
      phases: [
        {
          dur: 1,
          freeze: true,
          forces: [
            { on: 'book', name: 'Weight', n: -9.8, axis: 'y', tone: 'hyp' },
            { on: 'book', name: 'Normal force', n: 9.8, axis: 'y', tone: 'adj' },
          ],
        },
      ],
    },
  },
};

// A 1 kg car at 4 m/s runs into a 4 kg truck at rest, and they lock together.
const car: MotionBody = { id: 'car', shape: 'cart', mass: 1, label: 'car', x: 1.4, v: 4, width: 1, tone: 'adj' };
const truck: MotionBody = { id: 'truck', shape: 'cart', mass: 4, label: 'truck', x: 5.8, width: 2.2, tone: 'opp' };
const [approach, touch, away] = collision(car, truck, { type: 'stick', after: 2.2, slow: 70, note: 'Slow motion', names: ['Truck on car', 'Car on truck'] });
const crash: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 380,
  lanes: [{ surface: 'smooth', label: 'Car: 1 kg. Truck: 4 kg' }],
  bodies: [car, truck],
  forceScale: 3,
  velocityScale: 26,
  clips: {
    approach: { phases: [approach] },
    touch: { phases: [{ ...touch, forces: touch.forces?.map((f) => ({ ...f, tone: 'opp' as const })) }] },
    away: { phases: [away] },
  },
};

const video: Explainer = {
  id: 'p10-2-6',
  lessonId: 'p10-2-6',
  title: 'Newton’s Third Law',
  thumbnail: 'sim',
  summary:
    'Forces never come alone: every push is answered by an equal push back. Watch a skater push off a wall, two skaters push each other apart, a rocket throw gas backwards and a car hit a truck, and see why equal forces can still give very different accelerations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Newton’s Third Law', subtitle: 'Every push is answered by a push back' }],
      lines: [
        { say: 'Stand on a skateboard, and push hard against a wall. You roll backwards, although you never pushed yourself.', show: 'title' },
        { say: 'Forces never come alone. In this lesson, you will see why every push is answered by a push back.' },
      ],
    },
    {
      chapter: 'A push back',
      layout: 'center',
      main: [
        wall(),
        {
          kind: 'callout',
          id: 'law',
          tone: 'definition',
          title: 'Newton’s third law',
          md: 'When A exerts a force on B, B exerts a force on A that is **equal in size** and **opposite in direction**.',
        },
      ],
      lines: [
        { say: 'Here is a skater on a skateboard, beside a wall. The skater pushes on the wall with one hundred newtons. At the same moment, the wall pushes back on the skater with one hundred newtons, the other way.', show: 'sim', play: 'sim.ready', playDelay: 4.2 },
        { say: 'Watch which one of them moves.', show: 'sim.velocity', play: 'sim.go', playDelay: 0.6 },
        { say: 'The skater rolls away from the wall. The force that moved the skater came from the wall.', play: 'sim.coast', focus: 'sim.skater' },
        { say: 'This is Newton’s third law. When object A exerts a force on object B, object B exerts a force on object A, that is equal in size, and opposite in direction.', show: 'law', focus: 'sim' },
      ],
    },
    {
      chapter: 'A third-law pair',
      layout: 'center',
      main: [skaters(), { kind: 'text', id: 'pairs', size: 'md', md: 'A pair is **equal** in size, **opposite** in direction, and acts on **two different objects**.' }],
      lines: [
        { say: 'The two forces are called a third-law pair. Here are two skaters at rest on smooth ice. Skater A pushes skater B with two hundred newtons. So skater B pushes skater A with two hundred newtons.', show: 'sim', play: 'sim.ready', playDelay: 7.5 },
        { say: 'To find the partner of a force, swap the two objects. A pushes B, becomes B pushes A.', focus: ['sim.a', 'sim.b'] },
        { say: 'Notice that the two forces act on different objects. One is on skater A, and the other is on skater B. So they can never cancel each other.', show: 'pairs', focus: 'sim' },
      ],
    },
    {
      chapter: 'Equal forces, different accelerations',
      layout: 'center',
      main: [
        skaters(),
        { kind: 'math', id: 'acc', size: 'md', lines: ['a_A = \\dfrac{200\\ \\text{N}}{40\\ \\text{kg}} = \\good{5\\ \\text{m/s}^2} \\qquad a_B = \\dfrac{200\\ \\text{N}}{80\\ \\text{kg}} = \\good{2.5\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'The forces of a pair are equal, but their effects need not be. Skater A has a mass of forty kilograms, and skater B has eighty. Watch them push apart, in slow motion.', show: ['sim', 'sim.velocity', 'sim.readout'], play: 'sim.ready', playDelay: 7 },
        { say: 'Each skater feels the same two hundred newtons. But look at the accelerations.', play: 'sim.go', playDelay: 0.5 },
        { say: 'For each skater, acceleration is force divided by mass. Skater A gets five metres per second squared. Skater B, with twice the mass, gets only two point five.', show: 'acc', hide: 'sim.readout', play: 'sim.coast', playDelay: 1 },
        { say: 'So the lighter skater leaves twice as fast. Equal forces give different accelerations when the masses differ.', focus: 'sim.a' },
      ],
    },
    {
      chapter: 'Rockets',
      layout: 'center',
      main: [rocket(), { kind: 'text', id: 'space', size: 'md', md: 'The rocket pushes the gas **backwards**. The gas pushes the rocket **forwards**.' }],
      lines: [
        { say: 'The third law is how a rocket flies. The engine pushes hot gas backwards. So the gas pushes the rocket forwards.', show: ['sim', 'sim.velocity'], play: 'sim.ready', playDelay: 2.5 },
        { say: 'Watch the pair of forces at work.', play: 'sim.go', playDelay: 0.3 },
        { say: 'The gas shoots one way, and the rocket moves the other way. No air is needed to push against, so this works in space.', show: 'space', play: 'sim.coast' },
      ],
    },
    {
      chapter: 'Balanced forces are not a pair',
      layout: 'center',
      main: [book, { kind: 'text', id: 'same', size: 'md', md: 'These forces act on the **same** object, so they are **not** a third-law pair.' }],
      lines: [
        { say: 'Be careful with one thing. A book rests on a table. Its weight pulls it down, and the normal force pushes it up. These two forces are equal and opposite.', show: 'sim', play: 'sim.forces', playDelay: 3 },
        { say: 'But both of them act on the book, the same object. They balance, yet they are not a third-law pair.', show: 'same', focus: 'sim.book' },
        { say: 'The weight is the Earth pulling the book. Swap the objects, and its real partner is the book pulling the Earth upwards.' },
      ],
    },
    {
      chapter: 'A collision',
      layout: 'center',
      main: [crash, { kind: 'text', id: 'crashRule', size: 'md', md: 'The **forces** are equal. The **accelerations** are not.' }],
      lines: [
        { say: 'Last, a collision. A small car runs into a truck that has four times its mass.', show: ['sim', 'sim.velocity'], play: 'sim.approach', playDelay: 1.6 },
        { say: 'Here is the moment they touch, in slow motion. The truck pushes on the car, and the car pushes on the truck, with forces of exactly the same size.', show: 'sim.readout', play: 'sim.touch', playDelay: 0.4 },
        { say: 'The bigger object does not push harder. But the same force acts on a much smaller mass, so the motion of the car changes four times as much.', show: 'crashRule', hide: 'sim.readout', play: 'sim.away', focus: 'sim.car' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two skaters stand at rest on smooth ice. A 60 kg skater pushes a 30 kg skater with a force of 90 N. What is the acceleration of the 60 kg skater while they push?',
          choices: ['$3\\ \\text{m/s}^2$', '$1.5\\ \\text{m/s}^2$', '$0\\ \\text{m/s}^2$', '$0.67\\ \\text{m/s}^2$'],
          answer: 1,
          working: 'By the third law, the 60 kg skater also feels 90 N. $a = 90 \\div 60 = 1.5\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two skaters stand at rest on smooth ice. A sixty kilogram skater pushes a thirty kilogram skater, with a force of ninety newtons. What is the acceleration of the sixty kilogram skater, while they push? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'By the third law, the sixty kilogram skater feels ninety newtons as well. Ninety divided by sixty is one point five metres per second squared. That is choice B.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            '**Third law**: if A pushes B, B pushes A with an equal and opposite force',
            'The two forces act on **different** objects, so they never cancel',
            'To find the partner of a force, swap the two objects',
            'Equal forces, different masses: the lighter object accelerates more',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Newton’s third law says that if A pushes B, then B pushes A, with an equal and opposite force.', show: 'end.0' },
        { say: 'The two forces act on different objects, so they never cancel.', show: 'end.1' },
        { say: 'To find the partner of a force, swap the two objects.', show: 'end.2' },
        { say: 'And when the masses differ, equal forces give different accelerations. The lighter object accelerates more.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
