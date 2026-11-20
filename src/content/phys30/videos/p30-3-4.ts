import type { Explainer, OpticsEl } from '@/video/script.ts';

// Lesson 3.4, first part: converging and diverging lenses, and the three rays that find the image.
// The rays are worked out from the focal length and the place of the object (src/video/optics.ts),
// so they meet exactly where the thin lens equation puts the image, and they follow the object as
// it slides towards the lens: a camera, a projector and a magnifying glass in one picture.

/** A beam parallel to the axis of a converging lens of focal length 10 cm. */
const converging: OpticsEl = {
  kind: 'optics',
  id: 'cv',
  device: 'converging',
  f: 10,
  view: [26, 26],
  height: 400,
  clips: { a: { phases: [{ dur: 12.6 }] }, b: { phases: [{ dur: 13 }] } },
};

/** The same beam through a diverging lens. */
const diverging: OpticsEl = {
  kind: 'optics',
  id: 'dv',
  device: 'diverging',
  f: 10,
  view: [26, 26],
  height: 400,
  clips: { a: { phases: [{ dur: 12.6 }] }, b: { phases: [{ dur: 9.6 }] } },
};

/** An object 30 cm from a converging lens of focal length 10 cm, which is beyond 2F. */
const three: OpticsEl = {
  kind: 'optics',
  id: 'im',
  device: 'converging',
  f: 10,
  object: { at: 30, height: 4 },
  view: [38, 26],
  height: 430,
  poster: 'c',
  clips: { a: { phases: [{ dur: 10.9 }] }, b: { phases: [{ dur: 6.9 }] }, c: { phases: [{ dur: 8.3 }] }, d: { phases: [{ dur: 7.8 }] }, e: { phases: [{ dur: 17.8 }] } },
};

/** The object slides in: to 2F, between 2F and F, to F, and inside F. */
const slide: OpticsEl = {
  kind: 'optics',
  id: 'mv',
  device: 'converging',
  f: 10,
  object: { at: 30, height: 3 },
  view: [34, 38],
  height: 440,
  clips: {
    toC: { phases: [{ dur: 4, to: 20 }, { dur: 5 }] },
    mid: { phases: [{ dur: 3.5, to: 15 }, { dur: 11.7 }] },
    toF: { phases: [{ dur: 3.5, to: 10 }, { dur: 4.3 }] },
    inside: { phases: [{ dur: 4, to: 6 }, { dur: 13.9 }] },
    same: { phases: [{ dur: 5 }, { dur: 5, to: 30 }, { dur: 5.6 }] },
  },
};

/** A diverging lens of focal length 15 cm, and an object that walks up to it. */
const spread: OpticsEl = {
  kind: 'optics',
  id: 'dg',
  device: 'diverging',
  f: 15,
  object: { at: 30, height: 6 },
  view: [40, 24],
  height: 430,
  clips: {
    a: { phases: [{ dur: 11.3 }] },
    near: { phases: [{ dur: 3.5, to: 10 }, { dur: 1 }, { dur: 3.5, to: 30 }] },
    c: { phases: [{ dur: 10 }] },
  },
};

