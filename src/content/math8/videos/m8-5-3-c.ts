import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// From −14 °C, up 4 × 3 = 12 to −2 °C, then down 3 × 2 = 6 to −8 °C.
const temps = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -16,
        max: 2,
        every: 2,
        unit: 0.28,
        points: [
          { id: 'start', value: -14, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -8, tex: '\\text{end}', tone: 'good' },
        ],
        moves: [
          { id: 'up', from: -14, to: -2, label: '+12', tone: 'opp', x: 2.4 },
          { id: 'down', from: -2, to: -8, label: '-6', tone: 'adj', x: 4.6 },
        ],
        room: 5.4,
      }),
    ],
    500,
  );

const video: Explainer = {
  id: 'm8-5-3-c',
  lessonId: 'm8-5-3',
  title: 'Order of Operations with Integers, Part 3: Solving Problems with Integers',
  thumbnailTitle: 'Problems with Integers',
  thumbnail: 'tp',
  summary:
    'To solve a problem, write an expression with integers (gains positive, losses negative), then use the order of operations. A contest score of 9 correct answers at +4, 6 wrong at −2 and 5 blank at 0 is 9 × 4 + 6 × (−2) + 5 × 0 = 36 + (−12) + 0 = 24. A temperature of −14 °C that rises 3 °C an hour for 4 hours, then falls 2 °C an hour for 3 hours, ends at (−14) + 4 × 3 + 3 × (−2) = −8 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 3', title: 'Solving Problems with Integers', subtitle: 'Write an expression, then evaluate it' }],
      lines: [
        { say: 'Scores, temperatures and money often go up and down. Integers are perfect for keeping track of them.', show: 'title' },
        { say: 'In this part, you will write an expression for a problem, and then evaluate it with the order of operations.' },
      ],
    },
    {
      chapter: 'A contest score',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Answer', 'Number', 'Points each'],
          rows: [
            ['Correct', '$9$', '$+4$'],
            ['Wrong', '$6$', '$-2$'],
            ['Blank', '$5$', '$0$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['9 \\times 4 + 6 \\times (-2) + 5 \\times 0', '= 36 + (-12) + 0', '= 24'] },
      ],
      lines: [
        { say: 'Here are the contest results for Simran. Each correct answer scores positive four, each wrong answer scores negative two, and a blank scores zero.', show: 't' },
        { say: 'Simran has nine correct answers, six wrong answers and five blanks. Write an expression for the score: nine times four, plus six times negative two, plus five times zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first. Nine times four is thirty-six, six times negative two is negative twelve, and five times zero is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add. Thirty-six plus negative twelve is twenty-four, and adding zero changes nothing. The score is twenty-four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A changing temperature',
      layout: 'split',
      leftWidth: 500,
      left: [temps('tp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At 7 a.m. it was $-14^\\circ\\text{C}$. It rose $3^\\circ\\text{C}$ per hour for $4$ hours, then fell $2^\\circ\\text{C}$ per hour for $3$ hours. What was the final temperature?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(-14) + 4 \\times 3 + 3 \\times (-2)', '= (-14) + 12 + (-6)', '= -2 + (-6)', '= -8'] },
      ],
      lines: [
        { say: 'At seven in the morning, the temperature was negative fourteen degrees Celsius. It rose three degrees per hour for four hours, then fell two degrees per hour for three hours. What was the final temperature?', show: ['q', 'tp.axis', 'tp.start'] },
        { say: 'A rise is positive, and a fall is negative. So start at negative fourteen, add four times three, and add three times negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first. Four times three is twelve, and three times negative two is negative six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add from left to right. Negative fourteen plus twelve is negative two. That is the temperature after the four hours of rising.', show: ['m.2', 'tp.up'], focus: ['m.2', 'tp.up'] },
        { say: 'Negative two plus negative six is negative eight. So the final temperature was negative eight degrees Celsius.', show: ['m.3', 'tp.down', 'tp.end'], focus: ['m.3', 'tp.down', 'tp.end'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a quiz, each correct answer scores $+3$ and each wrong answer scores $-1$. Maya has $8$ correct answers and $5$ wrong answers. What is the score?',
          choices: ['$29$', '$-29$', '$11$', '$19$'],
          answer: 3,
          working: 'Score $= 8 \\times 3 + 5 \\times (-1) = 24 + (-5) = 19$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a quiz, each correct answer scores positive three, and each wrong answer scores negative one. Maya has eight correct answers and five wrong answers. What is the score? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nineteen. The score is eight times three, plus five times negative one. That is twenty-four plus negative five, which is nineteen. Choice A counts the wrong answers as positive, but each wrong answer takes a point away.', show: 'q.answer' },
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
          items: [
            'Write an expression for the problem: gains are positive and losses are negative.',
            'Then use the order of operations: multiply before you add.',
            'Score: $9 \\times 4 + 6 \\times (-2) + 5 \\times 0 = 24$.',
            'Temperature: $(-14) + 4 \\times 3 + 3 \\times (-2) = -8$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a problem with integers, first write an expression. Gains are positive, and losses are negative.', show: 'sum.0' },
        { say: 'Then evaluate it with the order of operations: multiply before you add.', show: 'sum.1' },
        { say: 'The contest score was twenty-four.', show: 'sum.2' },
        { say: 'And the final temperature was negative eight degrees Celsius. Next, you will meet linear relations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
