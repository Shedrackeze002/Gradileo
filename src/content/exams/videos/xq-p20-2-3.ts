import type { Explainer, RampEl } from '@/video/script.ts';

// Exam question for lesson 2.3 (static and kinetic friction): will a 50 N push move a 5 kg box when
// the coefficient of static friction is 0.4? The question is OpenStax Physics' own, word for word
// (Test Prep for section 5.4, CC BY 4.0). On a level floor the normal force is the weight,
// 5 × 9.8 = 49 N, so static friction can hold at most 0.4 × 49 = 19.6 N; 50 N is more than that,
// so the box moves (choice d). Each wrong choice pairs a yes or no with the wrong reason.
//
// In the picture (src/video/ramp.ts) the friction is worked out: it matches pushes of 10 N and
// 18 N and the box stays put, then 50 N breaks it free. The question gives no coefficient of
// kinetic friction and does not need one; the picture uses 0.3, which the narration says.

const PUSH = (n: number) => [{ on: 'box', name: 'Push', n }];

const floor = (over: Partial<RampEl> = {}): RampEl => ({
  kind: 'ramp',
  id: 'floor',
  angle: 0,
  length: 10,
  friction: [0.4, 0.3],
  g: 9.8,
  bodies: [{ id: 'box', mass: 5, label: '5 kg', x: 3.0, width: 1.3, tone: 'theta' }],
  label: 'A box on the floor',
  height: 380,
  pad: [150, 150],
  forceScale: 2.2,
  velocityScale: 14,
  poster: 'go',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: PUSH(50) }] },
    grow: {
      phases: [
        { dur: 2.2, forces: PUSH(10), note: 'Push 10 N: it stays put' },
        { dur: 2.2, forces: PUSH(18), note: 'Push 18 N: it still stays put' },
      ],
    },
    go: { phases: [{ dur: 1.1, slow: 2, note: 'Push 50 N, in slow motion', forces: PUSH(50) }] },
  },
  ...over,
});

const box = floor();
const narrow = floor({ height: 360, pad: [140, 140], forceScale: 1.9 });

