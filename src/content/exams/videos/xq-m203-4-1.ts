import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 4.1 (reviewing right-triangle trigonometry). The question is an
// Exercise from OpenStax Algebra and Trigonometry 2e, word for word (section 7.2, Right Triangle
// Trigonometry, CC BY-NC-SA 4.0). 2 miles = 2 × 5280 = 10 560 ft, and the height is opposite the 2°
// angle with the 10 560 ft adjacent, so h = 10 560 tan 2° ≈ 368.76 ft, as in the book's answer
// (368.7633 ft). Check: 368.76 ÷ 10 560 ≈ 0.0349 = tan 2°.

/**
 * The building, the ground and the right triangle from the point on the ground. A 2° angle drawn
 * to scale would be a sliver, so the picture is steeper than the real thing and says so.
 */
const scene = (height = 400): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { G: [0, 0], F: [300, 0], T: [300, 120], NS: [300, -40] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'G' },
    { kind: 'thing', id: 'bldg', type: 'building', at: 'F', top: 'T', side: 'right', width: 40 },
    { kind: 'label', id: 'you', at: 'G', tex: '\\text{you}', place: 'below', dot: true },
    { kind: 'label', id: 'ns', at: 'NS', tex: '\\text{(not to scale)}', tone: 'muted', place: 'below' },
    { kind: 'line', id: 'base', from: 'G', to: 'F', tone: 'adj', label: '2 \\text{ mi}', labelSide: 'right' },
    { kind: 'region', id: 'tri', points: ['G', 'F', 'T'], tone: 'opp', group: 'sight' },
    { kind: 'line', id: 'sl', from: 'G', to: 'T', group: 'sight' },
    { kind: 'angle', id: 'a', at: 'G', from: 'F', to: 'T', tone: 'theta', label: '2^\\circ', r: 70, group: 'sight' },
    { kind: 'right', id: 'rt', at: 'F', from: 'G', to: 'T', group: 'sight' },
    { kind: 'line', id: 'h', from: 'F', to: 'T', tone: 'opp', weight: 6, label: 'h', labelSide: 'left' },
  ],
});
const PIC = ['pic', 'pic.ground', 'pic.bldg', 'pic.you', 'pic.ns', 'pic.base'];

const QUESTION =
  'The angle of elevation to the top of a building in Seattle is found to be 2 degrees from the ground at a distance of 2 miles from the base of the building. Using this information, find the height of the building.';

