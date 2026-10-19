import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm5-7-3-d',
  lessonId: 'm5-7-3',
  title: 'Solving Equations, Part 4: Solving Problems with Equations',
  thumbnailTitle: 'Problems with Equations',
  summary: 'Four steps for a word problem: choose a letter for the unknown, write an equation that tells the story in order, solve it with inverse operations, and check in the story before answering in a sentence. Ella’s stickers (s + 8 = 23, s = 15) and museum tickets (4t + 7 = 43, t = 9, so one ticket costs $9).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Solving Problems with Equations', subtitle: 'Turn the story into an equation' }],
      lines: [
        { say: 'Many word problems have a number you do not know. An equation can help you find it.', show: 'title' },
        { say: 'In this video, you will turn a story into an equation, solve it, and check the answer in the story.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Choose a letter for the unknown number.', '**2.** Write an equation that tells the story in order.', '**3.** Solve it with inverse operations.', '**4.** Check your answer in the story, then answer in a sentence.'],
        },
      ],
      lines: [
        { say: 'Here are four steps for solving a problem with an equation.', show: 'b.0' },
        { say: 'Step one: choose a letter for the unknown number.', focus: 'b.0' },
        { say: 'Step two: write an equation that tells the story in order.', show: 'b.1', focus: 'b.1' },
        { say: 'Step three: solve it with inverse operations.', show: 'b.2', focus: 'b.2' },
        { say: 'Step four: check your answer in the story, then answer the question in a sentence.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Stickers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ella had some stickers. A friend gave Ella $8$ more. Now Ella has $23$. How many stickers did Ella have at first?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Let } s = \\text{the stickers Ella had at first.}', 's + 8 = 23', 's = 23 - 8 = 15', '\\text{Check: } 15 + 8 = 23 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Ella had some stickers. A friend gave Ella eight more. Now Ella has twenty-three. How many stickers did Ella have at first?', show: 'q' },
        { say: 'Step one: choose a letter. Let "s" be the number of stickers Ella had at first.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: tell the story in order. Ella started with "s" stickers, then got eight more, and now has twenty-three. So "s" plus eight equals twenty-three.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: solve. Eight was added, so subtract eight from both sides. "s" equals twenty-three minus eight, which is fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four: check in the story. Fifteen stickers, plus eight more, is twenty-three. That matches. So Ella had fifteen stickers at first.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Museum tickets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Hamid’s family buys $4$ museum tickets and pays \\$7 for parking. They pay \\$43 in all. Each ticket costs the same. How much does one ticket cost?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Let } t = \\text{the cost of one ticket, in dollars.}', '4t + 7 = 43', '4t = 43 - 7 = 36', 't = 36 \\div 4 = 9'] },
      ],
      lines: [
        { say: 'Hamid’s family buys four museum tickets, and pays seven dollars for parking. They pay forty-three dollars in all. Each ticket costs the same. How much does one ticket cost?', show: 'q' },
        { say: 'Step one: let t be the cost of one ticket, in dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: four tickets cost four t, and parking adds seven. The total is forty-three. So four t, plus seven, equals forty-three.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: there are two operations, so undo them in reverse order. Undo the adding first: subtract seven from both sides. Four t equals thirty-six.', show: 'm.2', focus: 'm.2' },
        { say: 'Then undo the multiplying: divide both sides by four. t equals thirty-six divided by four, which is nine.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check and answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 9 + 7 = 36 + 7 = 43 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Answer in a sentence', md: '$t = 9$ is the solution of the equation. The answer to the question is a sentence: **One ticket costs \\$9.**' },
      ],
      lines: [
        { say: 'Step four: check in the story. Four tickets at nine dollars each is thirty-six dollars. Add seven dollars for parking, and that is forty-three dollars. It matches!', show: 'm.0', focus: 'm.0' },
        { say: 't equals nine is the solution of the equation. But the question asked how much one ticket costs. So answer in a sentence: one ticket costs nine dollars.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Noah buys $3$ books that each cost the same, and a bookmark for \\$2. Noah pays \\$26 in all. How much does one book cost?',
          choices: ['\\$8', '\\$24', '\\$28', '\\$6'],
          answer: 0,
          working: 'Let $b$ be the cost of one book: $3b + 2 = 26$. Subtract $2$: $3b = 24$. Divide by $3$: $b = 8$. Check: $3 \\times 8 + 2 = 26$. One book costs \\$8.',
        },
      ],
      lines: [
        { say: 'Your turn. Noah buys three books that each cost the same, and a bookmark for two dollars. Noah pays twenty-six dollars in all. How much does one book cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight dollars. If b is the cost of one book, then three b, plus two, equals twenty-six. Subtract two to get three b equals twenty-four, then divide by three to get eight. Choice B is the cost of all three books, not one.', show: 'q.answer' },
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
          items: ['Choose a letter for the unknown number.', 'Write an equation that tells the story in order.', 'Solve with inverse operations.', 'Check in the story, then answer in a sentence.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Choose a letter for the unknown number.', show: 'sum.0' },
        { say: 'Write an equation that tells the story in order.', show: 'sum.1' },
        { say: 'Solve it with inverse operations.', show: 'sum.2' },
        { say: 'And check your answer in the story, then answer in a sentence. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
