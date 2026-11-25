import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from '@/content/math6/videos/lib/m6-12-figures.ts';

// Exam question for Math 6 lesson 12.1 (relative frequency). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 8.2, Visualizing Data, CC BY-NC-SA 4.0).
// 16 students: Biology 6, Education 1, Political Science 3, Sociology 2, Undecided 4. Each
// proportion is the frequency over 16: 37.5%, 6.25%, 18.75%, 12.5% and 25%, which add to 100%.

const QUESTION =
  'In Your Turn 8.2, students in a statistics class were asked to provide their majors. Those results are again listed below: Undecided, Biology, Biology, Sociology, Political Science, Sociology, Undecided, Undecided, Undecided, Biology, Biology, Education, Biology, Biology, Political Science, Political Science. You created a frequency distribution: Major, Frequency; Biology, 6; Education, 1; Political Science, 3; Sociology, 2; Undecided, 4. Now, find the proportions associated with each category. Express your answers as percentages.';

const MAJORS: [string, string, number, string, 'adj' | 'opp' | 'good' | 'theta' | 'hyp'][] = [
  ['bio', 'Biology', 6, '37.5', 'adj'],
  ['edu', 'Education', 1, '6.25', 'opp'],
  ['pol', 'Political Science', 3, '18.75', 'good'],
  ['soc', 'Sociology', 2, '12.5', 'theta'],
  ['und', 'Undecided', 4, '25', 'hyp'],
];

const bar = (id: string) =>
  figure(
    id,
    [stackBar({ width: 16, whole: '16 \\text{ students} = 100\\%', parts: MAJORS.map(([k, , f, pc, tone]) => ({ id: k, value: f, tone, label: String(f), below: `${pc}\\%` })) })],
    220,
  );

