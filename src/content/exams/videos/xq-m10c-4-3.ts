import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.3 (factoring out the greatest common factor): the area of a
// rectangle whose length is 6 less than its width is w² − 6w. The question is an exercise from
// OpenStax Elementary Algebra 2e, word for word (section 7.1, Greatest Common Factor and Factor by
// Grouping, CC BY-NC-SA 4.0), whose answer key gives w(w − 6): width times length.

/** The rectangle: width w up the side, length w − 6 along the bottom (drawn with w = 14). */
const rect = (height = 300): DiagramEl => ({
  kind: 'diagram',
  id: 'r',
  height,
  points: { A: [0, 0], B: [8, 0], C: [8, 14], D: [0, 14], M: [4, 7] },
  items: [
    { kind: 'region', id: 'area', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.18 },
    { kind: 'line', id: 'len', from: 'A', to: 'B', tone: 'adj', weight: 5, label: 'w - 6', labelSide: 'right' },
    { kind: 'line', id: 'wid', from: 'B', to: 'C', tone: 'opp', weight: 5, label: 'w', labelSide: 'right' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'ink' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'ink' },
    { kind: 'label', id: 'a', at: 'M', tex: 'w^2 - 6w', place: 'center' },
  ],
});
const RECT = ['r', 'r.area', 'r.top', 'r.left', 'r.a'];

const QUESTION =
  'The area of a rectangle with length 6 less than the width is given by the expression w² − 6w, where w = width. Factor the greatest common factor from the polynomial.';

const video: Explainer = {
  id: 'xq-m10c-4-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-3',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 7.1, Greatest Common Factor and Factor by Grouping',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/7-1-greatest-common-factor-and-factor-by-grouping',
    question: QUESTION,
  },
  title: 'Exam Question: Factor the Area w² − 6w. The Greatest Common Factor',
  thumbnailTitle: 'Factor w² − 6w',
  thumbnail: 'r',
  summary:
    'A real test question, solved one small step at a time: a rectangle\'s length is 6 less than its width, and its area is w² − 6w. We find the greatest common factor of the two terms, take it out to get w(w − 6), and see that the factors are the width and the length. Then we check by multiplying back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Factor the Area', subtitle: 'The greatest common factor, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factoring the area of a rectangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'The area of a rectangle with length $6$ less than the width is given by the expression $w^2 - 6w$, where $w$ = width. Factor the greatest common factor from the polynomial.', answer: '$w(w - 6)$', working: 'The GCF of $w^2$ and $6w$ is $w$: $w^2 - 6w = w(w - 6)$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The area of a rectangle with length 6 less than the width is given by the expression w squared minus 6 w, where w is the width. Factor the greatest common factor from the polynomial.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [rect()],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**Factoring** turns a sum back into a **product**: here, width $\\times$ length.' }],
      lines: [
        { say: 'Let us picture it. The rectangle has width w, and its length is 6 less, w minus 6. Its area is w squared minus 6 w.', show: [...RECT, 'r.wid', 'r.len'] },
        { say: 'Factoring turns a sum or difference back into a product. For a rectangle\'s area, that product should be the width times the length.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Greatest common factor (GCF)', md: 'The **largest** expression that divides **every** term. To factor it out, write it in front of a bracket, and divide each term by it inside.' },
        { kind: 'math', id: 'ex', size: 'md', lines: ['6x + 9 = 3(2x + 3)'] },
      ],
      lines: [
        { say: 'Here is what we need. The greatest common factor, or G C F, is the largest expression that divides every term.', show: 'def' },
        { say: 'To factor it out, write it in front of a bracket, and divide each term by it inside. For example, 6 x plus 9 is 3 times 2 x plus 3.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each term as a **product** of factors', 'Find the **GCF**', 'Divide each term by it, and write the **bracket**'] }],
      lines: [
        { say: 'Here is the plan. First, write each term as a product of its factors.', show: 'plan.0' },
        { say: 'Second, find the greatest common factor.', show: 'plan.1' },
        { say: 'Third, divide each term by it, and write the answer with a bracket.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The factors of each term',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['w^2 = \\good{w} \\cdot w', '6w = 2 \\cdot 3 \\cdot \\good{w}', '\\text{GCF} = \\good{w}'] }],
      lines: [
        { say: 'Step one. w squared is w times w.', show: 'm.0' },
        { say: '6 w is 2 times 3 times w.', show: 'm.1' },
        { say: 'The only factor in both is one w. The 2 and the 3 are not in w squared, so the greatest common factor is w.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Factor it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{w^2}{w} = w, \\quad \\dfrac{-6w}{w} = -6', 'w^2 - 6w = \\good{w(w - 6)}'] }],
      lines: [
        { say: 'Step two. Divide each term by w. w squared divided by w is w, and minus 6 w divided by w is minus 6.', show: 'm.0' },
        { say: 'So w squared minus 6 w is w times w minus 6. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [rect()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['w(w - 6) = w^2 - 6w \\ \\checkmark', '\\text{width} \\times \\text{length} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. w times w is w squared, and w times minus 6 is minus 6 w. We are back where we started.', show: [...RECT, 'm.0'] },
        { say: 'And the two factors make sense: w is the width, and w minus 6 is the length. Width times length is the area.', show: ['r.wid', 'r.len', 'm.1'] },
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
            ['$w(w - 6w)$', 'divide **each** term by $w$: $6w \\div w = 6$'],
            ['$w^2(1 - 6w)$', '$w^2$ does not divide $6w$'],
            ['$w(w + 6)$', 'the minus sign stays: $w(w - 6)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing w times w minus 6 w forgets to divide the second term by w. Multiply it back, and you get w squared minus 6 w squared, which is wrong.' },
        { say: 'Taking out w squared does not work, because w squared does not divide 6 w.' },
        { say: 'And keep the sign: it is w minus 6, not w plus 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Factor the greatest common factor from $12x^2 + 8x$.',
          choices: ['$2(6x^2 + 4x)$', '$4(3x^2 + 2x)$', '$x(12x + 8)$', '$4x(3x + 2)$'],
          answer: 3,
          working: '$12x^2 = 2^2 \\cdot 3 \\cdot x \\cdot x$ and $8x = 2^3 \\cdot x$, so the GCF is $4x$: $4x(3x + 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor the greatest common factor from 12 x squared plus 8 x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The numbers 12 and 8 have 4 in common, and both terms have an x. So the G C F is 4 x, and the answer is 4 x times 3 x plus 2, choice D. The other choices took out a common factor, but not the greatest one.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The **GCF** divides every term', 'Take out the **greatest** one: numbers **and** variables', 'Divide **each** term by it inside the bracket', 'Check by **multiplying back**'] }],
      lines: [
        { say: 'Here is what to remember. The greatest common factor divides every term.', show: 'sum.0' },
        { say: 'Take out the greatest one, including both numbers and variables.', show: 'sum.1' },
        { say: 'Divide each term by it inside the bracket.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on factoring, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
