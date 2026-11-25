import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 1.2 (comparing, ordering and rounding). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 5.1, Decimals, CC BY-NC-SA 4.0).
// $58,965.95: to the nearest dollar the tenths digit 9 rounds up, giving $58,966; to the nearest
// thousand the hundreds digit 9 rounds up, giving $59,000; to the nearest ten thousand the
// thousands digit 8 rounds up, giving $60,000. All three as in the book's answer.

const QUESTION =
  'Salary Increase Danny got a raise and now makes $58,965.95 a year. Round this number to the nearest: (a) dollar (b) thousand dollars (c) ten thousand dollars.';

const video: Explainer = {
  id: 'xq-m5-1-2',
  lessonId: '',
  exam: {
    lesson: 'm5-1-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.1, Decimals',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-1-decimals',
    question: QUESTION,
  },
  title: 'Exam Question: Rounding a Salary Three Ways (Rounding)',
  thumbnailTitle: 'Round This Salary!',
  summary:
    'A real test question, solved one small step at a time: Danny makes $58,965.95 a year. Round it to the nearest dollar, thousand dollars and ten thousand dollars. Each time we find the rounding place, look at the digit just to its right, and round up when that digit is 5 or more. The answers are $58,966, $59,000 and $60,000. Then we check the answers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Round This Salary!', subtitle: 'Rounding, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rounding. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Salary Increase** Danny got a raise and now makes \\$58,965.95 a year. Round this number to the nearest: (a) dollar (b) thousand dollars (c) ten thousand dollars.',
          answer: '(a) \\$58,966 (b) \\$59,000 (c) \\$60,000',
          working: 'Look at the digit to the right of each rounding place: 9, 9 and 8 all round up',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Danny got a raise, and now makes 58 thousand 965 dollars and 95 cents a year. Round this number to the nearest dollar, to the nearest thousand dollars, and to the nearest ten thousand dollars.', caption: 'Danny got a raise and now makes $58,965.95 a year. Round this number to the nearest: (a) dollar (b) thousand dollars (c) ten thousand dollars.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Rounding', md: '**Rounding** gives a simpler number that is **close** to the real one. "To the nearest thousand dollars" means: which **whole number of thousands** is it closest to?' }],
      lines: [
        { say: 'Rounding gives a simpler number that is close to the real one.', show: 'c' },
        { say: 'To the nearest thousand dollars means: which whole number of thousands is Danny\'s salary closest to? The other parts ask the same thing for dollars and ten thousands.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones', '.', 'Tenths', 'Hundredths'],
          rows: [['$5$', '$8$', '$9$', '$6$', '$5$', '.', '$9$', '$5$']],
        },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The rounding rule', md: 'Find the rounding place. Look at the digit just to its **right**. If it is **$5$ or more**, add $1$ to the rounding digit. If it is **less than $5$**, leave it. Then the digits after it become **zeros**, or are dropped after the decimal point.' },
      ],
      lines: [
        { say: 'Here is what we need. This place value chart shows every digit of the salary.', show: 't' },
        { say: 'To round, find the rounding place, and look at the digit just to its right. If that digit is 5 or more, add 1 to the rounding digit. If it is less than 5, leave the rounding digit alone. Then the digits after it become zeros, or are dropped after the decimal point.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **rounding place**', 'Look at the digit to its **right**', '**Round** up or leave it, then fill with **zeros**'] }],
      lines: [
        { say: 'Here is the plan, for each part. Find the rounding place.', show: 'plan.0' },
        { say: 'Look at the digit just to its right.', show: 'plan.1' },
        { say: 'Round up, or leave it, then fill in with zeros.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Nearest dollar',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['58{,}96\\underline{5}.\\boxed{9}5', '9 \\ge 5 \\Rightarrow \\text{round up}', '\\good{\\$58{,}966}'] }],
      lines: [
        { say: 'Part a. The nearest dollar means the ones place. The ones digit is 5.', show: 'm.0' },
        { say: 'The digit to its right is the 9 in the tenths place. 9 is 5 or more, so we round up.', show: 'm.1' },
        { say: 'The 5 becomes a 6, and the cents are dropped. To the nearest dollar, Danny makes 58 thousand 966 dollars.', caption: 'The 5 becomes a 6, and the cents are dropped. To the nearest dollar, Danny makes $58,966.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): Nearest thousand',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5\\underline{8},\\boxed{9}65.95', '9 \\ge 5 \\Rightarrow \\text{round up}', '\\good{\\$59{,}000}'] }],
      lines: [
        { say: 'Part b. The nearest thousand dollars means the thousands place. The thousands digit is 8.', show: 'm.0' },
        { say: 'The digit to its right is the 9 in the hundreds place. 9 is 5 or more, so we round up.', show: 'm.1' },
        { say: 'The 8 becomes a 9, and every digit after it becomes zero. That gives 59 thousand dollars.', caption: 'The 8 becomes a 9, and every digit after it becomes zero. That gives $59,000.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (c): Nearest ten thousand',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\underline{5}\\boxed{8},965.95', '8 \\ge 5 \\Rightarrow \\text{round up}', '\\good{\\$60{,}000}'] }],
      lines: [
        { say: 'Part c. The nearest ten thousand dollars means the ten thousands place. That digit is 5.', show: 'm.0' },
        { say: 'The digit to its right is the 8 in the thousands place. 8 is 5 or more, so we round up.', show: 'm.1' },
        { say: 'The 5 becomes a 6, and every digit after it becomes zero. That gives 60 thousand dollars.', caption: 'The 5 becomes a 6, and every digit after it becomes zero. That gives $60,000.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['58{,}965.95 \\text{ is between } 58{,}000 \\text{ and } 59{,}000', '\\text{It is past the halfway point, } 58{,}500 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b. The salary is between 58 thousand and 59 thousand.', caption: 'Let us check part b. $58,965.95 is between $58,000 and $59,000.', show: 'm.0' },
        { say: 'Halfway between them is 58 thousand 500. The salary is past halfway, so it is closer to 59 thousand. It checks out, and the other parts check the same way.', caption: 'Halfway between them is $58,500. The salary is past halfway, so it is closer to $59,000. It checks out, and the other parts check the same way.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$58,965', 'cut off the cents: the $9$ tenths means **round up**'],
            ['(b) \\$58,000', 'looked at the wrong digit: look **just to the right**'],
            ['(b) \\$59,965', 'forgot to change the digits after it to **zeros**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '58 thousand 965 dollars just cuts off the cents. But 95 cents is more than half a dollar, so we round up.', caption: '$58,965 just cuts off the cents. But 95 cents is more than half a dollar, so we round up.' },
        { say: '58 thousand dollars rounds down. The digit just to the right of the thousands place is 9, so we round up.', caption: '$58,000 rounds down. The digit just to the right of the thousands place is 9, so we round up.' },
        { say: 'And 59 thousand 965 changes the 8 but forgets to turn the digits after it into zeros.', caption: 'And $59,965 changes the 8 but forgets to turn the digits after it into zeros.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A school raised \\$3,482.60 at a fun fair. What is this amount to the nearest hundred dollars?',
          choices: ['\\$3,000', '\\$3,480', '\\$3,483', '\\$3,500'],
          answer: 3,
          working: 'The hundreds digit is 4. The digit to its right is 8, so round up: $3,500.',
        },
      ],
      lines: [
        { say: 'Your turn. A school raised 3 thousand 482 dollars and 60 cents at a fun fair. What is this amount to the nearest hundred dollars? Pause the video and try it.', caption: 'Your turn. A school raised $3,482.60 at a fun fair. What is this amount to the nearest hundred dollars? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The hundreds digit is 4. The digit to its right is 8, which is 5 or more, so the 4 becomes a 5. That gives 3 thousand 500 dollars. Choice "D".', caption: 'The hundreds digit is 4. The digit to its right is 8, which is 5 or more, so the 4 becomes a 5. That gives $3,500. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **rounding place**', 'Look **just to the right**', '**$5$ or more**: round up', 'Fill in with **zeros**'] }],
      lines: [
        { say: 'Here is what to remember. Find the rounding place.', show: 'sum.0' },
        { say: 'Look at the digit just to its right.', show: 'sum.1' },
        { say: 'If it is 5 or more, round up. If it is less than 5, leave the digit.', show: 'sum.2' },
        { say: 'And fill in the places after it with zeros. For more on comparing, ordering and rounding, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
