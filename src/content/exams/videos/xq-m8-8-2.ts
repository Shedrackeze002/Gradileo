import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squares } from '@/content/math8/videos/lib/m8-8-figures.ts';

// Exam question for Math 8 lesson 8.2 (nets of three-dimensional objects). The free textbooks we
// use have no question about folding a net into a cube, so Gradileo wrote it in the style of a
// Grade 8 unit test. The net is a column of four squares (1, 2, a, b from the top) with 4 to the
// left of 2 and c to the right. In a straight row of three, the first and third are opposite:
// 1 and a, 2 and b, 4 and c. Opposite faces add to 7, so a = 6, b = 5 and c = 3.

const QUESTION =
  'On a standard die, the numbers on opposite faces add up to 7. The net below folds into a die. [The figure: a column of four squares, which read 1, 2, a and b from the top. There is one more square on each side of the square with 2: the square on its left shows 4, and the square on its right shows c.] Find the numbers a, b and c.';

type Cell = [number, number];
// From the top of the column down, then the square left of 2 and the square right of 2.
const cells: Cell[] = [[1, 3], [1, 2], [1, 1], [1, 0], [0, 2], [2, 2]];
const each = (i: number) => `q${i}`;
const net = (id: string, marks: Record<number, string>, tones: Record<number, DiagramTone> = {}) =>
  figure(id, [squares({ cells, marks, tones, group: each })], 420);

const ASK = { 0: '1', 1: '2', 2: 'a', 3: 'b', 4: '4', 5: 'c' };
const DONE = { 0: '1', 1: '2', 2: '\\good{6}', 3: '\\good{5}', 4: '4', 5: '\\good{3}' };
const PAIRS: Record<number, DiagramTone> = { 0: 'opp', 2: 'opp', 1: 'good', 3: 'good', 4: 'theta', 5: 'theta' };
const all = (id: string) => cells.map((_, i) => `${id}.q${i}`);

