import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-4-1-b',
  lessonId: 'mx-4-1',
  title: 'Complex Numbers, Part 2: Conjugates and Division',
  thumbnailTitle: 'Conjugates and Division',
  thumbnail: false,
  summary: 'The conjugate of a + bi is a − bi, and a complex number times its conjugate is the real number a² + b². To divide, multiply the top and bottom by the conjugate of the bottom: (7 + i) ÷ (1 + 2i) = (9 − 13i) ÷ 5 = 9/5 − (13/5)i.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Complex Numbers and Polynomials · Part 2', title: 'Conjugates and Division', subtitle: 'Making the bottom real' }],
      lines: [
        { say: 'In the last part, we added, subtracted and multiplied complex numbers. Dividing takes one more idea.', show: 'title' },
        { say: 'In this video, you will learn about the conjugate of a complex number, and how it lets us divide.' },
      ],
    },
    {
      chapter: 'The conjugate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Complex conjugate', md: 'The **conjugate** of $a + bi$ is $a - bi$: the same real part, and the opposite imaginary part.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(a + bi)(a - bi) = a^2 - abi + abi - b^2 i^2', '= a^2 + b^2', '(3 + 4i)(3 - 4i) = 9 + 16 = 25'] },
      ],
      lines: [
        { say: 'The conjugate of "a" plus b i is "a" minus b i. It has the same real part, and the opposite imaginary part.', show: 'def' },
        { say: 'Here is why it is useful. Multiply a complex number by its conjugate. The two middle terms cancel, and the last term is negative b squared times i squared, which is plus b squared.', show: 'm.0', focus: 'm.0' },
        { say: 'So the product is "a" squared plus b squared. It is a real number, with no i at all.', show: 'm.1', focus: 'm.1' },
        { say: 'For example, three plus four i times three minus four i is nine plus sixteen, which is 25.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7 + i}{1 + 2i} \\times \\dfrac{\\adj{1 - 2i}}{\\adj{1 - 2i}}', '\\text{Bottom: } (1 + 2i)(1 - 2i) = 1 + 4 = 5', '\\text{Top: } (7 + i)(1 - 2i) = 7 - 14i + i - 2i^2 = 9 - 13i', '= \\dfrac{9 - 13i}{5} = \\dfrac{9}{5} - \\dfrac{13}{5}i'] },
      ],
      lines: [
        { say: 'To divide by a complex number, multiply the top and the bottom by the conjugate of the bottom. Let’s divide seven plus i by one plus two i. The conjugate of the bottom is one minus two i.', show: 'm.0', focus: 'm.0' },
        { say: 'The bottom becomes a real number: one squared plus two squared, which is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the top. Seven plus i times one minus two i is seven, minus fourteen i, plus i, minus two i squared. Minus two i squared is plus two, so the top is nine minus thirteen i.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide each part by five. The answer is nine fifths, minus thirteen fifths i.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check by multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\dfrac{9}{5} - \\dfrac{13}{5}i\\right)(1 + 2i) = \\dfrac{9}{5} + \\dfrac{18}{5}i - \\dfrac{13}{5}i - \\dfrac{26}{5}i^2', '= \\dfrac{9 + 26}{5} + \\dfrac{5}{5}i = 7 + i \\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Why the conjugate?', md: 'Multiplying by $\\dfrac{1 - 2i}{1 - 2i}$ is multiplying by $1$, so the value does not change, but the bottom becomes **real**.' },
      ],
      lines: [
        { say: 'We can check by multiplying the answer by the bottom, one plus two i. We should get the top, seven plus i.', show: 'm.0', focus: 'm.0' },
        { say: 'Minus 26 fifths i squared is plus 26 fifths. So the real part is nine fifths plus 26 fifths, which is seven, and the imaginary part is eighteen fifths minus thirteen fifths, which is one. That gives seven plus i.', show: 'm.1', focus: 'm.1' },
        { say: 'Why does the conjugate work? Multiplying by one minus two i over one minus two i is multiplying by one, so the value does not change. But the bottom becomes a real number, and then we can divide each part.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Divide $\\dfrac{10}{3 - i}$.',
          choices: ['$\\dfrac{10}{3} + 10i$', '$3 - i$', '$1 + 3i$', '$3 + i$'],
          answer: 3,
          working: 'Multiply top and bottom by $3 + i$: bottom $9 + 1 = 10$, top $10(3 + i) = 30 + 10i$. So $\\dfrac{30 + 10i}{10} = 3 + i$.',
        },
      ],
      lines: [
        { say: 'Your turn. Divide ten by three minus i. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Multiply the top and bottom by the conjugate, three plus i. The bottom is nine plus one, which is ten. The top is ten times three plus i, which is thirty plus ten i. Divide each part by ten, and you get three plus i.', show: 'q.answer' },
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
          items: ['The conjugate of $a + bi$ is $a - bi$.', '$(a + bi)(a - bi) = a^2 + b^2$, a real number.', 'To divide, multiply the top and bottom by the conjugate of the bottom.', 'Check by multiplying the answer by the bottom.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The conjugate of "a" plus b i is "a" minus b i.', show: 'sum.0' },
        { say: 'A complex number times its conjugate is "a" squared plus b squared, a real number.', show: 'sum.1' },
        { say: 'To divide, multiply the top and the bottom by the conjugate of the bottom, then divide each part.', show: 'sum.2' },
        { say: 'And you can check by multiplying the answer by the bottom. In the next lesson, we use complex numbers to solve every quadratic equation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
