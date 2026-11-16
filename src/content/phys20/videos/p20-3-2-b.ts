import type { CircleEl, Explainer } from '@/video/script.ts';

// Lesson 3.2, part 2: vertical circles. The ball is the lesson's: 0.5 kg on a string of 1 m, which
// passes the top at 5 m/s, where the tension is 7.6 N. Energy is conserved on the way down
// (src/video/circle.ts), so it reaches the bottom at 8.01 m/s, where the tension is 37.0 N (the
// lesson rounds that speed to 8 m/s, and gets 36.9 N). The loop is the lesson's too: a radius of
// 10 m, where the slowest speed at the top is √(9.81 × 10) = 9.90 m/s.

/** Half a turn of the ball from the top to the bottom, and of the car round its loop, in seconds. */
const HALF = 0.4894453;
const LOOP = 4.0767263;

/** The lesson's ball on a string, in a circle that stands upright. It starts at the top. */
const ball = (id: string, over: Partial<CircleEl> = {}): CircleEl => ({
  kind: 'circle',
  id,
  bodies: [{ id: 'ball', mass: 0.5, r: 1, speed: 5, at: 90, tone: 'adj' }],
  by: 'string',
  vertical: true,
  span: 1.48,
  forceScale: 6.5,
  velocityScale: 12.5,
  height: 520,
  poster: 'round',
  clips: {
    round: { phases: [{ dur: 4 * HALF, slow: 4.5 }] },
    down: { phases: [{ dur: HALF, slow: 6 }] },
    up: { phases: [{ dur: HALF, slow: 6 }] },
    on: { phases: [{ dur: 6 * HALF, slow: 3.5 }] },
  },
  ...over,
});

/** The lesson's roller coaster loop: at the top, the car has the slowest speed that keeps it on the track. */
const coaster: CircleEl = {
  kind: 'circle',
  id: 'loop',
  bodies: [{ id: 'car', mass: 500, label: '', r: 10, speed: Math.sqrt(9.81 * 10), at: 90, shape: 'car', tone: 'opp' }],
  by: 'track',
  vertical: true,
  span: 15.5,
  forceScale: 0.0062,
  velocityScale: 4.4,
  height: 520,
  clips: {
    once: { phases: [{ dur: LOOP, slow: 1.4 }] },
    down: { phases: [{ dur: LOOP / 2, slow: 1.4 }] },
  },
};

