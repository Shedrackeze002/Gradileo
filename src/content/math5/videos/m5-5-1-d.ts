import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fractionLine, unitHops } from './lib/m5-5-figures.ts';

const video: Explainer = {
  id: 'm5-5-1-d',
  lessonId: 'm5-5-1',
  title: 'Improper Fractions and Mixed Numbers, Part 4: Fractions on a Number Line',
  thumbnailTitle: 'Fractions on a Number Line',
  thumbnail: 'seven',
  summary: 'Placing fractions on a number line by counting equal spaces: three fourths, seven fourths (the same point as 1¾) and nine fourths (2¼), and why you count spaces, not tick marks.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 4', title: 'Fractions on a Number Line', subtitle: 'Count the spaces' }],
      lines: [
        { say: 'Fractions are numbers, so they have a place on the number line, just like whole numbers do.', show: 'title' },
        { say: 'In this video, you will find fractions and mixed numbers on a number line, by counting equal spaces.' },
      ],
    },
    {
      chapter: 'Spaces on the line',
      layout: 'center',
      main: [
        figure('nl', [fractionLine({ min: 0, max: 3, den: 4, length: 13, fractions: true, hops: unitHops(0, 3, 'h'), points: [{ id: 'p', at: 3, tex: '\\dfrac34' }] })], 300),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equal spaces', md: 'Each whole is cut into equal spaces. With $4$ spaces in each whole, each space is $\\dfrac{1}{4}$.' },
      ],
      lines: [
        { say: 'This number line goes from zero to three. Each whole is cut into four equal spaces, so each space is one fourth.', show: ['nl.axis', 'key'] },
        { say: 'So every tick mark has a fraction name. From zero, they are one fourth, two fourths, three fourths, then four fourths, which is one. Then five fourths, six fourths, and so on.', show: 'nl.fracs' },
        { say: 'To find three fourths, start at zero, and count three spaces. One, two, three. Three fourths is just before one.', show: ['nl.h', 'nl.p'], focus: 'nl.p' },
      ],
    },
    {
      chapter: 'Seven fourths',
      layout: 'center',
      main: [
        figure('seven', [
          fractionLine({
            min: 0,
            max: 3,
            den: 4,
            length: 13,
            hops: [...unitHops(0, 4, 'ha'), ...unitHops(4, 7, 'hb', 'good')],
            points: [
              { id: 'p', at: 7, tex: '\\dfrac74', tone: 'good' },
              { id: 'q', at: 7, tex: '1\\dfrac34', tone: 'good', below: true },
            ],
          }),
        ], 300),
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same point', md: 'An improper fraction and its mixed number are at the **same point** on the number line: $\\dfrac{7}{4} = 1\\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Where is seven fourths? Start at zero, and count seven spaces.', show: 'seven.axis' },
        { say: 'One, two, three, four. Four spaces reach one.', show: 'seven.ha' },
        { say: 'Five, six, seven.', show: 'seven.hb', focus: 'seven.hb' },
        { say: 'So seven fourths is seven spaces from zero.', show: 'seven.p', focus: 'seven.p' },
        { say: 'Now look where it is. It is three spaces past one. That is one whole and three fourths more: one and three fourths.', show: 'seven.q', focus: ['seven.q', 'seven.hb'] },
        { say: 'An improper fraction and its mixed number are at the same point on the number line. They are the same number, written two ways.', show: 'key' },
      ],
    },
    {
      chapter: 'Read a point',
      layout: 'center',
      main: [
        figure('nine', [
          fractionLine({
            min: 0,
            max: 3,
            den: 4,
            length: 13,
            hops: [...unitHops(0, 8, 'ha'), ...unitHops(8, 9, 'hb', 'good')],
            points: [
              { id: 'p', at: 9, tex: '\\dfrac94', tone: 'good' },
              { id: 'q', at: 9, tex: '2\\dfrac14', tone: 'good', below: true },
            ],
          }),
        ], 300),
        { kind: 'math', id: 'm', size: 'md', lines: ['8 \\text{ spaces} = \\dfrac84 = 2, \\quad \\text{one more: } \\dfrac94 = 2\\dfrac14'] },
      ],
      lines: [
        { say: 'Where is nine fourths? Each space is one fourth, so count nine spaces from zero.', show: 'nine.axis' },
        { say: 'Eight spaces reach two, because eight fourths make two wholes.', show: 'nine.ha' },
        { say: 'One more space goes just past two.', show: ['nine.hb', 'nine.p'], focus: ['nine.hb', 'nine.p'] },
        { say: 'So nine fourths is one space past two. It is at two and one fourth.', show: ['nine.q', 'm.0'], focus: ['nine.q', 'm.0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        figure('one', [fractionLine({ min: 0, max: 1, den: 4, length: 10, tick: 0.3, hops: unitHops(0, 4, 'h', 'good') })], 220),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Count spaces, not tick marks', md: 'Between $0$ and $1$ there are $5$ tick marks but only $4$ spaces. The denominator is the number of **spaces** in one whole.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Count the tick marks from zero to one: one, two, three, four, five. Five tick marks!', show: ['one.axis', 'oops'], focus: ['one.t0', 'one.t1', 'one.t2', 'one.t3', 'one.t4'] },
        { say: 'But now count the spaces between them: one, two, three, four. Only four spaces.', show: 'one.h', focus: 'one.h' },
        { say: 'Each space is one fourth, not one fifth. The denominator is the number of spaces in one whole, so always count the spaces.', focus: 'one' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A number line goes from $0$ to $2$. Each whole is cut into $3$ equal spaces. A point is $5$ spaces from $0$. Which number is at the point?',
          choices: ['$1\\dfrac{2}{3}$', '$\\dfrac{3}{5}$', '$2\\dfrac{1}{3}$', '$1\\dfrac{1}{3}$'],
          answer: 0,
          working: 'Each space is $\\tfrac{1}{3}$, so $5$ spaces is $\\tfrac{5}{3}$. Three spaces reach $1$, and two more go past it: $1\\tfrac{2}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A number line goes from zero to two. Each whole is cut into three equal spaces. A point is five spaces from zero. Which number is at the point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one and two thirds. Each space is one third, so five spaces is five thirds. Three spaces reach one, and two more go past it. Choice B swaps the numbers: five spaces of one third is five thirds, not three fifths.', show: 'q.answer' },
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
          items: ['Each whole on the line is cut into equal spaces; the denominator is the number of spaces.', 'To find a fraction, count that many spaces from $0$.', 'An improper fraction and its mixed number are at the same point.', 'Count spaces, not tick marks.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a number line, each whole is cut into equal spaces, and the denominator is the number of spaces in one whole.', show: 'sum.0' },
        { say: 'To find a fraction, count that many spaces from zero.', show: 'sum.1' },
        { say: 'An improper fraction and its mixed number are at the same point on the line.', show: 'sum.2' },
        { say: 'And always count the spaces, not the tick marks. In the next part, we compare fractions with zero, one half and one. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
