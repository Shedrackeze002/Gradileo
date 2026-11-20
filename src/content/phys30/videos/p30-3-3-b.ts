import type { Explainer, LightEl, RaysEl } from '@/video/script.ts';

// Lesson 3.3, second part: the critical angle and total internal reflection, then two things they
// explain. The boundaries are rays that meet a surface from below (src/video/rays.ts), with the
// faint reflected ray that Fresnel's equations give; the fibre and the prism trace their rays by
// Snell's law (src/video/light.ts), so light escapes from the fibre only where the picture says
// the angle at the wall is less than the critical angle.

const RAD = Math.PI / 180;
/** The critical angle between two indices, in degrees, less a hair so that the refracted ray can still be drawn along the surface. */
const critical = (n1: number, n2: number) => Math.asin(n2 / n1) / RAD - 1e-5;

/** Light in crown glass, of index 1.52, that meets a boundary with air: 20° at first, then up to the critical angle, 41.1°, and past it. */
const glass: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'boundary',
  below: true,
  angle: 20,
  speeds: [1, 1.52],
  media: ['Crown glass: n₁ = 1.52', 'Air: n₂ = 1.00'],
  height: 480,
  clips: {
    a: { phases: [{ dur: 12.1 }] },
    b: { phases: [{ dur: 8.3 }] },
    up: { phases: [{ dur: 1.5 }, { dur: 7.5, to: 38 }, { dur: 1.4 }] },
    crit: { phases: [{ dur: 4, to: critical(1.52, 1) }, { dur: 8.6, note: 'The critical angle' }] },
    past: { phases: [{ dur: 3, to: 55 }, { dur: 3 }, { dur: 3, to: 44 }, { dur: 3.5, to: 62 }] },
  },
};

/** The same boundary beside the working: the ray swings up to the critical angle, past it, and back. */
const formula: RaysEl = {
  kind: 'rays',
  id: 'c',
  surface: 'boundary',
  below: true,
  angle: 30,
  speeds: [1, 1.52],
  media: ['Glass: n₁ = 1.52', 'Air: n₂ = 1.00'],
  height: 440,
  clips: {
    a: { phases: [{ dur: 2.5 }, { dur: 4, to: critical(1.52, 1) }, { dur: 3.9, note: 'The critical angle' }] },
    b: { phases: [{ dur: 12.6 }] },
    c: { phases: [{ dur: 9.1 }] },
    d: { phases: [{ dur: 2 }, { dur: 4, to: 56 }, { dur: 3.5 }, { dur: 4, to: 30 }, { dur: 2.6 }] },
  },
};

/** The same glass under water, of index 1.33: the critical angle is now 61.0°. */
const underwater: RaysEl = {
  kind: 'rays',
  id: 'u',
  surface: 'boundary',
  below: true,
  angle: 45,
  speeds: [1 / 1.52, 1 / 1.33],
  media: ['Crown glass: n₁ = 1.52', 'Water: n₂ = 1.33'],
  height: 330,
  clips: {
    a: { phases: [{ dur: 10.8 }] },
    b: { phases: [{ dur: 3.5 }, { dur: 4.5, to: critical(1.52, 1.33) }, { dur: 4.2, note: 'The critical angle' }] },
  },
};

/** Light in water, of index 1.33, under air: it gets out at 20°, and is totally reflected at 55°. */
const pool: RaysEl = {
  kind: 'rays',
  id: 'e',
  surface: 'boundary',
  below: true,
  angle: 20,
  speeds: [1, 1.33],
  media: ['Water: n₁ = 1.33', 'Air: n₂ = 1.00'],
  height: 330,
  clips: {
    a: { phases: [{ dur: 5.5 }, { dur: 3, to: 32 }, { dur: 3, to: 20 }, { dur: 2.4 }] },
    b: { phases: [{ dur: 9.6 }] },
    c: { phases: [{ dur: 2 }, { dur: 5, to: 55 }, { dur: 6.1 }] },
  },
};

/** An optical fibre: the ray enters at 20° to the axis and is held in; at 50° it escapes. */
const fibre: LightEl = {
  kind: 'light',
  id: 'fb',
  fibre: { angle: 20 },
  height: 430,
  poster: 'b',
  thumb: ['names'],
  clips: {
    a: { phases: [{ dur: 10 }] },
    b: { phases: [{ dur: 13.5 }] },
    steep: { phases: [{ dur: 2 }, { dur: 4, angle: 50 }, { dur: 7.5 }] },
    back: { phases: [{ dur: 4, angle: 14 }, { dur: 11.2 }] },
  },
};

/** White light through a glass prism: violet is bent the most, and red the least. */
const prism: LightEl = {
  kind: 'light',
  id: 'pr',
  prism: { angle: 50, index: [1.5, 1.6] },
  height: 430,
  clips: {
    a: { phases: [{ dur: 11.3 }] },
    b: { phases: [{ dur: 11.7 }] },
    turn: { phases: [{ dur: 3, angle: 64 }, { dur: 1.5 }, { dur: 3, angle: 50 }, { dur: 1.5 }] },
  },
};

