import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { headedTree } from './lib/m303-7-figures.ts';

const video: Explainer = {
  id: 'm303-7-2-d',
  lessonId: 'm303-7-2',
  title: 'Probability of Combined Events, Part 4: At Least One and Exactly One',
  thumbnailTitle: 'At Least One, Exactly One',
  thumbnail: 'tree',
  summary: 'Combining the rules: at least one = 1 − none, so with 5% of fittings defective, 3 fittings hold at least one defective with probability 1 − 0.95³ ≈ 14.3%. Exactly one can happen in more than one way: rain on exactly one day of a 40%/30% weekend is 0.40 × 0.70 + 0.60 × 0.30 = 0.46, and a matching pair from 6 black and 4 grey socks is 30/90 + 12/90 = 7/15.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 4', title: 'At Least One and Exactly One', subtitle: 'Putting the rules together' }],
      lines: [
        { say: 'Real questions often ask for the chance of at least one problem, or of exactly one rainy day. These need more than one rule at a time.', show: 'title' },
        { say: 'In this video, you will combine multiplying, adding and the complement to find the probability of at least one, and of exactly one.' },
      ],
    },
    {
      chapter: 'Two key ideas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'least', tone: 'key', title: 'At least one', md: '**At least one** is the opposite of **none**: $P(\\text{at least one}) = 1 - P(\\text{none})$.' },
        { kind: 'callout', id: 'exact', tone: 'key', title: 'Exactly one', md: '**Exactly one** can happen in more than one way. Find each way (multiply), then add the ways: they cannot happen together.' },
      ],
      lines: [
        { say: 'Here are two key ideas. First, at least one means one, or two, or more. Its opposite is none. So the probability of at least one is one minus the probability of none.', show: 'least' },
        { say: 'Second, exactly one can often happen in more than one way. Find the probability of each way by multiplying, then add the ways. You can add them because they are mutually exclusive: two different ways cannot both happen.', show: 'exact' },
      ],
    },
    {
      chapter: 'Quality control',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At a plant, 5% of pipe fittings are defective. An inspector picks 3 fittings at random from a large batch. Assume they are independent. What is the probability that at least one is defective, to the nearest tenth of a percent?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{good}) = 1 - 0.05 = 0.95', 'P(\\text{none defective}) = 0.95 \\times 0.95 \\times 0.95 = 0.857375', 'P(\\text{at least one}) = 1 - 0.857375 = 0.142625 \\approx 14.3\\%'] },
      ],
      lines: [
        { say: 'At a plant, five percent of pipe fittings are defective. An inspector picks three fittings at random from a large batch. Assume they are independent. What is the probability that at least one is defective, to the nearest tenth of a percent?', show: 'p' },
        { say: 'At least one could be one, two or three defective fittings. That is a lot of cases. The opposite, none defective, is just one case. So find that first.' },
        { say: 'One fitting is good with probability one minus 0.05, which is 0.95.', show: 'm.0', focus: 'm.0' },
        { say: 'The fittings are independent, so all three are good with probability 0.95 times 0.95 times 0.95, which is 0.857375.', show: 'm.1', focus: 'm.1' },
        { say: 'So the probability of at least one defective fitting is one minus 0.857375, which is 0.142625, or about 14.3 percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rain on exactly one day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The forecast gives a 40% probability of rain on Saturday and 30% on Sunday, independently. What is the probability of rain on **exactly one** of the two days?' },
        figure('tree', [
          headedTree({
            first: [
              { name: '\\text{Rain}', p: '0.4', tone: 'adj' },
              { name: '\\text{Dry}', p: '0.6', tone: 'theta' },
            ],
            second: [
              [
                { name: '\\text{Rain}', p: '0.3', tone: 'adj' },
                { name: '\\text{Dry}', p: '0.7', tone: 'theta' },
              ],
              [
                { name: '\\text{Rain}', p: '0.3', tone: 'adj' },
                { name: '\\text{Dry}', p: '0.7', tone: 'theta' },
              ],
            ],
            ends: ['', '0.4 \\times 0.7 = 0.28', '0.6 \\times 0.3 = 0.18', ''],
            heads: ['\\text{Saturday}', '\\text{Sunday}'],
            groupGap: 0.8,
            room: 2.6,
          }),
        ], 350),
        { kind: 'math', id: 'm', size: 'md', lines: ['0.28 + 0.18 = 0.46 = 46\\%'] },
      ],
      lines: [
        { say: 'A roofing crew is using a forecast of forty percent rain on Saturday, and thirty percent on Sunday. Assume the days are independent. What is the probability of rain on exactly one of the two days?', show: 'p' },
        { say: 'Draw the tree. Exactly one rainy day can happen in two ways: rain on Saturday and not Sunday, or rain on Sunday and not Saturday.', show: ['tree.start', 'tree.heads', 'tree.s1', 'tree.s2-0', 'tree.s2-1'] },
        { say: 'Rain on Saturday only: 0.4 times 0.7, the chance of a dry Sunday, is 0.28.', show: 'tree.e0-1', focus: ['tree.b0', 'tree.b0-1', 'tree.e0-1'] },
        { say: 'Rain on Sunday only: 0.6, the chance of a dry Saturday, times 0.3 is 0.18.', show: 'tree.e1-0', focus: ['tree.b1', 'tree.b1-0', 'tree.e1-0'] },
        { say: 'These two ways cannot both happen, so add them: 0.28 plus 0.18 is 0.46. The probability of rain on exactly one day is forty-six percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A matching pair',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A drawer holds 6 black socks and 4 grey socks. Two socks are pulled out without looking. What is the probability that they match?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['P(\\text{both black}) = \\dfrac{6}{10} \\times \\dfrac{5}{9} = \\dfrac{30}{90}', 'P(\\text{both grey}) = \\dfrac{4}{10} \\times \\dfrac{3}{9} = \\dfrac{12}{90}', 'P(\\text{match}) = \\dfrac{30}{90} + \\dfrac{12}{90} = \\dfrac{42}{90} = \\dfrac{7}{15}'],
        },
      ],
      lines: [
        { say: 'One more. A drawer holds six black socks and four grey socks. Two socks are pulled out without looking. What is the probability that they match?', show: 'p' },
        { say: 'A match can happen in two ways: both black, or both grey. The socks are pulled without replacement, so each way uses dependent events.' },
        { say: 'Both black: six tenths, times five ninths, because one black sock is gone. That is thirty ninetieths.', show: 'm.0', focus: 'm.0' },
        { say: 'Both grey: four tenths, times three ninths, which is twelve ninetieths.', show: 'm.1', focus: 'm.1' },
        { say: 'The two ways cannot both happen, so add: thirty ninetieths plus twelve ninetieths is forty-two ninetieths, which is seven fifteenths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'At least one is not 3 × 5%', md: '$3 \\times 5\\% = 15\\%$ is a little too high: it counts the times with two or three defective fittings more than once. Use $1 - P(\\text{none})$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{0.05 + 0.05 + 0.05 = 0.15} \\qquad \\good{1 - 0.95^3 \\approx 0.143}'] },
      ],
      lines: [
        { say: 'A common mistake with at least one is to add: five percent plus five percent plus five percent is fifteen percent.', show: 'oops' },
        { say: 'That is close, but too high. The three events are not mutually exclusive: two or three fittings can be defective together, and adding counts those times more than once.' },
        { say: 'With ten fittings, adding would give fifty percent, and with twenty, a hundred percent, which is clearly wrong. One minus the probability of none always works.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A player makes 70% of free throws, and each shot is independent. The player takes 2 shots. What is the probability of making **exactly one**?',
          choices: ['$21\\%$', '$42\\%$', '$49\\%$', '$91\\%$'],
          answer: 1,
          working: 'Make then miss: $0.7 \\times 0.3 = 0.21$. Miss then make: $0.3 \\times 0.7 = 0.21$. Exactly one: $0.21 + 0.21 = 0.42 = 42\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A player makes seventy percent of free throws, and each shot is independent. The player takes two shots. What is the probability of making exactly one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, forty-two percent. Make then miss is 0.7 times 0.3, or 0.21. Miss then make is also 0.21. Add the two ways to get 0.42. Choice A counts only one of the two ways.', show: 'q.answer' },
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
            '$P(\\text{at least one}) = 1 - P(\\text{none})$.',
            'Exactly one: multiply for each way, then add the ways.',
            'Mutually exclusive: add. Independent: multiply. Dependent: change the second fraction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The probability of at least one is one minus the probability of none.', show: 'sum.0' },
        { say: 'For exactly one, multiply to find each way it can happen, then add the ways.', show: 'sum.1' },
        { say: 'And remember the three rules: add for mutually exclusive events, multiply for independent events, and change the second fraction for dependent events. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
