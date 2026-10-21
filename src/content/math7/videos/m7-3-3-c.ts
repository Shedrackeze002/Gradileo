import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { note } from '@/content/math6/videos/lib/m6-1-figures.ts';

// Maya's garden in 12 equal parts: carrots in the top row (4 parts, 1/3), beans in 3 parts (1/4),
// and flowers in the other 5 parts.
const garden = (id: string) =>
  figure(id, [
    bar({ name: 'r0', parts: 4, shaded: 4, tone: 'good', at: [0, 3], width: 6, height: 1.5 }),
    bar({ name: 'r1', parts: 4, shaded: 4, tones: ['theta', 'theta', 'theta', 'hyp'], at: [0, 1.5], width: 6, height: 1.5 }),
    bar({ name: 'r2', parts: 4, shaded: 4, tone: 'hyp', at: [0, 0], width: 6, height: 1.5 }),
    note({ id: 'carrots', at: [6.35, 3.75], tex: '\\text{carrots } \\tfrac13', tone: 'good', place: 'right' }),
    note({ id: 'beans', at: [6.35, 2.25], tex: '\\text{beans } \\tfrac14', tone: 'theta', place: 'right' }),
    note({ id: 'flowers', at: [6.35, 0.75], tex: '\\text{flowers } \\tfrac{5}{12}', tone: 'hyp', place: 'right' }),
    note({ id: 'room', at: [9.4, 0.75], tex: '' }),
  ]);

