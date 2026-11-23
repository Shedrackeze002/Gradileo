import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 3.2 (probability using counting methods). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 7.6, Probability with
// Permutations and Combinations, CC BY-NC-SA 4.0). There are 52C5 = 2,598,960 hands, and
// 13C2 × 13C3 = 78 × 286 = 22,308 of them have 2 spades and 3 hearts, so the probability is
// 22,308/2,598,960 = 143/16,660 ≈ 0.858%, as in the book's solution. The check counts the cards in
// order instead: 5C2 × (13 × 12) × (13 × 12 × 11) / 52P5 gives the same probability.

const QUESTION = 'If you draw a hand of 5 cards from a standard deck, what is the probability that 2 cards are ♠ and 3 cards are ♡?';

const video: Explainer = {
  id: 'xq-m302-3-2',
  lessonId: '',
  exam: {
    lesson: 'm302-3-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.6, Probability with Permutations and Combinations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-6-probability-with-permutations-and-combinations',
    question: QUESTION,
  },
  title: 'Exam Question: 2 Spades and 3 Hearts in a 5-Card Hand (Probability Using Counting Methods)',
  thumbnailTitle: '2 Spades and 3 Hearts',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: in a 5-card hand from a standard deck, what is the probability of exactly 2 spades and 3 hearts? There are 52C5 = 2,598,960 hands, and 13C2 × 13C3 = 78 × 286 = 22,308 of them fit, so the probability is 22,308/2,598,960 ≈ 0.858%. Then we check by counting the cards in order and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '2 Spades and 3 Hearts', subtitle: 'Probability using counting methods, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about probability and counting. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If you draw a hand of $5$ cards from a standard deck, what is the probability that $2$ cards are $\\spadesuit$ and $3$ cards are $\\heartsuit$?',
          answer: '$\\dfrac{{}_{13}C_2 \\times {}_{13}C_3}{{}_{52}C_5} = \\dfrac{22{,}308}{2{,}598{,}960} \\approx 0.858\\%$',
          working: 'Count the hands that fit, and divide by all the hands.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'If you draw a hand of 5 cards from a standard deck, what is the probability that 2 cards are spades and 3 cards are hearts?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A standard deck has $52$ cards: $13$ in each of $4$ suits. A **hand** is a group of $5$ cards, so **order does not matter**. We want exactly $2$ spades $\\spadesuit$ and $3$ hearts $\\heartsuit$.' }],
      lines: [
        { say: 'A standard deck has 52 cards: 13 in each of 4 suits.', show: 't' },
        { say: 'A hand is a group of 5 cards, so the order they are dealt does not matter. We want exactly 2 spades and 3 hearts.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Equally likely outcomes', md: '$P(E) = \\dfrac{\\text{number of outcomes in } E}{\\text{number of outcomes in all}}$' },
        { kind: 'callout', id: 'ncr', tone: 'key', title: 'Combinations', md: 'Groups of $r$ from $n$, order not mattering: $\\ {}_nC_r = \\dfrac{n!}{r! \\, (n - r)!}$' },
      ],
      lines: [
        { say: 'Here is what we need. When all outcomes are equally likely, the probability of E is the number of outcomes in E, over the number of outcomes in all.', show: 'p' },
        { say: 'And to count groups of r from n, when order does not matter, we use n C r.', show: 'ncr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count **all** the $5$-card hands', 'Count the hands with $2$ $\\spadesuit$ **and** $3$ $\\heartsuit$', '**Divide**'] }],
      lines: [
        { say: 'Here is the plan. First, count all the 5-card hands.', show: 'plan.0' },
        { say: 'Second, count the hands with 2 spades and 3 hearts.', show: 'plan.1' },
        { say: 'Third, divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: All the hands',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{}_{52}C_5 = \\dfrac{52 \\times 51 \\times 50 \\times 49 \\times 48}{5!}', '= \\good{2{,}598{,}960}'] }],
      lines: [
        { say: 'Step one. A hand is 5 cards out of 52, order not mattering: 52 C 5. That is 52 times 51 times 50 times 49 times 48, over 5 factorial.', show: 'm.0' },
        { say: 'Which is 2,598,960 different hands.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The hands that fit',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{}_{13}C_2 = 78 \\ \\text{(spades)}, \\quad {}_{13}C_3 = 286 \\ \\text{(hearts)}', '78 \\times 286 = \\good{22{,}308}'] }],
      lines: [
        { say: 'Step two. Choose 2 of the 13 spades: 13 C 2, which is 78. And choose 3 of the 13 hearts: 13 C 3, which is 286.', show: 'm.0' },
        { say: 'A hand that fits has 2 spades and 3 hearts, so we multiply: 78 times 286 is 22,308 hands.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{22{,}308}{2{,}598{,}960} = \\dfrac{143}{16{,}660}', '\\approx 0.00858 = \\good{0.858\\%}'] }],
      lines: [
        { say: 'Step three. The probability is 22,308 over 2,598,960, which simplifies to 143 over 16,660.', show: 'm.0' },
        { say: 'As a decimal, that is about 0.00858, or 0.858 percent. Less than 1 hand in 100.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{in order: } \\dfrac{{}_5C_2 \\times (13 \\times 12) \\times (13 \\times 12 \\times 11)}{52 \\times 51 \\times 50 \\times 49 \\times 48}', '= \\dfrac{2{,}676{,}960}{311{,}875{,}200} \\approx 0.858\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting the cards in the order they are dealt instead. Choose which 2 of the 5 places hold the spades: 5 C 2, which is 10. Then 13 times 12 ways for the spades, and 13 times 12 times 11 for the hearts, out of 52 times 51 times 50 times 49 times 48 ordered deals.', show: 'm.0' },
        { say: 'That is 2,676,960 over 311,875,200, which is again about 0.858 percent. Both ways agree, so it checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$78 + 286$', 'the hand has spades **and** hearts: multiply'],
            ['$\\dfrac{22{,}308}{{}_{52}P_5}$', 'count the top and bottom the **same** way'],
            ['$22{,}308$', 'that is a **count**: divide by all the hands'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The hand has 2 spades and 3 hearts together, so multiply the counts, do not add them.' },
        { say: 'Count the top and the bottom the same way. Unordered hands on top need unordered hands below.' },
        { say: 'And 22,308 is a number of hands, not a probability. Divide by all the hands.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bag has $5$ red and $4$ blue marbles. Two marbles are drawn at random. What is the probability that both are red?',
          choices: ['$\\dfrac{25}{81}$', '$\\dfrac{5}{9}$', '$\\dfrac{10}{81}$', '$\\dfrac{5}{18}$'],
          answer: 3,
          working: '$\\dfrac{{}_5C_2}{{}_9C_2} = \\dfrac{10}{36} = \\dfrac{5}{18}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag has 5 red and 4 blue marbles. Two marbles are drawn at random. What is the probability that both are red? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '5 C 2 is 10 pairs of red marbles, and 9 C 2 is 36 pairs in all. 10 over 36 is 5 eighteenths: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P = \\dfrac{\\text{outcomes that fit}}{\\text{all outcomes}}$', 'A hand or group: count with **combinations**', 'Several parts (**and**): **multiply** the counts', 'Count the top and bottom the **same** way'] }],
      lines: [
        { say: 'Here is what to remember. The probability is the number of outcomes that fit, over all the outcomes.', show: 'sum.0' },
        { say: 'For a hand or a group, count with combinations.', show: 'sum.1' },
        { say: 'When the outcome has several parts, multiply their counts.', show: 'sum.2' },
        { say: 'And count the top and the bottom the same way. For more on probability using counting methods, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
