import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 9.3 (probability). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 5.5, Averages and Probability, CC BY-NC-SA 4.0). There are
// 10 + 4 = 14 colleges, 10 of them out of state, so P = 10/14 = 5/7 = 0.714285... ≈ 0.714, as in the
// book's answer. Check: P(in state) = 4/14 = 2/7, and 5/7 + 2/7 = 1.

const QUESTION =
  'Donovan is considering transferring to a 4-year college. He is considering 10 out-of state colleges and 4 colleges in his state. He will choose one college at random to visit during spring break. Find the probability that Donovan will choose an out-of-state college.';

const video: Explainer = {
  id: 'xq-m204-9-3',
  lessonId: '',
  exam: {
    lesson: 'm204-9-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.5, Averages and Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-5-averages-and-probability',
    question: QUESTION,
  },
  title: 'Exam Question: Picking a College at Random (Probability)',
  thumbnailTitle: 'What Are the Chances?',
  summary:
    'A real test question, solved one small step at a time: Donovan is choosing at random between 10 out-of-state colleges and 4 colleges in his own state. What is the probability he picks an out-of-state college? There are 14 colleges in all, so the probability is 10/14 = 5/7 ≈ 0.714. Then we check that the two probabilities add to 1, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Are the Chances?', subtitle: 'Probability, step by step' }],
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
          prompt:
            'Donovan is considering transferring to a 4-year college. He is considering $10$ out-of state colleges and $4$ colleges in his state. He will choose one college at random to visit during spring break. Find the probability that Donovan will choose an out-of-state college.',
          answer: '$\\tfrac{5}{7} \\approx 0.714$',
          working: '10 ÷ (10 + 4) = 10/14 = 5/7 ≈ 0.714',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Donovan is thinking of transferring to a 4-year college. He is considering 10 colleges out of his state, and 4 colleges in his state. He will choose one college at random to visit. Find the probability that he chooses an out-of-state college.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'At random', md: '**At random** means every college has the **same chance** of being picked. The **probability** says how likely an event is, from $0$ (impossible) to $1$ (certain).' }],
      lines: [
        { say: 'At random means every one of the colleges has the same chance of being picked.', show: 'c' },
        { say: 'A probability says how likely something is. It goes from 0, impossible, to 1, certain.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}'] }],
      lines: [
        { say: 'Here is what we need. The probability of an event is the number of favourable outcomes, the ones we want, divided by the total number of outcomes.', show: 'm' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **favourable** outcomes', 'Count **all** the outcomes', '**Divide**, simplify, and write as a decimal'] }],
      lines: [
        { say: 'Here is the plan. Count the favourable outcomes: the out-of-state colleges.', show: 'plan.0' },
        { say: 'Count all the outcomes: every college he might pick.', show: 'plan.1' },
        { say: 'Then divide, simplify, and write the answer as a decimal too.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The probability',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{favourable} = 10', '\\text{total} = 10 + 4 = 14', 'P = \\dfrac{10}{14} = \\good{\\dfrac{5}{7}} \\approx \\good{0.714}'] }],
      lines: [
        { say: 'Step one. The favourable outcomes are the out-of-state colleges. There are 10.', show: 'm.0' },
        { say: 'Step two. The total is every college he might pick: 10 out of state plus 4 in state, which is 14.', show: 'm.1' },
        { say: 'Step three. The probability is 10 fourteenths. Divide the top and bottom by 2 to get 5 sevenths. As a decimal, 5 divided by 7 is 0.714, to the nearest thousandth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{in state}) = \\dfrac{4}{14} = \\dfrac{2}{7}', '\\dfrac{5}{7} + \\dfrac{2}{7} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The probability that he picks a college in his own state is 4 fourteenths, which is 2 sevenths.', show: 'm.0' },
        { say: 'He must pick one or the other, so the two probabilities must add to 1. 5 sevenths plus 2 sevenths is 7 sevenths, which is 1. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\tfrac{10}{4} = 2.5$', 'divided by the **other** group: divide by the **total**, $14$'],
            ['$\\tfrac{4}{14}$', 'that is the chance of an **in-state** college'],
            ['$\\tfrac{1}{14}$', 'that is the chance of **one particular** college'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 quarters, or 2.5, compares the two groups. A probability can never be more than 1. Divide by the total, 14.' },
        { say: '4 fourteenths is the chance of an in-state college, not an out-of-state one.' },
        { say: 'And 1 fourteenth is the chance of picking one particular college. Any of the 10 out-of-state colleges will do.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A box of $30$ parts has $3$ that are faulty. A worker picks one part at random. What is the probability that it is faulty?',
          choices: ['$\\tfrac{3}{27}$', '$\\tfrac{1}{30}$', '$\\tfrac{9}{10}$', '$\\tfrac{1}{10}$'],
          answer: 3,
          working: '3 ÷ 30 = 1/10.',
        },
      ],
      lines: [
        { say: 'Your turn. A box of 30 parts has 3 that are faulty. A worker picks one part at random. What is the probability that it is faulty? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3 favourable outcomes out of 30 in total: 3 thirtieths, which is 1 tenth. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P = $ favourable $\\div$ **total**', 'A probability is from **$0$** to **$1$**', '**Simplify** the fraction', 'All the outcomes’ probabilities add to **$1$**'] }],
      lines: [
        { say: 'Here is what to remember. A probability is the number of favourable outcomes, divided by the total.', show: 'sum.0' },
        { say: 'It is always between 0 and 1.', show: 'sum.1' },
        { say: 'Simplify the fraction.', show: 'sum.2' },
        { say: 'And the probabilities of all the possible outcomes add up to 1. For more on probability, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
