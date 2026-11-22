import type { Explainer, TriangleEl } from '@/video/script.ts';

// Exam question for Math 10 lesson 2.1 (the tangent ratio): the height of a tree from 30 feet away,
// with an angle of elevation of 57°. The question is OpenStax Algebra and Trigonometry 2e's own
// worked example, word for word (section 7.2, Right Triangle Trigonometry, CC BY-NC-SA 4.0), with
// the figure pointer dropped. tan 57° = h ÷ 30, so h = 30 tan 57° ≈ 46.2 ft: about 46 feet.

const tree: TriangleEl = { kind: 'triangle', id: 'tri', adj: 30, opp: 46.2, setting: 'tree', labels: { theta: '57^\\circ', adj: '30\\text{ ft}', opp: 'h' } };

const QUESTION =
  'To find the height of a tree, a person walks to a point 30 feet from the base of the tree. She measures an angle of 57° between a line of sight to the top of the tree and the ground. Find the height of the tree.';

const video: Explainer = {
  id: 'xq-m10c-2-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-2-1',
    source: 'OpenStax, Algebra and Trigonometry 2e, Example in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Tree? The Tangent Ratio',
  thumbnailTitle: 'How Tall Is the Tree?',
  thumbnail: 'tri',
  summary:
    'A real test question, solved one small step at a time: standing 30 feet from a tree, the angle up to its top is 57°, and we find how tall the tree is. We name the sides of the right triangle, choose the tangent ratio, set up tan 57° = h ÷ 30 and solve for h. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Tree?', subtitle: 'The tangent ratio, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding the height of a tree with the tangent ratio. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about 46 feet (46.2 ft)', working: '$\\tan 57^\\circ = \\dfrac{h}{30}$, so $h = 30\\tan 57^\\circ \\approx 46.2$ ft.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'To find the height of a tree, a person walks to a point 30 feet from the base of the tree. She measures an angle of 57 degrees between a line of sight to the top of the tree and the ground. Find the height of the tree.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [tree],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The ground, the tree and her line of sight make a **right triangle**. We want its height, $h$.' }],
      lines: [
        { say: 'Let us picture it. She stands 30 feet from the bottom of the tree, and looks up to its top at an angle of 57 degrees.', show: ['tri', 'tri.theta', 'tri.adj'] },
        { say: 'The ground, the tree and her line of sight make a right triangle, because the tree stands straight up. We want its height, h.', show: ['tri.opp', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}'] },
        { kind: 'text', id: 't', size: 'md', md: '**Opposite**: the side across from the angle. **Adjacent**: the side next to it that is not the hypotenuse.' },
      ],
      lines: [
        { say: 'Here is what we need. The tangent of an angle in a right triangle is the opposite side divided by the adjacent side.', show: 'f' },
        { say: 'The opposite side is across from the angle. The adjacent side is next to the angle, but is not the hypotenuse, the longest side.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the sides from the $57^\\circ$ angle', 'Choose the ratio that uses the two sides we have and want: **tangent**', 'Solve for $h$'] }],
      lines: [
        { say: 'Here is the plan. First, name the sides from the 57 degree angle.', show: 'plan.0' },
        { say: 'Second, choose the ratio that uses the side we know and the side we want. That is the tangent.', show: 'plan.1' },
        { say: 'Third, solve for h.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Name the sides',
      layout: 'split',
      left: [tree],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{opposite} = h \\ (\\text{want})', '\\text{adjacent} = 30 \\ (\\text{know})'] }],
      lines: [
        { say: 'Step one. Stand at the 57 degree angle. The tree is across from it, so the height h is the opposite side. That is the side we want.', show: ['tri', 'tri.theta', 'tri.opp', 'm.0'], focus: 'tri.opp' },
        { say: 'The ground, 30 feet, is next to the angle, so it is the adjacent side. That is the side we know.', show: ['tri.adj', 'm.1'], focus: 'tri.adj' },
      ],
    },
    {
      chapter: 'Step 2: Set up and solve',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '30 × tan(57)', result: '46.1959' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan 57^\\circ = \\dfrac{h}{30}', 'h = 30 \\tan 57^\\circ', '\\approx \\good{46.2\\text{ ft}}'] }],
      lines: [
        { say: 'Step two. Opposite and adjacent means tangent: tan 57 degrees equals h over 30.', show: 'm.0' },
        { say: 'Multiply both sides by 30 to get h on its own: h equals 30 times tan 57 degrees.', show: 'm.1' },
        { say: 'On a calculator in degree mode, 30 times tan 57 is 46.1959 and so on. The tree is about 46.2 feet tall, about 46 feet.', show: ['calc', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan 45^\\circ = 1: \\text{ at } 45^\\circ, h \\text{ would be } 30', '57^\\circ > 45^\\circ, \\text{ so } h > 30 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. At 45 degrees, the tangent is 1, so the tree would be exactly as tall as the distance, 30 feet.', show: 'm.0' },
        { say: 'The angle is steeper than 45 degrees, so the tree must be taller than 30 feet. 46.2 is taller. It makes sense.', show: 'm.1' },
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
            ['Using sine: $30 \\sin 57^\\circ$', '$25.2$ ft'],
            ['Dividing: $30 \\div \\tan 57^\\circ$', '$19.5$ ft: less than 30, but the angle is steeper than $45^\\circ$'],
            ['Calculator in **radians**', '$14.5$ ft'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Sine uses the hypotenuse, which we do not have here. 30 times sine 57 gives 25.2, which is wrong.' },
        { say: 'Dividing 30 by tan 57 gives 19.5. But the angle is steeper than 45 degrees, so the tree must be taller than 30 feet.' },
        { say: 'And check your calculator is in degree mode. In radians, you would get 14.5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You stand 20 m from the base of a flagpole. The angle of elevation to its top is 40°. How tall is the flagpole, to the nearest tenth of a metre?',
          choices: ['16.8 m', '12.9 m', '15.3 m', '23.8 m'],
          answer: 0,
          working: '$h = 20\\tan 40^\\circ \\approx 16.8$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. You stand 20 metres from the base of a flagpole. The angle of elevation to its top is 40 degrees. How tall is the flagpole, to the nearest tenth of a metre? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'h equals 20 times tan 40 degrees, which is about 16.8 metres. That is choice A. 12.9 used sine, 15.3 used cosine, and 23.8 divided by the tangent.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$', 'Name the sides from the **angle** you know', 'Opposite $= \\text{adjacent} \\times \\tan\\theta$', 'Calculator in **degree** mode'] }],
      lines: [
        { say: 'Here is what to remember. The tangent is opposite over adjacent.', show: 'sum.0' },
        { say: 'Name the sides from the angle you know.', show: 'sum.1' },
        { say: 'To find the opposite side, multiply the adjacent side by the tangent.', show: 'sum.2' },
        { say: 'And keep your calculator in degree mode. For more on the tangent ratio, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
