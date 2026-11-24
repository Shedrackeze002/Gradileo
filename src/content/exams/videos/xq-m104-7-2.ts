import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 7.2 (area). The question is a Your Turn from OpenStax
// Contemporary Mathematics, word for word (section 9.2, Measuring Area, CC BY-NC-SA 4.0). The garden
// is 5 × 8 = 40 m² and the path is 8 × 0.75 = 6 m², so 40 − 6 = 34 m² needs topsoil, as in the
// book's answer. Check: the two strips of soil are 8 × 4.25 = 34 m² together.

/** The 8 m by 5 m garden with the 8 m by 0.75 m path across its middle, drawn to scale. */
const garden = (height = 360): DiagramEl => ({
  kind: 'diagram',
  id: 'gd',
  height,
  points: { A: [0, 0], B: [8, 0], C: [8, 5], D: [0, 5], P: [0, 2.125], Q: [8, 2.125], R: [8, 2.875], S: [0, 2.875], pw: [8, 2.5] },
  items: [
    { kind: 'region', id: 'soil', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.25, group: 'bed' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'ink', weight: 3, label: '8 \\text{ m}', labelSide: 'right', group: 'bed' },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'ink', weight: 3, group: 'bed' },
    { kind: 'line', id: 'cd', from: 'C', to: 'D', tone: 'ink', weight: 3, group: 'bed' },
    { kind: 'line', id: 'da', from: 'D', to: 'A', tone: 'ink', weight: 3, label: '5 \\text{ m}', labelSide: 'right', group: 'bed' },
    { kind: 'region', id: 'path', points: ['P', 'Q', 'R', 'S'], tone: 'opp', shade: 0.7, group: 'walk' },
    { kind: 'line', id: 'pq', from: 'P', to: 'Q', tone: 'opp', weight: 2, group: 'walk' },
    { kind: 'line', id: 'rs', from: 'R', to: 'S', tone: 'opp', weight: 2, group: 'walk' },
    { kind: 'label', id: 'pl', at: 'pw', tex: '0.75 \\text{ m}', tone: 'opp', place: 'right', group: 'walk' },
  ],
});

const QUESTION =
  'You want to cover a garden with topsoil. The garden is 5 meters by 8 meters. There is a path in the middle of the garden that is 8 meters long and 0.75 meters wide. What is the area of the garden you need to cover with topsoil?';

const video: Explainer = {
  id: 'xq-m104-7-2',
  lessonId: '',
  exam: {
    lesson: 'm104-7-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.2, Measuring Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-2-measuring-area',
    question: QUESTION,
  },
  title: 'Exam Question: Topsoil Around a Garden Path (Area)',
  thumbnailTitle: 'Topsoil Around a Garden Path',
  thumbnail: 'gd',
  summary:
    'A real test question, solved one small step at a time: a garden is 5 m by 8 m, with a path 8 m long and 0.75 m wide across its middle. What area needs topsoil? We find the whole garden, 5 × 8 = 40 m², take away the path, 8 × 0.75 = 6 m², and get 34 m². Then we check with the two strips of soil and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Topsoil Around a Garden Path', subtitle: 'Area, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about area. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'You want to cover a garden with topsoil. The garden is $5$ meters by $8$ meters. There is a path in the middle of the garden that is $8$ meters long and $0.75$ meters wide. What is the area of the garden you need to cover with topsoil?',
          answer: '$34$ m²',
          working: '$40 - 6 = 34$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You want to cover a garden with topsoil. The garden is 5 metres by 8 metres. There is a path in the middle of the garden that is 8 metres long and 0.75 metres wide. What is the area of the garden you need to cover with topsoil?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [garden(), { kind: 'text', id: 't', size: 'md', md: 'Topsoil goes on the **green** part only, **not** on the path.' }],
      lines: [
        { say: 'Here is the garden, 8 metres by 5 metres.', show: 'gd.bed' },
        { say: 'And here is the path, running all the way across the middle. It is 0.75 metres wide.', show: 'gd.walk' },
        { say: 'Topsoil goes on the green part only. Nobody puts soil on the path.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = \\text{length} \\times \\text{width}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Whole minus the hole', md: 'To find the area of a shape with a piece taken out, find the area of the **whole**, then **subtract** the piece.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is its length times its width, in square units.', show: 'f' },
        { say: 'To find the area of a shape with a piece taken out, find the area of the whole thing, then subtract the piece.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Area of the **whole garden**', 'Area of the **path**', '**Subtract**'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the whole garden.', show: 'plan.0' },
        { say: 'Find the area of the path.', show: 'plan.1' },
        { say: 'Then subtract.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The whole garden',
      layout: 'center',
      main: [garden(320), { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 8 = 40 \\text{ m}^2'] }],
      lines: [
        { say: 'Step one. The whole garden is 5 metres by 8 metres. 5 times 8 is 40 square metres.', show: ['gd.bed', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The path',
      layout: 'center',
      main: [garden(320), { kind: 'math', id: 'm', size: 'md', lines: ['8 \\times 0.75 = 6 \\text{ m}^2'] }],
      lines: [
        { say: 'Step two. The path is 8 metres long and 0.75 metres wide. 8 times 0.75 is 6 square metres.', show: ['gd.bed', 'gd.walk', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 - 6 = \\good{34 \\text{ m}^2}'] }],
      lines: [
        { say: 'Step three. Take the path away from the whole garden. 40 minus 6 is 34. You need topsoil for 34 square metres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 - 0.75 = 4.25 \\text{ m of soil, top and bottom}', '8 \\times 4.25 = 34 \\text{ m}^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Slide the two strips of soil together. Their widths add up to 5 minus 0.75, which is 4.25 metres.', show: 'm.0' },
        { say: 'Together they make one rectangle, 8 by 4.25, which is 34 square metres. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$40$ m²', 'forgot to take away the **path**'],
            ['$46$ m²', '**added** the path: it is taken **out**'],
            ['$26$ m', 'that is the **perimeter**: area **multiplies**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '40 square metres is the whole garden, path and all. The path does not need soil.' },
        { say: '46 adds the path on. The path is part of the garden, so it is taken out, not added.' },
        { say: 'And 26 metres is the distance around the garden, its perimeter. Area multiplies length by width.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A lawn is $12$ m by $6$ m. A flower bed $3$ m by $2$ m sits inside the lawn. What area of grass is there?',
          choices: ['$66$ m²', '$78$ m²', '$72$ m²', '$36$ m²'],
          answer: 0,
          working: '$12 \\times 6 = 72$, $3 \\times 2 = 6$, and $72 - 6 = 66$ m².',
        },
      ],
      lines: [
        { say: 'Your turn. A lawn is 12 metres by 6 metres. A flower bed 3 metres by 2 metres sits inside the lawn. What area of grass is there? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The whole lawn is 12 times 6, which is 72 square metres. The flower bed is 3 times 2, which is 6. 72 minus 6 is 66 square metres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area $=$ length $\\times$ width', 'Area of the **whole**', '**Subtract** the piece taken out', 'Area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. The area of a rectangle is length times width.', show: 'sum.0' },
        { say: 'For a shape with a piece taken out, find the area of the whole,', show: 'sum.1' },
        { say: 'then subtract the piece.', show: 'sum.2' },
        { say: 'And area is always in square units. For more on area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
