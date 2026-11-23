import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// Exam question for Chemistry 9 lesson 4.2 (the pH scale): read four pH values for the most acidic,
// the neutral and the alkaline solution, and work out the hydrogen-ion ratio between pH 2 and
// pH 5. Written by Gradileo in the style of a Grade 9 science unit test.
//
// The picture is one pH step up close, the same volume at pH 2 and pH 3, built like the lesson's
// (src/video/particles.ts): ions in water, held so loosely that they never clump.

const QUESTION = 'Four solutions are tested with universal indicator. Solution P has pH 2, Q has pH 5, R has pH 7 and S has pH 12. (a) Which solution is the most strongly acidic, and what colour does universal indicator turn in it? (b) Which solution is neutral, and which is alkaline? (c) For the same volume, how many times more hydrogen ions are there in solution P than in solution Q?';

/** A solution with this many hydrogen ions among the water molecules. */
const solution = (id: string, ions: number, label: string): ParticleBox => ({
  id,
  state: 'gas',
  width: 10,
  height: 9,
  temp: 0.5,
  kinds: [
    { n: ions, bond: 0.05, heavy: 0, size: 0.8, tone: 'bad', name: 'hydrogen ion' },
    { n: 30, bond: 0.05, heavy: 0, tone: 'adj', name: 'water' },
  ],
  tally: { kinds: [0], label: 'hydrogen ions' },
  label,
});

/** The same volume of two acids, one pH unit apart: ten times as many hydrogen ions in the lower. */
const tenfold: ParticlesEl = {
  kind: 'particles',
  id: 'tf',
  boxes: [solution('a', 10, 'pH 2'), solution('b', 1, 'pH 3')],
  clips: {},
  key: true,
  height: 420,
};

