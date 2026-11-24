import { dots, plane, polyline } from '@/video/graph.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 1.2 (rate of change). The question is an Exercise from
// OpenStax College Algebra 2e, word for word (section 4.1, Linear Functions, CC BY-NC-SA 4.0). The
// rate of change is (275 900 − 287 500) ÷ (1989 − 1960) = −11 600 ÷ 29 = −400 people per year, so
// the population fell by 400 people each year, as in the book's answer.
// Check: 287 500 − 29 × 400 = 287 500 − 11 600 = 275 900.

const g = plane({
  x: [0, 30],
  y: [270, 295],
  xStep: 5,
  yStep: 5,
  every: 2,
  width: 14,
  height: 7,
  titles: { x: '\\text{year}', y: '\\text{population (thousands)}' },
  xTex: (x) => `${1960 + x}`,
});
const graph = (height = 400) =>
  figure(
    'g',
    [
      g,
      polyline(g, { id: 'line', points: [[0, 287.5], [29, 275.9]], tone: 'adj' }),
      polyline(g, { id: 'run', points: [[0, 287.5], [29, 287.5]], tone: 'theta', dashed: true }),
      polyline(g, { id: 'rise', points: [[29, 287.5], [29, 275.9]], tone: 'opp', dashed: true }),
      dots(g, [
        { id: 'a', x: 0, y: 287.5, tex: '(1960,\\ 287\\,500)', tone: 'adj', place: 'above right' },
        { id: 'b', x: 29, y: 275.9, tex: '(1989,\\ 275\\,900)', tone: 'adj', place: 'below left' },
      ]),
    ],
    height,
  );

const QUESTION =
  'A city’s population in the year 1960 was 287,500. In 1989 the population was 275,900. Compute the rate of growth of the population and make a statement about the population rate of change in people per year.';

