import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// n + 7 = 15 on a balance: a bag and 7 marbles on the left, 15 marbles on the right.
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        left: { bags: 1, marbles: [{ id: 'seven', count: 7 }] },
        right: { marbles: [{ id: 'fifteen', count: 15 }] },
        labels: ['n + 7', '15'],
      }),
    ],
    330,
  );
const scaleAll = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-seven`, `${id}.r-fifteen`, `${id}.labels`];

// 4x = 28: four bags on the left, 28 marbles in 4 rows of 7 on the right.
const ROWS = [0, 1, 2, 3];
const fourBags = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 7,
        bagsPerRow: 4,
        left: { bags: 4 },
        right: { marbles: ROWS.map((r) => ({ id: `row${r}`, count: 7, tone: r % 2 ? ('opp' as const) : ('theta' as const) })) },
        labels: ['4x', '28'],
      }),
    ],
    400,
  );
const fourAll = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.labels`, ...ROWS.map((r) => `${id}.r-row${r}`)];

// x, times 4, gives 28; undo: 28, divided by 4, gives 7.
const undo = (id: string) => figure(id, [chain({ nodes: ['x', '28'], ops: ['\\times 4'], back: ['7', '28'], undo: ['\\div 4'], gap: 3.4 })], 230);

const video: Explainer = {
  id: 'm6-6-3',
  lessonId: 'm6-6-3',
  title: 'Solving Equations, Part 1: Equations and Inverse Operations',
  thumbnailTitle: 'Inverse Operations',
  thumbnail: 'fb',
  summary:
    'An equation says two expressions are equal, like a level balance, and its solution is the value of the variable that makes it true. Inverse operations undo each other, and whatever you do to one side you do to the other: 4x = 28, so divide both sides by 4 to get x = 7, and check that 4 × 7 = 28.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Equations and Inverse Operations', subtitle: 'Undo what was done to the variable' }],
      lines: [
        { say: 'A class trip costs fifty dollars for the bus, plus four dollars for each student. The total is one hundred two dollars. How many students are going?', show: 'title' },
        { say: 'An equation can answer that question, and by the end of this lesson, you will solve it. In this video, you will learn what an equation is, and solve equations with one operation.' },
      ],
    },
    {
      chapter: 'Equations',
      layout: 'center',
      main: [
        scale('sc'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equation and solution', md: 'An **equation** says that two expressions are equal, such as $n + 7 = 15$. The **solution** is the value of the variable that makes it true.' },
      ],
      lines: [
        { say: 'An equation says that two expressions are equal. It has an equals sign, like n plus seven equals fifteen.', show: 'def' },
        { say: 'Picture a balance. The bag holds n marbles. With seven more marbles, the left side weighs the same as fifteen marbles on the right. The balance is level, so both sides are equal.', show: scaleAll('sc') },
        { say: 'The solution of an equation is the value of the variable that makes it true. Here, the solution is n equals eight, because eight plus seven is fifteen.' },
      ],
    },
    {
      chapter: 'Inverse operations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse operations', md: '**Inverse operations** undo each other. Adding and subtracting undo each other. Multiplying and dividing undo each other.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Keep it balanced', md: 'Whatever you do to one side of an equation, do the same to the other side.' },
      ],
      lines: [
        { say: 'To solve an equation, we get the variable by itself on one side. We do it with inverse operations.', show: 'def' },
        { say: 'Inverse operations undo each other. Adding and subtracting undo each other: add five, then subtract five, and you are back where you started. Multiplying and dividing undo each other in the same way.' },
        { say: 'And one rule keeps the equation true. Whatever you do to one side, do the same to the other side, just like keeping a balance level.', show: 'key' },
      ],
    },
    {
      chapter: 'Four bags',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4x = 28'] }, fourBags('fb')],
      lines: [
        { say: 'Solve four x equals twenty-eight. Four x means four times x.', show: 'm.0' },
        { say: 'On the balance, there are four bags, and each bag holds x marbles. Together they weigh the same as twenty-eight marbles.', show: fourAll('fb') },
        { say: 'To find what is in one bag, share the twenty-eight marbles equally among the four bags. Each bag gets one row of seven.', focus: ROWS.map((r) => `fb.r-row${r}`) },
        { say: 'Sharing equally is dividing. So we found x by dividing by four: x equals seven.' },
      ],
    },
    {
      chapter: 'Undo the multiplying',
      layout: 'center',
      main: [undo('ud'), { kind: 'math', id: 'm', size: 'md', lines: ['4x = 28', '4x \\div 4 = 28 \\div 4', 'x = 7', '\\text{Check: } 4 \\times 7 = 28 \\;\\checkmark'] }],
      lines: [
        { say: 'Here it is with inverse operations. In four x, the variable x is multiplied by four, and the result is twenty-eight.', show: ['ud.n0', 'ud.f0', 'ud.n1', 'm.0'] },
        { say: 'To undo multiplying by four, divide by four. Divide both sides of the equation by four.', show: ['ud.b1', 'ud.u0', 'm.1'], focus: ['ud.u0', 'm.1'] },
        { say: 'Twenty-eight divided by four is seven. So x equals seven.', show: ['ud.b0', 'm.2'], focus: ['ud.b0', 'm.2'] },
        { say: 'Always check. Put x equals seven back into the equation. Four times seven is twenty-eight. Both sides are equal, so the solution is right.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Undo the operation that is really there', md: 'In $4x = 28$, the $4$ is **multiplied** by $x$. Subtracting $4$ does not undo it: $x = 24$ fails the check, since $4 \\times 24 = 96$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 28 - 4 = 24: \\quad 4 \\times 24 = 96 \\quad \\bad{\\text{not } 28}', 'x = 28 \\div 4 = 7: \\quad 4 \\times 7 = 28 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. In four x equals twenty-eight, the four is not added to x. It is multiplied by x.', show: 'oops' },
        { say: 'If you subtract four instead, you get x equals twenty-four. Check it: four times twenty-four is ninety-six, not twenty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'So use the inverse of the operation that is really there. The inverse of multiplying by four is dividing by four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $9x = 54$.',
          choices: ['$x = 6$', '$x = 45$', '$x = 63$', '$x = 486$'],
          answer: 0,
          working: '$9x$ means $9 \\times x$, so divide both sides by $9$: $x = 54 \\div 9 = 6$. Check: $9 \\times 6 = 54$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve nine x equals fifty-four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, x equals six. Nine x means nine times x, so divide both sides by nine: fifty-four divided by nine is six. Check: nine times six is fifty-four. Choice B subtracts nine, but the nine is multiplied, not added.', show: 'q.answer' },
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
          items: ['An equation says two expressions are equal. Its solution makes it true.', 'Inverse operations undo each other: $+$ and $-$, $\\times$ and $\\div$.', 'Do the same thing to both sides.', 'Check by putting the solution back into the equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation says two expressions are equal. Its solution is the value that makes it true.', show: 'sum.0' },
        { say: 'Inverse operations undo each other: adding and subtracting, and multiplying and dividing.', show: 'sum.1' },
        { say: 'Whatever you do to one side, do the same to the other side.', show: 'sum.2' },
        { say: 'And check your solution by putting it back into the equation. In the next part, you will solve equations with two operations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
