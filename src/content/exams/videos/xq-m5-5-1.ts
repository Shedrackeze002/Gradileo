import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 5.1 (improper fractions and mixed numbers). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 4.1, Visualize Fractions, CC BY-NC-SA
// 4.0). A quarter note is 1/4 of a measure in 4/4 time. (a) 8 quarter notes = 8/4 = 2 measures.
// (b) 25 quarter notes = 25/4 measures; 25 ÷ 4 = 6 R 1, so 25/4 = 6 1/4 measures. Both as in the
// book's answer. Check: 6 × 4 + 1 = 25.

const QUESTION =
  'Music Measures Fractions are used often in music. In 4/4 time, there are four quarter notes in one measure. (a) How many measures would eight quarter notes make? (b) The song “Happy Birthday to You” has 25 quarter notes. How many measures are there in “Happy Birthday to You?”';

const video: Explainer = {
  id: 'xq-m5-5-1',
  lessonId: '',
  exam: {
    lesson: 'm5-5-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.1, Visualize Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Measures in a Song? (Improper Fractions and Mixed Numbers)',
  thumbnailTitle: 'Fractions in Music',
  summary:
    'A real test question, solved one small step at a time: in 4/4 time, four quarter notes make one measure. How many measures do 8 quarter notes make, and how many does "Happy Birthday to You", with 25 quarter notes, have? Each quarter note is 1/4 of a measure, so 8 quarter notes are 8/4 = 2 measures, and 25 quarter notes are 25/4 = 6 1/4 measures. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fractions in Music', subtitle: 'Improper fractions and mixed numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about improper fractions and mixed numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Music Measures** Fractions are used often in music. In $\\tfrac{4}{4}$ time, there are four quarter notes in one measure. (a) How many measures would eight quarter notes make? (b) The song “Happy Birthday to You” has $25$ quarter notes. How many measures are there in “Happy Birthday to You?”',
          answer: '(a) $2$ (b) $6\\tfrac{1}{4}$',
          working: '8/4 = 2 and 25/4 = 6 1/4',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Fractions are used often in music. In 4 4 time, there are four quarter notes in one measure. Part a. How many measures would eight quarter notes make? Part b. The song Happy Birthday to You has 25 quarter notes. How many measures are there in the song?', caption: 'Fractions are used often in music. In 4/4 time, there are four quarter notes in one measure. (a) How many measures would eight quarter notes make? (b) “Happy Birthday to You” has 25 quarter notes. How many measures are there in the song?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Measures and quarter notes', md: 'Music is split into **measures**. Here, **$4$ quarter notes** fill one measure, so each quarter note is **$\\tfrac{1}{4}$** of a measure. We count how many measures the notes fill.' }],
      lines: [
        { say: 'A piece of music is split into equal parts called measures. Here, 4 quarter notes fill one measure.', show: 'c' },
        { say: 'So each quarter note is one quarter of a measure, just as its name says. We want to know how many measures the notes fill.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{25}{4} = 6\\tfrac{1}{4}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Improper fraction to mixed number', md: 'An **improper fraction** has a top number **bigger** than the bottom. To write it as a **mixed number**, divide the top by the bottom. The quotient is the **whole number**, and the remainder goes **over** the bottom number.' },
      ],
      lines: [
        { say: 'Here is what we need. 25 quarters is written 25 over 4. That is an improper fraction, because the top is bigger than the bottom.', show: 'm' },
        { say: 'To write it as a mixed number, divide the top by the bottom. The answer is the whole number, and the remainder goes over the bottom number.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the notes as **quarters** of a measure', '**Divide** the top by $4$', 'Write the remainder as a **fraction**'] }],
      lines: [
        { say: 'Here is the plan. Write the notes as quarters of a measure.', show: 'plan.0' },
        { say: 'Divide the top number by 4.', show: 'plan.1' },
        { say: 'Then write any remainder as a fraction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Eight notes',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\big|\\ \\tfrac14\\ \\tfrac14\\ \\tfrac14\\ \\tfrac14\\ \\big|\\ \\tfrac14\\ \\tfrac14\\ \\tfrac14\\ \\tfrac14\\ \\big|', '\\dfrac{8}{4} = 8 \\div 4 = \\good{2 \\text{ measures}}'] },
      ],
      lines: [
        { say: 'Part a. Eight quarter notes fill four, and then four more. Here each bar line marks the end of a measure.', show: 'm.0' },
        { say: 'In fractions, that is 8 quarters, or 8 over 4. 8 divided by 4 is 2, with no remainder. Eight quarter notes make 2 measures.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Part (b): Happy Birthday',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['25 \\text{ quarter notes} = \\dfrac{25}{4}', '25 \\div 4 = 6 \\text{ R } 1', '\\dfrac{25}{4} = \\good{6\\tfrac{1}{4} \\text{ measures}}'] }],
      lines: [
        { say: 'Part b. 25 quarter notes are 25 quarters of a measure: 25 over 4.', show: 'm.0' },
        { say: 'Divide the top by the bottom. 25 divided by 4 is 6, because 6 times 4 is 24, with 1 left over.', show: 'm.1' },
        { say: 'The 6 is the whole number of measures. The 1 left over is 1 quarter of a measure. So the song has 6 and 1 quarter measures.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 4 + 1 = 24 + 1 = 25 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b. 6 full measures hold 6 times 4, which is 24 quarter notes. Add the 1 extra note, and that is 25. It checks out.', show: 'm', focus: 'm' },
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
            ['(b) $100$', '**multiplied** $25 \\times 4$: four notes fill **one** measure'],
            ['(b) $6$', '**dropped** the extra note: it is $\\tfrac{1}{4}$ of a measure'],
            ['(b) $6\\tfrac{1}{25}$', 'the remainder goes over the **bottom** number, $4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '100 multiplies by 4. But it takes 4 notes to fill one measure, so we divide by 4.' },
        { say: '6 drops the extra note. That note is still part of the song: one quarter of a measure.' },
        { say: 'And 6 and 1 twenty-fifth puts the remainder over the wrong number. The remainder goes over the bottom number, 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A pizza is cut into $8$ slices. A class eats $19$ slices. How many pizzas is that?',
          choices: ['$2\\tfrac{1}{8}$', '$2\\tfrac{3}{8}$', '$3\\tfrac{3}{8}$', '$2\\tfrac{3}{19}$'],
          answer: 1,
          working: '19/8: 19 ÷ 8 = 2 R 3, so 2 3/8 pizzas.',
        },
      ],
      lines: [
        { say: 'Your turn. A pizza is cut into 8 slices. A class eats 19 slices. How many pizzas is that? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '19 slices are 19 eighths. 19 divided by 8 is 2, remainder 3. So the class ate 2 and 3 eighths pizzas. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Improper: the top is **bigger** than the bottom', '**Divide** the top by the bottom', 'The quotient is the **whole number**', 'The remainder goes **over the bottom**'] }],
      lines: [
        { say: 'Here is what to remember. In an improper fraction, the top is bigger than the bottom.', show: 'sum.0' },
        { say: 'To make a mixed number, divide the top by the bottom.', show: 'sum.1' },
        { say: 'The answer is the whole number.', show: 'sum.2' },
        { say: 'And the remainder goes over the bottom number. For more on improper fractions and mixed numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
