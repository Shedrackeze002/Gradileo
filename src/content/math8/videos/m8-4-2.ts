import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fitBar, pieces } from './lib/m8-4-figures.ts';

// Three wholes cut into quarters: twelve quarters, numbered.
const quarters = (id: string) => figure(id, [fitBar({ total: 3, piece: 0.25, den: 4, scale: true })], 230);

// Six cups cut into quarters, marked off in servings of three quarters: eight servings.
const servings = (id: string) => figure(id, [fitBar({ total: 6, piece: 0.75, den: 4, scale: true })], 230);

const video: Explainer = {
  id: 'm8-4-2',
  lessonId: 'm8-4-2',
  title: 'Dividing Fractions, Part 1: How Many Fit?',
  thumbnailTitle: 'How Many Fit?',
  thumbnail: 'qt',
  summary:
    'Division asks how many fit: 12 ÷ 3 asks how many groups of 3 fit into 12, and 3 ÷ 1/4 asks how many quarters fit into 3. Each whole holds 4 quarters, so 3 wholes hold 3 × 4 = 12 quarters: 3 ÷ 1/4 = 12. Dividing by a fraction less than 1 gives an answer bigger than the number you started with, because more small pieces fit. Six cups of trail mix make 6 ÷ 3/4 = 8 servings of 3/4 of a cup.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 1', title: 'How Many Fit?', subtitle: 'What dividing by a fraction means' }],
      lines: [
        { say: 'Hana has six cups of trail mix. How many servings of three quarters of a cup can Hana make? Questions that ask how many fit are division questions, even with fractions.', show: 'title' },
        { say: 'In this part, you will see what dividing by a fraction means, using pictures.' },
      ],
    },
    {
      chapter: 'Division asks how many fit',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\div 3 = 4', '3 \\div \\dfrac{1}{4} = \\; ?'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$3 \\div \\dfrac{1}{4}$ asks: how many quarters fit into $3$?' },
      ],
      lines: [
        { say: 'Start with whole numbers. Twelve divided by three asks: how many groups of three fit into twelve? Four groups fit, so twelve divided by three is four.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing by a fraction asks the same kind of question. Three divided by one quarter asks: how many quarters fit into three?', show: ['m.1', 'a'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Quarters in three wholes',
      layout: 'center',
      main: [
        quarters('qt'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 4 = 12', '3 \\div \\dfrac{1}{4} = 12'] },
      ],
      lines: [
        { say: 'Here are three wholes, side by side, and each whole is cut into four equal quarters.', show: ['qt.frame', 'qt.scale'] },
        { say: 'Count the quarters in the first whole: one, two, three, four.', show: pieces('qt', 4) },
        { say: 'Each whole holds four quarters. The second whole holds four more, and the third whole holds four more.', show: pieces('qt', 8, 4) },
        { say: 'So three wholes hold three times four, which is twelve quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve quarters fit into three. So three divided by one quarter is twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Bigger answers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\div 1 = 3', '3 \\div \\dfrac{1}{2} = 6', '3 \\div \\dfrac{1}{4} = 12'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Bigger answers', md: 'Dividing by a fraction less than $1$ gives an answer **bigger** than the number you started with. More small pieces fit in.' },
      ],
      lines: [
        { say: 'Something surprising happened. Three divided by one quarter is twelve, which is bigger than three! Look at this pattern.' },
        { say: 'Three divided by one is three: three wholes fit into three.', show: 'm.0', focus: 'm.0' },
        { say: 'Three divided by one half is six: each whole holds two halves, so six halves fit.', show: 'm.1', focus: 'm.1' },
        { say: 'And three divided by one quarter is twelve. The smaller the pieces, the more of them fit.', show: 'm.2', focus: 'm.2' },
        { say: 'So dividing by a fraction less than one gives an answer bigger than the number you started with.', show: 'tip' },
      ],
    },
    {
      chapter: 'Servings of trail mix',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hana has $6$ cups of trail mix. How many servings of $\\dfrac{3}{4}$ cup can Hana make?' },
        servings('sv'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\div \\dfrac{3}{4} = 8'] },
      ],
      lines: [
        { say: 'Now back to Hana. Six cups of trail mix, and each serving is three quarters of a cup. How many servings?', show: 'q' },
        { say: 'Here are the six cups, side by side, and each cup is cut into quarters.', show: ['sv.frame', 'sv.scale'] },
        { say: 'Each serving is three quarters of a cup: three of the quarter pieces. Mark off the servings, one after another: one, two, three, four.', show: pieces('sv', 4) },
        { say: 'Five, six, seven, eight. The servings use up all six cups exactly.', show: pieces('sv', 4, 4) },
        { say: 'Eight servings fit. So six divided by three quarters is eight, and Hana can make eight servings.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is another way to see it. Six cups hold twenty-four quarters, and twenty-four quarters make eight groups of three quarters.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many halves fit into $4$? Find $4 \\div \\dfrac{1}{2}$.',
          choices: ['$8$', '$2$', '$4\\dfrac{1}{2}$', '$\\dfrac{1}{8}$'],
          answer: 0,
          working: 'Each whole holds $2$ halves, so $4$ wholes hold $4 \\times 2 = 8$ halves: $4 \\div \\tfrac{1}{2} = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many halves fit into four? Find four divided by one half. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight. Each whole holds two halves, so four wholes hold four times two, which is eight halves. Choice B, two, is half of four. But the question asks how many halves fit into four, not what half of four is.', show: 'q.answer' },
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
            'Division asks how many fit: $3 \\div \\dfrac{1}{4}$ asks how many quarters fit into $3$.',
            'Each whole holds $4$ quarters, so $3 \\div \\dfrac{1}{4} = 3 \\times 4 = 12$.',
            'Dividing by a fraction less than $1$ gives a **bigger** answer.',
            '$6 \\div \\dfrac{3}{4} = 8$: eight servings of three quarters of a cup.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Division asks how many fit, even with fractions.', show: 'sum.0' },
        { say: 'Three wholes hold twelve quarters, so three divided by one quarter is twelve.', show: 'sum.1' },
        { say: 'Dividing by a fraction less than one gives a bigger answer, because more small pieces fit.', show: 'sum.2' },
        { say: 'And six cups make eight servings of three quarters of a cup. In the next part, you will divide fractions that have the same denominator. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
