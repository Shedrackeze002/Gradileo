import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 2.1 (forces and the net force): two forces act on an object at
// rest, A to the left and a larger B to the right; which way does it move? The question is OpenStax
// Physics' own, word for word (Critical Thinking, section 4.1, CC BY 4.0). The forces subtract, the
// net force points the way of the larger one, and the object starts to move that way: to the right
// (choice a).
//
// The picture (src/video/motion.ts) gives the forces sizes, A = 4 N and B = 10 N on a 2 kg block,
// and the block moves as they say: a net 6 N to the right.

const A: MotionForce = { on: 'block', name: 'A', n: -4, tone: 'bad' };
const B: MotionForce = { on: 'block', name: 'B', n: 10, tone: 'opp' };

const tug: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 360,
  lanes: [{ surface: 'smooth', label: 'An object at rest: A pulls left, B pulls right' }],
  bodies: [{ id: 'block', shape: 'block', mass: 2, x: 3.2 }],
  forceScale: 14,
  velocityScale: 26,
  poster: 'ready',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [A, B] }] },
    go: { reset: true, phases: [{ dur: 1.6, forces: [A, B] }] },
  },
};

const QUESTION =
  'Only two forces are acting on an object: force A to the left and force B to the right. If force B is greater than force A, in which direction will the object move, given that the object starts from rest?';
const CHOICES = ['To the right', 'To the left', 'Upward', 'The object does not move'];

