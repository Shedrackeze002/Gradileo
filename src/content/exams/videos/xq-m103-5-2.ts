import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 5.2 (composite and irregular shapes). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 9.5, Solve Geometry Applications:
// Circles and Irregular Figures, CC BY-NC-SA 4.0). The book's figure is redrawn: the lot is
// 120 × 100 = 12,000 sq ft, the house 50 × 40 = 2,000 sq ft and the driveway 20 × 30 = 600 sq ft,
// so the lawn is 12,000 − 2,000 − 600 = 9,400 sq ft, as in the book's answer.
// Check: 9,400 + 2,000 + 600 = 12,000.

/** Perry's lot, with the house and the driveway on it, drawn to scale. */
function lot(): Part {
  const points: Record<string, [number, number]> = {
    A: [0, 0], B: [120, 0], C: [120, 100], D: [0, 100],
    H1: [35, 30], H2: [85, 30], H3: [85, 70], H4: [35, 70], HC: [60, 50],
    D1: [55, 0], D2: [75, 0], D3: [75, 30], D4: [55, 30], DR: [75, 15],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'grass', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.25, group: 'lot' },
    { kind: 'line', id: 'bottom', from: 'A', to: 'B', tone: 'good', label: '120 \\text{ ft}', labelSide: 'right', group: 'lot' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'good', group: 'lot' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'good', group: 'lot' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'good', label: '100 \\text{ ft}', labelSide: 'right', group: 'lot' },
    { kind: 'region', id: 'house-fill', points: ['H1', 'H2', 'H3', 'H4'], tone: 'opp', shade: 0.6, group: 'house' },
    { kind: 'curve', id: 'house-edge', points: ['H1', 'H2', 'H3', 'H4'], closed: true, tone: 'opp', group: 'house' },
    { kind: 'label', id: 'house-label', at: 'HC', tex: '\\text{house } 50 \\times 40', place: 'center', group: 'house' },
    { kind: 'region', id: 'drive-fill', points: ['D1', 'D2', 'D3', 'D4'], tone: 'adj', shade: 0.6, group: 'drive' },
    { kind: 'curve', id: 'drive-edge', points: ['D1', 'D2', 'D3', 'D4'], closed: true, tone: 'adj', group: 'drive' },
    { kind: 'label', id: 'drive-label', at: 'DR', tex: '20 \\times 30', place: 'right', tone: 'adj', group: 'drive' },
  ];
  return { points, items };
}

const QUESTION =
  'Perry needs to put in a new lawn. His lot is a rectangle with a length of 120 feet and a width of 100 feet. The house is rectangular and measures 50 feet by 40 feet. His driveway is rectangular and measures 20 feet by 30 feet, as shown. Find the area of Perry’s lawn.';

