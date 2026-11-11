import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-28-4',
  lessonId: 'mx-28-4',
  title: 'The Chi-Squared Tests',
  thumbnail: 'm',
  summary: 'The chi-squared statistic Σ(O − E)²/E compares observed and expected frequencies, and H₀ is rejected when it is more than the critical value. In a goodness of fit test the expected frequencies come from the distribution in H₀, with k − 1 degrees of freedom. In a test for independence, E = row total × column total ÷ grand total, with (r − 1)(c − 1) degrees of freedom. Expected frequencies below 5 need combining.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Regression, Expected Value and Statistical Tests', title: 'The Chi-Squared Tests', subtitle: 'Observed against expected' }],
      lines: [
        { say: 'Is a spinner fair? Does the way students travel to school depend on their age? Both questions compare the counts we observe with the counts we would expect if a hypothesis were true.', show: 'title' },
        { say: 'In this video, you will learn the chi-squared statistic, and use it for a goodness of fit test and a test for independence.' },
      ],
    },
    {
      chapter: 'The statistic',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Chi-squared statistic', md: 'Compares observed frequencies $O$ with expected frequencies $E$. A large value means the data are far from what $H_0$ predicts.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\chi^2_{calc} = \\sum \\dfrac{(O - E)^2}{E}'] },
      ],
      lines: [
        { say: 'For each category, square the difference between the observed and expected frequencies, divide by the expected frequency, and add them all up.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'We reject the null hypothesis when this value is more than the critical value for the significance level and the number of degrees of freedom. A calculator’s p-value gives the same decision.' },
      ],
    },
    {
      chapter: 'Goodness of fit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A spinner with four equal sections lands on them $18$, $30$, $27$ and $25$ times. Critical value at $5\\%$: $7.815$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['H_0: \\text{fair}, \\quad E = \\dfrac{100}{4} = 25', '\\chi^2_{calc} = \\dfrac{49}{25} + \\dfrac{25}{25} + \\dfrac{4}{25} + \\dfrac{0}{25} = 3.12', '\\nu = 4 - 1 = 3, \\quad 3.12 < 7.815'] },
      ],
      lines: [
        { say: 'A goodness of fit test checks whether data fit a given distribution. A spinner with four equal sections is spun a hundred times.', show: 'q' },
        { say: 'If the spinner is fair, each section is expected twenty-five times.', show: 'm.0', focus: 'm.0' },
        { say: 'The differences are negative seven, five, two and zero. Squaring and dividing by twenty-five gives a total of three point one two.', show: 'm.1', focus: 'm.1' },
        { say: 'For k categories there are k minus one degrees of freedom, here three. Three point one two is less than the critical value, so we do not reject the null hypothesis: there is not enough evidence that the spinner is unfair.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Independence',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['E = \\dfrac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}', 'E = \\dfrac{80 \\times 90}{200} = 36', '\\nu = (\\text{rows} - 1)(\\text{columns} - 1)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Very small expected frequencies', md: 'If an expected frequency is below $5$, combine rows or columns first, which changes $\\nu$.' },
      ],
      lines: [
        { say: 'A test for independence uses a contingency table, which counts the data under two variables at once. The null hypothesis says the two variables are independent. Then each expected frequency is the row total times the column total, over the grand total.', show: 'm.0', focus: 'm.0' },
        { say: 'In a survey of two hundred people, eighty are under thirty and ninety prefer tea. If age and drink are independent, the expected number of people under thirty who prefer tea is thirty-six.', show: 'm.1', focus: 'm.1' },
        { say: 'The degrees of freedom are the number of rows minus one, times the number of columns minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'The test is not reliable when an expected frequency is below five. Then rows or columns are combined first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many degrees of freedom does a test for independence on a $3 \\times 4$ contingency table have?',
          choices: ['$12$', '$11$', '$7$', '$6$'],
          answer: 3,
          working: '$\\nu = (3 - 1)(4 - 1) = 2 \\times 3 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many degrees of freedom does a test for independence have on a table with three rows and four columns? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Three minus one is two, four minus one is three, and two times three is six. Choice B uses the number of cells minus one, which is for a goodness of fit test.', show: 'q.answer' },
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
          items: ['$\\chi^2_{calc} = \\sum \\dfrac{(O - E)^2}{E}$; reject $H_0$ above the critical value.', 'Goodness of fit: $\\nu = k - 1$.', 'Independence: $E = \\dfrac{\\text{row} \\times \\text{column}}{\\text{grand total}}$, $\\nu = (r - 1)(c - 1)$.', 'Combine categories when $E < 5$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The chi-squared statistic adds O minus E, squared, over E. Reject the null hypothesis when it is more than the critical value.', show: 'sum.0' },
        { say: 'In a goodness of fit test, there are k minus one degrees of freedom.', show: 'sum.1' },
        { say: 'In a test for independence, expected frequencies come from the totals, with r minus one times c minus one degrees of freedom.', show: 'sum.2' },
        { say: 'And combine categories when an expected frequency is below five. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
