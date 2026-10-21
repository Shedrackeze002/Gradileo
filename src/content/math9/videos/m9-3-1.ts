import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// The number line from −2 to 2 in quarters, with −3/4 marked.
const quarter = (id: string) =>
  figure(id, [ratLine({ min: -2, max: 2, step: 0.25, points: [{ id: 'q', value: -0.75, tex: '-\\tfrac{3}{4}', tone: 'opp' }] })], 250);

// Opposites: −1.5 and 1.5, each 1.5 from zero, on opposite sides.
const opposites = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -2,
        max: 2,
        step: 0.25,
        points: [
          { id: 'b', value: -1.5, tex: '-1.5', tone: 'opp', below: true },
          { id: 'c', value: 1.5, tex: '1.5', tone: 'adj', below: true },
        ],
        moves: [
          { id: 'm1', from: 0, to: -1.5, tone: 'opp', label: '1.5\\text{ units}' },
          { id: 'm2', from: 0, to: 1.5, tone: 'adj', label: '1.5\\text{ units}' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-1',
  lessonId: 'm9-3-1',
  title: 'Comparing and Ordering Rational Numbers, Part 1: What Is a Rational Number?',
  thumbnailTitle: 'What Is a Rational Number?',
  thumbnail: 'op',
  summary:
    'A rational number is any number that can be written as one integer over another, with a bottom that is not zero. Integers, fractions, mixed numbers, and terminating and repeating decimals are all rational: −2 1/3 = −7/3, −1.25 = −5/4, 0.666… = 2/3 and −4 = −4/1. A negative fraction has one negative sign, in front, on top or on the bottom: −3/4 = (−3)/4 = 3/(−4). Opposites, like −1.5 and 1.5, are the same distance from zero on opposite sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 1', title: 'What Is a Rational Number?', subtitle: 'Fractions, decimals and integers, positive and negative' }],
      lines: [
        { say: 'On a winter morning, it is negative twelve point five degrees in one town, and negative twelve and one quarter degrees in the next town. Which town is colder? Numbers like these are called rational numbers.', show: 'title' },
        { say: 'In this part, you will learn what a rational number is, see the different ways to write one, and meet opposites on the number line.' },
      ],
    },
    {
      chapter: 'One integer over another',
      layout: 'center',
      main: [
        { kind: 'text', id: 'ints', size: 'md', md: '**Integers:** $\\ldots,\\ -3,\\ -2,\\ -1,\\ 0,\\ 1,\\ 2,\\ 3,\\ \\ldots$' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational number', md: 'A **rational number** is any number that can be written as one integer over another integer, $\\dfrac{\\text{integer}}{\\text{integer}}$, as long as the bottom is not $0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} \\qquad \\dfrac{-5}{2} \\qquad \\dfrac{7}{-8}'] },
      ],
      lines: [
        { say: 'First, a reminder. The integers are the whole numbers, their opposites, and zero: negative three, negative two, negative one, zero, one, two, three, and so on.', show: 'ints' },
        { say: 'A rational number is any number you can write as one integer over another integer, as long as the bottom is not zero.', show: 'def' },
        { say: 'Three over four is rational. So are negative five over two, and seven over negative eight. The top and the bottom can be positive or negative.', show: 'm.0', focus: 'm.0' },
        { say: 'Why can the bottom not be zero? A fraction bar means divide, and you cannot divide by zero. There is no way to share something into zero groups.' },
      ],
    },
    {
      chapter: 'Many kinds of rational numbers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of number', 'Example', 'Integer over integer'],
          rows: [
            ['Fraction', '$-\\dfrac{3}{4}$', '$\\dfrac{-3}{4}$'],
            ['Mixed number', '$-2\\tfrac{1}{3}$', '$\\dfrac{-7}{3}$'],
            ['Terminating decimal', '$-1.25$', '$\\dfrac{-5}{4}$'],
            ['Repeating decimal', '$0.\\overline{6} = 0.666\\ldots$', '$\\dfrac{2}{3}$'],
            ['Integer', '$-4$', '$\\dfrac{-4}{1}$'],
          ],
        },
      ],
      lines: [
        { say: 'Lots of numbers you already know are rational. A fraction like negative three quarters is already one integer over another: negative three over four.', show: 't.0', focus: 't.0' },
        { say: 'A mixed number, like negative two and one third, is also rational. Two and one third is seven thirds, so negative two and one third is negative seven over three.', show: 't.1', focus: 't.1' },
        { say: 'A decimal that stops, like negative one point two five, is called a terminating decimal. That is negative one and one quarter, which is negative five over four.', show: 't.2', focus: 't.2' },
        { say: 'A decimal that repeats forever, like zero point six six six and so on, is a repeating decimal. The bar over the six means it repeats. It equals two thirds.', show: 't.3', focus: 't.3' },
        { say: 'Even integers are rational. Negative four is negative four over one.', show: 't.4', focus: 't.4' },
        { say: 'So every integer, fraction, mixed number, terminating decimal and repeating decimal is a rational number.', focus: 't' },
      ],
    },
    {
      chapter: 'Where the negative sign goes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Three ways to write a negative fraction', md: 'The negative sign can sit in front, on the top, or on the bottom: $-\\dfrac{3}{4} = \\dfrac{-3}{4} = \\dfrac{3}{-4}$' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-3 \\div 4 = -0.75 \\qquad 3 \\div (-4) = -0.75'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'One negative sign, not two', md: 'With a negative sign on the top **and** on the bottom, the signs are the same, so the fraction is positive: $\\dfrac{-3}{-4} = \\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'A negative fraction can be written in three ways. The negative sign can sit in front of the fraction, on the top, or on the bottom. All three mean the same number.', show: 'key' },
        { say: 'Here is why. A fraction bar means divide. Negative three divided by four is negative zero point seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'Three divided by negative four is also negative zero point seven five, because a quotient with different signs is negative. So both fractions equal negative three quarters.' },
        { say: 'Watch out, though. Use only one negative sign. If the top and the bottom are both negative, the signs are the same, so the fraction is positive. Negative three over negative four is positive three quarters.', show: 'oops' },
      ],
    },
    {
      chapter: 'On the number line',
      layout: 'center',
      main: [quarter('nl')],
      lines: [
        { say: 'Rational numbers have a place on the number line, just like integers. On this line, each small mark is one quarter.', show: 'nl.axis' },
        { say: 'Negative three quarters is three marks to the left of zero, between negative one and zero.', show: 'nl.q', focus: 'nl.q' },
        { say: 'Every rational number has its own point on the line, even the ones between the marks.' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        opposites('op'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposites', md: 'Two numbers are **opposites** if they are the same distance from $0$ on a number line, but on opposite sides.' },
      ],
      lines: [
        { say: 'Now look at negative one point five and one point five.', show: ['op.axis', 'op.b', 'op.c'] },
        { say: 'Each one is one and a half units from zero. Negative one point five is to the left of zero, and one point five is to the right.', show: ['op.m1', 'op.m2'], focus: ['op.m1', 'op.m2'] },
        { say: 'Numbers like these are called opposites. Opposites are the same distance from zero, but on opposite sides of it.', show: 'def' },
        { say: 'Every rational number has an opposite. The opposite of negative three quarters is three quarters, and the opposite of zero is zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is equal to $-\\dfrac{2}{5}$?',
          choices: ['$\\dfrac{-2}{-5}$', '$\\dfrac{2}{-5}$', '$-\\dfrac{5}{2}$', '$\\dfrac{2}{5}$'],
          answer: 1,
          working: 'The negative sign can sit on the bottom: $\\dfrac{2}{-5} = -\\dfrac{2}{5}$. With two negative signs, $\\dfrac{-2}{-5} = \\dfrac{2}{5}$ is positive.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is equal to negative two fifths? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two over negative five. The negative sign can sit on the bottom. Choice A has two negative signs, so it equals positive two fifths.', show: 'q.answer' },
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
            'A **rational number** can be written as one integer over another, with a bottom that is not $0$.',
            'Integers, fractions, mixed numbers, and terminating and repeating decimals are all rational.',
            '$-\\dfrac{3}{4} = \\dfrac{-3}{4} = \\dfrac{3}{-4}$: one negative sign, in one of three places.',
            '**Opposites**, like $-1.5$ and $1.5$, are the same distance from $0$, on opposite sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rational number can be written as one integer over another, with a bottom that is not zero.', show: 'sum.0' },
        { say: 'Integers, fractions, mixed numbers, and terminating and repeating decimals are all rational numbers.', show: 'sum.1' },
        { say: 'A negative fraction has one negative sign, in front, on the top, or on the bottom.', show: 'sum.2' },
        { say: 'And opposites are the same distance from zero, on opposite sides. In the next part, you will compare rational numbers, and find out which town was colder. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
