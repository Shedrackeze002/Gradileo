import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// x/4 + 3 = 7: what is done to x along the top, and the undoing, in reverse order, along the bottom.
const steps = (id: string) =>
  figure(id, [chain({ nodes: ['x', 'x/4', '7'], ops: ['\\div 4', '+\\,3'], back: ['16', '4', '7'], undo: ['\\times 4', '-\\,3'], gap: 3 })], 280);

const video: Explainer = {
  id: 'm9-6-2-c',
  lessonId: 'm9-6-2',
  title: 'Equations with Brackets and Fractions, Part 3: x Divided by a Number',
  thumbnailTitle: 'x Divided by a Number',
  thumbnail: 'ch',
  summary:
    'In x/4 + 3 = 7, x is divided by 4 and then 3 is added, so undo the steps in reverse order: subtract 3 from both sides (x/4 = 4), then multiply both sides by 4 (x = 16), and 16/4 + 3 = 7 checks it. With fractions on both sides, x/3 − 1/2 = 5/6: add 1/2 (x/3 = 8/6 = 4/3), then multiply by 3: x = 4. Multiplying every term by the LCD first gives the same answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 3', title: 'x Divided by a Number', subtitle: 'Undo in reverse order' }],
      lines: [
        { say: 'Four friends share the cost of a pizza equally, and each friend also pays three dollars for a drink. Each friend pays seven dollars in all. What did the pizza cost? If x is the cost of the pizza, then x over four, plus three, equals seven.', show: 'title' },
        { say: 'In this part, you will solve equations where the variable is divided by a number, by undoing the steps in reverse order.' },
      ],
    },
    {
      chapter: 'Undo in reverse order',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{x}{4} + 3 = 7'] }, steps('ch')],
      lines: [
        { say: 'Look at x over four, plus three, equals seven. Two things happen to x. First, it is divided by four. Then three is added, and the result is seven.', show: ['m.0', 'ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2'] },
        { say: 'To find x, undo the steps in reverse order, like taking off your shoes before your socks.' },
        { say: 'The last step was adding three, so undo that first. Seven minus three is four.', show: ['ch.b2', 'ch.u1', 'ch.b1'], focus: ['ch.u1', 'ch.b1'] },
        { say: 'Then undo dividing by four, by multiplying by four. Four times four is sixteen. So x equals sixteen.', show: ['ch.u0', 'ch.b0'], focus: ['ch.u0', 'ch.b0'] },
      ],
    },
    {
      chapter: 'With the balance steps',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{4} + 3 = 7', '\\dfrac{x}{4} = 4 \\qquad \\text{subtract } 3', 'x = 16 \\qquad \\text{multiply by } 4', '\\text{Check: } \\dfrac{16}{4} + 3 = 4 + 3 = 7 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here are the same steps, done to both sides of the equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract three from both sides: x over four equals four.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by four: x equals sixteen. Multiplying undoes dividing.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: sixteen divided by four is four, and four plus three is seven. It works. So the pizza cost sixteen dollars.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Fractions on both sides',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\dfrac{x}{3} - \\dfrac{1}{2} = \\dfrac{5}{6}', '\\dfrac{x}{3} = \\dfrac{5}{6} + \\dfrac{3}{6} = \\dfrac{8}{6} = \\dfrac{4}{3} \\qquad \\text{add } \\dfrac{1}{2}', 'x = 4 \\qquad \\text{multiply by } 3'],
        },
      ],
      lines: [
        { say: 'Now solve x over three, minus one half, equals five sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'Undo the subtraction first: add one half to both sides. One half is three sixths, and five sixths plus three sixths is eight sixths, which simplifies to four thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'So x over three equals four thirds. Multiply both sides by three: x equals four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check, or clear the fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Check: } \\dfrac{4}{3} - \\dfrac{1}{2} = \\dfrac{8}{6} - \\dfrac{3}{6} = \\dfrac{5}{6} \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Or clear the fractions', md: 'Multiply **every** term by the LCD, $6$: $2x - 3 = 5$, so $2x = 8$ and $x = 4$.' },
      ],
      lines: [
        { say: 'Check: four thirds minus one half is eight sixths minus three sixths, which is five sixths. It works.', show: 'm.0', focus: 'm.0' },
        { say: 'You could also clear the fractions first. The lowest common denominator of three, two and six is six. Multiply every term by six: two x minus three equals five.', show: 'tip' },
        { say: 'Then two x equals eight, and x equals four. The same answer, with no fractions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x}{5} - 2 = 3$.',
          choices: ['$x = 5$', '$x = 1$', '$x = 25$', '$x = 17$'],
          answer: 2,
          working: 'Add $2$ to both sides: $\\dfrac{x}{5} = 5$. Multiply both sides by $5$: $x = 25$. Check: $25 \\div 5 - 2 = 5 - 2 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x over five, minus two, equals three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Add two to both sides: x over five equals five. Multiply both sides by five: x equals twenty-five. Choice D multiplies by five but does not multiply the two as well. Every term must be multiplied.', show: 'q.answer' },
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
            'Undo the steps done to $x$ in reverse order.',
            'Undo adding or subtracting first, then multiply to undo dividing.',
            '$\\dfrac{x}{4} + 3 = 7$ gives $\\dfrac{x}{4} = 4$, so $x = 16$.',
            'With fractions, you can multiply every term by the LCD first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Undo the steps done to x in reverse order.', show: 'sum.0' },
        { say: 'Undo the adding or subtracting first. Then multiply, to undo the dividing.', show: 'sum.1' },
        { say: 'For x over four, plus three, equals seven, that gives x equals sixteen.', show: 'sum.2' },
        { say: 'And with fractions, you can multiply every term by the lowest common denominator first. In the next part, you will solve equations with x in the denominator. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
