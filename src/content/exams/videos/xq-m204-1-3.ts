import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 1.3 (ratios, rates and proportions). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions and their
// Applications, CC BY-NC-SA 4.0). 5/25 = x/45, so 25x = 225 and x = 9 ml, as in the book's answer.
// Check: 5 ml per 25 lb is 1 ml for every 5 lb, and 45 ÷ 5 = 9.

const QUESTION =
  'Pediatricians prescribe 5 milliliters (ml) of acetaminophen for every 25 pounds of a child’s weight. How many milliliters of acetaminophen will the doctor prescribe for Jocelyn, who weighs 45 pounds?';

const video: Explainer = {
  id: 'xq-m204-1-3',
  lessonId: '',
  exam: {
    lesson: 'm204-1-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: A Dose for a Child’s Weight (Ratios, Rates and Proportions)',
  thumbnailTitle: 'The Right Dose for Jocelyn',
  summary:
    'A real test question, solved one small step at a time: doctors prescribe 5 ml of acetaminophen for every 25 pounds of a child’s weight. How much for Jocelyn, who weighs 45 pounds? We set up the proportion 5/25 = x/45, cross-multiply to get 25x = 225, and divide: x = 9 ml. Then we check with a unit rate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Right Dose for Jocelyn', subtitle: 'Proportions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with a proportion. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Pediatricians prescribe $5$ milliliters (ml) of acetaminophen for every $25$ pounds of a child’s weight. How many milliliters of acetaminophen will the doctor prescribe for Jocelyn, who weighs $45$ pounds?',
          answer: '$9$ ml',
          working: '5/25 = x/45, so 25x = 225 and x = 9',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Doctors for children prescribe 5 millilitres of acetaminophen for every 25 pounds of a child’s weight. How many millilitres will the doctor prescribe for Jocelyn, who weighs 45 pounds?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'r', tone: 'definition', title: 'A rate', md: '"$5$ ml for every $25$ pounds" is a **rate**: it compares millilitres with pounds. The dose grows **in step** with the weight.' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same rate for Jocelyn', md: 'Jocelyn gets the **same rate**: some number of ml for her $45$ pounds.' },
      ],
      lines: [
        { say: '5 millilitres for every 25 pounds is a rate. It compares millilitres with pounds, and the dose grows in step with the weight.', show: 'r' },
        { say: 'Jocelyn gets the same rate: some number of millilitres, for her 45 pounds. That is what we want to find.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{b} = \\dfrac{c}{d} \\ \\Rightarrow \\ a \\times d = b \\times c'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A proportion', md: 'A **proportion** says two ratios are equal. Keep the **same units** in the same places: millilitres on top, pounds on the bottom.' },
      ],
      lines: [
        { say: 'Here is what we need. A proportion says that two ratios are equal. To solve one, cross-multiply: a times d equals b times c.', show: 'm' },
        { say: 'Keep the same units in the same places in both ratios: millilitres on top, and pounds on the bottom.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**', '**Cross-multiply**', '**Divide** to find $x$'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion.', show: 'plan.0' },
        { say: 'Cross-multiply.', show: 'plan.1' },
        { say: 'Then divide to find the dose.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Solve the proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5 \\text{ ml}}{25 \\text{ lb}} = \\dfrac{x \\text{ ml}}{45 \\text{ lb}}', '25x = 5 \\times 45 = 225', 'x = 225 \\div 25 = \\good{9 \\text{ ml}}'] }],
      lines: [
        { say: 'Step one. Let x be Jocelyn’s dose. 5 millilitres over 25 pounds equals x millilitres over 45 pounds.', show: 'm.0' },
        { say: 'Step two. Cross-multiply: 25 times x equals 5 times 45, which is 225.', show: 'm.1' },
        { say: 'Step three. Divide both sides by 25. 225 divided by 25 is 9. The doctor will prescribe 9 millilitres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\text{ ml per } 25 \\text{ lb} = 1 \\text{ ml per } 5 \\text{ lb}', '45 \\div 5 = 9 \\text{ ml} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a unit rate. 5 millilitres for every 25 pounds is the same as 1 millilitre for every 5 pounds.', show: 'm.0' },
        { say: '45 pounds is 9 groups of 5 pounds, so Jocelyn gets 9 millilitres. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$225$ ml', 'stopped after **cross-multiplying**: divide by $25$'],
            ['$25$ ml', '**added** $20$ because $45$ is $20$ more than $25$: rates **multiply**'],
            ['$1.8$ ml', 'found $45 \\div 25$, the **weight ratio**, not the dose'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '225 millilitres stops after cross-multiplying. Divide by 25 to finish.' },
        { say: '25 millilitres adds 20, because 45 pounds is 20 more than 25 pounds. But the dose grows by multiplying, not by adding the same number.' },
        { say: 'And 1.8 is 45 divided by 25. That says Jocelyn is 1.8 times as heavy, so multiply it by the 5 millilitres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At the same rate of $5$ ml for every $25$ pounds, how much acetaminophen would a doctor prescribe for a child who weighs $70$ pounds?',
          choices: ['$14$ ml', '$350$ ml', '$2.8$ ml', '$17.5$ ml'],
          answer: 0,
          working: '$\\frac{5}{25} = \\frac{x}{70}$, so $25x = 350$ and $x = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. At the same rate of 5 millilitres for every 25 pounds, how much would a doctor prescribe for a child who weighs 70 pounds? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '25 x equals 5 times 70, which is 350. 350 divided by 25 is 14 millilitres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A rate compares **two units**', 'Proportion: two **equal** ratios', 'Same units in the **same places**', '**Cross-multiply**, then divide'] }],
      lines: [
        { say: 'Here is what to remember. A rate compares two different units.', show: 'sum.0' },
        { say: 'A proportion says two ratios are equal.', show: 'sum.1' },
        { say: 'Keep the same units in the same places.', show: 'sum.2' },
        { say: 'Then cross-multiply and divide. For more on ratios, rates and proportions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
