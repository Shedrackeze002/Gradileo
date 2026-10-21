import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-5-1-d',
  lessonId: 'm8-5-1',
  title: 'Multiplying Integers, Part 4: More Than Two Factors',
  thumbnailTitle: 'More Than Two Factors',
  thumbnail: false,
  summary:
    'To multiply more than two integers, multiply two factors at a time: (−2) × 3 × (−5) = (−6) × (−5) = 30. Or count the negative factors: an even number gives a positive product and an odd number a negative one, so (−3)(−2)(−5) = −30. Two brackets side by side mean multiply: (−4)(7) = −28.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 4', title: 'More Than Two Factors', subtitle: 'Count the negative factors' }],
      lines: [
        { say: 'What is negative two, times three, times negative five? This product has three factors: three numbers being multiplied.', show: 'title' },
        { say: 'In this part, you will multiply more than two integers, and learn a quick way to find the sign of the product.' },
      ],
    },
    {
      chapter: 'Two at a time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-2) \\times 3 \\times (-5)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-2) \\times 3 = -6', '(-6) \\times (-5) = 30', '(-2) \\times 3 \\times (-5) = 30'] },
      ],
      lines: [
        { say: 'Find negative two, times three, times negative five. Multiply two factors at a time, from left to right.', show: 'q' },
        { say: 'First, negative two times three. The signs are different, so the product is negative: negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'Now multiply that by the last factor. Negative six times negative five: the signs are the same, so the product is positive thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'So negative two, times three, times negative five, equals thirty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Count the negatives',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Product', 'Negative factors', 'Value'],
          rows: [
            ['$(-1)$', '$1$, odd', '$-1$'],
            ['$(-1) \\times (-1)$', '$2$, even', '$1$'],
            ['$(-1) \\times (-1) \\times (-1)$', '$3$, odd', '$-1$'],
            ['$(-1) \\times (-1) \\times (-1) \\times (-1)$', '$4$, even', '$1$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Count the negative factors', md: 'An **even** number of negative factors gives a **positive** product. An **odd** number gives a **negative** product.' },
      ],
      lines: [
        { say: 'Here is a quicker way to find the sign. Count the negative factors. Negative one on its own is negative.', show: 't.0' },
        { say: 'Two negative factors make a positive: negative one times negative one is positive one.', show: 't.1', focus: 't.1' },
        { say: 'With three negative factors, the first two make a positive, and the third one makes the product negative again.', show: 't.2', focus: 't.2' },
        { say: 'Four negative factors make two pairs, and each pair is positive, so the product is positive.', show: 't.3', focus: 't.3' },
        { say: 'The even numbers are two, four, six and so on, and the odd numbers are one, three, five and so on. An even number of negative factors gives a positive product. An odd number gives a negative product.', show: 'key', focus: 'key' },
      ],
    },
    {
      chapter: 'Brackets side by side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Brackets side by side', md: 'Two brackets with nothing between them mean **multiply**. A number just before a bracket means multiply as well.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-4)(7) = (-4) \\times 7 = -28', '5(-3) = 5 \\times (-3) = -15'] },
      ],
      lines: [
        { say: 'You will often see integers in brackets, side by side, with no times sign. Two brackets with nothing between them mean multiply.', show: 'tip' },
        { say: 'So the bracket negative four, next to the bracket seven, means negative four times seven. The signs are different, so the product is negative twenty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'A number right before a bracket means multiply as well. Five next to the bracket negative three means five times negative three, which is negative fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Putting it together',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-3)(-2)(-5)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['3 \\times 2 \\times 5 = 30', '3 \\text{ negative factors: odd, so negative}', '(-3)(-2)(-5) = -30', '\\text{Check: } (-3)(-2) = 6, \\quad 6(-5) = -30 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Now find negative three, times negative two, times negative five, written with brackets side by side.', show: 'q' },
        { say: 'Multiply the numbers without their signs: three times two times five is thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Count the negative factors. There are three, and three is odd, so the product is negative.', show: 'm.1', focus: 'm.1' },
        { say: 'So the product is negative thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by multiplying two at a time. Negative three times negative two is six, and six times negative five is negative thirty. It matches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(-2)(-3)(-4)$.',
          choices: ['$24$', '$-9$', '$-24$', '$9$'],
          answer: 2,
          working: '$2 \\times 3 \\times 4 = 24$. There are $3$ negative factors, an odd number, so the product is negative: $-24$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative two, times negative three, times negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative twenty-four. Two times three times four is twenty-four, and there are three negative factors, an odd number, so the product is negative. Choice A has the right size, but the wrong sign.', show: 'q.answer' },
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
            'Multiply two factors at a time: $(-2) \\times 3 \\times (-5) = 30$.',
            'An even number of negative factors gives a positive product.',
            'An odd number of negative factors gives a negative product.',
            '$(-4)(7)$ means $(-4) \\times 7 = -28$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply more than two integers, multiply two factors at a time.', show: 'sum.0' },
        { say: 'Or count the negative factors. An even number of them gives a positive product.', show: 'sum.1' },
        { say: 'An odd number of them gives a negative product.', show: 'sum.2' },
        { say: 'And brackets side by side mean multiply. Next, you will learn to divide integers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
