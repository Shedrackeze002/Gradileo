import type { Explainer, OpticsEl, RaysEl } from '@/video/script.ts';

// Lesson 3.2, first part: the law of reflection, real and virtual images, and the three rays that
// find the image in a curved mirror. The rays are worked out from the focal length and the place
// of the object (src/video/optics.ts), so they meet exactly where the mirror equation puts the
// image, and they follow the object as it slides towards the mirror.

/** A ray on a flat mirror at 40° from the normal; it turns, and comes to rest at 60° (30° from the surface). */
const flat: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'mirror',
  angle: 40,
  height: 400,
  clips: {
    turn: { phases: [{ dur: 3, to: 68 }, { dur: 3.5, to: 15 }, { dur: 2.5, to: 40 }] },
    skim: { phases: [{ dur: 3, to: 60 }, { dur: 6 }] },
  },
};

/** A lamp and its image, as far behind a flat mirror as the lamp is in front. */
const behind: RaysEl = {
  kind: 'rays',
  id: 'v',
  surface: 'mirror',
  angle: 50,
  behind: true,
  height: 470,
  clips: {
    move: { phases: [{ dur: 3.5, to: 25 }, { dur: 3.5, to: 60 }, { dur: 3, to: 50 }] },
    again: { phases: [{ dur: 4, to: 30 }, { dur: 4, to: 50 }] },
  },
};

/** A beam parallel to the axis of a concave mirror of focal length 10 cm. */
const concave: OpticsEl = {
  kind: 'optics',
  id: 'cc',
  device: 'concave',
  f: 10,
  view: [40, 12],
  height: 400,
  clips: { a: { phases: [{ dur: 14 }] }, b: { phases: [{ dur: 13 }] } },
};

/** The same beam on a convex mirror. */
const convex: OpticsEl = {
  kind: 'optics',
  id: 'cv',
  device: 'convex',
  f: 10,
  view: [32, 26],
  height: 400,
  clips: { a: { phases: [{ dur: 13 }] }, b: { phases: [{ dur: 8 }] } },
};

/** An object 30 cm from a concave mirror of focal length 10 cm, which is beyond C. */
const three: OpticsEl = {
  kind: 'optics',
  id: 'im',
  device: 'concave',
  f: 10,
  object: { at: 30, height: 4 },
  view: [40, 16],
  height: 430,
  poster: 'c',
  clips: { a: { phases: [{ dur: 9 }] }, b: { phases: [{ dur: 7 }] }, c: { phases: [{ dur: 7 }] }, d: { phases: [{ dur: 9 }] }, e: { phases: [{ dur: 12 }] } },
};

/** The object slides in: to C, between C and F, to F, and inside F. */
const slide: OpticsEl = {
  kind: 'optics',
  id: 'mv',
  device: 'concave',
  f: 10,
  object: { at: 30, height: 4 },
  view: [42, 30],
  height: 440,
  clips: {
    toC: { phases: [{ dur: 4, to: 20 }, { dur: 5 }] },
    mid: { phases: [{ dur: 3.5, to: 15 }, { dur: 5.5 }] },
    toF: { phases: [{ dur: 3.5, to: 10 }, { dur: 6 }] },
    inside: { phases: [{ dur: 4, to: 6 }, { dur: 12 }] },
  },
};

/** A convex mirror of focal length 15 cm, and an object that walks up to it. */
const shop: OpticsEl = {
  kind: 'optics',
  id: 'sh',
  device: 'convex',
  f: 15,
  object: { at: 30, height: 6 },
  view: [40, 34],
  height: 430,
  clips: {
    a: { phases: [{ dur: 12 }] },
    near: { phases: [{ dur: 4.5, to: 10 }, { dur: 2 }, { dur: 4.5, to: 30 }] },
    c: { phases: [{ dur: 8 }] },
  },
};

