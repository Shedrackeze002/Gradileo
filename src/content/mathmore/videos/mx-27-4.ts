import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-27-4',
  lessonId: 'mx-27-4',
  title: 'The Ratio Theorem and Collinear Points',
  thumbnail: 'm',
  summary: 'The vector from A to B is b − a, and the midpoint of AB has position vector ½(a + b). The ratio theorem: if AP : PB = m : n, then OP = (na + mb)/(m + n), with the numbers crossing over. A, B and C are collinear when AC is a scalar multiple of AB; for A(1, 3), B(4, 9) and C(7, k), AC = 2AB gives k = 15.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry Theorems, Vectors and Transformation Matrices', title: 'The Ratio Theorem and Collinear Points', subtitle: 'Geometry with position vectors' }],
      lines: [
        { say: 'Vectors can do geometry without any angles or lengths.', show: 'title' },
        { say: 'In this video, you will learn to find the point that divides a line in a given ratio, and to test whether three points lie on one straight line.' },
      ],
    },
    {
      chapter: 'Position vectors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Position vector', md: 'The vector $\\overrightarrow{OA} = \\mathbf{a}$ from the origin to $A$. Then $\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\overrightarrow{OM} = \\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})', '\\tfrac{1}{2}\\left[\\begin{pmatrix} 2 \\\\ 5 \\end{pmatrix} + \\begin{pmatrix} 8 \\\\ 1 \\end{pmatrix}\\right] = \\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix}'] },
      ],
      lines: [
        { say: 'The position vector of a point A is the vector from the origin to A, written as bold "a". To travel from A to B, go back to the origin and out again, so the vector from A to B is b minus "a".', show: 'def' },
        { say: 'The midpoint M is halfway along, so its position vector is the average of the two: a half of "a" plus b.', show: 'm.0', focus: 'm.0' },
        { say: 'For position vectors two, five and eight, one, the midpoint has position vector five, three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The ratio theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio theorem', md: 'If $AP : PB = m : n$, then $\\overrightarrow{OP} = \\dfrac{n\\mathbf{a} + m\\mathbf{b}}{m + n}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['AP : PB = 2 : 3: \\ \\overrightarrow{OP} = \\dfrac{3\\mathbf{a} + 2\\mathbf{b}}{5}', '= \\dfrac{1}{5}\\left[\\begin{pmatrix} 3 \\\\ 6 \\end{pmatrix} + \\begin{pmatrix} 22 \\\\ 14 \\end{pmatrix}\\right] = \\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The numbers cross over', md: '$P$ is nearer to $A$, so $\\mathbf{a}$ gets the larger weight.' },
      ],
      lines: [
        { say: 'If P divides AB in the ratio m to n, then P is m over m plus n of the way from A to B. Collecting the terms gives the ratio theorem.', show: 'def' },
        { say: 'Let "a" be one, two and b be eleven, seven, with AP to PB equal to two to three. Then OP is three "a" plus two b, all over five.', show: 'm.0', focus: 'm.0' },
        { say: 'Three "a" is three, six, and two b is twenty-two, fourteen. Their sum over five is five, four.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that the numbers cross over. P is nearer to A, so "a" gets the larger weight, three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Collinear points',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Collinear', md: 'Points on one straight line. $A$, $B$ and $C$ are collinear when $\\overrightarrow{AC} = k\\overrightarrow{AB}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['A(1, 3), \\ B(4, 9), \\ C(7, k)', '\\overrightarrow{AB} = \\begin{pmatrix} 3 \\\\ 6 \\end{pmatrix}, \\quad \\overrightarrow{AC} = \\begin{pmatrix} 6 \\\\ k - 3 \\end{pmatrix}', '6 = 2 \\times 3, \\ \\text{so } k - 3 = 12 \\text{ and } k = 15'] },
      ],
      lines: [
        { say: 'Points are collinear when they lie on one straight line. If AC is a multiple of AB, the two vectors are parallel, and since they share the point A, they lie on the same line.', show: 'def' },
        { say: 'Suppose these three points are collinear. Let’s find k.', show: 'm.0', focus: 'm.0' },
        { say: 'AB is three, six, and AC is six and k minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'The top entries show that AC is twice AB. So k minus three is twice six, which is twelve, and k is fifteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\mathbf{a} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$, $\\mathbf{b} = \\begin{pmatrix} 10 \\\\ 9 \\end{pmatrix}$ and $AP : PB = 3 : 1$. Find $\\overrightarrow{OP}$.',
          choices: ['$\\begin{pmatrix} 8 \\\\ 7 \\end{pmatrix}$', '$\\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix}$', '$\\begin{pmatrix} 6 \\\\ 5 \\end{pmatrix}$', '$\\begin{pmatrix} 9 \\\\ 8 \\end{pmatrix}$'],
          answer: 0,
          working: '$\\overrightarrow{OP} = \\dfrac{\\mathbf{a} + 3\\mathbf{b}}{4} = \\dfrac{1}{4}\\begin{pmatrix} 32 \\\\ 28 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 7 \\end{pmatrix}$.',
        },
      ],
      lines: [
        { say: 'Your turn. P divides AB in the ratio three to one. Find the position vector of P. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. OP is "a" plus three b, all over four, which is thirty-two, twenty-eight over four, or eight, seven. Choice B puts the weights the wrong way round.', show: 'q.answer' },
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
          items: ['$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$; midpoint $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$.', 'Ratio theorem: $\\overrightarrow{OP} = \\dfrac{n\\mathbf{a} + m\\mathbf{b}}{m + n}$.', 'Collinear when $\\overrightarrow{AC} = k\\overrightarrow{AB}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The vector from A to B is b minus "a", and the midpoint is the average of the position vectors.', show: 'sum.0' },
        { say: 'The ratio theorem gives the point that divides AB in a ratio, with the numbers crossing over.', show: 'sum.1' },
        { say: 'And three points are collinear when one vector between them is a multiple of another. See you in the next lesson!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
