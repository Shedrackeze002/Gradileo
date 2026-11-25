import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 8.1 (scale drawings). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and the Pythagorean
// Theorem, CC BY-NC-SA 4.0). The scale is 2.5 : 30 = 1 : 12, so the height is 35 ÷ 12 = 2.916... ≈ 2.9
// feet, as in the book's answer. Check: 1 : 12 turns each foot of the house into 1 inch, so 35 feet
// becomes 35 inches, and 35 ÷ 12 ≈ 2.9 feet.

const QUESTION =
  'Building a scale model Joe wants to build a doll house for his daughter. He wants the doll house to look just like his house. His house is 30 feet wide and 35 feet tall at the highest point of the roof. If the dollhouse will be 2.5 feet wide, how tall will its highest point be?';

const video: Explainer = {
  id: 'xq-m204-8-1',
  lessonId: '',
  exam: {
    lesson: 'm204-8-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: A Dollhouse to Scale (Scale Drawings)',
  thumbnailTitle: 'How Tall Is the Dollhouse?',
  summary:
    'A real test question, solved one small step at a time: Joe’s house is 30 feet wide and 35 feet tall. A dollhouse just like it will be 2.5 feet wide. How tall will it be? The scale is 2.5 : 30, which is 1 : 12, so the height is 35 ÷ 12 ≈ 2.9 feet. Then we check by turning each foot of the house into an inch, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Dollhouse?', subtitle: 'Scale, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a scale model. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            '**Building a scale model** Joe wants to build a doll house for his daughter. He wants the doll house to look just like his house. His house is $30$ feet wide and $35$ feet tall at the highest point of the roof. If the dollhouse will be $2.5$ feet wide, how tall will its highest point be?',
          answer: 'about $2.9$ feet',
          working: '2.5 ÷ 30 = 1/12; 35 ÷ 12 ≈ 2.9',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Joe wants to build a dollhouse for his daughter that looks just like his house. His house is 30 feet wide, and 35 feet tall at the highest point of the roof. If the dollhouse will be 2.5 feet wide, how tall will its highest point be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Width', 'Height'], rows: [['House', '$30$ ft', '$35$ ft'], ['Dollhouse', '$2.5$ ft', '$?$']] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'A scale model', md: 'A **scale model** has the **same shape** as the real thing, so **every** length is shrunk by the **same** factor.' },
      ],
      lines: [
        { say: 'Here is what we know. The house is 30 feet wide and 35 feet tall. The dollhouse is 2.5 feet wide, and we want its height.', show: 't' },
        { say: 'To look just like the house, the dollhouse must be a scale model. Every length is shrunk by the same factor, so the shape stays the same.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{scale} = \\dfrac{\\text{model length}}{\\text{real length}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Using the scale', md: 'Find the scale from a pair you know. Then **model** $=$ **real** $\\times$ **scale**.' },
      ],
      lines: [
        { say: 'Here is what we need. The scale is the model length divided by the real length.', show: 'm' },
        { say: 'Find the scale from a pair of lengths you know. Then any model length is the real length times the scale.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **scale** from the widths', '**Multiply** the real height by the scale', 'Round to the nearest **tenth**'] }],
      lines: [
        { say: 'Here is the plan. Find the scale from the two widths.', show: 'plan.0' },
        { say: 'Multiply the real height by the scale.', show: 'plan.1' },
        { say: 'Then round, to the nearest tenth like the book.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The height',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{scale} = \\dfrac{2.5}{30} = \\dfrac{1}{12}', 'h = 35 \\times \\dfrac{1}{12} = 35 \\div 12', 'h = 2.91\\ldots \\approx \\good{2.9 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. The scale is 2.5 divided by 30, which is 1 twelfth. The dollhouse is one twelfth the size of the real house.', show: 'm.0' },
        { say: 'Step two. So its height is 35 times 1 twelfth, which is 35 divided by 12.', show: 'm.1' },
        { say: 'Step three. 35 divided by 12 is 2.91, and so on. To the nearest tenth, the dollhouse will be about 2.9 feet tall.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 : 12 \\text{ turns each foot into 1 inch}', '35 \\text{ ft} \\to 35 \\text{ in} = 2 \\text{ ft } 11 \\text{ in}', '35 \\div 12 \\approx 2.9 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. A foot is 12 inches, so a scale of 1 to 12 turns each foot of the house into 1 inch of dollhouse.', show: 'm.0' },
        { say: 'So 30 feet wide becomes 30 inches, which is the 2.5 feet we were told. And 35 feet tall becomes 35 inches, which is 2 feet 11 inches.', show: 'm.1' },
        { say: '35 inches divided by 12 is about 2.9 feet. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$420$ ft', 'scaled the wrong way: a model is **smaller**'],
            ['$7.5$ ft', '**added** $5$ ft: scale **multiplies**, it does not add'],
            ['$2.1$ ft', 'mixed up the pairs: $30 \\times 2.5 \\div 35$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '420 feet multiplies by 12 instead of dividing. A dollhouse is smaller than a house, not bigger.' },
        { say: '7.5 feet keeps the height 5 feet more than the width, as in the real house. But a scale shrinks every length by the same factor. It does not take away the same amount.' },
        { say: 'And 2.1 feet mixes up the pairs. Keep the widths together and the heights together.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A model car is built at a scale of $1 : 24$. The real car is $4.8$ m long. How long is the model?',
          choices: ['$20$ cm', '$115.2$ m', '$4.8$ cm', '$200$ cm'],
          answer: 0,
          working: '4.8 ÷ 24 = 0.2 m = 20 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A model car is built at a scale of 1 to 24. The real car is 4.8 metres long. How long is the model? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4.8 divided by 24 is 0.2 metres, which is 20 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Scale $=$ model $\\div$ real', 'Model $=$ real $\\times$ scale', 'Every length shrinks by the **same factor**', 'A model is **smaller** than the real thing'] }],
      lines: [
        { say: 'Here is what to remember. The scale is the model length divided by the real length.', show: 'sum.0' },
        { say: 'A model length is the real length times the scale.', show: 'sum.1' },
        { say: 'Every length shrinks by the same factor.', show: 'sum.2' },
        { say: 'And a model should come out smaller than the real thing. For more on scale drawings, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
