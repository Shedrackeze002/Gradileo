import type { Explainer } from '@/video/script.ts';
import { cone, figure } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 2.2 (surface area of pyramids, cones and spheres). The free
// OpenStax books ask for the surface area of a cone, pyramid or sphere only together with its
// volume, so this one is written by Gradileo in the style of a Grade 11 workplace mathematics unit
// test. The roof has no base, so only the curved area πrs counts: r = 8 ÷ 2 = 4 m, the slant height
// is s = √(3² + 4²) = 5 m, and πrs = π × 4 × 5 = 20π ≈ 62.83, about 63 m².
// Check: 62.83 ÷ (π × 4) = 5.00 m, the slant height.

const roof = (id: string, s: string, height = 360) => figure(id, [cone({ r: 4, h: 3, labels: { r: '4 \\text{ m}', h: '3 \\text{ m}', s } })], height);

const QUESTION =
  'A grain bin has a cone-shaped roof with a diameter of 8 m. The peak of the roof is 3 m above the base of the cone. How much sheet metal covers the roof, to the nearest square metre?';

const video: Explainer = {
  id: 'xq-m203-2-2',
  lessonId: '',
  exam: {
    lesson: 'm203-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Sheet Metal for a Grain Bin Roof (Surface Area of Cones)',
  thumbnailTitle: 'How Much Metal Covers the Roof?',
  thumbnail: 'ans',
  summary:
    'An exam-style question, solved one small step at a time: a grain bin has a cone-shaped roof with a diameter of 8 m, and its peak is 3 m above the base of the cone. How much sheet metal covers the roof, to the nearest square metre? The radius is 4 m, and the Pythagorean theorem gives the slant height: √(3² + 4²) = 5 m. A roof has no base, so we use only the curved area, π × 4 × 5 = 20π ≈ 63 square metres. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sheet Metal for a Grain Bin Roof', subtitle: 'Surface area of cones, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the surface area of a cone. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A grain bin has a cone-shaped roof with a diameter of $8$ m. The peak of the roof is $3$ m above the base of the cone. How much sheet metal covers the roof, to the nearest square metre?',
          answer: '$63\\ \\text{m}^2$',
          working: '$r = 4$, $s = \\sqrt{3^2 + 4^2} = 5$, and $\\pi \\times 4 \\times 5 \\approx 62.83$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A grain bin has a cone-shaped roof with a diameter of 8 metres. The peak of the roof is 3 metres above the base of the cone.' },
        { say: 'How much sheet metal covers the roof, to the nearest square metre?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [roof('cn', 's = \\ ?'), { kind: 'text', id: 't', size: 'md', md: 'The metal covers only the **sloping** part of the cone. The bottom of the roof is open to the bin, so it has **no base**.' }],
      lines: [
        { say: 'Here is the roof. Half of the 8 metre diameter is the radius, 4 metres, and the peak is 3 metres up.', show: ['cn', 'cn.shape', 'cn.lateral', 'cn.r', 'cn.h'] },
        { say: 'The sheet metal covers only the sloping part of the cone. The bottom of the roof sits on the bin, so there is no base to cover.', show: 't' },
        { say: 'For the sloping area, we need the slant height, the length down the side of the cone.', show: 'cn.s' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{curved area} = \\pi r s', 's^2 = h^2 + r^2'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Slant height, not height', md: 'The curved area uses the **slant height** $s$, down the side. The height, the radius and the slant height make a **right triangle**.' },
      ],
      lines: [
        { say: 'Here is what we need. The curved area of a cone is pi times r times s, where s is the slant height.', show: 'f.0' },
        { say: 'The height, the radius and the slant height make a right triangle, so the Pythagorean theorem gives s.', show: ['f.1', 'c'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **radius**', 'Find the **slant height** with Pythagoras', 'Work out $\\pi r s$ and **round**'] }],
      lines: [
        { say: 'Here is the plan. Find the radius.', show: 'plan.0' },
        { say: 'Find the slant height with the Pythagorean theorem.', show: 'plan.1' },
        { say: 'Then work out pi r s, and round to the nearest square metre.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Radius and slant height',
      layout: 'center',
      main: [roof('ans', 's = 5 \\text{ m}', 320), { kind: 'math', id: 'm', size: 'md', lines: ['r = 8 \\div 2 = 4 \\text{ m}', 's = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5 \\text{ m}'] }],
      lines: [
        { say: 'Step one. The radius is half the diameter: 8 divided by 2 is 4 metres.', show: ['ans', 'ans.shape', 'ans.lateral', 'ans.r', 'ans.h', 'm.0'], focus: 'm.0' },
        { say: 'Step two. The slant height is the square root of 3 squared plus 4 squared. 9 plus 16 is 25, and the square root of 25 is 5 metres.', show: ['ans.s', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The curved area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\pi r s = \\pi \\times 4 \\times 5 = 20\\pi', '20\\pi \\approx 62.83 \\approx \\good{63\\ \\text{m}^2}'] }],
      lines: [
        { say: 'Step three. Pi times 4 times 5 is 20 pi.', show: 'm.0' },
        { say: '20 pi is about 62.83, which rounds to 63 square metres of sheet metal.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{62.83}{\\pi \\times 4} = 5.00 \\text{ m} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. 62.83 divided by pi times 4 gives 5.00 metres, the slant height we found. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$113\\ \\text{m}^2$', 'added the **base** $\\pi r^2$: a roof has none'],
            ['$38\\ \\text{m}^2$', 'used the **height** $3$: use the **slant** height $5$'],
            ['$126\\ \\text{m}^2$', 'used the **diameter** $8$ as $r$: halve it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '113 square metres adds the circle at the bottom, pi r squared. A roof has no base.' },
        { say: '38 uses the height, 3 metres, in place of the slant height. The metal runs down the side, which is 5 metres.' },
        { say: 'And 126 uses the diameter, 8, as the radius. Halve it first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cone-shaped roof has a diameter of $6$ m and a slant height of $5$ m. How much roofing covers it, to the nearest square metre?',
          choices: ['$94\\ \\text{m}^2$', '$47\\ \\text{m}^2$', '$75\\ \\text{m}^2$', '$15\\ \\text{m}^2$'],
          answer: 1,
          working: '$r = 3$, and $\\pi \\times 3 \\times 5 = 15\\pi \\approx 47.1\\ \\text{m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone-shaped roof has a diameter of 6 metres and a slant height of 5 metres. How much roofing covers it, to the nearest square metre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The radius is 3. Pi times 3 times 5 is 15 pi, about 47.1, so 47 square metres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A roof covers the **curved** area only', 'Curved area $= \\pi r s$', '$s^2 = h^2 + r^2$', '**Halve** the diameter for $r$'] }],
      lines: [
        { say: 'Here is what to remember. A roof covers only the curved area of the cone.', show: 'sum.0' },
        { say: 'The curved area is pi r s.', show: 'sum.1' },
        { say: 'Find the slant height from the height and the radius, with the Pythagorean theorem.', show: 'sum.2' },
        { say: 'And halve the diameter to get the radius. For more on the surface area of pyramids, cones and spheres, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
