import type { Explainer, RampEl } from '@/video/script.ts';

// Exam question (pilot of roadmap item 11): two people push a car, for lesson 2.2 (Newton's laws).
// The question is OpenStax Physics' own, word for word (Test Prep for section 4.3, CC BY 4.0). The
// net force needed is ma = 2,000 × 5.0 = 10,000 N; the pushes must also beat 300 N of friction, so
// together they give 10,300 N, and each person 5,150 N (choice b). The wrong choices: 10,300 N is
// both pushes together, 4,850 N takes the friction away instead of adding it ((10,000 − 300) ÷ 2),
// and 97,000 N is far more than the car's whole weight (19,600 N with g = 9.8 N/kg).
//
// In the picture the car is a block on a level road. Its friction coefficient is chosen so the
// friction is the question's 300 N (300 ÷ 19,600), and the weight and normal force, which balance,
// are left out.

const PUSH = { on: 'car', name: 'Both people', n: 10300 };

const road = (dur: number): RampEl => ({
  kind: 'ramp',
  id: 'ramp',
  angle: 0,
  length: 16,
  friction: [0.02, 300 / 19600],
  g: 9.8,
  bodies: [{ id: 'car', mass: 2000, label: '2,000 kg', x: 3.4, width: 4.4, tone: 'adj' }],
  balanced: ['car'],
  label: 'A car on a level road',
  height: 330,
  pad: [150, 110],
  forceScale: 0.025,
  velocityScale: 18,
  poster: 'go',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: [PUSH] }] },
    go: { phases: [{ dur, slow: 2, note: 'Slow motion', forces: [PUSH] }] },
  },
});

