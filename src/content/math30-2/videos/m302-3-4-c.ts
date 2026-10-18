import type { Explainer, TableEl } from '@/video/script.ts';

const jobs = (id: string): TableEl => ({
  kind: 'table',
  id,
  head: ['', 'Job', 'No job', 'Total'],
  rows: [
    ['Grade 11', '18', '42', '60'],
    ['Grade 12', '36', '24', '60'],
    ['Total', '54', '66', '120'],
  ],
});

const video: Explainer = {
  id: 'm302-3-4-c',
  lessonId: 'm302-3-4',
  title: 'Independent and Dependent Events, Part 3: Conditional Probability from a Table',
  thumbnailTitle: 'Conditional Probability',
  thumbnail: false,
  summary: 'Conditional probability from a two-way table, P(B | A) = P(A and B)/P(A): of 120 students, P(job | Grade 12) = 36/60 = 0.6, which is not P(job) = 0.45, so the events are dependent; and why P(job | Grade 12) and P(Grade 12 | job) are different.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Conditional Probability from a Table', subtitle: '“Given that” means one row or one column' }],
      lines: [
        { say: 'Is a Grade 12 student more likely to have a part-time job than a student chosen from the whole school? A two-way table can answer questions like this.', show: 'title' },
        { say: 'In this video, you will find a conditional probability from a two-way table, and use it to test whether two events are independent.' },
      ],
    },
    {
      chapter: 'Given that',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B \\mid A)', 'P(B \\mid A) = \\dfrac{P(A \\text{ and } B)}{P(A)}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Given that', md: '“Given that $A$ happened” means you look only at the outcomes where $A$ happened. In a two-way table, use only that row or that column.' },
      ],
      lines: [
        { say: 'Start from the rule for dependent events: P of A and B equals P of A, times P of B given A.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by P of A, and you have a formula for a conditional probability: P of B given A equals P of A and B, over P of A.', show: 'm.1', focus: 'm.1' },
        { say: '“Given that A happened” means you look only at the outcomes where A happened, and ignore the rest. In a two-way table, that means using only one row, or only one column.', show: 'key' },
      ],
    },
    {
      chapter: 'Part-time jobs',
      layout: 'split',
      leftWidth: 450,
      left: [jobs('t')],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'The table shows whether 120 students at a high school have a part-time job. Given that a student is in Grade 12, what is the probability that the student has a job?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{job} \\mid \\text{Grade 12}) = \\dfrac{36}{60} = 0.6', '\\dfrac{P(\\text{Grade 12 and job})}{P(\\text{Grade 12})} = \\dfrac{36/120}{60/120}'] },
      ],
      lines: [
        { say: 'The table shows whether 120 students at a high school have a part-time job. Each row is a grade, each column says whether the student has a job, and the totals are at the ends.', show: ['p', 't'] },
        { say: 'Given that a student is in Grade 12, what is the probability that the student has a job?' },
        { say: 'We already know the student is in Grade 12, so use only the Grade 12 row. Thirty-six of its sixty students have a job.', focus: 't.1' },
        { say: 'So P of job given Grade 12 is thirty-six sixtieths, which is 0.6.', show: 'm.0', focus: 'm.0' },
        { say: 'The formula gives the same answer. P of Grade 12 and job is thirty-six over 120, and P of Grade 12 is sixty over 120. When you divide, the 120s cancel, leaving thirty-six over sixty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Are they independent?',
      layout: 'split',
      leftWidth: 450,
      left: [jobs('t')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{job}) = \\dfrac{54}{120} = 0.45', 'P(\\text{job} \\mid \\text{Grade 12}) = 0.6 \\ne 0.45', '\\text{so the events are dependent}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Testing for independence', md: 'Events are independent when $P(B \\mid A) = P(B)$, which is the same as $P(A \\text{ and } B) = P(A) \\times P(B)$.' },
      ],
      lines: [
        { say: 'Are “in Grade 12” and “has a job” independent events?', show: 't' },
        { say: 'Among all the students, fifty-four of 120 have a job. So P of job is 0.45.', show: 'm.0', focus: ['m.0', 't.2'] },
        { say: 'But among Grade 12 students, the probability is 0.6. Knowing the grade changes the probability of having a job, so the events are dependent.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 't.1'] },
        { say: 'In general, events are independent when P of B given A equals P of B: knowing that A happened makes no difference.', show: 'tip' },
        { say: 'That is the same as checking whether P of A and B equals P of A times P of B. Here, P of Grade 12 times P of job is 0.5 times 0.45, or 0.225. But P of Grade 12 and job is thirty-six over 120, or 0.3. They are different, so again, the events are dependent.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 450,
      left: [jobs('t')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which event is given?', md: '$P(\\text{job} \\mid \\text{Grade 12})$ uses the Grade 12 **row**. $P(\\text{Grade 12} \\mid \\text{job})$ uses the Job **column**. They are different.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{job} \\mid \\text{Grade 12}) = \\dfrac{36}{60} = 0.6', 'P(\\text{Grade 12} \\mid \\text{job}) = \\dfrac{36}{54} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'A common mistake is to use the wrong row or column. Always find which event is given: it comes after the word “given”, or after the bar.', show: ['t', 'oops'] },
        { say: 'P of job given Grade 12 uses only the Grade 12 row: thirty-six out of sixty.', show: 'm.0', focus: ['m.0', 't.1'] },
        { say: 'P of Grade 12 given job is a different question. It uses only the students with a job: the Job column. Thirty-six of those fifty-four are in Grade 12, which is two thirds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Of 120 students, 66 have no job. Of those 66, 42 are in Grade 11. Given that a student has no job, what is the probability that the student is in Grade 11?',
          choices: ['$\\dfrac{7}{20}$', '$\\dfrac{7}{11}$', '$\\dfrac{7}{10}$', '$\\dfrac{11}{20}$'],
          answer: 1,
          working: 'Use only the 66 students with no job: $P(\\text{Grade 11} \\mid \\text{no job}) = \\dfrac{42}{66} = \\dfrac{7}{11}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Of 120 students, sixty-six have no job. Of those sixty-six, forty-two are in Grade 11. Given that a student has no job, what is the probability that the student is in Grade 11? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, seven elevenths. Given that the student has no job, use only the sixty-six students with no job. Forty-two of them are in Grade 11, and forty-two over sixty-six is seven elevenths. Choice A, seven twentieths, is forty-two over all 120 students: it ignores the word “given”.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$P(B \\mid A) = \\dfrac{P(A \\text{ and } B)}{P(A)}$: in a table, use only the given row or column.', 'Events are independent when $P(B \\mid A) = P(B)$.', '$P(B \\mid A)$ and $P(A \\mid B)$ are different: check which event is given.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. P of B given A is P of A and B over P of A. In a table, use only the row or column of the event that is given.', show: 'sum.0' },
        { say: 'Events are independent when P of B given A equals P of B.', show: 'sum.1' },
        { say: 'And P of B given A and P of A given B are different, so check which event is given. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
