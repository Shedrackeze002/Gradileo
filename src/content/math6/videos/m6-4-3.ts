import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Four groups of two thirds: four bars of thirds, two thirds of each shaded.
const groups = (id: string) =>
  figure(id, [0, 1, 2, 3].map((k) => bar({ name: `g${k}`, parts: 3, shaded: 2, tone: 'adj', at: [0, (3 - k) * 1.6], width: 6, label: '\\dfrac23' })));

// The same eight thirds packed together: two whole bars and two thirds of a third bar.
const packed = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 3, shaded: 3, tone: 'adj', at: [0, 3.2], width: 6, label: '1' }),
    bar({ name: 'b', parts: 3, shaded: 3, tone: 'adj', at: [0, 1.6], width: 6, label: '1' }),
    bar({ name: 'c', parts: 3, shaded: 2, tone: 'adj', at: [0, 0], width: 6, label: '\\dfrac23' }),
  ]);

const video: Explainer = {
  id: 'm6-4-3',
  lessonId: 'm6-4-3',
  title: 'Multiplying Fractions and Natural Numbers, Part 1: Repeated Addition',
  thumbnailTitle: 'Repeated Addition',
  thumbnail: 'gr',
  summary:
    'A natural number times a fraction is repeated addition: 4 × 2/3 is four groups of 2/3, so 2/3 + 2/3 + 2/3 + 2/3 = 8/3 = 2 2/3. The shortcut multiplies the natural number by the numerator and keeps the denominator, because the pieces are still thirds; 4 × 2/3 is not 8/12. Also 3 × 3/5 = 9/5 = 1 4/5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 1', title: 'Repeated Addition', subtitle: 'A natural number times a fraction' }],
      lines: [
        { say: 'A muffin recipe uses three quarters of a cup of milk. How much milk do you need for six batches? Questions like this multiply a fraction and a natural number.', show: 'title' },
        { say: 'A natural number is a counting number: one, two, three, and so on. In this part, you will multiply a natural number by a fraction, using repeated addition.' },
      ],
    },
    {
      chapter: 'Four groups of two thirds',
      layout: 'split',
      leftWidth: 480,
      left: [groups('gr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times \\dfrac23', '= \\dfrac23 + \\dfrac23 + \\dfrac23 + \\dfrac23'] }],
      lines: [
        { say: 'Let’s find four times two thirds. Four times something means four groups of it. So four times two thirds means four groups of two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is one group: a bar cut into thirds, with two thirds shaded.', show: ['gr.g0-frame', 'gr.g0-shade', 'gr.g0-label'] },
        { say: 'Here are two groups, three groups, and four groups.', show: ['gr.g1-frame', 'gr.g1-shade', 'gr.g1-label', 'gr.g2-frame', 'gr.g2-shade', 'gr.g2-label', 'gr.g3-frame', 'gr.g3-shade', 'gr.g3-label'] },
        { say: 'So four times two thirds is two thirds plus two thirds plus two thirds plus two thirds. Multiplying a natural number by a fraction is repeated addition.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Count the thirds',
      layout: 'split',
      leftWidth: 480,
      left: [packed('pk')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 2 + 2 + 2 = 8', '\\to \\dfrac{8}{3}', '8 \\div 3 = 2 \\text{ R } 2', '\\dfrac{8}{3} = 2\\dfrac{2}{3}'] }],
      lines: [
        { say: 'All the pieces are thirds, so we can count them. Add the numerators: two plus two plus two plus two is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'That is eight thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'Now move the shaded pieces together. Three thirds fill one whole bar, and three more fill a second bar. Two thirds are left over.', show: ['pk.a-frame', 'pk.a-shade', 'pk.a-label', 'pk.b-frame', 'pk.b-shade', 'pk.b-label', 'pk.c-frame', 'pk.c-shade', 'pk.c-label'] },
        { say: 'Eight divided by three is two, remainder two. So eight thirds is two and two thirds.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'The shortcut',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Multiplying a natural number by a fraction', md: 'Multiply the natural number by the **numerator**. Keep the **denominator**.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['4 \\times \\dfrac{2}{3} = \\dfrac{4 \\times 2}{3} = \\dfrac{8}{3}'] },
      ],
      lines: [
        { say: 'Adding two thirds four times takes a while. There is a shortcut. Multiply the natural number by the numerator, and keep the denominator.', show: 'key' },
        { say: 'Four times two is eight, and the denominator stays three. Eight thirds, the same as before!', show: 'm.0', focus: 'm.0' },
        { say: 'Why does the denominator stay the same? Because the pieces are still thirds. You just have four times as many of them.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the denominator too', md: '$4 \\times \\dfrac{2}{3}$ is **not** $\\dfrac{8}{12}$. You have $4$ groups of thirds, so the pieces are still thirds. Only the numerator is multiplied.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{4 \\times 2}{4 \\times 3} = \\dfrac{8}{12}} = \\dfrac{2}{3} \\;\\; \\text{just one group!}', '\\good{\\dfrac{4 \\times 2}{3} = \\dfrac{8}{3}} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people multiply the denominator by four as well, and get eight twelfths.', show: 'oops' },
        { say: 'But eight twelfths is the same as two thirds. That is just one group, not four groups! Multiplying the top and the bottom by four makes an equivalent fraction, and does not change the amount.', show: 'm.0', focus: 'm.0' },
        { say: 'You have four groups of thirds, so the pieces are still thirds. Only the numerator is multiplied: eight thirds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another one',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $3 \\times \\dfrac{3}{5}$. Write the answer as a mixed number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times \\dfrac{3}{5} = \\dfrac{3 \\times 3}{5} = \\dfrac{9}{5}', '9 \\div 5 = 1 \\text{ R } 4 \\;\\to\\; \\dfrac95 = 1\\dfrac{4}{5}'] },
      ],
      lines: [
        { say: 'Let’s practise. Find three times three fifths, and write the answer as a mixed number.', show: 't' },
        { say: 'Multiply the natural number by the numerator: three times three is nine. Keep the denominator, five. That is nine fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine divided by five is one, remainder four. So nine fifths is one and four fifths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $5 \\times \\dfrac{2}{7}$.',
          choices: ['$\\dfrac{10}{7}$', '$\\dfrac{10}{35}$', '$\\dfrac{7}{7}$', '$\\dfrac{2}{35}$'],
          answer: 0,
          working: 'Multiply the numerator by $5$ and keep the denominator: $\\tfrac{5 \\times 2}{7} = \\tfrac{10}{7}$, which is $1\\tfrac{3}{7}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five times two sevenths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ten sevenths. Multiply the numerator by five: five times two is ten. Keep the denominator, seven. Choice B multiplies the denominator as well, but the pieces are still sevenths.', show: 'q.answer' },
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
            'A natural number times a fraction is repeated addition: $4 \\times \\dfrac{2}{3} = \\dfrac23 + \\dfrac23 + \\dfrac23 + \\dfrac23$.',
            'Multiply the natural number by the numerator, and keep the denominator: $\\dfrac{8}{3}$.',
            'Do not multiply the denominator: the pieces stay the same size.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A natural number times a fraction is repeated addition.', show: 'sum.0' },
        { say: 'The shortcut: multiply the natural number by the numerator, and keep the denominator.', show: 'sum.1' },
        { say: 'Do not multiply the denominator, because the pieces stay the same size. In the next part, you will find a fraction of a quantity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
