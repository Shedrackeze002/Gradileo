import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { plane } from '@/video/graph.ts';
import { around, base, mirror, shapeIds, triangle } from '@/content/math7/videos/lib/m7-9-figures.ts';

type P = [number, number];

// Exam question for Math 8 lesson 9.2 (congruence and transformations). The free textbooks we use
// have no question like it at this level, so Gradileo wrote it in the style of a Grade 8 unit
// test. A reflection in the y-axis changes the sign of x: A(1, 2) → (−1, 2) = Q, B(5, 2) →
// (−5, 2) = R, C(1, 5) → (−1, 5) = P. So △ABC ≅ △QRP, and BC (4 across, 3 up: 5 units) matches RP.

const QUESTION =
  'Triangle ABC has vertices A(1, 2), B(5, 2) and C(1, 5). Triangle PQR has vertices P(−1, 5), Q(−1, 2) and R(−5, 2). (a) Describe a single transformation that maps triangle ABC onto triangle PQR. (b) Write a congruence statement for the two triangles, with the vertices in matching order. (c) Side BC is 5 units long. Which side of triangle PQR is also 5 units long?';

const ABC: P[] = [
  [1, 2],
  [5, 2],
  [1, 5],
];
const PQR: P[] = [
  [-1, 5],
  [-1, 2],
  [-5, 2],
];

const grid = (id: string, o: { mirror?: boolean; turns?: boolean } = {}) => {
  const g = plane({ x: [-6, 6], y: [-1, 6], width: 12, height: 7 });
  return figure(id, [
    g,
    ...(o.mirror ? [mirror(g, 'my', 'y')] : []),
    triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['below', 'below right', 'above right'] }),
    triangle(g, { id: 'i', corners: PQR, names: ['P', 'Q', 'R'], places: ['above left', 'below', 'below left'], tone: 'good' }),
    ...(o.turns ? [around(g, 'ta', ABC, 'ccw'), around(g, 'ia', PQR, 'cw', { tone: 'good' })] : []),
  ], 420);
};

