import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 5.3 (solving equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.7, Solve a Formula for a Specific Variable,
// CC BY-NC-SA 4.0). 770 = 70t, so t = 770 ÷ 70 = 11 hours, as in the book's answer.
// Check: 70 × 11 = 770.

const QUESTION =
  'Lee wants to drive from Phoenix to his brother’s apartment in San Francisco, a distance of 770 miles. If he drives at a steady rate of 70 miles per hour, how many hours will the trip take?';

const video: Explainer = {
  id: 'xq-m104-5-3',
  lessonId: '',
  exam: {
    lesson: 'm104-5-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.7, Solve a Formula for a Specific Variable',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-7-solve-a-formula-for-a-specific-variable',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Drive? (Solving Equations)',
  thumbnailTitle: 'How Long Is the Drive?',
  summary:
    'A real test question, solved one small step at a time: Lee drives 770 miles from Phoenix to San Francisco at a steady 70 miles per hour. How many hours will the trip take? We put the numbers into d = rt to get the equation 770 = 70t, then divide both sides by 70: t = 11 hours. Then we check by multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Drive?', subtitle: 'Solving equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Lee wants to drive from Phoenix to his brother’s apartment in San Francisco, a distance of $770$ miles. If he drives at a steady rate of $70$ miles per hour, how many hours will the trip take?',
          answer: '$11$ hours',
          working: '$770 = 70t$, so $t = 770 \\div 70 = 11$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Lee wants to drive from Phoenix to his brother\'s apartment in San Francisco, a distance of 770 miles. If he drives at a steady rate of 70 miles per hour, how many hours will the trip take?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['d = 770 \\text{ mi}, \\quad r = 70 \\text{ mi/h}, \\quad t = \\ ?'] },
        { kind: 'text', id: 't', size: 'md', md: 'This time we know the **distance** and the **rate**. The **time** is missing.' },
      ],
      lines: [
        { say: 'We know the distance, 770 miles, and the rate, 70 miles per hour.', show: 'm' },
        { say: 'This time, the missing number is the time.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['d = r \\times t'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Undo the multiplication', md: 'When the unknown is **multiplied** by a number, **divide both sides** by that number. The equation stays balanced, and the unknown is left on its own.' },
      ],
      lines: [
        { say: 'Here is what we need: distance equals rate times time.', show: 'f' },
        { say: 'If the unknown is multiplied by a number, divide both sides of the equation by that number. The equation stays balanced, and the unknown is left on its own.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Substitute** into $d = rt$', '**Divide** both sides by $70$', '**Check** by multiplying'] }],
      lines: [
        { say: 'Here is the plan. Substitute the numbers into the formula, to get an equation.', show: 'plan.0' },
        { say: 'Divide both sides by 70.', show: 'plan.1' },
        { say: 'Then check by multiplying.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = r \\times t', '770 = 70t'] }],
      lines: [
        { say: 'Step one. Start from d equals r times t.', show: 'm.0' },
        { say: 'Put in 770 for the distance and 70 for the rate. The equation is 770 equals 70 t.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{770}{70} = \\dfrac{70t}{70}', '\\good{t = 11 \\text{ hours}}'] }],
      lines: [
        { say: 'Step two. t is multiplied by 70, so divide both sides by 70.', show: 'm.0' },
        { say: '770 divided by 70 is 11, and on the right, t is left on its own. The trip will take 11 hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['70 \\times 11 = 770 \\text{ miles} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Driving 70 miles every hour for 11 hours covers 70 times 11, which is 770 miles. That is the whole trip. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$53{,}900$', '**multiplied**: undo a multiplication by **dividing**'],
            ['$0.09$', 'divided the **wrong way**: $70 \\div 770$'],
            ['$700$', '**subtracted** $70$: $t$ is multiplied, not added'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '53 thousand 900 multiplies 770 by 70. To undo a multiplication, divide.' },
        { say: '0.09 divides 70 by 770, the wrong way round. A trip of less than one tenth of an hour cannot be right.' },
        { say: 'And 700 takes away 70. But t is multiplied by 70, not added to it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cyclist rides $45$ km at a steady $15$ km/h. How many hours does the ride take?',
          choices: ['$675$ h', '$3$ h', '$30$ h', '$0.33$ h'],
          answer: 1,
          working: '$45 = 15t$, so $t = 45 \\div 15 = 3$ hours.',
        },
      ],
      lines: [
        { say: 'Your turn. A cyclist rides 45 kilometres at a steady 15 kilometres per hour. How many hours does the ride take? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '45 equals 15 t. Divide both sides by 15, and t is 3 hours. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put what you know into the **formula**', 'Multiplied unknown: **divide** both sides', 'Divide the **distance** by the **rate**', 'Check by **multiplying** back'] }],
      lines: [
        { say: 'Here is what to remember. Put what you know into the formula, to get an equation.', show: 'sum.0' },
        { say: 'If the unknown is multiplied by a number, divide both sides by it.', show: 'sum.1' },
        { say: 'Here that means the distance divided by the rate.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on solving equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
