import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-1-figures.ts';

// A hundred grid with 35 squares shaded: 3 columns of ten and 5 more.
const grid = figure('g', [hundredGrid({ size: 6, tenths: 3, hundredths: 5, label: '35 \\text{ of } 100 \\text{ squares}' })], 440);

const video: Explainer = {
  id: 'm7-2-4',
  lessonId: 'm7-2-4',
  title: 'Percents, Fractions and Decimals, Part 1: What a Percent Is',
  thumbnailTitle: 'What a Percent Is',
  thumbnail: 'g',
  summary:
    'Percent means “out of 100”, and the whole is 100%. In a hundred grid with 35 of the 100 squares shaded, the shaded part is 35%, which is 35/100 = 7/20 as a fraction in lowest terms, and 35 hundredths = 0.35 as a decimal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 1', title: 'What a Percent Is', subtitle: 'Out of one hundred' }],
      lines: [
        { say: 'Thirty-five percent of students walk to school. A phone battery is at zero point eight. Three quarters of a class plays a sport. These are three different ways to show part of a whole.', show: 'title' },
        { say: 'In this lesson, you will change between percents, fractions and decimals, and find a percent of a number. This first part shows what a percent is.' },
      ],
    },
    {
      chapter: 'Out of one hundred',
      layout: 'split',
      leftWidth: 520,
      left: [grid],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent', md: '**Percent** means “out of $100$”. The symbol is $\\%$. So $35\\%$ means $35$ out of $100$, or $\\dfrac{35}{100}$. The whole is $100\\%$.' },
      ],
      lines: [
        { say: 'Here is a hundred grid. It is one whole, cut into one hundred equal squares.', show: ['g.frame', 'g.cols', 'g.rows'] },
        { say: 'Thirty-five of the squares are shaded: three columns of ten, and five more.', show: ['g.tenths', 'g.hundredths', 'g.label'] },
        { say: 'The word percent means out of one hundred. Its symbol looks like a slash with a small circle on each side. So thirty-five out of one hundred is thirty-five percent.', show: 'def' },
        { say: 'The whole grid, all one hundred squares, is one hundred percent.' },
      ],
    },
    {
      chapter: 'Percents all around',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A test score of $85\\%$: $85$ marks out of every $100$.', 'A battery at $80\\%$: $80$ parts out of $100$ are full.', '$100\\%$ juice: all of the drink is juice.', '$50\\%$ of a pizza: half of it.'],
        },
      ],
      lines: [
        { say: 'You see percents all around you. A test score of eighty-five percent means eighty-five marks for every one hundred.', show: 'b.0' },
        { say: 'A phone battery at eighty percent has eighty parts full out of one hundred.', show: 'b.1' },
        { say: 'One hundred percent juice means all of the drink is juice. And fifty percent of a pizza is fifty out of one hundred parts, which is half of it.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Three ways',
      layout: 'split',
      leftWidth: 520,
      left: [grid],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write the shaded part of the grid as a percent, a fraction and a decimal.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['35\\%', '\\dfrac{35}{100} = \\dfrac{35 \\div 5}{100 \\div 5} = \\dfrac{7}{20}', '35 \\text{ hundredths} = 0.35'] },
        { kind: 'text', id: 'a', size: 'md', md: '$35\\% = \\dfrac{7}{20} = 0.35$' },
      ],
      lines: [
        { say: 'Let’s write the shaded part in three ways: as a percent, a fraction and a decimal.', show: ['q', 'g.frame', 'g.cols', 'g.rows', 'g.tenths', 'g.hundredths', 'g.label'] },
        { say: 'As a percent: thirty-five out of one hundred squares is thirty-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'As a fraction: thirty-five over one hundred. Both numbers can be divided by five, so it simplifies to seven twentieths.', show: 'm.1', focus: 'm.1' },
        { say: 'As a decimal: thirty-five hundredths is zero point three five. The three columns are three tenths, and the five squares are five hundredths.', show: 'm.2', focus: ['m.2', 'g.tenths', 'g.hundredths'] },
        { say: 'So thirty-five percent, seven twentieths and zero point three five are three ways to write the same amount.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a hundred grid, $60$ of the $100$ squares are shaded. What fraction of the grid is shaded, in lowest terms?',
          choices: ['$\\dfrac{3}{5}$', '$\\dfrac{6}{100}$', '$\\dfrac{3}{50}$', '$\\dfrac{6}{10}$'],
          answer: 0,
          working: '$60\\% = \\dfrac{60}{100}$. Divide both by $20$: $\\dfrac{3}{5}$. $\\dfrac{6}{10}$ has the same value, but it is not in lowest terms.',
        },
      ],
      lines: [
        { say: 'Your turn. In a hundred grid, sixty of the one hundred squares are shaded. What fraction of the grid is shaded, in lowest terms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three fifths. Sixty out of one hundred is sixty hundredths. Divide both by twenty to get three fifths. Choice D is equal in value, but it is not in lowest terms.', show: 'q.answer' },
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
          items: ['**Percent** means “out of $100$”. The whole is $100\\%$.', '$35\\%$ means $35$ out of $100$: $\\dfrac{35}{100} = \\dfrac{7}{20}$.', 'As a decimal, $35\\%$ is $35$ hundredths: $0.35$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Percent means out of one hundred, and the whole is one hundred percent.', show: 'sum.0' },
        { say: 'Thirty-five percent is thirty-five out of one hundred, which simplifies to seven twentieths.', show: 'sum.1' },
        { say: 'As a decimal, it is thirty-five hundredths, or zero point three five. In the next part, you will change between percents and decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
