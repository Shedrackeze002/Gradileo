import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 7.3 (similar polygons). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and the
// Pythagorean Theorem, Everyday Math, CC BY-NC-SA 4.0). The doll house is similar to the house, so
// h/2.5 = 35/30, 30h = 87.5 and h ≈ 2.92 ≈ 2.9 ft, as in the book's answer. Check: the scale factor
// is 2.5/30 = 1/12, and 35/12 ≈ 2.9.

/** A house outline: walls, and a roof to a peak `h` high. */
function house(name: string, x0: number, w: number, h: number, tone: 'adj' | 'opp'): { points: Record<string, [number, number]>; items: DiagramItem[] } {
  const p = (k: string) => `${name}${k}`;
  const points: Record<string, [number, number]> = {
    [p('a')]: [x0, 0], [p('b')]: [x0 + w, 0], [p('c')]: [x0 + w, 0.6 * h], [p('d')]: [x0 + w / 2, h], [p('e')]: [x0, 0.6 * h],
  };
  const ring = ['a', 'b', 'c', 'd', 'e'].map(p);
  const items: DiagramItem[] = [
    { kind: 'region', id: `${name}-fill`, points: ring, tone, shade: 0.25, group: name },
    { kind: 'curve', id: `${name}-edge`, points: ring, closed: true, tone, group: name },
  ];
  return { points, items };
}

function houses(): Part {
  const big = house('big', 0, 30, 35, 'adj');
  const small = house('small', 38, 2.5, 35 / 12, 'opp');
  const points: Record<string, [number, number]> = { ...big.points, ...small.points, H0: [-2.5, 0], H1: [-2.5, 35], S0: [42, 0], S1: [42, 35 / 12], W0: [0, -2], W1: [30, -2], V0: [38, -2], V1: [40.5, -2] };
  const items: DiagramItem[] = [
    ...big.items,
    { kind: 'line', id: 'bh', from: 'H0', to: 'H1', tone: 'adj', label: '35 \\text{ ft}', labelSide: 'left', group: 'big' },
    { kind: 'line', id: 'bw', from: 'W0', to: 'W1', tone: 'adj', label: '30 \\text{ ft}', labelSide: 'right', group: 'big' },
    ...small.items,
    { kind: 'line', id: 'sw', from: 'V0', to: 'V1', tone: 'opp', label: '2.5 \\text{ ft}', labelSide: 'right', group: 'small' },
    { kind: 'line', id: 'sh', from: 'S0', to: 'S1', tone: 'theta', label: 'h?', labelSide: 'right', group: 'small' },
  ];
  return { points, items };
}

const fig = (height = 400) => figure('hs', [houses()], height);

const QUESTION =
  'Building a scale model Joe wants to build a doll house for his daughter. He wants the doll house to look just like his house. His house is 30 feet wide and 35 feet tall at the highest point of the roof. If the dollhouse will be 2.5 feet wide, how tall will its highest point be?';

