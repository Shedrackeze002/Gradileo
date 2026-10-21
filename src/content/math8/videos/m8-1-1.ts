import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { powerParts } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { tileSquare } from './lib/m8-1-figures.ts';

// 16 tiles make a 4 by 4 square.
const sixteen = figure('t', [tileSquare({ cols: 4, labels: { left: '4', bottom: '4', caption: '4 \\times 4 = 16' } })], 470);

// The first five perfect squares as squares of tiles: 1, 4, 9, 16 and 25.
const stairs = figure(
  'st',
  [1, 2, 3, 4, 5].map((k, i) => tileSquare({ name: `s${k}`, cols: k, at: [[0, 1.8, 4.6, 8.4, 13.2][i], 0], labels: { caption: `${k * k}` } })),
  300,
);

// 20 tiles: a 4 by 4 square leaves 4 over, a 5 by 5 square is 5 short, and a 4 by 5 rectangle works.
const twenty = figure(
  'tw',
  [
    tileSquare({ name: 'a', cols: 4, extra: 4, at: [0, 0], labels: { caption: '\\text{4 left over}' }, captionY: -1.5 }),
    tileSquare({ name: 'b', cols: 5, filled: 20, at: [6.2, 0], labels: { caption: '\\text{5 places empty}' }, captionY: -1.5 }),
    tileSquare({ name: 'c', cols: 5, rows: 4, at: [13.4, 0], tone: 'good', labels: { caption: '\\text{a rectangle}' }, captionY: -1.5 }),
  ],
  330,
);

