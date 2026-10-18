import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-8-1',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 1: Problem-Solving Strategies',
  thumbnailTitle: 'Problem-Solving Strategies',
  thumbnail: false,
  summary: 'Five strategies for puzzles and games: organized lists, guess and check, eliminating possibilities, looking for a pattern and working backward. Worked example: a two-digit number whose digits add to 11, with the tens digit 3 more than the ones digit, solved with an organized list (74), checked against every clue, and again with algebra.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 1', title: 'Problem-Solving Strategies', subtitle: 'Plans that work on any puzzle' }],
      lines: [
        { say: 'Puzzles and games have been part of mathematics for thousands of years. Solving them uses the same habits as any hard problem: organize the information, look for patterns, test ideas, and check your answer against every condition.', show: 'title' },
        { say: 'In this video, you will meet five strategies for solving puzzles, and use one of them to crack a number riddle.' },
      ],
    },
    {
      chapter: 'What is a strategy?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Strategy', md: 'A **strategy** is a general plan for solving a problem or winning a game.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Make an **organized list** or table.', '**Guess, check** and improve the guess.', '**Eliminate** possibilities.', 'Look for a **pattern**.', '**Work backward** from the goal.'],
        },
      ],
      lines: [
        { say: 'A strategy is a general plan for solving a problem or winning a game. It does not give you the answer to one puzzle; it gives you a way to start on many.', show: 'def' },
        { say: 'Make an organized list or table, so that you see every possibility and miss none.', show: 'b.0' },
        { say: 'Guess, check, and improve the guess: each wrong guess tells you which way to go next.', show: 'b.1' },
        { say: 'Eliminate possibilities: cross out everything the clues rule out, until only one choice is left.', show: 'b.2' },
        { say: 'Look for a pattern: work out a few small cases, and see what repeats.', show: 'b.3' },
        { say: 'And work backward from the goal: start at the end, and ask what must have happened just before it.', show: 'b.4' },
      ],
    },
    {
      chapter: 'A number riddle',
      layout: 'split',
      leftWidth: 500,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'Tens', 'Ones'],
          rows: [
            ['$29$', '$2$', '$9$'],
            ['$38$', '$3$', '$8$'],
            ['$47$', '$4$', '$7$'],
            ['$56$', '$5$', '$6$'],
            ['$65$', '$6$', '$5$'],
            ['$\\good{74}$', '$\\good{7}$', '$\\good{4}$'],
            ['$83$', '$8$', '$3$'],
            ['$92$', '$9$', '$2$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'p', size: 'md', md: 'I am a two-digit number. The sum of my digits is 11, and my tens digit is 3 more than my ones digit. What number am I?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7 = 4 + 3\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Here is a riddle. I am a two-digit number. The sum of my digits is eleven, and my tens digit is three more than my ones digit. What number am I?', show: 'p' },
        { say: 'Start with the first clue, and make an organized list of every two-digit number whose digits add to eleven. Go in order of the tens digit, so that none is missed.' },
        { say: 'A tens digit of one would need a ones digit of ten, which is impossible, so the list starts at 29. Then come 38, 47 and 56.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Then 65, 74, 83 and 92. That is all eight of them.', show: ['t.4', 't.5', 't.6', 't.7'] },
        { say: 'Now test the second clue on each one: the tens digit must be three more than the ones digit. Only 74 works, because seven is four plus three.', show: 'm.0', focus: ['t.5', 'm.0'] },
      ],
    },
    {
      chapter: 'Check every clue',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['74:\\quad \\text{two digits}\\ \\checkmark \\qquad 7 + 4 = 11\\ \\checkmark \\qquad 7 = 4 + 3\\ \\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check every clue', md: 'When you think you have the answer, test it against every clue. A good puzzle has exactly one answer that fits them all.' },
      ],
      lines: [
        { say: 'When you think you have the answer, test it against every clue. 74 is a two-digit number, its digits add to eleven, and its tens digit is three more than its ones digit.', show: 'm' },
        { say: 'A good puzzle has exactly one answer that fits every clue. The organized list shows that here: 74 is the only number in it that passes both tests.', show: 'tip' },
      ],
    },
    {
      chapter: 'Another way: algebra',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{ones digit: } x \\qquad \\text{tens digit: } x + 3', '(x + 3) + x = 11', '2x + 3 = 11 \\ \\Rightarrow\\ 2x = 8 \\ \\Rightarrow\\ x = 4', '\\text{ones } 4,\\ \\text{tens } 7:\\quad 74'] },
      ],
      lines: [
        { say: 'Algebra is a strategy too. Let x be the ones digit. The tens digit is three more, so it is x plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'The digits add to eleven, so x plus three, plus x, equals eleven.', show: 'm.1', focus: 'm.1' },
        { say: 'That is two x plus three equals eleven. Subtract three: two x equals eight, so x is four.', show: 'm.2', focus: 'm.2' },
        { say: 'The ones digit is four and the tens digit is seven: the number is 74 again. Two different strategies, one answer, which is a good sign that it is right.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'I am a two-digit number. The sum of my digits is $9$, and my ones digit is $5$ more than my tens digit. What number am I?',
          choices: ['$72$', '$27$', '$36$', '$18$'],
          answer: 1,
          working: 'The two-digit numbers with a digit sum of $9$ are $18, 27, 36, 45, 54, 63, 72, 81$ and $90$. Only $27$ has a ones digit $5$ more than its tens digit: $7 = 2 + 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. I am a two-digit number. The sum of my digits is nine, and my ones digit is five more than my tens digit. What number am I? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 27. Its digits add to nine, and its ones digit, seven, is five more than its tens digit, two. Choice A, 72, has the digits the wrong way round: there, the tens digit is the larger one.', show: 'q.answer' },
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
            'A **strategy** is a general plan: organized lists, guess and check, eliminating, patterns and working backward.',
            'An organized list shows every possibility, so none is missed.',
            'Check your answer against **every** clue.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strategy is a general plan: an organized list, guess and check, eliminating possibilities, looking for a pattern, or working backward.', show: 'sum.0' },
        { say: 'An organized list shows every possibility, in order, so none is missed.', show: 'sum.1' },
        { say: 'And always check your answer against every clue. In the next part, you will use these strategies on magic squares. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
