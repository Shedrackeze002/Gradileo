import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 3.1 (rates of change and tangent lines). The question is an
// exercise from OpenStax Calculus Volume 1 (section 3.1, Defining the Derivative, CC BY-NC-SA
// 4.0), word for word without the "[T]" mark, with its parts lettered (a) and (b) and the four
// intervals (i) to (iv). s(4) = 128 − 4 = 124; the average velocities are 61.7244, 61.0725,
// 61.0072 and 61.0007 ft/s, heading to 61 ft/s, as in the book's answers. Check: from the left,
// [3.999, 4] gives 60.9928 ft/s.

const QUESTION =
  'The position in feet of a race car along a straight track after t seconds is modeled by the function s(t) = 8t² − (1/16)t³. (a) Find the average velocity of the vehicle over the following time intervals to four decimal places: (i) [4, 4.1] (ii) [4, 4.01] (iii) [4, 4.001] (iv) [4, 4.0001]. (b) Use a. to draw a conclusion about the instantaneous velocity of the vehicle at t = 4 seconds.';

const S = (t: number) => 8 * t * t - t ** 3 / 16;
const g = plane({ x: [0, 10], y: [0, 800], xStep: 1, yStep: 100, every: 2, width: 9, height: 7, titles: { x: 't\\ (\\text{s})', y: 's\\ (\\text{ft})' } });

