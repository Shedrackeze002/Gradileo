import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note, picks } from '@/content/math9/videos/lib/m9-10-figures.ts';

// Exam question for Math 9 lesson 10.2 (populations and samples). The question is a Try It from
// OpenStax Introductory Statistics 2e, word for word (section 1.2, Data, Sampling, and Variation in
// Data and Sampling, CC BY-NC-SA 4.0). The school is split into four groups (the grades) and the
// same number is chosen from every group, so it is stratified sampling, not cluster sampling.

const QUESTION =
  'Determine the type of sampling used (simple random, stratified, systematic, cluster, or convenience). A high school principal polls 50 first-year students, 50 sophomores, 50 juniors, and 50 seniors regarding policy changes for after school activities.';

// The school as 40 dots, one grade to a row of 10, each row its own colour.
const GROUPS = [
  { id: 'g0', tone: 'adj' as const },
  { id: 'g1', tone: 'opp' as const },
  { id: 'g2', tone: 'good' as const },
  { id: 'g3', tone: 'hyp' as const },
];
const NAMES = ['first-year', 'sophomore', 'junior', 'senior'];
// Stratified: 2 from every row. Cluster (the trap): every student in rows 2 and 4.
const STRATIFIED = [3, 8, 11, 17, 22, 25, 31, 36];

const school = (id: string, cluster: boolean) =>
  figure(
    id,
    [
      join(
        crowd({ count: 40, cols: 10, groups: GROUPS, groupOf: (i) => `g${Math.floor(i / 10)}` }),
        ...NAMES.map((tex, r) => note({ id: `name${r}`, at: [-3.8, -r], tex: `\\small\\text{${tex}}`, place: 'right', group: 'names' })),
        cluster ? join(lasso({ id: 'c1', c: [4.5, -1], rx: 5.0, ry: 0.62 }), lasso({ id: 'c3', c: [4.5, -3], rx: 5.0, ry: 0.62 })) : picks({ id: 'pick', which: STRATIFIED, cols: 10 }),
      ),
    ],
    360,
  );

const BASE = (id: string) => [`${id}.g0`, `${id}.g1`, `${id}.g2`, `${id}.g3`, `${id}.names`];

