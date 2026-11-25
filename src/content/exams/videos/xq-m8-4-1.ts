import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 4.1 (multiplying fractions). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 4.3, Multiply and Divide Mixed Numbers and Complex
// Fractions, CC BY-NC-SA 4.0). 2 2/3 = 8/3. (a) 8/3 × 1/2 = 4/3 = 1 1/3 cups. (b) 8/3 × 10 = 80/3
// = 26 2/3 cups.

const QUESTION =
  'A booth at the county fair sells fudge by the pound. Their award winning “Chocolate Overdose” fudge contains 2 2/3 cups of chocolate chips per pound. (a) How many cups of chocolate chips are in a half-pound of the fudge? (b) The owners of the booth make the fudge in 10-pound batches. How many chocolate chips do they need to make a 10-pound batch? Write your results as improper fractions and as a mixed numbers.';

// One pound's 2 2/3 cups as 8 thirds of a cup, in two halves of 4 thirds.
const pound = (id: string) =>
  figure(
    id,
    [
      tape({
        parts: [
          { id: 'h1', count: 4, tone: 'adj', name: '\\text{first half-pound}', value: '\\tfrac13' },
          { id: 'h2', count: 4, tone: 'opp', name: '\\text{second half-pound}', value: '\\tfrac13' },
        ],
        total: '1 \\text{ pound}: \\ 2\\tfrac23 \\text{ cups} = \\tfrac83 \\text{ cups}',
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'xq-m8-4-1',
  lessonId: '',
  exam: {
    lesson: 'm8-4-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.3, Multiply and Divide Mixed Numbers and Complex Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-3-multiply-and-divide-mixed-numbers-and-complex-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Chocolate Chips in the Fudge (Multiplying Fractions)',
  thumbnailTitle: 'Chocolate Chips in the Fudge',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: a fair booth’s fudge has 2 2/3 cups of chocolate chips per pound. How many cups are in a half-pound, and in a 10-pound batch? First write 2 2/3 as the improper fraction 8/3. A half-pound needs 8/3 × 1/2 = 4/3 = 1 1/3 cups, and a 10-pound batch needs 8/3 × 10 = 80/3 = 26 2/3 cups. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Chocolate Chips in the Fudge', subtitle: 'Multiplying fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A booth at the county fair sells fudge by the pound. Their award winning “Chocolate Overdose” fudge contains $2\\tfrac23$ cups of chocolate chips per pound. (a) How many cups of chocolate chips are in a half-pound of the fudge? (b) The owners of the booth make the fudge in $10$-pound batches. How many chocolate chips do they need to make a $10$-pound batch? Write your results as improper fractions and as a mixed numbers.',
          answer: '(a) $\\tfrac43 = 1\\tfrac13$ cups (b) $\\tfrac{80}{3} = 26\\tfrac23$ cups',
          working: '8/3 × 1/2; 8/3 × 10',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A booth at the county fair sells fudge by the pound. Their award winning "Chocolate Overdose" fudge contains 2 and 2 thirds cups of chocolate chips per pound.', caption: 'A booth at the county fair sells fudge by the pound. Their award winning “Chocolate Overdose” fudge contains 2 2/3 cups of chocolate chips per pound.' },
        { say: 'Part a: how many cups of chocolate chips are in a half-pound of the fudge? Part b: the owners of the booth make the fudge in 10 pound batches. How many chocolate chips do they need to make a 10 pound batch? Write your results as improper fractions and as mixed numbers.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pound('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Per pound', md: '**Fudge** is a soft sweet. **Per pound** means in each pound. Each pound has $2\\tfrac23$ cups of chips, so a half-pound has **half** of that, and $10$ pounds have $10$ **times** that.' }],
      lines: [
        { say: 'Fudge is a soft sweet. Here is one pound of it: 2 and 2 thirds cups of chips, which is 8 thirds of a cup.', caption: 'Fudge is a soft sweet. Here is one pound of it: 2 2/3 cups of chips, which is 8/3 of a cup.', show: ['ask.h1', 'ask.h2', 'ask.h1-v', 'ask.h2-v', 'ask.total'] },
        { say: 'Per pound means in each pound. A half-pound has half of that, and 10 pounds have 10 times that. Both are multiplications.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac23 = \\dfrac{2 \\times 3 + 2}{3} = \\dfrac{8}{3}', '\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}', '\\text{half of} = \\times \\tfrac12'] }],
      lines: [
        { say: 'Here is what we need. To multiply a mixed number, first write it as an improper fraction. 2 and 2 thirds is 2 times 3 plus 2, over 3: 8 thirds.', caption: 'Here is what we need. To multiply a mixed number, first write it as an improper fraction. 2 2/3 is (2 × 3 + 2)/3: 8/3.', show: 'm.0' },
        { say: 'To multiply fractions, multiply the tops, and multiply the bottoms.', show: 'm.1' },
        { say: 'And half of a number means the number times 1 half.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $2\\tfrac23$ as an **improper fraction**', '(a) **Multiply** by $\\tfrac12$', '(b) **Multiply** by $10$, then write both ways'] }],
      lines: [
        { say: 'Here is the plan. Write 2 and 2 thirds as an improper fraction.', show: 'plan.0' },
        { say: 'For part a, multiply by 1 half.', show: 'plan.1' },
        { say: 'For part b, multiply by 10. Then write each answer as an improper fraction and as a mixed number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Convert, then multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac23 = \\adj{\\dfrac{8}{3}}', '\\text{(a) } \\dfrac{8}{3} \\times \\dfrac{1}{2} = \\dfrac{8}{6} = \\good{\\dfrac{4}{3} = 1\\tfrac13 \\text{ cups}}', '\\text{(b) } \\dfrac{8}{3} \\times \\dfrac{10}{1} = \\good{\\dfrac{80}{3} = 26\\tfrac23 \\text{ cups}}'] }],
      lines: [
        { say: 'Step one. 2 and 2 thirds is 8 thirds.', caption: 'Step one. 2 2/3 is 8/3.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two, part a. 8 thirds times 1 half is 8 sixths. Simplify: 4 thirds. 3 thirds make 1, so that is 1 and 1 third cups.', caption: 'Step two, part (a). 8/3 × 1/2 = 8/6. Simplify: 4/3. 3/3 make 1, so that is 1 1/3 cups.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three, part b. 8 thirds times 10 is 80 thirds. 80 divided by 3 is 26, with 2 left over, so that is 26 and 2 thirds cups.', caption: 'Step three, part (b). 8/3 × 10 = 80/3. 80 ÷ 3 = 26 remainder 2, so that is 26 2/3 cups.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [pound('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) half of } 2 = 1, \\ \\text{half of } \\tfrac23 = \\tfrac13 \\ \\to \\ 1\\tfrac13 \\ \\checkmark', '\\text{(b) } 10 \\times 2 = 20, \\ 10 \\times \\tfrac23 = 6\\tfrac23 \\ \\to \\ 26\\tfrac23 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. In the bar, half a pound is 4 of the 8 thirds: 4 thirds, which is 1 and 1 third. Also, half of 2 is 1, and half of 2 thirds is 1 third. 1 and 1 third.', caption: 'Let us check. In the bar, half a pound is 4 of the 8 thirds: 4/3, which is 1 1/3. Also, half of 2 is 1, and half of 2/3 is 1/3. 1 1/3.', show: ['ck.h1', 'ck.h2', 'ck.h1-v', 'ck.h2-v', 'ck.total', 'm.0'], focus: ['ck.h1', 'm.0'] },
        { say: 'For part b, 10 times 2 is 20, and 10 times 2 thirds is 20 thirds, which is 6 and 2 thirds. 20 plus 6 and 2 thirds is 26 and 2 thirds. It checks out.', caption: 'For part (b), 10 × 2 = 20, and 10 × 2/3 = 20/3, which is 6 2/3. 20 + 6 2/3 = 26 2/3. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $2\\tfrac13$', 'halved only the **fraction**: halve the whole number too'],
            ['(b) $20\\tfrac23$', 'multiplied only the $2$: write $\\tfrac83$ first'],
            ['(a) $5\\tfrac13$', 'multiplied by $2$: **half** a pound means $\\times \\tfrac12$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 and 1 third halves only the 2 thirds. Half of 2 and 2 thirds halves the 2 as well.', caption: '2 1/3 halves only the 2/3. Half of 2 2/3 halves the 2 as well.' },
        { say: '20 and 2 thirds multiplies only the whole number 2 by 10. Write 8 thirds first, and the whole amount is multiplied.', caption: '20 2/3 multiplies only the whole number 2 by 10. Write 8/3 first, and the whole amount is multiplied.' },
        { say: 'And 5 and 1 third doubles the amount. Half a pound needs less than a pound, so multiply by 1 half.', caption: 'And 5 1/3 doubles the amount. Half a pound needs less than a pound, so multiply by 1/2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A recipe uses $1\\tfrac12$ cups of flour for one batch. How much flour is needed for $\\tfrac23$ of a batch?',
          choices: ['$2\\tfrac16$ cups', '$\\tfrac23$ cup', '$1\\tfrac13$ cups', '$1$ cup'],
          answer: 3,
          working: '1 1/2 = 3/2, and 3/2 × 2/3 = 6/6 = 1 cup.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses 1 and a half cups of flour for one batch. How much flour is needed for 2 thirds of a batch? Pause the video and try it.', caption: 'Your turn. A recipe uses 1 1/2 cups of flour for one batch. How much flour is needed for 2/3 of a batch? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1 and a half is 3 halves. 3 halves times 2 thirds is 6 sixths, which is 1 cup. Choice "D".', caption: '1 1/2 is 3/2. 3/2 × 2/3 = 6/6, which is 1 cup. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mixed number: make it **improper** first', 'Multiply **tops**, multiply **bottoms**', '"Half of" means $\\times \\tfrac12$', '**Simplify**, then write it as a mixed number'] }],
      lines: [
        { say: 'Here is what to remember. Before you multiply a mixed number, make it an improper fraction.', show: 'sum.0' },
        { say: 'Multiply the tops, and multiply the bottoms.', show: 'sum.1' },
        { say: 'Half of something means times 1 half.', show: 'sum.2' },
        { say: 'And simplify, then write the answer as a mixed number if you need to. For more on multiplying fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
