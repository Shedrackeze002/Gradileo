import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 2.4 (angles of elevation and depression): a radio tower 325 feet
// from a building, seen from a window at 43° up to its top and 31° down to its bottom. The question
// is an exercise from OpenStax Algebra and Trigonometry 2e, word for word (section 7.2, Right
// Triangle Trigonometry, CC BY-NC-SA 4.0), whose answer key gives 498.3471 ft:
// 325 tan 43° + 325 tan 31° ≈ 303.07 + 195.28 ≈ 498.35 ft.

const UP = 303.07;
const DOWN = 195.28;

/** The building, the tower and the two right triangles from the window, drawn to scale. */
const scene = (height = 420): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { B: [0, 0], R: [0, 240], W: [0, DOWN], F: [325, 0], H: [325, DOWN], T: [325, DOWN + UP] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'B' },
    { kind: 'thing', id: 'bldg', type: 'building', at: 'B', top: 'R', side: 'left', width: 70 },
    { kind: 'thing', id: 'tower', type: 'tower', at: 'F', top: 'T' },
    { kind: 'label', id: 'win', at: 'W', tex: '\\text{window}', place: 'left', dot: true },
    { kind: 'line', id: 'flat', from: 'W', to: 'H', tone: 'adj', dashed: true, label: '325\\text{ ft}', labelSide: 'left', labelAt: 0.72, group: 'flat' },
    { kind: 'region', id: 'tu', points: ['W', 'H', 'T'], tone: 'opp', group: 'top' },
    { kind: 'line', id: 'su', from: 'W', to: 'T', group: 'top' },
    { kind: 'angle', id: 'au', at: 'W', from: 'H', to: 'T', tone: 'theta', label: '43^\\circ', r: 60, group: 'top' },
    { kind: 'line', id: 'x', from: 'H', to: 'T', tone: 'opp', weight: 6, label: 'x', labelSide: 'right', group: 'top' },
    { kind: 'right', id: 'ru', at: 'H', from: 'W', to: 'T', group: 'top' },
    { kind: 'region', id: 'td', points: ['W', 'H', 'F'], tone: 'hyp', group: 'bottom' },
    { kind: 'line', id: 'sd', from: 'W', to: 'F', group: 'bottom' },
    { kind: 'angle', id: 'ad', at: 'W', from: 'H', to: 'F', tone: 'theta', label: '31^\\circ', r: 60, group: 'bottom' },
    { kind: 'line', id: 'y', from: 'F', to: 'H', tone: 'hyp', weight: 6, label: 'y', labelSide: 'left', group: 'bottom' },
    { kind: 'right', id: 'rd', at: 'H', from: 'W', to: 'F', group: 'bottom' },
  ],
});

const QUESTION =
  'A radio tower is located 325 feet from a building. From a window in the building, a person determines that the angle of elevation to the top of the tower is 43°, and that the angle of depression to the bottom of the tower is 31°. How tall is the tower?';

