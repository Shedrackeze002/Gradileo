import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 7.2 (probability of combined events). The question is a "Your
// Turn" from OpenStax Contemporary Mathematics, word for word (section 7.5, Basic Concepts of
// Probability, CC BY-NC-SA 4.0). Two 4-sided dice give 16 equally likely outcomes; a sum of 6 comes
// 3 ways and a sum of 7 comes 2 ways, and the two events cannot happen together, so
// P(6 or 7) = 3/16 + 2/16 = 5/16, as in the book's answer.

const QUESTION =
  'If you roll a pair of 4-sided dice with faces labeled with the numbers 1 through 4, what is the probability of rolling a sum of 6 or 7?';

const S = (a: number, b: number) => (a + b === 6 || a + b === 7 ? `$\\good{${a + b}}$` : `$${a + b}$`);
const SUMS = [1, 2, 3, 4].map((a) => [`$${a}$`, ...[1, 2, 3, 4].map((b) => S(a, b))]);

const video: Explainer = {
  id: 'xq-m303-7-2',
  lessonId: '',
  exam: {
    lesson: 'm303-7-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.5, Basic Concepts of Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-5-basic-concepts-of-probability',
    question: QUESTION,
  },
  title: 'Exam Question: A Sum of 6 or 7 With Two 4-Sided Dice (Probability of Combined Events)',
  thumbnailTitle: 'A Sum of 6 or 7',
  thumbnail: 'sums',
  summary:
    'A real test question, solved one small step at a time: roll two 4-sided dice. What is the probability of a sum of 6 or 7? A table of all 16 equally likely outcomes shows 3 ways to make 6 and 2 ways to make 7. The two events cannot happen together, so we add: 3/16 + 2/16 = 5/16. Then we check by listing the outcomes and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Sum of 6 or 7', subtitle: 'Probability of combined events, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about combined events. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$P(6 \\text{ or } 7) = \\dfrac{5}{16}$',
          working: '$16$ outcomes; $3$ give a sum of $6$ and $2$ give a sum of $7$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'If you roll a pair of 4-sided dice with faces labeled with the numbers 1 through 4, what is the probability of rolling a sum of 6 or 7?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Two dice, each showing $1$ to $4$. Add the two numbers. How likely is it that the sum is $6$ **or** $7$?' }],
      lines: [
        { say: 'We roll two dice, each showing a number from 1 to 4, and add the two numbers.', show: 't' },
        { say: 'We want the probability that the sum is 6, or that it is 7.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['P(E) = \\dfrac{n(E)}{n(S)}'] },
        { kind: 'callout', id: 'me', tone: 'key', title: 'Mutually exclusive events', md: 'If $A$ and $B$ **cannot** happen together: $\\ P(A \\text{ or } B) = P(A) + P(B)$.' },
      ],
      lines: [
        { say: 'Here is what we need. When all outcomes are equally likely, the probability of an event is the number of outcomes in the event, over the number in the sample space.', show: 'f' },
        { say: 'And if two events cannot happen together, the probability of one or the other is the sum of their probabilities.', show: 'me' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List **all** the outcomes in a table', 'Count the ways to get $6$ and to get $7$', '**Add** the probabilities'] }],
      lines: [
        { say: 'Here is the plan. First, list all the outcomes in a table.', show: 'plan.0' },
        { say: 'Second, count the ways to get 6, and the ways to get 7.', show: 'plan.1' },
        { say: 'Third, add the probabilities.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: All the outcomes',
      layout: 'center',
      main: [{ kind: 'table', id: 'sums', head: ['1st die \\ 2nd die', '$1$', '$2$', '$3$', '$4$'], rows: SUMS }],
      lines: [
        { say: 'Step one. Each row is the first die, and each column is the second die. Each box shows the sum.', show: 'sums' },
        { say: 'There are 4 times 4, which is 16 boxes, and each one is equally likely.' },
      ],
    },
    {
      chapter: 'Step 2: Count',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6: \\ (2, 4), (3, 3), (4, 2) \\ \\to \\ \\good{3}', '7: \\ (3, 4), (4, 3) \\ \\to \\ \\good{2}'] }],
      lines: [
        { say: 'Step two. A sum of 6 comes from 2 and 4, 3 and 3, or 4 and 2. That is 3 ways.', show: 'm.0' },
        { say: 'A sum of 7 comes from 3 and 4, or 4 and 3. That is 2 ways.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(6 \\text{ or } 7) = \\dfrac{3}{16} + \\dfrac{2}{16}', '= \\good{\\dfrac{5}{16}} = 0.3125'] }],
      lines: [
        { say: 'Step three. The sum cannot be 6 and 7 at the same time, so the events are mutually exclusive, and we add: 3 sixteenths plus 2 sixteenths.', show: 'm.0' },
        { say: 'That is 5 sixteenths, or 0.3125.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2{:}\\,1, \\ 3{:}\\,2, \\ 4{:}\\,3, \\ 5{:}\\,4, \\ 6{:}\\,3, \\ 7{:}\\,2, \\ 8{:}\\,1', '1 + 2 + 3 + 4 + 3 + 2 + 1 = 16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting every sum. A sum of 2 comes 1 way, 3 comes 2 ways, 4 comes 3 ways, 5 comes 4 ways, 6 comes 3 ways, 7 comes 2 ways, and 8 comes 1 way.', show: 'm.0' },
        { say: 'Those add to 16, so every box is counted once, and our 3 and 2 are right. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{2}{7}$: two of the sums $2$ to $8$', 'the sums are **not** equally likely: count boxes'],
            ['counting $(2, 4)$ and $(4, 2)$ once', 'they are **different** outcomes: count both'],
            ['$\\dfrac{3}{16} \\times \\dfrac{2}{16}$', '"or" with events that cannot happen together: **add**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'There are 7 possible sums, but they are not equally likely. Count the 16 equally likely boxes instead.' },
        { say: '2 then 4, and 4 then 2, are different outcomes. Count both.' },
        { say: 'And for "or" with mutually exclusive events, add the probabilities. Do not multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You roll the same pair of 4-sided dice. What is the probability of a sum of $2$ or $8$?',
          choices: ['$\\dfrac{1}{8}$', '$\\dfrac{1}{16}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$'],
          answer: 0,
          working: '$(1, 1)$ and $(4, 4)$: $\\dfrac{1}{16} + \\dfrac{1}{16} = \\dfrac{2}{16} = \\dfrac{1}{8}$.',
        },
      ],
      lines: [
        { say: 'Your turn. You roll the same pair of 4-sided dice. What is the probability of a sum of 2 or 8? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A sum of 2 needs 1 and 1, and a sum of 8 needs 4 and 4. That is 1 sixteenth plus 1 sixteenth, which is 2 sixteenths, or one eighth: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List **all** the equally likely outcomes', 'Count the outcomes in each event', 'Mutually exclusive "or": **add**', 'Check: the counts add to the total'] }],
      lines: [
        { say: 'Here is what to remember. List all the equally likely outcomes, for example in a table.', show: 'sum.0' },
        { say: 'Count the outcomes in each event.', show: 'sum.1' },
        { say: 'For "or" with events that cannot happen together, add the probabilities.', show: 'sum.2' },
        { say: 'And check that your counts add up to the total. For more on the probability of combined events, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
