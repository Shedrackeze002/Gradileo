import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from './lib/m5-5-figures.ts';

const B = 'brand' as const;
const O = 'opp' as const;

// 2⅗ (purple) + 1⅘ (orange) on bars of fifths: they fill four bars and two fifths of a fifth bar.
const sum = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 5, shaded: 5, at: [0, 6], width: 6, tone: B }),
    bar({ name: 'b', parts: 5, shaded: 5, at: [0, 4.5], width: 6, tone: B }),
    bar({ name: 'c', parts: 5, shaded: 5, at: [0, 3], width: 6, tones: [B, B, B, O, O] }),
    bar({ name: 'd', parts: 5, shaded: 5, at: [0, 1.5], width: 6, tone: O }),
    bar({ name: 'e', parts: 5, shaded: 2, at: [0, 0], width: 6, tone: O }),
  ], 480);

const video: Explainer = {
  id: 'm5-5-2-c',
  lessonId: 'm5-5-2',
  title: 'Adding and Subtracting Fractions, Part 3: Adding Mixed Numbers',
  thumbnailTitle: 'Adding Mixed Numbers',
  thumbnail: 'sum',
  summary: 'Adding mixed numbers two ways, 2⅗ + 1⅘ = 4⅖: add the wholes and the parts (with ⁷⁄₅ = 1⅖ carried into the wholes), or change both to improper fractions (13/5 + 9/5 = 22/5). Includes when each way is quicker.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 3', title: 'Adding Mixed Numbers', subtitle: 'Two good ways' }],
      lines: [
        { say: 'What is two and three fifths plus one and four fifths? There are two good ways to find out, and they give the same answer.', show: 'title' },
        { say: 'In this video, you will add mixed numbers two ways: with wholes and parts, and with improper fractions.' },
      ],
    },
    {
      chapter: 'The picture',
      layout: 'split',
      leftWidth: 460,
      left: [sum('sum')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{2\\dfrac35} + \\opp{1\\dfrac45} = \\; ?', '= 4\\dfrac25'] }],
      lines: [
        { say: 'Each bar here is one whole, cut into fifths. First, two and three fifths, in purple: two full bars, and three fifths of the next one.', show: ['sum.a-frame', 'sum.b-frame', 'sum.c-frame', 'sum.d-frame', 'sum.e-frame', 'sum.a-shade', 'sum.b-shade', 'sum.c-p0', 'sum.c-p1', 'sum.c-p2', 'm.0'] },
        { say: 'Now add one and four fifths, in orange. That is nine fifths. Two of them fill up the third bar.', show: ['sum.c-p3', 'sum.c-p4'], focus: ['sum.c-p3', 'sum.c-p4'] },
        { say: 'Five more fill the fourth bar, and the last two go on the fifth bar.', show: ['sum.d-shade', 'sum.e-shade'], focus: ['sum.d-shade', 'sum.e-shade'] },
        { say: 'Count the full bars: one, two, three, four. And two fifths more. So the sum is four and two fifths.', show: 'm.1', focus: ['sum.a-shade', 'sum.b-shade', 'sum.c-shade', 'sum.d-shade', 'm.1'] },
      ],
    },
    {
      chapter: 'Way 1: wholes and parts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Wholes: } 2 + 1 = 3', '\\text{Parts: } \\dfrac35 + \\dfrac45 = \\dfrac75 = 1\\dfrac25', '\\text{Together: } 3 + 1\\dfrac25 = 4\\dfrac25'] },
      ],
      lines: [
        { say: 'Way one: add the wholes and the parts separately. First the wholes: two plus one is three.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the parts: three fifths plus four fifths is seven fifths. Seven fifths is more than one whole. Seven divided by five is one, remainder two, so seven fifths is one and two fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'Put them together: three, plus one and two fifths, is four and two fifths. The extra whole from the parts joins the other wholes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Way 2: improper fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\dfrac35 = \\dfrac{2 \\times 5 + 3}{5} = \\dfrac{13}{5}', '1\\dfrac45 = \\dfrac{1 \\times 5 + 4}{5} = \\dfrac95', '\\dfrac{13}{5} + \\dfrac95 = \\dfrac{22}{5}', '22 \\div 5 = 4 \\text{ R } 2, \\text{ so } \\dfrac{22}{5} = 4\\dfrac25'] },
      ],
      lines: [
        { say: 'Way two: change both mixed numbers into improper fractions first. Two and three fifths: two times five is ten, plus three is 13. Thirteen fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'One and four fifths: one times five is five, plus four is nine. Nine fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add the numerators: 13 plus nine is 22. So the sum is twenty-two fifths.', show: 'm.2', focus: 'm.2' },
        { say: 'Change it back to a mixed number: 22 divided by five is four, remainder two. Four and two fifths. Both ways give the same answer!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which way?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way is easier?', md: 'Wholes and parts is quick when the fraction parts are easy to add. Improper fractions are handy when the parts make more than a whole.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\dfrac14 + 2\\dfrac24: \\quad 1 + 2 = 3, \\quad \\dfrac14 + \\dfrac24 = \\dfrac34', '= 3\\dfrac34'] },
      ],
      lines: [
        { say: 'Which way should you use? Either way works, so choose the one that feels easier.', show: 'tip' },
        { say: 'Wholes and parts is quick when the parts add up to less than a whole. One and one fourth plus two and two fourths: the wholes make three, and the parts make three fourths.', show: 'm.0', focus: 'm.0' },
        { say: 'So the sum is three and three fourths, with no extra whole to carry. Improper fractions are handy when the numbers are trickier.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $3\\dfrac{2}{6} + 1\\dfrac{5}{6}$.',
          choices: ['$4\\dfrac{7}{12}$', '$4\\dfrac{1}{6}$', '$5\\dfrac{5}{6}$', '$5\\dfrac{1}{6}$'],
          answer: 3,
          working: 'Wholes: $3 + 1 = 4$. Parts: $\\tfrac{2}{6} + \\tfrac{5}{6} = \\tfrac{7}{6} = 1\\tfrac{1}{6}$. Together: $4 + 1\\tfrac{1}{6} = 5\\tfrac{1}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find three and two sixths, plus one and five sixths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, five and one sixth. The wholes make three plus one, which is four. The parts make two sixths plus five sixths: seven sixths, or one and one sixth. Four plus one and one sixth is five and one sixth. Choice B forgets the extra whole inside seven sixths.', show: 'q.answer' },
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
          items: ['Way 1: add the wholes, then the parts. If the parts make more than $1$, add the extra whole.', 'Way 2: change to improper fractions, add the numerators, then change back.', 'Both ways give the same answer.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Way one: add the wholes, then the parts. If the parts make more than one, add the extra whole to the wholes.', show: 'sum.0' },
        { say: 'Way two: change both mixed numbers to improper fractions, add the numerators, then change back.', show: 'sum.1' },
        { say: 'Both ways give the same answer, so use the one you like. In the next part, we subtract mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
