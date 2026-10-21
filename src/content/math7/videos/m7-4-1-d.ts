import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';

const rings = (fig: string, k: number) => Array.from({ length: k }, (_, c) => `${fig}.z${c}`);

// (−9) + (−14): nine negatives and fourteen more, 23 in all.
const same = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'a', sign: '-', count: 9 },
          { id: 'b', sign: '-', count: 14, row: 1 },
        ],
        labels: [
          { id: 'a-lab', col: 9.6, row: 0, tex: '-9', place: 'right', tone: 'bad' },
          { id: 'b-lab', col: 14.6, row: 1, tex: '-14', place: 'right', tone: 'bad' },
        ],
      }),
    ],
    220,
  );

// (−18) + (+11): eleven zero pairs, seven negatives left.
const diff = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 11 },
          { id: 'n', sign: '-', count: 18, row: 1 },
        ],
        pairs: Array.from({ length: 11 }, (_, c) => ({ id: `z${c}`, col: c, zero: false })),
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm7-4-1-d',
  lessonId: 'm7-4-1',
  title: 'Adding Integers, Part 4: Adding with Symbols',
  thumbnailTitle: 'Adding with Symbols',
  thumbnail: 'df',
  summary:
    'For bigger integers, think about the zero pairs instead of drawing counters. Same signs: add the sizes and keep the sign, (−9) + (−14) = −23. Different signs: the zero pairs cancel, so subtract the sizes and use the sign of the integer with the bigger size, (−18) + (+11) = −7 and (+15) + (−6) = +9. The answer to (−18) + (+11) is not +29 or −29.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 4', title: 'Adding with Symbols', subtitle: 'Two rules for adding integers' }],
      lines: [
        { say: 'What is negative eighteen plus positive eleven? Drawing twenty-nine counters would take a long time.', show: 'title' },
        { say: 'In this part, you will learn two rules for adding integers. They come from thinking about the zero pairs, without drawing them.' },
      ],
    },
    {
      chapter: 'Size and sign',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The size of an integer', md: 'The **size** of an integer is its distance from $0$: the number without its sign. The size of $-9$ is $9$, and the size of $+9$ is $9$ as well.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-14 \\;\\to\\; \\text{sign } -, \\ \\text{size } 14'] },
      ],
      lines: [
        { say: 'First, a useful word. Every integer has a sign and a size. The size is how far the integer is from zero: the number without its sign.', show: 'def' },
        { say: 'Negative fourteen has a negative sign, and its size is fourteen. It is like fourteen negative counters.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Same signs',
      layout: 'center',
      main: [
        same('sm'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-9) + (-14) \\;\\to\\; 9 + 14 = 23 \\;\\to\\; -23'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same signs', md: '**Add the sizes** and **keep the sign**.' },
      ],
      lines: [
        { say: 'Find negative nine plus negative fourteen. Picture nine negative counters, and fourteen more negative counters.', show: [...ids('sm', 'a', 9), 'sm.a-lab', ...ids('sm', 'b', 14), 'sm.b-lab'] },
        { say: 'All the counters are negative, so there are no zero pairs. Just count them all. Nine plus fourteen is twenty-three, and they are all negative.', show: 'm.0', focus: 'm.0' },
        { say: 'So negative nine plus negative fourteen equals negative twenty-three. Here is the rule: when the signs are the same, add the sizes and keep the sign.', show: 'key' },
        { say: 'It works for positives as well. Positive six plus positive eight is positive fourteen.' },
      ],
    },
    {
      chapter: 'Different signs',
      layout: 'center',
      main: [
        diff('df'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-18) + (+11) \\;\\to\\; 18 - 11 = 7 \\;\\to\\; -7'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Different signs', md: '**Subtract the sizes**, and use the sign of the integer with the **bigger size**.' },
      ],
      lines: [
        { say: 'Now find negative eighteen plus positive eleven. Picture eighteen negative counters, and eleven positive counters.', show: [...ids('df', 'p', 11), ...ids('df', 'n', 18)] },
        { say: 'Each positive counter makes a zero pair with a negative counter. That is eleven zero pairs, and they cancel out.', show: rings('df', 11) },
        { say: 'How many negative counters are left? Eighteen minus eleven is seven. They are negative, so the answer is negative seven.', show: 'm.0', focus: ['m.0', 'df.n11', 'df.n12', 'df.n13', 'df.n14', 'df.n15', 'df.n16', 'df.n17'] },
        { say: 'Here is the rule: when the signs are different, subtract the sizes. Then use the sign of the integer with the bigger size. Eighteen is bigger than eleven, so the answer is negative.', show: 'key' },
      ],
    },
    {
      chapter: 'More positives',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(+15) + (-6)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Different signs: } 15 - 6 = 9', '15 > 6, \\text{ so the sign is } + \\qquad (+15) + (-6) = +9'] },
      ],
      lines: [
        { say: 'Try another. Find positive fifteen plus negative six.', show: 'q' },
        { say: 'The signs are different, so subtract the sizes. Fifteen minus six is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Which integer has the bigger size? Fifteen. It is positive, so the answer is positive nine. There were more positive counters than negative ones.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Ignoring the signs', md: '$(-18) + (+11)$ is **not** $+29$ or $-29$. The positive and negative parts cancel each other in zero pairs, so the answer is smaller than both sizes: $-7$.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people see eighteen and eleven, and add them to get twenty-nine, or negative twenty-nine.', show: 'oops' },
        { say: 'But a positive and a negative cancel each other out in zero pairs. So when the signs are different, the answer is smaller than both sizes. Negative eighteen plus positive eleven is negative seven.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(+13) + (-20)$.',
          choices: ['$+33$', '$+7$', '$-7$', '$-33$'],
          answer: 2,
          working: 'Different signs: subtract the sizes, $20 - 13 = 7$. The bigger size is $20$, which is negative, so the answer is $-7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find positive thirteen plus negative twenty. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative seven. The signs are different, so subtract the sizes: twenty minus thirteen is seven. Twenty is the bigger size, and it is negative, so the answer is negative. Choice D adds the sizes, but with different signs the zero pairs cancel.', show: 'q.answer' },
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
            'The **size** of an integer is its distance from $0$.',
            '**Same signs:** add the sizes and keep the sign. $(-9) + (-14) = -23$',
            '**Different signs:** subtract the sizes and use the sign of the bigger size. $(-18) + (+11) = -7$',
            'With different signs, the answer is smaller than both sizes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The size of an integer is its distance from zero.', show: 'sum.0' },
        { say: 'When the signs are the same, add the sizes and keep the sign.', show: 'sum.1' },
        { say: 'When the signs are different, subtract the sizes, and use the sign of the integer with the bigger size.', show: 'sum.2' },
        { say: 'With different signs, the zero pairs cancel, so the answer is smaller than both sizes. In the next part, you will add several integers at once. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
