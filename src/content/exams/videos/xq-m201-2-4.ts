import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 2.4 (the ambiguous case): α = 80°, a = 120, b = 121. The
// question is an exercise from OpenStax Algebra and Trigonometry 2e, word for word (section 10.1,
// Non-right Triangles: Law of Sines, CC BY-NC-SA 4.0), whose answer key gives two triangles:
// β ≈ 83.2°, γ ≈ 16.8°, c ≈ 35.2, and β′ ≈ 96.8°, γ′ ≈ 3.2°, c′ ≈ 6.8. The key finds c′ from the
// rounded γ′ = 3.2°; unrounded, c′ ≈ 6.85, which the video points out. The height b sin α ≈ 119.2
// is between a and b, which is why there are two triangles.

/** The diagram is stretched sideways by this factor, so the thin second triangle can be seen. */
const S = 4;

/**
 * Side b at 80° from A and side "a" swinging from C. `which` picks the first triangle, the second,
 * or both with the height from C.
 */
const tri = (height = 420, which: 'both' | 'one' | 'two' = 'both'): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'line', id: 'base', from: 'A', to: 'X', tone: 'muted', arrow: true },
    { kind: 'label', id: 'al', at: 'A', tex: 'A', place: 'below', dot: true },
    { kind: 'label', id: 'cl', at: 'C', tex: 'C', place: 'above', dot: true },
    { kind: 'line', id: 'b', from: 'A', to: 'C', tone: 'adj', weight: 5, label: 'b = 121', labelSide: which === 'one' ? 'right' : 'left' },
    { kind: 'angle', id: 'al80', at: 'A', from: 'X', to: 'C', tone: 'theta', label: '80^\\circ', r: 40, labelDist: 70, labelAt: which === 'one' ? 0.5 : 1.6 },
  ];
  if (which !== 'two') {
    items.push(
      { kind: 'line', id: 'a1', from: 'C', to: 'B1', tone: 'hyp', weight: 5, label: which === 'one' ? 'a = 120' : '120', labelSide: 'left', group: 'one' },
      { kind: 'label', id: 'b1l', at: 'B1', tex: 'B', place: 'below', dot: true, group: 'one' },
    );
    if (which === 'one') {
      items.push(
        { kind: 'region', id: 'r1', points: ['A', 'B1', 'C'], tone: 'hyp', group: 'one' },
        { kind: 'angle', id: 'be', at: 'B1', from: 'A', to: 'C', tone: 'good', label: '83.2^\\circ', r: 35, labelDist: 75, group: 'ang' },
        { kind: 'angle', id: 'ga', at: 'C', from: 'A', to: 'B1', tone: 'opp', label: '16.8^\\circ', r: 60, labelDist: 95, group: 'ang' },
        { kind: 'line', id: 'c1', from: 'A', to: 'B1', tone: 'opp', weight: 5, label: 'c \\approx 35.2', labelSide: 'right', group: 'side' },
      );
    }
  }
  if (which !== 'one') {
    items.push(
      { kind: 'line', id: 'a2', from: 'C', to: 'B2', tone: 'opp', weight: 5, label: which === 'two' ? 'a = 120' : '', labelSide: 'left', group: 'two' },
      { kind: 'label', id: 'b2l', at: 'B2', tex: "B'", place: which === 'two' ? 'below right' : 'below', dot: true, group: 'two' },
    );
    if (which === 'two') {
      items.push(
        { kind: 'region', id: 'r2', points: ['A', 'B2', 'C'], tone: 'opp', group: 'two' },
        { kind: 'angle', id: 'be2', at: 'B2', from: 'A', to: 'C', tone: 'good', label: '96.8^\\circ', r: 25, labelDist: 70, labelAt: 1.3, group: 'ang' },
        { kind: 'angle', id: 'ga2', at: 'C', from: 'A', to: 'B2', tone: 'hyp', r: 110, group: 'ang' },
        { kind: 'label', id: 'ga2l', at: 'G', tex: '3.2^\\circ', tone: 'hyp', place: 'right', group: 'ang' },
        { kind: 'line', id: 'c2', from: 'A', to: 'B2', tone: 'hyp', weight: 5, group: 'side' },
      );
    }
  }
  if (which === 'both') {
    items.push(
      { kind: 'line', id: 'h', from: 'C', to: 'H', tone: 'muted', dashed: true, label: 'h', labelSide: 'right', group: 'ht' },
      { kind: 'right', id: 'rt', at: 'H', from: 'C', to: 'X', group: 'ht' },
    );
  }
  return {
    kind: 'diagram',
    id: 'd',
    height,
    points: {
      A: [0, 0], X: [S * 44, 0], C: [S * 21.01, 119.16], H: [S * 21.01, 0],
      B1: [S * 35.17, 0], B2: [S * 6.85, 0], G: [S * 21.01 - 6, 92],
    },
    items,
  };
};

