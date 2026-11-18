import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.5, first half: charges moving in a uniform field. Each particle is moved step by step
// by the force qE on it (src/video/charges.ts), so the proton's velocity grows steadily, the
// electron leaves the gun at the speed that energy gives, and the electron that enters across the
// field follows a parabola.

const CM = { metres: 0.01, symbol: 'cm' };
const PROTON = 1.67e-27;
const ELECTRON = 9.11e-31;

/** A proton let go at the positive plate, in a field of 2000 N/C (60 V across 3.0 cm). */
const proton: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.02, 0.055, -0.0092, 0.0092],
  height: 280,
  unit: 'e',
  length: CM,
  rate: 1.7e-7,
  pulls: ['p'],
  forceFigures: 2,
  forceScale: 70 / 3.2e-16,
  plates: { at: [0, 0.03], span: [-0.006, 0.006], volts: 60, lines: 5 },
  bodies: [{ id: 'p', charge: 1, x: 0, mass: PROTON }],
  // It is stopped two thirds of the way across, where its arrows are clear of the negative plate.
  clips: { go: { phases: [{ dur: 2.6, fly: true }] } },
};

/** An electron pulled from rest through 1000 V, and out through a hole in the positive plate; then again with the plates half as far apart. */
const gun = (height: number, view: ChargesEl['view']): ChargesEl => ({
  kind: 'charges',
  id: 'gun',
  view,
  height,
  unit: 'e',
  rate: 1e-9,
  speedFigures: 3,
  energyAt: 'left',
  plates: { at: [0.02, 0], span: [-0.008, 0.008], volts: 1000, hole: 'first', lines: 5 },
  bodies: [{ id: 'e', charge: -1, x: 0, mass: ELECTRON }],
  poster: 'go',
  thumb: ['lines', 'charge', 'velocity', 'trail'],
  clips: {
    go: { phases: [{ dur: 3.4, fly: true }] },
    near: { reset: true, phases: [{ dur: 1.5, plates: [0.01, 0] }, { dur: 3.4, fly: true }] },
  },
});

/**
 * An electron that enters at 2.0 × 10⁷ m/s between level plates 6.0 cm long, where the field is
 * 4000 N/C straight down (48 V across 1.2 cm). The grey particle has no charge and the same
 * velocity, so its trail is the straight path the electron would have followed.
 */
const across = (height: number, view: ChargesEl['view']): ChargesEl => ({
  kind: 'charges',
  id: 'beam',
  view,
  height,
  unit: 'e',
  rate: 1e-9,
  plates: { at: [0.006, -0.006], across: 'y', span: [0, 0.06], volts: 48, lines: 9 },
  bodies: [
    { id: 'n', charge: 0, x: -0.012, y: 0, mass: ELECTRON, v: [2e7, 0], test: true },
    { id: 'e', charge: -1, x: -0.012, y: 0, mass: ELECTRON, v: [2e7, 0] },
  ],
  // 0.6 ns to reach the plates, 3.0 ns between them, and 1.0 ns beyond.
  clips: { go: { phases: [{ dur: 4.6, fly: true }] } },
});