const video: Explainer = {
  id: 'xq-m8-8-2',
  lessonId: '',
  exam: {
    lesson: 'm8-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Fold the Net into a Die (Nets of Three-Dimensional Objects)',
  thumbnailTitle: 'Fold the Net into a Die',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: on a standard die, opposite faces add up to 7. A net of a die is a column of four squares, reading 1, 2, a and b from the top, with 4 on the left of 2 and c on its right. Find a, b and c. In a straight row of three squares, the first and the third fold up to be opposite. So a is opposite 1, b is opposite 2 and c is opposite 4: a = 6, b = 5 and c = 3. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fold the Net into a Die', subtitle: 'Nets of three-dimensional objects, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about nets of three-dimensional objects. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'On a standard die, the numbers on **opposite** faces add up to $7$. The net folds into a die. It is a column of four squares, reading $1$, $2$, $a$ and $b$ from the top, with $4$ on the left of $2$ and $c$ on its right. Find $a$, $b$ and $c$.',
          answer: '$a = 6$, $b = 5$, $c = 3$',
          working: 'a is opposite 1, b is opposite 2, c is opposite 4',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'On a standard die, the numbers on opposite faces add up to 7. The net folds into a die.' },
        { say: 'It is a column of four squares, which read 1, 2, "a" and "b" from the top. The square on the left of 2 shows 4, and the square on its right shows "c". Find the numbers "a", "b" and "c".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [net('ask', ASK)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A net', md: 'A **net** is a flat pattern that folds up into a solid. These $6$ squares fold into a cube: a die. Faces that end up **across** from each other are **opposite** faces.' }],
      lines: [
        { say: 'Here is the net. A net is a flat pattern that folds up into a solid. These 6 squares fold into a cube: a die.', show: [...all('ask'), 'c'] },
        { say: 'On the die, faces that end up across from each other are called opposite faces. We need to know which squares end up opposite each other.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{squares that touch in the net: neighbours on the cube}', '\\text{a row of three: the first and third are opposite}', '\\text{opposite faces add to } 7'] }],
      lines: [
        { say: 'Here is what we need. Squares that touch in the net fold up to be next to each other on the cube. They are never opposite.', show: 'm.0' },
        { say: 'In a straight row of three squares, the middle one becomes one face, and the first and the third fold up on either side of it. So they are opposite.', show: 'm.1' },
        { say: 'And on a die, opposite faces add up to 7.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find a **row of three** with each letter in it', 'The letter is **opposite** the other end', 'Subtract from $7$'] }],
      lines: [
        { say: 'Here is the plan. For each letter, find a straight row of three squares with the letter at one end.', show: 'plan.0' },
        { say: 'The letter is opposite the square at the other end.', show: 'plan.1' },
        { say: 'Then subtract that number from 7.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Opposite pairs',
      layout: 'split',
      leftWidth: 520,
      left: [net('st', ASK, PAIRS)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{a} = 7 - 1 = \\good{6}', '\\good{b} = 7 - 2 = \\good{5}', '\\thc{c} = 7 - 4 = \\good{3}'] }],
      lines: [
        { say: 'Here is the net, with each opposite pair in its own colour.', show: all('st') },
        { say: 'Step one. 1, 2 and "a" are a straight row of three. So 1 and "a" are opposite, and "a" is 7 minus 1, which is 6.', show: 'm.0', focus: ['st.q0', 'st.q1', 'st.q2', 'm.0'] },
        { say: 'Step two. 2, "a" and "b" are also a row of three. So 2 and "b" are opposite, and "b" is 7 minus 2, which is 5.', show: 'm.1', focus: ['st.q1', 'st.q2', 'st.q3', 'm.1'] },
        { say: 'Step three. 4, 2 and "c" go across, a row of three. So 4 and "c" are opposite, and "c" is 7 minus 4, which is 3.', show: 'm.2', focus: ['st.q4', 'st.q1', 'st.q5', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 520,
      left: [net('ck', DONE, PAIRS)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 + 6 = 7, \\ 2 + 5 = 7, \\ 4 + 3 = 7', '1, 2, 3, 4, 5, 6 \\text{ once each} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The pairs are 1 and 6, 2 and 5, and 4 and 3. Each pair adds up to 7.', show: [...all('ck'), 'm.0'], focus: 'm.0' },
        { say: 'And the six faces show 1, 2, 3, 4, 5 and 6, each number once, just like a real die. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$a = 5$', '$a$ **touches** $2$, so they are neighbours: $a$ is opposite $1$'],
            ['$b = 6$', 'the two ends of a row of **four** are neighbours: $b$ is opposite $2$'],
            ['$c = 4$', 'opposite faces add to $7$, they are not **equal**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"a" equals 5 pairs "a" with 2. But "a" touches 2 in the net, so they are next to each other on the die. "a" is opposite 1.' },
        { say: '"b" equals 6 pairs "b" with 1, the other end of the column. But in a row of four, the four squares wrap all the way round, so the two ends meet. "b" is opposite 2.' },
        { say: 'And "c" equals 4 copies the number across from it. Opposite faces add up to 7. They are not the same.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A net of a die has a straight row of three squares. The first square shows $5$. What number goes on the **third** square?',
          choices: ['$5$', '$6$', '$4$', '$2$'],
          answer: 3,
          working: 'The first and third squares are opposite, so the third is 7 − 5 = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. A net of a die has a straight row of three squares. The first square shows 5. What number goes on the third square? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The first and the third squares in a row of three are opposite. Opposite faces add up to 7, so the third square shows 7 minus 5, which is 2. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **net** folds up into a solid', 'Squares that **touch** are neighbours', 'In a **row of three**, the ends are opposite', 'On a die, opposite faces add to $7$'] }],
      lines: [
        { say: 'Here is what to remember. A net is a flat pattern that folds up into a solid.', show: 'sum.0' },
        { say: 'Squares that touch in the net are next to each other on the solid.', show: 'sum.1' },
        { say: 'In a straight row of three squares, the first and the third are opposite.', show: 'sum.2' },
        { say: 'And on a die, opposite faces add up to 7. For more on nets of three-dimensional objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
