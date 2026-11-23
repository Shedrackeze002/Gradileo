import type { Explainer, LevelsEl } from '@/video/script.ts';

// Lesson 4.3, second part: spectra. The spectrum pictures spread the light of a hot solid, of
// glowing hydrogen and of a hot solid seen through cool hydrogen onto a strip from 380 to 750 nm,
// with each line at the wavelength of a jump between the levels of hydrogen (src/video/levels.ts).
// The atom pictures show where the lines come from: a photon leaves when the electron drops, and
// the atom takes in only a photon that matches a jump exactly.

const levels = (id: string, height: number, clips: LevelsEl['clips'], more: Partial<LevelsEl> = {}): LevelsEl => ({ kind: 'levels', id, height, clips, ...more });

/** The three kinds of spectrum, one after another. */
const spectrum = levels(
  'sp',
  470,
  {
    a: { phases: [{ dur: 12.3 }] },
    b: { phases: [{ dur: 10.2 }] },
    c: { phases: [{ dur: 14.8, source: 'gas' }] },
    d: { phases: [{ dur: 11.3, source: 'through' }] },
    e: { phases: [{ dur: 1.2 }, { dur: 2.2, source: 'gas' }, { dur: 2.2, source: 'through' }, { dur: 2.2, source: 'gas' }] },
  },
  { picture: 'spectrum', poster: 'c', posterAt: 1, thumb: ['axis'] },
);

/** Glowing hydrogen: collisions lift the electron, and each drop to level 2 gives a visible photon. */
const bright = levels(
  'em',
  470,
  {
    a: { phases: [{ dur: 6 }, { dur: 4, to: 3, bump: true }, { dur: 8, to: 2 }] },
    b: { phases: [{ dur: 1.5, to: 3, bump: true }, { dur: 10.4, to: 2 }] },
    c: { phases: [{ dur: 1.2, to: 4, bump: true }, { dur: 2.6, to: 2 }, { dur: 1.2, to: 5, bump: true }, { dur: 2.2, to: 2 }, { dur: 1.2, to: 6, bump: true }, { dur: 5.1, to: 2 }] },
  },
  { top: 6, start: 2, from: 2 },
);

/** Cool hydrogen in white light: it takes in only the photons that match a jump. */
const dark = levels(
  'ab',
  470,
  {
    a: { phases: [{ dur: 5 }, { dur: 3.4, photon: 2.2 }, { dur: 3.4, photon: 2.7 }, { dur: 5.4 }] },
    b: { phases: [{ dur: 3.6, photon: 1.8 }, { dur: 3.6, photon: 2.0 }, { dur: 7.1, photon: 1.89 }] },
    c: { phases: [{ dur: 2 }, { dur: 10.6, to: 2 }] },
    d: { phases: [{ dur: 3.4, photon: 2.55 }, { dur: 9.6, to: 2 }] },
  },
  { top: 6, start: 2, from: 2 },
);

/** The dark lines in the light of a star. */
const star = levels('st', 360, { a: { phases: [{ dur: 9.3 }] }, b: { phases: [{ dur: 12.8 }] } }, { picture: 'spectrum', source: 'through', lamp: 'Hot inside of a star', cloud: 'Cooler outer layers' });

/** A photon with more than 13.6 eV frees the electron. */
const freed = levels('io', 400, { a: { phases: [{ dur: 5 }, { dur: 8.2, photon: 15 }] }, b: { phases: [{ dur: 12.4 }] } });

/** The electron as a wave round its orbit. */
const wave = levels(
  'wv',
  400,
  { a: { phases: [{ dur: 14 }] }, b: { phases: [{ dur: 12.8 }] }, c: { phases: [{ dur: 3, waves: 3.5 }, { dur: 7 }] }, d: { phases: [{ dur: 2.5, waves: 4 }, { dur: 2.7 }] } },
  { picture: 'wave', waves: 3 },
);

