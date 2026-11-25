import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from '@/content/math9/videos/lib/m9-6-figures.ts';

// Exam question for Math 9 lesson 6.5 (solving linear inequalities). The question is a Try It from
// OpenStax Elementary Algebra 2e, word for word (section 3.6, Solve Applications with Linear
// Inequalities, CC BY-NC-SA 4.0). Let t be the number of texts: 28.80 + 0.20t ≤ 50, so 0.20t ≤ 21.20
// and t ≤ 106. Check: 106 texts cost 28.80 + 21.20 = $50.00; 107 cost $50.20, over the limit.

const QUESTION =
  'Taleisha’s phone plan costs her $28.80 a month plus $0.20 per text message. How many text messages can she use and keep her monthly phone bill no more than $50?';

const line = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: 100,
        max: 110,
        every: 2,
        boundary: { value: 106, closed: true, dir: 'left', tone: 'good' },
        marks: [{ id: 'over', value: 107, tex: '\\$50.20', tone: 'bad' }],
      }),
    ],
    240,
  );

const video: Explainer = {
  id: 'xq-m9-6-5',
  lessonId: '',
  exam: {
    lesson: 'm9-6-5',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 3.6, Solve Applications with Linear Inequalities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/3-6-solve-applications-with-linear-inequalities',
    question: QUESTION,
  },
  title: 'Exam Question: Text Messages on a Budget (Solving Linear Inequalities)',
  thumbnailTitle: 'Text Messages on a Budget',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Taleisha’s phone plan costs $28.80 a month plus $0.20 per text message. How many text messages can she use and keep her monthly bill no more than $50? With t texts, the bill is 28.80 + 0.20t, and "no more than" means ≤: 28.80 + 0.20t ≤ 50. Subtracting 28.80 gives 0.20t ≤ 21.20, and dividing by 0.20 gives t ≤ 106. She can send no more than 106 text messages. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Text Messages on a Budget', subtitle: 'Solving linear inequalities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving linear inequalities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Taleisha’s phone plan costs her \\$28.80 a month plus \\$0.20 per text message. How many text messages can she use and keep her monthly phone bill no more than \\$50?',
          answer: 'no more than $106$ text messages',
          working: '28.80 + 0.20t ≤ 50, so 0.20t ≤ 21.20',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Taleisha\'s phone plan costs her 28 dollars and 80 cents a month, plus 20 cents per text message. How many text messages can she use and keep her monthly phone bill no more than 50 dollars?', caption: 'Taleisha’s phone plan costs her $28.80 a month plus $0.20 per text message. How many text messages can she use and keep her monthly phone bill no more than $50?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{bill} = 28.80 + 0.20t', '\\text{"no more than } 50\\text{"}: \\ \\text{bill} \\le 50'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'No more than', md: '"**No more than** \\$50" means \\$50 **or less**. That is an inequality, $\\le$, not an equation.' },
      ],
      lines: [
        { say: 'With "t" text messages, the bill is the 28 dollars 80 for the month, plus 20 cents for each text.', caption: 'With t text messages, the bill is the $28.80 for the month, plus $0.20 for each text.', show: 'm.0' },
        { say: '"No more than 50 dollars" means 50 dollars or less. That is the less than or equal to sign.', caption: '"No more than $50" means $50 or less. That is the ≤ sign.', show: ['m.1', 'c'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{solve an inequality like an equation}', '\\text{multiply or divide by a } \\textbf{negative} \\text{: flip the sign}'] }],
      lines: [
        { say: 'Here is what we need. We solve an inequality just like an equation: do the same thing to both sides.', show: 'm.0' },
        { say: 'The one difference: if we multiply or divide both sides by a negative number, we must flip the inequality sign. Here, every number is positive, so the sign stays.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Write** the inequality', 'Subtract, then **divide**', 'Answer in **whole** text messages'] }],
      lines: [
        { say: 'Here is the plan. Write the inequality.', show: 'plan.0' },
        { say: 'Subtract, then divide, to get "t" on its own.', show: 'plan.1' },
        { say: 'Then answer in whole text messages.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Write, solve, answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['28.80 + 0.20t \\le 50', '0.20t \\le 50 - 28.80 = 21.20', 't \\le \\dfrac{21.20}{0.20} = \\good{106}'] }],
      lines: [
        { say: 'Step one. The bill must be no more than 50: 28.80 plus 0.20 "t" is less than or equal to 50.', show: 'st.0', focus: 'st.0' },
        { say: 'Step two. Subtract 28.80 from both sides. 50 minus 28.80 is 21.20. So 0.20 "t" is less than or equal to 21.20.', show: 'st.1', focus: 'st.1' },
        { say: 'Divide both sides by 0.20, a positive number, so the sign stays the same. 21.20 divided by 0.20 is the same as 2 thousand 120 divided by 20, which is 106.', show: 'st.2', focus: 'st.2' },
        { say: 'Step three. "t" is less than or equal to 106. Taleisha can send no more than 106 text messages.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 480,
      left: [line('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['106: \\ 28.80 + 21.20 = 50.00 \\ \\checkmark', '107: \\ 28.80 + 21.40 = 50.20', '50.20 > 50'] }],
      lines: [
        { say: 'Let us check. Here are the solutions on a number line: 106 and every number below it.', show: ['ck.axis', 'ck.dot', 'ck.ray'] },
        { say: '106 texts cost 106 times 20 cents, which is 21 dollars 20. Plus 28 dollars 80 is exactly 50 dollars. That is allowed.', caption: '106 texts cost 106 × $0.20 = $21.20. Plus $28.80 is exactly $50.00. That is allowed.', show: 'm.0', focus: 'm.0' },
        { say: 'But 107 texts would make the bill 50 dollars 20, which is more than 50. So 106 is the most. It checks out.', caption: 'But 107 texts would make the bill $50.20, which is more than $50. So 106 is the most. It checks out.', show: ['m.1', 'm.2', 'ck.over'], focus: ['m.2', 'ck.over'] },
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
            ['$250$', 'forgot the \\$28.80: subtract it **first**'],
            ['$t \\ge 106$', '"no more than" is $\\le$: at **most** $106$'],
            ['$107$', 'one text too many: the bill would be \\$50.20'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '250 divides the whole 50 dollars by 20 cents. It forgets the 28 dollars 80 she pays every month. Subtract that first.', caption: '250 divides the whole $50 by $0.20. It forgets the $28.80 she pays every month. Subtract that first.' },
        { say: 'Greater than or equal to 106 has the sign the wrong way. "No more than" means at most, so less than or equal to.' },
        { say: 'And 107 is one text too many. The bill would be 50 dollars 20.', caption: 'And 107 is one text too many. The bill would be $50.20.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $-3x > 12$.',
          choices: ['$x > -4$', '$x < 4$', '$x < -4$', '$x > 4$'],
          answer: 2,
          working: 'Divide by −3 and flip the sign: x < −4.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: negative 3 "x" is greater than 12. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide both sides by negative 3. Because it is negative, flip the sign. 12 divided by negative 3 is negative 4. So "x" is less than negative 4. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"No more than" means $\\le$', 'Solve like an **equation**', 'Divide by a **negative**: flip the sign', 'Check the boundary and **one past it**'] }],
      lines: [
        { say: 'Here is what to remember. "No more than" means less than or equal to.', show: 'sum.0' },
        { say: 'Solve an inequality like an equation.', show: 'sum.1' },
        { say: 'But if you multiply or divide by a negative, flip the sign.', show: 'sum.2' },
        { say: 'And check the boundary value, and one value past it. For more on solving linear inequalities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
