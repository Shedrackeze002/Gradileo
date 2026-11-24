import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tallyChart } from '@/content/math5/videos/lib/m5-12-figures.ts';

// Exam question for Math 5 lesson 12.2 (collecting and displaying data). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 8.1, Gathering and Organizing Data,
// CC BY-NC-SA 4.0). The 16 majors give Biology 6, Education 1, Political Science 3, Sociology 2 and
// Undecided 4, as in the book's answer. Check: 6 + 1 + 3 + 2 + 4 = 16.

const QUESTION =
  'Students in a statistics class who were asked to provide their majors provided the data below: Undecided, Biology, Biology, Sociology, Political Science, Sociology, Undecided, Undecided, Undecided, Biology, Biology, Education, Biology, Biology, Political Science, Political Science. Create a categorical frequency distribution to organize these responses.';

const ROWS = [
  { label: 'Biology', count: 6 },
  { label: 'Education', count: 1 },
  { label: 'Political Science', count: 3 },
  { label: 'Sociology', count: 2 },
  { label: 'Undecided', count: 4 },
];

const chart = (id: string) => figure(id, [tallyChart({ head: ['Major', 'Tally', 'Frequency'], rows: ROWS, widths: [4.6, 3.4, 3.2] })], 460);

const video: Explainer = {
  id: 'xq-m5-12-2',
  lessonId: '',
  exam: {
    lesson: 'm5-12-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.1, Gathering and Organizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-1-gathering-and-organizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: Organize 16 Answers in a Frequency Table (Collecting and Displaying Data)',
  thumbnailTitle: 'Make a Frequency Table',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: 16 students gave their majors, the main subject they study. Organize the answers in a frequency table. We list each major once, tally the answers, and count: Biology 6, Education 1, Political Science 3, Sociology 2 and Undecided 4. Then we check that the frequencies add up to 16 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Make a Frequency Table', subtitle: 'Collecting and displaying data, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about organizing data in a table. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Students in a statistics class who were asked to provide their majors provided the data below: Undecided, Biology, Biology, Sociology, Political Science, Sociology, Undecided, Undecided, Undecided, Biology, Biology, Education, Biology, Biology, Political Science, Political Science. Create a categorical frequency distribution to organize these responses.',
          answer: 'Biology $6$, Education $1$, Political Science $3$, Sociology $2$, Undecided $4$',
          working: '6 + 1 + 3 + 2 + 4 = 16 answers',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Students in a statistics class were asked for their majors, and gave these answers: Undecided, Biology, Biology, Sociology, Political Science, Sociology, Undecided, Undecided, Undecided, Biology, Biology, Education, Biology, Biology, Political Science, Political Science. Organize the answers in a frequency table.', caption: 'Students in a statistics class gave their majors. Create a categorical frequency distribution to organize these responses.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'New words', md: 'A **major** is the main subject a student studies at college. A **categorical frequency distribution** is a **frequency table**: each category listed **once**, with its frequency beside it.' }],
      lines: [
        { say: 'A major is the main subject a student studies at college, like Biology.', show: 'c' },
        { say: 'A categorical frequency distribution sounds hard, but it is just a frequency table: each category listed once, with the number of times it appears beside it.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Making a frequency table', md: 'Write each **category once** in the first column. Go through the data **one answer at a time**, and make a **tally mark** in its row. Count the marks for the **frequency**.' }],
      lines: [
        { say: 'Here is what we need. Write each category once, in the first column.', show: 'c' },
        { say: 'Then go through the data one answer at a time, making a tally mark in the right row. Last, count the marks to get each frequency.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List each **major** once', '**Tally** the $16$ answers', 'Count each **frequency**, then **check** the total'] }],
      lines: [
        { say: 'Here is the plan. List each major once.', show: 'plan.0' },
        { say: 'Tally the 16 answers.', show: 'plan.1' },
        { say: 'Then count each frequency, and check the total.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The table',
      layout: 'center',
      main: [chart('c')],
      lines: [
        { say: 'Step one. The answers use five different majors: Biology, Education, Political Science, Sociology, and Undecided. Each gets one row.', show: ['c.frame', 'c.names'] },
        { say: 'Step two. Go through the answers in order, and make a tally mark in the right row for each one.', show: ['c.tally0', 'c.tally1', 'c.tally2', 'c.tally3', 'c.tally4'] },
        { say: 'Step three. Count the marks. Biology has 6, Education 1, Political Science 3, Sociology 2, and Undecided 4.', show: 'c.freqs' },
        { say: 'Biology has the highest frequency, so it is the most common major in this class.', show: 'c.hl0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 + 1 + 3 + 2 + 4 = 16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The frequencies add up to 6 plus 1 plus 3 plus 2 plus 4, which is 16. There were 16 answers, so none was missed or counted twice. It checks out.', show: 'm', focus: 'm' },
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
            ['a row for every answer', 'list each category **once**, and count it'],
            ['total of $15$', 'an answer was **missed**: tally them **in order**'],
            ['no row for Undecided', '**every** answer counts, even "Undecided"'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing a row for every single answer just copies the list. List each category once, and count it.' },
        { say: 'A total of 15 means an answer was missed. Tally the answers in order, and check the total.' },
        { say: 'And leaving out Undecided drops 4 students. Every answer counts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A frequency table of favourite colours shows red $5$, blue $8$ and green $3$. How many people answered?',
          choices: ['$16$', '$8$', '$3$', '$15$'],
          answer: 0,
          working: '5 + 8 + 3 = 16.',
        },
      ],
      lines: [
        { say: 'Your turn. A frequency table of favourite colours shows red 5, blue 8, and green 3. How many people answered? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Each person gave one answer, so add the frequencies: 5 plus 8 plus 3 is 16. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List each **category once**', '**Tally** the answers in order', '**Count** the marks for each frequency', 'The frequencies add up to the **total**'] }],
      lines: [
        { say: 'Here is what to remember. List each category once.', show: 'sum.0' },
        { say: 'Tally the answers in order.', show: 'sum.1' },
        { say: 'Count the marks to get each frequency.', show: 'sum.2' },
        { say: 'And check that the frequencies add up to the number of answers. For more on collecting and displaying data, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
