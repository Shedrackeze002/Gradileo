import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 2.5, part 1: friction acts against sliding, rough and oiled surfaces, friction that is
// useful (it is what lets you walk) and friction that stops a sliding box in a time you can work
// out. Every block is slowed by the friction drawn on it (src/video/motion.ts).

const friction = (on: string, n: number): MotionForce => ({ on, name: 'Friction', n: -n, resist: true, tone: 'bad' });

/** A 2 kg block shoved to the right, then to the left: friction of 4 N points against each slide. */
const shove: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 350,
  lanes: [{ surface: 'rough', label: 'A block sliding on a rough floor' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 3 }],
  forceScale: 16,
  velocityScale: 24,
  poster: 'right',
  clips: {
    right: { phases: [{ dur: 2.2, set: { block: 4 }, forces: [friction('block', 4)] }] },
    left: { phases: [{ dur: 2.2, set: { block: -4 }, forces: [friction('block', 4)] }] },
  },
};

/** The same slide on a rough, dry floor (8 N of friction) and on an oiled one (2 N). */
const surfaces: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 450,
  lanes: [{ surface: 'rough', label: 'Rough, dry floor' }, { surface: 'smooth', label: 'Oiled floor' }],
  bodies: [
    { id: 'top', shape: 'block', mass: 2, x: 1.5, v: 4, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'block', mass: 2, x: 1.5, v: 4, lane: 1, tone: 'hyp' },
  ],
  forceScale: 12,
  velocityScale: 22,
  clips: { go: { phases: [{ dur: 4.2, forces: [friction('top', 8), friction('bottom', 2)] }] } },
};

/** Walking: the ground's friction on the foot points forwards, and it is what moves the walker. */
const walk: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 330,
  lanes: [{ surface: 'rough', label: 'Setting off on foot' }],
  bodies: [{ id: 'walker', shape: 'block', mass: 50, label: 'walker', x: 2, width: 1.4, tone: 'adj' }],
  forceScale: 2.4,
  velocityScale: 30,
  clips: { go: { phases: [{ dur: 2.5, forces: [{ on: 'walker', name: 'Friction', n: 40, tone: 'bad' }] }] } },
};

/** A 5 kg box at 6 m/s with 10 N of friction: 2 m/s² of deceleration, at rest after 3 s. */
const stop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 350,
  lanes: [{ surface: 'rough', label: 'A 5 kg box sliding at 6 m/s' }],
  bodies: [{ id: 'box', shape: 'block', mass: 5, x: 1.5, v: 6, width: 1.2 }],
  forceScale: 8,
  velocityScale: 20,
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [friction('box', 10)] }] },
    go: { phases: [{ dur: 3.3, forces: [friction('box', 10)] }] },
  },
};

