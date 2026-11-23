import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 2.2 (the cosine law). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 8.2, Non-right Triangles: Law of Cosines,
// CC BY-NC-SA 4.0). The book prints no answer for it. The 50° angle is between the 40 ft and 65 ft
// sides, so c² = 40² + 65² − 2(40)(65) cos 50° ≈ 5,825 − 3,342.5 = 2,482.5 and c ≈ 49.8 ft.

/** The pool: the 65 ft side along the bottom, the 40 ft side at 50°, and the third side c. */
const pool = (c = 'c', height = 420): DiagramEl => ({
  kind: 'diagram',
  id: 'd',
  height,
  points: { P: [0, 0], Q: [6.5, 0], R: [2.571, 3.064] },
  items: [
    { kind: 'region', id: 'water', points: ['P', 'Q', 'R'], tone: 'adj', shade: 0.2 },
    { kind: 'line', id: 'long', from: 'P', to: 'Q', tone: 'opp', weight: 5, label: '65\\text{ ft}', group: 'known' },
    { kind: 'line', id: 'short', from: 'P', to: 'R', tone: 'theta', weight: 5, label: '40\\text{ ft}', group: 'known' },
    { kind: 'angle', id: 'a50', at: 'P', from: 'Q', to: 'R', tone: 'good', label: '50^\\circ', r: 50, labelDist: 85 },
    { kind: 'line', id: 'third', from: 'R', to: 'Q', tone: 'hyp', weight: 5, dashed: true, label: c },
  ],
});

const QUESTION =
  'A triangular swimming pool measures 40 feet on one side and 65 feet on another side. These sides form an angle that measures 50°. How long is the third side (to the nearest tenth)?';

