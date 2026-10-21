import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// x/4 − 3 = 2: divide by 4, then subtract 3; undone by adding 3, then multiplying by 4.
const steps = (id: string) => figure(id, [chain({ nodes: ['x', '\\tfrac{x}{4}', '2'], ops: ['\\div 4', '-\\,3'], back: ['20', '5', '2'], undo: ['\\times 4', '+\\,3'], gap: 3.2 })], 230);

const video: Explainer = {
  id: 'm8-7-2-c',
  lessonId: 'm8-7-2',
  title: 'Solving Two-Step Equations, Part 3: Division and a Different Order',
  thumbnailTitle: 'Division and a Different Order',
  thumbnail: 'ch',
  summary:
    'For x/4 − 3 = 2, undo the subtracting first (x/4 = 5), then multiply both sides by 4 (x = 20); check: 20/4 − 3 = 2. When the number comes first, as in 7 − 2x = 15, rewrite it as −2x + 7 = 15: the minus sign belongs to 2x, so the coefficient is −2. Then −2x = 8 and x = −4; check: 7 − 2(−4) = 15. With the variable on the right, 1 = x/(−2) + 6, swap the sides first: x = 10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 3', title: 'Division and a Different Order', subtitle: 'Rewrite it, then undo it' }],
      lines: [
        { say: 'Not every two-step equation looks the same. Some divide the variable, some start with a number, and some have the variable on the right.', show: 'title' },
        { say: 'In this part, you will solve all three kinds, with the same plan as before.' },
      ],
    },
    {
      chapter: 'Equations with division',
      layout: 'center',
      main: [
        steps('ch'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{4} - 3 = 2 \\qquad \\dfrac{x}{4} = 2 + 3 = 5', 'x = 5 \\times 4 = 20', '\\text{Check: } \\dfrac{20}{4} - 3 = 5 - 3 = 2 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Solve x over four, minus three, equals two. Here, x is divided by four, and then three is subtracted.', show: ['ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2'] },
        { say: 'Undo the subtracting first: add three to both sides. Two plus three is five, so x over four equals five.', show: ['ch.b2', 'ch.u1', 'ch.b1', 'm.0'], focus: ['ch.u1', 'm.0'] },
        { say: 'Then undo dividing by four: multiply both sides by four. Five times four is twenty, so x equals twenty.', show: ['ch.u0', 'ch.b0', 'm.1'], focus: ['ch.u0', 'm.1'] },
        { say: 'Check: twenty divided by four is five, and five minus three is two. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A different order',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Solve $7 - 2x = 15$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2x + 7 = 15', '-2x = 15 - 7 = 8', 'x = 8 \\div (-2) = -4', '\\text{Check: } 7 - 2(-4) = 7 + 8 = 15 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Sometimes the number comes first, as in seven minus two x equals fifteen.', show: 'q' },
        { say: 'Rewrite it in the usual order first. Seven minus two x is the same as negative two x plus seven. So negative two x plus seven equals fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract seven from both sides. Fifteen minus seven is eight, so negative two x equals eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by negative two. Eight divided by negative two is negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check in the original equation: seven minus two times negative four is seven plus eight, which is fifteen. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep the sign with its term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep the sign with its term', md: 'In $7 - 2x$, the minus sign belongs to $2x$. That is why the coefficient is $-2$, not $2$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['7 \\; \\boxed{-\\,2x} \\;=\\; \\boxed{-\\,2x} + 7'] },
      ],
      lines: [
        { say: 'Here is the key idea. In seven minus two x, the minus sign belongs to the two x. It travels with its term.', show: 'tip' },
        { say: 'So when you move the two x to the front, it is negative two x. The coefficient is negative two, not two.', show: 'm.0', focus: 'm.0' },
        { say: 'If you drop that sign, you would get x equals four, and the check would fail: seven minus eight is negative one, not fifteen.' },
      ],
    },
    {
      chapter: 'The variable on the right',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Solve $1 = \\dfrac{x}{-2} + 6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{-2} + 6 = 1', '\\dfrac{x}{-2} = 1 - 6 = -5', 'x = -5 \\times (-2) = 10', '\\text{Check: } \\dfrac{10}{-2} + 6 = -5 + 6 = 1 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Sometimes the variable is on the right, as in one equals x over negative two, plus six.', show: 'q' },
        { say: 'The two sides are equal, so you can swap them. Write x over negative two, plus six, equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract six from both sides. One minus six is negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by negative two. Negative five times negative two is positive ten, so x equals ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: ten divided by negative two is negative five, and negative five plus six is one. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $10 - 3x = 4$.',
          choices: ['$x = 2$', '$x = -2$', '$x = -6$', '$x = 6$'],
          answer: 0,
          working: 'Rewrite: $-3x + 10 = 4$. Subtract $10$: $-3x = -6$. Divide by $-3$: $x = 2$. Check: $10 - 3(2) = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve ten minus three x equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, x equals two. Rewrite it as negative three x plus ten equals four. Subtract ten to get negative three x equals negative six, then divide by negative three. Choice B uses three instead of negative three as the coefficient.', show: 'q.answer' },
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
            'For $\\dfrac{x}{4} - 3 = 2$: add $3$, then multiply by $4$.',
            'Rewrite $7 - 2x$ as $-2x + 7$: the sign stays with its term.',
            'With the variable on the right, swap the two sides first.',
            'Check in the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When x is divided by a number, undo the adding or subtracting first, then multiply.', show: 'sum.0' },
        { say: 'When the number comes first, rewrite the equation in the usual order, and keep each sign with its term.', show: 'sum.1' },
        { say: 'When the variable is on the right, swap the two sides.', show: 'sum.2' },
        { say: 'And always check in the original equation. In the next part, you will solve equations with brackets. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
