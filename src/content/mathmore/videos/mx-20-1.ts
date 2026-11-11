import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-20-1',
  lessonId: 'mx-20-1',
  title: 'Absolute Value and Opposites',
  thumbnail: 'm',
  summary: 'The absolute value of a number is its distance from zero, so |−7| = 7 and |7| = 7. Opposites such as 6 and −6 add to zero. Work out the inside of the bars first: |3 − 10| = |−7| = 7. Of two negative numbers, the one with the greater absolute value is the smaller: −3.8 < −3.2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Sets, Absolute Value and Proportionality', title: 'Absolute Value and Opposites', subtitle: 'How far a number is from zero' }],
      lines: [
        { say: 'A temperature of negative eight degrees and a temperature of eight degrees are on opposite sides of zero. But they are the same number of degrees away from it.', show: 'title' },
        { say: 'In this video, you will learn what opposites and absolute value mean, how to calculate with absolute value, and how to order negative numbers.' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposite (additive inverse)', md: 'The number the same distance from zero on the other side of the number line. A number and its opposite add to zero.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 + ({-6}) = 0', '{-2.5} + 2.5 = 0'] },
      ],
      lines: [
        { say: 'The opposite of a number is the number that is the same distance from zero, on the other side of the number line. It is also called the additive inverse.', show: 'def' },
        { say: 'The opposite of six is negative six. Together they add to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'The opposite of negative two point five is two point five. And the opposite of zero is zero itself.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Absolute value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Absolute value', md: 'The distance of a number from zero on the number line, written with two bars: $|x|$. A distance is never negative.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['|7| = 7', '|{-7}| = 7', '|{-4.5}| = 4.5 \\qquad |0| = 0'] },
      ],
      lines: [
        { say: 'The absolute value of a number is its distance from zero on the number line. We write it with two vertical bars.', show: 'def' },
        { say: 'Seven is seven units from zero, so the absolute value of seven is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative seven is also seven units from zero, so the absolute value of negative seven is seven as well. A distance is never negative.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, the absolute value of negative four point five is four point five, and the absolute value of zero is zero.', show: 'm.2', focus: 'm.2' },
        { say: 'This means every positive distance belongs to two numbers. The two numbers with an absolute value of nine are nine and negative nine.' },
      ],
    },
    {
      chapter: 'Calculating with absolute value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['|3 - 10| + |{-2}|', '= |{-7}| + |{-2}|', '= 7 + 2 = 9'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Making each number positive first', md: '$|3 - 10|$ is not $3 + 10$. Work out the inside of the bars first.' },
      ],
      lines: [
        { say: 'The bars work like brackets. Work out what is inside them first, and then take the absolute value.', show: 'm.0', focus: 'm.0' },
        { say: 'Three minus ten is negative seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The absolute value of negative seven is seven, and the absolute value of negative two is two. Seven plus two is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'A common mistake is to make each number positive before subtracting. That would give thirteen, which is wrong.', show: 'oops' },
      ],
    },
    {
      chapter: 'Ordering negative numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['|{-3.2}| = 3.2 \\qquad |{-3.8}| = 3.8', '{-3.8} < {-3.2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two negative numbers', md: 'The one with the **greater** absolute value is further left, so it is the **smaller** number.' },
      ],
      lines: [
        { say: 'On a number line, numbers get greater as we move to the right. Which is greater, negative three point two or negative three point eight?', show: 'm.0', focus: 'm.0' },
        { say: 'Negative three point eight has the greater absolute value, so it is further from zero. Both numbers are negative, so further from zero means further left.', show: 'tip' },
        { say: 'So negative three point eight is less than negative three point two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $|4 - 9| - |{-3}|$.',
          choices: ['$8$', '$-8$', '$2$', '$10$'],
          answer: 2,
          working: '$|4 - 9| = |{-5}| = 5$ and $|{-3}| = 3$, so $5 - 3 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the absolute value of four minus nine, minus the absolute value of negative three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Four minus nine is negative five, and its absolute value is five. The absolute value of negative three is three. Five minus three is two.', show: 'q.answer' },
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
          items: ['A number and its opposite add to zero.', '$|x|$ is the distance of $x$ from zero, so it is never negative.', 'Work out the inside of the bars first.', 'Of two negative numbers, the greater absolute value is the smaller number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number and its opposite are the same distance from zero, and they add to zero.', show: 'sum.0' },
        { say: 'The absolute value of a number is its distance from zero, so it is never negative.', show: 'sum.1' },
        { say: 'Work out the inside of the bars before taking the absolute value.', show: 'sum.2' },
        { say: 'And of two negative numbers, the one with the greater absolute value is the smaller number. In the next lesson, we meet perfect cubes and cube roots. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
