import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 2.1 (angles in standard position): the angle between 0° and
// 360° coterminal with 870°. The question is an exercise from OpenStax Algebra and Trigonometry 2e,
// word for word (section 7.1, Angles, CC BY-NC-SA 4.0), whose answer key gives α = 150°:
// 870 − 2(360) = 150. Its reference angle is 30°.

/** Axes with a terminal arm at 150°; `ref` adds the 30° reference angle. */
const angle = (height = 420, ref = true): DiagramEl => {
  const c = Math.cos((150 * Math.PI) / 180);
  const s = Math.sin((150 * Math.PI) / 180);
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'init', from: 'O', to: 'I', tone: 'adj', weight: 5, group: 'start' },
    { kind: 'label', id: 'il', at: 'I', tex: '\\text{initial side}', place: 'below', tone: 'adj', group: 'start' },
    { kind: 'line', id: 'arm', from: 'O', to: 'T', tone: 'good', weight: 5, group: 'term' },
    { kind: 'label', id: 'tl', at: 'T', tex: '\\text{terminal arm}', place: 'above', tone: 'good', group: 'term' },
    { kind: 'angle', id: 'a150', at: 'O', from: 'I', to: 'T', tone: 'theta', label: '150^\\circ', r: 40, labelDist: 70, group: 'term' },
  ];
  if (ref) items.push({ kind: 'angle', id: 'a30', at: 'O', from: 'T', to: 'N', tone: 'opp', label: '30^\\circ', r: 95, labelDist: 125, group: 'ref' });
  return {
    kind: 'diagram',
    id: 'a',
    height,
    points: {
      O: [0, 0], X0: [-6, 0], X1: [6, 0], Y0: [0, -2], Y1: [0, 4.2], I: [4.5, 0], N: [-4.5, 0],
      T: [5 * c, 5 * s],
    },
    items,
  };
};

const QUESTION = 'Find an angle α that is coterminal with an angle measuring 870°, where 0° ≤ α < 360°.';

