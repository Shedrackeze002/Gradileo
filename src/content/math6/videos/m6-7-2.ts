import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, span, tag, type P } from './lib/m6-7-figures.ts';

// The lesson's shapes: S, shape A (S after a quarter turn) and shape B (S with every side doubled).
const S: P[] = [
  [1, 1],
  [4, 1],
  [4, 2],
  [2, 2],
  [2, 3],
  [1, 3],
];
const A: P[] = [
  [7, 4],
  [7, 1],
  [8, 1],
  [8, 3],
  [9, 3],
  [9, 4],
];
const B: P[] = [
  [12, 1],
  [18, 1],
  [18, 3],
  [14, 3],
  [14, 5],
  [12, 5],
];

const shapes = (id: string, o: { b?: boolean; arms?: boolean } = {}) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, o.b ? 19 : 10], y: [0, 6] }),
        shape({ id: 'S', pieces: [S], tone: 'adj', shade: 0.3 }),
        tag({ id: 'S-name', at: [3, 1.5], tex: 'S' }),
        shape({ id: 'A', pieces: [A], tone: 'opp', shade: 0.3 }),
        tag({ id: 'A-name', at: [7.5, 2], tex: 'A' }),
        ...(o.b ? [shape({ id: 'B', pieces: [B], tone: 'hyp', shade: 0.3 }), tag({ id: 'B-name', at: [15.5, 2], tex: 'B' })] : []),
        ...(o.arms
          ? [
              span({ id: 'S-long', a: [1, 1], b: [4, 1], label: '3', side: 'right', arrow: false, group: 'S-arms' }),
              span({ id: 'S-short', a: [1, 1], b: [1, 3], label: '2', side: 'left', arrow: false, group: 'S-arms' }),
              span({ id: 'A-long', a: [7, 1], b: [7, 4], label: '3', side: 'left', arrow: false, group: 'A-arms' }),
              span({ id: 'A-short', a: [7, 4], b: [9, 4], label: '2', side: 'left', arrow: false, group: 'A-arms' }),
              ...(o.b
                ? [
                    span({ id: 'B-long', a: [12, 1], b: [18, 1], label: '6', side: 'right', arrow: false, group: 'B-arms' }),
                    span({ id: 'B-short', a: [12, 1], b: [12, 5], label: '4', side: 'left', arrow: false, group: 'B-arms' }),
                  ]
                : []),
            ]
          : []),
      ),
    ],
    o.b ? 330 : 400,
  );

