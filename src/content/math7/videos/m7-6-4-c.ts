import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The phone bill: $25 once and $10 for each of g GB make $65 in all.
const bill = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          {
            id: 'r',
            pieces: [
              { w: 3, tex: '\\text{monthly: } \\$25', tone: 'opp' },
              { w: 5, tex: '\\text{data: } 10g', tone: 'adj' },
            ],
          },
        ],
        total: '\\text{bill: } \\$65',
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm7-6-4-c',
  lessonId: 'm7-6-4',
  title: 'Solving Two-Step Equations, Part 3: Writing Equations for Problems',
  thumbnailTitle: 'Equations for Problems',
  thumbnail: 'bl',
  summary:
    'In a problem, the amount for each one is the coefficient, the one-time amount is the constant term, and the total goes on the other side of the equals sign. A phone plan of $25 a month plus $10 for each GB, with a $65 bill, gives 10g + 25 = 65, so g = 4 GB. A gym that charges $20 to join and $8 a class, with $68 paid, gives 8c + 20 = 68, so c = 6 classes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Writing Equations for Problems', subtitle: 'For each one, once, and the total' }],
      lines: [
        { say: 'Remember the phone plan? It costs twenty-five dollars a month, plus ten dollars for each gigabyte of data, and the bill was sixty-five dollars. How much data was used?', show: 'title' },
        { say: 'In this video, you will write an equation for a problem like this one, solve it, and check the answer in the story.' },
      ],
    },
    {
      chapter: 'Three amounts',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['The amount **for each** one is the **coefficient**.', 'The amount added **once** is the **constant term**.', 'The **total** goes on the other side of the equals sign.'],
        },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{10}g + \\opp{25} = \\thc{65}'] },
      ],
      lines: [
        { say: 'Many problems have three kinds of amount. An amount for each one, like ten dollars for each gigabyte, is the coefficient.', show: 'b.0' },
        { say: 'An amount added only once, like twenty-five dollars a month, is the constant term.', show: 'b.1' },
        { say: 'And the total, sixty-five dollars, goes on the other side of the equals sign.', show: 'b.2' },
        { say: 'Let g be the number of gigabytes. Then the equation is ten g plus twenty-five equals sixty-five.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A phone bill',
      layout: 'center',
      main: [bill('bl'), { kind: 'math', id: 'm', size: 'md', lines: ['10g + 25 = 65', '10g + 25 - 25 = 65 - 25 \\quad\\to\\quad 10g = 40', '\\dfrac{10g}{10} = \\dfrac{40}{10} \\quad\\to\\quad g = 4'] }],
      lines: [
        { say: 'Here is the bill as a bar. Twenty-five dollars for the month, and ten g dollars for the data, make sixty-five dollars in all.', show: ['bl.r-p0', 'bl.r-p1', 'bl.total', 'm.0'] },
        { say: 'Undo the adding first. Subtract twenty-five from both sides. Sixty-five minus twenty-five is forty, so ten g equals forty. The data cost forty dollars.', show: 'm.1', focus: ['m.1', 'bl.r-p1'] },
        { say: 'Then divide both sides by ten. Forty divided by ten is four, so g equals four.', show: 'm.2', focus: 'm.2' },
        { say: 'Now check in the story, not just in the equation. Four gigabytes at ten dollars each cost forty dollars. Add twenty-five dollars for the month, and the bill is sixty-five dollars. It matches! Four gigabytes of data were used.' },
      ],
    },
    {
      chapter: 'Watch for swapped numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which amount is for each one?', md: '$25g + 10 = 65$ uses the same numbers, but it means \\$25 for **each** GB. Read the story and ask: which amount is "for each"?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10g + 25 = 65 \\quad \\good{\\text{\\$10 for each GB}}', '25g + 10 = 65 \\quad \\bad{\\text{\\$25 for each GB}}'] },
      ],
      lines: [
        { say: 'Watch out. The equation twenty-five g plus ten equals sixty-five uses the very same numbers. But it means twenty-five dollars for each gigabyte, which is not what the story says.', show: ['tip', 'm.1'], focus: 'm.1' },
        { say: 'In the story, ten dollars is for each gigabyte, so ten is the coefficient. Twenty-five dollars is paid once a month, so it is the constant term.', show: 'm.0', focus: 'm.0' },
        { say: 'So read the story carefully, and ask yourself: which amount is for each one?' },
      ],
    },
    {
      chapter: 'Classes at a gym',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gym charges \\$20 to join, plus \\$8 for each class. Ravi paid \\$68 in all. How many classes did Ravi take?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8c + 20 = 68', '8c = 48', 'c = 6'] },
      ],
      lines: [
        { say: 'Here is one more. A gym charges twenty dollars to join, plus eight dollars for each class. Ravi paid sixty-eight dollars in all. How many classes did Ravi take?', show: 'q' },
        { say: 'Let c be the number of classes. Eight dollars is for each class, so it is the coefficient. Twenty dollars is paid once, so it is the constant term. The equation is eight c plus twenty equals sixty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract twenty from both sides: eight c equals forty-eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by eight: c equals six.', show: 'm.2', focus: 'm.2' },
        { say: 'Check in the story: six classes at eight dollars cost forty-eight dollars, plus twenty dollars to join is sixty-eight dollars. Ravi took six classes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bike rental costs \\$5 for a helmet plus \\$4 for each hour. The total was \\$29. Which equation fits the story, and how many hours was the bike rented?',
          choices: ['$5h + 4 = 29$, so $5$ hours', '$4h + 5 = 29$, so $6$ hours', '$4h + 5 = 29$, so $24$ hours', '$4h - 5 = 29$, so $8.5$ hours'],
          answer: 1,
          working: '\\$4 is for each hour (the coefficient) and \\$5 is paid once (the constant term): $4h + 5 = 29$. Subtract $5$: $4h = 24$. Divide by $4$: $h = 6$ hours.',
        },
      ],
      lines: [
        { say: 'Your turn. A bike rental costs five dollars for a helmet, plus four dollars for each hour. The total was twenty-nine dollars. Which equation fits the story, and how many hours was the bike rented? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Four dollars is for each hour, so the equation is four h plus five equals twenty-nine. Subtract five, then divide by four: six hours. Choice A swaps the numbers: it charges five dollars for each hour.', show: 'q.answer' },
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
          items: ['The amount **for each** one is the coefficient, and the **one-time** amount is the constant term.', 'The total goes on the other side of the equals sign.', 'Solve in two steps, then check your answer **in the story**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a problem, the amount for each one is the coefficient, and the one-time amount is the constant term.', show: 'sum.0' },
        { say: 'The total goes on the other side of the equals sign.', show: 'sum.1' },
        { say: 'Solve in two steps, and check your answer in the story, not just in the equation. In the next part, you will solve problems that need a plan. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
