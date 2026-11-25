import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from '@/content/math6/videos/lib/m6-10-figures.ts';

// Exam question for Math 6 lesson 10.1 (volume and cubic units). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 9.3, Measuring Volume, CC BY-NC-SA
// 4.0). 8 m³ is 8 cubes 1 m on a side, a space 2 m by 2 m by 2 m: a small storage room. 8 cm³ fits
// in a hand and 8 mm³ is smaller than a pea, so 8 m³ is the reasonable value.

const QUESTION = 'Which represents a reasonable value for the volume of a storage area: 8 m³, 8 cm³, or 8 mm³?';

const room = (id: string) =>
  figure(id, [cubes({ heights: [[2, 2], [2, 2]], tone: 'good', labels: { l: '2\\text{ m}', w: '2\\text{ m}', h: '2\\text{ m}' } })], 320);

const video: Explainer = {
  id: 'xq-m6-10-1',
  lessonId: '',
  exam: {
    lesson: 'm6-10-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.3, Measuring Volume',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-3-measuring-volume',
    question: QUESTION,
  },
  title: 'Exam Question: A Reasonable Volume for a Storage Area (Volume and Cubic Units)',
  thumbnailTitle: 'How Big Is a Storage Area?',
  thumbnail: 'rm',
  summary:
    'A real test question, solved one small step at a time: which is a reasonable volume for a storage area, 8 cubic metres, 8 cubic centimetres, or 8 cubic millimetres? A cubic metre is a cube 1 metre on each side, so 8 of them make a space 2 m long, 2 m wide and 2 m tall: a small storage room. 8 cubic centimetres fits in your hand, and 8 cubic millimetres is smaller than a pea, so the answer is 8 m³. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Big Is a Storage Area?', subtitle: 'Volume and cubic units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about volume and cubic units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Which represents a reasonable value for the volume of a storage area: $8$ m³, $8$ cm³, or $8$ mm³?',
          answer: '$8$ m³',
          working: '8 m³ is a space 2 m by 2 m by 2 m',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Which represents a reasonable value for the volume of a storage area: 8 cubic metres, 8 cubic centimetres, or 8 cubic millimetres?', caption: 'Which represents a reasonable value for the volume of a storage area: 8 m³, 8 cm³, or 8 mm³?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Volume and a storage area', md: '**Volume** is the amount of space something takes up, measured in **cubic units**. A **storage area** is a space for keeping things, like a storage room or a shed. **Reasonable** means the size makes sense in real life.' }],
      lines: [
        { say: 'Volume is the amount of space something takes up. It is measured in cubic units.', show: 'c' },
        { say: 'A storage area is a space for keeping things, like a small room or a shed. We need the size that makes sense in real life.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Cubic unit', 'A cube with sides of', 'About the size of'], rows: [['$1$ mm³', '$1$ millimetre', 'a grain of sugar'], ['$1$ cm³', '$1$ centimetre', 'a sugar cube'], ['$1$ m³', '$1$ metre', 'a big box you could sit in']] }],
      lines: [
        { say: 'Here is what we need. A cubic millimetre is a cube 1 millimetre on each side, about the size of a grain of sugar.', show: 't.0' },
        { say: 'A cubic centimetre is a cube 1 centimetre on each side, about the size of a sugar cube.', show: 't.1' },
        { say: 'A cubic metre is a cube 1 metre on each side: a big box you could sit inside.', show: 't.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Picture each volume', 'Compare it with a **storage area**', 'Pick the one that **fits**'] }],
      lines: [
        { say: 'Here is the plan. Picture each volume.', show: 'plan.0' },
        { say: 'Compare it with a storage area.', show: 'plan.1' },
        { say: 'Then pick the one that fits.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Picture each volume',
      layout: 'split',
      leftWidth: 480,
      left: [room('rm')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\text{ mm}^3: \\text{ smaller than a pea}', '8 \\text{ cm}^3: \\text{ fits in your hand}', '8 \\text{ m}^3 = 2 \\times 2 \\times 2', '\\good{8 \\text{ m}^3}: \\text{ a small room}'] }],
      lines: [
        { say: 'Step one. 8 cubic millimetres is 8 grains of sugar. That is smaller than a pea. Far too small.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 8 cubic centimetres is 8 sugar cubes. That fits in your hand. Still far too small to store things in.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 8 cubic metres is 8 cubes, each 1 metre on a side. Stack them 2 long, 2 wide and 2 tall.', show: ['rm.cubes', 'm.2'], focus: 'm.2' },
        { say: 'That makes a space 2 metres long, 2 metres wide and 2 metres tall: a small storage room. So 8 cubic metres is the reasonable value.', show: ['rm.l', 'rm.w', 'rm.h', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times 2 \\times 2 = 8 \\ \\checkmark', '2 \\text{ m}: \\text{ about as tall as a door} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 2 times 2 times 2 is 8, so the 2 metre cube really holds 8 cubic metres.', show: 'm.0' },
        { say: 'And 2 metres is about as tall as a door, so you could walk in and stack boxes. That is a storage area. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$8$ cm³', '$8$ sugar cubes: it fits in your **hand**'],
            ['$8$ mm³', 'smaller than a **pea**'],
            ['"the units do not matter"', 'the **same** number in a **bigger** unit is a **much** bigger space'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 cubic centimetres is only 8 sugar cubes. It fits in your hand.' },
        { say: '8 cubic millimetres is even smaller, less than a pea.' },
        { say: 'And the units do matter. All three have the number 8, but the bigger the unit, the bigger the space.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is a reasonable volume for a juice box?',
          choices: ['$250$ m³', '$250$ mm³', '$250$ cm³', '$250$ km³'],
          answer: 2,
          working: 'A juice box holds about 250 sugar-cube-sized cubes: 250 cm³. The others are far too big or too small.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is a reasonable volume for a juice box? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A juice box holds about 250 sugar cubes worth of juice. 250 cubic metres would fill a house, and 250 cubic millimetres is just a few drops. So it is 250 cubic centimetres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume is measured in **cubic units**', '$1$ cm³: a **sugar cube**', '$1$ m³: a box you could **sit in**', 'Picture the size to judge if it is **reasonable**'] }],
      lines: [
        { say: 'Here is what to remember. Volume is measured in cubic units.', show: 'sum.0' },
        { say: 'A cubic centimetre is about a sugar cube.', show: 'sum.1' },
        { say: 'A cubic metre is a box you could sit inside.', show: 'sum.2' },
        { say: 'And picture the size to judge if an answer is reasonable. For more on volume and cubic units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
