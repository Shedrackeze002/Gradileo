import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// Exam question for Math 7 lesson 4.3 (solving integer problems). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 3.2, Add Integers, CC BY-NC-SA 4.0). A gain is
// positive and a loss negative: 25 + 5 + (−8) + 15 = 37, so the ball is on the 37-yard line.

const QUESTION =
  'The Chargers began with the football on their 25-yard line. They gained 5 yards, lost 8 yards and then gained 15 yards on the next three plays. Where was the ball at the end of these plays?';

const field = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: 20,
        max: 40,
        step: 1,
        every: 5,
        length: 13,
        points: [
          { id: 's', value: 25, tex: '25', tone: 'adj' },
          { id: 'a', value: 30, tex: '30', tone: 'good' },
          { id: 'b', value: 22, tex: '22', tone: 'bad' },
          { id: 'e', value: 37, tex: '37', tone: 'good' },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'xq-m7-4-3',
  lessonId: '',
  exam: {
    lesson: 'm7-4-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.2, Add Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-2-add-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Where Is the Football Now? (Solving Integer Problems)',
  thumbnailTitle: 'Where Is the Football?',
  thumbnail: 'fl',
  summary:
    'A real test question, solved one small step at a time: the Chargers start on their 25-yard line, gain 5 yards, lose 8 yards, then gain 15 yards. Where is the ball? A gain is positive and a loss is negative, so the position is 25 + 5 + (−8) + 15. Add left to right: 30, then 22, then 37. The ball is on the 37-yard line. Then we check by adding the gains and the loss separately and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Is the Football?', subtitle: 'Solving integer problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that uses integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The Chargers began with the football on their $25$-yard line. They gained $5$ yards, lost $8$ yards and then gained $15$ yards on the next three plays. Where was the ball at the end of these plays?',
          answer: 'on their $37$-yard line',
          working: '25 + 5 + (−8) + 15 = 37',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The Chargers began with the football on their 25 yard line. They gained 5 yards, lost 8 yards, and then gained 15 yards on the next three plays. Where was the ball at the end of these plays?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Gains and losses', md: 'The ball starts at the $25$-yard line. A **gain** moves it **forward**, so it is **positive**. A **loss** moves it **back**, so it is **negative**. We want where the ball ends up.' }],
      lines: [
        { say: 'The ball starts on the 25 yard line. A gain moves the ball forward, so it is a positive number.', show: 'c' },
        { say: 'A loss moves the ball back, so it is a negative number. We want to know where the ball ends up.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Write it as one sum', md: 'Write the start and each change as **integers** and add them all. Adding a negative is the same as **taking away**: $30 + (-8) = 30 - 8$.' }],
      lines: [
        { say: 'Here is what we need. Write the start and every change as integers, and add them all.', show: 'c' },
        { say: 'Adding a negative number is the same as taking away. 30 plus negative 8 is 30 minus 8.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write **gains** as $+$ and **losses** as $-$', 'Add them to the **start**, left to right', 'Say **where** the ball is'] }],
      lines: [
        { say: 'Here is the plan. Write gains as positive and losses as negative.', show: 'plan.0' },
        { say: 'Add them to the start, from left to right.', show: 'plan.1' },
        { say: 'Then say where the ball is.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Play by play',
      layout: 'split',
      leftWidth: 700,
      left: [field('fl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25 + 5 + (-8) + 15', '= 30 + (-8) + 15', '= 22 + 15', '= \\good{37}'] }],
      lines: [
        { say: 'Step one. Start at 25. Gain 5 is plus 5, lose 8 is negative 8, and gain 15 is plus 15. The sum is 25 plus 5, plus negative 8, plus 15.', show: ['fl.axis', 'fl.s', 'm.0'], focus: 'm.0' },
        { say: 'Step two. 25 plus 5 is 30. The ball moves forward to the 30 yard line.', show: ['fl.a', 'm.1'], focus: 'fl.a' },
        { say: '30 plus negative 8 is 30 minus 8, which is 22. The ball goes back to the 22 yard line.', show: ['fl.b', 'm.2'], focus: 'fl.b' },
        { say: 'Step three. 22 plus 15 is 37. The ball ends on the 37 yard line.', show: ['fl.e', 'm.3'], focus: ['fl.e', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{gains: } 5 + 15 = 20, \\quad \\text{loss: } 8', '25 + 20 - 8 = 37 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. The gains are 5 and 15, which make 20. The loss is 8.', show: 'm.0' },
        { say: '25 plus 20 is 45, and 45 minus 8 is 37. Same answer, so it checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$53$-yard line', 'added the **loss**: a loss is **negative**'],
            ['$12$ yards', 'found only the **change**: add it to the **start**, $25$'],
            ['$13$-yard line', 'took the gains away and added the loss: the signs are **swapped**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 53 yard line adds all the numbers, the loss as well. A loss moves the ball back, so it is negative 8.' },
        { say: '12 yards is how far the ball moved overall. But the question asks where the ball is, so add the 12 to the start: 37.' },
        { say: 'And the 13 yard line swaps the signs. Gains are positive, and the loss is negative.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A hiker starts $120$ m above sea level. She climbs $45$ m, goes down $80$ m, then climbs $30$ m. How high is she now?',
          choices: ['$115$ m', '$275$ m', '$25$ m', '$155$ m'],
          answer: 0,
          working: '120 + 45 + (−80) + 30 = 165 − 80 + 30 = 85 + 30 = 115 m.',
        },
      ],
      lines: [
        { say: 'Your turn. A hiker starts 120 metres above sea level. She climbs 45 metres, goes down 80 metres, then climbs 30 metres. How high is she now? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '120 plus 45 is 165. Plus negative 80 is 85. Plus 30 is 115. She is 115 metres above sea level. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Gains** are positive, **losses** negative', 'Write **one sum** with the start', 'Add **left to right**', 'Check: gains, then losses'] }],
      lines: [
        { say: 'Here is what to remember. Gains are positive and losses are negative.', show: 'sum.0' },
        { say: 'Write one sum that starts with the starting point.', show: 'sum.1' },
        { say: 'Add from left to right.', show: 'sum.2' },
        { say: 'And check by adding the gains and the losses separately. For more on solving integer problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
