import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 6.1 (linear relations, rate of change in context): a city of
// 287,500 people in 1960 and 275,900 in 1989. The question is an exercise from OpenStax College
// Algebra 2e, word for word (section 4.1, Linear Functions, CC BY-NC-SA 4.0), whose answer key
// gives a slope of −400: the population dropped by 400 people a year.

/** The two years joined by a line, with the run (29 years) and the rise (−11 600 people). */
const change = (height = 300): DiagramEl => ({
  kind: 'diagram',
  id: 'd',
  height,
  points: { A: [0, 17.5], B: [29, 5.9], C: [29, 17.5] },
  items: [
    { kind: 'line', id: 'line', from: 'A', to: 'B', tone: 'brand', weight: 5 },
    { kind: 'label', id: 'a', at: 'A', tex: '(1960,\\ 287\\,500)', place: 'above', dot: true, tone: 'adj' },
    { kind: 'label', id: 'b', at: 'B', tex: '(1989,\\ 275\\,900)', place: 'below', dot: true, tone: 'adj' },
    { kind: 'line', id: 'run', from: 'A', to: 'C', tone: 'adj', dashed: true, label: '29\\text{ years}', labelSide: 'right' },
    { kind: 'line', id: 'rise', from: 'C', to: 'B', tone: 'opp', dashed: true, label: '-11\\,600', labelSide: 'right' },
  ],
});

const QUESTION =
  'A city’s population in the year 1960 was 287,500. In 1989 the population was 275,900. Compute the rate of growth of the population and make a statement about the population rate of change in people per year.';

const video: Explainer = {
  id: 'xq-m10c-6-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-6-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 4.1, Linear Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions',
    question: QUESTION,
  },
  title: 'Exam Question: A Shrinking City. Rate of Change in People per Year',
  thumbnailTitle: 'A Shrinking City',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a city had 287,500 people in 1960 and 275,900 in 1989. We find the change in population and the change in time, divide to get a rate of change of −400 people per year, and say what it means: the city lost about 400 people a year. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Shrinking City', subtitle: 'Rate of change, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the rate of change of a city’s population. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$-400$ people per year: the population dropped by $400$ people each year.',
          working: '$\\dfrac{275{,}900 - 287{,}500}{1989 - 1960} = \\dfrac{-11{,}600}{29} = -400$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A city’s population in the year nineteen sixty was 287 thousand 500. In nineteen eighty-nine the population was 275 thousand 900. Compute the rate of growth of the population and make a statement about the population rate of change in people per year.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [change()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Two moments in time, two populations. How many **people per year** did the population change by?' }],
      lines: [
        { say: 'Let us picture it. We have two points: the year nineteen sixty with 287 thousand 500 people, and the year nineteen eighty-nine with 275 thousand 900.', show: ['d', 'd.a', 'd.b'] },
        { say: 'Join them with a line. The question asks how fast the population changed, in people per year, and what that means for the city.', show: ['d.line', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in output}}{\\text{change in input}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'The **units** are output units **per** input unit, here people per year. A **negative** rate means the output is going **down**.' },
      ],
      lines: [
        { say: 'Here is what we need. The rate of change is the change in the output divided by the change in the input. For a straight line, it is the slope.', show: 'f' },
        { say: 'Its units are output units per input unit, so here, people per year. And a negative rate of change means the output is going down.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the change in **population**', 'Find the change in **time**', '**Divide**, and say what it means'] }],
      lines: [
        { say: 'Here is the plan. First, find the change in population.', show: 'plan.0' },
        { say: 'Second, find the change in time.', show: 'plan.1' },
        { say: 'Third, divide, and say what the answer means.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two changes',
      layout: 'split',
      left: [change()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['275\\,900 - 287\\,500 = -11\\,600', '1989 - 1960 = 29'] }],
      lines: [
        { say: 'Step one. Take the later population minus the earlier one: 275 thousand 900 minus 287 thousand 500 is minus 11 thousand 600. The city lost 11 thousand 600 people.', show: ['d', 'd.a', 'd.b', 'd.line', 'd.rise', 'm.0'], focus: 'd.rise' },
        { say: 'Then the later year minus the earlier year, in the same order: nineteen eighty-nine minus nineteen sixty is 29 years.', show: ['d.run', 'm.1'], focus: 'd.run' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{-11\\,600\\text{ people}}{29\\text{ years}} = \\good{-400\\text{ people per year}}'] }, { kind: 'callout', id: 'mean', tone: 'key', title: 'What it means', md: 'From 1960 to 1989, the city’s population **dropped by 400 people each year**.' }],
      lines: [
        { say: 'Step two. Divide: minus 11 thousand 600 people over 29 years is minus 400 people per year. That is the rate of growth.', show: 'm.0', focus: 'm.0' },
        { say: 'The minus sign tells us the population went down. So the statement is: from nineteen sixty to nineteen eighty-nine, the city’s population dropped by 400 people each year.', show: 'mean' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['400 \\times 29 = 11\\,600', '287\\,500 - 11\\,600 = 275\\,900 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Losing 400 people a year for 29 years is 400 times 29, which is 11 thousand 600 people.', show: 'm.0' },
        { say: 'Start with 287 thousand 500 and take away 11 thousand 600. That gives 275 thousand 900, the population in nineteen eighty-nine.', show: 'm.1' },
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
            ['$+400$ people per year', 'the population went **down**: keep the minus sign'],
            ['$\\dfrac{29}{-11\\,600}$', 'output **over** input: people over years'],
            ['$\\dfrac{275\\,900 - 287\\,500}{1960 - 1989}$', 'subtract in the **same order** on top and bottom'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing plus 400 says the city grew, but it shrank. Keep the minus sign.' },
        { say: 'Dividing years by people gives the wrong units. The rate is people per year, so people go on top.' },
        { say: 'And subtract in the same order on the top and the bottom: later minus earlier both times. Mixing the order flips the sign.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tank holds $500$ L of water after $2$ minutes and $260$ L after $8$ minutes, draining steadily. What is the rate of change of the volume?',
          choices: ['$40$ L/min', '$-240$ L/min', '$-0.025$ L/min', '$-40$ L/min'],
          answer: 3,
          working: '$\\dfrac{260 - 500}{8 - 2} = \\dfrac{-240}{6} = -40$ L/min.',
        },
      ],
      lines: [
        { say: 'Your turn. A tank holds 500 litres after 2 minutes and 260 litres after 8 minutes, draining steadily. What is the rate of change of the volume? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The volume changes by 260 minus 500, minus 240 litres, over 8 minus 2, 6 minutes. Minus 240 over 6 is minus 40 litres per minute, choice D. A lost the sign, B forgot to divide by the time, and C divided the wrong way.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate of change $=$ change in output $\\div$ change in input', 'Subtract in the **same order**: later minus earlier', 'Units: output **per** input', 'Negative means **decreasing**'] }],
      lines: [
        { say: 'Here is what to remember. The rate of change is the change in output divided by the change in input.', show: 'sum.0' },
        { say: 'Subtract in the same order on top and bottom.', show: 'sum.1' },
        { say: 'Give the units: output per input.', show: 'sum.2' },
        { say: 'And a negative rate means the quantity is decreasing. For more on linear relations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
