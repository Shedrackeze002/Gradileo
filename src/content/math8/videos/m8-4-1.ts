import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { tape } from './lib/m8-3-figures.ts';

// The team: 12 players in 3 equal groups of 4.
const team = (id: string) => figure(id, [dotGroups({ groups: 3, size: 4, cols: 2, tone: 'adj', labels: ['4', '4', '4'] })], 230);

// The trail: 20 km in 4 quarters of 5 km, 3 of them ridden.
const trail = (id: string) =>
  figure(
    id,
    [
      tape({
        unit: 2.4,
        total: '20\\ \\text{km}',
        parts: [
          { id: 'a', count: 3, tone: 'good', name: '\\tfrac34 \\text{ ridden}', value: '5' },
          { id: 'b', count: 1, tone: 'muted', name: '\\text{left}', value: '5' },
        ],
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm8-4-1',
  lessonId: 'm8-4-1',
  title: 'Multiplying Fractions, Part 1: A Fraction of a Whole Number',
  thumbnailTitle: 'A Fraction of a Whole Number',
  thumbnail: 'tm',
  summary:
    'The word “of” often means multiply: 2/3 of 12 means 2/3 × 12. Split 12 into 3 equal groups of 4 to find 1/3 of 12, then take 2 of those groups: 2/3 of 12 is 8. Or multiply the whole number by the numerator and divide by the denominator: (2 × 12)/3 = 24/3 = 8. In the same way, 3/4 of a 20 km trail is 15 km. A fraction less than 1 of a number is less than the number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 1', title: 'A Fraction of a Whole Number', subtitle: 'When “of” means multiply' }],
      lines: [
        { say: 'A pan of brownies is three quarters full. Owen eats one half of what is left. What fraction of the whole pan does Owen eat? To answer questions like this, you multiply fractions.', show: 'title' },
        { say: 'You will answer the brownie question later in this lesson. In this part, you will start with something simpler: a fraction of a whole number.' },
      ],
    },
    {
      chapter: 'Of means multiply',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: '“Of” means multiply', md: 'The word **of** often means multiply. $\\dfrac{2}{3}$ of $12$ means $\\dfrac{2}{3} \\times 12$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\text{ groups of } 4 = 3 \\times 4', '\\dfrac{2}{3} \\text{ of } 12 = \\dfrac{2}{3} \\times 12'] },
      ],
      lines: [
        { say: 'In maths, the word of often means multiply. Think of three groups of four. That means three times four.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'A fraction of a number works the same way. Two thirds of twelve means two thirds times twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two thirds of the team',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A soccer team has $12$ players. $\\dfrac{2}{3}$ of them ride the bus to games. How many players is that?' },
        team('tm'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{3} \\text{ of } 12 = 12 \\div 3 = 4', '\\dfrac{2}{3} \\text{ of } 12 = 2 \\times 4 = 8'] },
      ],
      lines: [
        { say: 'A soccer team has twelve players. Two thirds of them ride the bus to games. How many players is that?', show: 'q' },
        { say: 'Here are the twelve players. Each dot is one player.', show: ['tm.g0', 'tm.g1', 'tm.g2'] },
        { say: 'The denominator, three, says to split the team into three equal groups. Twelve divided by three is four, so each group has four players. One group is one third of twelve.', show: ['tm.labels', 'm.0'], focus: 'm.0' },
        { say: 'The numerator, two, says to take two of those groups. Two groups of four is eight.', show: 'm.1', focus: ['m.1', 'tm.g0', 'tm.g1'] },
        { say: 'So two thirds of twelve is eight. Eight players ride the bus to games.' },
      ],
    },
    {
      chapter: 'Another way',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{3} \\times 12 = \\dfrac{2 \\times 12}{3}', '= \\dfrac{24}{3}', '= 24 \\div 3 = 8'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Either order', md: 'Divide by the denominator, then multiply by the numerator, or multiply first, then divide. Dividing first keeps the numbers small.' },
      ],
      lines: [
        { say: 'Here is another way. Multiply the whole number by the numerator, and keep the denominator. Two times twelve is twenty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'So two thirds of twelve is twenty-four thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'Three thirds make one whole. So twenty-four thirds is twenty-four divided by three, which is eight wholes. It is the same answer!', show: 'm.2', focus: 'm.2' },
        { say: 'You can divide first and then multiply, or multiply first and then divide. Dividing first keeps the numbers small.', show: 'tip' },
      ],
    },
    {
      chapter: 'Three quarters of a trail',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A bike trail is $20$ km long. A cyclist has ridden $\\dfrac{3}{4}$ of it. How far is that?' },
        trail('tr'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 \\div 4 = 5 \\qquad 3 \\times 5 = 15', '\\dfrac{3}{4} \\times 20 = 15 \\text{ km}'] },
      ],
      lines: [
        { say: 'Let’s try another. A bike trail is twenty kilometres long. A cyclist has ridden three quarters of it. How far is that?', show: 'q' },
        { say: 'Three quarters of twenty means three quarters times twenty. Draw the trail as a bar, twenty kilometres long, cut into four equal quarters.', show: ['tr.a', 'tr.b', 'tr.total'] },
        { say: 'Twenty divided by four is five, so each quarter is five kilometres.', show: ['tr.a-v', 'tr.b-v'] },
        { say: 'Three quarters is three of those parts. Three times five is fifteen. The cyclist has ridden fifteen kilometres.', show: 'm.0', focus: ['m.0', 'tr.a'] },
        { say: 'So three quarters times twenty is fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Smaller than the whole', md: 'A fraction less than $1$ of a number is **less** than the number: $\\dfrac{2}{3}$ of $12$ is $8$, and $8 < 12$.' },
      ],
      lines: [
        { say: 'Does the answer make sense? Two thirds is less than one whole, so two thirds of twelve should be less than twelve. Eight is less than twelve, so it makes sense.', show: 'tip' },
        { say: 'Multiplying by a fraction less than one gives an answer smaller than the number you started with. That is a quick way to catch a mistake.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is $\\dfrac{3}{5}$ of $30$?',
          choices: ['$6$', '$18$', '$50$', '$90$'],
          answer: 1,
          working: 'One fifth of $30$ is $30 \\div 5 = 6$. Three fifths is $3 \\times 6 = 18$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is three fifths of thirty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighteen. Thirty divided by five is six, so one fifth of thirty is six. Three fifths is three times six, which is eighteen. Choice A, six, is one fifth of thirty. It is only the first step.', show: 'q.answer' },
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
            '**Of** often means multiply: $\\dfrac{2}{3}$ of $12$ is $\\dfrac{2}{3} \\times 12$.',
            'Divide by the denominator, then multiply by the numerator: $12 \\div 3 = 4$, and $2 \\times 4 = 8$.',
            'Or multiply first: $\\dfrac{2 \\times 12}{3} = \\dfrac{24}{3} = 8$.',
            'A fraction less than $1$ of a number is less than the number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The word of often means multiply.', show: 'sum.0' },
        { say: 'To find a fraction of a whole number, divide by the denominator, then multiply by the numerator.', show: 'sum.1' },
        { say: 'Or multiply by the numerator first, then divide.', show: 'sum.2' },
        { say: 'And a fraction less than one of a number is less than the number. In the next part, you will multiply a fraction by a fraction, using an area model. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
