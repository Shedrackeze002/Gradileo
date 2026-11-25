import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 1.3 (proportions and unit analysis). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions and their
// Applications, CC BY-NC-SA 4.0). Concentrate to water is 3 : 5, so 3/5 = 12/x, 3x = 60 and
// x = 20 ounces of water, and 12 + 20 = 32 ounces of solution, as in the book's answer.
// Check: 12/20 = 0.6 = 3/5.

/** Batches of the mix side by side (four unless you say): in each, 3 ounces of concentrate under 5 ounces of water. */
const batches = (count = 4, height = 360): DiagramEl => {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  for (let b = 0; b < count; b++) {
    const x = b * 2.2;
    for (let k = 0; k < 8; k++) {
      const id = `b${b}c${k}`;
      points[`${id}a`] = [x, k];
      points[`${id}b`] = [x + 1.4, k];
      points[`${id}c`] = [x + 1.4, k + 0.9];
      points[`${id}d`] = [x, k + 0.9];
      items.push({ kind: 'region', id, points: [`${id}a`, `${id}b`, `${id}c`, `${id}d`], tone: k < 3 ? 'opp' : 'adj', shade: 0.75, group: `b${b}` });
    }
  }
  points.cl = [-0.2, 1.4];
  points.wl = [-0.2, 5.4];
  items.push({ kind: 'label', id: 'cl', at: 'cl', tex: '3 \\text{ oz concentrate}', tone: 'opp', place: 'left', group: 'b0' });
  items.push({ kind: 'label', id: 'wl', at: 'wl', tex: '5 \\text{ oz water}', tone: 'adj', place: 'left', group: 'b0' });
  return { kind: 'diagram', id: 'mix', height, points, items };
};

const QUESTION =
  'Mixing a concentrate. Sam bought a large bottle of concentrated cleaning solution at the warehouse store. He must mix the concentrate with water to make a solution for washing his windows. The directions tell him to mix 3 ounces of concentrate with 5 ounces of water. If he puts 12 ounces of concentrate in a bucket, how many ounces of water should he add? How many ounces of the solution will he have altogether?';