const video: Explainer = {
  id: 'xq-m103-5-2',
  lessonId: '',
  exam: {
    lesson: 'm103-5-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.5, Solve Geometry Applications: Circles and Irregular Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures',
    question: QUESTION,
  },
  title: 'Exam Question: The Area of Perry’s New Lawn (Composite Shapes)',
  thumbnailTitle: 'How Much Lawn Does Perry Need?',
  thumbnail: 'lot',
  summary:
    'A real test question, solved one small step at a time: Perry’s lot is 120 by 100 feet, with a 50 by 40 foot house and a 20 by 30 foot driveway on it. What is the area of the lawn? The lawn is the whole lot with the house and the driveway taken away: 12,000 − 2,000 − 600 = 9,400 square feet. Then we check by adding the pieces back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Lawn Does Perry Need?', subtitle: 'Composite shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a composite shape. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Perry needs to put in a new lawn. His lot is a rectangle with a length of $120$ feet and a width of $100$ feet. The house is rectangular and measures $50$ feet by $40$ feet. His driveway is rectangular and measures $20$ feet by $30$ feet, as shown. Find the area of Perry’s lawn.',
          answer: '$9{,}400$ sq ft',
          working: '$12{,}000 - 2{,}000 - 600$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises. In a moment, we will see our own drawing of the book\'s picture.', show: 'q' },
        { say: 'Perry needs a new lawn. His lot is a rectangle, 120 feet long and 100 feet wide. The house is a rectangle, 50 feet by 40 feet. The driveway is a rectangle, 20 feet by 30 feet. Find the area of the lawn.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [figure('lot', [lot()], 440)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The lawn (green) is the **whole lot**, **without** the house (orange) and the driveway (blue).' }],
      lines: [
        { say: 'Here is Perry\'s lot, 120 feet by 100 feet.', show: 'lot.lot' },
        { say: 'The house sits on it, 50 feet by 40 feet.', show: 'lot.house' },
        { say: 'And so does the driveway, 20 feet by 30 feet.', show: 'lot.drive' },
        { say: 'Grass cannot grow under the house or on the driveway. So the lawn is the whole lot without those two rectangles.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A_{\\text{rectangle}} = L \\times W', 'A_{\\text{lawn}} = A_{\\text{lot}} - A_{\\text{house}} - A_{\\text{driveway}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Take away areas', md: 'For a shape with pieces **cut out**, find the big area, then **subtract** the area of each piece.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is length times width.', show: 'f.0' },
        { say: 'The lawn is the area of the lot, minus the area of the house, minus the area of the driveway.', show: 'f.1' },
        { say: 'When a shape has pieces cut out, find the big area, then subtract the area of each piece.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the area of the **lot**', 'Find the areas of the **house** and the **driveway**', '**Subtract** them from the lot'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the whole lot.', show: 'plan.0' },
        { say: 'Find the areas of the house and the driveway.', show: 'plan.1' },
        { say: 'Then subtract them from the lot.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The lot',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A_{\\text{lot}} = 120 \\times 100 = \\good{12{,}000 \\text{ sq ft}}'] }],
      lines: [
        { say: 'Step one. The lot is 120 feet by 100 feet. 120 times 100 is 12,000 square feet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The house and driveway',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A_{\\text{house}} = 50 \\times 40 = 2{,}000 \\text{ sq ft}', 'A_{\\text{driveway}} = 20 \\times 30 = 600 \\text{ sq ft}'] }],
      lines: [
        { say: 'Step two. The house is 50 by 40, which is 2,000 square feet.', show: 'm.0' },
        { say: 'The driveway is 20 by 30, which is 600 square feet.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12{,}000 - 2{,}000 - 600 = \\good{9{,}400 \\text{ sq ft}}'] }],
      lines: [
        { say: 'Step three. Take both away from the lot: 12,000 minus 2,000 is 10,000, and minus 600 is 9,400. The lawn is 9,400 square feet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9{,}400 + 2{,}000 + 600 = 12{,}000 \\ \\checkmark', '\\tfrac{9{,}400}{12{,}000} \\approx 78\\% \\text{ of the lot is lawn}'] }],
      lines: [
        { say: 'Let us check by adding the pieces back. The lawn, the house and the driveway together are 9,400 plus 2,000 plus 600, which is 12,000 square feet, the whole lot.', show: 'm.0' },
        { say: 'And the lawn is about 78 percent of the lot, which matches the picture: most of the lot is grass. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$12{,}000$ sq ft', 'that is the **whole lot**: take the house and driveway away'],
            ['$10{,}000$ sq ft', 'forgot the **driveway**'],
            ['$(120 - 50 - 20) \\times (100 - 40 - 30)$', 'subtract **areas**, not lengths'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12,000 square feet is the whole lot. The house and the driveway must be taken away.' },
        { say: '10,000 square feet forgets the driveway.' },
        { say: 'And do not subtract the lengths and then multiply. Find each area first, then subtract the areas.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangular yard is $60$ ft by $40$ ft. It has a rectangular pool, $20$ ft by $10$ ft, and a square patio, $12$ ft on each side. What area is left for grass?',
          choices: ['$2{,}400$ sq ft', '$2{,}200$ sq ft', '$2{,}152$ sq ft', '$2{,}056$ sq ft'],
          answer: 3,
          working: '$2{,}400 - 200 - 144 = 2{,}056$ sq ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular yard is 60 feet by 40 feet. It has a pool, 20 feet by 10 feet, and a square patio, 12 feet on each side. What area is left for grass? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The yard is 2,400 square feet. The pool is 200 and the patio is 12 times 12, which is 144. 2,400 minus 200 minus 144 is 2,056 square feet. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split the shape into **simple** shapes', 'Find the **big** area', '**Subtract** the area of each piece cut out', 'Check by adding the pieces back'] }],
      lines: [
        { say: 'Here is what to remember. Split a composite shape into simple shapes, like rectangles.', show: 'sum.0' },
        { say: 'Find the big area.', show: 'sum.1' },
        { say: 'Subtract the area of each piece that is cut out.', show: 'sum.2' },
        { say: 'And check by adding the pieces back. For more on composite and irregular shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
