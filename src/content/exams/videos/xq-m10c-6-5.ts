import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 6.5 (distance and midpoint): 10 mi east and 5 mi north to work,
// and a straight road instead. The question is an exercise from OpenStax College Algebra 2e, word
// for word (section 2.1, The Rectangular Coordinate Systems and Graphs, CC BY-NC-SA 4.0). With
// home at (0, 0) and work at (10, 5), the distance is √125 ≈ 11.2 mi; the book's next exercise
// gives 15 − 11.2 = 3.8 mi shorter.

/** Home, the turn and work on a grid of miles, with the route and the straight road. */
const map = (height = 320): DiagramEl => ({
  kind: 'diagram',
  id: 'm',
  height,
  points: { H: [0, 0], T: [10, 0], W: [10, 5], M: [5, 2.5] },
  items: [
    { kind: 'line', id: 'east', from: 'H', to: 'T', tone: 'adj', weight: 5, label: '10\\text{ mi east}', labelSide: 'right', group: 'route' },
    { kind: 'line', id: 'north', from: 'T', to: 'W', tone: 'opp', weight: 5, label: '5\\text{ mi north}', labelSide: 'right', group: 'route' },
    { kind: 'right', id: 'sq', at: 'T', from: 'H', to: 'W', group: 'route' },
    { kind: 'line', id: 'road', from: 'H', to: 'W', tone: 'good', weight: 5, dashed: true, label: '?', labelSide: 'left' },
    { kind: 'label', id: 'h', at: 'H', tex: '\\text{home } (0, 0)', place: 'below', dot: true },
    { kind: 'label', id: 'w', at: 'W', tex: '\\text{work } (10, 5)', place: 'above', dot: true },
  ],
});

const QUESTION =
  'Someone drove 10 mi directly east from their home, made a left turn at an intersection, and then traveled 5 mi north to their place of work. If a road was made directly from the home to the place of work, what would its distance be to the nearest tenth of a mile?';

