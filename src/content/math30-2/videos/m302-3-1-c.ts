import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioBar } from './lib/m302-3-figures.ts';

const video: Explainer = {
  id: 'm302-3-1-c',
  lessonId: 'm302-3-1',
  title: 'Odds and Probability, Part 3: Solving Problems with Odds',
  thumbnailTitle: 'Solving Problems with Odds',
  thumbnail: 'jar',
  summary: 'Using odds to find a count (60 marbles with odds of 7 : 3 against green hold 18 green), where probabilities come from (theory, past results or judgment), an experimental estimate from a team that won 34 of 56 games (odds of 17 : 11 in favour), and the gambler’s fallacy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Solving Problems with Odds', subtitle: 'Counts, estimates and the gambler’s fallacy' }],
      lines: [
        { say: 'Odds split a whole into parts. So if you know the odds and the total, you can work out how many items are favourable.', show: 'title' },
        { say: 'In this video, you will use odds to find a count, see where probabilities and odds come from, and learn why a coin is never “due” to land a certain way.' },
      ],
    },
    {
      chapter: 'Finding a count',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A jar holds 60 marbles. The odds **against** drawing a green marble are $7 : 3$. How many green marbles are in the jar?' },
        figure('jar', [ratioBar({ fav: 3, unfav: 7, favLabel: '3 \\text{ parts green}', unfavLabel: '7 \\text{ parts not green}', pieces: '6', width: 12, height: 1.2 })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{green}) = \\dfrac{3}{7 + 3} = \\dfrac{3}{10}', '60 \\times \\dfrac{3}{10} = 18 \\text{ green marbles}'] },
      ],
      lines: [
        { say: 'A jar holds sixty marbles. The odds against drawing a green marble are seven to three. How many green marbles are in the jar?', show: 'p' },
        { say: 'Odds against put the unfavourable outcomes first. So there are seven parts that are not green, for every three parts that are green. That splits the jar into ten equal parts.', show: ['jar.frame', 'jar.fav', 'jar.unfav'], focus: 'jar.unfav' },
        { say: 'Three of the ten parts are green, so P of green is three over seven plus three, which is three tenths.', show: 'm.0', focus: ['m.0', 'jar.fav'] },
        { say: 'Three tenths of sixty marbles is eighteen. So there are eighteen green marbles in the jar.', show: 'm.1', focus: 'm.1' },
        { say: 'You can see it in the bar, too. Sixty marbles in ten equal parts is six marbles a part, and three parts are green. Three times six is eighteen.', show: 'jar.pieces', focus: ['jar.pieces', 'jar.fav'] },
        { say: 'Check: eighteen are green, so forty-two are not. Forty-two to eighteen divides by six, to give seven to three. It works.', focus: 'jar' },
      ],
    },
    {
      chapter: 'Where probabilities come from',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Source', 'How it is found', 'Example'],
          rows: [
            ['Theory', 'count equally likely outcomes', 'a marble from a bag'],
            ['Past results', 'what happened before', 'a team’s record'],
            ['Judgment', 'an informed opinion', 'an analyst’s forecast'],
          ],
        },
      ],
      lines: [
        { say: 'Probabilities and odds can come from three places.' },
        { say: 'From theory, by counting equally likely outcomes, as you did with the marbles in a bag.', show: 't.0', focus: 't.0' },
        { say: 'From an experiment, or from past results: what happened before.', show: 't.1', focus: 't.1' },
        { say: 'Or from someone’s judgment: an informed opinion, such as a sports analyst’s prediction. When you read a claim about chance, ask where its numbers came from.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A volleyball season',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A volleyball team won 34 of its 56 games last season. Estimate the odds in favour of the team winning its next game.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{won } 34, \\quad \\text{lost } 56 - 34 = 22', '\\text{odds in favour} = 34 : 22 = 17 : 11'] },
        { kind: 'callout', id: 'est', tone: 'key', title: 'An experimental estimate', md: 'Odds from past results are an **estimate**, not a guarantee: the team may have new players, or meet stronger opponents.' },
      ],
      lines: [
        { say: 'A volleyball team won thirty-four of its fifty-six games last season. Estimate the odds in favour of the team winning its next game.', show: 'p' },
        { say: 'The team won thirty-four games, and lost fifty-six minus thirty-four, which is twenty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'So the odds in favour of a win are thirty-four to twenty-two. Divide both terms by two, to get seventeen to eleven.', show: 'm.1', focus: 'm.1' },
        { say: 'This is an experimental estimate, based on past results. It is not a guarantee: this season, the team may have new players, or meet stronger opponents.', show: 'est' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The gambler’s fallacy', md: 'A fair coin that has landed heads five times in a row is **not** “due” for tails. Each toss is independent, so the odds in favour of tails are still $1 : 1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{H H H H H, then: } P(\\text{tails}) = \\dfrac{1}{2}, \\quad \\text{odds in favour} = 1 : 1'] },
      ],
      lines: [
        { say: 'A fair coin has landed heads five times in a row. Is it due to land tails?', show: 'oops' },
        { say: 'No. Believing that it is has a name: the gambler’s fallacy. A coin has no memory. Each toss is independent of the others, so tails is no more likely than before.' },
        { say: 'On the next toss, the probability of tails is still one half, and the odds in favour of tails are still one to one.', show: 'm', focus: 'm' },
        { say: 'Five heads in a row is unusual, but it does not change what happens on the next toss.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag holds 40 tiles. The odds in favour of drawing a blue tile are $3 : 5$. How many blue tiles are in the bag?',
          choices: ['$15$', '$24$', '$25$', '$3$'],
          answer: 0,
          working: '$P(\\text{blue}) = \\dfrac{3}{3 + 5} = \\dfrac{3}{8}$, and $40 \\times \\dfrac{3}{8} = 15$ blue tiles.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds forty tiles. The odds in favour of drawing a blue tile are three to five. How many blue tiles are in the bag? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, fifteen. Three blue tiles for every five that are not blue makes eight parts, so P of blue is three eighths, and three eighths of forty is fifteen. Choice B, twenty-four, uses three fifths: it divides by the tiles that are not blue, instead of by all eight parts.', show: 'q.answer' },
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
          items: ['To find a count, turn the odds into a probability and multiply by the total.', 'Probabilities come from theory, from experiments or past results, or from judgment.', 'Earlier independent trials do not change the next one.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find how many items are favourable, turn the odds into a probability, and multiply by the total.', show: 'sum.0' },
        { say: 'Probabilities and odds come from theory, from experiments or past results, or from judgment. Past results give an estimate, not a guarantee.', show: 'sum.1' },
        { say: 'And earlier independent trials, like coin tosses, do not change the next one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
