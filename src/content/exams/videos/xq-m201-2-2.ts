import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 2.2 (trigonometric ratios of any angle): cos t = 24/25 with t
// in quadrant IV, find sin t. The question is an exercise from OpenStax Algebra and Trigonometry 2e,
// word for word (section 7.3, Unit Circle, CC BY-NC-SA 4.0), whose answer key gives sin t = −7/25.
// A point on the terminal arm has x = 24 and r = 25, so y² = 625 − 576 = 49 and, below the x-axis,
// y = −7.

/** Axes with the terminal arm through (24, −7); `y` labels the vertical leg with its value. */
const arm = (height = 380, y = true): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'label', id: 'q1', at: 'Q1', tex: '\\text{I}', place: 'center', tone: 'muted', group: 'quad' },
    { kind: 'label', id: 'q2', at: 'Q2', tex: '\\text{II}', place: 'center', tone: 'muted', group: 'quad' },
    { kind: 'label', id: 'q3', at: 'Q3', tex: '\\text{III}', place: 'center', tone: 'muted', group: 'quad' },
    { kind: 'label', id: 'q4', at: 'Q4', tex: '\\text{IV}', place: 'center', tone: 'good', group: 'quad' },
    { kind: 'line', id: 'r', from: 'O', to: 'P', tone: 'hyp', weight: 5, label: 'r = 25', labelSide: 'right', group: 'arm' },
    { kind: 'label', id: 'pl', at: 'P', tex: 'P', place: 'right', dot: true, group: 'arm' },
    { kind: 'line', id: 'x', from: 'O', to: 'F', tone: 'adj', weight: 5, label: 'x = 24', labelSide: 'left', group: 'tri' },
    { kind: 'line', id: 'y', from: 'F', to: 'P', tone: 'opp', weight: 5, label: y ? 'y = -7' : 'y', labelSide: 'left', group: 'tri' },
    { kind: 'right', id: 'rt', at: 'F', from: 'O', to: 'P', group: 'tri' },
  ];
  return {
    kind: 'diagram',
    id: 'a',
    height,
    points: {
      O: [0, 0], X0: [-5, 0], X1: [28, 0], Y0: [0, -9], Y1: [0, 5],
      P: [24, -7], F: [24, 0],
      Q1: [20, 3], Q2: [-2.5, 3], Q3: [-2.5, -4.5], Q4: [4, -7],
    },
    items,
  };
};

const QUESTION = 'If cos(t) = 24/25 and t is in the fourth quadrant, find sin(t).';

