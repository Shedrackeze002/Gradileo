import type { Explainer, MatterEl } from '@/video/script.ts';

// Lesson 3.8, first part: matter waves. The pictures are true to their numbers
// (src/video/matter.ts): the wave drawn round each particle has the wavelength h ÷ mv, to the
// scale of the ruler, so it shortens as the particle speeds up, and a baseball's is far too short
// to draw at all.

const wave = (id: string, height: number, clips: MatterEl['clips'], more: Partial<MatterEl> = {}): MatterEl => ({ kind: 'matter', id, picture: 'wave', height, clips, ...more });

/** An electron that speeds up and slows down: its wave shortens and lengthens. */
const idea = wave('db', 340, { a: { phases: [{ dur: 13.9 }] }, b: { phases: [{ dur: 14.3 }] }, faster: { phases: [{ dur: 2.5 }, { dur: 5.5, speed: 4.5e6 }, { dur: 2 }] }, slower: { phases: [{ dur: 0.6 }, { dur: 3, speed: 1.5e6 }, { dur: 0.7 }] } }, { speed: 1.5e6, poster: 'b', thumb: ['names', 'values', 'wavelength'] });

/** The lesson's electron: 2.0 × 10⁶ m/s, with a ruler and an atom to the same scale. */
const electron = wave('el', 320, { a: { phases: [{ dur: 14.8 }] }, b: { phases: [{ dur: 10.4 }] }, c: { phases: [{ dur: 8.7 }] }, d: { phases: [{ dur: 6.5 }] } }, { speed: 2.0e6 });

/** A baseball: 0.145 kg at 40 m/s. */
const baseball = wave('bb', 300, { a: { phases: [{ dur: 6.9 }] }, b: { phases: [{ dur: 6.5 }] }, c: { phases: [{ dur: 19.1 }] } }, { body: { name: 'Baseball', mass: 0.145 }, speed: 40 });

/** An electron accelerated from rest through 150 V, and then through more. */
const gun = wave('ac', 290, { a: { phases: [{ dur: 13.5 }] }, b: { phases: [{ dur: 14.8 }] }, c: { phases: [{ dur: 7.8 }] }, more: { phases: [{ dur: 0.6 }, { dur: 3.4, volts: 600 }, { dur: 1.2 }] } }, { volts: 150, scale: 600 });

/** An electron with 54 eV of kinetic energy. */
const energy = wave('ke', 270, { a: { phases: [{ dur: 10 }] }, b: { phases: [{ dur: 15.6 }] }, c: { phases: [{ dur: 11.8 }] } }, { volts: 54, scale: 400 });

