import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 4.3 (solving multiplication and division problems). The question
// is an Exercise from OpenStax Prealgebra 2e, word for word (section 1.5, Divide Whole Numbers,
// CC BY-NC-SA 4.0). 365 ÷ 14: 14 into 36 is 2 (28), remainder 8; bring down 5 to make 85; 14 into 85
// is 6 (84), remainder 1. So 365 ÷ 14 = 26 R 1. 26 pairs last 364 days, and the 1 day left over
// needs one more pair: 27 pairs, as in the book's answer. Check: 26 × 14 + 1 = 365.

const QUESTION = 'Contact lenses Jenna puts in a new pair of contact lenses every 14 days. How many pairs of contact lenses does she need for 365 days?';

const video: Explainer = {
  id: 'xq-m5-4-3',
  lessonId: '',
  exam: {
    lesson: 'm5-4-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.5, Divide Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-5-divide-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Contact Lenses for a Year (Remainders in Problems)',
  thumbnailTitle: 'What About the Remainder?',
  summary:
    'A real test question, solved one small step at a time: Jenna uses a new pair of contact lenses every 14 days. How many pairs does she need for 365 days? 365 ÷ 14 = 26 remainder 1, so 26 pairs cover 364 days. The 1 day left over still needs a pair, so she needs 27 pairs. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What About the Remainder?', subtitle: 'Division problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question where the remainder matters. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Contact lenses** Jenna puts in a new pair of contact lenses every $14$ days. How many pairs of contact lenses does she need for $365$ days?',
          answer: '$27$ pairs',
          working: '365 ÷ 14 = 26 R 1, and the extra day needs one more pair',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Jenna puts in a new pair of contact lenses every 14 days. How many pairs of contact lenses does she need for 365 days?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Groups of 14 days', md: 'Each pair lasts **$14$ days**. A year of $365$ days is split into groups of $14$, so we **divide**: $365 \\div 14$. Every day needs lenses, so **no day** can be left without a pair.' }],
      lines: [
        { say: 'Each pair of lenses lasts 14 days. So the 365 days are split into groups of 14, and we divide: 365 divided by 14.', show: 'c' },
        { say: 'And every single day needs lenses. That will matter when we get to the remainder.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'What to do with a remainder', md: 'A **remainder** is what is left over. Ask what it **means** in the story. Sometimes we **drop** it, and sometimes we need **one more** group to cover it.' }],
      lines: [
        { say: 'Here is what we need. When a division does not come out exactly, the part left over is the remainder.', show: 'c' },
        { say: 'In a story problem, ask what the remainder means. Sometimes we can drop it. Sometimes we need one more group to cover it.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Divide** $365 \\div 14$', 'Decide what the **remainder** means', '**Check** by multiplying'] }],
      lines: [
        { say: 'Here is the plan. Divide 365 by 14.', show: 'plan.0' },
        { say: 'Decide what the remainder means for Jenna.', show: 'plan.1' },
        { say: 'Then check by multiplying.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Divide',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'ld', size: 'lg', lines: ['\\begin{array}{r} 26 \\text{ R } 1 \\\\ 14 \\overline{)\\,365} \\\\ -\\,28\\phantom{5} \\\\ \\hline 85 \\\\ -\\,84 \\\\ \\hline 1 \\end{array}'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['36 \\div 14 = 2 \\text{ R } 8', '85 \\div 14 = 6 \\text{ R } 1', '365 \\div 14 = 26 \\text{ R } 1'] }],
      lines: [
        { say: 'Here is the long division.', show: 'ld' },
        { say: 'Step one. 14 does not go into 3, so try 36. 14 goes into 36 two times. 2 times 14 is 28, and 36 minus 28 leaves 8.', show: 'm.0', focus: 'm.0' },
        { say: 'Bring down the 5 to make 85. 14 goes into 85 six times. 6 times 14 is 84, and 85 minus 84 leaves 1.', show: 'm.1', focus: 'm.1' },
        { say: 'So 365 divided by 14 is 26, remainder 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The remainder',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['26 \\text{ pairs} \\to 26 \\times 14 = 364 \\text{ days}', '1 \\text{ day left} \\to 1 \\text{ more pair}', '26 + 1 = \\good{27 \\text{ pairs}}'] },
      ],
      lines: [
        { say: 'Step two. What does the remainder mean? 26 pairs last 26 times 14 days, which is 364 days.', show: 'm.0' },
        { say: 'That leaves 1 day with no lenses. Jenna still needs lenses on that day, so she needs one more pair.', show: 'm.1' },
        { say: '26 plus 1 is 27. Jenna needs 27 pairs of contact lenses for the year.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['26 \\times 14 + 1 = 364 + 1 = 365 \\ \\checkmark', '27 \\times 14 = 378 \\ge 365 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the division. 26 times 14, plus the remainder 1, is 365.', show: 'm.0' },
        { say: 'And 27 pairs last 27 times 14, which is 378 days. That is enough for all 365 days, with a few days to spare. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$26$ pairs', '**dropped** the remainder: the last day needs a pair too'],
            ['$26$ R $1$', 'a remainder is not an answer: say what it **means**'],
            ['$5{,}110$', '**multiplied**: $365 \\times 14$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '26 pairs drops the remainder. But then Jenna has no lenses on the last day.' },
        { say: '26 remainder 1 is the division, not the answer. The question asks for a number of pairs, so decide what the remainder means.' },
        { say: 'And 5 thousand 110 multiplies 365 by 14. That is far too many pairs for one year.', caption: 'And 5,110 multiplies 365 by 14. That is far too many pairs for one year.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$100$ students are going on a trip. Each van holds $8$ students. How many vans are needed?',
          choices: ['$12$', '$800$', '$12$ R $4$', '$13$'],
          answer: 3,
          working: '100 ÷ 8 = 12 R 4; the 4 students left over need one more van.',
        },
      ],
      lines: [
        { say: 'Your turn. 100 students are going on a trip. Each van holds 8 students. How many vans are needed? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '100 divided by 8 is 12, remainder 4. 12 vans carry 96 students, and the 4 students left over need one more van. That makes 13 vans. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Equal groups: **divide**', 'Ask what the **remainder** means', 'Sometimes you need **one more** group', '**Check** by multiplying'] }],
      lines: [
        { say: 'Here is what to remember. Splitting into equal groups means divide.', show: 'sum.0' },
        { say: 'If there is a remainder, ask what it means in the story.', show: 'sum.1' },
        { say: 'Sometimes the leftover part needs one more group.', show: 'sum.2' },
        { say: 'And check by multiplying. For more on solving multiplication and division problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
