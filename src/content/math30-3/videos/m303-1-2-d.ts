import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { holeShaft, spacerStack } from './lib/m303-1-figures.ts';

// Three spacers on a bolt: 12.50 ± 0.02, 8.25 ± 0.03 and 20.00 ± 0.05 mm, a stack of 40.75 ± 0.10 mm.
const stack = () =>
  figure(
    'st',
    [
      spacerStack({
        sizes: [12.5, 8.25, 20],
        labels: ['12.50 \\pm 0.02', '8.25 \\pm 0.03', '20.00 \\pm 0.05'],
        total: '40.75 \\pm 0.10\\text{ mm}',
        lift: [0, 3.2, 0],
      }),
    ],
    320,
  );

// A hole of 30.10 ± 0.03 mm and a shaft of 30.00 ± 0.02 mm: a clearance of 0.05 to 0.15 mm.
const fit = () => figure('fit', [holeShaft({ hole: '\\text{hole: } 30.10 \\pm 0.03', shaft: '\\text{shaft: } 30.00 \\pm 0.02', gap: '\\text{clearance}' })]);

const video: Explainer = {
  id: 'm303-1-2-d',
  lessonId: 'm303-1-2',
  title: 'Uncertainty and Tolerance, Part 4: Tolerance Stacking and Clearance',
  thumbnailTitle: 'Tolerance Stacking',
  thumbnail: 'st',
  summary: 'Tolerance stacking: for parts assembled end to end, add the nominal sizes and add the tolerances (three spacers make 40.75 ± 0.10 mm, from 40.65 mm to 40.85 mm), and the clearance between a 30.10 ± 0.03 mm hole and a 30.00 ± 0.02 mm shaft, from 0.05 mm to 0.15 mm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 4', title: 'Tolerance Stacking and Clearance', subtitle: 'When parts are put together' }],
      lines: [
        { say: 'A part can be within tolerance on its own and still cause trouble once it is assembled with other parts. Small differences add up.', show: 'title' },
        { say: 'In this video, you will find the limits of a stack of parts, and the clearance between a shaft and the hole it fits into.' },
      ],
    },
    {
      chapter: 'Sizes add, tolerances add',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Tolerance stacking', md: 'When parts are assembled end to end or stacked, their sizes add, and so do their tolerances. The greatest total happens when every part is at its largest, and the least total when every part is at its smallest.' }],
      lines: [
        { say: 'When parts are assembled end to end, or stacked, their sizes add. So do their tolerances. This is called tolerance stacking.', show: 'key' },
        { say: 'Why do the tolerances add? The greatest total happens when every part is at its largest at the same time. The least total happens when every part is at its smallest.' },
      ],
    },
    {
      chapter: 'Three spacers on a bolt',
      layout: 'center',
      main: [
        stack(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{nominal: } 12.50 + 8.25 + 20.00 = 40.75\\text{ mm}', '\\text{tolerance: } 0.02 + 0.03 + 0.05 = 0.10\\text{ mm}', '40.75 - 0.10 = 40.65\\text{ mm} \\qquad 40.75 + 0.10 = 40.85\\text{ mm}'] },
      ],
      lines: [
        { say: 'Three spacers are stacked on a bolt: 12.50, plus or minus 0.02 millimetres, 8.25, plus or minus 0.03 millimetres, and 20.00, plus or minus 0.05 millimetres. What are the greatest and least possible thicknesses of the stack?', show: ['st.bolt', 'st.s0', 'st.s1', 'st.s2'] },
        { say: 'Add the nominal sizes: 12.50 plus 8.25 plus 20.00 is 40.75 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the tolerances: 0.02 plus 0.03 plus 0.05 is 0.10 millimetres.', show: ['m.1', 'st.total'], focus: ['m.1', 'st.total'] },
        { say: 'So the stack is 40.75, plus or minus 0.10 millimetres. The least thickness is 40.75 minus 0.10, which is 40.65 millimetres, and the greatest is 40.75 plus 0.10, which is 40.85 millimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Check the greatest by adding the largest sizes: 12.52 plus 8.28 plus 20.05 is also 40.85 millimetres.', focus: 'st' },
      ],
    },
    {
      chapter: 'Clearance',
      layout: 'split',
      leftWidth: 540,
      left: [fit()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Clearance', md: '**Clearance** $=$ hole diameter $-$ shaft diameter.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{least: } 30.07 - 30.02 = 0.05', '\\text{greatest: } 30.13 - 29.98 = 0.15'] },
      ],
      lines: [
        { say: 'A shaft must also fit inside its hole. The clearance is the gap between them: the hole diameter minus the shaft diameter.', show: ['fit.hole', 'fit.shaft', 'fit.gap', 'def'], focus: 'fit.gap' },
        { say: 'A hole is 30.10, plus or minus 0.03 millimetres, and its shaft is 30.00, plus or minus 0.02 millimetres.', show: ['fit.hole-dim', 'fit.shaft-dim'] },
        { say: 'The clearance is smallest when the hole is as small as it can be, 30.07, and the shaft is as large as it can be, 30.02. So the least clearance is 30.07 minus 30.02, which is 0.05 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The clearance is greatest with the largest hole, 30.13, and the smallest shaft, 29.98. That is 30.13 minus 29.98, which is 0.15 millimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'So the shaft always fits, with a gap of 0.05 to 0.15 millimetres. The nominal clearance is 0.10, plus or minus 0.05: the two tolerances, 0.03 and 0.02, have added again.', focus: 'fit.gap' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Pairing the wrong extremes', md: 'For the **least** clearance, use the **smallest** hole and the **largest** shaft. Using the largest of both gives neither limit.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{30.13 - 30.02 = 0.11} \\qquad \\good{30.07 - 30.02 = 0.05}'] },
      ],
      lines: [
        { say: 'Be careful to pair the right sizes. A common slip is to take the largest hole and the largest shaft: 30.13 minus 30.02 is 0.11 millimetres. That is neither limit.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'For the least clearance, use the smallest hole and the largest shaft: the tightest fit. For the greatest clearance, use the largest hole and the smallest shaft: the loosest fit. If the least clearance ever comes out negative, some shafts will be too big for their holes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two blocks, $45.0 \\pm 0.2\\text{ mm}$ and $30.0 \\pm 0.1\\text{ mm}$, are placed end to end. What is the greatest possible total length?',
          choices: ['$75.3\\text{ mm}$', '$75.2\\text{ mm}$', '$74.7\\text{ mm}$', '$75.0\\text{ mm}$'],
          answer: 0,
          working: 'Nominal total: $45.0 + 30.0 = 75.0\\text{ mm}$. Tolerances add: $0.2 + 0.1 = 0.3\\text{ mm}$. Greatest: $75.0 + 0.3 = 75.3\\text{ mm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two blocks, 45.0, plus or minus 0.2 millimetres, and 30.0, plus or minus 0.1 millimetres, are placed end to end. What is the greatest possible total length? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The nominal total is 45.0 plus 30.0, which is 75.0 millimetres, and the tolerances add: 0.2 plus 0.1 is 0.3. So the greatest total is 75.3 millimetres. Choice C, 74.7, is the least total.', show: 'q.answer' },
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
            'For assembled parts, add the nominal sizes and add the tolerances.',
            'Clearance $=$ hole $-$ shaft.',
            'Least clearance: smallest hole, largest shaft. Greatest: largest hole, smallest shaft.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For parts assembled end to end or stacked, add the nominal sizes, and add the tolerances.', show: 'sum.0' },
        { say: 'The clearance of a shaft in its hole is the hole diameter minus the shaft diameter.', show: 'sum.1' },
        { say: 'And the least clearance uses the smallest hole and the largest shaft, while the greatest uses the largest hole and the smallest shaft. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
