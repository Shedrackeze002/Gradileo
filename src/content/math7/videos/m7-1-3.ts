import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine, strip } from '@/video/numbers.ts';
import { tickLabels } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { tag } from './lib/m7-1-figures.ts';

// The benchmarks 0, 1/2 and 1 on a number line.
const benchmarks = figure('b', [
  numberLine({ min: 0, max: 1, step: 0.5, every: 0, length: 12 }),
  tickLabels({ min: 0, max: 1, length: 12, values: [{ id: 'z', value: 0, tex: '0' }, { id: 'h', value: 0.5, tex: '\\dfrac12' }, { id: 'o', value: 1, tex: '1' }] }),
], 230);

// 3/8 and 4/7 on either side of 1/2.
const halves = figure('n', [
  numberLine({ min: 0, max: 1, step: 0.25, every: 0, length: 12, points: [{ id: 'a', value: 0.375, tex: '\\dfrac38', tone: 'adj' }, { id: 'c', value: 4 / 7, tex: '\\dfrac47', tone: 'opp' }] }),
  tickLabels({ min: 0, max: 1, length: 12, values: [{ id: 'z', value: 0, tex: '0' }, { id: 'h', value: 0.5, tex: '\\dfrac12', tone: 'good' }, { id: 'o', value: 1, tex: '1' }] }),
], 230);

// 7/8 and 9/10 as strips of the same length: the piece missing from 1 is 1/8 or 1/10.
const strips = figure('s', [
  strip({ name: 'a', parts: 8, shaded: 7, width: 10, height: 1.1, at: [0, 0] }),
  strip({ name: 'am', parts: 8, shaded: 1, from: 7, width: 10, height: 1.1, at: [0, 0], tone: 'bad' }),
  tag('a-lab', [-0.4, 0.55], '\\dfrac78', { place: 'left' }),
  tag('a-gap', [10.4, 0.55], '\\bad{\\dfrac18 \\text{ missing}}', { place: 'right' }),
  strip({ name: 'b', parts: 10, shaded: 9, width: 10, height: 1.1, at: [0, -2] }),
  strip({ name: 'bm', parts: 10, shaded: 1, from: 9, width: 10, height: 1.1, at: [0, -2], tone: 'bad' }),
  tag('b-lab', [-0.4, -1.45], '\\dfrac{9}{10}', { place: 'left' }),
  tag('b-gap', [10.4, -1.45], '\\bad{\\dfrac{1}{10} \\text{ missing}}', { place: 'right' }),
], 300);

