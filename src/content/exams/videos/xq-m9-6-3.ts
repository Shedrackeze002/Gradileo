import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squares } from '@/content/math8/videos/lib/m8-8-figures.ts';
import { tag } from '@/content/math9/videos/lib/m9-1-figures.ts';

// Exam question for Math 9 lesson 6.3 (solving problems with linear equations). The question is a
// Try It from OpenStax Elementary Algebra 2e, word for word (section 3.1, Use a Problem-Solving
// Strategy, CC BY-NC-SA 4.0). Let p be the original price: (2/3)p = 120, so p = 120 × 3/2 = 180.
// The original price was $180. Check: two thirds of $180 is $120.

const QUESTION = 'Joaquin bought a bookcase on sale for $120, which was two-thirds of the original price. What was the original price of the bookcase?';

// The original price p as three equal thirds; the sale price, $120, is two of them.
const bar = (id: string) =>
  figure(
    id,
    [
      squares({
        cells: [[0, 0], [1, 0], [2, 0]],
        tones: { 0: 'adj', 1: 'adj', 2: 'muted' },
        marks: { 0: '\\tfrac{1}{3}', 1: '\\tfrac{1}{3}', 2: '\\tfrac{1}{3}' },
        group: () => 'bar',
        label: '\\text{original price } p',
      }),
      tag('sale', [1, 1.15], '\\$120', { place: 'above', tone: 'adj' }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m9-6-3',
  lessonId: '',
  exam: {
    lesson: 'm9-6-3',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 3.1, Use a Problem-Solving Strategy',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/3-1-use-a-problem-solving-strategy',
    question: QUESTION,
  },
  title: 'Exam Question: The Bookcase on Sale (Solving Problems with Linear Equations)',
  thumbnailTitle: 'The Bookcase on Sale',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: Joaquin bought a bookcase on sale for $120, which was two-thirds of the original price. What was the original price? We let p be the original price and write the equation (2/3)p = 120. Multiplying both sides by 3/2 gives p = 180, so the original price was $180. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Bookcase on Sale', subtitle: 'Solving problems with linear equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving problems with linear equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Joaquin bought a bookcase on sale for \\$120, which was two-thirds of the original price. What was the original price of the bookcase?',
          answer: '\\$180',
          working: '(2/3)p = 120, so p = 120 × 3/2',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Joaquin bought a bookcase on sale for 120 dollars, which was two-thirds of the original price. What was the original price of the bookcase?', caption: 'Joaquin bought a bookcase on sale for $120, which was two-thirds of the original price. What was the original price of the bookcase?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [bar('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Original price', md: 'The **original price** is the price **before** the sale. The sale price, \\$120, is only **part** of it: two of its three equal thirds.' }],
      lines: [
        { say: 'Here is the original price as a bar, cut into three equal thirds. The sale price, 120 dollars, is two of those thirds.', caption: 'Here is the original price as a bar, cut into three equal thirds. The sale price, $120, is two of those thirds.', show: ['ask.bar', 'ask.label', 'ask.sale'] },
        { say: 'The original price is the price before the sale. That is the whole bar, which we want to find.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{"of" means multiply: } \\tfrac{2}{3} \\text{ of } p = \\tfrac{2}{3}p', '\\tfrac{3}{2} \\times \\tfrac{2}{3} = 1'] }],
      lines: [
        { say: 'Here is what we need. In maths, "of" means multiply. Two-thirds of "p" is two-thirds times "p".', show: 'm.0' },
        { say: 'And to undo multiplying by two-thirds, multiply by its reciprocal, three halves, because three halves times two-thirds is 1.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Name** the unknown: $p$', '**Translate** the sentence into an equation', '**Solve**, and answer in a sentence'] }],
      lines: [
        { say: 'Here is the plan. Name the unknown: let "p" be the original price.', show: 'plan.0' },
        { say: 'Translate the sentence into an equation.', show: 'plan.1' },
        { say: 'Solve it, and answer the question in a sentence.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Name, translate, solve',
      layout: 'split',
      leftWidth: 560,
      left: [bar('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['p = \\text{original price}', '\\tfrac{2}{3}p = 120', '\\tfrac{3}{2} \\cdot \\tfrac{2}{3}p = \\tfrac{3}{2} \\cdot 120', 'p = \\good{180}'] }],
      lines: [
        { say: 'Here is the bar again.', show: ['st.bar', 'st.label', 'st.sale'] },
        { say: 'Step one. Let "p" be the original price.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The sentence says 120 dollars was two-thirds of the original price. So two-thirds times "p" equals 120.', caption: 'Step two. The sentence says $120 was two-thirds of the original price. So two-thirds times p equals 120.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Multiply both sides by three halves. On the left, that leaves "p". On the right, 120 divided by 2 is 60, and 60 times 3 is 180.', show: 'm.2', focus: 'm.2' },
        { say: 'So "p" is 180. The original price of the bookcase was 180 dollars.', caption: 'So p is 180. The original price of the bookcase was $180.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{3} \\text{ of } 180 = 60', '\\tfrac{2}{3} \\text{ of } 180 = 2 \\times 60 = 120 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. One third of 180 is 60.', show: 'm.0', focus: 'm.0' },
        { say: 'So two-thirds of 180 is 2 times 60, which is 120. That is the sale price. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$80', 'took two-thirds **of** \\$120: \\$120 is the part, not the whole'],
            ['\\$200', 'added two-thirds of \\$120: the original is \\$120 **÷** two-thirds'],
            ['\\$360', 'multiplied by $3$ only: one third is \\$60, so the whole is \\$180'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '80 dollars takes two-thirds of 120. But 120 dollars is already the part. We need the whole.', caption: '$80 takes two-thirds of $120. But $120 is already the part. We need the whole.' },
        { say: '200 dollars adds two-thirds of 120 to 120. That is not how the sale works. The original price is 120 divided by two-thirds.', caption: '$200 adds two-thirds of $120 to $120. That is not how the sale works. The original price is $120 ÷ two-thirds.' },
        { say: 'And 360 dollars multiplies 120 by 3. But 120 is two thirds, not one third. One third is 60, so the whole is 180.', caption: 'And $360 multiplies 120 by 3. But $120 is two thirds, not one third. One third is $60, so the whole is $180.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Three-fourths of the students in a class walk to school. If $18$ students walk, how many students are in the class?',
          choices: ['$13.5$', '$72$', '$32$', '$24$'],
          answer: 3,
          working: '(3/4)s = 18, so s = 18 × 4/3 = 24.',
        },
      ],
      lines: [
        { say: 'Your turn. Three-fourths of the students in a class walk to school. If 18 students walk, how many students are in the class? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Three-fourths times "s" equals 18. Multiply both sides by four thirds: 18 divided by 3 is 6, and 6 times 4 is 24 students. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Name** the unknown', '"Of" means **multiply**', 'Undo a fraction with its **reciprocal**', 'Answer in a **sentence**, and check'] }],
      lines: [
        { say: 'Here is what to remember. Name the unknown with a letter.', show: 'sum.0' },
        { say: 'In a word problem, "of" means multiply.', show: 'sum.1' },
        { say: 'To undo multiplying by a fraction, multiply by its reciprocal.', show: 'sum.2' },
        { say: 'And answer the question in a sentence, then check it. For more on solving problems with linear equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
