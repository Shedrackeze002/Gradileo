import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { toothpicks } from './lib/m7-5-figures.ts';

// Figure 3: three groups of 3 toothpicks (top, bottom, right), and 1 more that starts the row (orange).
const threeN = (id: string) => figure(id, [toothpicks({ squares: 3, size: 1.4, leftTone: 'opp' })], 220);

const sq = (fig: string, k: number) => [`${fig}.sq${k}-top`, `${fig}.sq${k}-bottom`, `${fig}.sq${k}-right`];

// n + 3 against the real pattern: 4, 5, 6, 7 goes up by only 1.
const compare = (id: string) =>
  figure(
    id,
    [
      valueTable({
        name: 'a',
        x: { title: 'n', values: [1, 2, 3, 4] },
        y: { title: 'n + 3', values: [4, 5, 6, 7] },
        dy: ['+1', '+1', '+1'],
        dyTones: ['bad', 'bad', 'bad'],
        titleW: 2.6,
      }),
    ],
    270,
  );

const video: Explainer = {
  id: 'm7-5-1-b',
  lessonId: 'm7-5-1',
  title: 'Patterns and Linear Relations, Part 2: An Expression for a Pattern',
  thumbnailTitle: 'An Expression for a Pattern',
  thumbnail: 'tn',
  summary:
    'A variable such as n stands for a number that can change, here the figure number. To write an expression for term n: the amount the terms go up each time multiplies n; compare with term 1 and add or subtract to fix the start; then check with another term. The toothpick pattern 4, 7, 10, 13 is 3n + 1 (not n + 3, which goes up by only 1), and the pattern 3, 8, 13, 18 is 5n − 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 2', title: 'An Expression for a Pattern', subtitle: 'Any term in one step' }],
      lines: [
        { say: 'The toothpick pattern goes four, seven, ten, thirteen. Adding three each time works, but it is slow for Figure fifty.', show: 'title' },
        { say: 'In this part, you will write an expression that gives any term of a pattern in one step.' },
      ],
    },
    {
      chapter: 'Variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Variable', md: 'A **variable** is a letter, such as $n$, that stands for a number that can change. Here $n$ stands for the **figure number**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3n \\text{ means } 3 \\times n', 'n = 4\\colon\\ 3n = 3 \\times 4 = 12'] },
      ],
      lines: [
        { say: 'First, a new word. A variable is a letter, such as n, that stands for a number that can change. In the toothpick pattern, n stands for the figure number.', show: 'def' },
        { say: 'When a number is written right next to a variable, it means multiply. Three n means three times n.', show: 'm.0', focus: 'm.0' },
        { say: 'So when n is four, three n is three times four, which is twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Find how much the terms go up each time. That number **multiplies** $n$.',
            'Compare with term $1$, and **add or subtract** to fix the start.',
            '**Check** with another term.',
          ],
        },
      ],
      lines: [
        { say: 'Here are three steps for writing an expression for a pattern. First, find how much the terms go up each time. That number multiplies n.', show: 'b.0' },
        { say: 'Second, compare with term one, and add or subtract to fix the start.', show: 'b.1' },
        { say: 'Third, check your expression with another term.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Toothpick squares',
      layout: 'center',
      main: [
        threeN('tn'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Up by } 3 \\;\\to\\; 3n', 'n = 1\\colon\\ 3n = 3, \\text{ but Figure 1 has } 4 \\;\\to\\; 3n + 1', '\\text{Check } n = 4\\colon\\ 3(4) + 1 = 13 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Let’s write an expression for the number of toothpicks in Figure n. Step one: the terms go up by three each time, so the expression starts with three n.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: compare with Figure one. When n is one, three n is three. But Figure one has four toothpicks. So add one. The expression is three n plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: check with Figure four. Three times four is twelve, plus one is thirteen. That matches the table, so the expression works.', show: 'm.2', focus: 'm.2' },
        { say: 'You can see the expression in the picture. Here is Figure three. Each square has three toothpicks of its own: top, bottom and right. Three squares make three groups of three.', show: ['tn.sq0', 'tn.sq1', 'tn.sq2'], focus: [...sq('tn', 0), ...sq('tn', 1), ...sq('tn', 2)] },
        { say: 'And one more toothpick, in orange, starts the row on the left. That is the plus one. So Figure n has three n plus one toothpicks.', focus: 'tn.sq0-left' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the change instead of multiplying', md: 'The change, $3$, goes **in front of** $n$, to multiply it. The expression $n + 3$ gives $4, 5, 6, \\ldots$, which goes up by only $1$ each time.' },
        compare('cp'),
      ],
      lines: [
        { say: 'Watch out for this mistake. The pattern goes up by three, so some people write n plus three.', show: 'oops' },
        { say: 'But look at what n plus three gives: four, five, six, seven. It goes up by only one each time, not three.', show: ['cp.a-frame', 'cp.a-xs', 'cp.a-ys', 'cp.a-dys'], focus: 'cp.a-dys' },
        { say: 'The change goes in front of n, so that it multiplies n. Three n goes up by three each time n goes up by one.' },
      ],
    },
    {
      chapter: 'A pattern that starts low',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The terms of a pattern are $3, 8, 13, 18, \\ldots$ Write an expression for term $n$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Up by } 5 \\;\\to\\; 5n', 'n = 1\\colon\\ 5n = 5, \\text{ but term 1 is } 3 \\;\\to\\; 5n - 2', '\\text{Check } n = 3\\colon\\ 5(3) - 2 = 13 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is another pattern: three, eight, thirteen, eighteen, and so on. Write an expression for term n.', show: 'q' },
        { say: 'The terms go up by five each time, so the expression starts with five n.', show: 'm.0', focus: 'm.0' },
        { say: 'When n is one, five n is five. But the first term is three. Five is two more than three, so subtract two. The expression is five n minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with term three. Five times three is fifteen, minus two is thirteen. It matches the third term.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The terms of a pattern are $7, 11, 15, 19, \\ldots$ Which expression gives term $n$?',
          choices: ['$n + 4$', '$4n + 7$', '$4n + 3$', '$3n + 4$'],
          answer: 2,
          working: 'The terms go up by $4$, so start with $4n$. When $n = 1$, $4n = 4$, but term $1$ is $7$: add $3$. Check $n = 2$: $4(2) + 3 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. The terms of a pattern are seven, eleven, fifteen, nineteen, and so on. Which expression gives term n? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four n plus three. The terms go up by four, so start with four n. When n is one, four n is four, but the first term is seven, so add three. Choice A puts the four in the wrong place: n plus four goes up by only one each time.', show: 'q.answer' },
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
            'A **variable**, such as $n$, stands for a number that can change.',
            'The change each time multiplies $n$.',
            'Add or subtract to match term $1$, then check with another term.',
            'Toothpicks: $3n + 1$. The pattern $3, 8, 13, \\ldots$: $5n - 2$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A variable, such as n, stands for a number that can change.', show: 'sum.0' },
        { say: 'To write an expression for a pattern, the change each time multiplies n.', show: 'sum.1' },
        { say: 'Then add or subtract to match term one, and check with another term.', show: 'sum.2' },
        { say: 'The toothpick pattern is three n plus one. In the next part, you will see that patterns like these are linear relations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
