import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 1.1 (place value and rounding). The question is an Everyday
// Math exercise from OpenStax Prealgebra 2e, word for word (section 1.1, Introduction to Whole
// Numbers, CC BY-NC-SA 4.0). Jorge's car cost $24,493: to the nearest ten $24,490 (3 < 5), hundred
// $24,500 (9 ≥ 5), thousand $24,000 (4 < 5) and ten thousand $20,000 (4 < 5), as in the book.

const QUESTION =
  'Buying a Car Jorge bought a car for $24,493. Round the price to the nearest: (a) ten dollars (b) hundred dollars (c) thousand dollars (d) ten-thousand dollars';

const places = { kind: 'table' as const, id: 'pv', head: ['Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'], rows: [['$2$', '$4$', '$4$', '$9$', '$3$']] };

const video: Explainer = {
  id: 'xq-m104-1-1',
  lessonId: '',
  exam: {
    lesson: 'm104-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.1, Introduction to Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-1-introduction-to-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Rounding the Price of a Car (Place Value and Rounding)',
  thumbnailTitle: 'Round the Price of a Car',
  summary:
    'A real test question, solved one small step at a time: Jorge bought a car for $24,493. Round the price to the nearest ten dollars, hundred dollars, thousand dollars and ten thousand dollars. We find each place, look at the digit to its right, and round up when that digit is 5 or more: $24,490, $24,500, $24,000 and $20,000. Then we check and look at the traps, including the double-rounding trap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Round the Price of a Car', subtitle: 'Place value and rounding, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about place value and rounding. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Buying a Car** Jorge bought a car for \\$24,493. Round the price to the nearest: (a) ten dollars (b) hundred dollars (c) thousand dollars (d) ten-thousand dollars',
          answer: '(a) \\$24,490 (b) \\$24,500 (c) \\$24,000 (d) \\$20,000',
          working: 'Look at the digit to the **right** of each place: $3$, $9$, $4$ and $4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Jorge bought a car for 24,493 dollars. Round the price to the nearest ten dollars, the nearest hundred dollars, the nearest thousand dollars, and the nearest ten thousand dollars.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [places, { kind: 'text', id: 't', size: 'md', md: 'Four answers: the **same price**, rounded to four different places.' }],
      lines: [
        { say: 'Here is the price in a place value chart. The 2 is in the ten thousands place, then 4 thousands, 4 hundreds, 9 tens and 3 ones.', show: 'pv' },
        { say: 'The question asks for four answers. Each one is the same price, rounded to a different place.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'rule', items: ['Find the place you are rounding to', 'Look at the digit just to its **right**', '$5$ or more: add $1$ to the place. Less than $5$: keep it', 'Change every digit to the right into $0$'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Always the original number', md: 'Round from **\\$24,493** each time, not from your last answer.' },
      ],
      lines: [
        { say: 'Here is how to round. First, find the place you are rounding to.', show: 'rule.0' },
        { say: 'Then look at the digit just to its right.', show: 'rule.1' },
        { say: 'If that digit is 5 or more, add 1 to the place. If it is less than 5, keep the place as it is.', show: 'rule.2' },
        { say: 'Then change every digit to the right of the place into zero.', show: 'rule.3' },
        { say: 'And always round the original price, not your last answer.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Round to the **ten** and the **hundred**', 'Round to the **thousand** and the **ten thousand**', 'Check that each answer is the **closest**'] }],
      lines: [
        { say: 'Here is the plan. Round to the nearest ten and the nearest hundred.', show: 'plan.0' },
        { say: 'Then round to the nearest thousand and the nearest ten thousand.', show: 'plan.1' },
        { say: 'Then check that each answer really is the closest.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Tens and hundreds',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } 24{,}4\\underline{9}\\mathbf{3}: \\ 3 < 5 \\Rightarrow \\good{\\$24{,}490}', '\\text{(b) } 24{,}\\underline{4}\\mathbf{9}3: \\ 9 \\ge 5 \\Rightarrow \\good{\\$24{,}500}'] }],
      lines: [
        { say: 'Step one. For the nearest ten, the tens digit is 9. The digit to its right is 3, which is less than 5. So we keep the 9 and change the 3 to zero. That gives 24,490 dollars.', show: 'm.0' },
        { say: 'For the nearest hundred, the hundreds digit is 4. The digit to its right is 9, which is 5 or more. So the 4 goes up to 5, and the digits after it become zeros. That gives 24,500 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Thousands and ten thousands',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(c) } 2\\underline{4}{,}\\mathbf{4}93: \\ 4 < 5 \\Rightarrow \\good{\\$24{,}000}', '\\text{(d) } \\underline{2}\\mathbf{4}{,}493: \\ 4 < 5 \\Rightarrow \\good{\\$20{,}000}'] }],
      lines: [
        { say: 'Step two. For the nearest thousand, the thousands digit is 4. The digit to its right is 4, which is less than 5. So we keep it: 24,000 dollars.', show: 'm.0' },
        { say: 'For the nearest ten thousand, the digit is 2. The digit to its right is 4, less than 5 again. So the price rounds to 20,000 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24{,}490 < 24{,}493 < 24{,}500', '\\text{3 away from } 24{,}490, \\ \\text{7 away from } 24{,}500 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the first one. The price is between 24,490 and 24,500.', show: 'm.0' },
        { say: 'It is only 3 dollars from 24,490, but 7 dollars from 24,500. So 24,490 really is the nearest ten. The others check the same way.', show: 'm.1', focus: 'm.1' },
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
            ['(c) \\$25,000', 'rounded **\\$24,500** again: round the **original** price'],
            ['(b) \\$24,400', 'looked at the **4** itself: look at the digit to its **right**'],
            ['(b) \\$24,593', 'forgot to change the digits after the place to **zeros**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Some people round the answer to part b again, and get 25,000 dollars. But the price itself, 24,493, is closer to 24,000. Always round the original price.' },
        { say: 'For the hundreds, look at the digit to the right of the place, the 9, not the place itself.' },
        { say: 'And once you round, every digit after the place becomes zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A used truck costs \\$38,657. Round the price to the nearest hundred dollars.',
          choices: ['\\$38,600', '\\$38,700', '\\$39,000', '\\$38,660'],
          answer: 1,
          working: 'The hundreds digit is $6$, and the digit to its right is $5$, so round up: \\$38,700.',
        },
      ],
      lines: [
        { say: 'Your turn. A used truck costs 38,657 dollars. Round the price to the nearest hundred dollars. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The hundreds digit is 6. The digit to its right is 5, so we round up. The answer is 38,700 dollars. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **place** you are rounding to', 'Look at the digit to its **right**', '$5$ or more: round **up**. Less than $5$: keep it', 'Always round the **original** number'] }],
      lines: [
        { say: 'Here is what to remember. Find the place you are rounding to.', show: 'sum.0' },
        { say: 'Look at the digit to its right.', show: 'sum.1' },
        { say: 'If it is 5 or more, round up. If it is less than 5, keep the place as it is.', show: 'sum.2' },
        { say: 'And always round the original number. For more on place value and rounding, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