/** The position graph, a secant from t = 4 to t = 8, and the tangent at t = 4. */
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 's', f: S, from: 0, to: 10, tone: 'adj' }),
      polyline(g, { id: 'sec', points: [[4, S(4)], [8, S(8)]], tone: 'opp', dashed: true }),
      polyline(g, { id: 'tan', points: [[2, S(4) - 122], [8, S(4) + 244]], tone: 'theta' }),
      dots(g, [
        { id: 'p', x: 4, y: S(4), tex: '(4, 124)', tone: 'theta', place: 'below right' },
        { id: 'q', x: 8, y: S(8), tex: '(8, 480)', tone: 'opp', place: 'above left' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-3-1',
  lessonId: '',
  exam: {
    lesson: 'm31-3-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.1, Defining the Derivative',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative',
    question: QUESTION,
  },
  title: 'Exam Question: A Race Car’s Velocity at 4 Seconds (Average and Instantaneous Rates of Change)',
  thumbnailTitle: 'How Fast at Exactly 4 Seconds?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a race car’s position is s(t) = 8t² − t³/16 feet after t seconds. (a) Find its average velocity over [4, 4.1], [4, 4.01], [4, 4.001] and [4, 4.0001]. (b) Use them to find its instantaneous velocity at 4 seconds. Each average velocity is the slope of a secant line: 61.7244, 61.0725, 61.0072 and 61.0007 ft/s. As the interval shrinks, they head to 61 ft/s, the slope of the tangent line. Then we check from the other side and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast at Exactly 4 Seconds?', subtitle: 'Rates of change, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about average and instantaneous rates of change. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The position in feet of a race car along a straight track after $t$ seconds is modeled by the function $s(t) = 8t^2 - \\dfrac{1}{16}t^3$. (a) Find the average velocity of the vehicle over the following time intervals to four decimal places: (i) $[4, 4.1]$ (ii) $[4, 4.01]$ (iii) $[4, 4.001]$ (iv) $[4, 4.0001]$. (b) Use a. to draw a conclusion about the instantaneous velocity of the vehicle at $t = 4$ seconds.',
          answer: '(a) $61.7244$, $61.0725$, $61.0072$, $61.0007$ ft/s (b) about $61$ ft/s',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The position in feet of a race car along a straight track after t seconds is s of t equals 8 t squared minus one sixteenth of t cubed.' },
        { say: 'Part "a": find the average velocity, to four decimal places, from 4 seconds to 4.1, to 4.01, to 4.001, and to 4.0001 seconds. Part b: use part "a" to draw a conclusion about the instantaneous velocity at 4 seconds.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'An **average** velocity is the slope of a **secant** line. As the interval shrinks, the secant turns into the **tangent**, whose slope is the velocity **at** $t = 4$.' }],
      lines: [
        { say: 'Here is the car\'s position against time.', show: ['g.grid', 'g.axes', 'g.s'] },
        { say: 'An average velocity is the slope of a secant line, joining two points on the graph. Here is the one from 4 seconds to 8 seconds.', show: ['g.p', 'g.q', 'g.sec'] },
        { say: 'As the second point slides towards the first, the secant turns into the tangent line at 4 seconds. Its slope is the velocity at that instant. That is what part b wants.', show: ['g.tan', 't'], focus: 'g.tan' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['v_{\\text{avg}} = \\dfrac{s(b) - s(a)}{b - a}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Instantaneous velocity', md: 'Shrink the interval. The average velocities head to the **instantaneous** velocity.' },
      ],
      lines: [
        { say: 'Here is what we need. The average velocity from time "a" to time b is the change in position over the change in time.', show: 'f' },
        { say: 'As the interval shrinks, the average velocities head to the instantaneous velocity.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $s(4)$ once', 'For each interval, find $s(b)$, then **change in $s$ over change in $t$**', 'See what number the averages **head to**'] }],
      lines: [
        { say: 'Here is the plan. Find the position at 4 seconds once.', show: 'plan.0' },
        { say: 'For each interval, find the position at the end, then the change in position over the change in time.', show: 'plan.1' },
        { say: 'Then see what number the averages head to.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The first interval',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s(4) = 8(16) - \\dfrac{64}{16} = 128 - 4 = 124', 's(4.1) = 8(16.81) - \\dfrac{68.921}{16} = 130.1724375', 'v_{\\text{avg}} = \\dfrac{130.1724375 - 124}{0.1} = \\good{61.7244 \\text{ ft/s}}'] }],
      lines: [
        { say: 'Step one. At 4 seconds: 8 times 16 is 128, and 4 cubed over 16 is 64 over 16, which is 4. So the car is at 124 feet.', show: 'm.0' },
        { say: 'At 4.1 seconds: 8 times 16.81, minus 68.921 over 16. That is 130.1724375 feet.', show: 'm.1' },
        { say: 'The change in position is 6.1724375 feet, over 0.1 seconds. The average velocity is 61.7244 feet per second, to four decimal places.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Shrink the interval',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Interval', '$s(b)$ (ft)', 'Average velocity (ft/s)'],
          rows: [
            ['$[4, 4.1]$', '$130.1724375$', '$61.7244$'],
            ['$[4, 4.01]$', '$124.6107249$', '$61.0725$'],
            ['$[4, 4.001]$', '$124.0610072$', '$61.0072$'],
            ['$[4, 4.0001]$', '$124.0061001$', '$61.0007$'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Do the same for each interval, with a calculator.', show: 'tab' },
        { say: 'From 4 to 4.01, the average is 61.0725. From 4 to 4.001, it is 61.0072. And from 4 to 4.0001, it is 61.0007 feet per second.' },
      ],
    },
    {
      chapter: 'Step 3: The instantaneous velocity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['61.7244, \\ 61.0725, \\ 61.0072, \\ 61.0007 \\ \\to \\ \\good{61}', 'v(4) \\approx \\good{61 \\text{ ft/s}}'] }],
      lines: [
        { say: 'Step three, part b. Look at the averages as the interval shrinks. Each one has an extra 0 after the 61.', show: 'm.0' },
        { say: 'So they are heading to 61. At exactly 4 seconds, the car is travelling at about 61 feet per second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['[3.999, 4]: \\ \\dfrac{124 - 123.9390073}{0.001} = 60.9928', '60.9928 < 61 < 61.0007 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check from the other side. From 3.999 to 4 seconds, the average velocity is 60.9928 feet per second.', show: 'm.0' },
        { say: 'Just before 4, it is a little under 61, and just after 4, it is a little over. Both sides head to 61. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{s(4.1)}{4.1}$', 'velocity uses the **change** in $s$ and the **change** in $t$'],
            ['Dividing by $4.1$, not $0.1$', 'the time **interval** is $4.1 - 4 = 0.1$'],
            ['Rounding $s(b)$ early', 'tiny differences matter: round only at the **end**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Position over time is not velocity here. Use the change in position over the change in time.' },
        { say: 'The time interval is 4.1 minus 4, which is 0.1, not 4.1.' },
        { say: 'And keep every decimal until the end. On short intervals, the differences are tiny, so early rounding ruins them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ball’s distance is $s(t) = 3t^2$ metres after $t$ seconds. What is its average velocity over $[2, 2.1]$?',
          choices: ['$12$ m/s', '$1.23$ m/s', '$13.23$ m/s', '$12.3$ m/s'],
          answer: 3,
          working: '$\\dfrac{s(2.1) - s(2)}{0.1} = \\dfrac{13.23 - 12}{0.1} = 12.3$ m/s',
        },
      ],
      lines: [
        { say: 'Your turn. A ball\'s distance is 3 t squared metres after t seconds. What is its average velocity from 2 to 2.1 seconds? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'At 2.1 seconds, it is at 13.23 metres, and at 2 seconds, at 12. The change is 1.23 metres over 0.1 seconds: 12.3 metres per second. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Average rate $= \\dfrac{\\text{change in } s}{\\text{change in } t}$: a **secant** slope', 'Shrink the interval towards the point', 'The averages head to the **instantaneous** rate', 'That is the slope of the **tangent** line'] }],
      lines: [
        { say: 'Here is what to remember. An average rate of change is the change in output over the change in input: the slope of a secant line.', show: 'sum.0' },
        { say: 'Shrink the interval towards the point.', show: 'sum.1' },
        { say: 'The averages head to the instantaneous rate of change.', show: 'sum.2' },
        { say: 'That is the slope of the tangent line. For more on rates of change and tangent lines, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
