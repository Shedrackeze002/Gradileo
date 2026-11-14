import type { Explainer, RaysEl } from '@/video/script.ts';

// Lesson 4.4: light changes direction by bouncing off a mirror (reflection) or by crossing into a
// material where its speed is different (refraction). The rays are worked out from the angle of
// incidence and, at a boundary, from the two speeds (src/video/rays.ts), so the reflected or
// refracted ray follows the incoming one as it turns, and the wavefronts of a wide beam show why
// the light bends: the side that reaches the glass first slows first.

// A lamp shines on a flat mirror at 40° from the normal; then the lamp moves.
const mirror: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'mirror',
  angle: 40,
  height: 450,
  poster: 'turn',
  clips: {
    turn: { phases: [{ dur: 3, to: 68 }, { dur: 4, to: 15 }, { dur: 2.5, to: 40 }] },
  },
};

// A ray at 30° to the mirror's surface: 60° from the normal.
const skim: RaysEl = { kind: 'rays', id: 'r', surface: 'mirror', angle: 60, height: 410, clips: {} };

// The lamp and its image, as far behind the mirror as the lamp is in front.
const image: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'mirror',
  angle: 50,
  behind: true,
  height: 470,
  clips: {
    move: { phases: [{ dur: 3, to: 25 }, { dur: 3, to: 60 }, { dur: 2, to: 50 }] },
  },
};

// From air into glass, where light travels two thirds as fast: 40° becomes about 25°.
const glass: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'boundary',
  angle: 40,
  speeds: [3, 2],
  media: ['Air: light travels fast', 'Glass: light travels more slowly'],
  height: 480,
  clips: {
    march: { phases: [{ dur: 7 }] },
    turn: { phases: [{ dur: 3, to: 70 }, { dur: 4.5, to: 0 }] },
  },
};

// The other way: from glass out into air, 25° becomes about 39°.
const out: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'boundary',
  angle: 25,
  speeds: [2, 3],
  media: ['Glass: slower', 'Air: faster'],
  height: 480,
  clips: {
    march: { phases: [{ dur: 6 }] },
    turn: { phases: [{ dur: 3, to: 36 }, { dur: 3, to: 10 }, { dur: 2, to: 25 }] },
  },
};

// Water waves at 5 Hz slow from 60 cm/s in deep water to 40 cm/s in the shallows.
const water: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'boundary',
  angle: 35,
  speeds: [60, 40],
  media: ['Deep water: 60 cm/s', 'Shallow water: 40 cm/s'],
  height: 400,
  clips: {
    march: { phases: [{ dur: 8 }] },
  },
};

