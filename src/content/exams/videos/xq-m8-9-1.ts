import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, poly, polyIds } from '@/content/math8/videos/lib/m8-9-figures.ts';

type P = [number, number];

// Exam question for Math 8 lesson 9.1 (congruent polygons). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 8 unit test.
// △ABC ≅ △DEF matches A to D, B to E and C to F. So EF = BC = 9 cm, ∠F = ∠C = 50°, and
// ∠E = ∠B = 180° − 60° − 50° = 70°. The triangle is drawn to scale (BC is 9.04 cm).

const QUESTION =
  'Triangle ABC is congruent to triangle DEF (△ABC ≅ △DEF). In triangle ABC, AB = 8 cm, BC = 9 cm, ∠A = 60° and ∠C = 50°. [The figure: triangle DEF is drawn flipped and turned, beside triangle ABC.] Find (a) the length of EF, (b) the measure of ∠F and (c) the measure of ∠E.';

const ABC: Record<string, P> = { A: [0, 0], B: [8, 0], C: [4.905, 8.497] };
const DEF = moved(ABC, { to: [17.5, 3.6], turn: 160, flip: true, names: ['D', 'E', 'F'] });

const pair = (id: string, solved: boolean) =>
  figure(
    id,
    [
      poly({ name: 'abc', corners: ABC, sides: { AB: '8\\text{ cm}', BC: '9\\text{ cm}' }, angles: { A: '60^\\circ', C: '50^\\circ' } }),
      poly({
        name: 'def',
        corners: DEF,
        tone: 'good',
        ...(solved ? { sides: { EF: '9\\text{ cm}' }, angles: { F: '50^\\circ', E: '70^\\circ' } } : {}),
      }),
    ],
    solved ? 330 : 400,
  );

