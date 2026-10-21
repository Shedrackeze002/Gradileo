import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hops } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { counters, ids, note, xAt } from './lib/m6-1-figures.ts';

// 3 + 4: three positive counters and four more make seven.
const positives = figure(
  'ps',
  [
    counters({
      sets: [
        { id: 'a', sign: '+', count: 3 },
        { id: 'b', sign: '+', count: 4, col: 3.6 },
      ],
      labels: [
        { id: 'a-lab', col: 1, row: 0.45, tex: '3', tone: 'theta' },
        { id: 'b-lab', col: 5.1, row: 0.45, tex: '4', tone: 'theta' },
      ],
    }),
  ],
  240,
);

// −3 + (−4): three negative counters and four more, counted one by one: seven negative counters.
const negatives = figure(
  'ng',
  [
    counters({
      sets: [
        { id: 'a', sign: '-', count: 3 },
        { id: 'b', sign: '-', count: 4, col: 3.6 },
      ],
      labels: [
        { id: 'a-lab', col: 1, row: -0.45, tex: '-3', place: 'above', tone: 'bad' },
        { id: 'b-lab', col: 5.1, row: -0.45, tex: '-4', place: 'above', tone: 'bad' },
        ...[0, 1, 2, 3.6, 4.6, 5.6, 6.6].map((col, k) => ({ id: `n${k}`, col, row: 0.45, tex: String(k + 1), tone: 'muted' as const })),
      ],
    }),
  ],
  280,
);

// On a number line: start at 0, go 3 left to −3, then 4 more left to −7.
const line = figure(
  'ln',
  [
    numberLine({
      min: -9,
      max: 2,
      step: 1,
      points: [
        { id: 'zero', value: 0, tex: '', tone: 'ink' },
        { id: 'end', value: -7, tex: '', tone: 'bad' },
      ],
    }),
    hops({ name: 'first', min: -9, max: 2, from: -3, step: 1, count: 3, tone: 'opp' }),
    hops({ name: 'second', min: -9, max: 2, from: -7, step: 1, count: 4, tone: 'adj' }),
    note({ id: 'first-lab', at: [xAt(-1.5, -9, 2), 1.55], tex: '-3', tone: 'opp' }),
    note({ id: 'second-lab', at: [xAt(-5, -9, 2), 1.55], tex: '-4', tone: 'adj' }),
  ],
  260,
);

