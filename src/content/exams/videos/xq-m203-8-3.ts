import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 8.3 (numerical puzzles and games). The free OpenStax books have
// no magic square questions, so this one is written by Gradileo in the style of a Grade 11 workplace
// mathematics unit test; the square is written out in brackets in the description. The diagonal
// 10, 7, 4 is complete, so the magic sum is 21. Then A = 21 − 10 − 3 = 8 (top row), D = 21 − 8 − 7
// = 6 (other diagonal), B = 21 − 10 − 6 = 5 (left column), C = 21 − 5 − 7 = 9 (middle row) and
// E = 21 − 3 − 7 = 11 (middle column). Check: 6 + 11 + 4 = 21 and 8 + 9 + 4 = 21.

const QUESTION =
  'In the magic square below, every row, every column and both diagonals add to the same number, the magic sum. [The square: top row 10, 3, A; middle row B, 7, C; bottom row D, E, 4.] (a) What is the magic sum? (b) Find A, B, C, D and E.';

/** The cell in column c (0 to 2, left to right) and row r (0 to 2, top to bottom): its centre. */
const at = (c: number, r: number): [number, number] => [c + 0.5, 2.5 - r];

const GIVEN: [number, number, string][] = [[0, 0, '10'], [1, 0, '3'], [1, 1, '7'], [2, 2, '4']];
const MISSING: Record<string, [number, number, string]> = { A: [2, 0, '8'], B: [0, 1, '5'], C: [2, 1, '9'], D: [0, 2, '6'], E: [1, 2, '11'] };

/** The highlight strips: rows, columns and the two diagonals, as polygons around their cells. */
const STRIPS: Record<string, [number, number][]> = {
  row0: [[0.08, 2.08], [2.92, 2.08], [2.92, 2.92], [0.08, 2.92]],
  row1: [[0.08, 1.08], [2.92, 1.08], [2.92, 1.92], [0.08, 1.92]],
  row2: [[0.08, 0.08], [2.92, 0.08], [2.92, 0.92], [0.08, 0.92]],
  col0: [[0.08, 0.08], [0.92, 0.08], [0.92, 2.92], [0.08, 2.92]],
  col1: [[1.08, 0.08], [1.92, 0.08], [1.92, 2.92], [1.08, 2.92]],
  col2: [[2.08, 0.08], [2.92, 0.08], [2.92, 2.92], [2.08, 2.92]],
  diag: [[0.1, 2.6], [0.4, 2.9], [2.9, 0.4], [2.6, 0.1]],
  anti: [[2.6, 2.9], [2.9, 2.6], [0.4, 0.1], [0.1, 0.4]],
};

/**
 * The magic square: its grid and the four given numbers, plus the letters (for the question), the
 * found numbers named in `found` (each a part by its letter), and the highlight strips in `strips`.
 */
function square(o: { letters?: boolean; found?: string[]; strips?: string[] } = {}): DiagramEl {
  const points: Record<string, [number, number]> = { o: [0, 0], x: [3, 0], y: [0, 3], z: [3, 3], pl: [-0.3, 1.5], pr: [3.3, 1.5] };
  const items: DiagramItem[] = [];
  for (const s of o.strips ?? []) {
    STRIPS[s].forEach((p, i) => (points[`${s}-${i}`] = p));
    items.push({ kind: 'region', id: s, points: STRIPS[s].map((_, i) => `${s}-${i}`), tone: 'theta', shade: 0.2 });
  }
  for (let i = 0; i <= 3; i++) {
    Object.assign(points, { [`h${i}a`]: [0, i], [`h${i}b`]: [3, i], [`v${i}a`]: [i, 0], [`v${i}b`]: [i, 3] });
    items.push({ kind: 'line', id: `h${i}`, from: `h${i}a`, to: `h${i}b`, weight: 2.5, group: 'grid' }, { kind: 'line', id: `v${i}`, from: `v${i}a`, to: `v${i}b`, weight: 2.5, group: 'grid' });
  }
  GIVEN.forEach(([c, r, v], i) => {
    points[`g${i}`] = at(c, r);
    items.push({ kind: 'label', id: `g${i}`, at: `g${i}`, tex: v, place: 'center', group: 'given' });
  });
  for (const [k, [c, r, v]] of Object.entries(MISSING)) {
    points[`m${k}`] = at(c, r);
    if (o.letters) items.push({ kind: 'label', id: `l${k}`, at: `m${k}`, tex: `\\text{${k}}`, tone: 'theta', place: 'center', group: 'letters' });
    if (o.found?.includes(k)) items.push({ kind: 'label', id: k, at: `m${k}`, tex: v, tone: 'good', place: 'center' });
  }
  return { kind: 'diagram', id: 'sq', points, items, height: 420 };
}

