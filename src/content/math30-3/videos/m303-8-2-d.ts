import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

/** Three years of buying (38,862.32 paid, 20,148.97 still owned) against leasing (19,370). */
const compare = (id: string) =>
  figure(
    id,
    [
      stackBar({
        name: 'buy',
        at: [0, 2.2],
        width: 11,
        scale: 38862.32,
        title: '\\text{buy}',
        stretches: [
          { id: 'net', value: 18713.35, tone: 'opp', label: '\\text{net } \\$18{,}713.35' },
          { id: 'kept', value: 20148.97, tone: 'good', label: '\\text{kept } \\$20{,}148.97' },
        ],
        spans: [{ id: 'paid', from: 0, to: 1, label: '\\text{paid } \\$38{,}862.32', side: 'above', tone: 'ink' }],
      }),
      stackBar({
        name: 'lease',
        at: [0, 0],
        width: 11,
        scale: 38862.32,
        title: '\\text{lease}',
        stretches: [{ id: 'cost', value: 19370, tone: 'adj', label: '\\text{cost } \\$19{,}370.00' }],
      }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm303-8-2-d',
  lessonId: 'm303-8-2',
  title: 'Leasing and Leasing to Buy, Part 4: Buy or Lease?',
  thumbnailTitle: 'Buy or Lease?',
  thumbnail: 'cmp',
  summary: 'Comparing buying and leasing over the same time: subtract the value a bought vehicle still has. Buying an SUV with 5,000 dollars down and 36 payments of 940.62 dollars costs 38,862.32 dollars, but the SUV is still worth 33,995 × 0.84³ ≈ 20,148.97 dollars, so the net cost is 18,713.35 dollars, 656.65 dollars less than a 19,370 dollar lease. Compare total costs, not monthly payments.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 4', title: 'Buy or Lease?', subtitle: 'Comparing total costs over the same time' }],
      lines: [
        { say: 'Should you lease a vehicle or buy it? Neither choice is always better. It depends on the total costs, and on how you will use the vehicle.', show: 'title' },
        { say: 'In this video, you will compare the costs of buying and leasing over the same three years, and see which kind of driver each choice suits.' },
      ],
    },
    {
      chapter: 'Leasing and buying',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Leasing', 'Buying'],
          rows: [
            ['Lower monthly payments, often little down', 'Higher monthly payments'],
            ['A newer vehicle, usually under warranty', 'You own the vehicle, and it keeps some value'],
            ['Kilometre limits and wear-and-tear charges', 'No kilometre limits; drive and modify it as you like'],
            ['Nothing to sell at the end', 'Cheaper over a long time if you keep it'],
          ],
        },
      ],
      lines: [
        { say: 'Here is how leasing and buying compare. A vehicle lease usually has lower monthly payments, and often little money down. Buying with a loan has higher monthly payments.', show: 't.0', focus: 't.0' },
        { say: 'A leased vehicle is newer, and usually still under warranty. A vehicle you buy is yours, and it keeps some of its value.', show: 't.1', focus: 't.1' },
        { say: 'Every lease has kilometre limits, and charges for wear and tear. When you own a vehicle, you can drive it as far as you like, and change it as you like.', show: 't.2', focus: 't.2' },
        { say: 'And at the end of a lease, you have nothing to sell. Buying is usually cheaper over a long time, if you keep the vehicle.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Buying instead',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Instead of the \\$19,370.00 lease, Maya could buy the same SUV: \\$5,000 down and \\$940.62 a month for 36 months. Suppose it loses 16% of its value each year from its price of \\$33,995, and Maya could sell it after 3 years. Which costs less over the 3 years?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{total paid: } 5{,}000 + 940.62 \\times 36 = 5{,}000 + 33{,}862.32 = 38{,}862.32', '\\text{value after 3 years: } 33{,}995 \\times 0.84^3 \\approx 20{,}148.97', '\\text{net cost of buying: } 38{,}862.32 - 20{,}148.97 = 18{,}713.35'],
        },
      ],
      lines: [
        { say: 'Instead of the 19,370 dollar lease, Maya could buy the same SUV: 5,000 dollars down, and 940 dollars and 62 cents a month for 36 months.', show: 'p' },
        { say: 'Suppose the SUV loses sixteen percent of its value each year from its price of 33,995 dollars, and Maya could sell it after three years. Which costs less over the three years?' },
        { say: 'First, the total paid to buy: 940.62 times 36 is 33,862.32. Add the 5,000 dollars down to get 38,862.32.', show: 'm.0', focus: 'm.0' },
        { say: 'But after three years, Maya owns an SUV that is still worth something. Losing sixteen percent means keeping 84 percent each year: 33,995 times 0.84 cubed is about 20,148.97.', show: 'm.1', focus: 'm.1' },
        { say: 'Maya could sell it for about that much. So the net cost of buying is 38,862.32 minus 20,148.97, which is 18,713.35.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Comparing the totals',
      layout: 'center',
      main: [
        compare('cmp'),
        { kind: 'math', id: 'm', size: 'md', lines: ['19{,}370.00 - 18{,}713.35 = 656.65'] },
      ],
      lines: [
        { say: 'Now compare. Buying costs 38,862.32 in all, but 20,148.97 of that comes back as a vehicle Maya still owns. The net cost is 18,713.35.', show: ['cmp.buy-net', 'cmp.buy-kept', 'cmp.buy-title', 'cmp.buy-paid'], focus: ['cmp.buy-net', 'cmp.buy-kept'] },
        { say: 'Leasing, within the allowance, costs 19,370.', show: ['cmp.lease-cost', 'cmp.lease-title'], focus: 'cmp.lease-cost' },
        { say: 'So buying costs 656 dollars and 65 cents less than leasing, because Maya owns a vehicle worth about 20,149 dollars at the end.', show: 'm', focus: 'm' },
        { say: 'And if Maya drove 71,400 kilometres, the lease would cost 21,080, so leasing would cost even more.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing monthly payments', md: 'The lease payment (\\$468.75) is much lower than the loan payment (\\$940.62), but that does not make leasing cheaper. Compare **total** costs over the same time, and remember that a buyer still owns the vehicle at the end.' },
      ],
      lines: [
        { say: 'A common mistake is to compare only the monthly payments. The lease payment, 468.75, is about half the loan payment, 940.62.', show: 'oops' },
        { say: 'But that does not make leasing cheaper. Compare the total costs over the same time, and remember that the buyer still owns the vehicle at the end.' },
      ],
    },
    {
      chapter: 'Which suits you?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Leasing suits a driver who…', 'Buying suits a driver who…'],
          rows: [
            ['drives few kilometres', 'drives a lot'],
            ['wants a new vehicle every few years', 'keeps a vehicle a long time'],
            ['wants low monthly payments', 'uses the vehicle hard, for work or towing'],
          ],
        },
      ],
      lines: [
        { say: 'So which choice suits you? Leasing suits someone who drives few kilometres a year, and wants a new vehicle every few years, with low monthly payments.', show: 't', focus: 't' },
        { say: 'Buying suits someone who drives a lot, uses the vehicle hard, for work or towing, and keeps it for a long time. Whatever you choose, work out the total cost first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Over 4 years, buying a car costs \\$31,200 in all, and the car will then be worth \\$12,500. Leasing the same car for 4 years costs \\$20,400 in all. Which costs less, and by how much?',
          choices: ['Leasing, by \\$10,800', 'Buying, by \\$1,700', 'Leasing, by \\$1,700', 'Buying, by \\$12,500'],
          answer: 1,
          working: 'Net cost of buying: $31{,}200 - 12{,}500 = 18{,}700$. Leasing: $20{,}400$. Buying costs $20{,}400 - 18{,}700 = 1{,}700$ less.',
        },
      ],
      lines: [
        { say: 'Your turn. Over four years, buying a car costs 31,200 dollars in all, and the car will then be worth 12,500 dollars. Leasing the same car for four years costs 20,400 dollars in all. Which costs less, and by how much? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: buying, by 1,700 dollars. The net cost of buying is 31,200 minus 12,500, which is 18,700, and leasing costs 20,400. Choice A forgets that the buyer still owns a car worth 12,500 dollars.', show: 'q.answer' },
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
            'Compare total costs over the same time, not monthly payments.',
            'For buying, subtract the value the vehicle still has.',
            'Leasing suits low kilometres and a new vehicle often; buying suits high kilometres and keeping a vehicle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare buying and leasing, compare the total costs over the same time, not the monthly payments.', show: 'sum.0' },
        { say: 'For buying, subtract the value the vehicle still has at the end.', show: 'sum.1' },
        { say: 'Leasing suits drivers with low kilometres who want a new vehicle often. Buying suits drivers with high kilometres who keep a vehicle a long time. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
