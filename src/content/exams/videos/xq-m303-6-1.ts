import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 6.1 (mean, median and mode). The question is a "Your Turn"
// from OpenStax Contemporary Mathematics, word for word (section 8.4, Mean, Median and Mode,
// CC BY-NC-SA 4.0); its table is shown in its own scene. There are 12 + 13 + 8 + 6 + 1 = 40 values,
// so the median is the mean of the 20th and 21st. The running totals are 12 (ones) and 25 (twos),
// so both are 2 and the median is 2, as in the book's answer.

const QUESTION =
  'In Your Turn 8.3, you found a frequency distribution for the number of people who shared a residence with people in a sample. Let’s review that data again: Number of People in the Residence 1, 2, 3, 4, 5 with Frequency 12, 13, 8, 6, 1. What’s the median of the number of people in these residences?';

const DATA = { kind: 'table' as const, head: ['Number of People in the Residence', 'Frequency'], rows: [['$1$', '$12$'], ['$2$', '$13$'], ['$3$', '$8$'], ['$4$', '$6$'], ['$5$', '$1$']] };

const video: Explainer = {
  id: 'xq-m303-6-1',
  lessonId: '',
  exam: {
    lesson: 'm303-6-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.4, Mean, Median and Mode',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-4-mean-median-and-mode',
    question: QUESTION,
  },
  title: 'Exam Question: The Median From a Frequency Table (Mean, Median and Mode)',
  thumbnailTitle: 'The Median From a Frequency Table',
  thumbnail: 'cum',
  summary:
    'A real test question, solved one small step at a time: a frequency table shows how many people live in each of 40 residences. What is the median? With 40 values, the median is halfway between the 20th and 21st. Running totals of the frequencies, 12 then 25, show that both are 2, so the median is 2. Then we check by counting from both ends and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Median From a Frequency Table', subtitle: 'Mean, median and mode, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the median. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'In Your Turn 8.3, you found a frequency distribution for the number of people who shared a residence with people in a sample. Let’s review that data again: (table on the next screen). What’s the median of the number of people in these residences?',
          answer: 'The median is $2$ people.',
          working: '$40$ values: the median is the mean of the $20$th and $21$st, which are both $2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'In Your Turn 8.3, you found a frequency distribution for the number of people who shared a residence with people in a sample. Let’s review that data again. What’s the median of the number of people in these residences?' },
      ],
    },
    {
      chapter: 'The data',
      layout: 'center',
      main: [{ ...DATA, id: 'data' }],
      lines: [
        { say: 'And here is the table from the question. 12 residences have 1 person, 13 have 2 people, 8 have 3, 6 have 4, and 1 has 5.', show: 'data' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Each row is **many** values: "$2$ people, $13$ times". Put **all** the values in order. The median is the one in the **middle**.' }],
      lines: [
        { say: 'Each row of the table stands for many values. The row 2 and 13 means the value 2 appears 13 times.', show: 't' },
        { say: 'If we wrote all the values in order, the median would be the one in the middle.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'med', tone: 'definition', title: 'The median', md: 'The **middle** value when the data are in order. With an **even** number $n$ of values, it is the mean of the values in positions $\\dfrac{n}{2}$ and $\\dfrac{n}{2} + 1$.' },
        { kind: 'callout', id: 'run', tone: 'tip', title: 'Running totals', md: 'Add the frequencies down the table to see **which** value sits in each position.' },
      ],
      lines: [
        { say: 'Here is what we need. The median is the middle value when the data are in order. With an even number of values, n, it is halfway between the values in positions n over 2 and n over 2 plus 1.', show: 'med' },
        { say: 'And running totals of the frequencies show which value sits in each position.', show: 'run' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Count** the values', 'Find the **middle** positions', 'Use **running totals** to find those values'] }],
      lines: [
        { say: 'Here is the plan. First, count the values.', show: 'plan.0' },
        { say: 'Second, find the middle positions.', show: 'plan.1' },
        { say: 'Third, use running totals to find the values in those positions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = 12 + 13 + 8 + 6 + 1 = \\good{40}'] }],
      lines: [
        { say: 'Step one. The number of values is the total of the frequencies: 12 plus 13 plus 8 plus 6 plus 1, which is 40 residences.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Middle positions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{40}{2} = 20, \\quad 20 + 1 = 21', '\\text{median} = \\text{mean of the } \\good{20\\text{th}} \\text{ and } \\good{21\\text{st}} \\text{ values}'] }],
      lines: [
        { say: 'Step two. 40 is even, so there is no single middle value. 40 over 2 is 20, and the next position is 21.', show: 'm.0' },
        { say: 'So the median is halfway between the 20th and the 21st values.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Running totals',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'cum',
          head: ['People', 'Frequency', 'Running total', 'Positions'],
          rows: [
            ['$1$', '$12$', '$12$', '$1$st to $12$th'],
            ['$\\good{2}$', '$13$', '$25$', '$13$th to $\\good{25}$th'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{median} = \\dfrac{2 + 2}{2} = \\good{2}'] },
      ],
      lines: [
        { say: 'Step three. The 12 ones fill positions 1 to 12.', show: 'cum' },
        { say: 'The 13 twos fill the next positions, 13 up to 25. Positions 20 and 21 are both in there, so both values are 2. We can stop here.' },
        { say: 'The median is 2 plus 2, over 2, which is 2 people.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{below } 2: \\ 12 \\text{ values}', '\\text{above } 2: \\ 8 + 6 + 1 = 15 \\text{ values}', '\\text{both less than half of } 40 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 12 values are below 2.', show: 'm.0' },
        { say: 'And 8 plus 6 plus 1, which is 15 values, are above 2.', show: 'm.1' },
        { say: 'Neither side has half of the 40 values, so the middle really is in the twos. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['median $3$, the middle of $1$ to $5$', 'the values are not **equally** common: use the frequencies'],
            ['median $8$, the middle frequency', '$8$ is a **count**, not a number of people'],
            ['median at position $20$ only', '$40$ is **even**: use positions $20$ **and** $21$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 is the middle of the list 1 to 5, but the values are not equally common. Many more residences have 1 or 2 people.' },
        { say: '8 is the middle frequency, but a frequency is a count of residences, not a number of people.' },
        { say: 'And with an even number of values, use the two middle positions, 20 and 21. Here they happen to match.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A frequency table shows the number of pets in $20$ homes: $0$ pets $4$ times, $1$ pet $6$ times, $2$ pets $7$ times and $3$ pets $3$ times. What is the median?',
          choices: ['$1.5$', '$1$', '$2$', '$6$'],
          answer: 0,
          working: 'Positions $10$ and $11$. Running totals: $4$, $10$, $17$, so the $10$th value is $1$ and the $11$th is $2$: $\\dfrac{1 + 2}{2} = 1.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A frequency table shows the number of pets in 20 homes: 0 pets 4 times, 1 pet 6 times, 2 pets 7 times, and 3 pets 3 times. What is the median? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The middle positions are 10 and 11. The running totals are 4, then 10, then 17. So the 10th value is 1, and the 11th is 2. The median is 1.5: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count the values: **add** the frequencies', 'Even $n$: positions $\\dfrac{n}{2}$ and $\\dfrac{n}{2} + 1$', 'Running totals show the value in each **position**', 'The median is a value of the **data**, not a frequency'] }],
      lines: [
        { say: 'Here is what to remember. Count the values by adding the frequencies.', show: 'sum.0' },
        { say: 'With an even number of values, the median is halfway between positions n over 2 and n over 2 plus 1.', show: 'sum.1' },
        { say: 'Running totals show which value is in each position.', show: 'sum.2' },
        { say: 'And the median is a value of the data, not a frequency. For more on mean, median and mode, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