const video: Explainer = {
  id: 'xq-p20-2-2',
  lessonId: '',
  exam: {
    lesson: 'p20-2-2',
    source: 'OpenStax, Physics, Test Prep for section 4.3, Newton\'s Second Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion',
  },
  title: 'Exam Question: How Hard Must Two People Push a Car?',
  thumbnailTitle: 'Push a Car',
  thumbnail: 'ramp',
  summary:
    'A real test question, solved one small step at a time: two people push a 2,000 kg car that needs an acceleration of 5.0 m/s², against 300 N of friction. We use Newton\'s second law to find the net force, add the friction back on to find the total push, and share it between the two people. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two People Push a Car', subtitle: 'Newton\'s second law with friction, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two people pushing a car. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Two people push a 2,000-kg car to get it started. An acceleration of at least $5.0\\ \\text{m/s}^2$ is required to start the car. Assuming both people apply the same magnitude force, how much force will each need to apply if friction between the car and the road is 300 N?',
          choices: ['$4850\\ \\text{N}$', '$5150\\ \\text{N}$', '$97000\\ \\text{N}$', '$10300\\ \\text{N}$'],
          answer: 1,
          working: 'Net force $= 2000 \\times 5.0 = 10\\,000\\ \\text{N}$; add the friction: $10\\,300\\ \\text{N}$; share it: $5150\\ \\text{N}$ each.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Two people push a two thousand kilogram car to get it started. An acceleration of at least 5.0 metres per second squared is needed to start the car. Both people push equally hard. How much force does each one need, if the friction between the car and the road is three hundred newtons?' },
        { say: 'The choices are 4,850 newtons, 5,150 newtons, 97,000 newtons, and 10,300 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [road(1.4), { kind: 'text', id: 'plain', size: 'lg', md: 'How hard must **each person** push?' }],
      lines: [
        { say: 'Let us say it in everyday words. A car will not start, so two friends push it along a flat road.', show: 'ramp', play: 'ramp.go', playDelay: 1 },
        { say: 'The car only starts if it speeds up fast enough. The road\'s friction holds it back a little. The question asks: how hard must each person push?', show: ['plain', 'ramp.friction'] },
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
          title: 'Newton\'s second law',
          md: 'The **net force** on an object equals its mass times its acceleration: $F_{\\text{net}} = ma$. The net force is what is left when the forces are added up, with forces that point backwards taken away.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Push $100\\ \\text{N}$ forwards, friction $30\\ \\text{N}$ backwards: net force $= 100 - 30 = 70\\ \\text{N}$.' },
      ],
      lines: [
        { say: 'Here is the one idea we need: Newton\'s second law. The net force on an object equals its mass times its acceleration.', show: 'def' },
        { say: 'The net force is what is left over when you add up all the forces, taking away the ones that point backwards.' },
        { say: 'For example, if you push forwards with a hundred newtons, and friction pulls back with thirty, the net force is a hundred take away thirty: seventy newtons.', show: 'ex' },
        { say: 'Only the net force speeds the car up. Part of the push is used up just beating the friction.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **net force** the car needs: $F_{\\text{net}} = ma$', 'Add on the **friction**, to get the total push', '**Share** the total push between the two people'],
        },
      ],
      lines: [
        { say: 'Here is the plan, in three steps. First, use Newton\'s second law to find the net force the car needs.', show: 'plan.0' },
        { say: 'Second, the pushes must also beat the friction, so add the friction on. That gives the total push.', show: 'plan.1' },
        { say: 'Third, two people share that total push equally, so divide it by two.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The net force',
      layout: 'split',
      leftWidth: 760,
      left: [road(1.4)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F_{\\text{net}} = ma', '= 2000 \\times 5.0', '= \\hyp{10\\,000\\ \\text{N}}'] }],
      lines: [
        { say: 'Step one: the net force. The car has a mass of two thousand kilograms, and it needs an acceleration of 5.0 metres per second squared.', show: ['ramp', 'm.0'], play: 'ramp.name' },
        { say: 'Pause and try it: two thousand times five.', show: 'm.1', wait: 3 },
        { say: 'It is ten thousand newtons. That is the net force the car needs: what is left over after the friction.', show: ['m.2', 'ramp.net'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Add the friction',
      layout: 'split',
      leftWidth: 760,
      left: [road(1.4)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P - 300 = 10\\,000', 'P = 10\\,000 + 300', 'P = \\hyp{10\\,300\\ \\text{N}}'] }],
      lines: [
        { say: 'Step two. The people push forwards, and friction pulls back with three hundred newtons. Call the total push P. The net force is P, take away three hundred.', show: ['ramp', 'ramp.friction', 'm.0'], play: 'ramp.name' },
        { say: 'That has to equal ten thousand. So P is ten thousand, add on three hundred.', show: 'm.1' },
        { say: 'Together, the two people must push with 10,300 newtons.', show: ['m.2', 'ramp.net'], focus: 'm.2' },
        { say: 'Notice that we add the friction on. The friction is working against them, so they have to push harder, not less hard.' },
      ],
    },
    {
      chapter: 'Step 3: Share the push',
      layout: 'split',
      leftWidth: 760,
      left: [road(1.4)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{each} = 10\\,300 \\div 2', '\\text{each} = \\good{5150\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. The question says both people push equally hard. So each one gives half of the total push.', show: ['ramp', 'ramp.friction', 'm.0'], play: 'ramp.name' },
        { say: '10,300 divided by two is 5,150. Each person must push with 5,150 newtons.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is 5,150 newtons. That is choice B.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        road(1.4),
        { kind: 'math', id: 'm', size: 'md', lines: ['5150 + 5150 - 300 = 10\\,000\\ \\text{N}', '10\\,000 \\div 2000 = 5.0\\ \\text{m/s}^2\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check it, by working forwards. Two pushes of 5,150 newtons make 10,300. Take away the three hundred newtons of friction, and ten thousand newtons is left.', show: ['ramp', 'ramp.friction', 'm.0'] },
        { say: 'Ten thousand newtons on two thousand kilograms gives an acceleration of five metres per second squared. That is exactly what the car needs.', show: 'm.1' },
        { say: 'Watch the car speed up. The readout shows five metres per second squared.', show: ['ramp.velocity', 'ramp.readout'], play: 'ramp.go', playDelay: 0.5 },
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
            ['$10300\\ \\text{N}$', 'The push of **both** people together: forgot to share it'],
            ['$4850\\ \\text{N}$', '$(10\\,000 - 300) \\div 2$: friction **taken away** instead of added'],
            ['$97000\\ \\text{N}$', 'Far too big: about **five times** the car\'s whole weight'],
            ['$5150\\ \\text{N}$', '$(10\\,000 + 300) \\div 2$. Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Test questions often hide common mistakes in the wrong choices. Here are three of them.', show: 'traps' },
        { say: '10,300 newtons is the push of both people together. It answers a different question: the question asks for each person.' },
        { say: '4,850 newtons is what you get if you take the friction away instead of adding it on. But friction makes the job harder, so the push must be bigger.' },
        { say: 'And 97,000 newtons is far too big. The whole car only weighs about twenty thousand newtons. A quick size check rules it out.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Three people push a 1,200 kg car on a level road. It needs an acceleration of $2.0\\ \\text{m/s}^2$, and the friction on it is 240 N. Each person pushes equally hard. How hard must each one push?',
          choices: ['$720\\ \\text{N}$', '$800\\ \\text{N}$', '$880\\ \\text{N}$', '$2640\\ \\text{N}$'],
          answer: 2,
          working: 'Net force $= 1200 \\times 2.0 = 2400\\ \\text{N}$; add the friction: $2640\\ \\text{N}$; share it three ways: $880\\ \\text{N}$ each.',
        },
      ],
      lines: [
        { say: 'Your turn. Three people push a twelve hundred kilogram car on a level road. It needs an acceleration of 2.0 metres per second squared, and the friction is two hundred and forty newtons. Each person pushes equally hard. How hard must each one push? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The net force is twelve hundred times two: 2,400 newtons. Add on the friction to get 2,640 newtons. Shared between three people, that is 880 newtons each. That is choice C.', show: 'q2.answer' },
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
          items: ['Newton\'s second law: $F_{\\text{net}} = ma$', 'Total push $=$ net force $+$ friction', 'Read the question: **each** person, or **both**?', 'Check by working forwards to the acceleration'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The net force is mass times acceleration.', show: 'sum.0' },
        { say: 'The push has to give that net force and beat the friction as well, so add the friction on.', show: 'sum.1' },
        { say: 'Read the question carefully: does it ask for each person, or both together?', show: 'sum.2' },
        { say: 'And check your answer by working forwards to the acceleration. For more on Newton\'s laws, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
