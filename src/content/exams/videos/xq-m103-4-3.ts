import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 4.3 (perimeter and circumference). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles,
// Triangles, and Trapezoids, Everyday Math, CC BY-NC-SA 4.0). The 50 feet of fence is the
// perimeter: 50 = 2L + 2(10), so 2L = 30 and L = 15 ft, as in the book's answer.
// Check: 15 + 10 + 15 + 10 = 50.

/** The garden: a rectangle 10 ft wide, with the other side unknown. */
function garden(): Part {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [15, 0], C: [15, 10], D: [0, 10] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'bed', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.15 },
    { kind: 'line', id: 'w1', from: 'D', to: 'A', tone: 'opp', weight: 4, label: '10 \\text{ ft}', labelSide: 'right', group: 'widths' },
    { kind: 'line', id: 'w2', from: 'B', to: 'C', tone: 'opp', weight: 4, label: '10 \\text{ ft}', labelSide: 'right', group: 'widths' },
    { kind: 'line', id: 'l1', from: 'A', to: 'B', tone: 'adj', weight: 4, label: 'L', labelSide: 'right', group: 'lengths' },
    { kind: 'line', id: 'l2', from: 'C', to: 'D', tone: 'adj', weight: 4, label: 'L', labelSide: 'right', group: 'lengths' },
  ];
  return { points, items };
}

const QUESTION =
  'Fence Jose just removed the children’s playset from his back yard to make room for a rectangular garden. He wants to put a fence around the garden to keep out the dog. He has a 50 foot roll of fence in his garage that he plans to use. To fit in the backyard, the width of the garden must be 10 feet. How long can he make the other side if he wants to use the entire roll of fence?';

const video: Explainer = {
  id: 'xq-m103-4-3',
  lessonId: '',
  exam: {
    lesson: 'm103-4-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: 50 Feet of Fence Around a Garden (Perimeter)',
  thumbnailTitle: 'How Long Can the Garden Be?',
  thumbnail: 'gd',
  summary:
    'A real test question, solved one small step at a time: Jose has a 50-foot roll of fence for a rectangular garden that must be 10 feet wide. How long can the other side be if he uses the whole roll? The fence goes all the way round, so 50 feet is the perimeter: 50 = 2L + 2(10). Then 2L = 30 and L = 15 feet. We check by walking round the garden and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Can the Garden Be?', subtitle: 'Perimeter, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about perimeter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Fence Jose just removed the children’s playset from his back yard to make room for a rectangular garden. He wants to put a fence around the garden to keep out the dog. He has a $50$ foot roll of fence in his garage that he plans to use. To fit in the backyard, the width of the garden must be $10$ feet. How long can he make the other side if he wants to use the entire roll of fence?',
          answer: '$15$ ft',
          working: '$50 = 2L + 2(10)$, so $2L = 30$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Jose wants to put a fence around a rectangular garden to keep out the dog. He has a 50-foot roll of fence. The garden must be 10 feet wide. How long can he make the other side if he uses the whole roll?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [figure('gd', [garden()], 380)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The fence goes **all the way round**: two widths and two lengths. Together they use all $50$ ft.' }],
      lines: [
        { say: 'Here is the garden. It is a rectangle, so it has two widths of 10 feet each.', show: ['gd.bed', 'gd.widths'] },
        { say: 'And two lengths, which we call L. That is what we want to find.', show: 'gd.lengths' },
        { say: 'The fence goes all the way round the garden, so the two widths and the two lengths together use all 50 feet of fence.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['P = 2L + 2W'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Fence means perimeter', md: 'A fence **around** a shape measures its **perimeter**: the distance all the way round.' },
      ],
      lines: [
        { say: 'Here is what we need. The perimeter of a rectangle is 2 times the length plus 2 times the width.', show: 'f' },
        { say: 'A fence around a shape is its perimeter, the distance all the way round. Here, the perimeter is the 50 feet of fence.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put what we know into $P = 2L + 2W$', 'Take away the **widths**', '**Divide** by $2$'] }],
      lines: [
        { say: 'Here is the plan. Put what we know into the perimeter formula.', show: 'plan.0' },
        { say: 'Take away the fence used by the two widths.', show: 'plan.1' },
        { say: 'Then divide by 2 to find one length.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['50 = 2L + 2(10)', '50 = 2L + 20'] }],
      lines: [
        { say: 'Step one. The perimeter is 50, and the width is 10. So 50 equals 2 L plus 2 times 10.', show: 'm.0' },
        { say: '2 times 10 is 20. So 50 equals 2 L plus 20.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Take away the widths',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['50 - 20 = 2L', '30 = 2L'] }],
      lines: [
        { say: 'Step two. Take 20 from both sides. That is the fence used by the two widths.', show: 'm.0' },
        { say: '30 feet of fence is left for the two lengths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide by 2',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['L = \\dfrac{30}{2} = \\good{15 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. There are two lengths, so divide by 2. 30 divided by 2 is 15. Jose can make the other side 15 feet long.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 + 10 + 15 + 10 = 50 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by walking all the way round the garden: 15, plus 10, plus 15, plus 10. That is 50 feet, exactly the whole roll. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$50 - 10 = 40$ ft', 'there are **two** widths, and **two** lengths'],
            ['$50 \\div 10 = 5$ ft', 'that treats $50$ as an **area**: it is a perimeter'],
            ['$30$ ft', '$30$ ft is **both** lengths: divide by $2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Taking away one width of 10 forgets that a rectangle has two widths, and two lengths.' },
        { say: 'Dividing 50 by 10 treats 50 as an area. But the fence goes round the edge, so 50 is the perimeter.' },
        { say: 'And 30 feet is the fence for both lengths together. Divide by 2 for one side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangular dog run uses $64$ feet of fence. It is $12$ feet wide. How long is it?',
          choices: ['$52$ ft', '$40$ ft', '$20$ ft', '$5\\tfrac{1}{3}$ ft'],
          answer: 2,
          working: '$64 = 2L + 24$, so $2L = 40$ and $L = 20$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular dog run uses 64 feet of fence. It is 12 feet wide. How long is it? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The two widths use 24 feet, which leaves 40 feet for the two lengths. 40 divided by 2 is 20 feet. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fence around a shape $=$ its **perimeter**', 'Rectangle: $P = 2L + 2W$', 'Take away the widths, then **divide by 2**', 'Check by walking all the way round'] }],
      lines: [
        { say: 'Here is what to remember. A fence around a shape is its perimeter.', show: 'sum.0' },
        { say: 'For a rectangle, P equals 2 L plus 2 W.', show: 'sum.1' },
        { say: 'Take away the widths, then divide by 2 for one length.', show: 'sum.2' },
        { say: 'And check by adding all four sides. For more on perimeter and circumference, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
