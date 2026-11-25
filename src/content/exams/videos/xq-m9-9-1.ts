import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { axes, caption, join, place, RECT, regular, shape } from '@/content/math9/videos/lib/m9-9-figures.ts';

// Exam question for Math 9 lesson 9.1 (line symmetry). The free textbooks we use have no question
// like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test. A regular
// polygon with n sides has n lines of symmetry: square 4, equilateral triangle 3, regular hexagon
// 6. A rectangle that is not a square is not regular: only its 2 middle lines work, not its
// diagonals.

const QUESTION =
  'How many lines of symmetry does each shape have? (a) a square (b) a rectangle that is not a square (c) an equilateral triangle (d) a regular hexagon';

const R = 1.8;
const L = 2.45;
const SQ = regular(4, R, 45);
const TRI = regular(3, R, 90);
const HEX = regular(6, R, 90);
const X = [0, 7, 14, 21];

const four = (id: string, counts: boolean) =>
  figure(
    id,
    [
      join(
        shape({ name: 'sq', pieces: [place(SQ, X[0], 0)], tone: 'opp' }),
        axes({ name: 'sq', id: 'l', c: [X[0], 0], r: L, angles: [0, 90, 45, 135] }),
        caption({ name: 'sq', id: 'cap', at: [X[0], -3], tex: counts ? '\\text{(a) square: } 4' : '\\text{(a) square}' }),
        shape({ name: 're', pieces: [place(RECT, X[1], 0, 0.75)], tone: 'brand' }),
        axes({ name: 're', id: 'l', c: [X[1], 0], r: 2.9, angles: [0] }),
        axes({ name: 're', id: 'm', c: [X[1], 0], r: 1.85, angles: [90] }),
        caption({ name: 're', id: 'cap', at: [X[1], -3], tex: counts ? '\\text{(b) rectangle: } 2' : '\\text{(b) rectangle}' }),
        shape({ name: 'tr', pieces: [place(TRI, X[2], 0)], tone: 'adj' }),
        axes({ name: 'tr', id: 'l', c: [X[2], 0], r: L, angles: [90, 210, 330] }),
        caption({ name: 'tr', id: 'cap', at: [X[2], -3], tex: counts ? '\\text{(c) triangle: } 3' : '\\text{(c) triangle}' }),
        shape({ name: 'hx', pieces: [place(HEX, X[3], 0)], tone: 'hyp' }),
        axes({ name: 'hx', id: 'l', c: [X[3], 0], r: L, angles: [90, 150, 210, 0, 60, 120] }),
        caption({ name: 'hx', id: 'cap', at: [X[3], -3], tex: counts ? '\\text{(d) hexagon: } 6' : '\\text{(d) hexagon}' }),
      ),
    ],
    360,
  );

const shapes = (id: string) => ['sq', 're', 'tr', 'hx'].flatMap((s) => [`${id}.${s}-shape`, `${id}.${s}-cap`]);

