import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-20-4',
  lessonId: 'mx-20-4',
  title: 'Sets of Real Numbers and Set-Builder Notation',
  thumbnailTitle: 'Sets of Real Numbers',
  thumbnail: 'tb',
  summary: 'The natural numbers sit inside the integers, the integers inside the rational numbers, and the rational and irrational numbers together make the real numbers. Simplify before classifying: √16 = 4 is a natural number. Set-builder notation describes a set by a rule: {x | −2 ≤ x < 3, x ∈ ℤ} is {−2, −1, 0, 1, 2}.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Sets, Absolute Value and Proportionality', title: 'Sets of Real Numbers', subtitle: 'and set-builder notation' }],
      lines: [
        { say: 'Every number you have met, from counting numbers to the square root of two, lives on the number line. Mathematicians sort these numbers into sets that sit one inside the other.', show: 'title' },
        { say: 'In this video, you will learn the names of those sets, how to classify a number, and how to describe a set with set-builder notation.' },
      ],
    },
    {
      chapter: 'Sets and subsets',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Set, element and subset', md: 'A **set** is a collection of distinct objects, its **elements**. Set $A$ is a **subset** of set $B$ when every element of $A$ is also in $B$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\in \\{2, 4, 6\\}'] },
      ],
      lines: [
        { say: 'A set is a collection of distinct objects, which are called its elements. We list the elements inside braces.', show: 'def' },
        { say: 'This symbol means is an element of. Four is an element of the set containing two, four and six.', show: 'm.0', focus: 'm.0' },
        { say: 'One set is a subset of another when every one of its elements is also in the other set. A set is finite when its elements can be counted to an end, and infinite when they go on forever.' },
      ],
    },
    {
      chapter: 'The real number system',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Set', 'Symbol', 'What it contains'],
          rows: [
            ['Natural numbers', '$\\mathbb{N}$', '$1, 2, 3, \\ldots$'],
            ['Integers', '$\\mathbb{Z}$', '$\\ldots, -2, -1, 0, 1, 2, \\ldots$'],
            ['Rational numbers', '$\\mathbb{Q}$', 'fractions of two integers'],
            ['Irrational numbers', '', '$\\sqrt{2}$, $\\pi$: never end, never repeat'],
            ['Real numbers', '$\\mathbb{R}$', 'every number on the number line'],
          ],
        },
      ],
      lines: [
        { say: 'The natural numbers are the counting numbers: one, two, three, and so on.', show: 'tb.0' },
        { say: 'The integers are the natural numbers, their opposites, and zero.', show: 'tb.1' },
        { say: 'The rational numbers are all the numbers that can be written as a fraction of two integers. As decimals, they either stop or repeat.', show: 'tb.2' },
        { say: 'The irrational numbers cannot be written as such a fraction. Their decimals never end and never repeat. The square root of two and pi are irrational.', show: 'tb.3' },
        { say: 'Together, the rational and the irrational numbers make up the real numbers, which are all the numbers on the number line.', show: 'tb.4' },
      ],
    },
    {
      chapter: 'Classifying a number',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['{-5}: \\ \\mathbb{Z},\\ \\mathbb{Q},\\ \\mathbb{R}', '0.\\overline{3} = \\tfrac{1}{3}: \\ \\mathbb{Q},\\ \\mathbb{R}', '\\sqrt{7}: \\ \\text{irrational},\\ \\mathbb{R}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Judging a number by how it looks', md: 'Simplify first. $\\sqrt{16}$ looks like a root, but it equals $4$, a natural number.' },
      ],
      lines: [
        { say: 'Each set sits inside the next, so a number can belong to several sets. Negative five is an integer, so it is also rational and real. It is not a natural number.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point three repeating equals one third. It is rational and real, but it is not an integer.', show: 'm.1', focus: 'm.1' },
        { say: 'Seven is not a perfect square, so the square root of seven is irrational and real.', show: 'm.2', focus: 'm.2' },
        { say: 'Always simplify before you classify. The square root of sixteen looks like a root, but it equals four, which is a natural number.', show: 'oops' },
      ],
    },
    {
      chapter: 'Set-builder notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Set-builder notation', md: 'Describes a set by the rule its elements follow. The bar $\\mid$ means "such that".' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\{x \\mid x > 3,\\ x \\in \\mathbb{R}\\}', '\\{x \\mid {-2} \\le x < 3,\\ x \\in \\mathbb{Z}\\}', '= \\{{-2}, {-1}, 0, 1, 2\\}'] },
      ],
      lines: [
        { say: 'We cannot list every real number greater than three. Set-builder notation describes a set by the rule its elements follow.', show: 'def' },
        { say: 'We read this as: the set of all "x" such that "x" is greater than three, and "x" is a real number.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is another set. Its elements are integers, from negative two up to, but not including, three.', show: 'm.1', focus: 'm.1' },
        { say: 'The less than or equal to sign includes negative two. The less than sign leaves three out. So the set is negative two, negative one, zero, one and two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which set is the same as $\\{x \\mid x \\le 4,\\ x \\in \\mathbb{N}\\}$?',
          choices: ['$\\{0, 1, 2, 3, 4\\}$', '$\\{1, 2, 3, 4\\}$', '$\\{1, 2, 3\\}$', 'All real numbers up to $4$'],
          answer: 1,
          working: 'The natural numbers start at $1$, and $\\le$ includes $4$: $\\{1, 2, 3, 4\\}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which set is the same as the set of all "x" such that "x" is less than or equal to four, and "x" is a natural number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The natural numbers start at one, and the less than or equal to sign includes four. So the set is one, two, three and four.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$ sit one inside the next.', 'Rational decimals stop or repeat. Irrational decimals do neither.', 'Simplify a number before classifying it.', '$\\{x \\mid \\ldots\\}$ reads "the set of all $x$ such that ...".'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The natural numbers, the integers, the rational numbers and the real numbers sit one inside the next.', show: 'sum.0' },
        { say: 'Rational numbers stop or repeat as decimals. Irrational numbers do neither.', show: 'sum.1' },
        { say: 'Simplify a number before deciding which sets it belongs to.', show: 'sum.2' },
        { say: 'And set-builder notation describes a set by its rule. In the next lesson, we learn the notation of geometry. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
