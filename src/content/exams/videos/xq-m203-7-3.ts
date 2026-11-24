import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 7.3 (credit cards and loans). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 6.10, Credit Cards, CC BY-NC-SA 4.0).
// I = ADB × r × d ÷ 365 = 1428.50 × 0.159 × 31 ÷ 365 ≈ 19.2906. The book rounds credit card
// interest up to the next cent, so the interest is $19.30, as in the book's answer.
// Check: 19.30 × 365 ÷ 31 ÷ 1428.50 ≈ 0.159.

const QUESTION = 'A credit card has an average daily balance of $1,428.50 during a 31-day billing cycle. Find the interest if the interest rate is 15.9%.';

const video: Explainer = {
  id: 'xq-m203-7-3',
  lessonId: '',
  exam: {
    lesson: 'm203-7-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.10, Credit Cards',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-10-credit-cards',
    question: QUESTION,
  },
  title: 'Exam Question: One Month of Credit Card Interest (Credit Cards and Loans)',
  thumbnailTitle: 'What Does a Month of Credit Cost?',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: a credit card has an average daily balance of $1,428.50 during a 31-day billing cycle, at 15.9% interest a year. Find the interest. The interest for one billing cycle is I = ADB × r × d ÷ 365 = 1,428.50 × 0.159 × 31 ÷ 365 ≈ 19.29, which the book rounds up to the next cent: $19.30. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does a Month of Credit Cost?', subtitle: 'Credit card interest, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about credit card interest. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A credit card has an average daily balance of \\$1,428.50 during a 31-day billing cycle. Find the interest if the interest rate is $15.9\\%$.',
          answer: '\\$19.30',
          working: '1,428.50 × 0.159 × 31 ÷ 365 ≈ 19.29, rounded up to the next cent',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A credit card has an average daily balance of 1 thousand 428 dollars and 50 cents during a 31-day billing cycle. Find the interest if the interest rate is 15.9 percent.', caption: 'A credit card has an average daily balance of $1,428.50 during a 31-day billing cycle. Find the interest if the interest rate is 15.9%.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'adb', tone: 'definition', title: 'Average daily balance', md: 'The balance on the card changes as you spend and pay. The **average daily balance** is its average over the days of the **billing cycle**.' },
        { kind: 'callout', id: 'r', tone: 'key', title: 'A yearly rate', md: 'The $15.9\\%$ is a rate for a whole **year**. We want the interest for just **31 days** of it.' },
      ],
      lines: [
        { say: 'The balance on a credit card changes as you spend and pay. The average daily balance is its average over the days of the billing cycle, here 31 days.', show: 'adb' },
        { say: 'The 15.9 percent is a rate for a whole year. We want the interest for just the 31 days of this billing cycle.', show: 'r' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['I = \\dfrac{\\text{ADB} \\times r \\times d}{365}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The letters', md: 'ADB is the average daily balance, $r$ the yearly rate as a **decimal**, and $d$ the **days** in the billing cycle. Dividing by $365$ turns the yearly rate into a daily one.' },
      ],
      lines: [
        { say: 'Here is what we need. The interest is the average daily balance, times the rate, times the number of days, divided by 365.', show: 'f' },
        { say: 'The rate goes in as a decimal. Dividing by 365 turns the yearly rate into a daily one, and multiplying by d counts the days in the cycle.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the rate as a **decimal**', 'Put the numbers into the **formula**', '**Round** to the cent'] }],
      lines: [
        { say: 'Here is the plan. Write the rate as a decimal.', show: 'plan.0' },
        { say: 'Put the numbers into the formula.', show: 'plan.1' },
        { say: 'Then round to the cent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Into the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15.9\\% = 0.159', 'I = \\dfrac{1428.50 \\times 0.159 \\times 31}{365}', '\\approx 19.2906'] }],
      lines: [
        { say: 'Step one. 15.9 percent as a decimal is 0.159.', show: 'm.0' },
        { say: 'Step two. Into the formula: 1 thousand 428.50, times 0.159, times 31 days, divided by 365.', caption: 'Step two. Into the formula: 1,428.50 × 0.159 × 31 ÷ 365.', show: 'm.1' },
        { say: 'On a calculator, that is about 19.2906.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Round',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['19.2906 \\to \\good{\\$19.30}'] }],
      lines: [
        { say: 'Step three. The book rounds credit card interest up to the next cent. So 19.2906 becomes 19 dollars and 30 cents.', caption: 'Step three. The book rounds credit card interest up to the next cent. So 19.2906 becomes $19.30.', show: 'm.0', focus: 'm.0' },
        { say: 'The interest for this billing cycle is 19 dollars and 30 cents. If a test asks for ordinary rounding, it would be 19 dollars and 29 cents.', caption: 'The interest for this billing cycle is $19.30. If a test asks for ordinary rounding, it would be $19.29.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1428.50 \\times 0.159 \\approx \\$227.13 \\text{ a year}', '\\$227.13 \\times \\dfrac{31}{365} \\approx \\$19.29 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. A whole year of interest on 1 thousand 428.50 at 15.9 percent is about 227 dollars and 13 cents.', caption: 'Let us check another way. A whole year of interest on $1,428.50 at 15.9% is about $227.13.', show: 'm.0' },
        { say: '31 days is 31 out of 365 days of the year. And 227.13 times 31, divided by 365, is about 19.29. It checks out.', caption: '31 days is 31 out of 365 days of the year. 31/365 of $227.13 is about $19.29. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$227.13', 'a whole **year** of interest: use the **31 days**'],
            ['\\$1,929.06', 'used $15.9$: write the rate as a **decimal**, $0.159$'],
            ['\\$18.67', 'used $30$ days: this cycle has **31**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '227 dollars and 13 cents is a whole year of interest. The billing cycle is only 31 days.', caption: '$227.13 is a whole year of interest. The billing cycle is only 31 days.' },
        { say: '1 thousand 929 dollars uses 15.9 in place of 0.159. Write the percent as a decimal first.', caption: '$1,929.06 uses 15.9 in place of 0.159. Write the percent as a decimal first.' },
        { say: 'And 18 dollars and 67 cents uses 30 days. This billing cycle has 31.', caption: 'And $18.67 uses 30 days. This billing cycle has 31.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A credit card has an average daily balance of \\$2,000 during a 30-day billing cycle, at $18\\%$ a year. Find the interest, rounded up to the next cent.',
          choices: ['\\$29.59', '\\$360.00', '\\$30.00', '\\$2,958.90'],
          answer: 0,
          working: '2,000 × 0.18 × 30 ÷ 365 ≈ 29.589, so \\$29.59.',
        },
      ],
      lines: [
        { say: 'Your turn. A credit card has an average daily balance of 2 thousand dollars during a 30-day billing cycle, at 18 percent a year. Find the interest, rounded up to the next cent. Pause the video and try it.', caption: 'Your turn. A credit card has an average daily balance of $2,000 during a 30-day billing cycle, at 18% a year. Find the interest, rounded up to the next cent. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 thousand times 0.18 times 30, divided by 365, is about 29.589, which rounds up to 29 dollars and 59 cents. Choice "A".', caption: '2,000 × 0.18 × 30 ÷ 365 ≈ 29.589, which rounds up to $29.59. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$I = \\text{ADB} \\times r \\times d \\div 365$', 'Rate as a **decimal**', 'Count the **days** in the cycle', 'Card interest rounds **up** to the cent'] }],
      lines: [
        { say: 'Here is what to remember. The interest for a billing cycle is the average daily balance, times the rate, times the days, divided by 365.', show: 'sum.0' },
        { say: 'Write the rate as a decimal.', show: 'sum.1' },
        { say: 'Count the days in the billing cycle.', show: 'sum.2' },
        { say: 'And credit card interest is rounded up to the next cent. For more on credit cards and loans, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
