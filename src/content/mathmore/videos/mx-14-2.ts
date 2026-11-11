import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-14-2',
  lessonId: 'mx-14-2',
  title: 'Variance, Standard Deviation and Coding',
  thumbnail: 'm',
  summary: 'The variance is the mean of the squares minus the square of the mean, σ² = Σx²/n − x̄², and the standard deviation σ is its square root. For 10 values with Σx = 120 and Σx² = 1580, the mean is 12 and σ = √14 ≈ 3.74. For coded data y = (x − a)/b, undo the code with x̄ = a + bȳ and σx = bσy: adding a constant never changes the spread.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'Variance, Standard Deviation and Coding', subtitle: 'Measuring spread from two totals' }],
      lines: [
        { say: 'The mean says where data sit. The standard deviation says how spread out they are.', show: 'title' },
        { say: 'With a large data set we rarely have every value to hand, but two totals are enough to find both. In this video, you will see how, and how coding makes awkward numbers easy.' },
      ],
    },
    {
      chapter: 'Variance and standard deviation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Variance', md: 'The mean of the squares minus the square of the mean. The **standard deviation** $\\sigma$ is its square root: the typical distance of the values from the mean.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bar{x} = \\frac{\\sum x}{n} \\qquad \\sigma^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2'] },
        { kind: 'text', id: 'f', md: 'For a frequency table, use $\\sum f$, $\\sum fx$ and $\\sum fx^2$.' },
      ],
      lines: [
        { say: 'The variance of n values is the mean of the squares, minus the square of the mean.', show: 'def' },
        { say: 'In symbols: x bar is the sum of x over n, and sigma squared is the sum of x squared over n, minus x bar squared.', show: 'm', focus: 'm' },
        { say: 'The standard deviation, sigma, is the square root of the variance. It measures the typical distance of the values from the mean, in the same units as the data.' },
        { say: 'For a frequency table, the same formulas work with the sum of f for n, the sum of f x, and the sum of f x squared.', show: 'f' },
      ],
    },
    {
      chapter: 'From the totals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'For $10$ values, $\\sum x = 120$ and $\\sum x^2 = 1580$. Find the mean and standard deviation.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bar{x} = \\tfrac{120}{10} = 12', '\\sigma^2 = \\tfrac{1580}{10} - 12^2 = 158 - 144 = 14', '\\sigma = \\sqrt{14} \\approx 3.74'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Square the mean, not the sum', md: 'Divide $\\sum x^2$ by $n$, then subtract $\\bar{x}^2$, the square of the **mean**.' },
      ],
      lines: [
        { say: 'For ten values, the sum of x is one hundred twenty, and the sum of x squared is one thousand five hundred eighty. Find the mean and the standard deviation.', caption: 'For 10 values, the sum of x is 120, and the sum of x squared is 1,580. Find the mean and the standard deviation.', show: 'q' },
        { say: 'The mean is one hundred twenty over ten, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The variance is one thousand five hundred eighty over ten, which is one hundred fifty eight, minus twelve squared, one hundred forty four. That leaves fourteen.', caption: 'The variance is 1,580 over 10, which is 158, minus 12 squared, 144. That leaves 14.', show: 'm.1', focus: 'm.1' },
        { say: 'So the standard deviation is the square root of fourteen, about three point seven four.', show: 'm.2', focus: 'm.2' },
        { say: 'Be careful to subtract the square of the mean, after dividing the sum of the squares by n.', show: 'mis' },
      ],
    },
    {
      chapter: 'Coding',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Undoing a code', md: 'For $y = \\dfrac{x - a}{b}$, write $x = a + by$. Then $\\bar{x} = a + b\\bar{y}$ and $\\sigma_x = b\\,\\sigma_y$.' },
        { kind: 'text', id: 'q', md: '$y = \\dfrac{x - 100}{5}$ has mean $2.4$ and standard deviation $1.5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bar{x} = 100 + 5(2.4) = 112', '\\sigma_x = 5(1.5) = 7.5'] },
      ],
      lines: [
        { say: 'Large or awkward values are easier to work with after coding, a change such as y equals x minus "a", all over b.', show: 'key' },
        { say: 'Taking away a constant moves the mean, but not the spread. Dividing by b divides both the mean and the standard deviation by b.' },
        { say: 'Data are coded with y equals x minus one hundred, over five. The coded values have mean two point four and standard deviation one point five.', show: 'q' },
        { say: 'To undo the code, write x equals one hundred plus five y. So the mean of x is one hundred plus five times two point four, which is one hundred twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The standard deviation is five times one point five, which is seven point five. The one hundred does not change the spread at all.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $8$ values, $\\sum x = 40$ and $\\sum x^2 = 232$. Find the variance.',
          choices: ['$2$', '$4$', '$29$', '$24$'],
          answer: 1,
          working: '$\\bar{x} = 5$, so $\\sigma^2 = \\dfrac{232}{8} - 5^2 = 29 - 25 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. For eight values, the sum of x is forty, and the sum of x squared is two hundred thirty two. Find the variance. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The mean is five. The variance is two hundred thirty two over eight, which is twenty nine, minus five squared, which leaves four. Choice A is the standard deviation.', show: 'q.answer' },
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
          items: ['$\\sigma^2 = \\dfrac{\\sum x^2}{n} - \\bar{x}^2$, and $\\sigma$ is its square root.', 'For a frequency table, use $\\sum f$, $\\sum fx$ and $\\sum fx^2$.', 'Coding $y = \\dfrac{x - a}{b}$: $\\bar{x} = a + b\\bar{y}$ and $\\sigma_x = b\\,\\sigma_y$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The variance is the mean of the squares minus the square of the mean, and the standard deviation is its square root.', show: 'sum.0' },
        { say: 'For a frequency table, use the sums with f.', show: 'sum.1' },
        { say: 'And to undo a code, multiply by b and add "a" for the mean, but only multiply by b for the standard deviation. In the next lesson, we find outliers and clean data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
