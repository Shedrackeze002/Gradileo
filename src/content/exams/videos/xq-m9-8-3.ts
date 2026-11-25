import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, pt, ring, sq } from '@/content/math9/videos/lib/m9-8-figures.ts';

// Exam question for Math 9 lesson 8.3 (tangent properties). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test. A
// tangent is perpendicular to the radius at the point of tangency, so triangle OPT has a right
// angle at P and OT is its longest side: PT = √(13² − 5²) = √144 = 12 cm. Check: 5² + 12² = 169.

const QUESTION =
  'PT is tangent to a circle with centre O at the point P. The radius OP is 5 cm, and OT is 13 cm. How long is PT?';

// Drawn at 1 unit = 1.25 cm: radius 4, PT 9.6, with P at the bottom of the circle.
const R = 4;

const tangent = (id: string, solved: boolean) =>
  figure(
    id,
    [
      ring({ r: R, pts: { P: 270 }, centrePlace: 'above' }),
      dot('T', [9.6, -R], 'below right'),
      pt('b', [-3, -R]),
      pt('f', [11.2, -R]),
      ln('line', 'b', 'f', { tone: 'muted' }),
      ln('pt', 'P', 'T', { tone: 'adj', label: solved ? '12\\text{ cm}' : '?', side: 'right' }),
      ln('op', 'O', 'P', { tone: 'opp', label: '5\\text{ cm}', side: 'right' }),
      ln('ot', 'O', 'T', { tone: 'hyp', label: '13\\text{ cm}', side: 'left' }),
      sq('rp', 'P', 'O', 'T'),
    ],
    400,
  );

const video: Explainer = {
  id: 'xq-m9-8-3',
  lessonId: '',
  exam: {
    lesson: 'm9-8-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Tangent? (Tangent Properties)',
  thumbnailTitle: 'How Long Is the Tangent?',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: PT is tangent to a circle with centre O at the point P. The radius OP is 5 cm, and OT is 13 cm. How long is PT? A tangent is perpendicular to the radius at the point of tangency, so triangle OPT has a right angle at P, and OT is its longest side. By the Pythagorean theorem, PT = √(13² − 5²) = √144 = 12 cm. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Tangent?', subtitle: 'Tangent properties, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about tangent properties. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '$PT$ is tangent to a circle with centre $O$ at the point $P$. The radius $OP$ is $5$ cm, and $OT$ is $13$ cm. How long is $PT$?',
          answer: '$12$ cm',
          working: 'right angle at P; √(13² − 5²) = 12',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'P T is tangent to a circle with centre O, at the point P. The radius O P is 5 centimetres, and O T is 13 centimetres. How long is P T?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [tangent('ask', false)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Tangent', md: 'A **tangent** touches a circle at exactly **one** point, the **point of tangency**. Here that point is $P$.' }],
      lines: [
        { say: 'Here is the circle, and the tangent line. It touches the circle at just one point, P.', show: ['ask.fill', 'ask.outline', 'ask.names', 'ask.line', 'c'], focus: 'ask.line' },
        { say: 'The radius O P is 5 centimetres, and the line from O to T is 13 centimetres. We want the length of P T, along the tangent.', show: ['ask.op', 'ask.ot', 'ask.pt', 'ask.nT'], focus: 'ask.pt' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{tangent} \\perp \\text{radius: } \\angle OPT = 90^\\circ', 'a^2 + b^2 = c^2'] }],
      lines: [
        { say: 'Here is what we need. The tangent property: a tangent is perpendicular to the radius at the point of tangency. So angle O P T is 90 degrees.', show: 'm.0' },
        { say: 'And with a right angle, we can use the Pythagorean theorem.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Mark the **right angle** at $P$', 'Find the **longest** side', 'Use **Pythagoras** for $PT$'] }],
      lines: [
        { say: 'Here is the plan. Mark the right angle at P.', show: 'plan.0' },
        { say: 'Find the longest side of the triangle.', show: 'plan.1' },
        { say: 'Then use the Pythagorean theorem to find P T.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: A right triangle',
      layout: 'split',
      leftWidth: 640,
      left: [tangent('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle OPT = 90^\\circ', '5^2 + PT^2 = 13^2', 'PT^2 = 169 - 25 = 144', 'PT = \\sqrt{144} = \\good{12 \\text{ cm}}'] }],
      lines: [
        { say: 'Here is the circle and the tangent again.', show: ['st.fill', 'st.outline', 'st.names', 'st.line', 'st.nT', 'st.op', 'st.ot'] },
        { say: 'Step one. P T is a tangent and O P is a radius, so they meet at a right angle. Triangle O P T has a right angle at P.', show: ['st.rp', 'm.0'], focus: ['st.rp', 'm.0'] },
        { say: 'Step two. The longest side is opposite the right angle: O T, 13 centimetres. So 5 squared, plus P T squared, equals 13 squared.', show: 'm.1', focus: ['st.ot', 'm.1'] },
        { say: 'Step three. 13 squared is 169, and 5 squared is 25. 169 minus 25 is 144.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of 144 is 12. P T is 12 centimetres long.', show: ['m.3', 'st.pt'], focus: ['m.3', 'st.pt'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5^2 + 12^2 = 25 + 144 = 169', '13^2 = 169 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 5 squared plus 12 squared is 25 plus 144, which is 169.', show: 'm.0', focus: 'm.0' },
        { say: 'And 13 squared is 169 too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$13.9$ cm', '**added** the squares: $OT$ is the **longest** side'],
            ['$8$ cm', 'subtracted the lengths, not their **squares**'],
            ['$18$ cm', 'added the lengths: use **Pythagoras**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '13.9 centimetres adds 13 squared and 5 squared. But O T is the longest side, so subtract.' },
        { say: '8 centimetres takes 5 from 13. The Pythagorean theorem works with the squares, not the lengths.' },
        { say: 'And 18 centimetres adds the two lengths. The sides of a right triangle are linked by their squares.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$PT$ is tangent to a circle with centre $O$ at $P$. The radius is $6$ cm and $PT$ is $8$ cm. How long is $OT$?',
          choices: ['$10$ cm', '$14$ cm', '$2$ cm', '$5.3$ cm'],
          answer: 0,
          working: 'OT is the longest side: √(6² + 8²) = √100 = 10 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. P T is tangent to a circle with centre O at P. The radius is 6 centimetres, and P T is 8 centimetres. How long is O T? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'This time O T is the longest side we want, so add the squares: 36 plus 64 is 100. The square root of 100 is 10 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Tangent $\\perp$ radius: a **right angle**', 'The longest side is **opposite** the right angle', 'Find a shorter side: **subtract** the squares', 'Check with **Pythagoras**'] }],
      lines: [
        { say: 'Here is what to remember. A tangent meets the radius at a right angle.', show: 'sum.0' },
        { say: 'The longest side is opposite the right angle.', show: 'sum.1' },
        { say: 'To find a shorter side, subtract the squares.', show: 'sum.2' },
        { say: 'And check with the Pythagorean theorem. For more on tangent properties, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
