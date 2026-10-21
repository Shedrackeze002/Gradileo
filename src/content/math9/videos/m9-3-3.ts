import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// 4 × (−1.5): four jumps of −1.5 from 0, to −6.
const jumps = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -7,
        max: 1,
        step: 0.5,
        moves: [0, 1, 2, 3].map((k) => ({ id: `j${k}`, from: -1.5 * k, to: -1.5 * (k + 1), tone: 'opp' as const, label: '-1.5' })),
        points: [{ id: 'end', value: -6, tex: '-6', tone: 'good', below: true }],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm9-3-3',
  lessonId: 'm9-3-3',
  title: 'Multiplying and Dividing Rational Numbers, Part 1: Signs First',
  thumbnailTitle: 'Signs First',
  thumbnail: 'jp',
  summary:
    'Multiplying and dividing rational numbers uses the same sign rules as integers: same signs give a positive answer, and different signs give a negative one. Four jumps of −1.5 on a number line end at −6, so 4 × (−1.5) = −6. Find the sign first, then work with the sizes: −7.2 ÷ 0.9 = −8, because 72 ÷ 9 = 8, and −0.6 × (−0.5) = 0.3. The rule is for multiplying and dividing only: −0.6 + (−0.5) is −1.1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 1', title: 'Signs First', subtitle: 'Multiplying and dividing decimals' }],
      lines: [
        { say: 'If the temperature drops one point five degrees every hour, how much does it change in four hours? Questions like this need multiplication of rational numbers.', show: 'title' },
        { say: 'In this part, you will use the sign rules to multiply and divide positive and negative decimals.' },
      ],
    },
    {
      chapter: 'Equal jumps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $4 \\times (-1.5)$.' },
        jumps('jp'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times (-1.5) = -1.5 \\times 4 = -6'] },
      ],
      lines: [
        { say: 'Multiplying is a quick way to add equal groups. Four times negative one point five means four groups of negative one point five.', show: 'q' },
        { say: 'On a number line, start at zero and make four jumps of negative one point five. Each jump goes to the left.', show: ['jp.axis', 'jp.j0'], focus: 'jp.j0' },
        { say: 'The jumps land on negative one point five, negative three, negative four point five, and negative six.', show: ['jp.j1', 'jp.j2', 'jp.j3', 'jp.end'], focus: ['jp.j1', 'jp.j2', 'jp.j3', 'jp.end'] },
        { say: 'So four times negative one point five is negative six. The order does not matter: negative one point five times four is also negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'A temperature that drops one point five degrees every hour, for four hours, changes by negative six degrees.' },
      ],
    },
    {
      chapter: 'The sign rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Sign rules for multiplying and dividing', md: '**Same signs:** the answer is **positive**. **Different signs:** the answer is **negative**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(+) \\times (+) = (+) \\qquad (-) \\times (-) = (+)', '(+) \\times (-) = (-) \\qquad (-) \\times (+) = (-)', '\\text{The same for } \\div'] },
      ],
      lines: [
        { say: 'Multiplying and dividing rational numbers uses the same sign rules as integers.', show: 'key' },
        { say: 'When the two numbers have the same sign, the answer is positive. A positive times a positive is positive, and a negative times a negative is also positive.', show: 'm.0', focus: 'm.0' },
        { say: 'When the signs are different, the answer is negative, like four times negative one point five.', show: 'm.1', focus: 'm.1' },
        { say: 'Division follows exactly the same rules. So for any product or quotient, find the sign first. Then work with the sizes, without the signs.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing decimals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-7.2 \\div 0.9$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Sign: different signs} \\;\\to\\; \\text{negative}', '\\text{Size: } 7.2 \\div 0.9 = 72 \\div 9 = 8', '-7.2 \\div 0.9 = -8'] },
      ],
      lines: [
        { say: 'Find negative seven point two divided by zero point nine.', show: 'q' },
        { say: 'Sign first. One number is negative and one is positive. The signs are different, so the answer is negative.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the size: seven point two divided by zero point nine. Multiply both numbers by ten to clear the decimals. That gives seventy-two divided by nine, which is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Put the sign and the size together: negative seven point two divided by zero point nine is negative eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by multiplying: zero point nine times negative eight is negative seven point two. It works.' },
      ],
    },
    {
      chapter: 'Two negatives',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-0.6 \\times (-0.5)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Sign: same signs} \\;\\to\\; \\text{positive}', '\\text{Size: } 6 \\times 5 = 30 \\;\\to\\; 0.6 \\times 0.5 = 0.30', '-0.6 \\times (-0.5) = 0.3'] },
      ],
      lines: [
        { say: 'Now find negative zero point six times negative zero point five.', show: 'q' },
        { say: 'Sign first. Both numbers are negative, so the signs are the same, and the answer is positive.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the size. Six times five is thirty. Zero point six has one decimal place, and zero point five has one more. That makes two decimal places in all, so the product is zero point three zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So negative zero point six times negative zero point five is positive zero point three. That makes sense: half of zero point six is zero point three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two negatives make a positive only when you multiply or divide', md: 'The rule “same signs give a positive” is for **multiplying and dividing**. When you **add** two negatives, the sum is negative.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-0.6 \\times (-0.5) = 0.3 \\qquad \\text{positive}', '-0.6 + (-0.5) = -1.1 \\qquad \\text{negative}'] },
      ],
      lines: [
        { say: 'Watch out for this mixup. Two negatives multiply to a positive.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But two negatives add to a negative. Negative zero point six plus negative zero point five is negative one point one. Adding moves you farther left on the number line.', show: 'm.1', focus: 'm.1' },
        { say: 'So before you use a sign rule, look at the operation. Is it a product or a quotient, or is it a sum?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-2.4 \\div (-0.6)$.',
          choices: ['$4$', '$-4$', '$0.4$', '$-0.4$'],
          answer: 0,
          working: 'Same signs, so the answer is positive. Size: $2.4 \\div 0.6 = 24 \\div 6 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative two point four divided by negative zero point six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four. The signs are the same, so the answer is positive. For the size, twenty-four divided by six is four. Choice B has the right size, but two negatives give a positive quotient.', show: 'q.answer' },
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
            'Same signs: the product or quotient is positive.',
            'Different signs: the product or quotient is negative.',
            'Find the sign first, then work with the sizes: $-7.2 \\div 0.9 = -8$.',
            'The sign rules are for multiplying and dividing, not adding.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the signs are the same, the product or quotient is positive.', show: 'sum.0' },
        { say: 'When the signs are different, the product or quotient is negative.', show: 'sum.1' },
        { say: 'Find the sign first, then work with the sizes.', show: 'sum.2' },
        { say: 'And remember that these rules are for multiplying and dividing, not adding. In the next part, you will multiply fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