const video: Explainer = {
  id: 'xq-m10c-6-5',
  lessonId: '',
  exam: {
    lesson: 'm10c-6-5',
    source: 'OpenStax, College Algebra 2e, Exercise in section 2.1, The Rectangular Coordinate Systems and Graphs',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-1-the-rectangular-coordinate-systems-and-graphs',
    question: QUESTION,
  },
  title: 'Exam Question: A Straight Road to Work. The Distance Formula',
  thumbnailTitle: 'A Straight Road to Work',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: someone drives 10 miles east and 5 miles north to work. We put home at (0, 0) and work at (10, 5) on a grid, use the distance formula to find √125, and round to 11.2 miles for a straight road. Then we check, see that it saves 3.8 miles, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Straight Road to Work', subtitle: 'The distance formula, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the distance between two points. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Someone drove $10$ mi directly east from their home, made a left turn at an intersection, and then traveled $5$ mi north to their place of work. If a road was made directly from the home to the place of work, what would its distance be to the nearest tenth of a mile?',
          answer: '$11.2$ mi',
          working: '$d = \\sqrt{(10 - 0)^2 + (5 - 0)^2} = \\sqrt{125} \\approx 11.2$ mi.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Someone drove 10 miles directly east from their home, made a left turn at an intersection, and then traveled 5 miles north to their place of work. If a road was made directly from the home to the place of work, what would its distance be, to the nearest tenth of a mile?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        map(),
        { kind: 'text', id: 't', size: 'md', md: 'Put **home** at the origin, with east along $x$ and north along $y$. Then **work** is at $(10, 5)$.' },
      ],
      lines: [
        { say: 'Let us picture it on a grid, in miles. Put home at the origin, 0, 0, with east to the right and north up.', show: ['m', 'm.h', 't'] },
        { say: 'The drive goes 10 miles east, turns left, which is north, and goes 5 miles. So work is at the point 10, 5.', show: ['m.route', 'm.w'] },
        { say: 'The question asks for the length of a straight road from home to work.', show: 'm.road', focus: 'm.road' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'] },
        { kind: 'text', id: 't', size: 'md', md: 'The **distance formula** is the Pythagorean theorem on a grid: the across and up distances are the legs, and $d$ is the hypotenuse.' },
      ],
      lines: [
        { say: 'Here is what we need. The distance between two points is the square root of the change in x, squared, plus the change in y, squared.', show: 'f' },
        { say: 'This is the Pythagorean theorem on a grid. The distance across and the distance up are the two legs of a right triangle, and the straight line is the hypotenuse.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the two **points**', 'Use the **distance formula**', 'Round to the nearest **tenth**'] }],
      lines: [
        { say: 'Here is the plan. First, write the two points.', show: 'plan.0' },
        { say: 'Second, put them into the distance formula.', show: 'plan.1' },
        { say: 'Third, round to the nearest tenth of a mile.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The points',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(x_1, y_1) = (0, 0), \\quad (x_2, y_2) = (10, 5)'] }],
      lines: [{ say: 'Step one. Home is 0, 0, and work is 10, 5.', show: 'm.0' }],
    },
    {
      chapter: 'Step 2: The distance formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = \\sqrt{(10 - 0)^2 + (5 - 0)^2}', '= \\sqrt{100 + 25} = \\sqrt{125}', '\\approx 11.18 \\approx \\good{11.2\\text{ mi}}'] }],
      lines: [
        { say: 'Step two. Put them in: the square root of 10 minus 0, squared, plus 5 minus 0, squared.', show: 'm.0' },
        { say: '10 squared is 100, and 5 squared is 25. Together, 125. So the distance is the square root of 125.', show: 'm.1' },
        { say: 'Step three. The square root of 125 is about 11.18. To the nearest tenth, the road would be 11.2 miles long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['10 < 11.2 < 15 \\ \\checkmark', '15 - 11.2 = 3.8\\text{ mi shorter}'] }],
      lines: [
        { say: 'Let us check that it makes sense. The straight road must be longer than the 10 mile leg, but shorter than the 15 miles of the route. 11.2 is in between.', show: 'm.0' },
        { say: 'And the book’s next exercise asks how much shorter the trip would be. 15 minus 11.2 is 3.8 miles shorter, each way.', show: 'm.1' },
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
            ['$10 + 5 = 15$ mi', 'that is the route, not the **straight** road'],
            ['$\\sqrt{10^2 + 5^2} = 10 + 5$', 'a square root does not split over **plus**'],
            ['$\\sqrt{125} = 11.1$', 'round to the **nearest** tenth: $11.18 \\to 11.2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding 10 and 5 gives the length of the route that turns the corner, not the straight road.' },
        { say: 'The square root of 10 squared plus 5 squared is not 10 plus 5. You cannot take the square root of each part.' },
        { say: 'And round correctly: 11.18 rounds up to 11.2, not down to 11.1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the distance between the points $(1, 3)$ and $(4, 7)$.',
          choices: ['$7$', '$25$', '$\\sqrt{7}$', '$5$'],
          answer: 3,
          working: '$d = \\sqrt{(4 - 1)^2 + (7 - 3)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the distance between the points 1, 3 and 4, 7. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Across is 4 minus 1, which is 3. Up is 7 minus 3, which is 4. 3 squared plus 4 squared is 9 plus 16, which is 25, and its square root is 5, choice D. A adds 3 and 4, B forgets the square root, and C adds before squaring.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put the story on a **grid**', '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$', 'Square, add, **then** take the root', 'Check: longer than each leg, shorter than both together'] }],
      lines: [
        { say: 'Here is what to remember. Put the story on a grid, with one point at the origin if you can.', show: 'sum.0' },
        { say: 'The distance is the square root of the change in x squared, plus the change in y squared.', show: 'sum.1' },
        { say: 'Square, add, and only then take the square root.', show: 'sum.2' },
        { say: 'And check: the straight line is longer than each leg, but shorter than both legs together. For more on distance and midpoint, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
