import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot, tag } from './lib/m302-6-graphs.ts';

// A tracer with a half-life of 6 hours: 80 mg at the start, A = 80(1/2)^(t/6).
const g = plane({ x: [0, 30], y: [0, 90], xStep: 3, yStep: 10, every: 0, width: 8, height: 7, titles: { x: '\\text{Time (h)}', y: '\\text{Amount (mg)}' } });
const a = (t: number) => 80 * 0.5 ** (t / 6);
const tracer = () =>
  figure('tr', [
    g,
    numbers(g, 6, 20),
    plot(g, { id: 'curve', f: a, samples: 200 }),
    dots(g, [0, 6, 12, 18, 24].map((t) => ({ id: `h${t}`, x: t, y: a(t), tex: String(a(t)), tone: 'adj' as const, place: t === 0 ? ('right' as const) : ('above right' as const), group: 'halves' }))),
    guide(g, 'g15', [15, 0], [15, a(15)], 'good', { group: 'at15' }),
    // The label sits in the clear space above the curve's tail, joined to its point.
    guide(g, 'lead', [15.4, 15.8], [19.2, 26], 'good', { dashed: false, weight: 2, group: 'at15' }),
    tag(g, 'P-t', 19.4, 27, '(15, 14.1)', 'above right', 'good', 'at15'),
    dots(g, [{ id: 'P', x: 15, y: a(15), tone: 'good', group: 'at15' }]),
  ]);

