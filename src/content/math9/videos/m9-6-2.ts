import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

// 3(x − 4) as an area model: 3 times x is 3x, and 3 times −4 is −12.
const model = (id: string) => figure(id, [areaModel({ top: ['x', '-4'], side: ['3'], cells: [['3x', '-12']] })], 240);

const video: Explainer = {
  id: 'm9-6-2',
  lessonId: 'm9-6-2',
  title: 'Equations with Brackets and Fractions, Part 1: Expanding First',
  thumbnailTitle: 'Equations with Brackets',
  thumbnail: 'am',
  summary:
    'With brackets, use the distributive property to expand first, then solve as before. For 3(x − 4) = 18, the 3 multiplies both terms: 3x − 12 = 18, so 3x = 30 and x = 10, and 3(10 − 4) = 18 checks it. The number outside a bracket multiplies every term inside: 2(x + 5) is 2x + 10, not 2x + 5, and −4(x − 3) = −4x + 12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 1', title: 'Expanding First', subtitle: 'Equations with brackets' }],
      lines: [
        { say: 'Some equations come with brackets, like three times x minus four equals eighteen. Others have the variable inside a fraction. Each kind needs one extra step before the usual balancing.', show: 'title' },
        { say: 'In this lesson, you will learn that step for each kind. In this part, you will solve equations with brackets by expanding first.' },
      ],
    },
    {
      chapter: 'Expand the brackets',
      layout: 'split',
      leftWidth: 500,
      left: [model('am')],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3(x - 4)', '= 3x - 12'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Expand', md: 'To **expand** is to multiply out the brackets, using the distributive property.' },
      ],
      lines: [
        { say: 'Start with the left side, three times x minus four. To expand it means to multiply out the brackets, using the distributive property.', show: ['m.0', 'def'] },
        { say: 'An area model shows the products. Put x and negative four along the top, and three down the side.', show: ['am.top', 'am.side', 'am.outline', 'am.grid'] },
        { say: 'Three times x is three x.', show: 'am.c0-0', focus: 'am.c0-0' },
        { say: 'Three times negative four is negative twelve. So three times x minus four is three x minus twelve.', show: ['am.c0-1', 'm.1'], focus: ['am.c0-1', 'm.1'] },
      ],
    },
    {
      chapter: 'Solving 3(x − 4) = 18',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(x - 4) = 18', '3x - 12 = 18 \\qquad \\text{expand}', '3x = 30 \\qquad \\text{add } 12', 'x = 10 \\qquad \\text{divide by } 3', '\\text{Check: } 3(10 - 4) = 3(6) = 18 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now solve three times x minus four equals eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'First, expand: three x minus twelve equals eighteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Add twelve to both sides: three x equals thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide both sides by three: x equals ten.', show: 'm.3', focus: 'm.3' },
        { say: 'Check in the original equation: ten minus four is six, and three times six is eighteen. It works.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Another way',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(x - 4) = 18', 'x - 4 = 6 \\qquad \\text{divide by } 3', 'x = 10 \\qquad \\text{add } 4'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two ways, one answer', md: 'Expanding first always works. Dividing first is quicker when the number on the other side divides evenly.' },
      ],
      lines: [
        { say: 'There is another way for this one. The whole bracket is multiplied by three, so divide both sides by three first: x minus four equals six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then add four: x equals ten. The same answer.', show: 'm.2', focus: 'm.2' },
        { say: 'Expanding first always works. Dividing first is quicker when the number on the other side divides evenly, like eighteen divided by three.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying only the first term', md: 'The number outside the bracket multiplies **every** term inside.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2(x + 5) = 2x + 5 \\;\\bad{\\times}', '2(x + 5) = 2x + 10 \\;\\good{\\checkmark}', '-4(x - 3) = -4x + 12'] },
      ],
      lines: [
        { say: 'Watch out for multiplying only the first term. Two times x plus five is not two x plus five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The two multiplies every term inside, so two times x plus five is two x plus ten.', show: 'm.1', focus: 'm.1' },
        { say: 'With a negative number outside, watch the signs. Negative four times x is negative four x, and negative four times negative three is positive twelve.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4(x + 2) = 28$.',
          choices: ['$x = 6.5$', '$x = 9$', '$x = 7.5$', '$x = 5$'],
          answer: 3,
          working: 'Expand: $4x + 8 = 28$. Subtract $8$: $4x = 20$. Divide by $4$: $x = 5$. Check: $4(5 + 2) = 4(7) = 28$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four times x plus two equals twenty-eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Expand: four x plus eight equals twenty-eight. Subtract eight: four x equals twenty. Divide by four: x equals five. Choice A multiplies only the first term, and writes four x plus two.', show: 'q.answer' },
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
            'With brackets, expand first using the distributive property.',
            'The number outside multiplies **every** term inside: $2(x + 5) = 2x + 10$.',
            'Then solve as before: $3(x - 4) = 18$ gives $x = 10$.',
            'Check in the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With brackets, expand first, using the distributive property.', show: 'sum.0' },
        { say: 'The number outside the bracket multiplies every term inside.', show: 'sum.1' },
        { say: 'Then solve as before.', show: 'sum.2' },
        { say: 'And check in the original equation. In the next part, you will solve equations with brackets on both sides. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
