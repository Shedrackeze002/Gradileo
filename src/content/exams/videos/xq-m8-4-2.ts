import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fitBar, pieces } from '@/content/math8/videos/lib/m8-4-figures.ts';

// Exam question for Math 8 lesson 4.2 (dividing fractions). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 4.2, Multiply and Divide Fractions, CC BY-NC-SA
// 4.0). 5 ÷ 1/4 = 5 × 4 = 20 bags.

const QUESTION =
  'Don purchased a bulk package of candy that weighs 5 pounds. He wants to sell the candy in little bags that hold 1/4 pound. How many little bags of candy can he fill from the bulk package?';

const bulk = (id: string) => figure(id, [fitBar({ total: 5, piece: 0.25, den: 4, scale: true, numbers: true })], 240);

const video: Explainer = {
  id: 'xq-m8-4-2',
  lessonId: '',
  exam: {
    lesson: 'm8-4-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.2, Multiply and Divide Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-2-multiply-and-divide-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Don’s Bags of Candy (Dividing Fractions)',
  thumbnailTitle: 'Don’s Bags of Candy',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Don has a 5-pound package of candy and wants to fill little bags that hold 1/4 pound each. How many bags can he fill? We want to know how many quarter-pounds fit into 5 pounds, which is 5 ÷ 1/4. Dividing by a fraction is the same as multiplying by its reciprocal, so 5 ÷ 1/4 = 5 × 4 = 20 bags. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Don’s Bags of Candy', subtitle: 'Dividing fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Don purchased a bulk package of candy that weighs $5$ pounds. He wants to sell the candy in little bags that hold $\\tfrac14$ pound. How many little bags of candy can he fill from the bulk package?',
          answer: '$20$ bags',
          working: '5 ÷ 1/4 = 5 × 4 = 20',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Don purchased a bulk package of candy that weighs 5 pounds. He wants to sell the candy in little bags that hold a quarter of a pound. How many little bags of candy can he fill from the bulk package?', caption: 'Don purchased a bulk package of candy that weighs 5 pounds. He wants to sell the candy in little bags that hold 1/4 pound. How many little bags of candy can he fill from the bulk package?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bulk('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'How many fit?', md: 'A **bulk** package is one big package. We want to know how many $\\tfrac14$-pound bags **fit into** $5$ pounds. "How many fit into" is a **division**: $5 \\div \\tfrac14$.' }],
      lines: [
        { say: 'A bulk package is one big package. Here are Don\'s 5 pounds of candy.', show: 'ask.frame' },
        { say: 'Each little bag holds a quarter of a pound. How many quarter-pounds fit into 5 pounds? "How many fit into" is a division: 5 divided by 1 quarter.', caption: 'Each little bag holds 1/4 pound. How many quarter-pounds fit into 5 pounds? "How many fit into" is a division: 5 ÷ 1/4.', show: ['ask.scale', 'c'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a \\div \\dfrac{b}{c} = a \\times \\dfrac{c}{b}', '\\text{the reciprocal of } \\dfrac14 \\text{ is } \\dfrac41 = 4'] }],
      lines: [
        { say: 'Here is what we need. To divide by a fraction, multiply by its reciprocal: the fraction turned upside down.', show: 'm.0' },
        { say: 'The reciprocal of 1 quarter is 4 over 1, which is 4.', caption: 'The reciprocal of 1/4 is 4/1, which is 4.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **division**: $5 \\div \\tfrac14$', 'Multiply by the **reciprocal**', 'Answer in **bags**'] }],
      lines: [
        { say: 'Here is the plan. Write the division: 5 divided by 1 quarter.', caption: 'Here is the plan. Write the division: 5 ÷ 1/4.', show: 'plan.0' },
        { say: 'Multiply by the reciprocal.', show: 'plan.1' },
        { say: 'Then give the answer in bags.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide by a quarter',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\div \\adj{\\dfrac14}', '= 5 \\times \\dfrac41 = 5 \\times 4', '= \\good{20 \\text{ bags}}'] }],
      lines: [
        { say: 'Step one. The number of bags is 5 divided by 1 quarter.', caption: 'Step one. The number of bags is 5 ÷ 1/4.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Dividing by 1 quarter is the same as multiplying by 4. That makes sense: each pound fills 4 quarter-pound bags.', caption: 'Step two. Dividing by 1/4 is the same as multiplying by 4. That makes sense: each pound fills 4 quarter-pound bags.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 5 times 4 is 20. Don can fill 20 little bags.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bulk('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['20 \\times \\dfrac14 = \\dfrac{20}{4} = 5 \\text{ pounds} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Count the quarter-pound bags in the 5 pounds: 4 in each pound, 20 in all.', show: ['ck.frame', 'ck.scale', ...pieces('ck', 20)] },
        { say: '20 bags of a quarter of a pound each make 20 quarters, which is 5 pounds: all of the candy. It checks out.', caption: '20 bags of 1/4 pound each make 20/4, which is 5 pounds: all of the candy. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$1\\tfrac14$', 'multiplied by $\\tfrac14$: dividing by $\\tfrac14$ means **times** $4$'],
            ['$\\tfrac{1}{20}$', 'divided the **wrong way**: the package $\\div$ the bag'],
            ['$4$', 'counted **one** pound: each of the $5$ pounds fills $4$ bags'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 and a quarter is 5 times 1 quarter. That is the weight of 5 bags, not the number of bags. Dividing by 1 quarter means times 4.', caption: '1 1/4 is 5 × 1/4. That is the weight of 5 bags, not the number of bags. Dividing by 1/4 means times 4.' },
        { say: '1 twentieth divides a quarter by 5. Divide the package by the size of a bag.', caption: '1/20 divides 1/4 by 5. Divide the package by the size of a bag.' },
        { say: 'And 4 is the bags from just one pound. Each of the 5 pounds fills 4 bags.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many servings of $\\tfrac23$ cup are in $6$ cups of rice?',
          choices: ['$4$', '$9$', '$12$', '$\\tfrac19$'],
          answer: 1,
          working: '6 ÷ 2/3 = 6 × 3/2 = 18/2 = 9 servings.',
        },
      ],
      lines: [
        { say: 'Your turn. How many servings of 2 thirds of a cup are in 6 cups of rice? Pause the video and try it.', caption: 'Your turn. How many servings of 2/3 cup are in 6 cups of rice? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '6 divided by 2 thirds is 6 times 3 halves, which is 18 halves, or 9. There are 9 servings. Choice "B".', caption: '6 ÷ 2/3 = 6 × 3/2 = 18/2 = 9. There are 9 servings. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"How many fit into" means **divide**', 'Dividing by a fraction: multiply by its **reciprocal**', 'Dividing by $\\tfrac14$ means **times** $4$', 'Check: multiply back'] }],
      lines: [
        { say: 'Here is what to remember. "How many fit into" means divide.', show: 'sum.0' },
        { say: 'To divide by a fraction, multiply by its reciprocal.', show: 'sum.1' },
        { say: 'So dividing by 1 quarter means times 4.', caption: 'So dividing by 1/4 means times 4.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on dividing fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
