import type { Explainer, MotionEl } from '@/video/script.ts';
import { drive } from '@/content/phys10/videos/lib/track.ts';

// Exam question for lesson 1.4 (the equations of motion): a swan speeds up from rest at 0.350 m/s²
// until it reaches 6.00 m/s and takes off. The question is OpenStax Physics' own, word for word
// (Problem, section 3.2, CC BY 4.0). With no time given, v² = u² + 2ad gives
// d = 6.00² ÷ (2 × 0.350) = 51.4 m (choice d). 8.60 m is about what you get without squaring the
// speed (6.00 ÷ 0.700 = 8.57), and the negative choices point the displacement backwards.
//
// The picture (src/video/motion.ts) runs the swan along the water at that acceleration, at twice
// real speed (it takes 17.1 s), with its velocity-time graph.

const T = 6 / 0.35;

const swan: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-3, 56],
  height: 470,
  velocityScale: 12,
  graph: { of: ['swan'], seconds: 18, max: 7 },
  lanes: [{ surface: 'smooth', label: 'A swan running on the lake' }],
  bodies: [{ id: 'swan', shape: 'ball', mass: 1, label: 'Swan', x: 0, tone: 'theta' }],
  poster: 'go',
  clips: { go: { phases: [{ dur: T, slow: 0.5, note: 'Twice real speed', forces: [drive('swan', 0.35)] }] } },
};

