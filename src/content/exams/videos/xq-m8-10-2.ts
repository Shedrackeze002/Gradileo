import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squares } from '@/content/math8/videos/lib/m8-8-figures.ts';
import { outcomeGrid } from '@/content/math7/videos/lib/m7-11-figures.ts';

// Exam question for Math 8 lesson 10.2 (probability of independent events). The question is a
// Check Your Understanding question from OpenStax Contemporary Mathematics, word for word without
// its lead-in "For the following exercises," (section 7.9, Conditional Probability and the
// Multiplication Rule, CC BY-NC-SA 4.0). Each die shows orange with probability 3/6 = 1/2, and the
// dice are independent, so P(2 orange) = 1/2 × 1/2 = 1/4: 9 of the 36 equally likely outcomes.

const QUESTION =
  'You are rolling two 6-sided dice, each of which has 3 orange faces, 2 green faces, and 1 blue face. What is the probability of rolling 2 orange faces?';

const t = (s: string) => `\\text{${s}}`;
const FACES = ['O', 'O', 'O', 'G', 'G', 'B'];
const TONES: DiagramTone[] = ['opp', 'opp', 'opp', 'good', 'good', 'adj'];
const tones = Object.fromEntries(TONES.map((tone, i) => [i, tone])) as Record<number, DiagramTone>;
const marks = Object.fromEntries(FACES.map((f, i) => [i, t(f)]));

// The six faces of each die, laid out in a row.
const dice = (id: string) =>
  figure(
    id,
    [
      squares({ name: 'd1', at: [0, 1.8], cells: FACES.map((_, i): [number, number] => [i, 0]), tones, marks, group: () => 'faces', label: '\\text{Die 1}' }),
      squares({ name: 'd2', at: [0, -0.6], cells: FACES.map((_, i): [number, number] => [i, 0]), tones, marks, group: () => 'faces', label: '\\text{Die 2}' }),
    ],
    280,
  );

// Every outcome of the two dice: 6 × 6 = 36, with the 9 orange-orange ones shaded.
const OO: [number, number][] = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c): [number, number] => [r, c]));
const grid = (id: string) =>
  figure(
    id,
    [
      outcomeGrid({
        rows: FACES.map(t),
        cols: FACES.map(t),
        cells: FACES.map((a) => FACES.map((b) => t(a + b))),
        corner: '',
        w: 1.15,
        h: 0.78,
        marks: [{ id: 'oo', cells: OO, tone: 'opp' }],
      }),
    ],
    440,
  );

