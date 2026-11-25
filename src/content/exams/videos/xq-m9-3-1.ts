import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from '@/content/math9/videos/lib/m9-3-figures.ts';

// Exam question for Math 9 lesson 3.1 (comparing and ordering rational numbers). The question is a
// Try It from OpenStax Elementary Algebra 2e, word for word (section 1.8, The Real Numbers,
// CC BY-NC-SA 4.0). On a number line, the number further right is greater:
// (a) −1/3 > −1 (b) −1 1/2 > −2 (c) −2/3 < −1/3 (d) −3 < −7/3.

const QUESTION = 'Order each of the following pairs of numbers, using < or >: (a) −1/3 ___ −1 (b) −1 1/2 ___ −2 (c) −2/3 ___ −1/3 (d) −3 ___ −7/3.';

const line = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -3,
        max: 0,
        step: 1 / 3,
        points: [
          { id: 'p13', value: -1 / 3, tex: '-\\tfrac{1}{3}', tone: 'adj', lift: 1.1 },
          { id: 'p1', value: -1, tex: '-1', tone: 'opp', lift: 1.1 },
          { id: 'p15', value: -1.5, tex: '-1\\tfrac{1}{2}', tone: 'adj' },
          { id: 'p2', value: -2, tex: '-2', tone: 'opp', lift: 1.1 },
          { id: 'p23', value: -2 / 3, tex: '-\\tfrac{2}{3}', tone: 'opp' },
          { id: 'p3', value: -3, tex: '-3', tone: 'opp' },
          { id: 'p73', value: -7 / 3, tex: '-\\tfrac{7}{3}', tone: 'adj' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m9-3-1',
  lessonId: '',
  exam: {
    lesson: 'm9-3-1',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.8, The Real Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-8-the-real-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Which Negative Number Is Greater? (Comparing and Ordering Rational Numbers)',
  thumbnailTitle: 'Which Negative Number Is Greater?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: order each pair using < or >: (a) −1/3 and −1, (b) −1 1/2 and −2, (c) −2/3 and −1/3, (d) −3 and −7/3. On a number line, the number further to the right is greater, so the negative number closer to zero is greater: −1/3 > −1, −1 1/2 > −2, −2/3 < −1/3 and −3 < −7/3. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Negative Number Is Greater?', subtitle: 'Comparing and ordering rational numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about comparing and ordering rational numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Order each of the following pairs of numbers, using $<$ or $>$: (a) $-\\tfrac{1}{3}$ ___ $-1$ (b) $-1\\tfrac{1}{2}$ ___ $-2$ (c) $-\\tfrac{2}{3}$ ___ $-\\tfrac{1}{3}$ (d) $-3$ ___ $-\\tfrac{7}{3}$.',
          answer: '(a) $>$ (b) $>$ (c) $<$ (d) $<$',
          working: 'the number further right on the number line is greater',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Order each pair of numbers, using less than or greater than. Part a: negative one third, and negative 1. Part b: negative 1 and a half, and negative 2. Part c: negative two thirds, and negative one third. Part d: negative 3, and negative seven thirds.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['a < b: \\ a \\text{ is less than } b', 'a > b: \\ a \\text{ is greater than } b'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Rational number', md: 'A **rational number** can be written as a fraction of two integers. All eight numbers here are rational, and all of them are **negative**.' },
      ],
      lines: [
        { say: 'We must put a sign between each pair. The less than sign means the first number is smaller. The greater than sign means the first number is bigger. The sign always opens towards the bigger number.', show: ['m.0', 'm.1'] },
        { say: 'A rational number can be written as a fraction of two integers. All the numbers here are rational, and all of them are negative.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{further right on the number line} = \\text{greater}', '\\text{for negatives: closer to } 0 = \\text{greater}'] }],
      lines: [
        { say: 'Here is what we need. On a number line, the number further to the right is greater.', show: 'm.0' },
        { say: 'So for negative numbers, the one closer to zero is greater. Negative 1 is greater than negative 100.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Place both numbers on a **number line**', 'The one further **right** is greater', 'Write the sign, opening to the **greater** one'] }],
      lines: [
        { say: 'Here is the plan. Place both numbers on a number line.', show: 'plan.0' },
        { say: 'The one further to the right is greater.', show: 'plan.1' },
        { say: 'Then write the sign, opening towards the greater number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 4: One pair at a time',
      layout: 'split',
      leftWidth: 640,
      left: [line('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } {-\\tfrac{1}{3}} \\good{>} {-1}', '\\text{(b) } {-1\\tfrac{1}{2}} \\good{>} {-2}', '\\text{(c) } {-\\tfrac{2}{3}} \\good{<} {-\\tfrac{1}{3}}', '\\text{(d) } {-3} \\good{<} {-\\tfrac{7}{3}}'] }],
      lines: [
        { say: 'Here is a number line from negative 3 to zero, with a tick every third.', show: 'st.axis' },
        { say: 'Part a. Negative one third is just left of zero. Negative 1 is further left. Negative one third is further right, so it is greater. Negative one third is greater than negative 1.', show: ['st.p13', 'st.p1', 'm.0'], focus: ['st.p13', 'st.p1', 'm.0'] },
        { say: 'Part b. Negative 1 and a half is half way between negative 1 and negative 2. Negative 2 is further left. So negative 1 and a half is greater than negative 2.', show: ['st.p15', 'st.p2', 'm.1'], focus: ['st.p15', 'st.p2', 'm.1'] },
        { say: 'Part c. Negative two thirds is further from zero than negative one third, so it is further left. Negative two thirds is less than negative one third.', show: ['st.p23', 'm.2'], focus: ['st.p23', 'st.p13', 'm.2'] },
        { say: 'Part d. Seven thirds is 2 and one third, so negative seven thirds is just left of negative 2. Negative 3 is further left. So negative 3 is less than negative seven thirds.', show: ['st.p3', 'st.p73', 'm.3'], focus: ['st.p3', 'st.p73', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{-0.33} > {-1} \\ \\checkmark \\qquad {-1.5} > {-2} \\ \\checkmark', '{-0.67} < {-0.33} \\ \\checkmark \\qquad {-3} < {-2.33} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. Negative 0.33 is greater than negative 1, and negative 1.5 is greater than negative 2.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative 0.67 is less than negative 0.33, and negative 3 is less than negative 2.33. Every sign matches. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$-2 > -1\\tfrac{1}{2}$', 'compared sizes without the sign: for negatives, **bigger size** is **less**'],
            ['$-\\tfrac{2}{3} > -\\tfrac{1}{3}$', '$2 > 1$, but the minus flips it: $-\\tfrac{2}{3}$ is further **left**'],
            ['$-3 > -\\tfrac{7}{3}$', '$\\tfrac{7}{3}$ is only $2\\tfrac{1}{3}$: $-3$ is further left'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying negative 2 is greater than negative 1 and a half compares the sizes and forgets the sign. For negative numbers, the bigger size is the smaller number.' },
        { say: 'Two thirds is more than one third, but with the minus signs it flips. Negative two thirds is further left, so it is less.' },
        { say: 'And seven thirds looks big, but it is only 2 and one third. Negative 3 is further left, so it is less.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is true?',
          choices: ['$-\\tfrac{3}{4} > -\\tfrac{1}{4}$', '$-\\tfrac{3}{4} < -\\tfrac{1}{4}$', '$-0.5 < -0.75$', '$-2 > -1$'],
          answer: 1,
          working: '−3/4 is further from zero, so further left: −3/4 < −1/4.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is true? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative three quarters is further from zero than negative one quarter, so it is further left and smaller. Negative three quarters is less than negative one quarter. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Further **right** is greater', 'For negatives, **closer to zero** is greater', 'The sign opens to the **greater** number', 'Check with **decimals**'] }],
      lines: [
        { say: 'Here is what to remember. On a number line, the number further to the right is greater.', show: 'sum.0' },
        { say: 'For negative numbers, the one closer to zero is greater.', show: 'sum.1' },
        { say: 'The sign opens towards the greater number.', show: 'sum.2' },
        { say: 'And you can check by changing fractions to decimals. For more on comparing and ordering rational numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