const video: Explainer = {
  id: 'm6-7-2',
  lessonId: 'm6-7-2',
  title: 'Congruent Shapes, Part 1: What Congruent Means',
  thumbnailTitle: 'What Congruent Means',
  thumbnail: 'sa',
  summary:
    'Two shapes are congruent if they have the same size and the same shape, so one can be slid, turned or flipped to cover the other exactly; where a shape is and which way it faces do not matter. Shape A is shape S after a quarter turn, with arms of 3 and 2 squares, so it is congruent to S; shape B has the same shape but every side twice as long, so it is not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 1', title: 'What Congruent Means', subtitle: 'The same size and the same shape' }],
      lines: [
        { say: 'Two puzzle pieces fit the same hole only if they have exactly the same size and shape. Mathematicians have a special word for shapes like this. They call them congruent.', show: 'title' },
        { say: 'In this video, you will learn what congruent means, and decide when two shapes are congruent, even when they face different ways.' },
      ],
    },
    {
      chapter: 'Congruent',
      layout: 'split',
      leftWidth: 520,
      left: [shapes('sa')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Congruent', md: 'Two shapes are **congruent** if they have the same size and the same shape. One shape can be moved (slid, turned or flipped) to cover the other exactly.' }],
      lines: [
        { say: 'Two shapes are congruent if they have the same size and the same shape.', show: 'def' },
        { say: 'That means you could move one shape, by sliding it, turning it or flipping it, until it covers the other one exactly.' },
        { say: 'Here are two shapes: shape S, and shape A. They face different ways. Could one of them cover the other exactly?', show: ['sa.paper', 'sa.S', 'sa.S-name', 'sa.A', 'sa.A-name'] },
        { say: 'Whether two shapes are congruent does not depend on where they are, or which way they face. Only the size and the shape matter.' },
      ],
    },
    {
      chapter: 'Shape A',
      layout: 'split',
      leftWidth: 520,
      left: [shapes('ar', { arms: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['S: \\text{ arms } 3 \\text{ and } 2', 'A: \\text{ arms } 3 \\text{ and } 2', '\\good{\\text{same size and shape}}'] }],
      lines: [
        { say: 'Count the squares. Shape S has a long arm, three squares long, and a short arm, two squares long. Each arm is one square thick.', show: ['ar.paper', 'ar.S', 'ar.S-name', 'ar.A', 'ar.A-name', 'ar.S-arms', 'm.0'], focus: 'ar.S-arms' },
        { say: 'Shape A also has a long arm of three squares, and a short arm of two squares. Every side has the same length as in shape S.', show: ['ar.A-arms', 'm.1'], focus: 'ar.A-arms' },
        { say: 'Shape A is simply shape S after a quarter turn. The long arm that lay along the bottom now stands up the side.' },
        { say: 'So shape A has the same size and the same shape as shape S. Shape A is congruent to shape S.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Shape B',
      layout: 'center',
      main: [shapes('bb', { b: true, arms: true }), { kind: 'math', id: 'm', size: 'md', lines: ['B: \\text{ arms } 6 \\text{ and } 4 \\quad \\bad{\\text{bigger, so not congruent to } S}'] }],
      lines: [
        { say: 'Now look at shape B. It has the same shape as shape S: an L shape with one arm longer than the other.', show: ['bb.paper', 'bb.S', 'bb.S-name', 'bb.A', 'bb.A-name', 'bb.B', 'bb.B-name'] },
        { say: 'But count its arms. The long arm is six squares, and the short arm is four squares. Every side is twice as long as in shape S.', show: ['bb.S-arms', 'bb.B-arms'], focus: 'bb.B-arms' },
        { say: 'Shape B is bigger. However you slide, turn or flip it, it can never cover shape S exactly. So shape B is not congruent to shape S.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Same shape is not enough', md: 'A bigger or smaller copy has the same shape, but not the same size. Congruent shapes must match in **size** too.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Trace it', md: 'Trace one shape. Turn or flip the tracing. If it covers the other shape exactly, the shapes are congruent.' },
      ],
      lines: [
        { say: 'Watch out. A bigger or smaller copy of a shape has the same shape, but not the same size. Shapes that are congruent must match in size as well as in shape.', show: 'oops' },
        { say: 'Here is a way to check. Trace one shape on thin paper. Then slide, turn or flip the tracing over the other shape.', show: 'tip' },
        { say: 'If the tracing covers the other shape exactly, with nothing sticking out, the shapes are congruent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is $4$ cm long and $2$ cm wide. Which rectangle is congruent to it?',
          choices: ['$2$ cm long and $4$ cm wide', '$8$ cm long and $4$ cm wide', '$4$ cm long and $3$ cm wide', '$2$ cm long and $1$ cm wide'],
          answer: 0,
          working: 'A rectangle $2$ cm long and $4$ cm wide is the same rectangle turned on its side: the same size and the same shape.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is four centimetres long and two centimetres wide. Which rectangle is congruent to it? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A. A rectangle two centimetres long and four centimetres wide is the same rectangle, turned on its side. It has the same size and the same shape. Choice B has the same shape, but it is twice as big.',
          show: 'q.answer',
        },
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
          items: ['Congruent shapes have the same size and the same shape.', 'Where a shape is, and which way it faces, do not matter.', 'A bigger or smaller copy is not congruent.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Shapes that are congruent have the same size and the same shape.', show: 'sum.0' },
        { say: 'Where a shape is, and which way it faces, do not matter.', show: 'sum.1' },
        { say: 'But a bigger or smaller copy is not congruent. In the next part, you will use matching sides to find a missing length. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
