import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Two eighths (purple) and three more eighths (orange) on one bar of eighths.
const eighths = (id: string) => figure(id, [bar({ name: 'b', parts: 8, shaded: 5, tones: ['hyp', 'hyp', 'opp', 'opp', 'opp'], width: 10 })], 170);

// A quarter and five twelfths: pieces of different sizes.
const different = (id: string) =>
  figure(id, [
    bar({ name: 'q', parts: 4, shaded: 1, tone: 'adj', at: [0, 2.2], width: 10, label: '\\dfrac14' }),
    bar({ name: 't', parts: 12, shaded: 5, tone: 'opp', at: [0, 0], width: 10, label: '\\dfrac{5}{12}' }),
  ], 250);

// One quarter covers the same part of the bar as three twelfths.
const quarter = (id: string) =>
  figure(id, [
    bar({ name: 'q', parts: 4, shaded: 1, tone: 'adj', at: [0, 2.2], width: 10, label: '\\dfrac14' }),
    bar({ name: 't', parts: 12, shaded: 3, tone: 'adj', at: [0, 0], width: 10, label: '\\dfrac{3}{12}' }),
  ], 250);

// Two thirds covers the same part of the bar as eight twelfths.
const thirds = (id: string) =>
  figure(id, [
    bar({ name: 'h', parts: 3, shaded: 2, tone: 'good', at: [0, 2.2], width: 10, label: '\\dfrac23' }),
    bar({ name: 't', parts: 12, shaded: 8, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac{8}{12}' }),
  ], 250);

const video: Explainer = {
  id: 'm6-4-2',
  lessonId: 'm6-4-2',
  title: 'Adding and Subtracting Fractions, Part 1: Common Denominators',
  thumbnailTitle: 'Common Denominators',
  thumbnail: 'qt',
  summary:
    'Fractions with the same denominator have same-size pieces, so 2/8 + 3/8 = 5/8 and 7/10 − 4/10 = 3/10. A quarter and five twelfths have different-size pieces, so first make equivalent fractions with a common denominator by multiplying the numerator and denominator by the same number: 1/4 = 3/12 and 2/3 = 8/12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 1', title: 'Common Denominators', subtitle: 'Make the pieces the same size' }],
      lines: [
        { say: 'You can add two apples and three apples: that makes five apples. But how do you add one quarter of a pizza and five twelfths of a pizza? The pieces are different sizes!', show: 'title' },
        { say: 'In this part, you will see why fractions need pieces of the same size before you add them, and how to make them the same size.' },
      ],
    },
    {
      chapter: 'Same-size pieces',
      layout: 'center',
      main: [
        eighths('ei'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{8} + \\dfrac{3}{8} = \\dfrac{5}{8}', '\\dfrac{7}{10} - \\dfrac{4}{10} = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'Let’s start with two eighths plus three eighths. Here is a bar cut into eight equal pieces. Each piece is one eighth.', show: 'ei.b-frame' },
        { say: 'Shade two eighths.', show: ['ei.b-p0', 'ei.b-p1'], focus: ['ei.b-p0', 'ei.b-p1'] },
        { say: 'Now shade three more eighths.', show: ['ei.b-p2', 'ei.b-p3', 'ei.b-p4'], focus: ['ei.b-p2', 'ei.b-p3', 'ei.b-p4'] },
        { say: 'Count the shaded pieces: five eighths. The pieces are all the same size, so we just count them. Add the numerators, and keep the denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominator tells the size of the pieces. The numerator counts how many pieces there are. Subtracting works the same way: seven tenths take away four tenths leaves three tenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Common denominator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common denominator', md: 'Two fractions have a **common denominator** when their denominators are the same number. For example, $\\dfrac{3}{12}$ and $\\dfrac{5}{12}$ have the common denominator $12$.' },
      ],
      lines: [
        { say: 'Two eighths and three eighths have the same denominator. We say they have a common denominator. Common means shared.', show: 'def' },
        { say: 'Three twelfths and five twelfths have the common denominator twelve. Their pieces are the same size, so they are easy to add.' },
      ],
    },
    {
      chapter: 'Different-size pieces',
      layout: 'center',
      main: [different('df')],
      lines: [
        { say: 'Now look at one quarter and five twelfths. The top bar is cut into quarters, and the bottom bar is cut into twelfths.', show: ['df.q-frame', 'df.q-shade', 'df.q-label', 'df.t-frame', 'df.t-shade', 'df.t-label'] },
        { say: 'A quarter is much bigger than a twelfth. So one piece plus five pieces is not six of anything! We cannot just count the pieces.', focus: ['df.q-shade', 'df.t-shade'] },
        { say: 'First, we need to cut the pieces so that they are all the same size.' },
      ],
    },
    {
      chapter: 'Equivalent fractions',
      layout: 'center',
      main: [
        quarter('qt'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}'] },
      ],
      lines: [
        { say: 'Equivalent fractions name the same amount in different ways. Here is one quarter on the top bar.', show: ['qt.q-frame', 'qt.q-shade', 'qt.q-label'] },
        { say: 'Cut each quarter into three equal pieces. Now the bar has twelve pieces, and the shaded part is three of them. So one quarter equals three twelfths.', show: ['qt.t-frame', 'qt.t-shade', 'qt.t-label'], focus: ['qt.q-shade', 'qt.t-shade'] },
        { say: 'To make an equivalent fraction, multiply the numerator and the denominator by the same number. One times three is three, and four times three is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominator got three times bigger, because each piece was cut into three. The numerator got three times bigger, because there are three times as many pieces.' },
      ],
    },
    {
      chapter: 'Two thirds in twelfths',
      layout: 'center',
      main: [
        thirds('th'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Write two thirds in twelfths.', show: ['th.h-frame', 'th.h-shade', 'th.h-label'] },
        { say: 'Three times four is twelve, so cut each third into four equal pieces.', show: ['th.t-frame'] },
        { say: 'The shaded part is now eight twelfths. Multiply the numerator by four as well: two times four is eight. So two thirds equals eight twelfths.', show: ['th.t-shade', 'th.t-label', 'm.0'], focus: ['th.t-shade', 'm.0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change both numbers', md: '$\\dfrac{1}{4}$ is **not** $\\dfrac{1}{12}$. Smaller pieces need more of them: multiply the numerator **and** the denominator by the same number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{4} \\ne \\bad{\\dfrac{1}{12}}', '\\dfrac{1}{4} = \\good{\\dfrac{3}{12}} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. One quarter is not one twelfth. If you change only the denominator, the pieces get smaller, but you still have just one of them.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'When you cut each piece into three, you get three times as many pieces. So multiply the numerator and the denominator by the same number. One quarter is three twelfths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which fraction is equal to $\\dfrac{3}{4}$ and has a denominator of $20$?',
          choices: ['$\\dfrac{3}{20}$', '$\\dfrac{12}{20}$', '$\\dfrac{7}{20}$', '$\\dfrac{15}{20}$'],
          answer: 3,
          working: '$4 \\times 5 = 20$, so multiply the numerator by $5$ as well: $\\tfrac{3}{4} = \\tfrac{3 \\times 5}{4 \\times 5} = \\tfrac{15}{20}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which fraction is equal to three quarters and has a denominator of twenty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fifteen twentieths. Four times five is twenty, so multiply the numerator by five as well: three times five is fifteen. Choice A changes only the denominator, so the pieces get smaller but there are no more of them.', show: 'q.answer' },
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
            'Fractions with a **common denominator** have same-size pieces: add or subtract the numerators.',
            'The denominator tells the size of the pieces; the numerator counts them.',
            'Make equivalent fractions by multiplying the numerator and the denominator by the same number: $\\dfrac14 = \\dfrac{3}{12}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fractions with a common denominator have pieces of the same size, so you add or subtract the numerators.', show: 'sum.0' },
        { say: 'The denominator tells the size of the pieces, and the numerator counts them.', show: 'sum.1' },
        { say: 'To get a common denominator, make equivalent fractions: multiply the numerator and the denominator by the same number. In the next part, you will add fractions like one quarter and five twelfths. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
