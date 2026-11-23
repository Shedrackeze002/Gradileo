import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.2 (transformations of exponential functions). The question
// is an exercise from OpenStax College Algebra 2e, word for word (section 6.2, Graphs of Exponential
// Functions, CC BY-NC-SA 4.0). Applying the four changes in order to f(x) = −½(¼)^(x−2) + 4: down 4
// gives −½(¼)^(x−2), left 2 gives −½(¼)^x, a vertical stretch by 4 gives −2(¼)^x, and a reflection
// in the x-axis gives g(x) = 2(¼)^x, with y-intercept (0, 2), domain all real numbers and range
// y > 0, as in the book's answer.

const g = plane({ x: [-3, 6], y: [-5, 9], every: 2, width: 13, height: 9 });

/** f (`f`, dashed) with its asymptote y = 4 (`fa`), and g (`g`) with its y-intercept (`p`). */
const graph = (height = 460, withG = true) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'fa', points: [[-3, 4], [6, 4]], tone: 'muted', dashed: true }),
      plot(g, { id: 'f', f: (x) => -0.5 * 0.25 ** (x - 2) + 4, from: -0.2, to: 6, tone: 'adj', dashed: true, samples: 120, label: 'f', labelAt: 0.97, side: 'right' }),
      ...(withG
        ? [
            plot(g, { id: 'g', f: (x) => 2 * 0.25 ** x, from: -1.2, to: 6, tone: 'good', samples: 120, label: 'g', labelAt: 0.06, side: 'right' }),
            dots(g, [{ id: 'p', x: 0, y: 2, tex: '(0, 2)', tone: 'good', place: 'right' }]),
          ]
        : []),
    ],
    height,
  );

const QUESTION =
  'The graph of f(x) = −½(¼)^(x−2) + 4 is shifted downward 4 units, and then shifted left 2 units, stretched vertically by a factor of 4, and reflected about the x-axis. What is the equation of the new function, g(x)? State its y-intercept, domain, and range.';

