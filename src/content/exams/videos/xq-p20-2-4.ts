import type { Explainer, RampEl } from '@/video/script.ts';

// Exam question (pilot of roadmap item 11): kinetic friction on a skier, for lesson 2.4 (forces
// on an inclined plane). The question is OpenStax Physics' own, word for word (Test Prep for
// section 5.4, CC BY 4.0), and uses g = 9.8 N/kg as the book does: the weight is 656.6 N, its part
// into the slope 656.6 cos 37° = 524.4 N, and friction 0.07 × 524.4 = 36.71 N (choice c). The
// wrong choices come from the weight itself (0.07 × 656.6 = 45.96 N) and from the sine
// (0.07 × 395.2 = 27.66 N). The skier then speeds up at g(sin 37° − 0.07 cos 37°) = 5.35 m/s².

/** The question's skier on a 37° slope, 67 kg, with a coefficient of kinetic friction of 0.07. */
const slope = (dur: number, height = 470, x = 8.6): RampEl => ({
  kind: 'ramp',
  id: 'ramp',
  angle: 37,
  length: 10,
  g: 9.8,
  friction: [0.1, 0.07],
  bodies: [{ id: 'skier', mass: 67, label: 'Skier, 67 kg', x, width: 1.3, tone: 'adj' }],
  label: 'A snowy slope at 37°',
  height,
  pad: [150, 40],
  forceScale: 0.22,
  velocityScale: 12,
  poster: 'go',
  clips: { go: { phases: [{ dur, slow: 2, note: 'Slow motion' }] } },
});

const QUESTION =
  'A skier with a mass of 67 kg is skiing down a snowy slope with an incline of 37°. Find the friction if the coefficient of kinetic friction is 0.07.';

