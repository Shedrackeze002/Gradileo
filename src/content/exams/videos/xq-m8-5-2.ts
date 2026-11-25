import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 5.2 (dividing integers). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 3.4, Multiply and Divide Integers, CC BY-NC-SA 4.0).
// (a) −63 ÷ 7 = −9 (different signs). (b) −115 ÷ (−5) = 23 (same signs).

const QUESTION = 'Divide: (a) −63 ÷ 7 (b) −115 ÷ (−5)';

const split = (id: string) =>
  figure(id, [tape({ unit: 1.6, parts: [{ id: 's', count: 7, tone: 'opp', name: '7 \\text{ equal parts}', value: '-9' }], total: '-63' })], 230);

const video: Explainer = {
  id: 'xq-m8-5-2',
  lessonId: '',
  exam: {
    lesson: 'm8-5-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 3.4, Multiply and Divide Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-4-multiply-and-divide-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Dividing Negative Numbers (Dividing Integers)',
  thumbnailTitle: 'Dividing Negative Numbers',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: divide (a) −63 ÷ 7 and (b) −115 ÷ (−5). Divide the numbers without their signs, then decide the sign: different signs give a negative answer, and the same signs give a positive answer. So −63 ÷ 7 = −9, and −115 ÷ (−5) = 23. Then we check by multiplying back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Dividing Negative Numbers', subtitle: 'Dividing integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Divide: (a) $-63 \\div 7$ (b) $-115 \\div (-5)$',
          answer: '(a) $-9$ (b) $23$',
          working: 'different signs: negative; same signs: positive',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Divide. Part a: negative 63 divided by 7. Part b: negative 115 divided by negative 5.', caption: 'Divide: (a) −63 ÷ 7 (b) −115 ÷ (−5)' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [split('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Integers', md: '**Integers** are the whole numbers and their negatives: $\\dots, -2, -1, 0, 1, 2, \\dots$ Dividing $-63$ by $7$ splits $-63$ into $7$ **equal parts**. Each part is negative too.' }],
      lines: [
        { say: 'Integers are the whole numbers and their negatives.', show: 'c' },
        { say: 'Part a splits negative 63 into 7 equal parts. How big is each part?', caption: 'Part (a) splits −63 into 7 equal parts. How big is each part?', show: ['ask.s', 'ask.total'] },
        { say: 'Part b asks how many groups of negative 5 make negative 115.', caption: 'Part (b) asks how many groups of −5 make −115.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(-) \\div (+) = (-), \\quad (+) \\div (-) = (-)', '(-) \\div (-) = (+)', '\\text{different signs: negative; same signs: positive}'] }],
      lines: [
        { say: 'Here is what we need. A negative divided by a positive is negative, and so is a positive divided by a negative.', show: 'm.0' },
        { say: 'A negative divided by a negative is positive.', show: 'm.1' },
        { say: 'So, different signs give a negative answer, and the same signs give a positive answer. These are the same rules as for multiplying.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Divide** the numbers without their signs', 'Compare the **signs**', 'Write the answer with its **sign**'] }],
      lines: [
        { say: 'Here is the plan. Divide the numbers, without their signs.', show: 'plan.0' },
        { say: 'Compare the signs.', show: 'plan.1' },
        { say: 'Then write the answer with its sign.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide, then the sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['63 \\div 7 = 9, \\quad 115 \\div 5 = 23', '\\text{(a) } \\opp{-63} \\div \\adj{7}: \\text{ different} \\Rightarrow \\good{-9}', '\\text{(b) } \\opp{-115} \\div (\\opp{-5}): \\text{ same} \\Rightarrow \\good{23}'] }],
      lines: [
        { say: 'Step one. Without the signs, 63 divided by 7 is 9, and 115 divided by 5 is 23.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two, part a. Negative 63 and positive 7 have different signs, so the answer is negative: negative 9.', caption: 'Step two, part (a). −63 and +7 have different signs, so the answer is negative: −9.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three, part b. Negative 115 and negative 5 have the same sign, so the answer is positive: 23.', caption: 'Step three, part (b). −115 and −5 have the same sign, so the answer is positive: 23.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [split('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } 7 \\times (-9) = -63 \\ \\checkmark', '\\text{(b) } (-5) \\times 23 = -115 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. 7 equal parts of negative 9 make negative 63.', caption: 'Let us check by multiplying back. 7 equal parts of −9 make −63.', show: ['ck.s', 'ck.s-v', 'ck.total', 'm.0'], focus: 'm.0' },
        { say: 'And negative 5 times 23 is negative 115. Both check out.', caption: 'And −5 × 23 = −115. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) $-23$', 'two **negatives** divide to a **positive**'],
            ['(a) $9$', 'lost the sign: **different** signs give a negative'],
            ['(a) $-\\tfrac19$', 'divided the wrong way: $-63$ is divided **by** $7$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 23 for part b. But a negative divided by a negative is positive.', caption: '−23 for part (b). But a negative divided by a negative is positive.' },
        { say: 'Positive 9 for part a loses the sign. The signs are different, so the answer is negative.', caption: '+9 for part (a) loses the sign. The signs are different, so the answer is negative.' },
        { say: 'And negative 1 ninth divides 7 by 63. The first number is the one being divided.', caption: 'And −1/9 divides 7 by 63. The first number is the one being divided.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Divide: $-56 \\div (-8)$',
          choices: ['$-7$', '$-48$', '$7$', '$64$'],
          answer: 2,
          working: '56 ÷ 8 = 7, and the signs are the same, so the answer is positive: 7.',
        },
      ],
      lines: [
        { say: 'Your turn. Divide negative 56 by negative 8. Pause the video and try it.', caption: 'Your turn. Divide: −56 ÷ (−8). Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '56 divided by 8 is 7. The signs are the same, so the answer is positive 7. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide **without** the signs first', '**Different** signs: negative', '**Same** signs: positive', 'Check: **multiply** back'] }],
      lines: [
        { say: 'Here is what to remember. Divide the numbers without their signs first.', show: 'sum.0' },
        { say: 'Different signs give a negative answer.', show: 'sum.1' },
        { say: 'The same signs give a positive answer.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on dividing integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
