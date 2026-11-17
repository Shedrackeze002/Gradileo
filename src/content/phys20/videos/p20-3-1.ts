import type { CircleEl, Explainer } from '@/video/script.ts';

// Lesson 3.1: uniform circular motion. Every number on screen is worked out from the radius and the
// period or the speed (src/video/circle.ts), and they are the lesson's: a roundabout that turns once
// in 2.5 s with a child 1.5 m from the centre (3.77 m/s), a car at 20 m/s on a bend of radius 80 m
// (5 m/s²), and a fairground seat on a circle of radius 4 m with a period of 5 s (6.32 m/s²).

/** The lesson's roundabout, seen from above: one turn every 2.5 s. */
const roundabout = (over: Partial<CircleEl> = {}): CircleEl => ({
  kind: 'circle',
  id: 'spin',
  bodies: [{ id: 'child', mass: 30, label: 'A', r: 1.5, period: 2.5, tone: 'opp' }],
  disc: 1.85,
  span: 2.45,
  height: 520,
  clips: {
    turn: { phases: [{ dur: 5 }] },
    once: { phases: [{ dur: 2.5 }] },
  },
  ...over,
});

/** A puck that goes round a circle on a table, to watch its velocity turn. */
const puck: CircleEl = {
  kind: 'circle',
  id: 'puck',
  bodies: [{ id: 'p', mass: 0.5, label: '', r: 1, period: 4, at: -90, tone: 'adj' }],
  span: 1.5,
  velocityScale: 62,
  accelScale: 30,
  height: 540,
  poster: 'round',
  clips: {
    round: { phases: [{ dur: 4 }] },
    again: { phases: [{ dur: 4 }] },
  },
};

/** The lesson's car: 20 m/s round a bend of radius 80 m, and then twice as fast. */
const bend: CircleEl = {
  kind: 'circle',
  id: 'bend',
  bodies: [{ id: 'car', mass: 1200, label: '', r: 80, speed: 20, at: -150, shape: 'car', tone: 'opp' }],
  by: 'friction',
  span: 118,
  velocityScale: 3.4,
  accelScale: 8,
  height: 520,
  clips: {
    drive: { phases: [{ dur: 8, slow: 0.5 }] },
    faster: { phases: [{ dur: 5, slow: 0.6, speed: { car: 40 } }, { dur: 4, slow: 0.5 }] },
  },
};

/** The lesson's fairground seat: a circle of radius 4 m, once every 5 s. */
const ride: CircleEl = {
  kind: 'circle',
  id: 'ride',
  bodies: [{ id: 'seat', mass: 60, label: '', r: 4, period: 5, at: 200, tone: 'hyp' }],
  span: 5.6,
  height: 400,
  clips: { go: { phases: [{ dur: 5 }] } },
};

