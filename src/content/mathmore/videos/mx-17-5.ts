import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-17-5',
  lessonId: 'mx-17-5',
  title: 'Vectors in Three Dimensions',
  thumbnail: 'm',
  summary: 'In three dimensions, i, j and k are unit vectors along the x-, y- and z-axes, and |xi + yj + zk| = √(x² + y² + z²), so |2i − 3j + 6k| = 7. The vector from A to B is b − a, and the distance AB is its magnitude. The angle with the x-axis has cos θ = x/|v|: for 2i − 3j + 6k, θ ≈ 73.4°. Midpoints and parallelograms work as in two dimensions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Algebra and Vectors', title: 'Vectors in Three Dimensions', subtitle: 'Adding a third direction' }],
      lines: [
        { say: 'A drone that flies two metres east, three metres south and six metres up has moved in three dimensions.', show: 'title' },
        { say: 'Vectors handle this just as they do in two dimensions. We only need a third unit vector, k, pointing up. In this video, you will find lengths, distances and angles in three dimensions.' },
      ],
    },
    {
      chapter: 'Vectors in 3D',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Three-dimensional vectors', md: '$\\mathbf{i}$, $\\mathbf{j}$ and $\\mathbf{k}$ are unit vectors along the $x$-, $y$- and $z$-axes. The point $(x, y, z)$ has position vector $x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['|x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}| = \\sqrt{x^2 + y^2 + z^2}', '|2\\mathbf{i} - 3\\mathbf{j} + 6\\mathbf{k}| = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Square the negatives', md: '$(-3)^2 = 9$: a negative component still adds to the length.' },
      ],
      lines: [
        { say: 'In three dimensions, i, j and k are unit vectors along the x, y and z axes. The point with coordinates x, y, z has position vector x i plus y j plus z k.', show: 'def' },
        { say: 'The magnitude, or length, of a vector comes from Pythagoras’ theorem used twice: the square root of x squared plus y squared plus z squared.', show: 'm.0', focus: 'm.0' },
        { say: 'So two i minus three j plus six k has length the square root of four plus nine plus thirty six, which is the square root of forty nine, seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative three squared is positive nine. A negative component still adds to the length.', show: 'mis' },
      ],
    },
    {
      chapter: 'Distance and direction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$A(1, 2, -1)$ and $B(3, -1, 5)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a} = 2\\mathbf{i} - 3\\mathbf{j} + 6\\mathbf{k}', 'AB = 7', '\\cos\\theta = \\tfrac{2}{7} \\;\\Rightarrow\\; \\theta \\approx 73.4^\\circ'] },
      ],
      lines: [
        { say: 'Point "A" has coordinates one, two, negative one, and point B has coordinates three, negative one, five. Find the distance between them.', show: 'q' },
        { say: 'The vector from "A" to B is b minus "a": three minus one, negative one minus two, and five minus negative one. That gives two i minus three j plus six k.', show: 'm.0', focus: 'm.0' },
        { say: 'Its magnitude is seven, as we found, so the distance from "A" to B is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The angle between a vector and the x-axis has cos theta equal to the x component over the length. Here that is two sevenths, so theta is about seventy three point four degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Geometry in 3D',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'r', items: ['$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$', 'The midpoint of $AB$ is $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$.', 'In a parallelogram $ABCD$, $\\overrightarrow{AD} = \\overrightarrow{BC}$.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One coordinate at a time', md: 'Every vector rule works separately on $x$, $y$ and $z$, so set your working out in three columns.' },
      ],
      lines: [
        { say: 'All the rules from two dimensions carry over. The vector from "A" to B is b minus "a".', show: 'r.0', focus: 'r.0' },
        { say: 'The midpoint of "A" B is a half of "a" plus b.', show: 'r.1', focus: 'r.1' },
        { say: 'And in a parallelogram "A" B C D, the vector "A" D equals the vector B C.', show: 'r.2', focus: 'r.2' },
        { say: 'Every rule works separately on the x, y and z coordinates, so set your working out in three columns.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $|4\\mathbf{i} - 4\\mathbf{j} + 7\\mathbf{k}|$.',
          choices: ['$7$', '$9$', '$\\sqrt{15}$', '$3$'],
          answer: 1,
          working: '$\\sqrt{16 + 16 + 49} = \\sqrt{81} = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the magnitude of four i minus four j plus seven k. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Four squared plus negative four squared plus seven squared is sixteen plus sixteen plus forty nine, which is eighty one, and its square root is nine. Choice D subtracts the square of negative four.', show: 'q.answer' },
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
          items: ['$|x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}| = \\sqrt{x^2 + y^2 + z^2}$.', '$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$, and $AB$ is its magnitude.', 'The angle with the $x$-axis: $\\cos\\theta = \\dfrac{x}{|\\mathbf{v}|}$.', 'Work one coordinate at a time.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The magnitude of a three-dimensional vector is the square root of the sum of the squares of its components.', show: 'sum.0' },
        { say: 'The vector from "A" to B is b minus "a", and the distance is its magnitude.', show: 'sum.1' },
        { say: 'The angle with the x-axis has cos theta equal to x over the length.', show: 'sum.2' },
        { say: 'And every rule works one coordinate at a time. In the next lesson, we approximate sine, cos and tan for small angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
