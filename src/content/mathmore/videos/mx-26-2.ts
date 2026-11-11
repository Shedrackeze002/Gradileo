import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-26-2',
  lessonId: 'mx-26-2',
  title: 'Annuities and Sinking Funds',
  thumbnail: 'm',
  summary: 'An annuity is a series of equal payments at equal intervals. Its future value is F = x[(1 + i)^n − 1]/i, with i the rate for one period and n the number of payments; 1,000 dollars a year for 5 years at 6% grows to 5,637.09 dollars. For monthly payments, divide the yearly rate by 12 and count months. A sinking fund payment is x = F × i/[(1 + i)^n − 1].',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Interest Rates, Annuities, Loans and Shares', title: 'Annuities and Sinking Funds', subtitle: 'Saving with regular payments' }],
      lines: [
        { say: 'Saving two hundred dollars at the end of every month does not just add up to two hundred dollars times the number of months. Each payment also earns interest, and the earlier payments earn it for longer.', show: 'title' },
        { say: 'In this video, you will learn the annuity formula, which adds all of that growth in one step, and how to use it to save towards a target.' },
      ],
    },
    {
      chapter: 'Annuities',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Annuity', md: 'A series of equal payments at equal intervals. Its **future value** is the total of the payments and their interest, just after the last payment.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i}'] },
      ],
      lines: [
        { say: 'An annuity is a series of equal payments made at equal intervals. Here each payment is made at the end of its interval.', show: 'def' },
        { say: 'The last payment earns no interest, the one before it earns interest for one period, and so on. The total is a geometric series, and its sum is this formula.', show: 'm.0', focus: 'm.0' },
        { say: 'Here x is the payment, i is the interest rate for one period, and n is the number of payments.' },
      ],
    },
    {
      chapter: 'Yearly and monthly',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '\\$1,000 at the end of every year for $5$ years, at $6\\%$ per year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['F = \\dfrac{1000\\left[1.06^5 - 1\\right]}{0.06} \\approx 5637.09'] },
        { kind: 'text', id: 'q2', md: '\\$200 at the end of every month for $5$ years, at $6\\%$ per year compounded monthly.', size: 'md' },
        { kind: 'math', id: 'n', size: 'md', lines: ['i = 0.005, \\ n = 60: \\ F = \\dfrac{200\\left[1.005^{60} - 1\\right]}{0.005} \\approx 13954.01'] },
      ],
      lines: [
        { say: 'One thousand dollars is paid at the end of every year for five years, at six percent per year.', show: 'q1' },
        { say: 'The future value is five thousand six hundred and thirty-seven dollars and nine cents. The payments total five thousand dollars, so the rest is interest.', show: 'm.0', focus: 'm.0' },
        { say: 'With monthly payments and monthly compounding, we work in months. Two hundred dollars is paid every month for five years.', show: 'q2' },
        { say: 'The monthly rate is six percent divided by twelve, half a percent, and there are sixty payments. The future value is thirteen thousand nine hundred and fifty-four dollars and one cent.', show: 'n.0', focus: 'n.0' },
      ],
    },
    {
      chapter: 'Match the periods',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Match the rate to the payments', md: 'With monthly payments, $i = 0.06$ with $n = 5$ is wrong. Count the rate and the payments in the same period.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep the full value', md: 'Do not round $1.005^{60}$ before finishing: it is divided by a very small number.' },
      ],
      lines: [
        { say: 'The rate and the number of payments must both be counted in the same period. For monthly payments, use the monthly rate and the number of months.', show: 'oops' },
        { say: 'And keep the full value on the calculator. Rounding the power early changes the answer by several dollars, because it is then divided by a very small number.', show: 'tip' },
      ],
    },
    {
      chapter: 'Sinking funds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sinking fund', md: 'A fund built up by regular equal payments to reach a known amount at a known time.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{F \\times i}{(1 + i)^n - 1}', 'x = \\dfrac{20000 \\times 0.005}{1.005^{48} - 1} \\approx 369.70'] },
      ],
      lines: [
        { say: 'A sinking fund is built up by regular payments so that it reaches a known amount at a known time, for example to replace a machine.', show: 'def' },
        { say: 'Now the future value is known, and the payment is wanted. Rearranging the annuity formula gives this.', show: 'm.0', focus: 'm.0' },
        { say: 'A fund must hold twenty thousand dollars in four years, at six percent compounded monthly. The monthly payment is three hundred and sixty-nine dollars and seventy cents.', show: 'm.1', focus: 'm.1' },
        { say: 'Without interest, the payment would be about four hundred and seventeen dollars. The interest the fund earns makes each payment smaller.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '\\$500 is paid at the end of every year for $3$ years at $4\\%$ per year. Find the future value.',
          choices: ['\\$1,500.00', '\\$1,560.80', '\\$1,624.32', '\\$1,687.29'],
          answer: 1,
          working: '$F = \\dfrac{500\\left[1.04^3 - 1\\right]}{0.04} = \\dfrac{500 \\times 0.124864}{0.04} = 1560.80$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five hundred dollars is paid at the end of every year for three years, at four percent per year. Find the future value. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One point zero four cubed minus one is zero point one two four eight six four. Times five hundred, divided by zero point zero four, gives one thousand five hundred and sixty dollars and eighty cents. Choice A ignores the interest.', show: 'q.answer' },
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
          items: ['An annuity: equal payments at equal intervals.', '$F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i}$.', 'Monthly: divide the yearly rate by $12$, count months.', 'Sinking fund: $x = \\dfrac{F \\times i}{(1 + i)^n - 1}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An annuity is a series of equal payments at equal intervals.', show: 'sum.0' },
        { say: 'Its future value comes from one formula, with the rate for one period and the number of payments.', show: 'sum.1' },
        { say: 'For monthly payments, divide the yearly rate by twelve and count the payments in months.', show: 'sum.2' },
        { say: 'And a sinking fund payment comes from rearranging the same formula. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
