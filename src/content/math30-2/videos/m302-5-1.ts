import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { panels } from './lib/m302-5-graphs.ts';

// The three kinds of polynomial function in this lesson, side by side.
const shapes = panels({
  x: [-4, 4],
  y: [-6, 6],
  size: 4.4,
  gap: 6.2,
  list: [
    { name: 'p1', f: (x) => 0.5 * x + 3, caption: 'y = 0.5x + 3', sub: '\\text{degree 1: linear}' },
    { name: 'p2', f: (x) => x * x - 4, caption: 'y = x^2 - 4', sub: '\\text{degree 2: quadratic}' },
    { name: 'p3', f: (x) => 0.25 * x ** 3 - 2 * x, caption: 'y = 0.25x^3 - 2x', sub: '\\text{degree 3: cubic}' },
  ],
});

const video: Explainer = {
  id: 'm302-5-1',
  lessonId: 'm302-5-1',
  title: 'Characteristics of Polynomial Functions, Part 1: Degree and Leading Coefficient',
  thumbnailTitle: 'Polynomial Functions',
  thumbnail: false,
  summary: 'What a polynomial function is, the linear, quadratic and cubic functions and their graphs, and reading the degree, leading coefficient and constant term of y = 4 + 3x − 2x³ after writing it from the highest power down. Part 2 covers end behaviour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 1', title: 'Polynomial Functions', subtitle: 'Degree, leading coefficient and constant term' }],
      lines: [
        { say: 'A straight line, a parabola and an S-shaped curve look very different. But all three belong to one family of equations: polynomial functions.', show: 'title' },
        { say: 'In this video, you will learn what a polynomial function is, meet the three kinds in this lesson, and read the degree, the leading coefficient and the constant term straight from an equation.' },
      ],
    },
    {
      chapter: 'Polynomial functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polynomial function', md: 'A function whose terms are whole-number powers of $x$ with real coefficients, such as $y = 4 + 3x - 2x^3$.' },
        { kind: 'table', id: 't', head: ['Polynomial functions', 'Not polynomial functions'], rows: [['$y = 2x + 1$', '$y = \\sqrt{x}$'], ['$y = x^2 - 4$', '$y = \\dfrac{1}{x}$'], ['$y = 4 + 3x - 2x^3$', '$y = 2^x$']] },
      ],
      lines: [
        { say: 'A polynomial function is a function whose terms are whole-number powers of x. Each power is multiplied by a real number, called its coefficient.', show: 'def' },
        { say: 'For example, y equals four, plus three x, minus two x cubed. Its terms are four, three x, and negative two x cubed. Four is four times x to the power zero, and three x is three times x to the power one. So the powers are zero, one and three: all whole numbers.' },
        { say: 'y equals two x plus one is a polynomial function. But y equals the square root of x is not. The square root of x is x to the power one half, which is not a whole number.', show: 't.0', focus: 't.0' },
        { say: 'y equals x squared minus four is a polynomial function. But y equals one over x is not, because one over x is x to the power negative one.', show: 't.1', focus: 't.1' },
        { say: 'And y equals four, plus three x, minus two x cubed is a polynomial function. But y equals two to the power x is not, because there the x is in the exponent.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Degree and names',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Degree', md: 'The **degree** of a polynomial function is the highest power of $x$ in it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Degree', 'Name', 'Standard form', 'Graph'],
          rows: [
            ['$1$', 'linear', '$y = ax + b$', 'straight line'],
            ['$2$', 'quadratic', '$y = ax^2 + bx + c$', 'parabola'],
            ['$3$', 'cubic', '$y = ax^3 + bx^2 + cx + d$', 'S-shaped curve'],
          ],
        },
      ],
      lines: [
        { say: 'The degree of a polynomial function is the highest power of x in it. In this lesson, the degree is at most three, so there are three kinds to know.', show: 'def' },
        { say: 'Degree one is linear. Its standard form is y equals "a" x plus b, and its graph is a straight line.', show: 't.0', focus: 't.0' },
        { say: 'Degree two is quadratic: y equals "a" x squared, plus b x, plus c. Its graph is a parabola.', show: 't.1', focus: 't.1' },
        { say: 'Degree three is cubic: y equals "a" x cubed, plus b x squared, plus c x, plus d. Its graph is an S-shaped curve.', show: 't.2', focus: 't.2' },
        { say: 'In each standard form, the terms go from the highest power down. The letters "a", b, c and d stand for real numbers, and "a" cannot be zero, or the highest power would disappear.', focus: 't' },
      ],
    },
    {
      chapter: 'Three shapes',
      layout: 'center',
      main: [figure('sh', [shapes])],
      lines: [
        { say: 'Here is what the three shapes look like.', show: ['sh.p1-grid', 'sh.p1-axes', 'sh.p2-grid', 'sh.p2-axes', 'sh.p3-grid', 'sh.p3-axes'] },
        { say: 'y equals 0.5 x plus three has degree one. Its graph is a straight line that rises steadily.', show: ['sh.p1-curve', 'sh.p1-text'], focus: 'sh.p1-curve' },
        { say: 'y equals x squared minus four has degree two. Its graph is a parabola, with one turn at the bottom.', show: ['sh.p2-curve', 'sh.p2-text'], focus: 'sh.p2-curve' },
        { say: 'And y equals 0.25 x cubed minus two x has degree three. Its graph is an S-shaped curve: it rises, falls, then rises again.', show: ['sh.p3-curve', 'sh.p3-text'], focus: 'sh.p3-curve' },
      ],
    },
    {
      chapter: 'Reading an equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Leading coefficient and constant term', md: 'The **leading coefficient** is the coefficient of the term with the highest power. The **constant term** is the term with no $x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 4 + 3x - 2x^3', 'y = \\opp{-2}x^{\\adj{3}} + 3x + \\good{4}', '\\text{degree } \\adj{3} \\text{ (cubic)},\\quad \\text{leading coefficient } \\opp{{-2}},\\quad \\text{constant term } \\good{4}'] },
      ],
      lines: [
        { say: 'Two more features can be read from the equation. The leading coefficient is the coefficient of the term with the highest power. The constant term is the term with no x.', show: 'def' },
        { say: 'State the degree, the leading coefficient and the constant term of y equals four, plus three x, minus two x cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'First, write it from the highest power down: y equals negative two x cubed, plus three x, plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'The highest power is x cubed, so the degree is three, and the function is cubic. The coefficient of x cubed is negative two, so the leading coefficient is negative two, sign included. And the term with no x is four, so the constant term is four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the first term written', md: 'In $y = 4 + 3x - 2x^3$ the first term is $4$, but the leading term is $-2x^3$. Always look for the highest power, wherever it is written.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\bad{4} + 3x \\opp{- 2x^3}'] },
      ],
      lines: [
        { say: 'A common mistake is to read the first term written. In y equals four, plus three x, minus two x cubed, the first term is four. But four is not the leading term.', show: ['oops', 'm.0'] },
        { say: 'The leading term is the term with the highest power, wherever it is written. Here it is negative two x cubed, at the very end. So find the highest power first, then read its coefficient.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the degree, the leading coefficient and the constant term of $y = 6 + 4x^2 - x^3$.',
          choices: ['Degree $2$, leading coefficient $4$, constant term $6$', 'Degree $3$, leading coefficient $-1$, constant term $6$', 'Degree $3$, leading coefficient $6$, constant term $4$', 'Degree $3$, leading coefficient $1$, constant term $6$'],
          answer: 1,
          working: 'From the highest power down, $y = -x^3 + 4x^2 + 6$. The degree is $3$, the coefficient of $-x^3$ is $-1$, and the constant term is $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the degree, the leading coefficient and the constant term of y equals six, plus four x squared, minus x cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. From the highest power down, the function is negative x cubed, plus four x squared, plus six. So the degree is three, and the constant term is six. Negative x cubed means negative one times x cubed, so the leading coefficient is negative one. Choice D drops the minus sign.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A polynomial function has terms that are whole-number powers of $x$.', 'The degree is the highest power: $1$ is linear, $2$ quadratic and $3$ cubic.', 'The leading coefficient multiplies the highest power; the constant term has no $x$.', 'Write the terms from the highest power down before you read them.'] }],
      lines: [
        { say: 'Let’s sum up. A polynomial function has terms that are whole-number powers of x.', show: 'sum.0' },
        { say: 'Its degree is the highest power. Degree one is linear, degree two is quadratic, and degree three is cubic.', show: 'sum.1' },
        { say: 'The leading coefficient multiplies the highest power, and the constant term is the term with no x.', show: 'sum.2' },
        { say: 'And write the terms from the highest power down before you read them. In the next part, we use the degree and the leading coefficient to tell where the ends of the graph go. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
