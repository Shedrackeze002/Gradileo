import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// t ≤ 6.25: a closed dot at 6.25 and an arrow to the left; 6 tickets work (a tick), 7 do not (a cross).
const tickets = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: 3,
        max: 9,
        boundary: { value: 6.25, closed: true, dir: 'left' },
        marks: [
          { id: 'six', value: 6, tex: '6 \\checkmark', tone: 'good' },
          { id: 'seven', value: 7, tex: '7 \\times', tone: 'bad' },
        ],
      }),
    ],
    220,
  );

// w ≥ 9.5: a closed dot at 9.5 and an arrow to the right; 10 wins work (a tick), 9 do not (a cross).
const wins = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: 6,
        max: 13,
        boundary: { value: 9.5, closed: true, dir: 'right' },
        marks: [
          { id: 'nine', value: 9, tex: '9 \\times', tone: 'bad' },
          { id: 'ten', value: 10, tex: '10 \\checkmark', tone: 'good' },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'm9-6-5-d',
  lessonId: 'm9-6-5',
  title: 'Solving Linear Inequalities, Part 4: Solving Problems',
  thumbnailTitle: 'Greatest and Least Whole Numbers',
  thumbnail: 'tk',
  summary:
    'In many problems the answer must be a whole number. Priya has $50 for tickets at $8 each: 8t ≤ 50 gives t ≤ 6.25, so the greatest number of tickets is 6 ($48; 7 would cost $56). A team has 41 points, earns 2 per win and needs at least 60: 41 + 2w ≥ 60 gives w ≥ 9.5, so the least number of wins is 10 (61 points; 9 wins give only 59). Round down for “greatest” with ≤, round up for “least” with ≥, and check the whole number you choose and the next one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 4', title: 'Solving Problems', subtitle: 'Greatest and least whole numbers' }],
      lines: [
        { say: 'What is the greatest number of tickets you can buy? What is the least number of games a team must win? Questions like these lead to inequalities.', show: 'title' },
        { say: 'In many problems, the answer must be a whole number: you cannot buy part of a ticket, or win part of a game. In this part, you will solve the inequality, then choose the right whole number.' },
      ],
    },
    {
      chapter: 'The greatest number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Priya has \\$50 to spend on movie tickets that cost \\$8 each. What is the greatest number of tickets Priya can buy?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8t \\le 50', 't \\le 6.25 \\qquad \\text{divide by } 8'] },
        tickets('tk'),
      ],
      lines: [
        { say: 'Priya has fifty dollars to spend on movie tickets that cost eight dollars each. What is the greatest number of tickets Priya can buy?', show: 'q' },
        { say: 'Let t stand for the number of tickets. The cost in dollars, eight t, must be at most fifty. So eight t is less than or equal to fifty.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by eight, a positive number: t is less than or equal to six point two five.', show: ['m.1', 'tk.axis', 'tk.dot', 'tk.ray'], focus: 'm.1' },
        { say: 'But t must be a whole number. The whole numbers up to six point two five are zero to six. So the greatest value is six.', show: 'tk.six', focus: 'tk.six' },
        { say: 'Check: six tickets cost forty-eight dollars, which is within fifty dollars. Seven tickets would cost fifty-six dollars, which is more than fifty. Priya can buy at most six tickets.', show: 'tk.seven', focus: 'tk.seven' },
      ],
    },
    {
      chapter: 'The least number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A team earns 2 points for each win. It has 41 points and needs **at least** 60 points to make the playoffs. What is the least number of additional wins it needs?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['41 + 2w \\ge 60', '2w \\ge 19 \\quad \\text{subtract } 41 \\qquad w \\ge 9.5 \\quad \\text{divide by } 2'] },
        wins('wn'),
      ],
      lines: [
        { say: 'A team earns two points for each win. It has forty-one points, and needs at least sixty points to make the playoffs. What is the least number of extra wins it needs?', show: 'q' },
        { say: 'Let w stand for the number of wins. The points, forty-one plus two w, must be at least sixty.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract forty-one from both sides: two w is greater than or equal to nineteen. Divide by two: w is greater than or equal to nine point five.', show: ['m.1', 'wn.axis', 'wn.dot', 'wn.ray'], focus: 'm.1' },
        { say: 'The number of wins must be a whole number, at least nine point five. The least whole number like that is ten.', show: 'wn.ten', focus: 'wn.ten' },
        { say: 'Check: ten wins give forty-one plus twenty, which is sixty-one points. Enough. Nine wins give only fifty-nine points. Not enough. The team needs at least ten more wins.', show: 'wn.nine', focus: 'wn.nine' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding the wrong way', md: 'For **greatest** with $\\le$, round **down**: $t \\le 6.25$ gives $6$. For **least** with $\\ge$, round **up**: $w \\ge 9.5$ gives $10$. Check the number you choose and the next one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n \\le 6.8 \\;\\to\\; 6, \\text{ not } 7'] },
      ],
      lines: [
        { say: 'Watch out for rounding the wrong way. Do not just round to the nearest whole number. If the answer were n is at most six point eight, the nearest whole number would be seven, but seven breaks the rule.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'For the greatest number, with less than or equal to, round down. Six point two five gives six, because seven breaks the rule.' },
        { say: 'For the least number, with greater than or equal to, round up. Nine point five gives ten, because nine is not enough.' },
        { say: 'Always check the whole number you choose, and the next one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lena has \\$40 to spend on notebooks that cost \\$6 each. What is the greatest number of notebooks Lena can buy?',
          choices: ['$6$', '$7$', 'about $6.67$', '$34$'],
          answer: 0,
          working: 'With $n$ notebooks, $6n \\le 40$, so $n \\le 6.\\overline{6}$. The number must be whole, so round down: $6$ notebooks cost \\$36. Seven would cost \\$42.',
        },
      ],
      lines: [
        { say: 'Your turn. Lena has forty dollars to spend on notebooks that cost six dollars each. What is the greatest number of notebooks Lena can buy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With n for the number of notebooks, six n is at most forty, so n is at most about six point six seven. The number of notebooks must be whole, so round down to six. Choice B rounds up, but seven notebooks would cost forty-two dollars, which is more than forty.', show: 'q.answer' },
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
            'Write an inequality from the words, and solve it.',
            'If the answer must be a whole number, choose the right one.',
            'Round down for “greatest” with $\\le$; round up for “least” with $\\ge$.',
            'Check the whole number you choose and the next one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write an inequality from the words, and solve it.', show: 'sum.0' },
        { say: 'If the answer must be a whole number, choose the right one.', show: 'sum.1' },
        { say: 'Round down for the greatest number, with less than or equal to. Round up for the least number, with greater than or equal to.', show: 'sum.2' },
        { say: 'And check the whole number you choose, and the next one. Well done: you can now solve linear equations and inequalities!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
