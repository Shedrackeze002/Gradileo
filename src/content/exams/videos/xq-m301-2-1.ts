import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 2.1 (radical functions and transformations). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 3.5, Transformation of
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. −x + 4 = −(x − 4), so
// the graph of √x is reflected in the y-axis and then shifted right 4 units, as in the book's
// answer. The end point goes from (0, 0) to (4, 0), and (4, 2) goes to (−4, 2) and then (0, 2).

const g = plane({ x: [-6.5, 6.5], y: [-1, 4], every: 2, width: 13, height: 5 });

/** y = √x (`f`), y = √(−x) (`r`, dashed), y = √(−x + 4) (`a`), with their end points and a point that moves. */
const graph = (height = 340, steps: ('r' | 'a')[] = ['r', 'a']) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (x) => Math.sqrt(x), from: 0, to: 6.5, tone: 'adj', samples: 80 }),
      ...(steps.includes('r') ? [plot(g, { id: 'r', f: (x) => Math.sqrt(-x), from: -6.5, to: 0, tone: 'opp', dashed: true, samples: 80 })] : []),
      ...(steps.includes('a') ? [plot(g, { id: 'a', f: (x) => Math.sqrt(4 - x), from: -6.5, to: 4, tone: 'good', samples: 80 })] : []),
      dots(g, [
        { id: 'p0', x: 4, y: 2, tex: '(4, 2)', tone: 'adj', place: 'above left' },
        ...(steps.includes('r') ? [{ id: 'p1', x: -4, y: 2, tex: '(-4, 2)', tone: 'opp' as const, place: 'below left' as const }] : []),
        ...(steps.includes('a') ? [{ id: 'p2', x: 0, y: 2, tex: '(0, 2)', tone: 'good' as const, place: 'above right' as const }, { id: 'e2', x: 4, y: 0, tex: '(4, 0)', tone: 'good' as const, place: 'above right' as const }] : []),
      ]),
    ],
    height,
  );

const QUESTION = 'Describe how the formula is a transformation of a toolkit function. Then sketch a graph of the transformation. a(x) = √(−x + 4)';

