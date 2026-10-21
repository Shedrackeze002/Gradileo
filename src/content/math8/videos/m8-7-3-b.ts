import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaModel } from '@/video/algebra.ts';
import { balanceParts, tileBalance } from './lib/m8-7-figures.ts';

// 3(x + 2) = 21: three groups of x + 2 on the left balance three rows of seven unit tiles, each
// group's unit tiles in the colour of the row it matches.
const TONES = ['opp', 'theta', 'opp'] as const;
const bal = (id: string) =>
  figure(
    id,
    [
      tileBalance({
        left: { blocks: [0, 1, 2].flatMap((g) => [{ id: `x${g}`, x: 1 }, { id: `a${g}`, units: 2, perRow: 1, tone: TONES[g] }]) },
        right: { stack: true, blocks: [0, 1, 2].map((g) => ({ id: `r${g}`, units: 7, tone: TONES[g] })) },
        labels: ['3(x + 2)', '21'],
      }),
    ],
    330,
  );
const LEFT = ['x0', 'a0', 'x1', 'a1', 'x2', 'a2'];
const RIGHT = ['r0', 'r1', 'r2'];

// −4(x − 3) = −4x + 12.
const area = (id: string) => figure(id, [areaModel({ top: ['x', '-3'], side: ['-4'], cells: [['-4x', '+12']] })], 200);

const video: Explainer = {
  id: 'm8-7-3-b',
  lessonId: 'm8-7-3',
  title: 'Equations with Brackets, Part 2: Two Ways to Solve',
  thumbnailTitle: 'Two Ways to Solve',
  thumbnail: 'bl',
  summary:
    'Method 1, divide first: in 3(x + 2) = 21 the whole bracket is multiplied by 3, so divide both sides by 3 (x + 2 = 7), then subtract 2 (x = 5); check: 3(5 + 2) = 21. Method 2, distribute first: −4(x − 3) = 20 becomes −4x + 12 = 20, so −4x = 8 and x = −2; check: −4(−2 − 3) = −4(−5) = 20. Dividing first gives the same answer: x − 3 = −5, so x = −2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 2', title: 'Two Ways to Solve', subtitle: 'Divide first, or distribute first' }],
      lines: [
        { say: 'How do you solve an equation with brackets, like three times the bracket x plus two equals twenty-one?', show: 'title' },
        { say: 'In this part, you will learn two methods: dividing first, and distributing first. Both give the same answer.' },
      ],
    },
    {
      chapter: 'Method 1: divide first',
      layout: 'center',
      main: [bal('bl'), { kind: 'math', id: 'm', size: 'md', lines: ['3(x + 2) = 21', 'x + 2 = 21 \\div 3 = 7 \\qquad x = 7 - 2 = 5', '\\text{Check: } 3(5 + 2) = 3(7) = 21 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Solve three times the bracket x plus two equals twenty-one. On a balance, three groups of x plus two balance twenty-one unit tiles.', show: [...balanceParts('bl', LEFT, RIGHT), 'm.0'] },
        { say: 'Method one: divide first. The whole bracket is multiplied by three, so undo that first. Share the twenty-one unit tiles among the three groups. Each group of x plus two matches one row of seven.', focus: ['bl.r-r0', 'bl.r-r1', 'bl.r-r2'] },
        { say: 'That is dividing both sides by three. So x plus two equals seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Now undo the adding: subtract two from both sides. Seven minus two is five, so x equals five.', focus: 'm.1' },
        { say: 'Check: five plus two is seven, and three times seven is twenty-one. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Method 2: distribute first',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'text', id: 'q', size: 'md', md: 'Solve $-4(x - 3) = 20$.' }, area('am')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-4x + 12 = 20', '-4x = 20 - 12 = 8', 'x = 8 \\div (-4) = -2', '\\text{Check: } {-4}(-2 - 3)', '= -4(-5) = 20 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Method two: distribute first. Solve negative four, times the bracket x minus three, equals twenty.', show: 'q' },
        { say: 'Use the distributive property to remove the brackets. Negative four times x is negative four x. Negative four times negative three is positive twelve.', show: ['am.top', 'am.side', 'am.outline', 'am.grid', 'am.c0-0', 'am.c0-1'] },
        { say: 'So the equation becomes negative four x plus twelve equals twenty. Now it is a two-step equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract twelve from both sides: negative four x equals eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by negative four: eight divided by negative four is negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: negative two minus three is negative five, and negative four times negative five is twenty. It works.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'The same answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['-4(x - 3) = 20', 'x - 3 = 20 \\div (-4) = -5', 'x = -5 + 3 = -2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two methods, one solution', md: 'Dividing first and distributing first always give the **same** solution. Use whichever is easier.' },
      ],
      lines: [
        { say: 'What if you divide first instead? The bracket is multiplied by negative four, so divide both sides by negative four.', show: 'm.0' },
        { say: 'Twenty divided by negative four is negative five. So x minus three equals negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Add three to both sides: negative five plus three is negative two. The same answer!', show: 'm.2', focus: 'm.2' },
        { say: 'Both methods always give the same solution, so you can use whichever is easier.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $5(x - 2) = 35$.',
          choices: ['$x = 5$', '$x = 7$', '$x = \\dfrac{37}{5}$', '$x = 9$'],
          answer: 3,
          working: 'Divide both sides by $5$: $x - 2 = 7$. Add $2$: $x = 9$. Check: $5(9 - 2) = 5(7) = 35$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five times the bracket x minus two equals thirty-five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, x equals nine. Divide both sides by five to get x minus two equals seven, then add two. Choice C multiplies only the x by five, so it misses the negative ten.', show: 'q.answer' },
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
            'Method 1: divide both sides by the number outside, then undo the adding or subtracting.',
            'Method 2: distribute, then solve the two-step equation.',
            'Both methods give the same solution.',
            'Check by substituting into the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Method one: divide both sides by the number outside the brackets, then undo the adding or subtracting.', show: 'sum.0' },
        { say: 'Method two: distribute to remove the brackets, then solve the two-step equation.', show: 'sum.1' },
        { say: 'Both methods give the same solution.', show: 'sum.2' },
        { say: 'And check by substituting into the original equation. In the next part, you will find mistakes and solve problems with brackets. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
