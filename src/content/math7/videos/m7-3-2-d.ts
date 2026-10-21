import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fractionLine } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Counting up from 3 7/8 to 6 on a line cut into eighths: one eighth to 4, then two wholes.
const countUp = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 3,
        max: 6,
        den: 8,
        length: 13,
        hops: [
          { id: 'eighth', from: 7, to: 8, tone: 'opp', label: '\\tfrac18' },
          { id: 'two', from: 8, to: 24, tone: 'adj', label: '2' },
        ],
        points: [
          { id: 'start', at: 7, tex: '3\\tfrac78', tone: 'theta', below: true },
          { id: 'end', at: 24, tex: '6', tone: 'good', below: true },
        ],
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm7-3-2-d',
  lessonId: 'm7-3-2',
  title: 'Adding and Subtracting Mixed Numbers, Part 4: Harder Regrouping',
  thumbnailTitle: 'Harder Regrouping',
  thumbnail: 'cu',
  summary:
    'To subtract from a whole number, write it as a mixed number first: 6 = 5 8/8, so 6 − 3 7/8 = 2 1/8, which counting up on a number line confirms. With unlike denominators, find a common denominator, then regroup if needed: 4 1/6 − 1 3/4 = 4 2/12 − 1 9/12 = 3 14/12 − 1 9/12 = 2 5/12. Another way is to change both numbers to improper fractions: 21/4 − 11/4 = 10/4 = 2 1/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 4', title: 'Harder Regrouping', subtitle: 'Whole numbers and unlike denominators' }],
      lines: [
        { say: 'What is six minus three and seven eighths? Six has no fraction part at all. So how do you take away seven eighths?', show: 'title' },
        { say: 'In this part, you will regroup when you subtract from a whole number, and when the denominators are different. You will also see another way to subtract mixed numbers.' },
      ],
    },
    {
      chapter: 'Subtracting from a whole number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $6 - 3\\dfrac{7}{8}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 = 5 + \\dfrac{8}{8} = 5\\dfrac{8}{8}', '\\text{Wholes: } 5 - 3 = 2 \\qquad \\text{Fractions: } \\dfrac{8}{8} - \\dfrac{7}{8} = \\dfrac{1}{8}', '6 - 3\\dfrac{7}{8} = 2\\dfrac{1}{8}'] },
      ],
      lines: [
        { say: 'Find six minus three and seven eighths.', show: 'q' },
        { say: 'Six has no eighths to take from, so regroup. Take one whole from the six, and write it as eight eighths. Six is the same as five and eight eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'Now subtract. Five minus three is two. Eight eighths minus seven eighths is one eighth.', show: 'm.1', focus: 'm.1' },
        { say: 'So six minus three and seven eighths is two and one eighth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check by counting up',
      layout: 'center',
      main: [countUp('cu'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{8} + 2 = 2\\dfrac{1}{8}'] }],
      lines: [
        { say: 'You can check on a number line. A difference is the distance between two numbers. Start at three and seven eighths, and count up to six.', show: ['cu.axis', 'cu.start', 'cu.end'] },
        { say: 'One eighth takes you to four, a whole number.', show: 'cu.eighth', focus: 'cu.eighth' },
        { say: 'From four up to six is two wholes. Altogether, you counted one eighth and two wholes, which is two and one eighth. It matches.', show: ['cu.two', 'm'], focus: ['cu.two', 'm.0'] },
      ],
    },
    {
      chapter: 'Unlike denominators and regrouping',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $4\\dfrac{1}{6} - 1\\dfrac{3}{4}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '4\\dfrac{1}{6} = 4\\dfrac{2}{12} \\qquad 1\\dfrac{3}{4} = 1\\dfrac{9}{12}',
            '\\dfrac{2}{12} < \\dfrac{9}{12} \\;\\to\\; 4\\dfrac{2}{12} = 3 + \\dfrac{12}{12} + \\dfrac{2}{12} = 3\\dfrac{14}{12}',
            '\\text{Wholes: } 3 - 1 = 2 \\qquad \\text{Fractions: } \\dfrac{14}{12} - \\dfrac{9}{12} = \\dfrac{5}{12}',
            '4\\dfrac{1}{6} - 1\\dfrac{3}{4} = 2\\dfrac{5}{12}',
          ],
        },
      ],
      lines: [
        { say: 'Now try a question with different denominators. Find four and one sixth minus one and three quarters.', show: 'q' },
        { say: 'First, find a common denominator. Count by sixes: six, twelve. Four divides into twelve, so use twelfths. One sixth is two twelfths, and three quarters is nine twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Two twelfths is less than nine twelfths, so we need to regroup. One whole is twelve twelfths. Four and two twelfths becomes three and fourteen twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract. Three minus one is two. Fourteen twelfths minus nine twelfths is five twelfths.', show: 'm.2', focus: 'm.2' },
        { say: 'So the answer is two and five twelfths. Five and twelve have no common factor except one, so it is in lowest terms.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Another way: improper fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Another way', md: 'Change both mixed numbers to **improper fractions**, subtract, then change the answer back to a mixed number. Use whichever way you find easier.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5\\dfrac{1}{4} - 2\\dfrac{3}{4} = \\dfrac{21}{4} - \\dfrac{11}{4}', '= \\dfrac{10}{4} = 2\\dfrac{2}{4} = 2\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Here is another way to subtract mixed numbers. Change both of them to improper fractions first. Then there is nothing to regroup.', show: 'tip' },
        { say: 'Take five and one quarter minus two and three quarters. Five times four plus one is twenty-one, so the first number is twenty-one quarters. Two times four plus three is eleven, so the second is eleven quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-one quarters minus eleven quarters is ten quarters. Ten divided by four is two, remainder two. So ten quarters is two and two quarters, which is two and one half.', show: 'm.1', focus: 'm.1' },
        { say: 'It is the same answer as regrouping gave. Use whichever way you find easier.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $5 - 2\\dfrac{3}{8}$.',
          choices: ['$3\\dfrac{3}{8}$', '$2\\dfrac{5}{8}$', '$3\\dfrac{5}{8}$', '$2\\dfrac{3}{8}$'],
          answer: 1,
          working: 'Regroup: $5 = 4\\dfrac{8}{8}$. Then $4 - 2 = 2$ and $\\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$, so the answer is $2\\dfrac{5}{8}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five minus two and three eighths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two and five eighths. Regroup five as four and eight eighths. Four minus two is two, and eight eighths minus three eighths is five eighths. Choice A just keeps the three eighths, but they have to be taken away.', show: 'q.answer' },
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
            'To subtract from a whole number, regroup it first: $6 = 5\\dfrac{8}{8}$.',
            'With different denominators, find a common denominator first, then regroup if needed.',
            'Check by counting up on a number line, or by adding back.',
            'Or change both numbers to improper fractions and subtract.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To subtract from a whole number, regroup it first. Six is five and eight eighths.', show: 'sum.0' },
        { say: 'With different denominators, find a common denominator first, and then regroup if the first fraction is too small.', show: 'sum.1' },
        { say: 'Check your answer by counting up on a number line, or by adding back.', show: 'sum.2' },
        { say: 'Or change both numbers to improper fractions, and subtract. Next, you will use all of this to solve fraction problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
