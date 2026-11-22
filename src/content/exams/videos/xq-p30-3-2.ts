import type { Explainer, OpticsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.2 (rays and images in mirrors): a concave mirror of focal
// length 5.00 cm, and an object 7.00 cm from it; where is the image? The question is OpenStax
// Physics' own, word for word, with its four choices (a Problem for section 16.1, CC BY 4.0).
// 1/dᵢ = 1/f − 1/dₒ = 1/5 − 1/7 = 2/35, so dᵢ = 17.5 cm (choice d): a real image in front of the
// mirror. 2.92 cm adds the fractions, and the negative choices get a sign wrong.
//
// The picture (src/video/optics.ts) is the mirror with its focus and centre of curvature: the rays
// from the top of the object meet where the mirror equation puts the image, 17.5 cm out, upside
// down and 2.5 times as tall.

const mirror: OpticsEl = {
  kind: 'optics',
  id: 'sim',
  device: 'concave',
  f: 5,
  object: { at: 7, height: 1.2, label: 'Object' },
  view: [21, 7],
  figures: 3,
  height: 330,
  poster: 'b',
  thumb: ['points', 'parallel', 'focal', 'image', 'values'],
  clips: { a: { phases: [{ dur: 6 }] }, b: { phases: [{ dur: 10 }] }, c: { phases: [{ dur: 8 }] } },
};

const QUESTION = 'A concave mirror has a focal length of 5.00 cm. What is the image distance of an object placed 7.00 cm from the center of the mirror?';
const CHOICES = ['–17.5 cm', '–2.92 cm', '2.92 cm', '17.5 cm'];

const video: Explainer = {
  id: 'xq-p30-3-2',
  lessonId: '',
  exam: {
    lesson: 'p30-3-2',
    source: 'OpenStax, Physics, Problem for section 16.1, Reflection',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/16-1-reflection',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Where Is the Image in a Concave Mirror? The Mirror Equation',
  thumbnailTitle: 'Find the Image',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an object stands 7.00 cm from a concave mirror whose focal length is 5.00 cm, and we find where the image forms. We use the mirror equation, 1/f = 1/dₒ + 1/dᵢ, take away the fractions carefully and turn the answer over. Then we draw the rays to check where they meet, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Image', subtitle: 'Images in a concave mirror, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about where a concave mirror forms an image. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$-17.5$ cm', '$-2.92$ cm', '$2.92$ cm', '$17.5$ cm'],
          answer: 3,
          working: '$\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o} = \\dfrac{1}{5.00} - \\dfrac{1}{7.00} = \\dfrac{2}{35}$, so $d_i = 17.5$ cm.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A concave mirror has a focal length of 5.00 centimetres. What is the image distance of an object placed 7.00 centimetres from the center of the mirror?' },
        { say: 'The choices are minus 17.5, minus 2.92, plus 2.92, and plus 17.5 centimetres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [mirror, { kind: 'text', id: 'plain', size: 'md', md: 'How far from the mirror does the **image** form?' }],
      lines: [
        { say: 'Let us picture it. Here is a concave mirror, curved like the inside of a spoon. F is its focus, 5.00 centimetres out, and C is its centre of curvature, twice as far.', show: ['sim', 'sim.points'], play: 'sim.a' },
        { say: 'The object stands 7.00 centimetres from the middle of the mirror, between F and C. The question asks how far from the mirror its image forms.', show: 'plain' },
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
          title: 'The mirror equation',
          md: '$\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}$, with distances measured from the mirror. For a **concave** mirror $f$ is positive. A **positive** $d_i$ is a real image in front of the mirror; a **negative** $d_i$ is a virtual image behind it.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$f = 10$ cm, $d_o = 30$ cm: $\\dfrac{1}{d_i} = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30}$, so $d_i = 15$ cm.' },
      ],
      lines: [
        { say: 'Here is what we need. The mirror equation: one over the focal length equals one over the object distance, plus one over the image distance. All the distances are measured from the mirror.', show: 'def' },
        { say: 'A concave mirror has a positive focal length. A positive image distance means a real image, in front of the mirror. A negative one means a virtual image, behind it.' },
        { say: 'For example, with a focal length of ten centimetres and an object thirty centimetres away, the image is fifteen centimetres in front of the mirror.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Rearrange for $\\dfrac{1}{d_i}$', 'Take the fractions away over a **common denominator**', 'Turn the answer **over** to get $d_i$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, rearrange the equation for one over the image distance.', show: 'plan.0' },
        { say: 'Second, take one fraction from the other, over a common denominator.', show: 'plan.1' },
        { say: 'Third, turn the answer over, because we have one over the image distance, not the distance itself.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}', '\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o}'] }],
      lines: [
        { say: 'Step one. Start from the mirror equation.', show: 'm.0' },
        { say: 'Take one over the object distance from both sides. One over the image distance is one over f, minus one over the object distance. It is a minus, not a plus.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{d_i} = \\dfrac{1}{5.00} - \\dfrac{1}{7.00}', '= \\dfrac{7}{35} - \\dfrac{5}{35} = \\adj{\\dfrac{2}{35}}'] }],
      lines: [
        { say: 'Step two. Put in the focal length, 5.00, and the object distance, 7.00.', show: 'm.0' },
        { say: 'Over a common denominator of 35, one fifth is seven thirty-fifths and one seventh is five thirty-fifths. Seven minus five is two, so one over the image distance is two thirty-fifths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Turn it over',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d_i = \\dfrac{35}{2} = \\good{17.5\\ \\text{cm}}'] }],
      lines: [
        { say: 'Step three. Turn two thirty-fifths over: 35 over two is 17.5. The image is 17.5 centimetres from the mirror. That is choice D.', show: 'm.0', focus: 'm.0' },
        { say: 'It is positive, so the image is real, in front of the mirror, where it could be caught on a screen.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [mirror, { kind: 'math', id: 'm', size: 'md', lines: ['m = -\\dfrac{d_i}{d_o} = -\\dfrac{17.5}{7.00} = -2.5'] }],
      lines: [
        { say: 'Let us check it with rays. A ray from the top of the object, parallel to the axis, reflects through the focus. A ray through the focus reflects back parallel.', show: ['sim', 'sim.points', 'sim.parallel', 'sim.focal'], play: 'sim.b' },
        { say: 'The two rays meet 17.5 centimetres from the mirror. That is where the image is: real, upside down, and two and a half times as tall as the object.', show: ['sim.image', 'sim.values', 'm.0'], play: 'sim.c' },
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
            ['$2.92$ cm', 'The fractions **added**: $\\dfrac{1}{5} + \\dfrac{1}{7} = \\dfrac{12}{35}$'],
            ['$-17.5$ cm', 'Taken away the wrong way round: $\\dfrac{1}{7} - \\dfrac{1}{5}$'],
            ['$-2.92$ cm', 'Both mistakes'],
            ['$17.5$ cm', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '2.92 centimetres comes from adding the fractions instead of taking one away. An image closer than the focus would need an object very far away, so it cannot be right.' },
        { say: 'Minus 17.5 takes the fractions away the wrong way round. It would mean a virtual image behind the mirror, but an object beyond the focus of a concave mirror always gives a real image.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A concave mirror has a focal length of 10.0 cm. An object stands 15.0 cm in front of it. How far from the mirror is the image?',
          choices: ['30.0 cm', '6.00 cm', '−30.0 cm', '25.0 cm'],
          answer: 0,
          working: '$\\dfrac{1}{d_i} = \\dfrac{1}{10.0} - \\dfrac{1}{15.0} = \\dfrac{3 - 2}{30} = \\dfrac{1}{30}$, so $d_i = 30.0$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A concave mirror has a focal length of 10.0 centimetres. An object stands 15.0 centimetres in front of it. How far from the mirror is the image? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'One tenth minus one fifteenth is three thirtieths minus two thirtieths: one thirtieth. Turned over, the image is 30.0 centimetres from the mirror. That is choice A. 6.00 added the fractions, and minus 30.0 took them away the wrong way round.', show: 'q2.answer' },
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
          items: ['Mirror equation: $\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}$', '$\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o}$: take away, then **turn over**', 'Positive $d_i$: real, in front of the mirror', 'Check with two rays from the top of the object'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The mirror equation: one over the focal length equals one over the object distance, plus one over the image distance.', show: 'sum.0' },
        { say: 'To find the image, take one over the object distance from one over the focal length, and then turn the answer over.', show: 'sum.1' },
        { say: 'A positive image distance is a real image, in front of the mirror.', show: 'sum.2' },
        { say: 'And you can always check with two rays from the top of the object. For more on rays and images in mirrors, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
