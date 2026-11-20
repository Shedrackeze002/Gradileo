import type { Explainer, OpticsEl } from '@/video/script.ts';

// Lesson 3.4, second part: the thin lens equation and the magnification. Each example is drawn to
// scale beside its working (src/video/optics.ts), so the image the numbers give is the image the
// rays find: real and upside down beyond the lens, or virtual and upright on the object's side.

/** An object slides in front of a converging lens of focal length 10 cm, and the readouts follow it. */
const lens: OpticsEl = {
  kind: 'optics',
  id: 'eq',
  device: 'converging',
  f: 10,
  object: { at: 30, height: 3 },
  view: [36, 28],
  height: 320,
  clips: {
    a: { phases: [{ dur: 13.5 }] },
    b: { phases: [{ dur: 13.5 }] },
    slide: { phases: [{ dur: 4, to: 18 }, { dur: 3 }, { dur: 4.5, to: 30 }, { dur: 2.8 }] },
  },
};

/** The lesson's magnifying glass: a stamp 6.0 cm from a converging lens of focal length 10 cm. */
const glass: OpticsEl = {
  kind: 'optics',
  id: 'c1',
  device: 'converging',
  f: 10,
  object: { at: 6, height: 2.4, label: 'Stamp' },
  view: [26, 22],
  axis: 0.57,
  height: 330,
  poster: 'b',
  thumb: ['points', 'parallel', 'central', 'image', 'values'],
  clips: { a: { phases: [{ dur: 10.4 }] }, b: { phases: [{ dur: 14.4 }] }, c: { phases: [{ dur: 5.6 }] }, d: { phases: [{ dur: 17 }] } },
};

/** The lesson's diverging lens: an object 30 cm from a lens of focal length 20 cm. */
const diverging: OpticsEl = {
  kind: 'optics',
  id: 'c2',
  device: 'diverging',
  f: 20,
  object: { at: 30, height: 6 },
  view: [44, 26],
  height: 330,
  clips: { a: { phases: [{ dur: 10.4 }] }, b: { phases: [{ dur: 11.7 }] }, c: { phases: [{ dur: 9.5 }] } },
};

/** The lesson's projector: a slide 50 cm from a lens of focal length 40 cm, and a screen 200 cm beyond it. */
const projector: OpticsEl = {
  kind: 'optics',
  id: 'c3',
  device: 'converging',
  f: 40,
  object: { at: 50, height: 8, label: 'Slide' },
  view: [70, 215],
  aperture: 24,
  height: 330,
  clips: { a: { phases: [{ dur: 16.5 }] }, b: { phases: [{ dur: 14.3 }] }, c: { phases: [{ dur: 10.9 }] }, d: { phases: [{ dur: 9 }] } },
};

