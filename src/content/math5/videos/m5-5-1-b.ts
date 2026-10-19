import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, pie } from './lib/m5-5-figures.ts';

// Eleven fourths as bars: two full bars of fourths and three fourths of a third bar.
const elevenFourths = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 4, shaded: 4, at: [0, 3], width: 6 }),
    bar({ name: 'b', parts: 4, shaded: 4, at: [0, 1.5], width: 6 }),
    bar({ name: 'c', parts: 4, shaded: 3, at: [0, 0], width: 6 }),
  ], 360);

const video: Explainer = {
  id: 'm5-5-1-b',
  lessonId: 'm5-5-1',
  title: 'Improper Fractions and Mixed Numbers, Part 2: Writing a Mixed Number',
  thumbnailTitle: 'Writing a Mixed Number',
  thumbnail: 'mx',
  summary: 'Mixed numbers like 1¾ (a whole number and a fraction), and changing an improper fraction to a mixed number by dividing: 11/4 is 11 ÷ 4 = 2 R 3, so 2¾. The quotient is the wholes and the remainder is the pieces left over, and the denominator stays the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 2', title: 'Writing a Mixed Number', subtitle: 'From an improper fraction, by dividing' }],
      lines: [
        { say: 'Seven fourths of a pizza is one whole pizza, and three more slices. There is another way to write that amount, which tells you the wholes straight away.', show: 'title' },
        { say: 'In this video, you will meet mixed numbers, and change an improper fraction into a mixed number.' },
      ],
    },
    {
      chapter: 'Mixed numbers',
      layout: 'split',
      leftWidth: 520,
      left: [figure('mx', [pie({ name: 'a', parts: 4, shaded: 4, at: [0, 0], label: '1' }), pie({ name: 'b', parts: 4, shaded: 3, at: [4, 0], label: '\\dfrac34' })], 320)],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac74 = 1\\dfrac34'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed number', md: 'A **mixed number** has a whole-number part and a fraction part, such as $1\\dfrac{3}{4}$. It means $1 + \\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Look at the two pizzas again. The first pizza is full. Three more fourths of the second pizza are shaded.', show: ['mx.a-rim', 'mx.a-shade', 'mx.b-rim', 'mx.b-shade'] },
        { say: 'So we can say one whole pizza, and three fourths. We write that as one and three fourths.', show: ['mx.a-label', 'mx.b-label', 'm.0'], focus: 'm.0' },
        { say: 'A number like this is called a mixed number, because it mixes a whole number and a fraction. One and three fourths means one plus three fourths.', show: 'def' },
        { say: 'Seven fourths and one and three fourths are the same amount, written in two ways.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Divide to find the wholes',
      layout: 'split',
      leftWidth: 480,
      left: [elevenFourths('el')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['11 \\div 4 = 2 \\text{ R } 3', '\\text{quotient } 2 \\;\\to\\; 2 \\text{ wholes}', '\\text{remainder } 3 \\;\\to\\; \\dfrac34', '\\dfrac{11}{4} = 2\\dfrac34'] }],
      lines: [
        { say: 'Now let’s write eleven fourths as a mixed number. Here are eleven fourths, shaded on bars that are each cut into fourths.', show: ['el.a-frame', 'el.b-frame', 'el.c-frame', 'el.a-shade', 'el.b-shade', 'el.c-shade'] },
        { say: 'Every four fourths make one whole. So the question is: how many groups of four fit into eleven? That is a division. Eleven divided by four is two, remainder three.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient, two, is the number of wholes. Two bars are full.', show: 'm.1', focus: ['m.1', 'el.a-shade', 'el.b-shade'] },
        { say: 'The remainder, three, is the number of fourths left over: three fourths.', show: 'm.2', focus: ['m.2', 'el.c-shade'] },
        { say: 'So eleven fourths equals two and three fourths.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep the denominator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the denominator', md: 'The pieces are still fourths, so the fraction part has denominator $4$. Do not use the quotient or the remainder as the denominator.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{11}{4} \\ne \\bad{2\\dfrac32} \\qquad \\dfrac{11}{4} \\ne \\bad{3\\dfrac24}', '\\dfrac{11}{4} = \\good{2\\dfrac34}'] },
      ],
      lines: [
        { say: 'Watch out. After you divide, you have several numbers to keep track of, and it is easy to put one in the wrong place.', show: 'oops' },
        { say: 'Eleven fourths is not two and three halves, which uses the quotient as the denominator. And it is not three and two fourths, which swaps the quotient and the remainder.', show: 'm.0', focus: 'm.0' },
        { say: 'The pieces are still fourths, so the denominator stays four. The quotient gives the wholes, and the remainder gives the fourths left over: two and three fourths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another one',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Write $\\dfrac{13}{3}$ as a mixed number.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['13 \\div 3 = 4 \\text{ R } 1', '\\dfrac{13}{3} = 4\\dfrac13', '\\text{Check: } 4 \\text{ wholes} = \\dfrac{12}{3}, \\text{ and } \\dfrac{12}{3} + \\dfrac13 = \\dfrac{13}{3}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Write thirteen thirds as a mixed number.', show: 't' },
        { say: 'Three thirds make one whole, so divide by three. Thirteen divided by three is four, remainder one.', show: 'm.0', focus: 'm.0' },
        { say: 'Four wholes, and one third left over. So thirteen thirds is four and one third.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: four wholes are twelve thirds, and one more third makes thirteen thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{19}{6}$ as a mixed number.',
          choices: ['$3\\dfrac{1}{3}$', '$1\\dfrac{3}{6}$', '$6\\dfrac{1}{3}$', '$3\\dfrac{1}{6}$'],
          answer: 3,
          working: '$19 \\div 6 = 3$ R $1$: $3$ wholes and $1$ sixth left over, so $\\tfrac{19}{6} = 3\\tfrac{1}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write nineteen sixths as a mixed number. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three and one sixth. Nineteen divided by six is three, remainder one. That is three wholes, and one sixth left over. Choice A uses the quotient as the denominator, but the pieces are still sixths.', show: 'q.answer' },
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
          items: ['A **mixed number**, like $1\\dfrac{3}{4}$, has a whole-number part and a fraction part.', 'Improper to mixed: divide the numerator by the denominator.', 'The quotient is the wholes; the remainder is the pieces left over.', 'Keep the same denominator.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A mixed number, like one and three fourths, has a whole-number part and a fraction part.', show: 'sum.0' },
        { say: 'To change an improper fraction to a mixed number, divide the numerator by the denominator.', show: 'sum.1' },
        { say: 'The quotient is the number of wholes, and the remainder is the number of pieces left over.', show: 'sum.2' },
        { say: 'And keep the same denominator. In the next part, we go the other way, from a mixed number back to an improper fraction. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
