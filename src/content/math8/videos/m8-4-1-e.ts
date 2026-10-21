import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaModel } from '@/video/algebra.ts';

// (2 + 1/2) × (1 + 1/3), drawn to scale: four parts, 2, 1/2, 2/3 and 1/6.
const model = (id: string, height = 360) =>
  figure(
    id,
    [
      areaModel({
        top: ['2', '\\dfrac12'],
        side: ['1', '\\dfrac13'],
        cells: [
          ['2', '\\tfrac12'],
          ['\\tfrac23', '\\tfrac16'],
        ],
        widths: [6, 1.5],
        heights: [3, 1],
        tones: [
          ['adj', 'theta'],
          ['good', 'hyp'],
        ],
      }),
    ],
    height,
  );

const video: Explainer = {
  id: 'm8-4-1-e',
  lessonId: 'm8-4-1',
  title: 'Multiplying Fractions, Part 5: Multiplying Mixed Numbers',
  thumbnailTitle: 'Multiplying Mixed Numbers',
  thumbnail: 'am',
  summary:
    'To multiply mixed numbers, write each one as an improper fraction first: 2 1/2 = 5/2 and 1 1/3 = 4/3, so 2 1/2 × 1 1/3 = 5/2 × 4/3 = 20/6 = 10/3 = 3 1/3. An area model checks it: split each mixed number into its whole part and its fraction part and multiply each part by each part, 2 + 1/2 + 2/3 + 1/6 = 3 1/3. Multiplying only the whole numbers and only the fractions (2 1/6) misses two of the four parts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 5', title: 'Multiplying Mixed Numbers', subtitle: 'Improper fractions first' }],
      lines: [
        { say: 'What is two and one half times one and one third? Numbers like these have a whole part and a fraction part, so they need a little care.', show: 'title' },
        { say: 'In this part, you will multiply mixed numbers, and check the answer with an area model.' },
      ],
    },
    {
      chapter: 'Improper fractions first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed numbers and improper fractions', md: 'A **mixed number** is a whole number and a fraction together, like $2\\dfrac{1}{2}$. An **improper fraction** has a numerator at least as big as its denominator, like $\\dfrac{5}{2}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{1}{2} = \\dfrac{2 \\times 2 + 1}{2} = \\dfrac{5}{2}', '1\\dfrac{1}{3} = \\dfrac{1 \\times 3 + 1}{3} = \\dfrac{4}{3}'] },
      ],
      lines: [
        { say: 'A mixed number is a whole number and a fraction together, like two and one half. An improper fraction has a numerator at least as big as its denominator, like five halves.', show: 'def' },
        { say: 'To multiply mixed numbers, first write each one as an improper fraction. Two and one half: two wholes are four halves, and one more half makes five halves.', show: 'm.0', focus: 'm.0' },
        { say: 'One and one third: one whole is three thirds, and one more third makes four thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'The quick way: multiply the whole number by the denominator, add the numerator, and keep the denominator.' },
      ],
    },
    {
      chapter: 'Multiply',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['2\\dfrac{1}{2} \\times 1\\dfrac{1}{3} = \\dfrac{5}{2} \\times \\dfrac{4}{3}', '= \\dfrac{5 \\times 4}{2 \\times 3} = \\dfrac{20}{6} = \\dfrac{10}{3}', '\\dfrac{10}{3} = 3\\dfrac{1}{3} \\qquad (10 \\div 3 = 3 \\text{ R } 1)'],
        },
      ],
      lines: [
        { say: 'Now multiply five halves times four thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Five times four is twenty, and two times three is six. That is twenty sixths. Two divides both, so it is ten thirds. You could also simplify first: four and two share the factor two.', show: 'm.1', focus: 'm.1' },
        { say: 'Write ten thirds as a mixed number. Ten divided by three is three, remainder one. So ten thirds is three wholes and one more third: three and one third.', show: 'm.2', focus: 'm.2' },
        { say: 'So two and one half times one and one third is three and one third. Does that make sense? Two and one half times one would be two and one half, and we multiplied by a bit more than one, so the answer should be a bit more. It is!' },
      ],
    },
    {
      chapter: 'Checking with an area model',
      layout: 'center',
      main: [
        model('am'),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 + \\dfrac{1}{2} + \\dfrac{2}{3} + \\dfrac{1}{6} = 2 + \\dfrac{3}{6} + \\dfrac{4}{6} + \\dfrac{1}{6}', '= 2 + \\dfrac{8}{6} = 3\\dfrac{2}{6} = 3\\dfrac{1}{3}'] },
      ],
      lines: [
        { say: 'An area model can check the answer. Draw a rectangle two and one half wide and one and one third tall. Split the width into two and one half, and the height into one and one third.', show: ['am.outline', 'am.grid', 'am.top', 'am.side'] },
        { say: 'Now multiply each part by each part. Two times one is two.', show: 'am.c0-0', focus: 'am.c0-0' },
        { say: 'One half times one is one half.', show: 'am.c0-1', focus: 'am.c0-1' },
        { say: 'Two times one third is two thirds.', show: 'am.c1-0', focus: 'am.c1-0' },
        { say: 'And one half times one third is one sixth.', show: 'am.c1-1', focus: 'am.c1-1' },
        { say: 'Add the four parts, using sixths. One half is three sixths, and two thirds is four sixths. Two, plus three sixths, plus four sixths, plus one sixth, is two and eight sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight sixths is one and two sixths, so the total is three and two sixths, which is three and one third. It matches!', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        model('am', 320),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the parts separately', md: '$2\\dfrac{1}{2} \\times 1\\dfrac{1}{3}$ is **not** $2 \\times 1$ plus $\\dfrac{1}{2} \\times \\dfrac{1}{3}$, which is $2\\dfrac{1}{6}$. That misses two of the four parts.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people multiply the whole numbers, two times one, and the fractions, one half times one third, and add them to get two and one sixth.', show: ['oops', 'am.outline', 'am.grid', 'am.top', 'am.side', 'am.c0-0', 'am.c1-1'], focus: ['am.c0-0', 'am.c1-1'] },
        { say: 'But the area model has four parts, not two. That way misses the one half and the two thirds.', show: ['am.c0-1', 'am.c1-0'], focus: ['am.c0-1', 'am.c1-0'] },
        { say: 'Writing each mixed number as an improper fraction first takes care of every part.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $1\\dfrac{1}{2} \\times 2\\dfrac{2}{3}$.',
          choices: ['$2\\dfrac{1}{3}$', '$4$', '$3\\dfrac{1}{6}$', '$\\dfrac{8}{3}$'],
          answer: 1,
          working: '$1\\tfrac12 = \\tfrac32$ and $2\\tfrac23 = \\tfrac83$, so $\\tfrac32 \\times \\tfrac83 = \\tfrac{24}{6} = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one and one half times two and two thirds. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four. One and one half is three halves, and two and two thirds is eight thirds. Three halves times eight thirds is twenty-four sixths, which is four. Choice A, two and one third, multiplies only the whole numbers and only the fractions, and misses two parts.', show: 'q.answer' },
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
            'Write each mixed number as an improper fraction: $2\\dfrac{1}{2} = \\dfrac{5}{2}$.',
            'Multiply, simplify, and write the answer as a mixed number: $\\dfrac{10}{3} = 3\\dfrac{1}{3}$.',
            'An area model checks it: $2 + \\dfrac{1}{2} + \\dfrac{2}{3} + \\dfrac{1}{6} = 3\\dfrac{1}{3}$.',
            'Never multiply just the whole numbers and just the fractions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply mixed numbers, first write each one as an improper fraction.', show: 'sum.0' },
        { say: 'Multiply, simplify, and write the answer as a mixed number.', show: 'sum.1' },
        { say: 'An area model, with each part times each part, checks the answer.', show: 'sum.2' },
        { say: 'And never multiply just the whole numbers and just the fractions. Next, you will divide fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
