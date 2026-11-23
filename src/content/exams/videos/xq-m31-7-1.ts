import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 7.1 (optimization). The question is an exercise from OpenStax
// Calculus Volume 1 (section 4.7, Applied Optimization Problems, CC BY-NC-SA 4.0), word for word
// (the book's "less than or equal to 62in." is spaced as "62 in."). With base side s, 2s + h = 62,
// so s = 31 − h/2 and V = h(31 − h/2)². V′ = (31 − h/2)(31 − 3h/2) = 0 at h = 62/3 (or h = 62,
// where V = 0), so h = 62/3 in, as in the book's answer. Check: then s = 62/3 too, so the best
// suitcase is a cube of volume (62/3)³ ≈ 8,827 in³, more than at h = 20 (8,820) or h = 22 (8,800).

const QUESTION =
  'To carry a suitcase on an airplane, the length + width + height of the box must be less than or equal to 62 in. Assuming the base of the suitcase is square, show that the volume is V = h(31 − (1/2)h)². What height allows you to have the largest volume?';

const V = 'V = h\\left(31 - \\tfrac{1}{2}h\\right)^2';

const video: Explainer = {
  id: 'xq-m31-7-1',
  lessonId: '',
  exam: {
    lesson: 'm31-7-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.7, Applied Optimization Problems',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-7-applied-optimization-problems',
    question: QUESTION,
  },
  title: 'Exam Question: The Biggest Carry-On Suitcase (Optimization)',
  thumbnailTitle: 'The Biggest Suitcase You Can Carry On',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: an airline lets you carry on a suitcase whose length + width + height is at most 62 inches. With a square base, show that the volume is V = h(31 − h/2)², and find the height that gives the largest volume. With base side s, 2s + h = 62, so s = 31 − h/2 and V = s²h. Setting V′ = (31 − h/2)(31 − 3h/2) = 0 gives h = 62/3 ≈ 20.7 inches. Then we check that the best suitcase is a cube and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Biggest Suitcase You Can Carry On', subtitle: 'Optimization, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about optimization. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: `To carry a suitcase on an airplane, the length + width + height of the box must be less than or equal to 62 in. Assuming the base of the suitcase is square, show that the volume is $${V}$. What height allows you to have the largest volume?`,
          answer: '$h = \\dfrac{62}{3} \\approx 20.7$ in',
          working: '$s = 31 - \\tfrac{1}{2}h$, $V = s^2h$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'To carry a suitcase on an airplane, the length plus width plus height must be at most 62 inches. Assuming the base is square, show that the volume is h times the quantity 31 minus half h, squared. What height gives the largest volume?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['What', 'In this question'],
          rows: [
            ['Make **largest**', 'the volume $V$'],
            ['The rule', 'length + width + height $= 62$ (use it all)'],
            ['Square base', 'length = width = $s$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. We want the largest volume.', show: 'tab' },
        { say: 'The rule limits the three sides to 62 inches in total. To get the most volume, use all 62. And with a square base, the length and the width are the same, s.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V\'(h) = 0'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Optimization', md: 'Write the quantity as a function of **one** variable. Find where its derivative is $0$, and compare with the **ends** of the allowed interval.' },
      ],
      lines: [
        { say: 'Here is what we need. The largest value is at a point where the derivative is 0, or at an end.', show: 'f' },
        { say: 'So write the volume as a function of one variable. Find where its derivative is 0, and compare with the ends of the allowed values.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use the rule to write $s$ in terms of $h$', 'Write $V = s^2h$ in terms of $h$ (the **show** part)', 'Solve $V\'(h) = 0$ and check the ends'] }],
      lines: [
        { say: 'Here is the plan. Use the rule to write s in terms of h.', show: 'plan.0' },
        { say: 'Put that into the volume: that is the part we must show.', show: 'plan.1' },
        { say: 'Then solve V prime equals 0, and check the ends.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Show the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s + s + h = 62 \\implies 2s = 62 - h', 's = 31 - \\tfrac{1}{2}h', 'V = s^2 h = \\good{h\\left(31 - \\tfrac{1}{2}h\\right)^2}'] }],
      lines: [
        { say: 'Step one. The length and width are both s, so s plus s plus h is 62. That gives 2s equals 62 minus h.', show: 'm.0' },
        { say: 'Halve it: s equals 31 minus half h.', show: 'm.1' },
        { say: 'The volume is the base, s squared, times the height. Put s in: h times the quantity 31 minus half h, squared. That is the formula we had to show.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The derivative',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V\' = \\left(31 - \\tfrac{1}{2}h\\right)^2 + h \\cdot 2\\left(31 - \\tfrac{1}{2}h\\right)\\left(-\\tfrac{1}{2}\\right)', '= \\left(31 - \\tfrac{1}{2}h\\right)\\left[\\left(31 - \\tfrac{1}{2}h\\right) - h\\right]', '= \\good{\\left(31 - \\tfrac{1}{2}h\\right)\\left(31 - \\tfrac{3}{2}h\\right)}'] }],
      lines: [
        { say: 'Step two. Use the product rule, with the chain rule for the squared bracket. The derivative of the bracket squared is 2 times the bracket, times negative a half.', show: 'm.0' },
        { say: 'Both terms share the bracket 31 minus half h, so factor it out.', show: 'm.1' },
        { say: 'Inside, 31 minus half h minus h is 31 minus three halves h.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The best height',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['31 - \\tfrac{1}{2}h = 0 \\implies h = 62 \\ (V = 0)', '31 - \\tfrac{3}{2}h = 0 \\implies h = \\good{\\dfrac{62}{3} \\approx 20.7 \\text{ in}}', '0 \\le h \\le 62: \\ V(0) = V(62) = 0'] }],
      lines: [
        { say: 'Step three. The first factor is 0 at h equals 62. But then the base has no width, and the volume is 0. That is the smallest, not the largest.', show: 'm.0' },
        { say: 'The second factor is 0 when three halves h is 31, so h is 62 thirds, about 20.7 inches.', show: 'm.1', focus: 'm.1' },
        { say: 'The height can go from 0 to 62, and both ends give a volume of 0. So the largest volume is at h equals 62 thirds.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['s = 31 - \\tfrac{31}{3} = \\tfrac{62}{3} = h: \\ \\text{a cube!}', 'V = \\left(\\tfrac{62}{3}\\right)^3 \\approx 8{,}827 \\text{ in}^3'] },
        {
          kind: 'table',
          id: 'tab',
          head: ['$h$', '$20$', '$\\tfrac{62}{3}$', '$22$'],
          rows: [['$V$', '$8{,}820$', '$8{,}827$', '$8{,}800$']],
        },
      ],
      lines: [
        { say: 'Let us check. At this height, the base side is 31 minus 31 thirds, which is also 62 thirds. The best suitcase is a cube.', show: 'm.0' },
        { say: 'Its volume is 62 thirds cubed, about 8,827 cubic inches.', show: 'm.1' },
        { say: 'And heights a little either side, 20 and 22 inches, give less: 8,820 and 8,800. It checks out.', show: 'tab' },
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
            ['$s + h = 62$', 'length **and** width are both $s$: $2s + h = 62$'],
            ['Answer $h = 62$', 'that gives $V = 0$: the **smallest**'],
            ['$V\' = 2h\\left(31 - \\tfrac{1}{2}h\\right)$', 'a product needs the **product rule**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The square base has two sides of length s, so it is 2s plus h, not s plus h.' },
        { say: 'Not every zero of the derivative is a maximum. At h equals 62, the volume is 0.' },
        { say: 'And V is a product of h and a bracket squared, so use the product rule and the chain rule.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You have 240 m of fencing for a rectangular pen. Which dimensions give the largest area?',
          choices: ['$120$ m by $120$ m', '$80$ m by $40$ m', '$100$ m by $20$ m', '$60$ m by $60$ m'],
          answer: 3,
          working: '$2x + 2y = 240$, so $y = 120 - x$ and $A = x(120 - x)$; $A\' = 120 - 2x = 0$ at $x = 60$.',
        },
      ],
      lines: [
        { say: 'Your turn. You have 240 metres of fencing for a rectangular pen. Which dimensions give the largest area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The perimeter gives y equals 120 minus x, so the area is x times 120 minus x. Its derivative, 120 minus 2x, is 0 at x equals 60. So 60 by 60, a square. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use the **rule** to cut down to **one** variable', 'Set the **derivative** to $0$', 'Check the critical points **and** the ends', 'Ask: does the answer make sense?'] }],
      lines: [
        { say: 'Here is what to remember. Use the rule to cut the problem down to one variable.', show: 'sum.0' },
        { say: 'Set the derivative to 0.', show: 'sum.1' },
        { say: 'Check the critical points and the ends.', show: 'sum.2' },
        { say: 'And ask whether the answer makes sense. For more on optimization, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
