import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// Rafters TL = 4.2 m and TR = 5.5 m meeting at 112°: the bottom chord LR is unknown.
const truss = () =>
  figure('truss', [
    oblique({
      corners: ['L', 'R', 'T'],
      angles: [39.17, 28.83],
      sides: { r: '4.2\\text{ m}', l: '5.5\\text{ m}', t: '?' },
      angleLabels: { T: '112^\\circ' },
      pairs: { T: 'opp' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-3',
  lessonId: 'm303-2-3',
  title: 'Solving Problems with Oblique Triangles, Part 1: Choosing a Law',
  thumbnailTitle: 'Sine Law or Cosine Law?',
  thumbnail: 'truss',
  summary: 'Choosing between the sine law (a matching pair, or two angles and a side), the cosine law (two sides and the contained angle, or three sides) and SOH CAH TOA (a right angle); why two rafters meeting at 112° need the cosine law; and a five-step plan: sketch, mark, decide, solve and answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 1', title: 'Choosing a Law', subtitle: 'Sort out what you know first' }],
      lines: [
        { say: 'On the job, nobody hands you a labelled triangle. You get a truss drawing, a survey sketch, or a set of directions, and you have to find the triangle and decide which law fits.', show: 'title' },
        { say: 'In this video, you will learn how to choose between the sine law and the cosine law, and a five-step plan for any workplace triangle problem.' },
      ],
    },
    {
      chapter: 'Which law?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['You know', 'Use'],
          rows: [
            ['A matching pair, plus one more side or angle', 'The sine law'],
            ['Two angles and any side', 'The angle sum, then the sine law'],
            ['Two sides and the angle **between** them', 'The cosine law'],
            ['All three sides', 'The cosine law'],
            ['A right angle', 'SOH CAH TOA or Pythagoras'],
          ],
        },
      ],
      lines: [
        { say: 'Before you calculate anything, sort out what you know. If you know a side and its opposite angle, a matching pair, plus one more side or angle, use the sine law.', show: 't.0', focus: 't.0' },
        { say: 'If you know two angles and any side, use the angle sum to find the third angle. Then you have a matching pair, and the sine law works.', show: 't.1', focus: 't.1' },
        { say: 'If you know two sides and the angle between them, or all three sides, there is no matching pair. Use the cosine law.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And if the triangle has a right angle, you do not need either law. SOH CAH TOA, or the Pythagorean theorem, is quicker.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'A roof truss',
      layout: 'split',
      leftWidth: 540,
      left: [truss()],
      right: [
        { kind: 'bullets', id: 'b', items: ['The $112^\\circ$ angle is **between** the two known rafters.', 'No side is known with its opposite angle: **no matching pair**.', 'Two sides and the contained angle: **the cosine law**.'] },
      ],
      lines: [
        { say: 'A framer knows that two rafters are 4.2 metres and 5.5 metres long, and that they meet at the peak at 112 degrees. The framer wants the length of the bottom chord, the beam that joins the lower ends of the rafters. Which law should the framer use?', show: ['truss.shape', 'truss.names', 'truss.T'] },
        { say: 'The 112 degree angle is between the two known rafters. It is the contained angle.', show: 'b.0', focus: ['truss.T', 'truss.r', 'truss.l'] },
        { say: 'No side is known together with its opposite angle. The bottom chord is across from the 112 degree angle, but we do not know its length. So there is no matching pair.', show: 'b.1', focus: ['truss.T', 'truss.t'] },
        { say: 'Two sides and the contained angle: use the cosine law. We will solve it in the next part.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the sine law without a matching pair', md: 'The sine law needs a side **and** the angle opposite it. Two sides and the angle between them is not enough, no matter how the ratios are written.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4.2}{\\sin \\bad{R}} = \\dfrac{5.5}{\\sin \\bad{L}} = \\dfrac{\\bad{LR}}{\\sin 112^\\circ}'] },
      ],
      lines: [
        { say: 'A common mistake is to reach for the sine law without a matching pair. Try it here: 4.2 over sine R, 5.5 over sine L, and LR over sine 112.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Every one of those ratios has an unknown in it, so any two of them make one equation with two unknowns. No matter how the ratios are written, the sine law cannot start. That is the cosine law’s job.', focus: 'oops' },
      ],
    },
    {
      chapter: 'A plan for workplace problems',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: [
            '**1. Sketch** the triangle and label the vertices.',
            '**2. Mark** every known side and angle, and the unknown with $x$ or $?$.',
            '**3. Decide** which law fits, using the table.',
            '**4. Solve**, keeping full calculator values until the end.',
            '**5. Answer** in a sentence with units, rounded as asked, and check that it makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a plan for any workplace triangle problem. First, sketch the triangle, and label the vertices.', show: 'plan.0' },
        { say: 'Second, mark every known side and angle, and mark the unknown with x or a question mark.', show: 'plan.1' },
        { say: 'Third, decide which law fits, using the table.', show: 'plan.2' },
        { say: 'Fourth, solve, keeping full calculator values until the end.', show: 'plan.3' },
        { say: 'Fifth, answer in a sentence with units, rounded as the question asks, and check that it makes sense. For example, is the longest side across from the largest angle?', show: 'plan.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A surveyor knows all three sides of a triangular lot: $42\\text{ m}$, $55\\text{ m}$ and $61\\text{ m}$. Which law finds one of its angles?',
          choices: ['The sine law', 'The cosine law', 'SOH CAH TOA', 'The angle sum'],
          answer: 1,
          working: 'Three sides and no angles: there is no matching pair, so use the cosine law.',
        },
      ],
      lines: [
        { say: 'Your turn. A surveyor knows all three sides of a triangular lot: 42, 55 and 61 metres. Which law finds one of its angles? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. With three sides and no angles, there is no matching pair, so use the cosine law. Choice A, the sine law, needs a side together with the angle across from it.', show: 'q.answer' },
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
            'A matching pair: the sine law. Two angles and a side: the angle sum, then the sine law.',
            'Two sides and the contained angle, or three sides: the cosine law.',
            'Sketch, mark what you know, decide, solve, and answer with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With a matching pair, use the sine law. With two angles and a side, use the angle sum, then the sine law.', show: 'sum.0' },
        { say: 'With two sides and the contained angle, or three sides, use the cosine law.', show: 'sum.1' },
        { say: 'And for every problem: sketch, mark what you know, decide, solve, and answer with units. In part two, we solve the truss, and find a forest fire. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
