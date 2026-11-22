import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.4 (entire and mixed radicals): Elliott's square garden of
// 288 square feet, then the same garden with a 5-foot path taken off two sides. The question is
// an exercise from OpenStax Elementary Algebra 2e, word for word (section 9.2, Simplify Square
// Roots, CC BY-NC-SA 4.0), whose answer key gives (a) 17.0 feet and (b) 12.0 feet:
// √288 = √(144 × 2) = 12√2 ≈ 16.97 and 12√2 − 5 ≈ 11.97.

/** The garden, with the path along the north (top) and east (right) sides, drawn to scale. */
const garden = (side = '\\sqrt{288}', height = 400): DiagramEl => ({
  kind: 'diagram',
  id: 'g',
  height,
  points: { A: [0, 0], B: [16.97, 0], C: [16.97, 16.97], D: [0, 16.97], E: [11.97, 0], F: [11.97, 11.97], G: [0, 11.97], M: [5.98, 5.98], P: [14.47, 6] },
  items: [
    { kind: 'region', id: 'all', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.16 },
    { kind: 'line', id: 'bottom', from: 'A', to: 'B', tone: 'adj', weight: 5, label: side, labelSide: 'right' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'ink' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'ink' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'ink' },
    { kind: 'region', id: 'new', points: ['A', 'E', 'F', 'G'], tone: 'brand', shade: 0.3, group: 'path' },
    { kind: 'line', id: 'ef', from: 'E', to: 'F', tone: 'opp', dashed: true, group: 'path' },
    { kind: 'line', id: 'fg', from: 'F', to: 'G', tone: 'opp', dashed: true, group: 'path' },
    { kind: 'label', id: 'pl', at: 'P', tex: '5\\text{ ft}', place: 'center', group: 'path' },
  ],
});
const SQUARE = ['g', 'g.all', 'g.bottom', 'g.right', 'g.top', 'g.left'];

const QUESTION =
  '(a) Elliott decides to construct a square garden that will take up 288 square feet of his yard. Simplify √288 to determine the length and the width of his garden. Round to the nearest tenth of a foot. (b) Suppose Elliott decides to reduce the size of his square garden so that he can create a 5-foot-wide walking path on the north and east sides of the garden. Simplify √288 − 5 to determine the length and width of the new garden. Round to the nearest tenth of a foot.';

