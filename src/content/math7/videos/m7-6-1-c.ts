import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileGroups } from '@/content/math6/videos/lib/m6-6-figures.ts';

// 6g + 4 as algebra tiles: six g tiles (the coefficient) and four unit tiles (the constant term).
const tiles = (id: string) => figure(id, [tileGroups({ groups: [{ id: 'e', x: 6, units: 4, tex: 'g' }] })], 280);

const video: Explainer = {
  id: 'm7-6-1-c',
  lessonId: 'm7-6-1',
  title: 'Expressions and Equations, Part 3: Coefficients and Constant Terms',
  thumbnailTitle: 'Coefficients and Constants',
  thumbnail: 'tl',
  summary:
    'In 6g + 4, the number 6 multiplies the variable, so it is the coefficient, and 4 has no variable, so it is the constant term: it stays the same whatever g is. In a story, the coefficient is usually an amount for each one, and the constant term an amount added once: a phone bill of 10d + 25 dollars charges $10 for each GB of data and $25 a month.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Coefficients and Constant Terms', subtitle: 'For each one, or once?' }],
      lines: [
        { say: 'In the bowling expression, six g plus four, the six and the four do very different jobs.', show: 'title' },
        { say: 'In this video, you will learn their names, coefficient and constant term, and what each one means in a story.' },
      ],
    },
    {
      chapter: 'The parts of an expression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{6}g + \\opp{4}'] },
        tiles('tl'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coefficient and constant term', md: 'The **coefficient** is the number that multiplies the variable. The **constant term** is a number with no variable. It stays the same, whatever the variable is.' },
      ],
      lines: [
        { say: 'Look at six g plus four. The six multiplies the variable g. A number that multiplies a variable is called the coefficient. So the coefficient is six.', show: ['m.0', 'tl.e-xs'], focus: 'tl.e-xs' },
        { say: 'In the tiles, the coefficient tells you how many g tiles there are: six of them.', focus: 'tl.e-xs' },
        { say: 'The four has no variable with it. A number on its own like this is called the constant term. Constant means it never changes.', show: 'tl.e-us', focus: 'tl.e-us' },
        { say: 'Whatever g is, one game or a hundred games, the four small tiles stay four. So the constant term is four.', show: ['tl.e-box', 'def'] },
      ],
    },
    {
      chapter: 'A phone bill',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'text', id: 'q', size: 'md', md: 'A phone plan costs \\$25 a month plus \\$10 for each GB of data. The bill, in dollars, is $10d + 25$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{10}\\,\\thc{d} + \\opp{25}'] },
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Variable: $d$, the number of GB of data used.', 'Coefficient: $10$, the cost of each GB.', 'Constant term: $25$, the cost each month before any data is used.'],
        },
      ],
      lines: [
        { say: 'A phone plan costs twenty-five dollars a month, plus ten dollars for each gigabyte of data. The bill, in dollars, is ten d plus twenty-five.', show: ['q', 'm.0'] },
        { say: 'Let’s name the parts, and say what each one means. The variable is d. It stands for the number of gigabytes of data used, which can change from month to month.', show: 'b.0', focus: 'b.0' },
        { say: 'The coefficient is ten, the number that multiplies d. It is the cost of each gigabyte: ten dollars.', show: 'b.1', focus: 'b.1' },
        { say: 'The constant term is twenty-five. It is the monthly cost before any data is used. You pay it once each month, however much data you use.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'For each, or once?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Amount for each one', md: 'In a story, the **coefficient** is usually an amount **for each** one: each game, each GB, each week. The **constant term** is an amount that is added **once**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Story', 'Expression', 'Coefficient', 'Constant term'],
          rows: [
            ['\\$3 for each hour, plus a \\$5 helmet', '$3h + 5$', '$3$', '$5$'],
            ['\\$20 to join, then \\$8 for each class', '$8c + 20$', '$8$', '$20$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a handy tip. In a story, the coefficient is usually an amount for each one: for each game, for each gigabyte, or for each week. The constant term is an amount that is added only once.', show: 'tip' },
        { say: 'A bike rental costs three dollars for each hour, plus five dollars for a helmet. Three dollars is for each hour, so it is the coefficient. The helmet is paid once, so five is the constant term. The expression is three h plus five.', show: 't.0', focus: 't.0' },
        { say: 'A gym charges twenty dollars to join, then eight dollars for each class. This time the one-time amount comes first in the story. But eight dollars is for each class, so eight is still the coefficient, and twenty is the constant term: eight c plus twenty.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A taxi charges \\$4 to start, plus \\$2 for each kilometre. The cost, in dollars, is $2k + 4$. What is the **coefficient**, and what does it mean?',
          choices: ['$2$: the cost of each kilometre', '$4$: the cost of each kilometre', '$2$: the cost to start', '$k$: the number of kilometres'],
          answer: 0,
          working: 'The coefficient is the number that multiplies the variable: $2$. It is an amount for each one, the cost of each kilometre. The $4$ is the constant term, paid once to start.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges four dollars to start, plus two dollars for each kilometre. The cost, in dollars, is two k plus four. What is the coefficient, and what does it mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The coefficient is two, the number that multiplies k, and it is the cost of each kilometre. Choice B names four, but four is the constant term: the amount paid once, to start.', show: 'q.answer' },
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
          items: ['The **coefficient** is the number that multiplies the variable: in $6g + 4$, it is $6$.', 'The **constant term** has no variable, and it never changes: in $6g + 4$, it is $4$.', 'In a story, the coefficient is an amount **for each** one, and the constant term is added **once**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The coefficient is the number that multiplies the variable. In six g plus four, it is six.', show: 'sum.0' },
        { say: 'The constant term has no variable, and it never changes. In six g plus four, it is four.', show: 'sum.1' },
        { say: 'In a story, the coefficient is an amount for each one, and the constant term is added once. In the next part, you will find the value of an expression. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