const video: Explainer = {
  id: 'xq-p10-2-1',
  lessonId: '',
  exam: {
    lesson: 'p10-2-1',
    source: 'OpenStax, Physics, Critical Thinking for section 4.1, Force',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-1-force',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Two Forces, Which Way Does It Move? The Net Force',
  thumbnailTitle: 'Which Way Will It Move?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: force A pulls an object to the left, a bigger force B pulls it to the right, and the object starts at rest. Which way does it move? We draw the forces as arrows, add them up to find the net force, and see that the object moves the way the net force points. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Way Will It Move?', subtitle: 'Forces and the net force, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two forces pulling on the same object. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          choices: CHOICES,
          answer: 0,
          working: 'The net force is $B - A$ to the right, since $B > A$. From rest, the object moves the way the net force points: to the right.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Only two forces are acting on an object: force A to the left, and force B to the right. If force B is greater than force A, in which direction will the object move, given that the object starts from rest?' },
        { say: 'The choices are: to the right, to the left, upward, or the object does not move. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tug, { kind: 'text', id: 'plain', size: 'lg', md: 'A tug of war: which way does the object **go**?' }],
      lines: [
        { say: 'Let us picture it. Here is the object, sitting still. Force A pulls it to the left, and force B, the bigger one, pulls it to the right.', show: 'sim', play: 'sim.ready', playDelay: 0.6 },
        { say: 'It is a tug of war. The question asks: which way does the object start to move?', show: 'plain' },
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
          title: 'The net force',
          md: 'A **force** is a push or a pull, drawn as an **arrow**: a longer arrow is a bigger force. The **net force** is all the forces added up. Forces the **same** way **add**. Forces in **opposite** directions **subtract**, and the net force points the way of the **bigger** one.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$7$ N right and $3$ N left: net force $= 7 - 3 = 4$ N **right**.' },
      ],
      lines: [
        { say: 'Here is what we need. A force is a push or a pull, and we draw it as an arrow. A longer arrow means a bigger force.', show: 'def' },
        { say: 'The net force is what you get when you add all the forces up. Forces pointing the same way add together. Forces pointing opposite ways take away from each other, and what is left over points the way of the bigger force.' },
        { say: 'For example, seven newtons to the right and three newtons to the left leave four newtons to the right.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Draw **both forces** as arrows', 'Add them: find the **net force**', 'The object moves the way the **net force** points'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, draw both forces as arrows.', show: 'plan.0' },
        { say: 'Second, add them up to find the net force.', show: 'plan.1' },
        { say: 'Third, an object that starts from rest moves the way the net force points.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Draw the forces',
      layout: 'center',
      main: [tug, { kind: 'text', id: 't', size: 'md', md: '**A** points **left**. **B** points **right**, and its arrow is **longer**.' }],
      lines: [
        { say: 'Step one. Force A points to the left. Force B points to the right, and since B is the bigger force, its arrow is longer.', show: ['sim', 't'], play: 'sim.ready', playDelay: 0.3 },
        { say: 'To have something to look at, we have made A four newtons and B ten newtons. Any sizes would do, as long as B is bigger.' },
      ],
    },
    {
      chapter: 'Step 2: The net force',
      layout: 'center',
      main: [
        tug,
        { kind: 'math', id: 'm', size: 'md', lines: ['F_{\\text{net}} = B - A = 10\\ \\text{N} - 4\\ \\text{N} = \\good{6\\ \\text{N to the right}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Since $B > A$, the net force always points **right**.' },
      ],
      lines: [
        { say: 'Step two. The forces point opposite ways, so they subtract: B take away A.', show: 'sim', play: 'sim.ready', playDelay: 0.3 },
        { say: 'With our numbers, ten newtons take away four newtons leaves six newtons, pointing to the right, the way of the bigger force. That single arrow is the net force.', show: ['sim.net', 'm.0'], focus: 'm.0' },
        { say: 'And whatever the sizes are, if B is bigger than A, the net force points to the right.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Which way it moves',
      layout: 'center',
      main: [tug, { kind: 'text', id: 't', size: 'md', md: 'It starts at rest, so it moves the way the **net force** points: **to the right**.' }],
      lines: [
        { say: 'Step three. The object starts at rest. A net force makes it speed up in the direction of the net force. Watch.', show: ['sim', 'sim.net', 'sim.velocity'], play: 'sim.go', playDelay: 0.3 },
        { say: 'It moves to the right. That is choice A.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['B = A \\;\\Rightarrow\\; F_{\\text{net}} = 0 \\qquad B > A \\;\\Rightarrow\\; \\text{right} \\qquad B < A \\;\\Rightarrow\\; \\text{left}'] },
      ],
      lines: [
        { say: 'Let us check by changing the forces. If A and B were equal, they would cancel: no net force, and the object would stay still.', show: 'm.0' },
        { say: 'If A were bigger, it would move to the left. Only when B is bigger does it go right, which is exactly what the question says. So our answer fits.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['To the left', 'Follows force **A**, the **smaller** one'],
            ['Upward', 'No force acts **up or down**: both are sideways'],
            ['Does not move', 'Only if the forces were **equal**'],
            ['To the right', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'To the left follows force A, the smaller one. The bigger force wins.' },
        { say: 'Upward makes no sense here: both forces act sideways, so nothing pushes the object up.' },
        { say: 'And the object does not move only if the forces are equal and cancel. Here B is bigger, so they do not.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two forces act on a box at rest: 30 N to the right and 50 N to the left. What is the net force on the box?',
          choices: ['80 N to the right', '20 N to the right', '80 N to the left', '20 N to the left'],
          answer: 3,
          working: 'The forces point opposite ways, so they subtract: $50 - 30 = 20$ N, the way of the bigger force: to the left.',
        },
      ],
      lines: [
        { say: 'Your turn. Two forces act on a box at rest: thirty newtons to the right, and fifty newtons to the left. What is the net force? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The forces point opposite ways, so they subtract: fifty take away thirty is twenty newtons, pointing the way of the bigger force, to the left. That is choice D. Eighty added them as if they pointed the same way.', show: 'q2.answer' },
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
          items: ['A force is a push or a pull: an **arrow**', 'Same way: **add**. Opposite ways: **subtract**', 'The net force points the way of the **bigger** force', 'From rest, an object moves the way of the **net force**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A force is a push or a pull, drawn as an arrow.', show: 'sum.0' },
        { say: 'Forces the same way add, and forces opposite ways subtract.', show: 'sum.1' },
        { say: 'The net force points the way of the bigger force.', show: 'sum.2' },
        { say: 'And an object at rest starts to move the way the net force points. For more on forces, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
