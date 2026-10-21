import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm7-2-3-b',
  lessonId: 'm7-2-3',
  title: 'Order of Operations with Decimals, Part 2: Brackets First',
  thumbnailTitle: 'Brackets First',
  thumbnail: false,
  summary:
    'Brackets change the order: whatever is inside them is done first. (6.2 − 1.7) × 4 = 4.5 × 4 = 18. With no brackets, divide before adding and subtracting, then add and subtract from left to right: 12.6 − 2.4 ÷ 0.8 + 1.5 = 12.6 − 3 + 1.5 = 9.6 + 1.5 = 11.1. Copy the expression again after each step, with the part you just did replaced by its value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 2', title: 'Brackets First', subtitle: 'Brackets change the order' }],
      lines: [
        { say: 'Multiply before you add. But what if you really do want to add or subtract first? That is what brackets are for.', show: 'title' },
        { say: 'In this part, you will use brackets, and work through an expression with three operations, one step at a time.' },
      ],
    },
    {
      chapter: 'Brackets change the order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Brackets first', md: 'Whatever is inside **brackets** is done first, before any other operation.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(6.2 - 1.7) \\times 4', '\\text{Estimate: } (6 - 2) \\times 4 = 16'] },
      ],
      lines: [
        { say: 'Brackets change the order. Whatever is inside them is done first, before anything else.', show: 'key' },
        { say: 'Look at this expression: six point two minus one point seven, in brackets, times four.', show: 'm.0', focus: 'm.0' },
        { say: 'The brackets say: find the difference first, then multiply it by four. Estimate with the same order. Six minus two is four, and four times four is sixteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Evaluating with brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{(6.2 - 1.7)} \\times 4', '= \\adj{4.5} \\times 4', '= 18'] },
      ],
      lines: [
        { say: 'Now evaluate. Brackets first: six point two minus one point seven is four point five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Notice that we copied the expression again, with the brackets replaced by their value, four point five. Now only one operation is left.' },
        { say: 'Four point five times four is eighteen. That is close to the estimate of sixteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Three operations',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $12.6 - 2.4 \\div 0.8 + 1.5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12.6 - \\adj{2.4 \\div 0.8} + 1.5', '= \\opp{12.6 - 3} + 1.5', '= \\good{9.6 + 1.5}', '= 11.1'] },
      ],
      lines: [
        { say: 'Now a longer one: twelve point six, minus two point four divided by zero point eight, plus one point five.', show: 'q' },
        { say: 'There are no brackets, so divide first. Two point four divided by zero point eight is three, because zero point eight times three is two point four.', show: 'm.0', focus: 'm.0' },
        { say: 'Copy the expression again, with three in place of the division. Now there is a subtraction and an addition. Do them from left to right.', show: 'm.1', focus: 'm.1' },
        { say: 'First, twelve point six minus three is nine point six.', show: 'm.2', focus: 'm.2' },
        { say: 'Then nine point six plus one point five is eleven point one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Left to right matters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12.6 - 3 + 1.5 = 9.6 + 1.5 = 11.1 \\ \\good{\\checkmark}', '12.6 - (3 + 1.5) = 12.6 - 4.5 = 8.1 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Why left to right? Suppose you added the three and the one point five first. You would get four point five, and twelve point six minus four point five is eight point one.', show: 'm.1', focus: 'm.1' },
        { say: 'That is a different answer. Adding first is like putting brackets that are not really there. Working from left to right gives eleven point one, the right answer.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'One step at a time',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Copy the expression after each step', md: 'Copy the expression again after each step, with the part you just did replaced by its value. It is easier to see what comes next, and easier to find a mistake.' },
      ],
      lines: [
        { say: 'Here is a tip that makes long expressions easier. After each step, copy the expression again, with the part you just did replaced by its value.', show: 'tip' },
        { say: 'Each new line is shorter than the one before. You can always see what is left to do, and if you make a mistake, it is easy to find the line where it happened.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $(3.5 + 1.5) \\times 0.4$.',
          choices: ['$4.1$', '$20$', '$0.2$', '$2$'],
          answer: 3,
          working: 'Brackets first: $3.5 + 1.5 = 5$. Then multiply: $5 \\times 0.4 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three point five plus one point five, in brackets, times zero point four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, which is two. Brackets first: three point five plus one point five is five. Then five times zero point four is two. Choice A ignores the brackets and multiplies first.', show: 'q.answer' },
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
            'Brackets first: $(6.2 - 1.7) \\times 4 = 4.5 \\times 4 = 18$.',
            'Then multiply and divide, then add and subtract, each from left to right.',
            'Copy the expression again after each step.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Whatever is inside brackets is done first.', show: 'sum.0' },
        { say: 'Then multiply and divide, then add and subtract, each from left to right.', show: 'sum.1' },
        { say: 'And copy the expression again after each step. In the next part, you will write your own expressions to solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
