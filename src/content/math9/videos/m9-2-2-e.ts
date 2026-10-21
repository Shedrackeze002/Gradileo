import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ringFraction } from './lib/m9-2-figures.ts';

// (2³ × 2⁴) ÷ 2⁵: seven twos over five twos; five pairs divide out, leaving two twos.
const twos = figure('fr', [ringFraction({ tex: '2', top: 7, bottom: 5, cancel: 5, left: '2^2 = 4' })], 340);

const video: Explainer = {
  id: 'm9-2-2-e',
  lessonId: 'm9-2-2',
  title: 'Exponent Laws, Part 5: Simplify, Then Evaluate',
  thumbnailTitle: 'Simplify, Then Evaluate',
  thumbnail: 'fr',
  summary:
    'With several laws in one question, simplify to a single power first, so the number left to evaluate is small: (2³ × 2⁴) ÷ 2⁵ = 2⁷ ÷ 2⁵ = 2² = 4, and (5⁴ × 5³) ÷ (5²)³ = 5⁷ ÷ 5⁶ = 5. The laws are for multiplying and dividing: 2³ + 2⁴ is not 2⁷, because there is no law for adding powers; evaluate each one, 8 + 16 = 24.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 5', title: 'Simplify, Then Evaluate', subtitle: 'Small numbers, fewer mistakes' }],
      lines: [
        { say: 'You now know several exponent laws. Real questions often need more than one of them at once.', show: 'title' },
        { say: 'In this part, you will simplify to a single power first, and only then evaluate. You will also see where the laws do not apply.' },
      ],
    },
    {
      chapter: 'One law at a time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $\\left(2^3 \\times 2^4\\right) \\div 2^5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(2^3 \\times 2^4\\right) \\div 2^5 = 2^7 \\div 2^5', '= 2^{7 - 5} = 2^2', '= 4'] },
      ],
      lines: [
        { say: 'Evaluate two cubed times two to the power of four, all divided by two to the power of five.', show: 'q' },
        { say: 'Start with the brackets. Use the product law: two cubed times two to the power of four is two to the power of seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the quotient law: two to the power of seven, divided by two to the power of five, is two squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Now there is only a small number to evaluate. Two squared is four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'See the factors',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\left(2^3 \\times 2^4\\right) \\div 2^5$' }, twos],
      lines: [
        { say: 'Here is the same question with every factor in a ring. On top, two cubed times two to the power of four is three twos and four more: seven factors of two.', show: ['q', 'fr.top', 'fr.bar'] },
        { say: 'On the bottom, two to the power of five is five factors of two.', show: 'fr.bottom' },
        { say: 'Five twos on the bottom divide out with five twos on top.', show: 'fr.cancel', focus: 'fr.cancel' },
        { say: 'That leaves two factors of two on top: two squared, which is four. The laws do exactly this, without the drawing.', show: 'fr.left', focus: 'fr.left' },
      ],
    },
    {
      chapter: 'Why simplify first?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Simplify, then evaluate', md: 'Simplify to a single power first. Then the number you have to evaluate is small.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(8 \\times 16) \\div 32 = 128 \\div 32 = 4'] },
      ],
      lines: [
        { say: 'You could evaluate every power first: eight times sixteen is one hundred twenty-eight, and one hundred twenty-eight divided by thirty-two is four.', show: 'm', focus: 'm' },
        { say: 'You get the same answer, but with bigger numbers, and more chances to slip. With larger exponents, the numbers get huge very quickly.' },
        { say: 'So simplify to a single power first. Then the number you have to evaluate is small.', show: 'tip' },
      ],
    },
    {
      chapter: 'Three laws at once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $\\left(5^4 \\times 5^3\\right) \\div \\left(5^2\\right)^3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5^4 \\times 5^3 = 5^7', '\\left(5^2\\right)^3 = 5^6', '5^7 \\div 5^6 = 5^1 = 5'] },
      ],
      lines: [
        { say: 'Here is one that uses three laws. Evaluate five to the power of four times five cubed, all divided by five squared, all cubed.', show: 'q' },
        { say: 'Product law on top: five to the power of four times five cubed is five to the power of seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Power of a power on the bottom: five squared, all cubed, is five to the power of six.', show: 'm.1', focus: 'm.1' },
        { say: 'Quotient law: five to the power of seven, divided by five to the power of six, is five to the power of one, which is just five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'No law for adding',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The laws are for multiplying and dividing', md: '$2^3 + 2^4$ is **not** $2^7$. There is no law for adding powers. Evaluate each one: $2^3 + 2^4 = 8 + 16 = 24$, while $2^7 = 128$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^3 + 2^4 = 8 + 16 = 24', '\\bad{2^7 = 128}'] },
      ],
      lines: [
        { say: 'Here is an important mistake to avoid. Two cubed plus two to the power of four is not two to the power of seven.', show: 'oops' },
        { say: 'The exponent laws are for multiplying and dividing powers. There is no law for adding them.' },
        { say: 'Evaluate each power instead. Two cubed is eight, and two to the power of four is sixteen. Eight plus sixteen is twenty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'Two to the power of seven is one hundred twenty-eight, which is a very different number.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\left(3^6 \\times 3^2\\right) \\div 3^5$.',
          choices: ['$27$', '$2187$', '$81$', '$9$'],
          answer: 0,
          working: 'Product law: $3^6 \\times 3^2 = 3^8$. Quotient law: $3^8 \\div 3^5 = 3^3$. Then $3^3 = 27$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three to the power of six times three squared, all divided by three to the power of five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twenty-seven. Six plus two is eight, and eight take away five is three, so it is three cubed. Choice B, two thousand one hundred eighty-seven, is three to the power of seven: it multiplies the exponents six and two. When you multiply powers, add the exponents.', show: 'q.answer' },
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
            'Simplify to a single power first, then evaluate: $\\left(2^3 \\times 2^4\\right) \\div 2^5 = 2^2 = 4$.',
            'Use one law at a time, brackets first.',
            'The laws are for multiplying and dividing: $2^3 + 2^4 = 24$, not $2^7$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With several laws in one question, simplify to a single power first, then evaluate.', show: 'sum.0' },
        { say: 'Use one law at a time, starting with the brackets.', show: 'sum.1' },
        { say: 'And remember that the laws are for multiplying and dividing powers, not adding them. In the next lesson, you will use the order of operations with powers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
