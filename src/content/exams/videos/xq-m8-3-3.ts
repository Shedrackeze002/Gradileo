import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rateLine } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 3.3 (proportional reasoning). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions and their Applications,
// CC BY-NC-SA 4.0). 240/16 = c/20, so c = 20 × 15 = 300 calories (15 calories an ounce).

const QUESTION =
  'Marissa loves the Caramel Macchiato at the coffee shop. The 16 oz. medium size has 240 calories. How many calories will she get if she drinks the large 20 oz. size?';

const drink = (id: string, large: string, unit = false) =>
  figure(
    id,
    [
      rateLine({
        max: 20,
        length: 11,
        titles: ['\\text{ounces}', '\\text{calories}'],
        marks: [
          ...(unit ? [{ id: 'one', at: 1, top: '1', bottom: '15', tone: 'theta' as const }] : []),
          { id: 'med', at: 16, top: '16', bottom: '240' },
          { id: 'lg', at: 20, top: '20', bottom: large, tone: 'good' as const },
        ],
      }),
    ],
    240,
  );

const video: Explainer = {
  id: 'xq-m8-3-3',
  lessonId: '',
  exam: {
    lesson: 'm8-3-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Calories in a Larger Drink (Proportional Reasoning)',
  thumbnailTitle: 'Calories in a Larger Drink',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: the 16 oz. medium Caramel Macchiato has 240 calories. How many calories are in the large 20 oz. size? Calories grow in proportion to the size, so we write the proportion 240/16 = c/20. Each ounce has 240 ÷ 16 = 15 calories, so 20 ounces have 20 × 15 = 300 calories. Then we check by cross-multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Calories in a Larger Drink', subtitle: 'Proportional reasoning, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about proportional reasoning. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Marissa loves the Caramel Macchiato at the coffee shop. The $16$ oz. medium size has $240$ calories. How many calories will she get if she drinks the large $20$ oz. size?',
          answer: '$300$ calories',
          working: '240/16 = c/20, c = 300',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Marissa loves the caramel macchiato at the coffee shop. The 16 ounce medium size has 240 calories. How many calories will she get if she drinks the large 20 ounce size?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [drink('ask', '?'), { kind: 'callout', id: 'c', tone: 'definition', title: 'In proportion', md: 'A **caramel macchiato** is a coffee drink. The same drink in a bigger cup has more calories **in proportion**: every ounce has the **same** number of calories. We want the calories in $20$ ounces.' }],
      lines: [
        { say: 'A caramel macchiato is a coffee drink. 16 ounces of it has 240 calories.', show: ['ask.lines', 'ask.med'] },
        { say: 'The large cup holds the same drink, so every ounce has the same number of calories. The calories grow in proportion to the size. How many are in 20 ounces?', show: ['ask.lg', 'c'], focus: 'ask.lg' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{240 \\text{ calories}}{16 \\text{ oz}} = \\dfrac{c \\text{ calories}}{20 \\text{ oz}}', '\\text{keep the same units in the same places}'] }],
      lines: [
        { say: 'Here is what we need. A proportion says two rates are equal: 240 calories for 16 ounces is the same rate as "c" calories for 20 ounces.', show: 'm.0' },
        { say: 'Keep the same units in the same places: calories on top, and ounces on the bottom, on both sides.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**', 'Find the **unit rate**: calories in one ounce', '**Multiply** by $20$ ounces'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion.', show: 'plan.0' },
        { say: 'Find the unit rate: the calories in one ounce.', show: 'plan.1' },
        { say: 'Then multiply by 20 ounces.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Proportion, unit rate, answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{240}{16} = \\dfrac{c}{20}', '240 \\div 16 = \\thc{15} \\text{ calories per ounce}', 'c = 20 \\times 15 = \\good{300 \\text{ calories}}'] }],
      lines: [
        { say: 'Step one. Calories over ounces: 240 over 16 equals "c" over 20.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 240 divided by 16 is 15. Each ounce has 15 calories.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 20 ounces have 20 times 15 calories, which is 300. Marissa gets 300 calories from the large size.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [drink('ck', '300', true), { kind: 'math', id: 'm', size: 'md', lines: ['240 \\times 20 = 4800, \\quad 16 \\times 300 = 4800 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. On the double number line, 1 ounce has 15 calories, 16 ounces have 240, and 20 ounces have 300.', show: ['ck.lines', 'ck.one', 'ck.med', 'ck.lg'] },
        { say: 'Cross-multiply the proportion. 240 times 20 is 4 thousand 800, and 16 times 300 is also 4 thousand 800. The cross products are equal. It checks out.', caption: 'Cross-multiply the proportion. 240 × 20 = 4,800, and 16 × 300 = 4,800. The cross products are equal. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$244$', 'added $4$, because the cup is $4$ oz bigger: **multiply** by the rate'],
            ['$192$', 'paired $240$ with $20$ oz: keep each size with **its own** calories'],
            ['$4{,}800$', 'multiplied $240 \\times 20$: then divide by $16$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '244 adds 4, because the cup is 4 ounces bigger. But each extra ounce adds 15 calories, not 1.' },
        { say: '192 pairs the 240 calories with the 20 ounce cup. Keep each size with its own calories: 240 goes with 16 ounces. Besides, a bigger drink must have more calories, not fewer.' },
        { say: 'And 4 thousand 800 is 240 times 20. That is only part of the work: divide by 16 to finish.', caption: 'And 4,800 is 240 × 20. That is only part of the work: divide by 16 to finish.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $12$ oz smoothie has $180$ calories. How many calories are in an $8$ oz smoothie of the same kind?',
          choices: ['$120$', '$176$', '$270$', '$90$'],
          answer: 0,
          working: '180 ÷ 12 = 15 calories an ounce, and 8 × 15 = 120.',
        },
      ],
      lines: [
        { say: 'Your turn. A 12 ounce smoothie has 180 calories. How many calories are in an 8 ounce smoothie of the same kind? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '180 divided by 12 is 15 calories an ounce. 8 times 15 is 120. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write a **proportion**: two equal rates', 'Same units in the **same places**', 'Find the **unit rate**, then multiply', 'Check: **cross products** are equal'] }],
      lines: [
        { say: 'Here is what to remember. A proportion says two rates are equal.', show: 'sum.0' },
        { say: 'Keep the same units in the same places.', show: 'sum.1' },
        { say: 'Find the unit rate, then multiply.', show: 'sum.2' },
        { say: 'And check that the cross products are equal. For more on proportional reasoning, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
