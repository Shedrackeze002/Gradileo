import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 10.1 (units of area). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids,
// CC BY-NC-SA 4.0). A length is linear measure, a surface covered is square measure, and space
// filled is cubic measure: (a) cubic (b) linear (c) square (d) linear (e) square (f) cubic, as in the
// book's answer.

const QUESTION =
  'Determine whether you would use linear, square, or cubic measure for each item. (a) amount of paint in a can (b) height of a tree (c) floor of your bedroom (d) diameter of bike wheel (e) size of a piece of sod (f) amount of water in a swimming pool';

const video: Explainer = {
  id: 'xq-m5-10-1',
  lessonId: '',
  exam: {
    lesson: 'm5-10-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: Length, Area or Volume? (Units of Area)',
  thumbnailTitle: 'Linear, Square or Cubic?',
  summary:
    'A real test question, solved one small step at a time: would you use linear, square or cubic measure for paint in a can, the height of a tree, a bedroom floor, the diameter of a bike wheel, a piece of sod, and the water in a swimming pool? A length uses linear measure, a surface that is covered uses square measure, and a space that is filled uses cubic measure. Then we check with units and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Linear, Square or Cubic?', subtitle: 'Units of area, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about choosing the right kind of measure. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine whether you would use linear, square, or cubic measure for each item. (a) amount of paint in a can (b) height of a tree (c) floor of your bedroom (d) diameter of bike wheel (e) size of a piece of sod (f) amount of water in a swimming pool',
          answer: '(a) cubic (b) linear (c) square (d) linear (e) square (f) cubic',
          working: 'length: linear; surface: square; space filled: cubic',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Decide whether you would use linear, square, or cubic measure for each item. a, the amount of paint in a can. b, the height of a tree. c, the floor of your bedroom. d, the diameter of a bike wheel. e, the size of a piece of sod. And f, the amount of water in a swimming pool.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'New words', md: 'The **diameter** of a wheel is the distance straight **across** it, through the middle. **Sod** is a flat piece of grass with a thin layer of soil, laid on the ground to make a lawn.' }],
      lines: [
        { say: 'Two words first. The diameter of a wheel is the distance straight across it, through the middle.', show: 'c' },
        { say: 'And sod is a flat piece of grass with a thin layer of soil, which people lay on the ground to make a lawn.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Measure', 'Measures', 'Units'],
          rows: [
            ['**linear**', 'a **length**: how long, tall or far', '$\\text{cm}$, $\\text{m}$'],
            ['**square**', 'an **area**: how much surface is **covered**', '$\\text{cm}^2$, $\\text{m}^2$'],
            ['**cubic**', 'a **volume**: how much space is **filled**', '$\\text{cm}^3$, $\\text{m}^3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. Linear measure is for a length: how long, how tall, or how far. We use units like centimetres and metres.', show: 't', focus: 't.0' },
        { say: 'Square measure is for an area: how much surface something covers. We use square units, like square metres.', focus: 't.1' },
        { say: 'Cubic measure is for a volume: how much space something fills. We use cubic units, like cubic metres.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Ask: is it a **length**?', 'Is it a **surface** that is covered?', 'Is it a **space** that is filled?'] }],
      lines: [
        { say: 'Here is the plan. For each item, ask: is it a length?', show: 'plan.0' },
        { say: 'Is it a surface that is covered?', show: 'plan.1' },
        { say: 'Or is it a space that is filled?', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step by step: Each item',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 's',
          head: ['Item', 'What we measure', 'Measure'],
          rows: [
            ['(a) paint in a can', 'the **space** the paint fills', '**cubic**'],
            ['(b) height of a tree', 'how **tall**: a length', '**linear**'],
            ['(c) floor of your bedroom', 'the **surface** of the floor', '**square**'],
            ['(d) diameter of bike wheel', 'the distance **across**: a length', '**linear**'],
            ['(e) a piece of sod', 'the **ground** it covers', '**square**'],
            ['(f) water in a pool', 'the **space** the water fills', '**cubic**'],
          ],
        },
      ],
      lines: [
        { say: 'Part a. Paint fills the can, so we measure space. That is cubic measure.', show: 's', focus: 's.0' },
        { say: 'Part b. The height of a tree is how tall it is, which is a length. That is linear measure.', focus: 's.1' },
        { say: 'Part c. The floor of your bedroom is a surface. That is square measure.', focus: 's.2' },
        { say: 'Part d. The diameter is the distance across the wheel, which is a length. That is linear measure.', focus: 's.3' },
        { say: 'Part e. Sod is laid flat to cover the ground, so we care how much surface it covers. That is square measure.', focus: 's.4' },
        { say: 'Part f. Water fills the pool, so we measure space. That is cubic measure.', focus: 's.5' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{tree: } 12\\ \\text{m} \\ \\checkmark', '\\text{bedroom floor: } 12\\ \\text{m}^2 \\ \\checkmark', '\\text{pool: } 50\\ \\text{m}^3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by writing a measurement with its unit. A tree could be 12 metres tall: a length, so linear.', show: 'm.0' },
        { say: 'A bedroom floor could be 12 square metres: an area, so square.', show: 'm.1' },
        { say: 'And a pool could hold 50 cubic metres of water: a volume, so cubic. Each unit fits. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['(d) square', 'the wheel is flat and round, but the **diameter** is a **length**'],
            ['(e) cubic', 'sod is thin: we care how much **ground** it **covers**'],
            ['(f) square', 'the pool has a surface, but the **water fills** a space'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A wheel looks like a flat round shape, but the diameter is only the distance across it. That is a length.' },
        { say: 'Sod has some thickness, but it is thin, and we buy it to cover the ground. That is an area.' },
        { say: 'And the top of a pool is a surface, but the question asks about the water inside, which fills a space.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which would you measure with **square** measure?',
          choices: ['the size of a soccer field', 'the length of a pencil', 'the amount of juice in a jug', 'the height of a door'],
          answer: 0,
          working: 'A soccer field is a surface that is covered with grass: square measure.',
        },
      ],
      lines: [
        { say: 'Your turn. Which would you measure with square measure? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A pencil\'s length and a door\'s height are lengths. Juice fills a jug, which is a space. The soccer field is a surface. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Linear**: a length, like $\\text{m}$', '**Square**: a surface covered, like $\\text{m}^2$', '**Cubic**: a space filled, like $\\text{m}^3$', '**Check** by writing the unit'] }],
      lines: [
        { say: 'Here is what to remember. Linear measure is for a length, in units like metres.', show: 'sum.0' },
        { say: 'Square measure is for a surface that is covered, in square units.', show: 'sum.1' },
        { say: 'Cubic measure is for a space that is filled, in cubic units.', show: 'sum.2' },
        { say: 'And check by writing a measurement with its unit. For more on units of area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
