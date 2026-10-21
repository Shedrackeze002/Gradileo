import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { frame, fractionSquare } from './lib/m8-4-figures.ts';

// 2/3 × 3/4 again: the overlap is 2 rows by 3 columns of a 3 by 4 grid.
const twoThirds = (id: string) => figure(id, [fractionSquare({ cols: 4, rows: 3, colShade: 3, rowShade: 2, colLabel: '\\dfrac34', rowLabel: '\\dfrac23' })], 440);

// The brownie pan: 3/4 full (blue columns), and Owen eats 1/2 of that (the orange row); he eats 3 of 8 pieces.
const pan = (id: string) => figure(id, [fractionSquare({ cols: 4, rows: 2, colShade: 3, rowShade: 1, w: 8, h: 5, colLabel: '\\dfrac34 \\text{ left}', rowLabel: '\\dfrac12', numbers: true })], 380);

const video: Explainer = {
  id: 'm8-4-1-c',
  lessonId: 'm8-4-1',
  title: 'Multiplying Fractions, Part 3: Multiplying Across',
  thumbnailTitle: 'Multiplying Across',
  thumbnail: 'pn',
  summary:
    'The area model shows a shortcut: the overlap has numerator × numerator small rectangles out of denominator × denominator, so a/b × c/d = (a × c)/(b × d). A pan of brownies is 3/4 full and Owen eats 1/2 of what is left: 1/2 × 3/4 = (1 × 3)/(2 × 4) = 3/8 of the pan. Simplify the product if you can: 3/4 × 2/5 = 6/20 = 3/10. You do not need a common denominator to multiply.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 3', title: 'Multiplying Across', subtitle: 'Tops times tops, bottoms times bottoms' }],
      lines: [
        { say: 'Drawing an area model every time would take a long time. Luckily, the area model shows a shortcut.', show: 'title' },
        { say: 'In this part, you will multiply fractions by multiplying the numerators and multiplying the denominators. Then you will answer the brownie question.' },
      ],
    },
    {
      chapter: 'The shortcut',
      layout: 'split',
      leftWidth: 540,
      left: [twoThirds('sq')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Overlap: } \\good{2 \\times 3} = 6', '\\text{Whole: } 3 \\times 4 = 12', '\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{\\good{2 \\times 3}}{3 \\times 4} = \\dfrac{6}{12}'] },
      ],
      lines: [
        { say: 'Look again at two thirds times three quarters. The overlap is two rows by three columns. Two times three is six small rectangles. Those are the numerators, multiplied.', show: [...frame('sq'), 'sq.cols', 'sq.rows', 'sq.both', 'm.0'], focus: ['sq.both', 'm.0'] },
        { say: 'The whole square is three rows by four columns. Three times four is twelve small rectangles. Those are the denominators, multiplied.', show: 'm.1', focus: 'm.1' },
        { say: 'So the product is the numerators multiplied, over the denominators multiplied: six twelfths. No drawing needed!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Multiplying fractions', md: 'Multiply the numerators, and multiply the denominators.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}'] },
      ],
      lines: [
        { say: 'Here is the rule. To multiply two fractions, multiply the numerators, and multiply the denominators.', show: 'key' },
        { say: 'In letters, it looks like this. The letters stand for any whole numbers, as long as the denominators are not zero. Top times top, over bottom times bottom.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Owen’s brownies',
      layout: 'split',
      leftWidth: 600,
      left: [pan('pn')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A pan of brownies is $\\dfrac{3}{4}$ full. Owen eats $\\dfrac{1}{2}$ of what is left. What fraction of the whole pan does Owen eat?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{1}{2} \\times \\dfrac{3}{4} = \\dfrac{1 \\times 3}{2 \\times 4} = \\dfrac{3}{8}'] },
      ],
      lines: [
        { say: 'Now the brownie question. A pan of brownies is three quarters full. Owen eats one half of what is left. What fraction of the whole pan does Owen eat?', show: 'q' },
        { say: 'Here is the pan, cut into four equal columns. Three quarters of it still has brownies: the blue part.', show: ['pn.outline', 'pn.vcuts', 'pn.cols'], focus: 'pn.cols' },
        { say: 'Owen eats one half of that. Cut the pan into two rows, and shade one row orange: one half.', show: ['pn.hcuts', 'pn.rows'], focus: 'pn.rows' },
        { say: 'The part Owen eats is the overlap: one half of three quarters.', show: 'pn.both', focus: 'pn.both' },
        { say: 'Multiply across. One times three is three, and two times four is eight. So one half times three quarters is three eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'The picture agrees. The pan is cut into eight equal pieces, and the overlap is three of them. Owen eats three eighths of the whole pan.', show: 'pn.nums', focus: 'pn.nums' },
      ],
    },
    {
      chapter: 'Multiply, then simplify',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{3}{4} \\times \\dfrac{2}{5}$. Write the answer in lowest terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{3 \\times 2}{4 \\times 5} = \\dfrac{6}{20}', '\\dfrac{6}{20} = \\dfrac{6 \\div 2}{20 \\div 2} = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'Sometimes the product is not in lowest terms. Find three quarters times two fifths, and write the answer in lowest terms.', show: 'q' },
        { say: 'Multiply across. Three times two is six, and four times five is twenty. The product is six twentieths.', show: 'm.0', focus: 'm.0' },
        { say: 'Two divides both six and twenty. Six divided by two is three, and twenty divided by two is ten. So the answer is three tenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a common denominator', md: 'You do **not** need a common denominator to multiply. That is for adding and subtracting. Multiply straight across.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{2}{4} \\times \\dfrac{3}{4} = \\dfrac{6}{4}}', '\\good{\\dfrac{1}{2} \\times \\dfrac{3}{4} = \\dfrac{3}{8}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. When you add or subtract fractions, you need a common denominator. Some people find one when they multiply as well.', show: 'oops' },
        { say: 'They write one half as two quarters, multiply the numerators, and keep the quarters: six quarters. But six quarters is more than one whole pan of brownies! That cannot be right.', show: 'm.0', focus: 'm.0' },
        { say: 'You do not need a common denominator to multiply. Multiply straight across: one half times three quarters is three eighths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{2}{3} \\times \\dfrac{4}{5}$.',
          choices: ['$\\dfrac{8}{15}$', '$\\dfrac{6}{8}$', '$\\dfrac{8}{5}$', '$\\dfrac{10}{12}$'],
          answer: 0,
          working: 'Multiply the numerators and the denominators: $\\tfrac{2 \\times 4}{3 \\times 5} = \\tfrac{8}{15}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find two thirds times four fifths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight fifteenths. Two times four is eight, and three times five is fifteen. Choice D, ten twelfths, multiplies across the diagonals. Multiply top times top, and bottom times bottom.', show: 'q.answer' },
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
            'Multiply the numerators, and multiply the denominators: $\\dfrac{1}{2} \\times \\dfrac{3}{4} = \\dfrac{3}{8}$.',
            'Write the product in lowest terms: $\\dfrac{6}{20} = \\dfrac{3}{10}$.',
            'You do **not** need a common denominator to multiply.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply fractions, multiply the numerators, and multiply the denominators.', show: 'sum.0' },
        { say: 'Then write the product in lowest terms.', show: 'sum.1' },
        { say: 'And you do not need a common denominator. In the next part, you will simplify before you multiply, to keep the numbers small. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