const video: Explainer = {
  id: 'xq-m10c-3-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-4',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 9.2, Simplify Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-2-simplify-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: Elliott\'s Square Garden. Simplifying √288 to a Mixed Radical',
  thumbnailTitle: 'Simplify √288',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Elliott\'s square garden covers 288 square feet, and then loses a 5-foot path on two sides. We find the largest perfect square in 288, write √288 as the mixed radical 12√2, round it to 17.0 feet, and take away the path for 12.0 feet. Then we check the answers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Elliott\'s Square Garden', subtitle: 'Entire and mixed radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a square garden, by simplifying a square root. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '(a) 17.0 feet  (b) 12.0 feet', working: '$\\sqrt{288} = \\sqrt{144 \\times 2} = 12\\sqrt{2} \\approx 16.97$; $12\\sqrt{2} - 5 \\approx 11.97$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. It has two parts.', show: 'q' },
        { say: 'Part A: Elliott decides to construct a square garden that will take up 288 square feet of his yard. Simplify the square root of 288 to determine the length and the width of his garden. Round to the nearest tenth of a foot.' },
        { say: 'Part B: suppose Elliott decides to reduce the size of his square garden so that he can create a 5 foot wide walking path on the north and east sides of the garden. Simplify the square root of 288, minus 5, to determine the length and width of the new garden. Round to the nearest tenth of a foot.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [garden()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Area $288$ ft$^2$, so each side is $\\sqrt{288}$. The path takes $5$ ft off **each** side: $\\sqrt{288} - 5$.' }],
      lines: [
        { say: 'Let us picture it. The garden is a square with an area of 288 square feet, so each side is the square root of 288.', show: SQUARE },
        { say: 'Then a path 5 feet wide runs along the north side and the east side. That takes 5 feet off the length and 5 feet off the width, so the new garden is still a square, with sides of the square root of 288, minus 5.', show: ['g.path', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}'] },
        { kind: 'text', id: 't', size: 'md', md: 'An **entire radical** like $\\sqrt{50}$ becomes a **mixed radical** like $5\\sqrt{2}$: take out the **largest perfect square** factor. $\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$' },
      ],
      lines: [
        { say: 'Here is what we need. The square root of a product is the product of the square roots.', show: 'f' },
        { say: 'So we can turn an entire radical, like the square root of 50, into a mixed radical. Split 50 into its largest perfect square factor, 25, times 2. The square root of 25 is 5, so the square root of 50 is 5 root 2.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **largest perfect square** that divides $288$', 'Write $\\sqrt{288}$ as a **mixed radical** and round: part (a)', 'Take away the path: part (b)'] }],
      lines: [
        { say: 'Here is the plan. First, find the largest perfect square that divides 288.', show: 'plan.0' },
        { say: 'Second, write the square root of 288 as a mixed radical, and round it. That is part A.', show: 'plan.1' },
        { say: 'Third, take away the path for part B.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The largest perfect square',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Perfect square', 'Divides 288?'],
          rows: [['$4$', 'yes: $288 = 4 \\times 72$'], ['$9$', 'yes: $288 = 9 \\times 32$'], ['$36$', 'yes: $288 = 36 \\times 8$'], ['$144$', '**yes**: $288 = 144 \\times 2$']],
        },
      ],
      lines: [
        { say: 'Step one. Several perfect squares divide 288: 4, 9 and 36 all do.', show: 'm' },
        { say: 'But we want the largest. 144 is 12 squared, and 288 is 144 times 2. What is left, 2, has no square factor, so 144 is the largest.' },
      ],
    },
    {
      chapter: 'Step 2: Part (a)',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '12 × √(2)', result: '16.97056' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{288} = \\sqrt{144 \\times 2}', '= \\sqrt{144} \\times \\sqrt{2} = 12\\sqrt{2}', '\\approx 16.97 \\approx \\good{17.0\\text{ ft}}'] }],
      lines: [
        { say: 'Step two. The square root of 288 is the square root of 144 times 2.', show: 'm.0' },
        { say: 'That is the square root of 144, which is 12, times the square root of 2. So the square root of 288 is the mixed radical 12 root 2.', show: 'm.1', focus: 'm.1' },
        { say: 'On a calculator, 12 times root 2 is 16.97 and so on. Rounded to the nearest tenth, each side of the garden is 17.0 feet. That is part A.', show: ['calc', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Part (b)',
      layout: 'split',
      left: [garden()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{288} - 5 = 12\\sqrt{2} - 5', '\\approx 16.97 - 5 = 11.97', '\\approx \\good{12.0\\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The new garden\'s side is the square root of 288, minus 5, which is 12 root 2 minus 5.', show: [...SQUARE, 'g.path', 'm.0'] },
        { say: 'Use the unrounded value: 16.97 minus 5 is 11.97.', show: 'm.1' },
        { say: 'To the nearest tenth, the new garden is 12.0 feet long and 12.0 feet wide. That is part B.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(12\\sqrt{2})^2 = 144 \\times 2 = 288 \\ \\checkmark', '17^2 = 289 \\approx 288 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part A. 12 root 2, squared, is 144 times 2, which is 288. So 12 root 2 is exactly the square root of 288.', show: 'm.0' },
        { say: 'And 17 squared is 289, just one more than 288. So a side of about 17.0 feet makes sense.', show: 'm.1' },
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
            ['Stopping at $\\sqrt{288} = 6\\sqrt{8}$', '$8$ still has a square factor, $4$: not simplest'],
            ['Taking the root of $288 - 5$', '$\\sqrt{283} \\approx 16.8$: subtract **after** the root'],
            ['Taking off the path **twice**', '$17.0 - 10 = 7.0$: each side loses only $5$ ft'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using 36 gives 6 root 8. That is the right size, but 8 still has a perfect square factor, 4. Always use the largest perfect square, or simplify again until none is left.' },
        { say: 'Taking the square root of 288 minus 5, all under the root, gives about 16.8. The path is a length, so you subtract it after taking the square root.' },
        { say: 'And the path runs along two different sides, so the length loses 5 feet and the width loses 5 feet. Each side loses only 5, not 10.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Write √200 as a mixed radical in simplest form.',
          choices: ['$2\\sqrt{50}$', '$100\\sqrt{2}$', '$50\\sqrt{2}$', '$10\\sqrt{2}$'],
          answer: 3,
          working: 'The largest perfect square in $200$ is $100$: $\\sqrt{200} = \\sqrt{100 \\times 2} = 10\\sqrt{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the square root of 200 as a mixed radical in simplest form. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The largest perfect square in 200 is 100, and 200 is 100 times 2. So the square root of 200 is 10 root 2. That is choice D. 2 root 50 is the right size but not simplest, because 50 has a square factor. 100 root 2 and 50 root 2 forgot to take the square root.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$', 'Take out the **largest perfect square** factor', 'Simplest form: no square factor left under the root', 'Round **after** simplifying, and use the unrounded value'] }],
      lines: [
        { say: 'Here is what to remember. The square root of a product is the product of the square roots.', show: 'sum.0' },
        { say: 'To make a mixed radical, take out the largest perfect square factor.', show: 'sum.1' },
        { say: 'It is in simplest form when no perfect square factor is left under the root.', show: 'sum.2' },
        { say: 'And round at the end, using the unrounded value in each step. For more on entire and mixed radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
