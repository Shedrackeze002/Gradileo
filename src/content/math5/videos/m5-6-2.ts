import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, hundredGrid } from './lib/m5-6-figures.ts';

// A hundred grid with 35 squares shaded: three rows of ten and five more.
const grid35 = (id: string) => figure(id, [hundredGrid({ shaded: 35 })]);

// Three grids side by side: half shaded, all shaded, and 8 shaded.
const three = (id: string) =>
  figure(
    id,
    [
      hundredGrid({ name: 'g1', shaded: 50, at: [0, 0] }),
      hundredGrid({ name: 'g2', shaded: 100, at: [13, 0] }),
      hundredGrid({ name: 'g3', shaded: 8, at: [26, 0] }),
      caption({ name: 'g1', id: 'cap', at: [5, -11], tex: '50\\%' }),
      caption({ name: 'g2', id: 'cap', at: [18, -11], tex: '100\\%' }),
      caption({ name: 'g3', id: 'cap', at: [31, -11], tex: '8\\%' }),
    ],
    360,
  );

const video: Explainer = {
  id: 'm5-6-2',
  lessonId: 'm5-6-2',
  title: 'Ratios, Fractions, Decimals and Percentages, Part 1: Percent Means Out of 100',
  thumbnailTitle: 'Percent Means Out of 100',
  thumbnail: 'g',
  summary: 'A percentage compares a part with a whole of 100, and % means “out of 100”. A hundred grid with 35 squares shaded shows the same part four ways: the ratio 35 : 100, the fraction 35/100, the decimal 0.35 and 35%; half a grid is 50%, and the whole grid is 100%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 1', title: 'Percent Means Out of 100', subtitle: 'One part of a whole, written four ways' }],
      lines: [
        { say: 'Have you seen a sign in a shop that says fifty percent off? Percentages are everywhere: in shops, in sports scores, and on the battery of a phone.', show: 'title' },
        { say: 'In this video, you will learn what a percentage is, and write one part of a whole in four different ways.' },
      ],
    },
    {
      chapter: 'What is a percentage?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percentage', md: 'A **percentage** compares a part with a whole of $100$. The symbol $\\%$ means “out of $100$”.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['35\\% = 35 \\text{ out of } 100'] },
      ],
      lines: [
        { say: 'A percentage is a ratio that compares a part with a whole of one hundred.', show: 'def' },
        { say: 'This symbol is the percent sign. It means out of one hundred. You can even see the one and the two zeros of one hundred hiding in it.', focus: 'def' },
        { say: 'So thirty-five percent means thirty-five out of one hundred.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A hundred grid',
      layout: 'split',
      leftWidth: 480,
      left: [grid35('g')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The grid has $100$ equal squares. $35$ of them are shaded.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10 + 10 + 10 + 5 = 35', '35 \\text{ out of } 100 = 35\\%'] },
      ],
      lines: [
        { say: 'This grid has ten rows of ten squares. That is one hundred equal squares. The whole grid is the whole.', show: ['g.grid', 'g.outline', 't'] },
        { say: 'Some squares are shaded: three full rows of ten, and five more. Ten plus ten plus ten plus five is thirty-five.', show: ['g.shade', 'm.0'], focus: ['g.shade', 'm.0'] },
        { say: 'So thirty-five out of one hundred squares are shaded. Thirty-five percent of the grid is shaded.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One grid, four ways',
      layout: 'split',
      leftWidth: 480,
      left: [grid35('g2')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Way', 'The shaded part'],
          rows: [
            ['Ratio', '$35 : 100$'],
            ['Fraction', '$\\dfrac{35}{100}$'],
            ['Decimal', '$0.35$'],
            ['Percentage', '$35\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'We can write the shaded part of the grid in four ways.', show: 'g2' },
        { say: 'As a ratio of shaded squares to all the squares, it is thirty-five to one hundred.', show: 't.0', focus: 't.0' },
        { say: 'As a fraction, it is thirty-five over one hundred: thirty-five parts out of one hundred.', show: 't.1', focus: 't.1' },
        { say: 'As a decimal number, it is 0.35. The three is in the tenths place, and the five is in the hundredths place.', show: 't.2', focus: 't.2' },
        { say: 'And as a percentage, it is thirty-five percent. All four show the same part of the grid.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Half, all and a few',
      layout: 'center',
      main: [three('h')],
      lines: [
        { say: 'Here are three more grids. In the first grid, half the squares are shaded. That is fifty out of one hundred: fifty percent.', show: ['h.g1-grid', 'h.g1-outline', 'h.g1-shade', 'h.g1-cap'] },
        { say: 'In the second grid, every square is shaded. That is one hundred out of one hundred: one hundred percent. One hundred percent is the whole thing.', show: ['h.g2-grid', 'h.g2-outline', 'h.g2-shade', 'h.g2-cap'] },
        { say: 'In the third grid, only eight squares are shaded. That is eight out of one hundred: eight percent. A small percentage is a small part of the whole.', show: ['h.g3-grid', 'h.g3-outline', 'h.g3-shade', 'h.g3-cap'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A grid has $100$ squares, and $48$ are shaded. Which row shows the shaded part as a ratio, a fraction, a decimal and a percentage?',
          choices: ['$100 : 48,\\ \\dfrac{100}{48},\\ 0.48,\\ 48\\%$', '$48 : 100,\\ \\dfrac{48}{100},\\ 4.8,\\ 48\\%$', '$48 : 100,\\ \\dfrac{48}{100},\\ 0.48,\\ 48\\%$', '$48 : 52,\\ \\dfrac{48}{100},\\ 0.48,\\ 48\\%$'],
          answer: 2,
          working: '$48$ out of $100$: the ratio $48 : 100$, the fraction $\\dfrac{48}{100}$, $48$ hundredths is $0.48$, and $48\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A grid has one hundred squares, and forty-eight are shaded. Which row shows the shaded part as a ratio, a fraction, a decimal and a percentage? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Forty-eight out of one hundred is forty-eight to one hundred, forty-eight over one hundred, 0.48 and forty-eight percent. Choice B writes the decimal as 4.8, but forty-eight out of one hundred is 0.48.', show: 'q.answer' },
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
          items: ['A percentage compares a part with a whole of $100$. $\\%$ means “out of $100$”.', 'One part of a whole can be a ratio, a fraction, a decimal and a percentage: $35 : 100 = \\dfrac{35}{100} = 0.35 = 35\\%$.', 'The whole is $100\\%$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A percentage compares a part with a whole of one hundred. The percent sign means out of one hundred.', show: 'sum.0' },
        { say: 'One part of a whole can be written as a ratio, a fraction, a decimal and a percentage.', show: 'sum.1' },
        { say: 'And the whole is one hundred percent. In the next part, you will find a percentage when the whole is not one hundred. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
