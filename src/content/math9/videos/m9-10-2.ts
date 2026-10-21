import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, picks } from './lib/m9-10-figures.ts';

// The students of a school as 48 dots, 12 to a row, and a sample of 8 of them (yellow rings),
// spread over the whole school.
const SAMPLE = [2, 9, 13, 19, 28, 31, 40, 46];
const school = (id: string) =>
  figure(id, [join(crowd({ count: 48, cols: 12, groups: [{ id: 'pop', tone: 'adj' }] }), picks({ id: 'sample', which: SAMPLE, cols: 12, tone: 'theta' }), picks({ id: 'all', which: Array.from({ length: 48 }, (_, i) => i), cols: 12, tone: 'good' }))], 400);

const video: Explainer = {
  id: 'm9-10-2',
  lessonId: 'm9-10-2',
  title: 'Populations and Samples, Part 1: Population, Census and Sample',
  thumbnailTitle: 'Population or Sample?',
  thumbnail: 'pp',
  summary:
    'The population is the whole group you want to learn about. A census collects data from every member of the population; a sample collects data from part of it. Use a census when the population is small and easy to reach, or when you need information about every member, such as the shoe sizes of the 12 players on a team. Use a sample when the population is too large to reach in a reasonable time and at a reasonable cost, or when testing destroys the item, such as finding how long light bulbs last.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 1', title: 'Population, Census and Sample', subtitle: 'Ask everyone, or ask some?' }],
      lines: [
        { say: 'To find out what all the teenagers in a country think, you cannot ask every one of them. Instead, you ask a smaller group, and use their answers to learn about everyone.', show: 'title' },
        { say: 'The trick is choosing that smaller group well. In this video, you will learn three key words: population, census and sample.' },
      ],
    },
    {
      chapter: 'Three key words',
      layout: 'split',
      leftWidth: 600,
      left: [school('sc')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **population** is the whole group you want to learn about.',
            'A **census** collects data from **every** member of the population.',
            'A **sample** is the **part** of the population you collect data from.',
          ],
        },
      ],
      lines: [
        { say: 'Picture a school. Each dot is one student. Suppose you want to know how the students at this school get to school.', show: 'sc.pop' },
        { say: 'The population is the whole group you want to learn about. Here, that is every student at the school.', show: 'b.0', focus: 'b.0' },
        { say: 'A census collects data from every member of the population. You would ask every single student, like this.', show: ['b.1', 'sc.all'], focus: ['b.1', 'sc.all'] },
        { say: 'A sample is the part of the population that you actually collect data from. Here, eight students are chosen, and only they are asked.', show: ['b.2', 'sc.sample'], hide: 'sc.all', focus: ['b.2', 'sc.sample'] },
        { say: 'You then use the sample’s answers to make a good estimate about the whole population.' },
      ],
    },
    {
      chapter: 'Which one to use',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'census', tone: 'key', title: 'Use the whole population (a census) when', md: 'the population is **small** and easy to reach, or you need information about **every single** member.' },
        { kind: 'callout', id: 'sample', tone: 'tip', title: 'Use a sample when', md: 'the population is too **large** to reach in a reasonable time and at a reasonable cost, or testing an item **destroys** it.' },
      ],
      lines: [
        { say: 'So when should you ask everyone, and when should you ask only some?', show: 'census' },
        { say: 'Use the whole population, a census, when the population is small and easy to reach, or when you need information about every single member.' },
        { say: 'Use a sample when the population is too large to reach in a reasonable time and at a reasonable cost.', show: 'sample' },
        { say: 'And use a sample when testing an item destroys it. You will see why in a moment.' },
      ],
    },
    {
      chapter: 'Census or sample?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Use'],
          rows: [
            ['(a) The shoe sizes of the $12$ players on a basketball team, to order team shoes', '**Population** (a census)'],
            ['(b) How long the light bulbs made in a factory last', '**Sample**'],
          ],
        },
      ],
      lines: [
        { say: 'Decide for each one. In the first situation, a coach needs the shoe sizes of the twelve players on a basketball team, to order team shoes.', show: 't.0' },
        { say: 'The team is small, and every player needs shoes that fit. A sample would leave some players without the right size. So use the whole population: a census.', focus: 't.0' },
        { say: 'In the second situation, a factory wants to know how long its light bulbs last.', show: 't.1' },
        { say: 'To test a bulb, you leave it on until it burns out, and then it is useless. If every bulb were tested, there would be none left to sell! So test a sample.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which situation calls for a **sample** rather than a census?',
          choices: [
            'Finding the heights of the $8$ students in a small art club',
            'Recording the birthday of every player on a team of $15$',
            'Testing how much weight boxes from a factory can hold before they break',
            'Checking that each of the $25$ students going on a class trip has a signed form',
          ],
          answer: 2,
          working: 'Testing a box until it breaks destroys it, so only a sample of boxes can be tested. The other groups are small, and each one needs information about every member.',
        },
      ],
      lines: [
        { say: 'Your turn. Which situation calls for a sample, rather than a census? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C. Testing a box until it breaks destroys it, so only a sample can be tested. Choice D needs a census, because every single student on the trip must have a signed form.', show: 'q.answer' },
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
            '**Population:** the whole group. **Census:** data from everyone. **Sample:** data from part of the group.',
            'Use a census for a small group, or when every member matters.',
            'Use a sample for a huge group, or when testing destroys the items.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The population is the whole group. A census collects data from everyone in it, and a sample collects data from part of it.', show: 'sum.0' },
        { say: 'Use a census for a small group, or when every member matters.', show: 'sum.1' },
        { say: 'And use a sample for a huge group, or when testing destroys the items. In the next part, you will learn four ways to choose a sample. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
