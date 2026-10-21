import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm6-11-2',
  lessonId: 'm6-11-2',
  title: 'Function Rules and Equations, Part 1: From Words to an Equation',
  thumbnailTitle: 'From Words to an Equation',
  thumbnail: false,
  summary: 'An equation for a function shows its rule with variables, with the dependent variable on the left of the equal sign: “multiply the weeks by 3, then add 4” becomes h = 3w + 4. 3x means 3 × x, and in y = 3x + 2 you multiply first, then add. “Multiply x by 6, then add 1” is y = 6x + 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Function Rules and Equations · Part 1', title: 'From Words to an Equation', subtitle: 'The rule, written with variables' }],
      lines: [
        { say: 'Writing a rule in words takes a lot of space: multiply the number of weeks by three, then add four. Mathematicians have a shorter way to write it.', show: 'title' },
        { say: 'In this video, you will write the rule of a function as an equation.' },
      ],
    },
    {
      chapter: 'An equation for a function',
      layout: 'center',
      main: [
        { kind: 'text', id: 'w', size: 'lg', md: 'Multiply the number of weeks by $3$, then add $4$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\opp{h} = 3\\adj{w} + 4'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equation for a function', md: 'An **equation** for a function shows the rule with variables. The **dependent** variable goes on the **left** side of the equal sign.' },
      ],
      lines: [
        { say: 'Here is the bean plant’s rule in words: multiply the number of weeks by three, then add four.', show: 'w' },
        { say: 'Here it is as an equation: h equals three w plus four. The letter w is the number of weeks, and h is the height.', show: 'm', focus: 'm' },
        { say: 'An equation for a function shows the rule with variables. The dependent variable, here the height, goes on the left side of the equal sign. The rule goes on the right side.', show: 'def' },
      ],
    },
    {
      chapter: 'A number next to a letter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x = 3 \\times x', 'y = 3x + 2', '\\text{multiply first, then add}'] },
      ],
      lines: [
        { say: 'In an equation, a number written right next to a letter means multiply. Three x means three times x.', show: 'm.0', focus: 'm.0' },
        { say: 'Most rules use the letters x and y. The independent variable is x, and the dependent variable is y.', show: 'm.1' },
        { say: 'In y equals three x plus two, you multiply x by three first, then add two. Multiply first, then add, just like the order of operations.', show: 'm.2', focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Words and equations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Words', 'Equation'],
          rows: [
            ['$y$ is $4$ times $x$.', '$y = 4x$'],
            ['$y$ is $7$ more than $x$.', '$y = x + 7$'],
            ['Multiply $x$ by $3$, then add $2$.', '$y = 3x + 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some rules in words, and the same rules as equations.', show: 't' },
        { say: 'y is four times x. That is y equals four x.', focus: 't.0' },
        { say: 'y is seven more than x. That is y equals x plus seven.', focus: 't.1' },
        { say: 'Multiply x by three, then add two. That is y equals three x plus two.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Writing an equation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'To find $y$, multiply $x$ by $6$, then add $1$. Write an equation.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{multiply } x \\text{ by } 6\\!: \\quad 6x', '\\text{then add } 1\\!: \\quad 6x + 1', 'y = 6x + 1'] },
      ],
      lines: [
        { say: 'Let’s write one. To find y, multiply x by six, then add one. Write an equation.', show: 'q' },
        { say: 'Multiply x by six. That is six x.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add one: six x plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'The dependent variable, y, goes on the left. So the equation is y equals six x plus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To find $y$, multiply $x$ by $2$, then add $9$. Which equation shows this rule?',
          choices: ['$y = 9x + 2$', '$y = x + 11$', '$y = 2x + 9$', '$y = 2 + 9$'],
          answer: 2,
          working: 'Multiply $x$ by $2$: $2x$. Then add $9$: $y = 2x + 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. To find y, multiply x by two, then add nine. Which equation shows this rule? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: y equals two x plus nine. Multiply x by two, then add nine. Choice A mixes up the numbers: it multiplies by nine and adds two.', show: 'q.answer' },
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
          items: ['An equation shows the rule with variables, with the dependent variable on the left.', '$3x$ means $3 \\times x$.', 'In $y = 3x + 2$, multiply first, then add.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation for a function shows its rule with variables. The dependent variable goes on the left.', show: 'sum.0' },
        { say: 'A number next to a letter means multiply: three x means three times x.', show: 'sum.1' },
        { say: 'And in y equals three x plus two, multiply first, then add. In the next part, you will find an equation from a table of values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
