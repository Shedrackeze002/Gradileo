import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from './lib/m5-1-figures.ts';

const PLACES = ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'];

// The four jumps with three decimal places each; the zeros added at the right end are yellow.
const jumps = (id: string) =>
  figure(id, [
    placeChart({
      places: PLACES,
      headSize: '\\footnotesize',
      digitSize: '\\Large',
      rows: [
        ['3', '.', '4', '0', '0'],
        ['3', '.', '3', '8', '0'],
        ['3', '.', '4', '0', '5'],
        ['3', '.', '0', '4', '0'],
      ],
      tones: { 'r0-3': 'theta', 'r0-4': 'theta', 'r1-4': 'theta', 'r3-4': 'theta' },
    }),
  ]);

const video: Explainer = {
  id: 'm5-1-2-c',
  lessonId: 'm5-1-2',
  title: 'Comparing, Ordering and Rounding, Part 3: Ordering Numbers',
  thumbnailTitle: 'Ordering Numbers',
  thumbnail: 'ch',
  summary: 'Ordering decimals from least to greatest: give every number the same number of decimal places, then compare place by place from the left. Four long jumps, 3.4 m, 3.38 m, 3.405 m and 3.04 m, in order.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 3', title: 'Ordering Numbers', subtitle: 'From least to greatest' }],
      lines: [
        { say: 'Four friends did the long jump. Who jumped the farthest, and who came last? To find out, we put their distances in order.', show: 'title' },
        { say: 'In this video, you will order decimals from least to greatest.' },
      ],
    },
    {
      chapter: 'How to order',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Give every number the **same number of decimal places**, by adding zeros at the right end.', 'Compare them place by place, from the **left**.', '**Least to greatest** means smallest first and largest last.'],
        },
      ],
      lines: [
        { say: 'To put numbers in order, first give them all the same number of decimal places. Add zeros at the right end. Remember, those zeros do not change the values.', show: 'b.0' },
        { say: 'Then compare them place by place, from the left, just as you compare two numbers.', show: 'b.1' },
        { say: 'Least to greatest means the smallest number first, and the largest number last. Greatest to least is the other way round.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The long jumps',
      layout: 'split',
      leftWidth: 620,
      left: [jumps('ch')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Long jumps: $3.4$ m, $3.38$ m, $3.405$ m and $3.04$ m. Order them from least to greatest.' },
        { kind: 'text', id: 't', size: 'md', md: 'Every number now has **three** decimal places.' },
      ],
      lines: [
        { say: 'The four long jumps measured 3.4 metres, 3.38 metres, 3.405 metres and 3.04 metres. Order them from least to greatest.', show: 'q' },
        { say: 'The longest number, 3.405, has three decimal places. So give each number three decimal places.', show: ['ch.frame', 'ch.head', 'ch.row0', 'ch.row1', 'ch.row2', 'ch.row3'] },
        { say: '3.4 becomes 3.400, 3.38 becomes 3.380, and 3.04 becomes 3.040. The new zeros are in yellow. They fill the empty places, without changing any values.', show: 't', focus: ['ch.r0-3', 'ch.r0-4', 'ch.r1-4', 'ch.r3-4'] },
      ],
    },
    {
      chapter: 'Compare from the left',
      layout: 'split',
      leftWidth: 620,
      left: [jumps('c2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{least: } 3.04', '\\text{next: } 3.38', '3.400 < 3.405', '3.04,\\; 3.38,\\; 3.4,\\; 3.405'] }],
      lines: [
        { say: 'Now compare from the left. The ones are all three, so the ones cannot decide. Look at the tenths.', show: ['c2.frame', 'c2.head', 'c2.row0', 'c2.row1', 'c2.row2', 'c2.row3', 'c2.col2'], focus: 'c2.col2' },
        { say: '3.040 has zero tenths. That is the fewest, so 3.04 is the least.', show: 'm.0', focus: ['m.0', 'c2.row3'] },
        { say: '3.380 has three tenths, so it comes next.', show: 'm.1', focus: ['m.1', 'c2.row1'] },
        { say: '3.400 and 3.405 both have four tenths, and both have zero hundredths. So compare the thousandths: zero is less than five. So 3.4 comes before 3.405.', show: ['c2.col4', 'm.2'], focus: ['m.2', 'c2.col4'] },
        { say: 'The order is 3.04, 3.38, 3.4, 3.405. The farthest jump was 3.405 metres, and the shortest was 3.04 metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A zero in the middle', md: '$3.04$ and $3.4$ look alike, but they are not equal. The zero in $3.04$ is in the tenths place, so $3.04$ has **zero** tenths: it is the least.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3.04 = 3.040 \\qquad 3.4 = 3.400', '3.040 < 3.400'] },
      ],
      lines: [
        { say: 'Watch out for numbers that look alike. 3.04 and 3.4 have the same digits, but they are not equal.', show: 'oops' },
        { say: 'The zero in 3.04 is in the middle, in the tenths place. With three decimal places, the numbers are 3.040 and 3.400. Now it is easy to see which is less.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Order $0.5$, $0.55$ and $0.505$ from **greatest to least**.',
          choices: ['$0.5,\\ 0.505,\\ 0.55$', '$0.55,\\ 0.505,\\ 0.5$', '$0.505,\\ 0.55,\\ 0.5$', '$0.55,\\ 0.5,\\ 0.505$'],
          answer: 1,
          working: 'With three decimal places: $0.500$, $0.550$ and $0.505$. The tenths are all $5$. In the hundredths, $5 > 0$, so $0.55$ is the greatest. Then $0.505 > 0.500$.',
        },
      ],
      lines: [
        { say: 'Your turn. Order 0.5, 0.55 and 0.505 from greatest to least. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. With three decimal places, the numbers are 0.500, 0.550 and 0.505. The tenths are all five. In the hundredths, 0.550 has five, so it is the greatest. Then 0.505 is greater than 0.500. Choice C puts the longest number first, but more digits does not mean bigger.', show: 'q.answer' },
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
          items: ['Give every number the same number of decimal places.', 'Compare place by place from the left.', 'Least to greatest: smallest first. Greatest to least: largest first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To order decimals, first give every number the same number of decimal places.', show: 'sum.0' },
        { say: 'Then compare them place by place, from the left.', show: 'sum.1' },
        { say: 'Least to greatest puts the smallest first, and greatest to least puts the largest first. In the next part, we round numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