const video: Explainer = {
  id: 'xq-m201-2-1',
  lessonId: '',
  exam: {
    lesson: 'm201-2-1',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.1, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-1-angles',
    question: QUESTION,
  },
  title: 'Exam Question: The Angle Coterminal With 870° (Angles in Standard Position)',
  thumbnailTitle: 'Coterminal With 870°',
  thumbnail: 'a',
  summary:
    'A real test question, solved one small step at a time: find the angle between 0° and 360° that is coterminal with 870°. We take away full turns of 360° until the angle is less than 360°, and get 150°. Then we draw it in standard position, find its reference angle and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Coterminal With 870°', subtitle: 'Angles in standard position, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about angles in standard position. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find an angle $\\alpha$ that is coterminal with an angle measuring $870^\\circ$, where $0^\\circ \\le \\alpha < 360^\\circ$.',
          answer: '$\\alpha = 150^\\circ$',
          working: '$870^\\circ - 2(360^\\circ) = 150^\\circ$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find an angle alpha that is coterminal with an angle measuring 870 degrees, where alpha is at least 0 degrees and less than 360 degrees.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$870^\\circ$ is **more than one full turn**. We want the angle between $0^\\circ$ and $360^\\circ$ that **ends in the same place**.' }],
      lines: [{ say: '870 degrees is more than a full turn. We want the angle between 0 and 360 degrees whose terminal arm ends up in exactly the same place.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'std', tone: 'definition', title: 'Standard position', md: 'The vertex is at the origin and the **initial side** lies along the positive $x$-axis. The angle turns **counterclockwise** to the **terminal arm**.' },
        { kind: 'callout', id: 'cot', tone: 'definition', title: 'Coterminal angles', md: 'Angles in standard position with the **same terminal arm**. They differ by full turns of $360^\\circ$.' },
      ],
      lines: [
        { say: 'Here is what we need. An angle is in standard position when its vertex is at the origin and its initial side lies along the positive x axis. A positive angle turns counterclockwise to the terminal arm.', show: 'std' },
        { say: 'Coterminal angles share the same terminal arm. Adding or taking away a full turn of 360 degrees lands you in the same place, so coterminal angles differ by multiples of 360 degrees.', show: 'cot' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Take away **full turns** of $360^\\circ$', 'Stop when the angle is from $0^\\circ$ to just under $360^\\circ$', 'Draw it in **standard position**'] }],
      lines: [
        { say: 'Here is the plan. First, take away full turns of 360 degrees.', show: 'plan.0' },
        { say: 'Second, stop as soon as the angle is between 0 and 360 degrees.', show: 'plan.1' },
        { say: 'Third, draw it in standard position to check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Take away full turns',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['870^\\circ - 360^\\circ = 510^\\circ', '510^\\circ - 360^\\circ = 150^\\circ', '\\alpha = \\good{150^\\circ}'] }],
      lines: [
        { say: 'Step one. Take away one full turn: 870 minus 360 is 510 degrees. That is still more than 360, so it is not the answer yet.', show: 'm.0' },
        { say: 'Take away another full turn: 510 minus 360 is 150 degrees.', show: 'm.1' },
        { say: 'Step two. 150 degrees is between 0 and 360, so we stop. Alpha is 150 degrees. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Draw it',
      layout: 'split',
      left: [angle(420, false)],
      right: [{ kind: 'text', id: 't', size: 'md', md: '$870^\\circ$ is **two full turns** and then $150^\\circ$ more, so it ends on the same terminal arm as $150^\\circ$, in **quadrant II**.' }],
      lines: [
        { say: 'Step three. Start on the initial side, along the positive x axis.', show: ['a', 'a.axes', 'a.start'] },
        { say: 'Turn counterclockwise 150 degrees. The terminal arm lands in quadrant two.', show: 'a.term', focus: 'a.term' },
        { say: 'An angle of 870 degrees turns two full times and then 150 degrees more, so it ends on exactly the same arm.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [angle()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['150^\\circ + 2(360^\\circ) = 870^\\circ \\ \\checkmark', '0^\\circ \\le 150^\\circ < 360^\\circ \\ \\checkmark', '\\text{reference: } 180^\\circ - 150^\\circ = 30^\\circ'] }],
      lines: [
        { say: 'Let us check. 150 plus two full turns of 360 is 150 plus 720, which is 870. So the angles are coterminal.', show: ['a', 'a.axes', 'a.start', 'a.term', 'm.0'] },
        { say: 'And 150 degrees is between 0 and 360, as the question asks.', show: 'm.1' },
        { say: 'While we are here, the reference angle is the acute angle between the terminal arm and the x axis: 180 minus 150, which is 30 degrees. It will be useful in the next lesson.', show: ['a.ref', 'm.2'], focus: 'a.ref' },
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
            ['$510^\\circ$', 'still more than $360^\\circ$: take away **another** turn'],
            ['$870^\\circ \\div 360^\\circ \\approx 2.4$', 'the decimal is not the angle; take away **whole** turns'],
            ['$30^\\circ$', 'that is the **reference** angle, not the coterminal angle'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Stopping at 510 degrees is too soon. It is still more than a full turn.' },
        { say: 'Dividing 870 by 360 gives about 2.4 turns, but 2.4 is not an angle. Take away the 2 whole turns and keep what is left.' },
        { say: 'And 30 degrees is the reference angle, not the coterminal angle. They answer different questions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the angle $\\beta$, with $0^\\circ \\le \\beta < 360^\\circ$, that is coterminal with $-300^\\circ$.',
          choices: ['$300^\\circ$', '$60^\\circ$', '$120^\\circ$', '$240^\\circ$'],
          answer: 1,
          working: '$-300^\\circ + 360^\\circ = 60^\\circ$',
        },
      ],
      lines: [
        { say: 'Your turn. Find the angle beta, between 0 and 360 degrees, that is coterminal with minus 300 degrees. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Minus 300 degrees turns clockwise. Add a full turn: minus 300 plus 360 is 60 degrees, choice B. A just drops the minus sign, which is a different angle.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Standard position: start on the positive $x$-axis', 'Coterminal angles differ by **full turns**', 'Add or take away $360^\\circ$ until $0^\\circ \\le \\alpha < 360^\\circ$', 'Reference angle: to the **$x$-axis**'] }],
      lines: [
        { say: 'Here is what to remember. In standard position, the angle starts on the positive x axis.', show: 'sum.0' },
        { say: 'Coterminal angles differ by full turns.', show: 'sum.1' },
        { say: 'Add or take away 360 degrees until the angle is between 0 and 360.', show: 'sum.2' },
        { say: 'And the reference angle is measured to the x axis. For more on angles in standard position, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
