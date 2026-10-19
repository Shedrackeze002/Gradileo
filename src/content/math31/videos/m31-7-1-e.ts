import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crossing } from './lib/m31-7-figures.ts';
import { dots, guide, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// The point on y = √x closest to (3, 0): D² = (x − 3)² + x is least at x = 2.5.
const g = plane({ x: [0, 5], y: [0, 2.5], xStep: 0.5, yStep: 0.5, every: 0, width: 5, height: 2.5 });
const closest = figure('cp', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'curve', f: Math.sqrt, from: 0, to: 5, samples: 200 }),
  tag(g, 'name', 4.3, 2.35, 'y = \\sqrt{x}', 'above', 'brand'),
  tag(g, 'Qt', 3.95, 0.3, '(3,\\ 0)', 'center', 'opp', 'Q'),
  guide(g, 'd1', [3, 0], [1, 1], 'muted'),
  guide(g, 'd4', [3, 0], [4, 2], 'muted'),
  guide(g, 'best', [3, 0], [2.5, Math.sqrt(2.5)], 'theta', { dashed: false, weight: 4 }),
  dots(g, [
    { id: 'Q', x: 3, y: 0, tex: '', tone: 'opp' },
    { id: 'p1', x: 1, y: 1, tex: '', tone: 'muted', group: 'tries' },
    { id: 'p4', x: 4, y: 2, tex: '', tone: 'muted', group: 'tries' },
    { id: 'P', x: 2.5, y: Math.sqrt(2.5), tex: '(2.5,\\ \\sqrt{2.5})', tone: 'theta', place: 'above left' },
  ]),
]);

const river = () => figure('rv', [crossing({ width: 3, down: 8, land: 2.25, labels: { width: '300\\text{ m}', x: 'x', run: '800 - x', swim: '\\sqrt{300^2 + x^2}' } })], 330);

