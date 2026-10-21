import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { circleGraph } from '@/video/charts.ts';
import { SPORTS } from './lib/m7-10-figures.ts';

// The favourite sports of 200 students.
const graph = (id: string) => figure(id, [circleGraph({ slices: SPORTS, percent: true })], 520);
const sectors = (id: string) => SPORTS.map((_, i) => `${id}.s${i}`);

const video: Explainer = {
  id: 'm7-10-3',
  lessonId: 'm7-10-3',
  title: 'Circle Graphs, Part 1: Reading a Circle Graph',
  thumbnailTitle: 'Reading a Circle Graph',
  thumbnail: 'cg',
  summary:
    'A circle graph shows how a whole is split into parts: the whole circle is 100% of the data, and each part is a sector. To find how many are in a sector, multiply its percent by the total: if 35% of 200 students chose hockey, 0.35 × 200 = 70 students did. To compare two sectors, subtract their percents first: soccer (25%) and swimming (5%) differ by 20%, and 0.20 × 200 = 40 students.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 1', title: 'Reading a Circle Graph', subtitle: 'Parts of one whole' }],
      lines: [
        { say: 'How do the students in a school get to class? How did a class spend its fundraiser money? When a whole is split into parts, a circle graph shows each part as a slice of a circle.', show: 'title' },
        { say: 'In this video, you will read a circle graph, and work out how many are in each part.' },
      ],
    },
    {
      chapter: 'Circle graphs',
      layout: 'split',
      leftWidth: 640,
      left: [graph('cg')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Circle graph',
          md: 'A **circle graph** shows how a whole is split into parts. The whole circle is $100\\%$ of the data. Each part is a **sector**, a slice of the circle.',
        },
      ],
      lines: [
        { say: 'This circle graph shows the favourite sports of two hundred students at a school.', show: sectors('cg') },
        { say: 'A circle graph shows how a whole is split into parts. The whole circle is one hundred percent of the data: all two hundred students.', show: 'def' },
        { say: 'Each part is called a sector. A sector is a slice of the circle. The biggest sector is hockey, at thirty-five percent.', focus: 'cg.s0' },
        { say: 'Each sector is labelled with its sport and its percent. Some circle graphs use a legend instead: a key that tells what each colour means, and often gives its percent.', focus: 'cg' },
      ],
    },
    {
      chapter: 'How many chose hockey?',
      layout: 'split',
      leftWidth: 640,
      left: [graph('hk')],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Number in a sector', md: '$\\text{number} = \\text{percent} \\times \\text{total}$' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['35\\% = 0.35', '0.35 \\times 200 = 70'] },
      ],
      lines: [
        { say: 'How many of the two hundred students chose hockey?', show: sectors('hk'), focus: 'hk.s0' },
        { say: 'To find how many are in a sector, find its percent of the total. The number is the percent times the total.', show: 'key' },
        { say: 'Hockey is thirty-five percent. Percent means out of one hundred, so thirty-five percent is the decimal zero point three five.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point three five times two hundred is seventy. So seventy students chose hockey.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How many more?',
      layout: 'split',
      leftWidth: 640,
      left: [graph('hm')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many more students chose soccer than swimming?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25\\% - 5\\% = 20\\%', '0.20 \\times 200 = 40'] },
      ],
      lines: [
        { say: 'How many more students chose soccer than swimming?', show: [...sectors('hm'), 'q'], focus: ['hm.s1', 'hm.s4'] },
        { say: 'Soccer is twenty-five percent and swimming is five percent. Subtract the percents first: twenty-five percent minus five percent is twenty percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Then find twenty percent of two hundred. Zero point two zero times two hundred is forty. So forty more students chose soccer than swimming.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Every sector',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Sport', 'Percent', 'Number of students'],
          rows: [
            ['Hockey', '$35\\%$', '$0.35 \\times 200 = 70$'],
            ['Soccer', '$25\\%$', '$0.25 \\times 200 = 50$'],
            ['Basketball', '$20\\%$', '$0.20 \\times 200 = 40$'],
            ['Volleyball', '$15\\%$', '$0.15 \\times 200 = 30$'],
            ['Swimming', '$5\\%$', '$0.05 \\times 200 = 10$'],
            ['**Total**', '$100\\%$', '$200$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is every sector worked out the same way. Hockey is seventy students, and soccer is fifty. You can check the soccer and swimming answer: fifty minus ten is forty.', show: ['t.0', 't.1'] },
        { say: 'Basketball is forty students, volleyball is thirty, and swimming is ten.', show: ['t.2', 't.3', 't.4'] },
        { say: 'Check: the percents add to one hundred percent, and the numbers add to two hundred, all the students. The sectors always make one whole.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a circle graph of $200$ students, the volleyball sector is $15\\%$. How many students chose volleyball?',
          choices: ['$15$', '$3{,}000$', '$30$', '$185$'],
          answer: 2,
          working: '$15\\% = 0.15$, and $0.15 \\times 200 = 30$ students.',
        },
      ],
      lines: [
        { say: 'Your turn. In a circle graph of two hundred students, the volleyball sector is fifteen percent. How many students chose volleyball? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C: thirty. Fifteen percent is zero point one five, and zero point one five times two hundred is thirty. Choice B multiplies fifteen by two hundred without changing the percent to a decimal.', show: 'q.answer' },
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
          items: ['A circle graph shows parts of one whole. The whole circle is $100\\%$.', 'Each part is a sector.', 'Number in a sector $=$ percent $\\times$ total.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A circle graph shows the parts of one whole. The whole circle is one hundred percent.', show: 'sum.0' },
        { say: 'Each part is a sector, a slice of the circle.', show: 'sum.1' },
        { say: 'And the number in a sector is its percent times the total. In the next part, you will work backward, from one sector to the total. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
