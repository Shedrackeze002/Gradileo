import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Exam question for Math 7 lesson 7.3 (area of a triangle). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles, Triangles, and
// Trapezoids, CC BY-NC-SA 4.0). A = ½bh: 126 = ½ × 18 × h = 9h, so h = 14 inches. The figure is
// drawn at a quarter of the size (4.5 by 3.5).

const QUESTION = 'The area of a triangular painting is 126 square inches. The base is 18 inches. What is the height?';

const art = (id: string, h: string) => figure(id, [triangle({ b: 4.5, apex: [1.8, 3.5], labels: { b: '18 \\text{ in}', h } })], 360);

const video: Explainer = {
  id: 'xq-m7-7-3',
  lessonId: '',
  exam: {
    lesson: 'm7-7-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Triangular Painting? (Area of a Triangle)',
  thumbnailTitle: 'How Tall Is the Painting?',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: a triangular painting has an area of 126 square inches and a base of 18 inches. What is its height? The area of a triangle is half of base times height, so 126 = ½ × 18 × h. Half of 18 is 9, so 126 = 9h, and dividing both sides by 9 gives h = 14 inches. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Painting?', subtitle: 'Area of a triangle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The area of a triangular painting is $126$ square inches. The base is $18$ inches. What is the height?',
          answer: '$14$ inches',
          working: '126 = ½ × 18 × h = 9h, h = 14',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The area of a triangular painting is 126 square inches. The base is 18 inches. What is the height?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [art('ask', 'h = ?')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Working backwards', md: 'Usually we know the base and height and find the **area**. This time we know the **area**, $126$ in², and the **base**, $18$ in. We must work **backwards** to find the **height**.' }],
      lines: [
        { say: 'Here is the painting. Usually we know the base and the height, and find the area.', show: ['ask.shape', 'ask.base', 'c'] },
        { say: 'This time we know the area, 126 square inches, and the base, 18 inches. We must work backwards to find the height.', show: 'ask.h', focus: 'ask.h' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = \\dfrac{1}{2} b h', '\\text{a triangle is half of a rectangle}'] }],
      lines: [
        { say: 'Here is what we need. The area of a triangle is one half, times the base, times the height.', show: 'm.0' },
        { say: 'That is because a triangle is half of a rectangle with the same base and height.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put $A = 126$ and $b = 18$ into the **formula**', '**Simplify**: half of $18$', '**Divide** to find $h$'] }],
      lines: [
        { say: 'Here is the plan. Put the area and the base into the formula.', show: 'plan.0' },
        { say: 'Simplify: half of 18.', show: 'plan.1' },
        { say: 'Then divide to find the height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Work backwards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['126 = \\dfrac{1}{2} \\times \\adj{18} \\times h', '126 = \\adj{9} h', '\\dfrac{126}{9} = \\dfrac{9h}{9}', '\\good{h = 14 \\text{ inches}}'] }],
      lines: [
        { say: 'Step one. Put the area, 126, and the base, 18, into the formula: 126 equals one half, times 18, times "h".', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Half of 18 is 9. So 126 equals 9 "h".', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. "h" is multiplied by 9, so divide both sides by 9.', show: 'm.2', focus: 'm.2' },
        { say: '126 divided by 9 is 14. The height is 14 inches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 460,
      left: [art('ck', '14 \\text{ in}')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{1}{2} \\times 18 \\times 14', '= 9 \\times 14', '= 126 \\text{ in}^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put the height back into the formula: one half, times 18, times 14.', show: ['ck.shape', 'ck.base', 'ck.h', 'm.0'], focus: 'm.0' },
        { say: 'Half of 18 is 9, and 9 times 14 is 126 square inches, the area in the question. It checks out.', show: ['m.1', 'm.2'], focus: 'm.2' },
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
            ['$7$ in', 'used $A = bh$: a triangle\'s area has the **half**'],
            ['$28$ in', 'halved again: $\\tfrac{1}{2} \\times 18$ is $9$, then divide by $9$ only'],
            ['$1134$ in', 'multiplied by $9$: undo **times** by **dividing**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '7 inches leaves out the half: 126 divided by 18 is 7. But a triangle is half of a rectangle, so its area is half of base times height.' },
        { say: '28 inches divides by 9 and then doubles. Once you have 126 equals 9 "h", just divide by 9.' },
        { say: 'And 1 thousand 134 inches multiplies 126 by 9. To undo times 9, divide by 9.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangle has an area of $60$ cm² and a height of $10$ cm. What is its base?',
          choices: ['$12$ cm', '$6$ cm', '$3$ cm', '$600$ cm'],
          answer: 0,
          working: '60 = ½ × b × 10 = 5b, so b = 12 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has an area of 60 square centimetres and a height of 10 centimetres. What is its base? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '60 equals one half times "b" times 10. Half of 10 is 5, so 60 equals 5 "b", and "b" is 12 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$A = \\tfrac{1}{2} b h$', 'Put in what you **know**', '**Simplify**, then **divide**', 'Put the answer **back** to check'] }],
      lines: [
        { say: 'Here is what to remember. The area of a triangle is one half, base times height.', show: 'sum.0' },
        { say: 'Put in what you know.', show: 'sum.1' },
        { say: 'Simplify, then divide to find what is missing.', show: 'sum.2' },
        { say: 'And put the answer back in to check. For more on the area of a triangle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
