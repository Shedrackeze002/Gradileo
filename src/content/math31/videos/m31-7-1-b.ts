import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sheetBox } from './lib/m31-7-figures.ts';
import { dots, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// A 24 cm by 15 cm sheet, x cm squares cut from the corners: V(x) = x(24 − 2x)(15 − 2x), largest at x = 3.
const sheet = (height?: number) =>
  figure('s', [sheetBox({ L: 24, W: 15, x: 3, labels: { L: '24\\text{ cm}', W: '15\\text{ cm}', x: 'x', l: '24 - 2x', w: '15 - 2x' } })], height);

const V = (x: number) => x * (24 - 2 * x) * (15 - 2 * x);
const vGraph = () => {
  const g = plane({ x: [0, 8], y: [0, 500], xStep: 1, yStep: 100, every: 0, width: 8, height: 5, titles: { y: 'V' } });
  return figure('vg', [
    g,
    numbers(g, 1, 100),
    plot(g, { id: 'V', f: V, from: 0, to: 7.5, samples: 160 }),
    tag(g, 'name', 4.6, 180, 'V(x)', 'center', 'brand'),
    dots(g, [
      { id: 'top', x: 3, y: 486, tex: '(3,\\ 486)', tone: 'theta', place: 'above' },
      { id: 'e0', x: 0, y: 0, tex: '', tone: 'good', group: 'ends' },
      { id: 'e1', x: 7.5, y: 0, tex: '(7.5,\\ 0)', tone: 'good', place: 'above right', group: 'ends' },
    ]),
  ]);
};

const video: Explainer = {
  id: 'm31-7-1-b',
  lessonId: 'm31-7-1',
  title: 'Optimization, Part 2: Verifying a Maximum and the Largest Box',
  thumbnailTitle: 'The Largest Box',
  thumbnail: 's',
  summary: 'Three ways to confirm that a critical number gives a maximum or a minimum: the closed interval method, the first derivative test and the second derivative test. An open box folded from a 24 cm by 15 cm sheet has V(x) = x(24 − 2x)(15 − 2x) on 0 < x < 7.5; of the critical numbers 3 and 10 only 3 is in the domain, and the largest volume is 486 cm³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 2', title: 'The Largest Box', subtitle: 'Verifying a maximum, and checking the domain' }],
      lines: [
        { say: 'A critical number is only a candidate. The derivative is zero at a maximum, but also at a minimum, and at some points that are neither.', show: 'title' },
        { say: 'In this video, you will learn three ways to confirm that a critical number really gives the best value, and use them to fold the largest possible box from a sheet of cardboard.' },
      ],
    },
    {
      chapter: 'Three ways to verify',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Closed interval method:** compare the objective at the critical numbers and at the endpoints of the domain.',
            '**First derivative test:** the derivative changes from $+$ to $-$ (a maximum) or from $-$ to $+$ (a minimum) at the only critical number.',
            '**Second derivative test:** the second derivative has one sign over the whole domain: negative for a maximum, positive for a minimum.',
          ],
        },
      ],
      lines: [
        { say: 'There are three ways to confirm a maximum or a minimum. The first is the closed interval method. If the domain is a closed interval, work out the objective at each critical number and at both endpoints. The largest of these values is the maximum, and the smallest is the minimum.', show: 'b.0', focus: 'b.0' },
        { say: 'The second is the first derivative test. Suppose there is only one critical number in the domain. If the derivative changes from positive to negative there, the function rises and then falls, so that critical number gives the absolute maximum. From negative to positive, it gives the absolute minimum.', show: 'b.1', focus: 'b.1' },
        { say: 'The third is the second derivative test. If the second derivative is negative over the whole domain, the graph is concave down everywhere, and the only critical number gives the absolute maximum. If it is positive everywhere, it gives the absolute minimum. That is what we used for the field beside the river.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Folding a box',
      layout: 'center',
      main: [sheet(400), { kind: 'text', id: 't', size: 'md', md: 'Cut a square of side $x$ from each corner, then fold up the sides.' }],
      lines: [
        { say: 'An open-top box is made from a sheet of cardboard 24 centimetres long and fifteen centimetres wide.', show: ['s.sheet', 's.L', 's.W'] },
        { say: 'A square of side x is cut from each corner.', show: ['s.cuts', 's.x1', 's.x2', 't'], focus: ['s.cuts', 's.x1', 's.x2'] },
        { say: 'Then the sides are folded up along the dashed lines.', show: 's.folds', focus: 's.folds' },
        { say: 'Each cut takes x off both ends of each edge. So the base of the box is 24 minus two x long, and fifteen minus two x wide.', show: 's.base', focus: 's.base' },
        { say: 'And the folded sides stand x centimetres tall. What size of square gives the box with the largest volume?', show: ['s.fold', 's.box-shape', 's.box-l', 's.box-w', 's.box-h'], focus: ['s.box-shape', 's.box-h'] },
      ],
    },
    {
      chapter: 'The volume',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['V(x) = x(24 - 2x)(15 - 2x)', '(24 - 2x)(15 - 2x) = 360 - 78x + 4x^2', 'V(x) = 4x^3 - 78x^2 + 360x', '15 - 2x > 0 \\;\\Rightarrow\\; 0 < x < 7.5'] },
      ],
      lines: [
        { say: 'The objective is the volume: length times width times height. So V of x equals x, times 24 minus two x, times fifteen minus two x.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the two brackets first. 24 times fifteen is 360. The middle terms are negative 48 x and negative 30 x, which make negative 78 x. And negative two x times negative two x is four x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply by x. V of x equals four x cubed, minus 78 x squared, plus 360 x.', show: 'm.2', focus: 'm.2' },
        { say: 'Now the domain. x must be more than zero, or nothing is cut. And the width, fifteen minus two x, must be more than zero, so x is less than 7.5. The domain is x between zero and 7.5.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Critical numbers',
      layout: 'split',
      leftWidth: 560,
      left: [vGraph()],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["V'(x) = 12x^2 - 156x + 360", '= 12(x^2 - 13x + 30)', '= 12(x - 3)(x - 10)', 'x = 3 \\quad \\text{or} \\quad \\bad{x = 10}'] },
      ],
      lines: [
        { say: 'Differentiate. V prime of x equals twelve x squared, minus 156 x, plus 360.', show: 'm.0', focus: 'm.0' },
        { say: 'Take out the common factor, twelve. That leaves x squared, minus thirteen x, plus 30, which factors as x minus three, times x minus ten.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So V prime is zero when x is three, or when x is ten. But ten is not in the domain: it is bigger than 7.5. Only x equals three is a candidate.', show: 'm.3', focus: 'm.3' },
        { say: 'The graph of the volume agrees. It starts at zero, rises to a peak at x equals three, and falls back to zero at 7.5.', show: ['vg.grid', 'vg.axes', 'vg.V', 'vg.name', 'vg.top'], focus: ['vg.V', 'vg.top'] },
      ],
    },
    {
      chapter: 'Compare with the endpoints',
      layout: 'split',
      leftWidth: 560,
      left: [vGraph()],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$V(x)\\ (\\text{cm}^3)$'],
          rows: [
            ['$0$ (endpoint)', '$0$'],
            ['$3$ (critical)', '$3(18)(9) = 486$'],
            ['$7.5$ (endpoint)', '$0$'],
          ],
        },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Cut $3$ cm squares. The largest volume is $486$ cm³.' },
      ],
      lines: [
        { say: 'Verify with the closed interval method. Include the endpoints, zero and 7.5. At either end, the box is flat, so its volume is zero.', show: ['vg', 't.0', 't.2'], focus: ['vg.ends', 't.0', 't.2'] },
        { say: 'At the critical number, x equals three, the box is 24 minus six, which is eighteen centimetres long, fifteen minus six, which is nine centimetres wide, and three centimetres tall. Its volume is three times eighteen times nine: 486.', show: 't.1', focus: ['t.1', 'vg.top'] },
        { say: 'The largest of the three values is 486. So cut squares three centimetres on a side, and the largest volume is 486 cubic centimetres.', show: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping a root outside the domain', md: '$x = 10$ also makes $V\'(x) = 0$, but you cannot cut $10$ cm squares from a sheet only $15$ cm wide. Check every critical number against the domain.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['V(10) = 10(24 - 20)(15 - 20) = 10(4)(\\bad{-5}) = -200'] },
      ],
      lines: [
        { say: 'A common mistake is to keep every root of the derivative. x equals ten also makes V prime zero. But two ten centimetre squares side by side need twenty centimetres, and the sheet is only fifteen centimetres wide.', show: 'oops' },
        { say: 'The formula even gives nonsense there. V of ten is ten, times four, times negative five: a volume of negative 200. So always check each critical number against the domain before you use it.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An open box is folded from a $12$ cm by $12$ cm sheet by cutting a square of side $x$ cm from each corner. What size of square gives the largest volume?',
          choices: ['$3$ cm', '$6$ cm', '$4$ cm', '$2$ cm'],
          answer: 3,
          working: '$V(x) = x(12 - 2x)^2$ for $0 < x < 6$, and $V\'(x) = 12(x - 2)(x - 6)$. Only $x = 2$ is in the domain, and $V(2) = 2(8)(8) = 128$ cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. An open box is folded from a twelve centimetre by twelve centimetre sheet, by cutting a square of side x from each corner. What size of square gives the largest volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two centimetres. The volume is x times, twelve minus two x, squared, for x between zero and six. Its derivative is twelve, times x minus two, times x minus six.', show: 'q.answer' },
        { say: 'Choice B, six centimetres, also makes the derivative zero, but it is an endpoint: six centimetre squares from a twelve centimetre sheet leave no base at all, and a volume of zero. At two centimetres, the volume is 128 cubic centimetres.' },
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
            'A critical number is only a candidate: verify it.',
            'Closed interval: compare the critical numbers and the endpoints.',
            'Or use the first or second derivative test.',
            'Drop any critical number outside the domain.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A critical number is only a candidate, so verify it.', show: 'sum.0' },
        { say: 'With a closed interval, compare the objective at the critical numbers and at the endpoints.', show: 'sum.1' },
        { say: 'Or use the first derivative test, or the second derivative test.', show: 'sum.2' },
        { say: 'And drop any critical number outside the domain. In the next part, we find the price that brings in the most money. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
