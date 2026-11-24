import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 1.1 (rates, ratios and proportions). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions and their
// Applications, CC BY-NC-SA 4.0), with its set's instruction in front of it. 190 miles in 3 hours
// is the same rate as 812 miles in t hours, so t = 3 × 812 ÷ 190 = 2,436 ÷ 190 ≈ 12.8 hours, as in
// the book's answer. Check: 190 ÷ 3 ≈ 63.3 mph, and 63.3 × 12.8 ≈ 811 miles.

/** The drive: Chicago, the point reached after 3 hours, and Mount Rushmore. */
function drive(): Part {
  const points: Record<string, [number, number]> = { C: [0, 0], P: [2.34, 0], R: [10, 0], C1: [0, -0.7], P1: [2.34, -0.7], C2: [0, -1.6], R2: [10, -1.6] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'road', from: 'C', to: 'R', tone: 'muted', weight: 6 },
    { kind: 'label', id: 'chi', at: 'C', tex: '\\text{Chicago}', place: 'above', dot: true, group: 'places' },
    { kind: 'label', id: 'rush', at: 'R', tex: '\\text{Mount Rushmore}', place: 'above', dot: true, group: 'places' },
    { kind: 'label', id: 'now', at: 'P', tex: '3 \\text{ h}', place: 'above', dot: true, tone: 'theta' },
    { kind: 'line', id: 'done', from: 'C1', to: 'P1', tone: 'theta', arrow: true, label: '190 \\text{ mi}', labelSide: 'right' },
    { kind: 'line', id: 'all', from: 'C2', to: 'R2', tone: 'adj', arrow: true, label: '812 \\text{ mi} \\text{ in } t \\text{ hours?}', labelSide: 'right' },
  ];
  return { points, items };
}

const driveFig = (height = 260) => figure('dr', [drive()], height);

const QUESTION =
  'Solve the proportion problem. Hugh leaves early one morning to drive from his home in Chicago to go to Mount Rushmore, 812 miles away. After 3 hours, he has gone 190 miles. At that rate, how long will the whole drive take?';

const video: Explainer = {
  id: 'xq-m103-1-1',
  lessonId: '',
  exam: {
    lesson: 'm103-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Drive to Mount Rushmore? (Rates and Proportions)',
  thumbnailTitle: 'How Long Is the Whole Drive?',
  thumbnail: 'dr',
  summary:
    'A real test question, solved one small step at a time: Hugh drives from Chicago to Mount Rushmore, 812 miles away, and after 3 hours he has gone 190 miles. At that rate, how long will the whole drive take? We set up the proportion 190/3 = 812/t, cross-multiply to get 190t = 2,436, and divide: t ≈ 12.8 hours. Then we check with his speed and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Whole Drive?', subtitle: 'Rates and proportions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rates and proportions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve the proportion problem. Hugh leaves early one morning to drive from his home in Chicago to go to Mount Rushmore, $812$ miles away. After $3$ hours, he has gone $190$ miles. At that rate, how long will the whole drive take?',
          answer: 'about $12.8$ hours',
          working: '$\\dfrac{190}{3} = \\dfrac{812}{t}$, so $t = \\dfrac{3 \\times 812}{190}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Hugh drives from his home in Chicago to Mount Rushmore, 812 miles away. After 3 hours, he has gone 190 miles. At that rate, how long will the whole drive take?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        driveFig(),
        { kind: 'text', id: 't', size: 'md', md: '$190$ miles took $3$ hours. At the **same rate**, how many hours do all $812$ miles take?' },
      ],
      lines: [
        { say: 'Here is the drive. Hugh starts in Chicago and heads for Mount Rushmore.', show: ['dr.road', 'dr.places'] },
        { say: 'After 3 hours, he has covered 190 miles.', show: ['dr.now', 'dr.done'] },
        { say: 'The whole trip is 812 miles. If he keeps the same rate, how many hours does it take?', show: ['dr.all', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{a}{b} = \\dfrac{c}{d} \\implies ad = bc'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Match the units', md: 'Put **miles on top** and **hours on the bottom** in **both** fractions.' },
      ],
      lines: [
        { say: 'Here is what we need. A proportion says two rates are equal. To solve one, cross-multiply: a times d equals b times c.', show: 'f' },
        { say: 'Keep the units in the same places on both sides: miles on top, and hours on the bottom.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**, miles over hours', '**Cross-multiply**', 'Divide to find $t$, and round'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion, with miles over hours on both sides.', show: 'plan.0' },
        { say: 'Cross-multiply.', show: 'plan.1' },
        { say: 'Then divide to find t, and round.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Write the proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{190 \\text{ miles}}{3 \\text{ hours}} = \\dfrac{812 \\text{ miles}}{t \\text{ hours}}'] }],
      lines: [
        { say: 'Step one. Let t be the hours for the whole drive. 190 miles in 3 hours is the same rate as 812 miles in t hours.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Cross-multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['190 \\times t = 3 \\times 812', '190t = 2{,}436'] }],
      lines: [
        { say: 'Step two. Cross-multiply: 190 times t equals 3 times 812.', show: 'm.0' },
        { say: '3 times 812 is 2,436. So 190 t equals 2,436.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = \\dfrac{2{,}436}{190} = 12.82\\ldots', 't \\approx \\good{12.8 \\text{ hours}}'] }],
      lines: [
        { say: 'Step three. Divide both sides by 190. 2,436 divided by 190 is 12.82, and a bit more.', show: 'm.0' },
        { say: 'To the nearest tenth, the whole drive takes about 12.8 hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{speed} = 190 \\div 3 \\approx 63.3 \\text{ mph}', '63.3 \\times 12.8 \\approx 811 \\text{ miles} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Hugh\'s speed is 190 miles in 3 hours, about 63.3 miles per hour.', show: 'm.0' },
        { say: 'At 63.3 miles per hour for 12.8 hours, he covers about 811 miles. That is 812, apart from rounding. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{190}{3} = \\dfrac{t}{812}$', 'units **flipped** on one side: hours belong on the bottom'],
            ['$812 - 190 = 622$ miles', 'that is the distance **left**, not the whole drive'],
            ['$12.8$ hours $= 12$ h $8$ min', '$0.8$ h is $0.8 \\times 60 = 48$ minutes'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Keep miles on top on both sides. If one fraction is flipped, the answer is nonsense.' },
        { say: '812 minus 190 is the distance still to go. The question asks about the whole drive.' },
        { say: 'And 12.8 hours is not 12 hours 8 minutes. Point 8 of an hour is 48 minutes, so it is about 12 hours 48 minutes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A painter uses $3$ cans of paint for $2$ rooms. At that rate, how many cans does she need for $8$ rooms?',
          choices: ['$5.3$', '$16$', '$12$', '$9$'],
          answer: 2,
          working: '$\\dfrac{3}{2} = \\dfrac{c}{8}$, so $2c = 24$ and $c = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. A painter uses 3 cans of paint for 2 rooms. At that rate, how many cans does she need for 8 rooms? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Cans over rooms on both sides: 3 over 2 equals c over 8. Cross-multiply: 2 c equals 24, so c is 12. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write two **equal rates** as a proportion', 'Keep the **units** in the same places', '**Cross-multiply**, then divide', 'Check with the **unit rate**'] }],
      lines: [
        { say: 'Here is what to remember. Write the two equal rates as a proportion.', show: 'sum.0' },
        { say: 'Keep the units in the same places on both sides.', show: 'sum.1' },
        { say: 'Cross-multiply, then divide.', show: 'sum.2' },
        { say: 'And check with the unit rate. For more on rates, ratios and proportions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
