import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-27-3',
  lessonId: 'mx-27-3',
  title: 'The Equation of a Tangent to a Circle',
  thumbnail: 'm',
  summary: 'A tangent is perpendicular to the radius at the point of contact, so its gradient is the negative reciprocal of the radius’s gradient. Find the centre (from (x − a)² + (y − b)² = r², or by completing the square), then the gradient of the radius, then the tangent’s gradient, and put the point of contact into y = mx + c. The tangent to x² + y² = 25 at (3, 4) is y = −¾x + 25/4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry Theorems, Vectors and Transformation Matrices', title: 'The Equation of a Tangent to a Circle', subtitle: 'Perpendicular to the radius' }],
      lines: [
        { say: 'A tangent just touches a circle, and where it touches, it stands at right angles to the radius. That one fact is enough to find the tangent’s equation.', show: 'title' },
        { say: 'In this video, you will learn to find the gradient and the equation of a tangent to a circle.' },
      ],
    },
    {
      chapter: 'The gradient of a tangent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tangent to a circle', md: 'A line that touches the circle at one point, the **point of contact**. It is **perpendicular to the radius** there.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m_t = -\\dfrac{1}{m_r}', 'x^2 + y^2 = 25, \\ (3, 4): \\ m_r = \\dfrac{4}{3}, \\ m_t = -\\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'A tangent touches the circle at exactly one point, called the point of contact, and it is perpendicular to the radius drawn to that point.', show: 'def' },
        { say: 'Perpendicular gradients multiply to negative one. So the tangent’s gradient is the negative reciprocal of the radius’s gradient: turn the fraction upside down and change its sign.', show: 'm.0', focus: 'm.0' },
        { say: 'The circle x squared plus y squared equals twenty-five has its centre at the origin. The radius to the point with x equal to three and y equal to four has gradient four over three, so the tangent has gradient negative three over four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the centre',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x - 2)^2 + (y + 3)^2 = 25: \\ \\text{centre } (2, {-3})', 'x^2 + y^2 - 2x - 4y - 20 = 0', '(x - 1)^2 + (y - 2)^2 = 25: \\ \\text{centre } (1, 2)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the centre with the wrong signs', md: 'The centre has the values of $x$ and $y$ that make each bracket zero: $(2, -3)$, not $(-2, 3)$.' },
      ],
      lines: [
        { say: 'A circle written with brackets has its centre at the values that make each bracket zero. Here the centre has x equal to two and y equal to negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'Watch the signs: the centre is not negative two, three.', show: 'oops' },
        { say: 'When the circle is expanded like this, complete the square first.', show: 'm.1', focus: 'm.1' },
        { say: 'That gives x minus one, squared, plus y minus two, squared, equals twenty-five, so the centre has x equal to one and y equal to two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = -\\dfrac{3}{4}, \\ (3, 4)', 'c = 4 - \\left({-\\dfrac{3}{4}}\\right) \\times 3 = \\dfrac{25}{4}', 'y = -\\dfrac{3}{4}x + \\dfrac{25}{4}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the answer', md: '$-\\dfrac{3}{4} \\times 3 + \\dfrac{25}{4} = 4$, so the point of contact is on the line.' },
      ],
      lines: [
        { say: 'The tangent passes through the point of contact, so once we have its gradient, we put that point into y equals m x plus c.', show: 'm.0', focus: 'm.0' },
        { say: 'c is four minus negative three quarters times three, which is twenty-five over four.', show: 'm.1', focus: 'm.1' },
        { say: 'So the tangent is y equals negative three quarters x, plus twenty-five over four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check that the point of contact satisfies the equation: it gives y equal to four, as it should.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the gradient of the tangent to $(x - 1)^2 + (y - 1)^2 = 13$ at $(3, 4)$.',
          choices: ['$\\dfrac{3}{2}$', '$-\\dfrac{3}{2}$', '$\\dfrac{2}{3}$', '$-\\dfrac{2}{3}$'],
          answer: 3,
          working: 'The centre is $(1, 1)$. The radius has gradient $\\dfrac{4 - 1}{3 - 1} = \\dfrac{3}{2}$, so the tangent has gradient $-\\dfrac{2}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the gradient of the tangent to this circle at the point with x equal to three and y equal to four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The centre is at one, one, so the radius has gradient three over two. The negative reciprocal is negative two over three. Choice A is the gradient of the radius.', show: 'q.answer' },
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
          items: ['A tangent is perpendicular to the radius at the point of contact.', 'Find the centre, then the gradient of the radius.', 'The tangent’s gradient is the negative reciprocal.', 'Put the point of contact into $y = mx + c$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tangent is perpendicular to the radius at the point of contact.', show: 'sum.0' },
        { say: 'Find the centre of the circle, then the gradient of the radius.', show: 'sum.1' },
        { say: 'The tangent’s gradient is its negative reciprocal.', show: 'sum.2' },
        { say: 'And put the point of contact into y equals m x plus c to find c. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
