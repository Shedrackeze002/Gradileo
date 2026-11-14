import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 2.1: a force is a push or a pull drawn as an arrow, the forces on a block pulled along a
// floor, and the net force (forces the same way add, opposite forces subtract, zero is balanced).
// The block moves as its forces say (src/video/motion.ts), so the net force on the screen is the
// one that sets its motion.

const push = (n: number, name = 'Push'): MotionForce => ({ on: 'block', name, n, tone: 'opp' });
const friction = (n: number): MotionForce => ({ on: 'block', name: 'Friction', n: -n, resist: true, tone: 'bad' });

/** A 2 kg block on ice: 4 N to the right speeds it up, then 6 N to the left brings it to rest. */
const ice: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 380,
  lanes: [{ surface: 'smooth', label: 'Smooth ice: no friction' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 1.2 }],
  forceScale: 22,
  velocityScale: 26,
  poster: 'push',
  clips: {
    push: { phases: [{ dur: 1.5, forces: [push(4)] }] },
    back: { phases: [{ dur: 1, forces: [push(-6)] }, { dur: 0.6 }] },
  },
};

/** The four forces on a block pulled along a rough floor. */
const named: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 470,
  lanes: [{ surface: 'rough', label: 'A block pulled along a rough floor' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 3.4 }],
  forceScale: 7,
  clips: {
    updown: {
      phases: [
        {
          dur: 1,
          freeze: true,
          forces: [
            { on: 'block', name: 'Weight', n: -19.6, axis: 'y', tone: 'hyp' },
            { on: 'block', name: 'Normal force', n: 19.6, axis: 'y', tone: 'adj' },
          ],
        },
      ],
    },
    all: {
      phases: [
        {
          dur: 1,
          freeze: true,
          forces: [
            { on: 'block', name: 'Weight', n: -19.6, axis: 'y', tone: 'hyp' },
            { on: 'block', name: 'Normal force', n: 19.6, axis: 'y', tone: 'adj' },
            push(10, 'Pull'),
            friction(4),
          ],
        },
      ],
    },
  },
};

/** Forces along a rough floor on a 2 kg block: they appear, then the block moves as they say. */
const floor = (label: string, forces: MotionForce[], dur: number, x = 1.6, forceScale = 12): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 380,
  lanes: [{ surface: 'rough', label }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x }],
  forceScale,
  velocityScale: 26,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces }] },
    go: { phases: [{ dur, forces }] },
  },
});

