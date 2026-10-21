import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { levelBlocks } from './lib/m7-10-figures.ts';

// Kai's team's goals in five games: 3, 5, 2, 4 and 6, a total of 20, levelled out to 4 each.
const GOALS = [3, 5, 2, 4, 6];
const towers = (id: string) => figure(id, [levelBlocks({ values: GOALS, mean: 4 })], 520);
const allTowers = (id: string) => GOALS.flatMap((v, i) => [`${id}.col${i}`, ...(v > 4 ? [`${id}.ex${i}`] : []), `${id}.n${i}`]);
const extras = (id: string) => [1, 4].map((i) => `${id}.ex${i}`);
const fills = (id: string) => [0, 2].map((i) => `${id}.fill${i}`);

// Priya's points in six games.
const POINTS = [14, 18, 11, 16, 20, 13];
const points = (id: string) => figure(id, [chips({ values: POINTS, gap: 1.6, r: 0.62, tone: 'adj' })], 230);

const video: Explainer = {
  id: 'm7-10-1',
  lessonId: 'm7-10-1',
  title: 'Mean, Median, Mode and Range, Part 1: The Mean',
  thumbnailTitle: 'The Mean',
  thumbnail: 'lv',
  summary:
    'A measure of central tendency is one number that describes the centre, or a typical value, of a data set. The mean is the sum of the values divided by the number of values: what each value would be if the total were shared out equally. Goals of 3, 5, 2, 4 and 6 add to 20, and 20 ÷ 5 = 4. Points of 14, 18, 11, 16, 20 and 13 add to 92, and 92 ÷ 6 ≈ 15.3. Always divide by how many values there are.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 1', title: 'The Mean', subtitle: 'Sharing the total equally' }],
      lines: [
        { say: 'A hockey team scores three goals one game, five the next, and two the next. How many goals does it score in a typical game?', show: 'title' },
        { say: 'In statistics, a few special numbers each sum up a whole set of data in one value. In this video, you will meet the first one: the mean.' },
      ],
    },
    {
      chapter: 'Central tendency',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Measure of central tendency',
          md: 'A **measure of central tendency** is one number that describes the centre, or a **typical value**, of a data set. The **mean**, the **median** and the **mode** are measures of central tendency.',
        },
      ],
      lines: [
        { say: 'A data set is a list of values, like the goals a team scored in each game.', show: 'def' },
        { say: 'A measure of central tendency is one number that describes the centre of a data set. It tells you a typical value.' },
        { say: 'There are three of them: the mean, the median and the mode. This part is about the mean.' },
      ],
    },
    {
      chapter: 'Levelling out',
      layout: 'split',
      leftWidth: 760,
      left: [towers('lv')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Goals in five games: $3,\\ 5,\\ 2,\\ 4,\\ 6$. Move blocks from the tall towers to the short ones until every tower is the **same height**.' }],
      lines: [
        { say: 'Sam’s hockey team scored three, five, two, four and six goals in five games. Here is each game as a tower of blocks, one block for each goal.', show: [...allTowers('lv'), 't'] },
        { say: 'What if the goals were shared out equally, so every game had the same number? Move blocks from the tall towers to the short ones.', focus: extras('lv') },
        { say: 'Take one block from the five, and put it on the three. Take two blocks from the six, and put them on the two.', hide: extras('lv'), show: fills('lv'), focus: fills('lv') },
        { say: 'Now every tower is four blocks tall. Four is the mean. The mean is what each value would be if the total were shared out equally.', show: 'lv.mean', focus: 'lv.mean' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'split',
      leftWidth: 600,
      left: [towers('rl')],
      right: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Mean', md: 'mean $=$ sum of the values $\\div$ number of values' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 5 + 2 + 4 + 6 = 20', '20 \\div 5 = 4', '\\text{mean} = 4 \\text{ goals}'] },
      ],
      lines: [
        { say: 'Moving blocks works, but there is a faster way. The mean is the sum of the values, divided by the number of values.', show: [...allTowers('rl'), 'def'] },
        { say: 'First add the values: three plus five plus two plus four plus six is twenty. That is the total number of blocks.', show: 'm.0', focus: 'm.0' },
        { say: 'There are five values, so share the twenty among five games. Twenty divided by five is four.', show: 'm.1', focus: 'm.1' },
        { say: 'The mean is four goals per game, the same as when we levelled the towers.', show: ['m.2', 'rl.mean'], focus: ['m.2', 'rl.mean'] },
      ],
    },
    {
      chapter: 'Rounding the mean',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Priya’s points in six basketball games. Find the mean to the nearest tenth.' },
        points('pt'),
        { kind: 'math', id: 'm', size: 'md', lines: ['14 + 18 + 11 + 16 + 20 + 13 = 92', '92 \\div 6 = 15.33\\ldots', '\\text{mean} \\approx 15.3 \\text{ points}'] },
      ],
      lines: [
        { say: 'Priya scored fourteen, eighteen, eleven, sixteen, twenty and thirteen points in six basketball games. Find the mean, to the nearest tenth.', show: ['q', 'pt'] },
        { say: 'Add the values. Fourteen plus eighteen plus eleven plus sixteen plus twenty plus thirteen is ninety-two.', show: 'm.0', focus: 'm.0' },
        { say: 'There are six values, so divide by six. Ninety-two divided by six is fifteen point three three, and the digit three keeps on repeating.', show: 'm.1', focus: 'm.1' },
        { say: 'To the nearest tenth, that is fifteen point three points. The mean does not have to be a whole number, or even one of the values.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong number', md: 'Divide by **how many values** there are, not by the greatest value or by $10$. Count the values before you divide.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{92 \\div 10 = 9.2} \\quad \\text{wrong}', '\\good{92 \\div 6 \\approx 15.3} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. Divide by how many values there are. Do not divide by the greatest value, or by ten out of habit.', show: 'oops' },
        { say: 'For Priya, ninety-two divided by ten is nine point two. That is less than every one of her scores, so it cannot be a typical value!', show: 'm.0', focus: 'm.0' },
        { say: 'There are six games, so divide by six. Count the values before you divide. And check that the mean sits somewhere between the least and the greatest values.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lena’s quiz scores were $7$, $9$, $6$, $10$ and $8$. What is the mean?',
          choices: ['$10$', '$8$', '$4$', '$40$'],
          answer: 1,
          working: 'Sum: $7 + 9 + 6 + 10 + 8 = 40$. There are $5$ scores: $40 \\div 5 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Lena’s quiz scores were seven, nine, six, ten and eight. What is the mean? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: eight. The scores add to forty, and there are five scores, so forty divided by five is eight. Choice C divides by ten instead of by five, the number of scores.', show: 'q.answer' },
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
          items: ['The mean, median and mode are measures of central tendency: each gives a typical value.', 'The mean is the sum of the values divided by the number of values.', 'It is what each value would be if the total were shared out equally.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean, the median and the mode are measures of central tendency. Each one gives a typical value.', show: 'sum.0' },
        { say: 'The mean is the sum of the values, divided by the number of values.', show: 'sum.1' },
        { say: 'It is what each value would be if the total were shared out equally. In the next part, you will find the middle value of a data set: the median. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
