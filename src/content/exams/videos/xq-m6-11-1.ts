import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from '@/content/math6/videos/lib/m6-11-figures.ts';

// Exam question for Math 6 lesson 11.1 (independent and dependent variables). The free OpenStax
// books have no question like this at this level, so this one is written by Gradileo in the style
// of a Grade 6 mathematics unit test. Maya reads 15 pages every day: the number of days d is
// chosen freely (independent), and the pages read p depend on it (dependent). p = 15, 30, 45, 60.

const QUESTION =
  'Maya reads 15 pages of a book every day. Let d be the number of days and p be the total number of pages she has read. (a) Which is the independent variable, and which is the dependent variable? (b) Complete the table of values for d = 1, 2, 3 and 4.';

const DAYS = [1, 2, 3, 4];

const reader = (id: string) =>
  figure(id, [machine({ steps: ['\\times 15'], titles: ['d', 'p'], sets: DAYS.map((d) => ({ in: String(d), out: String(15 * d) })) })], 260);

const video: Explainer = {
  id: 'xq-m6-11-1',
  lessonId: '',
  exam: {
    lesson: 'm6-11-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Days and Pages, Which Variable Depends? (Independent and Dependent Variables)',
  thumbnailTitle: 'Which Variable Depends?',
  thumbnail: 'rd',
  summary:
    'An exam-style question, solved one small step at a time: Maya reads 15 pages every day. With d days and p pages read, which is the independent variable and which is the dependent variable, and what are the values of p for d = 1, 2, 3 and 4? The pages depend on the days, so d is independent and p is dependent. Each day adds 15 pages, so p is 15, 30, 45 and 60. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Variable Depends?', subtitle: 'Independent and dependent variables, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about independent and dependent variables. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Maya reads $15$ pages of a book every day. Let $d$ be the number of days and $p$ be the total number of pages she has read. (a) Which is the independent variable, and which is the dependent variable? (b) Complete the table of values for $d = 1, 2, 3$ and $4$.',
          answer: '(a) $d$ is independent, $p$ is dependent (b) $p = 15, 30, 45, 60$',
          working: 'the pages depend on the days; p = 15 × d',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Maya reads 15 pages of a book every day. Let "d" be the number of days, and "p" be the total number of pages she has read. Part a. Which is the independent variable, and which is the dependent variable? Part b. Complete the table of values for "d" equals 1, 2, 3 and 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two variables', md: 'A **variable** is a letter for a number that can change. Here $d$ is the number of **days** and $p$ is the number of **pages** read so far. Both change as Maya keeps reading.' }],
      lines: [
        { say: 'A variable is a letter for a number that can change.', show: 'c' },
        { say: 'Here "d" is the number of days, and "p" is the total number of pages read so far. Both change as Maya keeps reading.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Variable', 'What it does', 'Question to ask'], rows: [['**independent**', 'changes **on its own**: we choose it', 'What do we choose?'], ['**dependent**', 'changes **because of** the other', 'What depends on it?']] }],
      lines: [
        { say: 'Here is what we need. The independent variable changes on its own. It is the one we choose.', show: 't.0' },
        { say: 'The dependent variable changes because of the other one. Its value depends on the independent variable.', show: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Ask: which one **depends** on the other?', 'Find the **rule**: pages for each day', 'Use the rule to **fill the table**'] }],
      lines: [
        { say: 'Here is the plan. Ask which variable depends on the other.', show: 'plan.0' },
        { say: 'Find the rule that turns days into pages.', show: 'plan.1' },
        { say: 'Then use the rule to fill the table.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Name the variables',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pages read depend on days spent reading}', 'd: \\good{\\text{independent}}, \\quad p: \\good{\\text{dependent}}'] }],
      lines: [
        { say: 'Step one. Does the number of pages depend on the number of days, or the other way round? The more days Maya reads, the more pages she has read. The pages depend on the days.', show: 'm.0', focus: 'm.0' },
        { say: 'So "d", the days, is the independent variable, and "p", the pages, is the dependent variable.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Fill the table',
      layout: 'split',
      leftWidth: 560,
      left: [reader('mc')],
      right: [{ kind: 'table', id: 't', head: ['$d$', '$p$'], rows: [['$1$', '$15$'], ['$2$', '$30$'], ['$3$', '$45$'], ['$4$', '$60$']] }],
      lines: [
        { say: 'Step two. Each day adds 15 pages, so the rule is: pages equal 15 times days. Think of it as a machine. Put in the days, and it multiplies by 15.', show: ['mc.frame', 'mc.box0', 'mc.titles'], focus: 'mc.box0' },
        { say: 'Step three. 1 day: 15 times 1 is 15 pages.', show: ['mc.set0', 't.0'], focus: 't.0' },
        { say: '2 days: 15 times 2 is 30 pages.', show: ['mc.set1', 't.1'], hide: 'mc.set0', focus: 't.1' },
        { say: '3 days: 15 times 3 is 45 pages.', show: ['mc.set2', 't.2'], hide: 'mc.set1', focus: 't.2' },
        { say: '4 days: 15 times 4 is 60 pages.', show: ['mc.set3', 't.3'], hide: 'mc.set2', focus: 't.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15, \\ 30, \\ 45, \\ 60: \\ +15 \\text{ each day} \\ \\checkmark', '60 \\div 4 = 15 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Each value in the table is 15 more than the one before, one more day of reading each time.', show: 'm.0' },
        { say: 'And 60 pages in 4 days is 60 divided by 4, which is 15 pages a day. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"$p$ is independent"', 'the pages **depend** on the days, not the other way'],
            ['$p = 16, 17, 18, 19$', '**added** $15$ once: each day adds **another** $15$'],
            ['$p = 15, 15, 15, 15$', 'that is pages **each day**, not the **total**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Calling "p" independent gets it backwards. Maya cannot choose the pages without reading for more days. The pages depend on the days.' },
        { say: '16, 17, 18, 19 adds 15 to the days once. Each day adds another 15 pages.' },
        { say: 'And 15 every time gives the pages read each day. The question asks for the total so far.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A candle gets **shorter** the **longer** it burns. Which is the **dependent** variable?',
          choices: ['the time it burns', 'the height of the candle', 'the colour of the candle', 'the size of the room'],
          answer: 1,
          working: 'The height changes because of the time it burns, so the height depends on the time.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle gets shorter the longer it burns. Which is the dependent variable? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The height of the candle changes because of how long it burns. The height depends on the time. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Independent**: the one we choose', '**Dependent**: changes because of the other', 'Ask: which one **depends** on which?', 'A **rule** turns one into the other'] }],
      lines: [
        { say: 'Here is what to remember. The independent variable is the one we choose.', show: 'sum.0' },
        { say: 'The dependent variable changes because of it.', show: 'sum.1' },
        { say: 'To tell them apart, ask which one depends on the other.', show: 'sum.2' },
        { say: 'And a rule turns one into the other. For more on independent and dependent variables, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
