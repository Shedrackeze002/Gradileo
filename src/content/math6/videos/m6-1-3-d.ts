import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hops } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { counters, ids, note, xAt } from './lib/m6-1-figures.ts';

// 5 + (−8): five zero pairs, and three negative counters left over.
const fiveEight = figure(
  'fe',
  [
    counters({
      sets: [
        { id: 'p', sign: '+', count: 5 },
        { id: 'n', sign: '-', count: 8, row: 1 },
      ],
      pairs: [0, 1, 2, 3, 4].map((c) => ({ id: `z${c}`, col: c })),
    }),
  ],
  280,
);

// 5 − 8 on a number line: start at 5 and take 8 steps to the left, to −3.
const line = figure(
  'ln',
  [
    numberLine({
      min: -5,
      max: 7,
      step: 1,
      points: [
        { id: 'start', value: 5, tex: '', tone: 'opp' },
        { id: 'end', value: -3, tex: '', tone: 'adj' },
      ],
    }),
    hops({ min: -5, max: 7, from: -3, step: 1, count: 8, tone: 'adj' }),
    note({ id: 'lab', at: [xAt(1, -5, 7), 1.6], tex: '8\\text{ steps left}', tone: 'adj' }),
  ],
  260,
);

const video: Explainer = {
  id: 'm6-1-3-d',
  lessonId: 'm6-1-3',
  title: 'Sums of Positive and Negative Numbers, Part 4: Writing a Difference as a Sum',
  thumbnailTitle: 'A Difference as a Sum',
  thumbnail: 'fe',
  summary: 'Subtracting a number is the same as adding its opposite: 5 − 8 = 5 + (−8) = 5 + (−5) + (−3) = −3, checked with counters and on a number line, and −4 − 6 = −4 + (−6) = −10. Keep the first number the same and change only the number being subtracted.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 4', title: 'Writing a Difference as a Sum', subtitle: 'Subtracting is adding the opposite' }],
      lines: [
        { say: 'What is five minus eight? Can you take eight away from five? With negative numbers, you can!', show: 'title' },
        { say: 'In this video, you will turn a subtraction into an addition, and then find its value with zero pairs.' },
      ],
    },
    {
      chapter: 'Adding the opposite',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A difference as a sum', md: 'Subtracting a number is the same as **adding its opposite**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['9 - 3 = 6', '9 + (-3) = 6 + 3 + (-3) = 6', '5 - 8 = 5 + (-8)'] },
      ],
      lines: [
        { say: 'Here is a big idea. Subtracting a number is the same as adding its opposite.', show: 'key' },
        { say: 'Let’s test it with numbers you know. Nine minus three is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Now add the opposite of three instead. Nine plus negative three is six plus three plus negative three. Three and negative three make zero, so the answer is six. The same!', show: 'm.1', focus: 'm.1' },
        { say: 'So five minus eight is the same as five plus negative eight. The opposite of eight is negative eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Five minus eight',
      layout: 'center',
      main: [
        fiveEight,
        { kind: 'math', id: 'm', size: 'md', lines: ['5 - 8 = 5 + (-8)', '= 5 + (-5) + (-3)', '= 0 + (-3) = -3'] },
      ],
      lines: [
        { say: 'Now find the value of five plus negative eight. Show five positive counters and eight negative counters.', show: ['m.0', ...ids('fe', 'p', 5), ...ids('fe', 'n', 8)], focus: 'm.0' },
        { say: 'Negative eight has the greater magnitude, so split it into negative five plus negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Five and negative five make five zero pairs, which are worth zero.', show: ['fe.z0', 'fe.z1', 'fe.z2', 'fe.z3', 'fe.z4'] },
        {
          say: 'Take them away, and three negative counters are left. So five minus eight equals negative three.',
          hide: [...ids('fe', 'p', 5), ...ids('fe', 'n', 5), 'fe.z0', 'fe.z1', 'fe.z2', 'fe.z3', 'fe.z4'],
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Check on a number line',
      layout: 'center',
      main: [line, { kind: 'math', id: 'm', size: 'lg', lines: ['5 - 8 = -3'] }],
      lines: [
        { say: 'You can check on a number line. Start at five.', show: ['ln.axis', 'ln.start'], focus: 'ln.start' },
        { say: 'Subtracting eight, or adding negative eight, moves eight steps to the left. Five steps take you to zero, and three more take you to negative three.', show: ['ln.hops', 'ln.lab', 'ln.end'], focus: ['ln.hops', 'ln.end'] },
        { say: 'You end at negative three, the same answer as with the counters.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Changing the wrong number', md: 'In $5 - 8$, keep the **first** number the same. Only the number being subtracted changes to its opposite: $5 + (-8)$, not $-5 + 8$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{5 - 8 = -5 + 8} \\quad \\bad{\\times}', '\\good{5 - 8 = 5 + (-8)} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. In five minus eight, the five stays exactly as it is.', show: 'oops' },
        { say: 'Some people change the five instead, and write negative five plus eight. That equals three, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Only the number being subtracted changes to its opposite. The minus eight becomes plus negative eight: five plus negative eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One more',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $-4 - 6$ as a sum. Then find its value.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-4 - 6 = -4 + (-6)', '= -10'] },
      ],
      lines: [
        { say: 'Let’s try one more. Write negative four minus six as a sum, then find its value.', show: 'q' },
        { say: 'Keep the negative four. Change subtracting six into adding its opposite, negative six. So it is negative four plus negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'Now both numbers are negative, so there are no zero pairs. Four negative counters and six more make ten. The answer is negative ten.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sum is the same as $3 - 10$?',
          choices: ['$-3 + 10$', '$3 + (-10)$', '$3 + 10$', '$-3 + (-10)$'],
          answer: 1,
          working: 'Keep the $3$ and add the opposite of $10$: $3 - 10 = 3 + (-10)$, which is $-7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sum is the same as three minus ten? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three plus negative ten. Keep the three, and add the opposite of ten. Its value is negative seven. Choice A changes the wrong number: it changes the three instead of the ten.', show: 'q.answer' },
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
          items: ['Subtracting a number is the same as adding its opposite: $5 - 8 = 5 + (-8)$.', 'Keep the first number the same; change only the number being subtracted.', 'Then use zero pairs: $5 + (-8) = -3$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtracting a number is the same as adding its opposite. Five minus eight is five plus negative eight.', show: 'sum.0' },
        { say: 'Keep the first number the same, and change only the number being subtracted.', show: 'sum.1' },
        { say: 'Then use zero pairs to find the value. Five plus negative eight is negative three. In the next lesson, we solve problems by adding and subtracting decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
