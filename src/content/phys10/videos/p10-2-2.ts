import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 2.2: Newton's first law (no net force, no change in velocity), a steady velocity under
// balanced forces, and inertia as a property of mass. Every block moves as its forces say
// (src/video/motion.ts): friction is what stops the one on the rough floor.

const friction = (on: string, n: number, name = 'Friction'): MotionForce => ({ on, name, n: -n, resist: true, tone: 'bad' });

/** The same slide on a rough floor and on ice: friction of 4 N stops the top block in 2 s. */
const slide: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 20],
  height: 470,
  lanes: [{ surface: 'rough', label: 'Rough floor' }, { surface: 'smooth', label: 'Smooth ice: no friction' }],
  bodies: [
    { id: 'top', shape: 'block', mass: 2, x: 1.5, v: 4, width: 1.5, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'block', mass: 2, x: 1.5, v: 4, width: 1.5, lane: 1, tone: 'hyp' },
  ],
  forceScale: 16,
  velocityScale: 22,
  clips: { go: { phases: [{ dur: 4, forces: [friction('top', 4)] }] } },
};

/** A block on ice with no force on it: it keeps its 3 m/s, and its marks are evenly spaced. */
const coast: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 350,
  strobe: 0.5,
  lanes: [{ surface: 'smooth', label: 'No force along the ice' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 1.2, v: 3 }],
  velocityScale: 26,
  clips: { go: { phases: [{ dur: 3 }] } },
};

/** Pushed with 6 N against 6 N of friction: a steady 3 m/s. When the push stops, friction stops the block. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 380,
  strobe: 0.5,
  lanes: [{ surface: 'rough', label: 'Pushed along a rough floor' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 1.5, v: 3 }],
  forceScale: 12,
  velocityScale: 26,
  clips: {
    push: { phases: [{ dur: 2, forces: [{ on: 'block', name: 'Push', n: 6, tone: 'opp' }, friction('block', 6)] }] },
    letGo: { phases: [{ dur: 1.4, forces: [friction('block', 6)] }] },
  },
};

/** The same stopping force on 1 kg and on 3 kg, both sliding at 6 m/s: 1 s and 3 s to stop. */
const stopping: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 13],
  height: 450,
  lanes: [{ surface: 'smooth' }, { surface: 'smooth' }],
  bodies: [
    { id: 'top', shape: 'block', mass: 1, x: 1.5, v: 6, width: 0.75, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'block', mass: 3, x: 1.5, v: 6, width: 1.3, lane: 1, tone: 'hyp' },
  ],
  forceScale: 12,
  velocityScale: 18,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [friction('top', 6, 'Stopping force'), friction('bottom', 6, 'Stopping force')] }] },
    go: { phases: [{ dur: 3.2, forces: [friction('top', 6, 'Stopping force'), friction('bottom', 6, 'Stopping force')] }] },
  },
};

/** A bus and its passenger, both at 6 m/s: the brakes stop the bus in 2 s, and nothing slows the passenger. */
const bus: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 24],
  height: 470,
  lanes: [{ surface: 'smooth', label: 'The bus' }, { surface: 'smooth', label: 'A passenger standing in the bus' }],
  bodies: [
    { id: 'bus', shape: 'cart', mass: 10, label: 'bus', x: 3, v: 6, width: 3.6, lane: 0, tone: 'adj' },
    { id: 'rider', shape: 'ball', mass: 1, label: 'passenger', x: 3, v: 6, width: 1, lane: 1, tone: 'opp' },
  ],
  forceScale: 4,
  velocityScale: 14,
  clips: {
    cruise: { phases: [{ dur: 1 }] },
    brake: { phases: [{ dur: 2.2, forces: [{ on: 'bus', name: 'Brakes', n: -30, resist: true, tone: 'bad' }] }] },
  },
};

