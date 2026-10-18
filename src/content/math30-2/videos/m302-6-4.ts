import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, hline, name, numbers, plane, plot } from './lib/m302-6-graphs.ts';

// $1000 at 5% per year, compounded annually: its value at the end of each year.
const g = plane({ x: [0, 20], y: [0, 3000], yStep: 250, every: 0, width: 8, height: 7, titles: { x: '\\text{Years}', y: '\\text{Value (\\$)}' } });
const value = (n: number) => 1000 * 1.05 ** n;
const years = Array.from({ length: 21 }, (_, n) => n).filter((n) => n !== 14 && n !== 15);

const video: Explainer = {
  id: 'm302-6-4',
  lessonId: 'm302-6-4',
  title: 'Modelling with Exponential and Logarithmic Functions, Part 1: Compound Interest',
  thumbnailTitle: 'Compound Interest',
  thumbnail: 'gr',
  summary: 'The compound interest formula A = P(1 + i)ⁿ with the rate and the number of periods adjusted for the compounding, $5000 at 4.2% per year compounded monthly for 6 years ($6430.15, earning $1430.15), and using logarithms to find that money doubles in about 14.2 years at 5% per year compounded annually.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 1', title: 'Compound Interest', subtitle: 'How money grows, and how long it takes' }],
      lines: [
        { say: 'Savings accounts and loans grow by compound interest. Each period, interest is paid on the whole amount, including the interest already earned.', show: 'title' },
        { say: 'In this video, you will use the compound interest formula, and use logarithms to find how long an investment takes to double. In every problem, the rate is given in the question.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'w', size: 'md', lines: ['1000 \\xrightarrow{\\times 1.05} 1050 \\xrightarrow{\\times 1.05} 1102.50 \\xrightarrow{\\times 1.05} \\cdots'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Compound interest', md: '$A = P(1 + i)^n$, where $P$ is the principal (the amount invested), $i$ is the interest rate per compounding period as a decimal, $n$ is the number of compounding periods and $A$ is the final amount. The interest earned is $A - P$.' },
      ],
      lines: [
        { say: 'Why is compound interest exponential? Suppose 1,000 dollars earns five percent a year. After one year, it is 1,000 times 1.05: 1,050 dollars.', show: 'w.0' },
        { say: 'After two years, it is 1,050 times 1.05: 1,102 dollars and 50 cents. The second year’s interest is bigger, because it is paid on the first year’s interest too. Each year multiplies the amount by 1.05.', focus: 'w.0' },
        { say: 'That gives the compound interest formula: A equals P times one plus i, to the power n. P is the principal, the amount invested. i is the interest rate per compounding period, as a decimal. n is the number of compounding periods, and A is the final amount.', show: 'def' },
        { say: 'The interest earned is the final amount minus the principal: A minus P.' },
      ],
    },
    {
      chapter: 'Compounding periods',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Compounded k times a year', md: 'Divide the annual rate by $k$, and multiply the number of years by $k$.' },
        {
          kind: 'table',
          id: 't',
          head: ['4.2% per year for 6 years', 'Periods per year', '$i$', '$n$'],
          rows: [
            ['compounded annually', '$1$', '$0.042$', '$6$'],
            ['compounded semi-annually', '$2$', '$0.021$', '$12$'],
            ['compounded quarterly', '$4$', '$0.0105$', '$24$'],
            ['compounded monthly', '$12$', '$0.0035$', '$72$'],
          ],
        },
      ],
      lines: [
        { say: 'Interest is often paid more than once a year. If the annual rate is compounded k times a year, divide the rate by k, and multiply the number of years by k.', show: 'tip' },
        { say: 'Take 4.2 percent per year, for six years. Compounded annually, the rate per period is 0.042, and there are six periods.', show: 't.0', focus: 't.0' },
        { say: 'Semi-annually means twice a year: the rate per period is 0.021, and there are twelve periods.', show: 't.1', focus: 't.1' },
        { say: 'Quarterly means four times a year: 0.0105, and 24 periods.', show: 't.2', focus: 't.2' },
        { say: 'And monthly means twelve times a year: 0.042 over twelve is 0.0035, and twelve times six is 72 periods.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Monthly compounding',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kofi invests \\$5000 at 4.2% per year, compounded monthly, for 6 years. Find the final amount and the interest earned.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['i = \\dfrac{0.042}{12} = 0.0035, \\qquad n = 12 \\times 6 = 72', 'A = 5000(1.0035)^{72} = 5000(1.28603\\ldots) = 6430.150\\ldots', 'A - P = 6430.15 - 5000 = 1430.15'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The investment is worth **\\$6430.15**, so it earned **\\$1430.15** in interest.' },
      ],
      lines: [
        { say: 'Kofi invests 5,000 dollars at 4.2 percent per year, compounded monthly, for six years. Find the final amount, and the interest earned.', show: 'q' },
        { say: 'Monthly means twelve periods a year. The rate per month is 0.042 over twelve, which is 0.0035, and the number of months is twelve times six, which is 72.', show: 'm.0', focus: 'm.0' },
        { say: 'So A equals 5,000 times 1.0035 to the power 72. 1.0035 to the power 72 is 1.28603, and 5,000 times that is 6,430.150.', show: 'm.1', focus: 'm.1' },
        { say: 'Money is rounded to the cent only at the end, so the final amount is 6,430 dollars and 15 cents.' },
        { say: 'The interest earned is the final amount minus the principal: 6,430.15 minus 5,000, which is 1,430 dollars and 15 cents.', show: ['m.2', 'a'], focus: ['m.2', 'a'] },
      ],
    },
    {
      chapter: 'How long to double?',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          numbers(g, 4, 500),
          hline(g, 'twice', 2000, 'opp'),
          name(g, 'twice-t', 0.3, 2000, '\\text{double: } 2000', 'above right', 'opp'),
          plot(g, { id: 'curve', f: value, tone: 'muted', dashed: true, samples: 120 }),
          dots(g, years.map((n) => ({ id: `y${n}`, x: n, y: value(n), tone: 'brand' as const, group: 'pay' }))),
          dots(g, [
            { id: 'y14', x: 14, y: value(14), tone: 'bad', place: 'below right', group: 'pay' },
            { id: 'y15', x: 15, y: value(15), tex: '15', tone: 'good', place: 'above left', group: 'pay' },
          ]),
          guide(g, 'down', [Math.log10(2) / Math.log10(1.05), 2000], [Math.log10(2) / Math.log10(1.05), 0], 'opp'),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2P = P(1.05)^{n}', '1.05^{n} = 2', 'n\\log 1.05 = \\log 2', 'n = \\dfrac{\\log 2}{\\log 1.05} = 14.2067\\ldots'] }],
      lines: [
        { say: 'How many years does it take money to double at five percent per year, compounded annually? Now the unknown is the number of periods, in the exponent. So use logarithms.', show: ['gr.grid', 'gr.axes'] },
        { say: 'Doubling means the final amount is two P. So two P equals P times 1.05 to the power n. Divide both sides by P: 1.05 to the power n equals two. The amount invested does not matter.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Take the log of both sides, and bring n down: n times log 1.05 equals log two.', show: 'm.2', focus: 'm.2' },
        { say: 'So n equals log two over log 1.05, which is 14.2067: about 14.2 years.', show: ['m.3', 'gr.curve', 'gr.twice', 'gr.twice-t', 'gr.down'], focus: ['m.3', 'gr.down'] },
        { say: 'But interest is paid only once a year. The dots show 1,000 dollars at the end of each year. After 14 years, it is worth about 1,980 dollars, just short of double. After the fifteenth payment, it is worth about 2,079 dollars.', show: 'gr.pay', focus: ['gr.y14', 'gr.y15'] },
        { say: 'So the money has doubled after 15 years. The formula gives about 14.2 years, and the payments make it the 15th year.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change both the rate and the number of periods', md: 'For monthly compounding, divide the rate by $12$ **and** multiply the years by $12$. Changing only one gives a wrong answer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5000(1.0035)^{72} \\approx \\good{6430.15}', '5000(1.042)^{72} \\approx \\bad{96\\,704}', '5000(1.0035)^{6} \\approx \\bad{5105.92}'] },
      ],
      lines: [
        { say: 'With compounding, change both the rate and the number of periods. For Kofi’s investment, 5,000 times 1.0035 to the power 72 is right.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Using the yearly rate, 4.2 percent, for every one of the 72 months gives almost 97 thousand dollars: far too much.', show: 'm.1', focus: 'm.1' },
        { say: 'And using the monthly rate for only six periods gives about 5,106 dollars: far too little. Divide the rate and multiply the years, both.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '\\$2000 is invested at 6% per year, compounded quarterly, for 5 years. Which expression gives the final amount, in dollars?',
          choices: ['$2000(1.06)^{5}$', '$2000(1.06)^{20}$', '$2000(1.015)^{5}$', '$2000(1.015)^{20}$'],
          answer: 3,
          working: 'Quarterly is 4 times a year: $i = \\dfrac{0.06}{4} = 0.015$ and $n = 4 \\times 5 = 20$. So $A = 2000(1.015)^{20} \\approx 2693.71$.',
        },
      ],
      lines: [
        { say: 'Your turn. 2,000 dollars is invested at six percent per year, compounded quarterly, for five years. Which expression gives the final amount? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Quarterly means four times a year, so the rate per period is six percent divided by four, which is 0.015, and the number of periods is four times five, which is 20. Choice B uses the yearly rate for every quarter, so it pays four times too much interest each period.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$A = P(1 + i)^n$: $i$ is the rate per period and $n$ the number of periods.', 'Compounded $k$ times a year: divide the rate by $k$ and multiply the years by $k$.', 'The interest earned is $A - P$.', 'To find a time, isolate the power, then take $\\log$ of both sides.'] }],
      lines: [
        { say: 'Let’s sum up. Compound interest is A equals P times one plus i, to the power n, where i is the rate per period, and n is the number of periods.', show: 'sum.0' },
        { say: 'When interest is compounded k times a year, divide the rate by k, and multiply the years by k.', show: 'sum.1' },
        { say: 'The interest earned is the final amount minus the principal.', show: 'sum.2' },
        { say: 'And to find a time, isolate the power, then take the log of both sides. In the next part, we model growth, depreciation and half-life. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
