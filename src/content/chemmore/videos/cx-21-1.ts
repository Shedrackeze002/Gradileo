import type { Explainer, LevelsEl, PhotonsEl } from '@/video/script.ts';

// The pictures are true to their numbers (src/video/photons.ts, src/video/levels.ts), with the
// physics lessons' rounded constants (h = 6.63 × 10⁻³⁴ J s, c = 3.00 × 10⁸ m/s), so the energies
// on screen differ from the lesson's four-figure ones in the last place. Hydrogen's first two
// levels are 10.2 eV apart: a 5.0 eV photon passes by, and a 10.2 eV photon is taken in.

const slide: PhotonsEl = {
  kind: 'photons',
  id: 'sl',
  nm: 700,
  rate: 4,
  height: 380,
  clips: {
    a: { phases: [{ dur: 11 }] },
    shorter: { phases: [{ dur: 1.5 }, { dur: 8, nm: 400 }, { dur: 2.5 }] },
    uv: { phases: [{ dur: 1 }, { dur: 5, nm: 250 }, { dur: 4.5 }] },
  },
  poster: 'shorter',
  thumb: ['names', 'values', 'energy'],
};

const absorb: LevelsEl = {
  kind: 'levels',
  id: 'ab',
  height: 440,
  clips: {
    a: { phases: [{ dur: 10.5 }] },
    miss: { phases: [{ dur: 1 }, { dur: 7, photon: 5 }, { dur: 1.5 }] },
    hit: { phases: [{ dur: 1 }, { dur: 7, photon: 10.2 }, { dur: 2 }] },
    drop: { phases: [{ dur: 2 }, { dur: 5, to: 1 }, { dur: 2.5 }] },
  },
  poster: 'hit',
  thumb: ['names', 'energies', 'photon'],
};

const video: Explainer = {
  id: 'cx-21-1',
  lessonId: 'cx-21-1',
  title: 'Photons and Spectroscopy',
  thumbnail: 'sl',
  summary:
    'Light travels with c = λν and comes in photons of energy E = hν = hc/λ, so shorter wavelengths carry more energy in each photon. A molecule takes in a photon only when its energy matches the gap between two of its energy levels: microwaves make molecules rotate faster, infrared makes bonds vibrate more strongly, and visible and ultraviolet light move electrons to higher energy levels.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Photons and Spectroscopy', subtitle: 'What light does to a molecule' }],
      lines: [
        { say: 'Microwaves warm your food, infrared lamps warm your skin, and ultraviolet light can burn it. All three are the same kind of radiation. The difference is the energy each photon carries.', show: 'title' },
        { say: 'In this lesson, you will calculate the energy of photons, and link each region of the spectrum to what it does to a molecule.' },
      ],
    },
    {
      chapter: 'Photons',
      layout: 'center',
      main: [slide],
      lines: [
        { say: 'Here a lamp sends red light to a detector. The light arrives as separate packets of energy called photons, each with the colour of its wavelength.', show: ['sl', 'sl.names', 'sl.values'], play: 'sl.a' },
        { say: 'Now shorten the wavelength, from red towards violet. Watch the energy of each photon as the wavelength gets shorter.', show: 'sl.energy', play: 'sl.shorter' },
        { say: 'Into the ultraviolet, each photon carries more energy still. Shorter waves mean more energy per photon.', play: 'sl.uv' },
      ],
    },
    {
      chapter: 'The energy of a photon',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['c = \\lambda\\nu \\qquad E = h\\nu = \\dfrac{hc}{\\lambda}', 'E = \\dfrac{(6.626 \\times 10^{-34})(2.998 \\times 10^{8})}{520 \\times 10^{-9}}', 'E = 3.82 \\times 10^{-19}\\ \\text{J}'] }],
      lines: [
        { say: 'The speed of light is its wavelength times its frequency. The energy of one photon is Planck’s constant times the frequency, or h c over lambda.', caption: 'The speed of light is its wavelength times its frequency. The energy of one photon is E = hν, or hc ÷ λ.', show: 'm.0', focus: 'm.0' },
        { say: 'For green light of five hundred twenty nanometres, change the wavelength to metres first, then divide h c by it.', caption: 'For green light of 520 nm, change the wavelength to metres first, then divide hc by it.', show: 'm.1', focus: 'm.1' },
        { say: 'Each photon carries three point eight two times ten to the negative nineteen joules. To compare with a bond energy per mole, divide that by Avogadro’s number.', caption: 'Each photon carries 3.82 × 10⁻¹⁹ J. To compare with a bond energy per mole, divide that by Avogadro’s number.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Taking in a photon',
      layout: 'center',
      main: [absorb],
      lines: [
        { say: 'Here are the energy levels of an atom, with its electron in the lowest one. It can take in a photon only if the photon’s energy matches the gap to a higher level.', show: ['ab', 'ab.names', 'ab.energies'], play: 'ab.a' },
        { say: 'A photon of five electronvolts arrives. It matches no gap, so it passes straight through.', caption: 'A photon of 5.0 eV arrives. It matches no gap, so it passes straight through.', show: 'ab.photon', play: 'ab.miss' },
        { say: 'Now a photon of ten point two electronvolts, exactly the gap to the next level. It is taken in, and the electron jumps up.', caption: 'Now a photon of 10.2 eV, exactly the gap to the next level. It is taken in, and the electron jumps up.', play: 'ab.hit' },
        { say: 'When the electron drops back, it gives out a photon of the same energy. Molecules work the same way, with gaps of their own.', play: 'ab.drop' },
      ],
    },
    {
      chapter: 'Regions of the spectrum',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Microwave**: the molecule rotates faster', '**Infrared**: the bonds vibrate more strongly', '**Visible and ultraviolet**: an electron moves to a higher level'] }],
      lines: [
        { say: 'Different regions of the spectrum match different kinds of gaps. Microwave photons carry the least energy, and make molecules rotate faster.', show: 'b.0' },
        { say: 'Infrared photons make the bonds vibrate more strongly, which is why infrared spectra tell chemists which bonds a molecule has.', show: 'b.1' },
        { say: 'Visible and ultraviolet photons carry enough energy to move electrons to higher energy levels. That gives substances their colour, and can even break bonds.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A molecule absorbs infrared radiation. What happens to it?',
          choices: ['An electron moves to a higher level', 'Its bonds vibrate more strongly', 'It rotates faster', 'A bond breaks at once'],
          answer: 1,
          working: 'Infrared photons match the gaps between vibrational levels, so the bonds vibrate more strongly.',
        },
      ],
      lines: [
        { say: 'Your turn. A molecule absorbs infrared radiation. What happens to it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Infrared photons match the gaps between vibrational levels, so the bonds vibrate more strongly.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['c = λν and E = hν = hc ÷ λ.', 'Shorter wavelength: more energy per photon.', 'A photon is taken in only if it matches a gap.', 'Microwave: rotation. Infrared: vibration. Visible and UV: electrons.'] }],
      lines: [
        { say: 'Let’s sum up. The speed of light is wavelength times frequency, and a photon’s energy is h c over lambda.', caption: 'Let’s sum up. c = λν, and a photon’s energy is hc ÷ λ.', show: 'sum.0' },
        { say: 'So a shorter wavelength means more energy in each photon.', show: 'sum.1' },
        { say: 'A photon is taken in only if its energy matches a gap between two levels.', show: 'sum.2' },
        { say: 'Microwaves change rotation, infrared changes vibration, and visible and ultraviolet light move electrons.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