const video: Explainer = {
  id: 'xq-m203-8-3',
  lessonId: '',
  exam: {
    lesson: 'm203-8-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Fill In the Magic Square (Numerical Puzzles)',
  thumbnailTitle: 'Fill In the Magic Square',
  thumbnail: 'sq',
  summary:
    'An exam-style question, solved one small step at a time: a 3 by 3 magic square has 10, 3 and A in its top row, B, 7 and C in the middle, and D, E and 4 at the bottom. Find the magic sum and the missing numbers. The diagonal 10, 7, 4 is complete, so the magic sum is 21. Then each line with one gap gives a number: A = 8, D = 6, B = 5, C = 9 and E = 11. Then we check every line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fill In the Magic Square', subtitle: 'Number puzzles, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about a magic square. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt:
            'In the magic square, every row, every column and both diagonals add to the same number, the magic sum. The top row is $10$, $3$, A; the middle row is B, $7$, C; and the bottom row is D, E, $4$. (a) What is the magic sum? (b) Find A, B, C, D and E.',
          answer: '(a) $21$ (b) A $= 8$, B $= 5$, C $= 9$, D $= 6$, E $= 11$',
          working: 'Diagonal 10 + 7 + 4 = 21; then fill a line with one gap at a time',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'In the magic square, every row, every column and both diagonals add to the same number, called the magic sum.' },
        { say: 'The top row is 10, 3 and A. The middle row is B, 7 and C. And the bottom row is D, E and 4.' },
        { say: 'Part a: what is the magic sum? Part b: find A, B, C, D and E.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [square({ letters: true })],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Magic square', md: 'Every **row**, every **column** and both **diagonals** add to the same number, the **magic sum**. That is $8$ lines in all.' }],
      lines: [
        { say: 'Here is the square, with a letter in each empty cell.', show: 'sq' },
        { say: 'Every row, every column and both diagonals add to the magic sum. That is 3 rows, 3 columns and 2 diagonals: 8 lines in all.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{missing} = \\text{magic sum} - \\text{the other two}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'One gap at a time', md: 'Look for a line with only **one** missing number. Take the two numbers you know away from the magic sum, and the gap is what is left.' },
      ],
      lines: [
        { say: 'Here is what we need. In a line with one missing number, the missing number is the magic sum, minus the other two.', show: 'm' },
        { say: 'So we look for a line with only one gap. Each number we find can open up another line.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Add a **complete** line', '(b) Fill a line with **one gap**, again and again', '**Check** every line'] }],
      lines: [
        { say: 'Here is the plan. For part a, find a complete line and add it up.', show: 'plan.0' },
        { say: 'For part b, fill a line with one gap, again and again, until the square is full.', show: 'plan.1' },
        { say: 'Then check every line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The magic sum',
      layout: 'split',
      leftWidth: 560,
      left: [square({ letters: true, strips: ['diag'] })],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10 + 7 + 4 = \\good{21}'] }],
      lines: [
        { say: 'Part a. Every row and column has a gap. But the diagonal from top left to bottom right is complete: 10, 7 and 4.', show: ['sq.grid', 'sq.given', 'sq.letters', 'sq.diag'], focus: 'sq.diag' },
        { say: '10 plus 7 plus 4 is 21. The magic sum is 21.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Part (b): A and D',
      layout: 'split',
      leftWidth: 560,
      left: [square({ found: ['A', 'D'], strips: ['row0', 'anti'] })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{A} = 21 - 10 - 3 = \\good{8}', '\\text{D} = 21 - 8 - 7 = \\good{6}'] }],
      lines: [
        { say: 'Part b. The top row has one gap: 10, 3 and A. 21 minus 10, minus 3, is 8. So A is 8.', show: ['sq.grid', 'sq.given', 'sq.row0', 'sq.A', 'm.0'], focus: ['sq.row0', 'm.0'] },
        { say: 'Now the other diagonal has one gap: A, which is 8, then 7, then D. 21 minus 8, minus 7, is 6. So D is 6.', show: ['sq.anti', 'sq.D', 'm.1'], hide: 'sq.row0', focus: ['sq.anti', 'm.1'] },
      ],
    },
    {
      chapter: 'Part (b): B, C and E',
      layout: 'split',
      leftWidth: 560,
      left: [square({ found: ['A', 'D', 'B', 'C', 'E'], strips: ['col0', 'row1', 'col1'] })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{B} = 21 - 10 - 6 = \\good{5}', '\\text{C} = 21 - 5 - 7 = \\good{9}', '\\text{E} = 21 - 3 - 7 = \\good{11}'] }],
      lines: [
        { say: 'The left column is 10, B and 6, which has one gap. 21 minus 10, minus 6, is 5. So B is 5.', show: ['sq.grid', 'sq.given', 'sq.A', 'sq.D', 'sq.col0', 'sq.B', 'm.0'], focus: ['sq.col0', 'm.0'] },
        { say: 'The middle row is 5, 7 and C. 21 minus 5, minus 7, is 9. So C is 9.', show: ['sq.row1', 'sq.C', 'm.1'], hide: 'sq.col0', focus: ['sq.row1', 'm.1'] },
        { say: 'The middle column is 3, 7 and E. 21 minus 3, minus 7, is 11. So E is 11, and the square is full.', show: ['sq.col1', 'sq.E', 'm.2'], hide: 'sq.row1', focus: ['sq.col1', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [square({ found: ['A', 'B', 'C', 'D', 'E'] })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{bottom: } 6 + 11 + 4 = 21 \\ \\checkmark', '\\text{right: } 8 + 9 + 4 = 21 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the two lines we have not used yet. The bottom row: 6 plus 11 plus 4 is 21.', show: ['sq', 'm.0'] },
        { say: 'The right column: 8 plus 9 plus 4 is 21. All 8 lines add to 21. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Magic sum $13$', 'added the top row, which has a **gap**: use a **complete** line'],
            ['A $= 11$', 'took away only the $10$: take away **both** numbers'],
            ['B $= 4$', 'used the centre $7$: it is **not** in the left column'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A magic sum of 13 adds the top row, 10 plus 3, but that row has a gap. Only a complete line gives the magic sum.' },
        { say: 'A equals 11 takes only the 10 away from 21. Take away both of the numbers you know.' },
        { say: 'And B equals 4 uses the centre, 7. But the centre is not in the left column. Use only the numbers in that line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a $3$ by $3$ magic square, one diagonal is $2$, $6$ and $10$. The top row starts with $2$ and $9$. What number completes the top row?',
          choices: ['$9$', '$7$', '$16$', '$11$'],
          answer: 1,
          working: 'Magic sum: 2 + 6 + 10 = 18. Then 18 − 2 − 9 = 7.',
        },
      ],
      lines: [
        { say: 'Your turn. In a 3 by 3 magic square, one diagonal is 2, 6 and 10. The top row starts with 2 and 9. What number completes the top row? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The diagonal gives the magic sum: 2 plus 6 plus 10 is 18. Then 18 minus 2, minus 9, is 7. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **complete** line gives the magic sum', 'Fill a line with **one gap**', 'Missing $=$ sum $-$ the other two', '**Check** all 8 lines'] }],
      lines: [
        { say: 'Here is what to remember. A complete line gives the magic sum.', show: 'sum.0' },
        { say: 'Then fill a line with only one gap.', show: 'sum.1' },
        { say: 'The missing number is the magic sum, minus the other two.', show: 'sum.2' },
        { say: 'And check all 8 lines at the end. For more on numerical puzzles and games, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
