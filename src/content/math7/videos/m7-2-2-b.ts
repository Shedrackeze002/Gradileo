import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rect } from '@/content/math5/videos/lib/m5-10-figures.ts';

// A deck 4.25 m long and 3.6 m wide, drawn to scale.
const deck = figure('dk', [rect({ w: 4.25, h: 3.6, labels: { bottom: '4.25\\text{ m}', right: '3.6\\text{ m}' } })], 400);

const video: Explainer = {
  id: 'm7-2-2-b',
  lessonId: 'm7-2-2',
  title: 'Multiplying and Dividing Decimals, Part 2: Multiplying with a Calculator',
  thumbnailTitle: 'Multiplying with a Calculator',
  thumbnail: 'dk',
  summary:
    'For multipliers with two or more digits, use a calculator, but estimate first to catch a slip on the keys. A deck 4.25 m by 3.6 m has an area of 15.3 m², close to the estimate 4 × 4 = 16. At $1.419 per litre, 34.6 L of fuel costs 49.0974, which rounds to $49.10 to the nearest cent. An answer of 1.53 or 153 for 4.25 × 3.6 has the right digits but the decimal point in the wrong place.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 2', title: 'Multiplying with a Calculator', subtitle: 'Estimate first, then check' }],
      lines: [
        { say: 'For bigger multiplications, a calculator saves a lot of time. But a calculator only knows the keys you press. Miss one decimal point, and the answer can be wildly wrong.', show: 'title' },
        { say: 'In this part, you will use a calculator to multiply decimals, and use an estimate to catch mistakes.' },
      ],
    },
    {
      chapter: 'When to use a calculator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Use a calculator, but estimate first', md: 'For a multiplier with **two or more digits**, use a calculator. Estimate first, so you can catch a slip on the keys.' },
      ],
      lines: [
        { say: 'Multiplying by one digit is quick by hand. When both numbers have two or more digits, like four point two five times three point six, a calculator is a good tool.', show: 'key' },
        { say: 'But always estimate first. The estimate tells you about how big the answer should be. If the calculator shows something very different, you know a key was pressed wrongly.' },
      ],
    },
    {
      chapter: 'Area of a deck',
      layout: 'split',
      leftWidth: 560,
      left: [deck],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A deck is $4.25$ m long and $3.6$ m wide. What is its area?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area} = \\text{length} \\times \\text{width}', '\\text{Estimate: } 4 \\times 4 = 16'] },
        { kind: 'calc', id: 'c', keys: '4.25 × 3.6', result: '15.3' },
        { kind: 'text', id: 'a', size: 'md', md: 'The area is $15.3\\ \\text{m}^2$, close to the estimate of $16\\ \\text{m}^2$.' },
      ],
      lines: [
        { say: 'A deck is four point two five metres long and three point six metres wide. What is its area?', show: ['q', 'dk.shape', 'dk.bottom', 'dk.right'] },
        { say: 'The area of a rectangle is its length times its width. So we need four point two five times three point six.', show: 'm.0', focus: 'm.0' },
        { say: 'Estimate first. Four point two five rounds to four, and three point six rounds to four. Four times four is sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Now use the calculator. Four point two five times three point six is fifteen point three.', show: 'c' },
        { say: 'The area is fifteen point three square metres. That is close to the estimate of sixteen, so it makes sense.', show: 'a' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A decimal point in the wrong place', md: 'If you get $1.53$ or $153$ for $4.25 \\times 3.6$, the estimate of $16$ shows the decimal point is in the wrong place. The digits are right, but the size is not.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.53 \\ \\bad{\\times} \\qquad 15.3 \\ \\good{\\checkmark} \\qquad 153 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Suppose you typed four two five, and forgot the decimal point, or put it in the wrong place.', show: 'oops' },
        { say: 'You might get one point five three, or one hundred fifty-three. The digits one, five, three are right, but the size is not.', show: 'm', focus: 'm' },
        { say: 'The estimate of sixteen tells you at once which one is right. One point five three is far too small, and one hundred fifty-three is far too big.' },
      ],
    },
    {
      chapter: 'Fuel by the litre',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Fuel costs \\$1.419 per litre. How much do $34.6$ L cost, to the nearest cent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 35 \\times 1.5 = 52.5', '34.6 \\times 1.419 = 49.09\\opp{7}4', '49.0974 \\approx 49.10'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The fuel costs **\\$49.10**.' },
      ],
      lines: [
        { say: 'Fuel for a car costs one point four one nine dollars per litre. Fuel prices often have three decimal places. How much do thirty-four point six litres cost, to the nearest cent?', show: 'q' },
        { say: 'Estimate first. Thirty-four point six is about thirty-five, and one point four one nine is about one and a half. Thirty-five times one and a half is fifty-two point five.', show: 'm.0', focus: 'm.0' },
        { say: 'On the calculator, thirty-four point six times one point four one nine is forty-nine point zero nine seven four.', show: 'm.1', focus: 'm.1' },
        { say: 'Money is rounded to the nearest cent, which is two decimal places. Look at the third decimal place: it is seven, so round up. Nine hundredths becomes ten hundredths, which is one more tenth.', focus: 'm.1' },
        { say: 'So the cost is forty-nine dollars and ten cents. That is near the estimate. The estimate is a little high, because we rounded both numbers up.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rug is $2.4$ m long and $1.85$ m wide. Which area is reasonable?',
          choices: ['$0.444\\ \\text{m}^2$', '$4.44\\ \\text{m}^2$', '$44.4\\ \\text{m}^2$', '$444\\ \\text{m}^2$'],
          answer: 1,
          working: 'Estimate: $2 \\times 2 = 4$. The calculator gives $2.4 \\times 1.85 = 4.44$, which is close to $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rug is two point four metres long and one point eight five metres wide. Which area is reasonable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four point four four square metres. The estimate is two times two, which is four. Choice C, forty-four point four, is ten times too big.', show: 'q.answer' },
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
            'Use a calculator for multipliers with two or more digits.',
            'Estimate first: it shows where the decimal point belongs.',
            'Round money to the nearest cent: two decimal places.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a calculator for multipliers with two or more digits.', show: 'sum.0' },
        { say: 'Always estimate first. The estimate shows where the decimal point belongs, and catches slips on the keys.', show: 'sum.1' },
        { say: 'And round money to the nearest cent, which is two decimal places. In the next part, you will divide decimals by hand. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
