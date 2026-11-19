import type { Explainer, RampEl } from '@/video/script.ts';

// Exam question (pilot of roadmap item 11): a person walks while pushing an object, for lesson 2.5
// (connected objects, treated as one system). The question is OpenStax Physics' own, word for word
// (Test Prep for section 4.4, CC BY 4.0). By Newton's third law, the person's 160 N push on the
// ground gives a 160 N push of the ground on the person, forwards. The system is the person and the
// object, 55 + 10 = 65 kg, so its net force is 65 × 2 = 130 N, and friction 160 − 130 = 30 N
// (choice a). The wrong choices: 50 N uses the person's mass alone (160 − 55 × 2), 290 N adds
// instead of taking away (160 + 130), and 270 N does both (160 + 110).
//
// In the picture the system is one block of 65 kg on a level floor, its friction coefficient chosen
// so the friction is 30 N (30 ÷ (65 × 9.8)); the weight and normal force, which balance, are left out.

const GROUND = { on: 'sys', name: 'Ground on the person', n: 160 };

const floor = (dur: number): RampEl => ({
  kind: 'ramp',
  id: 'ramp',
  angle: 0,
  length: 10,
  friction: [0.06, 30 / (65 * 9.8)],
  g: 9.8,
  bodies: [{ id: 'sys', mass: 65, label: '65 kg', x: 2.6, width: 2.6, tone: 'adj' }],
  balanced: ['sys'],
  label: 'One system: the person and the object',
  height: 330,
  pad: [150, 110],
  forceScale: 1.2,
  velocityScale: 40,
  poster: 'go',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: [GROUND] }] },
    go: { phases: [{ dur, slow: 2, note: 'Slow motion', forces: [GROUND] }] },
  },
});

