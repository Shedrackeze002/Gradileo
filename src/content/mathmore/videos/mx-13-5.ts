import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-13-5',
  lessonId: 'mx-13-5',
  title: 'Kinematics in Two Dimensions',
  thumbnail: 'm',
  summary: 'In two dimensions, position, velocity and acceleration are vectors, worked with component by component. With constant acceleration, v = u + at and r = ut + ½at²: starting at 2i + 3j m/s with acceleration i − 2j m/s², after 4 s the velocity is 6i − 5j and the position is 16i − 4j. Otherwise differentiate r to get v and a, and integrate back with a constant vector.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Kinematics in Two Dimensions', subtitle: 'Motion with vectors' }],
      lines: [
        { say: 'A boat crossing a river, a drone flying across a field, a puck sliding over ice: these move in two dimensions, so their positions and velocities are vectors.', show: 'title' },
        { say: 'Everything we know about straight-line motion still works. We just apply it to the i and j components side by side. In this video, you will see how, with suvat and with calculus.' },
      ],
    },
    {
      chapter: 'Vectors for motion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Position, velocity, acceleration', md: 'The **position vector** $\\mathbf{r} = x\\mathbf{i} + y\\mathbf{j}$ gives the position from an origin $O$. The **velocity** $\\mathbf{v}$ is the rate of change of $\\mathbf{r}$, and the **acceleration** $\\mathbf{a}$ is the rate of change of $\\mathbf{v}$. The **speed** is $|\\mathbf{v}|$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\mathbf{v} = \\mathbf{u} + \\mathbf{a}t \\qquad \\mathbf{r} = \\mathbf{u}t + \\tfrac{1}{2}\\mathbf{a}t^2'] },
      ],
      lines: [
        { say: 'The position vector r gives where a particle is, measured from a fixed origin O, as x i plus y j. Here i and j are unit vectors along the x and y axes.', show: 'def' },
        { say: 'The velocity is the rate of change of position, the acceleration is the rate of change of velocity, and the speed is the magnitude of the velocity.' },
        { say: 'When the acceleration vector is constant, two suvat formulas work with vectors: v equals u plus "a" t, and r equals u t plus a half "a" t squared, with r measured from the start.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Constant acceleration',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A particle starts at $O$ with velocity $(2\\mathbf{i} + 3\\mathbf{j})$ m/s and constant acceleration $(\\mathbf{i} - 2\\mathbf{j})$ m/s². Find its velocity and position after $4$ s.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\mathbf{v} = (2\\mathbf{i} + 3\\mathbf{j}) + 4(\\mathbf{i} - 2\\mathbf{j}) = 6\\mathbf{i} - 5\\mathbf{j}', '|\\mathbf{v}| = \\sqrt{36 + 25} = \\sqrt{61} \\approx 7.81\\text{ m/s}', '\\mathbf{r} = 4(2\\mathbf{i} + 3\\mathbf{j}) + \\tfrac{1}{2}(16)(\\mathbf{i} - 2\\mathbf{j}) = 16\\mathbf{i} - 4\\mathbf{j}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Parallel to i or j', md: 'Moving parallel to $\\mathbf{i}$ means the $\\mathbf{j}$-component of $\\mathbf{v}$ is $0$. Set it to $0$ and solve for $t$.' },
      ],
      lines: [
        { say: 'A particle starts at the origin with velocity two i plus three j metres per second, and has constant acceleration i minus two j. Find its velocity and position after four seconds.', show: 'q' },
        { say: 'v equals u plus "a" t: two i plus three j, plus four lots of i minus two j. Collect the i parts and the j parts: six i minus five j metres per second.', show: 'm.0', focus: 'm.0' },
        { say: 'Its speed is the magnitude, the square root of thirty six plus twenty five, about seven point eight one metres per second.', show: 'm.1', focus: 'm.1' },
        { say: 'r equals u t plus a half "a" t squared: four lots of two i plus three j, plus eight lots of i minus two j. That is sixteen i minus four j metres.', show: 'm.2', focus: 'm.2' },
        { say: 'A common question asks when a particle moves parallel to i. That happens when the j part of the velocity is zero, so set it to zero and solve for t.', show: 'tip' },
      ],
    },
    {
      chapter: 'Using calculus',
      layout: 'split',
      leftWidth: 620,
      left: [
        { kind: 'text', id: 'q', md: '$\\mathbf{r} = (t^3 - 3t)\\mathbf{i} + 2t^2\\mathbf{j}$. Find the speed and acceleration when $t = 2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\mathbf{v} = (3t^2 - 3)\\mathbf{i} + 4t\\mathbf{j}', '= 9\\mathbf{i} + 8\\mathbf{j}', '|\\mathbf{v}| = \\sqrt{145} \\approx 12.0\\text{ m/s}', '\\mathbf{a} = 6t\\mathbf{i} + 4\\mathbf{j} = 12\\mathbf{i} + 4\\mathbf{j}'] },
      ],
      right: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\mathbf{v} = \\tfrac{d\\mathbf{r}}{dt}, \\ \\mathbf{a} = \\tfrac{d\\mathbf{v}}{dt}', '\\mathbf{r} = \\int \\mathbf{v}\\,dt'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Forgetting the constant', md: 'Integrating gives $\\mathbf{r}$ only up to a constant vector: find it from the starting position.' },
      ],
      lines: [
        { say: 'When the acceleration changes, use calculus on each component. Differentiate position to get velocity, and velocity to get acceleration. Integrate to go back.', show: 'f' },
        { say: 'A particle has position t cubed minus three t, i, plus two t squared, j. Find its speed and acceleration when t equals two.', show: 'q' },
        { say: 'Differentiate each part: the velocity is three t squared minus three, i, plus four t, j. At t equals two, that is nine i plus eight j.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So the speed is the square root of one hundred forty five, about twelve point zero metres per second.', show: 'm.2', focus: 'm.2' },
        { say: 'Differentiate again: the acceleration is six t i plus four j, which is twelve i plus four j at t equals two.', show: 'm.3', focus: 'm.3' },
        { say: 'Going the other way, integrating gives a constant vector. Use the starting position to find it.', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle has velocity $\\mathbf{v} = 3t^2\\mathbf{i} + 4\\mathbf{j}$ m/s. Find its acceleration when $t = 2$.',
          choices: ['$12\\mathbf{i} + 4\\mathbf{j}$', '$6\\mathbf{i}$', '$12\\mathbf{i} + \\mathbf{j}$', '$12\\mathbf{i}$'],
          answer: 3,
          working: '$\\mathbf{a} = \\dfrac{d\\mathbf{v}}{dt} = 6t\\mathbf{i}$, since $4\\mathbf{j}$ is constant. At $t = 2$, $\\mathbf{a} = 12\\mathbf{i}$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. A particle has velocity three t squared i, plus four j. Find its acceleration when t equals two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Differentiate each part: three t squared gives six t, and the constant four j gives zero. At t equals two, the acceleration is twelve i. Choice A keeps the four j.', show: 'q.answer' },
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
          items: ['Work with the $\\mathbf{i}$ and $\\mathbf{j}$ components side by side.', 'Constant acceleration: $\\mathbf{v} = \\mathbf{u} + \\mathbf{a}t$, $\\mathbf{r} = \\mathbf{u}t + \\tfrac{1}{2}\\mathbf{a}t^2$.', 'Otherwise differentiate, or integrate with a constant vector.', 'Speed is $|\\mathbf{v}|$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In two dimensions, work with the i and j components side by side.', show: 'sum.0' },
        { say: 'With constant acceleration, use the vector suvat formulas.', show: 'sum.1' },
        { say: 'Otherwise, differentiate to go from position to velocity to acceleration, and integrate, with a constant vector, to go back.', show: 'sum.2' },
        { say: 'And the speed is the magnitude of the velocity. In the next lesson, we look at turning effects: moments. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
