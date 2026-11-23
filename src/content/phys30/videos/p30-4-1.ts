import type { AlphasEl, CathodeEl, Explainer } from '@/video/script.ts';

// Lesson 4.1, first part: cathode rays. Every picture is a cathode ray tube drawn to scale
// (src/video/cathode.ts): the rays cross it only once the air is pumped out, a metal cross casts a
// sharp shadow, a paddle wheel is pushed along its rails, and the path of a narrow beam between
// charged plates or through a magnetic field is worked out from the force on each electron.

const tube = (id: string, height: number, clips: CathodeEl['clips'], more: Partial<CathodeEl> = {}): CathodeEl => ({ kind: 'cathode', id, height, clips, ...more });

/** A tube full of air, which is then pumped out: the rays cross it only when it is nearly empty. */
const glow = tube('glow', 440, { a: { phases: [{ dur: 12.6 }] }, on: { phases: [{ dur: 1.5 }, { dur: 9.8, on: true }] }, pump: { phases: [{ dur: 1 }, { dur: 6, air: 0 }, { dur: 3.4 }] }, d: { phases: [{ dur: 4.3 }] } }, { speed: 2.0e7, off: true, air: 1 });

/** A metal cross in a broad beam: its shadow on the end of the tube is sharp. */
const shadow = tube('sh', 440, { up: { phases: [{ dur: 4.5 }, { dur: 2.5, stand: true }, { dur: 7.3 }] }, down: { phases: [{ dur: 0.4 }, { dur: 2.3, stand: false }, { dur: 2 }] } }, { picture: 'shadow', flat: true, scale: 36, left: 50 });

/** A paddle wheel on rails: the rays push it away from the cathode. */
const wheel = tube('pw', 440, { go: { phases: [{ dur: 4.5 }, { dur: 7.6, on: true }] }, on: { phases: [{ dur: 7.8 }] } }, { picture: 'wheel', off: true });

/** A narrow beam between two charged plates: it bends towards the positive one. */
const plates = tube(
  'pl',
  440,
  { up: { phases: [{ dur: 3.5 }, { dur: 3.5, field: 8.0e3 }, { dur: 2.5 }] }, swap: { phases: [{ dur: 0.5 }, { dur: 4, field: -8.0e3 }, { dur: 3.3 }] }, none: { phases: [{ dur: 1 }, { dur: 3, field: 0 }, { dur: 5.1 }] } },
  { speed: 2.0e7, field: 0, poster: 'up', posterAt: 1, thumb: ['names', 'straight'] },
);

/** The same beam in a magnetic field, into the page and then out of it. */
const magnet = tube('mg', 440, { in: { phases: [{ dur: 2.5 }, { dur: 3.5, tesla: 0.4e-3 }, { dur: 7 }] }, out: { phases: [{ dur: 0.5 }, { dur: 4, tesla: -0.4e-3 }, { dur: 6.4 }] } }, { speed: 2.0e7, tesla: 0 });

/** The cathode and the gas are changed, and the beam bends just as before. */
const same = tube(
  'sm',
  440,
  { a: { phases: [{ dur: 4.5 }, { dur: 4.5, metal: 'iron', gas: 'hydrogen' }, { dur: 4.5, metal: 'platinum', gas: 'carbon dioxide' }] }, b: { phases: [{ dur: 6, metal: 'aluminium', gas: 'air' }, { dur: 6, metal: 'iron', gas: 'hydrogen' }, { dur: 5.8, metal: 'platinum', gas: 'carbon dioxide' }] } },
  { speed: 2.0e7, field: 8.0e3, metal: 'aluminium', gas: 'air' },
);

/** Thomson's atom: a ball of positive charge with electrons dotted through it (src/video/alphas.ts). */
const pudding: AlphasEl = { kind: 'alphas', id: 'pp', picture: 'pudding', height: 460, clips: { a: { phases: [{ dur: 10.6 }] }, b: { phases: [{ dur: 10.5 }] }, c: { phases: [{ dur: 7 }] } } };

