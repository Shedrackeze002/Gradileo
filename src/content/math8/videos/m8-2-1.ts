import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cellGrid } from './lib/m8-2-figures.ts';

// One full hundred grid: 100 out of 100 squares, one whole.
const whole = figure('w', [cellGrid({ blocks: [{ id: 'all', c0: 0, r0: 0, c1: 10, r1: 10 }], label: '100\\%' })], 440);

// 150%: one full grid and half of another.
const oneAndHalf = figure('g', [
  cellGrid({ name: 'g1', blocks: [{ id: 'all', c0: 0, r0: 0, c1: 10, r1: 10 }], label: '100\\%' }),
  cellGrid({ name: 'g2', at: [11.5, 0], blocks: [{ id: 'half', c0: 0, r0: 0, c1: 5, r1: 10, tone: 'opp' }], label: '50\\%', labelTone: 'opp' }),
], 380);

const video: Explainer = {
  id: 'm8-2-1',
  lessonId: 'm8-2-1',
  title: 'Percents Greater Than 100% and Less Than 1%, Part 1: More Than One Whole',
  thumbnailTitle: 'More Than 100%',
  thumbnail: 'g',
  summary:
    'Percent means “out of 100”, and a full hundred grid is 100%, one whole. A percent greater than 100% is more than one whole: 150% is one full grid and half of another, so 150% = 150/100 = 1.5 = 1½, one and a half times the whole. 200% is two wholes and 250% is two and a half.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 1', title: 'More Than One Whole', subtitle: 'Percents greater than 100%' }],
      lines: [
        { say: 'A sports team sells one hundred fifty percent as many tickets as it did last season. Is that even possible? Can a percent be more than one hundred?', show: 'title' },
        { say: 'Yes, it can! In this lesson, you will make sense of percents that are bigger than the whole, and percents smaller than one hundredth of it. This first part is about percents greater than one hundred percent.' },
      ],
    },
    {
      chapter: 'One hundred percent is one whole',
      layout: 'split',
      leftWidth: 520,
      left: [whole],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent', md: '**Percent** means “out of $100$”. A full hundred grid is $100\\%$: one whole.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['100\\% = \\dfrac{100}{100} = 1'] },
      ],
      lines: [
        { say: 'Percent means out of one hundred. A hundred grid is one whole, cut into one hundred small squares.', show: ['w.lines', 'w.frame', 'def'] },
        { say: 'When all one hundred squares are shaded, that is one hundred out of one hundred. That is one hundred percent.', show: ['w.all', 'w.label'] },
        { say: 'So one hundred percent is one whole. As a fraction, it is one hundred over one hundred, which is one.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'One hundred fifty percent',
      layout: 'center',
      main: [oneAndHalf, { kind: 'math', id: 'm', size: 'lg', lines: ['100\\% + 50\\% = 150\\%'] }],
      lines: [
        { say: 'So what is one hundred fifty percent? It is more than one whole, so one grid is not enough. We need a second grid.', show: ['g.g1-lines', 'g.g1-frame', 'g.g2-lines', 'g.g2-frame'] },
        { say: 'Shade the whole first grid. That is one hundred percent.', show: ['g.g1-all', 'g.g1-label'], focus: 'g.g1-all' },
        { say: 'Then shade half of the second grid: fifty more squares. That is fifty percent more.', show: ['g.g2-half', 'g.g2-label'], focus: 'g.g2-half' },
        { say: 'Together, one hundred percent plus fifty percent is one hundred fifty percent. That is one and a half grids.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'As a fraction and a decimal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['150\\% = \\dfrac{150}{100}', '\\dfrac{150}{100} = 1.5 = 1\\tfrac{1}{2}'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$150\\%$ is **one and a half times** the whole.' },
      ],
      lines: [
        { say: 'Now write one hundred fifty percent as a fraction. Percent means out of one hundred, so it is one hundred fifty over one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'One hundred fifty hundredths is one point five as a decimal. That is one and one half.', show: 'm.1', focus: 'm.1' },
        { say: 'So one hundred fifty percent means one and a half times the whole. The team sold one and a half times as many tickets as last season.', show: 'a' },
      ],
    },
    {
      chapter: 'More than one whole',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Percent', 'Hundred grids', 'Decimal'],
          rows: [
            ['$100\\%$', '$1$ whole grid', '$1$'],
            ['$150\\%$', '$1\\tfrac{1}{2}$ grids', '$1.5$'],
            ['$200\\%$', '$2$ whole grids', '$2$'],
            ['$250\\%$', '$2\\tfrac{1}{2}$ grids', '$2.5$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'More than 100%', md: 'A percent greater than $100\\%$ is **more than one whole**.' },
      ],
      lines: [
        { say: 'One hundred percent is one whole grid, and one hundred fifty percent is one and a half grids.', show: ['tb.0', 'tb.1'] },
        { say: 'Two hundred percent is two whole grids. That is two times the whole. If a plant is two hundred percent of its height last month, it has doubled!', show: 'tb.2' },
        { say: 'Two hundred fifty percent is two and a half grids, or two point five.', show: 'tb.3' },
        { say: 'So a percent greater than one hundred percent is always more than one whole.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which decimal is equal to $175\\%$?',
          choices: ['$0.175$', '$17.5$', '$175$', '$1.75$'],
          answer: 3,
          working: '$175\\% = \\dfrac{175}{100} = 1.75$: one whole grid and $75$ squares of another. It is more than one whole, so the decimal is more than $1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which decimal is equal to one hundred seventy-five percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one point seven five. One hundred seventy-five percent is one hundred seventy-five hundredths: one whole grid and seventy-five squares of another. Choice A, zero point one seven five, is less than one, but one hundred seventy-five percent is more than one whole.', show: 'q.answer' },
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
            'A full hundred grid is $100\\%$: one whole.',
            'A percent greater than $100\\%$ is more than one whole.',
            '$150\\% = \\dfrac{150}{100} = 1.5 = 1\\tfrac{1}{2}$: one and a half times the whole.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A full hundred grid is one hundred percent, which is one whole.', show: 'sum.0' },
        { say: 'A percent greater than one hundred percent is more than one whole.', show: 'sum.1' },
        { say: 'One hundred fifty percent is one hundred fifty over one hundred, or one point five: one and a half times the whole. In the next part, you will look at percents less than one percent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
