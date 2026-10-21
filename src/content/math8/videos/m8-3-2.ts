import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine } from '@/content/math6/videos/lib/m6-5-figures.ts';

// The bus: 90 km in each hour, for 0, 1 and 2 hours.
const bus = (id: string) =>
  figure(id, [doubleLine({ top: ['0', '90', '180'], bottom: ['0', '1', '2'], titles: ['\\text{Distance (km)}', '\\text{Time (h)}'], titleRoom: 3.8, length: 10 })], 260);

const video: Explainer = {
  id: 'm8-3-2',
  lessonId: 'm8-3-2',
  title: 'Rates and Unit Rates, Part 1: Rates and Unit Rates',
  thumbnailTitle: 'Rates and Unit Rates',
  thumbnail: 'bs',
  summary:
    'A rate compares two quantities measured in different units, such as 180 km in 2 h or $7.20 for 3 kg, so a rate always keeps its units: “90” is not a speed, but “90 km/h” is. A unit rate is the amount for one unit of the second quantity. To find it, divide by the number of units: a bus that travels 180 km in 2 hours has an average speed of 180 ÷ 2 = 90 km/h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 1', title: 'Rates and Unit Rates', subtitle: 'How much for one?' }],
      lines: [
        { say: 'A bus travels one hundred eighty kilometres in two hours. A three-kilogram bag of apples costs seven dollars and twenty cents. Your heart beats about seventy times a minute.', show: 'title' },
        { say: 'Each of these compares two quantities with different units. In this part, you will learn what a rate is, and how to find a unit rate.' },
      ],
    },
    {
      chapter: 'What is a rate?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate', md: 'A **rate** compares two quantities measured in **different units**, such as kilometres and hours, or dollars and kilograms.' },
        { kind: 'text', id: 'a', size: 'lg', align: 'center', md: '$180$ km in $2$ h' },
        { kind: 'text', id: 'b', size: 'lg', align: 'center', md: '\\$7.20 for $3$ kg' },
        { kind: 'text', id: 'c', size: 'lg', align: 'center', md: '$18$ heartbeats in $15$ s' },
      ],
      lines: [
        { say: 'A rate compares two quantities measured in different units, such as kilometres and hours, or dollars and kilograms.', show: 'def' },
        { say: 'One hundred eighty kilometres in two hours compares a distance with a time. The letter h stands for hours.', show: 'a', focus: 'a' },
        { say: 'Seven dollars and twenty cents for three kilograms compares a cost with a mass.', show: 'b', focus: 'b' },
        { say: 'And eighteen heartbeats in fifteen seconds compares a number of beats with a time. The letter s stands for seconds.', show: 'c', focus: 'c' },
      ],
    },
    {
      chapter: 'Ratio or rate?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Example', 'Units'],
          rows: [
            ['**Ratio**', '$1$ cup of concentrate to $3$ cups of water', 'The same: cups and cups'],
            ['**Rate**', '$180$ km in $2$ h', 'Different: kilometres and hours'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'A rate keeps its units', md: '“$180$ in $2$” means nothing until you say kilometres and hours.' },
      ],
      lines: [
        { say: 'How is a rate different from a ratio? A ratio compares quantities with the same unit, like cups of concentrate and cups of water.', show: 't.0' },
        { say: 'A rate compares quantities with different units, like kilometres and hours.', show: 't.1' },
        { say: 'So a rate always keeps its units. One hundred eighty in two means nothing until you say kilometres and hours.', show: 'tip' },
      ],
    },
    {
      chapter: 'Unit rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit rate', md: 'A **unit rate** is a rate for **one** unit of the second quantity: per hour, per kilogram, per minute. A speed in km/h is a unit rate.' },
        { kind: 'text', id: 'a', size: 'lg', align: 'center', md: '$90$ km/h is read “$90$ kilometres **per** hour”.' },
      ],
      lines: [
        { say: 'A unit rate is a rate for one unit of the second quantity. It tells you how much for one hour, one kilogram or one minute.', show: 'def' },
        { say: 'Unit rates often use the word per, which means for each, or in each. Ninety kilometres per hour means ninety kilometres in each hour.', show: 'a' },
        { say: 'It is written with a slash: km slash h. A speed in kilometres per hour is a unit rate, because it is the distance for one hour.' },
      ],
    },
    {
      chapter: 'The bus',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A bus travels $180$ km in $2$ hours. What is its average speed?' },
        bus('bs'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['180 \\div 2 = 90', '\\text{Average speed} = 90 \\text{ km/h}'] },
      ],
      lines: [
        { say: 'A bus travels one hundred eighty kilometres in two hours. What is its average speed?', show: 'q' },
        { say: 'Speed is the distance travelled in one hour. On this double number line, the top line shows the distance, and the bottom line shows the time. The two lines match up.', show: ['bs.lines', 'bs.v0'] },
        { say: 'In two hours, the bus travels one hundred eighty kilometres.', show: ['bs.v2', 'bs.link2'], focus: 'bs.v2' },
        { say: 'One hour is half of two hours. So in one hour, the bus travels half as far: ninety kilometres.', show: ['bs.v1', 'bs.link1'], focus: 'bs.v1' },
        { say: 'In numbers, divide the distance by the time. One hundred eighty divided by two is ninety.', show: 'm.0', focus: 'm.0' },
        { say: 'The average speed is ninety kilometres per hour. We say average, because a bus speeds up and slows down. Ninety kilometres per hour is the steady speed that covers the same distance in the same time.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Dividing to find a unit rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Finding a unit rate', md: 'Divide by the number of units of the second quantity.' },
        { kind: 'text', id: 'a', size: 'lg', align: 'center', md: '\\$7.20 for $3$ kg: $\\quad 7.20 \\div 3 = 2.40$, so \\$2.40 per kilogram' },
      ],
      lines: [
        { say: 'To find a unit rate, divide by the number of units of the second quantity.', show: 'key' },
        { say: 'Try the apples. Seven dollars and twenty cents for three kilograms. Divide by three: seven point two divided by three is two point four.', show: 'a', focus: 'a' },
        { say: 'So the apples cost two dollars and forty cents per kilogram. That is the cost of one kilogram.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping the units', md: '“$90$” is not a speed. “$90$ km/h” is. Always write the units of a rate.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. If someone says their speed was ninety, you cannot tell what they mean.', show: 'oops' },
        { say: 'Ninety kilometres per hour? Ninety metres per minute? Those are very different speeds!' },
        { say: 'So always write the units of a rate. The units are part of the answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A printer prints $96$ pages in $4$ minutes. What is its unit rate?',
          choices: ['$24$ pages per minute', '$384$ pages per minute', '$24$', '$92$ pages per minute'],
          answer: 0,
          working: 'Divide by the number of minutes: $96 \\div 4 = 24$, so the printer prints $24$ pages per minute.',
        },
      ],
      lines: [
        { say: 'Your turn. A printer prints ninety-six pages in four minutes. What is its unit rate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twenty-four pages per minute. Divide by the number of minutes: ninety-six divided by four is twenty-four. Choice C has the right number, but it drops the units, so it does not say what is being counted.', show: 'q.answer' },
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
            'A **rate** compares quantities with different units, like km and h. It always keeps its units.',
            'A **unit rate** is the amount for **one** unit: $90$ km/h.',
            'To find a unit rate, divide by the number of units: $180 \\div 2 = 90$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rate compares quantities with different units, so it always keeps its units.', show: 'sum.0' },
        { say: 'A unit rate is the amount for one unit, such as ninety kilometres per hour.', show: 'sum.1' },
        { say: 'And to find a unit rate, divide by the number of units. In the next part, you will find a unit rate by scaling up. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