const video: Explainer = {
  id: 'p20-3-1',
  lessonId: 'p20-3-1',
  title: 'Uniform Circular Motion',
  thumbnailTitle: 'Circular Motion',
  thumbnail: 'puck',
  summary:
    'A child on a roundabout moves at a steady speed, and yet is accelerating the whole time. See what the period and the frequency measure, find the speed of a rider, watch the velocity turn as it goes round, and find the size of the centripetal acceleration.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circular Motion', title: 'Uniform Circular Motion', subtitle: 'A steady speed, and still accelerating' }],
      lines: [
        { say: 'A child on a roundabout moves at a steady speed. A speedometer fixed to the seat would never change its reading.', show: 'title' },
        { say: 'And yet the child is accelerating the whole time. This lesson shows how that can be, and gives the acceleration a size and a direction.' },
      ],
    },
    {
      chapter: 'Period and frequency',
      layout: 'split',
      leftWidth: 540,
      left: [roundabout()],
      right: [{ kind: 'math', id: 'pf', size: 'md', lines: ['T = \\dfrac{25\\ \\text{s}}{10\\ \\text{turns}} = \\hyp{2.5\\ \\text{s}}', 'f = \\dfrac{10\\ \\text{turns}}{25\\ \\text{s}} = \\hyp{0.4\\ \\text{Hz}}', '\\thc{f = \\dfrac{1}{T}} \\qquad \\thc{T = \\dfrac{1}{f}}'] }],
      lines: [
        { say: 'Here is a roundabout, seen from above. It turns at a steady rate, and child A sits one and a half metres from the centre. Moving round a circle at a steady speed is called uniform circular motion.', show: ['spin', 'spin.clock', 'spin.turns'], play: 'spin.turn', playDelay: 7 },
        { say: 'Two turns took five seconds. In fact this roundabout makes ten turns in twenty-five seconds. The time for one turn is called the period, T: twenty-five over ten, which is 2.5 seconds.', show: 'pf.0' },
        { say: 'The frequency, f, is the number of turns each second. Ten turns in twenty-five seconds is 0.4 turns each second, or 0.4 hertz.', show: 'pf.1' },
        { say: 'Take care which way up the division goes. The period is the time over the turns. The frequency is the turns over the time. Each is one over the other.', show: 'pf.2' },
      ],
    },
    {
      chapter: 'The speed of a rider',
      layout: 'split',
      leftWidth: 540,
      left: [roundabout()],
      right: [{ kind: 'math', id: 'sp', size: 'md', lines: ['\\text{one turn} = 2\\pi r', '\\thc{v = \\dfrac{2\\pi r}{T}}', 'v = \\dfrac{2\\pi \\times 1.5}{2.5} = \\good{3.77\\ \\text{m/s}}'] }],
      lines: [
        { say: 'How fast is the child moving? In one period, the child goes once round the circle. That distance is one circumference: two pi r.', show: ['spin', 'spin.radius', 'spin.trail', 'sp.0'], play: 'spin.once', playDelay: 3 },
        { say: 'Speed is distance over time, so the speed is two pi r, over the period.', show: 'sp.1' },
        { say: 'Two pi times 1.5 metres, over 2.5 seconds, is 3.77 metres per second.', show: ['sp.2', 'spin.velocity'] },
      ],
    },
    {
      chapter: 'Same period, different speeds',
      layout: 'split',
      leftWidth: 540,
      left: [
        roundabout({
          bodies: [
            { id: 'child', mass: 30, label: 'A', r: 1.5, period: 2.5, tone: 'opp' },
            { id: 'inner', mass: 30, label: 'B', r: 0.75, period: 2.5, tone: 'adj' },
          ],
        }),
      ],
      right: [{ kind: 'math', id: 'two', size: 'md', lines: ['\\opp{v_A = \\dfrac{2\\pi \\times 1.5}{2.5} = 3.77\\ \\text{m/s}}', '\\adj{v_B = \\dfrac{2\\pi \\times 0.75}{2.5} = 1.88\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Now a second child, B, sits half as far from the centre. Watch the two of them. They stay side by side, and both go round once in the same 2.5 seconds.', show: ['spin', 'spin.velocity', 'spin.trail'], play: 'spin.once', playDelay: 4 },
        { say: 'But B travels round a smaller circle in that time, so B is slower: 1.88 metres per second, half the speed of A. Every point on a turning object has the same period, but not the same speed.', show: ['two.0', 'two.1'], focus: 'spin.inner' },
      ],
    },
    {
      chapter: 'The velocity keeps turning',
      layout: 'center',
      main: [puck],
      lines: [
        { say: 'Now look closely at the velocity. This puck goes round a circle at a steady speed. Its velocity always points along the tangent to the circle: the way the puck is moving at that instant.', show: ['puck', 'puck.velocity', 'puck.tangent'] },
        { say: 'Watch the arrow as the puck goes round. Its length never changes. But its direction changes all the time.', hide: 'puck.tangent', show: 'puck.strobe', play: 'puck.round' },
        { say: 'Velocity is a vector: it has a size and a direction. If either one changes, the velocity has changed. And a changing velocity is an acceleration. So the puck is accelerating, even though it never gets faster or slower.' },
        { say: 'Which way does the acceleration point? Towards the centre of the circle, at right angles to the velocity. It is called centripetal acceleration, which means centre-seeking.', show: 'puck.accel', play: 'puck.again', playDelay: 4 },
        { say: 'An acceleration at right angles to the motion cannot speed the puck up or slow it down. All it can do is turn it.', focus: 'puck.p' },
      ],
    },
    {
      chapter: 'The size of the acceleration',
      layout: 'split',
      leftWidth: 540,
      left: [bend],
      right: [{ kind: 'math', id: 'ac', size: 'md', lines: ['\\thc{a_c = \\dfrac{v^2}{r}}', 'a_c = \\dfrac{20^2}{80} = \\thc{5\\ \\text{m/s}^2}', 'a_c = \\dfrac{40^2}{80} = \\thc{20\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'The size of the centripetal acceleration is the speed squared, over the radius of the circle.', show: ['bend', 'bend.velocity', 'ac.0'] },
        { say: 'This car takes a bend of radius eighty metres at a steady twenty metres per second. Its acceleration is twenty squared over eighty: five metres per second squared, towards the centre of the bend.', show: ['bend.accel', 'bend.radius', 'ac.1'], play: 'bend.drive', playDelay: 5 },
        { say: 'Now the car speeds up to forty metres per second. Watch the yellow arrow. The speed is squared in the formula, so twice the speed needs four times the acceleration: twenty metres per second squared.', hide: 'bend.radius', show: 'ac.2', play: 'bend.faster', playDelay: 3 },
        { say: 'A tighter bend, with a smaller radius, needs more acceleration too. This is why a sharp bend has to be taken slowly.' },
      ],
    },
    {
      chapter: 'From the period',
      layout: 'center',
      main: [ride, { kind: 'math', id: 'per', size: 'md', lines: ['\\thc{a_c = \\dfrac{4\\pi^2 r}{T^2}} \\qquad a_c = \\dfrac{4\\pi^2 \\times 4}{5^2} = \\thc{6.32\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Sometimes you know the period and not the speed. Put two pi r over T into the formula in place of v, and the acceleration is four pi squared r, over T squared.', show: ['ride', 'ride.radius', 'ride.period', 'per'] },
        { say: 'A seat on a fairground ride moves round a circle of radius four metres, once every five seconds. Four pi squared, times four, over five squared, is 6.32 metres per second squared.', show: ['ride.accel', 'ride.velocity', 'ride.readout'], play: 'ride.go', playDelay: 2 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cyclist rides at a steady 6 m/s round a circular track of radius 12 m. What is the centripetal acceleration of the cyclist?',
          choices: ['$0.5\\ \\text{m/s}^2$', '$3\\ \\text{m/s}^2$', '$2\\ \\text{m/s}^2$', '$72\\ \\text{m/s}^2$'],
          answer: 1,
          working: '$a_c = \\dfrac{v^2}{r} = \\dfrac{6^2}{12} = \\dfrac{36}{12} = 3\\ \\text{m/s}^2$, towards the centre of the track.',
        },
      ],
      lines: [
        { say: 'Your turn. A cyclist rides at a steady six metres per second round a circular track of radius twelve metres. What is the centripetal acceleration of the cyclist? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The acceleration is the speed squared, over the radius. Six squared is thirty-six, and thirty-six over twelve is three metres per second squared. That is choice B. Choice A comes from forgetting to square the speed.', show: 'q.answer' },
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
            'Period $T$ is the time for one turn; frequency is the turns each second: $f = \\dfrac{1}{T}$',
            'Speed round a circle: $v = \\dfrac{2\\pi r}{T}$',
            'The velocity lies along the **tangent**, and its direction keeps changing',
            'Centripetal acceleration points to the **centre**: $a_c = \\dfrac{v^2}{r} = \\dfrac{4\\pi^2 r}{T^2}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period is the time for one turn, and the frequency is the number of turns each second. Each is one over the other.', show: 'sum.0' },
        { say: 'The speed round a circle is the circumference over the period: two pi r over T.', show: 'sum.1' },
        { say: 'The velocity lies along the tangent. Its size is steady, but its direction keeps changing.', show: 'sum.2' },
        { say: 'So there is a centripetal acceleration, towards the centre: v squared over r. Twice the speed needs four times the acceleration.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
