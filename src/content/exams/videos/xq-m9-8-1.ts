import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, ring, sq, ticks } from '@/content/math9/videos/lib/m9-8-figures.ts';

// Exam question for Math 9 lesson 8.1 (chord properties). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test. The
// perpendicular from the centre bisects the chord, so AM = 8 cm, and in the right triangle OAM,
// OM = √(10² − 8²) = √36 = 6 cm. Check: 6² + 8² = 100 = 10².

const QUESTION =
  'A circle with centre O has a radius of 10 cm. A chord AB is 16 cm long. How far is the chord from the centre of the circle?';

type P = [number, number];

// Drawn at 1 unit = 2.5 cm: radius 4, half chord 3.2, distance 2.4 (a 3-4-5 triangle, so A and B
// are at 180° + 36.87° and 360° − 36.87°).
const R = 4;
const M: P = [0, -2.4];

const chord = (id: string, solved: boolean) =>
  figure(
    id,
    [
      ring({ r: R, pts: { A: 216.87, B: 323.13 }, centrePlace: 'above' }),
      dot('M', M, 'below'),
      ln('ab', 'A', 'B', { tone: 'opp', label: solved ? undefined : '16\\text{ cm}', side: 'right', at: 0.82 }),
      ln('oa', 'O', 'A', { tone: 'hyp', label: '10\\text{ cm}', side: 'right', at: 0.35 }),
      ln('om', 'O', 'M', { tone: 'adj', label: solved ? '6\\text{ cm}' : 'd', side: 'left', dashed: !solved }),
      sq('rm', 'M', 'O', 'B'),
      ticks('ta', [-3.2, -2.4], M, 1, 0.5),
      ticks('tb', M, [3.2, -2.4], 1, 0.5),
      ...(solved ? [ln('am', 'A', 'M', { tone: 'opp', label: '8\\text{ cm}', side: 'right', at: 0.4 })] : []),
    ],
    420,
  );

const video: Explainer = {
  id: 'xq-m9-8-1',
  lessonId: '',
  exam: {
    lesson: 'm9-8-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Far Is the Chord From the Centre? (Chord Properties)',
  thumbnailTitle: 'How Far Is the Chord From the Centre?',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: a circle with centre O has a radius of 10 cm. A chord AB is 16 cm long. How far is the chord from the centre? The distance is measured along the perpendicular from the centre, OM, and that perpendicular cuts the chord in half, so AM = 8 cm. In the right triangle OAM, the radius OA = 10 cm is the hypotenuse, so OM = √(10² − 8²) = √36 = 6 cm. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Is the Chord From the Centre?', subtitle: 'Chord properties, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about chord properties. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A circle with centre $O$ has a radius of $10$ cm. A chord $AB$ is $16$ cm long. How far is the chord from the centre of the circle?',
          answer: '$6$ cm',
          working: 'half the chord is 8 cm; √(10² − 8²) = 6',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A circle with centre O has a radius of 10 centimetres. A chord, A B, is 16 centimetres long. How far is the chord from the centre of the circle?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [chord('ask', false)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Distance to a chord', md: 'The **distance** from the centre to a chord is the **shortest** way there: along the line from $O$ that meets the chord at a **right angle**.' }],
      lines: [
        { say: 'Here is the circle, with the chord A B, 16 centimetres long, and a radius O A, 10 centimetres long.', show: ['ask.fill', 'ask.outline', 'ask.names', 'ask.ab', 'ask.oa'] },
        { say: 'The distance from the centre to the chord is the shortest way there: along the line O M, which meets the chord at a right angle. We call it "d".', show: ['ask.om', 'ask.rm', 'ask.nM', 'c'], focus: ['ask.om', 'ask.rm'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['OM \\perp AB \\ \\Rightarrow \\ AM = MB', 'a^2 + b^2 = c^2'] }],
      lines: [
        { say: 'Here is what we need. The chord property: the perpendicular from the centre to a chord cuts the chord into two equal parts.', show: 'm.0' },
        { say: 'And the Pythagorean theorem: in a right triangle, the two shorter sides squared add up to the longest side squared.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Halve** the chord', 'Find the **right triangle** $OAM$', 'Use **Pythagoras** for $OM$'] }],
      lines: [
        { say: 'Here is the plan. Cut the chord in half.', show: 'plan.0' },
        { say: 'Find the right triangle O A M.', show: 'plan.1' },
        { say: 'Then use the Pythagorean theorem to find O M.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Halve, then Pythagoras',
      layout: 'split',
      leftWidth: 600,
      left: [chord('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AM = 16 \\div 2 = 8', 'OM^2 + 8^2 = 10^2', 'OM^2 = 100 - 64 = 36', 'OM = \\sqrt{36} = \\good{6 \\text{ cm}}'] }],
      lines: [
        { say: 'Here is the circle again, with the perpendicular O M.', show: ['st.fill', 'st.outline', 'st.names', 'st.ab', 'st.nM', 'st.rm'] },
        { say: 'Step one. The perpendicular from the centre cuts the chord in half. Half of 16 is 8, so A M is 8 centimetres.', show: ['m.0', 'st.am', 'st.ta', 'st.tb'], focus: ['m.0', 'st.am', 'st.ta', 'st.tb'] },
        { say: 'Step two. Triangle O A M has a right angle at M. Its longest side is the radius O A, 10 centimetres. So O M squared, plus 8 squared, equals 10 squared.', show: ['m.1', 'st.oa'], focus: ['m.1', 'st.oa'] },
        { say: 'Step three. 10 squared is 100, and 8 squared is 64. 100 minus 64 is 36.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of 36 is 6. The chord is 6 centimetres from the centre.', show: ['m.3', 'st.om'], focus: ['m.3', 'st.om'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6^2 + 8^2 = 36 + 64 = 100', '10^2 = 100 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the triangle works. 6 squared plus 8 squared is 36 plus 64, which is 100.', show: 'm.0', focus: 'm.0' },
        { say: 'And the radius squared, 10 squared, is 100 too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$12.8$ cm', '**added** the squares: the radius is the **longest** side'],
            ['$2$ cm', 'subtracted the lengths, not their **squares**'],
            ['$8$ cm', 'that is half the chord, not the **distance** $OM$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12.8 centimetres adds 10 squared and 8 squared. But the radius is the longest side of the triangle, so subtract.' },
        { say: '2 centimetres takes 8 from 10. The Pythagorean theorem works with the squares, not the lengths.' },
        { say: 'And 8 centimetres is half the chord. The question asks for the distance, O M.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A circle has a radius of $13$ cm. A chord is $5$ cm from the centre. How long is the chord?',
          choices: ['$12$ cm', '$24$ cm', '$8$ cm', '$18$ cm'],
          answer: 1,
          working: 'Half the chord is √(13² − 5²) = √144 = 12 cm, so the chord is 24 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of 13 centimetres. A chord is 5 centimetres from the centre. How long is the chord? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Half the chord, squared, is 13 squared minus 5 squared: 169 minus 25, which is 144. The square root is 12. That is half the chord, so the chord is 24 centimetres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The perpendicular from the centre **halves** the chord', 'The radius is the **longest** side', '**Subtract** the squares, then take the root', 'Check with **Pythagoras**'] }],
      lines: [
        { say: 'Here is what to remember. The perpendicular from the centre cuts a chord in half.', show: 'sum.0' },
        { say: 'In the right triangle, the radius is the longest side.', show: 'sum.1' },
        { say: 'So subtract the squares, then take the square root.', show: 'sum.2' },
        { say: 'And check with the Pythagorean theorem. For more on chord properties, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
