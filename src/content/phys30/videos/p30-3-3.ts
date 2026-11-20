import type { Explainer, RaysEl } from '@/video/script.ts';

// Lesson 3.3, first part: the refractive index, why light bends, and Snell's law. Every picture is
// a ray at a boundary (src/video/rays.ts), where the angle of refraction comes from the two
// speeds, so the angle each picture shows is the angle its working finds.

/** Light that meets glass along the normal: it slows down, and its wavefronts close up. */
const slows: RaysEl = {
  kind: 'rays',
  id: 's',
  surface: 'boundary',
  angle: 0,
  speeds: [1.5, 1],
  media: ['Air: light travels fast', 'Glass: light travels more slowly'],
  height: 330,
  clips: { a: { phases: [{ dur: 11.7 }] }, b: { phases: [{ dur: 11.3 }] }, c: { phases: [{ dur: 14.4 }] }, d: { phases: [{ dur: 11.8 }] } },
};

/** A beam that meets glass at 50°: each wavefront swings round as it crosses. */
const bends: RaysEl = {
  kind: 'rays',
  id: 'b',
  surface: 'boundary',
  angle: 50,
  speeds: [1.5, 1],
  media: ['Air', 'Glass'],
  height: 470,
  poster: 'a',
  clips: {
    a: { phases: [{ dur: 13 }] },
    b: { phases: [{ dur: 12.2 }] },
    c: { phases: [{ dur: 7.8 }] },
    turn: { phases: [{ dur: 3, to: 72 }, { dur: 3.8, to: 0 }, { dur: 1.3 }, { dur: 2.5, to: 50 }] },
  },
};

/** The other way: from glass out into air, 25° becomes about 39°. */
const leaves: RaysEl = {
  kind: 'rays',
  id: 'o',
  surface: 'boundary',
  angle: 25,
  speeds: [1, 1.5],
  media: ['Glass', 'Air'],
  height: 470,
  clips: { turn: { phases: [{ dur: 4.9 }, { dur: 3, to: 38 }, { dur: 3, to: 10 }, { dur: 2.5, to: 25 }] } },
};

/** The lesson's first example: from air into crown glass, of index 1.52, at 40.0°. */
const crown: RaysEl = {
  kind: 'rays',
  id: 'g',
  surface: 'boundary',
  angle: 40,
  speeds: [1.52, 1],
  media: ['Air: n₁ = 1.00', 'Crown glass: n₂ = 1.52'],
  height: 300,
  clips: { a: { phases: [{ dur: 12.2 }] }, b: { phases: [{ dur: 13.5 }] }, c: { phases: [{ dur: 13 }] } },
};

/** The lesson's second example: 50.0° in air becomes 31.0° in a plastic of unknown index. */
const plastic: RaysEl = {
  kind: 'rays',
  id: 'pl',
  surface: 'boundary',
  angle: 50,
  speeds: [Math.sin((50 * Math.PI) / 180) / Math.sin((31 * Math.PI) / 180), 1],
  media: ['Air: n₁ = 1.00', 'Plastic: n₂ = ?'],
  height: 330,
  clips: { a: { phases: [{ dur: 12.2 }] }, b: { phases: [{ dur: 10.8 }] }, c: { phases: [{ dur: 7.4 }] } },
};

/** Orange light that passes from air into glass of index 1.50: the wavefronts close up. */
const orange: RaysEl = {
  kind: 'rays',
  id: 'w',
  surface: 'boundary',
  angle: 35,
  speeds: [1.5, 1],
  media: ['Air: λ = 600 nm', 'Glass: λ = 400 nm'],
  height: 330,
  clips: { a: { phases: [{ dur: 11.7 }] }, b: { phases: [{ dur: 8.3 }] }, c: { phases: [{ dur: 15.2 }] }, d: { phases: [{ dur: 13.5 }] } },
};

/** A ray at 30° to the surface: 60° from the normal. */
const skim: RaysEl = {
  kind: 'rays',
  id: 't',
  surface: 'boundary',
  angle: 60,
  speeds: [1.5, 1],
  media: ['Air', 'Glass'],
  height: 440,
  clips: { a: { phases: [{ dur: 11.3 }] }, b: { phases: [{ dur: 8.7 }] } },
};