const video: Explainer = {
  id: 'p10-2-2',
  lessonId: 'p10-2-2',
  title: 'Newton’s First Law and Inertia',
  thumbnailTitle: 'Newton’s First Law',
  thumbnail: 'sim',
  summary:
    'Moving things do not stop by themselves: a force stops them. Watch the same slide on a rough floor and on ice, see a block keep a steady velocity when its forces balance, and find out why a heavier object is harder to stop and why bus passengers lurch forwards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Newton’s First Law and Inertia', subtitle: 'Why moving things keep moving' }],
      lines: [
        { say: 'Slide a book across a table, and it soon stops. For two thousand years, people concluded that moving things naturally come to rest, unless something keeps pushing them.', show: 'title' },
        { say: 'Galileo and Newton saw that this was backwards. In this lesson, you will see why.' },
      ],
    },
    {
      chapter: 'Why things stop',
      layout: 'center',
      main: [slide, { kind: 'text', id: 'why', size: 'md', md: 'The block stops because a **force**, friction, stops it.' }],
      lines: [
        { say: 'Here are two identical blocks, both sliding at four metres per second. The top one is on a rough floor. The bottom one is on smooth ice. Watch them both.', show: ['sim', 'sim.velocity', 'sim.clock'], play: 'sim.go', playDelay: 9.4 },
        { say: 'On the rough floor, friction acted against the sliding. It slowed the block down, and stopped it in two seconds.', focus: 'sim.top' },
        { say: 'On the ice, there was no friction, and the block never slowed at all. It is still moving at four metres per second.', focus: 'sim.bottom' },
        { say: 'So the block does not stop by itself. It stops because a force stops it. Take the force away, and it would carry on for ever.', show: 'why', focus: 'sim' },
      ],
    },
    {
      chapter: 'Newton’s first law',
      layout: 'center',
      main: [
        coast,
        {
          kind: 'callout',
          id: 'law',
          tone: 'definition',
          title: 'Newton’s first law',
          md: 'An object stays **at rest**, or keeps moving at a **steady velocity**, unless a **net force** acts on it.',
        },
      ],
      lines: [
        { say: 'This is Newton’s first law. An object stays at rest, or keeps moving at a steady velocity, unless a net force acts on it.', show: ['law', 'sim', 'sim.velocity'] },
        { say: 'A steady velocity means the same speed, in a straight line. Watch this block on the ice, with no force along its path. It leaves a mark every half second.', show: ['sim.clock', 'sim.strobe', 'sim.net'], play: 'sim.go', playDelay: 7.4 },
        { say: 'The marks are evenly spaced, and the green arrow never changed. With no net force, the velocity does not change.', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Balanced forces',
      layout: 'center',
      main: [steady, { kind: 'text', id: 'bal', size: 'md', md: 'Balanced forces mean **no change** in motion. They do not mean no motion.' }],
      lines: [
        { say: 'On a rough floor, there is friction. This block is pushed with six newtons, and friction pushes back with six newtons. The forces are balanced, so the net force is zero.', show: ['sim', 'sim.velocity', 'sim.net', 'sim.strobe'], play: 'sim.push', playDelay: 8.8 },
        { say: 'The block kept moving, at a steady three metres per second. The push did not speed it up. It only cancelled the friction.', focus: 'sim.block' },
        { say: 'So balanced forces do not mean no motion. They mean no change in motion.', show: 'bal', focus: 'sim' },
        { say: 'Now the push stops. Friction is the only force along the floor, so the forces are unbalanced.', play: 'sim.letGo', playDelay: 2 },
        { say: 'With a net force acting, the velocity changed. The block slowed down, and stopped.', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Inertia',
      layout: 'center',
      main: [
        stopping,
        { kind: 'text', id: 'def', size: 'md', md: 'More **mass** means more **inertia**: harder to start or to stop.' },
      ],
      lines: [
        { say: 'Every object tends to keep doing what it is doing. This tendency is called inertia. Here are two blocks, both sliding at six metres per second. The bottom one has three times the mass.', show: ['sim', 'sim.velocity', 'sim.clock'] },
        { say: 'We try to stop them both with the same force, six newtons.', play: 'sim.ready', playDelay: 0.8 },
        { say: 'Watch which one is harder to stop.', play: 'sim.go', playDelay: 0.4 },
        { say: 'The light block stopped in one second. The heavy block needed three seconds, and it travelled three times as far.', focus: 'sim.bottom' },
        { say: 'The more mass an object has, the more inertia it has, and the harder it is to start, to stop, or to turn. Inertia is not a force. It is a property of mass.', show: 'def', focus: 'sim' },
      ],
    },
    {
      chapter: 'Inertia on a bus',
      layout: 'center',
      main: [bus, { kind: 'text', id: 'belt', size: 'md', md: 'Nothing pushes the passenger forwards. The passenger **keeps moving** while the bus slows down.' }],
      lines: [
        { say: 'Inertia explains something you have felt. A passenger stands in a bus, and both move along at six metres per second. The passenger is drawn on a second track, so you can follow them both.', show: ['sim', 'sim.velocity'], play: 'sim.cruise', playDelay: 9.5 },
        { say: 'Now the bus brakes suddenly. The brakes act on the bus. But no force has yet acted on the passenger.', play: 'sim.brake', playDelay: 2.6 },
        { say: 'The bus slowed down and stopped. The passenger carried on at the old velocity, and so lurched towards the front of the bus.', focus: 'sim.rider' },
        { say: 'Nothing pushed the passenger forwards. The passenger simply kept moving. This is why a seat belt matters. It supplies the force that slows you down with the car.', show: 'belt', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A crate is pushed across a level floor at a steady velocity with a push of 85 N. How large is the friction on the crate?',
          choices: ['0 N', 'less than 85 N', 'more than 85 N', '85 N'],
          answer: 3,
          working: 'A steady velocity means the net force is zero, so the friction must cancel the push exactly: 85 N.',
        },
      ],
      lines: [
        { say: 'Your turn. A crate is pushed across a level floor at a steady velocity, with a push of eighty-five newtons. How large is the friction on the crate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'A steady velocity means the net force is zero. So the friction must cancel the push exactly. The friction is eighty-five newtons. That is choice D.', show: 'q.answer' },
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
            '**First law**: with no net force, an object stays at rest or keeps a steady velocity',
            'Things stop because a force, such as friction, stops them',
            'A steady velocity means **balanced forces**',
            '**Inertia** resists a change in motion: more mass, more inertia',
            'Inertia is a property of mass, not a force',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Newton’s first law says that with no net force, an object stays at rest, or keeps a steady velocity.', show: 'end.0' },
        { say: 'Things stop because a force, such as friction, stops them.', show: 'end.1' },
        { say: 'A steady velocity means the forces are balanced.', show: 'end.2' },
        { say: 'And inertia is the tendency to resist a change in motion. More mass means more inertia. Inertia is a property of mass, not a force.', show: ['end.3', 'end.4'] },
      ],
    },
  ],
};

export default video;
