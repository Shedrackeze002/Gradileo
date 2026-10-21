import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-2-3-c',
  lessonId: 'm9-2-3',
  title: 'Order of Operations with Powers, Part 3: Finding Errors',
  thumbnailTitle: 'Finding Errors',
  thumbnail: false,
  summary:
    'Checking a solution one step at a time is a good way to find mistakes. Owen evaluated 20 − 2 × (1 − 4)²: step 1, 20 − 2 × (−3)², is right, but step 2 wrote (−3)² = −9 instead of 9; the correct value is 20 − 2 × 9 = 2. Divide and multiply from left to right: 24 ÷ 2 × 3 = 36, not 4; and add and subtract from left to right: 10 − 3 + 2 = 9, not 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 3', title: 'Finding Errors', subtitle: 'Check one step at a time' }],
      lines: [
        { say: 'Everyone makes mistakes. The trick is to catch them. Checking a solution one step at a time is a good way to find them, including your own.', show: 'title' },
        { say: 'In this part, you will check worked solutions, find the first error, and fix it.' },
      ],
    },
    {
      chapter: 'Owen’s solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Owen evaluated $20 - 2 \\times (1 - 4)^2$ like this. Find the first error.' },
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'Owen wrote', 'Check'],
          rows: [
            ['Step 1', '$= 20 - 2 \\times (-3)^2$', '$\\good{1 - 4 = -3 \\ \\checkmark}$'],
            ['Step 2', '$= 20 - 2 \\times (-9)$', '$\\bad{(-3)^2 = 9, \\text{ not } {-9}}$'],
            ['Step 3', '$= 20 + 18 = 38$', ''],
          ],
        },
      ],
      lines: [
        { say: 'Owen evaluated twenty minus two times one minus four, all squared. Here are the steps. Let’s check them one at a time.', show: 'q' },
        { say: 'Step one works out the brackets. One minus four is negative three. That is correct.', show: 't.0', focus: 't.0' },
        { say: 'Step two works out the power. But negative three, all squared, is negative three times negative three, which is positive nine, not negative nine. This is the first error.', show: 't.1', focus: 't.1' },
        { say: 'Step three follows from the wrong number, so the answer of thirty-eight is wrong as well.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Fix it',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 - 2 \\times (1 - 4)^2', '= 20 - 2 \\times (-3)^2', '= 20 - 2 \\times 9', '= 20 - 18 = 2'] },
      ],
      lines: [
        { say: 'Now fix it. Start again from the first error. Brackets first: one minus four is negative three.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Exponent next: negative three, all squared, is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply: two times nine is eighteen. Then subtract: twenty minus eighteen is two. The correct value is two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Left to right',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Left to right', md: 'Multiply and divide in order from **left to right**. The same is true for adding and subtracting.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['24 \\div 2 \\times 3 = 12 \\times 3 = 36 \\qquad \\bad{\\text{not } 24 \\div 6 = 4}', '10 - 3 + 2 = 7 + 2 = 9 \\qquad \\bad{\\text{not } 10 - 5 = 5}'] },
      ],
      lines: [
        { say: 'Here is another error that is easy to make. In twenty-four divided by two times three, some people multiply first, as if multiplying always came before dividing.', show: 'oops' },
        { say: 'But dividing and multiplying are done in order from left to right. Twenty-four divided by two is twelve, and twelve times three is thirty-six, not four.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding and subtracting work the same way. Ten minus three plus two: ten minus three is seven, and seven plus two is nine, not five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A checklist',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'list',
          items: [
            'Is each bracket worked out correctly?',
            'Does each power use the right **base**, with the right sign?',
            'Are divide and multiply, then add and subtract, done **left to right**?',
            'Does each step follow from the one before it?',
          ],
        },
      ],
      lines: [
        { say: 'When you check a solution, ask these questions at each step. Is each bracket worked out correctly?', show: 'list.0' },
        { say: 'Does each power use the right base, with the right sign? This is where Owen went wrong.', show: 'list.1' },
        { say: 'Are dividing and multiplying, and then adding and subtracting, done from left to right?', show: 'list.2' },
        { say: 'And does each step follow from the one before? The first step that fails is the first error.', show: 'list.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student evaluated $2 \\times 3^2 - 4 \\div 2$ like this. Step 1: $= 6^2 - 4 \\div 2$. Step 2: $= 36 - 2$. Step 3: $= 34$. In which step is the first error?',
          choices: ['There is no error', 'Step 1', 'Step 2', 'Step 3'],
          answer: 1,
          working: 'Step 1 multiplies $2 \\times 3$ before working out the power. Exponents come first: $2 \\times 9 - 4 \\div 2 = 18 - 2 = 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. A student evaluated two times three squared, minus four divided by two, in three steps. In which step is the first error? Pause the video and try it.', show: 'q', wait: 10 },
        { say: 'The answer is B, step one. It multiplies two times three before working out the power, but exponents come before multiplying. Three squared is nine, two times nine is eighteen, and eighteen minus two is sixteen. Choice A is wrong, because the correct value is sixteen, not thirty-four.', show: 'q.answer' },
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
            'Check a solution one step at a time to find the **first** error.',
            '$(-3)^2 = 9$, not $-9$: Owen’s value should be $2$, not $38$.',
            'Divide and multiply from left to right: $24 \\div 2 \\times 3 = 36$.',
            'Add and subtract from left to right: $10 - 3 + 2 = 9$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Check a solution one step at a time to find the first error.', show: 'sum.0' },
        { say: 'In Owen’s solution, negative three, all squared, should have been positive nine, and the value is two.', show: 'sum.1' },
        { say: 'Divide and multiply from left to right.', show: 'sum.2' },
        { say: 'And add and subtract from left to right. In the next lesson, you will use powers to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
