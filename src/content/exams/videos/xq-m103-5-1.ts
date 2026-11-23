import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 5.1 (area of common shapes). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.6, Area, CC BY-NC-SA 4.0). The 9-inch
// pizza has area π(4.5)² ≈ 63.62 in², so it costs $10.99 ÷ 63.62 ≈ $0.173 per square inch; the
// 15-inch pizza has area π(7.5)² ≈ 176.71 in², so $14.99 ÷ 176.71 ≈ $0.085 per square inch. The
// 15-inch pizza is the better value, as in the book's answer. Check: it has about 2.8 times the
// pizza for about 1.4 times the price.

/** The two pizzas, drawn to scale, each with its diameter. */
function pizzas(): Part {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  const pie = (name: string, cx: number, r: number, label: string, tone: 'opp' | 'adj') => {
    const ring: string[] = [];
    for (let i = 0; i < 48; i++) {
      const a = (2 * Math.PI * i) / 48;
      points[`${name}${i}`] = [cx + r * Math.cos(a), r * Math.sin(a)];
      ring.push(`${name}${i}`);
    }
    points[`${name}L`] = [cx - r, 0];
    points[`${name}R`] = [cx + r, 0];
    items.push(
      { kind: 'region', id: `${name}-fill`, points: ring, tone, shade: 0.22, group: name },
      { kind: 'curve', id: `${name}-edge`, points: ring, closed: true, tone, group: name },
      { kind: 'line', id: `${name}-d`, from: `${name}L`, to: `${name}R`, tone: 'theta', dashed: true, label, labelSide: 'left', group: `${name}-dia` },
    );
  };
  pie('small', 0, 4.5, '9 \\text{ in}', 'opp');
  pie('big', 14, 7.5, '15 \\text{ in}', 'adj');
  return { points, items };
}

const QUESTION = 'You can buy a 9-inch diameter pizza for $10.99, or a 15-inch diameter pizza for $14.99. Which pizza is the better value?';

