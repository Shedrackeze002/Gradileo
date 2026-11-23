import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-3 lesson 4.1 (translations, reflections and rotations). Gradileo wrote
// this one, in the style of a Grade 12 transformations unit quiz, because the free OpenStax
// transformation questions all depend on pictures without coordinates. A reflection in the y-axis
// sends (x, y) to (−x, y), and a translation 3 units down sends (x, y) to (x, y − 3), so
// A(1, 2) → (−1, 2) → (−1, −1), B(4, 2) → (−4, 2) → (−4, −1), C(1, 4) → (−1, 4) → (−1, 1).

const QUESTION =
  'Triangle ABC has vertices A(1, 2), B(4, 2) and C(1, 4). It is reflected in the y-axis, and then the image is translated 3 units down. What are the coordinates of the vertices of the final image, A″B″C″?';

const g = plane({ x: [-5, 5], y: [-2, 5] });
type Pt = [number, number];
const ABC: Pt[] = [[1, 2], [4, 2], [1, 4]];
const ONE: Pt[] = ABC.map(([x, y]) => [-x, y]);
const TWO: Pt[] = ONE.map(([x, y]) => [x, y - 3]);
const shut = (p: Pt[]): Pt[] => [...p, p[0]];
const tex = (n: number) => (n < 0 ? `{${n}}` : `${n}`);
const at = ([x, y]: Pt) => `(${tex(x)}, ${tex(y)})`;

