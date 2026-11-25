import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 3.2 (salary, commission, piecework and tips). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 6.3, Solve Sales Tax, Commission, and
// Discount Applications, CC BY-NC-SA 4.0). 17.5% of $4,910 = 0.175 × 4,910 = $859.25, as in the
// book's answer. Check: 10% is 491, 5% is 245.50 and 2.5% is 122.75, and they add to 859.25.

const QUESTION = 'Hector receives 17.5% commission when he sells an insurance policy. How much commission will he receive for selling a policy for $4,910?';

const video: Explainer = {
  id: 'xq-m204-3-2',
  lessonId: '',
  exam: {
    lesson: 'm204-3-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.3, Solve Sales Tax, Commission, and Discount Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-3-solve-sales-tax-commission-and-discount-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Commission on an Insurance Policy (Commission)',
  thumbnailTitle: 'What Does Hector Earn?',
  summary:
    'A real test question, solved one small step at a time: Hector earns 17.5% commission when he sells an insurance policy. How much does he earn on a $4,910 policy? We change 17.5% to the decimal 0.175 and multiply: 0.175 × $4,910 = $859.25. Then we check by splitting 17.5% into 10%, 5% and 2.5%, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does Hector Earn?', subtitle: 'Commission, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about commission. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Hector receives $17.5\\%$ commission when he sells an insurance policy. How much commission will he receive for selling a policy for \\$4,910?',
          answer: '\\$859.25',
          working: '0.175 × 4,910 = 859.25',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Hector receives 17.5 percent commission when he sells an insurance policy. How much commission will he receive for selling a policy for 4 thousand 910 dollars?', caption: 'Hector receives 17.5% commission when he sells an insurance policy. How much commission will he receive for selling a policy for $4,910?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Commission', md: '**Commission** is pay worked out as a **percent of the sales** a person makes. The more Hector sells, the more he earns.' }],
      lines: [
        { say: 'Commission is pay that is worked out as a percent of the sales a person makes. The more Hector sells, the more he earns.', show: 'c' },
        { say: 'So we want 17.5 percent of the 4 thousand 910 dollar policy.', caption: 'So we want 17.5% of the $4,910 policy.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{commission} = \\text{rate} \\times \\text{sales}'] }, { kind: 'callout', id: 'c', tone: 'key', title: 'Percent to decimal', md: 'Divide the percent by $100$: move the decimal point **two places left**. $17.5\\% = 0.175$.' }],
      lines: [
        { say: 'Here is what we need. Commission is the rate times the sales.', show: 'm' },
        { say: 'The rate goes in as a decimal. Divide the percent by 100, which moves the decimal point two places left. 17.5 percent is 0.175.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $17.5\\%$ as a **decimal**', '**Multiply** by the sale', 'Round to the **cent**'] }],
      lines: [
        { say: 'Here is the plan. Write 17.5 percent as a decimal.', show: 'plan.0' },
        { say: 'Multiply by the sale.', show: 'plan.1' },
        { say: 'Then round to the cent, if we need to.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The commission',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17.5\\% = 0.175', '0.175 \\times \\$4{,}910 = \\good{\\$859.25}'] }],
      lines: [
        { say: 'Step one. 17.5 percent is 0.175.', show: 'm.0' },
        { say: 'Step two. 0.175 times 4 thousand 910 is 859.25. That is already to the cent. Hector receives 859 dollars and 25 cents.', caption: 'Step two. 0.175 × $4,910 = $859.25. That is already to the cent. Hector receives $859.25.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Part', 'Of \\$4,910'], rows: [['$10\\%$', '\\$491.00'], ['$5\\%$', '\\$245.50'], ['$2.5\\%$', '\\$122.75'], ['**$17.5\\%$**', '**\\$859.25**']] }],
      lines: [
        { say: 'Let us check by splitting 17.5 percent into 10, 5 and 2.5 percent.', show: 't' },
        { say: '10 percent of 4 thousand 910 is 491. 5 percent is half of that, 245.50. And 2.5 percent is half again, 122.75.', caption: '10% of $4,910 is $491. 5% is half of that, $245.50. And 2.5% is half again, $122.75.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Together, 859 dollars 25. It checks out.', caption: 'Together, $859.25. It checks out.', focus: 't.3' },
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
            ['\\$85.93', 'used $0.0175$: move the point **two** places, not three'],
            ['\\$85,925', 'used $17.5$: write the percent as a **decimal**'],
            ['\\$4,050.75', '**subtracted** the commission from the sale'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '85 dollars 93 uses 0.0175. That moves the decimal point three places. 17.5 percent is 0.175.', caption: '$85.93 uses 0.0175. That moves the decimal point three places. 17.5% is 0.175.' },
        { say: '85 thousand 925 dollars multiplies by 17.5. Commission is never more than the sale here. Write the percent as a decimal.', caption: '$85,925 multiplies by 17.5. Commission is never more than the sale here. Write the percent as a decimal.' },
        { say: 'And 4 thousand 50 dollars 75 subtracts the commission from the sale. The question asks for the commission itself.', caption: 'And $4,050.75 subtracts the commission from the sale. The question asks for the commission itself.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A furniture salesperson earns $6\\%$ commission. How much commission does the salesperson earn on sales of \\$12,500?',
          choices: ['\\$750', '\\$75', '\\$7,500', '\\$11,750'],
          answer: 0,
          working: '0.06 × 12,500 = 750.',
        },
      ],
      lines: [
        { say: 'Your turn. A furniture salesperson earns 6 percent commission. How much commission does the salesperson earn on sales of 12 thousand 500 dollars? Pause the video and try it.', caption: 'Your turn. A furniture salesperson earns 6% commission. How much commission does the salesperson earn on sales of $12,500? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '6 percent is 0.06, and 0.06 times 12 thousand 500 is 750 dollars. Choice "A".', caption: '6% is 0.06, and 0.06 × $12,500 = $750. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Commission $=$ rate $\\times$ sales', 'Percent to decimal: **two** places left', 'Round to the **cent**', '**Check** with $10\\%$ and its halves'] }],
      lines: [
        { say: 'Here is what to remember. Commission is the rate times the sales.', show: 'sum.0' },
        { say: 'To write a percent as a decimal, move the decimal point left, by two places.', show: 'sum.1' },
        { say: 'Round money to the cent.', show: 'sum.2' },
        { say: 'And check with 10 percent and its halves. For more on salary, commission, piecework and tips, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
