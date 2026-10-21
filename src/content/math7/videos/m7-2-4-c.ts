import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-6-figures.ts';

// 36 of 100 squares in blocks of 4: 9 of the 25 blocks, so 36% = 9/25.
const grid = figure('g', [hundredGrid({ block: [2, 2], shaded: 9, tone: 'theta', size: 0.6 })], 420);

const video: Explainer = {
  id: 'm7-2-4-c',
  lessonId: 'm7-2-4',
  title: 'Percents, Fractions and Decimals, Part 3: Percents and Fractions',
  thumbnailTitle: 'Percents and Fractions',
  thumbnail: 'g',
  summary:
    'To change a percent to a fraction, write it over 100 and simplify: 36% = 36/100 = 9/25. To change a fraction to a percent, make an equivalent fraction out of 100 (3/4 = 75/100 = 75%, 2/5 = 40/100 = 40%), or divide and multiply by 100 (3/8 = 0.375 = 37.5%). Worth knowing: 1/100 = 1%, 1/10 = 10%, 1/4 = 25%, 1/2 = 50%, 3/4 = 75%, 100/100 = 100%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 3', title: 'Percents and Fractions', subtitle: 'Out of one hundred, then simplify' }],
      lines: [
        { say: 'Thirty-six percent of a class has a pet. What fraction of the class is that? Three eighths of a pizza is left. What percent is that?', show: 'title' },
        { say: 'In this part, you will change percents into fractions, and fractions into percents.' },
      ],
    },
    {
      chapter: 'Percent to fraction',
      layout: 'split',
      leftWidth: 520,
      left: [grid],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Percent to fraction', md: 'Write the percent over $100$, then simplify.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['36\\% = \\dfrac{36}{100}', '= \\dfrac{36 \\div 4}{100 \\div 4} = \\dfrac{9}{25}'] },
      ],
      lines: [
        { say: 'To change a percent to a fraction, write it over one hundred, then simplify.', show: 'key' },
        { say: 'Thirty-six percent is thirty-six out of one hundred: thirty-six over one hundred.', show: ['g.grid', 'g.outline', 'g.shade', 'm.0'], focus: 'm.0' },
        { say: 'Thirty-six and one hundred are both divisible by four. Divide both by four, and you get nine twenty-fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'You can see it in the grid. Group the squares into blocks of four. There are twenty-five blocks, and nine of them are shaded.', show: 'g.blocks' },
      ],
    },
    {
      chapter: 'Fraction to percent: out of 100',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Fraction to percent', md: 'Make an equivalent fraction **out of $100$**. Or, if that is hard, **divide**, then multiply by $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} = \\dfrac{3 \\times 25}{4 \\times 25} = \\dfrac{75}{100} = 75\\%', '\\dfrac{2}{5} = \\dfrac{2 \\times 20}{5 \\times 20} = \\dfrac{40}{100} = 40\\%'] },
      ],
      lines: [
        { say: 'Going the other way, there are two methods. The first: make an equivalent fraction out of one hundred.', show: 'key' },
        { say: 'Three quarters: four times twenty-five is one hundred. Multiply the top and the bottom by twenty-five, and you get seventy-five out of one hundred. That is seventy-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Two fifths: five times twenty is one hundred. Multiply both by twenty, and you get forty out of one hundred, which is forty percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fraction to percent: divide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $\\dfrac{3}{8}$ as a percent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['100 \\text{ is not a multiple of } 8', '3 \\div 8 = 0.375', '0.375 \\times 100 = 37.5', '\\dfrac{3}{8} = 37.5\\%'] },
      ],
      lines: [
        { say: 'Now three eighths. Is one hundred a multiple of eight? Eight times twelve is ninety-six, and eight times thirteen is one hundred four. So no whole number times eight makes one hundred.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'So use the second method: divide. Three divided by eight is zero point three seven five.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply by one hundred, to change the decimal to a percent. The decimal point moves two places right: thirty-seven point five.', show: 'm.2', focus: 'm.2' },
        { say: 'Three eighths is thirty-seven point five percent.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Worth knowing by heart',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Fraction', 'Decimal', 'Percent'],
          rows: [
            ['$\\dfrac{1}{100}$', '$0.01$', '$1\\%$'],
            ['$\\dfrac{1}{10}$', '$0.1$', '$10\\%$'],
            ['$\\dfrac{1}{4}$', '$0.25$', '$25\\%$'],
            ['$\\dfrac{1}{2}$', '$0.5$', '$50\\%$'],
            ['$\\dfrac{3}{4}$', '$0.75$', '$75\\%$'],
            ['$\\dfrac{100}{100}$', '$1$', '$100\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Some of these come up so often that they are worth knowing by heart. One hundredth is zero point zero one, or one percent. One tenth is zero point one, or ten percent.', show: ['t.0', 't.1'] },
        { say: 'One quarter is zero point two five, or twenty-five percent. One half is zero point five, or fifty percent. Three quarters is zero point seven five, or seventy-five percent.', show: ['t.2', 't.3', 't.4'] },
        { say: 'And the whole, one hundred hundredths, is one, or one hundred percent.', show: 't.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{7}{20}$ as a percent.',
          choices: ['$7\\%$', '$35\\%$', '$20\\%$', '$0.35\\%$'],
          answer: 1,
          working: '$20 \\times 5 = 100$, so $\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write seven twentieths as a percent. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-five percent. Twenty times five is one hundred, so seven twentieths is thirty-five hundredths, which is thirty-five percent. Choice D is the decimal zero point three five with a percent sign, but it was never multiplied by one hundred.', show: 'q.answer' },
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
          items: ['Percent to fraction: write it over $100$ and simplify. $36\\% = \\dfrac{9}{25}$', 'Fraction to percent: make it out of $100$, or divide and multiply by $100$. $\\dfrac{3}{8} = 37.5\\%$', 'Know the benchmarks: $\\dfrac14 = 25\\%$, $\\dfrac12 = 50\\%$, $\\dfrac34 = 75\\%$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change a percent to a fraction, write it over one hundred and simplify.', show: 'sum.0' },
        { say: 'To change a fraction to a percent, make an equivalent fraction out of one hundred, or divide and then multiply by one hundred.', show: 'sum.1' },
        { say: 'And know the benchmarks by heart. In the next part, you will find a percent of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
