import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ringFraction } from './lib/m9-2-figures.ts';

// 5⁶ ÷ 5²: six fives over two fives; two pairs divide out, leaving four fives.
const fives = figure('fr', [ringFraction({ tex: '5', top: 6, bottom: 2, cancel: 2, left: '4 \\text{ factors of } 5 \\text{ left}' })], 340);

const video: Explainer = {
  id: 'm9-2-2-b',
  lessonId: 'm9-2-2',
  title: 'Exponent Laws, Part 2: The Quotient Law',
  thumbnailTitle: 'The Quotient Law',
  thumbnail: 'fr',
  summary:
    'When you divide powers with the same base, common factors divide out: 5⁶ ÷ 5² is six factors of 5 over two, and two pairs divide out, leaving 6 − 2 = 4 factors, so 5⁶ ÷ 5² = 5⁴. The quotient law: aᵐ ÷ aⁿ = aᵐ⁻ⁿ, keep the base and subtract the exponents: 10⁷ ÷ 10³ = 10⁴ = 10 000. Do not divide the exponents: 5⁶ ÷ 5² is not 5³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 2', title: 'The Quotient Law', subtitle: 'Same base: subtract the exponents' }],
      lines: [
        { say: 'In the last part, you multiplied powers with the same base by adding the exponents.', show: 'title' },
        { say: 'In this part, you will divide powers with the same base, and see why the shortcut is to subtract the exponents.' },
      ],
    },
    {
      chapter: 'Factors divide out',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $5^6 \\div 5^2$ as a single power.' },
        fives,
        { kind: 'math', id: 'm', size: 'lg', lines: ['5^6 \\div 5^2 = 5^{6 - 2} = 5^4'] },
      ],
      lines: [
        { say: 'Write five to the power of six, divided by five squared, as a single power.', show: 'q' },
        { say: 'Write the division as a fraction. On top, five to the power of six is six factors of five. On the bottom, five squared is two factors of five.', show: ['fr.top', 'fr.bar', 'fr.bottom'] },
        { say: 'A five on top divided by a five on the bottom is one. So each five on the bottom divides out with one five on top.', show: 'fr.cancel', focus: 'fr.cancel' },
        { say: 'Two factors of five divide out, and six take away two leaves four factors of five on top.', show: 'fr.left', focus: 'fr.left' },
        { say: 'So five to the power of six, divided by five squared, is five to the power of four.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The quotient law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'Quotient law', md: '$a^m \\div a^n = a^{m - n}$: keep the base and **subtract** the exponents.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10^7 \\div 10^3 = 10^{7 - 3} = 10^4 = 10\\,000', '\\text{Check: } 10\\,000\\,000 \\div 1000 = 10\\,000 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'This works for any base. When you divide powers with the same base, keep the base and subtract the exponents.', show: 'law' },
        { say: 'With letters, "a" to the m, divided by "a" to the n, is "a" to the m minus n. The exponent on top comes first.' },
        { say: 'Try it with tens. Ten to the power of seven, divided by ten cubed, is ten to the power of four, which is ten thousand.', show: 'm.0', focus: 'm.0' },
        { say: 'Check. Ten million divided by one thousand is ten thousand. The shortcut works.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $\\dfrac{3^7}{3^5}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3^7}{3^5} = 3^{7 - 5} = 3^2', '3^2 = 9'] },
      ],
      lines: [
        { say: 'One more. Evaluate three to the power of seven, over three to the power of five.', show: 'q' },
        { say: 'A fraction bar means divide. The bases are the same, so subtract the exponents. Seven take away five is two, so it is three squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Three squared is nine. That was much quicker than working out three to the power of seven, which is two thousand one hundred eighty-seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Do not divide the exponents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not divide the exponents', md: '$5^6 \\div 5^2$ is **not** $5^3$. Two factors divide out, so **subtract**: $6 - 2 = 4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{5^6 \\div 5^2 \\ne 5^{6 \\div 2}}', '\\good{5^6 \\div 5^2 = 5^{6 - 2} = 5^4}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Dividing the powers does not mean dividing the exponents. Five to the power of six, divided by five squared, is not five cubed.', show: 'oops' },
        { say: 'Six divided by two is three, but that is not what happens to the factors.', show: 'm.0', focus: 'm.0' },
        { say: 'Remember the picture: two factors of five divide out of six, leaving four. So subtract the exponents. The answer is five to the power of four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $7^9 \\div 7^3$ as a single power.',
          choices: ['$7^3$', '$1^6$', '$7^6$', '$7^{12}$'],
          answer: 2,
          working: 'Same base, so keep the base and subtract the exponents: $7^9 \\div 7^3 = 7^{9 - 3} = 7^6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write seven to the power of nine, divided by seven cubed, as a single power. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven to the power of six. Keep the base and subtract the exponents: nine take away three is six. Choice A, seven cubed, divides the exponents, nine divided by three. For a quotient, subtract them.', show: 'q.answer' },
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
            'Dividing powers with the same base, common factors divide out.',
            'Quotient law: $a^m \\div a^n = a^{m - n}$. Keep the base, subtract the exponents.',
            '$5^6 \\div 5^2 = 5^4$, not $5^3$: do not divide the exponents.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When you divide powers with the same base, the common factors divide out.', show: 'sum.0' },
        { say: 'The quotient law: keep the base and subtract the exponents.', show: 'sum.1' },
        { say: 'Do not divide the exponents. In the next part, you will find out what an exponent of zero means. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
