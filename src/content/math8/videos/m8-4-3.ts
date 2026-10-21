import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// Three quarters of a cup, and the same amount in eighths, split into two halves of three eighths.
const sugar = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'q', parts: 4, shaded: 3, tone: 'adj', at: [0, 2.2], width: 12, label: '\\dfrac34 \\text{ cup}' }),
      bar({ name: 'e', parts: 8, shaded: 6, tones: [...repeat('good', 3), ...repeat('muted', 3)], at: [0, 0], width: 12, label: '\\dfrac38 \\text{ cup}' }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm8-4-3',
  lessonId: 'm8-4-3',
  title: 'Solving Fraction Problems, Part 1: Multiply or Divide?',
  thumbnailTitle: 'Multiply or Divide?',
  thumbnail: 'sg',
  summary:
    '“Of” usually means multiply, and “how many … fit in” or “how many … in” means divide. Half of a recipe that uses 3/4 cup of sugar needs 1/2 × 3/4 = 3/8 cup. Six cups of trail mix make 6 ÷ 3/4 = 6 × 4/3 = 8 servings of 3/4 cup. Check that the answer makes sense: each serving is less than 1 cup, so there should be more than 6 servings.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 1', title: 'Multiply or Divide?', subtitle: 'Reading a fraction problem' }],
      lines: [
        { say: 'Recipes, building projects and camping trips are full of fractions: three quarters of a cup of sugar, a board seven and one half feet long, two thirds of a bag of marshmallows.', show: 'title' },
        { say: 'In this lesson, you will solve problems like these. In this part, you will learn how to decide whether to multiply or divide.' },
      ],
    },
    {
      chapter: 'Key words',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Key words',
          md: '**Of** usually means multiply: $\\dfrac{1}{2}$ of $\\dfrac{3}{4}$ cup is $\\dfrac{1}{2} \\times \\dfrac{3}{4}$. **How many … fit in**, or **how many … in**, means divide: how many $\\dfrac{3}{4}$-cup servings are in $6$ cups is $6 \\div \\dfrac{3}{4}$.',
        },
      ],
      lines: [
        { say: 'Look for key words. The word of usually means multiply. One half of three quarters of a cup is one half times three quarters.', show: 'def' },
        { say: 'Questions that ask how many fit in, or how many are in, mean divide. How many servings of three quarters of a cup are in six cups? That is six divided by three quarters.' },
      ],
    },
    {
      chapter: 'Half a recipe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A recipe uses $\\dfrac{3}{4}$ cup of sugar. Diego makes $\\dfrac{1}{2}$ of the recipe. How much sugar does Diego need?' },
        sugar('sg'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{2} \\times \\dfrac{3}{4} = \\dfrac{1 \\times 3}{2 \\times 4} = \\dfrac{3}{8}'] },
      ],
      lines: [
        { say: 'A recipe uses three quarters of a cup of sugar. Diego makes one half of the recipe. How much sugar does Diego need?', show: 'q' },
        { say: 'Half of the recipe needs half of the sugar: one half of three quarters. Of means multiply.', show: ['sg.q-frame', 'sg.q-shade', 'sg.q-label'] },
        { say: 'Picture three quarters of a cup as six eighths. Half of the six eighths is three eighths.', show: ['sg.e-frame', 'sg.e-shade', 'sg.e-label'], focus: ['sg.e-p0', 'sg.e-p1', 'sg.e-p2'] },
        { say: 'In numbers, one half times three quarters: one times three is three, and two times four is eight. Diego needs three eighths of a cup of sugar.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Servings of trail mix',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hana has $6$ cups of trail mix. How many $\\dfrac{3}{4}$-cup servings can Hana make?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\div \\dfrac{3}{4} = \\dfrac{6}{1} \\times \\dfrac{4}{3}', '= \\dfrac{24}{3} = 8'] },
      ],
      lines: [
        { say: 'Hana has six cups of trail mix. How many servings of three quarters of a cup can Hana make?', show: 'q' },
        { say: 'The question asks how many servings are in six cups. How many in means divide: six divided by three quarters.' },
        { say: 'Multiply by the reciprocal of three quarters, which is four thirds. Six is six over one, so it is six over one times four thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Six times four is twenty-four, and one times three is three. Twenty-four thirds is eight. Hana can make eight servings.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'Each serving is less than $1$ cup, so there should be **more** than $6$ servings. $8$ makes sense. Half of a recipe needs **less** sugar: $\\dfrac{3}{8}$ cup is less than $\\dfrac{3}{4}$ cup.' },
      ],
      lines: [
        { say: 'Always check that your answer makes sense. Each serving is less than one cup, so there should be more than six servings. Eight is more than six, so it makes sense.', show: 'tip' },
        { say: 'And half of a recipe needs less sugar than the whole recipe. Three eighths of a cup is less than three quarters of a cup, so that makes sense as well.' },
        { say: 'If you multiply when you should divide, the check usually catches it. Six times three quarters is four and a half servings: fewer than six, which cannot be right.' },
      ],
    },
    {
      chapter: 'Which one?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Clue', 'Answer'],
          rows: [
            ['What is $\\tfrac{2}{3}$ of a bag of $9$ marshmallows?', '“of”: multiply', '$\\tfrac{2}{3} \\times 9 = 6$'],
            ['How many $\\tfrac{1}{4}$-cup scoops are in $2$ cups of flour?', '“how many in”: divide', '$2 \\div \\tfrac{1}{4} = 8$'],
            ['A $6$ ft fence is $\\tfrac{1}{3}$ painted. How long is the painted part?', '“of” the fence: multiply', '$\\tfrac{1}{3} \\times 6 = 2$ ft'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s practise deciding. What is two thirds of a bag of nine marshmallows? Of means multiply. Two thirds times nine is six marshmallows.', show: 't.0' },
        { say: 'How many quarter-cup scoops are in two cups of flour? How many in means divide. Two divided by one quarter is eight scoops.', show: 't.1' },
        { say: 'A six-foot fence is one third painted. How long is the painted part? The painted part is one third of the fence, so multiply. One third times six is two feet.', show: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag holds $4$ cups of rice. Each pot of rice uses $\\dfrac{2}{3}$ cup. How many pots of rice can be made?',
          choices: ['$2\\dfrac{2}{3}$', '$\\dfrac{1}{6}$', '$4\\dfrac{2}{3}$', '$6$'],
          answer: 3,
          working: 'How many $\\tfrac{2}{3}$-cup amounts are in $4$ cups? Divide: $4 \\div \\tfrac{2}{3} = 4 \\times \\tfrac{3}{2} = \\tfrac{12}{2} = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds four cups of rice. Each pot of rice uses two thirds of a cup. How many pots of rice can be made? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six. The question asks how many amounts of two thirds of a cup are in four cups, so divide. Four times three halves is six. Choice A, two and two thirds, multiplies four by two thirds instead, and gives fewer pots than cups.', show: 'q.answer' },
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
            '**Of** usually means multiply: $\\dfrac{1}{2}$ of $\\dfrac{3}{4}$ is $\\dfrac{3}{8}$.',
            '**How many … in** means divide: $6 \\div \\dfrac{3}{4} = 8$.',
            'Check that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Of usually means multiply.', show: 'sum.0' },
        { say: 'How many fit in, or how many in, means divide.', show: 'sum.1' },
        { say: 'And always check that the answer makes sense. In the next part, you will solve problems with mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
