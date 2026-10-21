import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, pie } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// A half and a third: parts of different sizes.
const different = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'h', parts: 2, shaded: 1, tone: 'adj', at: [0, 2.2], width: 10, label: '\\dfrac12' }),
      bar({ name: 't', parts: 3, shaded: 1, tone: 'opp', at: [0, 0], width: 10, label: '\\dfrac13' }),
    ],
    250,
  );

// 1/2 = 3/6 and 1/3 = 2/6, then together 5/6.
const sixths = (id: string) =>
  figure(id, [
    bar({ name: 'h', parts: 2, shaded: 1, tone: 'adj', at: [0, 7.2], width: 8, label: '\\dfrac12' }),
    bar({ name: 'h6', parts: 6, shaded: 3, tone: 'adj', at: [0, 5.4], width: 8, label: '\\dfrac36' }),
    bar({ name: 't', parts: 3, shaded: 1, tone: 'opp', at: [0, 3.6], width: 8, label: '\\dfrac13' }),
    bar({ name: 't6', parts: 6, shaded: 2, tone: 'opp', at: [0, 1.8], width: 8, label: '\\dfrac26' }),
    bar({ name: 's', parts: 6, shaded: 5, tones: [...repeat('adj', 3), ...repeat('opp', 2)], at: [0, 0], width: 8, label: '\\dfrac56' }),
  ]);

// Mei's 3/8 and her brother's 1/4 (cut into 2/8), then the 5/8 they ate together.
const pizzas = (id: string) =>
  figure(
    id,
    [
      pie({ name: 'm', parts: 8, shaded: 3, tone: 'adj', at: [0, 0], r: 1.5, label: '\\dfrac38' }),
      pie({ name: 'q', parts: 4, shaded: 1, tone: 'opp', at: [4.2, 0], r: 1.5, label: '\\dfrac14' }),
      pie({ name: 'q8', parts: 8, shaded: 2, tone: 'opp', at: [4.2, 0], r: 1.5, label: '\\dfrac28' }),
      pie({ name: 's', parts: 8, shaded: 5, tones: [...repeat('adj', 3), ...repeat('opp', 2)], at: [8.4, 0], r: 1.5, label: '\\dfrac58' }),
    ],
    300,
  );

// Eight twelfths, take away three twelfths (red): five twelfths are left (green).
const twelfths = (id: string) => figure(id, [bar({ name: 't', parts: 12, shaded: 8, tones: [...repeat('good', 5), ...repeat('bad', 3)], width: 10, label: '\\dfrac{5}{12}' })], 150);

// The mistake: 1/4 is not 1/8, but it is 2/8.
const wrong = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'q', parts: 4, shaded: 1, tone: 'adj', at: [0, 4.4], width: 10, label: '\\dfrac14' }),
      bar({ name: 'w', parts: 8, shaded: 1, tone: 'bad', at: [0, 2.2], width: 10, label: '\\dfrac18' }),
      bar({ name: 'r', parts: 8, shaded: 2, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac28' }),
    ],
    370,
  );

