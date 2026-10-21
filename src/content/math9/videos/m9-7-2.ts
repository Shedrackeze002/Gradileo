import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { paper } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { seg, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

// The classroom plan: 8 cm by 5 cm on centimetre squares, where 1 cm represents 2 m. The counts
// 2, 4, … 16 along the bottom and 2, 4, … 10 up the side are the real metres at each centimetre.
const counts = (): Part[] => [
  ...Array.from({ length: 8 }, (_, i) => tag(`cx${i}`, [2 + i, 0.55], String(2 * (i + 1)), { tone: 'good', group: 'cx' })),
  ...Array.from({ length: 5 }, (_, i) => tag(`cy${i}`, [9.45, 2 + i], String(2 * (i + 1)), { tone: 'good', group: 'cy' })),
];
const plan = (id: string) =>
  figure(id, [
    paper({ x: [0, 10], y: [0, 7] }),
    shape({ name: 'p', pts: rect(1, 1, 8, 5), sides: [{ tone: 'adj', label: '8\\text{ cm}' }, { tone: 'opp', label: '5\\text{ cm}' }] }),
    ...counts(),
    seg('rw', [1, 1], [9, 1], { tone: 'adj', label: '16\\text{ m}', side: 'right' }),
    seg('rh', [9, 1], [9, 6], { tone: 'opp', label: '10\\text{ m}', side: 'right' }),
  ]);

// A 13 m wall at this scale: 13 ÷ 2 = 6.5 cm, six and a half squares.
const wall = (id: string) =>
  figure(
    id,
    [
      paper({ x: [0, 10], y: [0, 4] }),
      seg('w', [1, 2], [7.5, 2], { tone: 'opp', weight: 7, label: '6.5\\text{ cm}', side: 'left' }),
      seg('one', [1, 1], [2, 1], { tone: 'good', weight: 5 }),
      tag('key', [2.2, 1], '1\\text{ cm represents } 2\\text{ m}', { tone: 'good', place: 'right' }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-7-2',
  lessonId: 'm9-7-2',
  title: 'Scale Diagrams and Maps, Part 1: Reading a Scale',
  thumbnailTitle: 'Reading a Scale',
  thumbnail: 'wl',
  summary:
    'The scale of a diagram or map compares a length on the drawing with the real length, in words ("1 cm represents 2 m") or as a ratio (1 : 200). On a classroom plan where 1 cm represents 2 m, a plan 8 cm by 5 cm stands for a room 8 × 2 = 16 m long and 5 × 2 = 10 m wide. To go from a real length to the drawing, divide: a 13 m wall is 13 ÷ 2 = 6.5 cm long on the plan.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 1', title: 'Reading a Scale', subtitle: 'From the drawing to real life' }],
      lines: [
        { say: 'A hiking map fits a whole park on one sheet of paper. A floor plan fits a whole house on a page. Both are scale diagrams.', show: 'title' },
        { say: 'The scale tells you how to turn a length on the paper into a real length. In this part, you will read a scale written in words, and use it both ways.' },
      ],
    },
    {
      chapter: 'What a scale tells you',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale', md: 'The **scale** of a diagram or map compares a length on the drawing with the real length.' },
        { kind: 'bullets', id: 'b', items: ['In words: $1$ cm represents $2$ m.', 'As a ratio: $1 : 200$.'] },
      ],
      lines: [
        { say: 'A plan or a map is much smaller than the real thing. Its scale compares a length on the drawing with the real length.', show: 'def' },
        { say: 'A scale can be written in words, such as: one centimetre represents two metres. Represents means stands for. Every centimetre on the drawing stands for two metres in real life.', show: 'b.0' },
        { say: 'A scale can also be written as a ratio, such as one to two hundred. This part uses scales in words. The next part uses scales written as ratios.', show: 'b.1' },
      ],
    },
    {
      chapter: 'A classroom plan',
      layout: 'split',
      leftWidth: 600,
      left: [plan('pl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'On this plan, $1$ cm represents $2$ m. How long and how wide is the real classroom?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Length: } 8 \\times 2 = 16 \\text{ m}', '\\text{Width: } 5 \\times 2 = 10 \\text{ m}'] },
      ],
      lines: [
        { say: 'Here is a scale diagram of a classroom floor, drawn on centimetre squares. On this plan, one centimetre represents two metres.', show: ['pl.paper', ...shapeIds('pl', 'p'), 'q'] },
        { say: 'The plan is eight centimetres long and five centimetres wide. How long and how wide is the real classroom?', show: ['pl.p-len0', 'pl.p-len1'], focus: ['pl.p-len0', 'pl.p-len1'] },
        { say: 'Each centimetre on the plan stands for two metres. So count along the bottom in twos: two, four, six, eight, and so on, up to sixteen.', hide: 'pl.p-len0', show: 'pl.cx', focus: 'pl.cx' },
        { say: 'That is the same as multiplying: eight centimetres stands for eight times two, or sixteen metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Up the side, count again: two, four, six, eight, ten. Five centimetres stands for five times two, or ten metres.', hide: 'pl.p-len1', show: ['pl.cy', 'm.1'], focus: ['pl.cy', 'm.1'] },
        { say: 'So the real classroom is sixteen metres long and ten metres wide.', hide: ['pl.cx', 'pl.cy'], show: ['pl.rw', 'pl.rh'], focus: ['pl.rw', 'pl.rh'] },
      ],
    },
    {
      chapter: 'From real life to the plan',
      layout: 'center',
      main: [
        wall('wl'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['13 \\text{ m} \\div 2 = 6.5', '6.5 \\text{ cm on the plan}'] },
      ],
      lines: [
        { say: 'Now go the other way, from a real length to the plan. Suppose a wall of the classroom is thirteen metres long. How long is it on the plan?', show: ['wl.paper', 'wl.one', 'wl.key'] },
        { say: 'Every two metres takes one centimetre on the plan. So ask: how many twos are in thirteen? Divide. Thirteen divided by two is six point five.', show: 'm.0', focus: 'm.0' },
        { say: 'The wall is six point five centimetres long on the plan: a line six and a half squares long.', show: ['wl.w', 'm.1'], focus: ['wl.w', 'm.1'] },
        { say: 'So remember: from the drawing to real life, multiply. From real life to the drawing, divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a plan, $1$ cm represents $3$ m. A room is $4.5$ cm long on the plan. How long is the real room?',
          choices: ['$1.5$ m', '$7.5$ m', '$135$ m', '$13.5$ m'],
          answer: 3,
          working: 'Each centimetre stands for $3$ m, so multiply: $4.5 \\times 3 = 13.5$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. On a plan, one centimetre represents three metres. A room is four point five centimetres long on the plan. How long is the real room? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirteen point five metres. Each centimetre stands for three metres, so multiply: four point five times three is thirteen point five. Choice A divides instead, but from the plan to real life, you multiply.', show: 'q.answer' },
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
            'A **scale** compares a length on a drawing with the real length.',
            'From the drawing to real life, **multiply**: $8$ cm $\\to 8 \\times 2 = 16$ m.',
            'From real life to the drawing, **divide**: $13$ m $\\to 13 \\div 2 = 6.5$ cm.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A scale compares a length on a drawing with the real length, such as one centimetre represents two metres.', show: 'sum.0' },
        { say: 'To go from the drawing to real life, multiply.', show: 'sum.1' },
        { say: 'To go from real life to the drawing, divide. In the next part, you will use scales written as ratios, like one to fifty. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
