import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { note } from './lib/m6-1-figures.ts';

// Numbers grow to the right: −5 is left of 2, so −5 < 2.
const direction = figure(
  'dr',
  [
    numberLine({
      min: -6,
      max: 6,
      step: 1,
      points: [
        { id: 'm5', value: -5, tex: '-5', tone: 'adj' },
        { id: 'p2', value: 2, tex: '2', tone: 'opp' },
      ],
    }),
    note({ id: 'less', at: [0.6, -1.25], tex: '\\leftarrow \\text{ less}', tone: 'adj' }),
    note({ id: 'more', at: [11.2, -1.25], tex: '\\text{greater } \\rightarrow', tone: 'opp' }),
  ],
  300,
);

// −13 and −6 on a number line from −15 to 5.
const temps = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: -15,
        max: 5,
        step: 1,
        every: 5,
        points: [
          { id: 'm13', value: -13, tex: '-13', tone: 'adj' },
          { id: 'm6', value: -6, tex: '-6', tone: 'opp' },
          { id: 'zero', value: 0, tex: '0', tone: 'ink' },
        ],
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm6-1-2-b',
  lessonId: 'm6-1-2',
  title: 'Comparing and Ordering Positive and Negative Numbers, Part 2: Comparing Two Numbers',
  thumbnailTitle: 'Comparing Two Numbers',
  thumbnail: 'tp',
  summary: 'On a horizontal number line, numbers get greater to the right. The symbols < (is less than), > (is greater than) and = (is equal to), comparing −13 and −6 (−13 < −6, so −13 °C is colder), why −13 is not greater than −6, and the open side of the symbol facing the greater number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 2', title: 'Comparing Two Numbers', subtitle: 'Less than, greater than, equal to' }],
      lines: [
        { say: 'Which is colder, negative thirteen degrees or negative six degrees? Which is worse, owing thirteen dollars or owing six dollars?', show: 'title' },
        { say: 'In this video, you will compare two numbers using a number line, and write the answer with the symbols for less than and greater than.' },
      ],
    },
    {
      chapter: 'Greater to the right',
      layout: 'center',
      main: [direction, { kind: 'callout', id: 'key', tone: 'key', title: 'Left is less', md: 'On a horizontal number line, numbers get **greater** as you move to the **right**. The number farther to the **left** is **less**.' }],
      lines: [
        { say: 'On a horizontal number line, numbers get greater as you move to the right. So the number farther to the left is always less.', show: ['dr.axis', 'dr.less', 'dr.more', 'key'] },
        { say: 'Let’s compare negative five and two. Find them on the line.', show: ['dr.m5', 'dr.p2'] },
        { say: 'Negative five is to the left of two. So negative five is less than two. And two is greater than negative five.', focus: ['dr.m5', 'dr.p2'] },
        { say: 'This makes sense with money. If you owe five dollars, you have less than someone who has two dollars.' },
      ],
    },
    {
      chapter: 'Symbols',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Symbol', 'Meaning', 'Example'],
          rows: [
            ['$<$', 'is less than', '$-5 < 2$'],
            ['$>$', 'is greater than', '$2 > -5$'],
            ['$=$', 'is equal to', '$+6 = 6$'],
          ],
        },
      ],
      lines: [
        { say: 'Mathematicians use three symbols to compare numbers.', show: 't' },
        { say: 'This symbol means is less than. We write: negative five is less than two.', focus: 't.0' },
        { say: 'This symbol means is greater than. We write: two is greater than negative five. It is the same fact, read from the other side.', focus: 't.1' },
        { say: 'And the equal sign means is equal to. Plus six is equal to six, because they are the same number.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Comparing two temperatures',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which symbol makes this true? $\\quad -13 \\ \\square\\ {-6}$' },
        temps('tp'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-13 < -6'] },
      ],
      lines: [
        { say: 'Which symbol makes this true: negative thirteen, something, negative six?', show: 'q' },
        { say: 'Put both numbers on a number line. Negative thirteen is here, and negative six is here.', show: ['tp.axis', 'tp.zero', 'tp.m13', 'tp.m6'] },
        { say: 'Negative thirteen is to the left of negative six. So negative thirteen is less than negative six.', focus: ['tp.m13', 'tp.m6'] },
        { say: 'We write: negative thirteen is less than negative six. So a temperature of negative thirteen degrees is the colder one.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Thinking −13 is greater than −6', md: '$13$ is greater than $6$, but $-13$ is **less** than $-6$. For negative numbers, the farther a number is from $0$, the less it is.' },
        temps('tp2'),
        { kind: 'math', id: 'm', size: 'md', lines: ['13 > 6 \\qquad \\text{but} \\qquad {-13} < -6'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Thirteen is greater than six, so it is tempting to think negative thirteen is greater than negative six.', show: 'oops' },
        { say: 'But it is not. Negative thirteen is farther to the left, so it is less.', show: ['tp2.axis', 'tp2.zero', 'tp2.m13', 'tp2.m6', 'm.0'], focus: ['tp2.m13', 'm.0'] },
        { say: 'For negative numbers, the farther a number is from zero, the less it is. Think of money: owing thirteen dollars is worse than owing six dollars.' },
      ],
    },
    {
      chapter: 'The open side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The open side eats the bigger number', md: 'The open side of $<$ or $>$ always faces the **greater** number. The point faces the smaller number.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{-13} \\;\\thc{<}\\; \\opp{-6}', '\\opp{2} \\;\\thc{>}\\; \\adj{-5}'] },
      ],
      lines: [
        { say: 'Here is a tip to help you choose the right symbol. Think of it as a hungry mouth. The open side always faces the greater number, as if it wants to eat the bigger one.', show: 'tip' },
        { say: 'Negative six is greater than negative thirteen, so the open side faces negative six. The point faces negative thirteen, the smaller number.', show: 'm.0', focus: 'm.0' },
        { say: 'Two is greater than negative five, so the open side faces the two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which statement is **true**?',
          choices: ['$-9 > -2$', '$-4 > 1$', '$0 < -3$', '$-7 < -1$'],
          answer: 3,
          working: '$-7$ is to the left of $-1$ on the number line, so $-7 < -1$. In each of the others, the open side faces the smaller number.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Negative seven is to the left of negative one, so negative seven is less than negative one. Choice A says negative nine is greater than negative two, but negative nine is farther left, so it is less.', show: 'q.answer' },
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
            'On a horizontal number line, numbers increase to the right.',
            '$<$ means “is less than”, $>$ means “is greater than”, $=$ means “is equal to”.',
            'For negative numbers, farther from $0$ means less: $-13 < -6$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a horizontal number line, numbers increase as you move to the right.', show: 'sum.0' },
        { say: 'The symbols mean is less than, is greater than, and is equal to. The open side faces the greater number.', show: 'sum.1' },
        { say: 'For negative numbers, farther from zero means less: negative thirteen is less than negative six. In the next part, we compare numbers on a vertical number line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
