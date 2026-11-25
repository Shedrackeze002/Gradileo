import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 6.1 (SI units of measure). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 9.1, The Metric System,
// CC BY-NC-SA 4.0). 3,810 m ÷ 1000 = 3.81 km, which is more than 3.2 km, so Kyrie's skydive was at
// the greater altitude, as in the book's answer. Check: 3.2 km × 1000 = 3,200 m < 3,810 m.

const QUESTION =
  'Kyrie boasted he jumped out of an airplane at an altitude of 3,810 meters on his latest skydive trip. His friend said they beat Kyrie because their jump was at an altitude of 3.2 km. Whose skydive was at a greater altitude?';

const video: Explainer = {
  id: 'xq-m104-6-1',
  lessonId: '',
  exam: {
    lesson: 'm104-6-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.1, The Metric System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-1-the-metric-system',
    question: QUESTION,
  },
  title: 'Exam Question: Whose Skydive Was Higher? (SI Units of Measure)',
  thumbnailTitle: 'Whose Skydive Was Higher?',
  summary:
    'A real test question, solved one small step at a time: Kyrie jumped from 3,810 metres, and his friend jumped from 3.2 km. Whose skydive was at a greater altitude? We change both heights to the same unit: 1 km is 1000 m, so 3,810 m is 3.81 km, which is more than 3.2 km. Kyrie’s was higher. Then we check in metres and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Whose Skydive Was Higher?', subtitle: 'SI units of measure, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about metric units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Kyrie boasted he jumped out of an airplane at an altitude of $3{,}810$ meters on his latest skydive trip. His friend said they beat Kyrie because their jump was at an altitude of $3.2$ km. Whose skydive was at a greater altitude?',
          answer: 'Kyrie’s ($3.81$ km)',
          working: '$3{,}810 \\text{ m} = 3.81 \\text{ km} > 3.2 \\text{ km}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Kyrie boasted he jumped out of an airplane at an altitude of 3 thousand 810 metres on his latest skydive trip. His friend said they beat Kyrie because their jump was at an altitude of 3.2 kilometres. Whose skydive was at a greater altitude?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3{,}810 \\text{ m} \\quad \\text{or} \\quad 3.2 \\text{ km}\\, ?'] },
        { kind: 'text', id: 't', size: 'md', md: 'The heights are in **different units**. We cannot compare them until they are in the **same** unit.' },
      ],
      lines: [
        { say: 'We need to compare 3 thousand 810 metres with 3.2 kilometres.', show: 'm' },
        { say: 'But one is in metres and the other is in kilometres. We cannot compare them fairly until they are in the same unit.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ km} = 1000 \\text{ m}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Kilo means a thousand', md: 'Metres to kilometres: **divide by $1000$** (move the point **three** places left). Kilometres to metres: **multiply by $1000$**.' },
      ],
      lines: [
        { say: 'Here is what we need. Kilo means a thousand, so 1 kilometre is a thousand metres.', show: 'f' },
        { say: 'To change metres to kilometres, divide by a thousand: move the decimal point three places to the left. To go back, multiply by a thousand.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $3{,}810$ m to **km**', '**Compare** the two heights', 'Check in **metres**'] }],
      lines: [
        { say: 'Here is the plan. Change Kyrie\'s height to kilometres.', show: 'plan.0' },
        { say: 'Compare the two heights.', show: 'plan.1' },
        { say: 'Then check in metres.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Same unit',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3{,}810 \\div 1000 = 3.81', '3{,}810 \\text{ m} = 3.81 \\text{ km}'] }],
      lines: [
        { say: 'Step one. Divide 3 thousand 810 by a thousand: move the decimal point three places left, which gives 3.81.', show: 'm.0' },
        { say: 'So Kyrie jumped from 3.81 kilometres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.81 \\text{ km} > 3.20 \\text{ km}', '\\good{\\text{Kyrie’s skydive was higher}}'] }],
      lines: [
        { say: 'Step two. Write 3.2 as 3.20, so both have two decimal places. 3.81 is more than 3.20.', show: 'm.0' },
        { say: 'So Kyrie\'s skydive was at the greater altitude, and his friend was wrong.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.2 \\text{ km} = 3.2 \\times 1000 = 3{,}200 \\text{ m}', '3{,}810 \\text{ m} > 3{,}200 \\text{ m} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the other way, in metres. 3.2 kilometres is 3.2 times a thousand, which is 3 thousand 200 metres.', show: 'm.0' },
        { say: '3 thousand 810 metres is more than 3 thousand 200. Kyrie is still higher. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$0.381$ km', 'moved the point **four** places: kilo is $1000$'],
            ['$38.1$ km', 'moved the point only **two** places'],
            ['$3{,}810 > 3.2$', 'right winner, **wrong reason**: use the **same unit**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0.381 kilometres moves the decimal point four places. That would make the friend higher, which is wrong. Kilo means a thousand: three places.' },
        { say: '38.1 kilometres moves the decimal point only two places. That is higher than any plane flies a skydive.' },
        { say: 'And saying 3 thousand 810 beats 3.2 just by the numbers gets the right winner by luck. Try it with 4 kilometres and it fails. Always change to the same unit first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is longer: a trail of $1.6$ km or a trail of $1{,}450$ m?',
          choices: ['the $1.6$ km trail', 'the $1{,}450$ m trail', 'they are the same', 'you cannot tell'],
          answer: 0,
          working: '$1.6 \\text{ km} = 1{,}600 \\text{ m}$, which is more than $1{,}450$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is longer: a trail of 1.6 kilometres, or a trail of 1 thousand 450 metres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1.6 kilometres is 1 thousand 600 metres, which is more than 1 thousand 450. The 1.6 kilometre trail is longer. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare only in the **same unit**', '$1$ km $= 1000$ m', 'm to km: point **three places left**', 'Check by converting the **other** way'] }],
      lines: [
        { say: 'Here is what to remember. Compare measurements only when they are in the same unit.', show: 'sum.0' },
        { say: 'A kilometre is a thousand metres.', show: 'sum.1' },
        { say: 'To change metres to kilometres, move the decimal point three places to the left.', show: 'sum.2' },
        { say: 'And check by converting the other way. For more on SI units of measure, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
