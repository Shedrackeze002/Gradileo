import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 7.1 (absolute value): the numbers at a distance of 4 from 8.
// The question is an exercise from OpenStax College Algebra 2e, word for word (section 3.6, Absolute
// Value Functions, CC BY-NC-SA 4.0), whose answer key gives |x − 8| = 4: the distance from x to 8
// is |x − 8|, and the two numbers are 4 and 12.

/** A number line from 0 to 14 with 8 marked; `steps` adds the two jumps of 4 and where they land. */
const line = (steps: boolean) =>
  figure(
    'nl',
    [
      numberLine({
        min: 0,
        max: 14,
        step: 1,
        length: 14,
        points: [
          { id: 'c', value: 8, tex: '8', tone: 'brand' },
          ...(steps
            ? [
                { id: 'lo', value: 4, tex: 'x = 4', tone: 'good' as const },
                { id: 'hi', value: 12, tex: 'x = 12', tone: 'good' as const },
              ]
            : []),
        ],
        spans: steps
          ? [
              { id: 'left', from: 4, to: 8, tone: 'adj', label: '4' },
              { id: 'right', from: 8, to: 12, tone: 'opp', label: '4' },
            ]
          : [],
      }),
    ],
    200,
  );

const QUESTION = 'Describe all numbers x that are at a distance of 4 from the number 8. Express this set of numbers using absolute value notation.';

const video: Explainer = {
  id: 'xq-m201-7-1',
  lessonId: '',
  exam: {
    lesson: 'm201-7-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.6, Absolute Value Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-6-absolute-value-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Numbers at a Distance of 4 From 8 (Absolute Value)',
  thumbnailTitle: 'Distance 4 From 8',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: describe all numbers x at a distance of 4 from 8, using absolute value notation. The distance from x to 8 is |x − 8|, so the set is |x − 8| = 4, which holds for x = 4 and x = 12. Then we check both on a number line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Distance on a Number Line', subtitle: 'Absolute value, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about absolute value. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Describe all numbers $x$ that are at a distance of $4$ from the number $8$. Express this set of numbers using absolute value notation.',
          answer: '$|x - 8| = 4$, so $x = 4$ or $x = 12$',
          working: 'The distance from $x$ to $8$ is $|x - 8|$, and $8 - 4 = 4$, $8 + 4 = 12$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Describe all numbers x that are at a distance of 4 from the number 8. Write this set of numbers using absolute value notation.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We need an **equation** with absolute value that says "$x$ is $4$ away from $8$", and the **numbers** that make it true.' }],
      lines: [{ say: 'We need to write the sentence, x is 4 away from 8, as an equation with absolute value. Then we can list the numbers that make it true.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'abs', tone: 'definition', title: 'Absolute value', md: '$|a|$ is the distance from $a$ to $0$, so it is never negative: $|5| = 5$ and $|-5| = 5$.' },
        { kind: 'callout', id: 'dist', tone: 'key', title: 'Distance between two numbers', md: 'The distance between $x$ and $c$ is $|x - c|$, whichever is bigger.' },
      ],
      lines: [
        { say: 'Here is what we need. The absolute value of a number is its distance from 0, so it is never negative. The absolute value of 5 is 5, and the absolute value of negative 5 is also 5.', show: 'abs' },
        { say: 'And the distance between two numbers x and c is the absolute value of x minus c. The absolute value makes it come out positive, whichever number is bigger.', show: 'dist' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **distance** from $x$ to $8$', 'Set it equal to $4$', 'Find the **two** numbers'] }],
      lines: [
        { say: 'Here is the plan. First, write the distance from x to 8.', show: 'plan.0' },
        { say: 'Second, set that distance equal to 4.', show: 'plan.1' },
        { say: 'Third, find the numbers. There will be two of them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The distance',
      layout: 'center',
      main: [line(false), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{distance from } x \\text{ to } 8 = |x - 8|'] }],
      lines: [
        { say: 'Step one. Here is 8 on a number line.', show: ['nl.axis', 'nl.c'] },
        { say: 'Using the rule, the distance between x and 8 is the absolute value of x minus 8.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\good{|x - 8| = 4}'] }],
      lines: [{ say: 'Step two. That distance is 4, so the equation is: the absolute value of x minus 8 equals 4. That is the set in absolute value notation.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Step 3: The two numbers',
      layout: 'center',
      main: [line(true), { kind: 'math', id: 'm', size: 'lg', lines: ['x - 8 = 4 \\quad \\text{or} \\quad x - 8 = -4', 'x = 12 \\quad \\text{or} \\quad x = 4'] }],
      lines: [
        { say: 'Step three. From 8, we can move 4 to the right, or 4 to the left.', show: ['nl.axis', 'nl.c'] },
        { say: '4 to the right lands on 12.', show: ['nl.right', 'nl.hi'] },
        { say: '4 to the left lands on 4.', show: ['nl.left', 'nl.lo'] },
        { say: 'In algebra, x minus 8 is either 4 or negative 4.', show: 'm.0' },
        { say: 'So x is 12 or x is 4. These are the two numbers in the set.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 12: \\quad |12 - 8| = |4| = 4 \\ \\checkmark', 'x = 4: \\quad |4 - 8| = |{-4}| = 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both. For 12, the absolute value of 12 minus 8 is the absolute value of 4, which is 4.', show: 'm.0' },
        { say: 'For 4, the absolute value of 4 minus 8 is the absolute value of negative 4, which is also 4. Both are 4 away from 8.', show: 'm.1' },
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
            ['$|x + 8| = 4$', 'distance from $8$ is $|x - 8|$: subtract the $8$'],
            ['only $x = 12$', 'you can move $4$ to the **left** too'],
            ['$|x| - 8 = 4$', 'the $8$ goes **inside** the absolute value bars'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The absolute value of x plus 8 is the distance from negative 8, not from 8. To measure from 8, subtract 8.' },
        { say: 'Do not stop at 12. A distance can go either way, so 4 is also 4 away from 8.' },
        { say: 'And keep the 8 inside the bars. The absolute value of x, minus 8, means something else.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which equation describes all numbers $x$ at a distance of $3$ from $-2$?',
          choices: ['$|x - 2| = 3$', '$|x - 3| = 2$', '$|x| + 2 = 3$', '$|x + 2| = 3$'],
          answer: 3,
          working: '$|x - (-2)| = |x + 2| = 3$, so $x = 1$ or $x = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which equation describes all numbers x at a distance of 3 from negative 2? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The distance from x to negative 2 is the absolute value of x minus negative 2, which is x plus 2. So it is the absolute value of x plus 2 equals 3, choice D. The numbers are 1 and negative 5. A measures from positive 2.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$|a|$ is a **distance**, never negative', 'Distance from $x$ to $c$: $|x - c|$', '$|x - c| = d$ has **two** solutions, $c \\pm d$', 'Check both on a number line'] }],
      lines: [
        { say: 'Here is what to remember. An absolute value is a distance, so it is never negative.', show: 'sum.0' },
        { say: 'The distance from x to a number c is the absolute value of x minus c.', show: 'sum.1' },
        { say: 'When that distance is a positive number d, there are two answers: c plus d and c minus d.', show: 'sum.2' },
        { say: 'And check both on a number line. For more on absolute value, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
