import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// −2 1/4 is a quarter past −2 to the left (−2.25), not to the right (−1.75).
const where = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -3,
        max: 0,
        step: 0.25,
        points: [
          { id: 'right', value: -2.25, tex: '-2\\tfrac{1}{4} = -2.25', tone: 'good', below: true },
          { id: 'wrong', value: -1.75, tex: '-1.75', tone: 'bad' },
        ],
      }),
    ],
    260,
  );

// −2 1/4 + 1 2/3: from −2 1/4, right 1 2/3, to −7/12.
const check = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -3,
        max: 1,
        step: 1 / 12,
        moves: [{ id: 'm', from: -2.25, to: -7 / 12, tone: 'adj', label: '+1\\tfrac{2}{3}' }],
        points: [
          { id: 'start', value: -2.25, tex: '-2\\tfrac{1}{4}', tone: 'opp', below: true },
          { id: 'end', value: -7 / 12, tex: '-\\tfrac{7}{12}', tone: 'good', below: true },
        ],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm9-3-2-d',
  lessonId: 'm9-3-2',
  title: 'Adding and Subtracting Rational Numbers, Part 4: Adding Mixed Numbers',
  thumbnailTitle: 'Adding Mixed Numbers',
  thumbnail: 'ck',
  summary:
    'Write mixed numbers as improper fractions first; this keeps the signs simple. The negative sign covers the whole mixed number: −2 1/4 = −9/4 = −2.25, not −2 + 1/4. Then −2 1/4 + 1 2/3 = −9/4 + 5/3 = −27/12 + 20/12 = −7/12. A number line checks it: from −2 1/4, a move of 1 2/3 to the right lands just left of zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 4', title: 'Adding Mixed Numbers', subtitle: 'Improper fractions keep the signs simple' }],
      lines: [
        { say: 'What is negative two and one quarter plus one and two thirds? Mixed numbers with different signs need extra care.', show: 'title' },
        { say: 'In this part, you will add mixed numbers by writing them as improper fractions first.' },
      ],
    },
    {
      chapter: 'Improper fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed numbers and improper fractions', md: 'A **mixed number** has a whole-number part and a fraction part, like $2\\tfrac{1}{4}$. An **improper fraction** has a numerator at least as big as its denominator, like $\\dfrac{9}{4}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac{1}{4} = \\dfrac{2 \\times 4 + 1}{4} = \\dfrac{9}{4}', '1\\tfrac{2}{3} = \\dfrac{1 \\times 3 + 2}{3} = \\dfrac{5}{3}'] },
      ],
      lines: [
        { say: 'A mixed number has a whole-number part and a fraction part, like two and one quarter. An improper fraction has a top that is at least as big as its bottom, like nine quarters.', show: 'def' },
        { say: 'To change two and one quarter into quarters: each whole is four quarters, so two wholes are eight quarters. Add the one quarter, and you get nine quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, one and two thirds is three thirds plus two thirds, which is five thirds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The negative covers it all',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The negative sign covers the whole mixed number', md: '$-2\\tfrac{1}{4}$ means $-2 - \\tfrac{1}{4}$, **not** $-2 + \\tfrac{1}{4}$. So $-2\\tfrac{1}{4} = -\\dfrac{9}{4}$.' },
        where('wh'),
      ],
      lines: [
        { say: 'Now, what about negative two and one quarter? The negative sign covers the whole mixed number: both the two and the quarter are negative.', show: 'oops' },
        { say: 'On the number line, negative two and one quarter is a quarter past negative two, going left, away from zero. That is negative two point two five.', show: ['wh.axis', 'wh.right'], focus: 'wh.right' },
        { say: 'A common mistake is to read it as negative two plus one quarter. That is negative one point seven five, on the wrong side of negative two.', show: 'wh.wrong', focus: 'wh.wrong' },
        { say: 'So negative two and one quarter is negative nine quarters. Writing it as an improper fraction keeps the sign in one place.' },
      ],
    },
    {
      chapter: 'Add',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-2\\tfrac{1}{4} + 1\\tfrac{2}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= -\\dfrac{9}{4} + \\dfrac{5}{3}', '= -\\dfrac{27}{12} + \\dfrac{20}{12}', '= \\dfrac{-27 + 20}{12} = -\\dfrac{7}{12}'] },
      ],
      lines: [
        { say: 'Find negative two and one quarter plus one and two thirds. First, write both as improper fractions: negative nine quarters plus five thirds.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The common denominator is twelve. Nine quarters is twenty-seven twelfths, and five thirds is twenty twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the numerators: negative twenty-seven plus twenty. The signs are different, so subtract the sizes: twenty-seven minus twenty is seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Negative twenty-seven has the greater size, so the answer is negative: negative seven twelfths.' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [check('ck'), { kind: 'math', id: 'm', size: 'lg', lines: ['-2\\tfrac{1}{4} + 1\\tfrac{2}{3} = -\\dfrac{7}{12}'] }],
      lines: [
        { say: 'Check with a number line. Start at negative two and one quarter.', show: ['ck.axis', 'ck.start'] },
        { say: 'Adding one and two thirds moves you right by a little less than two.', show: 'ck.m', focus: 'ck.m' },
        { say: 'You stop a little short of zero, at a small negative number: negative seven twelfths. The answer makes sense.', show: ['ck.end', 'm.0'], focus: ['ck.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $1\\tfrac{1}{2} + \\left(-3\\tfrac{1}{4}\\right)$.',
          choices: ['$1\\tfrac{3}{4}$', '$-1\\tfrac{3}{4}$', '$-4\\tfrac{3}{4}$', '$-1\\tfrac{1}{4}$'],
          answer: 1,
          working: '$1\\tfrac{1}{2} = \\dfrac{6}{4}$ and $-3\\tfrac{1}{4} = -\\dfrac{13}{4}$, so the sum is $\\dfrac{6 - 13}{4} = -\\dfrac{7}{4} = -1\\tfrac{3}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one and one half plus negative three and one quarter. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative one and three quarters. In quarters, that is six quarters plus negative thirteen quarters, which is negative seven quarters. Choice D comes from reading negative three and one quarter as negative three plus one quarter.', show: 'q.answer' },
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
            'Write mixed numbers as improper fractions first: $-2\\tfrac{1}{4} = -\\dfrac{9}{4}$.',
            'The negative sign covers the whole mixed number.',
            'Then use a common denominator and the sign rules on the numerators.',
            'Check on a number line that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write mixed numbers as improper fractions first.', show: 'sum.0' },
        { say: 'Remember that the negative sign covers the whole mixed number.', show: 'sum.1' },
        { say: 'Then use a common denominator, and the sign rules on the numerators.', show: 'sum.2' },
        { say: 'And check on a number line that your answer makes sense. In the next part, you will solve problems with rising and falling amounts. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
