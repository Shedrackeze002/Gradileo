import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 70], y: [0, 15], xStep: 20, yStep: 5, width: 9, height: 4.6, titles: { x: 'x\\text{ (m)}', y: 'y\\text{ (m)}' } });
const path = (x: number) => 0.75 * x - (4.9 * x * x) / 400;
const range = (15 / 4.9) * 20;

const video: Explainer = {
  id: 'mx-13-4',
  lessonId: 'mx-13-4',
  title: 'Projectiles',
  thumbnail: 'gr',
  summary: 'A projectile’s horizontal and vertical motions are separate. Horizontally the velocity stays U cos θ; vertically the acceleration is g downwards from U sin θ. A stone thrown horizontally at 20 m/s from a 19.6 m cliff lands after 2 s, 40 m out. A ball kicked at 25 m/s with tan θ = 3/4 has u_x = 20 and u_y = 15, a time of flight of about 3.06 s, a range of about 61.2 m and a greatest height of about 11.5 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Projectiles', subtitle: 'Two motions at once' }],
      lines: [
        { say: 'A ball kicked into the air follows a curved path, yet we can describe it with nothing more than the suvat formulas.', show: 'title' },
        { say: 'The secret is that its horizontal and vertical motions are completely separate. In this video, you will find how long a projectile flies, how far it goes, and how high it gets.' },
      ],
    },
    {
      chapter: 'Two motions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Projectile', md: 'An object launched into the air that moves under gravity alone. Projected at speed $U$ at angle $\\theta$ above the horizontal:' },
        { kind: 'table', id: 't', head: ['', 'Horizontal', 'Vertical (up positive)'], rows: [['Start velocity', '$U\\cos\\theta$', '$U\\sin\\theta$'], ['Acceleration', '$0$', '$-9.8$'], ['Use', '$x = (U\\cos\\theta)t$', 'suvat']] },
      ],
      lines: [
        { say: 'A projectile is an object thrown or launched into the air that then moves under gravity alone. We ignore air resistance and model it as a particle.', show: 'def' },
        { say: 'Split the starting velocity into two parts. Horizontally it is U cos theta, and vertically it is U sine theta.', show: 't.0', focus: 't.0' },
        { say: 'Gravity acts only downwards. So horizontally there is no acceleration, and vertically the acceleration is nine point eight downwards.', show: 't.1', focus: 't.1' },
        { say: 'So the horizontal velocity never changes, and the distance across is just velocity times time. Vertically, we use the suvat formulas. The time t is what links the two.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Thrown horizontally',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A stone is thrown horizontally at $20$ m/s from a cliff $19.6$ m above the sea. How far from the foot of the cliff does it land?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Down positive: } u = 0,\\ a = 9.8,\\ s = 19.6', '19.6 = 4.9t^2 \\;\\Rightarrow\\; t = 2\\text{ s}', 'x = 20 \\times 2 = 40\\text{ m}'] },
      ],
      lines: [
        { say: 'A stone is thrown horizontally at twenty metres per second from a cliff nineteen point six metres above the sea. How far from the foot of the cliff does it land?', show: 'q' },
        { say: 'Start with the vertical motion. Thrown horizontally means no vertical velocity at the start, so u is zero. Taking down as positive, "a" is nine point eight and s is nineteen point six.', show: 'm.0', focus: 'm.0' },
        { say: 'Then nineteen point six equals four point nine t squared, so t is two seconds.', show: 'm.1', focus: 'm.1' },
        { say: 'In those two seconds, the stone moves across at a steady twenty metres per second, so it lands forty metres from the foot of the cliff.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Projected at an angle',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('gr', [g, plot(g, { id: 'path', f: path, from: 0, to: range }), dots(g, [{ id: 'top', x: range / 2, y: path(range / 2), tex: '11.5', place: 'above' }, { id: 'land', x: range, y: 0, tex: '61.2', place: 'above right' }])], 360),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['u_x = 25 \\times \\tfrac{4}{5} = 20', 'u_y = 25 \\times \\tfrac{3}{5} = 15', '0 = 15t - 4.9t^2 \\;\\Rightarrow\\; t \\approx 3.06\\text{ s}', '\\text{Range} = 20 \\times 3.06 \\approx 61.2\\text{ m}', '0 = 15^2 - 19.6h \\;\\Rightarrow\\; h \\approx 11.5\\text{ m}'] },
      ],
      lines: [
        { say: 'A ball is kicked from level ground at twenty five metres per second, at an angle theta with tan theta equal to three quarters. Find its time of flight, its range and its greatest height.', show: ['gr.grid', 'gr.axes', 'gr.path'] },
        { say: 'With tan theta three quarters, sine theta is three fifths and cos theta is four fifths. So the ball starts with twenty metres per second across, and fifteen metres per second up.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'It lands when its vertical displacement is zero again: zero equals fifteen t minus four point nine t squared. So t is fifteen over four point nine, about three point zero six seconds.', show: 'm.2', focus: 'm.2' },
        { say: 'In that time it moves across at twenty metres per second, so the range is about sixty one point two metres.', show: ['m.3', 'gr.land'], focus: ['m.3', 'gr.land'] },
        { say: 'At the top, the vertical velocity is zero. So zero equals fifteen squared minus nineteen point six h, and the greatest height is about eleven point five metres.', show: ['m.4', 'gr.top'], focus: ['m.4', 'gr.top'] },
      ],
    },
    {
      chapter: 'Velocity at any time',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 2: \\quad v_x = 20, \\quad v_y = 15 - 9.8(2) = {-4.6}', '\\text{Speed} = \\sqrt{20^2 + 4.6^2} \\approx 20.5\\text{ m/s}', '\\tan^{-1}\\left(\\tfrac{4.6}{20}\\right) \\approx 13.0^\\circ \\text{ below the horizontal}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Do not add the speeds', md: 'The components are at right angles, so the speed is $\\sqrt{v_x^2 + v_y^2}$, not $v_x + v_y$.' },
      ],
      lines: [
        { say: 'Where is the ball heading two seconds after the kick? The horizontal velocity is still twenty. The vertical velocity is fifteen minus nine point eight times two, which is negative four point six.', show: 'm.0', focus: 'm.0' },
        { say: 'The negative sign means the ball is now coming down. The speed, by Pythagoras’ theorem, is about twenty point five metres per second.', show: 'm.1', focus: 'm.1' },
        { say: 'Its direction is the inverse tangent of four point six over twenty, about thirteen degrees below the horizontal.', show: 'm.2', focus: 'm.2' },
        { say: 'The two parts of the velocity are at right angles, so never just add them. Use Pythagoras’ theorem.', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball is projected at $10$ m/s at $30^\\circ$ above the horizontal. What is its horizontal velocity $1$ s later?',
          choices: ['$5$ m/s', '$8.66$ m/s', '$0.2$ m/s', '$10$ m/s'],
          answer: 1,
          working: 'The horizontal velocity never changes: $10\\cos 30^\\circ \\approx 8.66$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball is projected at ten metres per second at thirty degrees above the horizontal. What is its horizontal velocity one second later? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. There is no horizontal force, so the horizontal velocity never changes: ten cos thirty, about eight point six six metres per second. Choice A is the starting vertical velocity.', show: 'q.answer' },
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
          items: ['Split the velocity: $U\\cos\\theta$ across and $U\\sin\\theta$ up.', 'Horizontally the velocity is constant: $x = (U\\cos\\theta)t$.', 'Vertically use suvat with $a = -9.8$; at the top, $v_y = 0$.', 'Speed: $\\sqrt{v_x^2 + v_y^2}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Split the starting velocity into U cos theta across and U sine theta up.', show: 'sum.0' },
        { say: 'Horizontally the velocity is constant, so the distance is velocity times time.', show: 'sum.1' },
        { say: 'Vertically use the suvat formulas with "a" equal to negative nine point eight. At the top, the vertical velocity is zero.', show: 'sum.2' },
        { say: 'And the speed at any time comes from Pythagoras’ theorem. In the next lesson, we describe motion in two dimensions with vectors. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
