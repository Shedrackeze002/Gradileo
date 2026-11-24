import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 9.1 (collecting and displaying data). The question is a Check
// Your Understanding from OpenStax Contemporary Mathematics, word for word (section 8.1, Gathering
// and Organizing Data, CC BY-NC-SA 4.0). Counting the 32 responses gives 1: 1, 2: 3, 3: 16, 4: 8 and
// 5: 4, as in the book's answer. Check: 1 + 3 + 16 + 8 + 4 = 32.

const RAW = '3 4 4 3 5 4 4 3 2 3 5 5 3 3 4 3 2 4 3 3 4 3 5 3 3 3 2 3 1 3 4 3';
const rows = [0, 1, 2, 3].map((r) => RAW.split(' ').slice(r * 8, r * 8 + 8).map((v) => `$${v}$`));

const QUESTION = `A survey of college students asked how many courses those students were currently taking. Create a quantitative frequency distribution to summarize the raw data given below: ${RAW}`;

const video: Explainer = {
  id: 'xq-m104-9-1',
  lessonId: '',
  exam: {
    lesson: 'm104-9-1',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 8.1, Gathering and Organizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-1-gathering-and-organizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: Making a Frequency Table (Collecting and Displaying Data)',
  thumbnailTitle: 'Making a Frequency Table',
  summary:
    'A real test question, solved one small step at a time: 32 college students said how many courses they were taking. Make a frequency distribution for the data. We list the possible answers, 1 to 5, count how often each one appears, and put the counts in a table: 1, 3, 16, 8 and 4. Then we check that the counts add up to 32 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Making a Frequency Table', subtitle: 'Collecting and displaying data, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about organising data. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: `A survey of college students asked how many courses those students were currently taking. Create a quantitative frequency distribution to summarize the raw data given below: ${RAW}`,
          answer: '$1$: $1$, $2$: $3$, $3$: $16$, $4$: $8$, $5$: $4$',
          working: '$1 + 3 + 16 + 8 + 4 = 32$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A survey of college students asked how many courses those students were currently taking. Create a quantitative frequency distribution to summarise the raw data given below.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'table', id: 'raw', head: ['', '', '', '', '', '', '', ''], rows },
        { kind: 'text', id: 't', size: 'md', md: 'A **frequency distribution** is a table: each **answer**, and **how many times** it was given.' },
      ],
      lines: [
        { say: 'Here is the raw data: 32 answers, one from each student. In this jumble, it is hard to see anything.', show: 'raw' },
        { say: 'A frequency distribution sorts it out. It is a table that lists each answer, and how many times it was given.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{frequency} = \\text{how many times a value appears}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Count carefully', md: 'Go through the data **once**, in order, and make a **tally mark** for each value. Then the frequencies must add up to the **number of responses**.' },
      ],
      lines: [
        { say: 'Here is what we need. The frequency of a value is how many times it appears in the data.', show: 'f' },
        { say: 'To count without losing your place, go through the data once, in order, and make a tally mark for each value. At the end, the frequencies must add up to the number of responses.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the possible **values**', '**Tally** each response', 'Write the **frequencies** in a table'] }],
      lines: [
        { say: 'Here is the plan. List the values that appear.', show: 'plan.0' },
        { say: 'Tally each response.', show: 'plan.1' },
        { say: 'Then write the frequencies in a table.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The values',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{smallest} = 1, \\quad \\text{largest} = 5', '\\text{values: } 1, 2, 3, 4, 5'] }],
      lines: [
        { say: 'Step one. Scan the data. The smallest number of courses is 1, and the largest is 5.', show: 'm.0' },
        { say: 'So the values to count are 1, 2, 3, 4 and 5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Tally',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tal',
          head: ['Courses', 'Tally'],
          rows: [
            ['$1$', '$|$'],
            ['$2$', '$|||$'],
            ['$3$', '$\\cancel{||||}\\ \\cancel{||||}\\ \\cancel{||||}\\ |$'],
            ['$4$', '$\\cancel{||||}\\ |||$'],
            ['$5$', '$||||$'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Go through the 32 answers in order, and make one tally mark beside the right value each time. Group the marks in fives, to make them easy to count.', show: 'tal' },
        { say: 'The 3s come up most often: 16 times. One student takes just 1 course.' },
      ],
    },
    {
      chapter: 'Step 3: The table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'fr',
          head: ['Number of courses', 'Frequency'],
          rows: [['$1$', '$1$'], ['$2$', '$3$'], ['$3$', '$\\good{16}$'], ['$4$', '$8$'], ['$5$', '$4$']],
        },
      ],
      lines: [
        { say: 'Step three. Count the tallies and write the frequencies. 1 student takes 1 course, 3 take 2, 16 take 3, 8 take 4, and 4 take 5. This table is the frequency distribution.', show: 'fr' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 + 3 + 16 + 8 + 4 = 32 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Every student gave one answer, so the frequencies must add up to 32. 1 plus 3 plus 16 plus 8 plus 4 is 32. Nothing was missed or counted twice. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['total $31$ or $33$', 'missed or **double-counted** a value: tally in **order**'],
            ['values only', 'listed $1$ to $5$ but left out the **counts**'],
            ['the values **added up**', 'frequency is **how many times**, not a sum'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If your counts add up to 31 or 33, a value was missed or counted twice. Tally the data in order, once.' },
        { say: 'Listing the values 1 to 5 is only half the table. Each one needs its frequency.' },
        { say: 'And a frequency counts how many times a value appears. Adding the 3s together, to get 48, is not a frequency.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Eight people said how many pets they have: $2\\ \\ 1\\ \\ 2\\ \\ 3\\ \\ 2\\ \\ 1\\ \\ 2\\ \\ 0$. What is the frequency of the value $2$?',
          choices: ['$3$', '$4$', '$2$', '$8$'],
          answer: 1,
          working: 'The value $2$ appears $4$ times.',
        },
      ],
      lines: [
        { say: 'Your turn. Eight people said how many pets they have. What is the frequency of the value 2? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Count the 2s: first, third, fifth and seventh. That is 4 times. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List every **value**', '**Tally** in order, in fives', 'Frequency $=$ **how many times**', 'Check: counts add to the **total**'] }],
      lines: [
        { say: 'Here is what to remember. List every value that appears.', show: 'sum.0' },
        { say: 'Tally the data in order, grouping marks in fives.', show: 'sum.1' },
        { say: 'A frequency is how many times a value appears.', show: 'sum.2' },
        { say: 'And check that the frequencies add up to the number of responses. For more on collecting and displaying data, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