const video: Explainer = {
  id: 'xq-m203-1-2',
  lessonId: '',
  exam: {
    lesson: 'm203-1-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 4.1, Linear Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Did the City Shrink? (Rate of Change)',
  thumbnailTitle: 'How Fast Did the City Shrink?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a city had 287,500 people in 1960 and 275,900 in 1989. Find the rate of change of the population in people per year. The population changed by 275,900 − 287,500 = −11,600 people over 1989 − 1960 = 29 years, and −11,600 ÷ 29 = −400. So the city lost 400 people each year. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Did the City Shrink?', subtitle: 'Rate of change, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rate of change. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A city’s population in the year $1960$ was $287{,}500$. In $1989$ the population was $275{,}900$. Compute the rate of growth of the population and make a statement about the population rate of change in people per year.',
          answer: '$-400$ people per year: the population fell by $400$ people each year',
          working: '$\\dfrac{275\\,900 - 287\\,500}{1989 - 1960} = \\dfrac{-11\\,600}{29} = -400$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A city\'s population in the year nineteen sixty was 287 thousand 500. In nineteen eighty-nine, the population was 275 thousand 900.', caption: 'A city’s population in the year 1960 was 287,500. In 1989, the population was 275,900.' },
        { say: 'Compute the rate of growth of the population, and make a statement about the rate of change in people per year.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(), { kind: 'text', id: 't', size: 'md', md: 'The **rate of change** is how much the population changes **each year**.' }],
      lines: [
        { say: 'Here are the two facts as points on a graph: the year, and the population in that year.', show: ['g', 'g.grid', 'g.axes', 'g.a', 'g.b'] },
        { say: 'Joining them, the line goes down, so the population fell. The rate of change says how many people that is each year.', show: ['g.line', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in population}}{\\text{change in time}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Later minus earlier', md: 'Subtract in the **same order** on the top and the bottom: the **later** value minus the **earlier** one. A **negative** rate means the amount is going **down**.' },
      ],
      lines: [
        { say: 'Here is what we need. The rate of change is the change in population, divided by the change in time.', show: 'f' },
        { say: 'Subtract in the same order on the top and the bottom: the later value minus the earlier one. A negative rate means the amount is going down.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **change in population**', 'Find the **change in time**', '**Divide**, and say what it means'] }],
      lines: [
        { say: 'Here is the plan. Find the change in population.', show: 'plan.0' },
        { say: 'Find the change in time.', show: 'plan.1' },
        { say: 'Then divide, and say what the answer means.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two changes',
      layout: 'center',
      main: [graph(340), { kind: 'math', id: 'm', size: 'md', lines: ['275\\,900 - 287\\,500 = -11\\,600 \\text{ people}', '1989 - 1960 = 29 \\text{ years}'] }],
      lines: [
        { say: 'Step one. The change in population is the later value minus the earlier one: 275 thousand 900 minus 287 thousand 500, which is negative 11 thousand 600 people.', caption: 'Step one. The change in population is the later value minus the earlier one: 275,900 − 287,500 = −11,600 people.', show: ['g', 'g.grid', 'g.axes', 'g.a', 'g.b', 'g.line', 'g.rise', 'm.0'], focus: 'm.0' },
        { say: 'Step two. The change in time, in the same order, is nineteen eighty-nine minus nineteen sixty, which is 29 years.', caption: 'Step two. The change in time, in the same order, is 1989 − 1960 = 29 years.', show: ['g.run', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{-11\\,600}{29} = \\good{-400 \\text{ people per year}}'] }],
      lines: [
        { say: 'Step three. Negative 11 thousand 600 divided by 29 is negative 400.', caption: 'Step three. −11,600 ÷ 29 = −400.', show: 'm.0', focus: 'm.0' },
        { say: 'So the rate of change is negative 400 people per year. Between those years, the city\'s population fell by 400 people each year.', caption: 'So the rate of change is −400 people per year. Between those years, the city’s population fell by 400 people each year.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['29 \\times 400 = 11\\,600', '287\\,500 - 11\\,600 = 275\\,900 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Losing 400 people a year for 29 years is 29 times 400, which is 11 thousand 600 people.', caption: 'Let us check. Losing 400 people a year for 29 years is 29 × 400 = 11,600 people.', show: 'm.0' },
        { say: '287 thousand 500 minus 11 thousand 600 is 275 thousand 900, the population in nineteen eighty-nine. It checks out.', caption: '287,500 − 11,600 = 275,900, the population in 1989. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$400$', 'lost the **sign**: the population went **down**'],
            ['$-11\\,600$', 'that is the **total** change: divide by the **years**'],
            ['$-386.7$', 'counted $30$ years: $1989 - 1960 = 29$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Positive 400 loses the sign. The population went down, so the rate is negative.' },
        { say: 'Negative 11 thousand 600 is the change over all 29 years. The question asks for people per year, so divide by the years.', caption: '−11,600 is the change over all 29 years. The question asks for people per year, so divide by the years.' },
        { say: 'And negative 386.7 divides by 30 years. Nineteen eighty-nine minus nineteen sixty is 29.', caption: 'And −386.7 divides by 30 years. 1989 − 1960 is 29.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A town had $12{,}000$ people in $2000$ and $15{,}000$ people in $2015$. What was its rate of change, in people per year?',
          choices: ['$3{,}000$', '$-200$', '$187.5$', '$200$'],
          answer: 3,
          working: '$\\dfrac{15\\,000 - 12\\,000}{2015 - 2000} = \\dfrac{3\\,000}{15} = 200$ people per year.',
        },
      ],
      lines: [
        { say: 'Your turn. A town had 12 thousand people in two thousand, and 15 thousand people in twenty fifteen. What was its rate of change, in people per year? Pause the video and try it.', caption: 'Your turn. A town had 12,000 people in 2000, and 15,000 people in 2015. What was its rate of change, in people per year? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The population grew by 3 thousand people in 15 years. 3 thousand divided by 15 is 200 people per year. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate of change $= \\dfrac{\\text{change in amount}}{\\text{change in time}}$', '**Later minus earlier**, top and bottom', '**Negative** means going **down**', 'Give the **units**: people per year'] }],
      lines: [
        { say: 'Here is what to remember. The rate of change is the change in the amount, divided by the change in time.', show: 'sum.0' },
        { say: 'Subtract later minus earlier, on the top and the bottom.', show: 'sum.1' },
        { say: 'A negative rate means the amount is going down.', show: 'sum.2' },
        { say: 'And give the units, here people per year. For more on rate of change, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
