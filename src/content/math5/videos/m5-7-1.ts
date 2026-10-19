import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-6-figures.ts';

// 2 + 3 × 4: two counters, and three rows of four.
const noBrackets = (id: string) =>
  figure(id, [
    counters({
      gap: 1.4,
      groups: [
        { id: 'two', count: 2, tone: 'theta', label: '2' },
        { id: 'rows', count: 12, tone: 'adj', label: '3 \\times 4 = 12', perRow: 4 },
      ],
      whole: '2 + 12 = 14',
    }),
  ]);

// (2 + 3) × 4: four rows, each of two yellow and three blue counters.
const brackets = (id: string) =>
  figure(id, [
    counters({
      gap: 0.25,
      groups: [
        { id: 'two', count: 8, tone: 'theta', perRow: 2 },
        { id: 'three', count: 12, tone: 'adj', perRow: 3 },
      ],
      whole: '4 \\text{ rows of } 5 = 20',
    }),
  ]);

const video: Explainer = {
  id: 'm5-7-1',
  lessonId: 'm5-7-1',
  title: 'Order of Operations with Parentheses, Part 1: Which Operation Comes First?',
  thumbnailTitle: 'Which Operation Comes First?',
  thumbnail: 'nb',
  summary: 'Numerical expressions and their values, parentheses, and the order of operations (parentheses, then multiply and divide from left to right, then add and subtract from left to right): 2 + 3 × 4 = 14, but (2 + 3) × 4 = 20, and why working only from left to right gives the wrong value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Which Operation Comes First?', subtitle: 'The order of operations, and parentheses' }],
      lines: [
        { say: 'Ella says two plus three times four is twenty. Sam says it is fourteen. They used the same numbers. So why are their answers different?', show: 'title' },
        { say: 'Everyone needs to follow the same order. In this video, you will learn that order, and how parentheses can change it.' },
      ],
    },
    {
      chapter: 'Expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Numerical expression', md: 'A **numerical expression** is a group of numbers and operations, such as $2 + 3 \\times 4$. It has no equals sign. It stands for one number, called its **value**.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['2 + 3 \\times 4'] },
      ],
      lines: [
        { say: 'Two plus three times four is a numerical expression. A numerical expression is a group of numbers and operations. It has no equals sign.', show: ['def', 'm.0'] },
        { say: 'An expression stands for one number, called its value. When you evaluate an expression, you find its value.' },
        { say: 'But an expression should have only one value. So everyone must do the operations in the same order.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Parentheses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parentheses', md: '**Parentheses** $(\\ )$ group numbers and operations together. The work inside the parentheses is done first.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['(2 + 3) \\times 4'] },
      ],
      lines: [
        { say: 'Parentheses are a pair of curved brackets, like these. They group numbers and operations together.', show: 'def' },
        { say: 'The work inside the parentheses is done first. Here, two plus three is inside the parentheses, and then the answer is multiplied by four.', show: 'm.0', focus: 'm.0' },
        { say: 'So you add two plus three before you multiply.' },
      ],
    },
    {
      chapter: 'The order of operations',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'The **order of operations** tells you which operation to do first:' },
        { kind: 'bullets', id: 'b', items: ['**1.** Work inside the **parentheses**.', '**2.** **Multiply and divide**, from left to right.', '**3.** **Add and subtract**, from left to right.'] },
      ],
      lines: [
        { say: 'The order of operations is a set of rules. It tells you which operation to do first.', show: 't' },
        { say: 'First, work inside the parentheses.', show: 'b.0' },
        { say: 'Second, multiply and divide, from left to right.', show: 'b.1' },
        { say: 'Third, add and subtract, from left to right.', show: 'b.2' },
        { say: 'Multiplying and dividing come before adding and subtracting, unless parentheses say otherwise.' },
      ],
    },
    {
      chapter: 'Without parentheses',
      layout: 'split',
      leftWidth: 560,
      left: [noBrackets('nb')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2 + 3 \\times 4', '= 2 + 12', '= 14'] }],
      lines: [
        { say: 'Let’s evaluate two plus three times four.', show: 'm.0' },
        { say: 'There are no parentheses, so we multiply first. Three times four is twelve. In the picture, that is three rows of four.', show: ['m.1', 'nb.rows', 'nb.rows-tag'], focus: 'm.1' },
        { say: 'Now it is two plus twelve. Add: two plus twelve is fourteen.', show: ['m.2', 'nb.two', 'nb.two-tag', 'nb.whole'], focus: 'm.2' },
        { say: 'So two plus three times four is fourteen. Sam is right.' },
      ],
    },
    {
      chapter: 'With parentheses',
      layout: 'split',
      leftWidth: 560,
      left: [brackets('wb')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['(2 + 3) \\times 4', '= 5 \\times 4', '= 20'] }],
      lines: [
        { say: 'Now evaluate two plus three, in parentheses, times four.', show: 'm.0' },
        { say: 'Parentheses first. Two plus three is five. In the picture, each row has two yellow counters and three blue counters: five in a row.', show: ['m.1', 'wb.two', 'wb.three'], focus: 'm.1' },
        { say: 'Then multiply. There are four rows of five, and five times four is twenty.', show: ['m.2', 'wb.whole'], focus: 'm.2' },
        { say: 'Twenty is the value Ella found. But Ella’s expression had no parentheses, so Ella did the steps in the wrong order.' },
        { say: 'The numbers are the same, but the parentheses change the order, and that changes the value.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not always left to right', md: 'Do not just work from left to right. In $2 + 3 \\times 4$, the multiplying comes before the adding, even though the $+$ comes first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 + 3 \\times 4 = 5 \\times 4 = \\bad{20} \\quad \\text{\\bad{wrong}}', '2 + 3 \\times 4 = 2 + 12 = \\good{14} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. Do not just work from left to right, the way you read.', show: 'oops' },
        { say: 'In two plus three times four, the plus sign comes first. But adding first gives twenty, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'The multiplying comes before the adding. Three times four is twelve, and two plus twelve is fourteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $10 - 2 \\times 3$.',
          choices: ['$4$', '$24$', '$14$', '$2$'],
          answer: 0,
          working: 'There are no parentheses, so multiply first: $2 \\times 3 = 6$. Then subtract: $10 - 6 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate ten minus two times three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four. There are no parentheses, so multiply first: two times three is six. Then subtract: ten minus six is four. Choice B works from left to right: ten minus two is eight, and eight times three is twenty-four.', show: 'q.answer' },
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
          items: ['A numerical expression stands for one number, its value.', 'Order of operations: parentheses first, then multiply and divide, then add and subtract, each from left to right.', 'Parentheses change the order, so they can change the value: $2 + 3 \\times 4 = 14$, but $(2 + 3) \\times 4 = 20$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A numerical expression stands for one number, its value.', show: 'sum.0' },
        { say: 'Follow the order of operations: parentheses first, then multiply and divide, then add and subtract, each from left to right.', show: 'sum.1' },
        { say: 'And parentheses change the order, so they can change the value. In the next part, you will evaluate longer expressions, step by step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