const video: Explainer = {
  id: 'xq-m301-7-2',
  lessonId: '',
  exam: {
    lesson: 'm301-7-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.2, Graphs of Exponential Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-2-graphs-of-exponential-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Four Transformations of an Exponential Function (Transformations of Exponential Functions)',
  thumbnailTitle: 'Four Transformations in a Row',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: f(x) = −½(¼)^(x−2) + 4 is shifted down 4, left 2, stretched vertically by 4 and reflected in the x-axis. We apply the four changes in order to get g(x) = 2(¼)^x, then read its y-intercept (0, 2), domain (all real numbers) and range (y > 0). Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Four Transformations in a Row', subtitle: 'Transformations of exponential functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about transforming exponential functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The graph of $f(x) = -\\tfrac{1}{2}\\left(\\tfrac{1}{4}\\right)^{x-2} + 4$ is shifted downward $4$ units, and then shifted left $2$ units, stretched vertically by a factor of $4$, and reflected about the $x$-axis. What is the equation of the new function, $g(x)$? State its $y$-intercept, domain, and range.',
          answer: '$g(x) = 2\\left(\\tfrac{1}{4}\\right)^x$; $y$-intercept $(0, 2)$; domain all real numbers; range $y > 0$',
          working: 'Down $4$, left $2$ ($x \\to x + 2$), times $4$, then times $-1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'The graph of f of x equals negative one half, times one quarter to the power x minus 2, plus 4, is shifted downward 4 units, and then shifted left 2 units, stretched vertically by a factor of 4, and reflected about the x-axis.' },
        { say: 'What is the equation of the new function, g of x? State its y-intercept, domain, and range.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(400, false), { kind: 'text', id: 't', size: 'md', md: 'Four changes, **in order**. Each one changes the formula in one place.' }],
      lines: [
        { say: 'Here is the graph of f. It rises towards its horizontal asymptote, the line y equals 4.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.fa'] },
        { say: 'We make four changes, in the order given. Each change does one thing to the formula. Then we read the new function\'s features.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Change', 'What it does to $y = f(x)$'],
          rows: [
            ['down $k$', 'subtract $k$ **outside**'],
            ['left $h$', 'replace $x$ with $x + h$ **inside**'],
            ['vertical stretch by $a$', 'multiply the **whole** function by $a$'],
            ['reflect about the $x$-axis', 'multiply the **whole** function by $-1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. Down k: subtract k outside the function.', show: 'rules' },
        { say: 'Left h: replace x with x plus h, inside. Inside, the sign is the opposite of the direction.' },
        { say: 'A vertical stretch by a factor of "a" multiplies the whole function by "a". And a reflection about the x-axis multiplies the whole function by negative 1.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Do the **shifts**: down $4$, left $2$', 'Do the **stretch** and the **reflection**', 'Read the $y$-intercept, **domain** and **range**'] }],
      lines: [
        { say: 'Here is the plan. First, do the two shifts: down 4 and left 2.', show: 'plan.0' },
        { say: 'Second, the stretch and the reflection.', show: 'plan.1' },
        { say: 'Third, read the y-intercept, the domain and the range.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The shifts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{down } 4: \\quad {-\\tfrac{1}{2}}\\left(\\tfrac{1}{4}\\right)^{x-2} + 4 \\good{- 4} = {-\\tfrac{1}{2}}\\left(\\tfrac{1}{4}\\right)^{x-2}', '\\text{left } 2: \\quad {-\\tfrac{1}{2}}\\left(\\tfrac{1}{4}\\right)^{(\\good{x + 2}) - 2} = {-\\tfrac{1}{2}}\\left(\\tfrac{1}{4}\\right)^{x}'] }],
      lines: [
        { say: 'Step one. Down 4 subtracts 4 outside. The plus 4 and the minus 4 cancel, which leaves negative one half times one quarter to the power x minus 2.', show: 'm.0' },
        { say: 'Left 2 replaces x with x plus 2. Then the exponent is x plus 2, minus 2, which is just x. So we have negative one half times one quarter to the power x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Stretch and reflect',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{stretch by } 4: \\quad \\good{4} \\cdot \\left(-\\tfrac{1}{2}\\right)\\left(\\tfrac{1}{4}\\right)^x = -2\\left(\\tfrac{1}{4}\\right)^x', '\\text{reflect: } \\quad \\good{-1} \\cdot \\left(-2\\right)\\left(\\tfrac{1}{4}\\right)^x', 'g(x) = \\good{2\\left(\\tfrac{1}{4}\\right)^x}'] }],
      lines: [
        { say: 'Step two. The vertical stretch by 4 multiplies everything by 4. 4 times negative one half is negative 2.', show: 'm.0' },
        { say: 'The reflection about the x-axis multiplies everything by negative 1.', show: 'm.1' },
        { say: 'Negative 1 times negative 2 is 2. So g of x equals 2 times one quarter to the power x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The features',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(0) = 2\\left(\\tfrac{1}{4}\\right)^0 = 2 \\ \\Rightarrow \\ \\good{(0, 2)}', '\\text{domain: } \\good{\\text{all real numbers}}', '\\text{range: } \\good{y > 0}'] }],
      lines: [
        { say: 'Step three. For the y-intercept, put in x equals 0. Anything to the power 0 is 1, so g of 0 is 2. The y-intercept is the point at 0, 2.', show: 'm.0' },
        { say: 'Any x can go in an exponent, so the domain is all real numbers.', show: 'm.1' },
        { say: 'One quarter to the power x is always positive, and 2 times a positive number is positive. It gets close to 0 but never reaches it, so the range is y greater than 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['g(1) = 2 \\cdot \\tfrac{1}{4} = \\tfrac{1}{2} > 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Here is g. It crosses the y-axis at 2.', show: ['gr.grid', 'gr.axes', 'gr.g', 'gr.p'], focus: 'gr.p' },
        { say: 'It falls towards the x-axis as x grows, but never reaches it. Its asymptote is y equals 0, so every value is above 0.', focus: 'gr.g' },
        { say: 'For example, g of 1 is 2 times one quarter, which is one half: positive, as the range says.', show: 'm.0', focus: 'm.0' },
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
            ['left $2$ as $x - 2$', 'left is $x + 2$: inside, the sign is **opposite**'],
            ['stretching the $+4$ too', 'go **in order**: the down $4$ removed it first'],
            ['range $y < 0$', 'two minus signs: $-1 \\cdot (-2) = 2$, so $g$ is **positive**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Left 2 is x plus 2, not x minus 2. Inside the function, the sign is the opposite of the direction.' },
        { say: 'Go in order. The shift down 4 came first, so the plus 4 was already gone before the stretch.' },
        { say: 'And watch the signs. The reflection flips negative 2 into positive 2, so g is above the x-axis, and the range is y greater than 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The graph of $y = 3^x$ is reflected about the $x$-axis, then shifted up $5$ units. What is the range of the new function?',
          choices: ['$y > 5$', '$y > -5$', '$y < -5$', '$y < 5$'],
          answer: 3,
          working: 'The new function is $y = -3^x + 5$. $-3^x < 0$, so $-3^x + 5 < 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals 3 to the power x is reflected about the x-axis, then shifted up 5 units. What is the range of the new function? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'The new function is negative 3 to the power x, plus 5. Negative 3 to the power x is always below 0, so adding 5 keeps it below 5. The range is y less than 5: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Make the changes **in order**', 'Shifts left or right go **inside**, with the opposite sign', 'Stretches and reflections multiply the **whole** function', 'The asymptote decides the **range**'] }],
      lines: [
        { say: 'Here is what to remember. Make the changes in the order given.', show: 'sum.0' },
        { say: 'Shifts left or right go inside, with the opposite sign.', show: 'sum.1' },
        { say: 'Stretches and reflections multiply the whole function.', show: 'sum.2' },
        { say: 'And the horizontal asymptote, and which side the graph is on, decides the range. For more on transformations of exponential functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
