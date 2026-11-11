import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-26-4',
  lessonId: 'mx-26-4',
  title: 'Shares and Stocks',
  thumbnail: 'm',
  summary: 'A dividend is a percent of the nominal value of shares, not of the money invested: 6,000 dollars buys 800 shares at 7.50 dollars, with nominal value 4,000 dollars, so a 12% dividend is 480 dollars. Brokerage is added when buying and taken off when selling. Yield is the yearly income as a percent of the price paid. A 5% stock at 125 pays 5 dollars a year on 100 dollars of stock that costs 125 dollars, a yield of 4%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Interest Rates, Annuities, Loans and Shares', title: 'Shares and Stocks', subtitle: 'Dividends, profit and yield' }],
      lines: [
        { say: 'A company that needs money to grow can sell small parts of itself to the public. The people who buy those parts receive a piece of its profit.', show: 'title' },
        { say: 'In this video, you will learn to work out dividends, profits and yields on shares and stocks.' },
      ],
    },
    {
      chapter: 'Shares and dividends',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Share and dividend', md: 'A **share** has a fixed **nominal value** and a **market price**. A **dividend** is part of the profit, stated as a percent of the **nominal value**.' },
        { kind: 'text', id: 'q', md: '\\$6,000 is invested in shares with nominal value \\$5 and market price \\$7.50. The dividend is $12\\%$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['6000 \\div 7.5 = 800 \\text{ shares}', '800 \\times 5 = 4000', '12\\% \\times 4000 = 480'] },
      ],
      lines: [
        { say: 'A share is one of the equal parts of a company. It has a nominal value, fixed when it is issued, and a market price, which is what it sells for today. A dividend is stated as a percent of the nominal value.', show: 'def' },
        { say: 'Six thousand dollars is invested in shares with a nominal value of five dollars and a market price of seven dollars and fifty cents. The dividend is twelve percent.', show: 'q' },
        { say: 'The money buys shares at the market price: six thousand divided by seven point five is eight hundred shares.', show: 'm.0', focus: 'm.0' },
        { say: 'Their nominal value is eight hundred times five, which is four thousand dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So the dividend is twelve percent of four thousand, which is four hundred and eighty dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'Twelve percent of the money invested would be seven hundred and twenty dollars, which is wrong. The percent applies to the nominal value.' },
      ],
    },
    {
      chapter: 'Brokerage and profit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$500$ shares are bought at \\$4 and sold at \\$5, with $1\\%$ brokerage on each deal.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cost} = 500 \\times 4 \\times 1.01 = 2020', '\\text{received} = 500 \\times 5 \\times 0.99 = 2475', '\\text{profit} = 2475 - 2020 = 455'] },
      ],
      lines: [
        { say: 'A broker charges a fee, called brokerage, on each deal. It is added to the cost when buying, and taken off the money received when selling.', show: 'q' },
        { say: 'Buying five hundred shares at four dollars costs two thousand dollars, plus one percent, which is two thousand and twenty dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Selling them at five dollars brings in two thousand five hundred dollars, minus one percent, which is two thousand four hundred and seventy-five dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So the profit is four hundred and fifty-five dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Yield',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Yield', md: 'The yearly income as a percent of the price paid.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12\\% \\times 5 = 0.60', '\\dfrac{0.60}{13.50} \\times 100\\% \\approx 4.44\\%'] },
      ],
      lines: [
        { say: 'The yield of a share is its yearly dividend as a percent of its market price. It shows the return an investor really gets.', show: 'def' },
        { say: 'A share with a nominal value of five dollars pays a dividend of twelve percent, which is sixty cents.', show: 'm.0', focus: 'm.0' },
        { say: 'If the share costs thirteen dollars and fifty cents, the yield is sixty cents out of thirteen fifty, only about four point four four percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Stocks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stock', md: 'Money lent for a fixed rate of interest, traded in units of \\$100. "$5\\%$ at 125" pays \\$5 a year on \\$100 of stock that costs \\$125.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5000 \\div 125 = 40 \\text{ units}, \\quad 40 \\times 5 = 200', '\\dfrac{5}{125} = 4\\%, \\quad \\dfrac{4}{90} \\approx 4.44\\%'] },
      ],
      lines: [
        { say: 'Stock is money lent to a government or a company for a fixed rate of interest, traded in units of a hundred dollars. Five percent stock at a hundred and twenty-five pays five dollars a year on each hundred dollars of stock, which costs a hundred and twenty-five dollars.', show: 'def' },
        { say: 'Five thousand dollars buys forty units, so the yearly income is forty times five, two hundred dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The yield of this stock is five over a hundred and twenty-five, four percent. A four percent stock at ninety yields about four point four four percent, so the stock with the lower rate gives the better return.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shareholder owns $800$ shares with a nominal value of \\$2. The dividend is $9\\%$. Find the dividend.',
          choices: ['\\$144', '\\$72', '\\$1,600', '\\$18'],
          answer: 0,
          working: 'Nominal value: $800 \\times 2 = 1600$. Dividend: $9\\% \\times 1600 = 144$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shareholder owns eight hundred shares with a nominal value of two dollars each, and the dividend is nine percent. Find the dividend. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The nominal value of the holding is one thousand six hundred dollars, and nine percent of that is a hundred and forty-four dollars. Choice C is the nominal value itself.', show: 'q.answer' },
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
          items: ['A dividend is a percent of the nominal value.', 'Number of shares $=$ money invested $\\div$ market price.', 'Brokerage: added when buying, taken off when selling.', 'Yield $= \\dfrac{\\text{yearly income}}{\\text{price paid}} \\times 100\\%$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dividend is a percent of the nominal value of the shares, not of the money invested.', show: 'sum.0' },
        { say: 'The number of shares is the money invested divided by the market price.', show: 'sum.1' },
        { say: 'Brokerage is added to the cost of buying and taken off the money from selling.', show: 'sum.2' },
        { say: 'And the yield is the yearly income as a percent of the price paid, for a share or for stock. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
