import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-26-3',
  lessonId: 'mx-26-3',
  title: 'Present Value and Loans',
  thumbnail: 'm',
  summary: 'The present value of an annuity is what its future payments are worth today: P = x[1 − (1 + i)^−n]/i. A loan is the present value of its repayments, so 400 dollars a month for 3 years at 6% supports a loan of 13,148.41 dollars. The repayment on a loan is x = P × i/[1 − (1 + i)^−n], and the total interest is the total repaid minus the amount borrowed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Interest Rates, Annuities, Loans and Shares', title: 'Present Value and Loans', subtitle: 'What future payments are worth today' }],
      lines: [
        { say: 'A loan is repaid with equal payments, but the payments add up to more than the amount borrowed. To find a fair repayment, we ask what the future payments are worth today.', show: 'title' },
        { say: 'In this video, you will learn to find the present value of a series of payments, and to work out the repayment on a loan.' },
      ],
    },
    {
      chapter: 'Present value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Present value of an annuity', md: 'The single amount that, invested today at the given rate, would pay for all of the payments.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['P = \\dfrac{x\\left[1 - (1 + i)^{-n}\\right]}{i}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The power is negative', md: 'Use $(1 + i)^{-n}$, not $(1 + i)^n$.' },
      ],
      lines: [
        { say: 'The present value of an annuity is the single amount that, invested today, would pay for all of its payments.', show: 'def' },
        { say: 'A payment made k periods from now is worth that payment divided by one plus i to the power k, today. Adding these gives a geometric series, and its sum is this formula.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that the power is negative. Using a positive power gives the wrong bracket, and a much larger, wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'A fund that pays out',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A fund must pay \\$5,000 at the end of every year for $4$ years, and earns $8\\%$ per year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{5000\\left[1 - 1.08^{-4}\\right]}{0.08} \\approx 16560.63'] },
      ],
      lines: [
        { say: 'A fund must pay five thousand dollars at the end of every year for four years, and it earns eight percent per year. How much must it hold now?', show: 'q' },
        { say: 'The present value is sixteen thousand five hundred and sixty dollars and sixty-three cents. The payments total twenty thousand dollars, but the fund needs less, because it keeps earning interest while it pays out.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A loan',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{400\\left[1 - 1.005^{-36}\\right]}{0.005} \\approx 13148.41', 'x = \\dfrac{P \\times i}{1 - (1 + i)^{-n}}', 'x = \\dfrac{15000 \\times 0.0075}{1 - 1.0075^{-60}} \\approx 311.38'] },
      ],
      lines: [
        { say: 'When a bank lends money, the amount it lends is the present value of the repayments. A borrower can repay four hundred dollars a month for three years, at six percent compounded monthly. The largest loan is thirteen thousand one hundred and forty-eight dollars and forty-one cents.', show: 'm.0', focus: 'm.0' },
        { say: 'More often the loan is known, and the repayment is wanted. Rearranging the formula gives this.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifteen thousand dollars is borrowed for five years at nine percent compounded monthly. The monthly rate is zero point seven five percent, and there are sixty payments. The repayment is three hundred and eleven dollars and thirty-eight cents a month.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Total interest',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 \\times 311.38 = 18682.80', '18682.80 - 15000 = 3682.80'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Paying over a longer time', md: 'Over $10$ years the repayment falls to about \\$190 a month, but the interest rises to about \\$7,800.' },
      ],
      lines: [
        { say: 'The total repaid is sixty times the repayment, eighteen thousand six hundred and eighty-two dollars and eighty cents.', show: 'm.0', focus: 'm.0' },
        { say: 'The total interest is the total repaid minus the amount borrowed, about three thousand six hundred and eighty-three dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'A longer loan has smaller repayments but more of them, so the total interest is larger.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fund pays \\$2,000 at the end of every year for $3$ years and earns $5\\%$ per year. How much must it hold now?',
          choices: ['\\$6,000.00', '\\$6,305.00', '\\$5,714.29', '\\$5,446.50'],
          answer: 3,
          working: '$P = \\dfrac{2000\\left[1 - 1.05^{-3}\\right]}{0.05} = \\dfrac{2000 \\times 0.136162}{0.05} \\approx 5446.50$.',
        },
      ],
      lines: [
        { say: 'Your turn. A fund pays two thousand dollars at the end of every year for three years, and earns five percent per year. How much must it hold now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. One minus one point zero five to the power negative three is about zero point one three six one six two. Times two thousand, divided by zero point zero five, gives five thousand four hundred and forty-six dollars and fifty cents. Choice B is the future value.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Present value: $P = \\dfrac{x\\left[1 - (1 + i)^{-n}\\right]}{i}$.', 'A loan is the present value of its repayments.', 'Repayment: $x = \\dfrac{P \\times i}{1 - (1 + i)^{-n}}$.', 'Total interest $=$ total repaid $-$ amount borrowed.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The present value of an annuity is what its future payments are worth today.', show: 'sum.0' },
        { say: 'A loan is the present value of its repayments.', show: 'sum.1' },
        { say: 'Rearranging the formula gives the repayment on a loan.', show: 'sum.2' },
        { say: 'And the total interest is the total repaid minus the amount borrowed. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