const video: Explainer = {
  id: 'xq-m203-4-1',
  lessonId: '',
  exam: {
    lesson: 'm203-4-1',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Building? (Right-Triangle Trigonometry)',
  thumbnailTitle: 'A Building Seen from 2 Miles Away',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: from the ground 2 miles from a building in Seattle, the angle of elevation to its top is 2 degrees. Find the height of the building. We change 2 miles to 10,560 feet, and the height is opposite the 2° angle, with the 10,560 feet adjacent, so tan 2° = h ÷ 10,560 and h = 10,560 × tan 2° ≈ 368.76 feet. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Building?', subtitle: 'Right-triangle trigonometry, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with right-triangle trigonometry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about $368.76$ ft', working: '$2$ mi $= 10\\,560$ ft, and $10\\,560 \\tan 2^\\circ \\approx 368.76$' }],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The angle of elevation to the top of a building in Seattle is found to be 2 degrees from the ground, at a distance of 2 miles from the base of the building.' },
        { say: 'Using this information, find the height of the building.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The ground, the building and your line of sight make a **right triangle**. The height $h$ is **opposite** the $2^\\circ$ angle.' }],
      lines: [
        { say: 'Let us picture it. You stand on the ground, 2 miles from the base of the building.', show: PIC },
        { say: 'You look up 2 degrees to the top. The ground, the building and your line of sight make a right triangle. A 2 degree angle is very thin, so the picture is drawn steeper than it really is.', show: 'pic.sight' },
        { say: 'The height of the building, h, is the side opposite the 2 degree angle.', show: ['pic.h', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}', '1 \\text{ mile} = 5280 \\text{ feet}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'SOH CAH TOA', md: 'Name the sides **from the angle**. We know the **adjacent** side and want the **opposite**, so we use **tangent**: TOA.' },
      ],
      lines: [
        { say: 'Here is what we need. The tangent of an angle is the opposite side over the adjacent side.', show: 'f.0' },
        { say: 'We know the side next to the angle, the adjacent, and we want the side across from it, the opposite. Opposite and adjacent means tangent: T O A.', show: 'c' },
        { say: 'And a building\'s height is usually given in feet. One mile is 5 thousand 280 feet.', caption: 'And a building’s height is usually given in feet. One mile is 5280 feet.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change the miles to **feet**', 'Write $\\tan 2^\\circ = \\dfrac{h}{\\text{adjacent}}$', '**Multiply** to find $h$'] }],
      lines: [
        { say: 'Here is the plan. Change the 2 miles to feet.', show: 'plan.0' },
        { say: 'Write the tangent of 2 degrees as h over the adjacent side.', show: 'plan.1' },
        { say: 'Then multiply to find h.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Feet, then tangent',
      layout: 'split',
      left: [scene(380)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 5280 = 10\\,560 \\text{ ft}', '\\tan 2^\\circ = \\dfrac{h}{10\\,560}'] }],
      lines: [
        { say: 'Step one. 2 miles is 2 times 5 thousand 280, which is 10 thousand 560 feet.', caption: 'Step one. 2 miles is 2 × 5280 = 10,560 feet.', show: [...PIC, 'pic.sight', 'pic.h', 'm.0'], focus: 'm.0' },
        { say: 'Step two. h is opposite the 2 degree angle, and 10 thousand 560 feet is adjacent. So tan 2 degrees equals h over 10 thousand 560.', caption: 'Step two. h is opposite the 2° angle, and 10,560 feet is adjacent. So tan 2° = h ÷ 10,560.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Find the height',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '10560 × tan(2)', result: '368.7633' }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['h = 10\\,560 \\tan 2^\\circ', '\\approx \\good{368.76 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Multiply both sides by 10 thousand 560: h equals 10 thousand 560 times tan 2 degrees.', caption: 'Step three. Multiply both sides by 10,560: h = 10,560 × tan 2°.', show: 'm.0' },
        { say: 'On a calculator in degree mode, that is about 368.76. The building is about 368.76 feet tall.', show: ['calc', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{368.76}{10\\,560} \\approx 0.0349', '\\tan 2^\\circ \\approx 0.0349 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 368.76 divided by 10 thousand 560 is about 0.0349.', caption: 'Let us check. 368.76 ÷ 10,560 ≈ 0.0349.', show: 'm.0' },
        { say: 'And tan 2 degrees is about 0.0349 too. It checks out. A building about 370 feet tall, seen from 2 miles away, really does look only 2 degrees high.', show: 'm.1', focus: 'm.1' },
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
            ['$0.07$ ft', 'worked in **miles**, then wrote feet: change to feet first'],
            ['$-23\\,074$ ft', 'calculator in **radian** mode: use **degrees**'],
            ['$302\\,399$ ft', '**divided** by $\\tan 2^\\circ$: the height is on **top**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0.07 works in miles: 2 times tan 2 degrees is about 0.07 miles, not feet. Change the miles to feet first.' },
        { say: 'Negative 23 thousand 74 feet comes from a calculator in radian mode. A height cannot be negative. Switch to degrees.', caption: '−23,074 feet comes from a calculator in radian mode. A height cannot be negative. Switch to degrees.' },
        { say: 'And 302 thousand 399 divides by tan 2 degrees. h is on the top of the fraction, so multiply.', caption: 'And 302,399 divides by tan 2°. h is on the top of the fraction, so multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'From $1.5$ km away on level ground, the angle of elevation to the top of a tower is $4^\\circ$. How tall is the tower, to the nearest metre?',
          choices: ['$0.1$ m', '$105$ m', '$21\\,451$ m', '$1737$ m'],
          answer: 1,
          working: '$1.5$ km $= 1500$ m, and $1500 \\tan 4^\\circ \\approx 104.9$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. From 1.5 kilometres away on level ground, the angle of elevation to the top of a tower is 4 degrees. How tall is the tower, to the nearest metre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1.5 kilometres is 1 thousand 500 metres. 1 thousand 500 times tan 4 degrees is about 104.9, so 105 metres. Choice "B".', caption: '1.5 km is 1500 m. 1500 × tan 4° ≈ 104.9, so 105 metres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Name the sides **from the angle**', 'Opposite and adjacent: **tangent**', 'Get the **units** to match first', 'Calculator in **degree** mode'] }],
      lines: [
        { say: 'Here is what to remember. Name the sides from the angle.', show: 'sum.0' },
        { say: 'Opposite and adjacent means tangent.', show: 'sum.1' },
        { say: 'Get the units to match before you calculate.', show: 'sum.2' },
        { say: 'And keep your calculator in degree mode. For more on right-triangle trigonometry, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