const video: Explainer = {
  id: 'xq-m201-2-2',
  lessonId: '',
  exam: {
    lesson: 'm201-2-2',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.3, Unit Circle',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle',
    question: QUESTION,
  },
  title: 'Exam Question: Find sin t When cos t = 24/25 in Quadrant IV (Ratios of Any Angle)',
  thumbnailTitle: 'cos t = 24/25: Find sin t',
  thumbnail: 'a',
  summary:
    'A real test question, solved one small step at a time: the cosine of t is 24/25 and t is in the fourth quadrant, so what is the sine of t? We read x and r from the cosine, find y with the Pythagorean theorem, and use the quadrant to choose its sign: sin t = −7/25. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'cos t = 24/25: Find sin t', subtitle: 'Trigonometric ratios of any angle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the trigonometric ratios of any angle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'If $\\cos(t) = \\dfrac{24}{25}$ and $t$ is in the fourth quadrant, find $\\sin(t)$.',
          answer: '$\\sin(t) = -\\dfrac{7}{25}$',
          working: '$y^2 = 25^2 - 24^2 = 49$, and $y < 0$ in quadrant IV, so $y = -7$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If the cosine of t is 24 over 25, and t is in the fourth quadrant, find the sine of t.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We know the **cosine** of $t$ and which **quadrant** its terminal arm is in. We want the **sine** of the same angle.' }],
      lines: [{ say: 'We know the cosine of the angle t, and we know its terminal arm is in quadrant four. From that, we want the sine of the same angle.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pt', tone: 'definition', title: 'A point on the terminal arm', md: 'For a point $P(x, y)$ at distance $r$ from the origin: $r^2 = x^2 + y^2$, $\\ \\sin t = \\dfrac{y}{r}$, $\\ \\cos t = \\dfrac{x}{r}$.' },
        { kind: 'callout', id: 'cast', tone: 'key', title: 'CAST', md: 'In **quadrant IV**, $x$ is positive and $y$ is negative, so only the **cosine** is positive.' },
      ],
      lines: [
        { say: 'Here is what we need. Take a point P, x, y, on the terminal arm, at a distance r from the origin. By the Pythagorean theorem, r squared is x squared plus y squared. The sine is y over r, and the cosine is x over r.', show: 'pt' },
        { say: 'And the CAST rule: in quadrant four, x is positive but y is negative. r is always positive, so only the cosine is positive there. The sine is negative.', show: 'cast' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $x$ and $r$ from the **cosine**', 'Find $y$ with the **Pythagorean theorem**', 'Choose the **sign** of $y$ from the quadrant'] }],
      lines: [
        { say: 'Here is the plan. First, read x and r from the cosine.', show: 'plan.0' },
        { say: 'Second, find y with the Pythagorean theorem.', show: 'plan.1' },
        { say: 'Third, choose the sign of y from the quadrant, and write the sine.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read x and r',
      layout: 'center',
      main: [arm(380, false), { kind: 'math', id: 'm', size: 'md', lines: ['\\cos t = \\dfrac{x}{r} = \\dfrac{24}{25}', 'x = 24, \\quad r = 25'] }],
      lines: [
        { say: 'Step one. The cosine is x over r, and here it is 24 over 25.', show: ['a', 'a.axes', 'a.quad', 'm.0'] },
        { say: 'So we can take a point with x equal to 24, at a distance of 25 from the origin. It sits in quadrant four, below the x axis, so we do not know y yet.', show: ['a.arm', 'a.tri', 'm.1'], focus: 'a.tri' },
      ],
    },
    {
      chapter: 'Step 2: Find y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24^2 + y^2 = 25^2', '576 + y^2 = 625', 'y^2 = 49', 'y = \\pm 7'] }],
      lines: [
        { say: 'Step two. By the Pythagorean theorem, 24 squared plus y squared equals 25 squared.', show: 'm.0' },
        { say: '24 squared is 576, and 25 squared is 625.', show: 'm.1' },
        { say: 'Take 576 away from both sides: y squared is 49.', show: 'm.2' },
        { say: 'So y is 7 or negative 7. Squaring hides the sign, so the quadrant has to tell us which.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Choose the sign',
      layout: 'center',
      main: [arm(380), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{quadrant IV: } y = -7', '\\sin t = \\dfrac{y}{r} = \\good{-\\dfrac{7}{25}}'] }],
      lines: [
        { say: 'Step three. In quadrant four, the point is below the x axis, so y is negative: y is negative 7.', show: ['a', 'a.axes', 'a.quad', 'a.arm', 'a.tri', 'm.0'], focus: 'a.y' },
        { say: 'So the sine of t is y over r: negative 7 over 25. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sin^2 t + \\cos^2 t = \\dfrac{49}{625} + \\dfrac{576}{625} = 1 \\ \\checkmark', '\\text{IV: } \\cos t > 0, \\ \\sin t < 0 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check. For any angle, the sine squared plus the cosine squared is 1. Here, 49 over 625 plus 576 over 625 is 625 over 625, which is 1.', show: 'm.0' },
        { say: 'And the signs agree with CAST: in quadrant four, the cosine is positive and the sine is negative.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$\\sin t = \\dfrac{7}{25}$', 'in quadrant IV, $y$ is **negative**'],
            ['$y = 25 - 24 = 1$', 'take away the **squares**, then take the square root'],
            ['$\\sin t = -\\dfrac{7}{24}$', 'the sine is $\\dfrac{y}{r}$, not $\\dfrac{y}{x}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Positive 7 over 25 has the wrong sign. Below the x axis, y is negative, so the sine is negative.' },
        { say: '25 minus 24 is 1, but the Pythagorean theorem works with squares. Take 576 away from 625, then take the square root.' },
        { say: 'And negative 7 over 24 is the tangent, y over x. The sine divides by r.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'If $\\sin \\theta = \\dfrac{3}{5}$ and $\\theta$ is in quadrant II, what is $\\cos \\theta$?',
          choices: ['$\\dfrac{4}{5}$', '$-\\dfrac{3}{5}$', '$-\\dfrac{4}{5}$', '$-\\dfrac{3}{4}$'],
          answer: 2,
          working: '$y = 3$, $r = 5$, so $x^2 = 25 - 9 = 16$. In quadrant II, $x = -4$, so $\\cos \\theta = -\\dfrac{4}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. If the sine of theta is 3 over 5, and theta is in quadrant two, what is the cosine of theta? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Here y is 3 and r is 5, so x squared is 25 minus 9, which is 16. In quadrant two, x is negative, so x is negative 4, and the cosine is negative 4 over 5, choice C. A has the wrong sign, and D is the tangent.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\cos t = \\dfrac{x}{r}$ and $\\sin t = \\dfrac{y}{r}$', 'Find the missing one with $x^2 + y^2 = r^2$', '$r$ is always **positive**', 'The **quadrant** gives the sign (CAST)'] }],
      lines: [
        { say: 'Here is what to remember. The cosine is x over r, and the sine is y over r.', show: 'sum.0' },
        { say: 'Find the missing value with x squared plus y squared equals r squared.', show: 'sum.1' },
        { say: 'r is a distance, so it is always positive.', show: 'sum.2' },
        { say: 'And the quadrant gives the sign, by the CAST rule. For more on the ratios of any angle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
