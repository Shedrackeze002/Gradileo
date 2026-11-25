import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// Exam question for Math 6 lesson 5.1 (equivalent ratios and proportions). The question is an
// Everyday Math exercise from OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions
// and their Applications, CC BY-NC-SA 4.0). 2 oz of concentrate to 15 oz of water; 6 oz is 3 times
// 2 oz, so the water is 3 × 15 = 45 oz. As a proportion: 2/15 = 6/x, so 2x = 90 and x = 45.

const QUESTION =
  'Mixing a concentrate Travis is going to wash his car. The directions on the bottle of car wash concentrate say to mix 2 ounces of concentrate with 15 ounces of water. If Travis puts 6 ounces of concentrate in a bucket, how much water must he mix with the concentrate?';

const table = (id: string) =>
  figure(
    id,
    [ratioTable({ rows: ['\\text{Concentrate (oz)}', '\\text{Water (oz)}'], cols: [['2', '15'], ['6', '45']], titleWidth: 6.4, colWidth: 2.4, arrows: [{ id: 'x3', from: 0, to: 1, label: '\\times 3' }] })],
    300,
  );

const video: Explainer = {
  id: 'xq-m6-5-1',
  lessonId: '',
  exam: {
    lesson: 'm6-5-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Mixing Car Wash Concentrate (Equivalent Ratios and Proportions)',
  thumbnailTitle: 'How Much Water?',
  thumbnail: 'rt',
  summary:
    'A real test question, solved one small step at a time: the directions say to mix 2 ounces of car wash concentrate with 15 ounces of water. Travis uses 6 ounces of concentrate. How much water does he need? The ratio must stay the same, and 6 is 3 times 2, so the water is 3 times 15: 45 ounces. Then we check with a proportion and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Water?', subtitle: 'Equivalent ratios and proportions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about equivalent ratios. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Mixing a concentrate** Travis is going to wash his car. The directions on the bottle of car wash concentrate say to mix $2$ ounces of concentrate with $15$ ounces of water. If Travis puts $6$ ounces of concentrate in a bucket, how much water must he mix with the concentrate?',
          answer: '$45$ ounces of water',
          working: '6 = 3 × 2, so 3 × 15 = 45',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Travis is going to wash his car. The directions on the bottle of car wash concentrate say to mix 2 ounces of concentrate with 15 ounces of water. If Travis puts 6 ounces of concentrate in a bucket, how much water must he mix with it?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Concentrate', md: 'A **concentrate** is a strong liquid that is mixed with water before use. An **ounce** is a small amount of liquid. The mix must keep the **same ratio**: $2$ ounces of concentrate **to** $15$ ounces of water.' }],
      lines: [
        { say: 'A concentrate is a strong liquid that you mix with water before you use it. An ounce is a small amount of liquid.', show: 'c' },
        { say: 'For the mix to be right, Travis must keep the same ratio: 2 ounces of concentrate to every 15 ounces of water.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Equivalent ratios', md: 'Multiply **both** parts of a ratio by the **same** number to get an **equivalent ratio**: $2 : 15$ is the same mix as $4 : 30$ or $6 : 45$. A **proportion** says two ratios are equal.' }],
      lines: [
        { say: 'Here is what we need. If we multiply both parts of a ratio by the same number, we get an equivalent ratio. It makes the same mix, just more of it.', show: 'c' },
        { say: 'A proportion is a statement that two ratios are equal.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the ratio in a **table**', 'Find what $2$ is **multiplied** by to make $6$', 'Multiply the **water** by the same number'] }],
      lines: [
        { say: 'Here is the plan. Put the ratio in a table.', show: 'plan.0' },
        { say: 'Find what 2 is multiplied by to make 6.', show: 'plan.1' },
        { say: 'Then multiply the water by the same number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The ratio table',
      layout: 'split',
      leftWidth: 600,
      left: [table('rt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 3 = 6', '15 \\times 3 = 45', '\\text{water: } \\good{45 \\text{ oz}}'] }],
      lines: [
        { say: 'Step one. The directions give 2 ounces of concentrate for 15 ounces of water. Write them in the first column.', show: ['rt.frame', 'rt.c0'] },
        { say: 'Travis uses 6 ounces of concentrate, so write 6 in the next column.', show: 'rt.c1-t', focus: 'rt.c1-t' },
        { say: 'Step two. 2 times 3 is 6, so the concentrate was multiplied by 3.', show: ['rt.x3', 'm.0'], focus: 'm.0' },
        { say: 'Step three. To keep the same mix, multiply the water by 3 too. 15 times 3 is 45. Travis must mix in 45 ounces of water.', show: ['rt.c1-b', 'm.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{15} = \\dfrac{6}{45}', '2 \\times 45 = 90, \\quad 15 \\times 6 = 90 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a proportion. Is 2 over 15 equal to 6 over 45?', show: 'm.0' },
        { say: 'Cross multiply. 2 times 45 is 90, and 15 times 6 is 90. The cross products are equal, so the ratios are equal. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$19$ oz', '**added** $4$ to $15$: multiply, do not add'],
            ['$5$ oz', 'divided $15$ by $3$: more concentrate needs **more** water'],
            ['$51$ oz', 'added the concentrate to the water: the question asks for **water** only'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '19 ounces adds 4, because 6 is 4 more than 2. Ratios grow by multiplying, not adding.' },
        { say: '5 ounces divides instead of multiplying. More concentrate needs more water, not less.' },
        { say: 'And 51 ounces adds the 6 ounces of concentrate. The question asks only for the water.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A pancake mix uses $3$ cups of flour for every $2$ cups of milk. How much flour goes with $6$ cups of milk?',
          choices: ['$7$ cups', '$9$ cups', '$4$ cups', '$12$ cups'],
          answer: 1,
          working: '6 = 2 × 3, so the flour is 3 × 3 = 9 cups.',
        },
      ],
      lines: [
        { say: 'Your turn. A pancake mix uses 3 cups of flour for every 2 cups of milk. How much flour goes with 6 cups of milk? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The milk is multiplied by 3, from 2 to 6, so the flour is 3 times 3, which is 9 cups. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Keep the **same ratio**', 'Find the **multiplier**', 'Multiply **both** parts by it', 'Check with **cross products**'] }],
      lines: [
        { say: 'Here is what to remember. A mix keeps the same ratio.', show: 'sum.0' },
        { say: 'Find the number one part is multiplied by.', show: 'sum.1' },
        { say: 'Multiply the other part by the same number.', show: 'sum.2' },
        { say: 'And check with cross products. For more on equivalent ratios and proportions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