const video: Explainer = {
  id: 'm7-1-3',
  lessonId: 'm7-1-3',
  title: 'Comparing and Ordering Numbers, Part 1: Benchmarks',
  thumbnailTitle: 'Benchmarks',
  thumbnail: 'n',
  summary:
    'A benchmark is a friendly number to compare with; between 0 and 1, the benchmarks 0, 1/2 and 1 are the most useful. A fraction is less than 1/2 when its numerator is less than half its denominator: 3/8 < 1/2 < 4/7. Close to 1, compare the missing pieces: 7/8 is 1/8 less than 1 and 9/10 is 1/10 less than 1, so 7/8 < 9/10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 1', title: 'Benchmarks', subtitle: 'Compare with zero, one half and one' }],
      lines: [
        { say: 'At a track meet, Kiona jumps two and three eighths metres, and Joon jumps two point four metres. Who jumped farther? The numbers are written in different ways, so it is hard to tell at a glance.', caption: 'At a track meet, Kiona jumps two and three eighths metres, and Jun jumps two point four metres. Who jumped farther? The numbers are written in different ways, so it is hard to tell at a glance.', show: 'title' },
        { say: 'In this lesson, you will compare and order fractions, decimals and whole numbers. This first part uses friendly numbers called benchmarks.' },
      ],
    },
    {
      chapter: 'What a benchmark is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is a friendly number you compare other numbers with. For numbers between $0$ and $1$, the benchmarks $0$, $\\dfrac{1}{2}$ and $1$ are the most useful.' },
        benchmarks,
      ],
      lines: [
        { say: 'A benchmark is a friendly number that you compare other numbers with. It is like a landmark that helps you find your way.', show: 'def' },
        { say: 'For numbers between zero and one, the most useful benchmarks are zero, one half and one.', show: ['b.axis', 'b.ticks'] },
        { say: 'Instead of comparing two fractions with each other, you can ask: is each one less than a half, or more? Is it close to one?' },
      ],
    },
    {
      chapter: 'More or less than one half',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Compare with one half', md: 'A fraction is **less than** $\\dfrac{1}{2}$ when its numerator is less than half of its denominator. It is **more than** $\\dfrac{1}{2}$ when its numerator is more than half.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4}{8} = \\dfrac{1}{2} \\qquad \\dfrac{3}{8} < \\dfrac{1}{2} \\qquad \\dfrac{5}{8} > \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Here is how to compare a fraction with one half. Half of eight is four, so four eighths is exactly one half.', show: 'm' },
        { say: 'Three eighths has fewer than four eighths, so it is less than a half. Five eighths has more, so it is more than a half.' },
        { say: 'So a fraction is less than one half when its numerator is less than half of its denominator. It is more than one half when its numerator is more than half.', show: 'key' },
      ],
    },
    {
      chapter: 'Three eighths or four sevenths?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which is greater, $\\dfrac{3}{8}$ or $\\dfrac{4}{7}$?' },
        halves,
        { kind: 'math', id: 'm', size: 'lg', lines: ['8 \\div 2 = 4, \\quad 3 < 4, \\quad \\text{so } \\dfrac38 < \\dfrac12', '7 \\div 2 = 3.5, \\quad 4 > 3.5, \\quad \\text{so } \\dfrac47 > \\dfrac12'] },
      ],
      lines: [
        { say: 'Which is greater, three eighths or four sevenths? The denominators are different, so compare each one with one half.', show: ['q', 'n.axis', 'n.ticks'] },
        { say: 'Half of eight is four. Three is less than four, so three eighths is less than one half. It sits to the left of the middle.', show: ['m.0', 'n.a'], focus: ['m.0', 'n.a'] },
        { say: 'Half of seven is three and a half. Four is more than three and a half, so four sevenths is more than one half. It sits to the right of the middle.', show: ['m.1', 'n.c'], focus: ['m.1', 'n.c'] },
        { say: 'One is below a half, and the other is above. So three eighths is less than four sevenths.' },
      ],
    },
    {
      chapter: 'Close to one',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which is greater, $\\dfrac{7}{8}$ or $\\dfrac{9}{10}$?' },
        strips,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{10} < \\dfrac{1}{8}, \\quad \\text{so } \\dfrac{7}{8} < \\dfrac{9}{10}'] },
      ],
      lines: [
        { say: 'Which is greater, seven eighths or nine tenths? Both are more than a half. But both are close to one, so compare them with one.', show: 'q' },
        { say: 'Here is seven eighths: a strip cut into eight pieces, with seven shaded. It is one eighth less than a whole.', show: ['s.a-frame', 's.a-shade', 's.a-lab', 's.am-shade', 's.a-gap'], focus: 's.a-gap' },
        { say: 'Nine tenths is a strip cut into ten pieces, with nine shaded. It is one tenth less than a whole.', show: ['s.b-frame', 's.b-shade', 's.b-lab', 's.bm-shade', 's.b-gap'], focus: 's.b-gap' },
        { say: 'One tenth is a smaller piece than one eighth. So nine tenths is missing less, and it is closer to one. Seven eighths is less than nine tenths.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which fraction is **greater** than $\\dfrac{1}{2}$?',
          choices: ['$\\dfrac{4}{9}$', '$\\dfrac{5}{9}$', '$\\dfrac{3}{7}$', '$\\dfrac{6}{13}$'],
          answer: 1,
          working: 'Half of $9$ is $4.5$, and $5 > 4.5$, so $\\dfrac59 > \\dfrac12$. In the others, the numerator is less than half of the denominator.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these fractions is greater than one half? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, five ninths. Half of nine is four and a half, and five is more than that. Choice A, four ninths, is less than one half, because four is less than four and a half.', show: 'q.answer' },
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
            'A **benchmark** is a friendly number to compare with: $0$, $\\dfrac12$ and $1$.',
            'Less than $\\dfrac12$: the numerator is less than half of the denominator.',
            'Close to $1$: compare the missing pieces. $\\dfrac78 < \\dfrac{9}{10}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A benchmark is a friendly number to compare with. Zero, one half and one are the most useful.', show: 'sum.0' },
        { say: 'A fraction is less than one half when its numerator is less than half of its denominator.', show: 'sum.1' },
        { say: 'For fractions close to one, compare the pieces that are missing. In the next part, you will compare decimals using place value. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