const video: Explainer = {
  id: 'p30-4-1',
  lessonId: 'p30-4-1',
  title: 'Cathode Rays',
  thumbnail: 'pl',
  summary:
    'A glow crosses a glass tube with the air pumped out. See what cathode rays do: a cross casts a sharp shadow, a paddle wheel is pushed along, and the beam bends towards a positive plate and in a magnetic field. They are streams of electrons, a part of every atom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Cathode Rays', subtitle: 'The discovery of the electron' }],
      lines: [
        { say: 'For most of the eighteen hundreds, the atom was thought to be the smallest piece of matter, a tiny solid ball that could not be divided.', caption: 'For most of the 1800s, the atom was thought to be the smallest piece of matter, a tiny solid ball that could not be divided.', show: 'title' },
        { say: 'Then physicists passed electricity through glass tubes, and saw a strange glow.' },
      ],
    },
    {
      chapter: 'A glow in a tube',
      layout: 'center',
      main: [glow],
      lines: [
        { say: 'A cathode ray tube is a sealed glass tube with two metal plates inside. The negative plate is called the cathode, and the positive plate is the anode.', show: ['glow', 'glow.names'], play: 'glow.a' },
        { say: 'A high voltage is connected across them. With air in the tube, nothing gets far. Whatever leaves the cathode strikes gas molecules on the way.', play: 'glow.on' },
        { say: 'So almost all of the air is pumped out. Now rays leave the cathode, cross the tube, and make the far end glow.', play: 'glow.pump' },
        { say: 'They were named cathode rays. But what are they?', play: 'glow.d' },
      ],
    },
    {
      chapter: 'Straight lines',
      layout: 'center',
      main: [shadow],
      lines: [
        { say: 'Experiments showed how the rays behave. First, stand a metal cross in their way. It casts a sharp shadow on the end of the tube, so the rays travel in straight lines.', show: ['sh', 'sh.names', 'sh.face'], play: 'sh.up' },
        { say: 'Fold the cross down, and the whole end glows again.', play: 'sh.down' },
      ],
    },
    {
      chapter: 'Mass and momentum',
      layout: 'center',
      main: [wheel],
      lines: [
        { say: 'Second, put a light paddle wheel in their path. When the voltage is switched on, the wheel starts to turn, and it rolls away from the cathode.', show: ['pw', 'pw.names'], play: 'pw.go' },
        { say: 'Something is pushing it. So the rays are made of particles, which have mass and carry momentum.', play: 'pw.on' },
      ],
    },
    {
      chapter: 'Negative charge',
      layout: 'center',
      main: [plates],
      lines: [
        { say: 'Third, pass a narrow beam between two charged plates. It bends towards the positive plate, and away from the negative one.', show: ['pl', 'pl.names', 'pl.straight'], play: 'pl.up' },
        { say: 'Swap the plates, and the beam bends the other way. So the particles carry a negative charge.', play: 'pl.swap' },
        { say: 'Light and X-rays pass between charged plates without bending. Cathode rays bend, so they cannot be waves of that kind.', play: 'pl.none' },
      ],
    },
    {
      chapter: 'In a magnetic field',
      layout: 'center',
      main: [magnet],
      lines: [
        { say: 'Fourth, a magnetic field deflects them. Here the field points into the page, and the beam bends down, at right angles to the field and to its own motion.', show: ['mg', 'mg.names', 'mg.straight'], play: 'mg.in' },
        { say: 'Turn the field round, and the beam bends up. This is exactly what the hand rule of Unit 2 predicts for moving negative charges.', play: 'mg.out' },
      ],
    },
    {
      chapter: 'Always the same',
      layout: 'center',
      main: [same],
      lines: [
        { say: 'Last, the rays are the same whatever metal the cathode is made of, and whatever gas is left in the tube. The beam bends by the same amount every time.', show: ['sm', 'sm.names', 'sm.straight', 'sm.made'], play: 'sm.a' },
        { say: 'In eighteen ninety-seven, J. J. Thomson measured the ratio of the charge of the particles to their mass. He found the same value for every metal and every gas, so the particles had to be a part of every atom.', caption: 'In 1897, J. J. Thomson measured the ratio of the charge of the particles to their mass. He found the same value for every metal and every gas, so the particles had to be a part of every atom.', play: 'sm.b' },
      ],
    },
    {
      chapter: 'The electron',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Particle', 'Charge-to-mass ratio'],
          rows: [
            ['The particles of cathode rays', '$1.76 \\times 10^{11}$ C/kg'],
            ['A hydrogen ion, the lightest ion', '$9.58 \\times 10^{7}$ C/kg'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cathode rays', md: 'Cathode rays are streams of fast **electrons**. Each electron has a negative charge, and a mass about 1800 times smaller than the mass of the lightest atom.' },
      ],
      lines: [
        { say: 'The ratio was about 1,800 times larger than the ratio for a hydrogen ion, which is the lightest ion.', show: ['t', 't.0', 't.1'] },
        { say: 'The two carry charges of the same size. So the new particle had to have only about one eighteen-hundredth of the mass.', caption: 'The two carry charges of the same size. So the new particle had to have only about 1/1800 of the mass.' },
        { say: 'It was named the electron. Cathode rays are streams of fast electrons.', show: 'def' },
      ],
    },
    {
      chapter: "Thomson's atom",
      layout: 'center',
      main: [pudding],
      lines: [
        { say: 'So atoms have parts. But an atom has no charge overall, so the negative electrons must be balanced by positive charge somewhere.', show: 'pp', play: 'pp.a' },
        { say: 'Thomson pictured the atom as a soft ball of positive charge, with the electrons dotted through it, like raisins in a bun.', show: 'pp.names', play: 'pp.b' },
        { say: 'It is called the plum pudding model. The next lesson puts it to the test.', play: 'pp.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Cathode rays pass between two charged plates. Which way do they bend, and what does that show?',
          choices: ['Towards the negative plate, so they are positive', 'Towards the positive plate, so they are negative', 'They do not bend, so they are waves', 'Towards the positive plate, so they are positive'],
          answer: 1,
          working: 'Opposite charges attract. The rays bend **towards the positive plate**, so the particles in them are **negative**.',
        },
      ],
      lines: [
        { say: 'Your turn. Cathode rays pass between two charged plates. Which way do they bend, and what does that show? Pause the video and think about it.', show: 'q', wait: 6 },
        { say: 'Opposite charges attract. The rays bend towards the positive plate, so the particles in them are negative. That is choice "B".', caption: 'Opposite charges attract. The rays bend towards the positive plate, so the particles in them are negative. That is choice B.', show: 'q.answer' },
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
            'Cathode rays leave the **cathode** and travel in straight lines',
            'They push a paddle wheel, so they are particles with **mass** and **momentum**',
            'They bend towards a positive plate, so they are **negative**',
            'They are the same for every metal and gas: **electrons** are a part of every atom',
            'Thomson pictured the atom as a ball of positive charge with electrons dotted through it',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Cathode rays leave the cathode, and travel in straight lines.', show: 'sum.0' },
        { say: 'They push a paddle wheel, so they are particles with mass and momentum.', show: 'sum.1' },
        { say: 'They bend towards a positive plate, so they carry a negative charge.', show: 'sum.2' },
        { say: 'They are the same for every metal and every gas. They are electrons, and electrons are a part of every atom.', show: 'sum.3' },
        { say: 'And Thomson pictured the atom as a ball of positive charge, with the electrons dotted through it.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
