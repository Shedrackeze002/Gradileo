import type { Explainer, OpticsEl } from '@/video/script.ts';

// Lesson 3.2, second part: the mirror equation and the magnification. Each example is drawn to
// scale beside its working (src/video/optics.ts), so the image the numbers give is the image the
// rays find: real and upside down in front of the mirror, or virtual and upright behind it.

/** An object slides in front of a concave mirror of focal length 10 cm, and the readouts follow it. */
const mirror: OpticsEl = {
  kind: 'optics',
  id: 'eq',
  device: 'concave',
  f: 10,
  object: { at: 30, height: 3 },
  view: [42, 16],
  height: 320,
  clips: {
    a: { phases: [{ dur: 11 }] },
    slide: { phases: [{ dur: 4, to: 18 }, { dur: 2.5 }, { dur: 4.5, to: 30 }, { dur: 2 }] },
    c: { phases: [{ dur: 15 }] },
  },
};

/** The lesson's candle: 4.0 cm tall, 30 cm from a concave mirror of focal length 10 cm. */
const candle: OpticsEl = {
  kind: 'optics',
  id: 'c1',
  device: 'concave',
  f: 10,
  object: { at: 30, height: 4, label: 'Candle' },
  view: [40, 16],
  height: 330,
  poster: 'b',
  thumb: ['points', 'parallel', 'focal', 'image', 'values'],
  clips: { a: { phases: [{ dur: 13 }] }, b: { phases: [{ dur: 12.6 }] }, c: { phases: [{ dur: 9.5 }] }, d: { phases: [{ dur: 16.5 }] } },
};

/** The lesson's makeup mirror: a face 12 cm from a concave mirror of focal length 20 cm. */
const makeup: OpticsEl = {
  kind: 'optics',
  id: 'c2',
  device: 'concave',
  f: 20,
  object: { at: 12, height: 3, label: 'Face' },
  view: [30, 40],
  height: 330,
  clips: { a: { phases: [{ dur: 11 }] }, b: { phases: [{ dur: 14 }] }, c: { phases: [{ dur: 5.6 }] }, d: { phases: [{ dur: 15 }] } },
};

/** The lesson's security mirror: a shopper 30 cm from a convex mirror of focal length 15 cm. */
const security: OpticsEl = {
  kind: 'optics',
  id: 'c3',
  device: 'convex',
  f: 15,
  object: { at: 30, height: 6, label: 'Shopper' },
  view: [40, 30],
  height: 330,
  clips: { a: { phases: [{ dur: 12.6 }] }, b: { phases: [{ dur: 11.8 }] }, c: { phases: [{ dur: 9.5 }] } },
};