const video: Explainer = {
  id: 'p30-3-3',
  lessonId: 'p30-3-3',
  title: "Refraction and Snell's Law",
  thumbnailTitle: "Snell's Law",
  thumbnail: 'b',
  summary:
    "Light bends when it crosses from one material into another, since its speed changes. Watch wavefronts swing round as they enter glass, meet the refractive index, and use Snell's law to find an angle of refraction and an unknown index. Then see why the wavelength changes in glass while the frequency does not.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: "Refraction and Snell's Law", subtitle: 'Why light bends, and by how much' }],
      lines: [
        { say: 'A straw in a glass of water looks broken at the surface. And a swimming pool looks shallower than it really is.', show: 'title' },
        { say: 'In both cases, light has changed direction as it crossed from one material into another. This bending is called refraction.' },
      ],
    },
    {
      chapter: 'The refractive index',
      layout: 'center',
      main: [slows, { kind: 'math', id: 'n', size: 'md', lines: ['n = \\dfrac{c}{v}', 'v = \\dfrac{c}{n} = \\dfrac{3.00 \\times 10^{8}}{1.33} = \\good{2.26 \\times 10^{8}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Light travels at 300 million metres per second in a vacuum, and almost as fast in air. In glass or in water, it travels more slowly.', show: ['s', 's.fronts'], play: 's.a' },
        { say: 'The refractive index, n, says how much more slowly. It is the speed of light in a vacuum, divided by its speed in the material.', caption: 'The refractive index, n, says how much more slowly. It is the speed of light in a vacuum, c, divided by its speed in the material, v.', show: 'n.0', play: 's.b' },
        { say: 'Water has an index of 1.33. So light in water travels at 3.00 times ten to the eight, divided by 1.33, which is 2.26 times ten to the eight metres per second.', caption: 'Water has an index of 1.33. So light in water travels at 3.00 × 10⁸ ÷ 1.33, which is 2.26 × 10⁸ m/s.', show: 'n.1', play: 's.c' },
        { say: 'The index is never less than one. And the larger it is, the slower the light. It is 1.52 for crown glass, and 2.42 for diamond.', play: 's.d' },
      ],
    },
    {
      chapter: 'Why light bends',
      layout: 'center',
      main: [bends],
      lines: [
        { say: 'Now send the light in at an angle. One end of each wavefront reaches the glass first and slows down, while the other end is still in the air.', show: ['b', 'b.fronts'], play: 'b.a' },
        { say: 'So the wavefront swings round, like a row of marchers who step from a road onto soft sand. And the light travels on in a new direction.', play: 'b.b' },
        { say: 'Draw the normal, at right angles to the surface. Light that slows down bends towards the normal.', show: ['b.normal', 'b.angles'], hide: 'b.fronts', play: 'b.c' },
        { say: 'Turn the ray, and the angle in the glass is always the smaller one. Only a ray along the normal goes straight through.', play: 'b.turn' },
      ],
    },
    {
      layout: 'center',
      main: [leaves],
      lines: [{ say: 'Going the other way, from glass out into air, the light speeds up. Now it bends away from the normal, and the angle in the air is the larger one.', show: ['o', 'o.normal', 'o.angles'], play: 'o.turn' }],
    },
    {
      chapter: "Snell's law",
      layout: 'center',
      main: [
        crown,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2', '1.00 \\times \\sin 40.0^\\circ = 1.52 \\times \\sin\\theta_2', '\\sin\\theta_2 = \\dfrac{0.6428}{1.52} = 0.4229 \\quad\\Rightarrow\\quad \\theta_2 = \\hyp{25.0^\\circ}'],
        },
      ],
      lines: [
        { say: "Snell's law links the two angles. The refractive index, times the sine of the angle from the normal, is the same on both sides of the boundary.", caption: "Snell's law links the two angles: n₁ sin θ₁ = n₂ sin θ₂. The refractive index, times the sine of the angle from the normal, is the same on both sides of the boundary.", show: ['g', 'g.normal', 'm.0'], play: 'g.a' },
        { say: 'A ray in air meets crown glass, of index 1.52, at 40.0 degrees. So 1.00 times the sine of 40.0 degrees equals 1.52 times the sine of the second angle.', caption: 'A ray in air meets crown glass, of index 1.52, at 40.0°. So 1.00 × sin 40.0° = 1.52 × sin θ₂.', show: 'm.1', play: 'g.b' },
        { say: 'The sine of the second angle is 0.6428 over 1.52, which is 0.4229. So the angle of refraction is 25.0 degrees, and that is the angle in the picture.', caption: 'sin θ₂ = 0.6428 ÷ 1.52, which is 0.4229. So the angle of refraction is 25.0°, and that is the angle in the picture.', show: ['m.2', 'g.angles'], play: 'g.c' },
      ],
    },
    {
      chapter: 'Finding an index',
      layout: 'center',
      main: [
        plastic,
        { kind: 'math', id: 'p', size: 'md', lines: ['1.00 \\times \\sin 50.0^\\circ = n_2 \\times \\sin 31.0^\\circ', 'n_2 = \\dfrac{\\sin 50.0^\\circ}{\\sin 31.0^\\circ} = \\dfrac{0.7660}{0.5150} = \\good{1.49}'] },
      ],
      lines: [
        { say: "Snell's law can also find an index. A ray in air meets a clear plastic block at 50.0 degrees, and travels through the plastic at 31.0 degrees.", caption: "Snell's law can also find an index. A ray in air meets a clear plastic block at 50.0°, and travels through the plastic at 31.0°.", show: ['pl', 'pl.normal', 'pl.angles'], play: 'pl.a' },
        { say: 'Write the law with what we know. 1.00 times the sine of 50.0 degrees equals the unknown index, times the sine of 31.0 degrees.', caption: 'Write the law with what we know: 1.00 × sin 50.0° = n₂ × sin 31.0°.', show: 'p.0', play: 'pl.b' },
        { say: 'So the index is 0.7660 over 0.5150, which is 1.49. That is the index of acrylic.', caption: 'So n₂ = 0.7660 ÷ 0.5150, which is 1.49. That is the index of acrylic.', show: 'p.1', play: 'pl.c' },
      ],
    },
    {
      chapter: 'What changes, and what does not',
      layout: 'center',
      main: [
        orange,
        {
          kind: 'math',
          id: 'f',
          size: 'md',
          lines: ['f = \\dfrac{c}{\\lambda} = \\dfrac{3.00 \\times 10^{8}}{600 \\times 10^{-9}} = \\thc{5.00 \\times 10^{14}\\ \\text{Hz}}', '\\lambda_{\\text{glass}} = \\dfrac{\\lambda}{n} = \\dfrac{600\\ \\text{nm}}{1.50} = \\good{400\\ \\text{nm}}'],
        },
      ],
      lines: [
        { say: 'What happens to the wave itself? Each crest that arrives at the boundary sends one crest on. So the frequency is the same on both sides.', show: ['w', 'w.fronts'], play: 'w.a' },
        { say: 'But the light is slower in the glass, so its crests are closer together. The wavelength is shorter.', play: 'w.b' },
        { say: 'Take orange light, with a wavelength of 600 nanometres in air. Its frequency is c over lambda, which is 5.00 times ten to the fourteen hertz. And that does not change in the glass.', caption: 'Take orange light, with a wavelength of 600 nm in air. Its frequency is c ÷ λ, which is 5.00 × 10¹⁴ Hz. And that does not change in the glass.', show: 'f.0', play: 'w.c' },
        { say: 'In glass of index 1.50, the wavelength becomes 600 over 1.50, which is 400 nanometres. The speed and the wavelength change. The frequency, which sets the colour, stays the same.', caption: 'In glass of index 1.50, the wavelength becomes 600 ÷ 1.50, which is 400 nm. The speed and the wavelength change. The frequency, which sets the colour, stays the same.', show: 'f.1', play: 'w.d' },
      ],
    },
    {
      chapter: 'One trap',
      layout: 'center',
      main: [skim],
      lines: [
        { say: "One trap. The angles in Snell's law are measured from the normal, not from the surface. This ray is at 30 degrees to the glass.", caption: "One trap. The angles in Snell's law are measured from the normal, not from the surface. This ray is at 30° to the glass.", show: ['t', 't.normal', 't.toSurface'], play: 't.a' },
        { say: 'So subtract from 90 first. The angle of incidence is 60 degrees, and that is the angle to use.', caption: 'So subtract from 90° first. The angle of incidence is 60°, and that is the angle to use.', show: 't.angles', play: 't.b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ray of light in air strikes water, of refractive index 1.33, at 60.0° to the normal. What is the angle of refraction?',
          choices: ['45.1°', '40.6°', '22.1°', '79.8°'],
          answer: 1,
          working: '$1.00 \\times \\sin 60.0° = 1.33 \\times \\sin\\theta_2$, so $\\sin\\theta_2 = \\tfrac{0.8660}{1.33} = 0.6511$ and $\\theta_2 = 40.6°$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ray of light in air strikes water, of refractive index 1.33, at 60.0 degrees to the normal. What is the angle of refraction? Pause the video and work it out.', caption: 'Your turn. A ray of light in air strikes water, of refractive index 1.33, at 60.0° to the normal. What is the angle of refraction? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The sine of 60.0 degrees is 0.8660. Divide by 1.33 to get 0.6511, and the angle with that sine is 40.6 degrees. That is choice B. The ray has slowed down, and bent towards the normal.', caption: 'sin 60.0° is 0.8660. Divide by 1.33 to get 0.6511, and the angle with that sine is 40.6°. That is choice B. The ray has slowed down, and bent towards the normal.', show: 'q.answer' },
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
            'The refractive index: $n = \\tfrac{c}{v}$. A larger index means **slower** light',
            'Light that slows down bends **towards** the normal; light that speeds up bends **away**',
            "Snell's law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$, with both angles from the **normal**",
            'The **frequency** stays the same; the speed and the wavelength change together',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The refractive index is c over v. A larger index means slower light.', caption: 'Here is what to remember. The refractive index is n = c ÷ v. A larger index means slower light.', show: 'sum.0' },
        { say: 'Light that slows down bends towards the normal. Light that speeds up bends away from it.', show: 'sum.1' },
        { say: "Snell's law says that the index times the sine of the angle is the same on both sides, with both angles measured from the normal.", caption: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂, with both angles measured from the normal.", show: 'sum.2' },
        { say: 'And the frequency of the light stays the same, while its speed and its wavelength change together.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
