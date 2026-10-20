import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { note } from './lib/m6-9-figures.ts';

// The lesson's two groups: a class of 20 (12 walk) and a school club of 50 (25 walk).
const bars = (id: string) =>
  figure(
    id,
    [
      strip({ name: 'cl', parts: 20, shaded: 12, at: [0, 2.2], width: 12, height: 1.1, tone: 'adj', label: '\\tfrac{12}{20} = 60\\%' }),
      note('cl-name', [-0.3, 2.75], '\\text{Class}', 'left', 'adj'),
      strip({ name: 'cb', parts: 50, shaded: 25, at: [0, 0], width: 12, height: 1.1, tone: 'opp', label: '\\tfrac{25}{50} = 50\\%' }),
      note('cb-name', [-0.3, 0.55], '\\text{Club}', 'left', 'opp'),
    ],
    260,
  );

const video: Explainer = {
  id: 'm6-12-1-c',
  lessonId: 'm6-12-1',
  title: 'Relative Frequency, Part 3: Comparing Groups of Different Sizes',
  thumbnailTitle: 'Comparing Groups of Different Sizes',
  thumbnail: 'br',
  summary: 'Relative frequency compares the same category in groups of different sizes fairly. In a class of 20, 12 walk to school (12/20 = 60%); in a school club of 50, 25 walk (25/50 = 50%). More club members walk, but walking is a bigger part of the class. Comparing only the frequencies of groups of different sizes is not fair.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 3', title: 'Comparing Groups of Different Sizes', subtitle: 'Compare the parts, not the counts' }],
      lines: [
        { say: 'Remember the question from the start of this lesson? Twelve walkers in one group, twenty-five in another. Which group walks more, for its size?', show: 'title' },
        { say: 'In this video, you will use relative frequency to compare groups of different sizes fairly.' },
      ],
    },
    {
      chapter: 'Two groups',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['How they get to school', 'Class', 'Club'], rows: [['Walk', '12', '25'], ['Bus', '5', '15'], ['Car', '3', '10'], ['**Total**', '**20**', '**50**']] }],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Which group walks more, **for its size**?' }],
      lines: [
        { say: 'A class of twenty students and a school club of fifty members said how they get to school.', show: 't' },
        { say: 'In the class, twelve students walk. In the club, twenty-five members walk.', focus: 't.0' },
        { say: 'The club has more walkers. But the club is a much bigger group: fifty members, compared with twenty students in the class.', focus: 't.3' },
        { say: 'So which group walks more, for its size? To find out, compare the relative frequencies.', show: 'q' },
      ],
    },
    {
      chapter: 'Compare the relative frequencies',
      layout: 'center',
      main: [
        bars('br'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\adj{\\text{Class: } \\tfrac{12}{20} = \\tfrac{60}{100} = 60\\%}', '\\opp{\\text{Club: } \\tfrac{25}{50} = \\tfrac{50}{100} = 50\\%}', '60\\% > 50\\%'] },
      ],
      lines: [
        { say: 'For the class, the relative frequency of walk is twelve out of twenty. Twenty times five is one hundred, so it is sixty out of one hundred: sixty percent.', show: ['br.cl-frame', 'br.cl-shade', 'br.cl-label', 'br.cl-name', 'm.0'], focus: 'm.0' },
        { say: 'For the club, it is twenty-five out of fifty. Fifty times two is one hundred, so it is fifty out of one hundred: fifty percent.', show: ['br.cb-frame', 'br.cb-shade', 'br.cb-label', 'br.cb-name', 'm.1'], focus: 'm.1' },
        { say: 'Sixty percent is more than fifty percent. The bars show it as well: a bigger part of the class bar is shaded.', show: 'm.2', focus: ['m.2', 'br.cl-shade'] },
        { say: 'So walking is a bigger part of the class, even though more club members walk.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing only the frequencies', md: '$25$ is more than $12$, but the club is much bigger. Comparing frequencies from groups of different sizes is **not fair**. Compare the **relative frequencies** instead.' },
      ],
      lines: [
        { say: 'Here is the mistake to avoid. Twenty-five is more than twelve, so it is tempting to say the club walks more.', show: 'oops' },
        { say: 'But the club is much bigger, so of course it can have more walkers. Comparing frequencies from groups of different sizes is not fair.', focus: 'oops' },
        { say: 'Compare the relative frequencies instead. They show what part of each group is in the category.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In Group P, $9$ of the $20$ students play soccer. In Group Q, $20$ of the $50$ students play soccer. Which is true?',
          choices: ['Group Q has the greater part, because $20$ is more than $9$.', 'Group P has the greater part: $45\\%$ compared with $40\\%$.', 'Both groups have the same part.', 'Groups of different sizes cannot be compared.'],
          answer: 1,
          working: 'Group P: $\\tfrac{9}{20} = \\tfrac{45}{100} = 45\\%$. Group Q: $\\tfrac{20}{50} = \\tfrac{40}{100} = 40\\%$. $45\\% > 40\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. In Group P, nine of the twenty students play soccer. In Group Q, twenty of the fifty students play soccer. Which is true? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B. Nine out of twenty is forty-five percent, and twenty out of fifty is forty percent. Choice A compares only the frequencies, which is not fair for groups of different sizes.', show: 'q.answer' },
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
          items: ['Groups of different sizes can have different totals.', 'Compare their relative frequencies, not their frequencies.', 'A total that is a factor of $100$ makes it easy: write each as a percentage.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Groups of different sizes have different totals.', show: 'sum.0' },
        { say: 'To compare them fairly, compare their relative frequencies, not their frequencies.', show: 'sum.1' },
        { say: 'Writing each one as a percentage makes the comparison easy. Great work! Next, you will use relative frequency to predict how likely something is.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
