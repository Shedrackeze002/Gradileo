import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { force, segment } from './lib/mx-mechanics.ts';

const video: Explainer = {
  id: 'mx-12-3',
  lessonId: 'mx-12-3',
  title: 'Vertical Motion Under Gravity',
  thumbnail: 'c',
  summary: 'An object in free fall has a constant acceleration of g = 9.8 m/s² downwards, so the suvat formulas apply. With upwards positive, a = −9.8. A ball thrown up at 14.7 m/s rises 11.0 m in 1.5 s, where v = 0, and a stone thrown up at 7 m/s from a 20 m cliff reaches the sea after about 2.86 s at 21 m/s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Kinematics and Forces', title: 'Vertical Motion Under Gravity', subtitle: 'Up, down, and everything in between' }],
      lines: [
        { say: 'Drop a stone and it speeds up as it falls. Throw a ball upwards and it slows down, stops for an instant, then falls back.', show: 'title' },
        { say: 'If we ignore air resistance, both move with the same constant acceleration. So the suvat formulas describe them exactly, as long as we are careful with directions.' },
      ],
    },
    {
      chapter: 'Free fall',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('b', [
          segment('gnd', [-2, 0], [2, 0], { tone: 'muted' }),
          force('u', [0, 0.4], 90, 2.2, 'u', { tone: 'good' }),
          force('g', [0.9, 2.6], -90, 1.6, 'g = 9.8', { tone: 'bad', place: 'right' }),
          force('pos', [-1.4, 0.6], 90, 1.4, '+', { tone: 'muted', place: 'above' }),
        ], 440),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Free fall', md: 'An object moving under gravity alone has a constant acceleration $g \\approx 9.8$ m/s² **downwards**, going up, coming down, or at the top.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Upwards positive: } a = {-9.8}'] },
      ],
      lines: [
        { say: 'An object moving under gravity alone, with no air resistance, is in free fall. It has a constant acceleration of g, about nine point eight metres per second per second, downwards.', show: ['def', 'b.gnd', 'b.g'], focus: 'def' },
        { say: 'That is true whether the object is going up, coming down, or at its highest point.', show: 'b.u' },
        { say: 'So choose a positive direction before writing anything. If upwards is positive, then "a" equals negative nine point eight for every object in free fall, and a point below the start has a negative displacement.', show: ['b.pos', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'The greatest height',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A ball is projected vertically upwards at $14.7$ m/s. Find its greatest height and the time to reach it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['u = 14.7,\\ a = {-9.8},\\ v = 0', 'v^2 = u^2 + 2as: \\ 0 = 14.7^2 - 19.6s \\;\\Rightarrow\\; s = 11.025', 'v = u + at: \\ 0 = 14.7 - 9.8t \\;\\Rightarrow\\; t = 1.5'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Velocity is zero, acceleration is not', md: 'At the top $v = 0$, but $a$ is still $9.8$ m/s² downwards.' },
      ],
      lines: [
        { say: 'A ball is projected vertically upwards at fourteen point seven metres per second. Find its greatest height, and the time it takes to get there.', show: 'q' },
        { say: 'Take upwards as positive, so u is fourteen point seven and "a" is negative nine point eight. The key fact: at the highest point, the ball is momentarily at rest, so v equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'For the height, use v squared equals u squared plus two "a" s. That gives s equals about eleven point zero metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For the time, use v equals u plus "a" t. Zero equals fourteen point seven minus nine point eight t, so t is one point five seconds.', show: 'm.2', focus: 'm.2' },
        { say: 'Be careful here. At the top the velocity is zero, but the acceleration is not. If it were zero, the ball would stay up in the air.', show: 'mis' },
      ],
    },
    {
      chapter: 'From a cliff',
      layout: 'split',
      leftWidth: 480,
      left: [
        {
          kind: 'diagram',
          id: 'c',
          height: 480,
          points: { W1: [-3, 0], W2: [3, 0], B: [0, 0], T: [0, 4], S: [0.4, 4], U: [0.4, 6], L: [0.9, 0] },
          items: [
            { kind: 'thing', id: 'sea', type: 'water', at: 'W1' },
            { kind: 'thing', id: 'cliff', type: 'cliff', at: 'B', top: 'T', side: 'left', width: 3 },
            { kind: 'line', id: 'h', from: 'B', to: 'T', tone: 'opp', dashed: true, label: '20\\text{ m}', labelSide: 'left' },
            { kind: 'line', id: 'up', from: 'S', to: 'U', tone: 'good', arrow: true, label: '7\\text{ m/s}', labelSide: 'right' },
            { kind: 'line', id: 'down', from: 'U', to: 'L', tone: 'bad', dashed: true, arrow: true },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['u = 7,\\ a = {-9.8},\\ s = {-20}', '{-20} = 7t - 4.9t^2', '4.9t^2 - 7t - 20 = 0', 't = \\frac{7 \\pm 21}{9.8} \\approx 2.86\\text{ s}', 'v^2 = 49 + 392 = 441,\\ \\ 21\\text{ m/s}'] },
      ],
      lines: [
        { say: 'A stone is thrown vertically upwards at seven metres per second from the edge of a cliff twenty metres above the sea. Find the time it takes to reach the sea, and its speed as it lands.', show: ['c.sea', 'c.cliff', 'c.h', 'c.up'] },
        { say: 'Upwards is positive, so u is seven and "a" is negative nine point eight. The sea is twenty metres below the start, so s is negative twenty.', show: ['c.down', 'm.0'], focus: 'm.0' },
        { say: 'Use s equals u t plus a half "a" t squared. That gives a quadratic: four point nine t squared minus seven t minus twenty equals zero.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The quadratic formula gives seven plus or minus twenty one, over nine point eight. Time must be positive, so t is about two point eight six seconds.', show: 'm.3', focus: 'm.3' },
        { say: 'For the speed, v squared equals forty nine plus three hundred ninety two, which is four hundred forty one. So the stone hits the sea at twenty one metres per second.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stone is dropped from rest and falls for $2$ s. How far does it fall? Take $g = 9.8$ m/s².',
          choices: ['$9.8$ m', '$39.2$ m', '$4.9$ m', '$19.6$ m'],
          answer: 3,
          working: 'Downwards positive: $s = ut + \\tfrac{1}{2}at^2 = 0 + \\tfrac{1}{2}(9.8)(2^2) = 19.6$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A stone is dropped from rest and falls for two seconds. How far does it fall? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Dropped from rest means u is zero. With downwards positive, s equals a half times nine point eight times two squared, which is nineteen point six metres. Choice B forgets the half.', show: 'q.answer' },
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
          items: ['In free fall, the acceleration is $9.8$ m/s² downwards, all the time.', 'With upwards positive, $a = -9.8$, and points below the start have $s < 0$.', 'At the greatest height, $v = 0$.', 'Keep the root of the quadratic that fits the question.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In free fall, the acceleration is nine point eight metres per second per second downwards, all the time.', show: 'sum.0' },
        { say: 'With upwards positive, "a" is negative nine point eight, and points below the start have a negative displacement.', show: 'sum.1' },
        { say: 'At the greatest height, the velocity is zero.', show: 'sum.2' },
        { say: 'And when a quadratic gives two times, keep the one that fits the question. In the next lesson, we find out what causes acceleration: forces, and Newton’s laws. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
