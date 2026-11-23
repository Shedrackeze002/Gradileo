import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 6.3 (logarithms and the laws of logarithms). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 6.5, Logarithmic Properties,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. The power rule turns ½log(y) into
// log(√y) and 3log(z) into log(z³); the product and quotient rules then give log(xz³/√y), as in the
// book's answer. The check uses x = 10, y = 100 and z = 10, where both sides equal 3.

const QUESTION =
  'Condense each expression to a single logarithm using the properties of logarithms. log(x) − ½log(y) + 3log(z)';

const video: Explainer = {
  id: 'xq-m302-6-3',
  lessonId: '',
  exam: {
    lesson: 'm302-6-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.5, Logarithmic Properties',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-5-logarithmic-properties',
    question: QUESTION,
  },
  title: 'Exam Question: Condense log(x) − ½log(y) + 3log(z) (Logarithms and the Laws of Logarithms)',
  thumbnailTitle: 'Condense to One Logarithm',
  thumbnail: 'laws',
  summary:
    'A real test question, solved one small step at a time: condense log(x) − ½log(y) + 3log(z) to a single logarithm. The power rule moves the numbers in front up into exponents, the product rule joins the logs that are added, and the quotient rule puts the one that is subtracted underneath: log(xz³/√y). Then we check with numbers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Condense to One Logarithm', subtitle: 'The laws of logarithms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the laws of logarithms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Condense each expression to a single logarithm using the properties of logarithms. $\\log(x) - \\tfrac{1}{2}\\log(y) + 3\\log(z)$',
          answer: '$\\log\\left(\\dfrac{xz^3}{\\sqrt{y}}\\right)$',
          working: 'Power rule first, then product and quotient rules.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Condense each expression to a single logarithm using the properties of logarithms. Log x, minus one half log y, plus 3 log z.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'There are **three** logarithms now. "Condense" means: write the whole thing as **one** logarithm, $\\log(\\ldots)$.' }],
      lines: [
        { say: 'Right now there are three separate logarithms.', show: 't' },
        { say: 'Condense means we squeeze them together into just one logarithm.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'laws',
          head: ['Law', 'In symbols'],
          rows: [
            ['Power', '$k\\log(M) = \\log(M^k)$'],
            ['Product', '$\\log(M) + \\log(N) = \\log(MN)$'],
            ['Quotient', '$\\log(M) - \\log(N) = \\log\\left(\\dfrac{M}{N}\\right)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: three laws of logarithms.', show: 'laws' },
        { say: 'The power law. A number in front of a log can move up to be an exponent inside.' },
        { say: 'The product law. Two logs added together become the log of a product.' },
        { say: 'And the quotient law. One log minus another becomes the log of a quotient, with the subtracted one underneath.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Power** law: move the numbers in front up', '**Product** law: join the logs that are **added**', '**Quotient** law: put the **subtracted** log underneath'] }],
      lines: [
        { say: 'Here is the plan. First, use the power law to move the numbers in front up into exponents.', show: 'plan.0' },
        { say: 'Second, use the product law to join the logs that are added.', show: 'plan.1' },
        { say: 'Third, use the quotient law to put the subtracted log underneath.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Power law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{2}\\log(y) = \\log\\left(y^{1/2}\\right) = \\good{\\log\\left(\\sqrt{y}\\right)}', '3\\log(z) = \\good{\\log\\left(z^3\\right)}', '\\log(x) - \\log\\left(\\sqrt{y}\\right) + \\log\\left(z^3\\right)'] }],
      lines: [
        { say: 'Step one. The one half moves up as an exponent: log of y to the power one half. And y to the power one half is the square root of y.', show: 'm.0' },
        { say: 'The 3 moves up too: log of z cubed.', show: 'm.1' },
        { say: 'Now there are no numbers in front: log x, minus log root y, plus log z cubed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Product law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\log(x) + \\log\\left(z^3\\right) = \\good{\\log\\left(xz^3\\right)}'] }],
      lines: [
        { say: 'Step two. Log x and log z cubed are both added, so the product law joins them: log of x z cubed.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Quotient law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\log\\left(xz^3\\right) - \\log\\left(\\sqrt{y}\\right)', '= \\good{\\log\\left(\\dfrac{xz^3}{\\sqrt{y}}\\right)}'] }],
      lines: [
        { say: 'Step three. What is left is log of x z cubed, minus log of root y.', show: 'm.0' },
        { say: 'The quotient law puts the subtracted one underneath: log of x z cubed over the square root of y. That is one logarithm.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 10, \\ y = 100, \\ z = 10', '\\log 10 - \\tfrac{1}{2}\\log 100 + 3\\log 10 = 1 - 1 + 3 = 3', '\\log\\left(\\dfrac{10 \\cdot 1000}{10}\\right) = \\log(1000) = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with easy numbers: x equals 10, y equals 100, and z equals 10.', show: 'm.0' },
        { say: 'The original: log 10 is 1, half of log 100 is half of 2, which is 1, and 3 log 10 is 3. That is 1 minus 1 plus 3, which is 3.', show: 'm.1' },
        { say: 'Our answer: 10 times 1,000, over the square root of 100, which is 10, gives 1,000. And log 1,000 is 3. Both give 3, so it checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$\\log\\left(x - \\sqrt{y} + z^3\\right)$', 'adding logs **multiplies**, subtracting logs **divides**'],
            ['$\\tfrac{1}{2}\\log(y) = \\log\\left(\\dfrac{y}{2}\\right)$', 'the $\\tfrac{1}{2}$ becomes an **exponent**: $\\sqrt{y}$'],
            ['$\\log\\left(xz^3\\sqrt{y}\\right)$', 'the **subtracted** log goes **underneath**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not just drop the log signs and keep the pluses and minuses. Adding logs multiplies the insides, and subtracting logs divides them.' },
        { say: 'One half log y is not log of y over 2. The one half becomes an exponent, which is the square root.' },
        { say: 'And the root of y was subtracted, so it goes on the bottom, not the top.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Condense $2\\log(x) + \\log(y) - \\log(z)$ to a single logarithm.',
          choices: ['$\\log\\left(\\dfrac{x^2 y}{z}\\right)$', '$\\log\\left(\\dfrac{2xy}{z}\\right)$', '$\\log\\left(x^2 + y - z\\right)$', '$\\log\\left(\\dfrac{x^2}{yz}\\right)$'],
          answer: 0,
          working: '$2\\log(x) = \\log\\left(x^2\\right)$; add $\\log(y)$: $\\log\\left(x^2 y\\right)$; subtract $\\log(z)$: divide by $z$.',
        },
      ],
      lines: [
        { say: 'Your turn. Condense 2 log x, plus log y, minus log z, to a single logarithm. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The 2 moves up: log x squared. Adding log y multiplies: log x squared y. Subtracting log z divides. So the answer is log of x squared y over z: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Power law **first**: numbers in front become exponents', 'Added logs: **multiply** the insides', 'Subtracted logs: **divide**, the subtracted one underneath', 'Check with easy numbers like $10$ and $100$'] }],
      lines: [
        { say: 'Here is what to remember. Use the power law first, so the numbers in front become exponents.', show: 'sum.0' },
        { say: 'Logs that are added: multiply what is inside.', show: 'sum.1' },
        { say: 'Logs that are subtracted: divide, with the subtracted one underneath.', show: 'sum.2' },
        { say: 'And check with easy numbers like 10 and 100. For more on logarithms and the laws of logarithms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
