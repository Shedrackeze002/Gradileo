import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from '@/content/math9/videos/lib/m9-3-figures.ts';

// Exam question for Math 9 lesson 3.2 (adding and subtracting rational numbers). The question is a
// Try It from OpenStax Elementary Algebra 2e, word for word (section 1.6, Add and Subtract
// Fractions, CC BY-NC-SA 4.0). Same denominator, so work with the numerators: 5 + (−4) − 7 = −6,
// so the answer is −6/9 = −2/3. On a number line: from 0 up 5/9, back 4/9 to 1/9, back 7/9 to −6/9.

const QUESTION = 'Simplify: 5/9 + (−4/9) − 7/9.';

const N = (k: number) => k / 9;
const line = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1,
        max: 1,
        step: 1 / 9,
        points: [
          { id: 'a', value: N(5), tex: '\\tfrac{5}{9}', tone: 'adj', below: true },
          { id: 'b', value: N(1), tex: '\\tfrac{1}{9}', tone: 'opp', below: true },
          { id: 'c', value: N(-6), tex: '-\\tfrac{6}{9}', tone: 'good', below: true },
        ],
        moves: [
          { id: 'm1', from: 0, to: N(5), tone: 'adj', label: '+\\tfrac{5}{9}', height: 1 },
          { id: 'm2', from: N(5), to: N(1), tone: 'opp', label: '-\\tfrac{4}{9}', height: 1, base: 1.3 },
          { id: 'm3', from: N(1), to: N(-6), tone: 'good', label: '-\\tfrac{7}{9}', height: 1.2, base: 2.6 },
        ],
      }),
    ],
    360,
  );

const video: Explainer = {
  id: 'xq-m9-3-2',
  lessonId: '',
  exam: {
    lesson: 'm9-3-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.6, Add and Subtract Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-6-add-and-subtract-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify 5/9 + (−4/9) − 7/9 (Adding and Subtracting Rational Numbers)',
  thumbnailTitle: 'Simplify 5/9 + (−4/9) − 7/9',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify 5/9 + (−4/9) − 7/9. All three fractions have the same denominator, 9, so we keep the 9 and work with the numerators: 5 + (−4) − 7 = −6. That gives −6/9, which simplifies to −2/3. Then we check on a number line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify 5/9 + (−4/9) − 7/9', subtitle: 'Adding and subtracting rational numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding and subtracting rational numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: $\\dfrac{5}{9} + \\left(-\\dfrac{4}{9}\\right) - \\dfrac{7}{9}$.',
          answer: '$-\\tfrac{2}{3}$',
          working: '(5 − 4 − 7)/9 = −6/9 = −2/3',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: five ninths, plus negative four ninths, minus seven ninths.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{\\adj{9}} + \\left(-\\dfrac{4}{\\adj{9}}\\right) - \\dfrac{7}{\\adj{9}}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: 'To **simplify** means to combine the three numbers into **one** fraction, in **lowest terms**.' },
      ],
      lines: [
        { say: 'Here are the three fractions. Notice that all three have the same denominator, 9.', show: 'm.0' },
        { say: 'To simplify means to combine them into one fraction, in lowest terms.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{c} + \\dfrac{b}{c} = \\dfrac{a + b}{c}', 'a + (-b) = a - b'] }],
      lines: [
        { say: 'Here is what we need. When fractions have the same denominator, add or subtract the numerators, and keep the denominator.', show: 'm.0' },
        { say: 'And adding a negative is the same as subtracting.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Keep the **denominator** $9$', 'Combine the **numerators**, signs and all', 'Write in **lowest terms**'] }],
      lines: [
        { say: 'Here is the plan. Keep the denominator, 9.', show: 'plan.0' },
        { say: 'Combine the numerators, keeping their signs.', show: 'plan.1' },
        { say: 'Then write the answer in lowest terms.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Numerators, then lowest terms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['= \\dfrac{5 + (-4) - 7}{9}', '= \\dfrac{1 - 7}{9} = \\dfrac{-6}{9}', '= -\\dfrac{6 \\div 3}{9 \\div 3} = \\good{-\\dfrac{2}{3}}'] }],
      lines: [
        { say: 'Step one. Keep the denominator 9, and put all the numerators over it: 5, plus negative 4, minus 7.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Work from left to right. 5 plus negative 4 is 1. Then 1 minus 7 is negative 6. That gives negative six ninths.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 6 and 9 are both divisible by 3. 6 divided by 3 is 2, and 9 divided by 3 is 3. The answer is negative two thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 640,
      left: [line('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0 + \\tfrac{5}{9} = \\tfrac{5}{9}', '\\tfrac{5}{9} - \\tfrac{4}{9} = \\tfrac{1}{9}', '\\tfrac{1}{9} - \\tfrac{7}{9} = -\\tfrac{6}{9} = -\\tfrac{2}{3} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a number line from negative 1 to 1, with a tick every ninth.', show: 'st.axis' },
        { say: 'Start at zero, and move five ninths to the right. We land on five ninths.', show: ['st.m1', 'st.a', 'm.0'], focus: ['st.m1', 'm.0'] },
        { say: 'Adding negative four ninths moves 4 ninths to the left. We land on one ninth.', show: ['st.m2', 'st.b', 'm.1'], focus: ['st.m2', 'm.1'] },
        { say: 'Subtracting seven ninths moves 7 ninths further left, past zero, to negative six ninths. That is negative two thirds. It checks out.', show: ['st.m3', 'st.c', 'm.2'], focus: ['st.m3', 'm.2'] },
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
            ['$-\\tfrac{6}{27}$', 'added the denominators: **keep** the $9$'],
            ['$\\tfrac{8}{9}$', 'treated $+(-4)$ as $+4$: adding a negative **subtracts**'],
            ['$-\\tfrac{6}{9}$', 'right, but not in **lowest terms**: divide by $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 6 over 27 adds the denominators. When the denominators are the same, keep the 9.' },
        { say: 'Eight ninths treats plus negative 4 as plus 4. Adding a negative means subtracting.' },
        { say: 'And negative six ninths is correct, but it is not in lowest terms. Divide the top and bottom by 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $-\\dfrac{2}{9} + \\left(-\\dfrac{4}{9}\\right) - \\dfrac{7}{9}$.',
          choices: ['$-\\tfrac{1}{9}$', '$\\tfrac{1}{9}$', '$-\\tfrac{13}{27}$', '$-\\tfrac{13}{9}$'],
          answer: 3,
          working: '(−2 − 4 − 7)/9 = −13/9.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify negative two ninths, plus negative four ninths, minus seven ninths. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Keep the 9 and combine the numerators: negative 2, minus 4, minus 7 is negative 13. Negative 13 ninths. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same denominator: **keep** it', 'Combine the **numerators**, signs and all', 'Adding a negative **subtracts**', 'Write in **lowest terms**'] }],
      lines: [
        { say: 'Here is what to remember. When the denominators are the same, keep the denominator.', show: 'sum.0' },
        { say: 'Combine the numerators, keeping their signs.', show: 'sum.1' },
        { say: 'Adding a negative is the same as subtracting.', show: 'sum.2' },
        { say: 'And write the answer in lowest terms. For more on adding and subtracting rational numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
