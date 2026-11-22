import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.6 (special products: perfect square trinomials): a 15-foot
// square pool with a deck of width w all round, total area 4w² + 60w + 225. The question is an
// exercise from OpenStax Elementary Algebra 2e, word for word (section 7.4, Factor Special
// Products, CC BY-NC-SA 4.0), whose answer key gives (2w + 15)²: 4w² = (2w)², 225 = 15² and
// 60w = 2(2w)(15). The whole square has side 15 + 2w.

/** The pool and its deck, drawn with w = 3: the whole square is 21 on a side. */
const pool = (height = 360): DiagramEl => ({
  kind: 'diagram',
  id: 'p',
  height,
  points: { A: [0, 0], B: [21, 0], C: [21, 21], D: [0, 21], P: [3, 3], Q: [18, 3], R: [18, 18], S: [3, 18], M: [10.5, 10.5], W1: [0, 10.5], W2: [3, 10.5] },
  items: [
    { kind: 'region', id: 'deck', points: ['A', 'B', 'C', 'D'], tone: 'theta', shade: 0.22 },
    { kind: 'line', id: 'bottom', from: 'A', to: 'B', tone: 'ink', group: 'outer' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'ink', group: 'outer' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'adj', weight: 5, label: '15 + 2w', labelSide: 'right', group: 'side' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'ink', group: 'outer' },
    { kind: 'region', id: 'water', points: ['P', 'Q', 'R', 'S'], tone: 'adj', shade: 0.45, group: 'pool' },
    { kind: 'line', id: 'pb', from: 'P', to: 'Q', tone: 'ink', label: '15', labelSide: 'left', group: 'pool' },
    { kind: 'label', id: 'pl', at: 'M', tex: '\\text{pool}', place: 'center', group: 'pool' },
    { kind: 'line', id: 'w', from: 'W1', to: 'W2', tone: 'opp', weight: 5, label: 'w', labelSide: 'left', group: 'width' },
  ],
});
const PICTURE = ['p', 'p.deck', 'p.outer', 'p.pool', 'p.width'];

const QUESTION =
  'Sue and Alan are planning to put a 15 foot square swimming pool in their backyard. They will surround the pool with a tiled deck, the same width on all sides. If the width of the deck is w, the total area of the pool and deck is given by the trinomial 4w² + 60w + 225. Factor the trinomial.';

