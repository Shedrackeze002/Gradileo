import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine } from './lib/m5-5-figures.ts';

// Eighths from 0 to 2, with 3/8, one half (4/8), 7/8, one (8/8) and 11/8 marked.
const eighths = (id: string) =>
  figure(id, [
    fractionLine({
      min: 0,
      max: 2,
      den: 8,
      length: 14,
      points: [
        { id: 'p3', at: 3, tex: '\\dfrac38', tone: 'adj' },
        { id: 'half', at: 4, tex: '\\dfrac12', tone: 'good' },
        { id: 'p7', at: 7, tex: '\\dfrac78', tone: 'adj' },
        { id: 'p11', at: 11, tex: '\\dfrac{11}{8}', tone: 'opp' },
      ],
    }),
  ], 240);

const video: Explainer = {
  id: 'm5-5-1-e',
  lessonId: 'm5-5-1',
  title: 'Improper Fractions and Mixed Numbers, Part 5: Comparing with Benchmarks',
  thumbnailTitle: 'Benchmarks: 0, ½ and 1',
  thumbnail: 'bm',
  summary: 'Comparing fractions with the benchmarks 0, ½ and 1 by looking at the numerator and its own denominator: 4/8 is one half, 8/8 is one and 11/8 is more than one, and 5/12 is less than one half because double 5 is 10, less than 12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 5', title: 'Comparing with Benchmarks', subtitle: 'Zero, one half and one' }],
      lines: [
        { say: 'Is five twelfths more or less than one half? You can tell without drawing anything at all.', show: 'title' },
        { say: 'In this video, you will compare fractions with three friendly numbers: zero, one half and one.' },
      ],
    },
    {
      chapter: 'Benchmarks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is a friendly number that we compare other numbers to. For fractions we use $0$, $\\dfrac{1}{2}$ and $1$.' },
        eighths('bm'),
      ],
      lines: [
        { say: 'A benchmark is a friendly number that we compare other numbers to. For fractions, we use zero, one half and one.', show: 'def' },
        { say: 'On this number line, each whole is cut into eight spaces, so each space is one eighth.', show: 'bm.axis' },
        { say: 'One half is right in the middle between zero and one. That is four spaces from zero, so one half is four eighths.', show: 'bm.half', focus: 'bm.half' },
        { say: 'Three eighths is one space before one half, so it is less than one half. Seven eighths is past one half, and one space before one.', show: ['bm.p3', 'bm.p7'], focus: ['bm.p3', 'bm.p7'] },
        { say: 'And eleven eighths is past one, so it is greater than one.', show: 'bm.p11', focus: 'bm.p11' },
      ],
    },
    {
      chapter: 'Look at the numbers',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Numerator is **half** of the denominator: the fraction is $\\dfrac{1}{2}$, like $\\dfrac{4}{8}$.',
            'Numerator **equals** the denominator: the fraction is $1$, like $\\dfrac{8}{8}$.',
            'Numerator **greater** than the denominator: the fraction is greater than $1$, like $\\dfrac{11}{8}$.',
          ],
        },
      ],
      lines: [
        { say: 'You do not need a number line every time. Just look at the numerator and the denominator.', show: 'b.0' },
        { say: 'If the numerator is half of the denominator, the fraction is one half. Four is half of eight, so four eighths is one half.', focus: 'b.0' },
        { say: 'If the numerator equals the denominator, the fraction is one whole. Eight eighths is one.', show: 'b.1', focus: 'b.1' },
        { say: 'If the numerator is greater than the denominator, the fraction is greater than one. Eleven eighths is greater than one.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Compare with one half',
      layout: 'center',
      main: [
        figure('cmp', [
          bar({ name: 'h', parts: 2, shaded: 1, at: [0, 1.7], width: 12, tone: 'good', label: '\\dfrac12', labelPlace: 'left' }),
          bar({ name: 't', parts: 12, shaded: 5, at: [0, 0], width: 12, tone: 'adj', label: '\\dfrac{5}{12}', labelPlace: 'left' }),
        ], 250),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 5 = 10, \\quad 10 < 12', '\\dfrac{5}{12} < \\dfrac12'] },
      ],
      lines: [
        { say: 'Now the question from the start: is five twelfths greater or less than one half?', show: ['cmp.t-frame', 'cmp.h-frame'] },
        { say: 'Here is a trick. Double the numerator: two times five is ten.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare that with the denominator. Ten is less than twelve. So five is less than half of twelve.', focus: 'm.0' },
        { say: 'So five twelfths is less than one half.', show: 'm.1', focus: 'm.1' },
        { say: 'The bars show it. Half of twelve twelfths is six twelfths, and five twelfths stops one piece before the middle.', show: ['cmp.t-shade', 'cmp.h-shade', 'cmp.t-label', 'cmp.h-label'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Look at both numbers', md: '$\\dfrac{5}{12}$ is not greater than $\\dfrac{1}{2}$ just because $5 > 1$. Always compare the numerator with **its own** denominator.' },
      ],
      lines: [
        { say: 'Watch out. Five twelfths is not greater than one half just because five is greater than one.', show: 'oops' },
        { say: 'The numerators alone do not tell you the size of a fraction. Twelfths are small pieces, and halves are big ones. Always compare a numerator with its own denominator.' },
      ],
    },
    {
      chapter: 'Two more',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{7}{10}: \\; 2 \\times 7 = 14 > 10 \\;\\to\\; \\text{more than } \\dfrac12', '\\dfrac{9}{8}: \\; 9 > 8 \\;\\to\\; \\text{more than } 1'] }],
      lines: [
        { say: 'Let’s try two more. Seven tenths: double the numerator. Two times seven is 14, and 14 is more than ten. So seven tenths is more than one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine eighths: the numerator, nine, is greater than the denominator, eight. So nine eighths is more than one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which fraction is greater than $\\dfrac{1}{2}$ but less than $1$?',
          choices: ['$\\dfrac{3}{8}$', '$\\dfrac{6}{12}$', '$\\dfrac{9}{8}$', '$\\dfrac{5}{6}$'],
          answer: 3,
          working: '$2 \\times 5 = 10$, which is more than $6$, so $\\tfrac{5}{6} > \\tfrac{1}{2}$. And $5 < 6$, so $\\tfrac{5}{6} < 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which fraction is greater than one half, but less than one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, five sixths. Two times five is ten, which is more than six, so five sixths is more than one half. And five is less than six, so it is less than one. Choice B is exactly one half, because six is half of twelve.', show: 'q.answer' },
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
          items: ['A **benchmark** is a friendly number to compare with: $0$, $\\dfrac{1}{2}$ and $1$.', 'Double the numerator to compare with $\\dfrac{1}{2}$.', 'Numerator equal to the denominator: $1$. Greater: more than $1$.', 'Compare a numerator with its own denominator.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A benchmark is a friendly number to compare with. For fractions we use zero, one half and one.', show: 'sum.0' },
        { say: 'To compare with one half, double the numerator and compare it with the denominator.', show: 'sum.1' },
        { say: 'If the numerator equals the denominator, the fraction is one. If it is greater, the fraction is more than one.', show: 'sum.2' },
        { say: 'And always compare a numerator with its own denominator. In the next lesson, we add and subtract fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
