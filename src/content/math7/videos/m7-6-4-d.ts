import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars, sides } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The garden: a rectangle 5 m wide, its length l unknown, with 34 m of fencing all the way round.
const garden = (id: string) =>
  figure(
    id,
    [
      sides({
        corners: [
          [0, 0],
          [12, 0],
          [12, 5],
          [0, 5],
        ],
        labels: ['l', '5\\text{ m}', 'l', '5\\text{ m}'],
        tones: ['adj', 'opp', 'adj', 'opp'],
      }),
    ],
    300,
  );

// Three consecutive whole numbers: n, n + 1 and n + 2, which add to 51.
const three = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          { id: 'a', label: '\\text{first}', pieces: [{ w: 4, tex: 'n', tone: 'adj' }] },
          { id: 'b', label: '\\text{second}', pieces: [{ w: 4, tex: 'n', tone: 'adj' }, { w: 0.9, tex: '1', tone: 'opp' }] },
          { id: 'c', label: '\\text{third}', pieces: [{ w: 4, tex: 'n', tone: 'adj' }, { w: 0.9, tex: '1', tone: 'opp' }, { w: 0.9, tex: '1', tone: 'opp' }] },
        ],
        total: '51',
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm7-6-4-d',
  lessonId: 'm7-6-4',
  title: 'Solving Two-Step Equations, Part 4: Problems That Need a Plan',
  thumbnailTitle: 'Problems That Need a Plan',
  thumbnail: 'gd',
  summary:
    'Some problems need a plan before you can write the equation. A rectangular garden 5 m wide with 34 m of fencing round it: the perimeter is 2l + 2w, so 2l + 10 = 34, 2l = 24 and l = 12 m. Three consecutive whole numbers that add to 51 are n, n + 1 and n + 2: 3n + 3 = 51, so n = 16, and the numbers are 16, 17 and 18.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Problems That Need a Plan', subtitle: 'Think first, then write the equation' }],
      lines: [
        { say: 'Sometimes you cannot write the equation straight away. You need to think about the situation first, and make a plan.', show: 'title' },
        { say: 'In this video, you will solve two problems like that: one about fencing a garden, and one about three numbers in a row.' },
      ],
    },
    {
      chapter: 'Fencing a garden',
      layout: 'split',
      leftWidth: 560,
      left: [garden('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Leilani used $34$ m of fencing to go all the way around a rectangular garden. The garden is $5$ m wide. How long is it?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2l + 2w = 34', '2l + 10 = 34'] },
      ],
      lines: [
        { say: 'Leilani used thirty-four metres of fencing to go all the way around a rectangular garden. The garden is five metres wide. How long is it?', show: 'q' },
        { say: 'Make a plan. Draw the garden. We do not know its length, so call it l. Its width is five metres.', show: ['gd.shape', 'gd.l0', 'gd.l1', 'gd.l2', 'gd.l3'] },
        { say: 'The fencing goes all the way around, so thirty-four metres is the perimeter. A rectangle has two lengths and two widths, so its perimeter is two l plus two w.', show: 'm.0', focus: 'm.0' },
        { say: 'The width is five, and two times five is ten. So the equation is two l plus ten equals thirty-four.', show: 'm.1', focus: ['m.1', 'gd.l1', 'gd.l3'] },
      ],
    },
    {
      chapter: 'Solve and check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2l + 10 = 34', '2l = 24', 'l = 12', '\\text{Check: } 2(12) + 2(5) = 24 + 10 = 34 \\;\\checkmark'] }],
      lines: [
        { say: 'Now solve two l plus ten equals thirty-four.', show: 'm.0' },
        { say: 'Subtract ten from both sides. Thirty-four minus ten is twenty-four, so two l equals twenty-four. Both lengths added together are twenty-four metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by two. Twenty-four divided by two is twelve, so l equals twelve. The garden is twelve metres long.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: two lengths of twelve make twenty-four, two widths of five make ten, and twenty-four plus ten is thirty-four metres of fencing. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Three numbers in a row',
      layout: 'split',
      leftWidth: 560,
      left: [three('th')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The sum of three consecutive whole numbers is $51$. What are the numbers?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['n + (n + 1) + (n + 2) = 51', '3n + 3 = 51', '3n = 48', 'n = 16'] },
      ],
      lines: [
        { say: 'Consecutive whole numbers come one right after another, like four, five and six. The sum of three consecutive whole numbers is fifty-one. What are the numbers?', show: 'q' },
        { say: 'Make a plan. Let n be the smallest number. The next number is one more, n plus one. The one after that is two more, n plus two.', show: ['th.a-p0', 'th.a-label', 'th.b-p0', 'th.b-p1', 'th.b-label', 'th.c-p0', 'th.c-p1', 'th.c-p2', 'th.c-label'] },
        { say: 'Their sum is fifty-one. Together, the bars hold three n, plus one, plus one more, plus one more: three n plus three.', show: ['th.total', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'Subtract three from both sides: three n equals forty-eight. Divide both sides by three: n equals sixteen.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So the numbers are sixteen, seventeen and eighteen. Check: sixteen plus seventeen plus eighteen is fifty-one. It works!' },
      ],
    },
    {
      chapter: 'Make a plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Draw a picture, or write what you know.', 'Choose a letter for the unknown, and write the other amounts with it.', 'Write the equation, solve it, and check the answer in the story.'],
        },
      ],
      lines: [
        { say: 'Here is a plan that works for problems like these. First, draw a picture, or write down what you know.', show: 'b.0' },
        { say: 'Next, choose a letter for the unknown, and write the other amounts using that letter, like n plus one and n plus two.', show: 'b.1' },
        { say: 'Then write the equation, solve it, and check the answer in the story.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle has a perimeter of $30$ cm. It is $6$ cm wide. How long is it?',
          choices: ['$9$ cm', '$18$ cm', '$12$ cm', '$24$ cm'],
          answer: 0,
          working: 'The perimeter is $2l + 2w$: $2l + 12 = 30$. Subtract $12$: $2l = 18$. Divide by $2$: $l = 9$ cm. Check: $2(9) + 2(6) = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle has a perimeter of thirty centimetres. It is six centimetres wide. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, nine centimetres. Two l plus twelve equals thirty, so two l equals eighteen, and l equals nine. Choice B forgets to divide by two: eighteen centimetres is both lengths added together.', show: 'q.answer' },
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
          items: ['Some problems need a plan before you can write the equation.', 'Perimeter of a rectangle: $2l + 2w$.', 'Consecutive whole numbers: $n$, $n + 1$, $n + 2$.', 'Solve, then check in the story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Some problems need a plan before you can write the equation. Draw a picture, and name the unknown.', show: 'sum.0' },
        { say: 'The perimeter of a rectangle is two l plus two w.', show: 'sum.1' },
        { say: 'Three consecutive whole numbers can be written as n, n plus one, and n plus two.', show: 'sum.2' },
        { say: 'And always check your answer in the story. Well done: you can now solve two-step equations!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
