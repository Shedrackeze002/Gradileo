import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-3-2-d',
  lessonId: 'm8-3-2',
  title: 'Rates and Unit Rates, Part 4: The Better Buy',
  thumbnailTitle: 'The Better Buy',
  thumbnail: false,
  summary:
    'To compare two sizes of the same thing, find the unit price of each in the same unit; the lower unit price is the better buy. A 750 g box of cereal for $4.99 is 0.75 kg, so it costs 4.99 ÷ 0.75 ≈ $6.65 per kilogram, while a 1.2 kg box for $7.49 costs 7.49 ÷ 1.2 ≈ $6.24 per kilogram, so the large box is the better buy. Never compare a price per gram with a price per kilogram, and remember that a bigger size is not always cheaper per unit, or worth it if food spoils.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 4', title: 'The Better Buy', subtitle: 'More for your money' }],
      lines: [
        { say: 'A store sells the same cereal in a small box and a large box. Which one gives you more cereal for your money?', show: 'title' },
        { say: 'In this part, you will compare unit prices to find the better buy.' },
      ],
    },
    {
      chapter: 'Compare unit prices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The better buy', md: 'To compare two sizes of the same thing, find the **unit price** of each, in the **same unit**. The lower unit price is the **better buy**.' },
      ],
      lines: [
        { say: 'Remember, a unit price is the cost of one unit, such as one kilogram.', show: 'key' },
        { say: 'To compare two sizes of the same thing, find the unit price of each, in the same unit. The size with the lower unit price is the better buy, because each kilogram costs less.' },
      ],
    },
    {
      chapter: 'Which box of cereal?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Box of cereal', 'Size', 'Price'],
          rows: [
            ['Small', '$750$ g', '\\$4.99'],
            ['Large', '$1.2$ kg', '\\$7.49'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ kg} = 1{,}000 \\text{ g}', '750 \\text{ g} = 0.75 \\text{ kg}'] },
      ],
      lines: [
        { say: 'Here are the two boxes. The small box holds seven hundred fifty grams of cereal, and costs four dollars and ninety-nine cents.', show: 't.0' },
        { say: 'The large box holds one point two kilograms, and costs seven dollars and forty-nine cents. Find each unit price per kilogram, to the nearest cent. Which box is the better buy?', show: 't.1' },
        { say: 'First, use the same unit for both sizes. A kilogram is one thousand grams.', show: 'm.0', focus: 'm.0' },
        { say: 'So seven hundred fifty grams is zero point seven five kilograms. Now both sizes are in kilograms.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The unit prices',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Small box: $4.99 \\div 0.75 \\approx 6.653$, about **\\$6.65 per kilogram**' },
        { kind: 'text', id: 'b', size: 'md', align: 'center', md: 'Large box: $7.49 \\div 1.2 \\approx 6.242$, about **\\$6.24 per kilogram**' },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The better buy', md: 'The **large box** has the lower unit price, so it is the better buy.' },
      ],
      lines: [
        { say: 'Small box: four point nine nine divided by zero point seven five is about six point six five three. The third decimal place is three, so keep the cents. That is about six dollars and sixty-five cents per kilogram.', show: 'a', focus: 'a' },
        { say: 'Large box: seven point four nine divided by one point two is about six point two four two. That is about six dollars and twenty-four cents per kilogram.', show: 'b', focus: 'b' },
        { say: 'The large box has the lower unit price, so it is the better buy. Each kilogram costs about forty-one cents less.', show: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing different units', md: 'Do not compare a price per **gram** with a price per **kilogram**. Change both sizes to the same unit before you divide.' },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Small box: $4.99 \\div 750 \\approx 0.0067$ dollars **per gram**' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Suppose you divide the small box’s price by seven hundred fifty, the number of grams.', show: 'oops' },
        { say: 'You get about zero point zero zero six seven dollars. That is less than one cent, so the small box looks much cheaper than six dollars and twenty-four cents!', show: 'a', focus: 'a' },
        { say: 'But it is a price per gram, and the other is a price per kilogram. You cannot compare them. Change both sizes to the same unit before you divide.' },
      ],
    },
    {
      chapter: 'Is it really a better buy?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$1$ kg of apples for \\$3.79: **\\$3.79 per kilogram**' },
        { kind: 'text', id: 'b', size: 'md', align: 'center', md: '$2$ kg of apples for \\$7.98: $7.98 \\div 2 = 3.99$, **\\$3.99 per kilogram**' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Is it really a better buy?', md: 'The bigger size is not always cheaper per unit, so always check. And a bigger size is only a better buy if you will use it all. Food that spoils is not a bargain.' },
      ],
      lines: [
        { say: 'Is the bigger size always the better buy? No! Here, one kilogram of apples costs three dollars and seventy-nine cents.', show: 'a' },
        { say: 'A two-kilogram bag costs seven dollars and ninety-eight cents. Seven point nine eight divided by two is three point nine nine, so the big bag costs more per kilogram.', show: 'b', focus: 'b' },
        { say: 'So always check the unit prices. And a bigger size is only a better buy if you will use it all. Food that spoils before you eat it is not a bargain.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Juice comes in a $2$ L bottle for \\$3.90 or a $500$ mL bottle for \\$1.10. Which is the better buy?',
          choices: ['The $2$ L bottle, at \\$1.95 per litre', 'The $500$ mL bottle, at \\$2.20 per litre', 'The $500$ mL bottle, because \\$1.10 is less than \\$3.90', 'They cost the same per litre'],
          answer: 0,
          working: '$500$ mL $= 0.5$ L. Large: $3.90 \\div 2 = 1.95$, so \\$1.95 per litre. Small: $1.10 \\div 0.5 = 2.20$, so \\$2.20 per litre. The $2$ L bottle has the lower unit price.',
        },
      ],
      lines: [
        { say: 'Your turn. Juice comes in a two-litre bottle for three dollars and ninety cents, or a five-hundred-millilitre bottle for one dollar and ten cents. Which is the better buy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five hundred millilitres is zero point five litres. The big bottle costs one dollar and ninety-five cents per litre, and the small one costs two dollars and twenty cents per litre. Choice C compares the prices, not the unit prices. The small bottle costs less, but it holds much less juice.', show: 'q.answer' },
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
            'Find the unit price of each size, in the **same unit**.',
            'The **lower** unit price is the better buy: \\$6.24 per kilogram beats \\$6.65 per kilogram.',
            'Never compare a price per gram with a price per kilogram.',
            'Bigger is not always cheaper per unit, and it is only a bargain if you use it all.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the better buy, find the unit price of each size, in the same unit.', show: 'sum.0' },
        { say: 'The lower unit price is the better buy.', show: 'sum.1' },
        { say: 'Never compare a price per gram with a price per kilogram.', show: 'sum.2' },
        { say: 'And bigger is not always cheaper per unit, so always check. Next, you will use ratios and rates to solve problems with proportions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
