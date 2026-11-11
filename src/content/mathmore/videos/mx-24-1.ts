import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-24-1',
  lessonId: 'mx-24-1',
  title: 'Changing the Subject of a Formula',
  thumbnail: 'm',
  summary: 'The subject of a formula is the letter alone on one side. To change it, undo each operation in turn and do the same to both sides: v = u + at gives a = (v − u)/t. Clear fractions by multiplying, undo a square with a square root (A = πr² gives r = √(A/π)), and when the new subject appears twice, collect its terms and factorize.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulae, Variation and Linear Programming', title: 'Changing the Subject of a Formula', subtitle: 'Rearranging to find what we want' }],
      lines: [
        { say: 'The formula v equals u plus a t gives the final speed straight away. But what if we know the final speed and want the acceleration?', show: 'title' },
        { say: 'In this video, you will learn to rearrange a formula so that it gives the quantity you want directly.' },
      ],
    },
    {
      chapter: 'The subject',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subject of a formula', md: 'The letter that stands alone on one side of the equals sign. In $v = u + at$ the subject is $v$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['v = u + at', 'v - u = at', 'a = \\dfrac{v - u}{t}'] },
      ],
      lines: [
        { say: 'The subject of a formula is the letter that stands alone on one side of the equals sign. Here the subject is v.', show: 'def' },
        { say: 'Changing the subject works like solving an equation: we undo what has been done to the new subject, one step at a time, and do the same to both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'To make "a" the subject, first subtract u from both sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both sides by t. Now "a" equals v minus u, all over t.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Substituting',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$v = 26$, $u = 8$ and $t = 6$. Find $a$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['a = \\dfrac{26 - 8}{6} = \\dfrac{18}{6} = 3'] },
      ],
      lines: [
        { say: 'Once the letter we want is the subject, we substitute the numbers. Suppose v is twenty-six, u is eight and t is six.', show: 'q' },
        { say: 'Twenty-six minus eight is eighteen, and eighteen divided by six is three. The acceleration is three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Fractions and brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\dfrac{h(a + b)}{2}', '2A = h(a + b)', '\\dfrac{2A}{h} = a + b', 'a = \\dfrac{2A}{h} - b'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do the same to the whole side', md: 'Subtract $b$ from the whole of $\\dfrac{2A}{h}$. It is not $\\dfrac{2A - b}{h}$.' },
      ],
      lines: [
        { say: 'Here is the area of a trapezium. Let’s make "a" the subject.', show: 'm.0', focus: 'm.0' },
        { say: 'When there is a fraction, multiply both sides by the denominator first. That gives two A equals h times the bracket.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by h, the number outside the bracket.', show: 'm.2', focus: 'm.2' },
        { say: 'Then subtract b from both sides.', show: 'm.3', focus: 'm.3' },
        { say: 'Subtract b from the whole left side. Taking it away from the top of the fraction only would wrongly divide b by h as well.', show: 'oops' },
      ],
    },
    {
      chapter: 'Squares and repeats',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\pi r^2 \\ \\Rightarrow \\ r^2 = \\dfrac{A}{\\pi} \\ \\Rightarrow \\ r = \\sqrt{\\dfrac{A}{\\pi}}'] },
        { kind: 'math', id: 'n', size: 'lg', lines: ['ax + b = cx + d', 'ax - cx = d - b', 'x(a - c) = d - b', 'x = \\dfrac{d - b}{a - c}'] },
      ],
      lines: [
        { say: 'We undo a square with a square root. For the area of a circle, divide by pi, then take the square root. A radius is positive, so we take the positive root.', show: 'm.0', focus: 'm.0' },
        { say: 'Sometimes the new subject appears twice. To make x the subject here, collect the terms in x on one side.', show: ['n.0', 'n.1'], focus: 'n.1' },
        { say: 'Now factorize: x times the bracket, "a" minus c.', show: 'n.2', focus: 'n.2' },
        { say: 'And divide by that bracket to finish.', show: 'n.3', focus: 'n.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Make $t$ the subject of $s = \\dfrac{(u + v)t}{2}$.',
          choices: ['$t = \\dfrac{s}{2(u + v)}$', '$t = 2s - u - v$', '$t = \\dfrac{2s}{u + v}$', '$t = \\dfrac{2s}{u} + v$'],
          answer: 2,
          working: 'Multiply by $2$: $2s = (u + v)t$. Divide by $u + v$: $t = \\dfrac{2s}{u + v}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Make t the subject of this formula. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Multiply both sides by two, then divide both sides by u plus v. Choice A divides by two when it should multiply.', show: 'q.answer' },
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
          items: ['The subject is the letter alone on one side.', 'Undo each operation in turn, on both sides.', 'Clear fractions first; undo squares with square roots.', 'If the subject appears twice, collect and factorize.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The subject of a formula is the letter alone on one side.', show: 'sum.0' },
        { say: 'To change the subject, undo each operation in turn, and do the same to both sides.', show: 'sum.1' },
        { say: 'Clear fractions by multiplying, undo squares with square roots, and undo roots by squaring.', show: 'sum.2' },
        { say: 'And if the new subject appears twice, collect its terms and factorize. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
