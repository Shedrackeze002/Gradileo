import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 7.5 (scatterplots and lines of best fit): cricket chirps and
// air temperature. The question is OpenStax College Algebra 2e's own worked example, word for
// word (section 4.3, Fitting Linear Models to Data, CC BY-NC-SA 4.0), with the book's table and
// its line of best fit, T(c) = 1.2c + 30, written out in brackets. (a) 30 chirps is inside the
// data (18.5 to 44), so interpolation: T(30) = 66 °F, reasonable. (b) 40 °F is outside the data
// (52 to 80.5 °F), so extrapolation: c ≈ 8.33 chirps, and less trustworthy.

const DATA: Array<[number, number]> = [[44, 80.5], [35, 70.5], [20.4, 57], [33, 66], [31, 68], [35, 72], [18.5, 52], [37, 73.5], [26, 53]];

/** The scatter plot, with chirps drawn from 15 and temperature from 45 °F. */
const plot = (height = 460, marks = true): DiagramEl => {
  const X = (c: number) => c - 15;
  const Y = (t: number) => t - 45;
  const points: Record<string, [number, number]> = {
    O: [0, 0], XE: [33, 0], YE: [0, 40], L0: [X(15), Y(48)], L1: [X(47), Y(86.4)],
    P: [X(30), Y(66)], P0: [X(30), 0], P1: [0, Y(66)],
    D0: [X(18.5), 0], D1: [X(18.5), 38], E0: [X(44), 0], E1: [X(44), 38],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xaxis', from: 'O', to: 'XE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'O', to: 'YE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'XE', tex: 'c', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'YE', tex: 'T', place: 'above', group: 'axes' },
  ];
  for (const c of [20, 30, 40]) {
    points[`tx${c}`] = [X(c), 0];
    items.push({ kind: 'label', id: `tx${c}`, at: `tx${c}`, tex: String(c), place: 'below', group: 'axes' });
  }
  for (const t of [50, 80]) {
    points[`ty${t}`] = [0, Y(t)];
    items.push({ kind: 'label', id: `ty${t}`, at: `ty${t}`, tex: `${t}^\\circ`, place: 'left', group: 'axes' });
  }
  DATA.forEach(([c, t], i) => {
    points[`d${i}`] = [X(c), Y(t)];
    items.push({ kind: 'label', id: `d${i}`, at: `d${i}`, tex: '', dot: true, tone: 'adj', group: 'dots' });
  });
  items.push(
    { kind: 'line', id: 'fitline', from: 'L0', to: 'L1', tone: 'brand', weight: 4, group: 'fit' },
    { kind: 'label', id: 'fitl', at: 'L1', tex: 'T = 1.2c + 30', place: 'right', tone: 'brand', group: 'fit' },
  );
  // The data range and the prediction, left out where they would give the answer away.
  if (marks) items.push(
    { kind: 'line', id: 'lo', from: 'D0', to: 'D1', tone: 'muted', dashed: true, group: 'range' },
    { kind: 'line', id: 'hi', from: 'E0', to: 'E1', tone: 'muted', dashed: true, group: 'range' },
    { kind: 'line', id: 'g0', from: 'P0', to: 'P', tone: 'good', dashed: true, group: 'pred' },
    { kind: 'line', id: 'g1', from: 'P', to: 'P1', tone: 'good', dashed: true, group: 'pred' },
    { kind: 'label', id: 'p', at: 'P', tex: '', dot: true, tone: 'good', group: 'pred' },
    { kind: 'label', id: 'pt', at: 'P1', tex: '66^\\circ', place: 'left', tone: 'good', group: 'pred' },
  );
  return { kind: 'diagram', id: 'pl', height, points, items };
};
const PLOT = ['pl', 'pl.axes', 'pl.dots'];

const QUESTION =
  'Use the cricket data from the table to answer the following questions: (a) Would predicting the temperature when crickets are chirping 30 times in 15 seconds be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable. (b) Would predicting the number of chirps crickets will make at 40 degrees be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable. [The table gives the number of cricket chirps in 15 seconds and the air temperature in degrees Fahrenheit: 44 and 80.5, 35 and 70.5, 20.4 and 57, 33 and 66, 31 and 68, 35 and 72, 18.5 and 52, 37 and 73.5, 26 and 53. The line of best fit the book draws for this data is T(c) = 1.2c + 30.]';

