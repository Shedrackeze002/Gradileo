import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { marbles } from '@/video/charts.ts';
import { tag } from './lib/m8-3-figures.ts';

// The bag: 5 red marbles, then a gap, then 3 blue marbles, each colour counted underneath.
const bag = (id: string) =>
  figure(
    id,
    [
      marbles({ name: 'r', groups: [{ id: 'all', count: 5, tone: 'bad' }] }),
      marbles({ name: 'b', groups: [{ id: 'all', count: 3, tone: 'adj' }], at: [6.5, 0] }),
      tag('rn', [2, -0.7], '5\\ \\text{red}', { place: 'below', tone: 'bad' }),
      tag('bn', [7.5, -0.7], '3\\ \\text{blue}', { place: 'below', tone: 'adj' }),
    ],
    190,
  );

const video: Explainer = {
  id: 'm8-3-1',
  lessonId: 'm8-3-1',
  title: 'Two-Term and Three-Term Ratios, Part 1: What Is a Ratio?',
  thumbnailTitle: 'What Is a Ratio?',
  thumbnail: 'bg',
  summary:
    'A ratio compares two or more quantities measured in the same units, and its numbers are called terms. A bag with 5 red marbles and 3 blue marbles has a ratio of red to blue of 5 : 3, which can also be written “5 to 3” or 5/3. Order matters: the quantity named first goes first, so blue to red is 3 : 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 1', title: 'What Is a Ratio?', subtitle: 'Comparing amounts, in order' }],
      lines: [
        { say: 'A hockey team wins nine games and loses six. A trail mix has three cups of peanuts for every two cups of raisins. Each of these compares two amounts.', show: 'title' },
        { say: 'In this part, you will learn what a ratio is, three ways to write one, and why the order of its numbers matters.' },
      ],
    },
    {
      chapter: 'Comparing with a ratio',
      layout: 'center',
      main: [
        bag('bg'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio', md: 'A **ratio** compares two or more quantities measured in the **same units**. The numbers in a ratio are its **terms**.' },
      ],
      lines: [
        { say: 'Here is a bag of marbles. Five of the marbles are red.', show: ['bg.r-all', 'bg.rn'] },
        { say: 'And three of the marbles are blue.', show: ['bg.b-all', 'bg.bn'] },
        { say: 'A ratio compares two or more quantities measured in the same units. Here, both quantities are counted in marbles.', show: 'def' },
        { say: 'The ratio of red marbles to blue marbles is five to three. For every five red marbles in the bag, there are three blue ones.', focus: ['bg.r-all', 'bg.b-all'] },
        { say: 'The numbers in a ratio are called its terms. In the ratio five to three, the terms are five and three.', focus: ['bg.rn', 'bg.bn'] },
      ],
    },
    {
      chapter: 'Three ways to write a ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['5 : 3', '5 \\text{ to } 3', '\\dfrac{5}{3}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read them all the same way', md: 'All three are read “five to three”.' },
      ],
      lines: [
        { say: 'There are three ways to write this ratio. The first puts a colon between the terms. A colon is two dots, one above the other. We read it five to three.', show: 'm.0', focus: 'm.0' },
        { say: 'The second way uses words: five to three.', show: 'm.1', focus: 'm.1' },
        { say: 'The third way looks like a fraction: five over three. Here it compares the red marbles with the blue marbles, not with the whole bag. You will compare a part with the whole in the next part.', show: 'm.2', focus: 'm.2' },
        { say: 'However it is written, the ratio is read the same way: five to three.', show: 'tip' },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'center',
      main: [
        bag('bg'),
        { kind: 'text', id: 'q', size: 'md', md: 'Write the ratio of red marbles to blue marbles, and the ratio of blue marbles to red marbles.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{red to blue} = \\bad{5} : \\adj{3}', '\\text{blue to red} = \\adj{3} : \\bad{5}'] },
      ],
      lines: [
        { say: 'In a ratio, the order matters. Write the ratio of red marbles to blue marbles, and the ratio of blue marbles to red marbles.', show: ['bg', 'q'] },
        { say: 'Red to blue: red is named first, so the number of red marbles goes first. The ratio is five to three.', show: 'm.0', focus: ['m.0', 'bg.r-all'] },
        { say: 'Blue to red: now blue is named first, so the number of blue marbles goes first. The ratio is three to five.', show: 'm.1', focus: ['m.1', 'bg.b-all'] },
        { say: 'Five to three and three to five are different ratios. The first says there are more red marbles than blue ones. The second would mean more blue marbles than red ones.', focus: 'bg' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Switching the order', md: '“The ratio of blue to red” is $3 : 5$, **not** $5 : 3$. Write the terms in the same order as the words.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{blue to red} = \\bad{\\cancel{5 : 3}} \\qquad \\text{blue to red} = \\good{3 : 5}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. A question asks for the ratio of blue marbles to red marbles. Someone writes five to three, because the red marbles came first in the picture.', show: 'oops' },
        { say: 'But five to three would mean five blue marbles for every three red ones. That is not this bag. Blue is named first, so the blue count goes first: three to five.', show: 'm.0', focus: 'm.0' },
        { say: 'Always read the words carefully, and write the terms in the same order as the words.' },
      ],
    },
    {
      chapter: 'Wins and losses',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A hockey team wins $9$ games and loses $6$. Write the ratio of wins to losses, and the ratio of losses to wins.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{wins to losses} = 9 : 6', '\\text{losses to wins} = 6 : 9'] },
      ],
      lines: [
        { say: 'Let’s try another. A hockey team wins nine games and loses six. Write the ratio of wins to losses, and the ratio of losses to wins.', show: 'q' },
        { say: 'Both quantities are numbers of games, so these are ratios. Wins to losses: wins are named first, so the ratio is nine to six.', show: 'm.0', focus: 'm.0' },
        { say: 'Losses to wins: losses are named first, so the ratio is six to nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pencil case holds $7$ pens and $4$ markers. What is the ratio of markers to pens?',
          choices: ['$7 : 4$', '$4 : 7$', '$4 : 11$', '$7 : 11$'],
          answer: 1,
          working: 'Markers are named first, so the number of markers goes first: markers to pens is $4 : 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pencil case holds seven pens and four markers. What is the ratio of markers to pens? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four to seven. Markers are named first, so the four markers go first. Choice A, seven to four, is the ratio of pens to markers. The order is switched.', show: 'q.answer' },
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
            'A **ratio** compares two or more quantities measured in the same units. Its numbers are its **terms**.',
            'Write it three ways: $5 : 3$, “$5$ to $3$” or $\\dfrac{5}{3}$.',
            'Order matters: the quantity named first goes first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio compares two or more quantities measured in the same units, and its numbers are called terms.', show: 'sum.0' },
        { say: 'You can write a ratio with a colon, in words, or like a fraction. All three are read the same way.', show: 'sum.1' },
        { say: 'And the order matters: the quantity named first goes first. In the next part, you will compare a part of a group with the whole group. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
