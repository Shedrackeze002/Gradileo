import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 8.2 (the mathematics research project). Gradileo wrote this
// one, in the style of a Grade 12 research project checkpoint, because the free OpenStax books have
// no questions on planning a research project. The plan's sample (20 co-workers at the student's
// grocery store) is a convenience sample in which everyone has a job, so there is no one without a
// job to compare with, and many may not be students at all. The fix is a random sample from the
// whole grade, and the loaded, vague words "part-time jobs hurt marks" are made measurable.

const QUESTION =
  'A student plans a research project on the question "Do part-time jobs hurt students\' marks?" They plan to survey 20 of their co-workers at the grocery store where they work. (a) Describe one source of bias in this plan. (b) Suggest a better way to choose who to survey. (c) Rewrite the question so that it can be measured.';

const video: Explainer = {
  id: 'xq-m302-8-2',
  lessonId: '',
  exam: {
    lesson: 'm302-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 research project checkpoint',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Fix a Research Plan About Part-Time Jobs and Marks (The Mathematics Research Project)',
  thumbnailTitle: 'Fix the Research Plan',
  thumbnail: 'cmp',
  summary:
    'An exam-style question, solved one small step at a time: a student wants to research whether part-time jobs hurt students\' marks, by surveying 20 co-workers at the grocery store where they work. We find the bias (everyone in the sample has a job, and many may not be students), fix it with a random sample from the whole grade, and rewrite the question so that work hours and marks can be measured. Then we check the new plan and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fix the Research Plan', subtitle: 'The mathematics research project, step by step' }],
      lines: [
        { say: 'In this video, we solve a test question about planning a mathematics research project. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 research project checkpoint. It says so at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '(a) Everyone surveyed has a job, and many may not be students. (b) A random sample from the whole grade. (c) For example: "Is there a relationship between hours worked per week and average mark?"',
          working: 'Who is in the sample? Can each word in the question be counted or measured?',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A student plans a research project on the question: do part-time jobs hurt students\' marks? They plan to survey 20 of their co-workers at the grocery store where they work.' },
        { say: 'Part "a": describe one source of bias in this plan. Part b: suggest a better way to choose who to survey. Part c: rewrite the question so that it can be measured.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The student wants to say something about **all** students. Is the plan **fair**, and is the question **clear enough** to answer with numbers?' }],
      lines: [
        { say: 'The student wants to learn something about all students, not just a few.', show: 't' },
        { say: 'So we check two things: is the plan for collecting data fair, and is the question clear enough to answer with numbers?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bias', tone: 'definition', title: 'Bias', md: 'A plan is **biased** when it favours some answers, for example when the sample does not **represent** the population.' },
        { kind: 'callout', id: 'rand', tone: 'key', title: 'Random sample', md: 'Every member of the population has the **same chance** of being chosen.' },
        { kind: 'callout', id: 'meas', tone: 'tip', title: 'A measurable question', md: 'Every key word can be **counted** or **measured**, with units.' },
      ],
      lines: [
        { say: 'Here is what we need. A plan is biased when it favours some answers. One common cause is a sample that does not represent the whole population.', show: 'bias' },
        { say: 'In a random sample, every member of the population has the same chance of being chosen.', show: 'rand' },
        { say: 'And a measurable question uses words we can count or measure, with units.', show: 'meas' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **bias**: who is in the sample?', 'Choose a **better** sample', 'Make each key word **measurable**'] }],
      lines: [
        { say: 'Here is the plan. First, find the bias by asking who is in the sample.', show: 'plan.0' },
        { say: 'Second, choose a better sample.', show: 'plan.1' },
        { say: 'Third, make each key word in the question measurable.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The bias',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'who',
          head: ['The sample', 'Why it is biased'],
          rows: [
            ['**co-workers** of the student', 'chosen because they are **easy to ask**'],
            ['**everyone** has a job', 'no one **without** a job to compare with'],
            ['workers at one store', 'many may be adults, or not at **our school**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Look at who is in the sample. They are the student\'s co-workers, chosen because they are easy to ask. This is called a convenience sample.', show: 'who' },
        { say: 'Everyone in it has a job. To see whether jobs make a difference, we need students without jobs too, to compare with.' },
        { say: 'And many co-workers may be adults, or go to other schools. So the sample does not represent the students we want to learn about. That is the bias.' },
      ],
    },
    {
      chapter: 'Step 2: A better sample',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Get a list of **every** Grade 12 student, and use a **random number generator** to choose, say, $60$ of them: some **with** jobs and some **without**.' }],
      lines: [
        { say: 'Step two. Start from a list of every Grade 12 student in the school.', show: 't' },
        { say: 'Then use a random number generator to choose, say, 60 of them. Now every student has the same chance of being chosen, and the sample will include students with jobs and without.' },
      ],
    },
    {
      chapter: 'Step 3: A measurable question',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'cmp',
          head: ['Vague', 'Measurable'],
          rows: [
            ['"part-time jobs"', '**hours** worked per week at a paid job'],
            ['"hurt marks"', 'average **mark** (%) in core courses'],
            ['"students"', 'Grade 12 students at **our school**'],
          ],
        },
        { kind: 'text', id: 'q3', size: 'md', md: '"Is there a **relationship** between hours worked per week at a paid job and average mark for Grade 12 students at our school?"' },
      ],
      lines: [
        { say: 'Step three. Make every key word measurable. "Part-time jobs" becomes the hours worked per week at a paid job.', show: 'cmp' },
        { say: '"Marks" becomes the average mark, as a percent, in core courses. And "students" becomes Grade 12 students at our school.' },
        { say: 'Put together: is there a relationship between hours worked per week at a paid job and average mark for Grade 12 students at our school?', show: 'q3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'chk', check: true, items: ['Does the sample **represent** the population?', 'Was it chosen **randomly**?', 'Can every key word be **measured**?', 'Is there a group to **compare** with?'] }],
      lines: [
        { say: 'Let us check the new plan against a short list. Does the sample represent the population? Yes: it is drawn from all Grade 12 students.', show: 'chk.0' },
        { say: 'Was it chosen randomly? Yes: a random number generator chose it.', show: 'chk.1' },
        { say: 'Can every key word be measured? Yes: hours and percents.', show: 'chk.2' },
        { say: 'And is there a group to compare with? Yes: students who work no hours, and students who work many. The new plan passes.', show: 'chk.3' },
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
            ['"just ask more co-workers"', 'still **not random**, and still **all** have jobs'],
            ['"Do jobs **cause** lower marks?"', 'a survey shows a **relationship**, not a cause'],
            ['keeping the word "hurt"', 'it **assumes** the answer: ask about a relationship'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Asking more co-workers makes the sample bigger, but it is still not random, and everyone in it still has a job.' },
        { say: 'A survey can show that work hours and marks go together, but not that one causes the other. So ask about a relationship.' },
        { say: 'And the word "hurt" already assumes the answer. A fair question does not tell people what to think.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which research question is easiest to answer with numbers?',
          choices: ['Is social media bad for teenagers?', 'How many hours per week do Grade 12 students at our school spend on social media?', 'Why do people like music?', 'Is our school the best school?'],
          answer: 1,
          working: 'It names the population and a measurable quantity, with units.',
        },
      ],
      lines: [
        { say: 'Your turn. Which research question is easiest to answer with numbers? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Choice B names the population, Grade 12 students at our school, and something we can measure: hours per week. The others use words like bad, why and best, which cannot be measured.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A sample of co-workers, friends or one group is **biased**', 'Use a **random** sample from the whole population', 'Make every key word **measurable**, and leave out loaded words', 'A survey shows a **relationship**, not a cause'] }],
      lines: [
        { say: 'Here is what to remember. A sample of co-workers, friends, or one group is biased.', show: 'sum.0' },
        { say: 'Use a random sample from the whole population.', show: 'sum.1' },
        { say: 'Make every key word in the question measurable, and leave out loaded words like "hurt".', show: 'sum.2' },
        { say: 'And a survey shows a relationship, not a cause. For more on the mathematics research project, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
