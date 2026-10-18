import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balloon, cars } from './lib/m31-7-figures.ts';

// Cars 6 km north at 80 km/h and 8 km east at 60 km/h: 10 dD/dt = 6(80) + 8(60), so dD/dt = 96 km/h.
// A balloon 60 m away rising at 3 m/s: tan θ = y/60, so at y = 80, dθ/dt = (9/25)(3/60) = 0.018 rad/s.
const roads = () => figure('cr', [cars({ x: 6, y: 8, labels: { x: 'x', y: 'y', D: 'D', va: '80\\text{ km/h}', vb: '60\\text{ km/h}' } })]);
const rise = () => figure('bl', [balloon({ d: 6, y: 8, labels: { d: '60\\text{ m}', y: 'y', sight: '100\\text{ m}', theta: '\\theta', rise: '3\\text{ m/s}' } })]);

const video: Explainer = {
  id: 'm31-7-2-d',
  lessonId: 'm31-7-2',
  title: 'Related Rates, Part 4: Moving Cars and Changing Angles',
  thumbnailTitle: 'Moving Cars and Changing Angles',
  thumbnail: 'cr',
  summary: 'Two cars on roads at right angles, 6 km north at 80 km/h and 8 km east at 60 km/h: D² = x² + y² gives 10 dD/dt = 960, so they separate at 96 km/h. A balloon rising at 3 m/s, 60 m from an observer: tan θ = y/60 gives sec²θ dθ/dt = (1/60) dy/dt, so the angle grows at 0.018 rad/s when the balloon is 80 m up. A car moving toward an intersection has a negative rate, and a decreasing quantity is answered as a positive rate with the word decreasing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 4', title: 'Moving Cars and Changing Angles', subtitle: 'Pythagoras, trigonometry and signs' }],
      lines: [
        { say: 'Two cars drive away from an intersection on roads that cross at right angles. A balloon rises while someone on the ground watches it. In both, one rate depends on others.', show: 'title' },
        { say: 'In this video, you will find how fast the distance between two cars changes, how fast an angle of elevation changes, and how to get the signs right.' },
      ],
    },
    {
      chapter: 'Cars moving apart',
      layout: 'split',
      leftWidth: 560,
      left: [roads()],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Two roads cross at right angles. Car A is $6$ km north of the intersection, driving north at $80$ km/h. Car B is $8$ km east of it, driving east at $60$ km/h. How fast is the distance between them increasing?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['D^2 = x^2 + y^2'] },
      ],
      lines: [
        { say: 'Two roads cross at right angles. Car A is six kilometres north of the intersection, driving north at 80 kilometres per hour. Car B is eight kilometres east of it, driving east at 60 kilometres per hour. How fast is the distance between them increasing?', show: ['cr.roads', 'cr.A', 'cr.B', 'cr.nO', 'p'] },
        { say: 'Let x be car A’s distance from the intersection, and y be car B’s. Both are increasing: d x by d t is 80, and d y by d t is 60.', show: ['cr.x', 'cr.y', 'cr.va', 'cr.vb', 'cr.mark'], focus: ['cr.va', 'cr.vb'] },
        { say: 'Let D be the distance between the cars. The roads make a right angle, so by the Pythagorean theorem, D squared equals x squared plus y squared, at any time.', show: ['cr.D', 'm.0'], focus: ['cr.D', 'm.0'] },
      ],
    },
    {
      chapter: 'Differentiate and substitute',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2D\\,\\dfrac{dD}{dt} = 2x\\,\\dfrac{dx}{dt} + 2y\\,\\dfrac{dy}{dt}', 'x = 6,\\ y = 8\\colon \\quad D = \\sqrt{36 + 64} = 10', '10\\,\\dfrac{dD}{dt} = 6(80) + 8(60) = 960', '\\dfrac{dD}{dt} = 96\\text{ km/h}'] },
      ],
      lines: [
        { say: 'Differentiate both sides with respect to t: two D, d D by d t, equals two x, d x by d t, plus two y, d y by d t. Every term has a two, so divide it out.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the instant in the question: x is six and y is eight, so D is the square root of 36 plus 64: ten kilometres.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute: ten d D by d t equals six times 80, plus eight times 60. That is 480 plus 480: 960.', show: 'm.2', focus: 'm.2' },
        { say: 'So d D by d t is 96. The distance between the cars is increasing at 96 kilometres per hour.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Toward the intersection',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Signs', md: 'A car driving **toward** the intersection has a distance that is decreasing, so its rate is **negative**. The sign of $\\dfrac{dD}{dt}$ then says whether the cars are getting closer ($-$) or farther apart ($+$).' },
      ],
      lines: [
        { say: 'What if a car drives toward the intersection instead? Then its distance from the intersection is getting smaller, so its rate is negative. A car 80 kilometres per hour toward the intersection has d x by d t equal to negative 80.', show: 'key' },
        { say: 'Put the signs in, and the sign of d D by d t tells you the answer. Positive means the cars are getting farther apart, and negative means they are getting closer.' },
      ],
    },
    {
      chapter: 'A rising balloon',
      layout: 'split',
      leftWidth: 560,
      left: [rise()],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A hot-air balloon rises straight up at $3$ m/s from a point $60$ m from an observer. How fast is the angle of elevation $\\theta$ increasing when the balloon is $80$ m up?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = \\dfrac{y}{60}'] },
      ],
      lines: [
        { say: 'A hot-air balloon rises straight up at three metres per second, from a point 60 metres from an observer. How fast is the angle of elevation, theta, increasing when the balloon is 80 metres up?', show: ['bl.ground', 'bl.O', 'bl.d', 'bl.balloon', 'bl.rise', 'p'] },
        { say: 'The height y changes, at d y by d t equals three. The angle theta changes too, and we want d theta by d t. The 60 metres stays the same.', show: ['bl.y', 'bl.mark', 'bl.sight', 'bl.theta'], focus: ['bl.y', 'bl.theta'] },
        { say: 'Which equation links y and theta? In the right triangle, y is opposite theta, and 60 is adjacent. So tan theta equals y over 60.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'How fast the angle changes',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sec^2\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{60}\\,\\dfrac{dy}{dt}', 'y = 80\\colon\\quad \\text{sight line} = 100, \\quad \\sec\\theta = \\dfrac{100}{60}, \\quad \\sec^2\\theta = \\dfrac{25}{9}', '\\dfrac{d\\theta}{dt} = \\dfrac{9}{25}\\cdot\\dfrac{3}{60} = 0.018\\text{ rad/s}'] },
      ],
      lines: [
        { say: 'Differentiate both sides with respect to t. The derivative of tan theta is secant squared theta, times d theta by d t, by the chain rule. The right side gives one sixtieth of d y by d t.', show: 'm.0', focus: 'm.0' },
        { say: 'When the balloon is 80 metres up, the line of sight is the square root of 60 squared plus 80 squared: 100 metres. Secant theta is the hypotenuse over the adjacent side, 100 over 60, so secant squared theta is 25 over nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Solve: d theta by d t equals nine over 25, times three over 60. That is 0.018. The angle of elevation is increasing at 0.018 radians per second.', show: 'm.2', focus: 'm.2' },
        { say: 'Rates of change of angles are in radians, because the derivative of tan theta is secant squared theta only when theta is in radians.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Signs and “how fast is it decreasing?”', md: 'When a question asks how fast something is **decreasing**, the derivative is negative, but the answer is a positive rate with the word “decreasing”: the ladder’s top “slides down at $0.375$ m/s”, not “at $-0.375$ m/s”.' }],
      lines: [
        { say: 'A common slip is with signs. When a quantity is decreasing, its derivative is negative. Put that negative sign in when you substitute.', show: 'oops' },
        { say: 'But when the question asks how fast something is decreasing, answer with a positive rate and the word decreasing. The ladder’s top slides down at 0.375 metres per second, not at negative 0.375 metres per second.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Car A is $6$ km north of an intersection, driving **toward** it at $50$ km/h. Car B is $8$ km east, driving away at $60$ km/h. How is the distance between them changing?',
          choices: ['Increasing at $78$ km/h', 'Decreasing at $18$ km/h', 'Increasing at $18$ km/h', 'Increasing at $110$ km/h'],
          answer: 2,
          working: '$10\\dfrac{dD}{dt} = 6(-50) + 8(60) = -300 + 480 = 180$, so $\\dfrac{dD}{dt} = 18$ km/h, positive: the distance is increasing.',
        },
      ],
      lines: [
        { say: 'Your turn. Car A is six kilometres north of an intersection, driving toward it at 50 kilometres per hour. Car B is eight kilometres east, driving away at 60 kilometres per hour. How is the distance between them changing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Car A is getting closer, so d x by d t is negative 50. Then ten d D by d t equals six times negative 50, plus eight times 60: negative 300 plus 480, which is 180. So d D by d t is positive eighteen, and the distance is increasing at eighteen kilometres per hour.', show: 'q.answer' },
        { say: 'Choice A uses positive 50 for car A, as if it were driving away from the intersection.' },
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
          items: ['Right angles: Pythagoras, $D^2 = x^2 + y^2$.', 'Angles: a trigonometric ratio, such as $\\tan\\theta = \\dfrac{y}{60}$, with $\\theta$ in radians.', 'A decreasing quantity has a negative rate.', 'Answer “decreasing at …” with a positive number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the quantities form a right angle, the Pythagorean theorem links them.', show: 'sum.0' },
        { say: 'When an angle changes, use a trigonometric ratio, and measure the angle in radians.', show: 'sum.1' },
        { say: 'A quantity that is decreasing has a negative rate.', show: 'sum.2' },
        { say: 'And answer a question about decreasing with a positive number and the word decreasing. That completes related rates. Next, we turn the derivative around, and look for antiderivatives. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
