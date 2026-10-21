import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-5-3-b',
  lessonId: 'm8-5-3',
  title: 'Order of Operations with Integers, Part 2: Brackets and Left to Right',
  thumbnailTitle: 'Brackets and Left to Right',
  thumbnail: false,
  summary:
    'Work one step at a time and write each new line. (−12) ÷ (3 − 7) + 2 × (−5): brackets first, 3 − 7 = −4; then (−12) ÷ (−4) = 3 and 2 × (−5) = −10; then 3 + (−10) = −7. Multiplication and division have the same rank, so (−18) ÷ 3 × (−2) = (−6) × (−2) = 12, working from left to right. A fraction bar groups the top and the bottom like brackets: ((−4) + (−8)) / (−3) = (−12) / (−3) = 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 2', title: 'Brackets and Left to Right', subtitle: 'Longer expressions, one step at a time' }],
      lines: [
        { say: 'Some expressions mix brackets, division and multiplication all together, with negative numbers everywhere.', show: 'title' },
        { say: 'In this part, you will work through longer expressions one step at a time, and see why multiplication does not always go first.' },
      ],
    },
    {
      chapter: 'Brackets first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $(-12) \\div (3 - 7) + 2 \\times (-5)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-12) \\div \\underline{(3 - 7)} + 2 \\times (-5)', '= \\underline{(-12) \\div (-4)} + \\underline{2 \\times (-5)}', '= 3 + (-10)', '= -7'] },
      ],
      lines: [
        { say: 'Evaluate negative twelve divided by the bracket three minus seven, plus two times negative five.', show: 'q' },
        { say: 'Brackets first. Three minus seven is negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'Write the new line: negative twelve divided by negative four, plus two times negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, divide and multiply from left to right. Negative twelve divided by negative four is positive three. Two times negative five is negative ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, add. Three plus negative ten is negative seven.', show: 'm.3', focus: 'm.3' },
        { say: 'Work one step at a time, write each new line, and copy every sign carefully.' },
      ],
    },
    {
      chapter: 'Left to right',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $(-18) \\div 3 \\times (-2)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\underline{(-18) \\div 3} \\times (-2)', '= (-6) \\times (-2)', '= 12'] },
      ],
      lines: [
        { say: 'Now evaluate negative eighteen divided by three, times negative two.', show: 'q' },
        { say: 'Division and multiplication have the same rank, so work from left to right. The division comes first here, because it is on the left. Negative eighteen divided by three is negative six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then multiply. Negative six times negative two is positive twelve.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'mistake', title: 'Multiplication does not always go first', md: 'Multiplication and division have the **same** rank. Do whichever comes first from the left. Addition and subtraction work the same way.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times (-2) = -6, \\quad (-18) \\div (-6) = 3 \\;\\bad{\\times}', '(-18) \\div 3 = -6, \\quad (-6) \\times (-2) = 12 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out. Some people always multiply before they divide. Here, that means three times negative two first, which is negative six. Then negative eighteen divided by negative six is three.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'That is wrong. Multiplication and division have the same rank, so do whichever comes first from the left. Addition and subtraction work the same way.', focus: 'tip' },
        { say: 'Working from left to right gives the right answer: twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fraction bars',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A fraction bar groups', md: 'A fraction bar groups the top and the bottom, just like brackets. Work out the top and the bottom first, then divide.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{(-4) + (-8)}{-3} = \\dfrac{-12}{-3} = 4'] },
      ],
      lines: [
        { say: 'A fraction bar groups the top and the bottom, just like brackets.', show: 'key' },
        { say: 'Here, the top is negative four plus negative eight, and the bottom is negative three. Work out the top first: negative four plus negative eight is negative twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide. Negative twelve divided by negative three is positive four, because the signs are the same.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $(-20) \\div (-2 - 3) \\times 2$.',
          choices: ['$8$', '$2$', '$-8$', '$-2$'],
          answer: 0,
          working: 'Brackets: $-2 - 3 = -5$. Then from left to right: $(-20) \\div (-5) = 4$, and $4 \\times 2 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate negative twenty divided by the bracket negative two minus three, then times two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight. Brackets first: negative two minus three is negative five. Then, from left to right, negative twenty divided by negative five is four, and four times two is eight. Choice B multiplies before dividing.', show: 'q.answer' },
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
            'Work one step at a time, and write each new line.',
            'Multiplication and division have the same rank: work from left to right.',
            'Addition and subtraction have the same rank as well.',
            'A fraction bar groups the top and the bottom like brackets.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Work one step at a time, write each new line, and copy every sign.', show: 'sum.0' },
        { say: 'Multiplication and division have the same rank, so work from left to right.', show: 'sum.1' },
        { say: 'Addition and subtraction have the same rank as well.', show: 'sum.2' },
        { say: 'And a fraction bar groups the top and the bottom like brackets. In the next part, you will use integers to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