const video: Explainer = {
  id: 'p30-3-4-b',
  lessonId: 'p30-3-4',
  title: 'The Thin Lens Equation',
  thumbnail: 'c1',
  summary:
    'The thin lens equation finds an image without a drawing, and the magnification gives its size. Work through a magnifying glass, a diverging lens and a projector, and learn what the sign of each answer tells you.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Thin Lens Equation', subtitle: 'Find the image with numbers instead of a drawing' }],
      lines: [
        { say: 'Three rays, drawn to scale, find the image that a lens forms. But there is a faster way.', show: 'title' },
        { say: 'The equation that worked for mirrors works for lenses too. Only the meaning of the signs changes a little.' },
      ],
    },
    {
      chapter: 'The thin lens equation',
      layout: 'center',
      main: [lens, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}', 'm = \\dfrac{h_i}{h_o} = -\\dfrac{d_i}{d_o}'] }],
      lines: [
        { say: 'Here is the thin lens equation. One over the focal length equals one over the object distance, plus one over the image distance. Both distances are measured from the lens.', caption: 'Here is the thin lens equation: 1/f = 1/dₒ + 1/dᵢ. One over the focal length equals one over the object distance, plus one over the image distance. Both distances are measured from the lens.', show: ['eq', 'eq.points', 'eq.parallel', 'eq.central', 'eq.image', 'm.0'], play: 'eq.a' },
        { say: 'This lens has a focal length of 10 centimetres. With the object 30 centimetres away, the equation puts the image 15 centimetres beyond the lens, just where the rays meet.', caption: 'This lens has a focal length of 10 cm. With the object 30 cm away, the equation puts the image 15 cm beyond the lens, just where the rays meet.', show: 'eq.values', play: 'eq.b' },
        { say: 'The magnification is the same as before, too. It is the height of the image over the height of the object, and it equals minus the image distance, over the object distance.', caption: 'The magnification is the same as before, too. It is hᵢ ÷ hₒ, and it equals −dᵢ ÷ dₒ.', show: 'm.1', play: 'eq.slide' },
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
            ['Focal length $f$', 'Converging lens', 'Diverging lens'],
            ['Image distance $d_i$', 'Real image, on the far side of the lens', "Virtual image, on the object's side"],
            ['Magnification $m$', 'Upright image', 'Upside-down image'],
          ],
        },
      ],
      lines: [
        { say: 'The signs describe the image. The focal length is positive for a converging lens, and negative for a diverging lens.', show: 't.0' },
        { say: 'A positive image distance means a real image, on the far side of the lens. A negative one means a virtual image, on the same side as the object.', show: 't.1' },
        { say: 'And a positive magnification means an upright image, while a negative one means that it is upside down.', show: 't.2' },
      ],
    },
    {
      chapter: 'A magnifying glass',
      layout: 'center',
      main: [
        glass,
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: ['\\dfrac{1}{d_i} = \\dfrac{1}{10} - \\dfrac{1}{6.0} = \\dfrac{3}{30} - \\dfrac{5}{30} = -\\dfrac{2}{30} \\quad\\Rightarrow\\quad d_i = \\brand{-15\\ \\text{cm}}', 'm = -\\dfrac{d_i}{d_o} = -\\dfrac{-15}{6.0} = \\brand{+2.5}'],
        },
      ],
      lines: [
        { say: 'A stamp is 6.0 centimetres from a magnifying glass, a converging lens of focal length 10 centimetres. The stamp is inside the focus.', caption: 'A stamp is 6.0 cm from a magnifying glass, a converging lens of focal length 10 cm. The stamp is inside the focus.', show: ['c1', 'c1.points'], play: 'c1.a' },
        { say: 'One over the image distance is one tenth, minus one over 6.0. That is three thirtieths minus five thirtieths, which is minus two thirtieths. So the image distance is minus 15 centimetres.', caption: '1/dᵢ = 1/10 − 1/6.0. That is 3/30 − 5/30, which is −2/30. So dᵢ = −15 cm.', show: ['a.0', 'c1.parallel', 'c1.central', 'c1.image'], play: 'c1.b' },
        { say: 'The magnification is minus, minus 15 over 6.0, which is plus 2.5.', caption: 'The magnification is −(−15) ÷ 6.0, which is +2.5.', show: ['a.1', 'c1.values'], play: 'c1.c' },
        { say: 'The negative image distance means a virtual image, 15 centimetres from the lens, on the same side as the stamp. The positive magnification means that it is upright. And it is two and a half times as large.', caption: 'The negative image distance means a virtual image, 15 cm from the lens, on the same side as the stamp. The positive magnification means that it is upright. And it is 2.5 times as large.', show: 'c1.kind', play: 'c1.d' },
      ],
    },
    {
      chapter: 'A diverging lens',
      layout: 'center',
      main: [
        diverging,
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          lines: ['\\dfrac{1}{d_i} = \\dfrac{1}{-20} - \\dfrac{1}{30} = -\\dfrac{3}{60} - \\dfrac{2}{60} = -\\dfrac{5}{60} \\quad\\Rightarrow\\quad d_i = \\brand{-12\\ \\text{cm}}', 'm = -\\dfrac{d_i}{d_o} = -\\dfrac{-12}{30} = \\brand{+0.40}'],
        },
      ],
      lines: [
        { say: 'An object is 30 centimetres from a diverging lens of focal length 20 centimetres. The lens is diverging, so f is minus 20.', caption: 'An object is 30 cm from a diverging lens of focal length 20 cm. The lens is diverging, so f = −20 cm.', show: ['c2', 'c2.points'], play: 'c2.a' },
        { say: 'One over the image distance is one over minus 20, minus one thirtieth. That is minus five sixtieths, so the image distance is minus 12 centimetres.', caption: '1/dᵢ = 1/(−20) − 1/30. That is −5/60, so dᵢ = −12 cm.', show: ['b.0', 'c2.parallel', 'c2.central', 'c2.image'], play: 'c2.b' },
        { say: 'The magnification is plus 0.40. So the image is virtual, upright, and 0.40 times the size of the object.', caption: 'The magnification is +0.40. So the image is virtual, upright, and 0.40 times the size of the object.', show: ['b.1', 'c2.values', 'c2.kind'], play: 'c2.c' },
      ],
    },
    {
      chapter: 'A projector',
      layout: 'center',
      main: [
        projector,
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: ['m = -4.0 \\quad\\Rightarrow\\quad d_o = -\\dfrac{d_i}{m} = \\dfrac{200}{4.0} = \\good{50\\ \\text{cm}}', '\\dfrac{1}{f} = \\dfrac{1}{50} + \\dfrac{1}{200} = \\dfrac{5}{200} \\quad\\Rightarrow\\quad f = \\good{40\\ \\text{cm}}'],
        },
      ],
      lines: [
        { say: 'The equations work backwards too. A projector forms a sharp picture on a screen, 200 centimetres from its lens. The picture is 4.0 times as large as the slide. How far is the slide from the lens?', caption: 'The equations work backwards too. A projector forms a sharp picture on a screen, 200 cm from its lens. The picture is 4.0 times as large as the slide. How far is the slide from the lens?', show: ['c3', 'c3.points', 'c3.parallel', 'c3.central', 'c3.image'], play: 'c3.a' },
        { say: 'A picture on a screen is a real image, so it is upside down, and the magnification is minus 4.0. The object distance is then 200 over 4.0, which is 50 centimetres.', caption: 'A picture on a screen is a real image, so it is upside down, and m = −4.0. The object distance is then 200 ÷ 4.0, which is 50 cm.', show: 'c.0', play: 'c3.b' },
        { say: 'Now find the lens. One over f is one fiftieth, plus one two-hundredth, which is five two-hundredths. So the focal length is 40 centimetres.', caption: 'Now find the lens. 1/f = 1/50 + 1/200, which is 5/200. So f = 40 cm.', show: ['c.1', 'c3.values'], play: 'c3.c' },
        { say: 'The slide sits between the focus and twice the focal length, as it must for a large, real image.', play: 'c3.d' },
      ],
    },
    {
      chapter: 'Two traps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'trap',
          items: ['Put $f$, $d_o$ and $d_i$ in the **same unit** before taking any reciprocals', 'A diverging lens has a **negative** focal length, and its image distance is always negative too'],
        },
      ],
      lines: [
        { say: 'Two mistakes are common. First, mixed units. A camera lens may have a focal length of 50 millimetres, and a subject 2 metres away. Change the 2 metres into 2,000 millimetres before you take any reciprocals.', caption: 'Two mistakes are common. First, mixed units. A camera lens may have a focal length of 50 mm, and a subject 2 m away. Change the 2 m into 2000 mm before you take any reciprocals.', show: 'trap.0' },
        { say: 'Second, a diverging lens has a negative focal length, like a convex mirror. Its image is always virtual, so its image distance always comes out negative as well.', show: 'trap.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An object is 20 cm from a diverging lens of focal length 20 cm. Where is its image, and what is the magnification?',
          choices: ["10 cm from the lens, on the object's side; $m = +0.50$", '10 cm from the lens, on the far side; $m = -0.50$', 'There is no image, since the object is at the focus', "40 cm from the lens, on the object's side; $m = +2.0$"],
          answer: 0,
          working: 'The lens is diverging, so $f = -20$ cm. $\\tfrac{1}{d_i} = \\tfrac{1}{-20} - \\tfrac{1}{20} = -\\tfrac{2}{20}$, so $d_i = -10$ cm: a virtual image. Then $m = -\\tfrac{-10}{20} = +0.50$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object is 20 centimetres from a diverging lens of focal length 20 centimetres. Where is its image, and what is the magnification? Pause the video and work it out.', caption: 'Your turn. An object is 20 cm from a diverging lens of focal length 20 cm. Where is its image, and what is the magnification? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The lens is diverging, so f is minus 20. One over the image distance is minus one twentieth, minus one twentieth, which is minus two twentieths. So the image distance is minus 10 centimetres: a virtual image, on the same side as the object. The magnification is plus 0.50. That is choice "A".', caption: 'The lens is diverging, so f = −20 cm. 1/dᵢ = −1/20 − 1/20, which is −2/20. So dᵢ = −10 cm: a virtual image, on the same side as the object. The magnification is +0.50. That is choice A.', show: 'q.answer' },
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
            'The thin lens equation: $\\tfrac{1}{f} = \\tfrac{1}{d_o} + \\tfrac{1}{d_i}$',
            'The magnification: $m = \\tfrac{h_i}{h_o} = -\\tfrac{d_i}{d_o}$',
            'Negative $f$: a **diverging** lens',
            "Negative $d_i$: a **virtual** image, on the object's side",
            'Negative $m$: an **upside-down** image',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The thin lens equation: one over f equals one over the object distance, plus one over the image distance.', caption: 'Here is what to remember. The thin lens equation: 1/f = 1/dₒ + 1/dᵢ.', show: 'sum.0' },
        { say: 'The magnification is the height of the image over the height of the object, and it equals minus the image distance over the object distance.', caption: 'The magnification is hᵢ ÷ hₒ, and it equals −dᵢ ÷ dₒ.', show: 'sum.1' },
        { say: 'A negative focal length means a diverging lens.', show: 'sum.2' },
        { say: 'A negative image distance means a virtual image, on the same side as the object.', show: 'sum.3' },
        { say: 'And a negative magnification means that the image is upside down.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
