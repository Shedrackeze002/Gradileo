import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 7.1 (slope-intercept form): F = (9/5)C + 32. The question is
// OpenStax Elementary Algebra 2e's own worked example, word for word (section 4.5, Use the
// Slope-Intercept Form of an Equation of a Line, CC BY-NC-SA 4.0): F = 32 at 0 °C, F = 68 at
// 20 °C, the slope 9/5 means 9 °F more for every 5 °C more, and the F-intercept (0, 32) means
// 0 °C is 32 °F.

/** F against C, with F drawn at 0.4 of its size so the graph is not too tall. */
const graph = (height = 460): DiagramEl => {
  const s = 0.4;
  return {
    kind: 'diagram',
    id: 'g',
    height,
    points: { O: [0, 0], X: [46, 0], Y: [0, 46], A: [0, 32 * s], B: [20, 68 * s], E: [40, 104 * s], R: [20, 32 * s] },
    items: [
      { kind: 'line', id: 'xaxis', from: 'O', to: 'X', tone: 'ink', arrow: true, group: 'axes' },
      { kind: 'line', id: 'yaxis', from: 'O', to: 'Y', tone: 'ink', arrow: true, group: 'axes' },
      { kind: 'label', id: 'xl', at: 'X', tex: 'C', place: 'right', group: 'axes' },
      { kind: 'label', id: 'yl', at: 'Y', tex: 'F', place: 'above', group: 'axes' },
      { kind: 'line', id: 'line', from: 'A', to: 'E', tone: 'brand', weight: 5 },
      { kind: 'label', id: 'a', at: 'A', tex: '(0, 32)', place: 'left', dot: true, tone: 'good' },
      { kind: 'label', id: 'b', at: 'B', tex: '(20, 68)', place: 'right', dot: true, tone: 'adj' },
      { kind: 'line', id: 'run', from: 'A', to: 'R', tone: 'adj', dashed: true, label: '\\text{run } 20', labelSide: 'right', group: 'tri' },
      { kind: 'line', id: 'rise', from: 'R', to: 'B', tone: 'opp', dashed: true, label: '\\text{rise } 36', labelSide: 'right', group: 'tri' },
    ],
  };
};

const QUESTION =
  'The equation F = (9/5)C + 32 is used to convert temperatures, C, on the Celsius scale to temperatures, F, on the Fahrenheit scale. (a) Find the Fahrenheit temperature for a Celsius temperature of 0. (b) Find the Fahrenheit temperature for a Celsius temperature of 20. (c) Interpret the slope and F-intercept of the equation. (d) Graph the equation.';

