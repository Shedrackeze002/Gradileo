import type { Explainer } from '@/video/script.ts';

const A = '\\begin{bmatrix} 1 & 4 \\\\ -2 & 3 \\end{bmatrix}';
const B = '\\begin{bmatrix} 5 & 0 \\\\ 1 & -6 \\end{bmatrix}';

const video: Explainer = {
  id: 'mx-5-2',
  lessonId: 'mx-5-2',
  title: 'Matrices',
  thumbnail: false,
  summary: 'A matrix is a rectangular array; an m × n matrix has m rows and n columns. Matrices of the same size are added entry by entry, and a scalar multiplies every entry. Each entry of AB is a row of A times a column of B, so the order matters and AB is usually not BA.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vectors and Matrices', title: 'Matrices', subtitle: 'Grids of numbers you can calculate with' }],
      lines: [
        { say: 'A shop records the sales of three items over two days in a grid of numbers. A grid like this is called a matrix.', show: 'title' },
        { say: 'Matrices can be added, scaled and multiplied, which makes them a tool for organizing data, transforming shapes and solving systems of equations. In this video, you will learn how.' },
      ],
    },
    {
      chapter: 'Matrices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Matrix', md: 'A rectangular array of numbers in **rows** and **columns**. With $m$ rows and $n$ columns, its **dimensions** are $m \\times n$. The number in row $i$, column $j$ is the **entry** $a_{ij}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\begin{bmatrix} 2 & -1 & \\opp{5} \\\\ 0 & 3 & 4 \\end{bmatrix} \\qquad 2 \\times 3, \\quad a_{13} = \\opp{5}'] },
      ],
      lines: [
        { say: 'A matrix is a rectangular array of numbers, arranged in rows and columns.', show: 'def' },
        { say: 'A matrix with m rows and n columns has dimensions m by n. Rows always come first.' },
        { say: 'This matrix has two rows and three columns, so it is a two by three matrix.', show: 'm.0', focus: 'm.0' },
        { say: 'Each number in it is called an entry. The entry in row one, column three is called "a" one three, and here it is five.' },
      ],
    },
    {
      chapter: 'Adding and scaling',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: [`A = ${A} \\qquad B = ${B}`, `2A = \\begin{bmatrix} 2 & 8 \\\\ -4 & 6 \\end{bmatrix}`, `2A + B = \\begin{bmatrix} 2 + 5 & 8 + 0 \\\\ -4 + 1 & 6 + ({-6}) \\end{bmatrix} = \\begin{bmatrix} 7 & 8 \\\\ -3 & 0 \\end{bmatrix}`] },
      ],
      lines: [
        { say: 'Matrices with the same dimensions are added entry by entry. And to multiply a matrix by a number, a scalar, multiply every entry by it. Let’s find two A plus B for these two matrices.', show: 'm.0', focus: 'm.0' },
        { say: 'First, two A. Double every entry of A: two, eight, negative four, six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add B, entry by entry. Two plus five is seven, eight plus zero is eight, negative four plus one is negative three, and six plus negative six is zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Multiplying matrices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Matrix multiplication', md: 'The entry in row $i$, column $j$ of $AB$ is **row $i$ of $A$** times **column $j$ of $B$**: multiply the matching entries and add. $AB$ exists only when $A$ has as many columns as $B$ has rows.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{bmatrix} \\adj{a} & \\adj{b} \\\\ c & d \\end{bmatrix}\\begin{bmatrix} \\opp{e} & f \\\\ \\opp{g} & h \\end{bmatrix} = \\begin{bmatrix} \\adj{a}\\opp{e} + \\adj{b}\\opp{g} & af + bh \\\\ ce + dg & cf + dh \\end{bmatrix}'] },
      ],
      lines: [
        { say: 'Multiplying matrices is different. Each entry of the product combines a whole row of the first matrix with a whole column of the second.', show: 'def' },
        { say: 'For the entry in row i and column j, take row i of A and column j of B. Multiply the matching entries, and add.' },
        { say: 'For the top left entry, take the top row, "a", b, and the left column, e, g. Multiply "a" by e and b by g, and add: "a" e plus b g.', show: 'm.0', focus: 'm.0' },
        { say: 'So the product only exists when the first matrix has as many columns as the second has rows: each row must be as long as each column.' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: [`AB = ${A}${B}`, '\\text{Row 1: } 1(5) + 4(1) = 9 \\qquad 1(0) + 4({-6}) = -24', '\\text{Row 2: } {-2}(5) + 3(1) = -7 \\qquad {-2}(0) + 3({-6}) = -18', 'AB = \\begin{bmatrix} 9 & -24 \\\\ -7 & -18 \\end{bmatrix}'] },
      ],
      lines: [
        { say: 'Let’s find A B for the same two matrices.', show: 'm.0', focus: 'm.0' },
        { say: 'Row one of A is one, four. Times column one of B, five, one: one times five plus four times one is nine. Times column two, zero, negative six: one times zero plus four times negative six is negative 24.', show: 'm.1', focus: 'm.1' },
        { say: 'Row two of "A" is negative two, three. Times column one: negative ten plus three, which is negative seven. Times column two: zero plus negative eighteen, which is negative eighteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So A B has the entries nine, negative 24, negative seven and negative eighteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying entry by entry', md: 'Matrices are **not** multiplied entry by entry: each entry of the product combines a whole row with a whole column. And the order matters: in general, $AB \\ne BA$.' },
      ],
      lines: [
        { say: 'A common mistake is to multiply matrices entry by entry, the way we add them. That is not how it works: each entry of the product combines a whole row with a whole column.', show: 'oops' },
        { say: 'Also, the order matters. In general, A B is not the same as B A. Try finding B A for these matrices, and you will get a different answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the top left entry of $\\begin{bmatrix} 2 & 3 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 4 & 1 \\\\ 5 & 2 \\end{bmatrix}$.',
          choices: ['$8$', '$23$', '$11$', '$14$'],
          answer: 1,
          working: 'Row $1$ times column $1$: $2 \\times 4 + 3 \\times 5 = 8 + 15 = 23$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the top left entry of the product on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Take row one of the first matrix, two, three, and column one of the second, four, five. Two times four plus three times five is eight plus fifteen, which is 23. Choice A multiplies only the top left entries.', show: 'q.answer' },
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
          items: ['An $m \\times n$ matrix has $m$ rows and $n$ columns.', 'Add matrices of the same size entry by entry; a scalar multiplies every entry.', 'Each entry of $AB$ is a row of $A$ times a column of $B$.', 'The order matters: usually $AB \\ne BA$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A matrix is a rectangular array, and an m by n matrix has m rows and n columns.', show: 'sum.0' },
        { say: 'Add matrices of the same size entry by entry, and a scalar multiplies every entry.', show: 'sum.1' },
        { say: 'Each entry of A B is a row of A times a column of B.', show: 'sum.2' },
        { say: 'And the order matters: A B is usually not B A. In the next lesson, we find the determinant and the inverse of a matrix, and use them to solve equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