const video: Explainer = {
  id: 'xq-m103-7-3',
  lessonId: '',
  exam: {
    lesson: 'm103-7-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Doll House? (Similar Polygons)',
  thumbnailTitle: 'How Tall Is the Doll House?',
  thumbnail: 'hs',
  summary:
    'A real test question, solved one small step at a time: Joe’s house is 30 feet wide and 35 feet tall, and he is building a doll house just like it, 2.5 feet wide. How tall will it be? The two are similar, so their sides are in proportion: h/2.5 = 35/30. Cross-multiplying gives 30h = 87.5, so h ≈ 2.9 feet. Then we check with the scale factor, 1/12, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Doll House?', subtitle: 'Similar polygons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about similar shapes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Building a scale model Joe wants to build a doll house for his daughter. He wants the doll house to look just like his house. His house is $30$ feet wide and $35$ feet tall at the highest point of the roof. If the dollhouse will be $2.5$ feet wide, how tall will its highest point be?',
          answer: '$2.9$ feet',
          working: '$\\dfrac{h}{2.5} = \\dfrac{35}{30}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Joe wants to build a doll house that looks just like his house. His house is 30 feet wide and 35 feet tall at the highest point of the roof. The doll house will be 2.5 feet wide. How tall will its highest point be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: '"Look just like" means the shapes are **similar**: same shape, different size. Drawn here **to scale**.' }],
      lines: [
        { say: 'Here is Joe\'s house, 30 feet wide and 35 feet tall.', show: 'hs.big' },
        { say: 'And here is the doll house, 2.5 feet wide, drawn to the same scale. We want its height, h.', show: 'hs.small' },
        { say: 'Look just like means the two are similar. They have the same shape, but different sizes.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{\\text{model height}}{\\text{model width}} = \\dfrac{\\text{house height}}{\\text{house width}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Similar shapes', md: 'In similar shapes, matching sides are in **proportion**: every length is multiplied by the **same** scale factor.' },
      ],
      lines: [
        { say: 'Here is what we need. In similar shapes, matching sides are in proportion. So height over width is the same for the model as for the house.', show: 'f' },
        { say: 'Another way to say it: every length is multiplied by the same scale factor.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**', '**Cross-multiply**', '**Divide** and round'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion.', show: 'plan.0' },
        { say: 'Cross-multiply.', show: 'plan.1' },
        { say: 'Then divide, and round.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{h}{2.5} = \\dfrac{35}{30}'] }],
      lines: [
        { say: 'Step one. The doll house\'s height over its width equals the house\'s height over its width. h over 2.5 equals 35 over 30.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Cross-multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['30h = 2.5 \\times 35', '30h = 87.5'] }],
      lines: [
        { say: 'Step two. Cross-multiply: 30 times h equals 2.5 times 35.', show: 'm.0' },
        { say: '2.5 times 35 is 87.5. So 30 h equals 87.5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['h = \\dfrac{87.5}{30} \\approx 2.92', 'h \\approx \\good{2.9 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Divide both sides by 30. 87.5 divided by 30 is about 2.92.', show: 'm.0' },
        { say: 'Rounded to the nearest tenth, the doll house will be about 2.9 feet tall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{scale factor} = \\dfrac{2.5}{30} = \\dfrac{1}{12}', '35 \\times \\dfrac{1}{12} \\approx 2.9 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the scale factor. The width shrinks from 30 feet to 2.5 feet. 2.5 over 30 is one twelfth, so the doll house is one twelfth the size.', show: 'm.0' },
        { say: 'One twelfth of 35 feet is about 2.9 feet, the same answer. And just like the real house, the doll house is a little taller than it is wide. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$35 - 27.5 = 7.5$ ft', 'similar shapes **multiply** by a scale factor; they do not subtract'],
            ['$\\dfrac{h}{2.5} = \\dfrac{30}{35}$', 'keep the **same order**: height over width on both sides'],
            ['$35 \\times 12 = 420$ ft', 'the model is **smaller**: divide by $12$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The width went down by 27.5 feet, but taking 27.5 off the height gives 7.5 feet, which is wrong. Similar shapes are multiplied by a scale factor, not shrunk by a fixed amount.' },
        { say: 'Keep the same order on both sides of the proportion: height over width, and height over width.' },
        { say: 'And the model is smaller, so divide by 12. Multiplying gives a doll house 420 feet tall!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A photo is $4$ in wide and $6$ in tall. It is enlarged to be $10$ in wide, keeping the same shape. How tall is the enlargement?',
          choices: ['$12$ in', '$15$ in', '$6.7$ in', '$2.4$ in'],
          answer: 1,
          working: '$\\dfrac{h}{10} = \\dfrac{6}{4}$, so $4h = 60$ and $h = 15$ in.',
        },
      ],
      lines: [
        { say: 'Your turn. A photo is 4 inches wide and 6 inches tall. It is enlarged to be 10 inches wide, keeping the same shape. How tall is the enlargement? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'h over 10 equals 6 over 4. Cross-multiply: 4 h equals 60, so h is 15 inches. Choice B. The scale factor is 2.5, and 6 times 2.5 is 15.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Similar: **same shape**, different size', 'Matching sides are in **proportion**', 'Keep the **same order** on both sides', 'Check with the **scale factor**'] }],
      lines: [
        { say: 'Here is what to remember. Similar shapes have the same shape but a different size.', show: 'sum.0' },
        { say: 'Their matching sides are in proportion.', show: 'sum.1' },
        { say: 'Keep the same order on both sides of the proportion.', show: 'sum.2' },
        { say: 'And check with the scale factor. For more on similar polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
