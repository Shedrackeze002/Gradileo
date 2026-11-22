import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 1.3 (converting within a measurement system): four planks, each
// 6 feet 4 inches long, laid end to end. The question is OpenStax Prealgebra 2e's own worked
// example, word for word (section 7.5, Systems of Measurement, CC BY-NC-SA 4.0). 4 × 6 ft 4 in =
// 24 ft 16 in, and 16 in = 1 ft 4 in, so the wood is 25 feet 4 inches long.

/** Four planks end to end, each labelled with its length. */
const planks = (height = 260): DiagramEl => ({
  kind: 'diagram',
  id: 'planks',
  height,
  points: { a: [0, 0], b: [6.33, 0], c: [12.67, 0], d: [19, 0], e: [25.33, 0], t0: [0, 1.6], t4: [25.33, 1.6] },
  items: [
    { kind: 'line', id: 'p1', from: 'a', to: 'b', tone: 'adj', weight: 14, label: '6\\text{ ft }4\\text{ in}', labelSide: 'right', group: 'wood' },
    { kind: 'line', id: 'p2', from: 'b', to: 'c', tone: 'opp', weight: 14, label: '6\\text{ ft }4\\text{ in}', labelSide: 'right', group: 'wood' },
    { kind: 'line', id: 'p3', from: 'c', to: 'd', tone: 'adj', weight: 14, label: '6\\text{ ft }4\\text{ in}', labelSide: 'right', group: 'wood' },
    { kind: 'line', id: 'p4', from: 'd', to: 'e', tone: 'opp', weight: 14, label: '6\\text{ ft }4\\text{ in}', labelSide: 'right', group: 'wood' },
    { kind: 'line', id: 'total', from: 't0', to: 't4', tone: 'good', arrow: true, label: '\\text{total} = \\ ?', labelSide: 'left' },
  ],
});

const QUESTION = 'Anthony bought four planks of wood that were each 6 feet 4 inches long. If the four planks are placed end-to-end, what is the total length of the wood?';

