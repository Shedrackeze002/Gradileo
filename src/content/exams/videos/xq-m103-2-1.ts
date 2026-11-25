import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 2.1 (wages and overtime). The free OpenStax books have no
// overtime questions, so this one is written by Gradileo in the style of a Grade 10 workplace
// mathematics unit test, with the overtime rule stated in the question. 7:30 AM to 6:00 PM is 10.5
// hours, less the 30-minute unpaid lunch is 10 hours: 8 regular hours at $18.40 = $147.20 and 2
// overtime hours at 1.5 × $18.40 = $27.60, so $55.20, for $202.40 in all. Check: 10 hours at
// $18.40 is $184.00, plus the extra half-rate ($9.20) on 2 hours, $18.40, is $202.40.

const QUESTION =
  'Jordan works at a lumber yard for $18.40 an hour. Hours over 8 in a day are paid at time-and-a-half. On Saturday, Jordan works from 7:30 AM to 6:00 PM, with an unpaid 30-minute lunch break. What is Jordan’s gross pay for Saturday?';

const video: Explainer = {
  id: 'xq-m103-2-1',
  lessonId: '',
  exam: {
    lesson: 'm103-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Gross Pay for a Day With Overtime (Wages and Overtime)',
  thumbnailTitle: 'A Long Saturday: Pay With Overtime',
  thumbnail: 'm',
  summary:
    'An exam-style question, solved one small step at a time: Jordan earns $18.40 an hour at a lumber yard, with time-and-a-half for hours over 8 in a day. On Saturday Jordan works from 7:30 AM to 6:00 PM with an unpaid 30-minute lunch. What is the gross pay? The shift is 10 hours of paid work: 8 regular hours earn $147.20, and 2 overtime hours at $27.60 earn $55.20, for $202.40. Then we check another way and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Long Saturday: Pay With Overtime', subtitle: 'Wages and overtime, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about wages and overtime. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'Jordan works at a lumber yard for \\$18.40 an hour. Hours over $8$ in a day are paid at time-and-a-half. On Saturday, Jordan works from 7:30 AM to 6:00 PM, with an unpaid $30$-minute lunch break. What is Jordan’s gross pay for Saturday?',
          answer: '\\$202.40',
          working: '$10$ hours worked: $8 \\times 18.40 + 2 \\times 27.60$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Jordan works at a lumber yard for 18 dollars 40 an hour. Hours over 8 in a day are paid at time-and-a-half. On Saturday, Jordan works from 7:30 AM to 6 PM, with an unpaid 30-minute lunch. What is Jordan\'s gross pay for Saturday?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['We know', 'We want'],
          rows: [
            ['\\$18.40 an hour', 'the **gross** pay: pay before deductions'],
            ['7:30 AM to 6:00 PM, less $30$ min', 'how many hours are **regular**'],
            ['over $8$ hours: time-and-a-half', 'and how many are **overtime**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we know: the hourly wage, the start and finish times, and the unpaid lunch.', show: 'tab' },
        { say: 'We want the gross pay, which is the pay before any deductions. To find it, we must split the hours into regular hours and overtime hours.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{time-and-a-half} = 1.5 \\times \\text{the hourly wage}', '\\text{gross pay} = \\text{regular pay} + \\text{overtime pay}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Only the extra hours', md: 'Only the hours **over 8** get the higher rate. The first $8$ hours are paid at the **regular** wage.' },
      ],
      lines: [
        { say: 'Here is what we need. Time-and-a-half means one and a half times the hourly wage. Gross pay is the regular pay plus the overtime pay.', show: 'f' },
        { say: 'Only the hours over 8 get the higher rate. The first 8 hours are paid at the regular wage.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **hours worked**', 'Split them: **regular** and **overtime**', 'Find each pay, then **add**'] }],
      lines: [
        { say: 'Here is the plan. Find the hours Jordan worked.', show: 'plan.0' },
        { say: 'Split them into regular hours and overtime hours.', show: 'plan.1' },
        { say: 'Find the pay for each, then add.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The hours worked',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7{:}30 \\text{ AM} \\to 6{:}00 \\text{ PM} = 10.5 \\text{ hours}', '10.5 - 0.5 = \\good{10 \\text{ hours worked}}'] }],
      lines: [
        { say: 'Step one. From 7:30 AM to 6 PM: 7:30 to 5:30 is 10 hours, and 5:30 to 6 is half an hour more. That is 10 and a half hours.', show: 'm.0' },
        { say: 'Take off the unpaid lunch, half an hour. Jordan worked 10 hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Regular and overtime',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{regular: } 8 \\times \\$18.40 = \\$147.20', '\\text{overtime rate: } 1.5 \\times \\$18.40 = \\$27.60', '\\text{overtime: } 2 \\times \\$27.60 = \\$55.20'] }],
      lines: [
        { say: 'Step two. The first 8 hours are regular: 8 times 18.40 is 147 dollars 20.', show: 'm.0' },
        { say: 'The other 2 hours are overtime. The overtime rate is 1.5 times 18.40, which is 27 dollars 60 an hour.', show: 'm.1' },
        { say: '2 hours at 27.60 is 55 dollars 20.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$147.20 + \\$55.20 = \\good{\\$202.40}'] }],
      lines: [
        { say: 'Step three. Add them: 147.20 plus 55.20 is 202 dollars 40. That is Jordan\'s gross pay for Saturday.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10 \\times \\$18.40 = \\$184.00', '\\text{extra half: } 2 \\times \\$9.20 = \\$18.40', '\\$184.00 + \\$18.40 = \\$202.40 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Pay all 10 hours at the regular wage: 184 dollars.', show: 'm.0' },
        { say: 'Each overtime hour earns an extra half of 18.40, which is 9 dollars 20. For 2 hours, that is 18 dollars 40 more.', show: 'm.1' },
        { say: '184 plus 18.40 is 202 dollars 40, the same answer. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$10.5$ hours', 'the $30$-minute lunch is **unpaid**: take it off'],
            ['All $10$ hours at \\$27.60', 'only hours **over 8** get time-and-a-half'],
            ['$7{:}30$ to $6{:}00$ is $1.5$ hours', '6:00 PM is in the **evening**: it is $10.5$ hours'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The lunch break is unpaid, so take it off the 10 and a half hours.' },
        { say: 'Only the hours over 8 are paid at time-and-a-half, not the whole day.' },
        { say: 'And watch AM and PM. 6 PM is in the evening, so the shift is 10 and a half hours long, not one and a half.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Sam earns \\$16 an hour, with time-and-a-half for hours over $40$ in a week. Sam works $44$ hours this week. What is the gross pay?',
          choices: ['\\$704', '\\$736', '\\$1,056', '\\$768'],
          answer: 1,
          working: '$40 \\times 16 = 640$, and $4 \\times 24 = 96$: \\$736.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam earns 16 dollars an hour, with time-and-a-half for hours over 40 in a week. Sam works 44 hours this week. What is the gross pay? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '40 regular hours at 16 dollars is 640. The overtime rate is 24 dollars, and 4 hours of overtime is 96. 640 plus 96 is 736 dollars. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the hours, and take off **unpaid** breaks', 'Split into **regular** and **overtime** hours', 'Time-and-a-half $= 1.5 \\times$ the wage', 'Gross pay $=$ regular pay $+$ overtime pay'] }],
      lines: [
        { say: 'Here is what to remember. Find the hours worked, and take off any unpaid breaks.', show: 'sum.0' },
        { say: 'Split them into regular hours and overtime hours.', show: 'sum.1' },
        { say: 'Time-and-a-half is 1.5 times the wage.', show: 'sum.2' },
        { say: 'And the gross pay is the regular pay plus the overtime pay. For more on wages and overtime, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