const video: Explainer = {
  id: 'p30-3-2-b',
  lessonId: 'p30-3-2',
  title: 'The Mirror Equation',
  thumbnail: 'c1',
  summary:
    'The mirror equation finds an image without a drawing, and the magnification gives its size. Work through a real image in a concave mirror, the virtual image of a makeup mirror and the small image of a convex security mirror, and learn what each sign tells you.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Mirror Equation', subtitle: 'Find the image with numbers instead of a drawing' }],
      lines: [
        { say: 'A ray diagram, drawn to scale, tells you where an image is and how big it is. But there is a faster way.', show: 'title' },
        { say: 'One equation gives the position of the image, and a second gives its size. No drawing is needed.' },
      ],
    },
    {
      chapter: 'The mirror equation',
      layout: 'center',
      main: [mirror, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}', 'm = \\dfrac{h_i}{h_o} = -\\dfrac{d_i}{d_o}'] }],
      lines: [
        { say: 'Here is the mirror equation. One over the focal length equals one over the object distance, plus one over the image distance.', caption: 'Here is the mirror equation: 1/f = 1/dₒ + 1/dᵢ. One over the focal length equals one over the object distance, plus one over the image distance.', show: ['eq', 'eq.points', 'eq.parallel', 'eq.focal', 'eq.image', 'm.0'], play: 'eq.a' },
        { say: 'Both distances are measured from the mirror. Slide the object, and the image distance changes to keep the equation true.', show: 'eq.values', play: 'eq.slide' },
        { say: 'The second equation is the magnification, m. It is the height of the image, divided by the height of the object. And it equals minus the image distance, over the object distance.', caption: 'The second equation is the magnification, m. It is the height of the image divided by the height of the object, and it equals −dᵢ ÷ dₒ.', show: 'm.1', play: 'eq.c' },
      ],
    },
    {
      chapter: 'What the signs mean',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Quantity', 'Positive', 'Negative'],
          rows: [
            ['Focal length $f$', 'Concave mirror', 'Convex mirror'],
            ['Image distance $d_i$', 'Real image, in front of the mirror', 'Virtual image, behind the mirror'],
            ['Magnification $m$', 'Upright image', 'Upside-down image'],
          ],
        },
      ],
      lines: [
        { say: 'The signs carry the description of the image. The focal length is positive for a concave mirror, and negative for a convex mirror.', show: 't.0' },
        { say: 'A positive image distance means a real image, in front of the mirror. A negative one means a virtual image, behind it.', show: 't.1' },
        { say: 'And a positive magnification means an upright image. A negative one means the image is upside down.', show: 't.2' },
      ],
    },
    {
      chapter: 'A real image',
      layout: 'center',
      main: [
        candle,
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: [
            '\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o} = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30} \\quad\\Rightarrow\\quad d_i = \\brand{15\\ \\text{cm}}',
            'm = -\\dfrac{d_i}{d_o} = -\\dfrac{15}{30} = -0.50 \\qquad h_i = m\\,h_o = -0.50 \\times 4.0 = \\brand{-2.0\\ \\text{cm}}',
          ],
        },
      ],
      lines: [
        { say: 'A candle 4.0 centimetres tall stands 30 centimetres from a concave mirror. The focal length is 10 centimetres. Where is the image, and how tall is it?', caption: 'A candle 4.0 cm tall stands 30 cm from a concave mirror. The focal length is 10 cm. Where is the image, and how tall is it?', show: ['c1', 'c1.points'], play: 'c1.a' },
        { say: 'Rearrange the equation. One over the image distance is one tenth, minus one thirtieth, which is two thirtieths. Now turn it over. The image distance is 15 centimetres.', caption: 'Rearrange the equation. 1/dᵢ = 1/10 − 1/30, which is 2/30. Now turn it over: dᵢ = 15 cm.', show: ['a.0', 'c1.parallel', 'c1.focal', 'c1.image'], play: 'c1.b' },
        { say: 'The magnification is minus 15 over 30, which is minus 0.50. So the height of the image is minus 2.0 centimetres.', caption: 'The magnification is −15 ÷ 30, which is −0.50. So the height of the image is −2.0 cm.', show: ['a.1', 'c1.values'], play: 'c1.c' },
        { say: 'Now read the signs. The image distance is positive, so the image is real, in front of the mirror. The magnification is negative, so it is upside down. And it is half as tall as the candle.', show: 'c1.kind', play: 'c1.d' },
      ],
    },
    {
      chapter: 'A magnifying mirror',
      layout: 'center',
      main: [
        makeup,
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          lines: ['\\dfrac{1}{d_i} = \\dfrac{1}{20} - \\dfrac{1}{12} = \\dfrac{3}{60} - \\dfrac{5}{60} = -\\dfrac{2}{60} \\quad\\Rightarrow\\quad d_i = \\brand{-30\\ \\text{cm}}', 'm = -\\dfrac{d_i}{d_o} = -\\dfrac{-30}{12} = \\brand{+2.5}'],
        },
      ],
      lines: [
        { say: 'A makeup mirror is concave, with a focal length of 20 centimetres. A face is 12 centimetres from it, which is inside the focus.', caption: 'A makeup mirror is concave, with a focal length of 20 cm. A face is 12 cm from it, which is inside the focus.', show: ['c2', 'c2.points'], play: 'c2.a' },
        { say: 'One over the image distance is one twentieth, minus one twelfth. That is three sixtieths minus five sixtieths, which is minus two sixtieths. So the image distance is minus 30 centimetres.', caption: '1/dᵢ = 1/20 − 1/12. That is 3/60 − 5/60, which is −2/60. So dᵢ = −30 cm.', show: ['b.0', 'c2.parallel', 'c2.focal', 'c2.image'], play: 'c2.b' },
        { say: 'The magnification is minus, minus 30 over 12, which is plus 2.5.', caption: 'The magnification is −(−30) ÷ 12, which is +2.5.', show: ['b.1', 'c2.values'], play: 'c2.c' },
        { say: 'The negative image distance means a virtual image, 30 centimetres behind the mirror. The positive magnification means it is upright. And it is two and a half times as large as the face.', caption: 'The negative image distance means a virtual image, 30 cm behind the mirror. The positive magnification means it is upright. And it is 2.5 times as large as the face.', show: 'c2.kind', play: 'c2.d' },
      ],
    },
    {
      chapter: 'A convex mirror',
      layout: 'center',
      main: [
        security,
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: ['\\dfrac{1}{d_i} = \\dfrac{1}{-15} - \\dfrac{1}{30} = -\\dfrac{2}{30} - \\dfrac{1}{30} = -\\dfrac{3}{30} \\quad\\Rightarrow\\quad d_i = \\brand{-10\\ \\text{cm}}', 'm = -\\dfrac{d_i}{d_o} = -\\dfrac{-10}{30} = \\brand{+0.33}'],
        },
      ],
      lines: [
        { say: 'A security mirror is convex, with a focal length of 15 centimetres. A shopper stands 30 centimetres from it. The mirror is convex, so f is minus 15.', caption: 'A security mirror is convex, with a focal length of 15 cm. A shopper stands 30 cm from it. The mirror is convex, so f = −15 cm.', show: ['c3', 'c3.points'], play: 'c3.a' },
        { say: 'One over the image distance is one over minus 15, minus one thirtieth. That is minus three thirtieths, so the image distance is minus 10 centimetres.', caption: '1/dᵢ = 1/(−15) − 1/30. That is −3/30, so dᵢ = −10 cm.', show: ['c.0', 'c3.parallel', 'c3.focal', 'c3.image'], play: 'c3.b' },
        { say: 'The magnification is plus 0.33. So the image is virtual, upright, and one third of the size of the shopper.', caption: 'The magnification is +0.33. So the image is virtual, upright, and one third of the size of the shopper.', show: ['c.1', 'c3.values', 'c3.kind'], play: 'c3.c' },
      ],
    },
    {
      chapter: 'Two traps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'trap',
          items: ['The equation adds $\\tfrac{1}{d_o}$ and $\\tfrac{1}{d_i}$, not $d_o$ and $d_i$: **turn the answer over** at the end', 'A convex mirror has a **negative** focal length'],
        },
      ],
      lines: [
        { say: 'Two mistakes are common. First, the equation adds one over each distance, not the distances themselves. So when you have found one over the image distance, remember to turn it over.', show: 'trap.0' },
        { say: 'Second, a convex mirror has a negative focal length. Leave out the minus sign, and you have described a concave mirror instead.', show: 'trap.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An object is 36 cm from a concave mirror of focal length 12 cm. Where is its image, and what is the magnification?',
          choices: ['18 cm in front of the mirror, $m = -0.50$', '18 cm behind the mirror, $m = +0.50$', '24 cm in front of the mirror, $m = -0.67$', '9.0 cm in front of the mirror, $m = -0.25$'],
          answer: 0,
          working: '$\\tfrac{1}{d_i} = \\tfrac{1}{12} - \\tfrac{1}{36} = \\tfrac{2}{36}$, so $d_i = 18$ cm: a real image, in front of the mirror. Then $m = -\\tfrac{18}{36} = -0.50$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object is 36 centimetres from a concave mirror of focal length 12 centimetres. Where is its image, and what is the magnification? Pause the video and work it out.', caption: 'Your turn. An object is 36 cm from a concave mirror of focal length 12 cm. Where is its image, and what is the magnification? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'One over the image distance is one twelfth, minus one thirty-sixth, which is two thirty-sixths. So the image is 18 centimetres in front of the mirror. The magnification is minus 18 over 36, which is minus 0.50. That is choice "A".', caption: '1/dᵢ = 1/12 − 1/36, which is 2/36. So the image is 18 cm in front of the mirror. The magnification is −18 ÷ 36, which is −0.50. That is choice A.', show: 'q.answer' },
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
          items: [
            'The mirror equation: $\\tfrac{1}{f} = \\tfrac{1}{d_o} + \\tfrac{1}{d_i}$',
            'The magnification: $m = \\tfrac{h_i}{h_o} = -\\tfrac{d_i}{d_o}$',
            'Negative $f$: a **convex** mirror',
            'Negative $d_i$: a **virtual** image, behind the mirror',
            'Negative $m$: an **upside-down** image',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The mirror equation: one over f equals one over the object distance, plus one over the image distance.', caption: 'Here is what to remember. The mirror equation: 1/f = 1/dₒ + 1/dᵢ.', show: 'sum.0' },
        { say: 'The magnification is the height of the image over the height of the object, and it equals minus the image distance over the object distance.', caption: 'The magnification is hᵢ ÷ hₒ, and it equals −dᵢ ÷ dₒ.', show: 'sum.1' },
        { say: 'A negative focal length means a convex mirror.', show: 'sum.2' },
        { say: 'A negative image distance means a virtual image, behind the mirror.', show: 'sum.3' },
        { say: 'And a negative magnification means the image is upside down.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
