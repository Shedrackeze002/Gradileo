import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm5-7-2-c',
  lessonId: 'm5-7-2',
  title: 'Algebraic Expressions, Part 3: Evaluating an Expression',
  thumbnailTitle: 'Evaluating Expressions',
  summary: 'Evaluating an expression by substituting a number for the variable and following the order of operations: 4n + 3 when n = 6 is 4 × 6 + 3 = 27 (not 46 + 3), m/5 + 7 when m = 30 is 6 + 7 = 13, and one expression taking a different value for each number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Evaluating an Expression', subtitle: 'Substitute, then follow the order' }],
      lines: [
        { say: 'An expression like four n, plus three, does not have just one value. Its value depends on the number that n stands for.', show: 'title' },
        { say: 'In this video, you will evaluate expressions. You will put in a number for the variable, and find the value.' },
      ],
    },
    {
      chapter: 'Substitute',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Evaluate', md: 'To **evaluate** an expression, **substitute** (put in) a number for the variable. Then follow the order of operations.' }],
      lines: [
        { say: 'To evaluate an expression, first substitute a number for the variable. Substitute means put in, the way a substitute player goes into a game in place of another player.', show: 'def' },
        { say: 'The number goes into the expression in place of the letter. Then follow the order of operations to find the value.' },
      ],
    },
    {
      chapter: 'Multiply first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $4n + 3$ when $n = 6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4n + 3', '= 4 \\times 6 + 3', '= 24 + 3', '= 27'] },
      ],
      lines: [
        { say: 'Evaluate four n, plus three, when n equals six.', show: ['q', 'm.0'] },
        { say: 'Substitute six for n. Four n means four times n, so write four times six, plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now follow the order of operations. Multiply first: four times six is twenty-four.', show: 'm.2', focus: 'm.2' },
        { say: 'Then add: twenty-four plus three is twenty-seven. The value is twenty-seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Put the times sign back', md: 'When you substitute into $4n$, write $4 \\times 6$. Writing the digits side by side gives $46$, which is wrong.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4n + 3 = 46 + 3 = \\bad{49} \\quad \\text{\\bad{wrong}}', '4n + 3 = 4 \\times 6 + 3 = \\good{27} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. When you put six in place of n in four n, do not just write the digits side by side.', show: 'oops' },
        { say: 'That gives forty-six, and forty-six plus three is forty-nine, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Four n means four times n. So write the multiplication sign again when you put in the number: four times six, plus three, is twenty-seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $\\dfrac{m}{5} + 7$ when $m = 30$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{m}{5} + 7 = \\dfrac{30}{5} + 7', '= 6 + 7', '= 13'] },
      ],
      lines: [
        { say: 'Evaluate m over five, plus seven, when m equals thirty.', show: 'q' },
        { say: 'Substitute thirty for m. Now it is thirty over five, plus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The fraction bar means divide. Divide first: thirty divided by five is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: six plus seven is thirteen. The value is thirteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Many values',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Number', 'Substitute', 'Value'], rows: [['$n = 1$', '$4 \\times 1 + 3$', '$7$'], ['$n = 2$', '$4 \\times 2 + 3$', '$11$'], ['$n = 6$', '$4 \\times 6 + 3$', '$27$']] },
        { kind: 'text', id: 'tx', size: 'md', md: 'One expression, $4n + 3$, has a different value for each number you put in.' },
      ],
      lines: [
        { say: 'The same expression has a different value for each number you substitute. Here is four n, plus three, again.', show: 'tx' },
        { say: 'When n is one, it is four times one, plus three, which is seven.', show: 't.0', focus: 't.0' },
        { say: 'When n is two, it is four times two, plus three, which is eleven.', show: 't.1', focus: 't.1' },
        { say: 'And when n is six, it is twenty-seven, as we found. That is why n is called a variable: its value can vary, or change.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $3k + 5$ when $k = 4$.',
          choices: ['$17$', '$39$', '$12$', '$27$'],
          answer: 0,
          working: 'Substitute: $3 \\times 4 + 5$. Multiply first: $12$. Then add: $12 + 5 = 17$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three k, plus five, when k equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventeen. Substitute: three times four, plus five. Multiply first to get twelve, then add five to get seventeen. Choice B writes the digits side by side: thirty-four plus five is thirty-nine.', show: 'q.answer' },
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
          items: ['To evaluate, substitute the number for the variable.', 'Put the times sign back: $4n$ with $n = 6$ is $4 \\times 6$.', 'Then follow the order of operations.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To evaluate an expression, substitute the number for the variable.', show: 'sum.0' },
        { say: 'Write the multiplication sign again: four n, when n is six, is four times six.', show: 'sum.1' },
        { say: 'Then follow the order of operations. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
