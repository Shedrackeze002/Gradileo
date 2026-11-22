import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Lesson 3.6, first part: photons. The pictures are true to their numbers (src/video/photons.ts):
// each photon is a packet of waves in the colour of its wavelength, its energy is hc ÷ λ with the
// lesson's constants, and a brighter beam sends more packets each second, each with the same
// energy as before.

const beam = (id: string, height: number, nm: number, rate: number, clips: PhotonsEl['clips'], more: Partial<PhotonsEl> = {}): PhotonsEl => ({ kind: 'photons', id, nm, rate, height, clips, ...more });

/** A lamp that sends photons of yellow light, one by one, to a detector. */
const packets = beam('pk', 360, 590, 4, { a: { phases: [{ dur: 17.8 }] }, b: { phases: [{ dur: 12.6 }] }, c: { phases: [{ dur: 13 }] } }, { poster: 'a', thumb: ['names', 'values'] });

/** Light that slides from red to violet: each photon carries more energy. */
const energy = beam('en', 400, 700, 4, { a: { phases: [{ dur: 14.8 }] }, b: { phases: [{ dur: 11.3 }] }, violet: { phases: [{ dur: 1.5 }, { dur: 7, nm: 400 }, { dur: 2.4 }] }, c: { phases: [{ dur: 11.7 }] } });

/** Green light that gets brighter: more photons each second, each with the same energy. */
const brighter = beam('br', 400, 550, 2, { a: { phases: [{ dur: 8.7 }] }, more: { phases: [{ dur: 4.5, rate: 8 }, { dur: 2.5 }] }, c: { phases: [{ dur: 10 }] } });

/** The lesson's photon: green light of 500 nm, which has a frequency of 6.00 × 10¹⁴ Hz. */
const example = beam('ex', 330, 500, 4, { a: { phases: [{ dur: 9.6 }] }, b: { phases: [{ dur: 13.5 }] }, c: { phases: [{ dur: 18.2 }] }, d: { phases: [{ dur: 8.3 }] }, e: { phases: [{ dur: 6.1 }] } });

/** A laser pointer: red light of 633 nm at 2.0 mW. */
const laser = beam('ls', 330, 633, 9, { a: { phases: [{ dur: 12.6 }] }, b: { phases: [{ dur: 9.6 }] }, c: { phases: [{ dur: 10.8 }] }, d: { phases: [{ dur: 10.9 }] } }, { watts: 2.0e-3 });

