import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-27-5',
  lessonId: 'mx-27-5',
  title: 'Matrices and Transformations',
  thumbnail: 'm',
  summary: 'A 2 × 2 matrix sends (x, y) to (ax + by, cx + dy), and its columns are the images of (1, 0) and (0, 1), which gives the matrices of reflections, rotations and enlargements. The size of the determinant ad − bc is the area scale factor. "P then Q" has the single matrix QP, and the inverse matrix undoes a transformation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry Theorems, Vectors and Transformation Matrices', title: 'Matrices and Transformations', subtitle: 'Moving the whole plane at once' }],
      lines: [
        { say: 'A two by two matrix can move every point of the plane at once. Reflections, rotations and enlargements each have their own matrix.', show: 'title' },
        { say: 'In this video, you will learn to use these matrices, to find areas of images, and to combine and undo transformations.' },
      ],
    },
    {
      chapter: 'The image of a point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}', '\\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}\\begin{pmatrix} 4 \\\\ {-1} \\end{pmatrix} = \\begin{pmatrix} 7 \\\\ {-3} \\end{pmatrix}'] },
      ],
      lines: [
        { say: 'To transform a point, write it as a column vector and multiply by the matrix.', show: 'm.0', focus: 'm.0' },
        { say: 'With this matrix, the point with x equal to four and y equal to negative one goes to two times four minus one, which is seven, and three times negative one, which is negative three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The standard matrices',
      layout: 'center',
      main: [
        { kind: 'text', id: 'cols', md: 'The columns are the images of $(1, 0)$ and $(0, 1)$.', size: 'md' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Transformation', 'Matrix'],
          rows: [
            ['Reflection in the $x$-axis', '$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$'],
            ['Reflection in $y = x$', '$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$'],
            ['Rotation $90°$ anticlockwise', '$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$'],
            ['Enlargement, scale factor $k$', '$\\begin{pmatrix} k & 0 \\\\ 0 & k \\end{pmatrix}$'],
          ],
        },
      ],
      lines: [
        { say: 'The columns of a matrix tell us what it does. The first column is the image of one, zero, and the second column is the image of zero, one.', show: 'cols' },
        { say: 'A reflection in the x-axis leaves one, zero alone, and sends zero, one to zero, negative one.', show: 'tb.0' },
        { say: 'A reflection in the line y equals x swaps the two points.', show: 'tb.1' },
        { say: 'A rotation of ninety degrees anticlockwise about the origin sends one, zero to zero, one, and zero, one to negative one, zero.', show: 'tb.2' },
        { say: 'And an enlargement with scale factor k about the origin multiplies both by k.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'Determinant and area',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\det = ad - bc', '\\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}: \\ 3 \\times 4 - 1 \\times 2 = 10', '5 \\times 10 = 50 \\text{ square units}'] },
      ],
      lines: [
        { say: 'The determinant of a two by two matrix is "a" d minus b c. Its size is the area scale factor of the transformation.', show: 'm.0', focus: 'm.0' },
        { say: 'This matrix has determinant three times four minus one times two, which is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So a triangle of area five square units has an image of area fifty square units. Reflections and rotations have a determinant of one or negative one, so they keep areas the same.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Combining and undoing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\mathbf{P} \\text{ then } \\mathbf{Q} = \\mathbf{Q}\\mathbf{P}', '\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}', '\\mathbf{M}^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying in the wrong order', md: '"$\\mathbf{P}$ then $\\mathbf{Q}$" is $\\mathbf{Q}\\mathbf{P}$, not $\\mathbf{P}\\mathbf{Q}$.' },
      ],
      lines: [
        { say: 'When a shape is transformed by P and then by Q, each point goes first to P x, and then to Q times P x. So the single matrix is Q P, with the first transformation on the right.', show: 'm.0', focus: 'm.0' },
        { say: 'A reflection in the x-axis followed by a rotation of ninety degrees anticlockwise gives this matrix, which is a reflection in the line y equals x.', show: 'm.1', focus: 'm.1' },
        { say: 'Matrix multiplication depends on the order, so the two products are usually different.', show: 'oops' },
        { say: 'The inverse matrix undoes a transformation. It sends each image back to the point it came from.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shape of area $6$ square units is transformed by $\\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$. Find the area of its image.',
          choices: ['$14$', '$84$', '$60$', '$36$'],
          answer: 2,
          working: 'Determinant $= 4 \\times 3 - 1 \\times 2 = 10$, so the area is $10 \\times 6 = 60$ square units.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape of area six square units is transformed by this matrix. Find the area of its image. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The determinant is twelve minus two, which is ten, so the area is sixty square units. Choice B adds the two products instead of subtracting them.', show: 'q.answer' },
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
          items: ['The columns are the images of $(1, 0)$ and $(0, 1)$.', 'The size of $ad - bc$ is the area scale factor.', '"$\\mathbf{P}$ then $\\mathbf{Q}$" is $\\mathbf{Q}\\mathbf{P}$.', 'The inverse matrix undoes the transformation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A matrix’s columns are the images of one, zero and zero, one.', show: 'sum.0' },
        { say: 'The size of the determinant is the area scale factor.', show: 'sum.1' },
        { say: 'P then Q has the single matrix Q P.', show: 'sum.2' },
        { say: 'And the inverse matrix undoes the transformation. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
