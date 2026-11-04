import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-5-3',
  lessonId: 'mx-5-3',
  title: 'Determinants and Inverses, Part 1: The Determinant and the Inverse',
  thumbnailTitle: 'Determinants and Inverses',
  thumbnail: false,
  summary: 'The determinant of the 2 × 2 matrix [a b; c d] is ad − bc. The identity matrix I acts like 1, and the inverse A⁻¹ satisfies AA⁻¹ = I: swap the main diagonal, change the signs of the other two entries and divide by the determinant. A matrix with determinant 0 has no inverse.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vectors and Matrices · Part 1', title: 'The Determinant and the Inverse', subtitle: 'Dividing by a matrix' }],
      lines: [
        { say: 'With numbers, dividing by three is the same as multiplying by one third. Can we do something like that with a matrix?', show: 'title' },
        { say: 'In this video, you will learn about the inverse of a matrix, which plays the part of dividing, and the determinant, a single number that tells us when the inverse exists.' },
      ],
    },
    {
      chapter: 'The determinant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'def', size: 'lg', lines: ['A = \\begin{bmatrix} \\adj{a} & \\opp{b} \\\\ \\opp{c} & \\adj{d} \\end{bmatrix} \\qquad \\det A = \\adj{ad} - \\opp{bc}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\det \\begin{bmatrix} 4 & -3 \\\\ 2 & 5 \\end{bmatrix} = 4 \\times 5 - ({-3}) \\times 2 = 20 + 6 = 26'] },
      ],
      lines: [
        { say: 'For a two by two matrix with entries "a", b, c, d, the determinant is "a" d minus b c.', show: 'def' },
        { say: 'Multiply down the main diagonal, from top left to bottom right. Then subtract the product of the other diagonal.', focus: 'def' },
        { say: 'For example, the matrix four, negative three, two, five. Four times five is twenty. Negative three times two is negative six. Twenty minus negative six is 26, so the determinant is 26.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The identity matrix',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\qquad AI = IA = A', 'AA^{-1} = A^{-1}A = I'] },
      ],
      lines: [
        { say: 'The identity matrix has ones on its main diagonal and zeros everywhere else. It acts like the number one: any matrix times the identity is the same matrix.', show: 'm.0', focus: 'm.0' },
        { say: 'The inverse of A, written A to the power of negative one, is the matrix that multiplies with A to give the identity, in either order. It is like the one third that multiplies three to give one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The inverse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A^{-1} = \\dfrac{1}{ad - bc}\\begin{bmatrix} \\adj{d} & \\opp{-b} \\\\ \\opp{-c} & \\adj{a} \\end{bmatrix}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'To invert a 2 × 2 matrix', md: '**Swap** the two entries on the main diagonal, **change the signs** of the other two, and **divide by the determinant**. When $\\det A = 0$, there is **no inverse**.' },
      ],
      lines: [
        { say: 'When the determinant is not zero, the inverse is one over the determinant, times the matrix d, negative b, negative c, "a".', show: 'f' },
        { say: 'In words: swap the two entries on the main diagonal, change the signs of the other two, and divide by the determinant.', show: 'key' },
        { say: 'When the determinant is zero, we would be dividing by zero, so the matrix has no inverse.' },
      ],
    },
    {
      chapter: 'Finding an inverse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix} \\qquad \\det A = 6 - 5 = 1', 'A^{-1} = \\dfrac{1}{1}\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}', '\\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\checkmark'] },
      ],
      lines: [
        { say: 'Let’s invert the matrix three, one, five, two. Its determinant is three times two, minus one times five, which is one.', show: 'm.0', focus: 'm.0' },
        { say: 'Swap the three and the two on the main diagonal. Change the signs of the one and the five. Then divide by the determinant, one, which changes nothing.', show: 'm.1', focus: 'm.1' },
        { say: 'Check by multiplying. Row one times column one: six minus five is one. Row one times column two: negative three plus three is zero. The other two entries give zero and one. So the product is the identity.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which matrix has no inverse?',
          choices: ['$\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$', '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$', '$\\begin{bmatrix} 3 & 2 \\\\ 1 & 4 \\end{bmatrix}$', '$\\begin{bmatrix} 2 & 6 \\\\ 1 & 3 \\end{bmatrix}$'],
          answer: 3,
          working: 'Its determinant is $2 \\times 3 - 6 \\times 1 = 0$, so it has no inverse. The others have determinants $3$, $1$ and $10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these matrices has no inverse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Its determinant is two times three, minus six times one, which is zero. A determinant of zero means no inverse. The others have determinants of three, one and ten.', show: 'q.answer' },
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
          items: ['$\\det \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc$.', 'The identity $I$ acts like $1$; $AA^{-1} = I$.', 'Swap the diagonal, change the other signs, divide by the determinant.', 'A determinant of $0$ means no inverse.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The determinant of a two by two matrix is "a" d minus b c.', show: 'sum.0' },
        { say: 'The identity matrix acts like one, and a matrix times its inverse is the identity.', show: 'sum.1' },
        { say: 'To find the inverse, swap the main diagonal, change the signs of the other two entries, and divide by the determinant.', show: 'sum.2' },
        { say: 'And a determinant of zero means there is no inverse. In the next part, we use the inverse to solve a system of equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
