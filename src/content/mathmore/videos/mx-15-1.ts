import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 10], y: [0, 100], xStep: 2, yStep: 20, width: 8, height: 5, titles: { x: '\\text{Revision (hours)}', y: '\\text{Mark}' } });
const data: [number, number][] = [[1, 38], [2, 35], [2.5, 52], [3, 45], [4, 58], [5, 50], [5.5, 66], [6, 61], [7, 74], [7.5, 64], [8, 80], [9, 77]];

const video: Explainer = {
  id: 'mx-15-1',
  lessonId: 'mx-15-1',
  title: 'Correlation and the Product Moment Correlation Coefficient',
  thumbnail: 'sc',
  summary: 'The product moment correlation coefficient r = Sxy ÷ √(Sxx Syy) lies between −1 and 1 and measures how close pairs are to a straight line: Sxx = 40, Syy = 90 and Sxy = 48 give r = 0.8. Correlation is not causation. To test it, use H₀: ρ = 0 and compare r with the critical value: with 10 pairs at 5%, r = 0.8 beats 0.5494, so there is evidence of positive correlation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Correlation and the Normal Distribution', title: 'Correlation', subtitle: 'The product moment correlation coefficient' }],
      lines: [
        { say: 'Students who revise for longer tend to score higher. But how strong is that link, and could a sample show it just by chance?', show: 'title' },
        { say: 'In this video, you will measure the strength of a straight-line link with a single number, and test whether it is real.' },
      ],
    },
    {
      chapter: 'Measuring correlation',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sc', [g, dots(g, data.map(([x, y], i) => ({ id: `d${i}`, x, y, group: 'pts' })))], 420)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'PMCC', md: 'Measures how close pairs $(x, y)$ are to a straight line. Always between $-1$ and $1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}'] },
      ],
      lines: [
        { say: 'Here are twelve students, with their revision time across and their test mark up. The points rise from left to right, close to a straight line.', show: ['sc.grid', 'sc.axes', 'sc.pts'] },
        { say: 'The product moment correlation coefficient, r, measures how close a set of pairs is to a straight line.', show: 'def' },
        { say: 'It is S x y over the square root of S x x times S y y, and it always lies between negative one and one.', show: 'm', focus: 'm' },
        { say: 'A value near one shows strong positive correlation, a value near negative one shows strong negative correlation, and a value near zero shows little or no straight-line link.' },
      ],
    },
    {
      chapter: 'Finding r',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$S_{xx} = 40$, $S_{yy} = 90$ and $S_{xy} = 48$. Find $r$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{48}{\\sqrt{40 \\times 90}} = \\dfrac{48}{60} = 0.8'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Correlation is not causation', md: 'Ice cream sales and sunburn cases are correlated, because both rise in hot weather.' },
      ],
      lines: [
        { say: 'For a sample, S x x is forty, S y y is ninety, and S x y is forty eight. Find r.', show: 'q' },
        { say: 'Forty times ninety is three thousand six hundred, and its square root is sixty. So r is forty eight over sixty, which is zero point eight: strong positive correlation.', caption: 'Forty times ninety is 3,600, and its square root is sixty. So r is 48 over 60, which is 0.8: strong positive correlation.', show: 'm', focus: 'm' },
        { say: 'Be careful what this means. A strong correlation shows that two quantities move together, not that one causes the other. Ice cream sales and sunburn cases are correlated, because both rise in hot weather.', show: 'mis' },
      ],
    },
    {
      chapter: 'Testing for correlation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'For $10$ students, $r = 0.8$. Test at the $5\\%$ level for positive correlation. Critical value: $0.5494$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['H_0: \\rho = 0, \\quad H_1: \\rho > 0', '0.8 > 0.5494: \\text{ significant}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Bigger samples need less', md: 'At $5\\%$: $10$ pairs need $r > 0.5494$, but $30$ pairs need only $r > 0.3061$.' },
      ],
      lines: [
        { say: 'A sample can show some correlation by chance even when the population has none. So the test is about the population correlation coefficient, rho.', show: 'q' },
        { say: 'The null hypothesis is rho equals zero: no correlation in the population. Testing for positive correlation, the alternative is rho greater than zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare r with the critical value for the sample size and significance level, given by a table or the question. Zero point eight is beyond zero point five four nine four, so the result is significant.', show: 'm.1', focus: 'm.1' },
        { say: 'Reject H nought: there is evidence of positive correlation between revision time and test mark.' },
        { say: 'The critical value falls as the sample grows, so a large sample needs a smaller r to be significant.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $12$ pairs, $r = -0.45$. Testing $H_1$: $\\rho < 0$ at the $5\\%$ level, the critical value is $-0.4973$. What is the conclusion?',
          choices: ['Reject $H_0$: evidence of negative correlation', 'Reject $H_0$: evidence of positive correlation', 'Do not reject $H_0$: not enough evidence of negative correlation', '$r$ proves there is no correlation'],
          answer: 2,
          working: '$-0.45$ is not beyond $-0.4973$, so the result is not significant.',
        },
      ],
      lines: [
        { say: 'Your turn. For twelve pairs, r is negative zero point four five. Testing for negative correlation at the five percent level, the critical value is negative zero point four nine seven three. What is the conclusion? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Negative zero point four five is not beyond negative zero point four nine seven three, so the result is not significant. There is not enough evidence of negative correlation.', show: 'q.answer' },
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
          items: ['$r = \\dfrac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}$, between $-1$ and $1$.', 'Correlation does not show causation.', 'Test $H_0$: $\\rho = 0$ against $\\rho > 0$, $\\rho < 0$ or $\\rho \\ne 0$.', 'Reject $H_0$ when $r$ is beyond the critical value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. r is S x y over the square root of S x x times S y y, and it lies between negative one and one.', show: 'sum.0' },
        { say: 'Correlation does not show that one thing causes the other.', show: 'sum.1' },
        { say: 'To test it, the null hypothesis is rho equals zero.', show: 'sum.2' },
        { say: 'And reject H nought when r is beyond the critical value. In the next lesson, we use the normal distribution in reverse. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
