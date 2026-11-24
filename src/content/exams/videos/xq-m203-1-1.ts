import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 1.1 (slope). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 11.4, Understand Slope of a Line, CC BY-NC-SA 4.0). The
// book's picture shows the 12-inch level and 4 inches from its far end down to the roof, so the
// slope is rise ÷ run = 4 ÷ 12 = 1/3, as in the book's answer. Check: 12 × 1/3 = 4.

/** The roof, the level laid on it, and the 4-inch drop from the far end of the level, to scale. */
const roof = (height = 340): DiagramEl => ({
  kind: 'diagram',
  id: 'rf',
  height,
  points: { P: [0, 0], Q: [18, 6], V: [3, 5], U: [15, 5], W: [3, 1] },
  items: [
    { kind: 'line', id: 'roof', from: 'P', to: 'Q', tone: 'ink', weight: 5, group: 'roof' },
    { kind: 'line', id: 'lvl', from: 'V', to: 'U', tone: 'adj', weight: 6, label: '12 \\text{ in}', labelSide: 'left', group: 'level' },
    { kind: 'line', id: 'drop', from: 'V', to: 'W', tone: 'opp', weight: 3, label: '4 \\text{ in}', labelSide: 'right', group: 'drop' },
  ],
});

const QUESTION =
  'Slope of a roof. A fairly easy way to determine the slope is to take a 12-inch level and set it on one end on the roof surface. Then take a tape measure or ruler, and measure from the other end of the level down to the roof surface. You can use these measurements to calculate the slope of the roof. What is the slope of the roof in this picture? [The picture shows the 12-inch level and a drop of 4 inches from its other end down to the roof.]';

const video: Explainer = {
  id: 'xq-m203-1-1',
  lessonId: '',
  exam: {
    lesson: 'm203-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 11.4, Understand Slope of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-4-understand-slope-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: The Slope of a Roof (Slope)',
  thumbnailTitle: 'What Is the Slope of This Roof?',
  thumbnail: 'rf',
  summary:
    'A real test question, solved one small step at a time: a 12-inch level is set with one end on a roof, and it is 4 inches from the other end of the level down to the roof. What is the slope of the roof? The level is the run, 12 inches, and the drop is the rise, 4 inches. Slope is rise over run, 4/12, which simplifies to 1/3. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Slope of a Roof', subtitle: 'Slope, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about slope. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Slope of a roof. A fairly easy way to determine the slope is to take a 12-inch level and set it on one end on the roof surface. Then take a tape measure or ruler, and measure from the other end of the level down to the roof surface. You can use these measurements to calculate the slope of the roof. What is the slope of the roof in this picture?',
          answer: '$\\dfrac{1}{3}$',
          working: '$\\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{4}{12} = \\dfrac{1}{3}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A fairly easy way to find the slope of a roof is to set one end of a 12-inch level on the roof, and hold it level. Then measure from the other end of the level down to the roof.' },
        { say: 'You can use these measurements to work out the slope of the roof. What is the slope of the roof in the picture?' },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [roof(), { kind: 'text', id: 't', size: 'md', md: 'The level lies **flat**: that is the **run**. The tape measures straight **up and down**: that is the **rise**.' }],
      lines: [
        { say: 'Here is the picture. The black line is the roof.', show: ['rf', 'rf.roof'] },
        { say: 'The level is 12 inches long. One end sits on the roof, and it is held flat.', show: 'rf.level', focus: 'rf.lvl' },
        { say: 'From the other end of the level, it is 4 inches down to the roof.', show: 'rf.drop', focus: 'rf.drop' },
        { say: 'The level measures across, and the tape measures up and down. If you would like to try it first, pause the video now.', show: 't', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Rise over run', md: 'The **rise** is the change **up or down**. The **run** is the change **across**. Write the slope as a fraction in **simplest form**.' },
      ],
      lines: [
        { say: 'Here is what we need. Slope is rise over run.', show: 'f' },
        { say: 'The rise is how far the roof goes up or down. The run is how far it goes across. And we write the slope as a fraction in simplest form.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **run** and the **rise**', 'Write **rise over run**', '**Simplify** the fraction'] }],
      lines: [
        { say: 'Here is the plan. Find the run and the rise in the picture.', show: 'plan.0' },
        { say: 'Write rise over run.', show: 'plan.1' },
        { say: 'Then simplify the fraction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Run and rise',
      layout: 'center',
      main: [roof(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{run} = 12 \\text{ in}, \\qquad \\text{rise} = 4 \\text{ in}'] }],
      lines: [
        { say: 'Step one. The level is flat, so its 12 inches is the run.', show: ['rf', 'rf.roof', 'rf.level', 'rf.drop'], focus: 'rf.lvl' },
        { say: 'The tape goes straight down, so its 4 inches is the rise. Over 12 inches across, the roof climbs 4 inches.', show: 'm', focus: 'rf.drop' },
      ],
    },
    {
      chapter: 'Step 2: Rise over run',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{slope} = \\dfrac{4}{12}', '= \\dfrac{4 \\div 4}{12 \\div 4} = \\good{\\dfrac{1}{3}}'] }],
      lines: [
        { say: 'Step two. Rise over run is 4 over 12.', show: 'm.0' },
        { say: 'Step three. Divide the top and the bottom by 4, their greatest common factor. The slope of the roof is one third.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times \\dfrac{1}{3} = 4 \\text{ in} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. A slope of one third means the roof rises 1 inch for every 3 inches across. Across 12 inches, that is 12 times one third, which is 4 inches. That is the drop we measured. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$3$', 'run over rise: it is **rise** over **run**'],
            ['$\\dfrac{1}{4}$', 'put $4$ over $16$: the run is just the **level**'],
            ['$8$', '**subtracted**: slope is a **fraction**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 is 12 over 4, the run over the rise. Slope is rise over run, so the rise goes on top.' },
        { say: 'One quarter puts 4 over 16, adding the two lengths for the run. The run is only the 12 inches across.' },
        { say: 'And 8 takes 4 from 12. Slope compares the two by dividing, not subtracting.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On another roof, it is $6$ inches from the end of a 12-inch level down to the roof. What is the slope of this roof?',
          choices: ['$2$', '$6$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{6}$'],
          answer: 2,
          working: '$\\dfrac{6}{12} = \\dfrac{1}{2}$',
        },
      ],
      lines: [
        { say: 'Your turn. On another roof, it is 6 inches from the end of a 12-inch level down to the roof. What is the slope of this roof? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The rise is 6 and the run is 12. 6 over 12 is one half. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slope $= \\dfrac{\\text{rise}}{\\text{run}}$', 'The **level** gives the run', 'The **drop** gives the rise', '**Simplify** the fraction'] }],
      lines: [
        { say: 'Here is what to remember. Slope is rise over run.', show: 'sum.0' },
        { say: 'The flat level gives the run.', show: 'sum.1' },
        { say: 'The drop down to the roof gives the rise.', show: 'sum.2' },
        { say: 'And simplify the fraction. For more on slope, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
