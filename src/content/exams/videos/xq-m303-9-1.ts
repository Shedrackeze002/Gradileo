import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 9.1 (logic puzzles and games). Gradileo wrote this one, in the
// style of a Grade 12 puzzles unit quiz, because the free OpenStax books have no logic grid
// puzzles. Clue 2 rules out two sports for Ben, so Ben plays soccer. Then neither Ana (clue 1) nor
// Ben plays hockey, so Cara does, and Ana plays the sport that is left, volleyball.

const QUESTION =
  'Ana, Ben and Cara each play a different sport: hockey, soccer or volleyball. Ana does not play hockey. Ben plays neither hockey nor volleyball. Which sport does each friend play?';

const Y = '$\\good{\\checkmark}$';
const N = '$\\times$';
const E = '';
type Row = [string, string, string];

/** The logic grid: rows Ana, Ben, Cara; columns hockey, soccer, volleyball. */
const grid = (id: string, ana: Row, ben: Row, cara: Row) => ({
  kind: 'table' as const,
  id,
  head: ['', 'hockey', 'soccer', 'volleyball'],
  rows: [
    ['**Ana**', ...ana],
    ['**Ben**', ...ben],
    ['**Cara**', ...cara],
  ],
});

const video: Explainer = {
  id: 'xq-m303-9-1',
  lessonId: '',
  exam: {
    lesson: 'm303-9-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 puzzles unit quiz',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Who Plays Which Sport? A Logic Grid (Logic Puzzles)',
  thumbnailTitle: 'Who Plays Which Sport?',
  thumbnail: 'gr',
  summary:
    'An exam-style question, solved one small step at a time: Ana, Ben and Cara each play a different sport, hockey, soccer or volleyball. Ana does not play hockey, and Ben plays neither hockey nor volleyball. Who plays what? A logic grid shows Ben must play soccer, so Cara is the only one left for hockey, and Ana plays volleyball. Then we check every clue and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Who Plays Which Sport?', subtitle: 'Logic puzzles, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style logic puzzle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 puzzles unit quiz. It says so at the bottom of the screen the whole way through.' },
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
          answer: 'Ana: volleyball. Ben: soccer. Cara: hockey.',
          working: 'Ben can only play soccer; then only Cara can play hockey.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Ana, Ben and Cara each play a different sport: hockey, soccer or volleyball. Ana does not play hockey. Ben plays neither hockey nor volleyball. Which sport does each friend play?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [grid('gr', [E, E, E], [E, E, E], [E, E, E]), { kind: 'text', id: 't', size: 'md', md: 'Three people, three sports, and **each** sport is played by exactly **one** person.' }],
      lines: [
        { say: 'Here is a logic grid. Each row is a friend, and each column is a sport.', show: 'gr' },
        { say: 'Each friend plays one sport, and each sport is played by exactly one friend. So every row, and every column, ends up with exactly one tick.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'x', tone: 'key', title: 'Crosses and ticks', md: 'Put a $\\times$ where a clue **rules something out**. When a row or column has only **one** empty box left, it must be a $\\checkmark$.' },
        { kind: 'callout', id: 'start', tone: 'tip', title: 'Start with the strongest clue', md: 'Begin with the clue that tells you the **most**.' },
      ],
      lines: [
        { say: 'Here is what we need. Put a cross wherever a clue rules something out. When a row or a column has only one empty box left, that box must be a tick.', show: 'x' },
        { say: 'And start with the clue that tells you the most.', show: 'start' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Cross out what **each clue** rules out', 'Fill in any box that is the **only one left**', 'Check **every** clue'] }],
      lines: [
        { say: 'Here is the plan. First, cross out what each clue rules out.', show: 'plan.0' },
        { say: 'Second, fill in any box that is the only one left in its row or column, and repeat.', show: 'plan.1' },
        { say: 'Third, check the answer against every clue.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The clues',
      layout: 'center',
      main: [grid('gr', [N, E, E], [N, E, N], [E, E, E]), { kind: 'text', id: 't', size: 'md', md: 'Ana: **not** hockey. Ben: **not** hockey, **not** volleyball.' }],
      lines: [
        { say: 'Step one. Ana does not play hockey, so cross out Ana and hockey.', show: 'gr' },
        { say: 'Ben plays neither hockey nor volleyball. Neither, nor rules out both, so cross out two boxes in Ben\'s row.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: Ben',
      layout: 'center',
      main: [grid('gr', [N, N, E], [N, Y, N], [E, N, E]), { kind: 'text', id: 't', size: 'md', md: 'Ben has only **soccer** left. Then nobody else plays soccer.' }],
      lines: [
        { say: 'Step two. Ben\'s row has only one empty box left: soccer. So Ben plays soccer.', show: 'gr' },
        { say: 'Each sport has only one player, so cross out soccer for Ana and for Cara.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Cara and Ana',
      layout: 'center',
      main: [grid('gr', [N, N, Y], [N, Y, N], [Y, N, N]), { kind: 'text', id: 't', size: 'md', md: 'Only **Cara** is left for hockey, and only **volleyball** is left for Ana.' }],
      lines: [
        { say: 'Step three. Look at the hockey column. Ana and Ben are both crossed out, so Cara plays hockey.', show: 'gr' },
        { say: 'That leaves Ana with only volleyball. Ana plays volleyball, Ben plays soccer, and Cara plays hockey.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'chk',
          head: ['Clue', 'Our answer', 'OK?'],
          rows: [
            ['Ana does not play hockey', 'Ana: volleyball', Y],
            ['Ben: neither hockey nor volleyball', 'Ben: soccer', Y],
            ['each sport once', 'hockey, soccer, volleyball', Y],
          ],
        },
      ],
      lines: [
        { say: 'Let us check every clue. Ana does not play hockey: she plays volleyball, so that is true.', show: 'chk' },
        { say: 'Ben plays neither hockey nor volleyball: he plays soccer, so that is true.' },
        { say: 'And each sport is played by exactly one friend. It checks out.' },
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
            ['guessing "Ana plays soccer"', 'a guess is not a **reason**: follow the clues'],
            ['"neither … nor" rules out **one**', 'it rules out **both** sports'],
            ['only checking rows', 'each **column** has one tick too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Guessing that Ana plays soccer might feel right, but a guess is not a reason. Every tick should follow from the clues.' },
        { say: 'Neither hockey nor volleyball rules out both sports, not just one.' },
        { say: 'And each column also has exactly one tick. That is how we found Cara.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Dev, Eli and Fay each have a different pet: a cat, a dog or a fish. Eli\'s pet has no fur. Dev does not have a cat. Who has the dog?',
          choices: ['Eli', 'Fay', 'You cannot tell', 'Dev'],
          answer: 3,
          working: 'No fur: Eli has the fish. Dev has neither the cat nor the fish, so Dev has the dog.',
        },
      ],
      lines: [
        { say: 'Your turn. Dev, Eli and Fay each have a different pet: a cat, a dog or a fish. Eli\'s pet has no fur. Dev does not have a cat. Who has the dog? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The only pet without fur is the fish, so Eli has the fish. Dev cannot have the cat, and the fish is taken, so Dev has the dog: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw a **logic grid**', 'Cross out what each clue **rules out**', 'One empty box left in a row or column: **tick** it', 'Check the answer against **every** clue'] }],
      lines: [
        { say: 'Here is what to remember. Draw a logic grid.', show: 'sum.0' },
        { say: 'Cross out what each clue rules out.', show: 'sum.1' },
        { say: 'When a row or column has one empty box left, tick it.', show: 'sum.2' },
        { say: 'And check the answer against every clue. For more on logic puzzles and games, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
