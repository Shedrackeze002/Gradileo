import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine } from './lib/m6-5-figures.ts';

// The train: 90 km for each hour, from 0 to 4 hours.
const train = (id: string, height = 260) =>
  figure(id, [doubleLine({ top: ['0', '90', '180', '270', '360'], bottom: ['0', '1', '2', '3', '4'], titles: ['\\text{Distance (km)}', '\\text{Time (h)}'], titleRoom: 3.8 })], height);

// Babysitting: $9 for each hour, from 0 to 4 hours.
const pay = (id: string) =>
  figure(id, [doubleLine({ top: ['\\$0', '\\$9', '\\$18', '\\$27', '\\$36'], bottom: ['0', '1', '2', '3', '4'], titles: ['\\text{Pay}', '\\text{Time (h)}'], titleRoom: 3.8, tones: ['good', 'adj'] })], 260);

const video: Explainer = {
  id: 'm6-5-2',
  lessonId: 'm6-5-2',
  title: 'Rates and Unit Rates, Part 1: Rates and Unit Rates',
  thumbnailTitle: 'Rates and Unit Rates',
  thumbnail: 'tr',
  summary:
    'A rate compares two quantities in different units, such as 180 km in 2 h. On a double number line the train’s rate makes equivalent ratios (90 : 1, 180 : 2, 270 : 3, 360 : 4). A unit rate has a second term of 1: divide both terms by the second term, so 180 km in 2 h is 90 km/h, and $36 for 4 hours of babysitting is $9 per hour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 1', title: 'Rates and Unit Rates', subtitle: 'How much for one?' }],
      lines: [
        { say: 'A train goes one hundred eighty kilometres in two hours. A pack of six juice boxes costs four dollars and fifty cents. Each of these is a rate.', show: 'title' },
        { say: 'In this part, you will learn what a rate is, and how to find a unit rate: the amount for one.' },
      ],
    },
    {
      chapter: 'What is a rate?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate', md: 'A **rate** compares two quantities measured in different units, such as kilometres and hours, or dollars and juice boxes.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['180 \\text{ km in } 2 \\text{ h}', '\\$4.50 \\text{ for } 6 \\text{ juice boxes}'] },
      ],
      lines: [
        { say: 'A rate compares two quantities measured in different units.', show: 'def' },
        { say: 'One hundred eighty kilometres in two hours compares a distance in kilometres with a time in hours. The letter h stands for hours.', show: 'm.0', focus: 'm.0' },
        { say: 'Four dollars and fifty cents for six juice boxes compares an amount of money with a number of juice boxes.', show: 'm.1', focus: 'm.1' },
        { say: 'A rate is a kind of ratio. The two quantities just have different units.' },
      ],
    },
    {
      chapter: 'A double number line',
      layout: 'center',
      main: [train('tr', 300), { kind: 'text', id: 't', size: 'md', md: 'Each pair is $90 : 1$ with both terms multiplied by the same number.' }],
      lines: [
        { say: 'Suppose the train keeps the same speed. A double number line shows its rate. The top line shows the distance in kilometres, and the bottom line shows the time in hours. They match up.', show: ['tr.lines', 'tr.v0'] },
        { say: 'In two hours, the train goes one hundred eighty kilometres.', show: ['tr.v2', 'tr.link2'], focus: 'tr.v2' },
        { say: 'In one hour, half the time, it goes half as far: ninety kilometres.', show: ['tr.v1', 'tr.link1'], focus: 'tr.v1' },
        { say: 'In three hours, it goes two hundred seventy kilometres. In four hours, three hundred sixty kilometres.', show: ['tr.v3', 'tr.v4', 'tr.link3', 'tr.link4'], focus: ['tr.v3', 'tr.v4'] },
        { say: 'Every pair shows the same rate. Each one is ninety to one, with both terms multiplied by the same number. So they are equivalent ratios.', show: 't' },
      ],
    },
    {
      chapter: 'Unit rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit rate', md: 'A **unit rate** is a rate with a second term of $1$. It tells how much for **one**: one hour, one day or one item.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['90 \\text{ km in } \\good{1} \\text{ h}'] },
      ],
      lines: [
        { say: 'Ninety kilometres in one hour is special. Its second term is one.', show: 'm.0', focus: 'm.0' },
        { say: 'A rate with a second term of one is called a unit rate. It tells how much for one: one hour, one day or one item.', show: 'def' },
        { say: 'Unit rates are very useful, because they are easy to compare and easy to use.' },
      ],
    },
    {
      chapter: 'Speed of a train',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A train travels $180$ km in $2$ h. What is its speed in kilometres per hour (km/h)?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['180 \\text{ km in } 2 \\text{ h}', '180 \\div 2 = 90 \\qquad 2 \\div 2 = 1', '90 \\text{ km in } 1 \\text{ h} = 90 \\text{ km/h}'] },
      ],
      lines: [
        { say: 'A train travels one hundred eighty kilometres in two hours. What is its speed in kilometres per hour?', show: 't' },
        { say: 'Speed is a unit rate: the distance in one hour. Per means for each, so kilometres per hour means kilometres for each hour.', show: 'm.0', focus: 'm.0' },
        { say: 'To find a unit rate, divide both terms by the second term. Here, divide both by two. One hundred eighty divided by two is ninety, and two divided by two is one.', show: 'm.1', focus: 'm.1' },
        { say: 'So the train goes ninety kilometres in one hour. Its speed is ninety kilometres per hour. We write that as ninety k m slash h.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Pay per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Mia earns \\$36 for $4$ hours of babysitting. How much is that per hour?' },
        pay('py'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['36 \\div 4 = 9 \\;\\to\\; \\$9 \\text{ per hour}'] },
      ],
      lines: [
        { say: 'Mia earns thirty-six dollars for four hours of babysitting. How much is that per hour?', show: ['t', 'py.lines', 'py.v0', 'py.v4'] },
        { say: 'Per hour means for one hour. So divide by the number of hours. Thirty-six divided by four is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Mia earns nine dollars per hour. On the double number line, each hour adds nine dollars: nine, eighteen, twenty-seven and thirty-six dollars.', show: ['py.v1', 'py.v2', 'py.v3', 'py.link1'], focus: 'py.v1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cyclist rides $45$ km in $3$ h. What is the cyclist’s speed?',
          choices: ['$135$ km/h', '$15$ km/h', '$42$ km/h', '$48$ km/h'],
          answer: 1,
          working: 'Divide both terms by $3$: $45 \\div 3 = 15$ and $3 \\div 3 = 1$. So the speed is $15$ km/h.',
        },
      ],
      lines: [
        { say: 'Your turn. A cyclist rides forty-five kilometres in three hours. What is the cyclist’s speed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, fifteen kilometres per hour. Divide both terms by three: forty-five divided by three is fifteen, and three divided by three is one. Choice A multiplies forty-five by three instead of dividing.', show: 'q.answer' },
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
            'A **rate** compares two quantities with different units: $180$ km in $2$ h.',
            'A **unit rate** is the amount for one. Divide both terms by the second term.',
            'Speed is a unit rate: $90$ km/h means $90$ km in each hour.',
            '“Per” means “for each”: \\$9 per hour.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rate compares two quantities with different units.', show: 'sum.0' },
        { say: 'A unit rate is the amount for one. To find it, divide both terms by the second term.', show: 'sum.1' },
        { say: 'Speed is a unit rate, in kilometres per hour.', show: 'sum.2' },
        { say: 'And per means for each. In the next part, you will find the unit price: the cost of one item. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
