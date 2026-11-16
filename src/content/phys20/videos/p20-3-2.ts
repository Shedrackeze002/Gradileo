import type { CircleEl, Explainer } from '@/video/script.ts';

// Lesson 3.2, part 1: centripetal force. The forces on screen are worked out from the mass, the
// speed and the radius (src/video/circle.ts), and they are the lesson's: a 0.5 kg ball at 4 m/s on
// a string of 0.8 m (10 N), which breaks at 40 N (8 m/s), and a 1200 kg car at 15 m/s on a level
// bend of radius 50 m (5400 N), which skids above 17.2 m/s when the coefficient of friction is 0.6.

/** The lesson's ball on a string, seen from above on a smooth table. */
const whirl: CircleEl = {
  kind: 'circle',
  id: 'whirl',
  bodies: [{ id: 'ball', mass: 0.5, r: 0.8, speed: 4, at: 20, tone: 'adj' }],
  by: 'string',
  span: 1.3,
  forceScale: 9,
  accelScale: 4.5,
  velocityScale: 22,
  height: 520,
  poster: 'turn',
  clips: {
    turn: { phases: [{ dur: 2.2, slow: 2 }] },
    more: { phases: [{ dur: 2.8, slow: 2 }] },
  },
};

/**
 * The same ball on a string that breaks at 40 N. It is sped up to 8 m/s, and then let go as it
 * passes the top of the picture, so that it leaves to the left along the tangent.
 */
const snap: CircleEl = {
  kind: 'circle',
  id: 'snap',
  bodies: [{ id: 'ball', mass: 0.5, r: 0.8, speed: 4, at: -115.35, tone: 'adj' }],
  by: 'string',
  limit: 40,
  span: 1.25,
  forceScale: 2.6,
  velocityScale: 13,
  height: 400,
  clips: {
    faster: { phases: [{ dur: 4, slow: 1.5, speed: { ball: 8 } }] },
    breaks: { phases: [{ dur: 0.5, slow: 2 }, { dur: 0.56, slow: 3, release: ['ball'], note: 'The string breaks' }] },
  },
};

/** The greatest speed at which the road can still turn the car: √(μ g r). */
const GRIP = Math.sqrt(0.6 * 9.81 * 50);

/** The lesson's car on a level bend, with a coefficient of static friction of 0.6. */
const bend: CircleEl = {
  kind: 'circle',
  id: 'bend',
  bodies: [{ id: 'car', mass: 1200, label: '', r: 50, speed: 15, at: -160, shape: 'car', tone: 'opp' }],
  by: 'friction',
  limit: 0.6 * 1200 * 9.81,
  span: 88,
  forceScale: 0.0155,
  velocityScale: 4.6,
  height: 520,
  clips: {
    drive: { phases: [{ dur: 7, slow: 0.5 }] },
    limit: { phases: [{ dur: 4, slow: 0.6, speed: { car: GRIP } }, { dur: 3, slow: 0.5 }] },
    skid: { phases: [{ dur: 2.2, slow: 0.6, speed: { car: 18.6 } }, { dur: 3.2, slow: 0.5, release: ['car'], note: 'The car skids' }] },
  },
};

