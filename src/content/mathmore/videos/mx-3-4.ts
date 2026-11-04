import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-2, 9], y: [-4, 8], every: 2 });

/** The circle with centre (3, 2) and radius 5, on the plane. */
const circle: Part = (() => {
  const points: Record<string, [number, number]> = {};
  const keys = Array.from({ length: 72 }, (_, j) => {
    const a = (j * Math.PI) / 36;
    points[`c${j}`] = g.map(3 + 5 * Math.cos(a), 2 + 5 * Math.sin(a));
    return `c${j}`;
  });
  return { points, items: [{ kind: 'curve', id: 'circle', points: keys, closed: true, tone: 'brand', weight: 4 }] };
})();

const video: Explainer = {
  id: 'mx-3-4',
  lessonId: 'mx-3-4',
  title: 'The Equation of a Circle',
  thumbnail: 'gr',
  summary: 'The circle with centre (h, k) and radius r is (x − h)² + (y − k)² = r², from the Pythagorean theorem. (x + 4)² + (y − 1)² = 49 has centre (−4, 1) and radius 7; the circle with centre (3, 2) through (6, 6) is (x − 3)² + (y − 2)² = 25; and completing the square turns x² + y² − 6x + 4y − 12 = 0 into (x − 3)² + (y + 2)² = 25.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry', title: 'The Equation of a Circle', subtitle: 'Every point the same distance from the centre' }],
      lines: [
        { say: 'A circle is every point at the same distance from its centre.', show: 'title' },
        { say: 'On a coordinate grid, that distance can be written with the Pythagorean theorem. In this video, you will learn the equation that every point of a circle satisfies, and how to read the centre and radius from it.' },
      ],
    },
    {
      chapter: 'Where the equation comes from',
      layout: 'split',
      leftWidth: 660,
      left: [
        figure('gr', [g, circle, polyline(g, { id: 'run', points: [[3, 2], [6, 2]], tone: 'adj', dashed: true, labels: ['x - h'], sides: ['right'] }), polyline(g, { id: 'rise', points: [[6, 2], [6, 6]], tone: 'opp', dashed: true, labels: ['y - k'], sides: ['right'] }), polyline(g, { id: 'r', points: [[3, 2], [6, 6]], tone: 'hyp', labels: ['r'], sides: ['left'] }), dots(g, [{ id: 'C', x: 3, y: 2, tex: '(h, k)', place: 'below left' }, { id: 'P', x: 6, y: 6, tex: '(x, y)', place: 'above right' }])], 640),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\adj{x - h})^2 + (\\opp{y - k})^2 = \\hyp{r}^2'] },
        { kind: 'text', id: 'o', md: 'Centred at the origin: $x^2 + y^2 = r^2$' },
      ],
      lines: [
        { say: 'Take a circle with centre h, k and radius r.', show: ['gr.grid', 'gr.axes', 'gr.circle', 'gr.C'] },
        { say: 'A point x, y is on the circle when its distance from the centre is r.', show: ['gr.P', 'gr.r'], focus: 'gr.r' },
        { say: 'The horizontal distance from the centre is x minus h, and the vertical distance is y minus k. Together with the radius, they make a right triangle.', show: ['gr.run', 'gr.rise'], focus: ['gr.run', 'gr.rise'] },
        { say: 'By the Pythagorean theorem, x minus h, squared, plus y minus k, squared, equals r squared. That is the equation of the circle.', show: 'm.0', focus: 'm.0' },
        { say: 'For a circle centred at the origin, h and k are zero, so the equation is just x squared plus y squared equals r squared.', show: 'o' },
      ],
    },
    {
      chapter: 'Centre and radius',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x + 4)^2 + (y - 1)^2 = 49', '(x - ({-4}))^2 + (y - 1)^2 = 7^2', '\\text{Centre } ({-4},\\ 1), \\quad \\text{radius } 7'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The signs in the brackets', md: 'The equation has **minus** signs: $(x - h)^2$. So $(x + 4)^2$ means $h = -4$, and $(x - 2)^2 + (y + 5)^2 = 9$ has centre $(2, -5)$.' },
      ],
      lines: [
        { say: 'Find the centre and radius of x plus four, squared, plus y minus one, squared, equals 49.', show: 'm.0', focus: 'm.0' },
        { say: 'The equation has minus signs inside the brackets. So write x plus four as x minus negative four. That means h is negative four. And k is one.', show: 'm.1', focus: 'm.1' },
        { say: 'r squared is 49, so the radius is seven. The centre is the point at negative four, one, and the radius is seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Watch the signs. A plus in the bracket means a negative coordinate. The circle x minus two, squared, plus y plus five, squared, equals nine has its centre at two, negative five.', show: 'oops' },
      ],
    },
    {
      chapter: 'From the centre and a point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Centre } (3, 2), \\text{ through } (6, 6)', 'r^2 = (6 - 3)^2 + (6 - 2)^2 = 9 + 16 = 25', '(x - 3)^2 + (y - 2)^2 = 25'] },
      ],
      lines: [
        { say: 'A circle has its centre at three, two, and passes through the point at six, six. Write its equation.', show: 'm.0', focus: 'm.0' },
        { say: 'The radius is the distance from the centre to the point. Across, it is six minus three, which is three. Up, it is six minus two, which is four. So r squared is nine plus sixteen, which is 25, and the radius is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Put the centre and r squared into the equation: x minus three, squared, plus y minus two, squared, equals 25. This is the circle we drew at the start.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Completing the square',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 + y^2 - 6x + 4y - 12 = 0', '(x^2 - 6x) + (y^2 + 4y) = 12', '(x^2 - 6x + \\opp{9}) + (y^2 + 4y + \\adj{4}) = 12 + \\opp{9} + \\adj{4}', '(x - 3)^2 + (y + 2)^2 = 25', '\\text{Centre } (3, {-2}), \\quad \\text{radius } 5'] },
      ],
      lines: [
        { say: 'Expanding the brackets gives the general form of the equation, which hides the centre and radius. To find them, complete the square, for x and for y. Let’s try x squared plus y squared, minus six x, plus four y, minus twelve, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Group the x terms and the y terms, and move the constant to the right side.', show: 'm.1', focus: 'm.1' },
        { say: 'Half of negative six is negative three, and negative three squared is nine. Half of four is two, and two squared is four. Add nine and four to both sides.', show: 'm.2', focus: 'm.2' },
        { say: 'Each bracket is now a perfect square: x minus three, squared, plus y plus two, squared, equals 25.', show: 'm.3', focus: 'm.3' },
        { say: 'So the centre is at three, negative two, and the radius is five. If the equation starts with two x squared plus two y squared, divide every term by two first.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the centre and radius of $(x - 5)^2 + (y + 3)^2 = 16$.',
          choices: ['Centre $(-5, 3)$, radius $4$', 'Centre $(5, -3)$, radius $16$', 'Centre $(5, -3)$, radius $4$', 'Centre $(5, 3)$, radius $4$'],
          answer: 2,
          working: '$x - 5$ gives $h = 5$, and $y + 3 = y - (-3)$ gives $k = -3$. $r^2 = 16$, so $r = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the centre and radius of x minus five, squared, plus y plus three, squared, equals sixteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. x minus five gives h equals five, and y plus three is y minus negative three, so k is negative three. r squared is sixteen, so the radius is four. Choice B forgets to take the square root.', show: 'q.answer' },
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
          items: ['Centre $(h, k)$, radius $r$: $(x - h)^2 + (y - k)^2 = r^2$.', 'Watch the signs: $(x + 4)^2$ means $h = -4$.', 'From the centre and a point: $r^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$.', 'From general form, complete the square in $x$ and in $y$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The circle with centre h, k and radius r is x minus h, squared, plus y minus k, squared, equals r squared. It comes from the Pythagorean theorem.', show: 'sum.0' },
        { say: 'Watch the signs: x plus four, squared, means the centre’s x-coordinate is negative four.', show: 'sum.1' },
        { say: 'To find the radius from the centre and a point, use the Pythagorean theorem on the distances across and up.', show: 'sum.2' },
        { say: 'And from general form, complete the square in x and in y. In the next lesson, we meet a new kind of number, the imaginary unit. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
