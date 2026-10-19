import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from './lib/m5-7-figures.ts';

// 3n + 4 = 19 on a balance: 3 bags and 4 marbles on the left; 19 marbles on the right, in rows
// of 5 (three rows to keep, and the 4 to take away on top).
const scale = (id: string, height?: number) =>
  figure(
    id,
    [
      balance({
        left: { bags: 3, marbles: [{ id: 'take', count: 4 }] },
        right: {
          marbles: [
            { id: 'row0', count: 5, tone: 'theta' },
            { id: 'row1', count: 5, tone: 'opp' },
            { id: 'row2', count: 5, tone: 'theta' },
            { id: 'take', count: 4 },
          ],
        },
        labels: ['3n + 4', '19'],
      }),
    ],
    height,
  );
const all = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-take`, `${id}.r-row0`, `${id}.r-row1`, `${id}.r-row2`, `${id}.r-take`, `${id}.labels`];

// n, times 3, plus 4, gives 19; undone in reverse: 19, minus 4, is 15, divided by 3, is 5.
const steps = (id: string) =>
  figure(
    id,
    [
      chain({
        nodes: ['n', '3n', '19'],
        ops: ['\\times 3', '+\\,4'],
        back: ['5', '15', '19'],
        undo: ['\\div 3', '-\\,4'],
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm5-7-3-c',
  lessonId: 'm5-7-3',
  title: 'Solving Equations, Part 3: Equations with Two Operations',
  thumbnailTitle: 'Two-Step Equations',
  thumbnail: 'sc',
  summary:
    'Solving equations with two operations by undoing them in reverse order: 3n + 4 = 19 (subtract 4, then divide by 3: n = 5, as bags of marbles on a balance) and x/4 − 2 = 6 (add 2, then multiply by 4: x = 32), why dividing first goes wrong, and checking by substituting.',
  scenes: [
    {
      layout: 'center',
      main: [
        {
          kind: 'title',
          id: 'title',
          kicker: 'Expressions and Equations · Part 3',
          title: 'Equations with Two Operations',
          subtitle: 'Undo in reverse order',
        },
      ],
      lines: [
        {
          say: 'Some equations do two things to the variable, like multiply it, and then add a number.',
          show: 'title',
        },
        {
          say: 'In this video, you will solve equations with two operations, by undoing them in reverse order.',
        },
      ],
    },
    {
      chapter: 'Bags and marbles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3n + 4 = 19'] }, scale('sc', 440)],
      lines: [
        {
          say: 'The picture shows three n, plus four, equals nineteen. Each square is a bag with n marbles inside, and every bag holds the same number. Each dot is one marble.',
          show: [...all('sc'), 'm.0'],
        },
        {
          say: 'The scale is level. Three bags and four marbles weigh the same as nineteen marbles.',
        },
        {
          say: 'How many marbles are in each bag? Let’s find out, step by step.',
        },
      ],
    },
    {
      chapter: 'Reverse order',
      layout: 'center',
      main: [
        steps('st'),
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Undo in reverse order',
          md: 'In $3n + 4$, $n$ is multiplied by $3$ first, then $4$ is added. To solve, undo the adding first, then the multiplying.',
        },
      ],
      lines: [
        {
          say: 'In three n, plus four, two things happen to n. First, it is multiplied by three. Then four is added, and that gives nineteen.',
          show: ['st.n0', 'st.f0', 'st.n1', 'st.f1', 'st.n2'],
        },
        {
          say: 'To solve, undo them in reverse order. The last thing done was adding four, so undo that first: nineteen minus four is fifteen.',
          show: ['st.b2', 'st.u1', 'st.b1'],
          focus: ['st.u1', 'st.b1'],
        },
        {
          say: 'Then undo the multiplying: fifteen divided by three is five.',
          show: ['st.u0', 'st.b0'],
          focus: ['st.u0', 'st.b0'],
        },
        {
          say: 'It is like putting on socks and then shoes. To take them off, the shoes come off first, even though the socks went on first.',
          show: 'key',
        },
      ],
    },
    {
      chapter: 'Two steps',
      layout: 'split',
      leftWidth: 700,
      left: [scale('s2')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['3n + 4 = 19', '3n = 19 - 4 = 15', 'n = 15 \\div 3 = 5', '\\text{Check: } 3 \\times 5 + 4 = 19 \\;\\checkmark'],
        },
      ],
      lines: [
        {
          say: 'Now on the balance. Undo the adding: subtract four from both sides. Take four marbles away from each side.',
          show: [...all('s2'), 'm.0'],
          focus: ['s2.l-take', 's2.r-take'],
        },
        {
          say: 'Now three bags balance fifteen marbles. Three n equals nineteen minus four, which is fifteen.',
          hide: ['s2.l-take', 's2.r-take'],
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'Undo the multiplying: divide both sides by three. The fifteen marbles make three rows of five, one row for each bag. So n equals fifteen divided by three, which is five.',
          show: 'm.2',
          focus: ['m.2', 's2.r-row0', 's2.r-row1', 's2.r-row2'],
        },
        {
          say: 'Check: three times five, plus four, is fifteen plus four, which is nineteen. Both sides are equal. So n equals five: each bag has five marbles.',
          show: 'm.3',
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'A quotient and a subtraction',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\dfrac{x}{4} - 2 = 6', '\\dfrac{x}{4} = 6 + 2 = 8', 'x = 8 \\times 4 = 32', '\\text{Check: } 32 \\div 4 - 2 = 8 - 2 = 6 \\;\\checkmark'],
        },
      ],
      lines: [
        {
          say: 'Solve x over four, minus two, equals six.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'First, x is divided by four. Then two is subtracted. Undo in reverse: undo the subtracting first. Add two to both sides. x over four equals six plus two, which is eight.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'Then undo the dividing. Multiply both sides by four: x equals eight times four, which is thirty-two.',
          show: 'm.2',
          focus: 'm.2',
        },
        {
          say: 'Check: thirty-two divided by four is eight, and eight minus two is six. So x equals thirty-two.',
          show: 'm.3',
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Undo the adding first',
          md: 'In $3n + 4 = 19$, do not divide by $3$ first: $19 \\div 3$ does not come out even, and the $4$ is still there. Take away the $4$ first.',
        },
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Always check',
          md: 'To **verify** a solution, substitute it into the equation. If both sides have the same value, your solution is correct.',
        },
      ],
      lines: [
        {
          say: 'Watch out. In three n, plus four, equals nineteen, do not divide by three first. Nineteen divided by three does not come out even, and the four is still there.',
          show: 'oops',
        },
        { say: 'Take away the four first. Then divide by three.' },
        {
          say: 'And always check. To verify a solution, substitute it into the equation. If both sides have the same value, your solution is correct.',
          show: 'tip',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2n + 5 = 17$.',
          choices: ['$n = 11$', '$n = 12$', '$n = 22$', '$n = 6$'],
          answer: 3,
          working: 'Subtract $5$ from both sides: $2n = 12$. Divide both sides by $2$: $n = 6$. Check: $2 \\times 6 + 5 = 17$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Solve two n, plus five, equals seventeen. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, n equals six. Subtract five from both sides to get two n equals twelve. Then divide both sides by two to get six. Choice B stops too soon: twelve is two n, not n.',
          show: 'q.answer',
        },
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
          items: ['With two operations, undo them in reverse order.', 'Undo the adding or subtracting first, then the multiplying or dividing.', 'Check by substituting the solution into the equation.'],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. With two operations, undo them in reverse order.',
          show: 'sum.0',
        },
        {
          say: 'Undo the adding or subtracting first, then the multiplying or dividing.',
          show: 'sum.1',
        },
        {
          say: 'And check by substituting the solution into the equation. In the next part, you will write and solve equations for problems. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
