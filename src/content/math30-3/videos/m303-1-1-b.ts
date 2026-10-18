import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { readout } from './lib/m303-1-figures.ts';

const video: Explainer = {
  id: 'm303-1-1-b',
  lessonId: 'm303-1-1',
  title: 'Precision and Accuracy, Part 2: The Precision of a Measurement',
  thumbnailTitle: 'The Precision of a Measurement',
  thumbnail: 'mic',
  summary: 'The precision of a recorded measurement as the place value of its last digit: 26.4 mm, 26.40 mm and 3 5/8 in, why a recorded zero counts, why a bigger number is not more precise, and comparing 3.2 m, 318 cm and 3176 mm by changing each smallest unit to millimetres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 2', title: 'The Precision of a Measurement', subtitle: 'Read it from the last digit' }],
      lines: [
        { say: 'A measurement written on a work order tells you more than a size. Its last digit shows how precise the instrument was.', show: 'title' },
        { say: 'In this video, you will find the precision of a recorded measurement, see why a zero at the end can matter, and compare measurements written in different units.' },
      ],
    },
    {
      chapter: 'The last digit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'The precision of a measurement', md: 'The **precision of a measurement** is the place value of its **last digit**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Measurement', 'Last digit', 'Precise to the nearest'],
          rows: [
            ['$26.4\\text{ mm}$', '$4$, in the tenths place', '$0.1\\text{ mm}$'],
            ['$26.40\\text{ mm}$', '$0$, in the hundredths place', '$0.01\\text{ mm}$'],
            ['$3\\tfrac{5}{8}\\text{ in}$', 'a number of eighths', '$\\tfrac{1}{8}\\text{ in}$'],
          ],
        },
      ],
      lines: [
        { say: 'A recorded measurement shows how precise the instrument was. The precision of a measurement is the place value of its last digit.', show: 'def' },
        { say: '26.4 millimetres ends in the tenths place, so it is precise to the nearest 0.1 millimetres.', show: 't.0', focus: 't.0' },
        { say: '26.40 millimetres ends in the hundredths place, so it is precise to the nearest 0.01 millimetres. The two numbers have the same size, but not the same precision.', show: 't.1', focus: 't.1' },
        { say: 'For a fraction of an inch, the precision is the size of the fraction’s pieces. Three and five eighths inches counts eighths, so it is precise to the nearest eighth of an inch.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A recorded zero',
      layout: 'split',
      leftWidth: 480,
      left: [figure('mic', [readout({ value: '26.40\\text{ mm}', title: '\\text{Micrometer}' })], 320)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A mechanic records the thickness of a brake rotor as $26.40\\text{ mm}$. What is the precision?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['26.4\\good{0}\\text{ mm}', '\\good{0}\\text{: hundredths place}', '\\text{precision} = 0.01\\text{ mm}'] },
      ],
      lines: [
        { say: 'A mechanic uses a micrometer, a tool for measuring small thicknesses very precisely, and records the thickness of a brake rotor as 26.40 millimetres. What is the precision of this measurement?', show: ['mic', 'q'] },
        { say: 'The last digit is the zero, and it is in the hundredths place.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The mechanic wrote that zero because the micrometer showed it. So the hundredths place was measured: the rotor is not 26.39 or 26.41 millimetres thick, but 26.40.', focus: ['m.1', 'mic.value'] },
        { say: 'So the precision is 0.01 millimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping a zero, or judging by size', md: 'Writing $26.40\\text{ mm}$ as $26.4\\text{ mm}$ throws away information. And a bigger number is not more precise: compare the **last digits**, not the sizes.' },
        { kind: 'table', id: 't', head: ['Measurement', 'Precise to the nearest'], rows: [['$4268\\text{ mm}$', '$1\\text{ mm}$'], ['$18.25\\text{ mm}$', '$0.01\\text{ mm}$ (more precise)']] },
      ],
      lines: [
        { say: 'Two mistakes to avoid. First, do not drop that zero. Writing 26.40 millimetres as 26.4 throws away information: it hides the fact that the hundredths were measured.', show: 'oops' },
        { say: 'Second, a bigger number is not more precise. 4,268 millimetres is precise to the nearest millimetre.', show: 't.0', focus: 't.0' },
        { say: 'But 18.25 millimetres is precise to the nearest 0.01 millimetres. So the smaller measurement is the more precise one. Compare the last digits, not the sizes.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Different units',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Three workers measure the same board as $3.2\\text{ m}$, $318\\text{ cm}$ and $3176\\text{ mm}$. Which is the most precise?' },
        {
          kind: 'table',
          id: 't',
          head: ['Measurement', 'Precise to the nearest', 'In millimetres'],
          rows: [
            ['$3.2\\text{ m}$', '$0.1\\text{ m}$', '$100\\text{ mm}$'],
            ['$318\\text{ cm}$', '$1\\text{ cm}$', '$10\\text{ mm}$'],
            ['$3176\\text{ mm}$', '$1\\text{ mm}$', '$\\good{1\\text{ mm}}$'],
          ],
        },
      ],
      lines: [
        { say: 'To compare measurements written in different units, change each one’s smallest unit to the same unit first.', show: 'q' },
        { say: 'Three workers measure the same board as 3.2 metres, 318 centimetres, and 3,176 millimetres. Which measurement is the most precise?' },
        { say: '3.2 metres is to the nearest 0.1 metres. A metre is a thousand millimetres, so 0.1 metres is 100 millimetres.', show: 't.0', focus: 't.0' },
        { say: '318 centimetres is to the nearest centimetre, which is ten millimetres.', show: 't.1', focus: 't.1' },
        { say: 'And 3,176 millimetres is to the nearest millimetre.', show: 't.2', focus: 't.2' },
        { say: 'One millimetre is the smallest unit, so 3,176 millimetres is the most precise. All three agree that the board is a little over three metres long. The most precise one just tells you the most about it.', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which measurement is the most precise?',
          choices: ['$12.5\\text{ cm}$', '$1.26\\text{ m}$', '$124\\text{ mm}$', '$12.46\\text{ cm}$'],
          answer: 3,
          working: '$12.46\\text{ cm}$ is to the nearest $0.01\\text{ cm} = 0.1\\text{ mm}$. The others are to the nearest $1\\text{ mm}$, $10\\text{ mm}$ and $1\\text{ mm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four measurements is the most precise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. 12.46 centimetres is to the nearest 0.01 centimetres, which is 0.1 millimetres, the smallest unit of the four. Choice B, 1.26 metres, also has two decimal places, but a hundredth of a metre is ten millimetres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'The precision of a measurement is the place value of its last digit.',
            'A zero at the end of a decimal counts: $26.40\\text{ mm}$ is precise to $0.01\\text{ mm}$.',
            'Compare precision by the last digits, not the sizes, in the same unit.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The precision of a measurement is the place value of its last digit.', show: 'sum.0' },
        { say: 'A zero at the end of a decimal counts. 26.40 millimetres is precise to the nearest 0.01 millimetres.', show: 'sum.1' },
        { say: 'And to compare precision, look at the last digits, not the sizes, after changing each smallest unit to the same unit. In part three, we look at accuracy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
