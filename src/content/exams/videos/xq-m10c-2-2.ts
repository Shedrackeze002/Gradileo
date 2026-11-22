import type { Explainer, TriangleEl } from '@/video/script.ts';

// Exam question for Math 10 lesson 2.2 (sine and cosine): a 23-ft ladder leans against a building at
// 80° to the ground; how high does it reach? The question is an exercise from OpenStax Algebra and
// Trigonometry 2e, word for word (section 7.2, Right Triangle Trigonometry, CC BY-NC-SA 4.0), whose
// answer key gives 22.6506 ft. sin 80° = h ÷ 23, so h = 23 sin 80° ≈ 22.65 ft.

const ladder: TriangleEl = { kind: 'triangle', id: 'tri', adj: 4, opp: 22.65, setting: 'ladder', labels: { theta: '80^\\circ', hyp: '23\\text{ ft}', opp: 'h' } };

const QUESTION =
  'A 23-ft ladder leans against a building so that the angle between the ground and the ladder is 80°. How high does the ladder reach up the side of the building?';

const video: Explainer = {
  id: 'xq-m10c-2-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-2-2',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How High Does the Ladder Reach? Sine and Cosine',
  thumbnailTitle: 'How High Does the Ladder Reach?',
  thumbnail: 'tri',
  summary:
    'A real test question, solved one small step at a time: a 23-foot ladder leans against a building at 80° to the ground, and we find how high it reaches. We name the sides from the angle, choose sine with SOH CAH TOA, set up sin 80° = h ÷ 23 and solve for h. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How High Does the Ladder Reach?', subtitle: 'Sine and cosine, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a ladder against a building, with the sine ratio. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about 22.65 ft', working: '$\\sin 80^\\circ = \\dfrac{h}{23}$, so $h = 23\\sin 80^\\circ \\approx 22.65$ ft.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A 23 foot ladder leans against a building so that the angle between the ground and the ladder is 80 degrees. How high does the ladder reach up the side of the building?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [ladder],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The ground, the wall and the ladder make a **right triangle**. We want how high up the wall it reaches, $h$.' }],
      lines: [
        { say: 'Let us picture it. The ladder is 23 feet long, and it leans against the wall at 80 degrees to the ground. That is quite steep.', show: ['tri', 'tri.theta', 'tri.hyp'] },
        { say: 'The ground, the wall and the ladder make a right triangle, because the wall stands straight up. We want how high up the wall the ladder reaches. Call it h.', show: ['tri.opp', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}', '\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}', '\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}'] },
        { kind: 'text', id: 't', size: 'md', md: '**SOH CAH TOA**. The **hypotenuse** is the longest side, across from the right angle.' },
      ],
      lines: [
        { say: 'Here is what we need. There are three ratios. Sine is opposite over hypotenuse.', show: 'f.0' },
        { say: 'Cosine is adjacent over hypotenuse.', show: 'f.1' },
        { say: 'And tangent is opposite over adjacent.', show: 'f.2' },
        { say: 'People remember them as SOH CAH TOA. The hypotenuse is the longest side, across from the right angle.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the sides from the $80^\\circ$ angle', 'Choose the ratio that uses the side we **have** and the side we **want**', 'Solve for $h$'] }],
      lines: [
        { say: 'Here is the plan. First, name the sides from the 80 degree angle.', show: 'plan.0' },
        { say: 'Second, choose the ratio that uses the side we have and the side we want.', show: 'plan.1' },
        { say: 'Third, solve for h.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Name the sides',
      layout: 'split',
      left: [ladder],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{hypotenuse} = 23 \\ (\\text{have})', '\\text{opposite} = h \\ (\\text{want})', '\\text{O and H: } \\textbf{SOH} \\to \\sin'] }],
      lines: [
        { say: 'Step one. The ladder is the longest side, across from the right angle at the foot of the wall. So the ladder, 23 feet, is the hypotenuse. That is the side we have.', show: ['tri', 'tri.theta', 'tri.hyp', 'm.0'], focus: 'tri.hyp' },
        { say: 'Stand at the 80 degree angle, on the ground. The wall is across from it, so the height h is the opposite side. That is the side we want.', show: ['tri.opp', 'm.1'], focus: 'tri.opp' },
        { say: 'Opposite and hypotenuse: that is S O H, so we use sine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Set up and solve',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '23 × sin(80)', result: '22.6506' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sin 80^\\circ = \\dfrac{h}{23}', 'h = 23 \\sin 80^\\circ', '\\approx \\good{22.65\\text{ ft}}'] }],
      lines: [
        { say: 'Step two. Sine of 80 degrees equals h over 23.', show: 'm.0' },
        { say: 'Multiply both sides by 23 to get h on its own: h equals 23 times sine 80 degrees.', show: 'm.1' },
        { say: 'On a calculator in degree mode, 23 times sine 80 is 22.6506 and so on. The ladder reaches about 22.65 feet up the wall.', show: ['calc', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['22.65 < 23 \\ \\checkmark', '80^\\circ \\text{ is steep, so } h \\text{ is close to } 23 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The height up the wall is a leg of the triangle, so it must be shorter than the ladder, the hypotenuse. 22.65 is less than 23.', show: 'm.0' },
        { say: 'And at 80 degrees the ladder is nearly straight up, so it should reach almost its whole length up the wall. 22.65 is very close to 23. It makes sense.', show: 'm.1' },
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
            ['Using cosine: $23 \\cos 80^\\circ$', '$4.0$ ft: that is how far the **foot** is from the wall'],
            ['Dividing: $23 \\div \\sin 80^\\circ$', '$23.4$ ft: longer than the ladder'],
            ['Calculator in **radians**', '$-22.9$ ft: a negative height'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Cosine uses the adjacent side, the ground. 23 times cosine 80 is about 4 feet. That is how far the foot of the ladder is from the wall, not how high it reaches.' },
        { say: 'Dividing 23 by sine 80 gives 23.4 feet. That is longer than the ladder itself, so it cannot be right.' },
        { say: 'And check your calculator is in degree mode. In radians, you get minus 22.9, and a height cannot be negative.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 6 m ladder leans against a wall, making an angle of 70° with the ground. How far is the foot of the ladder from the wall, to the nearest tenth of a metre?',
          choices: ['5.6 m', '2.1 m', '16.5 m', '17.5 m'],
          answer: 1,
          working: 'Adjacent and hypotenuse: $\\cos 70^\\circ = \\dfrac{d}{6}$, so $d = 6\\cos 70^\\circ \\approx 2.1$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A 6 metre ladder leans against a wall, making an angle of 70 degrees with the ground. How far is the foot of the ladder from the wall, to the nearest tenth of a metre? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'This time we want the adjacent side, along the ground, and we have the hypotenuse. That is cosine. 6 times cosine 70 degrees is about 2.1 metres, choice B. 5.6 used sine, 16.5 used tangent, and 17.5 divided by the cosine.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**SOH CAH TOA**', 'A ladder, a ramp or a string is usually the **hypotenuse**', 'Opposite $= \\text{hypotenuse} \\times \\sin\\theta$', 'A leg is always **shorter** than the hypotenuse'] }],
      lines: [
        { say: 'Here is what to remember. SOH CAH TOA tells you which ratio uses which sides.', show: 'sum.0' },
        { say: 'A ladder, a ramp or a string is usually the hypotenuse.', show: 'sum.1' },
        { say: 'To find the opposite side, multiply the hypotenuse by the sine.', show: 'sum.2' },
        { say: 'And a leg is always shorter than the hypotenuse, which is a quick check. For more on sine and cosine, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
