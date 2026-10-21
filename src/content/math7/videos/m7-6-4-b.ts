import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// 26 = 4n + 6: 26 marbles on the left (four groups of 5, one for each bag, and the 6 to take
// away); four bags and 6 marbles on the right.
const G = [0, 1, 2, 3];
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'n',
        perRow: 5,
        bagsPerRow: 4,
        left: { marbles: [...G.map((g) => ({ id: `g${g}`, count: 5, tone: g % 2 ? ('opp' as const) : ('theta' as const) })), { id: 'take', count: 6, tone: 'hyp' as const }] },
        right: { bags: 4, marbles: [{ id: 'take', count: 6, tone: 'hyp' }] },
        labels: ['26', '4n + 6'],
      }),
    ],
    420,
  );
const all = (id: string) => [`${id}.stand`, `${id}.rbags`, `${id}.l-take`, `${id}.r-take`, `${id}.labels`, ...G.map((g) => `${id}.l-g${g}`)];

// n, times 5, plus 8, gives 53; undo: 53, minus 8, gives 45, divided by 5, gives 9.
const puzzle = (id: string) => figure(id, [chain({ nodes: ['n', '5n', '53'], ops: ['\\times 5', '+\\,8'], back: ['9', '45', '53'], undo: ['\\div 5', '-\\,8'], gap: 2.6 })], 230);

const video: Explainer = {
  id: 'm7-6-4-b',
  lessonId: 'm7-6-4',
  title: 'Solving Two-Step Equations, Part 2: The Variable on the Right, and Number Puzzles',
  thumbnailTitle: 'Variable on the Right',
  thumbnail: 'bal',
  summary:
    'The two sides of an equation can be swapped, so 26 = 4n + 6 is solved like 4n + 6 = 26: subtract 6 (4n = 20), divide by 4 (n = 5). A number puzzle becomes an equation too: a number multiplied by 5, then 8 more, makes 53, so 5n + 8 = 53, 5n = 45 and n = 9.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'The Variable on the Right, and Number Puzzles', subtitle: 'The same two steps, in new places' }],
      lines: [
        { say: 'In the last part, the variable was always on the left side of the equation. But it can be on the right side as well.', show: 'title' },
        { say: 'In this video, you will solve an equation with the variable on the right, and turn a number puzzle into an equation.' },
      ],
    },
    {
      chapter: 'The variable on the right',
      layout: 'split',
      leftWidth: 680,
      left: [scale('bal')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['26 = 4n + 6', '4n + 6 = 26', '4n = 20', 'n = 5', '\\text{Check: } 4(5) + 6 = 26 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve twenty-six equals four n plus six. This time the variable is on the right.', show: 'm.0' },
        { say: 'On a balance, it does not matter which pan is which. Twenty-six marbles on the left balance four bags and six marbles on the right.', show: all('bal') },
        { say: 'So the two sides of an equation can be swapped. Twenty-six equals four n plus six means the same as four n plus six equals twenty-six.', show: 'm.1', focus: 'm.1' },
        { say: 'Now solve it as before. Undo the adding first: subtract six from both sides. Four n equals twenty.', show: 'm.2', hide: ['bal.l-take', 'bal.r-take', 'bal.labels'], focus: 'm.2' },
        { say: 'Then undo the multiplying: divide both sides by four. Each bag balances five marbles, so n equals five.', show: 'm.3', focus: ['m.3', ...G.map((g) => `bal.l-g${g}`)] },
        { say: 'Check: four times five is twenty, and twenty plus six is twenty-six. It works!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Think of a number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Simran thinks of a number, multiplies it by $5$, then adds $8$. The result is $53$. What was the number?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Let $n$ be the number.', 'Multiply it by $5$: $\\;5n$', 'Then add $8$: $\\;5n + 8$', 'The result is $53$: $\\;5n + 8 = 53$'],
        },
      ],
      lines: [
        { say: 'Here is a number puzzle. Simran thinks of a number, multiplies it by five, then adds eight. The result is fifty-three. What was the number?', show: 'q' },
        { say: 'We do not know the number, so let n be the number.', show: 'b.0' },
        { say: 'Multiply it by five, and you get five n.', show: 'b.1' },
        { say: 'Then add eight, and you get five n plus eight.', show: 'b.2' },
        { say: 'The result is fifty-three. So the equation is five n plus eight equals fifty-three.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Undo the puzzle',
      layout: 'center',
      main: [puzzle('pz'), { kind: 'math', id: 'm', size: 'md', lines: ['5n + 8 - 8 = 53 - 8 \\quad\\to\\quad 5n = 45', '\\dfrac{5n}{5} = \\dfrac{45}{5} \\quad\\to\\quad n = 9', '\\text{Check: } 5 \\times 9 + 8 = 45 + 8 = 53 \\;\\checkmark'] }],
      lines: [
        { say: 'Here are the steps Simran did: multiply by five, then add eight, to get fifty-three.', show: ['pz.n0', 'pz.f0', 'pz.n1', 'pz.f1', 'pz.n2'] },
        { say: 'Undo them in reverse order. The last step was adding eight, so subtract eight from both sides first. Fifty-three minus eight is forty-five, so five n equals forty-five.', show: ['pz.b2', 'pz.u1', 'pz.b1', 'm.0'], focus: ['pz.u1', 'm.0'] },
        { say: 'Then undo multiplying by five: divide both sides by five. Forty-five divided by five is nine. So n equals nine.', show: ['pz.u0', 'pz.b0', 'm.1'], focus: ['pz.b0', 'm.1'] },
        { say: 'Check in the puzzle: nine times five is forty-five, and forty-five plus eight is fifty-three. Simran’s number was nine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Priya thinks of a number, multiplies it by $3$, then adds $7$. The result is $31$. What was the number?',
          choices: ['$24$', '$38$', '$14$', '$8$'],
          answer: 3,
          working: 'Let $n$ be the number: $3n + 7 = 31$. Subtract $7$: $3n = 24$. Divide by $3$: $n = 8$. Check: $3 \\times 8 + 7 = 31$.',
        },
      ],
      lines: [
        { say: 'Your turn. Priya thinks of a number, multiplies it by three, then adds seven. The result is thirty-one. What was the number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eight. The equation is three n plus seven equals thirty-one. Subtract seven: three n equals twenty-four. Divide by three: n equals eight. Choice A stops after one step: twenty-four is three times the number.', show: 'q.answer' },
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
          items: ['The two sides of an equation can be swapped: $26 = 4n + 6$ is the same as $4n + 6 = 26$.', 'For a number puzzle, let $n$ be the number, and build the equation one step at a time.', 'Undo the steps in reverse order, then check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The two sides of an equation can be swapped, so it does not matter which side the variable is on.', show: 'sum.0' },
        { say: 'For a number puzzle, let n be the number, and build the equation one step at a time.', show: 'sum.1' },
        { say: 'Then undo the steps in reverse order, and check. In the next part, you will write equations for problems about money. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
