import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 1.2 (operations and the order of operations). The question is
// an Everyday Math exercise from OpenStax Prealgebra 2e, word for word (section 1.3, Subtract Whole
// Numbers, CC BY-NC-SA 4.0). Noah has driven 115 + 230 = 345 of the 502 miles, so he has
// 502 − (115 + 230) = 157 miles left, as in the book's answer. Check: 115 + 230 + 157 = 502.

/** The road from Philadelphia to Cincinnati, to scale: the two drives and the miles left. */
const road = (height = 300): DiagramEl => ({
  kind: 'diagram',
  id: 'road',
  height,
  points: { P: [0, 0], G: [115, 0], L: [345, 0], C: [502, 0], T: [0, 60], B: [0, -60] },
  items: [
    { kind: 'line', id: 'd1', from: 'P', to: 'G', tone: 'adj', weight: 6, label: '115', labelSide: 'left', group: 'drive1' },
    { kind: 'line', id: 'd2', from: 'G', to: 'L', tone: 'opp', weight: 6, label: '230', labelSide: 'left', group: 'drive2' },
    { kind: 'line', id: 'left', from: 'L', to: 'C', tone: 'good', weight: 6, dashed: true, label: '?', labelSide: 'left', group: 'rest' },
    { kind: 'label', id: 'np', at: 'P', tex: '\\text{Philadelphia}', place: 'below', dot: true, group: 'ends' },
    { kind: 'label', id: 'nc', at: 'C', tex: '\\text{Cincinnati}', place: 'below', dot: true, group: 'ends' },
    { kind: 'label', id: 'ng', at: 'G', tex: '\\text{gas}', place: 'below', dot: true, group: 'drive1' },
    { kind: 'label', id: 'nl', at: 'L', tex: '\\text{lunch}', place: 'below', dot: true, group: 'drive2' },
  ],
});

const QUESTION =
  'Road trip Noah was driving from Philadelphia to Cincinnati, a distance of 502 miles. He drove 115 miles, stopped for gas, and then drove another 230 miles before lunch. How many more miles did he have to travel?';

const video: Explainer = {
  id: 'xq-m104-1-2',
  lessonId: '',
  exam: {
    lesson: 'm104-1-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.3, Subtract Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-3-subtract-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Miles Are Left? (Operations and the Order of Operations)',
  thumbnailTitle: 'How Many Miles Are Left?',
  thumbnail: 'road',
  summary:
    'A real test question, solved one small step at a time: Noah is driving 502 miles from Philadelphia to Cincinnati. He drives 115 miles, stops for gas, then drives another 230 miles before lunch. How many more miles does he have to travel? We add the miles he has driven, then subtract from the whole trip: 502 − (115 + 230) = 157 miles. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Miles Are Left?', subtitle: 'The order of operations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about choosing operations and the order of operations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Road trip** Noah was driving from Philadelphia to Cincinnati, a distance of $502$ miles. He drove $115$ miles, stopped for gas, and then drove another $230$ miles before lunch. How many more miles did he have to travel?',
          answer: '$157$ miles',
          working: '$502 - (115 + 230) = 502 - 345 = 157$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Noah was driving from Philadelphia to Cincinnati, a distance of 502 miles. He drove 115 miles, stopped for gas, and then drove another 230 miles before lunch. How many more miles did he have to travel?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [road(), { kind: 'text', id: 't', size: 'md', md: 'The whole trip is $502$ miles. We want the part that is **left**.' }],
      lines: [
        { say: 'Here is the whole road, from Philadelphia to Cincinnati. It is 502 miles long.', show: 'road.ends' },
        { say: 'First Noah drives 115 miles, to the gas station.', show: 'road.drive1' },
        { say: 'Then he drives another 230 miles before lunch.', show: 'road.drive2' },
        { say: 'The question asks for the part of the road that is left.', show: ['road.rest', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{left} = \\text{whole trip} - \\text{miles driven}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Brackets first', md: 'Put the miles driven in **brackets**: $502 - (115 + 230)$. Work out the brackets **first**.' },
      ],
      lines: [
        { say: 'Here is what we need. The miles left are the whole trip minus the miles he has already driven.', show: 'f' },
        { say: 'The miles driven are two numbers added together, so we put them in brackets. In the order of operations, brackets come first.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the miles driven', '**Subtract** from the whole trip', 'Check that the three parts make $502$'] }],
      lines: [
        { say: 'Here is the plan. Add the miles he has driven.', show: 'plan.0' },
        { say: 'Subtract that from the whole trip.', show: 'plan.1' },
        { say: 'Then check that the three parts make 502.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Miles driven',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['115 + 230 = 345 \\text{ miles}'] }],
      lines: [
        { say: 'Step one. The brackets first. 115 plus 230 is 345. Noah has driven 345 miles so far.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['502 - (115 + 230)', '= 502 - 345 = \\good{157 \\text{ miles}}'] }],
      lines: [
        { say: 'Step two. Take the miles driven away from the whole trip: 502 minus 345.', show: 'm.0' },
        { say: 'That is 157. Noah has 157 more miles to travel.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [road(260), { kind: 'math', id: 'm', size: 'md', lines: ['115 + 230 + 157 = 502 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The three parts of the road should add up to the whole trip.', show: ['road', 'road.ends', 'road.drive1', 'road.drive2', 'road.rest'] },
        { say: '115 plus 230 plus 157 is 502. It checks out.', show: 'm' },
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
            ['$115 + 230 = 345$', 'that is the miles **driven**, not the miles **left**'],
            ['$502 - 115 + 230 = 617$', 'both drives must be **taken away**: use brackets'],
            ['$502 + 115 + 230 = 847$', 'more than the whole trip: **subtract**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '345 is how far Noah has driven, not how far he still has to go.' },
        { say: 'Writing 502 minus 115 plus 230 adds the second drive back on. Both drives must be taken away, so put them in brackets.' },
        { say: 'And adding everything gives more than the whole trip. That cannot be the part that is left.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A delivery route is $420$ km long. A driver drives $135$ km, stops for a break, then drives another $160$ km. How many more kilometres are left?',
          choices: ['$715$ km', '$295$ km', '$125$ km', '$445$ km'],
          answer: 2,
          working: '$420 - (135 + 160) = 420 - 295 = 125$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A delivery route is 420 kilometres long. A driver drives 135 kilometres, stops for a break, then drives another 160 kilometres. How many more kilometres are left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The driver has driven 135 plus 160, which is 295 kilometres. 420 minus 295 is 125 kilometres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Left $=$ whole $-$ part done', 'Several parts done: **add** them first', 'Use **brackets**, and work them out first', 'Check: the parts add up to the **whole**'] }],
      lines: [
        { say: 'Here is what to remember. What is left is the whole minus the part already done.', show: 'sum.0' },
        { say: 'When there are several parts done, add them first.', show: 'sum.1' },
        { say: 'Use brackets to show that, and work them out first.', show: 'sum.2' },
        { say: 'And check that the parts add up to the whole. For more on choosing operations and the order of operations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
