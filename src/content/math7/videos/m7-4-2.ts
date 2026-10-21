import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';

// A row of `count` counters of one sign.
const row = (id: string, sign: '+' | '-', count: number, height = 150) => figure(id, [counters({ sets: [{ id: 'c', sign, count }] })], height);

const video: Explainer = {
  id: 'm7-4-2',
  lessonId: 'm7-4-2',
  title: 'Subtracting Integers, Part 1: Subtracting by Taking Away',
  thumbnailTitle: 'Subtracting by Taking Away',
  thumbnail: 'sx',
  summary:
    'Subtracting means taking away: model the first integer with counters, then take away the second integer. (+7) − (+3): take 3 positive counters from 7, leaving +4. (−6) − (−2): take 2 negative counters from 6, leaving −4. (−3) − (−3) = 0. But (+2) − (+5) asks for 5 positive counters when there are only 2, which the next part solves with zero pairs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 1', title: 'Subtracting by Taking Away', subtitle: 'Take counters away' }],
      lines: [
        { say: 'At noon, the temperature is positive four degrees. By evening, it is negative five degrees. How many degrees did it fall? Questions like this need subtraction of integers.', show: 'title' },
        { say: 'Counters make the rules for subtracting easy to see. In this part, you will subtract integers by taking counters away.' },
      ],
    },
    {
      chapter: 'Taking away positives',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtracting with counters', md: 'Subtracting means **taking away**. Show the **first** integer with counters, then **take away** the second integer.' },
        row('sv', '+', 7),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(+7) - (+3) = +4'] },
      ],
      lines: [
        { say: 'Subtracting means taking away. Show the first integer with counters. Then take away the second integer.', show: 'key' },
        { say: 'Find positive seven minus positive three. Show positive seven with seven positive counters.', show: ids('sv', 'c', 7) },
        { say: 'Now take away positive three: three positive counters.', hide: ids('sv', 'c', 3, 4) },
        { say: 'Four positive counters are left. So positive seven minus positive three equals positive four. That is just like seven minus three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Taking away negatives',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Find $(-6) - (-2)$.' }, row('sx', '-', 6, 170), { kind: 'math', id: 'm', size: 'lg', lines: ['(-6) - (-2) = -4'] }],
      lines: [
        { say: 'It works the same way with negative counters. Find negative six minus negative two.', show: 'q' },
        { say: 'Show negative six with six negative counters.', show: ids('sx', 'c', 6) },
        { say: 'Now take away negative two. That means taking away two negative counters.', hide: ids('sx', 'c', 2, 4) },
        { say: 'Four negative counters are left. So negative six minus negative two equals negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that the answer is greater than negative six. Taking away negatives leaves less negative, so the value goes up, toward zero.' },
      ],
    },
    {
      chapter: 'Taking everything away',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Find $(-3) - (-3)$.' }, row('th', '-', 3, 170), { kind: 'math', id: 'm', size: 'lg', lines: ['(-3) - (-3) = 0'] }],
      lines: [
        { say: 'What is negative three minus negative three? Show three negative counters.', show: ['q', ...ids('th', 'c', 3)] },
        { say: 'Take away three negative counters. There is nothing left at all.', hide: ids('th', 'c', 3) },
        { say: 'So negative three minus negative three is zero. Any integer minus itself is zero.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Not enough counters?',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Find $(+2) - (+5)$.' }, row('tw', '+', 2, 170), { kind: 'callout', id: 'tip', tone: 'tip', title: 'A puzzle', md: 'You need to take away $5$ positive counters, but there are only $2$. What can you do?' }],
      lines: [
        { say: 'Now try positive two minus positive five. Show two positive counters.', show: ['q', ...ids('tw', 'c', 2)] },
        { say: 'You need to take away five positive counters, but there are only two. You cannot take away counters that are not there!', show: 'tip' },
        { say: 'There is a clever way to solve this, using zero pairs. You will see it in the next part.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use counters to find $(-9) - (-4)$.',
          choices: ['$-5$', '$-13$', '$+5$', '$+13$'],
          answer: 0,
          working: 'Show $9$ negative counters and take away $4$ negative counters. $5$ negative counters are left, so $(-9) - (-4) = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use counters to find negative nine minus negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative five. Show nine negative counters, and take away four of them. Five negative counters are left. Choice B adds four more negative counters, instead of taking them away.', show: 'q.answer' },
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
          items: ['Subtracting means taking away.', 'Show the first integer with counters, then take away the second.', '$(+7) - (+3) = +4$ and $(-6) - (-2) = -4$', 'Any integer minus itself is $0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtracting means taking away.', show: 'sum.0' },
        { say: 'Show the first integer with counters, then take away the second integer.', show: 'sum.1' },
        { say: 'So positive seven minus positive three is positive four, and negative six minus negative two is negative four.', show: 'sum.2' },
        { say: 'And any integer minus itself is zero. In the next part, you will see what to do when there are not enough counters. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