const video: Explainer = {
  id: 'xq-m9-10-2',
  lessonId: '',
  exam: {
    lesson: 'm9-10-2',
    source: 'OpenStax, Introductory Statistics 2e, Try It in section 1.2, Data, Sampling, and Variation in Data and Sampling',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling',
    question: QUESTION,
  },
  title: 'Exam Question: Which Kind of Sample? (Populations and Samples)',
  thumbnailTitle: 'Which Kind of Sample?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: determine the type of sampling used (simple random, stratified, systematic, cluster, or convenience). A high school principal polls 50 first-year students, 50 sophomores, 50 juniors, and 50 seniors about policy changes for after school activities. The school is split into four groups, the grades, and the principal chooses 50 students from every group. That is stratified sampling. It is not cluster sampling, which would ask everyone in only some of the groups. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Kind of Sample?', subtitle: 'Populations and samples, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about populations and samples. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Introductory Statistics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Determine the type of sampling used (simple random, stratified, systematic, cluster, or convenience). A high school principal polls $50$ first-year students, $50$ sophomores, $50$ juniors, and $50$ seniors regarding policy changes for after school activities.',
          answer: 'stratified sampling',
          working: 'four groups (the grades), 50 from each',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Determine the type of sampling used: simple random, stratified, systematic, cluster, or convenience. A high school principal polls 50 first-year students, 50 sophomores, 50 juniors, and 50 seniors, regarding policy changes for after school activities.', caption: 'Determine the type of sampling used (simple random, stratified, systematic, cluster, or convenience). A high school principal polls 50 first-year students, 50 sophomores, 50 juniors, and 50 seniors regarding policy changes for after school activities.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [school('ask', false), { kind: 'callout', id: 'c', tone: 'definition', title: 'Four grades', md: 'First-year students, sophomores, juniors and seniors are the **four grades** of an American high school. The principal polls **50** from **each** one.' }],
      lines: [
        { say: 'Here is the school, one row for each grade. First-year students, sophomores, juniors and seniors are the four grades of an American high school.', show: [...BASE('ask'), 'c'] },
        { say: 'The question asks which method the principal used to choose the students.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Sampling', 'How the sample is chosen'],
          rows: [
            ['simple random', 'any members, purely **by chance**'],
            ['stratified', 'split into groups; choose **some from every** group'],
            ['cluster', 'split into groups; ask **everyone** in **some** groups'],
            ['systematic', 'every $n$th member of a **list**'],
            ['convenience', 'whoever is **easy** to reach'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: the five kinds of sampling. In a simple random sample, members are chosen purely by chance.', show: 'kinds' },
        { say: 'In a stratified sample, the population is split into groups, and some members are chosen from every group. In a cluster sample, it is split into groups, and everyone in some of the groups is asked.' },
        { say: 'In a systematic sample, every "n"th member of a list is chosen. And a convenience sample asks whoever is easy to reach.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Is the population split into **groups**?', 'Are **some** chosen from **every** group?', 'Or **everyone** in some groups?'] }],
      lines: [
        { say: 'Here is the plan. Is the population split into groups?', show: 'plan.0' },
        { say: 'If so, are some members chosen from every group?', show: 'plan.1' },
        { say: 'Or is everyone in only some groups asked?', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Groups, then picks',
      layout: 'split',
      leftWidth: 760,
      left: [school('st', false)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{groups: } 4 \\text{ grades}', '50 \\text{ from } \\textbf{every} \\text{ grade}', '\\good{\\text{stratified}}'] }],
      lines: [
        { say: 'Here is the school again.', show: BASE('st') },
        { say: 'Step one. The students are split into four groups: the grades.', show: 'm.0', focus: ['m.0', 'st.names'] },
        { say: 'Step two. The principal chooses 50 students from every grade, not all of any grade.', show: ['m.1', 'st.pick'], focus: ['m.1', 'st.pick'] },
        { say: 'Step three. Split into groups, and some chosen from every group: that is stratified sampling.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['50 + 50 + 50 + 50 = 200', '\\text{every grade is in the sample} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The sample is 50 plus 50 plus 50 plus 50, which is 200 students.', show: 'm.0', focus: 'm.0' },
        { say: 'And every grade is in it, the same number from each. That is what stratified sampling gives. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        school('tr', true),
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['cluster', 'would ask **everyone** in **some** grades'],
            ['simple random', 'the picks were made **grade by grade**'],
            ['systematic', 'no "every $n$th" **list** was used'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Cluster sampling also uses groups, but it would ask everyone in only some of the grades, like these two rows. The principal asked some students from every grade.', show: [...BASE('tr'), 'tr.c1', 'tr.c3'], focus: ['tr.c1', 'tr.c3'] },
        { say: 'Simple random would choose any 200 students from the whole school at once. Here, the picks were made grade by grade.' },
        { say: 'And systematic sampling takes every "n"th name from a list. Nothing like that happened here.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A store manager surveys every $10$th customer who comes through the door. What type of sampling is this?',
          choices: ['convenience', 'stratified', 'systematic', 'cluster'],
          answer: 2,
          working: 'Every 10th customer in order: systematic.',
        },
      ],
      lines: [
        { say: 'Your turn. A store manager surveys every 10th customer who comes through the door. What type of sampling is this? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Every 10th customer, in the order they arrive, is a systematic sample. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Look for **groups** in the population', 'Some from **every** group: **stratified**', 'Everyone in **some** groups: **cluster**', 'Every $n$th: **systematic**'] }],
      lines: [
        { say: 'Here is what to remember. Look for groups in the population.', show: 'sum.0' },
        { say: 'Some members from every group is stratified sampling.', show: 'sum.1' },
        { say: 'Everyone in only some groups is cluster sampling.', show: 'sum.2' },
        { say: 'And every "n"th member of a list is systematic. For more on populations and samples, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
