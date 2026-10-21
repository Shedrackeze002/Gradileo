import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pairIds, pairRows } from './lib/m9-5-figures.ts';

// One x-tile over one red x-tile, and one unit tile over one red unit tile: two zero pairs.
const zero = (id: string) =>
  figure(
    id,
    [
      pairRows({
        kinds: [
          { kind: 'x', pos: 1, neg: 1 },
          { kind: '1', pos: 1, neg: 1 },
        ],
        gap: 2,
      }),
    ],
    560,
  );

// 4x + 2 − x − 5: positive tiles on top, negative tiles below, each zero pair in a ring.
const ex = (id: string) =>
  figure(
    id,
    [
      pairRows({
        kinds: [
          { kind: 'x', pos: 4, neg: 1 },
          { kind: '1', pos: 2, neg: 5 },
        ],
        gap: 1.2,
        small: true,
      }),
    ],
    560,
  );

const X_POS = pairIds('ex', 'p', 'x', 4);
const X_NEG = pairIds('ex', 'n', 'x', 1);
const U_POS = pairIds('ex', 'p', '1', 2);
const U_NEG = pairIds('ex', 'n', '1', 5);

const video: Explainer = {
  id: 'm9-5-2-b',
  lessonId: 'm9-5-2',
  title: 'Equivalent Expressions, Part 2: Zero Pairs',
  thumbnailTitle: 'Simplifying with Zero Pairs',
  thumbnail: 'ex',
  summary:
    'A zero pair is a positive tile and a negative tile of the same kind; together they are worth 0, so they can be removed without changing the value. To simplify 4x + 2 − x − 5, put the positive tiles in one row and the negative tiles in another: removing one zero pair of x-tiles leaves 3x, and removing two zero pairs of unit tiles leaves three negative unit tiles, −3. So 4x + 2 − x − 5 = 3x − 3, and x = 2 gives 3 for both.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 2', title: 'Zero Pairs', subtitle: 'Simplifying with algebra tiles' }],
      lines: [
        { say: 'What do you get when you add five and negative five? Zero. A positive amount and the same negative amount cancel out.', show: 'title' },
        { say: 'Algebra tiles cancel in the same way. In this part, you will use zero pairs of tiles to simplify polynomials.' },
      ],
    },
    {
      chapter: 'Zero pairs',
      layout: 'split',
      left: [zero('z')],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['x + (-x) = 0', '1 + (-1) = 0'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Zero pair', md: 'A **zero pair** is a positive tile and a negative tile of the same kind. Together they are worth $0$.' },
      ],
      lines: [
        { say: 'Remember, a red tile is negative. Here is an x tile, and under it a red tile worth negative x.', show: [...pairIds('z', 'p', 'x', 1), ...pairIds('z', 'n', 'x', 1)] },
        { say: 'Together they are worth x plus negative x, which is zero.', show: [...pairIds('z', 'zp', 'x', 1), 'm.0'] },
        { say: 'The same is true for a unit tile and a red unit tile: one plus negative one is zero.', show: [...pairIds('z', 'p', '1', 1), ...pairIds('z', 'n', '1', 1), ...pairIds('z', 'zp', '1', 1), 'm.1'] },
        { say: 'A positive tile and a negative tile of the same kind are called a zero pair. Together they are worth zero, so you can remove them without changing the value.', show: 'def' },
      ],
    },
    {
      chapter: 'Tiles for the polynomial',
      layout: 'split',
      leftWidth: 700,
      left: [ex('ex')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4x + 2 - x - 5'] }],
      lines: [
        { say: 'Let’s simplify four x, plus two, minus x, minus five.', show: 'm.0' },
        { say: 'Put the positive tiles in the top row: four x tiles for four x, and two unit tiles for plus two.', show: [...X_POS, ...U_POS] },
        { say: 'Put the negative tiles in the bottom row: one red x tile for minus x, and five red unit tiles for minus five.', show: [...X_NEG, ...U_NEG] },
        { say: 'Each positive tile sits right above a negative tile of the same kind, wherever there is one. That makes the zero pairs easy to see.' },
      ],
    },
    {
      chapter: 'Remove the zero pairs',
      layout: 'split',
      leftWidth: 700,
      left: [ex('ex')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4x + 2 - x - 5', '4x - x = 3x', '2 - 5 = -3', '= 3x - 3'] }],
      lines: [
        { say: 'Start with the x tiles. There are four positive x tiles and one red x tile. That makes one zero pair.', show: ['m.0', ...X_POS, ...X_NEG, ...U_POS, ...U_NEG, ...pairIds('ex', 'zp', 'x', 1)], focus: pairIds('ex', 'zp', 'x', 1) },
        { say: 'Remove it. Three positive x tiles are left. That is three x.', hide: [...pairIds('ex', 'zp', 'x', 1), pairIds('ex', 'p', 'x', 1)[0], ...X_NEG], show: 'm.1', focus: 'm.1' },
        { say: 'Now the unit tiles. There are two positive unit tiles and five red ones. That makes two zero pairs.', show: pairIds('ex', 'zp', '1', 2), focus: pairIds('ex', 'zp', '1', 2) },
        { say: 'Remove them. Three red unit tiles are left. That is negative three.', hide: [...pairIds('ex', 'zp', '1', 2), ...U_POS, ...pairIds('ex', 'n', '1', 2)], show: 'm.2', focus: 'm.2' },
        { say: 'What is left is three x tiles and three red unit tiles. So four x, plus two, minus x, minus five, simplifies to three x minus three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 2\\text{:}', '4(2) + 2 - 2 - 5 = 8 + 2 - 2 - 5 = 3', '3(2) - 3 = 6 - 3 = 3 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Zero pairs', md: 'Removing a zero pair takes away $0$, so the value of the polynomial does not change.' },
      ],
      lines: [
        { say: 'Let’s check that the two polynomials are equivalent. Choose a value for x, say two.', show: 'm.0' },
        { say: 'The first polynomial: four times two is eight. Eight plus two, minus two, minus five, is three.', show: 'm.1', focus: 'm.1' },
        { say: 'The simplified one: three times two is six, and six minus three is three. The values match.', show: 'm.2', focus: 'm.2' },
        { say: 'That makes sense. Each zero pair we removed was worth zero, so taking it away did not change the value.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $5x - 3 - 2x + 1$. Use algebra tiles if you like.',
          choices: ['$3x - 2$', '$7x - 4$', '$3x + 2$', '$3x - 4$'],
          answer: 0,
          working: 'Five $x$-tiles and two negative $x$-tiles make $2$ zero pairs, leaving $3x$. Three negative unit tiles and one unit tile make $1$ zero pair, leaving $-2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify five x, minus three, minus two x, plus one. Use algebra tiles if you like. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five x tiles and two red x tiles make two zero pairs, leaving three x. Three red unit tiles and one unit tile make one zero pair, leaving two red unit tiles, which is negative two. Choice D treats plus one as minus one.', show: 'q.answer' },
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
            'A zero pair is a positive tile and a negative tile of the same kind. It is worth $0$.',
            'Put positive tiles in one row and negative tiles in another.',
            'Remove the zero pairs, then read what is left: $4x + 2 - x - 5 = 3x - 3$.',
            'Check by substituting the same value into both polynomials.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A zero pair is a positive tile and a negative tile of the same kind. Together they are worth zero.', show: 'sum.0' },
        { say: 'Put the positive tiles in one row, and the negative tiles in another.', show: 'sum.1' },
        { say: 'Remove the zero pairs, and read what is left.', show: 'sum.2' },
        { say: 'Then check by substituting the same value into both polynomials. In the next part, you will collect like terms with symbols instead of tiles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