const video: Explainer = {
  id: 'p30-3-8',
  lessonId: 'p30-3-8',
  title: 'Matter Waves',
  thumbnail: 'db',
  summary:
    'In 1924 Louis de Broglie proposed that every moving particle has a wavelength. See the wave of an electron shorten as it speeds up, find the de Broglie wavelength of an electron and of a baseball, and work out the wavelength of an electron from the voltage that accelerated it or from its kinetic energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Matter Waves', subtitle: 'Every moving particle has a wavelength' }],
      lines: [
        { say: 'This unit has reached an odd place. Young\'s fringes prove that light is a wave. The photoelectric effect and the Compton effect prove that light is a stream of particles.', show: 'title' },
        { say: 'In nineteen twenty-four, a French student, Louis de Broglie, made the puzzle deeper with a bold guess. If waves can behave as particles, then perhaps particles, such as electrons, can behave as waves.', caption: 'In 1924, a French student, Louis de Broglie, made the puzzle deeper with a bold guess. If waves can behave as particles, then perhaps particles, such as electrons, can behave as waves.' },
      ],
    },
    {
      chapter: 'De Broglie\'s idea',
      layout: 'center',
      main: [idea, { kind: 'math', id: 'm', size: 'md', lines: ['p = \\dfrac{h}{\\lambda} \\quad\\Rightarrow\\quad \\lambda = \\dfrac{h}{p}', '\\lambda = \\dfrac{h}{p} = \\brand{\\dfrac{h}{mv}}'] }],
      lines: [
        { say: 'De Broglie started from the momentum of a photon, h divided by lambda. Turned round, it gives the wavelength of a photon from its momentum: lambda equals h divided by p.', caption: 'De Broglie started from the momentum of a photon, h ÷ λ. Turned round, it gives the wavelength of a photon from its momentum: λ = h ÷ p.', show: ['db', 'db.names', 'm.0'], play: 'db.a' },
        { say: 'He proposed that the same equation gives a wavelength to any moving particle. For a particle with mass, the momentum is m v, so the wavelength is h divided by m v.', caption: 'He proposed that the same equation gives a wavelength to any moving particle. For a particle with mass, the momentum is mv, so the wavelength is h ÷ mv.', show: ['m.1', 'db.values', 'db.wavelength'], play: 'db.b' },
        { say: 'Here is an electron with its wave. Watch what happens as it speeds up. The greater the momentum, the shorter the wavelength.', show: 'db.momentum', play: 'db.faster' },
        { say: 'And when it slows down again, its wavelength grows.', play: 'db.slower' },
      ],
    },
    {
      chapter: 'The wavelength of an electron',
      layout: 'center',
      main: [electron, { kind: 'math', id: 'e', size: 'md', lines: ['\\lambda = \\dfrac{h}{mv} = \\dfrac{6.63 \\times 10^{-34}}{9.11 \\times 10^{-31} \\times 2.0 \\times 10^{6}} = \\brand{3.64 \\times 10^{-10}\\text{ m}}'] }],
      lines: [
        { say: 'Let\'s find the wavelength of an electron that moves at 2.0 times ten to the six metres per second. The mass of an electron is 9.11 times ten to the negative 31 kilograms.', caption: 'Let\'s find the wavelength of an electron that moves at 2.0 × 10⁶ m/s. The mass of an electron is 9.11 × 10⁻³¹ kg.', show: ['el', 'el.names', 'el.values'], play: 'el.a' },
        { say: 'Lambda equals h divided by m v. That is 6.63 times ten to the negative 34, divided by the mass times the speed.', caption: 'λ = h ÷ mv. That is 6.63 × 10⁻³⁴, divided by the mass times the speed.', show: 'e.0', play: 'el.b' },
        { say: 'The wavelength is 3.64 times ten to the negative ten metres, which is about a third of a nanometre.', caption: 'The wavelength is 3.64 × 10⁻¹⁰ m, which is about a third of a nanometre.', show: ['el.wavelength', 'el.scale'], play: 'el.c' },
        { say: 'That is about the size of an atom, and about the wavelength of X-rays.', show: 'el.atom', play: 'el.d' },
      ],
    },
    {
      chapter: 'The wavelength of a baseball',
      layout: 'center',
      main: [baseball, { kind: 'math', id: 'b', size: 'md', lines: ['\\lambda = \\dfrac{h}{mv} = \\dfrac{6.63 \\times 10^{-34}}{0.145 \\times 40} = \\brand{1.14 \\times 10^{-34}\\text{ m}}'] }],
      lines: [
        { say: 'Now a baseball, with a mass of 0.145 kilograms, thrown at 40 metres per second.', caption: 'Now a baseball, with a mass of 0.145 kg, thrown at 40 m/s.', show: ['bb', 'bb.names', 'bb.values'], play: 'bb.a' },
        { say: 'h divided by m v gives 1.14 times ten to the negative 34 metres.', caption: 'h ÷ mv gives 1.14 × 10⁻³⁴ m.', show: ['b.0', 'bb.wavelength'], play: 'bb.b' },
        { say: 'That is far smaller than the nucleus of an atom. A wave only diffracts noticeably at a gap about as wide as its wavelength, and nothing has a gap that small. This is why we never notice the wave behaviour of everyday things.', play: 'bb.c' },
      ],
    },
    {
      chapter: 'Electrons that are accelerated',
      layout: 'center',
      main: [
        gun,
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: ['v = \\sqrt{\\dfrac{2eV}{m}} = \\sqrt{\\dfrac{2 \\times 1.60 \\times 10^{-19} \\times 150}{9.11 \\times 10^{-31}}} = 7.26 \\times 10^{6}\\text{ m/s}', '\\lambda = \\dfrac{h}{mv} = \\dfrac{6.63 \\times 10^{-34}}{9.11 \\times 10^{-31} \\times 7.26 \\times 10^{6}} = \\brand{1.00 \\times 10^{-10}\\text{ m}}'],
        },
      ],
      lines: [
        { say: 'In Unit 2, an electron that is accelerated from rest through a potential difference V gains a kinetic energy of e V. Here, an electron is accelerated through 150 volts.', caption: 'In Unit 2, an electron that is accelerated from rest through a potential difference V gains a kinetic energy of eV. Here, an electron is accelerated through 150 V.', show: ['ac', 'ac.names', 'ac.scale'], play: 'ac.a' },
        { say: 'Set e V equal to one half m v squared. The speed is the square root of two e V over m, which is 7.26 times ten to the six metres per second.', caption: 'Set eV equal to ½mv². The speed is √(2eV ÷ m), which is 7.26 × 10⁶ m/s.', show: ['a.0', 'ac.values'], play: 'ac.b' },
        { say: 'Then the wavelength is h divided by m v: 1.00 times ten to the negative ten metres.', caption: 'Then the wavelength is h ÷ mv: 1.00 × 10⁻¹⁰ m.', show: ['a.1', 'ac.wavelength'], play: 'ac.c' },
        { say: 'A larger voltage gives a faster electron, with a shorter wavelength.', play: 'ac.more' },
      ],
    },
    {
      chapter: 'From kinetic energy',
      layout: 'center',
      main: [
        energy,
        {
          kind: 'math',
          id: 'k',
          size: 'md',
          lines: ['E_k = 54 \\times 1.60 \\times 10^{-19} = 8.64 \\times 10^{-18}\\text{ J}', 'p = \\sqrt{2mE_k} = \\sqrt{2 \\times 9.11 \\times 10^{-31} \\times 8.64 \\times 10^{-18}} = 3.97 \\times 10^{-24}\\text{ kg·m/s}', '\\lambda = \\dfrac{h}{p} = \\dfrac{6.63 \\times 10^{-34}}{3.97 \\times 10^{-24}} = \\brand{1.67 \\times 10^{-10}\\text{ m}}'],
        },
      ],
      lines: [
        { say: 'Here is an electron with a kinetic energy of 54 electronvolts. In joules, that is 8.64 times ten to the negative 18.', caption: 'Here is an electron with a kinetic energy of 54 eV. In joules, that is 8.64 × 10⁻¹⁸ J.', show: ['ke', 'ke.names', 'k.0'], play: 'ke.a' },
        { say: 'When the kinetic energy is known, the momentum comes in one step: p equals the square root of two m E k. That gives 3.97 times ten to the negative 24 kilogram metres per second.', caption: 'When the kinetic energy is known, the momentum comes in one step: p = √(2mEk). That gives 3.97 × 10⁻²⁴ kg·m/s.', show: ['k.1', 'ke.momentum'], play: 'ke.b' },
        { say: 'Then lambda is h divided by p: 1.67 times ten to the negative ten metres. Remember this number, because it comes back in the next video.', caption: 'Then λ is h ÷ p: 1.67 × 10⁻¹⁰ m. Remember this number, because it comes back in the next video.', show: ['k.2', 'ke.wavelength'], play: 'ke.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At what speed does an electron have a de Broglie wavelength of 0.50 nm? The mass of an electron is $9.11 \\times 10^{-31}$ kg.',
          choices: ['$3.64 \\times 10^{5}$ m/s', '$7.28 \\times 10^{5}$ m/s', '$1.21 \\times 10^{6}$ m/s', '$1.46 \\times 10^{6}$ m/s'],
          answer: 3,
          working: '$\\lambda = \\dfrac{h}{mv}$, so $v = \\dfrac{h}{m\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{9.11 \\times 10^{-31} \\times 0.50 \\times 10^{-9}} = 1.46 \\times 10^{6}$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. At what speed does an electron have a de Broglie wavelength of 0.50 nanometres? Pause the video and work it out.', caption: 'Your turn. At what speed does an electron have a de Broglie wavelength of 0.50 nm? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'Rearrange lambda equals h over m v to get v equals h over m lambda. That is 6.63 times ten to the negative 34, divided by the mass times 0.50 times ten to the negative nine, which is 1.46 times ten to the six metres per second. That is choice D.', caption: 'Rearrange λ = h ÷ mv to get v = h ÷ mλ. That is 6.63 × 10⁻³⁴, divided by the mass times 0.50 × 10⁻⁹, which is 1.46 × 10⁶ m/s. That is choice D.', show: 'q.answer' },
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
            'Every moving particle has a wavelength: $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$',
            'More momentum means a **shorter** wavelength',
            'An electron\'s wavelength is about the size of an atom; a baseball\'s is far too small to detect',
            'From a voltage: $eV = \\tfrac{1}{2}mv^2$ gives the speed. From kinetic energy: $p = \\sqrt{2mE_k}$',
            '$c = f\\lambda$ and $E = \\dfrac{hc}{\\lambda}$ are for photons only',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Every moving particle has a wavelength: h divided by its momentum, which is h divided by m v.', caption: 'Here is what to remember. Every moving particle has a wavelength: h ÷ p, which is h ÷ mv.', show: 'sum.0' },
        { say: 'More momentum means a shorter wavelength.', show: 'sum.1' },
        { say: 'The wavelength of an electron is about the size of an atom, but the wavelength of a baseball is far too small to detect.', show: 'sum.2' },
        { say: 'For an electron that has been accelerated, find the speed from e V equals one half m v squared. When you know the kinetic energy, the momentum is the square root of two m E k.', caption: 'For an electron that has been accelerated, find the speed from eV = ½mv². When you know the kinetic energy, the momentum is √(2mEk).', show: 'sum.3' },
        { say: 'And for a particle with mass, never use the equations that have c in them. Those are for photons only.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
