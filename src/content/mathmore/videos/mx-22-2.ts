import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-22-2',
  lessonId: 'mx-22-2',
  title: 'Domain and Range',
  thumbnail: 'def',
  summary: 'The domain of a function is the set of its inputs and the range is the set of its outputs. For {(1, 5), (2, 8), (3, 5), (4, 11)} the domain is {1, 2, 3, 4} and the range is {5, 8, 11}. Counted inputs give a discrete function, graphed as separate points. Measured inputs give a continuous function, graphed as an unbroken line.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions and Simple Quadratic Equations', title: 'Domain and Range', subtitle: 'The inputs a function takes and the outputs it gives' }],
      lines: [
        { say: 'A function turns inputs into outputs. So two questions follow. Which inputs is it allowed to take, and which outputs can it produce?', show: 'title' },
        { say: 'In this video, you will learn to find the domain and the range of a function, and to tell a discrete function from a continuous one.' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Domain', md: 'The set of all the **inputs** of a function: every value the independent variable is allowed to take.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Range', md: 'The set of all the **outputs** of a function: every value the dependent variable takes.' },
      ],
      lines: [
        { say: 'The domain of a function is the set of all its inputs. These are the values that the independent variable is allowed to take.', show: 'def' },
        { say: 'The range of a function is the set of all its outputs. These are the values that the dependent variable takes as the input runs through the domain.', show: 'def2' },
      ],
    },
    {
      chapter: 'From ordered pairs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\{(1, 5),\\ (2, 8),\\ (3, 5),\\ (4, 11)\\}', '\\text{Domain: } \\{1, 2, 3, 4\\}', '\\text{Range: } \\{5, 8, 11\\}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Listing a repeated output twice', md: 'A set lists each element once. The range is $\\{5, 8, 11\\}$, not $\\{5, 8, 5, 11\\}$.' },
      ],
      lines: [
        { say: 'Find the domain and the range of this function, given as four ordered pairs.', show: 'm.0', focus: 'm.0' },
        { say: 'The inputs are the first numbers in the pairs. So the domain is the set containing one, two, three and four.', show: 'm.1', focus: 'm.1' },
        { say: 'The outputs are the second numbers: five, eight, five and eleven. So the range is the set containing five, eight and eleven.', show: 'm.2', focus: 'm.2' },
        { say: 'The output five appears twice in the pairs, but a set lists each element only once.', show: 'oops' },
      ],
    },
    {
      chapter: 'Discrete and continuous',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['', 'Discrete', 'Continuous'],
          rows: [
            ['Domain', 'separate values, with gaps', 'every value in an interval'],
            ['Inputs are', 'counted', 'measured'],
            ['Graph', 'separate points, not joined', 'an unbroken line or curve'],
            ['Example', 'cost of a number of tickets', 'distance travelled over time'],
          ],
        },
      ],
      lines: [
        { say: 'A function is discrete when its domain is made of separate values with gaps between them. It is continuous when its domain includes every value in an interval.', show: 'tb.0' },
        { say: 'Quantities that are counted give discrete functions. Quantities that are measured give continuous ones.', show: 'tb.1' },
        { say: 'The graph of a discrete function is a set of separate points that are not joined. The graph of a continuous function is an unbroken line or curve.', show: 'tb.2' },
        { say: 'The cost of tickets depends on the number of tickets. Nobody can buy two and a half tickets, so that function is discrete. The distance a cyclist has travelled depends on time, and two and a half hours makes sense, so that function is continuous.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'Domain and range in context',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', md: 'A tank holds $60$ litres. It drains at $5$ litres each minute until it is empty, after $12$ minutes.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Domain: } 0 \\le t \\le 12', '\\text{Range: } 0 \\le V \\le 60'] },
      ],
      lines: [
        { say: 'In a real situation, the domain and the range are limited by what makes sense. A tank holds sixty litres of water, and drains at five litres each minute, so it is empty after twelve minutes.', show: 't' },
        { say: 'The volume is a function of the time. The time runs from zero to twelve minutes, and every moment in between makes sense. So the domain is all numbers from zero to twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume starts at sixty and falls to zero, passing through every value in between. So the range is all numbers from zero to sixty. This function is continuous.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the range of the function $\\{(-2, 4),\\ (0, 0),\\ (2, 4),\\ (3, 9)\\}$?',
          choices: ['$\\{0, 4, 9\\}$', '$\\{-2, 0, 2, 3\\}$', '$\\{0, 4, 4, 9\\}$', '$\\{-2, 9\\}$'],
          answer: 0,
          working: 'The outputs are $4, 0, 4, 9$. Written once each, in order: $\\{0, 4, 9\\}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the range of this function? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The outputs are the second numbers: four, zero, four and nine. Each is written once, so the range is zero, four and nine. Choice B is the domain.', show: 'q.answer' },
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
          items: ['Domain: the set of inputs. Range: the set of outputs.', 'Write each value once.', 'Discrete: counted inputs, separate points.', 'Continuous: measured inputs, an unbroken line or curve.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The domain is the set of inputs, and the range is the set of outputs.', show: 'sum.0' },
        { say: 'Each value is written once.', show: 'sum.1' },
        { say: 'A discrete function has counted inputs, and its graph is separate points.', show: 'sum.2' },
        { say: 'A continuous function has measured inputs, and its graph is an unbroken line or curve. In the next lesson, we solve simple quadratic equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