const video: Explainer = {
  id: 'xq-m8-9-1',
  lessonId: '',
  exam: {
    lesson: 'm8-9-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Matching Parts of Congruent Triangles (Congruent Polygons)',
  thumbnailTitle: 'Match the Parts',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: triangle ABC is congruent to triangle DEF. In triangle ABC, AB = 8 cm, BC = 9 cm, ∠A = 60° and ∠C = 50°. Find EF, ∠F and ∠E. The congruence statement matches the vertices in order: A with D, B with E and C with F. So EF matches BC and is 9 cm, ∠F matches ∠C and is 50°, and ∠E matches ∠B, which is 180° − 60° − 50° = 70°. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Match the Parts', subtitle: 'Congruent polygons, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about congruent polygons. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '$\\triangle ABC \\cong \\triangle DEF$. In triangle $ABC$, $AB = 8$ cm, $BC = 9$ cm, $\\angle A = 60^\\circ$ and $\\angle C = 50^\\circ$. Triangle $DEF$ is drawn flipped and turned. Find (a) the length of $EF$, (b) the measure of $\\angle F$ and (c) the measure of $\\angle E$.',
          answer: '(a) $9$ cm (b) $50^\\circ$ (c) $70^\\circ$',
          working: 'A ↔ D, B ↔ E, C ↔ F',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle "A" "B" "C" is congruent to triangle "D" "E" "F". In triangle "A" "B" "C", "A" "B" is 8 centimetres, "B" "C" is 9 centimetres, angle "A" is 60 degrees, and angle "C" is 50 degrees.', caption: 'Triangle ABC is congruent to triangle DEF. In triangle ABC, AB = 8 cm, BC = 9 cm, ∠A = 60° and ∠C = 50°.' },
        { say: 'Triangle "D" "E" "F" is drawn flipped and turned. Find, a, the length of "E" "F", b, the measure of angle "F", and, c, the measure of angle "E".', caption: 'Triangle DEF is drawn flipped and turned. Find (a) the length of EF, (b) the measure of ∠F and (c) the measure of ∠E.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pair('ask', false), { kind: 'callout', id: 'c', tone: 'definition', title: 'Congruent', md: '**Congruent** shapes have the **same size** and the **same shape**: one fits exactly on top of the other after a slide, turn or flip. Matching sides are **equal**, and matching angles are **equal**.' }],
      lines: [
        { say: 'Here are the two triangles. Triangle "D" "E" "F" has been flipped and turned, so it is hard to see which parts match just by looking.', caption: 'Here are the two triangles. Triangle DEF has been flipped and turned, so it is hard to see which parts match just by looking.', show: [...polyIds('ask', 'abc'), 'ask.abc-lens', 'ask.abc-degs', ...polyIds('ask', 'def')] },
        { say: 'Congruent shapes have the same size and the same shape. One fits exactly on top of the other. So the matching sides are equal, and the matching angles are equal.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\triangle \\adj{A}\\opp{B}\\thc{C} \\cong \\triangle \\adj{D}\\opp{E}\\thc{F}', '\\adj{A} \\leftrightarrow \\adj{D}, \\ \\opp{B} \\leftrightarrow \\opp{E}, \\ \\thc{C} \\leftrightarrow \\thc{F}', '\\angle A + \\angle B + \\angle C = 180^\\circ'] }],
      lines: [
        { say: 'Here is what we need. A congruence statement lists the vertices in matching order.', show: 'm.0' },
        { say: 'The first letters match, the second letters match, and the third letters match: "A" with "D", "B" with "E", and "C" with "F".', caption: 'The first letters match, the second letters match, and the third letters match: A with D, B with E, and C with F.', show: 'm.1' },
        { say: 'And the angles in any triangle add up to 180 degrees.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Match** the letters in order', 'Find the **partner** of each part', 'Use $180^\\circ$ for the **missing** angle'] }],
      lines: [
        { say: 'Here is the plan. Match the letters, in order.', show: 'plan.0' },
        { say: 'Find the partner of each part we want, in triangle "A" "B" "C".', caption: 'Find the partner of each part we want, in triangle ABC.', show: 'plan.1' },
        { say: 'And use 180 degrees for the angle that is not given.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Match, then find',
      layout: 'center',
      main: [pair('st', true), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } EF \\leftrightarrow BC: \\ EF = \\good{9 \\text{ cm}}', '\\text{(b) } \\angle F \\leftrightarrow \\angle C: \\ \\angle F = \\good{50^\\circ}', '\\text{(c) } \\angle E \\leftrightarrow \\angle B = 180^\\circ - 60^\\circ - 50^\\circ = \\good{70^\\circ}'] }],
      lines: [
        { say: 'Here are the triangles again.', show: [...polyIds('st', 'abc'), 'st.abc-lens', 'st.abc-degs', ...polyIds('st', 'def')] },
        { say: 'Step one, part a. "E" "F" is made of the second and third letters, so it matches "B" "C". "B" "C" is 9 centimetres, so "E" "F" is 9 centimetres.', caption: 'Step one, part a. EF is made of the second and third letters, so it matches BC. BC = 9 cm, so EF = 9 cm.', show: ['st.def-len-EF', 'm.0'], focus: ['st.abc-len-BC', 'st.def-len-EF', 'm.0'] },
        { say: 'Step two, part b. "F" is the third letter, so angle "F" matches angle "C". Angle "C" is 50 degrees, so angle "F" is 50 degrees.', caption: 'Step two, part b. F is the third letter, so ∠F matches ∠C. ∠C = 50°, so ∠F = 50°.', show: ['st.def-deg-F', 'm.1'], focus: ['st.abc-deg-C', 'st.def-deg-F', 'm.1'] },
        { say: 'Step three, part c. "E" is the second letter, so angle "E" matches angle "B". Angle "B" is not given, but the angles of a triangle add up to 180 degrees. 180 minus 60 minus 50 is 70. So angle "E" is 70 degrees.', caption: 'Step three, part c. E is the second letter, so ∠E matches ∠B. ∠B is not given, but the angles add to 180°: 180° − 60° − 50° = 70°. So ∠E = 70°.', show: ['st.def-deg-E', 'm.2'], focus: ['st.def-deg-E', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\angle D + \\angle E + \\angle F = 60^\\circ + 70^\\circ + 50^\\circ = 180^\\circ \\ \\checkmark', '\\text{biggest angle } \\angle E \\text{ is across from the longest side } DF'] }],
      lines: [
        { say: 'Let us check. Angle "D" matches angle "A", so it is 60 degrees. Then the angles of triangle "D" "E" "F" are 60, 70 and 50 degrees, which add up to 180. Good.', caption: 'Let us check. ∠D matches ∠A, so it is 60°. Then the angles of triangle DEF are 60°, 70° and 50°, which add to 180°. Good.', show: 'm.0', focus: 'm.0' },
        { say: 'And in triangle "D" "E" "F", the biggest angle, angle "E", is across from the longest side, as it should be. It checks out.', caption: 'And in triangle DEF, the biggest angle, ∠E, is across from the longest side, as it should be. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$EF = 8$ cm', 'matched by **position** in the picture: use the **letter order**'],
            ['$\\angle E = 60^\\circ$', '$E$ is the **second** letter, so it matches $B$, not $A$'],
            ['$\\angle E = 110^\\circ$', 'added $60 + 50$ but did not **subtract** from $180$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"E" "F" equals 8 centimetres matches the sides by where they are in the picture. The copy is flipped and turned, so always use the order of the letters.', caption: 'EF = 8 cm matches the sides by where they are in the picture. The copy is flipped and turned, so always use the order of the letters.' },
        { say: 'Angle "E" equals 60 degrees matches "E" with "A". But "E" is the second letter, so it matches "B".', caption: '∠E = 60° matches E with A. But E is the second letter, so it matches B.' },
        { say: 'And 110 degrees is 60 plus 50. That is the two angles we know together. Subtract it from 180 to get the third angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$\\triangle PQR \\cong \\triangle XYZ$ and $PR = 12$ cm. Which side of $\\triangle XYZ$ is also $12$ cm?',
          choices: ['$XY$', '$YZ$', '$XZ$', 'none of them'],
          answer: 2,
          working: 'P matches X and R matches Z, so PR matches XZ.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle "P" "Q" "R" is congruent to triangle "X" "Y" "Z", and "P" "R" is 12 centimetres. Which side of triangle "X" "Y" "Z" is also 12 centimetres? Pause the video and try it.', caption: 'Your turn. △PQR ≅ △XYZ, and PR = 12 cm. Which side of △XYZ is also 12 cm? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"P" is the first letter, so it matches "X". "R" is the third letter, so it matches "Z". So "P" "R" matches "X" "Z". Choice "C".', caption: 'P is the first letter, so it matches X. R is the third letter, so it matches Z. So PR matches XZ. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Congruent: same **size** and same **shape**', 'Matching parts are **equal**', 'Match by the **letter order**, not the picture', 'A missing angle: use $180^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. Congruent shapes have the same size and the same shape.', show: 'sum.0' },
        { say: 'Their matching sides and matching angles are equal.', show: 'sum.1' },
        { say: 'Match the parts by the order of the letters in the congruence statement, not by how the picture looks.', show: 'sum.2' },
        { say: 'And for a missing angle in a triangle, use 180 degrees. For more on congruent polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
