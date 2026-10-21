import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-5-2-b',
  lessonId: 'm8-5-2',
  title: 'Dividing Integers, Part 2: The Sign Rules for Division',
  thumbnailTitle: 'Sign Rules for Division',
  thumbnail: false,
  summary:
    'Division undoes multiplication: 12 ÷ (−4) = −3 because (−4) × (−3) = 12. Divide the numbers without their signs; same signs give a positive quotient and different signs a negative one, the same rules as for multiplication. A fraction bar means divide: −56/8 = −7. A missing factor is a quotient: (−6) × ☐ = 42 gives ☐ = 42 ÷ (−6) = −7. 0 ÷ (−5) = 0, but you can never divide by 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 2', title: 'The Sign Rules for Division', subtitle: 'Same signs, different signs' }],
      lines: [
        { say: 'Counters work well for small numbers. But what about negative fifty-six divided by eight? You need a faster way.', show: 'title' },
        { say: 'In this part, you will use multiplication to find the sign rules for division, and see why you can never divide by zero.' },
      ],
    },
    {
      chapter: 'A related multiplication',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $12 \\div (-4)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-4) \\times \\square = 12', '(-4) \\times (-3) = 12', '12 \\div (-4) = -3'] },
      ],
      lines: [
        { say: 'Find twelve divided by negative four. Division undoes multiplication, so ask: negative four times what number gives twelve?', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The product, twelve, is positive, so the two factors must have the same sign. Negative four times negative three is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'So twelve divided by negative four is negative three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The sign rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sign rules for division', md: 'Divide the numbers without their signs. Then **same signs** give a **positive** quotient, and **different signs** give a **negative** quotient.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\div 4 = 3 \\qquad (-12) \\div (-4) = 3', '(-12) \\div 4 = -3 \\qquad 12 \\div (-4) = -3'] },
      ],
      lines: [
        { say: 'Here are the sign rules for division. First, divide the numbers without their signs.', show: 'def' },
        { say: 'If the signs are the same, the quotient is positive. Twelve divided by four is three, and negative twelve divided by negative four is three as well.', show: 'm.0', focus: 'm.0' },
        { say: 'If the signs are different, the quotient is negative. Negative twelve divided by four is negative three, and so is twelve divided by negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'These are the same rules as for multiplication. That makes sense, because division undoes multiplication.' },
      ],
    },
    {
      chapter: 'Fraction bars',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{-56}{8} = (-56) \\div 8', '56 \\div 8 = 7', '\\dfrac{-56}{8} = -7'] }],
      lines: [
        { say: 'A fraction bar also means divide. Negative fifty-six over eight means negative fifty-six divided by eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Without the signs, fifty-six divided by eight is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The signs are different, so the quotient is negative. Negative fifty-six over eight equals negative seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A missing factor',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the missing integer: $(-6) \\times \\square = 42$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\square = 42 \\div (-6)', '42 \\div 6 = 7, \\text{ and the signs are different}', '\\square = -7', '\\text{Check: } (-6) \\times (-7) = 42 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Find the missing integer. Negative six, times a missing number, equals forty-two.', show: 'q' },
        { say: 'Division undoes multiplication, so the missing factor is forty-two divided by negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'Forty-two divided by six is seven. The signs are different, so the quotient is negative seven.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: negative six times negative seven is positive forty-two. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by zero', md: 'You can multiply by $0$, but you **cannot** divide by $0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0 \\div (-5) = 0 \\qquad \\text{because } (-5) \\times 0 = 0', '(-5) \\div 0 \\qquad \\text{has no answer}'] },
      ],
      lines: [
        { say: 'Watch out for zero. Zero divided by negative five is zero, because negative five times zero is zero.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But negative five divided by zero has no answer. Use the related multiplication: zero times what number gives negative five?', show: 'm.1', focus: 'm.1' },
        { say: 'Zero times any number is zero, never negative five. So no number works. You can multiply by zero, but you can never divide by zero.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(-48) \\div (-6)$.',
          choices: ['$8$', '$-8$', '$-54$', '$-42$'],
          answer: 0,
          working: '$48 \\div 6 = 8$. The signs are the same, so the quotient is positive: $(-48) \\div (-6) = 8$. Check: $(-6) \\times 8 = -48$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative forty-eight divided by negative six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, positive eight. Forty-eight divided by six is eight, and the signs are the same, so the quotient is positive. Choice B has the right size but the wrong sign.', show: 'q.answer' },
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
            'Divide the numbers without their signs.',
            'Same signs give a positive quotient. Different signs give a negative quotient.',
            'A fraction bar means divide: $\\dfrac{-56}{8} = -7$.',
            'You can never divide by $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To divide integers, divide the numbers without their signs.', show: 'sum.0' },
        { say: 'Same signs give a positive quotient, and different signs give a negative quotient: the same rules as for multiplying.', show: 'sum.1' },
        { say: 'A fraction bar means divide.', show: 'sum.2' },
        { say: 'And you can never divide by zero. In the next part, you will use division to find an average change and a mean. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
