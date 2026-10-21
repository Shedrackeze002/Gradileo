import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bin, tileGroups } from '@/content/math6/videos/lib/m6-6-figures.ts';

// A bag with an unknown number of marbles, and three loose marbles: n + 3.
const bag = (id: string) => figure(id, [bin({ bags: 1, marbles: 3, tex: 'n', caption: 'n + 3' })], 260);

// The bowling cost as algebra tiles: six g tiles (one for each game's $6) and four unit tiles.
const tiles = (id: string) => figure(id, [tileGroups({ groups: [{ id: 'cost', x: 6, units: 4, tex: 'g', caption: '6g + 4' }] })], 330);

const video: Explainer = {
  id: 'm7-6-1',
  lessonId: 'm7-6-1',
  title: 'Expressions and Equations, Part 1: Variables and Expressions',
  thumbnailTitle: 'Variables and Expressions',
  thumbnail: 'tl',
  summary:
    'A variable is a letter that stands for a number we do not know yet, or a number that can change. An expression is made of numbers, variables and operations, with no equals sign. Bowling at $6 a game plus $4 for shoes costs 6g + 4 dollars for g games, where 6g means 6 × g: 3 games cost $22 and 10 games cost $64.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Variables and Expressions', subtitle: 'One short rule for every question' }],
      lines: [
        { say: 'A bowling alley charges four dollars to rent shoes, and six dollars for each game. How much do three games cost? What about ten games?', show: 'title' },
        { say: 'In this video, you will meet variables and expressions. One short expression can answer every one of these questions at once.' },
      ],
    },
    {
      chapter: 'Working it out',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Shoes cost \\$4. Each game costs \\$6.' },
        {
          kind: 'table',
          id: 't',
          head: ['Games', 'Cost of the games', 'Plus shoes', 'Total cost'],
          rows: [
            ['$1$', '$6 \\times 1 = 6$', '$6 + 4$', '\\$10'],
            ['$3$', '$6 \\times 3 = 18$', '$18 + 4$', '\\$22'],
            ['$10$', '$6 \\times 10 = 60$', '$60 + 4$', '\\$64'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same steps every time', md: 'Multiply the number of games by $6$, then add $4$.' },
      ],
      lines: [
        { say: 'Let’s work out a few costs. For one game, the game costs six dollars. Add four dollars for shoes, and the total is ten dollars.', show: ['q', 't.0'], focus: 't.0' },
        { say: 'For three games, the games cost six times three, which is eighteen dollars. Add four dollars for shoes, and the total is twenty-two dollars.', show: 't.1', focus: 't.1' },
        { say: 'For ten games, the games cost six times ten, which is sixty dollars. Add the four dollars for shoes, and the total is sixty-four dollars.', show: 't.2', focus: 't.2' },
        { say: 'Do you see what stays the same? Every time, we multiply the number of games by six, then add four. Only the number of games changes.', show: 'key', focus: 'key' },
      ],
    },
    {
      chapter: 'Variables',
      layout: 'split',
      leftWidth: 520,
      left: [bag('bg')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Variable', md: 'A **variable** is a letter, such as $n$, $x$ or $g$, that stands for a number we do not know yet, or a number that can change.' }],
      lines: [
        { say: 'Here is a bag of marbles. We cannot see inside it, so we do not know how many marbles it holds.', show: ['bg.box', 'bg.bag0'], focus: 'bg.bag0' },
        { say: 'In maths, we give a number like that a name. We call it n. The letter n stands for the number of marbles in the bag.', show: 'def' },
        { say: 'A letter that stands for a number is called a variable. A variable can stand for a number we do not know yet, or for a number that can change, like the number of games you bowl.' },
        { say: 'With three loose marbles beside the bag, there are n plus three marbles in all. We cannot say exactly how many until we know n.', show: ['bg.marbles', 'bg.cap'], focus: ['bg.marbles', 'bg.cap'] },
      ],
    },
    {
      chapter: 'Expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Expression', md: 'An **expression** is a group of numbers, variables and operations, such as $6g + 4$ or $\\dfrac{n}{2}$. An expression does **not** have an equals sign.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n + 3 \\qquad 6g + 4 \\qquad \\dfrac{n}{2}'] },
      ],
      lines: [
        { say: 'The amount n plus three is called an expression. An expression is a group of numbers, variables and operations, like adding, subtracting, multiplying and dividing.', show: ['def', 'm.0'] },
        { say: 'Here are some more expressions: six g plus four, and n over two, which means n divided by two.', focus: 'm.0' },
        { say: 'Notice that none of them has an equals sign. An expression is like a phrase in a sentence. It names an amount, but it does not say what the amount is equal to.' },
      ],
    },
    {
      chapter: 'A number next to a letter',
      layout: 'center',
      main: [tiles('tl'), { kind: 'math', id: 'm', size: 'lg', lines: ['6g = 6 \\times g \\qquad 3n = 3 \\times n'] }],
      lines: [
        { say: 'Let the letter g be the number of games. Each game costs six dollars, so g games cost six times g dollars.', show: 'tl.cost-xs', focus: 'tl.cost-xs' },
        { say: 'When a number is written right next to a variable, it means multiply. So six g means six times g, and three n means three times n.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add four dollars for shoes. The four small tiles are the four dollars.', show: 'tl.cost-us', focus: 'tl.cost-us' },
        { say: 'So the total cost is six g plus four dollars, where g is the number of games.', show: ['tl.cost-box', 'tl.cost-cap'], focus: 'tl.cost-cap' },
      ],
    },
    {
      chapter: 'One expression, every question',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6g + 4', 'g = 3: \\quad 6 \\times 3 + 4 = 22', 'g = 10: \\quad 6 \\times 10 + 4 = 64'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Three games cost \\$22, and ten games cost \\$64.' },
      ],
      lines: [
        { say: 'Now the expression six g plus four can answer every question. Just put the number of games in place of g.', show: 'm.0', focus: 'm.0' },
        { say: 'For three games, g is three. Six times three is eighteen, plus four is twenty-two. Three games cost twenty-two dollars, the same as in our table.', show: 'm.1', focus: 'm.1' },
        { say: 'For ten games, g is ten. Six times ten is sixty, plus four is sixty-four. Ten games cost sixty-four dollars.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'One short expression, and you can find the cost for any number of games.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Movie tickets cost \\$9 each, and a bag of popcorn costs \\$5. Which expression gives the total cost, in dollars, of $t$ tickets and one bag of popcorn?',
          choices: ['$5t + 9$', '$9t + 5$', '$9 + 5 + t$', '$14t$'],
          answer: 1,
          working: 'Each ticket costs \\$9, so $t$ tickets cost $9t$ dollars. Add \\$5 once for the popcorn: $9t + 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Movie tickets cost nine dollars each, and a bag of popcorn costs five dollars. Which expression gives the total cost, in dollars, of t tickets and one bag of popcorn? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, nine t plus five. Each ticket costs nine dollars, so t tickets cost nine t dollars, and the popcorn adds five dollars once. Choice A swaps the numbers: it charges five dollars for each ticket.', show: 'q.answer' },
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
          items: ['A **variable** is a letter that stands for a number we do not know yet, or a number that can change.', 'An **expression** is made of numbers, variables and operations. It has no equals sign.', 'A number next to a variable means multiply: $6g$ means $6 \\times g$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A variable is a letter that stands for a number we do not know yet, or a number that can change.', show: 'sum.0' },
        { say: 'An expression is made of numbers, variables and operations, and it has no equals sign.', show: 'sum.1' },
        { say: 'And a number written next to a variable means multiply. In the next part, you will see how an equation is different from an expression. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
