import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cellGrid, zoomCell } from './lib/m8-2-figures.ts';

// One small square of a hundred grid is 1%.
const one = figure('g', [cellGrid({ blocks: [{ id: 'one', c0: 9, r0: 0, c1: 10, r1: 1, tone: 'opp' }], label: '1 \\text{ square} = 1\\%' })], 440);

// Half of one small square is 0.5%: the square drawn bigger, cut in two, with one part shaded.
const half = figure('g', [
  cellGrid({ blocks: [{ id: 'part', c0: 9, r0: 0, c1: 9.5, r1: 1, tone: 'opp', shade: 0.9 }] }),
  zoomCell({ cell: [9, -1, 10, 0], at: [12, -7], size: 6, pieces: 2, shaded: 1, label: '\\tfrac{1}{2} \\text{ of } 1\\% = 0.5\\%' }),
], 440);

// A quarter of one small square is 0.25%.
const quarter = figure('g', [
  cellGrid({ blocks: [{ id: 'part', c0: 9, r0: 0, c1: 9.25, r1: 1, tone: 'opp', shade: 0.9 }] }),
  zoomCell({ cell: [9, -1, 10, 0], at: [12, -7], size: 6, pieces: 4, shaded: 1, label: '\\tfrac{1}{4} \\text{ of } 1\\% = 0.25\\%' }),
], 440);

// 0.5 is half the grid (50%); 0.5% is half of one square.
const compare = figure('cg', [
  cellGrid({ name: 'a', blocks: [{ id: 'half', c0: 0, r0: 0, c1: 5, r1: 10 }], label: '0.5 = 50\\%' }),
  cellGrid({ name: 'b', at: [12, 0], blocks: [{ id: 'part', c0: 9, r0: 0, c1: 9.5, r1: 1, tone: 'opp', shade: 0.9 }], label: '0.5\\%', labelTone: 'opp' }),
], 330);

const video: Explainer = {
  id: 'm8-2-1-b',
  lessonId: 'm8-2-1',
  title: 'Percents Greater Than 100% and Less Than 1%, Part 2: Less Than One Percent',
  thumbnailTitle: 'Less Than 1%',
  thumbnail: 'cg',
  summary:
    'One small square of a hundred grid is 1%. A percent less than 1% is only part of one square: 0.5% is half of one square and 0.25% is a quarter of one. These can be written with fractions: ½% = 0.5% and ¼% = 0.25%. Do not mix up 0.5% with 0.5: 0.5 is one half, or 50%, but 0.5% is half of 1%, which is 5 out of every 1,000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 2', title: 'Less Than One Percent', subtitle: 'Part of one small square' }],
      lines: [
        { say: 'A savings account pays zero point five percent interest. That is less than one percent! How small is that?', show: 'title' },
        { say: 'In this part, you will see what a percent less than one percent looks like, and how to write it with a fraction.' },
      ],
    },
    {
      chapter: 'One percent is one square',
      layout: 'split',
      leftWidth: 520,
      left: [one],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['1\\% = \\dfrac{1}{100}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Less than 1%', md: 'A percent less than $1\\%$ is **only part of one square**.' },
      ],
      lines: [
        { say: 'Here is a hundred grid again. The whole grid is one hundred percent.', show: ['g.lines', 'g.frame'] },
        { say: 'Each small square is one out of one hundred. So one small square is one percent.', show: ['g.one', 'g.label', 'm'], focus: 'g.one' },
        { say: 'A percent less than one percent is smaller than one square. It is only part of one square.', show: 'key' },
      ],
    },
    {
      chapter: 'Half of one square',
      layout: 'split',
      leftWidth: 600,
      left: [half],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['0.5\\% = \\text{half of } 1\\%', '\\tfrac{1}{2}\\% = 0.5\\%'] }],
      lines: [
        { say: 'Zero point five percent is half of one percent. In the grid, it is half of one small square.', show: ['g.lines', 'g.frame', 'g.part', 'm.0'], focus: 'g.part' },
        { say: 'Let’s zoom in on that square. Cut it into two equal parts, and shade one of them. That is zero point five percent of the whole grid.', show: ['g.zoom', 'g.zoom-shade', 'g.zoom-label'] },
        { say: 'You can also write it with a fraction: one half percent. One half is zero point five, so one half percent is the same as zero point five percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A quarter of one square',
      layout: 'split',
      leftWidth: 600,
      left: [quarter],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\tfrac{1}{4}\\% = \\text{a quarter of } 1\\%', '\\tfrac{1}{4}\\% = 0.25\\%'] }],
      lines: [
        { say: 'One quarter percent is a quarter of one small square.', show: ['g.lines', 'g.frame', 'g.part', 'm.0'], focus: 'g.part' },
        { say: 'Cut the square into four equal parts, and shade one. That is one quarter percent of the whole grid.', show: ['g.zoom', 'g.zoom-shade', 'g.zoom-label'] },
        { say: 'One quarter is zero point two five, so one quarter percent is the same as zero point two five percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: '0.5% is not one half',
      layout: 'center',
      main: [
        compare,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '0.5% is not one half', md: '$0.5$ is one half, which is $50\\%$. But $0.5\\%$ is only half of $1\\%$. It is $5$ out of every $1{,}000$.' },
      ],
      lines: [
        { say: 'Be careful! Zero point five on its own is one half. That is fifty percent: half of the whole grid.', show: ['cg.a-lines', 'cg.a-frame', 'cg.a-half', 'cg.a-label'] },
        { say: 'But zero point five percent is only half of one percent: half of one small square. That is much, much smaller.', show: ['cg.b-lines', 'cg.b-frame', 'cg.b-part', 'cg.b-label'], focus: 'cg.b-part' },
        { say: 'Zero point five percent is five out of every one thousand.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the same as $\\tfrac{1}{2}\\%$?',
          choices: ['$0.5\\%$', '$50\\%$', '$2\\%$', '$0.2\\%$'],
          answer: 0,
          working: '$\\tfrac{1}{2} = 0.5$, so $\\tfrac{1}{2}\\% = 0.5\\%$: half of one small square of a hundred grid.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the same as one half percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, zero point five percent. One half is zero point five, so one half percent is zero point five percent: half of one small square. Choice B, fifty percent, is half of the whole grid, which is one hundred times as much.', show: 'q.answer' },
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
            '$1\\%$ is one small square of a hundred grid.',
            'A percent less than $1\\%$ is part of one square: $0.5\\%$ is half a square.',
            '$\\tfrac{1}{2}\\% = 0.5\\%$ and $\\tfrac{1}{4}\\% = 0.25\\%$.',
            '$0.5\\%$ is not one half: $0.5 = 50\\%$, but $0.5\\%$ is half of $1\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One percent is one small square of a hundred grid.', show: 'sum.0' },
        { say: 'A percent less than one percent is only part of one square.', show: 'sum.1' },
        { say: 'One half percent is zero point five percent, and one quarter percent is zero point two five percent.', show: 'sum.2' },
        { say: 'And zero point five percent is not one half. In the next part, you will write these percents as decimals. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
