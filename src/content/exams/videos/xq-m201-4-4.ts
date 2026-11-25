import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 4.4 (the discriminant and applications): the width of a
// walkway around a 12 ft by 15 ft garden, with a total area of 378 ft². The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 2.5, Quadratic Equations,
// CC BY-NC-SA 4.0), whose answer key gives 3 feet. (12 + 2x)(15 + 2x) = 378 gives
// 2x² + 27x − 99 = 0, whose discriminant is 729 + 792 = 1521 = 39², so x = (−27 ± 39)/4.

/** The garden and its walkway drawn to scale, 15 by 12 inside 21 by 18; `solved` labels x as 3 ft. */
const lot = (height = 320, solved = false): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'region', id: 'walk', points: ['O1', 'O2', 'O3', 'O4'], tone: 'muted', shade: 0.25 },
    { kind: 'region', id: 'bed', points: ['I1', 'I2', 'I3', 'I4'], tone: 'good', shade: 0.25 },
    { kind: 'line', id: 'o1', from: 'O1', to: 'O2', tone: 'muted' },
    { kind: 'line', id: 'o2', from: 'O2', to: 'O3', tone: 'muted' },
    { kind: 'line', id: 'o3', from: 'O3', to: 'O4', tone: 'muted' },
    { kind: 'line', id: 'o4', from: 'O4', to: 'O1', tone: 'muted' },
    { kind: 'line', id: 'len', from: 'I4', to: 'I3', tone: 'adj', weight: 5, label: '15\\text{ ft}', labelSide: 'right', group: 'garden' },
    { kind: 'line', id: 'wid', from: 'I1', to: 'I4', tone: 'hyp', weight: 5, label: '12\\text{ ft}', labelSide: 'right', group: 'garden' },
    { kind: 'line', id: 'i1', from: 'I1', to: 'I2', tone: 'good', group: 'garden' },
    { kind: 'line', id: 'i2', from: 'I2', to: 'I3', tone: 'good', group: 'garden' },
    { kind: 'line', id: 'xr', from: 'XA', to: 'XB', tone: 'opp', weight: 4, label: solved ? '3\\text{ ft}' : 'x', labelSide: 'left', group: 'path' },
    { kind: 'line', id: 'xt', from: 'XC', to: 'XD', tone: 'opp', weight: 4, label: solved ? '3\\text{ ft}' : 'x', labelSide: 'left', group: 'path' },
    { kind: 'label', id: 'wl', at: 'WL', tex: '\\text{walkway}', place: 'center', tone: 'muted', group: 'path' },
  ];
  return {
    kind: 'diagram',
    id: 'lot',
    height,
    points: {
      O1: [0, 0], O2: [21, 0], O3: [21, 18], O4: [0, 18],
      I1: [3, 3], I2: [18, 3], I3: [18, 15], I4: [3, 15], 
      XA: [18, 9], XB: [21, 9], XC: [10.5, 15], XD: [10.5, 18], WL: [10.5, 1.5],
    },
    items,
  };
};

const QUESTION =
  'A vacant lot is being converted into a community garden. The garden and the walkway around its perimeter have an area of 378 ft². Find the width of the walkway if the garden is 12 ft. wide by 15 ft. long.';

