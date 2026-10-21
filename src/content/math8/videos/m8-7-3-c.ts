import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sides } from '@/content/math6/videos/lib/m6-6-figures.ts';

// A square garden with every side s + 3 metres long.
const garden = (id: string) =>
  figure(id, [sides({ corners: [[0, 0], [4, 0], [4, 4], [0, 4]], labels: Array(4).fill('(s + 3)\\text{ m}') })], 360);

const video: Explainer = {
  id: 'm8-7-3-c',
  lessonId: 'm8-7-3',
  title: 'Equations with Brackets, Part 3: Finding Mistakes and Solving Problems',
  thumbnailTitle: 'Mistakes and Problems with Brackets',
  thumbnail: 'gd',
  summary:
    'Both methods give the same solution; dividing first is often quicker when the number on the right divides evenly. Mira solved 2(x − 6) = 10 as 2x − 6 = 10, 2x = 16, x = 8, but 2(8 − 6) = 4, not 10: in Step 1 only x was multiplied by 2. Correctly, 2x − 12 = 10, so 2x = 22 and x = 11. A square garden with sides (s + 3) m and a perimeter of 36 m gives 4(s + 3) = 36, so s + 3 = 9 and s = 6: each side is 9 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 3', title: 'Finding Mistakes and Solving Problems', subtitle: 'Equations with brackets at work' }],
      lines: [
        { say: 'You can now solve equations with brackets in two ways. Which way should you choose? And how can you spot a mistake?', show: 'title' },
        { say: 'In this part, you will choose a method, find a mistake in someone’s work, and solve a problem about a garden.' },
      ],
    },
    {
      chapter: 'Choosing a method',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choosing a method', md: 'Both methods always give the same solution. **Dividing first** is often quicker when the number on the right divides evenly. **Distributing first** is useful when it does not.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(x + 2) = 21 \\qquad 21 \\div 3 = 7 \\;\\text{ divides evenly}', '2(x + 3) = 7 \\qquad 2x + 6 = 7 \\;\\text{ distribute}'] },
      ],
      lines: [
        { say: 'Both methods always give the same solution, so choose the one that is easier.', show: 'tip' },
        { say: 'In three times the bracket x plus two equals twenty-one, twenty-one divides evenly by three. So dividing first is quick: x plus two equals seven.', show: 'm.0', focus: 'm.0' },
        { say: 'In two times the bracket x plus three equals seven, seven does not divide evenly by two. Distributing first keeps whole numbers for longer: two x plus six equals seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Find the mistake',
      layout: 'split',
      leftWidth: 460,
      left: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mira solved $2(x - 6) = 10$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'Mira’s work'],
          rows: [
            ['1', '$2x - 6 = 10$'],
            ['2', '$2x = 16$'],
            ['3', '$x = 8$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Check: } 2(8 - 6) = 2(2) = 4 \\;\\bad{\\times}', '2x - 12 = 10', '2x = 22, \\quad x = 11', '\\text{Check: } 2(11 - 6) = 2(5) = 10 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Mira solved two times the bracket x minus six equals ten. Here is the work, in three steps. Can you find the mistake?', show: ['q', 't'] },
        { say: 'First, check the answer. Put eight back in: eight minus six is two, and two times two is four, not ten. So something is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Look at Step 1. The two multiplied only the x. It must multiply the six as well: two times six is twelve. Step 1 should be two x minus twelve equals ten.', show: 'm.1', focus: ['t.0', 'm.1'] },
        { say: 'Then add twelve to both sides: two x equals twenty-two. Divide by two: x equals eleven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: eleven minus six is five, and two times five is ten. It works. The mistake was in Step 1, and the solution is eleven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A square garden',
      layout: 'split',
      leftWidth: 480,
      left: [garden('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each side of a square garden is $(s + 3)$ m long, and its perimeter is $36$ m. Find $s$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4(s + 3) = 36', 's + 3 = 36 \\div 4 = 9', 's = 9 - 3 = 6', '\\text{Check: } 4(6 + 3) = 4(9) = 36 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Each side of a square garden is s plus three metres long, and its perimeter is thirty-six metres. The perimeter is the distance all the way around.', show: ['q', 'gd.shape', 'gd.l0', 'gd.l1', 'gd.l2', 'gd.l3'] },
        { say: 'A square has four equal sides, so the perimeter is four times the bracket s plus three. That gives four times the bracket s plus three equals thirty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-six divides evenly by four, so divide first. s plus three equals nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract three from both sides: s equals six.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: six plus three is nine, and four times nine is thirty-six. So s is six, and each side of the garden is nine metres long.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each side of a triangle with three equal sides is $(n + 5)$ cm long, and its perimeter is $36$ cm. Solve $3(n + 5) = 36$.',
          choices: ['$n = 12$', '$n = 7$', '$n = 17$', '$n = \\dfrac{31}{3}$'],
          answer: 1,
          working: 'Divide both sides by $3$: $n + 5 = 12$. Subtract $5$: $n = 7$. Check: $3(7 + 5) = 3(12) = 36$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each side of a triangle with three equal sides is n plus five centimetres long, and its perimeter is thirty-six centimetres. Solve three times the bracket n plus five equals thirty-six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, n equals seven. Divide both sides by three to get n plus five equals twelve, then subtract five. Choice A is the length of a whole side, n plus five, not n itself.', show: 'q.answer' },
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
            'Divide first when the number on the right divides evenly; otherwise, distribute first.',
            'To find a mistake, check the answer, then look for the step that went wrong.',
            'Multiply every term in the brackets: $2(x - 6) = 2x - 12$.',
            'Garden: $4(s + 3) = 36$, so $s = 6$ and each side is $9$ m.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide first when the number on the right divides evenly. Otherwise, distribute first.', show: 'sum.0' },
        { say: 'To find a mistake, check the answer first, then look for the step that went wrong.', show: 'sum.1' },
        { say: 'Remember to multiply every term in the brackets.', show: 'sum.2' },
        { say: 'And answer the question that was asked, with units. In the next part, you will write equations for problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