const video: Explainer = {
  id: 'p10-2-1',
  lessonId: 'p10-2-1',
  title: 'Forces and Net Force',
  thumbnail: 'sim',
  summary:
    'A force is a push or a pull, drawn as an arrow. Watch forces speed a block up and slow it down, name the four forces on a block pulled along a floor, and see how forces add and subtract to give the net force that decides the motion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Forces and Net Force', subtitle: 'Pushes, pulls and how they add up' }],
      lines: [
        { say: 'Nothing starts moving, stops, or turns by itself. Whenever the motion of an object changes, something has pushed it or pulled it.', show: 'title' },
        { say: 'In this lesson, you will meet those pushes and pulls, learn their names, and see how to add them up.' },
      ],
    },
    {
      chapter: 'What a force is',
      layout: 'center',
      main: [{ kind: 'text', id: 'def', size: 'lg', md: 'A [[opp:force]] is a **push or a pull**, measured in **newtons (N)**.' }, ice],
      lines: [
        { say: 'A force is a push or a pull on an object. We measure it in newtons, and we draw it as an arrow.', show: 'def' },
        { say: 'This block sits at rest on smooth ice. Watch what a push of four newtons to the right does to it.', show: ['sim', 'sim.velocity'], play: 'sim.push', playDelay: 4.4 },
        { say: 'The arrow points the way the force acts, and the block sped up that way. Now a push the other way, six newtons to the left. Its arrow is longer, because the force is larger.', play: 'sim.back', playDelay: 8.6 },
        { say: 'This time, the force slowed the block down and brought it to rest. A force can change the speed of an object, its direction, or its shape.', focus: 'sim.block' },
        { say: 'A force has a size and a direction, so force is a vector.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Naming the forces',
      layout: 'center',
      main: [named, { kind: 'text', id: 'touch', size: 'md', md: 'Weight is a **non-contact** force. The normal force, friction and the pull are **contact** forces.' }],
      lines: [
        { say: 'Usually, several forces act at once. Here is a block being pulled along a rough floor. Let us name every force on it.', show: 'sim' },
        { say: 'The Earth pulls the block downwards. That pull of gravity is called its weight. The floor pushes up on the block, at right angles to the surface. That push is the normal force.', play: 'sim.updown', playDelay: 0.8 },
        { say: 'A rope pulls the block to the right. And friction, the grip between the two surfaces, acts against the sliding.', play: 'sim.all', playDelay: 0.6 },
        { say: 'Weight acts across a gap, so it is a non-contact force. The other three act only where things touch. They are contact forces.', show: 'touch', focus: 'sim' },
      ],
    },
    {
      chapter: 'Net force',
      layout: 'center',
      main: [
        floor('Push 12 N, friction 5 N', [push(12), friction(5)], 1.5),
        { kind: 'math', id: 'sum', size: 'md', lines: ['\\text{net force} = 12 - 5 = \\thc{7\\ \\text{N}}\\ \\text{to the right}'] },
      ],
      lines: [
        { say: 'What matters for the motion is the combined effect of all the forces. Here, a push of twelve newtons acts to the right, and friction of five newtons acts to the left.', show: 'sim', play: 'sim.ready', playDelay: 4.6 },
        { say: 'These two forces are in opposite directions, so they subtract. Twelve take away five leaves seven newtons to the right. That single force is called the net force.', show: ['sim.net', 'sum'] },
        { say: 'The net force is not zero, so we say the forces are unbalanced. Watch what the block does.', show: 'sim.velocity', play: 'sim.go', playDelay: 4.8 },
        { say: 'It speeds up, in the direction of the net force.', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Forces that add',
      layout: 'center',
      main: [
        floor('Two pushes against friction', [push(4, 'First push'), push(3, 'Second push'), friction(5)], 2, 1.6, 20),
        { kind: 'math', id: 'sum', size: 'md', lines: ['\\text{net force} = 4 + 3 - 5 = \\thc{2\\ \\text{N}}\\ \\text{to the right}'] },
      ],
      lines: [
        { say: 'Now two people push the block the same way, with four newtons and three newtons, while friction of five newtons acts against them.', show: 'sim', play: 'sim.ready', playDelay: 1.2 },
        { say: 'Forces in the same direction add. Four plus three is seven newtons to the right. Then take away the five. The net force is two newtons to the right.', show: ['sim.net', 'sum'] },
        { say: 'That is a small net force, so the block speeds up only gently.', show: 'sim.velocity', play: 'sim.go', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Balanced forces',
      layout: 'center',
      main: [
        floor('Push 5 N, friction 5 N', [push(5), { on: 'block', name: 'Friction', n: -5, tone: 'bad' }], 2, 4.5),
        { kind: 'callout', id: 'bal', tone: 'definition', title: 'Net force', md: 'The single force with the same effect as all the forces together. When it is **zero**, the forces are **balanced**.' },
      ],
      lines: [
        { say: 'Last, a push of five newtons, and friction of five newtons.', show: ['sim', 'sim.clock'], play: 'sim.ready', playDelay: 0.4 },
        { say: 'Five take away five is zero. When the net force is zero, the forces are balanced.', show: ['sim.net', 'bal'] },
        { say: 'Watch the block, and watch the clock.', play: 'sim.go', playDelay: 0.6 },
        { say: 'Time passed, but nothing changed. Balanced forces do not change the motion of an object.', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two people push a cart east with forces of 40 N and 30 N. Friction acts west with 50 N. What is the net force on the cart?',
          choices: ['20 N east', '120 N east', '20 N west', '70 N east'],
          answer: 0,
          working: 'Take east as positive: $40 + 30 - 50 = +20\\ \\text{N}$, so the net force is 20 N east.',
        },
      ],
      lines: [
        { say: 'Your turn. Two people push a cart east, with forces of forty newtons and thirty newtons. Friction acts west with fifty newtons. What is the net force on the cart? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Take east as positive. Forty plus thirty is seventy. Take away fifty, and the net force is twenty newtons east. That is choice A.', show: 'q.answer' },
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
            'A **force** is a push or a pull, in newtons, drawn as an arrow',
            'Weight acts without contact; the normal force, friction and tension need contact',
            '**Net force**: forces the same way add, opposite forces subtract',
            'Zero net force means the forces are **balanced**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A force is a push or a pull, measured in newtons, and drawn as an arrow.', show: 'end.0' },
        { say: 'Weight acts without contact. The normal force, friction and tension need contact.', show: 'end.1' },
        { say: 'To find the net force, add the forces that act the same way, and subtract the forces that act the opposite way.', show: 'end.2' },
        { say: 'And when the net force is zero, the forces are balanced.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