const video: Explainer = {
  id: 'p30-2-5',
  lessonId: 'p30-2-5',
  title: 'Charges Moving in a Uniform Field',
  thumbnailTitle: 'Charges in a Field',
  thumbnail: 'gun',
  summary:
    'In a uniform field the force on a charged particle is constant, so its acceleration is too: a = qE ÷ m. Find the speed an electron gains from a potential difference with energy (qΔV = ½mv²), see why the distance between the plates does not matter, and follow an electron that enters across the field along a parabola.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Charges Moving in a Uniform Field', subtitle: 'Constant force, constant acceleration' }],
      lines: [
        { say: 'An old television, an electron microscope and an X-ray tube all begin the same way. Electrons are let go near a negative plate, and pulled towards a positive one.', show: 'title' },
        { say: 'Between the plates the field is uniform, so the force on a charge is constant. Everything you know about constant acceleration applies.' },
      ],
    },
    {
      chapter: 'Constant acceleration',
      layout: 'center',
      main: [
        proton,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['a = \\dfrac{F}{m} = \\dfrac{qE}{m}', 'a = \\dfrac{1.60 \\times 10^{-19} \\times 2000}{1.67 \\times 10^{-27}} = \\thc{1.92 \\times 10^{11}\\ \\text{m/s}^2}'],
        },
      ],
      lines: [
        { say: 'A particle of charge q in a field E feels a force q E. By Newton\'s second law, its acceleration is the force divided by its mass.', show: ['gap', 'gap.lines', 'gap.charge', 'm.0'] },
        { say: 'Let a proton go in a field of 2,000 newtons per coulomb. The force on it never changes, so it speeds up steadily, all the way across.', show: ['gap.force', 'gap.velocity', 'gap.trail'], play: 'gap.go', playDelay: 4 },
        { say: 'Its acceleration is 1.92 times ten to the eleven metres per second squared. A proton has so little mass that its acceleration is enormous, and gravity can be ignored.', show: 'm.1' },
        { say: 'A positive particle accelerates along the field. A negative particle accelerates against it.' },
      ],
    },
    {
      chapter: 'Speed from a potential difference',
      layout: 'center',
      main: [
        gun(260, [-0.03, 0.09, -0.0137, 0.0137]),
        {
          kind: 'math',
          id: 'v',
          size: 'md',
          lines: ['q\\,\\Delta V = \\dfrac{1}{2}mv^2', 'v = \\sqrt{\\dfrac{2 \\times 1.60 \\times 10^{-19} \\times 1000}{9.11 \\times 10^{-31}}} = \\good{1.87 \\times 10^{7}\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'To find the speed a particle gains, energy is quicker than kinematics. A particle that starts from rest loses potential energy, and all of it becomes kinetic energy.', show: ['gun', 'gun.lines', 'gun.charge', 'gun.potential', 'v.0'] },
        { say: 'This electron starts from rest at the negative plate. It is pulled through 1,000 volts, and out through a hole in the positive plate.', show: ['gun.energy', 'gun.velocity', 'gun.trail'], play: 'gun.go', playDelay: 2 },
        { say: 'Solve the equation for the speed: 1.87 times ten to the seven metres per second. That is about six percent of the speed of light.', show: 'v.1' },
      ],
    },
    {
      chapter: 'The gap does not matter',
      layout: 'center',
      main: [gun(360, [-0.03, 0.09, -0.019, 0.019]), { kind: 'text', id: 'only', md: 'The speed depends on the **potential difference**, not on the distance between the plates.' }],
      lines: [
        { say: 'Here is the same electron again, leaving at 1.87 times ten to the seven metres per second.', show: ['gun', 'gun.lines', 'gun.charge', 'gun.potential', 'gun.energy', 'gun.velocity', 'gun.trail'], play: 'gun.go' },
        { say: 'Now push the plates closer together, keep the 1,000 volts, and let it go again. The field is stronger, so the acceleration is larger. But it acts over a shorter distance.', play: 'gun.near', playDelay: 1 },
        { say: 'The electron leaves at exactly the same speed. The distance between the plates is not in the equation. Only the potential difference matters.', show: 'only' },
      ],
    },
    {
      chapter: 'Across the field',
      layout: 'center',
      main: [across(340, [-0.02, 0.1, -0.018, 0.018])],
      lines: [
        { say: 'Now fire an electron along the gap between two level plates. The field points straight down, so the force on the electron is straight up.', show: ['beam', 'beam.lines', 'beam.charge'] },
        { say: 'Along the plates there is no force, so its speed that way never changes. Across the plates it has a constant acceleration. It behaves like a ball thrown horizontally, and it follows a parabola.', show: ['beam.trail', 'beam.velocity'], play: 'beam.go', playDelay: 3 },
        { say: 'The straight row of dots shows where it would have gone with no field. Past the plates there is no force, and it carries on in a straight line.' },
      ],
    },
    {
      chapter: 'The deflection',
      layout: 'center',
      main: [
        across(204, [-0.02, 0.1, -0.0108, 0.0108]),
        {
          kind: 'math',
          id: 'd',
          size: 'md',
          lines: [
            't = \\dfrac{0.060}{2.0 \\times 10^{7}} = 3.0 \\times 10^{-9}\\ \\text{s}',
            'a = \\dfrac{qE}{m} = \\dfrac{1.60 \\times 10^{-19} \\times 4000}{9.11 \\times 10^{-31}} = 7.03 \\times 10^{14}\\ \\text{m/s}^2',
            'y = \\tfrac{1}{2}at^2 = \\tfrac{1}{2} \\times 7.03 \\times 10^{14} \\times (3.0 \\times 10^{-9})^2 = \\thc{3.2\\ \\text{mm}}',
          ],
        },
      ],
      lines: [
        { say: 'How far is it deflected? The plates are 6.0 centimetres long, and the electron enters at 2.0 times ten to the seven metres per second. So it spends 3.0 nanoseconds between them.', show: ['beam', 'beam.lines', 'beam.charge', 'beam.trail', 'd.0'], play: 'beam.go', playDelay: 2 },
        { say: 'The field is 4,000 newtons per coulomb, so its acceleration is q E over m: 7.03 times ten to the fourteen metres per second squared, upward.', show: 'd.1' },
        { say: 'It starts with no upward velocity, so the distance is one half a t squared. The electron is deflected 3.2 millimetres upward.', show: 'd.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An alpha particle has a charge of $3.2 \\times 10^{-19}$ C and a mass of $6.6 \\times 10^{-27}$ kg. What is its acceleration in a uniform field of 3300 N/C?',
          choices: ['$1.1 \\times 10^{-15}$ m/s²', '$6.3 \\times 10^{-12}$ m/s²', '$4.8 \\times 10^{7}$ m/s²', '$1.6 \\times 10^{11}$ m/s²'],
          answer: 3,
          working: '$a = \\dfrac{qE}{m} = \\dfrac{3.2 \\times 10^{-19} \\times 3300}{6.6 \\times 10^{-27}} = 1.6 \\times 10^{11}$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. An alpha particle has a charge of 3.2 times ten to the negative nineteen coulombs, and a mass of 6.6 times ten to the negative twenty-seven kilograms. What is its acceleration in a uniform field of 3,300 newtons per coulomb? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The force is q E: 3.2 times ten to the negative nineteen, times 3,300. Divide it by the mass, and the acceleration is 1.6 times ten to the eleven metres per second squared. That is choice D.', show: 'q.answer' },
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
            'In a uniform field the acceleration is constant: $a = \\dfrac{qE}{m}$',
            'From rest through a potential difference: $q\\,\\Delta V = \\dfrac{1}{2}mv^2$',
            'The speed gained does **not** depend on the distance between the plates',
            'A charge that enters across the field follows a **parabola**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a uniform field, a charged particle has a constant acceleration: q E over m.', show: 'sum.0' },
        { say: 'A particle that starts from rest and moves through a potential difference turns its potential energy into kinetic energy.', show: 'sum.1' },
        { say: 'The speed it gains does not depend on the distance between the plates.', show: 'sum.2' },
        { say: 'And a charge that enters across the field keeps its speed along the plates, and follows a parabola.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