const video: Explainer = {
  id: 'xq-m8-10-2',
  lessonId: '',
  exam: {
    lesson: 'm8-10-2',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 7.9, Conditional Probability and the Multiplication Rule',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule',
    question: QUESTION,
  },
  title: 'Exam Question: Two Orange Faces (Probability of Independent Events)',
  thumbnailTitle: 'Two Orange Faces',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: you roll two 6-sided dice, each with 3 orange faces, 2 green faces and 1 blue face. What is the probability of rolling 2 orange faces? On each die, 3 of the 6 faces are orange, so P(orange) = 3/6 = 1/2. One die does not affect the other, so the events are independent, and we multiply: 1/2 × 1/2 = 1/4. Then we check by counting all 36 outcomes, 9 of which are orange and orange, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Orange Faces', subtitle: 'Probability of independent events, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the probability of independent events. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You are rolling two $6$-sided dice, each of which has $3$ orange faces, $2$ green faces, and $1$ blue face. What is the probability of rolling $2$ orange faces?',
          answer: '$\\tfrac{1}{4}$',
          working: '3/6 × 3/6 = 1/2 × 1/2 = 1/4',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You are rolling two 6-sided dice, each of which has 3 orange faces, 2 green faces, and 1 blue face. What is the probability of rolling 2 orange faces?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [dice('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Independent events', md: 'Two events are **independent** when one does **not change** the chance of the other. What one die shows has no effect on the other die.' }],
      lines: [
        { say: 'Here are the faces of the two dice. Each has 3 orange faces, 2 green faces, and 1 blue face.', show: ['ask.d1-faces', 'ask.d1-label', 'ask.d2-faces', 'ask.d2-label'] },
        { say: 'We want both dice to land orange side up.' },
        { say: 'Two events are independent when one does not change the chance of the other. What one die shows has no effect on the other die. So these events are independent.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{all outcomes}}', 'P(A \\text{ and } B) = P(A) \\times P(B)'] }],
      lines: [
        { say: 'Here is what we need. The probability of an event is the number of favourable outcomes, over the number of all outcomes, when they are all equally likely.', show: 'm.0' },
        { say: 'And for independent events, the probability that both happen is the product: multiply their probabilities.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $P(\\text{orange})$ on **one** die', 'The dice are **independent**', '**Multiply** for both dice'] }],
      lines: [
        { say: 'Here is the plan. Find the probability of orange on one die.', show: 'plan.0' },
        { say: 'The dice are independent.', show: 'plan.1' },
        { say: 'So multiply, for both dice.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: One die, then both',
      layout: 'split',
      leftWidth: 560,
      left: [dice('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{O on die 1}) = \\tfrac{3}{6} = \\tfrac{1}{2}', 'P(\\text{O on die 2}) = \\tfrac{3}{6} = \\tfrac{1}{2}', 'P(\\text{O and O}) = \\tfrac{1}{2} \\times \\tfrac{1}{2} = \\good{\\tfrac{1}{4}}'] }],
      lines: [
        { say: 'Here are the two dice again.', show: ['st.d1-faces', 'st.d1-label', 'st.d2-faces', 'st.d2-label'] },
        { say: 'Step one. On the first die, 3 of the 6 faces are orange. So the probability of orange is 3 sixths, which is one half.', show: 'm.0', focus: ['st.d1-faces', 'm.0'] },
        { say: 'Step two. The second die is the same, and it does not care what the first die did. Its probability of orange is also one half.', show: 'm.1', focus: ['st.d2-faces', 'm.1'] },
        { say: 'Step three. The dice are independent, so multiply. One half times one half is one quarter. The probability of rolling 2 orange faces is one quarter.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [grid('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 6 = 36 \\text{ outcomes}', '3 \\times 3 = 9 \\text{ are O and O}', '\\tfrac{9}{36} = \\tfrac{1}{4} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by listing every outcome. The first die goes down the side, and the second die goes across the top. That makes 6 times 6, which is 36 equally likely outcomes.', show: ['ck.frame', 'ck.row0', 'ck.row1', 'ck.row2', 'ck.row3', 'ck.row4', 'ck.row5', 'm.0'], focus: 'm.0' },
        { say: 'The outcomes with orange on both dice are shaded. There are 3 times 3, which is 9 of them.', show: ['ck.oo', 'm.1'], focus: ['ck.oo', 'm.1'] },
        { say: 'So the probability is 9 out of 36, which is one quarter. The same answer. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$\\tfrac{1}{2}$', 'that is **one** die: **both** must be orange, so multiply'],
            ['$1$', 'added $\\tfrac12 + \\tfrac12$: for "and", **multiply**'],
            ['$\\tfrac{6}{12}$', 'added faces: there are $36$ outcomes, and $9$ are O and O'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'One half is the chance for one die. But both dice must be orange, so multiply the two chances.' },
        { say: 'One comes from adding one half and one half. That would mean orange is certain, which cannot be right. For "and", multiply.' },
        { say: 'And 6 twelfths adds up the orange faces on the two dice. But the outcomes are pairs: there are 36 of them, and 9 are orange and orange.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Roll the same two dice. What is the probability of rolling $2$ **green** faces?',
          choices: ['$\\tfrac{1}{3}$', '$\\tfrac{1}{9}$', '$\\tfrac{2}{3}$', '$\\tfrac{4}{6}$'],
          answer: 1,
          working: 'P(green) = 2/6 = 1/3 on each die, so 1/3 × 1/3 = 1/9.',
        },
      ],
      lines: [
        { say: 'Your turn. Roll the same two dice. What is the probability of rolling 2 green faces? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'On each die, 2 of the 6 faces are green, so the probability is 2 sixths, which is one third. Multiply: one third times one third is one ninth. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Independent**: one does not change the other', 'Find each probability **on its own**', 'For "and", **multiply**', 'Check by **listing** the outcomes'] }],
      lines: [
        { say: 'Here is what to remember. Independent events do not change each other\'s chances.', show: 'sum.0' },
        { say: 'Find the probability of each event on its own.', show: 'sum.1' },
        { say: 'For both to happen, multiply.', show: 'sum.2' },
        { say: 'And you can check by listing all the outcomes. For more on the probability of independent events, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
