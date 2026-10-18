import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { probTree } from './lib/m302-3-figures.ts';

const red = { tone: 'bad' as const };
const blue = { tone: 'adj' as const };

const video: Explainer = {
  id: 'm302-3-4-b',
  lessonId: 'm302-3-4',
  title: 'Independent and Dependent Events, Part 2: Dependent Events',
  thumbnailTitle: 'Dependent Events',
  thumbnail: false,
  summary: 'Dependent events and conditional probability, P(A and B) = P(A) × P(B | A): two red marbles drawn without replacement from 5 red and 3 blue (5/8 × 4/7 = 5/14), a tree diagram of every case (20/56, 15/56, 15/56 and 6/56, which add to 1), and why 5/8 × 5/8 would be drawing with replacement. Part 3 reads conditional probabilities from a table.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Dependent Events', subtitle: '$P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$' }],
      lines: [
        { say: 'If you draw a marble from a bag and keep it, the next draw is from a different bag. Now the first event changes the probability of the second.', show: 'title' },
        { say: 'In this video, you will learn what dependent events and conditional probability are, find the probability that two marbles drawn without replacement are both red, and draw a tree diagram of every case.' },
      ],
    },
    {
      chapter: 'Dependent events',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dependent events and conditional probability', md: 'Two events are **dependent** if one happening changes the probability of the other. The **conditional probability** $P(B \\mid A)$ is the probability of $B$, given that $A$ has happened.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B \\mid A)'] },
      ],
      lines: [
        { say: 'Two events are dependent if one happening changes the probability of the other.', show: 'def' },
        { say: 'The probability of B, given that A has happened, is called a conditional probability. It is written P, B, a vertical bar, A, and read “P of B given A”.' },
        { say: 'For any two events, the probability that both happen is P of A, times P of B given A. For independent events, P of B given A is just P of B, so this is the rule from part one.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Without replacement',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('before', [marbles({ groups: [{ id: 'r', count: 5, tone: 'bad' }, { id: 'b', count: 3, tone: 'adj' }], perRow: 4 })], 220),
        figure('after', [marbles({ groups: [{ id: 'r', count: 4, tone: 'bad' }, { id: 'b', count: 3, tone: 'adj' }], perRow: 4 })], 220),
      ],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A bag holds 5 red and 3 blue marbles. Two marbles are drawn, one after the other, **without replacement**. What is the probability that both are red?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{1st red}) = \\dfrac{5}{8}', 'P(\\text{2nd red} \\mid \\text{1st red}) = \\dfrac{4}{7}', 'P(\\text{both red}) = \\dfrac{5}{8} \\times \\dfrac{4}{7}', '= \\dfrac{20}{56} = \\dfrac{5}{14}'] },
      ],
      lines: [
        { say: 'A bag holds five red and three blue marbles. Two marbles are drawn, one after the other, without replacement. What is the probability that both are red?', show: ['p', 'before'] },
        { say: 'For the first draw, five of the eight marbles are red. So P of first red is five eighths.', show: 'm.0', focus: ['m.0', 'before.r'] },
        { say: 'The red marble is not put back. Now there are seven marbles left, and only four of them are red.', show: 'after', focus: 'after' },
        { say: 'So the probability that the second marble is red, given that the first was red, is four sevenths.', show: 'm.1', focus: ['m.1', 'after.r'] },
        { say: 'Multiply: five eighths times four sevenths is twenty over fifty-six, which is five fourteenths.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'A tree diagram',
      layout: 'center',
      main: [
        figure('tr', [
          probTree({
            first: [{ name: '\\text{Red}', p: '\\dfrac{5}{8}', ...red }, { name: '\\text{Blue}', p: '\\dfrac{3}{8}', ...blue }],
            second: [
              [{ name: '\\text{Red}', p: '\\dfrac{4}{7}', ...red }, { name: '\\text{Blue}', p: '\\dfrac{3}{7}', ...blue }],
              [{ name: '\\text{Red}', p: '\\dfrac{5}{7}', ...red }, { name: '\\text{Blue}', p: '\\dfrac{2}{7}', ...blue }],
            ],
            gap: 2,
            groupGap: 0.8,
            ends: ['\\text{RR: } \\dfrac{20}{56}', '\\text{RB: } \\dfrac{15}{56}', '\\text{BR: } \\dfrac{15}{56}', '\\text{BB: } \\dfrac{6}{56}'],
          }),
        ], 460),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{20}{56} + \\dfrac{15}{56} + \\dfrac{15}{56} + \\dfrac{6}{56} = \\dfrac{56}{56} = 1'] },
      ],
      lines: [
        { say: 'A tree diagram shows every case. The first branches are the first draw: red, with probability five eighths, or blue, with probability three eighths.', show: ['tr.start', 'tr.s1'], focus: 'tr.s1' },
        { say: 'If the first marble was red, seven marbles are left: four red and three blue. So the next branches are four sevenths and three sevenths.', show: 'tr.s2-0', focus: 'tr.s2-0' },
        { say: 'If the first marble was blue, seven are left: five red and two blue. Those branches are five sevenths and two sevenths.', show: 'tr.s2-1', focus: 'tr.s2-1' },
        { say: 'Multiply along a path to find its probability. Red then red is five eighths times four sevenths: twenty over fifty-six.', show: 'tr.e0-0', focus: ['tr.b0', 'tr.b0-0', 'tr.e0-0'] },
        { say: 'Red then blue is fifteen over fifty-six, blue then red is also fifteen over fifty-six, and blue then blue is six over fifty-six.', show: ['tr.e0-1', 'tr.e1-0', 'tr.e1-1'], focus: ['tr.e0-1', 'tr.e1-0', 'tr.e1-1'] },
        { say: 'The four paths cover every case, so they add to one.', show: 'm', focus: 'm' },
        { say: 'The tree answers other questions too. One marble of each colour is red then blue, or blue then red. Those paths cannot both happen, so add them: thirty over fifty-six, which is fifteen twenty-eighths.', focus: ['tr.e0-1', 'tr.e1-0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to change the second draw', md: 'Without replacement, both the number of marbles and the number of that colour change. $\\dfrac{5}{8} \\times \\dfrac{5}{8} = \\dfrac{25}{64}$ is the answer **with** replacement.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{5}{8} \\times \\dfrac{5}{8} = \\dfrac{25}{64}} \\qquad \\good{\\dfrac{5}{8} \\times \\dfrac{4}{7} = \\dfrac{5}{14}}'] },
      ],
      lines: [
        { say: 'A common mistake is to use the same probability for the second draw.', show: 'oops' },
        { say: 'Without replacement, both numbers change: there is one marble fewer in the bag, and one fewer of the colour that was drawn. Five eighths times five eighths would be the answer with replacement.', show: 'm', focus: 'm' },
        { say: 'So before each draw, ask: how many items are left, and how many of them are the kind I want?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box holds 4 green and 6 yellow pens. Two pens are taken at random, without replacement. What is the probability that both are green?',
          choices: ['$\\dfrac{4}{25}$', '$\\dfrac{3}{10}$', '$\\dfrac{2}{15}$', '$\\dfrac{4}{15}$'],
          answer: 2,
          working: '$P(\\text{both green}) = \\dfrac{4}{10} \\times \\dfrac{3}{9} = \\dfrac{12}{90} = \\dfrac{2}{15}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box holds four green and six yellow pens. Two pens are taken at random, without replacement. What is the probability that both are green? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two fifteenths. The first pen is green with probability four tenths. Then nine pens are left, and three are green, so the second is green with probability three ninths. Four tenths times three ninths is twelve over ninety, or two fifteenths. Choice A is four tenths times four tenths: it forgets that the first pen was not put back.', show: 'q.answer' },
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
          items: ['Dependent events: one changes the probability of the other, as when drawing without replacement.', '$P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$', 'In a tree diagram, multiply along a path; the paths add to 1.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Events are dependent when one changes the probability of the other, as when you draw without replacement.', show: 'sum.0' },
        { say: 'For any two events, P of A and B is P of A, times P of B given A.', show: 'sum.1' },
        { say: 'And in a tree diagram, multiply along a path, and check that the paths add to one. In part three, we read conditional probabilities from a table, and test whether two events are independent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
