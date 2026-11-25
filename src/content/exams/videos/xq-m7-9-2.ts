import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, coord, move, shapeIds, triangle } from '@/content/math7/videos/lib/m7-9-figures.ts';

type P = [number, number];

// Exam question for Math 7 lesson 9.2 (translations). The free textbooks we use have no question
// like it, so Gradileo wrote it in the style of a Grade 7 unit test. Triangle DEF, D(−4, 2),
// E(−2, 2), F(−4, 5), slides 6 right (add 6 to x) and 4 down (take 4 from y): D′(2, −2),
// E′(4, −2), F′(2, 1). The opposite slide, 6 left and 4 up, moves it back.

const QUESTION =
  'Triangle DEF has vertices D(−4, 2), E(−2, 2) and F(−4, 5). It is translated 6 units right and 4 units down to make triangle D′E′F′. (a) Find the coordinates of D′, E′ and F′. (b) What translation moves D′E′F′ back onto DEF?';

const DEF: P[] = [
  [-4, 2],
  [-2, 2],
  [-4, 5],
];
const IMG: P[] = DEF.map(([x, y]) => [x + 6, y - 4]);
const NAMES = ['D', 'E', 'F'];

const slide = (id: string, back = false) => {
  const g = cart({ y: [-3, 5] });
  return figure(
    id,
    [
      g,
      triangle(g, { id: 't', corners: DEF, names: NAMES, places: ['below left', 'below right', 'above left'] }),
      triangle(g, { id: 'i', corners: IMG, names: NAMES.map((n) => `${n}'`), places: ['below left', 'below right', 'above left'], tone: 'good' }),
      ...DEF.map((c, k) => (back ? move(g, `m${k}`, IMG[k], c, { tone: 'opp', group: 'moves' }) : move(g, `m${k}`, c, IMG[k], { tone: 'theta', group: `m${k}-move` }))),
    ],
  );
};

const pair = (k: number) => `${coord(...DEF[k], NAMES[k])} \\to ${coord(...IMG[k], `${NAMES[k]}'`)}`;