const video: Explainer = {
  id: 'p30-4-3-b',
  lessonId: 'p30-4-3',
  title: 'Spectra',
  thumbnail: 'sp',
  summary:
    'A hot solid gives every colour, a glowing gas gives a few bright lines, and white light that has passed through a cool gas shows dark lines at the same wavelengths. See how the energy levels of Bohr\'s atom explain all three, why each element has its own lines, and why only some orbits are allowed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Spectra', subtitle: 'The fingerprints of the elements' }],
      lines: [
        { say: 'A glowing gas does not shine with every colour. It gives out a few sharp colours, and nothing in between. And each element has its own set.', show: 'title' },
        { say: "Bohr's energy levels explain why. They even tell us what the Sun is made of." },
      ],
    },
    {
      chapter: 'Three kinds of spectrum',
      layout: 'center',
      main: [spectrum],
      lines: [
        { say: 'A spectrum is the light of a source, spread out by a prism or a diffraction grating, so that each wavelength falls in a different place.', show: ['sp', 'sp.names'], play: 'sp.a' },
        { say: 'A hot solid, such as the filament of a lamp, gives every colour, with no gaps. This is a continuous spectrum.', show: 'sp.axis', play: 'sp.b' },
        { say: 'A glowing gas at low pressure is different. It gives only a few bright lines, of certain colours, on a dark background. This is an emission spectrum. These are the lines of hydrogen.', play: 'sp.c' },
        { say: 'And when white light passes through a cool gas, we see the continuous spectrum again, but crossed by dark lines. This is an absorption spectrum.', play: 'sp.d' },
        { say: 'Now compare the two. The dark lines are at exactly the same wavelengths as the bright lines.', play: 'sp.e' },
      ],
    },
    {
      chapter: 'The bright lines',
      layout: 'center',
      main: [bright],
      lines: [
        { say: 'Here is a hydrogen atom in the glowing gas. Collisions, and the electric current, lift its electron to a higher level. It soon drops back, and gives out a photon whose energy is the gap between the two levels.', show: ['em', 'em.names', 'em.energies', 'em.photon'], play: 'em.a' },
        { say: 'This drop, from level 3 to level 2, gives a photon of 1.89 electron volts. That is red light, with a wavelength of 658 nanometres.', caption: 'This drop, from level 3 to level 2, gives a photon of 1.89 eV. That is red light, with a wavelength of 658 nm.', show: 'em.kept', play: 'em.b' },
        { say: 'From level 4, the photon is blue-green. And from levels 5 and 6, it is violet. Only certain gaps exist, so only certain wavelengths appear. These are the bright lines.', play: 'em.c' },
      ],
    },
    {
      chapter: 'The series of hydrogen',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Series', 'The electron drops to', 'Part of the spectrum'],
          rows: [
            ['Lyman', '$n = 1$', 'Ultraviolet'],
            ['Balmer', '$n = 2$', 'Visible'],
            ['Paschen', '$n = 3$', 'Infrared'],
          ],
        },
      ],
      lines: [
        { say: 'The lines of hydrogen fall into groups, called series, named by the level where the electron ends. The four visible lines all end at level 2. They are the Balmer series.', show: ['t', 't.1'] },
        { say: 'Jumps down to the ground state are much larger, so they give ultraviolet photons. They are the Lyman series.', show: 't.0' },
        { say: 'And jumps down to level 3 are small, so they give infrared photons. They are the Paschen series.', show: 't.2' },
      ],
    },
    {
      chapter: 'The dark lines',
      layout: 'center',
      main: [dark],
      lines: [
        { say: 'Now the cool gas, with white light passing through it. White light has photons of every energy. But an atom can absorb a photon only if its energy exactly matches a gap between two of its levels.', show: ['ab', 'ab.names', 'ab.energies', 'ab.photon'], play: 'ab.a' },
        { say: 'A photon with a little less energy passes straight through. So does one with a little more. But a photon of exactly 1.89 electron volts is taken in, and the electron rises.', caption: 'A photon with a little less energy passes straight through. So does one with a little more. But a photon of exactly 1.89 eV is taken in, and the electron rises.', play: 'ab.b' },
        { say: 'The atom soon gives the energy out again, but in any direction. So very little of it carries on along the beam, and that wavelength is left dark.', play: 'ab.c' },
        { say: 'The atom absorbs exactly the energies that it can give out. This is why the dark lines of an element are at the same wavelengths as its bright lines.', play: 'ab.d' },
      ],
    },
    {
      chapter: 'Fingerprints',
      layout: 'center',
      main: [star, { kind: 'callout', id: 'fp', tone: 'key', title: 'Reading the stars', md: 'The **dark lines** in the light of the Sun and the stars show which elements are in their outer layers.' }],
      lines: [
        { say: 'Each element has its own set of energy levels, and so its own set of lines, like a fingerprint.', show: ['st', 'st.names', 'st.axis'], play: 'st.a' },
        { say: 'This is how astronomers know what the Sun and the stars are made of. They spread out the light, and read the dark lines in its spectrum.', show: 'fp', play: 'st.b' },
      ],
    },
    {
      chapter: 'Freeing the electron',
      layout: 'center',
      main: [freed, { kind: 'math', id: 'k1', size: 'md', lines: ['E_k = 15.0 - 13.6 = \\good{1.4\\ \\text{eV}}'] }],
      lines: [
        { say: 'One more kind of photon is absorbed. A photon with more than 13.6 electron volts can free the electron from the ground state altogether. The atom is ionized.', caption: 'One more kind of photon is absorbed. A photon with more than 13.6 eV can free the electron from the ground state altogether. The atom is ionized.', show: ['io', 'io.names', 'io.energies', 'io.photon'], play: 'io.a' },
        { say: 'The electron carries off the extra energy as kinetic energy, just as in the photoelectric effect. A photon of 15.0 electron volts leaves it with 1.4.', caption: 'The electron carries off the extra energy as kinetic energy, just as in the photoelectric effect. A photon of 15.0 eV leaves it with 1.4 eV.', show: 'k1', play: 'io.b' },
      ],
    },
    {
      chapter: 'Why the orbits are allowed',
      layout: 'center',
      main: [wave],
      lines: [
        { say: "Bohr could not say why only some orbits are allowed. De Broglie's matter waves gave a reason. The electron in an orbit behaves as a wave, bent into a circle.", show: ['wv', 'wv.names'], play: 'wv.a' },
        { say: 'The wave must join up with itself smoothly. So a whole number of wavelengths must fit round the orbit. Here, three fit. It is a standing wave.', show: 'wv.fits', play: 'wv.b' },
        { say: 'With three and a half wavelengths, the wave comes round out of step with itself, and cancels. No orbit is allowed here.', play: 'wv.c' },
        { say: 'With four, it fits again. That is the next allowed orbit.', play: 'wv.d' },
      ],
    },
    {
      chapter: 'Where the model falls short',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'lim',
          items: [
            'It gives the right spectrum only for **hydrogen**, and for ions with a single electron',
            'It cannot explain why some lines are **brighter** than others',
            'It was replaced by the **quantum mechanical model**, but energy levels and photons remain',
          ],
        },
      ],
      lines: [
        { say: "Bohr's model has limits. It gives the right spectrum only for hydrogen, and for ions with a single electron.", show: 'lim.0' },
        { say: 'It cannot explain why some lines are brighter than others.', show: 'lim.1' },
        { say: 'In the nineteen twenties it was replaced by the quantum mechanical model, in which a wave gives the chance of finding the electron at each place. The fixed orbits are gone. But the energy levels, and the photons given out in jumps between them, remain.', caption: 'In the 1920s it was replaced by the quantum mechanical model, in which a wave gives the chance of finding the electron at each place. The fixed orbits are gone. But the energy levels, and the photons given out in jumps between them, remain.', show: 'lim.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hydrogen atom in its ground state can jump up by 10.2 eV or by 12.09 eV. A photon of 11.0 eV arrives. What happens?',
          choices: ['The electron rises to $n = 2$', 'The atom takes in 10.2 eV, and the rest carries on', 'The photon passes straight through', 'The electron is set free'],
          answer: 2,
          working: 'An atom absorbs only a photon whose energy **matches a gap exactly**, or one with enough to free the electron (13.6 eV). 11.0 eV does neither, so it passes straight through.',
        },
      ],
      lines: [
        { say: 'Your turn. A hydrogen atom in its ground state can jump up by 10.2 electron volts, or by 12.09 electron volts. A photon of 11.0 electron volts arrives. What happens? Pause the video and think about it.', caption: 'Your turn. A hydrogen atom in its ground state can jump up by 10.2 eV, or by 12.09 eV. A photon of 11.0 eV arrives. What happens? Pause the video and think about it.', show: 'q', wait: 6 },
        { say: 'An atom absorbs only a photon that matches a gap exactly, or one with enough energy to free the electron. 11.0 electron volts does neither, so the photon passes straight through. That is choice "C".', caption: 'An atom absorbs only a photon that matches a gap exactly, or one with enough energy to free the electron. 11.0 eV does neither, so the photon passes straight through. That is choice C.', show: 'q.answer' },
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
            'A hot solid gives a **continuous** spectrum, and a glowing gas gives **bright lines**',
            'White light through a cool gas shows **dark lines** at the same wavelengths',
            'An atom absorbs only a photon that **matches a gap** between its levels, or one that frees the electron',
            'Each element has its own lines, which show what the **Sun and the stars** are made of',
            'In hydrogen, jumps to $n = 2$ give the visible lines: the **Balmer series**',
            'A **whole number** of electron wavelengths fits round an allowed orbit',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A hot solid gives a continuous spectrum, and a glowing gas gives bright lines.', show: 'sum.0' },
        { say: 'White light that has passed through a cool gas shows dark lines, at the same wavelengths.', show: 'sum.1' },
        { say: 'An atom absorbs only a photon that matches a gap between its levels, or one that frees the electron.', show: 'sum.2' },
        { say: 'Each element has its own lines, which show what the Sun and the stars are made of.', show: 'sum.3' },
        { say: 'In hydrogen, jumps down to level 2 give the visible lines, the Balmer series.', show: 'sum.4' },
        { say: 'And a whole number of electron wavelengths fits round an allowed orbit.', show: 'sum.5' },
      ],
    },
  ],
};

export default video;
