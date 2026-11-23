import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 3.2 (the imperial system). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 7.5, Systems of Measurement, Everyday Math,
// CC BY-NC-SA 4.0). 1 mile = 1,760 yards, and 1,760 ÷ 16 = 110, as in the book's answer (one
// reflector for each 16-yard space). Check: 110 × 16 = 1,760 yards, which is 1 mile.

/** A stretch of highway with reflectors every 16 yards, and the whole mile below it. */
function highway(): Part {
  const xs = [0, 1.3, 2.6, 3.9, 5.2];
  const points: Record<string, [number, number]> = { A: [0, 0], B: [10, 0], G0: [0, 0.35], G1: [1.3, 0.35], M0: [0, -0.9], M1: [10, -0.9], E: [7.3, 0], Z: [10, 0] };
  xs.forEach((x, i) => (points[`R${i}`] = [x, 0]));
  const items: DiagramItem[] = [
    { kind: 'line', id: 'road', from: 'A', to: 'B', tone: 'muted', weight: 6 },
    ...xs.map((_, i): DiagramItem => ({ kind: 'label', id: `r${i}`, at: `R${i}`, tex: '', dot: true, tone: 'theta', group: 'refl' })),
    { kind: 'label', id: 'more', at: 'E', tex: '\\cdots', place: 'center', group: 'refl' },
    { kind: 'label', id: 'end', at: 'Z', tex: '', dot: true, tone: 'theta', group: 'refl' },
    { kind: 'line', id: 'gap', from: 'G0', to: 'G1', tone: 'opp', label: '16 \\text{ yd}', labelSide: 'left' },
    { kind: 'line', id: 'mile', from: 'M0', to: 'M1', tone: 'adj', arrow: true, label: '1 \\text{ mile}', labelSide: 'right' },
  ];
  return { points, items };
}

const road = (height = 250) => figure('hw', [highway()], height);

const QUESTION =
  'Reflectors The reflectors in each lane-marking stripe on a highway are spaced 16 yards apart. How many reflectors are needed for a one-mile-long stretch of highway?';

const video: Explainer = {
  id: 'xq-m103-3-2',
  lessonId: '',
  exam: {
    lesson: 'm103-3-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: Reflectors Every 16 Yards for a Mile (The Imperial System)',
  thumbnailTitle: 'How Many Reflectors in a Mile?',
  thumbnail: 'hw',
  summary:
    'A real test question, solved one small step at a time: the reflectors on a highway are spaced 16 yards apart. How many are needed for a one-mile stretch? We change the mile to yards, 1 mile = 1,760 yards, then divide by the spacing: 1,760 ÷ 16 = 110 reflectors. Then we check by multiplying back and look at the traps, such as dividing feet by yards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Reflectors in a Mile?', subtitle: 'The imperial system, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about imperial units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Reflectors The reflectors in each lane-marking stripe on a highway are spaced $16$ yards apart. How many reflectors are needed for a one-mile-long stretch of highway?',
          answer: '$110$ reflectors',
          working: '$1$ mile $= 1{,}760$ yd, and $1{,}760 \\div 16 = 110$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'The reflectors in the lane-marking stripes on a highway are spaced 16 yards apart. How many reflectors are needed for a one-mile-long stretch of highway?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        road(),
        { kind: 'text', id: 't', size: 'md', md: 'One reflector for every $16$ yards. How many $16$-yard spaces fit in **one mile**?' },
      ],
      lines: [
        { say: 'Here is the highway, with a reflector every 16 yards.', show: ['hw.road', 'hw.refl', 'hw.gap'] },
        { say: 'The stretch is one mile long.', show: 'hw.mile' },
        { say: 'So the question is: how many 16-yard spaces fit into one mile? One reflector goes with each space.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ mile} = 5{,}280 \\text{ ft} = 1{,}760 \\text{ yd}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same units first', md: 'You can only divide a length by a spacing when both are in the **same unit**. Change the mile to **yards**.' },
      ],
      lines: [
        { say: 'Here is what we need. One mile is 5,280 feet. A yard is 3 feet, so one mile is 5,280 divided by 3, which is 1,760 yards.', show: 'f' },
        { say: 'We can only divide the length by the spacing when both are in the same unit. So we change the mile into yards.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change the mile to **yards**', '**Divide** by the spacing', '**Check** by multiplying back'] }],
      lines: [
        { say: 'Here is the plan. Change the mile to yards.', show: 'plan.0' },
        { say: 'Divide by the spacing, 16 yards.', show: 'plan.1' },
        { say: 'Then check by multiplying back.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mile in yards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ mile} \\times \\dfrac{1{,}760 \\text{ yd}}{1 \\text{ mile}} = \\good{1{,}760 \\text{ yd}}'] }],
      lines: [
        { say: 'Step one. Multiply by 1,760 yards over 1 mile. The miles cancel, and the stretch is 1,760 yards long.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide by the spacing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1{,}760 \\text{ yd} \\div 16 \\text{ yd}', '= \\good{110 \\text{ reflectors}}'] }],
      lines: [
        { say: 'Step two. Divide the 1,760 yards by the 16-yard spacing.', show: 'm.0' },
        { say: '1,760 divided by 16 is 110. There are 110 spaces of 16 yards, so 110 reflectors are needed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['110 \\times 16 \\text{ yd} = 1{,}760 \\text{ yd} = 1 \\text{ mile} \\ \\checkmark'] },
        { kind: 'callout', id: 'c', tone: 'tip', title: 'One at the start too?', md: 'The book counts **one reflector for each space**: $110$. If you also put one at the very start of the mile, you would need $111$.' },
      ],
      lines: [
        { say: 'Let us check by multiplying back. 110 reflectors, 16 yards apart, cover 110 times 16, which is 1,760 yards. That is exactly one mile. It checks out.', show: 'm.0', focus: 'm.0' },
        { say: 'One small note. The book counts one reflector for each 16-yard space, which gives 110. If you also put a reflector at the very start of the mile, you would need one more, 111.', show: 'c' },
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
            ['$1 \\div 16$', 'miles and yards **do not match**: change to yards first'],
            ['$5{,}280 \\div 16 = 330$', '$5{,}280$ is **feet**, but the spacing is in yards'],
            ['$1{,}760 \\times 16$', 'to count the spaces, **divide**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'One divided by 16 mixes miles with yards. Change the mile to yards first.' },
        { say: '5,280 is the number of feet in a mile, not yards. Dividing it by 16 gives 330, which is three times too many.' },
        { say: 'And to count how many spaces fit, divide. Do not multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A roll of ribbon is $50$ yards long. How many pieces $18$ inches long can be cut from it?',
          choices: ['$100$', '$33$', '$900$', '$150$'],
          answer: 0,
          working: '$50$ yd $= 50 \\times 36 = 1{,}800$ in, and $1{,}800 \\div 18 = 100$.',
        },
      ],
      lines: [
        { say: 'Your turn. A roll of ribbon is 50 yards long. How many pieces 18 inches long can be cut from it? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A yard is 36 inches, so 50 yards is 1,800 inches. 1,800 divided by 18 is 100 pieces. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ mile $= 5{,}280$ ft $= 1{,}760$ yd', 'Put both lengths in the **same unit**', 'How many spaces fit: **divide**', 'Check by multiplying back'] }],
      lines: [
        { say: 'Here is what to remember. One mile is 5,280 feet, or 1,760 yards.', show: 'sum.0' },
        { say: 'Put both lengths in the same unit before you divide.', show: 'sum.1' },
        { say: 'To find how many spaces fit, divide.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on the imperial system, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
