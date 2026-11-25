import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 3.1 (odds and probability). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 7.7, What Are the Odds?, CC BY-NC-SA
// 4.0). P(E) = 0.8 and P(not E) = 0.2, so the odds for E are 0.8 : 0.2 = 4 : 1 and the odds against
// are 1 : 4, as in the book's solution. The check pictures 5 equally likely outcomes, 4 of them in E.

const QUESTION = 'If the probability of an event E is 80%, find the odds for and the odds against E.';

const video: Explainer = {
  id: 'xq-m302-3-1',
  lessonId: '',
  exam: {
    lesson: 'm302-3-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.7, What Are the Odds?',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-7-what-are-the-odds',
    question: QUESTION,
  },
  title: 'Exam Question: From an 80% Probability to Odds (Odds and Probability)',
  thumbnailTitle: 'From 80% to Odds',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: if the probability of an event E is 80%, what are the odds for and against E? Odds compare the chance it happens with the chance it does not: 0.8 : 0.2, which simplifies to 4 : 1 for, and 1 : 4 against. Then we check with 5 equally likely outcomes and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'From 80% to Odds', subtitle: 'Odds and probability, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about odds and probability. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If the probability of an event $E$ is $80\\%$, find the odds for and the odds against $E$.',
          answer: 'Odds for $4 : 1$; odds against $1 : 4$',
          working: '$0.8 : 0.2 = 4 : 1$, and against is the reverse.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'If the probability of an event E is 80 percent, find the odds for and the odds against E.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A **probability** compares the event with **all** outcomes. **Odds** compare the event happening with it **not** happening. We change one into the other.' }],
      lines: [
        { say: 'A probability compares the event with all the outcomes.', show: 't' },
        { say: 'Odds compare the event happening with it not happening. We need to change the probability into odds, both ways round.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'odds', tone: 'definition', title: 'Odds', md: 'Odds **for** $E$ $= P(E) : P(\\text{not } E)$. Odds **against** $E$ $= P(\\text{not } E) : P(E)$.' },
        { kind: 'callout', id: 'comp', tone: 'key', title: 'The complement', md: '$P(\\text{not } E) = 1 - P(E)$' },
      ],
      lines: [
        { say: 'Here is what we need. The odds for E are the probability of E, compared with the probability of not E. The odds against are the same two numbers the other way round.', show: 'odds' },
        { say: 'And the probability of not E is 1 minus the probability of E.', show: 'comp' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $P(\\text{not } E)$', 'Write the odds **for** and simplify', '**Reverse** for the odds against'] }],
      lines: [
        { say: 'Here is the plan. First, find the probability of not E.', show: 'plan.0' },
        { say: 'Second, write the odds for E and simplify the ratio.', show: 'plan.1' },
        { say: 'Third, reverse it for the odds against.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Not E',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(E) = 80\\% = 0.8', 'P(\\text{not } E) = 1 - 0.8 = \\good{0.2}'] }],
      lines: [
        { say: 'Step one. 80 percent is 0.8 as a decimal.', show: 'm.0' },
        { say: 'So the probability that E does not happen is 1 minus 0.8, which is 0.2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Odds for',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.8 : 0.2', '= 8 : 2 = \\good{4 : 1}'] }],
      lines: [
        { say: 'Step two. The odds for E are 0.8 to 0.2.', show: 'm.0' },
        { say: 'Multiply both by 10 to clear the decimals: 8 to 2. Then divide both by 2: 4 to 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Odds against',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{for: } 4 : 1', '\\text{against: } \\good{1 : 4}'] }],
      lines: [
        { say: 'Step three. The odds for E are 4 to 1.', show: 'm.0' },
        { say: 'The odds against E are the same numbers reversed: 1 to 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\good{E} \\quad \\good{E} \\quad \\good{E} \\quad \\good{E} \\quad \\bad{\\text{not } E}', 'P(E) = \\dfrac{4}{4 + 1} = \\dfrac{4}{5} = 80\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Odds of 4 to 1 mean: for every 4 outcomes where E happens, there is 1 where it does not. Picture 5 equally likely outcomes, 4 in E.', show: 'm.0' },
        { say: 'Then the probability of E is 4 out of 4 plus 1, which is 4 fifths, or 80 percent. That is the probability we started with, so it checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$4 : 5$', 'odds compare with **not** $E$, not with all outcomes'],
            ['against $4 : 1$', '**against** puts not $E$ first: $1 : 4$'],
            ['$0.8 : 1$', 'compare $P(E)$ with $P(\\text{not } E) = 0.2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 to 5 compares the event with all the outcomes. That is a probability, not odds.' },
        { say: 'Odds against put not E first, so they are 1 to 4.' },
        { say: 'And 0.8 to 1 compares with the whole. Odds compare with the probability of not E, which is 0.2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The odds against winning a prize are $7 : 3$. What is the probability of winning?',
          choices: ['$\\dfrac{7}{10}$', '$\\dfrac{3}{7}$', '$\\dfrac{3}{10}$', '$\\dfrac{7}{3}$'],
          answer: 2,
          working: 'Odds for winning: $3 : 7$, so $P = \\dfrac{3}{3 + 7} = \\dfrac{3}{10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The odds against winning a prize are 7 to 3. What is the probability of winning? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The odds for winning are 3 to 7. So the probability is 3 out of 3 plus 7, which is 3 tenths: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Odds for $= P(E) : P(\\text{not } E)$', 'Odds against: the **reverse**', 'Simplify the ratio to whole numbers', 'Odds for $a : b$ give $P(E) = \\dfrac{a}{a + b}$'] }],
      lines: [
        { say: 'Here is what to remember. The odds for E compare the probability of E with the probability of not E.', show: 'sum.0' },
        { say: 'The odds against are the reverse.', show: 'sum.1' },
        { say: 'Simplify the ratio to whole numbers.', show: 'sum.2' },
        { say: 'And to go back, odds for of "a" to b give a probability of "a" over "a" plus b. For more on odds and probability, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
