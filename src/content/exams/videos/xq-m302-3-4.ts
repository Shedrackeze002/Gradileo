import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 3.4 (independent and dependent events). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 7.9, Conditional Probability
// and the Multiplication Rule, CC BY-NC-SA 4.0): the shared opening and its first part. 3 of the 8
// cards are hearts, and after a heart is drawn, 2 of the 7 left are spades, so the probability is
// 3/8 × 2/7 = 3/28, as in the book's solution. The check counts the 56 ordered draws, 6 of which fit.

const QUESTION =
  'You’re drawing 2 cards in order from a deck containing only the cards A♡, A♣, K♠, 10♡, 9♡, 9♠, 9♦, and 6♣. Compute the following: P(draw a ♡ first and a ♠ second)';

const video: Explainer = {
  id: 'xq-m302-3-4',
  lessonId: '',
  exam: {
    lesson: 'm302-3-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.9, Conditional Probability and the Multiplication Rule',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule',
    question: QUESTION,
  },
  title: 'Exam Question: A Heart, Then a Spade (Independent and Dependent Events)',
  thumbnailTitle: 'A Heart, Then a Spade',
  thumbnail: 'grid',
  summary:
    'A real test question, solved one small step at a time: two cards are drawn in order from an 8-card deck. What is the probability of a heart first and a spade second? The draws are dependent, since the first card is not put back: P = 3/8 × 2/7 = 6/56 = 3/28. Then we check by counting all 56 ordered draws and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Heart, Then a Spade', subtitle: 'Independent and dependent events, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dependent events. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You’re drawing $2$ cards in order from a deck containing only the cards $\\text{A}\\heartsuit$, $\\text{A}\\clubsuit$, $\\text{K}\\spadesuit$, $10\\heartsuit$, $9\\heartsuit$, $9\\spadesuit$, $9\\diamondsuit$, and $6\\clubsuit$. Compute the following: $P(\\text{draw a } \\heartsuit \\text{ first and a } \\spadesuit \\text{ second})$',
          answer: '$\\dfrac{3}{8} \\times \\dfrac{2}{7} = \\dfrac{3}{28}$',
          working: 'The first card is not put back, so the second draw is from $7$ cards.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'You\'re drawing 2 cards in order from a deck containing only the cards: ace of hearts, ace of clubs, king of spades, 10 of hearts, 9 of hearts, 9 of spades, 9 of diamonds, and 6 of clubs. Compute the probability that you draw a heart first and a spade second.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Draw one card, **keep it**, then draw a second from the $7$ left. We want the first to be a heart $\\heartsuit$ **and** the second to be a spade $\\spadesuit$.' }],
      lines: [
        { say: 'We draw one card and keep it, then draw a second card from the 7 that are left.', show: 't' },
        { say: 'We want the first card to be a heart, and the second to be a spade.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mult', tone: 'key', title: 'The multiplication rule', md: '$P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$' },
        { kind: 'callout', id: 'dep', tone: 'definition', title: 'Dependent events', md: 'When the first result **changes** the chances for the second, as when a card is not put back.' },
      ],
      lines: [
        { say: 'Here is what we need. The probability of A and B is the probability of A, times the probability of B given that A has happened.', show: 'mult' },
        { say: 'Events are dependent when the first result changes the chances for the second, as when a card is not put back.', show: 'dep' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $P(\\heartsuit \\text{ first})$', 'Find $P(\\spadesuit \\text{ second} \\mid \\heartsuit \\text{ first})$', '**Multiply**'] }],
      lines: [
        { say: 'Here is the plan. First, find the probability of a heart first.', show: 'plan.0' },
        { say: 'Second, find the probability of a spade second, given a heart was drawn first.', show: 'plan.1' },
        { say: 'Third, multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: A heart first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\heartsuit: \\ \\text{A}\\heartsuit, \\ 10\\heartsuit, \\ 9\\heartsuit', 'P(\\heartsuit \\text{ first}) = \\good{\\dfrac{3}{8}}'] }],
      lines: [
        { say: 'Step one. The hearts are the ace, the 10 and the 9 of hearts: 3 of them.', show: 'm.0' },
        { say: 'So the probability of a heart first is 3 out of 8.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Then a spade',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\spadesuit: \\ \\text{K}\\spadesuit, \\ 9\\spadesuit \\ \\text{(both still there)}', 'P(\\spadesuit \\text{ second} \\mid \\heartsuit \\text{ first}) = \\good{\\dfrac{2}{7}}'] }],
      lines: [
        { say: 'Step two. The spades are the king and the 9 of spades. A heart was taken, so both spades are still there.', show: 'm.0' },
        { say: 'But only 7 cards are left. So the probability of a spade second, given a heart first, is 2 out of 7.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{8} \\times \\dfrac{2}{7} = \\dfrac{6}{56}', '= \\good{\\dfrac{3}{28}} \\approx 0.107'] }],
      lines: [
        { say: 'Step three. Multiply: 3 eighths times 2 sevenths is 6 over 56.', show: 'm.0' },
        { say: 'That simplifies to 3 over 28, about 0.107, or a bit under 11 percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'grid',
          head: ['1st \\ 2nd', '$\\text{K}\\spadesuit$', '$9\\spadesuit$'],
          rows: [
            ['$\\text{A}\\heartsuit$', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$'],
            ['$10\\heartsuit$', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$'],
            ['$9\\heartsuit$', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all ordered draws: } 8 \\times 7 = 56; \\quad \\dfrac{6}{56} = \\dfrac{3}{28} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check by counting. A heart then a spade can be any of 3 hearts with any of 2 spades: 6 draws that fit.', show: 'grid' },
        { say: 'All the ordered draws: 8 choices first, then 7, which is 56. So the probability is 6 over 56, which is 3 over 28 again. It checks out.', show: 'm', focus: 'm' },
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
            ['$\\dfrac{3}{8} \\times \\dfrac{2}{8} = \\dfrac{3}{32}$', 'the first card is **not** put back: $7$ left'],
            ['$\\dfrac{3}{8} + \\dfrac{2}{7}$', '"first **and** second": multiply'],
            ['$\\dfrac{5}{8}$', 'that is a heart **or** a spade on one draw'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The first card is kept, so the second draw is from 7 cards, not 8. Using 8 treats the draws as independent.' },
        { say: 'We want a heart first and a spade second, so we multiply, not add.' },
        { say: 'And 5 eighths is the chance of a heart or a spade on a single draw, a different question.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A box has $4$ red and $6$ blue pens. Two pens are taken without replacement. What is $P(\\text{red first and blue second})$?',
          choices: ['$\\dfrac{6}{25}$', '$\\dfrac{4}{15}$', '$\\dfrac{2}{15}$', '$\\dfrac{10}{19}$'],
          answer: 1,
          working: '$\\dfrac{4}{10} \\times \\dfrac{6}{9} = \\dfrac{24}{90} = \\dfrac{4}{15}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box has 4 red and 6 blue pens. Two pens are taken without replacement. What is the probability of red first and blue second? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 tenths for red first, then 6 out of the 9 pens left for blue: 4 tenths times 6 ninths is 24 nineties, which is 4 fifteenths: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$', 'Not put back: the events are **dependent**', 'Recount what is **left** before the second draw', 'Check by counting the ordered outcomes'] }],
      lines: [
        { say: 'Here is what to remember. The probability of A and B is the probability of A, times the probability of B given A.', show: 'sum.0' },
        { say: 'When the first item is not put back, the events are dependent.', show: 'sum.1' },
        { say: 'So recount what is left before the second draw.', show: 'sum.2' },
        { say: 'And check by counting the ordered outcomes. For more on independent and dependent events, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
