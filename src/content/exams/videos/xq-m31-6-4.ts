import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 6.4 (motion along a line). The question is an exercise from
// OpenStax Calculus Volume 1 (section 3.6, The Chain Rule, CC BY-NC-SA 4.0), word for word without
// the "[T]" mark, with its parts lettered (a) to (c). v = s′ = −200(t + 1)⁻³ and a = v′ =
// 600(t + 1)⁻⁴, so v(6) = −200/343 m/s and a(6) = 600/2401 m/s², and the train is slowing down
// because they have opposite signs, as in the book's answers. Check: s(6) = 100/49 ≈ 2.04 m and
// s(7) = 100/64 ≈ 1.56 m, so the train moves back about 0.48 m in that second, a little slower
// than 0.583 m/s, as a slowing train should.

const QUESTION =
  'The position function of a freight train is given by s(t) = 100(t + 1)⁻², with s in meters and t in seconds. At time t = 6 s, find the train’s (a) velocity and (b) acceleration. (c) Using a. and b. is the train speeding up or slowing down?';

const video: Explainer = {
  id: 'xq-m31-6-4',
  lessonId: '',
  exam: {
    lesson: 'm31-6-4',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.6, The Chain Rule',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule',
    question: QUESTION,
  },
  title: 'Exam Question: Is the Freight Train Speeding Up or Slowing Down? (Motion Along a Line)',
  thumbnailTitle: 'Speeding Up or Slowing Down?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a freight train’s position is s(t) = 100(t + 1)⁻² metres after t seconds. At t = 6 s, find (a) its velocity, (b) its acceleration, and (c) whether it is speeding up or slowing down. Velocity is s′(t) = −200(t + 1)⁻³, so v(6) = −200/343 ≈ −0.583 m/s. Acceleration is v′(t) = 600(t + 1)⁻⁴, so a(6) = 600/2401 ≈ 0.250 m/s². They have opposite signs, so the train is slowing down. Then we check with positions and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Speeding Up or Slowing Down?', subtitle: 'Motion along a line, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about motion along a line. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The position function of a freight train is given by $s(t) = 100(t + 1)^{-2}$, with $s$ in meters and $t$ in seconds. At time $t = 6$ s, find the train’s (a) velocity and (b) acceleration. (c) Using a. and b. is the train speeding up or slowing down?',
          answer: '(a) $-\\dfrac{200}{343} \\approx -0.583$ m/s (b) $\\dfrac{600}{2401} \\approx 0.250$ m/s² (c) slowing down',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The position of a freight train is s of t equals 100 times t plus 1, to the negative 2, in metres, after t seconds. At 6 seconds, find part "a", the velocity, and part b, the acceleration. Part c: is the train speeding up or slowing down?' },
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
          head: ['Quantity', 'How to get it', 'Units'],
          rows: [
            ['position $s(t)$', 'given', 'm'],
            ['velocity $v(t)$', '$s\'(t)$', 'm/s'],
            ['acceleration $a(t)$', '$v\'(t) = s\'\'(t)$', 'm/s²'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. Velocity is the derivative of position, in metres per second.', show: 'tab' },
        { say: 'Acceleration is the derivative of velocity, the second derivative of position, in metres per second squared.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Signs of $v$ and $a$', 'The object is'],
          rows: [
            ['**same** sign', 'speeding **up**'],
            ['**opposite** signs', 'slowing **down**'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Like pushing a moving cart: push **with** it and it speeds up; push **against** it and it slows down.' },
      ],
      lines: [
        { say: 'Here is what we need. If velocity and acceleration have the same sign, the object is speeding up. If they have opposite signs, it is slowing down.', show: 'rules' },
        { say: 'It is like pushing a moving cart. Push with it, and it speeds up. Push against it, and it slows down.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) $v = s\'$ by the **chain rule**, then $t = 6$', '(b) $a = v\'$, then $t = 6$', '(c) Compare the **signs**'] }],
      lines: [
        { say: 'Here is the plan. For part "a", differentiate s with the chain rule, then put in 6.', show: 'plan.0' },
        { say: 'For part b, differentiate again, then put in 6.', show: 'plan.1' },
        { say: 'For part c, compare the signs.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Velocity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v(t) = 100(-2)(t + 1)^{-3} \\cdot 1 = -200(t + 1)^{-3}', 'v(6) = \\dfrac{-200}{7^3} = \\good{-\\dfrac{200}{343} \\approx -0.583 \\text{ m/s}}'] }],
      lines: [
        { say: 'Step one, part "a". Bring the negative 2 down and take 1 off the power, making negative 3. The inside, t plus 1, has derivative 1. So v of t is negative 200 times t plus 1, to the negative 3.', show: 'm.0' },
        { say: 'At 6 seconds, t plus 1 is 7, and 7 cubed is 343. So v of 6 is negative 200 over 343, about negative 0.583 metres per second. The minus sign means the train is moving backwards.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Acceleration',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a(t) = -200(-3)(t + 1)^{-4} = 600(t + 1)^{-4}', 'a(6) = \\dfrac{600}{7^4} = \\good{\\dfrac{600}{2401} \\approx 0.250 \\text{ m/s}^2}'] }],
      lines: [
        { say: 'Step two, part b. Differentiate again: negative 200 times negative 3 is 600, and the power becomes negative 4.', show: 'm.0' },
        { say: '7 to the 4 is 2,401. So the acceleration is 600 over 2,401, about 0.250 metres per second squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Up or down?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v(6) < 0, \\quad a(6) > 0', '\\text{opposite signs} \\implies \\good{\\text{slowing down}}'] }],
      lines: [
        { say: 'Step three, part c. The velocity is negative, and the acceleration is positive.', show: 'm.0' },
        { say: 'Opposite signs: the acceleration pushes against the motion. The train is slowing down.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s(6) = \\dfrac{100}{49} \\approx 2.04 \\text{ m}, \\quad s(7) = \\dfrac{100}{64} \\approx 1.56 \\text{ m}', '\\text{moved back } 0.48 \\text{ m in 1 s: slower than } 0.583 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with positions. At 6 seconds, the train is at 100 over 49, about 2.04 metres. At 7 seconds, at 100 over 64, about 1.56 metres.', show: 'm.0' },
        { say: 'So over that second, it moved back about 0.48 metres: backwards, and slower than the 0.583 metres per second it started with. It is slowing down. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"$a > 0$, so it speeds up"', 'compare $a$ with the sign of $v$'],
            ['$(t + 1)^{-1}$ after differentiating', 'take **1 off** the power: $-2 - 1 = -3$'],
            ['$a(6) = s(6)$', 'acceleration is the **second** derivative'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Positive acceleration alone does not mean speeding up. Compare its sign with the sign of the velocity.' },
        { say: 'Negative 2 minus 1 is negative 3, not negative 1.' },
        { say: 'And acceleration is the second derivative of position, not the position.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An object moves with $s(t) = t^3 - 6t^2$. At $t = 1$, is it speeding up or slowing down?',
          choices: ['slowing down, since $a < 0$', 'slowing down, since $v < 0$', 'speeding up, since $v$ and $a$ are both negative', 'at rest'],
          answer: 2,
          working: '$v = 3t^2 - 12t = -9$ and $a = 6t - 12 = -6$ at $t = 1$: the same sign.',
        },
      ],
      lines: [
        { say: 'Your turn. An object moves with s of t equals t cubed minus 6 t squared. At 1 second, is it speeding up or slowing down? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'v is 3 t squared minus 12t, which is negative 9. a is 6t minus 12, which is negative 6. The same sign, so it is speeding up. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$v = s\'$ and $a = v\' = s\'\'$', 'A minus velocity means moving **backwards**', 'Same signs: speeding **up**', 'Opposite signs: slowing **down**'] }],
      lines: [
        { say: 'Here is what to remember. Velocity is the derivative of position, and acceleration is the derivative of velocity.', show: 'sum.0' },
        { say: 'A negative velocity means moving backwards.', show: 'sum.1' },
        { say: 'If velocity and acceleration have the same sign, the object speeds up.', show: 'sum.2' },
        { say: 'If they have opposite signs, it slows down. For more on motion along a line, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