const video: Explainer = {
  id: 'xq-m103-5-1',
  lessonId: '',
  exam: {
    lesson: 'm103-5-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.6, Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area',
    question: QUESTION,
  },
  title: 'Exam Question: Which Pizza Is the Better Value? (Area of Common Shapes)',
  thumbnailTitle: 'Which Pizza Is the Better Value?',
  thumbnail: 'pz',
  summary:
    'A real test question, solved one small step at a time: a 9-inch pizza costs $10.99 and a 15-inch pizza costs $14.99. Which is the better value? We find each area with A = πr², using the radius, half the diameter: about 63.6 and 176.7 square inches. Then we find the cost of one square inch: about $0.17 for the small pizza and about $0.08 for the large one, so the 15-inch pizza is the better value. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Pizza Is the Better Value?', subtitle: 'Area of common shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about area. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You can buy a $9$-inch diameter pizza for \\$10.99, or a $15$-inch diameter pizza for \\$14.99. Which pizza is the better value?',
          answer: 'The $15$-inch pizza',
          working: 'about \\$0.17 per sq in against about \\$0.08 per sq in',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You can buy a 9-inch pizza for 10 dollars 99, or a 15-inch pizza for 14 dollars 99. The inches measure the diameter, the distance across. Which pizza is the better value?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        figure('pz', [pizzas()], 330),
        { kind: 'text', id: 't', size: 'md', md: 'You pay for the **pizza**, which is its **area**. Better value means **less money for each square inch**.' },
      ],
      lines: [
        { say: 'Here are the two pizzas, drawn to scale. The small one is 9 inches across.', show: ['pz.small', 'pz.small-dia'] },
        { say: 'The large one is 15 inches across. Look how much more pizza it has.', show: ['pz.big', 'pz.big-dia'] },
        { say: 'What you eat is the area of the pizza. So the better value is the pizza that costs less for each square inch.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = \\pi r^2, \\quad r = \\tfrac{1}{2} \\times \\text{diameter}', '\\text{cost per sq in} = \\dfrac{\\text{price}}{\\text{area}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Radius, not diameter', md: 'The formula uses the **radius**, which is **half** the diameter.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a circle is pi r squared, where r is the radius, half the diameter.', show: 'f.0' },
        { say: 'And the cost of one square inch is the price divided by the area.', show: 'f.1' },
        { say: 'Be careful: the formula uses the radius, not the diameter.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find each **area**', 'Find each **cost per square inch**', '**Compare**: the lower cost wins'] }],
      lines: [
        { say: 'Here is the plan. Find the area of each pizza.', show: 'plan.0' },
        { say: 'Find what each pizza costs per square inch.', show: 'plan.1' },
        { say: 'Then compare. The lower cost per square inch is the better value.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The areas',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9\\text{-inch: } r = 4.5, \\ A = \\pi(4.5)^2 \\approx 63.6 \\text{ in}^2', '15\\text{-inch: } r = 7.5, \\ A = \\pi(7.5)^2 \\approx 176.7 \\text{ in}^2'] }],
      lines: [
        { say: 'Step one. The 9-inch pizza has a radius of 4.5 inches. Pi times 4.5 squared is about 63.6 square inches.', show: 'm.0' },
        { say: 'The 15-inch pizza has a radius of 7.5 inches. Pi times 7.5 squared is about 176.7 square inches.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Cost per square inch',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9\\text{-inch: } \\dfrac{\\$10.99}{63.6} \\approx \\$0.173 \\text{ per in}^2', '15\\text{-inch: } \\dfrac{\\$14.99}{176.7} \\approx \\$0.085 \\text{ per in}^2'] }],
      lines: [
        { say: 'Step two. For the small pizza, 10.99 divided by 63.6 is about 0.173. That is about 17 cents for each square inch.', show: 'm.0' },
        { say: 'For the large pizza, 14.99 divided by 176.7 is about 0.085. That is about 8 and a half cents for each square inch.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$0.085 < \\$0.173', '\\good{\\text{The 15-inch pizza is the better value}}'] }],
      lines: [
        { say: 'Step three. 8 and a half cents is less than 17 cents.', show: 'm.0' },
        { say: 'So the 15-inch pizza is the better value. Each square inch costs about half as much.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pizza: } 176.7 \\div 63.6 \\approx 2.8 \\text{ times as much}', '\\text{price: } 14.99 \\div 10.99 \\approx 1.4 \\text{ times as much} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. The large pizza has 176.7 divided by 63.6, about 2.8 times as much pizza.', show: 'm.0' },
        { say: 'But it costs only about 1.4 times as much. Nearly three times the pizza for less than one and a half times the price is a better deal. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\pi \\times 9^2$', 'use the **radius**, $4.5$, not the diameter'],
            ['"\\$10.99 is cheaper"', 'compare the cost **per square inch**'],
            ['$15$ is $1\\tfrac{2}{3}$ times $9$', 'the **area** grows faster: about $2.8$ times'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The area formula needs the radius. Use 4.5, not 9.' },
        { say: 'The cheaper pizza is not always the better value. Compare what you pay for each square inch.' },
        { say: 'And 15 inches is only about one and two thirds times 9 inches across, but the area is about 2.8 times as big. When a circle gets wider, its area grows much faster.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $10$-inch pizza costs \\$8 and a $14$-inch pizza costs \\$14. Which is the better value?',
          choices: ['The $10$-inch: it is cheaper', 'They are the same value', 'The $14$-inch: about \\$0.09 per sq in', 'The $10$-inch: about \\$0.08 per sq in'],
          answer: 2,
          working: '$\\pi(5)^2 \\approx 78.5$, so \\$8 ÷ 78.5 ≈ \\$0.102. $\\pi(7)^2 \\approx 153.9$, so \\$14 ÷ 153.9 ≈ \\$0.091.',
        },
      ],
      lines: [
        { say: 'Your turn. A 10-inch pizza costs 8 dollars and a 14-inch pizza costs 14 dollars. Which is the better value? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The 10-inch pizza has an area of about 78.5 square inches, so it costs about 10 cents a square inch. The 14-inch pizza has about 153.9 square inches, so about 9 cents a square inch. The 14-inch is the better value. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circle: $A = \\pi r^2$, with $r$ **half** the diameter', 'Cost per unit $=$ price $\\div$ area', 'The **lower** cost per square inch is the better value', 'Wider circles have **much** more area'] }],
      lines: [
        { say: 'Here is what to remember. The area of a circle is pi r squared, and the radius is half the diameter.', show: 'sum.0' },
        { say: 'The cost per square inch is the price divided by the area.', show: 'sum.1' },
        { say: 'The lower cost per square inch is the better value.', show: 'sum.2' },
        { say: 'And a wider circle has much more area than you might think. For more on the area of common shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
