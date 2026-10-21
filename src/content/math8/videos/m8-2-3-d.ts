import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// $50 in five pieces of $10 (20% each): one comes off, leaving $40. Then $40 in ten pieces of $4
// (10% each): one comes off, leaving $36. The second 10% is only $4, not $5.
const ten = { w: 2.4, tex: '\\text{\\$10}' };
const four = { w: 0.96, tex: '4' };
const game = figure('b', [
  pieceBar({
    name: 'one',
    at: [0, 3.4],
    pieces: [ten, ten, ten, ten, { ...ten, removed: true }],
    label: '\\text{\\$50}',
    brackets: [{ id: 'off', from: 4, to: 4, tex: '20\\% \\text{ off}', tone: 'bad' }],
  }),
  pieceBar({
    name: 'two',
    at: [0, 0],
    pieces: [...Array.from({ length: 9 }, () => four), { ...four, removed: true }],
    label: '\\text{\\$40}',
    brackets: [{ id: 'off', from: 9, to: 9, tex: '10\\% \\text{ off}', tone: 'bad' }],
  }),
], 370);

const video: Explainer = {
  id: 'm8-2-3-d',
  lessonId: 'm8-2-3',
  title: 'Percent Change and Combined Percents, Part 4: Two Discounts in a Row',
  thumbnailTitle: 'Two Discounts in a Row',
  thumbnail: 'b',
  summary:
    'A game costs $50. The store takes 20% off, then another 10% off the sale price. After 20% off, the price is 50 − 10 = $40; after another 10% off, it is 40 − 4 = $36. The total discount is $14, and 14/50 = 0.28, so the two discounts make 28% off, not 30%: the second 10% is taken from $40, not $50, so it saves only $4 instead of $5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 4', title: 'Two Discounts in a Row', subtitle: 'Why the percents do not add' }],
      lines: [
        { say: 'A store takes twenty percent off, then another ten percent off the sale price. Is that the same as thirty percent off? Let’s find out.', show: 'title' },
        { say: 'In this part, you will see why two discounts in a row do not simply add up.' },
      ],
    },
    {
      chapter: 'A game on sale',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A game costs \\$50. The store takes $20\\%$ off, then another $10\\%$ off the sale price. What is the final price? What single discount is that?' },
        game,
      ],
      lines: [
        { say: 'A game costs fifty dollars. The store takes twenty percent off, then another ten percent off the sale price. What is the final price? And what single discount is that?', show: 'q' },
        { say: 'First discount: twenty percent is one fifth. Cut fifty dollars into five pieces of ten dollars, each twenty percent.', show: ['b.one-p0', 'b.one-p1', 'b.one-p2', 'b.one-p3', 'b.one-p4', 'b.one-label'] },
        { say: 'Take one piece away. The price is now fifty minus ten, which is forty dollars.', show: 'b.one-off', focus: ['b.one-p4', 'b.one-off'] },
        { say: 'Second discount: ten percent of the new price, forty dollars. Cut forty dollars into ten pieces of four dollars.', show: ['b.two-p0', 'b.two-p1', 'b.two-p2', 'b.two-p3', 'b.two-p4', 'b.two-p5', 'b.two-p6', 'b.two-p7', 'b.two-p8', 'b.two-p9', 'b.two-label'] },
        { say: 'Take one piece away. Ten percent of forty is four, so the final price is forty minus four, which is thirty-six dollars.', show: 'b.two-off', focus: ['b.two-p9', 'b.two-off'] },
      ],
    },
    {
      chapter: 'The working',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{After } 20\\% \\text{ off: } 50 - 0.20 \\times 50 = 50 - 10 = 40', '\\text{After another } 10\\% \\text{ off: } 40 - 0.10 \\times 40 = 40 - 4 = 36'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The final price is **\\$36.00**.' },
      ],
      lines: [
        { say: 'Here is the working. Twenty percent of fifty is zero point two times fifty, which is ten. Fifty minus ten is forty.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten percent of forty is zero point one times forty, which is four. Forty minus four is thirty-six.', show: 'm.1', focus: 'm.1' },
        { say: 'The final price is thirty-six dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'The single discount',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{total discount: } 50 - 36 = 14', '\\dfrac{14}{50} = 0.28 = 28\\%'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$20\\%$ off, then $10\\%$ off, is $28\\%$ off, **not** $30\\%$ off.' },
      ],
      lines: [
        { say: 'Altogether, the price dropped from fifty dollars to thirty-six dollars. That is fourteen dollars off.', show: 'm.0', focus: 'm.0' },
        { say: 'As a percent of the original price, fourteen over fifty is zero point two eight, which is twenty-eight percent.', show: 'm.1', focus: 'm.1' },
        { say: 'So twenty percent off, then ten percent off, is the same as twenty-eight percent off. It is not thirty percent off.', show: 'a' },
      ],
    },
    {
      chapter: 'Adding the percents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the percents', md: '$20\\%$ off and then $10\\%$ off is **not** $30\\%$ off. The $10\\%$ is taken from \\$40, not from \\$50, so it saves only \\$4 instead of \\$5.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10\\% \\text{ of } 40 = 4, \\quad \\text{but} \\quad 10\\% \\text{ of } 50 = 5'] },
      ],
      lines: [
        { say: 'Why is it not thirty percent? The second ten percent is taken from forty dollars, not from fifty dollars.', show: 'oops' },
        { say: 'Ten percent of forty dollars is four dollars. Ten percent of fifty dollars would be five dollars. So the second discount saves one dollar less.', show: 'm', focus: 'm' },
        { say: 'The second percent is taken from a smaller amount, so two discounts in a row always save less than the two percents added together.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bike costs \\$200. It is marked $25\\%$ off, then another $20\\%$ off the sale price. What is the final price?',
          choices: ['\\$110.00', '\\$90.00', '\\$120.00', '\\$130.00'],
          answer: 2,
          working: 'After $25\\%$ off: $200 - 0.25 \\times 200 = 200 - 50 = 150$. After another $20\\%$ off: $150 - 0.20 \\times 150 = 150 - 30 = 120$. The final price is \\$120.00.',
        },
      ],
      lines: [
        { say: 'Your turn. A bike costs two hundred dollars. It is marked twenty-five percent off, then another twenty percent off the sale price. What is the final price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one hundred twenty dollars. Twenty-five percent of two hundred dollars is fifty dollars, so the sale price is one hundred fifty dollars. Twenty percent of that is thirty dollars, which leaves one hundred twenty dollars. Choice A adds the percents and takes forty-five percent off, but the second discount comes off the smaller price.', show: 'q.answer' },
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
          items: [
            'Take the first discount off, then take the second discount off the **new** price.',
            '\\$50, $20\\%$ off, is \\$40; then $10\\%$ off is \\$36.',
            'Two discounts in a row give less than the sum of the percents: $28\\%$, not $30\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With two discounts in a row, take the first discount off, then take the second discount off the new price.', show: 'sum.0' },
        { say: 'Fifty dollars, twenty percent off, is forty dollars, and ten percent off that is thirty-six dollars.', show: 'sum.1' },
        { say: 'So two discounts in a row save less than the two percents added together. In the next part, you will find a percent of a percent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
