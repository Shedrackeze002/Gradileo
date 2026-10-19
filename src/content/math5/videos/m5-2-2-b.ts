import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from './lib/m5-2-figures.ts';

// 6254 − 2981 = 3273: regroup a hundred for the tens, then a thousand for the hundreds.
const work = figure('cw', [
  columns({
    top: '6254',
    bottom: '2981',
    answer: '3273',
    op: '-',
    cross: [3, 2, 1],
    marks: [
      { id: 't2', place: 2, tex: '1', tone: 'theta' },
      { id: 'n1', place: 1, tex: '15', tone: 'theta' },
      { id: 'n2', place: 2, tex: '11', tone: 'theta' },
      { id: 'n3', place: 3, tex: '5', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-2-b',
  lessonId: 'm5-2-2',
  title: 'Estimating and Solving Problems, Part 2: Is the Answer Reasonable?',
  thumbnailTitle: 'Is the Answer Reasonable?',
  thumbnail: 'cw',
  summary: 'An answer is reasonable when it is close to an estimate. Diego says 6254 − 2981 = 4273, but the estimate 6000 − 3000 = 3000 shows a mistake: he forgot a regrouped thousand, and the answer is 3273. Estimate a difference by subtracting, not adding.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 2', title: 'Is the Answer Reasonable?', subtitle: 'Use an estimate to catch a mistake' }],
      lines: [
        { say: 'Diego worked out a subtraction. But did Diego get it right? You can find out without doing the whole question again.', show: 'title' },
        { say: 'In this video, you will use an estimate to decide whether an answer is reasonable.' },
      ],
    },
    {
      chapter: 'Reasonable',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Reasonable', md: 'An answer is **reasonable** when it is close to your estimate. If it is far away, look for a mistake.' }],
      lines: [
        { say: 'An answer is reasonable when it makes sense. For a sum or a difference, that means it is close to your estimate.', show: 'def' },
        { say: 'If the answer is far away from the estimate, something has gone wrong. Then it is time to look for a mistake.' },
      ],
    },
    {
      chapter: 'Checking Diego’s work',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6254 - 2981 = 4273 \\;\\; ?', '6254 \\approx 6000 \\qquad 2981 \\approx 3000', '6000 - 3000 = 3000', '\\bad{4273} \\text{ is far from } 3000'] }],
      lines: [
        { say: 'Diego says that 6,254 minus 2,981 is 4,273. Is that reasonable?', show: 'm.0', focus: 'm.0' },
        { say: 'Round each number to the nearest thousand. 6,254 is about 6,000, and 2,981 is about 3,000.', show: 'm.1', focus: 'm.1' },
        { say: 'Now estimate. It is a difference, so subtract: 6,000 minus 3,000 is 3,000.', show: 'm.2', focus: 'm.2' },
        { say: 'Diego’s answer, 4,273, is more than a thousand away from the estimate. That is not close. So the answer is not reasonable, and Diego made a mistake somewhere.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Finding the mistake',
      layout: 'split',
      leftWidth: 520,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Ones: } 4 - 1 = 3', '\\text{Tens: } 15 - 8 = 7', '\\text{Hundreds: } 11 - 9 = 2', '\\text{Thousands: } 5 - 2 = 3'] }],
      lines: [
        { say: 'Let’s do the subtraction carefully and find the mistake. Ones: four minus one is three.', show: ['cw.top', 'cw.bottom', 'cw.bar', 'cw.sp0', 'm.0'], focus: 'm.0' },
        { say: 'Tens: five is less than eight, so regroup one hundred as ten tens. The two hundreds become one, and the tens become fifteen. Fifteen minus eight is seven.', show: ['cw.xp2', 'cw.t2', 'cw.xp1', 'cw.n1', 'cw.sp1', 'm.1'], focus: ['m.1', 'cw.n1'] },
        { say: 'Hundreds: one is less than nine, so regroup one thousand as ten hundreds. The hundreds become eleven, and the six thousands become five. Eleven minus nine is two.', show: ['cw.n2', 'cw.xp3', 'cw.n3', 'cw.sp2', 'm.2'], hide: 'cw.t2', focus: ['m.2', 'cw.n2', 'cw.n3'] },
        { say: 'Thousands: five minus two is three. So the answer is 3,273.', show: ['cw.sp3', 'm.3'], focus: ['m.3', 'cw.sum'] },
        { say: 'Diego forgot that he had regrouped one thousand. He worked out six minus two in the thousands, instead of five minus two.', focus: ['cw.n3', 'cw.sp3'] },
        { say: 'And 3,273 is close to our estimate of 3,000. So this answer is reasonable.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Estimating with the wrong operation', md: 'For a difference, **subtract** the rounded numbers. $6000 + 3000 = 9000$ is not an estimate of $6254 - 2981$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{6000 + 3000 = 9000}', '\\good{6000 - 3000 = 3000}'] },
      ],
      lines: [
        { say: 'When you estimate, use the same operation as the question. For a difference, subtract the rounded numbers.', show: 'oops' },
        { say: '6,000 plus 3,000 is 9,000, but that is not an estimate of 6,254 minus 2,981. It estimates a sum, not a difference.', show: 'm.0', focus: 'm.0' },
        { say: 'The right estimate subtracts: 6,000 minus 3,000 is 3,000.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Maya says $7415 - 3868 = 4547$. Estimate by rounding each number to the nearest thousand. Is Maya’s answer reasonable?',
          choices: ['Yes. The estimate is $4000$.', 'Yes. The estimate is $11\\,000$.', 'No. The estimate is $3000$.', 'No. The estimate is $11\\,000$.'],
          answer: 2,
          working: '$7415 \\approx 7000$ and $3868 \\approx 4000$, so the estimate is $7000 - 4000 = 3000$. $4547$ is far from $3000$, so it is not reasonable. (The exact answer is $3547$.)',
        },
      ],
      lines: [
        { say: 'Your turn. Maya says 7,415 minus 3,868 is 4,547. Estimate by rounding each number to the nearest thousand. Is Maya’s answer reasonable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. 7,415 is about 7,000, and 3,868 is about 4,000. 7,000 minus 4,000 is 3,000, which is far from 4,547. The exact answer is 3,547. Choice D adds the rounded numbers instead of subtracting.', show: 'q.answer' },
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
          items: ['An answer is reasonable when it is close to your estimate.', 'If it is far away, look for a mistake, such as a forgotten regroup.', 'Estimate with the same operation as the question.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An answer is reasonable when it is close to your estimate.', show: 'sum.0' },
        { say: 'If it is far away, look for a mistake, such as a regroup that was forgotten.', show: 'sum.1' },
        { say: 'And estimate with the same operation as the question. In the next part, we solve problems with money. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