/** The grid, triangle ABC, and (by `stage`) its reflection and the final image. */
const grid = (stage: 0 | 1 | 2, height = 470) =>
  figure(
    'g',
    [
      g,
      polyline(g, { id: 'abc', points: shut(ABC), tone: 'theta' }),
      dots(g, [
        { id: 'a', x: 1, y: 2, tex: 'A', tone: 'theta', place: 'below', group: 'abcp' },
        { id: 'b', x: 4, y: 2, tex: 'B', tone: 'theta', place: 'below', group: 'abcp' },
        { id: 'c', x: 1, y: 4, tex: 'C', tone: 'theta', place: 'above right', group: 'abcp' },
      ]),
      ...(stage >= 1
        ? [
            polyline(g, { id: 'one', points: shut(ONE), tone: 'opp', dashed: stage === 2 }),
            dots(g, [
              { id: 'a1', x: -1, y: 2, tex: "A'", tone: 'opp', place: 'below left', group: 'onep' },
              { id: 'b1', x: -4, y: 2, tex: "B'", tone: 'opp', place: 'above', group: 'onep' },
              { id: 'c1', x: -1, y: 4, tex: "C'", tone: 'opp', place: 'above left', group: 'onep' },
            ]),
          ]
        : []),
      ...(stage === 2
        ? [
            polyline(g, { id: 'two', points: shut(TWO), tone: 'good' }),
            dots(g, [
              { id: 'a2', x: -1, y: -1, tex: "A''", tone: 'good', place: 'below', group: 'twop' },
              { id: 'b2', x: -4, y: -1, tex: "B''", tone: 'good', place: 'below', group: 'twop' },
              { id: 'c2', x: -1, y: 1, tex: "C''", tone: 'good', place: 'left', group: 'twop' },
            ]),
          ]
        : []),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m303-4-1',
  lessonId: '',
  exam: {
    lesson: 'm303-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 transformations unit quiz',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: A Reflection and Then a Translation (Transformations)',
  thumbnailTitle: 'Flip It, Then Slide It',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: triangle ABC has vertices A(1, 2), B(4, 2) and C(1, 4). It is reflected in the y-axis, then translated 3 units down. Where do the vertices end up? A reflection in the y-axis changes the sign of x, and a translation 3 down takes 3 from y, so A″(−1, −1), B″(−4, −1) and C″(−1, 1). Then we check the side lengths and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Flip It, Then Slide It', subtitle: 'Transformations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about transformations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 transformations unit quiz. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'Triangle $ABC$ has vertices $A(1, 2)$, $B(4, 2)$ and $C(1, 4)$. It is reflected in the $y$-axis, and then the image is translated $3$ units down. What are the coordinates of the vertices of the final image, $A^{\\prime\\prime}B^{\\prime\\prime}C^{\\prime\\prime}$?',
          answer: `$A^{\\prime\\prime}${at(TWO[0])}$, $B^{\\prime\\prime}${at(TWO[1])}$, $C^{\\prime\\prime}${at(TWO[2])}$`,
          working: '$(x, y) \\to ({-x}, y) \\to ({-x}, y - 3)$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle "A" B C has vertices "A" at 1, 2, B at 4, 2, and C at 1, 4. It is reflected in the y-axis, and then the image is translated 3 units down. What are the coordinates of the vertices of the final image, "A" double prime, B double prime, C double prime?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [grid(0)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Two moves, **one after the other**: first a **flip** over the $y$-axis, then a **slide** down.' }],
      lines: [
        { say: 'Here is triangle "A" B C on the grid.', show: ['g.grid', 'g.axes', 'g.abc', 'g.abcp'] },
        { say: 'It makes two moves, one after the other. First, a flip over the y-axis. Then, a slide down by 3.', show: 't' },
        { say: 'One prime marks the image after the first move, and two primes mark the final image.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Move', 'Rule'],
          rows: [
            ['reflection in the $y$-axis', '$(x, y) \\to ({-x}, y)$'],
            ['reflection in the $x$-axis', '$(x, y) \\to (x, {-y})$'],
            ['translation $3$ units down', '$(x, y) \\to (x, y - 3)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A reflection in the y-axis flips left and right, so x changes sign and y stays the same.', show: 'rules' },
        { say: 'A reflection in the x-axis is the other way round: y changes sign.' },
        { say: 'And a translation 3 units down keeps x, and takes 3 from y.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Reflect** each vertex in the $y$-axis', '**Translate** each image $3$ units down', '**Check** the shape and size'] }],
      lines: [
        { say: 'Here is the plan. First, reflect each vertex in the y-axis.', show: 'plan.0' },
        { say: 'Second, translate each of those points 3 units down.', show: 'plan.1' },
        { say: 'Third, check that the shape and size have not changed.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Reflect',
      layout: 'split',
      leftWidth: 620,
      left: [grid(1)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: [`A${at(ABC[0])} \\to A^{\\prime}\\good{${at(ONE[0])}}`, `B${at(ABC[1])} \\to B^{\\prime}\\good{${at(ONE[1])}}`, `C${at(ABC[2])} \\to C^{\\prime}\\good{${at(ONE[2])}}`] }],
      lines: [
        { say: 'Step one. Reflect in the y-axis: change the sign of x. "A" at 1, 2 goes to negative 1, 2.', show: ['g.grid', 'g.axes', 'g.abc', 'g.abcp', 'm.0'] },
        { say: 'B at 4, 2 goes to negative 4, 2.', show: 'm.1' },
        { say: 'C at 1, 4 goes to negative 1, 4. Each point is now the same distance from the y-axis, on the other side.', show: ['m.2', 'g.one', 'g.onep'], focus: 'g.one' },
      ],
    },
    {
      chapter: 'Step 2: Translate',
      layout: 'split',
      leftWidth: 620,
      left: [grid(2)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: [`A^{\\prime}${at(ONE[0])} \\to A^{\\prime\\prime}\\good{${at(TWO[0])}}`, `B^{\\prime}${at(ONE[1])} \\to B^{\\prime\\prime}\\good{${at(TWO[1])}}`, `C^{\\prime}${at(ONE[2])} \\to C^{\\prime\\prime}\\good{${at(TWO[2])}}`] }],
      lines: [
        { say: 'Step two. Translate 3 units down: keep x, and take 3 from y. "A" prime at negative 1, 2 goes to negative 1, negative 1.', show: ['g.grid', 'g.axes', 'g.abc', 'g.abcp', 'g.one', 'g.onep', 'm.0'] },
        { say: 'B prime at negative 4, 2 goes to negative 4, negative 1.', show: 'm.1' },
        { say: 'And C prime at negative 1, 4 goes to negative 1, 1. That is the final image.', show: ['m.2', 'g.two', 'g.twop'], focus: 'g.two' },
      ],
    },
    {
      chapter: 'Step 3: Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['AB = 4 - 1 = 3, \\quad A^{\\prime\\prime}B^{\\prime\\prime} = {-1} - ({-4}) = 3 \\ \\checkmark', 'AC = 4 - 2 = 2, \\quad A^{\\prime\\prime}C^{\\prime\\prime} = 1 - ({-1}) = 2 \\ \\checkmark', '(x, y) \\to ({-x}, y - 3) \\ \\checkmark'] }],
      lines: [
        { say: 'Step three, the check. Reflections and translations never change the size. "A" B is 3 units long, and so is "A" double prime B double prime.', show: 'm.0' },
        { say: '"A" C is 2 units long, and so is "A" double prime C double prime.', show: 'm.1' },
        { say: 'And every point followed one rule: x changed sign, and y went down by 3. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$A(1, 2) \\to (1, {-2})$', 'that is a reflection in the **x**-axis'],
            ['$A^{\\prime\\prime}({-1}, 5)$', '**down** means take $3$ from $y$'],
            ['$A^{\\prime\\prime}({-4}, 2)$', 'a slide down changes **y**, not $x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Changing the sign of y reflects in the x-axis, not the y-axis.' },
        { say: 'Down means taking 3 from y. Adding 3 moves the triangle up.' },
        { say: 'And a slide down changes y, not x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $P(2, {-3})$ is rotated $180^\\circ$ about the origin. Where does it go?',
          choices: ['$(2, 3)$', '$({-2}, 3)$', '$({-2}, {-3})$', '$(3, 2)$'],
          answer: 1,
          working: 'A $180^\\circ$ rotation: $(x, y) \\to ({-x}, {-y})$, so $(2, {-3}) \\to ({-2}, 3)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point P at 2, negative 3 is rotated 180 degrees about the origin. Where does it go? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A half turn about the origin changes the sign of both coordinates. So 2, negative 3 goes to negative 2, 3: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Reflect in the $y$-axis: $x$ changes **sign**', 'Translate down: **take** from $y$', 'Do the moves **in order**, one vertex at a time', 'Check: the size and shape stay the **same**'] }],
      lines: [
        { say: 'Here is what to remember. A reflection in the y-axis changes the sign of x.', show: 'sum.0' },
        { say: 'A translation down takes away from y.', show: 'sum.1' },
        { say: 'Do the moves in order, one vertex at a time.', show: 'sum.2' },
        { say: 'And check that the size and shape stay the same. For more on transformations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
