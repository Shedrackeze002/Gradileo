import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot, stacks } from './lib/mx-figures.ts';

const LOW = [3, 4, 4, 5, 5, 5, 6, 6, 7];
const HIGH = [10, 11, 11, 12, 12, 12, 13, 13, 14];

const video: Explainer = {
  id: 'mx-1-4',
  lessonId: 'mx-1-4',
  title: 'Comparing Two Populations',
  thumbnail: 'd',
  summary: 'To compare two populations, compare samples by their centres and their spreads. Dividing the difference between the means by the MAD says how far apart they are: about 2 MADs or more suggests a real difference, and less than 1 MAD means the data overlap a lot.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays', title: 'Comparing Two Populations', subtitle: 'Centre and spread together' }],
      lines: [
        { say: 'Are the players on the volleyball team taller than the players on the soccer team? Measuring some players from each team gives two sets of data.', show: 'title' },
        { say: 'In this video, you will learn to compare two groups by their centres, and to judge whether the difference is real by looking at their spread.' },
      ],
    },
    {
      chapter: 'Population and sample',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Population and sample', md: 'A **population** is the whole group we want to know about. A **sample** is the part of it we actually measure.' },
      ],
      lines: [
        { say: 'A population is the whole group we want to know about, such as every player on the volleyball team.', show: 'def' },
        { say: 'A sample is the part of it we actually measure, such as six of those players. We use the sample to draw conclusions about the population.' },
      ],
    },
    {
      chapter: 'Comparing the means',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Team', 'Heights (cm)', 'Mean'], rows: [['Volleyball', '172, 178, 181, 175, 184, 176', '$1{,}066 \\div 6 \\approx 177.7$'], ['Soccer', '168, 171, 166, 174, 170, 167', '$1{,}016 \\div 6 \\approx 169.3$']] },
        { kind: 'text', id: 'ans', md: 'The volleyball players’ mean is about $8.3$ cm greater.', align: 'center' },
      ],
      lines: [
        { say: 'Here are the heights, in centimetres, of six players from each team.', show: 't' },
        { say: 'The volleyball heights add up to 1,066 centimetres. Divided by six, the mean is about 177.7 centimetres.', focus: 't.0' },
        { say: 'The soccer heights add up to 1,016 centimetres, so their mean is about 169.3 centimetres.', focus: 't.1' },
        { say: 'So the volleyball players’ mean is about 8.3 centimetres greater. But is that a big difference?', show: 'ans', focus: 't' },
      ],
    },
    {
      chapter: 'Taking the spread into account',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Comparing with the MAD', md: 'Divide the difference between the means by the MAD. About **2 MADs or more**: the populations are likely to be different. **Less than 1 MAD**: the difference could be chance.' },
      ],
      lines: [
        { say: 'A difference of eight centimetres means a lot if most players are within two or three centimetres of their team’s mean. It means very little if heights within each team vary by fifteen centimetres.' },
        { say: 'So we compare the difference between the means with the spread, using the mean absolute deviation. When the two MADs are about the same, divide the difference by the MAD. The result says how many MADs apart the means are.', show: 'def' },
        { say: 'About two MADs or more, and the data overlap little, so the populations are likely to be different. Less than one MAD, and the data overlap a lot, so the difference could just be chance.' },
      ],
    },
    {
      chapter: 'A clear difference',
      layout: 'center',
      main: [
        figure('d', [dotPlot({ name: 'a', values: LOW, min: 2, max: 15, length: 13 }), dotPlot({ name: 'b', values: HIGH, min: 2, max: 15, length: 13, tone: 'opp' })], 340),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Means } 5 \\text{ and } 12, \\text{ MAD} \\approx 0.9: \\quad \\dfrac{12 - 5}{0.9} \\approx 8 \\text{ MADs}'] },
      ],
      lines: [
        { say: 'This dot plot shows two samples. The blue sample has a mean of five, and the orange sample has a mean of twelve. Each has a MAD of about 0.9.', show: ['d.a-axis', ...stacks('d', LOW, 'a'), ...stacks('d', HIGH, 'b')] },
        { say: 'The means are seven apart. Seven divided by 0.9 is about eight, so the means are about eight MADs apart.', show: 'm.0', focus: 'm.0' },
        { say: 'You can see it in the picture. The two groups do not overlap at all. That is a clear difference.', focus: 'd' },
      ],
    },
    {
      chapter: 'Is the difference real?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Means: } 180 \\text{ g and } 186 \\text{ g} \\qquad \\text{MAD: } 12 \\text{ g}', '186 - 180 = 6', '6 \\div 12 = 0.5 \\text{ MADs}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing only the means', md: 'A difference in the means alone does not show that two populations differ. Always look at the spread too.' },
      ],
      lines: [
        { say: 'Two orchards’ apples have mean masses of 180 grams and 186 grams, and each sample has a MAD of twelve grams. Is there a clear difference?', show: 'm.0', focus: 'm.0' },
        { say: 'The difference of the means is 186 minus 180, which is six grams.', show: 'm.1', focus: 'm.1' },
        { say: 'In MADs, that is six divided by twelve, which is 0.5. The means are only half a MAD apart.', show: 'm.2', focus: 'm.2' },
        { say: 'So the masses overlap a lot, and the samples do not show a clear difference. Comparing only the means would have fooled us. Always look at the spread too.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two samples have means $40$ and $49$, and each has a MAD of $3$. How many MADs apart are the means?',
          choices: ['$9$', '$3$', '$1$', '$27$'],
          answer: 1,
          working: 'The means differ by $49 - 40 = 9$, and $9 \\div 3 = 3$ MADs: a clear difference.',
        },
      ],
      lines: [
        { say: 'Your turn. Two samples have means of forty and 49, and each has a MAD of three. How many MADs apart are the means? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The means differ by 49 minus forty, which is nine. Nine divided by three is three MADs, so this is a clear difference. Choice A is the difference itself, not in MADs.', show: 'q.answer' },
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
          items: ['Compare samples by their centres and their spreads.', 'Divide the difference between the means by the MAD.', 'About $2$ MADs or more suggests a real difference.', 'Less than $1$ MAD: the data overlap a lot.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare two populations, compare samples from each by their centres and their spreads.', show: 'sum.0' },
        { say: 'Divide the difference between the means by the MAD, to see how far apart they are compared with the spread.', show: 'sum.1' },
        { say: 'About two MADs or more suggests a real difference.', show: 'sum.2' },
        { say: 'And less than one MAD means the data overlap a lot. In the next lesson, we look at data in categories, with two-way tables. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
