import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioBar } from '../../math30-2/videos/lib/m302-3-figures.ts';

const video: Explainer = {
  id: 'm303-7-1-c',
  lessonId: 'm303-7-1',
  title: 'Probability and Odds, Part 3: Converting Odds and Probability',
  thumbnailTitle: 'Converting Odds and Probability',
  thumbnail: 'team',
  summary: 'The two numbers in the odds add up to the total, so odds in favour of a : b give P = a/(a + b), and a probability of a/n gives odds in favour of a : (n − a). Odds against a team of 7 : 3 give P(win) = 3/10, or 30%, and a 30% chance of rain gives odds in favour of 3 : 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Converting Odds and Probability', subtitle: 'From $a : b$ to $\\dfrac{a}{a + b}$, and back' }],
      lines: [
        { say: 'A sports report gives the odds against a team winning. A weather forecast gives the chance of rain as a percent. To compare claims like these, you need to move between odds and probabilities.', show: 'title' },
        { say: 'In this video, you will turn odds into a probability, and a probability into odds.' },
      ],
    },
    {
      chapter: 'The key idea',
      layout: 'center',
      main: [
        figure('ab', [ratioBar({ fav: 2, unfav: 3, favLabel: '2 \\text{ favourable}', unfavLabel: '3 \\text{ unfavourable}', width: 10, height: 1.2 })], 170),
        { kind: 'callout', id: 'key', tone: 'key', title: 'The two numbers add up to the total', md: 'Odds in favour of $a : b$ mean $a$ favourable outcomes for every $b$ unfavourable ones, so there are $a + b$ outcomes in all.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{odds in favour } a : b \\;\\to\\; P = \\dfrac{a}{a + b}', 'P = \\dfrac{a}{n} \\;\\to\\; \\text{odds in favour } a : (n - a)'] },
      ],
      lines: [
        { say: 'Suppose the odds in favour of an event are two to three. That means two favourable outcomes for every three unfavourable ones.', show: 'ab' },
        { say: 'Put them together, and that is two plus three, or five outcomes in all. The two numbers in the odds always add up to the total number of outcomes.', show: 'key' },
        { say: 'So odds in favour of "a" to b give a probability of "a" over "a" plus b. And going the other way, a probability of "a" out of n gives odds in favour of "a" to n minus "a".', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From odds to probability',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The odds **against** a curling team winning a tournament are $7 : 3$. What is the probability that the team wins?' },
        figure('team', [ratioBar({ fav: 3, unfav: 7, favLabel: '3 \\text{ wins}', unfavLabel: '7 \\text{ losses}', width: 12, height: 1.2 })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{total: } 7 + 3 = 10', 'P(\\text{win}) = \\dfrac{3}{10} = 30\\%'] },
      ],
      lines: [
        { say: 'The odds against a curling team winning a tournament are seven to three. What is the probability that the team wins?', show: 'p' },
        { say: 'Be careful with the order. Odds against put the unfavourable outcomes first. So seven to three means seven losses for every three wins.', show: 'team', focus: 'team.unfav' },
        { say: 'That makes seven plus three, or ten outcomes in all.', show: 'm.0', focus: 'm.0' },
        { say: 'Three of the ten are wins, so the probability that the team wins is three tenths, or thirty percent.', show: 'm.1', focus: ['m.1', 'team.fav'] },
        { say: 'Notice that the favourable number, three, came second, because these were odds against. Always decide which number is favourable before you divide.' },
      ],
    },
    {
      chapter: 'From probability to odds',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A forecast gives a 30% probability of rain tomorrow. What are the odds in favour of rain?' },
        figure('rain', [ratioBar({ fav: 3, unfav: 7, favLabel: '3 \\text{ rain}', unfavLabel: '7 \\text{ no rain}', width: 12, height: 1.2, favTone: 'adj', unfavTone: 'muted' })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['30\\% = \\dfrac{30}{100}: \\quad 30 \\text{ favourable}, \\ 100 - 30 = 70 \\text{ unfavourable}', '\\text{odds in favour} = 30 : 70 = 3 : 7, \\quad \\text{odds against} = 7 : 3', '\\text{check: } \\dfrac{3}{3 + 7} = \\dfrac{3}{10} = 30\\% \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Now go the other way. A forecast gives a thirty percent probability of rain tomorrow. What are the odds in favour of rain?', show: 'p' },
        { say: 'Thirty percent means thirty out of a hundred. So thirty outcomes are favourable, and a hundred minus thirty, which is seventy, are unfavourable.', show: 'm.0', focus: 'm.0' },
        { say: 'The odds in favour of rain are thirty to seventy. Divide both terms by ten, and they are three to seven. The odds against rain are seven to three.', show: ['m.1', 'rain'], focus: 'm.1' },
        { say: 'Check by going back: three plus seven is ten, and three tenths is thirty percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the other number', md: 'Odds in favour of $3 : 7$ do **not** give a probability of $\\dfrac{3}{7}$. Divide by the total, $3 + 7 = 10$, not by the unfavourable outcomes.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{3}{7}} \\qquad \\good{\\dfrac{3}{3 + 7} = \\dfrac{3}{10}}'] },
      ],
      lines: [
        { say: 'A common mistake is to turn odds of three to seven into the fraction three sevenths.', show: 'oops' },
        { say: 'But a probability divides by the total number of outcomes, and the total is three plus seven, which is ten. So the probability is three tenths, not three sevenths.', show: 'm', focus: 'm' },
        { say: 'Before you divide, always add the two numbers in the odds to find the total.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The odds in favour of a seed sprouting are $4 : 1$. What is the probability that it sprouts, as a percent?',
          choices: ['$20\\%$', '$25\\%$', '$40\\%$', '$80\\%$'],
          answer: 3,
          working: '4 favourable outcomes for every 1 unfavourable one make $4 + 1 = 5$ in all, so $P(\\text{sprouts}) = \\dfrac{4}{5} = 80\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. The odds in favour of a seed sprouting are four to one. What is the probability that it sprouts, as a percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eighty percent. Four favourable outcomes for every one unfavourable outcome make five in all, and four fifths is eighty percent. Choice A, twenty percent, is the probability that the seed does not sprout.', show: 'q.answer' },
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
          items: ['The two numbers in the odds add up to the total.', 'Odds in favour of $a : b$ give $P = \\dfrac{a}{a + b}$.', 'A probability of $\\dfrac{a}{n}$ gives odds in favour of $a : (n - a)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The two numbers in the odds add up to the total number of outcomes.', show: 'sum.0' },
        { say: 'So odds in favour of "a" to b give a probability of "a" over "a" plus b. For odds against, the favourable number comes second.', show: 'sum.1' },
        { say: 'And a probability of "a" out of n gives odds in favour of "a" to n minus "a". In part four, we use probability to predict what to expect, and to judge claims about chance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
