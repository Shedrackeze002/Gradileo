import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';

// Talia's random sample of 40 students: 14 bus, 12 car, 9 walk, 5 bike (14 + 12 + 9 + 5 = 40).
const MODES = ['Bus', 'Car', 'Walk', 'Bike'];
const travel = (id: string, height?: number) => figure(id, [barGraph({ categories: MODES, values: [14, 12, 9, 5], max: 16, step: 2, height: 4.5, titles: { y: 'Students' } })], height);
const BARS = (id: string) => [`${id}.scale`, ...MODES.map((_, i) => `${id}.b${i}`), ...MODES.map((_, i) => `${id}.v${i}`)];

const video: Explainer = {
  id: 'm9-10-3-d',
  lessonId: 'm9-10-3',
  title: 'Developing a Project Plan, Part 4: Displaying Data and Drawing Conclusions',
  thumbnailTitle: 'Drawing Conclusions',
  thumbnail: 'bg',
  summary:
    'Choose a display that suits the data: a bar graph to compare categories, a line graph for change over time, a circle graph for parts of a whole. Talia surveyed a random sample of 40 of the 600 students at her school: 14 take the bus, which is 14/40 = 35%, so about 0.35 × 600 = 210 students at the school probably take the bus. A sample gives an estimate, not an exact count, and it describes only the population it came from, so use "about" and "probably".',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 4', title: 'Displaying Data and Drawing Conclusions', subtitle: 'Say what the data shows, and no more' }],
      lines: [
        { say: 'You have collected your data. Now it is time to show it clearly, and to use it to answer your question.', show: 'title' },
        { say: 'In this video, you will choose a display, make a prediction from a sample, and learn how to state a conclusion that is fair.' },
      ],
    },
    {
      chapter: 'Choosing a display',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Display', 'Use it for'],
          rows: [
            ['Bar graph', 'comparing categories'],
            ['Line graph', 'change over time'],
            ['Circle graph', 'parts of one whole'],
          ],
        },
      ],
      lines: [
        { say: 'Choose a display that suits the data. A bar graph compares categories, such as the ways students travel to school.', show: 't.0', focus: 't.0' },
        { say: 'A line graph shows change over time, such as the temperature during a day.', show: 't.1', focus: 't.1' },
        { say: 'And a circle graph shows how one whole is split into parts, such as how a budget is spent.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Talia’s survey',
      layout: 'split',
      leftWidth: 560,
      left: [travel('bg')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Talia surveyed a **random sample of $40$** of the $600$ students at her school about how they travel to school. Predict how many students **at the school** take the bus.' }],
      lines: [
        { say: 'Talia surveyed a random sample of forty of the six hundred students at her school, about how they travel to school.', show: 'q' },
        { say: 'Her data is in categories, so a bar graph suits it. Fourteen take the bus, twelve come by car, nine walk, and five ride a bike. That adds up to forty.', show: BARS('bg') },
        { say: 'Now, how many students at the whole school take the bus? Talia only asked forty of them, so Talia has to predict.', focus: 'bg.b0' },
      ],
    },
    {
      chapter: 'From sample to school',
      layout: 'split',
      leftWidth: 560,
      left: [travel('pr')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{14}{40} = 0.35 = 35\\%', '0.35 \\times 600 = 210'] }],
      lines: [
        { say: 'First, find the bus riders’ share of the sample. Fourteen out of forty is zero point three five, or thirty-five percent.', show: [...BARS('pr'), 'm.0'], focus: ['m.0', 'pr.b0'] },
        { say: 'The sample was chosen at random, so it should look like a small copy of the school. So about thirty-five percent of the whole school should take the bus as well.' },
        { say: 'Thirty-five percent of six hundred is zero point three five times six hundred, which is two hundred ten. So about two hundred ten students at the school probably take the bus.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A fair conclusion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'good', tone: 'key', title: 'A fair conclusion', md: 'About $210$ students (about $35\\%$) at Talia’s school **probably** take the bus. The true number may be a little different.' },
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Claiming too much',
          md: 'Talia’s data does **not** tell you about all students in the country, and it does **not** prove that **exactly** $210$ students take the bus.',
        },
      ],
      lines: [
        { say: 'A fair conclusion says: about two hundred ten students, or about thirty-five percent, at Talia’s school probably take the bus. The true number may be a little different.', show: 'good' },
        { say: 'Notice the words about and probably. A sample gives an estimate, not an exact count. A different random sample of forty might have had thirteen or fifteen bus riders.' },
        { say: 'Watch out for claiming too much. Talia’s data does not tell you about all the students in the country. It came from one school, so it describes only that school.', show: 'oops' },
        { say: 'And it does not prove that exactly two hundred ten students take the bus. A conclusion should match the population that was sampled, and use careful words.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a random sample of $50$ of the $800$ students at a school, $12$ said they walk to school. Which conclusion is best?',
          choices: [
            'Exactly $192$ students at the school walk to school.',
            'About $24\\%$ of all students in the country walk to school.',
            'Only $12$ students at the school walk to school.',
            'About $192$ students at the school probably walk to school.',
          ],
          answer: 3,
          working: '$12 \\div 50 = 0.24 = 24\\%$, and $0.24 \\times 800 = 192$. The sample gives an estimate for this school only, so say “about” and “probably”.',
        },
      ],
      lines: [
        { say: 'Your turn. In a random sample of fifty of the eight hundred students at a school, twelve said they walk to school. Which conclusion is best? Pause the video and try it.', show: 'q', wait: 10 },
        { say: 'The answer is D. Twelve out of fifty is twenty-four percent, and twenty-four percent of eight hundred is one hundred ninety-two. Choice A claims an exact number, but a sample only gives an estimate.', show: 'q.answer' },
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
            'Bar graph: compare categories. Line graph: change over time. Circle graph: parts of a whole.',
            'To predict for the population, find the sample’s percent, then take that percent of the population.',
            'A sample gives an **estimate**: use “about” and “probably”.',
            'Draw conclusions only about the population you sampled.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a bar graph to compare categories, a line graph for change over time, and a circle graph for parts of a whole.', show: 'sum.0' },
        { say: 'To predict for the population, find the sample’s percent, then take that percent of the population.', show: 'sum.1' },
        { say: 'A sample gives an estimate, so use the words about and probably.', show: 'sum.2' },
        { say: 'And draw conclusions only about the population you sampled. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
