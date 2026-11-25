import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// Exam question for Math 6 lesson 1.3 (sums of positive and negative numbers). The question is a
// Try It from OpenStax Prealgebra 2e, word for word (section 3.2, Add Integers, CC BY-NC-SA 4.0).
// 10 degrees below zero is −10; warming 14 degrees adds 14: −10 + 14 = 4 °C, as in the book's
// answer. Up 10 reaches 0, and 4 more reaches 4.

const QUESTION =
  'The temperature in Chicago at 5 A.M. was 10 degrees below zero Celsius. Six hours later, it had warmed up 14 degrees Celsius. What is the temperature at 11 A.M.?';

/** A thermometer from −12 to 6: the column at −10, then up 14 degrees to 4. */
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        tube: true,
        min: -12,
        max: 6,
        every: 2,
        unit: 0.3,
        fills: [
          { id: 'early', value: -10, tone: 'adj' },
          { id: 'late', value: 4, tone: 'bad' },
        ],
        moves: [
          { id: 'to0', from: -10, to: 0, label: '\\text{up } 10', tone: 'good', x: 1.2 },
          { id: 'more', from: 0, to: 4, label: '\\text{up } 4 \\text{ more}', tone: 'good', x: 1.2 },
        ],
        room: 4.6,
      }),
    ],
    600,
  );

const video: Explainer = {
  id: 'xq-m6-1-3',
  lessonId: '',
  exam: {
    lesson: 'm6-1-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.2, Add Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-2-add-integers',
    question: QUESTION,
  },
  title: 'Exam Question: A Cold Morning in Chicago Warms Up (Sums of Positive and Negative Numbers)',
  thumbnailTitle: 'From −10° Up 14 Degrees',
  thumbnail: 'th',
  summary:
    'A real test question, solved one small step at a time: in Chicago at 5 A.M. it was 10 degrees below zero Celsius, and by 11 A.M. it had warmed up 14 degrees. What is the temperature at 11 A.M.? We write the sum −10 + 14 and add on a thermometer: up 10 reaches 0, and 4 more reaches 4 °C. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'From −10° Up 14 Degrees', subtitle: 'Sums of positive and negative numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding positive and negative numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The temperature in Chicago at $5$ A.M. was $10$ degrees below zero Celsius. Six hours later, it had warmed up $14$ degrees Celsius. What is the temperature at $11$ A.M.?',
          answer: '$4$ degrees Celsius',
          working: '−10 + 14 = 4',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The temperature in Chicago at 5 in the morning was 10 degrees below zero Celsius. Six hours later, it had warmed up 14 degrees Celsius. What is the temperature at 11 in the morning?', caption: 'The temperature in Chicago at 5 A.M. was 10 degrees below zero Celsius. Six hours later, it had warmed up 14 degrees Celsius. What is the temperature at 11 A.M.?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Start and change', md: 'The **start** is $10$ degrees **below** zero: $-10$. **Warmed up** $14$ degrees means the temperature went **up** by $14$: $+14$. We want the temperature **after** the change.' }],
      lines: [
        { say: 'The temperature starts at 10 degrees below zero. That is negative 10.', show: 'c' },
        { say: 'Warmed up 14 degrees means it went up by 14. So we start at negative 10 and add 14.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Adding on a number line', md: 'Adding a **positive** number moves **up** a thermometer, or **right** on a number line. To add across zero, go **to zero** first, then the **rest** of the way.' }],
      lines: [
        { say: 'Here is what we need. Adding a positive number moves up a thermometer.', show: 'c' },
        { say: 'When the move crosses zero, it helps to go to zero first, and then the rest of the way.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **sum**: start plus change', 'Move **up** to zero', 'Move up the **rest** of the way'] }],
      lines: [
        { say: 'Here is the plan. Write the sum: the start plus the change.', show: 'plan.0' },
        { say: 'Move up to zero.', show: 'plan.1' },
        { say: 'Then move up the rest of the way.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Warm up',
      layout: 'split',
      leftWidth: 460,
      left: [thermo('th')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-10 + 14', '= -10 + 10 + 4', '= 0 + 4', '= \\good{4}'] }],
      lines: [
        { say: 'Step one. At 5 in the morning, the thermometer shows negative 10. It warms up 14 degrees, so the sum is negative 10 plus 14.', caption: 'Step one. At 5 A.M. the thermometer shows −10. It warms up 14 degrees, so the sum is −10 + 14.', show: ['th.axis', 'th.early', 'm.0'], focus: 'm.0' },
        { say: 'Step two. Split the 14 into 10 and 4. Going up 10 degrees takes us from negative 10 to zero.', show: ['th.to0', 'm.1', 'm.2'], focus: 'th.to0' },
        { say: 'Step three. Then we go up the other 4 degrees, from zero to 4.', show: ['th.more', 'th.late', 'm.3'], hide: 'th.early', focus: 'm.3' },
        { say: 'So the temperature at 11 in the morning is 4 degrees Celsius.', caption: 'So the temperature at 11 A.M. is 4 degrees Celsius.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 - 14 = -10 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going backwards. If it is 4 degrees now and we take away the 14 degrees it warmed up, we get back to negative 10. It checks out.', show: 'm', focus: 'm' },
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
            ['$24$', 'added $10 + 14$: the start is **below** zero, $-10$'],
            ['$-4$', 'took the sign of the **start**: warming $14$ takes it **past** zero'],
            ['$-24$', 'went **down** $14$: warming up means **up**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '24 adds 10 and 14, forgetting that the start is below zero.' },
        { say: 'Negative 4 keeps the minus sign of the start. But warming 14 degrees takes it past zero, so the answer is positive.' },
        { say: 'And negative 24 goes down instead of up. Warming up means the temperature goes up.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At night the temperature was $-6$ °C. By noon it had warmed up $9$ degrees. What was the temperature at noon?',
          choices: ['$-15$ °C', '$3$ °C', '$-3$ °C', '$15$ °C'],
          answer: 1,
          working: '−6 + 9: up 6 to 0, then 3 more, so 3 °C.',
        },
      ],
      lines: [
        { say: 'Your turn. At night the temperature was negative 6 degrees Celsius. By noon it had warmed up 9 degrees. What was the temperature at noon? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative 6 plus 9: up 6 to zero, then 3 more. It was 3 degrees Celsius. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Below zero is **negative**', 'Warming up means **adding**', 'Go **to zero** first, then the **rest**', 'Check by going **backwards**'] }],
      lines: [
        { say: 'Here is what to remember. A temperature below zero is negative.', show: 'sum.0' },
        { say: 'Warming up means adding.', show: 'sum.1' },
        { say: 'When the move crosses zero, go to zero first, then the rest of the way.', show: 'sum.2' },
        { say: 'And check by going backwards. For more on sums of positive and negative numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
