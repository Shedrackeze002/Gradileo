import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Exam question for Math 6 lesson 4.3 (multiplying fractions and natural numbers). The question is
// an Everyday Math exercise from OpenStax Prealgebra 2e, word for word (section 4.2, Multiply and
// Divide Fractions, CC BY-NC-SA 4.0). (a) 2 × 3/4 = 6/4 = 3/2 = 1 1/2 cups. (b) Two of the many
// ways to measure 1 1/2 cups: the 1 cup and the 1/2 cup once each, or the 1/2 cup three times
// (the 1/4 cup six times works too).

const QUESTION =
  'Baking A recipe for chocolate chip cookies calls for 3/4 cup brown sugar. Imelda wants to double the recipe. (a) How much brown sugar will Imelda need? Show your calculation. Write your result as an improper fraction and as a mixed number. (b) Measuring cups usually come in sets of 1/8, 1/4, 1/3, 1/2, and 1 cup. Draw a diagram to show two different ways that Imelda could measure the brown sugar needed to double the recipe.';

/** Two batches of 3/4 cup, then the six quarters regrouped as one full cup and one half cup. */
const cups = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'b1', parts: 4, shaded: 3, tone: 'theta', width: 4, height: 0.9, at: [0, 2.6], label: '\\tfrac{3}{4}' }),
      bar({ name: 'b2', parts: 4, shaded: 3, tone: 'adj', width: 4, height: 0.9, at: [6, 2.6], label: '\\tfrac{3}{4}' }),
      bar({ name: 'w1', parts: 4, shaded: 4, tones: ['theta', 'theta', 'theta', 'adj'], width: 4, height: 0.9, at: [0, 0.6], label: '1' }),
      bar({ name: 'w2', parts: 4, shaded: 2, tone: 'adj', width: 4, height: 0.9, at: [6, 0.6], label: '\\tfrac{2}{4} = \\tfrac{1}{2}' }),
    ],
    300,
  );