const video: Explainer = {
  id: 'xq-m8-9-2',
  lessonId: '',
  exam: {
    lesson: 'm8-9-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Which Vertex Lands Where? (Congruence and Transformations)',
  thumbnailTitle: 'Which Vertex Lands Where?',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: triangle ABC has vertices A(1, 2), B(5, 2) and C(1, 5), and triangle PQR has vertices P(−1, 5), Q(−1, 2) and R(−5, 2). Describe the transformation, write a congruence statement, and find the side of PQR that is 5 units long, like BC. Every x changes sign and every y stays the same, so it is a reflection in the y-axis. A lands on Q, B on R and C on P, so △ABC ≅ △QRP, and side BC matches side RP. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Vertex Lands Where?', subtitle: 'Congruence and transformations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about congruence and transformations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Triangle $ABC$ has vertices $A(1, 2)$, $B(5, 2)$ and $C(1, 5)$. Triangle $PQR$ has vertices $P(-1, 5)$, $Q(-1, 2)$ and $R(-5, 2)$. (a) Describe a single transformation that maps $ABC$ onto $PQR$. (b) Write a congruence statement, with the vertices in matching order. (c) Side $BC$ is $5$ units long. Which side of $PQR$ is also $5$ units long?',
          answer: '(a) a reflection in the $y$-axis (b) $\\triangle ABC \\cong \\triangle QRP$ (c) $RP$',
          working: 'A → Q, B → R, C → P',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle "A" "B" "C" has vertices "A", the point at 1, 2, "B", the point at 5, 2, and "C", the point at 1, 5. Triangle "P" "Q" "R" has vertices "P", the point at negative 1, 5, "Q", the point at negative 1, 2, and "R", the point at negative 5, 2.', caption: 'Triangle ABC has vertices A(1, 2), B(5, 2) and C(1, 5). Triangle PQR has vertices P(−1, 5), Q(−1, 2) and R(−5, 2).' },
        { say: 'Part a: describe a single transformation that maps triangle "A" "B" "C" onto triangle "P" "Q" "R". Part b: write a congruence statement, with the vertices in matching order. Part c: side "B" "C" is 5 units long. Which side of triangle "P" "Q" "R" is also 5 units long?', caption: 'Part a: describe a single transformation that maps triangle ABC onto triangle PQR. Part b: write a congruence statement, with the vertices in matching order. Part c: side BC is 5 units long. Which side of triangle PQR is also 5 units long?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 580,
      left: [grid('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Matching order', md: 'A slide, a turn or a flip moves a shape **without changing** its size or shape, so the image is **congruent**. Each vertex **lands** on a partner, and a congruence statement lists the partners in **matching order**.' }],
      lines: [
        { say: 'Here are the two triangles. Triangle "A" "B" "C" is on the right, and triangle "P" "Q" "R" is on the left.', caption: 'Here are the two triangles. Triangle ABC is on the right, and triangle PQR is on the left.', show: [...base('ask'), ...shapeIds('ask', 't'), ...shapeIds('ask', 'i')] },
        { say: 'A slide, a turn or a flip moves a shape without changing its size or shape, so the image is congruent. Each vertex lands on a partner, and we need to find which.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{reflection in the } y\\text{-axis: } (x,\\ y) \\to ({-x},\\ y)', '\\text{a reflection reverses the way the vertices go round}', '\\text{write where } A, B, C \\text{ land, in that order}'] }],
      lines: [
        { say: 'Here is what we need. A reflection in the "y" axis changes the sign of "x", and keeps "y" the same.', caption: 'Here is what we need. A reflection in the y-axis changes the sign of x, and keeps y the same.', show: 'm.0' },
        { say: 'A reflection flips the shape over, so its vertices go round the opposite way. A slide or a turn keeps them going the same way.', show: 'm.1' },
        { say: 'And in the congruence statement, the image letters go in the order of where "A", "B" and "C" land.', caption: 'And in the congruence statement, the image letters go in the order of where A, B and C land.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Compare the **coordinates**', '(b) Follow each vertex to its **partner**', '(c) Find the side that **matches** $BC$'] }],
      lines: [
        { say: 'Here is the plan. For part a, compare the coordinates of the two triangles.', show: 'plan.0' },
        { say: 'For part b, follow each vertex to the partner it lands on.', show: 'plan.1' },
        { say: 'For part c, find the side that matches "B" "C".', caption: 'For part c, find the side that matches BC.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Flip, match, find',
      layout: 'split',
      leftWidth: 580,
      left: [grid('st', { mirror: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(1,\\ 2) \\to ({-1},\\ 2) = Q', '(5,\\ 2) \\to ({-5},\\ 2) = R', '(1,\\ 5) \\to ({-1},\\ 5) = P', '\\text{(a) reflection in the } y\\text{-axis}', '\\text{(b) } \\triangle ABC \\cong \\triangle \\good{QRP}', '\\text{(c) } BC \\leftrightarrow \\good{RP}'] }],
      lines: [
        { say: 'Step one, part a. Change the sign of each "x". "A", the point at 1, 2, goes to the point at negative 1, 2. That is "Q".', caption: 'Step one, part a. Change the sign of each x. A(1, 2) goes to (−1, 2). That is Q.', show: [...base('st'), ...shapeIds('st', 't'), ...shapeIds('st', 'i'), 'm.0'], focus: ['st.t-0', 'st.i-1', 'm.0'] },
        { say: '"B", the point at 5, 2, goes to the point at negative 5, 2, which is "R". And "C", the point at 1, 5, goes to the point at negative 1, 5, which is "P".', caption: 'B(5, 2) goes to (−5, 2), which is R. And C(1, 5) goes to (−1, 5), which is P.', show: ['m.1', 'm.2'], focus: ['st.t-1', 'st.i-2', 'st.t-2', 'st.i-0', 'm.1', 'm.2'] },
        { say: 'Every "x" changed sign, and every "y" stayed the same. So it is a reflection in the "y" axis, the mirror line.', caption: 'Every x changed sign, and every y stayed the same. So it is a reflection in the y-axis, the mirror line.', show: ['st.my', 'm.3'], focus: ['st.my', 'm.3'] },
        { say: 'Step two, part b. "A" lands on "Q", "B" lands on "R", and "C" lands on "P". So triangle "A" "B" "C" is congruent to triangle "Q" "R" "P".', caption: 'Step two, part b. A lands on Q, B lands on R, and C lands on P. So △ABC ≅ △QRP.', show: 'm.4', focus: 'm.4' },
        { say: 'Step three, part c. "B" matches "R", and "C" matches "P". So side "B" "C" matches side "R" "P", and "R" "P" is 5 units long too.', caption: 'Step three, part c. B matches R, and C matches P. So side BC matches side RP, and RP is 5 units long too.', show: 'm.5', focus: ['st.i', 'm.5'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 580,
      left: [grid('ck', { turns: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['ABC: \\text{ counterclockwise}', 'QRP: \\text{ clockwise} \\ \\checkmark', 'RP: 4 \\text{ across}, 3 \\text{ up}', '\\sqrt{4^2 + 3^2} = 5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Going from "A" to "B" to "C", the vertices go round counterclockwise.', caption: 'Let us check. Going from A to B to C, the vertices go round counterclockwise.', show: [...base('ck'), ...shapeIds('ck', 't'), ...shapeIds('ck', 'i'), 'ck.ta', 'm.0'], focus: ['ck.ta', 'm.0'] },
        { say: 'Going from their partners, "Q" to "R" to "P", they go round clockwise: the opposite way, as a reflection should.', caption: 'Going from their partners, Q to R to P, they go round clockwise: the opposite way, as a reflection should.', show: ['ck.ia', 'm.1'], focus: ['ck.ia', 'm.1'] },
        { say: 'And "R" "P" goes 4 squares across and 3 squares up. By the Pythagorean theorem, its length is the square root of 16 plus 9, which is 5. It checks out.', caption: 'And RP goes 4 squares across and 3 squares up. By the Pythagorean theorem, its length is √(16 + 9) = 5. It checks out.', show: ['m.2', 'm.3'], focus: 'm.3' },
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
            ['$\\triangle ABC \\cong \\triangle PQR$', 'letters in **alphabetical** order: $A$ lands on $Q$, not $P$'],
            ['a translation', 'the vertices go round the **opposite** way: it is a **flip**'],
            ['$QR$', '$QR$ matches $AB$, which is $4$ units long'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Triangle "A" "B" "C" is congruent to triangle "P" "Q" "R" looks neat, but it puts the letters in alphabetical order. "A" lands on "Q", not on "P".', caption: '△ABC ≅ △PQR looks neat, but it puts the letters in alphabetical order. A lands on Q, not on P.' },
        { say: 'A translation, or slide, would keep the vertices going round the same way. Here they go round the opposite way, so it is a flip.' },
        { say: 'And "Q" "R" matches "A" "B", which is only 4 units long.', caption: 'And QR matches AB, which is only 4 units long.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A reflection maps $\\triangle DEF$ onto $\\triangle XYZ$. It sends $D$ to $Y$, $E$ to $Z$ and $F$ to $X$. Which congruence statement is correct?',
          choices: ['$\\triangle DEF \\cong \\triangle YZX$', '$\\triangle DEF \\cong \\triangle XYZ$', '$\\triangle DEF \\cong \\triangle ZXY$', '$\\triangle DEF \\cong \\triangle YXZ$'],
          answer: 0,
          working: 'Write where D, E and F land, in that order: Y, Z, X.',
        },
      ],
      lines: [
        { say: 'Your turn. A reflection maps triangle "D" "E" "F" onto triangle "X" "Y" "Z". It sends "D" to "Y", "E" to "Z", and "F" to "X". Which congruence statement is correct? Pause the video and try it.', caption: 'Your turn. A reflection maps △DEF onto △XYZ. It sends D to Y, E to Z, and F to X. Which congruence statement is correct? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Write where "D", "E" and "F" land, in that order: "Y", "Z", "X". So triangle "D" "E" "F" is congruent to triangle "Y" "Z" "X". Choice "A".', caption: 'Write where D, E and F land, in that order: Y, Z, X. So △DEF ≅ △YZX. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slides, turns and flips give **congruent** images', 'Follow each vertex to where it **lands**', 'Write the partners in **matching order**', 'A flip **reverses** the way the vertices go round'] }],
      lines: [
        { say: 'Here is what to remember. Slides, turns and flips give congruent images.', show: 'sum.0' },
        { say: 'Follow each vertex to the partner it lands on.', show: 'sum.1' },
        { say: 'Write the partners in matching order in the congruence statement.', show: 'sum.2' },
        { say: 'And a flip reverses the way the vertices go round. For more on congruence and transformations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
