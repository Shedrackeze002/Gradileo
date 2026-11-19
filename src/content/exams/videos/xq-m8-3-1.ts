import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question (pilot of roadmap item 11): a maths sample, for Math 8 lesson 3.1 (ratios). The
// question is NAEP's own, word for word (2009 Grade 8 Sample Questions Booklet, mathematics
// question 2); NAEP questions are made by the U.S. Department of Education and are in the public
// domain. The answer is No: with A at 0 and B at 3, C can be at 2 (AC = 2, CB = 1, between A and B)
// or at 6 (AC = 6, CB = 3, beyond B). C cannot be to the left of A, where it would be nearer A.

/** A number line with A at 0 and B at 3, and both places C can be: 2 and 6. */
const line = (height = 380): DiagramEl => ({
  kind: 'diagram',
  id: 'nl',
  height,
  points: {
    L: [-0.7, 0], R: [6.7, 0], A: [0, 0], t1: [1, 0], C: [2, 0], B: [3, 0], t4: [4, 0], t5: [5, 0], D: [6, 0],
    a1: [0, -0.9], c1: [2, -0.9], b1: [3, -0.9],
    a2: [0, -1.7], d2: [6, -1.7], b3: [3, -2.5], d3: [6, -2.5],
  },
  items: [
    { kind: 'line', id: 'axis', from: 'L', to: 'R', tone: 'muted', arrow: true, group: 'nums' },
    ...(['A', 't1', 'C', 'B', 't4', 't5', 'D'] as const).map((at, i) => ({ kind: 'label' as const, id: `n${i}`, at, tex: String(i), tone: 'muted' as const, place: 'below' as const, dot: true, group: 'nums' })),
    { kind: 'label', id: 'A', at: 'A', tex: 'A', place: 'above', dot: true },
    { kind: 'label', id: 'B', at: 'B', tex: 'B', place: 'above', dot: true },
    { kind: 'label', id: 'C', at: 'C', tex: 'C', tone: 'good', place: 'above', dot: true },
    { kind: 'label', id: 'D', at: 'D', tex: 'C', tone: 'brand', place: 'above', dot: true },
    { kind: 'line', id: 'ac', from: 'a1', to: 'c1', tone: 'adj', label: '2', labelSide: 'right', weight: 5 },
    { kind: 'line', id: 'cb', from: 'c1', to: 'b1', tone: 'opp', label: '1', labelSide: 'right', weight: 5 },
    { kind: 'line', id: 'ad', from: 'a2', to: 'd2', tone: 'adj', label: '6', labelSide: 'right', weight: 5 },
    { kind: 'line', id: 'bd', from: 'b3', to: 'd3', tone: 'opp', label: '3', labelSide: 'right', weight: 5 },
  ],
});

const QUESTION =
  'Jaime knows the following facts about points A, B, and C.<br>• Points A, B, and C are on the same line, but might not be in that order.<br>• Point C is twice as far from point A as it is from point B.<br>Jaime concluded that point C is always between points A and B. Is Jaime’s conclusion correct? In the space provided, use a diagram to explain your answer.';