const video: Explainer = {
  id: 'xq-m10c-7-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-7-1',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 4.5, Use the Slope-Intercept Form of an Equation of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-5-use-the-slope-intercept-form-of-an-equation-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: Celsius to Fahrenheit, F = (9/5)C + 32. Slope-Intercept Form',
  thumbnailTitle: 'Celsius to Fahrenheit',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: the line F = (9/5)C + 32 changes Celsius to Fahrenheit. We put in C = 0 and C = 20 to get 32 °F and 68 °F, explain what the slope 9/5 and the F-intercept 32 mean, and graph the line from its intercept. Then we check with boiling water and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Celsius to Fahrenheit', subtitle: 'Slope-intercept form, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a line in slope intercept form. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The equation $F = \\dfrac{9}{5}C + 32$ is used to convert temperatures, $C$, on the Celsius scale to temperatures, $F$, on the Fahrenheit scale. (a) Find the Fahrenheit temperature for a Celsius temperature of $0$. (b) Find the Fahrenheit temperature for a Celsius temperature of $20$. (c) Interpret the slope and $F$-intercept of the equation. (d) Graph the equation.',
          answer: '(a) $32^\\circ$F (b) $68^\\circ$F (c) $F$ rises $9^\\circ$ for every $5^\\circ$ rise in $C$; $0^\\circ$C is $32^\\circ$F. (d) The line through $(0, 32)$ and $(20, 68)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The equation F equals 9 fifths C plus 32 is used to convert temperatures, C, on the Celsius scale to temperatures, F, on the Fahrenheit scale.' },
        { say: 'Part a: find the Fahrenheit temperature for a Celsius temperature of 0. Part b: find it for a Celsius temperature of 20. Part c: interpret the slope and F intercept of the equation. Part d: graph the equation.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['F = \\underbrace{\\tfrac{9}{5}}_{m}\\,C + \\underbrace{32}_{b}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Celsius goes **in**, Fahrenheit comes **out**. The equation has the shape $y = mx + b$, with $C$ for $x$ and $F$ for $y$.' },
      ],
      lines: [
        { say: 'The equation takes a Celsius temperature in, and gives the Fahrenheit temperature out.', show: 't' },
        { say: 'It has the same shape as y equals m x plus b, just with C in place of x and F in place of y. So the slope is 9 fifths, and the intercept is 32.', show: 'm' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Slope-intercept form', md: 'In $y = mx + b$, the **slope** $m$ is how much $y$ changes for each $1$ that $x$ changes, and the **intercept** $b$ is the value of $y$ when $x = 0$.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['m = \\dfrac{\\text{rise}}{\\text{run}}'] },
      ],
      lines: [
        { say: 'Here is what we need. In y equals m x plus b, the slope m tells us how much y changes when x goes up by 1. The intercept b is the value of y when x is 0.', show: 'def' },
        { say: 'And a slope is rise over run, so a slope of 9 fifths means a rise of 9 for a run of 5.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put in $C = 0$, then $C = 20$', 'Say what $m$ and $b$ **mean**', '**Graph**: start at the intercept, then use the slope'] }],
      lines: [
        { say: 'Here is the plan. First, put in C equals 0, then C equals 20.', show: 'plan.0' },
        { say: 'Second, say what the slope and the intercept mean.', show: 'plan.1' },
        { say: 'Third, graph the line: start at the intercept, then use the slope.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two temperatures',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = 0: \\ F = \\tfrac{9}{5}(0) + 32 = \\good{32}', 'C = 20: \\ F = \\tfrac{9}{5}(20) + 32 = 36 + 32 = \\good{68}'] }],
      lines: [
        { say: 'Step one. For C equals 0: 9 fifths of 0 is 0, plus 32 is 32. So 0 degrees Celsius is 32 degrees Fahrenheit. That is part a.', show: 'm.0' },
        { say: 'For C equals 20: 9 fifths of 20 is 36, because 20 divided by 5 is 4, and 4 times 9 is 36. Then 36 plus 32 is 68. So 20 degrees Celsius is 68 degrees Fahrenheit. That is part b.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: What m and b mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'slope', tone: 'key', title: 'Slope 9/5', md: 'When the Celsius temperature goes **up $5^\\circ$**, the Fahrenheit temperature goes **up $9^\\circ$**.' },
        { kind: 'callout', id: 'int', tone: 'key', title: 'F-intercept 32', md: 'When it is **$0^\\circ$ Celsius**, it is **$32^\\circ$ Fahrenheit**: water freezes.' },
      ],
      lines: [
        { say: 'Step two. The slope, 9 fifths, is a rise of 9 for a run of 5. So when the Celsius temperature goes up 5 degrees, the Fahrenheit temperature goes up 9 degrees.', show: 'slope' },
        { say: 'The F intercept, 32, is F when C is 0. So 0 degrees Celsius is 32 degrees Fahrenheit, the temperature at which water freezes. That is part c.', show: 'int' },
      ],
    },
    {
      chapter: 'Step 3: Graph it',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{start at } (0, 32)', '\\dfrac{9}{5} = \\dfrac{36}{20}: \\ \\text{run } 20, \\text{ rise } 36', '\\text{to } (20, 68)'] }],
      lines: [
        { say: 'Step three. Start at the F intercept, the point at 0, 32.', show: ['g', 'g.axes', 'g.a', 'm.0'], focus: 'g.a' },
        { say: 'Steps of 5 and 9 are tiny on this scale, so use a bigger step with the same slope. 9 fifths is the same as 36 over 20, so run 20 to the right and rise 36.', show: ['g.tri', 'm.1'], focus: 'g.tri' },
        { say: 'That lands on the point at 20, 68, which we found in part b. Draw the line through both points. That is part d.', show: ['g.b', 'g.line', 'm.2'], focus: 'g.line' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['C = 100: \\ F = \\tfrac{9}{5}(100) + 32 = 180 + 32 = 212 \\ \\checkmark'] }],
      lines: [{ say: 'Let us check with a temperature we know. Water boils at 100 degrees Celsius, which is 212 degrees Fahrenheit. 9 fifths of 100 is 180, and 180 plus 32 is 212. The equation works.', show: 'm.0' }],
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
            ['$\\tfrac{9}{5}(20 + 32) = 93.6$', 'multiply **first**, then add $32$'],
            ['Slope: $9^\\circ$C for every $5^\\circ$F', 'rise is $F$, run is $C$: $9^\\circ$F for $5^\\circ$C'],
            ['Graph starts at $(32, 0)$', 'the intercept is on the $F$-axis: $(0, 32)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding 32 before multiplying gives 93.6, which is wrong. Multiply by 9 fifths first, then add 32.' },
        { say: 'The rise is in F and the run is in C, so it is 9 degrees Fahrenheit for every 5 degrees Celsius, not the other way round.' },
        { say: 'And the intercept is on the F axis: the point at 0, 32, not at 32, 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The equation $h = 2s + 50$ estimates a woman’s height in inches, $h$, from her shoe size, $s$. What does the slope, $2$, mean?',
          choices: ['Each shoe size more adds about $2$ inches of height', 'Shoe size $2$ means a height of $50$ inches', 'The height is $2$ inches at shoe size $0$', 'Each inch of height adds $2$ shoe sizes'],
          answer: 0,
          working: 'The slope is the change in $h$ for each $1$ that $s$ goes up: $2$ inches per shoe size.',
        },
      ],
      lines: [
        { say: 'Your turn. The equation h equals 2 s plus 50 estimates a woman’s height in inches, h, from her shoe size, s. What does the slope, 2, mean? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The slope is how much h changes for each 1 that s goes up. So each shoe size more adds about 2 inches of height, choice A. The 50 is the intercept, and D has the variables the wrong way round.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = mx + b$: slope $m$, intercept $b$', 'To find an output, put in the input', 'Slope: change in output **per** change in input', 'Graph: start at $b$, then rise and run'] }],
      lines: [
        { say: 'Here is what to remember. In y equals m x plus b, m is the slope and b is the intercept.', show: 'sum.0' },
        { say: 'To find an output, put in the input and work it out.', show: 'sum.1' },
        { say: 'The slope is the change in output per change in input, with units.', show: 'sum.2' },
        { say: 'And to graph, start at the intercept, then use the rise and run. For more on slope intercept form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
