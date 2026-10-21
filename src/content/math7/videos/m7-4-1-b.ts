import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';

const rings = (fig: string, k: number) => Array.from({ length: k }, (_, c) => `${fig}.z${c}`);

// (+5) + (−3): five positives over three negatives, three zero pairs, two positives left.
const fiveThree = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 5 },
          { id: 'n', sign: '-', count: 3, row: 1 },
        ],
        pairs: [0, 1, 2].map((c) => ({ id: `z${c}`, col: c })),
      }),
    ],
    300,
  );

// (−4) + (−2): four negatives and two more negatives, six in all, no zero pairs.
const negatives = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'a', sign: '-', count: 4 },
          { id: 'b', sign: '-', count: 2, col: 4.4 },
        ],
        labels: [
          { id: 'a-lab', col: 1.5, row: 0.45, tex: '-4', place: 'below', tone: 'bad' },
          { id: 'b-lab', col: 4.9, row: 0.45, tex: '-2', place: 'below', tone: 'bad' },
        ],
      }),
    ],
    220,
  );

// (+3) + (−7): three zero pairs, four negatives left.
const threeSeven = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 3 },
          { id: 'n', sign: '-', count: 7, row: 1 },
        ],
        pairs: [0, 1, 2].map((c) => ({ id: `z${c}`, col: c })),
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm7-4-1-b',
  lessonId: 'm7-4-1',
  title: 'Adding Integers, Part 2: Adding with Counters',
  thumbnailTitle: 'Adding with Counters',
  thumbnail: 'ft',
  summary:
    'To add integers with counters, show both integers, make zero pairs and remove them; the counters left give the answer. (+5) + (−3): three zero pairs, two positives left, so +2. (−4) + (−2): six negatives and no zero pairs, so −6. (+3) + (−7): three zero pairs, four negatives left, so −4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 2', title: 'Adding with Counters', subtitle: 'Make zero pairs and remove them' }],
      lines: [
        { say: 'What is positive five plus negative three? With counters and zero pairs, you can see the answer.', show: 'title' },
        { say: 'In this part, you will add integers with counters: show both integers, make zero pairs, and count what is left.' },
      ],
    },
    {
      chapter: 'Positive five plus negative three',
      layout: 'center',
      main: [fiveThree('ft'), { kind: 'math', id: 'm', size: 'lg', lines: ['(+5) + (-3) = +2'] }],
      lines: [
        { say: 'Find positive five plus negative three. Show five positive counters, and three negative counters.', show: [...ids('ft', 'p', 5), ...ids('ft', 'n', 3)] },
        { say: 'Now make zero pairs. Match each negative counter with a positive counter. One zero pair, two, three zero pairs.', show: rings('ft', 3) },
        { say: 'Each zero pair is worth zero, so remove them. The value does not change.', hide: [...ids('ft', 'p', 3), ...ids('ft', 'n', 3), ...rings('ft', 3)] },
        { say: 'Two positive counters are left. So positive five plus negative three equals positive two.', show: 'm.0', focus: ['m.0', 'ft.p3', 'ft.p4'] },
      ],
    },
    {
      chapter: 'Two negatives',
      layout: 'center',
      main: [negatives('ng'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-4) + (-2) = -6'] }],
      lines: [
        { say: 'Now find negative four plus negative two. Show four negative counters.', show: [...ids('ng', 'a', 4), 'ng.a-lab'] },
        { say: 'Then show two more negative counters.', show: [...ids('ng', 'b', 2), 'ng.b-lab'] },
        { say: 'Are there any zero pairs? No. There are no positive counters at all, so nothing cancels.' },
        { say: 'Count all the counters. There are six negative counters. So negative four plus negative two equals negative six.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'More negatives',
      layout: 'center',
      main: [threeSeven('ts'), { kind: 'math', id: 'm', size: 'lg', lines: ['(+3) + (-7) = -4'] }],
      lines: [
        { say: 'Here is one more. Find positive three plus negative seven. Show three positive counters and seven negative counters.', show: [...ids('ts', 'p', 3), ...ids('ts', 'n', 7)] },
        { say: 'Make zero pairs. Each positive counter pairs with a negative counter. That makes three zero pairs.', show: rings('ts', 3) },
        { say: 'Remove the zero pairs.', hide: [...ids('ts', 'p', 3), ...ids('ts', 'n', 3), ...rings('ts', 3)] },
        { say: 'Four negative counters are left. So positive three plus negative seven equals negative four. This time there were more negative counters, so the answer is negative.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'What the counters show',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Adding with counters', md: 'Show both integers. Make **zero pairs** and remove them. The counters that are **left** give the answer.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(+5) + (-3) = +2 \\qquad \\text{more positives}', '(-4) + (-2) = -6 \\qquad \\text{no zero pairs}', '(+3) + (-7) = -4 \\qquad \\text{more negatives}'] },
      ],
      lines: [
        { say: 'Here is the method. Show both integers with counters. Make zero pairs and remove them. The counters that are left give the answer.', show: 'key' },
        { say: 'When there were more positive counters, the answer was positive.', show: 'm.0', focus: 'm.0' },
        { say: 'When both integers were negative, there were no zero pairs, so we just counted all the counters.', show: 'm.1', focus: 'm.1' },
        { say: 'And when there were more negative counters, the answer was negative.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use counters to find $(-6) + (+2)$.',
          choices: ['$+8$', '$-8$', '$+4$', '$-4$'],
          answer: 3,
          working: 'Six negative and two positive counters make $2$ zero pairs. Remove them: $4$ negative counters are left, so $(-6) + (+2) = -4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use counters to find negative six plus positive two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative four. Six negative counters and two positive counters make two zero pairs. Remove them, and four negative counters are left. Choice C has the right size but the wrong sign: there are more negative counters than positive ones.', show: 'q.answer' },
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
          items: ['Show both integers with counters.', 'Make zero pairs and remove them.', 'The counters left give the answer: $(+5) + (-3) = +2$.', 'Same signs make no zero pairs: $(-4) + (-2) = -6$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add integers with counters, show both integers.', show: 'sum.0' },
        { say: 'Make zero pairs, and remove them. They are worth zero.', show: 'sum.1' },
        { say: 'The counters that are left give the answer.', show: 'sum.2' },
        { say: 'When both integers have the same sign, there are no zero pairs, so count all the counters. In the next part, you will add integers on a number line. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
