import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { join, piece } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { die } from '@/content/math6/videos/lib/m6-12-figures.ts';

// Exam question for Math 6 lesson 12.2 (experiments and likelihood). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 7.5, Basic Concepts of
// Probability, CC BY-NC-SA 4.0). 6 equally likely outcomes. A 4: 1/6. Greater than 2 (3, 4, 5, 6):
// 4/6 = 2/3. Odd (1, 3, 5): 3/6 = 1/2.

const QUESTION =
  'You are about to roll a fair (meaning that each face has an equal chance of landing up) 6-sided die, whose faces are labeled with the numbers 1 through 6. Find the theoretical probabilities of each outcome. 1. You roll a 4. 2. You roll a number greater than 2. 3. You roll an odd number.';

type P = [number, number];
const AT: Record<number, P> = { 1: [0, 2.7], 2: [2.3, 2.7], 3: [4.6, 2.7], 4: [0, 0], 5: [2.3, 0], 6: [4.6, 0] };

// The six faces in two rows, each with a highlight `hl<n>` to show it is in the event.
const dice = (id: string) => {
  const parts: Part[] = [];
  for (let k = 1; k <= 6; k++) {
    const [x, y] = AT[k];
    parts.push(piece(`hl${k}`, [[x - 0.25, y - 0.75], [x + 1.85, y - 0.75], [x + 1.85, y + 1.85], [x - 0.25, y + 1.85]], { tone: 'good', shade: 0.3, weight: 3 }));
  }
  for (let k = 1; k <= 6; k++) parts.push(die(`d${k}`, AT[k], k, { number: true }));
  return figure(id, [join(...parts)], 400);
};
const faces = (id: string) => [1, 2, 3, 4, 5, 6].map((k) => `${id}.d${k}`);
const hl = (id: string, ks: number[]) => ks.map((k) => `${id}.hl${k}`);

