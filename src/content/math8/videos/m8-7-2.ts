import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { balanceParts, tileBalance } from './lib/m8-7-figures.ts';

// 2x + 3 = 11: what is done to x along the top, and the undoing, in reverse order, along the bottom.
const steps = (id: string) =>
  figure(id, [chain({ nodes: ['x', '2x', '11'], ops: ['\\times 2', '+\\,3'], back: ['4', '8', '11'], undo: ['\\div 2', '-\\,3'], gap: 3 })], 260);

// 2x + 3 = 11 on a balance: the three unit tiles to take off both sides are pink; the eight left on
// the right are in two rows of four, one row for each x-tile.
const bal = (id: string) =>
  figure(
    id,
    [
      tileBalance({
        left: { blocks: [{ id: 'x', x: 2 }, { id: 'take', units: 3, tone: 'hyp' }] },
        right: {
          stack: true,
          blocks: [
            { id: 'u0', units: 4, tone: 'opp' },
            { id: 'u1', units: 4, tone: 'theta' },
            { id: 'take', units: 3, tone: 'hyp' },
          ],
        },
        labels: ['2x + 3', '11'],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm8-7-2',
  lessonId: 'm8-7-2',
  title: 'Solving Two-Step Equations, Part 1: Undoing Two Steps',
  thumbnailTitle: 'Undoing Two Steps',
  thumbnail: 'bl',
  summary:
    'In 2x + 3 = 11, x is multiplied by 2 and then 3 is added, so undo the steps in reverse order: subtract 3 from both sides (2x = 8), then divide both sides by 2 (x = 4). On a balance, take three unit tiles off both sides, then share the eight left between the two x-tiles. Check: 2(4) + 3 = 11. Do not divide first unless you divide every term: x + 1.5 = 5.5 is harder.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 1', title: 'Undoing Two Steps', subtitle: 'Undo in reverse order' }],
      lines: [
        { say: 'A taxi charges four dollars to start, plus two dollars for each kilometre, and your fare was twenty-two dollars. How far did you ride?', show: 'title' },
        { say: 'Two things happen to the distance: it is multiplied by two, and then four is added. In this part, you will solve equations like this by undoing both steps.' },
      ],
    },
    {
      chapter: 'Undo in reverse order',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['2x + 3 = 11'] }, steps('ch')],
      lines: [
        { say: 'Look at two x plus three equals eleven. Two things happen to x. First, it is multiplied by two. Then three is added, and the result is eleven.', show: ['m.0', 'ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2'] },
        { say: 'To find x, undo the steps in reverse order. Think of socks and shoes: you put your socks on first, but you take your shoes off first.' },
        { say: 'The last step was adding three, so undo that first. Eleven minus three is eight.', show: ['ch.b2', 'ch.u1', 'ch.b1'], focus: ['ch.u1', 'ch.b1'] },
        { say: 'Then undo multiplying by two. Eight divided by two is four. So x equals four.', show: ['ch.u0', 'ch.b0'], focus: ['ch.u0', 'ch.b0'] },
      ],
    },
    {
      chapter: 'On the balance',
      layout: 'center',
      main: [bal('bl'), { kind: 'math', id: 'm', size: 'md', lines: ['2x + 3 = 11', '2x = 11 - 3 = 8', 'x = 8 \\div 2 = 4 \\qquad \\text{Check: } 2(4) + 3 = 11 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Here is two x plus three equals eleven on a balance. Two x-tiles and three unit tiles on the left balance eleven unit tiles on the right.', show: [...balanceParts('bl', ['x', 'take'], ['u0', 'u1', 'take']), 'm.0'] },
        { say: 'Undo the adding first. Take three unit tiles off both sides. The balance stays level, because both sides lose the same amount.', focus: ['bl.l-take', 'bl.r-take'] },
        { say: 'Now two x-tiles balance eight unit tiles. Two x equals eight.', hide: ['bl.l-take', 'bl.r-take', 'bl.labels'], show: 'm.1', focus: 'm.1' },
        { say: 'Then undo the multiplying. Share the eight unit tiles between the two x-tiles. Each x-tile matches a row of four. So x equals four.', show: 'm.2', focus: ['bl.r-u0', 'bl.r-u1', 'm.2'] },
        { say: 'Check: two times four, plus three, is eight plus three, which is eleven. It works.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'For $2x + 3 = 11$, do not divide by $2$ first: the $3$ is not multiplied by $2$. If you do divide first, you must divide **every** term.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2x}{2} + \\dfrac{3}{2} = \\dfrac{11}{2}', 'x + 1.5 = 5.5 \\qquad x = 4'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Do not divide by two first. The three is not multiplied by two, so take it away before you divide.', show: 'oops' },
        { say: 'If you do divide first, you must divide every term, including the three. That gives x plus one point five equals five point five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'You still get four, but the decimals make it harder. Undo the adding first, and the numbers stay simple.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A taxi charges \\$4 to start plus \\$2 for each kilometre. A fare is \\$22. Solve $2d + 4 = 22$ to find the distance.',
          choices: ['$d = 13$', '$d = 7$', '$d = 11$', '$d = 9$'],
          answer: 3,
          working: 'Subtract $4$ from both sides: $2d = 18$. Divide both sides by $2$: $d = 9$. Check: $2(9) + 4 = 22$. The ride was $9$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges four dollars to start, plus two dollars for each kilometre. A fare is twenty-two dollars. Solve two d plus four equals twenty-two to find the distance. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, d equals nine. Subtract four from both sides to get two d equals eighteen, then divide by two. Choice B divides first, but forgets to divide the four by two.', show: 'q.answer' },
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
            'In $2x + 3 = 11$, $x$ is multiplied by $2$, then $3$ is added.',
            'Undo in reverse order: subtract $3$ first, then divide by $2$.',
            'Do the same to both sides, so the balance stays level.',
            'Check: $2(4) + 3 = 11$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a two-step equation, two things happen to x.', show: 'sum.0' },
        { say: 'Undo them in reverse order: undo the adding or subtracting first, then the multiplying or dividing.', show: 'sum.1' },
        { say: 'Do the same thing to both sides, so the balance stays level.', show: 'sum.2' },
        { say: 'And check your answer in the original equation. In the next part, you will solve two-step equations with negative numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
