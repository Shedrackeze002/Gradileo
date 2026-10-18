import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

/** One hour of painting, as sixths of the classroom: Aisha's 2, Mateo's 1, and the 3 they paint together. */
const hour = figure(
  'room',
  [
    strip({ name: 'a', parts: 6, shaded: 2, at: [0, 4], width: 6, height: 1, tone: 'adj', label: '\\text{Aisha: } \\dfrac{1}{3}' }),
    strip({ name: 'm', parts: 6, shaded: 1, at: [0, 2], width: 6, height: 1, tone: 'opp', label: '\\text{Mateo: } \\dfrac{1}{6}' }),
    strip({ name: 't1', parts: 6, shaded: 2, at: [0, 0], width: 6, height: 1, tone: 'adj' }),
    strip({ name: 't2', parts: 6, shaded: 1, from: 2, at: [0, 0], width: 6, height: 1, tone: 'opp', label: '\\text{Together: } \\dfrac{1}{2}' }),
    // `edge` belongs to no part: it widens the figure to hold the labels on the right.
    { points: { edge: [10.2, 2.5] }, items: [] },
  ],
  360,
);

const video: Explainer = {
  id: 'm302-4-3-c',
  lessonId: 'm302-4-3',
  title: 'Rational Equations, Part 3: Working Together',
  thumbnailTitle: 'Working Together',
  thumbnail: 'room',
  summary: 'Work-rate problems as rational equations: a job that takes 3 h alone is done at 1/3 of the job per hour, rates add, so Aisha (3 h) and Mateo (6 h) solve 1/3 + 1/6 = 1/t and paint a classroom together in 2 h, and why averaging or adding the times is wrong. Part 4 solves travel and average-cost problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 3', title: 'Working Together', subtitle: 'Rates add: $\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{t}$' }],
      lines: [
        { say: 'Working alone, Aisha can paint a classroom in three hours, and Mateo can paint it in six hours. How long do they take if they work together?', show: 'title' },
        { say: 'In this video, you will think of work as a rate, set up a rational equation, solve it, and check that the answer makes sense.' },
      ],
    },
    {
      chapter: 'Work as a rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Work as a rate', md: 'If a job takes $3$ hours, then in $1$ hour you do $\\dfrac{1}{3}$ of it. When people or machines work together, their rates **add**.' },
        { kind: 'table', id: 't', head: ['Worker', 'Time for the job', 'Part of the job in 1 h'], rows: [['Aisha', '3 h', '$\\dfrac{1}{3}$'], ['Mateo', '6 h', '$\\dfrac{1}{6}$'], ['Together', '$t$ h', '$\\dfrac{1}{t}$']] },
      ],
      lines: [
        { say: 'The key is to think about how much of the job gets done in one hour. If a job takes three hours, then in one hour you do one third of it.', show: 'key' },
        { say: 'Aisha takes three hours to paint the room, so in one hour Aisha paints one third of it.', show: 't.0', focus: 't.0' },
        { say: 'Mateo takes six hours, so in one hour Mateo paints one sixth of it.', show: 't.1', focus: 't.1' },
        { say: 'Let t be the time, in hours, that they take together. Then together they paint one over t of the room in one hour.', show: 't.2', focus: 't.2' },
        { say: 'When people work together, the parts they each do in an hour add up.' },
      ],
    },
    {
      chapter: 'Setting up the equation',
      layout: 'split',
      leftWidth: 560,
      left: [hour],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{1}{t}, \\quad t \\ne 0', '\\good{6t} \\cdot \\dfrac{1}{3} + \\good{6t} \\cdot \\dfrac{1}{6} = \\good{6t} \\cdot \\dfrac{1}{t}', '2t + t = 6', '3t = 6 \\quad\\to\\quad t = 2 \\text{ h}'],
        },
      ],
      lines: [
        { say: 'In one hour, Aisha paints one third of the room: two sixths.', show: ['room.a-frame', 'room.a-shade', 'room.a-label'], focus: 'room.a-shade' },
        { say: 'And Mateo paints one sixth.', show: ['room.m-frame', 'room.m-shade', 'room.m-label'], focus: 'room.m-shade' },
        { say: 'Together, in one hour, they paint one third plus one sixth of the room. That must equal one over t, the part they paint together in an hour.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve it. The LCD of three, six and t is six t. Multiply every term by six t. Six t times one third is two t, six t times one sixth is t, and six t times one over t is six.', show: 'm.1', focus: 'm.1' },
        { say: 'So two t plus t equals six. Three t equals six, and t equals two. Together, they paint the room in two hours.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The bars show it too. In one hour, Aisha paints two sixths and Mateo paints one sixth, so together they paint three sixths: half the room. The whole room takes two hours.', show: ['room.t1-frame', 'room.t1-shade', 'room.t2-frame', 'room.t2-shade', 'room.t2-label'], focus: ['room.t1-shade', 'room.t2-shade'] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that the answer is sensible', md: 'Working together must be faster than the faster worker alone. Here $2$ h is less than $3$ h, so the answer is reasonable.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{in 2 h: Aisha } \\dfrac{2}{3} + \\text{Mateo } \\dfrac{2}{6} = \\dfrac{2}{3} + \\dfrac{1}{3} = 1 \\text{ room} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Check that the answer makes sense. Working together must be faster than the faster worker working alone. Aisha alone takes three hours, and two hours is less than three, so the answer is reasonable.', show: 'tip' },
        { say: 'You can also check it directly. In two hours, Aisha paints two thirds of the room, and Mateo paints two sixths, which is one third. Two thirds plus one third is one whole room.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding or averaging the times', md: 'Times do not add when people work together; rates do. $3 + 6 = 9$ h and $\\dfrac{3 + 6}{2} = 4.5$ h are both **slower** than Aisha alone.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{9 \\text{ h}} \\qquad \\bad{4.5 \\text{ h}} \\qquad \\good{\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{1}{t} \\;\\to\\; 2 \\text{ h}}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the two times, or to average them.', show: 'oops' },
        { say: 'Three plus six is nine hours, and the average is four and a half hours. But both are slower than Aisha working alone, and a helper can never slow Aisha down.', show: 'm', focus: 'm' },
        { say: 'Times do not add when people work together; rates do. Add the parts of the job done in one hour, then solve for t.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One pump can empty a flooded basement in 4 h, and a second pump can empty it in 12 h. How long do the two pumps take together?',
          choices: ['$8$ h', '$16$ h', '$\\dfrac{1}{3}$ h', '$3$ h'],
          answer: 3,
          working: '$\\dfrac{1}{4} + \\dfrac{1}{12} = \\dfrac{1}{t}$. Multiply by $12t$: $3t + t = 12$, so $t = 3$ h.',
        },
      ],
      lines: [
        { say: 'Your turn. One pump can empty a flooded basement in four hours, and a second pump can empty it in twelve hours. How long do the two pumps take together? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three hours. In one hour, the pumps empty one quarter and one twelfth of the basement, so one quarter plus one twelfth equals one over t. Multiply every term by twelve t: three t plus t equals twelve, so t is three. Choice C, one third of an hour, is the part of the job they do in one hour, not the time.', show: 'q.answer' },
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
          items: ['A job that takes $a$ hours is done at $\\dfrac{1}{a}$ of the job per hour.', 'Rates add: $\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{t}$.', 'Working together is faster than the faster worker alone.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A job that takes "a" hours is done at one over "a" of the job per hour.', show: 'sum.0' },
        { say: 'When people or machines work together, their rates add: one over "a", plus one over b, equals one over t.', show: 'sum.1' },
        { say: 'And working together is always faster than the faster worker alone. In part four, we solve problems about travel times and average cost. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
