import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-3-3-d',
  lessonId: 'm9-3-3',
  title: 'Multiplying and Dividing Rational Numbers, Part 4: Mixed Numbers and a Calculator',
  thumbnailTitle: 'Mixed Numbers and a Calculator',
  thumbnail: false,
  summary:
    'Write mixed numbers as improper fractions before you multiply or divide: −1 1/2 × 2 2/3 = −3/2 × 8/3 = −24/6 = −4. Multiplying the whole numbers and the fractions separately gives 2 1/3, which is wrong: one and a half groups of 2 2/3 is 2 2/3 + 1 1/3 = 4. For decimals that are hard to work with by hand, decide the sign first, then use a calculator: −3.75 ÷ 1.6 ≈ −2.34.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 4', title: 'Mixed Numbers and a Calculator', subtitle: 'Improper fractions, and the sign first' }],
      lines: [
        { say: 'Mixed numbers and messy decimals turn up in real problems all the time. They need a little extra care when you multiply and divide.', show: 'title' },
        { say: 'In this part, you will multiply mixed numbers, and use a calculator to divide decimals, deciding the sign first.' },
      ],
    },
    {
      chapter: 'Improper fractions first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-1\\tfrac{1}{2} \\times 2\\tfrac{2}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= -\\dfrac{3}{2} \\times \\dfrac{8}{3}', '\\text{Sign: different signs} \\;\\to\\; \\text{negative}', '\\dfrac{3 \\times 8}{2 \\times 3} = \\dfrac{24}{6} = 4', '-1\\tfrac{1}{2} \\times 2\\tfrac{2}{3} = -4'] },
      ],
      lines: [
        { say: 'Find negative one and one half times two and two thirds.', show: 'q' },
        { say: 'First, write the mixed numbers as improper fractions. One and one half is three halves, so negative one and one half is negative three halves. Two and two thirds is eight thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Sign: one negative and one positive. The signs are different, so the product is negative.', show: 'm.1', focus: 'm.1' },
        { say: 'Sizes: three times eight is twenty-four, and two times three is six. Twenty-four sixths is four.', show: 'm.2', focus: 'm.2' },
        { say: 'So negative one and one half times two and two thirds is negative four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not multiply the parts separately', md: 'Multiplying the whole numbers and the fractions separately gives the **wrong** answer. Write improper fractions first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{1 \\times 2 = 2, \\quad \\tfrac{1}{2} \\times \\tfrac{2}{3} = \\tfrac{1}{3} \\;\\to\\; 2\\tfrac{1}{3}}', '\\text{one group: } 2\\tfrac{2}{3} \\qquad \\text{half a group: } 1\\tfrac{1}{3}', '\\good{2\\tfrac{2}{3} + 1\\tfrac{1}{3} = 4}'] },
      ],
      lines: [
        { say: 'Watch out for a tempting shortcut. Some people multiply the whole numbers, one times two is two, then the fractions, one half times two thirds is one third, and get two and one third.', show: 'm.0', focus: 'm.0' },
        { say: 'That is wrong. Think of one and a half groups of two and two thirds. One whole group is two and two thirds. Half a group is half of that: one and one third.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, two and two thirds plus one and one third is four, not two and one third. The shortcut leaves out part of the product. So always write improper fractions first.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using a calculator',
      layout: 'split',
      leftWidth: 540,
      left: [{ kind: 'calc', id: 'calc', keys: '3.75 ÷ 1.6', result: '2.34375' }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-3.75 \\div 1.6$, to the nearest hundredth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Sign: different} \\;\\to\\; \\text{negative}', '3.75 \\div 1.6 = 2.34375', '-3.75 \\div 1.6 \\approx -2.34'] },
      ],
      lines: [
        { say: 'For decimals that are hard to work with by hand, use a calculator. Find negative three point seven five divided by one point six, to the nearest hundredth.', show: 'q' },
        { say: 'Decide the sign first, so you can check the display. The signs are different, so the answer is negative.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide the sizes on the calculator: three point seven five divided by one point six. The display shows two point three four three seven five.', show: ['calc', 'm.1'], focus: 'm.1' },
        { say: 'To round to the nearest hundredth, look at the digit after the hundredths place. It is a three, so round down: two point three four.', },
        { say: 'Put the sign back: negative three point seven five divided by one point six is about negative two point three four.', show: 'm.2', focus: 'm.2' },
        { say: 'If you type the negative sign into the calculator as well, the display should be negative. If it is not, a key was missed, and knowing the sign first lets you catch it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-2\\tfrac{1}{4} \\times 1\\tfrac{1}{3}$.',
          choices: ['$-3$', '$3$', '$-2\\tfrac{1}{12}$', '$-\\dfrac{27}{16}$'],
          answer: 0,
          working: '$-\\dfrac{9}{4} \\times \\dfrac{4}{3} = -\\dfrac{36}{12} = -3$. Different signs, so the product is negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative two and one quarter times one and one third. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative three. As improper fractions, that is negative nine quarters times four thirds, which is negative thirty-six twelfths, or negative three. Choice C multiplies the whole numbers and the fractions separately.', show: 'q.answer' },
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
            'Write mixed numbers as improper fractions before you multiply or divide.',
            'Never multiply the whole numbers and the fractions separately.',
            'With a calculator, decide the sign first, then check the display.',
            'Round at the end: $-3.75 \\div 1.6 \\approx -2.34$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write mixed numbers as improper fractions before you multiply or divide.', show: 'sum.0' },
        { say: 'Never multiply the whole numbers and the fractions separately.', show: 'sum.1' },
        { say: 'With a calculator, decide the sign first, so you can check the display.', show: 'sum.2' },
        { say: 'And round at the end. In the next part, you will use multiplication and division to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
