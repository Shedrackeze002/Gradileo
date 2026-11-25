import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 8.1 (puzzles and games). Gradileo wrote this one, in the style
// of a Grade 12 puzzles and games unit quiz, because the free OpenStax books have no questions on
// game strategy. In this take-away game (1, 2 or 3 counters a turn, last counter wins), the losing
// positions are the multiples of 4: whatever you take from 4k, your opponent can take the rest of a
// 4 and leave 4(k − 1). From 15 the first player takes 3, leaving 12, and then always takes
// 4 minus what the other player took.

const COUNTERS = (n: number) => Array.from({ length: n }, () => '\\bullet').join('\\,');

const QUESTION =
  'Two players take turns removing 1, 2 or 3 counters from a pile of 15 counters. The player who takes the last counter wins. How many counters should the first player take on the first turn to be sure of winning, and what should they do after that?';

const video: Explainer = {
  id: 'xq-m302-8-1',
  lessonId: '',
  exam: {
    lesson: 'm302-8-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 puzzles and games unit quiz',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Win the 15-Counter Game (Puzzles and Games)',
  thumbnailTitle: 'Win the 15-Counter Game',
  thumbnail: 'back',
  summary:
    'An exam-style question, solved one small step at a time: two players take turns removing 1, 2 or 3 counters from a pile of 15, and whoever takes the last counter wins. How can the first player be sure of winning? Working backward, 4 counters is a losing pile to face, and so is any multiple of 4. So the first player takes 3, leaving 12, and after that always takes 4 minus what the other player took. Then we play a game through and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Win the 15-Counter Game', subtitle: 'Puzzles and games, step by step' }],
      lines: [
        { say: 'In this video, we solve a test question about puzzles and games. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 puzzles and games unit quiz. It says so at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: 'Take $3$, leaving $12$. After that, always take $4$ minus what the other player took.',
          working: 'Leave a multiple of $4$ after every turn: $12$, $8$, $4$, $0$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Two players take turns removing 1, 2 or 3 counters from a pile of 15 counters. The player who takes the last counter wins. How many counters should the first player take on the first turn to be sure of winning, and what should they do after that?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'pile', size: 'lg', lines: [COUNTERS(15)] },
        { kind: 'text', id: 't', size: 'md', md: 'We need a **strategy**: a plan that wins **whatever** the other player does, not just a lucky first move.' },
      ],
      lines: [
        { say: 'Here is the pile of 15 counters.', show: 'pile' },
        { say: 'We need a strategy: a plan that wins whatever the other player does. A move that only works if they make a mistake is not enough.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'wb', tone: 'key', title: 'Work backward', md: 'Start from the **end** of the game and ask: which piles are **good** to leave for the other player?' },
        { kind: 'callout', id: 'pat', tone: 'tip', title: 'Look for a pattern', md: 'Small cases first, then spot the **pattern** and use it on the big pile.' },
      ],
      lines: [
        { say: 'Here is what we need. Work backward. Start from the end of the game and ask which piles are good to leave for the other player.', show: 'wb' },
        { say: 'And look for a pattern. Try the small piles first, then use the pattern on 15.', show: 'pat' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **losing** piles, working backward', 'Spot the **pattern**', 'Choose the first move that leaves a losing pile'] }],
      lines: [
        { say: 'Here is the plan. First, work backward to find the piles that lose for whoever has to move.', show: 'plan.0' },
        { say: 'Second, spot the pattern.', show: 'plan.1' },
        { say: 'Third, choose the first move that leaves the other player a losing pile.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Work backward',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'back',
          head: ['Pile you face', 'What happens', 'For you'],
          rows: [
            ['$1, 2, 3$', 'take them all', '**win**'],
            ['$4$', 'take $1$, $2$ or $3$: they take the rest', '**lose**'],
            ['$5, 6, 7$', 'take $1$, $2$ or $3$ to **leave** $4$', '**win**'],
            ['$8$', 'every move leaves $5$, $6$ or $7$', '**lose**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Work backward from the end. If you face 1, 2 or 3 counters, you take them all and win.', show: 'back' },
        { say: 'If you face 4, you must take 1, 2 or 3, and the other player takes the rest. You lose.' },
        { say: 'If you face 5, 6 or 7, you take just enough to leave 4. Now the other player is stuck. You win.' },
        { say: 'And if you face 8, every move leaves 5, 6 or 7, which wins for the other player. You lose.' },
      ],
    },
    {
      chapter: 'Step 2: The pattern',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{losing piles: } 4, \\ 8, \\ \\good{12}, \\ 16, \\ \\ldots', '\\text{the multiples of } 4'] },
        { kind: 'text', id: 't', size: 'md', md: 'Whatever they take ($1$, $2$ or $3$), you take the rest of a **4**: $\\ 3 + 1$, $\\ 2 + 2$, $\\ 1 + 3$.' },
      ],
      lines: [
        { say: 'Step two. The losing piles are 4, 8, 12, 16 and so on: the multiples of 4.', show: 'm.0' },
        { say: 'Here is why. Each round, the two players can always take exactly 4 between them.', show: 'm.1' },
        { say: 'If they take 1, you take 3. If they take 2, you take 2. If they take 3, you take 1. So a multiple of 4 always leads to the next multiple of 4 down.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: The first move',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 - \\good{3} = 12', '\\text{then: take } 4 - (\\text{their move})'] }],
      lines: [
        { say: 'Step three. The nearest multiple of 4 below 15 is 12. So the first player takes 3, leaving 12.', show: 'm.0' },
        { say: 'After that, they always take 4 minus what the other player just took. That leaves 8, then 4, then 0, and the first player takes the last counter.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'game',
          head: ['Turn', 'Takes', 'Left'],
          rows: [
            ['First player', '$3$', '$\\good{12}$'],
            ['Second player', '$2$', '$10$'],
            ['First player', '$2$', '$\\good{8}$'],
            ['Second player', '$3$', '$5$'],
            ['First player', '$1$', '$\\good{4}$'],
            ['Second player', '$1$', '$3$'],
            ['First player', '$3$', '$\\good{0}$: wins'],
          ],
        },
      ],
      lines: [
        { say: 'Let us check by playing a game. The first player takes 3, leaving 12.', show: 'game' },
        { say: 'The second player takes 2. The first player takes 2, making 4 for the round, and leaves 8.' },
        { say: 'The second player takes 3. The first player takes 1, and leaves 4.' },
        { say: 'Now the second player is stuck. They take 1, and the first player takes the last 3 and wins. It checks out.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['always take $3$', 'take $4$ **minus** their move, to keep a multiple of $4$'],
            ['take $1$ first, leaving $14$', '$14$ is not a multiple of $4$: they can leave you $12$'],
            ['one lucky game', 'a strategy must win **whatever** they do'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Taking 3 every time does not work. You must take 4 minus their move, so that each round removes exactly 4.' },
        { say: 'Starting with 1 leaves 14, which is not a multiple of 4. A clever opponent takes 2 and leaves you with 12.' },
        { say: 'And winning one game is not a strategy. The plan must win whatever the other player does.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The same game starts with $21$ counters. How many should the first player take to be sure of winning?',
          choices: ['$1$', '$2$', '$3$', 'They cannot be sure of winning'],
          answer: 0,
          working: 'The multiple of $4$ below $21$ is $20$: take $1$.',
        },
      ],
      lines: [
        { say: 'Your turn. The same game starts with 21 counters. How many should the first player take to be sure of winning? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The nearest multiple of 4 below 21 is 20. So the first player takes 1: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Work backward** from the end of the game', 'Find the **losing** positions: here, multiples of $4$', 'Always leave the other player a losing position', 'Test the strategy against **every** reply'] }],
      lines: [
        { say: 'Here is what to remember. Work backward from the end of the game.', show: 'sum.0' },
        { say: 'Find the losing positions. In this game, they are the multiples of 4.', show: 'sum.1' },
        { say: 'Always leave the other player a losing position.', show: 'sum.2' },
        { say: 'And test the strategy against every reply. For more on puzzles and games, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
