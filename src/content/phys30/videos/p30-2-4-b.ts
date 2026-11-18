import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.4, second half: the uniform field between parallel plates. The field in the gap is the
// potential difference divided by the distance between the plates (src/video/charges.ts), so the
// violet arrow doubles when the plates are pushed to half the distance, and the proton's kinetic
// energy is the charge times the potential difference it has fallen through.

const CM = { metres: 0.01, symbol: 'cm' };
const PROTON = 1.67e-27;

/** Plates 3.0 cm apart with 600 V between them, and a proton let go at the positive plate. */
const battery: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.02, 0.055, -0.0108, 0.0084],
  height: 290,
  unit: 'e',
  length: CM,
  rate: 7e-8,
  plates: { at: [0, 0.03], span: [-0.006, 0.006], volts: 600, lines: 5 },
  bodies: [{ id: 'p', charge: 1, x: 0, mass: PROTON }],
  clips: { cross: { phases: [{ dur: 2.5, fly: true }] } },
};

/** The same plates, with a proton as a test charge carried about between them: 20 000 N/C and 3.2 × 10⁻¹⁵ N everywhere. */
const field: ChargesEl = {
  kind: 'charges',
  id: 'plates',
  view: [-0.02, 0.055, -0.0108, 0.0084],
  height: 290,
  unit: 'e',
  length: CM,
  pulls: ['p'],
  forceFigures: 2,
  plates: { at: [0, 0.03], span: [-0.006, 0.006], volts: 600, lines: 5 },
  bodies: [{ id: 'p', charge: 1, x: 0.007, test: true, labelAt: 'left' }],
  poster: 'hold',
  thumb: ['lines', 'field', 'force', 'potential'],
  clips: {
    hold: { phases: [{ dur: 1 }] },
    tour: {
      phases: [
        { dur: 1.4, to: { p: [0.016, 0.003] } },
        { dur: 1.6, to: { p: [0.006, -0.0025] } },
        { dur: 1.4, to: { p: [0.011, 0] } },
      ],
    },
  },
};

/** The negative plate is pushed in, from 3.0 cm away to 1.5 cm, with the same 600 V: the field at P doubles. */
const closer: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.012, 0.043, -0.0105, 0.0077],
  height: 376,
  unit: 'e',
  length: CM,
  fieldScale: 0.0025,
  plates: { at: [0, 0.03], span: [-0.006, 0.006], volts: 600, lines: 5 },
  bodies: [{ id: 'p', charge: 0, x: 0.003, test: true, label: 'P', labelAt: 'left' }],
  clips: { close: { phases: [{ dur: 3, plates: [0, 0.015] }] } },
};

/** The potential falls evenly: 600, 400, 200 and 0 V. A proton let go at the positive plate has 200 eV after 1.0 cm. */
const steps: ChargesEl = {
  kind: 'charges',
  id: 'gap',
  view: [-0.02, 0.055, -0.0099, 0.0099],
  height: 300,
  unit: 'e',
  length: CM,
  rate: 4e-8,
  plates: { at: [0, 0.03], span: [-0.006, 0.006], volts: 600, lines: 5, levels: 2 },
  bodies: [{ id: 'p', charge: 1, x: 0, mass: PROTON }],
  // The proton takes 1.02 × 10⁻⁷ s to move 1.0 cm from rest, with a = qE ÷ m = 1.92 × 10¹² m/s².
  clips: { third: { phases: [{ dur: 2.554, fly: true }] } },
};

