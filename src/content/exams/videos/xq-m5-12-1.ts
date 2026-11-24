import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tallyChart } from '@/content/math5/videos/lib/m5-12-figures.ts';

// Exam question for Math 5 lesson 12.1 (frequency and the mode). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.5, Averages and Probability, CC BY-NC-SA 4.0).
// The 20 answers have frequencies 1: 1, 2: 2, 3: 2, 4: 3, 5: 6, 6: 4, 7: 2 (total 20). The most
// frequent answer is 5, so the mode is 5, as in the book's answer.

const QUESTION =
  'Students listed the number of members in their household as follows: 6, 2, 5, 6, 3, 7, 5, 6, 5, 3, 4, 4, 5, 7, 6, 4, 5, 2, 1, 5. What is the mode?';

const COUNTS = [1, 2, 2, 3, 6, 4, 2];

const chart = (id: string) =>
  figure(id, [tallyChart({ head: ['Members', 'Tally', 'Frequency'], rows: COUNTS.map((count, i) => ({ label: String(i + 1), count })), widths: [3, 3.6, 3.2] })], 600);

const video: Explainer = {
  id: 'xq-m5-12-1',
  lessonId: '',
  exam: {
    lesson: 'm5-12-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.5, Averages and Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-5-averages-and-probability',
    question: QUESTION,
  },
  title: 'Exam Question: The Most Common Household Size (Frequency and the Mode)',
  thumbnailTitle: 'Which Answer Is Most Common?',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: 20 students listed how many people live in their household. What is the mode? We tally the answers in a frequency table: 5 appears 6 times, more than any other answer, so the mode is 5. Then we check the total and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Answer Is Most Common?', subtitle: 'Frequency and the mode, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding the mode. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Students listed the number of members in their household as follows: $6, 2, 5, 6, 3, 7, 5, 6, 5, 3, 4, 4, 5, 7, 6, 4, 5, 2, 1, 5$. What is the mode?',
          answer: '$5$',
          working: '5 appears 6 times, more than any other answer',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Students listed the number of members in their household as follows: 6, 2, 5, 6, 3, 7, 5, 6, 5, 3, 4, 4, 5, 7, 6, 4, 5, 2, 1, 5. What is the mode?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Household and mode', md: 'A **household** is the people who live together in one home. Each number is one student\'s answer. The **mode** is the answer that appears **most often**.' }],
      lines: [
        { say: 'A household is the people who live together in one home. Each number in the list is one student\'s answer.', show: 'c' },
        { say: 'The mode is the answer that appears most often. So we need to count how many times each answer appears.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Frequency', md: 'The **frequency** of an answer is **how many times** it appears. A **tally** keeps count: one mark for each answer, with every fifth mark drawn **across** the other four.' }],
      lines: [
        { say: 'Here is what we need. The frequency of an answer is how many times it appears.', show: 'c' },
        { say: 'A tally helps us count without losing our place: one mark for each answer, and every fifth mark goes across the other four.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Tally** each answer', 'Write each **frequency**', 'Pick the answer with the **highest** frequency'] }],
      lines: [
        { say: 'Here is the plan. Tally each answer.', show: 'plan.0' },
        { say: 'Write the frequency of each answer.', show: 'plan.1' },
        { say: 'Then pick the answer with the highest frequency.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Tally and count',
      layout: 'split',
      leftWidth: 620,
      left: [chart('c')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 + 2 + 2 + 3 + 6 + 4 + 2 = 20', '\\text{highest: } 6 \\text{ times}', '\\text{mode} = \\good{5}'] }],
      lines: [
        { say: 'Step one. Make a row for each answer, from 1 to 7. Go through the list once, and put a tally mark in the right row for each answer.', show: ['c.frame', 'c.names', 'c.tally0', 'c.tally1', 'c.tally2', 'c.tally3', 'c.tally4', 'c.tally5', 'c.tally6'] },
        { say: 'Step two. Count the marks to get each frequency. 1 appears once, 2 and 3 twice each, 4 three times, 5 six times, 6 four times, and 7 twice.', show: ['c.freqs', 'm.0'] },
        { say: 'Step three. The highest frequency is 6, in the row for 5 members.', show: ['c.hl4', 'm.1'], focus: 'm.1' },
        { say: 'So the mode is 5. The most common household size is 5 people.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 + 2 + 2 + 3 + 6 + 4 + 2 = 20 \\text{ answers} \\ \\checkmark', '6 > 4 > 3 > 2 > 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The frequencies add up to 20, and there are 20 numbers in the list, so we counted every answer exactly once.', show: 'm.0' },
        { say: 'And 6 is bigger than every other frequency, so 5 is the only mode. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$6$', 'that is the **frequency** of $5$: the mode is the **answer** itself'],
            ['$7$', 'the **largest** answer is not the most **common** one'],
            ['$4$', 'the **middle** of $1$ to $7$: count, do not guess'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Answering 6 gives how many times 5 appears. The mode is the answer that appears most, which is 5.' },
        { say: '7 is the largest answer in the list, but only 2 students gave it.' },
        { say: 'And 4 is the middle of 1 to 7. The mode comes from counting, not from the middle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The shoe sizes in a group are $4, 5, 5, 6, 4, 5, 7, 6, 5$. What is the mode?',
          choices: ['$4$', '$6$', '$5$', '$7$'],
          answer: 2,
          working: '4 appears 2 times, 5 appears 4 times, 6 appears 2 times, 7 appears once.',
        },
      ],
      lines: [
        { say: 'Your turn. The shoe sizes in a group are 4, 5, 5, 6, 4, 5, 7, 6, 5. What is the mode? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 appears twice, 5 appears 4 times, 6 appears twice, and 7 once. 5 appears most often. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Frequency**: how many times an answer appears', '**Tally** to count without losing your place', 'The **mode** is the most frequent answer', '**Check** that the frequencies add to the total'] }],
      lines: [
        { say: 'Here is what to remember. The frequency of an answer is how many times it appears.', show: 'sum.0' },
        { say: 'A tally helps you count without losing your place.', show: 'sum.1' },
        { say: 'The mode is the answer with the highest frequency, not the frequency itself.', show: 'sum.2' },
        { say: 'And check that the frequencies add up to the number of answers. For more on frequency and the mode, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
