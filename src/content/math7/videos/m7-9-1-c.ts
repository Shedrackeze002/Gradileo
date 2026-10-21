import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, coord, move, pt, quadrantSigns, quadrants } from './lib/m7-9-figures.ts';

const g = cart();

// The quadrants with the signs of x and y in each.
const signs = (id: string) => figure(id, [g, quadrants(g, { d: 2.5 }), quadrantSigns(g, { d: 2.5 })]);

// Why Quadrant II is (−, +): the point (−3, 2) is reached by going left, then up.
const why = (id: string) =>
  figure(id, [
    g,
    quadrants(g, { d: 2.5, tone: 'muted' }),
    move(g, 'x', [0, 0], [-4, 0], { label: '\\text{left: } x < 0', side: 'right' }),
    move(g, 'y', [-4, 0], [-4, 3], { label: '\\text{up: } y > 0', side: 'left' }),
    pt(g, 'P', -4, 3, coord(-4, 3), 'above right', 'theta'),
  ]);

const video: Explainer = {
  id: 'm7-9-1-c',
  lessonId: 'm7-9-1',
  title: 'The Cartesian Plane, Part 3: Quadrants and Signs',
  thumbnailTitle: 'Quadrants and Signs',
  thumbnail: 'sg',
  summary:
    'The signs of a point’s coordinates tell its quadrant without drawing anything: Quadrant I is (+, +), II is (−, +), III is (−, −) and IV is (+, −). So (−7, 2) is in Quadrant II, (5, −8) is in Quadrant IV, and (0, 6), with a zero coordinate, is on the y-axis, not in any quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 3', title: 'Quadrants and Signs', subtitle: 'Find the quadrant without drawing' }],
      lines: [
        { say: 'Can you tell where a point is without drawing anything at all? Yes! Just look at the signs of its two numbers.', show: 'title' },
        { say: 'In this video, you will use the signs of the coordinates to find the quadrant of any point.' },
      ],
    },
    {
      chapter: 'Why the signs work',
      layout: 'split',
      leftWidth: 640,
      left: [why('wy')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Every point in Quadrant II is **left** of the $y$-axis and **above** the $x$-axis. So its $x$-coordinate is **negative** and its $y$-coordinate is **positive**.' }],
      lines: [
        { say: 'Look at Quadrant two, the top left. To reach any point there, you go left from the origin, and then up.', show: [...base('wy'), 'wy.quads'], focus: 'wy.q2' },
        { say: 'Take the point at negative four, three. Going left makes the x-coordinate negative.', show: ['wy.x', 'wy.P'], focus: 'wy.x' },
        { say: 'Going up makes the y-coordinate positive.', show: 'wy.y', focus: 'wy.y' },
        { say: 'Every point in Quadrant two works the same way. Its x-coordinate is negative and its y-coordinate is positive.', show: 't' },
      ],
    },
    {
      chapter: 'Signs in each quadrant',
      layout: 'split',
      leftWidth: 640,
      left: [signs('sg')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Quadrant', '$x$', '$y$', 'Example'],
          rows: [
            ['I', '$+$', '$+$', '$(3,\\ 5)$'],
            ['II', '$-$', '$+$', '$(-7,\\ 2)$'],
            ['III', '$-$', '$-$', '$(-1,\\ {-6})$'],
            ['IV', '$+$', '$-$', '$(5,\\ {-8})$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the signs for all four quadrants. In Quadrant one, the top right, you go right and up. Both coordinates are positive, like three, five.', show: [...base('sg'), 'sg.q1', 'sg.s1', 't.0'], focus: ['sg.s1', 't.0'] },
        { say: 'In Quadrant two, the top left, x is negative and y is positive, like negative seven, two, in the table.', show: ['sg.q2', 'sg.s2', 't.1'], focus: ['sg.s2', 't.1'] },
        { say: 'In Quadrant three, the bottom left, both coordinates are negative, like negative one, negative six.', show: ['sg.q3', 'sg.s3', 't.2'], focus: ['sg.s3', 't.2'] },
        { say: 'In Quadrant four, the bottom right, x is positive and y is negative, like five, negative eight.', show: ['sg.q4', 'sg.s4', 't.3'], focus: ['sg.s4', 't.3'] },
        { say: 'Notice that some examples are off this grid. That does not matter. The signs tell you the quadrant, however big the numbers are.', focus: 't' },
      ],
    },
    {
      chapter: 'Naming the location',
      layout: 'split',
      leftWidth: 640,
      left: [signs('nl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Where is each point?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['(a)\\ (-7,\\ 2): \\ (\\adj{-},\\ \\opp{+}) \\to \\text{II}', '(b)\\ (5,\\ {-8}): \\ (\\adj{+},\\ \\opp{-}) \\to \\text{IV}', '(c)\\ (0,\\ 6): \\ x = 0', '\\text{on the } y\\text{-axis}'],
        },
      ],
      lines: [
        { say: 'Let’s use the signs. Where is each of these three points?', show: [...base('nl'), 'nl.quads', 'nl.signs', 'q'] },
        { say: 'The first point is at negative seven, two, so its x-coordinate is negative. That means it is left. Its y-coordinate is positive, so it is up. Left and up is Quadrant two.', show: 'm.0', focus: ['m.0', 'nl.s2'] },
        { say: 'The second point is at five, negative eight. Its x-coordinate is positive, so it is right. Its y-coordinate is negative, so it is down. Right and down is Quadrant four.', show: 'm.1', focus: ['m.1', 'nl.s4'] },
        { say: 'The third point is at zero, six. Its x-coordinate is zero, so it does not move left or right. It is on the y-axis, six units up, and not in any quadrant.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Zero has no sign', md: 'Zero is neither positive nor negative. A point such as $(0,\\ 6)$ or $(-4,\\ 0)$ is **on an axis**, between two quadrants, so it is **not in any quadrant**.' }],
      lines: [
        { say: 'Watch out for zeros. Zero is neither positive nor negative.', show: 'oops' },
        { say: 'So a point with a zero coordinate, like zero, six, or negative four, zero, is on an axis. It sits on the border between two quadrants, so it is not in any quadrant.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is in Quadrant III?',
          choices: ['$(3,\\ {-4})$', '$(-2,\\ 5)$', '$(0,\\ {-3})$', '$(-6,\\ {-1})$'],
          answer: 3,
          working: 'In Quadrant III both coordinates are negative. Only $(-6,\\ {-1})$ has $x < 0$ and $y < 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is in Quadrant three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: negative six, negative one. In Quadrant three, both coordinates are negative. Choice C has an x-coordinate of zero, so it is on the y-axis, not in a quadrant.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['The signs tell the quadrant: I $(+,\\ +)$, II $(-,\\ +)$, III $(-,\\ -)$, IV $(+,\\ -)$.', 'You do not need to draw the point to find its quadrant.', 'A point with a $0$ coordinate is on an axis, not in a quadrant.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The signs of the coordinates tell the quadrant. Quadrant one is positive, positive. Quadrant two is negative, positive. Quadrant three is negative, negative. And Quadrant four is positive, negative.', show: 'sum.0' },
        { say: 'You do not need to draw a point to find its quadrant.', show: 'sum.1' },
        { say: 'And a point with a zero coordinate is on an axis, not in a quadrant. In the next part, you will find distances and draw shapes in the Cartesian plane. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
