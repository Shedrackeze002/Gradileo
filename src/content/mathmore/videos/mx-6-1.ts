import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-1, 5], y: [-1, 5] });

const video: Explainer = {
  id: 'mx-6-1',
  lessonId: 'mx-6-1',
  title: 'Polar Coordinates',
  thumbnail: 'gr',
  summary: 'Polar coordinates (r, θ) give a point’s distance from the origin and its angle from the positive x-axis. x = r cos θ and y = r sin θ turn (6, 150°) into about (−5.2, 3); r = √(x² + y²) and tan θ = y/x, adjusted to the quadrant, turn (−2, −5) into about (5.4, 248.2°).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polar Form, Conics and Parametric Equations', title: 'Polar Coordinates', subtitle: 'A distance and an angle' }],
      lines: [
        { say: 'A ship’s radar does not say three kilometres east and four kilometres north. It says five kilometres away, on this bearing.', show: 'title' },
        { say: 'Describing a point by its distance and angle from a fixed point gives polar coordinates, which suit anything that turns or spreads out from a centre. In this video, you will learn to convert between polar and rectangular coordinates.' },
      ],
    },
    {
      chapter: 'Polar coordinates',
      layout: 'split',
      leftWidth: 620,
      left: [figure('gr', [g, polyline(g, { id: 'r', points: [[0, 0], [3, 4]], tone: 'hyp', labels: ['r = 5'], sides: ['left'] }), polyline(g, { id: 'drop', points: [[3, 0], [3, 4]], tone: 'muted', dashed: true }), dots(g, [{ id: 'P', x: 3, y: 4, tex: '(3, 4)', place: 'right' }]), { points: { o: g.map(0, 0), ax: g.map(3, 0), pt: g.map(3, 4) }, items: [{ kind: 'angle', id: 'th', at: 'o', from: 'ax', to: 'pt', tone: 'theta', label: '53.1^\\circ', r: 60 }] }], 560)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polar coordinates', md: '$(r, \\theta)$: the distance $r$ from the origin (the **pole**), and the angle $\\theta$ from the positive $x$-axis (the **polar axis**), measured anticlockwise.' },
      ],
      lines: [
        { say: 'The polar coordinates r, theta of a point give its distance r from the origin, which is called the pole, and the angle theta from the positive x-axis, measured anticlockwise.', show: 'def' },
        { say: 'Take the point at three, four, in ordinary rectangular coordinates.', show: ['gr.grid', 'gr.axes', 'gr.P'] },
        { say: 'Its distance from the origin is the square root of nine plus sixteen, which is five.', show: ['gr.r', 'gr.drop'], focus: 'gr.r' },
        { say: 'And the angle from the positive x-axis is about 53.1 degrees. So in polar coordinates, the same point is five, 53.1 degrees.', show: 'gr.th', focus: 'gr.th' },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Polar to rectangular: } x = r\\cos\\theta, \\quad y = r\\sin\\theta', '\\text{Rectangular to polar: } r = \\sqrt{x^2 + y^2}, \\quad \\tan\\theta = \\dfrac{y}{x}'] },
        { kind: 'text', id: 't', md: 'Choose $\\theta$ in the **quadrant of the point**.', align: 'center' },
      ],
      lines: [
        { say: 'To go from polar to rectangular, use the right triangle: x is r cos theta, and y is r sin theta.', show: 'm.0', focus: 'm.0' },
        { say: 'To go from rectangular to polar, r is the square root of x squared plus y squared, and tan theta is y over x.', show: 'm.1', focus: 'm.1' },
        { say: 'But be careful to choose theta in the quadrant where the point is.', show: 't' },
      ],
    },
    {
      chapter: 'Polar to rectangular',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(6, 150^\\circ)', 'x = 6\\cos 150^\\circ = 6 \\times \\left({-\\dfrac{\\sqrt{3}}{2}}\\right) \\approx -5.2', 'y = 6\\sin 150^\\circ = 6 \\times \\dfrac{1}{2} = 3', '\\approx ({-5.2},\\ 3)'] },
      ],
      lines: [
        { say: 'Convert six, 150 degrees to rectangular coordinates.', show: 'm.0', focus: 'm.0' },
        { say: 'x is six cos 150 degrees. Cos 150 degrees is negative root three over two, so x is about negative 5.2.', show: 'm.1', focus: 'm.1' },
        { say: 'y is six sin 150 degrees. Sin 150 degrees is one half, so y is three.', show: 'm.2', focus: 'm.2' },
        { say: 'So the point is about negative 5.2, three. That makes sense: 150 degrees points up and to the left, into quadrant two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Rectangular to polar',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['({-2},\\ {-5}) \\qquad r = \\sqrt{4 + 25} = \\sqrt{29} \\approx 5.4', '\\text{Reference angle: } \\tan^{-1}\\left(\\dfrac{5}{2}\\right) \\approx 68.2^\\circ', '\\text{Quadrant III: } \\theta \\approx 180^\\circ + 68.2^\\circ = 248.2^\\circ', '\\approx (5.4,\\ 248.2^\\circ)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking the calculator’s angle as it is', md: '$\\tan^{-1}\\left(\\dfrac{-5}{-2}\\right) \\approx 68.2^\\circ$ points into quadrant I. The point is in quadrant III, so add $180^\\circ$.' },
      ],
      lines: [
        { say: 'Now convert negative two, negative five to polar coordinates, with theta from zero to 360 degrees. First, r is the square root of four plus 25, which is root 29, about 5.4.', show: 'm.0', focus: 'm.0' },
        { say: 'The point is in quadrant three, down and to the left. The reference angle is the inverse tangent of five over two, about 68.2 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'In quadrant three, theta is 180 degrees plus the reference angle, about 248.2 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'So the point is about 5.4, 248.2 degrees. If you take the calculator’s 68.2 degrees as it is, you get a point in quadrant one, on the wrong side of the origin.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Many names for one point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Many names for one point', md: '$(5, 30^\\circ)$, $(5, 390^\\circ)$ and $(5, -330^\\circ)$ are the **same point**. That is why questions often ask for $0^\\circ \\le \\theta < 360^\\circ$.' },
      ],
      lines: [
        { say: 'One more thing. In polar coordinates, one point has many names. Five, thirty degrees, five, 390 degrees, and five, negative 330 degrees are all the same point, because a full turn of 360 degrees brings you back to where you started.', show: 'tip' },
        { say: 'That is why questions often ask for theta from zero up to 360 degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Convert $(4, 90^\\circ)$ to rectangular coordinates.',
          choices: ['$(4, 0)$', '$(0, 4)$', '$(4, 90)$', '$(0, -4)$'],
          answer: 1,
          working: '$x = 4\\cos 90^\\circ = 0$ and $y = 4\\sin 90^\\circ = 4$, so the point is $(0, 4)$, straight up from the origin.',
        },
      ],
      lines: [
        { say: 'Your turn. Convert four, ninety degrees to rectangular coordinates. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x is four cos ninety degrees, which is zero, and y is four sin ninety degrees, which is four. So the point is zero, four: four units straight up from the origin.', show: 'q.answer' },
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
          items: ['Polar coordinates $(r, \\theta)$: a distance and an angle from the positive $x$-axis.', '$x = r\\cos\\theta$ and $y = r\\sin\\theta$.', '$r = \\sqrt{x^2 + y^2}$ and $\\tan\\theta = \\dfrac{y}{x}$.', 'Adjust $\\theta$ to the point’s quadrant.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Polar coordinates r, theta give a point’s distance from the origin and its angle from the positive x-axis.', show: 'sum.0' },
        { say: 'To get rectangular coordinates, x is r cos theta and y is r sin theta.', show: 'sum.1' },
        { say: 'To get polar coordinates, r is the square root of x squared plus y squared, and tan theta is y over x.', show: 'sum.2' },
        { say: 'And always adjust theta to the quadrant of the point. In the next lesson, we write complex numbers in polar form. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
