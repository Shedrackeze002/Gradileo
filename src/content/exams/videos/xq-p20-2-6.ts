import type { Explainer, ForcesEl, PlaneForce } from '@/video/script.ts';

// Exam question for lesson 2.6 (forces in two dimensions): two people pull a trolley with 44 N each,
// on ropes that make 39.5° with each other. The question is OpenStax Physics' own, word for word
// (Test Prep for section 5.1, CC BY 4.0). Each rope is 19.75° from the middle line, so each pull has
// a forward component of 44 cos 19.75° = 41.41 N and a sideways one of 44 sin 19.75° = 14.87 N; the
// sideways parts cancel and the net force is 2 × 41.41 = 82.8 N (choice c). 88.0 N adds the pulls
// as if the ropes were side by side, 0.0 N as if they pulled in opposite directions, and 79.6 N is
// a near miss that no correct working gives.
//
// The picture is the trolley seen from above on frictionless ice (src/video/forces.ts), so the net
// force and its components are worked out and drawn.

const pulls = (half: number, n = 44): PlaneForce[] => [
  { name: 'Rope 1', n, angle: half },
  { name: 'Rope 2', n, angle: -half },
];

const trolley: ForcesEl = {
  kind: 'forces',
  id: 'top',
  body: { mass: 20, label: 'trolley', tone: 'adj' },
  view: [-0.6, 6, -2.4, 2.4],
  label: 'Seen from above, on ice',
  height: 470,
  forceScale: 3.6,
  poster: 'go',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: pulls(19.75) }] },
    go: { reset: true, phases: [{ dur: 0.8, slow: 2, note: 'Slow motion', forces: pulls(19.75) }] },
    together: { reset: true, phases: [{ dur: 2, freeze: true, forces: pulls(4) }] },
    apart: { reset: true, phases: [{ dur: 2, freeze: true, forces: pulls(90) }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-2-6',
  lessonId: '',
  exam: {
    lesson: 'p20-2-6',
    source: 'OpenStax, Physics, Test Prep for section 5.1, Vector Addition and Subtraction: Graphical Methods',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-1-vector-addition-and-subtraction-graphical-methods',
    question:
      'Two people pull on ropes tied to a trolley, each applying 44 N of force. The angle the ropes form with each other is 39.5°. What is the magnitude of the net force exerted on the trolley?',
    choices: ['0.0 N', '79.6 N', '82.8 N', '88.0 N'],
  },
  title: 'Exam Question: Two Ropes Pull a Trolley at an Angle. What Is the Net Force?',
  thumbnailTitle: 'Two Ropes',
  thumbnail: 'top',
  summary:
    'A real test question, solved one small step at a time: two people pull a trolley with 44 N each, on ropes that make an angle of 39.5° with each other, and we find the net force. We split each pull into a forward part and a sideways part, see the sideways parts cancel, and add the forward parts. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Ropes Pull a Trolley', subtitle: 'Adding forces at an angle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two people pulling a trolley with ropes that spread apart. We will take it one small step at a time.', show: 'title' },
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
            'Two people pull on ropes tied to a trolley, each applying 44 N of force. The angle the ropes form with each other is $39.5^\\circ$. What is the magnitude of the net force exerted on the trolley?',
          choices: ['$0.0\\ \\text{N}$', '$79.6\\ \\text{N}$', '$82.8\\ \\text{N}$', '$88.0\\ \\text{N}$'],
          answer: 2,
          working: 'Each rope is $19.75^\\circ$ from the middle: $2 \\times 44\\cos 19.75^\\circ = 82.8\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Two people pull on ropes tied to a trolley, each with a force of forty four newtons. The angle between the two ropes is 39.5 degrees. What is the size of the net force on the trolley?' },
        { say: 'The choices are 0.0 newtons, 79.6 newtons, 82.8 newtons, and 88.0 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [trolley, { kind: 'text', id: 'plain', size: 'lg', md: 'Two pulls that **spread apart**: what is their **total** effect?' }],
      lines: [
        { say: 'Let us draw it, seen from above. Two ropes are tied to the trolley, and they spread apart, with 39.5 degrees between them. Each person pulls with forty four newtons.', show: 'top', play: 'top.name', playDelay: 0.6 },
        { say: 'The question asks for the net force: the one force that does the same job as both pulls together.', show: 'plain' },
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
          title: 'Components of a force',
          md: 'A force $F$ at an angle $\\theta$ to a line has a part **along** the line, $F\\cos\\theta$, and a part **across** it, $F\\sin\\theta$. Add the parts along, and add the parts across, separately.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$10\\ \\text{N}$ at $60^\\circ$: along $= 10\\cos 60^\\circ = 5\\ \\text{N}$, across $= 10\\sin 60^\\circ = 8.66\\ \\text{N}$.' },
      ],
      lines: [
        { say: 'Here is the idea we need. A slanted force does two jobs at once. Part of it pulls along a line, and part of it pulls across the line.', show: 'def' },
        { say: 'The part along the line is the force times the cosine of the angle. The part across is the force times the sine of the angle.' },
        { say: 'For example, ten newtons at sixty degrees has five newtons along the line, and 8.66 newtons across it.', show: 'ex' },
        { say: 'Two forces at an angle do not simply add up. We add their parts, one direction at a time.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Split the angle: each rope is **half** of $39.5^\\circ$ from the middle', 'Find each pull\'s **forward** and **sideways** parts', 'Add the parts: sideways **cancel**, forward **add**'],
        },
      ],
      lines: [
        { say: 'Here is the plan, in three steps. First, find the angle between each rope and the middle line.', show: 'plan.0' },
        { say: 'Second, split each pull into a forward part, along the middle line, and a sideways part.', show: 'plan.1' },
        { say: 'Third, add the parts. As we will see, the sideways parts cancel, and the forward parts add.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Split the angle',
      layout: 'split',
      leftWidth: 760,
      left: [trolley],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\theta = 39.5^\\circ \\div 2', '\\theta = \\hyp{19.75^\\circ}'] }],
      lines: [
        { say: 'Step one. The two ropes pull equally hard, so the trolley will move straight along the middle line, between them.', show: ['top', 'm.0'], play: 'top.name' },
        { say: 'Each rope is half of 39.5 degrees away from that line. Half of 39.5 is 19.75 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The parts of each pull',
      layout: 'split',
      leftWidth: 760,
      left: [trolley],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['44\\cos 19.75^\\circ', '= \\adj{41.41\\ \\text{N}}', '44\\sin 19.75^\\circ', '= \\opp{14.87\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Step two. Split each pull into its two parts. Here they are, drawn dashed.', show: ['top', 'top.components'], play: 'top.name' },
        { say: 'The forward part is forty four times cos 19.75 degrees. Pause and try it on your calculator.', show: 'm.0', wait: 3 },
        { say: 'It is 41.41 newtons, forwards.', show: 'm.1' },
        { say: 'The sideways part is forty four times sine 19.75 degrees: 14.87 newtons.', show: ['m.2', 'm.3'] },
        { say: 'Both ropes have these same parts. But one rope\'s sideways part points up the screen, and the other\'s points down.' },
      ],
    },
    {
      chapter: 'Step 3: Add the parts',
      layout: 'split',
      leftWidth: 760,
      left: [trolley],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['14.87 - 14.87 = 0', '41.41 + 41.41', 'F_{\\text{net}} = \\good{82.8\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Step three. Add the sideways parts. They are the same size, in opposite directions, so they cancel. Nothing is left sideways.', show: ['top', 'top.components', 'm.0'], play: 'top.name' },
        { say: 'Now add the forward parts. They point the same way, so they add: 41.41 plus 41.41.', show: 'm.1' },
        { say: 'That is 82.8 newtons. The net force is 82.8 newtons, straight along the middle line. That is choice C.', show: ['m.2', 'top.net'], focus: 'm.2' },
        { say: 'Watch the trolley move off along the net force.', hide: ['top.components', 'top.net'], play: 'top.go', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0\\ \\text{N} < 82.8\\ \\text{N} < 88\\ \\text{N}\\ \\checkmark', '2 \\times 44 \\times \\cos 19.75^\\circ = 88 \\times 0.941 = 82.8\\ \\text{N}'] }],
      lines: [
        { say: 'Let us check it with a size test. If the ropes pulled side by side, the net force would be forty four plus forty four: eighty eight newtons. If they pulled in opposite directions, it would be zero.', show: 'm.0' },
        { say: 'Our ropes are fairly close together, so the answer should be a bit less than eighty eight newtons. And 82.8 newtons is just that.' },
        { say: 'There is a shortcut too: eighty eight newtons, times cos 19.75 degrees, which is 0.941. That gives 82.8 newtons again.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'split',
      leftWidth: 760,
      left: [trolley],
      right: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$88.0\\ \\text{N}$', 'Ropes **side by side**'],
            ['$0.0\\ \\text{N}$', 'Ropes **opposite**'],
            ['$79.6\\ \\text{N}$', 'A near miss'],
            ['$82.8\\ \\text{N}$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: ['top', 'traps'], play: 'top.name' },
        { say: '88.0 newtons just adds the two pulls. That is only right when the ropes pull side by side, in almost the same direction, like this.', play: 'top.together', playDelay: 0.3 },
        { say: '0.0 newtons is what you get when the ropes pull in opposite directions, like this. Then the pulls cancel completely.', play: 'top.apart', playDelay: 0.3 },
        { say: 'And 79.6 newtons is close, but it does not come from any correct working. A near miss like that usually means a rounding slip, or the wrong angle on the calculator. So keep your numbers to a few decimal places until the end.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two dogs pull a sled across smooth ice, each with a force of 60 N. The angle between their two ropes is $60^\\circ$. What is the size of the net force on the sled?',
          choices: ['$60.0\\ \\text{N}$', '$103.9\\ \\text{N}$', '$120.0\\ \\text{N}$', '$0.0\\ \\text{N}$'],
          answer: 1,
          working: 'Each rope is $30^\\circ$ from the middle: $2 \\times 60\\cos 30^\\circ = 103.9\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two dogs pull a sled across smooth ice, each with a force of sixty newtons. The angle between their ropes is sixty degrees. What is the size of the net force on the sled? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Each rope is thirty degrees from the middle line. The forward part of each pull is sixty times cos thirty: 51.96 newtons. Two of them make 103.9 newtons. That is choice B.', show: 'q2.answer' },
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
          items: ['Forces at an angle do **not** simply add', 'Split each force: $F\\cos\\theta$ along, $F\\sin\\theta$ across', 'Equal pulls either side: the **sideways** parts cancel', 'Size check: between **0** and the plain sum'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Two forces at an angle do not simply add up.', show: 'sum.0' },
        { say: 'Split each force into a part along a line, F cos theta, and a part across it, F sine theta.', show: 'sum.1' },
        { say: 'When two equal pulls spread out evenly, their sideways parts cancel, and only the forward parts add.', show: 'sum.2' },
        { say: 'And check the size: the net force is between zero and the plain sum. For more on forces in two dimensions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
