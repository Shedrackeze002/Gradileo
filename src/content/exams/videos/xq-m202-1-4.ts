import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 1.4 (reasoning in puzzles and games). Gradileo wrote this one,
// in the style of a Grade 11 reasoning unit test, since the free question banks have no number
// riddle at this level: the two-digit multiples of 6 with digit sum 9 are 18, 36, 54, 72 and 90;
// a tens digit greater than the ones digit leaves 54, 72 and 90; less than 60 leaves 54.

const QUESTION =
  'I am a two-digit number. I am a multiple of 6. The sum of my digits is 9. My tens digit is greater than my ones digit. I am less than 60. What number am I?';

const video: Explainer = {
  id: 'xq-m202-1-4',
  lessonId: '',
  exam: {
    lesson: 'm202-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 reasoning unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Solve the Number Riddle (Reasoning in Puzzles)',
  thumbnailTitle: 'Solve the Number Riddle',
  thumbnail: 'list',
  summary:
    'An exam-style question, solved one small step at a time: a two-digit number is a multiple of 6, its digits add to 9, its tens digit is greater than its ones digit, and it is less than 60. What is it? We start with the clues that allow the fewest numbers, make a list, cross numbers off one clue at a time, and find 54. Then we check every clue and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Number Riddle', subtitle: 'Reasoning in puzzles, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style number riddle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 reasoning unit test. It says so at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '$54$', working: 'Multiples of $6$ with digit sum $9$: $18, 36, 54, 72, 90$. Tens digit bigger: $54, 72, 90$. Less than $60$: $54$.' }],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'I am a two-digit number. I am a multiple of 6. The sum of my digits is 9. My tens digit is greater than my ones digit. I am less than 60. What number am I?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find the **one** two-digit number that fits **all five** clues.' }],
      lines: [{ say: 'There are 90 two-digit numbers. We need the one number that fits all five clues at once.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'st', tone: 'tip', title: 'A strategy for riddles', md: 'Start with the clue that allows the **fewest** numbers. **List** them, then use each other clue to **cross numbers off**.' },
        { kind: 'callout', id: 'm6', tone: 'key', title: 'Multiples of 6', md: 'Count by sixes: $6, 12, 18, 24, 30, 36, \\dots$ A multiple of $6$ is always **even**.' },
      ],
      lines: [
        { say: 'Here is what we need. A good strategy is to start with the clue that allows the fewest numbers. Make a list, and then use each of the other clues to cross numbers off.', show: 'st' },
        { say: 'And the multiples of 6 are what we get counting by sixes: 6, 12, 18, 24, 30, 36, and so on. A multiple of 6 is always even.', show: 'm6' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**List** the multiples of $6$ whose digits add to $9$', 'Cross off any whose tens digit is **not bigger**', 'Cross off any that are **60 or more**'] }],
      lines: [
        { say: 'Here is the plan. First, list the two-digit multiples of 6 whose digits add to 9.', show: 'plan.0' },
        { say: 'Second, cross off any whose tens digit is not bigger than the ones digit.', show: 'plan.1' },
        { say: 'Third, cross off any that are 60 or more.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Make a list',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['12, \\ \\good{18}, \\ 24, \\ 30, \\ \\good{36}, \\ 42, \\ 48, \\ \\good{54}', '60, \\ 66, \\ \\good{72}, \\ 78, \\ 84, \\ \\good{90}, \\ 96'] },
        {
          kind: 'table',
          id: 'list',
          head: ['Number', 'Digit sum', 'Tens > ones?', 'Less than 60?'],
          rows: [
            ['$18$', '$1 + 8 = 9$', '', ''],
            ['$36$', '$3 + 6 = 9$', '', ''],
            ['$54$', '$5 + 4 = 9$', '', ''],
            ['$72$', '$7 + 2 = 9$', '', ''],
            ['$90$', '$9 + 0 = 9$', '', ''],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Here are the two-digit multiples of 6, counting by sixes from 12 to 96.', show: 'm' },
        { say: 'Now keep only the ones whose digits add to 9. 18 works, because 1 plus 8 is 9. So do 36, 54, 72 and 90.', show: 'list' },
        { say: 'That leaves just five numbers to check.' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Cross numbers off',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'list',
          head: ['Number', 'Digit sum', 'Tens > ones?', 'Less than 60?'],
          rows: [
            ['$\\bad{18}$', '$9$', '$1 < 8$: **no**', ''],
            ['$\\bad{36}$', '$9$', '$3 < 6$: **no**', ''],
            ['$\\good{54}$', '$9$', '$5 > 4$: yes', 'yes'],
            ['$\\bad{72}$', '$9$', '$7 > 2$: yes', '**no**'],
            ['$\\bad{90}$', '$9$', '$9 > 0$: yes', '**no**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The tens digit must be greater than the ones digit. In 18, 1 is less than 8, so cross it off. In 36, 3 is less than 6, so cross it off too.', show: 'list' },
        { say: '54, 72 and 90 are still in.' },
        { say: 'Step three. The number must be less than 60. 72 and 90 are too big, so cross them off.' },
        { say: 'Only 54 is left. The number is 54.', focus: 'list' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ck',
          check: true,
          items: ['$54$ has **two digits**', '$54 = 6 \\times 9$, a **multiple of 6**', '$5 + 4 = 9$', '$5 > 4$', '$54 < 60$'],
        },
      ],
      lines: [
        { say: 'Let us check 54 against every clue. It has two digits.', show: 'ck.0' },
        { say: '54 is 6 times 9, so it is a multiple of 6.', show: 'ck.1' },
        { say: '5 plus 4 is 9.', show: 'ck.2' },
        { say: '5 is greater than 4.', show: 'ck.3' },
        { say: 'And 54 is less than 60. All five clues fit, so 54 is the answer.', show: 'ck.4' },
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
            ['$45$', 'digits add to $9$, but it is **odd**, so not a multiple of $6$'],
            ['$63$ or $27$', 'multiples of $9$, **not** of $6$'],
            ['$72$', 'fits four clues, but **misses** "less than 60"'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '45 has digits that add to 9, but it is odd, so it cannot be a multiple of 6.' },
        { say: '63 and 27 are multiples of 9, not of 6. Use the right times table.' },
        { say: 'And 72 fits four of the clues, but not the last one. Always check every clue.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'I am a two-digit number. I am a multiple of $5$. The sum of my digits is $8$. I am odd. What number am I?',
          choices: ['$80$', '$35$', '$53$', '$26$'],
          answer: 1,
          working: 'Multiples of $5$ with digit sum $8$: $35$ and $80$. Only $35$ is odd.',
        },
      ],
      lines: [
        { say: 'Your turn. I am a two-digit number. I am a multiple of 5. The sum of my digits is 8. I am odd. What number am I? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Multiples of 5 end in 0 or 5. The ones whose digits add to 8 are 35 and 80. Only 35 is odd, so the answer is 35: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Start with the clue that allows the **fewest** numbers', 'Make a **list**', '**Cross off** numbers one clue at a time', 'Check the answer against **every** clue'] }],
      lines: [
        { say: 'Here is what to remember. Start with the clue that allows the fewest numbers.', show: 'sum.0' },
        { say: 'Make a list.', show: 'sum.1' },
        { say: 'Cross numbers off, one clue at a time.', show: 'sum.2' },
        { say: 'And check your answer against every clue. For more on reasoning in puzzles and games, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
