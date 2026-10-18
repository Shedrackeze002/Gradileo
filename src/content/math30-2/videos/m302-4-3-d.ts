import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-3-d',
  lessonId: 'm302-4-3',
  title: 'Rational Equations, Part 4: Travel and Average Cost',
  thumbnailTitle: 'Travel and Average Cost',
  thumbnail: false,
  summary: 'Rational equations from travel (time = distance ÷ speed: a car 15 km/h faster than a truck goes 300 km while the truck goes 250 km, so the truck travels at 75 km/h) and from average cost (a $1200 set-up fee plus $4.50 a hoodie averages $10.50 a hoodie at 200 hoodies), and rejecting answers that make no sense, such as a negative speed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 4', title: 'Travel and Average Cost', subtitle: 'Time and average cost are both divisions' }],
      lines: [
        { say: 'A car and a truck set off at the same time. A class orders hoodies, and wants the cost of each one to come down. Both lead to rational equations, because a travel time and an average cost are both divisions.', show: 'title' },
        { say: 'In this video, you will set up and solve rational equations for travel and for average cost, and reject answers that make no sense.' },
      ],
    },
    {
      chapter: 'Time from distance and speed',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In the same time that a car travels 300 km, a truck travels 250 km. The car is 15 km/h faster. Find the truck’s speed.' },
        {
          kind: 'table',
          id: 't',
          head: ['Vehicle', 'Distance', 'Speed', 'Time = distance ÷ speed'],
          rows: [
            ['Truck', '250 km', '$s$', '$\\dfrac{250}{s}$'],
            ['Car', '300 km', '$s + 15$', '$\\dfrac{300}{s + 15}$'],
          ],
        },
      ],
      lines: [
        { say: 'In the same time that a car travels 300 kilometres, a truck travels 250 kilometres. The car is fifteen kilometres per hour faster. Find the truck’s speed.', show: 'p' },
        { say: 'Speed is distance divided by time, so time is distance divided by speed. A table keeps the facts in order.', show: 't' },
        { say: 'Let s be the truck’s speed, in kilometres per hour. The truck travels 250 kilometres, so its time is 250 over s.', focus: 't.0' },
        { say: 'The car is fifteen kilometres per hour faster, so its speed is s plus fifteen, and its time is 300 over s plus fifteen.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Equal travel times',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{300}{s + 15} = \\dfrac{250}{s}, \\quad s \\ne -15, \\ 0',
            '300s = 250(s + 15) = 250s + 3750',
            '50s = 3750 \\quad\\to\\quad s = 75',
            '\\text{check: } \\dfrac{300}{90} = \\dfrac{10}{3} \\text{ h}, \\quad \\dfrac{250}{75} = \\dfrac{10}{3} \\text{ h} \\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'The two times are equal, so 300 over s plus fifteen equals 250 over s. The non-permissible values are negative fifteen and zero.', show: 'm.0', focus: 'm.0' },
        { say: 'There is one fraction on each side, so cross-multiply: 300 s equals 250 times s plus fifteen, which is 250 s plus 3,750.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract 250 s from both sides: fifty s equals 3,750. Divide by fifty: s equals seventy-five.', show: 'm.2', focus: 'm.2' },
        { say: 'So the truck travels at seventy-five kilometres per hour, and the car at ninety. Check: 300 over ninety is ten thirds of an hour, and 250 over seventy-five is also ten thirds of an hour. The times match.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Average cost',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A class pays a fixed \\$1200 to set up a hoodie order, plus \\$4.50 for each hoodie. How many hoodies make the average cost \\$10.50 per hoodie?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{average cost} = \\dfrac{1200 + 4.5n}{n}',
            '\\dfrac{1200 + 4.5n}{n} = 10.5, \\quad n \\ne 0',
            '1200 + 4.5n = 10.5n \\quad\\to\\quad 1200 = 6n \\quad\\to\\quad n = 200',
          ],
        },
      ],
      lines: [
        { say: 'A class pays a fixed 1,200 dollars to set up a hoodie order, plus four dollars and fifty cents for each hoodie. How many hoodies make the average cost ten dollars and fifty cents per hoodie?', show: 'p' },
        { say: 'The average cost is the total cost divided by the number of hoodies. For n hoodies, the total cost is 1,200 plus 4.5 n dollars, so the average cost is 1,200 plus 4.5 n, all over n.', show: 'm.0', focus: 'm.0' },
        { say: 'Set it equal to 10.5. The non-permissible value is n equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by n: 1,200 plus 4.5 n equals 10.5 n. Subtract 4.5 n: 1,200 equals six n. So n is 200 hoodies.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: 200 hoodies cost 1,200 plus 900, which is 2,100 dollars, and 2,100 divided by 200 is ten dollars and fifty cents each.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping an impossible answer', md: 'Problems in context can give a root such as a speed of $-5$ km/h or a time of $-2$ h. Reject roots that make no sense in the situation, as well as extraneous roots.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['s = 60 \\ \\text{or} \\ s = -5 \\quad\\to\\quad \\good{s = 60 \\text{ km/h}}'] },
      ],
      lines: [
        { say: 'A common mistake is to keep every root of the equation. Problems in context can give a root such as a speed of negative five kilometres per hour, or a time of negative two hours.', show: 'oops' },
        { say: 'For example, if solving for a speed gives sixty or negative five, the speed must be sixty kilometres per hour: a speed cannot be negative.', show: 'm', focus: 'm' },
        { say: 'So reject roots that make no sense in the situation, as well as extraneous roots. And always answer the question in words, with units.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A boat travels 36 km downstream in the same time it travels 24 km upstream. The current adds 3 km/h to its speed going downstream and takes 3 km/h away going upstream. What is the boat’s speed in still water?',
          choices: ['$15$ km/h', '$12$ km/h', '$-15$ km/h', '$18$ km/h'],
          answer: 0,
          working: '$\\dfrac{36}{b + 3} = \\dfrac{24}{b - 3}$, so $36(b - 3) = 24(b + 3)$, $36b - 108 = 24b + 72$, $12b = 180$ and $b = 15$ km/h.',
        },
      ],
      lines: [
        { say: 'Your turn. A boat travels thirty-six kilometres downstream in the same time it travels twenty-four kilometres upstream. The current adds three kilometres per hour to its speed going downstream, and takes three away going upstream. What is the boat’s speed in still water? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, fifteen kilometres per hour. The times are equal: thirty-six over b plus three equals twenty-four over b minus three. Cross-multiply: thirty-six b minus 108 equals twenty-four b plus seventy-two, so twelve b is 180, and b is fifteen. Choice D, eighteen, is the boat’s speed going downstream, not in still water.', show: 'q.answer' },
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
          items: ['Travel: time $=$ distance $\\div$ speed; equal times give a proportion.', 'Average cost $=$ total cost $\\div$ number of items.', 'Reject extraneous roots, and roots that make no sense in the situation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For travel, time is distance divided by speed, and equal times give a proportion to solve.', show: 'sum.0' },
        { say: 'Average cost is the total cost divided by the number of items.', show: 'sum.1' },
        { say: 'And reject extraneous roots, and any roots that make no sense in the situation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
