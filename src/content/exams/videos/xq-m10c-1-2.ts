import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 1.2 (measuring with rulers and calipers). Gradileo wrote this
// one, in the style of a Grade 10 measurement test: reading a vernier caliper whose zero is just
// past 2.3 cm, with its 6th line matching a main-scale line, gives 2.3 + 0.06 = 2.36 cm.

/**
 * A vernier caliper's scales, in millimetres: the main scale from 2 cm to 3.6 cm, and the sliding
 * scale below it, its zero at 23.6 mm and its ten lines 0.9 mm apart. Its 6th line meets the main
 * scale at 29 mm.
 */
const caliper = (height = 300): DiagramEl => {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  points.m0 = [19.5, 0];
  points.m1 = [36.5, 0];
  items.push({ kind: 'line', id: 'main-edge', from: 'm0', to: 'm1', tone: 'muted', group: 'main' });
  for (let mm = 20; mm <= 36; mm++) {
    const long = mm % 10 === 0 ? 3 : mm % 5 === 0 ? 2 : 1.4;
    points[`a${mm}`] = [mm, 0];
    points[`b${mm}`] = [mm, long];
    items.push({ kind: 'line', id: `m${mm}`, from: `a${mm}`, to: `b${mm}`, tone: mm === 29 ? 'good' : 'ink', weight: mm === 29 ? 4 : 2, group: mm === 29 ? 'match' : 'main' });
  }
  points.l2 = [20, 3];
  points.l3 = [30, 3];
  items.push({ kind: 'label', id: 'two', at: 'l2', tex: '2\\text{ cm}', place: 'above', group: 'main' });
  items.push({ kind: 'label', id: 'three', at: 'l3', tex: '3\\text{ cm}', place: 'above', group: 'main' });
  points.v0 = [23.2, 0];
  points.v1 = [33.2, 0];
  items.push({ kind: 'line', id: 'vernier-edge', from: 'v0', to: 'v1', tone: 'muted', group: 'vernier' });
  for (let k = 0; k <= 10; k++) {
    const x = 23.6 + 0.9 * k;
    const long = k % 5 === 0 ? 2.4 : 1.4;
    points[`c${k}`] = [x, 0];
    points[`d${k}`] = [x, -long];
    const tone = k === 0 ? 'adj' : k === 6 ? 'good' : 'ink';
    items.push({ kind: 'line', id: `v${k}`, from: `c${k}`, to: `d${k}`, tone, weight: k === 0 || k === 6 ? 4 : 2, group: k === 6 ? 'match' : k === 0 ? 'zero' : 'vernier' });
    if (k % 5 === 0) items.push({ kind: 'label', id: `vl${k}`, at: `d${k}`, tex: String(k), place: 'below', tone, group: k === 0 ? 'zero' : 'vernier' });
  }
  return { kind: 'diagram', id: 'cal', height, points, items };
};

const QUESTION =
  'A student measures the diameter of a coin with a vernier caliper. The zero line on the sliding (vernier) scale is just past the 2.3 cm mark on the main scale, and the 6th line of the vernier scale lines up exactly with a line on the main scale. What is the diameter of the coin?';
const CHOICES = ['2.30 cm', '2.36 cm', '2.06 cm', '2.90 cm'];

