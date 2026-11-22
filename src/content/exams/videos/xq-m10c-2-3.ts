import type { Explainer, TriangleEl } from '@/video/script.ts';

// Exam question for Math 10 lesson 2.3 (solving right triangles): OpenStax Algebra and
// Trigonometry 2e's own worked example (section 7.2, Right Triangle Trigonometry, CC BY-NC-SA 4.0),
// "Find the unknown sides of the triangle", word for word. The book gives the triangle as a figure,
// so the question text describes it with the book's own description of that figure: a right
// triangle with sides a, c and 7, and a 30° angle opposite the side 7. a = 7 ÷ tan 30° ≈ 12.1 and
// c = 7 ÷ sin 30° = 14.

const tri = (labels: TriangleEl['labels']): TriangleEl => ({ kind: 'triangle', id: 'tri', adj: 12.12, opp: 7, labels });
const full = tri({ theta: '30^\\circ', opp: '7', adj: 'a', hyp: 'c' });

const QUESTION =
  'Find the unknown sides of the triangle. (The figure is a right triangle with sides a, c, and 7. An angle of 30 degrees is opposite the side labeled 7.)';

const video: Explainer = {
  id: 'xq-m10c-2-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-2-3',
    source: 'OpenStax, Algebra and Trigonometry 2e, Example in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Unknown Sides. Solving a Right Triangle',
  thumbnailTitle: 'Find the Unknown Sides',
  thumbnail: 'tri',
  summary:
    'A real test question, solved one small step at a time: a right triangle has a 30° angle and the side opposite it is 7, and we find the two unknown sides. We use tangent for the adjacent side and sine for the hypotenuse, then check the answer with the Pythagorean theorem and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Unknown Sides', subtitle: 'Solving a right triangle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding the missing sides of a right triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      left: [full],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** Find the unknown sides of the triangle.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed, with its triangle.', show: ['q', 'tri', 'tri.theta', 'tri.opp', 'tri.adj', 'tri.hyp'] },
        { say: 'Find the unknown sides of the triangle. The triangle has a 30 degree angle, and the side opposite it is 7. The other two sides are \"a\" and \"c\".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [full],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'We know **one angle** and **one side**. We want the other two sides, $a$ and $c$.' }],
      lines: [
        { say: 'We know one angle, 30 degrees, and one side, 7.', show: ['tri', 'tri.theta', 'tri.opp'], focus: 'tri.opp' },
        { say: 'We want the other two sides: a along the bottom, and c, the long slanted side.', show: ['tri.adj', 'tri.hyp', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}} \\quad \\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}} \\quad \\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'To **solve** a triangle, pick a ratio for **each** unknown side: one with the side you know and the side you want.' },
      ],
      lines: [
        { say: 'Here is what we need: SOH CAH TOA. Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent.', show: 'f' },
        { say: 'To solve a triangle, we find each unknown side in turn. For each one, pick the ratio that uses the side we know and the side we want.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the sides from the $30^\\circ$ angle', 'Find $a$ with **tangent**', 'Find $c$ with **sine**', 'Check with the Pythagorean theorem'] }],
      lines: [
        { say: 'Here is the plan. First, name the sides from the 30 degree angle.', show: 'plan.0' },
        { say: 'Second, find a with the tangent.', show: 'plan.1' },
        { say: 'Third, find c with the sine.', show: 'plan.2' },
        { say: 'And last, check with the Pythagorean theorem.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Name the sides',
      layout: 'split',
      left: [full],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{opposite} = 7 \\ (\\text{know})', '\\text{adjacent} = a', '\\text{hypotenuse} = c'] }],
      lines: [
        { say: 'Step one. Stand at the 30 degree angle. The side across from it is 7, so 7 is the opposite side. That is the side we know.', show: ['tri', 'tri.theta', 'tri.opp', 'm.0'], focus: 'tri.opp' },
        { say: 'The side next to the angle, along the bottom, is a. It is the adjacent side.', show: ['tri.adj', 'm.1'], focus: 'tri.adj' },
        { say: 'And the longest side, across from the right angle, is c. It is the hypotenuse.', show: ['tri.hyp', 'm.2'], focus: 'tri.hyp' },
      ],
    },
    {
      chapter: 'Step 2: Find a',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '7 ÷ tan(30)', result: '12.1244' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan 30^\\circ = \\dfrac{7}{a}', 'a \\tan 30^\\circ = 7', 'a = \\dfrac{7}{\\tan 30^\\circ} \\approx \\good{12.1}'] }],
      lines: [
        { say: 'Step two. For a, we know the opposite side and want the adjacent side. Opposite and adjacent means tangent: tan 30 degrees equals 7 over a.', show: 'm.0' },
        { say: 'This time the unknown is on the bottom of the fraction. Multiply both sides by a: a times tan 30 degrees equals 7.', show: 'm.1' },
        { say: 'Then divide both sides by tan 30 degrees. a equals 7 divided by tan 30, which is 12.1244 and so on. So a is about 12.1.', show: ['m.2', 'calc'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Find c',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '7 ÷ sin(30)', result: '14' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sin 30^\\circ = \\dfrac{7}{c}', 'c = \\dfrac{7}{\\sin 30^\\circ}', '= \\dfrac{7}{0.5} = \\good{14}'] }],
      lines: [
        { say: 'Step three. For c, we know the opposite side and want the hypotenuse. Opposite and hypotenuse means sine: sine 30 degrees equals 7 over c.', show: 'm.0' },
        { say: 'In the same way, c equals 7 divided by sine 30 degrees.', show: 'm.1' },
        { say: 'Sine 30 degrees is exactly one half, so c is 7 divided by 0.5, which is exactly 14.', show: ['m.2', 'calc'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [tri({ theta: '30^\\circ', opp: '7', adj: '12.12', hyp: '14' })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['7^2 + 12.12^2 \\approx 49 + 147', '= 196 = 14^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the Pythagorean theorem: the two legs squared add up to the hypotenuse squared. 7 squared is 49, and 12.12 squared is about 147.', show: ['tri', 'tri.theta', 'tri.opp', 'tri.adj', 'tri.hyp', 'm.0'] },
        { say: '49 plus 147 is 196, and 14 squared is 196. It matches, so both sides are right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Multiplying: $a = 7\\tan 30^\\circ$', '$4.0$: but $a$ is next to the small angle, so it must be longer than $7$'],
            ['Multiplying: $c = 7\\sin 30^\\circ$', '$3.5$: a hypotenuse **shorter** than a leg'],
            ['Calculator in **radians**', '$a = -1.1$: a negative length'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps. They come from the unknown being on the bottom of the fraction.', show: 'traps' },
        { say: 'If you multiply 7 by tan 30 instead of dividing, you get about 4. But the side next to the small 30 degree angle is the long leg, so a must be more than 7.' },
        { say: 'Multiplying 7 by sine 30 gives 3.5 for the hypotenuse. That is shorter than the leg of 7, which is impossible.' },
        { say: 'And in radian mode, 7 divided by tan 30 gives minus 1.1. A length cannot be negative, so switch to degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A right triangle has an angle of 40°. The side adjacent to it is 10 cm. Find the hypotenuse, to the nearest tenth of a centimetre.',
          choices: ['7.7 cm', '15.6 cm', '13.1 cm', '8.4 cm'],
          answer: 2,
          working: 'Adjacent and hypotenuse: $\\cos 40^\\circ = \\dfrac{10}{c}$, so $c = \\dfrac{10}{\\cos 40^\\circ} \\approx 13.1$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has an angle of 40 degrees. The side adjacent to it is 10 centimetres. Find the hypotenuse, to the nearest tenth of a centimetre. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Adjacent and hypotenuse means cosine. The hypotenuse is on the bottom, so c equals 10 divided by cosine 40 degrees, about 13.1 centimetres. That is choice C. 7.7 multiplied instead of dividing, 15.6 used sine, and 8.4 used tangent.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pick a ratio for **each** unknown side', 'Unknown on the **bottom**: divide, $a = \\dfrac{7}{\\tan 30^\\circ}$', 'The hypotenuse is the **longest** side', 'Check with $a^2 + b^2 = c^2$'] }],
      lines: [
        { say: 'Here is what to remember. To solve a triangle, pick a ratio for each unknown side.', show: 'sum.0' },
        { say: 'When the unknown side is on the bottom of the fraction, you divide by the ratio.', show: 'sum.1' },
        { say: 'The hypotenuse is always the longest side.', show: 'sum.2' },
        { say: 'And check your sides with the Pythagorean theorem. For more on solving right triangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