const video: Explainer = {
  id: 'p30-2-4-b',
  lessonId: 'p30-2-4',
  title: 'The Field Between Parallel Plates',
  thumbnailTitle: 'Parallel Plates',
  thumbnail: 'plates',
  summary:
    'Two parallel plates joined to a battery have a uniform electric field between them: E = ΔV ÷ d, in volts per metre. See why, find the force on a proton between the plates, push the plates closer to make the field stronger, and follow the potential as it falls evenly across the gap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Field Between Parallel Plates', subtitle: 'Volts per metre' }],
      lines: [
        { say: 'Join two flat metal plates to a battery. One plate becomes positive, and the other becomes negative.', show: 'title' },
        { say: 'Between them is the simplest electric field there is.' },
      ],
    },
    {
      chapter: 'A uniform field',
      layout: 'center',
      main: [battery, { kind: 'math', id: 'm', size: 'md', lines: ['W = qEd', 'W = q\\,\\Delta V', 'E = \\dfrac{\\Delta V}{d}'] }],
      lines: [
        { say: 'Between the plates, the field lines are straight and evenly spaced. The field is uniform. It is the same everywhere.', show: ['gap', 'gap.lines', 'gap.potential'] },
        { say: 'How strong is it? Let a charge, q, move from one plate to the other, a distance d. The force on it is q E all the way, so the work done is q E d.', show: ['gap.charge', 'gap.gap', 'm.0'], play: 'gap.cross', playDelay: 3 },
        { say: 'But the work is also the charge times the potential difference between the plates.', show: 'm.1' },
        { say: 'Set the two equal, and the charge cancels. The field is the potential difference, divided by the distance between the plates.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Volts per metre',
      layout: 'center',
      main: [
        field,
        {
          kind: 'math',
          id: 'e',
          size: 'md',
          lines: ['E = \\dfrac{\\Delta V}{d} = \\dfrac{600}{0.030} = \\brand{20\\,000\\ \\text{V/m}}', 'F = qE = 1.60 \\times 10^{-19} \\times 20\\,000 = \\opp{3.2 \\times 10^{-15}\\ \\text{N}}'],
        },
        { kind: 'text', id: 'metres', md: 'Use **metres**: $600 \\div 3.0 = 200$ is not the field.' },
      ],
      lines: [
        { say: 'These plates are 3.0 centimetres apart, with 600 volts between them. First change the distance to metres: 0.030.', show: ['plates', 'plates.lines', 'plates.potential', 'plates.gap'] },
        { say: '600 divided by 0.030 is 20,000 volts per metre. A volt per metre is the same as a newton per coulomb.', show: ['e.0', 'plates.field'] },
        { say: 'Take care with the units. If you leave the distance in centimetres, you get 200, and that is not the field.', show: 'metres' },
        { say: 'Now put a proton between the plates. The force on it is q E: 3.2 times ten to the negative fifteen newtons, towards the negative plate.', show: ['e.1', 'plates.charge', 'plates.force'] },
        { say: 'Move the proton anywhere between the plates, and the force on it stays the same. That is what a uniform field means.', play: 'plates.tour', playDelay: 0.5, hide: 'plates.field' },
      ],
    },
    {
      chapter: 'Closer plates',
      layout: 'center',
      main: [closer, { kind: 'math', id: 'c', size: 'md', lines: ['E = \\dfrac{600}{0.015} = \\brand{40\\,000\\ \\text{V/m}}'] }],
      lines: [
        { say: 'Here is the field at a point P between the same plates: 20,000 newtons per coulomb.', show: ['gap', 'gap.lines', 'gap.potential', 'gap.gap', 'gap.field'] },
        { say: 'Keep the 600 volts, and push the plates closer together, until they are 1.5 centimetres apart. Watch the field.', play: 'gap.close', playDelay: 1.5 },
        { say: 'The same potential difference across half the distance gives twice the field: 40,000 volts per metre.', show: 'c.0' },
      ],
    },
    {
      chapter: 'Equal steps',
      layout: 'center',
      main: [steps, { kind: 'math', id: 's', size: 'md', lines: ['\\dfrac{1.0}{3.0} \\times 600 = \\thc{200\\ \\text{V}}'] }, { kind: 'text', id: 'gain', md: 'One elementary charge through 200 V gains **200 eV**.' }],
      lines: [
        { say: 'Because the field is uniform, the potential falls evenly from one plate to the other: 600 volts, 400, 200, and zero.', show: ['gap', 'gap.lines', 'gap.potential', 'gap.charge'] },
        { say: 'Let a proton go at the positive plate, and stop the clock when it has moved 1.0 centimetre. It has crossed a third of the gap, so it has moved through a third of 600 volts. That is 200 volts.', show: ['gap.energy', 'gap.velocity', 's.0'], play: 'gap.third', playDelay: 1.5 },
        { say: 'One elementary charge that moves through 200 volts gains 200 electronvolts of kinetic energy.', show: 'gain' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two parallel plates are 2.0 cm apart, with a potential difference of 500 V between them. What is the electric field between the plates?',
          choices: ['10 V/m', '250 V/m', '25 000 V/m', '1000 V/m'],
          answer: 2,
          working: 'Change to metres: $d = 0.020$ m. $E = \\dfrac{\\Delta V}{d} = \\dfrac{500}{0.020} = 25\\,000$ V/m.',
        },
      ],
      lines: [
        { say: 'Your turn. Two parallel plates are 2.0 centimetres apart, with a potential difference of 500 volts between them. What is the electric field between the plates? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Change the distance to metres: 0.020. Then 500 divided by 0.020 is 25,000 volts per metre. That is choice C.', show: 'q.answer' },
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
            'Between parallel plates the field is **uniform**: the same everywhere',
            '$E = \\dfrac{\\Delta V}{d}$, with the distance in **metres**',
            '1 V/m is the same as 1 N/C',
            'Closer plates, or more volts, give a **stronger** field',
            'The potential falls **evenly** from one plate to the other',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Between parallel plates the field is uniform. It is the same everywhere.', show: 'sum.0' },
        { say: 'The field is the potential difference divided by the distance between the plates, with the distance in metres.', show: 'sum.1' },
        { say: 'A volt per metre is the same as a newton per coulomb.', show: 'sum.2' },
        { say: 'Closer plates, or more volts, give a stronger field.', show: 'sum.3' },
        { say: 'And the potential falls evenly from one plate to the other.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
