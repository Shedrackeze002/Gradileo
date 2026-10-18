import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

const video: Explainer = {
  id: 'm303-8-2',
  lessonId: 'm303-8-2',
  title: 'Leasing and Leasing to Buy, Part 1: How a Lease Works',
  thumbnailTitle: 'How a Lease Works',
  thumbnail: 'bar',
  summary: 'A vehicle lease is a long-term rental: monthly payments for a set term, then the vehicle goes back. Total lease cost = monthly payment × months + down payment + fees: 36 payments of 468.75 dollars, 2,000 dollars down and a 495 dollar acquisition fee cost 19,370.00 dollars, or about 538.06 dollars a month, more than the advertised payment.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 1', title: 'How a Lease Works', subtitle: 'The total cost of a lease' }],
      lines: [
        { say: '“Drive it home for 469 dollars a month!” Lease ads make a new vehicle seem cheap. Leasing can be a good deal, but only if you know what it really costs.', show: 'title' },
        { say: 'In this video, you will learn how a vehicle lease works, and find the total cost of a lease.' },
      ],
    },
    {
      chapter: 'A long-term rental',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lease', md: 'A **lease** is a long-term rental. You make monthly payments for a set **term** (often 24 to 60 months), then return the vehicle. You never own it unless you buy it at the end.' },
        { kind: 'bullets', id: 'b', items: ['At the start: often a **down payment** and an **acquisition fee** (a fee for setting up the lease).', 'Every month: the **lease payment**. Here, the payments include sales tax.', 'At the end: return the vehicle, or buy it.'] },
      ],
      lines: [
        { say: 'A vehicle lease is a long-term rental. You make monthly payments for a set time, called the term, often 24 to 60 months. Then you give the vehicle back.', show: 'def' },
        { say: 'You never own a leased vehicle, unless you choose to buy it at the end.' },
        { say: 'At the start, you may pay a down payment, and an acquisition fee, which is a fee for setting up the lease.', show: 'b.0' },
        { say: 'Then you make the monthly lease payments. In this lesson, the payments already include sales tax, and every question tells you the amounts.', show: 'b.1' },
        { say: 'At the end of the term, you return the vehicle, or buy it. Buying it is the topic of part three.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The total cost',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{total lease cost} = \\text{monthly payment} \\times \\text{months}', '{} + \\text{down payment} + \\text{fees}'] },
      ],
      lines: [
        { say: 'To find the total cost of a lease, multiply the monthly payment by the number of months.', show: 'f.0', focus: 'f.0' },
        { say: 'Then add everything paid at the start: the down payment and any fees.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A three-year lease',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Maya signs a 36-month lease on a new compact SUV. The payments are \\$468.75 a month, including tax. Maya pays \\$2,000 down and a \\$495 acquisition fee. What is the total cost of the lease?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{lease payments: } 468.75 \\times 36 = 16{,}875.00', '\\text{total: } 16{,}875.00 + 2{,}000 + 495 = 19{,}370.00'] },
        figure('bar', [
          stackBar({
            width: 12,
            stretches: [
              { id: 'pay', value: 16875, tone: 'adj', label: '36 \\text{ payments } \\$16{,}875' },
              { id: 'down', value: 2000, tone: 'theta', label: '\\text{down}' },
              { id: 'fee', value: 495, tone: 'opp', label: '\\text{fee}', place: 'below', shift: 0.3 },
            ],
            spans: [{ id: 'total', from: 0, to: 2, label: '\\text{total } \\$19{,}370.00', side: 'above' }],
            pad: 0.8,
          }),
        ], 250),
      ],
      lines: [
        { say: 'Maya signs a 36 month lease on a new compact SUV. The payments are 468 dollars and 75 cents a month, including tax. Maya pays 2,000 dollars down, and a 495 dollar acquisition fee. What is the total cost of the lease?', show: 'p' },
        { say: 'First, the lease payments: 468.75 times 36 is 16,875 dollars.', show: ['m.0', 'bar.pay'], focus: 'm.0' },
        { say: 'Then add the amounts paid at the start: 16,875 plus 2,000 plus 495 is 19,370 dollars.', show: ['m.1', 'bar.down', 'bar.fee'], focus: 'm.1' },
        { say: 'So the lease costs 19,370 dollars in total. And at the end, Maya hands the SUV back.', show: 'bar.total', focus: 'bar.total' },
      ],
    },
    {
      chapter: 'What it costs each month',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['19{,}370.00 \\div 36 \\approx 538.06 \\text{ a month}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The real monthly cost', md: 'Spread over the term, the money paid at the start adds about \\$69 a month to the \\$468.75 payment.' },
      ],
      lines: [
        { say: 'So what does it really cost Maya each month to drive the SUV? Spread the total over the 36 months: 19,370 divided by 36 is about 538 dollars and 6 cents a month.', show: 'm', focus: 'm' },
        { say: 'That is about 69 dollars a month more than the payment in the ad, because of the money paid at the start.', show: 'key' },
        { say: 'And remember what Maya gets for it: three years of driving, but nothing to keep or sell at the end.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting only the payments', md: 'The payments alone, \\$16,875, leave out the \\$2,000 down payment and the \\$495 fee. The total cost of a lease includes everything you pay.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{468.75 \\times 36 = 16{,}875.00} \\qquad \\good{16{,}875.00 + 2{,}000 + 495 = 19{,}370.00}'] },
      ],
      lines: [
        { say: 'A common mistake is to count only the monthly payments.', show: 'oops' },
        { say: 'The payments come to 16,875 dollars, but Maya also paid 2,000 dollars down and a 495 dollar fee. The total cost of a lease includes everything you pay: 19,370 dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A lease costs \\$389.50 a month for 48 months, including tax, with \\$1,500 down and a \\$450 acquisition fee. What is the total cost of the lease?',
          choices: ['\\$20,646.00', '\\$18,696.00', '\\$20,196.00', '\\$2,339.50'],
          answer: 0,
          working: '$389.50 \\times 48 = 18{,}696.00$, and $18{,}696.00 + 1{,}500 + 450 = 20{,}646.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. The payments on a lease are 389 dollars and fifty cents a month for 48 months, including tax, with 1,500 dollars down and a 450 dollar acquisition fee. What is the total cost of the lease? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 20,646 dollars. The payments are 389.50 times 48, which is 18,696. Add 1,500 and 450 to get 20,646. Choice B is the payments alone, without the amounts paid at the start.', show: 'q.answer' },
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
            'A lease is a long-term rental: you return the vehicle at the end.',
            'Total lease cost $=$ monthly payment $\\times$ months $+$ down payment $+$ fees.',
            'Divide the total by the months to see the real monthly cost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A vehicle lease is a long-term rental: you make payments for a set term, then return the vehicle.', show: 'sum.0' },
        { say: 'The total cost of a lease is the monthly payment times the number of months, plus the down payment and any fees.', show: 'sum.1' },
        { say: 'Divide the total by the number of months to see the real monthly cost. In part two, we find what it costs to drive more than a lease allows. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
