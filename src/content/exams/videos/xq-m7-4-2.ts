import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// Exam question for Math 7 lesson 4.2 (subtracting integers). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 3.3, Subtract Integers, CC BY-NC-SA 4.0).
// Difference = 15 − (−30) = 15 + 30 = 45 degrees Fahrenheit: 15 down to 0, then 30 more.

const QUESTION =
  'In the morning, the temperature in Anchorage, Alaska was 15 degrees Fahrenheit. By mid-afternoon the temperature had dropped to 30 degrees below zero. What was the difference between the morning and afternoon temperatures?';

/** A thermometer from −35 to 20: the morning at 15, the afternoon at −30, 15 + 30 degrees apart. */
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        tube: true,
        min: -35,
        max: 20,
        every: 5,
        unit: 0.1,
        fills: [
          { id: 'am', value: 15, tone: 'bad' },
          { id: 'pm', value: -30, tone: 'adj' },
        ],
        moves: [
          { id: 'to0', from: 15, to: 0, label: '\\text{down } 15', tone: 'opp', x: 1.2 },
          { id: 'more', from: 0, to: -30, label: '\\text{down } 30 \\text{ more}', tone: 'opp', x: 1.2 },
        ],
        room: 4.8,
      }),
    ],
    600,
  );

const video: Explainer = {
  id: 'xq-m7-4-2',
  lessonId: '',
  exam: {
    lesson: 'm7-4-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.3, Subtract Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-3-subtract-integers',
    question: QUESTION,
  },
  title: 'Exam Question: A Big Drop in Anchorage (Subtracting Integers)',
  thumbnailTitle: 'A Big Drop in Anchorage',
  thumbnail: 'th',
  summary:
    'A real test question, solved one small step at a time: in Anchorage the morning temperature was 15 °F, and by mid-afternoon it had dropped to 30 degrees below zero. What was the difference? The difference is the morning minus the afternoon: 15 − (−30). Subtracting a negative is the same as adding: 15 + 30 = 45 degrees Fahrenheit. Then we check on a thermometer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Big Drop in Anchorage', subtitle: 'Subtracting integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about subtracting integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'In the morning, the temperature in Anchorage, Alaska was $15$ degrees Fahrenheit. By mid-afternoon the temperature had dropped to $30$ degrees below zero. What was the difference between the morning and afternoon temperatures?',
          answer: '$45$ degrees Fahrenheit',
          working: '15 − (−30) = 15 + 30 = 45',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'In the morning, the temperature in Anchorage, Alaska was 15 degrees Fahrenheit. By mid-afternoon the temperature had dropped to 30 degrees below zero. What was the difference between the morning and afternoon temperatures?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The difference', md: 'The **difference** between two temperatures is how far apart they are: the **higher** one **minus** the **lower** one. $30$ degrees **below zero** is $-30$. So the difference is $15 - (-30)$.' }],
      lines: [
        { say: 'The difference between two temperatures is how far apart they are: the higher one minus the lower one.', show: 'c' },
        { say: '30 degrees below zero is negative 30. So the difference is 15 minus negative 30.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a - (-b) = a + b'] }],
      lines: [
        { say: 'Here is what we need. Subtracting a negative number is the same as adding the positive number.', show: 'm.0' },
        { say: 'Taking away a drop of 30 degrees is the same as adding 30 degrees back.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write **below zero** as a **negative**', 'Subtract: **higher minus lower**', 'Change **minus a negative** to **plus**'] }],
      lines: [
        { say: 'Here is the plan. Write below zero as a negative number.', show: 'plan.0' },
        { say: 'Subtract: the higher temperature minus the lower one.', show: 'plan.1' },
        { say: 'Then change minus a negative into plus.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Subtract the negative',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{morning} = 15, \\quad \\text{afternoon} = -30', '15 - (-30)', '= 15 + 30 = \\good{45 \\text{ degrees}}'] }],
      lines: [
        { say: 'Step one. The morning was 15 degrees. 30 degrees below zero is negative 30.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The difference is the higher minus the lower: 15 minus negative 30.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Subtracting negative 30 is the same as adding 30. 15 plus 30 is 45. The difference is 45 degrees Fahrenheit.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 460,
      left: [thermo('th')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['15 \\text{ down to } 0: 15', '0 \\text{ down to } {-30}: 30', '15 + 30 = 45 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a thermometer. In the morning it reads 15.', show: ['th.axis', 'th.am'] },
        { say: 'Falling to zero is a drop of 15 degrees.', show: ['th.to0', 'm.0'], focus: 'm.0' },
        { say: 'Falling from zero down to negative 30 is 30 more degrees.', show: ['th.more', 'th.pm', 'm.1'], hide: 'th.am', focus: 'm.1' },
        { say: '15 plus 30 is 45 degrees altogether. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$15$ degrees', 'took $30 - 15$: the temperatures are on **opposite sides** of zero'],
            ['$-15$ degrees', 'added $15 + (-30)$: a difference **subtracts**'],
            ['$-45$ degrees', 'took lower minus higher: a difference is **how far apart**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '15 degrees takes 15 away from 30, as if both were above zero. One is above zero and one is below, so the gaps add up.' },
        { say: 'Negative 15 adds 15 and negative 30. That gives the temperature you would reach by dropping 30 degrees from 15. The question asks for the difference, so subtract.' },
        { say: 'And negative 45 works out negative 30 minus 15. A difference is a distance, so take the higher minus the lower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At noon the temperature was $-4\\,^\\circ\\text{C}$. By midnight it was $-13\\,^\\circ\\text{C}$. How many degrees did the temperature drop?',
          choices: ['$17$', '$-17$', '$-9$', '$9$'],
          answer: 3,
          working: '−4 − (−13) = −4 + 13 = 9 degrees.',
        },
      ],
      lines: [
        { say: 'Your turn. At noon the temperature was negative 4 degrees Celsius. By midnight it was negative 13 degrees. How many degrees did the temperature drop? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Higher minus lower: negative 4 minus negative 13. That is negative 4 plus 13, which is 9. The temperature dropped 9 degrees. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Below zero** is **negative**', 'Difference: **higher minus lower**', '**Minus a negative** is **plus**', 'Check on a **number line**'] }],
      lines: [
        { say: 'Here is what to remember. Below zero is negative.', show: 'sum.0' },
        { say: 'A difference is the higher minus the lower.', show: 'sum.1' },
        { say: 'Subtracting a negative is the same as adding.', show: 'sum.2' },
        { say: 'And check on a number line or a thermometer. For more on subtracting integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