const video: Explainer = {
  id: 'xq-m10c-7-5',
  lessonId: '',
  exam: {
    lesson: 'm10c-7-5',
    source: 'OpenStax, College Algebra 2e, Example in section 4.3, Fitting Linear Models to Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-3-fitting-linear-models-to-data',
    question: QUESTION,
  },
  title: 'Exam Question: Cricket Chirps and Temperature. Interpolation or Extrapolation?',
  thumbnailTitle: 'Cricket Chirps and Temperature',
  thumbnail: 'pl',
  summary:
    'A real test question, solved one small step at a time: crickets chirp faster when it is warmer, and a line of best fit, T(c) = 1.2c + 30, models the data. We predict the temperature at 30 chirps (66 °F, interpolation, reasonable) and the chirps at 40 °F (about 8.33, extrapolation, much less trustworthy), and see why on the scatter plot. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Cricket Chirps and Temperature', subtitle: 'Lines of best fit, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using a line of best fit to make predictions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use the cricket data from the table to answer the following questions: (a) Would predicting the temperature when crickets are chirping $30$ times in $15$ seconds be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable. (b) Would predicting the number of chirps crickets will make at $40$ degrees be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable.',
          answer: '(a) Interpolation: $T(30) = 66^\\circ$F, reasonable. (b) Extrapolation: $c \\approx 8.33$ chirps, not reliable.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Use the cricket data from the table to answer the following questions. Part a: would predicting the temperature when crickets are chirping 30 times in 15 seconds be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable.' },
        { say: 'Part b: would predicting the number of chirps crickets will make at 40 degrees be interpolation or extrapolation? Make the prediction, and discuss whether it is reasonable.' },
        { say: 'The question comes with a table of data. Here it is.' },
      ],
    },
    {
      chapter: 'The data',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'data',
          head: ['Chirps in 15 s', ...DATA.map(([c]) => String(c))],
          rows: [['Temperature ($^\\circ$F)', ...DATA.map(([, t]) => String(t))]],
        },
        { kind: 'text', id: 't0', size: 'md', md: 'The book’s line of best fit for this data is $T(c) = 1.2c + 30$.' },
      ],
      lines: [
        { say: 'The table gives the number of chirps in 15 seconds and the temperature in degrees Fahrenheit, on nine evenings.', show: 'data' },
        { say: 'The book’s line of best fit for this data is T of c equals 1.2 c plus 30. If you would like to try the question first, pause the video now.', show: 't0', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [plot(460, false)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Each dot is one evening: **chirps** in $15$ s across, **temperature** in $^\\circ$F up. The line of best fit is $T(c) = 1.2c + 30$.' }],
      lines: [
        { say: 'Here is the data as a scatter plot. Each dot is one count: the number of chirps in 15 seconds across, and the temperature in degrees Fahrenheit up.', show: [...PLOT, 't'] },
        { say: 'The dots rise from left to right, so crickets chirp faster when it is warmer. The line of best fit, T equals 1.2 c plus 30, runs through the middle of them.', show: 'pl.fit', focus: 'pl.fit' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'inter', tone: 'definition', title: 'Interpolation', md: 'Predicting **inside** the range of the data. Usually **reasonable**.' },
        { kind: 'callout', id: 'extra', tone: 'mistake', title: 'Extrapolation', md: 'Predicting **outside** the range of the data. **Risky**: the pattern may not continue.' },
      ],
      lines: [
        { say: 'Here is what we need. Interpolation means predicting inside the range of the data we have. Those predictions are usually reasonable.', show: 'inter' },
        { say: 'Extrapolation means predicting outside that range. That is risky, because the pattern may not carry on beyond the data.', show: 'extra' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **range** of the data', 'Inside or outside? Then **predict** with the line', 'Say whether it is **reasonable**'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, find the range of the data.', show: 'plan.0' },
        { say: 'Second, decide whether the value is inside or outside it, and make the prediction with the line.', show: 'plan.1' },
        { say: 'Third, say whether the prediction is reasonable.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a), 30 chirps',
      layout: 'split',
      left: [plot()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['18.5 \\le c \\le 44: \\ 30 \\text{ is inside}', 'T(30) = 1.2(30) + 30 = \\good{66^\\circ\\text{F}}'] }],
      lines: [
        { say: 'Step one, part a. The chirps in the data go from 18.5 to 44. 30 is inside that range, so this is interpolation.', show: [...PLOT, 'pl.fit', 'pl.range', 'm.0'], focus: 'pl.range' },
        { say: 'Predict with the line: 1.2 times 30 is 36, plus 30 is 66. So at 30 chirps, we predict 66 degrees Fahrenheit.', show: ['pl.pred', 'm.1'], focus: 'pl.pred' },
        { say: 'That is reasonable: it sits right among the dots, between counts of 26 and 31 chirps at 53 and 68 degrees.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b), 40 degrees',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['52 \\le T \\le 80.5: \\ 40 \\text{ is outside}', '40 = 1.2c + 30', '10 = 1.2c, \\quad c = \\dfrac{10}{1.2} \\approx \\good{8.33}'] }],
      lines: [
        { say: 'Step two, part b. The temperatures in the data go from 52 to 80.5 degrees. 40 degrees is outside that range, colder than any count we have. So this is extrapolation.', show: 'm.0' },
        { say: 'Predict with the line anyway: set T equal to 40, so 40 equals 1.2 c plus 30.', show: 'm.1' },
        { say: 'Take away 30: 10 equals 1.2 c. Divide by 1.2: c is about 8.33 chirps in 15 seconds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Is it reasonable?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'key', title: '(a) Interpolation: 66 °F', md: 'Inside the data, close to real counts: **reasonable**.' },
        { kind: 'callout', id: 'b', tone: 'mistake', title: '(b) Extrapolation: about 8.33 chirps', md: 'Far outside the data: the line may not hold when it is that cold, so it is **not reliable**.' },
      ],
      lines: [
        { say: 'Step three. Part a is interpolation, inside the data and close to real counts, so 66 degrees is a reasonable prediction.', show: 'a' },
        { say: 'Part b is extrapolation, 12 degrees colder than anything measured. Crickets may chirp much less, or stop altogether, when it is that cold, so the line may not hold. The prediction of about 8.33 chirps is not reliable.', show: 'b' },
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
            ['$T(40) = 78$', 'in (b), $40$ is the **temperature**: solve for $c$'],
            ['"It is on the line, so it is right"', 'a line can be extended forever, but the **data** cannot'],
            ['Checking (b) against the chirp range', '(b) gives a temperature: check the **temperature** range'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'In part b, 40 is a temperature, not a number of chirps. Putting 40 in for c gives 78 degrees, which answers a different question. Set T equal to 40 and solve for c.' },
        { say: 'Any value can be put into the equation, but that does not make the answer trustworthy. The line only describes the data we have.' },
        { say: 'And check the right range. In part b we know the temperature, so compare it with the temperature range, 52 to 80.5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'With the same line, $T(c) = 1.2c + 30$, what temperature can we predict if we counted $20$ chirps in $15$ seconds?',
          choices: ['$54^\\circ$F', '$50^\\circ$F', '$24^\\circ$F', '$62^\\circ$F'],
          answer: 0,
          working: '$T(20) = 1.2(20) + 30 = 24 + 30 = 54^\\circ$F, and $20$ chirps is inside the data.',
        },
      ],
      lines: [
        { say: 'Your turn. With the same line, T of c equals 1.2 c plus 30, what temperature can we predict if we counted 20 chirps in 15 seconds? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '1.2 times 20 is 24, plus 30 is 54 degrees Fahrenheit, choice A. 20 chirps is inside the data, so this is interpolation. B adds 20 and 30, and C forgets to add the 30.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line of best fit runs through the **middle** of the dots', '**Interpolation**: inside the data, usually reasonable', '**Extrapolation**: outside the data, risky', 'Know which variable you are given'] }],
      lines: [
        { say: 'Here is what to remember. A line of best fit runs through the middle of the dots.', show: 'sum.0' },
        { say: 'Interpolation predicts inside the data, and is usually reasonable.', show: 'sum.1' },
        { say: 'Extrapolation predicts outside the data, and is risky.', show: 'sum.2' },
        { say: 'And know which variable you are given before you use the equation. For more on scatterplots and lines of best fit, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
