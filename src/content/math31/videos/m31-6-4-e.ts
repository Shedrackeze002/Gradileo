import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { path } from './lib/m31-6-graphs.ts';

const video: Explainer = {
  id: 'm31-6-4-e',
  lessonId: 'm31-6-4',
  title: 'Motion Along a Line, Part 5: Displacement and Total Distance',
  thumbnailTitle: 'Displacement and Distance',
  thumbnail: 'pa',
  summary: 'Displacement on [t₁, t₂] is the change in position, s(t₂) − s(t₁), and can be negative; the total distance travelled counts every metre in either direction, so the trip is split at each turning point. For s(t) = t³ − 9t² + 24t from t = 0 to t = 5, the positions 0, 20, 16 and 20 give a displacement of 20 m and a total distance of 28 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 5', title: 'Displacement and Distance', subtitle: 'Where it ends up, and how far it went' }],
      lines: [
        { say: 'Walk ten metres down a hallway, then walk back three. You end up seven metres from where you started, but you walked thirteen metres.', show: 'title' },
        { say: 'Those two numbers have different names: displacement and total distance. In this video, you will find both for a particle that turns around.' },
      ],
    },
    {
      chapter: 'Two different measures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def1', tone: 'definition', title: 'Displacement', md: 'The **displacement** on $[t_1, t_2]$ is the change in position, $s(t_2) - s(t_1)$. It can be negative.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Total distance travelled', md: 'The **total distance** counts every metre covered, in either direction. Split the time interval wherever the object **turns around**, and add the distance of each leg.' },
      ],
      lines: [
        { say: 'The displacement over a time interval is the change in position: the final position minus the starting position. It only cares where the object ends up, and it can be negative.', show: 'def1' },
        { say: 'The total distance travelled counts every metre covered, in either direction. So split the time interval wherever the object turns around, find the distance of each leg, and add them up.', show: 'def2' },
      ],
    },
    {
      chapter: 'Out and back',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['s(t) = t^{3} - 9t^{2} + 24t, \\quad 0 \\le t \\le 5 \\qquad \\text{turning points: } t = 2,\\ t = 4', 's(0) = 0, \\quad s(2) = 20, \\quad s(4) = 16, \\quad s(5) = 125 - 225 + 120 = 20'] },
        figure('pa', [
          path({
            from: 0,
            to: 25,
            step: 5,
            unit: 's\\text{ (m)}',
            width: 12,
            legs: [
              { from: 0, to: 20, label: '20\\text{ m}', tone: 'good' },
              { from: 20, to: 16, label: '4\\text{ m}', tone: 'bad' },
              { from: 16, to: 20, label: '4\\text{ m}', tone: 'good' },
            ],
          }),
        ]),
      ],
      lines: [
        { say: 'Take the particle with position s of t equals t cubed, minus nine t squared, plus 24 t, from zero to five seconds. Find its displacement and the total distance it travels.', show: 'm.0', focus: 'm.0' },
        { say: 'From the earlier parts, it turns around at two seconds and at four seconds. Make a list of positions: at the start, at each turning point, and at the end. s of zero is zero, s of two is twenty, s of four is sixteen, and s of five is twenty.', show: ['m.1', 'pa.axis'], focus: 'm.1' },
        { say: 'In the first leg, it moves from zero to twenty: twenty metres.', show: 'pa.leg0', focus: 'pa.leg0' },
        { say: 'In the second leg, it moves back from twenty to sixteen: four metres.', show: 'pa.leg1', focus: 'pa.leg1' },
        { say: 'In the third leg, it moves forward from sixteen to twenty: four more metres.', show: 'pa.leg2', focus: 'pa.leg2' },
      ],
    },
    {
      chapter: 'The answer',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{displacement} = s(5) - s(0) = 20 - 0 = 20\\text{ m}', '\\text{distance} = |20 - 0| + |16 - 20| + |20 - 16|', '= 20 + 4 + 4 = 28\\text{ m}'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Make a position table', md: 'List the position at the start, at every turning point and at the end. The total distance is the sum of the gaps between consecutive positions.' },
      ],
      lines: [
        { say: 'The displacement is the final position minus the first: twenty minus zero, which is twenty metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The total distance adds the size of each leg, ignoring direction: twenty, plus four, plus four, which is 28 metres.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The distance is eight metres more than the displacement, because the particle went back four metres and then covered those same four metres again.' },
        { say: 'So make a position table: the position at the start, at every turning point, and at the end. The total distance is the sum of the gaps between them.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle has position $s(t) = t^{2} - 8t + 3$ metres after $t$ seconds. Find its displacement and the total distance it travels from $t = 0$ to $t = 6$.',
          choices: ['Displacement $12$ m, distance $20$ m', 'Displacement $-12$ m, distance $12$ m', 'Displacement $-12$ m, distance $20$ m', 'Displacement $-9$ m, distance $20$ m'],
          answer: 2,
          working: 'It turns around when $v(t) = 2t - 8 = 0$, at $t = 4$. $s(0) = 3$, $s(4) = -13$, $s(6) = -9$. Displacement: $-9 - 3 = -12$ m. Distance: $16 + 4 = 20$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A particle has position s of t equals t squared, minus eight t, plus three, in metres. Find its displacement and the total distance it travels from zero to six seconds. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It turns around at four seconds. Its positions are three at the start, negative thirteen at four seconds, and negative nine at the end. The displacement is negative nine minus three: negative twelve metres. The distance is sixteen plus four: twenty metres. Choice B forgets to split the trip at the turning point.', show: 'q.answer' },
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
          items: ['Displacement: $s(t_2) - s(t_1)$, which can be negative.', 'Total distance: split at every turning point, and add the size of each leg.', 'A position table makes both easy.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The displacement is the change in position, and it can be negative.', show: 'sum.0' },
        { say: 'The total distance splits the trip at every turning point, and adds the size of each leg.', show: 'sum.1' },
        { say: 'And a position table, with the start, the turning points and the end, makes both easy. Next, we use derivatives to find the best possible answer to real problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
