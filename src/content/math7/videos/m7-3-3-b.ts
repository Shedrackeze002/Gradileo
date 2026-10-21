import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fractionLine } from '@/content/math5/videos/lib/m5-5-figures.ts';

// The trail, in quarters of a kilometre: 2 3/4 km hiked, and the rest of the way to 6 1/2 km.
const trail = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 0,
        max: 7,
        den: 4,
        length: 13,
        hops: [
          { id: 'done', from: 0, to: 11, tone: 'adj', label: '\\text{hiked}' },
          { id: 'left', from: 11, to: 26, tone: 'good', label: '?' },
        ],
        points: [
          { id: 'here', at: 11, tex: '2\\tfrac34', tone: 'adj', below: true },
          { id: 'end', at: 26, tex: '6\\tfrac12', tone: 'theta', below: true },
        ],
      }),
    ],
    240,
  );

const video: Explainer = {
  id: 'm7-3-3-b',
  lessonId: 'm7-3-3',
  title: 'Solving Fraction Problems, Part 2: Problems with Mixed Numbers',
  thumbnailTitle: 'Problems with Mixed Numbers',
  thumbnail: 'tr',
  summary:
    'The plan works with mixed numbers too. A 6 1/2 km trail with 2 3/4 km hiked leaves 6 2/4 − 2 3/4 = 5 6/4 − 2 3/4 = 3 3/4 km, a little more than the estimate of 3 1/2 km. Piano practice of 1 1/3 h and 1 3/4 h makes 1 4/12 + 1 9/12 = 2 13/12 = 3 1/12 h, close to the estimate of 3 h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 2', title: 'Problems with Mixed Numbers', subtitle: 'Read, decide, estimate, calculate, check' }],
      lines: [
        { say: 'A family is hiking a trail. A student practises the piano on Saturday and Sunday. Both problems use mixed numbers.', show: 'title' },
        { say: 'In this part, you will use the plan from the last part to solve problems with mixed numbers: read, decide, estimate, calculate and check.' },
      ],
    },
    {
      chapter: 'On the trail',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A hiking trail is $6\\dfrac{1}{2}$ km long. Rosa’s family has hiked $2\\dfrac{3}{4}$ km. How far is it to the end?' },
        trail('tr'),
      ],
      lines: [
        { say: 'A hiking trail is six and one half kilometres long. Rosa’s family has hiked two and three quarters kilometres. How far is it to the end?', show: 'q' },
        { say: 'Read and decide. How far is it to the end asks what is left, so subtract: six and one half minus two and three quarters.', show: ['tr.axis', 'tr.done', 'tr.here', 'tr.end'] },
        { say: 'The question mark is the part of the trail still to go.', show: 'tr.left', focus: 'tr.left' },
        { say: 'Estimate. Two and three quarters is close to three. Six and one half minus three is three and one half. We took away a bit too much, so the answer is a little more than three and one half.' },
      ],
    },
    {
      chapter: 'Calculate and check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6\\dfrac{1}{2} = 6\\dfrac{2}{4} = 5\\dfrac{6}{4}', '5\\dfrac{6}{4} - 2\\dfrac{3}{4} = 3\\dfrac{3}{4}', '\\text{Check: } 2\\dfrac{3}{4} + 3\\dfrac{3}{4} = 5\\dfrac{6}{4} = 6\\dfrac{2}{4} = 6\\dfrac{1}{2} \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Calculate. Four is a multiple of two, so use quarters. One half is two quarters, so six and one half is six and two quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Two quarters is less than three quarters, so regroup. One whole is four quarters, so six and two quarters becomes five and six quarters.' },
        { say: 'Now subtract. Five minus two is three. Six quarters minus three quarters is three quarters. So it is three and three quarters kilometres to the end.', show: 'm.1', focus: 'm.1' },
        { say: 'Check. Three and three quarters is a little more than three and one half, just as we estimated. And adding back gives the whole trail: two and three quarters plus three and three quarters is six and one half.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Practice time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Arjun practises piano for $1\\dfrac{1}{3}$ h on Saturday and $1\\dfrac{3}{4}$ h on Sunday. How long does Arjun practise in all?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '1\\dfrac{1}{3} + 1\\dfrac{3}{4} = 1\\dfrac{4}{12} + 1\\dfrac{9}{12}',
            '\\text{Wholes: } 1 + 1 = 2 \\qquad \\text{Fractions: } \\dfrac{4}{12} + \\dfrac{9}{12} = \\dfrac{13}{12} = 1\\dfrac{1}{12}',
            '2 + 1\\dfrac{1}{12} = 3\\dfrac{1}{12}',
          ],
        },
      ],
      lines: [
        { say: 'Next, Arjun practises piano for one and one third hours on Saturday, and one and three quarters hours on Sunday. How long does Arjun practise in all?', show: 'q' },
        { say: 'Read and decide. In all means a total, so add.' },
        { say: 'Estimate. One and one third is a bit less than one and one half. One and three quarters is a bit more. So the total is about three hours.' },
        { say: 'Calculate. Multiples of three and four meet at twelve. One third is four twelfths, and three quarters is nine twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'The wholes make two. The fractions make thirteen twelfths, which is one and one twelfth.', show: 'm.1', focus: 'm.1' },
        { say: 'Carry the whole. Two plus one and one twelfth is three and one twelfth. That is very close to our estimate of three hours. So Arjun practises for three and one twelfth hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ribbon is $4\\dfrac{1}{2}$ m long. Lee cuts off $1\\dfrac{2}{3}$ m. How much ribbon is left?',
          choices: ['$3\\dfrac{1}{6}$ m', '$6\\dfrac{1}{6}$ m', '$2\\dfrac{1}{6}$ m', '$2\\dfrac{5}{6}$ m'],
          answer: 3,
          working: 'Subtract: $4\\dfrac{1}{2} - 1\\dfrac{2}{3} = 4\\dfrac{3}{6} - 1\\dfrac{4}{6} = 3\\dfrac{9}{6} - 1\\dfrac{4}{6} = 2\\dfrac{5}{6}$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A ribbon is four and one half metres long. Lee cuts off one and two thirds metres. How much ribbon is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two and five sixths metres. In sixths, it is four and three sixths minus one and four sixths. Regroup to three and nine sixths, and subtract: two and five sixths. Choice A takes three sixths from four sixths, which is backwards.', show: 'q.answer' },
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
            'Decide: what is left means subtract; in all means add.',
            'Estimate by rounding each mixed number to a friendly number.',
            'Use a common denominator, and regroup or carry a whole.',
            'Check: compare with your estimate, or add back.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Decide what the question asks. What is left means subtract, and in all means add.', show: 'sum.0' },
        { say: 'Estimate by rounding each mixed number to a friendly number.', show: 'sum.1' },
        { say: 'Use a common denominator, and regroup or carry a whole when you need to.', show: 'sum.2' },
        { say: 'Then check your answer against your estimate, or by adding back. In the next part, you will solve problems with two steps. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
