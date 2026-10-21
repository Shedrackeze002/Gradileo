import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, arcOn, ln, ring } from './lib/m9-8-figures.ts';

const R = 4;

// A at 235° and B at 305°: the central angle AOB is 70°, so every inscribed angle standing on arc
// AB (with its vertex on the other side of the circle) is 35°.
const same = (id: string, labels: { c: string; d: string; o?: string }) =>
  figure(id, [
    ring({ r: R, pts: { A: 235, B: 305, C: 175, D: 5 }, centrePlace: 'above' }),
    arcOn('arc', [0, 0], R, 235, 305),
    ln('oa', 'O', 'A', { tone: 'muted', dashed: true, group: 'central' }),
    ln('ob', 'O', 'B', { tone: 'muted', dashed: true, group: 'central' }),
    ang('co', 'O', 'A', 'B', { tone: 'muted', r: 30, ...(labels.o ? { label: labels.o, dist: 76 } : {}), group: 'central' }),
    ln('ca', 'C', 'A', { tone: 'opp', group: 'c' }),
    ln('cb', 'C', 'B', { tone: 'opp', group: 'c' }),
    ang('ac', 'C', 'A', 'B', { tone: 'opp', r: 44, label: labels.c, dist: 84, group: 'c' }),
    ln('da', 'D', 'A', { tone: 'good', group: 'd' }),
    ln('db', 'D', 'B', { tone: 'good', group: 'd' }),
    ang('ad', 'D', 'A', 'B', { tone: 'good', r: 44, label: labels.d, dist: 84, group: 'd' }),
  ]);

// The skating pond: hockey nets at A and B, and skaters at C, D and E on the far edge, who all see
// the nets at the same angle, 35°.
const pond = (id: string) =>
  figure(id, [
    ring({ r: R, centre: false, pts: { A: 235, B: 305, C: 160, D: 95, E: 30 }, tone: 'adj' }),
    arcOn('arc', [0, 0], R, 235, 305),
    ...(['C', 'D', 'E'] as const).flatMap((k, i) => {
      const tone = (['opp', 'theta', 'hyp'] as const)[i];
      return [
        ln(`${k}a`, k, 'A', { tone, group: k }),
        ln(`${k}b`, k, 'B', { tone, group: k }),
        ang(`${k}x`, k, 'A', 'B', { tone, r: 40, label: '35^\\circ', dist: 78, group: k }),
      ];
    }),
  ]);

