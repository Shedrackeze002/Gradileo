import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balanceParts, tileBalance } from '@/content/math8/videos/lib/m8-7-figures.ts';

// 5x = 12 + 2x: five x-tiles balance twelve unit tiles (three rows of four, one for each x-tile left
// once two x-tiles come off both sides) with two x-tiles on top of them.
const UNITS = ['u0', 'u1', 'u2'];
const bal = (id: string) =>
  figure(
    id,
    [
      tileBalance({
        left: { blocks: [{ id: 'take', x: 2 }, { id: 'x', x: 3 }] },
        right: {
          stack: true,
          blocks: [...UNITS.map((u, i) => ({ id: u, units: 4, tone: i % 2 ? ('theta' as const) : ('opp' as const) })), { id: 'take', x: 2 }],
        },
        labels: ['5x', '12 + 2x'],
      }),
    ],
    540,
  );
const all = (fig: string) => balanceParts(fig, ['take', 'x'], ['take', ...UNITS]);

const video: Explainer = {
  id: 'm9-6-1',
  lessonId: 'm9-6-1',
  title: 'Solving Equations with Variables on Both Sides, Part 1: Keeping the Balance',
  thumbnailTitle: 'Keeping the Balance',
  thumbnail: 'bl',
  summary:
    'An equation is like a balanced scale: doing the same thing to both sides keeps it balanced. The solution is the value of the variable that makes the two sides equal. To solve 5x = 12 + 2x, take two x-tiles off both sides (subtract 2x): 3x = 12. Then share the twelve unit tiles among the three x-tiles (divide by 3): x = 4. Check: 5(4) = 20 and 12 + 2(4) = 20.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 1', title: 'Keeping the Balance', subtitle: 'The variable on both sides' }],
      lines: [
        { say: 'Two phone plans charge different monthly fees, and different prices for each gigabyte of data. For how much data do they cost the same? Questions like this lead to equations with the variable on both sides.', show: 'title' },
        { say: 'In this lesson, you will solve equations like these. In this part, you will use a balance to see how.' },
      ],
    },
    {
      chapter: 'An equation is a balance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Keep it balanced', md: 'An equation is like a balanced scale. Do the **same thing to both sides**, and it stays balanced.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solution of an equation', md: 'The **solution** is the value of the variable that makes the left side equal to the right side.' },
      ],
      lines: [
        { say: 'An equation is like a balanced scale. The left side and the right side have the same value.', show: 'key' },
        { say: 'If you do the same thing to both sides, the scale stays balanced. If you do something to one side only, it tips.' },
        { say: 'The solution of an equation is the value of the variable that makes the left side equal to the right side.', show: 'def' },
        { say: 'When x is on both sides, the goal is to get all the x terms on one side, and all the numbers on the other side.' },
      ],
    },
    {
      chapter: 'Solving 5x = 12 + 2x',
      layout: 'split',
      leftWidth: 620,
      left: [bal('bl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5x = 12 + 2x', '5x - 2x = 12 + 2x - 2x', '3x = 12', '\\dfrac{3x}{3} = \\dfrac{12}{3}', 'x = 4'] }],
      lines: [
        { say: 'Solve five x equals twelve plus two x. On the balance, five x tiles on the left balance two x tiles and twelve unit tiles on the right.', show: [...all('bl'), 'm.0'] },
        { say: 'There are x tiles on both sides. Take two x tiles off both sides. Both sides lose the same amount, so the balance stays level.', focus: ['bl.l-take', 'bl.r-take'] },
        { say: 'That is subtracting two x from both sides. Now three x tiles balance twelve unit tiles: three x equals twelve.', hide: ['bl.l-take', 'bl.r-take', 'bl.labels'], show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Share the twelve unit tiles equally among the three x tiles. Each x tile matches a row of four.', focus: ['bl.r-u0', 'bl.r-u1', 'bl.r-u2'] },
        { say: 'That is dividing both sides by three. So x equals four.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 4\\text{:}', '\\text{left side: } 5(4) = 20', '\\text{right side: } 12 + 2(4) = 20 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check both sides', md: 'Substitute the solution into **both sides** of the original equation. They must be equal.' },
      ],
      lines: [
        { say: 'Always check by substituting the solution into both sides of the original equation.', show: ['tip', 'm.0'] },
        { say: 'The left side is five times four, which is twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'The right side is twelve plus two times four, which is twelve plus eight, or twenty. Both sides are equal, so four is the solution.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $7x = 15 + 4x$.',
          choices: ['$x = 5$', '$x = \\dfrac{15}{11}$', '$x = 3$', '$x = 15$'],
          answer: 0,
          working: 'Subtract $4x$ from both sides: $3x = 15$. Divide both sides by $3$: $x = 5$. Check: $7(5) = 35$ and $15 + 4(5) = 35$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve seven x equals fifteen plus four x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract four x from both sides: three x equals fifteen. Divide both sides by three: x equals five. Check: seven times five is thirty-five, and fifteen plus four times five is thirty-five. Choice B adds four x to the left side instead of taking it away from both sides.', show: 'q.answer' },
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
            'An equation is like a balance: do the same thing to both sides.',
            'Collect the $x$-terms on one side: $5x = 12 + 2x$ becomes $3x = 12$.',
            'Then divide by the coefficient of $x$: $x = 4$.',
            'Check by substituting into both sides of the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation is like a balance. Do the same thing to both sides to keep it balanced.', show: 'sum.0' },
        { say: 'Collect the x terms on one side, by taking the same x terms off both sides.', show: 'sum.1' },
        { say: 'Then divide both sides by the coefficient of x.', show: 'sum.2' },
        { say: 'And check by substituting into both sides of the original equation. In the next part, you will solve equations with an x term and a number on both sides. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
