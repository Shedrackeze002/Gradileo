import type { Explainer, OpticsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.4 (thin lenses): a lens makes a 5.00 cm tall image of an
// 8.00 cm high object 10.0 cm away; what is the apparent image distance? The question is OpenStax
// Physics' own, word for word, with its four choices (a Problem for section 16.3, CC BY 4.0).
// "Apparent" means a virtual image, seen through the lens, which a single lens makes upright, so
// m = hᵢ ÷ hₒ = +0.625 and dᵢ = −m dₒ = −6.25 cm (choice b). Then 1/f = 1/10 − 1/6.25 gives
// f = −16.7 cm: a diverging lens, the only kind that makes an upright image smaller than the object.
//
// The picture (src/video/optics.ts) is that diverging lens with the object 10.0 cm in front: the
// rays from the top of the object spread out as if from a point 6.25 cm in front of the lens. The
// object is drawn shorter than 8 cm so the rays fit; the image is still 0.625 times its height.

const lens: OpticsEl = {
  kind: 'optics',
  id: 'sim',
  device: 'diverging',
  f: 50 / 3,
  object: { at: 10, height: 2, label: 'Object' },
  view: [19, 7],
  figures: 3,
  height: 400,
  poster: 'b',
  thumb: ['points', 'parallel', 'central', 'image', 'values'],
  clips: { a: { phases: [{ dur: 6 }] }, b: { phases: [{ dur: 10 }] }, c: { phases: [{ dur: 8 }] } },
};

const QUESTION =
  'If a lens produces a 5.00-cm tall image of an 8.00-cm-high object when placed 10.0 cm from the lens, what is the apparent image distance? (Construct a ray diagram using paper, a pencil, and a ruler to confirm your calculation.)';
const CHOICES = ['–3.12 cm', '–6.25 cm', '3.12 cm', '6.25 cm'];

const video: Explainer = {
  id: 'xq-p30-3-4',
  lessonId: '',
  exam: {
    lesson: 'p30-3-4',
    source: 'OpenStax, Physics, Problem for section 16.3, Lenses',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/16-3-lenses',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Where Is the Image Through a Lens? Magnification and Image Distance',
  thumbnailTitle: 'Image Through a Lens',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a lens makes a 5.00 cm image of an 8.00 cm object that is 10.0 cm away, and we find how far away the image appears. We work out the magnification from the two heights, use it to find the image distance and decide its sign, then draw the rays through the lens to check. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Image Through a Lens', subtitle: 'Magnification and image distance, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the image a lens makes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$-3.12$ cm', '$-6.25$ cm', '$3.12$ cm', '$6.25$ cm'],
          answer: 1,
          working: '$m = \\dfrac{h_i}{h_o} = \\dfrac{5.00}{8.00} = 0.625$, so $d_i = -m\\,d_o = -0.625 \\times 10.0 = -6.25$ cm.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If a lens produces a 5.00 centimetre tall image of an 8.00 centimetre high object when placed 10.0 centimetres from the lens, what is the apparent image distance? It also asks us to draw a ray diagram to confirm the answer.' },
        { say: 'The choices are minus 3.12, minus 6.25, plus 3.12, and plus 6.25 centimetres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [lens, { kind: 'text', id: 'plain', size: 'md', md: 'An object 10.0 cm from a lens, and an image **smaller** than it. How far from the lens does the image **appear** to be?' }],
      lines: [
        { say: 'Let us picture it. Here is a lens, with an object standing 10.0 centimetres in front of it.', show: ['sim', 'sim.points'], play: 'sim.a' },
        { say: 'The lens makes an image of it that is smaller: 5.00 centimetres tall instead of 8.00. The question asks how far from the lens that image appears to be.', show: 'plain' },
        { say: 'The word apparent is a clue. It means the image is one you see by looking through the lens, not one you could catch on a screen. That is a virtual image.' },
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
          title: 'Magnification',
          md: '$m = \\dfrac{h_i}{h_o} = -\\dfrac{d_i}{d_o}$. A **virtual** image from one lens is **upright**, so $h_i$ and $m$ are positive, and $d_i$ is **negative**: the image is on the same side as the object.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$h_o = 4$ cm, $h_i = 2$ cm, $d_o = 6$ cm: $m = 0.5$, so $d_i = -0.5 \\times 6 = -3$ cm.' },
      ],
      lines: [
        { say: 'Here is what we need. The magnification is the image height over the object height. It is also minus the image distance over the object distance.', show: 'def' },
        { say: 'A virtual image from a single lens is upright, so its height and the magnification are positive. Then the minus sign makes the image distance negative, which means the image is on the same side of the lens as the object.' },
        { say: 'For example, a 2 centimetre upright image of a 4 centimetre object 6 centimetres away has a magnification of one half, so the image distance is minus 3 centimetres.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the magnification from the two **heights**', 'Use $d_i = -m\\,d_o$ to find the image distance', 'Read the **sign**: which side of the lens is it on?'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the magnification from the two heights.', show: 'plan.0' },
        { say: 'Second, use the magnification and the object distance to find the image distance.', show: 'plan.1' },
        { say: 'Third, read the sign of the answer, to see which side of the lens the image is on.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The magnification',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m = \\dfrac{h_i}{h_o} = \\dfrac{5.00}{8.00}', '= \\adj{0.625}'] }],
      lines: [
        { say: 'Step one. The image is upright, because it is a virtual image, so both heights are positive. Divide the image height, 5.00, by the object height, 8.00.', show: 'm.0' },
        { say: 'The magnification is 0.625. It is positive, because the image is upright, and less than one, because the image is smaller.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The image distance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m = -\\dfrac{d_i}{d_o} \\quad\\Rightarrow\\quad d_i = -m\\,d_o', 'd_i = -0.625 \\times 10.0 = \\good{-6.25\\ \\text{cm}}'] }],
      lines: [
        { say: 'Step two. The magnification is also minus the image distance over the object distance. Multiply both sides by the object distance: the image distance is minus the magnification times the object distance.', show: 'm.0' },
        { say: 'Minus 0.625 times 10.0 is minus 6.25. The image distance is minus 6.25 centimetres. That is choice B.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Read the sign',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$d_i = -6.25$ cm: the image is **6.25 cm in front** of the lens, on the object\'s side. It is **virtual**, so you see it by looking through the lens.' }],
      lines: [
        { say: 'Step three. The minus sign means the image is on the same side of the lens as the object, 6.25 centimetres in front of it.', show: 't' },
        { say: 'Light does not really meet there. The rays only seem to come from that point, which is why the question calls it the apparent image distance.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [lens, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{f} = \\dfrac{1}{10.0} + \\dfrac{1}{-6.25} \\quad\\Rightarrow\\quad f = -16.7\\ \\text{cm}'] }],
      lines: [
        { say: 'Let us check with the ray diagram the question asks for. Put the numbers in the lens equation, and the focal length comes out as minus 16.7 centimetres. A negative focal length is a diverging lens.', show: ['sim', 'sim.points', 'm.0'] },
        { say: 'A ray from the top of the object, parallel to the axis, spreads out as if it came from the focus on the object\'s side. A ray through the centre of the lens goes straight on.', show: ['sim.parallel', 'sim.central'], play: 'sim.b' },
        { say: 'Traced back, the two rays meet 6.25 centimetres in front of the lens. That is the image: upright, and 0.625 times as tall as the object. The object is drawn shorter here so the rays fit, but the image is the same fraction of it.', show: ['sim.image', 'sim.values'], play: 'sim.c' },
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
            ['$6.25$ cm', 'The **minus sign** dropped: a real image beyond the lens, which is not an apparent one'],
            ['$-3.12$ cm', 'Half the right size: an arithmetic slip, such as $\\dfrac{5.00}{16.0}$ instead of $\\dfrac{5.00}{8.00}$'],
            ['$3.12$ cm', 'Both mistakes'],
            ['$-6.25$ cm', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Plus 6.25 drops the minus sign. That would be a real image on the far side of the lens, which you could catch on a screen, so it is not an apparent image.' },
        { say: 'Minus 3.12 is exactly half the right answer, which comes from a slip in the arithmetic, such as dividing by 16 instead of 8. Plus 3.12 makes both mistakes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A lens makes an upright, 3.00 cm tall image of a 12.0 cm high object that is 20.0 cm from the lens. What is the image distance?',
          choices: ['5.00 cm', '−5.00 cm', '−80.0 cm', '−15.0 cm'],
          answer: 1,
          working: '$m = \\dfrac{3.00}{12.0} = 0.250$, so $d_i = -0.250 \\times 20.0 = -5.00$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A lens makes an upright, 3.00 centimetre tall image of a 12.0 centimetre high object that is 20.0 centimetres from the lens. What is the image distance? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The magnification is 3.00 over 12.0, which is 0.250. Minus 0.250 times 20.0 is minus 5.00 centimetres. That is choice B. Plus 5.00 dropped the minus sign, and minus 80.0 divided the heights the wrong way round.', show: 'q2.answer' },
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
          items: ['Magnification: $m = \\dfrac{h_i}{h_o} = -\\dfrac{d_i}{d_o}$', 'Image distance: $d_i = -m\\,d_o$', 'Virtual image: upright, $m$ positive, $d_i$ **negative**', 'An upright image **smaller** than the object: a diverging lens'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The magnification is the image height over the object height, and also minus the image distance over the object distance.', show: 'sum.0' },
        { say: 'So the image distance is minus the magnification times the object distance.', show: 'sum.1' },
        { say: 'A virtual image is upright, with a positive magnification and a negative image distance, on the same side as the object.', show: 'sum.2' },
        { say: 'And an upright image that is smaller than the object always comes from a diverging lens. For more on thin lenses, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
