import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.6 (rational exponents): a flare dropped from 1024 feet; the
// time to fall is 1024^(1/2) ÷ 16^(1/2) seconds. The question is an exercise from OpenStax
// Elementary Algebra 2e, word for word (section 9.8, Rational Exponents, CC BY-NC-SA 4.0), whose
// answer key gives 8 seconds: 1024^(1/2) = 32 and 16^(1/2) = 4, so 32 ÷ 4 = 8. The book writes it
// as a fraction with exponents; the plain text writes 1024^(1/2) / 16^(1/2).

const QUESTION =
  'An airplane dropped a flare from a height of 1024 feet above a lake. Simplify 1024^(1/2) / 16^(1/2) to find how many seconds it took for the flare to reach the water.';

const video: Explainer = {
  id: 'xq-m10c-3-6',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-6',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 9.8, Rational Exponents',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-8-rational-exponents',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Does the Flare Fall? Rational Exponents',
  thumbnailTitle: 'How Long Does the Flare Fall?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a flare is dropped from 1024 feet, and the time it takes to fall is 1024^(1/2) ÷ 16^(1/2) seconds. We learn that an exponent of one half means a square root, find both roots, and divide to get 8 seconds. Then we check it another way and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Does the Flare Fall?', subtitle: 'Rational exponents, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a falling flare, with exponents that are fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'An airplane dropped a flare from a height of $1024$ feet above a lake. Simplify $\\dfrac{1024^{\\frac{1}{2}}}{16^{\\frac{1}{2}}}$ to find how many seconds it took for the flare to reach the water.',
          answer: '8 seconds',
          working: '$1024^{\\frac{1}{2}} = \\sqrt{1024} = 32$ and $16^{\\frac{1}{2}} = \\sqrt{16} = 4$, so $\\dfrac{32}{4} = 8$ s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the gravity exercises.', show: 'q' },
        { say: 'An airplane dropped a flare from a height of 1,024 feet above a lake. Simplify 1,024 to the power of one half, over 16 to the power of one half, to find how many seconds it took for the flare to reach the water.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'lg', lines: ['t = \\dfrac{1024^{\\frac{1}{2}}}{16^{\\frac{1}{2}}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Physics gives us the formula: we only have to **work out the number**. The exponents are **fractions**.' },
      ],
      lines: [
        { say: 'The time to fall has already been turned into a formula for us. We just have to work out this number.', show: 'e' },
        { say: 'The new part is the exponent: one half. An exponent that is a fraction is called a rational exponent.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['a^{\\frac{1}{2}} = \\sqrt{a}', 'a^{\\frac{1}{n}} = \\sqrt[n]{a}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Why: $a^{\\frac{1}{2}} \\times a^{\\frac{1}{2}} = a^{\\frac{1}{2} + \\frac{1}{2}} = a^{1} = a$, so $a^{\\frac{1}{2}}$ is the number that **times itself** gives $a$.' },
      ],
      lines: [
        { say: 'Here is what we need. A power of one half means a square root.', show: 'f.0' },
        { say: 'And in general, a power of one over n means the n-th root.', show: 'f.1' },
        { say: 'Here is why. Multiply \"a\" to the one half by itself, and the exponent laws add the exponents: one half plus one half is 1. So \"a\" to the one half is the number that times itself gives \"a\". That is the square root.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each power of $\\frac{1}{2}$ as a **square root**', 'Find the **roots**', '**Divide**'] }],
      lines: [
        { say: 'Here is the plan. First, write each power of one half as a square root.', show: 'plan.0' },
        { say: 'Second, find the square roots.', show: 'plan.1' },
        { say: 'Third, divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1024^{\\frac{1}{2}} = \\sqrt{1024} = 32 \\quad (32 \\times 32 = 1024)', '16^{\\frac{1}{2}} = \\sqrt{16} = 4 \\quad (4 \\times 4 = 16)'] }],
      lines: [
        { say: 'Step one. 1,024 to the one half is the square root of 1,024. 32 times 32 is 1,024, so it is 32.', show: 'm.0' },
        { say: 'And 16 to the one half is the square root of 16, which is 4.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = \\dfrac{32}{4} = \\good{8\\text{ seconds}}'] }],
      lines: [{ say: 'Step two. 32 divided by 4 is 8. The flare took 8 seconds to reach the water.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1024^{\\frac{1}{2}}}{16^{\\frac{1}{2}}} = \\left(\\dfrac{1024}{16}\\right)^{\\frac{1}{2}} = 64^{\\frac{1}{2}} = 8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. When two powers have the same exponent, you can divide first and then take the power. 1,024 divided by 16 is 64, and the square root of 64 is 8. The same answer.', show: 'm.0' },
        { say: 'And 8 seconds is a sensible time for something to fall about a fifth of a mile.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Multiplying by $\\frac{1}{2}$: $\\dfrac{512}{8}$', '$64$: a power of $\\frac{1}{2}$ is a **root**, not a half'],
            ['Squaring instead: $\\dfrac{1024^2}{16^2}$', '$4096$ seconds: over an hour'],
            ['Dividing the exponents too', 'the exponent stays $\\frac{1}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Treating the power of one half as multiplying by a half gives 512 over 8, which is 64. But a power of one half is a square root, not a half.' },
        { say: 'Squaring instead of rooting gives 4,096 seconds, more than an hour for a flare to fall.' },
        { say: 'And when you divide first, only the numbers are divided. The power of one half stays as it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $27^{\\frac{2}{3}}$.',
          choices: ['$18$', '$9$', '$3$', '$\\dfrac{1}{9}$'],
          answer: 1,
          working: '$27^{\\frac{2}{3}} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate 27 to the power of two thirds. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The 3 on the bottom means a cube root, and the 2 on top means square it. The cube root of 27 is 3, and 3 squared is 9. That is choice B. 18 multiplied 27 by two thirds, 3 forgot to square, and one ninth treated the power as negative.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a^{\\frac{1}{2}} = \\sqrt{a}$, and $a^{\\frac{1}{n}} = \\sqrt[n]{a}$', 'A fraction exponent is a **root**, not a multiplication', '$a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$', 'Check by working it out another way'] }],
      lines: [
        { say: 'Here is what to remember. A power of one half is a square root, and a power of one over n is the n-th root.', show: 'sum.0' },
        { say: 'A fraction in the exponent means a root, not multiplying by the fraction.', show: 'sum.1' },
        { say: 'For a power of m over n, take the n-th root, then raise it to the power m.', show: 'sum.2' },
        { say: 'And check by working it out another way. For more on rational exponents, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
