import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// 4.5 groups of −1.5: four jumps of −1.5 and half a jump, from 0 to −6.75.
const front = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -7,
        max: 1,
        step: 0.25,
        moves: [
          ...[0, 1, 2, 3].map((k) => ({ id: `j${k}`, from: -1.5 * k, to: -1.5 * (k + 1), tone: 'opp' as const, label: '-1.5' })),
          { id: 'half', from: -6, to: -6.75, tone: 'hyp', label: '-0.75' },
        ],
        points: [{ id: 'end', value: -6.75, tex: '-6.75', tone: 'good', below: true }],
      }),
    ],
    280,
  );

// 2 1/2 batches of 3/4 cup, each cup in eighths: 6/8 + 6/8 + 3/8 = 15/8.
const milk = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'c1', parts: 8, shaded: 6, tone: 'adj', at: [0, 3.6], width: 8, label: '\\tfrac{3}{4}\\text{ cup}' }),
      bar({ name: 'c2', parts: 8, shaded: 6, tone: 'adj', at: [0, 1.8], width: 8, label: '\\tfrac{3}{4}\\text{ cup}' }),
      bar({ name: 'c3', parts: 8, shaded: 3, tone: 'good', at: [0, 0], width: 8, label: '\\tfrac{3}{8}\\text{ cup}' }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm9-3-3-e',
  lessonId: 'm9-3-3',
  title: 'Multiplying and Dividing Rational Numbers, Part 5: Solving Problems',
  thumbnailTitle: 'Multiplying and Dividing to Solve Problems',
  thumbnail: 'ml',
  summary:
    'A temperature that drops 1.5 degrees each hour for 4.5 hours changes by −1.5 × 4.5 = −6.75 °C: a drop is a negative change, and different signs give a negative product. Working backwards, −6.75 ÷ 4.5 = −1.5 degrees each hour. A recipe that uses 3/4 cup of milk, made 2 1/2 times, needs 3/4 × 5/2 = 15/8 = 1 7/8 cups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 5', title: 'Solving Problems', subtitle: 'Equal changes, and scaling a recipe' }],
      lines: [
        { say: 'If the temperature drops one point five degrees every hour, how much does it change in four and a half hours? If a recipe needs three quarters of a cup of milk, how much do you need for two and a half batches?', show: 'title' },
        { say: 'In this part, you will solve problems like these by multiplying and dividing rational numbers.' },
      ],
    },
    {
      chapter: 'A cold front',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The temperature drops $1.5^\\circ\\text{C}$ each hour for $4.5$ hours. What is the total change?' },
        front('fr'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-1.5 \\times 4.5 = -6.75'] },
      ],
      lines: [
        { say: 'A cold front moves in. The temperature drops one point five degrees Celsius each hour, for four and a half hours. What is the total change in temperature?', show: 'q' },
        { say: 'A drop is a negative change, so the change each hour is negative one point five degrees.', show: ['fr.axis', 'fr.j0'], focus: 'fr.j0' },
        { say: 'Four hours give four jumps of negative one point five, which take you to negative six.', show: ['fr.j1', 'fr.j2', 'fr.j3'], focus: ['fr.j1', 'fr.j2', 'fr.j3'] },
        { say: 'The last half hour gives half a jump: half of negative one point five is negative zero point seven five. You end at negative six point seven five.', show: ['fr.half', 'fr.end'], focus: ['fr.half', 'fr.end'] },
        { say: 'With numbers: negative one point five times four point five. Different signs, so the product is negative. One point five times four point five is six point seven five. So the temperature changes by negative six point seven five degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The temperature changes by $-6.75^\\circ\\text{C}$ in $4.5$ hours, at a steady rate. What is the change each hour?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-6.75 \\div 4.5', '\\text{Sign: different} \\;\\to\\; \\text{negative}', '6.75 \\div 4.5 = 67.5 \\div 45 = 1.5', '-6.75 \\div 4.5 = -1.5'] },
      ],
      lines: [
        { say: 'Division answers the opposite question. Suppose you know the temperature changed by negative six point seven five degrees in four and a half hours, at a steady rate. What was the change each hour?', show: 'q' },
        { say: 'Share the total change equally among the hours: negative six point seven five divided by four point five.', show: 'm.0', focus: 'm.0' },
        { say: 'The signs are different, so the answer is negative.', show: 'm.1', focus: 'm.1' },
        { say: 'For the size, multiply both numbers by ten: sixty-seven point five divided by forty-five, which is one point five.', show: 'm.2', focus: 'm.2' },
        { say: 'So the change was negative one point five degrees each hour, just as before.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Scaling a recipe',
      layout: 'split',
      leftWidth: 540,
      left: [milk('ml')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A pancake recipe uses $\\tfrac{3}{4}$ cup of milk. Arjun makes $2\\tfrac{1}{2}$ times the recipe. How much milk does Arjun need?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3}{4} \\times 2\\dfrac{1}{2} = \\dfrac{3}{4} \\times \\dfrac{5}{2}', '= \\dfrac{15}{8} = 1\\dfrac{7}{8}'] },
      ],
      lines: [
        { say: 'A pancake recipe uses three quarters of a cup of milk. Arjun makes two and a half times the recipe. How much milk does Arjun need?', show: 'q' },
        { say: 'Two and a half times the recipe means two and a half groups of three quarters of a cup. Each strip here is one cup, cut into eighths.', show: ['ml.c1-frame', 'ml.c1-shade', 'ml.c1-label', 'ml.c2-frame', 'ml.c2-shade', 'ml.c2-label'] },
        { say: 'Two full batches use two lots of three quarters of a cup. Half a batch uses half of three quarters, which is three eighths of a cup.', show: ['ml.c3-frame', 'ml.c3-shade', 'ml.c3-label'], focus: 'ml.c3-shade' },
        { say: 'With numbers: three quarters times two and a half. Write the mixed number as an improper fraction: five halves.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times five is fifteen, and four times two is eight. That is fifteen eighths, the same as the shaded eighths in the strips. As a mixed number, it is one and seven eighths. Arjun needs one and seven eighths cups of milk.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A diver’s depth changes by $-2.5$ m each minute for $3.5$ minutes. What is the total change in depth?',
          choices: ['$8.75$ m', '$-6$ m', '$-1.4$ m', '$-8.75$ m'],
          answer: 3,
          working: '$-2.5 \\times 3.5$: different signs, so the product is negative, and $2.5 \\times 3.5 = 8.75$. The change is $-8.75$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A diver’s depth changes by negative two point five metres each minute, for three point five minutes. What is the total change in depth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative eight point seven five metres. Multiply: negative two point five times three point five. Different signs give a negative product, and two point five times three point five is eight point seven five. Choice A has the right size, but going down is a negative change.', show: 'q.answer' },
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
            'An equal change, many times: multiply. $-1.5 \\times 4.5 = -6.75$',
            'A total change shared out equally: divide. $-6.75 \\div 4.5 = -1.5$',
            'A drop is negative; decide the sign, then work with the sizes.',
            'Scaling a recipe: multiply. $\\tfrac{3}{4} \\times 2\\tfrac{1}{2} = 1\\tfrac{7}{8}$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the same change happens many times, multiply.', show: 'sum.0' },
        { say: 'When a total change is shared out equally, divide.', show: 'sum.1' },
        { say: 'A drop is a negative change. Decide the sign first, then work with the sizes.', show: 'sum.2' },
        { say: 'And to scale a recipe, multiply by the number of batches. Next, you will use the order of operations with rational numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