const video: Explainer = {
  id: 'm302-6-4-b',
  lessonId: 'm302-6-4',
  title: 'Modelling with Exponential and Logarithmic Functions, Part 2: Growth, Depreciation and Half-Life',
  thumbnailTitle: 'Growth, Depreciation and Half-Life',
  thumbnail: 'tr',
  summary: 'The growth model P₀(1 + r)ᵗ, the depreciation model V₀(1 − r)ᵗ and the half-life model A₀(½)^(t/h), where t/h counts half-lives; a tracer with a 6-hour half-life given at 80 mg: about 14.1 mg after 15 hours, and 5 mg after 24 hours; and why the exponent is t/h, not t.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 2', title: 'Growth, Depreciation and Half-Life', subtitle: 'The same factor in every time step' }],
      lines: [
        { say: 'A town grows by two percent a year. A car loses twelve percent of its value a year. A medicine in the blood drops by half every six hours. All three multiply by the same factor in each time step.', show: 'title' },
        { say: 'In this video, you will meet the models for growth, depreciation and half-life, and use a half-life model to answer two questions.' },
      ],
    },
    {
      chapter: 'Three models',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Model', 'Example'],
          rows: [
            ['Growth at rate $r$', '$P = P_0(1 + r)^t$', '$8000(1.02)^t$'],
            ['Depreciation at rate $r$', '$V = V_0(1 - r)^t$', '$30\\,000(0.88)^t$'],
            ['Half-life $h$', '$A = A_0\\left(\\frac{1}{2}\\right)^{t/h}$', '$80\\left(\\frac{1}{2}\\right)^{t/6}$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Counting half-lives', md: 'In the half-life model, $\\dfrac{t}{h}$ counts how many half-lives have passed.' },
      ],
      lines: [
        { say: 'Growth at a rate of r per time step is P naught times one plus r, to the power t. P naught is the starting amount, and t is the number of time steps. A town of 8,000 people, growing at two percent a year, has 8,000 times 1.02 to the power t people after t years.', show: 't.0', focus: 't.0' },
        { say: 'Depreciation means losing value. Depreciation at a rate of r is V naught times one minus r, to the power t. A 30,000 dollar car that loses twelve percent of its value a year is worth 30,000 times 0.88 to the power t after t years.', show: 't.1', focus: 't.1' },
        { say: 'A half-life is the time it takes for half of a substance to be gone. With a half-life of h, the amount left is A naught times one half, to the power t over h.', show: 't.2', focus: 't.2' },
        { say: 'In the half-life model, t over h counts how many half-lives have passed. After one half-life, the amount is multiplied by one half. After two, by one quarter, and so on.', show: 'key' },
      ],
    },
    {
      chapter: 'A medical tracer',
      layout: 'split',
      leftWidth: 540,
      left: [tracer()],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'A tracer has a half-life of 6 hours, and a patient is given 80 mg: $A = 80\\left(\\frac{1}{2}\\right)^{t/6}$.' }],
      lines: [
        { say: 'A medical tracer has a half-life of six hours, and a patient is given 80 milligrams. The amount left after t hours is 80 times one half, to the power t over six.', show: ['q', 'tr.grid', 'tr.axes', 'tr.curve'] },
        { say: 'Every six hours, the amount halves. Eighty milligrams at the start, 40 after six hours, 20 after twelve, ten after 18, and five after 24 hours.', show: 'tr.halves', focus: 'tr.halves' },
        { say: 'The curve between those points shows the amount at every moment, not just at whole half-lives.', focus: 'tr.curve' },
      ],
    },
    {
      chapter: 'After 15 hours',
      layout: 'split',
      leftWidth: 540,
      left: [tracer()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{t}{h} = \\dfrac{15}{6} = 2.5', 'A = 80\\left(\\tfrac{1}{2}\\right)^{2.5} = 14.142\\ldots', 'A \\approx 14.1 \\text{ mg}'] }],
      lines: [
        { say: 'How much remains after 15 hours? First count the half-lives: fifteen over six is 2.5. So two and a half half-lives have passed.', show: ['tr.grid', 'tr.axes', 'tr.curve', 'tr.halves', 'm.0'], focus: 'm.0' },
        { say: 'So A is 80 times one half to the power 2.5, which is 14.142. About 14.1 milligrams remain.', show: ['m.1', 'm.2', 'tr.at15'], focus: ['m.1', 'm.2', 'tr.P'] },
        { say: 'That makes sense. Fifteen hours is between twelve hours, with 20 milligrams left, and 18 hours, with ten.', focus: ['tr.h12', 'tr.h18', 'tr.P'] },
      ],
    },
    {
      chapter: 'When will 5 mg remain?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 = 80\\left(\\tfrac{1}{2}\\right)^{t/6}', '\\left(\\tfrac{1}{2}\\right)^{t/6} = \\dfrac{5}{80} = \\dfrac{1}{16} = \\left(\\tfrac{1}{2}\\right)^{4}', '\\dfrac{t}{6} = 4', 't = 24 \\text{ hours}'] },
      ],
      lines: [
        { say: 'When will five milligrams remain? This time the unknown is in the exponent. Set A equal to five.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by 80: one half, to the power t over six, equals five over 80, which is one sixteenth.', show: 'm.1', focus: 'm.1' },
        { say: 'One sixteenth is one half to the fourth: one half times one half times one half times one half. The bases match, so the exponents are equal: t over six equals four.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply by six: t equals 24. So five milligrams remain after 24 hours, which is four half-lives. If the numbers did not share a base, you would take the log of both sides instead.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using t instead of t/h', md: 'After 15 hours with a half-life of 6 hours, the exponent is $\\frac{15}{6}$, not $15$. Using $15$ would mean 15 half-lives have passed.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['80\\left(\\tfrac{1}{2}\\right)^{15/6} \\approx \\good{14.1 \\text{ mg}}', '80\\left(\\tfrac{1}{2}\\right)^{15} \\approx \\bad{0.0024 \\text{ mg}}'] },
      ],
      lines: [
        { say: 'Watch the exponent. After 15 hours with a half-life of six hours, the exponent is fifteen over six, not fifteen.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Using fifteen would mean that fifteen half-lives have passed, and only about 0.0024 milligrams would be left: almost nothing. Always divide the time by the half-life.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 200 mg sample has a half-life of 5 days, so $A = 200\\left(\\frac{1}{2}\\right)^{t/5}$. How much remains after 15 days?',
          choices: ['$25$ mg', '$66.7$ mg', '$0.006$ mg', '$100$ mg'],
          answer: 0,
          working: '$\\dfrac{t}{h} = \\dfrac{15}{5} = 3$ half-lives, so $A = 200\\left(\\frac{1}{2}\\right)^3 = \\dfrac{200}{8} = 25$ mg.',
        },
      ],
      lines: [
        { say: 'Your turn. A 200 milligram sample has a half-life of five days. How much remains after 15 days? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen days is fifteen over five, which is three half-lives. So the sample is cut in half three times: 200, 100, 50, then 25 milligrams. Choice C uses fifteen as the exponent, as if fifteen half-lives had passed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Growth: $P_0(1 + r)^t$. Depreciation: $V_0(1 - r)^t$.', 'Half-life: $A_0\\left(\\frac{1}{2}\\right)^{t/h}$, where $\\frac{t}{h}$ counts half-lives.', 'To find a time, isolate the power, then match bases or take $\\log$ of both sides.'] }],
      lines: [
        { say: 'Let’s sum up. Growth is P naught times one plus r, to the power t, and depreciation is V naught times one minus r, to the power t.', show: 'sum.0' },
        { say: 'Half-life is A naught times one half, to the power t over h, where t over h counts the half-lives.', show: 'sum.1' },
        { say: 'And to find a time, isolate the power, then match the bases, or take the log of both sides. In the next part, we use regression equations to make predictions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
