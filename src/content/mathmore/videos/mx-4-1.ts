import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-4-1',
  lessonId: 'mx-4-1',
  title: 'Complex Numbers, Part 1: The Imaginary Unit',
  thumbnailTitle: 'The Imaginary Unit',
  thumbnail: false,
  summary: 'The imaginary unit i has i² = −1, and a complex number is a + bi with real part a and imaginary part b. Complex numbers are added and subtracted part by part, and multiplied by expanding and replacing i² with −1: (2 + 3i)(4 − i) = 11 + 10i. The powers of i repeat every four.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Complex Numbers and Polynomials · Part 1', title: 'The Imaginary Unit', subtitle: 'A number whose square is negative' }],
      lines: [
        { say: 'No real number squares to give negative one. Every real number squared is zero or positive. So the equation x squared equals negative one has no real solution.', show: 'title' },
        { say: 'Mathematicians gave it one anyway, by inventing a new number. The numbers built from it turned out to be useful everywhere, from electrical engineering to the study of waves. In this video, you will meet this number, and learn to add, subtract and multiply with it.' },
      ],
    },
    {
      chapter: 'The imaginary unit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The imaginary unit and complex numbers', md: 'The **imaginary unit** $i$ is a number with $i^2 = -1$. A **complex number** is $\\opp{a} + \\adj{b}i$, where $a$ and $b$ are real: $\\opp{a}$ is its **real part** and $\\adj{b}$ its **imaginary part**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{-9} = \\sqrt{9}\\,\\sqrt{-1} = 3i'] },
      ],
      lines: [
        { say: 'The imaginary unit, written i, is a number whose square is negative one.', show: 'def' },
        { say: 'A complex number is a number of the form "a" plus b i, where "a" and b are real numbers. "a" is its real part, and b is its imaginary part.' },
        { say: 'Every real number is a complex number with an imaginary part of zero. And numbers like three i, with a real part of zero, are called imaginary.' },
        { say: 'Now we can write square roots of negative numbers. The square root of negative nine is the square root of nine times the square root of negative one, which is three i.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Adding and subtracting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(3 + 5i) + (2 - 7i) = (3 + 2) + (5 - 7)i = 5 - 2i', '(3 + 5i) - (2 - 7i) = (3 - 2) + (5 - ({-7}))i = 1 + 12i'] },
      ],
      lines: [
        { say: 'Complex numbers follow the usual rules of algebra, with i treated like a variable. The only new rule is that i squared is negative one.' },
        { say: 'To add, add the real parts and the imaginary parts separately. Three plus five i, plus two minus seven i: three plus two is five, and five minus seven is negative two. The sum is five minus two i.', show: 'm.0', focus: 'm.0' },
        { say: 'To subtract, subtract both parts. Three minus two is one, and five minus negative seven is twelve. The difference is one plus twelve i.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(2 + 3i)(4 - i)', '= 8 - 2i + 12i - 3\\opp{i^2}', '= 8 - 2i + 12i + 3', '= 11 + 10i'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting that i² = −1', md: '$(2i)(3i) = 6i^2 = -6$. Always replace $i^2$ with $-1$.' },
      ],
      lines: [
        { say: 'To multiply, expand the brackets just as in algebra. Let’s multiply two plus three i by four minus i.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times four is eight. Two times negative i is negative two i. Three i times four is twelve i. And three i times negative i is negative three i squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Now use the new rule: i squared is negative one, so negative three i squared is positive three.', show: 'm.2', focus: 'm.2' },
        { say: 'Collect the parts. Eight plus three is eleven, and negative two i plus twelve i is ten i. The product is eleven plus ten i.', show: 'm.3', focus: 'm.3' },
        { say: 'Always replace i squared with negative one. Two i times three i is six i squared, which is negative six.', show: 'oops' },
      ],
    },
    {
      chapter: 'Powers of i',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$i^1$', '$i^2$', '$i^3$', '$i^4$', '$i^5$', '$i^6$', '$i^7$', '$i^8$'], rows: [['$i$', '$-1$', '$-i$', '$1$', '$i$', '$-1$', '$-i$', '$1$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['i^{23} = i^{20} \\times i^{3} = 1 \\times ({-i}) = -i'] },
      ],
      lines: [
        { say: 'The powers of i follow a pattern. i to the power of one is i. i squared is negative one. i cubed is i squared times i, which is negative i. And i to the power of four is negative one times negative one, which is one.', show: 't' },
        { say: 'After that, the pattern starts again: i to the power of five is i, and so on. The powers of i repeat every four.', focus: 't' },
        { say: 'So to find i to the power of 23, divide 23 by four. That is five, with a remainder of three. i to the power of twenty is one, so i to the power of 23 is the same as i cubed, which is negative i.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Multiply $(1 + 2i)(3 + i)$.',
          choices: ['$5 + 7i$', '$1 + 7i$', '$3 + 2i$', '$5 + 5i$'],
          answer: 1,
          working: '$3 + i + 6i + 2i^2 = 3 + 7i - 2 = 1 + 7i$.',
        },
      ],
      lines: [
        { say: 'Your turn. Multiply one plus two i by three plus i. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Expand: three, plus i, plus six i, plus two i squared. Two i squared is negative two, so the real part is three minus two, which is one, and the imaginary part is seven i. The product is one plus seven i. Choice A forgets that i squared is negative.', show: 'q.answer' },
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
          items: ['$i^2 = -1$; a complex number is $a + bi$.', 'Add and subtract the real and imaginary parts separately.', 'Multiply by expanding, then replace $i^2$ with $-1$.', 'The powers of $i$ repeat every four: $i, -1, -i, 1$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. i is a number whose square is negative one, and a complex number is "a" plus b i, with a real part and an imaginary part.', show: 'sum.0' },
        { say: 'Add and subtract the real and imaginary parts separately.', show: 'sum.1' },
        { say: 'Multiply by expanding, then replace i squared with negative one.', show: 'sum.2' },
        { say: 'And the powers of i repeat every four: i, negative one, negative i, one. In the next part, we divide complex numbers using conjugates. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
