import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import type { DiagramTone } from '@/video/script.ts';

const g = plane({ x: [-1, 6], y: [-1, 5] });
const h = plane({ name: 'h', x: [-4, 2], y: [-1, 5] });

/** An arrow on a plane from one point to another. */
const arrow = (p: typeof g, id: string, from: [number, number], to: [number, number], tone: DiagramTone, label?: string): Part => ({
  points: { [`${id}-a`]: p.map(...from), [`${id}-b`]: p.map(...to) },
  items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, arrow: true, weight: 5, ...(label ? { label, labelSide: 'left' as const } : {}) }],
});

const video: Explainer = {
  id: 'mx-5-1',
  lessonId: 'mx-5-1',
  title: 'Vectors, Part 1: Components, Magnitude and Direction',
  thumbnailTitle: 'Vectors',
  thumbnail: 'gr',
  summary: 'A vector has a magnitude and a direction. In component form it is ⟨a, b⟩, the vector from P to Q is Q minus P, and its magnitude is √(a² + b²): from P(1, 1) to Q(5, 4) is ⟨4, 3⟩ with magnitude 5. The direction of ⟨−3, 4⟩ is 180° − 53.1° ≈ 126.9°, adjusted for its quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vectors and Matrices · Part 1', title: 'Vectors', subtitle: 'A size and a direction' }],
      lines: [
        { say: 'A wind of thirty kilometres an hour from the west and a wind of thirty kilometres an hour from the north push a plane in very different ways.', show: 'title' },
        { say: 'Some quantities need a direction as well as a size: velocity, force, and displacement. These are vectors. In this video, you will learn to describe a vector by its components, its magnitude and its direction.' },
      ],
    },
    {
      chapter: 'Vectors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Vector', md: 'A quantity with a **magnitude** (a size) and a **direction**, drawn as an arrow. The vector from $P$ to $Q$ is $\\overrightarrow{PQ}$; a vector can also be named with a bold letter, $\\mathbf{v}$.' },
        { kind: 'callout', id: 'comp', tone: 'definition', title: 'Component form', md: 'A vector that moves $\\adj{a}$ across and $\\opp{b}$ up is $\\langle \\adj{a}, \\opp{b} \\rangle$. Its magnitude is $|\\langle a, b \\rangle| = \\sqrt{a^2 + b^2}$.' },
      ],
      lines: [
        { say: 'A vector is a quantity with a magnitude, which is its size, and a direction. We draw it as an arrow.', show: 'def' },
        { say: 'The vector from a point P to a point Q is written P Q with an arrow on top. A vector can also be named with a bold letter, such as v.' },
        { say: 'A vector that moves "a" across and b up is written in component form, with angle brackets: "a", b. Its magnitude, the length of the arrow, is the square root of "a" squared plus b squared, by the Pythagorean theorem.', show: 'comp' },
      ],
    },
    {
      chapter: 'Components and magnitude',
      layout: 'split',
      leftWidth: 700,
      left: [
        figure('gr', [g, polyline(g, { id: 'run', points: [[1, 1], [5, 1]], tone: 'adj', dashed: true, labels: ['4'], sides: ['right'] }), polyline(g, { id: 'rise', points: [[5, 1], [5, 4]], tone: 'opp', dashed: true, labels: ['3'], sides: ['right'] }), arrow(g, 'v', [1, 1], [5, 4], 'hyp'), dots(g, [{ id: 'P', x: 1, y: 1, tex: 'P(1, 1)', place: 'below left' }, { id: 'Q', x: 5, y: 4, tex: 'Q(5, 4)', place: 'above' }])], 560),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\overrightarrow{PQ} = \\langle 5 - 1,\\ 4 - 1 \\rangle', '= \\langle \\adj{4}, \\opp{3} \\rangle', '|\\overrightarrow{PQ}| = \\sqrt{4^2 + 3^2}', '= \\sqrt{25} = 5'] }],
      lines: [
        { say: 'Find the vector from P, at one, one, to Q, at five, four, and its magnitude.', show: ['gr.grid', 'gr.axes', 'gr.P', 'gr.Q', 'gr.v'], focus: 'gr.v' },
        { say: 'The vector from P to Q is Q minus P. Across, it is five minus one, which is four. Up, it is four minus one, which is three.', show: ['gr.run', 'gr.rise', 'm.0', 'm.1'], focus: ['gr.run', 'gr.rise', 'm.1'] },
        { say: 'So the vector is four, three: four across and three up.', focus: 'm.1' },
        { say: 'Its magnitude is the square root of four squared plus three squared. That is the square root of 25, which is five.', show: ['m.2', 'm.3'], focus: ['m.3', 'gr.v'] },
      ],
    },
    {
      chapter: 'Direction',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('d', [h, polyline(h, { id: 'run', points: [[0, 0], [-3, 0]], tone: 'adj', dashed: true, labels: ['3'], sides: ['right'] }), polyline(h, { id: 'rise', points: [[-3, 0], [-3, 4]], tone: 'opp', dashed: true, labels: ['4'], sides: ['left'] }), arrow(h, 'v', [0, 0], [-3, 4], 'hyp')], 460),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\langle {-3}, 4 \\rangle: \\text{ quadrant II}', '\\text{Reference angle: } \\tan^{-1}\\left(\\tfrac{4}{3}\\right) \\approx 53.1^\\circ', '\\theta = 180^\\circ - 53.1^\\circ \\approx 126.9^\\circ', '\\langle |v|\\cos\\theta,\\ |v|\\sin\\theta \\rangle'] }],
      lines: [
        { say: 'The direction of a vector is the angle theta it makes with the positive x-axis, measured anticlockwise. Let’s find the direction of negative three, four.', show: ['d.h-grid', 'd.h-axes', 'd.v'], focus: 'd.v' },
        { say: 'First, look where it points. It goes three to the left and four up, into quadrant two.', show: ['d.h-run', 'd.h-rise', 'm.0'], focus: 'm.0' },
        { say: 'The reference angle, between the vector and the x-axis, is the inverse tangent of four over three, about 53.1 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'A calculator’s inverse tangent only gives angles in quadrants one and four, so adjust. In quadrant two, theta is 180 degrees minus 53.1 degrees, about 126.9 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Going the other way, a vector with magnitude v and direction theta has the components v cos theta and v sin theta.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the magnitude of the vector from $A(2, -1)$ to $B(8, 7)$.',
          choices: ['$14$', '$\\sqrt{52}$', '$\\langle 6, 8 \\rangle$', '$10$'],
          answer: 3,
          working: '$\\overrightarrow{AB} = \\langle 8 - 2,\\ 7 - (-1) \\rangle = \\langle 6, 8 \\rangle$, and $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the magnitude of the vector from A, at two, negative one, to B, at eight, seven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The vector is eight minus two, which is six, and seven minus negative one, which is eight. Its magnitude is the square root of 36 plus 64, which is the square root of 100, or ten. Choice C is the vector itself, not its magnitude.', show: 'q.answer' },
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
          items: ['A vector has a magnitude and a direction: $\\langle a, b \\rangle$.', 'The vector from $P$ to $Q$ is $Q$ minus $P$.', 'Its magnitude is $\\sqrt{a^2 + b^2}$.', 'Its direction is the angle from the positive $x$-axis, adjusted for the quadrant.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A vector has a magnitude and a direction, and in component form it is "a", b.', show: 'sum.0' },
        { say: 'The vector from P to Q is Q minus P.', show: 'sum.1' },
        { say: 'Its magnitude is the square root of "a" squared plus b squared.', show: 'sum.2' },
        { say: 'And its direction is the angle from the positive x-axis, adjusted for the quadrant it points into. In the next part, we add vectors and stretch them. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
