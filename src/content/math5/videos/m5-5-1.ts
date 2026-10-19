import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine, pie, unitHops } from './lib/m5-5-figures.ts';

// Liam's family's two pizzas, each cut into fourths: 4 fourths, then 3 more.
const pizzas = (id: string) => figure(id, [pie({ name: 'a', parts: 4, shaded: 4, at: [0, 0] }), pie({ name: 'b', parts: 4, shaded: 3, at: [4, 0] })], 300);

const video: Explainer = {
  id: 'm5-5-1',
  lessonId: 'm5-5-1',
  title: 'Improper Fractions and Mixed Numbers, Part 1: Fractions Greater Than One',
  thumbnailTitle: 'Fractions Greater Than One',
  thumbnail: 'pz',
  summary: 'The numerator and denominator, counting pizza slices by fourths past one whole (seven fourths), improper fractions, writing whole numbers as fractions (3 = 3/1, 2 = 8/4), and counting by thirds on a number line.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 1', title: 'Fractions Greater Than One', subtitle: 'Counting past one whole' }],
      lines: [
        { say: 'Liam’s family orders two pizzas. Each pizza is cut into four equal slices. They eat seven slices. That is more than one whole pizza!', show: 'title' },
        { say: 'How can we write an amount like that as a fraction? In this video, you will write amounts greater than one with fractions.' },
      ],
    },
    {
      chapter: 'Parts of a fraction',
      layout: 'center',
      main: [
        figure('p', [pie({ parts: 4, shaded: 3, label: '\\dfrac{3}{4}', labelPlace: 'right' })], 300),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Numerator and denominator', md: 'In $\\dfrac{3}{4}$, the **denominator** (bottom) is how many equal pieces make one whole. The **numerator** (top) is how many pieces we have.' },
      ],
      lines: [
        { say: 'First, a reminder. A fraction names equal parts of a whole. This pizza is cut into four equal slices, so each slice is one fourth of the pizza. Some people call fourths quarters.', show: 'p.rim' },
        { say: 'Three slices are shaded. That is three fourths of the pizza.', show: ['p.shade', 'p.label'] },
        { say: 'The bottom number of a fraction is the denominator. It tells how many equal pieces make one whole: here, four.', show: 'def' },
        { say: 'The top number is the numerator. It tells how many of those pieces we have: here, three.' },
      ],
    },
    {
      chapter: 'Counting by fourths',
      layout: 'center',
      main: [pizzas('pz'), { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac14,\\ \\dfrac24,\\ \\dfrac34,\\ \\dfrac44 = 1', '\\dfrac54,\\ \\dfrac64,\\ \\dfrac74'] }],
      lines: [
        { say: 'Now back to Liam’s family. They have two pizzas, each cut into four equal slices. Let’s count the slices they eat, in fourths.', show: ['pz.a-rim', 'pz.b-rim'] },
        { say: 'One fourth.', show: 'pz.a-s0' },
        { say: 'Two fourths.', show: 'pz.a-s1' },
        { say: 'Three fourths.', show: 'pz.a-s2' },
        { say: 'Four fourths.', show: 'pz.a-s3' },
        { say: 'Four fourths make one whole pizza. So four fourths equals one.', show: 'm.0', focus: ['m.0', 'pz.a-shade'] },
        { say: 'Keep counting, on the second pizza. Five fourths.', show: 'pz.b-s0', focus: 'pz.b-s0' },
        { say: 'Six fourths.', show: 'pz.b-s1', focus: 'pz.b-s1' },
        { say: 'Seven fourths.', show: ['pz.b-s2', 'm.1'], focus: ['pz.b-s2', 'm.1'] },
        { say: 'So the family eats seven fourths of a pizza. That is more than one whole: one whole pizza, and three slices more.', focus: ['pz.a-shade', 'pz.b-shade'] },
      ],
    },
    {
      chapter: 'Improper fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Improper fraction', md: 'An **improper fraction** has a numerator (top) that is greater than its denominator (bottom), such as $\\dfrac{7}{4}$ or $\\dfrac{5}{3}$. It is more than $1$ whole.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{4} > 1 \\qquad \\dfrac{5}{3} > 1'] },
      ],
      lines: [
        { say: 'Look at seven fourths. The numerator, seven, is greater than the denominator, four. A fraction like this is called an improper fraction.', show: 'def' },
        { say: 'An improper fraction is more than one whole. Improper does not mean wrong! It just tells you there is more than one whole.', show: 'm.0', focus: 'm.0' },
        { say: 'Five thirds is an improper fraction as well. Three thirds make one whole, and five thirds is two thirds more than that.' },
      ],
    },
    {
      chapter: 'Whole numbers as fractions',
      layout: 'center',
      main: [
        figure('w', [
          bar({ name: 'o0', parts: 1, shaded: 1, at: [0, 1.8], width: 3, tone: 'good' }),
          bar({ name: 'o1', parts: 1, shaded: 1, at: [3.5, 1.8], width: 3, tone: 'good' }),
          bar({ name: 'o2', parts: 1, shaded: 1, at: [7, 1.8], width: 3, tone: 'good', label: '3 = \\dfrac{3}{1}' }),
          bar({ name: 'f0', parts: 4, shaded: 4, at: [0, 0], width: 3, tone: 'adj' }),
          bar({ name: 'f1', parts: 4, shaded: 4, at: [3.5, 0], width: 3, tone: 'adj', label: '2 = \\dfrac{8}{4}' }),
        ], 300),
      ],
      lines: [
        { say: 'A counting number can be written as a fraction as well.', show: ['w.o0-frame', 'w.o1-frame', 'w.o2-frame'] },
        { say: 'Suppose each whole is just one piece. Then three wholes are three pieces. So three equals three over one.', show: ['w.o0-shade', 'w.o1-shade', 'w.o2-shade', 'w.o2-label'], focus: 'w.o2-label' },
        { say: 'Now suppose each whole is cut into four fourths. Then two wholes are four fourths, and four more fourths: eight fourths. So two equals eight fourths.', show: ['w.f0-frame', 'w.f1-frame', 'w.f0-shade', 'w.f1-shade', 'w.f1-label'], focus: 'w.f1-label' },
      ],
    },
    {
      chapter: 'Counting by thirds',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Count by thirds from $\\dfrac{1}{3}$. What comes after $\\dfrac{5}{3}$?' },
        figure('nl', [fractionLine({ min: 0, max: 2, den: 3, length: 12, fractions: true, hops: unitHops(0, 6, 'h') })], 260),
      ],
      lines: [
        { say: 'Here is a number line from zero to two. Each whole is cut into three equal spaces, so each space is one third. Count by thirds, starting at one third. What comes after five thirds?', show: ['t', 'nl.axis'] },
        { say: 'Each step adds one more third, so the numerator goes up by one each time. One third. Two thirds. Three thirds.', show: ['nl.h0', 'nl.f1', 'nl.h1', 'nl.f2', 'nl.h2', 'nl.f3'] },
        { say: 'Three thirds is one whole. Keep going: four thirds, five thirds.', show: ['nl.h3', 'nl.f4', 'nl.h4', 'nl.f5'], focus: 'nl.f3' },
        { say: 'One more third makes six thirds. So six thirds comes next, and six thirds is two wholes.', show: ['nl.h5', 'nl.f6'], focus: 'nl.f6' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which fraction is equal to $3$ wholes?',
          choices: ['$\\dfrac{3}{4}$', '$\\dfrac{12}{4}$', '$\\dfrac{4}{3}$', '$\\dfrac{7}{4}$'],
          answer: 1,
          working: 'Each whole is $\\tfrac{4}{4}$, so $3$ wholes are $3 \\times 4 = 12$ fourths: $\\tfrac{12}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which fraction is equal to three wholes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twelve fourths. Each whole is four fourths, so three wholes are three times four, which is twelve fourths. Choice A is three fourths, which is less than one whole.', show: 'q.answer' },
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
          items: ['The **denominator** is how many pieces make a whole; the **numerator** is how many pieces we have.', 'An **improper fraction**, like $\\dfrac{7}{4}$, has a numerator greater than its denominator. It is more than $1$.', 'A counting number can be a fraction: $3 = \\dfrac{3}{1}$ and $2 = \\dfrac{8}{4}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The denominator is how many equal pieces make one whole, and the numerator is how many pieces we have.', show: 'sum.0' },
        { say: 'An improper fraction, like seven fourths, has a numerator greater than its denominator. It is more than one whole.', show: 'sum.1' },
        { say: 'And a counting number can be written as a fraction: three is three over one, and two is eight fourths. In the next part, we write improper fractions as mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