const video: Explainer = {
  id: 'm9-8-2-c',
  lessonId: 'm9-8-2',
  title: 'Inscribed and Central Angles, Part 3: Angles on the Same Arc',
  thumbnailTitle: 'Angles on the Same Arc',
  thumbnail: 'tw',
  summary:
    'The inscribed angle property: inscribed angles subtended by the same arc are equal, because each one is half of the same central angle. If ∠ACB = 35° and ∠ADB stands on the same arc AB, then ∠ADB = 35° as well. Skaters standing anywhere on the far edge of a round pond see two hockey nets at the same angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 3', title: 'Angles on the Same Arc', subtitle: 'Inscribed angles that match' }],
      lines: [
        { say: 'Move the vertex of an inscribed angle to a different point on the circle. Does the angle change? As long as its arms still end at the same two points, the answer is no.', show: 'title' },
        { say: 'In this part, you will learn the inscribed angle property, and use it to find angles.' },
      ],
    },
    {
      chapter: 'The inscribed angle property',
      layout: 'split',
      leftWidth: 560,
      left: [same('pr', { c: '35^\\circ', d: '35^\\circ', o: '70^\\circ' })],
      right: [{ kind: 'callout', id: 'k', tone: 'key', title: 'Inscribed angle property', md: 'Inscribed angles subtended by the **same arc** are **equal**.' }],
      lines: [
        { say: 'Here are two inscribed angles. Angle A C B is orange, and angle A D B is green. Both have arms that end at A and B, so both are subtended by arc A B.', show: ['pr.fill', 'pr.outline', 'pr.names', 'pr.arc', 'pr.c', 'pr.d'], focus: ['pr.c', 'pr.d'] },
        { say: 'The central angle on the same arc, angle A O B, is seventy degrees.', show: 'pr.central', focus: 'pr.central' },
        { say: 'By the central angle property, each inscribed angle is half of seventy degrees. So each one is thirty-five degrees. They are equal.', focus: ['pr.ac', 'pr.ad'] },
        { say: 'The inscribed angle property says: inscribed angles subtended by the same arc are equal. It does not matter where the vertex is on the rest of the circle.', show: 'k' },
      ],
    },
    {
      chapter: 'Two angles on arc A B',
      layout: 'split',
      leftWidth: 560,
      left: [same('tw', { c: '35^\\circ', d: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\angle ACB = 35^\\circ$. Find $x = \\angle ADB$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Both stand on arc } AB.', '\\text{Same arc, so equal.}', 'x = 35^\\circ'] },
      ],
      lines: [
        { say: 'Let’s use it. Angle A C B is thirty-five degrees. Find x, angle A D B.', show: ['tw.fill', 'tw.outline', 'tw.names', 'tw.arc', 'tw.c', 'tw.d', 'q'] },
        { say: 'Step one: both angles have arms that end at A and B, so both are subtended by arc A B.', show: 'm.0', focus: ['m.0', 'tw.arc'] },
        { say: 'Step two: each one is half of the same central angle, so they are equal.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is thirty-five degrees.', show: 'm.2', focus: ['m.2', 'tw.ad'] },
      ],
    },
    {
      chapter: 'Back to the pond',
      layout: 'split',
      leftWidth: 560,
      left: [pond('pd')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Hockey nets at $A$ and $B$. Skaters at $C$, $D$ and $E$ all see the nets at the **same angle**.' }],
      lines: [
        { say: 'Remember the round skating pond? Put the two hockey nets at A and B, on one side of the pond.', show: ['pd.fill', 'pd.outline', 'pd.nA', 'pd.nB', 'pd.arc', 't'] },
        { say: 'A skater stands at C, on the far edge, and looks at the two nets. The angle between them is thirty-five degrees.', show: ['pd.nC', 'pd.C'], focus: 'pd.C' },
        { say: 'Another skater stands at D, and another at E. Every one of these angles stands on arc A B, so every one is thirty-five degrees as well.', show: ['pd.nD', 'pd.D', 'pd.nE', 'pd.E'], focus: ['pd.D', 'pd.E'] },
        { say: 'All the skaters on the far edge see the nets at exactly the same angle. That is the inscribed angle property at work.', focus: 'pd' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\angle APB$ and $\\angle AQB$ are inscribed angles subtended by the same arc $AB$. $\\angle APB = 48^\\circ$. Find $\\angle AQB$.',
          choices: ['$96^\\circ$', '$48^\\circ$', '$24^\\circ$', '$132^\\circ$'],
          answer: 1,
          working: 'Inscribed angles subtended by the same arc are equal, so $\\angle AQB = 48^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Angle A P B and angle A Q B are inscribed angles subtended by the same arc, A B. Angle A P B is forty-eight degrees. Find angle A Q B. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, forty-eight degrees. Inscribed angles subtended by the same arc are equal. Choice A doubles forty-eight, but that gives the central angle, not another inscribed angle.', show: 'q.answer' },
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
            'Inscribed angles subtended by the **same arc** are **equal**.',
            'Each one is half of the central angle on that arc.',
            'Look for angles whose arms end at the same two points.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Inscribed angles subtended by the same arc are equal.', show: 'sum.0' },
        { say: 'That is because each one is half of the same central angle.', show: 'sum.1' },
        { say: 'So look for angles whose arms end at the same two points on the circle. In the next part, you will see what happens when the arc is half of the circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
