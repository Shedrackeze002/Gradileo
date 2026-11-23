import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 4.2 (calculating with fractional measurements). The question
// is an exercise from OpenStax Prealgebra 2e, word for word (section 4.6, Add and Subtract Mixed
// Numbers, Everyday Math, CC BY-NC-SA 4.0). The framed picture is 2 5/8 + 8 + 2 5/8 = 12 10/8 =
// 13 1/4 inches wide, as in the book's answer. Check: 2.625 + 8 + 2.625 = 13.25.

/** The picture inside its frame, with the widths across the bottom. */
function frame(): Part {
  const points: Record<string, [number, number]> = {
    O1: [0, 0], O2: [13.25, 0], O3: [13.25, 11.25], O4: [0, 11.25],
    I1: [2.625, 2.625], I2: [10.625, 2.625], I3: [10.625, 8.625], I4: [2.625, 8.625],
    P0: [2.625, 5.6], P1: [10.625, 5.6],
    L0: [0, -0.8], L1: [2.625, -0.8], R0: [10.625, -0.8], R1: [13.25, -0.8],
    T0: [0, -3.2], T1: [13.25, -3.2],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'wood', points: ['O1', 'O2', 'O3', 'O4'], tone: 'opp', shade: 0.3, group: 'frame' },
    { kind: 'curve', id: 'edge', points: ['O1', 'O2', 'O3', 'O4'], closed: true, tone: 'opp', group: 'frame' },
    { kind: 'region', id: 'photo', points: ['I1', 'I2', 'I3', 'I4'], tone: 'adj', shade: 0.35, group: 'pic' },
    { kind: 'curve', id: 'photo-edge', points: ['I1', 'I2', 'I3', 'I4'], closed: true, tone: 'adj', group: 'pic' },
    { kind: 'line', id: 'pw', from: 'P0', to: 'P1', tone: 'adj', label: '8 \\text{ in}', labelSide: 'left', group: 'pic' },
    { kind: 'line', id: 'lw', from: 'L0', to: 'L1', tone: 'opp', label: '2\\tfrac{5}{8}', labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 'rw', from: 'R0', to: 'R1', tone: 'opp', label: '2\\tfrac{5}{8}', labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 'all', from: 'T0', to: 'T1', tone: 'theta', arrow: true, label: '\\text{framed width?}', labelSide: 'right' },
  ];
  return { points, items };
}

const pic = (height = 420) => figure('fr', [frame()], height);

const QUESTION =
  'Framing a picture Tessa bought a picture frame for her son’s graduation picture. The picture is 8 inches wide. The picture frame is 2 5/8 inches wide on each side. How wide will the framed picture be?';