const video: Explainer = {
  id: 'xq-m10c-1-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 measurement test',
    licence: 'Written by Gradileo',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: How to Read a Vernier Caliper',
  thumbnailTitle: 'Read a Vernier Caliper',
  thumbnail: 'cal',
  summary:
    'An exam-style question, solved one small step at a time: a vernier caliper\'s zero is just past 2.3 cm, and its 6th line lines up with the main scale. We read the main scale at the zero, read the hundredths from the line that lines up, and add them to get 2.36 cm. Then we look at the traps in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Read a Vernier Caliper', subtitle: 'Measuring to a hundredth of a centimetre, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about reading a vernier caliper. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 measurement test. It says so at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, choices: CHOICES, answer: 1, working: '$2.3 + 6 \\times 0.01 = 2.36$ cm' }],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A student measures the diameter of a coin with a vernier caliper. The zero line on the sliding scale is just past the 2.3 centimetre mark on the main scale, and the 6th line of the vernier scale lines up exactly with a line on the main scale. What is the diameter of the coin?' },
        { say: 'The choices are 2.30, 2.36, 2.06 and 2.90 centimetres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [caliper(), { kind: 'text', id: 't', size: 'md', md: 'The **main scale** on top, in millimetres; the sliding **vernier scale** below.' }],
      lines: [
        { say: 'Let us picture it. On top is the main scale, marked in millimetres, from 2 centimetres to past 3.', show: ['cal', 'cal.main'] },
        { say: 'Below it is the sliding vernier scale. Its zero line, in blue, sits just past 2.3 centimetres.', show: ['cal.vernier', 'cal.zero', 't'] },
        { say: 'And its 6th line, in green, lines up exactly with a line on the main scale.', show: 'cal.match' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'how', items: ['The **zero** of the vernier gives the reading to a **tenth** of a centimetre', 'The vernier line that **lines up** gives the **hundredths**', 'Reading $=$ main scale $+$ line number $\\times 0.01$ cm'] },
      ],
      lines: [
        { say: 'Here is how a vernier caliper works. The zero of the sliding scale tells you the reading to the nearest tenth of a centimetre, one millimetre.', show: 'how.0' },
        { say: 'The vernier lines are spaced a little closer than the millimetre lines, so only one of them lines up with the main scale. Its number gives the hundredths.', show: 'how.1' },
        { say: 'So the reading is the main scale reading, plus the number of the line that lines up, times 0.01 centimetres.', show: 'how.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the main scale at the vernier **zero**', 'Find the vernier line that **lines up**', '**Add** them'] }],
      lines: [
        { say: 'Here is the plan. First, read the main scale at the vernier zero.', show: 'plan.0' },
        { say: 'Second, find the vernier line that lines up.', show: 'plan.1' },
        { say: 'Third, add the two together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The main scale',
      layout: 'center',
      main: [caliper(260), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{zero just past } 2.3\\text{ cm} \\to \\adj{2.3\\text{ cm}}'] }],
      lines: [{ say: 'Step one. The vernier zero is just past the 2.3 centimetre mark, but not yet at 2.4. So the main scale reads 2.3 centimetres.', show: ['cal', 'cal.main', 'cal.vernier', 'cal.zero', 'm.0'], focus: 'cal.zero' }],
    },
    {
      chapter: 'Step 2: The line that lines up',
      layout: 'center',
      main: [caliper(260), { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 0.01 = \\adj{0.06\\text{ cm}}'] }],
      lines: [{ say: 'Step two. The 6th vernier line lines up with the main scale, so it adds 6 hundredths of a centimetre: 0.06 centimetres.', show: ['cal', 'cal.main', 'cal.vernier', 'cal.zero', 'cal.match', 'm.0'], focus: 'cal.match' }],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2.3 + 0.06 = \\good{2.36\\text{ cm}}'] }],
      lines: [{ say: 'Step three. Add them: 2.3 plus 0.06 is 2.36 centimetres. The coin is 2.36 centimetres across. That is choice B.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2.3 < 2.36 < 2.4 \\ \\checkmark', '23.6 + 6 \\times 0.9 = 29.0\\text{ mm} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The zero is between 2.3 and 2.4, and 2.36 is between them too.', show: 'm.0' },
        { say: 'And the vernier lines are 0.9 millimetres apart. Starting at 23.6 millimetres, 6 of them reach 23.6 plus 5.4, which is 29.0 millimetres, exactly on a main scale line. It matches.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$2.30$ cm', 'Ignored the vernier scale'],
            ['$2.90$ cm', 'Read the main scale where the lines **meet**, not at the zero'],
            ['$2.06$ cm', 'Added the $6$ in the wrong place: dropped the tenths'],
            ['$2.36$ cm', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '2.30 ignores the vernier scale, so it loses the hundredths.' },
        { say: '2.90 reads the main scale where the lines meet. But the reading is always taken at the vernier zero.' },
        { say: 'And 2.06 puts the 6 in the wrong place, losing the 3 tenths.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a vernier caliper, the vernier zero is just past 4.1 cm on the main scale, and the 3rd vernier line lines up with the main scale. What is the reading?',
          choices: ['4.10 cm', '4.40 cm', '4.03 cm', '4.13 cm'],
          answer: 3,
          working: '$4.1 + 3 \\times 0.01 = 4.13$ cm',
        },
      ],
      lines: [
        { say: 'Your turn. On a vernier caliper, the vernier zero is just past 4.1 centimetres on the main scale, and the 3rd vernier line lines up with the main scale. What is the reading? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '4.1 plus 3 hundredths is 4.13 centimetres. That is choice D. 4.10 ignored the vernier, and 4.40 added 3 tenths instead of 3 hundredths.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the main scale at the vernier **zero**', 'The line that **lines up** gives the hundredths', 'Reading $=$ main $+$ line $\\times 0.01$ cm', 'A caliper measures to $0.01$ cm'] }],
      lines: [
        { say: 'Here is what to remember. Read the main scale at the vernier zero.', show: 'sum.0' },
        { say: 'The vernier line that lines up gives the hundredths.', show: 'sum.1' },
        { say: 'Add them: main scale, plus the line number times 0.01 centimetres.', show: 'sum.2' },
        { say: 'That is how a caliper measures to a hundredth of a centimetre. For more on rulers and calipers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
