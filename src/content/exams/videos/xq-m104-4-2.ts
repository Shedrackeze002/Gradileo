import { numberLine } from '@/video/numbers.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 4.2 (adding and subtracting integers). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 3.3, Subtract Integers,
// CC BY-NC-SA 4.0). 28 − 38 = −10, so the evening temperature was −10°, as in the book's answer.
// Check: −10 + 38 = 28.

/** The thermometer as a number line: 28° at the start, a drop of 38° to −10°. */
const line = (height = 300) =>
  figure(
    'nl',
    [
      numberLine({
        min: -15,
        max: 30,
        step: 1,
        every: 5,
        points: [
          { id: 'start', value: 28, tex: '28^\\circ', tone: 'adj' },
          { id: 'zero', value: 0, tex: '0^\\circ', tone: 'muted' },
          { id: 'end', value: -10, tex: '-10^\\circ', tone: 'good' },
        ],
        spans: [
          { id: 'first', from: 0, to: 28, tone: 'opp', label: '\\text{down } 28' },
          { id: 'rest', from: -10, to: 0, tone: 'theta' },
        ],
      }),
    ],
    height,
  );

const QUESTION =
  'Temperature One morning, the temperature in Urbana, Illinois, was 28° Fahrenheit. By evening, the temperature had dropped 38° Fahrenheit. What was the temperature that evening?';

const video: Explainer = {
  id: 'xq-m104-4-2',
  lessonId: '',
  exam: {
    lesson: 'm104-4-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.3, Subtract Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-3-subtract-integers',
    question: QUESTION,
  },
  title: 'Exam Question: A 38 Degree Temperature Drop (Adding and Subtracting Integers)',
  thumbnailTitle: 'A 38° Temperature Drop',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: one morning the temperature in Urbana, Illinois, was 28° Fahrenheit, and by evening it had dropped 38°. What was the temperature that evening? A drop means subtract: 28 − 38. Going down 28 reaches zero, and the other 10 takes us below zero, to −10°. Then we check by adding back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A 38° Temperature Drop', subtitle: 'Adding and subtracting integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding and subtracting integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Temperature** One morning, the temperature in Urbana, Illinois, was $28^\\circ$ Fahrenheit. By evening, the temperature had dropped $38^\\circ$ Fahrenheit. What was the temperature that evening?',
          answer: '$-10^\\circ$ F',
          working: '$28 - 38 = -10$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'One morning, the temperature in Urbana, Illinois, was 28 degrees Fahrenheit. By evening, the temperature had dropped 38 degrees Fahrenheit. What was the temperature that evening?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{evening} = 28 - 38'] },
        { kind: 'text', id: 't', size: 'md', md: 'The temperature **dropped**, so we **subtract**. It drops by **more** than $28$, so it goes **below zero**.' },
      ],
      lines: [
        { say: 'The temperature started at 28 degrees and dropped 38 degrees. A drop takes away, so the evening temperature is 28 minus 38.', show: 'm' },
        { say: 'Notice that it drops by more than 28. So the temperature goes past zero, and the answer will be negative.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        line(),
        { kind: 'callout', id: 'c', tone: 'key', title: 'Subtracting a bigger number', md: 'Going **down** means moving **left** on the number line. Go down to **zero** first, then keep going: the rest is **below zero**.' },
      ],
      lines: [
        { say: 'Here is what we need. A thermometer is a number line. Here it runs from minus 15 to 30 degrees.', show: 'nl.axis' },
        { say: 'Going down means moving to the left. When we take away more than we have, go down to zero first, then keep going. Whatever is left over takes us below zero.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **subtraction**', 'Go down to **zero**', 'Go down the **rest** of the way'] }],
      lines: [
        { say: 'Here is the plan. Write the subtraction.', show: 'plan.0' },
        { say: 'Go down to zero.', show: 'plan.1' },
        { say: 'Then go down the rest of the way.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Down to zero',
      layout: 'center',
      main: [line(320), { kind: 'math', id: 'm', size: 'md', lines: ['38 = 28 + 10'] }],
      lines: [
        { say: 'Step one. Start at 28 degrees.', show: ['nl.axis', 'nl.start'] },
        { say: 'Going down 28 degrees brings us to exactly zero. That uses 28 of the 38 degrees, so 10 degrees of the drop are still to go.', show: ['nl.first', 'nl.zero', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Below zero',
      layout: 'center',
      main: [line(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{down } 28, \\text{ then down } 10 \\text{ more}', '28 - 38 = \\good{-10}'] }],
      lines: [
        { say: 'Step two. Go down the other 10 degrees, below zero.', show: ['nl.axis', 'nl.start', 'nl.first', 'nl.zero', 'nl.rest', 'nl.end'] },
        { say: '10 below zero is negative 10. The temperature that evening was minus 10 degrees Fahrenheit.', show: 'm', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-10 + 38 = 28 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. If the temperature rose 38 degrees from minus 10, it should get back to the morning\'s 28. Minus 10 plus 38 is 28. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$10^\\circ$', 'took $28$ from $38$: the temperature went **below zero**'],
            ['$66^\\circ$', '**added**: a drop means **subtract**'],
            ['$-66^\\circ$', 'made $28$ negative too: the morning was **above** zero'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 degrees comes from doing 38 minus 28 instead. The size is right, but the temperature went below zero, so it is minus 10.' },
        { say: '66 degrees adds the drop. A drop makes it colder, so subtract.' },
        { say: 'And minus 66 starts from minus 28. The morning was 28 above zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At 6 a.m. the temperature was $-4^\\circ$C. By noon it had risen $9^\\circ$C. What was the temperature at noon?',
          choices: ['$-13^\\circ$C', '$13^\\circ$C', '$5^\\circ$C', '$-5^\\circ$C'],
          answer: 2,
          working: '$-4 + 9 = 5$, so it was $5^\\circ$C at noon.',
        },
      ],
      lines: [
        { say: 'Your turn. At 6 in the morning the temperature was minus 4 degrees Celsius. By noon it had risen 9 degrees. What was the temperature at noon? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A rise means add: minus 4 plus 9. Going up 4 reaches zero, and the other 5 takes us to 5 degrees. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Drop: **subtract**. Rise: **add**', 'Down means **left** on the number line', 'Go to **zero** first, then the rest', 'Check: add the drop **back**'] }],
      lines: [
        { say: 'Here is what to remember. A drop means subtract, and a rise means add.', show: 'sum.0' },
        { say: 'Going down means moving left on the number line.', show: 'sum.1' },
        { say: 'When you pass zero, go to zero first, then the rest of the way.', show: 'sum.2' },
        { say: 'And check by adding the drop back. For more on adding and subtracting integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
