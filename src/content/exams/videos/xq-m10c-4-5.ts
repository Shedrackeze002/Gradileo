import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.5 (factoring ax² + bx + c by decomposition): factor
// 6x² + 7x + 2. The question is OpenStax Elementary Algebra 2e's own worked example, word for word
// ("How to Factor Trinomials Using the 'ac' Method", section 7.3, CC BY-NC-SA 4.0). The "ac"
// method is the lesson's decomposition: ac = 12 = 3 × 4 and 3 + 4 = 7, so
// 6x² + 3x + 4x + 2 = 3x(2x + 1) + 2(2x + 1) = (2x + 1)(3x + 2).

const QUESTION = 'Factor: 6x² + 7x + 2.';

const video: Explainer = {
  id: 'xq-m10c-4-5',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-5',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 7.3, Factor Trinomials of the Form ax² + bx + c',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/7-3-factor-trinomials-of-the-form-ax2-bx-c',
    question: QUESTION,
  },
  title: 'Exam Question: Factor 6x² + 7x + 2. Decomposition, the "ac" Method',
  thumbnailTitle: 'Factor 6x² + 7x + 2',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: we factor 6x² + 7x + 2, where the leading coefficient is not 1. We multiply a by c to get 12, find two numbers that multiply to 12 and add to 7, split the middle term, and factor by grouping to get (2x + 1)(3x + 2). Then we check by expanding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Factor 6x² + 7x + 2', subtitle: 'Decomposition, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factoring a trinomial whose first coefficient is not 1. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Factor: $6x^2 + 7x + 2$.', answer: '$(2x + 1)(3x + 2)$', working: '$ac = 12 = 3 \\times 4$, $3 + 4 = 7$: $6x^2 + 3x + 4x + 2 = 3x(2x + 1) + 2(2x + 1) = (2x + 1)(3x + 2)$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Factor: 6 x squared plus 7 x plus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\underbrace{6}_{a}x^2 + \\underbrace{7}_{b}x + \\underbrace{2}_{c}'] },
        { kind: 'text', id: 't', size: 'md', md: 'The **6** in front means the quick trick for $x^2 + bx + c$ does not work. We need **decomposition**.' },
      ],
      lines: [
        { say: 'This trinomial has the form a x squared plus b x plus c, with a equal to 6, b equal to 7, and c equal to 2.', show: 'm' },
        { say: 'Because a is not 1, the quick trick of finding two numbers that multiply to c no longer works. We need one more step, called decomposition. The textbook calls it the a c method.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Decomposition (the "ac" method)', md: 'Find two numbers that **multiply to** $a \\times c$ and **add to** $b$. Use them to **split** the middle term into two, then **factor by grouping**.' },
        { kind: 'math', id: 'g', size: 'md', lines: ['\\text{Grouping: } px + pq + rx + rq = p(x + q) + r(x + q) = (x + q)(p + r)'] },
      ],
      lines: [
        { say: 'Here is what we need. Find two numbers that multiply to a times c and add to b. Use them to split the middle term into two terms. Then factor by grouping.', show: 'def' },
        { say: 'Factoring by grouping means: take a common factor out of the first pair of terms and out of the second pair. If both pairs leave the same bracket, that bracket is a factor.', show: 'g' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $a \\times c$', 'Two numbers: **multiply** to $ac$, **add** to $b$', '**Split** the middle term', '**Group** and factor'] }],
      lines: [
        { say: 'Here is the plan. First, multiply a by c.', show: 'plan.0' },
        { say: 'Second, find two numbers that multiply to a c and add to b.', show: 'plan.1' },
        { say: 'Third, split the middle term with them.', show: 'plan.2' },
        { say: 'Fourth, group the terms in pairs and factor.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The two numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ac', size: 'lg', lines: ['a \\times c = 6 \\times 2 = 12'] },
        { kind: 'table', id: 't', head: ['Factors of $12$', 'Sum'], rows: [['$1,\\ 12$', '$13$'], ['$2,\\ 6$', '$8$'], ['$\\good{3,\\ 4}$', '$\\good{7}$']] },
      ],
      lines: [
        { say: 'Step one. a times c is 6 times 2, which is 12.', show: 'ac' },
        { say: 'Now list the factor pairs of 12 and their sums. 1 and 12 add to 13. 2 and 6 add to 8. 3 and 4 add to 7, which is b. So the numbers are 3 and 4.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: Split and group',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6x^2 + 7x + 2 = 6x^2 + 3x + 4x + 2', '= 3x(2x + 1) + 2(2x + 1)', '= \\good{(2x + 1)(3x + 2)}'] }],
      lines: [
        { say: 'Step two. Split the middle term, 7 x, into 3 x plus 4 x. That does not change the trinomial, because 3 x plus 4 x is 7 x.', show: 'm.0' },
        { say: 'Now group. The first pair, 6 x squared plus 3 x, has a common factor of 3 x, leaving 2 x plus 1. The second pair, 4 x plus 2, has a common factor of 2, also leaving 2 x plus 1.', show: 'm.1' },
        { say: 'Both pairs share the bracket 2 x plus 1, so take it out: 2 x plus 1, times 3 x plus 2. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(2x + 1)(3x + 2) = 6x^2 + 4x + 3x + 2 = 6x^2 + 7x + 2 \\ \\checkmark'] }],
      lines: [{ say: 'Let us check by expanding with FOIL. Firsts, 6 x squared. Outers, 4 x. Inners, 3 x. Lasts, 2. 4 x plus 3 x is 7 x, so we are back to 6 x squared plus 7 x plus 2.', show: 'm.0' }],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Expands to'],
          rows: [
            ['Factors of $c = 2$ only: $(6x + 1)(x + 2)$', '$6x^2 + 13x + 2$'],
            ['$(2x + 2)(3x + 1)$', '$6x^2 + 8x + 2$: the wrong pairing'],
            ['Stopping at $3x(2x + 1) + 2(2x + 1)$', 'still a **sum**: take out the common bracket'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using only the factors of c, as if a were 1, gives guesses like 6 x plus 1, times x plus 2. That expands to 13 x in the middle, not 7 x.' },
        { say: 'Putting the right numbers in the wrong brackets, like 2 x plus 2 times 3 x plus 1, gives 8 x in the middle.' },
        { say: 'And stopping at 3 x times 2 x plus 1, plus 2 times 2 x plus 1, is not finished. That is still a sum. Take out the common bracket to make it a product.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Factor: $2x^2 + 7x + 3$.',
          choices: ['$(2x + 3)(x + 1)$', '$(2x + 1)(x + 3)$', '$(2x + 6)(x + 1)$', '$(x + 1)(x + 6)$'],
          answer: 1,
          working: '$ac = 6 = 1 \\times 6$, $1 + 6 = 7$: $2x^2 + x + 6x + 3 = x(2x + 1) + 3(2x + 1) = (2x + 1)(x + 3)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor 2 x squared plus 7 x plus 3. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'a c is 6, and 1 and 6 multiply to 6 and add to 7. Split: 2 x squared plus x plus 6 x plus 3. Group: x times 2 x plus 1, plus 3 times 2 x plus 1. So it is 2 x plus 1, times x plus 3, choice B. A expands to 5 x in the middle, C to 8 x, and D has no 2 x squared at all.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply $a \\times c$', 'Two numbers: multiply to $ac$, add to $b$', '**Split** the middle term, then **group**', 'Check by **expanding**'] }],
      lines: [
        { say: 'Here is what to remember. When a is not 1, start by multiplying a by c.', show: 'sum.0' },
        { say: 'Find two numbers that multiply to a c and add to b.', show: 'sum.1' },
        { say: 'Split the middle term with them, then factor by grouping.', show: 'sum.2' },
        { say: 'And check by expanding. For more on factoring a x squared plus b x plus c, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