const video: Explainer = {
  id: 'xq-m6-12-2',
  lessonId: '',
  exam: {
    lesson: 'm6-12-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.5, Basic Concepts of Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-5-basic-concepts-of-probability',
    question: QUESTION,
  },
  title: 'Exam Question: Probabilities When You Roll a Die (Experiments and Likelihood)',
  thumbnailTitle: 'Roll a Fair Die',
  thumbnail: 'dc',
  summary:
    'A real test question, solved one small step at a time: you roll a fair 6-sided die numbered 1 to 6. Find the probability of rolling a 4, a number greater than 2, and an odd number. All 6 outcomes are equally likely, so each probability is the number of outcomes in the event over 6: a 4 is 1/6, greater than 2 (3, 4, 5 or 6) is 4/6 = 2/3, and odd (1, 3 or 5) is 3/6 = 1/2. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Roll a Fair Die', subtitle: 'Experiments and likelihood, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about probability with a die. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You are about to roll a fair (meaning that each face has an equal chance of landing up) $6$-sided die, whose faces are labeled with the numbers $1$ through $6$. Find the theoretical probabilities of each outcome. 1. You roll a $4$. 2. You roll a number greater than $2$. 3. You roll an odd number.',
          answer: '1. $\\tfrac{1}{6}$ 2. $\\tfrac{4}{6} = \\tfrac{2}{3}$ 3. $\\tfrac{3}{6} = \\tfrac{1}{2}$',
          working: 'outcomes in the event ÷ 6',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You are about to roll a fair 6 sided die, meaning that each face has an equal chance of landing up. Its faces are labelled with the numbers 1 through 6. Find the theoretical probability of each outcome. One, you roll a 4. Two, you roll a number greater than 2. Three, you roll an odd number.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Theoretical probability', md: 'An **outcome** is one possible result: a die has $6$. An **event** is a group of outcomes, like "an odd number". The **theoretical probability** is how likely an event is, worked out by **thinking**, not by rolling.' }],
      lines: [
        { say: 'An outcome is one possible result. A die has 6 outcomes: 1, 2, 3, 4, 5 and 6.', show: 'c' },
        { say: 'An event is a group of outcomes, like rolling an odd number. The theoretical probability is how likely an event is, worked out by thinking, not by rolling the die.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{outcomes in the event}}{\\text{all outcomes}}'] }],
      lines: [
        { say: 'Here is what we need. When all the outcomes are equally likely, the probability of an event is the number of outcomes in the event, divided by the number of all the outcomes.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List **all** the outcomes: $6$', 'Count the outcomes in **each event**', 'Divide, and **simplify**'] }],
      lines: [
        { say: 'Here is the plan. List all the outcomes. There are 6.', show: 'plan.0' },
        { say: 'Count the outcomes in each event.', show: 'plan.1' },
        { say: 'Then divide, and simplify the fraction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Count and divide',
      layout: 'split',
      leftWidth: 460,
      left: [dice('dc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(4) = \\good{\\tfrac{1}{6}}', 'P(> 2) = \\tfrac{4}{6} = \\good{\\tfrac{2}{3}}', 'P(\\text{odd}) = \\tfrac{3}{6} = \\good{\\tfrac{1}{2}}'] }],
      lines: [
        { say: 'Here are the 6 faces of the die. Each one is equally likely to land face up.', show: faces('dc') },
        { say: 'Part one. Only one face shows a 4. So the probability is 1 out of 6.', show: [...hl('dc', [4]), 'm.0'], focus: 'm.0' },
        { say: 'Part two. Greater than 2 means 3, 4, 5 or 6. That is 4 faces. The probability is 4 out of 6, which simplifies to 2 thirds.', show: [...hl('dc', [3, 5, 6]), 'm.1'], focus: 'm.1' },
        { say: 'Part three. The odd numbers are 1, 3 and 5. That is 3 faces. The probability is 3 out of 6, which simplifies to 1 half.', show: [...hl('dc', [1, 3, 5]), 'm.2'], hide: hl('dc', [4, 6]), focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\le 2) = \\tfrac{2}{6}, \\quad \\tfrac{4}{6} + \\tfrac{2}{6} = 1 \\ \\checkmark', '\\text{odd } \\tfrac{3}{6} + \\text{even } \\tfrac{3}{6} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part two. The faces that are not greater than 2 are 1 and 2: 2 out of 6. Together with 4 out of 6, that makes 6 out of 6, all the faces.', show: 'm.0' },
        { say: 'And for part three, half the faces are odd and half are even, so 1 half makes sense. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['2. $\\tfrac{3}{6}$', 'counted $3, 4, 5$: **greater than** $2$ includes $6$ but **not** $2$'],
            ['2. $\\tfrac{5}{6}$', 'counted $2$ too: "greater than" does **not** include $2$'],
            ['1. $\\tfrac{4}{6}$', 'used the **number** $4$: count the **faces** that show a $4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 out of 6 for part two misses the 6. Greater than 2 means 3, 4, 5 and 6.' },
        { say: '5 out of 6 counts the 2 as well. Greater than 2 does not include 2 itself.' },
        { say: 'And 4 out of 6 for part one uses the number on the face. Count the faces that show a 4: just 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A spinner has $8$ equal sections numbered $1$ to $8$. What is the probability of spinning a number **greater than** $5$?',
          choices: ['$\\tfrac{3}{8}$', '$\\tfrac{5}{8}$', '$\\tfrac{3}{5}$', '$\\tfrac{1}{8}$'],
          answer: 0,
          working: 'Greater than 5 means 6, 7 or 8: 3 of the 8 equally likely outcomes.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner has 8 equal sections numbered 1 to 8. What is the probability of spinning a number greater than 5? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Greater than 5 means 6, 7 or 8. That is 3 of the 8 equally likely sections: 3 eighths. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List **all** the equally likely outcomes', 'Count the outcomes in the **event**', '$P = \\dfrac{\\text{event}}{\\text{all}}$', '"Greater than $2$" does **not** include $2$'] }],
      lines: [
        { say: 'Here is what to remember. List all the equally likely outcomes.', show: 'sum.0' },
        { say: 'Count the outcomes in the event.', show: 'sum.1' },
        { say: 'Divide the outcomes in the event by all the outcomes.', show: 'sum.2' },
        { say: 'And read the words carefully: greater than 2 does not include 2. For more on experiments and likelihood, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