const video: Explainer = {
  id: 'xq-c9-4-2',
  lessonId: '',
  exam: {
    lesson: 'c9-4-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Four Solutions on the pH Scale',
  thumbnailTitle: 'Reading the pH Scale',
  thumbnail: 'tf',
  summary:
    'A test-style question, solved one small step at a time: which of four solutions is the most acidic, which is neutral and which alkaline, and how many times more hydrogen ions are in pH 2 than pH 5? P at pH 2 is most acidic and turns universal indicator red, R at pH 7 is neutral and S at pH 12 is alkaline. Each pH step is ten times, so three steps is 10 × 10 × 10 = 1000 times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Reading the pH Scale', subtitle: 'Acidic, neutral and alkaline' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the p H scale. We will take it one small step at a time, so that every step makes sense.', caption: 'In this video, we solve a test-style question about the pH scale. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'P, red; R neutral, S alkaline; 1000 times' }],
      lines: [
        { say: 'Here is the question. Four solutions are tested with universal indicator. Solution P has p H two, Q has p H five, R has p H seven and S has p H twelve. Part a: which solution is the most strongly acidic, and what colour does universal indicator turn in it? Part b: which solution is neutral, and which is alkaline? Part c: for the same volume, how many times more hydrogen ions are there in solution P than in solution Q?', caption: 'Here is the question. Four solutions are tested with universal indicator. P has pH 2, Q has pH 5, R has pH 7 and S has pH 12. (a) Which is the most strongly acidic, and what colour does universal indicator turn in it? (b) Which is neutral, and which is alkaline? (c) For the same volume, how many times more hydrogen ions are in P than in Q?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Place each solution on the **pH scale**, then count the **steps** between two of them' }],
      lines: [
        { say: 'We place each solution on the p H scale to say what kind it is. Then we count the steps between two solutions to compare their hydrogen ions.', caption: 'We place each solution on the pH scale to say what kind it is. Then we count the steps between two solutions to compare their hydrogen ions.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [tenfold],
      lines: [
        { say: 'Here is what we need: one step on the p H scale, up close. Both boxes hold the same volume of solution. On the left the p H is two, and on the right it is three.', caption: 'Here is what we need: one step on the pH scale, up close. Both boxes hold the same volume. On the left the pH is 2, and on the right it is 3.', show: ['tf', 'tf.labels', 'tf.key'] },
        { say: 'Count the red hydrogen ions moving among the water molecules. The p H two solution has ten for every one in the p H three solution. One step down the scale means ten times as many hydrogen ions.', caption: 'Count the red hydrogen ions among the water molecules. The pH 2 solution has ten for every one in the pH 3 solution. One step down the scale means ten times as many hydrogen ions.', show: 'tf.tally' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Below **7**: acidic. **7**: neutral. Above **7**: alkaline', 'The **lower** the pH, the more strongly acidic', 'Each pH step = **10 times** the hydrogen ions'] }],
      lines: [
        { say: 'Here is the plan. Below seven is acidic, seven is neutral, and above seven is alkaline.', show: 'plan.0' },
        { say: 'The lower the p H, the more strongly acidic the solution.', caption: 'The lower the pH, the more strongly acidic the solution.', show: 'plan.1' },
        { say: 'And each step on the scale means ten times as many hydrogen ions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The most acidic',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solution', 'pH', 'Type', 'Universal indicator'],
          rows: [
            ['P', '2', '**strongly acidic**', '**red**'],
            ['Q', '5', 'weakly acidic', 'yellow'],
            ['R', '7', '**neutral**', 'green'],
            ['S', '12', '**alkaline**', 'purple'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. P has the lowest p H, two, so it is the most strongly acidic. Universal indicator turns red in it. That is part a.', caption: 'Step one. P has the lowest pH, 2, so it is the most strongly acidic. Universal indicator turns red in it. That is part a.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Q, at five, is acidic too, but only weakly.', show: 't.1' },
        { say: 'Step two. R is exactly seven, so it is neutral, and S is above seven, so it is alkaline. That is part b.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Step 2: Counting the steps',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{pH } 2 \\text{ to pH } 5 = 3 \\text{ steps}', '10 \\times 10 \\times 10 = \\good{1000 \\text{ times}}'] }],
      lines: [
        { say: 'Step three. From p H two to p H five is three steps.', caption: 'Step three. From pH 2 to pH 5 is three steps.', show: 'm.0' },
        { say: 'Each step is ten times, so three steps is ten times ten times ten, which is one thousand. P has a thousand times as many hydrogen ions as Q. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **P**; universal indicator turns **red**. (b) **R** is neutral, and **S** is alkaline. (c) **1000 times** as many.' },
      ],
      lines: [
        { say: 'Does it make sense? A strong acid like stomach acid, around p H two, is far more acidic than black coffee, around five, so a large factor like a thousand fits.', caption: 'Does it make sense? Stomach acid, around pH 2, is far more acidic than black coffee, around 5, so a large factor like a thousand fits.', show: 'ans' },
        { say: 'So P is the most acidic and turns red, R is neutral, S is alkaline, and P has a thousand times as many hydrogen ions as Q.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['**S** is the most acidic', 'Thought a **higher** pH is more acidic'],
            ['**3 times** as many', 'Each step is **×10**, not +1'],
            ['**30 times** as many', 'Did **10 × 3**, not 10 × 10 × 10'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The lower the p H, the more acidic. Twelve is strongly alkaline, not acidic.', caption: 'The lower the pH, the more acidic. 12 is strongly alkaline, not acidic.', focus: 'traps.0' },
        { say: 'The scale goes up in steps of ten times, so a difference of three is not three times.', focus: 'traps.1' },
        { say: 'And three steps means multiplying by ten three times, not ten times three.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For the same volume, how many times more hydrogen ions are in a solution of pH 4 than in one of pH 6?',
          choices: ['2', '100', '20', '1000'],
          answer: 1,
          working: 'pH 4 to pH 6 is 2 steps: 10 × 10 = 100 times.',
        },
      ],
      lines: [
        { say: 'Your turn. For the same volume, how many times more hydrogen ions are in a solution of p H four than in one of p H six? Pause the video and try it.', caption: 'Your turn. For the same volume, how many times more hydrogen ions are in a solution of pH 4 than in one of pH 6? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'That is two steps, so ten times ten, which is one hundred: choice B.', show: 'q2.answer' },
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
          items: ['Below 7 **acidic**, 7 **neutral**, above 7 **alkaline**', 'Lower pH: **more** acidic; universal indicator **red**', 'Each pH step = **10 times** the hydrogen ions'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Below seven is acidic, seven is neutral, and above seven is alkaline.', show: 'sum.0' },
        { say: 'The lower the p H, the more acidic, and strong acids turn universal indicator red.', caption: 'The lower the pH, the more acidic, and strong acids turn universal indicator red.', show: 'sum.1' },
        { say: 'And each step on the scale means ten times the hydrogen ions. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
