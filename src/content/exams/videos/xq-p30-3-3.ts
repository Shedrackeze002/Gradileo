import type { Explainer, RaysEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.3 (refraction and Snell's law): a ray passes from water
// (n = 1.33) into carbon tetrachloride at 45.0° and is refracted at 40.1°; what is the index of
// refraction of carbon tetrachloride? The question is OpenStax Physics' own, word for word, with
// its four choices (a Problem for section 16.2, CC BY 4.0). n₂ = n₁ sin θ₁ ÷ sin θ₂ =
// 1.33 × sin 45.0° ÷ sin 40.1° = 1.46 (choice d). 1.21 is upside down, and 1.49 divides the angles
// and not their sines.
//
// The picture (src/video/rays.ts) is the ray crossing the boundary: the speeds are in the ratio
// 1.46 : 1.33, so the angle of refraction comes out at 40.1° for 45.0°, and stays in step with
// Snell's law as the ray is turned.

const ray: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'boundary',
  angle: 45,
  // The speed of light in each is c ÷ n, so the speeds are in the ratio 1/1.33 : 1/1.46.
  speeds: [1.46, 1.33],
  media: ['Water', 'Carbon tetrachloride'],
  height: 470,
  poster: 'turn',
  clips: {
    turn: { phases: [{ dur: 2.5, to: 20 }, { dur: 3, to: 65 }, { dur: 2.5, to: 45 }] },
  },
};

const QUESTION =
  'Water floats on a liquid called “carbon tetrachloride.” The two liquids do not mix. A light ray passing from water into carbon tetrachloride has an incident angle of 45.0° and an angle of refraction of 40.1°. If the index of refraction of water is 1.33, what is the index of refraction of carbon tetrachloride?';
const CHOICES = ['1.60', '1.49', '1.21', '1.46'];

const video: Explainer = {
  id: 'xq-p30-3-3',
  lessonId: '',
  exam: {
    lesson: 'p30-3-3',
    source: 'OpenStax, Physics, Problem for section 16.2, Refraction',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/16-2-refraction',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Finding an Index of Refraction With Snell’s Law',
  thumbnailTitle: 'Snell’s Law: Find n',
  thumbnail: 'r',
  summary:
    'A real test question, solved one small step at a time: a ray of light passes from water into carbon tetrachloride at 45.0° and is refracted at 40.1°, and we find the index of refraction of carbon tetrachloride. We write down Snell’s law, n₁ sin θ₁ = n₂ sin θ₂, rearrange it for n₂, and work it out with the sines of the angles. Then we turn the ray to check the answer, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Snell’s Law: Find n', subtitle: 'Refraction, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about light bending as it passes from one liquid into another. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$1.60$', '$1.49$', '$1.21$', '$1.46$'],
          answer: 3,
          working: '$n_2 = \\dfrac{n_1 \\sin\\theta_1}{\\sin\\theta_2} = \\dfrac{1.33 \\sin 45.0^\\circ}{\\sin 40.1^\\circ} = \\dfrac{(1.33)(0.7071)}{0.6441} = 1.46$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Water floats on a liquid called carbon tetrachloride. The two liquids do not mix. A light ray passing from water into carbon tetrachloride has an incident angle of 45.0 degrees and an angle of refraction of 40.1 degrees. If the index of refraction of water is 1.33, what is the index of refraction of carbon tetrachloride?' },
        { say: 'The choices are 1.60, 1.49, 1.21, and 1.46. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ray, { kind: 'text', id: 'plain', size: 'md', md: 'How much **slower** is light in the bottom liquid? That is its index, $n_2$.' }],
      lines: [
        { say: 'Let us picture it. The water is on top, and the carbon tetrachloride is underneath. A ray of light comes down through the water and crosses into the lower liquid.', show: ['r', 'r.normal'] },
        { say: 'Angles are always measured from the normal, the dashed line at right angles to the boundary. The ray arrives at 45.0 degrees and leaves at 40.1 degrees. It bends towards the normal, so light is slower in the lower liquid.', show: 'r.angles' },
        { say: 'The question asks for the index of refraction of that lower liquid.', show: 'plain' },
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
          title: 'Snell’s law',
          md: 'The **index of refraction** of a material is $n = \\dfrac{c}{v}$: how many times slower light is there than in a vacuum. At a boundary, $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$, with both angles measured from the **normal**. Use the **sines** of the angles, not the angles themselves.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Air ($n = 1.00$) into glass at $30.0^\\circ$, refracted at $19.5^\\circ$: $n_2 = \\dfrac{1.00 \\times 0.500}{0.334} = 1.50$.' },
      ],
      lines: [
        { say: 'Here is what we need. The index of refraction of a material tells you how many times slower light travels in it than in a vacuum.', show: 'def' },
        { say: 'When light crosses a boundary, Snell\'s law links the two sides: n one times the sine of theta one equals n two times the sine of theta two. Both angles are measured from the normal, and it is their sines that go in, not the angles.' },
        { say: 'For example, light going from air into glass at thirty degrees, and bent to 19.5 degrees, gives the glass an index of 1.50.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down Snell’s law', 'Rearrange it for $n_2$', 'Find the **sines** and divide'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down Snell\'s law.', show: 'plan.0' },
        { say: 'Second, rearrange it so that the unknown index is on its own.', show: 'plan.1' },
        { say: 'Third, find the sines of the angles, and work it out.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2', 'n_2 = \\dfrac{n_1 \\sin\\theta_1}{\\sin\\theta_2}'] }],
      lines: [
        { say: 'Step one. Side one is the water, and side two is the carbon tetrachloride. Snell\'s law says n one sine theta one equals n two sine theta two.', show: 'm.0' },
        { say: 'Divide both sides by sine theta two. Then n two is n one sine theta one, over sine theta two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The sines',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin 45.0^\\circ = 0.7071', '\\sin 40.1^\\circ = \\adj{0.6441}'] }],
      lines: [
        { say: 'Step two. Make sure your calculator is in degrees. The sine of 45.0 degrees is 0.7071.', show: 'm.0' },
        { say: 'And the sine of 40.1 degrees is 0.6441.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Work it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n_2 = \\dfrac{(1.33)(0.7071)}{0.6441}', '= \\dfrac{0.9404}{0.6441} = \\good{1.46}'] }],
      lines: [
        { say: 'Step three. Put in the numbers: 1.33 times 0.7071, divided by 0.6441.', show: 'm.0' },
        { say: 'The top is 0.9404, and dividing gives 1.46. The index of refraction of carbon tetrachloride is 1.46. That is choice D. It is bigger than water\'s, which fits: the ray bent towards the normal, into the slower liquid.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [ray, { kind: 'math', id: 'm', size: 'md', lines: ['1.33 \\sin 45.0^\\circ = 0.940 \\quad 1.46 \\sin 40.1^\\circ = 0.940\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it. In this picture, light in the lower liquid travels 1.33 over 1.46 as fast as in the water, which is what an index of 1.46 means. At 45.0 degrees, the ray bends to 40.1 degrees, just as in the question.', show: ['r', 'r.normal', 'r.angles', 'm.0'] },
        { say: 'Turn the ray, and both angles change, but n sine theta stays the same on both sides of the boundary. That is Snell\'s law at work.', play: 'r.turn', playDelay: 0.3 },
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
            ['$1.21$', 'Upside down: $\\dfrac{1.33 \\sin 40.1^\\circ}{\\sin 45.0^\\circ}$'],
            ['$1.49$', 'The **angles** divided, not their sines: $\\dfrac{1.33 \\times 45.0}{40.1}$'],
            ['$1.60$', 'Does not fit Snell’s law'],
            ['$1.46$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '1.21 has the sines the wrong way round. It is smaller than water\'s index, but the ray bent towards the normal, so the lower liquid must have the larger index.' },
        { say: '1.49 divides the angles themselves, 45.0 over 40.1, and not their sines. And 1.60 does not fit Snell\'s law at all: put any choice back into the law to check it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ray of light passes from air ($n = 1.00$) into a liquid. The angle of incidence is $50.0^\\circ$, and the angle of refraction is $35.0^\\circ$. What is the index of refraction of the liquid?',
          choices: ['0.749', '1.34', '1.43', '1.75'],
          answer: 1,
          working: '$n_2 = \\dfrac{1.00 \\sin 50.0^\\circ}{\\sin 35.0^\\circ} = \\dfrac{0.766}{0.574} = 1.34$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ray of light passes from air into a liquid. The angle of incidence is fifty degrees, and the angle of refraction is 35 degrees. What is the index of refraction of the liquid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The sine of fifty degrees is 0.766, and the sine of 35 degrees is 0.574. 0.766 divided by 0.574 is 1.34. That is choice B. 0.749 is upside down, and 1.43 divided the angles.', show: 'q2.answer' },
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
          items: ['Snell’s law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$', 'Measure angles from the **normal**', 'Use the **sines**, with the calculator in degrees', 'Bends towards the normal: the second $n$ is **larger**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Snell\'s law: n one sine theta one equals n two sine theta two.', show: 'sum.0' },
        { say: 'Measure every angle from the normal.', show: 'sum.1' },
        { say: 'Use the sines of the angles, with your calculator in degrees.', show: 'sum.2' },
        { say: 'And if the ray bends towards the normal, the second material has the larger index. For more on refraction and Snell\'s law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
