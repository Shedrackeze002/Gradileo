import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm5-7-1-b',
  lessonId: 'm5-7-1',
  title: 'Order of Operations with Parentheses, Part 2: More Steps After the Parentheses',
  thumbnailTitle: 'One Step at a Time',
  summary: 'Evaluating expressions with more to do after the parentheses, one operation at a time, writing what is left after each step: 5 × (13 − 7) + 4 = 34, 20 − (6 + 9) ÷ 3 = 15 and (18 − 10) × 2 − 6 = 10, and why subtracting before dividing goes wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'More Steps After the Parentheses', subtitle: 'One step at a time' }],
      lines: [
        { say: 'Some expressions have more to do after the parentheses. You just keep following the order of operations, one step at a time.', show: 'title' },
        { say: 'In this video, you will evaluate expressions with parentheses and two more operations.' },
      ],
    },
    {
      chapter: 'The order',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**1.** Work inside the **parentheses**.', '**2.** **Multiply and divide**, from left to right.', '**3.** **Add and subtract**, from left to right.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One step at a time', md: 'Do one operation, then write what is left. Short steps help you keep the order right.' },
      ],
      lines: [
        { say: 'Here is the order of operations again. Parentheses first. Then multiply and divide. Then add and subtract.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Here is a tip for longer expressions. Do one operation, then write the expression again with what is left. Short steps help you keep the order right.', show: 'tip' },
      ],
    },
    {
      chapter: 'Multiply, then add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times (13 - 7) + 4', '= 5 \\times 6 + 4', '= 30 + 4', '= 34'] }],
      lines: [
        { say: 'Evaluate five times, thirteen minus seven in parentheses, plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Parentheses first. Thirteen minus seven is six. Write the expression again: five times six, plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'There are two operations left: times and plus. Multiply before adding. Five times six is thirty. Now it is thirty plus four.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, add. Thirty plus four is thirty-four. So the value is thirty-four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Divide, then subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20 - (6 + 9) \\div 3', '= 20 - 15 \\div 3', '= 20 - 5', '= 15'] }],
      lines: [
        { say: 'Evaluate twenty minus, six plus nine in parentheses, divided by three.', show: 'm.0', focus: 'm.0' },
        { say: 'Parentheses first. Six plus nine is fifteen. Now it is twenty minus fifteen divided by three.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide before subtracting. Fifteen divided by three is five. Now it is twenty minus five.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract: twenty minus five is fifteen. So the value is fifteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting too early', md: 'In $20 - 15 \\div 3$, the division comes first, even though the $-$ comes first. Doing $20 - 15$ first gives $5 \\div 3$, which does not even come out evenly.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 - 15 \\div 3 = 5 \\div 3 \\quad \\text{\\bad{wrong}}', '20 - 15 \\div 3 = 20 - 5 = \\good{15} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. After the parentheses, it is tempting to work from left to right, and do twenty minus fifteen first.', show: 'oops' },
        { say: 'That gives five divided by three, which does not even come out evenly. Something has gone wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing comes before subtracting. Fifteen divided by three is five, and twenty minus five is fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One more together',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(18 - 10) \\times 2 - 6', '= 8 \\times 2 - 6', '= 16 - 6', '= 10'] }],
      lines: [
        { say: 'Let’s do one more together. Evaluate eighteen minus ten in parentheses, times two, minus six.', show: 'm.0', focus: 'm.0' },
        { say: 'Parentheses first. Eighteen minus ten is eight. Now it is eight times two, minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply before subtracting. Eight times two is sixteen. Now it is sixteen minus six.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract. Sixteen minus six is ten. One step at a time, and the value is ten.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $3 \\times (10 - 4) + 2$.',
          choices: ['$24$', '$28$', '$20$', '$14$'],
          answer: 2,
          working: 'Parentheses first: $10 - 4 = 6$. Then multiply: $3 \\times 6 = 18$. Then add: $18 + 2 = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three times, ten minus four in parentheses, plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty. Parentheses first: ten minus four is six. Then multiply: three times six is eighteen. Then add: eighteen plus two is twenty. Choice A adds before multiplying: six plus two is eight, and three times eight is twenty-four.', show: 'q.answer' },
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
          items: ['Parentheses first, then multiply and divide, then add and subtract.', 'Do one operation at a time, and write what is left.', 'After the parentheses, still multiply or divide before you add or subtract.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Parentheses first, then multiply and divide, then add and subtract.', show: 'sum.0' },
        { say: 'Do one operation at a time, and write what is left after each step.', show: 'sum.1' },
        { say: 'And after the parentheses, still multiply or divide before you add or subtract. In the next part, you will write expressions for problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
