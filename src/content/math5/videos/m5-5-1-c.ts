import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from './lib/m5-5-figures.ts';

// Three and two fifths: three full bars of fifths and two fifths of a fourth bar.
const threeAndTwoFifths = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 5, shaded: 5, at: [0, 4.5], width: 6.5, tone: 'brand' }),
    bar({ name: 'b', parts: 5, shaded: 5, at: [0, 3], width: 6.5, tone: 'brand' }),
    bar({ name: 'c', parts: 5, shaded: 5, at: [0, 1.5], width: 6.5, tone: 'brand' }),
    bar({ name: 'd', parts: 5, shaded: 2, at: [0, 0], width: 6.5, tone: 'opp' }),
  ], 420);

const video: Explainer = {
  id: 'm5-5-1-c',
  lessonId: 'm5-5-1',
  title: 'Improper Fractions and Mixed Numbers, Part 3: Writing an Improper Fraction',
  thumbnailTitle: 'Writing an Improper Fraction',
  thumbnail: 'bars',
  summary: 'Changing a mixed number to an improper fraction: multiply the wholes by the denominator, then add the extra pieces (3⅖ is 3 × 5 + 2 = 17 fifths), checking by dividing back, and the mistake of just adding the whole number to the numerator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 3', title: 'Writing an Improper Fraction', subtitle: 'From a mixed number: multiply, then add' }],
      lines: [
        { say: 'In part two, we changed improper fractions into mixed numbers by dividing. Sometimes you need to go the other way, from a mixed number back to an improper fraction.', show: 'title' },
        { say: 'In this video, you will change a mixed number into an improper fraction, and check it by going back.' },
      ],
    },
    {
      chapter: 'Three and two fifths',
      layout: 'split',
      leftWidth: 500,
      left: [threeAndTwoFifths('bars')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3\\dfrac25 = \\; ?', '3 \\times 5 = \\brand{15} \\text{ fifths}', '\\brand{15} + \\opp{2} = 17', '3\\dfrac25 = \\dfrac{17}{5}'] }],
      lines: [
        { say: 'Here is three and two fifths: three whole bars, and two fifths of a fourth bar. How many fifths is that altogether?', show: ['bars.a-frame', 'bars.b-frame', 'bars.c-frame', 'bars.d-frame', 'bars.a-shade', 'bars.b-shade', 'bars.c-shade', 'bars.d-shade', 'm.0'] },
        { say: 'You could count every piece, but there is a faster way. Each whole bar is cut into five fifths.', focus: ['bars.a-shade', 'bars.b-shade', 'bars.c-shade'] },
        { say: 'So three wholes are three groups of five fifths. Three times five is 15 fifths.', show: 'm.1', focus: ['bars.a-shade', 'bars.b-shade', 'bars.c-shade', 'm.1'] },
        { say: 'Now add the two extra fifths on the last bar. 15 plus two is 17.', show: 'm.2', focus: ['bars.d-shade', 'm.2'] },
        { say: 'So three and two fifths is seventeen fifths. The denominator stays five, because the pieces are still fifths.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Multiply, then add',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Mixed to improper', md: '**Multiply** the wholes by the denominator, then **add** the extra pieces. Keep the denominator.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3\\dfrac25 \\;\\to\\; 3 \\times 5 + 2 = 17 \\;\\to\\; \\dfrac{17}{5}'] },
      ],
      lines: [
        { say: 'Here is the rule. Multiply the whole number by the denominator. That tells you how many pieces are in the wholes.', show: 'key' },
        { say: 'Then add the extra pieces, the numerator. Write the total over the same denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'For three and two fifths: three times five, plus two, is 17. So it is seventeen fifths.' },
      ],
    },
    {
      chapter: 'Check by going back',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17 \\div 5 = 3 \\text{ R } 2', '\\dfrac{17}{5} = 3\\dfrac25 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'You can check your answer by going back, the way we did in part two. Divide: 17 divided by five is three, remainder two.', show: 'm.0', focus: 'm.0' },
        { say: 'Three wholes, and two fifths left over: three and two fifths. That is where we started, so the answer is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply, then add', md: 'Do not just add the whole number to the numerator. $3\\dfrac{2}{5}$ is not $\\dfrac{5}{5}$. Each whole is $5$ fifths, so multiply first: $3 \\times 5 + 2 = 17$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 + 2 = 5, \\text{ so } \\dfrac55?}', '\\good{3 \\times 5 + 2 = 17, \\text{ so } \\dfrac{17}{5}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people add the whole number to the numerator: three plus two is five, so they write five fifths.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But five fifths is just one whole, and we started with more than three wholes! That answer is far too small.' },
        { say: 'Each whole is five fifths, so multiply first: three times five is 15, plus two is 17. Seventeen fifths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another one',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Write $2\\dfrac{3}{8}$ as an improper fraction.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 8 = 16', '16 + 3 = 19', '2\\dfrac38 = \\dfrac{19}{8}', '\\text{Check: } 19 \\div 8 = 2 \\text{ R } 3 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Write two and three eighths as an improper fraction.', show: 't' },
        { say: 'Multiply the wholes by the denominator: two times eight is 16. Two wholes are 16 eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the three extra eighths: 16 plus three is 19.', show: 'm.1', focus: 'm.1' },
        { say: 'So two and three eighths is nineteen eighths.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: 19 divided by eight is two, remainder three. Two and three eighths. It checks out.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $4\\dfrac{2}{3}$ as an improper fraction.',
          choices: ['$\\dfrac{6}{3}$', '$\\dfrac{12}{3}$', '$\\dfrac{14}{3}$', '$\\dfrac{11}{3}$'],
          answer: 2,
          working: '$4 \\times 3 = 12$ thirds in the wholes, plus $2$ more: $12 + 2 = 14$. So $4\\tfrac{2}{3} = \\tfrac{14}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write four and two thirds as an improper fraction. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fourteen thirds. Four wholes are four times three, which is twelve thirds. Add the two extra thirds to get fourteen thirds. Choice A adds four and two, and forgets that each whole is three thirds.', show: 'q.answer' },
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
          items: ['Mixed to improper: multiply the wholes by the denominator, then add the extra pieces.', 'Keep the same denominator.', 'Check by dividing back to the mixed number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change a mixed number to an improper fraction, multiply the whole number by the denominator, then add the extra pieces.', show: 'sum.0' },
        { say: 'Keep the same denominator, because the pieces are still the same size.', show: 'sum.1' },
        { say: 'And check by dividing back to the mixed number. In the next part, we put fractions and mixed numbers on a number line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