const video: Explainer = {
  id: 'm8-1-1',
  lessonId: 'm8-1-1',
  title: 'Perfect Squares and Square Roots, Part 1: Perfect Squares',
  thumbnailTitle: 'Perfect Squares',
  thumbnail: 't',
  summary:
    'A perfect square is a whole number you get by multiplying a whole number by itself: 16 tiles make a 4 by 4 square, because 4 × 4 = 16. We write 4 × 4 as 4² and say “four squared”. The first twelve perfect squares are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121 and 144. 20 is not a perfect square: it is between 16 and 25. Squaring is not doubling: 4² = 16, not 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 1', title: 'Perfect Squares', subtitle: 'Numbers that make a square' }],
      lines: [
        { say: 'A checkerboard has eight rows of eight squares. That makes sixty-four squares in all, set out in a perfect square shape.', show: 'title' },
        { say: 'Numbers like sixty-four show up when you tile a floor, plant a square garden or set out chairs in equal rows. In this lesson, you will meet these numbers, and learn how to undo squaring with a square root. This first part is about perfect squares.' },
      ],
    },
    {
      chapter: 'Sixteen tiles',
      layout: 'split',
      leftWidth: 480,
      left: [sixteen],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perfect square', md: 'A **perfect square** is a whole number you get by multiplying a whole number by itself. $16$ is a perfect square, because $16 = 4 \\times 4$.' },
      ],
      lines: [
        { say: 'Imagine you have sixteen square tiles. Can you set them out in a solid square, with no gaps and no tiles left over?', show: 't.tiles' },
        { say: 'Yes! Four rows of four tiles make a square. There are four tiles along each side.', show: ['t.left', 't.bottom'], focus: ['t.left', 't.bottom'] },
        { say: 'Four times four is sixteen. So sixteen tiles make a four by four square.', show: 't.caption', focus: 't.caption' },
        { say: 'A number like sixteen is called a perfect square. A perfect square is a whole number you get by multiplying a whole number by itself.', show: 'def' },
      ],
    },
    {
      chapter: 'Four squared',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pw', [powerParts({ base: '4', exp: '2' })], 300)],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4^2 = 4 \\times 4 = 16', '7^2 = 7 \\times 7 = 49', '10^2 = 10 \\times 10 = 100'] }],
      lines: [
        { say: 'There is a short way to write four times four. Write a four, with a small two up high on its right. We say four squared.', show: 'pw.power' },
        { say: 'The four is called the base. The small two is called the exponent. It tells you how many fours to multiply together.', show: ['pw.base', 'pw.exp'] },
        { say: 'So four squared means four times four, which is sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, seven squared is seven times seven, which is forty-nine. And ten squared is ten times ten, which is one hundred.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'We call it squared because of the picture. A number squared is the area of a square with that side length, just like our four by four square of tiles.' },
      ],
    },
    {
      chapter: 'The first twelve',
      layout: 'center',
      main: [stairs, { kind: 'math', id: 'm', size: 'lg', lines: ['1,\\ 4,\\ 9,\\ 16,\\ 25,\\ 36,\\ 49,\\ 64,\\ 81,\\ 100,\\ 121,\\ 144'] }],
      lines: [
        { say: 'Let’s build the first few perfect squares. One times one is one. Two times two is four. Three times three is nine.', show: ['st.s1-tiles', 'st.s1-caption', 'st.s2-tiles', 'st.s2-caption', 'st.s3-tiles', 'st.s3-caption'] },
        { say: 'Four times four is sixteen, and five times five is twenty-five. Each square is one tile wider and one tile taller than the one before it.', show: ['st.s4-tiles', 'st.s4-caption', 'st.s5-tiles', 'st.s5-caption'] },
        { say: 'Here are the first twelve perfect squares. They go all the way up to twelve times twelve, which is one hundred forty-four.', show: 'm', focus: 'm' },
        { say: 'These twelve numbers are worth knowing by heart. You will use them again and again.' },
      ],
    },
    {
      chapter: 'Is 20 a perfect square?',
      layout: 'center',
      main: [twenty, { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$16 < 20 < 25$, so $20$ is **not** a perfect square.' }],
      lines: [
        { say: 'Is twenty a perfect square? Let’s try to set out twenty tiles in a solid square.' },
        { say: 'A four by four square uses sixteen tiles. That leaves four tiles over, so a four by four square is not big enough.', show: ['tw.a-tiles', 'tw.a-extra', 'tw.a-caption'], focus: 'tw.a-extra' },
        { say: 'A five by five square needs twenty-five tiles. With only twenty, five places stay empty. So a five by five square is more than we need.', show: ['tw.b-tiles', 'tw.b-holes', 'tw.b-caption'], focus: 'tw.b-holes' },
        { say: 'Twenty tiles can make a rectangle, four rows of five. But a rectangle is not a square.', show: ['tw.c-tiles', 'tw.c-caption'] },
        { say: 'Twenty is between sixteen and twenty-five, the perfect squares on either side of it. No whole number times itself makes twenty, so twenty is not a perfect square.', show: 'a' },
      ],
    },
    {
      chapter: 'Squaring is not doubling',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squaring is not doubling', md: '$4^2$ means $4 \\times 4 = 16$. It does **not** mean $4 \\times 2 = 8$. The small $2$ tells you how many times to use $4$ as a factor.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4^2 = 4 \\times 4 = 16 \\ \\good{\\checkmark}', '4^2 \\ne 4 \\times 2'] },
      ],
      lines: [
        { say: 'Here is a mistake that many people make. Four squared does not mean four times two.', show: 'oops' },
        { say: 'The small two tells you how many times to use four as a factor. So four squared is four times four, which is sixteen, not eight.', show: 'm', focus: 'm.0' },
        { say: 'Picture the tiles. A four by four square has sixteen tiles, not eight.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is a perfect square?',
          choices: ['$50$', '$81$', '$18$', '$40$'],
          answer: 1,
          working: '$9 \\times 9 = 81$, so $81$ is a perfect square. $50$ is between $49$ and $64$, $40$ is between $36$ and $49$, and $18$ is between $16$ and $25$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is a perfect square? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Eighty-one is a perfect square, because nine times nine is eighty-one. Choice C, eighteen, is nine times two. That is doubling nine, not squaring it, and eighteen is not a perfect square.', show: 'q.answer' },
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
            'A **perfect square** is a whole number times itself: $16 = 4 \\times 4$.',
            '$4^2$ means $4 \\times 4$. We say “four squared”.',
            'The first twelve: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$.',
            'Squaring is not doubling: $4^2 = 16$, not $8$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A perfect square is a whole number times itself, like sixteen, which is four times four.', show: 'sum.0' },
        { say: 'Four squared means four times four.', show: 'sum.1' },
        { say: 'Learn the first twelve perfect squares, from one up to one hundred forty-four.', show: 'sum.2' },
        { say: 'And remember that squaring is not doubling. In the next part, you will learn how to undo squaring with a square root. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
