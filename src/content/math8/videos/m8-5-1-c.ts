import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-5-1-c',
  lessonId: 'm8-5-1',
  title: 'Multiplying Integers, Part 3: The Sign Rules',
  thumbnailTitle: 'The Sign Rules',
  thumbnail: false,
  summary:
    'In the pattern 3 × (−2) = −6, 2 × (−2) = −4, 1 × (−2) = −2, 0 × (−2) = 0, the product goes up by 2 each time, so (−1) × (−2) = 2, (−2) × (−2) = 4 and (−3) × (−2) = 6. Multiply the numbers without their signs; same signs give a positive product and different signs a negative one: (−7) × (−8) = 56 and (−6) × 9 = −54. Adding two negatives gives a negative, but multiplying them gives a positive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 3', title: 'The Sign Rules', subtitle: 'Same signs, different signs' }],
      lines: [
        { say: 'Drawing counters every time takes a while, especially for bigger numbers, like negative seven times negative eight.', show: 'title' },
        { say: 'In this part, you will find a pattern, and turn it into two short rules for the sign of a product. The product is the answer to a multiplication.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'split',
      leftWidth: 420,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Product', 'Value'],
          rows: [
            ['$3 \\times (-2)$', '$-6$'],
            ['$2 \\times (-2)$', '$-4$'],
            ['$1 \\times (-2)$', '$-2$'],
            ['$0 \\times (-2)$', '$0$'],
            ['$(-1) \\times (-2)$', '$2$'],
            ['$(-2) \\times (-2)$', '$4$'],
            ['$(-3) \\times (-2)$', '$6$'],
          ],
        },
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['The second factor is always $-2$.', 'The first factor goes **down** by $1$ each time.', 'The product goes **up** by $2$ each time.', 'So a negative times a negative is **positive**.'],
        },
      ],
      lines: [
        { say: 'Here is a pattern. The second factor is always negative two. The first factor goes down by one each time: three, two, one, zero.', show: ['t.0', 'b.0', 'b.1'] },
        { say: 'Three times negative two is negative six. Two times negative two is negative four. One times negative two is negative two. And zero times negative two is zero.', show: ['t.1', 't.2', 't.3'] },
        { say: 'Look at the products: negative six, negative four, negative two, zero. Each time the first factor goes down by one, the product goes up by two.', show: 'b.2', focus: 'b.2' },
        { say: 'Keep the pattern going. Negative one times negative two is two more than zero, which is positive two.', show: 't.4', focus: 't.4' },
        { say: 'Then comes positive four, and then positive six.', show: ['t.5', 't.6'], focus: ['t.5', 't.6'] },
        { say: 'These products are positive! A negative times a negative is positive, just as the counters showed in the last part.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'The sign rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sign rules for multiplication', md: 'Multiply the numbers without their signs. Then **same signs** give a **positive** product, and **different signs** give a **negative** product.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 2 = 6 \\qquad (-3) \\times (-2) = 6', '3 \\times (-2) = -6 \\qquad (-3) \\times 2 = -6'] },
      ],
      lines: [
        { say: 'Here are the sign rules for multiplication. First, multiply the numbers without their signs.', show: 'def' },
        { say: 'Then, if the signs are the same, both positive or both negative, the product is positive. Three times two is six, and negative three times negative two is six as well.', show: 'm.0', focus: 'm.0' },
        { say: 'If the signs are different, one positive and one negative, the product is negative. Three times negative two is negative six, and so is negative three times two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using the rules',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-7) \\times (-8)$ and $(-6) \\times 9$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['7 \\times 8 = 56 \\qquad \\text{same signs} \\qquad (-7) \\times (-8) = 56', '6 \\times 9 = 54 \\qquad \\text{different signs} \\qquad (-6) \\times 9 = -54'] },
      ],
      lines: [
        { say: 'Find negative seven times negative eight. First, multiply without the signs: seven times eight is fifty-six.', show: 'q' },
        { say: 'The signs are the same, both negative, so the product is positive. Negative seven times negative eight is positive fifty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Now find negative six times nine. Without the signs, six times nine is fifty-four.' },
        { say: 'The signs are different, so the product is negative. Negative six times nine is negative fifty-four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up adding and multiplying', md: '“Two negatives make a negative” is true for **adding**, but not for **multiplying**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3) + (-2) = -5 \\qquad \\text{adding}', '(-3) \\times (-2) = 6 \\qquad \\text{multiplying}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Negative three plus negative two is negative five. When you add two negatives, you get something more negative.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But negative three times negative two is positive six. When you multiply two negatives, the product is positive.', show: 'm.1', focus: 'm.1' },
        { say: 'So the saying “two negatives make a negative” is true for adding, but not for multiplying. Always look at the operation first.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(-9) \\times (-4)$.',
          choices: ['$36$', '$-36$', '$-13$', '$13$'],
          answer: 0,
          working: '$9 \\times 4 = 36$. The signs are the same, so the product is positive: $(-9) \\times (-4) = 36$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative nine times negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, positive thirty-six. Nine times four is thirty-six, and the signs are the same, so the product is positive. Choice C adds the two integers instead of multiplying them.', show: 'q.answer' },
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
          items: [
            'Multiply the numbers without their signs.',
            'Same signs give a positive product: $(-7) \\times (-8) = 56$.',
            'Different signs give a negative product: $(-6) \\times 9 = -54$.',
            'Adding two negatives gives a negative, but multiplying them gives a positive.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply integers, first multiply the numbers without their signs.', show: 'sum.0' },
        { say: 'If the signs are the same, the product is positive.', show: 'sum.1' },
        { say: 'If the signs are different, the product is negative.', show: 'sum.2' },
        { say: 'And remember: adding two negatives gives a negative, but multiplying two negatives gives a positive. In the next part, you will multiply more than two integers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
