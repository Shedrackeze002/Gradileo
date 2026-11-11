import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-26-1',
  lessonId: 'mx-26-1',
  title: 'Nominal and Effective Interest Rates',
  thumbnail: 'm',
  summary: 'The nominal rate is the quoted yearly rate; the effective rate gives the same growth with interest added once a year. With interest added m times a year, 1 + i = (1 + r/m)^m, so 12% compounded monthly is 12.68% effective. Compare offers by their effective rates. For t years, A = P(1 + r/m)^(mt).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Interest Rates, Annuities, Loans and Shares', title: 'Nominal and Effective Interest Rates', subtitle: 'Comparing interest rates fairly' }],
      lines: [
        { say: 'Two banks both advertise twelve percent per year. One adds interest once a year, and the other adds it every month. They do not pay the same.', show: 'title' },
        { say: 'In this video, you will learn the difference between nominal and effective rates, and how to compare offers fairly.' },
      ],
    },
    {
      chapter: 'Two kinds of rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Nominal and effective rates', md: 'The **nominal rate** is the quoted yearly rate. The **effective rate** is the rate that gives the same growth with interest added once a year.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['1 + i = \\left(1 + \\dfrac{r}{m}\\right)^m'] },
      ],
      lines: [
        { say: 'The nominal rate is the yearly rate that is quoted, before we take account of how often interest is added. The effective rate is the rate that would give the same growth if interest were added just once a year.', show: 'def' },
        { say: 'If the nominal rate is r and interest is added m times a year, each time the rate is r over m. After one year, one dollar has grown to one plus r over m, to the power m. That equals one plus the effective rate, i.', show: 'm.0', focus: 'm.0' },
        { say: 'For interest added half-yearly, m is two. Quarterly, m is four, and monthly, m is twelve.' },
      ],
    },
    {
      chapter: 'Finding the effective rate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8\\% \\text{ quarterly}: \\ 1 + i = 1.02^4 \\approx 1.082432 \\ \\Rightarrow \\ 8.24\\%', '12\\% \\text{ monthly}: \\ 1 + i = 1.01^{12} \\approx 1.126825 \\ \\Rightarrow \\ 12.68\\%'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Compare effective rates', md: '$10\\%$ compounded monthly is $10.47\\%$ effective, which beats $10.25\\%$ compounded once a year.' },
      ],
      lines: [
        { say: 'A nominal rate of eight percent compounded quarterly gives two percent each quarter. One point zero two to the power four is about one point zero eight two four, so the effective rate is about eight point two four percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve percent compounded monthly gives one percent each month. One point zero one to the power twelve is about one point one two six eight, so the effective rate is twelve point six eight percent.', show: 'm.1', focus: 'm.1' },
        { say: 'So the bank that adds interest monthly really pays more. A higher nominal rate is not always the better offer, so change both offers to effective rates before comparing them.', show: 'oops' },
      ],
    },
    {
      chapter: 'Back to nominal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.1 = \\left(1 + \\dfrac{r}{4}\\right)^4', '1 + \\dfrac{r}{4} = 1.1^{1/4} \\approx 1.024114', 'r \\approx 4 \\times 0.024114 \\approx 9.65\\%'] },
      ],
      lines: [
        { say: 'To go back from an effective rate to a nominal rate, use the same formula and solve for r. Suppose the effective rate is ten percent, compounded quarterly.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the fourth root of one point one.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract one and multiply by four. The nominal rate is about nine point six five percent, a little less than the effective rate, as it must be.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Compound interest',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = P\\left(1 + \\dfrac{r}{m}\\right)^{mt}', 'A = 2000 \\times 1.005^{36} \\approx 2393.36'] },
        { kind: 'text', id: 'q', md: '\\$2,000 for $3$ years at $6\\%$ per year, compounded monthly.', size: 'md' },
      ],
      lines: [
        { say: 'For an amount P invested for t years at a nominal rate r, compounded m times a year, the rate for one period is r over m, and there are m t periods.', show: 'm.0', focus: 'm.0' },
        { say: 'Two thousand dollars is invested for three years at six percent per year, compounded monthly.', show: 'q' },
        { say: 'The monthly rate is half a percent, and there are thirty-six months. The final amount is two thousand three hundred and ninety-three dollars and thirty-six cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the effective rate for a nominal rate of $6\\%$ per year, compounded half-yearly.',
          choices: ['$6.00\\%$', '$3.00\\%$', '$6.09\\%$', '$6.17\\%$'],
          answer: 2,
          working: '$1 + i = 1.03^2 = 1.0609$, so $i = 6.09\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the effective rate for a nominal rate of six percent per year, compounded half-yearly. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Each half-year the rate is three percent, and one point zero three squared is one point zero six zero nine, so the effective rate is six point zero nine percent. Choice D is the effective rate for monthly compounding.', show: 'q.answer' },
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
          items: ['Nominal: the quoted rate. Effective: the same growth, added once a year.', '$1 + i = \\left(1 + \\dfrac{r}{m}\\right)^m$.', 'Compare offers by their effective rates.', '$A = P\\left(1 + \\dfrac{r}{m}\\right)^{mt}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The nominal rate is the quoted yearly rate, and the effective rate gives the same growth with interest added once a year.', show: 'sum.0' },
        { say: 'One plus the effective rate equals one plus r over m, to the power m.', show: 'sum.1' },
        { say: 'To compare offers, change each one to its effective rate.', show: 'sum.2' },
        { say: 'And for compound interest, use the rate for one period and the number of periods. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