const QUESTION =
  'Given α = 80°, a = 120, and b = 121, find the missing side and angles. If there is more than one possible solution, show both.';

const video: Explainer = {
  id: 'xq-m201-2-4',
  lessonId: '',
  exam: {
    lesson: 'm201-2-4',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 10.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/10-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: Two Triangles From α = 80°, a = 120, b = 121 (The Ambiguous Case)',
  thumbnailTitle: 'One Triangle or Two?',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: angle α is 80°, side a is 120 and side b is 121. Side a is longer than the height but shorter than b, so it fits in two places and there are two triangles. We find both with the sine law: β ≈ 83.2°, γ ≈ 16.8°, c ≈ 35.2, and β′ ≈ 96.8°, γ′ ≈ 3.2°, c′ ≈ 6.8. Then we check the answers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'One Triangle or Two?', subtitle: 'The ambiguous case, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the ambiguous case of the sine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Given $\\alpha = 80^\\circ$, $a = 120$, and $b = 121$, find the missing side and angles. If there is more than one possible solution, show both.',
          answer: '$\\beta \\approx 83.2^\\circ$, $\\gamma \\approx 16.8^\\circ$, $c \\approx 35.2$; or $\\beta\' \\approx 96.8^\\circ$, $\\gamma\' \\approx 3.2^\\circ$, $c\' \\approx 6.8$',
          working: '$\\sin \\beta = \\dfrac{121 \\sin 80^\\circ}{120} \\approx 0.9930$, so $\\beta \\approx 83.2^\\circ$ or $180^\\circ - 83.2^\\circ = 96.8^\\circ$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Given alpha equals 80 degrees, side \"a\" equals 120, and side b equals 121, find the missing side and angles. If there is more than one possible solution, show both.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We know an angle, the side **opposite** it, and one more side. That is the **ambiguous case**: there may be no triangle, one, or two. We find **every** triangle that fits.' }],
      lines: [{ say: 'Alpha is the angle at \"A\", and side \"a\" is opposite it. We also know side b. Two sides and an angle opposite one of them is the ambiguous case: there may be no triangle, one triangle, or two. The question wants every triangle that fits.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'definition', title: 'The sine law', md: '$\\dfrac{\\sin \\alpha}{a} = \\dfrac{\\sin \\beta}{b} = \\dfrac{\\sin \\gamma}{c}$, each angle with the side **opposite** it.' },
        { kind: 'callout', id: 'amb', tone: 'key', title: 'How many triangles?', md: 'The height from $C$ is $h = b \\sin \\alpha$. If $h < a < b$, side $a$ reaches the base in **two** places: two triangles.' },
        { kind: 'callout', id: 'two', tone: 'tip', title: 'Two angles, one sine', md: '$\\sin \\theta = \\sin(180^\\circ - \\theta)$, so the calculator shows only **one** of the two angles.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine law: the sine of each angle over the side opposite it gives the same number.', show: 'law' },
        { say: 'To count the triangles, find the height from C to the base: b times the sine of alpha. If side \"a\" is longer than the height but shorter than b, it can swing to meet the base in two places, so there are two triangles.', show: 'amb' },
        { say: 'And an angle and 180 degrees minus that angle have the same sine. The calculator only gives the acute one, so we have to find the other ourselves.', show: 'two' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the triangles with the **height**', 'Find $\\beta$ with the **sine law**, and $180^\\circ - \\beta$', 'Finish **each** triangle: $\\gamma$, then $c$'] }],
      lines: [
        { say: 'Here is the plan. First, count the triangles using the height.', show: 'plan.0' },
        { say: 'Second, find beta with the sine law, and its partner, 180 degrees minus beta.', show: 'plan.1' },
        { say: 'Third, finish each triangle: the last angle, gamma, and then the last side, c.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: How many triangles?',
      layout: 'split',
      left: [tri(440, 'both')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['h = 121 \\sin 80^\\circ \\approx 119.2', '119.2 < 120 < 121', '\\text{so } \\good{\\text{two triangles}}'] }],
      lines: [
        { say: 'Step one. Draw angle alpha at \"A\" and side b, 121 long, up to C. The picture is stretched sideways, so the thin triangles are easier to see.', show: 'd' },
        { say: 'The height from C down to the base is 121 times the sine of 80 degrees: about 119.2.', show: ['d.ht', 'm.0'], focus: 'd.ht' },
        { say: 'Side \"a\" is 120. That is longer than the height, 119.2, but shorter than b, 121.', show: 'm.1' },
        { say: 'So side \"a\" can swing from C to meet the base in two places, at B and at B prime. There are two triangles.', show: ['d.one', 'd.two', 'm.2'] },
      ],
    },
    {
      chapter: 'Step 2: Both angles at B',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\sin \\beta}{121} = \\dfrac{\\sin 80^\\circ}{120}', '\\sin \\beta = \\dfrac{121 \\sin 80^\\circ}{120} \\approx 0.9930', '\\beta \\approx \\good{83.2^\\circ} \\quad \\text{or} \\quad \\beta\' \\approx 180^\\circ - 83.2^\\circ = \\good{96.8^\\circ}'] }],
      lines: [
        { say: 'Step two. By the sine law, the sine of beta over 121 equals the sine of 80 degrees over 120.', show: 'm.0' },
        { say: 'Multiply both sides by 121. The sine of beta is about 0.9930.', show: 'm.1' },
        { say: 'The calculator gives beta of about 83.2 degrees. Its partner is 180 minus 83.2, which is 96.8 degrees. Both fit with the 80 degree angle, because 80 plus 96.8 is still less than 180.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The first triangle',
      layout: 'split',
      left: [tri(440, 'one')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\gamma = 180^\\circ - 80^\\circ - 83.2^\\circ = 16.8^\\circ', 'c = \\dfrac{120 \\sin 16.8^\\circ}{\\sin 80^\\circ}', 'c \\approx \\good{35.2}'] }],
      lines: [
        { say: 'Step three, the first triangle, with beta about 83.2 degrees. Gamma is 180 minus 80 minus 83.2, which is 16.8 degrees.', show: ['d', 'd.one', 'd.ang', 'm.0'], focus: 'd.ang' },
        { say: 'Now the sine law for c: c over the sine of 16.8 degrees equals 120 over the sine of 80 degrees. So c is 120 times the sine of 16.8 degrees, over the sine of 80 degrees.', show: 'm.1' },
        { say: 'That is about 35.2.', show: ['m.2', 'd.side'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 4: The second triangle',
      layout: 'split',
      left: [tri(440, 'two')],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\gamma\' = 180^\\circ - 80^\\circ - 96.8^\\circ = 3.2^\\circ', 'c\' = \\dfrac{120 \\sin 3.2^\\circ}{\\sin 80^\\circ}', 'c\' \\approx \\good{6.8}'] },
        { kind: 'callout', id: 'n', tone: 'tip', title: 'Rounding', md: 'Without rounding $\\gamma\'$ first, $c\' \\approx 6.85$. The answer key rounds $\\gamma\'$ to $3.2^\\circ$ first and gets $6.8$.' },
      ],
      lines: [
        { say: 'Step four, the second triangle, with beta prime about 96.8 degrees. Gamma prime is 180 minus 80 minus 96.8, which is only 3.2 degrees.', show: ['d', 'd.two', 'd.ang', 'm.0'], focus: 'd.ang' },
        { say: 'The sine law again: c prime is 120 times the sine of 3.2 degrees, over the sine of 80 degrees.', show: 'm.1' },
        { say: 'That is about 6.8.', show: ['m.2', 'd.side'], focus: 'm.2' },
        { say: 'A note on rounding. If you keep every digit of gamma prime, you get about 6.85, which rounds to 6.9. The answer key rounded the angle to 3.2 degrees first, and got 6.8. Either is close; just say how you rounded.', show: 'n' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{120}{\\sin 80^\\circ} \\approx 121.9, \\quad \\dfrac{121}{\\sin 83.2^\\circ} \\approx 121.9', '\\dfrac{35.2}{\\sin 16.8^\\circ} \\approx 121.8, \\quad \\dfrac{6.8}{\\sin 3.2^\\circ} \\approx 121.8 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check. In a triangle, every side over the sine of its opposite angle gives the same number. 120 over the sine of 80 degrees is about 121.9, and so is 121 over the sine of 83.2 degrees.', show: 'm.0' },
        { say: 'And 35.2 over the sine of 16.8 degrees, and 6.8 over the sine of 3.2 degrees, are both about 121.8. The small difference is only rounding, so both triangles check out.', show: 'm.1' },
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
            ['only $\\beta \\approx 83.2^\\circ$', 'the calculator hides $180^\\circ - 83.2^\\circ = 96.8^\\circ$, which **also** fits'],
            ['$\\sin \\beta = \\dfrac{120 \\sin 80^\\circ}{121}$', '$\\beta$ goes with $b = 121$, the side **opposite** it'],
            ['$\\gamma = 180^\\circ - 83.2^\\circ$', 'take away **both** known angles: $\\alpha$ and $\\beta$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Stopping at one triangle loses half the answer. The calculator only shows 83.2 degrees, but 96.8 degrees has the same sine, and it fits too.' },
        { say: 'Pair each angle with the side opposite it. Beta goes with b, which is 121, so 121 goes on top.' },
        { say: 'And to find gamma, take away both angles you know from 180 degrees, alpha as well as beta.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\triangle ABC$, $\\angle A = 30^\\circ$, $a = 6$ and $b = 10$. How many triangles fit?',
          choices: ['two', 'none', 'one', 'not enough information'],
          answer: 0,
          working: '$h = 10 \\sin 30^\\circ = 5$, and $5 < 6 < 10$, so two triangles: $B \\approx 56.4^\\circ$ or $123.6^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle \"A\" B C, angle \"A\" is 30 degrees, side \"a\" is 6, and side b is 10. How many triangles fit? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The height is 10 times the sine of 30 degrees, which is 5. Side \"a\", 6, is longer than 5 but shorter than 10, so there are two triangles, choice A. Angle B is about 56.4 degrees or about 123.6 degrees.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two sides and an angle **opposite** one: the ambiguous case', 'If $h < a < b$, with $h = b \\sin \\alpha$: **two** triangles', 'The second angle is $180^\\circ - \\beta$', 'Finish **each** triangle with the sine law'] }],
      lines: [
        { say: 'Here is what to remember. Two sides and an angle opposite one of them is the ambiguous case.', show: 'sum.0' },
        { say: 'If side \"a\" is longer than the height, b times the sine of alpha, but shorter than b, there are two triangles.', show: 'sum.1' },
        { say: 'The second angle is 180 degrees minus the one the calculator gives.', show: 'sum.2' },
        { say: 'And finish each triangle with the sine law. For more on the ambiguous case, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
