import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 7.1 (perimeter and circumference). The question is an Exercise
// from OpenStax Prealgebra 2e, word for word (section 9.5, Solve Geometry Applications: Circles and
// Irregular Figures, CC BY-NC-SA 4.0). With 3.14 for π, as the book uses: C = πd = 3.14 × 12 =
// 37.68 inches, as in the book's answer. Check: C = 2πr = 2 × 3.14 × 6 = 37.68, and a circle is a
// little more than 3 diameters around (3 × 12 = 36).

const QUESTION = 'A circular saw has a diameter of 12 inches. What is the circumference of the saw?';

/** The saw blade: a circle of diameter 12, with its diameter drawn. */
const blade = (): DiagramEl => {
  const points: Record<string, [number, number]> = { O: [0, 0], L: [-6, 0], R: [6, 0] };
  const ring: string[] = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * 2 * Math.PI;
    points[`c${i}`] = [6 * Math.cos(a), 6 * Math.sin(a)];
    ring.push(`c${i}`);
  }
  return {
    kind: 'diagram',
    id: 'pic',
    height: 360,
    points,
    items: [
      { kind: 'region', id: 'disc', points: ring, tone: 'muted', shade: 0.12 },
      { kind: 'curve', id: 'edge', points: ring, closed: true, tone: 'adj', weight: 6 },
      { kind: 'line', id: 'd', from: 'L', to: 'R', tone: 'opp', label: 'd = 12 \\text{ in}', labelSide: 'left' },
      { kind: 'label', id: 'o', at: 'O', tex: '', dot: true },
    ],
  };
};

const video: Explainer = {
  id: 'xq-m204-7-1',
  lessonId: '',
  exam: {
    lesson: 'm204-7-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.5, Solve Geometry Applications: Circles and Irregular Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures',
    question: QUESTION,
  },
  title: 'Exam Question: The Distance Around a Saw Blade (Perimeter and Circumference)',
  thumbnailTitle: 'How Far Around Is the Blade?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: a circular saw has a diameter of 12 inches. What is its circumference? With C = πd and 3.14 for π, C = 3.14 × 12 = 37.68 inches. Then we check with C = 2πr and with a quick estimate, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Around Is the Blade?', subtitle: 'Circumference, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the distance around a circle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A circular saw has a diameter of $12$ inches. What is the circumference of the saw?',
          answer: '$37.68$ inches',
          working: 'C = πd = 3.14 × 12 = 37.68',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A circular saw has a diameter of 12 inches. What is the circumference of the saw?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [blade()],
      right: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Diameter', md: 'The **diameter** is the distance **across** a circle, through the centre. Here $d = 12$ inches.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Circumference', md: 'The **circumference** is the distance **around** a circle: its perimeter.' },
      ],
      lines: [
        { say: 'The diameter is the distance across a circle, through its centre. For this blade, it is 12 inches.', show: ['pic', 'pic.disc', 'pic.d', 'pic.o', 'a'], focus: 'pic.d' },
        { say: 'The circumference is the distance all the way around the circle. It is the circle’s perimeter, the length of the blade’s cutting edge.', show: ['pic.edge', 'b'], focus: 'pic.edge' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['C = \\pi d \\qquad \\text{or} \\qquad C = 2\\pi r'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Pi', md: '$\\pi$ is about $3.14$, and the book uses $3.14$. The **radius** $r$ is **half** the diameter.' },
      ],
      lines: [
        { say: 'Here is what we need. The circumference is pi times the diameter. Or, the same thing, 2 times pi times the radius.', show: 'm' },
        { say: 'Pi is about 3.14, and the book uses 3.14. The radius is half the diameter, from the centre to the edge.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use $C = \\pi d$, since we know $d$', '**Substitute** $3.14$ and $12$, and **multiply**'] }],
      lines: [
        { say: 'Here is the plan. We know the diameter, so use C equals pi d.', show: 'plan.0' },
        { say: 'Substitute 3.14 and 12, and multiply.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The circumference',
      layout: 'split',
      leftWidth: 560,
      left: [blade()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['C = \\pi d', 'C \\approx 3.14 \\times 12', 'C \\approx \\good{37.68 \\text{ in}}'] }],
      lines: [
        { say: 'Step one. Start with C equals pi d.', show: ['pic', 'pic.disc', 'pic.d', 'pic.o', 'm.0'] },
        { say: 'Step two. Pi is about 3.14, and d is 12.', show: 'm.1', focus: 'pic.d' },
        { say: '3.14 times 12 is 37.68. The cutting edge of the saw is about 37.68 inches around.', show: ['pic.edge', 'm.2'], focus: ['pic.edge', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = 12 \\div 2 = 6 \\text{ in}', '2 \\times 3.14 \\times 6 = 37.68 \\ \\checkmark', '3 \\times 12 = 36 \\text{, a little less} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the other formula. The radius is half of 12, which is 6 inches.', show: 'm.0' },
        { say: '2 times 3.14 times 6 is also 37.68.', show: 'm.1' },
        { say: 'And a quick estimate: the distance around a circle is a little more than 3 diameters. 3 times 12 is 36, and 37.68 is a little more. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$75.36$ in', 'used $12$ as the **radius**: it is the **diameter**'],
            ['$18.84$ in', 'used $\\pi r$: that is only **half** way around'],
            ['$113.04$ in', 'found the **area**, $\\pi r^2$, not the distance around'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '75.36 uses 2 pi r with 12 as the radius. But 12 inches is the diameter, all the way across.' },
        { say: '18.84 is pi times the radius. That is only half the way around.' },
        { say: 'And 113.04 is the area, pi r squared. The area is the space inside, in square inches. The question asks for the distance around.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A round table has a diameter of $1.5$ m. Using $3.14$ for $\\pi$, how much trim is needed to go once around its edge?',
          choices: ['$9.42$ m', '$1.77$ m', '$2.36$ m', '$4.71$ m'],
          answer: 3,
          working: 'C = πd = 3.14 × 1.5 = 4.71.',
        },
      ],
      lines: [
        { say: 'Your turn. A round table has a diameter of 1.5 metres. Using 3.14 for pi, how much trim is needed to go once around its edge? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'C equals pi d: 3.14 times 1.5 is 4.71 metres. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circumference: the distance **around**', '$C = \\pi d = 2\\pi r$', 'Radius $=$ **half** the diameter', 'Estimate: a bit more than $3d$'] }],
      lines: [
        { say: 'Here is what to remember. The circumference is the distance around a circle.', show: 'sum.0' },
        { say: 'It is pi times the diameter, or 2 pi times the radius.', show: 'sum.1' },
        { say: 'The radius is half the diameter.', show: 'sum.2' },
        { say: 'And the answer should be a bit more than 3 diameters. For more on perimeter and circumference, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