const video: Explainer = {
  id: 'xq-m103-4-2',
  lessonId: '',
  exam: {
    lesson: 'm103-4-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.6, Add and Subtract Mixed Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-6-add-and-subtract-mixed-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: How Wide Is the Framed Picture? (Fractional Measurements)',
  thumbnailTitle: 'How Wide Is the Framed Picture?',
  thumbnail: 'fr',
  summary:
    'A real test question, solved one small step at a time: a picture is 8 inches wide, and its frame is 2 5/8 inches wide on each side. How wide is the framed picture? The frame is on both sides, so we add 2 5/8 + 8 + 2 5/8. The wholes make 12 and the fractions make 10/8 = 1 1/4, so the framed picture is 13 1/4 inches wide. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Wide Is the Framed Picture?', subtitle: 'Fractional measurements, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding measurements with fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Framing a picture Tessa bought a picture frame for her son’s graduation picture. The picture is $8$ inches wide. The picture frame is $2\\tfrac{5}{8}$ inches wide on each side. How wide will the framed picture be?',
          answer: '$13\\tfrac{1}{4}$ inches',
          working: '$2\\tfrac{5}{8} + 8 + 2\\tfrac{5}{8} = 12\\tfrac{10}{8} = 13\\tfrac{1}{4}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Tessa bought a frame for her son\'s graduation picture. The picture is 8 inches wide. The frame is 2 and five eighths inches wide on each side. How wide will the framed picture be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [pic()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Going across, we pass the frame, the picture, and the frame **again**. The frame is on **both** sides.' }],
      lines: [
        { say: 'Here is the picture, 8 inches wide.', show: 'fr.pic' },
        { say: 'Here is the frame around it.', show: 'fr.frame' },
        { say: 'The frame is 2 and five eighths inches wide on the left, and 2 and five eighths inches on the right.', show: 'fr.sides' },
        { say: 'We want the whole width. Going across, we pass the frame, then the picture, then the frame again. So the frame counts twice.', show: ['fr.all', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{width} = \\text{frame} + \\text{picture} + \\text{frame}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Adding mixed numbers', md: 'Add the **whole numbers**, add the **fractions**, then change an improper fraction into a mixed number.' },
      ],
      lines: [
        { say: 'Here is what we need. The width is the frame, plus the picture, plus the frame.', show: 'f' },
        { say: 'To add mixed numbers, add the whole numbers, add the fractions, and then change any improper fraction into a mixed number.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **sum** across', 'Add the **wholes** and the **fractions**', '**Simplify** the fraction'] }],
      lines: [
        { say: 'Here is the plan. Write the sum going across.', show: 'plan.0' },
        { say: 'Add the whole numbers and the fractions.', show: 'plan.1' },
        { say: 'Then simplify the fraction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The sum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac{5}{8} + 8 + 2\\tfrac{5}{8}'] }],
      lines: [
        { say: 'Step one. Going across: 2 and five eighths, plus 8, plus 2 and five eighths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Wholes and fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{wholes: } 2 + 8 + 2 = 12', '\\text{fractions: } \\tfrac{5}{8} + \\tfrac{5}{8} = \\tfrac{10}{8}', '12 + \\tfrac{10}{8} = 12\\tfrac{10}{8}'] }],
      lines: [
        { say: 'Step two. The whole numbers: 2 plus 8 plus 2 is 12.', show: 'm.0' },
        { say: 'The fractions: five eighths plus five eighths is ten eighths. The denominators are already the same, so we just add the tops.', show: 'm.1' },
        { say: 'Together, that is 12 and ten eighths. But ten eighths is more than one whole, so we are not finished.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{10}{8} = 1\\tfrac{2}{8} = 1\\tfrac{1}{4}', '12 + 1\\tfrac{1}{4} = \\good{13\\tfrac{1}{4} \\text{ in}}'] }],
      lines: [
        { say: 'Step three. Ten eighths is one whole, which is eight eighths, and two eighths left over. Two eighths simplifies to one quarter.', show: 'm.0' },
        { say: '12 plus 1 and a quarter is 13 and a quarter. The framed picture is 13 and a quarter inches wide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac{5}{8} = 2.625', '2.625 + 8 + 2.625 = 13.25 = 13\\tfrac{1}{4} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. Five eighths is 0.625, so 2 and five eighths is 2.625.', show: 'm.0' },
        { say: '2.625 plus 8 plus 2.625 is 13.25, which is 13 and a quarter. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$8 + 2\\tfrac{5}{8} = 10\\tfrac{5}{8}$', 'the frame is on **both** sides'],
            ['$\\tfrac{5}{8} + \\tfrac{5}{8} = \\tfrac{10}{16}$', 'add the **tops** only: the denominator stays $8$'],
            ['$12\\tfrac{10}{8}$', '$\\tfrac{10}{8}$ is more than $1$: carry the whole'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The frame is on both sides, so add its width twice, not once.' },
        { say: 'When the denominators are the same, add only the tops. Five eighths plus five eighths is ten eighths, not ten sixteenths.' },
        { say: 'And 12 and ten eighths is not finished. Ten eighths is more than one, so carry the whole: 13 and a quarter.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A window is $30$ inches wide. The trim around it is $3\\tfrac{3}{4}$ inches wide on each side. How wide is the window with its trim?',
          choices: ['$33\\tfrac{3}{4}$ in', '$37\\tfrac{1}{2}$ in', '$37\\tfrac{3}{8}$ in', '$22\\tfrac{1}{2}$ in'],
          answer: 1,
          working: '$3\\tfrac{3}{4} + 30 + 3\\tfrac{3}{4} = 36\\tfrac{6}{4} = 37\\tfrac{1}{2}$ in.',
        },
      ],
      lines: [
        { say: 'Your turn. A window is 30 inches wide. The trim around it is 3 and three quarters inches wide on each side. How wide is the window with its trim? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The wholes make 3 plus 30 plus 3, which is 36. The fractions make six quarters, which is 1 and a half. So the width is 37 and a half inches. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A border on **each side** counts **twice**', 'Add the wholes, then the fractions', 'Same denominator: add only the **tops**', 'Change an improper fraction to a mixed number'] }],
      lines: [
        { say: 'Here is what to remember. A border on each side counts twice.', show: 'sum.0' },
        { say: 'Add the whole numbers, then the fractions.', show: 'sum.1' },
        { say: 'When the denominators are the same, add only the tops.', show: 'sum.2' },
        { say: 'And change an improper fraction into a mixed number. For more on calculating with fractional measurements, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
