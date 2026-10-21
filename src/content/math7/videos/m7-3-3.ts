import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fractionLine } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Benchmarks 0, 1/2 and 1 on a line cut into tenths, and 7/10 a little past 1/2.
const bench = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 0,
        max: 1,
        den: 10,
        length: 12,
        points: [
          { id: 'half', at: 5, tex: '\\tfrac12', tone: 'good' },
          { id: 'seven', at: 7, tex: '\\tfrac{7}{10}', tone: 'opp', below: true },
        ],
      }),
    ],
    220,
  );

// Kai's walk: 1/2 km, then 7/10 km more, to 1 1/5 km.
const walk = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 0,
        max: 2,
        den: 10,
        length: 13,
        hops: [
          { id: 'bus', from: 0, to: 5, tone: 'adj', label: '\\tfrac12' },
          { id: 'arena', from: 5, to: 12, tone: 'opp', label: '\\tfrac{7}{10}' },
        ],
        points: [{ id: 'end', at: 12, tex: '1\\tfrac15', tone: 'good', below: true }],
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm7-3-3',
  lessonId: 'm7-3-3',
  title: 'Solving Fraction Problems, Part 1: Making a Plan',
  thumbnailTitle: 'Making a Plan',
  thumbnail: 'wk',
  summary:
    'A plan for any fraction problem: read it, decide whether to add (a total) or subtract (what is left, how much more or how much farther), estimate with benchmarks such as 0, 1/2 and 1, calculate with a common denominator, and check. Kai walks 1/2 km and then 7/10 km: about a bit more than 1 km, and exactly 5/10 + 7/10 = 12/10 = 1 1/5 km. "How much farther" asks for a difference, so subtract.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 1', title: 'Making a Plan', subtitle: 'Add or subtract? Estimate, then check' }],
      lines: [
        { say: 'Fractions show up in recipes, trail signs, schedules and gardens. Often the hardest part of a fraction problem is deciding what to do.', show: 'title' },
        { say: 'In this part, you will learn a plan that works for any fraction problem.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Read** the problem. What do you need to find?',
            '**Decide:** add to find a total, or subtract to find what is left or how much more.',
            '**Estimate** the answer with benchmarks.',
            '**Calculate**, using a common denominator.',
            '**Check** that your answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, read the problem carefully. What do you need to find?', show: 'b.0' },
        { say: 'Second, decide what to do. Add to find a total. Subtract to find what is left, or how much more one amount is than another.', show: 'b.1' },
        { say: 'Third, estimate the answer, so you know roughly what to expect.', show: 'b.2' },
        { say: 'Fourth, calculate, using a common denominator.', show: 'b.3' },
        { say: 'And fifth, check that your answer makes sense. Is it close to your estimate?', show: 'b.4' },
      ],
    },
    {
      chapter: 'Benchmarks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is a friendly number, such as $0$, $\\dfrac{1}{2}$ or $1$, that you can use to estimate.' },
        bench('bn'),
      ],
      lines: [
        { say: 'To estimate, use benchmarks. A benchmark is a friendly number, such as zero, one half or one, that you can compare other numbers with.', show: 'def' },
        { say: 'Here is a number line from zero to one, cut into tenths. One half is in the middle, at five tenths.', show: ['bn.axis', 'bn.half'], focus: 'bn.half' },
        { say: 'Where is seven tenths? It is two tenths past one half. So seven tenths is a little more than one half.', show: 'bn.seven', focus: 'bn.seven' },
        { say: 'A fraction like one tenth is close to zero, and nine tenths is close to one. Benchmarks give you a quick idea of how big an answer should be.' },
      ],
    },
    {
      chapter: 'The walk to the arena',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kai walks $\\dfrac{1}{2}$ km to the bus stop. Then Kai walks $\\dfrac{7}{10}$ km from the bus to the arena. How far does Kai walk in all?' },
        walk('wk'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{2} = \\dfrac{5}{10} \\qquad \\dfrac{5}{10} + \\dfrac{7}{10} = \\dfrac{12}{10} = \\dfrac{6}{5} = 1\\dfrac{1}{5}'] },
      ],
      lines: [
        { say: 'Let’s use the plan. Kai walks one half of a kilometre to the bus stop. Then Kai walks seven tenths of a kilometre from the bus to the arena. How far does Kai walk in all?', show: 'q' },
        { say: 'Read and decide. In all means a total, so add.' },
        { say: 'Estimate. One half, plus a bit more than one half, is a bit more than one. So expect a bit more than one kilometre.', show: ['wk.axis', 'wk.bus'], focus: 'wk.bus' },
        { say: 'Calculate. Ten is a multiple of two, so use tenths. One half is five tenths. Five tenths plus seven tenths is twelve tenths.', show: ['wk.arena', 'm.0'], focus: ['wk.arena', 'm.0'] },
        { say: 'Two divides both twelve and ten, so twelve tenths is six fifths. As a mixed number, that is one and one fifth.', show: 'wk.end', focus: 'wk.end' },
        { say: 'Check. One and one fifth is a bit more than one, just as we estimated. So Kai walks one and one fifth kilometres.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'How much more means subtract', md: '"How much farther" or "how much more" asks for a **difference**. Subtract the smaller amount from the larger one. Do not add.' },
        { kind: 'text', id: 'q', size: 'md', md: 'Kai walks $1\\dfrac{1}{5}$ km. Leah walks $\\dfrac{9}{10}$ km. How much farther does Kai walk than Leah?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\dfrac{1}{5} = \\dfrac{12}{10} \\qquad \\dfrac{12}{10} - \\dfrac{9}{10} = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'Watch out for the words in a question. How much farther, or how much more, asks for a difference. So subtract the smaller amount from the larger one. Do not add.', show: 'oops' },
        { say: 'For example, Kai walks one and one fifth kilometres, and Leah walks nine tenths of a kilometre. How much farther does Kai walk than Leah?', show: 'q' },
        { say: 'One and one fifth is twelve tenths. Twelve tenths minus nine tenths is three tenths. So Kai walks three tenths of a kilometre farther.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding would give twenty-one tenths. That is how far they walk together, which is not what the question asked.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A jug holds $\\dfrac{3}{4}$ L of juice. Sam drinks $\\dfrac{1}{3}$ L. How much juice is left?',
          choices: ['$\\dfrac{5}{12}$ L', '$1\\dfrac{1}{12}$ L', '$\\dfrac{1}{6}$ L', '$\\dfrac{1}{2}$ L'],
          answer: 0,
          working: '"Left" means subtract: $\\dfrac{3}{4} - \\dfrac{1}{3} = \\dfrac{9}{12} - \\dfrac{4}{12} = \\dfrac{5}{12}$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A jug holds three quarters of a litre of juice. Sam drinks one third of a litre. How much juice is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, five twelfths of a litre. Left means subtract. Three quarters is nine twelfths, and one third is four twelfths. Nine twelfths minus four twelfths is five twelfths. Choice B adds the amounts, but juice that is drunk is taken away.', show: 'q.answer' },
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
            'Read, decide, estimate, calculate and check.',
            'A total means add. What is left, how much more or how much farther means subtract.',
            'Estimate with benchmarks such as $0$, $\\dfrac{1}{2}$ and $1$.',
            'Check that the answer is close to your estimate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For any fraction problem, read, decide, estimate, calculate and check.', show: 'sum.0' },
        { say: 'A total means add. What is left, how much more, or how much farther means subtract.', show: 'sum.1' },
        { say: 'Estimate with benchmarks such as zero, one half and one.', show: 'sum.2' },
        { say: 'And check that your answer is close to your estimate. In the next part, you will solve problems with mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
