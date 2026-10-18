import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { shareBar } from './lib/m303-7-figures.ts';

const video: Explainer = {
  id: 'm303-7-1-b',
  lessonId: 'm303-7-1',
  title: 'Probability and Odds, Part 2: Odds in Favour and Against',
  thumbnailTitle: 'Odds in Favour and Against',
  thumbnail: 'raffle',
  summary: 'Odds compare favourable outcomes with unfavourable ones, not with the total: odds in favour are favourable : unfavourable and odds against are unfavourable : favourable, in lowest terms. A raffle of 250 tickets, 4 of them bought, gives odds in favour of 2 : 123 and odds against of 123 : 2, while the probability of winning is 2/125, or 1.6%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Odds in Favour and Against', subtitle: 'Favourable compared with unfavourable' }],
      lines: [
        { say: 'A raffle sells 250 tickets, and you hold four of them. Your chance of winning can be given as a probability, or as odds. Odds say the same thing in a different way.', show: 'title' },
        { say: 'In this video, you will find the odds in favour of an event and the odds against it, and see how odds differ from a probability.' },
      ],
    },
    {
      chapter: 'Odds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Odds', md: '**Odds** compare outcomes with each other instead of with the total. They are written as a ratio in lowest terms, such as $2 : 3$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{odds in favour} = \\text{favourable} : \\text{unfavourable}', '\\text{odds against} = \\text{unfavourable} : \\text{favourable}'] },
      ],
      lines: [
        { say: 'A probability compares the favourable outcomes with all the outcomes. Odds are different: they compare the favourable outcomes with the unfavourable outcomes, the ones you do not want.', show: 'def' },
        { say: 'The odds in favour of an event are the number of favourable outcomes, to the number of unfavourable outcomes.', show: 'm.0', focus: 'm.0' },
        { say: 'The odds against an event are the other way round: the number of unfavourable outcomes, to the number of favourable outcomes.', show: 'm.1', focus: 'm.1' },
        { say: 'Odds are written as a ratio with a colon, like two to three, and in lowest terms, just like a fraction.', focus: 'def' },
      ],
    },
    {
      chapter: 'Burnt-out bulbs',
      layout: 'split',
      leftWidth: 460,
      left: [figure('bulbs', [marbles({ groups: [{ id: 'bad', count: 2, tone: 'bad' }, { id: 'ok', count: 8, tone: 'theta' }], perRow: 5 })], 240)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A box of 10 light bulbs holds 2 that are burnt out. One bulb is taken at random. Find the odds in favour of taking a burnt-out bulb, and the odds against.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{favourable: } 2, \\quad \\text{unfavourable: } 8', '\\text{odds in favour} = 2 : 8 = 1 : 4', '\\text{odds against} = 8 : 2 = 4 : 1'] },
      ],
      lines: [
        { say: 'Start with a small example. A box of ten light bulbs holds two that are burnt out. One bulb is taken at random. Find the odds in favour of taking a burnt-out bulb, and the odds against.', show: ['p', 'bulbs'] },
        { say: 'The favourable outcomes are the two burnt-out bulbs. The unfavourable outcomes are the eight bulbs that work.', show: 'm.0', focus: ['m.0', 'bulbs.bad'] },
        { say: 'So the odds in favour are two to eight. Divide both terms by two, and they are one to four: one burnt-out bulb for every four that work.', show: 'm.1', focus: 'm.1' },
        { say: 'The odds against are the same ratio reversed: eight to two, which is four to one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A raffle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A club sold 250 raffle tickets for a prize. Leo bought 4 of them. What are the odds in favour of Leo winning, and the odds against?' },
        figure('raffle', [shareBar({ fav: 4, unfav: 246, favLabel: '4 \\text{ Leo’s}', unfavLabel: '246 \\text{ other tickets}', total: '250 \\text{ tickets}', favAbove: true, width: 12, height: 1.1 })], 190),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{favourable: } 4, \\quad \\text{unfavourable: } 250 - 4 = 246', '\\text{odds in favour} = 4 : 246 = 2 : 123', '\\text{odds against} = 123 : 2'] },
      ],
      lines: [
        { say: 'A club sold 250 raffle tickets for a prize. Leo bought four of them. What are the odds in favour of Leo winning, and the odds against?', show: 'p' },
        { say: 'The favourable outcomes are Leo’s four tickets. The unfavourable outcomes are all the other tickets: 250 minus four, which is 246.', show: ['raffle', 'm.0'], focus: ['m.0', 'raffle.fav'] },
        { say: 'So the odds in favour of Leo winning are four to 246. Both terms are even, so divide them by two: the odds in favour are two to 123.', show: 'm.1', focus: 'm.1' },
        { say: 'The odds against Leo winning are the same ratio reversed: 123 to two.', show: 'm.2', focus: ['m.2', 'raffle.unfav'] },
        { say: 'The bar shows how unlikely a win is. Leo’s sliver of green is tiny next to all the red.', focus: 'raffle' },
      ],
    },
    {
      chapter: 'Odds or probability?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Leo wins', 'Compares', 'Value'],
          rows: [
            ['Probability', 'favourable with all', '$\\dfrac{4}{250} = \\dfrac{2}{125} = 1.6\\%$'],
            ['Odds in favour', 'favourable with unfavourable', '$2 : 123$'],
            ['Odds against', 'unfavourable with favourable', '$123 : 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Put the three side by side. The probability that Leo wins compares his four tickets with all 250 tickets. That is four over 250, which is two over 125, or 1.6 percent.', show: 't.0', focus: 't.0' },
        { say: 'The odds in favour, two to 123, compare the favourable tickets with the unfavourable ones.', show: 't.1', focus: 't.1' },
        { say: 'And the odds against, 123 to two, compare the unfavourable tickets with the favourable ones. All three describe the same chance.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Odds are not probability', md: '$4 : 250$ compares the favourable outcomes with the **total**, so it is the probability written as a ratio, not the odds. Odds compare favourable with **unfavourable**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{4 : 250} \\qquad \\good{4 : 246 = 2 : 123}', '\\text{check: } 4 + 246 = 250 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'The most common mistake is to compare the favourable outcomes with the total, as you do for a probability.', show: 'oops' },
        { say: 'Four to 250 is not the odds in favour of Leo winning, because the 250 tickets include Leo’s four. The odds compare Leo’s four tickets with the 246 other tickets.', show: 'm.0', focus: 'm.0' },
        { say: 'A quick check: the two numbers in the odds always add up to the total. Four plus 246 is 250.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag holds 30 tiles, and 5 of them are red. One tile is drawn at random. What are the odds against drawing a red tile?',
          choices: ['$5 : 1$', '$1 : 5$', '$1 : 6$', '$6 : 1$'],
          answer: 0,
          working: 'Favourable: 5 red tiles. Unfavourable: $30 - 5 = 25$. The odds against are $25 : 5 = 5 : 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds thirty tiles, and five of them are red. One tile is drawn at random. What are the odds against drawing a red tile? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, five to one. Five tiles are red, and thirty minus five, or twenty-five, are not. The odds against are twenty-five to five, which is five to one. Choice D, six to one, compares all thirty tiles with the five red ones.', show: 'q.answer' },
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
            'Odds in favour $=$ favourable : unfavourable.',
            'Odds against $=$ unfavourable : favourable, the odds in favour reversed.',
            'Write odds in lowest terms; the two numbers add up to the total.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The odds in favour of an event compare the favourable outcomes with the unfavourable ones.', show: 'sum.0' },
        { say: 'The odds against compare the unfavourable outcomes with the favourable ones: the odds in favour, reversed.', show: 'sum.1' },
        { say: 'Write odds in lowest terms, and check that the two numbers add up to the total. In part three, we turn odds into probabilities, and probabilities into odds. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