const video: Explainer = {
  id: 'p30-3-2',
  lessonId: 'p30-3-2',
  title: 'Images in Mirrors',
  thumbnail: 'im',
  summary:
    'One law finds the image in any mirror. See the law of reflection, the difference between a real and a virtual image, how a concave mirror brings a beam to a focus and a convex mirror spreads it, and the three rays that find the image as an object slides towards a curved mirror.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Images in Mirrors', subtitle: 'The law of reflection, and three rays that find the image' }],
      lines: [
        { say: 'A flat bathroom mirror shows you a copy of yourself, the right way up. The inside of a shiny spoon shows you upside down. And the back of the spoon shows a small face in a wide room.', show: 'title' },
        { say: 'All three obey one simple law. With that law and three special rays, you can find the image in any mirror.' },
      ],
    },
    {
      chapter: 'The law of reflection',
      layout: 'center',
      main: [flat, { kind: 'math', id: 'law', size: 'md', lines: ['\\theta_r = \\theta_i'] }],
      lines: [
        { say: 'Light travels in straight lines, so we draw its path as a ray. When a ray meets a mirror, we measure its direction from the normal: the line at right angles to the surface.', show: ['r', 'r.normal'] },
        { say: 'The angle of reflection equals the angle of incidence. Turn the incoming ray, and the reflected ray turns to match it.', caption: 'The angle of reflection equals the angle of incidence: θr = θi. Turn the incoming ray, and the reflected ray turns to match it.', show: ['r.angles', 'law'], play: 'r.turn', playDelay: 1 },
        { say: 'Both angles are measured from the normal, not from the mirror. So a ray at thirty degrees to the surface is at sixty degrees to the normal.', caption: 'Both angles are measured from the normal, not from the mirror. So a ray at 30° to the surface is at 60° to the normal.', show: 'r.toSurface', play: 'r.skim' },
      ],
    },
    {
      chapter: 'Real and virtual images',
      layout: 'center',
      main: [behind],
      lines: [
        { say: 'Light from a lamp reflects from a flat mirror and keeps spreading. To your eye, it seems to come from a point behind the mirror. No light is really there, so this is called a virtual image.', show: ['v', 'v.image'], play: 'v.move', playDelay: 2 },
        { say: 'A real image is different. It forms where rays of light actually meet, so it can be caught on a screen.' },
        { say: 'The image in a flat mirror is virtual, upright, the same size as the object, and as far behind the mirror as the object is in front.', play: 'v.again' },
      ],
    },
    {
      chapter: 'Curved mirrors',
      layout: 'center',
      main: [concave, { kind: 'math', id: 'half', size: 'md', lines: ['f = \\dfrac{R}{2}'] }],
      lines: [
        { say: 'Now curve the mirror. A concave mirror curves inwards, like the inside of a spoon. It brings rays that are parallel to its axis together at one point: the focus, F.', show: ['cc', 'cc.beam', 'cc.points'], play: 'cc.a' },
        { say: 'The mirror is part of a sphere, and C is the centre of that sphere. The distance from the mirror to the focus is the focal length, f. It is half of the radius.', caption: 'The mirror is part of a sphere, and C is the centre of that sphere. The distance from the mirror to the focus is the focal length, f. It is half of the radius: f = R ÷ 2.', show: 'half', play: 'cc.b' },
      ],
    },
    {
      layout: 'center',
      main: [convex],
      lines: [
        { say: 'A convex mirror bulges outwards, like the back of the spoon. It spreads parallel rays apart, as if they all came from a focus behind the mirror.', show: ['cv', 'cv.beam', 'cv.points'], play: 'cv.a' },
        { say: 'So a concave mirror is a converging mirror, and a convex mirror is a diverging mirror.', play: 'cv.b' },
      ],
    },
    {
      chapter: 'Three rays that find the image',
      layout: 'center',
      main: [three],
      lines: [
        { say: 'Here is an object in front of a concave mirror. Every ray from it obeys the law of reflection, but three rays from its top are easy to draw.', show: ['im', 'im.points'], play: 'im.a' },
        { say: 'One. A ray parallel to the axis reflects through the focus.', show: 'im.parallel', play: 'im.b' },
        { say: 'Two. A ray through the focus reflects parallel to the axis.', show: 'im.focal', play: 'im.c' },
        { say: 'Three. A ray through the centre of curvature meets the mirror along a normal, so it comes straight back.', show: 'im.central', play: 'im.d' },
        { say: 'The top of the image is where the reflected rays meet. Light really meets there, so this image is real. It is upside down, and smaller than the object.', show: ['im.image', 'im.kind'], play: 'im.e' },
      ],
    },
    {
      chapter: 'Moving the object',
      layout: 'center',
      main: [slide],
      lines: [
        { say: 'Now slide the object towards the mirror. At C, the image is the same size as the object.', show: ['mv', 'mv.points', 'mv.parallel', 'mv.focal', 'mv.image', 'mv.kind'], play: 'mv.toC', playDelay: 1.5 },
        { say: 'Between C and F, the image is larger than the object. It is still real, and still upside down.', play: 'mv.mid' },
        { say: 'At the focus, the reflected rays are parallel. They never meet, so there is no image.', show: 'mv.central', play: 'mv.toF' },
        { say: 'Inside the focus, the reflected rays spread apart. Extend them back behind the mirror, with dashed lines, and they meet at a virtual image. It is upright, and larger than the object. This is how a makeup mirror works.', play: 'mv.inside' },
      ],
    },
    {
      chapter: 'A convex mirror',
      layout: 'center',
      main: [shop],
      lines: [
        { say: 'A convex mirror is simpler. Its reflected rays always spread apart, so the image is always virtual, upright, and smaller than the object.', show: ['sh', 'sh.points', 'sh.parallel', 'sh.focal', 'sh.image', 'sh.kind'], play: 'sh.a' },
        { say: 'Move the object wherever you like. The image stays small, behind the mirror.', play: 'sh.near' },
        { say: 'A small image means a wide view. That is why convex mirrors are used in shops, at road bends, and on the side of a car.', play: 'sh.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An object stands between $C$ and $F$ of a concave mirror. What is its image like?',
          choices: ['Virtual, upright and larger', 'Real, upside down and smaller', 'Virtual, upright and smaller', 'Real, upside down and larger'],
          answer: 3,
          working: 'Between $C$ and $F$, the reflected rays meet in front of the mirror, beyond $C$. The image is real, upside down and larger than the object.',
        },
      ],
      lines: [
        { say: 'Your turn. An object stands between C and F of a concave mirror. What is its image like? Pause the video and decide.', show: 'q', wait: 6 },
        { say: 'Between C and F, the reflected rays meet in front of the mirror, beyond C. So the image is real, upside down, and larger than the object. That is choice D.', show: 'q.answer' },
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
            'The angle of reflection equals the angle of incidence, measured from the **normal**',
            'A **real** image is where rays meet; a **virtual** image is where they only seem to come from',
            'A concave mirror converges light, a convex mirror diverges it, and $f = R \\div 2$',
            'Three rays: parallel, then through $F$; through $F$, then parallel; through $C$, and back',
            'A convex mirror always gives a virtual, upright, smaller image',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The angle of reflection equals the angle of incidence, and both are measured from the normal.', show: 'sum.0' },
        { say: 'A real image is where rays meet. A virtual image is where they only seem to come from.', show: 'sum.1' },
        { say: 'A concave mirror converges light, a convex mirror diverges it, and the focal length is half of the radius.', show: 'sum.2' },
        { say: 'Three rays find the image. Parallel, then through F. Through F, then parallel. And through C, then straight back.', show: 'sum.3' },
        { say: 'And a convex mirror always gives a virtual, upright, smaller image.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
