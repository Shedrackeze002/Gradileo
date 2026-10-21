import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorRings } from './lib/m9-2-figures.ts';

// (4²)³: three groups of 4², two factors of 4 in each, six in all.
const groups = figure(
  'rg',
  [
    factorRings({
      groups: [
        { id: 'g0', values: ['4', '4'], tone: 'adj', below: '4^2' },
        { id: 'g1', values: ['4', '4'], tone: 'opp', below: '4^2' },
        { id: 'g2', values: ['4', '4'], tone: 'good', below: '4^2' },
      ],
      groupGap: 0.6,
      over: '3 \\text{ groups of } 2 = 6 \\text{ factors of } 4',
    }),
  ],
  280,
);

const video: Explainer = {
  id: 'm9-2-2-d',
  lessonId: 'm9-2-2',
  title: 'Exponent Laws, Part 4: Powers of Powers, Products and Quotients',
  thumbnailTitle: 'Powers of Powers',
  thumbnail: 'rg',
  summary:
    '(4²)³ = 4² × 4² × 4² is 3 groups of 2 factors of 4, so (4²)³ = 4²ˣ³ = 4⁶: for a power of a power, multiply the exponents. An exponent outside brackets applies to every factor inside: (2 × 5)³ = 2³ × 5³ = 8 × 125 = 1000, the same as 10³, and (2/3)³ = 2³/3³ = 8/27. The table lists all six laws, including a⁰ = 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 4', title: 'Powers of Powers, Products and Quotients', subtitle: 'An exponent outside the brackets' }],
      lines: [
        { say: 'What happens when a whole power is raised to a power, or when brackets hold a product or a fraction?', show: 'title' },
        { say: 'In this part, you will find three more exponent laws, again by writing the powers out in full, and then see all the laws together.' },
      ],
    },
    {
      chapter: 'Power of a power',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $\\left(4^2\\right)^3$ as a single power.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(4^2\\right)^3 = 4^2 \\times 4^2 \\times 4^2', '\\left(4^2\\right)^3 = 4^{2 \\times 3} = 4^6'] },
        groups,
      ],
      lines: [
        { say: 'Write four squared, all cubed, as a single power.', show: 'q' },
        { say: 'Cubed means three factors of what is in the brackets. So it is four squared, times four squared, times four squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Each four squared is two factors of four.', show: ['rg.g0', 'rg.g0-b', 'rg.g1', 'rg.g1-b', 'rg.g2', 'rg.g2-b'] },
        { say: 'Three groups of two factors makes two times three, or six factors of four.', show: 'rg.over', focus: 'rg.over' },
        { say: 'So four squared, all cubed, is four to the power of six. For a power of a power, multiply the exponents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Power of a product',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $(2 \\times 5)^3$ two ways.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(2 \\times 5)^3 = 10^3 = 1000', '(2 \\times 5)^3 = (2 \\times 5) \\times (2 \\times 5) \\times (2 \\times 5)', '= 2^3 \\times 5^3 = 8 \\times 125 = 1000'] },
      ],
      lines: [
        { say: 'Now evaluate two times five, all cubed, in two ways. First, brackets first: two times five is ten, and ten cubed is one thousand.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Second, write it out. It is three factors of two times five.', show: 'm.1', focus: 'm.1' },
        { say: 'Gather the twos and the fives: three twos and three fives. That is two cubed times five cubed, or eight times one hundred twenty-five, which is one thousand.', show: 'm.2', focus: 'm.2' },
        { say: 'Both ways give one thousand. An exponent outside brackets applies to every factor of the product inside.' },
      ],
    },
    {
      chapter: 'Power of a quotient',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $\\left(\\dfrac{2}{3}\\right)^3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{2}{3} \\times \\dfrac{2}{3} \\times \\dfrac{2}{3}', '= \\dfrac{2^3}{3^3} = \\dfrac{8}{27}'] },
      ],
      lines: [
        { say: 'A fraction works the same way. Evaluate two thirds, all cubed.', show: 'q' },
        { say: 'It is two thirds times two thirds times two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the tops and the bottoms. On top, two cubed is eight. On the bottom, three cubed is twenty-seven. So the answer is eight over twenty-seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So raise the top and the bottom to the exponent.' },
      ],
    },
    {
      chapter: 'All the laws',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Law', 'Rule', 'Example'],
          rows: [
            ['Product', '$a^m \\times a^n = a^{m + n}$', '$2^3 \\times 2^4 = 2^7$'],
            ['Quotient', '$a^m \\div a^n = a^{m - n}$', '$5^6 \\div 5^2 = 5^4$'],
            ['Power of a power', '$\\left(a^m\\right)^n = a^{m \\times n}$', '$\\left(4^2\\right)^3 = 4^6$'],
            ['Power of a product', '$(ab)^n = a^n b^n$', '$(2 \\times 5)^3 = 2^3 \\times 5^3$'],
            ['Power of a quotient', '$\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$', '$\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}$'],
            ['Zero exponent', '$a^0 = 1$', '$8^0 = 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all the exponent laws together. To multiply powers with the same base, add the exponents. To divide them, subtract the exponents.', show: ['t.0', 't.1'] },
        { say: 'For a power of a power, multiply the exponents.', show: 't.2', focus: 't.2' },
        { say: 'For a product or a quotient in brackets, raise every factor, or the top and the bottom, to the exponent.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'And any base that is not zero, to the power of zero, is one. Each law comes from writing the powers out, so if you forget one, you can always work it out again.', show: 't.5', focus: 't' },
      ],
    },
    {
      chapter: 'Add or multiply?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Add or multiply the exponents?', md: '$\\left(4^2\\right)^3$ is **not** $4^5$. It is $3$ groups of $2$ factors, so **multiply**: $4^{2 \\times 3} = 4^6$. Add the exponents only when you multiply two powers, like $4^2 \\times 4^3 = 4^5$.' },
      ],
      lines: [
        { say: 'Here is a common mistake: adding the exponents in a power of a power. Four squared, all cubed, is not four to the power of five.', show: 'oops' },
        { say: 'It is three groups of two factors, which is six factors. So multiply the exponents.' },
        { say: 'Add the exponents only when you multiply two powers with the same base, like four squared times four cubed, which is four to the power of five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\left(5^3\\right)^4$ as a single power.',
          choices: ['$5^7$', '$20^3$', '$5^{81}$', '$5^{12}$'],
          answer: 3,
          working: 'A power of a power: multiply the exponents. $\\left(5^3\\right)^4 = 5^{3 \\times 4} = 5^{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write five cubed, all to the power of four, as a single power. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, five to the power of twelve. It is four groups of three factors of five, so multiply the exponents: three times four is twelve. Choice A, five to the power of seven, adds the exponents. For a power of a power, multiply them.', show: 'q.answer' },
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
            'Power of a power: multiply the exponents. $\\left(4^2\\right)^3 = 4^6$',
            'An exponent outside brackets applies to every factor inside: $(2 \\times 5)^3 = 2^3 \\times 5^3$.',
            'Power of a quotient: $\\left(\\tfrac{2}{3}\\right)^3 = \\tfrac{2^3}{3^3} = \\tfrac{8}{27}$.',
            'Every law comes from writing the powers out in full.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a power of a power, multiply the exponents.', show: 'sum.0' },
        { say: 'An exponent outside brackets applies to every factor inside them.', show: 'sum.1' },
        { say: 'For a fraction, raise the top and the bottom to the exponent.', show: 'sum.2' },
        { say: 'And every law comes from writing the powers out in full. In the next part, you will use several laws in one question. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
