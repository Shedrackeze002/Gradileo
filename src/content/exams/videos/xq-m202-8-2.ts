import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 8.2 (solving rate problems). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 6.5, Solve Proportions and their Applications,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. There and back is 2 × 285 = 570
// miles, 570 ÷ 30 = 19 gallons, and 19 × $3.09 = $58.71, as in the book's answer.

/** The trip: home and Las Vegas (`places`), the drive there (`there`) and the drive home (`back`). */
function trip(): Part {
  const points: Record<string, [number, number]> = { H: [0, 0], V: [10, 0], H1: [0.3, 0.6], V1: [9.7, 0.6], H2: [0.3, -0.6], V2: [9.7, -0.6] };
  const items: DiagramItem[] = [
    { kind: 'label', id: 'home', at: 'H', tex: '\\text{Home}', place: 'right', dot: true, group: 'places' },
    { kind: 'label', id: 'vegas', at: 'V', tex: '\\text{Las Vegas}', place: 'left', dot: true, group: 'places' },
    { kind: 'line', id: 'there', from: 'H1', to: 'V1', tone: 'adj', arrow: true, label: '\\text{there: } 285 \\text{ mi}', labelSide: 'left' },
    { kind: 'line', id: 'back', from: 'V2', to: 'H2', tone: 'opp', arrow: true, label: '\\text{home: } 285 \\text{ mi}', labelSide: 'left' },
  ];
  return { points, items };
}

const tripFig = (height = 260) => figure('tr', [trip()], height);

const QUESTION =
  'Solve the proportion problem. Jesse’s car gets 30 miles per gallon of gas. If Las Vegas is 285 miles away, how many gallons of gas are needed to get there and then home? If gas is $3.09 per gallon, what is the total cost of the gas for the trip?';