const video: Explainer = {
  id: 'p20-3-2-b',
  lessonId: 'p20-3-2',
  title: 'Centripetal Force, Part 2: Vertical Circles',
  thumbnailTitle: 'Vertical Circles',
  thumbnail: 'swing',
  summary:
    'In a vertical circle, the weight helps to turn the object at the top and works against the turn at the bottom. Watch the tension in a string change as a ball goes round, find it at the highest and the lowest point, and find the slowest speed that keeps a roller coaster on its loop.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circular Motion', title: 'Vertical Circles', subtitle: 'Why the string pulls hardest at the bottom' }],
      lines: [
        { say: 'Whirl a ball in a vertical circle, and you can feel the string pull hardest at the bottom. On a roller coaster loop, you feel heavy at the bottom and almost weightless at the top.', show: 'title' },
        { say: 'The rule is the same as before: the net force towards the centre is m v squared over r. What changes is the part that the weight plays.' },
      ],
    },
    {
      chapter: 'A circle that stands upright',
      layout: 'center',
      main: [ball('swing')],
      lines: [
        { say: 'Here is a ball of half a kilogram on a string one metre long, whirled in a vertical circle. Two forces act on it: the tension in the string, and its weight.', show: ['swing', 'swing.force'] },
        { say: 'Watch them as the ball goes round, in slow motion. The weight always points straight down, and never changes. The tension always points to the centre, and it changes a great deal.', play: 'swing.round' },
        { say: 'The speed changes too. The ball slows down as it climbs and speeds up as it falls, so it is slowest at the top and fastest at the bottom.', show: 'swing.velocity', play: 'swing.round' },
        { say: 'To find the tension at any point, add up the forces towards the centre, and set the total equal to m v squared over r.' },
      ],
    },
    {
      chapter: 'At the top and at the bottom',
      layout: 'split',
      leftWidth: 540,
      left: [ball('ball')],
      right: [
        {
          kind: 'math',
          id: 'tb',
          size: 'md',
          lines: ['\\text{Top:}\\quad \\brand{F_T} + \\hyp{mg} = \\dfrac{mv^2}{r}', '\\brand{F_T} = 12.5 - 4.905 = \\brand{7.6\\ \\text{N}}', '\\text{Bottom:}\\quad \\brand{F_T} - \\hyp{mg} = \\dfrac{mv^2}{r}', '\\brand{F_T} = 32.1 + 4.905 = \\brand{37.0\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Start at the highest point, where this ball is moving at five metres per second. Here the centre is below the ball. So the tension and the weight both point towards the centre, and they add.', show: ['ball', 'ball.force', 'ball.velocity', 'tb.0'] },
        { say: 'The weight is 0.5 times 9.81, which is 4.905 newtons. The two forces must add up to m v squared over r, which is 0.5 times five squared, over one: 12.5 newtons. So the tension is only 7.6 newtons. At the top, the weight helps to turn the ball.', show: 'tb.1' },
        { say: 'Now let the ball swing down to the lowest point. It has fallen through the height of the circle, so it is faster: just over eight metres per second.', play: 'ball.down' },
        { say: 'Here the centre is above the ball. The tension points towards the centre, but the weight points away from it. So the net force towards the centre is the tension minus the weight.', show: 'tb.2' },
        { say: 'This time the string must hold the ball up, and turn it as well. Here m v squared over r is 32.1 newtons. Add the weight, and the tension is 37 newtons. That is almost five times the tension at the top.', show: 'tb.3' },
        { say: 'So the weight helps at the top, and opposes at the bottom. Draw the forces at each point before you write an equation.', play: 'ball.on' },
      ],
    },
    {
      chapter: 'The slowest speed at the top',
      layout: 'split',
      leftWidth: 540,
      left: [coaster],
      right: [{ kind: 'math', id: 'min', size: 'md', lines: ['\\hyp{mg} = \\dfrac{mv^2}{r}', '\\thc{v = \\sqrt{gr}}', 'v = \\sqrt{9.81 \\times 10} = \\good{9.90\\ \\text{m/s}}'] }],
      lines: [
        { say: 'A roller coaster car goes round a vertical loop of radius ten metres. Nothing holds it against the track. So why does it not fall at the top?', show: ['loop', 'loop.velocity'] },
        { say: 'At the top, the weight and the push of the track both point down, towards the centre. Together they must equal m v squared over r. The slower the car goes, the less the track has to push.', show: 'loop.force' },
        { say: 'At the slowest possible speed, the track does not push at all. Gravity alone is the centripetal force: m g equals m v squared over r.', show: 'min.0' },
        { say: 'The mass cancels, and the speed is the square root of g r. For this loop, that is 9.90 metres per second, whatever the mass of the car.', show: ['min.1', 'min.2'] },
        { say: 'Watch the car go round at exactly that speed. At the top, only its weight acts. At the bottom, where it is fastest, the track pushes up with six times its weight.', play: 'loop.once' },
        { say: 'Any slower at the top, and the car would leave the track before it got there.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 2 kg ball on a string is whirled in a vertical circle of radius 0.5 m. It passes the lowest point at 4 m/s. Use $g = 9.81\\ \\text{N/kg}$. What is the tension in the string at the lowest point?',
          choices: ['$83.6\\ \\text{N}$', '$64\\ \\text{N}$', '$44.4\\ \\text{N}$', '$19.6\\ \\text{N}$'],
          answer: 0,
          working: 'At the lowest point the weight points away from the centre: $F_T - mg = \\dfrac{mv^2}{r}$. So $F_T = \\dfrac{2 \\times 4^2}{0.5} + 2 \\times 9.81 = 64 + 19.62 = 83.6\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two kilogram ball on a string is whirled in a vertical circle of radius half a metre. It passes the lowest point at four metres per second. What is the tension in the string there? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'At the lowest point, the weight points away from the centre, so the tension is m v squared over r, plus the weight. That is sixty-four, plus 19.62: 83.6 newtons. That is choice A. Sixty-four newtons leaves out the weight.', show: 'q.answer' },
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
            'In a vertical circle, add the forces **towards the centre** and set them equal to $\\dfrac{mv^2}{r}$',
            'At the **top** the weight helps: $F_T + mg = \\dfrac{mv^2}{r}$',
            'At the **bottom** the weight opposes: $F_T - mg = \\dfrac{mv^2}{r}$',
            'The slowest speed at the top is $v = \\sqrt{gr}$, when gravity alone turns the object',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a vertical circle, add up the forces towards the centre, and set the total equal to m v squared over r.', show: 'sum.0' },
        { say: 'At the top, the weight points to the centre, so it helps: tension plus weight.', show: 'sum.1' },
        { say: 'At the bottom, the weight points away from the centre, so it opposes: tension minus weight.', show: 'sum.2' },
        { say: 'And the slowest speed at the top is the square root of g r, when gravity alone does the turning.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
