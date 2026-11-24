import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 4.3 (credit cards and loans). The question is a Check Your
// Understanding item from OpenStax Contemporary Mathematics, word for word (section 6.10, Credit
// Cards, CC BY-NC-SA 4.0). The book's rule: I = ADB × r × d ÷ 365, rounded up to the next penny.
// 487.65 × 0.168 × 30 = 2,457.756, and ÷ 365 = 6.7336..., which rounds up to $6.74; the balance due
// is 689.47 + 6.74 = $696.21, as in the book's answer.

const QUESTION =
  'Find the balance due on a credit card statement if ADB = $487.65, the annual interest rate is 16.8%, the billing cycle was 30 days, and the balance at the end of the billing cycle, before interest is added, was $689.47.';

const video: Explainer = {
  id: 'xq-m204-4-3',
  lessonId: '',
  exam: {
    lesson: 'm204-4-3',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 6.10, Credit Cards',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-10-credit-cards',
    question: QUESTION,
  },
  title: 'Exam Question: The Balance Due on a Credit Card (Credit Cards and Loans)',
  thumbnailTitle: 'What Is the Balance Due?',
  summary:
    'A real test question, solved one small step at a time: a credit card has an average daily balance of $487.65, an annual interest rate of 16.8% and a 30-day billing cycle, and the balance before interest is $689.47. The interest is $487.65 × 0.168 × 30 ÷ 365 = 6.7336…, which the card rounds up to $6.74. The balance due is $689.47 + $6.74 = $696.21. Then we check that the interest makes sense, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Is the Balance Due?', subtitle: 'Credit card interest, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a credit card bill. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Find the balance due on a credit card statement if ADB = \\$487.65, the annual interest rate is $16.8\\%$, the billing cycle was $30$ days, and the balance at the end of the billing cycle, before interest is added, was \\$689.47.',
          answer: '\\$696.21',
          working: 'I = 487.65 × 0.168 × 30 ÷ 365 = 6.7336… → 6.74; 689.47 + 6.74 = 696.21',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the balance due on a credit card statement. The average daily balance, A D B, is 487 dollars 65. The annual interest rate is 16.8 percent, and the billing cycle was 30 days.', caption: 'Find the balance due on a credit card statement. The average daily balance, ADB, is $487.65. The annual interest rate is 16.8%, and the billing cycle was 30 days.' },
        { say: 'The balance at the end of the billing cycle, before interest is added, was 689 dollars 47.', caption: 'The balance at the end of the billing cycle, before interest is added, was $689.47.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Average daily balance (ADB)', md: 'The balance on the card changes as you buy and pay. The **ADB** is the **average** of the balance over every day of the billing cycle.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Balance due', md: 'The **balance due** is what you owe at the end: the balance **plus** the interest for the cycle.' },
      ],
      lines: [
        { say: 'The balance on a credit card changes as you buy things and make payments. The average daily balance is the average of the balance over every day of the billing cycle.', show: 'a' },
        { say: 'The card charges interest on that average. The balance due is what you owe at the end: the balance, plus the interest for the cycle.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['I = \\dfrac{\\text{ADB} \\times r \\times d}{365}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The book’s rules', md: '$r$ is the annual rate as a **decimal** and $d$ is the number of **days** in the cycle. The interest is rounded **up** to the next cent.' },
      ],
      lines: [
        { say: 'Here is what we need. The interest for one billing cycle is the A D B, times the annual rate r, times the number of days d, all divided by 365, the days in a year.', show: 'm' },
        { say: 'The rate goes in as a decimal. And in this book, the card always rounds the interest up to the next cent.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $16.8\\%$ as a **decimal**', 'Find the **interest**, and round **up**', '**Add** it to the balance'] }],
      lines: [
        { say: 'Here is the plan. Write 16.8 percent as a decimal.', show: 'plan.0' },
        { say: 'Find the interest, and round it up to the cent.', show: 'plan.1' },
        { say: 'Then add the interest to the balance.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The interest',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'r = 16.8\\% = 0.168',
            'I = \\dfrac{\\$487.65 \\times 0.168 \\times 30}{365} = \\dfrac{2{,}457.756}{365}',
            '= 6.7336\\ldots \\approx \\good{\\$6.74}',
          ],
        },
      ],
      lines: [
        { say: 'Step one. 16.8 percent is 0.168.', show: 'm.0' },
        { say: 'Step two. 487.65 times 0.168 times 30 is 2 thousand 457.756. Divide by 365.', caption: 'Step two. 487.65 × 0.168 × 30 = 2,457.756. Divide by 365.', show: 'm.1' },
        { say: 'That gives 6.7336, and so on. Rounded up to the next cent, the interest is 6 dollars and 74 cents.', caption: 'That gives 6.7336… Rounded up to the next cent, the interest is $6.74.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The balance due',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$689.47 + \\$6.74 = \\good{\\$696.21}'] }],
      lines: [
        { say: 'Step three. Add the interest to the balance: 689.47 plus 6.74 is 696 dollars and 21 cents. That is the balance due.', caption: 'Step three. Add the interest to the balance: $689.47 + $6.74 = $696.21. That is the balance due.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['16.8\\% \\div 12 = 1.4\\% \\text{ a month}', '1.4\\% \\text{ of } \\$487.65 \\approx \\$6.83 \\text{, close to } \\$6.74 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the interest makes sense. 30 days is about one month, and 16.8 percent a year is about 1.4 percent a month.', show: 'm.0' },
        { say: '1.4 percent of 487 dollars 65 is about 6 dollars 83. That is close to 6 dollars 74. A month is a little more than 30 days, so ours should be a little less. It checks out.', caption: '1.4% of $487.65 is about $6.83. That is close to $6.74. A month is a little more than 30 days, so ours should be a little less. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$699.00', 'used \\$689.47: interest is on the **ADB**'],
            ['\\$696.20', 'rounded **down**: the card rounds **up**'],
            ['\\$6.74', 'that is only the **interest**: add the balance'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '699 dollars works out the interest on 689.47. The interest is on the average daily balance, 487.65.', caption: '$699.00 works out the interest on $689.47. The interest is on the average daily balance, $487.65.' },
        { say: '696 dollars 20 rounds the interest down to 6.73. The card rounds up, to 6.74.', caption: '$696.20 rounds the interest down to $6.73. The card rounds up, to $6.74.' },
        { say: 'And 6 dollars 74 is only the interest. The question asks for the balance due, so add the balance.', caption: 'And $6.74 is only the interest. The question asks for the balance due, so add the balance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A credit card has an ADB of \\$1,000 for a 30-day billing cycle, at an annual interest rate of $18\\%$. Interest is rounded up to the next cent. What is the interest for the cycle?',
          choices: ['\\$14.80', '\\$14.79', '\\$15.00', '\\$180.00'],
          answer: 0,
          working: '1,000 × 0.18 × 30 ÷ 365 = 14.794…, which rounds up to 14.80.',
        },
      ],
      lines: [
        { say: 'Your turn. A credit card has an average daily balance of 1 thousand dollars for a 30 day billing cycle, at an annual interest rate of 18 percent. Interest is rounded up to the next cent. What is the interest? Pause the video and try it.', caption: 'Your turn. A credit card has an ADB of $1,000 for a 30-day billing cycle, at an annual interest rate of 18%. Interest is rounded up to the next cent. What is the interest? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1 thousand times 0.18 times 30, divided by 365, is 14.794. Rounded up, that is 14 dollars 80. Choice "A".', caption: '$1,000 × 0.18 × 30 ÷ 365 = 14.794… Rounded up, that is $14.80. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$I = \\text{ADB} \\times r \\times d \\div 365$', 'Interest is on the **ADB**', 'Round the interest **up**', 'Balance due $=$ balance $+$ interest'] }],
      lines: [
        { say: 'Here is what to remember. Credit card interest is the A D B, times the rate, times the days, divided by 365.', show: 'sum.0' },
        { say: 'The interest is worked out on the average daily balance.', show: 'sum.1' },
        { say: 'The card rounds the interest up to the next cent.', show: 'sum.2' },
        { say: 'And the balance due is the balance plus the interest. For more on credit cards and loans, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
