import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sides } from '@/content/math6/videos/lib/m6-6-figures.ts';

// A rectangle 8 cm long and 5 cm wide, with each side labelled.
const rect = (id: string) =>
  figure(
    id,
    [
      sides({
        corners: [
          [0, 0],
          [8, 0],
          [8, 5],
          [0, 5],
        ],
        labels: ['l = 8\\text{ cm}', 'w = 5\\text{ cm}', 'l', 'w'],
        tones: ['adj', 'opp', 'adj', 'opp'],
      }),
    ],
    320,
  );

const video: Explainer = {
  id: 'm7-6-1-e',
  lessonId: 'm7-6-1',
  title: 'Expressions and Equations, Part 5: Formulas with More Than One Variable',
  thumbnailTitle: 'Formulas',
  thumbnail: 'r',
  summary:
    'A formula is an equation that tells you how to work out one amount from others. In basketball, P = 2t + 3h + f gives a player’s points from t two-point baskets, h three-point baskets and f free throws: 6, 2 and 3 of them give 2(6) + 3(2) + 3 = 21 points. The perimeter of a rectangle, P = 2l + 2w, is 26 cm for l = 8 cm and w = 5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 5', title: 'Formulas with More Than One Variable', subtitle: 'Substitute every value, then calculate' }],
      lines: [
        { say: 'Some expressions have more than one variable. To evaluate them, you substitute a value for each variable, then calculate, just as before.', show: 'title' },
        { say: 'In this video, you will use a formula with three variables to count the points in a basketball game, and another to find the perimeter of a rectangle.' },
      ],
    },
    {
      chapter: 'Points in basketball',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of basket', 'Points for each', 'How many'],
          rows: [
            ['Two-point basket', '$2$', '$t$'],
            ['Three-point basket', '$3$', '$h$'],
            ['Free throw', '$1$', '$f$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'xl', lines: ['P = 2t + 3h + f'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Formula', md: 'A **formula** is an equation that tells you how to work out one amount from others.' },
      ],
      lines: [
        { say: 'In basketball, there are three ways to score. A two-point basket is worth two points. Let t be the number of two-point baskets a player makes.', show: 't.0', focus: 't.0' },
        { say: 'A three-point basket is worth three points. Let h be the number of three-point baskets.', show: 't.1', focus: 't.1' },
        { say: 'And a free throw is worth one point. Let f be the number of free throws.', show: 't.2', focus: 't.2' },
        { say: 'Then the player’s points, P, are given by: P equals two t plus three h plus f. Each coefficient is the number of points for each basket of that kind.', show: 'm.0', focus: 'm.0' },
        { say: 'An equation like this is called a formula. It tells you how to work out one amount, the points, from the others.', show: 'def' },
      ],
    },
    {
      chapter: 'One player’s points',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kwame made $6$ two-point baskets, $2$ three-point baskets and $3$ free throws. How many points did he score?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P = 2t + 3h + f', 'P = 2(6) + 3(2) + 3', 'P = 12 + 6 + 3', 'P = 21'] },
      ],
      lines: [
        { say: 'Kwame made six two-point baskets, two three-point baskets and three free throws. How many points did he score?', show: ['q', 'm.0'] },
        { say: 'Substitute every value: t is six, h is two, and f is three. A number right next to a bracket means multiply, so two, then six in brackets, means two times six.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply first. Two times six is twelve, and three times two is six.', show: 'm.2', focus: 'm.2' },
        { say: 'Then add: twelve plus six plus three is twenty-one. Kwame scored twenty-one points.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The perimeter of a rectangle',
      layout: 'split',
      leftWidth: 620,
      left: [rect('r')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P = 2l + 2w', 'P = 2(8) + 2(5)', 'P = 16 + 10', 'P = 26', '\\text{Perimeter} = 26\\text{ cm}'] }],
      lines: [
        { say: 'Here is another formula. The perimeter of a rectangle is the distance all the way around it. Its length is l, and its width is w.', show: ['r.shape', 'r.l0', 'r.l1', 'r.l2', 'r.l3'] },
        { say: 'There are two lengths and two widths, so the perimeter is P equals two l plus two w.', show: 'm.0', focus: 'm.0' },
        { say: 'This rectangle is eight centimetres long and five centimetres wide. Substitute: two times eight, plus two times five.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply first: sixteen plus ten. Then add: twenty-six. The perimeter is twenty-six centimetres.', show: ['m.2', 'm.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $P = 2t + 3h + f$. A player makes $5$ two-point baskets, $4$ three-point baskets and $2$ free throws. How many points does the player score?',
          choices: ['$11$', '$22$', '$25$', '$24$'],
          answer: 3,
          working: '$P = 2(5) + 3(4) + 2 = 10 + 12 + 2 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the basketball formula. A player makes five two-point baskets, four three-point baskets and two free throws. How many points does the player score? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twenty-four. Two times five is ten, three times four is twelve, and ten plus twelve plus two is twenty-four. Choice A just counts the baskets, but each kind of basket is worth a different number of points.', show: 'q.answer' },
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
          items: ['A **formula** tells you how to work out one amount from others.', 'Substitute a value for **every** variable, then follow the order of operations.', '$2(6)$ means $2 \\times 6$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A formula is an equation that tells you how to work out one amount from others.', show: 'sum.0' },
        { say: 'To use a formula, substitute a value for every variable, then follow the order of operations.', show: 'sum.1' },
        { say: 'And a number right next to a bracket means multiply. In the next lesson, you will learn how to keep an equation balanced. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
