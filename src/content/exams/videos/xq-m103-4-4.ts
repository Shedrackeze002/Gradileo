import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 4.4 (linear measurement on the job). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles,
// Triangles, and Trapezoids, Everyday Math, CC BY-NC-SA 4.0). The fence is the perimeter,
// 6 + 8 + 10 = 24 feet, and 24 × $10 = $240, as in the book's answer. Check: $240 ÷ $10 = 24 ft.

/** The flowerbed: a triangle with sides 6, 8 and 10 feet, drawn to scale. */
function bed(): Part {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [8, 0], C: [0, 6] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'soil', points: ['A', 'B', 'C'], tone: 'good', shade: 0.18 },
    { kind: 'line', id: 's6', from: 'C', to: 'A', tone: 'opp', weight: 4, label: '6 \\text{ ft}', labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 's8', from: 'A', to: 'B', tone: 'opp', weight: 4, label: '8 \\text{ ft}', labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 's10', from: 'B', to: 'C', tone: 'opp', weight: 4, label: '10 \\text{ ft}', labelSide: 'right', group: 'sides' },
  ];
  return { points, items };
}

const QUESTION =
  'Fence Christa wants to put a fence around her triangular flowerbed. The sides of the flowerbed are 6 feet, 8 feet, and 10 feet. The fence costs $10 per foot. How much will it cost for Christa to fence in her flowerbed?';

const video: Explainer = {
  id: 'xq-m103-4-4',
  lessonId: '',
  exam: {
    lesson: 'm103-4-4',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: The Cost to Fence a Triangular Flowerbed (Linear Measurement on the Job)',
  thumbnailTitle: 'What Does the Fence Cost?',
  thumbnail: 'fb',
  summary:
    'A real test question, solved one small step at a time: Christa wants to fence a triangular flowerbed with sides of 6, 8 and 10 feet, and the fence costs $10 per foot. How much will it cost? The fence goes all the way round, so we find the perimeter, 6 + 8 + 10 = 24 feet, then multiply by the price: 24 × $10 = $240. Then we check and look at the traps, such as using the area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does the Fence Cost?', subtitle: 'Linear measurement on the job, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about measuring and costing a job. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Fence Christa wants to put a fence around her triangular flowerbed. The sides of the flowerbed are $6$ feet, $8$ feet, and $10$ feet. The fence costs \\$10 per foot. How much will it cost for Christa to fence in her flowerbed?',
          answer: '\\$240',
          working: '$6 + 8 + 10 = 24$ ft, and $24 \\times \\$10$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Christa wants to put a fence around her triangular flowerbed. The sides are 6 feet, 8 feet, and 10 feet. The fence costs 10 dollars per foot. How much will it cost to fence in the flowerbed?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [figure('fb', [bed()], 360)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The fence runs along **all three sides**. The price is **per foot** of fence.' }],
      lines: [
        { say: 'Here is the flowerbed, a triangle.', show: 'fb.soil' },
        { say: 'Its sides are 6 feet, 8 feet and 10 feet.', show: 'fb.sides' },
        { say: 'The fence runs along all three sides, and we pay 10 dollars for every foot of fence.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{perimeter} = a + b + c', '\\text{cost} = \\text{length} \\times \\text{price per foot}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Length, not area', md: 'Fence is bought **by the foot**, so we need the **perimeter**, not the area.' },
      ],
      lines: [
        { say: 'Here is what we need. The perimeter of a triangle is its three sides added together.', show: 'f.0' },
        { say: 'And the cost is the length of fence times the price per foot.', show: 'f.1' },
        { say: 'Fence is bought by the foot, so we need the length round the edge, the perimeter, not the area inside.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **perimeter**', '**Multiply** by the price per foot', '**Check** the answer'] }],
      lines: [
        { say: 'Here is the plan. Find the perimeter of the flowerbed.', show: 'plan.0' },
        { say: 'Multiply by the price per foot.', show: 'plan.1' },
        { say: 'Then check the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The perimeter',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = 6 + 8 + 10 = \\good{24 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. Add the three sides: 6 plus 8 plus 10 is 24 feet. Christa needs 24 feet of fence.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24 \\text{ ft} \\times \\$10 \\text{ per ft} = \\good{\\$240}'] }],
      lines: [
        { say: 'Step two. Each foot costs 10 dollars. 24 feet times 10 dollars is 240 dollars. It will cost 240 dollars to fence in the flowerbed.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times \\$10 + 8 \\times \\$10 + 10 \\times \\$10', '= \\$60 + \\$80 + \\$100 = \\$240 \\ \\checkmark'] }],
      lines: [
        { say: 'Step three. Let us check by costing each side on its own. 6 feet cost 60 dollars, 8 feet cost 80 dollars, and 10 feet cost 100 dollars.', show: 'm.0' },
        { say: '60 plus 80 plus 100 is 240 dollars, the same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Area: $\\tfrac{1}{2} \\times 8 \\times 6 = 24$ sq ft', 'fence goes round the **edge**: use the perimeter'],
            ['$10 \\times \\$10 = \\$100$', 'fence **all three** sides, not only the longest'],
            ['Answer "$24$"', '$24$ ft is the **length**: the question asks the **cost**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The area of this triangle also happens to be 24, but in square feet. Fence goes round the edge, so we use the perimeter. Here the numbers match by luck, so always think about which one the job needs.' },
        { say: 'The fence goes along all three sides, not just the longest one.' },
        { say: 'And 24 feet is the length of fence. The question asks for the cost.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Baseboard is put along all four walls of a rectangular room $12$ ft by $9$ ft. It costs \\$3 per foot. Ignoring the door, what does it cost?',
          choices: ['\\$63', '\\$324', '\\$108', '\\$126'],
          answer: 3,
          working: '$P = 2(12) + 2(9) = 42$ ft, and $42 \\times \\$3 = \\$126$.',
        },
      ],
      lines: [
        { say: 'Your turn. Baseboard goes along all four walls of a rectangular room, 12 feet by 9 feet. It costs 3 dollars per foot. Ignoring the door, what does it cost? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The perimeter is 12 plus 9 plus 12 plus 9, which is 42 feet. 42 times 3 dollars is 126 dollars. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fence, trim and baseboard: use the **perimeter**', 'Perimeter: add **all** the sides', 'Cost $=$ length $\\times$ price per unit', 'Answer what the question **asks**'] }],
      lines: [
        { say: 'Here is what to remember. For fence, trim or baseboard, use the perimeter.', show: 'sum.0' },
        { say: 'The perimeter is all the sides added together.', show: 'sum.1' },
        { say: 'The cost is the length times the price per unit.', show: 'sum.2' },
        { say: 'And answer what the question asks: here, the cost. For more on linear measurement on the job, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
