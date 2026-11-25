import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Exam question for Math 6 lesson 4.2 (adding and subtracting fractions). The question is an
// Everyday Math exercise from OpenStax Prealgebra 2e, word for word (section 4.5, Add and Subtract
// Fractions with Different Denominators, CC BY-NC-SA 4.0). 3/8 = 6/16, so 3/16 + 6/16 = 9/16 yard,
// which is already in lowest terms (9 and 16 share no factor but 1).

const QUESTION =
  'Decorating Laronda is making covers for the throw pillows on her sofa. For each pillow cover, she needs 3/16 yard of print fabric and 3/8 yard of solid fabric. What is the total amount of fabric Laronda needs for each pillow cover?';

const TONES: DiagramTone[] = [...Array(3).fill('theta'), ...Array(6).fill('adj')];

/** The two fabrics as bars of one yard, then the solid fabric in sixteenths, then the total. */
const bars = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'print', parts: 16, shaded: 3, tone: 'theta', width: 10, height: 0.8, at: [0, 4.2], label: '\\tfrac{3}{16}' }),
      bar({ name: 'solid', parts: 8, shaded: 3, tone: 'adj', width: 10, height: 0.8, at: [0, 2.8], label: '\\tfrac{3}{8}' }),
      bar({ name: 'six', parts: 16, shaded: 6, tone: 'adj', width: 10, height: 0.8, at: [0, 1.4], label: '\\tfrac{6}{16}' }),
      bar({ name: 'sum', parts: 16, shaded: 9, tones: TONES, width: 10, height: 0.8, at: [0, 0], label: '\\tfrac{9}{16}' }),
    ],
    380,
  );