const video: Explainer = {
  id: 'xq-m10c-1-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-3',
    source: 'OpenStax, Prealgebra 2e, Example in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: Four Planks End to End. Adding Feet and Inches',
  thumbnailTitle: 'Feet and Inches',
  thumbnail: 'planks',
  summary:
    'A real test question, solved one small step at a time: four planks, each 6 feet 4 inches long, are laid end to end, and we find the total length. We multiply the feet and the inches separately, then turn the extra inches into feet, using 12 inches in a foot. Then we look at the trap of treating 6 feet 4 inches as 6.4 feet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Four Planks End to End', subtitle: 'Feet and inches, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding lengths in feet and inches. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '25 feet 4 inches', working: '$4 \\times (6\\text{ ft } 4\\text{ in}) = 24\\text{ ft } 16\\text{ in} = 25\\text{ ft } 4\\text{ in}$' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Anthony bought four planks of wood that were each 6 feet 4 inches long. If the four planks are placed end to end, what is the total length of the wood?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [planks(), { kind: 'text', id: 't', size: 'md', md: 'Four planks in a row: how long is the whole row?' }],
      lines: [
        { say: 'Let us picture it. Here are the four planks, laid end to end. Each one is 6 feet 4 inches long.', show: ['planks', 'planks.wood'] },
        { say: 'The question asks for the length of the whole row, from one end to the other.', show: ['planks.total', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1\\text{ foot} = 12\\text{ inches}'] },
        { kind: 'callout', id: 'c', tone: 'mistake', title: '6 feet 4 inches is not 6.4 feet', md: '4 inches is $\\tfrac{4}{12}$ of a foot, not $\\tfrac{4}{10}$. Keep the feet and the inches **apart**.' },
      ],
      lines: [
        { say: 'Here is what we need. There are 12 inches in a foot.', show: 'f' },
        { say: 'So 6 feet 4 inches is not 6.4 feet. 4 inches is four twelfths of a foot, not four tenths. The safest way is to keep the feet and the inches apart.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply the **inches** by 4', 'Multiply the **feet** by 4', 'Turn every 12 inches into a **foot**'] }],
      lines: [
        { say: 'Here is the plan. Four planks of the same length is 4 times one plank. First, multiply the inches by 4.', show: 'plan.0' },
        { say: 'Second, multiply the feet by 4.', show: 'plan.1' },
        { say: 'Third, if there are 12 inches or more, turn them into feet.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Multiply',
      layout: 'center',
      main: [planks(220), { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 4\\text{ in} = 16\\text{ in}', '4 \\times 6\\text{ ft} = 24\\text{ ft}', '\\text{total} = 24\\text{ ft } 16\\text{ in}'] }],
      lines: [
        { say: 'Steps one and two. 4 planks times 4 inches is 16 inches.', show: ['planks', 'planks.wood', 'm.0'] },
        { say: '4 planks times 6 feet is 24 feet.', show: 'm.1' },
        { say: 'So the wood is 24 feet 16 inches long. But 16 inches is more than a foot, so we are not finished.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Carry the inches',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['16\\text{ in} = 12\\text{ in} + 4\\text{ in} = 1\\text{ ft } 4\\text{ in}', '24\\text{ ft} + 1\\text{ ft } 4\\text{ in} = \\good{25\\text{ ft } 4\\text{ in}}'] }],
      lines: [
        { say: 'Step three. 16 inches is 12 inches and 4 more, and 12 inches is a foot. So 16 inches is 1 foot 4 inches.', show: 'm.0' },
        { say: 'Add that foot to the 24 feet: the total length is 25 feet 4 inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6\\text{ ft } 4\\text{ in} = 72 + 4 = 76\\text{ in}', '4 \\times 76 = 304\\text{ in}', '304 \\div 12 = 25 \\text{ remainder } 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way, in inches only. 6 feet is 72 inches, so one plank is 76 inches.', show: 'm.0' },
        { say: 'Four planks are 4 times 76, which is 304 inches.', show: 'm.1' },
        { say: '304 divided by 12 is 25, with 4 left over: 25 feet 4 inches. It matches.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Treating 6 ft 4 in as $6.4$ ft', '$25.6$ ft: wrong, since $25$ ft $4$ in is about $25.33$ ft'],
            ['Leaving 16 inches as they are', '$24$ ft $16$ in: not finished'],
            ['Carrying with 10 inches to a foot', '$25$ ft $6$ in'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing 6 feet 4 inches as 6.4 feet gives 25.6 feet. But 4 inches is a third of a foot, so the true length is about 25.33 feet.' },
        { say: 'Leaving the answer as 24 feet 16 inches is not finished: 16 inches is more than a foot.' },
        { say: 'And a foot is 12 inches, not 10. Carrying 10 would give 25 feet 6 inches.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Three shelves are each 2 feet 9 inches long. Placed end to end, how long are they altogether?',
          choices: ['8 ft 3 in', '6 ft 9 in', '8 ft 7 in', '7 ft 3 in'],
          answer: 0,
          working: '$3 \\times 9 = 27$ in $= 2$ ft $3$ in, and $3 \\times 2 = 6$ ft, so $8$ ft $3$ in.',
        },
      ],
      lines: [
        { say: 'Your turn. Three shelves are each 2 feet 9 inches long. Placed end to end, how long are they altogether? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '3 times 9 inches is 27 inches, which is 2 feet 3 inches. 3 times 2 feet is 6 feet. Together, 8 feet 3 inches. That is choice A. 6 feet 9 inches forgot to multiply the inches, and 8 feet 7 inches used 10 inches to a foot.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ foot $= 12$ inches', 'Work on the feet and the inches **separately**', 'Turn each $12$ inches into a foot', '$6$ ft $4$ in is **not** $6.4$ ft'] }],
      lines: [
        { say: 'Here is what to remember. There are 12 inches in a foot.', show: 'sum.0' },
        { say: 'Work on the feet and the inches separately.', show: 'sum.1' },
        { say: 'Then turn every 12 inches into a foot.', show: 'sum.2' },
        { say: 'And 6 feet 4 inches is not 6.4 feet. For more on converting units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
