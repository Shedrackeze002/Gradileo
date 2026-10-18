import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const bag = () => marbles({ groups: [{ id: 'r', count: 4, tone: 'bad' }, { id: 'b', count: 6, tone: 'adj' }], perRow: 5 });

const video: Explainer = {
  id: 'm302-3-1',
  lessonId: 'm302-3-1',
  title: 'Odds and Probability, Part 1: Odds in Favour and Against',
  thumbnailTitle: 'Odds in Favour and Against',
  thumbnail: 'mb2',
  summary: 'Probability as favourable outcomes over all outcomes, the complement P(A′) = 1 − P(A), and odds: the odds in favour (favourable : unfavourable) and the odds against (unfavourable : favourable), for a bag of 4 red and 6 blue marbles. Part 2 converts between odds and probability.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Odds in Favour and Against', subtitle: 'Favourable compared with unfavourable' }],
      lines: [
        { say: 'Sports broadcasts quote the odds that a team will win, and weather forecasts give the chance of snow as a percent. Both describe how likely something is, but they compare different things.', show: 'title' },
        { say: 'In this video, you will review probability and the complement of an event. Then you will learn what the odds in favour of an event, and the odds against it, mean.' },
      ],
    },
    {
      chapter: 'Probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Probability', md: 'When all outcomes are equally likely, the **probability** of an event $A$ is the number of favourable outcomes divided by the total number of outcomes. It is between $0$ (impossible) and $1$ (certain).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}'] },
      ],
      lines: [
        { say: 'First, a reminder. When all the outcomes are equally likely, the probability of an event A is the number of favourable outcomes, the ones you want, divided by the total number of outcomes.', show: 'def' },
        { say: 'We write it as P of A. A probability is always between zero, which means impossible, and one, which means certain. It can be written as a fraction, a decimal or a percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Drawing a marble',
      layout: 'split',
      leftWidth: 460,
      left: [figure('mb', [bag()], 300)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{red}) = \\dfrac{4}{10} = \\dfrac{2}{5}', 'P(\\text{not red}) = 1 - \\dfrac{2}{5} = \\dfrac{3}{5}'] },
        { kind: 'callout', id: 'comp', tone: 'key', title: 'The complement', md: 'The complement of $A$, written $A\'$, is “$A$ does not happen”. One of the two must happen, so $P(A\') = 1 - P(A)$.' },
      ],
      lines: [
        { say: 'A bag holds four red marbles and six blue marbles. One marble is drawn at random. What is the probability that it is red?', show: 'mb' },
        { say: 'There are four favourable outcomes, the red marbles, out of ten marbles in all. So P of red is four tenths, which is two fifths.', show: 'm.0', focus: ['mb.r', 'm.0'] },
        { say: 'What is the probability that the marble is not red? "Not red" is called the complement of "red". The complement of an event A is written with a small mark after the letter, and read "A prime".', show: 'comp', focus: 'mb' },
        { say: 'Either the marble is red, or it is not, so the two probabilities add to one. That means P of not red is one minus two fifths, which is three fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'That matches the bag: six of the ten marbles are blue, and six tenths is three fifths.', focus: ['mb.b', 'm.1'] },
      ],
    },
    {
      chapter: 'Odds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Odds', md: 'Odds compare the **favourable** outcomes with the **unfavourable** outcomes, not with all the outcomes. They are written as a ratio such as $2 : 3$, usually in lowest terms.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{odds in favour} = \\text{favourable} : \\text{unfavourable}', '\\text{odds against} = \\text{unfavourable} : \\text{favourable}'] },
      ],
      lines: [
        { say: 'Odds are different. Odds compare the favourable outcomes with the unfavourable outcomes, the ones you do not want, and not with all the outcomes.', show: 'def' },
        { say: 'The odds in favour of an event are the number of favourable outcomes, to the number of unfavourable outcomes.', show: 'm.0', focus: 'm.0' },
        { say: 'The odds against an event are the other way round: the number of unfavourable outcomes, to the number of favourable outcomes.', show: 'm.1', focus: 'm.1' },
        { say: 'Odds are written as a ratio with a colon, like two to three, and usually in lowest terms, just like a fraction.', focus: 'def' },
      ],
    },
    {
      chapter: 'Odds with marbles',
      layout: 'split',
      leftWidth: 460,
      left: [figure('mb2', [bag()], 300)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{favourable: } 4 \\text{ red}', '\\text{unfavourable: } 6 \\text{ blue}', '\\text{odds in favour} = 4 : 6 = 2 : 3', '\\text{odds against} = 6 : 4 = 3 : 2'],
        },
      ],
      lines: [
        { say: 'Back to the bag of four red and six blue marbles. Find the odds in favour of drawing a red marble, and the odds against it.', show: 'mb2' },
        { say: 'The favourable outcomes are the four red marbles.', show: 'm.0', focus: ['mb2.r', 'm.0'] },
        { say: 'The unfavourable outcomes are the six marbles that are not red: the blue ones.', show: 'm.1', focus: ['mb2.b', 'm.1'] },
        { say: 'So the odds in favour of red are four to six. Divide both terms by two, and they are two to three.', show: 'm.2', focus: 'm.2' },
        { say: 'The odds against red are six to four, which is three to two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Probability or odds?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Red marble', 'Compares', 'Value'], rows: [['Probability', 'favourable with all', '$\\dfrac{2}{5}$'], ['Odds in favour', 'favourable with unfavourable', '$2 : 3$'], ['Odds against', 'unfavourable with favourable', '$3 : 2$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Odds against are odds in favour, reversed', md: 'If the odds in favour of an event are $a : b$, the odds against it are $b : a$.' },
      ],
      lines: [
        { say: 'Put the three side by side. The probability of red is two fifths: it compares the four red marbles with all ten marbles.', show: 't.0', focus: 't.0' },
        { say: 'The odds in favour of red are two to three: they compare the four red marbles with the six that are not red.', show: 't.1', focus: 't.1' },
        { say: 'And the odds against red are three to two: the six that are not red, compared with the four red ones.', show: 't.2', focus: 't.2' },
        { say: 'So you never need to work out the odds against from scratch. If the odds in favour of an event are "a" to b, the odds against it are b to "a": the same ratio, reversed.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing with the total', md: 'Odds never compare with the total. For the marbles, $4 : 10$ is **not** the odds in favour of red: the ten marbles include the four red ones.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{4 : 10} \\qquad \\good{4 : 6 = 2 : 3}'] },
      ],
      lines: [
        { say: 'The most common mistake is to compare the favourable outcomes with the total, as you do for a probability.', show: 'oops' },
        { say: 'Four to ten is not the odds in favour of red, because the ten marbles include the four red ones. The odds compare the four red marbles with the six that are not red: four to six, or two to three.', show: 'm', focus: 'm' },
        { say: 'A quick check: the two numbers in odds add up to the total. Two plus three is five, and the probability of red is two out of five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spinner has 8 equal sections: 3 are green and 5 are yellow. What are the odds in favour of landing on green?',
          choices: ['$3 : 8$', '$3 : 5$', '$5 : 3$', '$5 : 8$'],
          answer: 1,
          working: 'Favourable: 3 green sections. Unfavourable: 5 yellow sections. The odds in favour of green are $3 : 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner has eight equal sections: three are green and five are yellow. What are the odds in favour of landing on green? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three to five. There are three favourable sections, the green ones, and five unfavourable ones, the yellow ones. Choice A, three to eight, compares green with all eight sections. That is the probability, three eighths, not the odds.', show: 'q.answer' },
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
            '$P(A) = \\dfrac{\\text{favourable}}{\\text{total}}$, and the complement has $P(A\') = 1 - P(A)$.',
            'Odds in favour $=$ favourable : unfavourable.',
            'Odds against $=$ unfavourable : favourable, the odds in favour reversed.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A probability is the favourable outcomes over all the outcomes, and the probability that an event does not happen is one minus the probability that it does.', show: 'sum.0' },
        { say: 'The odds in favour of an event compare the favourable outcomes with the unfavourable ones.', show: 'sum.1' },
        { say: 'And the odds against compare the unfavourable outcomes with the favourable ones. In part two, we convert odds into probabilities, and probabilities into odds. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