const video: Explainer = {
  id: 'xq-p20-2-5',
  lessonId: '',
  exam: {
    lesson: 'p20-2-5',
    source: 'OpenStax, Physics, Test Prep for section 4.4, Newton\'s Third Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-4-newtons-third-law-of-motion',
  },
  title: 'Exam Question: The Friction on a Person Pushing a Box',
  thumbnailTitle: 'Push and Friction',
  thumbnail: 'ramp',
  summary:
    'A real test question, solved one small step at a time: a 55 kg person pushes a 10 kg object and speeds up at 2 m/s². We use Newton\'s third law to find the forward push, treat the person and the object as one system, and use Newton\'s second law to find the friction. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Pushing a Box', subtitle: 'One system, two of Newton\'s laws, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a person pushing a box. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A person weighing 55 kg walks by applying 160 N of force on the ground, while pushing a 10-kg object. If the person accelerates at $2\\ \\text{m/s}^2$, what is the force of friction experienced by the system consisting of the person and the object?',
          choices: ['$30\\ \\text{N}$', '$50\\ \\text{N}$', '$270\\ \\text{N}$', '$290\\ \\text{N}$'],
          answer: 0,
          working: 'System: $65\\ \\text{kg}$, net force $= 65 \\times 2 = 130\\ \\text{N}$, so friction $= 160 - 130 = 30\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A person of fifty-five kilograms walks by pushing on the ground with a hundred and sixty newtons, while pushing a ten kilogram object. If the person speeds up at two metres per second squared, what is the friction on the system made of the person and the object?' },
        { say: 'One small thing first: the question says weighing fifty-five kilograms. Kilograms measure mass, so this is the person\'s mass.' },
        { say: 'The choices are thirty newtons, fifty newtons, two hundred and seventy newtons, and two hundred and ninety newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [floor(1.2), { kind: 'text', id: 'plain', size: 'lg', md: 'How much **friction** holds them back?' }],
      lines: [
        { say: 'Let us say it in everyday words. Someone walks across a floor, pushing a box in front of them, and they speed up.', show: 'ramp', play: 'ramp.go', playDelay: 1 },
        { say: 'Friction holds back the person and the box together. The question asks: how big is that friction?', show: ['plain', 'ramp.friction'] },
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
          title: 'A system',
          md: 'A **system** is the group of objects we choose to study together. Pushes **between** them (the person on the box) cancel out, so only pushes from **outside** the system change its motion: $F_{\\text{net}} = m_{\\text{total}}\\, a$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '**Newton\'s third law:** push on the ground, and the ground pushes back on you, just as hard, the other way.' },
      ],
      lines: [
        { say: 'We need two ideas. The first is a system. A system is just the group of objects we choose to look at together. Here, it is the person and the box.', show: 'def' },
        { say: 'The person pushes the box, and the box pushes back on the person. Both pushes are inside the system, so they cancel out. Only pushes from outside the system speed it up.' },
        { say: 'The second idea is Newton\'s third law. When you push on the ground, the ground pushes back on you, just as hard, in the opposite direction.', show: 'ex' },
        { say: 'That is how walking works. Your foot pushes the ground backwards, and the ground pushes you forwards.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **forward push** on the system (Newton\'s third law)', 'Add up the **mass** of the system', 'Find the **net force**: $F_{\\text{net}} = ma$', 'Friction $=$ forward push $-$ net force'],
        },
      ],
      lines: [
        { say: 'Here is the plan, in four steps. First, find the forward push on the system, using Newton\'s third law.', show: 'plan.0' },
        { say: 'Second, add up the mass of the whole system.', show: 'plan.1' },
        { say: 'Third, use Newton\'s second law to find the net force.', show: 'plan.2' },
        { say: 'And fourth, the friction is whatever part of the forward push does not go into speeding up.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The forward push',
      layout: 'split',
      leftWidth: 760,
      left: [floor(1.2)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{on ground: } 160\\ \\text{N} \\leftarrow', '\\text{on person: } \\hyp{160\\ \\text{N}} \\rightarrow'] }],
      lines: [
        { say: 'Step one. The person pushes on the ground with a hundred and sixty newtons, backwards.', show: ['ramp', 'm.0'], play: 'ramp.name' },
        { say: 'By Newton\'s third law, the ground pushes back on the person with a hundred and sixty newtons, forwards. That is the push from outside the system that moves it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The mass of the system',
      layout: 'split',
      leftWidth: 760,
      left: [floor(1.2)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = 55 + 10', 'm = \\hyp{65\\ \\text{kg}}'] }],
      lines: [
        { say: 'Step two. The system is the person and the object, and they speed up together. So we add their masses.', show: ['ramp', 'm.0'], play: 'ramp.name' },
        { say: 'Fifty-five add ten is sixty-five kilograms.', show: 'm.1', focus: 'm.1' },
        { say: 'This is the step that is easy to miss. The forward push has to speed up the box too, not just the person.' },
      ],
    },
    {
      chapter: 'Step 3: The net force',
      layout: 'split',
      leftWidth: 760,
      left: [floor(1.2)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F_{\\text{net}} = ma', '= 65 \\times 2', '= \\hyp{130\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. The net force is mass times acceleration.', show: ['ramp', 'm.0'], play: 'ramp.name' },
        { say: 'Pause and try it: sixty-five times two.', show: 'm.1', wait: 3 },
        { say: 'It is a hundred and thirty newtons. That is the part of the forces that actually speeds the system up.', show: ['m.2', 'ramp.net'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 4: The friction',
      layout: 'split',
      leftWidth: 760,
      left: [floor(1.2)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['160 - f = 130', 'f = 160 - 130', 'f = \\good{30\\ \\text{N}}'] }],
      lines: [
        { say: 'Step four. Forwards, the ground pushes with a hundred and sixty newtons. Backwards, friction holds them back. What is left over is the net force, a hundred and thirty newtons.', show: ['ramp', 'ramp.net', 'm.0'], play: 'ramp.name' },
        { say: 'So the friction is a hundred and sixty take away a hundred and thirty.', show: 'm.1' },
        { say: 'The friction is thirty newtons, pointing backwards.', show: ['m.2', 'ramp.friction'], focus: 'm.2' },
        { say: 'So the answer is thirty newtons. That is choice A.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        floor(1.2),
        { kind: 'math', id: 'm', size: 'md', lines: ['160 - 30 = 130\\ \\text{N}', '130 \\div 65 = 2\\ \\text{m/s}^2\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check it, by working forwards. A hundred and sixty newtons forwards, take away thirty newtons of friction, leaves a hundred and thirty newtons.', show: ['ramp', 'ramp.friction', 'm.0'] },
        { say: 'A hundred and thirty newtons on sixty-five kilograms gives two metres per second squared. That is exactly the acceleration in the question.', show: 'm.1' },
        { say: 'Watch them speed up. The readout shows two metres per second squared.', show: ['ramp.velocity', 'ramp.readout'], play: 'ramp.go', playDelay: 0.5 },
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
            ['$50\\ \\text{N}$', '$160 - 55 \\times 2$: the person\'s mass **alone**, forgetting the object'],
            ['$290\\ \\text{N}$', '$160 + 130$: **added** instead of taken away'],
            ['$270\\ \\text{N}$', '$160 + 55 \\times 2$: **both** mistakes at once'],
            ['$30\\ \\text{N}$', '$160 - 65 \\times 2$. Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Test questions often hide common mistakes in the wrong choices. Here are three of them.', show: 'traps' },
        { say: 'Fifty newtons is what you get if you use only the person\'s mass, fifty-five kilograms, and forget the object they are pushing.' },
        { say: 'Two hundred and ninety newtons is what you get if you add the net force on instead of taking it away. But friction can never be bigger than the push here, or they would slow down.' },
        { say: 'And two hundred and seventy newtons makes both mistakes at once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 70 kg person pushes a 30 kg cart across a level floor by pushing back on the floor with 250 N. The person and the cart speed up together at $1.5\\ \\text{m/s}^2$. What is the friction on the person and the cart together?',
          choices: ['$145\\ \\text{N}$', '$400\\ \\text{N}$', '$100\\ \\text{N}$', '$355\\ \\text{N}$'],
          answer: 2,
          working: 'System: $100\\ \\text{kg}$, net force $= 100 \\times 1.5 = 150\\ \\text{N}$, so friction $= 250 - 150 = 100\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A seventy kilogram person pushes a thirty kilogram cart across a level floor, by pushing back on the floor with two hundred and fifty newtons. The person and the cart speed up together at 1.5 metres per second squared. What is the friction on them together? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The system is a hundred kilograms. The net force is a hundred times 1.5: a hundred and fifty newtons. So the friction is two hundred and fifty take away a hundred and fifty: a hundred newtons. That is choice C.', show: 'q2.answer' },
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
          items: ['Push on the ground, and the ground pushes you forwards', 'Objects that move together make one **system**: add their masses', 'Friction $=$ forward push $- ma$', 'Check: friction must be smaller than the push if they speed up'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. When you push on the ground, the ground pushes you forwards, just as hard.', show: 'sum.0' },
        { say: 'Objects that move together can be treated as one system: add their masses.', show: 'sum.1' },
        { say: 'The friction is the forward push, take away mass times acceleration.', show: 'sum.2' },
        { say: 'And if they speed up, the friction must be smaller than the push. For more on connected objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
