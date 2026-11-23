import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 5.3 (lines of best fit, interpolation and extrapolation). The
// question is a "Check Your Understanding" from OpenStax Contemporary Mathematics, word for word
// (section 8.9, Scatter Plots, Correlation, and Regression Lines, CC BY-NC-SA 4.0), with its set's
// regression equation in front of it. y = 0.161(30,000) + 2,645 = 4,830 + 2,645 = 7,475, so the
// predicted salary is $7,475, as in the book's answer. The book's next part notes that one college
// charging $34,880 pays $1,495.68 less than its prediction, which the video uses to show that a
// prediction is an estimate.

const QUESTION =
  'The regression equation used to predict average monthly faculty salary (FacSal) from out-of-state tuition (OutState) using the data in “TNSchools” is y = 0.161x + 2645. Predict the average monthly faculty salary for a school that charges $30,000 in out-of-state tuition.';

const video: Explainer = {
  id: 'xq-m303-5-3',
  lessonId: '',
  exam: {
    lesson: 'm303-5-3',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 8.9, Scatter Plots, Correlation, and Regression Lines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-9-scatter-plots-correlation-and-regression-lines',
    question: QUESTION,
  },
  title: 'Exam Question: Predicting a Salary From a Line of Best Fit (Lines of Best Fit)',
  thumbnailTitle: 'Predict It From the Line',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: the line of best fit y = 0.161x + 2645 predicts average monthly faculty salary from out-of-state tuition. What salary does it predict for a school charging $30,000? We substitute x = 30,000: 0.161 × 30,000 = 4,830, plus 2,645, gives $7,475. Then we check with the slope and look at the traps, including why a prediction is only an estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Predict It From the Line', subtitle: 'Lines of best fit, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using a line of best fit. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'The regression equation used to predict average monthly faculty salary (FacSal) from out-of-state tuition (OutState) using the data in “TNSchools” is $y = 0.161x + 2645$. Predict the average monthly faculty salary for a school that charges \\$30,000 in out-of-state tuition.',
          answer: '\\$7,475',
          working: '$0.161(30{,}000) + 2{,}645 = 4{,}830 + 2{,}645 = 7{,}475$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'The regression equation used to predict average monthly faculty salary from out-of-state tuition, using the data in T N Schools, is y equals 0.161 x plus 2,645. Predict the average monthly faculty salary for a school that charges 30,000 dollars in out-of-state tuition.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'xy',
          head: ['Letter', 'Stands for'],
          rows: [
            ['$x$', 'out-of-state **tuition**, in dollars: what we know'],
            ['$y$', 'average monthly faculty **salary**, in dollars: what we predict'],
          ],
        },
      ],
      lines: [
        { say: 'Someone drew the line that best fits a scatter plot of schools. Across is the tuition the school charges, x. Up is the average monthly salary of its teachers, y.', show: 'xy' },
        { say: 'We know x, the tuition, and we use the line to predict y, the salary.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fit', tone: 'definition', title: 'Line of best fit', md: 'A straight line through the **middle** of the points on a scatter plot. Its equation **predicts** $y$ from $x$.' },
        { kind: 'callout', id: 'ext', tone: 'tip', title: 'Interpolate or extrapolate', md: 'Predicting **inside** the range of the data is interpolation. Going far **outside** it, extrapolation, is less trustworthy.' },
      ],
      lines: [
        { say: 'Here is what we need. A line of best fit runs through the middle of the points on a scatter plot. Its equation predicts y from x.', show: 'fit' },
        { say: 'A prediction inside the range of the data is called interpolation. Going far outside the data, called extrapolation, is less trustworthy, because the pattern may not continue.', show: 'ext' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Substitute** $x = 30{,}000$', '**Multiply** by the slope', '**Add** the intercept'] }],
      lines: [
        { say: 'Here is the plan. First, substitute 30,000 for x.', show: 'plan.0' },
        { say: 'Second, multiply by the slope, 0.161.', show: 'plan.1' },
        { say: 'Third, add the intercept, 2,645.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 0.161x + 2{,}645', 'y = 0.161(30{,}000) + 2{,}645'] }],
      lines: [
        { say: 'Step one. Start with the equation.', show: 'm.0' },
        { say: 'The tuition is 30,000 dollars, so put 30,000 in for x. Write the whole number, not 30.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.161 \\times 30{,}000 = \\good{4{,}830}'] }],
      lines: [
        { say: 'Step two. Multiply first: 0.161 times 30,000 is 4,830.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 4{,}830 + 2{,}645', 'y = \\good{7{,}475}'] }],
      lines: [
        { say: 'Step three. Add the intercept: 4,830 plus 2,645.', show: 'm.0' },
        { say: 'That is 7,475. The line predicts an average monthly faculty salary of 7,475 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{every } 1{,}000 \\text{ of tuition: } 0.161 \\times 1{,}000 = 161', '30 \\times 161 = 4{,}830, \\quad 4{,}830 + 2{,}645 = 7{,}475 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the slope. Every 1,000 dollars of tuition adds 0.161 times 1,000, which is 161 dollars to the predicted salary.', show: 'm.0' },
        { say: '30,000 dollars is 30 thousands, and 30 times 161 is 4,830. Add 2,645 to get 7,475 again. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$0.161(30) + 2645$', 'the tuition is $30{,}000$, not $30$'],
            ['$0.161(30{,}000 + 2645)$', 'only $x$ is multiplied by the **slope**'],
            ['every school pays \\$7,475', 'a line of best fit gives an **estimate**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x is the tuition in dollars, so substitute 30,000, not 30. Using 30 predicts about 2,650 dollars.' },
        { say: 'Only x is multiplied by the slope. The intercept is added after.' },
        { say: 'And a line of best fit gives an estimate. In the same exercise, the book shows a college that pays about 1,500 dollars less than its line predicts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A line of best fit for the price of a used car, $y$ dollars, is $y = {-1{,}500}x + 24{,}000$, where $x$ is the car\'s age in years. Predict the price of a car that is $6$ years old.',
          choices: ['\\$33,000', '\\$15,000', '\\$9,000', '\\$22,500'],
          answer: 1,
          working: '${-1{,}500}(6) + 24{,}000 = {-9{,}000} + 24{,}000 = 15{,}000$',
        },
      ],
      lines: [
        { say: 'Your turn. A line of best fit for the price of a used car, y dollars, is y equals negative 1,500 x plus 24,000, where x is the car\'s age in years. Predict the price of a car that is 6 years old. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative 1,500 times 6 is negative 9,000. Add 24,000 to get 15,000 dollars: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Know what $x$ and $y$ **stand for**', '**Substitute** the full value of $x$', 'Multiply by the slope, then **add** the intercept', 'A prediction is an **estimate**'] }],
      lines: [
        { say: 'Here is what to remember. Know what x and y stand for.', show: 'sum.0' },
        { say: 'Substitute the full value of x.', show: 'sum.1' },
        { say: 'Multiply by the slope, then add the intercept.', show: 'sum.2' },
        { say: 'And remember that a prediction is an estimate. For more on lines of best fit, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
