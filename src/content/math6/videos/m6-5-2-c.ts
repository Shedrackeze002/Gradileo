import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine } from './lib/m6-5-figures.ts';

// The car: 90 km for each hour, from 0 to 5 hours.
const car = (id: string) =>
  figure(id, [doubleLine({ top: ['0', '90', '180', '270', '360', '450'], bottom: ['0', '1', '2', '3', '4', '5'], titles: ['\\text{Distance (km)}', '\\text{Time (h)}'], titleRoom: 3.8 })], 280);

const video: Explainer = {
  id: 'm6-5-2-c',
  lessonId: 'm6-5-2',
  title: 'Rates and Unit Rates, Part 3: Using Unit Rates',
  thumbnailTitle: 'Using Unit Rates',
  thumbnail: 'cr',
  summary:
    'Unit rates compare deals and extend a rate to new amounts. 4 granola bars for $3.00 is $0.75 each and 6 for $4.20 is $0.70 each, so the second store is the better buy. A car that goes 180 km in 2 h goes 90 km/h, so 450 km in 5 h. Find the rate for one first, then multiply: 3 bags for $12 is $4 a bag, so 7 bags cost $28.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 3', title: 'Using Unit Rates', subtitle: 'Compare deals and find new amounts' }],
      lines: [
        { say: 'Two stores sell the same granola bars in different packs. Which one is the better buy? Unit rates can tell you.', show: 'title' },
        { say: 'In this part, you will use unit rates to compare deals, and to find amounts for any number of items or hours.' },
      ],
    },
    {
      chapter: 'The better buy',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Store A sells $4$ granola bars for \\$3.00. Store B sells $6$ granola bars for \\$4.20. Which is the better buy?' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Store', 'Price', 'Bars', 'Price of one bar'],
          rows: [
            ['A', '\\$3.00', '$4$', '$3.00 \\div 4 = 0.75$, so \\$0.75'],
            ['B', '\\$4.20', '$6$', '$4.20 \\div 6 = 0.70$, so \\$0.70'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\$0.70 < \\$0.75 \\;\\to\\; \\text{Store B}'] },
      ],
      lines: [
        { say: 'Store A sells four granola bars for three dollars. Store B sells six granola bars for four dollars and twenty cents. Which is the better buy?', show: 't' },
        { say: 'The packs have different sizes, so compare the price of one bar. That is the unit price.' },
        { say: 'Store A: three dollars divided by four is seventy-five cents for one bar.', show: 'tb.0', focus: 'tb.0' },
        { say: 'Store B: four dollars and twenty cents divided by six is seventy cents for one bar.', show: 'tb.1', focus: 'tb.1' },
        { say: 'Seventy cents is less than seventy-five cents. So Store B has the better buy, even though its pack costs more in all.', show: 'm.0', focus: ['m.0', 'tb.1'] },
      ],
    },
    {
      chapter: 'How far in 5 hours?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A car travels $180$ km in $2$ h. At the same speed, how far does it go in $5$ h?' },
        car('cr'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['180 \\div 2 = 90 \\text{ km/h} \\qquad 90 \\times 5 = 450 \\text{ km}'] },
      ],
      lines: [
        { say: 'A car travels one hundred eighty kilometres in two hours. At the same speed, how far does it go in five hours?', show: ['t', 'cr.lines', 'cr.v0', 'cr.v2'] },
        { say: 'First find the unit rate. One hundred eighty divided by two is ninety. So the car goes ninety kilometres per hour.', show: ['cr.v1', 'cr.link1'], focus: 'cr.v1' },
        { say: 'Each hour adds another ninety kilometres. In five hours, the car goes ninety times five, which is four hundred fifty kilometres.', show: ['cr.v3', 'cr.v4', 'cr.v5', 'cr.link5', 'm.0'], focus: ['cr.v5', 'm.0'] },
      ],
    },
    {
      chapter: 'Find the one first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Find the “one” first', md: 'When a problem gives a rate for several items or hours, find the rate for **one** first. Then multiply.' },
        { kind: 'text', id: 't', size: 'md', md: '$3$ bags of rice cost \\$12. How much do $7$ bags cost?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\div 3 = 4 \\;\\to\\; \\$4 \\text{ per bag}', '4 \\times 7 = 28 \\;\\to\\; \\$28'] },
      ],
      lines: [
        { say: 'Here is a tip. When a problem gives a rate for several items or hours, find the rate for one first. Then multiply.', show: 'tip' },
        { say: 'For example, three bags of rice cost twelve dollars. How much do seven bags cost?', show: 't' },
        { say: 'Find the cost of one bag: twelve dollars divided by three is four dollars per bag.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply: seven bags at four dollars each cost twenty-eight dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Store P sells $5$ pens for \\$4.00. Store Q sells $8$ pens for \\$6.00. Which store has the better buy?',
          choices: ['Store Q, at \\$0.75 per pen', 'Store P, at \\$0.80 per pen', 'Store P, because its pack costs less in all', 'Both are the same buy'],
          answer: 0,
          working: 'Store P: $4.00 \\div 5 = 0.80$, so \\$0.80 per pen. Store Q: $6.00 \\div 8 = 0.75$, so \\$0.75 per pen. \\$0.75 is less, so Store Q has the better buy.',
        },
      ],
      lines: [
        { say: 'Your turn. Store P sells five pens for four dollars. Store Q sells eight pens for six dollars. Which store has the better buy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Store P: four dollars divided by five is eighty cents per pen. Store Q: six dollars divided by eight is seventy-five cents per pen. Seventy-five cents is less, so Store Q has the better buy. Choice C looks only at the total cost, but Store Q gives you more pens.', show: 'q.answer' },
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
            'To compare deals, compare the unit prices. The lower unit price is the better buy.',
            'To find an amount for any number of items or hours, find the unit rate, then multiply.',
            'Find the “one” first: \\$12 for $3$ bags is \\$4 a bag, so $7$ bags cost \\$28.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare deals, compare the unit prices. The lower unit price is the better buy.', show: 'sum.0' },
        { say: 'To find an amount for any number of items or hours, find the unit rate, then multiply.', show: 'sum.1' },
        { say: 'In short, find the rate for one first. In the next lesson, you will find a percent of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