const video: Explainer = {
  id: 'p10-2-5',
  lessonId: 'p10-2-5',
  title: 'Friction and Air Resistance, Part 1: Friction',
  thumbnailTitle: 'Friction',
  thumbnail: 'sim',
  summary:
    'Friction acts against sliding. Watch it stop a block whichever way the block slides, compare a rough floor with an oiled one, see why friction is what lets you walk, and work out how long friction takes to stop a sliding box.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Friction', subtitle: 'The force that acts against sliding' }],
      lines: [
        { say: 'Friction is the reason a sliding book stops. It is also the reason you can walk at all.', show: 'title' },
        { say: 'In this lesson, you will see which way friction acts, what makes it larger or smaller, and how quickly it stops a sliding object.' },
      ],
    },
    {
      chapter: 'Against the sliding',
      layout: 'center',
      main: [
        shove,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Friction', md: 'The force between two surfaces that touch. It acts **against the sliding** of one over the other.' },
      ],
      lines: [
        { say: 'This block gets a shove to the right, across a rough floor. Watch the red arrow.', show: ['sim', 'sim.velocity'], play: 'sim.right', playDelay: 3.6 },
        { say: 'While the block slid to the right, friction pointed to the left, and it brought the block to rest.', focus: 'sim.block' },
        { say: 'Now the block gets a shove to the left.', play: 'sim.left', playDelay: 1.6 },
        { say: 'This time, friction pointed to the right. Friction is the force between two surfaces that touch, and it always acts against the sliding.', show: 'def', focus: 'sim' },
      ],
    },
    {
      chapter: 'More friction, less friction',
      layout: 'center',
      main: [surfaces, { kind: 'text', id: 'oil', size: 'md', md: 'Rough, dry surfaces give **more** friction. A **lubricant**, such as oil, gives **less**.' }],
      lines: [
        { say: 'How large is friction? That depends on the two surfaces. The top floor is rough and dry. The bottom floor has been oiled. Both blocks start at four metres per second.', show: ['sim', 'sim.velocity', 'sim.clock'], play: 'sim.go', playDelay: 10 },
        { say: 'On the rough floor, friction was eight newtons, and the block stopped in one second. On the oiled floor, friction was only two newtons, and the block slid four times as far.', focus: 'sim.bottom' },
        { say: 'Oil is a lubricant. It keeps the two surfaces slightly apart, so they slide past each other with less friction.', show: 'oil', focus: 'sim' },
      ],
    },
    {
      chapter: 'Useful, or a nuisance?',
      layout: 'center',
      main: [
        walk,
        {
          kind: 'table',
          id: 'uses',
          head: ['Friction is useful when', 'Friction is a nuisance when'],
          rows: [
            ['tyres and shoes grip the ground', 'machine parts rub and wear out'],
            ['brakes slow a wheel', 'a bicycle chain wastes energy as heat'],
          ],
        },
      ],
      lines: [
        { say: 'Friction does not always slow things down. When you set off walking, your foot pushes backwards on the ground. Friction stops your foot from sliding back, so friction pushes you forwards.', show: ['sim', 'sim.velocity'], play: 'sim.go', playDelay: 8.5 },
        { say: 'So friction is often useful. Tyres and shoes grip the ground, and brakes use friction to slow a wheel.', show: ['uses', 'uses.0'], focus: 'sim' },
        { say: 'It can be a nuisance as well. Machine parts rub and wear out, and friction turns some of the energy of motion into heat.', show: 'uses.1' },
      ],
    },
    {
      chapter: 'Stopping by friction',
      layout: 'center',
      main: [
        stop,
        { kind: 'math', id: 'calc', size: 'md', lines: ['a = \\dfrac{F}{m} = \\dfrac{10\\ \\text{N}}{5\\ \\text{kg}} = 2\\ \\text{m/s}^2 \\qquad t = \\dfrac{6\\ \\text{m/s}}{2\\ \\text{m/s}^2} = \\good{3\\ \\text{s}}'] },
      ],
      lines: [
        { say: 'You can work out how quickly friction stops something. A five kilogram box slides at six metres per second. The only force along the floor is friction, of ten newtons.', show: ['sim', 'sim.velocity', 'sim.clock'], play: 'sim.ready', playDelay: 8 },
        { say: 'The deceleration is force divided by mass. Ten divided by five is two metres per second squared. So the box loses two metres per second, every second. To lose all six takes three seconds.', show: 'calc' },
        { say: 'Let us check. Watch the clock.', play: 'sim.go', playDelay: 0.8 },
        { say: 'The box came to rest after three seconds, just as we worked out.', focus: 'sim.box' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 4 kg sledge slides across snow at 10 m/s. The only force along the ground is friction of 8 N. How long does the sledge take to stop?',
          choices: ['$5\\ \\text{s}$', '$1.25\\ \\text{s}$', '$20\\ \\text{s}$', '$3.2\\ \\text{s}$'],
          answer: 0,
          working: 'Deceleration $= 8 \\div 4 = 2\\ \\text{m/s}^2$. Time $= 10 \\div 2 = 5\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A four kilogram sledge slides across snow at ten metres per second. The only force along the ground is friction, of eight newtons. How long does the sledge take to stop? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The deceleration is eight divided by four, which is two metres per second squared. To lose ten metres per second, at two every second, takes five seconds. That is choice A.', show: 'q.answer' },
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
            '**Friction** acts between touching surfaces, against the sliding',
            'Rough, dry surfaces: more friction. Lubricants: less',
            'Friction can be useful (grip, brakes) or a nuisance (wear, heat)',
            'Deceleration = friction ÷ mass',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Friction acts between surfaces that touch, against the sliding.', show: 'end.0' },
        { say: 'Rough, dry surfaces give more friction, and lubricants give less.', show: 'end.1' },
        { say: 'Friction can be useful, for grip and for brakes, or a nuisance that wears parts out and wastes energy as heat.', show: 'end.2' },
        { say: 'And to find how quickly friction slows an object, divide the friction by the mass.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
