import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 6.1 (SI and imperial units). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 7.5, Systems of Measurement, CC BY-NC-SA 4.0).
// 12 × 24 = 288 inches, and 288 ÷ 36 = 8 yards, as in the book's answer. Check: 24 inches is 2 feet,
// so 12 girls need 24 feet, and 24 ÷ 3 = 8 yards.

const QUESTION = 'Mireille needs to cut 24 inches of ribbon for each of the 12 girls in her dance class. How many yards of ribbon will she need altogether?';

const video: Explainer = {
  id: 'xq-m204-6-1',
  lessonId: '',
  exam: {
    lesson: 'm204-6-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Yards of Ribbon? (SI and Imperial Units)',
  thumbnailTitle: 'How Many Yards of Ribbon?',
  summary:
    'A real test question, solved one small step at a time: Mireille cuts 24 inches of ribbon for each of the 12 girls in her dance class. That is 12 × 24 = 288 inches. A yard is 36 inches, so she needs 288 ÷ 36 = 8 yards. Then we check by going through feet, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Yards of Ribbon?', subtitle: 'Imperial units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about imperial units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Mireille needs to cut $24$ inches of ribbon for each of the $12$ girls in her dance class. How many yards of ribbon will she need altogether?',
          answer: '$8$ yards',
          working: '12 × 24 = 288 in; 288 ÷ 36 = 8 yd',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Mireille needs to cut 24 inches of ribbon for each of the 12 girls in her dance class. How many yards of ribbon will she need altogether?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two units', md: 'Each piece is measured in **inches**, but the answer must be in **yards**. Ribbon and fabric are often sold by the yard.' }],
      lines: [
        { say: 'Each piece of ribbon is measured in inches. But the question wants the answer in yards.', show: 'c' },
        { say: 'Ribbon and fabric are often sold by the yard, so Mireille needs to know how many yards to buy.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Imperial length', 'Equals'], rows: [['$1$ foot', '$12$ inches'], ['$1$ yard', '$3$ feet $= 36$ inches'], ['$1$ mile', '$1{,}760$ yards']] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Small units to big units', md: 'Going to a **bigger** unit, there will be **fewer** of them, so **divide**.' },
      ],
      lines: [
        { say: 'Here is what we need. In the imperial system, 12 inches make a foot, and 3 feet make a yard. So a yard is 36 inches.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A yard is bigger than an inch. Going to a bigger unit, there will be fewer of them, so we divide.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **total** length in inches', '**Divide** by $36$ to change to yards'] }],
      lines: [
        { say: 'Here is the plan. Find the total length of ribbon, in inches.', show: 'plan.0' },
        { say: 'Then divide by 36, to change inches to yards.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The ribbon',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times 24 \\text{ in} = 288 \\text{ in}', '288 \\text{ in} \\div 36 = \\good{8 \\text{ yd}}'] }],
      lines: [
        { say: 'Step one. 12 girls, with 24 inches each. 12 times 24 is 288 inches of ribbon in all.', show: 'm.0' },
        { say: 'Step two. There are 36 inches in a yard, so divide: 288 divided by 36 is 8. Mireille needs 8 yards of ribbon.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24 \\text{ in} = 2 \\text{ ft}', '12 \\times 2 \\text{ ft} = 24 \\text{ ft}', '24 \\text{ ft} \\div 3 = 8 \\text{ yd} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way, through feet. 24 inches is 2 feet.', show: 'm.0' },
        { say: '12 pieces of 2 feet is 24 feet.', show: 'm.1' },
        { say: 'And 3 feet make a yard, so 24 feet is 8 yards. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$288$ yards', 'that is in **inches**: divide by $36$'],
            ['$24$ yards', 'that is in **feet**: $3$ feet make a yard'],
            ['$10{,}368$ yards', '**multiplied** by $36$: to a bigger unit, **divide**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '288 is the length in inches, not yards. Divide by 36.' },
        { say: '24 is the length in feet. 3 feet make a yard, so divide by 3.' },
        { say: 'And 10 thousand 368 multiplies by 36. A yard is bigger than an inch, so there must be fewer yards. Divide.', caption: 'And 10,368 multiplies by 36. A yard is bigger than an inch, so there must be fewer yards. Divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A carpenter cuts $6$ pieces of trim, each $30$ inches long. How many **feet** of trim is that in all?',
          choices: ['$180$ feet', '$5$ feet', '$15$ feet', '$2{,}160$ feet'],
          answer: 2,
          working: '6 × 30 = 180 inches, and 180 ÷ 12 = 15 feet.',
        },
      ],
      lines: [
        { say: 'Your turn. A carpenter cuts 6 pieces of trim, each 30 inches long. How many feet of trim is that in all? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '6 times 30 is 180 inches. 12 inches make a foot, so 180 divided by 12 is 15 feet. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$12$ in $= 1$ ft, $3$ ft $= 1$ yd', '$36$ in $= 1$ yd', 'To a **bigger** unit: **divide**', 'To a **smaller** unit: **multiply**'] }],
      lines: [
        { say: 'Here is what to remember. 12 inches make a foot, and 3 feet make a yard.', show: 'sum.0' },
        { say: 'So 36 inches make a yard.', show: 'sum.1' },
        { say: 'To change to a bigger unit, divide.', show: 'sum.2' },
        { say: 'And to change to a smaller unit, multiply. For more on SI and imperial units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
