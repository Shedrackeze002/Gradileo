import type { Explainer, MatterEl } from '@/video/script.ts';

// Lesson 3.8, second part: wave-particle duality. The pictures are true to their numbers
// (src/video/matter.ts): the electrons come off the crystal most strongly where d sin θ = λ for
// their de Broglie wavelength, the rings shrink in step with that wavelength, and each photon at
// the two slits lands at a place drawn by chance from the brightness of the wave's pattern, so
// the fringes build up dot by dot.

const matter = (id: string, picture: MatterEl['picture'], height: number, clips: MatterEl['clips'], more: Partial<MatterEl> = {}): MatterEl => ({ kind: 'matter', id, picture, height, clips, ...more });

/** Davisson and Germer: electrons of 54 eV on a nickel crystal, and a detector that swings round. */
const crystal = matter('dg', 'crystal', 470, { a: { phases: [{ dur: 11.3 }] }, sweep: { phases: [{ dur: 1.2 }, { dur: 9.4, detector: 80 }, { dur: 2 }] }, back: { phases: [{ dur: 0.7 }, { dur: 3.5, detector: 51 }, { dur: 7.5 }] }, d: { phases: [{ dur: 12.6 }] } }, { volts: 54, rate: 9, detector: 20 });

/** Thomson: electrons through a foil make rings, which shrink as the voltage rises. */
const foil = matter('th', 'rings', 470, { a: { phases: [{ dur: 13 }] }, more: { phases: [{ dur: 3.6 }, { dur: 4.6, volts: 40000 }, { dur: 2.2 }] }, c: { phases: [{ dur: 10.9 }] }, d: { phases: [{ dur: 13.5 }] } }, { volts: 10000, rate: 150 });

/** Two slits, one photon at a time: single dots that build up into fringes. */
const slits = matter(
  'one',
  'slits',
  470,
  {
    a: { phases: [{ dur: 10 }] },
    b: { phases: [{ dur: 11.3, rate: 6 }] },
    c: { phases: [{ dur: 2 }, { dur: 4, rate: 110 }, { dur: 3.1 }] },
    d: { phases: [{ dur: 6.9, rate: 50 }] },
    e: { phases: [{ dur: 16.1 }] },
    f: { phases: [{ dur: 17.8 }] },
    g: { phases: [{ dur: 6 }] },
  },
  { rate: 1.2, particle: 'photon', poster: 'e', posterAt: 0.5, thumb: ['names', 'bars'] },
);

