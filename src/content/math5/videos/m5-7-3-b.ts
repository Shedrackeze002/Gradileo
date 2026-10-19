import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from './lib/m5-7-figures.ts';

// 6k = 42 on a balance: 6 bags on the left, 42 marbles in 6 rows of 7 on the right.
const ROWS = [0, 1, 2, 3, 4, 5];
const sixBags = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'k',
        perRow: 7,
        left: { bags: 6 },
        right: {
          marbles: ROWS.map((r) => ({
            id: `row${r}`,
            count: 7,
            tone: r % 2 ? ('opp' as const) : ('theta' as const),
          })),
        },
        labels: ['6k', '42'],
      }),
    ],
    440,
  );
const all = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.labels`, ...ROWS.map((r) => `${id}.r-row${r}`)];

const times = (id: string) =>
  figure(
    id,
    [
      chain({
        nodes: ['k', '42'],
        ops: ['\\times 6'],
        back: ['7', '42'],
        undo: ['\\div 6'],
        gap: 3.4,
      }),
    ],
    240,
  );
const divide = (id: string) =>
  figure(
    id,
    [
      chain({
        nodes: ['m', '5'],
        ops: ['\\div 3'],
        back: ['15', '5'],
        undo: ['\\times 3'],
        gap: 3.4,
      }),
    ],
    240,
  );

const video: Explainer = {
  id: 'm5-7-3-b',
  lessonId: 'm5-7-3',
  title: 'Solving Equations, Part 2: Undoing Multiplying and Dividing',
  thumbnailTitle: 'Undo It',
  thumbnail: 'bal',
  summary:
    'Solving equations with one operation by doing the inverse to both sides: 6k = 42 by dividing by 6 (k = 7, six bags sharing 42 marbles), m/3 = 5 by multiplying by 3 (m = 15), n − 4 = 9 by adding 4 (n = 13), and checking each solution.',
  scenes: [
    {
      layout: 'center',
      main: [
        {
          kind: 'title',
          id: 'title',
          kicker: 'Expressions and Equations · Part 2',
          title: 'Undoing Multiplying and Dividing',
          subtitle: 'Equations with one operation',
        },
      ],
      lines: [
        {
          say: 'In the last part, you undid adding by subtracting. Multiplying and dividing can be undone in the same way.',
          show: 'title',
        },
        {
          say: 'In this video, you will solve equations where the variable is multiplied or divided, and check each solution.',
        },
      ],
    },
    {
      chapter: 'Six bags',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6k = 42'] }, sixBags('bal')],
      lines: [
        {
          say: 'Here is the equation six k equals forty-two. Six k means six times k.',
          show: 'm.0',
        },
        {
          say: 'On the balance, there are six bags. Each bag holds k marbles. Together, they weigh the same as forty-two marbles.',
          show: all('bal'),
        },
        {
          say: 'To find what is in one bag, share the forty-two marbles equally among the six bags. Each bag gets one row of seven.',
          focus: ['bal.r-row0', 'bal.r-row1', 'bal.r-row2', 'bal.r-row3', 'bal.r-row4', 'bal.r-row5'],
        },
        {
          say: 'So each bag holds seven marbles. Sharing equally is dividing, so we found k by dividing by six.',
        },
      ],
    },
    {
      chapter: 'Undo multiplying',
      layout: 'center',
      main: [
        times('tm'),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['6k = 42', '6k \\div 6 = 42 \\div 6', 'k = 7', '\\text{Check: } 6 \\times 7 = 42 \\;\\checkmark'],
        },
      ],
      lines: [
        {
          say: 'Here it is with inverse operations. In six k, the variable k is multiplied by six, and gives forty-two.',
          show: ['tm.n0', 'tm.f0', 'tm.n1', 'm.0'],
        },
        {
          say: 'The inverse of multiplying by six is dividing by six. So divide both sides by six.',
          show: ['tm.b1', 'tm.u0', 'm.1'],
          focus: ['tm.u0', 'm.1'],
        },
        {
          say: 'k equals forty-two divided by six, which is seven.',
          show: ['tm.b0', 'm.2'],
          focus: ['tm.b0', 'm.2'],
        },
        {
          say: 'Check: six times seven is forty-two. So k equals seven.',
          show: 'm.3',
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'Undo dividing',
      layout: 'center',
      main: [
        divide('dv'),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{m}{3} = 5', 'm = 5 \\times 3 = 15', '\\text{Check: } 15 \\div 3 = 5 \\;\\checkmark'],
        },
      ],
      lines: [
        {
          say: 'Now solve m over three equals five. m over three means m divided by three.',
          show: ['dv.n0', 'dv.f0', 'dv.n1', 'm.0'],
        },
        {
          say: 'The inverse of dividing by three is multiplying by three. So multiply both sides by three.',
          show: ['dv.b1', 'dv.u0'],
          focus: 'dv.u0',
        },
        {
          say: 'm equals five times three, which is fifteen.',
          show: ['dv.b0', 'm.1'],
          focus: ['dv.b0', 'm.1'],
        },
        {
          say: 'Check: fifteen divided by three is five. So m equals fifteen.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Undo subtracting',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['n - 4 = 9', 'n = 9 + 4 = 13', '\\text{Check: } 13 - 4 = 9 \\;\\checkmark'],
        },
      ],
      lines: [
        {
          say: 'One more. Solve n minus four equals nine.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'Four is subtracted from n. The inverse of subtracting four is adding four. So add four to both sides: n equals nine plus four, which is thirteen.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'Check: thirteen minus four is nine. So n equals thirteen.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Undo with the inverse',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Done to the variable', 'Undo it by'],
          rows: [
            ['adding $7$', 'subtracting $7$'],
            ['subtracting $4$', 'adding $4$'],
            ['multiplying by $6$', 'dividing by $6$'],
            ['dividing by $3$', 'multiplying by $3$'],
          ],
        },
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Do the opposite',
          md: 'Find what is done to the variable, then do the **opposite** to both sides of the equation.',
        },
      ],
      lines: [
        {
          say: 'Here are all four. If seven is added to the variable, undo it by subtracting seven. If four is subtracted, undo it by adding four.',
          show: ['t.0', 't.1'],
        },
        {
          say: 'If the variable is multiplied by six, undo it by dividing by six. And if it is divided by three, undo it by multiplying by three.',
          show: ['t.2', 't.3'],
        },
        {
          say: 'Every time, find what is done to the variable, and do the opposite to both sides of the equation.',
          show: 'key',
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
          prompt: 'Solve $8p = 56$.',
          choices: ['$p = 448$', '$p = 48$', '$p = 7$', '$p = 64$'],
          answer: 2,
          working: '$8p$ means $8 \\times p$, so divide both sides by $8$: $p = 56 \\div 8 = 7$. Check: $8 \\times 7 = 56$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Solve eight p equals fifty-six. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, p equals seven. Eight p means eight times p, so divide both sides by eight: fifty-six divided by eight is seven. Choice A multiplies by eight instead of dividing.',
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
          items: ['Undo multiplying by dividing: $6k = 42$, so $k = 42 \\div 6 = 7$.', 'Undo dividing by multiplying: $\\dfrac{m}{3} = 5$, so $m = 5 \\times 3 = 15$.', 'Do the same thing to both sides, and check by substituting.'],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. Undo multiplying by dividing. Six k equals forty-two, so k is forty-two divided by six, which is seven.',
          show: 'sum.0',
        },
        {
          say: 'Undo dividing by multiplying. m over three equals five, so m is five times three, which is fifteen.',
          show: 'sum.1',
        },
        {
          say: 'And do the same thing to both sides, then check by substituting. In the next part, you will solve equations with two operations. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
