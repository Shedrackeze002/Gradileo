import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, poly, polyIds } from './lib/m8-9-figures.ts';

type P = [number, number];

// Quadrilateral ABCD, drawn to scale with AB = 5 cm, BC = 8 cm and ∠D = 75°. PQRS is the same
// quadrilateral turned a half turn, so P, Q, R and S sit in different places from A, B, C and D.
const ABCD: Record<string, P> = { A: [-0.868, 4.924], B: [0, 0], C: [8, 0], D: [9.39, 4.6] };
const PQRS = moved(ABCD, { turn: 180, to: [4.13, -6.6], names: ['P', 'Q', 'R', 'S'] });
const quads = (id: string, found = false) =>
  figure(id, [
    poly({ name: 'p', corners: ABCD, sides: { AB: '5\\text{ cm}', BC: '8\\text{ cm}' }, angles: { D: '75^\\circ' } }),
    poly({ name: 'q', corners: PQRS, tone: 'good', sides: { QR: found ? '8\\text{ cm}' : '?', PQ: '5\\text{ cm}' }, angles: { S: found ? '75^\\circ' : '?' } }),
  ]);

const video: Explainer = {
  id: 'm8-9-1-c',
  lessonId: 'm8-9-1',
  title: 'Congruent Polygons, Part 3: Finding Missing Measures',
  thumbnailTitle: 'Finding Missing Measures',
  thumbnail: 'qd',
  summary:
    'Corresponding parts of congruent polygons are equal, so a measure on one polygon gives the measure of its partner. If quadrilateral ABCD ≅ quadrilateral PQRS, with AB = 5 cm, BC = 8 cm and ∠D = 75°, then A, B, C and D match P, Q, R and S. QR matches BC, so QR = 8 cm, and ∠S matches ∠D, so ∠S = 75°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 3', title: 'Finding Missing Measures', subtitle: 'Measure one, know both' }],
      lines: [
        { say: 'If two shapes are congruent, measuring one of them tells you the measures of the other. You never have to measure twice!', show: 'title' },
        { say: 'In this video, you will use a statement of congruence to find missing side lengths and angles.' },
      ],
    },
    {
      chapter: 'Partners are equal',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Corresponding parts are equal', md: 'In congruent polygons, every side and every angle has a **partner** of the same size. A measure on one polygon gives you the measure of its partner on the other.' },
        { kind: 'bullets', id: 'steps', items: ['**Match** the vertices in order, from the congruence statement.', '**Find** the part that matches the one you want.', '**Copy** its measure.'] },
      ],
      lines: [
        { say: 'Here is the big idea. In polygons that are congruent, every side and every angle has a partner of exactly the same size.', show: 'key' },
        { say: 'So a measure on one polygon tells you the measure of its partner on the other. You can find a missing measure in three steps.' },
        { say: 'First, match the vertices in order, using the statement of congruence.', show: 'steps.0' },
        { say: 'Second, find the part that matches the one you want.', show: 'steps.1' },
        { say: 'And third, copy its measure.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'A quadrilateral',
      layout: 'split',
      leftWidth: 600,
      left: [quads('qd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Quadrilateral $ABCD \\cong$ quadrilateral $PQRS$. Find $QR$ and $\\angle S$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\leftrightarrow P,\\ \\ B \\leftrightarrow Q', 'C \\leftrightarrow R,\\ \\ D \\leftrightarrow S'] },
      ],
      lines: [
        { say: 'A quadrilateral is a polygon with four sides. Quadrilateral A B C D is congruent to quadrilateral P Q R S.', show: [...polyIds('qd', 'p'), ...polyIds('qd', 'q'), 'q'] },
        { say: 'In A B C D, side A B is five centimetres, side B C is eight centimetres, and angle D is seventy-five degrees. Find side Q R and angle S.', show: ['qd.p-lens', 'qd.p-degs', 'qd.q-len-QR', 'qd.q-deg-S'], focus: ['qd.p-lens', 'qd.p-degs'] },
        { say: 'Step one: match the vertices in order. Vertex A matches P, B matches Q, C matches R, and D matches S.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Notice that P Q R S is turned upside down. Its letters are not in the same places on the page, so we trust the letters, not the picture.', focus: 'qd.q-names' },
      ],
    },
    {
      chapter: 'Copying the measures',
      layout: 'split',
      leftWidth: 600,
      left: [quads('cm', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['QR \\leftrightarrow BC', 'QR = 8\\text{ cm}', '\\angle S \\leftrightarrow \\angle D', '\\angle S = 75^\\circ'] }],
      lines: [
        { say: 'Step two: side Q R joins Q and R, the second and third vertices of P Q R S. The second and third vertices of A B C D are B and C. So Q R matches B C.', show: [...polyIds('cm', 'p'), ...polyIds('cm', 'q'), 'cm.p-lens', 'cm.p-degs', 'm.0'], focus: ['m.0', 'cm.p-len-BC', 'cm.q-QR'] },
        { say: 'Step three: copy the measure. Side B C is eight centimetres, so side Q R is eight centimetres as well.', show: ['m.1', 'cm.q-len-QR'], focus: ['m.1', 'cm.q-len-QR', 'cm.p-len-BC'] },
        { say: 'Now angle S. S is the fourth letter of P Q R S, and it matches D, the fourth letter of A B C D.', show: 'm.2', focus: ['m.2', 'cm.p-deg-D'] },
        { say: 'Angle D is seventy-five degrees, so angle S is seventy-five degrees as well.', show: ['m.3', 'cm.q-deg-S'], focus: ['m.3', 'cm.q-deg-S', 'cm.p-deg-D'] },
        { say: 'You can keep going. Side P Q matches side A B, so it is five centimetres long. One quadrilateral has been measured, and now we know the other one as well.', show: 'cm.q-len-PQ', focus: ['cm.q-len-PQ', 'cm.p-len-AB'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Quadrilateral $ABCD \\cong$ quadrilateral $WZYX$. $AB = 6$ cm, $BC = 4$ cm, $CD = 3$ cm and $DA = 5$ cm. What is $ZY$?',
          choices: ['$4$ cm', '$6$ cm', '$3$ cm', '$5$ cm'],
          answer: 0,
          working: 'Match in order: $A \\leftrightarrow W$, $B \\leftrightarrow Z$, $C \\leftrightarrow Y$, $D \\leftrightarrow X$. $ZY$ joins the second and third vertices, so it matches $BC = 4$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. Quadrilateral A B C D is congruent to quadrilateral W Z Y X. Side A B is six centimetres, B C is four, C D is three, and D A is five. What is the length of side Z Y? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: four centimetres. Z and Y are the second and third letters of W Z Y X, so Z Y matches B C, which is four centimetres. Choice B, six centimetres, is side A B, which matches W Z.', show: 'q.answer' },
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
          items: ['Corresponding parts of congruent polygons are equal.', 'Match the vertices in order, find the matching part, and copy its measure.', 'Trust the letters, not where the shapes sit on the page.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When polygons are congruent, their corresponding parts are equal.', show: 'sum.0' },
        { say: 'To find a missing measure, match the vertices in order, find the matching part, and copy its measure.', show: 'sum.1' },
        { say: 'And trust the letters, not where the shapes sit on the page. In the next part, you will need one more step: the angle sum of a triangle or a quadrilateral. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