const video: Explainer = {
  id: 'p30-3-3-b',
  lessonId: 'p30-3-3',
  title: 'Total Internal Reflection',
  thumbnailTitle: 'The Critical Angle',
  thumbnail: 'fb',
  summary:
    'Light in glass or water that meets the surface at a large enough angle cannot get out: all of it is reflected. Watch the refracted ray swing down to the surface at the critical angle, find critical angles with sin θc = n₂ ÷ n₁, and see how an optical fibre traps light and how a prism spreads white light into colours.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Total Internal Reflection', subtitle: 'How glass can trap light' }],
      lines: [
        { say: 'A thread of glass, thinner than a hair, can carry light for many kilometres, round every bend, and lose almost none of it.', show: 'title' },
        { say: 'The glass holds the light in by total internal reflection. Here is how it works.' },
      ],
    },
    {
      chapter: 'From glass into air',
      layout: 'center',
      main: [glass],
      lines: [
        { say: 'Light in glass meets a boundary with air. It speeds up, so it bends away from the normal. The angle in the air is the larger one.', show: ['r', 'r.normal', 'r.angles'], play: 'r.a' },
        { say: 'Look closely, and a faint ray is reflected too. Some of the light always stays in the glass.', show: 'r.partial', play: 'r.b' },
        { say: 'Now increase the angle of incidence. The refracted ray swings down towards the surface and grows dimmer, while the reflected ray grows brighter.', play: 'r.up' },
        { say: 'At one angle of incidence, the refracted ray runs along the surface. Its angle of refraction is 90 degrees. This angle of incidence is called the critical angle.', caption: 'At one angle of incidence, the refracted ray runs along the surface. Its angle of refraction is 90°. This angle of incidence is called the critical angle.', play: 'r.crit' },
        { say: 'Go past it, and there is no refracted ray at all. All of the light is reflected back into the glass. This is total internal reflection.', play: 'r.past' },
      ],
    },
    {
      chapter: 'The critical angle',
      layout: 'split',
      leftWidth: 660,
      left: [formula],
      right: [
        { kind: 'math', id: 'k', size: 'md', lines: ['n_1 \\sin\\theta_c = n_2 \\sin 90^\\circ', '\\sin\\theta_c = \\dfrac{n_2}{n_1}', '\\sin\\theta_c = \\dfrac{1.00}{1.52} = 0.6579', '\\theta_c = \\brand{41.1^\\circ}'] },
        { kind: 'bullets', id: 'need', items: ['The light starts in the **denser** material', 'The angle of incidence is **greater** than $\\theta_c$'] },
      ],
      lines: [
        { say: "To find the critical angle, put an angle of refraction of 90 degrees into Snell's law. The sine of 90 degrees is one.", caption: "To find the critical angle, put an angle of refraction of 90° into Snell's law. The sine of 90° is 1.", show: ['c', 'c.normal', 'c.angles', 'c.partial', 'k.0'], play: 'c.a' },
        { say: 'So the sine of the critical angle is n two over n one: the index of the less dense material, divided by the index of the denser one.', caption: 'So sin θc = n₂ ÷ n₁: the index of the less dense material, divided by the index of the denser one.', show: 'k.1', play: 'c.b' },
        { say: 'For crown glass in air, that is 1.00 over 1.52, which is 0.6579. So the critical angle is 41.1 degrees.', caption: 'For crown glass in air, that is 1.00 ÷ 1.52, which is 0.6579. So the critical angle is 41.1°.', show: ['k.2', 'k.3'], play: 'c.c' },
        { say: 'Total internal reflection needs two things. The light must start in the denser material. And the angle of incidence must be greater than the critical angle. Light in air that meets glass is never totally reflected.', show: ['need.0', 'need.1'], play: 'c.d' },
      ],
    },
    {
      chapter: 'Glass under water',
      layout: 'center',
      main: [underwater, { kind: 'math', id: 'w', size: 'md', lines: ['\\sin\\theta_c = \\dfrac{n_2}{n_1} = \\dfrac{1.33}{1.52} = 0.8750 \\quad\\Rightarrow\\quad \\theta_c = \\brand{61.0^\\circ}'] }],
      lines: [
        { say: 'Put the same glass under water, of index 1.33. The two materials are now more alike, so the light bends less at the boundary.', show: ['u', 'u.normal', 'u.angles', 'u.partial'], play: 'u.a' },
        { say: 'The sine of the critical angle is 1.33 over 1.52, which is 0.8750. So the critical angle is 61.0 degrees, much larger than it was in air.', caption: 'sin θc = 1.33 ÷ 1.52, which is 0.8750. So the critical angle is 61.0°, much larger than it was in air.', show: 'w.0', play: 'u.b' },
      ],
    },
    {
      chapter: 'Does the ray escape?',
      layout: 'center',
      main: [
        pool,
        { kind: 'math', id: 'x', size: 'md', lines: ['\\sin\\theta_c = \\dfrac{1.00}{1.33} = 0.7519 \\quad\\Rightarrow\\quad \\theta_c = 48.8^\\circ', '55^\\circ > 48.8^\\circ \\quad\\Rightarrow\\quad \\opp{\\text{totally reflected}}'] },
      ],
      lines: [
        { say: 'A ray in water, of index 1.33, meets the surface from below. At a small angle, most of the light gets out. But what happens at 55 degrees to the normal?', caption: 'A ray in water, of index 1.33, meets the surface from below. At a small angle, most of the light gets out. But what happens at 55° to the normal?', show: ['e', 'e.normal', 'e.angles', 'e.partial'], play: 'e.a' },
        { say: 'Find the critical angle first. Its sine is 1.00 over 1.33, which is 0.7519. So the critical angle is 48.8 degrees.', caption: 'Find the critical angle first. Its sine is 1.00 ÷ 1.33, which is 0.7519. So the critical angle is 48.8°.', show: 'x.0', play: 'e.b' },
        { say: '55 degrees is greater than the critical angle. So the ray cannot get out. It is totally reflected, and stays in the water at 55 degrees to the normal.', caption: '55° is greater than the critical angle. So the ray cannot get out. It is totally reflected, and stays in the water at 55° to the normal.', show: 'x.1', play: 'e.c' },
      ],
    },
    {
      chapter: 'Optical fibres',
      layout: 'center',
      main: [fibre],
      lines: [
        { say: 'An optical fibre is a thin thread of very pure glass, the core, inside a coating of lower refractive index, the cladding.', show: ['fb', 'fb.names'], play: 'fb.a' },
        { say: 'Light that enters one end meets the wall at more than the critical angle. So it is totally reflected, again and again, and it follows the fibre round the bends.', show: 'fb.angles', play: 'fb.b' },
        { say: 'Send the light in too steeply, and it meets the wall at less than the critical angle. Now light escapes at every bounce, and almost none reaches the far end.', play: 'fb.steep' },
        { say: 'So the light is sent in nearly along the fibre. Telephone calls and internet data travel as pulses of light like these. And a bundle of fibres lets a doctor see inside the body.', play: 'fb.back' },
      ],
    },
    {
      chapter: 'Dispersion',
      layout: 'center',
      main: [prism],
      lines: [
        { say: 'Refraction explains one more thing. The index of glass is slightly different for each colour. It is largest for violet light, and smallest for red.', show: ['pr', 'pr.values'], play: 'pr.a' },
        { say: 'So when white light passes through a prism, each colour bends by a different amount, and the light spreads into a spectrum. This is called dispersion.', show: 'pr.names', play: 'pr.b' },
        { say: 'Violet is bent the most, and red the least. A rainbow is sunlight, dispersed by drops of rain.', play: 'pr.turn' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Light travels in diamond, of refractive index 2.42, towards a boundary with air. What is the critical angle?',
          choices: ['65.6°', '41.1°', '24.4°', 'There is none: light always gets out of diamond'],
          answer: 2,
          working: '$\\sin\\theta_c = \\tfrac{n_2}{n_1} = \\tfrac{1.00}{2.42} = 0.4132$, so $\\theta_c = 24.4°$.',
        },
      ],
      lines: [
        { say: 'Your turn. Light travels in diamond, of refractive index 2.42, towards a boundary with air. What is the critical angle? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The sine of the critical angle is 1.00 over 2.42, which is 0.4132. So the critical angle is 24.4 degrees. That is choice C. It is so small that light bounces around inside a cut diamond many times before it gets out, which is why the stone sparkles.', caption: 'sin θc = 1.00 ÷ 2.42, which is 0.4132. So the critical angle is 24.4°. That is choice C. It is so small that light bounces around inside a cut diamond many times before it gets out, which is why the stone sparkles.', show: 'q.answer' },
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
            'Light that passes into a **less dense** material bends away from the normal',
            'The critical angle: $\\sin\\theta_c = \\tfrac{n_2}{n_1}$',
            'Beyond it, **all** of the light is reflected: total internal reflection',
            'An **optical fibre** holds light in by total internal reflection',
            'A prism **disperses** white light: violet bends the most, red the least',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light that passes into a less dense material bends away from the normal.', show: 'sum.0' },
        { say: 'At the critical angle, the refracted ray runs along the surface. The sine of the critical angle is n two over n one.', caption: 'At the critical angle, the refracted ray runs along the surface: sin θc = n₂ ÷ n₁.', show: 'sum.1' },
        { say: 'Beyond the critical angle, all of the light is reflected. That is total internal reflection.', show: 'sum.2' },
        { say: 'An optical fibre holds light in by total internal reflection.', show: 'sum.3' },
        { say: 'And a prism disperses white light, because violet light bends the most, and red the least.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
