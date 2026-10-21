import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';

const rings = (fig: string, cols: number[]) => cols.map((c) => `${fig}.z${c}`);

// (+2) − (+5): 2 positives, then 3 zero pairs (columns 2 to 4); take away the 5 positives.
const twoFive = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 5 },
          { id: 'n', sign: '-', count: 3, row: 1, col: 2 },
        ],
        pairs: [2, 3, 4].map((c) => ({ id: `z${c}`, col: c, zero: false })),
      }),
    ],
    250,
  );

// (+3) − (−2): 3 positives, then 2 zero pairs (columns 3 and 4); take away the 2 negatives.
const threeTwo = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 5 },
          { id: 'n', sign: '-', count: 2, row: 1, col: 3 },
        ],
        pairs: [3, 4].map((c) => ({ id: `z${c}`, col: c, zero: false })),
      }),
    ],
    250,
  );

// (−4) − (+3): 4 negatives, then 3 zero pairs (columns 4 to 6); take away the 3 positives.
const fourThree = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'n', sign: '-', count: 7, row: 1 },
          { id: 'p', sign: '+', count: 3, col: 4 },
        ],
        pairs: [4, 5, 6].map((c) => ({ id: `z${c}`, col: c, zero: false })),
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm7-4-2-b',
  lessonId: 'm7-4-2',
  title: 'Subtracting Integers, Part 2: Adding Zero Pairs',
  thumbnailTitle: 'Adding Zero Pairs',
  thumbnail: 'tf',
  summary:
    'When there are not enough counters to take away, add zero pairs first: a zero pair is worth 0, so the value does not change. (+2) − (+5): add 3 zero pairs, take away 5 positives, and 3 negatives are left, so −3. (+3) − (−2): add 2 zero pairs, take away 2 negatives, and 5 positives are left, so +5. (−4) − (+3): add 3 zero pairs, take away 3 positives, so −7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 2', title: 'Adding Zero Pairs', subtitle: 'When there are not enough counters' }],
      lines: [
        { say: 'How can you take away five counters when there are only two? It sounds impossible, but zero pairs make it work.', show: 'title' },
        { say: 'In this part, you will add zero pairs first, so there are enough counters to take away.' },
      ],
    },
    {
      chapter: 'Positive two minus positive five',
      layout: 'center',
      main: [twoFive('tf'), { kind: 'math', id: 'm', size: 'lg', lines: ['(+2) - (+5) = -3'] }],
      lines: [
        { say: 'Find positive two minus positive five. Start with two positive counters. You need to take away five positive counters, but there are only two.', show: ids('tf', 'p', 2) },
        { say: 'So add zero pairs. Each zero pair is one positive and one negative counter. It is worth zero, so adding it does not change the value.' },
        { say: 'Add three zero pairs. Now there are five positive counters and three negative counters, and the value is still positive two.', show: [...ids('tf', 'p', 3, 2), ...ids('tf', 'n', 3), ...rings('tf', [2, 3, 4])] },
        { say: 'Now there are enough. Take away the five positive counters.', hide: [...ids('tf', 'p', 5), ...rings('tf', [2, 3, 4])] },
        { say: 'Three negative counters are left. So positive two minus positive five equals negative three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Taking away negatives that are not there',
      layout: 'center',
      main: [threeTwo('tt'), { kind: 'math', id: 'm', size: 'lg', lines: ['(+3) - (-2) = +5'] }],
      lines: [
        { say: 'Now find positive three minus negative two. Start with three positive counters.', show: ids('tt', 'p', 3) },
        { say: 'You need to take away two negative counters. But there are no negative counters at all!' },
        { say: 'Add two zero pairs. The value is still positive three, and now there are two negative counters to take away.', show: [...ids('tt', 'p', 2, 3), ...ids('tt', 'n', 2), ...rings('tt', [3, 4])] },
        { say: 'Take away the two negative counters.', hide: [...ids('tt', 'n', 2), ...rings('tt', [3, 4])] },
        { say: 'Five positive counters are left. So positive three minus negative two equals positive five. Subtracting a negative made the answer bigger!', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Negative four minus positive three',
      layout: 'center',
      main: [fourThree('ft'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-4) - (+3) = -7'] }],
      lines: [
        { say: 'One more. Find negative four minus positive three. Start with four negative counters.', show: ids('ft', 'n', 4) },
        { say: 'There are no positive counters to take away, so add three zero pairs.', show: [...ids('ft', 'n', 3, 4), ...ids('ft', 'p', 3), ...rings('ft', [4, 5, 6])] },
        { say: 'Take away the three positive counters.', hide: [...ids('ft', 'p', 3), ...rings('ft', [4, 5, 6])] },
        { say: 'Seven negative counters are left. So negative four minus positive three equals negative seven.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Not enough counters?', md: 'Add **zero pairs** until there are enough counters to take away. A zero pair is worth $0$, so the value does not change. Then take away.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(+2) - (+5) = -3', '(+3) - (-2) = +5', '(-4) - (+3) = -7'] },
      ],
      lines: [
        { say: 'Here is the method. If there are not enough counters to take away, add zero pairs until there are. Zero pairs are worth zero, so the value does not change. Then take away.', show: 'key' },
        { say: 'Look at the answers. Positive two minus positive five is negative three. Positive three minus negative two is positive five. Negative four minus positive three is negative seven.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'Do you see a pattern? Keep these answers in mind. In the next part, you will find a shortcut that gives the same answers without counters.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use counters to find $(-1) - (+4)$.',
          choices: ['$+3$', '$-3$', '$-5$', '$+5$'],
          answer: 2,
          working: 'Start with $1$ negative counter. Add $4$ zero pairs, then take away the $4$ positive counters. $5$ negative counters are left, so $(-1) - (+4) = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use counters to find negative one minus positive four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative five. Start with one negative counter. Add four zero pairs, then take away the four positive counters. Five negative counters are left. Choice A gives positive three, which is the answer to negative one plus positive four, not minus.', show: 'q.answer' },
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
          items: ['If there are not enough counters to take away, add zero pairs first.', 'Adding zero pairs does not change the value.', 'Then take away the second integer.', 'Subtracting a negative makes the answer bigger: $(+3) - (-2) = +5$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If there are not enough counters to take away, add zero pairs first.', show: 'sum.0' },
        { say: 'Adding zero pairs does not change the value, because each one is worth zero.', show: 'sum.1' },
        { say: 'Then take away the second integer, and count what is left.', show: 'sum.2' },
        { say: 'And notice that subtracting a negative made the answer bigger. In the next part, you will find out why. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
