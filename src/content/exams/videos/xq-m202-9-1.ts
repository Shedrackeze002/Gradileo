import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 9.1 (planning a research project). Gradileo wrote this one, in
// the style of a Grade 11 research project checkpoint, because the free OpenStax books have no
// questions on planning a research project. Malik's first question leads the reader ("Don't you
// agree") and assumes the answer, and it has no clear group, place, time or measurement; a good
// version asks about a measurable relationship in a named group, in neutral words. A survey Malik
// runs is primary data, and a published study or a national statistics table is secondary data.

const QUESTION =
  "Malik is planning a research project about sleep and school marks. Malik's first research question is: \"Don't you agree that students who stay up late get worse marks?\" (a) Give two problems with this research question. (b) Rewrite it as a good research question. (c) Name one source of primary data and one source of secondary data that Malik could use.";

const video: Explainer = {
  id: 'xq-m202-9-1',
  lessonId: '',
  exam: {
    lesson: 'm202-9-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 research project checkpoint',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Fixing a Research Question About Sleep and Marks (Planning a Research Project)',
  thumbnailTitle: 'Fix the Research Question',
  thumbnail: 'ok',
  summary:
    "An exam-style question, solved one small step at a time: Malik's research question, \"Don't you agree that students who stay up late get worse marks?\", has problems. We check it against the four marks of a good question, find that it is leading and not focused, rewrite it as a neutral, measurable question about one group, and name a primary and a secondary data source. Then we look at the traps.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fix the Research Question', subtitle: 'Planning a research project, step by step' }],
      lines: [
        { say: 'In this video, we solve a test question about planning a research project. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 research project checkpoint. It says so at the bottom of the screen the whole way through.' },
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
          prompt: "Malik is planning a research project about sleep and school marks. Malik's first research question is: \"Don't you agree that students who stay up late get worse marks?\" (a) Give two problems with this research question. (b) Rewrite it as a good research question. (c) Name one source of primary data and one source of secondary data that Malik could use.",
          answer: '(a) it is **leading** and **not focused** (b) a neutral, measurable question about one group (c) primary: Malik\'s own survey; secondary: a published study',
          working: 'Check the question against the four marks of a good research question: focused, measurable, interesting and neutral.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Malik is planning a research project about sleep and school marks. Malik\'s first research question is: "Don\'t you agree that students who stay up late get worse marks?"' },
        { say: 'Part "a": give two problems with this research question. Part b: rewrite it as a good research question. Part c: name one source of primary data and one source of secondary data that Malik could use.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Three jobs: **judge** the question, **fix** it, and say **where the data could come from**. The question is the plan for the whole project, so it has to be right first.' }],
      lines: [
        { say: 'There are three jobs here. Judge Malik\'s question, fix it, and say where the data could come from.', show: 't' },
        { say: 'The research question is the plan for the whole project. If it is weak, everything built on it is weak too.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'good', tone: 'key', title: 'A good research question is', md: '**Focused** (one group, place and time), **measurable** (data can answer it), **interesting**, and **neutral** (it does not assume the answer).' },
        { kind: 'callout', id: 'data', tone: 'definition', title: 'Primary and secondary data', md: '**Primary** data you collect yourself. **Secondary** data someone else collected.' },
      ],
      lines: [
        { say: 'Here is what we need. A good research question is focused on one group, place and time. It is measurable, so data can answer it. It is interesting. And it is neutral: its wording does not assume the answer.', show: 'good' },
        { say: 'And primary data is data you collect yourself. Secondary data was collected by someone else.', show: 'data' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Check the question against the **four marks**', '**Rewrite** it to fix each problem', 'Name a **primary** and a **secondary** source'] }],
      lines: [
        { say: 'Here is the plan. First, check Malik\'s question against the four marks of a good question.', show: 'plan.0' },
        { say: 'Second, rewrite it to fix each problem.', show: 'plan.1' },
        { say: 'Third, name a primary and a secondary data source.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Find the problems',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'check',
          head: ['Mark of a good question', "Malik's question"],
          rows: [
            ['**Neutral**', '"Don\'t you agree…" pushes people to say yes: **leading**'],
            ['**Focused**', 'which students? which school, which grade, when? **too vague**'],
            ['**Measurable**', '"stay up late" and "worse marks" are not measured'],
            ['**Interesting**', 'yes: sleep and marks matter to students'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Check each mark. Is it neutral? No. "Don\'t you agree" pushes people to say yes, and it assumes the answer before any data is collected. That is a leading question.', show: 'check' },
        { say: 'Is it focused? No. Which students? Which school, which grade, and when? It does not say.' },
        { say: 'Is it measurable? Not yet. "Stay up late" and "worse marks" are not numbers we can collect.' },
        { say: 'Is it interesting? Yes. So two clear problems are: it is leading, and it is not focused.' },
      ],
    },
    {
      chapter: 'Step 2: Rewrite it',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'new', tone: 'key', title: 'A good research question', md: '"Is there a relationship between the **number of hours of sleep** that **Grade 11 students at our school** get on **school nights** and their **marks on the final math exam**?"' },
      ],
      lines: [
        { say: 'Step two. Fix each problem. Name the group, place and time: Grade 11 students at our school, on school nights.', show: 'new' },
        { say: 'Choose things we can measure: the number of hours of sleep, and the marks on the final math exam.' },
        { say: 'And ask about a relationship in neutral words, without saying what the answer is. "Is there a relationship between…" lets the data decide.' },
      ],
    },
    {
      chapter: 'Step 3: Find the data',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'src',
          head: ['Kind of data', 'A source Malik could use'],
          rows: [
            ['**Primary**', 'a survey Malik runs of Grade 11 students, with permission, asking hours of sleep and exam marks'],
            ['**Secondary**', 'a published sleep study, or a table from the national statistics office'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. For primary data, Malik could run a survey of Grade 11 students, with permission, asking about their hours of sleep and their exam marks. Malik collects it, so it is primary.', show: 'src' },
        { say: 'For secondary data, Malik could use a published study about teenagers\' sleep, or a table from the national statistics office. Someone else collected it, so it is secondary.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ok', check: true, items: ['**Focused**: Grade 11, our school, school nights', '**Measurable**: hours of sleep, exam marks', '**Interesting**: it matters to students', '**Neutral**: "Is there a relationship…"'] }],
      lines: [
        { say: 'Let us check the new question against all four marks. It is focused: Grade 11 students at our school, on school nights.', show: 'ok.0' },
        { say: 'It is measurable: hours of sleep and exam marks are numbers.', show: 'ok.1' },
        { say: 'It is still interesting.', show: 'ok.2' },
        { say: 'And it is neutral: it asks whether there is a relationship, without assuming one. It passes every check.', show: 'ok.3' },
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
            ['"Do lazy students sleep in?"', 'a fix must remove **loaded** words too'],
            ['"How many hours do doctors recommend?"', 'one fact answers it: it is **not a research question**'],
            ['a published study as **primary**', 'someone else collected it, so it is **secondary**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A rewrite can still be biased. A loaded word like "lazy" tells people what to think, so take it out.' },
        { say: 'A question one fact can answer, like how many hours doctors recommend, is too small for a research project.' },
        { say: 'And a published study is secondary data, even when it is a very good source, because someone else collected it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is the best research question?',
          choices: [
            '"Is screen time bad for teenagers?"',
            '"Why do teenagers waste so much time on their phones?"',
            '"How many hours a day do teenagers use their phones?"',
            '"Is there a relationship between the daily screen time of Grade 11 students at our school and their hours of sleep?"',
          ],
          answer: 3,
          working: 'Only D is focused, measurable and neutral, and asks about a relationship. A is vague, B is loaded ("waste"), and C is answered by one number.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is the best research question? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"A" is vague. B uses the loaded word "waste". C is answered by a single number. D is focused, measurable and neutral: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Good questions are **focused**, **measurable**, **interesting** and **neutral**', 'Take out **leading** openings and **loaded** words', '**Primary**: you collect it; **secondary**: someone else did', 'Check your question against all four marks'] }],
      lines: [
        { say: 'Here is what to remember. A good research question is focused, measurable, interesting and neutral.', show: 'sum.0' },
        { say: 'Take out leading openings, like "Don\'t you agree", and loaded words.', show: 'sum.1' },
        { say: 'Primary data you collect yourself. Secondary data someone else collected.', show: 'sum.2' },
        { say: 'And check your question against all four marks. For more on planning a research project, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
