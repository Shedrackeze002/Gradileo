import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-21-2',
  lessonId: 'mx-21-2',
  title: 'Dilations on the Cartesian Plane',
  thumbnail: 'd',
  summary: 'A dilation enlarges or reduces a figure from a centre by a scale factor k. With centre (0, 0), (x, y) becomes (kx, ky), so A(3, −2) with k = 4 maps to A′(12, −8). For another centre, multiply the movement from the centre by k. Lengths are multiplied by k and areas by k².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Notation and Dilations', title: 'Dilations on the Cartesian Plane', subtitle: 'Enlarging and reducing with a scale factor' }],
      lines: [
        { say: 'Zooming in on a photo makes everything larger without changing its shape. In geometry this transformation is called a dilation.', show: 'title' },
        { say: 'In this video, you will learn to dilate points on the Cartesian plane, find a scale factor, and see what a dilation does to lengths and areas.' },
      ],
    },
    {
      chapter: 'What a dilation is',
      layout: 'split',
      leftWidth: 760,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          height: 460,
          points: { O: [0, 0], A: [2, 1], B: [3, 3], A2: [4, 2], B2: [6, 6] },
          items: [
            { kind: 'line', id: 'oa', from: 'O', to: 'A2', tone: 'muted', dashed: true },
            { kind: 'line', id: 'ob', from: 'O', to: 'B2', tone: 'muted', dashed: true },
            { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'theta', weight: 5 },
            { kind: 'line', id: 'ab2', from: 'A2', to: 'B2', tone: 'opp', weight: 5 },
            { kind: 'label', id: 'lo', at: 'O', tex: 'O', place: 'below left', dot: true },
            { kind: 'label', id: 'la', at: 'A', tex: 'A', place: 'below right', dot: true },
            { kind: 'label', id: 'lb', at: 'B', tex: 'B', place: 'above left', dot: true },
            { kind: 'label', id: 'la2', at: 'A2', tex: "A'", place: 'below right', dot: true },
            { kind: 'label', id: 'lb2', at: 'B2', tex: "B'", place: 'above left', dot: true },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dilation', md: 'A transformation that enlarges or reduces a figure without changing its shape. Each image point is $k$ times as far from the **centre** as the original. $k$ is the **scale factor**.' },
      ],
      lines: [
        { say: 'A dilation enlarges or reduces a figure without changing its shape. It needs a fixed point, called the centre of dilation, and a number, called the scale factor.', show: ['def', 'd.lo', 'd.ab', 'd.la', 'd.lb'] },
        { say: 'Every point moves along the straight line that joins it to the centre. With a scale factor of two, each image point is twice as far from the centre as the original point.', show: ['d.oa', 'd.ob', 'd.la2', 'd.lb2'] },
        { say: 'The image of A is labelled A prime. The image segment is twice as long as the original, and parallel to it.', show: 'd.ab2', focus: 'd.ab2' },
        { say: 'A scale factor greater than one gives an enlargement. A scale factor between zero and one gives a reduction.' },
      ],
    },
    {
      chapter: 'Centre at the origin',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x, y) \\rightarrow (kx, ky)', 'A(3, {-2}),\\ k = 4', "A'(3 \\times 4,\\ {-2} \\times 4) = A'(12, {-8})"] },
      ],
      lines: [
        { say: 'When the centre is the origin, the rule is short. Multiply both coordinates by the scale factor.', show: 'm.0', focus: 'm.0' },
        { say: 'Dilate the point A, with x equal to three and y equal to negative two. The centre is the origin and the scale factor is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Three times four is twelve, and negative two times four is negative eight. So A prime has x equal to twelve and y equal to negative eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Another centre',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', md: 'Dilate $P(5, 4)$ with centre $C(1, 2)$ and scale factor $3$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['C \\text{ to } P:\\ \\text{right } 4,\\ \\text{up } 2', '\\times 3:\\ \\text{right } 12,\\ \\text{up } 6', "P'(1 + 12,\\ 2 + 6) = P'(13, 8)"] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the coordinates', md: '$(x, y) \\rightarrow (kx, ky)$ only works for the centre $(0, 0)$. For another centre, multiply the **movement from the centre**.' },
      ],
      lines: [
        { say: 'For any other centre, we work with the movement from the centre to the point. Here the centre C has x equal to one and y equal to two, and the point P has x equal to five and y equal to four.', show: 't' },
        { say: 'From C to P, we move right four and up two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply that movement by the scale factor, three. It becomes right twelve and up six.', show: 'm.1', focus: 'm.1' },
        { say: 'Start again from the centre. One plus twelve is thirteen, and two plus six is eight. So P prime has x equal to thirteen and y equal to eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiplying the coordinates themselves only works when the centre is the origin.', show: 'oops' },
      ],
    },
    {
      chapter: 'Lengths and areas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'What a dilation changes', md: 'Angles stay the same. Every length is multiplied by $k$. Every area is multiplied by $k^2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Rectangle } 6 \\times 4,\\ k = \\tfrac{1}{2}', '\\text{Perimeter: } 20 \\times \\tfrac{1}{2} = 10', '\\text{Area: } 24 \\times \\left(\\tfrac{1}{2}\\right)^2 = 6'] },
      ],
      lines: [
        { say: 'A dilation keeps every angle the same, so the image is similar to the original. Every length is multiplied by the scale factor, and every area is multiplied by the scale factor squared.', show: 'key' },
        { say: 'A rectangle six units by four units is dilated with a scale factor of one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Its perimeter is twenty units. The perimeter of the image is twenty times one half, which is ten units.', show: 'm.1', focus: 'm.1' },
        { say: 'Its area is twenty-four square units. One half squared is one quarter, so the area of the image is six square units.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A dilation with centre $(0, 0)$ maps $P(2, 5)$ to $P^\\prime(6, 15)$. What is the scale factor?',
          choices: ['$4$', '$3$', '$10$', '$\\dfrac{1}{3}$'],
          answer: 1,
          working: 'Divide an image coordinate by the original: $\\dfrac{6}{2} = 3$ (and $\\dfrac{15}{5} = 3$).',
        },
      ],
      lines: [
        { say: 'Your turn. A dilation centred at the origin maps the point P, with x equal to two and y equal to five, to an image with x equal to six and y equal to fifteen. What is the scale factor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide a coordinate of the image by the matching coordinate of the original. Six divided by two is three, and fifteen divided by five is three as well.', show: 'q.answer' },
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
          items: ['A dilation enlarges ($k > 1$) or reduces ($0 < k < 1$) from a centre.', 'Centre $(0, 0)$: $(x, y) \\rightarrow (kx, ky)$.', 'Another centre: multiply the movement from the centre by $k$.', 'Lengths are multiplied by $k$, areas by $k^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dilation enlarges or reduces a figure from a centre, and keeps its shape.', show: 'sum.0' },
        { say: 'With the centre at the origin, multiply both coordinates by the scale factor.', show: 'sum.1' },
        { say: 'With another centre, multiply the movement from the centre, then add it to the centre.', show: 'sum.2' },
        { say: 'And lengths are multiplied by the scale factor, while areas are multiplied by its square. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