const video: Explainer = {
  id: 'xq-m10c-2-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-2-4',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Radio Tower? Angles of Elevation and Depression',
  thumbnailTitle: 'How Tall Is the Tower?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: from a window 325 feet from a radio tower, the angle of elevation to its top is 43° and the angle of depression to its bottom is 31°. We split the tower into two right triangles, find each part with the tangent ratio and add them. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Tower?', subtitle: 'Angles of elevation and depression, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the height of a radio tower, with angles of elevation and depression. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about 498.35 ft', working: '$325\\tan 43^\\circ + 325\\tan 31^\\circ \\approx 303.07 + 195.28 \\approx 498.35$ ft.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A radio tower is located 325 feet from a building. From a window in the building, a person determines that the angle of elevation to the top of the tower is 43 degrees, and that the angle of depression to the bottom of the tower is 31 degrees. How tall is the tower?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The level line from the window cuts the tower into two parts: $x$ **above** it and $y$ **below** it. The tower is $x + y$.' }],
      lines: [
        { say: 'Let us picture it. A person looks out of a window in the building. The tower is 325 feet away.', show: ['pic', 'pic.ground', 'pic.bldg', 'pic.tower', 'pic.win'] },
        { say: 'Draw a level line straight across from the window to the tower. It is 325 feet long.', show: 'pic.flat' },
        { say: 'Looking up 43 degrees from that line, they see the top of the tower. That makes a right triangle above the line. Call the part of the tower above the line x.', show: 'pic.top' },
        { say: 'Looking down 31 degrees from the line, they see the bottom of the tower. That makes a second right triangle below the line. Call that part y. The whole tower is x plus y.', show: ['pic.bottom', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Elevation and depression', md: 'Both are measured from the **level line** at your eye: the angle of **elevation** **up** to something above you, and the angle of **depression** **down** to something below you.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}'] },
      ],
      lines: [
        { say: 'Here is what we need. The angle of elevation is measured up from the level line at your eye, to something above you. The angle of depression is measured down from the same level line, to something below you.', show: 'def' },
        { say: 'And the tangent of an angle is the opposite side over the adjacent side.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $x$, the part **above** the window, with $43^\\circ$', 'Find $y$, the part **below** the window, with $31^\\circ$', 'Add: the tower is $x + y$'] }],
      lines: [
        { say: 'Here is the plan. First, find x, the part above the window, with the 43 degree angle.', show: 'plan.0' },
        { say: 'Second, find y, the part below the window, with the 31 degree angle.', show: 'plan.1' },
        { say: 'Third, add them to get the whole tower.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The part above',
      layout: 'split',
      left: [scene(400)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan 43^\\circ = \\dfrac{x}{325}', 'x = 325\\tan 43^\\circ', '\\approx 303.07\\text{ ft}'] }],
      lines: [
        { say: 'Step one. In the top triangle, x is opposite the 43 degree angle, and the 325 feet is next to it. Opposite and adjacent means tangent: tan 43 degrees equals x over 325.', show: ['pic', 'pic.ground', 'pic.bldg', 'pic.tower', 'pic.win', 'pic.flat', 'pic.top', 'm.0'], focus: 'pic.x' },
        { say: 'Multiply both sides by 325: x equals 325 times tan 43 degrees.', show: 'm.1' },
        { say: 'On a calculator in degree mode, that is about 303.07 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The part below',
      layout: 'split',
      left: [scene(400)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan 31^\\circ = \\dfrac{y}{325}', 'y = 325\\tan 31^\\circ', '\\approx 195.28\\text{ ft}'] }],
      lines: [
        { say: 'Step two. The bottom triangle works the same way. y is opposite the 31 degree angle, and the 325 feet is next to it again. So tan 31 degrees equals y over 325.', show: ['pic', 'pic.ground', 'pic.bldg', 'pic.tower', 'pic.win', 'pic.flat', 'pic.bottom', 'm.0'], focus: 'pic.y' },
        { say: 'Multiply both sides by 325: y equals 325 times tan 31 degrees.', show: 'm.1' },
        { say: 'That is about 195.28 feet. So the window is about 195 feet above the ground.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '325 × tan(43) + 325 × tan(31)', result: '498.3471' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x + y \\approx 303.07 + 195.28', '\\approx \\good{498.35\\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The tower is x plus y: 303.07 plus 195.28.', show: 'm.0' },
        { say: 'All in one go on a calculator, that is 498.3471 and so on. The tower is about 498.35 feet tall, nearly 500 feet.', show: ['calc', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['43^\\circ > 31^\\circ, \\text{ so } x > y: \\ 303 > 195 \\ \\checkmark', '\\tan 45^\\circ = 1: \\text{ both parts are under } 325 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The angle up is bigger than the angle down, so the part above the window should be taller than the part below. 303 is more than 195.', show: 'm.0' },
        { say: 'And both angles are less than 45 degrees, where the tangent is 1. So each part must be shorter than 325 feet, and both are.', show: 'm.1' },
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
            ['Stopping after the angle of elevation', '$303.07$ ft: only the part **above** the window'],
            ['One triangle with $43^\\circ + 31^\\circ = 74^\\circ$', '$1133.4$ ft: the angles are not in one right triangle'],
            ['Subtracting the parts', '$107.79$ ft: the window is **between** the top and bottom'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Stopping after the angle of elevation gives 303.07 feet. That is only the part of the tower above the window.' },
        { say: 'Adding the angles to get 74 degrees, and using 325 times tan 74, gives over 1,100 feet. The two angles belong to two different right triangles, so you must work them out one at a time.' },
        { say: 'And subtracting the parts gives about 108 feet. The window is between the top and the bottom of the tower, so the two parts add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'From the top of a 60 m cliff, the angle of depression to a boat is 25°. How far is the boat from the foot of the cliff, to the nearest metre?',
          choices: ['28 m', '142 m', '66 m', '129 m'],
          answer: 3,
          working: 'The angle of elevation from the boat to the cliff top is also $25^\\circ$, so $\\tan 25^\\circ = \\dfrac{60}{d}$ and $d = \\dfrac{60}{\\tan 25^\\circ} \\approx 129$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a 60 metre cliff, the angle of depression to a boat is 25 degrees. How far is the boat from the foot of the cliff, to the nearest metre? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The angle of elevation from the boat up to the cliff top is also 25 degrees, so tan 25 degrees equals 60 over d. d equals 60 divided by tan 25, about 129 metres. That is choice D. 28 multiplied instead of dividing, 142 divided by sine, and 66 divided by cosine.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Elevation is measured **up**, depression **down**, both from the **level line**', 'Two angles from one point: **two** right triangles', 'Find each part, then **add**', 'Opposite $= \\text{adjacent} \\times \\tan\\theta$'] }],
      lines: [
        { say: 'Here is what to remember. The angle of elevation is measured up, and the angle of depression down, both from the level line at your eye.', show: 'sum.0' },
        { say: 'Two angles from one point make two right triangles.', show: 'sum.1' },
        { say: 'Find each part, then add them.', show: 'sum.2' },
        { say: 'And to find an opposite side, multiply the adjacent side by the tangent. For more on angles of elevation and depression, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