const video: Explainer = {
  id: 'p20-3-2',
  lessonId: 'p20-3-2',
  title: 'Centripetal Force',
  thumbnail: 'whirl',
  summary:
    'An object that moves in a circle is accelerating towards the centre, so a real force must be pulling it there. See the tension that turns a ball on a string, watch what happens when the string breaks, and find the greatest speed at which friction can take a car round a bend.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circular Motion', title: 'Centripetal Force', subtitle: 'What keeps it turning?' }],
      lines: [
        { say: 'An object that moves round a circle is accelerating towards the centre, all the time. And Newton’s second law says that an acceleration needs a net force.', show: 'title' },
        { say: 'So something must be pushing or pulling the object towards the centre. This lesson is about finding that something.' },
      ],
    },
    {
      chapter: 'A force towards the centre',
      layout: 'split',
      leftWidth: 540,
      left: [whirl],
      right: [{ kind: 'math', id: 'f', size: 'md', lines: ['F_{\\text{net}} = ma \\qquad a_c = \\dfrac{v^2}{r}', '\\thc{F_c = \\dfrac{mv^2}{r}}', 'F_c = \\dfrac{0.5 \\times 4^2}{0.8} = \\thc{10\\ \\text{N}}'] }],
      lines: [
        { say: 'Here is a ball of half a kilogram on a string, seen from above. It moves round a circle on a smooth table, at a steady four metres per second.', show: ['whirl', 'whirl.velocity', 'whirl.radius'], play: 'whirl.turn', playDelay: 4 },
        { say: 'The ball has a centripetal acceleration of v squared over r, towards the centre. The net force on it is its mass times that acceleration.', show: ['whirl.accel', 'f.0'] },
        { say: 'So the net force points to the centre too, and its size is m v squared, over r. This net force is called the centripetal force.', hide: ['whirl.accel', 'whirl.radius'], show: ['whirl.net', 'f.1'] },
        { say: 'For this ball: 0.5, times four squared, over 0.8. That is ten newtons.', show: 'f.2' },
        { say: 'But what is actually pulling on the ball? Only the string. Centripetal force is not a new kind of force. It is a job, and here the tension in the string does that job.', hide: 'whirl.net', show: 'whirl.force', play: 'whirl.more', playDelay: 3 },
      ],
    },
    {
      chapter: 'When the string breaks',
      layout: 'center',
      main: [snap, { kind: 'math', id: 'max', size: 'md', lines: ['v = \\sqrt{\\dfrac{F_c\\, r}{m}} = \\sqrt{\\dfrac{40 \\times 0.8}{0.5}} = \\sqrt{64} = \\good{8\\ \\text{m/s}}'] }],
      lines: [
        { say: 'This string breaks if its tension goes above forty newtons. Whirl the ball faster, and watch the tension grow.', show: ['snap', 'snap.velocity', 'snap.force', 'snap.meter'], play: 'snap.faster', playDelay: 4 },
        { say: 'At eight metres per second, the tension has reached forty newtons. Twice the speed needs four times the force. Rearranging the formula gives that greatest speed directly.', show: 'max' },
        { say: 'Any faster, and the string breaks. Now nothing pulls the ball towards the centre, so nothing can turn it.', show: 'snap.trail', play: 'snap.breaks', playDelay: 3 },
        { say: 'By Newton’s first law, it carries on with the velocity it had at that instant: in a straight line, along the tangent to the circle. It does not fly straight outwards.' },
      ],
    },
    {
      chapter: 'A car on a bend',
      layout: 'split',
      leftWidth: 540,
      left: [bend],
      right: [
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: ['\\bad{F_f} = \\dfrac{1200 \\times 15^2}{50} = \\bad{5400\\ \\text{N}}', '\\mu_s F_N = 0.6 \\times 11\\,772 = 7063\\ \\text{N}', 'v = \\sqrt{\\mu_s g r} = \\good{17.2\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'On a level road, there is no string. Only friction between the tyres and the road can push a car sideways. This car of twelve hundred kilograms takes a bend of radius fifty metres at fifteen metres per second.', show: ['bend', 'bend.velocity', 'bend.force'], play: 'bend.drive', playDelay: 6 },
        { say: 'The friction needed is m v squared over r: 5,400 newtons, towards the centre of the bend.', show: 'c.0' },
        { say: 'But static friction has a greatest value: the coefficient of friction, times the normal force. On a level road the normal force is the weight of the car, 11,772 newtons. With a coefficient of 0.6, the greatest friction is about 7,063 newtons.', show: ['c.1', 'bend.meter'] },
        { say: 'Now the car speeds up. The friction needed grows with the square of the speed. At 17.2 metres per second, it has reached the most that the road can give. The mass cancels, so this speed is the same for every car.', show: 'c.2', play: 'bend.limit', playDelay: 2 },
        { say: 'Any faster, and the tyres cannot grip. The car skids, and leaves the bend along the tangent.', show: 'bend.trail', play: 'bend.skid', playDelay: 1 },
        { say: 'On a wet road the coefficient is smaller, so the greatest safe speed is lower. This is why drivers must slow down for a bend in the rain.' },
      ],
    },
    {
      chapter: 'Which force does the job?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'jobs',
          head: ['Motion', 'Force towards the centre'],
          rows: [
            ['a ball whirled on a string', 'tension in the string'],
            ['a car on a level bend', 'friction from the road'],
            ['the Moon round the Earth', 'gravity'],
            ['clothes in a spinning drum', 'the normal force of the drum'],
          ],
        },
      ],
      lines: [
        { say: 'So for every object that moves in a circle, ask which real force points to the centre. For the ball it was tension, and for the car it was friction.', show: ['jobs', 'jobs.0', 'jobs.1'] },
        { say: 'For the Moon it is gravity, and for clothes in a spinning drum it is the normal force of the drum. Never draw an extra force that pushes outwards. No such force acts.', show: ['jobs.2', 'jobs.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 2 kg puck on a string moves in a horizontal circle of radius 0.5 m on a frictionless table, at a steady 3 m/s. What is the tension in the string?',
          choices: ['$12\\ \\text{N}$', '$9\\ \\text{N}$', '$18\\ \\text{N}$', '$36\\ \\text{N}$'],
          answer: 3,
          working: 'The tension is the centripetal force: $F_T = \\dfrac{mv^2}{r} = \\dfrac{2 \\times 3^2}{0.5} = \\dfrac{18}{0.5} = 36\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two kilogram puck on a string moves in a horizontal circle of radius half a metre, on a frictionless table, at a steady three metres per second. What is the tension in the string? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The tension is the only force towards the centre, so it is the centripetal force: m v squared over r. Two times three squared is eighteen, and eighteen over 0.5 is thirty-six newtons. That is choice D.', show: 'q.answer' },
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
            'Centripetal force is the **net force towards the centre**: $F_c = \\dfrac{mv^2}{r}$',
            'A **real force** provides it: tension, friction, gravity or a normal force',
            'If that force stops, the object moves off along the **tangent**',
            'On a level bend, friction turns the car, and the greatest speed is $v = \\sqrt{\\mu_s g r}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The centripetal force is the net force towards the centre: m v squared over r.', show: 'sum.0' },
        { say: 'It is always provided by a real force: tension, friction, gravity or a normal force.', show: 'sum.1' },
        { say: 'If that force stops, the object moves off in a straight line, along the tangent.', show: 'sum.2' },
        { say: 'And on a level bend, friction turns the car. The greatest speed is the square root of mu g r.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
