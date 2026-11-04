import type { Explainer } from '@/video/script.ts';
import { plane } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import type { DiagramTone } from '@/video/script.ts';

const g = plane({ x: [-1, 7], y: [-1, 5] });

/** An arrow on the plane from one point to another. */
const arrow = (id: string, from: [number, number], to: [number, number], tone: DiagramTone, label?: string, side: 'left' | 'right' = 'left'): Part => ({
  points: { [`${id}-a`]: g.map(...from), [`${id}-b`]: g.map(...to) },
  items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, arrow: true, weight: 5, ...(label ? { label, labelSide: side } : {}) }],
});

const video: Explainer = {
  id: 'mx-5-1-b',
  lessonId: 'mx-5-1',
  title: 'Vectors, Part 2: Adding and Scaling Vectors',
  thumbnailTitle: 'Adding Vectors',
  thumbnail: 'gr',
  summary: 'Vectors are added component by component, ⟨a, b⟩ + ⟨c, d⟩ = ⟨a + c, b + d⟩, which in a drawing puts them tip to tail. A scalar k multiplies each component, stretching the vector and reversing it when k is negative. With u = ⟨2, −1⟩ and v = ⟨−3, 4⟩, 3u − 2v = ⟨12, −11⟩.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vectors and Matrices · Part 2', title: 'Adding and Scaling Vectors', subtitle: 'Tip to tail' }],
      lines: [
        { say: 'A boat heads across a river while the current pushes it downstream. Where does it really go? To find out, we add two vectors.', show: 'title' },
        { say: 'In this video, you will learn to add and subtract vectors, and to multiply a vector by a number.' },
      ],
    },
    {
      chapter: 'Adding vectors',
      layout: 'split',
      leftWidth: 580,
      left: [figure('gr', [g, arrow('u', [0, 0], [4, 1], 'adj', '\\mathbf{u}', 'right'), arrow('v', [4, 1], [5, 4], 'opp', '\\mathbf{v}', 'right'), arrow('s', [0, 0], [5, 4], 'hyp', '\\mathbf{u} + \\mathbf{v}')], 520)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\langle a, b \\rangle + \\langle c, d \\rangle', '= \\langle a + c,\\ b + d \\rangle', '\\adj{\\langle 4, 1 \\rangle} + \\opp{\\langle 1, 3 \\rangle} = \\hyp{\\langle 5, 4 \\rangle}'] },
      ],
      lines: [
        { say: 'To add two vectors, add their components: the across parts together, and the up parts together.', show: ['m.0', 'm.1'], focus: 'm' },
        { say: 'In a drawing, put the vectors tip to tail. Here, u is four, one.', show: ['gr.grid', 'gr.axes', 'gr.u'], focus: 'gr.u' },
        { say: 'Start v, which is one, three, at the tip of u.', show: 'gr.v', focus: 'gr.v' },
        { say: 'The sum runs from the start of the first vector to the end of the second. It is four plus one, which is five, and one plus three, which is four: the vector five, four.', show: ['gr.s', 'm.2'], focus: ['gr.s', 'm.2'] },
      ],
    },
    {
      chapter: 'Multiplying by a scalar',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Multiplying by a scalar', md: '$k\\langle a, b \\rangle = \\langle ka, kb \\rangle$. This stretches the vector by $k$, and **reverses** it when $k$ is negative.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3\\langle 2, 1 \\rangle = \\langle 6, 3 \\rangle \\qquad {-1}\\langle 2, 1 \\rangle = \\langle {-2}, {-1} \\rangle'] },
      ],
      lines: [
        { say: 'A plain number is called a scalar, because it scales a vector. To multiply a vector by a scalar k, multiply each component by k.', show: 'def' },
        { say: 'Three times two, one is six, three. It points the same way, but it is three times as long.', show: 'm.0', focus: 'm.0' },
        { say: 'A negative scalar reverses the vector. Negative one times two, one is negative two, negative one: the same length, pointing the opposite way.' },
      ],
    },
    {
      chapter: 'Combining vectors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\mathbf{u} = \\langle 2, {-1} \\rangle \\qquad \\mathbf{v} = \\langle {-3}, 4 \\rangle', '3\\mathbf{u} = \\langle 6, {-3} \\rangle \\qquad 2\\mathbf{v} = \\langle {-6}, 8 \\rangle', '3\\mathbf{u} - 2\\mathbf{v} = \\langle 6 - ({-6}),\\ {-3} - 8 \\rangle = \\langle 12, {-11} \\rangle'] },
      ],
      lines: [
        { say: 'Let u be two, negative one, and v be negative three, four. Find three u minus two v.', show: 'm.0', focus: 'm.0' },
        { say: 'First scale each one. Three u is six, negative three. Two v is negative six, eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract component by component. Six minus negative six is twelve, and negative three minus eight is negative eleven. So three u minus two v is twelve, negative eleven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the magnitudes', md: 'The magnitude of a sum is **not** the sum of the magnitudes. $\\langle 3, 0 \\rangle$ and $\\langle 0, 4 \\rangle$ have magnitudes $3$ and $4$, but their sum $\\langle 3, 4 \\rangle$ has magnitude $5$.' },
      ],
      lines: [
        { say: 'A common mistake is to add the magnitudes. The magnitude of a sum is not the sum of the magnitudes.', show: 'oops' },
        { say: 'Three, zero has magnitude three, and zero, four has magnitude four. But their sum, three, four, has magnitude five, not seven. The two vectors point in different directions, so they do not simply add up in length.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $\\mathbf{u} = \\langle 1, 5 \\rangle$ and $\\mathbf{v} = \\langle 4, -2 \\rangle$. Find $2\\mathbf{u} + \\mathbf{v}$.',
          choices: ['$\\langle 5, 3 \\rangle$', '$\\langle 6, 8 \\rangle$', '$\\langle 10, 6 \\rangle$', '$\\langle 6, 12 \\rangle$'],
          answer: 1,
          working: '$2\\mathbf{u} = \\langle 2, 10 \\rangle$, and $\\langle 2, 10 \\rangle + \\langle 4, -2 \\rangle = \\langle 6, 8 \\rangle$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let u be one, five, and v be four, negative two. Find two u plus v. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Two u is two, ten. Add v: two plus four is six, and ten plus negative two is eight. So two u plus v is six, eight. Choice A forgets to double u.', show: 'q.answer' },
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
          items: ['Add vectors component by component.', 'In a drawing, put them tip to tail.', 'A scalar multiplies each component; a negative one reverses the vector.', 'The magnitude of a sum is not the sum of the magnitudes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Add vectors component by component.', show: 'sum.0' },
        { say: 'In a drawing, put them tip to tail, and the sum runs from the start of the first to the end of the second.', show: 'sum.1' },
        { say: 'A scalar multiplies each component, and a negative scalar reverses the vector.', show: 'sum.2' },
        { say: 'And the magnitude of a sum is not the sum of the magnitudes. In the next lesson, we meet matrices. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