const video: Explainer = {
  id: 'xq-m6-4-2',
  lessonId: '',
  exam: {
    lesson: 'm6-4-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.5, Add and Subtract Fractions with Different Denominators',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-5-add-and-subtract-fractions-with-different-denominators',
    question: QUESTION,
  },
  title: 'Exam Question: Fabric for a Pillow Cover (Adding and Subtracting Fractions)',
  thumbnailTitle: '3/16 Yard Plus 3/8 Yard',
  thumbnail: 'fb',
  summary:
    'A real test question, solved one small step at a time: a pillow cover needs 3/16 yard of print fabric and 3/8 yard of solid fabric. How much fabric is that in all? The denominators are different, so we change 3/8 to 6/16, and then add: 3/16 + 6/16 = 9/16 yard. Then we check and look at the traps, like adding the denominators.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '3/16 Yard Plus 3/8 Yard', subtitle: 'Adding and subtracting fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Decorating** Laronda is making covers for the throw pillows on her sofa. For each pillow cover, she needs $\\tfrac{3}{16}$ yard of print fabric and $\\tfrac{3}{8}$ yard of solid fabric. What is the total amount of fabric Laronda needs for each pillow cover?',
          answer: '$\\tfrac{9}{16}$ yard',
          working: '3/16 + 6/16 = 9/16',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Laronda is making covers for the throw pillows on her sofa. For each pillow cover, she needs 3 sixteenths of a yard of print fabric, and 3 eighths of a yard of solid fabric. What is the total amount of fabric Laronda needs for each pillow cover?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Total fabric', md: 'A **yard** is a length, a little less than a metre. One cover uses **two** pieces of fabric, so the **total** is $\\tfrac{3}{16} + \\tfrac{3}{8}$ of a yard.' }],
      lines: [
        { say: 'A yard is a length, a little less than a metre.', show: 'c' },
        { say: 'One pillow cover uses two pieces of fabric. The total is the two amounts added: 3 sixteenths plus 3 eighths of a yard.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Adding fractions', md: 'We can only add fractions with the **same denominator**, the same size of piece. If they are different, change one to an **equivalent** fraction first. Then add the **numerators** and **keep** the denominator.' }],
      lines: [
        { say: 'Here is what we need. We can only add fractions when the pieces are the same size, which means the same denominator.', show: 'c' },
        { say: 'If the denominators are different, change one fraction to an equivalent fraction first. Then add the numerators, and keep the denominator.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find a **common denominator**', 'Change $\\tfrac{3}{8}$ to **sixteenths**', '**Add** the numerators'] }],
      lines: [
        { say: 'Here is the plan. Find a common denominator.', show: 'plan.0' },
        { say: 'Change 3 eighths to sixteenths.', show: 'plan.1' },
        { say: 'Then add the numerators.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Add',
      layout: 'split',
      leftWidth: 600,
      left: [bars('fb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['16 = 8 \\times 2', '\\tfrac{3}{8} = \\tfrac{3 \\times 2}{8 \\times 2} = \\tfrac{6}{16}', '\\tfrac{3}{16} + \\tfrac{6}{16} = \\good{\\tfrac{9}{16}}'] }],
      lines: [
        { say: 'Here are the two fabrics as parts of one yard. The print fabric is 3 sixteenths, and the solid fabric is 3 eighths. The pieces are different sizes.', show: ['fb.print-frame', 'fb.print-shade', 'fb.print-label', 'fb.solid-frame', 'fb.solid-shade', 'fb.solid-label'] },
        { say: 'Step one. 16 is 8 times 2, so 16 can be the common denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply the top and bottom of 3 eighths by 2. That gives 6 sixteenths. Cutting each eighth in half shows the same amount of fabric.', show: ['fb.six-frame', 'fb.six-shade', 'fb.six-label', 'm.1'], focus: ['fb.six-shade', 'm.1'] },
        { say: 'Step three. Now the pieces are the same size. 3 sixteenths plus 6 sixteenths is 9 sixteenths. Laronda needs 9 sixteenths of a yard for each cover.', show: ['fb.sum-frame', 'fb.sum-shade', 'fb.sum-label', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{9}{16} - \\tfrac{3}{16} = \\tfrac{6}{16} = \\tfrac{3}{8} \\ \\checkmark', '\\tfrac{9}{16} < 1 \\text{ yard} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by subtracting. 9 sixteenths minus the 3 sixteenths of print leaves 6 sixteenths, which is 3 eighths, the solid fabric.', show: 'm.0' },
        { say: 'And two small pieces make less than one yard, which makes sense. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\tfrac{6}{24}$', 'added the **denominators**: keep the size of the piece'],
            ['$\\tfrac{6}{16}$', 'added $3 + 3$ without changing $\\tfrac{3}{8}$ first'],
            ['$\\tfrac{6}{8}$', 'turned $\\tfrac{3}{16}$ into $\\tfrac{3}{8}$ by changing only the **bottom**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 twenty-fourths adds the tops and the bottoms. The denominator is the size of the piece, so it is not added.' },
        { say: '6 sixteenths adds the 3 and 3 before making the pieces the same size.' },
        { say: 'And 6 eighths comes from turning 3 sixteenths into 3 eighths by changing only the bottom. That makes the pieces twice as big. Change the top and the bottom by the same number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A recipe uses $\\tfrac{1}{4}$ cup of milk and $\\tfrac{3}{8}$ cup of water. How much liquid is that in all?',
          choices: ['$\\tfrac{4}{12}$ cup', '$\\tfrac{5}{8}$ cup', '$\\tfrac{4}{8}$ cup', '$\\tfrac{1}{2}$ cup'],
          answer: 1,
          working: '1/4 = 2/8, and 2/8 + 3/8 = 5/8.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses 1 quarter cup of milk and 3 eighths cup of water. How much liquid is that in all? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1 quarter is 2 eighths, and 2 eighths plus 3 eighths is 5 eighths of a cup. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add only **same-size** pieces', 'Change to an **equivalent** fraction first', 'Add the **numerators**, keep the denominator', 'Never add the **denominators**'] }],
      lines: [
        { say: 'Here is what to remember. We can only add pieces of the same size.', show: 'sum.0' },
        { say: 'Change a fraction to an equivalent fraction first, multiplying the top and bottom by the same number.', show: 'sum.1' },
        { say: 'Add the numerators, and keep the denominator.', show: 'sum.2' },
        { say: 'And never add the denominators. For more on adding and subtracting fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
