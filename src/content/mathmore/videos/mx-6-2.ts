import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 3], y: [-1, 3], titles: { x: '\\text{Re}', y: '\\text{Im}' } });

const video: Explainer = {
  id: 'mx-6-2',
  lessonId: 'mx-6-2',
  title: 'Complex Numbers in Polar Form',
  thumbnail: 'gr',
  summary: 'In the complex plane, a + bi is the point (a, b). Its modulus is r = √(a² + b²) and its argument θ its angle from the positive real axis, so z = r(cos θ + i sin θ): −1 + i = √2(cos 135° + i sin 135°). To multiply, multiply the moduli and add the arguments; to divide, divide and subtract.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polar Form, Conics and Parametric Equations', title: 'Complex Numbers in Polar Form', subtitle: 'Lengths and angles' }],
      lines: [
        { say: 'A complex number "a" plus b i can be drawn as the point "a", b.', show: 'title' },
        { say: 'Describing that point by its distance and angle from the origin gives the polar form of the number. In this video, you will learn to write it, and see that multiplying complex numbers becomes as simple as multiplying lengths and adding angles.' },
      ],
    },
    {
      chapter: 'The complex plane',
      layout: 'split',
      leftWidth: 640,
      left: [figure('gr', [g, polyline(g, { id: 'r', points: [[0, 0], [-1, 1]], tone: 'hyp', labels: ['\\sqrt{2}'], sides: ['right'] }), dots(g, [{ id: 'z', x: -1, y: 1, tex: '-1 + i', place: 'above left' }]), { points: { o: g.map(0, 0), ax: g.map(1, 0), pt: g.map(-1, 1) }, items: [{ kind: 'angle', id: 'th', at: 'o', from: 'ax', to: 'pt', tone: 'theta', label: '135^\\circ', r: 50 }] }], 460)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The complex plane', md: '$a + bi$ is the point $(a, b)$. The horizontal axis is the **real axis**, the vertical axis the **imaginary axis**.' },
        { kind: 'callout', id: 'mod', tone: 'definition', title: 'Modulus and argument', md: 'The **modulus** is $r = |z| = \\sqrt{a^2 + b^2}$. The **argument** $\\theta$ is the angle from the positive real axis.' },
      ],
      lines: [
        { say: 'In the complex plane, the number "a" plus b i is the point at "a", b. The horizontal axis is the real axis, and the vertical axis is the imaginary axis.', show: ['def', 'gr.grid', 'gr.axes'] },
        { say: 'For example, negative one plus i is the point that is one to the left and one up.', show: 'gr.z', focus: 'gr.z' },
        { say: 'Its distance from zero is called its modulus, r. Here it is the square root of one plus one, which is root two.', show: ['mod', 'gr.r'], focus: 'gr.r' },
        { say: 'Its angle from the positive real axis is called its argument, theta. The point is in quadrant two, with a reference angle of 45 degrees, so the argument is 135 degrees.', show: 'gr.th', focus: 'gr.th' },
      ],
    },
    {
      chapter: 'Polar form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['a = r\\cos\\theta, \\quad b = r\\sin\\theta', 'z = r(\\cos\\theta + i\\sin\\theta)', '-1 + i = \\sqrt{2}(\\cos 135^\\circ + i\\sin 135^\\circ)'] },
      ],
      lines: [
        { say: 'Just as with polar coordinates, "a" is r cos theta, and b is r sin theta.', show: 'm.0', focus: 'm.0' },
        { say: 'So z equals "a" plus b i equals r times, cos theta plus i sin theta. This is called the polar form, or the trigonometric form, of z.', show: 'm.1', focus: 'm.1' },
        { say: 'For negative one plus i, r is root two and theta is 135 degrees. So it is root two, times cos 135 degrees plus i sin 135 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Multiplying and dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['zw = \\opp{r_1 r_2}\\big(\\cos(\\adj{\\theta_1 + \\theta_2}) + i\\sin(\\adj{\\theta_1 + \\theta_2})\\big)', '\\dfrac{z}{w} = \\opp{\\dfrac{r_1}{r_2}}\\big(\\cos(\\adj{\\theta_1 - \\theta_2}) + i\\sin(\\adj{\\theta_1 - \\theta_2})\\big)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'In words', md: 'To multiply, **multiply the moduli** and **add the arguments**. To divide, **divide the moduli** and **subtract the arguments**.' },
      ],
      lines: [
        { say: 'Polar form makes multiplying easy. To multiply two complex numbers, multiply their moduli, and add their arguments.', show: ['f.0', 'key'], focus: 'f.0' },
        { say: 'To divide, divide the moduli, and subtract the arguments.', show: 'f.1', focus: 'f.1' },
        { say: 'So multiplying by a complex number stretches by its modulus and turns by its argument.' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['z = 3(\\cos 40^\\circ + i\\sin 40^\\circ) \\qquad w = 2(\\cos 110^\\circ + i\\sin 110^\\circ)', 'zw = (3 \\times 2)\\big(\\cos(40^\\circ + 110^\\circ) + i\\sin(40^\\circ + 110^\\circ)\\big)', '= 6(\\cos 150^\\circ + i\\sin 150^\\circ)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the arguments', md: 'The arguments are **added**, not multiplied, the same law as $10^{m} \\times 10^{n} = 10^{m+n}$.' },
      ],
      lines: [
        { say: 'Let z be three times, cos forty degrees plus i sin forty degrees, and w be two times, cos 110 degrees plus i sin 110 degrees. Find z w.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the moduli: three times two is six. Add the arguments: forty plus 110 is 150 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'So z w is six times, cos 150 degrees plus i sin 150 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember, the arguments are added, not multiplied. It is the same law as for powers of ten.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $z = 8(\\cos 100^\\circ + i\\sin 100^\\circ)$ and $w = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$. Find $\\dfrac{z}{w}$.',
          choices: ['$4(\\cos 70^\\circ + i\\sin 70^\\circ)$', '$16(\\cos 130^\\circ + i\\sin 130^\\circ)$', '$6(\\cos 70^\\circ + i\\sin 70^\\circ)$', '$4(\\cos 130^\\circ + i\\sin 130^\\circ)$'],
          answer: 0,
          working: 'Divide the moduli, $8 \\div 2 = 4$, and subtract the arguments, $100^\\circ - 30^\\circ = 70^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let z be eight times, cos 100 degrees plus i sin 100 degrees, and w be two times, cos thirty degrees plus i sin thirty degrees. Find z divided by w. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide the moduli: eight divided by two is four. Subtract the arguments: 100 minus thirty is seventy degrees. So z over w is four times, cos seventy degrees plus i sin seventy degrees.', show: 'q.answer' },
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
          items: ['$a + bi$ is the point $(a, b)$ in the complex plane.', 'Modulus $r = \\sqrt{a^2 + b^2}$; argument $\\theta$, the angle from the positive real axis.', 'Polar form: $z = r(\\cos\\theta + i\\sin\\theta)$.', 'Multiply: multiply moduli, add arguments. Divide: divide, subtract.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The complex number "a" plus b i is the point at "a", b in the complex plane.', show: 'sum.0' },
        { say: 'Its modulus is its distance from zero, and its argument is its angle from the positive real axis.', show: 'sum.1' },
        { say: 'Its polar form is r times, cos theta plus i sin theta.', show: 'sum.2' },
        { say: 'And to multiply, multiply the moduli and add the arguments; to divide, divide the moduli and subtract the arguments. In the next lesson, we meet the conic sections. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
