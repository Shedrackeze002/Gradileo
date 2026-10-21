import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// y = −2x − 1 for x = −2 to 2.
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: [-2, -1, 0, 1, 2] }, y: { title: 'y', values: [3, 1, -1, -3, -5] }, titleW: 1.1, cellW: 1.3 })], 290);

const video: Explainer = {
  id: 'm8-6-1-c',
  lessonId: 'm8-6-1',
  title: 'Linear Relations and Tables of Values, Part 3: Negative Values of x',
  thumbnailTitle: 'Negative Values of x',
  thumbnail: 'tb',
  summary:
    'Put brackets around a negative number when you substitute it, and use the integer sign rules. For y = −2x − 1: x = −2 gives −2(−2) − 1 = 4 − 1 = 3, then x = −1 gives 1, x = 0 gives −1, x = 1 gives −3 and x = 2 gives −5. A common mistake is −2(−2) = −4; a negative times a negative is positive, so −2(−2) = 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Negative Values of x', subtitle: 'Brackets and the sign rules' }],
      lines: [
        { say: 'Tables of values often use negative values of x as well as positive ones.', show: 'title' },
        { say: 'In this part, you will substitute negative numbers into an equation, using the sign rules for integers.' },
      ],
    },
    {
      chapter: 'Brackets and signs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Brackets for negatives', md: 'Put **brackets** around a negative number when you substitute it. Then use the sign rules: a positive times a negative is **negative**, and a negative times a negative is **positive**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(-2) = -6 \\qquad \\text{different signs}', '-2(-2) = 4 \\qquad \\text{same signs}'] },
      ],
      lines: [
        { say: 'When you substitute a negative number, put brackets around it. The brackets keep the negative sign with its number.', show: 'tip' },
        { say: 'Then use your sign rules. Three times negative two has different signs, so the product is negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative two times negative two has the same signs, so the product is positive four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'y = −2x − 1',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'text', id: 'q', size: 'md', md: 'Complete the table for $y = -2x - 1$.' }, table('tb')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['-2(-2) - 1 = 4 - 1 = 3', '-2(-1) - 1 = 2 - 1 = 1', '-2(0) - 1 = 0 - 1 = -1', '-2(1) - 1 = -2 - 1 = -3', '-2(2) - 1 = -4 - 1 = -5'],
        },
      ],
      lines: [
        { say: 'Complete a table of values for y equals negative two x minus one, using x equals negative two, negative one, zero, one and two.', show: ['q', 'tb.frame', 'tb.xs'] },
        { say: 'For x equals negative two: negative two times negative two is positive four, because the signs are the same. Four minus one is three.', show: ['m.0', 'tb.y0'], focus: ['m.0', 'tb.y0'] },
        { say: 'For x equals negative one: negative two times negative one is positive two. Two minus one is one.', show: ['m.1', 'tb.y1'], focus: ['m.1', 'tb.y1'] },
        { say: 'For x equals zero: negative two times zero is zero, and zero minus one is negative one.', show: ['m.2', 'tb.y2'], focus: ['m.2', 'tb.y2'] },
        { say: 'For x equals one: negative two times one is negative two. Negative two minus one is negative three.', show: ['m.3', 'tb.y3'], focus: ['m.3', 'tb.y3'] },
        { say: 'For x equals two: negative two times two is negative four, and negative four minus one is negative five.', show: ['m.4', 'tb.y4'], focus: ['m.4', 'tb.y4'] },
        { say: 'So the values of y are three, one, negative one, negative three and negative five.', focus: 'tb' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing a negative sign', md: 'For $x = -2$ in $y = -2x - 1$, some students write $-2(-2) = -4$. But a negative times a negative is **positive**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2(-2) = -4, \\quad y = -4 - 1 = -5 \\;\\bad{\\times}', '-2(-2) = 4, \\quad y = 4 - 1 = 3 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. For x equals negative two, some students write negative two times negative two as negative four. Then they get y equals negative five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But a negative times a negative is positive. Negative two times negative two is positive four, so y equals four minus one, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Whenever you multiply two negative numbers, stop and check the sign.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = -3x + 2$, what is $y$ when $x = -4$?',
          choices: ['$-10$', '$-14$', '$10$', '$14$'],
          answer: 3,
          working: 'Substitute $x = -4$: $y = -3(-4) + 2 = 12 + 2 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals negative three x plus two, what is y when x equals negative four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fourteen. Negative three times negative four is positive twelve, and twelve plus two is fourteen. Choice A loses a negative sign: it uses negative twelve instead of positive twelve.', show: 'q.answer' },
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
            'Put brackets around a negative number when you substitute it.',
            'A positive times a negative is negative.',
            'A negative times a negative is positive: $-2(-2) = 4$.',
            'For $y = -2x - 1$, the values of $y$ are $3,\\ 1,\\ -1,\\ -3,\\ -5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Put brackets around a negative number when you substitute it.', show: 'sum.0' },
        { say: 'A positive times a negative is negative.', show: 'sum.1' },
        { say: 'A negative times a negative is positive.', show: 'sum.2' },
        { say: 'For y equals negative two x minus one, the values of y go three, one, negative one, negative three, negative five. In the next part, you will describe patterns like this one. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
