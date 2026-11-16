import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.8, part 2: a projectile launched at an angle. The lesson's ball is kicked at 20 m/s,
// 35° above the ground: its flight is worked out from that velocity and g = 9.81 m/s²
// (src/video/flight.ts), so it rises for 1.17 s to 6.7 m and lands 38.3 m away, as the
// calculation says.

const G = 9.81;
const VX = 20 * Math.cos((35 * Math.PI) / 180);
const VY = 20 * Math.sin((35 * Math.PI) / 180);

const kick = (over: Partial<FlightEl> = {}): FlightEl => ({
  kind: 'flight',
  id: 'sim',
  view: [-2, 42, 0, 11],
  height: 400,
  gravity: G,
  tick: 5,
  strobe: 0.25,
  velocityScale: 5.5,
  readout: {},
  bodies: [{ id: 'ball', at: [0, 0], v: [VX, VY], tone: 'theta' }],
  poster: 'rise',
  clips: {
    name: { phases: [{ dur: 4, freeze: true }] },
    rise: { phases: [{ dur: VY / G, slow: 2.6 }] },
    // Stopped a moment before the ball lands, so that its arrows can still be read.
    fall: { phases: [{ dur: VY / G - 0.012, slow: 2.6 }] },
    all: { phases: [{ dur: (2 * VY) / G + 0.1, slow: 1.6 }] },
  },
  ...over,
});

