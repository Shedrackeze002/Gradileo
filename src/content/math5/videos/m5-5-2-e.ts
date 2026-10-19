import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine } from './lib/m5-5-figures.ts';

// The trail on a number line in eighths of a kilometre: Jun is at 2 2/8, the end is at 4 5/8.
const trail = (id: string) =>
  figure(id, [
    fractionLine({
      min: 0,
      max: 5,
      den: 8,
      length: 14,
      lift: 0.75,
      hops: [
        { id: 'hiked', from: 0, to: 18, tone: 'adj', label: '\\text{hiked}' },
        { id: 'left', from: 18, to: 37, tone: 'theta', label: '?' },
      ],
      points: [
        { id: 'jun', at: 18, tex: '2\\dfrac28', tone: 'adj' },
        { id: 'end', at: 37, tex: '4\\dfrac58', tone: 'good' },
      ],
    }),
  ], 260);

// Ayesha's 5 cups of flour: 1¾ cups (purple) and 2¼ cups (orange) used, 1 cup left.
const flour = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 4, shaded: 4, at: [0, 0], width: 3, tone: 'brand' }),
    bar({ name: 'b', parts: 4, shaded: 4, at: [3.3, 0], width: 3, tones: ['brand', 'brand', 'brand', 'opp'] }),
    bar({ name: 'c', parts: 4, shaded: 4, at: [6.6, 0], width: 3, tone: 'opp' }),
    bar({ name: 'd', parts: 4, shaded: 4, at: [9.9, 0], width: 3, tone: 'opp' }),
    bar({ name: 'e', parts: 4, shaded: 0, at: [13.2, 0], width: 3, label: '\\text{left}', labelPlace: 'below' }),
  ], 180);

