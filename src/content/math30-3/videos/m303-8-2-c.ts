import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

/** Leasing then buying (19,370 + 20,790) against paying cash at the start (35,694.75). */
const compare = (id: string) =>
  figure(
    id,
    [
      stackBar({
        name: 'lb',
        at: [0, 2.2],
        width: 11,
        scale: 40160,
        title: '\\text{lease, then buy}',
        titleRoom: 3.4,
        stretches: [
          { id: 'lease', value: 19370, tone: 'adj', label: '\\text{lease } \\$19{,}370' },
          { id: 'buy', value: 20790, tone: 'theta', label: '\\text{buyout } \\$20{,}790' },
        ],
        spans: [{ id: 'total', from: 0, to: 1, label: '\\$40{,}160.00', side: 'above', tone: 'ink' }],
      }),
      stackBar({
        name: 'cash',
        at: [0, 0],
        width: 11,
        scale: 40160,
        title: '\\text{pay cash}',
        titleRoom: 3.4,
        stretches: [
          { id: 'price', value: 35694.75, tone: 'good', label: '\\text{cash } \\$35{,}694.75' },
          { id: 'diff', value: 4465.25, tone: 'bad', label: '\\$4{,}465.25 \\text{ more}', place: 'below', shift: -0.6 },
        ],
      }),
    ],
    360,
  );