const video: Explainer = {
  id: 'p30-3-8-b',
  lessonId: 'p30-3-8',
  title: 'Wave-Particle Duality',
  thumbnail: 'one',
  summary:
    'Electrons diffract from a crystal and make rings through a foil, so matter behaves as a wave as well as a particle. See Davisson and Germer\'s peak and Thomson\'s rings, then watch photons go through two slits one at a time: each lands as a single dot, and the dots build up an interference pattern.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Wave-Particle Duality', subtitle: 'Light and matter are both' }],
      lines: [
        { say: 'De Broglie\'s idea was a guess, with no evidence. If an electron really has a wavelength, it should do what only waves do, and diffract.', show: 'title' },
        { say: 'Three years later, the evidence came.' },
      ],
    },
    {
      chapter: 'Electrons diffract',
      layout: 'center',
      main: [crystal],
      lines: [
        { say: 'In nineteen twenty-seven, Clinton Davisson and Lester Germer fired a beam of electrons with a kinetic energy of 54 electronvolts at a crystal of nickel.', caption: 'In 1927, Clinton Davisson and Lester Germer fired a beam of electrons with a kinetic energy of 54 eV at a crystal of nickel.', show: ['dg', 'dg.names', 'dg.values'], play: 'dg.a' },
        { say: 'The rows of atoms in the crystal act as a diffraction grating. A detector swings round the crystal, and counts the electrons that come off at each angle.', show: 'dg.plot', play: 'dg.sweep' },
        { say: 'The electrons come off strongly at one angle, near 50 degrees, and much less on either side. That is a diffraction pattern, and only waves diffract.', caption: 'The electrons come off strongly at one angle, near 50°, and much less on either side. That is a diffraction pattern, and only waves diffract.', show: 'dg.peak', play: 'dg.back' },
        { say: 'The wavelength worked out from the pattern was 1.67 times ten to the negative ten metres. That is the value that de Broglie\'s equation gives for these electrons.', caption: 'The wavelength worked out from the pattern was 1.67 × 10⁻¹⁰ m. That is the value that de Broglie\'s equation gives for these electrons.', play: 'dg.d' },
      ],
    },
    {
      chapter: 'Rings from a foil',
      layout: 'center',
      main: [foil],
      lines: [
        { say: 'In the same year, George Thomson passed electrons through a thin metal foil. On the screen behind it, they built up rings, just like the rings that X-rays make.', show: ['th', 'th.names'], play: 'th.a' },
        { say: 'Watch what happens when the electrons are accelerated through a larger voltage. They move faster, their wavelength is shorter, and the rings shrink.', show: ['th.values', 'th.rings'], play: 'th.more' },
        { say: 'A crystal works where a doorway does not, because the spacing of its atoms is about the same as the wavelength of the electrons.', play: 'th.c' },
        { say: 'An electron microscope puts this to use. Fast electrons have a wavelength thousands of times shorter than that of visible light, so it can show viruses, and even single atoms.', play: 'th.d' },
      ],
    },
    {
      chapter: 'Two sets of evidence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Experiment', 'What it shows'],
          rows: [
            ['Young\'s double slit, diffraction gratings', 'Light behaves as a **wave**'],
            ['The photoelectric effect, the Compton effect', 'Light behaves as **particles**'],
            ['Electron beams bent by fields, Millikan\'s oil drops', 'The electron behaves as a **particle**'],
            ['Davisson and Germer, Thomson\'s rings', 'The electron behaves as a **wave**'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Wave-particle duality', md: 'Light and matter both show **wave** behaviour in some experiments and **particle** behaviour in others.' },
      ],
      lines: [
        { say: 'So there are two sets of evidence. Young\'s double slit and diffraction gratings show that light behaves as a wave. The photoelectric effect and the Compton effect show that it behaves as particles.', show: ['t', 't.0', 't.1'] },
        { say: 'Electron beams that bend in fields show that the electron is a particle, with mass and charge. And Davisson, Germer and Thomson showed that it behaves as a wave as well.', show: ['t.2', 't.3'] },
        { say: 'Neither picture is enough alone. Light and matter both show wave behaviour in some experiments, and particle behaviour in others. This is called wave-particle duality.', show: 'def' },
      ],
    },
    {
      chapter: 'One at a time',
      layout: 'center',
      main: [slits],
      lines: [
        { say: 'The strangest experiment sends light through a double slit so dimly that only one photon is in the apparatus at a time.', show: ['one', 'one.names'], play: 'one.a' },
        { say: 'Each photon arrives at the screen as a single dot, at one place, as a particle would. The dots seem to be scattered at random.', show: 'one.count', play: 'one.b' },
        { say: 'But keep watching as thousands of dots build up. They form the bright and dark fringes of an interference pattern.', show: 'one.bars', play: 'one.c' },
        { say: 'Electrons sent one at a time through two very narrow slits do exactly the same.', play: 'one.d' },
        { say: 'No single photon is split between the slits, and there is no second photon for it to interfere with. The modern view is that the wave describes the chance of finding the particle at each place.', show: 'one.curve', play: 'one.e' },
        { say: 'Where the wave is strong, at a bright fringe, many photons land. Where the waves cancel, at a dark fringe, none do. The wave tells us where the particle is likely to go, and the particle is what is detected.', play: 'one.f' },
        { say: 'This idea is the starting point of quantum mechanics, the theory of atoms.', play: 'one.g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A photon and an electron have the same wavelength. Which other quantity must they also share?',
          choices: ['Momentum', 'Speed', 'Kinetic energy', 'Mass'],
          answer: 0,
          working: 'For a photon and for a particle alike, $p = \\dfrac{h}{\\lambda}$. The same wavelength means the same momentum. Their speeds and energies are different.',
        },
      ],
      lines: [
        { say: 'Your turn. A photon and an electron have the same wavelength. Which other quantity must they also share? Pause the video and think about it.', show: 'q', wait: 6 },
        { say: 'For a photon and for a particle alike, the momentum is h divided by lambda. So the same wavelength means the same momentum. That is choice "A". Fired at the same crystal, they give diffraction patterns with the same spacing, but they do not have the same speed or the same energy.', caption: 'For a photon and for a particle alike, the momentum is h ÷ λ. So the same wavelength means the same momentum. That is choice A. Fired at the same crystal, they give diffraction patterns with the same spacing, but they do not have the same speed or the same energy.', show: 'q.answer' },
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
            'Electrons **diffract** from crystals, which confirmed de Broglie\'s equation',
            'Faster electrons have a shorter wavelength: this is how an electron microscope shows fine detail',
            'Light and matter both show wave and particle behaviour: **wave-particle duality**',
            'One photon or electron at a time lands as a single dot, and the dots build up an interference pattern',
            'The wave gives the **chance** of finding the particle at each place',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Electrons diffract from crystals, which confirmed de Broglie\'s equation.', show: 'sum.0' },
        { say: 'Faster electrons have a shorter wavelength, and this is how an electron microscope shows such fine detail.', show: 'sum.1' },
        { say: 'Light and matter both show wave behaviour and particle behaviour. This is wave-particle duality.', show: 'sum.2' },
        { say: 'With one photon or one electron at a time, single dots build up into an interference pattern.', show: 'sum.3' },
        { say: 'And the wave gives the chance of finding the particle at each place. Light does not switch between a wave and a particle. It is one kind of thing that fits neither of our everyday pictures.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
