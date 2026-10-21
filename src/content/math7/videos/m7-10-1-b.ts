import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { chips } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { join, note, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

const GAP = 1.5;
const R = 0.6;

// A row of number cards, and under it the same numbers in order, with red strikes that cross off
// the cards from both ends in pairs (`x<k>`, `y<k>`) and a note under the middle card (or cards).
const ordered = (o: { raw: number[]; sorted: number[]; strikes: number; middle: string; middleAt: number }): Part => {
  const parts: Part[] = [
    chips({ name: 'u', values: o.raw, gap: GAP, r: R, tone: 'muted' }),
    note('u-title', [-1, 0], '\\text{as written}', 'left', 'muted'),
    chips({ name: 's', values: o.sorted, at: [0, -2], gap: GAP, r: R, tone: 'adj' }),
    note('s-title', [-1, -2], '\\text{in order}', 'left', 'adj'),
    note('mid', [o.middleAt * GAP, -2.9], o.middle, 'below', 'theta'),
  ];
  const last = o.sorted.length - 1;
  for (let k = 0; k < o.strikes; k++) {
    for (const [id, i] of [
      [`x${k}`, k],
      [`y${k}`, last - k],
    ] as const) {
      parts.push(seg(id, [i * GAP - 0.55, -2.55], [i * GAP + 0.55, -1.45], { tone: 'bad', weight: 4 }));
    }
  }
  return join(...parts);
};

// Push-ups: 24, 31, 18, 27, 35, 22, 29; in order 18, 22, 24, 27, 29, 31, 35; the 4th value, 27.
const PUSH = [24, 31, 18, 27, 35, 22, 29];
const PUSH_SORTED = [...PUSH].sort((a, b) => a - b);
const odd = (id: string) => figure(id, [ordered({ raw: PUSH, sorted: PUSH_SORTED, strikes: 3, middle: '\\text{middle: } 27', middleAt: 3 })], 330);

// Books: 3, 8, 5, 12, 6, 9; in order 3, 5, 6, 8, 9, 12; halfway between 6 and 8 is 7.
const BOOKS = [3, 8, 5, 12, 6, 9];
const BOOKS_SORTED = [...BOOKS].sort((a, b) => a - b);
const even = (id: string) => figure(id, [ordered({ raw: BOOKS, sorted: BOOKS_SORTED, strikes: 2, middle: '\\text{middle: } 6 \\text{ and } 8', middleAt: 2.5 })], 330);

// The books as written, with the two middle cards of the unsorted list marked in red.
const unsorted = (id: string) =>
  figure(id, [chips({ values: BOOKS, gap: GAP, r: R, tones: ['muted', 'muted', 'bad', 'bad', 'muted', 'muted'] }), note('mid', [2.5 * GAP, -0.9], '\\text{not the middle value}', 'below', 'bad')], 200);

const video: Explainer = {
  id: 'm7-10-1-b',
  lessonId: 'm7-10-1',
  title: 'Mean, Median, Mode and Range, Part 2: The Median',
  thumbnailTitle: 'The Median',
  thumbnail: 'od',
  summary:
    'The median is the middle value when the data are in order from least to greatest. For 24, 31, 18, 27, 35, 22 and 29 push-ups, the order is 18, 22, 24, 27, 29, 31, 35, and the 4th of the 7 values, 27, is the median. With an even number of values there are two middle values, and the median is halfway between them: for 3, 5, 6, 8, 9 and 12 books it is (6 + 8) ÷ 2 = 7. Always put the data in order first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 2', title: 'The Median', subtitle: 'The middle value' }],
      lines: [
        { say: 'Line up seven friends from shortest to tallest. Who is in the middle? That person has a typical height for the group.', show: 'title' },
        { say: 'In this video, you will find the middle value of a data set. It is called the median.' },
      ],
    },
    {
      chapter: 'The median',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Median', md: 'The **median** is the **middle value** when the data are **in order** from least to greatest.' }],
      lines: [
        { say: 'The median is the middle value of a data set, when the values are in order from least to greatest.', show: 'def' },
        { say: 'Like the mean, the median is a measure of central tendency. It describes a typical value, with half of the data below it and half above it.' },
      ],
    },
    {
      chapter: 'An odd number of values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Seven students did these numbers of push-ups. Find the median.' },
        odd('od'),
      ],
      lines: [
        { say: 'Seven students did twenty-four, thirty-one, eighteen, twenty-seven, thirty-five, twenty-two and twenty-nine push-ups. Find the median.', show: ['q', 'od.u-c0', 'od.u-c1', 'od.u-c2', 'od.u-c3', 'od.u-c4', 'od.u-c5', 'od.u-c6', 'od.u-title'] },
        { say: 'First, put the values in order from least to greatest: eighteen, twenty-two, twenty-four, twenty-seven, twenty-nine, thirty-one and thirty-five.', show: ['od.s-c0', 'od.s-c1', 'od.s-c2', 'od.s-c3', 'od.s-c4', 'od.s-c5', 'od.s-c6', 'od.s-title'] },
        { say: 'Now find the middle. Cross off one value from each end, again and again, until one is left.', show: ['od.x0', 'od.y0'] },
        { say: 'Cross off two more, and then two more.', show: ['od.x1', 'od.y1', 'od.x2', 'od.y2'] },
        { say: 'The value left in the middle is twenty-seven. With seven values, it is the fourth one, with three values on each side. The median is twenty-seven push-ups.', show: 'od.mid', focus: ['od.s-c3', 'od.mid'] },
      ],
    },
    {
      chapter: 'An even number of values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Six students read these numbers of books over the summer. Find the median.' },
        even('ev'),
        { kind: 'math', id: 'm', size: 'md', lines: ['(6 + 8) \\div 2 = 7'] },
      ],
      lines: [
        { say: 'Six students read three, eight, five, twelve, six and nine books over the summer. Find the median.', show: ['q', 'ev.u-c0', 'ev.u-c1', 'ev.u-c2', 'ev.u-c3', 'ev.u-c4', 'ev.u-c5', 'ev.u-title'] },
        { say: 'In order, the values are three, five, six, eight, nine and twelve.', show: ['ev.s-c0', 'ev.s-c1', 'ev.s-c2', 'ev.s-c3', 'ev.s-c4', 'ev.s-c5', 'ev.s-title'] },
        { say: 'Cross off values from each end. This time, two values are left in the middle: six and eight. That happens whenever the number of values is even.', show: ['ev.x0', 'ev.y0', 'ev.x1', 'ev.y1', 'ev.mid'], focus: ['ev.s-c2', 'ev.s-c3'] },
        { say: 'The median is halfway between the two middle values. Add them and divide by two: six plus eight is fourteen, and fourteen divided by two is seven. The median is seven books.', show: 'm', focus: 'm' },
        { say: 'Notice that seven is not one of the values. That is fine. The median is the point halfway along the ordered list.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to sort', md: 'The median is the middle of the **ordered** list, not the middle of the list as it was written.' },
        unsorted('un'),
      ],
      lines: [
        { say: 'Watch out. The median is the middle of the ordered list, not the middle of the list as it was written.', show: 'oops' },
        { say: 'Look at the book data as it was written. Its two middle numbers are five and twelve. Halfway between them is eight point five.', show: 'un', focus: ['un.c2', 'un.c3'] },
        { say: 'But the real median is seven. Forgetting to sort gives the wrong answer, so always put the values in order first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the median: $9,\\ 4,\\ 15,\\ 7,\\ 12$',
          choices: ['$15$', '$11$', '$9.4$', '$9$'],
          answer: 3,
          working: 'In order: $4,\\ 7,\\ 9,\\ 12,\\ 15$. The middle (3rd) value is $9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the median of nine, four, fifteen, seven and twelve. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: nine. In order, the values are four, seven, nine, twelve and fifteen, and the middle one is nine. Choice A is the middle of the list before it was put in order.', show: 'q.answer' },
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
          items: ['The median is the middle value of the data in order.', 'With an even number of values, the median is halfway between the two middle values.', 'Always put the values in order first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The median is the middle value, when the data are in order.', show: 'sum.0' },
        { say: 'With an even number of values, the median is halfway between the two middle values.', show: 'sum.1' },
        { say: 'And always put the values in order first. In the next part, you will meet the mode and the range. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