const video: Explainer = {
  id: 'xq-m7-9-2',
  lessonId: '',
  exam: {
    lesson: 'm7-9-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Slide Triangle DEF 6 Right and 4 Down (Translations)',
  thumbnailTitle: 'Slide the Triangle',
  thumbnail: 'sl',
  summary:
    'An exam-style question, solved one small step at a time: triangle DEF has vertices D(−4, 2), E(−2, 2) and F(−4, 5), and it is translated 6 units right and 4 units down. Find the image D′E′F′, and the translation that moves it back. Right adds to x and down takes away from y, so each vertex goes (x, y) → (x + 6, y − 4): D′(2, −2), E′(4, −2) and F′(2, 1). To undo the slide, go the opposite way: 6 units left and 4 units up. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Slide the Triangle', subtitle: 'Translations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about translations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'Triangle $DEF$ has vertices $D(-4, 2)$, $E(-2, 2)$ and $F(-4, 5)$. It is translated $6$ units right and $4$ units down to make triangle $D\'E\'F\'$. (a) Find the coordinates of $D\'$, $E\'$ and $F\'$. (b) What translation moves $D\'E\'F\'$ back onto $DEF$?',
          answer: "(a) $D'(2, -2)$, $E'(4, -2)$, $F'(2, 1)$ (b) $6$ units left and $4$ units up",
          working: '(x, y) → (x + 6, y − 4); undo with the opposite slide',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle D E F has vertices D, negative 4, 2. E, negative 2, 2. And F, negative 4, 5. It is translated 6 units right and 4 units down, to make triangle D prime, E prime, F prime.' },
        { say: 'Part a: find the coordinates of D prime, E prime and F prime. Part b: what translation moves the image back onto D E F?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Translation and image', md: 'A **translation** is a **slide**: every point moves the **same distance** in the **same direction**. The shape after the slide is the **image**. $D\'$, said "D prime", is where $D$ lands.' }],
      lines: [
        { say: 'A translation is a slide. Every point of the shape moves the same distance, in the same direction.', show: 'c' },
        { say: 'The shape after the slide is called the image. D prime is where D lands.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{right: } \\adj{x + }, \\quad \\text{left: } \\adj{x - }', '\\text{up: } \\opp{y + }, \\quad \\text{down: } \\opp{y - }', '(x,\\ y) \\to (x + 6,\\ y - 4)'] }],
      lines: [
        { say: 'Here is what we need. Moving right adds to x, and moving left takes away from x.', show: 'm.0' },
        { say: 'Moving up adds to y, and moving down takes away from y.', show: 'm.1' },
        { say: 'So 6 right and 4 down sends each point x, y to x plus 6, y minus 4.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Add** $6$ to each $x$', '**Take** $4$ from each $y$', '(b) Undo it: go the **opposite** way'] }],
      lines: [
        { say: 'Here is the plan. For part a, add 6 to each x coordinate.', show: 'plan.0' },
        { say: 'And take 4 away from each y coordinate.', show: 'plan.1' },
        { say: 'For part b, undo the slide by going the opposite way.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Slide each vertex',
      layout: 'split',
      leftWidth: 600,
      left: [slide('sl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: [pair(0), pair(1), pair(2)] }],
      lines: [
        { say: 'Here is triangle D E F.', show: [...base('sl'), ...shapeIds('sl', 't')] },
        { say: 'Step one. D is negative 4, 2. Negative 4 plus 6 is 2, and 2 minus 4 is negative 2. So D prime is 2, negative 2.', show: ['sl.m0-move', 'sl.i-0', 'm.0'], focus: ['sl.i-0', 'm.0'] },
        { say: 'Step two. E is negative 2, 2. Negative 2 plus 6 is 4, and 2 minus 4 is negative 2. So E prime is 4, negative 2.', show: ['sl.m1-move', 'sl.i-1', 'm.1'], focus: ['sl.i-1', 'm.1'] },
        { say: 'Step three. F is negative 4, 5. Negative 4 plus 6 is 2, and 5 minus 4 is 1. So F prime is 2, 1.', show: ['sl.m2-move', 'sl.i-2', 'm.2'], focus: ['sl.i-2', 'm.2'] },
        { say: 'Join them up, and here is the image, the same size and shape, facing the same way.', show: ['sl.i', 'sl.i-fill'], focus: 'sl.i' },
      ],
    },
    {
      chapter: 'Step 4: Slide it back',
      layout: 'split',
      leftWidth: 600,
      left: [slide('bk', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{6 right} \\to \\good{\\text{6 left}}', '\\text{4 down} \\to \\good{\\text{4 up}}'] }],
      lines: [
        { say: 'Step four, part b. To move the image back onto D E F, undo the slide: go the opposite way.', show: [...base('bk'), ...shapeIds('bk', 't'), ...shapeIds('bk', 'i')] },
        { say: 'The opposite of 6 right is 6 left. The opposite of 4 down is 4 up. So the translation back is 6 units left and 4 units up.', show: ['bk.moves', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ["D'(2,\\ {-2}): \\ (2 - 6,\\ {-2} + 4) = ({-4},\\ 2) = D \\ \\checkmark", "D'E' = 4 - 2 = 2 = DE \\ \\checkmark"] }],
      lines: [
        { say: 'Let us check. Slide D prime back: 2 minus 6 is negative 4, and negative 2 plus 4 is 2. That is D again.', show: 'm.0', focus: 'm.0' },
        { say: 'And a slide keeps the size. D prime E prime is 4 minus 2, which is 2, the same as D E, from negative 4 to negative 2. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ["$D'({-10}, 6)$", 'moved the **wrong way**: right **adds** to $x$'],
            ["$D'(2, 6)$", 'added for **down**: down **takes away** from $y$'],
            ['(b) $6$ right, $4$ down', 'repeated the slide: to undo it, go the **opposite** way'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 10, 6 moves D left and up, the wrong way. Right adds to x, and down takes away from y.' },
        { say: '2, 6 adds 4 to y. But down means take 4 away.' },
        { say: 'And for part b, 6 right and 4 down repeats the slide, and moves the triangle even further. To undo it, go the opposite way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $P(3, -1)$ is translated $2$ units left and $5$ units up. Where is $P\'$?',
          choices: ['$(5, 4)$', '$(1, -6)$', '$(5, -6)$', '$(1, 4)$'],
          answer: 3,
          working: 'Left takes 2 from x: 3 − 2 = 1. Up adds 5 to y: −1 + 5 = 4. P′(1, 4).',
        },
      ],
      lines: [
        { say: 'Your turn. Point P, 3, negative 1, is translated 2 units left and 5 units up. Where is P prime? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Left takes 2 from x: 3 minus 2 is 1. Up adds 5 to y: negative 1 plus 5 is 4. P prime is 1, 4. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A translation is a **slide**', 'Right and left change $x$', 'Up and down change $y$', 'Undo it with the **opposite** slide'] }],
      lines: [
        { say: 'Here is what to remember. A translation is a slide: every point moves the same way.', show: 'sum.0' },
        { say: 'Right adds to x, and left takes away from x.', show: 'sum.1' },
        { say: 'Up adds to y, and down takes away from y.', show: 'sum.2' },
        { say: 'And the opposite slide moves the image back. For more on translations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
