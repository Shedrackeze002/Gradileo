import type { Explainer, LevelsEl } from '@/video/script.ts';

// Lesson 4.3, first part: the Bohr model. Every picture is the hydrogen atom of src/video/levels.ts,
// with levels of −13.6 ÷ n² eV: the electron goes round one allowed orbit, a photon leaves when it
// drops to a lower one, and it rises when a photon with exactly the right energy arrives. The
// energy and the wavelength of each photon are worked out from the two levels of its jump.

const atom = (id: string, height: number, clips: LevelsEl['clips'], more: Partial<LevelsEl> = {}): LevelsEl => ({ kind: 'levels', id, height, clips, ...more });

/** Bohr's atom: allowed orbits, and an electron that jumps between them. */
const orbits = atom('or', 470, {
  a: { phases: [{ dur: 12.8 }] },
  b: { phases: [{ dur: 12.6 }] },
  c: { phases: [{ dur: 10.9 }] },
  d: { phases: [{ dur: 4 }, { dur: 4.3, to: 2 }, { dur: 4.3, to: 1 }] },
  e: { phases: [{ dur: 2.6, to: 3 }, { dur: 2.2, to: 2 }, { dur: 4.4, to: 1 }] },
});

/** The levels of hydrogen, one by one, and the energy that frees the electron. */
const energies = atom('en', 330, {
  a: { phases: [{ dur: 11.1 }] },
  b: { phases: [{ dur: 11.1 }] },
  c: { phases: [{ dur: 2.4 }, { dur: 3.4, to: 2 }, { dur: 3, to: 3 }, { dur: 8.6, to: 4 }] },
  d: { phases: [{ dur: 12.7 }] },
  e: { phases: [{ dur: 1.5 }, { dur: 9.8, to: 1 }] },
  f: { phases: [{ dur: 2 }, { dur: 7.1, photon: 13.6 }] },
});

/** A drop gives out one photon. */
const jump = atom('jp', 360, { a: { phases: [{ dur: 4 }, { dur: 10.1, to: 2 }] }, b: { phases: [{ dur: 9 }, { dur: 7.7, to: 1 }] } }, { start: 3 });

/** The red line of hydrogen: from level 3 to level 2. */
const red = atom('rd', 256, { a: { phases: [{ dur: 13.2 }] }, b: { phases: [{ dur: 3 }, { dur: 12.8, to: 2 }] }, c: { phases: [{ dur: 7 }, { dur: 5.8, to: 3, bump: true }] }, d: { phases: [{ dur: 9 }, { dur: 8.1, to: 2 }] } }, { start: 3 });

/** A rise takes in one photon, of exactly the right energy. */
const rise = atom('up', 400, { a: { phases: [{ dur: 13.6 }] }, b: { phases: [{ dur: 7 }, { dur: 6.2, photon: 2.55 }] }, c: { phases: [{ dur: 3.5 }, { dur: 5.6, to: 2 }] } }, { start: 2 });

/** Every way down from level 4: six photon energies. */
const lines = atom(
  'ln',
  440,
  {
    a: { phases: [{ dur: 8 }, { dur: 2.4, to: 3 }, { dur: 2.4, to: 2 }, { dur: 5.2, to: 1 }] },
    b: { phases: [{ dur: 2.6, to: 4 }, { dur: 4.3, to: 2 }] },
    c: { phases: [{ dur: 2.6, to: 4 }, { dur: 9.1, to: 1 }] },
    d: { phases: [{ dur: 2.2, to: 3 }, { dur: 2.1, to: 1 }] },
    e: { phases: [{ dur: 15.8 }] },
  },
  { start: 4, poster: 'd', posterAt: 1, thumb: ['names', 'energies', 'kept'] },
);

