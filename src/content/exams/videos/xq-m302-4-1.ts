import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 4.1 (equivalent rational expressions). The question is an
// exercise from OpenStax Elementary Algebra 2e, word for word (section 8.1, Simplify Rational
// Expressions, CC BY-NC-SA 4.0), with its set's instruction in front of it. y² − 2y − 3 = (y − 3)(y + 1)
// and y² − 9 = (y − 3)(y + 3), so the expression simplifies to (y + 1)/(y + 3), as in the book's
// answer, with the non-permissible values y ≠ 3 and y ≠ −3 that Math 30-2 asks for. The check puts
// y = 1 into both forms.

const QUESTION = 'Simplify. (y² − 2y − 3)/(y² − 9)';

const video: Explainer = {
  id: 'xq-m302-4-1',
  lessonId: '',
  exam: {
    lesson: 'm302-4-1',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 8.1, Simplify Rational Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/8-1-simplify-rational-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify (y² − 2y − 3)/(y² − 9) (Equivalent Rational Expressions)',
  thumbnailTitle: 'Simplify a Rational Expression',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: simplify (y² − 2y − 3)/(y² − 9). We factor the top into (y − 3)(y + 1) and the bottom into (y − 3)(y + 3), note that y cannot be 3 or −3, and divide out the common factor y − 3. The answer is (y + 1)/(y + 3), with y ≠ ±3. Then we check with y = 1 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify a Rational Expression', subtitle: 'Equivalent rational expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify. $\\dfrac{y^2 - 2y - 3}{y^2 - 9}$',
          answer: '$\\dfrac{y + 1}{y + 3}$, $\\ y \\ne 3, \\ y \\ne {-3}$',
          working: 'Factor: $\\dfrac{(y - 3)(y + 1)}{(y - 3)(y + 3)}$, then divide out $y - 3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Simplify y squared minus 2 y minus 3, over y squared minus 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Write an **equivalent** expression with no common factors left between the top and the bottom. In Math 30-2 we also state the **non-permissible values**: the values of $y$ that make the bottom zero.' }],
      lines: [
        { say: 'We need an equivalent expression with no common factors left between the top and the bottom.', show: 't' },
        { say: 'And we also state the non-permissible values: the values of y that would make the bottom zero.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fac', tone: 'key', title: 'Only factors cancel', md: '$\\dfrac{a \\cdot c}{b \\cdot c} = \\dfrac{a}{b}$, where $c \\ne 0$. Terms that are **added** never cancel.' },
        { kind: 'math', id: 'dos', size: 'lg', lines: ['y^2 - 9 = (y - 3)(y + 3)'] },
      ],
      lines: [
        { say: 'Here is what we need. A factor that multiplies the whole top and the whole bottom can be divided out, as long as it is not zero. Terms that are added never cancel.', show: 'fac' },
        { say: 'And y squared minus 9 is a difference of squares: y minus 3, times y plus 3.', show: 'dos' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the top and the bottom', 'Find the **non-permissible** values', 'Divide out the **common factor**'] }],
      lines: [
        { say: 'Here is the plan. First, factor the top and the bottom.', show: 'plan.0' },
        { say: 'Second, find the non-permissible values.', show: 'plan.1' },
        { say: 'Third, divide out the common factor.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y^2 - 2y - 3 = (y - 3)(y + 1)', 'y^2 - 9 = (y - 3)(y + 3)', '\\dfrac{y^2 - 2y - 3}{y^2 - 9} = \\dfrac{(y - 3)(y + 1)}{(y - 3)(y + 3)}'] }],
      lines: [
        { say: 'Step one. For the top, we need two numbers that multiply to negative 3 and add to negative 2: negative 3 and 1. So the top is y minus 3, times y plus 1.', show: 'm.0' },
        { say: 'The bottom is a difference of squares: y minus 3, times y plus 3.', show: 'm.1' },
        { say: 'So the expression is the product of y minus 3 and y plus 1, over the product of y minus 3 and y plus 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Non-permissible values',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(y - 3)(y + 3) = 0 \\ \\Rightarrow \\ y = 3 \\text{ or } y = {-3}', '\\good{y \\ne 3, \\ y \\ne {-3}}'] }],
      lines: [
        { say: 'Step two. The bottom is zero when y minus 3 is zero or y plus 3 is zero: y equals 3 or negative 3.', show: 'm.0' },
        { say: 'So y cannot be 3 or negative 3. We find these before cancelling, while both factors are still there.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\bad{(y - 3)}(y + 1)}{\\bad{(y - 3)}(y + 3)}', '= \\good{\\dfrac{y + 1}{y + 3}}, \\quad y \\ne 3, \\ y \\ne {-3}'] }],
      lines: [
        { say: 'Step three. y minus 3 is a factor of the whole top and the whole bottom, so it divides out.', show: 'm.0' },
        { say: 'The simplified expression is y plus 1, over y plus 3, with y not equal to 3 or negative 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 1: \\quad \\dfrac{1 - 2 - 3}{1 - 9} = \\dfrac{-4}{-8} = \\dfrac{1}{2}', '\\dfrac{1 + 1}{1 + 3} = \\dfrac{2}{4} = \\dfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with y equals 1, which is allowed. The original gives 1 minus 2 minus 3, which is negative 4, over 1 minus 9, which is negative 8. That is one half.', show: 'm.0' },
        { say: 'Our answer gives 2 over 4, which is also one half. The two expressions agree, so it checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{-2y - 3}{-9}$', '$y^2$ is a **term**, not a factor: it cannot cancel'],
            ['only $y \\ne {-3}$', '$y = 3$ is still not allowed in the **original**'],
            ['$\\dfrac{y + 1}{y + 3} = \\dfrac{1}{3}$', 'the $y$\'s are **added**, so they do not cancel'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Crossing out the y squared terms is not allowed. They are added terms, not factors.' },
        { say: 'Do not drop y equals 3 just because its factor cancelled. The original expression is still undefined there.' },
        { say: 'And y plus 1 over y plus 3 does not simplify to one third. The y\'s are added, so they do not cancel.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $\\dfrac{x^2 - 4}{x^2 + 5x + 6}$.',
          choices: ['$\\dfrac{x + 2}{x + 3}$', '$\\dfrac{x - 2}{x + 3}$', '$\\dfrac{-4}{5x + 6}$', '$\\dfrac{x - 2}{x + 2}$'],
          answer: 1,
          working: '$\\dfrac{(x - 2)(x + 2)}{(x + 2)(x + 3)} = \\dfrac{x - 2}{x + 3}$, $\\ x \\ne {-2}, \\ x \\ne {-3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify x squared minus 4, over x squared plus 5 x plus 6. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The top is x minus 2, times x plus 2. The bottom is x plus 2, times x plus 3. Divide out x plus 2: x minus 2 over x plus 3, choice B, with x not equal to negative 2 or negative 3.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor** the top and the bottom fully', 'Find the non-permissible values **before** cancelling', 'Divide out **factors** only, never added terms', 'Check with an allowed value'] }],
      lines: [
        { say: 'Here is what to remember. Factor the top and the bottom fully.', show: 'sum.0' },
        { say: 'Find the non-permissible values before cancelling.', show: 'sum.1' },
        { say: 'Divide out factors only, never terms that are added.', show: 'sum.2' },
        { say: 'And check with an allowed value. For more on equivalent rational expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