/** Two ways to measure 1 1/2 cups: 1 cup + 1/2 cup, or three 1/2 cups. */
const ways = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'one', parts: 1, shaded: 1, tone: 'good', width: 4, height: 0.9, at: [0, 2.4], label: '1' }),
      bar({ name: 'half', parts: 2, shaded: 1, tone: 'good', width: 4, height: 0.9, at: [5.6, 2.4], label: '\\tfrac{1}{2}' }),
      ...[0, 1, 2].map((k) => bar({ name: `h${k}`, parts: 2, shaded: 1, tone: 'opp', width: 4, height: 0.9, at: [k * 4.4, 0.4], label: '\\tfrac{1}{2}', labelPlace: 'below' })),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m6-4-3',
  lessonId: '',
  exam: {
    lesson: 'm6-4-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.2, Multiply and Divide Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-2-multiply-and-divide-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Doubling 3/4 Cup of Brown Sugar (Multiplying Fractions and Natural Numbers)',
  thumbnailTitle: 'Double 3/4 Cup',
  thumbnail: 'cu',
  summary:
    'A real test question, solved one small step at a time: a cookie recipe calls for 3/4 cup of brown sugar, and Imelda doubles it. (a) How much brown sugar is that, as an improper fraction and a mixed number? (b) Show two ways to measure it with measuring cups. Doubling means 2 × 3/4 = 6/4 = 3/2 = 1 1/2 cups, which she can measure as 1 cup and 1/2 cup, or as three 1/2 cups. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Double 3/4 Cup', subtitle: 'Multiplying fractions and natural numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying a fraction by a whole number. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: '**Baking** A recipe for chocolate chip cookies calls for $\\tfrac{3}{4}$ cup brown sugar. Imelda wants to double the recipe. (a) How much brown sugar will Imelda need? Show your calculation. Write your result as an improper fraction and as a mixed number. (b) Measuring cups usually come in sets of $\\tfrac{1}{8}$, $\\tfrac{1}{4}$, $\\tfrac{1}{3}$, $\\tfrac{1}{2}$, and $1$ cup. Draw a diagram to show two different ways that Imelda could measure the brown sugar needed to double the recipe.',
          answer: '(a) $\\tfrac{3}{2} = 1\\tfrac{1}{2}$ cups (b) $1 + \\tfrac{1}{2}$, or $\\tfrac{1}{2} + \\tfrac{1}{2} + \\tfrac{1}{2}$',
          working: '2 × 3/4 = 6/4 = 3/2',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A recipe for chocolate chip cookies calls for 3 quarters of a cup of brown sugar. Imelda wants to double the recipe. Part a. How much brown sugar will she need? Show your calculation, and write the result as an improper fraction and as a mixed number. Part b. Measuring cups usually come in sets of 1 eighth, 1 quarter, 1 third, 1 half, and 1 cup. Draw a diagram to show two different ways Imelda could measure the brown sugar.', caption: 'A recipe calls for 3/4 cup brown sugar, and Imelda doubles it. (a) How much brown sugar? Write it as an improper fraction and a mixed number. (b) Show two ways to measure it with 1/8, 1/4, 1/3, 1/2 and 1 cup measures.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Double, improper, mixed', md: '**Double** means **two times** as much: $2 \\times \\tfrac{3}{4}$. An **improper fraction** has a top **bigger** than its bottom, like $\\tfrac{5}{4}$. A **mixed number** is a whole number and a fraction, like $1\\tfrac{1}{4}$.' }],
      lines: [
        { say: 'Doubling the recipe means using two times as much of everything. So Imelda needs 2 times 3 quarters of a cup.', show: 'c' },
        { say: 'An improper fraction has a top bigger than its bottom, like 5 quarters. A mixed number is a whole number with a fraction, like 1 and 1 quarter.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['n \\times \\dfrac{a}{b} = \\dfrac{n \\times a}{b}', '\\dfrac{6}{4} = \\dfrac{4}{4} + \\dfrac{2}{4} = 1\\tfrac{2}{4}'] }],
      lines: [
        { say: 'Here is what we need. To multiply a fraction by a whole number, multiply the numerator by the whole number, and keep the denominator. The size of the piece does not change, we just have more of them.', show: 'f.0' },
        { say: 'To change an improper fraction to a mixed number, take out as many wholes as you can. Every 4 quarters makes one whole.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply $2 \\times \\tfrac{3}{4}$', 'Simplify and write a **mixed number**', 'Find **two** ways to measure it'] }],
      lines: [
        { say: 'Here is the plan. Multiply 2 times 3 quarters.', show: 'plan.0' },
        { say: 'Simplify, and write it as a mixed number.', show: 'plan.1' },
        { say: 'Then find two ways to measure it with the cups.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Part (a)',
      layout: 'split',
      leftWidth: 560,
      left: [cups('cu')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times \\tfrac{3}{4} = \\tfrac{6}{4}', '= \\good{\\tfrac{3}{2}}', '= \\good{1\\tfrac{1}{2}} \\text{ cups}'] }],
      lines: [
        { say: 'Step one. Here are two batches of 3 quarters of a cup. 2 times 3 quarters is 6 quarters.', show: ['cu.b1-frame', 'cu.b1-shade', 'cu.b1-label', 'cu.b2-frame', 'cu.b2-shade', 'cu.b2-label', 'm.0'], focus: 'm.0' },
        { say: 'Step two. 6 quarters simplifies: divide the top and bottom by 2 to get 3 halves. That is the improper fraction.', show: 'm.1', focus: 'm.1' },
        { say: 'Move one quarter across to fill the first cup. Now there is one whole cup and 2 quarters, which is one half. So Imelda needs 1 and a half cups.', show: ['cu.w1-frame', 'cu.w1-shade', 'cu.w1-label', 'cu.w2-frame', 'cu.w2-shade', 'cu.w2-label', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Part (b)',
      layout: 'center',
      main: [ways('wy'), { kind: 'math', id: 'm', size: 'md', lines: ['1 + \\tfrac{1}{2} = 1\\tfrac{1}{2} \\qquad \\tfrac{1}{2} + \\tfrac{1}{2} + \\tfrac{1}{2} = 1\\tfrac{1}{2}'] }],
      lines: [
        { say: 'Step three. One way: fill the 1 cup measure once, and the half cup measure once. 1 plus a half is 1 and a half.', show: ['wy.one-frame', 'wy.one-shade', 'wy.one-label', 'wy.half-frame', 'wy.half-shade', 'wy.half-label'] },
        { say: 'Another way: fill the half cup measure three times. 3 halves is also 1 and a half. Six quarter cups would work too.', show: ['wy.h0-frame', 'wy.h0-shade', 'wy.h0-label', 'wy.h1-frame', 'wy.h1-shade', 'wy.h1-label', 'wy.h2-frame', 'wy.h2-shade', 'wy.h2-label', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{3}{4} + \\tfrac{3}{4} = \\tfrac{6}{4} = 1\\tfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by adding instead. Doubling is the same as adding the amount twice: 3 quarters plus 3 quarters is 6 quarters, which is 1 and a half. It checks out.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$\\tfrac{6}{8}$', 'doubled the **bottom** too: that is still $\\tfrac{3}{4}$'],
            ['$1\\tfrac{3}{4}$', 'added $1$ instead of **doubling**'],
            ['$1\\tfrac{1}{3}$ cups', 'wrong fraction part: $\\tfrac{2}{4}$ is $\\tfrac{1}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 eighths doubles the top and the bottom. That is the same amount as 3 quarters, so nothing was doubled. Only the numerator is multiplied.' },
        { say: '1 and 3 quarters adds one cup instead of doubling.' },
        { say: 'And 1 and 1 third has the wrong fraction part. The leftover 2 quarters is one half, not one third.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Each lap of a track is $\\tfrac{2}{5}$ km. Ana runs $3$ laps. How far does she run?',
          choices: ['$\\tfrac{6}{15}$ km', '$\\tfrac{5}{5}$ km', '$1\\tfrac{1}{5}$ km', '$\\tfrac{2}{15}$ km'],
          answer: 2,
          working: '3 × 2/5 = 6/5 = 1 1/5 km.',
        },
      ],
      lines: [
        { say: 'Your turn. Each lap of a track is 2 fifths of a kilometre. Ana runs 3 laps. How far does she run? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3 times 2 fifths is 6 fifths, which is 1 and 1 fifth kilometres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply the **numerator** only', 'Keep the **denominator**', 'Take out **wholes** for a mixed number', 'Check by **adding** the amount again'] }],
      lines: [
        { say: 'Here is what to remember. To multiply a fraction by a whole number, multiply the numerator only.', show: 'sum.0' },
        { say: 'Keep the denominator, because the pieces stay the same size.', show: 'sum.1' },
        { say: 'Take out the wholes to write a mixed number.', show: 'sum.2' },
        { say: 'And check by adding the amount again. For more on multiplying fractions and natural numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
