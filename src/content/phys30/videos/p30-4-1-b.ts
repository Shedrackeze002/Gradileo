import type { CathodeEl, ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 4.1, second part: the charge-to-mass ratio. The tube is drawn to scale and the path of
// its beam is worked out from the electric and the magnetic force on each electron
// (src/video/cathode.ts), with q/m = 1.76 × 10¹¹ C/kg: the beam goes straight when v = E ÷ B, and
// with the electric field off it follows a circle of radius v ÷ (B q/m). The particles that go
// right round a circle are turned step by step by the force qvB (src/video/charges.ts).

const CM = { metres: 0.01, symbol: 'cm' };
/** The mass that the lesson's ratio gives the electron: 1.60 × 10⁻¹⁹ C ÷ 1.76 × 10¹¹ C/kg. */
const ELECTRON = 1.6e-19 / 1.76e11;
const PROTON = 1.6e-19 / 9.58e7;

const tube = (id: string, height: number, clips: CathodeEl['clips'], more: Partial<CathodeEl> = {}): CathodeEl => ({ kind: 'cathode', id, height, clips, ...more });

/** Step 1: the electric field bends the beam up, and the magnetic field brings it back to a straight line. */
const balance = tube(
  'sp',
  360,
  { e: { phases: [{ dur: 4 }, { dur: 4, field: 3.0e4 }, { dur: 2.4 }] }, b: { phases: [{ dur: 6 }, { dur: 5, tesla: 1.5e-3 }, { dur: 2.5 }] }, c: { phases: [{ dur: 13 }] }, d: { phases: [{ dur: 13.5 }] } },
  { speed: 2.0e7, field: 0, tesla: 0, scale: 40, poster: 'b', posterAt: 1, thumb: ['names', 'force', 'straight'] },
);

/** Step 2: with the electric field off, the beam follows part of a circle. */
const circle = tube('ci', 460, { off: { phases: [{ dur: 4 }, { dur: 4, field: 0 }, { dur: 5.9 }] }, b: { phases: [{ dur: 6.1 }] }, c: { phases: [{ dur: 12.2 }] } }, { speed: 2.0e7, field: 3.0e4, tesla: 1.5e-3, scale: 34, left: 50, axis: 0.36 });

/** An electron in the same field of 1.50 mT, with room to go right round: a circle of radius 7.58 cm. */
const ring: ChargesEl = {
  kind: 'charges',
  id: 'ring',
  view: [-0.345, 0.345, -0.1, 0.1],
  height: 330,
  unit: 'e',
  length: CM,
  magnetic: { tesla: 1.5e-3, figures: 3 },
  figures: 3,
  plain: true,
  velocityScale: 60 / 2.0e7,
  speedFigures: 3,
  rate: (2 * Math.PI) / (1.76e11 * 1.5e-3) / 6,
  bodies: [{ id: 'e', charge: -1, x: 0, y: -2.0e7 / (1.76e11 * 1.5e-3), mass: ELECTRON, v: [2.0e7, 0] }],
  clips: { go: { phases: [{ dur: 9.1, fly: true }] }, a: { phases: [{ dur: 14.3, fly: true }] }, b: { phases: [{ dur: 5.6, fly: true }] }, c: { phases: [{ dur: 12.2, fly: true }] }, d: { phases: [{ dur: 10.9, fly: true }] } },
};

/** Unknown particles at 3.00 × 10⁶ m/s in 0.250 T (into the page): a circle of radius 12.5 cm. */
const unknown: ChargesEl = {
  kind: 'charges',
  id: 'un',
  view: [-0.19, 0.19, -0.165, 0.157],
  height: 440,
  unit: 'e',
  length: CM,
  magnetic: { tesla: -0.25, figures: 3 },
  figures: 3,
  plain: true,
  velocityScale: 60 / 3.0e6,
  speedFigures: 3,
  rate: (2 * Math.PI) / (9.58e7 * 0.25) / 6,
  bodies: [{ id: 'p', charge: 1, x: 0, y: -3.0e6 / (9.58e7 * 0.25), mass: PROTON, v: [3.0e6, 0], label: '?' }],
  clips: { a: { phases: [{ dur: 20, fly: true }] }, b: { phases: [{ dur: 6.5, fly: true }] }, c: { phases: [{ dur: 19.1, fly: true }] } },
};

/** Electrons accelerated from rest through 500 V, then bent by a field of 1.00 mT: a radius of 7.54 cm. */
const fromRest = tube('ac', 460, { a: { phases: [{ dur: 12.6 }] }, b: { phases: [{ dur: 1.5 }, { dur: 4, tesla: 1.0e-3 }, { dur: 2.4 }] }, c: { phases: [{ dur: 11.8 }] } }, { volts: 500, tesla: 0, scale: 34, left: 50, axis: 0.36 });

const video: Explainer = {
  id: 'p30-4-1-b',
  lessonId: 'p30-4-1',
  title: 'The Charge-to-Mass Ratio',
  thumbnailTitle: 'Charge-to-Mass Ratio',
  thumbnail: 'sp',
  summary:
    'Thomson could not weigh an electron, but he could steer a beam of them. See his two steps: crossed electric and magnetic fields give the speed, v = E ÷ B, and the circle in a magnetic field gives q ÷ m = v ÷ Br. Then use the ratio to name a particle, and find the mass of the electron.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'The Charge-to-Mass Ratio', subtitle: "Thomson's two steps" }],
      lines: [
        { say: 'Thomson could not weigh one electron, or measure its charge. What he could do was steer a beam of them with fields.', show: 'title' },
        { say: 'And the way a charged particle steers depends on the ratio of its charge to its mass.' },
      ],
    },
    {
      chapter: 'Step 1: the speed',
      layout: 'center',
      main: [balance, { kind: 'math', id: 'm1', size: 'md', lines: ['\\opp{qE} = \\hyp{qvB} \\qquad \\text{so} \\qquad v = \\thc{\\dfrac{E}{B}}'] }, { kind: 'math', id: 'm2', size: 'md', lines: ['v = \\dfrac{3.00 \\times 10^{4}}{1.50 \\times 10^{-3}} = \\thc{2.00 \\times 10^{7}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step one finds the speed of the beam. Thomson passed it through an electric field, which pushes each electron towards the positive plate.', show: ['sp', 'sp.names', 'sp.values', 'sp.force', 'sp.straight'], play: 'sp.e' },
        { say: 'Then he added a magnetic field at right angles, so that the magnetic force on each electron pointed the opposite way. He adjusted the fields until the beam went straight.', play: 'sp.b' },
        { say: 'The two forces are then equal in size. q E equals q v B. The charge cancels, so the speed is the electric field divided by the magnetic field.', caption: 'The two forces are then equal in size: qE = qvB. The charge cancels, so the speed is the electric field divided by the magnetic field.', show: 'm1', play: 'sp.c' },
        { say: 'Here, 3.00 times ten to the four volts per metre, divided by 1.50 times ten to the negative three teslas, gives 2.00 times ten to the seven metres per second.', caption: 'Here, 3.00 × 10⁴ V/m divided by 1.50 × 10⁻³ T gives 2.00 × 10⁷ m/s.', hide: 'm1', show: ['m2', 'sp.speed'], play: 'sp.d' },
      ],
    },
    {
      chapter: 'Step 2: the circle',
      layout: 'center',
      main: [circle, { kind: 'math', id: 'm3', size: 'md', lines: ['\\hyp{qvB} = \\dfrac{mv^2}{r} \\qquad \\text{so} \\qquad \\thc{\\dfrac{q}{m} = \\dfrac{v}{Br}}'] }],
      lines: [
        { say: 'Step two. With the electric field turned off, only the magnetic force acts. It is always at right angles to the motion, so the beam bends into part of a circle.', show: ['ci', 'ci.names', 'ci.values', 'ci.speed', 'ci.force'], play: 'ci.off' },
        { say: 'The radius of that circle can be measured. Here it is 7.58 centimetres.', caption: 'The radius of that circle can be measured. Here it is 7.58 cm.', show: 'ci.circle', play: 'ci.b' },
        { say: 'The magnetic force is the centripetal force. So q v B equals m v squared over r, and the charge-to-mass ratio is v divided by B r.', caption: 'The magnetic force is the centripetal force. So qvB = mv² ÷ r, and the charge-to-mass ratio is v ÷ Br.', show: 'm3', play: 'ci.c' },
      ],
    },
    {
      chapter: "Thomson's result",
      layout: 'center',
      main: [
        ring,
        { kind: 'math', id: 'w1', size: 'md', lines: ['\\dfrac{q}{m} = \\dfrac{v}{Br} = \\dfrac{2.00 \\times 10^{7}}{1.50 \\times 10^{-3} \\times 0.0758} = \\thc{1.76 \\times 10^{11}\\ \\text{C/kg}}'] },
        { kind: 'math', id: 'w2', size: 'md', lines: ['m = \\dfrac{q}{q/m} = \\dfrac{1.60 \\times 10^{-19}}{1.76 \\times 10^{11}} = \\thc{9.09 \\times 10^{-31}\\ \\text{kg}}'] },
      ],
      lines: [
        { say: 'In a field that is wide enough, an electron goes right round the circle. Thomson\'s numbers give its charge-to-mass ratio.', show: ['ring', 'ring.magnetic', 'ring.velocity', 'ring.trail', 'ring.radius'], play: 'ring.go' },
        { say: 'The speed is 2.00 times ten to the seven metres per second, the field is 1.50 milliteslas, and the radius is 0.0758 metres. Change centimetres to metres before you use the equation.', caption: 'The speed is 2.00 × 10⁷ m/s, the field is 1.50 mT, and the radius is 0.0758 m. Change centimetres to metres before you use the equation.', show: 'w1', play: 'ring.a' },
        { say: 'The ratio is 1.76 times ten to the eleven coulombs per kilogram.', caption: 'The ratio is 1.76 × 10¹¹ C/kg.', play: 'ring.b' },
        { say: 'This holds the charge and the mass only as a ratio. In nineteen oh nine, Robert Millikan measured the charge of the electron with his oil drops.', caption: 'This holds the charge and the mass only as a ratio. In 1909, Robert Millikan measured the charge of the electron with his oil drops.', play: 'ring.c' },
        { say: 'With the charge known, the mass follows. It is the charge divided by the ratio, about 9.1 times ten to the negative 31 kilograms.', caption: 'With the charge known, the mass follows. It is the charge divided by the ratio, about 9.1 × 10⁻³¹ kg.', hide: 'w1', show: 'w2', play: 'ring.d' },
      ],
    },
    {
      chapter: 'Which particle is it?',
      layout: 'split',
      leftWidth: 500,
      left: [unknown],
      right: [
        { kind: 'math', id: 'u1', size: 'md', lines: ['\\dfrac{q}{m} = \\dfrac{v}{Br} = \\dfrac{3.00 \\times 10^{6}}{0.250 \\times 0.125}', '= \\thc{9.60 \\times 10^{7}\\ \\text{C/kg}}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Particle', 'Charge-to-mass ratio'],
          rows: [
            ['Electron', '$1.76 \\times 10^{11}$ C/kg'],
            ['Proton', '$9.58 \\times 10^{7}$ C/kg'],
            ['Alpha particle', '$4.82 \\times 10^{7}$ C/kg'],
          ],
        },
      ],
      lines: [
        { say: 'Each kind of particle has its own charge-to-mass ratio, so the ratio works like a name tag. Here, unknown particles move at 3.00 times ten to the six metres per second in a field of 0.250 teslas, and follow a circle of radius 12.5 centimetres.', caption: 'Each kind of particle has its own charge-to-mass ratio, so the ratio works like a name tag. Here, unknown particles move at 3.00 × 10⁶ m/s in a field of 0.250 T, and follow a circle of radius 12.5 cm.', show: ['un', 'un.magnetic', 'un.velocity', 'un.trail', 'un.radius'], play: 'un.a' },
        { say: 'v over B r gives 9.60 times ten to the seven coulombs per kilogram.', caption: 'v ÷ Br gives 9.60 × 10⁷ C/kg.', show: 'u1', play: 'un.b' },
        { say: 'That matches the proton. Its ratio is about 1,800 times smaller than the electron\'s, so at the same speed and in the same field, a proton moves in a far larger circle. And its charge is positive, so it curves the opposite way.', show: ['t', 't.0', 't.1', 't.2'], focus: 't.1', play: 'un.c' },
      ],
    },
    {
      chapter: 'Starting from rest',
      layout: 'center',
      main: [fromRest, { kind: 'math', id: 'r1', size: 'md', lines: ['qV = \\tfrac{1}{2}mv^2 \\qquad \\text{and} \\qquad \\dfrac{q}{m} = \\dfrac{v}{Br} \\qquad \\text{give} \\qquad \\thc{\\dfrac{q}{m} = \\dfrac{2V}{B^2r^2}}'] }],
      lines: [
        { say: 'Sometimes the speed is not measured. The particles start from rest, and are accelerated through a voltage V, so each one gains a kinetic energy of q V.', caption: 'Sometimes the speed is not measured. The particles start from rest, and are accelerated through a voltage V, so each one gains a kinetic energy of qV.', show: ['ac', 'ac.names', 'ac.values'], play: 'ac.a' },
        { say: 'Then a magnetic field bends them into a circle. Putting the two equations together removes the speed.', show: ['ac.circle', 'r1'], play: 'ac.b' },
        { say: 'Here, 500 volts, 1.00 millitesla, and a radius of 7.54 centimetres give 1.76 times ten to the eleven coulombs per kilogram. So these particles are electrons.', caption: 'Here, 500 V, 1.00 mT and a radius of 7.54 cm give 1.76 × 10¹¹ C/kg. So these particles are electrons.', play: 'ac.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A beam goes straight through crossed electric and magnetic fields. The magnetic field is made twice as strong. What must happen to the electric field to keep the same beam straight?',
          choices: ['It must be halved', 'It must stay the same', 'It must be doubled', 'It must be four times as strong'],
          answer: 2,
          working: 'The beam is straight when $v = \\dfrac{E}{B}$. The speed has not changed, so if $B$ is doubled, $E$ must be **doubled** as well.',
        },
      ],
      lines: [
        { say: 'Your turn. A beam goes straight through crossed electric and magnetic fields. The magnetic field is made twice as strong. What must happen to the electric field to keep the same beam straight? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The beam is straight when its speed is E divided by B. The speed has not changed, so if B is doubled, E must be doubled as well. That is choice "C".', caption: 'The beam is straight when its speed is E ÷ B. The speed has not changed, so if B is doubled, E must be doubled as well. That is choice C.', show: 'q.answer' },
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
            'A beam goes straight through crossed fields when $v = \\dfrac{E}{B}$',
            'In a magnetic field alone it moves in a circle, and $\\dfrac{q}{m} = \\dfrac{v}{Br}$',
            'From rest through a voltage $V$: $\\dfrac{q}{m} = \\dfrac{2V}{B^2r^2}$',
            'Each particle has its own ratio: the electron\'s is $1.76 \\times 10^{11}$ C/kg',
            'With Millikan\'s charge, the mass of the electron is about $9.1 \\times 10^{-31}$ kg',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A beam goes straight through crossed fields when its speed is E divided by B.', caption: 'Here is what to remember. A beam goes straight through crossed fields when its speed is E ÷ B.', show: 'sum.0' },
        { say: 'In a magnetic field alone it moves in a circle, and the charge-to-mass ratio is v divided by B r.', caption: 'In a magnetic field alone it moves in a circle, and the charge-to-mass ratio is v ÷ Br.', show: 'sum.1' },
        { say: 'For a beam accelerated from rest through a voltage V, the ratio is 2 V divided by B squared r squared.', caption: 'For a beam accelerated from rest through a voltage V, the ratio is 2V ÷ B²r².', show: 'sum.2' },
        { say: 'Each kind of particle has its own ratio. The electron\'s is 1.76 times ten to the eleven coulombs per kilogram.', caption: 'Each kind of particle has its own ratio. The electron\'s is 1.76 × 10¹¹ C/kg.', show: 'sum.3' },
        { say: 'And with Millikan\'s charge, that gives the mass of the electron.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