const video: Explainer = {
  id: 'xq-m201-4-4',
  lessonId: '',
  exam: {
    lesson: 'm201-4-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 2.5, Quadratic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: How Wide Is the Walkway Around the Garden? (The Discriminant)',
  thumbnailTitle: 'How Wide Is the Walkway?',
  thumbnail: 'lot',
  summary:
    'A real test question, solved one small step at a time: a 12 ft by 15 ft garden has a walkway around it, and together they cover 378 square feet. We write (12 + 2x)(15 + 2x) = 378, simplify to 2x² + 27x − 99 = 0, use the discriminant to see that it has two rational roots, and solve: the walkway is 3 feet wide. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Wide Is the Walkway?', subtitle: 'The discriminant and applications, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic equations and the discriminant. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A vacant lot is being converted into a community garden. The garden and the walkway around its perimeter have an area of $378$ ft². Find the width of the walkway if the garden is $12$ ft. wide by $15$ ft. long.',
          answer: '$3$ feet',
          working: '$(12 + 2x)(15 + 2x) = 378$ gives $2x^2 + 27x - 99 = 0$, so $x = \\dfrac{-27 \\pm 39}{4} = 3$ (or $-16.5$, rejected).',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A vacant lot is being converted into a community garden. The garden and the walkway around its perimeter have an area of 378 square feet. Find the width of the walkway if the garden is 12 feet wide by 15 feet long.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        lot(420),
        { kind: 'text', id: 't', size: 'md', md: 'The walkway adds $x$ on **both** ends of each side, so the whole lot is $(12 + 2x)$ by $(15 + 2x)$.' },
      ],
      lines: [
        { say: 'Here is the garden, 15 feet long and 12 feet wide.', show: ['lot', 'lot.garden'], focus: 'lot.garden' },
        { say: 'The walkway goes all the way around it. Call its width x.', show: 'lot.path', focus: 'lot.path' },
        { say: 'The walkway adds x at both ends of each side. So the whole lot is 12 plus 2 x wide, and 15 plus 2 x long, and its area is 378 square feet.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'qf', tone: 'definition', title: 'The quadratic formula', md: 'For $ax^2 + bx + c = 0$: $\\ x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.' },
        { kind: 'callout', id: 'disc', tone: 'key', title: 'The discriminant', md: '$b^2 - 4ac$. Positive: **two** real roots (rational if it is a perfect square). Zero: one. Negative: none.' },
      ],
      lines: [
        { say: 'Here is what we need. The quadratic formula: x equals negative b, plus or minus the square root of b squared minus 4 \"a\" c, all over 2 \"a\".', show: 'qf' },
        { say: 'The part under the root, b squared minus 4 \"a\" c, is the discriminant. If it is positive, there are two real roots, and if it is a perfect square they are rational, so the equation factors. If it is 0, there is one root, and if it is negative, there are none.', show: 'disc' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **area** equation and simplify', 'Use the **discriminant** to see what roots to expect', 'Solve, and keep the root that makes **sense**'] }],
      lines: [
        { say: 'Here is the plan. First, write the area equation and simplify it.', show: 'plan.0' },
        { say: 'Second, use the discriminant to see what kind of roots to expect.', show: 'plan.1' },
        { say: 'Third, solve, and keep the root that makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The area equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(12 + 2x)(15 + 2x) = 378', '180 + 24x + 30x + 4x^2 = 378', '4x^2 + 54x - 198 = 0', '2x^2 + 27x - 99 = 0'] }],
      lines: [
        { say: 'Step one. Width times length is the area: 12 plus 2 x, times 15 plus 2 x, equals 378.', show: 'm.0' },
        { say: 'Multiply out: 12 times 15 is 180, 12 times 2 x is 24 x, 2 x times 15 is 30 x, and 2 x times 2 x is 4 x squared.', show: 'm.1' },
        { say: 'Collect the terms and take 378 from both sides: 4 x squared plus 54 x minus 198 equals 0.', show: 'm.2' },
        { say: 'Every number is even, so divide by 2: 2 x squared plus 27 x minus 99 equals 0.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 2: The discriminant',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a = 2, \\ b = 27, \\ c = -99', 'b^2 - 4ac = 729 - 4(2)(-99)', '= 729 + 792 = 1521 = \\good{39^2}'] }],
      lines: [
        { say: 'Step two. Here \"a\" is 2, b is 27, and c is negative 99.', show: 'm.0' },
        { say: 'The discriminant is 27 squared, which is 729, minus 4 times 2 times negative 99.', show: 'm.1' },
        { say: 'Minus a negative is plus, so it is 729 plus 792, which is 1,521. That is 39 squared, a perfect square. So there are two real roots, and both are rational.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'split',
      left: [lot(420, true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = \\dfrac{-27 \\pm 39}{2(2)}', 'x = \\dfrac{12}{4} = 3', 'x = \\dfrac{-66}{4} = -16.5', '\\text{width} = \\good{3 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. By the quadratic formula, x is negative 27 plus or minus 39, over 2 times 2.', show: 'm.0' },
        { say: 'Negative 27 plus 39 is 12, and 12 over 4 is 3. Negative 27 minus 39 is negative 66, and negative 66 over 4 is negative 16.5.', show: ['m.1', 'm.2'] },
        { say: 'A walkway cannot be negative 16.5 feet wide, so the walkway is 3 feet wide. That is the answer.', show: ['lot', 'lot.garden', 'lot.path', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 + 2(3) = 18, \\quad 15 + 2(3) = 21', '18 \\times 21 = 378 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. With a 3 foot walkway, the lot is 12 plus 6, which is 18 feet wide, and 15 plus 6, which is 21 feet long.', show: 'm.0' },
        { say: '18 times 21 is 378 square feet. It fits.', show: 'm.1' },
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
            ['$(12 + x)(15 + x) = 378$', 'the walkway is on **both** sides: add $2x$'],
            ['$b^2 - 4ac = 729 - 792$', '$c = -99$, so $-4ac = +792$'],
            ['$x = -16.5$', 'a width cannot be **negative**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The walkway is on both ends of each side, so each side grows by 2 x, not x.' },
        { say: 'c is negative 99, so negative 4 \"a\" c is positive 792. Watch the signs.' },
        { say: 'And negative 16.5 solves the equation, but a walkway cannot be negative 16.5 feet wide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many real roots does $2x^2 - 3x + 5 = 0$ have?',
          choices: ['two different real roots', 'one real root', 'no real roots', 'infinitely many'],
          answer: 2,
          working: '$b^2 - 4ac = 9 - 4(2)(5) = 9 - 40 = -31 < 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many real roots does 2 x squared minus 3 x plus 5 equals 0 have? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The discriminant is negative 3 squared, which is 9, minus 4 times 2 times 5, which is 40. 9 minus 40 is negative 31. It is negative, so there are no real roots, choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A border of width $x$ adds $2x$ to each side', 'Discriminant $b^2 - 4ac$: positive, zero or negative', 'A **perfect square** means rational roots', 'Reject roots that do not make sense'] }],
      lines: [
        { say: 'Here is what to remember. A border of width x adds 2 x to each side.', show: 'sum.0' },
        { say: 'The discriminant, b squared minus 4 \"a\" c, tells you how many real roots there are: two if positive, one if zero, and none if negative.', show: 'sum.1' },
        { say: 'If it is a perfect square, the roots are rational.', show: 'sum.2' },
        { say: 'And reject roots that do not make sense, like a negative width. For more on the discriminant, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
