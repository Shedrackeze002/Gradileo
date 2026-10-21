import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beads } from '@/content/math6/videos/lib/m6-5-figures.ts';

// The necklace: 12 red and 18 white beads, in two rows of three groups of 2 red and 3 white.
const necklace = (id: string) =>
  figure(
    id,
    [
      beads({ name: 'top', repeats: 3, red: 2, white: 3, labels: ['1', '2', '3'] }),
      beads({ name: 'bot', repeats: 3, red: 2, white: 3, labels: ['4', '5', '6'], at: [0, -2.3] }),
    ],
    300,
  );

const all = (fig: string, set: 'k' | 'br') => ['top', 'bot'].flatMap((row) => [0, 1, 2].map((i) => `${fig}.${row}-${set}${i}`));

const video: Explainer = {
  id: 'm8-3-1-d',
  lessonId: 'm8-3-1',
  title: 'Two-Term and Three-Term Ratios, Part 4: Lowest Terms',
  thumbnailTitle: 'Lowest Terms',
  thumbnail: 'nk',
  summary:
    'A ratio is in lowest terms when its terms have no common factor other than 1. To write a ratio in lowest terms, divide every term by the greatest common factor (GCF): the GCF of 12 and 18 is 6, so 12 : 18 = 2 : 3, just as a necklace of 12 red and 18 white beads makes 6 groups of 2 red and 3 white. Dividing by a smaller common factor gives 6 : 9, which is not finished. In the same way, 20 : 15 = 4 : 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 4', title: 'Lowest Terms', subtitle: 'The simplest way to write a ratio' }],
      lines: [
        { say: 'A necklace has twelve red beads and eighteen white beads. The ratio of red beads to white beads is twelve to eighteen. Is there a simpler way to write it?', show: 'title' },
        { say: 'In this part, you will write ratios in lowest terms, using the greatest common factor.' },
      ],
    },
    {
      chapter: 'Equal groups',
      layout: 'center',
      main: [necklace('nk'), { kind: 'math', id: 'm', size: 'lg', lines: ['12 : 18 = 2 : 3'] }],
      lines: [
        { say: 'Here is the necklace, in two rows: twelve red beads and eighteen white beads.', show: ['nk.top-string', 'nk.bot-string', ...all('nk', 'k')] },
        { say: 'Look closely. The beads come in six equal groups, and each group has two red beads and three white beads.', show: all('nk', 'br') },
        { say: 'So for every two red beads, there are three white beads. Twelve to eighteen makes the same comparison as two to three.', show: 'm.0', focus: 'm.0' },
        { say: 'Two to three uses the smallest whole numbers that make this comparison. We say that two to three is in lowest terms.' },
      ],
    },
    {
      chapter: 'The greatest common factor',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lowest terms', md: 'A ratio is in **lowest terms** when its terms have no common factor other than $1$. To get there, divide every term by the **greatest common factor** (GCF).' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Factors of } 12\\colon\\ 1,\\ 2,\\ 3,\\ 4,\\ \\good{6},\\ 12',
            '\\text{Factors of } 18\\colon\\ 1,\\ 2,\\ 3,\\ \\good{6},\\ 9,\\ 18',
            '\\text{GCF} = 6 \\qquad 12 \\div 6 = 2 \\qquad 18 \\div 6 = 3',
            '12 : 18 = 2 : 3',
          ],
        },
      ],
      lines: [
        { say: 'A factor of a number divides into it evenly. A common factor divides into every term. A ratio is in lowest terms when its terms have no common factor other than one.', show: 'def' },
        { say: 'To write a ratio in lowest terms, divide every term by the greatest common factor, or GCF. That is the biggest number that divides into every term.' },
        { say: 'List the factors of twelve: one, two, three, four, six and twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'And the factors of eighteen: one, two, three, six, nine and eighteen. The common factors are one, two, three and six. The greatest is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide every term by six. Twelve divided by six is two, and eighteen divided by six is three.', show: 'm.2', focus: 'm.2' },
        { say: 'So twelve to eighteen in lowest terms is two to three. Dividing by six makes six equal groups, just like the beads.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep going',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 : 18 \\;\\xrightarrow{\\ \\div 2\\ }\\; 6 : 9', '6 : 9 \\;\\xrightarrow{\\ \\div 3\\ }\\; \\good{2 : 3}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Not finished yet', md: 'If you divide by a smaller common factor, check again. Keep dividing until the only common factor is $1$.' },
      ],
      lines: [
        { say: 'What if you do not spot the GCF? Suppose you divide twelve to eighteen by two instead. You get six to nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Six to nine is equivalent, but it is not finished. Three still divides into both six and nine.' },
        { say: 'Divide by three as well. Six divided by three is two, and nine divided by three is three. You reach two to three again.', show: 'm.1', focus: 'm.1' },
        { say: 'So if you divide by a smaller common factor, check again, and keep going until the only common factor is one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $20 : 15$ in lowest terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{GCF of } 20 \\text{ and } 15 = 5', '20 \\div 5 = 4 \\qquad 15 \\div 5 = 3', '20 : 15 = 4 : 3'] },
      ],
      lines: [
        { say: 'Let’s try another. Write twenty to fifteen in lowest terms.', show: 'q' },
        { say: 'Five divides into both twenty and fifteen, and no bigger number does. So the GCF is five.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty divided by five is four, and fifteen divided by five is three.', show: 'm.1', focus: 'm.1' },
        { say: 'So twenty to fifteen in lowest terms is four to three. The first term is bigger than the second, and that is fine. Keep the terms in the same order.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $18 : 24$ in lowest terms.',
          choices: ['$9 : 12$', '$6 : 8$', '$3 : 4$', '$4 : 3$'],
          answer: 2,
          working: 'The GCF of $18$ and $24$ is $6$: $18 \\div 6 = 3$ and $24 \\div 6 = 4$, so $18 : 24 = 3 : 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write eighteen to twenty-four in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, three to four. The GCF of eighteen and twenty-four is six. Eighteen divided by six is three, and twenty-four divided by six is four. Choice A, nine to twelve, divides by two only. It is not finished, because three still divides both terms.', show: 'q.answer' },
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
            'A ratio is in **lowest terms** when its terms have no common factor other than $1$.',
            'Divide every term by the **greatest common factor**: $12 : 18 = 2 : 3$.',
            'If you divide by a smaller common factor, keep going: $6 : 9 = 2 : 3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio is in lowest terms when its terms have no common factor other than one.', show: 'sum.0' },
        { say: 'To write a ratio in lowest terms, divide every term by the greatest common factor.', show: 'sum.1' },
        { say: 'And if you divide by a smaller common factor, keep going until you are finished. In the next part, you will work with ratios that have three terms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