const video: Explainer = {
  id: 'p30-3-6',
  lessonId: 'p30-3-6',
  title: 'Photons',
  thumbnail: 'pk',
  summary:
    'Light carries its energy in separate packets called photons. See photons cross from a lamp to a detector, how the energy of each one depends on the frequency of the light, why brighter light means more photons and not stronger ones, how to work in electronvolts, and how to count the photons that a laser gives out each second.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Photons', subtitle: 'Light arrives in packets of energy' }],
      lines: [
        { say: 'By nineteen hundred, physicists were sure that light is a wave. Young had seen its fringes, and Maxwell had explained what kind of wave it is.', caption: 'By 1900, physicists were sure that light is a wave. Young had seen its fringes, and Maxwell had explained what kind of wave it is.', show: 'title' },
        { say: 'Then came results that no wave could explain. The answer to them was that light carries its energy in separate packets.' },
      ],
    },
    {
      chapter: 'Packets of light',
      layout: 'center',
      main: [packets],
      lines: [
        { say: 'In nineteen hundred, Max Planck studied the glow of hot objects. He could only match the measurements by assuming that atoms give out light energy in separate lumps, and not in a smooth stream. He called each lump a quantum.', caption: 'In 1900, Max Planck studied the glow of hot objects. He could only match the measurements by assuming that atoms give out light energy in separate lumps, and not in a smooth stream. He called each lump a quantum.', show: 'pk', play: 'pk.a' },
        { say: 'In nineteen oh five, Albert Einstein went further. He proposed that light itself travels as a stream of packets. A packet of light is now called a photon.', caption: 'In 1905, Albert Einstein went further. He proposed that light itself travels as a stream of packets. A packet of light is now called a photon.', show: 'pk.names', play: 'pk.b' },
        { say: 'Here, a lamp sends photons to a detector, one by one. Each photon travels at the speed of light, and the detector takes it in whole, at one place.', show: 'pk.values', play: 'pk.c' },
      ],
    },
    {
      chapter: 'The energy of a photon',
      layout: 'center',
      main: [energy, { kind: 'math', id: 'm', size: 'md', lines: ['E = hf', 'E = \\dfrac{hc}{\\lambda}'] }],
      lines: [
        { say: 'The energy of one photon depends only on the frequency of the light. It is E equals h f, where h is Planck\'s constant: 6.63 times ten to the negative 34 joule seconds.', caption: 'The energy of one photon depends only on the frequency of the light. It is E = hf, where h is Planck\'s constant: 6.63 × 10⁻³⁴ J·s.', show: ['en', 'en.values', 'm.0'], play: 'en.a' },
        { say: 'For light, the frequency is the speed c divided by the wavelength. So the energy of a photon is also h c divided by lambda.', caption: 'For light, the frequency is the speed c divided by the wavelength. So the energy of a photon is also hc ÷ λ.', show: 'm.1', play: 'en.b' },
        { say: 'Watch the photons as the light changes from red to violet. The wavelength gets shorter, the frequency rises, and each photon carries more energy.', show: ['en.bars', 'en.energy'], play: 'en.violet' },
        { say: 'A photon of violet light has nearly twice the energy of a photon of red light. And a photon of X-rays has thousands of times more.', play: 'en.c' },
      ],
    },
    {
      chapter: 'Brighter light',
      layout: 'center',
      main: [brighter, { kind: 'callout', id: 'key', tone: 'key', title: 'Colour and brightness', md: 'The **frequency** sets the energy of each photon. The **brightness** sets how many photons arrive each second.' }],
      lines: [
        { say: 'What happens when light gets brighter, without changing its colour? The energy of each photon stays exactly the same.', show: ['br', 'br.values', 'br.energy', 'br.count'], play: 'br.a' },
        { say: 'A brighter beam simply has more photons arriving each second.', play: 'br.more' },
        { say: 'So the colour of the light sets the energy of each photon, and the brightness sets how many of them there are.', show: 'key', play: 'br.c' },
      ],
    },
    {
      chapter: 'Joules and electronvolts',
      layout: 'center',
      main: [
        example,
        {
          kind: 'math',
          id: 'e',
          size: 'md',
          lines: ['E = hf = 6.63 \\times 10^{-34} \\times 6.00 \\times 10^{14} = \\brand{3.98 \\times 10^{-19}\\text{ J}}', '1\\text{ eV} = 1.60 \\times 10^{-19}\\text{ J}', 'E = \\dfrac{3.98 \\times 10^{-19}}{1.60 \\times 10^{-19}} = \\brand{2.49\\text{ eV}}'],
        },
      ],
      lines: [
        { say: 'Let\'s find the energy of one photon of this green light. Its frequency is 6.00 times ten to the fourteen hertz.', caption: 'Let\'s find the energy of one photon of this green light. Its frequency is 6.00 × 10¹⁴ Hz.', show: ['ex', 'ex.values'], play: 'ex.a' },
        { say: 'E equals h f. That is 6.63 times ten to the negative 34, times 6.00 times ten to the fourteen, which is 3.98 times ten to the negative 19 joules.', caption: 'E = hf. That is 6.63 × 10⁻³⁴ × 6.00 × 10¹⁴, which is 3.98 × 10⁻¹⁹ J.', show: 'e.0', play: 'ex.b' },
        { say: 'That is a tiny part of a joule, so a smaller unit is useful: the electronvolt. It is the energy that an electron gains when it moves through one volt, and it is 1.60 times ten to the negative 19 joules.', caption: 'That is a tiny part of a joule, so a smaller unit is useful: the electronvolt. It is the energy that an electron gains when it moves through one volt, and it is 1.60 × 10⁻¹⁹ J.', show: 'e.1', play: 'ex.c' },
        { say: 'To change joules to electronvolts, divide by that number. So this photon has an energy of 2.49 electronvolts.', caption: 'To change joules to electronvolts, divide by that number. So this photon has an energy of 2.49 eV.', show: ['e.2', 'ex.energy'], play: 'ex.d' },
        { say: 'Photons of visible light all have energies between about 1.8 and 3.1 electronvolts.', caption: 'Photons of visible light all have energies between about 1.8 eV and 3.1 eV.', play: 'ex.e' },
      ],
    },
    {
      chapter: 'Counting photons',
      layout: 'center',
      main: [
        laser,
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: ['E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{633 \\times 10^{-9}} = 3.14 \\times 10^{-19}\\text{ J}', '\\text{photons each second} = \\dfrac{2.0 \\times 10^{-3}}{3.14 \\times 10^{-19}} = \\brand{6.4 \\times 10^{15}}'],
        },
      ],
      lines: [
        { say: 'A laser pointer gives out red light with a wavelength of 633 nanometres, at a power of 2.0 milliwatts. How many photons does it give out each second?', caption: 'A laser pointer gives out red light with a wavelength of 633 nm, at a power of 2.0 mW. How many photons does it give out each second?', show: ['ls', 'ls.values'], play: 'ls.a' },
        { say: 'First, the energy of one photon. h c divided by the wavelength gives 3.14 times ten to the negative 19 joules.', caption: 'First, the energy of one photon. hc ÷ λ gives 3.14 × 10⁻¹⁹ J.', show: 'c.0', play: 'ls.b' },
        { say: 'A power of 2.0 milliwatts means 2.0 times ten to the negative three joules each second. Divide that by the energy of one photon.', caption: 'A power of 2.0 mW means 2.0 × 10⁻³ J each second. Divide that by the energy of one photon.', show: 'c.1', play: 'ls.c' },
        { say: 'The laser gives out about 6.4 times ten to the fifteen photons every second. There are so many that the beam seems perfectly smooth.', caption: 'The laser gives out about 6.4 × 10¹⁵ photons every second. There are so many that the beam seems perfectly smooth.', show: 'ls.count', play: 'ls.d' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the energy of one photon of violet light with a wavelength of 400 nm, in electronvolts?',
          choices: ['0.32 eV', '1.24 eV', '2.49 eV', '3.11 eV'],
          answer: 3,
          working: '$E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{400 \\times 10^{-9}} = 4.97 \\times 10^{-19}$ J, and $\\dfrac{4.97 \\times 10^{-19}}{1.60 \\times 10^{-19}} = 3.11$ eV.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the energy of one photon of violet light with a wavelength of 400 nanometres, in electronvolts? Pause the video and work it out.', caption: 'Your turn. What is the energy of one photon of violet light with a wavelength of 400 nm, in electronvolts? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'h c divided by the wavelength gives 4.97 times ten to the negative 19 joules. Divide by 1.60 times ten to the negative 19, and the energy is 3.11 electronvolts. That is choice D.', caption: 'hc ÷ λ gives 4.97 × 10⁻¹⁹ J. Divide by 1.60 × 10⁻¹⁹, and the energy is 3.11 eV. That is choice D.', show: 'q.answer' },
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
            'Light carries its energy in packets called **photons**',
            'The energy of one photon is $E = hf = \\dfrac{hc}{\\lambda}$, with $h = 6.63 \\times 10^{-34}$ J·s',
            'A shorter wavelength means a higher frequency, and **more energy** in each photon',
            '$1\\text{ eV} = 1.60 \\times 10^{-19}$ J: divide joules by it to get electronvolts',
            'Brighter light of one colour has **more photons**, each with the same energy',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light carries its energy in packets called photons.', show: 'sum.0' },
        { say: 'The energy of one photon is h f, which is the same as h c divided by the wavelength.', caption: 'The energy of one photon is hf, which is the same as hc ÷ λ.', show: 'sum.1' },
        { say: 'A shorter wavelength means a higher frequency, and more energy in each photon.', show: 'sum.2' },
        { say: 'One electronvolt is 1.60 times ten to the negative 19 joules. Divide joules by it to get electronvolts.', caption: '1 eV is 1.60 × 10⁻¹⁹ J. Divide joules by it to get electronvolts.', show: 'sum.3' },
        { say: 'And brighter light of one colour has more photons, each with the same energy.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
