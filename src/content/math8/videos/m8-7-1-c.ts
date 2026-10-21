import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The diver: three equal changes of −5 m, from the surface down to −15 m.
const dive = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -15,
        max: 0,
        every: 5,
        unit: 0.26,
        water: { width: 4.6 },
        points: [{ id: 'end', value: -15, tex: '-15\\text{ m}', tone: 'good' }],
        moves: [
          { id: 'm0', from: 0, to: -5, label: '-5', tone: 'theta', x: 1.6 },
          { id: 'm1', from: -5, to: -10, label: '-5', tone: 'theta', x: 2.5 },
          { id: 'm2', from: -10, to: -15, label: '-5', tone: 'theta', x: 3.4 },
        ],
      }),
    ],
    430,
  );

// The pizza order: a bar for the total p, cut into four equal shares of $9.
const shares = (id: string) =>
  figure(id, [bars({ rows: [{ id: 'p', pieces: [0, 1, 2, 3].map((i) => ({ w: 2.2, tex: '\\$9', tone: i % 2 ? ('opp' as const) : ('theta' as const) })) }], total: 'p' })], 200);

const video: Explainer = {
  id: 'm8-7-1-c',
  lessonId: 'm8-7-1',
  title: 'Solving One-Step Equations, Part 3: One-Step Equations in Real Life',
  thumbnailTitle: 'One-Step Equations in Real Life',
  thumbnail: 'dv',
  summary:
    'A diver goes down at a steady rate, and after 3 minutes the elevation has changed by −15 m. With r the change each minute, 3r = −15, so r = −15 ÷ 3 = −5: the diver goes down 5 m every minute. Four friends share a pizza order equally and each pays $9; with p the total cost, p/4 = 9, so p = 9 × 4 = 36 and the order cost $36. Check each answer, and say it in a sentence.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 3', title: 'One-Step Equations in Real Life', subtitle: 'A diver and a pizza bill' }],
      lines: [
        { say: 'Equations are not just puzzles. They answer real questions, like how fast a diver goes down, or what a meal cost.', show: 'title' },
        { say: 'In this part, you will write and solve one-step equations for two real situations.' },
      ],
    },
    {
      chapter: 'The diver',
      layout: 'split',
      leftWidth: 460,
      left: [dive('dv')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A diver goes down at a steady rate. After $3$ minutes, the elevation has changed by $-15$ m. Let $r$ be the change in elevation each minute.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3r = -15', 'r = -15 \\div 3 = -5', '\\text{Check: } 3(-5) = -15 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Back to the diver. The diver goes down at a steady rate. Elevation means height above or below the surface, so going down is a negative change.', show: ['q', 'dv.axis', 'dv.water'] },
        { say: 'After three minutes, the elevation has changed by negative fifteen metres. Let r stand for the change in elevation each minute.', show: 'dv.end', focus: 'dv.end' },
        { say: 'Three minutes of the same change make negative fifteen. So three r equals negative fifteen.', show: ['m.0', 'dv.m0', 'dv.m1', 'dv.m2'], focus: 'm.0' },
        { say: 'Here, r is multiplied by three, so divide both sides by three. Negative fifteen divided by three is negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: three times negative five is negative fifteen. It works.', show: 'm.2', focus: 'm.2' },
        { say: 'So the elevation changes by negative five metres each minute. In words: the diver goes down five metres every minute.', focus: ['dv.m0', 'dv.m1', 'dv.m2'] },
      ],
    },
    {
      chapter: 'Sharing a bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Four friends share the cost of a pizza order equally, and each pays \\$9. Let $p$ be the total cost, in dollars.' },
        shares('sh'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{p}{4} = 9 \\qquad p = 9 \\times 4 = 36', '\\text{Check: } 36 \\div 4 = 9 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Four friends share the cost of a pizza order equally, and each friend pays nine dollars. What was the total cost?', show: 'q' },
        { say: 'Let p stand for the total cost, in dollars. The total is split into four equal shares of nine dollars each.', show: ['sh.p-p0', 'sh.p-p1', 'sh.p-p2', 'sh.p-p3', 'sh.total'] },
        { say: 'So p over four equals nine. Here, p is divided by four. The inverse is multiplying, so multiply both sides by four. Nine times four is thirty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: thirty-six divided by four is nine. It works. The pizza order cost thirty-six dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Answer the question',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Answer in a sentence', md: 'After you solve, say what the answer means, with units: "The diver goes down $5$ m every minute." Check that it makes sense: going down gives a **negative** change.' }],
      lines: [
        { say: 'When an equation comes from a real situation, finish by saying what the answer means, with units.', show: 'tip' },
        { say: 'Negative five on its own is just a number. “The diver goes down five metres every minute” answers the question.' },
        { say: 'And check that it makes sense. The diver was going down, so a negative change is what we expected.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The water level in a pond changes by the same amount each day. After $6$ days it has changed by $-42$ cm. Solve $6r = -42$ to find the change each day.',
          choices: ['$r = -7$', '$r = 7$', '$r = -36$', '$r = -48$'],
          answer: 0,
          working: '$r$ is multiplied by $6$, so divide both sides by $6$: $r = -42 \\div 6 = -7$. Check: $6(-7) = -42$. The level drops $7$ cm a day.',
        },
      ],
      lines: [
        { say: 'Your turn. The water level in a pond changes by the same amount each day. After six days, it has changed by negative forty-two centimetres. Solve six r equals negative forty-two to find the change each day. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, r equals negative seven. Negative forty-two divided by six is negative seven, so the level drops seven centimetres a day. Choice B has the right size, but a negative divided by a positive is negative.', show: 'q.answer' },
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
          items: [
            'Choose a letter for the unknown, and write an equation.',
            'Diver: $3r = -15$, so $r = -5$: down $5$ m every minute.',
            'Pizza: $\\dfrac{p}{4} = 9$, so $p = 36$: the order cost \\$36.',
            'Check the answer, and say what it means, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Choose a letter for the unknown, and write an equation.', show: 'sum.0' },
        { say: 'For the diver, three r equals negative fifteen, so r is negative five.', show: 'sum.1' },
        { say: 'For the pizza, p over four equals nine, so p is thirty-six.', show: 'sum.2' },
        { say: 'Then check, and say what the answer means. Next, you will solve equations that take two steps. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