const video: Explainer = {
  id: 'xq-m8-3-1',
  lessonId: '',
  exam: {
    lesson: 'm8-3-1',
    source: 'NAEP 2009 Grade 8 Sample Questions Booklet, mathematics question 2',
    licence: 'public domain, U.S. Department of Education (NCES)',
    url: 'https://nces.ed.gov/nationsreportcard/pdf/demo_booklet/09SQ-G08-MRS.pdf',
  },
  title: 'Exam Question: Is Point C Always Between A and B?',
  thumbnailTitle: 'Always Between?',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: point C is twice as far from A as it is from B, and Jaime says C is always between A and B. We put A and B on a number line, find every place C could be, and see that C can also sit beyond B. So the answer is no, and one diagram proves it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Always Between?', subtitle: 'Distances on a line, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about three points on a line. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from a national test in the United States, called NAEP. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          choices: ['Yes', 'No'],
          answer: 1,
          working: 'With $A = 0$ and $B = 3$, point C can be at 2 or at 6, and 6 is not between A and B.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Jaime knows two facts about points A, B and C. First, the points are on the same line, but might not be in that order. Second, point C is twice as far from point A as it is from point B.' },
        { say: 'Jaime concluded that point C is always between points A and B. Is Jaime right? Answer yes or no, and use a diagram to explain.' },
        { say: 'If you would like to try it first, pause the video now. Try drawing it.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ask',
          items: ['Three points on **one straight line**, in any order', 'C is **twice as far** from A as it is from B', 'Is C **always** between A and B?'],
        },
      ],
      lines: [
        { say: 'Let us say it in everyday words. We have three points on one straight line, and they could be in any order.', show: 'ask.0' },
        { say: 'Point C is twice as far from A as it is from B. So if C is one step from B, it is two steps from A.', show: 'ask.1' },
        { say: 'The question is: does that force C to sit between A and B, every single time?', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Always, and a counterexample',
          md: 'A statement that says **always** must be true in **every** case. One case where it is false, called a **counterexample**, is enough to show it is wrong.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '"Every bird can fly." A penguin is a bird that cannot fly, so the statement is false.' },
      ],
      lines: [
        { say: 'Here is the one idea we need. The word always is a big promise. It says something is true in every case, with no exceptions.', show: 'def' },
        { say: 'To show that an always statement is wrong, you only need one case where it fails. That case is called a counterexample.' },
        { say: 'For example: every bird can fly. A penguin is a bird, and it cannot fly. One penguin is enough to show the statement is false.', show: 'ex' },
        { say: 'So if we can find just one place for C that follows both facts, but is not between A and B, Jaime is wrong.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Put A and B on a **number line**', 'Find a place for C **between** A and B', 'Look for a place for C **outside** A and B', 'Decide: is C **always** between?'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, put A and B on a number line, so we can measure distances by counting.', show: 'plan.0' },
        { say: 'Second, find a place for C between A and B that works.', show: 'plan.1' },
        { say: 'Third, look for a place for C outside A and B that also works.', show: 'plan.2' },
        { say: 'And fourth, decide whether C is always between.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: A number line',
      layout: 'center',
      main: [line(), { kind: 'text', id: 'pick', size: 'lg', md: 'Pick easy numbers: $A = 0$ and $B = 3$.' }],
      lines: [
        { say: 'Step one. The question gives no distances, so we can choose them ourselves. Easy numbers make it simple to count.', show: ['nl.axis', 'nl.nums'] },
        { say: 'Let us put A at zero and B at three.', show: ['nl.A', 'nl.B', 'pick'] },
      ],
    },
    {
      chapter: 'Step 2: C between A and B',
      layout: 'center',
      main: [line(), { kind: 'math', id: 'm', size: 'md', lines: ['AC = 2,\\quad CB = 1', '2 = 2 \\times 1\\ \\checkmark'] }],
      lines: [
        { say: 'Step two. Let us look between A and B. Pause and try it: where could C go so that it is twice as far from A as from B?', show: ['nl.axis', 'nl.nums', 'nl.A', 'nl.B'], wait: 4 },
        { say: 'Try C at two. From A to C is two steps.', show: ['nl.C', 'nl.ac'] },
        { say: 'From C to B is one step.', show: 'nl.cb' },
        { say: 'Two is twice one, so C at two follows both facts. And it is between A and B, just as Jaime said.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: C outside A and B',
      layout: 'center',
      main: [line(), { kind: 'math', id: 'm', size: 'md', lines: ['AC = 6,\\quad CB = 3', '6 = 2 \\times 3\\ \\checkmark'] }],
      lines: [
        { say: 'Step three. Jaime only thought about one picture. But the question says the points might not be in that order. So let us look beyond B.', show: ['nl.axis', 'nl.nums', 'nl.A', 'nl.B'] },
        { say: 'Try C at six. From A to C is six steps.', show: ['nl.D', 'nl.ad'] },
        { say: 'From B to C is three steps.', show: 'nl.bd' },
        { say: 'Six is twice three. So C at six follows both facts too. But six is not between A and B!', show: ['m.0', 'm.1'], focus: 'nl.D' },
      ],
    },
    {
      chapter: 'Step 4: The answer',
      layout: 'center',
      main: [line(), { kind: 'text', id: 'ans', size: 'lg', md: '**No.** C can be at 2, between A and B, **or** at 6, beyond B.' }],
      lines: [
        { say: 'Step four. Here are both places on one diagram.', show: ['nl.axis', 'nl.nums', 'nl.A', 'nl.B', 'nl.C', 'nl.ac', 'nl.cb', 'nl.D', 'nl.ad', 'nl.bd'] },
        { say: 'C at six is a counterexample. It follows both facts, but it is not between A and B. So Jaime\'s conclusion is not correct. The answer is no.', show: 'ans', focus: 'ans' },
        { say: 'On the test, this diagram is your explanation. Draw A, B and both places for C, and write the distances on it, so the marker can count them.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'chk',
          items: ['Left of A: C is **nearer A** than B, so it can never be twice as far from A', 'Between A and B: C at **2** works', 'Beyond B: C at **6** works'],
        },
      ],
      lines: [
        { say: 'Let us check that we have not missed anything. Could C be to the left of A?', show: 'chk.0' },
        { say: 'No. To the left of A, C is always nearer to A than to B. So it can never be twice as far from A.' },
        { say: 'So there are exactly two places for C: one between A and B, and one beyond B. Our answer holds.', show: ['chk.1', 'chk.2'] },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Answer', 'What happened'],
          rows: [
            ['Yes', 'Only one picture drawn, with C **between** A and B'],
            ['No, with no diagram', 'Right answer, but the question asks you to **explain** with a diagram'],
            ['No, with C at 6', 'One **counterexample**, drawn and measured. Correct'],
          ],
        },
      ],
      lines: [
        { say: 'This question has two traps.', show: 'traps' },
        { say: 'The first is to draw only the obvious picture, with C between A and B, and answer yes. That is exactly what Jaime did.' },
        { say: 'The second is to answer no, but forget the diagram. The question asks you to explain, so a bare no would lose marks.' },
        { say: 'A full answer is no, with a diagram that shows a place for C beyond B, and the distances that prove it works.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Points P, Q and R are on the same line. R is three times as far from P as it is from Q. P is at 0 and Q is at 4. Where could R be?',
          choices: ['Only at 3', 'Only at 6', 'At 3 or at 6', 'At 1 or at 6'],
          answer: 2,
          working: 'At 3: $PR = 3$, $RQ = 1$. At 6: $PR = 6$, $RQ = 2$. Both follow the rule.',
        },
      ],
      lines: [
        { say: 'Your turn. Points P, Q and R are on the same line. R is three times as far from P as it is from Q. P is at zero and Q is at four. Where could R be? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'At three, R is three steps from P and one step from Q. At six, R is six steps from P and two steps from Q. Both follow the rule, so the answer is choice C.', show: 'q2.answer' },
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
          items: ['**Always** means every case; one **counterexample** proves it wrong', 'Put points on a number line with easy numbers', '"Might not be in that order": check **every** order', 'Explain with a diagram, and write the distances on it'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Always means every case, and one counterexample is enough to prove it wrong.', show: 'sum.0' },
        { say: 'Putting points on a number line, with easy numbers, lets you measure distances by counting.', show: 'sum.1' },
        { say: 'When a question says the points might not be in that order, check every order.', show: 'sum.2' },
        { say: 'And when it asks for a diagram, draw it, and write the distances on it. For more on ratios, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
