import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph, marbles } from '@/video/charts.ts';
import { join, note } from '@/content/math6/videos/lib/m6-9-figures.ts';

// The three fair games as percents: ring toss 40%, duck pond 45%, ball drop 42% (each bar named
// by the first word of its game, so the names fit under the bars).
const games = (id: string) =>
  figure(id, [barGraph({ categories: ['Ring', 'Duck', 'Ball'], values: [40, 45, 42], max: 50, step: 10, height: 4, titles: { y: 'Chance of winning (\\%)' } })], 440);

// Two bags: bag 1 has 3 red marbles out of 8; bag 2 has 2 red out of 5.
const bags = (id: string) =>
  figure(
    id,
    [
      join(
        marbles({ name: 'p', groups: [{ id: 'red', count: 3, tone: 'bad' }, { id: 'other', count: 5, tone: 'adj' }], perRow: 4 }),
        note('p-name', [1.5, -2], '\\text{Bag 1}', 'center', 'ink'),
        marbles({ name: 'q', groups: [{ id: 'red', count: 2, tone: 'bad' }, { id: 'other', count: 3, tone: 'adj' }], perRow: 3, at: [6, 0] }),
        note('q-name', [7, -2], '\\text{Bag 2}', 'center', 'ink'),
      ),
    ],
    240,
  );

const video: Explainer = {
  id: 'm7-11-1-d',
  lessonId: 'm7-11-1',
  title: 'Expressing Probabilities, Part 4: Comparing Probabilities',
  thumbnailTitle: 'Comparing Probabilities',
  thumbnail: 'gm',
  summary:
    'To compare probabilities written in different forms, change them all to the same form; percents are usually the easiest to compare. Ring toss at 2 : 5 = 40%, a duck pond at 9/20 = 45% and a ball drop at 42% go in order ring toss, ball drop, duck pond, so the duck pond gives the best chance of winning. In the same way, 3 red marbles out of 8 (37.5%) is less likely than 2 out of 5 (40%).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 4', title: 'Comparing Probabilities', subtitle: 'Change them to the same form' }],
      lines: [
        { say: 'Which is more likely: an event with a probability of two to five, or one with a probability of nine twentieths? It is hard to tell!', show: 'title' },
        { say: 'In this video, you will compare probabilities by writing them all in the same form.' },
      ],
    },
    {
      chapter: 'Same form first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 : 5 \\quad \\text{or} \\quad \\dfrac{9}{20} \\ ?'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Compare in the same form', md: 'Change every probability to the **same form** first. Percents are usually the easiest to compare.' },
      ],
      lines: [
        { say: 'A ratio and a fraction with different numbers are hard to compare by just looking.', show: 'm' },
        { say: 'So change every probability to the same form first. Percents are usually the easiest, because they are all out of one hundred.', show: 'tip' },
      ],
    },
    {
      chapter: 'Which game?',
      layout: 'split',
      leftWidth: 600,
      left: [games('gm')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ring toss: $2 : 5$. Duck pond: $\\dfrac{9}{20}$. Ball drop: $42\\%$. Order the games from least likely to most likely to win.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 : 5 = \\dfrac{2}{5} = 0.4 = 40\\%', '\\dfrac{9}{20} = 0.45 = 45\\%', '42\\%'] },
      ],
      lines: [
        { say: 'At a fun fair, the probability of winning ring toss is two to five. For the duck pond, it is nine twentieths. And for the ball drop, it is forty-two percent. Order the games from least likely to most likely to win.', show: 'q' },
        { say: 'Ring toss: two to five is the fraction two fifths. Two divided by five is zero point four, which is forty percent.', show: ['m.0', 'gm.scale', 'gm.b0', 'gm.v0'], focus: ['m.0', 'gm.b0'] },
        { say: 'Duck pond: nine divided by twenty is zero point four five, which is forty-five percent.', show: ['m.1', 'gm.b1', 'gm.v1'], focus: ['m.1', 'gm.b1'] },
        { say: 'The ball drop is already a percent: forty-two percent.', show: ['m.2', 'gm.b2', 'gm.v2'], focus: ['m.2', 'gm.b2'] },
        { say: 'Now they are easy to order: ring toss at forty percent, then the ball drop at forty-two percent, then the duck pond at forty-five percent. The duck pond gives the best chance of winning.', focus: 'gm' },
      ],
    },
    {
      chapter: 'Two bags',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'You win if you pick a red marble without looking. Which bag gives the better chance?' },
        bags('bg'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Bag 1: } \\dfrac{3}{8} = 0.375 = 37.5\\%', '\\text{Bag 2: } \\dfrac{2}{5} = 0.4 = 40\\%'] },
      ],
      lines: [
        { say: 'Here is another one. You win if you pick a red marble without looking. Bag one has three red marbles out of eight. Bag two has two red marbles out of five. Which bag gives the better chance?', show: ['q', 'bg.p-red', 'bg.p-other', 'bg.p-name', 'bg.q-red', 'bg.q-other', 'bg.q-name'] },
        { say: 'Bag one has more red marbles, but it also has more marbles in all. So change both probabilities to percents.' },
        { say: 'Bag one: three divided by eight is zero point three seven five, or thirty-seven point five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Bag two: two divided by five is zero point four, or forty percent. So bag two gives the better chance, even though it has fewer red marbles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which probability is the greatest?',
          choices: ['$\\dfrac{3}{5}$', '$13 : 20$', '$68\\%$', '$\\dfrac{7}{10}$'],
          answer: 3,
          working: 'As percents: $\\dfrac{3}{5} = 60\\%$, $13 : 20 = 65\\%$, $68\\%$, and $\\dfrac{7}{10} = 70\\%$. The greatest is $\\dfrac{7}{10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which probability is the greatest: three fifths, thirteen to twenty, sixty-eight percent, or seven tenths? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D: seven tenths. As percents, they are sixty, sixty-five, sixty-eight and seventy percent. Choice C, sixty-eight percent, is close, but seven tenths is seventy percent.', show: 'q.answer' },
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
          items: ['To compare probabilities, change them all to the same form.', 'Percents are usually the easiest to compare.', 'More favourable outcomes does not always mean a better chance: compare with the total.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare probabilities, change them all to the same form.', show: 'sum.0' },
        { say: 'Percents are usually the easiest to compare.', show: 'sum.1' },
        { say: 'And more favourable outcomes does not always mean a better chance. Always compare with the total. In the next lesson, you will list all the outcomes of two events. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
