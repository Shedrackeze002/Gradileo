import { marbles } from '@/video/charts.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 9.3 (probability). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 5.5, Averages and Probability, CC BY-NC-SA 4.0). There are
// 5 + 3 = 8 candies and 5 are chocolate, so P = 5/8 = 0.625, as in the book's answer.
// Check: P(lemon) = 3/8 = 0.375, and 0.625 + 0.375 = 1.

const bowl = (height = 220) =>
  figure('bowl', [marbles({ groups: [{ id: 'choc', count: 5, tone: 'opp' }, { id: 'lemon', count: 3, tone: 'theta' }], perRow: 8 })], height);

const QUESTION =
  'A bowl of Halloween candy contains 5 chocolate candies and 3 lemon candies. Tanya will choose one piece of candy at random. (a) Find the probability Tanya will choose a chocolate candy. (b) Convert the fraction to a decimal.';

const video: Explainer = {
  id: 'xq-m104-9-3',
  lessonId: '',
  exam: {
    lesson: 'm104-9-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.5, Averages and Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-5-averages-and-probability',
    question: QUESTION,
  },
  title: 'Exam Question: The Chance of a Chocolate Candy (Probability)',
  thumbnailTitle: 'The Chance of a Chocolate Candy',
  thumbnail: 'bowl',
  summary:
    'A real test question, solved one small step at a time: a bowl holds 5 chocolate candies and 3 lemon candies, and Tanya picks one at random. What is the probability it is chocolate, as a fraction and as a decimal? There are 8 candies and 5 are chocolate, so the probability is 5/8, and 5 ÷ 8 = 0.625. Then we check with the lemon candies and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Chance of a Chocolate Candy', subtitle: 'Probability, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about probability. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A bowl of Halloween candy contains $5$ chocolate candies and $3$ lemon candies. Tanya will choose one piece of candy at random. (a) Find the probability Tanya will choose a chocolate candy. (b) Convert the fraction to a decimal.',
          answer: '(a) $\\dfrac{5}{8}$ (b) $0.625$',
          working: '$\\dfrac{5}{5 + 3} = \\dfrac{5}{8} = 0.625$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A bowl of Halloween candy contains 5 chocolate candies and 3 lemon candies. Tanya will choose one piece of candy at random. Find the probability Tanya will choose a chocolate candy. Then convert the fraction to a decimal.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bowl(), { kind: 'text', id: 't', size: 'md', md: '"At random" means every candy is **equally likely** to be picked.' }],
      lines: [
        { say: 'Here are the candies: 5 chocolate,', show: 'bowl.choc' },
        { say: 'and 3 lemon.', show: 'bowl.lemon' },
        { say: 'At random means Tanya does not look, so every candy is equally likely to be picked. We want the chance that she gets a chocolate one.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['P = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Out of the whole', md: 'The bottom is **all** the possible outcomes, not just the other ones. A probability is between **$0$** (impossible) and **$1$** (certain).' },
      ],
      lines: [
        { say: 'Here is what we need. The probability of an event is the number of outcomes we want, divided by the total number of outcomes.', show: 'f' },
        { say: 'The bottom counts all the possible outcomes, not just the other ones. And a probability is always between 0, impossible, and 1, certain.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **chocolate** candies', 'Count **all** the candies', 'Write the **fraction**, then **divide**'] }],
      lines: [
        { say: 'Here is the plan. Count the chocolate candies.', show: 'plan.0' },
        { say: 'Count all the candies.', show: 'plan.1' },
        { say: 'Write the fraction, then divide to get the decimal.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The fraction',
      layout: 'center',
      main: [bowl(200), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{chocolate} = 5, \\quad \\text{total} = 5 + 3 = 8', '\\text{(a) } P(\\text{chocolate}) = \\good{\\dfrac{5}{8}}'] }],
      lines: [
        { say: 'Step one. There are 5 chocolate candies, and 5 plus 3 makes 8 candies in all.', show: ['bowl.choc', 'bowl.lemon', 'm.0'] },
        { say: 'So the probability of chocolate is 5 out of 8: five eighths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\div 8 = \\good{0.625}'] }],
      lines: [
        { say: 'Step two. To change a fraction to a decimal, divide the top by the bottom. 5 divided by 8 is 0.625.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{lemon}) = \\dfrac{3}{8} = 0.375', '0.625 + 0.375 = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The chance of lemon is 3 out of 8, which is 0.375.', show: 'm.0' },
        { say: 'Tanya must get chocolate or lemon, so the two chances must add up to 1. 0.625 plus 0.375 is 1. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{5}{3}$', 'put the **other** candies on the bottom: use the **total**'],
            ['$\\dfrac{3}{8}$', 'that is the chance of **lemon**'],
            ['$0.58$', 'wrote the digits $5$ and $8$: **divide** $5$ by $8$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Five thirds compares chocolate with lemon. It is bigger than 1, which no probability can be. The bottom must be the total, 8.' },
        { say: 'Three eighths is the chance of a lemon candy, not chocolate.' },
        { say: 'And 0.58 just writes the two digits after a point. Divide 5 by 8 to get 0.625.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bag holds $3$ red marbles and $7$ blue marbles. One marble is picked at random. What is the probability it is red, as a decimal?',
          choices: ['$0.7$', '$0.43$', '$0.3$', '$3$'],
          answer: 2,
          working: '$\\dfrac{3}{3 + 7} = \\dfrac{3}{10} = 0.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds 3 red marbles and 7 blue marbles. One marble is picked at random. What is the probability it is red, as a decimal? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'There are 10 marbles, and 3 are red. 3 out of 10 is 0.3. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P = \\dfrac{\\text{favourable}}{\\text{total}}$', 'The bottom is **all** the outcomes', 'Decimal: **divide** top by bottom', 'All the chances add to **$1$**'] }],
      lines: [
        { say: 'Here is what to remember. Probability is the favourable outcomes over the total.', show: 'sum.0' },
        { say: 'The bottom counts all the outcomes, not just the others.', show: 'sum.1' },
        { say: 'To get a decimal, divide the top by the bottom.', show: 'sum.2' },
        { say: 'And all the chances add up to 1. For more on probability, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
