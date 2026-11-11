import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-20-3',
  lessonId: 'mx-20-3',
  title: 'The Constant of Proportionality',
  thumbnail: 'm',
  summary: 'In a proportional relationship y = kx, and the constant of proportionality is k = y ÷ x, the amount of y for each 1 of x. Rope that costs $20 for 8 m has k = 2.5 dollars per metre. On a graph the relationship is a straight line through (0, 0) with slope k. A rule such as y = 3x + 1 is not proportional.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Sets, Absolute Value and Proportionality', title: 'The Constant of Proportionality', subtitle: 'The one number behind y = kx' }],
      lines: [
        { say: 'When a tap fills a tank at a steady rate, doubling the time doubles the volume of water. Relationships like this one are proportional, and each of them is controlled by a single number.', show: 'title' },
        { say: 'In this video, you will learn to find that number from a pair of values, a table, or a graph, and to tell when a relationship is not proportional.' },
      ],
    },
    {
      chapter: 'Proportional relationships',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportional relationship', md: 'Two quantities are proportional when one is always the same multiple of the other.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = kx', 'k = \\frac{y}{x}'] },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Constant of proportionality', md: 'The number $k$: how much $y$ there is for each $1$ of $x$. It is the unit rate.' },
      ],
      lines: [
        { say: 'Two quantities are in a proportional relationship when one is always the same multiple of the other.', show: 'def' },
        { say: 'We write this as y equals k times x, where k is a fixed number.', show: 'm.0', focus: 'm.0' },
        { say: 'The number k is called the constant of proportionality. It tells us how much y there is for each one of x, so it is the unit rate of the relationship.', show: 'def2' },
        { say: 'To find it, divide any value of y by its matching value of x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding k from one pair',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', md: 'The cost $C$ dollars of rope is proportional to its length $L$ metres. A length of $8$ m costs 20 dollars.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['k = \\frac{C}{L} = \\frac{20}{8} = 2.5', 'C = 2.5L'] },
      ],
      lines: [
        { say: 'The cost of some rope is proportional to its length. Eight metres of rope cost twenty dollars.', show: 't' },
        { say: 'The constant of proportionality is the cost divided by the length. Twenty divided by eight is two point five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the equation is C equals two point five L. The rope costs two dollars and fifty cents for every metre.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Tables and graphs',
      layout: 'center',
      main: [
        { kind: 'table', id: 'tb', head: ['Time, $t$ (h)', '$2$', '$5$', '$8$'], rows: [['Distance, $d$ (km)', '$90$', '$225$', '?']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['k = \\frac{90}{2} = 45 \\qquad \\frac{225}{5} = 45', 'd = 45 \\times 8 = 360\\text{ km}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'On a graph', md: 'A straight line through $(0, 0)$. The constant $k$ is the **slope** of the line.' },
      ],
      lines: [
        { say: 'In a table of a proportional relationship, dividing y by x gives the same answer in every column. Here is a table of distance against time.', show: 'tb' },
        { say: 'Ninety divided by two is forty-five, and two hundred twenty-five divided by five is forty-five as well. So k is forty-five kilometres for every hour.', show: 'm.0', focus: 'm.0' },
        { say: 'For the missing value, multiply forty-five by eight. The distance is three hundred sixty kilometres.', show: 'm.1', focus: 'm.1' },
        { say: 'The graph of a proportional relationship is a straight line that passes through the origin. The constant of proportionality is the slope of that line.', show: 'key' },
      ],
    },
    {
      chapter: 'Proportional or not?',
      layout: 'center',
      main: [
        { kind: 'table', id: 'tb', head: ['$x$', '$2$', '$4$', '$6$'], rows: [['$y$', '$7$', '$13$', '$19$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{7}{2} = 3.5 \\qquad \\frac{13}{4} = 3.25'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Checking differences, not quotients', md: 'A steady increase makes a straight line, but only a constant $y \\div x$ makes the relationship proportional. Here $y = 3x + 1$.' },
      ],
      lines: [
        { say: 'Is y proportional to x in this table?', show: 'tb' },
        { say: 'Seven divided by two is three point five, but thirteen divided by four is three point two five. The quotients are different, so the relationship is not proportional.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that y goes up by six each time. A steady increase gives a straight line, but that is not enough. This rule is y equals three x plus one, and its line misses the origin.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The mass $m$ grams of a wire is proportional to its length $L$ cm. A piece $12$ cm long has a mass of $30$ g. What is the mass of a piece $20$ cm long?',
          choices: ['$38$ g', '$8$ g', '$72$ g', '$50$ g'],
          answer: 3,
          working: '$k = \\dfrac{30}{12} = 2.5$ g for every cm, so $m = 2.5 \\times 20 = 50$ g.',
        },
      ],
      lines: [
        { say: 'Your turn. The mass of a wire is proportional to its length. A piece twelve centimetres long has a mass of thirty grams. What is the mass of a piece twenty centimetres long? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Thirty divided by twelve is two point five grams for every centimetre. Two point five times twenty is fifty grams.', show: 'q.answer' },
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
          items: ['Proportional means $y = kx$.', '$k = \\dfrac{y}{x}$: the amount of $y$ for each $1$ of $x$.', 'On a graph: a straight line through $(0, 0)$ with slope $k$.', 'Test $y \\div x$ for every pair. An added constant breaks proportionality.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a proportional relationship, y equals k times x.', show: 'sum.0' },
        { say: 'The constant of proportionality is y divided by x, the amount of y for each one of x.', show: 'sum.1' },
        { say: 'On a graph, the relationship is a straight line through the origin, and k is its slope.', show: 'sum.2' },
        { say: 'To test a relationship, divide y by x for every pair. In the next lesson, we sort the real numbers into sets. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
