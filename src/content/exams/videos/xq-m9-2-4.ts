import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shareTree } from '@/content/math9/videos/lib/m9-2-figures.ts';

// Exam question for Math 9 lesson 2.4 (using exponents to solve problems). The free textbooks we
// use have no question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit
// test. 3 hours = 180 minutes = 9 periods of 20 minutes, so the cell doubles 9 times: 2⁹ = 512.
// Check: 1 hour is 3 doublings (2³ = 8), and 3 hours is 8 × 8 × 8 = 512.

const QUESTION =
  'A colony of bacteria starts with 1 cell. The number of cells doubles every 20 minutes. (a) Write the number of cells after 3 hours as a power of 2. (b) How many cells is that?';

const tree = (id: string) =>
  figure(
    id,
    [
      shareTree({
        k: 2,
        rounds: 4,
        width: 12,
        top: '\\text{start: } 1',
        labels: ['20 \\text{ min: } 2^1 = 2', '40 \\text{ min: } 2^2 = 4', '60 \\text{ min: } 2^3 = 8', '80 \\text{ min: } 2^4 = 16'],
        tones: ['adj', 'opp', 'good', 'theta'],
      }),
    ],
    430,
  );

const video: Explainer = {
  id: 'xq-m9-2-4',
  lessonId: '',
  exam: {
    lesson: 'm9-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Doubling Bacteria (Using Exponents to Solve Problems)',
  thumbnailTitle: 'Doubling Bacteria',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: a colony of bacteria starts with 1 cell and doubles every 20 minutes. (a) Write the number of cells after 3 hours as a power of 2. (b) How many cells is that? 3 hours is 180 minutes, which is 9 periods of 20 minutes, so the cells double 9 times: 2⁹. And 2⁹ = 512 cells. Then we check hour by hour and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Doubling Bacteria', subtitle: 'Using exponents to solve problems, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about using exponents to solve problems. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A colony of bacteria starts with $1$ cell. The number of cells doubles every $20$ minutes. (a) Write the number of cells after $3$ hours as a power of $2$. (b) How many cells is that?',
          answer: '(a) $2^9$ (b) $512$ cells',
          working: '180 ÷ 20 = 9 doublings',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A colony of bacteria starts with 1 cell. The number of cells doubles every 20 minutes. Part a: write the number of cells after 3 hours as a power of 2. Part b: how many cells is that?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [tree('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Doubling', md: 'To **double** is to multiply by $2$. Each time the cells double, we multiply by **one more** factor of $2$.' }],
      lines: [
        { say: 'Here is how the colony grows. It starts with 1 cell.', show: 'ask.root' },
        { say: 'After 20 minutes, that cell has become 2. After 40 minutes, each of those has become 2, so there are 4. Then 8, then 16.', show: ['ask.round1', 'ask.label1', 'ask.round2', 'ask.label2', 'ask.round3', 'ask.label3', 'ask.round4', 'ask.label4'] },
        { say: 'To double is to multiply by 2. Each time the cells double, we multiply by one more factor of 2.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cells} = 2^{\\,\\text{number of doublings}}', '1 \\text{ hour} = 60 \\text{ minutes}'] }],
      lines: [
        { say: 'Here is what we need. Starting from 1 cell, the number of cells is 2 to the power of the number of doublings.', show: 'm.0' },
        { say: 'And 1 hour is 60 minutes.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $3$ hours to **minutes**', 'Count the **doublings**', 'Write the **power**, then work it out'] }],
      lines: [
        { say: 'Here is the plan. Change 3 hours to minutes.', show: 'plan.0' },
        { say: 'Count how many times the cells double.', show: 'plan.1' },
        { say: 'Write the power of 2, then work it out.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Count the doublings',
      layout: 'split',
      leftWidth: 620,
      left: [tree('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 60 = 180 \\text{ min}', '180 \\div 20 = 9 \\text{ doublings}', '\\text{(a) } \\good{2^9}', '\\text{(b) } 2^9 = \\good{512}'] }],
      lines: [
        { say: 'Here is the colony again: 1 cell, then 2, 4, 8 and 16.', show: ['st.root', 'st.round1', 'st.label1', 'st.round2', 'st.label2', 'st.round3', 'st.label3', 'st.round4', 'st.label4'] },
        { say: 'Step one. 3 hours is 3 times 60, which is 180 minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The cells double every 20 minutes. 180 divided by 20 is 9. So the cells double 9 times.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 9 doublings is 9 factors of 2. So part a is 2 to the power of 9.', show: 'm.2', focus: 'm.2' },
        { say: 'For part b, keep doubling: 16, 32, 64, 128, 256, 512. That is 512 cells.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ hour} = 3 \\text{ doublings: } \\times 2^3 = \\times 8', '1 \\times 8 \\times 8 \\times 8 = 512 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check hour by hour. In 1 hour, the cells double 3 times, so they multiply by 2 cubed, which is 8.', show: 'm.0', focus: 'm.0' },
        { say: 'Over 3 hours, that is 8, times 8, times 8. 8 times 8 is 64, and 64 times 8 is 512. The same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$2^3 = 8$', 'used **hours**: it doubles every $20$ **minutes**'],
            ['$2 \\times 9 = 18$', 'multiplied by $9$: doubling $9$ times is $2^9$'],
            ['$9^2 = 81$', 'swapped base and exponent: the base is the **doubling**, $2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 cubed, or 8, counts hours. But the cells double every 20 minutes, so there are 9 doublings, not 3.' },
        { say: '18 is 2 times 9. But doubling 9 times means 9 factors of 2, which is 2 to the power of 9.' },
        { say: 'And 9 squared swaps the base and the exponent. The base is the 2 from doubling. The exponent is the 9 doublings.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rumour starts with $1$ person. Every hour, each person who knows it tells $3$ new people, so the number who just heard it triples. How many people hear it in hour $4$?',
          choices: ['$12$', '$64$', '$81$', '$27$'],
          answer: 2,
          working: 'Hour 4: 3⁴ = 3 × 3 × 3 × 3 = 81.',
        },
      ],
      lines: [
        { say: 'Your turn. A rumour starts with 1 person. Every hour, each person who just heard it tells 3 new people, so the number who just heard it triples. How many people hear it in hour 4? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'In hour 4, it is 3 to the power of 4: 3 times 3 is 9, times 3 is 27, times 3 is 81. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Doubling: multiply by **2** each time', 'Count the **number** of doublings', 'That number is the **exponent**', 'Check in **bigger steps**'] }],
      lines: [
        { say: 'Here is what to remember. Doubling multiplies by 2 each time.', show: 'sum.0' },
        { say: 'Count how many times it happens, using the same units as the question.', show: 'sum.1' },
        { say: 'That number is the exponent.', show: 'sum.2' },
        { say: 'And you can check in bigger steps, like hour by hour. For more on using exponents to solve problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
