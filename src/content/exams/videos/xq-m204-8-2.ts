import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 8.2 (reading maps). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 11.1, Use the Rectangular Coordinate System, CC BY-NC-SA 4.0).
// The book's Campus Map is a grid with columns 1 to 4 and rows A to D: Parking Garage 1A, Residence
// Halls 4A, Student Center 2B, Engineering Building 3B, Taylor Hall 1C, Library 2C, Tiger Field 4C and
// Stadium 4D. We redraw it as a table. Taylor Hall is in 1C and section 3B holds the Engineering
// Building, as in the book's answers.

const QUESTION =
  'Use the map in the figure. (a) Find the grid section of Taylor Hall. (b) What is located in section 3B? [The Campus Map is a grid with columns 1 to 4 and rows A to D. Parking Garage: 1A. Residence Halls: 4A. Student Center: 2B. Engineering Building: 3B. Taylor Hall: 1C. Library: 2C. Tiger Field: 4C. Stadium: 4D.]';

const MAP = {
  kind: 'table' as const,
  id: 'map',
  head: ['', '**1**', '**2**', '**3**', '**4**'],
  rows: [
    ['**A**', 'Parking Garage', '', '', 'Residence Halls'],
    ['**B**', '', 'Student Center', 'Engineering Building', ''],
    ['**C**', 'Taylor Hall', 'Library', '', 'Tiger Field'],
    ['**D**', '', '', '', 'Stadium'],
  ],
};

const video: Explainer = {
  id: 'xq-m204-8-2',
  lessonId: '',
  exam: {
    lesson: 'm204-8-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.1, Use the Rectangular Coordinate System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-1-use-the-rectangular-coordinate-system',
    question: QUESTION,
  },
  title: 'Exam Question: Finding Your Way on a Campus Map (Reading Maps)',
  thumbnailTitle: 'Where Is Taylor Hall?',
  thumbnail: 'map',
  summary:
    'A real test question, solved one small step at a time: a campus map is split into a grid, with numbers 1 to 4 across and letters A to D down. (a) Taylor Hall is in column 1 and row C, so its grid section is 1C. (b) Section 3B is column 3 and row B, which holds the Engineering Building. Then we check the answers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Is Taylor Hall?', subtitle: 'Grid maps, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about reading a map. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use the map in the figure. (a) Find the grid section of Taylor Hall. (b) What is located in section 3B?',
          answer: '(a) 1C (b) the Engineering Building',
          working: 'Taylor Hall: column 1, row C; 3B: column 3, row B',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book. It uses the book’s campus map, which we will draw in a moment.', show: 'q' },
        { say: 'Part a: find the grid section of Taylor Hall. Part b: what is located in section 3 B?' },
        { say: 'If you would like to try it first, pause the video at the next picture.', wait: 2 },
      ],
    },
    {
      chapter: 'The map',
      layout: 'center',
      main: [MAP],
      lines: [
        { say: 'Here is the campus map. It is split into a grid of squares, called grid sections.', show: 'map' },
        { say: 'The numbers 1 to 4 run across the top, and the letters A to D run down the side.', focus: 'map.0' },
        { say: 'Pause the video now if you would like to try it.', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Naming a grid section', md: 'Every section has a **number** and a **letter**. The number tells the **column** (across), and the letter tells the **row** (down). The book writes the number first, like **2B**.' }],
      lines: [
        { say: 'Here is what we need. Every grid section is named by a number and a letter.', show: 'c' },
        { say: 'The number tells the column, going across. The letter tells the row, going down. The book writes the number first. For example, the Student Center is in section 2 B: above the number 2, and next to the letter B.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Find **Taylor Hall**, then read its **column** and **row**', '(b) Go to column **3**, then down to row **B**'] }],
      lines: [
        { say: 'Here is the plan. For part a, find Taylor Hall, then read its column number and its row letter.', show: 'plan.0' },
        { say: 'For part b, go across to column 3, then down to row B, and see what is there.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Part (a): Taylor Hall',
      layout: 'center',
      main: [MAP, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{column } 1, \\text{ row C} \\;\\Rightarrow\\; \\good{1\\text{C}}'] }],
      lines: [
        { say: 'Part a. Taylor Hall is in the row next to the letter C.', show: 'map', focus: 'map.2' },
        { say: 'And it is in the column below the number 1. So Taylor Hall is in grid section 1 C.', show: 'm', focus: ['map.2', 'm'] },
      ],
    },
    {
      chapter: 'Part (b): Section 3B',
      layout: 'center',
      main: [MAP, { kind: 'math', id: 'm', size: 'md', lines: ['3\\text{B} \\;\\Rightarrow\\; \\text{column } 3, \\text{ row B} \\;\\Rightarrow\\; \\good{\\text{Engineering Building}}'] }],
      lines: [
        { say: 'Part b. Section 3 B means column 3 and row B. Go across to column 3, and down to row B.', show: 'map', focus: 'map.1' },
        { say: 'There we find the Engineering Building.', show: 'm', focus: ['map.1', 'm'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Check both ways', md: 'Go back from **1C**: column $1$, row C is **Taylor Hall** $\\checkmark$. And the Engineering Building is in column $3$, row B: **3B** $\\checkmark$.' }],
      lines: [
        { say: 'Let us check by going the other way. Start at 1 C: column 1, row C. That is Taylor Hall.', show: 'c' },
        { say: 'And find the Engineering Building: it is in column 3 and row B, which is 3 B. It checks out.' },
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
            ['(a) C1', 'the book writes the **number** first: **1C**'],
            ['(a) 1B', 'counted the rows from the **bottom**: A is at the **top**'],
            ['(b) Student Center', 'that is **2B**: go across to column **3**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'C 1 names the right square, but this book writes the number first, so write 1 C.' },
        { say: '1 B counts the rows up from the bottom. On this map, row A is at the top.' },
        { say: 'And the Student Center is in 2 B. Section 3 B is one more column to the right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        MAP,
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On the same map, what is located in section 4D?',
          answer: 'the Stadium',
        },
      ],
      lines: [
        { say: 'Your turn. On the same map, what is located in section 4 D? Pause the video and try it.', show: ['map', 'q2'], wait: 8 },
        { say: 'Column 4, then down to row D, the bottom row. That is the Stadium.', show: 'q2.answer', focus: 'map.3' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A grid map has **numbers** across and **letters** down', 'The number gives the **column**', 'The letter gives the **row**', 'Check which **corner** row A starts in'] }],
      lines: [
        { say: 'Here is what to remember. A grid map has numbers across and letters down.', show: 'sum.0' },
        { say: 'The number gives the column.', show: 'sum.1' },
        { say: 'The letter gives the row.', show: 'sum.2' },
        { say: 'And check where row A starts on each map. For more on reading maps, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