const video: Explainer = {
  id: 'xq-m303-2-2',
  lessonId: '',
  exam: {
    lesson: 'm303-2-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.2, Non-right Triangles: Law of Cosines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-2-non-right-triangles-law-of-cosines',
    question: QUESTION,
  },
  title: 'Exam Question: The Third Side of a Triangular Pool (The Cosine Law)',
  thumbnailTitle: 'The Third Side of the Pool',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a triangular swimming pool has sides of 40 feet and 65 feet with a 50° angle between them. How long is the third side? Two sides and the angle between them call for the cosine law: c² = 40² + 65² − 2(40)(65) cos 50°, which is about 2,482.5, so c is about 49.8 feet. Then we check it against a right angle and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Third Side of the Pool', subtitle: 'The cosine law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the cosine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Precalculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A triangular swimming pool measures $40$ feet on one side and $65$ feet on another side. These sides form an angle that measures $50^\\circ$. How long is the third side (to the nearest tenth)?',
          answer: 'about $49.8$ ft',
          working: '$c^2 = 40^2 + 65^2 - 2(40)(65)\\cos 50^\\circ \\approx 2{,}482.5$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A triangular swimming pool measures 40 feet on one side and 65 feet on another side. These sides form an angle that measures 50 degrees. How long is the third side, to the nearest tenth?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [pool()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'We know **two sides** and the angle **between** them. We need the side that closes the triangle.' }],
      lines: [
        { say: 'Here is the pool from above. One side is 65 feet and another is 40 feet.', show: ['d.water', 'd.known'] },
        { say: 'Those two sides meet at an angle of 50 degrees.', show: 'd.a50', focus: 'd.a50' },
        { say: 'We need the third side, c, which closes the triangle.', show: ['d.third', 't'], focus: 'd.third' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C'] },
        { kind: 'callout', id: 'when', tone: 'key', title: 'When to use it', md: 'Two sides and the angle **between** them: the sine law cannot start, because no side has its **opposite** angle known.' },
      ],
      lines: [
        { say: 'Here is what we need. The cosine law: c squared equals "a" squared plus b squared, minus 2 "a" b cos C, where C is the angle between sides "a" and b.', show: 'f' },
        { say: 'We use it when we know two sides and the angle between them. The sine law cannot start here, because we do not know any side together with the angle across from it.', show: 'when' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the numbers into the **cosine law**', 'Work out $c^2$: the **subtraction** comes last', 'Take the **square root** and round'] }],
      lines: [
        { say: 'Here is the plan. First, put the two sides and the angle into the cosine law.', show: 'plan.0' },
        { say: 'Second, work out c squared, doing the multiplication before the subtraction.', show: 'plan.1' },
        { say: 'Third, take the square root, and round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Into the law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = 40^2 + 65^2 - 2(40)(65)\\cos 50^\\circ'] }],
      lines: [
        { say: 'Step one. "a" is 40, b is 65, and the angle between them is 50 degrees. So c squared equals 40 squared plus 65 squared, minus 2 times 40 times 65 times cos 50 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Work it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40^2 + 65^2 = 1{,}600 + 4{,}225 = 5{,}825', '2(40)(65)\\cos 50^\\circ = 5{,}200(0.6428) \\approx 3{,}342.5', 'c^2 \\approx 5{,}825 - 3{,}342.5 = \\good{2{,}482.5}'] }],
      lines: [
        { say: 'Step two. 40 squared is 1,600, and 65 squared is 4,225. Together, 5,825.', show: 'm.0' },
        { say: '2 times 40 times 65 is 5,200, and cos 50 degrees is about 0.6428. Multiply them first: about 3,342.5.', show: 'm.1' },
        { say: 'Now subtract: c squared is about 5,825 minus 3,342.5, which is 2,482.5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Square root',
      layout: 'split',
      leftWidth: 620,
      left: [pool('c \\approx 49.8\\text{ ft}')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['c \\approx \\sqrt{2{,}482.5}', 'c \\approx \\good{49.8 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Take the square root of 2,482.5.', show: ['d.water', 'd.known', 'd.a50', 'm.0'] },
        { say: 'The third side of the pool is about 49.8 feet.', show: ['m.1', 'd.third'], focus: ['m.1', 'd.third'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['90^\\circ: \\ \\sqrt{40^2 + 65^2} = \\sqrt{5{,}825} \\approx 76.3', '50^\\circ < 90^\\circ \\Rightarrow c < 76.3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. If the angle were a right angle, Pythagoras would give the square root of 5,825, about 76.3 feet.', show: 'm.0' },
        { say: 'Our angle is narrower than a right angle, so the ends of the two sides are closer together, and the third side must be shorter. 49.8 is shorter than 76.3. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$(5{,}825 - 5{,}200)\\cos 50^\\circ$', '**multiply** first, then subtract: gives $20.0$'],
            ['$5{,}825 + 3{,}342.5$', 'the law **subtracts**: gives $95.7$'],
            ['$c = 2{,}482.5$', 'that is $c^2$: take the **square root**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Subtracting 5,200 from 5,825 before multiplying by the cosine breaks the order of operations, and gives about 20 feet. Multiply first.' },
        { say: 'Adding instead of subtracting gives about 95.7 feet, the side for a much wider angle.' },
        { say: 'And 2,482.5 is c squared. Take the square root.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two sides of a triangular garden are $10$ m and $12$ m, and the angle between them is $70^\\circ$. How long is the third side?',
          choices: ['$12.7$ m', '$18.1$ m', '$15.6$ m', '$161.9$ m'],
          answer: 0,
          working: '$c^2 = 100 + 144 - 240(0.3420) \\approx 161.9$, so $c \\approx 12.7$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Two sides of a triangular garden are 10 metres and 12 metres, and the angle between them is 70 degrees. How long is the third side? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'c squared is 100 plus 144, minus 240 times cos 70 degrees, which is about 0.3420. That is 244 minus 82.1, about 161.9. The square root is about 12.7 metres: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two sides and the angle **between**: cosine law', '$c^2 = a^2 + b^2 - 2ab\\cos C$', '**Multiply** before you subtract', 'Take the **square root** at the end'] }],
      lines: [
        { say: 'Here is what to remember. With two sides and the angle between them, use the cosine law.', show: 'sum.0' },
        { say: 'c squared equals "a" squared plus b squared, minus 2 "a" b cos C.', show: 'sum.1' },
        { say: 'Multiply before you subtract.', show: 'sum.2' },
        { say: 'And take the square root at the end. For more on the cosine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
