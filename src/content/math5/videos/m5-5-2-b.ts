import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, pie } from './lib/m5-5-figures.ts';

const video: Explainer = {
  id: 'm5-5-2-b',
  lessonId: 'm5-5-2',
  title: 'Adding and Subtracting Fractions, Part 2: With a Common Denominator',
  thumbnailTitle: 'Adding Fractions',
  thumbnail: 'pz',
  summary: 'Adding and subtracting fractions with a common denominator: add or subtract the numerators and keep the denominator (2/8 + 3/8 = 5/8, 7/8 − 2/8 = 5/8, 7/5 + 6/5 = 13/5 = 2⅗), why adding the denominators is wrong, and adding in any order.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 2', title: 'With a Common Denominator', subtitle: 'Add the numerators, keep the denominator' }],
      lines: [
        { say: 'Back to Kateri’s pizza. Kateri ate two eighths, and her brother ate three eighths. Now we are ready to add them.', show: 'title' },
        { say: 'In this video, you will add and subtract fractions that have the same denominator.' },
      ],
    },
    {
      chapter: 'A common denominator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common denominator', md: 'Fractions have a **common denominator** when their denominators are the same, like $\\dfrac{2}{8}$ and $\\dfrac{3}{8}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{\\adj{8}} \\quad \\text{and} \\quad \\dfrac{3}{\\adj{8}}'] },
      ],
      lines: [
        { say: 'Two eighths and three eighths have the same denominator, eight. We say they have a common denominator. Common means shared.', show: ['def', 'm.0'] },
        { say: 'A common denominator means the pieces are the same size. Both fractions count eighths.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Adding',
      layout: 'split',
      leftWidth: 420,
      left: [figure('pz', [pie({ parts: 8, shaded: 5, r: 2, tones: ['brand', 'brand', 'opp', 'opp', 'opp'] })], 380)],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\brand{\\dfrac28} + \\opp{\\dfrac38} = \\dfrac58'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same denominator', md: 'Add or subtract the **numerators** to count the pieces. The **denominator stays the same**, because the size of the pieces does not change.' },
      ],
      lines: [
        { say: 'Here is the pizza, cut into eight equal slices. Kateri ate two eighths: two purple slices.', show: ['pz.rim', 'pz.s0', 'pz.s1'] },
        { say: 'Her brother ate three eighths: three orange slices.', show: ['pz.s2', 'pz.s3', 'pz.s4'] },
        { say: 'Count the slices together. Two eighths plus three eighths is five eighths, just like two apples plus three apples is five apples.', show: 'm.0', focus: ['m.0', 'pz.shade'] },
        { say: 'So with a common denominator, add the numerators to count the pieces. The denominator stays the same, because the size of the pieces does not change. They ate five eighths of the pizza.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        figure('cmp', [
          bar({ name: 'e', parts: 8, shaded: 5, at: [0, 1.6], width: 11, tone: 'good', label: '\\dfrac58' }),
          bar({ name: 's', parts: 16, shaded: 5, at: [0, 0], width: 11, tone: 'bad', label: '\\dfrac{5}{16}' }),
        ], 240),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not add the denominators', md: '$\\dfrac{2}{8} + \\dfrac{3}{8}$ is not $\\dfrac{5}{16}$. Sixteenths are smaller pieces than eighths. The pieces are still eighths, so the answer is $\\dfrac{5}{8}$.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people add the denominators as well: two eighths plus three eighths makes five sixteenths. That is wrong.', show: 'oops' },
        { say: 'Sixteenths are smaller pieces than eighths. Five sixteenths is only this much. It is even less than three eighths, one of the amounts we added!', show: ['cmp.s-frame', 'cmp.s-shade', 'cmp.s-label'], focus: 'cmp.s-shade' },
        { say: 'Adding does not change the size of the pieces. They are still eighths, so the answer is five eighths.', show: ['cmp.e-frame', 'cmp.e-shade', 'cmp.e-label'], focus: 'cmp.e-shade' },
      ],
    },
    {
      chapter: 'Subtracting',
      layout: 'center',
      main: [
        figure('sub', [bar({ parts: 8, shaded: 7, width: 12, height: 1.4, tone: 'adj' })], 220),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac78 - \\dfrac28 = \\dfrac58'] },
      ],
      lines: [
        { say: 'Subtracting works the same way. Find seven eighths minus two eighths. Here are seven eighths.', show: ['sub.frame', 'sub.p0', 'sub.p1', 'sub.p2', 'sub.p3', 'sub.p4', 'sub.p5', 'sub.p6'] },
        { say: 'Take away two of the pieces.', hide: ['sub.p5', 'sub.p6'] },
        { say: 'Five pieces are left. Seven minus two is five, and the pieces are still eighths. So seven eighths minus two eighths is five eighths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Improper fractions',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('imp', [
          bar({ name: 'a', parts: 5, shaded: 5, at: [0, 3], width: 6, tones: ['brand', 'brand', 'brand', 'brand', 'brand'] }),
          bar({ name: 'b', parts: 5, shaded: 5, at: [0, 1.5], width: 6, tones: ['brand', 'brand', 'opp', 'opp', 'opp'] }),
          bar({ name: 'c', parts: 5, shaded: 3, at: [0, 0], width: 6, tone: 'opp' }),
        ], 380),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{\\dfrac75} + \\opp{\\dfrac65} = \\dfrac{13}{5}', '13 \\div 5 = 2 \\text{ R } 3', '\\dfrac{13}{5} = 2\\dfrac35'] }],
      lines: [
        { say: 'Improper fractions work the same way. Find seven fifths plus six fifths.', show: ['imp.a-frame', 'imp.b-frame', 'imp.c-frame'] },
        { say: 'Here are seven fifths in purple, and six fifths in orange.', show: ['imp.a-shade', 'imp.b-p0', 'imp.b-p1', 'imp.b-p2', 'imp.b-p3', 'imp.b-p4', 'imp.c-shade'] },
        { say: 'Add the numerators: seven plus six is 13. Keep the denominator, five. So the sum is thirteen fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirteen fifths is an improper fraction. To write it as a mixed number, divide: 13 divided by five is two, remainder three.', show: 'm.1', focus: 'm.1' },
        { say: 'So the sum is two and three fifths: two full bars and three fifths more. Both forms, thirteen fifths and two and three fifths, are correct.', show: 'm.2', focus: ['m.2', 'imp.a-shade', 'imp.b-shade'] },
      ],
    },
    {
      chapter: 'Any order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Any order', md: 'You can add fractions in any order, just like counting numbers.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac38 + \\dfrac28 = \\dfrac28 + \\dfrac38 = \\dfrac58'] },
      ],
      lines: [
        { say: 'One more thing. You can add fractions in any order, just like counting numbers.', show: 'tip' },
        { say: 'Three eighths plus two eighths is five eighths, and two eighths plus three eighths is five eighths as well.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{4}{9} + \\dfrac{3}{9}$.',
          choices: ['$\\dfrac{7}{18}$', '$\\dfrac{1}{9}$', '$\\dfrac{7}{9}$', '$\\dfrac{12}{9}$'],
          answer: 2,
          working: 'Both fractions count ninths. Add the numerators, $4 + 3 = 7$, and keep the denominator: $\\tfrac{7}{9}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four ninths plus three ninths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven ninths. Both fractions count ninths, so add the numerators: four plus three is seven. Keep the denominator. Choice A adds the denominators as well, but the pieces are still ninths.', show: 'q.answer' },
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
          items: ['A **common denominator** means the pieces are the same size.', 'Add or subtract the numerators. Keep the denominator.', 'Never add the denominators.', 'An improper answer can be written as a mixed number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fractions with a common denominator have pieces of the same size.', show: 'sum.0' },
        { say: 'To add or subtract them, add or subtract the numerators, and keep the denominator.', show: 'sum.1' },
        { say: 'Never add the denominators.', show: 'sum.2' },
        { say: 'And an answer that is an improper fraction can be written as a mixed number. In the next part, we add mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