const video: Explainer = {
  id: 'p30-4-3',
  lessonId: 'p30-4-3',
  title: 'The Bohr Model',
  thumbnail: 'ln',
  summary:
    'Niels Bohr let the electron of an atom have only certain energies. See the allowed orbits and the energy levels of hydrogen, watch a photon leave as the electron drops and arrive as it rises, and work out the energy and the wavelength of the red line of hydrogen.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'The Bohr Model', subtitle: 'Energy levels and photons' }],
      lines: [
        { say: "Rutherford's atom had two problems. Its electrons should spiral into the nucleus. And it could not explain why a glowing gas gives out light of only certain colours.", show: 'title' },
        { say: 'In nineteen thirteen, Niels Bohr dealt with both, by joining the nucleus to the photon.', caption: 'In 1913, Niels Bohr dealt with both, by joining the nucleus to the photon.' },
      ],
    },
    {
      chapter: "Bohr's atom",
      layout: 'center',
      main: [orbits],
      lines: [
        { say: 'Bohr kept the nucleus, and the electron that goes round it. Then he added three bold assumptions. First, the electron can move only in certain allowed orbits.', show: ['or', 'or.names'], play: 'or.a' },
        { say: 'Each allowed orbit has a fixed energy, called an energy level. On the right, the levels are drawn like the rungs of a ladder, numbered from the lowest.', play: 'or.b' },
        { say: 'Second, while the electron stays in an allowed orbit, it does not radiate. So it does not spiral inwards, and the atom is stable.', play: 'or.c' },
        { say: 'Third, the atom takes in or gives out energy only when the electron jumps from one level to another. The energy arrives, or leaves, as a single photon.', play: 'or.d' },
        { say: 'We say that the energy of the atom is quantized. It can have only certain values, and none in between.', play: 'or.e' },
      ],
    },
    {
      chapter: 'The levels of hydrogen',
      layout: 'center',
      main: [energies, { kind: 'math', id: 'f', size: 'md', lines: ['E_n = -\\dfrac{13.6}{n^2}\\ \\text{eV}'] }],
      lines: [
        { say: 'For hydrogen, the levels follow a simple rule. The energy of level n is negative 13.6, divided by n squared, in electron volts.', caption: 'For hydrogen, the levels follow a simple rule. The energy of level n is −13.6 ÷ n², in electronvolts.', show: ['en', 'en.names', 'f'], play: 'en.a' },
        { say: 'So the lowest level, n equals 1, is at negative 13.6 electron volts. This is the ground state, where the electron normally stays.', caption: 'So the lowest level, n = 1, is at −13.6 eV. This is the ground state, where the electron normally stays.', show: 'en.energies', play: 'en.b' },
        { say: 'The higher levels are called excited states. Level 2 is at negative 3.40 electron volts, level 3 is at negative 1.51, and level 4 is at negative 0.85. Notice that they crowd together as they get closer to zero.', caption: 'The higher levels are called excited states. Level 2 is at −3.40 eV, level 3 is at −1.51 eV, and level 4 is at −0.85 eV. Notice that they crowd together as they get closer to zero.', play: 'en.c' },
        { say: 'The orbits grow as well. The radius of orbit n is n squared times the radius of the first, so orbit 4 is sixteen times as wide.', caption: 'The orbits grow as well. The radius of orbit n is n² times the radius of the first, so orbit 4 is 16 times as wide.', show: 'en.radius', play: 'en.d' },
        { say: 'The energies are negative because the electron is bound to the nucleus. Zero is the energy of an electron that has just been set free.', hide: 'en.radius', play: 'en.e' },
        { say: 'So to free the electron from the ground state takes 13.6 electron volts. This is the ionization energy of hydrogen.', caption: 'So to free the electron from the ground state takes 13.6 eV. This is the ionization energy of hydrogen.', play: 'en.f' },
      ],
    },
    {
      chapter: 'The photon of a jump',
      layout: 'center',
      main: [jump, { kind: 'math', id: 'eq', size: 'md', lines: ['E_{\\text{photon}} = E_{\\text{higher}} - E_{\\text{lower}} = hf = \\dfrac{hc}{\\lambda}'] }],
      lines: [
        { say: 'When the electron drops from a higher level to a lower one, the atom gives out one photon. The energy of the photon is the difference between the two levels.', show: ['jp', 'jp.names', 'jp.energies', 'eq'], play: 'jp.a' },
        { say: "And from Unit 3, the energy of a photon is Planck's constant times its frequency, or h c over its wavelength. So a larger jump gives a photon with a higher frequency, and a shorter wavelength.", caption: "And from Unit 3, the energy of a photon is Planck's constant times its frequency, or hc ÷ λ. So a larger jump gives a photon with a higher frequency, and a shorter wavelength.", show: 'jp.photon', play: 'jp.b' },
      ],
    },
    {
      chapter: 'The red line of hydrogen',
      layout: 'center',
      main: [
        red,
        { kind: 'math', id: 'm1', size: 'md', lines: ['E = E_3 - E_2 = -1.51 - (-3.40) = \\good{1.89\\ \\text{eV}}'] },
        { kind: 'math', id: 'm2', size: 'md', lines: ['E = 1.89 \\times 1.60 \\times 10^{-19} = 3.024 \\times 10^{-19}\\ \\text{J}'] },
        { kind: 'math', id: 'm3', size: 'md', lines: ['\\lambda = \\dfrac{hc}{E} = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{3.024 \\times 10^{-19}} = \\good{6.58 \\times 10^{-7}\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Let us work one out. The electron of a hydrogen atom drops from level 3 to level 2. What are the energy and the wavelength of the photon?', show: ['rd', 'rd.names', 'rd.energies'], play: 'rd.a' },
        { say: 'The energy is E 3 minus E 2. That is negative 1.51, minus negative 3.40, which is 1.89 electron volts. Take care with the minus signs. The energy of a photon is always positive.', caption: 'The energy is E₃ − E₂. That is −1.51 − (−3.40), which is 1.89 eV. Take care with the minus signs. The energy of a photon is always positive.', show: 'm1', play: 'rd.b' },
        { say: 'For the wavelength, we need the energy in joules. 1.89, times 1.60 times ten to the negative 19, is 3.024 times ten to the negative 19 joules.', caption: 'For the wavelength, we need the energy in joules. 1.89 × 1.60 × 10⁻¹⁹ is 3.024 × 10⁻¹⁹ J.', show: 'm2', play: 'rd.c' },
        { say: 'Then the wavelength is h c over E, which comes to 6.58 times ten to the negative 7 metres. That is 658 nanometres, which is red light. This is the red line that glowing hydrogen gives out.', caption: 'Then the wavelength is hc ÷ E, which comes to 6.58 × 10⁻⁷ m. That is 658 nm, which is red light. This is the red line that glowing hydrogen gives out.', show: ['m3', 'rd.photon'], play: 'rd.d' },
      ],
    },
    {
      chapter: 'Jumping up',
      layout: 'center',
      main: [rise, { kind: 'math', id: 'u1', size: 'md', lines: ['E = E_4 - E_2 = -0.85 - (-3.40) = \\good{2.55\\ \\text{eV}}'] }],
      lines: [
        { say: 'The same rule works backwards. To lift the electron from a lower level to a higher one, the atom must absorb a photon with exactly the difference in energy.', show: ['up', 'up.names', 'up.energies'], play: 'up.a' },
        { say: 'From level 2 to level 4, the difference is negative 0.85, minus negative 3.40, which is 2.55 electron volts. A photon with exactly that energy lifts the electron.', caption: 'From level 2 to level 4, the difference is −0.85 − (−3.40), which is 2.55 eV. A photon with exactly that energy lifts the electron.', show: ['u1', 'up.photon'], play: 'up.b' },
        { say: 'The electron does not stay up for long. It soon drops back, and the atom gives the energy out again.', play: 'up.c' },
      ],
    },
    {
      chapter: 'How many lines?',
      layout: 'center',
      main: [lines, { kind: 'math', id: 'n1', size: 'md', lines: ['\\dfrac{n(n-1)}{2} = \\dfrac{4 \\times 3}{2} = \\good{6}'] }],
      lines: [
        { say: 'An electron in a high level can return to the ground state in one step, or in several smaller ones. Here it starts in level 4, and comes down one level at a time. That gives three different photons.', show: ['ln', 'ln.names', 'ln.energies', 'ln.kept'], play: 'ln.a' },
        { say: 'Lift it again. This time it drops two levels at once, from 4 to 2.', play: 'ln.b' },
        { say: 'Or it can drop straight from 4 to 1. That is the largest jump, so it gives the photon with the most energy: 12.75 electron volts.', caption: 'Or it can drop straight from 4 to 1. That is the largest jump, so it gives the photon with the most energy: 12.75 eV.', play: 'ln.c' },
        { say: 'And the last one is from 3 to 1.', play: 'ln.d' },
        { say: 'Each pair of levels gives one possible photon energy. Count the arrows: there are six. For atoms that are excited to level n, the number is n, times n minus 1, divided by 2.', caption: 'Each pair of levels gives one possible photon energy. Count the arrows: there are six. For atoms that are excited to level n, the number is n(n − 1) ÷ 2.', show: 'n1', play: 'ln.e' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The electron of a hydrogen atom drops from $n = 3$ ($-1.51$ eV) to $n = 1$ ($-13.6$ eV). What is the energy of the photon?',
          choices: ['15.11 eV', '12.09 eV', '1.51 eV', '10.2 eV'],
          answer: 1,
          working: '$E = E_3 - E_1 = -1.51 - (-13.6) = 12.09$ eV.',
        },
      ],
      lines: [
        { say: 'Your turn. The electron of a hydrogen atom drops from level 3, at negative 1.51 electron volts, to level 1, at negative 13.6 electron volts. What is the energy of the photon? Pause the video and work it out.', caption: 'Your turn. The electron of a hydrogen atom drops from level 3, at −1.51 eV, to level 1, at −13.6 eV. What is the energy of the photon? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The energy is the difference between the levels. Negative 1.51, minus negative 13.6, is 12.09 electron volts. That is choice "B".', caption: 'The energy is the difference between the levels. −1.51 − (−13.6) is 12.09 eV. That is choice B.', show: 'q.answer' },
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
            'The electron of an atom can have only certain energies, called **energy levels**',
            'It does **not radiate** while it stays in one level, so the atom is stable',
            'For hydrogen, $E_n = -\\dfrac{13.6}{n^2}$ eV, and 13.6 eV frees the electron from the ground state',
            'A jump gives out or takes in **one photon**: $E = E_{\\text{higher}} - E_{\\text{lower}} = hf = \\dfrac{hc}{\\lambda}$',
            'Atoms excited to level $n$ can give out $\\dfrac{n(n-1)}{2}$ photon energies',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The electron of an atom can have only certain energies, called energy levels.', show: 'sum.0' },
        { say: 'It does not radiate while it stays in one level, so the atom is stable.', show: 'sum.1' },
        { say: 'For hydrogen, the energy of level n is negative 13.6 over n squared, in electron volts. And 13.6 electron volts frees the electron from the ground state.', caption: 'For hydrogen, the energy of level n is −13.6 ÷ n², in electronvolts. And 13.6 eV frees the electron from the ground state.', show: 'sum.2' },
        { say: 'A jump gives out, or takes in, one photon. Its energy is the difference between the two levels, which equals h f, or h c over lambda.', caption: 'A jump gives out, or takes in, one photon. Its energy is the difference between the two levels, which equals hf, or hc ÷ λ.', show: 'sum.3' },
        { say: 'And atoms that are excited to level n can give out n, times n minus 1, over 2 different photon energies.', caption: 'And atoms that are excited to level n can give out n(n − 1) ÷ 2 different photon energies.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