const video: Explainer = {
  id: 'm303-8-2-c',
  lessonId: 'm303-8-2',
  title: 'Leasing and Leasing to Buy, Part 3: Leasing to Buy',
  thumbnailTitle: 'Leasing to Buy',
  thumbnail: 'cmp',
  summary: 'The residual value (buyout price) is the price, set in the lease, at which the vehicle can be bought at the end. Total cost to own = total lease cost + buyout × 1.05 with a sales tax of 5%: a 19,370 dollar lease and a 19,800 dollar buyout cost 40,160.00 dollars, which is 4,465.25 dollars more than paying 33,995 dollars plus tax in cash at the start.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 3', title: 'Leasing to Buy', subtitle: 'Keeping the vehicle at the end of a lease' }],
      lines: [
        { say: 'At the end of a lease, you can hand back the keys, or keep the vehicle by buying it.', show: 'title' },
        { say: 'In this video, you will find the total cost of owning a vehicle by leasing it and then buying it, and compare it with paying cash at the start.' },
      ],
    },
    {
      chapter: 'Residual value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Residual value', md: 'The **residual value** (or **buyout price**) is the price, set in the lease, at which you can buy the vehicle at the end of the lease. Sales tax is charged on the buyout.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{total cost to own} = \\text{total lease cost} + \\text{buyout} \\times 1.05'] },
        { kind: 'text', id: 't', size: 'md', md: 'for a sales tax of 5%' },
      ],
      lines: [
        { say: 'Every lease sets a residual value, also called the buyout price. It is the price at which you can buy the vehicle when the lease ends.', show: 'def' },
        { say: 'The buyout is a purchase, so sales tax is charged on it.' },
        { say: 'So the total cost to own the vehicle this way is the total cost of the lease, plus the buyout with tax. For a sales tax of five percent, that is the buyout times 1.05.', show: ['f', 't'], focus: 'f' },
      ],
    },
    {
      chapter: 'Keeping the SUV',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Maya’s lease cost \\$19,370.00 in all, and Maya stayed within the allowance. At the end, Maya can buy the SUV for its residual value of \\$19,800, plus a sales tax of 5%. What is the total cost to own the SUV this way?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{buyout with tax: } 19{,}800 \\times 1.05 = 20{,}790.00', '\\text{total cost to own: } 19{,}370.00 + 20{,}790.00 = 40{,}160.00'] },
      ],
      lines: [
        { say: 'Maya’s lease cost 19,370 dollars in all, and Maya stayed within the kilometre allowance. At the end, Maya can buy the SUV for its residual value of 19,800 dollars, plus a sales tax of five percent.', show: 'p' },
        { say: 'First, the buyout with tax: 19,800 times 1.05 is 20,790 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the cost of the lease: 19,370 plus 20,790 is 40,160 dollars. That is what the SUV costs Maya to own by leasing it first.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Compared with paying cash',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At the start, the SUV cost \\$33,995, plus a sales tax of 5%.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{cash: } 33{,}995 \\times 1.05 = 35{,}694.75', '\\text{difference: } 40{,}160.00 - 35{,}694.75 = 4{,}465.25'] },
        compare('cmp'),
      ],
      lines: [
        { say: 'How does that compare with paying cash at the start? At the start, the SUV cost 33,995 dollars, plus a sales tax of five percent.', show: 'p' },
        { say: 'Paying cash would have cost 33,995 times 1.05, which is 35,694 dollars and 75 cents.', show: ['m.0', 'cmp.cash-price', 'cmp.cash-title'], focus: 'm.0' },
        { say: 'Leasing and then buying cost 40,160. The difference is 40,160 minus 35,694.75, which is 4,465 dollars and 25 cents.', show: ['m.1', 'cmp.lb-lease', 'cmp.lb-buy', 'cmp.lb-title', 'cmp.lb-total', 'cmp.cash-diff'], focus: ['m.1', 'cmp.cash-diff'] },
        { say: 'So leasing to buy costs 4,465.25 more than paying cash. The extra is the cost of spreading the payments out over time.' },
      ],
    },
    {
      chapter: 'Why lease to buy?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['You may not have the cash at the start.', 'The monthly payments are lower than loan payments.', 'You can decide at the end whether to keep the vehicle.'] },
      ],
      lines: [
        { say: 'If it costs more, why would anyone lease to buy? First, you may not have 35,000 dollars in cash at the start.', show: 'b.0' },
        { say: 'Second, the monthly lease payments are lower than the payments on a loan for the whole price.', show: 'b.1' },
        { say: 'And third, you can wait until the end of the lease to decide whether you want to keep the vehicle. But all of that comes at a price, so always work out the total.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the tax on the buyout', md: 'The buyout is a purchase, so the sales tax is charged on it. Adding the buyout without tax comes out \\$990 short.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{19{,}370 + 19{,}800 = 39{,}170}', '\\good{19{,}370 + 19{,}800 \\times 1.05 = 40{,}160}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the buyout price without the tax.', show: 'oops' },
        { say: '19,370 plus 19,800 is 39,170 dollars. That is 990 dollars short: five percent of 19,800.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the buyout by 1.05 first, then add it to the cost of the lease.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A lease cost \\$17,250.00 in total. At the end, the buyout price is \\$15,400, plus a sales tax of 5%. What is the total cost to own the vehicle?',
          choices: ['\\$32,650.00', '\\$16,170.00', '\\$34,282.50', '\\$33,420.00'],
          answer: 3,
          working: 'Buyout with tax: $15{,}400 \\times 1.05 = 16{,}170.00$. Total cost to own: $17{,}250.00 + 16{,}170.00 = 33{,}420.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. The total cost of a lease was 17,250 dollars in total. At the end, the buyout price is 15,400 dollars, plus a sales tax of five percent. What is the total cost to own the vehicle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 33,420 dollars. The buyout with tax is 15,400 times 1.05, which is 16,170. Add the lease: 17,250 plus 16,170 is 33,420. Choice A forgets the tax on the buyout.', show: 'q.answer' },
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
            'The residual value, or buyout price, is set in the lease.',
            'Total cost to own $=$ total lease cost $+$ buyout $\\times\\ 1.05$ (5% sales tax).',
            'Compare it with the cash price with tax to see the cost of spreading the payments out.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The residual value, or buyout price, is the price set in the lease for buying the vehicle at the end.', show: 'sum.0' },
        { say: 'The total cost to own is the total cost of the lease, plus the buyout with tax.', show: 'sum.1' },
        { say: 'Compare it with the cash price with tax, to see what spreading the payments out costs. In part four, we decide between buying and leasing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
