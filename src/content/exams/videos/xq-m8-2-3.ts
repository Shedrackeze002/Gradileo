import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from '@/content/math8/videos/lib/m8-2-figures.ts';

// Exam question for Math 8 lesson 2.3 (percent change and combined percents). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 6.2, Solve General Applications of
// Percent, CC BY-NC-SA 4.0). The decrease is 42,000 − 37,800 = 4,200, and 4,200 ÷ 42,000 = 0.1, so
// a 10% decrease (10.0% to the nearest tenth). The book's answer is 10%.

const QUESTION =
  'Last year Sheila’s salary was $42,000. Because of furlough days, this year her salary was $37,800. Find the percent decrease. (Round to the nearest tenth of a percent.)';

const bar = (id: string, drop: string) =>
  figure(
    id,
    [
      pieceBar({
        pieces: [
          { w: 9, tex: '\\$37{,}800', below: '\\text{this year}', tone: 'adj' },
          { w: 1, removed: true, below: drop },
        ],
        brackets: [{ id: 'last', from: 0, to: 1, tex: '\\text{last year: } \\$42{,}000', tone: 'opp' }],
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'xq-m8-2-3',
  lessonId: '',
  exam: {
    lesson: 'm8-2-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: Sheila’s Salary Cut (Percent Change)',
  thumbnailTitle: 'Sheila’s Salary Cut',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: last year Sheila’s salary was $42,000. Because of furlough days, this year it was $37,800. Find the percent decrease, to the nearest tenth of a percent. The decrease is $42,000 − $37,800 = $4,200. The percent decrease compares it with the original salary: 4,200 ÷ 42,000 = 0.1, which is 10%, or 10.0% to the nearest tenth. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sheila’s Salary Cut', subtitle: 'Percent change, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about percent change. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Last year Sheila’s salary was \\$42,000. Because of furlough days, this year her salary was \\$37,800. Find the percent decrease. (Round to the nearest tenth of a percent.)',
          answer: '10% (that is, 10.0%)',
          working: '42,000 − 37,800 = 4,200; 4,200 ÷ 42,000 = 0.1',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Last year Sheila\'s salary was 42 thousand dollars. Because of furlough days, this year her salary was 37 thousand 800 dollars. Find the percent decrease. Round to the nearest tenth of a percent.', caption: 'Last year Sheila’s salary was $42,000. Because of furlough days, this year her salary was $37,800. Find the percent decrease. (Round to the nearest tenth of a percent.)' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bar('ask', '?'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Percent decrease', md: '**Furlough days** are days a worker is told to take off without pay. The **percent decrease** says how big the drop is **compared with the original**: last year\'s salary.' }],
      lines: [
        { say: 'Furlough days are days a worker is told to take off without pay, so Sheila\'s salary went down.', show: 'c' },
        { say: 'Last year she earned 42 thousand dollars. This year she earned 37 thousand 800.', caption: 'Last year she earned $42,000. This year she earned $37,800.', show: ['ask.last', 'ask.p0', 'ask.below0'] },
        { say: 'Part of last year\'s salary is gone. The percent decrease says how big that part is, compared with the original: last year\'s salary.', show: ['ask.p1', 'ask.below1'], focus: 'ask.p1' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{decrease} = \\text{original} - \\text{new}', '\\text{percent decrease} = \\dfrac{\\text{decrease}}{\\text{original}} \\times 100\\%'] }],
      lines: [
        { say: 'Here is what we need. The amount of the decrease is the original amount minus the new amount.', show: 'm.0' },
        { say: 'The percent decrease is that amount divided by the original, written as a percent.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Subtract** to find the amount of the decrease', '**Divide** by the **original** salary', 'Write it as a **percent**, to the nearest tenth'] }],
      lines: [
        { say: 'Here is the plan. Subtract, to find the amount of the decrease.', show: 'plan.0' },
        { say: 'Divide by the original salary.', show: 'plan.1' },
        { say: 'Then write it as a percent, to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Decrease, divide, percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['42{,}000 - 37{,}800 = \\opp{4{,}200}', '\\dfrac{4{,}200}{\\adj{42{,}000}} = 0.1', '0.1 = \\good{10\\%} = 10.0\\%'] }],
      lines: [
        { say: 'Step one. 42 thousand minus 37 thousand 800 is 4 thousand 200. Her salary went down by 4 thousand 200 dollars.', caption: 'Step one. 42,000 − 37,800 = 4,200. Her salary went down by $4,200.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Divide by the original salary, last year\'s 42 thousand. 4 thousand 200 over 42 thousand is 0.1.', caption: 'Step two. Divide by the original salary, last year’s 42,000. 4,200 ÷ 42,000 = 0.1.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 0.1 is 10 percent. To the nearest tenth, that is 10.0 percent. Sheila\'s salary decreased by 10 percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bar('ck', '10\\%'), { kind: 'math', id: 'm', size: 'md', lines: ['10\\% \\text{ of } 42{,}000 = 4{,}200', '42{,}000 - 4{,}200 = 37{,}800 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 10 percent of 42 thousand is 4 thousand 200.', caption: 'Let us check. 10% of 42,000 is 4,200.', show: ['ck.last', 'ck.p0', 'ck.p1', 'ck.below0', 'ck.below1', 'm.0'], focus: 'm.0' },
        { say: 'Take that away from 42 thousand, and you get 37 thousand 800: this year\'s salary. It checks out.', caption: 'Take that away from 42,000, and you get 37,800: this year’s salary. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['11.1%', 'divided by the **new** salary: divide by the **original**'],
            ['90%', 'that is how much is **left**, not the decrease'],
            ['\\$4,200', 'that is the **amount**: the question asks for a **percent**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '11.1 percent divides by this year\'s salary, 37 thousand 800. A percent change always compares with the original amount.', caption: '11.1% divides by this year’s salary, 37,800. A percent change always compares with the original amount.' },
        { say: '90 percent is this year\'s salary over last year\'s. That is how much is left, not how much it went down.' },
        { say: 'And 4 thousand 200 dollars is the amount of the decrease. The question asks for the percent.', caption: 'And $4,200 is the amount of the decrease. The question asks for the percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The price of a jacket drops from \\$80 to \\$60. What is the percent decrease?',
          choices: ['20%', '33.3%', '75%', '25%'],
          answer: 3,
          working: '80 − 60 = 20, and 20 ÷ 80 = 0.25 = 25%.',
        },
      ],
      lines: [
        { say: 'Your turn. The price of a jacket drops from 80 dollars to 60 dollars. What is the percent decrease? Pause the video and try it.', caption: 'Your turn. The price of a jacket drops from $80 to $60. What is the percent decrease? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The price drops by 20 dollars. Divide by the original price, 80: 20 over 80 is 0.25, which is 25 percent. Choice "D".', caption: 'The price drops by $20. Divide by the original price, 80: 20 ÷ 80 = 0.25, which is 25%. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Decrease $=$ original $-$ new', 'Divide by the **original**', 'Multiply by $100$ to get a **percent**', 'Check: take the percent **of** the original'] }],
      lines: [
        { say: 'Here is what to remember. The decrease is the original amount minus the new amount.', show: 'sum.0' },
        { say: 'Divide it by the original amount.', show: 'sum.1' },
        { say: 'Multiply by 100 to write it as a percent.', show: 'sum.2' },
        { say: 'And check by taking that percent of the original. For more on percent change and combined percents, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
