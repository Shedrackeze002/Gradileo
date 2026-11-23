import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 8.2 (the sine and cosine ratios). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 10.8, Right Triangle
// Trigonometry, CC BY-NC-SA 4.0). The string is the hypotenuse and the height is opposite the 50°
// angle, so y = 60 sin 50° ≈ 45.96 ≈ 46 ft, as in the book's answer. Check: 60 cos 50° ≈ 38.57
// along the ground, and 38.57² + 45.96² ≈ 3,600 = 60².

const R = (50 * Math.PI) / 180;
const KX = 60 * Math.cos(R);
const KY = 60 * Math.sin(R);

/** The kite on its string, the ground below it and the height, to scale. */
const scene = (height = 420): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { A: [0, 0], K: [KX, KY], F: [KX, 0], K1: [KX, KY + 4], K2: [KX + 2.6, KY], K3: [KX, KY - 5], K4: [KX - 2.6, KY] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'A' },
    { kind: 'region', id: 'kite', points: ['K1', 'K2', 'K3', 'K4'], tone: 'opp', shade: 0.7, group: 'kite' },
    { kind: 'line', id: 'string', from: 'A', to: 'K', tone: 'hyp', weight: 3, label: '60 \\text{ ft}', labelSide: 'left', group: 'kite' },
    { kind: 'angle', id: 'a', at: 'A', from: 'F', to: 'K', tone: 'theta', label: '50^\\circ', r: 60, labelDist: 100, group: 'kite' },
    { kind: 'line', id: 'y', from: 'F', to: 'K', tone: 'opp', weight: 5, dashed: true, label: 'y', labelSide: 'left', group: 'height' },
    { kind: 'line', id: 'base', from: 'A', to: 'F', tone: 'muted', group: 'height' },
    { kind: 'right', id: 'rt', at: 'F', from: 'A', to: 'K', group: 'height' },
  ],
});

const QUESTION = 'You are flying a kite on a 60-foot string. The angle of elevation from the ground to the kite is 50°. How high above the ground is the kite?';

const video: Explainer = {
  id: 'xq-m103-8-2',
  lessonId: '',
  exam: {
    lesson: 'm103-8-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.8, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-8-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How High Is the Kite? (The Sine and Cosine Ratios)',
  thumbnailTitle: 'How High Is the Kite?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: you fly a kite on a 60-foot string, and the angle of elevation from the ground to the kite is 50°. How high above the ground is the kite? The string is the hypotenuse and the height is opposite the 50° angle, so we use the sine: sin 50° = y/60, and y = 60 sin 50° ≈ 46 feet. Then we check with the Pythagorean theorem and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How High Is the Kite?', subtitle: 'The sine and cosine ratios, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sine and cosine ratios. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'You are flying a kite on a $60$-foot string. The angle of elevation from the ground to the kite is $50^\\circ$. How high above the ground is the kite?',
          answer: 'about $46$ ft',
          working: '$y = 60 \\sin 50^\\circ$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You are flying a kite on a 60-foot string. The angle of elevation from the ground to the kite is 50 degrees. How high above the ground is the kite?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'From the $50^\\circ$ angle: the height $y$ is **opposite**, and the string is the **hypotenuse**.' }],
      lines: [
        { say: 'Here is the kite on its 60-foot string. The string rises from the ground at 50 degrees. That is the angle of elevation.', show: ['pic.ground', 'pic.kite'] },
        { say: 'The height of the kite, y, goes straight down to the ground, making a right angle.', show: 'pic.height' },
        { say: 'From the 50 degree angle, the height is across from it, the opposite side. The string is opposite the right angle, so it is the hypotenuse.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\sin \\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos \\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Pick the ratio', md: 'We know the **hypotenuse** and want the **opposite**, so we use **sine**.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine of an angle is the opposite over the hypotenuse. The cosine is the adjacent over the hypotenuse.', show: 'f' },
        { say: 'We know the hypotenuse and we want the opposite side, so we use sine.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **sine** equation', '**Multiply** both sides by $60$', 'Use a **calculator** (degrees) and round'] }],
      lines: [
        { say: 'Here is the plan. Write the sine equation.', show: 'plan.0' },
        { say: 'Multiply both sides by 60.', show: 'plan.1' },
        { say: 'Then use a calculator in degree mode, and round.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin 50^\\circ = \\dfrac{y}{60}'] }],
      lines: [
        { say: 'Step one. The sine of 50 degrees is the opposite, y, over the hypotenuse, 60.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 60 \\sin 50^\\circ'] }],
      lines: [
        { say: 'Step two. Multiply both sides by 60. y equals 60 times the sine of 50 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Calculate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y \\approx 60 \\times 0.7660 \\approx 45.96', 'y \\approx \\good{46 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The sine of 50 degrees is about 0.7660. 60 times that is about 45.96.', show: 'm.0' },
        { say: 'So the kite is about 46 feet above the ground.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{along the ground: } 60 \\cos 50^\\circ \\approx 38.57', '38.57^2 + 45.96^2 \\approx 3{,}600 = 60^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the Pythagorean theorem. The distance along the ground is the adjacent side, 60 times the cosine of 50 degrees, which is about 38.57 feet.', show: 'm.0' },
        { say: '38.57 squared plus 45.96 squared is about 3,600, which is 60 squared. The three sides fit. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$60 \\cos 50^\\circ \\approx 38.6$', 'that is the distance **along the ground**'],
            ['$60 \\tan 50^\\circ \\approx 71.5$', 'the string is the **hypotenuse**, not adjacent'],
            ['$60 \\div \\sin 50^\\circ \\approx 78.3$', 'longer than the string: **multiply** instead'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Cosine gives the adjacent side, the distance along the ground, not the height.' },
        { say: 'Tangent uses the adjacent side, but the 60-foot string is the hypotenuse.' },
        { say: 'And dividing by the sine gives 78.3 feet, higher than the string is long. That cannot be right. Multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $15$ ft ladder leans against a wall, making an angle of $70^\\circ$ with the ground. How high up the wall does it reach, to the nearest tenth?',
          choices: ['$5.1$ ft', '$14.1$ ft', '$41.2$ ft', '$16.0$ ft'],
          answer: 1,
          working: '$h = 15 \\sin 70^\\circ \\approx 15 \\times 0.9397 \\approx 14.1$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A 15-foot ladder leans against a wall, making an angle of 70 degrees with the ground. How high up the wall does it reach, to the nearest tenth? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The ladder is the hypotenuse, and the height is opposite the angle. So the height is 15 times the sine of 70 degrees, which is about 14.1 feet. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sin \\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\cos \\theta = \\dfrac{\\text{adj}}{\\text{hyp}}$', 'A string, ladder or ramp is usually the **hypotenuse**', 'Height opposite the angle: use **sine**', 'A leg is always **shorter** than the hypotenuse'] }],
      lines: [
        { say: 'Here is what to remember. Sine is opposite over hypotenuse, and cosine is adjacent over hypotenuse.', show: 'sum.0' },
        { say: 'A string, a ladder or a ramp is usually the hypotenuse.', show: 'sum.1' },
        { say: 'For a height opposite the angle, use sine.', show: 'sum.2' },
        { say: 'And a leg is always shorter than the hypotenuse, which is a quick check. For more on the sine and cosine ratios, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
