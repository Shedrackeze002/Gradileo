import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine } from '@/content/math6/videos/lib/m6-5-figures.ts';
import { rateLine } from './lib/m8-3-figures.ts';

// Hockey tape: $3 a roll, from 0 to 7 rolls.
const tape = (id: string) =>
  figure(
    id,
    [
      doubleLine({
        top: ['\\$0', '\\$3', '\\$6', '\\$9', '\\$12', '\\$15', '\\$18', '\\$21'],
        bottom: ['0', '1', '2', '3', '4', '5', '6', '7'],
        titles: ['\\text{Cost}', '\\text{Rolls}'],
        titleRoom: 2.4,
        tones: ['good', 'adj'],
      }),
    ],
    270,
  );

// The road trip: 90 km in each hour, and 405 km at 4.5 h.
const trip = (id: string) =>
  figure(
    id,
    [
      rateLine({
        max: 5,
        titles: ['\\text{Distance (km)}', '\\text{Time (h)}'],
        titleRoom: 3.8,
        marks: [
          { id: 'm0', at: 0, top: '0', bottom: '0' },
          { id: 'm1', at: 1, top: '90', bottom: '1' },
          { id: 'm2', at: 2, top: '180', bottom: '2' },
          { id: 'm3', at: 3, top: '270', bottom: '3' },
          { id: 'm4', at: 4, top: '360', bottom: '4' },
          { id: 'end', at: 4.5, top: '405', bottom: '4.5', tone: 'theta' },
        ],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm8-3-3-c',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 3: The Unit-Rate Method',
  thumbnailTitle: 'The Unit-Rate Method',
  thumbnail: 'tp',
  summary:
    'In the unit-rate method, find the amount for one unit first, then multiply (or divide). If 4 rolls of hockey tape cost $12, one roll costs 12 ÷ 4 = $3, so 7 rolls cost 7 × 3 = $21. If a family drives 270 km in 3 hours, the speed is 270 ÷ 3 = 90 km/h, so 405 km takes 405 ÷ 90 = 4.5 hours, which is 4 h 30 min.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 3', title: 'The Unit-Rate Method', subtitle: 'Find one first' }],
      lines: [
        { say: 'Four rolls of hockey tape cost twelve dollars. At the same price, how much do seven rolls cost?', show: 'title' },
        { say: 'In this part, you will solve problems like this with the unit-rate method: find the amount for one unit first, then multiply.' },
      ],
    },
    {
      chapter: 'Hockey tape',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$4$ rolls of hockey tape cost \\$12. At the same price, how much do $7$ rolls cost?' },
        tape('tp'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{One roll: } 12 \\div 4 = 3', '\\text{Seven rolls: } 7 \\times 3 = 21'] },
      ],
      lines: [
        { say: 'Four rolls of hockey tape cost twelve dollars. At the same price, how much do seven rolls cost?', show: 'q' },
        { say: 'On this double number line, the top line shows the cost, and the bottom line shows the number of rolls. Four rolls cost twelve dollars.', show: ['tp.lines', 'tp.v0', 'tp.v4', 'tp.link4'], focus: 'tp.v4' },
        { say: 'Step one: find the cost of one roll, the unit rate. Twelve divided by four is three. The tape costs three dollars per roll.', show: ['tp.v1', 'tp.link1', 'm.0'], focus: ['tp.v1', 'm.0'] },
        { say: 'Each roll adds three more dollars: six, nine, twelve, fifteen, eighteen and twenty-one dollars.', show: ['tp.v2', 'tp.v3', 'tp.v5', 'tp.v6', 'tp.v7'] },
        { say: 'Step two: multiply. Seven rolls cost seven times three, which is twenty-one dollars.', show: ['tp.link7', 'm.1'], focus: ['tp.v7', 'm.1'] },
      ],
    },
    {
      chapter: 'A road trip',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A family drives $270$ km in $3$ hours. At the same speed, how long will it take to drive $405$ km?' },
        trip('rt'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Unit rate: } 270 \\div 3 = 90 \\text{ km/h}', '\\text{Time: } 405 \\div 90 = 4.5 \\text{ h}'] },
      ],
      lines: [
        { say: 'Here is a different kind of question. A family drives two hundred seventy kilometres in three hours. At the same speed, how long will it take to drive four hundred five kilometres?', show: 'q' },
        { say: 'Step one: find the unit rate, the distance in one hour. Two hundred seventy divided by three is ninety. The speed is ninety kilometres per hour.', show: ['rt.lines', 'rt.m0', 'rt.m3', 'rt.m1', 'rt.m1-link', 'm.0'], focus: ['rt.m1', 'm.0'] },
        { say: 'Each hour adds ninety kilometres: one hundred eighty, two hundred seventy, three hundred sixty.', show: ['rt.m2', 'rt.m4'] },
        { say: 'Step two. This time we know the distance and want the time. How many groups of ninety kilometres fit into four hundred five? Divide: four hundred five divided by ninety is four point five.', show: ['rt.end', 'rt.end-link', 'm.1'], focus: ['rt.end', 'm.1'] },
        { say: 'Four point five hours is four and a half hours. Half an hour is thirty minutes, so the drive takes four hours and thirty minutes.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'The unit-rate method',
          md: '**Step 1:** find the amount for **one** unit (divide). **Step 2:** multiply to find an amount, or divide by the unit rate to find how many units.',
        },
      ],
      lines: [
        { say: 'Here is the unit-rate method. Step one: find the amount for one unit, by dividing.', show: 'key' },
        { say: 'Step two: multiply the unit rate to find an amount, like the cost of seven rolls. Or divide by the unit rate to find how many units, like the number of hours.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$5$ notebooks cost \\$8.75. At the same price, how much do $3$ notebooks cost?',
          choices: ['\\$1.75', '\\$14.58', '\\$5.25', '\\$6.75'],
          answer: 2,
          working: 'One notebook: $8.75 \\div 5 = 1.75$, so \\$1.75 each. Three notebooks: $3 \\times 1.75 = 5.25$, so \\$5.25.',
        },
      ],
      lines: [
        { say: 'Your turn. Five notebooks cost eight dollars and seventy-five cents. At the same price, how much do three notebooks cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, five dollars and twenty-five cents. One notebook costs eight point seven five divided by five, which is one dollar and seventy-five cents. Three notebooks cost three times that. Choice A is the cost of one notebook. It is only the first step.', show: 'q.answer' },
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
            '**Unit-rate method:** find the amount for one unit first.',
            'Then multiply: one roll is \\$3, so $7$ rolls cost $7 \\times 3 = 21$ dollars.',
            'Or divide by the unit rate: $405 \\div 90 = 4.5$ hours.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In the unit-rate method, find the amount for one unit first.', show: 'sum.0' },
        { say: 'Then multiply to find an amount.', show: 'sum.1' },
        { say: 'Or divide by the unit rate to find how many units. In the next part, you will set up a proportion instead: the equivalent-ratio method. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