const video: Explainer = {
  id: 'xq-m6-12-1',
  lessonId: '',
  exam: {
    lesson: 'm6-12-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.2, Visualizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-2-visualizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: Students\' Majors as Percentages (Relative Frequency)',
  thumbnailTitle: 'Majors as Percentages',
  thumbnail: 'sb',
  summary:
    'A real test question, solved one small step at a time: 16 students in a statistics class gave their majors: Biology 6, Education 1, Political Science 3, Sociology 2 and Undecided 4. Find the proportion in each category as a percentage. Add the frequencies to get the total, 16, then divide each frequency by 16 and multiply by 100: Biology 37.5%, Education 6.25%, Political Science 18.75%, Sociology 12.5% and Undecided 25%. Then we check that they add to 100% and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Majors as Percentages', subtitle: 'Relative frequency, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about relative frequency. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'In Your Turn 8.2, students in a statistics class were asked to provide their majors. Those results are again listed below: Undecided, Biology, Biology, Sociology, Political Science, Sociology, Undecided, Undecided, Undecided, Biology, Biology, Education, Biology, Biology, Political Science, Political Science. You created a frequency distribution: Biology $6$, Education $1$, Political Science $3$, Sociology $2$, Undecided $4$. Now, find the proportions associated with each category. Express your answers as percentages.',
          answer: 'Biology $37.5\\%$, Education $6.25\\%$, Political Science $18.75\\%$, Sociology $12.5\\%$, Undecided $25\\%$',
          working: 'each frequency ÷ 16 × 100',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Students in a statistics class were asked for their majors, the subject they study most. The book lists all 16 answers, and counts them in a frequency table: Biology 6, Education 1, Political Science 3, Sociology 2, and Undecided 4. Now, find the proportion for each category, and express the answers as percentages.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Frequency and proportion', md: 'The **frequency** of a category is **how many** answers fall in it. Its **proportion**, or **relative frequency**, is the **fraction of all** the answers that fall in it. As a **percentage**, it says how many out of every $100$.' }],
      lines: [
        { say: 'The frequency of a category is how many answers fall in it. Biology has a frequency of 6.', show: 'c' },
        { say: 'Its proportion, also called its relative frequency, is the fraction of all the answers that fall in it. As a percentage, it says how many out of every 100.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{relative frequency} = \\dfrac{\\text{frequency}}{\\text{total}}', '\\text{percentage} = \\dfrac{\\text{frequency}}{\\text{total}} \\times 100\\%'] }],
      lines: [
        { say: 'Here is what we need. The relative frequency is the frequency divided by the total number of answers.', show: 'm.0' },
        { say: 'To make it a percentage, multiply by 100.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the frequencies to find the total', '**Divide** each frequency by the total', 'Multiply by $100$ for a **percentage**'] }],
      lines: [
        { say: 'Here is the plan. Add the frequencies to find the total.', show: 'plan.0' },
        { say: 'Divide each frequency by the total.', show: 'plan.1' },
        { say: 'Then multiply by 100 to get a percentage.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide by the total',
      layout: 'center',
      main: [
        bar('sb'),
        { kind: 'table', id: 't', head: ['Major', 'Frequency', 'Proportion'], rows: MAJORS.map(([, name, f, pc]) => [name, `$${f}$`, `$\\tfrac{${f}}{16} = ${pc}\\%$`]) },
      ],
      lines: [
        { say: 'Step one. Add the frequencies: 6 plus 1 plus 3 plus 2 plus 4 is 16. There are 16 students in all.', show: ['sb.bio', 'sb.edu', 'sb.pol', 'sb.soc', 'sb.und', 'sb.whole'] },
        { say: 'Step two. Biology: 6 out of 16. 6 divided by 16 is 0.375, which is 37.5 percent.', show: 't.0', focus: ['sb.bio', 't.0'] },
        { say: 'Education: 1 divided by 16 is 0.0625, which is 6.25 percent.', show: 't.1', focus: ['sb.edu', 't.1'] },
        { say: 'Political Science: 3 divided by 16 is 0.1875, which is 18.75 percent.', show: 't.2', focus: ['sb.pol', 't.2'] },
        { say: 'Sociology: 2 divided by 16 is 0.125, which is 12.5 percent.', show: 't.3', focus: ['sb.soc', 't.3'] },
        { say: 'Undecided: 4 divided by 16 is 0.25, which is 25 percent.', show: 't.4', focus: ['sb.und', 't.4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['37.5 + 6.25 + 18.75 + 12.5 + 25', '= 100\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The parts make one whole class, so the percentages must add up to 100.', show: 'm.0' },
        { say: '37.5 plus 6.25 plus 18.75 plus 12.5 plus 25 is 100 percent. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Biology $6\\%$', 'wrote the **frequency** as a percent: divide by $16$ first'],
            ['Biology $\\tfrac{6}{5}$', 'divided by the **number of categories**: divide by the number of **students**'],
            ['Biology $0.375\\%$', 'forgot to multiply by $100$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 percent just puts a percent sign on the frequency. 6 out of 16 is not 6 out of 100.' },
        { say: '6 over 5 divides by the 5 categories. Divide by the 16 students instead.' },
        { say: 'And 0.375 percent forgets to multiply by 100. 0.375 is 37.5 percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a class of $20$ students, $5$ walk to school. What percentage of the class walks?',
          choices: ['$5\\%$', '$20\\%$', '$4\\%$', '$25\\%$'],
          answer: 3,
          working: '5 ÷ 20 = 0.25, and 0.25 × 100 = 25%.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of 20 students, 5 walk to school. What percentage of the class walks? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '5 divided by 20 is 0.25, and times 100 is 25 percent. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Add** the frequencies for the total', 'Relative frequency $= \\dfrac{\\text{frequency}}{\\text{total}}$', 'Multiply by $100$ for a **percentage**', 'All the parts add to $100\\%$'] }],
      lines: [
        { say: 'Here is what to remember. Add the frequencies to find the total.', show: 'sum.0' },
        { say: 'The relative frequency is the frequency divided by the total.', show: 'sum.1' },
        { say: 'Multiply by 100 to make it a percentage.', show: 'sum.2' },
        { say: 'And all the parts add up to 100 percent. For more on relative frequency, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
