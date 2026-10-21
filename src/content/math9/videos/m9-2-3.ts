import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-2-3',
  lessonId: 'm9-2-3',
  title: 'Order of Operations with Powers, Part 1: Powers Before Multiplying',
  thumbnailTitle: 'Powers Before Multiplying',
  thumbnail: false,
  summary:
    'The order of operations: brackets, exponents, then divide and multiply from left to right, then add and subtract from left to right (BEDMAS). 4 + 5² × 2 = 4 + 25 × 2 = 4 + 50 = 54; adding first gives (4 + 5)² × 2 = 162, a different expression. With brackets, work inside them first: (3 + 4)² − 2³ = 7² − 2³ = 49 − 8 = 41.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 1', title: 'Powers Before Multiplying', subtitle: 'The order of operations' }],
      lines: [
        { say: 'Two friends work out four plus five squared times two. One gets fifty-four, and the other gets one hundred sixty-two. Only one of them is right.', show: 'title' },
        { say: 'An agreed order of operations makes sure everyone gets the same answer. In this lesson, you will use it with powers. This first part sets out the order.' },
      ],
    },
    {
      chapter: 'The order of operations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Order of operations', md: 'The **order of operations** is the agreed order for working out an expression. Many people remember it as **BEDMAS**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'What to do'],
          rows: [
            ['$1$', '**B**rackets'],
            ['$2$', '**E**xponents (powers)'],
            ['$3$', '**D**ivide and **M**ultiply, from left to right'],
            ['$4$', '**A**dd and **S**ubtract, from left to right'],
          ],
        },
      ],
      lines: [
        { say: 'The order of operations is the agreed order for working out an expression. It has four steps.', show: 'def' },
        { say: 'First, work out anything in brackets.', show: 't.0', focus: 't.0' },
        { say: 'Second, work out the exponents, which means the powers.', show: 't.1', focus: 't.1' },
        { say: 'Third, divide and multiply, in order from left to right.', show: 't.2', focus: 't.2' },
        { say: 'Fourth, add and subtract, in order from left to right. The first letters spell BEDMAS, which helps many people remember the order.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Exponents first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $4 + 5^2 \\times 2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 + 5^2 \\times 2', '= 4 + 25 \\times 2', '= 4 + 50', '= 54'] },
      ],
      lines: [
        { say: 'Evaluate four plus five squared times two. There are no brackets, so start with the exponents.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Five squared is twenty-five. So we have four plus twenty-five times two.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, multiply. Twenty-five times two is fifty, so we have four plus fifty.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, add. Four plus fifty is fifty-four. The friend who got fifty-four is right.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Adding first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding first', md: 'Adding $4 + 5$ first works out $(4 + 5)^2 \\times 2$, which is a **different** expression.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{(4 + 5)^2 \\times 2 = 9^2 \\times 2 = 81 \\times 2 = 162}', '\\good{4 + 5^2 \\times 2 = 54}'] },
      ],
      lines: [
        { say: 'What went wrong for the other friend? That friend added four and five first, to get nine.', show: 'oops' },
        { say: 'Then nine squared is eighty-one, and eighty-one times two is one hundred sixty-two. But adding first is the same as putting brackets around four plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'That is a different expression. In four plus five squared times two, the exponent belongs to the five only, and the adding comes last.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Brackets first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $(3 + 4)^2 - 2^3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(3 + 4)^2 - 2^3', '= 7^2 - 2^3', '= 49 - 8', '= 41'] },
      ],
      lines: [
        { say: 'Now evaluate three plus four, all squared, minus two cubed. This time there are brackets, so start inside them.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Three plus four is seven. So we have seven squared minus two cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, the exponents. Seven squared is forty-nine, and two cubed is eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, subtract. Forty-nine minus eight is forty-one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $3 + 2^3 \\times 5$.',
          choices: ['$55$', '$625$', '$43$', '$33$'],
          answer: 2,
          working: 'Exponent first: $2^3 = 8$. Multiply: $8 \\times 5 = 40$. Add: $3 + 40 = 43$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three plus two cubed times five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, forty-three. Two cubed is eight, eight times five is forty, and three plus forty is forty-three. Choice A, fifty-five, adds three and eight before multiplying, but multiplying comes before adding.', show: 'q.answer' },
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
            'Order of operations: brackets, exponents, divide and multiply, add and subtract.',
            'Divide and multiply from left to right; add and subtract from left to right.',
            '$4 + 5^2 \\times 2 = 4 + 25 \\times 2 = 54$',
            '$(3 + 4)^2 - 2^3 = 49 - 8 = 41$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The order of operations is brackets, exponents, divide and multiply, then add and subtract.', show: 'sum.0' },
        { say: 'Divide and multiply from left to right, and add and subtract from left to right.', show: 'sum.1' },
        { say: 'So in four plus five squared times two, the power comes first, then the multiplying, then the adding.', show: 'sum.2' },
        { say: 'And brackets always come first. In the next part, you will use the order of operations with negative numbers and fraction bars. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
