import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for lesson 1.5 (free fall): an object has fallen for 2.0 s and is still 60 m above
// the ground; which equations, in which order, give its speed when it lands? The question is
// OpenStax Physics' own, word for word (Critical Thinking, section 3.2, CC BY 4.0). First
// v = v₀ + at gives the speed after 2.0 s (19.6 m/s with g = 9.8 m/s²), then
// v² = v₀² + 2a(d − d₀) carries it through the last 60 m: √(19.6² + 2 × 9.8 × 60) = 39.5 m/s
// (choice b). The video works the numbers through as well as naming the order.
//
// The picture (src/video/motion.ts) drops a ball from rest with g = 9.8 m/s²: 19.6 m in the first
// 2.0 s, then the last 60 m, 79.6 m in all, with its velocity-time graph.

const G = 9.8;
const weight = (n: number): MotionForce => ({ on: 'ball', name: 'Weight', n, tone: 'hyp', hidden: true });
const LAND = Math.sqrt((2 * 79.6) / G);

const fall: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 82],
  height: 500,
  strobe: 0.5,
  graph: { of: ['ball'], seconds: 4.2, max: 42 },
  bodies: [{ id: 'ball', shape: 'ball', mass: 1, x: 0, width: 5, tone: 'theta' }],
  velocityScale: 2.2,
  poster: 'all',
  clips: {
    first: { reset: true, phases: [{ dur: 2, slow: 1.5, forces: [weight(G)], note: 'The first 2.0 s' }] },
    two: {
      reset: true,
      phases: [
        { dur: 2, slow: 1.5, forces: [weight(G)], note: 'The first 2.0 s' },
        { dur: LAND - 2, slow: 1.5, forces: [weight(G)], note: 'The last 60 m' },
      ],
    },
    all: { reset: true, phases: [{ dur: LAND, slow: 1.5, forces: [weight(G)], note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-5',
  lessonId: '',
  exam: {
    lesson: 'p20-1-5',
    source: 'OpenStax, Physics, Critical Thinking for section 3.2, Representing Acceleration with Equations and Graphs',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/3-2-representing-acceleration-with-equations-and-graphs',
    question:
      'A student is asked to solve a problem: An object falls from a height for 2.0 s, at which point it is still 60 m above the ground. What will be the velocity of the object when it hits the ground? Which of the following provides the correct order of kinematic equations that can be used to solve the problem?',
    choices: [
      'First use v² = v₀² + 2a(d − d₀), then use v = v₀ + at.',
      'First use v = v₀ + at, then use v² = v₀² + 2a(d − d₀).',
      'First use d = d₀ + v₀t + ½at², then use v = v₀ + at.',
      'First use v = v₀ + at, then use d − d₀ = v₀t + ½at².',
    ],
  },
  title: 'Exam Question: A Falling Object Is Still 60 m Up After 2.0 s. How Fast Does It Land?',
  thumbnailTitle: 'Free Fall in Two Stages',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an object falls from rest for 2.0 s and is still 60 m above the ground, and we find which equations of motion, in which order, give its speed when it lands. We find the speed after 2.0 s with v = v₀ + at, carry it through the last 60 m with v² = v₀² + 2a(d − d₀), and work out the landing speed, 39.5 m/s. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Still 60 m to Fall', subtitle: 'Free fall in two stages, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about an object falling to the ground. It asks which equations to use, and in which order. We will answer it, and then work out the actual speed as well.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt:
            'A student is asked to solve a problem: An object falls from a height for 2.0 s, at which point it is still 60 m above the ground. What will be the velocity of the object when it hits the ground? Which of the following provides the correct order of kinematic equations that can be used to solve the problem?',
          choices: [
            'First use $v^2 = v_0^2 + 2a(d - d_0)$, then use $v = v_0 + at$.',
            'First use $v = v_0 + at$, then use $v^2 = v_0^2 + 2a(d - d_0)$.',
            'First use $d = d_0 + v_0t + \\tfrac12 at^2$, then use $v = v_0 + at$.',
            'First use $v = v_0 + at$, then use $d - d_0 = v_0t + \\tfrac12 at^2$.',
          ],
          answer: 1,
          working: 'Speed after 2.0 s: $v = 0 + 9.8 \\times 2.0 = 19.6\\ \\text{m/s}$; then $v^2 = 19.6^2 + 2 \\times 9.8 \\times 60$, so $v = 39.5\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A student must solve this problem. An object falls from a height for 2.0 seconds, and at that point it is still sixty metres above the ground. What will its velocity be when it hits the ground? Which order of equations solves it?' },
        { say: 'Choice A: first v squared equals v nought squared plus two a d, then v equals v nought plus a t. Choice B: the same two, the other way round. Choice C: first the displacement equation, then v equals v nought plus a t. Choice D: first v equals v nought plus a t, then the displacement equation. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [fall],
      lines: [
        { say: 'Let us watch it fall. It starts from rest, and gravity speeds it up the whole way down. The graph shows its velocity growing steadily.', show: ['sim', 'sim.graph', 'sim.velocity', 'sim.clock'], play: 'sim.all', playDelay: 0.5 },
        { say: 'We know two things: it falls for 2.0 seconds, and then it still has sixty metres to go. The question asks: how do we get from those two facts to the speed at the ground?' },
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
          title: 'Free fall',
          md: 'A falling object speeds up at $g = 9.8\\ \\text{m/s}^2$, downwards. With **down as positive**, the equations of motion hold with $a = 9.8\\ \\text{m/s}^2$. "Falls" with no speed given means it starts **from rest**: $v_0 = 0$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$v = v_0 + at$ (no distance) $\\qquad v^2 = v_0^2 + 2a(d - d_0)$ (no time)' },
      ],
      lines: [
        { say: 'Here is what we need. Anything that falls freely speeds up at g, 9.8 metres per second squared. Taking down as positive, the acceleration in the equations is plus 9.8.', show: 'def' },
        { say: 'And an object that just falls, with no speed given, starts from rest.' },
        { say: 'Two equations matter here. v equals v nought plus a t has no distance in it. v squared equals v nought squared plus two a d has no time in it.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['**Stage 1**, the first 2.0 s: we know the **time**', '**Stage 2**, the last 60 m: we know the **distance**', 'The speed at the end of stage 1 is the **starting speed** of stage 2'],
        },
      ],
      lines: [
        { say: 'Here is the plan. Split the fall into two stages. In stage one, the first 2.0 seconds, we know the time.', show: 'plan.0' },
        { say: 'In stage two, the last sixty metres, we know the distance, but not the time.', show: 'plan.1' },
        { say: 'The two stages are joined by the speed after 2.0 seconds. It is the end of stage one, and the start of stage two.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The first 2.0 s',
      layout: 'center',
      main: [fall, { kind: 'math', id: 'm', size: 'md', lines: ['v = v_0 + at = 0 + 9.8 \\times 2.0 = \\adj{19.6\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step one. For the first 2.0 seconds we know the time, the starting speed, which is zero, and the acceleration. We want the speed. The equation with exactly those is v equals v nought plus a t.', show: ['sim', 'sim.graph', 'sim.velocity', 'sim.clock'], play: 'sim.first', playDelay: 0.3 },
        { say: 'Zero plus 9.8 times two is 19.6 metres per second. That is how fast it is going, sixty metres above the ground.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The last 60 m',
      layout: 'center',
      main: [fall, { kind: 'math', id: 'm', size: 'md', lines: ['v^2 = v_0^2 + 2a(d - d_0) = 19.6^2 + 2 \\times 9.8 \\times 60'] }],
      lines: [
        { say: 'Step two. For the last sixty metres, the starting speed is 19.6 metres per second, the acceleration is 9.8, and the distance is sixty metres. We do not know how long it takes, so we need the equation without time: v squared equals v nought squared plus two a d.', show: ['sim', 'sim.graph', 'sim.velocity', 'sim.clock'], play: 'sim.two', playDelay: 0.3 },
        { say: 'So the order is: first v equals v nought plus a t, then v squared equals v nought squared plus two a d. That is choice B.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: The landing speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['v^2 = 384.2 + 1176 = 1560', 'v = \\sqrt{1560} = \\good{39.5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'The question only asks for the order, but let us finish the job. 19.6 squared is 384.2, and two times 9.8 times sixty is 1,176. Together, 1,560.', show: 'm.0' },
        { say: 'The square root of 1,560 is 39.5. The object hits the ground at 39.5 metres per second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [fall, { kind: 'math', id: 'm', size: 'md', lines: ['d = 19.6 + 60 = 79.6\\ \\text{m}: \\quad v = \\sqrt{2 \\times 9.8 \\times 79.6} = 39.5\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way. In the first 2.0 seconds it falls 19.6 metres, so the whole drop is 79.6 metres. Falling 79.6 metres from rest gives 39.5 metres per second. The same answer.', show: 'm' },
        { say: 'And the picture agrees. Watch the speed when the ball has fallen the whole way.', show: ['sim', 'sim.graph', 'sim.velocity', 'sim.clock'], play: 'sim.all', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is wrong'],
          rows: [
            ['A: $v^2$ first', 'For the last 60 m we need the **starting speed** first'],
            ['C: $d$ first', 'The distance of stage 1 does not give the **landing speed**'],
            ['D: $v$, then $d$', 'Needs the **time** of the last 60 m, which we do not know'],
            ['B: $v$, then $v^2$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: 'Choice A uses the two right equations, in the wrong order. You cannot use the sixty metres until you know how fast the object is going at the start of them.' },
        { say: 'Choice C finds the distance of the first stage, but that does not lead to the landing speed by itself.' },
        { say: 'And choice D would need the time of the last sixty metres, which nobody has told us.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A stone is dropped from a cliff. After 1.0 s it is still 40 m above the sea. How fast is it going when it hits the water? Use $g = 9.8\\ \\text{m/s}^2$.',
          choices: ['$29.7\\ \\text{m/s}$', '$28.0\\ \\text{m/s}$', '$9.8\\ \\text{m/s}$', '$37.8\\ \\text{m/s}$'],
          answer: 0,
          working: '$v = 9.8 \\times 1.0 = 9.8\\ \\text{m/s}$; $v^2 = 9.8^2 + 2 \\times 9.8 \\times 40 = 880$, so $v = 29.7\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A stone is dropped from a cliff. After one second it is still forty metres above the sea. How fast is it going when it hits the water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'After one second it is going 9.8 metres per second. Then v squared is 9.8 squared, plus two times 9.8 times forty: 880. The square root is 29.7 metres per second. That is choice A.', show: 'q2.answer' },
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
          items: ['Free fall: $a = g = 9.8\\ \\text{m/s}^2$, from rest $v_0 = 0$', 'Split a fall into **stages** at the point you know about', 'Know the time: $v = v_0 + at$; know the distance: $v^2 = v_0^2 + 2ad$', 'The end of one stage is the **start** of the next'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In free fall the acceleration is g, 9.8 metres per second squared, and a dropped object starts from rest.', show: 'sum.0' },
        { say: 'Split a fall into stages, at the point the question tells you about.', show: 'sum.1' },
        { say: 'When you know the time, use v equals v nought plus a t. When you know the distance, use v squared equals v nought squared plus two a d.', show: 'sum.2' },
        { say: 'And the speed at the end of one stage is the starting speed of the next. For more on free fall, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
