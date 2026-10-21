import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { link, mirror, onIds, shapeOn, sheet } from './lib/m8-9-figures.ts';

type P = [number, number];

// The lesson's example: triangle ABC, A(2, 2), B(5, 3), C(3, 6), reflected in the line x = 7 onto
// the triangle with vertices Q(12, 2), R(9, 3) and P(11, 6). So A lands on Q, B on R and C on P.
const ABC: P[] = [
  [2, 2],
  [5, 3],
  [3, 6],
];
const image: P[] = ABC.map(([x, y]) => [14 - x, y]);

const g = sheet({ x: [0, 14], y: [1, 7] });
const reflect = (id: string) =>
  figure(id, [
    g,
    mirror(g, { id: 'm', x: 7 }),
    shapeOn(g, { id: 't', pts: ABC, names: ['A', 'B', 'C'], places: ['below left', 'above right', 'above'] }),
    shapeOn(g, { id: 'i', pts: image, names: ['Q', 'R', 'P'], places: ['below right', 'above left', 'above'], tone: 'good' }),
    ...ABC.map((p, k) => link(g, { id: `l${k}`, from: p, to: image[k], tone: 'theta' })),
  ]);

const pair = (id: string) => [`${id}.paper`, `${id}.m`, ...onIds(id, 't'), ...onIds(id, 'i')];

const video: Explainer = {
  id: 'm8-9-2-d',
  lessonId: 'm8-9-2',
  title: 'Congruence and Transformations, Part 4: Writing a Congruence Statement',
  thumbnailTitle: 'Writing a Congruence Statement',
  thumbnail: 'fv',
  summary:
    'When a transformation maps one polygon onto another, each vertex lands on its partner. Triangle ABC reflected onto triangle PQR sends A to Q, B to R and C to P, so the statement is △ABC ≅ △QRP: the image letters in the order A, B, C. △ABC ≅ △PQR looks neat but is wrong, because it says A matches P. Follow the vertices, not the alphabet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 4', title: 'Writing a Congruence Statement', subtitle: 'Follow each vertex' }],
      lines: [
        { say: 'When a slide, a flip or a turn moves one polygon onto another, each vertex lands on a partner. Those partners tell you how to write the statement of congruence.', show: 'title' },
        { say: 'In this video, you will follow each vertex to its image, and write the letters in the right order.' },
      ],
    },
    {
      chapter: 'Follow each vertex',
      layout: 'split',
      leftWidth: 760,
      left: [reflect('fv')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Triangle $ABC$ is reflected onto triangle $PQR$. Write a congruence statement.' }],
      lines: [
        { say: 'Triangle A B C is reflected in this mirror line, onto triangle P Q R. Write a statement of congruence.', show: [...pair('fv'), 'q'] },
        { say: 'Follow each vertex straight across the mirror line. Vertex A lands on Q.', show: 'fv.l0', focus: ['fv.l0', 'fv.t-n0', 'fv.i-n0'] },
        { say: 'Vertex B lands on R.', show: 'fv.l1', focus: ['fv.l1', 'fv.t-n1', 'fv.i-n1'] },
        { say: 'And vertex C lands on P.', show: 'fv.l2', focus: ['fv.l2', 'fv.t-n2', 'fv.i-n2'] },
      ],
    },
    {
      chapter: 'Writing the statement',
      layout: 'split',
      leftWidth: 760,
      left: [reflect('ws')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to Q', 'B \\to R', 'C \\to P', '\\triangle ABC \\cong \\triangle QRP'] }],
      lines: [
        { say: 'Now write the letters of the original in order: A, B, C. Next to each one, write the vertex it lands on: Q, R, P.', show: [...pair('ws'), 'ws.l0', 'ws.l1', 'ws.l2', 'm.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'So the statement is: triangle A B C is congruent to triangle Q R P.', show: 'm.3', focus: 'm.3' },
        { say: 'Read it back to check. First with first: A with Q. Second with second: B with R. Third with third: C with P. Every pair matches the picture.', focus: ['m.3', 'ws.l0', 'ws.l1', 'ws.l2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Alphabetical order', md: '$\\triangle ABC \\cong \\triangle PQR$ looks neat, but it is **wrong** here: it says $A$ matches $P$. Follow the **matching vertices**, not the alphabet.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\triangle ABC \\cong \\triangle PQR} \\quad \\text{wrong}', '\\good{\\triangle ABC \\cong \\triangle QRP} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. Triangle A B C is congruent to triangle P Q R looks neat, with both sets of letters in alphabetical order. But it is wrong here.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'It says that vertex A matches vertex P. But A lands on Q, not on P. The order of the letters must follow the matching vertices, not the alphabet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using the statement',
      layout: 'split',
      leftWidth: 760,
      left: [reflect('us')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\triangle ABC \\cong \\triangle QRP', 'AB \\leftrightarrow QR', '\\angle C \\leftrightarrow \\angle P'] }],
      lines: [
        { say: 'A correct statement is useful, because you can read the matching parts from it.', show: [...pair('us'), 'm.0'] },
        { say: 'The first two letters give a pair of sides: side A B matches side Q R. On the grid, both go three squares across and one square up.', show: 'm.1', focus: ['m.1', 'us.t-s0', 'us.i-s0'] },
        { say: 'And the third letters give a pair of angles: angle C matches angle P.', show: 'm.2', focus: ['m.2', 'us.t-n2', 'us.i-n2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Triangle $DEF$ is turned onto triangle $KLM$. Vertex $D$ lands on $M$, $E$ lands on $K$, and $F$ lands on $L$. Which congruence statement is correct?',
          choices: ['$\\triangle DEF \\cong \\triangle MKL$', '$\\triangle DEF \\cong \\triangle KLM$', '$\\triangle DEF \\cong \\triangle MLK$', '$\\triangle DEF \\cong \\triangle LMK$'],
          answer: 0,
          working: 'Write the images of $D$, $E$ and $F$, in that order: $M$, $K$, $L$. So $\\triangle DEF \\cong \\triangle MKL$.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle D E F is turned onto triangle K L M. Vertex D lands on M, E lands on K, and F lands on L. Which statement of congruence is correct? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: triangle D E F is congruent to triangle M K L. Write the images of D, E and F, in that order: M, K, L. Choice B is in alphabetical order, so it says D matches K, but D lands on M.', show: 'q.answer' },
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
            'Translations (slides), rotations (turns) and reflections (flips) give images congruent to the original.',
            'Trace the vertices in order: a reflection reverses their direction; a translation or rotation does not.',
            'Shapes on a grid are congruent only if they match exactly after a slide, turn or flip.',
            'Write a congruence statement by following each vertex to its image, in order.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up this lesson. Slides, turns and flips give images that are congruent to the original.', show: 'sum.0' },
        { say: 'To tell them apart, trace the vertices in order. A reflection reverses their direction, and a translation or a rotation does not.', show: 'sum.1' },
        { say: 'Shapes on a grid are congruent only if they match exactly after a slide, a turn or a flip.', show: 'sum.2' },
        { say: 'And to write a statement of congruence, follow each vertex to its image, and keep the letters in order. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