const video: Explainer = {
  id: 'p10-4-4',
  lessonId: 'p10-4-4',
  title: 'Reflection and Refraction',
  thumbnail: 'r',
  summary:
    'Light changes direction when it bounces off a mirror and when it passes from one material into another. Watch a ray turn on a mirror while the angle of reflection keeps matching the angle of incidence, see where the image in a mirror is, and watch the wavefronts of a beam slow down and swing round as they enter glass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Waves, Sound and Light', title: 'Reflection and Refraction', subtitle: 'How light changes direction' }],
      lines: [
        { say: 'A mirror shows your face, and a straw in a glass of water looks broken at the surface.', show: 'title' },
        { say: 'Both come from light changing direction. It can bounce off a surface, or it can bend as it passes from one material into another.' },
      ],
    },
    {
      chapter: 'The law of reflection',
      layout: 'center',
      main: [mirror, { kind: 'math', id: 'law', size: 'md', lines: ['\\adj{\\text{angle of incidence}} = \\opp{\\text{angle of reflection}}'] }],
      lines: [
        { say: 'We draw the path of light as a straight line, called a ray. Here, a ray from a lamp lands on a flat mirror and bounces off.', show: 'r' },
        { say: 'To describe its direction, we draw the normal. That is a line at right angles to the mirror, at the point where the ray lands.', show: 'r.normal' },
        { say: 'The angle between the incoming ray and the normal is the angle of incidence. Here it is forty degrees. The angle between the reflected ray and the normal is the angle of reflection, and it is forty degrees too.', show: 'r.angles' },
        { say: 'Now watch as the lamp moves. Whatever the angle of incidence is, the angle of reflection matches it.', play: 'r.turn', playDelay: 1.5 },
        { say: 'This is the law of reflection. The angle of reflection equals the angle of incidence.', show: 'law' },
      ],
    },
    {
      chapter: 'Measure from the normal',
      layout: 'center',
      main: [skim, { kind: 'math', id: 'sub', size: 'md', lines: ['\\adj{\\text{angle of incidence}} = 90^\\circ - 30^\\circ = \\adj{60^\\circ} \\qquad \\opp{\\text{angle of reflection}} = \\opp{60^\\circ}'] }],
      lines: [
        { say: 'There is one trap to avoid. This ray makes an angle of thirty degrees with the surface of the mirror.', show: ['r', 'r.toSurface'] },
        { say: 'That is not the angle of incidence. Angles are always measured from the normal, and the normal is at ninety degrees to the mirror.', show: 'r.normal' },
        { say: 'So the angle of incidence is ninety minus thirty, which is sixty degrees. And the angle of reflection is sixty degrees as well.', show: ['r.angles', 'sub'] },
      ],
    },
    {
      chapter: 'The image in a mirror',
      layout: 'center',
      main: [image, { kind: 'text', id: 'img', size: 'md', md: 'The image is the same size, and **as far behind the mirror** as the object is in front.' }],
      lines: [
        { say: 'Why do you see things behind a mirror? Follow the reflected ray backwards, in a straight line. It seems to come from a point behind the mirror.', show: ['r', 'r.image'] },
        { say: 'That point is the image of the lamp. Move the lamp, and the image moves with it, always as far behind the mirror as the lamp is in front.', play: 'r.move', playDelay: 2 },
        { say: 'The image in a flat mirror is the same size as the object. So if you stand two metres from a mirror, your image is two metres behind it, and four metres from you.', show: 'img' },
      ],
    },
    {
      chapter: 'Refraction',
      layout: 'center',
      main: [glass, { kind: 'text', id: 'def', size: 'md', md: '**Refraction**: a wave changes direction when it passes into a material where its **speed** is different.' }],
      lines: [
        { say: 'Light travels more slowly in glass than in air. Watch what happens when a ray crosses from air into glass at an angle.', show: 'r' },
        { say: 'It bends. The angle of incidence is forty degrees, but the angle in the glass, the angle of refraction, is only about twenty-five degrees. The ray has bent towards the normal.', show: ['r.normal', 'r.angles'] },
        { say: 'Why does it bend? Look at the light as a wide beam, with its wavefronts. One side of each wavefront reaches the glass first and slows down, while the other side is still moving fast in the air. So the whole wavefront swings round.', show: 'r.fronts', play: 'r.march', playDelay: 3 },
        { say: 'This change of direction is called refraction. It happens whenever a wave passes into a material where its speed is different.', show: 'def', play: 'r.march' },
        { say: 'Turn the ray, and the bending changes. And along the normal, the ray slows down, but it does not bend at all.', hide: 'r.fronts', play: 'r.turn', playDelay: 1 },
      ],
    },
    {
      chapter: 'Leaving the glass',
      layout: 'center',
      main: [out, { kind: 'text', id: 'rule', size: 'md', md: 'Slows down: bends **towards** the normal. Speeds up: bends **away** from the normal.' }],
      lines: [
        { say: 'Now send the light the other way, from glass out into air. This time it speeds up, and it bends away from the normal.', show: ['r', 'r.normal', 'r.angles'] },
        { say: 'The side of each wavefront that leaves first speeds up first, so the beam swings the other way.', show: 'r.fronts', play: 'r.march', playDelay: 1 },
        { say: 'So there are two rules. A ray that slows down bends towards the normal. A ray that speeds up bends away from the normal.', hide: 'r.fronts', show: 'rule', play: 'r.turn' },
        { say: 'This is why a straw in water looks bent, and why a pool looks shallower than it is. Light from under the water bends away from the normal as it leaves, so it seems to come from a different place.' },
      ],
    },
    {
      chapter: 'Speed and wavelength',
      layout: 'center',
      main: [water, { kind: 'math', id: 'lam', size: 'md', lines: ['\\lambda = \\dfrac{v}{f} \\qquad \\text{deep: } \\dfrac{60}{5} = 12\\ \\text{cm} \\qquad \\text{shallow: } \\dfrac{40}{5} = \\thc{8\\ \\text{cm}}'] }],
      lines: [
        { say: 'Every wave refracts. These are water waves, moving from deep water into shallow water, where they travel more slowly.', show: ['r', 'r.fronts'], play: 'r.march', playDelay: 1 },
        { say: 'Look at the wavefronts in the shallow water. They are closer together. The wavelength is shorter.', play: 'r.march' },
        { say: 'But the frequency has not changed. The source sets how many waves leave each second, and the same number must arrive. Here, that is five waves each second.' },
        { say: 'Wavelength is speed divided by frequency. In deep water, sixty divided by five is twelve centimetres. In shallow water, forty divided by five is eight centimetres.', show: 'lam' },
        { say: 'It is the same for light entering glass. Its speed and its wavelength both go down, but its frequency stays the same. That is why its colour does not change.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ray of light makes an angle of 20° with the surface of a flat mirror. What is the angle of reflection?',
          choices: ['20°', '40°', '70°', '110°'],
          answer: 2,
          working: 'The normal is at 90° to the mirror, so the angle of incidence is $90^\\circ - 20^\\circ = 70^\\circ$. The angle of reflection equals it: $70^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ray of light makes an angle of twenty degrees with the surface of a flat mirror. What is the angle of reflection? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Angles are measured from the normal, so the angle of incidence is ninety minus twenty, which is seventy degrees. The angle of reflection equals it. That is choice C.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            'Angles are measured from the normal, at right angles to the surface',
            'Reflection: angle of reflection = angle of incidence',
            'A mirror image is as far behind the mirror as the object is in front',
            'Refraction: slows down, bends towards the normal; speeds up, bends away',
            'Speed and wavelength change in refraction. Frequency does not',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Angles are measured from the normal, a line at right angles to the surface.', show: 'end.0' },
        { say: 'The law of reflection says the angle of reflection equals the angle of incidence.', show: 'end.1' },
        { say: 'The image in a flat mirror is as far behind the mirror as the object is in front.', show: 'end.2' },
        { say: 'In refraction, a ray that slows down bends towards the normal, and a ray that speeds up bends away.', show: 'end.3' },
        { say: 'And refraction changes the speed and the wavelength of a wave, but not its frequency.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