const video: Explainer = {
  id: 'xq-m9-9-1',
  lessonId: '',
  exam: {
    lesson: 'm9-9-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Count the Lines of Symmetry (Line Symmetry)',
  thumbnailTitle: 'Count the Lines of Symmetry',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: how many lines of symmetry does each shape have? (a) a square (b) a rectangle that is not a square (c) an equilateral triangle (d) a regular hexagon. A line of symmetry folds a shape onto itself. A regular polygon with n sides has n lines of symmetry, so the square has 4, the equilateral triangle 3 and the regular hexagon 6. A rectangle is not regular: its two middle lines work, but its diagonals do not, so it has 2. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Count the Lines of Symmetry', subtitle: 'Line symmetry, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about line symmetry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'How many lines of symmetry does each shape have? (a) a square (b) a rectangle that is not a square (c) an equilateral triangle (d) a regular hexagon',
          answer: '(a) $4$ (b) $2$ (c) $3$ (d) $6$',
          working: 'regular: as many lines as sides',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'How many lines of symmetry does each shape have? Part a: a square. Part b: a rectangle that is not a square. Part c: an equilateral triangle. Part d: a regular hexagon.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [four('ask', false), { kind: 'callout', id: 'c', tone: 'definition', title: 'Line of symmetry', md: 'A **line of symmetry** folds a shape so that the two halves match **exactly**.' }],
      lines: [
        { say: 'Here are the four shapes.', show: shapes('ask') },
        { say: 'A line of symmetry is a fold line: fold the shape along it, and the two halves match exactly. We count the fold lines for each shape.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{regular polygon, } n \\text{ sides: } n \\text{ lines}', '\\text{not regular: test each fold}'] }],
      lines: [
        { say: 'Here is what we need. A regular polygon has all sides equal and all angles equal. A regular polygon with "n" sides has "n" lines of symmetry.', show: 'm.0' },
        { say: 'A shape that is not regular, like a rectangle, does not follow the rule. Test each fold line on its own.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Is the shape **regular**?', 'If so, lines $=$ **sides**', 'If not, **test** each fold'] }],
      lines: [
        { say: 'Here is the plan. Ask: is the shape regular?', show: 'plan.0' },
        { say: 'If it is, the number of lines is the number of sides.', show: 'plan.1' },
        { say: 'If it is not, test each fold line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 4: One shape at a time',
      layout: 'center',
      main: [four('st', true)],
      lines: [
        { say: 'Here are the four shapes again.', show: ['st.sq-shape', 'st.re-shape', 'st.tr-shape', 'st.hx-shape'] },
        { say: 'Step one, the square. It is regular, with 4 sides. Two lines go through the middles of opposite sides, and two go through opposite corners. 4 lines.', show: ['st.sq-l', 'st.sq-cap'], focus: ['st.sq-l', 'st.sq-cap'] },
        { say: 'Step two, the rectangle. It is not regular. The fold across the middle works, and so does the fold down the middle. But a diagonal fold does not: the corners miss each other. 2 lines.', show: ['st.re-l', 'st.re-m', 'st.re-cap'], focus: ['st.re-l', 'st.re-m', 'st.re-cap'] },
        { say: 'Step three, the equilateral triangle. It is regular, with 3 sides. Each line goes from a corner to the middle of the opposite side. 3 lines.', show: ['st.tr-l', 'st.tr-cap'], focus: ['st.tr-l', 'st.tr-cap'] },
        { say: 'Step four, the regular hexagon. It has 6 sides. Three lines go through opposite corners, and three through the middles of opposite sides. 6 lines.', show: ['st.hx-l', 'st.hx-cap'], focus: ['st.hx-l', 'st.hx-cap'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{square } 4,\\ \\text{triangle } 3,\\ \\text{hexagon } 6 \\ \\checkmark', '\\text{rectangle: } 2 < 4 \\text{ sides} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. For the three regular shapes, the lines match the sides: 4 for the square, 3 for the triangle, 6 for the hexagon.', show: 'm.0', focus: 'm.0' },
        { say: 'And the rectangle has fewer lines than sides, as a shape that is not regular can. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['rectangle: $4$', 'counted the **diagonals**: a diagonal fold does not match'],
            ['square: $2$', 'forgot the **diagonals**: for a square they do match'],
            ['hexagon: $3$', 'counted only lines through **corners**, not through sides'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 for the rectangle counts the diagonals. Fold a rectangle along a diagonal, and the corners do not land on each other.' },
        { say: '2 for the square forgets the diagonals. A square has equal sides, so its diagonal folds do match.' },
        { say: 'And 3 for the hexagon counts only the lines through corners. The lines through the middles of opposite sides count too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many lines of symmetry does a regular pentagon have?',
          choices: ['$1$', '$10$', '$5$', '$2$'],
          answer: 2,
          working: 'A regular polygon with 5 sides has 5 lines of symmetry.',
        },
      ],
      lines: [
        { say: 'Your turn. How many lines of symmetry does a regular pentagon have? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A regular pentagon has 5 equal sides, so it has 5 lines of symmetry, one from each corner to the middle of the opposite side. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line of symmetry is a **fold** that matches', 'Regular polygon: lines $=$ **sides**', 'Not regular: **test** each fold', 'A rectangle\'s diagonals do **not** work'] }],
      lines: [
        { say: 'Here is what to remember. A line of symmetry is a fold where the two halves match.', show: 'sum.0' },
        { say: 'A regular polygon has as many lines of symmetry as sides.', show: 'sum.1' },
        { say: 'For a shape that is not regular, test each fold.', show: 'sum.2' },
        { say: 'And a rectangle\'s diagonals are not lines of symmetry. For more on line symmetry, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