const video: Explainer = {
  id: 'm7-3-1-c',
  lessonId: 'm7-3-1',
  title: 'Adding and Subtracting Fractions, Part 3: Different Denominators',
  thumbnailTitle: 'Different Denominators',
  thumbnail: 'pz',
  summary:
    'Halves and thirds are different sizes, so first rewrite both fractions with a common denominator, a number both denominators divide into: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Multiply the numerator and the denominator by the same number: 3/8 + 1/4 = 3/8 + 2/8 = 5/8, and 2/3 − 1/4 = 8/12 − 3/12 = 5/12. Changing only the denominator is a mistake: 1/4 is 2/8, not 1/8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 3', title: 'Different Denominators', subtitle: 'Cut the parts to the same size' }],
      lines: [
        { say: 'Mei and her brother share a pizza. Mei eats three eighths of it, and her brother eats one quarter of it. How much of the pizza is gone?', show: 'title' },
        { say: 'Eighths and quarters are different sizes. In this part, you will add and subtract fractions with different denominators, by cutting the parts to the same size.' },
      ],
    },
    {
      chapter: 'Parts of different sizes',
      layout: 'center',
      main: [
        different('df'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common denominator', md: 'A **common denominator** is a number that both denominators divide into. For halves and thirds, $6$ works: $2 \\times 3 = 6$ and $3 \\times 2 = 6$.' },
      ],
      lines: [
        { say: 'Here is one half, and here is one third. Can we add them straight away?', show: ['df.h-frame', 'df.h-shade', 'df.h-label', 'df.t-frame', 'df.t-shade', 'df.t-label'] },
        { say: 'One part plus one part makes two parts. But two parts of what? A half is bigger than a third, so the parts are different sizes. We cannot just count them.', focus: ['df.h-shade', 'df.t-shade'] },
        { say: 'First, we rewrite both fractions with a common denominator. A common denominator is a number that both denominators divide into.', show: 'def' },
        { say: 'For halves and thirds, six works. Two divides into six, and three divides into six. So we can cut both strips into sixths.' },
      ],
    },
    {
      chapter: 'Halves and thirds',
      layout: 'split',
      leftWidth: 560,
      left: [sixths('sx')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\dfrac{1}{2} + \\dfrac{1}{3}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{1}{2} = \\dfrac{1 \\times 3}{2 \\times 3} = \\dfrac{3}{6}', '\\dfrac{1}{3} = \\dfrac{1 \\times 2}{3 \\times 2} = \\dfrac{2}{6}', '\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}'] },
      ],
      lines: [
        { say: 'Let’s find one half plus one third, using sixths.', show: ['q', 'sx.h-frame', 'sx.h-shade', 'sx.h-label', 'sx.t-frame', 'sx.t-shade', 'sx.t-label'] },
        { say: 'Cut each half into three equal parts. Now the strip has six parts, and the half covers three of them. So one half equals three sixths.', show: ['sx.h6-frame', 'sx.h6-shade', 'sx.h6-label'], focus: ['sx.h-shade', 'sx.h6-shade'] },
        { say: 'In numbers, we multiply the top and the bottom by three. One times three is three, and two times three is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Cut each third into two equal parts. The third covers two of the six parts. So one third equals two sixths: multiply the top and the bottom by two.', show: ['sx.t6-frame', 'sx.t6-shade', 'sx.t6-label', 'm.1'], focus: ['sx.t-shade', 'sx.t6-shade', 'm.1'] },
        { say: 'Now the parts are the same size, so we can add. Three sixths plus two sixths is five sixths. So one half plus one third equals five sixths.', show: ['sx.s-frame', 'sx.s-shade', 'sx.s-label', 'm.2'], focus: ['sx.s-shade', 'm.2'] },
      ],
    },
    {
      chapter: 'Pizza for two',
      layout: 'center',
      main: [
        pizzas('pz'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{4} = \\dfrac{1 \\times 2}{4 \\times 2} = \\dfrac{2}{8}', '\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}'] },
      ],
      lines: [
        { say: 'Back to the pizza. Mei eats three eighths, the blue slices. Her brother eats one quarter, the orange slice.', show: ['pz.m-rim', 'pz.m-shade', 'pz.m-label', 'pz.q-rim', 'pz.q-shade', 'pz.q-label'] },
        { say: 'Count by fours: four, eight. Eight is a multiple of four, so eight can be the common denominator. We only need to change the quarter.', focus: 'pz.q-shade' },
        { say: 'Cut every quarter into two equal slices. The quarter becomes two eighths. In numbers, multiply the top and the bottom by two: one quarter equals two eighths.', hide: ['pz.q-rim', 'pz.q-shade', 'pz.q-label'], show: ['pz.q8-rim', 'pz.q8-shade', 'pz.q8-label', 'm.0'], focus: ['pz.q8-shade', 'm.0'] },
        { say: 'Now add the eighths. Three eighths plus two eighths is five eighths. So five eighths of the pizza is gone.', show: ['pz.s-rim', 'pz.s-shade', 'pz.s-label', 'm.1'], focus: ['pz.s-shade', 'm.1'] },
      ],
    },
    {
      chapter: 'Thirds and quarters',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\dfrac{2}{3} - \\dfrac{1}{4}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{Multiples of } 3\\colon\\ 3,\\ 6,\\ 9,\\ \\good{12} \\qquad \\text{Multiples of } 4\\colon\\ 4,\\ 8,\\ \\good{12}', '\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12} \\qquad \\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}', '\\dfrac{8}{12} - \\dfrac{3}{12} = \\dfrac{5}{12}'],
        },
        twelfths('tw'),
      ],
      lines: [
        { say: 'Subtracting works the same way. Find two thirds minus one quarter.', show: 'q' },
        { say: 'Four is not a multiple of three. So list the multiples of each denominator until they match. Multiples of three: three, six, nine, twelve. Multiples of four: four, eight, twelve. Use twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Two thirds: three times four is twelve, so multiply the top by four as well. Two thirds is eight twelfths. One quarter: four times three is twelve, so one quarter is three twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract. Eight twelfths take away three twelfths, the red parts, leaves five twelfths, in green. So two thirds minus one quarter is five twelfths.', show: ['m.2', 'tw.t-frame', 'tw.t-shade', 'tw.t-label'], focus: ['m.2', 'tw.t-p5', 'tw.t-p6', 'tw.t-p7'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Changing only the denominator', md: 'When you multiply the denominator by $2$, multiply the numerator by $2$ as well: $\\dfrac{1}{4} = \\dfrac{1 \\times 2}{4 \\times 2} = \\dfrac{2}{8}$, **not** $\\dfrac{1}{8}$.' },
        wrong('wr'),
      ],
      lines: [
        { say: 'Watch out for this mistake. To change one quarter into eighths, some people change only the bottom number, and write one eighth.', show: ['oops', 'wr.q-frame', 'wr.q-shade', 'wr.q-label'] },
        { say: 'But one eighth is only half as much as one quarter. The amount has changed!', show: ['wr.w-frame', 'wr.w-shade', 'wr.w-label'], focus: 'wr.w-shade' },
        { say: 'When the parts are cut in two, there are twice as many of them. So multiply the top and the bottom by the same number. One quarter equals two eighths.', show: ['wr.r-frame', 'wr.r-shade', 'wr.r-label'], focus: 'wr.r-shade' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{1}{2} + \\dfrac{1}{5}$.',
          choices: ['$\\dfrac{2}{7}$', '$\\dfrac{2}{10}$', '$\\dfrac{3}{10}$', '$\\dfrac{7}{10}$'],
          answer: 3,
          working: 'Use $10$: $\\dfrac{1}{2} = \\dfrac{5}{10}$ and $\\dfrac{1}{5} = \\dfrac{2}{10}$, so the sum is $\\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{7}{10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one half plus one fifth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, seven tenths. Ten is a common denominator. One half is five tenths, and one fifth is two tenths. Five tenths plus two tenths is seven tenths. Choice B changes only the denominators, but one half is not one tenth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Different denominators: rewrite the fractions with a **common denominator** first.',
            'Multiply the numerator and the denominator by the same number.',
            '$\\dfrac{3}{8} + \\dfrac{1}{4} = \\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$',
            'List multiples of the denominators to find one: $\\dfrac{2}{3} - \\dfrac{1}{4} = \\dfrac{8}{12} - \\dfrac{3}{12} = \\dfrac{5}{12}$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the denominators are different, rewrite the fractions with a common denominator first, so the parts are the same size.', show: 'sum.0' },
        { say: 'To change a fraction, multiply the numerator and the denominator by the same number.', show: 'sum.1' },
        { say: 'So three eighths plus one quarter is three eighths plus two eighths, which is five eighths.', show: 'sum.2' },
        { say: 'To find a common denominator, list multiples of the denominators until they match. In the next part, you will find the lowest common denominator. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