const video: Explainer = {
  id: 'xq-p20-1-4',
  lessonId: '',
  exam: {
    lesson: 'p20-1-4',
    source: 'OpenStax, Physics, Problem for section 3.2, Representing Acceleration with Equations and Graphs',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/3-2-representing-acceleration-with-equations-and-graphs',
    question:
      'A swan on a lake gets airborne by flapping its wings and running on top of the water. If the swan must reach a velocity of 6.00 m/s to take off and it accelerates from rest at a constant rate of 0.350 m/s², how far will it travel before becoming airborne?',
    choices: ['−8.60 m', '8.60 m', '−51.4 m', '51.4 m'],
  },
  title: 'Exam Question: How Far Does a Swan Run Before It Takes Off?',
  thumbnailTitle: 'Swan Take-off',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a swan speeds up from rest at 0.350 m/s² until it reaches its take-off speed of 6.00 m/s, and we find how far it runs across the water. We list what we know, choose the equation of motion that has no time in it, and solve for the distance. Then we check the answer with the time and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Swan Takes Off', subtitle: 'Choosing the right equation of motion, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a swan running across a lake to take off. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A swan on a lake gets airborne by flapping its wings and running on top of the water. If the swan must reach a velocity of $6.00\\ \\text{m/s}$ to take off and it accelerates from rest at a constant rate of $0.350\\ \\text{m/s}^2$, how far will it travel before becoming airborne?',
          choices: ['$-8.60\\ \\text{m}$', '$8.60\\ \\text{m}$', '$-51.4\\ \\text{m}$', '$51.4\\ \\text{m}$'],
          answer: 3,
          working: '$v^2 = u^2 + 2ad$: $d = \\dfrac{6.00^2}{2 \\times 0.350} = 51.4\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A swan gets airborne by flapping its wings and running on top of the water. It must reach 6.00 metres per second to take off, and it speeds up from rest at a steady 0.350 metres per second squared. How far does it travel before it is in the air?' },
        { say: 'The choices are minus 8.60 metres, 8.60 metres, minus 51.4 metres, and 51.4 metres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [swan],
      lines: [
        { say: 'Let us watch the swan. It starts at rest, and speeds up gently and steadily across the water. The graph shows its velocity climbing in a straight line, because the acceleration is constant.', show: ['sim', 'sim.graph', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'The question asks: how many metres of water does it need, before it reaches six metres per second?' },
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
          title: 'The equations of motion',
          md: 'For a **constant** acceleration: $v = u + at$, $\\ d = ut + \\tfrac12 at^2$, $\\ v^2 = u^2 + 2ad$, $\\ d = \\tfrac12(u + v)t$. Pick the one that leaves out the quantity you **neither know nor want**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$u$ initial velocity, $v$ final velocity, $a$ acceleration, $d$ displacement, $t$ time.' },
      ],
      lines: [
        { say: 'Here is what we need. When the acceleration is constant, four equations link five quantities: the initial velocity u, the final velocity v, the acceleration a, the displacement d, and the time t.', show: ['def', 'ex'] },
        { say: 'Each equation leaves one of the five out. The trick is to pick the equation that leaves out the quantity you do not know and do not need.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['**List** what we know, and what we want', 'Choose the equation **without time**: $v^2 = u^2 + 2ad$', '**Rearrange** for $d$ and put in the numbers'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, list what we know and what we want.', show: 'plan.0' },
        { say: 'Second, choose the right equation. The time is not given, and we do not need it, so we want the one without time.', show: 'plan.1' },
        { say: 'Third, rearrange it for the distance, and put in the numbers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What we know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'list',
          head: ['Quantity', 'Value'],
          rows: [
            ['$u$', '$0$ (from rest)'],
            ['$v$', '$6.00\\ \\text{m/s}$'],
            ['$a$', '$0.350\\ \\text{m/s}^2$'],
            ['$d$', '**?** (we want it)'],
            ['$t$', 'not given, not needed'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The swan starts from rest, so u is zero. Notice that from rest is a number hiding in words.', show: 'list' },
        { say: 'The final velocity v is 6.00 metres per second. The acceleration is 0.350 metres per second squared.' },
        { say: 'We want d, the distance. And the time is not given, and the question does not ask for it.' },
      ],
    },
    {
      chapter: 'Step 2: Choose the equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['v^2 = u^2 + 2ad', 'u = 0:\\quad v^2 = 2ad', 'd = \\hyp{\\dfrac{v^2}{2a}}'] }],
      lines: [
        { say: 'Step two. The equation without time is v squared equals u squared, plus two a d.', show: 'm.0' },
        { say: 'Since u is zero, u squared is zero too, and the equation becomes v squared equals two a d.', show: 'm.1' },
        { say: 'Divide both sides by two a, and the distance is v squared over two a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Put in the numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['d = \\dfrac{6.00^2}{2 \\times 0.350}', '= \\dfrac{36.0}{0.700}', '= \\good{51.4\\ \\text{m}}'] }],
      lines: [
        { say: 'Step three. Put in the numbers: 6.00 squared, over two times 0.350.', show: 'm.0' },
        { say: '6.00 squared is thirty six, and two times 0.350 is 0.700.', show: 'm.1' },
        { say: 'Thirty six divided by 0.7 is 51.4 metres. The swan runs 51.4 metres across the water. That is choice D.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [swan, { kind: 'math', id: 'm', size: 'md', lines: ['t = \\dfrac{6.00}{0.350} = 17.1\\ \\text{s}, \\quad d = \\tfrac12(0 + 6.00)(17.1) = 51.4\\ \\text{m}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way, by finding the time first. Gaining 0.35 metres per second each second, the swan needs 17.1 seconds to reach six metres per second.', show: 'm' },
        { say: 'Its average velocity is halfway between zero and six: three metres per second. Three times 17.1 is 51.4 metres. The same answer.' },
        { say: 'And the picture agrees. Watch where the swan is when it reaches six metres per second.', show: ['sim', 'sim.graph', 'sim.velocity'], play: 'sim.go', playDelay: 0.3 },
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
            ['$8.60\\ \\text{m}$', 'About $6.00 \\div 0.700$: forgot to **square** the speed'],
            ['$-51.4\\ \\text{m}$', 'Wrong **sign**: the swan moves forwards'],
            ['$-8.60\\ \\text{m}$', 'Both mistakes'],
            ['$51.4\\ \\text{m}$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '8.60 metres is about what you get if you forget to square the speed: six divided by 0.7. Always square v in this equation.' },
        { say: 'The negative choices point the displacement backwards. The swan speeds up in the direction it is running, so its displacement is positive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A plane starts from rest and speeds up at $2.5\\ \\text{m/s}^2$ until it reaches its take-off speed of $60\\ \\text{m/s}$. How long must the runway be, at least?',
          choices: ['$24\\ \\text{m}$', '$1440\\ \\text{m}$', '$12\\ \\text{m}$', '$720\\ \\text{m}$'],
          answer: 3,
          working: '$d = \\dfrac{v^2}{2a} = \\dfrac{60^2}{2 \\times 2.5} = \\dfrac{3600}{5} = 720\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A plane starts from rest and speeds up at 2.5 metres per second squared, until it reaches its take-off speed of sixty metres per second. How long must the runway be, at least? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'There is no time again, so use v squared over two a. Sixty squared is 3,600, and two times 2.5 is five. 3,600 divided by five is 720 metres. That is choice D.', show: 'q2.answer' },
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
          items: ['**List** $u$, $v$, $a$, $d$, $t$: "from rest" means $u = 0$', 'No time? Use $v^2 = u^2 + 2ad$', 'From rest: $d = \\dfrac{v^2}{2a}$, and **square** the speed', 'Check with the time and the average velocity'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. List the five quantities first. From rest means u is zero.', show: 'sum.0' },
        { say: 'When there is no time, use v squared equals u squared plus two a d.', show: 'sum.1' },
        { say: 'From rest, the distance is v squared over two a. Do not forget to square the speed.', show: 'sum.2' },
        { say: 'And check with the time and the average velocity. For more on the equations of motion, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