const video: Explainer = {
  id: 'xq-m203-1-3',
  lessonId: '',
  exam: {
    lesson: 'm203-1-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Mixing a Cleaning Concentrate (Proportions)',
  thumbnailTitle: 'How Much Water Goes In?',
  thumbnail: 'mix',
  summary:
    'A real test question, solved one small step at a time: the directions say to mix 3 ounces of cleaning concentrate with 5 ounces of water. Sam puts 12 ounces of concentrate in a bucket. How much water should he add, and how much solution will he have? We set up the proportion 3/5 = 12/x, cross-multiply to get 3x = 60, so x = 20 ounces of water, and 12 + 20 = 32 ounces of solution. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Water Goes In?', subtitle: 'Proportions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about proportions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Mixing a concentrate. Sam bought a large bottle of concentrated cleaning solution at the warehouse store. He must mix the concentrate with water to make a solution for washing his windows. The directions tell him to mix $3$ ounces of concentrate with $5$ ounces of water. If he puts $12$ ounces of concentrate in a bucket, how many ounces of water should he add? How many ounces of the solution will he have altogether?',
          answer: '$20$ oz of water, and $32$ oz of solution',
          working: '$\\dfrac{3}{5} = \\dfrac{12}{x}$, so $3x = 60$ and $x = 20$; $12 + 20 = 32$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Sam must mix a cleaning concentrate with water to wash his windows. The directions say to mix 3 ounces of concentrate with 5 ounces of water.' },
        { say: 'He puts 12 ounces of concentrate in a bucket. How many ounces of water should he add? And how many ounces of solution will he have altogether?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [batches(1), { kind: 'text', id: 't', size: 'md', md: 'The mix must keep the **same ratio** of concentrate to water, however much Sam makes.' }],
      lines: [
        { say: 'One batch of the mix is 3 ounces of concentrate, in orange, with 5 ounces of water, in blue.', show: ['mix', 'mix.b0'] },
        { say: 'Sam has more concentrate than that, so he is making a bigger batch. The mix must keep the same ratio of concentrate to water.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{a}{b} = \\dfrac{c}{d} \\quad \\Rightarrow \\quad a \\times d = b \\times c'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Keep the same order', md: 'Write **both** ratios as concentrate over water. Then **cross-multiply** to solve for the unknown.' },
      ],
      lines: [
        { say: 'Here is what we need. A proportion says that two ratios are equal. In a proportion, the cross products are equal: a times d equals b times c.', show: 'f' },
        { say: 'Write both ratios in the same order, here concentrate over water. Then cross-multiply to find the unknown.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**', '**Cross-multiply** and solve for the water', '**Add** for the total'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion.', show: 'plan.0' },
        { say: 'Cross-multiply, and solve for the water.', show: 'plan.1' },
        { say: 'Then add the concentrate and the water for the total.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\text{concentrate}}{\\text{water}}: \\qquad \\dfrac{3}{5} = \\dfrac{12}{x}'] }],
      lines: [
        { say: 'Step one. Let x be the ounces of water Sam needs. Concentrate over water is 3 over 5 in the directions, and 12 over x in Sam\'s bucket. So 3 over 5 equals 12 over x.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Cross-multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times x = 5 \\times 12', '3x = 60', 'x = \\dfrac{60}{3} = \\good{20 \\text{ oz of water}}'] }],
      lines: [
        { say: 'Step two. Cross-multiply: 3 times x equals 5 times 12.', show: 'm.0' },
        { say: 'So 3 x equals 60.', show: 'm.1' },
        { say: 'Divide both sides by 3. x is 20. Sam should add 20 ounces of water.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The total',
      layout: 'center',
      main: [batches(), { kind: 'math', id: 'm', size: 'md', lines: ['12 + 20 = \\good{32 \\text{ oz of solution}}'] }],
      lines: [
        { say: 'Step three. Here it is as batches. 12 ounces of concentrate is 4 batches of 3, so the water is 4 batches of 5, which is 20 ounces.', show: ['mix', 'mix.b0', 'mix.b1', 'mix.b2', 'mix.b3'] },
        { say: 'Altogether, Sam has 12 plus 20, which is 32 ounces of solution.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{12}{20} = 0.6, \\qquad \\dfrac{3}{5} = 0.6 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 12 over 20 is 0.6, and 3 over 5 is 0.6 too. The ratio is the same. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$14$ oz of water', '**added** $9$ to each: a ratio **multiplies**'],
            ['$7.2$ oz of water', 'wrote $\\dfrac{5}{3} = \\dfrac{12}{x}$: keep the **same order**'],
            ['$17$ oz in all', 'used $5$ oz of water: that was for $3$ oz only'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '14 ounces adds 9 to both amounts, because 12 is 9 more than 3. But a ratio grows by multiplying: 12 is 4 times 3, so the water is 4 times 5.' },
        { say: '7.2 ounces writes the second ratio upside down. Keep concentrate over water in both.' },
        { say: 'And 17 ounces adds just 5 ounces of water. That was the water for 3 ounces of concentrate, not 12.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A floor cleaner says to mix $2$ ounces of concentrate with $7$ ounces of water. How much water goes with $8$ ounces of concentrate?',
          choices: ['$13$ oz', '$28$ oz', '$2.3$ oz', '$36$ oz'],
          answer: 1,
          working: '$\\dfrac{2}{7} = \\dfrac{8}{x}$, so $2x = 56$ and $x = 28$ oz.',
        },
      ],
      lines: [
        { say: 'Your turn. A floor cleaner says to mix 2 ounces of concentrate with 7 ounces of water. How much water goes with 8 ounces of concentrate? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 over 7 equals 8 over x. Cross-multiply: 2 x equals 56, so x is 28 ounces. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A mix keeps the **same ratio**', 'Write both ratios in the **same order**', '**Cross-multiply** and solve', 'The total is **both** parts added'] }],
      lines: [
        { say: 'Here is what to remember. A mix keeps the same ratio, however much you make.', show: 'sum.0' },
        { say: 'Write both ratios in the same order.', show: 'sum.1' },
        { say: 'Cross-multiply, and solve for the unknown.', show: 'sum.2' },
        { say: 'And the total is both parts added together. For more on proportions and unit analysis, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
