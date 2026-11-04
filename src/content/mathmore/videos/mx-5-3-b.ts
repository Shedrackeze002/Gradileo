import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-5-3-b',
  lessonId: 'mx-5-3',
  title: 'Determinants and Inverses, Part 2: Solving a System with Matrices',
  thumbnailTitle: 'Solving Systems with Matrices',
  thumbnail: false,
  summary: 'A system of two linear equations is the matrix equation AX = B, and its solution is X = A⁻¹B, with the inverse on the left. For 2x + y = 7 and 3x + 2y = 12, det A = 1, A⁻¹ = [2 −1; −3 2], and X = A⁻¹B gives x = 2 and y = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vectors and Matrices · Part 2', title: 'Solving a System with Matrices', subtitle: 'AX = B, so X = A⁻¹B' }],
      lines: [
        { say: 'In the last part, we found the inverse of a matrix. Now we put it to work.', show: 'title' },
        { say: 'In this video, you will learn to write a system of two equations as one matrix equation, and solve it in one step with the inverse.' },
      ],
    },
    {
      chapter: 'A system as a matrix equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{aligned} ax + by &= e \\\\ cx + dy &= f \\end{aligned}', '\\underbrace{\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}}_{A}\\underbrace{\\begin{bmatrix} x \\\\ y \\end{bmatrix}}_{X} = \\underbrace{\\begin{bmatrix} e \\\\ f \\end{bmatrix}}_{B}', 'A^{-1}AX = A^{-1}B \\quad \\Rightarrow \\quad X = A^{-1}B'] },
      ],
      lines: [
        { say: 'Take a system of two equations: "a" x plus b y equals e, and c x plus d y equals f.', show: 'm.0', focus: 'm.0' },
        { say: 'Put the coefficients in a matrix A, the unknowns x and y in a column X, and the right sides in a column B. Multiplying A by X gives back the left sides, so the system is the matrix equation A X equals B.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply both sides on the left by the inverse of A. The inverse times A is the identity, which leaves X. So X equals A inverse times B.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solving a system',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2x + y = 7 \\qquad 3x + 2y = 12', 'A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} \\qquad \\det A = 4 - 3 = 1 \\qquad A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}', 'X = A^{-1}B = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}\\begin{bmatrix} 7 \\\\ 12 \\end{bmatrix} = \\begin{bmatrix} 14 - 12 \\\\ -21 + 24 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}'] },
        { kind: 'text', id: 'ans', md: '$x = 2$, $y = 3$. Check: $2(2) + 3 = 7$ and $3(2) + 2(3) = 12$.', align: 'center' },
      ],
      lines: [
        { say: 'Let’s solve two x plus y equals seven, and three x plus two y equals twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The coefficient matrix A is two, one, three, two. Its determinant is four minus three, which is one. Swap the diagonal and change the other signs, to get the inverse: two, negative one, negative three, two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply the inverse by B, the column seven, twelve. Row one: fourteen minus twelve is two. Row two: negative 21 plus 24 is three.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is two and y is three. Check in the original equations: two times two plus three is seven, and three times two plus two times three is twelve.', show: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying on the wrong side', md: '$X = A^{-1}B$, **not** $BA^{-1}$. The inverse goes on the **left**, because $A$ is on the left of $X$ in $AX = B$.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When the determinant is 0', md: 'If $\\det A = 0$, there is no inverse, and the system has either no solution or infinitely many.' },
      ],
      lines: [
        { say: 'Be careful with the order. X is A inverse times B, not B times A inverse. The inverse goes on the left, because A is on the left of X. Here, B times A inverse is not even defined: a column with one entry per row cannot be multiplied by a two by two matrix.', show: 'oops' },
        { say: 'And if the determinant is zero, there is no inverse. Then the system has either no solution or infinitely many, and this method cannot be used.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The system $AX = B$ has $A^{-1} = \\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}$ and $B = \\begin{bmatrix} 8 \\\\ 3 \\end{bmatrix}$. Find $x$ and $y$.',
          choices: ['$x = 8$, $y = 3$', '$x = 14$, $y = -17$', '$x = 1$, $y = 2$', '$x = 2$, $y = 1$'],
          answer: 3,
          working: '$X = A^{-1}B$: $x = 1(8) + ({-2})(3) = 2$ and $y = {-1}(8) + 3(3) = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A system has the inverse matrix one, negative two, negative one, three, and the column B is eight, three. Find x and y. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Multiply the inverse by B. Row one: eight minus six is two, so x is two. Row two: negative eight plus nine is one, so y is one.', show: 'q.answer' },
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
          items: ['A system of two equations is $AX = B$.', 'Its solution is $X = A^{-1}B$, with the inverse on the left.', 'Check the answer in the original equations.', 'If $\\det A = 0$, there is no inverse.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A system of two linear equations can be written as one matrix equation, A X equals B.', show: 'sum.0' },
        { say: 'Its solution is X equals A inverse times B, with the inverse on the left.', show: 'sum.1' },
        { say: 'Check the answer in the original equations.', show: 'sum.2' },
        { say: 'And if the determinant is zero, there is no inverse. In the next lesson, we describe points with polar coordinates. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
