import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';
import { tag } from './lib/m7-2-figures.ts';

// The jacket: the price, the sale price after 30% off, and the total with 5% tax on the sale price.
const steps = figure('br', [
  bars({
    rows: [
      { id: 'a', label: '\\text{price}', pieces: [{ w: 9, tex: '\\$89.99', tone: 'adj' }] },
      { id: 'b', label: '\\text{sale price}', pieces: [{ w: 6.3, tex: '\\$62.99', tone: 'good' }, { w: 2.7, tex: '-\\$27.00', tone: 'bad' }] },
      { id: 'c', label: '\\text{total}', pieces: [{ w: 6.3, tex: '\\$62.99', tone: 'good' }, { w: 0.9, tex: '+', tone: 'opp' }] },
    ],
  }),
  // Room on the left for the row names.
  tag('pad', [-3.0, 0.5], '\\phantom{x}'),
], 380);

const video: Explainer = {
  id: 'm7-2-5-d',
  lessonId: 'm7-2-5',
  title: 'Solving Percent Problems, Part 4: Two Percents in One Problem',
  thumbnailTitle: 'Two Percents in One Problem',
  thumbnail: 'br',
  summary:
    'Some problems need two steps; round money to the nearest cent after each step, as a store does. A $89.99 jacket at 30% off has a discount of 26.997 ≈ $27.00, so the sale price is $62.99; a 5% sales tax on the sale price is 3.1495 ≈ $3.15, so the total is $66.14 (estimate: a bit more than $63). The tax is on the sale price, so 30% off then 5% tax is not the same as 25% off.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 4', title: 'Two Percents in One Problem', subtitle: 'Discount, then tax' }],
      lines: [
        { say: 'A jacket is on sale, and then sales tax is added at the checkout. That is two percents in one problem!', show: 'title' },
        { say: 'In this part, you will solve a problem with a discount and a tax, one step at a time, and see why the order matters.' },
      ],
    },
    {
      chapter: 'Round after each step',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A winter jacket costs \\$89.99. It is $30\\%$ off, and then a $5\\%$ sales tax is added to the sale price. What is the total, to the nearest cent?' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Round after each step', md: 'Round money to the nearest cent after **each** step, just like a store does.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 30\\% \\text{ off } \\$90 \\text{ is } \\$63, \\text{ plus a little tax}'] },
      ],
      lines: [
        { say: 'A winter jacket costs eighty-nine dollars and ninety-nine cents. It is thirty percent off. Then a five percent sales tax is added to the sale price. What is the total, to the nearest cent?', show: 'q' },
        { say: 'This problem has two steps: first the discount, then the tax. Round money to the nearest cent after each step, just as a store does.', show: 'key' },
        { say: 'Estimate first. The price is about ninety dollars. Ten percent of ninety is nine, so thirty percent is twenty-seven. Ninety minus twenty-seven is sixty-three. Then a little tax is added, so expect a bit more than sixty-three dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 1: the sale price',
      layout: 'center',
      main: [steps, { kind: 'math', id: 'm', size: 'md', lines: ['0.30 \\times 89.99 = 26.997', '26.997 \\approx 27.00', '89.99 - 27.00 = 62.99'] }],
      lines: [
        { say: 'Step one, the discount. Thirty percent is zero point three zero. Zero point three zero times eighty-nine point nine nine is twenty-six point nine nine seven.', show: ['br.a-p0', 'br.a-label', 'm.0'], focus: 'm.0' },
        { say: 'Round to the nearest cent. The third decimal digit is seven, so round up: twenty-seven dollars exactly.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract the discount: eighty-nine dollars and ninety-nine cents, minus twenty-seven dollars, leaves sixty-two dollars and ninety-nine cents. That is the sale price.', show: ['br.b-p0', 'br.b-p1', 'br.b-label', 'm.2'], focus: ['m.2', 'br.b-p0'] },
      ],
    },
    {
      chapter: 'Step 2: add the tax',
      layout: 'center',
      main: [steps, { kind: 'math', id: 'm', size: 'md', lines: ['0.05 \\times 62.99 = 3.1495', '3.1495 \\approx 3.15', '62.99 + 3.15 = 66.14'] }],
      lines: [
        { say: 'Step two, the tax. It is five percent of the sale price, not the original price.', show: ['br.a-p0', 'br.a-label', 'br.b-p0', 'br.b-p1', 'br.b-label'] },
        { say: 'Zero point zero five times sixty-two point nine nine is three point one four nine five.', show: 'm.0', focus: 'm.0' },
        { say: 'Round to the nearest cent. The third decimal digit is nine, so round up: three dollars and fifteen cents.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the tax to the sale price. Sixty-two dollars and ninety-nine cents, plus three dollars and fifteen cents, makes sixty-six dollars and fourteen cents. That is the total, a bit more than sixty-three, as we expected.', show: ['br.c-p0', 'br.c-p1', 'br.c-label', 'm.2'], focus: ['m.2', 'br.c-p1'] },
      ],
    },
    {
      chapter: 'Why the order matters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Tax on the sale price: } 62.99 + 3.15 = 66.14 \\ \\good{\\checkmark}', '\\text{Tax on the full price: } 62.99 + 4.50 = 67.49 \\ \\bad{\\times}', '\\text{Just } 25\\% \\text{ off: } 0.75 \\times 89.99 \\approx 67.49 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Why does the order matter? The tax is added at the checkout, after the discount, so it is a percent of the sale price.', show: 'm.0', focus: 'm.0' },
        { say: 'If you found the tax on the full price by mistake, it would be four dollars and fifty cents, and the total would be sixty-seven dollars and forty-nine cents.', show: 'm.1', focus: 'm.1' },
        { say: 'And you cannot take a shortcut by saying thirty percent off and five percent on is just twenty-five percent off. That gives sixty-seven dollars and forty-nine cents as well, which is too much. Work through the steps in order.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Shoes cost \\$50. They are $10\\%$ off, and then a $5\\%$ sales tax is added to the sale price. What is the total?',
          choices: ['\\$47.25', '\\$47.50', '\\$45.00', '\\$52.25'],
          answer: 0,
          working: 'Discount: $10\\%$ of $50$ is $5$, so the sale price is $50 - 5 = 45$. Tax: $5\\%$ of $45$ is $0.05 \\times 45 = 2.25$. Total: $45 + 2.25 = 47.25$, so \\$47.25.',
        },
      ],
      lines: [
        { say: 'Your turn. Shoes cost fifty dollars. They are ten percent off, and then a five percent sales tax is added to the sale price. What is the total? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, forty-seven dollars and twenty-five cents. Ten percent off fifty dollars leaves forty-five dollars. Five percent of forty-five is two dollars and twenty-five cents, so the total is forty-seven dollars and twenty-five cents. Choice B finds the tax on the full price instead of the sale price.', show: 'q.answer' },
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
          items: ['Discount: find the percent of the price, then **subtract**.', 'Sales tax and tips: find the percent, then **add**. Tax is on the sale price.', 'Round money to the nearest cent after each step, and estimate first with $10\\%$, $25\\%$ or $50\\%$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up the whole lesson. For a discount, find the percent of the price, then subtract it.', show: 'sum.0' },
        { say: 'For sales tax and tips, find the percent, then add it. A tax after a discount is on the sale price.', show: 'sum.1' },
        { say: 'Round money to the nearest cent after each step, and estimate first with friendly percents like ten, twenty-five or fifty. Well done! You have finished this unit on decimals and percents.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