const video: Explainer = {
  id: 'm5-5-2-e',
  lessonId: 'm5-5-2',
  title: 'Adding and Subtracting Fractions, Part 5: Solving Fraction Problems',
  thumbnailTitle: 'Fraction Word Problems',
  thumbnail: 'tr',
  summary: 'Solving fraction word problems in four steps: find the amounts, decide whether to add or subtract, solve, and check. A hiking trail (4⅝ − 2²⁄₈ = 2⅜ km) and a two-step kitchen problem (5 − (1¾ + 2¼) = 1 cup).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 5', title: 'Solving Fraction Problems', subtitle: 'Add or subtract? Read, decide, solve, check' }],
      lines: [
        { say: 'Fractions show up on hikes, in recipes and in races. In a word problem, nobody tells you whether to add or subtract. You decide.', show: 'title' },
        { say: 'In this video, you will solve fraction word problems in four steps.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1. Read** the problem. Find the amounts.', '**2. Decide:** put together (**add**), or find what is left or the difference (**subtract**)?', '**3. Write** the number sentence and solve it.', '**4. Check** that the answer makes sense.'],
        },
      ],
      lines: [
        { say: 'Step one: read the problem, and find the amounts.', show: 'b.0' },
        { say: 'Step two: decide. Are you putting amounts together? Then add. Are you finding what is left, or the difference between two amounts? Then subtract.', show: 'b.1' },
        { say: 'Step three: write the number sentence, and solve it.', show: 'b.2' },
        { say: 'Step four: check that the answer makes sense.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A hiking trail',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A trail is $4\\dfrac{5}{8}$ km long. Jun has hiked $2\\dfrac{2}{8}$ km. How far does Jun still have to hike?' },
        trail('tr'),
      ],
      lines: [
        { say: 'A trail is four and five eighths kilometres long. Joon has hiked two and two eighths kilometres. How far does Joon still have to hike?', caption: 'A trail is four and five eighths kilometres long. Jun has hiked two and two eighths kilometres. How far does Jun still have to hike?', show: 't' },
        { say: 'Step one: the amounts. Here is the trail on a number line, in eighths of a kilometre. The end of the trail is at four and five eighths.', show: ['tr.axis', 'tr.end'], focus: 'tr.end' },
        { say: 'Joon has hiked two and two eighths kilometres, so far.', caption: 'Jun has hiked two and two eighths kilometres, so far.', show: ['tr.hiked', 'tr.jun'], focus: ['tr.hiked', 'tr.jun'] },
        { say: 'Step two: decide. Still have to hike means what is left of the trail. That is this part. To find what is left, subtract.', show: 'tr.left', focus: 'tr.left' },
      ],
    },
    {
      chapter: 'Solve and check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4\\dfrac58 - 2\\dfrac28', '\\text{Wholes: } 4 - 2 = 2 \\qquad \\text{Parts: } \\dfrac58 - \\dfrac28 = \\dfrac38', '= 2\\dfrac38 \\text{ km}', '\\text{Check: } 2\\dfrac28 + 2\\dfrac38 = 4\\dfrac58 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Step three: write the number sentence. Four and five eighths, minus two and two eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'The fraction parts are easy to subtract, so use wholes and parts. Wholes: four minus two is two. Parts: five eighths minus two eighths is three eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'So Joon still has to hike two and three eighths kilometres.', caption: 'So Jun still has to hike two and three eighths kilometres.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four: check. What Joon hiked, plus what is left, should be the whole trail. Two and two eighths plus two and three eighths is four and five eighths. It makes sense.', caption: 'Step four: check. What Jun hiked, plus what is left, should be the whole trail. Two and two eighths plus two and three eighths is four and five eighths. It makes sense.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two steps in the kitchen',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Ayesha has $5$ cups of flour. Ayesha uses $1\\dfrac{3}{4}$ cups for pancakes and $2\\dfrac{1}{4}$ cups for muffins. How much flour is left?' },
        flour('fl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\dfrac34 + 2\\dfrac14 = 3 + \\dfrac44 = 4 \\text{ cups used}', '5 - 4 = 1 \\text{ cup left}'] },
      ],
      lines: [
        { say: 'Here is a problem with two steps. Ayesha has five cups of flour. Ayesha uses one and three fourths cups for pancakes, and two and one fourth cups for muffins. How much flour is left?', show: ['t', 'fl.a-frame', 'fl.b-frame', 'fl.c-frame', 'fl.d-frame', 'fl.e-frame'] },
        { say: 'First, put together what Ayesha uses: add. The wholes make one plus two, which is three. The parts make three fourths plus one fourth, which is four fourths, or one whole.', show: ['fl.a-shade', 'fl.b-p0', 'fl.b-p1', 'fl.b-p2', 'fl.b-p3', 'fl.c-shade', 'fl.d-shade'] },
        { say: 'So Ayesha uses three plus one, which is four cups.', show: 'm.0', focus: 'm.0' },
        { say: 'Second, find what is left: subtract. Five cups minus four cups is one cup.', show: ['m.1', 'fl.e-label'], focus: ['m.1', 'fl.e-frame'] },
        { say: 'Check: one cup is left, and that is less than the five cups Ayesha started with. It makes sense. Ayesha has one cup of flour left.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ribbon is $3\\dfrac{7}{10}$ m long. Mia cuts off $1\\dfrac{4}{10}$ m. How much ribbon is left?',
          choices: ['$5\\dfrac{1}{10}$ m', '$2\\dfrac{3}{10}$ m', '$1\\dfrac{3}{10}$ m', '$2\\dfrac{4}{10}$ m'],
          answer: 1,
          working: 'Cutting off leaves less, so subtract. Wholes: $3 - 1 = 2$. Parts: $\\tfrac{7}{10} - \\tfrac{4}{10} = \\tfrac{3}{10}$. So $2\\tfrac{3}{10}$ m is left.',
        },
      ],
      lines: [
        { say: 'Your turn. A ribbon is three and seven tenths metres long. Mia cuts off one and four tenths metres. How much ribbon is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two and three tenths metres. Cutting off means taking away, so subtract. Wholes: three minus one is two. Parts: seven tenths minus four tenths is three tenths. Choice A adds instead, and gives more ribbon than Mia started with.', show: 'q.answer' },
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
          items: ['Read the problem and find the amounts.', '**Add** to put amounts together. **Subtract** to find what is left or the difference.', 'Some problems need two steps.', 'Check that the answer makes sense.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Read the problem, and find the amounts.', show: 'sum.0' },
        { say: 'Add to put amounts together. Subtract to find what is left, or the difference.', show: 'sum.1' },
        { say: 'Some problems need two steps: use the first answer in the second step.', show: 'sum.2' },
        { say: 'And always check that your answer makes sense. Great work: you can now add and subtract fractions and mixed numbers, and use them to solve problems!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
