import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// Exam question for Math 7 lesson 4.1 (adding integers). The question is an exercise from OpenStax
// Prealgebra 2e, word for word (section 3.2, Add Integers, CC BY-NC-SA 4.0). Below the surface is
// negative: −8 + (−17) + 5 = −25 + 5 = −20, so the diver is 20 feet below the surface.

const QUESTION =
  'Scuba Diving A scuba diver swimming 8 feet below the surface dove 17 feet deeper; the pressure got to them and they rose five feet. What is their new depth?';

/** A depth line from −30 to 4 with the water below 0: start at −8, down 17 to −25, up 5 to −20. */
const sea = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -30,
        max: 4,
        every: 5,
        unit: 0.17,
        water: { label: '\\text{surface}' },
        points: [
          { id: 'start', value: -8, tex: '-8', tone: 'adj', place: 'right', dx: 1.3 },
          { id: 'end', value: -20, tex: '-20', tone: 'good', place: 'right', dx: 3.1 },
        ],
        moves: [
          { id: 'down', from: -8, to: -25, label: '\\text{down } 17', tone: 'bad', x: 0.9 },
          { id: 'up', from: -25, to: -20, label: '\\text{up } 5', tone: 'good', x: 2.4 },
        ],
        room: 4.6,
      }),
    ],
    600,
  );

const video: Explainer = {
  id: 'xq-m7-4-1',
  lessonId: '',
  exam: {
    lesson: 'm7-4-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.2, Add Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-2-add-integers',
    question: QUESTION,
  },
  title: 'Exam Question: How Deep Is the Scuba Diver? (Adding Integers)',
  thumbnailTitle: 'How Deep Is the Diver?',
  thumbnail: 'sea',
  summary:
    'A real test question, solved one small step at a time: a scuba diver 8 feet below the surface dives 17 feet deeper, then rises 5 feet. What is the new depth? Below the surface is negative, so the depth is −8 + (−17) + 5. Add from left to right: −8 + (−17) = −25, and −25 + 5 = −20. The diver is 20 feet below the surface. Then we check on a depth line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Deep Is the Diver?', subtitle: 'Adding integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Scuba Diving** A scuba diver swimming $8$ feet below the surface dove $17$ feet deeper; the pressure got to them and they rose five feet. What is their new depth?',
          answer: '$20$ feet below the surface ($-20$ feet)',
          working: '−8 + (−17) + 5 = −25 + 5 = −20',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A scuba diver swimming 8 feet below the surface dove 17 feet deeper. The pressure got to them, and they rose 5 feet. What is their new depth?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Above and below', md: 'Take the **surface** of the water as $0$. **Below** the surface is **negative**, so $8$ feet below is $-8$. Going **deeper** adds a **negative**, and **rising** adds a **positive**.' }],
      lines: [
        { say: 'Take the surface of the water as zero. Below the surface is negative, so 8 feet below is negative 8.', show: 'c' },
        { say: 'Diving deeper adds a negative number, and rising adds a positive number.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Adding integers', md: '**Same signs**: add the sizes and keep the sign, so $-8 + (-17) = -25$. **Different signs**: subtract the smaller size from the larger, and keep the sign of the **larger** one.' }],
      lines: [
        { say: 'Here is what we need. When the signs are the same, add the sizes and keep the sign.', show: 'c' },
        { say: 'When the signs are different, subtract the smaller size from the larger one, and keep the sign of the larger one.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each move as an **integer**', 'Add them **left to right**', 'Say the answer as a **depth**'] }],
      lines: [
        { say: 'Here is the plan. Write each move as an integer.', show: 'plan.0' },
        { say: 'Add them from left to right.', show: 'plan.1' },
        { say: 'Then say the answer as a depth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Down, then up',
      layout: 'split',
      leftWidth: 460,
      left: [sea('sea')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-8 + (-17) + 5', '= \\bad{-25} + 5', '= \\good{-20}', '\\text{20 feet below}'] }],
      lines: [
        { say: 'Step one. The diver starts at negative 8. Diving 17 deeper is negative 17, and rising 5 is positive 5. The sum is negative 8, plus negative 17, plus 5.', show: ['sea.axis', 'sea.water', 'sea.start', 'm.0'], focus: 'm.0' },
        { say: 'Step two. Negative 8 plus negative 17. The signs are the same, so add 8 and 17 to get 25, and keep the minus sign: negative 25.', show: ['sea.down', 'm.1'], focus: 'm.1' },
        { say: 'Negative 25 plus 5. The signs are different, so 25 minus 5 is 20, and 25 is the larger, so the answer is negative: negative 20.', show: ['sea.up', 'sea.end', 'm.2'], focus: 'm.2' },
        { say: 'Step three. Negative 20 means the diver is 20 feet below the surface.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17 - 5 = 12 \\text{ feet deeper overall}', '8 + 12 = 20 \\text{ feet below} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. The diver went down 17 and came up 5, so overall they went 12 feet deeper.', show: 'm.0' },
        { say: 'They started 8 feet below, and 8 plus 12 is 20 feet below. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$30$ feet below', 'added the rise as **deeper**: rising is **positive**'],
            ['$20$ feet above', 'lost the **sign**: $-20$ is **below** the surface'],
            ['$4$ feet below', 'took $17 - 8 - 5$: deeper means the depths **add up**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '30 feet below adds all three numbers as if every move went down. Rising 5 feet brings the diver up, so it is plus 5.' },
        { say: '20 feet above loses the minus sign. Negative 20 is below the surface, and a diver cannot be above the water.' },
        { say: 'And 4 feet below subtracts the 8 instead of adding it. The diver was already 8 feet down, and went even deeper.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A submarine is $50$ m below the surface. It rises $20$ m, then dives $35$ m. Where is it now?',
          choices: ['$65$ m above the surface', '$65$ m below the surface', '$35$ m below the surface', '$105$ m below the surface'],
          answer: 1,
          working: '−50 + 20 + (−35) = −30 + (−35) = −65, so 65 m below.',
        },
      ],
      lines: [
        { say: 'Your turn. A submarine is 50 metres below the surface. It rises 20 metres, then dives 35 metres. Where is it now? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Negative 50 plus 20 is negative 30. Negative 30 plus negative 35 is negative 65. The submarine is 65 metres below the surface. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Below** zero is **negative**', '**Same signs**: add, keep the sign', '**Different signs**: subtract, sign of the larger', 'Picture it on a **number line**'] }],
      lines: [
        { say: 'Here is what to remember. Below zero is negative.', show: 'sum.0' },
        { say: 'With the same signs, add the sizes and keep the sign.', show: 'sum.1' },
        { say: 'With different signs, subtract the sizes, and take the sign of the larger.', show: 'sum.2' },
        { say: 'And picture the moves on a number line. For more on adding integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
