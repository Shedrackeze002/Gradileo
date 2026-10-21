import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { fitBar } from './lib/m8-4-figures.ts';

// Two fifths (the piece) above three quarters in twentieths: one piece of 8 twentieths fits, and 7 of the 8 twentieths of the next.
const fit = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'p', parts: 5, shaded: 2, tone: 'opp', at: [0, 2.6], width: 12, label: '\\dfrac25' }),
      fitBar({ total: 0.75, wholes: 1, piece: 0.4, den: 20, height: 1, tones: ['opp', 'opp'], rest: '\\tfrac78\\ \\text{of a piece}' }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-4-2-c',
  lessonId: 'm8-4-2',
  title: 'Dividing Fractions, Part 3: Multiplying by the Reciprocal',
  thumbnailTitle: 'Multiplying by the Reciprocal',
  thumbnail: 'ft',
  summary:
    'The reciprocal of a fraction is the fraction flipped upside down: the reciprocal of 2/5 is 5/2, and a number times its reciprocal is 1. Dividing by a fraction is the same as multiplying by its reciprocal, a/b ÷ c/d = a/b × d/c, just as 3 ÷ 1/4 = 3 × 4 = 12. So 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1 7/8, which a common denominator confirms (15/20 ÷ 8/20 = 15/8). Only the second fraction, the divisor, is flipped.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 3', title: 'Multiplying by the Reciprocal', subtitle: 'A quicker way to divide' }],
      lines: [
        { say: 'Finding a common denominator every time takes work. There is a quicker way to divide by a fraction.', show: 'title' },
        { say: 'In this part, you will learn what a reciprocal is, and divide by multiplying by the reciprocal.' },
      ],
    },
    {
      chapter: 'Reciprocals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reciprocal', md: 'The **reciprocal** of a fraction is the fraction flipped upside down. A number times its reciprocal is $1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{2}{5} \\;\\to\\; \\dfrac{5}{2}', '\\dfrac{2}{5} \\times \\dfrac{5}{2} = \\dfrac{10}{10} = 1', '4 = \\dfrac{4}{1} \\;\\to\\; \\dfrac{1}{4}'] },
      ],
      lines: [
        { say: 'The reciprocal of a fraction is the fraction flipped upside down. The numerator and the denominator swap places.', show: 'def' },
        { say: 'So the reciprocal of two fifths is five halves.', show: 'm.0', focus: 'm.0' },
        { say: 'A number times its reciprocal is one. Two fifths times five halves is ten tenths, which is one.', show: 'm.1', focus: 'm.1' },
        { say: 'A whole number is a fraction over one. Four is four over one, so the reciprocal of four is one quarter. And the reciprocal of one quarter is four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\div \\dfrac{1}{4} = 12 \\qquad 3 \\times 4 = 12', '6 \\div \\dfrac{3}{4} = 8 \\qquad 6 \\times \\dfrac{4}{3} = \\dfrac{24}{3} = 8'] },
      ],
      lines: [
        { say: 'Remember three divided by one quarter? Each whole holds four quarters, so the answer was three times four, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing by one quarter gave the same answer as multiplying by four, its reciprocal.' },
        { say: 'Remember six divided by three quarters? Eight servings. Now multiply six by the reciprocal of three quarters, which is four thirds. Six times four thirds is twenty-four thirds, which is eight. The same answer again!', show: 'm.1', focus: 'm.1' },
        { say: 'Here is why. Multiplying by four counts the quarters in six cups: twenty-four. Dividing by three puts those quarters into servings of three. So times four, divide by three, is the same as times four thirds.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Dividing fractions', md: 'Dividing by a fraction is the same as **multiplying by its reciprocal**.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}'] },
      ],
      lines: [
        { say: 'Here is the rule. Dividing by a fraction is the same as multiplying by its reciprocal.', show: 'key' },
        { say: 'Keep the first fraction. Change divide to multiply. And flip the second fraction. Then multiply as usual.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Using the reciprocal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{3}{4} \\div \\dfrac{2}{5}$. Write the answer as a mixed number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2}', '= \\dfrac{3 \\times 5}{4 \\times 2} = \\dfrac{15}{8}', '\\dfrac{15}{8} = 1\\dfrac{7}{8} \\qquad (15 \\div 8 = 1 \\text{ R } 7)'] },
      ],
      lines: [
        { say: 'Find three quarters divided by two fifths, and write the answer as a mixed number.', show: 'q' },
        { say: 'Keep three quarters, change divide to multiply, and flip two fifths. The reciprocal of two fifths is five halves.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply across. Three times five is fifteen, and four times two is eight. That is fifteen eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifteen divided by eight is one, remainder seven. So fifteen eighths is one and seven eighths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking the answer',
      layout: 'center',
      main: [
        fit('ft'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{15}{20} \\div \\dfrac{8}{20} = 15 \\div 8 = \\dfrac{15}{8}'] },
      ],
      lines: [
        { say: 'Check with a common denominator. In twentieths, three quarters is fifteen twentieths, and two fifths is eight twentieths.', show: ['ft.p-frame', 'ft.p-shade', 'ft.p-label', 'ft.frame'] },
        { say: 'Divide the numerators: fifteen divided by eight is fifteen eighths. It matches!', show: 'm.0', focus: 'm.0' },
        { say: 'The picture shows it as well. One whole piece of two fifths fits into three quarters.', show: 'ft.g0', focus: 'ft.g0' },
        { say: 'What is left is seven twentieths. A whole piece is eight twentieths, so seven eighths of another piece fits. That makes one and seven eighths.', show: 'ft.rest', focus: 'ft.rest' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flipping the wrong fraction', md: 'Only the **second** fraction (the divisor) is flipped. $\\dfrac{3}{4} \\div \\dfrac{2}{5}$ is **not** $\\dfrac{4}{3} \\times \\dfrac{2}{5}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{4}{3} \\times \\dfrac{2}{5} = \\dfrac{8}{15}}', '\\good{\\dfrac{3}{4} \\times \\dfrac{5}{2} = \\dfrac{15}{8}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. The number you divide by is called the divisor. Only the divisor, the second fraction, is flipped.', show: 'oops' },
        { say: 'If you flip the first fraction instead, you get four thirds times two fifths, which is eight fifteenths. That is less than one, but the picture showed that more than one piece fits!', show: 'm.0', focus: 'm.0' },
        { say: 'Keep the first fraction as it is, and flip the second one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{2}{3} \\div \\dfrac{4}{9}$. Write the answer as a mixed number.',
          choices: ['$\\dfrac{8}{27}$', '$\\dfrac{2}{3}$', '$1\\dfrac{1}{2}$', '$3$'],
          answer: 2,
          working: 'Multiply by the reciprocal of $\\tfrac{4}{9}$: $\\tfrac{2}{3} \\times \\tfrac{9}{4} = \\tfrac{18}{12} = \\tfrac{3}{2} = 1\\tfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find two thirds divided by four ninths, and write the answer as a mixed number. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one and one half. Multiply by the reciprocal of four ninths: two thirds times nine quarters is eighteen twelfths, which is three halves, or one and one half. Choice B, two thirds, flips the first fraction instead of the second.', show: 'q.answer' },
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
            'The **reciprocal** of a fraction is the fraction flipped: $\\dfrac{2}{5} \\to \\dfrac{5}{2}$. A number times its reciprocal is $1$.',
            'Dividing by a fraction is multiplying by its reciprocal: $\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2} = \\dfrac{15}{8}$.',
            'Flip only the **second** fraction, the divisor.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The reciprocal of a fraction is the fraction flipped upside down, and a number times its reciprocal is one.', show: 'sum.0' },
        { say: 'Dividing by a fraction is the same as multiplying by its reciprocal.', show: 'sum.1' },
        { say: 'And flip only the second fraction, the divisor. In the next part, you will divide mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
