import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips, groupsOf, groupIds } from '@/content/math8/videos/lib/m8-5-figures.ts';

// Exam question for Math 8 lesson 5.3 (order of operations with integers). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 3.4, Multiply and Divide Integers, CC BY-NC-SA
// 4.0). Brackets first: 8 − 11 = −3. Then multiply: 4(−3) = −12. Then 17 − (−12) = 17 + 12 = 29.

const QUESTION = 'Simplify: 17 − 4(8 − 11)';

const G = groupsOf({ prefix: 'g', groups: 4, size: 3, sign: '-', perRow: 3, space: 1.6, labels: Array(4).fill('-3'), tone: 'bad' });
const fours = (id: string) => figure(id, [chips({ chips: G.chips, boxes: G.boxes })], 220);
const all = (id: string) => [0, 1, 2, 3].flatMap((g) => [...groupIds(id, 'g', g, 3), `${id}.gbox${g}`]);

const video: Explainer = {
  id: 'xq-m8-5-3',
  lessonId: '',
  exam: {
    lesson: 'm8-5-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.4, Multiply and Divide Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-4-multiply-and-divide-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Brackets First (Order of Operations with Integers)',
  thumbnailTitle: 'Brackets First',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: simplify 17 − 4(8 − 11). The order of operations says brackets first: 8 − 11 = −3. Then multiply: 4(−3) = −12. Last, subtract: 17 − (−12) = 17 + 12 = 29. Then we check with the distributive property and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Brackets First', subtitle: 'Order of operations with integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations with integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: $17 - 4(8 - 11)$',
          answer: '$29$',
          working: '8 − 11 = −3; 4(−3) = −12; 17 − (−12) = 29',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: 17 minus 4 times the bracket 8 minus 11.', caption: 'Simplify: 17 − 4(8 − 11)' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['17 - 4\\,(8 - 11)'] }, { kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: '**Simplify** means work it out to a single number. A number written right next to a bracket, like $4(8 - 11)$, means **multiply**: $4 \\times (8 - 11)$. There are three operations here, so the **order** matters.' }],
      lines: [
        { say: 'Simplify means work it out to a single number.', show: ['e', 'c'] },
        { say: 'A number written right next to a bracket means multiply: 4 times the bracket. There is a subtraction, a multiplication, and a subtraction inside the bracket, so the order we do them in matters.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'm', items: ['**1.** Brackets', '**2.** Exponents', '**3.** Multiply and divide, left to right', '**4.** Add and subtract, left to right'] }],
      lines: [
        { say: 'Here is what we need: the order of operations. First, work out what is inside brackets.', show: 'm.0' },
        { say: 'Second, exponents.', show: 'm.1' },
        { say: 'Third, multiply and divide, from left to right.', show: 'm.2' },
        { say: 'Last, add and subtract, from left to right. And subtracting a negative is the same as adding a positive.', show: 'm.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Work out the **bracket**', '**Multiply** by $4$', '**Subtract** from $17$'] }],
      lines: [
        { say: 'Here is the plan. Work out the bracket.', show: 'plan.0' },
        { say: 'Multiply by 4.', show: 'plan.1' },
        { say: 'Then subtract from 17.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Bracket, multiply, subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17 - 4\\,(\\adj{8 - 11}) = 17 - 4\\,(\\adj{-3})', '= 17 - (\\opp{-12})', '= 17 + 12 = \\good{29}'] }],
      lines: [
        { say: 'Step one. Brackets first. 8 minus 11 is negative 3.', caption: 'Step one. Brackets first. 8 − 11 = −3.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply before subtracting. 4 times negative 3 is negative 12.', caption: 'Step two. Multiply before subtracting. 4 × (−3) = −12.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 17 minus negative 12. Subtracting a negative is adding a positive, so it is 17 plus 12, which is 29.', caption: 'Step three. 17 − (−12). Subtracting a negative is adding a positive, so it is 17 + 12 = 29.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [fours('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['4\\,(8 - 11) = 32 - 44 = -12', '17 - (-12) = 29 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 4 times negative 3 is 4 groups of negative 3: negative 12.', caption: 'Let us check. 4 × (−3) is 4 groups of −3: −12.', show: all('ck') },
        { say: 'We can also share the 4 over the bracket. 4 times 8 is 32, and 4 times 11 is 44. 32 minus 44 is negative 12 again.', caption: 'We can also share the 4 over the bracket. 4 × 8 = 32, and 4 × 11 = 44. 32 − 44 = −12 again.', show: 'm.0', focus: 'm.0' },
        { say: 'And 17 minus negative 12 is 29. It checks out.', caption: 'And 17 − (−12) = 29. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$-39$', 'did $17 - 4$ first: **multiply** before you subtract'],
            ['$5$', 'took away $12$: subtracting $-12$ means **adding** $12$'],
            ['$-26$', 'dropped the **brackets**: the $4$ multiplies all of $(8 - 11)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 39 works out 17 minus 4 first, to get 13, then multiplies by negative 3. Multiply before you subtract.', caption: '−39 works out 17 − 4 first, to get 13, then multiplies by −3. Multiply before you subtract.' },
        { say: '5 takes away 12. But the bracket gave negative 12, and subtracting negative 12 means adding 12.', caption: '5 takes away 12. But the bracket gave −12, and subtracting −12 means adding 12.' },
        { say: 'And negative 26 drops the brackets: 17 minus 32 minus 11. The 4 multiplies the whole bracket.', caption: 'And −26 drops the brackets: 17 − 32 − 11. The 4 multiplies the whole bracket.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $10 - 3(2 - 7)$',
          choices: ['$-35$', '$25$', '$-5$', '$35$'],
          answer: 1,
          working: '2 − 7 = −5; 3(−5) = −15; 10 − (−15) = 25.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: 10 minus 3 times the bracket 2 minus 7. Pause the video and try it.', caption: 'Your turn. Simplify: 10 − 3(2 − 7). Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 minus 7 is negative 5. 3 times negative 5 is negative 15. 10 minus negative 15 is 10 plus 15, which is 25. Choice "B".', caption: '2 − 7 = −5. 3 × (−5) = −15. 10 − (−15) = 10 + 15 = 25. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Brackets** first', '**Multiply** before you add or subtract', 'Subtracting a negative: **add**', 'Keep track of every **sign**'] }],
      lines: [
        { say: 'Here is what to remember. Work out the brackets first.', show: 'sum.0' },
        { say: 'Multiply before you add or subtract.', show: 'sum.1' },
        { say: 'Subtracting a negative is the same as adding.', show: 'sum.2' },
        { say: 'And keep track of every sign. For more on order of operations with integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
