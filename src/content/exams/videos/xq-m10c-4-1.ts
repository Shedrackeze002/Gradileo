import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.1 (multiplying binomials, FOIL): multiply 18 × 17 in your head
// as (20 − 2)(20 − 3). The question is an exercise from OpenStax Elementary Algebra 2e, word for
// word (section 6.3, Multiply Polynomials, CC BY-NC-SA 4.0), whose answer key gives 306 for (a) and
// (b) and "answers will vary" for (c). FOIL: 400 − 60 − 40 + 6 = 306.

const QUESTION =
  'You can use binomial multiplication to multiply numbers without a calculator. Say you need to multiply 18 times 17. Think of 18 as 20 − 2 and 17 as 20 − 3. (a) Multiply (20 − 2)(20 − 3) by the FOIL method. (b) Multiply 18 · 17 without using a calculator. (c) Which way is easier for you? Why?';

const video: Explainer = {
  id: 'xq-m10c-4-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-1',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 6.3, Multiply Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-3-multiply-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: 18 × 17 in Your Head. Multiplying Binomials With FOIL',
  thumbnailTitle: '18 × 17 With FOIL',
  thumbnail: 'box',
  summary:
    'A real test question, solved one small step at a time: we multiply 18 by 17 without a calculator by writing it as (20 − 2)(20 − 3) and using FOIL, firsts, outers, inners and lasts. We draw the four products as an area model, add them to get 306, check with ordinary multiplication, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '18 × 17 in Your Head', subtitle: 'Multiplying binomials with FOIL, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that uses binomial multiplication to do mental maths. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '(a) 306  (b) 306  (c) your choice', working: '$(20-2)(20-3) = 400 - 60 - 40 + 6 = 306$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Mental maths. You can use binomial multiplication to multiply numbers without a calculator. Say you need to multiply 18 times 17. Think of 18 as 20 minus 2, and 17 as 20 minus 3.' },
        { say: 'Part A: multiply 20 minus 2, times 20 minus 3, by the FOIL method. Part B: multiply 18 times 17 without using a calculator. Part C: which way is easier for you, and why?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['18 \\times 17 = (20 - 2)(20 - 3)'] },
        { kind: 'text', id: 't', size: 'md', md: '$20$ is easy to multiply by. Two **binomials**, each with **two** terms, multiplied together.' },
      ],
      lines: [
        { say: 'Here is the idea. 18 is 20 minus 2, and 17 is 20 minus 3. So 18 times 17 is the same as 20 minus 2, times 20 minus 3.', show: 'm' },
        { say: 'Each bracket has two terms, so each is a binomial. And multiplying by 20 is easy in your head.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['(a + b)(c + d) = \\underbrace{ac}_{\\text{F}} + \\underbrace{ad}_{\\text{O}} + \\underbrace{bc}_{\\text{I}} + \\underbrace{bd}_{\\text{L}}'] },
        { kind: 'text', id: 't', size: 'md', md: '**F**irsts, **O**uters, **I**nners, **L**asts: every term in the first bracket times every term in the second. Keep the **signs** with the terms.' },
      ],
      lines: [
        { say: 'Here is what we need. To multiply two binomials, use FOIL: firsts, outers, inners, lasts.', show: 'f' },
        { say: 'It makes sure every term in the first bracket multiplies every term in the second. And each term keeps its sign: here, minus 2 and minus 3.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Part (a): the four **FOIL** products, then **add**', 'Part (b): multiply $18 \\times 17$ the usual way', 'Part (c): compare'] }],
      lines: [
        { say: 'Here is the plan. For part A, find the four FOIL products and add them.', show: 'plan.0' },
        { say: 'For part B, multiply 18 by 17 the usual way.', show: 'plan.1' },
        { say: 'For part C, compare the two ways.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: FOIL',
      layout: 'center',
      main: [
        { kind: 'table', id: 'box', head: ['$\\times$', '$20$', '$-3$'], rows: [['$20$', '$400$', '$-60$'], ['$-2$', '$-40$', '$+6$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{F: } 20 \\times 20 = 400 \\quad \\text{O: } 20 \\times (-3) = -60', '\\text{I: } (-2) \\times 20 = -40 \\quad \\text{L: } (-2) \\times (-3) = +6'] },
      ],
      lines: [
        { say: 'Step one. Firsts: 20 times 20 is 400.', show: ['box', 'm.0'] },
        { say: 'Outers: 20 times minus 3 is minus 60.' },
        { say: 'Inners: minus 2 times 20 is minus 40.', show: 'm.1' },
        { say: 'Lasts: minus 2 times minus 3. Two negatives make a positive, so that is plus 6. The table shows all four products, like the four parts of a rectangle\'s area.' },
      ],
    },
    {
      chapter: 'Step 2: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['400 - 60 - 40 + 6', '= 400 - 100 + 6', '= \\good{306}'] }],
      lines: [
        { say: 'Step two. Add the four products: 400, minus 60, minus 40, plus 6.', show: 'm.0' },
        { say: 'Minus 60 and minus 40 make minus 100, so we have 400 minus 100, plus 6.', show: 'm.1' },
        { say: 'That is 306. That is part A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Parts (b) and (c)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['18 \\times 17 = 18 \\times 10 + 18 \\times 7', '= 180 + 126 = \\good{306}'] }],
      lines: [
        { say: 'Step three. For part B, multiply 18 by 17 the usual way: 18 times 10 is 180, and 18 times 7 is 126.', show: 'm.0' },
        { say: '180 plus 126 is 306. The same answer, so part B is 306 too.', show: 'm.1', focus: 'm.1' },
        { say: 'Part C asks for your opinion, so any reasoned answer counts. Many people find FOIL easier here, because multiplying by 20 and by small numbers is quick in your head.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '18 × 17', result: '306' }],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Both ways give $306$, and a calculator agrees. Also: $17 \\times 17 = 289$, and $289 + 17 = 306$.' }],
      lines: [
        { say: 'Let us check. Both ways gave 306, and a calculator agrees.', show: ['calc', 't'] },
        { say: 'Here is one more check. 17 times 17 is 289, and one more 17 makes 306.' },
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
            ['Only firsts and lasts: $400 + 6$', '$406$: forgot the outers and inners'],
            ['$(-2)(-3) = -6$', '$294$: two negatives make a **positive**'],
            ['Adding the $-60$ and $-40$ as positives', '$506$: keep each sign with its term'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying only the firsts and the lasts gives 406. That misses the outers and inners. There are always four products.' },
        { say: 'Writing minus 2 times minus 3 as minus 6 gives 294. Two negatives make a positive.' },
        { say: 'And losing the signs on the outers and inners gives 506. Keep each sign with its term.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Use (30 − 1)(30 + 2) to work out 29 × 32 without a calculator.',
          choices: ['902', '928', '898', '932'],
          answer: 1,
          working: '$900 + 60 - 30 - 2 = 928$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use 30 minus 1, times 30 plus 2, to work out 29 times 32 without a calculator. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Firsts: 900. Outers: plus 60. Inners: minus 30. Lasts: minus 2. 900 plus 60 minus 30 minus 2 is 928, choice B. 902 kept only the firsts and the lasts, with the wrong sign on the lasts, 898 lost the outers and inners, and 932 made the lasts positive.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['FOIL: **F**irsts, **O**uters, **I**nners, **L**asts', '**Four** products, then add', 'Keep each **sign** with its term', 'Check another way'] }],
      lines: [
        { say: 'Here is what to remember. To multiply two binomials, use FOIL: firsts, outers, inners, lasts.', show: 'sum.0' },
        { say: 'There are always four products to add.', show: 'sum.1' },
        { say: 'Keep each sign with its term.', show: 'sum.2' },
        { say: 'And check another way. For more on multiplying binomials, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