const video: Explainer = {
  id: 'xq-m301-2-1',
  lessonId: '',
  exam: {
    lesson: 'm301-2-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.5, Transformation of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-5-transformation-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Describe and Sketch a(x) = √(−x + 4) (Radical Functions and Transformations)',
  thumbnailTitle: 'Sketch √(−x + 4)',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: how is a(x) = √(−x + 4) a transformation of y = √x, and what does its graph look like? We factor the inside to −(x − 4), so the graph of √x is reflected in the y-axis and then shifted right 4 units. Then we sketch it, check with one point, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sketch √(−x + 4)', subtitle: 'Radical functions and transformations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about transforming a square root function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Describe how the formula is a transformation of a toolkit function. Then sketch a graph of the transformation. $a(x) = \\sqrt{-x + 4}$',
          answer: 'the graph of $y = \\sqrt{x}$ **reflected in the $y$-axis**, then **shifted right $4$**',
          working: '$-x + 4 = -(x - 4)$, so $a(x) = \\sqrt{-(x - 4)}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Describe how the formula is a transformation of a toolkit function. Then sketch a graph of the transformation. "a" of x equals the square root of negative x plus 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(300, []), { kind: 'text', id: 't', size: 'md', md: 'The toolkit function is $y = \\sqrt{x}$. We say how it was **moved**, then draw the moved graph.' }],
      lines: [
        { say: 'The toolkit function here is y equals the square root of x. It starts at the origin and curves up to the right.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'We need to say how it was moved to make "a" of x, and then draw the new graph.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'form', tone: 'key', title: 'Read it in this form', md: '$y = \\sqrt{b(x - h)}$: the $b$ stretches or reflects **horizontally**, and $h$ shifts the graph **right**. **Factor** $b$ out first.' },
        { kind: 'callout', id: 'refl', tone: 'tip', title: 'A minus on x', md: '$\\sqrt{-x}$ is $\\sqrt{x}$ reflected in the **$y$-axis**: it points **left**.' },
      ],
      lines: [
        { say: 'Here is what we need. Read the inside in the form b times x minus h. The b stretches or reflects the graph horizontally, and h shifts it right. To see h, factor b out first.', show: 'form' },
        { say: 'And a minus sign on x, like the square root of negative x, reflects the graph in the y-axis, so it points to the left.', show: 'refl' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the inside: $-x + 4 = -(x - 4)$', '**Read** the reflection, then the shift', '**Sketch**, and check with one point'] }],
      lines: [
        { say: 'Here is the plan. First, factor the inside so we can read it.', show: 'plan.0' },
        { say: 'Second, read off the reflection and then the shift.', show: 'plan.1' },
        { say: 'Third, sketch the graph and check it with one point.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Factor the inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-x + 4 = -(x - 4)', 'a(x) = \\sqrt{\\good{-}(x \\good{- 4})}'] }],
      lines: [
        { say: 'Step one. Take negative 1 out of the inside. Negative x plus 4 is negative 1 times x minus 4.', show: 'm.0' },
        { say: 'So "a" of x is the square root of negative, x minus 4. Now we can read it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Read the changes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['b = -1: \\quad \\text{reflection in the } y\\text{-axis}', 'h = 4: \\quad \\text{shift right } 4'] }],
      lines: [
        { say: 'Step two. The negative 1 reflects the graph in the y-axis.', show: 'm.0' },
        { say: 'And x minus 4 shifts it right 4 units. So the graph of the square root of x is reflected in the y-axis, then shifted right 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Sketch it',
      layout: 'center',
      main: [graph(360)],
      lines: [
        { say: 'Step three. Start with the square root of x, and follow the point at 4, 2.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.p0'], focus: 'gr.p0' },
        { say: 'Reflect in the y-axis. The curve now points left, and the point moves to negative 4, 2.', show: ['gr.r', 'gr.p1'], focus: 'gr.p1' },
        { say: 'Shift right 4. The curve now starts at 4, 0 and points left, and the point lands at 0, 2.', show: ['gr.a', 'gr.p2', 'gr.e2'], focus: 'gr.a' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a(0) = \\sqrt{-0 + 4} = 2 \\ \\checkmark', 'a(4) = \\sqrt{0} = 0, \\quad {-x} + 4 \\geq 0 \\text{ means } x \\leq 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the formula. "a" of 0 is the square root of 4, which is 2. That matches the point at 0, 2.', show: 'm.0' },
        { say: 'And "a" of 4 is 0, where the graph starts. Negative x plus 4 must not be negative, so x is at most 4. The graph only goes to the left of 4. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"shifted **left** $4$"', 'factor first: $-(x - 4)$ is a shift **right**'],
            ['shift right $4$, **then** reflect', 'that gives $\\sqrt{-x - 4}$, a different graph'],
            ['"reflected in the **$x$-axis**"', 'the minus is on $x$, **inside**: the $y$-axis'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The plus 4 does not mean left 4. Factor first: negative, x minus 4, is a shift right.' },
        { say: 'The order matters. Shifting right 4 and then reflecting would give the square root of negative x minus 4, which is a different graph.' },
        { say: 'And the minus sign is on x, inside the root, so the reflection is in the y-axis, not the x-axis.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The graph of $y = \\sqrt{x}$ is reflected in the $x$-axis and then shifted up $2$ units. Which equation gives the new graph?',
          choices: ['$y = \\sqrt{-x} + 2$', '$y = -\\sqrt{x + 2}$', '$y = -\\sqrt{x} + 2$', '$y = -\\sqrt{x - 2}$'],
          answer: 2,
          working: 'Reflect in the $x$-axis: a minus **outside**, $-\\sqrt{x}$. Up $2$: add $2$ at the end.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals the square root of x is reflected in the x-axis and then shifted up 2 units. Which equation gives the new graph? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A reflection in the x-axis puts a minus sign outside the root. Up 2 adds 2 at the end. So y equals negative root x, plus 2: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor** the inside: $\\sqrt{b(x - h)}$', '$b < 0$: reflection in the **$y$-axis**', '$x - h$: shift **right** $h$', 'Check the **end point** and one more point'] }],
      lines: [
        { say: 'Here is what to remember. Factor the inside into the form b times x minus h.', show: 'sum.0' },
        { say: 'A negative b reflects the graph in the y-axis.', show: 'sum.1' },
        { say: 'x minus h shifts it right h units.', show: 'sum.2' },
        { say: 'And check the end point and one more point. For more on radical functions and transformations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
