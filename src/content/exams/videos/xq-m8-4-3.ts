import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fitBar, pieces } from '@/content/math8/videos/lib/m8-4-figures.ts';

// Exam question for Math 8 lesson 4.3 (solving fraction problems). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 4.2, Multiply and Divide Fractions, CC BY-NC-SA
// 4.0). 3/4 ÷ 6 = 3/4 × 1/6 = 3/24 = 1/8 yard. Check: 3/4 yd = 27 in, 27 ÷ 6 = 4.5 in = 1/8 yd.

const QUESTION =
  'Kristen has 3/4 yards of ribbon. She wants to cut it into equal parts to make hair ribbons for her daughter’s 6 dolls. How long will each doll’s hair ribbon be?';

const ribbon = (id: string) => figure(id, [fitBar({ total: 0.75, wholes: 1, piece: 0.125, den: 8, tones: ['good', 'opp'], numbers: true, exact: true, unit: 14 })], 220);

const video: Explainer = {
  id: 'xq-m8-4-3',
  lessonId: '',
  exam: {
    lesson: 'm8-4-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.2, Multiply and Divide Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-2-multiply-and-divide-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Ribbons for Six Dolls (Solving Fraction Problems)',
  thumbnailTitle: 'Ribbons for Six Dolls',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Kristen has 3/4 of a yard of ribbon and cuts it into equal parts for her daughter’s 6 dolls. How long is each doll’s ribbon? Sharing into 6 equal parts means dividing by 6, which is the same as multiplying by 1/6: 3/4 × 1/6 = 3/24 = 1/8 of a yard. Then we check in inches (27 inches shared 6 ways is 4.5 inches, which is 1/8 of a yard) and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ribbons for Six Dolls', subtitle: 'Solving fraction problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Kristen has $\\tfrac34$ yards of ribbon. She wants to cut it into equal parts to make hair ribbons for her daughter’s $6$ dolls. How long will each doll’s hair ribbon be?',
          answer: '$\\tfrac18$ yard',
          working: '3/4 ÷ 6 = 3/4 × 1/6 = 1/8',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Kristen has 3 quarters of a yard of ribbon. She wants to cut it into equal parts to make hair ribbons for her daughter\'s 6 dolls. How long will each doll\'s hair ribbon be?', caption: 'Kristen has 3/4 yards of ribbon. She wants to cut it into equal parts to make hair ribbons for her daughter’s 6 dolls. How long will each doll’s hair ribbon be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ribbon('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Sharing equally', md: 'Kristen has $\\tfrac34$ of a yard of ribbon. A **yard** is a length: $36$ inches. She cuts it into $6$ **equal** parts, one for each doll. Sharing into $6$ equal parts is a **division** by $6$.' }],
      lines: [
        { say: 'Here is Kristen\'s ribbon: 3 quarters of a yard. A yard is a length, 36 inches.', caption: 'Here is Kristen’s ribbon: 3/4 of a yard. A yard is a length, 36 inches.', show: ['ask.frame', 'c'] },
        { say: 'She cuts it into 6 equal parts, one for each doll. Sharing into 6 equal parts is a division by 6. How long is each part?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{share into } n \\text{ equal parts} = \\div \\, n', '\\div \\, 6 = \\times \\dfrac16', '\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}'] }],
      lines: [
        { say: 'Here is what we need. Sharing into a number of equal parts means dividing by that number.', show: 'm.0' },
        { say: 'Dividing by 6 is the same as multiplying by 1 sixth, the reciprocal of 6.', caption: 'Dividing by 6 is the same as multiplying by 1/6, the reciprocal of 6.', show: 'm.1' },
        { say: 'And to multiply fractions, multiply the tops and multiply the bottoms.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **division**: $\\tfrac34 \\div 6$', 'Multiply by the **reciprocal**, $\\tfrac16$', '**Simplify**'] }],
      lines: [
        { say: 'Here is the plan. Write the division: 3 quarters divided by 6.', caption: 'Here is the plan. Write the division: 3/4 ÷ 6.', show: 'plan.0' },
        { say: 'Multiply by the reciprocal, 1 sixth.', caption: 'Multiply by the reciprocal, 1/6.', show: 'plan.1' },
        { say: 'Then simplify.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide, multiply, simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac34 \\div \\adj{6}', '= \\dfrac34 \\times \\dfrac16 = \\dfrac{3}{24}', '= \\dfrac{3 \\div 3}{24 \\div 3} = \\good{\\dfrac18 \\text{ yard}}'] }],
      lines: [
        { say: 'Step one. Each ribbon is 3 quarters divided by 6.', caption: 'Step one. Each ribbon is 3/4 ÷ 6.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Dividing by 6 is multiplying by 1 sixth. 3 times 1 is 3, and 4 times 6 is 24: 3 over 24.', caption: 'Step two. Dividing by 6 is multiplying by 1/6. 3 × 1 = 3, and 4 × 6 = 24: 3/24.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Divide the top and the bottom by 3. 3 over 24 is 1 eighth. Each doll\'s ribbon is 1 eighth of a yard.', caption: 'Step three. Divide the top and the bottom by 3. 3/24 is 1/8. Each doll’s ribbon is 1/8 of a yard.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [ribbon('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['6 \\times \\dfrac18 = \\dfrac68 = \\dfrac34 \\ \\checkmark', '\\tfrac34 \\text{ yd} = 27 \\text{ in}, \\ 27 \\div 6 = 4.5 \\text{ in} = \\tfrac18 \\text{ yd} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Cut the ribbon into eighths of a yard. There are exactly 6 pieces, one for each doll.', show: ['ck.frame', ...pieces('ck', 6)] },
        { say: '6 pieces of 1 eighth make 6 eighths, which is 3 quarters: the whole ribbon.', caption: '6 pieces of 1/8 make 6/8, which is 3/4: the whole ribbon.', show: 'm.0', focus: 'm.0' },
        { say: 'In inches: 3 quarters of 36 inches is 27 inches. 27 shared 6 ways is 4.5 inches, and an eighth of 36 inches is also 4.5 inches. It checks out.', caption: 'In inches: 3/4 of 36 inches is 27 inches. 27 shared 6 ways is 4.5 inches, and 1/8 of 36 inches is also 4.5 inches. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$4\\tfrac12$ yd', 'multiplied by $6$: sharing into $6$ parts means **divide**'],
            ['$8$ yd', 'divided $6$ by $\\tfrac34$: it is ribbon $\\div$ dolls'],
            ['$\\tfrac{1}{24}$ yd', 'lost the $3$: $\\tfrac34 \\times \\tfrac16 = \\tfrac{3}{24}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 and a half yards multiplies by 6. Each piece must be shorter than the whole ribbon, so divide.', caption: '4 1/2 yards multiplies by 6. Each piece must be shorter than the whole ribbon, so divide.' },
        { say: '8 yards divides 6 by 3 quarters. That is the wrong way round: divide the ribbon by the number of dolls.', caption: '8 yards divides 6 by 3/4. That is the wrong way round: divide the ribbon by the number of dolls.' },
        { say: 'And 1 twenty-fourth loses the 3 on top. 3 quarters times 1 sixth is 3 twenty-fourths, which is 1 eighth.', caption: 'And 1/24 loses the 3 on top. 3/4 × 1/6 = 3/24, which is 1/8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $\\tfrac23$ kg bag of nuts is shared equally among $4$ friends. How much does each friend get?',
          choices: ['$2\\tfrac23$ kg', '$6$ kg', '$\\tfrac16$ kg', '$\\tfrac{1}{12}$ kg'],
          answer: 2,
          working: '2/3 ÷ 4 = 2/3 × 1/4 = 2/12 = 1/6 kg.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag of nuts weighing 2 thirds of a kilogram is shared equally among 4 friends. How much does each friend get? Pause the video and try it.', caption: 'Your turn. A 2/3 kg bag of nuts is shared equally among 4 friends. How much does each friend get? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 thirds divided by 4 is 2 thirds times 1 quarter, which is 2 twelfths, or 1 sixth of a kilogram. Choice "C".', caption: '2/3 ÷ 4 = 2/3 × 1/4 = 2/12, or 1/6 kg. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Share into equal parts: **divide**', 'Dividing by $6$: **times** $\\tfrac16$', '**Simplify** the answer', 'Check: the parts add back to the **whole**'] }],
      lines: [
        { say: 'Here is what to remember. To share into equal parts, divide.', show: 'sum.0' },
        { say: 'Dividing by a whole number is multiplying by its reciprocal: dividing by 6 is times 1 sixth.', caption: 'Dividing by a whole number is multiplying by its reciprocal: dividing by 6 is times 1/6.', show: 'sum.1' },
        { say: 'Simplify the answer.', show: 'sum.2' },
        { say: 'And check that the parts add back to the whole. For more on solving fraction problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
