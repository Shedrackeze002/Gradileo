import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 8.1 (angles and 2-D shapes). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and the
// Pythagorean Theorem, CC BY-NC-SA 4.0). Supplement: 180 − 25 = 155°. Complement: 90 − 25 = 65°, as
// in the book's answer. Check: 25 + 155 = 180 and 25 + 65 = 90.

const ray: [number, number] = [5 * Math.cos((25 * Math.PI) / 180), 5 * Math.sin((25 * Math.PI) / 180)];

/** A straight angle split into 25° and its supplement. */
const straight = (height = 300): DiagramEl => ({
  kind: 'diagram',
  id: 'sup',
  height,
  points: { O: [0, 0], A: [5, 0], B: [-5, 0], C: ray },
  items: [
    { kind: 'line', id: 'line', from: 'B', to: 'A', tone: 'ink', weight: 3, group: 'base' },
    { kind: 'line', id: 'oc', from: 'O', to: 'C', tone: 'ink', weight: 3, group: 'base' },
    { kind: 'angle', id: 'small', at: 'O', from: 'A', to: 'C', tone: 'opp', label: '25^\\circ', r: 70, group: 'base' },
    { kind: 'angle', id: 'big', at: 'O', from: 'C', to: 'B', tone: 'adj', label: '155^\\circ', r: 50, group: 'other' },
  ],
});

/** A right angle split into 25° and its complement. */
const corner = (height = 300): DiagramEl => ({
  kind: 'diagram',
  id: 'comp',
  height,
  points: { O: [0, 0], X: [5, 0], Y: [0, 5], C: ray },
  items: [
    { kind: 'line', id: 'ox', from: 'O', to: 'X', tone: 'ink', weight: 3, group: 'base' },
    { kind: 'line', id: 'oy', from: 'O', to: 'Y', tone: 'ink', weight: 3, group: 'base' },
    { kind: 'right', id: 'sq', at: 'O', from: 'X', to: 'Y', group: 'base' },
    { kind: 'line', id: 'oc', from: 'O', to: 'C', tone: 'ink', weight: 3, group: 'base' },
    { kind: 'angle', id: 'small', at: 'O', from: 'X', to: 'C', tone: 'opp', label: '25^\\circ', r: 90, group: 'base' },
    { kind: 'angle', id: 'rest', at: 'O', from: 'C', to: 'Y', tone: 'adj', label: '65^\\circ', r: 70, group: 'other' },
  ],
});

const QUESTION = 'An angle measures 25°. Find its: (a) supplement (b) complement.';

const video: Explainer = {
  id: 'xq-m104-8-1',
  lessonId: '',
  exam: {
    lesson: 'm104-8-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: Supplement and Complement of 25° (Angles and 2-D Shapes)',
  thumbnailTitle: 'Supplement and Complement of 25°',
  thumbnail: 'sup',
  summary:
    'A real test question, solved one small step at a time: an angle measures 25°. Find its supplement and its complement. Supplementary angles add to 180°, so the supplement is 180 − 25 = 155°. Complementary angles add to 90°, so the complement is 90 − 25 = 65°. Then we check by adding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Supplement and Complement of 25°', subtitle: 'Angles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about angles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'An angle measures $25^\\circ$. Find its: (a) supplement (b) complement.',
          answer: '(a) $155^\\circ$ (b) $65^\\circ$',
          working: '$180 - 25 = 155$, and $90 - 25 = 65$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'An angle measures 25 degrees. Find its supplement, and its complement.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['25^\\circ + \\ ? = 180^\\circ', '25^\\circ + \\ ? = 90^\\circ'] },
        { kind: 'text', id: 't', size: 'md', md: 'Each one asks: what **goes with** $25^\\circ$ to make a special angle?' },
      ],
      lines: [
        { say: 'The supplement is the angle that goes with 25 degrees to make 180 degrees.', show: 'm.0' },
        { say: 'The complement is the angle that goes with 25 degrees to make 90 degrees.', show: 'm.1' },
        { say: 'So each part asks what goes with 25 degrees to make a special angle.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{supplementary: add to } 180^\\circ', '\\text{complementary: add to } 90^\\circ'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Which is which?', md: '$180^\\circ$ is a **straight** line. $90^\\circ$ is a **corner**, a right angle. A way to remember: **c** comes before **s**, and $90$ comes before $180$.' },
      ],
      lines: [
        { say: 'Here is what we need. Supplementary angles add up to 180 degrees. Complementary angles add up to 90 degrees.', show: 'f' },
        { say: '180 degrees is a straight line, and 90 degrees is a corner, a right angle. To remember which is which: c comes before s in the alphabet, and 90 comes before 180.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Supplement: **$180$ minus** the angle', 'Complement: **$90$ minus** the angle', 'Check by **adding**'] }],
      lines: [
        { say: 'Here is the plan. For the supplement, take the angle away from 180.', show: 'plan.0' },
        { say: 'For the complement, take it away from 90.', show: 'plan.1' },
        { say: 'Then check by adding.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The supplement',
      layout: 'center',
      main: [straight(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } 180 - 25 = \\good{155^\\circ}'] }],
      lines: [
        { say: 'Step one. Here is the 25 degree angle, sitting on a straight line. The whole straight line is 180 degrees.', show: 'sup.base' },
        { say: 'The rest of the straight line is the supplement: 180 minus 25, which is 155 degrees.', show: ['sup.other', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The complement',
      layout: 'center',
      main: [corner(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(b) } 90 - 25 = \\good{65^\\circ}'] }],
      lines: [
        { say: 'Step two. Now put the 25 degree angle inside a right angle, which is 90 degrees.', show: 'comp.base' },
        { say: 'The rest of the corner is the complement: 90 minus 25, which is 65 degrees.', show: ['comp.other', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['25 + 155 = 180 \\ \\checkmark', '25 + 65 = 90 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 25 plus 155 is 180. That is a straight line.', show: 'm.0' },
        { say: 'And 25 plus 65 is 90. That is a right angle. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $65^\\circ$, (b) $155^\\circ$', 'mixed them up: **s**upplement is **s**traight, $180^\\circ$'],
            ['$335^\\circ$', 'used $360^\\circ$: that is a full turn'],
            ['$205^\\circ$', '**added** $25$: take it **away**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Swapping the answers mixes up the two words. Supplement goes with a straight line, 180 degrees. Complement goes with a corner, 90 degrees.' },
        { say: '335 degrees takes 25 from 360, a full turn. Supplements use 180.' },
        { say: 'And 205 adds 25 to 180. The two angles must add up to 180, so take 25 away.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An angle measures $40^\\circ$. What is its supplement?',
          choices: ['$50^\\circ$', '$320^\\circ$', '$40^\\circ$', '$140^\\circ$'],
          answer: 3,
          working: '$180 - 40 = 140^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. An angle measures 40 degrees. What is its supplement? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The supplement adds with it to make 180. 180 minus 40 is 140 degrees. Choice "D". 50 degrees would be its complement.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Supplementary**: add to $180^\\circ$', '**Complementary**: add to $90^\\circ$', 'Subtract the angle from $180$ or $90$', 'Check by **adding**'] }],
      lines: [
        { say: 'Here is what to remember. Supplementary angles add up to 180 degrees, a straight line.', show: 'sum.0' },
        { say: 'Complementary angles add up to 90 degrees, a right angle.', show: 'sum.1' },
        { say: 'To find one, subtract the angle you know from 180 or 90.', show: 'sum.2' },
        { say: 'And check by adding. For more on angles and 2-D shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
