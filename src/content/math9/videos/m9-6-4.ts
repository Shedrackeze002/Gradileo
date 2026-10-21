import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-4',
  lessonId: 'm9-6-4',
  title: 'Representing Inequalities, Part 1: What Is an Inequality?',
  thumbnailTitle: 'What Is an Inequality?',
  thumbnail: false,
  summary:
    'An inequality says that two expressions are not equal, using <, >, ≤ or ≥: x > 3 says “x is greater than 3”. Key words help: “at most” and “no more than” mean ≤, and “at least” means ≥. The solution set is every value that makes an inequality true, so x > 3 has infinitely many solutions (4, 3.5, 100…). 5 is a solution of x > 3 and of x ≤ 5 (because 5 = 5), but not of x < 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 1', title: 'What Is an Inequality?', subtitle: 'A whole range of values' }],
      lines: [
        { say: 'You must be at least one hundred twenty centimetres tall to ride. The elevator can carry at most nine hundred kilograms. Rules like these do not give one exact value. They allow a whole range of values.', show: 'title' },
        { say: 'To describe a range, you use an inequality. In this lesson, you will learn to write and draw inequalities. In this part, you will learn the symbols, and what a solution set is.' },
      ],
    },
    {
      chapter: 'Inequality symbols',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inequality', md: 'An **inequality** says that two expressions are not equal, using $<$, $>$, $\\le$ or $\\ge$. For example, $x > 3$ says “$x$ is greater than $3$”.' },
        {
          kind: 'table',
          id: 't',
          head: ['Symbol', 'Meaning', 'Key words'],
          rows: [
            ['$<$', 'less than', 'less than, fewer than, below, under'],
            ['$>$', 'greater than', 'more than, greater than, above, over'],
            ['$\\le$', 'less than or equal to', 'at most, no more than, cannot exceed'],
            ['$\\ge$', 'greater than or equal to', 'at least, no less than, a minimum of'],
          ],
        },
      ],
      lines: [
        { say: 'An inequality is a statement that two expressions are not equal. It uses one of four symbols. For example, the inequality in this box says that x is greater than three.', show: 'def' },
        { say: 'This symbol means less than. Words like fewer than, below, and under point to it.', show: 't.0', focus: 't.0' },
        { say: 'This one means greater than. Words like more than, above, and over point to it.', show: 't.1', focus: 't.1' },
        { say: 'The less than sign with a line under it means less than or equal to. At most, no more than, and cannot exceed all mean this one.', show: 't.2', focus: 't.2' },
        { say: 'And the greater than sign with a line under it means greater than or equal to. At least, no less than, and a minimum of all mean this one.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Reading the symbols',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['7 > 3 \\qquad 3 < 7'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way?', md: 'The open, wide side of $<$ or $>$ faces the **larger** number. The point faces the smaller one.' },
        { kind: 'math', id: 'n', size: 'lg', lines: ['x \\le 5 \\text{: } x \\text{ is less than or equal to } 5'] },
      ],
      lines: [
        { say: 'Seven is greater than three, and three is less than seven. Both say the same thing.', show: 'm.0' },
        { say: 'Here is a way to remember which is which. The open, wide side of the symbol faces the larger number, and the point faces the smaller number.', show: 'tip' },
        { say: 'With a variable, read it from left to right. This says: x is less than or equal to five.', show: 'n.0', focus: 'n.0' },
      ],
    },
    {
      chapter: 'The solution set',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solution set', md: 'The **solution set** of an inequality is the set of all values that make it true.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x > 3', '4 > 3 \\;\\good{\\checkmark} \\qquad 3.5 > 3 \\;\\good{\\checkmark} \\qquad 100 > 3 \\;\\good{\\checkmark}', '3 > 3 \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'An equation like x plus one equals four has one solution. An inequality usually has many.', show: 'def' },
        { say: 'The solution set of an inequality is the set of all the values that make it true.', show: 'm.0', focus: 'm.0' },
        { say: 'For x greater than three, four is a solution. So is three point five, and so is one hundred. In fact, there are infinitely many solutions: every number greater than three.', show: 'm.1', focus: 'm.1' },
        { say: 'But three itself is not a solution, because three is not greater than three. It is equal.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is it a solution?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Is $5$ a solution of $x > 3$? Of $x \\le 5$? Of $x < 5$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 > 3 \\text{ is true: yes} \\;\\good{\\checkmark}', '5 \\le 5 \\text{ is true, because } 5 = 5\\text{: yes} \\;\\good{\\checkmark}', '5 < 5 \\text{ is false: no} \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Let’s practise. Is five a solution of x greater than three? Of x less than or equal to five? Of x less than five?', show: 'q' },
        { say: 'To decide, substitute five for x, and see if the statement is true. Five is greater than three is true. So five is a solution.', show: 'm.0', focus: 'm.0' },
        { say: 'Five is less than or equal to five is also true, because five equals five. The or equal to part includes it. So five is a solution.', show: 'm.1', focus: 'm.1' },
        { say: 'But five is less than five is false. Five is not less than itself. So five is not a solution of x less than five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is a solution of $x \\le -3$?',
          choices: ['$0$', '$-2$', '$-3$', '$3$'],
          answer: 2,
          working: '$-3 \\le -3$ is true, because $-3 = -3$. The others are all greater than $-3$, so they are not solutions.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is a solution of x is less than or equal to negative three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Negative three is less than or equal to negative three, because it is equal. Choice B, negative two, is greater than negative three, so it is not a solution.', show: 'q.answer' },
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
            'An inequality uses $<$, $>$, $\\le$ or $\\ge$.',
            '“At most” and “no more than” mean $\\le$; “at least” means $\\ge$.',
            'The solution set is every value that makes the inequality true.',
            'To test a value, substitute it and see if the statement is true.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An inequality uses one of four symbols: less than, greater than, less than or equal to, and greater than or equal to.', show: 'sum.0' },
        { say: 'Key words help. At most and no more than mean less than or equal to. At least means greater than or equal to.', show: 'sum.1' },
        { say: 'The solution set is every value that makes the inequality true.', show: 'sum.2' },
        { say: 'And to test a value, substitute it and see if the statement is true. In the next part, you will show inequalities on a number line. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
