import type { Explainer, MotionEl } from '@/video/script.ts';
import { brake, drive } from '@/content/phys10/videos/lib/track.ts';

// Lesson 1.4: the four equations of motion for a constant acceleration, in the lesson's symbols
// (d, u, v, a, t). The first two are read from a velocity-time graph that draws itself as a cart
// accelerates, and the lesson's car, braking from 12 m/s at −4 m/s², is seen to stop in the 18 m
// that v² = u² + 2ad gives (src/video/motion.ts works the motion out from the same acceleration).

/** From 2 m/s at 2 m/s² for 3 s: it reaches 8 m/s and travels 15 m. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 17],
  height: 500,
  velocityScale: 16,
  graph: { of: ['cart'], seconds: 3, max: 8 },
  lanes: [{ surface: 'smooth', label: 'A constant acceleration' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 1, v: 2 }],
  poster: 'go',
  clips: { go: { phases: [{ dur: 3, forces: [drive('cart', 2)] }] } },
};

/** The lesson's car: 12 m/s, braking at −4 m/s². It stops after 3 s and 18 m. */
const stop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 21],
  height: 350,
  velocityScale: 14,
  lanes: [{ surface: 'smooth', label: 'Braking' }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1, label: 'Car', x: 1, v: 12, tone: 'opp' }],
  clips: { go: { phases: [{ dur: 3.4, forces: [brake('car', 4)] }] } },
};

const video: Explainer = {
  id: 'p20-1-4',
  lessonId: 'p20-1-4',
  title: 'The Equations of Motion',
  thumbnail: 'sim',
  summary:
    'Four equations link the five quantities of motion with a constant acceleration. See where they come from on a velocity-time graph, learn to choose the one that fits a problem, and watch a braking car stop in exactly the distance the equation gives.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'The Equations of Motion', subtitle: 'Four equations for a constant acceleration' }],
      lines: [
        { say: 'How long must a runway be, for a plane to reach its take-off speed? How far does a car travel after the driver presses the brake?', show: 'title' },
        { say: 'When the acceleration is constant, four equations answer questions like these, without drawing a graph.' },
      ],
    },
    {
      chapter: 'The five quantities',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'five',
          items: ['$d$ &nbsp; displacement', '$u$ &nbsp; initial velocity', '$v$ &nbsp; final velocity', '$a$ &nbsp; acceleration, which must be **constant**', '$t$ &nbsp; time'],
        },
      ],
      lines: [
        { say: 'Every problem about motion with a constant acceleration uses the same five quantities. The displacement, d. The initial velocity, u. The final velocity, v.', show: ['five.0', 'five.1', 'five.2'] },
        { say: 'The acceleration, "a", which must stay constant. And the time, t.', show: ['five.3', 'five.4'] },
      ],
    },
    {
      chapter: 'From the velocity-time graph',
      layout: 'center',
      main: [
        steady,
        { kind: 'math', id: 'eqs', size: 'md', lines: ['\\good{v = u + at = 2 + 2(3) = 8\\ \\text{m/s}}', '\\brand{d = \\tfrac{1}{2}(u + v)t = \\tfrac{1}{2}(2 + 8)(3) = 15\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'The equations come from the velocity-time graph. This cart starts at two metres per second, and accelerates at two metres per second squared, for three seconds.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.clock'], play: 'sim.go', playDelay: 6.6 },
        { say: 'The slope of the line is the acceleration, so the velocity grew by "a" times t. That is the first equation: v equals u plus "a" t. Two, plus two times three, is eight metres per second.', show: 'eqs', focus: 'sim' },
        { say: 'The area under the line is the displacement. It is the average of the two velocities, times the time. That is the second equation. Half of two plus eight, times three, is fifteen metres. And the cart did go from one metre to sixteen.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'The four equations',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'four',
          items: ['$v = u + at$ &nbsp; leaves out $d$', '$d = \\tfrac{1}{2}(u + v)t$ &nbsp; leaves out $a$', '$d = ut + \\tfrac{1}{2}at^2$ &nbsp; leaves out $v$', '$v^2 = u^2 + 2ad$ &nbsp; leaves out $t$'],
        },
      ],
      lines: [
        { say: 'Those are two of the four. Putting them together gives two more: d equals u t plus half "a" t squared, and v squared equals u squared plus two "a" d.', show: ['four.0', 'four.1', 'four.2', 'four.3'] },
        { say: 'Each equation links four of the five quantities, and leaves one out. So to choose an equation, list the three quantities you know and the one you want. Then pick the equation that leaves out the fifth.', focus: 'four' },
      ],
    },
    {
      chapter: 'A stopping distance',
      layout: 'center',
      main: [
        stop,
        { kind: 'math', id: 'known', size: 'md', lines: ['u = 12\\ \\text{m/s} \\qquad v = 0 \\qquad a = {-4}\\ \\text{m/s}^2 \\qquad d = \\,?'] },
        { kind: 'math', id: 'work', size: 'md', lines: ['v^2 = u^2 + 2ad \\quad\\Rightarrow\\quad 0 = 12^2 + 2({-4})d \\quad\\Rightarrow\\quad d = \\dfrac{144}{8} = \\good{18\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'A car travelling at twelve metres per second brakes, with a steady acceleration of minus four metres per second squared. How far does it travel before it stops?', show: ['sim', 'sim.velocity', 'sim.readout'] },
        { say: 'List what we know. The initial velocity is twelve. The car stops, so the final velocity is zero. The acceleration is minus four. We want the displacement, and the time is not involved.', show: 'known' },
        { say: 'So use the equation without t: v squared equals u squared plus two "a" d. Zero equals twelve squared, plus two times minus four times d. So eight d is a hundred and forty-four, and d is eighteen metres.', show: 'work' },
        { say: 'Now watch the car.', show: ['sim.strobe', 'sim.distance'], play: 'sim.go', playDelay: 1.2 },
        { say: 'Eighteen metres, exactly as the equation says. And because the speed is squared, a car at twice the speed needs four times the distance to stop.', focus: 'sim.car' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A train starts from rest and accelerates at $2\\ \\text{m/s}^2$ for 5 s. How far does it travel?',
          choices: ['$10\\ \\text{m}$', '$50\\ \\text{m}$', '$5\\ \\text{m}$', '$25\\ \\text{m}$'],
          answer: 3,
          working: 'Known: $u = 0$, $a = 2$, $t = 5$. The final velocity is not involved: $d = ut + \\tfrac{1}{2}at^2 = 0 + \\tfrac{1}{2} \\times 2 \\times 5^2 = 25\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A train starts from rest, and accelerates at two metres per second squared, for five seconds. How far does it travel? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'We know u, "a" and t, and the final velocity is not involved. So d equals u t plus half "a" t squared. The train starts from rest, so u t is zero. Half of two, times five squared, is twenty-five metres. That is choice D. Take care: only the t is squared.', show: 'q.answer' },
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
            'The equations need a **constant acceleration**',
            '$v = u + at$ and $d = \\tfrac{1}{2}(u + v)t$ come from the velocity-time graph',
            '$d = ut + \\tfrac{1}{2}at^2$ and $v^2 = u^2 + 2ad$ follow from them',
            'List three known quantities and the one wanted, then **leave out the fifth**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The four equations of motion work only when the acceleration is constant.', show: 'sum.0' },
        { say: 'The first two come straight from the velocity-time graph: its slope, and its area.', show: 'sum.1' },
        { say: 'The other two follow from them.', show: 'sum.2' },
        { say: 'And to choose one, list the three quantities you know and the one you want, then pick the equation that leaves out the fifth.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
