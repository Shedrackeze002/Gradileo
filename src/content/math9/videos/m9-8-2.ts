import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, arcOn, ln, ring } from './lib/m9-8-figures.ts';

const R = 4;

// A at 220° and B at 320°: the central angle AOB is 100°, and C, at 100° on the other side of the
// circle, makes the inscribed angle ACB = 50°. Arc AB is the shorter arc, from 220° to 320°.
const circleFig = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { A: 220, B: 320, C: 100 }, centrePlace: 'above' }),
    arcOn('arc', [0, 0], R, 220, 320, { label: '\\text{arc } AB', side: 'right' }),
    ln('oa', 'O', 'A', { tone: 'adj', group: 'central' }),
    ln('ob', 'O', 'B', { tone: 'adj', group: 'central' }),
    ang('ca', 'O', 'A', 'B', { tone: 'adj', r: 30, group: 'central' }),
    ln('ca1', 'C', 'A', { tone: 'opp', group: 'inscribed' }),
    ln('cb1', 'C', 'B', { tone: 'opp', group: 'inscribed' }),
    ang('ia', 'C', 'A', 'B', { tone: 'opp', r: 40, group: 'inscribed' }),
  ]);

const video: Explainer = {
  id: 'm9-8-2',
  lessonId: 'm9-8-2',
  title: 'Inscribed and Central Angles, Part 1: Arcs and Angles',
  thumbnailTitle: 'Arcs and Angles',
  thumbnail: 'ci',
  summary:
    'An arc is a part of a circle between two points on the circle. A central angle, such as ∠AOB, has its vertex at the centre O, and its arms are radii. An inscribed angle, such as ∠ACB, has its vertex on the circle, and its arms are chords. An angle is subtended by an arc when its arms end at the two ends of the arc: ∠AOB and ∠ACB are both subtended by arc AB.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 1', title: 'Arcs and Angles', subtitle: 'Central angles and inscribed angles' }],
      lines: [
        { say: 'Stand anywhere on the edge of a round skating pond, and look at two hockey nets on the far side. The angle you see is linked to the angle at the centre of the pond in a surprisingly simple way.', show: 'title' },
        { say: 'Before you learn that link, you need a few words. In this part, you will meet arcs, central angles and inscribed angles.' },
      ],
    },
    {
      chapter: 'Arcs',
      layout: 'split',
      leftWidth: 560,
      left: [circleFig('ar')],
      right: [{ kind: 'callout', id: 'd', tone: 'definition', title: 'Arc', md: 'An **arc** is a part of a circle between two points on the circle.' }],
      lines: [
        { say: 'Here is a circle with two points on it, A and B.', show: ['ar.fill', 'ar.outline', 'ar.nA', 'ar.nB'] },
        { say: 'An arc is a part of the circle between two points on the circle. The green part of the circle, between A and B, is arc A B.', show: ['ar.arc', 'd'], focus: 'ar.arc' },
        { say: 'Two points actually cut a circle into two arcs: a shorter one and a longer one. In this lesson, the arc we mean is shown in green.' },
      ],
    },
    {
      chapter: 'Central angles',
      layout: 'split',
      leftWidth: 560,
      left: [circleFig('ce')],
      right: [{ kind: 'callout', id: 'd', tone: 'definition', title: 'Central angle', md: 'A **central angle** has its vertex at the **centre** $O$. Its arms are two radii, like $\\angle AOB$.' }],
      lines: [
        { say: 'An angle has a vertex, the corner point, and two arms, the lines that meet there.', show: ['ce.fill', 'ce.outline', 'ce.nA', 'ce.nB', 'ce.arc'] },
        { say: 'A central angle has its vertex at the centre of the circle. Its arms are two radii. Here, angle A O B is a central angle.', show: ['ce.nO', 'ce.central', 'd'], focus: 'ce.central' },
        { say: 'Its arms end at A and B, the two ends of arc A B.', focus: ['ce.oa', 'ce.ob', 'ce.arc'] },
      ],
    },
    {
      chapter: 'Inscribed angles',
      layout: 'split',
      leftWidth: 560,
      left: [circleFig('in')],
      right: [{ kind: 'callout', id: 'd', tone: 'definition', title: 'Inscribed angle', md: 'An **inscribed angle** has its vertex **on the circle**. Its arms are two chords, like $\\angle ACB$.' }],
      lines: [
        { say: 'An inscribed angle has its vertex on the circle. Its arms are two chords. Here, angle A C B is an inscribed angle, with its vertex at C.', show: ['in.fill', 'in.outline', 'in.nA', 'in.nB', 'in.arc', 'in.nC', 'in.inscribed', 'd'], focus: 'in.inscribed' },
        { say: 'Its arms end at A and B as well, the two ends of arc A B.', focus: ['in.ca1', 'in.cb1', 'in.arc'] },
        { say: 'To name an angle, put the vertex letter in the middle. Angle A C B has its vertex at C, the middle letter.' },
      ],
    },
    {
      chapter: 'Subtended by an arc',
      layout: 'split',
      leftWidth: 560,
      left: [circleFig('sb')],
      right: [{ kind: 'callout', id: 'd', tone: 'definition', title: 'Subtend', md: 'An angle is **subtended** by an arc when its arms end at the two ends of the arc. $\\angle AOB$ and $\\angle ACB$ are both subtended by arc $AB$.' }],
      lines: [
        { say: 'When the arms of an angle end at the two ends of an arc, we say the angle is subtended by the arc. You can think of the angle as standing on the arc.', show: ['sb.fill', 'sb.outline', 'sb.names', 'sb.arc', 'sb.central', 'sb.inscribed', 'd'], focus: 'sb.arc' },
        { say: 'So the central angle A O B and the inscribed angle A C B are both subtended by arc A B. They both stand on the same arc.', focus: ['sb.central', 'sb.inscribed'] },
        { say: 'Look at the picture. Which angle looks bigger? In the next part, you will find out exactly how these two angles are related.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Points $A$, $B$ and $C$ are on a circle with centre $O$. Which angle is an **inscribed** angle?',
          choices: ['$\\angle AOB$', '$\\angle BOC$', '$\\angle ACB$', '$\\angle AOC$'],
          answer: 2,
          working: 'The vertex of $\\angle ACB$ is $C$, a point on the circle, and its arms are chords. The others have their vertex at the centre $O$, so they are central angles.',
        },
      ],
      lines: [
        { say: 'Your turn. Points A, B and C are on a circle with centre O. Which angle is an inscribed angle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, angle A C B. Its vertex, C, is on the circle, and its arms are chords. Choice A, angle A O B, has its vertex at the centre, so it is a central angle.', show: 'q.answer' },
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
            'An **arc** is a part of a circle between two points on it.',
            'A **central angle** has its vertex at the centre. An **inscribed angle** has its vertex on the circle.',
            'An angle is **subtended** by an arc when its arms end at the ends of the arc.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An arc is a part of a circle between two points on the circle.', show: 'sum.0' },
        { say: 'A central angle has its vertex at the centre, and an inscribed angle has its vertex on the circle.', show: 'sum.1' },
        { say: 'And an angle is subtended by an arc when its arms end at the two ends of the arc. In the next part, you will discover how a central angle and an inscribed angle on the same arc are related. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