const video: Explainer = {
  id: 'xq-p20-2-4',
  lessonId: '',
  exam: {
    lesson: 'p20-2-4',
    source: 'OpenStax, Physics, Test Prep for section 5.4, Inclined Planes',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-4-inclined-planes',
  },
  title: 'Exam Question: Friction on a Skier Going Down a Slope',
  thumbnailTitle: 'Friction on a Slope',
  thumbnail: 'ramp',
  summary:
    'A real test question, solved one small step at a time: a 67 kg skier slides down a 37° slope, and we find the kinetic friction on the skis. We find the weight, split it into a part along the slope and a part into it, use the part into the slope as the normal force, and multiply by the coefficient of friction. Then we check the answer and look at the two traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Friction on a Skier', subtitle: 'Kinetic friction on a slope, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a skier on a slope. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$27.66\\ \\text{N}$', '$34.70\\ \\text{N}$', '$36.71\\ \\text{N}$', '$45.96\\ \\text{N}$'],
          answer: 2,
          working: 'Normal force $= mg\\cos 37^\\circ = 524.4\\ \\text{N}$, so friction $= 0.07 \\times 524.4 = 36.71\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A skier with a mass of sixty-seven kilograms is skiing down a snowy slope with an incline of thirty-seven degrees. Find the friction if the coefficient of kinetic friction is 0.07.' },
        { say: 'The choices are 27.66 newtons, 34.70 newtons, 36.71 newtons, and 45.96 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        slope(1.6),
        { kind: 'text', id: 'plain', size: 'lg', md: 'How hard does the snow **rub** against the skis?' },
      ],
      lines: [
        { say: 'Let us say the question in everyday words. A skier is sliding down a hill.', show: 'ramp', play: 'ramp.go', playDelay: 1.5 },
        { say: 'As the skis slide, the snow rubs against them and holds them back a little. That rubbing is friction. The question asks: how hard does the snow rub against the skis?', show: 'plain' },
        { say: 'The word kinetic just means moving. Kinetic friction is the friction on something that is already sliding.' },
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
          title: 'Kinetic friction',
          md: 'The force that holds back a sliding object: $f_k = \\mu_k N$. Here $\\mu_k$ is the **coefficient of kinetic friction** (how grippy the two surfaces are) and $N$ is the **normal force** (how hard the surfaces press together).',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Ice on steel: $\\mu_k \\approx 0.03$. Rubber on dry road: $\\mu_k \\approx 0.7$. Waxed skis on snow: $\\mu_k \\approx 0.07$.' },
      ],
      lines: [
        { say: 'Before we start, here is the one idea we need. Kinetic friction is the force that holds back something that is sliding.', show: 'def' },
        { say: 'It equals the coefficient of kinetic friction, times the normal force.' },
        { say: 'The coefficient is just a number that says how grippy two surfaces are. Ice on steel is very slippery, about 0.03. Rubber on a dry road is grippy, about 0.7. Waxed skis on snow are slippery, 0.07.', show: 'ex' },
        { say: 'The normal force is how hard the two surfaces press together. Press harder, and the rubbing gets stronger. That is the part we have to find.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the skier\'s **weight**', '**Split** the weight: along the slope, and into the slope', 'The **normal force** balances the part into the slope', '**Friction** $=$ coefficient $\\times$ normal force'],
        },
      ],
      lines: [
        { say: 'We know the coefficient: 0.07. So all we need is the normal force. Here is the plan, in four steps.', show: 'plan.0' },
        { say: 'First, find the skier\'s weight. Second, split the weight into two parts: one along the slope, and one pushing into the slope.', show: 'plan.1' },
        { say: 'Third, the normal force balances the part that pushes into the slope.', show: 'plan.2' },
        { say: 'And fourth, multiply the normal force by the coefficient to get the friction.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The weight',
      layout: 'split',
      leftWidth: 640,
      left: [slope(1.6, 470, 5.5)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['W = mg', 'W = 67 \\times 9.8', 'W = 656.6\\ \\text{N}'] }],
      lines: [
        { say: 'Step one: the weight. The weight is the pull of gravity on the skier, and it always points straight down.', show: ['ramp', 'ramp.weight'] },
        { say: 'Weight is mass times g. The question does not give g, and this textbook uses 9.8 newtons per kilogram, so we use that.', show: ['m.0', 'm.1'] },
        { say: 'Sixty-seven times 9.8 is 656.6. The weight is 656.6 newtons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Split the weight',
      layout: 'split',
      leftWidth: 640,
      left: [slope(1.6, 470, 5.5)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{into: } \\hyp{mg\\cos 37^\\circ}', '= 656.6 \\times 0.7986', '= \\hyp{524.4\\ \\text{N}}', '\\text{along: } mg\\sin 37^\\circ', '= 395.2\\ \\text{N}'],
        },
      ],
      lines: [
        { say: 'Step two. On a slope, the weight does two jobs at once. Part of it pulls the skier down along the slope. The other part presses the skier into the snow.', show: ['ramp', 'ramp.weight', 'ramp.components'] },
        { say: 'Pause and try this step: which part do we need for friction? We need the part that presses into the snow, because friction depends on how hard the surfaces press together.', wait: 3 },
        { say: 'The part into the slope is m g cos theta. Cos of thirty-seven degrees is about 0.7986.', show: ['m.0', 'm.1'] },
        { say: 'So 656.6 times 0.7986 is 524.4 newtons. Hold on to that number: it is the key to the whole question.', show: 'm.2', focus: 'm.2' },
        { say: 'Just for comparison, the part along the slope is m g sine theta, 395.2 newtons. We will not need it for the friction, but it will help us check the answer.', show: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Step 3: The normal force',
      layout: 'split',
      leftWidth: 640,
      left: [slope(1.6, 470, 5.5)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['N = mg\\cos 37^\\circ', 'N = \\hyp{524.4\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. The skier does not sink into the snow, and does not fly off it. So the snow pushes back, out of the slope, exactly as hard as the skier presses in.', show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal'] },
        { say: 'That push back is the normal force. It balances the part of the weight into the slope, so the normal force is 524.4 newtons.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Notice that this is less than the weight. On a slope, the normal force is not m g. That is the most common mistake in this kind of question.' },
      ],
    },
    {
      chapter: 'Step 4: The friction',
      layout: 'split',
      leftWidth: 640,
      left: [slope(1.6, 470, 5.5)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f_k = \\mu_k N', 'f_k = 0.07 \\times 524.4', 'f_k = \\good{36.71\\ \\text{N}}'] }],
      lines: [
        { say: 'Step four. Friction is the coefficient times the normal force.', show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal', 'm.0'] },
        { say: 'Pause and try the multiplication yourself: 0.07 times 524.4.', show: 'm.1', wait: 3 },
        { say: 'It is 36.71 newtons. Friction points up the slope, against the sliding.', show: ['m.2', 'ramp.friction'], focus: 'm.2' },
        { say: 'So the answer is 36.71 newtons. That is choice C.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        slope(1.2, 400),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{friction } 36.71\\ \\text{N} \\;<\\; \\text{pull } 395.2\\ \\text{N}', '\\Rightarrow \\text{the skier speeds up}'] },
      ],
      lines: [
        { say: 'Let us check that the answer makes sense. Waxed skis on snow are slippery, so the friction should be small.', show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal', 'ramp.friction'] },
        { say: 'And it is: 36.71 newtons holds the skier back, but 395.2 newtons pulls the skier down the slope. So the skier should still speed up.', show: 'm' },
        { say: 'Watch. The skier speeds up all the way down, at about 5.35 metres per second squared. The answer fits what we see.', show: ['ramp.velocity', 'ramp.readout'], hide: ['ramp.weight', 'ramp.components'], play: 'ramp.go', playDelay: 0.5 },
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
            ['$45.96\\ \\text{N}$', '$0.07 \\times 656.6$: the **whole weight** used as the normal force'],
            ['$27.66\\ \\text{N}$', '$0.07 \\times 395.2$: the part **along** the slope (sine instead of cos)'],
            ['$36.71\\ \\text{N}$', '$0.07 \\times 524.4$: the part **into** the slope. Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Test questions often hide common mistakes in the wrong choices. Here are two of them.', show: 'traps' },
        { say: '45.96 newtons is what you get if you use the whole weight as the normal force. That only works on flat ground.', focus: 'traps' },
        { say: '27.66 newtons is what you get if you use sine instead of cos. That is the part along the slope, and it does not press the skis into the snow.' },
        { say: 'To remember which is which: cos goes with the part that presses into the slope, and sine with the part that pulls down it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 50 kg sled slides down a hill inclined at 20°. The coefficient of kinetic friction is 0.1. Use $g = 9.8\\ \\text{N/kg}$. What is the friction on the sled?',
          choices: ['$16.8\\ \\text{N}$', '$49.0\\ \\text{N}$', '$460\\ \\text{N}$', '$46.0\\ \\text{N}$'],
          answer: 3,
          working: '$N = 50 \\times 9.8 \\times \\cos 20^\\circ = 460.5\\ \\text{N}$, so friction $= 0.1 \\times 460.5 = 46.0\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A fifty kilogram sled slides down a hill inclined at twenty degrees. The coefficient of kinetic friction is 0.1. Use 9.8 for g. What is the friction on the sled? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The normal force is fifty times 9.8 times the cos of twenty degrees: 460.5 newtons. Times 0.1, the friction is 46.0 newtons. That is choice D. Choice B used the whole weight, and choice A used the sine.', show: 'q2.answer' },
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
          items: ['Kinetic friction: $f_k = \\mu_k N$', 'On a slope, $N = mg\\cos\\theta$, **not** $mg$', 'Cos presses **into** the slope; sine pulls **along** it', 'Check: friction should be small for a slippery surface'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Kinetic friction is the coefficient times the normal force.', show: 'sum.0' },
        { say: 'On a slope, the normal force is m g cos theta, not m g.', show: 'sum.1' },
        { say: 'Cos goes with the part that presses into the slope, and sine with the part along it.', show: 'sum.2' },
        { say: 'And always check that your answer makes sense. For more on forces on a slope, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