const video: Explainer = {
  id: 'p20-1-8-b',
  lessonId: 'p20-1-8',
  title: 'Projectile Motion, Part 2: Launched at an Angle',
  thumbnailTitle: 'Launched at an Angle',
  thumbnail: 'sim',
  summary:
    'A ball kicked at an angle has a horizontal and a vertical velocity from the start. Watch the vertical arrow shrink to nothing at the top of the flight while the horizontal arrow never changes, then find the time of flight, the greatest height and the range of the same ball.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Projectile Motion', subtitle: 'Part 2: launched at an angle' }],
      lines: [
        { say: 'A projectile has two motions at once. Horizontally, its velocity is constant. Vertically, it is in free fall. And the two share only the time.', show: 'title' },
        { say: 'In part one, the projectile was launched sideways. Now we kick a ball upwards, at an angle.' },
      ],
    },
    {
      chapter: 'Splitting the launch velocity',
      layout: 'center',
      main: [
        kick(),
        { kind: 'math', id: 'comp', size: 'md', lines: ['\\adj{v_x = 20\\cos 35^\\circ = 16.4\\ \\text{m/s}} \\qquad \\opp{v_y = 20\\sin 35^\\circ = 11.5\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'This ball leaves the ground at twenty metres per second, thirty-five degrees above the horizontal. The green arrow is its velocity.', show: ['sim', 'sim.velocity', 'sim.angle'], play: 'sim.name' },
        { say: 'The first step is always to split the launch velocity into two parts. The horizontal part is twenty cos thirty-five, which is 16.4 metres per second. The vertical part is twenty sine thirty-five, which is 11.5 metres per second.', show: ['sim.components', 'sim.readout', 'comp'], hide: 'sim.angle' },
        { say: 'From here on, neither motion uses the twenty metres per second. The horizontal motion uses 16.4, and the vertical motion uses 11.5.', focus: 'comp' },
      ],
    },
    {
      chapter: 'Up, over and down',
      layout: 'center',
      main: [kick(), { kind: 'text', id: 'top', size: 'md', md: 'At the top, the **vertical** velocity is zero. The ball still moves **sideways**, and gravity still acts.' }],
      lines: [
        { say: 'Watch the orange arrow as the ball rises.', show: ['sim', 'sim.velocity', 'sim.components', 'sim.readout', 'sim.trail', 'sim.clock'], play: 'sim.rise', playDelay: 2.2 },
        { say: 'At the top, the orange arrow has shrunk to nothing. But the ball is not at rest. It is still moving sideways at 16.4 metres per second, and its acceleration is still 9.81 metres per second squared, downwards.', show: 'top', focus: 'sim.ball' },
        { say: 'Now the way down.', play: 'sim.fall', playDelay: 0.6 },
        { say: 'The vertical velocity grew again, downwards this time, back to 11.5 metres per second. The blue arrow never changed. And the trip down took as long as the trip up.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Time, height and range',
      layout: 'center',
      main: [
        { kind: 'text', id: 'head', size: 'md', md: 'The same ball: $v_x = 16.38\\ \\text{m/s}$ and $v_y = 11.47\\ \\text{m/s}$' },
        { kind: 'math', id: 'time', size: 'md', lines: ['\\opp{\\text{Time to the top: } t = \\dfrac{v_y}{g} = \\dfrac{11.47}{9.81} = 1.169\\ \\text{s}}', '\\text{Time of flight} = 2 \\times 1.169 = \\good{2.34\\ \\text{s}}'] },
        { kind: 'math', id: 'high', size: 'md', lines: ['\\opp{\\text{Greatest height: } d = \\dfrac{v_y^2}{2g} = \\dfrac{11.47^2}{2 \\times 9.81}} = \\good{6.7\\ \\text{m}}'] },
        { kind: 'math', id: 'range', size: 'md', lines: ['\\adj{\\text{Range: } d_x = v_x t = 16.38 \\times 2.339} = \\good{38.3\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'The numbers come from the same two motions. Keep four digits while you work, and round only the final answer. The parts are 16.38 and 11.47 metres per second.', show: 'head' },
        { say: 'Vertically, gravity removes 9.81 metres per second every second. So the time to the top is 11.47 divided by 9.81, which is 1.169 seconds. On level ground, the whole flight takes twice as long: 2.34 seconds.', show: 'time' },
        { say: 'The greatest height is the vertical velocity squared, divided by two g. That is 6.7 metres.', show: 'high' },
        { say: 'And the range is the horizontal velocity times the time of flight. 16.38 times 2.339 is 38.3 metres.', show: 'range' },
      ],
    },
    {
      chapter: 'Checking the answer',
      layout: 'center',
      main: [kick({ readout: undefined, height: 420 }), { kind: 'text', id: 'check', size: 'md', md: 'Time of flight **2.34 s**, greatest height **6.7 m**, range **38.3 m**' }],
      lines: [
        { say: 'Here is the whole flight at once, with a mark every quarter of a second. Check it against the three answers.', show: ['sim', 'sim.trail', 'sim.strobe', 'sim.clock', 'check'], play: 'sim.all', playDelay: 5 },
        { say: 'The ball reached just under seven metres, and it landed between the thirty-five and forty metre marks, a little over two seconds after it was kicked. The picture and the calculation agree.', focus: 'sim.ball' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball is thrown from level ground with a vertical velocity of 14.7 m/s and a horizontal velocity of 10 m/s. Use $g = 9.81\\ \\text{m/s}^2$. How long is it in the air?',
          choices: ['$3.0\\ \\text{s}$', '$1.5\\ \\text{s}$', '$1.0\\ \\text{s}$', '$2.0\\ \\text{s}$'],
          answer: 0,
          working: 'Time to the top: $t = \\dfrac{14.7}{9.81} = 1.5\\ \\text{s}$. The trip down takes as long, so the time of flight is $3.0\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball is thrown from level ground, with a vertical velocity of 14.7 metres per second, and a horizontal velocity of ten metres per second. How long is it in the air? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Only the vertical velocity sets the time. The time to the top is 14.7 divided by 9.81, which is 1.5 seconds. The trip down takes as long, so the ball is in the air for 3.0 seconds. That is choice A.', show: 'q.answer' },
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
            'Split the launch velocity first: $v_x = v\\cos\\theta$ and $v_y = v\\sin\\theta$',
            'At the top, $v_y = 0$, but the ball **still moves sideways**',
            'On level ground, time of flight $= \\dfrac{2v_y}{g}$',
            'Greatest height $= \\dfrac{v_y^2}{2g}$',
            'Range $= v_x \\times$ time of flight',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Split the launch velocity first: v cos theta across, and v sine theta up.', show: 'sum.0' },
        { say: 'At the top of the flight, the vertical velocity is zero, but the ball still moves sideways.', show: 'sum.1' },
        { say: 'On level ground, the time of flight is two times the vertical velocity, divided by g. The greatest height is the vertical velocity squared, divided by two g.', show: ['sum.2', 'sum.3'] },
        { say: 'And the range is the horizontal velocity times the time of flight.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
