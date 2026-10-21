import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { dotGroups } from './lib/m6-4-figures.ts';

// 12 dots in 4 equal groups of 3; one group is taken.
const twelve = (id: string) => figure(id, [dotGroups({ groups: 4, size: 3, cols: 3, perRow: 1, tones: ['good', 'muted', 'muted', 'muted'] })]);

// 20 dots in 4 equal groups of 5; three groups are taken.
const twenty = (id: string) => figure(id, [dotGroups({ groups: 4, size: 5, cols: 5, perRow: 1, tones: ['good', 'good', 'good', 'muted'] })]);

// Fifteen quarters packed into bars: three whole bars and three quarters of a fourth.
const fifteen = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 4, shaded: 4, tone: 'opp', at: [0, 4.5], width: 6, label: '1' }),
    bar({ name: 'b', parts: 4, shaded: 4, tone: 'opp', at: [0, 3], width: 6, label: '1' }),
    bar({ name: 'c', parts: 4, shaded: 4, tone: 'opp', at: [0, 1.5], width: 6, label: '1' }),
    bar({ name: 'd', parts: 4, shaded: 3, tone: 'opp', at: [0, 0], width: 6, label: '\\dfrac34' }),
  ]);

const video: Explainer = {
  id: 'm6-4-3-b',
  lessonId: 'm6-4-3',
  title: 'Multiplying Fractions and Natural Numbers, Part 2: A Fraction of a Quantity',
  thumbnailTitle: 'A Fraction of a Quantity',
  thumbnail: 'tw',
  summary:
    'Multiplying by a unit fraction is dividing by its denominator: 12 × 1/4 = 12/4 = 3. A fraction times a number is a fraction of that quantity: 3/4 × 20 means 3/4 of 20, so split 20 into 4 groups of 5 and take 3 groups, 15 (or 3 × 20 / 4 = 60/4 = 15). When it does not divide evenly, 5 × 3/4 = 15/4 = 3 3/4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 2', title: 'A Fraction of a Quantity', subtitle: 'Unit fractions and “of”' }],
      lines: [
        { say: 'What is three quarters of twenty? Questions like this ask for a fraction of a quantity, and they are multiplications too.', show: 'title' },
        { say: 'In this part, you will multiply by a unit fraction, and find a fraction of a quantity.' },
      ],
    },
    {
      chapter: 'Unit fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit fraction', md: 'A **unit fraction** has a numerator of $1$, such as $\\dfrac{1}{2}$, $\\dfrac{1}{4}$ or $\\dfrac{1}{10}$.' },
      ],
      lines: [
        { say: 'First, a new word. A unit fraction has a numerator of one, such as one half, one quarter or one tenth.', show: 'def' },
        { say: 'A unit fraction is one piece of a whole. One quarter is one of four equal pieces.' },
      ],
    },
    {
      chapter: 'A quarter of twelve',
      layout: 'split',
      leftWidth: 420,
      left: [twelve('tw12')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $12 \\times \\dfrac{1}{4}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 \\times \\dfrac{1}{4} = \\dfrac{12 \\times 1}{4} = \\dfrac{12}{4}', '\\dfrac{12}{4} = 12 \\div 4 = 3'] },
      ],
      lines: [
        { say: 'Find twelve times one quarter.', show: 't' },
        { say: 'Use the shortcut. Twelve times one is twelve, and the denominator stays four. So that is twelve quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'And a fraction is a division! Twelve quarters means twelve divided by four, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Look at the dots. Twelve dots split into four equal groups gives three dots in each group. One quarter of twelve is one group: three.', show: ['tw12.g0', 'tw12.g1', 'tw12.g2', 'tw12.g3'], focus: 'tw12.g0' },
        { say: 'So multiplying by a unit fraction is the same as dividing by its denominator. Times one quarter means divide by four.' },
      ],
    },
    {
      chapter: 'Three quarters of twenty',
      layout: 'split',
      leftWidth: 420,
      left: [twenty('tw')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{3}{4} \\times 20$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3}{4} \\times 20 = \\dfrac34 \\text{ of } 20', '\\text{one group: } 20 \\div 4 = 5', '\\text{three groups: } 3 \\times 5 = 15'] },
      ],
      lines: [
        { say: 'Now find three quarters times twenty. A fraction times a number means that fraction of the number. So this is three quarters of twenty.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'Split twenty into four equal groups. Each group has twenty divided by four, which is five dots.', show: ['tw.g0', 'tw.g1', 'tw.g2', 'tw.g3', 'm.1'], focus: 'm.1' },
        { say: 'Three quarters means three of the four groups. Three times five is fifteen.', show: 'm.2', focus: ['tw.g0', 'tw.g1', 'tw.g2', 'm.2'] },
        { say: 'So three quarters of twenty is fifteen.' },
      ],
    },
    {
      chapter: 'Using the rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{3}{4} \\times 20 = \\dfrac{3 \\times 20}{4} = \\dfrac{60}{4}', '\\dfrac{60}{4} = 60 \\div 4 = 15'] },
      ],
      lines: [
        { say: 'You can also use the rule. Multiply the numerator by twenty, and keep the denominator. Three times twenty is sixty, so that is sixty quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixty quarters means sixty divided by four, which is fifteen. The same answer!', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing first, as with the dots, often keeps the numbers small. Both ways give the same answer.' },
      ],
    },
    {
      chapter: 'When it does not divide evenly',
      layout: 'split',
      leftWidth: 440,
      left: [fifteen('ff')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $5 \\times \\dfrac{3}{4}$. Write the answer as a mixed number.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 \\times \\dfrac34 = \\dfrac{5 \\times 3}{4} = \\dfrac{15}{4}', '15 \\div 4 = 3 \\text{ R } 3', '\\dfrac{15}{4} = 3\\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'Sometimes the answer is not a whole number. Find five times three quarters, and write it as a mixed number.', show: 't' },
        { say: 'Multiply the numerator by five: five times three is fifteen. That is fifteen quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen divided by four is three, remainder three. Four quarters fill a whole bar, so fifteen quarters fill three whole bars, with three quarters left over.', show: ['ff.a-frame', 'ff.a-shade', 'ff.a-label', 'ff.b-frame', 'ff.b-shade', 'ff.b-label', 'ff.c-frame', 'ff.c-shade', 'ff.c-label', 'ff.d-frame', 'ff.d-shade', 'ff.d-label', 'm.1'], focus: 'm.1' },
        { say: 'So five times three quarters is three and three quarters.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is $\\dfrac{2}{3}$ of $18$?',
          choices: ['$6$', '$27$', '$12$', '$9$'],
          answer: 2,
          working: 'One third of $18$ is $18 \\div 3 = 6$, so two thirds is $2 \\times 6 = 12$. Or: $\\tfrac{2 \\times 18}{3} = \\tfrac{36}{3} = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is two thirds of eighteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twelve. Split eighteen into three equal groups of six, and take two of the groups: two times six is twelve. Choice A, six, is only one third of eighteen.', show: 'q.answer' },
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
            'A **unit fraction** has a numerator of $1$. Multiplying by it is dividing by its denominator: $12 \\times \\dfrac14 = 3$.',
            'A fraction times a number means that fraction **of** the number.',
            'Divide into equal groups, then take some groups: $20 \\div 4 = 5$, and $3 \\times 5 = 15$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A unit fraction has a numerator of one, and multiplying by it is the same as dividing by its denominator.', show: 'sum.0' },
        { say: 'A fraction times a number is that fraction of the number.', show: 'sum.1' },
        { say: 'To find it, divide into equal groups, then take some of the groups. In the next part, you will see when multiplying makes a number bigger or smaller, and solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
