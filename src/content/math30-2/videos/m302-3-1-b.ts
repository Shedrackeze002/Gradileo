import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioBar } from './lib/m302-3-figures.ts';

const video: Explainer = {
  id: 'm302-3-1-b',
  lessonId: 'm302-3-1',
  title: 'Odds and Probability, Part 2: Converting Odds and Probability',
  thumbnailTitle: 'Odds and Probability',
  thumbnail: 'bar',
  summary: 'Turning odds into a probability (odds in favour of a : b give a/(a + b), so odds against a win of 5 : 3 give P(win) = 3/8) and a probability into odds (35% gives 35 : 65 = 7 : 13), and why a "1 in 5" chance means odds of 1 : 4. Part 3 solves problems with odds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Converting Odds and Probability', subtitle: 'From $a : b$ to $\\dfrac{a}{a + b}$, and back' }],
      lines: [
        { say: 'A sports report says the odds against a team winning are five to three. A forecast says there is a thirty-five percent chance of snow. To compare claims like these, you need to move between odds and probabilities.', show: 'title' },
        { say: 'In this video, you will turn odds into a probability, and a probability into odds. You will also avoid a very common mistake with a “one in five” chance.' },
      ],
    },
    {
      chapter: 'From odds to probability',
      layout: 'center',
      main: [
        figure('ab', [ratioBar({ fav: 2, unfav: 3, favLabel: '2 \\text{ favourable}', unfavLabel: '3 \\text{ unfavourable}', width: 10, height: 1.2 })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{odds in favour } 2 : 3', '2 + 3 = 5 \\text{ outcomes, so } P = \\dfrac{2}{5}', '\\text{odds in favour } a : b \\;\\to\\; P = \\dfrac{a}{a + b}'] },
      ],
      lines: [
        { say: 'Suppose the odds in favour of an event are two to three. That means two favourable outcomes for every three unfavourable ones.', show: ['ab', 'm.0'], focus: 'm.0' },
        { say: 'Put them together, and that is two plus three, or five outcomes in all. Two of the five are favourable, so the probability is two fifths.', show: 'm.1', focus: ['m.1', 'ab.fav'] },
        { say: 'In general, if the odds in favour of an event are "a" to b, there are "a" plus b outcomes in all, and "a" of them are favourable. So the probability is "a" over "a" plus b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A hockey game',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The odds **against** a hockey team winning its next game are $5 : 3$. What is the probability that the team wins?' },
        figure('bar', [ratioBar({ fav: 3, unfav: 5, favLabel: '3 \\text{ wins}', unfavLabel: '5 \\text{ losses}', width: 12, height: 1.2 })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{win}) = \\dfrac{3}{5 + 3} = \\dfrac{3}{8} = 0.375 = 37.5\\%'] },
      ],
      lines: [
        { say: 'The odds against a hockey team winning its next game are five to three. What is the probability that the team wins?', show: 'p' },
        { say: 'Be careful with the order. Odds against put the unfavourable outcomes first. So five to three means five losses for every three wins.', show: 'bar', focus: 'bar.unfav' },
        { say: 'That is eight outcomes in all, and three of them are wins.', focus: 'bar.fav' },
        { say: 'So P of win is three over five plus three, which is three eighths. As a decimal, that is 0.375, or 37.5 percent.', show: 'm', focus: 'm' },
        { say: 'Notice that the favourable number, three, came second, because these were odds against. Always decide which number is favourable before you divide.' },
      ],
    },
    {
      chapter: 'From probability to odds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'From a probability to odds', md: 'A probability of $\\dfrac{m}{n}$ means $m$ favourable outcomes out of $n$, so $n - m$ are unfavourable. The odds in favour are $m : (n - m)$.' },
        { kind: 'text', id: 'p', size: 'md', md: 'The probability of snow tomorrow is 35%. What are the odds in favour of snow?' },
      ],
      lines: [
        { say: 'Now go the other way. A probability of m over n means m favourable outcomes out of n.', show: 'key' },
        { say: 'The other outcomes, n minus m of them, are unfavourable. So the odds in favour are m to n minus m.' },
        { say: 'For example, the probability of snow tomorrow is thirty-five percent. What are the odds in favour of snow?', show: 'p' },
      ],
    },
    {
      chapter: 'A chance of snow',
      layout: 'center',
      main: [
        figure('snow', [ratioBar({ fav: 7, unfav: 13, favLabel: '7 \\text{ snow}', unfavLabel: '13 \\text{ no snow}', width: 13, height: 1.1, favTone: 'adj', unfavTone: 'muted' })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['35\\% = \\dfrac{35}{100}: \\quad 35 \\text{ favourable}, \\ 100 - 35 = 65 \\text{ unfavourable}', '\\text{odds in favour} = 35 : 65 = 7 : 13', '\\text{check: } \\dfrac{7}{7 + 13} = \\dfrac{7}{20} = 35\\% \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Thirty-five percent means thirty-five out of a hundred. So thirty-five outcomes are favourable, and a hundred minus thirty-five, which is sixty-five, are unfavourable.', show: 'm.0', focus: 'm.0' },
        { say: 'The odds in favour of snow are thirty-five to sixty-five. Both terms divide by five, so in lowest terms the odds are seven to thirteen.', show: ['m.1', 'snow'], focus: 'm.1' },
        { say: 'The bar shows it: seven parts snow, for every thirteen parts with no snow.', focus: ['snow.fav', 'snow.unfav'] },
        { say: 'Check by going back: seven plus thirteen is twenty, and seven twentieths is thirty-five hundredths, or thirty-five percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '“1 in 5” is not 1 : 5', md: '“A 1 in 5 chance” is a probability: $\\dfrac{1}{5}$. There is 1 favourable outcome and 4 unfavourable ones, so the odds in favour are $1 : 4$.' },
        figure('one', [ratioBar({ fav: 1, unfav: 4, favLabel: '1', unfavLabel: '4', width: 8, height: 1 })], 150),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{1 : 5} \\qquad \\good{1 : 4}'] },
      ],
      lines: [
        { say: 'A common mistake is to read “a one in five chance” as odds of one to five.', show: 'oops' },
        { say: '“One in five” is a probability: one favourable outcome out of five outcomes in all. So P is one fifth.', show: 'one', focus: 'one.fav' },
        { say: 'That leaves four unfavourable outcomes. So the odds in favour are one to four, not one to five.', show: 'm', focus: ['m', 'one.unfav'] },
        { say: 'In general, a one in n chance means odds in favour of one to n minus one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The odds in favour of a team winning its next game are $4 : 7$. What is the probability that it wins?',
          choices: ['$\\dfrac{4}{7}$', '$\\dfrac{7}{11}$', '$\\dfrac{3}{7}$', '$\\dfrac{4}{11}$'],
          answer: 3,
          working: '4 favourable outcomes for every 7 unfavourable ones make $4 + 7 = 11$ in all, so $P(\\text{win}) = \\dfrac{4}{11}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The odds in favour of a team winning its next game are four to seven. What is the probability that it wins? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, four elevenths. Odds in favour of four to seven mean four favourable outcomes for every seven unfavourable ones, which is eleven in all. Choice A, four sevenths, divides by the unfavourable outcomes instead of by all eleven.', show: 'q.answer' },
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
          items: ['Odds in favour of $a : b$ give $P = \\dfrac{a}{a + b}$.', 'A probability of $\\dfrac{m}{n}$ gives odds in favour of $m : (n - m)$.', '“1 in $n$” is a probability; the odds in favour are $1 : (n - 1)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Odds in favour of "a" to b give a probability of "a" over "a" plus b.', show: 'sum.0' },
        { say: 'A probability of m over n gives odds in favour of m to n minus m.', show: 'sum.1' },
        { say: 'And a one in n chance is a probability, so the odds in favour are one to n minus one. In part three, we use odds to find how many items are favourable, and judge claims about chance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
