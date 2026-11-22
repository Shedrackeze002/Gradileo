import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 1.5 (infinite geometric series): a pendulum whose swings
// shrink to 3/4 of the one before. The question is an exercise from OpenStax College Algebra 2e,
// word for word (section 9.4, Series and Their Notations, CC BY-NC-SA 4.0), whose answer key
// gives 12 feet: S = t1/(1 − r) = 3/(1 − 3/4) = 12.

const SWINGS = 9;

/** The swings laid end to end along a line from 0 to 12 feet, each 3/4 of the one before. */
const track = (height = 300, limit = true): DiagramEl => {
  const points: Record<string, [number, number]> = { O: [0, 0], E: [12, 0], T0: [12, -0.9], T1: [12, 2.2], Z: [0, -0.4] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'base', from: 'O', to: 'E', tone: 'muted', group: 'axis' },
    { kind: 'label', id: 'zero', at: 'Z', tex: '0', place: 'below', group: 'axis' },
  ];
  let x = 0;
  let len = 3;
  for (let k = 0; k < SWINGS; k++) {
    points[`s${k}`] = [x, 0.6];
    points[`e${k}`] = [x + len, 0.6];
    points[`m${k}`] = [x + len / 2, 0.6];
    const group = `sw${k}`;
    items.push({ kind: 'line', id: `seg${k}`, from: `s${k}`, to: `e${k}`, tone: k % 2 === 0 ? 'adj' : 'opp', weight: 9, group });
    if (k < 3) items.push({ kind: 'label', id: `l${k}`, at: `m${k}`, tex: ['3', '2.25', '1.69'][k], place: 'above', tone: k % 2 === 0 ? 'adj' : 'opp', group });
    x += len;
    len *= 0.75;
  }
  if (limit) items.push(
    { kind: 'line', id: 'lim', from: 'T0', to: 'T1', tone: 'good', dashed: true, group: 'limit' },
    { kind: 'label', id: 'limit', at: 'T0', tex: '12 \\text{ ft}', place: 'below', tone: 'good', group: 'limit' },
  );
  return { kind: 'diagram', id: 'tr', height, points, items };
};

const QUESTION =
  'A pendulum travels a distance of 3 feet on its first swing. On each successive swing, it travels 3/4 the distance of the previous swing. What is the total distance traveled by the pendulum when it stops swinging?';

