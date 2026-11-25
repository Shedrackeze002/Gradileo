import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { factorRings } from '@/content/math9/videos/lib/m9-2-figures.ts';
import { tag } from '@/content/math9/videos/lib/m9-1-figures.ts';

// Exam question for Math 9 lesson 2.1 (using exponents to describe numbers). The question is a Try
// It from OpenStax Elementary Algebra 2e, word for word (section 6.2, Use Multiplication Properties
// of Exponents, CC BY-NC-SA 4.0). (a) The brackets make −3 the base: (−3)⁴ = 81. (b) Without
// brackets the base is 3 and the minus sign is outside: −3⁴ = −(3⁴) = −81.

const QUESTION = 'Simplify: (a) (−3)⁴ (b) −3⁴.';

// (−3)⁴ is four rings of −3; −3⁴ is four rings of 3 with the minus sign outside them.
const rings = (id: string) =>
  figure(
    id,
    [
      tag('a-name', [-1.6, 0], '(-3)^4', { place: 'left', tone: 'theta' }),
      factorRings({ name: 'a', groups: [{ id: 'f', values: ['{-3}', '{-3}', '{-3}', '{-3}'], tone: 'opp' }], gap: 1.5, r: 0.62 }),
      tag('a-eq', [5.35, 0], '= 81', { place: 'right' }),
      tag('b-name', [-1.6, -2.4], '-3^4', { place: 'left', tone: 'theta' }),
      tag('b-minus', [-1.05, -2.4], '\\Large -', { tone: 'bad' }),
      shift(factorRings({ name: 'b', groups: [{ id: 'f', values: ['3', '3', '3', '3'], tone: 'adj' }], gap: 1.5, r: 0.62 }), 0, -2.4),
      tag('b-eq', [5.35, -2.4], '= {-81}', { place: 'right' }),
      { points: { room: [-3.8, 0] }, items: [] },
    ],
    360,
  );

const video: Explainer = {
  id: 'xq-m9-2-1',
  lessonId: '',
  exam: {
    lesson: 'm9-2-1',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 6.2, Use Multiplication Properties of Exponents',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents',
    question: QUESTION,
  },
  title: 'Exam Question: (−3)⁴ or −3⁴? (Using Exponents to Describe Numbers)',
  thumbnailTitle: '(−3)⁴ or −3⁴?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify (a) (−3)⁴ and (b) −3⁴. In part a, the brackets make −3 the base, so we multiply four factors of −3 and get 81. In part b, the base is just 3 and the minus sign stays outside, so 3⁴ = 81 and the answer is −81. Then we check by counting negative signs and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '(−3)⁴ or −3⁴?', subtitle: 'Using exponents to describe numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using exponents to describe numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify: (a) $(-3)^4$ (b) $-3^4$.',
          answer: '(a) $81$ (b) $-81$',
          working: '(a) (−3)(−3)(−3)(−3) = 81 (b) −(3 × 3 × 3 × 3) = −81',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify. Part a: negative 3, in brackets, to the power of 4. Part b: negative 3 to the power of 4, with no brackets.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(\\opp{-3})^4: \\text{ the base is } \\opp{-3}', '-\\adj{3}^4: \\text{ the base is } \\adj{3}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Base and exponent', md: 'In a power, the **base** is the factor, and the **exponent** says how many times it is multiplied. The exponent belongs only to what is right before it.' },
      ],
      lines: [
        { say: 'The two powers look almost the same, but they have different bases.', show: 'm.0' },
        { say: 'With brackets, the base is negative 3. Without brackets, the base is just 3.', show: 'm.1' },
        { say: 'In a power, the base is the factor, and the exponent says how many times it is multiplied. The exponent belongs only to what is right before it.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(-)(-) = (+)', '-3^4 = -(3^4)'] }],
      lines: [
        { say: 'Here is what we need. A negative times a negative is a positive.', show: 'm.0' },
        { say: 'And negative 3 to the power of 4, with no brackets, means the opposite of 3 to the power of 4.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **base** of each power', 'Multiply the base **4 times**', 'Put the minus sign in the **right place**'] }],
      lines: [
        { say: 'Here is the plan. Find the base of each power.', show: 'plan.0' },
        { say: 'Multiply the base 4 times.', show: 'plan.1' },
        { say: 'And put the minus sign in the right place.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Four factors',
      layout: 'split',
      leftWidth: 560,
      left: [rings('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(-3)(-3) = 9', '9 \\times 9 = 81', '\\text{(a) } \\good{81}', '\\text{(b) } {-(81)} = \\good{-81}'] }],
      lines: [
        { say: 'Step one, part a. Picture each factor in a ring. The brackets put negative 3 in all four rings.', show: ['st.a-name', 'st.a-f'], focus: 'st.a-f' },
        { say: 'Step two. Multiply in pairs. Negative 3 times negative 3 is positive 9, because a negative times a negative is positive. The other pair is also 9.', show: 'm.0', focus: 'm.0' },
        { say: '9 times 9 is 81. So negative 3, in brackets, to the power of 4 is 81.', show: ['m.1', 'm.2', 'st.a-eq'], focus: ['st.a-eq', 'm.2'] },
        { say: 'Step three, part b. Here each ring holds just 3. The minus sign stays outside the rings.', show: ['st.b-name', 'st.b-f', 'st.b-minus'], focus: 'st.b-minus' },
        { say: 'Four 3s multiply to 81, and then the minus sign makes it negative. The answer is negative 81.', show: ['m.3', 'st.b-eq'], focus: ['st.b-eq', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } 4 \\text{ negative signs: an even number} \\Rightarrow + \\ \\checkmark', '\\text{(b) } 1 \\text{ negative sign} \\Rightarrow - \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting negative signs. In part a, there are 4 negative factors. That is an even number, so the answer is positive.', show: 'm.0', focus: 'm.0' },
        { say: 'In part b, there is just one negative sign, outside. So the answer is negative. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) $81$', 'treated $-3^4$ like $(-3)^4$: no brackets, so the base is $3$'],
            ['(a) $-81$', 'four negatives make a **positive**'],
            ['$-12$', 'multiplied $-3 \\times 4$: an exponent is **repeated** multiplication'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying part b is 81 treats it as if it had brackets. Without brackets, the base is 3, and the minus sign stays outside.' },
        { say: 'Saying part a is negative 81 forgets that an even number of negatives multiply to a positive.' },
        { say: 'And negative 12 multiplies negative 3 by 4. An exponent means repeated multiplication, not multiplying by the exponent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $(-2)^3$.',
          choices: ['$-8$', '$8$', '$-6$', '$6$'],
          answer: 0,
          working: '(−2)(−2)(−2) = 4 × (−2) = −8: three negatives make a negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify negative 2, in brackets, to the power of 3. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative 2 times negative 2 is 4, and 4 times negative 2 is negative 8. Three negatives is an odd number, so the answer is negative. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **base** first', 'Brackets: the **negative** is the base', 'No brackets: the minus is **outside**', 'Even negatives: **positive**'] }],
      lines: [
        { say: 'Here is what to remember. Find the base first.', show: 'sum.0' },
        { say: 'With brackets, the negative number is the base.', show: 'sum.1' },
        { say: 'Without brackets, the minus sign is outside the power.', show: 'sum.2' },
        { say: 'And an even number of negative factors gives a positive. For more on using exponents to describe numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
