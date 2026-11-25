import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 6 lesson 1.2 (comparing and ordering). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 3.1, Introduction to Integers, CC BY-NC-SA 4.0).
// On a number line the number further right is greater: 15 > 7, −2 < 5, −3 > −7 and 5 > −17, as in
// the book's answer.

const QUESTION = 'Order each of the following pairs of numbers using < or >. (a) 15 ___ 7 (b) −2 ___ 5 (c) −3 ___ −7 (d) 5 ___ −17';

const PAIRS: [string, number, number][] = [
  ['a', 15, 7],
  ['b', -2, 5],
  ['c', -3, -7],
  ['d', 5, -17],
];

const tex = (v: number) => (v < 0 ? `{-${-v}}` : String(v));

/** A number line from −20 to 20 with both numbers of every pair (shown a pair at a time). */
const line = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: -20,
        max: 20,
        step: 1,
        every: 5,
        length: 14,
        points: PAIRS.flatMap(([p, x, y]) => [
          { id: `${p}0`, value: x, tex: tex(x), tone: 'good' as const },
          { id: `${p}1`, value: y, tex: tex(y), tone: 'adj' as const, below: x > y ? false : undefined },
        ]),
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'xq-m6-1-2',
  lessonId: '',
  exam: {
    lesson: 'm6-1-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.1, Introduction to Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-1-introduction-to-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Greater Than or Less Than, with Negative Numbers (Comparing and Ordering)',
  thumbnailTitle: 'Is −3 Greater Than −7?',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: put < or > between 15 and 7, −2 and 5, −3 and −7, and 5 and −17. On a number line, the number further to the right is the greater one, so 15 > 7, −2 < 5, −3 > −7 and 5 > −17. Then we check and look at the traps, like thinking −7 is greater than −3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is −3 Greater Than −7?', subtitle: 'Comparing and ordering, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about comparing numbers, including negative numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Order each of the following pairs of numbers using $<$ or $>$. (a) $15$ ___ $7$ (b) $-2$ ___ $5$ (c) $-3$ ___ $-7$ (d) $5$ ___ $-17$',
          answer: '(a) $>$ (b) $<$ (c) $>$ (d) $>$',
          working: 'the number further right on the number line is greater',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Order each of the following pairs of numbers using less than or greater than. Part a, 15 and 7. Part b, negative 2 and 5. Part c, negative 3 and negative 7. Part d, 5 and negative 17.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The two signs', md: '$a > b$ means $a$ is **greater than** $b$. $a < b$ means $a$ is **less than** $b$. The sign always **opens** toward the **greater** number.' }],
      lines: [
        { say: 'The sign with the open side on the left means greater than. The sign with the open side on the right means less than.', show: 'c' },
        { say: 'An easy way to remember: the sign always opens toward the greater number.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Use the number line', md: 'On a number line, numbers get **greater** as you move **right**. So the number further to the **right** is the **greater** one, even when both are **negative**.' }],
      lines: [
        { say: 'Here is what we need. On a number line, numbers get greater as you move to the right.', show: 'c' },
        { say: 'So the number further to the right is always the greater one. That works for negative numbers too.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put both numbers on a **number line**', 'Find the one further **right**', 'Write the sign **opening** toward it'] }],
      lines: [
        { say: 'Here is the plan. Put both numbers of a pair on a number line.', show: 'plan.0' },
        { say: 'Find the one further to the right.', show: 'plan.1' },
        { say: 'Then write the sign so it opens toward that number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps: Each pair',
      layout: 'center',
      main: [line('nl'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } 15 \\good{>} 7 \\qquad \\text{(b) } {-2} \\good{<} 5', '\\text{(c) } {-3} \\good{>} {-7} \\qquad \\text{(d) } 5 \\good{>} {-17}'] }],
      lines: [
        { say: 'Here is a number line from negative 20 to 20.', show: 'nl.axis' },
        { say: 'Part a. 15 is to the right of 7, so 15 is greater. 15 is greater than 7.', show: ['nl.a0', 'nl.a1'], focus: ['nl.a0', 'nl.a1'] },
        { say: 'Part b. 5 is to the right of negative 2, so negative 2 is less than 5.', show: ['nl.b0', 'nl.b1', 'm.0'], hide: ['nl.a0', 'nl.a1'], focus: ['nl.b0', 'nl.b1'] },
        { say: 'Part c. Negative 3 is to the right of negative 7, closer to zero. So negative 3 is greater than negative 7.', show: ['nl.c0', 'nl.c1'], hide: ['nl.b0', 'nl.b1'], focus: ['nl.c0', 'nl.c1'] },
        { say: 'Part d. 5 is to the right of negative 17. Every positive number is greater than every negative number, so 5 is greater than negative 17.', show: ['nl.d0', 'nl.d1', 'm.1'], hide: ['nl.c0', 'nl.c1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{-3} \\text{ is } 3 \\text{ below } 0, \\quad {-7} \\text{ is } 7 \\text{ below } 0', '{-3} \\text{ is warmer, so } {-3} > {-7} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the hardest one, part c, with temperatures. Negative 3 degrees is 3 below zero, and negative 7 degrees is 7 below zero.', show: 'm.0' },
        { say: 'Negative 3 degrees is warmer, so it is the greater temperature. Negative 3 is greater than negative 7. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(c) $-3 < -7$', 'compared $3$ and $7$ and kept the sign: further **right** is greater'],
            ['(d) $5 < -17$', 'looked at $17$: every **positive** beats every **negative**'],
            ['sign turned round', 'the sign **opens** toward the **greater** number'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying negative 3 is less than negative 7 compares 3 and 7 and forgets the signs. Negative 3 is further right, so it is greater.' },
        { say: 'Saying 5 is less than negative 17 looks only at the 17. Any positive number is greater than any negative number.' },
        { say: 'And turning the sign round by mistake gives the opposite answer. The open side faces the greater number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which statement is true?',
          choices: ['$-8 > -4$', '$-6 > -9$', '$-1 < -5$', '$2 < -3$'],
          answer: 1,
          working: '−6 is to the right of −9 on the number line, so −6 > −9.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement is true? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative 6 is to the right of negative 9, so negative 6 is greater than negative 9. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Further **right** means **greater**', 'Positive is always greater than **negative**', 'For negatives, **closer to zero** is greater', 'The sign **opens** toward the greater number'] }],
      lines: [
        { say: 'Here is what to remember. On a number line, further right means greater.', show: 'sum.0' },
        { say: 'A positive number is always greater than a negative number.', show: 'sum.1' },
        { say: 'For two negative numbers, the one closer to zero is greater.', show: 'sum.2' },
        { say: 'And the sign opens toward the greater number. For more on comparing and ordering positive and negative numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