const video: Explainer = {
  id: 'm6-1-3-b',
  lessonId: 'm6-1-3',
  title: 'Sums of Positive and Negative Numbers, Part 2: Two Positives or Two Negatives',
  thumbnailTitle: 'Adding Two Negatives',
  thumbnail: 'ng',
  summary: 'Two positive numbers add to a positive number (3 + 4 = 7), and two negative numbers add to a negative number: −3 + (−4) has no zero pairs, so count the counters to get −7, like owing $3 and then $4 more. The sum of two negatives is never positive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 2', title: 'Two Positives or Two Negatives', subtitle: 'Adding numbers with the same sign' }],
      lines: [
        { say: 'Adding two positive numbers is nothing new. Three plus four is seven. But what happens when you add two negative numbers?', show: 'title' },
        { say: 'In this video, you will add two numbers with the same sign, using counters and a number line.' },
      ],
    },
    {
      chapter: 'Two positives',
      layout: 'center',
      main: [positives, { kind: 'math', id: 'm', size: 'lg', lines: ['3 + 4 = 7'] }],
      lines: [
        { say: 'Start with two positive numbers. Three is three positive counters.', show: [...ids('ps', 'a', 3), 'ps.a-lab'] },
        { say: 'Four is four more positive counters.', show: [...ids('ps', 'b', 4), 'ps.b-lab'] },
        { say: 'Put them together, and there are seven positive counters. Three plus four is seven. Two positive numbers add to a positive number.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two negatives',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Find $-3 + (-4)$.' }, negatives, { kind: 'math', id: 'm', size: 'lg', lines: ['-3 + (-4) = -7'] }],
      lines: [
        { say: 'Now find negative three plus negative four.', show: 'q' },
        { say: 'Negative three is three negative counters.', show: [...ids('ng', 'a', 3), 'ng.a-lab'] },
        { say: 'Negative four is four more negative counters.', show: [...ids('ng', 'b', 4), 'ng.b-lab'] },
        { say: 'Are there any zero pairs? No. Every counter is negative, so nothing cancels out.' },
        { say: 'So just count the negative counters. One, two, three, four, five, six, seven. There are seven negative counters.', show: ['ng.n0', 'ng.n1', 'ng.n2', 'ng.n3', 'ng.n4', 'ng.n5', 'ng.n6'] },
        { say: 'So negative three plus negative four equals negative seven.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [line, { kind: 'callout', id: 'tip', tone: 'tip', title: 'Owing more', md: 'If you owe \\$3 and then owe \\$4 more, you owe \\$7. That is $-7$.' }],
      lines: [
        { say: 'You can picture the same sum on a number line. Start at zero.', show: ['ln.axis', 'ln.zero'], focus: 'ln.zero' },
        { say: 'Adding negative three moves three steps to the left, to negative three.', show: ['ln.first-hops', 'ln.first-lab'], focus: 'ln.first-hops' },
        { say: 'Adding negative four moves four more steps to the left. You end at negative seven.', show: ['ln.second-hops', 'ln.second-lab', 'ln.end'], focus: ['ln.second-hops', 'ln.end'] },
        { say: 'It works like money. If you owe three dollars, and then you owe four dollars more, you owe seven dollars. That is negative seven.', show: 'tip' },
      ],
    },
    {
      chapter: 'Same signs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two numbers with the same sign', md: 'Two positives add to a **positive** number. Two negatives add to a **negative** number. There are no zero pairs, so count all the counters and keep the sign.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-5 + (-2) = -7', '-10 + (-6) = -16'] },
      ],
      lines: [
        { say: 'Here is the pattern. Two positive numbers add to a positive number. Two negative numbers add to a negative number.', show: 'key' },
        { say: 'When the signs are the same, there are no zero pairs. So count all the counters, and keep the sign.' },
        { say: 'Negative five plus negative two is seven negative counters: negative seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative ten plus negative six is sixteen negative counters: negative sixteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sum of two negatives is not positive', md: '$-3 + (-4)$ is not $7$. If you owe \\$3 and then owe \\$4 more, you owe \\$7. That is $-7$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{-3 + (-4) = 7} \\quad \\bad{\\times}', '\\good{-3 + (-4) = -7} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people see two negative signs and think the answer must be positive. Negative three plus negative four is not seven.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Think of the money again. Owing three dollars and then owing four more can never leave you with seven dollars to spend! You owe seven dollars.' },
        { say: 'Two negatives add to a negative. Negative three plus negative four is negative seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-6 + (-9)$.',
          choices: ['$-15$', '$15$', '$-3$', '$3$'],
          answer: 0,
          working: 'Six negative counters and nine more negative counters make $15$ negative counters, with no zero pairs. So $-6 + (-9) = -15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative six plus negative nine. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative fifteen. Six negative counters and nine more negative counters make fifteen negative counters, with no zero pairs. Choice B forgets that two negatives add to a negative.', show: 'q.answer' },
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
          items: ['Two positives add to a positive: $3 + 4 = 7$.', 'Two negatives add to a negative: $-3 + (-4) = -7$.', 'With the same signs there are no zero pairs: count the counters and keep the sign.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two positive numbers add to a positive number. Three plus four is seven.', show: 'sum.0' },
        { say: 'Two negative numbers add to a negative number. Negative three plus negative four is negative seven.', show: 'sum.1' },
        { say: 'When the signs are the same, there are no zero pairs, so count the counters and keep the sign. In the next part, we add a positive number and a negative number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
