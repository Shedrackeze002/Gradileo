import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// What is done to x along the top, and the inverse operations, in reverse order, along the bottom.
const steps = (id: string, nodes: string[], ops: string[], back: string[], undo: string[]) => figure(id, [chain({ nodes, ops, back, undo, gap: 3.2 })], 230);
const top = (fig: string) => [`${fig}.n0`, `${fig}.f0`, `${fig}.n1`, `${fig}.f1`, `${fig}.n2`];

const video: Explainer = {
  id: 'm8-7-2-b',
  lessonId: 'm8-7-2',
  title: 'Solving Two-Step Equations, Part 2: Two-Step Equations with Integers',
  thumbnailTitle: 'Two-Step Equations with Integers',
  thumbnail: 'c1',
  summary:
    'The steps are the same with negative numbers. −3x + 5 = 20: subtract 5 from both sides (−3x = 15), then divide both sides by −3 (x = −5); check: −3(−5) + 5 = 20. 4x − 7 = −19: add 7 to both sides (4x = −12), then divide by 4 (x = −3); check: 4(−3) − 7 = −19. Undo adding or subtracting first, then multiplying or dividing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 2', title: 'Two-Step Equations with Integers', subtitle: 'The same steps, with the sign rules' }],
      lines: [
        { say: 'Two-step equations often have negative numbers in them. The good news is that the steps are exactly the same.', show: 'title' },
        { say: 'In this part, you will solve two-step equations with integers, using the sign rules as you go.' },
      ],
    },
    {
      chapter: 'Solving −3x + 5 = 20',
      layout: 'center',
      main: [
        steps('c1', ['x', '-3x', '20'], ['\\times (-3)', '+\\,5'], ['-5', '15', '20'], ['\\div (-3)', '-\\,5']),
        { kind: 'math', id: 'm', size: 'md', lines: ['-3x + 5 = 20', '-3x = 20 - 5 = 15', 'x = 15 \\div (-3) = -5', '\\text{Check: } {-3}(-5) + 5 = 15 + 5 = 20 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Solve negative three x plus five equals twenty. First, x is multiplied by negative three. Then five is added.', show: [...top('c1'), 'm.0'] },
        { say: 'Undo in reverse order. Undo adding five by subtracting five from both sides. Twenty minus five is fifteen, so negative three x equals fifteen.', show: ['c1.b2', 'c1.u1', 'c1.b1', 'm.1'], focus: ['c1.u1', 'm.1'] },
        { say: 'Then undo multiplying by negative three: divide both sides by negative three. Fifteen divided by negative three is negative five, because the signs are different.', show: ['c1.u0', 'c1.b0', 'm.2'], focus: ['c1.u0', 'm.2'] },
        { say: 'Check: negative three times negative five is fifteen, and fifteen plus five is twenty. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Solving 4x − 7 = −19',
      layout: 'center',
      main: [
        steps('c2', ['x', '4x', '-19'], ['\\times 4', '-\\,7'], ['-3', '-12', '-19'], ['\\div 4', '+\\,7']),
        { kind: 'math', id: 'm', size: 'md', lines: ['4x - 7 = -19', '4x = -19 + 7 = -12', 'x = -12 \\div 4 = -3', '\\text{Check: } 4(-3) - 7 = -12 - 7 = -19 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now solve four x minus seven equals negative nineteen. Here, x is multiplied by four, and then seven is subtracted.', show: [...top('c2'), 'm.0'] },
        { say: 'To undo subtracting seven, add seven to both sides. Negative nineteen plus seven is negative twelve, so four x equals negative twelve.', show: ['c2.b2', 'c2.u1', 'c2.b1', 'm.1'], focus: ['c2.u1', 'm.1'] },
        { say: 'To undo multiplying by four, divide both sides by four. Negative twelve divided by four is negative three.', show: ['c2.u0', 'c2.b0', 'm.2'], focus: ['c2.u0', 'm.2'] },
        { say: 'Check: four times negative three is negative twelve, and negative twelve minus seven is negative nineteen. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What was done to $x$', 'Undo it by'],
          rows: [
            ['add a number', 'subtracting it'],
            ['subtract a number', 'adding it'],
            ['multiply by a number', 'dividing by it, sign and all'],
            ['divide by a number', 'multiplying by it, sign and all'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two steps', md: 'Undo the **adding or subtracting** first. Then undo the **multiplying or dividing**.' },
      ],
      lines: [
        { say: 'Here is the plan for every two-step equation. Each operation has an inverse that undoes it.', show: 't' },
        { say: 'To undo adding, subtract. To undo subtracting, add.', focus: ['t.0', 't.1'] },
        { say: 'To undo multiplying, divide, and to undo dividing, multiply. Keep the sign with the number.', focus: ['t.2', 't.3'] },
        { say: 'Undo the adding or subtracting first. Then undo the multiplying or dividing.', show: 'key', focus: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $-2x + 3 = 11$.',
          choices: ['$x = 4$', '$x = -4$', '$x = -7$', '$x = 7$'],
          answer: 1,
          working: 'Subtract $3$ from both sides: $-2x = 8$. Divide both sides by $-2$: $x = -4$. Check: $-2(-4) + 3 = 8 + 3 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve negative two x plus three equals eleven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, x equals negative four. Subtract three from both sides to get negative two x equals eight, then divide by negative two. Choice A divides by two, not negative two. Check it: negative two times four, plus three, is negative five, not eleven.', show: 'q.answer' },
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
            'Undo adding or subtracting first, then multiplying or dividing.',
            'To undo subtracting $7$, add $7$ to both sides.',
            'To undo multiplying by $-3$, divide both sides by $-3$.',
            'Check: $-3(-5) + 5 = 20$ and $4(-3) - 7 = -19$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With integers, the steps are the same: undo adding or subtracting first, then multiplying or dividing.', show: 'sum.0' },
        { say: 'To undo subtracting seven, add seven to both sides.', show: 'sum.1' },
        { say: 'To undo multiplying by negative three, divide both sides by negative three, sign and all.', show: 'sum.2' },
        { say: 'And check every solution in the original equation. In the next part, you will solve equations with division, and equations written in a different order. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