const video: Explainer = {
  id: 'xq-m201-1-5',
  lessonId: '',
  exam: {
    lesson: 'm201-1-5',
    source: 'OpenStax, College Algebra 2e, Exercise in section 9.4, Series and Their Notations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/9-4-series-and-their-notations',
    question: QUESTION,
  },
  title: 'Exam Question: The Total Distance of a Pendulum (Infinite Geometric Series)',
  thumbnailTitle: 'How Far Does the Pendulum Go?',
  thumbnail: 'tr',
  summary:
    'A real test question, solved one small step at a time: a pendulum swings 3 feet, and each swing after that is 3/4 of the one before. The swings never quite stop growing the total, but the total never passes 12 feet: the sum of the infinite geometric series is 3 ÷ (1 − 3/4) = 12 feet. We see it swing by swing and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Shrinking Pendulum', subtitle: 'Infinite geometric series, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about infinite geometric series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A pendulum travels a distance of $3$ feet on its first swing. On each successive swing, it travels $\\tfrac{3}{4}$ the distance of the previous swing. What is the total distance traveled by the pendulum when it stops swinging?',
          answer: '$12$ feet',
          working: '$S_\\infty = \\dfrac{3}{1 - \\frac{3}{4}} = \\dfrac{3}{\\frac{1}{4}} = 12$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A pendulum travels a distance of 3 feet on its first swing. On each successive swing, it travels 3 quarters the distance of the previous swing. What is the total distance traveled by the pendulum when it stops swinging?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The swings get **shorter and shorter**, and we add them **all**, forever. The question asks what that never-ending sum comes to.' }],
      lines: [{ say: 'Each swing is shorter than the last, and the pendulum keeps swinging, with smaller and smaller swings, until it stops. We need the total of all of those swings added together.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Infinite geometric series', md: 'If $-1 < r < 1$, the terms shrink toward $0$ and the sum of **all** the terms gets closer and closer to one number:' },
        { kind: 'math', id: 'f', size: 'md', lines: ['S_\\infty = \\dfrac{t_1}{1 - r}'] },
      ],
      lines: [
        { say: 'Here is what we need. When the common ratio is between minus 1 and 1, the terms shrink toward 0, and the sum of all the terms gets closer and closer to one number.', show: 'def' },
        { say: 'That number is the sum to infinity: t 1 over 1 minus r.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $t_1$ and $r$', 'Check that $-1 < r < 1$', 'Use $S_\\infty = \\dfrac{t_1}{1 - r}$'] }],
      lines: [
        { say: 'Here is the plan. First, find the first term and the common ratio.', show: 'plan.0' },
        { say: 'Second, check that the ratio is between minus 1 and 1, so the sum exists.', show: 'plan.1' },
        { say: 'Third, use the sum to infinity formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The swings',
      layout: 'center',
      main: [track(300, false), { kind: 'math', id: 'm', size: 'md', lines: ['3 + 2.25 + 1.6875 + \\cdots \\qquad t_1 = 3, \\ \\ r = \\tfrac{3}{4}'] }],
      lines: [
        { say: 'Step one. The first swing is 3 feet.', show: ['tr', 'tr.axis', 'tr.sw0'] },
        { say: 'The second is 3 quarters of 3, which is 2.25 feet. The third is 3 quarters of that, about 1.69 feet.', show: ['tr.sw1', 'tr.sw2'] },
        { say: 'Laid end to end, the swings keep adding on, but each piece is smaller than the last.', show: ['tr.sw3', 'tr.sw4', 'tr.sw5', 'tr.sw6', 'tr.sw7', 'tr.sw8'] },
        { say: 'So this is a geometric series with first term 3 and common ratio 3 quarters.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Does the sum exist?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-1 < \\tfrac{3}{4} < 1 \\ \\checkmark'] }, { kind: 'text', id: 't', size: 'md', md: 'The swings shrink toward $0$, so the total settles on one number.' }],
      lines: [
        { say: 'Step two. 3 quarters is between minus 1 and 1.', show: 'm.0' },
        { say: 'So the swings shrink toward 0, and the total settles on one number. The sum to infinity exists.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: The sum to infinity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S_\\infty = \\dfrac{3}{1 - \\frac{3}{4}}', '= \\dfrac{3}{\\frac{1}{4}} = 3 \\times 4', '= \\good{12 \\text{ feet}}'] }],
      lines: [
        { say: 'Step three. The sum to infinity is 3 over 1 minus 3 quarters.', show: 'm.0' },
        { say: '1 minus 3 quarters is 1 quarter. Dividing by a quarter is the same as multiplying by 4, so it is 3 times 4.', show: 'm.1' },
        { say: 'That is 12. The pendulum travels a total of 12 feet. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        track(),
        {
          kind: 'table',
          id: 'sums',
          head: ['Swings', '1', '2', '3', '5', '10', '20'],
          rows: [['Total (ft)', '3', '5.25', '6.94', '9.15', '11.32', '11.96']],
        },
      ],
      lines: [
        { say: 'Let us check. Here are all the swings laid end to end. They crowd up against 12 feet, but never pass it.', show: ['tr', 'tr.axis', 'tr.sw0', 'tr.sw1', 'tr.sw2', 'tr.sw3', 'tr.sw4', 'tr.sw5', 'tr.sw6', 'tr.sw7', 'tr.sw8', 'tr.limit'], focus: 'tr.limit' },
        { say: 'Adding up: after 1 swing, 3 feet. After 2, 5.25. After 5, about 9.15. After 10, about 11.32, and after 20, about 11.96. The totals close in on 12.', show: 'sums' },
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
            ['$\\dfrac{3}{1 + \\frac{3}{4}} \\approx 1.71$', 'the formula is $1 \\, \\boldsymbol{-} \\, r$; the total must be more than $3$'],
            ['"It goes on forever, so the total is infinite"', 'the swings shrink fast enough for the total to settle'],
            ['$\\dfrac{3}{4} \\div \\left(1 - 3\\right)$', '$t_1$ is the **first swing**, $3$; $r$ is the ratio, $\\tfrac{3}{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The formula has 1 minus r, not 1 plus r. A total of about 1.71 feet cannot be right, because the first swing alone is 3 feet.' },
        { say: 'An endless number of swings does not mean an endless distance. The swings shrink fast enough for the total to settle on 12.' },
        { say: 'And do not swap the first term and the ratio. The first term is 3 feet, and the ratio is 3 quarters.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the sum of the infinite geometric series $8 + 4 + 2 + 1 + \\cdots$',
          choices: ['$16$', '$15$', '$8$', 'There is no sum'],
          answer: 0,
          working: '$r = \\tfrac{1}{2}$, so $S_\\infty = \\dfrac{8}{1 - \\frac{1}{2}} = 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of the infinite geometric series 8 plus 4 plus 2 plus 1, and so on. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The ratio is one half, which is between minus 1 and 1, so the sum exists. It is 8 over 1 minus one half, which is 8 over one half, or 16, choice A. 15 is only the first four terms added.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Shrinking by the same ratio: **geometric**', 'A sum to infinity exists when $-1 < r < 1$', '$S_\\infty = \\dfrac{t_1}{1 - r}$', 'Check it is **more** than the first term (for $r > 0$)'] }],
      lines: [
        { say: 'Here is what to remember. Terms that shrink by the same ratio form a geometric series.', show: 'sum.0' },
        { say: 'A sum to infinity exists when the ratio is between minus 1 and 1.', show: 'sum.1' },
        { say: 'It is t 1 over 1 minus r.', show: 'sum.2' },
        { say: 'And when r is positive, check that the total is more than the first term. For more on infinite geometric series, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
