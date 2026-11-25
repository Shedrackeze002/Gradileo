import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 7.1 (perimeter and circumference). The question is an exercise
// from OpenStax Contemporary Mathematics, word for word (section 10.4, Polygons, Perimeter, and
// Circumference, CC BY-NC-SA 4.0). Width = ½ × 22 + 3 = 14 m, so the perimeter is
// 2 × (22 + 14) = 72 m. Check: 22 + 14 + 22 + 14 = 72.

/** The fenced area, 22 m by 14 m, drawn to scale. */
const field = (height = 340, width = '14 \\text{ m}'): DiagramEl => ({
  kind: 'diagram',
  id: 'f',
  height,
  points: { A: [0, 0], B: [22, 0], C: [22, 14], D: [0, 14] },
  items: [
    { kind: 'region', id: 'in', points: ['A', 'B', 'C', 'D'], tone: 'adj', shade: 0.12, group: 'shape' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'ink', weight: 3, label: '22 \\text{ m}', labelSide: 'right', group: 'shape' },
    { kind: 'line', id: 'cd', from: 'C', to: 'D', tone: 'ink', weight: 3, group: 'shape' },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'ink', weight: 3, group: 'shape' },
    { kind: 'line', id: 'da', from: 'D', to: 'A', tone: 'ink', weight: 3, label: width, labelSide: 'right', group: 'wide' },
    { kind: 'line', id: 'fence', from: 'A', to: 'B', tone: 'good', weight: 5, group: 'fence' },
    { kind: 'line', id: 'fence2', from: 'B', to: 'C', tone: 'good', weight: 5, group: 'fence' },
    { kind: 'line', id: 'fence3', from: 'C', to: 'D', tone: 'good', weight: 5, group: 'fence' },
    { kind: 'line', id: 'fence4', from: 'D', to: 'A', tone: 'good', weight: 5, group: 'fence' },
  ],
});

const QUESTION = 'Find the perimeter of a fenced-in area where the length is 22 m, and the width is ½ of the length plus 3.';

const video: Explainer = {
  id: 'xq-m104-7-1',
  lessonId: '',
  exam: {
    lesson: 'm104-7-1',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 10.4, Polygons, Perimeter, and Circumference',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-4-polygons-perimeter-and-circumference',
    question: QUESTION,
  },
  title: 'Exam Question: The Perimeter of a Fenced Area (Perimeter and Circumference)',
  thumbnailTitle: 'The Perimeter of a Fenced Area',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: a fenced-in area is 22 m long, and its width is ½ of the length plus 3. What is its perimeter? We find the width first, ½ × 22 + 3 = 14 m, then add all four sides: 2 × (22 + 14) = 72 m. Then we check by going round the fence and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Perimeter of a Fenced Area', subtitle: 'Perimeter, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about perimeter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the perimeter of a fenced-in area where the length is $22$ m, and the width is $\\tfrac{1}{2}$ of the length plus $3$.',
          answer: '$72$ m',
          working: 'width $= 11 + 3 = 14$, and $2(22 + 14) = 72$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the perimeter of a fenced-in area where the length is 22 metres, and the width is one half of the length plus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [field(340, '?'), { kind: 'text', id: 't', size: 'md', md: 'The **perimeter** is the length of fence all the way **around**. First we need the **width**.' }],
      lines: [
        { say: 'Here is the fenced area: a rectangle 22 metres long.', show: 'f.shape' },
        { say: 'The width is not given as a number. It is described in words, so we must work it out.', show: 'f.wide' },
        { say: 'The perimeter is the length of fence all the way around. But first we need the width.', show: ['f.fence', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f2', size: 'lg', lines: ['P = 2 \\times (\\text{length} + \\text{width})'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Read the words in order', md: '"$\\tfrac{1}{2}$ of the length **plus** $3$" means: take **half** of the length **first**, then **add** $3$.' },
      ],
      lines: [
        { say: 'Here is what we need. A rectangle has two lengths and two widths, so its perimeter is 2 times the length plus the width.', show: 'f2' },
        { say: 'And read the words in order. One half of the length, plus 3, means take half of the length first, then add 3.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **width**', 'Add the **length** and the **width**', '**Double** it'] }],
      lines: [
        { say: 'Here is the plan. Find the width.', show: 'plan.0' },
        { say: 'Add the length and the width.', show: 'plan.1' },
        { say: 'Then double it, because there are two of each.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The width',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{2} \\times 22 = 11', '11 + 3 = 14 \\text{ m}'] }],
      lines: [
        { say: 'Step one. Half of the length is half of 22, which is 11.', show: 'm.0' },
        { say: 'Plus 3 makes 14. The width is 14 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Length plus width',
      layout: 'center',
      main: [field(320), { kind: 'math', id: 'm', size: 'md', lines: ['22 + 14 = 36 \\text{ m}'] }],
      lines: [
        { say: 'Step two. Now we know both sides. One length and one width make 22 plus 14, which is 36 metres. That is half of the way around.', show: ['f.shape', 'f.wide', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Double it',
      layout: 'center',
      main: [field(320), { kind: 'math', id: 'm', size: 'md', lines: ['P = 2 \\times 36 = \\good{72 \\text{ m}}'] }],
      lines: [
        { say: 'Step three. The other length and width are the same, so double it. 2 times 36 is 72. The perimeter is 72 metres.', show: ['f.shape', 'f.wide', 'f.fence', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['22 + 14 + 22 + 14 = 72 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by walking round the fence, one side at a time: 22, plus 14, plus 22, plus 14. That is 72 metres. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$66$ m', 'forgot the **plus 3**: the width is $14$, not $11$'],
            ['$36$ m', 'only **two** sides: double it'],
            ['$308$ m²', 'that is the **area**: perimeter **adds** the sides'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '66 metres uses a width of 11. The width is half the length plus 3, which is 14.' },
        { say: '36 metres goes only halfway around. A rectangle has two lengths and two widths.' },
        { say: 'And 308 square metres multiplies the sides. That is the area, the space inside. The perimeter adds the sides.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangular patio is $9$ m long, and its width is $2$ m less than its length. What is its perimeter?',
          choices: ['$63$ m', '$16$ m', '$32$ m', '$25$ m'],
          answer: 2,
          working: 'width $= 9 - 2 = 7$ m, and $2(9 + 7) = 32$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular patio is 9 metres long, and its width is 2 metres less than its length. What is its perimeter? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The width is 9 minus 2, which is 7. 9 plus 7 is 16, and doubled that is 32 metres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find any **missing side** first', 'Read "$\\tfrac{1}{2}$ of … plus $3$" **in order**', '$P = 2 \\times (\\text{length} + \\text{width})$', 'Perimeter **adds**, area **multiplies**'] }],
      lines: [
        { say: 'Here is what to remember. Find any missing side first.', show: 'sum.0' },
        { say: 'Read words like half of the length, plus 3, in order.', show: 'sum.1' },
        { say: 'A rectangle\'s perimeter is 2 times the length plus the width.', show: 'sum.2' },
        { say: 'And perimeter adds the sides, while area multiplies them. For more on perimeter and circumference, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
