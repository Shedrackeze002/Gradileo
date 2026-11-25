import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 6.1 (expressions and equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 2.1, Use the Language of Algebra, CC BY-NC-SA 4.0).
// (a) 23 + 6 = 29 has an equal sign joining two expressions: an equation. (b) 7 · 3 − 7 has none:
// an expression, which we can evaluate to 14.

const QUESTION = 'Determine if each is an expression or an equation: (a) 23 + 6 = 29 (b) 7 · 3 − 7';

const video: Explainer = {
  id: 'xq-m7-6-1',
  lessonId: '',
  exam: {
    lesson: 'm7-6-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.1, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Expression or Equation? (Expressions and Equations)',
  thumbnailTitle: 'Expression or Equation?',
  summary:
    'A real test question, solved one small step at a time: is 23 + 6 = 29 an expression or an equation? And 7 · 3 − 7? An equation has an equal sign joining two expressions, and an expression has none. So (a) is an equation, a complete sentence that is true, and (b) is an expression, a phrase we can evaluate to 14. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Expression or Equation?', subtitle: 'Expressions and equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about expressions and equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine if each is an expression or an equation: (a) $23 + 6 = 29$ (b) $7 \\cdot 3 - 7$',
          answer: '(a) equation (b) expression',
          working: '(a) has an equal sign; (b) has none',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Determine if each is an expression or an equation. Part a: 23 plus 6 equals 29. Part b: 7 times 3 minus 7.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two kinds of maths writing', md: 'An **expression** is like a **phrase**: numbers, letters and operations, such as $7 \\cdot 3 - 7$. An **equation** is like a **sentence**: two expressions joined by an **equal sign**, saying they have the same value.' }],
      lines: [
        { say: 'An expression is like a phrase in English. It is made of numbers, letters and operations, like 7 times 3 minus 7.', show: 'c' },
        { say: 'An equation is like a whole sentence. It joins two expressions with an equal sign, and says that they have the same value.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['', 'Expression', 'Equation'],
          rows: [
            ['Equal sign?', '**no**', '**yes**, one $=$'],
            ['Like a…', 'phrase', 'sentence'],
            ['Example', '$4x + 1$', '$4x + 1 = 9$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The test is simple: look for an equal sign.', show: 'k' },
        { say: 'An expression has no equal sign. An equation has one, with an expression on each side.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look for an **equal sign**', 'Equal sign: **equation**', 'No equal sign: **expression**'] }],
      lines: [
        { say: 'Here is the plan. For each one, look for an equal sign.', show: 'plan.0' },
        { say: 'If there is one, it is an equation.', show: 'plan.1' },
        { say: 'If there is none, it is an expression.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Look for the equal sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } \\adj{23 + 6} \\ \\good{=} \\ \\opp{29} \\quad \\Rightarrow \\quad \\good{\\text{equation}}', '\\text{(b) } 7 \\cdot 3 - 7 \\quad \\text{no } = \\quad \\Rightarrow \\quad \\good{\\text{expression}}'] }],
      lines: [
        { say: 'Step one. Part a, 23 plus 6 equals 29. It has an equal sign, with the expression 23 plus 6 on the left and 29 on the right. So it is an equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Part b, 7 times 3 minus 7. There is no equal sign, only numbers and operations. So it is an expression.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } 23 + 6 = 29 \\text{ is a true sentence} \\ \\checkmark', '\\text{(b) } 7 \\cdot 3 - 7 = 21 - 7 = 14: \\text{ just a value} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by reading each one aloud. Part a says 23 plus 6 is 29. That is a complete sentence, and it is true. An equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Part b only names a number. Multiply first: 7 times 3 is 21, minus 7 is 14. It does not say anything about 14, so it is a phrase. An expression. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"(b) is an equation, it equals $14$"', 'we can **evaluate** it, but no $=$ is **written**'],
            ['"(a) is an expression, it has no letters"', 'letters do not decide it: the **equal sign** does'],
            ['"(b) is $-28$"', 'subtracted first, $7 \\cdot (3 - 7)$: **multiply first**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Part b has a value, 14, but that does not make it an equation. An equation must have an equal sign written in it.' },
        { say: 'An equation does not need a letter. 23 plus 6 equals 29 has no letters, but its equal sign makes it an equation.' },
        { say: 'And if you evaluate part b, multiply first. Subtracting first gives 7 times negative 4, which is negative 28. The right value is 21 minus 7, which is 14.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which one is an **equation**?',
          choices: ['$5x - 2$', '$4 + y = 11$', '$8 \\div 2 + 1$', '$3(n + 4)$'],
          answer: 1,
          working: 'Only 4 + y = 11 has an equal sign.',
        },
      ],
      lines: [
        { say: 'Your turn. Which one is an equation? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Only 4 plus "y" equals 11 has an equal sign. The other three are expressions. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Expression**: a phrase, **no** equal sign', '**Equation**: a sentence, **one** equal sign', 'Letters do **not** decide it', 'An expression can be **evaluated**'] }],
      lines: [
        { say: 'Here is what to remember. An expression is a phrase, with no equal sign.', show: 'sum.0' },
        { say: 'An equation is a sentence, with an equal sign.', show: 'sum.1' },
        { say: 'Letters do not decide which it is.', show: 'sum.2' },
        { say: 'And an expression can be evaluated to a number. For more on expressions and equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
