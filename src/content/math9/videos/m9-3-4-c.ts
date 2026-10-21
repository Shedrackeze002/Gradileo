import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-3-4-c',
  lessonId: 'm9-3-4',
  title: 'Order of Operations with Rational Numbers, Part 3: Writing One Expression',
  thumbnailTitle: 'Writing One Expression',
  thumbnail: false,
  summary:
    'Many problems become one expression. Write the expression first, then evaluate it with the order of operations. Talia has $45.20, buys 3 T-shirts at $12.75 each, then gets a $15.00 refund: 45.20 − 3 × 12.75 + 15.00 = 45.20 − 38.25 + 15.00 = 6.95 + 15.00 = 21.95, so her new balance is $21.95. Working strictly left to right, or adding before subtracting, gives answers that make no sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 3', title: 'Writing One Expression', subtitle: 'From a story to an answer' }],
      lines: [
        { say: 'Real problems often have several steps. You can turn the whole story into one expression, then let the order of operations do the work.', show: 'title' },
        { say: 'In this part, you will write one expression for a shopping problem, and evaluate it step by step.' },
      ],
    },
    {
      chapter: 'The story',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Talia’s account balance is \\$45.20. She buys $3$ T-shirts at \\$12.75 each, then gets a refund of \\$15.00. What is her new balance?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Start: the balance, \\$45.20', 'Buying the T-shirts takes money **out**: subtract', 'A refund puts money back **in**: add'],
        },
      ],
      lines: [
        { say: 'Talia’s account balance is forty-five dollars and twenty cents. She buys three T-shirts at twelve dollars and seventy-five cents each. Then she gets a refund of fifteen dollars. What is her new balance?', show: 'q' },
        { say: 'Start with the balance: forty-five dollars and twenty cents.', show: 'b.0', focus: 'b.0' },
        { say: 'Buying the T-shirts takes money out of the account, so subtract their cost.', show: 'b.1', focus: 'b.1' },
        { say: 'A refund is money given back for something returned, so it puts money in. Add it.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Write the expression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['45.20 - 3 \\times 12.75 + 15.00'] },
        { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'balance $\\;-\\;$ cost of the T-shirts $\\;+\\;$ refund' },
      ],
      lines: [
        { say: 'The three T-shirts cost three times twelve dollars and seventy-five cents. So the expression is the balance, forty-five dollars and twenty cents, minus three times twelve dollars and seventy-five cents, plus the fifteen dollar refund.', show: ['m.0', 'note'], focus: 'm.0' },
        { say: 'Notice that you do not need brackets around the three times twelve dollars and seventy-five cents. The order of operations already multiplies first.' },
      ],
    },
    {
      chapter: 'Evaluate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['45.20 - \\underline{3 \\times 12.75} + 15.00', '= \\underline{45.20 - 38.25} + 15.00', '= 6.95 + 15.00', '= 21.95'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Talia’s new balance is **\\$21.95**.' },
      ],
      lines: [
        { say: 'Multiply first. Three times twelve dollars and seventy-five cents is thirty-eight dollars and twenty-five cents.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add and subtract from left to right. The subtraction comes first: forty-five dollars and twenty cents minus thirty-eight dollars and twenty-five cents is six dollars and ninety-five cents.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Then add the refund: six dollars and ninety-five cents plus fifteen dollars is twenty-one dollars and ninety-five cents.', show: 'm.3', focus: 'm.3' },
        { say: 'Talia’s new balance is twenty-one dollars and ninety-five cents.', show: 'a' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Answers that make no sense', md: 'Multiply before you add or subtract, and then add and subtract **from left to right**. Then ask whether the answer makes sense.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{(45.20 - 3) \\times 12.75 + 15.00 = 553.05}', '\\bad{45.20 - (38.25 + 15.00) = -8.05}'] },
      ],
      lines: [
        { say: 'Here are two ways to go wrong. If you work strictly from left to right, you subtract three from forty-five dollars and twenty cents before multiplying. That gives over five hundred dollars! Talia spent money, so that makes no sense.', show: 'm.0', focus: 'm.0' },
        { say: 'If you add the refund to the cost before subtracting, you get negative eight dollars and five cents. But addition and subtraction go from left to right, so the subtraction comes first here.', show: 'm.1', focus: 'm.1' },
        { say: 'Follow the order of operations, and check that the answer makes sense. A balance of about twenty-two dollars fits the story: Talia spent about thirty-eight dollars and got fifteen back.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A game card has a balance of \\$30.00. You buy $4$ snacks at \\$3.25 each with the card, then add \\$10.00 to it. What is the new balance?',
          choices: ['\\$7.00', '\\$94.50', '\\$53.00', '\\$27.00'],
          answer: 3,
          working: '$30.00 - 4 \\times 3.25 + 10.00 = 30.00 - 13.00 + 10.00 = 17.00 + 10.00 = 27.00$. The new balance is \\$27.00.',
        },
      ],
      lines: [
        { say: 'Your turn. A game card has a balance of thirty dollars. You buy four snacks at three dollars and twenty-five cents each with the card, then add ten dollars to it. What is the new balance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twenty-seven dollars. Multiply first: four snacks at three dollars and twenty-five cents cost thirteen dollars. Thirty minus thirteen is seventeen, and seventeen plus ten is twenty-seven. Choice A adds the thirteen and the ten before subtracting.', show: 'q.answer' },
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
            'Decide which amounts are added and which are subtracted.',
            'Write one expression for the whole problem.',
            'Evaluate it with the order of operations.',
            'Check that the answer makes sense in the story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, decide which amounts are added and which are subtracted.', show: 'sum.0' },
        { say: 'Write one expression for the whole problem.', show: 'sum.1' },
        { say: 'Evaluate it with the order of operations.', show: 'sum.2' },
        { say: 'And check that the answer makes sense in the story. In the next part, you will find the mean of a set of temperatures. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