const video: Explainer = {
  id: 'm7-3-3-c',
  lessonId: 'm7-3-3',
  title: 'Solving Fraction Problems, Part 3: Two-Step Problems',
  thumbnailTitle: 'Two-Step Problems',
  thumbnail: 'gd',
  summary:
    'Some problems need two steps: add the parts first, then subtract from the whole. Carrots on 1/3 of a garden and beans on 1/4 use 4/12 + 3/12 = 7/12, so 12/12 − 7/12 = 5/12 is left for flowers (7/12 is not the answer). With 5 cups of flour, cookies (2 1/4 cups) and pancakes (1 2/3 cups) use 3 11/12 cups, leaving 4 12/12 − 3 11/12 = 1 1/12 cups; adding back gives 5 cups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 3', title: 'Two-Step Problems', subtitle: 'Add the parts, then subtract from the whole' }],
      lines: [
        { say: 'Some problems cannot be solved in one step. You might need to add some parts first, and then find what is left.', show: 'title' },
        { say: 'In this part, you will solve two-step fraction problems, and check your answers by adding back.' },
      ],
    },
    {
      chapter: 'Flowers in the garden',
      layout: 'split',
      leftWidth: 600,
      left: [garden('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Maya plants $\\dfrac{1}{3}$ of a garden with carrots and $\\dfrac{1}{4}$ of it with beans. The rest is for flowers. What fraction of the garden is for flowers?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}', '\\dfrac{12}{12} - \\dfrac{7}{12} = \\dfrac{5}{12}'] },
      ],
      lines: [
        { say: 'Maya plants one third of a garden with carrots, and one quarter of it with beans. The rest is for flowers. What fraction of the garden is for flowers?', show: 'q' },
        { say: 'The garden is cut into twelve equal parts, because twelve works for both thirds and quarters. One third of twelve parts is four parts. That is the top row, for carrots.', show: ['gd.r0-frame', 'gd.r1-frame', 'gd.r2-frame', 'gd.r0-shade', 'gd.carrots'] },
        { say: 'One quarter of twelve parts is three parts, for beans.', show: ['gd.r1-p0', 'gd.r1-p1', 'gd.r1-p2', 'gd.beans'] },
        { say: 'Step one: add the vegetable parts. One third is four twelfths, and one quarter is three twelfths. Together, they make seven twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: the whole garden is one, which is twelve twelfths. Subtract the vegetables. Twelve twelfths minus seven twelfths is five twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the picture. Five of the twelve parts are left for flowers. So five twelfths of the garden is for flowers.', show: ['gd.r1-p3', 'gd.r2-shade', 'gd.flowers'], focus: ['gd.r1-p3', 'gd.r2-shade'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping after step one', md: '$\\dfrac{7}{12}$ is the part for **vegetables**, not for flowers. Read the question again before you write your answer.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. After step one, it is tempting to stop, and give seven twelfths as the answer.', show: 'oops' },
        { say: 'But seven twelfths is the part for vegetables. The question asked about flowers. Always read the question again before you write your answer, to make sure you have answered what was asked.' },
      ],
    },
    {
      chapter: 'Is there enough flour?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Leah has $5$ cups of flour. Cookies need $2\\dfrac{1}{4}$ cups and pancakes need $1\\dfrac{2}{3}$ cups. How much flour is left after Leah makes both?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 2\\dfrac{1}{4} + 1\\dfrac{2}{3} = 2\\dfrac{3}{12} + 1\\dfrac{8}{12} = 3\\dfrac{11}{12}', '\\text{Step 2: } 5 = 4\\dfrac{12}{12} \\qquad 4\\dfrac{12}{12} - 3\\dfrac{11}{12} = 1\\dfrac{1}{12}'] },
      ],
      lines: [
        { say: 'Here is another two-step problem. Leah has five cups of flour. Cookies need two and one quarter cups, and pancakes need one and two thirds cups. How much flour is left after Leah makes both?', show: 'q' },
        { say: 'Step one: add the flour that is used. In twelfths, that is two and three twelfths plus one and eight twelfths. The wholes make three, and the fractions make eleven twelfths. So three and eleven twelfths cups are used.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: subtract that from five cups. Five has no fraction part, so regroup it as four and twelve twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'Four minus three is one. Twelve twelfths minus eleven twelfths is one twelfth. So Leah will have one and one twelfth cups of flour left.' },
      ],
    },
    {
      chapter: 'Check by adding back',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by adding back', md: 'Add your answer to the amount used. You should get back to the amount you started with.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3\\dfrac{11}{12} + 1\\dfrac{1}{12} = 4\\dfrac{12}{12} = 5 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is a good way to check. Add your answer to the amount that was used. You should get back to the amount you started with.', show: 'tip' },
        { say: 'Three and eleven twelfths plus one and one twelfth is four and twelve twelfths. Twelve twelfths is one whole, so that is five cups. That is exactly what Leah started with, so the answer is right.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ana spends $\\dfrac{1}{2}$ of a gift card on a bike helmet and $\\dfrac{1}{5}$ of it on a book. What fraction of the gift card is left?',
          choices: ['$\\dfrac{7}{10}$', '$\\dfrac{2}{7}$', '$\\dfrac{3}{10}$', '$\\dfrac{1}{3}$'],
          answer: 2,
          working: 'Step 1: $\\dfrac{1}{2} + \\dfrac{1}{5} = \\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{7}{10}$ is spent. Step 2: $\\dfrac{10}{10} - \\dfrac{7}{10} = \\dfrac{3}{10}$ is left.',
        },
      ],
      lines: [
        { say: 'Your turn. Ana spends one half of a gift card on a bike helmet, and one fifth of it on a book. What fraction of the gift card is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, three tenths. Step one: one half plus one fifth is five tenths plus two tenths, which is seven tenths spent. Step two: ten tenths minus seven tenths is three tenths left. Choice A stops after step one: seven tenths is the part that was spent.', show: 'q.answer' },
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
            'In a two-step problem, find the total of the parts first.',
            'Then subtract that total from the whole: $1 = \\dfrac{12}{12}$, or $5 = 4\\dfrac{12}{12}$.',
            'Read the question again: do not stop after step one.',
            'Check by adding back.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a two-step problem, find the total of the parts first.', show: 'sum.0' },
        { say: 'Then subtract that total from the whole. Write the whole with the same denominator, and regroup if you need to.', show: 'sum.1' },
        { say: 'Read the question again before you answer, so you do not stop after step one.', show: 'sum.2' },
        { say: 'And check by adding back. Great work with fractions! Next, you will add and subtract integers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