const video: Explainer = {
  id: 'xq-p20-2-3',
  lessonId: '',
  exam: {
    lesson: 'p20-2-3',
    source: 'OpenStax, Physics, Test Prep for section 5.4, Inclined Planes',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-4-inclined-planes',
    question:
      'A 5 kg box is at rest on the floor. The coefficient of static friction between the box and the floor is 0.4. A horizontal force of 50 N is applied to the box. Will it move?',
    choices: [
      'No, because the applied force is less than the maximum limiting static friction.',
      'No, because the applied force is more than the maximum limiting static friction.',
      'Yes, because the applied force is less than the maximum limiting static friction.',
      'Yes, because the applied force is more than the maximum limiting static friction.',
    ],
  },
  title: 'Exam Question: Will a 50 N Push Move the Box? Static Friction',
  thumbnailTitle: 'Will It Move?',
  thumbnail: 'floor',
  summary:
    'A real test question, solved one small step at a time: a 5 kg box rests on the floor, the coefficient of static friction is 0.4, and someone pushes it with 50 N. Will it move? We find the normal force, work out the most that static friction can hold, and compare it with the push. Then we look at why each wrong choice pairs a yes or a no with the wrong reason.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Will the Box Move?', subtitle: 'Static friction and its limit, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about pushing a box across the floor. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A 5 kg box is at rest on the floor. The coefficient of static friction between the box and the floor is 0.4. A horizontal force of 50 N is applied to the box. Will it move?',
          choices: [
            'No, because the applied force is less than the maximum limiting static friction.',
            'No, because the applied force is more than the maximum limiting static friction.',
            'Yes, because the applied force is less than the maximum limiting static friction.',
            'Yes, because the applied force is more than the maximum limiting static friction.',
          ],
          answer: 3,
          working: 'Most static friction $= 0.4 \\times 5 \\times 9.8 = 19.6\\ \\text{N}$, and $50\\ \\text{N} > 19.6\\ \\text{N}$, so it moves.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A five kilogram box is at rest on the floor. The coefficient of static friction between the box and the floor is 0.4. A horizontal force of fifty newtons is applied to the box. Will it move?' },
        { say: 'Choices A and B say no, and choices C and D say yes. Each one gives a reason: the push is either less than, or more than, the most that static friction can hold. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [box, { kind: 'text', id: 'plain', size: 'lg', md: 'Is a $50\\ \\text{N}$ push enough to **start** the box sliding?' }],
      lines: [
        { say: 'Let us say it in everyday words. A box sits still on the floor, and someone pushes it sideways with fifty newtons.', show: 'floor', play: 'floor.name', playDelay: 0.6 },
        { say: 'Friction grips the box and tries to hold it still. The question asks: is fifty newtons enough to break that grip and start the box sliding?', show: 'plain' },
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
          title: 'Static friction has a limit',
          md: 'Static friction **matches** a push, so the object stays still, but only up to a **maximum**: $f_{s,\\max} = \\mu_s F_N$. A push bigger than that starts the object sliding.',
        },
        { kind: 'text', id: 'fn', size: 'md', md: 'On a level floor the normal force equals the weight: $F_N = mg$.' },
      ],
      lines: [
        { say: 'Here is what we need. When you push something that is not moving, static friction pushes back just as hard, so it stays still.', show: 'def' },
        { say: 'But static friction has a limit. The most it can give is the coefficient of static friction, mu s, times the normal force. Push harder than that, and the object starts to slide.' },
        { say: 'And on a level floor, the normal force is just the weight: mass times g.', show: 'fn' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **normal force**: $F_N = mg$', 'Find the **most** static friction can hold: $\\mu_s F_N$', '**Compare** it with the push'],
        },
      ],
      lines: [
        { say: 'Here is the plan, in three steps. First, find the normal force: the weight of the box.', show: 'plan.0' },
        { say: 'Second, find the most that static friction can hold back.', show: 'plan.1' },
        { say: 'Third, compare that limit with the fifty newton push.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The normal force',
      layout: 'split',
      leftWidth: 760,
      left: [narrow],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F_N = mg', '= 5 \\times 9.8', '= \\adj{49\\ \\text{N}}'] }],
      lines: [
        { say: 'Step one: the normal force. The floor is level, so it pushes up exactly as hard as the weight pulls down.', show: ['floor', 'floor.weight', 'floor.normal', 'm.0'], play: 'floor.name' },
        { say: 'The weight is mass times g: five times 9.8.', show: 'm.1' },
        { say: 'That is forty nine newtons. So the normal force is forty nine newtons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The most friction can hold',
      layout: 'split',
      leftWidth: 760,
      left: [narrow],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f_{s,\\max} = \\mu_s F_N', '= 0.4 \\times 49', '= \\hyp{19.6\\ \\text{N}}'] }],
      lines: [
        { say: 'Step two. The most static friction can hold is mu s times the normal force.', show: ['floor', 'm.0'], play: 'floor.name' },
        { say: 'Pause and try it: 0.4 times forty nine.', show: 'm.1', wait: 3 },
        { say: 'It is 19.6 newtons. Static friction can hold back any push up to 19.6 newtons, and no more.', show: 'm.2', focus: 'm.2' },
        { say: 'Watch a smaller push first. Ten newtons: friction matches it, and the box stays put. Eighteen newtons: friction grows to match that too, and the box still stays put.', show: 'floor.friction', play: 'floor.grow', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'split',
      leftWidth: 760,
      left: [narrow],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['50\\ \\text{N} > 19.6\\ \\text{N}', '\\good{\\text{It moves}}'] }],
      lines: [
        { say: 'Step three. The push is fifty newtons, and friction can hold at most 19.6 newtons. Fifty is more than 19.6.', show: ['floor', 'floor.friction', 'm.0'], play: 'floor.name' },
        { say: 'So friction cannot hold the box. It moves.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch. The push breaks the grip, and the box slides off. The question does not say how strong the sliding friction is, and we do not need it. In the picture we used a coefficient of 0.3.', show: ['floor.velocity', 'floor.readout'], play: 'floor.go', playDelay: 0.5 },
        { say: 'So the answer is: yes, because the applied force is more than the maximum static friction. That is choice D.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{limit} = 0.4 \\times 5 \\times 9.8 = 19.6\\ \\text{N}', '50 \\div 19.6 \\approx 2.6\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way. The limit is 0.4, times five, times 9.8: 19.6 newtons, the same as before.', show: 'm.0' },
        { say: 'The push is about two and a half times bigger than the limit. That is not even close, so we can be sure the box moves.', show: 'm.1' },
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
            ['No, push **less**', 'The push, $50\\ \\text{N}$, is **more** than $19.6\\ \\text{N}$'],
            ['No, push **more**', 'A push more than the limit **does** move it'],
            ['Yes, push **less**', 'A push less than the limit would **not** move it'],
            ['Yes, push **more**', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'In this question, each choice is a yes or a no, together with a reason. Both halves have to be right.', show: 'traps' },
        { say: 'Choice A has the right idea, but the wrong numbers. The push is not less than the limit.' },
        { say: 'Choice B gives the right comparison, but the wrong conclusion. A push bigger than the limit does move the box.' },
        { say: 'And choice C is the other way round. If the push were less than the limit, friction would hold the box still.' },
        { say: 'One more trap: forgetting g. 0.4 times five is only two. Friction depends on the normal force, in newtons, not on the mass.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 12 kg crate rests on a level floor. The coefficient of static friction is 0.5. A horizontal push of 50 N is applied. Will it move? Use $g = 9.8\\ \\text{N/kg}$.',
          choices: [
            'No, because the push is less than the maximum static friction.',
            'No, because the push is more than the maximum static friction.',
            'Yes, because the push is less than the maximum static friction.',
            'Yes, because the push is more than the maximum static friction.',
          ],
          answer: 0,
          working: 'Most static friction $= 0.5 \\times 12 \\times 9.8 = 58.8\\ \\text{N}$, and $50\\ \\text{N} < 58.8\\ \\text{N}$, so it stays put.',
        },
      ],
      lines: [
        { say: 'Your turn. A twelve kilogram crate rests on a level floor. The coefficient of static friction is 0.5. A horizontal push of fifty newtons is applied. Will it move? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The most static friction can hold is 0.5, times twelve, times 9.8: 58.8 newtons. Fifty newtons is less than that, so friction holds the crate still. No, because the push is less than the maximum static friction. That is choice A.', show: 'q2.answer' },
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
          items: ['On a level floor, $F_N = mg$', 'Most static friction: $f_{s,\\max} = \\mu_s F_N$', 'Push **more** than the limit: it moves', 'Check **both** halves of a yes-because choice'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. On a level floor, the normal force is the weight, mass times g.', show: 'sum.0' },
        { say: 'The most static friction can hold is mu s times the normal force.', show: 'sum.1' },
        { say: 'A push bigger than that starts the object sliding. A smaller push does not.', show: 'sum.2' },
        { say: 'And when a choice says yes, because, check both halves. For more on friction, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