const video: Explainer = {
  id: 'xq-m10c-4-6',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-6',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 7.4, Factor Special Products',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/7-4-factor-special-products',
    question: QUESTION,
  },
  title: 'Exam Question: The Pool and Its Deck. Factoring a Perfect Square Trinomial',
  thumbnailTitle: 'The Pool and Its Deck',
  thumbnail: 'p',
  summary:
    'A real test question, solved one small step at a time: a 15-foot square pool has a deck of width w all round, and the total area is 4w² + 60w + 225. We spot that the first and last terms are perfect squares, check the middle term, and factor it as (2w + 15)², the side of the whole square, squared. Then we check by expanding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Pool and Its Deck', subtitle: 'Perfect square trinomials, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a swimming pool and its deck, by factoring a special trinomial. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Sue and Alan are planning to put a $15$ foot square swimming pool in their backyard. They will surround the pool with a tiled deck, the same width on all sides. If the width of the deck is $w$, the total area of the pool and deck is given by the trinomial $4w^2 + 60w + 225$. Factor the trinomial.', answer: '$(2w + 15)^2$', working: '$4w^2 = (2w)^2$, $225 = 15^2$ and $60w = 2(2w)(15)$, so $(2w + 15)^2$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the landscaping exercises.', show: 'q' },
        { say: 'Sue and Alan are planning to put a 15 foot square swimming pool in their backyard. They will surround the pool with a tiled deck, the same width on all sides. If the width of the deck is w, the total area of the pool and deck is given by the trinomial 4 w squared plus 60 w plus 225. Factor the trinomial.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [pool()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Pool and deck together make a **bigger square**. Its area is $4w^2 + 60w + 225$.' }],
      lines: [
        { say: 'Let us picture it. The pool is a square, 15 feet on each side. The deck goes all the way round it, w feet wide.', show: PICTURE },
        { say: 'Pool and deck together make a bigger square, and its area is the trinomial. Factoring it should tell us something about that square.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['a^2 + 2ab + b^2 = (a + b)^2'] },
        { kind: 'text', id: 't', size: 'md', md: 'A **perfect square trinomial**: the first and last terms are **squares**, and the middle term is **twice** the product of their roots.' },
      ],
      lines: [
        { say: 'Here is what we need. A squared plus 2 a b plus b squared is a plus b, all squared.', show: 'f' },
        { say: 'This is called a perfect square trinomial. Its first and last terms are perfect squares, and its middle term is twice the product of their square roots.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Are the first and last terms **squares**?', 'Is the middle term $2ab$?', 'Write $(a + b)^2$'] }],
      lines: [
        { say: 'Here is the plan. First, check that the first and last terms are perfect squares, and find \"a\" and \"b\".', show: 'plan.0' },
        { say: 'Second, check that the middle term is 2 a b.', show: 'plan.1' },
        { say: 'Third, write the answer as a plus b, squared.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The squares',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4w^2 = (2w)^2 \\ \\Rightarrow \\ a = 2w', '225 = 15^2 \\ \\Rightarrow \\ b = 15'] }],
      lines: [
        { say: 'Step one. The first term, 4 w squared, is 2 w times 2 w, so it is 2 w squared. That makes a equal to 2 w.', show: 'm.0' },
        { say: 'The last term, 225, is 15 times 15. So b is 15, the side of the pool.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The middle term',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2ab = 2(2w)(15) = 60w \\ \\checkmark', '4w^2 + 60w + 225 = \\good{(2w + 15)^2}'] }],
      lines: [
        { say: 'Step two. Twice a times b is 2 times 2 w times 15, which is 60 w. That is exactly the middle term, so this is a perfect square trinomial.', show: 'm.0' },
        { say: 'So 4 w squared plus 60 w plus 225 is 2 w plus 15, all squared. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [pool()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(2w + 15)(2w + 15)', '= 4w^2 + 60w + 225 \\ \\checkmark', '\\text{side} = 15 + 2w \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by expanding. 2 w plus 15 times itself is 4 w squared, plus 30 w, plus 30 w, plus 225. That is 4 w squared plus 60 w plus 225.', show: [...PICTURE, 'm.0', 'm.1'] },
        { say: 'And the picture agrees. The whole square\'s side is the pool, 15, plus a deck of w on each end: 15 plus 2 w. Its area is that side squared.', show: ['p.side', 'm.2'] },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Expands to'],
          rows: [
            ['$(4w + 15)^2$', '$16w^2 + 120w + 225$: $\\sqrt{4w^2} = 2w$'],
            ['$(2w + 15)(2w - 15)$', '$4w^2 - 225$: that is a difference of squares'],
            ['$(w + 15)^2$', '$w^2 + 30w + 225$: only one deck width'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using 4 w instead of 2 w forgets to take the square root of the 4. That expands to 16 w squared.' },
        { say: 'Using plus and minus, 2 w plus 15 times 2 w minus 15, is the pattern for a difference of squares. It has no middle term.' },
        { say: 'And w plus 15, squared, counts the deck on one side only. The deck is on both sides, so the side is 15 plus 2 w.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Factor: $9x^2 - 25$.',
          choices: ['$(3x - 5)^2$', '$(9x - 5)(x + 5)$', '$(3x + 5)(3x - 5)$', '$(3x - 25)(3x + 1)$'],
          answer: 2,
          working: 'A difference of squares: $9x^2 = (3x)^2$ and $25 = 5^2$, so $(3x + 5)(3x - 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor 9 x squared minus 25. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Both terms are squares, 3 x squared and 5 squared, with a minus between them. That is a difference of squares: 3 x plus 5, times 3 x minus 5, choice C. A squared would have a middle term, and B and D do not expand to 9 x squared minus 25.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a^2 + 2ab + b^2 = (a + b)^2$', 'First and last terms **squares**? Middle term $2ab$?', '$a^2 - b^2 = (a + b)(a - b)$', 'Check by **expanding**'] }],
      lines: [
        { say: 'Here is what to remember. A squared plus 2 a b plus b squared is a plus b, squared.', show: 'sum.0' },
        { say: 'To spot one, check that the first and last terms are squares and the middle term is 2 a b.', show: 'sum.1' },
        { say: 'A difference of squares, \"a\" squared minus \"b\" squared, is \"a\" plus \"b\", times \"a\" minus \"b\".', show: 'sum.2' },
        { say: 'And check by expanding. For more on factoring special products, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