const video: Explainer = {
  id: 'm31-7-1-e',
  lessonId: 'm31-7-1',
  title: 'Optimization, Part 5: Shortest Distance and Fastest Route',
  thumbnailTitle: 'Shortest Distance, Fastest Route',
  thumbnail: 'rv',
  summary: 'To minimize a distance, minimize its square, which has no square root: the point on y = √x closest to (3, 0) is (2.5, √2.5). Then a closed interval problem: to reach a cabin 800 m downstream across a 300 m river, swimming at 1.2 m/s and running at 2 m/s, compare T(0) = 650 s, T(225) = 600 s and T(800) ≈ 712 s, and land 225 m downstream.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 5', title: 'Shortest Distance, Fastest Route', subtitle: 'Distances, times and endpoints' }],
      lines: [
        { say: 'Which point on a curve is closest to a given point? Where should a swimmer land to reach a cabin as soon as possible?', show: 'title' },
        { say: 'In this video, you will learn a trick that makes distance problems simpler, and use the closed interval method, endpoints and all, to find the fastest route across a river.' },
      ],
    },
    {
      chapter: 'Minimize the square',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Minimize the square of a distance', md: 'A distance $D = \\sqrt{\\ldots}$ is smallest exactly where $D^2$ is smallest, and $D^2$ has no square root to differentiate.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['D = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}', 'D^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2'] },
      ],
      lines: [
        { say: 'The distance between two points comes from the Pythagorean theorem: the square root of the change in x squared, plus the change in y squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Square roots are awkward to differentiate. But distances are never negative, and a bigger distance always has a bigger square. So the distance is smallest exactly where its square is smallest.', show: 'tip' },
        { say: 'So minimize D squared instead. It has no square root, and its critical numbers are the same.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The closest point',
      layout: 'split',
      leftWidth: 560,
      left: [closest],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['D^2 = (x - 3)^2 + (\\sqrt{x})^2', '= (x - 3)^2 + x', '2(x - 3) + 1 = 0', 'x = 2.5, \\quad D = \\sqrt{2.75} \\approx 1.66'] },
      ],
      lines: [
        { say: 'Which point on the curve y equals the square root of x is closest to the point at three, zero?', show: ['cp.grid', 'cp.axes', 'cp.curve', 'cp.name', 'cp.Q'] },
        { say: 'Try two points first. The point at one, one has D squared equal to two squared plus one squared, which is five. The point at four, two has D squared equal to one plus four, which is also five. The closest point is somewhere between them.', show: ['cp.d1', 'cp.d4', 'cp.tries'], focus: ['cp.d1', 'cp.d4'] },
        { say: 'A point on the curve is x, root x. Its distance squared from three, zero is, x minus three, squared, plus root x squared. And root x squared is just x.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Differentiate: two times, x minus three, plus one. Set it equal to zero, and x equals 2.5. The second derivative is two, which is positive, so this is a minimum.', show: 'm.2', focus: 'm.2' },
        { say: 'So the closest point is 2.5, root 2.5. D squared is 0.25 plus 2.5, which is 2.75, so the shortest distance is the square root of 2.75: about 1.66.', show: ['m.3', 'cp.best', 'cp.P'], focus: ['m.3', 'cp.best'] },
      ],
    },
    {
      chapter: 'Swim, then run',
      layout: 'center',
      main: [
        river(),
        { kind: 'text', id: 'p', size: 'md', md: 'Hana swims at $1.2$ m/s and runs at $2$ m/s. The cabin is $800$ m downstream, on the far bank.' },
      ],
      lines: [
        { say: 'Hana is on one bank of a river 300 metres wide, and wants to reach a cabin on the other bank, 800 metres downstream. Hana swims at 1.2 metres per second, and runs at two metres per second. Where should Hana land to arrive as soon as possible?', show: ['rv.water', 'rv.banks', 'rv.names', 'rv.across', 'p'] },
        { say: 'Let x be the distance from the point directly across to the landing point, P. Hana swims in a straight line to P, then runs the rest of the way along the bank, 800 minus x metres.', show: ['rv.x', 'rv.swim', 'rv.run'], focus: ['rv.x', 'rv.run'] },
        { say: 'The swim is the hypotenuse of a right triangle with legs 300 and x, so it is the square root of 300 squared plus x squared.', focus: 'rv.swim' },
        { say: 'Landing anywhere from directly across to the cabin itself makes sense, so x goes from zero to 800. This domain is a closed interval: it includes its endpoints.', focus: 'rv.x' },
      ],
    },
    {
      chapter: 'The time',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['T(x) = \\dfrac{\\sqrt{300^2 + x^2}}{1.2} + \\dfrac{800 - x}{2}, \\qquad 0 \\le x \\le 800', "T'(x) = \\dfrac{x}{1.2\\sqrt{90{,}000 + x^2}} - \\dfrac{1}{2} = 0", '2x = 1.2\\sqrt{90{,}000 + x^2}', '4x^2 = 1.44(90{,}000 + x^2) \\;\\Rightarrow\\; 2.56x^2 = 129{,}600', 'x^2 = 50{,}625 \\;\\Rightarrow\\; x = 225'],
        },
      ],
      lines: [
        { say: 'Time is distance divided by speed. So T of x equals the swim, root 300 squared plus x squared, over 1.2, plus the run, 800 minus x, over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate. By the chain rule, the derivative of root 90,000 plus x squared is x over that root. So T prime of x equals x, over 1.2 times the root, minus one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Set it equal to zero and cross-multiply: two x equals 1.2 times the root.', show: 'm.2', focus: 'm.2' },
        { say: 'Square both sides: four x squared equals 1.44, times 90,000 plus x squared. Take 1.44 x squared from both sides: 2.56 x squared equals 129,600.', show: 'm.3', focus: 'm.3' },
        { say: 'So x squared is 50,625, and x is 225 metres. That is the only critical number, and it is in the domain.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the endpoints',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$x\\ (\\text{m})$', 'Route', '$T(x)\\ (\\text{s})$'],
          rows: [
            ['$0$', 'swim straight across, run $800$ m', '$250 + 400 = 650$'],
            ['$225$', 'swim $375$ m, run $575$ m', '$312.5 + 287.5 = 600$'],
            ['$800$', 'swim all the way', '$\\approx 712$'],
          ],
        },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Land $225$ m downstream. The trip takes $600$ s, or $10$ minutes.' },
      ],
      lines: [
        { say: 'The domain is a closed interval, so use the closed interval method: compare the time at the critical number with the time at both endpoints.', show: 't' },
        { say: 'At x equals zero, Hana swims straight across, 300 metres in 250 seconds, then runs all 800 metres in 400 seconds: 650 seconds.', focus: 't.0' },
        { say: 'At x equals 225, the swim is the root of 90,000 plus 50,625, which is 375 metres, taking 312.5 seconds. The run is 575 metres, taking 287.5 seconds. That is 600 seconds.', focus: 't.1' },
        { say: 'At x equals 800, Hana swims all the way to the cabin: about 854 metres, which takes about 712 seconds.', focus: 't.2' },
        { say: 'The smallest time is 600 seconds. So Hana should land 225 metres downstream, and the trip takes 600 seconds, or ten minutes.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point on the curve $y = \\sqrt{x}$ is closest to the point $(5, 0)$?',
          choices: ['$(5, \\sqrt{5})$', '$(4, 2)$', '$(2.5, \\sqrt{2.5})$', '$(4.5, \\sqrt{4.5})$'],
          answer: 3,
          working: '$D^2 = (x - 5)^2 + x$, so $2(x - 5) + 1 = 0$ and $x = 4.5$. There $D^2 = 0.25 + 4.5 = 4.75$, less than the $5$ at $x = 4$ or $x = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point on the curve y equals root x is closest to the point at five, zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The distance squared is, x minus five, squared, plus x. Its derivative, two times x minus five, plus one, is zero when x is 4.5. There, D squared is 4.75.', show: 'q.answer' },
        { say: 'Choice A is straight above the point, but its D squared is five. The curve rises as it goes right, so the closest point is a little to the left.' },
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
          items: ['To minimize a distance, minimize its square.', 'Time $=$ distance $\\div$ speed, for each part of a route.', 'On a closed interval, compare the critical numbers **and** the endpoints.', 'Answer the question that was asked, with units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To minimize a distance, minimize its square, which has no square root.', show: 'sum.0' },
        { say: 'For a route, the time for each part is its distance divided by its speed.', show: 'sum.1' },
        { say: 'On a closed interval, compare the objective at the critical numbers and at the endpoints.', show: 'sum.2' },
        { say: 'And answer the question that was asked, with units. In the next lesson, we turn to related rates: how fast one quantity changes when another one does. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
