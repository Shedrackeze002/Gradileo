import type { DiagramEl, DiagramTone, Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 5.2 (adding and subtracting fractions). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 4.4, Add and Subtract Fractions with
// Common Denominators, CC BY-NC-SA 4.0). 5/8 − 3/8 = 2/8 = 1/4 cup, as in the book's answer.
// Check: 3/8 + 2/8 = 5/8.

const QUESTION =
  'Baking Janet needs 5/8 of a cup of flour for a recipe she is making. She only has 3/8 of a cup of flour and will ask to borrow the rest from her next-door neighbor. How much flour does she have to borrow?';

/** A cup split into eighths: the 3 Janet has (blue) and the 2 more she needs (orange). */
const cup = (): DiagramEl => ({
  kind: 'diagram',
  id: 'cup',
  height: 220,
  points: Object.fromEntries(Array.from({ length: 9 }, (_, i) => [[`b${i}`, [i, 0]], [`t${i}`, [i, 1]]]).flat()) as Record<string, [number, number]>,
  items: [
    ...Array.from({ length: 8 }, (_, i) => ({
      kind: 'region' as const,
      id: `p${i}`,
      points: [`b${i}`, `b${i + 1}`, `t${i + 1}`, `t${i}`],
      tone: (i < 3 ? 'adj' : i < 5 ? 'opp' : 'muted') as DiagramTone,
      shade: i < 5 ? 0.6 : 0.08,
      ...(i < 3 ? { group: 'have' } : i < 5 ? { group: 'need' } : {}),
    })),
    ...Array.from({ length: 8 }, (_, i) => ({ kind: 'curve' as const, id: `e${i}`, points: [`b${i}`, `b${i + 1}`, `t${i + 1}`, `t${i}`], closed: true, tone: 'ink' as const, weight: 2 })),
  ],
});

const video: Explainer = {
  id: 'xq-m5-5-2',
  lessonId: '',
  exam: {
    lesson: 'm5-5-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.4, Add and Subtract Fractions with Common Denominators',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-4-add-and-subtract-fractions-with-common-denominators',
    question: QUESTION,
  },
  title: 'Exam Question: Borrowing Flour From a Neighbour (Subtracting Fractions)',
  thumbnailTitle: 'How Much Flour to Borrow?',
  summary:
    'A real test question, solved one small step at a time: Janet needs 5/8 of a cup of flour but has only 3/8 of a cup. How much must she borrow? The fractions have the same denominator, so we subtract the numerators: 5/8 − 3/8 = 2/8, which simplifies to 1/4 of a cup. Then we check by adding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Flour to Borrow?', subtitle: 'Subtracting fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about subtracting fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Baking** Janet needs $\\tfrac{5}{8}$ of a cup of flour for a recipe she is making. She only has $\\tfrac{3}{8}$ of a cup of flour and will ask to borrow the rest from her next-door neighbor. How much flour does she have to borrow?',
          answer: '$\\tfrac{1}{4}$ cup',
          working: '5/8 − 3/8 = 2/8 = 1/4',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Janet needs 5 eighths of a cup of flour for a recipe. She only has 3 eighths of a cup, and will borrow the rest from her next-door neighbour. How much flour does she have to borrow?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        cup(),
        { kind: 'callout', id: 'c', tone: 'definition', title: 'The rest', md: 'The cup is split into **$8$ equal parts**. Janet has $3$ of them (blue) and needs $5$. "The rest" is the **difference**: the parts she still needs (orange).' },
      ],
      lines: [
        { say: 'Picture a cup split into 8 equal parts. Janet has 3 of them, in blue, but needs 5.', show: ['cup', 'cup.have'] },
        { say: 'The rest is the part she still needs, in orange. To find how much that is, we subtract: 5 eighths minus 3 eighths.', show: ['cup.need', 'c'], focus: 'cup.need' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a - b}{c}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same denominator', md: 'When the **denominators** (bottom numbers) are the **same**, subtract the **numerators** (top numbers) and **keep** the denominator. Then **simplify** if you can.' },
      ],
      lines: [
        { say: 'Here is what we need. When two fractions have the same bottom number, the denominator, subtract the top numbers, the numerators.', show: 'm' },
        { say: 'Keep the same denominator, because the size of the parts does not change. Then simplify the answer if you can.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Subtract** the numerators', '**Keep** the denominator', '**Simplify**'] }],
      lines: [
        { say: 'Here is the plan. Subtract the numerators.', show: 'plan.0' },
        { say: 'Keep the denominator.', show: 'plan.1' },
        { say: 'Then simplify.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{8} - \\dfrac{3}{8} = \\dfrac{5 - 3}{8}', '= \\dfrac{2}{8}', '= \\dfrac{2 \\div 2}{8 \\div 2} = \\good{\\dfrac{1}{4} \\text{ cup}}'] }],
      lines: [
        { say: 'Step one. Subtract the numerators: 5 minus 3.', show: 'm.0' },
        { say: 'Step two. 5 minus 3 is 2, and the denominator stays 8. So the difference is 2 eighths.', show: 'm.1' },
        { say: 'Step three. Simplify. 2 and 8 can both be divided by 2. That gives 1 quarter. Janet must borrow 1 quarter of a cup of flour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by adding. What she has, 3 eighths, plus what she borrows, 2 eighths, is 5 eighths. That is exactly what the recipe needs. It checks out.', show: 'm', focus: 'm' },
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
            ['$\\tfrac{2}{0}$', 'subtracted the **denominators** too: keep the $8$'],
            ['$1$', '**added** $\\tfrac{5}{8} + \\tfrac{3}{8}$: the rest means **subtract**'],
            ['$2$ cups', 'dropped the denominator: it is $\\tfrac{2}{8}$ of a cup'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Subtracting the bottom numbers too gives 8 minus 8, which is 0. The parts are still eighths, so keep the 8.' },
        { say: 'Adding the fractions gives a whole cup. But she needs only the rest, so subtract.' },
        { say: 'And 2 cups forgets the denominator. It is 2 eighths of a cup, which is 1 quarter.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The walk to school is $\\tfrac{7}{10}$ km. Sam has walked $\\tfrac{3}{10}$ km so far. How much farther does he have to walk?',
          choices: ['$\\tfrac{10}{10}$ km', '$\\tfrac{4}{0}$ km', '$4$ km', '$\\tfrac{2}{5}$ km'],
          answer: 3,
          working: '7/10 − 3/10 = 4/10 = 2/5.',
        },
      ],
      lines: [
        { say: 'Your turn. The walk to school is 7 tenths of a kilometre. Sam has walked 3 tenths of a kilometre so far. How much farther does he have to walk? Pause the video and try it.', caption: 'Your turn. The walk to school is 7/10 km. Sam has walked 3/10 km so far. How much farther does he have to walk? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '7 tenths minus 3 tenths is 4 tenths. Divide the top and bottom by 2 to get 2 fifths of a kilometre. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same denominator: subtract the **numerators**', '**Keep** the denominator', '**Simplify** the answer', '**Check** by adding'] }],
      lines: [
        { say: 'Here is what to remember. When the denominators are the same, subtract the numerators.', show: 'sum.0' },
        { say: 'Keep the denominator.', show: 'sum.1' },
        { say: 'Simplify the answer.', show: 'sum.2' },
        { say: 'And check by adding. For more on adding and subtracting fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
