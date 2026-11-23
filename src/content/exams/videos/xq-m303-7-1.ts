import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 7.1 (probability and odds). The question is a "Your Turn"
// from OpenStax Contemporary Mathematics, word for word (section 7.5, Basic Concepts of
// Probability, CC BY-NC-SA 4.0), including its "Jesse" for Jessie. The empirical probability is the
// share of past cases where the event happened: 13/1,000 = 0.013 = 1.3%, as in the book's answer.

const QUESTION =
  'Jessie is in charge of quality control at a factory manufacturing SUVs. Today, she’s checking the placement of the taillight housing. Of the last thousand units off the line, 13 had faulty placement. What empirical probability might Jesse assign to the next vehicle coming off the line having bad placement?';

const video: Explainer = {
  id: 'xq-m303-7-1',
  lessonId: '',
  exam: {
    lesson: 'm303-7-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.5, Basic Concepts of Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-5-basic-concepts-of-probability',
    question: QUESTION,
  },
  title: 'Exam Question: The Empirical Probability of a Faulty Taillight (Probability and Odds)',
  thumbnailTitle: 'The Chance of a Faulty Taillight',
  thumbnail: 'kinds',
  summary:
    'A real test question, solved one small step at a time: of the last 1,000 SUVs off a factory line, 13 had a faulty taillight housing. What empirical probability should the next one get? An empirical probability comes from what has already happened: 13 out of 1,000, which is 0.013 or 1.3%. Then we check what that means for the next 1,000 vehicles and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Chance of a Faulty Taillight', subtitle: 'Probability and odds, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about probability. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '$\\dfrac{13}{1{,}000} = 0.013 = 1.3\\%$',
          working: 'Empirical: the number of faulty units over the number checked.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Jessie is in charge of quality control at a factory manufacturing SUVs. Today, she’s checking the placement of the taillight housing. Of the last thousand units off the line, 13 had faulty placement. What empirical probability might Jessie assign to the next vehicle coming off the line having bad placement?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We cannot work out the chance from a rule. We **look back** at what happened to the last $1{,}000$ SUVs and use that to predict the **next** one.' }],
      lines: [
        { say: 'There is no rule like a fair coin or a die to tell us the chance of a faulty taillight.', show: 't' },
        { say: 'So we look back at what happened to the last 1,000 SUVs, and use it to predict the next one.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Kind of probability', 'Where it comes from'],
          rows: [
            ['theoretical', 'equally likely outcomes, like a fair die'],
            ['**empirical**', 'what **happened** in past trials'],
            ['subjective', 'a personal judgement'],
          ],
        },
        { kind: 'math', id: 'f', size: 'lg', lines: ['P(E) = \\dfrac{\\text{times } E \\text{ happened}}{\\text{number of trials}}'] },
      ],
      lines: [
        { say: 'Here is what we need. There are three kinds of probability. A theoretical probability comes from equally likely outcomes, like a fair die. A subjective one is a personal judgement.', show: 'kinds' },
        { say: 'An empirical probability comes from what happened in past trials: the number of times the event happened, over the number of trials.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **faulty** units', 'Count **all** the units checked', '**Divide**, and write it as a percent'] }],
      lines: [
        { say: 'Here is the plan. First, count the faulty units.', show: 'plan.0' },
        { say: 'Second, count all the units checked.', show: 'plan.1' },
        { say: 'Third, divide, and write it as a percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Faulty units',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{faulty} = \\good{13}'] }],
      lines: [
        { say: 'Step one. 13 units had faulty placement. That is the number of times the event happened.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: All units',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{trials} = \\good{1{,}000}'] }],
      lines: [
        { say: 'Step two. She looked at the last thousand units, so there were 1,000 trials.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{bad placement}) = \\dfrac{13}{1{,}000}', '= 0.013 = \\good{1.3\\%}'] }],
      lines: [
        { say: 'Step three. The empirical probability is 13 over 1,000.', show: 'm.0' },
        { say: 'That is 0.013, or 1.3%.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0 \\le 0.013 \\le 1 \\ \\checkmark', '0.013 \\times 1{,}000 = 13 \\text{ faulty expected} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. A probability must be between 0 and 1, and 0.013 is.', show: 'm.0' },
        { say: 'And if the line keeps going the same way, the next 1,000 SUVs should have about 0.013 times 1,000, which is 13, faulty ones. That matches what happened. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$13\\%$', '$\\dfrac{13}{1{,}000}$ is $0.013$, which is $1.3\\%$'],
            ['$\\dfrac{987}{1{,}000}$', 'that is the chance of **good** placement'],
            ['$\\dfrac{13}{987}$', 'that is the **odds** for: divide by **all** $1{,}000$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '13 out of 1,000 is not 13%. 13% would be 13 out of 100. It is 1.3%.' },
        { say: '987 out of 1,000 is the chance of good placement, the opposite event.' },
        { say: 'And 13 over 987 compares faulty to good, which is the odds. A probability divides by all 1,000.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A hockey player scored in $46$ of her last $200$ games. What empirical probability might she assign to scoring in her next game?',
          choices: ['$46\\%$', '$4.6\\%$', '$2.3\\%$', '$23\\%$'],
          answer: 3,
          working: '$\\dfrac{46}{200} = 0.23 = 23\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. A hockey player scored in 46 of her last 200 games. What empirical probability might she assign to scoring in her next game? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '46 over 200 is 0.23, which is 23%: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Empirical probability comes from **past** trials', '$P = \\dfrac{\\text{times it happened}}{\\text{number of trials}}$', 'Divide by **all** the trials', 'Check: between $0$ and $1$'] }],
      lines: [
        { say: 'Here is what to remember. An empirical probability comes from past trials.', show: 'sum.0' },
        { say: 'It is the number of times the event happened, over the number of trials.', show: 'sum.1' },
        { say: 'Divide by all the trials, not just the ones where it did not happen.', show: 'sum.2' },
        { say: 'And check that the answer is between 0 and 1. For more on probability and odds, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
