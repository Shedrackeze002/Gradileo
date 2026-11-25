import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 1.1 (composite functions). The question is an exercise from
// OpenStax Calculus Volume 1, word for word (section 1.1, Review of Functions, CC BY-NC-SA 4.0),
// without the book's "[T]" (calculator) mark and with its parts lettered (a) to (d). r(3) =
// 6 − 5/10 = 5.5, so A(r(3)) = π(5.5)² = 121π/4 ≈ 95 cm² and C(r(3)) = 2π(5.5) = 11π ≈ 35 cm, as
// in the book's answers. Check: r(0) = 1, the 1-cm circle the question starts with.

const QUESTION =
  'A certain bacterium grows in culture in a circular region. The radius of the circle, measured in centimeters, is given by r(t) = 6 − 5/(t² + 1), where t is time measured in hours since a circle of a 1-cm radius of the bacterium was put into the culture. (a) Express the area of the bacteria as a function of time. (b) Find the exact and approximate area of the bacterial culture in 3 hours. (c) Express the circumference of the bacteria as a function of time. (d) Find the exact and approximate circumference of the bacteria in 3 hours.';

const R = 'r(t) = 6 - \\dfrac{5}{t^2 + 1}';

const video: Explainer = {
  id: 'xq-m31-1-1',
  lessonId: '',
  exam: {
    lesson: 'm31-1-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 1.1, Review of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Area of a Growing Bacteria Culture (Composite Functions)',
  thumbnailTitle: 'A Growing Circle of Bacteria',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a bacteria culture is a circle whose radius is r(t) = 6 − 5/(t² + 1) cm after t hours. (a) Write its area as a function of time. (b) Find the area at 3 hours. (c) Write its circumference as a function of time. (d) Find the circumference at 3 hours. We put r(t) inside A = πr² and C = 2πr, then use r(3) = 5.5: the area is 121π/4 ≈ 95 cm² and the circumference is 11π ≈ 35 cm. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Growing Circle of Bacteria', subtitle: 'Composite functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about composite functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A certain bacterium grows in culture in a circular region. The radius of the circle, measured in centimeters, is given by $r(t) = 6 - \\dfrac{5}{t^2 + 1}$, where $t$ is time measured in hours since a circle of a 1-cm radius of the bacterium was put into the culture. (a) Express the area of the bacteria as a function of time. (b) Find the exact and approximate area of the bacterial culture in 3 hours. (c) Express the circumference of the bacteria as a function of time. (d) Find the exact and approximate circumference of the bacteria in 3 hours.',
          answer: '(a) $A(t) = \\pi\\left(6 - \\dfrac{5}{t^2 + 1}\\right)^2$ (b) $\\dfrac{121\\pi}{4} \\approx 95$ cm² (c) $C(t) = 2\\pi\\left(6 - \\dfrac{5}{t^2 + 1}\\right)$ (d) $11\\pi \\approx 35$ cm',
          working: '$r(3) = 6 - \\dfrac{5}{10} = 5.5$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A certain bacterium grows in culture in a circular region. The radius of the circle, in centimetres, is r of t equals 6 minus 5 over the quantity t squared plus 1, where t is time measured in hours since a circle of a 1 centimetre radius of the bacterium was put into the culture.' },
        { say: 'Part "a": express the area as a function of time. Part b: find the exact and approximate area in 3 hours. Part c: express the circumference as a function of time. Part d: find the exact and approximate circumference in 3 hours.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'chain',
          head: ['Input', 'Function', 'Output'],
          rows: [
            ['time $t$', '$r(t)$', 'radius $r$'],
            ['radius $r$', '$A(r) = \\pi r^2$', 'area'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Time gives the radius, and the radius gives the area. We want **one** function that goes straight from time to area.' },
      ],
      lines: [
        { say: 'Here is the chain. Time goes into r, and out comes the radius. The radius goes into the area formula, and out comes the area.', show: 'chain' },
        { say: 'We want one function that goes straight from time to area. That is a composite function.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['(A \\circ r)(t) = A\\big(r(t)\\big)'] },
        { kind: 'callout', id: 'io', tone: 'key', title: 'Inside and outside', md: 'The **inside** function, $r$, works first. Its output becomes the **input** of the outside function, $A$.' },
      ],
      lines: [
        { say: 'Here is what we need. "A" composed with r, of t, means "A" of r of t.', show: 'f' },
        { say: 'The inside function, r, works first. Its output becomes the input of the outside function, "A".', show: 'io' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Put $r(t)$ **inside** $A = \\pi r^2$', '(b) Find $r(3)$, then the **area**', '(c), (d) The same with $C = 2\\pi r$'] }],
      lines: [
        { say: 'Here is the plan. For part "a", put r of t inside the area formula.', show: 'plan.0' },
        { say: 'For part b, find the radius at 3 hours first, then the area.', show: 'plan.1' },
        { say: 'Parts c and d are the same, with the circumference formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Area of time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A(r) = \\pi r^2', R, 'A(t) = A\\big(r(t)\\big) = \\good{\\pi\\left(6 - \\dfrac{5}{t^2 + 1}\\right)^2}'] }],
      lines: [
        { say: 'Step one, part "a". The area of a circle is pi r squared.', show: 'm.0' },
        { say: 'And the radius is r of t.', show: 'm.1' },
        { say: 'Replace r with the whole of r of t, in brackets: the area is pi times the quantity 6 minus 5 over t squared plus 1, all squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The area at 3 hours',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r(3) = 6 - \\dfrac{5}{3^2 + 1} = 6 - \\dfrac{5}{10} = 5.5', 'A = \\pi(5.5)^2 = 30.25\\pi = \\good{\\dfrac{121\\pi}{4}}', '\\approx \\good{95 \\text{ cm}^2}'] }],
      lines: [
        { say: 'Step two, part b. Work from the inside out. At 3 hours, the radius is 6 minus 5 over 3 squared plus 1, which is 6 minus 5 tenths: 5.5 centimetres.', show: 'm.0' },
        { say: 'The area is pi times 5.5 squared, which is 30.25 pi. As a fraction, that is 121 pi over 4, the exact area.', show: 'm.1' },
        { say: 'That is about 95 square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The circumference',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C(t) = C\\big(r(t)\\big) = \\good{2\\pi\\left(6 - \\dfrac{5}{t^2 + 1}\\right)}', 'C = 2\\pi(5.5) = \\good{11\\pi} \\approx \\good{35 \\text{ cm}}'] }],
      lines: [
        { say: 'Step three, part c. The circumference is 2 pi r. Put r of t inside: 2 pi times the quantity 6 minus 5 over t squared plus 1.', show: 'm.0' },
        { say: 'Part d. At 3 hours the radius is still 5.5, so the circumference is 2 pi times 5.5, which is 11 pi exactly, or about 35 centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r(0) = 6 - \\dfrac{5}{1} = 1 \\text{ cm} \\ \\checkmark', 'A = \\dfrac{C^2}{4\\pi} = \\dfrac{(11\\pi)^2}{4\\pi} = \\dfrac{121\\pi}{4} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. At time 0, the radius is 6 minus 5, which is 1 centimetre, the circle the question says was put in. So the formula fits.', show: 'm.0' },
        { say: 'And for any circle, the area is the circumference squared over 4 pi. 11 pi squared over 4 pi is 121 pi over 4, our area. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$A(3) = 9\\pi$', '$3$ is a **time**, not a radius: find $r(3)$ first'],
            ['$\\pi\\left(36 - \\dfrac{25}{(t^2 + 1)^2}\\right)$', 'squaring a difference needs **all** the terms'],
            ['$6 - \\dfrac{5}{3^2} + 1$', 'the whole $t^2 + 1$ is the **denominator**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Putting 3 straight into the area formula treats 3 hours as a radius. Find the radius at 3 hours first.' },
        { say: 'The square of a difference is not the difference of the squares. Keep the bracket, or expand it properly.' },
        { say: 'And the whole of t squared plus 1 is the denominator. At 3 hours, it is 10.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The side of a square tile grows as $s(t) = 2 + 3t$ cm. Which function gives its area as a function of time?',
          choices: ['$A(t) = 4 + 9t^2$', '$A(t) = (2 + 3t)^2$', '$A(t) = 2 + 3t^2$', '$A(t) = 4(2 + 3t)$'],
          answer: 1,
          working: '$A(s) = s^2$, so $A\\big(s(t)\\big) = (2 + 3t)^2$. ($4(2 + 3t)$ is the perimeter.)',
        },
      ],
      lines: [
        { say: 'Your turn. The side of a square tile grows as s of t equals 2 plus 3t centimetres. Which function gives its area as a function of time? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The area of a square is s squared. Put s of t inside: 2 plus 3t, all squared. That is choice B. Choice D is the perimeter.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$(f \\circ g)(x) = f\\big(g(x)\\big)$: the **inside** works first', 'Put the **whole** inside function in brackets', 'To evaluate, work from the **inside out**', 'Check with a value you already know'] }],
      lines: [
        { say: 'Here is what to remember. f composed with g, of x, is f of g of x: the inside function works first.', show: 'sum.0' },
        { say: 'Put the whole inside function in brackets.', show: 'sum.1' },
        { say: 'To evaluate, work from the inside out.', show: 'sum.2' },
        { say: 'And check with a value you already know. For more on composite functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