const video: Explainer = {
  id: 'xq-m202-8-2',
  lessonId: '',
  exam: {
    lesson: 'm202-8-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.5, Solve Proportions and their Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications',
    question: QUESTION,
  },
  title: 'Exam Question: The Cost of Gas for a Road Trip (Solving Rate Problems)',
  thumbnailTitle: 'The Road Trip Gas Problem',
  thumbnail: 'tr',
  summary:
    'A real test question, solved one small step at a time: Jesse’s car gets 30 miles per gallon, Las Vegas is 285 miles away, and gas is $3.09 a gallon. How many gallons does the trip there and home need, and what does the gas cost? We double the distance to 570 miles, divide by 30 to get 19 gallons, and multiply by $3.09 to get $58.71. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Road Trip Gas Problem', subtitle: 'Solving rate problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using rates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve the proportion problem. Jesse’s car gets $30$ miles per gallon of gas. If Las Vegas is $285$ miles away, how many gallons of gas are needed to get there and then home? If gas is \\$3.09 per gallon, what is the total cost of the gas for the trip?',
          answer: '$19$ gallons, costing \\$58.71',
          working: '$2 \\times 285 = 570$ miles, $570 \\div 30 = 19$ gallons, and $19 \\times 3.09 = 58.71$ dollars.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve the proportion problem. Jesse\'s car gets 30 miles per gallon of gas. If Las Vegas is 285 miles away, how many gallons of gas are needed to get there and then home? If gas is 3 dollars and 9 cents per gallon, what is the total cost of the gas for the trip?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tripFig(), { kind: 'text', id: 't', size: 'md', md: 'Two answers: the **gallons** for the whole trip, there **and** home, and the **cost** of that gas.' }],
      lines: [
        { say: 'Jesse drives from home to Las Vegas, 285 miles.', show: ['tr.places', 'tr.there'] },
        { say: 'And then home again, another 285 miles.', show: 'tr.back' },
        { say: 'We need two answers: how many gallons the whole trip uses, and how much that gas costs.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rate', tone: 'key', title: 'A rate works both ways', md: '**Divide** by a rate to undo it: miles $\\div$ miles per gallon $=$ gallons. **Multiply** to use it: gallons $\\times$ dollars per gallon $=$ dollars.' },
        { kind: 'callout', id: 'units', tone: 'tip', title: 'Let the units decide', md: 'Write the units in every step. If they cancel to the unit you want, you chose the right operation.' },
      ],
      lines: [
        { say: 'Here is what we need. A rate connects two quantities, so it works in both directions. Divide miles by miles per gallon to get gallons. Multiply gallons by dollars per gallon to get dollars.', show: 'rate' },
        { say: 'And keep the units in every step. They tell you whether to multiply or divide.', show: 'units' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **whole distance**', 'Use $30$ mi/gal to find the **gallons**', 'Use \\$3.09 per gallon to find the **cost**'] }],
      lines: [
        { say: 'Here is the plan. First, find the whole distance, there and home.', show: 'plan.0' },
        { say: 'Second, use 30 miles per gallon to find the gallons.', show: 'plan.1' },
        { say: 'Third, use the price per gallon to find the cost.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The whole distance',
      layout: 'center',
      main: [tripFig(220), { kind: 'math', id: 'm', size: 'lg', lines: ['285 + 285 = 2 \\times 285 = \\good{570} \\text{ miles}'] }],
      lines: [
        { say: 'Step one. The trip is there and then home, so Jesse drives 285 miles twice.', show: ['tr.places', 'tr.there', 'tr.back'] },
        { say: '2 times 285 is 570 miles.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The gallons',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{30 \\text{ mi}}{1 \\text{ gal}} = \\dfrac{570 \\text{ mi}}{g}', '30g = 570', 'g = 570 \\div 30 = \\good{19} \\text{ gallons}'] }],
      lines: [
        { say: 'Step two. Write a proportion. 30 miles for 1 gallon is the same rate as 570 miles for g gallons.', show: 'm.0' },
        { say: 'Cross-multiply: 30 g equals 570.', show: 'm.1' },
        { say: 'Divide by 30: g is 19. That is the same as 570 miles divided by 30 miles per gallon. The trip needs 19 gallons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['19 \\text{ gal} \\times 3.09 \\text{ dollars per gal}', '= \\good{58.71} \\text{ dollars}'] }],
      lines: [
        { say: 'Step three. Each gallon costs 3 dollars and 9 cents, so multiply the gallons by the price per gallon. The gallons cancel, leaving dollars.', show: 'm.0' },
        { say: '19 times 3.09 is 58.71. The gas for the trip costs 58 dollars and 71 cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['19 \\times 30 = 570 \\text{ miles} \\ \\checkmark', '58.71 \\div 19 = 3.09 \\text{ per gallon} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. 19 gallons at 30 miles each is 570 miles, the whole trip.', show: 'm.0' },
        { say: 'And 58.71 shared over 19 gallons is 3.09 a gallon, the price in the question. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['$285 \\div 30 = 9.5$ gallons', 'that is only **one way**; the trip is there **and** home'],
            ['$570 \\times 30$', 'miles $\\div$ miles per gallon gives **gallons**'],
            ['only "$19$ gallons"', 'the question also asks for the **cost**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '285 divided by 30 is 9.5 gallons, but that only gets Jesse to Las Vegas. The trip is there and home.' },
        { say: 'Multiplying 570 by 30 gives a huge number that makes no sense. Let the units decide: miles divided by miles per gallon gives gallons.' },
        { say: 'And give both answers: the gallons, and the cost.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A car uses $8$ L of gas for every $100$ km. How much gas does it use on a $350$ km trip?',
          choices: ['$43.75$ L', '$2800$ L', '$35$ L', '$28$ L'],
          answer: 3,
          working: '$350$ km is $3.5$ hundreds of kilometres, and $3.5 \\times 8 = 28$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A car uses 8 litres of gas for every 100 kilometres. How much gas does it use on a 350 kilometre trip? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '350 kilometres is 3.5 lots of 100 kilometres, and each lot uses 8 litres. 3.5 times 8 is 28 litres: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the trip carefully: **there and back**?', '**Divide** by a rate to undo it', '**Multiply** by a rate to use it', 'Keep the **units**: they show which to do'] }],
      lines: [
        { say: 'Here is what to remember. Read the question carefully: is the trip one way, or there and back?', show: 'sum.0' },
        { say: 'Divide by a rate to undo it, like miles divided by miles per gallon.', show: 'sum.1' },
        { say: 'Multiply by a rate to use it, like gallons times dollars per gallon.', show: 'sum.2' },
        { say: 'And keep the units in every step. For more on solving rate problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
