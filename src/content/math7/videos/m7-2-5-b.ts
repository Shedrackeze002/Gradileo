import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The total at the checkout: the price (100%) and the tax added on (5%).
const total = figure('br', [
  bars({
    rows: [
      {
        id: 'r',
        pieces: [
          { w: 10, tex: '\\text{price } 100\\%', tone: 'adj' },
          { w: 1.6, tex: '5\\%', tone: 'opp' },
        ],
      },
    ],
    total: '\\text{total } 105\\%',
  }),
], 220);

const video: Explainer = {
  id: 'm7-2-5-b',
  lessonId: 'm7-2-5',
  title: 'Solving Percent Problems, Part 2: Sales Tax and Tips',
  thumbnailTitle: 'Sales Tax and Tips',
  thumbnail: 'br',
  summary:
    'A sales tax is a percent of the price added at the checkout; each question gives the rate to use. A $36.80 basketball with a 5% sales tax has tax 0.05 × 36.80 = $1.84, for a total of $38.64. A tip works the same way: a 15% tip on a $46.80 bill is 10% ($4.68) plus 5% ($2.34), which is $7.02, for a total of $53.82. Tax and tips are added; discounts are subtracted.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 2', title: 'Sales Tax and Tips', subtitle: 'Percents that are added on' }],
      lines: [
        { say: 'In many places, the price on a shelf is not what you pay at the checkout. A sales tax is added on. And at a restaurant, people often add a tip.', show: 'title' },
        { say: 'In this part, you will find sales tax and tips, and the total you pay.' },
      ],
    },
    {
      chapter: 'Sales tax',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sales tax', md: 'A **sales tax** is a percent of the price that is **added** at the checkout. Each question tells you the tax rate to use.' },
        total,
      ],
      lines: [
        { say: 'A sales tax is a percent of the price that is added at the checkout. The money goes to the government, to pay for things like roads and schools.', show: 'def' },
        { say: 'Different places use different tax rates, so each question tells you the rate to use.' },
        { say: 'Here is a picture for a five percent tax. The price is one hundred percent. The tax adds five percent more, so the total is one hundred five percent of the price.', show: ['br.r-p0', 'br.r-p1', 'br.total'], focus: 'br.r-p1' },
      ],
    },
    {
      chapter: 'A basketball',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A basketball costs \\$36.80. There is a $5\\%$ sales tax. What is the total cost?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 10\\% \\text{ of } 37 \\approx 3.70, \\text{ so } 5\\% \\approx 1.85', '\\text{Tax: } 0.05 \\times 36.80 = 1.84', '\\text{Total: } 36.80 + 1.84 = 38.64'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The total cost is **\\$38.64**.' },
      ],
      lines: [
        { say: 'A basketball costs thirty-six dollars and eighty cents. There is a five percent sales tax. What is the total cost?', show: 'q' },
        { say: 'Estimate first. Ten percent of about thirty-seven dollars is three dollars and seventy cents. Five percent is half of that, about one dollar and eighty-five cents.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the tax exactly. Five percent is zero point zero five. Zero point zero five times thirty-six point eight zero is one point eight four. The tax is one dollar and eighty-four cents.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the tax to the price. Thirty-six dollars and eighty cents, plus one dollar and eighty-four cents, makes thirty-eight dollars and sixty-four cents.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A tip with mental math',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The bill at a restaurant is \\$46.80. Hamid’s family leaves a $15\\%$ tip. How much is the tip, and what is the total?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10\\% \\text{ of } 46.80 = 4.68', '5\\% = \\text{half of } 4.68 = 2.34', '\\text{Tip: } 4.68 + 2.34 = 7.02', '\\text{Total: } 46.80 + 7.02 = 53.82'] },
      ],
      lines: [
        { say: 'A tip works the same way. It is a percent of the bill that you add on, to thank the people who served you.', show: 'q' },
        { say: 'The bill at a restaurant is forty-six dollars and eighty cents. Hamid’s family leaves a fifteen percent tip. Fifteen percent is ten percent plus five percent, so we can do it in our heads.' },
        { say: 'Ten percent: divide by ten. Forty-six dollars and eighty cents divided by ten is four dollars and sixty-eight cents.', show: 'm.0', focus: 'm.0' },
        { say: 'Five percent is half of that: two dollars and thirty-four cents.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them, and the tip is seven dollars and two cents. Add it to the bill: the total is fifty-three dollars and eighty-two cents.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting the tax', md: 'Tax and tips are **added** to the price. Discounts are **subtracted**. Ask yourself: should the total be more or less than the price?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['36.80 + 1.84 = 38.64 \\ \\good{\\checkmark} \\qquad 36.80 - 1.84 = 34.96 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. After a lesson on discounts, it is easy to subtract the tax out of habit.', show: 'oops' },
        { say: 'But tax and tips are added to the price. Only discounts are subtracted. Subtracting the tax from the basketball would give thirty-four dollars and ninety-six cents, which is less than the price. That cannot be right.', show: 'm', focus: 'm' },
        { say: 'Before you finish, ask yourself: should the total be more than the price, or less?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A meal costs \\$24.00. The family leaves a $15\\%$ tip. What is the total?',
          choices: ['\\$3.60', '\\$20.40', '\\$27.60', '\\$39.00'],
          answer: 2,
          working: '$10\\%$ of $24$ is $2.40$ and $5\\%$ is $1.20$, so the tip is $3.60$. Total: $24.00 + 3.60 = 27.60$, so \\$27.60.',
        },
      ],
      lines: [
        { say: 'Your turn. A meal costs twenty-four dollars. The family leaves a fifteen percent tip. What is the total? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-seven dollars and sixty cents. Ten percent is two dollars and forty cents, and five percent is one dollar and twenty cents, so the tip is three dollars and sixty cents. Add it to the bill. Choice B subtracts the tip, but a tip is added.', show: 'q.answer' },
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
          items: ['**Sales tax**: find the percent of the price, then **add** it. Use the rate the question gives.', 'A **tip** is a percent of the bill that is added on: $15\\% = 10\\% + 5\\%$.', 'Tax and tips are added; discounts are subtracted.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a sales tax, find the percent of the price, then add it. Always use the rate the question gives.', show: 'sum.0' },
        { say: 'A tip is a percent of the bill that is added on. Fifteen percent is ten percent plus five percent.', show: 'sum.1' },
        { say: 'Tax and tips are added, and discounts are subtracted. In the next part, you will turn test marks into percents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