const video: Explainer = {
  id: 'p30-3-4',
  lessonId: 'p30-3-4',
  title: 'Images in Lenses',
  thumbnail: 'im',
  summary:
    'A lens bends light to form an image. See how a converging lens brings a beam to a focus and a diverging lens spreads it, draw the three rays that find the image, and slide an object towards a lens to turn a camera into a projector and then into a magnifying glass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Images in Lenses', subtitle: 'Three rays that find the image' }],
      lines: [
        { say: 'A camera, a projector, a pair of glasses and your own eye all depend on a lens.', show: 'title' },
        { say: 'A lens refracts light twice, as it enters and as it leaves. The ray diagrams that you drew for mirrors work for lenses too, with only small changes.' },
      ],
    },
    {
      chapter: 'Two kinds of lens',
      layout: 'center',
      main: [converging],
      lines: [
        { say: 'A converging lens is thicker in the middle than at the edges. It brings rays that are parallel to its axis together at one point: the focus, F.', show: ['cv', 'cv.beam', 'cv.points'], play: 'cv.a' },
        { say: 'Light can pass through a lens from either side. So a lens has a focus on each side, at the same distance. That distance is the focal length, f.', play: 'cv.b' },
      ],
    },
    {
      layout: 'center',
      main: [diverging],
      lines: [
        { say: 'A diverging lens is thinner in the middle. It spreads parallel rays apart, as if they all came from the focus on the side the light came from.', show: ['dv', 'dv.beam', 'dv.points'], play: 'dv.a' },
        { say: 'We treat both lenses as thin, and draw all of the bending at one line through the centre of the lens.', play: 'dv.b' },
      ],
    },
    {
      chapter: 'Three rays that find the image',
      layout: 'center',
      main: [three],
      lines: [
        { say: 'Here is an object in front of a converging lens. Light leaves its top in every direction, but three rays are easy to draw.', show: ['im', 'im.points'], play: 'im.a' },
        { say: 'One. A ray parallel to the axis passes through the focus on the far side.', show: 'im.parallel', play: 'im.b' },
        { say: 'Two. A ray through the centre of the lens carries straight on. It is not bent at all.', show: 'im.central', play: 'im.c' },
        { say: 'Three. A ray through the focus on the near side leaves the lens parallel to the axis.', show: 'im.focal', play: 'im.d' },
        { say: 'The top of the image is where the three rays meet. Light really meets there, so the image is real. It is upside down, and smaller than the object. A camera and your eye form an image like this one.', show: ['im.image', 'im.kind'], play: 'im.e' },
      ],
    },
    {
      chapter: 'Moving the object',
      layout: 'center',
      main: [slide],
      lines: [
        { say: 'Now slide the object towards the lens. At twice the focal length, the image is the same size as the object.', show: ['mv', 'mv.points', 'mv.parallel', 'mv.central', 'mv.image', 'mv.kind'], play: 'mv.toC', playDelay: 1.5 },
        { say: 'Between twice the focal length and the focus, the image is larger than the object. It is still real, and still upside down. This is a projector, throwing a large picture onto a screen.', play: 'mv.mid' },
        { say: 'At the focus, the rays leave the lens parallel. They never meet, so there is no image.', show: 'mv.focal', play: 'mv.toF' },
        { say: 'Inside the focus, the rays spread apart beyond the lens. Extend them back, with dashed lines, and they meet at a virtual image, on the same side as the object. It is upright, and larger. This is a magnifying glass.', play: 'mv.inside' },
        { say: 'The pattern matches a concave mirror, with one difference. Light passes through a lens, so a real image is on the far side, and a virtual image is on the same side as the object.', play: 'mv.same' },
      ],
    },
    {
      chapter: 'A diverging lens',
      layout: 'center',
      main: [spread],
      lines: [
        { say: 'A diverging lens is simpler. Its rays always spread apart beyond the lens, so the image is always virtual, upright, and smaller than the object.', show: ['dg', 'dg.points', 'dg.parallel', 'dg.central', 'dg.image', 'dg.kind'], play: 'dg.a' },
        { say: 'Move the object wherever you like. The image stays small, between the object and the lens.', play: 'dg.near' },
        { say: 'Glasses for a short-sighted eye are diverging lenses. They spread the light a little, before the eye brings it to a focus.', play: 'dg.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A converging lens is held closer to a stamp than its focal length. What is the image of the stamp like?',
          choices: ['Real, upside down and larger', 'Real, upright and smaller', 'Virtual, upside down and larger', 'Virtual, upright and larger'],
          answer: 3,
          working: 'Inside the focus, the rays spread apart beyond the lens. Traced back, they meet on the same side as the stamp, at a virtual, upright, larger image.',
        },
      ],
      lines: [
        { say: 'Your turn. A converging lens is held closer to a stamp than its focal length. What is the image of the stamp like? Pause the video and decide.', show: 'q', wait: 6 },
        { say: 'The stamp is inside the focus, so the rays spread apart beyond the lens. Traced back, they meet on the same side as the stamp. The image is virtual, upright, and larger. That is choice D.', show: 'q.answer' },
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
            'A **converging** lens brings parallel rays to a focus; a **diverging** lens spreads them apart',
            'Three rays: parallel, then through the far $F$; through the centre, straight on; through the near $F$, then parallel',
            'Beyond the focus of a converging lens: a **real**, upside-down image on the far side',
            'Inside the focus: a **virtual**, upright, larger image on the same side',
            'A diverging lens always gives a virtual, upright, **smaller** image',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A converging lens brings parallel rays to a focus, and a diverging lens spreads them apart.', show: 'sum.0' },
        { say: 'Three rays find the image. Parallel, then through the far focus. Through the centre, straight on. And through the near focus, then parallel.', show: 'sum.1' },
        { say: 'An object beyond the focus of a converging lens has a real, upside-down image, on the far side of the lens.', show: 'sum.2' },
        { say: 'An object inside the focus has a virtual, upright, larger image, on its own side.', show: 'sum.3' },
        { say: 'And a diverging lens always gives a virtual, upright, smaller image.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
