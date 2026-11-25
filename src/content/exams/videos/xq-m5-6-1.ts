import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 6.1 (ratios). The free OpenStax books have no part-to-part and
// part-to-whole ratio question at this level, so this one is written by Gradileo in the style of a
// Grade 5 mathematics unit test. 8 red and 12 blue marbles: red to blue is 8 : 12 (part to part),
// and there are 8 + 12 = 20 marbles, so red to all is 8 : 20 (part to whole).

const QUESTION =
  'A bag holds 8 red marbles and 12 blue marbles. (a) What is the ratio of red marbles to blue marbles? (b) What is the ratio of red marbles to all the marbles in the bag? (c) Which ratio is part to part, and which is part to whole?';

/** The 20 marbles in two rows of 10: 8 red, then 12 blue. */
const bag = (): DiagramEl => ({
  kind: 'diagram',
  id: 'bag',
  height: 240,
  points: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`m${i}`, [(i % 10) * 1.2, i < 10 ? 1.2 : 0] as [number, number]])),
  items: Array.from({ length: 20 }, (_, i) => ({
    kind: 'label' as const,
    id: `d${i}`,
    at: `m${i}`,
    tex: '\\Huge\\bullet',
    tone: i < 8 ? ('bad' as const) : ('adj' as const),
    place: 'center' as const,
    group: i < 8 ? 'red' : 'blue',
  })),
});

const video: Explainer = {
  id: 'xq-m5-6-1',
  lessonId: '',
  exam: {
    lesson: 'm5-6-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 5 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Red and Blue Marbles (Ratios)',
  thumbnailTitle: 'Part to Part or Part to Whole?',
  thumbnail: 'bag',
  summary:
    'An exam-style question, solved one small step at a time: a bag holds 8 red marbles and 12 blue marbles. What is the ratio of red to blue, and of red to all the marbles? Red to blue compares two parts, so it is 8 : 12, a part-to-part ratio. There are 20 marbles in all, so red to all is 8 : 20, a part-to-whole ratio. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Part to Part or Part to Whole?', subtitle: 'Ratios, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about ratios. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A bag holds $8$ red marbles and $12$ blue marbles. (a) What is the ratio of red marbles to blue marbles? (b) What is the ratio of red marbles to all the marbles in the bag? (c) Which ratio is part to part, and which is part to whole?',
          answer: '(a) $8 : 12$ (b) $8 : 20$ (c) (a) is part to part, (b) is part to whole',
          working: 'All the marbles: 8 + 12 = 20',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A bag holds 8 red marbles and 12 blue marbles. Part a. What is the ratio of red marbles to blue marbles? Part b. What is the ratio of red marbles to all the marbles in the bag? Part c. Which ratio is part to part, and which is part to whole?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        bag(),
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Ratio', md: 'A **ratio** compares two amounts. "$8$ to $12$" is written **$8 : 12$**. The order matters: the first thing named comes **first**.' },
      ],
      lines: [
        { say: 'Here are the marbles: 8 red and 12 blue.', show: ['bag', 'bag.red', 'bag.blue'] },
        { say: 'A ratio compares two amounts. 8 to 12 is written 8, then a colon, then 12. The order matters: the thing named first goes first.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Compares', 'Example'],
          rows: [
            ['**Part to part**', 'one part with **another part**', 'red : blue'],
            ['**Part to whole**', 'one part with **the whole** group', 'red : all'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A part-to-part ratio compares one part of a group with another part, like red marbles to blue marbles.', show: 't', focus: 't.0' },
        { say: 'A part-to-whole ratio compares one part with the whole group, like red marbles to all the marbles.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write **red : blue**', 'Find the **whole**, then write **red : all**', 'Name each **kind** of ratio'] }],
      lines: [
        { say: 'Here is the plan. Write the ratio of red to blue.', show: 'plan.0' },
        { say: 'Find the whole, then write the ratio of red to all.', show: 'plan.1' },
        { say: 'Then name each kind of ratio.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The ratios',
      layout: 'split',
      leftWidth: 600,
      left: [bag()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) red : blue} = \\good{8 : 12}', '8 + 12 = 20', '\\text{(b) red : all} = \\good{8 : 20}'] }, { kind: 'text', id: 'c', md: '(c) **(a)** is **part to part**, and **(b)** is **part to whole**.' }],
      lines: [
        { say: 'Step one. Red comes first, then blue. There are 8 red and 12 blue, so the ratio of red to blue is 8 to 12.', show: ['bag', 'bag.red', 'bag.blue', 'm.0'], focus: 'm.0' },
        { say: 'Step two. All the marbles is the whole bag: 8 plus 12 is 20.', show: 'm.1' },
        { say: 'So the ratio of red to all the marbles is 8 to 20.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Red to blue compares two parts, so it is part to part. Red to all compares a part with the whole bag, so it is part to whole.', show: 'c', focus: 'c' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{red} + \\text{blue} = 8 + 12 = 20 = \\text{all} \\ \\checkmark', '\\text{red : all} = 8 : 20 = \\tfrac{8}{20} \\text{ of the bag}'] }],
      lines: [
        { say: 'Let us check. The two parts, 8 and 12, add up to the whole, 20.', show: 'm.0' },
        { say: 'And a part-to-whole ratio can also be written as a fraction: 8 out of 20 marbles, or 8 twentieths of the bag, are red. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $12 : 8$', 'the **wrong order**: red is named first'],
            ['(b) $8 : 12$', 'used blue, not **all** the marbles: add the parts'],
            ['(b) $20 : 8$', 'the whole is named **second**, so it goes second'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12 to 8 is blue to red. The question names red first, so 8 comes first.' },
        { say: 'Using 8 to 12 for part b compares red with blue again. Part b wants all the marbles, so add the parts first.' },
        { say: 'And 20 to 8 puts the whole first. The question says red to all, so red comes first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A team has $9$ girls and $6$ boys. What is the ratio of boys to all the players?',
          choices: ['$6 : 9$', '$9 : 15$', '$6 : 15$', '$15 : 6$'],
          answer: 2,
          working: 'All the players: 9 + 6 = 15. Boys to all: 6 : 15.',
        },
      ],
      lines: [
        { say: 'Your turn. A team has 9 girls and 6 boys. What is the ratio of boys to all the players? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'All the players is 9 plus 6, which is 15. Boys come first, so boys to all is 6 to 15. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **ratio** compares two amounts', 'Keep the **order** of the question', '**Part to part**: one part with another', '**Part to whole**: a part with the whole'] }],
      lines: [
        { say: 'Here is what to remember. A ratio compares two amounts.', show: 'sum.0' },
        { say: 'Write them in the order the question names them.', show: 'sum.1' },
        { say: 'A part-to-part ratio compares one part with another.', show: 'sum.2' },
        { say: 'And a part-to-whole ratio compares a part with the whole group. For more on ratios, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
